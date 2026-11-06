-- AI Console D1 schema
CREATE TABLE IF NOT EXISTS subs (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,              -- JSON：name, vendor, plan, price, currency, cycle, start_date, status ...
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usage (
  sub_id TEXT NOT NULL,
  date TEXT NOT NULL,              -- YYYY-MM-DD
  source TEXT NOT NULL,            -- manual / mac-mini / anthropic-api / openai-api / receipt
  count INTEGER NOT NULL DEFAULT 0,
  cost REAL NOT NULL DEFAULT 0,    -- 以該訂閱的幣別計
  tokens INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  PRIMARY KEY (sub_id, date, source)
);
CREATE INDEX IF NOT EXISTS usage_date ON usage(date);

CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS receipts (
  id TEXT PRIMARY KEY,
  received_at TEXT NOT NULL,
  vendor TEXT,
  sub_id TEXT,
  amount REAL,
  currency TEXT,
  sender TEXT,
  subject TEXT,
  status TEXT NOT NULL             -- matched / created / unparsed
);

CREATE TABLE IF NOT EXISTS backups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  size INTEGER NOT NULL,
  source TEXT,                     -- mac-mini / web
  r2_key TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  time TEXT NOT NULL,
  kind TEXT NOT NULL,
  msg TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS events_time ON events(time);
