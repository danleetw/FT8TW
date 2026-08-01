#!/usr/bin/env python3
"""Append every decode to a CSV, resuming where it left off.

    python 02_log_to_csv.py 192.168.1.20 <token> decodes.csv

The cursor lives in a sidecar file so restarting the script neither duplicates
rows nor loses the ones that arrived while it was down.
"""
import csv
import json
import os
import sys
import time

from ft8tw import Ft8twClient

FIELDS = ["seq", "utc", "from", "to", "grid", "snr", "audio_hz", "mode", "text"]


def load_state(path, api):
    """A saved cursor only means anything within one app session.

    If the phone restarted, sequence numbers began again from 1 and reusing the old
    cursor would skip everything up to that number without any error.
    """
    state = {"seq": 0, "session": None}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            state = json.load(f)

    api.status()  # populates session_id
    if state.get("session") != api.session_id:
        print("new app session - starting from the current position")
        state = {"seq": 0, "session": api.session_id}
    return state


def main(host, token, path):
    api = Ft8twClient(host, token)
    state_path = path + ".cursor"
    state = load_state(state_path, api)

    new_file = not os.path.exists(path)
    with open(path, "a", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=FIELDS)
        if new_file:
            writer.writeheader()

        while True:
            batch = api.messages(since=state["seq"], limit=500)
            rows = batch.get("messages", [])
            for m in rows:
                writer.writerow({
                    "seq": m.get("seq"),
                    "utc": m.get("utc"),
                    "from": m.get("from"),
                    "to": m.get("to"),
                    "grid": m.get("grid"),
                    "snr": m.get("snr"),
                    "audio_hz": round(m.get("audioFrequency", 0)),
                    "mode": m.get("mode"),
                    "text": m.get("text"),
                })
            if rows:
                fh.flush()
                state["seq"] = batch["nextSeq"]
                state["session"] = api.session_id
                with open(state_path, "w", encoding="utf-8") as f:
                    json.dump(state, f)
                print(f"wrote {len(rows)} rows (seq {state['seq']})")
            time.sleep(5)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2], sys.argv[3])
