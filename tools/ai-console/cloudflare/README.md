# AI Console — Cloudflare 版

部署在 `https://ai.bv6lc.com`，24 小時在線。Mac mini 每天把本機使用紀錄與 AI 環境設定備份上傳上來。

```
Cloudflare（ai.bv6lc.com）                       Mac mini
├─ Access：只有你（和 Mac mini 的服務權杖）能進來   └─ launchd 每天 08:43 執行
├─ Worker：網頁 + /api/*                             ai_console.py push --backup
├─ D1：訂閱、使用紀錄、規則、收據、活動紀錄             1. 讀 Claude Code / Codex / Gemini CLI 紀錄
├─ R2：環境設定備份 zip                                 2. 打包 AI 環境設定（不含憑證）
├─ 排程（每天 09:07）：檢查規則、抓 API 費用、寄提醒      3. 上傳到 ai.bv6lc.com
└─ Email Worker：解析轉寄到 receipts@bv6lc.com 的收據
```

| 功能 | 來源 |
|---|---|
| 訂閱、月費、續約日、自動取消規則 | 網頁手動輸入；收據自動更新價格與扣款日 |
| Claude Code / Codex / Gemini CLI 使用次數與 token | Mac mini 讀本機紀錄 |
| Claude API / OpenAI API 每日費用 | Worker 每天呼叫各家 Admin API（需組織帳號的 Admin key，個人帳號沒有） |
| 每日提醒 | Telegram 和/或 Email |

各家都沒有開放「取消訂閱」的 API。規則判定該取消時，Worker 會標記為已取消並通知你，最後一步請到該服務的帳單頁按取消。

## 部署步驟

需要 Node.js 20 以上，以及 bv6lc.com 這個 Cloudflare 帳號。

### 1. 安裝並登入

```bash
cd tools/ai-console/cloudflare
npm install
npx wrangler login
```

### 2. 建立資料庫與儲存空間

```bash
npx wrangler d1 create ai-console          # 把輸出的 database_id 填進 wrangler.toml
npm run db:init                             # 建立資料表
npx wrangler r2 bucket create ai-console-backups
```

### 3. 設定 Cloudflare Access（先做這步再部署）

Zero Trust 控制台 → Access → Applications → Add an application → Self-hosted：

1. Application domain：`ai.bv6lc.com`
2. Policy 1「本人」：Action **Allow**，Include → Emails → `danlee.tw@gmail.com`
3. Access → Service Auth → Service Tokens → Create，命名 `mac-mini`，**記下 Client ID 與 Client Secret**（只顯示一次）
4. Policy 2「Mac mini」：Action **Service Auth**，Include → Service Token → `mac-mini`
5. 回到應用程式的 Overview，複製 **Application Audience (AUD) Tag**

把團隊網域（例如 `https://你的團隊名稱.cloudflareaccess.com`）與 AUD 填進 `wrangler.toml` 的 `ACCESS_TEAM_DOMAIN`、`ACCESS_AUD`。
Worker 會自己再驗證一次 Access 的簽章，這兩個值沒填時一律回 403，所以不會因為設定漏掉而對外公開。

### 4. 部署

```bash
npm run deploy
```

打開 `https://ai.bv6lc.com`，用 `danlee.tw@gmail.com` 收驗證碼登入。

### 5.（選用）API 費用、Telegram 提醒

```bash
npx wrangler secret put ANTHROPIC_ADMIN_KEY   # sk-ant-admin01-…，Claude Console 組織 → Admin keys
npx wrangler secret put OPENAI_ADMIN_KEY      # OpenAI 組織 → Admin keys
npx wrangler secret put TELEGRAM_BOT_TOKEN    # 跟 @BotFather 建立 bot 取得
npx wrangler secret put TELEGRAM_CHAT_ID      # 先傳訊息給 bot，再開 https://api.telegram.org/bot<token>/getUpdates 找 chat.id
```

設定後在網頁的「同步與紀錄」按「立即抓 API 費用」測試。

### 6.（選用）收據自動入帳與 Email 提醒

1. Cloudflare 控制台 → bv6lc.com → Email → Email Routing → 啟用（會自動加上 MX 紀錄；這個網域目前沒有收信，不影響任何東西）
2. Routing rules → Custom address：`receipts@bv6lc.com` → Action **Send to a Worker** → `ai-console`
3. 要收 Email 提醒：Destination addresses 新增並驗證 `danlee.tw@gmail.com`，再把 `wrangler.toml` 的 `[[send_email]]` 取消註解、`NOTIFY_EMAIL_TO` 填 `danlee.tw@gmail.com`，重新 `npm run deploy`
4. Gmail → 設定 → 轉寄和 POP/IMAP → 新增轉寄地址 `receipts@bv6lc.com`。Google 寄出的確認碼會出現在 AI Console 的「同步與紀錄 → 活動紀錄」
5. Gmail 建立篩選器，條件例如：

   ```
   from:(openai.com OR anthropic.com OR google.com OR github.com OR cursor.com OR perplexity.ai OR midjourney.com OR x.ai OR apple.com) subject:(receipt OR invoice OR 收據 OR 發票 OR 付款)
   ```

   動作選「轉寄到 receipts@bv6lc.com」

`RECEIPT_ALLOWED_FROM` 只接受從 `danlee.tw` 轉寄來的信，其他人寄到 receipts@ 的信會被拒收，避免假收據。

### 7. 設定 Mac mini

```bash
cd tools/ai-console
python3 ai_console.py agent-setup --url https://ai.bv6lc.com \
  --client-id <Client ID> --client-secret <Client Secret>
python3 ai_console.py scan-local          # 先看看讀到哪些使用紀錄
python3 ai_console.py push --backup       # 手動上傳一次
python3 ai_console.py agent-install       # 建立每天自動執行的 launchd 排程，照輸出的指令啟用
```

設定存在 `~/.ai-console/agent.json`（權限 600）。工具對應到哪個訂閱可以改，例如 Codex 算在 ChatGPT 方案裡：
`agent-setup --map codex=chatgpt`。對應的訂閱 id 要先在網頁上建立。

## 本機開發

```bash
npm run db:init:local
npm run dev            # http://localhost:8787，略過 Access 驗證，只限本機
npm test
```

## 安全性

- 整個網域在 Cloudflare Access 後面；Worker 另外驗證 Access JWT 的簽章、AUD、到期時間與簽發者，並關閉 `*.workers.dev` 網址，避免繞過登入。
- Admin key、Telegram token 都是 Worker Secrets，不會出現在網頁或資料庫。
- Mac mini 備份預設不含 `.credentials.json`、`auth.json` 等登入憑證。MCP 設定裡的 API 金鑰仍可能被備份，R2 只有你能下載。
- 網頁的 CSP 只允許自己的腳本，訂閱名稱等資料一律跳脫後才顯示。
