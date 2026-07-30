/* ── FT8TW User Manual – i18n: SSB Voice ─────────────────────────── */

const PAGE_T = {

en: {
  ssb_title: 'SSB Voice',
  ssb_intro: 'Beyond digital modes, FT8TW can also operate as a simple push-to-talk voice interface, using the same radio connection already configured for FT8/FT4.',

  ssb_use_title: 'Push-to-Talk Operation',
  ssb_use_text:  'Open the SSB tab and press and hold the talk button to transmit:',
  ssb_use_list: `
    <ul>
      <li>Holding the button captures audio from the phone's microphone, asserts PTT via CAT command, and routes audio out through the connected USB sound card or Bluetooth SCO audio.</li>
      <li>Releasing the button (or if the touch is interrupted) immediately stops transmission and releases PTT.</li>
      <li>USB audio PTT is field-verified. Bluetooth SCO audio PTT is functional but has seen less field testing — please report any issues.</li>
    </ul>`,

  ssb_safety_title: 'PTT-Stuck Protection',
  ssb_safety_text:  'The talk button uses a triple safety mechanism — release, touch-cancel, and a backstop timeout — so that a stuck or interrupted touch event cannot leave the radio transmitting indefinitely.',
},

'zh-TW': {
  ssb_title: 'SSB 語音',
  ssb_intro: '除了數位模式之外，FT8TW 也能作為簡易的按住通話（PTT）語音介面，沿用與 FT8/FT4 相同的電台連線設定。',

  ssb_use_title: '按住通話操作',
  ssb_use_text:  '開啟 SSB 分頁，按住通話按鈕即可發射：',
  ssb_use_list: `
    <ul>
      <li>按住按鈕時，程式會擷取手機麥克風音訊、透過 CAT 指令觸發 PTT，並將音訊輸出至已連接的 USB 音效卡或藍牙 SCO 音訊。</li>
      <li>放開按鈕（或觸控被中斷）會立即停止發射並釋放 PTT。</li>
      <li>USB 音訊 PTT 已完成實機驗證；藍牙 SCO 音訊 PTT 功能可運作，但實機測試較少，若遇到問題還請回報。</li>
    </ul>`,

  ssb_safety_title: 'PTT 卡住防護',
  ssb_safety_text:  '通話按鈕採用三重安全機制——放開、觸控取消、以及保底逾時——確保觸控事件卡住或被中斷時，電台不會無限期持續發射。',
},

'zh-CN': {
  ssb_title: 'SSB 语音',
  ssb_intro: '除了数字模式之外，FT8TW 也能作为简易的按住通话（PTT）语音界面，沿用与 FT8/FT4 相同的电台连接设置。',

  ssb_use_title: '按住通话操作',
  ssb_use_text:  '打开 SSB 分页，按住通话按钮即可发射：',
  ssb_use_list: `
    <ul>
      <li>按住按钮时，程序会采集手机麦克风音频、通过 CAT 指令触发 PTT，并将音频输出至已连接的 USB 声卡或蓝牙 SCO 音频。</li>
      <li>松开按钮（或触摸被中断）会立即停止发射并释放 PTT。</li>
      <li>USB 音频 PTT 已完成实机验证；蓝牙 SCO 音频 PTT 功能可运行，但实机测试较少，若遇到问题还请反馈。</li>
    </ul>`,

  ssb_safety_title: 'PTT 卡住防护',
  ssb_safety_text:  '通话按钮采用三重安全机制——松开、触摸取消、以及保底超时——确保触摸事件卡住或被中断时，电台不会无限期持续发射。',
},

'ja': {
  ssb_title: 'SSB 音声',
  ssb_intro: 'FT8TW はデジタルモードだけでなく、簡易的なプレストーク（PTT）音声インターフェースとしても動作します。FT8/FT4 用に設定済みの無線機接続をそのまま利用します。',

  ssb_use_title: 'プレストーク操作',
  ssb_use_text:  'SSB タブを開き、送話ボタンを押し続けると送信します:',
  ssb_use_list: `
    <ul>
      <li>ボタンを押している間、スマートフォンのマイクから音声を取り込み、CAT コマンドで PTT を制御し、接続された USB サウンドカードまたは Bluetooth SCO 経由で音声を出力します。</li>
      <li>ボタンを離す（またはタッチが中断される）と、直ちに送信を停止して PTT を解除します。</li>
      <li>USB 音声の PTT は実機で確認済みです。Bluetooth SCO 音声の PTT も動作しますが実機テストは少ないため、問題があればご報告ください。</li>
    </ul>`,

  ssb_safety_title: 'PTT 固着の防止',
  ssb_safety_text:  '送話ボタンには「離す」「タッチのキャンセル」「保険としてのタイムアウト」という三重の安全機構があり、タッチイベントが固まったり中断されたりしても、無線機が送信し続けることはありません。',
},

'ru': {
  ssb_title: 'Голос SSB',
  ssb_intro: 'Помимо цифровых видов связи, FT8TW может работать как простой голосовой интерфейс с кнопкой передачи, используя то же подключение к трансиверу, что настроено для FT8/FT4.',

  ssb_use_title: 'Работа с кнопкой передачи',
  ssb_use_text:  'Откройте вкладку SSB и удерживайте кнопку передачи:',
  ssb_use_list: `
    <ul>
      <li>Пока кнопка удерживается, приложение берёт звук с микрофона телефона, включает PTT командой CAT и выводит звук через подключённую USB-звуковую карту или Bluetooth SCO.</li>
      <li>Отпускание кнопки (или прерывание касания) немедленно прекращает передачу и отпускает PTT.</li>
      <li>Передача с USB-звуком проверена на практике. Передача через Bluetooth SCO работает, но испытана меньше — сообщайте о проблемах.</li>
    </ul>`,

  ssb_safety_title: 'Защита от залипания PTT',
  ssb_safety_text:  'Кнопка передачи защищена тройным механизмом — отпускание, отмена касания и страховочный тайм-аут, — поэтому зависшее или прерванное касание не оставит трансивер в передаче навсегда.',
},

'pl': {
  ssb_title: 'Głos SSB',
  ssb_intro: 'Poza emisjami cyfrowymi FT8TW może działać jako prosty interfejs głosowy z przyciskiem nadawania, korzystając z tego samego połączenia z radiem, które skonfigurowano dla FT8/FT4.',

  ssb_use_title: 'Nadawanie przyciskiem',
  ssb_use_text:  'Otwórz zakładkę SSB i przytrzymaj przycisk nadawania:',
  ssb_use_list: `
    <ul>
      <li>Przytrzymanie przycisku pobiera dźwięk z mikrofonu telefonu, załącza PTT komendą CAT i kieruje dźwięk przez podłączoną kartę dźwiękową USB lub Bluetooth SCO.</li>
      <li>Zwolnienie przycisku (lub przerwanie dotyku) natychmiast kończy nadawanie i zwalnia PTT.</li>
      <li>Nadawanie z dźwiękiem USB zostało sprawdzone w praktyce. Wariant Bluetooth SCO działa, ale był mniej testowany — prosimy o zgłaszanie problemów.</li>
    </ul>`,

  ssb_safety_title: 'Zabezpieczenie przed zablokowanym PTT',
  ssb_safety_text:  'Przycisk nadawania ma potrójne zabezpieczenie — zwolnienie, anulowanie dotyku oraz awaryjny limit czasu — dzięki czemu zawieszone lub przerwane zdarzenie dotyku nie pozostawi radia w nadawaniu bez końca.',
},

'es': {
  ssb_title: 'Voz SSB',
  ssb_intro: 'Además de los modos digitales, FT8TW puede funcionar como una sencilla interfaz de voz con pulsar para hablar, usando la misma conexión con el equipo ya configurada para FT8/FT4.',

  ssb_use_title: 'Operación pulsar para hablar',
  ssb_use_text:  'Abre la pestaña SSB y mantén pulsado el botón de transmisión:',
  ssb_use_list: `
    <ul>
      <li>Al mantener el botón, la aplicación capta el audio del micrófono del teléfono, activa el PTT mediante comando CAT y envía el audio por la tarjeta de sonido USB conectada o por audio Bluetooth SCO.</li>
      <li>Al soltar el botón (o si se interrumpe el toque) la transmisión se detiene de inmediato y se libera el PTT.</li>
      <li>El PTT con audio USB está verificado en la práctica. El PTT con audio Bluetooth SCO funciona, pero se ha probado menos: informa de cualquier problema.</li>
    </ul>`,

  ssb_safety_title: 'Protección contra PTT bloqueado',
  ssb_safety_text:  'El botón de transmisión usa un triple mecanismo de seguridad —soltar, cancelación del toque y un tiempo límite de respaldo— para que un evento táctil bloqueado o interrumpido no deje el equipo transmitiendo indefinidamente.',
},

'el': {
  ssb_title: 'Φωνή SSB',
  ssb_intro: 'Πέρα από τους ψηφιακούς τρόπους λειτουργίας, το FT8TW μπορεί να λειτουργήσει και ως απλή φωνητική διεπαφή με πλήκτρο εκπομπής, χρησιμοποιώντας την ίδια σύνδεση πομποδέκτη που έχει ήδη ρυθμιστεί για FT8/FT4.',

  ssb_use_title: 'Λειτουργία με πλήκτρο εκπομπής',
  ssb_use_text:  'Ανοίξτε την καρτέλα SSB και κρατήστε πατημένο το πλήκτρο ομιλίας για εκπομπή:',
  ssb_use_list: `
    <ul>
      <li>Όσο κρατάτε το πλήκτρο, η εφαρμογή καταγράφει ήχο από το μικρόφωνο του τηλεφώνου, ενεργοποιεί το PTT μέσω εντολής CAT και στέλνει τον ήχο στη συνδεδεμένη κάρτα ήχου USB ή μέσω Bluetooth SCO.</li>
      <li>Η απελευθέρωση του πλήκτρου (ή η διακοπή της αφής) σταματά αμέσως την εκπομπή και απελευθερώνει το PTT.</li>
      <li>Το PTT με ήχο USB έχει επαληθευτεί στην πράξη. Το PTT με ήχο Bluetooth SCO λειτουργεί, αλλά έχει δοκιμαστεί λιγότερο — παρακαλούμε αναφέρετε τυχόν προβλήματα.</li>
    </ul>`,

  ssb_safety_title: 'Προστασία από κολλημένο PTT',
  ssb_safety_text:  'Το πλήκτρο ομιλίας διαθέτει τριπλό μηχανισμό ασφαλείας — απελευθέρωση, ακύρωση αφής και εφεδρικό χρονικό όριο — ώστε ένα κολλημένο ή διακοπτόμενο συμβάν αφής να μην αφήνει τον πομποδέκτη σε συνεχή εκπομπή.',
},

}; /* end PAGE_T */
