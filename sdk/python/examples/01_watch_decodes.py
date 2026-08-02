#!/usr/bin/env python3
"""Print decodes as they arrive.

    python 01_watch_decodes.py 192.168.1.20 <token>
    python 01_watch_decodes.py 192.168.1.20 <token> 20    # start nearer the present

This shows the last 200 decodes and then follows live, so **it will look like it
has fewer than the phone does**. The phone keeps a long scrollback; this starts
near the present on purpose, so that leaving it running overnight does not begin
with a wall of history.

Pass a different number to change that — or set it once and forget it:

    set FT8TW_BACKFILL=200          # Windows
    export FT8TW_BACKFILL=200       # Linux / macOS

The app's buffer holds up to 2000 events of all kinds, so how many decodes are
actually reachable depends on how busy the band has been. Asking for 200 and
getting 55 is normal, not an error.

Columns are UTC, signal report, DT (how far off the slot boundary the sender's
clock was), DF (audio offset in Hz) and the message. A rule separates each slot;
decodes from one slot all share the same timestamp, so the rule is drawn when
that timestamp changes rather than by counting 15 seconds — FT4 and FT2 use
shorter slots and the mode can change while this is running.

The loop survives the app restarting and reports buffer overflow — both of which
would otherwise corrupt the record with no visible sign.
"""
import os
import sys
import time

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import Ft8twClient, ApiError


def main(host, token, backfill=200):
    api = Ft8twClient(host, token)
    me = api.status()
    print(f"connected to {me['myCallsign']} ({me['myGrid']}) on {me['band']}")
    # Say this up front. Otherwise the obvious reading of a shorter list is
    # "the API is dropping decodes", and that is the wrong thing to go and debug.
    print(f"showing the last {backfill} decodes, then following live "
          f"(the phone keeps a longer history)\n")

    def on_gap(oldest, requested):
        print(
            f"!! gap: asked from {requested}, buffer starts at {oldest} "
            f"- some decodes were missed",
            file=sys.stderr,
        )

    print("  UTC       dB    DT     DF  Message")

    # Every decode from the same slot carries the same utc, so a change of utc is
    # a change of slot. That is more reliable than dividing by 15 seconds: FT4 and
    # FT2 use shorter slots, and the mode can change while this is running.
    last_utc = None

    for s in api.follow_decodes(backfill=backfill, on_gap=on_gap):
        if last_utc is not None and s.utc != last_utc:
            print("-" * 58)
        last_utc = s.utc

        # UTC, not local time: FT8 timing is defined against UTC and every other
        # tool in the hobby reports it that way, so a local clock here would make
        # this output impossible to compare with anything else.
        stamp = time.strftime("%H:%M:%S", time.gmtime(s.utc / 1000))
        mine = "  <<<" if s.to == me["myCallsign"] else ""
        print(f"{stamp} {s.snr:>4} dB {s.time_offset:>+5.1f} {s.audio_hz:>6.0f}  "
              f"{s.text}{mine}")


if __name__ == "__main__":
    if len(sys.argv) not in (3, 4):
        sys.exit(__doc__)
    # 順序：命令列 > 環境變數 > 200。設一次 FT8TW_BACKFILL 就不必每次打，
    # 與啟動器讀 FT8TW_HOST／FT8TW_TOKEN 的作法一致。
    try:
        default_backfill = int(os.environ.get("FT8TW_BACKFILL", "200"))
    except ValueError:
        sys.exit("FT8TW_BACKFILL must be a number, not %r"
                 % os.environ.get("FT8TW_BACKFILL"))
    try:
        main(sys.argv[1], sys.argv[2],
             int(sys.argv[3]) if len(sys.argv) == 4 else default_backfill)
    except ApiError as e:
        print("", file=sys.stderr)
        print(e, file=sys.stderr)
        print("Check the phone address and token, and that the app is "
              "running with the API switched on (Config -> Developer API).",
              file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        sys.exit(0)
