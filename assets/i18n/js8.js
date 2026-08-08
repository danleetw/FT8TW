/* ── FT8TW User Manual – i18n: JS8 Chat Mode ─────────────────────── */

const PAGE_T = {

en: {
  js8_title: 'JS8 Chat Mode',
  js8_intro: 'JS8 is a keyboard-to-keyboard chat mode built on the FT8 signal structure, allowing free-form conversation, store-and-forward messaging, and network-style commands in addition to structured QSOs. Open the JS8 tab to access the chat screen.',

  js8_what_title: 'What JS8 Is',
  js8_what_text:  'JS8, devised by KN4CRD, borrows the signal structure of <a href="operating.html">FT8</a> and replaces the rigid message layer on top of it with <strong>free typed text, keyboard to keyboard</strong>. In other words: it keeps FT8\'s ability to be decoded when the signal is far too weak to hear, but lets you actually say something rather than only exchange callsigns and reports.',
  js8_what_list: `
    <ul>
      <li><strong>You can type freely</strong> — at whatever length you like. The app splits the message into frames sent one after another, so <strong>long messages take a while</strong>: in Normal mode one frame goes out every 15 seconds.</li>
      <li><strong>The conversation is not live</strong> — unlike voice. After you send, the other operator has to receive it in the next slot and then type back; exchanges are measured in minutes.</li>
      <li><strong>Messages and queries</strong> — it supports heartbeats (periodically announcing that you are there), directed commands (asking another station for its SNR, grid or info) and store-and-forward messages for stations that are not currently listening.</li>
      <li><strong>It does not interwork with FT8</strong> — the underlying signal structure is shared, but they are two separate modes; you need JS8 on a JS8 frequency to meet anyone.</li>
    </ul>`,

  js8_quick_title: 'Quick Start: Sending Your First JS8 Message',
  js8_quick_text:  'JS8 has no automatic QSO sequence the way FT8 does — it is a conversation, and what you say and when is up to you.',
  js8_quick_steps: `
    <ol>
      <li>Check that <strong>your callsign</strong> is set, and put the radio on the band's usual JS8 frequency (14.078 MHz on 20 m, for example).</li>
      <li>Open the <strong>JS8</strong> tab from the main menu or the floating window.</li>
      <li>Set the speed to <strong>NORMAL 15s</strong> — it is what most people use, so start there.</li>
      <li>Make sure <strong>receive/decode</strong> is on and watch for a few minutes; seeing other people's traffic confirms you are on the right frequency.</li>
      <li>Type in the box at the bottom and press <strong>Send</strong>. The message is queued for the next slot; you can type the next one while the first is still going out, and it will wait its turn.</li>
      <li>Replies arrive as chat bubbles. Long-press a bubble to copy or delete it.</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>Step</th><th>Sent</th><th>Notes</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>Calling CQ. The CQ button fills in your callsign and grid for you</td></tr>
      <tr><td>2</td><td>(them) <code>BV6LC: BX1AA SNR -07</code></td><td>They answer, with the strength at which they hear you</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>Free text — from here it is an ordinary conversation</td></tr>
      <tr><td>4</td><td>(them) <code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>Their reply</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>Signing off</td></tr>
    </table>`,
  js8_quick_note: 'Common replies do not have to be retyped — the <strong>Quick messages</strong> button holds ready-made ones (reply SNR, reply INFO, reply STATUS). Note also that message text is folded to a limited upper-case character set; to send Chinese or any other non-ASCII content, see <strong>Unicode Text (UTX)</strong> below.',

  js8_speed_title: 'Speed Modes',
  js8_speed_text:  'JS8 offers five speed submodes, trading sensitivity against throughput. Everyone has to be on the <strong>same speed</strong> to hear each other:',
  js8_speed_table: `
    <table>
      <tr><th>Mode</th><th>Slot length</th><th>Characteristics</th></tr>
      <tr><td>NORMAL</td><td>15 s</td><td>Best sensitivity, standard throughput. <strong>The general choice — start here</strong></td></tr>
      <tr><td>FAST</td><td>10 s</td><td>Higher throughput, slightly reduced sensitivity</td></tr>
      <tr><td>TURBO</td><td>6 s</td><td>Fastest throughput, reduced sensitivity — best for strong local signals</td></tr>
      <tr><td>SLOW</td><td>30 s</td><td>Highest sensitivity, lowest throughput — best for marginal DX</td></tr>
      <tr><td>FT8TW</td><td>4 s</td><td><strong>An FT8TW-only mode that does not interwork with standard JS8Call.</strong> Only someone else running FT8TW on the same setting will hear you — useful for short-range testing between your own stations</td></tr>
    </table>`,

  js8_msg_title: 'Message Types',
  js8_msg_text:  'JS8 supports several message formats beyond a simple CQ/reply exchange:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat (HB)</strong> – A periodic announcement of your presence and signal report, so other stations can hear you without an active QSO.</li>
      <li><strong>Directed commands</strong> – Query another station for its SNR, grid, info string, or "heard" list (e.g. <code>CALL SNR?</code>, <code>CALL GRID?</code>, <code>CALL HEARING?</code>).</li>
      <li><strong>Free text</strong> – Full-length conversational messages, automatically split across as many transmit frames as needed.</li>
      <li><strong>Store-and-forward (MSG / MSG TO:)</strong> – Buffered commands with a checksum, for relaying a message to a station that isn't currently listening.</li>
    </ul>`,

  js8_bubble_title: 'Long-Press Menu on Chat Bubbles',
  js8_bubble_text:  'Long-press any bubble in the chat view to open a menu:',
  js8_bubble_list: `
    <ul>
      <li><strong>Copy message</strong> — copies just the message text.</li>
      <li><strong>Copy full content</strong> — copies the information line as well (time, TX or the other station\'s callsign, signal report, frequency), exactly as shown on screen.</li>
      <li><strong>Delete message</strong> — removes that message from the chat history. This <strong>cannot be undone</strong>, so it asks for confirmation first.</li>
    </ul>
    <p>A bubble that is still being received offers copying only — it is not in the permanent record yet. Note also that because long-press now opens this menu, message text can no longer be dragged to select part of it; use the two copy items instead.</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Enable heartbeat announcements at a configurable interval (10, 15, or 30 minutes) so other stations know you are monitoring, even without an active QSO.',

  js8_autoreply_title: 'Auto-Reply',
  js8_autoreply_text:  'Auto-reply can automatically answer directed queries (SNR?/GRID?/INFO?/HEARING?/AGN?) addressed to your callsign, and optionally answer CQ calls as well; each is a separate toggle, both default to off. A per-source cooldown prevents responding to the same station too frequently.',

  js8_unicode_title: 'Unicode Text (UTX)',
  js8_unicode_text:  'Standard JS8 free text is limited to an uppercase ASCII subset. FT8TW adds an optional, openly documented extension called UTX that allows free text to carry full Unicode content — Chinese, Japanese, Korean, Cyrillic, Arabic, and more — while remaining fully backward-compatible with unmodified JS8Call software. UTX is purely a public, reversible text-encoding format (comparable to UTF-8), never an obscuring cipher, and its complete bit-level specification is published with the project source for anyone to inspect or re-implement.',

  js8_safety_title: 'Transmit Safety',
  js8_safety_text:  'As with FT8/FT4, an independent watchdog automatically stops any JS8 transmission (including heartbeat and auto-reply) if the app is closed, backgrounded and killed by the system, or crashes, preventing the radio from being left keyed unattended.',
},

'zh-TW': {
  js8_title: 'JS8 聊天模式',
  js8_intro: '本章說明 JS8 是什麼、如何發出第一則訊息，以及速度模式、指令、自動回覆與 Unicode 文字等進階用法。從主選單或浮動視窗開啟 JS8 分頁即可進入聊天畫面。',

  js8_what_title: '什麼是 JS8',
  js8_what_text:  'JS8 由 KN4CRD 提出，把 <a href="operating.html">FT8</a> 的訊號結構借過來，換掉上面那層固定格式的訊息，改成<strong>可以自由打字的鍵盤對鍵盤模式</strong>。也就是說：它保留了 FT8「弱到聽不見也解得出來」的能力，但您可以真的講話，而不是只能交換呼號與報告。',
  js8_what_list: `
    <ul>
      <li><strong>能自由打字</strong> — 想寫多長就多長。程式會自動把訊息拆成多個 frame 連續發射，所以<strong>長訊息要等比較久</strong>：一則 Normal 模式的訊息每 15 秒才送出一段。</li>
      <li><strong>對話是非同步的</strong> — 不像語音那樣即時。送出後要等對方在下一個時隙收到、再打字回覆，一來一往以分鐘計。</li>
      <li><strong>可以留言與查詢</strong> — 支援 heartbeat（定期廣播「我在」）、指定指令（問對方 SNR、網格、資訊）與儲轉留言（留話給現在不在的人）。</li>
      <li><strong>與 FT8 不互通</strong> — 雖然底層訊號結構相同，但這是兩套獨立的模式，要在 JS8 的頻率上用 JS8 才能對得上。</li>
    </ul>`,

  js8_quick_title: '快速上手：發出第一則 JS8 訊息',
  js8_quick_text:  'JS8 沒有 FT8 那種自動跑完的通聯流程——它就是聊天，什麼時候說什麼都由您決定。',
  js8_quick_steps: `
    <ol>
      <li>先確認設置裡填好了<strong>我的呼號</strong>，並把電台調到該波段的 JS8 慣用頻率（例如 20m 是 14.078 MHz）。</li>
      <li>從主選單或浮動視窗開啟 <strong>JS8</strong> 分頁。</li>
      <li>速度選 <strong>NORMAL 15s</strong>——這是最多人用的，先從它開始。</li>
      <li>確認<strong>接收/解碼</strong>是開著的，先看幾分鐘有沒有別人的訊息進來，確認頻率沒選錯。</li>
      <li>在下方輸入框打字，按<strong>送出</strong>。訊息會排在下一個時隙開始發射；發射中還可以再打下一則，它會排隊等前一則送完。</li>
      <li>對方的回覆會以聊天泡泡出現。長按泡泡可以複製或刪除。</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>步驟</th><th>送出的內容</th><th>說明</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>呼叫 CQ。按 CQ 鍵會自動帶入您的呼號與網格</td></tr>
      <tr><td>2</td><td>（對方）<code>BV6LC: BX1AA SNR -07</code></td><td>對方回應，並附上他收到您的訊號強度</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>自由文字。從這裡開始就是一般聊天了</td></tr>
      <tr><td>4</td><td>（對方）<code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>對方回覆</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>結束</td></tr>
    </table>`,
  js8_quick_note: '常用的訊息不必每次重打——<strong>常用訊息</strong>按鈕裡有現成的回覆（回 SNR、回 INFO、回 STATUS）。另外，訊息內容一律轉成大寫的有限字元集；要送中文或其他非 ASCII 內容，請看下面的 <strong>Unicode 文字（UTX）</strong>。',

  js8_speed_title: '速度模式',
  js8_speed_text:  'JS8 提供五種速度／子模式，在靈敏度與傳輸量之間權衡。所有人必須用<strong>同一種速度</strong>才收得到彼此：',
  js8_speed_table: `
    <table>
      <tr><th>模式</th><th>時隙長度</th><th>特性</th></tr>
      <tr><td>NORMAL</td><td>15 秒</td><td>靈敏度最佳，傳輸量標準。<strong>最通用，預設用這個</strong></td></tr>
      <tr><td>FAST</td><td>10 秒</td><td>傳輸量較高，靈敏度略降</td></tr>
      <tr><td>TURBO</td><td>6 秒</td><td>傳輸量最高，靈敏度較低——適合訊號強勁的近距離通聯</td></tr>
      <tr><td>SLOW</td><td>30 秒</td><td>靈敏度最高，傳輸量最低——適合微弱訊號的遠距 DX</td></tr>
      <tr><td>FT8TW</td><td>4 秒</td><td><strong>FT8TW 專屬的加速模式，與原版 JS8Call 不互通。</strong>只有同樣使用 FT8TW 並選了這個模式的人收得到，適合自己人之間的短距離測試</td></tr>
    </table>`,

  js8_msg_title: '訊息類型',
  js8_msg_text:  '除了單純的 CQ／回應交換，JS8 還支援多種訊息格式：',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat（HB）</strong> — 週期性廣播自己的存在與訊號報告，讓其他電台無需建立通聯即可聽到您。</li>
      <li><strong>指定指令（Directed commands）</strong> — 查詢其他電台的 SNR、網格、資訊字串或「聽到清單」（例如 <code>呼號 SNR?</code>、<code>呼號 GRID?</code>、<code>呼號 HEARING?</code>）。</li>
      <li><strong>自由文字</strong> — 完整長度的對話訊息，程式會自動拆分成所需的多個發射 frame。</li>
      <li><strong>儲轉指令（MSG / MSG TO:）</strong> — 帶校驗碼的緩衝指令，用於轉發訊息給目前不在監聽的電台。</li>
    </ul>`,

  js8_bubble_title: '聊天泡泡的長按選單',
  js8_bubble_text:  '長按聊天畫面中的任何一顆泡泡，會跳出一份選單：',
  js8_bubble_list: `
    <ul>
      <li><strong>複製訊息內容</strong> — 只複製訊息本文。</li>
      <li><strong>複製完整內容</strong> — 連同上方的資訊列（時間、TX 或對方呼號、訊號報告、頻率）一起複製，與畫面上看到的完全一致。</li>
      <li><strong>刪除訊息</strong> — 把該則訊息從聊天記錄中移除。這個動作<strong>無法復原</strong>，因此會先跳出確認。</li>
    </ul>
    <p>正在接收中、還沒收完的泡泡只提供複製，不能刪除——它還沒進入正式紀錄。另外，因為長按被用來叫出這份選單，訊息文字不再能夠用拖曳的方式選取部分內容，需要文字時請用上面兩個複製項目。</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  '可設定 heartbeat 廣播間隔（10、15 或 30 分鐘），即使沒有進行中的通聯，也能讓其他電台知道您正在監聽。',

  js8_autoreply_title: '自動回覆',
  js8_autoreply_text:  '自動回覆可自動應答指向您呼號的查詢指令（SNR?/GRID?/INFO?/HEARING?/AGN?），也可選擇自動回應 CQ；兩者為各自獨立的開關，預設皆為關閉。同一來源呼號有冷卻時間限制，避免過於頻繁回應。',

  js8_unicode_title: 'Unicode 文字（UTX）',
  js8_unicode_text:  '標準 JS8 自由文字僅限大寫 ASCII 子集。FT8TW 新增一個可選、且公開文件化的擴充格式「UTX」，讓自由文字能夠承載完整 Unicode 內容——中文、日文、韓文、西里爾文、阿拉伯文等，同時與未修改的原版 JS8Call 軟體保持完全相容。UTX 純粹是一種公開、可逆的文字編碼格式（性質類似 UTF-8），絕非用來隱匿內容的密碼，完整的位元層級規格已隨專案原始碼公開，任何人皆可查閱或重新實作。',

  js8_safety_title: '發射安全',
  js8_safety_text:  '與 FT8/FT4 相同，獨立的監管機制會在 App 被關閉、被系統於背景中結束，或發生當機時，自動停止任何 JS8 發射（包含 heartbeat 與自動回覆），避免電台在無人看管下持續發射。',
},

'zh-CN': {
  js8_title: 'JS8 聊天模式',
  js8_intro: 'JS8 是构建在 FT8 信号结构上的键盘对键盘聊天模式，除了标准 QSO 之外，还能进行自由对话、存储转发消息及类似网络指令的操作。打开 JS8 分页即可进入聊天界面。',

  js8_speed_title: '速度模式',
  js8_speed_text:  'JS8 提供五种速度／子模式，在灵敏度与传输量之间权衡。所有人必须用<strong>同一种速度</strong>才收得到彼此：',
  js8_speed_table: `
    <table>
      <tr><th>模式</th><th>时隙长度</th><th>特性</th></tr>
      <tr><td>NORMAL</td><td>15 秒</td><td>灵敏度最佳，传输量标准。<strong>最通用，默认用这个</strong></td></tr>
      <tr><td>FAST</td><td>10 秒</td><td>传输量较高，灵敏度略降</td></tr>
      <tr><td>TURBO</td><td>6 秒</td><td>传输量最高，灵敏度较低——适合信号强劲的近距离通联</td></tr>
      <tr><td>SLOW</td><td>30 秒</td><td>灵敏度最高，传输量最低——适合微弱信号的远距 DX</td></tr>
      <tr><td>FT8TW</td><td>4 秒</td><td><strong>FT8TW 专属的加速模式，与原版 JS8Call 不互通。</strong>只有同样使用 FT8TW 并选了这个模式的人收得到，适合自己人之间的短距离测试</td></tr>
    </table>`,

  js8_msg_title: '消息类型',
  js8_msg_text:  '除了单纯的 CQ／回应交换，JS8 还支持多种消息格式：',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat（HB）</strong> — 周期性广播自己的存在与信号报告，让其他电台无需建立通联即可听到您。</li>
      <li><strong>定向指令（Directed commands）</strong> — 查询其他电台的 SNR、网格、信息字符串或「听到列表」（例如 <code>呼号 SNR?</code>、<code>呼号 GRID?</code>、<code>呼号 HEARING?</code>）。</li>
      <li><strong>自由文本</strong> — 完整长度的对话消息，程序会自动拆分成所需的多个发射 frame。</li>
      <li><strong>存储转发指令（MSG / MSG TO:）</strong> — 带校验码的缓冲指令，用于转发消息给当前不在监听的电台。</li>
    </ul>`,

  js8_what_title: '什么是 JS8',
  js8_what_text:  'JS8 由 KN4CRD 提出，把 <a href="operating.html">FT8</a> 的信号结构借过来，换掉上面那层固定格式的消息，改成<strong>可以自由打字的键盘对键盘模式</strong>。也就是说：它保留了 FT8「弱到听不见也解得出来」的能力，但您可以真的讲话，而不是只能交换呼号与报告。',
  js8_what_list: `
    <ul>
      <li><strong>能自由打字</strong> — 想写多长就多长。程序会自动把消息拆成多个 frame 连续发射，所以<strong>长消息要等比较久</strong>：一条 Normal 模式的消息每 15 秒才送出一段。</li>
      <li><strong>对话是异步的</strong> — 不像语音那样实时。送出后要等对方在下一个时隙收到、再打字回复，一来一往以分钟计。</li>
      <li><strong>可以留言与查询</strong> — 支持 heartbeat（定期广播「我在」）、指定指令（问对方 SNR、网格、信息）与存转留言（留话给现在不在的人）。</li>
      <li><strong>与 FT8 不互通</strong> — 虽然底层信号结构相同，但这是两套独立的模式，要在 JS8 的频率上用 JS8 才能对得上。</li>
    </ul>`,

  js8_quick_title: '快速上手：发出第一条 JS8 消息',
  js8_quick_text:  'JS8 没有 FT8 那种自动跑完的通联流程——它就是聊天，什么时候说什么都由您决定。',
  js8_quick_steps: `
    <ol>
      <li>先确认设置里填好了<strong>我的呼号</strong>，并把电台调到该波段的 JS8 惯用频率（例如 20m 是 14.078 MHz）。</li>
      <li>从主菜单或悬浮窗口打开 <strong>JS8</strong> 分页。</li>
      <li>速度选 <strong>NORMAL 15s</strong>——这是最多人用的，先从它开始。</li>
      <li>确认<strong>接收解码</strong>是开着的，先看几分钟有没有别人的消息进来，确认频率没选错。</li>
      <li>在下方输入框打字，按<strong>发送</strong>。消息会排在下一个时隙开始发射；发射中还可以再打下一条，它会排队等前一条送完。</li>
      <li>对方的回复会以聊天气泡出现。长按气泡可以复制或删除。</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>步骤</th><th>送出的内容</th><th>说明</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>呼叫 CQ。按 CQ 键会自动带入您的呼号与网格</td></tr>
      <tr><td>2</td><td>（对方）<code>BV6LC: BX1AA SNR -07</code></td><td>对方回应，并附上他收到您的信号强度</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>自由文本。从这里开始就是一般聊天了</td></tr>
      <tr><td>4</td><td>（对方）<code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>对方回复</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>结束</td></tr>
    </table>`,
  js8_quick_note: '常用的消息不必每次重打——<strong>常用消息</strong>按钮里有现成的回复（回 SNR、回 INFO、回 STATUS）。另外，消息内容一律转成大写的有限字符集；要送中文或其他非 ASCII 内容，请看下面的 <strong>Unicode 文本（UTX）</strong>。',

  js8_bubble_title: '聊天气泡的长按菜单',
  js8_bubble_text:  '长按聊天界面中的任何一个气泡，会弹出一份菜单：',
  js8_bubble_list: `
    <ul>
      <li><strong>复制消息内容</strong> — 只复制消息正文。</li>
      <li><strong>复制完整内容</strong> — 连同上方的信息行（时间、TX 或对方呼号、信号报告、频率）一起复制，与画面上看到的完全一致。</li>
      <li><strong>删除消息</strong> — 把该条消息从聊天记录中移除。这个动作<strong>无法撤销</strong>，因此会先弹出确认。</li>
    </ul>
    <p>正在接收中、还没收完的气泡只提供复制，不能删除——它还没进入正式记录。另外，因为长按被用来叫出这份菜单，消息文本不再能够用拖拽的方式选取部分内容，需要文本时请用上面两个复制项目。</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  '可设置 heartbeat 广播间隔（10、15 或 30 分钟），即使没有进行中的通联，也能让其他电台知道您正在监听。',

  js8_autoreply_title: '自动回复',
  js8_autoreply_text:  '自动回复可自动应答指向您呼号的查询指令（SNR?/GRID?/INFO?/HEARING?/AGN?），也可选择自动回应 CQ；两者为各自独立的开关，默认均为关闭。同一来源呼号有冷却时间限制，避免过于频繁回应。',

  js8_unicode_title: 'Unicode 文本（UTX）',
  js8_unicode_text:  '标准 JS8 自由文本仅限大写 ASCII 子集。FT8TW 新增一个可选、且公开文档化的扩展格式「UTX」，让自由文本能够承载完整 Unicode 内容——中文、日文、韩文、西里尔文、阿拉伯文等，同时与未修改的原版 JS8Call 软件保持完全兼容。UTX 纯粹是一种公开、可逆的文本编码格式（性质类似 UTF-8），绝非用来隐匿内容的密码，完整的位级规格已随项目源码公开，任何人均可查阅或重新实现。',

  js8_safety_title: '发射安全',
  js8_safety_text:  '与 FT8/FT4 相同，独立的监管机制会在 App 被关闭、被系统于后台结束，或发生崩溃时，自动停止任何 JS8 发射（包含 heartbeat 与自动回复），避免电台在无人看管下持续发射。',
},

'ja': {
  js8_title: 'JS8 チャットモード',
  js8_intro: 'JS8 は FT8 の信号構造の上に作られたキーボード交信モードで、定型的な交信に加えて自由な会話、蓄積転送メッセージ、ネットワーク的なコマンドが使えます。JS8 タブを開くとチャット画面になります。',

  js8_speed_title: 'スピードモード',
  js8_speed_text:  'JS8 には 5 つの速度（サブモード）があり、感度とスループットのどちらを取るかで選びます。互いに受信するには<strong>全員が同じ速度</strong>である必要があります。',
  js8_speed_table: `
    <table>
      <tr><th>モード</th><th>スロット長</th><th>特性</th></tr>
      <tr><td>NORMAL</td><td>15 秒</td><td>感度が最良で、スループットは標準。<strong>もっとも一般的で、まずはこれ</strong></td></tr>
      <tr><td>FAST</td><td>10 秒</td><td>スループットは高め、感度はやや低下</td></tr>
      <tr><td>TURBO</td><td>6 秒</td><td>スループット最大、感度は低め。信号の強い近距離向け</td></tr>
      <tr><td>SLOW</td><td>30 秒</td><td>感度最高、スループット最小。信号の弱い遠距離 DX 向け</td></tr>
      <tr><td>FT8TW</td><td>4 秒</td><td><strong>FT8TW 専用の高速モードで、本家 JS8Call とは互換性がありません。</strong>同じく FT8TW でこのモードを選んだ相手にしか届かないため、身内どうしの近距離テスト向けです</td></tr>
    </table>`,

  js8_msg_title: 'メッセージの種類',
  js8_msg_text:  'JS8 は単純な CQ と応答のやり取り以外にも、いくつかの電文形式に対応しています:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat（HB）</strong> — 自局の存在と信号レポートを定期的に知らせる電文。交信していなくても他局に受信してもらえます。</li>
      <li><strong>指定コマンド</strong> — 相手局の SNR、グリッド、INFO 文字列、受信中の局一覧などを問い合わせます（例: <code>コールサイン SNR?</code>、<code>コールサイン GRID?</code>、<code>コールサイン HEARING?</code>）。</li>
      <li><strong>フリーテキスト</strong> — 長さの制限がない会話電文。必要な数の送信フレームへ自動的に分割されます。</li>
      <li><strong>蓄積転送（MSG / MSG TO:）</strong> — チェックサム付きのバッファされたコマンドで、今は受信していない局へメッセージを中継します。</li>
    </ul>`,

  js8_what_title: 'JS8 とは',
  js8_what_text:  'JS8 は KN4CRD が考案したもので、<a href="operating.html">FT8</a> の信号構造をそのまま借り、その上に載っていた固定形式の電文を<strong>自由に打てるキーボード同士のやり取り</strong>に置き換えたものです。つまり、耳では聞こえないほど弱い信号でも復号できるという FT8 の性質はそのままに、コールサインとレポートの交換だけでなく、実際に文章でやり取りできます。',
  js8_what_list: `
    <ul>
      <li><strong>自由に打てる</strong> — 長さの制限は実質ありません。アプリがメッセージを複数のフレームに分割して続けて送信するため、<strong>長い文章は時間がかかります</strong>。Normal モードでは 15 秒に 1 フレームずつです。</li>
      <li><strong>会話はリアルタイムではありません</strong> — 音声とは違い、送信後に相手が次のスロットで受信し、それから返信を打つので、往復には数分かかります。</li>
      <li><strong>伝言や問い合わせもできます</strong> — heartbeat（自分がいることを定期的に知らせる）、指定コマンド（相手の SNR・グリッド・情報を尋ねる）、その場にいない相手への蓄積転送メッセージに対応しています。</li>
      <li><strong>FT8 とは通信できません</strong> — 下層の信号構造は共通ですが別々のモードです。JS8 の周波数で JS8 を使って初めて相手と合います。</li>
    </ul>`,

  js8_quick_title: 'クイックスタート：最初の JS8 メッセージを送る',
  js8_quick_text:  'JS8 には FT8 のような自動で進む交信手順はありません。あくまで会話であり、いつ何を言うかはご自身で決めます。',
  js8_quick_steps: `
    <ol>
      <li>設定で<strong>自局コール</strong>が入力されていることを確認し、無線機をそのバンドの JS8 常用周波数（20 m なら 14.078 MHz）に合わせます。</li>
      <li>メインメニューまたはフローティングウィンドウから <strong>JS8</strong> タブを開きます。</li>
      <li>速度は <strong>NORMAL 15s</strong> を選びます。もっとも使われている設定なので、まずはここから。</li>
      <li><strong>受信デコード</strong>がオンになっていることを確認し、数分ほど様子を見ます。他局の通信が見えれば周波数は合っています。</li>
      <li>下の入力欄に文章を打ち、<strong>送信</strong>を押します。メッセージは次のスロットに予約されます。送信中に次の文章を打っておくこともでき、その場合は順番を待ちます。</li>
      <li>返信はチャットの吹き出しとして表示されます。吹き出しを長押しするとコピーや削除ができます。</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>手順</th><th>送る内容</th><th>説明</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>CQ を出します。CQ ボタンを押すとコールサインとグリッドが自動的に入ります</td></tr>
      <tr><td>2</td><td>（相手）<code>BV6LC: BX1AA SNR -07</code></td><td>相手が応答し、こちらの信号強度も併せて知らせてきます</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>フリーテキスト。ここから先は普通の会話です</td></tr>
      <tr><td>4</td><td>（相手）<code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>相手からの返信</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>締めくくり</td></tr>
    </table>`,
  js8_quick_note: 'よく使う返事は毎回打ち直す必要はありません。<strong>クイックメッセージ</strong>ボタンに定型の返信（SNR・INFO・STATUS を返す）が用意されています。なお、電文は大文字の限られた文字集合に丸められます。日本語などの非 ASCII を送りたい場合は、下の <strong>Unicode テキスト（UTX）</strong>をご覧ください。',

  js8_bubble_title: 'チャット吹き出しの長押しメニュー',
  js8_bubble_text:  'チャット画面の吹き出しを長押しすると、メニューが開きます。',
  js8_bubble_list: `
    <ul>
      <li><strong>本文をコピー</strong> — 電文の本文だけをコピーします。</li>
      <li><strong>詳細付きでコピー</strong> — 上部の情報行（時刻、TX または相手のコールサイン、信号レポート、周波数）も含めて、画面表示とまったく同じ形でコピーします。</li>
      <li><strong>メッセージを削除</strong> — そのメッセージをチャット履歴から削除します。この操作は<strong>取り消せない</strong>ため、先に確認が表示されます。</li>
    </ul>
    <p>まだ受信中の吹き出しはコピーのみで、削除はできません。正式な記録に入っていないためです。また、長押しがこのメニューに割り当てられたため、電文の一部をドラッグして選択することはできなくなりました。文字が必要なときは上の 2 つのコピー項目をお使いください。</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Heartbeat の送信間隔（10、15、30 分）を設定しておくと、交信していないときでもワッチ中であることを他局に知らせられます。',

  js8_autoreply_title: '自動応答',
  js8_autoreply_text:  '自動応答は、自局宛ての問い合わせコマンド（SNR?/GRID?/INFO?/HEARING?/AGN?）に自動で返信します。CQ への自動応答も選べます。どちらも独立したスイッチで、既定はどちらもオフです。同じ相手へ返信しすぎないよう、送信元ごとのクールダウンがあります。',

  js8_unicode_title: 'Unicode テキスト（UTX）',
  js8_unicode_text:  '標準の JS8 のフリーテキストは大文字 ASCII の一部に限られます。FT8TW は任意で使える公開仕様の拡張「UTX」を追加し、フリーテキストで Unicode の内容（中国語、日本語、韓国語、キリル文字、アラビア文字など）をそのまま送れるようにしました。改造していない JS8Call とも完全に互換です。UTX はあくまで公開された可逆の文字符号化方式（UTF-8 に近い性質）であり、内容を隠すための暗号ではありません。ビット単位の完全な仕様はプロジェクトのソースとともに公開されており、誰でも検証・再実装できます。',

  js8_safety_title: '送信時の安全',
  js8_safety_text:  'FT8/FT4 と同様に、アプリを閉じたとき、バックグラウンドでシステムに終了させられたとき、異常終了したときには、独立したウォッチドッグが JS8 の送信（Heartbeat や自動応答を含む）をすべて自動的に停止し、無人のまま送信し続けることを防ぎます。',
},

'ru': {
  js8_title: 'Режим чата JS8',
  js8_intro: 'JS8 — режим клавиатурного общения, построенный на структуре сигнала FT8. Помимо формализованных QSO он позволяет вести свободный разговор, передавать сообщения с промежуточным хранением и использовать команды сетевого типа. Экран чата открывается на вкладке JS8.',

  js8_speed_title: 'Скоростные режимы',
  js8_speed_text:  'В JS8 пять субрежимов скорости, каждый из которых меняет чувствительность на пропускную способность. Чтобы слышать друг друга, все должны быть на <strong>одной скорости</strong>:',
  js8_speed_table: `
    <table>
      <tr><th>Режим</th><th>Интервал</th><th>Особенности</th></tr>
      <tr><td>NORMAL</td><td>15 с</td><td>Лучшая чувствительность, обычная пропускная способность. <strong>Основной выбор — начните с него</strong></td></tr>
      <tr><td>FAST</td><td>10 с</td><td>Выше пропускная способность, чувствительность немного ниже</td></tr>
      <tr><td>TURBO</td><td>6 с</td><td>Наибольшая пропускная способность, пониженная чувствительность — для сильных сигналов вблизи</td></tr>
      <tr><td>SLOW</td><td>30 с</td><td>Наибольшая чувствительность, наименьшая пропускная способность — для слабого DX</td></tr>
      <tr><td>FT8TW</td><td>4 с</td><td><strong>Режим, существующий только в FT8TW и несовместимый со стандартным JS8Call.</strong> Вас услышит лишь тот, кто тоже работает в FT8TW с этой настройкой, — удобно для проверок между своими станциями на небольшом расстоянии</td></tr>
    </table>`,

  js8_msg_title: 'Типы сообщений',
  js8_msg_text:  'Кроме простого обмена CQ и ответом, JS8 поддерживает несколько форматов сообщений:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat (HB)</strong> — периодическое объявление о своём присутствии с рапортом, чтобы другие станции слышали вас и без активного QSO.</li>
      <li><strong>Адресные команды</strong> — запрос у другой станции её SNR, локатора, строки INFO или списка принимаемых станций (например, <code>ПОЗЫВНОЙ SNR?</code>, <code>ПОЗЫВНОЙ GRID?</code>, <code>ПОЗЫВНОЙ HEARING?</code>).</li>
      <li><strong>Свободный текст</strong> — разговорные сообщения полной длины, автоматически разбиваемые на нужное число передаваемых кадров.</li>
      <li><strong>Хранение и пересылка (MSG / MSG TO:)</strong> — буферизованные команды с контрольной суммой для передачи сообщения станции, которая сейчас не слушает.</li>
    </ul>`,

  js8_what_title: 'Что такое JS8',
  js8_what_text:  'JS8, предложенный KN4CRD, заимствует структуру сигнала <a href="operating.html">FT8</a> и заменяет жёсткий формат сообщений над ней <strong>свободным набором текста с клавиатуры на клавиатуру</strong>. Иначе говоря, он сохраняет способность FT8 декодироваться там, где сигнал слишком слаб, чтобы его услышать, но позволяет действительно разговаривать, а не только обмениваться позывными и рапортами.',
  js8_what_list: `
    <ul>
      <li><strong>Можно писать свободно</strong> — любой длины. Приложение само разбивает сообщение на кадры и передаёт их подряд, поэтому <strong>длинные сообщения идут долго</strong>: в режиме Normal один кадр уходит каждые 15 секунд.</li>
      <li><strong>Разговор не в реальном времени</strong> — в отличие от голоса. После отправки корреспондент должен принять текст в следующем интервале и лишь затем набрать ответ; обмен измеряется минутами.</li>
      <li><strong>Сообщения и запросы</strong> — поддерживаются heartbeat (периодическое объявление о своём присутствии), адресованные команды (запрос SNR, локатора или сведений у другой станции) и сообщения с хранением для тех, кто сейчас не слушает.</li>
      <li><strong>С FT8 не совместим</strong> — структура сигнала общая, но это две разные моды; чтобы кого-то встретить, нужен JS8 на частоте JS8.</li>
    </ul>`,

  js8_quick_title: 'Быстрый старт: первое сообщение JS8',
  js8_quick_text:  'В JS8 нет автоматической последовательности связи, как в FT8: это разговор, и что и когда сказать — решаете вы.',
  js8_quick_steps: `
    <ol>
      <li>Убедитесь, что <strong>позывной</strong> задан, и поставьте трансивер на обычную частоту JS8 для этого диапазона (например, 14,078 МГц на 20 м).</li>
      <li>Откройте вкладку <strong>JS8</strong> из главного меню или плавающего окна.</li>
      <li>Скорость выберите <strong>NORMAL 15s</strong> — её используют чаще всего, начните с неё.</li>
      <li>Проверьте, что <strong>приём/декодирование</strong> включены, и понаблюдайте несколько минут: чужой трафик подтвердит, что частота выбрана верно.</li>
      <li>Наберите текст в поле внизу и нажмите <strong>Отправить</strong>. Сообщение встанет в очередь на ближайший интервал; можно набирать следующее, пока идёт первое, — оно дождётся своей очереди.</li>
      <li>Ответы появляются в виде облачков чата. Долгое нажатие на облачко позволяет скопировать или удалить его.</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>Шаг</th><th>Передаётся</th><th>Примечание</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>Вызов CQ. Кнопка CQ сама подставляет ваш позывной и локатор</td></tr>
      <tr><td>2</td><td>(он) <code>BV6LC: BX1AA SNR -07</code></td><td>Отвечает и сообщает, с какой силой вас слышит</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>Произвольный текст — дальше идёт обычный разговор</td></tr>
      <tr><td>4</td><td>(он) <code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>Его ответ</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>Завершение</td></tr>
    </table>`,
  js8_quick_note: 'Часто используемые ответы не нужно набирать заново — в кнопке <strong>Быстрые сообщения</strong> есть готовые (ответить SNR, ответить INFO, ответить STATUS). Учтите также, что текст приводится к ограниченному набору заглавных символов; чтобы отправить кириллицу или любой другой не-ASCII текст, см. раздел <strong>Текст Unicode (UTX)</strong> ниже.',

  js8_bubble_title: 'Меню по долгому нажатию на облачко чата',
  js8_bubble_text:  'Долгое нажатие на любое облачко в чате открывает меню:',
  js8_bubble_list: `
    <ul>
      <li><strong>Копировать текст</strong> — копирует только текст сообщения.</li>
      <li><strong>Копировать с деталями</strong> — копирует и строку сведений (время, TX или позывной корреспондента, рапорт, частота) ровно в том виде, в каком она показана на экране.</li>
      <li><strong>Удалить сообщение</strong> — убирает сообщение из истории чата. Это действие <strong>нельзя отменить</strong>, поэтому сначала запрашивается подтверждение.</li>
    </ul>
    <p>Облачко, которое ещё принимается, можно только копировать: оно пока не входит в постоянную запись. Обратите внимание и на то, что долгое нажатие теперь открывает это меню, поэтому выделить часть текста перетаскиванием больше нельзя — пользуйтесь двумя пунктами копирования.</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Включите объявления heartbeat с выбранным интервалом (10, 15 или 30 минут), чтобы другие станции знали, что вы на приёме, даже без активного QSO.',

  js8_autoreply_title: 'Автоответ',
  js8_autoreply_text:  'Автоответ может сам отвечать на адресованные вам запросы (SNR?/GRID?/INFO?/HEARING?/AGN?), а при желании и на вызовы CQ; это два независимых переключателя, оба по умолчанию выключены. Пауза для каждого корреспондента не даёт отвечать одной и той же станции слишком часто.',

  js8_unicode_title: 'Текст Unicode (UTX)',
  js8_unicode_text:  'Обычный свободный текст JS8 ограничен подмножеством прописных символов ASCII. FT8TW добавляет необязательное расширение UTX с открытой документацией, позволяющее передавать в свободном тексте полноценный Unicode — китайский, японский, корейский, кириллицу, арабский и другие — сохраняя полную совместимость с обычным JS8Call. UTX — это именно открытый обратимый формат кодирования текста (по духу близкий к UTF-8), а не шифр для сокрытия содержимого; полная побитовая спецификация опубликована вместе с исходным кодом проекта, и любой может её изучить или реализовать заново.',

  js8_safety_title: 'Безопасность передачи',
  js8_safety_text:  'Как и в FT8/FT4, независимый сторожевой механизм автоматически прекращает любую передачу JS8 (включая heartbeat и автоответ), если приложение закрыто, выгружено системой из фона или аварийно завершилось, — трансивер не останется в передаче без присмотра.',
},

'pl': {
  js8_title: 'Tryb czatu JS8',
  js8_intro: 'JS8 to tryb rozmowy z klawiatury zbudowany na strukturze sygnału FT8. Poza sformalizowanymi łącznościami pozwala na swobodną rozmowę, przesyłanie wiadomości z zapisem pośrednim oraz komendy w stylu sieciowym. Ekran czatu otwiera zakładka JS8.',

  js8_speed_title: 'Tryby prędkości',
  js8_speed_text:  'JS8 oferuje pięć trybów prędkości, w których czułość wymienia się na przepustowość. Aby się wzajemnie słyszeć, wszyscy muszą używać <strong>tej samej prędkości</strong>:',
  js8_speed_table: `
    <table>
      <tr><th>Tryb</th><th>Okno</th><th>Cechy</th></tr>
      <tr><td>NORMAL</td><td>15 s</td><td>Najlepsza czułość, standardowa przepustowość. <strong>Wybór podstawowy — zacznij od niego</strong></td></tr>
      <tr><td>FAST</td><td>10 s</td><td>Wyższa przepustowość, nieco mniejsza czułość</td></tr>
      <tr><td>TURBO</td><td>6 s</td><td>Największa przepustowość, obniżona czułość — do mocnych sygnałów lokalnych</td></tr>
      <tr><td>SLOW</td><td>30 s</td><td>Największa czułość, najmniejsza przepustowość — do słabego DX</td></tr>
      <tr><td>FT8TW</td><td>4 s</td><td><strong>Tryb dostępny wyłącznie w FT8TW, niezgodny ze standardowym JS8Call.</strong> Usłyszy cię tylko ktoś, kto również pracuje w FT8TW z tym ustawieniem — przydatne do testów między własnymi stacjami na krótkim dystansie</td></tr>
    </table>`,

  js8_msg_title: 'Rodzaje wiadomości',
  js8_msg_text:  'Poza prostą wymianą CQ i odpowiedzi JS8 obsługuje kilka formatów wiadomości:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat (HB)</strong> — okresowe ogłoszenie swojej obecności wraz z raportem, dzięki czemu inne stacje słyszą cię bez aktywnej łączności.</li>
      <li><strong>Komendy kierowane</strong> — zapytanie innej stacji o jej SNR, lokator, tekst INFO lub listę odbieranych stacji (np. <code>ZNAK SNR?</code>, <code>ZNAK GRID?</code>, <code>ZNAK HEARING?</code>).</li>
      <li><strong>Dowolny tekst</strong> — wiadomości konwersacyjne pełnej długości, automatycznie dzielone na potrzebną liczbę ramek nadawczych.</li>
      <li><strong>Zapis i przekazanie (MSG / MSG TO:)</strong> — buforowane komendy z sumą kontrolną, służące do przekazania wiadomości stacji, która akurat nie nasłuchuje.</li>
    </ul>`,

  js8_what_title: 'Czym jest JS8',
  js8_what_text:  'JS8, opracowany przez KN4CRD, zapożycza strukturę sygnału <a href="operating.html">FT8</a> i zastępuje sztywną warstwę wiadomości <strong>swobodnie wpisywanym tekstem, z klawiatury na klawiaturę</strong>. Innymi słowy: zachowuje zdolność FT8 do dekodowania sygnałów zbyt słabych, by je usłyszeć, ale pozwala naprawdę rozmawiać, a nie tylko wymieniać znaki i raporty.',
  js8_what_list: `
    <ul>
      <li><strong>Można pisać swobodnie</strong> — dowolnie długo. Aplikacja sama dzieli wiadomość na ramki nadawane jedna po drugiej, więc <strong>długie wiadomości trwają</strong>: w trybie Normal jedna ramka wychodzi co 15 sekund.</li>
      <li><strong>Rozmowa nie jest na żywo</strong> — inaczej niż głosem. Po wysłaniu korespondent musi odebrać tekst w kolejnym oknie i dopiero potem odpisać; wymiana liczy się w minutach.</li>
      <li><strong>Wiadomości i zapytania</strong> — obsługiwane są heartbeat (okresowe ogłaszanie swojej obecności), polecenia kierowane (pytanie innej stacji o SNR, lokator czy informacje) oraz wiadomości przechowywane dla stacji, które akurat nie słuchają.</li>
      <li><strong>Nie łączy się z FT8</strong> — struktura sygnału jest wspólna, ale to dwie osobne emisje; aby kogoś spotkać, trzeba użyć JS8 na częstotliwości JS8.</li>
    </ul>`,

  js8_quick_title: 'Szybki start: pierwsza wiadomość JS8',
  js8_quick_text:  'JS8 nie ma automatycznej sekwencji łączności jak FT8 — to rozmowa, a co i kiedy powiesz, zależy od ciebie.',
  js8_quick_steps: `
    <ol>
      <li>Sprawdź, że <strong>twój znak</strong> jest ustawiony, i ustaw radio na typową częstotliwość JS8 danego pasma (np. 14,078 MHz na 20 m).</li>
      <li>Otwórz zakładkę <strong>JS8</strong> z menu głównego lub pływającego okna.</li>
      <li>Ustaw prędkość na <strong>NORMAL 15s</strong> — z niej korzysta najwięcej osób, więc zacznij od niej.</li>
      <li>Upewnij się, że <strong>odbiór/dekodowanie</strong> są włączone, i poobserwuj kilka minut; ruch innych stacji potwierdzi, że częstotliwość jest właściwa.</li>
      <li>Wpisz tekst w polu na dole i naciśnij <strong>Wyślij</strong>. Wiadomość trafi do kolejki na najbliższe okno; kolejną można pisać w trakcie nadawania pierwszej — poczeka na swoją kolej.</li>
      <li>Odpowiedzi pojawiają się jako dymki czatu. Długie naciśnięcie dymka pozwala go skopiować lub usunąć.</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>Krok</th><th>Treść</th><th>Uwagi</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>Wywołanie CQ. Przycisk CQ sam wstawia twój znak i lokator</td></tr>
      <tr><td>2</td><td>(on) <code>BV6LC: BX1AA SNR -07</code></td><td>Odpowiada, podając siłę, z jaką cię słyszy</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>Tekst dowolny — od tej chwili to zwykła rozmowa</td></tr>
      <tr><td>4</td><td>(on) <code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>Jego odpowiedź</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>Zakończenie</td></tr>
    </table>`,
  js8_quick_note: 'Często używanych odpowiedzi nie trzeba wpisywać od nowa — przycisk <strong>Szybkie wiadomości</strong> zawiera gotowe (odpowiedz SNR, odpowiedz INFO, odpowiedz STATUS). Pamiętaj też, że tekst jest sprowadzany do ograniczonego zestawu wielkich liter; aby wysłać polskie znaki lub inną treść spoza ASCII, zobacz <strong>Tekst Unicode (UTX)</strong> poniżej.',

  js8_bubble_title: 'Menu długiego naciśnięcia na dymkach czatu',
  js8_bubble_text:  'Długie naciśnięcie dowolnego dymka w widoku czatu otwiera menu:',
  js8_bubble_list: `
    <ul>
      <li><strong>Kopiuj tekst</strong> — kopiuje samą treść wiadomości.</li>
      <li><strong>Kopiuj ze szczegółami</strong> — kopiuje także wiersz informacyjny (czas, TX lub znak korespondenta, raport, częstotliwość), dokładnie tak, jak widać na ekranie.</li>
      <li><strong>Usuń wiadomość</strong> — usuwa wiadomość z historii czatu. Tej operacji <strong>nie można cofnąć</strong>, dlatego najpierw pojawia się potwierdzenie.</li>
    </ul>
    <p>Dymek, który jest jeszcze odbierany, można tylko kopiować — nie trafił jeszcze do trwałego zapisu. Zwróć też uwagę, że skoro długie naciśnięcie otwiera teraz to menu, nie da się już zaznaczyć fragmentu tekstu przeciągnięciem; skorzystaj z dwóch pozycji kopiowania.</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Włącz ogłoszenia heartbeat z wybranym odstępem (10, 15 lub 30 minut), aby inne stacje wiedziały, że nasłuchujesz, nawet bez trwającej łączności.',

  js8_autoreply_title: 'Automatyczna odpowiedź',
  js8_autoreply_text:  'Automatyczna odpowiedź potrafi sama odpowiadać na kierowane do twojego znaku zapytania (SNR?/GRID?/INFO?/HEARING?/AGN?), a opcjonalnie także na wywołania CQ; są to dwa niezależne przełączniki, oba domyślnie wyłączone. Osobny czas blokady dla każdego nadawcy zapobiega zbyt częstemu odpowiadaniu tej samej stacji.',

  js8_unicode_title: 'Tekst Unicode (UTX)',
  js8_unicode_text:  'Standardowy dowolny tekst w JS8 ogranicza się do podzbioru wielkich liter ASCII. FT8TW dodaje opcjonalne, jawnie udokumentowane rozszerzenie UTX, dzięki któremu dowolny tekst może przenosić pełny Unicode — chiński, japoński, koreański, cyrylicę, arabski i inne — zachowując pełną zgodność z niezmodyfikowanym JS8Call. UTX jest wyłącznie jawnym, odwracalnym formatem kodowania tekstu (o charakterze zbliżonym do UTF-8), a nie szyfrem ukrywającym treść; pełna specyfikacja bitowa jest opublikowana wraz z kodem źródłowym projektu, więc każdy może ją sprawdzić lub zaimplementować od nowa.',

  js8_safety_title: 'Bezpieczeństwo nadawania',
  js8_safety_text:  'Podobnie jak w FT8/FT4, niezależny nadzorca automatycznie przerywa każde nadawanie JS8 (w tym heartbeat i automatyczne odpowiedzi), gdy aplikacja zostanie zamknięta, usunięta z tła przez system albo ulegnie awarii — radio nie zostanie na nadawaniu bez nadzoru.',
},

'es': {
  js8_title: 'Modo chat JS8',
  js8_intro: 'JS8 es un modo de conversación por teclado construido sobre la estructura de señal de FT8. Además de los QSO estructurados permite charla libre, mensajes con almacenamiento y reenvío y comandos de estilo de red. Abre la pestaña JS8 para acceder a la pantalla de chat.',

  js8_speed_title: 'Modos de velocidad',
  js8_speed_text:  'JS8 ofrece cinco submodos de velocidad que cambian sensibilidad por rendimiento. Para oírse mutuamente, todos han de estar en <strong>la misma velocidad</strong>:',
  js8_speed_table: `
    <table>
      <tr><th>Modo</th><th>Intervalo</th><th>Características</th></tr>
      <tr><td>NORMAL</td><td>15 s</td><td>La mejor sensibilidad, rendimiento estándar. <strong>La opción general: empieza por aquí</strong></td></tr>
      <tr><td>FAST</td><td>10 s</td><td>Más rendimiento, sensibilidad ligeramente menor</td></tr>
      <tr><td>TURBO</td><td>6 s</td><td>Máximo rendimiento, sensibilidad reducida: para señales locales fuertes</td></tr>
      <tr><td>SLOW</td><td>30 s</td><td>Máxima sensibilidad, mínimo rendimiento: para DX marginal</td></tr>
      <tr><td>FT8TW</td><td>4 s</td><td><strong>Modo exclusivo de FT8TW que no interopera con el JS8Call estándar.</strong> Solo te oirá quien también use FT8TW con este ajuste; resulta útil para pruebas de corta distancia entre estaciones propias</td></tr>
    </table>`,

  js8_msg_title: 'Tipos de mensaje',
  js8_msg_text:  'Más allá de un simple intercambio de CQ y respuesta, JS8 admite varios formatos de mensaje:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat (HB)</strong> — anuncio periódico de tu presencia y del informe de señal, para que otras estaciones te oigan sin un QSO en curso.</li>
      <li><strong>Comandos dirigidos</strong> — consulta a otra estación su SNR, localizador, cadena INFO o lista de estaciones que oye (por ejemplo, <code>INDICATIVO SNR?</code>, <code>INDICATIVO GRID?</code>, <code>INDICATIVO HEARING?</code>).</li>
      <li><strong>Texto libre</strong> — mensajes de conversación de longitud completa, divididos automáticamente en tantas tramas de transmisión como haga falta.</li>
      <li><strong>Almacenar y reenviar (MSG / MSG TO:)</strong> — comandos almacenados con suma de comprobación, para hacer llegar un mensaje a una estación que ahora mismo no está a la escucha.</li>
    </ul>`,

  js8_what_title: 'Qué es JS8',
  js8_what_text:  'JS8, ideado por KN4CRD, toma prestada la estructura de señal de <a href="operating.html">FT8</a> y sustituye la capa rígida de mensajes por <strong>texto escrito libremente, de teclado a teclado</strong>. Dicho de otro modo: conserva la capacidad de FT8 de decodificar señales demasiado débiles para oírlas, pero permite conversar de verdad y no solo intercambiar indicativos y reportes.',
  js8_what_list: `
    <ul>
      <li><strong>Puedes escribir libremente</strong> — con la extensión que quieras. La aplicación divide el mensaje en tramas que envía una tras otra, así que <strong>los mensajes largos tardan</strong>: en modo Normal sale una trama cada 15 segundos.</li>
      <li><strong>La conversación no es en directo</strong> — a diferencia de la voz. Tras enviar, el otro operador ha de recibirlo en el intervalo siguiente y solo entonces teclear su respuesta; los intercambios se miden en minutos.</li>
      <li><strong>Mensajes y consultas</strong> — admite heartbeat (anunciar periódicamente que estás ahí), órdenes dirigidas (preguntar a otra estación su SNR, su locator o su información) y mensajes almacenados para estaciones que en ese momento no escuchan.</li>
      <li><strong>No interopera con FT8</strong> — la estructura de señal es común, pero son dos modos distintos; hay que usar JS8 en una frecuencia JS8 para encontrarse con alguien.</li>
    </ul>`,

  js8_quick_title: 'Inicio rápido: tu primer mensaje JS8',
  js8_quick_text:  'JS8 no tiene una secuencia de QSO automática como FT8: es una conversación, y qué decir y cuándo lo decides tú.',
  js8_quick_steps: `
    <ol>
      <li>Comprueba que <strong>tu indicativo</strong> está configurado y pon la radio en la frecuencia JS8 habitual de la banda (por ejemplo 14,078 MHz en 20 m).</li>
      <li>Abre la pestaña <strong>JS8</strong> desde el menú principal o la ventana flotante.</li>
      <li>Pon la velocidad en <strong>NORMAL 15s</strong>: es la que usa más gente, así que empieza por ahí.</li>
      <li>Asegúrate de que <strong>recepción/decodificación</strong> está activa y observa unos minutos; ver tráfico de otros confirma que la frecuencia es la correcta.</li>
      <li>Escribe en el cuadro inferior y pulsa <strong>Enviar</strong>. El mensaje queda en cola para el siguiente intervalo; puedes escribir el siguiente mientras sale el primero, y esperará su turno.</li>
      <li>Las respuestas llegan como burbujas de chat. Una pulsación larga sobre una burbuja permite copiarla o borrarla.</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>Paso</th><th>Se envía</th><th>Notas</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>Llamada CQ. El botón CQ rellena por ti el indicativo y el locator</td></tr>
      <tr><td>2</td><td>(él) <code>BV6LC: BX1AA SNR -07</code></td><td>Responde e indica con qué fuerza te oye</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>Texto libre: a partir de aquí es una conversación normal</td></tr>
      <tr><td>4</td><td>(él) <code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>Su respuesta</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>Despedida</td></tr>
    </table>`,
  js8_quick_note: 'Las respuestas habituales no hay que reescribirlas: el botón <strong>Mensajes rápidos</strong> incluye algunas ya preparadas (responder SNR, responder INFO, responder STATUS). Ten en cuenta además que el texto se reduce a un juego limitado de mayúsculas; para enviar acentos o cualquier contenido fuera de ASCII, consulta <strong>Texto Unicode (UTX)</strong> más abajo.',

  js8_bubble_title: 'Menú de pulsación larga en las burbujas de chat',
  js8_bubble_text:  'Una pulsación larga sobre cualquier burbuja del chat abre un menú:',
  js8_bubble_list: `
    <ul>
      <li><strong>Copiar texto</strong> — copia solo el texto del mensaje.</li>
      <li><strong>Copiar con detalles</strong> — copia también la línea de información (hora, TX o indicativo del corresponsal, reporte, frecuencia), exactamente como se ve en pantalla.</li>
      <li><strong>Eliminar mensaje</strong> — quita ese mensaje del historial del chat. Esta acción <strong>no se puede deshacer</strong>, por lo que pide confirmación antes.</li>
    </ul>
    <p>Una burbuja que todavía se está recibiendo solo permite copiar: aún no forma parte del registro permanente. Ten en cuenta también que, al usarse ahora la pulsación larga para este menú, ya no se puede arrastrar para seleccionar parte del texto; usa los dos elementos de copia.</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Activa los anuncios heartbeat con el intervalo que prefieras (10, 15 o 30 minutos) para que otras estaciones sepan que estás a la escucha, incluso sin un QSO en curso.',

  js8_autoreply_title: 'Respuesta automática',
  js8_autoreply_text:  'La respuesta automática puede contestar por sí sola a las consultas dirigidas a tu indicativo (SNR?/GRID?/INFO?/HEARING?/AGN?) y, si quieres, también a las llamadas CQ; son dos conmutadores independientes y ambos vienen desactivados. Un tiempo de espera por estación evita responder a la misma con demasiada frecuencia.',

  js8_unicode_title: 'Texto Unicode (UTX)',
  js8_unicode_text:  'El texto libre estándar de JS8 se limita a un subconjunto de ASCII en mayúsculas. FT8TW añade una extensión opcional y documentada públicamente llamada UTX, que permite que el texto libre transporte contenido Unicode completo —chino, japonés, coreano, cirílico, árabe y más— manteniendo plena compatibilidad con el JS8Call original sin modificar. UTX es únicamente un formato de codificación de texto público y reversible (de naturaleza parecida a UTF-8), nunca un cifrado para ocultar contenido; su especificación completa a nivel de bits se publica junto con el código fuente del proyecto para que cualquiera pueda revisarla o reimplementarla.',

  js8_safety_title: 'Seguridad en transmisión',
  js8_safety_text:  'Igual que en FT8/FT4, un vigilante independiente detiene automáticamente cualquier transmisión JS8 (incluidos heartbeat y respuesta automática) si la aplicación se cierra, el sistema la elimina en segundo plano o se bloquea, evitando que el equipo quede transmitiendo sin vigilancia.',
},

'el': {
  js8_title: 'Λειτουργία συνομιλίας JS8',
  js8_intro: 'Το JS8 είναι τρόπος συνομιλίας από πληκτρολόγιο, χτισμένος πάνω στη δομή σήματος του FT8. Πέρα από τις τυποποιημένες επαφές επιτρέπει ελεύθερη συζήτηση, μηνύματα με αποθήκευση και προώθηση, καθώς και εντολές δικτυακού τύπου. Ανοίξτε την καρτέλα JS8 για την οθόνη συνομιλίας.',

  js8_speed_title: 'Λειτουργίες ταχύτητας',
  js8_speed_text:  'Το JS8 προσφέρει πέντε υπολειτουργίες ταχύτητας, που ανταλλάσσουν ευαισθησία με ρυθμό μετάδοσης. Για να ακούγεστε μεταξύ σας, όλοι πρέπει να είναι στην <strong>ίδια ταχύτητα</strong>:',
  js8_speed_table: `
    <table>
      <tr><th>Λειτουργία</th><th>Χρονοθυρίδα</th><th>Χαρακτηριστικά</th></tr>
      <tr><td>NORMAL</td><td>15 δ</td><td>Καλύτερη ευαισθησία, τυπικός ρυθμός. <strong>Η γενική επιλογή — ξεκινήστε από εδώ</strong></td></tr>
      <tr><td>FAST</td><td>10 δ</td><td>Μεγαλύτερος ρυθμός, ελαφρώς μικρότερη ευαισθησία</td></tr>
      <tr><td>TURBO</td><td>6 δ</td><td>Μέγιστος ρυθμός, μειωμένη ευαισθησία — για δυνατά τοπικά σήματα</td></tr>
      <tr><td>SLOW</td><td>30 δ</td><td>Μέγιστη ευαισθησία, ελάχιστος ρυθμός — για οριακό DX</td></tr>
      <tr><td>FT8TW</td><td>4 δ</td><td><strong>Λειτουργία αποκλειστικά του FT8TW, ασύμβατη με το κανονικό JS8Call.</strong> Θα σας ακούσει μόνο όποιος τρέχει επίσης FT8TW με αυτή τη ρύθμιση — χρήσιμο για δοκιμές μικρής απόστασης ανάμεσα σε δικούς σας σταθμούς</td></tr>
    </table>`,

  js8_msg_title: 'Τύποι μηνυμάτων',
  js8_msg_text:  'Πέρα από την απλή ανταλλαγή CQ και απάντησης, το JS8 υποστηρίζει διάφορες μορφές μηνυμάτων:',
  js8_msg_list: `
    <ul>
      <li><strong>Heartbeat (HB)</strong> — περιοδική ανακοίνωση της παρουσίας σας και αναφοράς σήματος, ώστε να σας ακούν άλλοι σταθμοί χωρίς ενεργή επαφή.</li>
      <li><strong>Κατευθυνόμενες εντολές</strong> — ερώτημα σε άλλον σταθμό για SNR, τετράγωνο, κείμενο INFO ή λίστα σταθμών που ακούει (π.χ. <code>ΔΙΑΚΡΙΤΙΚΟ SNR?</code>, <code>ΔΙΑΚΡΙΤΙΚΟ GRID?</code>, <code>ΔΙΑΚΡΙΤΙΚΟ HEARING?</code>).</li>
      <li><strong>Ελεύθερο κείμενο</strong> — μηνύματα συνομιλίας πλήρους μήκους, που χωρίζονται αυτόματα σε όσα πλαίσια εκπομπής χρειάζονται.</li>
      <li><strong>Αποθήκευση και προώθηση (MSG / MSG TO:)</strong> — εντολές με άθροισμα ελέγχου, για μεταβίβαση μηνύματος σε σταθμό που δεν ακούει αυτή τη στιγμή.</li>
    </ul>`,

  js8_what_title: 'Τι είναι το JS8',
  js8_what_text:  'Το JS8, ιδέα του KN4CRD, δανείζεται τη δομή σήματος του <a href="operating.html">FT8</a> και αντικαθιστά το άκαμπτο επίπεδο μηνυμάτων από πάνω με <strong>ελεύθερα πληκτρολογημένο κείμενο, από πληκτρολόγιο σε πληκτρολόγιο</strong>. Με άλλα λόγια: διατηρεί την ικανότητα του FT8 να αποκωδικοποιεί σήματα πολύ ασθενή για να ακουστούν, αλλά σας επιτρέπει να μιλήσετε πραγματικά και όχι μόνο να ανταλλάξετε διακριτικά και αναφορές.',
  js8_what_list: `
    <ul>
      <li><strong>Μπορείτε να γράφετε ελεύθερα</strong> — σε όποια έκταση θέλετε. Η εφαρμογή χωρίζει μόνη της το μήνυμα σε πλαίσια που στέλνονται το ένα μετά το άλλο, οπότε <strong>τα μεγάλα μηνύματα αργούν</strong>: στη λειτουργία Normal φεύγει ένα πλαίσιο κάθε 15 δευτερόλεπτα.</li>
      <li><strong>Η συνομιλία δεν είναι ζωντανή</strong> — σε αντίθεση με τη φωνή. Μετά την αποστολή, ο άλλος πρέπει να τη λάβει στην επόμενη χρονοθυρίδα και μόνο τότε να απαντήσει· οι ανταλλαγές μετρώνται σε λεπτά.</li>
      <li><strong>Μηνύματα και ερωτήματα</strong> — υποστηρίζονται heartbeat (περιοδική ανακοίνωση ότι είστε εκεί), κατευθυνόμενες εντολές (ερώτηση σε άλλον σταθμό για SNR, τετράγωνο ή πληροφορίες) και μηνύματα αποθήκευσης-προώθησης για σταθμούς που δεν ακούν εκείνη τη στιγμή.</li>
      <li><strong>Δεν συνεργάζεται με το FT8</strong> — η δομή σήματος είναι κοινή, αλλά πρόκειται για δύο ξεχωριστές λειτουργίες· χρειάζεστε JS8 σε συχνότητα JS8 για να βρείτε κάποιον.</li>
    </ul>`,

  js8_quick_title: 'Γρήγορη εκκίνηση: το πρώτο σας μήνυμα JS8',
  js8_quick_text:  'Το JS8 δεν έχει αυτόματη ακολουθία επαφής όπως το FT8 — είναι συνομιλία, και το τι και πότε θα πείτε το αποφασίζετε εσείς.',
  js8_quick_steps: `
    <ol>
      <li>Βεβαιωθείτε ότι έχει οριστεί το <strong>διακριτικό</strong> σας και βάλτε τον πομποδέκτη στη συνήθη συχνότητα JS8 της μπάντας (π.χ. 14,078 MHz στα 20 m).</li>
      <li>Ανοίξτε την καρτέλα <strong>JS8</strong> από το κύριο μενού ή το αιωρούμενο παράθυρο.</li>
      <li>Βάλτε ταχύτητα <strong>NORMAL 15s</strong> — τη χρησιμοποιούν οι περισσότεροι, οπότε ξεκινήστε από εκεί.</li>
      <li>Βεβαιωθείτε ότι η <strong>λήψη/αποκωδικοποίηση</strong> είναι ενεργή και παρακολουθήστε για λίγα λεπτά· η κίνηση άλλων σταθμών επιβεβαιώνει ότι η συχνότητα είναι σωστή.</li>
      <li>Γράψτε στο πλαίσιο κάτω και πατήστε <strong>Αποστολή</strong>. Το μήνυμα μπαίνει σε ουρά για την επόμενη χρονοθυρίδα· μπορείτε να γράψετε και το επόμενο ενώ φεύγει το πρώτο, και θα περιμένει τη σειρά του.</li>
      <li>Οι απαντήσεις εμφανίζονται ως συννεφάκια συνομιλίας. Το παρατεταμένο πάτημα σε ένα συννεφάκι επιτρέπει αντιγραφή ή διαγραφή.</li>
    </ol>`,
  js8_quick_seq: `
    <table>
      <tr><th>Βήμα</th><th>Τι στέλνεται</th><th>Σημειώσεις</th></tr>
      <tr><td>1</td><td><code>CQ CQ CQ BV6LC PL03</code></td><td>Κλήση CQ. Το κουμπί CQ συμπληρώνει μόνο του το διακριτικό και το τετράγωνό σας</td></tr>
      <tr><td>2</td><td>(αυτός) <code>BV6LC: BX1AA SNR -07</code></td><td>Απαντά και δηλώνει με τι ένταση σας ακούει</td></tr>
      <tr><td>3</td><td><code>BX1AA: BV6LC HI OM TNX FOR CALL. RIG IS QMX 5W, ANT IS DIPOLE</code></td><td>Ελεύθερο κείμενο — από εδώ και πέρα είναι μια συνηθισμένη συνομιλία</td></tr>
      <tr><td>4</td><td>(αυτός) <code>BV6LC: BX1AA FB! WX HERE IS RAINY. 73</code></td><td>Η απάντησή του</td></tr>
      <tr><td>5</td><td><code>BX1AA: BV6LC TNX QSO 73</code></td><td>Κλείσιμο</td></tr>
    </table>`,
  js8_quick_note: 'Τις συνηθισμένες απαντήσεις δεν χρειάζεται να τις ξαναγράφετε — το κουμπί <strong>Γρήγορα μηνύματα</strong> περιέχει έτοιμες (απάντηση SNR, απάντηση INFO, απάντηση STATUS). Σημειώστε επίσης ότι το κείμενο μετατρέπεται σε περιορισμένο σύνολο κεφαλαίων χαρακτήρων· για να στείλετε ελληνικά ή οποιοδήποτε άλλο περιεχόμενο εκτός ASCII, δείτε το <strong>Κείμενο Unicode (UTX)</strong> παρακάτω.',

  js8_bubble_title: 'Μενού παρατεταμένου πατήματος στα συννεφάκια',
  js8_bubble_text:  'Το παρατεταμένο πάτημα σε οποιοδήποτε συννεφάκι της συνομιλίας ανοίγει ένα μενού:',
  js8_bubble_list: `
    <ul>
      <li><strong>Αντιγραφή κειμένου</strong> — αντιγράφει μόνο το κείμενο του μηνύματος.</li>
      <li><strong>Αντιγραφή με λεπτομέρειες</strong> — αντιγράφει και τη γραμμή πληροφοριών (ώρα, TX ή το διακριτικό του άλλου, αναφορά σήματος, συχνότητα), ακριβώς όπως φαίνεται στην οθόνη.</li>
      <li><strong>Διαγραφή μηνύματος</strong> — αφαιρεί το μήνυμα από το ιστορικό της συνομιλίας. Η ενέργεια <strong>δεν αναιρείται</strong>, γι\' αυτό ζητείται πρώτα επιβεβαίωση.</li>
    </ul>
    <p>Ένα συννεφάκι που ακόμη λαμβάνεται επιτρέπει μόνο αντιγραφή: δεν έχει μπει ακόμη στη μόνιμη καταγραφή. Σημειώστε επίσης ότι, επειδή το παρατεταμένο πάτημα ανοίγει πλέον αυτό το μενού, δεν μπορείτε πια να επιλέξετε μέρος του κειμένου σύροντας· χρησιμοποιήστε τα δύο στοιχεία αντιγραφής.</p>`,

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Ενεργοποιήστε τις ανακοινώσεις heartbeat με ρυθμιζόμενο διάστημα (10, 15 ή 30 λεπτά), ώστε οι άλλοι σταθμοί να γνωρίζουν ότι παρακολουθείτε, ακόμη και χωρίς ενεργή επαφή.',

  js8_autoreply_title: 'Αυτόματη απάντηση',
  js8_autoreply_text:  'Η αυτόματη απάντηση μπορεί να απαντά μόνη της σε ερωτήματα που απευθύνονται στο διακριτικό σας (SNR?/GRID?/INFO?/HEARING?/AGN?) και προαιρετικά και σε κλήσεις CQ· πρόκειται για δύο ξεχωριστούς διακόπτες, και οι δύο απενεργοποιημένοι από προεπιλογή. Ένας χρόνος αναμονής ανά σταθμό αποτρέπει τις πολύ συχνές απαντήσεις στον ίδιο σταθμό.',

  js8_unicode_title: 'Κείμενο Unicode (UTX)',
  js8_unicode_text:  'Το τυπικό ελεύθερο κείμενο του JS8 περιορίζεται σε υποσύνολο κεφαλαίων χαρακτήρων ASCII. Το FT8TW προσθέτει την προαιρετική και ανοικτά τεκμηριωμένη επέκταση UTX, που επιτρέπει στο ελεύθερο κείμενο να μεταφέρει πλήρες περιεχόμενο Unicode — κινεζικά, ιαπωνικά, κορεατικά, κυριλλικά, αραβικά και άλλα — διατηρώντας πλήρη συμβατότητα με το αυθεντικό JS8Call. Το UTX είναι αποκλειστικά ανοικτή και αντιστρέψιμη μορφή κωδικοποίησης κειμένου (συγγενής με το UTF-8) και ποτέ κρυπτογράφηση απόκρυψης· η πλήρης προδιαγραφή σε επίπεδο bit δημοσιεύεται μαζί με τον πηγαίο κώδικα του έργου, ώστε ο καθένας να μπορεί να την ελέγξει ή να την υλοποιήσει εκ νέου.',

  js8_safety_title: 'Ασφάλεια εκπομπής',
  js8_safety_text:  'Όπως και στο FT8/FT4, ανεξάρτητος επιτηρητής σταματά αυτόματα κάθε εκπομπή JS8 (συμπεριλαμβανομένων heartbeat και αυτόματης απάντησης) αν η εφαρμογή κλείσει, τερματιστεί από το σύστημα στο παρασκήνιο ή καταρρεύσει, ώστε ο πομποδέκτης να μη μένει σε εκπομπή χωρίς επίβλεψη.',
},

}; /* end PAGE_T */
