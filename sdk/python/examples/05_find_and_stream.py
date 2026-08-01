#!/usr/bin/env python3
"""Find the phone on the network, then stream decodes over SSE.

    python 05_find_and_stream.py <token>                 # discover automatically
    python 05_find_and_stream.py <token> 192.168.1.20    # or name it directly

Discovery needs the optional extra:  pip install ft8tw-api[discovery]
Worth it because the phone's address changes with DHCP, which is the usual reason
a saved bookmark stops working.
"""
import sys

from ft8tw import CapabilityMissing, Ft8twClient, discover


def pick_host():
    print("looking for FT8TW on the local network...")
    found = discover(timeout=4.0)
    if not found:
        sys.exit(
            "nothing found - check the API is enabled, or pass the IP address "
            "shown in Config -> Developer API"
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
    main(sys.argv[1], sys.argv[2] if len(sys.argv) == 3 else None)
