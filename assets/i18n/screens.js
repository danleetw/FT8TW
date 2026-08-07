/* ── FT8TW User Manual – i18n: Main Screens ──────────────────────── */

const PAGE_T = {

en: {
  screens_title: 'Main Screens',
  screens_intro: 'The bottom navigation bar gives access to the main operating tabs. Additional screens for JS8, WSPR, SSB, and the grid tracker are described in their own sections below.',

  screens_decode_title:       'Decode Tab',
  screens_decode_text:        'The app\'s default screen on launch, and its primary operating screen. Shows every decoded FT8/FT4 message from the current cycle in chronological order. Stations calling CQ are highlighted; tap a row to select that station as your call target. Each row shows callsign, signal level (dB), time offset (Δt), audio frequency (Hz), Maidenhead grid, distance, and country/location.',
  screens_decode_modes_label: 'List display modes:',
  screens_decode_modes: `
    <ul>
      <li><strong>Standard</strong> – Full details per row</li>
      <li><strong>Simple</strong> – Compact, single-line layout</li>
    </ul>
    <p>Decode sensitivity (Fast / Standard / Deep) is a separate setting — see <a href="settings.html">Settings Reference</a>.</p>`,

  screens_timebar_title: 'Timing Bar',
  screens_timebar_text:  'The thin progress bar across the very top of the screen follows the UTC timing cycle, so you can see at a glance where you are within the slot. Its <strong>colour tells you whether audio is being received</strong>: <strong>yellow</strong> means recording is running, <strong>grey</strong> means it has stopped — the bar keeps moving either way, and the colour says plainly which of the two is happening. During your own transmit slot the bar\'s background changes colour as well.',

  screens_level_title: 'Input Level',
  screens_level_text:  'The status bar shows how loud the radio audio is by the time it reaches the app — what the decoder actually sees. Too loud clips and distorts; too quiet lets quantisation noise take a bigger share. Neither announces itself: both simply show up as a poor decode rate. The reading turns colour when it drifts out of range, and tapping it opens a fuller explanation. Alongside the average level it also tracks peaks, so brief overloads that an average would hide still show up; a warning that you have already dealt with can be collapsed out of the way.',
  screens_level_note: 'A useful working range is roughly <strong>−45 to −18 dBFS RMS</strong>. Too high — turn down the AF or DATA output on the radio, or the input gain of the audio interface; too low — turn it up the same way. The exact boundaries vary between radios, phones and USB codecs, so treat the numbers as a guide and judge by whether decoding is reliable. No level is shown during transmit slots or in acoustic mode, where the reading would be misleading.',

  screens_level_caption: 'The status bar showing the input level; here it reads too low, so the value is highlighted. (Screenshot shows the Traditional Chinese interface.)',
  screens_miniwf_title: 'Mini Waterfall',
  screens_miniwf_text:  'A compact waterfall strip can be shown on the Decode and Calling tabs, so you can watch band activity without leaving the list for the full Spectrum screen. Each tab has its own switch in Settings.',

  screens_calling_title: 'Calling Tab',
  screens_calling_text:  'Your transmit control panel. Displays the current target callsign, TX audio frequency, cycle sequence counter, and QSO/message counts. Start and stop transmitting from this tab.',
  screens_calling_features: `
    <ul>
      <li><strong>TX Freq</strong> – Your transmit audio frequency in Hz (valid range: 0–2900 Hz; default 1500 Hz)</li>
      <li><strong>Locked TX=RX</strong> – TX frequency follows the selected station's frequency</li>
      <li><strong>Tx/Rx Split</strong> – TX and RX use independent frequencies</li>
      <li><strong>CQ Modifier</strong> – Append a geographic or activity modifier to your CQ (e.g., <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Free Text</strong> – Send a custom free-text message (max 13 characters)</li>
      <li><strong>Auto response CQ</strong> – Automatically reply to CQ calls; configure priority in Settings</li>
    </ul>`,

  screens_spectrum_title: 'Spectrum Tab',
  screens_spectrum_text:  'A live waterfall and spectrum of the received audio; your own signal is shown while transmitting too. Two switches sit at the bottom of the screen:',
  screens_spectrum_list: `
    <ul>
      <li><strong>DeNoise</strong> — suppresses broadband noise so weak signals stand out on the waterfall.</li>
      <li><strong>Mark messages</strong> — labels each decoded message on the waterfall at its own frequency.</li>
    </ul>
    <p>Both switches are remembered across restarts, and every waterfall in the app — including the mini waterfall strips on the other tabs — shares the same setting. If you would rather not see the two buttons on the waterfall at all, they can be hidden from the display adjustment panel below.</p>`,

  screens_wfadjust_title: 'Waterfall Display Adjustment',
  screens_wfadjust_text:  '<strong>Long-press the waterfall</strong> to bring up the "Waterfall display adjustment" panel. The app normally tracks the noise floor automatically to decide the shading; this panel is how you take over when that automatic tracking does not suit the conditions in front of you:',
  screens_wfadjust_list: `
    <ul>
      <li><strong>Zero (black level)</strong> — drag right to push more of the background noise down to black.</li>
      <li><strong>Contrast</strong> — drag right to widen the difference between weak and strong signals.</li>
      <li><strong>Auto</strong> — hand the decision back to the app.</li>
      <li><strong>Show the DeNoise / Mark messages buttons</strong> — turn this off and the two buttons disappear from the waterfall, leaving a cleaner display. The change takes effect immediately.</li>
      <li><strong>Copy diagnostics</strong> — copies the current levels and gain figures to the clipboard, to attach to a report about the display.</li>
    </ul>`,

  screens_logs_title: 'QSO Logs Tab',
  screens_logs_text:  'A chronological list of all completed QSOs. Each entry shows callsign, band, mode, date/time (UTC), grid, RST reports, and confirmation status (Unconfirmed / LoTW / QRZ / Manual). Tap an entry to view full details or confirm the contact.',

  screens_settings_title: 'Settings Tab',
  screens_settings_text:  'All configuration options for your station, radio interface, decoding, logging, and third-party integrations. See the Settings Reference section for a complete list.',

  screens_more_title: 'Other Screens',
  screens_more_text:  'Beyond the core FT8/FT4 tabs, FT8TW includes several additional screens, accessible from the navigation menu or the floating shortcut window:',
  screens_more_list: `
    <ul>
      <li><strong>Spectrum</strong> – Live waterfall and spectrum display of the receive audio, with adjustable color scheme and noise-floor-anchored contrast; also shows your own transmit audio during TX. A display adjustment panel adds <strong>Contrast</strong> and <strong>Reference (black level)</strong> sliders for when the automatic tracking does not suit the conditions; <strong>Auto</strong> hands control back.</li>
      <li><strong>JS8</strong> – Chat-style conversation screen for JS8 mode. See the <a href="js8.html">JS8 Chat Mode</a> section.</li>
      <li><strong>WSPR</strong> – Beacon scheduling screen for WSPR mode. See the <a href="wspr.html">WSPR Beacon</a> section.</li>
      <li><strong>Radio Tool</strong> – Radio microphone, receive monitor and antenna tuning. See the <a href="ssb.html">Radio Tool</a> section.</li>
      <li><strong>Grid Tracker</strong> – Full-screen map view. See the <a href="gridtracker.html">Grid Tracker</a> section.</li>
      <li><strong>Count</strong> – QSO statistics: totals by band, mode, DXCC, ITU/CQ zone, and time period.</li>
      <li><strong>QRZ.com Lookup</strong> – Embedded QRZ.com callsign lookup for the currently selected station.</li>
      <li><strong>Floating Window</strong> – An optional always-on-top overlay with quick-access buttons (frequency, volume, grid tracker, and more), independently toggleable per button in Settings.</li>
    </ul>`,
},

'zh-TW': {
  screens_title: '主要畫面',
  screens_intro: '底部導覽列可切換主要操作分頁；JS8、WSPR、SSB 及網格追蹤地圖等畫面在下方各有獨立章節說明。',

  screens_decode_title:       '解碼（Decode）',
  screens_decode_text:        'App 開啟後預設顯示的主要操作畫面。依時序顯示目前週期內解碼到的所有 FT8/FT4 訊息，正在呼叫 CQ 的電台會特別標示，點選任一列即可選定為呼叫目標。每一列顯示呼號、訊號強度（dB）、時間偏差（Δt）、音訊頻率（Hz）、Maidenhead 網格、距離及國家地點。',
  screens_decode_modes_label: '清單顯示模式：',
  screens_decode_modes: `
    <ul>
      <li><strong>標準</strong> — 每列顯示完整資訊</li>
      <li><strong>精簡</strong> — 單行精簡版面</li>
    </ul>
    <p>解碼靈敏度（快速 / 標準 / 多次）是另一項獨立設定，詳見<a href="settings.html">「設定說明」</a>。</p>`,

  screens_timebar_title: '時序計時條',
  screens_timebar_text:  '畫面最上方那條細長的進度條走的是 UTC 時序，一個週期走完一次，讓您一眼看出目前落在時隙的哪個位置。它的<strong>顏色代表是否正在接收</strong>：<strong>黃色</strong>表示正在錄音收訊，<strong>灰色</strong>表示錄音已停止——計時條照跑但沒有在收，顏色會直接講明白，不會讓人誤以為還在接收。輪到自己發射的時段，整條的底色會另外變色標示。',

  screens_level_title: '輸入電平',
  screens_level_text:  '狀態列會顯示電台音訊傳到 App 時的音量大小，也就是解碼器實際看到的訊號。一切正常時顯示為 <strong>RX －○○dB</strong>；<strong>RX</strong> 是刻意加上去的，用來表示這是<em>接收</em>端的電平，與發射功率無關。超出合理範圍時會改成講明白的字樣，例如<strong>「接收電平太小」</strong>或<strong>「接收峰值逼近滿刻度」</strong>，並以警示色顯示。太大會削峰失真，太小則讓量化雜訊佔掉更多比例。這兩種情況都不會主動報錯，只會表現為解碼率變差。數值超出合理範圍時會變色，點一下可展開完整說明。除了平均電平，也會一併量測峰值，因此被平均值掩蓋的瞬間過載一樣看得到；已經處理過的警示可以收合起來。',
  screens_level_note: '合用的範圍大約是 <strong>−45 至 −18 dBFS RMS</strong>。太高就把電台的 AF 或 DATA 輸出調小，或降低音效介面的輸入增益；太低則反向調大。實際邊界會因電台、手機與 USB 音效晶片而異，所以請把數字當成參考，最終仍以解碼是否穩定為準。發射時段與聲學（喇叭麥克風）模式下不顯示數值，因為那時的讀數會誤導人。',

  screens_level_caption: '狀態列上的輸入電平。數值前的 RX 表示這是接收端的電平；圖中的讀數偏低，因此以警示色顯示並加上 ⚠。',
  screens_miniwf_title: '小瀑布圖',
  screens_miniwf_text:  '解碼與呼叫兩個分頁都可以顯示一條精簡的瀑布圖，讓您不必離開清單切到完整的頻譜畫面，也能看到波段上的活動。兩個分頁在設置中各有獨立開關。',

  screens_calling_title: '呼叫（Calling）',
  screens_calling_text:  '發射控制面板，顯示目標呼號、發射音訊頻率、週期序號計數及 QSO / 訊息數量。在此頁面啟動及停止發射。',
  screens_calling_features: `
    <ul>
      <li><strong>發射頻率（TX Freq）</strong> — 發射音訊頻率（有效範圍：0–2900 Hz，預設 1500 Hz）</li>
      <li><strong>同頻發射</strong> — 發射頻率跟隨選定電台的接收頻率</li>
      <li><strong>異頻發射</strong> — 發射與接收使用各自獨立的頻率</li>
      <li><strong>CQ 對象</strong> — 在 CQ 呼叫後附加地理或活動修飾詞（如 <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>自定義訊息</strong> — 發送最多 13 個字元的自由文字</li>
      <li><strong>自動回應 CQ</strong> — 自動回應收到的 CQ，優先策略可在設置中設定</li>
    </ul>`,

  screens_spectrum_title: '頻譜（Spectrum）',
  screens_spectrum_text:  '即時顯示接收音訊的瀑布圖與頻譜；發射時也會顯示自己送出去的訊號。畫面下方有兩顆開關：',
  screens_spectrum_list: `
    <ul>
      <li><strong>噪聲抑制</strong> — 壓低寬頻雜訊，弱訊號在瀑布圖上更容易看出來。</li>
      <li><strong>標記訊息</strong> — 在瀑布圖上標出各筆解碼訊息的位置與內容。</li>
    </ul>
    <p>兩顆開關的狀態會被記住，重開 App 後維持不變，而且全 App 的頻譜畫面（含各分頁的小瀑布圖）共用同一份設定。若不想在瀑布圖上看到這兩顆按鈕，可在下面的顯示調整面板中把它們關掉。</p>`,

  screens_wfadjust_title: '瀑布圖顯示調整',
  screens_wfadjust_text:  '<strong>長按瀑布圖</strong>會叫出「瀑布圖顯示調整」面板。程式平常會自動追蹤雜訊地板來決定明暗，這個面板是在自動追蹤不合當下現場狀況時，讓您自己接手：',
  screens_wfadjust_list: `
    <ul>
      <li><strong>基準（黑色位準）</strong> — 往右拉，把更多背景雜訊壓成黑色。</li>
      <li><strong>對比</strong> — 往右拉，強弱訊號之間的差異更明顯。</li>
      <li><strong>自動</strong> — 交回給程式自動決定。</li>
      <li><strong>顯示「噪聲抑制／標記訊息」按鈕</strong> — 關掉之後瀑布圖上就看不到那兩顆按鈕，畫面更乾淨；切換後立刻生效，不必重進頁面。</li>
      <li><strong>複製診斷資訊</strong> — 把目前的位準、增益等內部數值複製到剪貼簿，回報顯示相關問題時可一併附上。</li>
    </ul>`,

  screens_logs_title: '通聯記錄（QSO Logs）',
  screens_logs_text:  '依時序顯示所有已完成的通聯記錄。每筆包含呼號、頻段、模式、UTC 時間、網格、RST 報告及確認狀態（未確認 / LoTW / QRZ / 手工確認）。點選記錄可查看詳情或確認通聯。',

  screens_settings_title: '設置（Settings）',
  screens_settings_text:  '包含電台資訊、電台連線、解碼、日誌、第三方整合等所有設定選項。詳細說明請參閱「設定說明」章節。',

  screens_more_title: '其他畫面',
  screens_more_text:  '除了核心的 FT8/FT4 分頁之外，FT8TW 還有下列畫面，可從導覽選單或浮動快捷視窗開啟：',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — JS8 模式的聊天式對話畫面，詳見<a href="js8.html">「JS8 聊天模式」</a>章節。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信標排程畫面，詳見<a href="wspr.html">「WSPR 信標」</a>章節。</li>
      <li><strong>電台工具</strong> — 電台麥克風、收訊監聽與天線調諧，詳見<a href="ssb.html">「電台工具」</a>章節。</li>
      <li><strong>網格追蹤（Grid Tracker）</strong> — 全螢幕地圖畫面，詳見<a href="gridtracker.html">「網格追蹤地圖」</a>章節。</li>
      <li><strong>統計（Count）</strong> — 依頻段、模式、DXCC、ITU/CQ 分區及時間區間統計 QSO 數量。</li>
      <li><strong>QRZ.com 查詢</strong> — 內嵌 QRZ.com 呼號查詢，顯示目前選定電台的資料。</li>
      <li><strong>浮動視窗</strong> — 可選的常駐懸浮功能表，共八顆快捷按鈕：隱藏底部選單、頻率調整、音量調整、網格追蹤、電台工具、WSPR 信標、JS8 聊天，以及<strong>快速切換模式</strong>（一鍵在 FT8／FT4／FT2／JS8／WSPR 之間切換）。每顆都可在設置中個別開關。<strong>長按</strong>浮動選單可把它收合成單一按鈕，需要時再長按展開；收合狀態會維持到 App 結束為止。</li>
    </ul>`,
},

'zh-CN': {
  screens_title: '主要界面',
  screens_intro: '底部导航栏可切换主要操作分页；JS8、WSPR、SSB 及网格追踪地图等界面在下方各有独立章节说明。',

  screens_decode_title:       '解码（Decode）',
  screens_decode_text:        'App 打开后默认显示的主要操作界面。按时序显示当前周期内解码到的所有 FT8/FT4 消息，正在呼叫 CQ 的电台会特别标示，点击任一行即可选定为呼叫目标。每一行显示呼号、信号强度（dB）、时间偏差（Δt）、音频频率（Hz）、Maidenhead 网格、距离及国家地点。',
  screens_decode_modes_label: '列表显示模式：',
  screens_decode_modes: `
    <ul>
      <li><strong>标准</strong> — 每行显示完整信息</li>
      <li><strong>精简</strong> — 单行精简版面</li>
    </ul>
    <p>解码灵敏度（快速 / 标准 / 多次）是另一项独立设置，详见<a href="settings.html">「设置说明」</a>。</p>`,

  screens_level_title: '输入电平',
  screens_level_text:  '状态栏会显示电台音频传到 App 时的音量大小，也就是解码器实际看到的信号。太大会削峰失真，太小则让量化噪声占掉更多比例。这两种情况都不会主动报错，只会表现为解码率变差。数值超出合理范围时会变色，点一下可展开完整说明。除了平均电平，也会一并测量峰值，因此被平均值掩盖的瞬间过载一样看得到；已经处理过的警示可以收起来。',
  screens_level_note: '合用的范围大约是 <strong>−45 至 −18 dBFS RMS</strong>。太高就把电台的 AF 或 DATA 输出调小，或降低音频接口的输入增益；太低则反向调大。实际边界会因电台、手机与 USB 音频芯片而异，所以请把数字当成参考，最终仍以解码是否稳定为准。发射时隙与声学（扬声器麦克风）模式下不显示数值，因为那时的读数会误导人。',

  screens_level_caption: '状态栏上的输入电平；图中正处于过低的状态，因此数值被特别标示。（截图为繁体中文界面。）',
  screens_miniwf_title: '小瀑布图',
  screens_miniwf_text:  '解码与呼叫两个分页都可以显示一条精简的瀑布图，让您不必离开列表切到完整的频谱界面，也能看到波段上的活动。两个分页在设置中各有独立开关。',

  screens_calling_title: '呼叫（Calling）',
  screens_calling_text:  '发射控制面板，显示目标呼号、发射音频频率、周期序号计数及 QSO / 消息数量。在此页面启动及停止发射。',
  screens_calling_features: `
    <ul>
      <li><strong>发射频率（TX Freq）</strong> — 发射音频频率（有效范围：0–2900 Hz，默认 1500 Hz）</li>
      <li><strong>同频发射</strong> — 发射频率跟随选定电台的接收频率</li>
      <li><strong>异频发射</strong> — 发射与接收使用各自独立的频率</li>
      <li><strong>CQ 对象</strong> — 在 CQ 呼叫后附加地理或活动修饰词（如 <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>自定义消息</strong> — 发送最多 13 个字符的自由文本</li>
      <li><strong>自动回应 CQ</strong> — 自动回应收到的 CQ，优先策略可在设置中设定</li>
    </ul>`,

  screens_logs_title: '通联日志（QSO Logs）',
  screens_logs_text:  '按时序显示所有已完成的通联记录。每条包含呼号、频段、模式、UTC 时间、网格、RST 报告及确认状态（未确认 / LoTW / QRZ / 手工确认）。点击记录可查看详情或确认通联。',

  screens_settings_title: '设置（Settings）',
  screens_settings_text:  '包含电台信息、电台连接、解码、日志、第三方集成等所有设置选项。详细说明请参阅「设置说明」章节。',

  screens_more_title: '其他界面',
  screens_more_text:  '除了核心的 FT8/FT4 分页之外，FT8TW 还有下列界面，可从导航菜单或悬浮快捷窗口打开：',
  screens_more_list: `
    <ul>
      <li><strong>频谱（Spectrum）</strong> — 实时显示接收音频的瀑布图与频谱，色阶可切换，黑点锚定噪声基底以维持对比；发射时也会显示自己的发射音频。另有「瀑布图显示调整」面板，在自动跟踪不适合当下现场状况时，可手动调<strong>对比</strong>与<strong>基准（黑色电平）</strong>；按<strong>自动</strong>即可交回给程序。</li>
      <li><strong>JS8</strong> — JS8 模式的聊天式对话界面，详见<a href="js8.html">「JS8 聊天模式」</a>章节。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信标计划界面，详见<a href="wspr.html">「WSPR 信标」</a>章节。</li>
      <li><strong>电台工具</strong> — 电台麦克风、收听监听与天线调谐，详见<a href="ssb.html">「电台工具」</a>章节。</li>
      <li><strong>网格追踪（Grid Tracker）</strong> — 全屏地图界面，详见<a href="gridtracker.html">「网格追踪地图」</a>章节。</li>
      <li><strong>统计（Count）</strong> — 按频段、模式、DXCC、ITU/CQ 分区及时间区间统计 QSO 数量。</li>
      <li><strong>QRZ.com 查询</strong> — 内嵌 QRZ.com 呼号查询，显示当前选定电台的资料。</li>
      <li><strong>悬浮窗口</strong> — 可选的常驻悬浮菜单（频率、音量、网格追踪等快捷按钮），每个按钮可在设置中单独开关。</li>
    </ul>`,
},

'ja': {
  screens_title: '主な画面',
  screens_intro: '画面下部のナビゲーションバーから主要な操作タブに移動できます。JS8、WSPR、SSB、グリッドトラッカーの画面については、それぞれ後の章で説明します。',

  screens_decode_title:       'デコードタブ',
  screens_decode_text:        '起動時に最初に表示される、いちばんよく使う画面です。今のサイクルでデコードした FT8/FT4 の電文を時系列で表示します。CQ を出している局は強調表示され、行をタップするとその局を呼び出し相手に指定できます。各行にはコールサイン、信号強度（dB）、時間差（Δt）、音声周波数（Hz）、Maidenhead グリッド、距離、国や地域が表示されます。',
  screens_decode_modes_label: '一覧の表示モード:',
  screens_decode_modes: `
    <ul>
      <li><strong>標準</strong> — 1 行に詳細をすべて表示</li>
      <li><strong>簡易</strong> — 1 行にまとめたコンパクト表示</li>
    </ul>
    <p>デコード感度（高速 / 標準 / 多回）は別の設定項目です。<a href="settings.html">設定リファレンス</a>を参照してください。</p>`,

  screens_level_title: '入力レベル',
  screens_level_text:  'ステータスバーには、無線機の音声がアプリに届いた時点での大きさ、つまりデコーダーが実際に見ている信号のレベルが表示されます。大きすぎるとクリップして歪み、小さすぎると量子化ノイズの割合が増えます。どちらもエラーとしては現れず、デコード率の低下という形でしか分かりません。適正範囲から外れると表示色が変わり、タップすると詳しい説明が開きます。平均レベルだけでなくピークも見ているため、平均では埋もれてしまう瞬間的な過入力も分かります。対処済みの警告はたたんでおけます。',
  screens_level_note: '目安となる範囲はおよそ <strong>−45〜−18 dBFS RMS</strong> です。大きすぎる場合は無線機の AF または DATA 出力を絞るか、オーディオインターフェースの入力ゲインを下げます。小さすぎる場合は逆に上げます。実際の境目は無線機・スマートフォン・USB コーデックによって変わるため、数値は目安と考え、最終的にはデコードが安定しているかどうかで判断してください。送信スロット中と音響（スピーカーとマイク）モードでは、読み取り値が誤解を招くため表示されません。',

  screens_level_caption: 'ステータスバーの入力レベル。ここでは低すぎる状態のため、値が強調表示されています。（スクリーンショットは繁体字中国語の画面です。）',
  screens_miniwf_title: 'ミニウォーターフォール',
  screens_miniwf_text:  'デコードタブと呼び出しタブには小さなウォーターフォールを表示できます。一覧から離れてスペクトラム画面へ移らなくてもバンドの状況が分かります。タブごとに設定で個別に切り替えられます。',

  screens_calling_title: '呼び出しタブ',
  screens_calling_text:  '送信の操作パネルです。現在の相手局、送信音声周波数、サイクルのシーケンス番号、交信数と電文数を表示します。送信の開始と停止もこのタブで行います。',
  screens_calling_features: `
    <ul>
      <li><strong>送信周波数（TX Freq）</strong> — 送信音声周波数（有効範囲 0〜2900 Hz、既定 1500 Hz）</li>
      <li><strong>同一周波数送信</strong> — 選んだ局の受信周波数に送信周波数を合わせます</li>
      <li><strong>スプリット送信</strong> — 送信と受信で別々の周波数を使います</li>
      <li><strong>CQ の対象</strong> — CQ に地域や運用の識別語を付けます（例: <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>フリーテキスト</strong> — 最大 13 文字の自由な電文を送ります</li>
      <li><strong>CQ 自動応答</strong> — 受信した CQ に自動応答します。優先条件は設定で指定します</li>
    </ul>`,

  screens_logs_title: '交信ログタブ',
  screens_logs_text:  '完了した交信を時系列で一覧表示します。各項目にはコールサイン、バンド、モード、日時（UTC）、グリッド、RST レポート、確認状況（未確認 / LoTW / QRZ / 手動）が表示されます。項目をタップすると詳細の確認や交信の確認ができます。',

  screens_settings_title: '設定タブ',
  screens_settings_text:  '自局情報、無線機インターフェース、デコード、ログ、外部サービス連携など、すべての設定項目があります。詳しい一覧は設定リファレンスの章をご覧ください。',

  screens_more_title: 'その他の画面',
  screens_more_text:  'FT8/FT4 の主要タブのほかに、ナビゲーションメニューまたはフローティングショートカットから開ける画面があります:',
  screens_more_list: `
    <ul>
      <li><strong>スペクトラム</strong> — 受信音声のウォーターフォールとスペクトラムをリアルタイム表示します。配色は切り替え可能で、暗部はノイズフロアを基準にコントラストを保ちます。送信中は自局の送信音声も表示します。自動追従がその場の状況に合わないときのために、<strong>コントラスト</strong>と<strong>基準（黒レベル）</strong>を手動調節できる表示調整パネルがあります。<strong>自動</strong>を押せば元に戻ります。</li>
      <li><strong>JS8</strong> — JS8 モードのチャット画面。<a href="js8.html">JS8 チャットモード</a>の章を参照してください。</li>
      <li><strong>WSPR</strong> — WSPR のビーコン予約画面。<a href="wspr.html">WSPR ビーコン</a>の章を参照してください。</li>
      <li><strong>無線機ツール</strong> — 無線機用マイク、受信音のモニター、アンテナ調整。<a href="ssb.html">無線機ツール</a>の章を参照してください。</li>
      <li><strong>グリッドトラッカー</strong> — 全画面の地図表示。<a href="gridtracker.html">グリッドトラッカー</a>の章を参照してください。</li>
      <li><strong>統計</strong> — バンド、モード、DXCC、ITU/CQ ゾーン、期間ごとの交信数を集計します。</li>
      <li><strong>QRZ.com 検索</strong> — 選択中の局について QRZ.com のコールサイン検索を内蔵表示します。</li>
      <li><strong>フローティングウィンドウ</strong> — 常に手前に表示できる任意のオーバーレイで、周波数・音量・グリッドトラッカーなどのボタンを備えます。ボタンごとに設定で表示/非表示を切り替えられます。</li>
    </ul>`,
},

'ru': {
  screens_title: 'Основные экраны',
  screens_intro: 'Нижняя панель навигации открывает основные рабочие вкладки. Экраны JS8, WSPR, SSB и карты локаторов описаны в отдельных разделах ниже.',

  screens_decode_title:       'Вкладка декодера',
  screens_decode_text:        'Экран, который открывается при запуске, — основной рабочий. Показывает все декодированные сообщения FT8/FT4 текущего цикла в хронологическом порядке. Станции, дающие CQ, выделяются; нажмите на строку, чтобы выбрать станцию для вызова. В строке видны позывной, уровень сигнала (дБ), смещение времени (Δt), звуковая частота (Гц), локатор Maidenhead, расстояние и страна или местность.',
  screens_decode_modes_label: 'Режимы отображения списка:',
  screens_decode_modes: `
    <ul>
      <li><strong>Стандартный</strong> — полные сведения в каждой строке</li>
      <li><strong>Простой</strong> — компактный однострочный вид</li>
    </ul>
    <p>Чувствительность декодирования (быстро / стандарт / глубоко) — отдельная настройка, см. <a href="settings.html">описание настроек</a>.</p>`,

  screens_level_title: 'Уровень входного сигнала',
  screens_level_text:  'В строке состояния показано, насколько громким звук трансивера доходит до приложения, то есть что реально видит декодер. Слишком громкий сигнал ограничивается и искажается, слишком тихий отдаёт большую долю шуму квантования. Ни то, ни другое не объявляет о себе прямо: заметно лишь по ухудшению декодирования. При выходе за пределы показание меняет цвет, а по нажатию открывается подробное пояснение. Кроме среднего уровня отслеживаются и пики, так что короткие перегрузки, которые среднее скрыло бы, всё равно заметны; уже отработанное предупреждение можно свернуть.',
  screens_level_note: 'Рабочий диапазон — примерно <strong>от −45 до −18 dBFS RMS</strong>. Слишком высоко — убавьте выход AF или DATA на трансивере либо входное усиление звукового интерфейса; слишком низко — прибавьте тем же способом. Точные границы зависят от трансивера, телефона и USB-кодека, поэтому считайте числа ориентиром и судите по тому, надёжно ли идёт декодирование. Во время интервалов передачи и в акустическом режиме уровень не показывается: там показание вводило бы в заблуждение.',

  screens_level_caption: 'Строка состояния с уровнем входа; здесь он слишком низкий, поэтому значение выделено. (На снимке — интерфейс на традиционном китайском.)',
  screens_miniwf_title: 'Мини-водопад',
  screens_miniwf_text:  'На вкладках декодера и вызова можно показать узкую полоску водопада, чтобы следить за активностью на диапазоне, не уходя из списка на полноэкранный спектр. У каждой вкладки свой переключатель в настройках.',

  screens_calling_title: 'Вкладка вызова',
  screens_calling_text:  'Панель управления передачей. Показывает текущий позывной корреспондента, звуковую частоту передачи, счётчик циклов и количество QSO и сообщений. Отсюда же передача запускается и останавливается.',
  screens_calling_features: `
    <ul>
      <li><strong>Частота передачи</strong> — звуковая частота передачи в Гц (рабочий диапазон 0–2900 Гц, по умолчанию 1500 Гц)</li>
      <li><strong>TX=RX</strong> — частота передачи следует за частотой выбранной станции</li>
      <li><strong>Раздельные TX/RX</strong> — передача и приём на независимых частотах</li>
      <li><strong>Уточнение CQ</strong> — добавляет к вызову географическое или тематическое уточнение (например, <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Свободный текст</strong> — отправка собственного сообщения (до 13 символов)</li>
      <li><strong>Автоответ на CQ</strong> — автоматический ответ на вызовы CQ; приоритет задаётся в настройках</li>
    </ul>`,

  screens_logs_title: 'Вкладка журнала',
  screens_logs_text:  'Хронологический список всех завершённых связей. В каждой записи видны позывной, диапазон, вид работы, дата и время (UTC), локатор, рапорты RST и статус подтверждения (не подтверждено / LoTW / QRZ / вручную). Нажмите запись, чтобы открыть подробности или подтвердить связь.',

  screens_settings_title: 'Вкладка настроек',
  screens_settings_text:  'Все параметры вашей станции, интерфейса с трансивером, декодирования, журнала и внешних сервисов. Полный перечень — в разделе описания настроек.',

  screens_more_title: 'Другие экраны',
  screens_more_text:  'Помимо основных вкладок FT8/FT4, в FT8TW есть дополнительные экраны, доступные из меню навигации или плавающего окна:',
  screens_more_list: `
    <ul>
      <li><strong>Спектр</strong> — водопад и спектр принимаемого звука в реальном времени, с выбором цветовой схемы и контрастом, привязанным к уровню шума; во время передачи показывает и ваш сигнал. Если автоматика не подходит к условиям, панель настройки отображения даёт ползунки <strong>Контраст</strong> и <strong>Опорный уровень (чёрный)</strong>; кнопка <strong>Авто</strong> возвращает автоматическое слежение.</li>
      <li><strong>JS8</strong> — экран чата для режима JS8. См. раздел <a href="js8.html">Режим чата JS8</a>.</li>
      <li><strong>WSPR</strong> — экран расписания маяка. См. раздел <a href="wspr.html">Маяк WSPR</a>.</li>
      <li><strong>Инструменты трансивера</strong> — микрофон для трансивера, прослушивание приёма и настройка антенны. См. раздел <a href="ssb.html">Инструменты трансивера</a>.</li>
      <li><strong>Карта локаторов</strong> — полноэкранная карта. См. раздел <a href="gridtracker.html">Карта локаторов</a>.</li>
      <li><strong>Статистика</strong> — количество QSO по диапазонам, видам работы, DXCC, зонам ITU/CQ и периодам.</li>
      <li><strong>Поиск на QRZ.com</strong> — встроенный поиск позывного выбранной станции.</li>
      <li><strong>Плавающее окно</strong> — необязательный слой поверх других приложений с кнопками быстрого доступа (частота, громкость, карта локаторов и др.); каждую кнопку можно включить или выключить в настройках.</li>
    </ul>`,
},

'pl': {
  screens_title: 'Główne ekrany',
  screens_intro: 'Dolny pasek nawigacji daje dostęp do głównych zakładek pracy. Ekrany JS8, WSPR, SSB oraz mapy lokatorów opisano w osobnych rozdziałach poniżej.',

  screens_decode_title:       'Zakładka dekodowania',
  screens_decode_text:        'Ekran otwierany po uruchomieniu aplikacji i podstawowy ekran pracy. Pokazuje w kolejności chronologicznej wszystkie zdekodowane wiadomości FT8/FT4 z bieżącego cyklu. Stacje wywołujące CQ są wyróżnione; dotknij wiersza, aby wybrać stację do wywołania. W wierszu widać znak wywoławczy, poziom sygnału (dB), przesunięcie czasu (Δt), częstotliwość akustyczną (Hz), lokator Maidenhead, odległość oraz kraj lub miejsce.',
  screens_decode_modes_label: 'Tryby wyświetlania listy:',
  screens_decode_modes: `
    <ul>
      <li><strong>Standardowy</strong> — pełne dane w każdym wierszu</li>
      <li><strong>Uproszczony</strong> — zwarty układ jednowierszowy</li>
    </ul>
    <p>Czułość dekodowania (szybko / standardowo / głęboko) to osobne ustawienie — zobacz <a href="settings.html">opis ustawień</a>.</p>`,

  screens_level_title: 'Poziom wejściowy',
  screens_level_text:  'Pasek stanu pokazuje, jak głośny jest dźwięk z radia w chwili, gdy dociera do aplikacji — czyli to, co naprawdę widzi dekoder. Za głośny sygnał się obcina i zniekształca, za cichy oddaje większą część szumowi kwantyzacji. Żadne z tego nie zgłasza się samo: objawia się wyłącznie gorszą skutecznością dekodowania. Po wyjściu poza zakres odczyt zmienia kolor, a dotknięcie otwiera pełniejsze wyjaśnienie. Obok poziomu średniego śledzone są też szczyty, więc krótkie przesterowania, które średnia by ukryła, nadal widać; obsłużone ostrzeżenie można zwinąć.',
  screens_level_note: 'Praktyczny zakres to mniej więcej <strong>od −45 do −18 dBFS RMS</strong>. Za wysoko — zmniejsz wyjście AF lub DATA w radiu albo wzmocnienie wejściowe interfejsu audio; za nisko — zwiększ w ten sam sposób. Dokładne granice zależą od radia, telefonu i kodeka USB, więc traktuj liczby orientacyjnie i oceniaj po tym, czy dekodowanie jest niezawodne. W czasie nadawania oraz w trybie akustycznym poziom nie jest pokazywany, bo odczyt byłby mylący.',

  screens_level_caption: 'Pasek stanu z poziomem wejściowym; tutaj jest za niski, więc wartość jest wyróżniona. (Zrzut przedstawia interfejs w chińskim tradycyjnym.)',
  screens_miniwf_title: 'Mały wodospad',
  screens_miniwf_text:  'Na zakładkach dekodowania i wywołania można wyświetlić wąski pasek wodospadu, aby obserwować aktywność w paśmie bez opuszczania listy na rzecz pełnego ekranu widma. Każda zakładka ma własny przełącznik w ustawieniach.',

  screens_calling_title: 'Zakładka wywołania',
  screens_calling_text:  'Panel sterowania nadawaniem. Pokazuje aktualny znak stacji docelowej, częstotliwość akustyczną nadawania, licznik cykli oraz liczbę łączności i wiadomości. Stąd też uruchamia się i zatrzymuje nadawanie.',
  screens_calling_features: `
    <ul>
      <li><strong>Częstotliwość nadawania</strong> — akustyczna częstotliwość nadawania w Hz (zakres 0–2900 Hz, domyślnie 1500 Hz)</li>
      <li><strong>TX=RX</strong> — częstotliwość nadawania podąża za częstotliwością wybranej stacji</li>
      <li><strong>Split TX/RX</strong> — nadawanie i odbiór na niezależnych częstotliwościach</li>
      <li><strong>Dopisek do CQ</strong> — dodaje do wywołania określenie geograficzne lub tematyczne (np. <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Dowolny tekst</strong> — wysyła własną wiadomość (do 13 znaków)</li>
      <li><strong>Automatyczna odpowiedź na CQ</strong> — automatycznie odpowiada na wywołania CQ; priorytet ustawia się w ustawieniach</li>
    </ul>`,

  screens_logs_title: 'Zakładka dziennika',
  screens_logs_text:  'Chronologiczna lista wszystkich zakończonych łączności. Każdy wpis pokazuje znak wywoławczy, pasmo, emisję, datę i godzinę (UTC), lokator, raporty RST oraz status potwierdzenia (niepotwierdzone / LoTW / QRZ / ręcznie). Dotknij wpisu, aby zobaczyć szczegóły lub potwierdzić łączność.',

  screens_settings_title: 'Zakładka ustawień',
  screens_settings_text:  'Wszystkie opcje konfiguracji stacji, interfejsu radia, dekodowania, dziennika i usług zewnętrznych. Pełny wykaz znajduje się w rozdziale z opisem ustawień.',

  screens_more_title: 'Pozostałe ekrany',
  screens_more_text:  'Poza podstawowymi zakładkami FT8/FT4 FT8TW ma kilka dodatkowych ekranów dostępnych z menu nawigacji lub z okna pływającego:',
  screens_more_list: `
    <ul>
      <li><strong>Widmo</strong> — wodospad i widmo odbieranego dźwięku na żywo, z wyborem palety barw i kontrastem odniesionym do poziomu szumów; w czasie nadawania pokazuje także własny sygnał. Gdy automatyka nie pasuje do warunków, panel regulacji obrazu udostępnia suwaki <strong>Kontrast</strong> i <strong>Odniesienie (poziom czerni)</strong>; przycisk <strong>Auto</strong> przywraca automatyczne śledzenie.</li>
      <li><strong>JS8</strong> — ekran rozmowy w trybie JS8. Zobacz rozdział <a href="js8.html">Tryb czatu JS8</a>.</li>
      <li><strong>WSPR</strong> — ekran harmonogramu latarni. Zobacz rozdział <a href="wspr.html">Latarnia WSPR</a>.</li>
      <li><strong>Narzędzia radia</strong> — mikrofon do radia, odsłuch odbioru i strojenie anteny. Zobacz rozdział <a href="ssb.html">Narzędzia radia</a>.</li>
      <li><strong>Mapa lokatorów</strong> — pełnoekranowa mapa. Zobacz rozdział <a href="gridtracker.html">Mapa lokatorów</a>.</li>
      <li><strong>Statystyki</strong> — liczba łączności według pasm, emisji, DXCC, stref ITU/CQ i okresów.</li>
      <li><strong>Wyszukiwanie QRZ.com</strong> — wbudowane wyszukiwanie znaku wybranej stacji.</li>
      <li><strong>Okno pływające</strong> — opcjonalna nakładka zawsze na wierzchu z przyciskami szybkiego dostępu (częstotliwość, głośność, mapa lokatorów i inne); każdy przycisk można osobno włączyć w ustawieniach.</li>
    </ul>`,
},

'es': {
  screens_title: 'Pantallas principales',
  screens_intro: 'La barra de navegación inferior da acceso a las pestañas principales de trabajo. Las pantallas de JS8, WSPR, SSB y el mapa de localizadores se describen en sus propias secciones más abajo.',

  screens_decode_title:       'Pestaña de decodificación',
  screens_decode_text:        'Es la pantalla que aparece al abrir la aplicación y su pantalla principal de trabajo. Muestra en orden cronológico todos los mensajes FT8/FT4 decodificados del ciclo actual. Las estaciones que llaman CQ aparecen resaltadas; pulsa una fila para elegir esa estación como destino de tu llamada. Cada fila muestra indicativo, nivel de señal (dB), desfase temporal (Δt), frecuencia de audio (Hz), localizador Maidenhead, distancia y país o ubicación.',
  screens_decode_modes_label: 'Modos de presentación de la lista:',
  screens_decode_modes: `
    <ul>
      <li><strong>Estándar</strong> — todos los datos en cada fila</li>
      <li><strong>Sencillo</strong> — presentación compacta de una sola línea</li>
    </ul>
    <p>La sensibilidad de decodificación (rápida / estándar / profunda) es un ajuste aparte; consulta la <a href="settings.html">referencia de ajustes</a>.</p>`,

  screens_level_title: 'Nivel de entrada',
  screens_level_text:  'La barra de estado muestra con qué volumen llega el audio del equipo a la aplicación, es decir, lo que ve realmente el decodificador. Si es demasiado alto recorta y distorsiona; si es demasiado bajo, el ruido de cuantificación se lleva una parte mayor. Ninguno de los dos casos se anuncia solo: únicamente se nota como una peor tasa de decodificación. La lectura cambia de color al salirse del margen y, al pulsarla, se abre una explicación más completa. Además del nivel medio se siguen los picos, de modo que las sobrecargas breves que la media ocultaría también se ven; un aviso ya atendido puede plegarse.',
  screens_level_note: 'Un margen práctico ronda los <strong>−45 a −18 dBFS RMS</strong>. Demasiado alto: baja la salida de AF o DATA del equipo, o la ganancia de entrada de la interfaz de audio; demasiado bajo: súbela del mismo modo. Los límites exactos varían según el equipo, el teléfono y el códec USB, así que toma las cifras como orientación y juzga por si la decodificación es fiable. Durante los intervalos de transmisión y en modo acústico no se muestra nivel, porque la lectura sería engañosa.',

  screens_level_caption: 'La barra de estado con el nivel de entrada; aquí está demasiado bajo, por eso el valor aparece resaltado. (La captura muestra la interfaz en chino tradicional.)',
  screens_miniwf_title: 'Mini cascada',
  screens_miniwf_text:  'Las pestañas de decodificación y de llamada pueden mostrar una franja de cascada compacta, para seguir la actividad de la banda sin abandonar la lista para ir a la pantalla de espectro completa. Cada pestaña tiene su propio conmutador en Ajustes.',

  screens_calling_title: 'Pestaña de llamada',
  screens_calling_text:  'Tu panel de control de transmisión. Muestra el indicativo de destino, la frecuencia de audio de transmisión, el contador de secuencia del ciclo y el número de QSO y mensajes. Desde aquí se inicia y se detiene la transmisión.',
  screens_calling_features: `
    <ul>
      <li><strong>Frecuencia de TX</strong> — frecuencia de audio de transmisión en Hz (rango válido 0–2900 Hz; 1500 Hz por defecto)</li>
      <li><strong>TX=RX</strong> — la frecuencia de transmisión sigue a la de la estación seleccionada</li>
      <li><strong>Split TX/RX</strong> — transmisión y recepción en frecuencias independientes</li>
      <li><strong>Modificador de CQ</strong> — añade a tu CQ un modificador geográfico o de actividad (por ejemplo, <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Texto libre</strong> — envía un mensaje propio (máximo 13 caracteres)</li>
      <li><strong>Respuesta automática a CQ</strong> — contesta automáticamente a las llamadas CQ; la prioridad se configura en Ajustes</li>
    </ul>`,

  screens_logs_title: 'Pestaña de registro',
  screens_logs_text:  'Lista cronológica de todos los QSO completados. Cada entrada muestra indicativo, banda, modo, fecha y hora (UTC), localizador, informes RST y estado de confirmación (sin confirmar / LoTW / QRZ / manual). Pulsa una entrada para ver todos los detalles o confirmar el contacto.',

  screens_settings_title: 'Pestaña de ajustes',
  screens_settings_text:  'Todas las opciones de configuración de tu estación, la interfaz con el equipo, la decodificación, el registro y los servicios externos. Consulta la sección de referencia de ajustes para ver la lista completa.',

  screens_more_title: 'Otras pantallas',
  screens_more_text:  'Además de las pestañas básicas de FT8/FT4, FT8TW incluye varias pantallas adicionales, accesibles desde el menú de navegación o desde la ventana flotante:',
  screens_more_list: `
    <ul>
      <li><strong>Espectro</strong> — cascada y espectro en vivo del audio recibido, con paleta de color ajustable y contraste anclado al nivel de ruido; durante la transmisión también muestra tu propio audio. Cuando el seguimiento automático no encaja con las condiciones, el panel de ajuste ofrece los deslizadores <strong>Contraste</strong> y <strong>Referencia (nivel de negro)</strong>; <strong>Auto</strong> devuelve el control automático.</li>
      <li><strong>JS8</strong> — pantalla de conversación del modo JS8. Consulta la sección <a href="js8.html">Modo chat JS8</a>.</li>
      <li><strong>WSPR</strong> — pantalla de programación de la baliza. Consulta la sección <a href="wspr.html">Baliza WSPR</a>.</li>
      <li><strong>Herramientas de radio</strong> — micrófono para el equipo, escucha de recepción y sintonización de antena. Consulta la sección <a href="ssb.html">Herramientas de radio</a>.</li>
      <li><strong>Mapa de localizadores</strong> — vista de mapa a pantalla completa. Consulta la sección <a href="gridtracker.html">Mapa de localizadores</a>.</li>
      <li><strong>Estadísticas</strong> — totales de QSO por banda, modo, DXCC, zona ITU/CQ y periodo.</li>
      <li><strong>Búsqueda en QRZ.com</strong> — búsqueda integrada del indicativo de la estación seleccionada.</li>
      <li><strong>Ventana flotante</strong> — capa opcional siempre visible con botones de acceso rápido (frecuencia, volumen, mapa de localizadores y más); cada botón se activa por separado en Ajustes.</li>
    </ul>`,
},

'el': {
  screens_title: 'Κύριες οθόνες',
  screens_intro: 'Η κάτω γραμμή πλοήγησης δίνει πρόσβαση στις βασικές καρτέλες λειτουργίας. Οι οθόνες JS8, WSPR, SSB και του χάρτη τετραγώνων περιγράφονται σε δικά τους κεφάλαια παρακάτω.',

  screens_decode_title:       'Καρτέλα αποκωδικοποίησης',
  screens_decode_text:        'Είναι η οθόνη που εμφανίζεται με την εκκίνηση και η κύρια οθόνη λειτουργίας. Δείχνει με χρονολογική σειρά όλα τα μηνύματα FT8/FT4 που αποκωδικοποιήθηκαν στον τρέχοντα κύκλο. Οι σταθμοί που καλούν CQ επισημαίνονται· πατήστε μια γραμμή για να επιλέξετε τον σταθμό ως στόχο κλήσης. Κάθε γραμμή δείχνει διακριτικό, στάθμη σήματος (dB), χρονική απόκλιση (Δt), συχνότητα ήχου (Hz), τετράγωνο Maidenhead, απόσταση και χώρα ή τοποθεσία.',
  screens_decode_modes_label: 'Τρόποι εμφάνισης λίστας:',
  screens_decode_modes: `
    <ul>
      <li><strong>Τυπικός</strong> — πλήρη στοιχεία σε κάθε γραμμή</li>
      <li><strong>Απλός</strong> — συμπαγής διάταξη μίας γραμμής</li>
    </ul>
    <p>Η ευαισθησία αποκωδικοποίησης (γρήγορη / τυπική / βαθιά) είναι ξεχωριστή ρύθμιση — δείτε τον <a href="settings.html">οδηγό ρυθμίσεων</a>.</p>`,

  screens_level_title: 'Στάθμη εισόδου',
  screens_level_text:  'Η γραμμή κατάστασης δείχνει πόσο δυνατός φτάνει ο ήχος του πομποδέκτη στην εφαρμογή — δηλαδή τι βλέπει πραγματικά ο αποκωδικοποιητής. Πολύ δυνατός ψαλιδίζεται και παραμορφώνεται· πολύ χαμηλός αφήνει μεγαλύτερο μερίδιο στον θόρυβο κβαντισμού. Κανένα από τα δύο δεν δηλώνεται ρητά: φαίνονται μόνο ως χειρότερο ποσοστό αποκωδικοποίησης. Όταν η τιμή βγει εκτός ορίων αλλάζει χρώμα, και με πάτημα ανοίγει πληρέστερη εξήγηση. Εκτός από τη μέση στάθμη παρακολουθούνται και οι κορυφές, ώστε να φαίνονται και σύντομες υπερφορτώσεις που θα έκρυβε ο μέσος όρος· μια προειδοποίηση που ήδη αντιμετωπίσατε μπορεί να συμπτυχθεί.',
  screens_level_note: 'Ένα πρακτικό εύρος είναι περίπου <strong>−45 έως −18 dBFS RMS</strong>. Πολύ ψηλά — χαμηλώστε την έξοδο AF ή DATA του πομποδέκτη ή την ενίσχυση εισόδου της κάρτας ήχου· πολύ χαμηλά — ανεβάστε την αντίστοιχα. Τα ακριβή όρια διαφέρουν ανά πομποδέκτη, τηλέφωνο και codec USB, οπότε πάρτε τους αριθμούς ως οδηγό και κρίνετε από το αν η αποκωδικοποίηση είναι αξιόπιστη. Κατά τις χρονοθυρίδες εκπομπής και στην ακουστική λειτουργία δεν εμφανίζεται στάθμη, γιατί η ένδειξη θα ήταν παραπλανητική.',

  screens_level_caption: 'Η γραμμή κατάστασης με τη στάθμη εισόδου· εδώ είναι πολύ χαμηλή, γι’ αυτό η τιμή επισημαίνεται. (Η οθόνη είναι στα παραδοσιακά κινεζικά.)',
  screens_miniwf_title: 'Μικρός καταρράκτης',
  screens_miniwf_text:  'Στις καρτέλες αποκωδικοποίησης και κλήσης μπορεί να εμφανίζεται μια συμπαγής λωρίδα καταρράκτη, ώστε να παρακολουθείτε τη δραστηριότητα της μπάντας χωρίς να φεύγετε από τη λίστα για την πλήρη οθόνη φάσματος. Κάθε καρτέλα έχει δικό της διακόπτη στις Ρυθμίσεις.',

  screens_calling_title: 'Καρτέλα κλήσης',
  screens_calling_text:  'Ο πίνακας ελέγχου εκπομπής. Εμφανίζει το τρέχον διακριτικό στόχου, τη συχνότητα ήχου εκπομπής, τον μετρητή κύκλων και το πλήθος επαφών και μηνυμάτων. Από εδώ ξεκινά και σταματά η εκπομπή.',
  screens_calling_features: `
    <ul>
      <li><strong>Συχνότητα εκπομπής</strong> — συχνότητα ήχου εκπομπής σε Hz (έγκυρο εύρος 0–2900 Hz, προεπιλογή 1500 Hz)</li>
      <li><strong>TX=RX</strong> — η συχνότητα εκπομπής ακολουθεί τη συχνότητα του επιλεγμένου σταθμού</li>
      <li><strong>Split TX/RX</strong> — εκπομπή και λήψη σε ανεξάρτητες συχνότητες</li>
      <li><strong>Προσδιορισμός CQ</strong> — προσθέτει γεωγραφικό ή θεματικό προσδιορισμό στην κλήση σας (π.χ. <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Ελεύθερο κείμενο</strong> — αποστολή δικού σας μηνύματος (έως 13 χαρακτήρες)</li>
      <li><strong>Αυτόματη απάντηση σε CQ</strong> — απαντά αυτόματα σε κλήσεις CQ· η προτεραιότητα ορίζεται στις Ρυθμίσεις</li>
    </ul>`,

  screens_logs_title: 'Καρτέλα ημερολογίου',
  screens_logs_text:  'Χρονολογική λίστα όλων των ολοκληρωμένων επαφών. Κάθε εγγραφή δείχνει διακριτικό, μπάντα, τρόπο λειτουργίας, ημερομηνία και ώρα (UTC), τετράγωνο, αναφορές RST και κατάσταση επιβεβαίωσης (ανεπιβεβαίωτη / LoTW / QRZ / χειροκίνητη). Πατήστε μια εγγραφή για πλήρη στοιχεία ή για επιβεβαίωση.',

  screens_settings_title: 'Καρτέλα ρυθμίσεων',
  screens_settings_text:  'Όλες οι επιλογές διαμόρφωσης για τον σταθμό σας, τη διεπαφή με τον πομποδέκτη, την αποκωδικοποίηση, το ημερολόγιο και τις εξωτερικές υπηρεσίες. Πλήρης κατάλογος στο κεφάλαιο του οδηγού ρυθμίσεων.',

  screens_more_title: 'Άλλες οθόνες',
  screens_more_text:  'Πέρα από τις βασικές καρτέλες FT8/FT4, το FT8TW περιλαμβάνει και άλλες οθόνες, προσβάσιμες από το μενού πλοήγησης ή από το αιωρούμενο παράθυρο:',
  screens_more_list: `
    <ul>
      <li><strong>Φάσμα</strong> — ζωντανή προβολή καταρράκτη και φάσματος του ήχου λήψης, με εναλλάξιμη χρωματική κλίμακα και αντίθεση αγκυρωμένη στο επίπεδο θορύβου· κατά την εκπομπή δείχνει και τον δικό σας ήχο. Όταν η αυτόματη παρακολούθηση δεν ταιριάζει στις συνθήκες, ο πίνακας ρύθμισης προσφέρει τα <strong>Αντίθεση</strong> και <strong>Αναφορά (στάθμη μαύρου)</strong>· το <strong>Αυτόματο</strong> επαναφέρει την αυτόματη παρακολούθηση.</li>
      <li><strong>JS8</strong> — οθόνη συνομιλίας για τη λειτουργία JS8. Δείτε το κεφάλαιο <a href="js8.html">Λειτουργία συνομιλίας JS8</a>.</li>
      <li><strong>WSPR</strong> — οθόνη προγραμματισμού φάρου. Δείτε το κεφάλαιο <a href="wspr.html">Φάρος WSPR</a>.</li>
      <li><strong>Εργαλεία πομποδέκτη</strong> — μικρόφωνο για τον πομποδέκτη, ακρόαση λήψης και συντονισμός κεραίας. Δείτε το κεφάλαιο <a href="ssb.html">Εργαλεία πομποδέκτη</a>.</li>
      <li><strong>Χάρτης τετραγώνων</strong> — προβολή χάρτη σε πλήρη οθόνη. Δείτε το κεφάλαιο <a href="gridtracker.html">Χάρτης τετραγώνων</a>.</li>
      <li><strong>Στατιστικά</strong> — σύνολα επαφών ανά μπάντα, τρόπο λειτουργίας, DXCC, ζώνη ITU/CQ και χρονική περίοδο.</li>
      <li><strong>Αναζήτηση QRZ.com</strong> — ενσωματωμένη αναζήτηση διακριτικού για τον επιλεγμένο σταθμό.</li>
      <li><strong>Αιωρούμενο παράθυρο</strong> — προαιρετική επικάλυψη πάντα σε πρώτο πλάνο με πλήκτρα γρήγορης πρόσβασης (συχνότητα, ένταση, χάρτης τετραγώνων κ.ά.)· κάθε πλήκτρο ενεργοποιείται ξεχωριστά στις Ρυθμίσεις.</li>
    </ul>`,
},

}; /* end PAGE_T */
