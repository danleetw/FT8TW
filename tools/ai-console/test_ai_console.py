"""python -m unittest test_ai_console.py"""
import io
import json
import os
import tempfile
import unittest
import zipfile
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

import ai_console as ac


def run(*args):
    buf = io.StringIO()
    with redirect_stdout(buf):
        ac.main(list(args))
    return buf.getvalue()


class AIConsoleTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.home = Path(self.tmp.name) / "home"
        self.home.mkdir()
        self.env = mock.patch.dict(os.environ, {
            "AI_CONSOLE_HOME": str(self.home / ".ai-console"),
            "AI_CONSOLE_TODAY": "2026-11-05",
            "HOME": str(self.home), "USERPROFILE": str(self.home),
            "XDG_CONFIG_HOME": str(self.home / ".config"), "APPDATA": str(self.home / "AppData")})
        self.env.start()
        self.browser = mock.patch("webbrowser.open")
        self.opened = self.browser.start()

    def tearDown(self):
        self.browser.stop()
        self.env.stop()
        self.tmp.cleanup()

    def db(self):
        return ac.load_db()

    def test_add_list_and_cost(self):
        run("add", "--preset", "claude", "--plan", "Max", "--price", "100", "--start", "2026-10-20")
        run("add", "--name", "Gemini", "--price", "3000", "--currency", "TWD", "--cycle", "yearly")
        s = self.db()["subscriptions"][0]
        self.assertEqual(s["manage_url"], "https://claude.ai/settings/billing")
        self.assertEqual(ac.next_renewal(s).isoformat(), "2026-11-20")
        self.assertAlmostEqual(ac.monthly_cost(s, self.db()), 3200)
        out = run("list")
        self.assertIn("3,450", out)  # 3200 + 3000/12

    def test_month_end_renewal(self):
        s = {"cycle": "monthly", "start_date": "2026-01-31"}
        self.assertEqual(ac.next_renewal(s).isoformat(), "2026-11-30")

    def test_unused_rule_waits_for_renewal_then_cancels(self):
        run("add", "--name", "Perplexity", "--price", "20", "--start", "2026-08-20", "--url", "https://example.com/billing")
        run("use", "perplexity", "--date", "2026-09-01")
        out = run("check", "--apply")
        self.assertIn("將於續約前處理", out)
        self.assertEqual(self.db()["subscriptions"][0]["status"], "active")
        os.environ["AI_CONSOLE_TODAY"] = "2026-11-18"
        run("check", "--apply")
        s = self.db()["subscriptions"][0]
        self.assertEqual(s["status"], "cancelled")
        self.opened.assert_called_once()

    def test_keep_and_budget(self):
        run("rule", "--unused-days", "0", "--monthly-budget", "1200")
        run("add", "--name", "A", "--price", "20", "--keep")
        run("add", "--name", "B", "--price", "20")
        run("add", "--name", "C", "--price", "500", "--currency", "TWD")
        run("use", "c", "-n", "50")
        flagged = [s["id"] for s, _, _ in ac.evaluate(self.db())]
        self.assertEqual(flagged, ["b"])

    def test_cancel_on_date(self):
        run("add", "--name", "Trial", "--price", "20", "--cancel-on", "2026-11-05", "--start", "2026-10-29")
        run("check", "--apply", "--no-open")
        self.assertEqual(self.db()["subscriptions"][0]["status"], "cancelled")
        self.opened.assert_not_called()

    def test_backup_skips_secrets_and_restores(self):
        claude = self.home / ".claude"
        (claude / "agents").mkdir(parents=True)
        (claude / "settings.json").write_text('{"model":"x"}')
        (claude / "agents" / "rev.md").write_text("agent")
        (claude / ".credentials.json").write_text("SECRET")
        codex = self.home / ".codex"
        codex.mkdir()
        (codex / "auth.json").write_text("SECRET")
        (codex / "config.toml").write_text("model='y'")
        run("backup")
        z = next((self.home / ".ai-console" / "backups").glob("*.zip"))
        names = zipfile.ZipFile(z).namelist()
        self.assertIn("claude-code/.claude/settings.json", names)
        self.assertIn("claude-code/.claude/agents/rev.md", names)
        self.assertIn("codex/.codex/config.toml", names)
        self.assertFalse(any("auth.json" in n or "credentials" in n for n in names))

        (claude / "settings.json").write_text("changed")
        run("restore", z.name)  # 預覽不寫入
        self.assertEqual((claude / "settings.json").read_text(), "changed")
        run("restore", z.name, "--only", "claude-code", "--yes")
        self.assertEqual((claude / "settings.json").read_text(), '{"model":"x"}')
        self.assertEqual((claude / "settings.json.bak-before-restore").read_text(), "changed")

    def test_dashboard_and_export(self):
        run("add", "--preset", "chatgpt", "--price", "20", "--plan", "Plus <b>")
        out = Path(self.tmp.name) / "d.html"
        run("dashboard", "--out", str(out))
        page = out.read_text(encoding="utf-8")
        self.assertIn("ChatGPT", page)
        self.assertIn("Plus &lt;b&gt;", page)
        exp = Path(self.tmp.name) / "e.json"
        run("export", str(exp))
        self.assertEqual(len(json.loads(exp.read_text(encoding="utf-8"))["subscriptions"]), 1)

    def test_scan_local_logs(self):
        proj = self.home / ".claude" / "projects" / "p1"
        proj.mkdir(parents=True)
        lines = [
            {"type": "user", "timestamp": "2026-11-04T01:00:00Z", "message": {"role": "user", "content": "hi"}},
            {"type": "user", "timestamp": "2026-11-04T01:00:05Z", "message": {"role": "user", "content": [{"type": "tool_result"}]}},
            {"type": "assistant", "timestamp": "2026-11-04T01:00:03Z", "message": {"id": "m1", "usage": {"input_tokens": 10, "output_tokens": 5, "cache_read_input_tokens": 999}}},
            {"type": "assistant", "timestamp": "2026-11-04T01:00:04Z", "message": {"id": "m1", "usage": {"input_tokens": 10, "output_tokens": 5}}},
            {"type": "user", "timestamp": "2026-10-01T01:00:00Z", "message": {"role": "user", "content": "old"}},
        ]
        (proj / "s.jsonl").write_text("\n".join(json.dumps(l) for l in lines) + "\nnot json\n")
        cdx = self.home / ".codex" / "sessions" / "2026" / "11" / "05"
        cdx.mkdir(parents=True)
        (cdx / "rollout-1.jsonl").write_text("\n".join(json.dumps(l) for l in [
            {"timestamp": "2026-11-05T02:00:00Z", "type": "session_meta"},
            {"timestamp": "2026-11-05T02:01:00Z", "payload": {"type": "token_count", "info": {"total_token_usage": {"total_tokens": 100}}}},
            {"timestamp": "2026-11-05T02:02:00Z", "payload": {"type": "token_count", "info": {"total_token_usage": {"total_tokens": 250}}}},
        ]))
        gem = self.home / ".gemini" / "tmp" / "abc"
        gem.mkdir(parents=True)
        (gem / "logs.json").write_text(json.dumps([
            {"type": "user", "timestamp": "2026-11-05T03:00:00Z"}, {"type": "user", "timestamp": "2026-11-05T04:00:00Z"},
            {"type": "model", "timestamp": "2026-11-05T04:00:01Z"}]))
        with mock.patch.dict(os.environ, {"TZ": "UTC"}):
            import time; time.tzset()
            rows = ac.scan_local(14, {"claude-code": "claude", "codex": "chatgpt", "gemini-cli": "gemini"})
        got = {(r["sub_id"], r["date"]): (r["count"], r["tokens"]) for r in rows}
        self.assertEqual(got[("claude", "2026-11-04")], (1, 15))   # 工具結果不算、同一則回覆只算一次、cache 讀取不算
        self.assertEqual(got[("chatgpt", "2026-11-05")], (1, 250))
        self.assertEqual(got[("gemini", "2026-11-05")], (2, 0))
        self.assertNotIn(("claude", "2026-10-01"), got)
        # 對應到同一個訂閱的工具要合併
        rows = ac.scan_local(14, {"codex": "x", "gemini-cli": "x"})
        self.assertEqual([(r["count"], r["note"]) for r in rows], [(3, "codex+gemini-cli")])

    def test_agent_setup_perms_and_env_override(self):
        run("agent-setup", "--url", "https://ai.example.com/", "--client-id", "id", "--client-secret", "sec", "--map", "gemini-cli=")
        f = self.home / ".ai-console" / "agent.json"
        self.assertEqual(oct(f.stat().st_mode & 0o777), "0o600")
        cfg = ac.load_agent()
        self.assertEqual(cfg["url"], "https://ai.example.com")
        self.assertNotIn("gemini-cli", cfg["map"])
        with mock.patch.dict(os.environ, {"AI_CONSOLE_CF_CLIENT_SECRET": "fromenv"}):
            self.assertEqual(ac.load_agent()["client_secret"], "fromenv")


if __name__ == "__main__":
    unittest.main()
