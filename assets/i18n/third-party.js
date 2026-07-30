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

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> is a worldwide propagation mapping service. FT8TW submits reception spots automatically — no account is required. Enable the feature in Settings → PSKReporter. Your callsign, grid, and received station data are submitted anonymously over HTTPS.',
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

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球無線電傳播地圖服務。FT8TW 可自動提交收聽報告，無需帳號。在設置中開啟 PSKReporter 功能。您的呼號、網格及收聽到的電台資訊將透過 HTTPS 匿名提交。',
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

  third_psk_title: 'PSKReporter',
  third_psk_text:  'Το <a href="https://pskreporter.info" target="_blank">PSKReporter</a> είναι παγκόσμια υπηρεσία χαρτογράφησης διάδοσης. Το FT8TW υποβάλλει αναφορές λήψης αυτόματα — δεν χρειάζεται λογαριασμός. Ενεργοποιήστε τη λειτουργία στις Ρυθμίσεις → PSKReporter. Το διακριτικό σας, το τετράγωνό σας και τα δεδομένα των σταθμών που λάβατε υποβάλλονται ανώνυμα μέσω HTTPS.',
},

}; /* end PAGE_T */
