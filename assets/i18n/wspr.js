/* ── FT8TW User Manual – i18n: WSPR Beacon ───────────────────────── */

const PAGE_T = {

en: {
  wspr_title: 'WSPR Beacon',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) is a low-power beacon mode used to study radio propagation. FT8TW supports scheduled WSPR transmission, plus experimental WSPR decoding.',

  wspr_tx_title: 'Beacon Transmission',
  wspr_tx_text:  'Open the WSPR tab to configure and arm a beacon schedule:',
  wspr_tx_list: `
    <ul>
      <li>Requires a standard-format callsign (a digit in the 2nd or 3rd position).</li>
      <li>Just before each scheduled transmission, the radio's frequency automatically switches to the WSPR sub-band, then reverts to your normal operating frequency afterward.</li>
      <li>Select TX power (dBm) to be encoded in the beacon message.</li>
      <li>The scheduler automatically disarms after a completed transmission and must be manually re-armed for the next one — this is intentional, to prevent unattended continuous beaconing.</li>
      <li>A countdown timer and a preview of the next scheduled message are shown on the WSPR tab.</li>
    </ul>`,

  wspr_rx_title: 'Decoding (Experimental)',
  wspr_rx_text:  'WSPR decoding is provided on a best-effort basis and is considered experimental: it decodes a single signal at a time and does not compensate for receiver clock drift. For serious propagation monitoring, a dedicated WSPR decoder is still recommended.',
},

'zh-TW': {
  wspr_title: 'WSPR 信標',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）是一種低功率信標模式，用於研究無線電傳播狀況。FT8TW 支援排程發射 WSPR 信標，並提供實驗性的 WSPR 解碼功能。',

  wspr_tx_title: '信標發射',
  wspr_tx_text:  '開啟 WSPR 分頁即可設定並啟用信標排程：',
  wspr_tx_list: `
    <ul>
      <li>需使用標準格式呼號（第 2 或第 3 碼為數字）。</li>
      <li>每次排程發射前，電台頻率會自動切到 WSPR 子頻段，發射結束後自動切回原本的操作頻率。</li>
      <li>可選擇要編碼進信標訊息的發射功率（dBm）。</li>
      <li>排程在完成一次發射後會自動停用，須手動重新啟用才會進行下一次發射——這是刻意設計，避免無人看管下持續發射信標。</li>
      <li>WSPR 分頁會顯示倒數計時，以及下一則排程訊息的預覽。</li>
    </ul>`,

  wspr_rx_title: '解碼（實驗性）',
  wspr_rx_text:  'WSPR 解碼功能屬於盡力而為的實驗性功能：一次僅能解出單一訊號，且未補償接收端時鐘漂移。若需嚴謹的傳播監測，仍建議使用專門的 WSPR 解碼軟體。',
},

'zh-CN': {
  wspr_title: 'WSPR 信标',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）是一种低功率信标模式，用于研究无线电传播状况。FT8TW 支持定时发射 WSPR 信标，并提供实验性的 WSPR 解码功能。',

  wspr_tx_title: '信标发射',
  wspr_tx_text:  '打开 WSPR 分页即可设置并启用信标计划：',
  wspr_tx_list: `
    <ul>
      <li>需使用标准格式呼号（第 2 或第 3 位为数字）。</li>
      <li>每次计划发射前，电台频率会自动切到 WSPR 子频段，发射结束后自动切回原本的操作频率。</li>
      <li>可选择要编码进信标消息的发射功率（dBm）。</li>
      <li>计划在完成一次发射后会自动停用，须手动重新启用才会进行下一次发射——这是刻意设计，避免无人看管下持续发射信标。</li>
      <li>WSPR 分页会显示倒计时，以及下一条计划消息的预览。</li>
    </ul>`,

  wspr_rx_title: '解码（实验性）',
  wspr_rx_text:  'WSPR 解码功能属于尽力而为的实验性功能：一次仅能解出单一信号，且未补偿接收端时钟漂移。若需严谨的传播监测，仍建议使用专门的 WSPR 解码软件。',
},

'ja': {
  wspr_title: 'WSPR ビーコン',
  wspr_intro: 'WSPR（Weak Signal Propagation Reporter）は電波伝搬の研究に使われる微弱電力のビーコンモードです。FT8TW はスケジュールによる WSPR 送信に対応し、実験的な WSPR デコード機能も備えています。',

  wspr_tx_title: 'ビーコン送信',
  wspr_tx_text:  'WSPR タブを開くと、ビーコンのスケジュールを設定して待機状態にできます:',
  wspr_tx_list: `
    <ul>
      <li>標準形式のコールサイン（2 文字目または 3 文字目が数字）が必要です。</li>
      <li>各送信の直前に無線機の周波数が自動的に WSPR のサブバンドへ切り替わり、送信後は元の運用周波数へ戻ります。</li>
      <li>ビーコン電文に載せる送信出力（dBm）を選択できます。</li>
      <li>1 回送信するとスケジュールは自動的に解除され、次回は手動で再設定する必要があります。無人での連続送信を防ぐための意図的な仕様です。</li>
      <li>WSPR タブにはカウントダウンと、次に送信される電文のプレビューが表示されます。</li>
    </ul>`,

  wspr_rx_title: 'デコード（実験的）',
  wspr_rx_text:  'WSPR のデコードはベストエフォートの実験的機能です。一度に 1 信号しかデコードできず、受信側のクロックドリフトも補正しません。本格的な伝搬モニターには専用の WSPR デコーダーの使用をおすすめします。',
},

'ru': {
  wspr_title: 'Маяк WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) — маячный режим малой мощности для изучения прохождения радиоволн. FT8TW поддерживает передачу WSPR по расписанию и экспериментальное декодирование WSPR.',

  wspr_tx_title: 'Передача маяка',
  wspr_tx_text:  'Откройте вкладку WSPR, чтобы настроить и взвести расписание маяка:',
  wspr_tx_list: `
    <ul>
      <li>Требуется позывной стандартного формата (цифра на 2-й или 3-й позиции).</li>
      <li>Непосредственно перед каждой запланированной передачей частота трансивера автоматически переключается на участок WSPR, а затем возвращается к вашей рабочей частоте.</li>
      <li>Выберите мощность передачи (дБм), которая будет закодирована в сообщении маяка.</li>
      <li>После состоявшейся передачи расписание автоматически снимается и для следующей передачи его нужно взвести вручную — так сделано намеренно, чтобы исключить непрерывную работу маяка без присмотра.</li>
      <li>На вкладке WSPR показаны обратный отсчёт и предпросмотр следующего сообщения.</li>
    </ul>`,

  wspr_rx_title: 'Декодирование (экспериментально)',
  wspr_rx_text:  'Декодирование WSPR работает по мере возможностей и считается экспериментальным: за раз декодируется только один сигнал, уход частоты приёмника не компенсируется. Для серьёзного наблюдения за прохождением по-прежнему рекомендуется специализированный декодер WSPR.',
},

'pl': {
  wspr_title: 'Latarnia WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) to tryb latarni małej mocy służący do badania propagacji. FT8TW obsługuje nadawanie WSPR według harmonogramu oraz eksperymentalne dekodowanie WSPR.',

  wspr_tx_title: 'Nadawanie latarni',
  wspr_tx_text:  'Otwórz zakładkę WSPR, aby skonfigurować i uzbroić harmonogram latarni:',
  wspr_tx_list: `
    <ul>
      <li>Wymagany jest znak wywoławczy w formacie standardowym (cyfra na 2. lub 3. pozycji).</li>
      <li>Tuż przed każdym zaplanowanym nadawaniem częstotliwość radia automatycznie przełącza się na podpasmo WSPR, a po nadaniu wraca do zwykłej częstotliwości pracy.</li>
      <li>Wybierz moc nadawania (dBm), która zostanie zakodowana w wiadomości latarni.</li>
      <li>Po wykonanym nadawaniu harmonogram automatycznie się rozbraja i przed kolejnym trzeba go uzbroić ręcznie — to celowe zabezpieczenie przed ciągłym nadawaniem bez nadzoru.</li>
      <li>Zakładka WSPR pokazuje odliczanie oraz podgląd następnej zaplanowanej wiadomości.</li>
    </ul>`,

  wspr_rx_title: 'Dekodowanie (eksperymentalne)',
  wspr_rx_text:  'Dekodowanie WSPR działa w miarę możliwości i jest uznawane za eksperymentalne: dekoduje jeden sygnał naraz i nie kompensuje dryfu zegara odbiornika. Do poważnego monitorowania propagacji nadal zalecany jest dedykowany dekoder WSPR.',
},

'es': {
  wspr_title: 'Baliza WSPR',
  wspr_intro: 'WSPR (Weak Signal Propagation Reporter) es un modo de baliza de baja potencia usado para estudiar la propagación. FT8TW admite la transmisión programada de WSPR, además de una decodificación WSPR experimental.',

  wspr_tx_title: 'Transmisión de la baliza',
  wspr_tx_text:  'Abre la pestaña WSPR para configurar y armar una programación de baliza:',
  wspr_tx_list: `
    <ul>
      <li>Requiere un indicativo de formato estándar (un dígito en la 2.ª o 3.ª posición).</li>
      <li>Justo antes de cada transmisión programada, la frecuencia del equipo cambia automáticamente a la subbanda WSPR y después vuelve a tu frecuencia de trabajo habitual.</li>
      <li>Selecciona la potencia de transmisión (dBm) que se codificará en el mensaje de la baliza.</li>
      <li>Tras completar una transmisión, la programación se desarma automáticamente y hay que volver a armarla a mano para la siguiente: es intencionado, para evitar balizas continuas sin vigilancia.</li>
      <li>La pestaña WSPR muestra una cuenta atrás y una vista previa del siguiente mensaje programado.</li>
    </ul>`,

  wspr_rx_title: 'Decodificación (experimental)',
  wspr_rx_text:  'La decodificación WSPR se ofrece en la medida de lo posible y se considera experimental: decodifica una sola señal a la vez y no compensa la deriva del reloj del receptor. Para una monitorización seria de la propagación sigue siendo recomendable un decodificador WSPR dedicado.',
},

'el': {
  wspr_title: 'Φάρος WSPR',
  wspr_intro: 'Το WSPR (Weak Signal Propagation Reporter) είναι λειτουργία φάρου χαμηλής ισχύος για τη μελέτη της διάδοσης. Το FT8TW υποστηρίζει προγραμματισμένη εκπομπή WSPR, καθώς και πειραματική αποκωδικοποίηση WSPR.',

  wspr_tx_title: 'Εκπομπή φάρου',
  wspr_tx_text:  'Ανοίξτε την καρτέλα WSPR για να ρυθμίσετε και να οπλίσετε ένα πρόγραμμα φάρου:',
  wspr_tx_list: `
    <ul>
      <li>Απαιτείται διακριτικό τυπικής μορφής (ψηφίο στη 2η ή 3η θέση).</li>
      <li>Λίγο πριν από κάθε προγραμματισμένη εκπομπή, η συχνότητα του πομποδέκτη αλλάζει αυτόματα στην υπομπάντα WSPR και στη συνέχεια επιστρέφει στη συνήθη συχνότητα εργασίας σας.</li>
      <li>Επιλέξτε την ισχύ εκπομπής (dBm) που θα κωδικοποιηθεί στο μήνυμα του φάρου.</li>
      <li>Μετά από μια ολοκληρωμένη εκπομπή το πρόγραμμα αφοπλίζεται αυτόματα και πρέπει να οπλιστεί ξανά χειροκίνητα — είναι σκόπιμο, ώστε να αποφεύγεται η συνεχής εκπομπή φάρου χωρίς επίβλεψη.</li>
      <li>Η καρτέλα WSPR εμφανίζει αντίστροφη μέτρηση και προεπισκόπηση του επόμενου προγραμματισμένου μηνύματος.</li>
    </ul>`,

  wspr_rx_title: 'Αποκωδικοποίηση (πειραματική)',
  wspr_rx_text:  'Η αποκωδικοποίηση WSPR παρέχεται στο μέτρο του δυνατού και θεωρείται πειραματική: αποκωδικοποιεί ένα σήμα κάθε φορά και δεν αντισταθμίζει την ολίσθηση του ρολογιού του δέκτη. Για σοβαρή παρακολούθηση διάδοσης εξακολουθεί να συνιστάται ειδικός αποκωδικοποιητής WSPR.',
},

}; /* end PAGE_T */
