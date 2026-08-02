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
| 3 | `GET` | `/api/v1/status` | readonly | No | supported | Operating state: mode, callsign, grid, band, audio frequency, whether it is decoding or transmitting, the current target callsign, the sequence numbers currently held in the event buffer, and inputLevel — the receive audio level for the slot that just finished (rmsDb, peakDb, clipPercent and crestFactorDb). |
| 4 | `GET` | `/api/v1/messages` | readonly | No | supported | Decoded messages. |
| 5 | `GET` | `/api/v1/qso` | readonly | No | supported | QSO log with filtering and paging. |
| 6 | `GET` | `/api/v1/bands` | readonly | No | supported | Frequencies available in the current mode, with the display name the app shows and a flag for the one in use. |
| 7 | `GET` | `/api/v1/ui` | readonly | No | supported | Which screen the app is showing, the visible text on it, and the recent notices it displayed to the operator. |
| 8 | `GET` | `/api/v1/rig` | readonly | No | supported | Radio state: model, control and connection mode, frequency, SWR, power, PTT. |
| 9 | `GET` | `/api/v1/logs` | readonly | No | supported | Application debug log. |
| 10 | `GET` | `/api/v1/spectrum` | readonly | No | supported | Current audio spectrum for drawing a waterfall. |
| 11 | `GET` | `/api/v1/callsign/{callsign}` | readonly | No | supported | What the app knows about a callsign: country, grid, distance, and whether it is already in the log. |
| 12 | `GET` | `/api/v1/config` | readonly | No | supported | Selected settings, by whitelist. |
| 13 | `GET` | `/api/v1/stream` | readonly | No | supported | Server-sent events. |
| 14 | `GET` | `/api/v1/map/tile/{z}/{x}/{y}` | readonly | No | supported | Offline world map tile (JPEG) from the archive bundled in the app, so a map works with no internet connection. |
| 15 | `GET` | `/api/v1/audit` | full | No | supported | Recent API access log, newest first. |
| 16 | `GET` | `/api/v1/openapi.json` | readonly | No | supported | Machine-readable OpenAPI description of this API. |
| 17 | `POST` | `/api/v1/tx/stop` | full | Yes | supported | Stop transmitting. |
| 18 | `POST` | `/api/v1/tx/activate` | full | Yes | supported | Enable or disable transmission. |
| 19 | `POST` | `/api/v1/tx/call` | full | Yes | supported | Set the station to call. |
| 20 | `POST` | `/api/v1/tx/cq` | full | Yes | supported | Go back to calling CQ. |
| 21 | `POST` | `/api/v1/control/band` | full | Yes | supported | Change the operating frequency. |
| 22 | `POST` | `/api/v1/control/mode` | full | Yes | supported | Switch between FT8, FT4 and FT2. |
| 23 | `POST` | `/api/v1/config` | full | Yes | supported | Change one setting. |
| 24 | `POST` | `/api/v1/tx/freetext` | full | Yes | **not implemented** | Always returns 501 not_implemented. |

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

token: `readonly` · capability: `input.level` · since `26.0801`

Operating state: mode, callsign, grid, band, audio frequency, whether it is decoding or transmitting, the current target callsign, the sequence numbers currently held in the event buffer, and inputLevel — the receive audio level for the slot that just finished (rmsDb, peakDb, clipPercent and crestFactorDb).

運作狀態：模式、呼號、網格、波段、音訊頻率、是否正在解碼或發射、目前的呼叫對象、事件緩衝區目前持有的序號範圍，以及 inputLevel——剛結束的那個時序的接收音訊電平（rmsDb、peakDb、clipPercent、crestFactorDb）。

> latestSeq / oldestSeq 可用來判斷增量查詢的游標是否還在緩衝區內。 inputLevel.available is false during transmit slots and in acoustic mode — 那時沒有可用的讀數，rmsDb 等欄位不會出現，不要當成 0 處理。 targetSetBy is 'api' or 'local': the phone and the API can both change the target and the last write wins — there is deliberately no locking, because the phone must stay in ultimate control. Watch this field to notice that the operator has taken over（外掛設了呼叫 A、使用者在手機上改成 B，不看這個欄位就會繼續按著 A 的劇本跑）。

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

### `GET /api/v1/bands`

token: `readonly` · capability: `bands.list` · since `26.0801`

Frequencies available in the current mode, with the display name the app shows and a flag for the one in use. POST /control/band only accepts values from this list, so query it first rather than assuming the standard FT8 frequencies — users can define their own frequency table.

目前模式可用的頻率清單，含 App 畫面上顯示的名稱與「目前使用中」標記。POST /control/band 只接受這份清單裡的值，因此請先查詢，不要假設標準的 FT8 頻率——使用者可以自訂頻率表。

> The list changes with the mode（FT8／FT4／FT2 各有一份），切換模式後要重新查。

### `GET /api/v1/ui`

token: `readonly` · capability: `ui.state` · since `26.0801`

Which screen the app is showing, the visible text on it, and the recent notices it displayed to the operator. The other endpoints answer what the radio is doing; this one answers what the screen says — the red warning line, the toast that just appeared — which is what you cannot see when you are not next to the phone.

App 目前停在哪個畫面、畫面上看得見的文字，以及最近顯示給操作者的提示。其他端點回答的是電台在做什麼，這一個回答的是畫面上寫了什麼——那行紅字、剛跳出來的提示——也就是人不在手機旁邊時看不到的東西。

> The settings screen needs a FULL token: it displays the complete API tokens and the CloudLog/QRZ keys, so a read-only caller gets only the screen name with redacted:true and a reason. Credentials are redacted on every screen regardless（任何看起來像憑證的長字串一律遮成 ***，不倚賴 id 清單——清單遲早會漏掉新加的欄位，而那種疏漏完全沒有徵兆）。 Input fields are never included: what the user is typing is not what the app is saying. Reading walks the view tree on the main thread, so a busy UI can return 503 busy — 重試即可，這個端點沒有副作用。

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

### `POST /api/v1/tx/call`

token: `full` · **requires the transmit-control switch** · capability: `control.tx` · since `26.0801`

Parameters: `body: {"callsign": "JA1ABC", "activate": false}`

Set the station to call. Only accepts a callsign that actually appears in the recent decodes — you can only call a station the app has heard. The slot, audio frequency and signal report are taken from that decode, so the caller supplies only the callsign.

Does NOT start transmitting by default; pass activate:true for that.

設定呼叫對象。只接受最近解碼中確實出現過的呼號——只能呼叫 App 實際聽到的電台。時序、音訊頻率與信號報告都取自那則解碼，呼叫者只需要給呼號。

預設<b>不</b>開始發射，需要時帶 activate:true。

> Allowing an arbitrary string would let one typo transmit at a station that is not there — 那不只是無效發射。回 bad_request 時訊息會說明是「沒聽到這個呼號」而非格式錯誤，呼叫者才知道該等下一輪解碼。遙測與自由文字訊息不可呼叫，與解碼畫面的規則相同。

### `POST /api/v1/tx/cq`

token: `full` · **requires the transmit-control switch** · capability: `control.tx` · since `26.0801`

Parameters: `body: {"activate": false}`

Go back to calling CQ. Does NOT start transmitting by default; pass activate:true for that.

回到呼叫 CQ。預設<b>不</b>開始發射，需要時帶 activate:true。

> Fails with busy if no callsign is configured in the app — resetToCQ() 在那種情況下會靜默跳過，回 ok 會讓呼叫者以為設定成功了。

### `POST /api/v1/control/band`

token: `full` · **requires the transmit-control switch** · capability: `control.radio` · since `26.0801`

Parameters: `body: {"band": 14074000}`

Change the operating frequency. Only accepts a frequency that exists in the band list for the current mode — allowing an arbitrary value would let a plugin put the radio outside the amateur bands, and the radio may well comply. Follows exactly the same path as the app's own frequency dialog, so it introduces no new per-model CAT risk. Refused while transmitting: changing frequency mid-transmission moves the carrier while it is on the air.

切換操作頻率。只接受目前模式的波段清單中存在的頻率——允許任意值等於讓外掛把電台調到業餘頻段之外，而電台可能照做。走與 App 頻率清單完全相同的路徑，因此不會引入新的機型風險。發射中拒絕：發射途中改頻率會讓載波在空中位移。

> radioCommanded tells you whether the radio was actually commanded — VOX/藍牙模式下 App 只改自己的設定，使用者仍須手動轉電台，不講清楚會以為換好了。

### `POST /api/v1/control/mode`

token: `full` · **requires the transmit-control switch** · capability: `control.radio` · since `26.0801`

Parameters: `body: {"mode": "FT8"}`

Switch between FT8, FT4 and FT2. This is the app's timing mode and sends no command to the radio, but it DOES change the operating frequency: each mode has its own band list and the nearest entry is selected. The response carries the resulting frequency so the caller need not guess. Refused while transmitting.

切換 FT8／FT4／FT2。這是 App 內部的時序模式，不對電台送出指令，但會連帶改變操作頻率：各模式的波段清單不同，切換後會挑最接近的那一個。回應帶回新頻率，呼叫者不必自己猜。發射中拒絕。

> Changing the timing mode mid-transmission would truncate the signal — 時序模式決定發射的長度與邊界。 CAUTION: switching modes back and forth DRIFTS the frequency. The nearest entry in the new mode's band list is chosen, so FT8 14.074 → FT4 → FT2 → FT8 lands on 14.090, not back on 14.074. This is the app's existing behaviour, not specific to the API — 但透過 API 快速連切會很明顯。Read the 'band' field in the response and set it explicitly with /control/band if you need a particular frequency.

### `POST /api/v1/config`

token: `full` · **requires the transmit-control switch** · capability: `config.write` · since `26.0801`

Parameters: `body: {"key": "antenna", "value": "EFHW 20m"}`

Change one setting. The writable list is deliberately much smaller than the readable one — being able to read a value does not mean it is safe for someone else to change it. Writable: noreplylimit, finishretrylimit, antenna.

One key per request: a batch that half-succeeds leaves a state nobody can describe.

修改一項設定。可寫清單刻意比可讀清單小得多——能讀不代表別人改掉它是安全的。可寫的是 noreplylimit、finishretrylimit、antenna。

一次只改一個鍵：批次修改在部分失敗時會留下說不清的中間狀態。

> Radio connection settings (model/baudrate/connectmode) are NOT writable — 改了會斷開電台連線而遠端無法接回來，等於自斷後路。callsign 是法規識別、功率上限與 SWR 告警是安全限制、pttdelay 影響發射時序，一律不開放。頻率請用 /control/band（走那裡才會連帶命令電台換頻）。回應的 value 是實際生效的值，可能已被夾到合法範圍內。

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
| `conflict` | 409 | The request is valid but the current state does not allow it (transmitting, or a frequency outside the band list). Satisfy the precondition and retry — the request itself needs no change. | 請求本身沒問題，但目前狀態不允許（發射中、頻率不在波段清單內）。滿足前提後重試即可，不需要修改請求。 |
| `busy` | 503 | The app did not respond within 2 s. The action may or may not have been applied — query the status and retry. | App 在 2 秒內沒有回應。動作是否已執行不明，請查詢狀態後重試。 |
| `internal_error` | 500 | Unexpected failure. | 未預期的錯誤。 |
| `api_disabled` | 403 | The API is switched off in the app. | API 在 App 內被停用。 |

### When a stream slot comes back / 串流名額何時歸還

The app notices a client is gone by **failing to write to it**, so the slot is released on the next event or keepalive — within 15 s, usually much sooner. Closing the connection cleanly is enough.

**If your process is killed rather than closed**, the socket can stay half-open: writes still succeed into the kernel buffer, the app never learns you are gone, and the slot stays held far longer. Restarting your plugin in a loop then gives you a steady stream of `429` that looks like an unstable connection but is your own zombie connection holding the slot. Close the stream in a `finally`, and back off rather than reconnecting every second.

App 靠「寫入失敗」發現客戶端已離開，因此名額會在下一個事件或 keepalive 時歸還——15 秒內，通常快得多。正常關閉連線就夠了。

**程序被強制終止而非正常關閉時**，socket 可能留在半開狀態：寫入仍會成功進入核心緩衝區，App 無從得知你已離開，名額會被佔住很久。此時若外掛不斷重啟重連，就會看到連續的 `429`——看起來像連線不穩，其實是自己的殭屍連線佔著名額。請在 `finally` 裡關閉串流，重連時採用退避而不是每秒重試。

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
| `control.radio` | Band and mode switching | 切換波段與 FT8/FT4/FT2 模式 |
| `bands.list` | Available frequencies for the current mode | 目前模式可用的頻率清單 |
| `config.write` | Change a whitelisted setting | 修改白名單內的設定 |
| `audit.read` | API access log | API 存取記錄 |
| `input.level` | Receive audio level in /status | /status 內的接收音訊電平 |
| `ui.state` | Which screen is showing and the text on it | 目前顯示的畫面與畫面上的文字 |

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