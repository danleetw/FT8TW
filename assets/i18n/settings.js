/* ── FT8TW User Manual – i18n: Settings Reference ────────────────── */

const PAGE_T = {

en: {
  set_title: 'Settings Reference',

  set_profile_title: 'Profiles',
  set_profile_text:  'Settings can be kept as several named profiles and switched in one step — handy when you move between a home rig, a portable radio and a club station, each with its own connection type, baud rate and CI-V address. The profile row sits at the top of the Settings home page and of every sub-page: the dropdown on the left switches profile, and the three icons on the right are <strong>+</strong> (add), a <strong>pencil</strong> (rename) and a <strong>bin</strong> (delete). Deleting asks for confirmation; the only restriction is that <strong>at least one profile must remain</strong>.',
  set_profile_note: 'Not every setting belongs to a profile. Those that do are marked in the app with a <strong>purple stripe</strong> down the left edge; anything without the stripe is shared by all profiles.',

  set_profile_caption: 'The profile row that appears at the top of every page: the dropdown switches profile, and the three icons add, rename and delete. Rows with a purple stripe on the left edge (callsign, grid, frequency) follow the profile; Time offset has no stripe, so it is shared by all profiles.',

  set_menu_title: 'The eight setting groups',
  set_menu_text:  'Settings are no longer one endless list: they are split into eight groups, each on its own page. Tap a group on the Settings home page to open it; every sub-page keeps the same profile row at the top, with <strong>Back to settings menu</strong> beneath it. The Settings home page also carries the <strong>About</strong>, <strong>DEBUG</strong> and <strong>Report</strong> buttons.',
  set_menu_list: `
    <ul>
      <li><strong>Basic Information</strong> — callsign, grid, time, band and mode</li>
      <li><strong>Auto QSO</strong> — auto-answer strategy and the transmit limits</li>
      <li><strong>Radio &amp; Audio</strong> — radio model, link parameters, PTT and audio format</li>
      <li><strong>Upload to Third-party</strong> — QRZ.com, Cloudlog / Wavelog and PSK Reporter</li>
      <li><strong>SOTA / POTA Activation</strong> — your own summit and park references</li>
      <li><strong>Display &amp; Appearance</strong> — theme, text size, waterfall, QSO alerts and the floating window</li>
      <li><strong>Backup &amp; Restore</strong> — automatic backup of the log database, and clearing stored data</li>
      <li><strong>Advanced &amp; Developer</strong> — audio device and the developer API</li>
    </ul>
    <p>Many rows carry an <strong>ⓘ</strong> icon on the right — that is the in-app help for that particular setting.</p>`,

  set_station_title: 'Basic Information',
  set_station_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Callsign</td><td>Your amateur radio callsign; required before you can transmit</td></tr>
      <tr><td>CQ Modifier</td><td>Edit the list of modifiers your CQ can carry (DX, EU, TEST…)</td></tr>
      <tr><td>Grid</td><td>Your Maidenhead locator. The location icon beside it fills it in from the phone's position</td></tr>
      <tr><td>Location precision</td><td><code>Low</code> / <code>Medium</code> / <code>High</code> / <code>Ultra High</code>, giving a 4 / 6 / 8 / 10-character grid. It only affects how many characters are taken when filling in from the phone's position</td></tr>
      <tr><td>Time offset</td><td>Manual clock correction in seconds</td></tr>
      <tr><td>Sync</td><td>Synchronise the clock with an internet time server</td></tr>
      <tr><td>Band</td><td>The band and frequency you are working. A leading <code>*</code> marks a frequency flagged as common in the frequency table</td></tr>
      <tr><td>Frequency Table</td><td>Edit the band/frequency table the app offers: add, modify, mark as common (*), or reset the whole thing to the built-in defaults. Each mode has its own table</td></tr>
      <tr><td>FT8/FT4/FT2 mode</td><td>Switch between the three modes. The radio retunes to the frequency for the new mode by itself; there is no need to pick it again</td></tr>
      <tr><td>Decode mode</td><td><code>Fast</code> / <code>Standard</code> (balanced, the default) / <code>Deep</code> (for weak signals). Later options take longer but dig out weaker signals</td></tr>
    </table>`,

  set_op_title: 'Auto QSO',
  set_op_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Do not save decodes</td><td>Keep decoded messages out of the database, saving storage</td></tr>
      <tr><td>Do not save SWL records</td><td>Do not log QSOs overheard between other stations</td></tr>
      <tr><td>Auto response CQ</td><td>The master switch. When off it reads "Do not auto-respond to CQ"</td></tr>
      <tr><td>CQ method</td><td>Which station to prefer when answering automatically; the options are described in <a href="operating.html">Operating FT8 / FT4</a></td></tr>
      <tr><td>Exclude QSOs</td><td>Skip stations worked within the chosen window: <strong>Off</strong>, <strong>All</strong>, <strong>1 / 4 / 8 hours</strong>, <strong>Today</strong>, <strong>30 days</strong> or <strong>365 days</strong></td></tr>
      <tr><td>Show worked stations</td><td>Keep already-worked stations in the list, shown with a strikethrough</td></tr>
      <tr><td>Follow</td><td>Callsigns to keep in view so you can catch them when they show up</td></tr>
      <tr><td>Excluded prefixes</td><td>Prefixes the automation should never answer</td></tr>
      <tr><td>TX watchdog</td><td>Stop transmitting automatically after the set number of minutes (0 = off)</td></tr>
      <tr><td>No response</td><td>Give up after N unanswered cycles and look for another station</td></tr>
      <tr><td>Resend at finish</td><td>If the other station calls again as the QSO closes, resend RR73 up to N times (0 = off)</td></tr>
      <tr><td>Contest mode (grid exchange)</td><td>Send <code>R</code> + your grid instead of a signal report; see <a href="operating.html">Operating FT8 / FT4</a></td></tr>
    </table>`,

  set_radio_title: 'Radio &amp; Audio',
  set_radio_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Radio model</td><td>Your transceiver model; it decides which set of CAT commands the app uses</td></tr>
      <tr><td>PTT control</td><td>How PTT is asserted: VOX / CAT / RTS / DTR</td></tr>
      <tr><td>Connection type</td><td>Cable (USB), Bluetooth or Network</td></tr>
      <tr><td>Data bits / Parity / Stop bits</td><td>Serial frame format; unless your radio's manual says otherwise, use <strong>Default</strong> to restore them</td></tr>
      <tr><td>CI-V address</td><td>ICOM CI-V bus address (ICOM radios only)</td></tr>
      <tr><td>Baud rate</td><td>CAT serial speed; must match the radio's setting</td></tr>
      <tr><td>TX delay <em>(deprecated)</em></td><td>Audio output timing compensation (ms); the app marks this as deprecated and it can be left alone</td></tr>
      <tr><td>PTT delay</td><td>Milliseconds to wait after PTT before sending audio. Increase it if the radio is slow to switch to transmit</td></tr>
      <tr><td>Default audio frequency</td><td>The default TX audio frequency (0–2900 Hz)</td></tr>
      <tr><td>Same-frequency / split TX</td><td>Two states of one switch: on, the TX frequency follows the station you are working; off, transmit and receive each use their own frequency</td></tr>
      <tr><td>Bit depth</td><td>16-bit integer or 32-bit float audio output</td></tr>
      <tr><td>Sample rate</td><td>12 kHz (default), 24 kHz or 48 kHz</td></tr>
      <tr><td>SWR / ALC alert</td><td>Warn when SWR or ALC exceeds safe limits; when off it reads "Do not alert on SWR/ALC"</td></tr>
      <tr><td>Receive audio gain</td><td>Amplify or attenuate the received audio inside the app. Useful when the radio's own output cannot be changed — a QMX sends a fixed level over USB, and on ICOM radios the USB level is in the set menu rather than on the AF knob</td></tr>
    </table>`,

  set_services_title: 'Upload to Third-party',
  set_services_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Auto-upload to QRZ.com</td><td>Send finished QSOs straight to your QRZ.com logbook</td></tr>
      <tr><td>QRZ.com API key</td><td>Obtained from the Logbook settings on QRZ.com; <strong>Test connection</strong> beside it confirms the key works</td></tr>
      <tr><td>Manual upload</td><td>Send existing log entries in a batch for a chosen date range</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Server address, API key and Station ID, plus a connection test; see <a href="third-party.html">Third-party Services</a></td></tr>
      <tr><td>Spot to PSK Reporter</td><td>Submit reception reports anonymously to the propagation map; no account needed</td></tr>
      <tr><td>Antenna</td><td>A description of your antenna (<code>Dipole</code>, <code>Vertical</code>…) sent along with PSK Reporter spots. It is descriptive text for the map and does <strong>not</strong> switch any antenna port on the radio</td></tr>
      <tr><td>FREE TEXT</td><td>A piece of free text prepared in advance. Long-pressing the CQ button on the Calling tab enters free-text mode and fills this in, which is handy for SOTAmat</td></tr>
    </table>`,

  set_display_title: 'Display &amp; Appearance',
  set_display_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Theme</td><td>Device setting, Light or Dark</td></tr>
      <tr><td>Message mode</td><td><strong>Standard</strong> (full detail per row) or <strong>Simple</strong> (one compact line) layout for the decode list</td></tr>
      <tr><td>List font size</td><td>Text size in the decode and log lists</td></tr>
      <tr><td>Keep screen on</td><td>Prevent the screen from turning off during operation</td></tr>
      <tr><td>Mini waterfall on Decode / Call</td><td>Show a compact waterfall strip on either tab; two independent switches</td></tr>
      <tr><td>Waterfall colour scheme</td><td>Classic or rainbow colour mapping for the spectrum and waterfall</td></tr>
      <tr><td>QSO success: screen flash / ripple / flashlight / QRZ photo</td><td>Four independent ways to announce a completed QSO; see <a href="logging.html">QSO Logging</a></td></tr>
      <tr><td>Show floating window</td><td>Master switch for the floating shortcut menu</td></tr>
      <tr><td>The individual floating buttons</td><td>Hide bottom menu, frequency, volume, grid tracker, radio tool, WSPR, JS8 chat and quick mode switch — eight buttons, each shown or hidden independently</td></tr>
      <tr><td>Language</td><td>Interface language, independent of the system setting</td></tr>
    </table>`,

  set_activation_title: 'SOTA / POTA Activation',
  set_activation_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Activation mode</td><td>Write your own SOTA / POTA reference into every logged QSO</td></tr>
      <tr><td>My SOTA</td><td>The summit you are activating, e.g. <code>BV/TP-001</code></td></tr>
      <tr><td>My POTA</td><td>The park you are activating, e.g. <code>TW-0001</code>. The park name and grid are looked up and shown underneath, so you can check the reference is right</td></tr>
      <tr><td>+ Add park</td><td>One spot often sits in several parks at once (an n-fer). Up to <strong>6</strong> can be entered; each row has its own delete button</td></tr>
    </table>
    <p>With two or more parks entered, the export switches to <strong>one ADIF per park, bundled into a ZIP</strong> — POTA's n-fer convention is one log per park, uploaded separately. A single park still exports as one file.</p>`,

  set_backup_title: 'Backup &amp; Restore',
  set_backup_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Auto backup on startup</td><td>Back up the log database when the app starts</td></tr>
      <tr><td>Interval (days)</td><td>How long to wait before the next automatic backup</td></tr>
      <tr><td>Keep generations</td><td>How many older copies to retain; the oldest are deleted beyond that</td></tr>
      <tr><td>Backup folder</td><td>Where backup files are written; pick a cloud-synced folder and the backup also leaves the phone</td></tr>
      <tr><td>Backup now / Restore backup</td><td>Take a backup immediately, or browse and restore an earlier one</td></tr>
      <tr><td>Clear stored data</td><td>Separately discard <strong>followed callsigns</strong>, <strong>decoded messages</strong> and <strong>SWL records</strong></td></tr>
      <tr><td>Del temp files</td><td>Remove the temporary files produced by log sharing</td></tr>
      <tr><td>Clear QSO count</td><td>Reset the session QSO counter</td></tr>
    </table>`,

  set_advanced_title: 'Advanced &amp; Developer',
  set_advanced_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Audio device</td><td>Shows which device is actually being recorded (built-in microphone or USB sound card) and at what sample rate. If a USB audio device was found but the recording could not be routed to it, this says so plainly instead of leaving you to guess</td></tr>
      <tr><td>Re-detect</td><td>Press after plugging in a USB sound card (a Digirig, say) to switch to it without restarting the app. Hot-plugging is normally detected automatically; this is the fallback when it is not. It does nothing when audio comes from a network radio, and says why</td></tr>
      <tr><td>Diagnostic detail (six lines)</td><td>The status line says which device we picked; these six ask <strong>the recorder itself what it is actually capturing</strong>: <code>Device type</code> (the device actually routed to — <code>BUILTIN_MIC</code> with a USB card attached means the room is still being recorded), <code>Sample rate</code>, <code>Channel count</code> (both actual values; the system may ignore what we asked for), <code>Record source</code>, <code>SCO state</code> (the real Bluetooth link state) and <code>SCO requested</code> (the flag the app asked for). A mismatch between the two SCO lines means Bluetooth has quietly dropped. Include all six when reporting a problem</td></tr>
      <tr><td>Developer API (for add-ons)</td><td>Opens an HTTP interface on the phone so other programs on the same network can read decodes, log entries and the spectrum. The address is shown once enabled</td></tr>
      <tr><td>Read-only token</td><td>Credential that can only read. Can be copied or regenerated</td></tr>
      <tr><td>Full-access token</td><td>Credential that can control the app — <strong>keep it private</strong>. Regenerating it invalidates the old one immediately</td></tr>
      <tr><td>Allow remote transmit control</td><td>Lets a program holding the full-access token start and stop transmission from another device. Leave it off unless you need remote TX</td></tr>
    </table>`,
},

'zh-TW': {
  set_title: '設定說明',

  set_profile_title: '設定組（Profile）',
  set_profile_text:  '設定可以存成多組具名的設定檔，一步就能切換——在家用電台、隨身機與社團電台之間移動時特別方便，因為各自的連接方式、傳輸速率與 CI-V 地址都不同。設定組列固定顯示在設定首頁與每一個子頁的最上方：左邊的下拉選單切換設定組，右邊三顆圖示依序是<strong>＋</strong>（新增）、<strong>鉛筆</strong>（重新命名）與<strong>垃圾桶</strong>（刪除）。刪除時會先跳出確認；唯一的限制是<strong>至少要保留一組</strong>，只剩一組時不能再刪。',
  set_profile_note: '並非所有設定都屬於設定檔。屬於的項目在 App 中會於左緣標示一道<strong>紫色色條</strong>；沒有色條的項目則是所有設定檔共用。',

  set_profile_caption: '每一頁最上方都有的設定組列：下拉切換設定組，右邊三顆圖示是新增、重新命名與刪除。左緣有紫色色條的項目（我的呼號、我的位置、載波頻段）會隨設定組切換；時間偏移沒有色條，代表所有設定組共用。',

  set_menu_title: '八個設定分類',
  set_menu_text:  '設定不再是一長串捲不完的清單，而是分成八類，各自獨立一頁。在設定首頁點選任一類即可進入，子頁上方保留同一列設定組，其下的<strong>回主設定選單</strong>可退回分類清單。設定首頁最下方還有<strong>關於我</strong>、<strong>DEBUG</strong> 與<strong>回報</strong>三顆按鈕，以及贊助說明。',
  set_menu_list: `
    <ul>
      <li><strong>基本資訊</strong> — 呼號、網格、時間、頻段與模式</li>
      <li><strong>自動通聯</strong> — 自動回應 CQ 的策略與各種發射限制</li>
      <li><strong>電台與聲音</strong> — 電台型號、連線參數、PTT 與音訊格式</li>
      <li><strong>上傳至第三方</strong> — QRZ.com、Cloudlog / Wavelog 與 PSK Reporter</li>
      <li><strong>SOTA / POTA 出勤</strong> — 自己出勤時要寫進記錄的山峰與公園編號</li>
      <li><strong>顯示與佈景</strong> — 佈景、字級、瀑布圖、完成提示與浮動視窗</li>
      <li><strong>備份與還原</strong> — 日誌資料庫的自動備份，以及清空儲存資料</li>
      <li><strong>進階與開發者</strong> — 音訊裝置與開發者 API</li>
    </ul>
    <p>下面依 App 的順序逐類說明。許多項目右側有一顆 <strong>ⓘ</strong> 圖示，點下去就是該項目在 App 內的即時說明。</p>`,

  set_station_title: '基本資訊',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>我的呼號</td><td>您的業餘無線電呼號，發射前必填</td></tr>
      <tr><td>CQ對象</td><td>編輯 CQ 可以附加的修飾詞清單（DX、EU、TEST…）</td></tr>
      <tr><td>我的位置</td><td>Maidenhead 網格座標。旁邊的定位圖示可用手機定位自動填入</td></tr>
      <tr><td>定位精度</td><td><code>Low</code>／<code>Medium</code>／<code>High</code>／<code>Ultra High</code>，分別對應 4／6／8／10 碼網格。這個選項只影響用定位自動填入時取到幾碼</td></tr>
      <tr><td>時間偏移</td><td>手動時鐘修正（秒）</td></tr>
      <tr><td>同步時間</td><td>透過網路時間伺服器校時</td></tr>
      <tr><td>載波頻段</td><td>目前操作的頻段與頻率。開頭有 <code>*</code> 的是在頻率表中被標記為常用的頻率</td></tr>
      <tr><td>頻率表</td><td>編輯程式提供的頻段／頻率對照表：可新增、修改、標記為常用 (*)，或整份還原成內建預設值。每個模式各有一份</td></tr>
      <tr><td>FT8/FT4/FT2 模式</td><td>切換三種模式。切換後電台會自動跟著換到該模式對應的頻率，不必再自己選一次</td></tr>
      <tr><td>解碼模式</td><td><code>Fast</code>（快速）／<code>Standard</code>（平衡，預設）／<code>Deep</code>（適合微弱訊號）。愈往後愈花時間，但能撈出更弱的訊號</td></tr>
    </table>`,

  set_op_title: '自動通聯',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>不保存解碼</td><td>不把解碼到的訊息存進資料庫，可省下儲存空間</td></tr>
      <tr><td>不保存SWL記錄</td><td>不記錄旁聽到的其他電台之間的通聯</td></tr>
      <tr><td>自動回應CQ</td><td>總開關。關閉時顯示為「不自動回應CQ」</td></tr>
      <tr><td>回應CQ方案</td><td>自動回應時要優先挑哪一個電台，選項說明見<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
      <tr><td>排除已通聯</td><td>跳過在選定時間窗口內已通聯過的電台。可選<strong>關閉（不排除）</strong>、<strong>所有</strong>、<strong>1／4／8 小時內</strong>、<strong>今天</strong>、<strong>30 天內</strong>或 <strong>365 天內</strong></td></tr>
      <tr><td>顯示已通聯站台（加刪除線）</td><td>已通聯過的電台仍留在清單中，以刪除線標示</td></tr>
      <tr><td>關注的呼號</td><td>要留在視線內的呼號，一出現就能抓到</td></tr>
      <tr><td>排除的呼號前綴</td><td>自動回應永遠不去回的呼號前綴</td></tr>
      <tr><td>發射監管</td><td>經過設定的分鐘數後自動停止發射（0 = 停用）</td></tr>
      <tr><td>沒回應</td><td>連續 N 個週期沒等到回應就中斷呼叫，改去找別的對象</td></tr>
      <tr><td>收尾最多重發</td><td>通聯尾聲時對方若又呼叫，最多補發 N 次 RR73（0 = 關閉）</td></tr>
      <tr><td>競賽模式（交換網格）</td><td>改送 <code>R</code> + 自己的網格取代訊號報告，詳見<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
    </table>`,

  set_radio_title: '電台與聲音',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>電台型號</td><td>您的電台型號，決定 App 要用哪一套 CAT 指令</td></tr>
      <tr><td>控制方式</td><td>PTT 要怎麼觸發：VOX / CAT / RTS / DTR</td></tr>
      <tr><td>連接方式</td><td>有線連接（USB）、藍牙連接或網路連接</td></tr>
      <tr><td>數據位 / 校驗位 / 停止位</td><td>序列埠的資料框格式；除非電台手冊另有說明，按<strong>預設值</strong>還原即可</td></tr>
      <tr><td>CI-V地址</td><td>ICOM CI-V 匯流排地址（僅 ICOM 電台）</td></tr>
      <tr><td>傳輸速率</td><td>CAT 序列速度，須與電台設定相符</td></tr>
      <tr><td>發射延遲<em>（已停用）</em></td><td>音訊輸出時序補償（毫秒）；App 已標示為停用，不必再調整</td></tr>
      <tr><td>PTT延遲</td><td>PTT 觸發後至開始發射音訊的等待時間（毫秒）。電台切換到發射較慢時調大</td></tr>
      <tr><td>預設頻率</td><td>預設的發射音訊頻率（0–2900 Hz）</td></tr>
      <tr><td>同頻發射／異頻發射</td><td>同一顆開關的兩種狀態：開啟時發射頻率跟著對方的接收頻率走，關閉時發射與接收各用各的頻率</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮點音訊輸出</td></tr>
      <tr><td>取樣頻率</td><td>12 kHz（預設）、24 kHz 或 48 kHz</td></tr>
      <tr><td>提示SWR/ALC警報</td><td>駐波比或 ALC 超出安全值時顯示警告；關閉時顯示為「不提示SWR/ALC警報」</td></tr>
      <tr><td>接收音訊增益</td><td>在 App 內把收到的音訊放大或縮小。電台本身的輸出電平調不動時特別有用——例如 QMX 這類純數位機的 USB 音訊是固定的，ICOM 的 USB 音量則藏在 SET 選單裡而不是 AF 旋鈕</td></tr>
    </table>`,

  set_services_title: '上傳至第三方',
  set_services_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>自動上傳至 QRZ.com</td><td>把完成的通聯即時送進 QRZ.com 日誌簿</td></tr>
      <tr><td>QRZ.com API 金鑰</td><td>在 QRZ.com 的 Logbook 設定中取得；旁邊的<strong>測試連線</strong>可先確認金鑰有效</td></tr>
      <tr><td>手動上傳</td><td>選定日期範圍後批次補傳既有的通聯記錄</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>伺服器地址、API 金鑰與站點 ID，並可測試連線，詳見<a href="third-party.html">「第三方服務」</a></td></tr>
      <tr><td>回報訊號到 PSK Reporter</td><td>把收聽報告匿名提交到全球傳播地圖，不需帳號</td></tr>
      <tr><td>天線資訊</td><td>回報給 PSK Reporter 的天線型號描述（例如 <code>Dipole</code>、<code>Vertical</code>），純粹是給地圖看的說明文字，<strong>不會</strong>切換電台的天線埠</td></tr>
      <tr><td>FREE TEXT</td><td>預先寫好的一段自由文字。長按呼叫畫面的 CQ 按鈕進入自由文字模式時會自動帶入，方便通報 SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'SOTA / POTA 出勤',
  set_activation_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>出勤模式（將編號寫入記錄）</td><td>開啟後，每筆通聯都會自動把您的 SOTA／POTA 編號寫進日誌</td></tr>
      <tr><td>我的 SOTA</td><td>您正在啟動的山峰編號，例如 <code>BV/TP-001</code></td></tr>
      <tr><td>我的 POTA</td><td>您正在啟動的公園編號，例如 <code>TW-0001</code>。輸入後下方會顯示查到的園區名稱與網格，可據以確認編號沒打錯</td></tr>
      <tr><td>＋ 新增園區</td><td>同一個地點常同時落在多個園區（n-fer），最多可填 <strong>6 組</strong>，滿了之後按鈕會停用。每一列都有各自的刪除鈕</td></tr>
    </table>
    <p>填了兩座以上的公園時，匯出會自動改為<strong>每座公園一份 ADIF、打包成一個 ZIP</strong>——POTA 官方的 n-fer 慣例就是一座公園一份 log 分開上傳，把多個編號串在同一個欄位裡上傳系統不會收。只有一座公園時維持單檔匯出。</p>`,

  set_display_title: '顯示與佈景',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>佈景模式</td><td>裝置設定、淺色或深色</td></tr>
      <tr><td>顯示模式</td><td>解碼清單採<strong>標準</strong>（每列完整資訊）或<strong>簡要</strong>（單行精簡）版面</td></tr>
      <tr><td>列表字型大小</td><td>解碼與日誌清單的文字大小</td></tr>
      <tr><td>防止螢幕關閉</td><td>操作中防止螢幕自動熄滅</td></tr>
      <tr><td>解碼／呼叫介面顯示小瀑布圖</td><td>在兩個分頁各顯示一條精簡瀑布圖，兩者為獨立開關</td></tr>
      <tr><td>瀑布圖色階</td><td>頻譜／瀑布圖採經典色階或彩虹色階</td></tr>
      <tr><td>通聯成功：畫面閃爍／水波紋／閃光燈閃爍／顯示對方 QRZ 照片</td><td>四種各自獨立的完成提示，詳見<a href="logging.html">「通聯記錄」</a></td></tr>
      <tr><td>顯示浮動視窗</td><td>浮動快捷選單的總開關</td></tr>
      <tr><td>浮動視窗的各顆按鈕</td><td>隱藏底部選單、頻率調整、音量調整、網格追蹤、電台工具、WSPR、JS8 聊天、快速切換模式，共八顆各自可獨立顯示或隱藏</td></tr>
      <tr><td>語言</td><td>介面語言，與系統語言各自獨立</td></tr>
    </table>`,

  set_backup_title: '備份與還原',
  set_backup_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>啟動時自動備份</td><td>App 啟動時自動備份日誌資料庫</td></tr>
      <tr><td>週期（天）</td><td>距離下一次自動備份要等多久</td></tr>
      <tr><td>保留代數</td><td>保留幾份舊備份，超過的份數會從最舊的開始刪除</td></tr>
      <tr><td>選擇備份資料夾</td><td>指定備份檔案的存放位置；選一個有雲端同步的資料夾，備份就同時離開了手機</td></tr>
      <tr><td>立即備份／還原備份</td><td>馬上備份一份，或瀏覽並還原先前的備份</td></tr>
      <tr><td>清空儲存資料</td><td>分別清掉<strong>關注的呼號</strong>、<strong>解碼的訊息</strong>與 <strong>SWL記錄</strong></td></tr>
      <tr><td>清除暫存檔</td><td>刪除日誌分享產生的暫存檔案</td></tr>
      <tr><td>清除通聯次數</td><td>重設本次作業的通聯計數器</td></tr>
    </table>`,

  set_advanced_title: '進階與開發者',
  set_advanced_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>音訊裝置</td><td>顯示目前實際在收哪一個裝置（內建麥克風或 USB 音效卡）及其取樣率。若偵測到 USB 音訊卻無法把錄音導過去，這裡會直接講明「實際仍在收內建麥克風」，不必自己猜</td></tr>
      <tr><td>重新偵測</td><td>插上 USB 音效卡（例如 Digirig）之後按一下即可改用它，不必重開 App。多數情況下 App 會自動偵測到插拔，這顆是自動偵測不管用時的後路。音訊來自網路電台時按下去不會有動作，並會直接說明原因</td></tr>
      <tr><td>診斷細節（六行）</td><td>狀態文字說的是「我們挑到哪個裝置」，這六行問的是<strong>錄音物件本人現在真的在收什麼</strong>：<code>Device type</code>（實際路由到的裝置，接了 USB 卻顯示 <code>BUILTIN_MIC</code> 就是還在收室內聲音）、<code>Sample rate</code>、<code>Channel count</code>（都是實際值，系統可以不照要求辦）、<code>Record source</code>、<code>SCO state</code>（藍牙鏈路的真實狀態）、<code>SCO requested</code>（程式要求過的旗標）。兩個 SCO 欄位不一致，就是藍牙悄悄斷線了。回報問題時把這六行一起附上</td></tr>
      <tr><td>開發者 API（供外掛使用）</td><td>在手機上開一個唯讀／可控制的 HTTP 介面，讓同一個網路上的其他程式讀取解碼結果、通聯記錄與頻譜。開啟後會顯示存取網址</td></tr>
      <tr><td>唯讀 Token</td><td>只能讀資料的憑證，可<strong>複製</strong>或<strong>重新產生</strong></td></tr>
      <tr><td>完整權限 Token</td><td>可以控制 App 的憑證，<strong>請勿外流</strong>。同樣可複製或重新產生；重新產生後舊的立即失效</td></tr>
      <tr><td>允許遠端控制發射</td><td>開啟後，持有完整權限 Token 的程式可以從其他裝置開始與停止發射。不需要遠端發射就讓它保持關閉</td></tr>
    </table>`,
},

'zh-CN': {
  set_title: '设置说明',

  set_profile_title: '设置组（Profile）',
  set_profile_text:  '设置可以存成多组具名的配置文件，一步就能切换——在家用电台、随身机与俱乐部电台之间移动时特别方便，因为各自的连接方式、波特率与 CI-V 地址都不同。设置组行固定显示在设置首页与每一个子页的最上方：左边的下拉菜单切换设置组，右边三个图标依次是<strong>＋</strong>（新增）、<strong>铅笔</strong>（重命名）与<strong>垃圾桶</strong>（删除）。删除时会先弹出确认；唯一的限制是<strong>至少要保留一组</strong>，只剩一组时不能再删。',
  set_profile_note: '并非所有设置都属于配置文件。属于的项目在 App 中会于左缘标示一道<strong>紫色色条</strong>；没有色条的项目则是所有配置文件共用。',

  set_profile_caption: '每一页最上方都有的设置组行：下拉切换设置组，右边三个图标是新增、重命名与删除。左缘有紫色色条的项目（我的呼号、我的位置、载波频段）会随设置组切换；时间偏移没有色条，代表所有设置组共用。',

  set_menu_title: '八个设置分类',
  set_menu_text:  '设置不再是一长串滚不完的列表，而是分成八类，各自独立一页。在设置首页点选任一类即可进入，子页上方保留同一行设置组，其下的<strong>回主设置菜单</strong>可退回分类列表。设置首页最下方还有<strong>关于我</strong>、<strong>DEBUG</strong> 与<strong>回报</strong>三个按钮，以及赞助说明。',
  set_menu_list: `
    <ul>
      <li><strong>基本信息</strong> — 呼号、网格、时间、频段与模式</li>
      <li><strong>自动通联</strong> — 自动回应 CQ 的策略与各种发射限制</li>
      <li><strong>电台与声音</strong> — 电台型号、连接参数、PTT 与音频格式</li>
      <li><strong>上传至第三方</strong> — QRZ.com、Cloudlog / Wavelog 与 PSK Reporter</li>
      <li><strong>SOTA / POTA 出勤</strong> — 自己出勤时要写进记录的山峰与公园编号</li>
      <li><strong>显示与外观</strong> — 主题、字号、瀑布图、完成提示与悬浮窗口</li>
      <li><strong>备份与还原</strong> — 日志数据库的自动备份，以及清空缓存</li>
      <li><strong>高级与开发者</strong> — 音频设备与开发者 API</li>
    </ul>
    <p>下面依 App 的顺序逐类说明。许多项目右侧有一个 <strong>ⓘ</strong> 图标，点下去就是该项目在 App 内的即时说明。</p>`,

  set_station_title: '基本信息',
  set_station_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>我的呼号</td><td>您的业余无线电呼号，发射前必填</td></tr>
      <tr><td>CQ修饰符</td><td>编辑 CQ 可以附加的修饰词列表（DX、EU、TEST…）</td></tr>
      <tr><td>我的位置</td><td>Maidenhead 网格坐标。旁边的定位图标可用手机定位自动填入</td></tr>
      <tr><td>定位精度</td><td><code>Low</code>／<code>Medium</code>／<code>High</code>／<code>Ultra High</code>，分别对应 4／6／8／10 位网格。这个选项只影响用定位自动填入时取到几位</td></tr>
      <tr><td>时间偏移</td><td>手动时钟修正（秒）</td></tr>
      <tr><td>同步时间</td><td>通过网络时间服务器校时</td></tr>
      <tr><td>载波频段</td><td>目前操作的频段与频率。开头有 <code>*</code> 的是在频率表中被标记为常用的频率</td></tr>
      <tr><td>频率表</td><td>编辑程序提供的频段／频率对照表：可新增、修改、标记为常用 (*)，或整份还原成内置默认值。每个模式各有一份</td></tr>
      <tr><td>FT8/FT4/FT2 模式</td><td>切换三种模式。切换后电台会自动跟着换到该模式对应的频率，不必再自己选一次</td></tr>
      <tr><td>解码模式</td><td><code>Fast</code>（快速）／<code>Standard</code>（平衡，默认）／<code>Deep</code>（适合微弱信号）。越往后越花时间，但能捞出更弱的信号</td></tr>
    </table>`,

  set_op_title: '自动通联',
  set_op_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>不保存解码</td><td>不把解码到的消息存进数据库，可省下存储空间</td></tr>
      <tr><td>不保存SWL记录</td><td>不记录旁听到的其他电台之间的通联</td></tr>
      <tr><td>自动关注CQ</td><td>总开关。关闭时显示为「不关注CQ」</td></tr>
      <tr><td>回应CQ方案</td><td>自动回应时要优先挑哪一个电台，选项说明见<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
      <tr><td>排除已通联</td><td>跳过在选定时间窗口内已通联过的电台。可选<strong>关闭（不排除）</strong>、<strong>所有</strong>、<strong>1／4／8 小时内</strong>、<strong>今天</strong>、<strong>30 天内</strong>或 <strong>365 天内</strong></td></tr>
      <tr><td>显示已通联站台（加删除线）</td><td>已通联过的电台仍留在列表中，以删除线标示</td></tr>
      <tr><td>关注的呼号</td><td>要留在视线内的呼号，一出现就能抓到</td></tr>
      <tr><td>排除的呼号前缀</td><td>自动回应永远不去回的呼号前缀</td></tr>
      <tr><td>发射监管</td><td>经过设定的分钟数后自动停止发射（0 = 停用）</td></tr>
      <tr><td>无回应</td><td>连续 N 个周期没等到回应就中断呼叫，改去找别的对象</td></tr>
      <tr><td>收尾最多重发</td><td>通联尾声时对方若又呼叫，最多补发 N 次 RR73（0 = 关闭）</td></tr>
      <tr><td>竞赛模式（交换网格）</td><td>改送 <code>R</code> + 自己的网格取代信号报告，详见<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
    </table>`,

  set_radio_title: '电台与声音',
  set_radio_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>电台型号</td><td>您的电台型号，决定 App 要用哪一套 CAT 指令</td></tr>
      <tr><td>控制方式</td><td>PTT 要怎么触发：VOX / CAT / RTS / DTR</td></tr>
      <tr><td>连接方式</td><td>有线连接（USB）、蓝牙连接或网络连接</td></tr>
      <tr><td>数据位 / 校验位 / 停止位</td><td>串口的数据帧格式；除非电台手册另有说明，按<strong>默认设置</strong>还原即可</td></tr>
      <tr><td>CI-V地址</td><td>ICOM CI-V 总线地址（仅 ICOM 电台）</td></tr>
      <tr><td>波特率</td><td>CAT 串口速度，须与电台设置相符</td></tr>
      <tr><td>发射延迟<em>（已停用）</em></td><td>音频输出时序补偿（毫秒）；App 已标示为停用，不必再调整</td></tr>
      <tr><td>PTT延时</td><td>PTT 触发后至开始发射音频的等待时间（毫秒）。电台切换到发射较慢时调大</td></tr>
      <tr><td>默认频率</td><td>默认的发射音频频率（0–2900 Hz）</td></tr>
      <tr><td>同频发射／异频发射</td><td>同一个开关的两种状态：开启时发射频率跟着对方的接收频率走，关闭时发射与接收各用各的频率</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮点音频输出</td></tr>
      <tr><td>采样频率</td><td>12 kHz（默认）、24 kHz 或 48 kHz</td></tr>
      <tr><td>提示SWR/ALC警报</td><td>驻波比或 ALC 超出安全值时显示警告；关闭时显示为「不提示SWR/ALC警报」</td></tr>
      <tr><td>接收音频增益</td><td>在 App 内把收到的音频放大或缩小。电台本身的输出电平调不动时特别有用——例如 QMX 这类纯数字机的 USB 音频是固定的，ICOM 的 USB 音量则藏在 SET 菜单里而不是 AF 旋钮</td></tr>
    </table>`,

  set_services_title: '上传至第三方',
  set_services_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>自动上传至 QRZ.com</td><td>把完成的通联实时送进 QRZ.com 日志簿</td></tr>
      <tr><td>QRZ.com API 密钥</td><td>在 QRZ.com 的 Logbook 设置中取得；旁边的<strong>测试连接</strong>可先确认密钥有效</td></tr>
      <tr><td>手动上传</td><td>选定日期范围后批量补传既有的通联记录</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>服务器地址、API 密钥与站点 ID，并可测试连接，详见<a href="third-party.html">「第三方服务」</a></td></tr>
      <tr><td>上报信号到 PSK Reporter</td><td>把收听报告匿名提交到全球传播地图，不需账号</td></tr>
      <tr><td>天线信息</td><td>上报给 PSK Reporter 的天线型号描述（例如 <code>Dipole</code>、<code>Vertical</code>），纯粹是给地图看的说明文字，<strong>不会</strong>切换电台的天线端口</td></tr>
      <tr><td>FREE TEXT</td><td>预先写好的一段自由文本。长按呼叫界面的 CQ 按钮进入自由文本模式时会自动带入，方便通报 SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'SOTA / POTA 出勤',
  set_activation_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>出勤模式（将编号写入记录）</td><td>开启后，每笔通联都会自动把您的 SOTA／POTA 编号写进日志</td></tr>
      <tr><td>我的 SOTA</td><td>您正在启动的山峰编号，例如 <code>BV/TP-001</code></td></tr>
      <tr><td>我的 POTA</td><td>您正在启动的公园编号，例如 <code>TW-0001</code>。输入后下方会显示查到的园区名称与网格，可据以确认编号没打错</td></tr>
      <tr><td>＋ 新增园区</td><td>同一个地点常同时落在多个园区（n-fer），最多可填 <strong>6 组</strong>，满了之后按钮会停用。每一行都有各自的删除按钮</td></tr>
    </table>
    <p>填了两座以上的公园时，导出会自动改为<strong>每座公园一份 ADIF、打包成一个 ZIP</strong>——POTA 官方的 n-fer 惯例就是一座公园一份 log 分开上传，把多个编号串在同一个字段里上传系统不会收。只有一座公园时维持单文件导出。</p>`,

  set_display_title: '显示与外观',
  set_display_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>主题模式</td><td>设备设置、浅色或深色</td></tr>
      <tr><td>消息模式</td><td>解码列表采<strong>标准</strong>（每行完整信息）或<strong>精简</strong>（单行精简）版面</td></tr>
      <tr><td>列表字体大小</td><td>解码与日志列表的文字大小</td></tr>
      <tr><td>防止屏幕关闭</td><td>操作中防止屏幕自动熄灭</td></tr>
      <tr><td>解码／呼叫界面显示小瀑布图</td><td>在两个分页各显示一条精简瀑布图，两者为独立开关</td></tr>
      <tr><td>瀑布图色阶</td><td>频谱／瀑布图采经典色阶或彩虹色阶</td></tr>
      <tr><td>通联成功：画面闪烁／水波纹／闪光灯闪烁／显示对方 QRZ 照片</td><td>四种各自独立的完成提示，详见<a href="logging.html">「通联日志」</a></td></tr>
      <tr><td>显示悬浮窗口</td><td>悬浮快捷菜单的总开关</td></tr>
      <tr><td>悬浮窗口的各个按钮</td><td>隐藏底部菜单、频率调整、音量调整、网格追踪、电台工具、WSPR 信标、JS8 聊天、快速切换模式，共八个各自可独立显示或隐藏</td></tr>
      <tr><td>语言</td><td>界面语言，与系统语言各自独立</td></tr>
    </table>`,

  set_backup_title: '备份与还原',
  set_backup_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>启动时自动备份</td><td>App 启动时自动备份日志数据库</td></tr>
      <tr><td>周期（天）</td><td>距离下一次自动备份要等多久</td></tr>
      <tr><td>保留代数</td><td>保留几份旧备份，超过的份数会从最旧的开始删除</td></tr>
      <tr><td>选择备份文件夹</td><td>指定备份文件的存放位置；选一个有云同步的文件夹，备份就同时离开了手机</td></tr>
      <tr><td>立即备份／还原备份</td><td>马上备份一份，或浏览并还原此前的备份</td></tr>
      <tr><td>清空缓存</td><td>分别清掉<strong>关注的呼号</strong>、<strong>解码的消息</strong>与 <strong>SWL记录</strong></td></tr>
      <tr><td>清除暂存档</td><td>删除日志分享产生的临时文件</td></tr>
      <tr><td>清除通联次数</td><td>重置本次运行的通联计数器</td></tr>
    </table>`,

  set_advanced_title: '高级与开发者',
  set_advanced_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>音频设备</td><td>显示目前实际在收哪一个设备（内置麦克风或 USB 声卡）及其采样率。若检测到 USB 音频却无法把录音导过去，这里会直接讲明「实际仍在收内置麦克风」，不必自己猜</td></tr>
      <tr><td>重新检测</td><td>插上 USB 声卡（例如 Digirig）之后按一下即可改用它，不必重开 App。多数情况下 App 会自动检测到插拔，这个按钮是自动检测不管用时的后路</td></tr>
      <tr><td>开发者 API（供插件使用）</td><td>在手机上开一个只读／可控制的 HTTP 接口，让同一个网络上的其他程序读取解码结果、通联记录与频谱。开启后会显示访问网址</td></tr>
      <tr><td>只读 Token</td><td>只能读数据的凭证，可<strong>复制</strong>或<strong>重新生成</strong></td></tr>
      <tr><td>完整权限 Token</td><td>可以控制 App 的凭证，<strong>请勿外流</strong>。同样可复制或重新生成；重新生成后旧的立即失效</td></tr>
      <tr><td>允许远程控制发射</td><td>开启后，持有完整权限 Token 的程序可以从其他设备开始与停止发射。不需要远程发射就让它保持关闭</td></tr>
    </table>`,
},

'ja': {
  set_title: '設定リファレンス',

  set_profile_title: 'プロファイル',
  set_profile_text:  '設定は名前を付けた複数のプロファイルとして保存でき、ワンステップで切り替えられます。シャックの固定機、ポータブル機、クラブ局のように接続方式・ボーレート・CI-V アドレスがそれぞれ違う場合に便利です。プロファイル行は設定のトップページと各サブページの最上部に常に表示されます。左のドロップダウンでプロファイルを切り替え、右の 3 つのアイコンはそれぞれ <strong>＋</strong>（追加）、<strong>鉛筆</strong>（名前の変更）、<strong>ゴミ箱</strong>（削除）です。削除時には確認が表示されます。制限は<strong>少なくとも 1 つ残す</strong>ことだけで、1 つしかない場合は削除できません。',
  set_profile_note: 'すべての設定がプロファイルに属するわけではありません。属する項目はアプリ上で左端に<strong>紫色の帯</strong>が付きます。帯のない項目は全プロファイル共通です。',

  set_profile_caption: 'どのページの最上部にもあるプロファイル行。ドロップダウンでプロファイルを切り替え、右の 3 つのアイコンは追加・名前の変更・削除です。左端に紫色の帯がある項目（自局コール、自局GL、運用バンド）はプロファイルごとに保存され、帯のない「時刻ずれ」は全プロファイル共通です。（スクリーンショットは英語表示のものです。）',

  set_menu_title: '8 つの設定グループ',
  set_menu_text:  '設定は延々と続く 1 本のリストではなくなり、8 つのグループに分かれてそれぞれ独立したページになりました。設定のトップページでグループをタップすると開きます。サブページの上部には同じプロファイル行が残り、その下の<strong>設定メニューに戻る</strong>でグループ一覧に戻れます。トップページの下部には<strong>About</strong>、<strong>DEBUG</strong>、<strong>報告</strong>の 3 つのボタンと、寄付についての説明もあります。',
  set_menu_list: `
    <ul>
      <li><strong>基本情報</strong> — コールサイン、グリッド、時刻、バンドとモード</li>
      <li><strong>自動交信</strong> — CQ への自動応答の方式と各種の送信制限</li>
      <li><strong>無線機と音声</strong> — リグ、接続パラメーター、PTT、音声フォーマット</li>
      <li><strong>外部サービスへアップロード</strong> — QRZ.com、Cloudlog / Wavelog、PSK Reporter</li>
      <li><strong>SOTA / POTA 運用</strong> — 自分が運用する山岳・公園の参照番号</li>
      <li><strong>表示とテーマ</strong> — テーマ、文字サイズ、ウォーターフォール、交信成功の通知、フローティングウィンドウ</li>
      <li><strong>バックアップと復元</strong> — ログデータベースの自動バックアップとキャッシュの削除</li>
      <li><strong>詳細設定と開発者</strong> — オーディオデバイスと開発者 API</li>
    </ul>
    <p>以下はアプリと同じ順序で説明します。多くの項目の右側にある <strong>ⓘ</strong> アイコンをタップすると、その項目についてのアプリ内ヘルプが表示されます。</p>`,

  set_station_title: '基本情報',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>自局コール</td><td>自局のコールサイン。送信する前に必ず入力してください</td></tr>
      <tr><td>CQ指定</td><td>CQ に付けられる修飾語のリストを編集します（DX、EU、TEST…）</td></tr>
      <tr><td>自局GL</td><td>Maidenhead ロケーター。横の位置アイコンで端末の測位から入力できます</td></tr>
      <tr><td>測位精度</td><td><code>Low</code>／<code>Medium</code>／<code>High</code>／<code>Ultra High</code> がそれぞれ 4／6／8／10 桁のグリッドに対応します。測位から入力するときに何桁取るかだけに影響します</td></tr>
      <tr><td>時刻ずれ</td><td>時計の手動補正（秒）</td></tr>
      <tr><td>同期する</td><td>インターネットの時刻サーバーで時計を合わせます</td></tr>
      <tr><td>運用バンド</td><td>現在運用しているバンドと周波数。先頭に <code>*</code> が付いているものは、周波数テーブルで「よく使う」に設定された周波数です</td></tr>
      <tr><td>周波数テーブル</td><td>アプリが提示するバンド／周波数の対応表を編集します。追加・変更・よく使う (*) の設定のほか、内蔵の既定値に戻すこともできます。モードごとに 1 つずつあります</td></tr>
      <tr><td>FT8/FT4/FT2 モード</td><td>3 つのモードを切り替えます。切り替えると無線機もそのモードの周波数へ自動的に移動するので、周波数を選び直す必要はありません</td></tr>
      <tr><td>デコードモード</td><td><code>Fast</code>（高速）／<code>Standard</code>（バランス、既定）／<code>Deep</code>（微弱信号向け）。後ろのものほど時間はかかりますが、より弱い信号を拾えます</td></tr>
    </table>`,

  set_op_title: '自動交信',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>SWLメッセージを保存しない</td><td>デコードしたメッセージをデータベースに保存せず、ストレージを節約します</td></tr>
      <tr><td>SWL QSOを保存しない</td><td>他局同士の交信を傍受しても記録しません</td></tr>
      <tr><td>CQを追跡する</td><td>マスタースイッチ。オフのときは「CQを追跡しない」と表示されます</td></tr>
      <tr><td>CQ応答方式</td><td>自動応答のときにどの局を優先するか。選択肢は<a href="operating.html">「FT8 / FT4 の運用」</a>で説明しています</td></tr>
      <tr><td>交信済みを除外</td><td>選んだ期間内に交信済みの局を飛ばします。<strong>オフ</strong>、<strong>すべて</strong>、<strong>1／4／8 時間</strong>、<strong>今日</strong>、<strong>30 日</strong>、<strong>365 日</strong>から選べます</td></tr>
      <tr><td>交信済み局を表示（取り消し線）</td><td>交信済みの局もリストに残し、取り消し線を付けて表示します</td></tr>
      <tr><td>フォロー局</td><td>見逃したくないコールサイン。現れたらすぐ気付けます</td></tr>
      <tr><td>除外プリフィックス</td><td>自動応答が決して応答しないプリフィックス</td></tr>
      <tr><td>送信ウォッチドッグ</td><td>設定した分数が過ぎたら自動的に送信を止めます（0 = 無効）</td></tr>
      <tr><td>応答なし</td><td>N 回続けて応答がなければ呼出を打ち切り、別の相手を探します</td></tr>
      <tr><td>73の再送（最大）</td><td>交信の最後に相手がもう一度呼んできた場合、RR73 を最大 N 回まで再送します（0 = 無効）</td></tr>
      <tr><td>コンテストモード（グリッド交換）</td><td>シグナルレポートの代わりに <code>R</code> ＋ 自局のグリッドを送ります。詳しくは<a href="operating.html">「FT8 / FT4 の運用」</a></td></tr>
    </table>`,

  set_radio_title: '無線機と音声',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>リグ</td><td>お使いの無線機の機種。どの CAT コマンド一式を使うかがこれで決まります</td></tr>
      <tr><td>PTT方法</td><td>PTT をどう制御するか：VOX / CAT / RTS / DTR</td></tr>
      <tr><td>接続方式</td><td>USB、Bluetooth、ネットワーク</td></tr>
      <tr><td>Data bit / Parity / Stop bits</td><td>シリアルのフレーム形式。無線機の取扱説明書に指定がなければ<strong>デフォルト設定</strong>で戻せます</td></tr>
      <tr><td>CI-V</td><td>ICOM の CI-V アドレス（ICOM 機のみ）</td></tr>
      <tr><td>ボーレート</td><td>CAT のシリアル速度。無線機側の設定と一致させます</td></tr>
      <tr><td>送信遅延<em>（非推奨）</em></td><td>音声出力のタイミング補正（ミリ秒）。アプリ上で非推奨と表示されており、触る必要はありません</td></tr>
      <tr><td>PTT遅延</td><td>PTT を入れてから音声を出すまでの待ち時間（ミリ秒）。無線機の送信切替が遅い場合は大きくします</td></tr>
      <tr><td>既定Hz</td><td>送信音声の既定の周波数（0〜2900 Hz）</td></tr>
      <tr><td>TX=RX固定／スプリット</td><td>同じスイッチの 2 つの状態です。オンなら送信周波数が相手の受信周波数に追従し、オフなら送信と受信がそれぞれ別の周波数を使います</td></tr>
      <tr><td>ビット深度</td><td>16 ビット整数または 32 ビット浮動小数の音声出力</td></tr>
      <tr><td>サンプルレート</td><td>12 kHz（既定）、24 kHz、48 kHz</td></tr>
      <tr><td>SWR/ALC警報</td><td>SWR または ALC が安全な範囲を超えたときに警告します。オフのときは「(X) SWR/ALC警報なし」と表示されます</td></tr>
      <tr><td>受信音声ゲイン</td><td>受信した音声をアプリ内で大きく／小さくします。無線機側の出力レベルを変えられないときに便利です。たとえば QMX のようなデジタル機の USB 音声は固定で、ICOM の USB レベルは AF つまみではなくセットメニューの中にあります</td></tr>
    </table>`,

  set_services_title: '外部サービスへアップロード',
  set_services_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>QRZ.comへ自動アップロード</td><td>完了した交信をそのまま QRZ.com のログブックへ送ります</td></tr>
      <tr><td>api_key</td><td>QRZ.com の Logbook 設定で取得します。横の<strong>接続テスト</strong>でキーが有効か確認できます</td></tr>
      <tr><td>手動アップロード</td><td>日付範囲を指定して、既存のログをまとめて送ります</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>サーバーアドレス、APIキー、ステーションID と接続テスト。詳しくは<a href="third-party.html">「外部サービス連携」</a></td></tr>
      <tr><td>PSK Reporterへ送信</td><td>受信レポートを匿名で伝搬マップへ送ります。アカウントは不要です</td></tr>
      <tr><td>アンテナ情報</td><td>PSK Reporter へ一緒に送るアンテナ型式の説明（<code>Dipole</code>、<code>Vertical</code> など）。マップに表示するための文字列であり、無線機のアンテナ端子を切り替えるものでは<strong>ありません</strong></td></tr>
      <tr><td>FREE TEXT</td><td>あらかじめ用意しておくフリーテキスト。コール画面の CQ ボタンを長押ししてフリーテキストモードに入ると自動的に入力され、SOTAmat への通知に便利です</td></tr>
    </table>`,

  set_activation_title: 'SOTA / POTA 運用',
  set_activation_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>運用モード（参照番号をログに記録）</td><td>オンにすると、交信するたびに自局の SOTA／POTA 参照番号がログに書き込まれます</td></tr>
      <tr><td>自局 SOTA</td><td>運用中の山岳の参照番号。例：<code>BV/TP-001</code></td></tr>
      <tr><td>自局 POTA</td><td>運用中の公園の参照番号。例：<code>TW-0001</code>。入力すると公園名とグリッドが下に表示されるので、番号の打ち間違いを確認できます</td></tr>
      <tr><td>＋ 公園を追加</td><td>同じ場所が複数の公園に重なっていること（n-fer）はよくあります。最大 <strong>6 件</strong>まで入力でき、上限に達するとボタンは無効になります。各行に削除ボタンがあります</td></tr>
    </table>
    <p>公園を 2 つ以上入力すると、エクスポートは<strong>公園ごとに ADIF を 1 つ作り、まとめて ZIP にする</strong>方式へ自動的に切り替わります。POTA の n-fer の慣習は公園ごとにログを分けてアップロードすることで、複数の参照番号を 1 つの項目に詰め込んだものは受け付けられません。公園が 1 つだけのときは、これまでどおり単一ファイルで出力されます。</p>`,

  set_display_title: '表示とテーマ',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>テーマ</td><td>端末の設定、ライト、ダーク</td></tr>
      <tr><td>表示</td><td>デコード一覧を<strong>標準表示</strong>（1 行に全情報）または<strong>簡易表示</strong>（1 行にまとめる）で表示します</td></tr>
      <tr><td>リストの文字サイズ</td><td>デコードとログの一覧の文字の大きさ</td></tr>
      <tr><td>画面を常時オン</td><td>運用中に画面が自動で消えないようにします</td></tr>
      <tr><td>デコード／コール画面にミニウォーターフォール表示</td><td>2 つのタブにそれぞれ簡易ウォーターフォールを表示します。互いに独立したスイッチです</td></tr>
      <tr><td>ウォーターフォール配色</td><td>スペクトラム／ウォーターフォールをクラシックまたはレインボーの配色で表示します</td></tr>
      <tr><td>交信成功：画面フラッシュ／波紋エフェクト／ライト点滅／QRZ写真を表示</td><td>交信完了を知らせる 4 種類の独立した方法。詳しくは<a href="logging.html">「交信ログ」</a></td></tr>
      <tr><td>フローティングウィンドウを表示</td><td>フローティングのショートカットメニュー全体のスイッチ</td></tr>
      <tr><td>フローティングウィンドウの各ボタン</td><td>下部メニューを非表示、周波数調整、音量調整、グリッドトラッカー、無線機ツール、WSPR ビーコン、JS8チャット、クイックモード切替の 8 つを、それぞれ個別に表示／非表示できます</td></tr>
      <tr><td>言語</td><td>アプリの表示言語。システムの言語とは別に設定できます</td></tr>
    </table>`,

  set_backup_title: 'バックアップと復元',
  set_backup_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>起動時に自動バックアップ</td><td>アプリの起動時にログデータベースを自動でバックアップします</td></tr>
      <tr><td>周期（日）</td><td>次の自動バックアップまでの間隔</td></tr>
      <tr><td>保存世代数</td><td>古いバックアップをいくつ残すか。これを超えた分は古い順に削除されます</td></tr>
      <tr><td>バックアップ先を選択</td><td>バックアップファイルの保存場所。クラウド同期されるフォルダーを選べば、バックアップが端末の外にも残ります</td></tr>
      <tr><td>今すぐバックアップ／復元</td><td>すぐに 1 つ取るか、以前のバックアップを選んで復元します</td></tr>
      <tr><td>キャッシュを削除</td><td><strong>フォロー局</strong>、<strong>キャッシュされたログ</strong>、<strong>デコードされたQSO</strong>をそれぞれ個別に削除します</td></tr>
      <tr><td>一時ファイルを削除</td><td>ログ共有で作られた一時ファイルを削除します</td></tr>
      <tr><td>QSO数をクリア</td><td>今回の運用の交信カウンターをリセットします</td></tr>
    </table>`,

  set_advanced_title: '詳細設定と開発者',
  set_advanced_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>オーディオデバイス</td><td>実際にどのデバイス（内蔵マイクか USB サウンドカード）から録音しているか、そのサンプルレートとともに表示します。USB オーディオを見つけたのに録音をそちらへ回せなかった場合は、「実際には内蔵マイクから録音している」とはっきり表示されるので、推測する必要はありません</td></tr>
      <tr><td>再検出</td><td>USB サウンドカード（Digirig など）を接続したあとにタップすれば、アプリを再起動せずに切り替わります。抜き差しは通常自動で検出されるので、これは自動検出がうまくいかないときの手段です</td></tr>
      <tr><td>開発者 API（アドオン用）</td><td>端末上に読み取り／制御用の HTTP インターフェースを開き、同じネットワーク上の他のプログラムからデコード結果・交信ログ・スペクトラムを読めるようにします。オンにするとアクセス用のアドレスが表示されます</td></tr>
      <tr><td>読み取り専用トークン</td><td>読み取りだけができる資格情報。<strong>コピー</strong>と<strong>再生成</strong>ができます</td></tr>
      <tr><td>フルアクセストークン</td><td>アプリを操作できる資格情報です。<strong>他人に渡さないでください。</strong>同様にコピー・再生成でき、再生成すると古いものは直ちに無効になります</td></tr>
      <tr><td>送信のリモート操作を許可</td><td>オンにすると、フルアクセストークンを持つプログラムが別の端末から送信を開始・停止できます。リモート送信が不要ならオフのままにしてください</td></tr>
    </table>`,
},

'ru': {
  set_title: 'Описание настроек',

  set_profile_title: 'Профили',
  set_profile_text:  'Настройки можно хранить в виде нескольких именованных профилей и переключать одним движением — это удобно, когда вы переходите между домашним трансивером, портативной радиостанцией и коллективной станцией, у каждой из которых свой тип подключения, скорость порта и адрес CI-V. Строка профиля находится вверху главной страницы настроек и каждой вложенной страницы: выпадающий список слева переключает профиль, а три значка справа — это <strong>＋</strong> (добавить), <strong>карандаш</strong> (переименовать) и <strong>корзина</strong> (удалить). Перед удалением запрашивается подтверждение; единственное ограничение — <strong>хотя бы один профиль должен остаться</strong>.',
  set_profile_note: 'Не все настройки принадлежат профилю. Те, что принадлежат, отмечены в приложении <strong>фиолетовой полосой</strong> по левому краю; всё остальное общее для всех профилей.',

  set_profile_caption: 'Строка профиля вверху каждой страницы: выпадающий список переключает профиль, а три значка добавляют, переименовывают и удаляют его. Строки с фиолетовой полосой слева (позывной, квадрат, частота) следуют за профилем; у «Смещения» полосы нет, значит оно общее для всех профилей. (На снимке экрана — интерфейс на английском.)',

  set_menu_title: 'Восемь групп настроек',
  set_menu_text:  'Настройки больше не представляют собой один бесконечный список: они разделены на восемь групп, каждая на своей странице. Нажмите на группу на главной странице настроек, чтобы открыть её; вверху каждой вложенной страницы остаётся та же строка профиля, а под ней — <strong>К меню настроек</strong>. Внизу главной страницы также находятся кнопки <strong>О программе</strong>, <strong>DEBUG</strong> и <strong>Сообщить</strong>.',
  set_menu_list: `
    <ul>
      <li><strong>Основные сведения</strong> — позывной, квадрат, время, диапазон и режим</li>
      <li><strong>Автоматическая связь</strong> — стратегия автоответа и ограничения передачи</li>
      <li><strong>Трансивер и звук</strong> — модель трансивера, параметры связи, PTT и формат звука</li>
      <li><strong>Выгрузка в сервисы</strong> — QRZ.com, Cloudlog / Wavelog и PSK Reporter</li>
      <li><strong>Активация SOTA / POTA</strong> — ваши собственные ссылки на вершину и парк</li>
      <li><strong>Экран и оформление</strong> — тема, размер текста, водопад, оповещения о QSO и плавающее окно</li>
      <li><strong>Резервное копирование</strong> — автоматические копии базы журнала и очистка кэша</li>
      <li><strong>Дополнительно и разработка</strong> — аудиоустройство и API для разработчиков</li>
    </ul>
    <p>Ниже всё описано в том же порядке, что и в приложении. У многих строк справа есть значок <strong>ⓘ</strong> — это встроенная справка по конкретной настройке.</p>`,

  set_station_title: 'Основные сведения',
  set_station_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Позывной</td><td>Ваш любительский позывной; без него передача невозможна</td></tr>
      <tr><td>CQ цель</td><td>Список модификаторов, которые можно добавлять к вашему CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Квадрат</td><td>Ваш локатор Maidenhead. Значок геопозиции рядом заполняет его по местоположению телефона</td></tr>
      <tr><td>Точность определения</td><td><code>Low</code> / <code>Medium</code> / <code>High</code> / <code>Ultra High</code> дают локатор из 4 / 6 / 8 / 10 знаков. Влияет только на то, сколько знаков берётся при заполнении по местоположению</td></tr>
      <tr><td>Смещение</td><td>Ручная поправка часов в секундах</td></tr>
      <tr><td>Синхр.</td><td>Синхронизация часов с сервером точного времени</td></tr>
      <tr><td>Частота</td><td>Диапазон и частота, на которой вы работаете. Знак <code>*</code> в начале отмечает частоту, помеченную в таблице частот как часто используемая</td></tr>
      <tr><td>Таблица частот</td><td>Редактирование таблицы диапазонов и частот: добавление, изменение, отметка «часто используемая» (*) или сброс всей таблицы к встроенным значениям. Для каждого режима своя таблица</td></tr>
      <tr><td>Режим FT8/FT4/FT2</td><td>Переключение между тремя режимами. Трансивер сам перестраивается на частоту нового режима — выбирать её заново не нужно</td></tr>
      <tr><td>Режим декод.</td><td><code>Fast</code> (быстро) / <code>Standard</code> (сбалансированно, по умолчанию) / <code>Deep</code> (для слабых сигналов). Каждый следующий работает дольше, но вытаскивает более слабые сигналы</td></tr>
    </table>`,

  set_op_title: 'Автоматическая связь',
  set_op_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Не сохранять декод. SWL</td><td>Не записывать декодированные сообщения в базу, экономя место</td></tr>
      <tr><td>Не сохранять QSO для SWL</td><td>Не заносить в журнал услышанные QSO других станций</td></tr>
      <tr><td>Авто-ответ CQ</td><td>Главный выключатель. В выключенном состоянии подпись меняется на «не отвечать на CQ»</td></tr>
      <tr><td>Способ ответа на CQ</td><td>Какой станции отдавать предпочтение при автоответе; варианты описаны в разделе <a href="operating.html">«Работа в FT8 / FT4»</a></td></tr>
      <tr><td>Исключить QSO</td><td>Пропускать станции, отработанные в выбранном интервале: <strong>выкл.</strong>, <strong>все</strong>, <strong>1 / 4 / 8 часов</strong>, <strong>сегодня</strong>, <strong>30 дней</strong> или <strong>365 дней</strong></td></tr>
      <tr><td>Показывать отработанные станции (зачёркнуто)</td><td>Отработанные станции остаются в списке и показываются зачёркнутыми</td></tr>
      <tr><td>Позывные для наблюдения</td><td>Позывные, которые нужно держать на виду, чтобы не пропустить их появление</td></tr>
      <tr><td>Искл. префиксы</td><td>Префиксы, на которые автоматика никогда не отвечает</td></tr>
      <tr><td>Контроль TX</td><td>Автоматически прекращать передачу через заданное число минут (0 = выключено)</td></tr>
      <tr><td>Нет ответа</td><td>После N циклов без ответа прекратить вызов и искать другого корреспондента</td></tr>
      <tr><td>Повторов 73 (макс.)</td><td>Если в конце QSO корреспондент вызывает снова, повторить RR73 не более N раз (0 = выключено)</td></tr>
      <tr><td>Режим соревнований (обмен локаторами)</td><td>Передавать <code>R</code> + свой локатор вместо рапорта; см. <a href="operating.html">«Работа в FT8 / FT4»</a></td></tr>
    </table>`,

  set_radio_title: 'Трансивер и звук',
  set_radio_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Трансивер</td><td>Модель вашего трансивера; от неё зависит, какой набор команд CAT использует приложение</td></tr>
      <tr><td>Управление</td><td>Как включается PTT: VOX / CAT / RTS / DTR</td></tr>
      <tr><td>Тип подключения</td><td>Кабель (USB), Bluetooth или сеть</td></tr>
      <tr><td>Биты данных / Чётность / Стоп-биты</td><td>Формат кадра последовательного порта; если в инструкции к трансиверу не сказано иное, кнопка <strong>По умолч.</strong> вернёт исходные значения</td></tr>
      <tr><td>CI-V</td><td>Адрес шины CI-V (только для трансиверов ICOM)</td></tr>
      <tr><td>Скорость (бод)</td><td>Скорость последовательного порта CAT; должна совпадать с настройкой трансивера</td></tr>
      <tr><td>Задержка TX <em>(устар.)</em></td><td>Компенсация задержки вывода звука (мс); приложение помечает её как устаревшую, менять не нужно</td></tr>
      <tr><td>Задержка PTT</td><td>Сколько миллисекунд ждать после включения PTT перед подачей звука. Увеличьте, если трансивер медленно переходит на передачу</td></tr>
      <tr><td>Ауд. Гц</td><td>Частота звука передачи по умолчанию (0–2900 Гц)</td></tr>
      <tr><td>Блок. TX=RX / Tx/Rx разд.</td><td>Два состояния одного переключателя: включено — частота передачи следует за частотой корреспондента; выключено — приём и передача используют разные частоты</td></tr>
      <tr><td>Разрядность</td><td>16-битный целочисленный или 32-битный вещественный вывод звука</td></tr>
      <tr><td>Частота дискретизации</td><td>12 кГц (по умолчанию), 24 кГц или 48 кГц</td></tr>
      <tr><td>Оповещение КСВ/ALC</td><td>Предупреждать, когда КСВ или ALC выходят за безопасные пределы; в выключенном состоянии подпись «(X) Без оповещения КСВ/ALC»</td></tr>
      <tr><td>Усиление принимаемого звука</td><td>Усилить или ослабить принятый звук внутри приложения. Полезно, когда уровень выхода самого трансивера изменить нельзя: у QMX уровень по USB фиксирован, а у ICOM он находится в меню SET, а не на ручке AF</td></tr>
    </table>`,

  set_services_title: 'Выгрузка в сервисы',
  set_services_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Авто-загрузка в QRZ.com</td><td>Отправлять завершённые QSO прямо в ваш журнал на QRZ.com</td></tr>
      <tr><td>API-ключ QRZ.com</td><td>Берётся в настройках Logbook на QRZ.com; кнопка <strong>Тест</strong> рядом проверяет, что ключ работает</td></tr>
      <tr><td>Загрузить</td><td>Пакетная отправка уже имеющихся записей за выбранный период</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Адрес сервера, API-ключ и ID станции, а также проверка связи; см. <a href="third-party.html">«Внешние сервисы»</a></td></tr>
      <tr><td>Спот в PSK Reporter</td><td>Анонимная отправка отчётов о приёме на карту прохождения; учётная запись не нужна</td></tr>
      <tr><td>Антенна</td><td>Описание вашей антенны (<code>Dipole</code>, <code>Vertical</code>…), передаваемое вместе со спотами PSK Reporter. Это только текст для карты, он <strong>не</strong> переключает антенные разъёмы трансивера</td></tr>
      <tr><td>FREE TEXT</td><td>Заранее подготовленный произвольный текст. Долгое нажатие на кнопку CQ на вкладке вызова переводит в режим произвольного текста и подставляет его — удобно для SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'Активация SOTA / POTA',
  set_activation_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Режим активации (запись в лог)</td><td>Когда включён, ваша ссылка SOTA / POTA записывается в каждое QSO</td></tr>
      <tr><td>Мой SOTA</td><td>Вершина, которую вы активируете, например <code>BV/TP-001</code></td></tr>
      <tr><td>Мой POTA</td><td>Парк, который вы активируете, например <code>TW-0001</code>. Название парка и локатор показываются ниже, так что ссылку можно проверить</td></tr>
      <tr><td>+ Добавить парк</td><td>Одна точка часто относится сразу к нескольким паркам (n-fer). Можно ввести до <strong>6</strong>; у каждой строки своя кнопка удаления</td></tr>
    </table>
    <p>Если введено два парка и больше, экспорт автоматически переключается на <strong>один ADIF на парк, упакованные в ZIP</strong>: по принятой в POTA практике на каждый парк загружается отдельный журнал, а несколько ссылок в одном поле приняты не будут. Для одного парка экспорт остаётся одним файлом.</p>`,

  set_display_title: 'Экран и оформление',
  set_display_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Тема</td><td>Как на устройстве, светлая или тёмная</td></tr>
      <tr><td>Режим сообщений</td><td>Список декодирования в виде <strong>Стандартный</strong> (полная информация в строке) или <strong>Простой</strong> (одна компактная строка)</td></tr>
      <tr><td>Размер шрифта списка</td><td>Размер текста в списках декодирования и журнала</td></tr>
      <tr><td>Не гасить экран</td><td>Не давать экрану гаснуть во время работы</td></tr>
      <tr><td>Мини-водопад на экранах Декод. / Вызов</td><td>Показывать компактную полосу водопада на обеих вкладках; два независимых переключателя</td></tr>
      <tr><td>Цветовая схема водопада</td><td>Классическая или радужная раскраска спектра и водопада</td></tr>
      <tr><td>Успешное QSO: вспышка экрана / волны / фонарик / фото QRZ</td><td>Четыре независимых способа сообщить о завершённом QSO; см. <a href="logging.html">«Аппаратный журнал»</a></td></tr>
      <tr><td>Показать плавающее окно</td><td>Общий выключатель плавающего меню быстрого доступа</td></tr>
      <tr><td>Отдельные кнопки плавающего окна</td><td>Скрыть нижнее меню, частота, громкость, карта локаторов, инструменты трансивера, маяк WSPR, чат JS8 и быстрая смена режима — восемь кнопок, каждая показывается или скрывается независимо</td></tr>
      <tr><td>Язык</td><td>Язык интерфейса, независимо от языка системы</td></tr>
    </table>`,

  set_backup_title: 'Резервное копирование',
  set_backup_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Автобэкап при запуске</td><td>Создавать резервную копию базы журнала при запуске приложения</td></tr>
      <tr><td>Интервал (дни)</td><td>Через сколько дней делать следующую автоматическую копию</td></tr>
      <tr><td>Хранить копий</td><td>Сколько старых копий сохранять; лишние удаляются, начиная с самых старых</td></tr>
      <tr><td>Выбрать папку для резервных копий</td><td>Где хранить файлы копий; выберите папку с облачной синхронизацией, и копия сразу окажется вне телефона</td></tr>
      <tr><td>Резервное копирование сейчас / Восстановить резервную копию</td><td>Сделать копию немедленно или выбрать и восстановить более раннюю</td></tr>
      <tr><td>Очистить кэш</td><td>Отдельно очистить <strong>позывные для наблюдения</strong>, <strong>декод. сообщ.</strong> и <strong>декодировано QSO</strong></td></tr>
      <tr><td>Удалить врем. файлы</td><td>Удалить временные файлы, созданные при отправке журнала</td></tr>
      <tr><td>Сброс QSO</td><td>Обнулить счётчик QSO текущей сессии</td></tr>
    </table>`,

  set_advanced_title: 'Дополнительно и разработка',
  set_advanced_table: `
    <table>
      <tr><th>Настройка</th><th>Описание</th></tr>
      <tr><td>Аудиоустройство</td><td>Показывает, с какого устройства на самом деле идёт запись (встроенный микрофон или звуковая карта USB) и с какой частотой дискретизации. Если устройство USB найдено, но переключить на него запись не удалось, здесь прямо написано, что запись по-прежнему идёт со встроенного микрофона</td></tr>
      <tr><td>Определить заново</td><td>Нажмите после подключения звуковой карты USB (например, Digirig), чтобы перейти на неё без перезапуска приложения. Обычно подключение определяется автоматически; эта кнопка — запасной вариант</td></tr>
      <tr><td>API для разработчиков</td><td>Открывает на телефоне HTTP-интерфейс, чтобы другие программы в той же сети могли читать декодированные сообщения, журнал и спектр. После включения показывается адрес доступа</td></tr>
      <tr><td>Токен только для чтения</td><td>Учётные данные только для чтения; можно <strong>копировать</strong> и <strong>создать заново</strong></td></tr>
      <tr><td>Токен полного доступа</td><td>Учётные данные, позволяющие управлять приложением — <strong>не передавайте его</strong>. После повторного создания старый перестаёт работать немедленно</td></tr>
      <tr><td>Разрешить удалённое управление передачей</td><td>Позволяет программе с токеном полного доступа начинать и останавливать передачу с другого устройства. Если удалённая передача не нужна, оставьте выключенным</td></tr>
    </table>`,
},

'pl': {
  set_title: 'Opis ustawień',

  set_profile_title: 'Profile',
  set_profile_text:  'Ustawienia można przechowywać jako kilka nazwanych profili i przełączać jednym ruchem — przydaje się, gdy pracujesz na przemian na radiu domowym, przenośnym i klubowym, a każde z nich ma inny typ połączenia, prędkość transmisji i adres CI-V. Wiersz profilu znajduje się u góry strony głównej ustawień oraz każdej podstrony: lista rozwijana po lewej przełącza profil, a trzy ikony po prawej to <strong>＋</strong> (dodaj), <strong>ołówek</strong> (zmień nazwę) i <strong>kosz</strong> (usuń). Usunięcie wymaga potwierdzenia; jedyne ograniczenie to <strong>pozostawienie co najmniej jednego profilu</strong>.',
  set_profile_note: 'Nie każde ustawienie należy do profilu. Te, które należą, są w aplikacji oznaczone <strong>fioletowym paskiem</strong> przy lewej krawędzi; wszystko bez paska jest wspólne dla wszystkich profili.',

  set_profile_caption: 'Wiersz profilu widoczny u góry każdej strony: lista rozwijana przełącza profil, a trzy ikony dodają, zmieniają nazwę i usuwają. Wiersze z fioletowym paskiem po lewej (znak, kwadrat siatki, częstotliwość) podążają za profilem; „Przesunięcie czasu" paska nie ma, więc jest wspólne dla wszystkich profili. (Zrzut ekranu przedstawia interfejs w języku angielskim.)',

  set_menu_title: 'Osiem grup ustawień',
  set_menu_text:  'Ustawienia nie są już jedną niekończącą się listą: podzielono je na osiem grup, każda na własnej stronie. Dotknij grupy na stronie głównej ustawień, aby ją otworzyć; u góry każdej podstrony pozostaje ten sam wiersz profilu, a pod nim <strong>Powrót do menu ustawień</strong>. Na dole strony głównej znajdują się także przyciski <strong>O programie</strong>, <strong>DEBUG</strong> i <strong>Zgłoś</strong>.',
  set_menu_list: `
    <ul>
      <li><strong>Informacje podstawowe</strong> — znak, kwadrat siatki, czas, pasmo i tryb</li>
      <li><strong>Automatyczne QSO</strong> — strategia automatycznej odpowiedzi i ograniczenia nadawania</li>
      <li><strong>Radio i dźwięk</strong> — model radia, parametry połączenia, PTT i format dźwięku</li>
      <li><strong>Wysyłanie do usług</strong> — QRZ.com, Cloudlog / Wavelog i PSK Reporter</li>
      <li><strong>Aktywacja SOTA / POTA</strong> — własne referencje szczytu i parku</li>
      <li><strong>Wyświetlanie i wygląd</strong> — motyw, rozmiar tekstu, wodospad, powiadomienia o QSO i pływające okno</li>
      <li><strong>Kopia zapasowa i przywracanie</strong> — automatyczne kopie bazy dziennika i czyszczenie cache</li>
      <li><strong>Zaawansowane i deweloper</strong> — urządzenie audio i API dla deweloperów</li>
    </ul>
    <p>Poniżej wszystko opisano w tej samej kolejności co w aplikacji. Przy wielu pozycjach po prawej stronie widnieje ikona <strong>ⓘ</strong> — to wbudowana pomoc dla danego ustawienia.</p>`,

  set_station_title: 'Informacje podstawowe',
  set_station_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Znak</td><td>Twój znak wywoławczy; bez niego nadawanie nie jest możliwe</td></tr>
      <tr><td>CQ mod.</td><td>Lista modyfikatorów, które można dodać do CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Kwadrat siatki</td><td>Twój lokator Maidenhead. Ikona lokalizacji obok wypełnia go na podstawie pozycji telefonu</td></tr>
      <tr><td>Dokładność lokalizacji</td><td><code>Low</code> / <code>Medium</code> / <code>High</code> / <code>Ultra High</code> dają lokator 4-, 6-, 8- lub 10-znakowy. Wpływa tylko na to, ile znaków zostanie pobranych przy wypełnianiu z pozycji telefonu</td></tr>
      <tr><td>Przesunięcie czasu</td><td>Ręczna korekta zegara w sekundach</td></tr>
      <tr><td>Synchr.</td><td>Synchronizacja zegara z internetowym serwerem czasu</td></tr>
      <tr><td>Częstotliwość</td><td>Pasmo i częstotliwość pracy. Znak <code>*</code> na początku oznacza częstotliwość oznaczoną w tabeli jako często używana</td></tr>
      <tr><td>Tabela częstotliwości</td><td>Edycja tabeli pasm i częstotliwości: dodawanie, zmiana, oznaczanie jako często używana (*) lub przywrócenie całości do wartości wbudowanych. Każdy tryb ma własną tabelę</td></tr>
      <tr><td>Tryb FT8/FT4/FT2</td><td>Przełączanie między trzema trybami. Radio samo przestraja się na częstotliwość nowego trybu — nie trzeba wybierać jej ponownie</td></tr>
      <tr><td>Tryb dekod.</td><td><code>Fast</code> (szybki) / <code>Standard</code> (zrównoważony, domyślny) / <code>Deep</code> (dla słabych sygnałów). Każdy kolejny trwa dłużej, ale wydobywa słabsze sygnały</td></tr>
    </table>`,

  set_op_title: 'Automatyczne QSO',
  set_op_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Nie zapisuj dekod. SWL</td><td>Nie zapisuj zdekodowanych wiadomości do bazy, oszczędzając miejsce</td></tr>
      <tr><td>Nie zapisuj QSO dla SWL</td><td>Nie zapisuj podsłuchanych QSO innych stacji</td></tr>
      <tr><td>Auto odpowiedź CQ</td><td>Główny przełącznik. Wyłączony pokazuje „nie odpowiadaj na CQ"</td></tr>
      <tr><td>Sposób odpowiedzi na CQ</td><td>Którą stację preferować przy automatycznej odpowiedzi; opcje opisano w rozdziale <a href="operating.html">„Praca w FT8 / FT4"</a></td></tr>
      <tr><td>Wyklucz QSO</td><td>Pomijaj stacje pracowane w wybranym okresie: <strong>wyłączone</strong>, <strong>wszystkie</strong>, <strong>1 / 4 / 8 godzin</strong>, <strong>dzisiaj</strong>, <strong>30 dni</strong> lub <strong>365 dni</strong></td></tr>
      <tr><td>Pokaż pracowane stacje (przekreślone)</td><td>Pracowane stacje pozostają na liście i są wyświetlane przekreślone</td></tr>
      <tr><td>Obserwowane znaki</td><td>Znaki, które chcesz mieć na oku, aby nie przeoczyć ich pojawienia się</td></tr>
      <tr><td>Wykluczone prefiksy</td><td>Prefiksy, na które automatyka nigdy nie odpowiada</td></tr>
      <tr><td>Strażnik TX</td><td>Automatyczne zatrzymanie nadawania po zadanej liczbie minut (0 = wyłączone)</td></tr>
      <tr><td>Brak odpowiedzi</td><td>Po N cyklach bez odpowiedzi przerwij wywołanie i szukaj innego korespondenta</td></tr>
      <tr><td>Maks. powtórzeń 73</td><td>Jeśli na koniec QSO korespondent zawoła ponownie, powtórz RR73 najwyżej N razy (0 = wyłączone)</td></tr>
      <tr><td>Tryb zawodów (wymiana lokatorów)</td><td>Wysyłaj <code>R</code> + własny lokator zamiast raportu; zob. <a href="operating.html">„Praca w FT8 / FT4"</a></td></tr>
    </table>`,

  set_radio_title: 'Radio i dźwięk',
  set_radio_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Radio</td><td>Model Twojego radia; decyduje, którego zestawu poleceń CAT używa aplikacja</td></tr>
      <tr><td>Sterowanie</td><td>Jak wyzwalane jest PTT: VOX / CAT / RTS / DTR</td></tr>
      <tr><td>Typ połączenia</td><td>Kabel (USB), Bluetooth lub sieć</td></tr>
      <tr><td>Bity danych / Parzystość / Bity stopu</td><td>Format ramki portu szeregowego; jeśli instrukcja radia nie mówi inaczej, przycisk <strong>Domyślne</strong> przywróci wartości wyjściowe</td></tr>
      <tr><td>CI-V</td><td>Adres magistrali CI-V (tylko radia ICOM)</td></tr>
      <tr><td>Prędkość transmisji (Baud rate)</td><td>Prędkość portu szeregowego CAT; musi odpowiadać ustawieniu radia</td></tr>
      <tr><td>Opóźnienie TX <em>(wycofane)</em></td><td>Kompensacja czasu wyjścia dźwięku (ms); aplikacja oznacza je jako wycofane i można je zostawić</td></tr>
      <tr><td>Opóźnienie PTT</td><td>Ile milisekund odczekać po włączeniu PTT przed podaniem dźwięku. Zwiększ, jeśli radio wolno przechodzi na nadawanie</td></tr>
      <tr><td>Częst. audio</td><td>Domyślna częstotliwość dźwięku nadawania (0–2900 Hz)</td></tr>
      <tr><td>Zablokuj TX=RX / Tx/Rx rozdz.</td><td>Dwa stany jednego przełącznika: włączony — częstotliwość nadawania podąża za korespondentem; wyłączony — nadawanie i odbiór używają osobnych częstotliwości</td></tr>
      <tr><td>Głębia bitowa</td><td>Wyjście dźwięku 16-bitowe całkowite lub 32-bitowe zmiennoprzecinkowe</td></tr>
      <tr><td>Częst. próbkowania</td><td>12 kHz (domyślnie), 24 kHz lub 48 kHz</td></tr>
      <tr><td>Alarm SWR/ALC</td><td>Ostrzegaj, gdy SWR lub ALC przekroczy bezpieczne wartości; wyłączony pokazuje „(X) Bez alarmu SWR/ALC"</td></tr>
      <tr><td>Wzmocnienie dźwięku odbioru</td><td>Wzmocnij lub osłab odbierany dźwięk wewnątrz aplikacji. Przydatne, gdy poziomu wyjścia samego radia nie da się zmienić — QMX podaje przez USB stały poziom, a w radiach ICOM poziom USB jest w menu SET, a nie na gałce AF</td></tr>
    </table>`,

  set_services_title: 'Wysyłanie do usług',
  set_services_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Autowysyłka do QRZ.com</td><td>Wysyłaj zakończone QSO prosto do dziennika na QRZ.com</td></tr>
      <tr><td>Api_key QRZ.com</td><td>Pobierany z ustawień Logbook na QRZ.com; przycisk <strong>Testuj</strong> obok sprawdza, czy klucz działa</td></tr>
      <tr><td>Wyślij</td><td>Zbiorcze wysłanie istniejących wpisów z wybranego zakresu dat</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Adres serwera, klucz API i ID stacji oraz test połączenia; zob. <a href="third-party.html">„Usługi zewnętrzne"</a></td></tr>
      <tr><td>Spot do PSK Reporter</td><td>Anonimowe wysyłanie raportów odbioru na mapę propagacji; konto nie jest potrzebne</td></tr>
      <tr><td>Antena</td><td>Opis Twojej anteny (<code>Dipole</code>, <code>Vertical</code>…) wysyłany razem ze spotami PSK Reporter. To tekst opisowy dla mapy i <strong>nie</strong> przełącza gniazd antenowych w radiu</td></tr>
      <tr><td>FREE TEXT</td><td>Przygotowany wcześniej dowolny tekst. Długie naciśnięcie przycisku CQ na karcie wywołania włącza tryb tekstu dowolnego i wstawia go — przydatne przy SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'Aktywacja SOTA / POTA',
  set_activation_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Tryb aktywacji (zapis referencji do dziennika)</td><td>Po włączeniu Twoja referencja SOTA / POTA trafia do każdego zapisanego QSO</td></tr>
      <tr><td>Mój SOTA</td><td>Aktywowany szczyt, np. <code>BV/TP-001</code></td></tr>
      <tr><td>Mój POTA</td><td>Aktywowany park, np. <code>TW-0001</code>. Poniżej pokazywana jest znaleziona nazwa parku i lokator, dzięki czemu można sprawdzić poprawność referencji</td></tr>
      <tr><td>+ Dodaj park</td><td>Jedno miejsce często leży w kilku parkach jednocześnie (n-fer). Można wpisać do <strong>6</strong>; każdy wiersz ma własny przycisk usuwania</td></tr>
    </table>
    <p>Po wpisaniu dwóch lub więcej parków eksport przełącza się na <strong>jeden ADIF na park, spakowane w ZIP</strong> — przyjętą w POTA praktyką jest osobny dziennik dla każdego parku, a kilka referencji w jednym polu nie zostanie przyjętych. Przy jednym parku eksport pozostaje pojedynczym plikiem.</p>`,

  set_display_title: 'Wyświetlanie i wygląd',
  set_display_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Motyw</td><td>Jak w urządzeniu, jasny lub ciemny</td></tr>
      <tr><td>Tryb wiadomości</td><td>Lista dekodowania w układzie <strong>Standardowy</strong> (pełne informacje w wierszu) lub <strong>Prosty</strong> (jeden zwarty wiersz)</td></tr>
      <tr><td>Rozmiar czcionki listy</td><td>Wielkość tekstu na listach dekodowania i dziennika</td></tr>
      <tr><td>Nie wygaszaj ekranu</td><td>Zapobiega wygaszaniu ekranu podczas pracy</td></tr>
      <tr><td>Mini wodospad na ekranie Dekod. / Wywołanie</td><td>Pokazuje zwarty pasek wodospadu na obu kartach; dwa niezależne przełączniki</td></tr>
      <tr><td>Schemat kolorów wodospadu</td><td>Klasyczne lub tęczowe odwzorowanie kolorów widma i wodospadu</td></tr>
      <tr><td>Udane QSO: błysk ekranu / fale / latarka / zdjęcie QRZ</td><td>Cztery niezależne sposoby zasygnalizowania zakończonego QSO; zob. <a href="logging.html">„Dziennik łączności"</a></td></tr>
      <tr><td>Pokaż pływające okno</td><td>Główny przełącznik pływającego menu skrótów</td></tr>
      <tr><td>Poszczególne przyciski pływającego okna</td><td>Ukryj dolne menu, częstotliwość, głośność, mapa lokatorów, narzędzia radia, latarnia WSPR, czat JS8 i szybka zmiana trybu — osiem przycisków, każdy pokazywany lub ukrywany osobno</td></tr>
      <tr><td>Język</td><td>Język interfejsu, niezależny od ustawienia systemu</td></tr>
    </table>`,

  set_backup_title: 'Kopia zapasowa i przywracanie',
  set_backup_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Automatyczna kopia zapasowa przy starcie</td><td>Twórz kopię bazy dziennika przy uruchamianiu aplikacji</td></tr>
      <tr><td>Odstęp (dni)</td><td>Ile czekać do następnej automatycznej kopii</td></tr>
      <tr><td>Liczba przechowywanych kopii</td><td>Ile starszych kopii zachować; nadmiarowe są usuwane od najstarszych</td></tr>
      <tr><td>Wybierz folder kopii zapasowej</td><td>Gdzie zapisywać pliki kopii; wybierz folder synchronizowany z chmurą, a kopia od razu opuści telefon</td></tr>
      <tr><td>Utwórz kopię teraz / Przywróć kopię zapasową</td><td>Zrób kopię natychmiast albo wybierz i przywróć wcześniejszą</td></tr>
      <tr><td>Wyczyść cache</td><td>Osobno usuń <strong>obserwowane znaki</strong>, <strong>zdekod. wiad.</strong> i <strong>zdekodowane QSO</strong></td></tr>
      <tr><td>Usuń pliki tymcz.</td><td>Usuń pliki tymczasowe powstałe przy udostępnianiu dziennika</td></tr>
      <tr><td>Wyczyść QSO</td><td>Wyzeruj licznik QSO bieżącej sesji</td></tr>
    </table>`,

  set_advanced_title: 'Zaawansowane i deweloper',
  set_advanced_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Urządzenie audio</td><td>Pokazuje, z którego urządzenia faktycznie nagrywany jest dźwięk (mikrofon wbudowany czy karta dźwiękowa USB) i z jaką częstotliwością próbkowania. Jeśli urządzenie USB zostało znalezione, ale nie udało się przekierować na nie nagrywania, jest to napisane wprost</td></tr>
      <tr><td>Wykryj ponownie</td><td>Naciśnij po podłączeniu karty dźwiękowej USB (np. Digirig), aby przełączyć się na nią bez restartu aplikacji. Podłączenie jest zwykle wykrywane automatycznie; ten przycisk to rozwiązanie awaryjne</td></tr>
      <tr><td>API dla deweloperów</td><td>Uruchamia w telefonie interfejs HTTP, dzięki któremu inne programy w tej samej sieci mogą odczytywać dekodowane wiadomości, dziennik i widmo. Po włączeniu wyświetlany jest adres dostępu</td></tr>
      <tr><td>Token tylko do odczytu</td><td>Poświadczenie wyłącznie do odczytu; można je <strong>kopiować</strong> i <strong>wygenerować ponownie</strong></td></tr>
      <tr><td>Token pełnego dostępu</td><td>Poświadczenie pozwalające sterować aplikacją — <strong>nie udostępniaj go</strong>. Ponowne wygenerowanie natychmiast unieważnia poprzedni</td></tr>
      <tr><td>Zezwól na zdalne sterowanie nadawaniem</td><td>Pozwala programowi z tokenem pełnego dostępu rozpoczynać i zatrzymywać nadawanie z innego urządzenia. Jeśli nie potrzebujesz zdalnego nadawania, zostaw wyłączone</td></tr>
    </table>`,
},

'es': {
  set_title: 'Referencia de ajustes',

  set_profile_title: 'Perfiles',
  set_profile_text:  'Los ajustes pueden guardarse como varios perfiles con nombre y cambiarse en un solo paso, algo cómodo cuando alternas entre el equipo de casa, una radio portátil y la estación del club, cada una con su tipo de conexión, velocidad de puerto y dirección CI-V. La fila de perfil aparece en la parte superior de la página principal de ajustes y de cada subpágina: la lista desplegable de la izquierda cambia de perfil y los tres iconos de la derecha son <strong>＋</strong> (añadir), un <strong>lápiz</strong> (renombrar) y una <strong>papelera</strong> (eliminar). Al eliminar se pide confirmación; la única restricción es que <strong>debe quedar al menos un perfil</strong>.',
  set_profile_note: 'No todos los ajustes pertenecen a un perfil. Los que sí lo hacen aparecen en la aplicación con una <strong>franja morada</strong> en el borde izquierdo; todo lo que no la lleva es común a todos los perfiles.',

  set_profile_caption: 'La fila de perfil presente en la parte superior de cada página: el desplegable cambia de perfil y los tres iconos añaden, renombran y eliminan. Las filas con franja morada a la izquierda (indicativo, grid, frecuencia) siguen al perfil; «Desfase» no la tiene, así que es común a todos. (La captura muestra la interfaz en inglés.)',

  set_menu_title: 'Los ocho grupos de ajustes',
  set_menu_text:  'Los ajustes ya no son una única lista interminable: se reparten en ocho grupos, cada uno en su propia página. Pulsa un grupo en la página principal de ajustes para abrirlo; cada subpágina conserva arriba la misma fila de perfil, y debajo <strong>Volver al menú de ajustes</strong>. En la parte inferior de la página principal están además los botones <strong>Acerca de</strong>, <strong>DEBUG</strong> e <strong>Informar</strong>.',
  set_menu_list: `
    <ul>
      <li><strong>Información básica</strong> — indicativo, grid, hora, banda y modo</li>
      <li><strong>QSO automático</strong> — estrategia de respuesta automática y límites de transmisión</li>
      <li><strong>Radio y audio</strong> — modelo de equipo, parámetros de enlace, PTT y formato de audio</li>
      <li><strong>Subida a servicios</strong> — QRZ.com, Cloudlog / Wavelog y PSK Reporter</li>
      <li><strong>Activación SOTA / POTA</strong> — tus propias referencias de cima y parque</li>
      <li><strong>Pantalla y apariencia</strong> — tema, tamaño de texto, cascada, avisos de QSO y ventana flotante</li>
      <li><strong>Copia de seguridad y restauración</strong> — copias automáticas del registro y borrado de caché</li>
      <li><strong>Avanzado y desarrollador</strong> — dispositivo de audio y API para desarrolladores</li>
    </ul>
    <p>A continuación se describe todo en el mismo orden que en la aplicación. Muchas filas llevan a la derecha un icono <strong>ⓘ</strong>: es la ayuda integrada de ese ajuste concreto.</p>`,

  set_station_title: 'Información básica',
  set_station_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Indicativo</td><td>Tu indicativo de radioaficionado; sin él no se puede transmitir</td></tr>
      <tr><td>CQ Mod.</td><td>Edita la lista de modificadores que puede llevar tu CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Grid</td><td>Tu locator Maidenhead. El icono de ubicación contiguo lo rellena a partir de la posición del teléfono</td></tr>
      <tr><td>Precisión de ubicación</td><td><code>Low</code> / <code>Medium</code> / <code>High</code> / <code>Ultra High</code> dan un locator de 4 / 6 / 8 / 10 caracteres. Solo afecta a cuántos caracteres se toman al rellenar desde la posición del teléfono</td></tr>
      <tr><td>Desfase</td><td>Corrección manual del reloj en segundos</td></tr>
      <tr><td>Sync time</td><td>Sincroniza el reloj con un servidor de hora de Internet</td></tr>
      <tr><td>Frecuencia</td><td>La banda y frecuencia en la que operas. Un <code>*</code> inicial marca una frecuencia señalada como habitual en la tabla de frecuencias</td></tr>
      <tr><td>Tabla de frecuencias</td><td>Edita la tabla de bandas y frecuencias: añadir, modificar, marcar como habitual (*) o restablecerla por completo a los valores integrados. Cada modo tiene la suya</td></tr>
      <tr><td>Modo FT8/FT4/FT2</td><td>Cambia entre los tres modos. La radio se sintoniza sola en la frecuencia del nuevo modo; no hace falta volver a elegirla</td></tr>
      <tr><td>Modo decod.</td><td><code>Fast</code> (rápido) / <code>Standard</code> (equilibrado, por defecto) / <code>Deep</code> (para señales débiles). Cada opción tarda más, pero rescata señales más débiles</td></tr>
    </table>`,

  set_op_title: 'QSO automático',
  set_op_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Don't save decoded</td><td>No guardar los mensajes decodificados en la base de datos, ahorrando espacio</td></tr>
      <tr><td>Don't save QSO of SWL</td><td>No registrar los QSO escuchados entre otras estaciones</td></tr>
      <tr><td>Auto seguimiento CQ</td><td>El interruptor principal. Apagado muestra «no responder a CQ»</td></tr>
      <tr><td>Método de CQ</td><td>Qué estación priorizar al responder automáticamente; las opciones se describen en <a href="operating.html">«Operar en FT8 / FT4»</a></td></tr>
      <tr><td>Excluir QSO</td><td>Omitir estaciones trabajadas dentro del periodo elegido: <strong>desactivado</strong>, <strong>todos</strong>, <strong>1 / 4 / 8 horas</strong>, <strong>hoy</strong>, <strong>30 días</strong> o <strong>365 días</strong></td></tr>
      <tr><td>Mostrar estaciones trabajadas (con tachado)</td><td>Las estaciones ya trabajadas siguen en la lista, mostradas con tachado</td></tr>
      <tr><td>Indicativos seguidos</td><td>Indicativos que quieres tener a la vista para no perderlos cuando aparezcan</td></tr>
      <tr><td>Prefijos excluidos</td><td>Prefijos a los que la automatización nunca debe responder</td></tr>
      <tr><td>Vigilancia TX</td><td>Detiene la transmisión automáticamente tras los minutos indicados (0 = desactivado)</td></tr>
      <tr><td>Ninguna respuesta</td><td>Tras N ciclos sin respuesta, abandona la llamada y busca otro corresponsal</td></tr>
      <tr><td>Máx. reenvíos de 73</td><td>Si el corresponsal vuelve a llamar al cerrar el QSO, reenvía RR73 como máximo N veces (0 = desactivado)</td></tr>
      <tr><td>Modo concurso (intercambio de locator)</td><td>Envía <code>R</code> + tu locator en lugar del reporte; ver <a href="operating.html">«Operar en FT8 / FT4»</a></td></tr>
    </table>`,

  set_radio_title: 'Radio y audio',
  set_radio_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Equipo</td><td>El modelo de tu transceptor; determina qué juego de comandos CAT usa la aplicación</td></tr>
      <tr><td>Controlar</td><td>Cómo se activa el PTT: VOX / CAT / RTS / DTR</td></tr>
      <tr><td>Tipo de conexión</td><td>Cable (USB), Bluetooth o red</td></tr>
      <tr><td>Bits de datos / Paridad / Bits de parada</td><td>Formato de trama del puerto serie; salvo que el manual de tu equipo diga otra cosa, el botón <strong>Predet.</strong> los restaura</td></tr>
      <tr><td>CI-V</td><td>Dirección del bus CI-V (solo equipos ICOM)</td></tr>
      <tr><td>Baudios</td><td>Velocidad del puerto serie CAT; debe coincidir con la del equipo</td></tr>
      <tr><td>Tx demora <em>(obsoleto)</em></td><td>Compensación de tiempo de la salida de audio (ms); la aplicación lo marca como obsoleto y puede dejarse como está</td></tr>
      <tr><td>PTT demora</td><td>Milisegundos de espera tras activar el PTT antes de enviar audio. Auméntalo si el equipo tarda en pasar a transmisión</td></tr>
      <tr><td>Audio Hz</td><td>Frecuencia de audio de transmisión por defecto (0–2900 Hz)</td></tr>
      <tr><td>bloqueado TX=RX / Tx/Rx Separar</td><td>Dos estados del mismo interruptor: activado, la frecuencia de transmisión sigue a la estación con la que trabajas; desactivado, transmisión y recepción usan frecuencias distintas</td></tr>
      <tr><td>Prof. bits</td><td>Salida de audio entera de 16 bits o de coma flotante de 32 bits</td></tr>
      <tr><td>Frec. muestreo</td><td>12 kHz (por defecto), 24 kHz o 48 kHz</td></tr>
      <tr><td>Aviso SWR/ALC</td><td>Avisa cuando el SWR o el ALC superan límites seguros; desactivado muestra «(X) Sin aviso SWR/ALC»</td></tr>
      <tr><td>Ganancia de audio de recepción</td><td>Amplifica o atenúa el audio recibido dentro de la aplicación. Útil cuando no se puede cambiar el nivel de salida del propio equipo: el QMX entrega un nivel fijo por USB, y en los ICOM el nivel USB está en el menú SET y no en el mando de AF</td></tr>
    </table>`,

  set_services_title: 'Subida a servicios',
  set_services_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Subida auto. a QRZ.com</td><td>Envía los QSO terminados directamente a tu libro de guardia de QRZ.com</td></tr>
      <tr><td>api_key de QRZ.com</td><td>Se obtiene en los ajustes de Logbook de QRZ.com; el botón <strong>Probar</strong> contiguo comprueba que la clave funciona</td></tr>
      <tr><td>Subir</td><td>Envío por lotes de registros ya existentes en un rango de fechas</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Dirección del servidor, clave API e ID de estación, además de una prueba de conexión; ver <a href="third-party.html">«Servicios externos»</a></td></tr>
      <tr><td>Reportar a PSK Reporter</td><td>Envía informes de recepción de forma anónima al mapa de propagación; no hace falta cuenta</td></tr>
      <tr><td>Antena</td><td>Descripción de tu antena (<code>Dipole</code>, <code>Vertical</code>…) enviada junto con los reportes a PSK Reporter. Es texto descriptivo para el mapa y <strong>no</strong> conmuta ninguna toma de antena del equipo</td></tr>
      <tr><td>FREE TEXT</td><td>Un texto libre preparado de antemano. Una pulsación larga sobre el botón CQ en la pestaña de llamada entra en modo de texto libre y lo inserta, lo que resulta cómodo para SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'Activación SOTA / POTA',
  set_activation_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Modo de activación (guardar refs en el registro)</td><td>Con él activado, tu referencia SOTA / POTA se escribe en cada QSO registrado</td></tr>
      <tr><td>Mi SOTA</td><td>La cima que estás activando, p. ej. <code>BV/TP-001</code></td></tr>
      <tr><td>Mi POTA</td><td>El parque que estás activando, p. ej. <code>TW-0001</code>. Debajo se muestran el nombre del parque y el locator encontrados, de modo que puedes comprobar la referencia</td></tr>
      <tr><td>+ Añadir parque</td><td>Un mismo punto suele estar en varios parques a la vez (un n-fer). Se pueden introducir hasta <strong>6</strong>; cada fila tiene su propio botón de borrado</td></tr>
    </table>
    <p>Con dos o más parques, la exportación cambia a <strong>un ADIF por parque, empaquetados en un ZIP</strong>: la práctica habitual en POTA es un registro por parque, subido por separado, y varias referencias en un mismo campo no se aceptan. Con un solo parque, la exportación sigue siendo un único archivo.</p>`,

  set_display_title: 'Pantalla y apariencia',
  set_display_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Tema</td><td>Según el dispositivo, claro u oscuro</td></tr>
      <tr><td>Modo de mensajes</td><td>Lista de decodificación en formato <strong>Estándar</strong> (información completa por fila) o <strong>Simple</strong> (una línea compacta)</td></tr>
      <tr><td>Tamaño de fuente de lista</td><td>Tamaño del texto en las listas de decodificación y de registro</td></tr>
      <tr><td>Mantener pantalla encendida</td><td>Evita que la pantalla se apague durante la operación</td></tr>
      <tr><td>Mini cascada en Decodif. / Llamada</td><td>Muestra una franja compacta de cascada en ambas pestañas; dos interruptores independientes</td></tr>
      <tr><td>Esquema de color de cascada</td><td>Colores clásicos o arcoíris para el espectro y la cascada</td></tr>
      <tr><td>QSO con éxito: destello / onda / linterna / foto QRZ</td><td>Cuatro formas independientes de anunciar un QSO completado; ver <a href="logging.html">«Registro de contactos»</a></td></tr>
      <tr><td>Mostrar ventana flotante</td><td>Interruptor general del menú flotante de accesos directos</td></tr>
      <tr><td>Los botones de la ventana flotante</td><td>Ocultar menú inferior, frecuencia, volumen, mapa de locators, herramientas de radio, baliza WSPR, chat JS8 y cambio rápido de modo: ocho botones, cada uno visible u oculto por separado</td></tr>
      <tr><td>Idioma</td><td>Idioma de la interfaz, independiente del ajuste del sistema</td></tr>
    </table>`,

  set_backup_title: 'Copia de seguridad y restauración',
  set_backup_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Copia de seguridad automática al iniciar</td><td>Copia la base de datos del registro al arrancar la aplicación</td></tr>
      <tr><td>Intervalo (días)</td><td>Cuánto esperar hasta la siguiente copia automática</td></tr>
      <tr><td>Copias a conservar</td><td>Cuántas copias antiguas mantener; las sobrantes se borran empezando por la más antigua</td></tr>
      <tr><td>Elegir carpeta de copia de seguridad</td><td>Dónde se escriben los archivos de copia; elige una carpeta sincronizada con la nube y la copia saldrá también del teléfono</td></tr>
      <tr><td>Copia de seguridad ahora / Restaurar copia de seguridad</td><td>Haz una copia de inmediato, o localiza y restaura una anterior</td></tr>
      <tr><td>Borrar caché</td><td>Borra por separado los <strong>indicativos seguidos</strong>, los <strong>msg decodificados</strong> y los <strong>QSO decodificados</strong></td></tr>
      <tr><td>Borrar temporales</td><td>Elimina los archivos temporales creados al compartir el registro</td></tr>
      <tr><td>Borrar cont. QSO</td><td>Pone a cero el contador de QSO de la sesión</td></tr>
    </table>`,

  set_advanced_title: 'Avanzado y desarrollador',
  set_advanced_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Dispositivo de audio</td><td>Muestra desde qué dispositivo se está grabando realmente (micrófono integrado o tarjeta de sonido USB) y a qué frecuencia de muestreo. Si se encontró un dispositivo USB pero no se pudo encaminar la grabación hacia él, aquí se indica claramente que se sigue grabando del micrófono integrado</td></tr>
      <tr><td>Volver a detectar</td><td>Púlsalo tras conectar una tarjeta de sonido USB (por ejemplo un Digirig) para pasar a ella sin reiniciar la aplicación. La conexión suele detectarse sola; este botón es la alternativa cuando no ocurre</td></tr>
      <tr><td>API para desarrolladores (para complementos)</td><td>Abre en el teléfono una interfaz HTTP para que otros programas de la misma red puedan leer decodificaciones, registro y espectro. Al activarla se muestra la dirección de acceso</td></tr>
      <tr><td>Token de solo lectura</td><td>Credencial que solo permite leer; se puede <strong>copiar</strong> y <strong>regenerar</strong></td></tr>
      <tr><td>Token de acceso completo</td><td>Credencial que permite controlar la aplicación: <strong>no lo compartas</strong>. Al regenerarlo, el anterior deja de servir de inmediato</td></tr>
      <tr><td>Permitir control remoto de transmisión</td><td>Permite que un programa con el token de acceso completo inicie y detenga la transmisión desde otro dispositivo. Si no necesitas transmisión remota, déjalo desactivado</td></tr>
    </table>`,
},

'el': {
  set_title: 'Οδηγός ρυθμίσεων',

  set_profile_title: 'Προφίλ',
  set_profile_text:  'Οι ρυθμίσεις μπορούν να αποθηκευτούν ως πολλά ονομασμένα προφίλ και να εναλλάσσονται με ένα βήμα — βολικό όταν μετακινείστε ανάμεσα στον σταθμό βάσης, σε φορητό πομποδέκτη και στον σταθμό του συλλόγου, καθένας με δικό του τύπο σύνδεσης, ταχύτητα θύρας και διεύθυνση CI-V. Η γραμμή προφίλ βρίσκεται στην κορυφή της αρχικής σελίδας ρυθμίσεων και κάθε υποσελίδας: η αναπτυσσόμενη λίστα αριστερά αλλάζει προφίλ και τα τρία εικονίδια δεξιά είναι <strong>＋</strong> (προσθήκη), <strong>μολύβι</strong> (μετονομασία) και <strong>κάδος</strong> (διαγραφή). Η διαγραφή ζητά επιβεβαίωση· ο μόνος περιορισμός είναι ότι <strong>πρέπει να μείνει τουλάχιστον ένα προφίλ</strong>.',
  set_profile_note: 'Δεν ανήκουν όλες οι ρυθμίσεις σε προφίλ. Όσες ανήκουν επισημαίνονται στην εφαρμογή με μια <strong>μοβ λωρίδα</strong> στο αριστερό άκρο· ό,τι δεν έχει λωρίδα είναι κοινό για όλα τα προφίλ.',

  set_profile_caption: 'Η γραμμή προφίλ που εμφανίζεται στην κορυφή κάθε σελίδας: η αναπτυσσόμενη λίστα αλλάζει προφίλ και τα τρία εικονίδια προσθέτουν, μετονομάζουν και διαγράφουν. Οι γραμμές με μοβ λωρίδα αριστερά (διακριτικό, τετράγωνο, συχνότητα) ακολουθούν το προφίλ· η «Χρον. απόκλ.» δεν έχει λωρίδα, άρα είναι κοινή για όλα τα προφίλ. (Το στιγμιότυπο δείχνει το περιβάλλον στα αγγλικά.)',

  set_menu_title: 'Οι οκτώ ομάδες ρυθμίσεων',
  set_menu_text:  'Οι ρυθμίσεις δεν είναι πια μία ατέλειωτη λίστα: χωρίζονται σε οκτώ ομάδες, καθεμιά στη δική της σελίδα. Πατήστε μια ομάδα στην αρχική σελίδα ρυθμίσεων για να την ανοίξετε· κάθε υποσελίδα διατηρεί στην κορυφή την ίδια γραμμή προφίλ και από κάτω το <strong>Πίσω στο μενού ρυθμίσεων</strong>. Στο κάτω μέρος της αρχικής σελίδας υπάρχουν επίσης τα κουμπιά <strong>Σχετικά</strong>, <strong>DEBUG</strong> και <strong>Αναφορά</strong>.',
  set_menu_list: `
    <ul>
      <li><strong>Βασικές πληροφορίες</strong> — διακριτικό, τετράγωνο, ώρα, μπάντα και λειτουργία</li>
      <li><strong>Αυτόματο QSO</strong> — στρατηγική αυτόματης απάντησης και όρια εκπομπής</li>
      <li><strong>Πομποδέκτης και ήχος</strong> — μοντέλο, παράμετροι σύνδεσης, PTT και μορφή ήχου</li>
      <li><strong>Μεταφόρτωση σε υπηρεσίες</strong> — QRZ.com, Cloudlog / Wavelog και PSK Reporter</li>
      <li><strong>Ενεργοποίηση SOTA / POTA</strong> — οι δικές σας αναφορές κορυφής και πάρκου</li>
      <li><strong>Εμφάνιση και θέμα</strong> — θέμα, μέγεθος κειμένου, καταρράκτης, ειδοποιήσεις QSO και αιωρούμενο παράθυρο</li>
      <li><strong>Αντίγραφα ασφαλείας</strong> — αυτόματα αντίγραφα της βάσης του ημερολογίου και καθαρισμός μνήμης</li>
      <li><strong>Για προχωρημένους</strong> — συσκευή ήχου και API προγραμματιστή</li>
    </ul>
    <p>Παρακάτω όλα περιγράφονται με την ίδια σειρά που εμφανίζονται στην εφαρμογή. Πολλές γραμμές έχουν δεξιά ένα εικονίδιο <strong>ⓘ</strong> — είναι η ενσωματωμένη βοήθεια για τη συγκεκριμένη ρύθμιση.</p>`,

  set_station_title: 'Βασικές πληροφορίες',
  set_station_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Διακρ.</td><td>Το διακριτικό σας· χωρίς αυτό δεν είναι δυνατή η εκπομπή</td></tr>
      <tr><td>CQ Τροπ.</td><td>Επεξεργασία της λίστας των προσδιοριστικών που μπορεί να συνοδεύουν το CQ σας (DX, EU, TEST…)</td></tr>
      <tr><td>Τετράγωνο</td><td>Ο εντοπιστής Maidenhead σας. Το διπλανό εικονίδιο θέσης τον συμπληρώνει από τη θέση του τηλεφώνου</td></tr>
      <tr><td>Ακρίβεια θέσης</td><td><code>Low</code> / <code>Medium</code> / <code>High</code> / <code>Ultra High</code> δίνουν τετράγωνο 4 / 6 / 8 / 10 χαρακτήρων. Επηρεάζει μόνο πόσοι χαρακτήρες λαμβάνονται κατά τη συμπλήρωση από τη θέση του τηλεφώνου</td></tr>
      <tr><td>Χρον. απόκλ.</td><td>Χειροκίνητη διόρθωση του ρολογιού σε δευτερόλεπτα</td></tr>
      <tr><td>Συγχρ.</td><td>Συγχρονισμός του ρολογιού με διακομιστή ώρας στο διαδίκτυο</td></tr>
      <tr><td>Συχνότητα</td><td>Η μπάντα και η συχνότητα στην οποία εργάζεστε. Το <code>*</code> στην αρχή σημαίνει συχνότητα σημειωμένη ως συνήθης στον πίνακα συχνοτήτων</td></tr>
      <tr><td>Πίνακας συχνοτήτων</td><td>Επεξεργασία του πίνακα μπαντών/συχνοτήτων: προσθήκη, τροποποίηση, σήμανση ως συνήθης (*) ή επαναφορά όλου του πίνακα στις ενσωματωμένες τιμές. Κάθε λειτουργία έχει τον δικό της</td></tr>
      <tr><td>Λειτουργία FT8/FT4/FT2</td><td>Εναλλαγή μεταξύ των τριών λειτουργιών. Ο πομποδέκτης συντονίζεται μόνος του στη συχνότητα της νέας λειτουργίας — δεν χρειάζεται να την επιλέξετε ξανά</td></tr>
      <tr><td>Λειτ. αποκωδ.</td><td><code>Fast</code> (γρήγορη) / <code>Standard</code> (ισορροπημένη, προεπιλογή) / <code>Deep</code> (για ασθενή σήματα). Κάθε επόμενη αργεί περισσότερο αλλά βγάζει ασθενέστερα σήματα</td></tr>
    </table>`,

  set_op_title: 'Αυτόματο QSO',
  set_op_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Don't save decoded</td><td>Να μην αποθηκεύονται τα αποκωδικοποιημένα μηνύματα στη βάση, εξοικονομώντας χώρο</td></tr>
      <tr><td>Don't save QSO of SWL</td><td>Να μην καταγράφονται QSO άλλων σταθμών που ακούγονται</td></tr>
      <tr><td>Αυτόματο track CQ</td><td>Ο κύριος διακόπτης. Όταν είναι κλειστός εμφανίζεται «να μην απαντά σε CQ»</td></tr>
      <tr><td>Μέθοδος απάντησης CQ</td><td>Ποιον σταθμό να προτιμά κατά την αυτόματη απάντηση· οι επιλογές περιγράφονται στο <a href="operating.html">«Λειτουργία FT8 / FT4»</a></td></tr>
      <tr><td>Εξαίρεση QSO</td><td>Παράλειψη σταθμών που δουλεύτηκαν μέσα στο επιλεγμένο διάστημα: <strong>ανενεργό</strong>, <strong>όλα</strong>, <strong>1 / 4 / 8 ώρες</strong>, <strong>σήμερα</strong>, <strong>30 ημέρες</strong> ή <strong>365 ημέρες</strong></td></tr>
      <tr><td>Δουλεμένοι σταθμοί (διαγρ.)</td><td>Οι ήδη δουλεμένοι σταθμοί παραμένουν στη λίστα, με διαγραφή</td></tr>
      <tr><td>Ακολ. διακριτικά</td><td>Διακριτικά που θέλετε να έχετε υπόψη ώστε να μην τα χάσετε όταν εμφανιστούν</td></tr>
      <tr><td>Εξαιρ. προθέματα</td><td>Προθέματα στα οποία ο αυτοματισμός δεν απαντά ποτέ</td></tr>
      <tr><td>Επιτήρηση TX</td><td>Διακοπή της εκπομπής αυτόματα μετά τα καθορισμένα λεπτά (0 = ανενεργό)</td></tr>
      <tr><td>Καμιά απόκριση</td><td>Μετά από N κύκλους χωρίς απάντηση, εγκαταλείπει την κλήση και ψάχνει άλλον σταθμό</td></tr>
      <tr><td>Μέγ. επαναλήψεις 73</td><td>Αν ο ανταποκριτής καλέσει ξανά στο κλείσιμο του QSO, επαναλαμβάνει το RR73 το πολύ N φορές (0 = ανενεργό)</td></tr>
      <tr><td>Λειτουργία αγώνων (ανταλλαγή τετραγώνου)</td><td>Στέλνει <code>R</code> + το τετράγωνό σας αντί για αναφορά σήματος· δείτε <a href="operating.html">«Λειτουργία FT8 / FT4»</a></td></tr>
    </table>`,

  set_radio_title: 'Πομποδέκτης και ήχος',
  set_radio_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Όνομα ασύρματου</td><td>Το μοντέλο του πομποδέκτη σας· καθορίζει ποιο σύνολο εντολών CAT χρησιμοποιεί η εφαρμογή</td></tr>
      <tr><td>Έλεγχος</td><td>Πώς ενεργοποιείται το PTT: VOX / CAT / RTS / DTR</td></tr>
      <tr><td>Τύπος σύνδεσης</td><td>Καλώδιο (USB), Bluetooth ή δίκτυο</td></tr>
      <tr><td>Bit δεδ. / Ισοτιμία / Bit τερματισμού</td><td>Μορφή πλαισίου της σειριακής θύρας· αν το εγχειρίδιο του πομποδέκτη δεν λέει διαφορετικά, το <strong>Προεπ.</strong> τα επαναφέρει</td></tr>
      <tr><td>CI-V</td><td>Διεύθυνση διαύλου CI-V (μόνο πομποδέκτες ICOM)</td></tr>
      <tr><td>Baud</td><td>Ταχύτητα της σειριακής θύρας CAT· πρέπει να ταιριάζει με τη ρύθμιση του πομποδέκτη</td></tr>
      <tr><td>Tx αναμ. <em>(καταργ.)</em></td><td>Αντιστάθμιση χρονισμού της εξόδου ήχου (ms)· η εφαρμογή τη σημειώνει ως καταργημένη και μπορεί να μείνει ως έχει</td></tr>
      <tr><td>PTT καθυστέρηση</td><td>Πόσα χιλιοστά του δευτερολέπτου να περιμένει μετά το PTT πριν στείλει ήχο. Αυξήστε το αν ο πομποδέκτης αργεί να περάσει σε εκπομπή</td></tr>
      <tr><td>Freq.</td><td>Η προεπιλεγμένη συχνότητα ήχου εκπομπής (0–2900 Hz)</td></tr>
      <tr><td>Κλείδ. TX=RX / Tx/Rx χωρ.</td><td>Δύο καταστάσεις του ίδιου διακόπτη: ενεργό, η συχνότητα εκπομπής ακολουθεί τον σταθμό με τον οποίο δουλεύετε· ανενεργό, εκπομπή και λήψη χρησιμοποιούν χωριστές συχνότητες</td></tr>
      <tr><td>Βάθος bit</td><td>Έξοδος ήχου 16 bit ακέραιου ή 32 bit κινητής υποδιαστολής</td></tr>
      <tr><td>Ρυθμός δειγμ.</td><td>12 kHz (προεπιλογή), 24 kHz ή 48 kHz</td></tr>
      <tr><td>Ειδοποίηση SWR/ALC</td><td>Προειδοποιεί όταν το SWR ή το ALC ξεπερνούν τα ασφαλή όρια· ανενεργό εμφανίζεται ως «(X) Χωρίς ειδοπ. SWR/ALC»</td></tr>
      <tr><td>Απολαβή ήχου λήψης</td><td>Ενισχύει ή εξασθενεί τον ήχο λήψης μέσα στην εφαρμογή. Χρήσιμο όταν η στάθμη εξόδου του ίδιου του πομποδέκτη δεν αλλάζει: ο QMX δίνει σταθερή στάθμη μέσω USB και στους ICOM η στάθμη USB βρίσκεται στο μενού SET και όχι στο κουμπί AF</td></tr>
    </table>`,

  set_services_title: 'Μεταφόρτωση σε υπηρεσίες',
  set_services_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Αυτόματη αποστολή σε QRZ.com</td><td>Στέλνει τα ολοκληρωμένα QSO απευθείας στο ημερολόγιό σας στο QRZ.com</td></tr>
      <tr><td>Api_key QRZ.com</td><td>Λαμβάνεται από τις ρυθμίσεις Logbook στο QRZ.com· το διπλανό <strong>Δοκιμή</strong> επιβεβαιώνει ότι το κλειδί λειτουργεί</td></tr>
      <tr><td>Αποστολή</td><td>Μαζική αποστολή υπαρχουσών εγγραφών για επιλεγμένο εύρος ημερομηνιών</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Διεύθυνση διακομιστή, κλειδί API και ID σταθμού, καθώς και δοκιμή σύνδεσης· δείτε <a href="third-party.html">«Εξωτερικές υπηρεσίες»</a></td></tr>
      <tr><td>Spot σε PSK Reporter</td><td>Υποβάλλει αναφορές λήψης ανώνυμα στον χάρτη διάδοσης· δεν απαιτείται λογαριασμός</td></tr>
      <tr><td>Κεραία</td><td>Περιγραφή της κεραίας σας (<code>Dipole</code>, <code>Vertical</code>…) που στέλνεται μαζί με τα spot στο PSK Reporter. Είναι περιγραφικό κείμενο για τον χάρτη και <strong>δεν</strong> αλλάζει υποδοχή κεραίας στον πομποδέκτη</td></tr>
      <tr><td>FREE TEXT</td><td>Ένα ελεύθερο κείμενο ετοιμασμένο από πριν. Το παρατεταμένο πάτημα στο κουμπί CQ στην καρτέλα κλήσης μπαίνει σε λειτουργία ελεύθερου κειμένου και το συμπληρώνει — βολικό για το SOTAmat</td></tr>
    </table>`,

  set_activation_title: 'Ενεργοποίηση SOTA / POTA',
  set_activation_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Λειτουργία ενεργοποίησης (καταγραφή αναφορών στο log)</td><td>Όταν είναι ενεργή, η αναφορά SOTA / POTA σας γράφεται σε κάθε καταχωρημένο QSO</td></tr>
      <tr><td>Το SOTA μου</td><td>Η κορυφή που ενεργοποιείτε, π.χ. <code>BV/TP-001</code></td></tr>
      <tr><td>Το POTA μου</td><td>Το πάρκο που ενεργοποιείτε, π.χ. <code>TW-0001</code>. Από κάτω εμφανίζονται το όνομα του πάρκου και το τετράγωνο που βρέθηκαν, ώστε να ελέγξετε την αναφορά</td></tr>
      <tr><td>+ Προσθήκη πάρκου</td><td>Το ίδιο σημείο συχνά ανήκει σε πολλά πάρκα ταυτόχρονα (n-fer). Μπορείτε να εισαγάγετε έως <strong>6</strong>· κάθε γραμμή έχει το δικό της κουμπί διαγραφής</td></tr>
    </table>
    <p>Με δύο ή περισσότερα πάρκα, η εξαγωγή αλλάζει σε <strong>ένα ADIF ανά πάρκο, συσκευασμένα σε ZIP</strong>: η καθιερωμένη πρακτική στο POTA είναι ένα ημερολόγιο ανά πάρκο, που ανεβαίνει χωριστά, και πολλές αναφορές στο ίδιο πεδίο δεν γίνονται δεκτές. Με ένα μόνο πάρκο, η εξαγωγή παραμένει ένα αρχείο.</p>`,

  set_display_title: 'Εμφάνιση και θέμα',
  set_display_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Θέμα</td><td>Σύμφωνα με τη συσκευή, ανοιχτό ή σκούρο</td></tr>
      <tr><td>Λειτουργία μηνυμάτων</td><td>Η λίστα αποκωδικοποίησης σε διάταξη <strong>Τυπική</strong> (πλήρη στοιχεία ανά γραμμή) ή <strong>Απλή</strong> (μία συμπαγής γραμμή)</td></tr>
      <tr><td>Μέγεθος γραμμ.</td><td>Μέγεθος κειμένου στις λίστες αποκωδικοποίησης και ημερολογίου</td></tr>
      <tr><td>Διατήρηση οθόνης αναμμένης</td><td>Εμποδίζει την οθόνη να σβήνει κατά τη λειτουργία</td></tr>
      <tr><td>Mini καταρράκτης στην Αποκωδικοπ. / Κλήση</td><td>Εμφανίζει μια συμπαγή λωρίδα καταρράκτη και στις δύο καρτέλες· δύο ανεξάρτητοι διακόπτες</td></tr>
      <tr><td>Χρωματικό σχήμα καταρράκτη</td><td>Κλασικό ή ουράνιο τόξο για το φάσμα και τον καταρράκτη</td></tr>
      <tr><td>Επιτυχία QSO: αναλαμπή / κυματισμός / φακός / φωτογραφία QRZ</td><td>Τέσσερις ανεξάρτητοι τρόποι να ανακοινωθεί ένα ολοκληρωμένο QSO· δείτε <a href="logging.html">«Ημερολόγιο επαφών»</a></td></tr>
      <tr><td>Εμφάνιση αιωρούμενου παραθύρου</td><td>Ο γενικός διακόπτης του αιωρούμενου μενού συντομεύσεων</td></tr>
      <tr><td>Τα επιμέρους κουμπιά του αιωρούμενου παραθύρου</td><td>Απόκρυψη κάτω μενού, συχνότητα, ένταση, χάρτης τετραγώνων, εργαλεία πομποδέκτη, φάρος WSPR, συνομιλία JS8 και γρήγορη αλλαγή λειτουργίας — οκτώ κουμπιά, καθένα εμφανίζεται ή κρύβεται ξεχωριστά</td></tr>
      <tr><td>Γλώσσα</td><td>Η γλώσσα του περιβάλλοντος, ανεξάρτητη από τη ρύθμιση του συστήματος</td></tr>
    </table>`,

  set_backup_title: 'Αντίγραφα ασφαλείας',
  set_backup_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Αυτόματο αντίγραφο κατά την εκκίνηση</td><td>Δημιουργεί αντίγραφο της βάσης του ημερολογίου όταν ξεκινά η εφαρμογή</td></tr>
      <tr><td>Διάστημα (ημέρες)</td><td>Πόσο να περιμένει μέχρι το επόμενο αυτόματο αντίγραφο</td></tr>
      <tr><td>Διατήρηση εκδόσεων</td><td>Πόσα παλαιότερα αντίγραφα να κρατά· τα επιπλέον διαγράφονται ξεκινώντας από τα παλαιότερα</td></tr>
      <tr><td>Επιλογή φακέλου αντιγράφων ασφαλείας</td><td>Πού γράφονται τα αρχεία· επιλέξτε φάκελο με συγχρονισμό στο cloud και το αντίγραφο θα βρίσκεται και εκτός τηλεφώνου</td></tr>
      <tr><td>Αντίγραφο τώρα / Επαναφορά αντιγράφου</td><td>Δημιουργήστε αντίγραφο αμέσως ή εντοπίστε και επαναφέρετε ένα παλαιότερο</td></tr>
      <tr><td>Καθαρισμός μνήμης</td><td>Διαγράφει ξεχωριστά τα <strong>ακολουθούμενα διακριτικά</strong>, τα <strong>αποκωδ. μην.</strong> και τα <strong>αποκωδικοποιημένα QSO</strong></td></tr>
      <tr><td>Διαγραφή προσωρινών</td><td>Διαγράφει τα προσωρινά αρχεία που δημιουργούνται κατά την κοινοποίηση του ημερολογίου</td></tr>
      <tr><td>Εκκαθ. QSO</td><td>Μηδενίζει τον μετρητή QSO της τρέχουσας συνεδρίας</td></tr>
    </table>`,

  set_advanced_title: 'Για προχωρημένους',
  set_advanced_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Συσκευή ήχου</td><td>Δείχνει από ποια συσκευή γίνεται στην πραγματικότητα η εγγραφή (ενσωματωμένο μικρόφωνο ή κάρτα ήχου USB) και με ποιον ρυθμό δειγματοληψίας. Αν βρέθηκε συσκευή USB αλλά δεν ήταν δυνατή η δρομολόγηση της εγγραφής σε αυτήν, αναφέρεται ρητά ότι η εγγραφή συνεχίζει από το ενσωματωμένο μικρόφωνο</td></tr>
      <tr><td>Νέος εντοπισμός</td><td>Πατήστε το αφού συνδέσετε κάρτα ήχου USB (π.χ. Digirig) για να περάσετε σε αυτήν χωρίς επανεκκίνηση της εφαρμογής. Η σύνδεση συνήθως εντοπίζεται αυτόματα· αυτό το κουμπί είναι η εναλλακτική λύση</td></tr>
      <tr><td>API προγραμματιστή (για πρόσθετα)</td><td>Ανοίγει στο τηλέφωνο μια διεπαφή HTTP ώστε άλλα προγράμματα στο ίδιο δίκτυο να διαβάζουν αποκωδικοποιήσεις, ημερολόγιο και φάσμα. Μόλις ενεργοποιηθεί εμφανίζεται η διεύθυνση πρόσβασης</td></tr>
      <tr><td>Διακριτικό μόνο για ανάγνωση</td><td>Διαπιστευτήριο μόνο για ανάγνωση· μπορεί να <strong>αντιγραφεί</strong> και να <strong>αναδημιουργηθεί</strong></td></tr>
      <tr><td>Διακριτικό πλήρους πρόσβασης</td><td>Διαπιστευτήριο που επιτρέπει τον έλεγχο της εφαρμογής — <strong>μην το κοινοποιείτε</strong>. Η αναδημιουργία ακυρώνει αμέσως το παλιό</td></tr>
      <tr><td>Να επιτρέπεται ο απομακρυσμένος έλεγχος εκπομπής</td><td>Επιτρέπει σε πρόγραμμα με το διακριτικό πλήρους πρόσβασης να ξεκινά και να σταματά την εκπομπή από άλλη συσκευή. Αν δεν χρειάζεστε απομακρυσμένη εκπομπή, αφήστε το ανενεργό</td></tr>
    </table>`,
},

}; /* end PAGE_T */
