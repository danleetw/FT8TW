/* ── FT8TW User Manual – i18n: WSPR Beacon ───────────────────────── */

const PAGE_T = {

en: {
  wspr_title: 'WSPR Beacon',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) is a low-power beacon mode used to study radio propagation. FT8TW supports scheduled WSPR transmission, plus experimental WSPR decoding.',

  wspr_what_title: 'What WSPR Is',
  wspr_what_text:  'WSPR (pronounced "whisper") differs from FT8 and JS8 in one fundamental way: <strong>it is not for making contacts</strong>. It is a <strong>propagation probe</strong> — you send a very weak beacon in one direction only, and volunteer receiving stations around the world upload what they hear to a database. Looking that database up tells you where your signal reached, and when. Nobody answers you, and no contact is logged.',
  wspr_what_list: `
    <ul>
      <li><strong>It carries three things only</strong> — your callsign, a 4-character grid, and your transmit power in dBm. Nothing else.</li>
      <li><strong>Very slow, very narrow</strong> — one transmission takes 110.6 seconds in a bandwidth of about 6 Hz. The price is time; what it buys is decoding down to roughly <strong>−28 dB</strong>, some 7 dB below FT8.</li>
      <li><strong>Which is why the power can be tiny</strong> — a few hundred milliwatts around the world is routine for WSPR. High power rather defeats the point: the question being asked is how little power still gets through.</li>
      <li><strong>Transmissions run every 2 minutes</strong>, aligned to even UTC minutes, so the clock again has to be right.</li>
      <li><strong>Results are read on the web</strong> — look your callsign up under Database or Map at <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> to see who heard you, where, and at what signal-to-noise ratio.</li>
    </ul>`,

  wspr_quick_title: 'Quick Start: Putting Out Your First WSPR Beacon',
  wspr_quick_text:  'WSPR is simpler to operate than FT8 — set it up, arm it, then look the results up online.',
  wspr_quick_steps: `
    <ol>
      <li>In Settings → Basic Information, check that <strong>your callsign</strong> and <strong>your grid</strong> are both filled in (the grid needs at least 4 characters).</li>
      <li><strong>Turn the radio's power down.</strong> Minimum power over maximum distance is the whole point of WSPR; under 5 W is a common starting point.</li>
      <li>Open the <strong>WSPR</strong> tab from the main menu or the floating window.</li>
      <li>Choose the <strong>WSPR frequency</strong> — every band has its own WSPR sub-band; pick one from the list.</li>
      <li>Set the <strong>TX power (dBm)</strong>. <strong>Enter your actual output</strong>: this figure is encoded into the message and goes into a worldwide database, so a wrong value leads other people to wrong conclusions about propagation. (5 W = 37 dBm, 1 W = 30 dBm, 0.5 W = 27 dBm.)</li>
      <li>Turn on <strong>Enable WSPR scheduled transmit</strong>. The status changes to "scheduled", and at the next even UTC minute it transmits for 110.6 seconds.</li>
      <li>When the transmission finishes the <strong>schedule disarms itself</strong>. That is deliberate, to prevent unattended beaconing; arm it again for another one.</li>
      <li>A few minutes later, go to <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database and search for your callsign to see who received you.</li>
    </ol>`,
  wspr_quick_note: 'If nothing shows up, check three things first: that the phone\'s clock is accurate, that the radio really produced output (watch the power meter during transmission), and that the <strong>TX audio frequency falls inside the WSPR window</strong>. Remember too that when the schedule stops the radio <strong>stays on the WSPR frequency</strong> — change band yourself to get back to where you were.',

  wspr_tx_title: 'Beacon Transmission',
  wspr_tx_text:  'Open the WSPR tab to configure and arm a beacon schedule:',
  wspr_tx_list: `
    <ul>
      <li>The beacon transmits on every <strong>even UTC minute</strong>, for 110.6 seconds each time.</li>
      <li>Just before each scheduled transmission, the radio's frequency automatically switches to the WSPR sub-band. When the schedule stops, the radio stays on the WSPR frequency rather than reverting — switch back yourself when you want your previous band.</li>
      <li>Select TX power (dBm) to be encoded in the beacon message.</li>
      <li>The audio frequency can be set by hand, or you can enable <strong>random TX audio frequency</strong> so each transmission lands somewhere different in the WSPR window, reducing the chance of sitting on top of another beacon.</li>
      <li>The scheduler automatically disarms after a completed transmission and must be manually re-armed for the next one — this is intentional, to prevent unattended continuous beaconing.</li>
      <li>A countdown timer and a preview of the next scheduled message are shown on the WSPR tab.</li>
    </ul>`,

  wspr_callsign_title: 'Callsign Format and Compound Callsigns',
  wspr_callsign_text:  'A WSPR message carries only 50 bits, which puts strict limits on callsign format. A <strong>standard callsign</strong> — a digit in the 2nd or 3rd position, e.g. <code>BV6LC</code> or <code>M0ABC</code> — fits into a single message.',
  wspr_callsign_compound: 'A <strong>compound callsign</strong> (<code>SM/DF6PA</code>, <code>DF6PA/P</code>) does not fit the callsign field, and the protocol requires it to be sent as <strong>two alternating messages</strong>: one carrying the full callsign and power, the other a hash of the callsign plus a 6-character grid. FT8TW handles this for you — the transmit preview lists both messages and notes that they are sent alternately, one per transmission. Because a receiver needs both before it can reconstruct the full callsign, <strong>a compound callsign takes longer to appear on WSPRnet than a standard one</strong>.',

  wspr_rx_title: 'Decoding (Experimental)',
  wspr_rx_text:  'WSPR decoding is experimental and has two known limits: it decodes one signal at a time, and it does not compensate for receiver clock drift. For serious propagation monitoring, a dedicated WSPR decoder remains the better tool.',
},

'zh-TW': {
  wspr_title: 'WSPR 信標',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）是一種低功率信標模式，用於研究無線電傳播狀況。FT8TW 支援排程發射 WSPR 信標，並提供實驗性的 WSPR 解碼功能。',

  wspr_what_title: '什麼是 WSPR',
  wspr_what_text:  'WSPR（唸作 “whisper”）與 FT8、JS8 最大的不同是：<strong>它不是拿來通聯的</strong>。它是一套<strong>傳播探測工具</strong>——您單向發出一個極微弱的信標，全世界自願架設的接收站聽到之後，會自動把結果上傳到資料庫。您上網一查，就知道自己的訊號在什麼時候到了哪裡。沒有人會回應您，也不會產生通聯記錄。',
  wspr_what_list: `
    <ul>
      <li><strong>只送三樣東西</strong> — 您的呼號、4 碼網格、以及發射功率（dBm）。就這樣，沒有別的內容。</li>
      <li><strong>極慢、極窄</strong> — 一次發射要 110.6 秒，頻寬只有約 6 Hz。代價是慢，換來的是<strong>可解出到約 −28 dB</strong>，比 FT8 還要再低 7 dB。</li>
      <li><strong>因此功率可以很小</strong> — 幾百毫瓦繞地球是 WSPR 的日常。功率大反而失去意義：這是在測「最少要多少功率才傳得到」。</li>
      <li><strong>時序是每 2 分鐘一次</strong>，對齊偶數 UTC 分鐘，所以時間一樣要準。</li>
      <li><strong>結果在網路上看</strong> — 到 <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> 的 Database 或 Map 查自己的呼號，就會列出誰在哪裡、用多少訊雜比收到您。</li>
    </ul>`,

  wspr_quick_title: '快速上手：放出第一個 WSPR 信標',
  wspr_quick_text:  'WSPR 的操作比 FT8 單純——設定好按下去，然後上網看結果。',
  wspr_quick_steps: `
    <ol>
      <li>設置 → 基本資訊，確認<strong>我的呼號</strong>與<strong>我的位置</strong>都填好了（網格至少要 4 碼）。</li>
      <li><strong>把電台功率調低。</strong>WSPR 的重點就是用最小功率測距離，5 瓦以下是常見的起點。</li>
      <li>從主選單或浮動視窗開啟 <strong>WSPR</strong> 分頁。</li>
      <li>選 <strong>WSPR 頻率</strong>——每個波段都有專屬的 WSPR 子頻段，清單裡挑一個即可。</li>
      <li>設定<strong>發射功率 (dBm)</strong>。<strong>要填實際的輸出功率</strong>，因為這個數字會編進訊息、進入全球資料庫；填錯會讓別人算出錯誤的傳播結論。（5 瓦 = 37 dBm，1 瓦 = 30 dBm，0.5 瓦 = 27 dBm）</li>
      <li>打開<strong>啟用 WSPR 定時發射</strong>。狀態會變成「已排程」，等下一個偶數 UTC 分鐘就自動發射 110.6 秒。</li>
      <li>發射完成後<strong>排程會自動關閉</strong>，這是刻意的，避免無人看管持續發射。要再送一次就再打開一次。</li>
      <li>過幾分鐘到 <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database，把 Call 填上自己的呼號查詢，就會看到誰收到了您。</li>
    </ol>`,
  wspr_quick_note: '若查不到任何結果，先確認三件事：手機時間是否準確、電台是否真的有輸出（發射時看功率表），以及<strong>發射音頻是否落在 WSPR 頻窗內</strong>。另外要記得：排程停止後電台會<strong>留在 WSPR 頻率</strong>，要回原本的波段請自行切換。',

  wspr_tx_title: '信標發射',
  wspr_tx_text:  '開啟 WSPR 分頁即可設定並啟用信標排程：',
  wspr_tx_list: `
    <ul>
      <li>信標在每個<strong>偶數 UTC 分鐘</strong>發射一次，每次 110.6 秒。</li>
      <li>每次排程發射前，電台頻率會自動切到 WSPR 子頻段。排程停止後會留在 WSPR 頻率，不會自動切回原本的操作頻率——需要回原頻段時請自行切換。</li>
      <li>可選擇要編碼進信標訊息的發射功率（dBm）。</li>
      <li>發射音頻可以自己指定，也可以開啟<strong>自動亂數發射音頻</strong>，讓每次落在 WSPR 頻窗內的不同位置，減少與其他信標互相蓋台的機會。</li>
      <li>排程在完成一次發射後會自動停用，須手動重新啟用才會進行下一次發射——這是刻意設計，避免無人看管下持續發射信標。</li>
      <li>WSPR 分頁會顯示倒數計時，以及下一則排程訊息的預覽。</li>
    </ul>`,

  wspr_callsign_title: '呼號格式與複合呼號',
  wspr_callsign_text:  'WSPR 的訊息只有 50 個位元，因此對呼號格式有嚴格限制。<strong>標準呼號</strong>（第 2 或第 3 碼為數字，例如 <code>BV6LC</code>、<code>M0ABC</code>）可以直接放進一則訊息。',
  wspr_callsign_compound: '<strong>複合呼號</strong>（例如 <code>SM/DF6PA</code>、<code>DF6PA/P</code>）塞不進呼號欄位，協定規定要用<strong>兩則訊息輪流表達</strong>：一則送完整呼號與功率，另一則送呼號的雜湊值加上 6 碼網格。FT8TW 會自動處理這件事——發射預覽會同時列出這兩則，並註明「複合呼號：以上兩則輪流發射，每次送一則」。接收端要收到兩則之後才能把完整呼號還原出來，因此<strong>複合呼號比標準呼號需要更長的時間才會出現在 WSPRnet 上</strong>。',

  wspr_rx_title: '解碼（實驗性）',
  wspr_rx_text:  'WSPR 解碼屬於實驗性功能，有兩項已知限制：一次僅能解出單一訊號，且不補償接收端的時鐘漂移。若需嚴謹的傳播監測，專門的 WSPR 解碼軟體仍是較合適的工具。',
},

'zh-CN': {
  wspr_title: 'WSPR 信标',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）是一种低功率信标模式，用于研究无线电传播状况。FT8TW 支持定时发射 WSPR 信标，并提供实验性的 WSPR 解码功能。',

  wspr_tx_title: '信标发射',
  wspr_tx_text:  '打开 WSPR 分页即可设置并启用信标计划：',
  wspr_tx_list: `
    <ul>
      <li>需使用标准格式呼号（第 2 或第 3 位为数字）。</li>
      <li>每次计划发射前，电台频率会自动切到 WSPR 子频段。计划停止后会留在 WSPR 频率，不会自动切回原本的操作频率——需要回原频段时请自行切换。</li>
      <li>可选择要编码进信标消息的发射功率（dBm）。</li>
      <li>计划在完成一次发射后会自动停用，须手动重新启用才会进行下一次发射——这是刻意设计，避免无人看管下持续发射信标。</li>
      <li>WSPR 分页会显示倒计时，以及下一条计划消息的预览。</li>
    </ul>`,

  wspr_rx_title: '解码（实验性）',
  wspr_rx_text:  'WSPR 解码属于实验性功能，有两项已知限制：一次仅能解出单一信号，且不补偿接收端的时钟漂移。若需严谨的传播监测，专门的 WSPR 解码软件仍是更合适的工具。',
},

'ja': {
  wspr_title: 'WSPR ビーコン',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）は電波伝搬の研究に使われる微弱電力のビーコンモードです。FT8TW はスケジュールによる WSPR 送信に対応し、実験的な WSPR デコード機能も備えています。',

  wspr_tx_title: 'ビーコン送信',
  wspr_tx_text:  'WSPR タブを開くと、ビーコンのスケジュールを設定して待機状態にできます:',
  wspr_tx_list: `
    <ul>
      <li>標準形式のコールサイン（2 文字目または 3 文字目が数字）が必要です。</li>
      <li>各送信の直前に無線機の周波数が自動的に WSPR のサブバンドへ切り替わります。スケジュールを止めたあとは WSPR の周波数に留まり、元の運用周波数には戻りません。必要に応じてご自身で戻してください。</li>
      <li>ビーコン電文に載せる送信出力（dBm）を選択できます。</li>
      <li>1 回送信するとスケジュールは自動的に解除され、次回は手動で再設定する必要があります。無人での連続送信を防ぐための意図的な仕様です。</li>
      <li>WSPR タブにはカウントダウンと、次に送信される電文のプレビューが表示されます。</li>
    </ul>`,

  wspr_rx_title: 'デコード（実験的）',
  wspr_rx_text:  'WSPR のデコードは実験的な機能で、既知の制限が 2 つあります。一度に 1 信号しかデコードできず、受信側のクロックドリフトを補正しません。本格的な伝搬モニターには専用の WSPR デコーダーのほうが適しています。',
},

'ru': {
  wspr_title: 'Маяк WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) — маячный режим малой мощности для изучения прохождения радиоволн. FT8TW поддерживает передачу WSPR по расписанию и экспериментальное декодирование WSPR.',

  wspr_tx_title: 'Передача маяка',
  wspr_tx_text:  'Откройте вкладку WSPR, чтобы настроить и взвести расписание маяка:',
  wspr_tx_list: `
    <ul>
      <li>Требуется позывной стандартного формата (цифра на 2-й или 3-й позиции).</li>
      <li>Непосредственно перед каждой запланированной передачей частота трансивера автоматически переключается на участок WSPR. После остановки расписания трансивер остаётся на частоте WSPR и не возвращается — при необходимости переключите его сами.</li>
      <li>Выберите мощность передачи (дБм), которая будет закодирована в сообщении маяка.</li>
      <li>После состоявшейся передачи расписание автоматически снимается и для следующей передачи его нужно взвести вручную — так сделано намеренно, чтобы исключить непрерывную работу маяка без присмотра.</li>
      <li>На вкладке WSPR показаны обратный отсчёт и предпросмотр следующего сообщения.</li>
    </ul>`,

  wspr_rx_title: 'Декодирование (экспериментально)',
  wspr_rx_text:  'Декодирование WSPR экспериментальное и имеет два известных ограничения: за раз декодируется только один сигнал, и уход часов приёмника не компенсируется. Для серьёзного наблюдения за прохождением специализированный декодер WSPR остаётся более подходящим инструментом.',
},

'pl': {
  wspr_title: 'Latarnia WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) to tryb latarni małej mocy służący do badania propagacji. FT8TW obsługuje nadawanie WSPR według harmonogramu oraz eksperymentalne dekodowanie WSPR.',

  wspr_tx_title: 'Nadawanie latarni',
  wspr_tx_text:  'Otwórz zakładkę WSPR, aby skonfigurować i uzbroić harmonogram latarni:',
  wspr_tx_list: `
    <ul>
      <li>Wymagany jest znak wywoławczy w formacie standardowym (cyfra na 2. lub 3. pozycji).</li>
      <li>Tuż przed każdym zaplanowanym nadawaniem częstotliwość radia automatycznie przełącza się na podpasmo WSPR. Po zatrzymaniu harmonogramu radio pozostaje na częstotliwości WSPR i nie wraca samo — w razie potrzeby przestrój je ręcznie.</li>
      <li>Wybierz moc nadawania (dBm), która zostanie zakodowana w wiadomości latarni.</li>
      <li>Po wykonanym nadawaniu harmonogram automatycznie się rozbraja i przed kolejnym trzeba go uzbroić ręcznie — to celowe zabezpieczenie przed ciągłym nadawaniem bez nadzoru.</li>
      <li>Zakładka WSPR pokazuje odliczanie oraz podgląd następnej zaplanowanej wiadomości.</li>
    </ul>`,

  wspr_rx_title: 'Dekodowanie (eksperymentalne)',
  wspr_rx_text:  'Dekodowanie WSPR jest eksperymentalne i ma dwa znane ograniczenia: dekoduje jeden sygnał naraz i nie kompensuje dryfu zegara odbiornika. Do poważnego monitorowania propagacji lepszym narzędziem pozostaje dedykowany dekoder WSPR.',
},

'es': {
  wspr_title: 'Baliza WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) es un modo de baliza de baja potencia usado para estudiar la propagación. FT8TW admite la transmisión programada de WSPR, además de una decodificación WSPR experimental.',

  wspr_tx_title: 'Transmisión de la baliza',
  wspr_tx_text:  'Abre la pestaña WSPR para configurar y armar una programación de baliza:',
  wspr_tx_list: `
    <ul>
      <li>Requiere un indicativo de formato estándar (un dígito en la 2.ª o 3.ª posición).</li>
      <li>Justo antes de cada transmisión programada, la frecuencia del equipo cambia automáticamente a la subbanda WSPR. Al detener la programación, el equipo se queda en la frecuencia WSPR y no vuelve solo: cámbialo tú cuando quieras tu banda anterior.</li>
      <li>Selecciona la potencia de transmisión (dBm) que se codificará en el mensaje de la baliza.</li>
      <li>Tras completar una transmisión, la programación se desarma automáticamente y hay que volver a armarla a mano para la siguiente: es intencionado, para evitar balizas continuas sin vigilancia.</li>
      <li>La pestaña WSPR muestra una cuenta atrás y una vista previa del siguiente mensaje programado.</li>
    </ul>`,

  wspr_rx_title: 'Decodificación (experimental)',
  wspr_rx_text:  'La decodificación WSPR es experimental y tiene dos límites conocidos: decodifica una sola señal a la vez y no compensa la deriva del reloj del receptor. Para una monitorización seria de la propagación, un decodificador WSPR dedicado sigue siendo la mejor herramienta.',
},

'el': {
  wspr_title: 'Φάρος WSPR',
  wspr_intro: 'Το WSPR (Weak Signal Propagation Reporter) είναι λειτουργία φάρου χαμηλής ισχύος για τη μελέτη της διάδοσης. Το FT8TW υποστηρίζει προγραμματισμένη εκπομπή WSPR, καθώς και πειραματική αποκωδικοποίηση WSPR.',

  wspr_tx_title: 'Εκπομπή φάρου',
  wspr_tx_text:  'Ανοίξτε την καρτέλα WSPR για να ρυθμίσετε και να οπλίσετε ένα πρόγραμμα φάρου:',
  wspr_tx_list: `
    <ul>
      <li>Απαιτείται διακριτικό τυπικής μορφής (ψηφίο στη 2η ή 3η θέση).</li>
      <li>Λίγο πριν από κάθε προγραμματισμένη εκπομπή, η συχνότητα αλλάζει αυτόματα στην υπομπάντα WSPR. Όταν σταματήσει το πρόγραμμα, ο πομποδέκτης παραμένει στη συχνότητα WSPR και δεν επιστρέφει — αλλάξτε την μόνοι σας όταν χρειαστεί.</li>
      <li>Επιλέξτε την ισχύ εκπομπής (dBm) που θα κωδικοποιηθεί στο μήνυμα του φάρου.</li>
      <li>Μετά από μια ολοκληρωμένη εκπομπή το πρόγραμμα αφοπλίζεται αυτόματα και πρέπει να οπλιστεί ξανά χειροκίνητα — είναι σκόπιμο, ώστε να αποφεύγεται η συνεχής εκπομπή φάρου χωρίς επίβλεψη.</li>
      <li>Η καρτέλα WSPR εμφανίζει αντίστροφη μέτρηση και προεπισκόπηση του επόμενου προγραμματισμένου μηνύματος.</li>
    </ul>`,

  wspr_rx_title: 'Αποκωδικοποίηση (πειραματική)',
  wspr_rx_text:  'Η αποκωδικοποίηση WSPR είναι πειραματική και έχει δύο γνωστά όρια: αποκωδικοποιεί ένα σήμα κάθε φορά και δεν αντισταθμίζει την ολίσθηση του ρολογιού του δέκτη. Για σοβαρή παρακολούθηση διάδοσης, ένας ειδικός αποκωδικοποιητής WSPR παραμένει το καταλληλότερο εργαλείο.',
},

}; /* end PAGE_T */
