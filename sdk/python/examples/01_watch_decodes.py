#!/usr/bin/env python3
"""Print decodes as they arrive.

    python 01_watch_decodes.py 192.168.1.20 <token>

The loop survives the app restarting and reports buffer overflow — both of which
would otherwise corrupt the record with no visible sign.
"""
import os
import sys

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import Ft8twClient


def main(host, token):
    api = Ft8twClient(host, token)
    me = api.status()
    print(f"connected to {me['myCallsign']} ({me['myGrid']}) on {me['band']}\n")

    def on_gap(oldest, requested):
        print(
            f"!! gap: asked from {requested}, buffer starts at {oldest} "
            f"- some decodes were missed",
            file=sys.stderr,
        )

    for s in api.follow_decodes(backfill=20, on_gap=on_gap):
        mine = "  <<<" if s.to == me["myCallsign"] else ""
        print(f"{s.snr:>4} dB {s.audio_hz:>6.0f} Hz  {s.text}{mine}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
