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
},

}; /* end PAGE_T */
