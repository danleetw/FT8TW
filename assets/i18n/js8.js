/* ── FT8TW User Manual – i18n: JS8 Chat Mode ─────────────────────── */

const PAGE_T = {

en: {
  js8_title: 'JS8 Chat Mode',
  js8_intro: 'JS8 is a keyboard-to-keyboard chat mode built on the FT8 signal structure, allowing free-form conversation, store-and-forward messaging, and network-style commands in addition to structured QSOs. Open the JS8 tab to access the chat screen.',

  js8_speed_title: 'Speed Modes',
  js8_speed_text:  'JS8 offers four speed/submode combinations, trading off sensitivity for message throughput:',
  js8_speed_table: `
    <table>
      <tr><th>Mode</th><th>Slot length</th><th>Characteristics</th></tr>
      <tr><td>Normal</td><td>15 s</td><td>Best sensitivity, standard throughput</td></tr>
      <tr><td>Fast</td><td>10 s</td><td>Higher throughput, slightly reduced sensitivity</td></tr>
      <tr><td>Turbo</td><td>6 s</td><td>Fastest throughput, reduced sensitivity — best for strong local signals</td></tr>
      <tr><td>Slow</td><td>30 s</td><td>Highest sensitivity, lowest throughput — best for marginal DX</td></tr>
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

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  'Enable heartbeat announcements at a configurable interval (10, 15, or 30 minutes) so other stations know you are monitoring, even without an active QSO.',

  js8_autoreply_title: 'Auto-Reply',
  js8_autoreply_text:  'Auto-reply can automatically answer directed queries (SNR?/GRID?/INFO?/HEARING?/AGN?) addressed to your callsign, and optionally answer CQ calls as well; each is a separate toggle, both default to off. A per-source cooldown prevents responding to the same station too frequently.',

  js8_unicode_title: 'Unicode Text (UTX)',
  js8_unicode_text:  'Standard JS8 free text is limited to an uppercase ASCII subset. FT8TW adds an optional, openly documented extension called UTX that allows free text to carry full Unicode content — Chinese, Japanese, Korean, Cyrillic, Arabic, and more — while remaining fully backward-compatible with unmodified JS8Call software. UTX is purely a public, reversible text-encoding format (comparable to UTF-8), never an obscuring cipher, and its complete bit-level specification is published in the project repository for anyone to inspect or re-implement.',

  js8_safety_title: 'Transmit Safety',
  js8_safety_text:  'As with FT8/FT4, an independent watchdog automatically stops any JS8 transmission (including heartbeat and auto-reply) if the app is closed, backgrounded and killed by the system, or crashes, preventing the radio from being left keyed unattended.',
},

'zh-TW': {
  js8_title: 'JS8 聊天模式',
  js8_intro: 'JS8 是建構在 FT8 訊號結構上的鍵盤對鍵盤聊天模式，除了標準 QSO 之外，還能進行自由對話、儲轉訊息及類似網路指令的操作。開啟 JS8 分頁即可進入聊天畫面。',

  js8_speed_title: '速度模式',
  js8_speed_text:  'JS8 提供四種速度／子模式組合，在靈敏度與傳輸量之間權衡：',
  js8_speed_table: `
    <table>
      <tr><th>模式</th><th>時隙長度</th><th>特性</th></tr>
      <tr><td>Normal</td><td>15 秒</td><td>靈敏度最佳，傳輸量標準</td></tr>
      <tr><td>Fast</td><td>10 秒</td><td>傳輸量較高，靈敏度略降</td></tr>
      <tr><td>Turbo</td><td>6 秒</td><td>傳輸量最高，靈敏度較低——適合訊號強勁的近距離通聯</td></tr>
      <tr><td>Slow</td><td>30 秒</td><td>靈敏度最高，傳輸量最低——適合微弱訊號的遠距 DX</td></tr>
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

  js8_hb_title: 'Heartbeat',
  js8_hb_text:  '可設定 heartbeat 廣播間隔（10、15 或 30 分鐘），即使沒有進行中的通聯，也能讓其他電台知道您正在監聽。',

  js8_autoreply_title: '自動回覆',
  js8_autoreply_text:  '自動回覆可自動應答指向您呼號的查詢指令（SNR?/GRID?/INFO?/HEARING?/AGN?），也可選擇自動回應 CQ；兩者為各自獨立的開關，預設皆為關閉。同一來源呼號有冷卻時間限制，避免過於頻繁回應。',

  js8_unicode_title: 'Unicode 文字（UTX）',
  js8_unicode_text:  '標準 JS8 自由文字僅限大寫 ASCII 子集。FT8TW 新增一個可選、且公開文件化的擴充格式「UTX」，讓自由文字能夠承載完整 Unicode 內容——中文、日文、韓文、西里爾文、阿拉伯文等，同時與未修改的原版 JS8Call 軟體保持完全相容。UTX 純粹是一種公開、可逆的文字編碼格式（性質類似 UTF-8），絕非用來隱匿內容的密碼，完整的位元層級規格已公開發布於專案 repo 中，任何人皆可查閱或重新實作。',

  js8_safety_title: '發射安全',
  js8_safety_text:  '與 FT8/FT4 相同，獨立的監管機制會在 App 被關閉、被系統於背景中結束，或發生當機時，自動停止任何 JS8 發射（包含 heartbeat 與自動回覆），避免電台在無人看管下持續發射。',
},

}; /* end PAGE_T */
