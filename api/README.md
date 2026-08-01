# FT8TW Plugin API

Read-only data access plus a small, deliberately narrow transmit-control surface, served by the phone itself over the local network.

外掛開發用的 API：以唯讀資料存取為主，另有刻意保持狹窄的發射控制端點，由手機本機在區域網路上提供服務。

| | |
|---|---|
| App version | `26.0801` |
| API version | `1.0` |
| Base URL | `http://<phone-ip>:7052/api/v1` |
| Auth | `Authorization: Bearer <token>` |

Enable it in the app: **Config → Developer API**. The address and both tokens are shown there.

在 App 中啟用：**設定 → 開發者 API**，該處會顯示網址與兩把 token。

## Before you start / 開始之前

**Judge failures by `error.code`, never by HTTP status.** A 401 covers "no token", "wrong token" and "token was regenerated", and the user needs to tell them apart.

**以 `error.code` 判斷錯誤，不要用 HTTP 狀態碼。** 401 涵蓋「沒帶 token」、「token 錯誤」與「token 被換掉」三種情況，使用者需要分辨。

**Additive-only within a major version.** Fields are added, never removed or repurposed — ignore what you do not recognise. Probe `GET /api/versions` for capabilities rather than comparing app version numbers; there is no stable mapping between the two.

**同一主版本內只增不減。** 只會新增欄位，不會移除或改變既有欄位語意，請忽略不認識的欄位。以 `GET /api/versions` 探測功能，不要比對 App 版本號 —— 兩者之間沒有穩定對應。

**Sequence numbers restart when the app restarts.** Every response carries `sessionId`; when it changes, discard your cursor and query in full.

**序號在 App 重啟後歸零。** 每個回應都帶 `sessionId`，它變了就丟棄游標並重新完整查詢。

## Endpoints

| # | Method | Path | Token | TX switch | Status | Description |
|---|---|---|---|---|---|---|
| 1 | `GET` | `/api/versions` | none | No | supported | Version and capability probe. |
| 2 | `GET` | `/api/v1/whoami` | readonly | No | supported | Reports the scope of the presented token. |
| 3 | `GET` | `/api/v1/status` | readonly | No | supported | Operating state: mode, callsign, grid, band, audio frequency, whether it is decoding or transmitting, the current target callsign, and the sequence numbers currently held in the event buffer. |
| 4 | `GET` | `/api/v1/messages` | readonly | No | supported | Decoded messages. |
| 5 | `GET` | `/api/v1/qso` | readonly | No | supported | QSO log with filtering and paging. |
| 6 | `GET` | `/api/v1/rig` | readonly | No | supported | Radio state: model, control and connection mode, frequency, SWR, power, PTT. |
| 7 | `GET` | `/api/v1/logs` | readonly | No | supported | Application debug log. |
| 8 | `GET` | `/api/v1/spectrum` | readonly | No | supported | Current audio spectrum for drawing a waterfall. |
| 9 | `GET` | `/api/v1/callsign/{callsign}` | readonly | No | supported | What the app knows about a callsign: country, grid, distance, and whether it is already in the log. |
| 10 | `GET` | `/api/v1/config` | readonly | No | supported | Selected settings, by whitelist. |
| 11 | `GET` | `/api/v1/stream` | readonly | No | supported | Server-sent events. |
| 12 | `GET` | `/api/v1/map/tile/{z}/{x}/{y}` | readonly | No | supported | Offline world map tile (JPEG) from the archive bundled in the app, so a map works with no internet connection. |
| 13 | `GET` | `/api/v1/audit` | full | No | supported | Recent API access log, newest first. |
| 14 | `GET` | `/api/v1/openapi.json` | readonly | No | supported | Machine-readable OpenAPI description of this API. |
| 15 | `POST` | `/api/v1/tx/stop` | full | Yes | supported | Stop transmitting. |
| 16 | `POST` | `/api/v1/tx/activate` | full | Yes | supported | Enable or disable transmission. |
| 17 | `POST` | `/api/v1/tx/freetext` | full | Yes | **not implemented** | Always returns 501 not_implemented. |

`TX switch` = also requires the phone's *Allow remote transmit control* switch, which is **off by default**.

`TX switch` 欄位為「是」者，另需手機上的**允許遠端控制發射**開關，該開關**預設為關**。

## Detail / 逐項說明

### `GET /api/versions`

token: `none` · since `26.0801`

Version and capability probe. The only endpoint that needs no token, so a client can discover what this phone supports before authenticating. Returns no callsign, grid or configuration value.

版本與功能探測。唯一不需要 token 的端點，讓客戶端在認證前就能知道這支手機支援哪些功能。不回傳呼號、網格或任何設定值。

> Check capabilities here rather than comparing app version numbers — 版本號與功能之間沒有穩定對應（分支、Beta、使用者跳版）。

### `GET /api/v1/whoami`

token: `readonly` · since `26.0801`

Reports the scope of the presented token. For full tokens it also returns controlAllowed, the state of the phone's remote-control switch.

回報所持 token 的權限等級。full token 另外會回傳 controlAllowed，也就是手機上遠端控制開關的狀態。

> controlAllowed is absent for read-only tokens — 唯讀持有者不該能推斷手機是否允許遠端控制。

### `GET /api/v1/status`

token: `readonly` · since `26.0801`

Operating state: mode, callsign, grid, band, audio frequency, whether it is decoding or transmitting, the current target callsign, and the sequence numbers currently held in the event buffer.

運作狀態：模式、呼號、網格、波段、音訊頻率、是否正在解碼或發射、目前的呼叫對象，以及事件緩衝區目前持有的序號範圍。

> latestSeq / oldestSeq 可用來判斷增量查詢的游標是否還在緩衝區內。

### `GET /api/v1/messages`

token: `readonly` · capability: `messages.incremental` · since `26.0801`

Parameters: `since, limit (default 200, max 2000)`

Decoded messages. With since=<seq> it returns the next batch after that cursor; without it you get the most recent 'limit' messages.

解碼訊息。帶 since=<seq> 時回傳該游標之後的下一批；未帶時回傳最新的 limit 筆。

> truncated:true means the buffer discarded your starting point and there is a gap — 不可把拿到的資料當成連續的。序號在 App 重啟後歸零，請以回應信封的 sessionId 偵測重啟。

### `GET /api/v1/qso`

token: `readonly` · capability: `qso.incremental` · since `26.0801`

Parameters: `since, call, band, mode, from, to, limit, offset`

QSO log with filtering and paging. Incremental sync uses since=<updated_at in ms>, not an id: LotW import, manual confirmation and log edits all UPDATE existing rows, which an id-based cursor never sees.

通聯記錄，可篩選與分頁。增量同步用 since=<updated_at 毫秒> 而非 id：LotW 匯入、手動 QSL 確認與日誌編輯都是更新既有列，用 id 當游標抓不到。

> from / to 為 ADIF 的 YYYYMMDD。回應的 hasMore 用於翻頁，nextSince 用於下一次增量查詢。

### `GET /api/v1/rig`

token: `readonly` · capability: `rig.status` · since `26.0801`

Radio state: model, control and connection mode, frequency, SWR, power, PTT.

電台狀態：型號、控制與連線方式、頻率、SWR、功率、PTT。

> Values the radio does not report come back as null, never 0 — 外掛拿到 0 會以為是真實讀數。SWR 小於 1.0 代表該機從未回報過。

### `GET /api/v1/logs`

token: `readonly` · capability: `logs` · since `26.0801`

Parameters: `since, limit, tag, level`

Application debug log. Same cursor semantics as /messages.

App 的除錯訊息。游標語意與 /messages 相同。

> tag / level 過濾會在截斷之前套用，因此 limit 拿到的是過濾後的筆數。

### `GET /api/v1/spectrum`

token: `readonly` · capability: `spectrum` · since `26.0801`

Parameters: `denoise (0/1)`

Current audio spectrum for drawing a waterfall. The FFT is computed per request, so it costs nothing while nobody is asking, and it does not require the user to be on the app's own spectrum screen.

目前的音訊頻譜，供外部畫瀑布圖。FFT 是按需計算，沒有請求就沒有成本，也不需要使用者停留在 App 的頻譜畫面。

> Use binHz to convert bin index to Hz — 不要自己猜 FFT 大小。數值已套用 App 的瀑布圖 AGC（0-255 顯示等級），再拉伸一次會抬高雜訊。

### `GET /api/v1/callsign/{callsign}`

token: `readonly` · capability: `callsign.lookup` · since `26.0801`

What the app knows about a callsign: country, grid, distance, and whether it is already in the log.

App 對某個呼號所知的資訊：國家、網格、距離，以及是否已在通聯記錄中。

> Grid comes from the app's own CallsignQTH cache — 沒有查過的呼號會回 null。

### `GET /api/v1/config`

token: `readonly` · capability: `config.read` · since `26.0801`

Selected settings, by whitelist. Only explicitly listed keys are exposed.

部分設定值，採白名單。只有明確列出的鍵才會出現。

> Whitelist, not blacklist — 用黑名單的話，日後新增一個含密碼的設定就會自動外洩且無人察覺。第三方憑證（Cloudlog、QRZ）永遠不在其中。

### `GET /api/v1/stream`

token: `readonly` · capability: `stream.sse` · since `26.0801`

Parameters: `events (decode,rig,qso,log,status), since, token`

Server-sent events. Each subscriber gets an independent queue, so multiple clients receive every event rather than sharing them out.

事件串流（SSE）。每個訂閱者有獨立佇列，多個客戶端各自收到完整事件，不會互相瓜分。

> EventSource cannot set headers, so this endpoint also accepts ?token= （瀏覽器規格限制）。收到 dropped 事件代表你的客戶端跟不上產生速度。

### `GET /api/v1/map/tile/{z}/{x}/{y}`

token: `readonly` · capability: `map.tiles` · since `26.0801`

Parameters: `token`

Offline world map tile (JPEG) from the archive bundled in the app, so a map works with no internet connection. Zoom 0-4 only.

離線世界地圖圖磚（JPEG），來自 App 內建的圖磚檔，沒有網路也能畫地圖。僅支援 zoom 0-4。

> Accepts ?token= so it can be used directly as an <img> source。此端點刻意不寫入稽核記錄，否則十幾個圖磚請求會把真正該看的存取洗掉。

### `GET /api/v1/audit`

token: `full` · capability: `audit.read` · since `26.0801`

Parameters: `limit`

Recent API access log, newest first. Requires a full-access token because entries contain each caller's IP and access history. NOT gated by the remote-control switch: being unable to look at what just happened right after switching remote control off would be exactly the wrong behaviour.

近期的 API 存取記錄，由新到舊。需要 full token，因為記錄含每個呼叫者的 IP 與存取歷史。不受遠端控制開關影響：使用者發現異狀而關掉遠端控制之後，正是最需要查得到剛才發生什麼的時候。

> Ring buffer of 200 — held == capacity 表示更早的存取已被丟棄，這份清單不是完整歷史。讀取本身會被記錄，因此不要輪詢。

### `GET /api/v1/openapi.json`

token: `readonly` · since `26.0801`

Machine-readable OpenAPI description of this API.

本 API 的 OpenAPI 描述（機器可讀）。

### `POST /api/v1/tx/stop`

token: `full` · **requires the transmit-control switch** · capability: `control.tx` · since `26.0801`

Parameters: `— (empty body)`

Stop transmitting. Succeeds in EVERY state, including when nothing is transmitting and when the transmitter is not initialised — the caller's goal (nothing on the air) is already met, so that is not an error. Use the 'changed' field to tell 'I stopped a transmission' from 'nothing was running'.

停止發射。任何狀態下都成功，包含本來就沒在發射、以及發射器尚未初始化——呼叫者要的條件（沒有東西在空中）那時已經滿足，回錯誤只會讓對方重試。用 changed 欄位分辨「停下了一個發射」與「本來就沒在發」。

> Stop must never fail on a precondition — 那會讓它在最需要的時候不能用。

### `POST /api/v1/tx/activate`

token: `full` · **requires the transmit-control switch** · capability: `control.tx` · since `26.0801`

Parameters: `body: {"activated": true|false}`

Enable or disable transmission. The 'activated' field is required and is never defaulted — guessing it would start a transmission on a malformed request. The response reports the ACTUAL state, not the request: the app can refuse (for example while a mandatory update is pending), in which case 'blocked' is true.

開啟或關閉發射。activated 欄位為必填且不套用預設值——猜成 true 會讓一個打錯的請求開始發射。回應帶的是實際狀態而非請求值：App 可能拒絕（例如必要更新尚未完成），此時 blocked 為 true。

> Goes through the app's own state machine, so it inherits every guard already there — 不自行改旗標。

### `POST /api/v1/tx/freetext`

token: `full` · **requires the transmit-control switch** · since `26.0801` · **Not implemented (by design)**

Always returns 501 not_implemented. Free text can put arbitrary content on the air under the licence holder's callsign, and that responsibility cannot be delimited by software. The path is reserved and documented so that plugin authors can tell a deliberate decision from a missing feature.

固定回 501 not_implemented。自由文字可以用執照持有人的呼號送出任意內容，而內容責任無法由軟體界定。此路徑保留並寫入文件，讓外掛作者能分辨「刻意不開放」與「功能還沒做」。

> Returning 404 would be read as 'your app is too old' — 那是錯的訊息。

## Error codes

| `error.code` | HTTP | English | 中文 |
|---|---|---|---|
| `unauthorized` | 401 | No token was supplied. | 未提供 token。 |
| `invalid_token` | 401 | The token is not recognised. | token 無效。 |
| `token_revoked` | 401 | This token was regenerated in the app. Fetch the new one. | 此 token 已在 App 內重新產生，請取得新的。 |
| `scope_required` | 403 | The endpoint needs a higher privilege; see error.required. | 端點需要更高權限，見 error.required 欄位。 |
| `control_disabled` | 403 | Remote transmit control is switched off on the phone (Config -> Developer API). Separate from the token — the switch is off by default. | 手機上的遠端控制開關是關的（設定 → 開發者 API）。與 token 無關，該開關預設為關。 |
| `method_not_allowed` | 405 | Wrong HTTP method. Control endpoints are POST only. | HTTP 方法錯誤。控制端點只接受 POST。 |
| `not_implemented` | 501 | The endpoint exists in the namespace but is deliberately not implemented. | 端點存在於命名空間中，但刻意未實作。 |
| `not_found` | 404 | No such endpoint. | 沒有這個端點。 |
| `bad_request` | 400 | A parameter is missing or malformed; see error.param. | 參數缺少或格式錯誤，見 error.param 欄位。 |
| `session_changed` | 409 | The app restarted since your cursor was issued. Discard it and query in full. | App 在你取得游標之後重啟過。請丟棄游標並重新完整查詢。 |
| `too_many_connections` | 429 | Connection limit reached (4 requests / 3 streams). Close an existing client. | 連線數已達上限（4 個請求／3 條串流）。請先關掉一個既有的客戶端。 |
| `busy` | 503 | The app did not respond within 2 s. The action may or may not have been applied — query the status and retry. | App 在 2 秒內沒有回應。動作是否已執行不明，請查詢狀態後重試。 |
| `internal_error` | 500 | Unexpected failure. | 未預期的錯誤。 |
| `api_disabled` | 403 | The API is switched off in the app. | API 在 App 內被停用。 |

## Capabilities

Probe with `GET /api/versions`. A capability means **this build implements the feature**, not that it is usable right now — `control.tx` is listed even while the phone's transmit-control switch is off. Use the `control_disabled` error to tell those apart.

以 `GET /api/versions` 探測。capability 代表**這個版本實作了該功能**，而非「現在可以用」—— 手機的發射控制開關關著時 `control.tx` 仍然會列出。兩者要靠 `control_disabled` 錯誤碼分辨。

| capability | English | 中文 |
|---|---|---|
| `messages.incremental` | Incremental decode queries | 解碼訊息的增量查詢 |
| `qso.incremental` | Incremental QSO log sync | 通聯記錄的增量同步 |
| `rig.status` | Radio status | 電台狀態 |
| `logs` | Application log | App 除錯訊息 |
| `callsign.lookup` | Callsign lookup | 呼號查詢 |
| `config.read` | Whitelisted settings | 白名單內的設定值 |
| `stream.sse` | Server-sent event stream | SSE 事件串流 |
| `map.tiles` | Offline map tiles | 離線地圖圖磚 |
| `spectrum` | Audio spectrum for waterfalls | 音訊頻譜（瀑布圖用） |
| `control.tx` | Transmit enable / stop | 發射開關與停止 |
| `audit.read` | API access log | API 存取記錄 |

## Transmit control / 發射控制

Two independent conditions, both required:

1. a **full-access token** — what *this caller* is allowed to do;
2. the phone's **Allow remote transmit control** switch — whether *this phone's owner* agrees to remote transmission at all. Off by default.

兩個獨立條件，缺一不可：

1. **full token** —— 這個呼叫者被授予什麼；
2. 手機上的**允許遠端控制發射**開關 —— 這台手機的主人是否同意任何人遠端發射。預設為關。

The full-access token is generated the first time the API is enabled, so holding one does not express the second condition. That is what the switch is for.

full token 在首次啟用 API 時就一併產生，因此持有它不足以表達第二個條件 —— 那正是這道開關存在的理由。

`POST /api/v1/tx/stop` **succeeds in every state**, including when nothing is transmitting. Stopping converges on the safe state; it must never fail on a precondition.

`POST /api/v1/tx/stop` **在任何狀態下都成功**，包含本來就沒在發射的時候。停止是收斂到安全狀態的操作，不可以因為前置條件不滿足而失敗。

Free-text transmit is **deliberately not exposed** (`501 not_implemented`). Arbitrary content would go on the air under the licence holder's callsign, and that responsibility cannot be delimited by software.

自由文字發射**刻意不開放**（`501 not_implemented`）。任意內容會以執照持有人的呼號送上空中，而內容責任無法由軟體界定。

**You remain responsible for everything your station transmits.**

**電台發出的內容仍然由您負責。**

## Example / 範例

```bash
PHONE=192.168.1.50:7052
TOKEN=<read-only token from Config -> Developer API>

# What does this phone support? (no token needed)
curl -s http://$PHONE/api/versions

# Most recent decodes
curl -s -H "Authorization: Bearer $TOKEN" \
     "http://$PHONE/api/v1/messages?limit=20"

# Then poll incrementally from the cursor it returned
curl -s -H "Authorization: Bearer $TOKEN" \
     "http://$PHONE/api/v1/messages?since=$NEXT_SEQ"

# Live stream (EventSource cannot set headers, hence ?token=)
curl -N "http://$PHONE/api/v1/stream?events=decode&token=$TOKEN"

# Stop transmitting — needs the FULL token and the phone's switch
curl -s -X POST -H "Authorization: Bearer $FULL_TOKEN" \
     -H 'Content-Type: application/json' -d '{}' \
     http://$PHONE/api/v1/tx/stop
```

A Python SDK and runnable examples live in [`sdk/python`](https://github.com/danleetw/ft8tw/tree/release/sdk/python). A working browser client is served by the phone itself at `http://<phone-ip>:7052/api_demo.html` — view source for the request patterns.

Python SDK 與可執行範例在 [`sdk/python`](https://github.com/danleetw/ft8tw/tree/release/sdk/python)。手機本身也提供一個可用的網頁客戶端：`http://<手機IP>:7052/api_demo.html`，檢視原始碼即可看到請求寫法。

---

Generated by `tools/gen_api_docs.py` — edit that file, not this one.

本檔由 `tools/gen_api_docs.py` 產生，請修改該程式而非直接編輯此檔。