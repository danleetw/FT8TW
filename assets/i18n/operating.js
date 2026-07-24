/* ── FT8TW User Manual – i18n: Operating FT8 / FT4 ───────────────── */

const PAGE_T = {

en: {
  op_title: 'Operating FT8 / FT4',

  op_rx_title:      'Receiving',
  op_rx_text:       'Tap <strong>Start decoding</strong> on the Content or Decode tab. The app records audio and decodes FT8/FT4 messages at the start of each 15-second (FT8) or 7.5-second (FT4) slot. Decoded stations appear in the Content list.',
  op_rx_tips_label: 'Tips for good reception:',
  op_rx_tips: `
    <ul>
      <li>Set your radio to <strong>USB mode</strong> (Upper Sideband). Do not use LSB, AM, or FM for FT8.</li>
      <li>Center the audio passband around <strong>1500 Hz</strong> for best results. The valid audio range is 200–2700 Hz.</li>
      <li>Adjust the radio's AF gain so the audio level is strong but not clipping. Clipping causes decoding failures.</li>
      <li>Use <strong>Deep</strong> decode mode for weak-signal DX conditions.</li>
      <li>Enable <strong>DeNoise</strong> on the Spectrum screen to suppress broadband noise.</li>
    </ul>`,

  op_tx_title: 'Making a Contact',
  op_tx_text:  'A typical FT8 QSO is fully automated once you select a target station:',
  op_tx_seq: `
    <ol>
      <li>In the <strong>Content</strong> tab, tap a station calling CQ to select them as your target.</li>
      <li>Switch to the <strong>Calling</strong> tab and tap <strong>TX</strong> to start transmitting.</li>
      <li>The app automatically sequences through the FT8 exchange:<br>
        <code>CQ reply → RST report → RRR → 73</code></li>
      <li>The QSO is logged automatically upon completion.</li>
    </ol>`,

  op_autocq_title: 'Auto CQ Response',
  op_autocq_text:  'Enable <strong>Auto response CQ</strong> in the Calling tab to respond to CQ calls without manual intervention. Select a priority strategy in Settings → CQ method:',
  op_autocq_opts: `
    <ul>
      <li><strong>Strong &amp; Nearby</strong> – Prioritize stations with strong signals and short distance</li>
      <li><strong>Grid Distance: Far</strong> – Prefer distant stations (useful for distance award chasers)</li>
      <li><strong>Grid Distance: Near</strong> – Prefer nearby stations</li>
      <li><strong>More (ITU/CQ/DX) Zone</strong> – Prefer zones where most stations are calling</li>
      <li><strong>ITU / CQ / DX Zone Priority</strong> – Prefer specific zone types for award chasing</li>
    </ul>`,
  op_autocq_filter: 'Use <strong>Exclude QSOs</strong> in Settings to automatically skip stations already worked within a selected time window (1 hour, 4 hours, Today, 30 days, or 365 days).',

  op_watchdog_title: 'TX Watchdog',
  op_watchdog_text:  'The TX watchdog automatically stops transmitting after a configurable time limit (in minutes) to prevent accidentally prolonged transmission. Set the limit in Settings → TX watchdog. Set to 0 to disable.',

  op_noresponse_title: 'No Response Limit',
  op_noresponse_text:  'If the called station does not reply after a set number of TX cycles, the app stops calling automatically and frees the system for the next station. Configure the limit in Settings → No response.',

  op_freetext_title: 'Free Text Mode',
  op_freetext_text:  'Tap the free text icon in the Calling tab to enter a custom message up to 13 characters. Free text bypasses the standard FT8 QSO sequence — use it for special event messages or announcements. Switch back to Standard Message Mode to resume normal QSOs.',

  op_ft2_title: 'FT2 (Experimental)',
  op_ft2_text:  'FT8TW includes early support for FT2, a faster FT4-derived mode. FT2 has not yet been field-verified against a second station and should be considered experimental — please report any issues you encounter.',
},

'zh-TW': {
  op_title: '操作 FT8 / FT4',

  op_rx_title:      '接收',
  op_rx_text:       '點選通聯內容或解碼頁面的<strong>開始解碼</strong>。程式會開始錄製音訊，並在每個 15 秒（FT8）或 7.5 秒（FT4）時隙開始時進行解碼。解碼到的電台會顯示在通聯內容清單中。',
  op_rx_tips_label: '接收品質提示：',
  op_rx_tips: `
    <ul>
      <li>電台請設定為 <strong>USB 模式</strong>（上旁頻）。勿使用 LSB、AM 或 FM。</li>
      <li>將音訊通帶中心設在 <strong>1500 Hz</strong> 附近效果最佳，有效音訊範圍為 200–2700 Hz。</li>
      <li>調整電台的 AF 增益，確保音訊訊號強勁但不失真。失真會造成解碼失敗。</li>
      <li>弱訊號 DX 情況下使用<strong>多次</strong>解碼模式。</li>
      <li>在頻譜畫面開啟<strong>噪聲抑制（DeNoise）</strong>以降低寬頻雜訊。</li>
    </ul>`,

  op_tx_title: '建立通聯',
  op_tx_text:  '選定目標電台後，FT8 通聯流程將全自動進行：',
  op_tx_seq: `
    <ol>
      <li>在<strong>通聯內容</strong>頁面，點選正在呼叫 CQ 的電台以選定為目標。</li>
      <li>切換至<strong>呼叫</strong>頁面，點選<strong>發射</strong>開始通聯。</li>
      <li>程式自動依序完成 FT8 通聯流程：<br>
        <code>回應 CQ → 訊號報告 → RRR → 73</code></li>
      <li>通聯完成後自動記錄至日誌。</li>
    </ol>`,

  op_autocq_title: '自動回應 CQ',
  op_autocq_text:  '在呼叫頁面開啟<strong>自動回應 CQ</strong>，程式將自動回應收到的 CQ 呼叫，無需手動操作。在設置 → 回應 CQ 方案中選擇優先策略：',
  op_autocq_opts: `
    <ul>
      <li><strong>距離短、強度強優先</strong> — 優先回應訊號強且距離近的電台</li>
      <li><strong>遠距優先</strong> — 優先回應最遠的電台（適合距離獎項追求者）</li>
      <li><strong>近距優先</strong> — 優先回應最近的電台</li>
      <li><strong>區域最多優先（ITU/CQ/DX）</strong> — 優先回應呼叫數量最多的分區</li>
      <li><strong>ITU / CQ / DX 分區優先</strong> — 依指定分區類型優先排序（適合獎項追求）</li>
    </ul>`,
  op_autocq_filter: '在設置中使用<strong>排除已通聯</strong>，可自動跳過在選定時間窗口內（1 小時、4 小時、今天、30 天、365 天）已通聯過的電台。',

  op_watchdog_title: '發射監管（TX Watchdog）',
  op_watchdog_text:  '發射監管功能在設定的分鐘數後自動停止發射，防止意外長時間佔用頻道。在設置 → 發射監管中設定時間限制，設為 0 表示停用。',

  op_noresponse_title: '沒回應次數限制',
  op_noresponse_text:  '若被呼叫的電台在設定的週期數內均無回應，程式將自動停止呼叫，以便嘗試下一個目標。在設置 → 沒回應中設定次數限制。',

  op_freetext_title: '自定義訊息模式',
  op_freetext_text:  '點選呼叫頁面的自定義訊息圖示，輸入最多 13 個字元的自由文字。自定義訊息會跳過標準 FT8 通聯流程，適用於特殊活動或公告。點選「標準訊息模式」可返回正常通聯。',

  op_ft2_title: 'FT2（實驗性）',
  op_ft2_text:  'FT8TW 已初步支援 FT2，這是基於 FT4 衍生、速度更快的模式。FT2 尚未完成與第二台電台的實機互測，請視為實驗性功能，若遇到問題還請回報。',
},

}; /* end PAGE_T */
