/* ── FT8TW User Manual – i18n: SSB Voice ─────────────────────────── */

const PAGE_T = {

en: {
  ssb_title: 'SSB Voice',
  ssb_intro: 'Beyond digital modes, FT8TW can act as a simple radio microphone and monitor — the screen is called <em>Radio Tool</em> in the app. It reuses the radio connection already configured for FT8/FT4 and covers three things: push-to-talk voice, listening to the radio through the phone, and keying a carrier to tune an antenna.',

  ssb_use_title: 'Push-to-Talk Operation',
  ssb_use_text:  'Open the SSB tab and press and hold the talk button to transmit. The button reads <strong>HOLD TO TALK</strong>, and changes to <strong>TRANSMITTING</strong> while keyed:',
  ssb_use_list: `
    <ul>
      <li>Holding the button captures audio from the phone's microphone, asserts PTT via CAT command, and routes audio out through the connected USB sound card or Bluetooth SCO audio.</li>
      <li>Releasing the button (or if the touch is interrupted) immediately stops transmission and releases PTT.</li>
      <li>A level bar shows how loud the microphone is picking you up, so you can tell whether you are being heard before wondering why nobody answers.</li>
      <li><strong>Gain</strong> and <strong>App Volume</strong> sliders set how hard the microphone signal is driven and how loud the app plays; the current audio source is shown above them, so it is clear whether the phone microphone or a headset is in use.</li>
      <li>The radio's frequency and SWR appear at the top when the connection reports them.</li>
      <li>USB audio PTT is field-verified. Bluetooth SCO audio PTT is functional but has seen less field testing — please report any issues.</li>
    </ul>`,

  ssb_disabled_title: 'When the Talk Button Is Unavailable',
  ssb_disabled_text:  'The button refuses to key rather than transmitting into a setup that cannot carry it, and says which condition is in the way:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Radio not connected</strong> — no CAT connection to assert PTT with.</li>
      <li><strong>Not available in VOX mode</strong> — VOX has no PTT line to control; switch the PTT setting to CAT, RTS or DTR.</li>
      <li><strong>USB cable or Bluetooth connection only</strong> — network-connected radios are not supported here yet.</li>
      <li><strong>FT8 transmit in progress</strong> — voice would collide with the digital transmission, so it waits.</li>
    </ul>`,

  ssb_monitor_title: 'Radio Monitor',
  ssb_monitor_text:  'The <strong>Radio Monitor</strong> switch plays the received audio from the radio through the phone, so you can listen on the phone\'s earpiece or headset instead of the radio\'s speaker. Useful for keeping an ear on the frequency without filling the room with noise.',

  ssb_tune_title: 'Tuning an Antenna (TUNE)',
  ssb_tune_text:  'The <strong>Tune</strong> section keys the radio and sends a continuous tone, which is what an antenna tuner or an SWR reading needs. Set the duration and the tune volume, then press <strong>TUNE</strong>; the button becomes <strong>STOP</strong> with a countdown, and transmission ends by itself when the timer runs out.',
  ssb_tune_warn: '<strong>Turn your radio\'s power down first.</strong> This transmits a continuous carrier — full power into a mismatched antenna is exactly the situation that damages a finals stage.',
  ssb_tune_list: `
    <ul>
      <li>Transmission stops on its own at the end of the countdown, so a forgotten tune does not sit on the air.</li>
      <li>If the SWR reading climbs too high, tuning is aborted immediately and the reason is shown.</li>
      <li>An independent watchdog releases PTT by force if anything else fails to stop the transmission.</li>
    </ul>`,

  ssb_safety_title: 'PTT-Stuck Protection',
  ssb_safety_text:  'The talk button uses a triple safety mechanism — release, touch-cancel, and a backstop timeout — so that a stuck or interrupted touch event cannot leave the radio transmitting indefinitely.',
},

'zh-TW': {
  ssb_title: 'SSB 語音',
  ssb_intro: '除了數位模式之外，FT8TW 也能當成簡易的電台麥克風與監聽器——這個畫面在 App 中名為<em>電台工具</em>。它沿用與 FT8/FT4 相同的電台連線設定，涵蓋三件事：按住通話語音、透過手機監聽電台，以及發射載波供天線調諧使用。',

  ssb_use_title: '按住通話操作',
  ssb_use_text:  '開啟 SSB 分頁，按住通話按鈕即可發射。按鈕平時顯示 <strong>HOLD TO TALK</strong>，發射中會變為 <strong>TRANSMITTING</strong>：',
  ssb_use_list: `
    <ul>
      <li>按住按鈕時，程式會擷取手機麥克風音訊、透過 CAT 指令觸發 PTT，並將音訊輸出至已連接的 USB 音效卡或藍牙 SCO 音訊。</li>
      <li>放開按鈕（或觸控被中斷）會立即停止發射並釋放 PTT。</li>
      <li>畫面上的電平條顯示麥克風收到您的音量大小，可以先確認自己有沒有被收到，而不是等到沒人回應才開始猜。</li>
      <li><strong>增益</strong>與 <strong>App 音量</strong>兩支滑桿分別調整麥克風訊號的推動程度與程式播放音量；上方會顯示目前的音訊來源，一眼就知道用的是手機麥克風還是耳機。</li>
      <li>連線有回報時，電台的頻率與駐波比（SWR）會顯示在上方。</li>
      <li>USB 音訊 PTT 已完成實機驗證；藍牙 SCO 音訊 PTT 功能可運作，但實機測試較少，若遇到問題還請回報。</li>
    </ul>`,

  ssb_disabled_title: '通話按鈕無法按下時',
  ssb_disabled_text:  '當接線條件無法支撐發射時，按鈕會拒絕觸發而不是硬送出去，並直接說明是哪一項擋住了：',
  ssb_disabled_list: `
    <ul>
      <li><strong>電台未連接</strong> — 沒有 CAT 連線可以觸發 PTT。</li>
      <li><strong>VOX 模式不支援</strong> — VOX 沒有可控制的 PTT 線路，請把 PTT 控制改為 CAT、RTS 或 DTR。</li>
      <li><strong>僅限 USB 或藍牙連線</strong> — 網路連線的電台目前尚未支援此功能。</li>
      <li><strong>FT8 發射中</strong> — 語音會與數位發射相撞，因此會先等待。</li>
    </ul>`,

  ssb_monitor_title: '電台監聽',
  ssb_monitor_text:  '<strong>電台監聽</strong>開關會把電台收到的音訊透過手機播放，讓您用手機聽筒或耳機收聽，不必開電台喇叭。想留意頻率上的動靜又不想吵到整個房間時很好用。',

  ssb_tune_title: '天線調諧（TUNE）',
  ssb_tune_text:  '<strong>調諧</strong>區塊會按下 PTT 並送出連續單音，正是天線調諧器或量測駐波比所需要的訊號。設定持續時間與調諧音量後按 <strong>TUNE</strong>，按鈕會變成帶倒數的 <strong>STOP</strong>，計時結束就自動停止發射。',
  ssb_tune_warn: '<strong>請先把電台功率調低。</strong>這會送出連續載波——用全功率打進阻抗不匹配的天線，正是燒毀末級的典型情況。',
  ssb_tune_list: `
    <ul>
      <li>倒數結束會自動停止發射，忘了關也不會一直佔著頻率。</li>
      <li>駐波比若攀升過高，調諧會立即中止並顯示原因。</li>
      <li>另有獨立的看門狗，萬一其他機制都沒能停下發射，它會強制放開 PTT。</li>
    </ul>`,

  ssb_safety_title: 'PTT 卡住防護',
  ssb_safety_text:  '通話按鈕採用三重安全機制——放開、觸控取消、以及保底逾時——確保觸控事件卡住或被中斷時，電台不會無限期持續發射。',
},

'zh-CN': {
  ssb_title: 'SSB 语音',
  ssb_intro: '除了数字模式之外，FT8TW 也能当成简易的电台麦克风与监听器——这个界面在 App 中名为<em>电台工具</em>。它沿用与 FT8/FT4 相同的电台连接设置，涵盖三件事：按住通话语音、通过手机监听电台，以及发射载波供天线调谐使用。',

  ssb_use_title: '按住通话操作',
  ssb_use_text:  '打开 SSB 分页，按住通话按钮即可发射。按钮平时显示 <strong>HOLD TO TALK</strong>，发射中会变为 <strong>TRANSMITTING</strong>：',
  ssb_use_list: `
    <ul>
      <li>按住按钮时，程序会采集手机麦克风音频、通过 CAT 指令触发 PTT，并将音频输出至已连接的 USB 声卡或蓝牙 SCO 音频。</li>
      <li>松开按钮（或触摸被中断）会立即停止发射并释放 PTT。</li>
      <li>界面上的电平条显示麦克风收到您的音量大小，可以先确认自己有没有被收到，而不是等到没人回应才开始猜。</li>
      <li><strong>增益</strong>与 <strong>App 音量</strong>两支滑块分别调整麦克风信号的推动程度与程序播放音量；上方会显示当前的音频来源，一眼就知道用的是手机麦克风还是耳机。</li>
      <li>连接有回报时，电台的频率与驻波比（SWR）会显示在上方。</li>
      <li>USB 音频 PTT 已完成实机验证；蓝牙 SCO 音频 PTT 功能可运行，但实机测试较少，若遇到问题还请反馈。</li>
    </ul>`,

  ssb_disabled_title: '通话按钮无法按下时',
  ssb_disabled_text:  '当接线条件无法支撑发射时，按钮会拒绝触发而不是硬送出去，并直接说明是哪一项挡住了：',
  ssb_disabled_list: `
    <ul>
      <li><strong>电台未连接</strong> — 没有 CAT 连接可以触发 PTT。</li>
      <li><strong>VOX 模式不支持</strong> — VOX 没有可控制的 PTT 线路，请把 PTT 控制改为 CAT、RTS 或 DTR。</li>
      <li><strong>仅限 USB 或蓝牙连接</strong> — 网络连接的电台目前尚未支持此功能。</li>
      <li><strong>FT8 发射中</strong> — 语音会与数字发射相撞，因此会先等待。</li>
    </ul>`,

  ssb_monitor_title: '电台监听',
  ssb_monitor_text:  '<strong>电台监听</strong>开关会把电台收到的音频通过手机播放，让您用手机听筒或耳机收听，不必开电台扬声器。想留意频率上的动静又不想吵到整个房间时很好用。',

  ssb_tune_title: '天线调谐（TUNE）',
  ssb_tune_text:  '<strong>调谐</strong>区块会按下 PTT 并送出连续单音，正是天线调谐器或测量驻波比所需要的信号。设置持续时间与调谐音量后按 <strong>TUNE</strong>，按钮会变成带倒计时的 <strong>STOP</strong>，计时结束就自动停止发射。',
  ssb_tune_warn: '<strong>请先把电台功率调低。</strong>这会送出连续载波——用全功率打进阻抗不匹配的天线，正是烧毁末级的典型情况。',
  ssb_tune_list: `
    <ul>
      <li>倒计时结束会自动停止发射，忘了关也不会一直占着频率。</li>
      <li>驻波比若攀升过高，调谐会立即中止并显示原因。</li>
      <li>另有独立的看门狗，万一其他机制都没能停下发射，它会强制放开 PTT。</li>
    </ul>`,

  ssb_safety_title: 'PTT 卡住防护',
  ssb_safety_text:  '通话按钮采用三重安全机制——松开、触摸取消、以及保底超时——确保触摸事件卡住或被中断时，电台不会无限期持续发射。',
},

'ja': {
  ssb_title: 'SSB 音声',
  ssb_intro: 'FT8TW はデジタルモードだけでなく、簡易的な無線機用マイク兼モニターとしても使えます。この画面はアプリ内では<em>ラジオツール</em>という名称です。FT8/FT4 用に設定済みの接続をそのまま利用し、プレストーク音声、スマートフォンでの受信音のモニター、アンテナ調整用のキャリア送出という 3 つの機能を備えます。',

  ssb_use_title: 'プレストーク操作',
  ssb_use_text:  'SSB タブを開き、送話ボタンを押し続けると送信します。ボタンは通常 <strong>HOLD TO TALK</strong>、送信中は <strong>TRANSMITTING</strong> に変わります:',
  ssb_use_list: `
    <ul>
      <li>ボタンを押している間、スマートフォンのマイクから音声を取り込み、CAT コマンドで PTT を制御し、接続された USB サウンドカードまたは Bluetooth SCO 経由で音声を出力します。</li>
      <li>ボタンを離す（またはタッチが中断される）と、直ちに送信を停止して PTT を解除します。</li>
      <li>レベルバーでマイクが自分の声をどれくらい拾っているか分かります。応答がないときに原因を推測する前に、そもそも声が乗っているかを確認できます。</li>
      <li><strong>ゲイン</strong>と <strong>アプリ音量</strong>のスライダーで、マイク信号の増幅具合とアプリの再生音量をそれぞれ調整します。上部には現在の音声入力元が表示され、本体マイクとヘッドセットのどちらを使っているか一目で分かります。</li>
      <li>接続から取得できる場合は、無線機の周波数と SWR が上部に表示されます。</li>
      <li>USB 音声の PTT は実機で確認済みです。Bluetooth SCO 音声の PTT も動作しますが実機テストは少ないため、問題があればご報告ください。</li>
    </ul>`,

  ssb_disabled_title: '送話ボタンが押せないとき',
  ssb_disabled_text:  '送信できない構成のときは、無理に送信せずボタン側で止め、どの条件が引っかかっているかを表示します:',
  ssb_disabled_list: `
    <ul>
      <li><strong>無線機が未接続</strong> — PTT を制御する CAT 接続がありません。</li>
      <li><strong>VOX モードでは使用不可</strong> — VOX には制御できる PTT 線がありません。PTT 制御を CAT・RTS・DTR のいずれかに変更してください。</li>
      <li><strong>USB またはBluetooth 接続のみ</strong> — ネットワーク接続の無線機はまだ対応していません。</li>
      <li><strong>FT8 送信中</strong> — 音声がデジタル送信とぶつかるため待機します。</li>
    </ul>`,

  ssb_monitor_title: '受信音のモニター',
  ssb_monitor_text:  '<strong>ラジオモニター</strong>のスイッチを入れると、無線機の受信音をスマートフォンから鳴らせます。無線機のスピーカーではなく本体の受話口やヘッドセットで聞けるので、部屋中に音を出さずに周波数を聞いておきたいときに便利です。',

  ssb_tune_title: 'アンテナ調整（TUNE）',
  ssb_tune_text:  '<strong>チューン</strong>の欄では PTT を入れて連続したトーンを送出します。アンテナチューナーの調整や SWR の測定に必要な信号です。送信時間とチューン音量を設定して <strong>TUNE</strong> を押すと、ボタンがカウントダウン付きの <strong>STOP</strong> に変わり、時間が来れば自動的に送信を終えます。',
  ssb_tune_warn: '<strong>先に無線機の出力を下げてください。</strong>連続キャリアを送出します。整合の取れていないアンテナへフルパワーを流すのは、ファイナルを壊す典型的な状況です。',
  ssb_tune_list: `
    <ul>
      <li>カウントダウンが終われば自動的に送信が止まるので、消し忘れて電波を出し続けることがありません。</li>
      <li>SWR が高くなりすぎた場合は、その場でチューンを中止し理由を表示します。</li>
      <li>独立したウォッチドッグがあり、ほかの仕組みで止まらなかった場合は強制的に PTT を解除します。</li>
    </ul>`,

  ssb_safety_title: 'PTT 固着の防止',
  ssb_safety_text:  '送話ボタンには「離す」「タッチのキャンセル」「保険としてのタイムアウト」という三重の安全機構があり、タッチイベントが固まったり中断されたりしても、無線機が送信し続けることはありません。',
},

'ru': {
  ssb_title: 'Голос SSB',
  ssb_intro: 'Помимо цифровых видов связи, FT8TW может служить простым микрофоном и монитором для трансивера — в приложении этот экран называется <em>Radio Tool</em>. Он использует то же подключение, что настроено для FT8/FT4, и охватывает три вещи: голос с кнопкой передачи, прослушивание трансивера через телефон и выдачу несущей для настройки антенны.',

  ssb_use_title: 'Работа с кнопкой передачи',
  ssb_use_text:  'Откройте вкладку SSB и удерживайте кнопку передачи. В покое на ней написано <strong>HOLD TO TALK</strong>, а во время передачи — <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Пока кнопка удерживается, приложение берёт звук с микрофона телефона, включает PTT командой CAT и выводит звук через подключённую USB-звуковую карту или Bluetooth SCO.</li>
      <li>Отпускание кнопки (или прерывание касания) немедленно прекращает передачу и отпускает PTT.</li>
      <li>Индикатор уровня показывает, насколько громко микрофон вас слышит, — можно сразу убедиться, что голос вообще идёт, а не гадать, почему никто не отвечает.</li>
      <li>Ползунки <strong>усиления</strong> и <strong>громкости приложения</strong> задают, насколько сильно раскачивается сигнал микрофона и как громко воспроизводит приложение; выше показан текущий источник звука, так что видно, используется микрофон телефона или гарнитура.</li>
      <li>Если соединение их сообщает, вверху показываются частота трансивера и КСВ.</li>
      <li>Передача с USB-звуком проверена на практике. Передача через Bluetooth SCO работает, но испытана меньше — сообщайте о проблемах.</li>
    </ul>`,

  ssb_disabled_title: 'Когда кнопка передачи недоступна',
  ssb_disabled_text:  'Если конфигурация не позволяет передавать, кнопка не сработает вместо того, чтобы выйти в эфир вслепую, и покажет, что именно мешает:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Трансивер не подключён</strong> — нет соединения CAT, которым можно включить PTT.</li>
      <li><strong>Недоступно в режиме VOX</strong> — в VOX нет управляемой линии PTT; переключите управление PTT на CAT, RTS или DTR.</li>
      <li><strong>Только USB или Bluetooth</strong> — трансиверы с сетевым подключением здесь пока не поддерживаются.</li>
      <li><strong>Идёт передача FT8</strong> — голос наложился бы на цифровую передачу, поэтому кнопка ждёт.</li>
    </ul>`,

  ssb_monitor_title: 'Прослушивание трансивера',
  ssb_monitor_text:  'Переключатель <strong>прослушивания</strong> выводит принимаемый звук трансивера через телефон, так что слушать можно в разговорный динамик или гарнитуру, а не через динамик аппарата. Удобно, когда нужно держать частоту на слух, не заполняя шумом всю комнату.',

  ssb_tune_title: 'Настройка антенны (TUNE)',
  ssb_tune_text:  'Раздел <strong>настройки</strong> включает передачу и выдаёт непрерывный тон — именно это нужно антенному тюнеру или для измерения КСВ. Задайте длительность и громкость тона, затем нажмите <strong>TUNE</strong>: кнопка станет <strong>STOP</strong> с обратным отсчётом, а по истечении времени передача прекратится сама.',
  ssb_tune_warn: '<strong>Сначала убавьте мощность трансивера.</strong> Здесь идёт непрерывная несущая, а полная мощность в несогласованную антенну — как раз тот случай, когда выходной каскад выходит из строя.',
  ssb_tune_list: `
    <ul>
      <li>По окончании отсчёта передача прекращается сама, поэтому забытая настройка не останется в эфире.</li>
      <li>Если КСВ поднимается слишком высоко, настройка немедленно прерывается с указанием причины.</li>
      <li>Независимый сторожевой механизм принудительно отпускает PTT, если остановить передачу иначе не удалось.</li>
    </ul>`,

  ssb_safety_title: 'Защита от залипания PTT',
  ssb_safety_text:  'Кнопка передачи защищена тройным механизмом — отпускание, отмена касания и страховочный тайм-аут, — поэтому зависшее или прерванное касание не оставит трансивер в передаче навсегда.',
},

'pl': {
  ssb_title: 'Głos SSB',
  ssb_intro: 'Poza emisjami cyfrowymi FT8TW może służyć jako prosty mikrofon i odsłuch do radia — w aplikacji ten ekran nosi nazwę <em>Radio Tool</em>. Korzysta z tego samego połączenia, które skonfigurowano dla FT8/FT4, i obejmuje trzy rzeczy: głos z przyciskiem nadawania, odsłuch radia przez telefon oraz nadanie nośnej do strojenia anteny.',

  ssb_use_title: 'Nadawanie przyciskiem',
  ssb_use_text:  'Otwórz zakładkę SSB i przytrzymaj przycisk nadawania. W spoczynku widnieje na nim <strong>HOLD TO TALK</strong>, a podczas nadawania <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Przytrzymanie przycisku pobiera dźwięk z mikrofonu telefonu, załącza PTT komendą CAT i kieruje dźwięk przez podłączoną kartę dźwiękową USB lub Bluetooth SCO.</li>
      <li>Zwolnienie przycisku (lub przerwanie dotyku) natychmiast kończy nadawanie i zwalnia PTT.</li>
      <li>Pasek poziomu pokazuje, jak głośno mikrofon cię odbiera — od razu wiadomo, czy głos w ogóle idzie, zamiast zgadywać, czemu nikt nie odpowiada.</li>
      <li>Suwaki <strong>wzmocnienia</strong> i <strong>głośności aplikacji</strong> ustawiają, jak mocno wysterowany jest sygnał z mikrofonu i jak głośno odtwarza aplikacja; powyżej widnieje bieżące źródło dźwięku, więc widać, czy używany jest mikrofon telefonu, czy zestaw słuchawkowy.</li>
      <li>Jeśli połączenie je zgłasza, u góry pokazywane są częstotliwość radia i SWR.</li>
      <li>Nadawanie z dźwiękiem USB zostało sprawdzone w praktyce. Wariant Bluetooth SCO działa, ale był mniej testowany — prosimy o zgłaszanie problemów.</li>
    </ul>`,

  ssb_disabled_title: 'Gdy przycisk nadawania jest niedostępny',
  ssb_disabled_text:  'Jeśli konfiguracja nie pozwala nadawać, przycisk odmawia zamiast wychodzić w eter na oślep, i podaje, co stoi na przeszkodzie:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Radio niepodłączone</strong> — brak połączenia CAT, którym można załączyć PTT.</li>
      <li><strong>Niedostępne w trybie VOX</strong> — VOX nie ma sterowanej linii PTT; przełącz sterowanie PTT na CAT, RTS lub DTR.</li>
      <li><strong>Tylko USB lub Bluetooth</strong> — radia z połączeniem sieciowym nie są tu jeszcze obsługiwane.</li>
      <li><strong>Trwa nadawanie FT8</strong> — głos nałożyłby się na transmisję cyfrową, więc przycisk czeka.</li>
    </ul>`,

  ssb_monitor_title: 'Odsłuch radia',
  ssb_monitor_text:  'Przełącznik <strong>odsłuchu</strong> odtwarza dźwięk odbierany przez radio w telefonie, dzięki czemu można słuchać przez słuchawkę telefonu lub zestaw zamiast głośnika radia. Przydatne, gdy chcesz mieć pasmo na uchu, nie zapełniając hałasem całego pomieszczenia.',

  ssb_tune_title: 'Strojenie anteny (TUNE)',
  ssb_tune_text:  'Sekcja <strong>strojenia</strong> załącza nadawanie i wysyła ciągły ton — dokładnie to, czego potrzebuje skrzynka antenowa albo pomiar SWR. Ustaw czas trwania i głośność tonu, a następnie naciśnij <strong>TUNE</strong>; przycisk zmieni się w <strong>STOP</strong> z odliczaniem, a po upływie czasu nadawanie samo się zakończy.',
  ssb_tune_warn: '<strong>Najpierw zmniejsz moc radia.</strong> Wysyłana jest ciągła fala nośna, a pełna moc w niedopasowaną antenę to właśnie sytuacja, w której pada stopień końcowy.',
  ssb_tune_list: `
    <ul>
      <li>Po zakończeniu odliczania nadawanie ustaje samo, więc zapomniane strojenie nie zostaje w eterze.</li>
      <li>Jeśli SWR wzrośnie zbyt wysoko, strojenie jest natychmiast przerywane wraz z podaniem powodu.</li>
      <li>Niezależny nadzorca siłą zwalnia PTT, gdyby nic innego nie zdołało przerwać nadawania.</li>
    </ul>`,

  ssb_safety_title: 'Zabezpieczenie przed zablokowanym PTT',
  ssb_safety_text:  'Przycisk nadawania ma potrójne zabezpieczenie — zwolnienie, anulowanie dotyku oraz awaryjny limit czasu — dzięki czemu zawieszone lub przerwane zdarzenie dotyku nie pozostawi radia w nadawaniu bez końca.',
},

'es': {
  ssb_title: 'Voz SSB',
  ssb_intro: 'Además de los modos digitales, FT8TW puede hacer de micrófono y monitor sencillo para el equipo: esta pantalla se llama <em>Radio Tool</em> en la aplicación. Reutiliza la conexión ya configurada para FT8/FT4 y abarca tres cosas: voz con pulsar para hablar, escuchar el equipo por el teléfono y emitir una portadora para sintonizar la antena.',

  ssb_use_title: 'Operación pulsar para hablar',
  ssb_use_text:  'Abre la pestaña SSB y mantén pulsado el botón de transmisión. En reposo indica <strong>HOLD TO TALK</strong> y, mientras transmite, <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Al mantener el botón, la aplicación capta el audio del micrófono del teléfono, activa el PTT mediante comando CAT y envía el audio por la tarjeta de sonido USB conectada o por audio Bluetooth SCO.</li>
      <li>Al soltar el botón (o si se interrumpe el toque) la transmisión se detiene de inmediato y se libera el PTT.</li>
      <li>Una barra de nivel muestra con qué fuerza te recoge el micrófono, así compruebas si tu voz sale antes de preguntarte por qué nadie contesta.</li>
      <li>Los deslizadores de <strong>ganancia</strong> y <strong>volumen de la aplicación</strong> ajustan cuánto se excita la señal del micrófono y con qué volumen reproduce la aplicación; encima se indica la fuente de audio actual, de modo que se ve si se usa el micrófono del teléfono o unos auriculares.</li>
      <li>Cuando la conexión los facilita, arriba aparecen la frecuencia del equipo y la ROE.</li>
      <li>El PTT con audio USB está verificado en la práctica. El PTT con audio Bluetooth SCO funciona, pero se ha probado menos: informa de cualquier problema.</li>
    </ul>`,

  ssb_disabled_title: 'Cuando el botón de transmisión no está disponible',
  ssb_disabled_text:  'Si la configuración no permite transmitir, el botón se niega en lugar de salir al aire a ciegas, e indica qué condición lo impide:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Equipo no conectado</strong> — no hay conexión CAT con la que activar el PTT.</li>
      <li><strong>No disponible en modo VOX</strong> — VOX no tiene una línea de PTT que controlar; cambia el control de PTT a CAT, RTS o DTR.</li>
      <li><strong>Solo cable USB o Bluetooth</strong> — los equipos conectados por red todavía no se admiten aquí.</li>
      <li><strong>Transmisión FT8 en curso</strong> — la voz chocaría con la transmisión digital, así que espera.</li>
    </ul>`,

  ssb_monitor_title: 'Escucha del equipo',
  ssb_monitor_text:  'El conmutador de <strong>escucha</strong> reproduce en el teléfono el audio recibido por el equipo, de modo que puedes oírlo por el auricular del teléfono o unos cascos en lugar del altavoz del equipo. Útil para no perder de oído la frecuencia sin llenar de ruido la habitación.',

  ssb_tune_title: 'Sintonizar la antena (TUNE)',
  ssb_tune_text:  'La sección de <strong>sintonía</strong> pasa el equipo a transmisión y envía un tono continuo, que es justo lo que necesita un acoplador de antena o una medida de ROE. Fija la duración y el volumen del tono y pulsa <strong>TUNE</strong>; el botón pasa a <strong>STOP</strong> con una cuenta atrás y la transmisión termina sola al agotarse el tiempo.',
  ssb_tune_warn: '<strong>Baja primero la potencia del equipo.</strong> Esto transmite una portadora continua, y meter plena potencia en una antena desadaptada es precisamente la situación que estropea la etapa final.',
  ssb_tune_list: `
    <ul>
      <li>La transmisión se detiene sola al acabar la cuenta atrás, así que una sintonía olvidada no se queda en el aire.</li>
      <li>Si la ROE sube demasiado, la sintonía se aborta de inmediato y se indica el motivo.</li>
      <li>Un vigilante independiente libera el PTT por la fuerza si ningún otro mecanismo consigue detener la transmisión.</li>
    </ul>`,

  ssb_safety_title: 'Protección contra PTT bloqueado',
  ssb_safety_text:  'El botón de transmisión usa un triple mecanismo de seguridad —soltar, cancelación del toque y un tiempo límite de respaldo— para que un evento táctil bloqueado o interrumpido no deje el equipo transmitiendo indefinidamente.',
},

'el': {
  ssb_title: 'Φωνή SSB',
  ssb_intro: 'Πέρα από τους ψηφιακούς τρόπους λειτουργίας, το FT8TW μπορεί να λειτουργήσει ως απλό μικρόφωνο και ακροατήριο για τον πομποδέκτη — η οθόνη ονομάζεται <em>Radio Tool</em> μέσα στην εφαρμογή. Χρησιμοποιεί την ίδια σύνδεση που έχει ήδη ρυθμιστεί για FT8/FT4 και καλύπτει τρία πράγματα: φωνή με πλήκτρο εκπομπής, ακρόαση του πομποδέκτη μέσω του τηλεφώνου και εκπομπή φέροντος για τον συντονισμό κεραίας.',

  ssb_use_title: 'Λειτουργία με πλήκτρο εκπομπής',
  ssb_use_text:  'Ανοίξτε την καρτέλα SSB και κρατήστε πατημένο το πλήκτρο ομιλίας για εκπομπή. Σε ηρεμία γράφει <strong>HOLD TO TALK</strong> και κατά την εκπομπή <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Όσο κρατάτε το πλήκτρο, η εφαρμογή καταγράφει ήχο από το μικρόφωνο του τηλεφώνου, ενεργοποιεί το PTT μέσω εντολής CAT και στέλνει τον ήχο στη συνδεδεμένη κάρτα ήχου USB ή μέσω Bluetooth SCO.</li>
      <li>Η απελευθέρωση του πλήκτρου (ή η διακοπή της αφής) σταματά αμέσως την εκπομπή και απελευθερώνει το PTT.</li>
      <li>Μια μπάρα στάθμης δείχνει πόσο δυνατά σας πιάνει το μικρόφωνο, ώστε να βεβαιωθείτε ότι η φωνή σας βγαίνει πριν αναρωτηθείτε γιατί δεν απαντά κανείς.</li>
      <li>Τα ρυθμιστικά <strong>ενίσχυσης</strong> και <strong>έντασης εφαρμογής</strong> καθορίζουν πόσο οδηγείται το σήμα του μικροφώνου και πόσο δυνατά αναπαράγει η εφαρμογή· από πάνω εμφανίζεται η τρέχουσα πηγή ήχου, ώστε να φαίνεται αν χρησιμοποιείται το μικρόφωνο του τηλεφώνου ή ακουστικά.</li>
      <li>Όταν τα αναφέρει η σύνδεση, στο επάνω μέρος εμφανίζονται η συχνότητα του πομποδέκτη και ο λόγος στάσιμων (SWR).</li>
      <li>Το PTT με ήχο USB έχει επαληθευτεί στην πράξη. Το PTT με ήχο Bluetooth SCO λειτουργεί, αλλά έχει δοκιμαστεί λιγότερο — παρακαλούμε αναφέρετε τυχόν προβλήματα.</li>
    </ul>`,

  ssb_disabled_title: 'Όταν το πλήκτρο ομιλίας δεν είναι διαθέσιμο',
  ssb_disabled_text:  'Αν η διάταξη δεν επιτρέπει εκπομπή, το πλήκτρο αρνείται αντί να βγει στον αέρα στα τυφλά, και δηλώνει ποια συνθήκη το εμποδίζει:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Ο πομποδέκτης δεν είναι συνδεδεμένος</strong> — δεν υπάρχει σύνδεση CAT για να ενεργοποιηθεί το PTT.</li>
      <li><strong>Μη διαθέσιμο σε λειτουργία VOX</strong> — το VOX δεν έχει γραμμή PTT προς έλεγχο· αλλάξτε τον έλεγχο PTT σε CAT, RTS ή DTR.</li>
      <li><strong>Μόνο USB ή Bluetooth</strong> — οι πομποδέκτες με σύνδεση δικτύου δεν υποστηρίζονται ακόμη εδώ.</li>
      <li><strong>Εκπομπή FT8 σε εξέλιξη</strong> — η φωνή θα συγκρουόταν με την ψηφιακή εκπομπή, οπότε αναμένει.</li>
    </ul>`,

  ssb_monitor_title: 'Ακρόαση πομποδέκτη',
  ssb_monitor_text:  'Ο διακόπτης <strong>ακρόασης</strong> αναπαράγει τον ήχο λήψης του πομποδέκτη μέσα από το τηλέφωνο, ώστε να ακούτε από το ακουστικό του τηλεφώνου ή από ακουστικά αντί για το ηχείο του πομποδέκτη. Χρήσιμο όταν θέλετε να παρακολουθείτε τη συχνότητα χωρίς να γεμίζετε τον χώρο με θόρυβο.',

  ssb_tune_title: 'Συντονισμός κεραίας (TUNE)',
  ssb_tune_text:  'Η ενότητα <strong>συντονισμού</strong> ενεργοποιεί την εκπομπή και στέλνει συνεχή τόνο — ακριβώς ό,τι χρειάζεται ένας συζευκτήρας κεραίας ή μια μέτρηση SWR. Ορίστε διάρκεια και ένταση τόνου και πατήστε <strong>TUNE</strong>· το πλήκτρο γίνεται <strong>STOP</strong> με αντίστροφη μέτρηση και η εκπομπή σταματά μόνη της όταν τελειώσει ο χρόνος.',
  ssb_tune_warn: '<strong>Χαμηλώστε πρώτα την ισχύ του πομποδέκτη.</strong> Εδώ εκπέμπεται συνεχές φέρον, και η πλήρης ισχύς σε κεραία χωρίς προσαρμογή είναι ακριβώς η περίπτωση που καταστρέφει το τελικό στάδιο.',
  ssb_tune_list: `
    <ul>
      <li>Η εκπομπή σταματά μόνη της στο τέλος της αντίστροφης μέτρησης, ώστε ένας ξεχασμένος συντονισμός να μην παραμείνει στον αέρα.</li>
      <li>Αν ο λόγος στάσιμων ανέβει υπερβολικά, ο συντονισμός διακόπτεται αμέσως και εμφανίζεται ο λόγος.</li>
      <li>Ανεξάρτητος επιτηρητής απελευθερώνει βίαια το PTT αν τίποτε άλλο δεν καταφέρει να σταματήσει την εκπομπή.</li>
    </ul>`,

  ssb_safety_title: 'Προστασία από κολλημένο PTT',
  ssb_safety_text:  'Το πλήκτρο ομιλίας διαθέτει τριπλό μηχανισμό ασφαλείας — απελευθέρωση, ακύρωση αφής και εφεδρικό χρονικό όριο — ώστε ένα κολλημένο ή διακοπτόμενο συμβάν αφής να μην αφήνει τον πομποδέκτη σε συνεχή εκπομπή.',
},

}; /* end PAGE_T */
