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

## Get a token

On the phone: **Config → Developer API**, turn it on, copy the **read-only** token.
The same screen shows the address to connect to.

Everything in this release is read-only. Nothing here can transmit, change settings
or control the radio.

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
| `01_watch_decodes.py` | print decodes as they arrive |
| `02_log_to_csv.py` | append to a CSV, resuming after a restart |
| `03_dashboard.py` | terminal dashboard |
| `04_qso_sync.py` | mirror the QSO log into SQLite |
| `05_find_and_stream.py` | mDNS discovery + SSE streaming |

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
