#!/usr/bin/env python3
"""A terminal dashboard: status, radio, and the latest decodes.

    python 03_dashboard.py 192.168.1.20 <token>

Standard library only - no curses, no extra packages.
"""
import os
import sys
import time
from collections import deque

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import ApiError, Ft8twClient


def main(host, token):
    api = Ft8twClient(host, token)
    recent = deque(maxlen=12)
    cursor = 0

    while True:
        try:
            st = api.status()
            rig = api.rig()
            batch = api.messages(since=cursor, limit=50)
            cursor = batch.get("nextSeq", cursor)
            recent.extend(batch.get("messages", []))
        except ApiError as e:
            print(f"\n{e}", file=sys.stderr)
            time.sleep(5)
            continue

        os.system("cls" if os.name == "nt" else "clear")
        state = "TX" if st["transmitting"] else "RX" if st["recording"] else "idle"
        print(f"  {st['myCallsign']:<10} {st['myGrid']:<8} {st['band']}")
        print(f"  mode {st['mode']}   audio {st['audioFrequency']:.0f} Hz   {state}")

        # Anything the radio does not report comes back as null. Show a dash rather
        # than printing a zero that looks like a real reading.
        swr = rig["swr"] if rig["swr"] is not None else "-"
        pwr = f"{rig['power']} W" if rig["power"] is not None else "-"
        freq = f"{rig['frequency'] / 1e6:.6f} MHz" if rig["frequency"] else "-"
        link = "connected" if rig["connected"] else "not connected"
        print(f"  radio {link:<14} {freq}   SWR {swr}   {pwr}")
        print("  " + "-" * 62)

        for m in recent:
            print(f"  {m['snr']:>4} dB {m['audioFrequency']:>6.0f} Hz  {m['text']}")
        time.sleep(3)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
