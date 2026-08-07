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

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  'Completed QSOs can be uploaded automatically to your own <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> or <a href="https://www.wavelog.org/" target="_blank">Wavelog</a> installation. Both use the same API, so one set of settings covers either.',
  third_cloudlog_setup: `
    <ol>
      <li>Go to Settings → <strong>Cloudlog / Wavelog</strong>.</li>
      <li>Enter the <strong>Server Address</strong> of your installation, for example <code>https://log.example.com</code>.</li>
      <li>Enter your <strong>API Key</strong>, created in the Cloudlog/Wavelog web interface.</li>
      <li>Enter the <strong>Station ID</strong> of the station profile the QSOs should be filed under.</li>
      <li>Tap <strong>Test</strong> to verify the address and key before going on the air.</li>
      <li>Enable <strong>Auto-upload to Cloudlog / Wavelog</strong>.</li>
    </ol>`,
  third_cloudlog_note: '<strong>The API key must be read-write.</strong> A read-only key passes the connection test but cannot upload — the test reports this explicitly so you can fix it before relying on it.',
  third_cloudlog_manual: 'Already-logged QSOs can be sent afterwards as well: pick a date range and upload in bulk. The result reports how many were uploaded and how many failed, so a partial upload is not mistaken for a complete one.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> is a worldwide propagation mapping service. FT8TW submits reception spots automatically — no account is required. Enable the feature in Settings → PSKReporter. Your callsign, grid, and received station data are submitted anonymously over HTTPS.',

  third_api_title: 'Developer API (Add-ons)',
  third_api_text:  'Turning on the <strong>Developer API</strong> in Settings → <strong>Advanced &amp; Developer</strong> starts a small web service on the phone, letting other programs <strong>on the same local network</strong> read decodes, log entries, the spectrum and the current status — enough to build your own add-ons and tools against. The access address is shown once it is enabled.',
  third_api_list: `
    <ul>
      <li><strong>Demo page</strong> — open the address shown on screen in a desktop browser and you get a ready-made demonstration page showing what the API offers. That page <strong>has to be served by the phone itself</strong>; copying it to another site or opening it as a local file will be blocked by the browser's security rules.</li>
      <li><strong>Read-only token</strong> — hand this one out when a tool only needs to read your decodes and log.</li>
      <li><strong>Full-access token</strong> — needed only to control transmission; treat it as a password. <strong>Regenerate</strong> invalidates the old one immediately and disconnects any add-ons using it.</li>
      <li><strong>Allow remote transmit control</strong> — a separate switch, off by default. Only while it is on can a program holding the full-access token start or stop transmission; everything else is read-only, and free-text transmission is deliberately not exposed at all.</li>
    </ul>`,
  third_api_warn: 'Anyone on the same network who obtains your token can read your log and your settings, so it is best to <strong>turn the API on only when you need it</strong>. Credentials for third-party services (Cloudlog, QRZ) are never exposed. If the port is already taken by another program the API will not start, and the screen says so.',
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

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  '完成的通聯可自動上傳到您自己架設的 <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> 或 <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>。兩者使用相同的 API，因此同一組設定兩邊都適用。',
  third_cloudlog_setup: `
    <ol>
      <li>進入設置 → <strong>Cloudlog / Wavelog</strong>。</li>
      <li>填入您站台的<strong>伺服器地址</strong>，例如 <code>https://log.example.com</code>。</li>
      <li>填入在 Cloudlog／Wavelog 網頁介面中建立的 <strong>API Key</strong>。</li>
      <li>填入要歸屬的<strong>站點 ID</strong>（電台設定檔編號）。</li>
      <li>上場前先點<strong>測試</strong>，確認位址與金鑰無誤。</li>
      <li>開啟<strong>自動上傳至 Cloudlog / Wavelog</strong>。</li>
    </ol>`,
  third_cloudlog_note: '<strong>API 金鑰必須是可讀寫的。</strong>唯讀金鑰能通過連線測試卻無法上傳——測試會明確指出這一點，讓您在真正倚賴它之前就先修正。',
  third_cloudlog_manual: '已經記錄過的通聯也能事後補傳：選定日期範圍後點<strong>手動上傳</strong>即可批次送出。完成後會回報成功與失敗的筆數，避免把只傳了一部分誤當成全部傳完。',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球無線電傳播地圖服務。FT8TW 可自動提交收聽報告，無需帳號。在設置 → 上傳至第三方中開啟<strong>回報訊號到 PSK Reporter</strong>。您的呼號、網格及收聽到的電台資訊將透過 HTTPS 匿名提交。旁邊的<strong>天線資訊</strong>是隨報告一起送出的天線型號描述（例如 <code>Dipole</code>），純粹是給地圖看的說明文字。',

  third_api_title: '開發者 API（外掛）',
  third_api_text:  '在設置 → <strong>進階與開發者</strong>開啟<strong>開發者 API</strong>後，FT8TW 會在手機上開一個小型網頁服務，讓<strong>同一個區域網路內</strong>的其他程式讀取解碼結果、通聯記錄、頻譜與目前狀態，您可以據此開發自己的外掛與工具。開啟後畫面上會顯示存取網址。',
  third_api_list: `
    <ul>
      <li><strong>示範網頁</strong> — 用電腦的瀏覽器打開畫面上顯示的網址，就會看到一個現成的示範頁面，可以直接看到 API 提供哪些資料。這個頁面<strong>必須由手機本身提供</strong>；把它複製到別的網站或存成本機檔案再開，都會被瀏覽器的安全限制擋下。</li>
      <li><strong>唯讀 Token</strong> — 要讓某個工具讀取您的解碼與日誌時，給這一把。</li>
      <li><strong>完整權限 Token</strong> — 控制發射時才需要，請當成密碼看待。<strong>重新產生</strong>會讓舊的立刻失效，所有連線中的外掛都會被中斷。</li>
      <li><strong>允許遠端控制發射</strong> — 獨立的開關，預設為關。只有它開啟時，持有完整權限 Token 的程式才能開始或停止發射；其餘功能一律唯讀，自由文字發射則刻意完全不開放。</li>
    </ul>`,
  third_api_warn: '同一個網路內只要有人拿到您的 Token，就能讀取您的日誌與設定，因此建議<strong>需要時才打開</strong>。第三方服務的帳號密碼（Cloudlog、QRZ）不會被讀取。另外，若該通訊埠已被其他程式佔用，API 不會啟動，畫面上會直接說明。',
},

'zh-CN': {
  third_title: '第三方服务',

  third_qrz_title: 'QRZ.com 日志簿',
  third_qrz_text:  '自动将完成的通联上传至您的 QRZ.com 在线日志簿。需要 QRZ.com XML 订阅方案。',
  third_qrz_setup: `
    <ol>
      <li>进入设置 → <strong>QRZ.com 设置</strong>。</li>
      <li>输入您的 <strong>QRZ.com API 密钥</strong>（在 QRZ.com 呼号页面 → Logbook 设置中获取）。</li>
      <li>开启<strong>自动上传至 QRZ.com</strong>。</li>
      <li>可点击<strong>手动上传</strong>按钮立即推送现有日志。</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  '完成的通联可自动上传到您自己搭建的 <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> 或 <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>。两者使用相同的 API，因此同一组设置两边都适用。',
  third_cloudlog_setup: `
    <ol>
      <li>进入设置 → <strong>Cloudlog / Wavelog</strong>。</li>
      <li>填入您站点的<strong>服务器地址</strong>，例如 <code>https://log.example.com</code>。</li>
      <li>填入在 Cloudlog／Wavelog 网页界面中创建的 <strong>API Key</strong>。</li>
      <li>填入要归属的<strong>站点 ID</strong>（电台配置编号）。</li>
      <li>上场前先点<strong>测试</strong>，确认地址与密钥无误。</li>
      <li>开启<strong>自动上传至 Cloudlog / Wavelog</strong>。</li>
    </ol>`,
  third_cloudlog_note: '<strong>API 密钥必须是可读写的。</strong>只读密钥能通过连接测试却无法上传——测试会明确指出这一点，让您在真正依赖它之前就先修正。',
  third_cloudlog_manual: '已经记录过的通联也能事后补传：选定日期范围后点<strong>手动上传</strong>即可批量发出。完成后会报告成功与失败的条数，避免把只传了一部分误当成全部传完。',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球无线电传播地图服务。FT8TW 可自动提交收听报告，无需账号。在设置中开启 PSKReporter 功能。您的呼号、网格及收听到的电台信息将通过 HTTPS 匿名提交。',
},

'ja': {
  third_title: '外部サービス連携',

  third_qrz_title: 'QRZ.com ログブック',
  third_qrz_text:  '完了した交信を QRZ.com のオンラインログブックへ自動的にアップロードします。QRZ.com の XML サブスクリプションが必要です。',
  third_qrz_setup: `
    <ol>
      <li>設定 → <strong>QRZ.com 設定</strong>を開きます。</li>
      <li><strong>QRZ.com API キー</strong>を入力します（QRZ.com の自局コールサインのページ → Logbook 設定にあります）。</li>
      <li><strong>QRZ.com へ自動アップロード</strong>を有効にします。</li>
      <li>既存のログをすぐに送りたいときは<strong>手動アップロード</strong>ボタンを使います。</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  '完了した交信は、自分で運用している <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> または <a href="https://www.wavelog.org/" target="_blank">Wavelog</a> へ自動的にアップロードできます。どちらも同じ API を使うため、設定は 1 組で両対応です。',
  third_cloudlog_setup: `
    <ol>
      <li>設定 → <strong>Cloudlog / Wavelog</strong> を開きます。</li>
      <li>ご自身のサーバーの<strong>サーバーアドレス</strong>を入力します（例: <code>https://log.example.com</code>）。</li>
      <li>Cloudlog／Wavelog の Web 画面で作成した <strong>API キー</strong>を入力します。</li>
      <li>交信を記録するステーションプロファイルの <strong>Station ID</strong> を入力します。</li>
      <li>運用に入る前に<strong>テスト</strong>をタップし、アドレスとキーを確認します。</li>
      <li><strong>Cloudlog / Wavelog へ自動アップロード</strong>を有効にします。</li>
    </ol>`,
  third_cloudlog_note: '<strong>API キーは読み書き可能なものが必要です。</strong>読み取り専用のキーは接続テストには通りますがアップロードできません。テストがその旨をはっきり知らせるので、本番で頼る前に修正できます。',
  third_cloudlog_manual: 'すでに記録済みの交信も後から送れます。日付の範囲を選べばまとめてアップロードでき、完了後に成功と失敗の件数が表示されるので、一部しか送れていないのに全部送れたと勘違いすることがありません。',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> は世界規模の電波伝搬マッピングサービスです。FT8TW は受信レポートを自動送信します。アカウントは不要です。設定 → PSKReporter で機能を有効にしてください。自局のコールサイン、グリッド、受信した局の情報は HTTPS 経由で匿名送信されます。',
},

'ru': {
  third_title: 'Внешние сервисы',

  third_qrz_title: 'Аппаратный журнал QRZ.com',
  third_qrz_text:  'Автоматическая выгрузка завершённых QSO в ваш онлайн-журнал на QRZ.com. Требуется подписка QRZ.com XML.',
  third_qrz_setup: `
    <ol>
      <li>Откройте Настройки → <strong>Настройки QRZ.com</strong>.</li>
      <li>Введите свой <strong>ключ API QRZ.com</strong> (находится на странице вашего позывного → настройки Logbook).</li>
      <li>Включите <strong>автоматическую выгрузку на QRZ.com</strong>.</li>
      <li>Кнопка <strong>Выгрузить вручную</strong> отправляет уже имеющиеся записи по требованию.</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  'Завершённые QSO можно автоматически выгружать в собственный экземпляр <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> или <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>. У обоих одинаковый API, поэтому одного набора настроек хватает для любого из них.',
  third_cloudlog_setup: `
    <ol>
      <li>Откройте Настройки → <strong>Cloudlog / Wavelog</strong>.</li>
      <li>Введите <strong>адрес сервера</strong> своей установки, например <code>https://log.example.com</code>.</li>
      <li>Введите <strong>ключ API</strong>, созданный в веб-интерфейсе Cloudlog/Wavelog.</li>
      <li>Введите <strong>Station ID</strong> — профиль станции, к которому будут отнесены связи.</li>
      <li>Перед выходом в эфир нажмите <strong>Проверить</strong>, чтобы убедиться в правильности адреса и ключа.</li>
      <li>Включите <strong>автоматическую выгрузку в Cloudlog / Wavelog</strong>.</li>
    </ol>`,
  third_cloudlog_note: '<strong>Ключ API должен быть с правом записи.</strong> Ключ только для чтения проходит проверку соединения, но выгружать им нельзя — проверка сообщает об этом прямо, чтобы вы исправили это заранее.',
  third_cloudlog_manual: 'Уже записанные связи тоже можно отправить позже: выберите диапазон дат и выгрузите их пакетом. По окончании показывается, сколько записей выгружено и сколько не удалось, так что частичная выгрузка не будет принята за полную.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> — всемирный сервис карт прохождения. FT8TW отправляет отчёты о приёме автоматически, учётная запись не нужна. Включите эту функцию в Настройки → PSKReporter. Ваш позывной, локатор и данные о принятых станциях передаются анонимно по HTTPS.',
},

'pl': {
  third_title: 'Usługi zewnętrzne',

  third_qrz_title: 'Dziennik QRZ.com',
  third_qrz_text:  'Automatyczne wysyłanie zakończonych łączności do dziennika online na QRZ.com. Wymaga subskrypcji QRZ.com XML.',
  third_qrz_setup: `
    <ol>
      <li>Przejdź do Ustawienia → <strong>Ustawienia QRZ.com</strong>.</li>
      <li>Wpisz swój <strong>klucz API QRZ.com</strong> (znajdziesz go na stronie swojego znaku → ustawienia Logbook).</li>
      <li>Włącz <strong>automatyczne wysyłanie do QRZ.com</strong>.</li>
      <li>Przyciskiem <strong>Wyślij ręcznie</strong> możesz przesłać istniejące wpisy na żądanie.</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  'Zakończone łączności można automatycznie wysyłać do własnej instalacji <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> lub <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>. Oba używają tego samego API, więc jeden komplet ustawień obsługuje każdy z nich.',
  third_cloudlog_setup: `
    <ol>
      <li>Przejdź do Ustawienia → <strong>Cloudlog / Wavelog</strong>.</li>
      <li>Wpisz <strong>adres serwera</strong> swojej instalacji, na przykład <code>https://log.example.com</code>.</li>
      <li>Wpisz <strong>klucz API</strong> utworzony w interfejsie WWW Cloudlog/Wavelog.</li>
      <li>Wpisz <strong>Station ID</strong> profilu stacji, do którego mają trafiać łączności.</li>
      <li>Przed wyjściem na pasmo dotknij <strong>Testuj</strong>, aby sprawdzić adres i klucz.</li>
      <li>Włącz <strong>automatyczne wysyłanie do Cloudlog / Wavelog</strong>.</li>
    </ol>`,
  third_cloudlog_note: '<strong>Klucz API musi mieć prawo zapisu.</strong> Klucz tylko do odczytu przechodzi test połączenia, ale nie pozwala wysyłać — test wyraźnie o tym informuje, więc poprawisz to zawczasu.',
  third_cloudlog_manual: 'Wcześniej zapisane łączności także można wysłać później: wybierz zakres dat i prześlij je zbiorczo. Po zakończeniu podawana jest liczba wysłanych i nieudanych wpisów, więc częściowe wysłanie nie zostanie wzięte za kompletne.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> to światowy serwis map propagacji. FT8TW wysyła raporty odbioru automatycznie — konto nie jest potrzebne. Włącz tę funkcję w Ustawienia → PSKReporter. Twój znak, lokator i dane odebranych stacji są przesyłane anonimowo przez HTTPS.',
},

'es': {
  third_title: 'Servicios externos',

  third_qrz_title: 'Libro de guardia de QRZ.com',
  third_qrz_text:  'Sube automáticamente los QSO completados a tu libro de guardia en línea de QRZ.com. Requiere una suscripción XML de QRZ.com.',
  third_qrz_setup: `
    <ol>
      <li>Ve a Ajustes → <strong>Ajustes de QRZ.com</strong>.</li>
      <li>Introduce tu <strong>clave API de QRZ.com</strong> (está en la página de tu indicativo → ajustes de Logbook).</li>
      <li>Activa <strong>Subida automática a QRZ.com</strong>.</li>
      <li>Usa el botón <strong>Subida manual</strong> para enviar los registros existentes cuando lo necesites.</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  'Los QSO completados pueden subirse automáticamente a tu propia instalación de <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> o <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>. Ambos usan la misma API, así que una sola configuración sirve para cualquiera de los dos.',
  third_cloudlog_setup: `
    <ol>
      <li>Ve a Ajustes → <strong>Cloudlog / Wavelog</strong>.</li>
      <li>Introduce la <strong>dirección del servidor</strong> de tu instalación, por ejemplo <code>https://log.example.com</code>.</li>
      <li>Introduce tu <strong>clave API</strong>, creada en la interfaz web de Cloudlog/Wavelog.</li>
      <li>Introduce el <strong>Station ID</strong> del perfil de estación al que deben asignarse los QSO.</li>
      <li>Antes de salir al aire pulsa <strong>Probar</strong> para verificar la dirección y la clave.</li>
      <li>Activa <strong>Subida automática a Cloudlog / Wavelog</strong>.</li>
    </ol>`,
  third_cloudlog_note: '<strong>La clave API debe ser de lectura y escritura.</strong> Una clave de solo lectura supera la prueba de conexión pero no puede subir nada; la prueba lo indica de forma explícita para que lo corrijas antes de confiar en ella.',
  third_cloudlog_manual: 'Los QSO ya registrados también pueden enviarse después: elige un intervalo de fechas y súbelos en bloque. Al terminar se indica cuántos se subieron y cuántos fallaron, de modo que una subida parcial no se confunda con una completa.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> es un servicio mundial de mapas de propagación. FT8TW envía los informes de recepción automáticamente; no hace falta cuenta. Activa la función en Ajustes → PSKReporter. Tu indicativo, tu localizador y los datos de las estaciones recibidas se envían de forma anónima por HTTPS.',
},

'el': {
  third_title: 'Εξωτερικές υπηρεσίες',

  third_qrz_title: 'Ημερολόγιο QRZ.com',
  third_qrz_text:  'Ανεβάζει αυτόματα τις ολοκληρωμένες επαφές στο ηλεκτρονικό σας ημερολόγιο στο QRZ.com. Απαιτείται συνδρομή QRZ.com XML.',
  third_qrz_setup: `
    <ol>
      <li>Μεταβείτε στις Ρυθμίσεις → <strong>Ρυθμίσεις QRZ.com</strong>.</li>
      <li>Εισαγάγετε το <strong>κλειδί API του QRZ.com</strong> (βρίσκεται στη σελίδα του διακριτικού σας → ρυθμίσεις Logbook).</li>
      <li>Ενεργοποιήστε την <strong>αυτόματη αποστολή στο QRZ.com</strong>.</li>
      <li>Με το κουμπί <strong>Χειροκίνητη αποστολή</strong> στέλνετε τις υπάρχουσες εγγραφές όποτε θέλετε.</li>
    </ol>`,

  third_cloudlog_title: 'Cloudlog / Wavelog',
  third_cloudlog_text:  'Οι ολοκληρωμένες επαφές μπορούν να ανεβαίνουν αυτόματα στη δική σας εγκατάσταση <a href="https://www.magicbug.co.uk/cloudlog/" target="_blank">Cloudlog</a> ή <a href="https://www.wavelog.org/" target="_blank">Wavelog</a>. Και τα δύο χρησιμοποιούν το ίδιο API, οπότε ένα σύνολο ρυθμίσεων καλύπτει και τα δύο.',
  third_cloudlog_setup: `
    <ol>
      <li>Μεταβείτε στις Ρυθμίσεις → <strong>Cloudlog / Wavelog</strong>.</li>
      <li>Εισαγάγετε τη <strong>διεύθυνση διακομιστή</strong> της εγκατάστασής σας, π.χ. <code>https://log.example.com</code>.</li>
      <li>Εισαγάγετε το <strong>κλειδί API</strong> που δημιουργήσατε στο περιβάλλον web του Cloudlog/Wavelog.</li>
      <li>Εισαγάγετε το <strong>Station ID</strong> του προφίλ σταθμού στο οποίο θα καταχωρούνται οι επαφές.</li>
      <li>Πριν βγείτε στον αέρα πατήστε <strong>Δοκιμή</strong> για να επαληθεύσετε διεύθυνση και κλειδί.</li>
      <li>Ενεργοποιήστε την <strong>αυτόματη αποστολή σε Cloudlog / Wavelog</strong>.</li>
    </ol>`,
  third_cloudlog_note: '<strong>Το κλειδί API πρέπει να έχει δικαίωμα εγγραφής.</strong> Ένα κλειδί μόνο για ανάγνωση περνά τον έλεγχο σύνδεσης αλλά δεν μπορεί να ανεβάσει — ο έλεγχος το αναφέρει ρητά, ώστε να το διορθώσετε προτού το εμπιστευτείτε.',
  third_cloudlog_manual: 'Και οι ήδη καταχωρημένες επαφές μπορούν να σταλούν εκ των υστέρων: επιλέξτε εύρος ημερομηνιών και ανεβάστε τες μαζικά. Στο τέλος αναφέρεται πόσες ανέβηκαν και πόσες απέτυχαν, ώστε μια μερική αποστολή να μην εκληφθεί ως πλήρης.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  'Το <a href="https://pskreporter.info" target="_blank">PSKReporter</a> είναι παγκόσμια υπηρεσία χαρτογράφησης διάδοσης. Το FT8TW υποβάλλει αναφορές λήψης αυτόματα — δεν χρειάζεται λογαριασμός. Ενεργοποιήστε τη λειτουργία στις Ρυθμίσεις → PSKReporter. Το διακριτικό σας, το τετράγωνό σας και τα δεδομένα των σταθμών που λάβατε υποβάλλονται ανώνυμα μέσω HTTPS.',
},

}; /* end PAGE_T */
