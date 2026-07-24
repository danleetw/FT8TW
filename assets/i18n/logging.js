/* ── FT8TW User Manual – i18n: QSO Logging ───────────────────────── */

const PAGE_T = {

en: {
  log_title: 'QSO Logging',
  log_intro: 'FT8TW logs every completed QSO automatically. The log database stores date/time (UTC), callsign, band, mode, frequency, RST reports, grid locator, and confirmation status.',

  log_view_title:  'Viewing Logs',
  log_view_text:   'Open the <strong>QSO Logs</strong> tab to browse your contact history. Tap a log entry to view full details. Long-press an entry to manually mark it as confirmed.',
  log_view_filter: 'Filter options: <em>Show all</em>, <em>Show confirmed</em>, or <em>Show unconfirmed</em>.',

  log_export_title: 'Exporting Logs',
  log_export_text:  'Logs are exported via FT8TW\'s built-in web server. Tap <strong>Export</strong> in the Logs tab; the app displays a local URL. Open that URL in a browser on any device on the same WiFi network. Available export formats:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> – Industry-standard amateur radio log format; compatible with LoTW, WSJT-X, Log4OM, N1MM, and most logging software</li>
      <li><strong>CSV</strong> – Comma-separated values for spreadsheet analysis</li>
      <li><strong>TEXT</strong> – Human-readable plain text</li>
      <li><strong>SOTA</strong> – Summits on the Air format (requires SOTA summit reference)</li>
    </ul>`,
  log_share_text: 'Alternatively, use <strong>Share logs</strong> (in the Logs menu) to send an ADIF file directly via Android\'s share sheet — email, cloud storage, messaging apps, etc.',

  log_import_title: 'Importing Logs',
  log_import_text:  'Import ADIF files via the web UI to synchronize log history from other software (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32, etc.). The importer reports how many records were added, updated, or skipped.',

  log_confirm_title: 'Confirming QSOs',
  log_confirm_text:  'QSOs can be confirmed through three methods:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> – Download your LoTW ADIF file from <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> and import it; matching contacts are marked as LoTW-confirmed</li>
      <li><strong>QRZ.com Logbook</strong> – Enable auto-upload (Settings → QRZ.com); QRZ.com automatically marks mutual contacts as confirmed</li>
      <li><strong>Manual</strong> – Long-press any log entry and tap <em>Manual confirmation</em></li>
    </ul>`,
},

'zh-TW': {
  log_title: '通聯記錄',
  log_intro: 'FT8TW 自動記錄每筆完成的通聯。日誌資料庫儲存 UTC 時間、呼號、頻段、模式、頻率、RST 報告、網格座標及確認狀態。',

  log_view_title:  '查看記錄',
  log_view_text:   '開啟<strong>通聯記錄</strong>頁面可瀏覽聯絡歷史。點選任一記錄查看完整資訊，長按記錄可手動標記為已確認。',
  log_view_filter: '篩選選項：<em>顯示全部</em>、<em>只顯示確認的</em> 或 <em>只顯示未確認的</em>。',

  log_export_title: '匯出日誌',
  log_export_text:  '日誌透過 FT8TW 內建的 Web 伺服器匯出。點選記錄頁面的<strong>匯出</strong>，程式會顯示一組本地網址；在同一 WiFi 網路的其他裝置瀏覽器中開啟該網址即可下載。支援格式：',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — 業餘無線電標準日誌格式，相容 LoTW、WSJT-X、Log4OM、N1MM 等</li>
      <li><strong>CSV</strong> — 逗號分隔格式，可用試算表軟體分析</li>
      <li><strong>TEXT</strong> — 純文字格式</li>
      <li><strong>SOTA</strong> — 山峰通聯（Summits on the Air）格式（需填入山峰編號）</li>
    </ul>`,
  log_share_text: '也可使用<strong>分享通聯紀錄</strong>功能（記錄選單中），透過 Android 分享介面直接傳送 ADIF 檔案——電子郵件、雲端儲存、通訊軟體等均可使用。',

  log_import_title: '匯入日誌',
  log_import_text:  '透過 Web UI 匯入 ADIF 檔案，可同步來自其他軟體（JTDX、WSJT-X、LoTW、Log4OM、N1MM、Log32 等）的歷史記錄。匯入完成後程式會顯示新增、更新及略過的記錄數。',

  log_confirm_title: '確認通聯',
  log_confirm_text:  '通聯可透過三種方式確認：',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — 從 <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> 下載您的 LoTW ADIF 檔並匯入，符合的記錄會標記為 LoTW 已確認</li>
      <li><strong>QRZ.com 日誌簿</strong> — 啟用自動上傳（設置 → QRZ.com）；雙方均上傳後 QRZ.com 自動標記為已確認</li>
      <li><strong>手工確認</strong> — 長按任一日誌記錄，點選<em>手工確認</em></li>
    </ul>`,
},

}; /* end PAGE_T */
