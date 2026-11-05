# AI Console

集中管理各家 AI 訂閱：使用狀況、月費、續約日、自動取消規則，以及各 AI 工具環境設定的備份與還原。

- 單一檔案 `ai_console.py`，只用 Python 3.9+ 標準函式庫，Windows / macOS / Linux 皆可執行。
- 資料存在 `~/.ai-console/data.json`。設定環境變數 `AI_CONSOLE_HOME` 可改存到別處，例如 Dropbox / iCloud 資料夾，就能在多台電腦間同步。

> **關於「自動取消」**：各家 AI 都沒有提供取消訂閱的公開 API。`check --apply` 或 `cancel` 判定要取消時，會在 Console 中標記為已取消，並**開啟該服務的帳單／取消訂閱頁面**，最後的取消按鈕仍需你自己按。

## 快速開始

```bash
# 手動新增訂閱（preset 會自動填入廠商與取消頁網址）
python ai_console.py add --preset claude  --plan Max  --price 100 --currency USD --start 2026-10-12
python ai_console.py add --preset chatgpt --plan Plus --price 20  --start 2026-09-10
python ai_console.py add --preset copilot --price 100 --cycle yearly --start 2026-03-01
python ai_console.py add --name "某 AI" --price 300 --currency TWD --url https://example.com/billing \
       --cancel-on 2026-11-30          # 免費試用：預定取消日
python ai_console.py add --preset claude-api --cycle usage --price 0   # 用量計費的 API

# 記錄使用（次數；API 可記花費）
python ai_console.py use claude -n 5
python ai_console.py use claude-api --cost 12.5 --note "批次任務"

# 查看
python ai_console.py list            # 加 -a 包含已取消
python ai_console.py report          # 月費合計、每次使用成本、14 天內續約
python ai_console.py dashboard --open   # HTML 儀表板
```

可用 preset：`chatgpt` `openai-api` `claude` `claude-api` `gemini` `copilot` `cursor` `perplexity` `midjourney` `grok`。各家價格常變動，preset 不含價格，請輸入你實際付的金額。

## 自動取消規則

```bash
python ai_console.py rule --unused-days 30 --min-uses-per-month 5 --monthly-budget 3000
python ai_console.py rule --base-currency TWD --rate USD=32.5   # 基準幣別與匯率
python ai_console.py check             # 預覽哪些會被取消、原因
python ai_console.py check --apply     # 實際執行取消（開啟取消頁面）
python ai_console.py edit claude --keep   # 鎖定，永不自動取消
python ai_console.py cancel chatgpt --reason "改用 Claude"   # 手動取消
```

| 規則 | 行為 |
|---|---|
| `unused_days` | 超過 N 天沒使用 → 建議取消 |
| `min_uses_per_month` | 近 30 天使用少於 N 次 → 建議取消 |
| `monthly_budget` | 月費總額超出預算 → 從「每次使用成本」最高的開始砍，直到低於預算 |
| `cancel_on`（個別項目） | 到這天 → 取消（試用期用） |
| `renewal_warning_days` | 續約前 N 天內才真正取消（預設 3），不浪費已付費的期間 |

鎖定（`--keep`）的項目永遠不會被自動取消。

### 每天自動檢查

Linux / macOS（crontab -e）：
```
0 9 * * * python3 /path/to/ai_console.py check --apply >> ~/.ai-console/check.log 2>&1
```
Windows（工作排程器）：
```
schtasks /Create /SC DAILY /ST 09:00 /TN "AI Console" /TR "python C:\path\ai_console.py check --apply"
```

## 備份 AI 環境設定

```bash
python ai_console.py backup                     # 備份所有偵測到的工具
python ai_console.py backup --only claude-code,codex --keep-last 10
python ai_console.py backups                    # 列出備份
python ai_console.py restore ai-env-20261105-090000.zip            # 預覽
python ai_console.py restore ai-env-20261105-090000.zip --only cursor --yes   # 實際還原
```

備份存在 `~/.ai-console/backups/ai-env-<時間>.zip`，內含 `manifest.json`。還原時，會被覆蓋的既有檔案先另存為 `*.bak-before-restore`。

| 工具 | 備份內容 |
|---|---|
| claude-code | `~/.claude/settings.json`、`CLAUDE.md`、`agents/`、`commands/`、`skills/`、`hooks/`、`keybindings.json`、`~/.claude.json` |
| claude-desktop | `claude_desktop_config.json`（MCP 設定） |
| codex | `~/.codex/config.toml`、`AGENTS.md`、`prompts/` |
| gemini-cli | `~/.gemini/settings.json`、`GEMINI.md`、`commands/` |
| cursor | User `settings.json` / `keybindings.json` / `snippets`、`~/.cursor/mcp.json`、`rules/` |
| vscode-copilot | VS Code User `settings.json`、`keybindings.json`、`prompts/`、`mcp.json` |
| windsurf、continue、aider、ollama | 各自的設定檔 |
| ai-console | 本工具自己的訂閱資料 |

**安全性**：`.credentials.json`、`auth.json`、`oauth_creds.json` 等登入憑證，以及檔名含 token / secret / credential / apikey 的檔案**預設不備份**，加 `--include-secrets` 才會包含。注意 MCP 設定（如 `~/.claude.json`、`mcp.json`）的 `env` 區段可能含 API 金鑰，請把備份檔當機密保管，不要上傳到公開位置。

## 其他

```bash
python ai_console.py export subs.json   # 匯出
python ai_console.py import subs.json   # 匯入（覆蓋，原資料存為 data.json.bak）
python -m unittest test_ai_console      # 測試
```
