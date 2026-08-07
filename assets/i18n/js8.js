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
  js8_speed_text:  'JS8 提供四种速度／子模式组合，在灵敏度与传输量之间权衡：',
  js8_speed_table: `
    <table>
      <tr><th>模式</th><th>时隙长度</th><th>特性</th></tr>
      <tr><td>Normal</td><td>15 秒</td><td>灵敏度最佳，传输量标准</td></tr>
      <tr><td>Fast</td><td>10 秒</td><td>传输量较高，灵敏度略降</td></tr>
      <tr><td>Turbo</td><td>6 秒</td><td>传输量最高，灵敏度较低——适合信号强劲的近距离通联</td></tr>
      <tr><td>Slow</td><td>30 秒</td><td>灵敏度最高，传输量最低——适合微弱信号的远距 DX</td></tr>
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
  js8_speed_text:  'JS8 には感度と伝送量を天秤にかけた 4 つのスピード（サブモード）があります:',
  js8_speed_table: `
    <table>
      <tr><th>モード</th><th>スロット長</th><th>特徴</th></tr>
      <tr><td>Normal</td><td>15 秒</td><td>感度が最も良く、伝送量は標準</td></tr>
      <tr><td>Fast</td><td>10 秒</td><td>伝送量が多く、感度はやや低下</td></tr>
      <tr><td>Turbo</td><td>6 秒</td><td>伝送量は最大、感度は低め — 近距離の強い信号向け</td></tr>
      <tr><td>Slow</td><td>30 秒</td><td>感度は最高、伝送量は最小 — ぎりぎりの DX 向け</td></tr>
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
  js8_speed_text:  'В JS8 есть четыре сочетания скорости и подрежима — компромисс между чувствительностью и объёмом передаваемого текста:',
  js8_speed_table: `
    <table>
      <tr><th>Режим</th><th>Длина интервала</th><th>Особенности</th></tr>
      <tr><td>Normal</td><td>15 с</td><td>Лучшая чувствительность, обычная скорость передачи</td></tr>
      <tr><td>Fast</td><td>10 с</td><td>Выше скорость, чувствительность немного ниже</td></tr>
      <tr><td>Turbo</td><td>6 с</td><td>Максимальная скорость, чувствительность ниже — для сильных местных сигналов</td></tr>
      <tr><td>Slow</td><td>30 с</td><td>Максимальная чувствительность, минимальная скорость — для трудного DX</td></tr>
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
  js8_speed_text:  'JS8 oferuje cztery kombinacje prędkości i podtrybu, będące kompromisem między czułością a przepustowością:',
  js8_speed_table: `
    <table>
      <tr><th>Tryb</th><th>Długość okna</th><th>Charakterystyka</th></tr>
      <tr><td>Normal</td><td>15 s</td><td>Najlepsza czułość, standardowa przepustowość</td></tr>
      <tr><td>Fast</td><td>10 s</td><td>Większa przepustowość, nieco mniejsza czułość</td></tr>
      <tr><td>Turbo</td><td>6 s</td><td>Największa przepustowość, mniejsza czułość — do silnych sygnałów lokalnych</td></tr>
      <tr><td>Slow</td><td>30 s</td><td>Najwyższa czułość, najmniejsza przepustowość — do trudnego DX</td></tr>
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
  js8_speed_text:  'JS8 ofrece cuatro combinaciones de velocidad y submodo, que equilibran sensibilidad y volumen de texto transmitido:',
  js8_speed_table: `
    <table>
      <tr><th>Modo</th><th>Duración del intervalo</th><th>Características</th></tr>
      <tr><td>Normal</td><td>15 s</td><td>Mejor sensibilidad, rendimiento estándar</td></tr>
      <tr><td>Fast</td><td>10 s</td><td>Mayor rendimiento, sensibilidad algo menor</td></tr>
      <tr><td>Turbo</td><td>6 s</td><td>Máximo rendimiento, menor sensibilidad: ideal para señales locales fuertes</td></tr>
      <tr><td>Slow</td><td>30 s</td><td>Máxima sensibilidad, mínimo rendimiento: ideal para DX al límite</td></tr>
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
  js8_speed_text:  'Το JS8 προσφέρει τέσσερις συνδυασμούς ταχύτητας/υπολειτουργίας, με αντιστάθμισμα μεταξύ ευαισθησίας και όγκου μηνυμάτων:',
  js8_speed_table: `
    <table>
      <tr><th>Λειτουργία</th><th>Διάρκεια χρονοθυρίδας</th><th>Χαρακτηριστικά</th></tr>
      <tr><td>Normal</td><td>15 δευτ.</td><td>Καλύτερη ευαισθησία, τυπικός ρυθμός</td></tr>
      <tr><td>Fast</td><td>10 δευτ.</td><td>Μεγαλύτερος ρυθμός, ελαφρώς μειωμένη ευαισθησία</td></tr>
      <tr><td>Turbo</td><td>6 δευτ.</td><td>Μέγιστος ρυθμός, μειωμένη ευαισθησία — για ισχυρά τοπικά σήματα</td></tr>
      <tr><td>Slow</td><td>30 δευτ.</td><td>Μέγιστη ευαισθησία, ελάχιστος ρυθμός — για οριακό DX</td></tr>
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
