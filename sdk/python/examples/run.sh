#!/bin/sh
# ---------------------------------------------------------------------------
#  FT8TW SDK example launcher (Linux / macOS)
#
#      ./run.sh          pick from a menu
#      ./run.sh 3        start example 3 directly
#      ./run.sh 7 --arm  example 7, for real rather than a dry run
#
#  The phone address and token can come from the environment, so you only type
#  them once per session:
#      export FT8TW_HOST=192.168.1.20
#      export FT8TW_TOKEN=your-token-here
#
#  This script deliberately does NOT save your token anywhere. A token in a file
#  is a token that gets committed, backed up, or read over your shoulder — and
#  the full-access one can key your radio.
# ---------------------------------------------------------------------------
set -eu
cd "$(dirname "$0")"

# --- find Python -----------------------------------------------------------
PY=""
for c in python3 python; do
    if command -v "$c" >/dev/null 2>&1; then PY="$c"; break; fi
done
if [ -z "$PY" ]; then
    echo "Python 3 was not found. Install it and try again." >&2
    exit 1
fi

# --- pick an example -------------------------------------------------------
choice="${1:-}"
if [ -z "$choice" ]; then
    cat <<'MENU'

  FT8TW SDK examples
  ==================

   1  Live decode list
        Scrolls as decodes arrive, one line each: UTC, signal report,
        DT, DF and the message, with a rule between slots.

   2  Record decodes to a CSV file
        Same data, appended to decodes.csv instead of the screen.
        Remembers where it stopped, so you can close it and come back.

   3  Status dashboard
        One screen, redrawn every 3 seconds: your callsign and band,
        mode, TX or RX, whether the radio is connected, SWR and power,
        plus the 12 most recent decodes. Nothing scrolls away.

   4  Copy the QSO log to SQLite
        Mirrors the phone's contact log into a local database file so
        you can query it, back it up, or feed it to other software.

   5  Find the phone, then stream
        Locates FT8TW on your network by itself - no IP address needed
        - then shows decodes as they happen.
        The search needs one extra package:  pip install zeroconf
        Already know the address? Set FT8TW_HOST and it skips the search.

   6  Transmit watchdog                       (needs the FULL token)
        Watches while you transmit and stops it if the SWR goes high
        or the PTT sticks. It only ever stops; it never starts.

   7  Tour of the control endpoints           (needs the FULL token)
        Walks through every remote-control call and shows what each
        refusal means. Reports what it would do; add --arm to execute.

   8  Watch what the screen is showing
        Which screen the operator is on, the status line, and the notices
        the app popped up - the part you cannot see when you are not next
        to the phone. Redraws the whole screen every couple of seconds;
        add --follow to log only the changes, --ids to show view ids.
        The settings screen needs the FULL token (it shows the keys).

MENU
    printf 'Which one? [1-8] '
    read -r choice
fi

case "$choice" in
    1) script=01_watch_decodes.py ;;
    2) script=02_log_to_csv.py ;;
    3) script=03_dashboard.py ;;
    4) script=04_qso_sync.py ;;
    5) script=05_find_and_stream.py ;;
    6) script=06_tx_watchdog.py ;;
    7) script=07_remote_control.py ;;
    8) script=08_watch_screen.py ;;
    "") exit 0 ;;
    *) echo "\"$choice\" is not one of 1-8." >&2; exit 1 ;;
esac

# --- address and token -----------------------------------------------------
# Example 5 discovers the phone itself, so its address is optional.
host="${FT8TW_HOST:-}"
if [ "$choice" != "5" ] && [ -z "$host" ]; then
    echo
    echo "The phone shows its address in Config -> Developer API."
    printf 'Phone address [e.g. 192.168.1.20]: '
    read -r host
    [ -n "$host" ] || { echo "No address given." >&2; exit 1; }
fi

token="${FT8TW_TOKEN:-}"
if [ -z "$token" ]; then
    echo
    case "$choice" in
        6|7) echo "This example needs the FULL token, not the read-only one." ;;
        8) echo "A FULL token is needed to read the settings screen; read-only works elsewhere." ;;
    esac
    echo "Copy it from Config -> Developer API on the phone."
    # -s hides the token as you type where the shell supports it
    if read -rs -p 'Token: ' token 2>/dev/null; then echo; else
        printf 'Token: '
        read -r token
    fi
    [ -n "$token" ] || { echo "No token given." >&2; exit 1; }
fi

# --- extra arguments some examples take ------------------------------------
extra=""
case "$choice" in
    2) extra=decodes.csv ;;
    # 08 mirrors the whole screen by default. Written as if/fi rather than
    # `[ … ] && extra=…`: under `set -e` the test failing makes the case arm
    # return non-zero and the whole script exits — so running example 8
    # *without* a flag would quietly do nothing at all.
    8) if [ "${2:-}" = "--follow" ] || [ "${2:-}" = "--ids" ]; then
           extra="$2"
       fi ;;
    4) extra=qso_mirror.db ;;
    7)
        # Example 7 only reports what it would do unless you pass --arm. That
        # stays a deliberate step: nothing here should put a signal on the air
        # because someone pressed Enter on a menu.
        if [ "${2:-}" = "--arm" ]; then
            extra="--arm"
            echo
            echo "ARMED - this WILL key your radio."
        else
            echo
            echo "Running as a dry run. Nothing will be transmitted or changed."
            echo "To execute for real:  ./run.sh 7 --arm"
        fi
        ;;
esac

# --- go --------------------------------------------------------------------
# -u keeps the output unbuffered; without it the streaming examples look hung.
echo
if [ "$choice" = "5" ]; then
    exec "$PY" -u "$script" "$token" ${host:+"$host"}
else
    exec "$PY" -u "$script" "$host" "$token" ${extra:+"$extra"}
fi
