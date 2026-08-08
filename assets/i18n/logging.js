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

  log_slideshow_title: 'Log Slideshow',
  log_slideshow_text:  'Long-press the log list and choose <em>Show slideshow</em> to page through your contacts full-screen, one at a time, complete with the operator photo and a QSL-card style layout. Slides advance on a configurable interval, or you can scroll through them by hand.',

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

  log_slideshow_title: '日誌幻燈片',
  log_slideshow_text:  '長按日誌清單選擇<em>播放幻燈片</em>，即可全螢幕逐筆瀏覽通聯記錄，畫面包含對方的照片與仿 QSL 卡的版面。可設定每張停留的秒數自動播放，也可以手動捲動翻閱。',

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
    </ul>`,
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
  log_activation_text:  '当您是登山或到公园进行启动的一方时，请在设置 → 出勤活动 (SOTA/POTA) 填入自己的编号，并开启「出勤模式（将编号写入记录）」。之后每笔通联都会自动把您的 SOTA、POTA 编号写进日志，这正是 SOTA 导出格式需要的字段——比事后逐条补上轻松得多。',

  log_activation_multi: '同一个地点常常同时落在<strong>多个 POTA 园区</strong>（n-fer）。按<strong>＋ 新增园区</strong>可以逐一加入，最多六组。此时导出会自动改为<strong>每座公园各一份 ADIF，打包成一个 ZIP</strong>——POTA 官方的惯例就是一座公园一份 log 分开上传，把多个编号串在同一个字段里上传系统不会接受。每一份只会收进真正属于该座公园的记录；只填一座公园时，维持原本的单文件导出。',

  log_slideshow_title: '日志幻灯片',
  log_slideshow_text:  '长按日志列表选择<em>播放幻灯片</em>，即可全屏逐条浏览通联记录，画面包含对方的照片与仿 QSL 卡的版面。可设置每张停留的秒数自动播放，也可以手动滚动翻阅。',

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
    </ul>`,
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
  log_activation_text:  '自分が山や公園からアクティベートする側のときは、設定 → アクティベーション（SOTA/POTA）に自局のリファレンスを入力し、アクティベーションモードを有効にします。以後の交信では SOTA・POTA のリファレンスがログに自動的に書き込まれます。SOTA の書き出し形式が必要とする項目なので、あとから 1 件ずつ追記するより格段に楽です。',

  log_activation_multi: '同じ場所が<strong>複数の POTA 公園</strong>に重なっていること（n-fer）はよくあります。<strong>＋ 公園を追加</strong>で 1 つずつ、最大 6 件まで入力できます。その場合エクスポートは<strong>公園ごとに ADIF を 1 つ作り、まとめて ZIP にする</strong>方式へ自動的に切り替わります。POTA の慣習は公園ごとにログを分けてアップロードすることで、複数の参照番号を 1 つの項目に詰め込んだものは受け付けられません。各ファイルにはその公園に本当に属する交信だけが入ります。公園が 1 つだけのときは、これまでどおり単一ファイルで出力されます。',

  log_slideshow_title: 'ログのスライドショー',
  log_slideshow_text:  'ログ一覧を長押しして<em>スライドショー</em>を選ぶと、交信記録を全画面で 1 件ずつ表示できます。相手局の写真と QSL カード風のレイアウト付きです。切り替え間隔を指定して自動送りにも、手でスクロールして見ることもできます。',

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
    </ul>`,
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
  log_activation_text:  'Если активируете вершину или парк вы сами, укажите свою ссылку в Настройки → Активация (SOTA/POTA) и включите режим активации. После этого ваши ссылки SOTA и POTA автоматически записываются в журнал при каждой связи — именно это требуется формату экспорта SOTA, и это куда проще, чем дописывать их потом в каждую запись.',

  log_activation_multi: 'Одна и та же точка нередко относится сразу к <strong>нескольким паркам POTA</strong> (n-fer). Кнопкой <strong>+ Добавить парк</strong> их можно вводить по одному, до шести. В этом случае экспорт автоматически переключается на <strong>один ADIF на каждый парк, упакованные в ZIP</strong>: по принятой в POTA практике на каждый парк загружается отдельный журнал, а несколько ссылок в одном поле приняты не будут. В каждый файл попадают только те связи, которые действительно относятся к этому парку. Если парк один, экспорт остаётся одним файлом.',

  log_slideshow_title: 'Слайд-шоу журнала',
  log_slideshow_text:  'Нажмите и удерживайте список журнала и выберите <em>Слайд-шоу</em>, чтобы просматривать связи по одной в полноэкранном виде — с фотографией оператора и оформлением в стиле QSL-карточки. Слайды сменяются через заданный интервал либо листаются вручную.',

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
    </ul>`,
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
  log_activation_text:  'Jeśli to ty aktywujesz szczyt lub park, wpisz własne oznaczenie w Ustawienia → Aktywacja (SOTA/POTA) i włącz tryb aktywacji. Od tej chwili twoje oznaczenia SOTA i POTA trafiają automatycznie do wpisów dziennika — właśnie tego wymaga format eksportu SOTA, a jest to znacznie wygodniejsze niż dopisywanie ich później do każdego wpisu.',

  log_activation_multi: 'To samo miejsce często leży jednocześnie w <strong>kilku parkach POTA</strong> (n-fer). Przyciskiem <strong>+ Dodaj park</strong> można je wpisywać pojedynczo, maksymalnie sześć. Eksport przełącza się wtedy na <strong>jeden ADIF na park, spakowane w ZIP</strong> — przyjętą w POTA praktyką jest osobny dziennik dla każdego parku, a kilka oznaczeń w jednym polu nie zostanie przyjętych. Każdy plik zawiera tylko te łączności, które naprawdę należą do danego parku. Przy jednym parku eksport pozostaje pojedynczym plikiem.',

  log_slideshow_title: 'Pokaz slajdów dziennika',
  log_slideshow_text:  'Przytrzymaj listę dziennika i wybierz <em>Pokaz slajdów</em>, aby przeglądać łączności pojedynczo na pełnym ekranie — ze zdjęciem operatora i układem przypominającym kartę QSL. Slajdy zmieniają się co zadany czas albo przewijasz je ręcznie.',

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
    </ul>`,
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
  log_activation_text:  'Cuando el que activa una cima o un parque eres tú, introduce tu propia referencia en Ajustes → Activación (SOTA/POTA) y activa el modo. A partir de ahí, tus referencias SOTA y POTA se escriben solas en las entradas del registro conforme trabajas estaciones: es justo lo que necesita el formato de exportación SOTA y resulta mucho más cómodo que añadirlas después a cada contacto.',

  log_activation_multi: 'Un mismo punto suele estar a la vez en <strong>varios parques POTA</strong> (un n-fer). Con <strong>+ Añadir parque</strong> se introducen de uno en uno, hasta seis. La exportación pasa entonces a <strong>un ADIF por parque, empaquetados en un ZIP</strong>: la práctica habitual en POTA es un registro por parque, subido por separado, y varias referencias en un mismo campo no se aceptan. Cada archivo contiene solo los contactos que pertenecen realmente a ese parque. Con un solo parque, la exportación sigue siendo un único archivo.',

  log_slideshow_title: 'Pase de diapositivas del registro',
  log_slideshow_text:  'Mantén pulsada la lista del registro y elige <em>Pase de diapositivas</em> para recorrer tus contactos a pantalla completa, uno a uno, con la foto del operador y un diseño al estilo de una tarjeta QSL. Las diapositivas avanzan según el intervalo que fijes, o puedes pasarlas a mano.',

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
    </ul>`,
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
  log_activation_text:  'Όταν εσείς είστε αυτός που ενεργοποιεί μια κορυφή ή ένα πάρκο, καταχωρίστε τον δικό σας κωδικό στις Ρυθμίσεις → Ενεργοποίηση (SOTA/POTA) και ενεργοποιήστε τη λειτουργία. Από εκεί και πέρα οι κωδικοί SOTA και POTA γράφονται αυτόματα στις εγγραφές του ημερολογίου καθώς κάνετε επαφές — ακριβώς αυτό απαιτεί η μορφή εξαγωγής SOTA και είναι πολύ πιο εύκολο από το να τους προσθέτετε εκ των υστέρων σε κάθε εγγραφή.',

  log_activation_multi: 'Το ίδιο σημείο συχνά ανήκει ταυτόχρονα σε <strong>πολλά πάρκα POTA</strong> (n-fer). Με το <strong>+ Προσθήκη πάρκου</strong> τα εισάγετε ένα-ένα, έως έξι. Τότε η εξαγωγή αλλάζει αυτόματα σε <strong>ένα ADIF ανά πάρκο, συσκευασμένα σε ZIP</strong>: η καθιερωμένη πρακτική στο POTA είναι ένα ημερολόγιο ανά πάρκο, που ανεβαίνει χωριστά, και πολλοί κωδικοί στο ίδιο πεδίο δεν γίνονται δεκτοί. Κάθε αρχείο περιέχει μόνο τις επαφές που ανήκουν πραγματικά σε εκείνο το πάρκο. Με ένα μόνο πάρκο, η εξαγωγή παραμένει ένα αρχείο.',

  log_slideshow_title: 'Προβολή διαφανειών ημερολογίου',
  log_slideshow_text:  'Πατήστε παρατεταμένα τη λίστα του ημερολογίου και επιλέξτε <em>Προβολή διαφανειών</em> για να δείτε τις επαφές μία-μία σε πλήρη οθόνη, με τη φωτογραφία του χειριστή και διάταξη σε στιλ κάρτας QSL. Οι διαφάνειες αλλάζουν στο διάστημα που ορίζετε ή τις μετακινείτε χειροκίνητα.',

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
