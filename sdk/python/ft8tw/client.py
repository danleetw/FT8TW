"""Client for the FT8TW plugin API.

Wraps the transport details a plugin should not have to think about: the response
envelope, the stable error codes, incremental cursors, and the session identifier
that tells you the phone restarted and your cursor is no longer valid.

Only the standard library is used, so a plugin can depend on this without pulling
anything else in.
"""

from __future__ import annotations

import json
import socket
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from typing import Any, Callable, Iterator, Optional

__all__ = [
    "Ft8twClient",
    "ApiError",
    "AuthError",
    "SessionChanged",
    "CapabilityMissing",
    "Spot",
    "discover",
]

DEFAULT_PORT = 7052
DEFAULT_TIMEOUT = 10.0


class ApiError(RuntimeError):
    """Any error the API reported, carrying its stable `code`.

    Always branch on `code`, never on the HTTP status: 401 covers "no token",
    "wrong token" and "token was regenerated", and a plugin needs to tell the user
    which one happened.
    """

    def __init__(self, code: str, message: str, extra: Optional[dict] = None):
        super().__init__(f"{code}: {message}")
        self.code = code
        self.message = message
        self.extra = extra or {}


class AuthError(ApiError):
    """Token missing, wrong, or regenerated since it was issued."""


class ScopeRequired(ApiError):
    """This endpoint needs the full-access token; you presented the read-only one.

    Fixable by the caller: copy the other token from Config -> Developer API.
    """


class ControlDisabled(ApiError):
    """The phone's "Allow remote transmit control" switch is off.

    NOT fixable by the caller — it is a setting on the phone, and it is off by
    default. Distinct from ScopeRequired because the two need completely different
    instructions: fetch a different token, versus walk over to the phone.
    """


class Conflict(ApiError):
    """The request is valid but the current state does not allow it.

    Transmitting, or a frequency outside the band list. Satisfy the precondition
    and retry — the request itself needs no change.
    """


class Busy(ApiError):
    """The app did not respond in time.

    The action may or may not have been applied. All control endpoints are
    idempotent, so retrying is safe.
    """


class SessionChanged(ApiError):
    """The app restarted; sequence numbers restarted with it.

    Discard any cursor you were holding and query in full. The client raises this
    only when you pass a session explicitly — the convenience helpers below detect
    the change and re-sync for you.
    """


class CapabilityMissing(RuntimeError):
    """The connected app does not advertise a feature this call needs.

    Raised up front rather than letting the request 404, so the message says what is
    missing instead of just "not found".
    """


def _from_status(http_status):
    """Pick the right exception from the status line alone.

    Used when the error body cannot be read — normally the JSON envelope carries
    an ``error.code`` that maps exactly, but a reset connection leaves only the
    status. Raising a generic ApiError in that case would quietly break the
    caller's handling: their ``except AuthError`` would stop matching a 401, and
    they would never find out why their token-refresh path stopped running.

    The mapping is coarser than ``error.code`` — a 403 is either ScopeRequired or
    ControlDisabled and we cannot tell which — so it picks the one whose absence
    would hurt more. A caller told "wrong token" checks their token and finds it
    fine; a caller told "control disabled" walks to the phone for nothing.
    """
    if http_status == 401:
        return AuthError("unauthorized", "HTTP 401 (error body unreadable)")
    if http_status == 403:
        return ScopeRequired("scope_required", "HTTP 403 (error body unreadable)")
    if http_status == 409:
        return Conflict("conflict", "HTTP 409 (error body unreadable)")
    if http_status == 503:
        return Busy("busy", "HTTP 503 (error body unreadable)")
    return ApiError("http_error", "HTTP %s" % http_status)


@dataclass
class Spot:
    """One decoded message, with the fields a plugin usually wants."""

    seq: int = 0
    utc: int = 0
    frm: str = ""
    to: str = ""
    grid: str = ""
    extra: str = ""
    snr: int = 0
    time_offset: float = 0.0
    audio_hz: float = 0.0
    band_hz: int = 0
    text: str = ""
    worked: bool = False
    followed: bool = False
    mode: str = ""
    raw: dict = field(default_factory=dict, repr=False)

    @classmethod
    def from_json(cls, d: dict) -> "Spot":
        return cls(
            seq=d.get("seq", 0),
            utc=d.get("utc", 0),
            frm=d.get("from", "") or "",
            to=d.get("to", "") or "",
            grid=d.get("grid", "") or "",
            extra=d.get("extra", "") or "",
            snr=d.get("snr", 0),
            time_offset=d.get("timeOffset", 0.0) or 0.0,
            audio_hz=d.get("audioFrequency", 0.0) or 0.0,
            band_hz=d.get("band", 0) or 0,
            text=d.get("text", "") or "",
            worked=bool(d.get("worked")),
            followed=bool(d.get("followed")),
            mode=d.get("mode", "") or "",
            raw=d,
        )


class Ft8twClient:
    """Talks to one FT8TW instance.

    >>> api = Ft8twClient("192.168.1.20", token="…")
    >>> api.status()["myCallsign"]
    'BV6LC'
    """

    def __init__(
        self,
        host: str,
        token: str,
        port: int = DEFAULT_PORT,
        timeout: float = DEFAULT_TIMEOUT,
    ):
        self.base = f"http://{host}:{port}"
        self.token = token
        self.timeout = timeout
        self._session: Optional[str] = None
        self._capabilities: Optional[set] = None

    # ── plumbing ────────────────────────────────────────────

    def _request(self, path: str, params: Optional[dict] = None,
                 method: str = "GET", body: Optional[dict] = None) -> Any:
        url = f"{self.base}{path}"
        if params:
            clean = {k: v for k, v in params.items() if v is not None and v != ""}
            if clean:
                url += "?" + urllib.parse.urlencode(clean)

        headers = {"Authorization": f"Bearer {self.token}"}
        data = None
        if body is not None:
            data = json.dumps(body).encode("utf-8")
            headers["Content-Type"] = "application/json"
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                body = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            # Errors carry a JSON envelope too; the code inside is what matters
            try:
                body = json.loads(e.read().decode("utf-8"))
            except Exception:
                # Reading the error body can itself fail — the connection is
                # sometimes reset before the body arrives. Falling back to a
                # generic ApiError here would be worse than the missing detail:
                # a caller's `except AuthError` would stop catching a 401, and
                # the token-refresh path they wrote would silently never run.
                # The status line is enough to pick the right type.
                raise _from_status(e.code) from e
        except urllib.error.URLError as e:
            raise ApiError("unreachable", f"cannot reach {self.base}: {e.reason}") from e

        if not body.get("ok"):
            err = body.get("error", {})
            code = err.get("code", "unknown")
            msg = err.get("message", "")
            if code in ("unauthorized", "invalid_token", "token_revoked"):
                raise AuthError(code, msg, err)
            if code == "session_changed":
                raise SessionChanged(code, msg, err)
            if code == "scope_required":
                raise ScopeRequired(code, msg, err)
            if code == "control_disabled":
                raise ControlDisabled(code, msg, err)
            if code == "conflict":
                raise Conflict(code, msg, err)
            if code == "busy":
                raise Busy(code, msg, err)
            raise ApiError(code, msg, err)

        # A changed session means every cursor the caller holds is stale.
        session = body.get("sessionId")
        if self._session and session != self._session:
            self._session = session
            self._session_changed = True
        else:
            self._session = session
        return body.get("data", {})

    # ── discovery of what this app supports ─────────────────

    def versions(self) -> dict:
        """Supported versions and capabilities. Needs no token."""
        req = urllib.request.Request(f"{self.base}/api/versions")
        with urllib.request.urlopen(req, timeout=self.timeout) as resp:
            body = json.loads(resp.read().decode("utf-8"))
        return body.get("data", {})

    @property
    def capabilities(self) -> set:
        if self._capabilities is None:
            self._capabilities = set(self.versions().get("capabilities", []))
        return self._capabilities

    def require(self, capability: str) -> None:
        """Fail early, with a message that names the missing feature.

        Without this a plugin written against a newer app just gets a 404 from an
        older one, which reads like a bug in the plugin.
        """
        if capability not in self.capabilities:
            raise CapabilityMissing(
                f"this FT8TW does not support '{capability}' "
                f"(it advertises: {', '.join(sorted(self.capabilities)) or 'nothing'})"
            )

    @property
    def session_id(self) -> Optional[str]:
        return self._session

    # ── read-only endpoints ─────────────────────────────────

    def whoami(self) -> dict:
        return self._request("/api/v1/whoami")

    def status(self) -> dict:
        return self._request("/api/v1/status")

    def rig(self) -> dict:
        return self._request("/api/v1/rig")

    def config(self) -> dict:
        return self._request("/api/v1/config")

    def bands(self) -> dict:
        """The frequencies :meth:`set_band` will accept, for the current mode.

        ``set_band`` only takes a frequency that is in this list, and the list
        differs per mode — 14074000 is valid on FT8 and rejected on FT4. Read
        this first rather than hard-coding a number that happens to work today.
        """
        return self._request("/api/v1/bands")

    def callsign(self, call: str) -> dict:
        return self._request(f"/api/v1/callsign/{urllib.parse.quote(call)}")

    def spectrum(self, denoise: Optional[bool] = None) -> dict:
        self.require("spectrum")
        params = {} if denoise is None else {"denoise": "1" if denoise else "0"}
        return self._request("/api/v1/spectrum", params)

    def messages(self, since: int = 0, limit: int = 200) -> dict:
        return self._request("/api/v1/messages", {"since": since, "limit": limit})

    def logs(self, since: int = 0, tag: str = "", level: str = "", limit: int = 200) -> dict:
        return self._request(
            "/api/v1/logs", {"since": since, "tag": tag, "level": level, "limit": limit}
        )

    def qso(
        self,
        since: int = 0,
        call: str = "",
        band: str = "",
        mode: str = "",
        date_from: str = "",
        date_to: str = "",
        limit: int = 200,
        offset: int = 0,
    ) -> dict:
        return self._request(
            "/api/v1/qso",
            {
                "since": since,
                "call": call,
                "band": band,
                "mode": mode,
                "from": date_from,
                "to": date_to,
                "limit": limit,
                "offset": offset,
            },
        )

    # ── incremental helpers ─────────────────────────────────

    def follow_decodes(
        self,
        poll: float = 2.0,
        backfill: int = 0,
        on_gap: Optional[Callable[[int, int], None]] = None,
    ) -> Iterator[Spot]:
        """Yield decodes as they arrive, forever.

        Handles the two things that quietly corrupt a naive polling loop:

        * the app restarting, which resets sequence numbers — detected via the
          session id, after which the cursor is dropped and reading resumes;
        * the ring buffer discarding events faster than they were read, reported by
          the server as ``truncated``. ``on_gap(oldest, requested)`` is called so a
          plugin can record that its data has a hole rather than assume continuity.
        """
        cursor = 0
        if backfill:
            first = self.messages(since=0, limit=backfill)
            for m in first.get("messages", []):
                yield Spot.from_json(m)
            cursor = first.get("nextSeq", 0)
        else:
            cursor = self.messages(since=0, limit=1).get("latestSeq", 0)

        while True:
            self._session_changed = False
            try:
                batch = self.messages(since=cursor, limit=500)
            except SessionChanged:
                cursor = 0
                continue

            if getattr(self, "_session_changed", False):
                # App restarted between polls: sequence numbers restarted too
                cursor = 0
                continue

            if batch.get("truncated") and on_gap:
                on_gap(batch.get("oldestSeq", 0), cursor)

            for m in batch.get("messages", []):
                yield Spot.from_json(m)
            cursor = batch.get("nextSeq", cursor)
            time.sleep(poll)

    def follow_qso(self, poll: float = 30.0, since: int = 0) -> Iterator[dict]:
        """Yield QSO records as they are added *or updated*.

        The cursor is ``updated_at``, not the row id, so LotW imports and manual QSL
        confirmations of existing contacts come through as well.
        """
        cursor = since
        while True:
            batch = self.qso(since=cursor, limit=500)
            for record in batch.get("qso", []):
                yield record
            cursor = batch.get("nextSince", cursor)
            time.sleep(poll)

    # ── control (needs the full token and the phone's switch) ──
    #
    # Every method here requires BOTH a full-access token AND the "Allow remote
    # transmit control" switch in the app, which is off by default. Without the
    # switch you get ControlDisabled — that is a setting on the phone, not
    # something the caller can fix.
    #
    # All of them are idempotent: repeating a call has the same effect as making
    # it once. That matters because a timeout does not cancel the action, so
    # retrying after `busy` is safe.

    def tx_stop(self) -> dict:
        """Stop transmitting.

        Succeeds in every state, including when nothing is transmitting. Check
        ``changed`` to tell "I stopped a transmission" from "nothing was running".
        """
        return self._request("/api/v1/tx/stop", method="POST", body={})

    def tx_activate(self, activated: bool) -> dict:
        """Enable or disable transmission.

        The response reports the ACTUAL state, not the request: the app can refuse
        (for example while a mandatory update is pending), in which case
        ``blocked`` is true and ``activated`` stays false.
        """
        if not isinstance(activated, bool):
            raise ValueError("activated must be a bool, not %r" % type(activated).__name__)
        return self._request("/api/v1/tx/activate", method="POST",
                             body={"activated": activated})

    def tx_call(self, callsign: str, activate: bool = False) -> dict:
        """Set the station to call.

        Only accepts a callsign that appears in the recent decodes — you can only
        call a station the app has actually heard. The slot, audio frequency and
        signal report come from that decode, so you supply only the callsign.

        Does not start transmitting unless ``activate`` is true.
        """
        return self._request("/api/v1/tx/call", method="POST",
                             body={"callsign": callsign, "activate": bool(activate)})

    def tx_cq(self, activate: bool = False) -> dict:
        """Go back to calling CQ. Does not transmit unless ``activate`` is true."""
        return self._request("/api/v1/tx/cq", method="POST",
                             body={"activate": bool(activate)})

    def set_band(self, band_hz: int) -> dict:
        """Change the operating frequency, in Hz.

        Only frequencies present in the band list for the current mode are
        accepted. ``radioCommanded`` in the response tells you whether the radio
        was actually commanded — under VOX or Bluetooth the app only changes its
        own setting and you still have to turn the dial yourself.

        Refused with ``conflict`` while transmitting.
        """
        return self._request("/api/v1/control/band", method="POST",
                             body={"band": int(band_hz)})

    def set_mode(self, mode: str) -> dict:
        """Switch between FT8, FT4 and FT2.

        This also CHANGES THE FREQUENCY: each mode has its own band list and the
        nearest entry is selected. Read ``band`` from the response rather than
        assuming it stayed put — switching back and forth drifts upwards
        (14.074 -> FT4 -> FT2 -> FT8 lands on 14.090).

        Refused with ``conflict`` while transmitting.
        """
        return self._request("/api/v1/control/mode", method="POST",
                             body={"mode": str(mode).upper()})

    def set_config(self, key: str, value) -> dict:
        """Change one setting.

        Only a small whitelist is writable (noreplylimit, finishretrylimit,
        antenna). Radio connection settings are deliberately excluded: changing
        them remotely would disconnect the radio, and reconnecting needs someone
        standing next to the phone.

        The response carries ``value`` — what actually took effect, which may
        have been clamped — alongside ``requested``.
        """
        return self._request("/api/v1/config", method="POST",
                             body={"key": str(key), "value": value})

    def audit(self, limit: int = 0) -> dict:
        """Recent API access log. Needs a full token; entries contain caller IPs.

        Reading it is itself recorded, so do not poll this.
        """
        return self._request("/api/v1/audit", {"limit": limit or None})

    def stream(self, events: str = "decode", reconnect: float = 3.0) -> Iterator[dict]:
        """Server-Sent Events, reconnecting on drop and resuming where it left off.

        Lower latency than polling. Note the server drops events for a subscriber
        that falls behind and says so — those arrive here as ``{"event": "dropped"}``
        rather than being hidden.
        """
        self.require("stream.sse")
        last_id: Optional[int] = None

        while True:
            params = {"events": events, "token": self.token}
            if last_id:
                params["since"] = last_id
            url = f"{self.base}/api/v1/stream?" + urllib.parse.urlencode(params)
            try:
                with urllib.request.urlopen(url, timeout=None) as resp:
                    event_name, data_lines = "message", []
                    for raw in resp:
                        line = raw.decode("utf-8").rstrip("\r\n")
                        if line.startswith(":"):
                            continue                      # keepalive comment
                        if line == "":
                            if data_lines:
                                payload = json.loads("".join(data_lines))
                                if event_name != "hello" and "seq" in payload:
                                    last_id = payload["seq"]
                                yield {"event": event_name, "data": payload}
                            event_name, data_lines = "message", []
                            continue
                        if line.startswith("event:"):
                            event_name = line[6:].strip()
                        elif line.startswith("data:"):
                            data_lines.append(line[5:].strip())
                        elif line.startswith("id:"):
                            try:
                                last_id = int(line[3:].strip())
                            except ValueError:
                                pass
            except Exception:
                time.sleep(reconnect)


def discover(timeout: float = 3.0) -> list:
    """Find FT8TW instances advertising themselves on the local network.

    Uses zeroconf if it is installed. It is an optional dependency on purpose: the
    rest of this client is standard library only, and a plugin that already knows
    the phone's address never needs it.

    Returns a list of ``{"host", "port", "name", "properties"}``.
    """
    try:
        from zeroconf import ServiceBrowser, ServiceListener, Zeroconf
    except ImportError as e:
        raise RuntimeError(
            "discovery needs the 'zeroconf' package: pip install zeroconf\n"
            "Alternatively pass the phone's IP address directly, which the app "
            "shows in Config → Developer API."
        ) from e

    found = []

    class _Listener(ServiceListener):
        def add_service(self, zc, type_, name):
            info = zc.get_service_info(type_, name, timeout=int(timeout * 1000))
            if not info or not info.addresses:
                return
            props = {
                k.decode(): v.decode()
                for k, v in (info.properties or {}).items()
                if k and v
            }
            found.append(
                {
                    "host": socket.inet_ntoa(info.addresses[0]),
                    "port": info.port,
                    "name": name.split(".")[0],
                    "properties": props,
                }
            )

        def update_service(self, zc, type_, name):
            pass

        def remove_service(self, zc, type_, name):
            pass

    zc = Zeroconf()
    try:
        ServiceBrowser(zc, "_ft8tw._tcp.local.", _Listener())
        time.sleep(timeout)
    finally:
        zc.close()
    return found
