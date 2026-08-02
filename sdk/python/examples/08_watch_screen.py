#!/usr/bin/env python3
"""Mirror what the phone's screen is showing.

    python 08_watch_screen.py 192.168.1.20 <token>
    python 08_watch_screen.py 192.168.1.20 <token> --follow
    python 08_watch_screen.py 192.168.1.20 <token> --ids

The other examples tell you what the radio is doing. This one tells you what the
app is *saying* — the status line, the notices it popped up, which screen the
operator is on. That is the part you cannot see when you are not next to the
phone, and it is usually where the explanation is when something looks wrong.

By default it redraws the whole screen every couple of seconds, like a mirror.
Use --follow to print only what changed instead, which is what you want when
leaving it running for hours and reading the log afterwards. --ids adds each
view's id, useful when you are building your own display and need to know which
field is which.

The settings screen needs the FULL token: it shows the API tokens themselves and
the CloudLog/QRZ keys. With a read-only token you still learn that the operator
is on that screen, just not what it says. Credentials are replaced with *** on
every screen regardless of which token you hold.
"""
import os
import sys
import time
import unicodedata

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import Ft8twClient, ApiError

# The screen text is Chinese. A Windows console defaults to cp950 and would die
# on the first line with UnicodeEncodeError — before printing anything useful.
for stream in (sys.stdout, sys.stderr):
    if hasattr(stream, "reconfigure"):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

REFRESH = 2.0
WIDTH = 78          # 終端上用來鋪排一行的字元數


def cells(s):
    """Display width. CJK characters occupy two columns in a terminal."""
    return sum(2 if unicodedata.east_asian_width(c) in "WF" else 1 for c in s)


def layout(texts, src_w):
    """Rebuild the phone's lines from the coordinates it reported.

    Printing the texts in the order they come back gives one line per view, which
    is why the result looked like it broke lines at random: two labels sitting
    side by side on the phone became two lines here. Grouping by y and ordering
    by x puts them back on the same row, and the x offset decides the indent.
    """
    if not texts or not src_w:
        return [t["text"] for t in texts]

    rows = {}
    for t in texts:
        # Views on the same visual row rarely share an exact y — round to a band.
        rows.setdefault(round(t.get("y", 0) / 14), []).append(t)

    out = []
    for key in sorted(rows):
        line = ""
        for t in sorted(rows[key], key=lambda v: v.get("x", 0)):
            col = int(t.get("x", 0) * WIDTH / src_w)
            if col > cells(line):
                line += " " * (col - cells(line))
            elif line:
                line += " "
            line += t["text"]
        out.append(line.rstrip())
    return out


def render(ui, show_ids):
    """Build the screen as a list of lines.

    Returning them instead of printing lets the caller compare this frame with the
    previous one and skip the repaint entirely when nothing moved.
    """
    screen = ui.get("screen") or ui.get("screenId") or "?"
    label = ui.get("screenLabel") or ""
    texts = ui.get("texts", [])

    out = [f"  {label}  ({screen})".rstrip(), "  " + "-" * WIDTH]

    if ui.get("redacted"):
        out.append("  " + ui.get("redactedReason", "text withheld"))
    elif not texts:
        out.append("  (no text on screen)")
    elif show_ids:
        # With ids the point is to identify fields, not to look like the phone,
        # so keep one per line and add the position.
        for t in texts:
            out.append(f"  {str(t.get('id')):<30} ({t.get('x'):>4},{t.get('y'):>4})  {t['text']}")
    else:
        for line in layout(texts, ui.get("screenWidth", 0)):
            out.append("  " + line)

    # Only what was said in the last minute. These are toasts — on the phone they
    # appear for a few seconds and vanish, so pinning the ones from start-up under
    # the mirror shows something that is no longer on screen and never changes.
    # The full history is still there in --follow, where a timeline is the point.
    cutoff = (time.time() - 60) * 1000
    msgs = [m for m in ui.get("recentMessages", []) if m["at"] >= cutoff]
    if msgs:
        out.append("  " + "-" * WIDTH)
        for m in msgs[-5:]:
            when = time.strftime("%H:%M:%S", time.localtime(m["at"] / 1000))
            out.append(f"  {when}  {m['text']}")
    return out


def paint(lines, host):
    """Redraw in place.

    `cls` blanks the terminal and then fills it again, which reads as a flash
    every time. Homing the cursor and overwriting line by line — each line
    clearing only its own tail — never leaves the screen empty, so there is
    nothing to see flicker.
    """
    sys.stdout.write("\033[H")
    for line in [f"  FT8TW screen — {host}", ""] + lines:
        sys.stdout.write(line + "\033[K\n")
    sys.stdout.write("\033[J")   # clear anything the previous frame left below
    sys.stdout.flush()


def follow(api, show_ids):
    """Print only what changed. For leaving running and reading later."""
    last_lines, last_screen, last_msg_at = None, None, 0
    while True:
        ui = fetch(api)
        if ui is None:
            continue
        stamp = time.strftime("%H:%M:%S")
        screen = ui.get("screen") or ui.get("screenId") or "?"

        if screen != last_screen:
            print(f"[{stamp}] screen: {ui.get('screenLabel','')} ({screen})")
            if ui.get("redacted"):
                print(f"           {ui.get('redactedReason', '')}")
            last_screen, last_lines = screen, None

        lines = layout(ui.get("texts", []), ui.get("screenWidth", 0))
        if last_lines is None:
            # First sight of this screen: show all of it, otherwise the log
            # starts mid-sentence and there is no way to tell what was there.
            for l in lines:
                print(f"           {l}")
        else:
            for l in [x for x in lines if x not in last_lines]:
                print(f"           {l}")
        last_lines = lines

        for m in ui.get("recentMessages", []):
            if m["at"] > last_msg_at:
                when = time.strftime("%H:%M:%S", time.localtime(m["at"] / 1000))
                print(f"[{when}] notice: {m['text']}")
                last_msg_at = m["at"]

        time.sleep(REFRESH)


def fetch(api):
    try:
        return api.ui()
    except ApiError as e:
        # busy means the app's main thread was tied up walking its own views;
        # the screen is fine and the next poll will get it.
        print(f"  ({e})", file=sys.stderr)
        time.sleep(3)
        return None


def main(host, token, mode_follow=False, show_ids=False):
    api = Ft8twClient(host, token)
    if "ui.state" not in api.capabilities:
        sys.exit("This app is too old: it does not offer the ui.state capability.\n"
                 "Update FT8TW on the phone.")

    if mode_follow:
        print(f"following {host} — Ctrl+C to stop\n")
        follow(api, show_ids)
        return

    # Windows needs VT processing enabled before ANSI escapes mean anything.
    if os.name == "nt":
        os.system("")
    sys.stdout.write("\033[2J")   # one clean slate; after this we only overwrite

    previous = None
    while True:
        ui = fetch(api)
        if ui is None:
            continue
        frame = render(ui, show_ids)
        # Repaint only when something actually changed. Redrawing an identical
        # screen every couple of seconds is nothing but flicker.
        if frame != previous:
            paint(frame, host)
            previous = frame
        time.sleep(REFRESH)


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    try:
        main(args[0], args[1],
             "--follow" in sys.argv, "--ids" in sys.argv)
    except ApiError as e:
        print("", file=sys.stderr)
        print(e, file=sys.stderr)
        print("Check the phone address and token, and that the app is "
              "running with the API switched on (Config -> Developer API).",
              file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        sys.exit(0)
