#!/usr/bin/env python3
"""AI Console — 管理各家 AI 訂閱、使用狀況、費用，並備份各 AI 工具的環境設定。

只用 Python 標準函式庫，Windows / macOS / Linux 皆可執行。
資料預設存在 ~/.ai-console/（可用環境變數 AI_CONSOLE_HOME 改位置）。

指令總覽（詳見 README.md 或 `python ai_console.py -h`）：
  add / edit / remove / list / show      訂閱管理（手動新增）
  use                                    記錄使用狀況
  report                                 費用與使用報表
  rule                                   設定自動取消規則
  check [--apply]                        依規則檢查，--apply 會實際標記取消並開啟取消頁面
  cancel                                 手動取消某個訂閱
  backup / restore / backups             備份與還原 AI 環境設定
  dashboard                              產生 HTML 儀表板
"""
from __future__ import annotations

import argparse
import calendar
import datetime as dt
import html
import json
import os
import shutil
import sys
import webbrowser
import zipfile
from pathlib import Path

VERSION = "1.0.0"

# ---------------------------------------------------------------------------
# 路徑與資料存取
# ---------------------------------------------------------------------------

def console_home() -> Path:
    return Path(os.environ.get("AI_CONSOLE_HOME", Path.home() / ".ai-console")).expanduser()


def data_file() -> Path:
    return console_home() / "data.json"


def backup_dir() -> Path:
    return console_home() / "backups"


EMPTY_DB = {
    "version": 1,
    "base_currency": "TWD",
    "rates": {"TWD": 1.0, "USD": 32.0, "EUR": 35.0, "JPY": 0.21},
    "subscriptions": [],
    "rules": {
        "unused_days": 30,          # 超過 N 天沒使用 → 建議取消（0 = 停用）
        "monthly_budget": 0,        # 每月總預算（基準幣別，0 = 不限制）
        "min_uses_per_month": 0,    # 每月使用次數低於此值 → 建議取消（0 = 停用）
        "renewal_warning_days": 3,  # 續約前 N 天才實際執行取消，避免太早取消浪費已付費期間
    },
    "log": [],
}


def load_db() -> dict:
    f = data_file()
    if not f.exists():
        return json.loads(json.dumps(EMPTY_DB))
    with f.open(encoding="utf-8") as fh:
        db = json.load(fh)
    for k, v in EMPTY_DB.items():
        db.setdefault(k, json.loads(json.dumps(v)))
    for k, v in EMPTY_DB["rules"].items():
        db["rules"].setdefault(k, v)
    return db


def save_db(db: dict) -> None:
    f = data_file()
    f.parent.mkdir(parents=True, exist_ok=True)
    tmp = f.with_suffix(".tmp")
    with tmp.open("w", encoding="utf-8") as fh:
        json.dump(db, fh, ensure_ascii=False, indent=2)
    tmp.replace(f)


def log_event(db: dict, msg: str) -> None:
    db["log"].append({"time": now().isoformat(timespec="seconds"), "msg": msg})
    db["log"] = db["log"][-500:]


def now() -> dt.datetime:
    return dt.datetime.now()


def today() -> dt.date:
    override = os.environ.get("AI_CONSOLE_TODAY")  # 測試用
    return dt.date.fromisoformat(override) if override else dt.date.today()


# ---------------------------------------------------------------------------
# 常見服務預設值（只放管理頁網址，價格請自行輸入，各家價格常變動）
# ---------------------------------------------------------------------------

PRESETS = {
    "chatgpt":    {"name": "ChatGPT",        "vendor": "OpenAI",     "manage_url": "https://chatgpt.com/#settings/Account"},
    "openai-api": {"name": "OpenAI API",     "vendor": "OpenAI",     "manage_url": "https://platform.openai.com/settings/organization/billing"},
    "claude":     {"name": "Claude",         "vendor": "Anthropic",  "manage_url": "https://claude.ai/settings/billing"},
    "claude-api": {"name": "Claude API",     "vendor": "Anthropic",  "manage_url": "https://console.anthropic.com/settings/billing"},
    "gemini":     {"name": "Google AI (Gemini)", "vendor": "Google", "manage_url": "https://one.google.com/settings"},
    "copilot":    {"name": "GitHub Copilot", "vendor": "GitHub",     "manage_url": "https://github.com/settings/copilot"},
    "cursor":     {"name": "Cursor",         "vendor": "Anysphere",  "manage_url": "https://cursor.com/settings"},
    "perplexity": {"name": "Perplexity",     "vendor": "Perplexity", "manage_url": "https://www.perplexity.ai/settings/account"},
    "midjourney": {"name": "Midjourney",     "vendor": "Midjourney", "manage_url": "https://www.midjourney.com/account"},
    "grok":       {"name": "Grok / X Premium", "vendor": "xAI",      "manage_url": "https://x.com/settings/manage_subscriptions"},
}

# ---------------------------------------------------------------------------
# 要備份的 AI 環境設定。
# 預設排除含登入憑證/金鑰的檔案；要一併備份需加 --include-secrets。
# ---------------------------------------------------------------------------

def _app_support() -> Path:
    if sys.platform == "darwin":
        return Path.home() / "Library" / "Application Support"
    if os.name == "nt":
        return Path(os.environ.get("APPDATA", Path.home() / "AppData" / "Roaming"))
    return Path(os.environ.get("XDG_CONFIG_HOME", Path.home() / ".config"))


def config_targets() -> dict[str, list[Path]]:
    h = Path.home()
    app = _app_support()
    return {
        "claude-code": [h / ".claude" / "settings.json", h / ".claude" / "CLAUDE.md",
                        h / ".claude" / "agents", h / ".claude" / "commands",
                        h / ".claude" / "skills", h / ".claude" / "hooks",
                        h / ".claude" / "keybindings.json", h / ".claude.json"],
        "claude-desktop": [app / "Claude" / "claude_desktop_config.json"],
        "codex": [h / ".codex" / "config.toml", h / ".codex" / "AGENTS.md",
                  h / ".codex" / "prompts", h / ".codex" / "auth.json"],
        "gemini-cli": [h / ".gemini" / "settings.json", h / ".gemini" / "GEMINI.md",
                       h / ".gemini" / "commands", h / ".gemini" / "oauth_creds.json"],
        "cursor": [app / "Cursor" / "User" / "settings.json",
                   app / "Cursor" / "User" / "keybindings.json",
                   app / "Cursor" / "User" / "snippets", h / ".cursor" / "mcp.json",
                   h / ".cursor" / "rules"],
        "vscode-copilot": [app / "Code" / "User" / "settings.json",
                           app / "Code" / "User" / "keybindings.json",
                           app / "Code" / "User" / "prompts", app / "Code" / "User" / "mcp.json"],
        "windsurf": [h / ".codeium" / "windsurf" / "mcp_config.json",
                     h / ".codeium" / "windsurf" / "memories"],
        "continue": [h / ".continue" / "config.json", h / ".continue" / "config.yaml"],
        "aider": [h / ".aider.conf.yml", h / ".aider.model.settings.yml"],
        "ollama": [h / ".ollama" / "config.json"],
        "ai-console": [data_file()],
    }


SECRET_NAMES = {".credentials.json", "auth.json", "oauth_creds.json", "credentials.json",
                ".env", "id_ed25519", "id_rsa"}
SECRET_HINTS = ("token", "secret", "credential", "apikey", "api_key")
SKIP_DIRS = {"node_modules", ".git", "__pycache__", "cache", "Cache", "logs", "projects",
             "todos", "shell-snapshots", "statsig", "ide"}
MAX_FILE_BYTES = 5 * 1024 * 1024


def is_secret(p: Path) -> bool:
    n = p.name.lower()
    return p.name in SECRET_NAMES or any(s in n for s in SECRET_HINTS)


# ---------------------------------------------------------------------------
# 訂閱邏輯
# ---------------------------------------------------------------------------

CYCLES = {"monthly": 1, "quarterly": 3, "yearly": 12, "usage": 0}


def add_months(d: dt.date, months: int) -> dt.date:
    m = d.month - 1 + months
    y = d.year + m // 12
    m = m % 12 + 1
    return dt.date(y, m, min(d.day, calendar.monthrange(y, m)[1]))


def next_renewal(sub: dict, ref: dt.date | None = None) -> dt.date | None:
    ref = ref or today()
    months = CYCLES.get(sub.get("cycle", "monthly"), 1)
    start = sub.get("start_date")
    if not months or not start:
        return None
    d = dt.date.fromisoformat(start)
    n = 0
    while add_months(d, n) <= ref:
        n += months
    return add_months(d, n)


def monthly_cost(sub: dict, db: dict) -> float:
    """以基準幣別換算的每月成本。用量計費者取近 30 天花費。"""
    rate = db["rates"].get(sub.get("currency", db["base_currency"]), 1.0)
    base_rate = db["rates"].get(db["base_currency"], 1.0)
    cycle = sub.get("cycle", "monthly")
    if cycle == "usage":
        cutoff = today() - dt.timedelta(days=30)
        amt = sum(u.get("cost", 0) for u in sub.get("usage", [])
                  if dt.date.fromisoformat(u["date"]) > cutoff)
    else:
        amt = sub.get("price", 0) / CYCLES[cycle]
    return amt * rate / base_rate


def last_used(sub: dict) -> dt.date | None:
    dates = [dt.date.fromisoformat(u["date"]) for u in sub.get("usage", [])]
    return max(dates) if dates else None


def uses_last_30(sub: dict) -> int:
    cutoff = today() - dt.timedelta(days=30)
    return sum(int(u.get("count", 1)) for u in sub.get("usage", [])
               if dt.date.fromisoformat(u["date"]) > cutoff)


def find_sub(db: dict, key: str) -> dict:
    key_l = key.lower()
    for s in db["subscriptions"]:
        if s["id"] == key_l or s["name"].lower() == key_l:
            return s
    matches = [s for s in db["subscriptions"] if key_l in s["name"].lower()]
    if len(matches) == 1:
        return matches[0]
    sys.exit(f"找不到訂閱：{key}" if not matches else f"「{key}」符合多筆，請用 id：" +
             ", ".join(s["id"] for s in matches))


def make_id(db: dict, name: str) -> str:
    base = "".join(c if c.isalnum() else "-" for c in name.lower()).strip("-") or "sub"
    ids = {s["id"] for s in db["subscriptions"]}
    i, sid = 2, base
    while sid in ids:
        sid, i = f"{base}-{i}", i + 1
    return sid


def evaluate(db: dict) -> list[tuple[dict, list[str], bool]]:
    """回傳 [(訂閱, 理由清單, 是否已到可執行取消的時間)]，只含建議取消者。"""
    r = db["rules"]
    t = today()
    active = [s for s in db["subscriptions"] if s.get("status") == "active"]
    out: dict[str, tuple[dict, list[str]]] = {}

    def flag(s, why):
        out.setdefault(s["id"], (s, []))[1].append(why)

    for s in active:
        if s.get("keep"):
            continue
        if s.get("cancel_on") and dt.date.fromisoformat(s["cancel_on"]) <= t:
            flag(s, f"已到預定取消日 {s['cancel_on']}")
        lu = last_used(s) or (dt.date.fromisoformat(s["start_date"]) if s.get("start_date") else None)
        if r["unused_days"] and lu and (t - lu).days >= r["unused_days"]:
            flag(s, f"已 {(t - lu).days} 天未使用（規則：{r['unused_days']} 天）")
        if r["min_uses_per_month"] and s.get("start_date") and \
                (t - dt.date.fromisoformat(s["start_date"])).days >= 30 and \
                uses_last_30(s) < r["min_uses_per_month"]:
            flag(s, f"近 30 天僅使用 {uses_last_30(s)} 次（規則：至少 {r['min_uses_per_month']} 次）")

    if r["monthly_budget"]:
        total = sum(monthly_cost(s, db) for s in active)
        if total > r["monthly_budget"]:
            # 依「每次使用成本」由高到低砍，直到低於預算
            def cpu(s):
                return monthly_cost(s, db) / max(uses_last_30(s), 1)
            for s in sorted((s for s in active if not s.get("keep")), key=cpu, reverse=True):
                if total <= r["monthly_budget"]:
                    break
                flag(s, f"總月費 {total:,.0f} 超出預算 {r['monthly_budget']:,.0f} {db['base_currency']}，"
                        f"此項每次使用成本最高")
                total -= monthly_cost(s, db)

    result = []
    for s, why in out.values():
        nr = next_renewal(s)
        due = nr is None or (nr - t).days <= r["renewal_warning_days"] or \
            any(w.startswith("已到預定取消日") for w in why)
        result.append((s, why, due))
    return result


def do_cancel(db: dict, s: dict, reason: str, open_page: bool) -> None:
    s["status"] = "cancelled"
    s["cancelled_date"] = today().isoformat()
    s["cancel_reason"] = reason
    log_event(db, f"取消 {s['name']}：{reason}")
    url = s.get("manage_url")
    print(f"  ✔ 已標記取消：{s['name']}")
    if url:
        print(f"    → 請到此頁面完成實際取消：{url}")
        if open_page:
            webbrowser.open(url)


# ---------------------------------------------------------------------------
# 指令
# ---------------------------------------------------------------------------

def money(v: float, cur: str) -> str:
    return f"{v:,.2f} {cur}" if v < 100 else f"{v:,.0f} {cur}"


def cmd_add(a):
    db = load_db()
    preset = PRESETS.get((a.preset or "").lower(), {})
    if a.preset and not preset:
        sys.exit(f"未知預設：{a.preset}，可用：{', '.join(PRESETS)}")
    name = a.name or preset.get("name")
    if not name:
        sys.exit("請提供 --name 或 --preset")
    sub = {
        "id": make_id(db, name),
        "name": name,
        "vendor": a.vendor or preset.get("vendor", ""),
        "plan": a.plan or "",
        "price": a.price,
        "currency": a.currency.upper(),
        "cycle": a.cycle,
        "start_date": a.start or today().isoformat(),
        "status": "active",
        "account": a.account or "",
        "payment": a.payment or "",
        "manage_url": a.url or preset.get("manage_url", ""),
        "keep": a.keep,
        "notes": a.notes or "",
        "usage": [],
    }
    if a.cancel_on:
        sub["cancel_on"] = a.cancel_on
    db["subscriptions"].append(sub)
    log_event(db, f"新增 {name} {a.plan or ''} {a.price} {sub['currency']}/{a.cycle}")
    save_db(db)
    print(f"已新增：{name}（id: {sub['id']}），下次續約：{next_renewal(sub) or '—'}")


def cmd_edit(a):
    db = load_db()
    s = find_sub(db, a.id)
    changes = {k: v for k, v in {
        "name": a.name, "vendor": a.vendor, "plan": a.plan, "price": a.price,
        "currency": a.currency.upper() if a.currency else None, "cycle": a.cycle,
        "start_date": a.start, "account": a.account, "payment": a.payment,
        "manage_url": a.url, "notes": a.notes, "cancel_on": a.cancel_on,
        "status": a.status}.items() if v is not None}
    if a.keep is not None:
        changes["keep"] = a.keep
    s.update(changes)
    if a.status == "active":
        s.pop("cancelled_date", None)
        s.pop("cancel_reason", None)
    log_event(db, f"修改 {s['name']}：{changes}")
    save_db(db)
    print(f"已更新 {s['name']}：{', '.join(changes) or '（無變更）'}")


def cmd_remove(a):
    db = load_db()
    s = find_sub(db, a.id)
    db["subscriptions"].remove(s)
    log_event(db, f"刪除紀錄 {s['name']}")
    save_db(db)
    print(f"已刪除紀錄：{s['name']}（注意：這不會取消實際訂閱，取消請用 cancel）")


def cmd_list(a):
    db = load_db()
    subs = db["subscriptions"] if a.all else [s for s in db["subscriptions"] if s["status"] == "active"]
    if not subs:
        print("目前沒有訂閱。用 `add --preset claude --price 20 --currency USD` 新增。")
        return
    cur = db["base_currency"]
    rows = [("ID", "名稱", "方案", "價格", "月費(" + cur + ")", "下次續約", "近30天", "最後使用", "狀態")]
    for s in subs:
        nr = next_renewal(s) if s["status"] == "active" else None
        lu = last_used(s)
        price = "用量計費" if s["cycle"] == "usage" else f"{s['price']:g} {s['currency']}/{s['cycle']}"
        rows.append((s["id"], s["name"], s.get("plan", ""), price, f"{monthly_cost(s, db):,.0f}",
                     nr.isoformat() if nr else "—", str(uses_last_30(s)),
                     lu.isoformat() if lu else "—",
                     ("🔒" if s.get("keep") else "") + s["status"]))
    print_table(rows)
    total = sum(monthly_cost(s, db) for s in db["subscriptions"] if s["status"] == "active")
    print(f"\n使用中合計：每月 {money(total, cur)}，每年約 {money(total * 12, cur)}")


def print_table(rows):
    def w(s):
        return sum(2 if ord(c) > 0x2E80 else 1 for c in str(s))
    widths = [max(w(r[i]) for r in rows) for i in range(len(rows[0]))]
    for n, r in enumerate(rows):
        print("  ".join(str(c) + " " * (widths[i] - w(c)) for i, c in enumerate(r)).rstrip())
        if n == 0:
            print("  ".join("-" * x for x in widths))


def cmd_show(a):
    db = load_db()
    s = find_sub(db, a.id)
    for k, v in s.items():
        if k != "usage":
            print(f"{k:14}: {v}")
    print(f"{'monthly_cost':14}: {money(monthly_cost(s, db), db['base_currency'])}")
    print(f"{'next_renewal':14}: {next_renewal(s) or '—'}")
    print(f"使用紀錄（最近 10 筆，共 {len(s['usage'])} 筆）：")
    for u in s["usage"][-10:]:
        extra = f" 花費 {u['cost']}" if u.get("cost") else ""
        print(f"  {u['date']}  x{u.get('count', 1)}{extra}  {u.get('note', '')}")


def cmd_use(a):
    db = load_db()
    s = find_sub(db, a.id)
    entry = {"date": a.date or today().isoformat(), "count": a.count}
    if a.cost:
        entry["cost"] = a.cost
    if a.note:
        entry["note"] = a.note
    s["usage"].append(entry)
    save_db(db)
    print(f"已記錄 {s['name']} 使用 {a.count} 次（{entry['date']}）。近 30 天共 {uses_last_30(s)} 次。")


def cmd_report(a):
    db = load_db()
    cur = db["base_currency"]
    active = [s for s in db["subscriptions"] if s["status"] == "active"]
    total = sum(monthly_cost(s, db) for s in active)
    print(f"=== AI 訂閱報表（{today()}，基準幣別 {cur}）===")
    print(f"使用中 {len(active)} 項，月費合計 {money(total, cur)}，年費約 {money(total * 12, cur)}")
    if db["rules"]["monthly_budget"]:
        b = db["rules"]["monthly_budget"]
        print(f"預算 {money(b, cur)}，{'超出' if total > b else '剩餘'} {money(abs(b - total), cur)}")
    print("\n每次使用成本（越高越該考慮取消）：")
    for s in sorted(active, key=lambda s: monthly_cost(s, db) / max(uses_last_30(s), 1), reverse=True):
        u = uses_last_30(s)
        cpu = monthly_cost(s, db) / max(u, 1)
        print(f"  {s['name']:<22} 月費 {monthly_cost(s, db):>8,.0f}  近30天 {u:>4} 次  每次 {cpu:>8,.1f} {cur}")
    t = today()
    soon = [(next_renewal(s), s) for s in active if next_renewal(s)]
    soon = sorted((x for x in soon if (x[0] - t).days <= 14), key=lambda x: x[0])
    if soon:
        print("\n14 天內續約：")
        for d, s in soon:
            print(f"  {d}（{(d - t).days} 天後）{s['name']} {s['price']:g} {s['currency']}")
    cancelled = [s for s in db["subscriptions"] if s["status"] == "cancelled"]
    if cancelled:
        saved = sum(monthly_cost(s, db) for s in cancelled)
        print(f"\n已取消 {len(cancelled)} 項，每月省下約 {money(saved, cur)}")


def cmd_rule(a):
    db = load_db()
    r = db["rules"]
    changed = False
    for k in ("unused_days", "monthly_budget", "min_uses_per_month", "renewal_warning_days"):
        v = getattr(a, k)
        if v is not None:
            r[k] = v
            changed = True
    if a.base_currency:
        db["base_currency"] = a.base_currency.upper()
        changed = True
    for spec in a.rate or []:
        c, v = spec.split("=")
        db["rates"][c.upper()] = float(v)
        changed = True
    if changed:
        log_event(db, f"更新規則 {r}")
        save_db(db)
    print("自動取消規則：")
    print(f"  未使用天數上限       unused_days          = {r['unused_days']}（0 = 停用）")
    print(f"  每月最少使用次數     min_uses_per_month   = {r['min_uses_per_month']}（0 = 停用）")
    print(f"  每月預算             monthly_budget       = {r['monthly_budget']} {db['base_currency']}（0 = 不限）")
    print(f"  續約前幾天才執行取消 renewal_warning_days = {r['renewal_warning_days']}")
    print(f"匯率（換算成 {db['base_currency']}）：" +
          ", ".join(f"{k}={v}" for k, v in db["rates"].items()))


def cmd_check(a):
    db = load_db()
    flagged = evaluate(db)
    if not flagged:
        print("✓ 目前沒有需要取消的訂閱。")
        return
    print(f"建議取消 {len(flagged)} 項：")
    for s, why, due in flagged:
        nr = next_renewal(s)
        when = "現在可取消" if due else f"將於續約前處理（{nr}）"
        print(f"\n• {s['name']}（{s['id']}）— {when}")
        for w in why:
            print(f"    - {w}")
        if a.apply and due:
            do_cancel(db, s, "；".join(why), open_page=not a.no_open)
    if a.apply:
        save_db(db)
    else:
        print("\n（僅預覽。加 --apply 執行自動取消；不想取消的項目可用 `edit <id> --keep` 鎖定）")


def cmd_cancel(a):
    db = load_db()
    s = find_sub(db, a.id)
    if s["status"] == "cancelled":
        print(f"{s['name']} 已經是取消狀態。")
        return
    do_cancel(db, s, a.reason or "手動取消", open_page=not a.no_open)
    save_db(db)


# --- 備份 -------------------------------------------------------------------

def iter_files(p: Path):
    if p.is_file():
        yield p
    elif p.is_dir():
        for root, dirs, files in os.walk(p):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for f in files:
                yield Path(root) / f


def cmd_backup(a):
    targets = config_targets()
    if a.only:
        wanted = {x.strip() for x in a.only.split(",")}
        unknown = wanted - targets.keys()
        if unknown:
            sys.exit(f"未知工具：{', '.join(unknown)}，可用：{', '.join(targets)}")
        targets = {k: v for k, v in targets.items() if k in wanted}
    out_dir = Path(a.out).expanduser() if a.out else backup_dir()
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = now().strftime("%Y%m%d-%H%M%S")
    zpath = out_dir / f"ai-env-{stamp}.zip"
    home = Path.home()
    manifest = {"created": now().isoformat(timespec="seconds"), "platform": sys.platform,
                "home": str(home), "include_secrets": a.include_secrets, "files": []}
    skipped_secret = []
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for tool, paths in targets.items():
            n = 0
            for base in paths:
                for f in iter_files(base):
                    if not a.include_secrets and is_secret(f):
                        skipped_secret.append(str(f))
                        continue
                    try:
                        if f.stat().st_size > MAX_FILE_BYTES:
                            continue
                        rel = f.relative_to(home)
                    except (OSError, ValueError):
                        continue
                    arc = f"{tool}/{rel.as_posix()}"
                    z.write(f, arc)
                    manifest["files"].append({"tool": tool, "path": rel.as_posix(), "arc": arc})
                    n += 1
            if n:
                print(f"  {tool:<15} {n} 個檔案")
        z.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2))
    if skipped_secret:
        print(f"  （已略過 {len(skipped_secret)} 個憑證/金鑰檔，要備份請加 --include-secrets）")
    print(f"備份完成：{zpath}（{len(manifest['files'])} 個檔案）")
    if a.keep_last:
        old = sorted(out_dir.glob("ai-env-*.zip"))[:-a.keep_last]
        for o in old:
            o.unlink()
        if old:
            print(f"已清除 {len(old)} 個舊備份（保留最新 {a.keep_last} 個）")


def cmd_backups(a):
    files = sorted(backup_dir().glob("ai-env-*.zip"))
    if not files:
        print(f"尚無備份（{backup_dir()}）")
    for f in files:
        with zipfile.ZipFile(f) as z:
            m = json.loads(z.read("manifest.json"))
        tools = sorted({x["tool"] for x in m["files"]})
        print(f"{f.name}  {len(m['files'])} 檔  {f.stat().st_size / 1024:,.0f} KB  {', '.join(tools)}")


def cmd_restore(a):
    zpath = Path(a.file).expanduser()
    if not zpath.exists():
        cand = backup_dir() / a.file
        zpath = cand if cand.exists() else sys.exit(f"找不到備份檔：{a.file}")
    home = Path.home()
    wanted = {x.strip() for x in a.only.split(",")} if a.only else None
    with zipfile.ZipFile(zpath) as z:
        m = json.loads(z.read("manifest.json"))
        items = [x for x in m["files"] if wanted is None or x["tool"] in wanted]
        print(f"{'將還原' if a.yes else '預覽（加 --yes 實際還原）'}：{len(items)} 個檔案 → {home}")
        for x in items:
            dest = (home / x["path"]).resolve()
            if home.resolve() not in dest.parents:
                print(f"  ! 略過不安全路徑 {x['path']}")
                continue
            mark = "覆蓋" if dest.exists() else "新增"
            print(f"  [{mark}] ~/{x['path']}")
            if a.yes:
                dest.parent.mkdir(parents=True, exist_ok=True)
                if dest.exists():
                    shutil.copy2(dest, dest.with_name(dest.name + ".bak-before-restore"))
                with z.open(x["arc"]) as src, dest.open("wb") as dst:
                    shutil.copyfileobj(src, dst)
    if a.yes:
        print("還原完成。被覆蓋的檔案已另存為 *.bak-before-restore。")


# --- 儀表板 -----------------------------------------------------------------

def cmd_dashboard(a):
    db = load_db()
    cur = db["base_currency"]
    active = [s for s in db["subscriptions"] if s["status"] == "active"]
    total = sum(monthly_cost(s, db) for s in active)
    flagged = {s["id"]: why for s, why, _ in evaluate(db)}
    e = html.escape
    rows = []
    for s in sorted(db["subscriptions"], key=lambda s: (s["status"] != "active", -monthly_cost(s, db))):
        nr = next_renewal(s) if s["status"] == "active" else None
        lu = last_used(s)
        warn = flagged.get(s["id"])
        status = {"active": "使用中", "cancelled": "已取消", "paused": "暫停"}.get(s["status"], s["status"])
        cls = "off" if s["status"] != "active" else ("warn" if warn else "")
        price = "用量計費" if s["cycle"] == "usage" else f"{s['price']:g} {s['currency']}/{s['cycle']}"
        link = f'<a href="{e(s["manage_url"])}" target="_blank" rel="noopener">管理</a>' if s.get("manage_url") else ""
        rows.append(
            f'<tr class="{cls}"><td><b>{e(s["name"])}</b><br><small>{e(s.get("vendor", ""))} {e(s.get("plan", ""))}</small></td>'
            f'<td>{e(price)}</td>'
            f'<td class="n">{monthly_cost(s, db):,.0f}</td><td>{nr or "—"}</td>'
            f'<td class="n">{uses_last_30(s)}</td><td>{lu or "—"}</td>'
            f'<td>{"🔒 " if s.get("keep") else ""}{status}'
            f'{"<br><small>⚠ " + e("；".join(warn)) + "</small>" if warn else ""}</td><td>{link}</td></tr>')
    budget = db["rules"]["monthly_budget"]
    pct = min(total / budget * 100, 100) if budget else 0
    doc = f"""<!doctype html><html lang="zh-Hant"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>AI Console</title>
<style>
:root{{--bg:#f7f7f8;--fg:#1d1d1f;--card:#fff;--line:#e3e3e8;--mut:#6e6e73;--warn:#fff4e5;--acc:#2f6fed}}
@media (prefers-color-scheme:dark){{:root{{--bg:#151517;--fg:#eee;--card:#1f1f22;--line:#333;--mut:#999;--warn:#3a2c12;--acc:#6b9bff}}}}
body{{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Noto Sans TC",sans-serif}}
main{{max-width:1100px;margin:auto;padding:24px 16px}}h1{{margin:0 0 4px}}.mut{{color:var(--mut)}}
.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:20px 0}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}}
.card b{{display:block;font-size:24px}}.bar{{height:6px;background:var(--line);border-radius:3px;margin-top:8px}}
.bar i{{display:block;height:100%;width:{pct:.0f}%;background:{"#d9534f" if budget and total > budget else "var(--acc)"};border-radius:3px}}
.wrap{{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:12px}}
table{{border-collapse:collapse;width:100%;min-width:760px}}th,td{{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}}
th{{font-size:13px;color:var(--mut);font-weight:600}}.n{{text-align:right;font-variant-numeric:tabular-nums}}
tr.warn{{background:var(--warn)}}tr.off{{opacity:.5}}a{{color:var(--acc)}}small{{color:var(--mut)}}
</style><main>
<h1>AI Console</h1><div class="mut">產生時間 {now():%Y-%m-%d %H:%M} · 基準幣別 {cur}</div>
<div class="cards">
<div class="card">使用中訂閱<b>{len(active)}</b></div>
<div class="card">每月合計<b>{total:,.0f} {cur}</b></div>
<div class="card">每年約<b>{total * 12:,.0f} {cur}</b></div>
<div class="card">預算<b>{f"{budget:,.0f} {cur}" if budget else "未設定"}</b>{'<div class="bar"><i></i></div>' if budget else ""}</div>
<div class="card">建議取消<b>{len(flagged)}</b></div></div>
<div class="wrap"><table><tr><th>服務</th><th>價格</th><th class="n">月費 {cur}</th><th>下次續約</th>
<th class="n">近 30 天使用</th><th>最後使用</th><th>狀態</th><th></th></tr>
{"".join(rows) or '<tr><td colspan="8">尚無訂閱</td></tr>'}</table></div>
<p class="mut">由 ai_console.py v{VERSION} 產生</p></main></html>"""
    out = Path(a.out).expanduser() if a.out else console_home() / "dashboard.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(doc, encoding="utf-8")
    print(f"儀表板：{out}")
    if a.open:
        webbrowser.open(out.as_uri())


def cmd_export(a):
    db = load_db()
    Path(a.file).write_text(json.dumps(db, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"已匯出到 {a.file}")


def cmd_import(a):
    new = json.loads(Path(a.file).read_text(encoding="utf-8"))
    if "subscriptions" not in new:
        sys.exit("檔案格式錯誤：缺少 subscriptions")
    if data_file().exists():
        shutil.copy2(data_file(), data_file().with_suffix(".json.bak"))
    save_db(new)
    print(f"已匯入 {len(new['subscriptions'])} 筆訂閱（原資料備份為 data.json.bak）")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def bool_flag(p, name, help_on, help_off):
    g = p.add_mutually_exclusive_group()
    g.add_argument(f"--{name}", dest=name, action="store_true", default=None, help=help_on)
    g.add_argument(f"--no-{name}", dest=name, action="store_false", help=help_off)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="ai_console", description="AI Console：AI 訂閱、用量、費用管理與環境設定備份")
    p.add_argument("--version", action="version", version=VERSION)
    sp = p.add_subparsers(dest="cmd", required=True)

    def sub_fields(x, required_price):
        x.add_argument("--name")
        x.add_argument("--vendor")
        x.add_argument("--plan", help="方案名稱，例如 Pro / Max / Plus")
        x.add_argument("--price", type=float, required=required_price, default=0 if required_price is False else None)
        x.add_argument("--currency", default="USD" if required_price else None)
        x.add_argument("--cycle", choices=CYCLES, default="monthly" if required_price else None)
        x.add_argument("--start", help="開始/計費日 YYYY-MM-DD（用來推算續約日）")
        x.add_argument("--account", help="使用的帳號 email")
        x.add_argument("--payment", help="付款方式，例如 信用卡末四碼")
        x.add_argument("--url", help="管理/取消訂閱的網址")
        x.add_argument("--notes")
        x.add_argument("--cancel-on", help="預定取消日 YYYY-MM-DD（例如試用期結束前）")

    x = sp.add_parser("add", help="手動新增訂閱")
    x.add_argument("--preset", help="常用服務：" + ", ".join(PRESETS))
    sub_fields(x, True)
    x.add_argument("--keep", action="store_true", help="鎖定，不讓自動規則取消")
    x.set_defaults(func=cmd_add)

    x = sp.add_parser("edit", help="修改訂閱")
    x.add_argument("id")
    sub_fields(x, False)
    x.add_argument("--status", choices=["active", "paused", "cancelled"])
    bool_flag(x, "keep", "鎖定，不讓自動規則取消", "解除鎖定")
    x.set_defaults(func=cmd_edit)

    x = sp.add_parser("remove", help="刪除訂閱紀錄")
    x.add_argument("id")
    x.set_defaults(func=cmd_remove)

    x = sp.add_parser("list", help="列出訂閱")
    x.add_argument("-a", "--all", action="store_true", help="包含已取消")
    x.set_defaults(func=cmd_list)

    x = sp.add_parser("show", help="顯示單一訂閱細節")
    x.add_argument("id")
    x.set_defaults(func=cmd_show)

    x = sp.add_parser("use", help="記錄使用狀況")
    x.add_argument("id")
    x.add_argument("-n", "--count", type=int, default=1, help="使用次數（預設 1）")
    x.add_argument("--cost", type=float, help="此次花費（用量計費 API 用）")
    x.add_argument("--date", help="日期 YYYY-MM-DD（預設今天）")
    x.add_argument("--note")
    x.set_defaults(func=cmd_use)

    x = sp.add_parser("report", help="費用與使用報表")
    x.set_defaults(func=cmd_report)

    x = sp.add_parser("rule", help="查看/設定自動取消規則與匯率")
    x.add_argument("--unused-days", type=int)
    x.add_argument("--monthly-budget", type=float)
    x.add_argument("--min-uses-per-month", type=int)
    x.add_argument("--renewal-warning-days", type=int)
    x.add_argument("--base-currency")
    x.add_argument("--rate", action="append", help="匯率，例如 --rate USD=32.5")
    x.set_defaults(func=cmd_rule)

    x = sp.add_parser("check", help="依規則檢查要取消的訂閱")
    x.add_argument("--apply", action="store_true", help="實際執行自動取消")
    x.add_argument("--no-open", action="store_true", help="不要自動開啟取消網頁（排程用）")
    x.set_defaults(func=cmd_check)

    x = sp.add_parser("cancel", help="手動取消訂閱")
    x.add_argument("id")
    x.add_argument("--reason")
    x.add_argument("--no-open", action="store_true")
    x.set_defaults(func=cmd_cancel)

    x = sp.add_parser("backup", help="備份 AI 環境設定")
    x.add_argument("--only", help="只備份指定工具，逗號分隔：" + ", ".join(config_targets()))
    x.add_argument("--out", help="輸出資料夾（預設 ~/.ai-console/backups）")
    x.add_argument("--include-secrets", action="store_true", help="一併備份登入憑證/金鑰（請妥善保管備份檔）")
    x.add_argument("--keep-last", type=int, help="只保留最新 N 個備份")
    x.set_defaults(func=cmd_backup)

    x = sp.add_parser("backups", help="列出備份")
    x.set_defaults(func=cmd_backups)

    x = sp.add_parser("restore", help="從備份還原 AI 環境設定")
    x.add_argument("file", help="備份檔路徑或檔名")
    x.add_argument("--only", help="只還原指定工具")
    x.add_argument("--yes", action="store_true", help="確認實際寫入（否則只預覽）")
    x.set_defaults(func=cmd_restore)

    x = sp.add_parser("dashboard", help="產生 HTML 儀表板")
    x.add_argument("--out")
    x.add_argument("--open", action="store_true", help="產生後用瀏覽器開啟")
    x.set_defaults(func=cmd_dashboard)

    x = sp.add_parser("export", help="匯出訂閱資料 JSON")
    x.add_argument("file")
    x.set_defaults(func=cmd_export)

    x = sp.add_parser("import", help="匯入訂閱資料 JSON（覆蓋）")
    x.add_argument("file")
    x.set_defaults(func=cmd_import)
    return p


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    a = build_parser().parse_args(argv)
    a.func(a)


if __name__ == "__main__":
    main()
