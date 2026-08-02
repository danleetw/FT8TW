# ft8tw-api

Python client for the FT8TW plugin API. Works on Windows, Linux and macOS.

## Install

```bash
pip install -e .            # from this directory
pip install -e .[discovery] # plus mDNS lookup (optional)
```

The client itself has **no dependencies** — standard library only — so a plugin can
depend on it without dragging anything else in. `zeroconf` is needed only for
`discover()`, and if you already know the phone's address you never need it.

You do not need to install anything to try the examples — each one puts this
directory on `sys.path` itself, so it runs from wherever you happen to be:

```bash
python -u examples/01_watch_decodes.py <phone-ip> <token>       # Linux / macOS
python -u examples\01_watch_decodes.py <phone-ip> <token>       # Windows
```

Use `-u` for the streaming examples. Without it the output sits in a buffer and the
program looks like it has hung, when in fact it is receiving normally.

### Or just start the launcher

`examples/run.bat` (Windows) and `examples/run.sh` (Linux, macOS) list the examples,
ask for whatever they need, and add `-u` for you:

```
run.bat            pick from a menu
run.bat 3          start example 3 directly
run.sh 7 --arm     example 7, for real rather than a dry run
```

Set the address and token once and it stops asking:

```bash
set FT8TW_HOST=192.168.1.20         # Windows
set FT8TW_TOKEN=your-token-here
set FT8TW_BACKFILL=200              # optional: how far back example 1 starts

export FT8TW_HOST=192.168.1.20      # Linux / macOS
export FT8TW_TOKEN=your-token-here
export FT8TW_BACKFILL=200           # optional: how far back example 1 starts
```

The launcher never writes your token to a file. A token in a file is one that gets
committed, backed up, or read over someone's shoulder — and the full-access one can
key your radio. Example 7 also stays a dry run unless you type `--arm` yourself:
nothing should go on the air because someone pressed Enter on a menu.

## Get a token

On the phone: **Config → Developer API**, turn it on, and copy a token. The same
screen shows the address to connect to.

There are **two** tokens and they are not interchangeable:

| Token | What it can do |
|---|---|
| read-only | Every query: decodes, QSO log, status, radio, spectrum, map tiles |
| full | The above, plus the control endpoints — stop/start transmission, set the station to call, change band and mode, write a small set of settings |

Reading is enough for most plugins; take the read-only token unless you actually
need to change something. **The full token alone is still not enough to transmit** —
the *Allow remote transmit control* switch in the app must also be on, and it is off
by default. Two separate gates, so a leaked token cannot key your radio.

## Quick start

```python
from ft8tw import Ft8twClient

api = Ft8twClient("192.168.1.20", token="…")
print(api.status()["myCallsign"])

for spot in api.follow_decodes():
    print(spot.snr, spot.audio_hz, spot.text)
```

## Examples

| | |
|---|---|
| `01_watch_decodes.py` | Scrolling list of decodes: UTC, report, DT, DF, message, with a rule between slots |
| `02_log_to_csv.py` | The same data appended to a CSV, remembering where it stopped |
| `03_dashboard.py` | One screen redrawn every 3 s: callsign, band, mode, TX/RX, radio link, SWR, power, and the 12 latest decodes |
| `04_qso_sync.py` | Mirror the phone's contact log into a local SQLite file |
| `05_find_and_stream.py` | Locate the phone on the network by itself, then stream decodes — the search needs `pip install zeroconf`, or set `FT8TW_HOST` to skip it |
| `06_tx_watchdog.py` | Watch while transmitting and stop on high SWR or a stuck PTT — it only ever stops |
| `07_remote_control.py` | Every control endpoint and what each refusal means |
| `08_watch_screen.py` | Mirrors the phone's screen: every visible line, plus the notices it popped up. `--follow` logs only changes, `--ids` shows view ids — the settings screen needs the full token |

`07` runs read-only unless you pass `--arm`; without it, the calls that would
change your station are printed rather than executed.

## Control endpoints

Reading needs the read-only token. **Changing anything needs two things**: the
full-access token AND the *Allow remote transmit control* switch in the app
(Config → Developer API), which is **off by default**.

```python
api.tx_stop()                          # always succeeds, even if not transmitting
api.tx_activate(True)                  # enable transmission
api.tx_call("JA1ABC")                  # set the target; does NOT transmit
api.tx_call("JA1ABC", activate=True)   # set target and enable in one step
api.tx_cq()                            # back to calling CQ
api.set_band(14074000)                 # change frequency (Hz)
api.set_mode("FT4")                    # also changes the frequency — read it back
api.set_config("antenna", "EFHW 20m")  # small whitelist only
```

The two refusals mean different things and need different fixes, so they are
different exceptions:

```python
except ScopeRequired:    # you used the read-only token — copy the other one
except ControlDisabled:  # the switch on the phone is off — nothing you can do remotely
```

Three properties worth relying on:

**`tx_stop()` succeeds in every state**, including when nothing is transmitting
and when the app is still starting up. Stopping converges on the safe state; it
never fails on a precondition. Use `changed` to tell "I stopped something" from
"it was already stopped".

**Nothing transmits unless you ask.** `tx_call()` and `tx_cq()` set the target
without keying the radio. Deciding who to call and putting a signal on the air are
separate steps.

**Every control call is idempotent.** A timeout does not cancel the action — the
app may still apply it after the client gave up — so `Busy` is safe to retry.

`set_mode()` deserves one warning: switching modes **moves the frequency**, because
each mode has its own band list and the nearest entry wins. Going FT8 → FT4 → FT2 →
FT8 does not return you to where you started. Read `band` from the response, or set
it explicitly with `set_band()`.

## Three things that will bite you if ignored

**Branch on `error.code`, not the HTTP status.** A 401 covers "no token", "wrong
token" and "token was regenerated". The user needs to be told which. The client
raises `AuthError` with `.code` set.

**Cursors are only valid within one app session.** Sequence numbers restart when
the phone's app restarts. Compare `api.session_id` against what you stored; if it
changed, throw your cursor away and re-read. `follow_decodes()` does this for you.

**`truncated` means you have a hole.** The server keeps a fixed number of recent
events. If you ask from a point it has already discarded, it says so rather than
quietly returning what is left. Record the gap — do not treat the result as
continuous. `follow_decodes(on_gap=…)` gives you the callback.

## Capabilities

Ask what the connected app supports rather than comparing version numbers — there
is no stable mapping between app version and features:

```python
if "spectrum" in api.capabilities:
    ...
api.require("stream.sse")   # raises CapabilityMissing with a useful message
```

## Other languages

`GET /api/v1/openapi.json` returns an OpenAPI 3 document, so C#, Go, JavaScript and
the rest can generate a client instead of waiting for one to be written.
