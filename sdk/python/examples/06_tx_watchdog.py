#!/usr/bin/env python3
"""Example six: a transmit watchdog.

Watches the radio while it is transmitting and stops it if something looks wrong.
This is what the control endpoints are actually for — not so a script can call CQ
on your behalf, but so it can hold a stop button you are not standing next to.

    python 06_tx_watchdog.py <phone-ip> <full-token>

Needs a FULL token and the "Allow remote transmit control" switch in the app
(Config -> Developer API). The switch is off by default.

The watchdog only ever STOPS. It never starts a transmission, never changes the
target, and never touches a setting. That asymmetry is deliberate: the failure
mode of an over-eager stop is a missed QSO, while the failure mode of an
over-eager start is your callsign on the air without you.
"""
import sys
import time

sys.path.insert(0, "..")
from ft8tw import (Ft8twClient, ApiError, AuthError, Busy, ControlDisabled,
                   ScopeRequired)

# Stop if SWR goes above this. 3.0 is well past "retune soon" and into
# "something is wrong with the antenna or the cable".
SWR_LIMIT = 3.0

# Stop if the app reports transmitting for longer than this. A stuck PTT is the
# classic way to transmit for half an hour without noticing.
MAX_TX_SECONDS = 60


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    host, token = sys.argv[1], sys.argv[2]
    client = Ft8twClient(host, token)

    who = client.whoami()
    if who.get("scope") != "full":
        print("This example needs the full-access token.")
        return 1
    if not who.get("controlAllowed"):
        print("Remote control is switched off on the phone.")
        print("Turn on 'Allow remote transmit control' in Config -> Developer API.")
        return 1

    print("Watchdog running. SWR limit %.1f, max transmit %d s." %
          (SWR_LIMIT, MAX_TX_SECONDS))
    print("It will only ever stop transmission, never start it.  Ctrl-C to quit.\n")

    tx_since = None

    while True:
        try:
            status = client.status()
            rig = client.rig()
        except (AuthError, ScopeRequired, ControlDisabled) as e:
            # These do not fix themselves — stop rather than hammer the phone
            print("Cannot continue: %s" % e)
            return 1
        except (ApiError, Busy) as e:
            print("transient: %s" % e)
            time.sleep(5)
            continue

        transmitting = status.get("transmitting")
        swr = rig.get("swr")            # null when the radio never reported it

        reason = None
        if transmitting:
            tx_since = tx_since or time.time()
            held = time.time() - tx_since
            if swr is not None and swr > SWR_LIMIT:
                reason = "SWR %.1f exceeds %.1f" % (swr, SWR_LIMIT)
            elif held > MAX_TX_SECONDS:
                reason = "transmitting for %.0f s (limit %d)" % (held, MAX_TX_SECONDS)
        else:
            tx_since = None

        if reason:
            print("STOPPING: %s" % reason)
            try:
                result = client.tx_stop()
                # `changed` distinguishes "I stopped a transmission" from
                # "it had already stopped by itself"
                print("  stopped=%s  transmitting now=%s"
                      % (result.get("changed"), result.get("transmitting")))
            except Busy:
                # A timeout does not cancel the action, and tx_stop is idempotent,
                # so the right response is simply to try again on the next pass
                print("  app busy, will retry")
            except ApiError as e:
                print("  stop failed: %s" % e)
            tx_since = None

        time.sleep(2)


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\nwatchdog stopped — the radio is no longer being watched")
