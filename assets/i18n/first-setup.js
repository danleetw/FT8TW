/* ── FT8TW User Manual – i18n: First Setup ───────────────────────── */

const PAGE_T = {

en: {
  setup_title: 'First Setup',
  setup_intro: 'Complete these steps before making your first contact.',

  setup_s1_title: '1. Enter Your Callsign',
  setup_s1_text:  'Open the <strong>Settings</strong> tab and enter your amateur radio callsign in the <em>Callsign</em> field. The app validates the format and will refuse to transmit if the callsign is invalid. Secondary callsigns and portable suffixes (e.g., BV6LC/P) are supported.',

  setup_s2_title: '2. Enter Your Grid Locator',
  setup_s2_text:  'Enter your 4-character or 6-character <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead grid locator</a> in the <em>Grid square</em> field (e.g., <code>PL05</code> or <code>PL05so</code>). This locator is transmitted in FT8 messages and used to calculate distances. Tap the locate button to fill in your grid automatically using GPS.',

  setup_s3_title: '3. Select Operating Band',
  setup_s3_text:  'Choose your carrier frequency band (e.g., 20m, 40m) from the <em>Frequency</em> selector. If CAT control is connected, the app will automatically tune the radio to the standard FT8 dial frequency for that band.',

  setup_s4_title: '4. Select FT4 or FT8 Mode',
  setup_s4_text:  'Use the <em>FT4/FT8 mode</em> toggle to choose your operating mode. FT8 uses 15-second TX/RX slots and is the more widely used mode. FT4 uses 7.5-second slots and is approximately 4 dB less sensitive but twice as fast.',

  setup_s5_title: '5. Synchronize Time',
  setup_s5_text:  'FT8 decoding requires your device clock to be accurate to within ±1 second. In Settings, tap <strong>Sync</strong> to synchronize with an internet NTP server. A GPS fix also provides highly accurate time. The app displays the current time offset after synchronization.',
},

'zh-TW': {
  setup_title: '初始設定',
  setup_intro: '首次使用前，請完成以下設定。',

  setup_s1_title: '1. 輸入呼號',
  setup_s1_text:  '開啟<strong>設置</strong>頁面，在<em>我的呼號</em>欄位輸入您的業餘無線電呼號。程式會驗證呼號格式，若呼號無效將無法發射。支援附加字尾（如 BV6LC/P）。',

  setup_s2_title: '2. 輸入網格座標',
  setup_s2_text:  '在<em>我的位置</em>欄位輸入 4 碼或 6 碼的 <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead 網格座標</a>（例如 <code>PL05</code> 或 <code>PL05so</code>）。此座標會在 FT8 訊息中傳送，也用於計算通聯距離。可點選定位按鈕由 GPS 自動填入。',

  setup_s3_title: '3. 選擇頻段',
  setup_s3_text:  '從<em>載波頻段</em>選擇器選擇操作頻段（如 20m、40m）。若已連接 CAT 控制，程式會自動將電台調至該頻段的 FT8 標準頻率。',

  setup_s4_title: '4. 選擇 FT4 或 FT8 模式',
  setup_s4_text:  '使用<em>FT4/FT8 模式</em>切換選擇操作模式。FT8 使用 15 秒時隙，使用較為普遍。FT4 使用 7.5 秒時隙，速度較快但靈敏度低約 4 dB。',

  setup_s5_title: '5. 時間同步',
  setup_s5_text:  'FT8 解碼需要裝置時間準確至 ±1 秒內。在設置頁面點選<strong>同步時間</strong>，透過網路 NTP 伺服器校時。取得 GPS 訊號亦可提供高精度時間。同步後程式會顯示目前的時間偏差值。',
},

'zh-CN': {
  setup_title: '初始设置',
  setup_intro: '首次使用前，请完成以下设置。',

  setup_s1_title: '1. 输入呼号',
  setup_s1_text:  '打开<strong>设置</strong>页面，在<em>我的呼号</em>栏输入您的业余无线电呼号。程序会验证呼号格式，若呼号无效将无法发射。支持附加后缀（如 BV6LC/P）。',

  setup_s2_title: '2. 输入网格坐标',
  setup_s2_text:  '在<em>我的位置</em>栏输入 4 位或 6 位的 <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead 网格坐标</a>（例如 <code>PL05</code> 或 <code>PL05so</code>）。此坐标会在 FT8 消息中传送，也用于计算通联距离。可点击定位按钮由 GPS 自动填入。',

  setup_s3_title: '3. 选择频段',
  setup_s3_text:  '从<em>载波频段</em>选择器选择操作频段（如 20m、40m）。若已连接 CAT 控制，程序会自动将电台调至该频段的 FT8 标准频率。',

  setup_s4_title: '4. 选择 FT4 或 FT8 模式',
  setup_s4_text:  '使用<em>FT4/FT8 模式</em>开关选择操作模式。FT8 使用 15 秒时隙，使用较为普遍。FT4 使用 7.5 秒时隙，速度较快但灵敏度低约 4 dB。',

  setup_s5_title: '5. 时间同步',
  setup_s5_text:  'FT8 解码需要设备时间准确至 ±1 秒内。在设置页面点击<strong>同步时间</strong>，通过网络 NTP 服务器校时。获取 GPS 信号亦可提供高精度时间。同步后程序会显示当前的时间偏差值。',
},

'ja': {
  setup_title: '初期設定',
  setup_intro: '最初の交信を行う前に、次の設定を済ませてください。',

  setup_s1_title: '1. コールサインを入力する',
  setup_s1_text:  '<strong>設定</strong>タブを開き、<em>コールサイン</em>欄に自局のコールサインを入力します。アプリは書式を検証し、不正なコールサインでは送信しません。ポータブル運用のサフィックス（例: BV6LC/P）にも対応しています。',

  setup_s2_title: '2. グリッドロケーターを入力する',
  setup_s2_text:  '<em>グリッド</em>欄に 4 桁または 6 桁の <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead グリッドロケーター</a>（例: <code>PL05</code> または <code>PL05so</code>）を入力します。このロケーターは FT8 の電文で送信され、距離の計算にも使われます。位置ボタンをタップすると GPS から自動的に入力できます。',

  setup_s3_title: '3. 運用バンドを選ぶ',
  setup_s3_text:  '<em>周波数</em>セレクターで運用するバンド（20m、40m など）を選びます。CAT 制御が接続されていれば、そのバンドの標準的な FT8 ダイヤル周波数へ自動的に合わせます。',

  setup_s4_title: '4. FT4 か FT8 を選ぶ',
  setup_s4_text:  '<em>FT4/FT8 モード</em>の切り替えで運用モードを選びます。FT8 は 15 秒の送受信スロットを使い、より広く使われています。FT4 は 7.5 秒スロットで、感度は約 4 dB 劣りますが速度は 2 倍です。',

  setup_s5_title: '5. 時刻を同期する',
  setup_s5_text:  'FT8 のデコードには端末の時計が ±1 秒以内の精度である必要があります。設定で<strong>同期</strong>をタップするとインターネット上の NTP サーバーと時刻を合わせます。GPS の測位でも高精度な時刻が得られます。同期後は現在の時刻オフセットが表示されます。',
},

'ru': {
  setup_title: 'Первая настройка',
  setup_intro: 'Выполните эти шаги до первой связи.',

  setup_s1_title: '1. Введите свой позывной',
  setup_s1_text:  'Откройте вкладку <strong>Настройки</strong> и введите свой любительский позывной в поле <em>Позывной</em>. Приложение проверяет формат и не станет передавать при неверном позывном. Поддерживаются дополнительные позывные и суффиксы (например, BV6LC/P).',

  setup_s2_title: '2. Введите свой локатор',
  setup_s2_text:  'Введите 4- или 6-значный <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">локатор Maidenhead</a> в поле <em>Локатор</em> (например, <code>PL05</code> или <code>PL05so</code>). Локатор передаётся в сообщениях FT8 и используется для расчёта расстояний. Нажмите кнопку определения местоположения, чтобы заполнить локатор по GPS.',

  setup_s3_title: '3. Выберите рабочий диапазон',
  setup_s3_text:  'Выберите диапазон несущей (например, 20 м, 40 м) в селекторе <em>Частота</em>. Если подключено управление CAT, приложение автоматически настроит трансивер на стандартную частоту FT8 для этого диапазона.',

  setup_s4_title: '4. Выберите режим FT4 или FT8',
  setup_s4_text:  'Переключателем <em>Режим FT4/FT8</em> выберите вид работы. FT8 использует интервалы приёма/передачи по 15 секунд и распространён шире. FT4 работает интервалами по 7,5 секунды: он примерно на 4 дБ менее чувствителен, но вдвое быстрее.',

  setup_s5_title: '5. Синхронизируйте время',
  setup_s5_text:  'Для декодирования FT8 часы устройства должны быть точны в пределах ±1 секунды. В настройках нажмите <strong>Синхронизировать</strong>, чтобы сверить время с NTP-сервером в интернете. Приём GPS также даёт высокую точность. После синхронизации приложение показывает текущее смещение времени.',
},

'pl': {
  setup_title: 'Pierwsza konfiguracja',
  setup_intro: 'Wykonaj te kroki przed pierwszą łącznością.',

  setup_s1_title: '1. Wpisz swój znak wywoławczy',
  setup_s1_text:  'Otwórz zakładkę <strong>Ustawienia</strong> i wpisz swój znak krótkofalarski w polu <em>Znak wywoławczy</em>. Aplikacja sprawdza format i nie pozwoli nadawać przy nieprawidłowym znaku. Obsługiwane są znaki dodatkowe i przyrostki (np. BV6LC/P).',

  setup_s2_title: '2. Wpisz swój lokator',
  setup_s2_text:  'W polu <em>Lokator</em> wpisz 4- lub 6-znakowy <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">lokator Maidenhead</a> (np. <code>PL05</code> lub <code>PL05so</code>). Lokator jest nadawany w wiadomościach FT8 i służy do obliczania odległości. Dotknij przycisku lokalizacji, aby wypełnić go automatycznie z GPS.',

  setup_s3_title: '3. Wybierz pasmo pracy',
  setup_s3_text:  'W selektorze <em>Częstotliwość</em> wybierz pasmo nośnej (np. 20 m, 40 m). Jeśli sterowanie CAT jest podłączone, aplikacja automatycznie przestroi radio na standardową częstotliwość FT8 dla tego pasma.',

  setup_s4_title: '4. Wybierz tryb FT4 lub FT8',
  setup_s4_text:  'Przełącznikiem <em>Tryb FT4/FT8</em> wybierz rodzaj pracy. FT8 używa 15-sekundowych okien nadawania/odbioru i jest szerzej stosowany. FT4 używa okien 7,5-sekundowych: jest o około 4 dB mniej czuły, ale dwa razy szybszy.',

  setup_s5_title: '5. Zsynchronizuj czas',
  setup_s5_text:  'Dekodowanie FT8 wymaga zegara urządzenia dokładnego do ±1 sekundy. W ustawieniach dotknij <strong>Synchronizuj</strong>, aby uzgodnić czas z internetowym serwerem NTP. Ustalona pozycja GPS również daje bardzo dokładny czas. Po synchronizacji aplikacja pokazuje bieżące przesunięcie czasu.',
},

'es': {
  setup_title: 'Configuración inicial',
  setup_intro: 'Completa estos pasos antes de tu primer contacto.',

  setup_s1_title: '1. Introduce tu indicativo',
  setup_s1_text:  'Abre la pestaña <strong>Ajustes</strong> e introduce tu indicativo de radioaficionado en el campo <em>Indicativo</em>. La aplicación valida el formato y no transmitirá si el indicativo no es válido. Se admiten indicativos secundarios y sufijos portables (por ejemplo, BV6LC/P).',

  setup_s2_title: '2. Introduce tu localizador',
  setup_s2_text:  'Introduce tu <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">localizador Maidenhead</a> de 4 o 6 caracteres en el campo <em>Localizador</em> (por ejemplo, <code>PL05</code> o <code>PL05so</code>). Este localizador se transmite en los mensajes FT8 y se usa para calcular distancias. Pulsa el botón de ubicación para rellenarlo automáticamente con el GPS.',

  setup_s3_title: '3. Selecciona la banda de trabajo',
  setup_s3_text:  'Elige la banda de la portadora (por ejemplo, 20 m, 40 m) en el selector de <em>Frecuencia</em>. Si el control CAT está conectado, la aplicación sintonizará automáticamente el equipo en la frecuencia estándar de FT8 de esa banda.',

  setup_s4_title: '4. Selecciona el modo FT4 o FT8',
  setup_s4_text:  'Usa el conmutador <em>Modo FT4/FT8</em> para elegir el modo de trabajo. FT8 emplea intervalos de transmisión/recepción de 15 segundos y es el más utilizado. FT4 usa intervalos de 7,5 segundos: es unos 4 dB menos sensible, pero el doble de rápido.',

  setup_s5_title: '5. Sincroniza la hora',
  setup_s5_text:  'La decodificación de FT8 exige que el reloj del dispositivo sea preciso dentro de ±1 segundo. En Ajustes, pulsa <strong>Sincronizar</strong> para ajustar la hora con un servidor NTP de internet. Una posición GPS también proporciona una hora muy precisa. Tras la sincronización, la aplicación muestra el desfase horario actual.',
},

'el': {
  setup_title: 'Αρχική ρύθμιση',
  setup_intro: 'Ολοκληρώστε αυτά τα βήματα πριν από την πρώτη σας επαφή.',

  setup_s1_title: '1. Εισαγάγετε το διακριτικό σας',
  setup_s1_text:  'Ανοίξτε την καρτέλα <strong>Ρυθμίσεις</strong> και εισαγάγετε το διακριτικό σας στο πεδίο <em>Διακριτικό</em>. Η εφαρμογή ελέγχει τη μορφή και δεν εκπέμπει αν το διακριτικό δεν είναι έγκυρο. Υποστηρίζονται δευτερεύοντα διακριτικά και καταλήξεις φορητής λειτουργίας (π.χ. BV6LC/P).',

  setup_s2_title: '2. Εισαγάγετε το τετράγωνό σας',
  setup_s2_text:  'Εισαγάγετε το <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">τετράγωνο Maidenhead</a> 4 ή 6 χαρακτήρων στο πεδίο <em>Τετράγωνο</em> (π.χ. <code>PL05</code> ή <code>PL05so</code>). Το τετράγωνο μεταδίδεται στα μηνύματα FT8 και χρησιμοποιείται για τον υπολογισμό αποστάσεων. Πατήστε το κουμπί εντοπισμού για αυτόματη συμπλήρωση μέσω GPS.',

  setup_s3_title: '3. Επιλέξτε μπάντα λειτουργίας',
  setup_s3_text:  'Επιλέξτε τη μπάντα του φέροντος (π.χ. 20 m, 40 m) από τον επιλογέα <em>Συχνότητα</em>. Αν είναι συνδεδεμένος ο έλεγχος CAT, η εφαρμογή συντονίζει αυτόματα τον πομποδέκτη στην τυπική συχνότητα FT8 της μπάντας.',

  setup_s4_title: '4. Επιλέξτε λειτουργία FT4 ή FT8',
  setup_s4_text:  'Με τον διακόπτη <em>Λειτουργία FT4/FT8</em> επιλέξτε τον τρόπο λειτουργίας. Το FT8 χρησιμοποιεί χρονοθυρίδες 15 δευτερολέπτων και είναι πιο διαδεδομένο. Το FT4 χρησιμοποιεί χρονοθυρίδες 7,5 δευτερολέπτων: είναι περίπου 4 dB λιγότερο ευαίσθητο, αλλά διπλάσια γρήγορο.',

  setup_s5_title: '5. Συγχρονίστε την ώρα',
  setup_s5_text:  'Η αποκωδικοποίηση FT8 απαιτεί το ρολόι της συσκευής να είναι ακριβές εντός ±1 δευτερολέπτου. Στις Ρυθμίσεις πατήστε <strong>Συγχρονισμός</strong> για συγχρονισμό με διακομιστή NTP στο διαδίκτυο. Το στίγμα GPS δίνει επίσης πολύ ακριβή ώρα. Μετά τον συγχρονισμό εμφανίζεται η τρέχουσα απόκλιση ώρας.',
},

}; /* end PAGE_T */
