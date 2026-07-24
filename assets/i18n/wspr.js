/* ── FT8TW User Manual – i18n: WSPR Beacon ───────────────────────── */

const PAGE_T = {

en: {
  wspr_title: 'WSPR Beacon',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) is a low-power beacon mode used to study radio propagation. FT8TW supports scheduled WSPR transmission, plus experimental WSPR decoding.',

  wspr_tx_title: 'Beacon Transmission',
  wspr_tx_text:  'Open the WSPR tab to configure and arm a beacon schedule:',
  wspr_tx_list: `
    <ul>
      <li>Requires a standard-format callsign (a digit in the 2nd or 3rd position).</li>
      <li>Just before each scheduled transmission, the radio's frequency automatically switches to the WSPR sub-band, then reverts to your normal operating frequency afterward.</li>
      <li>Select TX power (dBm) to be encoded in the beacon message.</li>
      <li>The scheduler automatically disarms after a completed transmission and must be manually re-armed for the next one — this is intentional, to prevent unattended continuous beaconing.</li>
      <li>A countdown timer and a preview of the next scheduled message are shown on the WSPR tab.</li>
    </ul>`,

  wspr_rx_title: 'Decoding (Experimental)',
  wspr_rx_text:  'WSPR decoding is provided on a best-effort basis and is considered experimental: it decodes a single signal at a time and does not compensate for receiver clock drift. For serious propagation monitoring, a dedicated WSPR decoder is still recommended.',
},

'zh-TW': {
  wspr_title: 'WSPR 信標',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）是一種低功率信標模式，用於研究無線電傳播狀況。FT8TW 支援排程發射 WSPR 信標，並提供實驗性的 WSPR 解碼功能。',

  wspr_tx_title: '信標發射',
  wspr_tx_text:  '開啟 WSPR 分頁即可設定並啟用信標排程：',
  wspr_tx_list: `
    <ul>
      <li>需使用標準格式呼號（第 2 或第 3 碼為數字）。</li>
      <li>每次排程發射前，電台頻率會自動切到 WSPR 子頻段，發射結束後自動切回原本的操作頻率。</li>
      <li>可選擇要編碼進信標訊息的發射功率（dBm）。</li>
      <li>排程在完成一次發射後會自動停用，須手動重新啟用才會進行下一次發射——這是刻意設計，避免無人看管下持續發射信標。</li>
      <li>WSPR 分頁會顯示倒數計時，以及下一則排程訊息的預覽。</li>
    </ul>`,

  wspr_rx_title: '解碼（實驗性）',
  wspr_rx_text:  'WSPR 解碼功能屬於盡力而為的實驗性功能：一次僅能解出單一訊號，且未補償接收端時鐘漂移。若需嚴謹的傳播監測，仍建議使用專門的 WSPR 解碼軟體。',
},

}; /* end PAGE_T */
