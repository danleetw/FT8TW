/* ── FT8TW User Manual – i18n: Settings Reference ────────────────── */

const PAGE_T = {

en: {
  set_title: 'Settings Reference',

  set_station_title: 'Station',
  set_station_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Callsign</td><td>Your amateur radio callsign (required to transmit)</td></tr>
      <tr><td>Grid square</td><td>Your 4- or 6-character Maidenhead locator</td></tr>
    </table>`,

  set_radio_title: 'Radio / Connection',
  set_radio_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Connection type</td><td>USB, Bluetooth, Network, or VOX</td></tr>
      <tr><td>Radio model</td><td>Your transceiver model (USB / Bluetooth mode)</td></tr>
      <tr><td>Serial port</td><td>USB serial device path</td></tr>
      <tr><td>Baud rate</td><td>CAT serial speed (must match radio setting)</td></tr>
      <tr><td>CI-V address</td><td>ICOM CI-V bus address (ICOM radios only)</td></tr>
      <tr><td>PTT control</td><td>VOX / CAT / RTS / DTR – how PTT is asserted</td></tr>
      <tr><td>PTT delay</td><td>Milliseconds to wait after PTT before sending audio</td></tr>
      <tr><td>TX delay</td><td>Audio output timing compensation (ms)</td></tr>
    </table>`,

  set_op_title: 'Operation',
  set_op_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Frequency</td><td>Operating band / carrier frequency</td></tr>
      <tr><td>FT4 / FT8 mode</td><td>Toggle between FT4 and FT8</td></tr>
      <tr><td>Audio freq</td><td>Default TX audio frequency in Hz (0–2900)</td></tr>
      <tr><td>Decode mode</td><td>Fast / Standard / Deep</td></tr>
      <tr><td>Message mode</td><td>Standard or Simple display layout</td></tr>
      <tr><td>TX watchdog</td><td>Auto-stop TX after N minutes (0 = off)</td></tr>
      <tr><td>No response</td><td>Stop calling after N unanswered TX cycles</td></tr>
      <tr><td>CQ method</td><td>Priority strategy for Auto response CQ</td></tr>
      <tr><td>Exclude QSOs</td><td>Skip stations worked within selected time window</td></tr>
      <tr><td>Time offset</td><td>Manual clock correction in seconds</td></tr>
      <tr><td>Sync</td><td>Synchronize clock with internet NTP server</td></tr>
    </table>`,

  set_audio_title: 'Audio',
  set_audio_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Sample rate</td><td>12 kHz (default), 24 kHz, or 48 kHz</td></tr>
      <tr><td>Bit depth</td><td>16-bit integer or 32-bit float audio output</td></tr>
    </table>`,

  set_display_title: 'Display &amp; Misc',
  set_display_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Theme</td><td>Light, Dark, or follow device setting</td></tr>
      <tr><td>Keep Screen On</td><td>Prevent the screen from turning off during operation</td></tr>
      <tr><td>SWR / ALC Alert</td><td>Pop-up warning when SWR or ALC exceeds safe limits</td></tr>
      <tr><td>Save SWL Decoded</td><td>Store all decoded messages to the database (increases storage use)</td></tr>
      <tr><td>Save QSO for SWL</td><td>Log overheard QSOs between other stations</td></tr>
      <tr><td>Clear QSO count</td><td>Reset the session QSO counter</td></tr>
      <tr><td>Del Temp files</td><td>Remove temporary log sharing files</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>JS8 speed</td><td>Normal / Fast / Turbo / Slow submode</td></tr>
      <tr><td>JS8 heartbeat</td><td>Off, or every 10 / 15 / 30 minutes</td></tr>
      <tr><td>JS8 auto-reply</td><td>Auto-answer directed queries and/or CQ calls addressed to you</td></tr>
      <tr><td>JS8 enhanced encoding (UTX)</td><td>Force free text to always use the Unicode-capable encoding, even for plain ASCII</td></tr>
      <tr><td>WSPR TX power</td><td>Power level (dBm) encoded in the beacon message</td></tr>
      <tr><td>Waterfall color scheme</td><td>Classic or rainbow color mapping for the spectrum/waterfall display</td></tr>
      <tr><td>Floating window</td><td>Master toggle plus individual show/hide for each shortcut button</td></tr>
    </table>`,
},

'zh-TW': {
  set_title: '設定說明',

  set_station_title: '站台',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>我的呼號</td><td>您的業餘無線電呼號（發射前必填）</td></tr>
      <tr><td>我的位置（Grid）</td><td>4 碼或 6 碼 Maidenhead 網格座標</td></tr>
    </table>`,

  set_radio_title: '電台 / 連線',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>連接方式</td><td>USB、藍牙、網路或 VOX</td></tr>
      <tr><td>電台型號</td><td>您的電台型號（USB / 藍牙模式）</td></tr>
      <tr><td>連接埠</td><td>USB 序列裝置路徑</td></tr>
      <tr><td>傳輸速率</td><td>CAT 序列速度（須與電台設定相符）</td></tr>
      <tr><td>CI-V 地址</td><td>ICOM CI-V 匯流排地址（僅 ICOM 電台）</td></tr>
      <tr><td>PTT 控制方式</td><td>VOX / CAT / RTS / DTR</td></tr>
      <tr><td>PTT 延遲</td><td>PTT 觸發後至開始發射音訊的等待時間（毫秒）</td></tr>
      <tr><td>發射延遲</td><td>音訊輸出時序補償（毫秒）</td></tr>
    </table>`,

  set_op_title: '操作',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>載波頻段</td><td>操作頻段</td></tr>
      <tr><td>FT4/FT8 模式</td><td>切換 FT4 或 FT8</td></tr>
      <tr><td>預設頻率</td><td>預設發射音訊頻率（0–2900 Hz）</td></tr>
      <tr><td>解碼模式</td><td>快速 / 標準 / 多次</td></tr>
      <tr><td>顯示模式</td><td>標準列表或精簡列表</td></tr>
      <tr><td>發射監管</td><td>N 分鐘後自動停止發射（0 = 停用）</td></tr>
      <tr><td>沒回應</td><td>N 次無回應後停止呼叫</td></tr>
      <tr><td>回應 CQ 方案</td><td>自動回應 CQ 的優先策略</td></tr>
      <tr><td>排除已通聯</td><td>跳過在選定時間窗口內已通聯過的電台</td></tr>
      <tr><td>時間偏移</td><td>手動時鐘修正（秒）</td></tr>
      <tr><td>同步時間</td><td>透過網路 NTP 伺服器校時</td></tr>
    </table>`,

  set_audio_title: '音訊',
  set_audio_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>取樣頻率</td><td>12 kHz（預設）、24 kHz 或 48 kHz</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮點音訊輸出</td></tr>
    </table>`,

  set_display_title: '顯示與其他',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>佈景模式</td><td>淺色、深色或跟隨裝置設定</td></tr>
      <tr><td>防止螢幕關閉</td><td>操作中防止螢幕自動熄滅</td></tr>
      <tr><td>SWR / ALC 警報</td><td>駐波比或 ALC 超出安全值時顯示警告</td></tr>
      <tr><td>保存解碼訊息</td><td>將所有解碼訊息存入資料庫（增加儲存空間使用量）</td></tr>
      <tr><td>保存 SWL 記錄</td><td>記錄監聽到的其他電台 QSO</td></tr>
      <tr><td>清除 QSO 計數</td><td>重設本次作業的 QSO 計數器</td></tr>
      <tr><td>清除暫存檔</td><td>刪除日誌分享的暫存檔案</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>JS8 速度</td><td>Normal / Fast / Turbo / Slow 子模式</td></tr>
      <tr><td>JS8 heartbeat</td><td>關閉，或每 10／15／30 分鐘廣播一次</td></tr>
      <tr><td>JS8 自動回覆</td><td>自動應答指向自己的查詢指令，及／或自動回應 CQ</td></tr>
      <tr><td>JS8 強化編碼（UTX）</td><td>強制自由文字一律使用可承載 Unicode 的編碼，即使是純 ASCII 內容</td></tr>
      <tr><td>WSPR 發射功率</td><td>編碼進信標訊息的功率等級（dBm）</td></tr>
      <tr><td>瀑布圖色階</td><td>頻譜／瀑布圖顯示採經典色階或彩虹色階</td></tr>
      <tr><td>浮動視窗</td><td>總開關，以及各快捷按鈕的個別顯示／隱藏</td></tr>
    </table>`,
},

}; /* end PAGE_T */
