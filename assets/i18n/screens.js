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

  screens_logs_title: 'QSO Logs Tab',
  screens_logs_text:  'A chronological list of all completed QSOs. Each entry shows callsign, band, mode, date/time (UTC), grid, RST reports, and confirmation status (Unconfirmed / LoTW / QRZ / Manual). Tap an entry to view full details or confirm the contact.',

  screens_settings_title: 'Settings Tab',
  screens_settings_text:  'All configuration options for your station, radio interface, decoding, logging, and third-party integrations. See the Settings Reference section for a complete list.',

  screens_more_title: 'Other Screens',
  screens_more_text:  'Beyond the core FT8/FT4 tabs, FT8TW includes several additional screens, accessible from the navigation menu or the floating shortcut window:',
  screens_more_list: `
    <ul>
      <li><strong>Spectrum</strong> – Live waterfall and spectrum display of the receive audio, with adjustable color scheme and noise-floor-anchored contrast; also shows your own transmit audio during TX.</li>
      <li><strong>JS8</strong> – Chat-style conversation screen for JS8 mode. See the <a href="js8.html">JS8 Chat Mode</a> section.</li>
      <li><strong>WSPR</strong> – Beacon scheduling screen for WSPR mode. See the <a href="wspr.html">WSPR Beacon</a> section.</li>
      <li><strong>SSB</strong> – Push-to-talk voice screen. See the <a href="ssb.html">SSB Voice</a> section.</li>
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

  screens_logs_title: '通聯記錄（QSO Logs）',
  screens_logs_text:  '依時序顯示所有已完成的通聯記錄。每筆包含呼號、頻段、模式、UTC 時間、網格、RST 報告及確認狀態（未確認 / LoTW / QRZ / 手工確認）。點選記錄可查看詳情或確認通聯。',

  screens_settings_title: '設置（Settings）',
  screens_settings_text:  '包含電台資訊、電台連線、解碼、日誌、第三方整合等所有設定選項。詳細說明請參閱「設定說明」章節。',

  screens_more_title: '其他畫面',
  screens_more_text:  '除了核心的 FT8/FT4 分頁之外，FT8TW 還有下列畫面，可從導覽選單或浮動快捷視窗開啟：',
  screens_more_list: `
    <ul>
      <li><strong>頻譜（Spectrum）</strong> — 即時顯示接收音訊的瀑布圖與頻譜，色階可切換，黑點錨定雜訊地板以維持對比；發射時也會顯示自己的發射音訊。</li>
      <li><strong>JS8</strong> — JS8 模式的聊天式對話畫面，詳見<a href="js8.html">「JS8 聊天模式」</a>章節。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信標排程畫面，詳見<a href="wspr.html">「WSPR 信標」</a>章節。</li>
      <li><strong>SSB</strong> — 按住通話語音畫面，詳見<a href="ssb.html">「SSB 語音」</a>章節。</li>
      <li><strong>網格追蹤（Grid Tracker）</strong> — 全螢幕地圖畫面，詳見<a href="gridtracker.html">「網格追蹤地圖」</a>章節。</li>
      <li><strong>統計（Count）</strong> — 依頻段、模式、DXCC、ITU/CQ 分區及時間區間統計 QSO 數量。</li>
      <li><strong>QRZ.com 查詢</strong> — 內嵌 QRZ.com 呼號查詢，顯示目前選定電台的資料。</li>
      <li><strong>浮動視窗</strong> — 可選的常駐懸浮功能表（頻率、音量、網格追蹤等快捷按鈕），每個按鈕可在設置中個別開關。</li>
    </ul>`,
},

}; /* end PAGE_T */
