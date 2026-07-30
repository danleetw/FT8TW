/* ── FT8TW User Manual – i18n: Settings Reference ────────────────── */

const PAGE_T = {

en: {
  set_title: 'Settings Reference',

  set_profile_title: 'Profiles',
  set_profile_text:  'Settings can be kept as several named profiles and switched in one step — handy when you move between a home rig, a portable radio and a club station, each with its own connection type, baud rate and CI-V address. Use the buttons beside the profile name to add, rename or delete one.',
  set_profile_note: 'Not every setting belongs to a profile. Those that do are marked in the app with a <strong>purple stripe</strong> down the left edge; anything without the stripe is shared by all profiles.',

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
      <tr><td>Data bits / Parity / Stop bits</td><td>Serial frame format; leave at the defaults unless your radio's manual says otherwise</td></tr>
      <tr><td>Antenna</td><td>Which antenna port the radio should select, on rigs that support it</td></tr>
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
      <tr><td>Contest mode (grid exchange)</td><td>Send <code>R</code> + your grid instead of a signal report; see <a href="operating.html">Operating FT8 / FT4</a></td></tr>
      <tr><td>CQ Modifier</td><td>Edit the list of modifiers available for your CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Auto track CQ</td><td>Keep following stations calling CQ as they appear</td></tr>
      <tr><td>Follow</td><td>Callsigns to keep in view so you can catch them when they show up</td></tr>
      <tr><td>Excluded prefixes</td><td>Prefixes the automation should never answer</td></tr>
      <tr><td>Show worked stations</td><td>Keep already-worked stations in the list, shown with a strikethrough</td></tr>
      <tr><td>Frequency Table</td><td>Edit the band/frequency table the app offers you</td></tr>
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
      <tr><td>Language</td><td>Interface language, independent of the system setting</td></tr>
      <tr><td>List font size</td><td>Text size in the decode and log lists</td></tr>
      <tr><td>Mini waterfall (Decode / Call)</td><td>Show a compact waterfall strip on either tab; separate switches</td></tr>
      <tr><td>QSO success: flash / ripple / flashlight / QRZ photo</td><td>Four independent ways to announce a completed QSO; see <a href="logging.html">QSO Logging</a></td></tr>
      <tr><td>Clear caches</td><td>Discard cached callsign-tracking data and log caches</td></tr>
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

  set_services_title: 'Services, Backup &amp; Activation',
  set_services_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>QRZ.com API key / auto-upload</td><td>Upload finished QSOs to your QRZ.com logbook</td></tr>
      <tr><td>PSKReporter</td><td>Submit reception spots to the propagation map</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Server address, API key and Station ID, plus a connection test; see <a href="third-party.html">Third-party Services</a></td></tr>
      <tr><td>Auto backup on startup</td><td>Back up the log database when the app starts</td></tr>
      <tr><td>Interval (days) / Keep generations</td><td>How often to back up, and how many older copies to retain</td></tr>
      <tr><td>Backup folder</td><td>Where backup files are written</td></tr>
      <tr><td>Backup now / Restore backup</td><td>Take a backup immediately, or restore an earlier one</td></tr>
      <tr><td>Activation mode (SOTA / POTA)</td><td>Write your own summit or park reference into every logged QSO</td></tr>
      <tr><td>My SOTA / My POTA</td><td>The references used while activation mode is on</td></tr>
    </table>`,
},

'zh-TW': {
  set_title: '設定說明',

  set_profile_title: '設定檔（Profile）',
  set_profile_text:  '設定可以存成多組具名的設定檔，一步就能切換——在家用電台、隨身機與社團電台之間移動時特別方便，因為各自的連接方式、傳輸速率與 CI-V 地址都不同。設定檔名稱旁的按鈕可新增、更名或刪除。',
  set_profile_note: '並非所有設定都屬於設定檔。屬於的項目在 App 中會於左緣標示一道<strong>紫色色條</strong>；沒有色條的項目則是所有設定檔共用。',

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
      <tr><td>資料位元 / 同位 / 停止位元</td><td>序列埠的資料框格式；除非電台手冊另有說明，保持預設值即可</td></tr>
      <tr><td>天線</td><td>要電台切換到哪一個天線埠（限支援的機種）</td></tr>
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
      <tr><td>競賽模式（交換網格）</td><td>改送 <code>R</code> + 自己的網格取代訊號報告，詳見<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
      <tr><td>CQ 對象</td><td>編輯 CQ 可用的修飾詞清單（DX、EU、TEST…）</td></tr>
      <tr><td>自動追蹤 CQ</td><td>持續追蹤出現的 CQ 呼叫</td></tr>
      <tr><td>追蹤呼號</td><td>要留在視線內的呼號，一出現就能抓到</td></tr>
      <tr><td>排除前綴</td><td>自動回應永遠不去回的呼號前綴</td></tr>
      <tr><td>顯示已通聯電台</td><td>已通聯過的電台仍留在清單中，以刪除線標示</td></tr>
      <tr><td>頻率表</td><td>編輯程式提供的頻段／頻率對照表</td></tr>
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
      <tr><td>語言</td><td>介面語言，與系統語言各自獨立</td></tr>
      <tr><td>清單字級</td><td>解碼與日誌清單的文字大小</td></tr>
      <tr><td>小瀑布圖（解碼／呼叫）</td><td>在兩個分頁顯示精簡瀑布圖，各有獨立開關</td></tr>
      <tr><td>通聯成功：閃畫面／水波／閃光燈／QRZ 照片</td><td>四種各自獨立的完成提示，詳見<a href="logging.html">「通聯記錄」</a></td></tr>
      <tr><td>清除快取</td><td>清掉呼號追蹤資料與日誌快取</td></tr>
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

  set_services_title: '服務、備份與啟動',
  set_services_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>QRZ.com API 金鑰／自動上傳</td><td>將完成的通聯上傳至 QRZ.com 日誌簿</td></tr>
      <tr><td>PSKReporter</td><td>提交收聽報告至全球傳播地圖</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>伺服器位址、API Key 與 Station ID，並可測試連線，詳見<a href="third-party.html">「第三方服務」</a></td></tr>
      <tr><td>開機時自動備份</td><td>App 啟動時備份日誌資料庫</td></tr>
      <tr><td>間隔（天）／保留份數</td><td>多久備份一次，以及保留幾份舊備份</td></tr>
      <tr><td>備份資料夾</td><td>備份檔案的存放位置</td></tr>
      <tr><td>立即備份／還原備份</td><td>馬上備份一份，或還原先前的備份</td></tr>
      <tr><td>啟動模式（SOTA / POTA）</td><td>把自己的山峰或公園編號寫進每一筆通聯記錄</td></tr>
      <tr><td>我的 SOTA／我的 POTA</td><td>啟動模式開啟時所使用的編號</td></tr>
    </table>`,
},

'zh-CN': {
  set_title: '设置说明',

  set_profile_title: '配置文件（Profile）',
  set_profile_text:  '设置可以存成多组具名的配置文件，一步就能切换——在家用电台、随身机与俱乐部电台之间移动时特别方便，因为各自的连接方式、波特率与 CI-V 地址都不同。配置文件名称旁的按钮可新增、重命名或删除。',
  set_profile_note: '并非所有设置都属于配置文件。属于的项目在 App 中会于左缘标示一道<strong>紫色色条</strong>；没有色条的项目则是所有配置文件共用。',

  set_station_title: '台站',
  set_station_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>我的呼号</td><td>您的业余无线电呼号（发射前必填）</td></tr>
      <tr><td>我的位置（Grid）</td><td>4 位或 6 位 Maidenhead 网格坐标</td></tr>
    </table>`,

  set_radio_title: '电台 / 连接',
  set_radio_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>连接方式</td><td>USB、蓝牙、网络或 VOX</td></tr>
      <tr><td>电台型号</td><td>您的电台型号（USB / 蓝牙模式）</td></tr>
      <tr><td>串口</td><td>USB 串口设备路径</td></tr>
      <tr><td>波特率</td><td>CAT 串口速度（须与电台设置相符）</td></tr>
      <tr><td>CI-V 地址</td><td>ICOM CI-V 总线地址（仅 ICOM 电台）</td></tr>
      <tr><td>PTT 控制方式</td><td>VOX / CAT / RTS / DTR</td></tr>
      <tr><td>PTT 延迟</td><td>PTT 触发后至开始发射音频的等待时间（毫秒）</td></tr>
      <tr><td>发射延迟</td><td>音频输出时序补偿（毫秒）</td></tr>
      <tr><td>数据位 / 校验位 / 停止位</td><td>串口的数据帧格式；除非电台手册另有说明，保持默认值即可</td></tr>
      <tr><td>天线</td><td>要电台切换到哪一个天线端口（限支持的机型）</td></tr>
    </table>`,

  set_op_title: '操作',
  set_op_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>载波频段</td><td>操作频段</td></tr>
      <tr><td>FT4/FT8 模式</td><td>切换 FT4 或 FT8</td></tr>
      <tr><td>默认频率</td><td>默认发射音频频率（0–2900 Hz）</td></tr>
      <tr><td>解码模式</td><td>快速 / 标准 / 多次</td></tr>
      <tr><td>显示模式</td><td>标准列表或精简列表</td></tr>
      <tr><td>发射监管</td><td>N 分钟后自动停止发射（0 = 停用）</td></tr>
      <tr><td>无回应</td><td>N 次无回应后停止呼叫</td></tr>
      <tr><td>回应 CQ 方案</td><td>自动回应 CQ 的优先策略</td></tr>
      <tr><td>排除已通联</td><td>跳过在选定时间窗口内已通联过的电台</td></tr>
      <tr><td>时间偏移</td><td>手动时钟修正（秒）</td></tr>
      <tr><td>同步时间</td><td>通过网络 NTP 服务器校时</td></tr>
      <tr><td>竞赛模式（交换网格）</td><td>改送 <code>R</code> + 自己的网格取代信号报告，详见<a href="operating.html">「操作 FT8 / FT4」</a></td></tr>
      <tr><td>CQ 对象</td><td>编辑 CQ 可用的修饰词列表（DX、EU、TEST…）</td></tr>
      <tr><td>自动追踪 CQ</td><td>持续追踪出现的 CQ 呼叫</td></tr>
      <tr><td>追踪呼号</td><td>要留在视线内的呼号，一出现就能抓到</td></tr>
      <tr><td>排除前缀</td><td>自动回应永远不去回的呼号前缀</td></tr>
      <tr><td>显示已通联电台</td><td>已通联过的电台仍留在列表中，以删除线标示</td></tr>
      <tr><td>频率表</td><td>编辑程序提供的频段／频率对照表</td></tr>
    </table>`,

  set_audio_title: '音频',
  set_audio_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>采样率</td><td>12 kHz（默认）、24 kHz 或 48 kHz</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮点音频输出</td></tr>
    </table>`,

  set_display_title: '显示与其他',
  set_display_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>主题模式</td><td>浅色、深色或跟随设备设置</td></tr>
      <tr><td>防止屏幕关闭</td><td>操作中防止屏幕自动熄灭</td></tr>
      <tr><td>SWR / ALC 报警</td><td>驻波比或 ALC 超出安全值时显示警告</td></tr>
      <tr><td>保存解码消息</td><td>将所有解码消息存入数据库（增加存储空间占用）</td></tr>
      <tr><td>保存 SWL 记录</td><td>记录监听到的其他电台 QSO</td></tr>
      <tr><td>清除 QSO 计数</td><td>重置本次运行的 QSO 计数器</td></tr>
      <tr><td>清除临时文件</td><td>删除日志分享的临时文件</td></tr>
      <tr><td>语言</td><td>界面语言，与系统语言各自独立</td></tr>
      <tr><td>列表字号</td><td>解码与日志列表的文字大小</td></tr>
      <tr><td>小瀑布图（解码／呼叫）</td><td>在两个分页显示精简瀑布图，各有独立开关</td></tr>
      <tr><td>通联成功：闪屏／水波／闪光灯／QRZ 照片</td><td>四种各自独立的完成提示，详见<a href="logging.html">「通联日志」</a></td></tr>
      <tr><td>清除缓存</td><td>清掉呼号追踪数据与日志缓存</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>JS8 速度</td><td>Normal / Fast / Turbo / Slow 子模式</td></tr>
      <tr><td>JS8 heartbeat</td><td>关闭，或每 10／15／30 分钟广播一次</td></tr>
      <tr><td>JS8 自动回复</td><td>自动应答指向自己的查询指令，及／或自动回应 CQ</td></tr>
      <tr><td>JS8 强化编码（UTX）</td><td>强制自由文本一律使用可承载 Unicode 的编码，即使是纯 ASCII 内容</td></tr>
      <tr><td>WSPR 发射功率</td><td>编码进信标消息的功率等级（dBm）</td></tr>
      <tr><td>瀑布图色阶</td><td>频谱／瀑布图显示采用经典色阶或彩虹色阶</td></tr>
      <tr><td>悬浮窗口</td><td>总开关，以及各快捷按钮的单独显示／隐藏</td></tr>
    </table>`,

  set_services_title: '服务、备份与启动',
  set_services_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>QRZ.com API 密钥／自动上传</td><td>将完成的通联上传至 QRZ.com 日志簿</td></tr>
      <tr><td>PSKReporter</td><td>提交收听报告至全球传播地图</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>服务器地址、API Key 与 Station ID，并可测试连接，详见<a href="third-party.html">「第三方服务」</a></td></tr>
      <tr><td>开机时自动备份</td><td>App 启动时备份日志数据库</td></tr>
      <tr><td>间隔（天）／保留份数</td><td>多久备份一次，以及保留几份旧备份</td></tr>
      <tr><td>备份文件夹</td><td>备份文件的存放位置</td></tr>
      <tr><td>立即备份／还原备份</td><td>马上备份一份，或还原此前的备份</td></tr>
      <tr><td>启动模式（SOTA / POTA）</td><td>把自己的山峰或公园编号写进每一笔通联记录</td></tr>
      <tr><td>我的 SOTA／我的 POTA</td><td>启动模式开启时所使用的编号</td></tr>
    </table>`,
},

'ja': {
  set_title: '設定リファレンス',

  set_profile_title: 'プロファイル',
  set_profile_text:  '設定は名前を付けた複数のプロファイルとして保存でき、ワンステップで切り替えられます。シャックの固定機、ポータブル機、クラブ局のように接続方式・ボーレート・CI-V アドレスがそれぞれ違う場合に便利です。プロファイル名の横のボタンで追加・名前の変更・削除ができます。',
  set_profile_note: 'すべての設定がプロファイルに属するわけではありません。属する項目はアプリ上で左端に<strong>紫色の帯</strong>が付きます。帯のない項目は全プロファイル共通です。',

  set_station_title: '自局',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>コールサイン</td><td>自局のコールサイン（送信には必須）</td></tr>
      <tr><td>グリッド</td><td>4 桁または 6 桁の Maidenhead ロケーター</td></tr>
    </table>`,

  set_radio_title: '無線機 / 接続',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>接続方式</td><td>USB、Bluetooth、ネットワーク、VOX</td></tr>
      <tr><td>無線機の機種</td><td>お使いの無線機の機種（USB / Bluetooth 時）</td></tr>
      <tr><td>シリアルポート</td><td>USB シリアルデバイスのパス</td></tr>
      <tr><td>ボーレート</td><td>CAT のシリアル速度（無線機の設定と一致させます）</td></tr>
      <tr><td>CI-V アドレス</td><td>ICOM の CI-V バスアドレス（ICOM 機のみ）</td></tr>
      <tr><td>PTT 制御</td><td>VOX / CAT / RTS / DTR — PTT の制御方法</td></tr>
      <tr><td>PTT 遅延</td><td>PTT を入れてから音声を出すまでの待ち時間（ミリ秒）</td></tr>
      <tr><td>送信遅延</td><td>音声出力のタイミング補正（ミリ秒）</td></tr>
      <tr><td>データビット / パリティ / ストップビット</td><td>シリアルのフレーム形式。無線機の取扱説明書に指定がなければ既定のままで構いません</td></tr>
      <tr><td>アンテナ</td><td>無線機に選ばせるアンテナ端子（対応機種のみ）</td></tr>
    </table>`,

  set_op_title: '運用',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>周波数</td><td>運用バンド / 搬送波周波数</td></tr>
      <tr><td>FT4 / FT8 モード</td><td>FT4 と FT8 の切り替え</td></tr>
      <tr><td>音声周波数</td><td>既定の送信音声周波数（0〜2900 Hz）</td></tr>
      <tr><td>デコードモード</td><td>高速 / 標準 / 多回</td></tr>
      <tr><td>表示モード</td><td>標準表示または簡易表示</td></tr>
      <tr><td>送信ウォッチドッグ</td><td>N 分後に送信を自動停止（0 = 無効）</td></tr>
      <tr><td>無応答</td><td>応答のない送信サイクルが N 回で呼び出しを終了</td></tr>
      <tr><td>CQ 応答方式</td><td>CQ 自動応答の優先条件</td></tr>
      <tr><td>交信済みを除外</td><td>選んだ期間内に交信した局を飛ばします</td></tr>
      <tr><td>時刻オフセット</td><td>時計の手動補正（秒）</td></tr>
      <tr><td>同期</td><td>インターネットの NTP サーバーと時刻を合わせます</td></tr>
      <tr><td>コンテストモード（グリッド交換）</td><td>シグナルレポートの代わりに <code>R</code> と自局のグリッドを送ります。<a href="operating.html">FT8 / FT4 の運用</a>を参照</td></tr>
      <tr><td>CQ の対象</td><td>CQ に使える修飾語の一覧を編集します（DX、EU、TEST…）</td></tr>
      <tr><td>CQ 自動追尾</td><td>現れた CQ 局を継続して追いかけます</td></tr>
      <tr><td>フォロー</td><td>見失いたくないコールサイン。出てきたらすぐ分かります</td></tr>
      <tr><td>除外プリフィックス</td><td>自動応答が決して応答しないプリフィックス</td></tr>
      <tr><td>交信済み局の表示</td><td>交信済みの局も一覧に残し、取り消し線付きで表示します</td></tr>
      <tr><td>周波数テーブル</td><td>アプリが提示するバンド／周波数の対応表を編集します</td></tr>
    </table>`,

  set_audio_title: '音声',
  set_audio_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>サンプリング周波数</td><td>12 kHz（既定）、24 kHz、48 kHz</td></tr>
      <tr><td>ビット深度</td><td>16 ビット整数または 32 ビット浮動小数点の音声出力</td></tr>
    </table>`,

  set_display_title: '表示・その他',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>テーマ</td><td>ライト、ダーク、端末の設定に従う</td></tr>
      <tr><td>画面を消さない</td><td>運用中に画面が消灯しないようにします</td></tr>
      <tr><td>SWR / ALC 警告</td><td>SWR や ALC が安全域を超えたときに警告を表示します</td></tr>
      <tr><td>デコード結果を保存</td><td>デコードした電文をすべてデータベースへ保存します（容量が増えます）</td></tr>
      <tr><td>SWL の交信を保存</td><td>他局同士の交信も記録します</td></tr>
      <tr><td>交信数をクリア</td><td>今回の交信カウンターをリセットします</td></tr>
      <tr><td>一時ファイル削除</td><td>ログ共有用の一時ファイルを削除します</td></tr>
      <tr><td>言語</td><td>アプリの表示言語。端末の設定とは独立しています</td></tr>
      <tr><td>一覧の文字サイズ</td><td>デコード一覧とログ一覧の文字の大きさ</td></tr>
      <tr><td>ミニウォーターフォール（デコード／呼び出し）</td><td>各タブに小さなウォーターフォールを表示します。タブごとに切り替え可能</td></tr>
      <tr><td>交信成立: 画面フラッシュ／波紋／ライト／QRZ の写真</td><td>交信成立を知らせる 4 つの独立した演出。<a href="logging.html">交信ログ</a>を参照</td></tr>
      <tr><td>キャッシュの削除</td><td>コールサイン追跡データとログのキャッシュを破棄します</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>JS8 スピード</td><td>Normal / Fast / Turbo / Slow のサブモード</td></tr>
      <tr><td>JS8 Heartbeat</td><td>オフ、または 10 / 15 / 30 分ごと</td></tr>
      <tr><td>JS8 自動応答</td><td>自局宛ての問い合わせや CQ に自動応答します</td></tr>
      <tr><td>JS8 拡張エンコード（UTX）</td><td>純粋な ASCII でも、フリーテキストを常に Unicode 対応の符号化で送ります</td></tr>
      <tr><td>WSPR 送信出力</td><td>ビーコン電文に載せる出力（dBm）</td></tr>
      <tr><td>ウォーターフォールの配色</td><td>スペクトラム／ウォーターフォールをクラシックまたはレインボーの配色で表示</td></tr>
      <tr><td>フローティングウィンドウ</td><td>全体のオン/オフと、各ショートカットボタンの表示/非表示</td></tr>
    </table>`,

  set_services_title: '外部サービス・バックアップ・アクティベーション',
  set_services_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>QRZ.com API キー／自動アップロード</td><td>完了した交信を QRZ.com のログブックへ送ります</td></tr>
      <tr><td>PSKReporter</td><td>受信レポートを伝搬マップへ送信します</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>サーバーアドレス、API キー、Station ID と接続テスト。<a href="third-party.html">外部サービス連携</a>を参照</td></tr>
      <tr><td>起動時に自動バックアップ</td><td>アプリの起動時にログのデータベースをバックアップします</td></tr>
      <tr><td>間隔（日）／世代数</td><td>バックアップの周期と、残しておく古いバックアップの数</td></tr>
      <tr><td>保存先フォルダー</td><td>バックアップファイルの書き出し先</td></tr>
      <tr><td>今すぐバックアップ／復元</td><td>すぐに 1 つ作る、または以前のものから復元します</td></tr>
      <tr><td>アクティベーションモード（SOTA / POTA）</td><td>自局の山岳・公園リファレンスを各交信のログに書き込みます</td></tr>
      <tr><td>自局の SOTA／POTA</td><td>アクティベーションモード中に使うリファレンス</td></tr>
    </table>`,
},

'ru': {
  set_title: 'Описание настроек',

  set_profile_title: 'Профили',
  set_profile_text:  'Настройки можно хранить в виде нескольких именованных профилей и переключать одним действием — удобно, когда вы работаете то на домашнем трансивере, то на носимом, то на коллективной станции, у каждого из которых свои тип подключения, скорость порта и адрес CI-V. Кнопки рядом с именем профиля позволяют добавить, переименовать или удалить его.',
  set_profile_note: 'К профилю относятся не все настройки. Те, что относятся, отмечены в приложении <strong>фиолетовой полосой</strong> у левого края; всё без полосы общее для всех профилей.',

  set_station_title: 'Станция',
  set_station_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Позывной</td><td>Ваш любительский позывной (обязателен для передачи)</td></tr>
      <tr><td>Локатор</td><td>Ваш локатор Maidenhead из 4 или 6 знаков</td></tr>
    </table>`,

  set_radio_title: 'Трансивер / подключение',
  set_radio_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Тип подключения</td><td>USB, Bluetooth, сеть или VOX</td></tr>
      <tr><td>Модель трансивера</td><td>Модель вашего аппарата (режим USB / Bluetooth)</td></tr>
      <tr><td>Последовательный порт</td><td>Путь к устройству USB-серийного порта</td></tr>
      <tr><td>Скорость передачи</td><td>Скорость последовательного порта CAT (должна совпадать с настройкой аппарата)</td></tr>
      <tr><td>Адрес CI-V</td><td>Адрес шины CI-V (только для трансиверов ICOM)</td></tr>
      <tr><td>Управление PTT</td><td>VOX / CAT / RTS / DTR — способ включения передачи</td></tr>
      <tr><td>Задержка PTT</td><td>Пауза после включения PTT до подачи звука (мс)</td></tr>
      <tr><td>Задержка передачи</td><td>Компенсация задержки вывода звука (мс)</td></tr>
      <tr><td>Биты данных / чётность / стоп-биты</td><td>Формат кадра последовательного порта; оставьте по умолчанию, если в инструкции к трансиверу не указано иное</td></tr>
      <tr><td>Антенна</td><td>Какой антенный вход выбрать трансиверу — на аппаратах, где это поддерживается</td></tr>
    </table>`,

  set_op_title: 'Работа',
  set_op_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Частота</td><td>Рабочий диапазон / частота несущей</td></tr>
      <tr><td>Режим FT4 / FT8</td><td>Переключение между FT4 и FT8</td></tr>
      <tr><td>Звуковая частота</td><td>Звуковая частота передачи по умолчанию, Гц (0–2900)</td></tr>
      <tr><td>Режим декодирования</td><td>Быстро / стандарт / глубоко</td></tr>
      <tr><td>Режим отображения</td><td>Стандартный или упрощённый вид списка</td></tr>
      <tr><td>Сторожевой таймер</td><td>Автостоп передачи через N минут (0 — выключено)</td></tr>
      <tr><td>Без ответа</td><td>Прекратить вызов после N циклов без ответа</td></tr>
      <tr><td>Способ ответа на CQ</td><td>Правило приоритета для автоответа на CQ</td></tr>
      <tr><td>Исключать проведённые</td><td>Пропускать станции, сработанные за выбранный период</td></tr>
      <tr><td>Смещение времени</td><td>Ручная поправка часов в секундах</td></tr>
      <tr><td>Синхронизация</td><td>Сверка часов с NTP-сервером в интернете</td></tr>
      <tr><td>Контестовый режим (обмен локаторами)</td><td>Передавать <code>R</code> и свой локатор вместо рапорта; см. <a href="operating.html">работу в FT8 / FT4</a></td></tr>
      <tr><td>Уточнение CQ</td><td>Редактирование списка уточнений для вызова CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Автослежение за CQ</td><td>Продолжать следить за станциями, дающими CQ</td></tr>
      <tr><td>Отслеживать</td><td>Позывные, которые держать на виду, чтобы не пропустить их появление</td></tr>
      <tr><td>Исключаемые префиксы</td><td>Префиксы, которым автоответ отвечать не должен</td></tr>
      <tr><td>Показывать проведённые</td><td>Оставлять уже сработанные станции в списке, отмечая их зачёркиванием</td></tr>
      <tr><td>Таблица частот</td><td>Редактирование таблицы диапазонов и частот, которую предлагает приложение</td></tr>
    </table>`,

  set_audio_title: 'Звук',
  set_audio_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Частота дискретизации</td><td>12 кГц (по умолчанию), 24 кГц или 48 кГц</td></tr>
      <tr><td>Разрядность</td><td>Вывод звука: 16 бит целые или 32 бита с плавающей точкой</td></tr>
    </table>`,

  set_display_title: 'Экран и прочее',
  set_display_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Тема</td><td>Светлая, тёмная или как в системе</td></tr>
      <tr><td>Не гасить экран</td><td>Запрещает отключение экрана во время работы</td></tr>
      <tr><td>Оповещение SWR / ALC</td><td>Предупреждение при превышении безопасных значений КСВ или ALC</td></tr>
      <tr><td>Сохранять декодированное</td><td>Записывать все декодированные сообщения в базу (растёт объём данных)</td></tr>
      <tr><td>Сохранять QSO для SWL</td><td>Записывать услышанные связи других станций</td></tr>
      <tr><td>Сбросить счётчик QSO</td><td>Обнуляет счётчик связей текущего сеанса</td></tr>
      <tr><td>Удалить временные файлы</td><td>Удаляет временные файлы для обмена журналом</td></tr>
      <tr><td>Язык</td><td>Язык интерфейса, независимо от системной настройки</td></tr>
      <tr><td>Размер шрифта списка</td><td>Размер текста в списках декодера и журнала</td></tr>
      <tr><td>Мини-водопад (декодер / вызов)</td><td>Полоска водопада на соответствующей вкладке; переключатели раздельные</td></tr>
      <tr><td>Успешное QSO: вспышка / круги / фонарик / фото QRZ</td><td>Четыре независимых способа отметить завершённую связь; см. <a href="logging.html">аппаратный журнал</a></td></tr>
      <tr><td>Очистить кэш</td><td>Сбрасывает кэш данных слежения за позывными и кэш журнала</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Скорость JS8</td><td>Подрежим Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Выключено либо каждые 10 / 15 / 30 минут</td></tr>
      <tr><td>Автоответ JS8</td><td>Автоматические ответы на адресованные вам запросы и/или на вызовы CQ</td></tr>
      <tr><td>Расширенное кодирование JS8 (UTX)</td><td>Всегда использовать кодирование с поддержкой Unicode, даже для обычного ASCII</td></tr>
      <tr><td>Мощность WSPR</td><td>Уровень мощности (дБм), кодируемый в сообщении маяка</td></tr>
      <tr><td>Палитра водопада</td><td>Классическая или радужная расцветка спектра и водопада</td></tr>
      <tr><td>Плавающее окно</td><td>Общий переключатель и показ/скрытие каждой кнопки по отдельности</td></tr>
    </table>`,

  set_services_title: 'Сервисы, резервные копии и активация',
  set_services_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Ключ API QRZ.com / автовыгрузка</td><td>Отправка завершённых связей в журнал на QRZ.com</td></tr>
      <tr><td>PSKReporter</td><td>Отправка отчётов о приёме на карту прохождения</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Адрес сервера, ключ API и Station ID, а также проверка соединения; см. <a href="third-party.html">внешние сервисы</a></td></tr>
      <tr><td>Копировать при запуске</td><td>Резервная копия базы журнала при старте приложения</td></tr>
      <tr><td>Интервал (дни) / поколений</td><td>Как часто делать копии и сколько прежних оставлять</td></tr>
      <tr><td>Папка для копий</td><td>Куда записываются файлы резервных копий</td></tr>
      <tr><td>Сделать копию / восстановить</td><td>Создать копию сейчас либо восстановить одну из прежних</td></tr>
      <tr><td>Режим активации (SOTA / POTA)</td><td>Записывать вашу ссылку на вершину или парк в каждую связь</td></tr>
      <tr><td>Мой SOTA / мой POTA</td><td>Ссылки, используемые при включённом режиме активации</td></tr>
    </table>`,
},

'pl': {
  set_title: 'Opis ustawień',

  set_profile_title: 'Profile',
  set_profile_text:  'Ustawienia można przechowywać jako kilka nazwanych profili i przełączać jednym ruchem — przydaje się, gdy pracujesz raz na radiu domowym, raz na przenośnym, a raz na stacji klubowej, bo każde ma inny rodzaj połączenia, prędkość transmisji i adres CI-V. Przyciski obok nazwy profilu pozwalają dodać, zmienić nazwę lub usunąć profil.',
  set_profile_note: 'Nie wszystkie ustawienia należą do profilu. Te, które należą, mają w aplikacji <strong>fioletowy pasek</strong> przy lewej krawędzi; pozycje bez paska są wspólne dla wszystkich profili.',

  set_station_title: 'Stacja',
  set_station_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Znak wywoławczy</td><td>Twój znak krótkofalarski (wymagany do nadawania)</td></tr>
      <tr><td>Lokator</td><td>Twój 4- lub 6-znakowy lokator Maidenhead</td></tr>
    </table>`,

  set_radio_title: 'Radio / połączenie',
  set_radio_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Rodzaj połączenia</td><td>USB, Bluetooth, sieć lub VOX</td></tr>
      <tr><td>Model radia</td><td>Model twojego transceivera (tryb USB / Bluetooth)</td></tr>
      <tr><td>Port szeregowy</td><td>Ścieżka urządzenia szeregowego USB</td></tr>
      <tr><td>Prędkość transmisji</td><td>Szybkość portu CAT (musi odpowiadać ustawieniu radia)</td></tr>
      <tr><td>Adres CI-V</td><td>Adres magistrali CI-V (tylko radia ICOM)</td></tr>
      <tr><td>Sterowanie PTT</td><td>VOX / CAT / RTS / DTR — sposób załączania nadawania</td></tr>
      <tr><td>Opóźnienie PTT</td><td>Czas od załączenia PTT do podania dźwięku (ms)</td></tr>
      <tr><td>Opóźnienie nadawania</td><td>Korekta czasowa wyjścia audio (ms)</td></tr>
      <tr><td>Bity danych / parzystość / bity stopu</td><td>Format ramki portu szeregowego; zostaw wartości domyślne, o ile instrukcja radia nie mówi inaczej</td></tr>
      <tr><td>Antena</td><td>Które gniazdo antenowe ma wybrać radio — w urządzeniach, które to obsługują</td></tr>
    </table>`,

  set_op_title: 'Praca',
  set_op_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Częstotliwość</td><td>Pasmo pracy / częstotliwość nośnej</td></tr>
      <tr><td>Tryb FT4 / FT8</td><td>Przełączanie między FT4 a FT8</td></tr>
      <tr><td>Częstotliwość audio</td><td>Domyślna akustyczna częstotliwość nadawania w Hz (0–2900)</td></tr>
      <tr><td>Tryb dekodowania</td><td>Szybki / standardowy / głęboki</td></tr>
      <tr><td>Tryb wyświetlania</td><td>Standardowy lub uproszczony układ listy</td></tr>
      <tr><td>Nadzorca nadawania</td><td>Automatyczne zatrzymanie po N minutach (0 = wyłączone)</td></tr>
      <tr><td>Brak odpowiedzi</td><td>Zakończ wywoływanie po N cyklach bez odpowiedzi</td></tr>
      <tr><td>Sposób odpowiedzi na CQ</td><td>Zasada priorytetu dla automatycznej odpowiedzi na CQ</td></tr>
      <tr><td>Pomijaj przepracowane</td><td>Pomija stacje pracowane w wybranym okresie</td></tr>
      <tr><td>Przesunięcie czasu</td><td>Ręczna korekta zegara w sekundach</td></tr>
      <tr><td>Synchronizuj</td><td>Uzgodnienie zegara z internetowym serwerem NTP</td></tr>
      <tr><td>Tryb zawodów (wymiana lokatorów)</td><td>Nadaje <code>R</code> i twój lokator zamiast raportu; zobacz <a href="operating.html">pracę w FT8 / FT4</a></td></tr>
      <tr><td>Dopisek do CQ</td><td>Edycja listy dopisków dostępnych przy wywołaniu CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Automatyczne śledzenie CQ</td><td>Śledzi na bieżąco stacje wywołujące CQ</td></tr>
      <tr><td>Obserwowane</td><td>Znaki, które mają pozostawać na widoku, by nie przegapić ich pojawienia się</td></tr>
      <tr><td>Wykluczone prefiksy</td><td>Prefiksy, na które automat nigdy nie odpowiada</td></tr>
      <tr><td>Pokaż przepracowane</td><td>Zostawia przepracowane stacje na liście, oznaczone przekreśleniem</td></tr>
      <tr><td>Tabela częstotliwości</td><td>Edycja tabeli pasm i częstotliwości proponowanej przez aplikację</td></tr>
    </table>`,

  set_audio_title: 'Dźwięk',
  set_audio_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Częstotliwość próbkowania</td><td>12 kHz (domyślnie), 24 kHz lub 48 kHz</td></tr>
      <tr><td>Rozdzielczość bitowa</td><td>Wyjście audio 16-bitowe całkowite lub 32-bitowe zmiennoprzecinkowe</td></tr>
    </table>`,

  set_display_title: 'Wyświetlanie i inne',
  set_display_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Motyw</td><td>Jasny, ciemny lub zgodny z ustawieniem urządzenia</td></tr>
      <tr><td>Nie wygaszaj ekranu</td><td>Zapobiega wygaszaniu ekranu podczas pracy</td></tr>
      <tr><td>Alarm SWR / ALC</td><td>Ostrzeżenie, gdy SWR lub ALC przekroczy bezpieczne wartości</td></tr>
      <tr><td>Zapisuj zdekodowane</td><td>Zapisuje wszystkie zdekodowane wiadomości do bazy (rośnie zajętość pamięci)</td></tr>
      <tr><td>Zapisuj łączności SWL</td><td>Zapisuje podsłuchane łączności innych stacji</td></tr>
      <tr><td>Wyzeruj licznik łączności</td><td>Resetuje licznik łączności bieżącej sesji</td></tr>
      <tr><td>Usuń pliki tymczasowe</td><td>Kasuje pliki tymczasowe udostępniania dziennika</td></tr>
      <tr><td>Język</td><td>Język interfejsu, niezależny od ustawienia systemu</td></tr>
      <tr><td>Rozmiar czcionki listy</td><td>Wielkość tekstu na listach dekodowania i dziennika</td></tr>
      <tr><td>Mały wodospad (dekodowanie / wywołanie)</td><td>Pasek wodospadu na danej zakładce; osobne przełączniki</td></tr>
      <tr><td>Udana łączność: błysk / fala / latarka / zdjęcie QRZ</td><td>Cztery niezależne sposoby oznajmienia łączności; zobacz <a href="logging.html">dziennik łączności</a></td></tr>
      <tr><td>Wyczyść pamięć podręczną</td><td>Usuwa dane śledzenia znaków i pamięć podręczną dziennika</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Prędkość JS8</td><td>Podtryb Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Wyłączony albo co 10 / 15 / 30 minut</td></tr>
      <tr><td>Automatyczna odpowiedź JS8</td><td>Automatyczne odpowiedzi na kierowane do ciebie zapytania i/lub wywołania CQ</td></tr>
      <tr><td>Rozszerzone kodowanie JS8 (UTX)</td><td>Zawsze używaj kodowania obsługującego Unicode, nawet dla zwykłego ASCII</td></tr>
      <tr><td>Moc nadawania WSPR</td><td>Poziom mocy (dBm) kodowany w wiadomości latarni</td></tr>
      <tr><td>Paleta wodospadu</td><td>Klasyczna lub tęczowa kolorystyka widma i wodospadu</td></tr>
      <tr><td>Okno pływające</td><td>Przełącznik główny oraz osobne pokazywanie/ukrywanie każdego przycisku</td></tr>
    </table>`,

  set_services_title: 'Usługi, kopie zapasowe i aktywacja',
  set_services_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Klucz API QRZ.com / auto-wysyłka</td><td>Wysyłanie zakończonych łączności do dziennika QRZ.com</td></tr>
      <tr><td>PSKReporter</td><td>Przesyłanie raportów odbioru na mapę propagacji</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Adres serwera, klucz API i Station ID oraz test połączenia; zobacz <a href="third-party.html">usługi zewnętrzne</a></td></tr>
      <tr><td>Kopia przy starcie</td><td>Kopia bazy dziennika przy uruchomieniu aplikacji</td></tr>
      <tr><td>Odstęp (dni) / liczba kopii</td><td>Jak często wykonywać kopie i ile starszych zachować</td></tr>
      <tr><td>Folder kopii</td><td>Gdzie zapisywane są pliki kopii</td></tr>
      <tr><td>Wykonaj kopię / przywróć</td><td>Utwórz kopię teraz albo przywróć wcześniejszą</td></tr>
      <tr><td>Tryb aktywacji (SOTA / POTA)</td><td>Zapisuje twoje oznaczenie szczytu lub parku w każdej łączności</td></tr>
      <tr><td>Mój SOTA / mój POTA</td><td>Oznaczenia używane przy włączonym trybie aktywacji</td></tr>
    </table>`,
},

'es': {
  set_title: 'Referencia de ajustes',

  set_profile_title: 'Perfiles',
  set_profile_text:  'Los ajustes pueden guardarse como varios perfiles con nombre y cambiarse en un solo paso, algo cómodo cuando alternas entre el equipo de casa, uno portátil y una estación de radioclub, cada uno con su tipo de conexión, su velocidad en baudios y su dirección CI-V. Los botones junto al nombre del perfil permiten añadir, renombrar o borrar.',
  set_profile_note: 'No todos los ajustes pertenecen a un perfil. Los que sí lo hacen aparecen en la aplicación con una <strong>franja morada</strong> en el borde izquierdo; lo que no lleva franja es común a todos los perfiles.',

  set_station_title: 'Estación',
  set_station_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Indicativo</td><td>Tu indicativo de radioaficionado (obligatorio para transmitir)</td></tr>
      <tr><td>Localizador</td><td>Tu localizador Maidenhead de 4 o 6 caracteres</td></tr>
    </table>`,

  set_radio_title: 'Equipo / conexión',
  set_radio_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Tipo de conexión</td><td>USB, Bluetooth, red o VOX</td></tr>
      <tr><td>Modelo de equipo</td><td>El modelo de tu transceptor (modo USB / Bluetooth)</td></tr>
      <tr><td>Puerto serie</td><td>Ruta del dispositivo serie USB</td></tr>
      <tr><td>Velocidad en baudios</td><td>Velocidad del puerto CAT (debe coincidir con la del equipo)</td></tr>
      <tr><td>Dirección CI-V</td><td>Dirección del bus CI-V (solo equipos ICOM)</td></tr>
      <tr><td>Control de PTT</td><td>VOX / CAT / RTS / DTR — cómo se activa el PTT</td></tr>
      <tr><td>Retardo de PTT</td><td>Milisegundos de espera tras el PTT antes de enviar audio</td></tr>
      <tr><td>Retardo de TX</td><td>Compensación temporal de la salida de audio (ms)</td></tr>
      <tr><td>Bits de datos / paridad / bits de parada</td><td>Formato de trama del puerto serie; déjalo en los valores por defecto salvo que el manual del equipo indique otra cosa</td></tr>
      <tr><td>Antena</td><td>Qué toma de antena debe seleccionar el equipo, en los que lo admiten</td></tr>
    </table>`,

  set_op_title: 'Operación',
  set_op_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Frecuencia</td><td>Banda de trabajo / frecuencia de portadora</td></tr>
      <tr><td>Modo FT4 / FT8</td><td>Alterna entre FT4 y FT8</td></tr>
      <tr><td>Frecuencia de audio</td><td>Frecuencia de audio de transmisión por defecto en Hz (0–2900)</td></tr>
      <tr><td>Modo de decodificación</td><td>Rápido / estándar / profundo</td></tr>
      <tr><td>Modo de presentación</td><td>Lista estándar o simplificada</td></tr>
      <tr><td>Vigilante de TX</td><td>Detiene la transmisión tras N minutos (0 = desactivado)</td></tr>
      <tr><td>Sin respuesta</td><td>Deja de llamar tras N ciclos sin contestación</td></tr>
      <tr><td>Método de CQ</td><td>Estrategia de prioridad de la respuesta automática a CQ</td></tr>
      <tr><td>Excluir QSO ya hechos</td><td>Salta las estaciones trabajadas dentro del periodo elegido</td></tr>
      <tr><td>Desfase horario</td><td>Corrección manual del reloj en segundos</td></tr>
      <tr><td>Sincronizar</td><td>Ajusta el reloj con un servidor NTP de internet</td></tr>
      <tr><td>Modo concurso (intercambio de localizador)</td><td>Envía <code>R</code> y tu localizador en lugar del informe; consulta <a href="operating.html">operar en FT8 / FT4</a></td></tr>
      <tr><td>Modificador de CQ</td><td>Edita la lista de modificadores disponibles para tu CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Seguimiento automático de CQ</td><td>Sigue a las estaciones que llaman CQ conforme aparecen</td></tr>
      <tr><td>Seguir</td><td>Indicativos que mantener a la vista para no perderlos cuando aparezcan</td></tr>
      <tr><td>Prefijos excluidos</td><td>Prefijos a los que la automatización nunca debe contestar</td></tr>
      <tr><td>Mostrar estaciones trabajadas</td><td>Mantiene en la lista las ya trabajadas, marcadas con tachado</td></tr>
      <tr><td>Tabla de frecuencias</td><td>Edita la tabla de bandas y frecuencias que ofrece la aplicación</td></tr>
    </table>`,

  set_audio_title: 'Audio',
  set_audio_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Frecuencia de muestreo</td><td>12 kHz (por defecto), 24 kHz o 48 kHz</td></tr>
      <tr><td>Profundidad de bits</td><td>Salida de audio de 16 bits enteros o 32 bits en coma flotante</td></tr>
    </table>`,

  set_display_title: 'Pantalla y varios',
  set_display_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Tema</td><td>Claro, oscuro o según el ajuste del dispositivo</td></tr>
      <tr><td>Mantener pantalla encendida</td><td>Evita que la pantalla se apague durante la operación</td></tr>
      <tr><td>Aviso de SWR / ALC</td><td>Advertencia emergente cuando la ROE o el ALC superan los límites seguros</td></tr>
      <tr><td>Guardar decodificados</td><td>Guarda en la base de datos todos los mensajes decodificados (ocupa más espacio)</td></tr>
      <tr><td>Guardar QSO para SWL</td><td>Registra los QSO escuchados entre otras estaciones</td></tr>
      <tr><td>Borrar contador de QSO</td><td>Reinicia el contador de QSO de la sesión</td></tr>
      <tr><td>Borrar archivos temporales</td><td>Elimina los archivos temporales de compartición del registro</td></tr>
      <tr><td>Idioma</td><td>Idioma de la interfaz, independiente del ajuste del sistema</td></tr>
      <tr><td>Tamaño de letra de las listas</td><td>Tamaño del texto en las listas de decodificación y de registro</td></tr>
      <tr><td>Mini cascada (decodificación / llamada)</td><td>Franja de cascada en cada pestaña; conmutadores separados</td></tr>
      <tr><td>QSO completado: destello / onda / flash / foto QRZ</td><td>Cuatro avisos independientes de QSO completado; consulta el <a href="logging.html">registro de contactos</a></td></tr>
      <tr><td>Borrar cachés</td><td>Descarta los datos de seguimiento de indicativos y las cachés del registro</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Velocidad JS8</td><td>Submodo Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Desactivado, o cada 10 / 15 / 30 minutos</td></tr>
      <tr><td>Respuesta automática JS8</td><td>Contesta automáticamente a las consultas dirigidas a ti o a las llamadas CQ</td></tr>
      <tr><td>Codificación ampliada JS8 (UTX)</td><td>Usa siempre la codificación compatible con Unicode en el texto libre, incluso con ASCII simple</td></tr>
      <tr><td>Potencia de TX en WSPR</td><td>Nivel de potencia (dBm) codificado en el mensaje de la baliza</td></tr>
      <tr><td>Paleta de la cascada</td><td>Coloreado clásico o arcoíris para el espectro y la cascada</td></tr>
      <tr><td>Ventana flotante</td><td>Conmutador general y visibilidad individual de cada botón de acceso rápido</td></tr>
    </table>`,

  set_services_title: 'Servicios, copias de seguridad y activación',
  set_services_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Clave API de QRZ.com / subida automática</td><td>Envía los QSO terminados a tu libro de guardia de QRZ.com</td></tr>
      <tr><td>PSKReporter</td><td>Envía informes de recepción al mapa de propagación</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Dirección del servidor, clave API y Station ID, más una prueba de conexión; consulta <a href="third-party.html">servicios externos</a></td></tr>
      <tr><td>Copia al iniciar</td><td>Copia la base de datos del registro al abrir la aplicación</td></tr>
      <tr><td>Intervalo (días) / copias a conservar</td><td>Cada cuánto copiar y cuántas copias antiguas mantener</td></tr>
      <tr><td>Carpeta de copias</td><td>Dónde se escriben los archivos de copia</td></tr>
      <tr><td>Copiar ahora / restaurar</td><td>Hacer una copia al momento o restaurar una anterior</td></tr>
      <tr><td>Modo activación (SOTA / POTA)</td><td>Escribe tu referencia de cima o parque en cada QSO registrado</td></tr>
      <tr><td>Mi SOTA / mi POTA</td><td>Las referencias que se usan con el modo activación activado</td></tr>
    </table>`,
},

'el': {
  set_title: 'Οδηγός ρυθμίσεων',

  set_profile_title: 'Προφίλ',
  set_profile_text:  'Οι ρυθμίσεις μπορούν να κρατιούνται ως πολλά ονομασμένα προφίλ και να εναλλάσσονται με μία κίνηση — βολικό όταν μετακινείστε ανάμεσα σε σταθερό πομποδέκτη, φορητό και σταθμό συλλόγου, καθένας με τον δικό του τύπο σύνδεσης, ρυθμό baud και διεύθυνση CI-V. Με τα κουμπιά δίπλα στο όνομα του προφίλ προσθέτετε, μετονομάζετε ή διαγράφετε.',
  set_profile_note: 'Δεν ανήκουν όλες οι ρυθμίσεις σε προφίλ. Όσες ανήκουν σημειώνονται στην εφαρμογή με μια <strong>μοβ λωρίδα</strong> στην αριστερή άκρη· ό,τι δεν έχει λωρίδα είναι κοινό για όλα τα προφίλ.',

  set_station_title: 'Σταθμός',
  set_station_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Διακριτικό</td><td>Το διακριτικό σας (απαιτείται για εκπομπή)</td></tr>
      <tr><td>Τετράγωνο</td><td>Το τετράγωνο Maidenhead 4 ή 6 χαρακτήρων</td></tr>
    </table>`,

  set_radio_title: 'Πομποδέκτης / σύνδεση',
  set_radio_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Τύπος σύνδεσης</td><td>USB, Bluetooth, δίκτυο ή VOX</td></tr>
      <tr><td>Μοντέλο πομποδέκτη</td><td>Το μοντέλο του πομποδέκτη σας (λειτουργία USB / Bluetooth)</td></tr>
      <tr><td>Σειριακή θύρα</td><td>Διαδρομή συσκευής σειριακής μέσω USB</td></tr>
      <tr><td>Ρυθμός baud</td><td>Ταχύτητα σειριακής CAT (πρέπει να ταιριάζει με τη ρύθμιση του πομποδέκτη)</td></tr>
      <tr><td>Διεύθυνση CI-V</td><td>Διεύθυνση διαύλου CI-V (μόνο για πομποδέκτες ICOM)</td></tr>
      <tr><td>Έλεγχος PTT</td><td>VOX / CAT / RTS / DTR — πώς ενεργοποιείται το PTT</td></tr>
      <tr><td>Καθυστέρηση PTT</td><td>Χιλιοστά του δευτερολέπτου αναμονής μετά το PTT πριν σταλεί ήχος</td></tr>
      <tr><td>Καθυστέρηση εκπομπής</td><td>Αντιστάθμιση χρονισμού εξόδου ήχου (ms)</td></tr>
      <tr><td>Bit δεδομένων / ισοτιμία / bit τερματισμού</td><td>Μορφή πλαισίου σειριακής· αφήστε τις προεπιλογές εκτός αν το εγχειρίδιο του πομποδέκτη ορίζει διαφορετικά</td></tr>
      <tr><td>Κεραία</td><td>Ποια υποδοχή κεραίας να επιλέξει ο πομποδέκτης, σε όσα μηχανήματα το υποστηρίζουν</td></tr>
    </table>`,

  set_op_title: 'Λειτουργία',
  set_op_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Συχνότητα</td><td>Μπάντα λειτουργίας / συχνότητα φέροντος</td></tr>
      <tr><td>Λειτουργία FT4 / FT8</td><td>Εναλλαγή μεταξύ FT4 και FT8</td></tr>
      <tr><td>Συχνότητα ήχου</td><td>Προεπιλεγμένη συχνότητα ήχου εκπομπής σε Hz (0–2900)</td></tr>
      <tr><td>Λειτουργία αποκωδικοποίησης</td><td>Γρήγορη / τυπική / βαθιά</td></tr>
      <tr><td>Λειτουργία εμφάνισης</td><td>Τυπική ή απλή διάταξη λίστας</td></tr>
      <tr><td>Επιτηρητής εκπομπής</td><td>Αυτόματη διακοπή εκπομπής μετά από N λεπτά (0 = ανενεργό)</td></tr>
      <tr><td>Χωρίς απάντηση</td><td>Διακοπή κλήσης μετά από N κύκλους χωρίς απάντηση</td></tr>
      <tr><td>Μέθοδος CQ</td><td>Στρατηγική προτεραιότητας για την αυτόματη απάντηση σε CQ</td></tr>
      <tr><td>Εξαίρεση ολοκληρωμένων επαφών</td><td>Παράλειψη σταθμών με τους οποίους έγινε επαφή στο επιλεγμένο διάστημα</td></tr>
      <tr><td>Απόκλιση ώρας</td><td>Χειροκίνητη διόρθωση ρολογιού σε δευτερόλεπτα</td></tr>
      <tr><td>Συγχρονισμός</td><td>Συγχρονισμός ρολογιού με διακομιστή NTP στο διαδίκτυο</td></tr>
      <tr><td>Λειτουργία διαγωνισμού (ανταλλαγή τετραγώνου)</td><td>Στέλνει <code>R</code> και το τετράγωνό σας αντί για αναφορά· δείτε τη <a href="operating.html">λειτουργία FT8 / FT4</a></td></tr>
      <tr><td>Προσδιορισμός CQ</td><td>Επεξεργασία της λίστας προσδιορισμών για την κλήση CQ (DX, EU, TEST…)</td></tr>
      <tr><td>Αυτόματη παρακολούθηση CQ</td><td>Παρακολουθεί συνεχώς τους σταθμούς που καλούν CQ</td></tr>
      <tr><td>Παρακολούθηση</td><td>Διακριτικά που θέλετε να μένουν σε κοινή θέα ώστε να μην τα χάσετε</td></tr>
      <tr><td>Εξαιρούμενα προθέματα</td><td>Προθέματα στα οποία ο αυτοματισμός δεν πρέπει ποτέ να απαντά</td></tr>
      <tr><td>Εμφάνιση σταθμών με επαφή</td><td>Κρατά στη λίστα τους σταθμούς με τους οποίους έχει ήδη γίνει επαφή, με διαγράμμιση</td></tr>
      <tr><td>Πίνακας συχνοτήτων</td><td>Επεξεργασία του πίνακα μπαντών/συχνοτήτων που προτείνει η εφαρμογή</td></tr>
    </table>`,

  set_audio_title: 'Ήχος',
  set_audio_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Ρυθμός δειγματοληψίας</td><td>12 kHz (προεπιλογή), 24 kHz ή 48 kHz</td></tr>
      <tr><td>Βάθος bit</td><td>Έξοδος ήχου 16 bit ακεραίων ή 32 bit κινητής υποδιαστολής</td></tr>
    </table>`,

  set_display_title: 'Εμφάνιση και διάφορα',
  set_display_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Θέμα</td><td>Φωτεινό, σκοτεινό ή σύμφωνα με τη συσκευή</td></tr>
      <tr><td>Διατήρηση οθόνης αναμμένης</td><td>Αποτρέπει το σβήσιμο της οθόνης κατά τη λειτουργία</td></tr>
      <tr><td>Ειδοποίηση SWR / ALC</td><td>Προειδοποίηση όταν ο λόγος στάσιμων ή το ALC ξεπεράσουν τα ασφαλή όρια</td></tr>
      <tr><td>Αποθήκευση αποκωδικοποιημένων</td><td>Αποθηκεύει όλα τα αποκωδικοποιημένα μηνύματα στη βάση (αυξάνει τον χώρο)</td></tr>
      <tr><td>Αποθήκευση επαφών SWL</td><td>Καταγράφει επαφές άλλων σταθμών που ακούγονται</td></tr>
      <tr><td>Μηδενισμός μετρητή επαφών</td><td>Μηδενίζει τον μετρητή επαφών της συνεδρίας</td></tr>
      <tr><td>Διαγραφή προσωρινών αρχείων</td><td>Διαγράφει τα προσωρινά αρχεία κοινής χρήσης ημερολογίου</td></tr>
      <tr><td>Γλώσσα</td><td>Γλώσσα της διεπαφής, ανεξάρτητη από τη ρύθμιση του συστήματος</td></tr>
      <tr><td>Μέγεθος γραμματοσειράς λίστας</td><td>Μέγεθος κειμένου στις λίστες αποκωδικοποίησης και ημερολογίου</td></tr>
      <tr><td>Μικρός καταρράκτης (αποκωδικοποίηση / κλήση)</td><td>Λωρίδα καταρράκτη σε κάθε καρτέλα· ξεχωριστοί διακόπτες</td></tr>
      <tr><td>Επιτυχής επαφή: αναλαμπή / κυματισμός / φακός / φωτογραφία QRZ</td><td>Τέσσερις ανεξάρτητοι τρόποι ειδοποίησης· δείτε το <a href="logging.html">ημερολόγιο επαφών</a></td></tr>
      <tr><td>Εκκαθάριση προσωρινής μνήμης</td><td>Απορρίπτει τα δεδομένα παρακολούθησης διακριτικών και την προσωρινή μνήμη του ημερολογίου</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Ταχύτητα JS8</td><td>Υπολειτουργία Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Ανενεργό ή κάθε 10 / 15 / 30 λεπτά</td></tr>
      <tr><td>Αυτόματη απάντηση JS8</td><td>Αυτόματες απαντήσεις σε ερωτήματα προς εσάς ή/και σε κλήσεις CQ</td></tr>
      <tr><td>Εκτεταμένη κωδικοποίηση JS8 (UTX)</td><td>Χρήση της κωδικοποίησης με υποστήριξη Unicode πάντα, ακόμη και για απλό ASCII</td></tr>
      <tr><td>Ισχύς εκπομπής WSPR</td><td>Επίπεδο ισχύος (dBm) που κωδικοποιείται στο μήνυμα του φάρου</td></tr>
      <tr><td>Χρωματική κλίμακα καταρράκτη</td><td>Κλασική ή ουράνιο τόξο απόδοση χρωμάτων για φάσμα και καταρράκτη</td></tr>
      <tr><td>Αιωρούμενο παράθυρο</td><td>Γενικός διακόπτης και ξεχωριστή εμφάνιση/απόκρυψη κάθε πλήκτρου</td></tr>
    </table>`,

  set_services_title: 'Υπηρεσίες, αντίγραφα ασφαλείας και ενεργοποίηση',
  set_services_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Κλειδί API QRZ.com / αυτόματη αποστολή</td><td>Αποστολή ολοκληρωμένων επαφών στο ημερολόγιό σας στο QRZ.com</td></tr>
      <tr><td>PSKReporter</td><td>Υποβολή αναφορών λήψης στον χάρτη διάδοσης</td></tr>
      <tr><td>Cloudlog / Wavelog</td><td>Διεύθυνση διακομιστή, κλειδί API και Station ID, μαζί με έλεγχο σύνδεσης· δείτε τις <a href="third-party.html">εξωτερικές υπηρεσίες</a></td></tr>
      <tr><td>Αντίγραφο κατά την εκκίνηση</td><td>Αντίγραφο της βάσης του ημερολογίου όταν ξεκινά η εφαρμογή</td></tr>
      <tr><td>Διάστημα (ημέρες) / εκδόσεις</td><td>Κάθε πότε να δημιουργείται αντίγραφο και πόσα παλαιότερα να κρατούνται</td></tr>
      <tr><td>Φάκελος αντιγράφων</td><td>Πού γράφονται τα αρχεία των αντιγράφων</td></tr>
      <tr><td>Αντίγραφο τώρα / επαναφορά</td><td>Δημιουργία αντιγράφου άμεσα ή επαναφορά παλαιότερου</td></tr>
      <tr><td>Λειτουργία ενεργοποίησης (SOTA / POTA)</td><td>Γράφει τον δικό σας κωδικό κορυφής ή πάρκου σε κάθε καταχωρημένη επαφή</td></tr>
      <tr><td>Το SOTA μου / το POTA μου</td><td>Οι κωδικοί που χρησιμοποιούνται όταν είναι ενεργή η λειτουργία</td></tr>
    </table>`,
},

}; /* end PAGE_T */
