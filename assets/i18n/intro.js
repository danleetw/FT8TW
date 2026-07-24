/* ── FT8TW User Manual – i18n: Introduction ──────────────────────── */

const PAGE_T = {

en: {
  intro_title: 'Introduction',
  intro_p1: 'FT8TW is an Android application for FT8/FT4/FT2 digital-mode amateur radio communication, plus JS8 chat, WSPR beacon, and SSB voice. It is a fork of FT8CN (originally developed by BG7YOZ), actively maintained by BV6LC with additional features and improvements tailored for the Taiwan amateur radio community.',
  intro_p2: 'Key features:',
  intro_features: `
    <ul>
      <li>Supports <strong>FT8</strong> (15-second slots), <strong>FT4</strong> (7.5-second slots), and experimental <strong>FT2</strong> digital modes</li>
      <li>Also includes <strong>JS8</strong> chat mode, <strong>WSPR</strong> beacon transmission/decoding, and <strong>SSB</strong> push-to-talk voice</li>
      <li>Connects to <strong>40+ radio models</strong> via USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1, or Xiegu WiFi</li>
      <li>Native <strong>C/C++ signal processing</strong> (LDPC, CRC, Kiss FFT) for high-performance encoding and decoding</li>
      <li>Automatic CQ response with configurable priority strategies</li>
      <li>QSO logging with ADIF export/import and log sharing</li>
      <li>Integration with <strong>QRZ.com</strong> and <strong>PSKReporter</strong></li>
      <li>Maidenhead grid tracker with OpenStreetMap overlay</li>
      <li>ITU, CQ zone, and DXCC statistics</li>
      <li>Light / Dark / System theme</li>
      <li>Requires Android 5.0 (API 21) or later</li>
    </ul>`,
},

'zh-TW': {
  intro_title: '簡介',
  intro_p1: 'FT8TW 是一款 Android 業餘無線電應用程式，支援 FT8／FT4／FT2 數位模式通聯，並提供 JS8 聊天、WSPR 信標及 SSB 語音功能。本程式由 BV6LC 維護，基於 BG7YOZ 開發的 FT8CN，新增了多項功能並針對中文使用者優化。',
  intro_p2: '主要功能：',
  intro_features: `
    <ul>
      <li>支援 <strong>FT8</strong>（15 秒時隙）、<strong>FT4</strong>（7.5 秒時隙）及實驗性的 <strong>FT2</strong> 數位模式</li>
      <li>另支援 <strong>JS8</strong> 聊天模式、<strong>WSPR</strong> 信標發射／解碼，以及 <strong>SSB</strong> 按住通話語音</li>
      <li>透過 USB CAT、藍牙 SPP、FlexRadio WiFi、ICOM RS-BA1 或協谷 WiFi 控制 <strong>40+ 款電台</strong></li>
      <li>使用原生 <strong>C/C++ 訊號處理</strong>（LDPC、CRC、Kiss FFT），編解碼效能優異</li>
      <li>自動回應 CQ，可設定優先策略</li>
      <li>通聯日誌管理，支援 ADIF 匯出／匯入及日誌分享</li>
      <li>整合 <strong>QRZ.com</strong> 及 <strong>PSKReporter</strong></li>
      <li>Maidenhead 網格追蹤器，結合 OpenStreetMap 顯示</li>
      <li>ITU、CQ 分區及 DXCC 統計</li>
      <li>淺色 / 深色 / 跟隨系統佈景</li>
      <li>需要 Android 5.0（API 21）或更新版本</li>
    </ul>`,
},

}; /* end PAGE_T */
