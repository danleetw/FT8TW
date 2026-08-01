#!/usr/bin/env python3
"""Example seven: the control endpoints, and how each of them refuses you.

Example six holds a stop button. This one is the other direction — it walks
through every control endpoint so you can see what a successful call returns and,
more usefully, what the four different refusals mean.

    python 07_remote_control.py <phone-ip> <full-token>          # dry run
    python 07_remote_control.py <phone-ip> <full-token> --arm    # really do it

Without --arm nothing that could put a signal on the air is executed. Read the
dry-run output first: it prints exactly what the armed run would do.

Needs a FULL token and the "Allow remote transmit control" switch in the app
(Config -> Developer API), which is off by default. Those are two separate gates
on purpose — a token that leaked is not enough to key your radio.

Every control endpoint is idempotent. Stopping twice, setting the same band
twice, calling the same station twice: all end in the state you asked for. That
matters because of Busy below.
"""
import sys
import time

sys.path.insert(0, "..")

from ft8tw import (Ft8twClient, ApiError, AuthError, ScopeRequired,
                   ControlDisabled, Conflict, Busy)


def explain(e):
    """Turn an exception into the one thing you should actually do about it."""
    if isinstance(e, ScopeRequired):
        return ("You are holding the read-only token. Fetch the full one from "
                "Config -> Developer API on the phone.")
    if isinstance(e, ControlDisabled):
        return ("The 'Allow remote transmit control' switch is off. No token "
                "fixes this — someone has to walk over to the phone and turn "
                "it on. That is the point of the switch.")
    if isinstance(e, Conflict):
        return ("The request is fine, the state is not (%s). Nothing to change "
                "in your call — wait and retry." % e)
    if isinstance(e, Busy):
        return ("The app did not answer in time. The action may or may not have "
                "been applied — but every control endpoint is idempotent, so "
                "just retry and the end state is what you asked for.")
    if isinstance(e, AuthError):
        return "Bad or revoked token."
    return "Unexpected: %s" % e


def attempt(label, fn, armed, mutating=True):
    """Run one control call, or describe it when not armed.

    Everything behind the control switch counts as mutating, not just the calls
    that key the radio. Setting a target callsign or a config value changes what
    the operator's station does next, and a "dry run" that quietly rewrote a
    setting would be exactly the kind of surprise this whole switch exists to
    prevent.
    """
    if mutating and not armed:
        print("  [dry run] would %s" % label)
        return None
    try:
        result = fn()
        print("  OK   %s -> %s" % (label, result))
        return result
    except (ApiError, AuthError) as e:
        print("  FAIL %s" % label)
        print("       %s" % explain(e))
        return None


def main(host, token, armed):
    api = Ft8twClient(host, token)

    who = api.whoami()
    print("Token scope: %s" % who.get("scope"))
    if who.get("scope") != "full":
        print("This example needs a full token. Stopping here rather than "
              "failing on every call below.")
        return 1

    st = api.status()
    print("Radio: %s on %s, transmitting=%s"
          % (st.get("mode"), st.get("band"), st.get("transmitting")))
    print("Armed: %s\n" % ("YES — this will key your radio" if armed else "no (dry run)"))

    # --- Always safe: stopping ------------------------------------------------
    # Succeeds in every state. 'changed' is how you tell "I stopped something"
    # from "there was nothing to stop" — both are success.
    print("1. Stop transmitting")
    r = attempt("tx_stop()", api.tx_stop, armed)
    if r is not None:
        print("       changed=%s (false just means nothing was running)"
              % r.get("changed"))

    # --- Reading the band list before setting a band --------------------------
    # /control/band only accepts frequencies that exist in the list for the
    # current mode. Guessing 14074000 works on FT8 and fails on FT4.
    print("\n2. Which bands can I ask for?")
    try:
        bands = api.bands()
        names = [b.get("name", b.get("freq")) for b in bands.get("bands", [])][:6]
        print("  OK   %d bands, first few: %s" % (len(bands.get("bands", [])), names))
    except (ApiError, AuthError) as e:
        print("  FAIL bands() -> %s" % explain(e))
        bands = {"bands": []}

    # --- Changing band and mode ----------------------------------------------
    # Neither transmits by itself, but both change what your next transmission
    # would be, so they are behind the same switch.
    # Each entry carries 'freq' (Hz) and a 'current' flag, so you never have to
    # parse the display name to find out where the radio already is.
    print("\n3. Set band (to the one it is already on — idempotent by design)")
    here = next((b for b in bands.get("bands", []) if b.get("current")), None)
    current_hz = here.get("freq") if here else None
    if current_hz:
        attempt("set_band(%s)  # %s" % (current_hz, here.get("name", "")),
                lambda: api.set_band(current_hz), armed)
    else:
        print("  skipped — no band is flagged as current")

    print("\n4. Set mode (to the current one, same reason)")
    attempt("set_mode(%r)" % st.get("mode"),
            lambda: api.set_mode(st.get("mode")), armed)

    # --- Choosing who to call -------------------------------------------------
    # You can only call a station the app has actually heard. The slot, audio
    # frequency and report all come from that decode, which is why you pass a
    # callsign and nothing else. An unheard callsign is refused, not guessed at.
    # A decode has 'from' (who sent it) and 'to' (who it was addressed to). The
    # station you can call is the sender — 'to' is often the literal string CQ.
    print("\n5. Pick a station to call (must be in the recent decodes)")
    heard = [m.get("from") for m in api.messages(limit=30).get("messages", [])
             if m.get("from")]
    heard = [c for c in dict.fromkeys(heard) if c][:5]
    print("  recently heard: %s" % (heard or "(nothing yet)"))
    if heard:
        # activate=False: sets the target WITHOUT starting to transmit.
        attempt("tx_call(%r, activate=False)" % heard[0],
                lambda: api.tx_call(heard[0]), armed)
    attempt("tx_call('ZZ0ZZZ')  # never heard — expect a refusal",
            lambda: api.tx_call("ZZ0ZZZ"), armed)

    print("\n6. Back to calling CQ (still without transmitting)")
    attempt("tx_cq(activate=False)", lambda: api.tx_cq(), armed)

    # --- The one that actually keys the radio ---------------------------------
    # The response reports the ACTUAL state, not your request. The app can refuse
    # — a pending mandatory update blocks transmission — and then 'activated'
    # stays false with 'blocked' true. Trusting your own request here is how you
    # end up with a script that thinks it is transmitting and is not.
    #
    # The turn-off goes in a finally. Anything between the two calls — Ctrl+C, a
    # dropped connection, an exception while printing — would otherwise leave the
    # station transmitting with nobody watching it. If your script can key a
    # radio, the path that un-keys it must not be reachable only on success.
    print("\n7. Enable transmission  <-- this is the one that puts you on the air")
    try:
        r = attempt("tx_activate(True)", lambda: api.tx_activate(True), armed)
        if r is not None:
            print("       activated=%s blocked=%s  <- read the response, not your request"
                  % (r.get("activated"), r.get("blocked")))
            time.sleep(2)
    finally:
        if armed:
            # tx_stop rather than tx_activate(False): it succeeds in every state,
            # so it still does the right thing if we got here from an exception
            # and do not know what state the app is in.
            try:
                back = api.tx_stop()
                print("  OK   tx_stop()  # putting it back -> changed=%s"
                      % back.get("changed"))
            except (ApiError, AuthError) as e:
                print("  !!   COULD NOT STOP TRANSMISSION: %s" % explain(e))
                print("       Go to the phone and stop it manually.")

    # --- Settings -------------------------------------------------------------
    # Only a small whitelist is writable, and values are clamped rather than
    # rejected: ask for 999 and you get the maximum back in 'value', with your
    # original in 'requested'. Compare those two if you care.
    # This deliberately writes back the value that is already there. An example
    # that changed someone's operating settings as a side effect of being run
    # would be a bad example, however well it demonstrated the API.
    print("\n8. Change a setting (whitelisted keys only, values are clamped)")
    try:
        current = api.config().get("noreplylimit")
    except (ApiError, AuthError):
        current = None
    if current is None:
        print("  skipped — could not read the current value, and this example "
              "will not guess one")
    else:
        r = attempt("set_config('noreplylimit', %r)  # the value it already has"
                    % current,
                    lambda: api.set_config("noreplylimit", current), armed)
        if r is not None:
            print("       value=%s requested=%s  (ask for 999 and you get the "
                  "maximum back, not an error)"
                  % (r.get("value"), r.get("requested")))

    print("\n9. What did all of this look like from the phone's side?")
    # The audit trail covers every request, not only the ones that changed
    # something — 'result' is where a refusal shows up, so a run that looks
    # successful from here can still be full of rejected calls.
    try:
        audit = api.audit(limit=5)
        for e in audit.get("audit", [])[-5:]:
            when = time.strftime("%H:%M:%S", time.localtime(e.get("time", 0) / 1000.0))
            print("  %s  %-24s %-8s %s" % (when, e.get("endpoint", ""),
                                           e.get("scope", ""), e.get("result", "")))
        print("  (the phone also showed a notice on screen, and it stays until "
              "dismissed — you may not be next to it when a script does this)")
    except (ApiError, AuthError) as e:
        print("  FAIL audit() -> %s" % explain(e))

    if not armed:
        print("\nDry run finished. Re-run with --arm to execute step 7.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1], sys.argv[2], "--arm" in sys.argv))
