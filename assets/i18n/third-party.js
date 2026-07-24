/* ── FT8TW User Manual – i18n: Third-party Services ──────────────── */

const PAGE_T = {

en: {
  third_title: 'Third-party Services',

  third_qrz_title: 'QRZ.com Logbook',
  third_qrz_text:  'Automatically upload completed QSOs to your QRZ.com online logbook. Requires a QRZ.com XML Subscription.',
  third_qrz_setup: `
    <ol>
      <li>Go to Settings → <strong>QRZ.com Settings</strong>.</li>
      <li>Enter your <strong>QRZ.com API Key</strong> (found under your callsign page → Logbook settings).</li>
      <li>Enable <strong>Auto-upload to QRZ.com</strong>.</li>
      <li>Use the <strong>Manual Upload</strong> button to push existing logs on demand.</li>
    </ol>`,

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> is a worldwide propagation mapping service. FT8TW submits reception spots automatically — no account is required. Enable the feature in Settings → PSKReporter. Your callsign, grid, and received station data are submitted anonymously over HTTPS.',
},

'zh-TW': {
  third_title: '第三方服務',

  third_qrz_title: 'QRZ.com 日誌簿',
  third_qrz_text:  '自動將完成的通聯上傳至您的 QRZ.com 線上日誌簿。需要 QRZ.com XML 訂閱方案。',
  third_qrz_setup: `
    <ol>
      <li>進入設置 → <strong>QRZ.com 設定</strong>。</li>
      <li>輸入您的 <strong>QRZ.com API 金鑰</strong>（在 QRZ.com 呼號頁面 → Logbook 設定中取得）。</li>
      <li>開啟<strong>自動上傳至 QRZ.com</strong>。</li>
      <li>可點選<strong>手動上傳</strong>按鈕立即推送現有日誌。</li>
    </ol>`,

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球無線電傳播地圖服務。FT8TW 可自動提交收聽報告，無需帳號。在設置中開啟 PSKReporter 功能。您的呼號、網格及收聽到的電台資訊將透過 HTTPS 匿名提交。',
},

}; /* end PAGE_T */
