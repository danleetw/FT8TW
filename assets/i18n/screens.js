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

  screens_level_caption: 'The status bar showing the input level. The <strong>RX</strong> prefix marks it as the <em>receive</em> level; here it reads −24 dB, comfortably inside the usable range, so it appears in the normal colour. Outside that range the wording changes to something explicit such as "RX audio low".',
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
      <li><strong>JS8</strong> – Chat-style conversation screen for JS8 mode. See the <a href="js8.html">JS8 Chat Mode</a> section.</li>
      <li><strong>WSPR</strong> – Transmission scheduling screen for WSPR mode. See the <a href="wspr.html">WSPR</a> section.</li>
      <li><strong>Radio Tool</strong> – Radio microphone, receive monitor and antenna tuning. See the <a href="ssb.html">Radio Tool</a> section.</li>
      <li><strong>Grid Tracker</strong> – Full-screen map view. See the <a href="gridtracker.html">Grid Tracker</a> section.</li>
      <li><strong>Count</strong> – QSO statistics: totals by band, mode, DXCC, ITU/CQ zone, and time period.</li>
      <li><strong>QRZ.com Lookup</strong> – Embedded QRZ.com callsign lookup for the currently selected station.</li>
      <li><strong>Floating Window</strong> – An optional always-on-top overlay carrying eight shortcut buttons: hide bottom menu, frequency, volume, grid tracker, radio tool, WSPR, JS8 chat and <strong>quick mode switch</strong> (one tap between FT8／FT4／FT2／JS8／WSPR). Each can be shown or hidden separately in Settings. <strong>Long-press</strong> the floating menu to collapse it to a single button, and long-press again to expand it; the collapsed state lasts until the app closes.</li>
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
      <li><strong>WSPR</strong> — WSPR 模式的發射排程畫面，詳見<a href="wspr.html">「WSPR」</a>章節。</li>
      <li><strong>電台工具</strong> — 電台麥克風、收訊監聽與天線調諧，詳見<a href="ssb.html">「電台工具」</a>章節。</li>
      <li><strong>網格追蹤（Grid Tracker）</strong> — 全螢幕地圖畫面，詳見<a href="gridtracker.html">「網格追蹤地圖」</a>章節。</li>
      <li><strong>統計（Count）</strong> — 依頻段、模式、DXCC、ITU/CQ 分區及時間區間統計 QSO 數量。</li>
      <li><strong>QRZ.com 查詢</strong> — 內嵌 QRZ.com 呼號查詢，顯示目前選定電台的資料。</li>
      <li><strong>浮動視窗</strong> — 可選的常駐懸浮功能表，共八顆快捷按鈕：隱藏底部選單、頻率調整、音量調整、網格追蹤、電台工具、WSPR、JS8 聊天，以及<strong>快速切換模式</strong>（一鍵在 FT8／FT4／FT2／JS8／WSPR 之間切換）。每顆都可在設置中個別開關。<strong>長按</strong>浮動選單可把它收合成單一按鈕，需要時再長按展開；收合狀態會維持到 App 結束為止。</li>
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

  screens_timebar_title: '时序计时条',
  screens_timebar_text:  '画面最上方那条细长的进度条走的是 UTC 时序，一个周期走完一次，让您一眼看出目前落在时隙的哪个位置。它的<strong>颜色代表是否正在接收</strong>：<strong>黄色</strong>表示正在录音收讯，<strong>灰色</strong>表示录音已停止——计时条照跑但没有在收，颜色会直接讲明白，不会让人误以为还在接收。轮到自己发射的时段，整条的底色会另外变色标示。',

  screens_spectrum_title: '频谱（Spectrum）',
  screens_spectrum_text:  '实时显示接收音频的瀑布图与频谱；发射时也会显示自己送出去的信号。画面下方有两个开关：',
  screens_spectrum_list: `
    <ul>
      <li><strong>噪声抑制</strong> — 压低宽带噪声，弱信号在瀑布图上更容易看出来。</li>
      <li><strong>标记消息</strong> — 在瀑布图上标出各条解码消息的位置与内容。</li>
    </ul>
    <p>两个开关的状态会被记住，重开 App 后维持不变，而且全 App 的频谱画面（含各分页的小瀑布图）共用同一份设置。若不想在瀑布图上看到这两个按钮，可在下面的显示调整面板中把它们关掉。</p>`,

  screens_wfadjust_title: '瀑布图显示调整',
  screens_wfadjust_text:  '<strong>长按瀑布图</strong>会叫出「瀑布图显示调整」面板。程序平常会自动追踪噪声底来决定明暗，这个面板是在自动追踪不合当下现场状况时，让您自己接手：',
  screens_wfadjust_list: `
    <ul>
      <li><strong>基准（黑色电平）</strong> — 往右拉，把更多背景噪声压成黑色。</li>
      <li><strong>对比度</strong> — 往右拉，强弱信号之间的差异更明显。</li>
      <li><strong>自动</strong> — 交回给程序自动决定。</li>
      <li><strong>显示“噪声抑制／标记消息”按钮</strong> — 关掉之后瀑布图上就看不到那两个按钮，画面更干净；切换后立刻生效，不必重进页面。</li>
      <li><strong>复制诊断信息</strong> — 把目前的电平、增益等内部数值复制到剪贴板，回报显示相关问题时可一并附上。</li>
    </ul>`,

  screens_logs_title: '通联日志（QSO Logs）',
  screens_logs_text:  '按时序显示所有已完成的通联记录。每条包含呼号、频段、模式、UTC 时间、网格、RST 报告及确认状态（未确认 / LoTW / QRZ / 手工确认）。点击记录可查看详情或确认通联。',

  screens_settings_title: '设置（Settings）',
  screens_settings_text:  '包含电台信息、电台连接、解码、日志、第三方集成等所有设置选项。详细说明请参阅「设置说明」章节。',

  screens_more_title: '其他界面',
  screens_more_text:  '除了核心的 FT8/FT4 分页之外，FT8TW 还有下列界面，可从导航菜单或悬浮快捷窗口打开：',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — JS8 模式的聊天式对话界面，详见<a href="js8.html">「JS8 聊天模式」</a>章节。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信标排程界面，详见<a href="wspr.html">「WSPR 信标」</a>章节。</li>
      <li><strong>电台工具</strong> — 电台麦克风、收讯监听与天线调谐，详见<a href="ssb.html">「电台工具」</a>章节。</li>
      <li><strong>网格追踪（Grid Tracker）</strong> — 全屏地图界面，详见<a href="gridtracker.html">「网格追踪地图」</a>章节。</li>
      <li><strong>统计（Count）</strong> — 按频段、模式、DXCC、ITU/CQ 分区及时间区间统计 QSO 数量。</li>
      <li><strong>QRZ.com 查询</strong> — 内嵌 QRZ.com 呼号查询，显示当前选定电台的资料。</li>
      <li><strong>悬浮窗口</strong> — 可选的常驻悬浮菜单，共八个快捷按钮：隐藏底部菜单、频率调整、音量调整、网格追踪、电台工具、WSPR 信标、JS8 聊天，以及<strong>快速切换模式</strong>（一键在 FT8／FT4／FT2／JS8／WSPR 之间切换）。每个都可在设置中单独开关。<strong>长按</strong>悬浮菜单可把它收合成单一按钮，需要时再长按展开；收合状态会维持到 App 结束为止。</li>
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

  screens_level_caption: 'ステータスバーの入力レベル。頭に付く <strong>RX</strong> は<em>受信</em>側のレベルであることを示します。ここでは −24 dB で使用可能な範囲に十分収まっているため、通常の色で表示されています。範囲を外れると「RX audio low」のようにはっきりした表現に変わります。（スクリーンショットは英語表示のものです。）',
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

  screens_timebar_title: 'タイミングバー',
  screens_timebar_text:  '画面のいちばん上にある細いバーは UTC のタイミングを表し、1 周期で 1 往復します。いまスロットのどこにいるのかが一目で分かります。<strong>色は受信中かどうかを示します</strong>。<strong>黄色</strong>は録音（受信）中、<strong>灰色</strong>は録音が止まっている状態です。バーはどちらでも動き続けるので、受信していないことは色が直接示します。自分の送信スロットでは、バーの背景色が変わって区別されます。',

  screens_spectrum_title: 'スペクトラム',
  screens_spectrum_text:  '受信音声のウォーターフォールとスペクトラムをリアルタイムに表示します。送信中は自分の信号も表示されます。画面下部に 2 つのスイッチがあります。',
  screens_spectrum_list: `
    <ul>
      <li><strong>ノイズ抑制</strong> — 広帯域のノイズを抑え、弱い信号をウォーターフォール上で見つけやすくします。</li>
      <li><strong>メッセージを示す</strong> — デコードした各メッセージを、その周波数の位置に表示します。</li>
    </ul>
    <p>2 つのスイッチの状態は記憶され、アプリを再起動しても保持されます。また、各タブのミニウォーターフォールを含め、アプリ内のすべてのウォーターフォールが同じ設定を共有します。ウォーターフォール上にこの 2 つのボタンを出したくない場合は、下の表示調整パネルで隠せます。</p>`,

  screens_wfadjust_title: 'ウォーターフォール表示調整',
  screens_wfadjust_text:  '<strong>ウォーターフォールを長押し</strong>すると「ウォーターフォール表示調整」パネルが開きます。通常はノイズフロアを自動追従して濃淡を決めていますが、その自動追従が目の前の状況に合わないときに、このパネルで自分で決められます。',
  screens_wfadjust_list: `
    <ul>
      <li><strong>基準（黒レベル）</strong> — 右へ動かすほど、背景ノイズをより多く黒に落とします。</li>
      <li><strong>コントラスト</strong> — 右へ動かすほど、強い信号と弱い信号の差がはっきりします。</li>
      <li><strong>自動</strong> — 判断をアプリに戻します。</li>
      <li><strong>「ノイズ抑制／メッセージ表示」ボタンを表示</strong> — オフにするとウォーターフォールからこの 2 つのボタンが消え、表示がすっきりします。切り替えは即座に反映されます。</li>
      <li><strong>診断情報をコピー</strong> — 現在のレベルやゲインなどの内部値をクリップボードにコピーします。表示に関する報告に添えられます。</li>
    </ul>`,

  screens_logs_title: '交信ログタブ',
  screens_logs_text:  '完了した交信を時系列で一覧表示します。各項目にはコールサイン、バンド、モード、日時（UTC）、グリッド、RST レポート、確認状況（未確認 / LoTW / QRZ / 手動）が表示されます。項目をタップすると詳細の確認や交信の確認ができます。',

  screens_settings_title: '設定タブ',
  screens_settings_text:  '自局情報、無線機インターフェース、デコード、ログ、外部サービス連携など、すべての設定項目があります。詳しい一覧は設定リファレンスの章をご覧ください。',

  screens_more_title: 'その他の画面',
  screens_more_text:  'FT8/FT4 の主要タブのほかに、ナビゲーションメニューまたはフローティングショートカットから開ける画面があります:',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — JS8 モードのチャット形式の画面。<a href="js8.html">「JS8 チャットモード」</a>を参照してください。</li>
      <li><strong>WSPR</strong> — WSPR モードのビーコン予約画面。<a href="wspr.html">「WSPR ビーコン」</a>を参照してください。</li>
      <li><strong>無線機ツール</strong> — 無線機のマイク、受信モニター、アンテナ調整。<a href="ssb.html">「無線機ツール」</a>を参照してください。</li>
      <li><strong>グリッドトラッカー</strong> — 全画面の地図表示。<a href="gridtracker.html">「グリッドトラッカー」</a>を参照してください。</li>
      <li><strong>統計</strong> — バンド、モード、DXCC、ITU/CQ ゾーン、期間ごとの交信数。</li>
      <li><strong>QRZ.com 検索</strong> — 選択中の局について、QRZ.com のコールサイン検索を内蔵表示します。</li>
      <li><strong>フローティングウィンドウ</strong> — 常時最前面に表示できる任意のオーバーレイで、8 つのショートカットがあります：下部メニューを非表示、周波数調整、音量調整、グリッドトラッカー、無線機ツール、WSPR ビーコン、JS8チャット、そして<strong>クイックモード切替</strong>（FT8／FT4／FT2／JS8／WSPR をワンタップで切り替え）。それぞれ設定で個別に表示／非表示にできます。フローティングメニューを<strong>長押し</strong>すると 1 つのボタンに畳まれ、もう一度長押しすると戻ります。畳んだ状態はアプリを終了するまで保たれます。</li>
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

  screens_level_caption: 'Строка состояния с уровнем входа. Префикс <strong>RX</strong> указывает, что это уровень <em>приёма</em>. Здесь он равен −24 дБ и уверенно укладывается в рабочий диапазон, поэтому показан обычным цветом. За пределами диапазона надпись меняется на явную, например «RX audio low». (На снимке экрана — интерфейс на английском.)',
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

  screens_timebar_title: 'Полоса тайминга',
  screens_timebar_text:  'Тонкая полоса в самом верху экрана показывает ход UTC-интервала и проходит его целиком за один цикл, так что сразу видно, в каком месте интервала вы находитесь. <strong>Её цвет говорит, идёт ли приём</strong>: <strong>жёлтый</strong> — запись работает, <strong>серый</strong> — запись остановлена. Полоса движется в обоих случаях, и именно цвет прямо указывает, какой из них сейчас. Во время вашего интервала передачи меняется и цвет фона полосы.',

  screens_spectrum_title: 'Вкладка спектра',
  screens_spectrum_text:  'Водопад и спектр принимаемого звука в реальном времени; во время передачи показывается и ваш собственный сигнал. Внизу экрана расположены два переключателя:',
  screens_spectrum_list: `
    <ul>
      <li><strong>Шумоподавл.</strong> — подавляет широкополосный шум, так что слабые сигналы заметнее на водопаде.</li>
      <li><strong>Показать сообщ.</strong> — подписывает на водопаде каждое декодированное сообщение на его собственной частоте.</li>
    </ul>
    <p>Состояние обоих переключателей запоминается между запусками, и все водопады в приложении — включая мини-полосы на других вкладках — используют одну и ту же настройку. Если вы вообще не хотите видеть эти две кнопки на водопаде, их можно скрыть в панели настройки, описанной ниже.</p>`,

  screens_wfadjust_title: 'Настройка водопада',
  screens_wfadjust_text:  '<strong>Долгое нажатие на водопад</strong> открывает панель «Настройка водопада». Обычно приложение само отслеживает уровень шума и по нему выбирает яркость; эта панель нужна, когда автоматика не соответствует тому, что происходит в эфире:',
  screens_wfadjust_list: `
    <ul>
      <li><strong>Опорный уровень (чёрный)</strong> — сдвиг вправо переводит в чёрный больше фонового шума.</li>
      <li><strong>Контраст</strong> — сдвиг вправо увеличивает разницу между слабыми и сильными сигналами.</li>
      <li><strong>Авто</strong> — вернуть решение приложению.</li>
      <li><strong>Показывать кнопки шумоподавления и сообщений</strong> — если выключить, эти две кнопки исчезают с водопада и изображение становится чище. Изменение действует сразу.</li>
      <li><strong>Копировать</strong> — копирует текущие уровни и коэффициенты усиления в буфер обмена, чтобы приложить их к сообщению о проблеме с отображением.</li>
    </ul>`,

  screens_logs_title: 'Вкладка журнала',
  screens_logs_text:  'Хронологический список всех завершённых связей. В каждой записи видны позывной, диапазон, вид работы, дата и время (UTC), локатор, рапорты RST и статус подтверждения (не подтверждено / LoTW / QRZ / вручную). Нажмите запись, чтобы открыть подробности или подтвердить связь.',

  screens_settings_title: 'Вкладка настроек',
  screens_settings_text:  'Все параметры вашей станции, интерфейса с трансивером, декодирования, журнала и внешних сервисов. Полный перечень — в разделе описания настроек.',

  screens_more_title: 'Другие экраны',
  screens_more_text:  'Помимо основных вкладок FT8/FT4, в FT8TW есть дополнительные экраны, доступные из меню навигации или плавающего окна:',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — экран разговора в виде чата для режима JS8. См. раздел <a href="js8.html">«Режим чата JS8»</a>.</li>
      <li><strong>WSPR</strong> — экран планирования маяка WSPR. См. раздел <a href="wspr.html">«Маяк WSPR»</a>.</li>
      <li><strong>Инструменты трансивера</strong> — микрофон, мониторинг приёма и настройка антенны. См. раздел <a href="ssb.html">«Инструменты трансивера»</a>.</li>
      <li><strong>Карта локаторов</strong> — полноэкранная карта. См. раздел <a href="gridtracker.html">«Карта локаторов»</a>.</li>
      <li><strong>Статистика</strong> — количество QSO по диапазонам, режимам, DXCC, зонам ITU/CQ и периодам.</li>
      <li><strong>Поиск на QRZ.com</strong> — встроенный поиск позывного на QRZ.com для выбранной станции.</li>
      <li><strong>Плавающее окно</strong> — необязательная панель поверх других окон с восемью кнопками: скрыть нижнее меню, частота, громкость, карта локаторов, инструменты трансивера, маяк WSPR, чат JS8 и <strong>быстрая смена режима</strong> (одно нажатие для перехода между FT8／FT4／FT2／JS8／WSPR). Каждую можно показать или скрыть отдельно в настройках. <strong>Долгое нажатие</strong> на плавающее меню сворачивает его в одну кнопку, повторное — разворачивает; свёрнутое состояние сохраняется до закрытия приложения.</li>
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

  screens_level_caption: 'Pasek stanu z poziomem wejściowym. Przedrostek <strong>RX</strong> oznacza, że jest to poziom <em>odbioru</em>. Tutaj wynosi −24 dB i mieści się z zapasem w użytecznym zakresie, więc pokazany jest normalnym kolorem. Poza tym zakresem napis zmienia się na jednoznaczny, na przykład „RX audio low". (Zrzut przedstawia interfejs w języku angielskim.)',
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

  screens_timebar_title: 'Pasek taktowania',
  screens_timebar_text:  'Cienki pasek na samej górze ekranu pokazuje przebieg okna czasowego UTC i przechodzi je w całości raz na cykl, więc od razu widać, w którym miejscu okna jesteś. <strong>Jego kolor mówi, czy trwa odbiór</strong>: <strong>żółty</strong> oznacza, że nagrywanie działa, <strong>szary</strong> — że zostało zatrzymane. Pasek porusza się w obu przypadkach, a to kolor wprost wskazuje, który stan jest aktualny. W twoim oknie nadawania zmienia się dodatkowo kolor tła paska.',

  screens_spectrum_title: 'Zakładka widma',
  screens_spectrum_text:  'Wodospad i widmo odbieranego dźwięku na żywo; podczas nadawania widać także własny sygnał. Na dole ekranu są dwa przełączniki:',
  screens_spectrum_list: `
    <ul>
      <li><strong>Odszumianie</strong> — tłumi szerokopasmowy szum, dzięki czemu słabe sygnały lepiej wyróżniają się na wodospadzie.</li>
      <li><strong>Pokaż wiad.</strong> — opisuje na wodospadzie każdą zdekodowaną wiadomość w miejscu jej częstotliwości.</li>
    </ul>
    <p>Stan obu przełączników jest zapamiętywany między uruchomieniami, a wszystkie wodospady w aplikacji — łącznie z mini paskami na innych zakładkach — korzystają z tego samego ustawienia. Jeśli wolisz w ogóle nie widzieć tych dwóch przycisków na wodospadzie, można je ukryć w opisanym niżej panelu regulacji.</p>`,

  screens_wfadjust_title: 'Regulacja wodospadu',
  screens_wfadjust_text:  '<strong>Długie naciśnięcie wodospadu</strong> otwiera panel „Regulacja wodospadu". Zwykle aplikacja sama śledzi poziom szumu i na tej podstawie dobiera jasność; ten panel służy do przejęcia sterowania, gdy automatyka nie pasuje do bieżących warunków:',
  screens_wfadjust_list: `
    <ul>
      <li><strong>Poziom odniesienia (czerń)</strong> — przesunięcie w prawo spycha do czerni więcej szumu tła.</li>
      <li><strong>Kontrast</strong> — przesunięcie w prawo powiększa różnicę między sygnałami słabymi a silnymi.</li>
      <li><strong>Auto</strong> — oddaje decyzję z powrotem aplikacji.</li>
      <li><strong>Pokaż przyciski odszumiania i wiadomości</strong> — po wyłączeniu te dwa przyciski znikają z wodospadu, a obraz staje się czystszy. Zmiana działa natychmiast.</li>
      <li><strong>Kopiuj</strong> — kopiuje bieżące poziomy i wzmocnienia do schowka, aby dołączyć je do zgłoszenia dotyczącego wyświetlania.</li>
    </ul>`,

  screens_logs_title: 'Zakładka dziennika',
  screens_logs_text:  'Chronologiczna lista wszystkich zakończonych łączności. Każdy wpis pokazuje znak wywoławczy, pasmo, emisję, datę i godzinę (UTC), lokator, raporty RST oraz status potwierdzenia (niepotwierdzone / LoTW / QRZ / ręcznie). Dotknij wpisu, aby zobaczyć szczegóły lub potwierdzić łączność.',

  screens_settings_title: 'Zakładka ustawień',
  screens_settings_text:  'Wszystkie opcje konfiguracji stacji, interfejsu radia, dekodowania, dziennika i usług zewnętrznych. Pełny wykaz znajduje się w rozdziale z opisem ustawień.',

  screens_more_title: 'Pozostałe ekrany',
  screens_more_text:  'Poza podstawowymi zakładkami FT8/FT4 FT8TW ma kilka dodatkowych ekranów dostępnych z menu nawigacji lub z okna pływającego:',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — ekran rozmowy w formie czatu dla trybu JS8. Zobacz rozdział <a href="js8.html">„Tryb czatu JS8"</a>.</li>
      <li><strong>WSPR</strong> — ekran planowania latarni WSPR. Zobacz rozdział <a href="wspr.html">„Latarnia WSPR"</a>.</li>
      <li><strong>Narzędzia radia</strong> — mikrofon, podsłuch odbioru i strojenie anteny. Zobacz rozdział <a href="ssb.html">„Narzędzia radia"</a>.</li>
      <li><strong>Mapa lokatorów</strong> — pełnoekranowy widok mapy. Zobacz rozdział <a href="gridtracker.html">„Mapa lokatorów"</a>.</li>
      <li><strong>Statystyki</strong> — liczba QSO według pasma, emisji, DXCC, strefy ITU/CQ i okresu.</li>
      <li><strong>Wyszukiwanie QRZ.com</strong> — wbudowane wyszukiwanie znaku na QRZ.com dla aktualnie wybranej stacji.</li>
      <li><strong>Pływające okno</strong> — opcjonalna nakładka zawsze na wierzchu z ośmioma przyciskami skrótów: ukryj dolne menu, częstotliwość, głośność, mapa lokatorów, narzędzia radia, latarnia WSPR, czat JS8 oraz <strong>szybka zmiana trybu</strong> (jedno dotknięcie między FT8／FT4／FT2／JS8／WSPR). Każdy można osobno pokazać lub ukryć w ustawieniach. <strong>Długie naciśnięcie</strong> pływającego menu zwija je do jednego przycisku, kolejne rozwija; stan zwinięcia utrzymuje się do zamknięcia aplikacji.</li>
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

  screens_level_caption: 'La barra de estado con el nivel de entrada. El prefijo <strong>RX</strong> indica que es el nivel de <em>recepción</em>; aquí marca −24 dB, holgadamente dentro del margen útil, por lo que aparece con el color normal. Fuera de ese margen el texto cambia a algo explícito como «RX audio low». (La captura muestra la interfaz en inglés.)',
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

  screens_timebar_title: 'Barra de temporización',
  screens_timebar_text:  'La barra fina que cruza la parte superior de la pantalla sigue el intervalo UTC y lo recorre entero una vez por ciclo, de modo que se ve de un vistazo en qué punto del intervalo estás. <strong>Su color indica si se está recibiendo</strong>: <strong>amarillo</strong> significa que la grabación está en marcha y <strong>gris</strong> que se ha detenido. La barra se mueve en ambos casos, así que es el color el que dice cuál de los dos ocurre. Durante tu intervalo de transmisión cambia además el color de fondo de la barra.',

  screens_spectrum_title: 'Pestaña de espectro',
  screens_spectrum_text:  'Cascada y espectro del audio recibido en tiempo real; durante la transmisión se muestra también tu propia señal. En la parte inferior hay dos interruptores:',
  screens_spectrum_list: `
    <ul>
      <li><strong>Eliminar ruido</strong> — atenúa el ruido de banda ancha para que las señales débiles destaquen más en la cascada.</li>
      <li><strong>Mostrar mensaje</strong> — rotula en la cascada cada mensaje decodificado en su propia frecuencia.</li>
    </ul>
    <p>El estado de ambos interruptores se recuerda entre arranques, y todas las cascadas de la aplicación —incluidas las mini cascadas de las otras pestañas— comparten el mismo ajuste. Si prefieres no ver esos dos botones sobre la cascada, pueden ocultarse desde el panel de ajuste que se describe a continuación.</p>`,

  screens_wfadjust_title: 'Ajuste de cascada',
  screens_wfadjust_text:  '<strong>Mantén pulsada la cascada</strong> para abrir el panel «Ajuste de cascada». Normalmente la aplicación sigue por sí sola el nivel de ruido para decidir el sombreado; este panel es la forma de tomar el control cuando ese seguimiento automático no encaja con las condiciones que tienes delante:',
  screens_wfadjust_list: `
    <ul>
      <li><strong>Referencia (nivel de negro)</strong> — al desplazarlo a la derecha, más ruido de fondo pasa a negro.</li>
      <li><strong>Contraste</strong> — al desplazarlo a la derecha, aumenta la diferencia entre señales débiles y fuertes.</li>
      <li><strong>Auto</strong> — devuelve la decisión a la aplicación.</li>
      <li><strong>Mostrar botones de ruido y mensajes</strong> — al desactivarlo, esos dos botones desaparecen de la cascada y la vista queda más limpia. El cambio surte efecto de inmediato.</li>
      <li><strong>Copiar</strong> — copia al portapapeles los niveles y ganancias actuales, para adjuntarlos a un informe sobre la visualización.</li>
    </ul>`,

  screens_logs_title: 'Pestaña de registro',
  screens_logs_text:  'Lista cronológica de todos los QSO completados. Cada entrada muestra indicativo, banda, modo, fecha y hora (UTC), localizador, informes RST y estado de confirmación (sin confirmar / LoTW / QRZ / manual). Pulsa una entrada para ver todos los detalles o confirmar el contacto.',

  screens_settings_title: 'Pestaña de ajustes',
  screens_settings_text:  'Todas las opciones de configuración de tu estación, la interfaz con el equipo, la decodificación, el registro y los servicios externos. Consulta la sección de referencia de ajustes para ver la lista completa.',

  screens_more_title: 'Otras pantallas',
  screens_more_text:  'Además de las pestañas básicas de FT8/FT4, FT8TW incluye varias pantallas adicionales, accesibles desde el menú de navegación o desde la ventana flotante:',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — pantalla de conversación tipo chat para el modo JS8. Consulta <a href="js8.html">«Modo chat JS8»</a>.</li>
      <li><strong>WSPR</strong> — pantalla de programación de balizas WSPR. Consulta <a href="wspr.html">«Baliza WSPR»</a>.</li>
      <li><strong>Herramientas de radio</strong> — micrófono, monitor de recepción y sintonía de antena. Consulta <a href="ssb.html">«Herramientas de radio»</a>.</li>
      <li><strong>Mapa de localizadores</strong> — vista de mapa a pantalla completa. Consulta <a href="gridtracker.html">«Mapa de localizadores»</a>.</li>
      <li><strong>Estadísticas</strong> — recuento de QSO por banda, modo, DXCC, zona ITU/CQ y periodo.</li>
      <li><strong>Búsqueda en QRZ.com</strong> — búsqueda de indicativo integrada de QRZ.com para la estación seleccionada.</li>
      <li><strong>Ventana flotante</strong> — superposición opcional siempre visible con ocho botones de acceso rápido: ocultar menú inferior, frecuencia, volumen, mapa de localizadores, herramientas de radio, baliza WSPR, chat JS8 y <strong>cambio rápido de modo</strong> (un toque para pasar entre FT8／FT4／FT2／JS8／WSPR). Cada uno se muestra u oculta por separado en Ajustes. Una <strong>pulsación larga</strong> sobre el menú flotante lo pliega a un solo botón, y otra lo despliega; el estado plegado dura hasta que se cierra la aplicación.</li>
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

  screens_level_caption: 'Η γραμμή κατάστασης με τη στάθμη εισόδου. Το πρόθεμα <strong>RX</strong> δηλώνει ότι πρόκειται για τη στάθμη <em>λήψης</em>· εδώ δείχνει −24 dB, άνετα μέσα στο χρήσιμο εύρος, γι\' αυτό εμφανίζεται με το κανονικό χρώμα. Εκτός αυτού του εύρους το κείμενο αλλάζει σε κάτι σαφές, όπως «RX audio low». (Το στιγμιότυπο δείχνει το περιβάλλον στα αγγλικά.)',
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

  screens_timebar_title: 'Μπάρα χρονισμού',
  screens_timebar_text:  'Η λεπτή μπάρα στην κορυφή της οθόνης ακολουθεί τον κύκλο χρονισμού UTC και τον διανύει ολόκληρο μία φορά ανά κύκλο, ώστε να βλέπετε αμέσως σε ποιο σημείο της χρονοθυρίδας βρίσκεστε. <strong>Το χρώμα της δείχνει αν γίνεται λήψη</strong>: <strong>κίτρινο</strong> σημαίνει ότι η εγγραφή τρέχει, <strong>γκρι</strong> ότι έχει σταματήσει. Η μπάρα κινείται και στις δύο περιπτώσεις, οπότε το χρώμα είναι αυτό που δηλώνει ποια από τις δύο ισχύει. Στη δική σας χρονοθυρίδα εκπομπής αλλάζει επιπλέον το χρώμα φόντου της μπάρας.',

  screens_spectrum_title: 'Καρτέλα φάσματος',
  screens_spectrum_text:  'Καταρράκτης και φάσμα του ήχου λήψης σε πραγματικό χρόνο· κατά την εκπομπή εμφανίζεται και το δικό σας σήμα. Στο κάτω μέρος υπάρχουν δύο διακόπτες:',
  screens_spectrum_list: `
    <ul>
      <li><strong>Αφαίρεση θόρυβου</strong> — καταστέλλει τον ευρυζωνικό θόρυβο, ώστε τα ασθενή σήματα να ξεχωρίζουν καλύτερα στον καταρράκτη.</li>
      <li><strong>Δείξε μήνυμα</strong> — σημειώνει στον καταρράκτη κάθε αποκωδικοποιημένο μήνυμα στη δική του συχνότητα.</li>
    </ul>
    <p>Η κατάσταση και των δύο διακοπτών θυμάται μεταξύ εκκινήσεων, ενώ όλοι οι καταρράκτες της εφαρμογής — μαζί με τις μικρές λωρίδες στις άλλες καρτέλες — μοιράζονται την ίδια ρύθμιση. Αν προτιμάτε να μη βλέπετε καθόλου αυτά τα δύο κουμπιά πάνω στον καταρράκτη, μπορούν να κρυφτούν από τον πίνακα ρύθμισης που περιγράφεται παρακάτω.</p>`,

  screens_wfadjust_title: 'Ρύθμιση καταρράκτη',
  screens_wfadjust_text:  '<strong>Παρατεταμένο πάτημα στον καταρράκτη</strong> ανοίγει τον πίνακα «Ρύθμιση καταρράκτη». Κανονικά η εφαρμογή παρακολουθεί μόνη της τη στάθμη θορύβου για να αποφασίσει τη σκίαση· αυτός ο πίνακας είναι ο τρόπος να πάρετε εσείς τον έλεγχο όταν η αυτόματη παρακολούθηση δεν ταιριάζει με τις συνθήκες:',
  screens_wfadjust_list: `
    <ul>
      <li><strong>Στάθμη αναφοράς (μαύρο)</strong> — σύροντας δεξιά, περισσότερος θόρυβος υποβάθρου γίνεται μαύρος.</li>
      <li><strong>Αντίθεση</strong> — σύροντας δεξιά, μεγαλώνει η διαφορά ανάμεσα σε ασθενή και ισχυρά σήματα.</li>
      <li><strong>Αυτόματο</strong> — επιστρέφει την απόφαση στην εφαρμογή.</li>
      <li><strong>Εμφάνιση κουμπιών θορύβου και μηνυμάτων</strong> — αν το απενεργοποιήσετε, τα δύο κουμπιά εξαφανίζονται από τον καταρράκτη και η εικόνα γίνεται καθαρότερη. Η αλλαγή ισχύει αμέσως.</li>
      <li><strong>Αντιγραφή</strong> — αντιγράφει στο πρόχειρο τις τρέχουσες στάθμες και απολαβές, για να τις επισυνάψετε σε αναφορά σχετικά με την εμφάνιση.</li>
    </ul>`,

  screens_logs_title: 'Καρτέλα ημερολογίου',
  screens_logs_text:  'Χρονολογική λίστα όλων των ολοκληρωμένων επαφών. Κάθε εγγραφή δείχνει διακριτικό, μπάντα, τρόπο λειτουργίας, ημερομηνία και ώρα (UTC), τετράγωνο, αναφορές RST και κατάσταση επιβεβαίωσης (ανεπιβεβαίωτη / LoTW / QRZ / χειροκίνητη). Πατήστε μια εγγραφή για πλήρη στοιχεία ή για επιβεβαίωση.',

  screens_settings_title: 'Καρτέλα ρυθμίσεων',
  screens_settings_text:  'Όλες οι επιλογές διαμόρφωσης για τον σταθμό σας, τη διεπαφή με τον πομποδέκτη, την αποκωδικοποίηση, το ημερολόγιο και τις εξωτερικές υπηρεσίες. Πλήρης κατάλογος στο κεφάλαιο του οδηγού ρυθμίσεων.',

  screens_more_title: 'Άλλες οθόνες',
  screens_more_text:  'Πέρα από τις βασικές καρτέλες FT8/FT4, το FT8TW περιλαμβάνει και άλλες οθόνες, προσβάσιμες από το μενού πλοήγησης ή από το αιωρούμενο παράθυρο:',
  screens_more_list: `
    <ul>
      <li><strong>JS8</strong> — οθόνη συνομιλίας τύπου chat για τη λειτουργία JS8. Δείτε τη <a href="js8.html">«Λειτουργία συνομιλίας JS8»</a>.</li>
      <li><strong>WSPR</strong> — οθόνη προγραμματισμού φάρου WSPR. Δείτε τον <a href="wspr.html">«Φάρο WSPR»</a>.</li>
      <li><strong>Εργαλεία πομποδέκτη</strong> — μικρόφωνο, παρακολούθηση λήψης και συντονισμός κεραίας. Δείτε τα <a href="ssb.html">«Εργαλεία πομποδέκτη»</a>.</li>
      <li><strong>Χάρτης τετραγώνων</strong> — προβολή χάρτη σε πλήρη οθόνη. Δείτε τον <a href="gridtracker.html">«Χάρτη τετραγώνων»</a>.</li>
      <li><strong>Στατιστικά</strong> — πλήθος QSO ανά μπάντα, λειτουργία, DXCC, ζώνη ITU/CQ και χρονική περίοδο.</li>
      <li><strong>Αναζήτηση QRZ.com</strong> — ενσωματωμένη αναζήτηση διακριτικού στο QRZ.com για τον επιλεγμένο σταθμό.</li>
      <li><strong>Αιωρούμενο παράθυρο</strong> — προαιρετική επικάλυψη πάντα σε πρώτο πλάνο με οκτώ κουμπιά συντόμευσης: απόκρυψη κάτω μενού, συχνότητα, ένταση, χάρτης τετραγώνων, εργαλεία πομποδέκτη, φάρος WSPR, συνομιλία JS8 και <strong>γρήγορη αλλαγή λειτουργίας</strong> (με ένα πάτημα ανάμεσα σε FT8／FT4／FT2／JS8／WSPR). Καθένα εμφανίζεται ή κρύβεται ξεχωριστά στις Ρυθμίσεις. Το <strong>παρατεταμένο πάτημα</strong> στο αιωρούμενο μενού το διπλώνει σε ένα μόνο κουμπί και ένα ακόμη το ξεδιπλώνει· η διπλωμένη κατάσταση διατηρείται μέχρι να κλείσει η εφαρμογή.</li>
    </ul>`,
},

}; /* end PAGE_T */
