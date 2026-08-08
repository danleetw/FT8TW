/* ── FT8TW User Manual – i18n: Radio Tool (SSB) ─────────────────────────── */

const PAGE_T = {

en: {
  ssb_title: 'Radio Tool',
  ssb_intro: 'Beyond digital modes, FT8TW can act as a simple radio microphone and monitor. It reuses the radio connection already configured for FT8/FT4 and covers three things: push-to-talk voice on SSB, listening to the radio through the phone, and keying a carrier to tune an antenna.',

  ssb_use_title: 'Push-to-Talk Operation',
  ssb_use_text:  'Open the Radio Tool tab and press and hold the talk button to transmit. The button reads <strong>HOLD TO TALK</strong>, and changes to <strong>TRANSMITTING</strong> while keyed:',
  ssb_use_list: `
    <ul>
      <li>Holding the button captures audio from the phone's microphone, asserts PTT via CAT command, and routes audio out through the connected USB sound card or Bluetooth SCO audio.</li>
      <li>Releasing the button (or if the touch is interrupted) immediately stops transmission and releases PTT.</li>
      <li>A level bar shows how loud the microphone is picking you up, so you can confirm your audio is actually going out.</li>
      <li><strong>Gain</strong> and <strong>App Volume</strong> sliders set how hard the microphone signal is driven and how loud the app plays; the current audio source is shown above them, so it is clear whether the phone microphone or a headset is in use.</li>
      <li>The radio's frequency and SWR appear at the top when the connection reports them.</li>
      <li>The USB audio path is the most dependable one; Bluetooth SCO audio works too, though how well varies with the phone and the headset.</li>
    </ul>`,

  ssb_disabled_title: 'When the Talk Button Is Unavailable',
  ssb_disabled_text:  'If the current setup cannot carry a transmission, the button stays inactive and states which condition is responsible:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Radio not connected</strong> — no CAT connection to assert PTT with.</li>
      <li><strong>Not available in VOX mode</strong> — VOX has no PTT line to control; switch the PTT setting to CAT, RTS or DTR.</li>
      <li><strong>USB cable or Bluetooth connection only</strong> — network-connected radios are not supported here yet.</li>
      <li><strong>FT8 transmit in progress</strong> — voice would collide with the digital transmission, so it waits.</li>
    </ul>`,

  ssb_monitor_title: 'Radio Monitor',
  ssb_monitor_text:  'The <strong>Radio Monitor</strong> switch plays the received audio from the radio through the phone, so you can listen on the phone\'s earpiece or headset instead of the radio\'s speaker. This keeps the frequency audible without the radio speaker filling the room.',

  ssb_tune_title: 'Tuning an Antenna (TUNE)',
  ssb_tune_text:  'The <strong>Tune</strong> section keys the radio and sends a continuous tone, which is what an antenna tuner or an SWR reading needs. Set the duration and the tune volume, then press <strong>TUNE</strong>; the button becomes <strong>STOP</strong> with a countdown, and transmission ends by itself when the timer runs out.',
  ssb_tune_warn: '<strong>Turn your radio\'s power down first.</strong> This transmits a continuous carrier — full power into a mismatched antenna is exactly the situation that damages a finals stage.',
  ssb_tune_list: `
    <ul>
      <li>Transmission stops on its own at the end of the countdown, so a forgotten tune does not sit on the air.</li>
      <li>If the SWR reading climbs too high, tuning is aborted immediately and the reason is shown.</li>
      <li>An independent watchdog releases PTT by force if anything else fails to stop the transmission.</li>
    </ul>`,

  ssb_test_title: 'Radio Test Tool',
  ssb_test_text:  'At the bottom of the Radio Tool page is a collapsed <strong>Radio Test Tool ▼</strong> section; tap the heading to open it. When the radio is connected but nothing happens, or you are unsure whether a particular model supports something, this lets you check one item at a time: each button performs exactly the action FT8TW itself would perform, and every command sent and every reply received is recorded verbatim.',
  ssb_test_caption: 'The Radio Test Tool expanded: six test buttons on top, two input rows, and the response window below.',
  ssb_test_list: `
    <ul>
      <li><strong>PTT test</strong> — one press keys the radio, another releases it. It releases automatically after 10 seconds, and also when you leave the page.</li>
      <li><strong>Read frequency</strong> — asks the radio for its current frequency, confirming that the CAT read direction works.</li>
      <li><strong>USB/DATA</strong> — asks the radio to switch to USB / Data mode.</li>
      <li><strong>SWR/Power</strong> — shows the cached SWR and power readings. <strong>These only update while PTT is asserted</strong> — there is no uniform way to poll them across models, and polling during transmit is how FT8TW actually obtains them.</li>
      <li><strong>USB test tone</strong> — sends a test tone through the sound card, using the same path as Tune above (including its three layers of automatic stop).</li>
      <li><strong>CAT test tone</strong> — for models whose audio travels over CAT (the (tr)uSDX, for instance), sends a 5-second 1500 Hz tone. Models without it simply report that audio over CAT is unsupported.</li>
      <li><strong>Frequency (MHz)</strong> — enter a frequency and press <strong>Set frequency</strong> to test the CAT write direction.</li>
      <li><strong>Command</strong> — send an arbitrary CAT command. Text commands go in as they are (<code>FA;</code> on Kenwood/Yaesu, say); tick <strong>HEX</strong> to send hexadecimal instead, for binary protocols such as ICOM CI-V (<code>FE FE …</code>).</li>
    </ul>`,
  ssb_test_log: 'The response window logs each line as "<strong>time　direction　text　[HEX]</strong>", covering both what was sent and what came back. <strong>Clear</strong> empties the window and <strong>Copy</strong> puts the whole thing on the clipboard — pasting it into a problem report usually makes it obvious at a glance whether there was no reply, a differently formatted reply, or no command sent at all. If the automatic polling every few seconds swamps the view, tick <strong>Hide automatic polling</strong> to leave only the actions you triggered yourself.',
  ssb_test_note: 'The test tool covers CAT over <strong>USB and Bluetooth</strong>. Network-connected radios — FlexRadio, ICOM RS-BA1 and the Xiegu X6100 — do not use this path and so will not appear in the response window.',

  ssb_safety_title: 'PTT-Stuck Protection',
  ssb_safety_text:  'The talk button uses a triple safety mechanism — release, touch-cancel, and a backstop timeout — so that a stuck or interrupted touch event cannot leave the radio transmitting indefinitely.',
},

'zh-TW': {
  ssb_title: '電台工具',
  ssb_intro: '除了數位模式之外，FT8TW 也能當成簡易的無線電麥克風與監聽器。它沿用與 FT8/FT4 相同的電台連線設定，涵蓋三件事：SSB 按住通話語音、透過手機監聽電台，以及發射載波供天線調諧使用。',

  ssb_use_title: '按住通話操作',
  ssb_use_text:  '開啟電台工具分頁，按住通話按鈕即可發射。按鈕平時顯示<strong>按住發射</strong>，發射中會變為<strong>發射中</strong>：',
  ssb_use_list: `
    <ul>
      <li>按住按鈕時，程式會擷取手機麥克風音訊、透過 CAT 指令觸發 PTT，並將音訊輸出至已連接的 USB 音效卡或藍牙 SCO 音訊。</li>
      <li>放開按鈕（或觸控被中斷）會立即停止發射並釋放 PTT。</li>
      <li>畫面上的電平條顯示麥克風收到您的音量大小，可先確認自己的音訊確實有送出去。</li>
      <li><strong>增益</strong>與 <strong>App 音量</strong>兩支滑桿分別調整麥克風訊號的推動程度與程式播放音量；上方會顯示目前的音訊來源，一眼就知道用的是手機麥克風還是耳機。</li>
      <li>連線有回報時，電台的頻率與駐波比（SWR）會顯示在上方。</li>
      <li>USB 音訊是最穩定的路徑；藍牙 SCO 音訊同樣可用，但實際表現會因手機與耳機而異。</li>
    </ul>`,

  ssb_disabled_title: '通話按鈕無法按下時',
  ssb_disabled_text:  '若目前的接線條件無法支撐發射，按鈕會保持未啟用狀態，並直接指出是哪一項條件所致：',
  ssb_disabled_list: `
    <ul>
      <li><strong>電台未連接</strong> — 沒有 CAT 連線可以觸發 PTT。</li>
      <li><strong>VOX 模式不支援</strong> — VOX 沒有可控制的 PTT 線路，請把 PTT 控制改為 CAT、RTS 或 DTR。</li>
      <li><strong>僅限 USB 或藍牙連線</strong> — 網路連線的電台目前尚未支援此功能。</li>
      <li><strong>FT8 發射中</strong> — 語音會與數位發射相撞，因此會先等待。</li>
    </ul>`,

  ssb_monitor_title: '電台監聽',
  ssb_monitor_text:  '<strong>監聽無線電</strong>開關會把電台收到的音訊透過手機播放，讓您用手機聽筒或耳機收聽，不必開電台喇叭。想留意頻率上的動靜又不想吵到整個房間時很好用。',

  ssb_tune_title: '天線調諧（TUNE）',
  ssb_tune_text:  '<strong>Tune 調諧（天調 / 駐波比）</strong>區塊會按下 PTT 並送出連續單音，正是天線調諧器或量測駐波比所需要的訊號。設定 <strong>Tune 時間</strong>與 <strong>Tune 音量</strong>後按<strong>開始 TUNE</strong>，按鈕會變成帶倒數的<strong>停止</strong>，計時結束就自動停止發射。',
  ssb_tune_warn: '<strong>請先把電台功率調低。</strong>這會送出連續載波——用全功率打進阻抗不匹配的天線，正是燒毀末級的典型情況。',
  ssb_tune_list: `
    <ul>
      <li>倒數結束會自動停止發射，忘了關也不會一直佔著頻率。</li>
      <li>駐波比若攀升過高，調諧會立即中止並顯示原因。</li>
      <li>另有獨立的看門狗，萬一其他機制都沒能停下發射，它會強制放開 PTT。</li>
    </ul>`,

  ssb_test_title: '電台測試工具',
  ssb_test_text:  '電台工具頁最下方有一個<strong>電台測試工具 ▼</strong>的摺疊區塊，點一下標題就會展開。電台接上了卻沒反應、或不確定某個機種支不支援某項控制時，這裡可以逐項驗證：每一顆按鈕對應 FT8TW 平常真正會做的那個動作，送出的指令與電台的回應都會原樣記錄下來。',
  ssb_test_caption: '展開後的電台測試工具：上排六顆逐項測試、中間兩列輸入欄，下方是回應視窗。',
  ssb_test_list: `
    <ul>
      <li><strong>PTT 測試</strong> — 按一下拉起 PTT，再按一下放開。最多 10 秒就會自動放開，離開這一頁也會放開，不會忘了關。</li>
      <li><strong>讀取頻率</strong> — 向電台問目前的頻率，可據以確認 CAT 讀取方向是通的。</li>
      <li><strong>USB/DATA</strong> — 要電台切到 USB／Data 模式。</li>
      <li><strong>SWR/功率</strong> — 顯示目前快取的駐波比與功率讀數。<strong>這兩個數值只有在 PTT 拉起時才會更新</strong>——各機種沒有統一的主動查詢方式，發射中的自動輪詢就是 FT8TW 實際的取值方式。</li>
      <li><strong>USB 測試音</strong> — 經音效卡送出測試音，走的就是上面 Tune 那條路（含它的三層自動停止保險）。</li>
      <li><strong>CAT 測試音</strong> — 對於音訊直接走 CAT 的機種（例如 (tr)uSDX），送出 5 秒 1500 Hz 單音。不支援的機種會直接回報「此電台不支援 audio over CAT」。</li>
      <li><strong>頻率 (MHz)</strong> — 填入頻率後按<strong>設定頻率</strong>，測試 CAT 寫入方向。</li>
      <li><strong>指令</strong> — 直接送出任意 CAT 指令。文字指令照打即可（例如 Kenwood／Yaesu 的 <code>FA;</code>）；勾選 <strong>HEX</strong> 則以十六進位送出，供 ICOM CI-V 這類二進位協定使用（例如 <code>FE FE …</code>）。</li>
    </ul>`,
  ssb_test_log: '下方的回應視窗以「<strong>時間　方向　原文　[HEX]</strong>」逐筆記錄，送出與收到的都看得到。<strong>清除</strong>可清空視窗，<strong>複製</strong>把整份內容放進剪貼簿——回報電台相關問題時，把這段一起貼上來，通常一眼就能看出是沒回應、回應格式不同，還是指令根本沒送出去。若畫面被每隔幾秒的自動輪詢洗版，勾選<strong>隱藏自動輪詢</strong>即可只留下您自己按出來的動作。',
  ssb_test_note: '測試工具涵蓋 <strong>USB 與藍牙</strong>的 CAT 連線。FlexRadio、ICOM RS-BA1 與協谷 X6100 這類走網路的機種不經過這條路徑，因此不會出現在回應視窗中。',

  ssb_safety_title: 'PTT 卡住防護',
  ssb_safety_text:  '通話按鈕採用三重安全機制——放開、觸控取消、以及保底逾時——確保觸控事件卡住或被中斷時，電台不會無限期持續發射。',
},

'zh-CN': {
  ssb_title: '电台工具',
  ssb_intro: '除了数字模式之外，FT8TW 也能当成简易的无线电麦克风与监听器。它沿用与 FT8/FT4 相同的电台连接设置，涵盖三件事：SSB 按住通话语音、通过手机监听电台，以及发射载波供天线调谐使用。',

  ssb_use_title: '按住通话操作',
  ssb_use_text:  '打开电台工具分页，按住通话按钮即可发射。按钮平时显示 <strong>HOLD TO TALK</strong>，发射中会变为 <strong>TRANSMITTING</strong>：',
  ssb_use_list: `
    <ul>
      <li>按住按钮时，程序会采集手机麦克风音频、通过 CAT 指令触发 PTT，并将音频输出至已连接的 USB 声卡或蓝牙 SCO 音频。</li>
      <li>松开按钮（或触摸被中断）会立即停止发射并释放 PTT。</li>
      <li>界面上的电平条显示麦克风收到您的音量大小，可先确认自己的音频确实有送出去。</li>
      <li><strong>增益</strong>与 <strong>App 音量</strong>两支滑块分别调整麦克风信号的推动程度与程序播放音量；上方会显示当前的音频来源，一眼就知道用的是手机麦克风还是耳机。</li>
      <li>连接有回报时，电台的频率与驻波比（SWR）会显示在上方。</li>
      <li>USB 音频是最稳定的路径；蓝牙 SCO 音频同样可用，但实际表现会因手机与耳机而异。</li>
    </ul>`,

  ssb_disabled_title: '通话按钮无法按下时',
  ssb_disabled_text:  '若当前的接线条件无法支撑发射，按钮会保持未启用状态，并直接指出是哪一项条件所致：',
  ssb_disabled_list: `
    <ul>
      <li><strong>电台未连接</strong> — 没有 CAT 连接可以触发 PTT。</li>
      <li><strong>VOX 模式不支持</strong> — VOX 没有可控制的 PTT 线路，请把 PTT 控制改为 CAT、RTS 或 DTR。</li>
      <li><strong>仅限 USB 或蓝牙连接</strong> — 网络连接的电台目前尚未支持此功能。</li>
      <li><strong>FT8 发射中</strong> — 语音会与数字发射相撞，因此会先等待。</li>
    </ul>`,

  ssb_monitor_title: '电台监听',
  ssb_monitor_text:  '<strong>电台监听</strong>开关会把电台收到的音频通过手机播放，让您用手机听筒或耳机收听，不必开电台扬声器。如此可持续留意频率，又不必让电台扬声器充满整个房间。',

  ssb_tune_title: '天线调谐（TUNE）',
  ssb_tune_text:  '<strong>调谐</strong>区块会按下 PTT 并送出连续单音，正是天线调谐器或测量驻波比所需要的信号。设置持续时间与调谐音量后按 <strong>TUNE</strong>，按钮会变成带倒计时的 <strong>STOP</strong>，计时结束就自动停止发射。',
  ssb_tune_warn: '<strong>请先把电台功率调低。</strong>这会送出连续载波——用全功率打进阻抗不匹配的天线，正是烧毁末级的典型情况。',
  ssb_tune_list: `
    <ul>
      <li>倒计时结束会自动停止发射，忘了关也不会一直占着频率。</li>
      <li>驻波比若攀升过高，调谐会立即中止并显示原因。</li>
      <li>另有独立的看门狗，万一其他机制都没能停下发射，它会强制放开 PTT。</li>
    </ul>`,

  ssb_test_title: '电台测试工具',
  ssb_test_text:  '电台工具页最下方有一个<strong>电台测试工具 ▼</strong>的折叠区块，点一下标题就会展开。电台接上了却没反应、或不确定某个机型支不支持某项控制时，这里可以逐项验证：每一个按钮对应 FT8TW 平常真正会做的那个动作，送出的指令与电台的回应都会原样记录下来。',
  ssb_test_caption: '展开后的电台测试工具：上排六个逐项测试、中间两行输入栏，下方是回应窗口。',
  ssb_test_list: `
    <ul>
      <li><strong>PTT 测试</strong> — 按一下拉起 PTT，再按一下放开。最多 10 秒就会自动放开，离开这一页也会放开，不会忘了关。</li>
      <li><strong>读取频率</strong> — 向电台问目前的频率，可据以确认 CAT 读取方向是通的。</li>
      <li><strong>USB/Data</strong> — 要电台切到 USB／Data 模式。</li>
      <li><strong>SWR/功率</strong> — 显示目前缓存的驻波比与功率读数。<strong>这两个数值只有在 PTT 拉起时才会更新</strong>——各机型没有统一的主动查询方式，发射中的自动轮询就是 FT8TW 实际的取值方式。</li>
      <li><strong>USB 测试音</strong> — 经声卡送出测试音，走的就是上面 Tune 那条路（含它的三层自动停止保险）。</li>
      <li><strong>CAT 测试音</strong> — 对于音频直接走 CAT 的机型（例如 (tr)uSDX），送出 5 秒 1500 Hz 单音。不支持的机型会直接回报「此电台不支持 audio over CAT」。</li>
      <li><strong>频率 (MHz)</strong> — 填入频率后按<strong>设置频率</strong>，测试 CAT 写入方向。</li>
      <li><strong>指令</strong> — 直接送出任意 CAT 指令。文本指令照打即可（例如 Kenwood／Yaesu 的 <code>FA;</code>）；勾选 <strong>HEX</strong> 则以十六进制送出，供 ICOM CI-V 这类二进制协议使用（例如 <code>FE FE …</code>）。</li>
    </ul>`,
  ssb_test_log: '下方的回应窗口以「<strong>时间　方向　原文　[HEX]</strong>」逐条记录，送出与收到的都看得到。<strong>清除</strong>可清空窗口，<strong>复制</strong>把整份内容放进剪贴板——回报电台相关问题时，把这段一起贴上来，通常一眼就能看出是没回应、回应格式不同，还是指令根本没送出去。若画面被每隔几秒的自动轮询刷屏，勾选<strong>隐藏自动轮询</strong>即可只留下您自己按出来的动作。',
  ssb_test_note: '测试工具涵盖 <strong>USB 与蓝牙</strong>的 CAT 连接。FlexRadio、ICOM RS-BA1 与协谷 X6100 这类走网络的机型不经过这条路径，因此不会出现在回应窗口中。',

  ssb_safety_title: 'PTT 卡住防护',
  ssb_safety_text:  '通话按钮采用三重安全机制——松开、触摸取消、以及保底超时——确保触摸事件卡住或被中断时，电台不会无限期持续发射。',
},

'ja': {
  ssb_title: '無線機ツール',
  ssb_intro: 'FT8TW はデジタルモードだけでなく、簡易的な無線機用マイク兼モニターとしても使えます。この画面はアプリ内では<em>ラジオツール</em>という名称です。FT8/FT4 用に設定済みの接続をそのまま利用し、プレストーク音声、スマートフォンでの受信音のモニター、アンテナ調整用のキャリア送出という 3 つの機能を備えます。',

  ssb_use_title: 'プレストーク操作',
  ssb_use_text:  '無線機ツールタブを開き、送話ボタンを押し続けると送信します。ボタンは通常 <strong>HOLD TO TALK</strong>、送信中は <strong>TRANSMITTING</strong> に変わります:',
  ssb_use_list: `
    <ul>
      <li>ボタンを押している間、スマートフォンのマイクから音声を取り込み、CAT コマンドで PTT を制御し、接続された USB サウンドカードまたは Bluetooth SCO 経由で音声を出力します。</li>
      <li>ボタンを離す（またはタッチが中断される）と、直ちに送信を停止して PTT を解除します。</li>
      <li>レベルバーでマイクが自分の声をどれくらい拾っているか分かります。自分の音声が実際に送出されているかを確認できます。</li>
      <li><strong>ゲイン</strong>と <strong>アプリ音量</strong>のスライダーで、マイク信号の増幅具合とアプリの再生音量をそれぞれ調整します。上部には現在の音声入力元が表示され、本体マイクとヘッドセットのどちらを使っているか一目で分かります。</li>
      <li>接続から取得できる場合は、無線機の周波数と SWR が上部に表示されます。</li>
      <li>USB 音声の経路がもっとも安定しています。Bluetooth SCO 音声も使えますが、実際の具合は端末とヘッドセットによって変わります。</li>
    </ul>`,

  ssb_disabled_title: '送話ボタンが押せないとき',
  ssb_disabled_text:  '送信できない構成のときはボタンが働かず、どの条件によるものかを表示します:',
  ssb_disabled_list: `
    <ul>
      <li><strong>無線機が未接続</strong> — PTT を制御する CAT 接続がありません。</li>
      <li><strong>VOX モードでは使用不可</strong> — VOX には制御できる PTT 線がありません。PTT 制御を CAT・RTS・DTR のいずれかに変更してください。</li>
      <li><strong>USB またはBluetooth 接続のみ</strong> — ネットワーク接続の無線機はまだ対応していません。</li>
      <li><strong>FT8 送信中</strong> — 音声がデジタル送信とぶつかるため待機します。</li>
    </ul>`,

  ssb_monitor_title: '受信音のモニター',
  ssb_monitor_text:  '<strong>ラジオモニター</strong>のスイッチを入れると、無線機の受信音をスマートフォンから鳴らせます。無線機のスピーカーではなく本体の受話口やヘッドセットで聞けるので、部屋中に音を響かせずに周波数を聞き続けられます。',

  ssb_tune_title: 'アンテナ調整（TUNE）',
  ssb_tune_text:  '<strong>チューン</strong>の欄では PTT を入れて連続したトーンを送出します。アンテナチューナーの調整や SWR の測定に必要な信号です。送信時間とチューン音量を設定して <strong>TUNE</strong> を押すと、ボタンがカウントダウン付きの <strong>STOP</strong> に変わり、時間が来れば自動的に送信を終えます。',
  ssb_tune_warn: '<strong>先に無線機の出力を下げてください。</strong>連続キャリアを送出します。整合の取れていないアンテナへフルパワーを流すのは、ファイナルを壊す典型的な状況です。',
  ssb_tune_list: `
    <ul>
      <li>カウントダウンが終われば自動的に送信が止まるので、消し忘れて電波を出し続けることがありません。</li>
      <li>SWR が高くなりすぎた場合は、その場でチューンを中止し理由を表示します。</li>
      <li>独立したウォッチドッグがあり、ほかの仕組みで止まらなかった場合は強制的に PTT を解除します。</li>
    </ul>`,

  ssb_test_title: '無線機テストツール',
  ssb_test_text:  '無線機ツール画面のいちばん下に <strong>Radio Test Tool ▼</strong> という折りたたみセクションがあり、見出しをタップすると開きます。無線機はつないだのに反応がない、あるいはその機種が特定の制御に対応しているか分からない、というときにここで 1 項目ずつ確認できます。各ボタンは FT8TW が普段実際に行う動作そのものを実行し、送ったコマンドと無線機の応答はそのまま記録されます。',
  ssb_test_caption: '展開したテストツール：上段に 6 つのテストボタン、中央に 2 行の入力欄、下に応答ウィンドウ。（表示は英語のままです）',
  ssb_test_list: `
    <ul>
      <li><strong>PTT Test</strong> — 1 回押すと送信に入り、もう 1 回で解除します。10 秒で自動的に解除され、このページを離れたときにも解除されます。</li>
      <li><strong>Read Freq</strong> — 無線機に現在の周波数を問い合わせ、CAT の読み取り方向が通っているか確認できます。</li>
      <li><strong>USB/Data</strong> — 無線機を USB／Data モードに切り替えさせます。</li>
      <li><strong>SWR/Power</strong> — 保持している SWR と電力の値を表示します。<strong>この 2 つは PTT を入れている間しか更新されません</strong>。機種をまたいで能動的に問い合わせる共通の方法がなく、送信中のポーリングが FT8TW の実際の取得方法だからです。</li>
      <li><strong>USB Tone</strong> — サウンドカード経由でテストトーンを送ります。上の Tune と同じ経路（3 段階の自動停止も含む）を使います。</li>
      <li><strong>CAT Tone</strong> — 音声を CAT 経由で流す機種（(tr)uSDX など）向けに、1500 Hz のトーンを 5 秒送ります。非対応の機種では audio over CAT に対応していない旨が表示されます。</li>
      <li><strong>Frequency (MHz)</strong> — 周波数を入力して <strong>Set Freq</strong> を押すと、CAT の書き込み方向を試せます。</li>
      <li><strong>Command</strong> — 任意の CAT コマンドを送ります。テキストのコマンドはそのまま入力し（Kenwood／Yaesu の <code>FA;</code> など）、<strong>HEX</strong> にチェックを入れると 16 進数で送信され、ICOM CI-V のようなバイナリのプロトコルに使えます（<code>FE FE …</code>）。</li>
    </ul>`,
  ssb_test_log: '応答ウィンドウには「<strong>時刻　方向　原文　[HEX]</strong>」の形式で 1 行ずつ記録され、送信したものも受信したものも確認できます。<strong>Clear</strong> でウィンドウを空にし、<strong>Copy</strong> で内容全体をクリップボードにコピーできます。無線機に関する問題を報告するときにこれを貼り付ければ、応答がないのか、応答の形式が違うのか、そもそもコマンドが出ていないのかが、たいてい一目で分かります。数秒ごとの自動ポーリングで流れてしまう場合は <strong>Hide polling</strong> にチェックを入れると、自分で操作した分だけが残ります。',
  ssb_test_note: 'このテストツールが対象とするのは <strong>USB と Bluetooth</strong> の CAT 接続です。FlexRadio、ICOM RS-BA1、Xiegu X6100 のようなネットワーク接続の機種はこの経路を通らないため、応答ウィンドウには表示されません。',

  ssb_safety_title: 'PTT 固着の防止',
  ssb_safety_text:  '送話ボタンには「離す」「タッチのキャンセル」「保険としてのタイムアウト」という三重の安全機構があり、タッチイベントが固まったり中断されたりしても、無線機が送信し続けることはありません。',
},

'ru': {
  ssb_title: 'Инструменты трансивера',
  ssb_intro: 'Помимо цифровых видов связи, FT8TW может служить простым микрофоном и монитором для трансивера. Он использует то же подключение, что настроено для FT8/FT4, и охватывает три вещи: голос SSB с кнопкой передачи, прослушивание трансивера через телефон и выдачу несущей для настройки антенны.',

  ssb_use_title: 'Работа с кнопкой передачи',
  ssb_use_text:  'Откройте вкладку инструментов и удерживайте кнопку передачи. В покое на ней написано <strong>HOLD TO TALK</strong>, а во время передачи — <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Пока кнопка удерживается, приложение берёт звук с микрофона телефона, включает PTT командой CAT и выводит звук через подключённую USB-звуковую карту или Bluetooth SCO.</li>
      <li>Отпускание кнопки (или прерывание касания) немедленно прекращает передачу и отпускает PTT.</li>
      <li>Индикатор уровня показывает, насколько громко микрофон вас слышит, — можно сразу убедиться, что ваш звук действительно уходит в эфир.</li>
      <li>Ползунки <strong>усиления</strong> и <strong>громкости приложения</strong> задают, насколько сильно раскачивается сигнал микрофона и как громко воспроизводит приложение; выше показан текущий источник звука, так что видно, используется микрофон телефона или гарнитура.</li>
      <li>Если соединение их сообщает, вверху показываются частота трансивера и КСВ.</li>
      <li>Путь через USB-звук наиболее надёжен; звук по Bluetooth SCO тоже работает, но результат зависит от телефона и гарнитуры.</li>
    </ul>`,

  ssb_disabled_title: 'Когда кнопка передачи недоступна',
  ssb_disabled_text:  'Если текущая конфигурация не позволяет передавать, кнопка остаётся неактивной и указывает, какое именно условие этому причиной:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Трансивер не подключён</strong> — нет соединения CAT, которым можно включить PTT.</li>
      <li><strong>Недоступно в режиме VOX</strong> — в VOX нет управляемой линии PTT; переключите управление PTT на CAT, RTS или DTR.</li>
      <li><strong>Только USB или Bluetooth</strong> — трансиверы с сетевым подключением здесь пока не поддерживаются.</li>
      <li><strong>Идёт передача FT8</strong> — голос наложился бы на цифровую передачу, поэтому кнопка ждёт.</li>
    </ul>`,

  ssb_monitor_title: 'Прослушивание трансивера',
  ssb_monitor_text:  'Переключатель <strong>прослушивания</strong> выводит принимаемый звук трансивера через телефон, так что слушать можно в разговорный динамик или гарнитуру, а не через динамик аппарата. Так частота остаётся на слуху, а динамик трансивера не заполняет шумом комнату.',

  ssb_tune_title: 'Настройка антенны (TUNE)',
  ssb_tune_text:  'Раздел <strong>настройки</strong> включает передачу и выдаёт непрерывный тон — именно это нужно антенному тюнеру или для измерения КСВ. Задайте длительность и громкость тона, затем нажмите <strong>TUNE</strong>: кнопка станет <strong>STOP</strong> с обратным отсчётом, а по истечении времени передача прекратится сама.',
  ssb_tune_warn: '<strong>Сначала убавьте мощность трансивера.</strong> Здесь идёт непрерывная несущая, а полная мощность в несогласованную антенну — как раз тот случай, когда выходной каскад выходит из строя.',
  ssb_tune_list: `
    <ul>
      <li>По окончании отсчёта передача прекращается сама, поэтому забытая настройка не останется в эфире.</li>
      <li>Если КСВ поднимается слишком высоко, настройка немедленно прерывается с указанием причины.</li>
      <li>Независимый сторожевой механизм принудительно отпускает PTT, если остановить передачу иначе не удалось.</li>
    </ul>`,

  ssb_test_title: 'Инструмент проверки трансивера',
  ssb_test_text:  'В самом низу страницы инструментов трансивера есть свёрнутый раздел <strong>Radio Test Tool ▼</strong> — нажмите на заголовок, чтобы открыть его. Когда трансивер подключён, но ничего не происходит, или вы не уверены, поддерживает ли конкретная модель ту или иную команду, здесь можно проверить всё по пунктам: каждая кнопка выполняет ровно то действие, которое выполняет само приложение, а каждая отправленная команда и каждый ответ трансивера записываются дословно.',
  ssb_test_caption: 'Развёрнутый инструмент проверки: шесть кнопок сверху, две строки ввода и окно ответов внизу. (Подписи остаются английскими.)',
  ssb_test_list: `
    <ul>
      <li><strong>PTT Test</strong> — одно нажатие включает передачу, второе выключает. Через 10 секунд PTT отпускается автоматически, а также при уходе со страницы.</li>
      <li><strong>Read Freq</strong> — запрашивает у трансивера текущую частоту, подтверждая, что чтение по CAT работает.</li>
      <li><strong>USB/Data</strong> — просит трансивер перейти в режим USB / Data.</li>
      <li><strong>SWR/Power</strong> — показывает сохранённые значения КСВ и мощности. <strong>Они обновляются только при нажатом PTT</strong>: единого способа опрашивать их у разных моделей нет, и опрос во время передачи — это то, как приложение получает их на самом деле.</li>
      <li><strong>USB Tone</strong> — отправляет тестовый тон через звуковую карту тем же путём, что и Tune выше (включая три уровня автоматической остановки).</li>
      <li><strong>CAT Tone</strong> — для моделей, у которых звук идёт по CAT (например, (tr)uSDX), отправляет тон 1500 Гц на 5 секунд. Модели без такой возможности просто сообщают, что audio over CAT не поддерживается.</li>
      <li><strong>Frequency (MHz)</strong> — введите частоту и нажмите <strong>Set Freq</strong>, чтобы проверить запись по CAT.</li>
      <li><strong>Command</strong> — отправка произвольной команды CAT. Текстовые команды вводятся как есть (например, <code>FA;</code> у Kenwood/Yaesu); отметьте <strong>HEX</strong>, чтобы отправить шестнадцатеричные данные для двоичных протоколов вроде ICOM CI-V (<code>FE FE …</code>).</li>
    </ul>`,
  ssb_test_log: 'Окно ответов ведёт построчную запись вида «<strong>время　направление　текст　[HEX]</strong>», охватывая и отправленное, и полученное. <strong>Clear</strong> очищает окно, а <strong>Copy</strong> помещает всё содержимое в буфер обмена: вставив это в сообщение о проблеме, обычно сразу видно, был ли ответ вообще, пришёл ли он в другом формате или команда вовсе не ушла. Если автоматический опрос каждые несколько секунд забивает окно, отметьте <strong>Hide polling</strong>, и останутся только ваши собственные действия.',
  ssb_test_note: 'Инструмент охватывает CAT через <strong>USB и Bluetooth</strong>. Трансиверы с сетевым подключением — FlexRadio, ICOM RS-BA1 и Xiegu X6100 — этот путь не используют и в окне ответов не появятся.',

  ssb_safety_title: 'Защита от залипания PTT',
  ssb_safety_text:  'Кнопка передачи защищена тройным механизмом — отпускание, отмена касания и страховочный тайм-аут, — поэтому зависшее или прерванное касание не оставит трансивер в передаче навсегда.',
},

'pl': {
  ssb_title: 'Narzędzia radia',
  ssb_intro: 'Poza emisjami cyfrowymi FT8TW może służyć jako prosty mikrofon i odsłuch do radia. Korzysta z tego samego połączenia, które skonfigurowano dla FT8/FT4, i obejmuje trzy rzeczy: głos SSB z przyciskiem nadawania, odsłuch radia przez telefon oraz nadanie nośnej do strojenia anteny.',

  ssb_use_title: 'Nadawanie przyciskiem',
  ssb_use_text:  'Otwórz zakładkę narzędzi radia i przytrzymaj przycisk nadawania. W spoczynku widnieje na nim <strong>HOLD TO TALK</strong>, a podczas nadawania <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Przytrzymanie przycisku pobiera dźwięk z mikrofonu telefonu, załącza PTT komendą CAT i kieruje dźwięk przez podłączoną kartę dźwiękową USB lub Bluetooth SCO.</li>
      <li>Zwolnienie przycisku (lub przerwanie dotyku) natychmiast kończy nadawanie i zwalnia PTT.</li>
      <li>Pasek poziomu pokazuje, jak głośno mikrofon cię odbiera — od razu wiadomo, czy dźwięk rzeczywiście wychodzi.</li>
      <li>Suwaki <strong>wzmocnienia</strong> i <strong>głośności aplikacji</strong> ustawiają, jak mocno wysterowany jest sygnał z mikrofonu i jak głośno odtwarza aplikacja; powyżej widnieje bieżące źródło dźwięku, więc widać, czy używany jest mikrofon telefonu, czy zestaw słuchawkowy.</li>
      <li>Jeśli połączenie je zgłasza, u góry pokazywane są częstotliwość radia i SWR.</li>
      <li>Ścieżka dźwięku przez USB jest najpewniejsza; dźwięk przez Bluetooth SCO także działa, ale efekt zależy od telefonu i zestawu słuchawkowego.</li>
    </ul>`,

  ssb_disabled_title: 'Gdy przycisk nadawania jest niedostępny',
  ssb_disabled_text:  'Jeśli bieżąca konfiguracja nie pozwala nadawać, przycisk pozostaje nieaktywny i wskazuje, które warunki o tym decydują:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Radio niepodłączone</strong> — brak połączenia CAT, którym można załączyć PTT.</li>
      <li><strong>Niedostępne w trybie VOX</strong> — VOX nie ma sterowanej linii PTT; przełącz sterowanie PTT na CAT, RTS lub DTR.</li>
      <li><strong>Tylko USB lub Bluetooth</strong> — radia z połączeniem sieciowym nie są tu jeszcze obsługiwane.</li>
      <li><strong>Trwa nadawanie FT8</strong> — głos nałożyłby się na transmisję cyfrową, więc przycisk czeka.</li>
    </ul>`,

  ssb_monitor_title: 'Odsłuch radia',
  ssb_monitor_text:  'Przełącznik <strong>odsłuchu</strong> odtwarza dźwięk odbierany przez radio w telefonie, dzięki czemu można słuchać przez słuchawkę telefonu lub zestaw zamiast głośnika radia. Dzięki temu pasmo pozostaje słyszalne, a głośnik radia nie wypełnia hałasem pomieszczenia.',

  ssb_tune_title: 'Strojenie anteny (TUNE)',
  ssb_tune_text:  'Sekcja <strong>strojenia</strong> załącza nadawanie i wysyła ciągły ton — dokładnie to, czego potrzebuje skrzynka antenowa albo pomiar SWR. Ustaw czas trwania i głośność tonu, a następnie naciśnij <strong>TUNE</strong>; przycisk zmieni się w <strong>STOP</strong> z odliczaniem, a po upływie czasu nadawanie samo się zakończy.',
  ssb_tune_warn: '<strong>Najpierw zmniejsz moc radia.</strong> Wysyłana jest ciągła fala nośna, a pełna moc w niedopasowaną antenę to właśnie sytuacja, w której pada stopień końcowy.',
  ssb_tune_list: `
    <ul>
      <li>Po zakończeniu odliczania nadawanie ustaje samo, więc zapomniane strojenie nie zostaje w eterze.</li>
      <li>Jeśli SWR wzrośnie zbyt wysoko, strojenie jest natychmiast przerywane wraz z podaniem powodu.</li>
      <li>Niezależny nadzorca siłą zwalnia PTT, gdyby nic innego nie zdołało przerwać nadawania.</li>
    </ul>`,

  ssb_test_title: 'Narzędzie testowe radia',
  ssb_test_text:  'Na samym dole strony narzędzi radia znajduje się zwinięta sekcja <strong>Radio Test Tool ▼</strong> — dotknij nagłówka, aby ją otworzyć. Gdy radio jest podłączone, a nic się nie dzieje, albo nie masz pewności, czy dany model obsługuje określoną funkcję, można tu sprawdzić wszystko po kolei: każdy przycisk wykonuje dokładnie tę czynność, którą wykonuje sama aplikacja, a każde wysłane polecenie i każda odpowiedź radia są zapisywane dosłownie.',
  ssb_test_caption: 'Rozwinięte narzędzie testowe: sześć przycisków u góry, dwa wiersze wprowadzania i okno odpowiedzi poniżej. (Opisy pozostają po angielsku.)',
  ssb_test_list: `
    <ul>
      <li><strong>PTT Test</strong> — jedno naciśnięcie włącza nadawanie, drugie je wyłącza. Po 10 sekundach PTT zwalnia się samo, podobnie jak przy opuszczeniu strony.</li>
      <li><strong>Read Freq</strong> — pyta radio o bieżącą częstotliwość, potwierdzając, że odczyt przez CAT działa.</li>
      <li><strong>USB/Data</strong> — prosi radio o przejście w tryb USB / Data.</li>
      <li><strong>SWR/Power</strong> — pokazuje zapamiętane wartości SWR i mocy. <strong>Aktualizują się tylko przy wciśniętym PTT</strong> — nie ma jednolitego sposobu odpytywania ich w różnych modelach, a odpytywanie w trakcie nadawania to sposób, w jaki aplikacja faktycznie je pobiera.</li>
      <li><strong>USB Tone</strong> — wysyła ton testowy przez kartę dźwiękową tą samą drogą co Tune powyżej (wraz z jego trzema warstwami automatycznego zatrzymania).</li>
      <li><strong>CAT Tone</strong> — dla modeli, w których dźwięk idzie przez CAT (np. (tr)uSDX), wysyła ton 1500 Hz przez 5 sekund. Modele bez tej możliwości po prostu zgłaszają brak obsługi audio over CAT.</li>
      <li><strong>Frequency (MHz)</strong> — wpisz częstotliwość i naciśnij <strong>Set Freq</strong>, aby sprawdzić zapis przez CAT.</li>
      <li><strong>Command</strong> — wysyłanie dowolnego polecenia CAT. Polecenia tekstowe wpisuje się wprost (np. <code>FA;</code> w Kenwood/Yaesu); zaznacz <strong>HEX</strong>, aby wysłać dane szesnastkowe dla protokołów binarnych, takich jak ICOM CI-V (<code>FE FE …</code>).</li>
    </ul>`,
  ssb_test_log: 'Okno odpowiedzi zapisuje każdą linię w postaci „<strong>czas　kierunek　tekst　[HEX]</strong>", obejmując zarówno to, co wysłano, jak i to, co wróciło. <strong>Clear</strong> czyści okno, a <strong>Copy</strong> kopiuje całość do schowka — po wklejeniu tego do zgłoszenia zwykle od razu widać, czy odpowiedzi nie było, czy przyszła w innym formacie, czy polecenie w ogóle nie wyszło. Jeśli automatyczne odpytywanie co kilka sekund zalewa widok, zaznacz <strong>Hide polling</strong>, a zostaną tylko twoje własne działania.',
  ssb_test_note: 'Narzędzie obejmuje CAT przez <strong>USB i Bluetooth</strong>. Radia z połączeniem sieciowym — FlexRadio, ICOM RS-BA1 i Xiegu X6100 — nie korzystają z tej drogi i nie pojawią się w oknie odpowiedzi.',

  ssb_safety_title: 'Zabezpieczenie przed zablokowanym PTT',
  ssb_safety_text:  'Przycisk nadawania ma potrójne zabezpieczenie — zwolnienie, anulowanie dotyku oraz awaryjny limit czasu — dzięki czemu zawieszone lub przerwane zdarzenie dotyku nie pozostawi radia w nadawaniu bez końca.',
},

'es': {
  ssb_title: 'Herramientas de radio',
  ssb_intro: 'Además de los modos digitales, FT8TW puede hacer de micrófono y monitor sencillo para el equipo. Reutiliza la conexión ya configurada para FT8/FT4 y abarca tres cosas: voz SSB con pulsar para hablar, escuchar el equipo por el teléfono y emitir una portadora para sintonizar la antena.',

  ssb_use_title: 'Operación pulsar para hablar',
  ssb_use_text:  'Abre la pestaña de herramientas de radio y mantén pulsado el botón de transmisión. En reposo indica <strong>HOLD TO TALK</strong> y, mientras transmite, <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Al mantener el botón, la aplicación capta el audio del micrófono del teléfono, activa el PTT mediante comando CAT y envía el audio por la tarjeta de sonido USB conectada o por audio Bluetooth SCO.</li>
      <li>Al soltar el botón (o si se interrumpe el toque) la transmisión se detiene de inmediato y se libera el PTT.</li>
      <li>Una barra de nivel muestra con qué fuerza te recoge el micrófono, así compruebas que tu audio está saliendo realmente.</li>
      <li>Los deslizadores de <strong>ganancia</strong> y <strong>volumen de la aplicación</strong> ajustan cuánto se excita la señal del micrófono y con qué volumen reproduce la aplicación; encima se indica la fuente de audio actual, de modo que se ve si se usa el micrófono del teléfono o unos auriculares.</li>
      <li>Cuando la conexión los facilita, arriba aparecen la frecuencia del equipo y la ROE.</li>
      <li>La ruta de audio por USB es la más fiable; el audio por Bluetooth SCO también funciona, aunque el resultado varía según el teléfono y los auriculares.</li>
    </ul>`,

  ssb_disabled_title: 'Cuando el botón de transmisión no está disponible',
  ssb_disabled_text:  'Si la configuración actual no permite transmitir, el botón permanece inactivo e indica qué condición lo impide:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Equipo no conectado</strong> — no hay conexión CAT con la que activar el PTT.</li>
      <li><strong>No disponible en modo VOX</strong> — VOX no tiene una línea de PTT que controlar; cambia el control de PTT a CAT, RTS o DTR.</li>
      <li><strong>Solo cable USB o Bluetooth</strong> — los equipos conectados por red todavía no se admiten aquí.</li>
      <li><strong>Transmisión FT8 en curso</strong> — la voz chocaría con la transmisión digital, así que espera.</li>
    </ul>`,

  ssb_monitor_title: 'Escucha del equipo',
  ssb_monitor_text:  'El conmutador de <strong>escucha</strong> reproduce en el teléfono el audio recibido por el equipo, de modo que puedes oírlo por el auricular del teléfono o unos cascos en lugar del altavoz del equipo. Así la frecuencia sigue audible sin que el altavoz del equipo llene de ruido la sala.',

  ssb_tune_title: 'Sintonizar la antena (TUNE)',
  ssb_tune_text:  'La sección de <strong>sintonía</strong> pasa el equipo a transmisión y envía un tono continuo, que es justo lo que necesita un acoplador de antena o una medida de ROE. Fija la duración y el volumen del tono y pulsa <strong>TUNE</strong>; el botón pasa a <strong>STOP</strong> con una cuenta atrás y la transmisión termina sola al agotarse el tiempo.',
  ssb_tune_warn: '<strong>Baja primero la potencia del equipo.</strong> Esto transmite una portadora continua, y meter plena potencia en una antena desadaptada es precisamente la situación que estropea la etapa final.',
  ssb_tune_list: `
    <ul>
      <li>La transmisión se detiene sola al acabar la cuenta atrás, así que una sintonía olvidada no se queda en el aire.</li>
      <li>Si la ROE sube demasiado, la sintonía se aborta de inmediato y se indica el motivo.</li>
      <li>Un vigilante independiente libera el PTT por la fuerza si ningún otro mecanismo consigue detener la transmisión.</li>
    </ul>`,

  ssb_test_title: 'Herramienta de prueba del equipo',
  ssb_test_text:  'Al final de la página de herramientas de radio hay una sección plegada, <strong>Radio Test Tool ▼</strong>; toca el encabezado para abrirla. Cuando el equipo está conectado pero no pasa nada, o no sabes si un modelo concreto admite algo, aquí puedes comprobarlo punto por punto: cada botón ejecuta exactamente la acción que ejecutaría la propia aplicación, y cada orden enviada y cada respuesta del equipo quedan registradas literalmente.',
  ssb_test_caption: 'La herramienta de prueba desplegada: seis botones arriba, dos filas de entrada y la ventana de respuestas debajo. (Los rótulos siguen en inglés.)',
  ssb_test_list: `
    <ul>
      <li><strong>PTT Test</strong> — una pulsación pasa a transmisión y otra la suelta. Se suelta sola a los 10 segundos, y también al salir de la página.</li>
      <li><strong>Read Freq</strong> — pregunta al equipo su frecuencia actual, confirmando que la lectura por CAT funciona.</li>
      <li><strong>USB/Data</strong> — pide al equipo que pase a modo USB / Data.</li>
      <li><strong>SWR/Power</strong> — muestra los valores guardados de SWR y potencia. <strong>Solo se actualizan mientras el PTT está activado</strong>: no hay una forma uniforme de consultarlos en todos los modelos, y sondearlos durante la transmisión es como los obtiene realmente la aplicación.</li>
      <li><strong>USB Tone</strong> — envía un tono de prueba por la tarjeta de sonido, por la misma vía que el Tune de arriba (incluidas sus tres capas de parada automática).</li>
      <li><strong>CAT Tone</strong> — para los modelos cuyo audio viaja por CAT (el (tr)uSDX, por ejemplo), envía un tono de 1500 Hz durante 5 segundos. Los que no lo admiten informan de que audio over CAT no está soportado.</li>
      <li><strong>Frequency (MHz)</strong> — introduce una frecuencia y pulsa <strong>Set Freq</strong> para probar la escritura por CAT.</li>
      <li><strong>Command</strong> — envía cualquier orden CAT. Las órdenes de texto se escriben tal cual (<code>FA;</code> en Kenwood/Yaesu); marca <strong>HEX</strong> para enviar hexadecimal, útil en protocolos binarios como ICOM CI-V (<code>FE FE …</code>).</li>
    </ul>`,
  ssb_test_log: 'La ventana de respuestas anota cada línea como «<strong>hora　sentido　texto　[HEX]</strong>», tanto lo enviado como lo recibido. <strong>Clear</strong> la vacía y <strong>Copy</strong> pone todo el contenido en el portapapeles: al pegarlo en un informe de problema suele verse de un vistazo si no hubo respuesta, si llegó con otro formato o si la orden ni siquiera salió. Si el sondeo automático cada pocos segundos inunda la vista, marca <strong>Hide polling</strong> y quedarán solo las acciones que hayas hecho tú.',
  ssb_test_note: 'La herramienta cubre CAT por <strong>USB y Bluetooth</strong>. Los equipos conectados por red —FlexRadio, ICOM RS-BA1 y Xiegu X6100— no usan esta vía y por tanto no aparecerán en la ventana de respuestas.',

  ssb_safety_title: 'Protección contra PTT bloqueado',
  ssb_safety_text:  'El botón de transmisión usa un triple mecanismo de seguridad —soltar, cancelación del toque y un tiempo límite de respaldo— para que un evento táctil bloqueado o interrumpido no deje el equipo transmitiendo indefinidamente.',
},

'el': {
  ssb_title: 'Εργαλεία πομποδέκτη',
  ssb_intro: 'Πέρα από τους ψηφιακούς τρόπους λειτουργίας, το FT8TW μπορεί να λειτουργήσει ως απλό μικρόφωνο και ακροατήριο για τον πομποδέκτη. Χρησιμοποιεί την ίδια σύνδεση που έχει ήδη ρυθμιστεί για FT8/FT4 και καλύπτει τρία πράγματα: φωνή SSB με πλήκτρο εκπομπής, ακρόαση του πομποδέκτη μέσω του τηλεφώνου και εκπομπή φέροντος για τον συντονισμό κεραίας.',

  ssb_use_title: 'Λειτουργία με πλήκτρο εκπομπής',
  ssb_use_text:  'Ανοίξτε την καρτέλα εργαλείων και κρατήστε πατημένο το πλήκτρο ομιλίας για εκπομπή. Σε ηρεμία γράφει <strong>HOLD TO TALK</strong> και κατά την εκπομπή <strong>TRANSMITTING</strong>:',
  ssb_use_list: `
    <ul>
      <li>Όσο κρατάτε το πλήκτρο, η εφαρμογή καταγράφει ήχο από το μικρόφωνο του τηλεφώνου, ενεργοποιεί το PTT μέσω εντολής CAT και στέλνει τον ήχο στη συνδεδεμένη κάρτα ήχου USB ή μέσω Bluetooth SCO.</li>
      <li>Η απελευθέρωση του πλήκτρου (ή η διακοπή της αφής) σταματά αμέσως την εκπομπή και απελευθερώνει το PTT.</li>
      <li>Μια μπάρα στάθμης δείχνει πόσο δυνατά σας πιάνει το μικρόφωνο, ώστε να βεβαιωθείτε ότι ο ήχος σας όντως βγαίνει.</li>
      <li>Τα ρυθμιστικά <strong>ενίσχυσης</strong> και <strong>έντασης εφαρμογής</strong> καθορίζουν πόσο οδηγείται το σήμα του μικροφώνου και πόσο δυνατά αναπαράγει η εφαρμογή· από πάνω εμφανίζεται η τρέχουσα πηγή ήχου, ώστε να φαίνεται αν χρησιμοποιείται το μικρόφωνο του τηλεφώνου ή ακουστικά.</li>
      <li>Όταν τα αναφέρει η σύνδεση, στο επάνω μέρος εμφανίζονται η συχνότητα του πομποδέκτη και ο λόγος στάσιμων (SWR).</li>
      <li>Η διαδρομή ήχου μέσω USB είναι η πιο αξιόπιστη· ο ήχος μέσω Bluetooth SCO λειτουργεί επίσης, αλλά το αποτέλεσμα διαφέρει ανάλογα με το τηλέφωνο και τα ακουστικά.</li>
    </ul>`,

  ssb_disabled_title: 'Όταν το πλήκτρο ομιλίας δεν είναι διαθέσιμο',
  ssb_disabled_text:  'Αν η τρέχουσα διάταξη δεν επιτρέπει εκπομπή, το πλήκτρο παραμένει ανενεργό και δηλώνει ποια συνθήκη το προκαλεί:',
  ssb_disabled_list: `
    <ul>
      <li><strong>Ο πομποδέκτης δεν είναι συνδεδεμένος</strong> — δεν υπάρχει σύνδεση CAT για να ενεργοποιηθεί το PTT.</li>
      <li><strong>Μη διαθέσιμο σε λειτουργία VOX</strong> — το VOX δεν έχει γραμμή PTT προς έλεγχο· αλλάξτε τον έλεγχο PTT σε CAT, RTS ή DTR.</li>
      <li><strong>Μόνο USB ή Bluetooth</strong> — οι πομποδέκτες με σύνδεση δικτύου δεν υποστηρίζονται ακόμη εδώ.</li>
      <li><strong>Εκπομπή FT8 σε εξέλιξη</strong> — η φωνή θα συγκρουόταν με την ψηφιακή εκπομπή, οπότε αναμένει.</li>
    </ul>`,

  ssb_monitor_title: 'Ακρόαση πομποδέκτη',
  ssb_monitor_text:  'Ο διακόπτης <strong>ακρόασης</strong> αναπαράγει τον ήχο λήψης του πομποδέκτη μέσα από το τηλέφωνο, ώστε να ακούτε από το ακουστικό του τηλεφώνου ή από ακουστικά αντί για το ηχείο του πομποδέκτη. Έτσι η συχνότητα παραμένει ακουστή χωρίς το ηχείο του πομποδέκτη να γεμίζει τον χώρο με θόρυβο.',

  ssb_tune_title: 'Συντονισμός κεραίας (TUNE)',
  ssb_tune_text:  'Η ενότητα <strong>συντονισμού</strong> ενεργοποιεί την εκπομπή και στέλνει συνεχή τόνο — ακριβώς ό,τι χρειάζεται ένας συζευκτήρας κεραίας ή μια μέτρηση SWR. Ορίστε διάρκεια και ένταση τόνου και πατήστε <strong>TUNE</strong>· το πλήκτρο γίνεται <strong>STOP</strong> με αντίστροφη μέτρηση και η εκπομπή σταματά μόνη της όταν τελειώσει ο χρόνος.',
  ssb_tune_warn: '<strong>Χαμηλώστε πρώτα την ισχύ του πομποδέκτη.</strong> Εδώ εκπέμπεται συνεχές φέρον, και η πλήρης ισχύς σε κεραία χωρίς προσαρμογή είναι ακριβώς η περίπτωση που καταστρέφει το τελικό στάδιο.',
  ssb_tune_list: `
    <ul>
      <li>Η εκπομπή σταματά μόνη της στο τέλος της αντίστροφης μέτρησης, ώστε ένας ξεχασμένος συντονισμός να μην παραμείνει στον αέρα.</li>
      <li>Αν ο λόγος στάσιμων ανέβει υπερβολικά, ο συντονισμός διακόπτεται αμέσως και εμφανίζεται ο λόγος.</li>
      <li>Ανεξάρτητος επιτηρητής απελευθερώνει βίαια το PTT αν τίποτε άλλο δεν καταφέρει να σταματήσει την εκπομπή.</li>
    </ul>`,

  ssb_test_title: 'Εργαλείο ελέγχου πομποδέκτη',
  ssb_test_text:  'Στο κάτω μέρος της σελίδας εργαλείων πομποδέκτη υπάρχει μια διπλωμένη ενότητα <strong>Radio Test Tool ▼</strong>· πατήστε την επικεφαλίδα για να ανοίξει. Όταν ο πομποδέκτης είναι συνδεδεμένος αλλά δεν συμβαίνει τίποτα, ή δεν είστε σίγουροι αν ένα συγκεκριμένο μοντέλο υποστηρίζει κάτι, εδώ μπορείτε να το ελέγξετε βήμα-βήμα: κάθε κουμπί εκτελεί ακριβώς την ενέργεια που θα έκανε η ίδια η εφαρμογή, και κάθε εντολή που στέλνεται και κάθε απάντηση του πομποδέκτη καταγράφονται αυτούσιες.',
  ssb_test_caption: 'Το εργαλείο ελέγχου ανοιγμένο: έξι κουμπιά επάνω, δύο γραμμές εισαγωγής και το παράθυρο απαντήσεων από κάτω. (Οι ετικέτες παραμένουν στα αγγλικά.)',
  ssb_test_list: `
    <ul>
      <li><strong>PTT Test</strong> — ένα πάτημα ανοίγει την εκπομπή, το επόμενο την κλείνει. Απελευθερώνεται αυτόματα μετά από 10 δευτερόλεπτα, καθώς και όταν φύγετε από τη σελίδα.</li>
      <li><strong>Read Freq</strong> — ρωτά τον πομποδέκτη για την τρέχουσα συχνότητα, επιβεβαιώνοντας ότι η ανάγνωση μέσω CAT λειτουργεί.</li>
      <li><strong>USB/Data</strong> — ζητά από τον πομποδέκτη να περάσει σε λειτουργία USB / Data.</li>
      <li><strong>SWR/Power</strong> — δείχνει τις αποθηκευμένες τιμές SWR και ισχύος. <strong>Ενημερώνονται μόνο όσο το PTT είναι πατημένο</strong>: δεν υπάρχει ενιαίος τρόπος να ζητηθούν από όλα τα μοντέλα, και η δειγματοληψία κατά την εκπομπή είναι ο τρόπος με τον οποίο τις παίρνει στην πράξη η εφαρμογή.</li>
      <li><strong>USB Tone</strong> — στέλνει δοκιμαστικό τόνο μέσω της κάρτας ήχου, από την ίδια διαδρομή με το Tune παραπάνω (μαζί με τα τρία επίπεδα αυτόματης διακοπής του).</li>
      <li><strong>CAT Tone</strong> — για μοντέλα των οποίων ο ήχος περνά από το CAT (π.χ. το (tr)uSDX), στέλνει τόνο 1500 Hz για 5 δευτερόλεπτα. Όσα δεν το υποστηρίζουν αναφέρουν απλώς ότι το audio over CAT δεν υποστηρίζεται.</li>
      <li><strong>Frequency (MHz)</strong> — εισαγάγετε συχνότητα και πατήστε <strong>Set Freq</strong> για να δοκιμάσετε την εγγραφή μέσω CAT.</li>
      <li><strong>Command</strong> — αποστολή οποιασδήποτε εντολής CAT. Οι εντολές κειμένου γράφονται όπως είναι (π.χ. <code>FA;</code> σε Kenwood/Yaesu)· τσεκάρετε το <strong>HEX</strong> για αποστολή δεκαεξαδικών, χρήσιμο σε δυαδικά πρωτόκολλα όπως το ICOM CI-V (<code>FE FE …</code>).</li>
    </ul>`,
  ssb_test_log: 'Το παράθυρο απαντήσεων καταγράφει κάθε γραμμή ως «<strong>ώρα　κατεύθυνση　κείμενο　[HEX]</strong>», τόσο όσα στάλθηκαν όσο και όσα ελήφθησαν. Το <strong>Clear</strong> το αδειάζει και το <strong>Copy</strong> βάζει όλο το περιεχόμενο στο πρόχειρο — επικολλώντας το σε μια αναφορά προβλήματος φαίνεται συνήθως αμέσως αν δεν υπήρξε απάντηση, αν ήρθε σε άλλη μορφή, ή αν η εντολή δεν έφυγε καν. Αν η αυτόματη δειγματοληψία κάθε λίγα δευτερόλεπτα πνίγει την εικόνα, τσεκάρετε το <strong>Hide polling</strong> και θα μείνουν μόνο οι δικές σας ενέργειες.',
  ssb_test_note: 'Το εργαλείο καλύπτει CAT μέσω <strong>USB και Bluetooth</strong>. Οι πομποδέκτες με σύνδεση δικτύου — FlexRadio, ICOM RS-BA1 και Xiegu X6100 — δεν χρησιμοποιούν αυτή τη διαδρομή και δεν θα εμφανιστούν στο παράθυρο απαντήσεων.',

  ssb_safety_title: 'Προστασία από κολλημένο PTT',
  ssb_safety_text:  'Το πλήκτρο ομιλίας διαθέτει τριπλό μηχανισμό ασφαλείας — απελευθέρωση, ακύρωση αφής και εφεδρικό χρονικό όριο — ώστε ένα κολλημένο ή διακοπτόμενο συμβάν αφής να μην αφήνει τον πομποδέκτη σε συνεχή εκπομπή.',
},

}; /* end PAGE_T */
