/* ── FT8TW User Manual – i18n: First Setup ───────────────────────── */

const PAGE_T = {

en: {
  setup_title: 'First Setup',
  setup_intro: 'Complete these steps before making your first contact.',

  setup_s1_title: '1. Enter Your Callsign',
  setup_s1_text:  'Open the <strong>Settings</strong> tab and enter your amateur radio callsign in the <em>Callsign</em> field. The app validates the format and will refuse to transmit if the callsign is invalid. Secondary callsigns and portable suffixes (e.g., BV6LC/P) are supported.',

  setup_s2_title: '2. Enter Your Grid Locator',
  setup_s2_text:  'Enter your 4-character or 6-character <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead grid locator</a> in the <em>Grid square</em> field (e.g., <code>PL05</code> or <code>PL05so</code>). This locator is transmitted in FT8 messages and used to calculate distances. Tap the locate button to fill in your grid automatically using GPS.',

  setup_s3_title: '3. Select Operating Band',
  setup_s3_text:  'Choose your carrier frequency band (e.g., 20m, 40m) from the <em>Frequency</em> selector. If CAT control is connected, the app will automatically tune the radio to the standard FT8 dial frequency for that band.',

  setup_s4_title: '4. Select FT4 or FT8 Mode',
  setup_s4_text:  'Use the <em>FT4/FT8 mode</em> toggle to choose your operating mode. FT8 uses 15-second TX/RX slots and is the more widely used mode. FT4 uses 7.5-second slots and is approximately 4 dB less sensitive but twice as fast.',

  setup_s5_title: '5. Synchronize Time',
  setup_s5_text:  'FT8 decoding requires your device clock to be accurate to within ±1 second. In Settings, tap <strong>Sync</strong> to synchronize with an internet NTP server. A GPS fix also provides highly accurate time. The app displays the current time offset after synchronization.',
},

'zh-TW': {
  setup_title: '初始設定',
  setup_intro: '首次使用前，請完成以下設定。',

  setup_s1_title: '1. 輸入呼號',
  setup_s1_text:  '開啟<strong>設置</strong>頁面，在<em>我的呼號</em>欄位輸入您的業餘無線電呼號。程式會驗證呼號格式，若呼號無效將無法發射。支援附加字尾（如 BV6LC/P）。',

  setup_s2_title: '2. 輸入網格座標',
  setup_s2_text:  '在<em>我的位置</em>欄位輸入 4 碼或 6 碼的 <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead 網格座標</a>（例如 <code>PL05</code> 或 <code>PL05so</code>）。此座標會在 FT8 訊息中傳送，也用於計算通聯距離。可點選定位按鈕由 GPS 自動填入。',

  setup_s3_title: '3. 選擇頻段',
  setup_s3_text:  '從<em>載波頻段</em>選擇器選擇操作頻段（如 20m、40m）。若已連接 CAT 控制，程式會自動將電台調至該頻段的 FT8 標準頻率。',

  setup_s4_title: '4. 選擇 FT4 或 FT8 模式',
  setup_s4_text:  '使用<em>FT4/FT8 模式</em>切換選擇操作模式。FT8 使用 15 秒時隙，使用較為普遍。FT4 使用 7.5 秒時隙，速度較快但靈敏度低約 4 dB。',

  setup_s5_title: '5. 時間同步',
  setup_s5_text:  'FT8 解碼需要裝置時間準確至 ±1 秒內。在設置頁面點選<strong>同步時間</strong>，透過網路 NTP 伺服器校時。取得 GPS 訊號亦可提供高精度時間。同步後程式會顯示目前的時間偏差值。',
},

}; /* end PAGE_T */
