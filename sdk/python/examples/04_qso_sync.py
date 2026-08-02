#!/usr/bin/env python3
"""Mirror the QSO log into a local SQLite database, incrementally.

    python 04_qso_sync.py 192.168.1.20 <token> mylog.db

Syncs on updated_at rather than row id. That matters: LotW imports and manual QSL
confirmations modify *existing* contacts, and an id-based cursor only ever sees
new rows, so it would silently miss every one of those updates.
"""
import sqlite3
import os
import sys

# 讓範例不必先安裝就能跑。用 __file__ 而不是 ".."：sys.path[0] 是腳本所在的
# 目錄，不是工作目錄，所以相對路徑會隨著你從哪裡執行而失效。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ft8tw import Ft8twClient, ApiError

DDL = """
CREATE TABLE IF NOT EXISTS qso (
  id INTEGER PRIMARY KEY, call TEXT, grid TEXT, mode TEXT,
  rst_sent TEXT, rst_rcvd TEXT, qso_date TEXT, time_on TEXT,
  band TEXT, freq TEXT, station_callsign TEXT, my_grid TEXT,
  qsl_manual INTEGER, qsl_lotw INTEGER, updated_at INTEGER)
"""


def main(host, token, db_path):
    api = Ft8twClient(host, token)
    db = sqlite3.connect(db_path)
    db.execute(DDL)
    db.execute("CREATE TABLE IF NOT EXISTS sync_state (k TEXT PRIMARY KEY, v TEXT)")

    row = db.execute("SELECT v FROM sync_state WHERE k='since'").fetchone()
    since = int(row[0]) if row else 0

    total = 0
    while True:
        batch = api.qso(since=since, limit=500)
        records = batch.get("qso", [])
        if not records:
            break

        for q in records:
            db.execute(
                "INSERT OR REPLACE INTO qso VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (q["id"], q["call"], q["grid"], q["mode"], q["rstSent"], q["rstRcvd"],
                 q["qsoDate"], q["timeOn"], q["band"], q["freq"],
                 q["stationCallsign"], q["myGrid"],
                 int(q["qslManual"]), int(q["qslLotw"]), q["updatedAt"]),
            )

        since = batch["nextSince"]
        total += len(records)
        db.execute("INSERT OR REPLACE INTO sync_state VALUES ('since',?)", (str(since),))
        db.commit()
        print(f"synced {len(records)} (total {total}, cursor {since})")

        if not batch.get("hasMore"):
            break

    count = db.execute("SELECT COUNT(*) FROM qso").fetchone()[0]
    print(f"done - {count} records held locally")
    db.close()


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    try:
        main(sys.argv[1], sys.argv[2], sys.argv[3])
    except ApiError as e:
        print("", file=sys.stderr)
        print(e, file=sys.stderr)
        print("Check the phone address and token, and that the app is "
              "running with the API switched on (Config -> Developer API).",
              file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        sys.exit(0)
