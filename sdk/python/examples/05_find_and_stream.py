#!/usr/bin/env python3
"""Find the phone on the network, then stream decodes over SSE.

    python 05_find_and_stream.py <token>                 # discover automatically
    python 05_find_and_stream.py <token> 192.168.1.20    # or name it directly

Discovery needs the optional extra:  pip install ft8tw-api[discovery]
Worth it because the phone's address changes with DHCP, which is the usual reason
a saved bookmark stops working.
"""
import os
import sys

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import CapabilityMissing, Ft8twClient, discover, ApiError


def pick_host():
    print("looking for FT8TW on the local network...")
    try:
        found = discover(timeout=4.0)
    except RuntimeError as e:
        # discover() raises this when zeroconf is missing. Its message already says
        # what to install and what to do instead — but only if someone reads it, and
        # a traceback buries the one useful line under ten that are not.
        sys.exit(f"\n{e}")
    if not found:
        # "check the API is enabled" was the whole message here, which sends people
        # to look at the phone when the phone is usually fine. Discovery relies on
        # multicast reaching this machine, and that is the part that tends to fail.
        sys.exit(
            "\nnothing found.\n"
            "\n"
            "The app is probably fine. mDNS discovery needs multicast to reach\n"
            "this computer, and that is what usually blocks it:\n"
            "  - a firewall rule blocking inbound UDP 5353\n"
            "  - client isolation on the access point or guest Wi-Fi\n"
            "  - several network interfaces (VPN, VMware, VirtualBox) so the\n"
            "    search goes out of the wrong one\n"
            "  - phone and computer on different subnets\n"
            "\n"
            "Passing the address directly always works and needs none of that.\n"
            "The app shows it in Config -> Developer API:\n"
            "    python 05_find_and_stream.py <token> 192.168.1.20\n"
            "or set FT8TW_HOST once and the launcher will use it."
        )
    for f in found:
        print(f"  {f['name']}  {f['host']}:{f['port']}  {f['properties']}")
    return found[0]["host"], found[0]["port"]


def main(token, host=None):
    port = 7052
    if host is None:
        host, port = pick_host()

    api = Ft8twClient(host, token, port=port)
    print(f"\nconnected: {api.whoami()['scope']} token, app {api.versions()['app']}\n")

    try:
        for ev in api.stream(events="decode"):
            if ev["event"] == "hello":
                print(f"stream open (session {ev['data']['sessionId'][:8]})")
            elif ev["event"] == "dropped":
                # The server tells us what it discarded for a subscriber that fell
                # behind; ignoring it would make the record look complete.
                print(f"!! dropped {ev['data']['dropped']} events", file=sys.stderr)
            elif ev["event"] == "decode":
                d = ev["data"]["data"]
                print(f"{d['snr']:>4} dB {d['audioFrequency']:>6.0f} Hz  {d['text']}")
    except CapabilityMissing as e:
        sys.exit(str(e))


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    try:
        main(sys.argv[1], sys.argv[2] if len(sys.argv) == 3 else None)
    except ApiError as e:
        print("", file=sys.stderr)
        print(e, file=sys.stderr)
        print("Check the phone address and token, and that the app is "
              "running with the API switched on (Config -> Developer API).",
              file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        sys.exit(0)
