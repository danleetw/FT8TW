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
    </ul>
    <p>The export dialog can also narrow what goes into the file. Alongside the usual mode filter, an <strong>ARRL Field Day only</strong> entry appears in the mode dropdown once the log actually contains Field Day contacts — Field Day is not a mode of its own (those contacts are still FT8), but an entry submission needs them on their own, and picking them out by hand afterwards is tedious. The entry stays hidden while there are no such contacts, so that choosing it can never hand you an empty file.</p>`,
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

  log_backup_title: 'Automatic Backup',
  log_backup_text:  'The log database can back itself up without being asked, so a lost or reset phone does not take your contacts with it. Configure it in Settings → Auto Backup:',
  log_backup_list: `
    <ul>
      <li><strong>Auto backup on startup</strong> – runs when the app starts, no further action needed</li>
      <li><strong>Interval (days)</strong> – how long to wait before the next automatic backup</li>
      <li><strong>Keep generations</strong> – how many older backups to retain; the oldest are discarded beyond this count</li>
      <li><strong>Choose backup folder</strong> – pick where the files are written; a folder synced to cloud storage also gets them off the device</li>
      <li><strong>Backup now</strong> and <strong>Restore backup</strong> – take one immediately, or browse and restore an earlier one</li>
    </ul>`,

  log_activation_title: 'Activation Mode (SOTA / POTA)',
  log_activation_text:  'When you are the one activating a summit or a park, enter your own reference in Settings → <strong>SOTA / POTA Activation</strong> and turn on activation mode. Your SOTA and POTA references are then written into the log entries as you work stations, which is what the SOTA export format needs — far easier than adding them to every record afterwards. Once a reference is entered, the park name and grid found for it are shown underneath, so you can check it was typed correctly.',
  log_activation_multi: 'One spot often sits inside <strong>several POTA parks</strong> at once (an n-fer). Use <strong>+ Add park</strong> to enter them one by one, up to six. The export then switches to <strong>one ADIF per park, bundled into a single ZIP</strong> — POTA\'s convention is one log per park, uploaded separately, and several references crammed into one field will not be accepted. Each file contains only the records that really belong to that park; with a single park the export stays a single file.',

  log_quicklog_title: 'Quick Log (summits and parks)',
  log_quicklog_text:  'Tap <strong>Quick Log</strong> at the bottom of the <strong>QSO Logs</strong> page to open the manual entry screen built for SOTA and POTA activations. The fields that stay the same all activation (your callsign, the summit or park, frequency and mode) are tucked into an expandable card at the top and only need opening when you change band or location; the fields that change with every contact stay within thumb reach. The time is stamped when you save, and the signal report is pre-filled by mode (599 for CW, 59 for voice, blank for digital modes), so from the second contact onwards it is usually just: type their callsign, press Save and next.',
  log_quicklog_list:  '<ul><li><strong>Summits or parks</strong> — the title at the top left is a dropdown: switch between Summit log and Park log. Your choice is remembered for next time.</li><li><strong>Duplicate warning</strong> — while you type a callsign it tells you whether you have already worked that station during this activation, with the time, band and mode of the previous contact.</li><li><strong>Running count</strong> — the top right shows how many contacts you have logged this activation, and your last three are listed below. Tap one to open it in the full editor.</li><li><strong>Stays open after saving</strong> — only the per-contact fields are cleared; the header and mode are kept. If you save by mistake you have five seconds to press <em>Undo</em>.</li><li><strong>Back</strong> — the arrow at the bottom left returns to the QSO log.</li></ul>',
  log_quicklog_park:  'An activation means <strong>the same day, the same callsign of yours and the same location</strong> — walking two summits or two parks in one day counts as two activations, each with its own count and duplicate check. Park mode lets you enter <strong>several park references</strong> for one spot (n-fer); add them one at a time with the add park button. When the other station is also on a summit or in a park, the <strong>S2S</strong> or <strong>P2P</strong> button beside their callsign opens a field for their reference, and it is written into your exported files. Reference fields suggest matches while you type: enter <code>TW-</code> and the parks appear with their names, with the ones you have already activated listed first so they are still there without a network connection.',
  log_slideshow_title: 'Log Slideshow',
  log_slideshow_text:  'Tap <strong>Slideshow</strong> at the bottom of the <strong>QSO Logs</strong> page to browse your contacts one by one, full screen, with the QRZ photo of the other station above a QSL-card style panel. You can also long-press a row in the list and choose <em>Show slideshow</em> to start from that contact. Swipe left or right to move by hand, tap once to close. <strong>Press and hold the screen</strong> for options: skip cards without a photo, how long each card stays (1 to 30 seconds), and end slideshow. Your choices are remembered.',

  log_qsl_title: 'QSO Success Feedback',
  log_qsl_text:  'A completed QSO can announce itself, which helps when the phone is not in your hand or is across the shack. Each effect is a separate switch in Settings, so you can enable only what suits your operating position:',
  log_qsl_list: `
    <ul>
      <li><strong>Flash screen</strong> – a brief full-screen flash</li>
      <li><strong>Ripple effect</strong> – an expanding ripple over the screen</li>
      <li><strong>Flashlight blink</strong> – blinks the camera flash, visible from across the room</li>
      <li><strong>Show QRZ photo</strong> – shows the other operator's QRZ.com photo, if they have one</li>
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
    </ul>
    <p>匯出對話框也可以先篩選要放進檔案的內容。除了原本的模式篩選之外，日誌中真的有野外日通聯時，模式下拉裡會多出一項<strong>只匯出野外日</strong>——野外日本身不是一種模式（那些通聯照樣是 FT8），但交件時需要單獨挑出來，事後自己一筆筆篩很費工。沒有野外日紀錄時這一項不會出現，以免選了只拿到一個空檔案。</p>`,
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

  log_backup_title: '自動備份',
  log_backup_text:  '日誌資料庫可以自己定期備份，手機遺失或重置時不會把通聯記錄一起帶走。在設置 → 自動備份中設定：',
  log_backup_list: `
    <ul>
      <li><strong>啟動時自動備份</strong> — App 啟動時自動執行，不需另外操作</li>
      <li><strong>週期（天）</strong> — 距離下一次自動備份要等多久</li>
      <li><strong>保留代數</strong> — 保留幾份舊備份，超過的份數會從最舊的開始刪除</li>
      <li><strong>選擇備份資料夾</strong> — 指定檔案存放位置；選一個有雲端同步的資料夾，備份就同時離開了手機</li>
      <li><strong>立即備份</strong>與<strong>還原備份</strong> — 馬上做一份，或瀏覽並還原先前的備份</li>
    </ul>`,

  log_activation_title: '出勤模式（SOTA / POTA）',
  log_activation_text:  '當您是登山或到公園進行啟動的一方時，請在設置 → <strong>SOTA / POTA 出勤</strong>填入自己的編號，並開啟「出勤模式（將編號寫入記錄）」。之後每筆通聯都會自動把您的 SOTA、POTA 編號寫進日誌，這正是 SOTA 匯出格式需要的欄位——比事後逐筆補上輕鬆得多。編號填好後，下方會顯示查到的園區名稱與網格，可用來確認沒有打錯。',
  log_activation_multi: '同一個地點常常同時落在<strong>多個 POTA 園區</strong>（n-fer）。按<strong>＋ 新增園區</strong>可以逐一加入，最多六組。此時匯出會自動改為<strong>每座公園各一份 ADIF，打包成一個 ZIP</strong>——POTA 官方的慣例就是一座公園一份 log 分開上傳，把多個編號串在同一個欄位裡上傳系統不會接受。每一份只會收進真正屬於該座公園的紀錄；只填一座公園時，維持原本的單檔匯出。',

  log_quicklog_title: '快速紀錄（山頂／公園）',
  log_quicklog_text:  '在<strong>通聯記錄</strong>頁下方按<strong>快速紀錄</strong>，會開啟專為 SOTA／POTA 出勤設計的手動輸入頁。整場不會變的欄位（我方呼號、山峰或園區、頻率、模式）收在最上方可展開的卡片裡，只有換頻或換地點時才需要打開；每筆會變的欄位留在拇指構得到的地方。時間在存檔當下自動戳記，訊號報告依模式預先填好（CW 599、語音 59，數位模式留空），所以第二筆起通常就只是：打對方呼號、按存檔並繼續。',
  log_quicklog_list:  '<ul><li><strong>山頂或公園</strong> — 左上角的標題是下拉選單，可切換「山頂紀錄」與「公園紀錄」，下次進來會回到上次選的那一種。</li><li><strong>重複提示</strong> — 邊打呼號邊顯示這一場是否已經通聯過這台，並附上上一次的時間、頻段與模式。</li><li><strong>本場計數</strong> — 右上角顯示這一場已經記了幾筆，下方列出最近三筆；點任一筆可以用完整表單打開來補資料。</li><li><strong>存檔後不關閉</strong> — 只清掉每筆會變的欄位，抬頭與模式保留。存錯的話五秒內可以按<em>復原</em>。</li><li><strong>返回</strong> — 左下角的箭頭回到通聯記錄頁。</li></ul>',
  log_quicklog_park:  '「這一場」的判定是<strong>同一天＋同一個我方呼號＋同一個地點</strong>——一天連走兩座山或兩個園區算成兩場活動，計數與重複判斷各自獨立。公園模式可以為同一個地點輸入<strong>多個園區編號</strong>（n-fer），按新增園區逐一加入。對方也在山上或園區時，按呼號右邊的 <strong>S2S</strong> 或 <strong>P2P</strong> 就會展開欄位記下對方的編號，那會一起寫進匯出的檔案。編號欄位會邊打邊列出符合的項目：輸入 <code>TW-</code> 就會出現公園清單與名稱，曾經活化過的排在最前面，所以沒有網路時一樣找得到。',
  log_slideshow_title: '日誌幻燈片',
  log_slideshow_text:  '在<strong>通聯記錄</strong>頁下方按<strong>幻燈片</strong>，即可全螢幕逐筆瀏覽通聯記錄，畫面上半是對方的 QRZ 照片，下半是仿 QSL 卡的版面。也可以長按清單中的某一筆選<em>顯示幻燈片</em>，從那一筆開始播。左右滑動可手動翻閱，點一下畫面即結束。<strong>長按畫面</strong>可開啟選項：略過沒有照片的卡片、每張停留幾秒（1 至 30 秒）、結束幻燈片；設定會被記住。',

  log_qsl_title: '通聯成功提示',
  log_qsl_text:  '完成一筆通聯時可以主動提示您，手機不在手上或放在對面桌上時特別有用。每種效果都是獨立開關，可依操作位置只開需要的：',
  log_qsl_list: `
    <ul>
      <li><strong>閃畫面</strong> — 全螢幕短暫閃爍一下</li>
      <li><strong>水波效果</strong> — 畫面上出現向外擴散的水波</li>
      <li><strong>閃光燈</strong> — 閃爍相機補光燈，隔一段距離也看得到</li>
      <li><strong>顯示 QRZ 照片</strong> — 若對方在 QRZ.com 有照片，直接顯示出來</li>
    </ul>`,
},

'zh-CN': {
  log_title: '通联日志',
  log_intro: 'FT8TW 自动记录每笔完成的通联。日志数据库存储 UTC 时间、呼号、频段、模式、频率、RST 报告、网格坐标及确认状态。',

  log_view_title:  '查看日志',
  log_view_text:   '打开<strong>通联日志</strong>页面可浏览联络历史。点击任一记录查看完整信息，长按记录可手动标记为已确认。',
  log_view_filter: '筛选选项：<em>显示全部</em>、<em>只显示已确认</em> 或 <em>只显示未确认</em>。',

  log_export_title: '导出日志',
  log_export_text:  '日志通过 FT8TW 内置的 Web 服务器导出。点击日志页面的<strong>导出</strong>，程序会显示一组本地网址；在同一 WiFi 网络的其他设备浏览器中打开该网址即可下载。支持格式：',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — 业余无线电标准日志格式，兼容 LoTW、WSJT-X、Log4OM、N1MM 等</li>
      <li><strong>CSV</strong> — 逗号分隔格式，可用电子表格软件分析</li>
      <li><strong>TEXT</strong> — 纯文本格式</li>
      <li><strong>SOTA</strong> — 山峰通联（Summits on the Air）格式（需填入山峰编号）</li>
    </ul>
    <p>导出对话框也可以先筛选要放进文件的内容。除了原本的模式筛选之外，日志中真的有野外日通联时，模式下拉里会多出一项<strong>仅野外日</strong>——野外日本身不是一种模式（那些通联照样是 FT8），但交件时需要单独挑出来，事后自己一笔笔筛很费工。没有野外日记录时这一项不会出现，以免选了只拿到一个空文件。</p>`,
  log_share_text: '也可使用<strong>分享通联记录</strong>功能（日志菜单中），通过 Android 分享界面直接发送 ADIF 文件——电子邮件、云存储、通信软件等均可使用。',

  log_import_title: '导入日志',
  log_import_text:  '通过 Web UI 导入 ADIF 文件，可同步来自其他软件（JTDX、WSJT-X、LoTW、Log4OM、N1MM、Log32 等）的历史记录。导入完成后程序会显示新增、更新及跳过的记录数。',

  log_confirm_title: '确认通联',
  log_confirm_text:  '通联可通过三种方式确认：',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — 从 <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> 下载您的 LoTW ADIF 文件并导入，匹配的记录会标记为 LoTW 已确认</li>
      <li><strong>QRZ.com 日志簿</strong> — 启用自动上传（设置 → QRZ.com）；双方均上传后 QRZ.com 自动标记为已确认</li>
      <li><strong>手工确认</strong> — 长按任一日志记录，点击<em>手工确认</em></li>
    </ul>`,

  log_backup_title: '自动备份',
  log_backup_text:  '日志数据库可以自己定期备份，手机丢失或重置时不会把通联记录一起带走。在设置 → 自动备份中设定：',
  log_backup_list: `
    <ul>
      <li><strong>启动时自动备份</strong> — App 启动时自动执行，无需另外操作</li>
      <li><strong>周期（天）</strong> — 距离下一次自动备份要等多久</li>
      <li><strong>保留代数</strong> — 保留几份旧备份，超过的份数会从最旧的开始删除</li>
      <li><strong>选择备份文件夹</strong> — 指定文件存放位置；选一个有云同步的文件夹，备份就同时离开了手机</li>
      <li><strong>立即备份</strong>与<strong>还原备份</strong> — 马上做一份，或浏览并还原此前的备份</li>
    </ul>`,

  log_activation_title: '出勤模式（SOTA / POTA）',
  log_activation_text:  '当您是登山或到公园进行启动的一方时，请在设置 → <strong>SOTA / POTA 出勤</strong>填入自己的编号，并开启「出勤模式（将编号写入记录）」。之后每笔通联都会自动把您的 SOTA、POTA 编号写进日志，这正是 SOTA 导出格式需要的字段——比事后逐条补上轻松得多。编号填好后，下方会显示查到的园区名称与网格，可用来确认没有打错。',

  log_activation_multi: '同一个地点常常同时落在<strong>多个 POTA 园区</strong>（n-fer）。按<strong>＋ 新增园区</strong>可以逐一加入，最多六组。此时导出会自动改为<strong>每座公园各一份 ADIF，打包成一个 ZIP</strong>——POTA 官方的惯例就是一座公园一份 log 分开上传，把多个编号串在同一个字段里上传系统不会接受。每一份只会收进真正属于该座公园的记录；只填一座公园时，维持原本的单文件导出。',

  log_quicklog_title: '快速记录（山顶／公园）',
  log_quicklog_text:  '在<strong>通联记录</strong>页下方按<strong>快速记录</strong>，会打开专为 SOTA／POTA 出勤设计的手动输入页。整场不会变的字段（本站呼号、山峰或园区、频率、模式）收在最上方可展开的卡片里，只有换频或换地点时才需要打开；每条会变的字段留在拇指够得到的地方。时间在存档当下自动戳记，信号报告依模式预先填好（CW 599、语音 59，数字模式留空），所以第二条起通常就只是：打对方呼号、按存档并继续。',
  log_quicklog_list:  '<ul><li><strong>山顶或公园</strong> — 左上角的标题是下拉菜单，可切换“山顶记录”与“公园记录”，下次进来会回到上次选的那一种。</li><li><strong>重复提示</strong> — 边打呼号边显示这一场是否已经通联过这台，并附上上一次的时间、频段与模式。</li><li><strong>本场计数</strong> — 右上角显示这一场已经记了几条，下方列出最近三条；点任一条可以用完整表单打开来补资料。</li><li><strong>存档后不关闭</strong> — 只清掉每条会变的字段，抬头与模式保留。存错的话五秒内可以按<em>撤销</em>。</li><li><strong>返回</strong> — 左下角的箭头回到通联记录页。</li></ul>',
  log_quicklog_park:  '“这一场”的判定是<strong>同一天＋同一个本站呼号＋同一个地点</strong>——一天连走两座山或两个园区算成两场活动，计数与重复判断各自独立。公园模式可以为同一个地点输入<strong>多个园区编号</strong>（n-fer），按新增园区逐一加入。对方也在山上或园区时，按呼号右边的 <strong>S2S</strong> 或 <strong>P2P</strong> 就会展开字段记下对方的编号，那会一起写进导出的文件。编号字段会边打边列出符合的项目：输入 <code>TW-</code> 就会出现公园列表与名称，曾经活化过的排在最前面，所以没有网络时一样找得到。',
  log_slideshow_title: '日志幻灯片',
  log_slideshow_text:  '在<strong>通联记录</strong>页下方按<strong>幻灯片</strong>，即可全屏逐条浏览通联记录，画面上半是对方的 QRZ 照片，下半是仿 QSL 卡的版面。也可以长按列表中的某一条选<em>显示幻灯片</em>，从那一条开始播。左右滑动可手动翻阅，点一下画面即结束。<strong>长按画面</strong>可开启选项：跳过没有照片的卡片、每张停留几秒（1 至 30 秒）、结束幻灯片；设置会被记住。',

  log_qsl_title: '通联成功提示',
  log_qsl_text:  '完成一笔通联时可以主动提示您，手机不在手上或放在对面桌上时特别有用。每种效果都是独立开关，可按操作位置只开需要的：',
  log_qsl_list: `
    <ul>
      <li><strong>闪屏</strong> — 全屏短暂闪烁一下</li>
      <li><strong>水波效果</strong> — 屏幕上出现向外扩散的水波</li>
      <li><strong>闪光灯</strong> — 闪烁相机补光灯，隔一段距离也看得到</li>
      <li><strong>显示 QRZ 照片</strong> — 若对方在 QRZ.com 有照片，直接显示出来</li>
    </ul>`,
},

'ja': {
  log_title: '交信ログ',
  log_intro: 'FT8TW は完了した交信をすべて自動的に記録します。ログのデータベースには日時（UTC）、コールサイン、バンド、モード、周波数、RST レポート、グリッドロケーター、確認状況が保存されます。',

  log_view_title:  'ログを見る',
  log_view_text:   '<strong>交信ログ</strong>タブを開くと交信履歴を閲覧できます。項目をタップすると詳細が表示され、長押しすると手動で「確認済み」にできます。',
  log_view_filter: '絞り込み: <em>すべて表示</em>、<em>確認済みのみ</em>、<em>未確認のみ</em>。',

  log_export_title: 'ログの書き出し',
  log_export_text:  'ログは FT8TW 内蔵の Web サーバー経由で書き出します。ログタブで<strong>エクスポート</strong>をタップするとローカル URL が表示されるので、同じ WiFi につながった機器のブラウザーでその URL を開いてください。対応形式:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — アマチュア無線の標準ログ形式。LoTW、WSJT-X、Log4OM、N1MM など大半のロギングソフトで使えます</li>
      <li><strong>CSV</strong> — 表計算ソフトで分析できるカンマ区切り形式</li>
      <li><strong>TEXT</strong> — そのまま読めるプレーンテキスト</li>
      <li><strong>SOTA</strong> — Summits on the Air 形式（SOTA の山岳リファレンスが必要）</li>
    </ul>
    <p>書き出しダイアログでは、ファイルに含める範囲を絞ることもできます。通常のモードフィルターに加えて、ログにフィールドデーの交信が実際にある場合だけ、モードの一覧に<strong>フィールドデーのみ</strong>が現れます。フィールドデーはそれ自体がモードではなく（該当する交信も FT8 のままです）、それでも提出時には切り出す必要があり、あとから 1 件ずつ選ぶのは骨が折れます。該当する交信がないときはこの項目自体が出ないので、選んだ結果が空のファイルになることはありません。</p>`,
  log_share_text: 'ログメニューの<strong>ログを共有</strong>を使えば、Android の共有機能から ADIF ファイルを直接送ることもできます（メール、クラウドストレージ、メッセージアプリなど）。',

  log_import_title: 'ログの取り込み',
  log_import_text:  'Web UI から ADIF ファイルを取り込むと、他のソフト（JTDX、WSJT-X、LoTW、Log4OM、N1MM、Log32 など）の履歴を同期できます。取り込み後、追加・更新・スキップした件数が表示されます。',

  log_confirm_title: '交信の確認',
  log_confirm_text:  '交信の確認方法は 3 つあります:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> から LoTW の ADIF ファイルをダウンロードして取り込むと、一致した交信が LoTW 確認済みになります</li>
      <li><strong>QRZ.com ログブック</strong> — 自動アップロードを有効にすると（設定 → QRZ.com）、双方が登録した交信を QRZ.com が自動的に確認済みにします</li>
      <li><strong>手動</strong> — ログの項目を長押しして<em>手動確認</em>をタップします</li>
    </ul>`,

  log_backup_title: '自動バックアップ',
  log_backup_text:  'ログのデータベースは自動でバックアップを取れます。端末を紛失したり初期化したりしても交信記録を失わずに済みます。設定 → 自動バックアップ で指定します:',
  log_backup_list: `
    <ul>
      <li><strong>起動時に自動バックアップ</strong> — アプリの起動時に実行され、ほかの操作は不要です</li>
      <li><strong>間隔（日）</strong> — 次の自動バックアップまでの日数</li>
      <li><strong>世代数</strong> — 残しておく古いバックアップの数。超えた分は古いものから削除されます</li>
      <li><strong>保存先フォルダーを選択</strong> — ファイルの保存場所を指定します。クラウド同期されるフォルダーにすれば端末の外にも残せます</li>
      <li><strong>今すぐバックアップ</strong>と<strong>バックアップから復元</strong> — すぐに 1 つ作る、または以前のものを選んで復元します</li>
    </ul>`,

  log_activation_title: 'アクティベーションモード（SOTA / POTA）',
  log_activation_text:  '自分が山や公園からアクティベートする側のときは、設定 → <strong>SOTA / POTA 運用</strong>に自局のリファレンスを入力し、「運用モード（参照番号をログに記録）」を有効にします。以後の交信では SOTA・POTA のリファレンスがログに自動的に書き込まれます。SOTA の書き出し形式が必要とする項目なので、あとから 1 件ずつ追記するより格段に楽です。リファレンスを入力すると、その下に照会された公園名とグリッドが表示されるので、打ち間違いがないか確認できます。',

  log_activation_multi: '同じ場所が<strong>複数の POTA 公園</strong>に重なっていること（n-fer）はよくあります。<strong>＋ 公園を追加</strong>で 1 つずつ、最大 6 件まで入力できます。その場合エクスポートは<strong>公園ごとに ADIF を 1 つ作り、まとめて ZIP にする</strong>方式へ自動的に切り替わります。POTA の慣習は公園ごとにログを分けてアップロードすることで、複数の参照番号を 1 つの項目に詰め込んだものは受け付けられません。各ファイルにはその公園に本当に属する交信だけが入ります。公園が 1 つだけのときは、これまでどおり単一ファイルで出力されます。',

  log_quicklog_title: 'クイックログ（山岳・公園）',
  log_quicklog_text:  '<strong>交信記録</strong>ページ下部の<strong>クイックログ</strong>を押すと、SOTA／POTA の運用向けに作られた手入力画面が開きます。運用中ずっと変わらない項目（自局コールサイン、山岳または公園、周波数、モード）は上部の折りたたみカードにまとめてあり、バンドや場所を変えるときだけ開けば済みます。交信ごとに変わる項目は親指の届く位置に置いてあります。時刻は保存した瞬間に記録され、レポートはモードに応じてあらかじめ入ります（CW は 599、音声は 59、デジタルモードは空欄）。そのため 2 局目からは、相手のコールサインを入力して「保存して次へ」を押すだけで済みます。',
  log_quicklog_list:  '<ul><li><strong>山岳と公園</strong> — 左上のタイトルはドロップダウンです。「山岳ログ」と「公園ログ」を切り替えられ、選んだ種類は次回も引き継がれます。</li><li><strong>重複の警告</strong> — コールサインを入力していくと、この運用中にすでに交信済みかどうかを表示し、前回の時刻・バンド・モードも示します。</li><li><strong>交信数</strong> — 右上にこの運用での交信数、下に直近 3 件が出ます。どれかを押すと詳細フォームで開けます。</li><li><strong>保存しても閉じない</strong> — 交信ごとに変わる項目だけが消え、ヘッダーとモードは残ります。誤って保存しても 5 秒以内なら<em>元に戻す</em>を押せます。</li><li><strong>戻る</strong> — 左下の矢印で交信記録に戻ります。</li></ul>',
  log_quicklog_park:  '1 回の運用は<strong>同じ日・同じ自局コールサイン・同じ場所</strong>で区切られます。1 日に 2 つの山や 2 つの公園を回れば別々の運用として扱われ、交信数も重複判定もそれぞれ独立します。公園モードでは同じ場所に対して<strong>複数の公園番号</strong>（n-fer）を入力できます。公園を追加するボタンで 1 つずつ足してください。相手局も山や公園にいる場合は、コールサインの右にある <strong>S2S</strong> または <strong>P2P</strong> を押すと相手の番号を入れる欄が開き、書き出すファイルにも反映されます。番号欄は入力しながら候補を出します。<code>TW-</code> と入れると公園の一覧と名称が表示され、すでに運用したことのある公園が先に並ぶため、通信圏外でも見つけられます。',
  log_slideshow_title: 'ログのスライドショー',
  log_slideshow_text:  '<strong>交信記録</strong>ページ下部の<strong>スライドショー</strong>を押すと、全画面で 1 件ずつ交信記録を表示します。上半分は相手局の QRZ 写真、下半分は QSL カード風のパネルです。一覧の行を長押しして<em>スライドショーを表示</em>を選べば、その交信から再生できます。左右にスワイプすると手動で送れ、画面を 1 回タップすると終了します。<strong>画面を長押し</strong>すると設定が開きます。写真のないカードを飛ばす、1 枚あたりの秒数（1〜30 秒）、スライドショーの終了。設定は記憶されます。',

  log_qsl_title: '交信成立の通知',
  log_qsl_text:  '交信が成立したことを知らせる演出を有効にできます。端末を手に持っていないときや離れた場所に置いているときに便利です。効果ごとに独立したスイッチなので、運用スタイルに合うものだけを有効にできます:',
  log_qsl_list: `
    <ul>
      <li><strong>画面フラッシュ</strong> — 画面全体が一瞬光ります</li>
      <li><strong>波紋エフェクト</strong> — 画面に広がる波紋を表示します</li>
      <li><strong>ライト点滅</strong> — カメラのライトを点滅させ、離れていても分かります</li>
      <li><strong>QRZ の写真を表示</strong> — 相手局が QRZ.com に写真を登録していれば表示します</li>
    </ul>`,
},

'ru': {
  log_title: 'Аппаратный журнал',
  log_intro: 'FT8TW автоматически записывает каждое завершённое QSO. В базе журнала хранятся дата и время (UTC), позывной, диапазон, вид работы, частота, рапорты RST, локатор и статус подтверждения.',

  log_view_title:  'Просмотр журнала',
  log_view_text:   'Откройте вкладку <strong>Журнал</strong>, чтобы просмотреть историю связей. Нажмите на запись, чтобы увидеть подробности; долгое нажатие позволяет вручную отметить связь подтверждённой.',
  log_view_filter: 'Фильтры: <em>показать все</em>, <em>только подтверждённые</em> или <em>только неподтверждённые</em>.',

  log_export_title: 'Экспорт журнала',
  log_export_text:  'Журнал выгружается через встроенный веб-сервер FT8TW. Нажмите <strong>Экспорт</strong> на вкладке журнала — приложение покажет локальный адрес. Откройте этот адрес в браузере любого устройства в той же сети WiFi. Доступные форматы:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — стандартный формат любительских журналов; совместим с LoTW, WSJT-X, Log4OM, N1MM и большинством программ</li>
      <li><strong>CSV</strong> — значения через запятую для анализа в таблицах</li>
      <li><strong>TEXT</strong> — простой текст для чтения</li>
      <li><strong>SOTA</strong> — формат Summits on the Air (нужен номер вершины SOTA)</li>
    </ul>
    <p>Диалог экспорта позволяет и сузить то, что попадёт в файл. Помимо обычного фильтра по виду работы, в выпадающем списке появляется пункт <strong>Только ARRL Field Day</strong> — но только тогда, когда в журнале действительно есть связи Field Day. Сам Field Day видом работы не является (те связи по-прежнему FT8), однако для отправки отчёта их нужно выделить отдельно, а отбирать вручную утомительно. Пока таких связей нет, пункт не показывается, поэтому выбрать его и получить пустой файл невозможно.</p>`,
  log_share_text: 'Можно также выбрать <strong>Поделиться журналом</strong> в меню журнала и отправить файл ADIF напрямую через стандартное меню Android — по почте, в облако, в мессенджер и т. д.',

  log_import_title: 'Импорт журнала',
  log_import_text:  'Импортируйте файлы ADIF через веб-интерфейс, чтобы перенести историю из других программ (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32 и др.). После импорта показывается, сколько записей добавлено, обновлено и пропущено.',

  log_confirm_title: 'Подтверждение QSO',
  log_confirm_text:  'Подтвердить связь можно тремя способами:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — скачайте свой файл ADIF с <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> и импортируйте его; совпавшие связи получат отметку подтверждения LoTW</li>
      <li><strong>Журнал QRZ.com</strong> — включите автоматическую выгрузку (Настройки → QRZ.com); QRZ.com сам отмечает встречные связи подтверждёнными</li>
      <li><strong>Вручную</strong> — нажмите и удерживайте запись, затем выберите <em>Подтвердить вручную</em></li>
    </ul>`,

  log_backup_title: 'Автоматическое резервное копирование',
  log_backup_text:  'База журнала может копироваться сама, так что потерянный или сброшенный телефон не унесёт с собой ваши связи. Настраивается в Настройки → Автоматическое резервное копирование:',
  log_backup_list: `
    <ul>
      <li><strong>Копировать при запуске</strong> — выполняется при старте приложения, больше ничего делать не нужно</li>
      <li><strong>Интервал (дни)</strong> — через сколько дней делать следующую копию</li>
      <li><strong>Хранить поколений</strong> — сколько прежних копий оставлять; всё сверх этого числа удаляется, начиная с самых старых</li>
      <li><strong>Выбрать папку</strong> — куда записывать файлы; папка, синхронизируемая с облаком, заодно уносит копии с устройства</li>
      <li><strong>Сделать копию</strong> и <strong>Восстановить из копии</strong> — создать копию немедленно либо выбрать и восстановить одну из прежних</li>
    </ul>`,

  log_activation_title: 'Режим активации (SOTA / POTA)',
  log_activation_text:  'Если активируете вершину или парк вы сами, укажите свою ссылку в Настройки → <strong>Активация SOTA / POTA</strong> и включите «Режим активации (запись в лог)». После этого ваши ссылки SOTA и POTA автоматически записываются в журнал при каждой связи — именно это требуется формату экспорта SOTA, и это куда проще, чем дописывать их потом в каждую запись. Как только ссылка введена, ниже показываются найденные название парка и локатор — по ним удобно убедиться, что вы не ошиблись при вводе.',

  log_activation_multi: 'Одна и та же точка нередко относится сразу к <strong>нескольким паркам POTA</strong> (n-fer). Кнопкой <strong>+ Добавить парк</strong> их можно вводить по одному, до шести. В этом случае экспорт автоматически переключается на <strong>один ADIF на каждый парк, упакованные в ZIP</strong>: по принятой в POTA практике на каждый парк загружается отдельный журнал, а несколько ссылок в одном поле приняты не будут. В каждый файл попадают только те связи, которые действительно относятся к этому парку. Если парк один, экспорт остаётся одним файлом.',

  log_quicklog_title: 'Быстрый журнал (вершины и парки)',
  log_quicklog_text:  'Нажмите <strong>Быстрый журнал</strong> внизу страницы <strong>Журнал связей</strong>, чтобы открыть экран ручного ввода, сделанный для активаций SOTA и POTA. Поля, которые не меняются в течение всей активации (ваш позывной, вершина или парк, частота и вид излучения), убраны в раскрывающуюся карточку сверху и нужны только при смене диапазона или места; поля, меняющиеся с каждой связью, остаются под большим пальцем. Время ставится в момент сохранения, а рапорт подставляется по виду излучения (599 для CW, 59 для телефона, пусто для цифровых видов), поэтому со второй связи обычно достаточно: ввести позывной корреспондента и нажать Сохранить и далее.',
  log_quicklog_list:  '<ul><li><strong>Вершины или парки</strong> — заголовок сверху слева — выпадающий список: переключение между журналом вершины и журналом парка. Выбор запоминается до следующего раза.</li><li><strong>Предупреждение о повторе</strong> — по мере ввода позывного показывается, работали ли вы уже с этой станцией в этой активации, с временем, диапазоном и видом излучения прошлой связи.</li><li><strong>Счётчик</strong> — сверху справа показано число связей за эту активацию, ниже перечислены последние три. Нажатие открывает связь в полном редакторе.</li><li><strong>Не закрывается после сохранения</strong> — очищаются только поля отдельной связи, шапка и вид излучения сохраняются. Если сохранили по ошибке, есть пять секунд, чтобы нажать <em>Отменить</em>.</li><li><strong>Назад</strong> — стрелка снизу слева возвращает в журнал связей.</li></ul>',
  log_quicklog_park:  'Активацией считается <strong>один и тот же день, один и тот же ваш позывной и одно и то же место</strong>: две вершины или два парка за день — это две активации, каждая со своим счётчиком и своей проверкой повторов. В режиме парка можно ввести <strong>несколько номеров парков</strong> для одной точки (n-fer), добавляя их по одному кнопкой добавления парка. Если корреспондент тоже на вершине или в парке, кнопка <strong>S2S</strong> или <strong>P2P</strong> рядом с его позывным открывает поле для его номера, и он попадает в выгружаемые файлы. Поля номеров подсказывают совпадения по мере ввода: наберите <code>TW-</code> и появится список парков с названиями, причём те, которые вы уже активировали, идут первыми, поэтому они доступны и без сети.',
  log_slideshow_title: 'Слайд-шоу журнала',
  log_slideshow_text:  'Нажмите <strong>Слайд-шоу</strong> внизу страницы <strong>Журнал связей</strong>, чтобы просматривать связи по одной в полноэкранном режиме: сверху фотография корреспондента с QRZ, снизу панель в стиле QSL-карточки. Можно также удерживать строку списка и выбрать <em>Показать слайд-шоу</em>, чтобы начать с этой связи. Свайп влево или вправо листает вручную, одно касание закрывает. <strong>Удержание экрана</strong> открывает настройки: пропускать карточки без фотографии, сколько секунд показывать каждую (от 1 до 30) и завершить слайд-шоу. Выбор запоминается.',

  log_qsl_title: 'Сигнал об успешном QSO',
  log_qsl_text:  'Завершённую связь можно отметить заметным сигналом — удобно, когда телефон не в руках или стоит в другом конце шэка. Каждый эффект включается отдельно, так что можно оставить только подходящие вашему рабочему месту:',
  log_qsl_list: `
    <ul>
      <li><strong>Вспышка экрана</strong> — короткая вспышка на весь экран</li>
      <li><strong>Круги по воде</strong> — расходящаяся волна поверх экрана</li>
      <li><strong>Мигание фонарика</strong> — мигает вспышка камеры, видно с другого конца комнаты</li>
      <li><strong>Фото с QRZ</strong> — показывает фотографию корреспондента с QRZ.com, если она там есть</li>
    </ul>`,
},

'pl': {
  log_title: 'Dziennik łączności',
  log_intro: 'FT8TW automatycznie zapisuje każdą zakończoną łączność. Baza dziennika przechowuje datę i godzinę (UTC), znak wywoławczy, pasmo, emisję, częstotliwość, raporty RST, lokator oraz status potwierdzenia.',

  log_view_title:  'Przeglądanie dziennika',
  log_view_text:   'Otwórz zakładkę <strong>Dziennik</strong>, aby przeglądać historię łączności. Dotknij wpisu, by zobaczyć szczegóły; przytrzymaj, aby ręcznie oznaczyć go jako potwierdzony.',
  log_view_filter: 'Filtry: <em>pokaż wszystkie</em>, <em>tylko potwierdzone</em> lub <em>tylko niepotwierdzone</em>.',

  log_export_title: 'Eksport dziennika',
  log_export_text:  'Dziennik eksportuje się przez wbudowany serwer WWW aplikacji. Dotknij <strong>Eksport</strong> w zakładce dziennika — aplikacja pokaże lokalny adres. Otwórz ten adres w przeglądarce na dowolnym urządzeniu w tej samej sieci WiFi. Dostępne formaty:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — standardowy format dzienników krótkofalarskich; zgodny z LoTW, WSJT-X, Log4OM, N1MM i większością programów</li>
      <li><strong>CSV</strong> — wartości rozdzielone przecinkami do analizy w arkuszu</li>
      <li><strong>TEXT</strong> — czytelny zwykły tekst</li>
      <li><strong>SOTA</strong> — format Summits on the Air (wymaga oznaczenia szczytu SOTA)</li>
    </ul>
    <p>Okno eksportu pozwala też zawęzić to, co trafi do pliku. Poza zwykłym filtrem emisji na liście pojawia się pozycja <strong>Tylko ARRL Field Day</strong> — ale dopiero wtedy, gdy w dzienniku rzeczywiście są łączności z Field Day. Sam Field Day nie jest osobną emisją (te łączności nadal są FT8), lecz do wysłania zgłoszenia trzeba je wydzielić, a ręczne przebieranie jest żmudne. Dopóki takich łączności nie ma, pozycja się nie pokazuje, więc nie da się wybrać jej i dostać pustego pliku.</p>`,
  log_share_text: 'Możesz też użyć opcji <strong>Udostępnij dziennik</strong> (w menu dziennika), aby wysłać plik ADIF bezpośrednio przez systemowe udostępnianie Androida — pocztą, do chmury, komunikatorem itp.',

  log_import_title: 'Import dziennika',
  log_import_text:  'Zaimportuj pliki ADIF przez interfejs WWW, aby zsynchronizować historię z innych programów (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32 itd.). Po imporcie aplikacja pokazuje, ile wpisów dodano, zaktualizowano i pominięto.',

  log_confirm_title: 'Potwierdzanie łączności',
  log_confirm_text:  'Łączność można potwierdzić na trzy sposoby:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — pobierz swój plik ADIF z <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> i zaimportuj go; pasujące łączności zostaną oznaczone jako potwierdzone w LoTW</li>
      <li><strong>Dziennik QRZ.com</strong> — włącz automatyczne wysyłanie (Ustawienia → QRZ.com); QRZ.com sam oznacza obustronne łączności jako potwierdzone</li>
      <li><strong>Ręcznie</strong> — przytrzymaj dowolny wpis i wybierz <em>Potwierdzenie ręczne</em></li>
    </ul>`,

  log_backup_title: 'Kopia zapasowa',
  log_backup_text:  'Baza dziennika potrafi tworzyć kopie sama, więc zgubiony lub zresetowany telefon nie zabierze ze sobą twoich łączności. Ustawisz to w Ustawienia → Kopia zapasowa:',
  log_backup_list: `
    <ul>
      <li><strong>Kopia przy starcie</strong> — wykonywana przy uruchomieniu aplikacji, nic więcej nie trzeba robić</li>
      <li><strong>Odstęp (dni)</strong> — po ilu dniach wykonać kolejną kopię</li>
      <li><strong>Liczba kopii</strong> — ile starszych kopii zachować; nadmiarowe są kasowane począwszy od najstarszych</li>
      <li><strong>Wybierz folder</strong> — gdzie zapisywać pliki; folder synchronizowany z chmurą od razu wynosi kopie poza urządzenie</li>
      <li><strong>Wykonaj kopię</strong> i <strong>Przywróć kopię</strong> — utwórz kopię od razu albo wybierz i przywróć wcześniejszą</li>
    </ul>`,

  log_activation_title: 'Tryb aktywacji (SOTA / POTA)',
  log_activation_text:  'Jeśli to ty aktywujesz szczyt lub park, wpisz własne oznaczenie w Ustawienia → <strong>Aktywacja SOTA / POTA</strong> i włącz „Tryb aktywacji (zapis referencji do dziennika)". Od tej chwili twoje oznaczenia SOTA i POTA trafiają automatycznie do wpisów dziennika — właśnie tego wymaga format eksportu SOTA, a jest to znacznie wygodniejsze niż dopisywanie ich później do każdego wpisu. Po wpisaniu oznaczenia poniżej pojawia się odnaleziona nazwa parku i lokator — łatwo po nich sprawdzić, że nie ma literówki.',

  log_activation_multi: 'To samo miejsce często leży jednocześnie w <strong>kilku parkach POTA</strong> (n-fer). Przyciskiem <strong>+ Dodaj park</strong> można je wpisywać pojedynczo, maksymalnie sześć. Eksport przełącza się wtedy na <strong>jeden ADIF na park, spakowane w ZIP</strong> — przyjętą w POTA praktyką jest osobny dziennik dla każdego parku, a kilka oznaczeń w jednym polu nie zostanie przyjętych. Każdy plik zawiera tylko te łączności, które naprawdę należą do danego parku. Przy jednym parku eksport pozostaje pojedynczym plikiem.',

  log_quicklog_title: 'Szybki dziennik (szczyty i parki)',
  log_quicklog_text:  'Naciśnij <strong>Szybki dziennik</strong> na dole strony <strong>Dziennik QSO</strong>, aby otworzyć ekran ręcznego wpisywania przygotowany pod aktywacje SOTA i POTA. Pola, które nie zmieniaja sie przez cala aktywacje (Twój znak, szczyt lub park, częstotliwość i emisja), są schowane w rozwijanej karcie u góry i trzeba je otwierać tylko przy zmianie pasma albo miejsca; pola zmieniające się przy każdej łączności zostają w zasięgu kciuka. Czas jest zapisywany w chwili zapisu, a raport jest wstępnie wypełniany według emisji (599 dla CW, 59 dla fonii, pusto dla emisji cyfrowych), więc od drugiej łączności zwykle wystarczy: wpisać znak korespondenta i nacisnąć Zapisz i dalej.',
  log_quicklog_list:  '<ul><li><strong>Szczyty albo parki</strong> — tytuł u góry po lewej jest listą rozwijaną: przełącza między dziennikiem szczytu a dziennikiem parku. Wybór jest zapamiętywany na następny raz.</li><li><strong>Ostrzeżenie o duplikacie</strong> — w trakcie wpisywania znaku widać, czy ta stacja była już pracowana w tej aktywacji, wraz z czasem, pasmem i emisją poprzedniej łączności.</li><li><strong>Licznik</strong> — u góry po prawej widać liczbę łączności w tej aktywacji, a poniżej trzy ostatnie. Naciśnięcie otwiera łączność w pełnym edytorze.</li><li><strong>Nie zamyka się po zapisie</strong> — czyszczone są tylko pola danej łączności, nagłówek i emisja zostają. Po omyłkowym zapisie masz pięć sekund na naciśnięcie <em>Cofnij</em>.</li><li><strong>Powrót</strong> — strzałka na dole po lewej wraca do dziennika QSO.</li></ul>',
  log_quicklog_park:  'Aktywacja to <strong>ten sam dzień, ten sam Twój znak i to samo miejsce</strong> — dwa szczyty albo dwa parki jednego dnia liczą się jako dwie aktywacje, każda z własnym licznikiem i własnym sprawdzaniem duplikatów. Tryb parku pozwala wpisać <strong>kilka numerów parków</strong> dla jednego miejsca (n-fer); dodaje się je pojedynczo przyciskiem dodania parku. Gdy korespondent też jest na szczycie albo w parku, przycisk <strong>S2S</strong> lub <strong>P2P</strong> obok jego znaku otwiera pole na jego numer, który trafia do eksportowanych plików. Pola numerów podpowiadają w trakcie pisania: wpisz <code>TW-</code>, a pojawi się lista parków z nazwami, przy czym te już przez Ciebie aktywowane są na początku, więc są dostępne także bez sieci.',
  log_slideshow_title: 'Pokaz slajdów dziennika',
  log_slideshow_text:  'Naciśnij <strong>Pokaz slajdów</strong> na dole strony <strong>Dziennik QSO</strong>, aby przeglądać łączności jedna po drugiej na pełnym ekranie: u góry zdjęcie korespondenta z QRZ, poniżej panel w stylu karty QSL. Możesz też przytrzymać wiersz na liście i wybrać <em>Pokaż pokaz slajdów</em>, aby zacząć od tej łączności. Przesuwanie w lewo lub w prawo przewija ręcznie, jedno dotknięcie zamyka. <strong>Przytrzymanie ekranu</strong> otwiera opcje: pomijanie kart bez zdjęcia, czas wyświetlania karty (od 1 do 30 sekund) oraz zakończenie pokazu. Ustawienia są zapamiętywane.',

  log_qsl_title: 'Sygnał udanej łączności',
  log_qsl_text:  'Zakończoną łączność można oznajmić w widoczny sposób — przydaje się, gdy telefon nie jest w ręku albo leży po drugiej stronie pomieszczenia. Każdy efekt to osobny przełącznik, więc włączysz tylko te pasujące do twojego stanowiska:',
  log_qsl_list: `
    <ul>
      <li><strong>Błysk ekranu</strong> — krótki błysk na całym ekranie</li>
      <li><strong>Efekt fali</strong> — rozchodząca się fala na ekranie</li>
      <li><strong>Mignięcie latarki</strong> — miga dioda aparatu, widać z drugiego końca pokoju</li>
      <li><strong>Zdjęcie z QRZ</strong> — pokazuje zdjęcie operatora z QRZ.com, jeśli je tam ma</li>
    </ul>`,
},

'es': {
  log_title: 'Registro de contactos',
  log_intro: 'FT8TW registra automáticamente cada QSO completado. La base de datos del registro guarda fecha y hora (UTC), indicativo, banda, modo, frecuencia, informes RST, localizador y estado de confirmación.',

  log_view_title:  'Consultar el registro',
  log_view_text:   'Abre la pestaña <strong>Registro</strong> para revisar tu historial de contactos. Pulsa una entrada para ver todos los detalles; mantén pulsado para marcarla manualmente como confirmada.',
  log_view_filter: 'Opciones de filtro: <em>mostrar todo</em>, <em>solo confirmados</em> o <em>solo sin confirmar</em>.',

  log_export_title: 'Exportar el registro',
  log_export_text:  'El registro se exporta mediante el servidor web integrado de FT8TW. Pulsa <strong>Exportar</strong> en la pestaña del registro; la aplicación mostrará una dirección local. Abre esa dirección en el navegador de cualquier dispositivo de la misma red WiFi. Formatos disponibles:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — formato estándar de registros de radioaficionado; compatible con LoTW, WSJT-X, Log4OM, N1MM y la mayoría de los programas</li>
      <li><strong>CSV</strong> — valores separados por comas para analizar en hojas de cálculo</li>
      <li><strong>TEXT</strong> — texto sencillo legible</li>
      <li><strong>SOTA</strong> — formato Summits on the Air (requiere la referencia de la cima SOTA)</li>
    </ul>
    <p>El diálogo de exportación permite además acotar lo que entra en el archivo. Junto al filtro de modo habitual, en el desplegable aparece la entrada <strong>Solo ARRL Field Day</strong>, pero solo cuando el registro contiene realmente contactos de Field Day. Field Day no es un modo en sí (esos contactos siguen siendo FT8), pero para enviar la participación hay que separarlos, y hacerlo a mano después resulta tedioso. Mientras no haya contactos de ese tipo la entrada no se muestra, de modo que elegirla nunca puede devolverte un archivo vacío.</p>`,
  log_share_text: 'También puedes usar <strong>Compartir registro</strong> (en el menú del registro) para enviar un archivo ADIF directamente con el menú de compartir de Android: correo, almacenamiento en la nube, mensajería, etc.',

  log_import_title: 'Importar registros',
  log_import_text:  'Importa archivos ADIF desde la interfaz web para sincronizar el historial de otros programas (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32, etc.). Al terminar, se indica cuántos registros se añadieron, actualizaron u omitieron.',

  log_confirm_title: 'Confirmar QSO',
  log_confirm_text:  'Los QSO pueden confirmarse de tres maneras:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — descarga tu archivo ADIF de <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> e impórtalo; los contactos coincidentes quedan marcados como confirmados por LoTW</li>
      <li><strong>Libro de guardia de QRZ.com</strong> — activa la subida automática (Ajustes → QRZ.com); QRZ.com marca por sí solo los contactos mutuos como confirmados</li>
      <li><strong>Manual</strong> — mantén pulsada cualquier entrada y elige <em>Confirmación manual</em></li>
    </ul>`,

  log_backup_title: 'Copia de seguridad automática',
  log_backup_text:  'La base de datos del registro puede copiarse sola, de modo que un teléfono perdido o restablecido no se lleve tus contactos. Se configura en Ajustes → Copia automática:',
  log_backup_list: `
    <ul>
      <li><strong>Copia al iniciar</strong> — se ejecuta al abrir la aplicación, sin más intervención</li>
      <li><strong>Intervalo (días)</strong> — cuántos días esperar hasta la siguiente copia automática</li>
      <li><strong>Copias a conservar</strong> — cuántas copias antiguas mantener; las que sobran se borran empezando por la más antigua</li>
      <li><strong>Elegir carpeta</strong> — dónde se escriben los archivos; una carpeta sincronizada con la nube saca además las copias del dispositivo</li>
      <li><strong>Copiar ahora</strong> y <strong>Restaurar copia</strong> — hacer una al momento, o examinar y restaurar una anterior</li>
    </ul>`,

  log_activation_title: 'Modo activación (SOTA / POTA)',
  log_activation_text:  'Cuando el que activa una cima o un parque eres tú, introduce tu propia referencia en Ajustes → <strong>Activación SOTA / POTA</strong> y activa «Modo de activación (guardar refs en el registro)». A partir de ahí, tus referencias SOTA y POTA se escriben solas en las entradas del registro conforme trabajas estaciones: es justo lo que necesita el formato de exportación SOTA y resulta mucho más cómodo que añadirlas después a cada contacto. Una vez introducida la referencia, debajo aparecen el nombre del parque y el localizador encontrados, con lo que puedes comprobar que no la has tecleado mal.',

  log_activation_multi: 'Un mismo punto suele estar a la vez en <strong>varios parques POTA</strong> (un n-fer). Con <strong>+ Añadir parque</strong> se introducen de uno en uno, hasta seis. La exportación pasa entonces a <strong>un ADIF por parque, empaquetados en un ZIP</strong>: la práctica habitual en POTA es un registro por parque, subido por separado, y varias referencias en un mismo campo no se aceptan. Cada archivo contiene solo los contactos que pertenecen realmente a ese parque. Con un solo parque, la exportación sigue siendo un único archivo.',

  log_quicklog_title: 'Registro rapido (cumbres y parques)',
  log_quicklog_text:  'Pulse <strong>Registro rapido</strong> en la parte inferior de la página <strong>Registro de QSO</strong> para abrir la pantalla de entrada manual pensada para activaciones de SOTA y POTA. Los campos que no cambian en toda la activación (su indicativo, la cumbre o el parque, la frecuencia y el modo) quedan recogidos en una tarjeta desplegable arriba y solo hay que abrirla al cambiar de banda o de lugar; los campos que cambian en cada contacto quedan al alcance del pulgar. La hora se marca al guardar y el informe de señal se rellena según el modo (599 en CW, 59 en fonía, vacío en modos digitales), de modo que a partir del segundo contacto suele bastar con: escribir su indicativo y pulsar Guardar y siguiente.',
  log_quicklog_list:  '<ul><li><strong>Cumbres o parques</strong> — el título de arriba a la izquierda es un desplegable: cambia entre Registro de cumbre y Registro de parque. Su elección se recuerda para la próxima vez.</li><li><strong>Aviso de duplicado</strong> — mientras escribe un indicativo le indica si ya ha trabajado esa estación durante esta activación, con la hora, la banda y el modo del contacto anterior.</li><li><strong>Contador</strong> — arriba a la derecha se ve cuántos contactos lleva en esta activación y debajo se listan los tres últimos. Al pulsar uno se abre en el editor completo.</li><li><strong>No se cierra al guardar</strong> — solo se limpian los campos de cada contacto; la cabecera y el modo se mantienen. Si guarda por error dispone de cinco segundos para pulsar <em>Deshacer</em>.</li><li><strong>Volver</strong> — la flecha de abajo a la izquierda regresa al registro de QSO.</li></ul>',
  log_quicklog_park:  'Una activación es <strong>el mismo día, su mismo indicativo y el mismo lugar</strong>: subir dos cumbres o visitar dos parques en un día cuenta como dos activaciones, cada una con su propio recuento y su propia comprobación de duplicados. El modo de parque permite introducir <strong>varias referencias de parque</strong> para un mismo sitio (n-fer); se añaden de una en una con el botón de añadir parque. Cuando la otra estación también está en una cumbre o en un parque, el botón <strong>S2S</strong> o <strong>P2P</strong> junto a su indicativo abre un campo para su referencia, que se escribe en los archivos exportados. Los campos de referencia sugieren coincidencias mientras escribe: introduzca <code>TW-</code> y aparecerán los parques con sus nombres, con los que ya ha activado en primer lugar, de modo que siguen estando ahí sin conexión de red.',
  log_slideshow_title: 'Pase de diapositivas del registro',
  log_slideshow_text:  'Pulse <strong>Presentación</strong> en la parte inferior de la página <strong>Registro de QSO</strong> para ver los contactos uno a uno a pantalla completa, con la foto de QRZ de la otra estación arriba y un panel al estilo de una tarjeta QSL debajo. También puede mantener pulsada una fila de la lista y elegir <em>Mostrar presentación</em> para empezar por ese contacto. Deslice a izquierda o derecha para pasar a mano y toque una vez para salir. <strong>Mantenga pulsada la pantalla</strong> para abrir las opciones: omitir las tarjetas sin foto, cuántos segundos permanece cada una (de 1 a 30) y terminar la presentación. Sus preferencias se recuerdan.',

  log_qsl_title: 'Aviso de QSO completado',
  log_qsl_text:  'Un QSO completado puede anunciarse de forma llamativa, algo útil cuando el teléfono no está en tu mano o queda al otro lado de la estación. Cada efecto es un conmutador independiente, así que puedes activar solo los que encajen con tu puesto:',
  log_qsl_list: `
    <ul>
      <li><strong>Destello de pantalla</strong> — un destello breve a pantalla completa</li>
      <li><strong>Efecto de onda</strong> — una onda que se expande sobre la pantalla</li>
      <li><strong>Parpadeo del flash</strong> — parpadea el flash de la cámara, visible desde el otro extremo de la sala</li>
      <li><strong>Foto de QRZ</strong> — muestra la foto del otro operador en QRZ.com, si la tiene</li>
    </ul>`,
},

'el': {
  log_title: 'Ημερολόγιο επαφών',
  log_intro: 'Το FT8TW καταγράφει αυτόματα κάθε ολοκληρωμένη επαφή. Η βάση του ημερολογίου αποθηκεύει ημερομηνία και ώρα (UTC), διακριτικό, μπάντα, τρόπο λειτουργίας, συχνότητα, αναφορές RST, τετράγωνο και κατάσταση επιβεβαίωσης.',

  log_view_title:  'Προβολή ημερολογίου',
  log_view_text:   'Ανοίξτε την καρτέλα <strong>Ημερολόγιο</strong> για να δείτε το ιστορικό των επαφών σας. Πατήστε μια εγγραφή για πλήρη στοιχεία· με παρατεταμένο πάτημα τη σημειώνετε χειροκίνητα ως επιβεβαιωμένη.',
  log_view_filter: 'Επιλογές φίλτρου: <em>όλες</em>, <em>μόνο επιβεβαιωμένες</em> ή <em>μόνο ανεπιβεβαίωτες</em>.',

  log_export_title: 'Εξαγωγή ημερολογίου',
  log_export_text:  'Το ημερολόγιο εξάγεται μέσω του ενσωματωμένου διακομιστή web του FT8TW. Πατήστε <strong>Εξαγωγή</strong> στην καρτέλα του ημερολογίου· η εφαρμογή εμφανίζει μια τοπική διεύθυνση. Ανοίξτε την σε πρόγραμμα περιήγησης οποιασδήποτε συσκευής στο ίδιο δίκτυο WiFi. Διαθέσιμες μορφές:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — πρότυπη μορφή ραδιοερασιτεχνικού ημερολογίου· συμβατή με LoTW, WSJT-X, Log4OM, N1MM και τα περισσότερα προγράμματα</li>
      <li><strong>CSV</strong> — τιμές χωρισμένες με κόμμα για ανάλυση σε υπολογιστικό φύλλο</li>
      <li><strong>TEXT</strong> — απλό αναγνώσιμο κείμενο</li>
      <li><strong>SOTA</strong> — μορφή Summits on the Air (απαιτείται ο κωδικός κορυφής SOTA)</li>
    </ul>
    <p>Ο διάλογος εξαγωγής μπορεί επίσης να περιορίσει το τι μπαίνει στο αρχείο. Πέρα από το συνηθισμένο φίλτρο τρόπου λειτουργίας, στην αναπτυσσόμενη λίστα εμφανίζεται η επιλογή <strong>Μόνο ARRL Field Day</strong> — αλλά μόνο όταν το log περιέχει πράγματι επαφές Field Day. Το Field Day δεν είναι τρόπος λειτουργίας από μόνο του (οι επαφές αυτές παραμένουν FT8), όμως για την υποβολή συμμετοχής πρέπει να ξεχωρίσουν, και το να τις διαλέγετε έναν έναν μετά είναι κουραστικό. Όσο δεν υπάρχουν τέτοιες επαφές η επιλογή δεν εμφανίζεται, ώστε να μην μπορεί να σας δώσει άδειο αρχείο.</p>`,
  log_share_text: 'Εναλλακτικά, με την επιλογή <strong>Κοινή χρήση ημερολογίου</strong> (στο μενού του ημερολογίου) στέλνετε αρχείο ADIF απευθείας μέσω του μενού κοινοποίησης του Android — email, αποθήκευση στο cloud, εφαρμογές μηνυμάτων κ.λπ.',

  log_import_title: 'Εισαγωγή ημερολογίου',
  log_import_text:  'Εισαγάγετε αρχεία ADIF μέσω της διεπαφής web για να συγχρονίσετε ιστορικό από άλλα προγράμματα (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32 κ.ά.). Μετά την εισαγωγή εμφανίζεται πόσες εγγραφές προστέθηκαν, ενημερώθηκαν ή παραλείφθηκαν.',

  log_confirm_title: 'Επιβεβαίωση επαφών',
  log_confirm_text:  'Οι επαφές επιβεβαιώνονται με τρεις τρόπους:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — κατεβάστε το αρχείο ADIF από το <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> και εισαγάγετέ το· οι επαφές που ταιριάζουν σημειώνονται ως επιβεβαιωμένες από το LoTW</li>
      <li><strong>Ημερολόγιο QRZ.com</strong> — ενεργοποιήστε την αυτόματη αποστολή (Ρυθμίσεις → QRZ.com)· το QRZ.com σημειώνει μόνο του τις αμοιβαίες επαφές ως επιβεβαιωμένες</li>
      <li><strong>Χειροκίνητα</strong> — πατήστε παρατεταμένα μια εγγραφή και επιλέξτε <em>Χειροκίνητη επιβεβαίωση</em></li>
    </ul>`,

  log_backup_title: 'Αυτόματο αντίγραφο ασφαλείας',
  log_backup_text:  'Η βάση του ημερολογίου μπορεί να κρατά μόνη της αντίγραφα, ώστε ένα χαμένο ή επαναφερμένο τηλέφωνο να μην πάρει μαζί του τις επαφές σας. Ρυθμίζεται στις Ρυθμίσεις → Αυτόματο αντίγραφο ασφαλείας:',
  log_backup_list: `
    <ul>
      <li><strong>Αντίγραφο κατά την εκκίνηση</strong> — εκτελείται όταν ανοίγει η εφαρμογή, χωρίς άλλη ενέργεια</li>
      <li><strong>Διάστημα (ημέρες)</strong> — πόσες ημέρες μεσολαβούν ως το επόμενο αυτόματο αντίγραφο</li>
      <li><strong>Πλήθος εκδόσεων</strong> — πόσα παλαιότερα αντίγραφα διατηρούνται· ό,τι περισσεύει διαγράφεται ξεκινώντας από το παλαιότερο</li>
      <li><strong>Επιλογή φακέλου</strong> — πού γράφονται τα αρχεία· ένας φάκελος συγχρονισμένος με το cloud βγάζει τα αντίγραφα και εκτός συσκευής</li>
      <li><strong>Αντίγραφο τώρα</strong> και <strong>Επαναφορά αντιγράφου</strong> — δημιουργήστε ένα αμέσως ή επιλέξτε και επαναφέρετε παλαιότερο</li>
    </ul>`,

  log_activation_title: 'Λειτουργία ενεργοποίησης (SOTA / POTA)',
  log_activation_text:  'Όταν εσείς είστε αυτός που ενεργοποιεί μια κορυφή ή ένα πάρκο, καταχωρίστε τον δικό σας κωδικό στις Ρυθμίσεις → <strong>Ενεργοποίηση SOTA / POTA</strong> και ενεργοποιήστε τη «Λειτουργία ενεργοποίησης (καταγραφή αναφορών στο log)». Από εκεί και πέρα οι κωδικοί SOTA και POTA γράφονται αυτόματα στις εγγραφές του ημερολογίου καθώς κάνετε επαφές — ακριβώς αυτό απαιτεί η μορφή εξαγωγής SOTA και είναι πολύ πιο εύκολο από το να τους προσθέτετε εκ των υστέρων σε κάθε εγγραφή. Μόλις καταχωρηθεί ο κωδικός, από κάτω εμφανίζονται το όνομα του πάρκου και το τετράγωνο που βρέθηκαν, ώστε να βεβαιωθείτε ότι δεν κάνατε λάθος στην πληκτρολόγηση.',

  log_activation_multi: 'Το ίδιο σημείο συχνά ανήκει ταυτόχρονα σε <strong>πολλά πάρκα POTA</strong> (n-fer). Με το <strong>+ Προσθήκη πάρκου</strong> τα εισάγετε ένα-ένα, έως έξι. Τότε η εξαγωγή αλλάζει αυτόματα σε <strong>ένα ADIF ανά πάρκο, συσκευασμένα σε ZIP</strong>: η καθιερωμένη πρακτική στο POTA είναι ένα ημερολόγιο ανά πάρκο, που ανεβαίνει χωριστά, και πολλοί κωδικοί στο ίδιο πεδίο δεν γίνονται δεκτοί. Κάθε αρχείο περιέχει μόνο τις επαφές που ανήκουν πραγματικά σε εκείνο το πάρκο. Με ένα μόνο πάρκο, η εξαγωγή παραμένει ένα αρχείο.',

  log_quicklog_title: 'Γρήγορο αρχείο (κορυφές και πάρκα)',
  log_quicklog_text:  'Πατήστε <strong>Γρήγορο αρχείο</strong> στο κάτω μέρος της σελίδας <strong>Αρχείο επαφών</strong> για να ανοίξετε την οθόνη χειροκίνητης καταχώρισης που φτιάχτηκε για ενεργοποιήσεις SOTA και POTA. Τα πεδία που μένουν ίδια σε όλη την ενεργοποίηση (το διακριτικό σας, η κορυφή ή το πάρκο, η συχνότητα και ο τρόπος εκπομπής) είναι μαζεμένα σε μια αναδιπλούμενη κάρτα επάνω και χρειάζεται να ανοίξουν μόνο όταν αλλάζετε μπάντα ή τοποθεσία. Τα πεδία που αλλάζουν σε κάθε επαφή μένουν εκεί που φτάνει ο αντίχειρας. Η ώρα καταγράφεται τη στιγμή της αποθήκευσης και η αναφορά σήματος συμπληρώνεται ανάλογα με τον τρόπο εκπομπής (599 για CW, 59 για φωνή, κενό για ψηφιακούς), οπότε από τη δεύτερη επαφή αρκεί συνήθως να γράψετε το διακριτικό τους και να πατήσετε Αποθήκευση και επόμενο.',
  log_quicklog_list:  '<ul><li><strong>Κορυφές ή πάρκα</strong> — ο τίτλος επάνω αριστερά είναι αναπτυσσόμενη λίστα: εναλλαγή ανάμεσα σε Αρχείο κορυφής και Αρχείο πάρκου. Η επιλογή σας θυμάται για την επόμενη φορά.</li><li><strong>Προειδοποίηση διπλοεγγραφής</strong> — καθώς πληκτρολογείτε ένα διακριτικό σας λέει αν έχετε ήδη κάνει επαφή με αυτόν τον σταθμό σε αυτή την ενεργοποίηση, με την ώρα, τη μπάντα και τον τρόπο εκπομπής της προηγούμενης επαφής.</li><li><strong>Μετρητής</strong> — επάνω δεξιά φαίνεται πόσες επαφές έχετε καταγράψει σε αυτή την ενεργοποίηση και από κάτω οι τρεις τελευταίες. Πατώντας μία ανοίγει στην πλήρη φόρμα.</li><li><strong>Δεν κλείνει μετά την αποθήκευση</strong> — καθαρίζονται μόνο τα πεδία της κάθε επαφής, η κεφαλίδα και ο τρόπος εκπομπής μένουν. Αν αποθηκεύσετε κατά λάθος, έχετε πέντε δευτερόλεπτα να πατήσετε <em>Αναίρεση</em>.</li><li><strong>Πίσω</strong> — το βέλος κάτω αριστερά επιστρέφει στο αρχείο επαφών.</li></ul>',
  log_quicklog_park:  'Μια ενεργοποίηση σημαίνει <strong>την ίδια ημέρα, το ίδιο δικό σας διακριτικό και την ίδια τοποθεσία</strong>: δύο κορυφές ή δύο πάρκα μέσα σε μία ημέρα μετρούν ως δύο ενεργοποιήσεις, καθεμία με τον δικό της μετρητή και τον δικό της έλεγχο διπλοεγγραφών. Η λειτουργία πάρκου επιτρέπει να καταχωρίσετε <strong>πολλούς κωδικούς πάρκων</strong> για την ίδια τοποθεσία (n-fer). Προστίθενται ένας-ένας με το κουμπί προσθήκης πάρκου. Όταν ο ανταποκριτής βρίσκεται και αυτός σε κορυφή ή σε πάρκο, το κουμπί <strong>S2S</strong> ή <strong>P2P</strong> δίπλα στο διακριτικό του ανοίγει πεδίο για τον κωδικό του, ο οποίος γράφεται και στα αρχεία που εξάγετε. Τα πεδία κωδικών προτείνουν αντιστοιχίες καθώς πληκτρολογείτε: γράψτε <code>TW-</code> και εμφανίζονται τα πάρκα με τα ονόματά τους, με όσα έχετε ήδη ενεργοποιήσει πρώτα, ώστε να τα βρίσκετε και χωρίς σύνδεση.',
  log_slideshow_title: 'Προβολή διαφανειών ημερολογίου',
  log_slideshow_text:  'Πατήστε <strong>Προβολή διαφανειών</strong> στο κάτω μέρος της σελίδας <strong>Αρχείο επαφών</strong> για να δείτε τις επαφές μία προς μία σε πλήρη οθόνη, με τη φωτογραφία QRZ του ανταποκριτή επάνω και έναν πίνακα σε στυλ κάρτας QSL από κάτω. Μπορείτε επίσης να κρατήσετε πατημένη μια γραμμή της λίστας και να επιλέξετε <em>Εμφάνιση προβολής</em> για να ξεκινήσετε από εκείνη την επαφή. Σύρετε αριστερά ή δεξιά για χειροκίνητη εναλλαγή, ένα πάτημα κλείνει. <strong>Παρατεταμένο πάτημα στην οθόνη</strong> ανοίγει τις επιλογές: παράλειψη καρτών χωρίς φωτογραφία, διάρκεια κάθε κάρτας (1 έως 30 δευτερόλεπτα) και τερματισμός προβολής. Οι επιλογές σας αποθηκεύονται.',

  log_qsl_title: 'Ειδοποίηση επιτυχούς επαφής',
  log_qsl_text:  'Μια ολοκληρωμένη επαφή μπορεί να το δηλώσει με εμφανή τρόπο — βολικό όταν το τηλέφωνο δεν είναι στο χέρι σας ή βρίσκεται στην άλλη άκρη του σταθμού. Κάθε εφέ έχει δικό του διακόπτη, ώστε να ενεργοποιείτε μόνο όσα ταιριάζουν στη θέση εργασίας σας:',
  log_qsl_list: `
    <ul>
      <li><strong>Αναλαμπή οθόνης</strong> — σύντομη αναλαμπή σε όλη την οθόνη</li>
      <li><strong>Εφέ κυματισμού</strong> — κύμα που απλώνεται πάνω στην οθόνη</li>
      <li><strong>Αναβόσβημα φακού</strong> — αναβοσβήνει ο φακός της κάμερας, ορατό από την άλλη άκρη του δωματίου</li>
      <li><strong>Φωτογραφία από QRZ</strong> — εμφανίζει τη φωτογραφία του άλλου χειριστή στο QRZ.com, αν υπάρχει</li>
    </ul>`,
},

}; /* end PAGE_T */
