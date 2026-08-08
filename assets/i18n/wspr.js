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
      <li>信标在每个<strong>偶数 UTC 分钟</strong>发射一次，每次 110.6 秒。</li>
      <li>每次计划发射前，电台频率会自动切到 WSPR 子频段。计划停止后会留在 WSPR 频率，不会自动切回原本的操作频率——需要回原频段时请自行切换。</li>
      <li>可选择要编码进信标消息的发射功率（dBm）。</li>
      <li>发射音频可以自己指定，也可以开启<strong>自动随机发射音频</strong>，让每次落在 WSPR 频窗内的不同位置，减少与其他信标互相盖台的机会。</li>
      <li>计划在完成一次发射后会自动停用，须手动重新启用才会进行下一次发射——这是刻意设计，避免无人看管下持续发射信标。</li>
      <li>WSPR 分页会显示倒计时，以及下一条计划消息的预览。</li>
    </ul>`,

  wspr_what_title: '什么是 WSPR',
  wspr_what_text:  'WSPR（读作 “whisper”）与 FT8、JS8 最大的不同是：<strong>它不是拿来通联的</strong>。它是一套<strong>传播探测工具</strong>——您单向发出一个极微弱的信标，全世界自愿架设的接收站听到之后，会自动把结果上传到数据库。您上网一查，就知道自己的信号在什么时候到了哪里。没有人会回应您，也不会产生通联记录。',
  wspr_what_list: `
    <ul>
      <li><strong>只送三样东西</strong> — 您的呼号、4 位网格、以及发射功率（dBm）。就这样，没有别的内容。</li>
      <li><strong>极慢、极窄</strong> — 一次发射要 110.6 秒，带宽只有约 6 Hz。代价是慢，换来的是<strong>可解出到约 −28 dB</strong>，比 FT8 还要再低 7 dB。</li>
      <li><strong>因此功率可以很小</strong> — 几百毫瓦绕地球是 WSPR 的日常。功率大反而失去意义：这是在测「最少要多少功率才传得到」。</li>
      <li><strong>时序是每 2 分钟一次</strong>，对齐偶数 UTC 分钟，所以时间一样要准。</li>
      <li><strong>结果在网上看</strong> — 到 <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> 的 Database 或 Map 查自己的呼号，就会列出谁在哪里、用多少信噪比收到您。</li>
    </ul>`,

  wspr_quick_title: '快速上手：放出第一个 WSPR 信标',
  wspr_quick_text:  'WSPR 的操作比 FT8 单纯——设置好按下去，然后上网看结果。',
  wspr_quick_steps: `
    <ol>
      <li>设置 → 基本信息，确认<strong>我的呼号</strong>与<strong>我的位置</strong>都填好了（网格至少要 4 位）。</li>
      <li><strong>把电台功率调低。</strong>WSPR 的重点就是用最小功率测距离，5 瓦以下是常见的起点。</li>
      <li>从主菜单或悬浮窗口打开 <strong>WSPR</strong> 分页。</li>
      <li>选 <strong>WSPR 频率</strong>——每个波段都有专属的 WSPR 子频段，列表里挑一个即可。</li>
      <li>设置<strong>发射功率 (dBm)</strong>。<strong>要填实际的输出功率</strong>，因为这个数字会编进消息、进入全球数据库；填错会让别人算出错误的传播结论。（5 瓦 = 37 dBm，1 瓦 = 30 dBm，0.5 瓦 = 27 dBm）</li>
      <li>打开<strong>启用 WSPR 定时发射</strong>。状态会变成「已排程」，等下一个偶数 UTC 分钟就自动发射 110.6 秒。</li>
      <li>发射完成后<strong>排程会自动关闭</strong>，这是刻意的，避免无人看管持续发射。要再送一次就再打开一次。</li>
      <li>过几分钟到 <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database，把 Call 填上自己的呼号查询，就会看到谁收到了您。</li>
    </ol>`,
  wspr_quick_note: '若查不到任何结果，先确认三件事：手机时间是否准确、电台是否真的有输出（发射时看功率表），以及<strong>发射音频是否落在 WSPR 频窗内</strong>。另外要记得：排程停止后电台会<strong>留在 WSPR 频率</strong>，要回原本的波段请自行切换。',

  wspr_callsign_title: '呼号格式与复合呼号',
  wspr_callsign_text:  'WSPR 的消息只有 50 个比特，因此对呼号格式有严格限制。<strong>标准呼号</strong>（第 2 或第 3 位为数字，例如 <code>BV6LC</code>、<code>M0ABC</code>）可以直接放进一则消息。',
  wspr_callsign_compound: '<strong>复合呼号</strong>（例如 <code>SM/DF6PA</code>、<code>DF6PA/P</code>）塞不进呼号字段，协议规定要用<strong>两则消息轮流表达</strong>：一则送完整呼号与功率，另一则送呼号的哈希值加上 6 位网格。FT8TW 会自动处理这件事——发射预览会同时列出这两则，并注明「复合呼号：以上两则轮流发射，每次送一则」。接收端要收到两则之后才能把完整呼号还原出来，因此<strong>复合呼号比标准呼号需要更长的时间才会出现在 WSPRnet 上</strong>。',

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
      <li>ビーコンは UTC の<strong>偶数分</strong>ごとに 1 回、110.6 秒間送信されます。</li>
      <li>各送信の直前に無線機の周波数が自動的に WSPR のサブバンドへ切り替わります。スケジュールを止めたあとは WSPR の周波数に留まり、元の運用周波数には戻りません。必要に応じてご自身で戻してください。</li>
      <li>ビーコン電文に載せる送信出力（dBm）を選択できます。</li>
      <li>送信音声周波数は手動で指定できるほか、<strong>送信音声周波数を自動でランダム化</strong>を有効にすると、毎回 WSPR の窓の中の別の位置に出るため、他のビーコンと重なりにくくなります。</li>
      <li>1 回送信するとスケジュールは自動的に解除され、次回は手動で再設定する必要があります。無人での連続送信を防ぐための意図的な仕様です。</li>
      <li>WSPR タブにはカウントダウンと、次に送信される電文のプレビューが表示されます。</li>
    </ul>`,

  wspr_what_title: 'WSPR とは',
  wspr_what_text:  'WSPR（「ウィスパー」と読みます）が FT8 や JS8 と決定的に違うのは、<strong>交信のためのものではない</strong>という点です。これは<strong>電波伝搬を調べる道具</strong>で、ごく微弱なビーコンを一方向に送るだけです。世界中の有志の受信局がそれを受信すると、結果を自動的にデータベースへ送ります。あとはウェブで調べれば、自分の信号がいつどこまで届いたかが分かります。誰かが応答することはなく、交信ログも残りません。',
  wspr_what_list: `
    <ul>
      <li><strong>送る内容は 3 つだけ</strong> — コールサイン、4 桁のグリッド、送信電力（dBm）。それ以外は何も入りません。</li>
      <li><strong>非常に遅く、非常に狭い</strong> — 1 回の送信に 110.6 秒かかり、帯域幅は約 6 Hz です。遅さと引き換えに、<strong>およそ −28 dB まで復号</strong>できます。FT8 よりさらに 7 dB 低い値です。</li>
      <li><strong>だから電力は小さくてよい</strong> — 数百ミリワットで地球を回るのは WSPR では日常です。大電力はむしろ意味を損ないます。「どれだけ小さな電力で届くか」を測っているからです。</li>
      <li><strong>2 分ごとの周期</strong>で、UTC の偶数分に合わせて送信します。したがって時計はやはり正確である必要があります。</li>
      <li><strong>結果はウェブで見ます</strong> — <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> の Database または Map で自分のコールサインを調べると、誰がどこで、どの SN 比で受信したかが分かります。</li>
    </ul>`,

  wspr_quick_title: 'クイックスタート：最初の WSPR ビーコンを出す',
  wspr_quick_text:  'WSPR の操作は FT8 より単純です。設定してオンにし、あとはウェブで結果を見るだけです。',
  wspr_quick_steps: `
    <ol>
      <li>設定 → 基本情報で<strong>自局コール</strong>と<strong>自局GL</strong>が入力されていることを確認します（グリッドは最低 4 桁必要）。</li>
      <li><strong>無線機の出力を下げます。</strong>最小の電力でどこまで届くかを測るのが WSPR の主旨で、5 W 以下から始めるのが一般的です。</li>
      <li>メインメニューまたはフローティングウィンドウから <strong>WSPR</strong> タブを開きます。</li>
      <li><strong>WSPR周波数</strong>を選びます。各バンドに専用の WSPR サブバンドがあるので、一覧から選ぶだけです。</li>
      <li><strong>送信電力 (dBm)</strong> を設定します。<strong>実際の出力を入力してください。</strong>この値は電文に埋め込まれて世界中のデータベースに入るため、間違っていると他の人が誤った伝搬の結論を導いてしまいます。（5 W = 37 dBm、1 W = 30 dBm、0.5 W = 27 dBm）</li>
      <li><strong>WSPR定時送信を有効化</strong>をオンにします。状態が「予約済み」に変わり、次の UTC 偶数分から 110.6 秒間自動的に送信します。</li>
      <li>送信が終わると<strong>スケジュールは自動的に解除されます</strong>。無人での連続ビーコンを防ぐための仕様です。もう一度送るには、もう一度オンにしてください。</li>
      <li>数分後に <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database で自分のコールサインを検索すると、誰が受信したかが表示されます。</li>
    </ol>`,
  wspr_quick_note: '何も出てこない場合は、まず 3 点を確認してください。端末の時計が正確か、無線機から実際に電力が出ているか（送信中にパワー計を見る）、そして<strong>送信音声周波数が WSPR の窓の中に入っているか</strong>。もう 1 点、スケジュールを止めたあとも無線機は <strong>WSPR 周波数のまま</strong>です。元のバンドに戻すには手動で切り替えてください。',

  wspr_callsign_title: 'コールサインの形式と複合コールサイン',
  wspr_callsign_text:  'WSPR の電文は 50 ビットしかないため、コールサインの形式に厳しい制限があります。<strong>標準的なコールサイン</strong>（2 文字目または 3 文字目が数字。<code>BV6LC</code>、<code>M0ABC</code> など）は 1 通の電文にそのまま収まります。',
  wspr_callsign_compound: '<strong>複合コールサイン</strong>（<code>SM/DF6PA</code>、<code>DF6PA/P</code> など）はコールサインの欄に収まらないため、プロトコル上<strong>2 通の電文を交互に送る</strong>ことになっています。1 通目はコールサイン全体と電力、2 通目はコールサインのハッシュと 6 桁のグリッドです。FT8TW はこれを自動的に処理し、送信プレビューには両方の電文が並び、1 回の送信につき 1 通ずつ交互に送る旨が表示されます。受信側は 2 通そろって初めてコールサイン全体を復元できるため、<strong>複合コールサインは標準のものより WSPRnet に現れるまで時間がかかります</strong>。',

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
      <li>Маяк передаёт в каждую <strong>чётную минуту UTC</strong> по 110,6 секунды.</li>
      <li>Непосредственно перед каждой запланированной передачей частота трансивера автоматически переключается на участок WSPR. После остановки расписания трансивер остаётся на частоте WSPR и не возвращается — при необходимости переключите его сами.</li>
      <li>Выберите мощность передачи (дБм), которая будет закодирована в сообщении маяка.</li>
      <li>Звуковую частоту передачи можно задать вручную либо включить <strong>автослучайную частоту передачи</strong>, чтобы каждая передача попадала в разное место окна WSPR и реже накладывалась на другие маяки.</li>
      <li>После состоявшейся передачи расписание автоматически снимается и для следующей передачи его нужно взвести вручную — так сделано намеренно, чтобы исключить непрерывную работу маяка без присмотра.</li>
      <li>На вкладке WSPR показаны обратный отсчёт и предпросмотр следующего сообщения.</li>
    </ul>`,

  wspr_what_title: 'Что такое WSPR',
  wspr_what_text:  'WSPR (произносится «виспер») отличается от FT8 и JS8 принципиально: <strong>он не предназначен для проведения связей</strong>. Это <strong>инструмент исследования прохождения</strong>: вы односторонне излучаете очень слабый маяк, а добровольные приёмные станции по всему миру, услышав его, автоматически отправляют результат в базу данных. Заглянув туда, вы узнаете, куда и когда дошёл ваш сигнал. Никто вам не отвечает, и никакая связь не записывается.',
  wspr_what_list: `
    <ul>
      <li><strong>Передаётся всего три вещи</strong> — ваш позывной, четырёхзначный локатор и мощность передачи в дБм. Больше ничего.</li>
      <li><strong>Очень медленно и очень узко</strong> — одна передача длится 110,6 секунды в полосе около 6 Гц. Платой служит время, а взамен идёт декодирование примерно до <strong>−28 дБ</strong>, то есть на 7 дБ ниже, чем у FT8.</li>
      <li><strong>Поэтому мощность может быть крошечной</strong> — несколько сотен милливатт вокруг земного шара для WSPR обычное дело. Большая мощность скорее лишает смысла сам вопрос: измеряется то, насколько мало нужно, чтобы сигнал всё же дошёл.</li>
      <li><strong>Передачи идут каждые 2 минуты</strong> с привязкой к чётным минутам UTC, так что часы снова должны быть точны.</li>
      <li><strong>Результаты смотрят в интернете</strong> — найдите свой позывной в разделе Database или Map на <a href="https://wsprnet.org" target="_blank">wsprnet.org</a>, и вы увидите, кто вас принял, где и с каким отношением сигнал/шум.</li>
    </ul>`,

  wspr_quick_title: 'Быстрый старт: первый маяк WSPR',
  wspr_quick_text:  'WSPR проще в обращении, чем FT8: настроить, включить, а затем посмотреть результаты в сети.',
  wspr_quick_steps: `
    <ol>
      <li>В настройках → Основные сведения убедитесь, что заполнены <strong>позывной</strong> и <strong>квадрат</strong> (локатор нужен минимум из 4 знаков).</li>
      <li><strong>Убавьте мощность трансивера.</strong> Смысл WSPR — минимальная мощность на максимальное расстояние; обычная отправная точка — менее 5 Вт.</li>
      <li>Откройте вкладку <strong>WSPR</strong> из главного меню или плавающего окна.</li>
      <li>Выберите <strong>частоту WSPR</strong> — у каждого диапазона есть свой участок WSPR, просто возьмите его из списка.</li>
      <li>Задайте <strong>мощность передачи (дБм)</strong>. <strong>Указывайте реальную мощность</strong>: это значение зашивается в сообщение и попадает в мировую базу, поэтому неверная цифра приведёт других к неверным выводам о прохождении. (5 Вт = 37 дБм, 1 Вт = 30 дБм, 0,5 Вт = 27 дБм.)</li>
      <li>Включите <strong>запланированную передачу WSPR</strong>. Состояние сменится на «запланировано», и в ближайшую чётную минуту UTC начнётся передача длиной 110,6 секунды.</li>
      <li>После завершения передачи <strong>расписание отключается само</strong>. Так сделано намеренно, чтобы исключить работу маяка без присмотра; для следующей передачи включите его снова.</li>
      <li>Через несколько минут зайдите на <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database и найдите свой позывной, чтобы увидеть, кто вас принял.</li>
    </ol>`,
  wspr_quick_note: 'Если ничего не находится, проверьте прежде всего три вещи: точность часов телефона, наличие реальной мощности на выходе (посмотрите на измеритель во время передачи) и то, что <strong>звуковая частота передачи попадает в окно WSPR</strong>. И ещё: после остановки расписания трансивер <strong>остаётся на частоте WSPR</strong> — на прежний диапазон его нужно вернуть вручную.',

  wspr_callsign_title: 'Формат позывного и составные позывные',
  wspr_callsign_text:  'Сообщение WSPR несёт всего 50 бит, что накладывает жёсткие ограничения на формат позывного. <strong>Обычный позывной</strong> — с цифрой на 2-й или 3-й позиции, например <code>BV6LC</code> или <code>M0ABC</code> — умещается в одно сообщение.',
  wspr_callsign_compound: '<strong>Составной позывной</strong> (<code>SM/DF6PA</code>, <code>DF6PA/P</code>) в поле позывного не помещается, и протокол требует передавать его <strong>двумя чередующимися сообщениями</strong>: одно несёт полный позывной и мощность, другое — хеш позывного и локатор из 6 знаков. FT8TW делает это за вас: в предпросмотре передачи показаны оба сообщения с пометкой, что они идут поочерёдно, по одному за передачу. Поскольку приёмной стороне нужны оба, чтобы восстановить полный позывной, <strong>составной позывной появляется на WSPRnet позже обычного</strong>.',

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
      <li>Latarnia nadaje w każdą <strong>parzystą minutę UTC</strong> przez 110,6 sekundy.</li>
      <li>Tuż przed każdym zaplanowanym nadawaniem częstotliwość radia automatycznie przełącza się na podpasmo WSPR. Po zatrzymaniu harmonogramu radio pozostaje na częstotliwości WSPR i nie wraca samo — w razie potrzeby przestrój je ręcznie.</li>
      <li>Wybierz moc nadawania (dBm), która zostanie zakodowana w wiadomości latarni.</li>
      <li>Częstotliwość audio nadawania można ustawić ręcznie albo włączyć <strong>automatycznie losową częstotliwość nadawania</strong>, dzięki czemu każda transmisja trafia w inne miejsce okna WSPR i rzadziej nakłada się na inne latarnie.</li>
      <li>Po wykonanym nadawaniu harmonogram automatycznie się rozbraja i przed kolejnym trzeba go uzbroić ręcznie — to celowe zabezpieczenie przed ciągłym nadawaniem bez nadzoru.</li>
      <li>Zakładka WSPR pokazuje odliczanie oraz podgląd następnej zaplanowanej wiadomości.</li>
    </ul>`,

  wspr_what_title: 'Czym jest WSPR',
  wspr_what_text:  'WSPR (wymawiane „whisper") różni się od FT8 i JS8 w jednej zasadniczej rzeczy: <strong>nie służy do prowadzenia łączności</strong>. To <strong>narzędzie do badania propagacji</strong>: nadajesz jednokierunkowo bardzo słabą latarnię, a ochotnicze stacje odbiorcze na całym świecie, gdy ją usłyszą, automatycznie wysyłają wynik do bazy danych. Zajrzenie do niej mówi ci, dokąd i kiedy dotarł twój sygnał. Nikt ci nie odpowiada i żadna łączność nie jest zapisywana.',
  wspr_what_list: `
    <ul>
      <li><strong>Przekazywane są tylko trzy rzeczy</strong> — twój znak, czteroznakowy lokator i moc nadawania w dBm. Nic więcej.</li>
      <li><strong>Bardzo wolno i bardzo wąsko</strong> — jedna transmisja trwa 110,6 sekundy w paśmie około 6 Hz. Ceną jest czas, a w zamian dekodowanie sięga mniej więcej <strong>−28 dB</strong>, czyli 7 dB niżej niż FT8.</li>
      <li><strong>Dlatego moc może być znikoma</strong> — kilkaset miliwatów dookoła świata to w WSPR codzienność. Duża moc raczej podważa sens: mierzy się przecież, jak mało wystarczy, by sygnał dotarł.</li>
      <li><strong>Transmisje idą co 2 minuty</strong>, zsynchronizowane z parzystymi minutami UTC, więc zegar znów musi być dokładny.</li>
      <li><strong>Wyniki ogląda się w sieci</strong> — wyszukaj swój znak w dziale Database lub Map na <a href="https://wsprnet.org" target="_blank">wsprnet.org</a>, aby zobaczyć, kto cię odebrał, gdzie i z jakim stosunkiem sygnału do szumu.</li>
    </ul>`,

  wspr_quick_title: 'Szybki start: pierwsza latarnia WSPR',
  wspr_quick_text:  'WSPR obsługuje się prościej niż FT8: ustawić, uzbroić, a potem sprawdzić wyniki w internecie.',
  wspr_quick_steps: `
    <ol>
      <li>W Ustawieniach → Informacje podstawowe sprawdź, że wpisany jest <strong>znak</strong> i <strong>kwadrat siatki</strong> (lokator musi mieć co najmniej 4 znaki).</li>
      <li><strong>Zmniejsz moc radia.</strong> Sensem WSPR jest minimalna moc na maksymalną odległość; typowy punkt wyjścia to poniżej 5 W.</li>
      <li>Otwórz zakładkę <strong>WSPR</strong> z menu głównego lub pływającego okna.</li>
      <li>Wybierz <strong>częstotliwość WSPR</strong> — każde pasmo ma własny podzakres WSPR, wystarczy wskazać go z listy.</li>
      <li>Ustaw <strong>moc nadawania (dBm)</strong>. <strong>Wpisz rzeczywistą moc wyjściową</strong>: ta liczba trafia do wiadomości i do ogólnoświatowej bazy, więc błędna wartość prowadzi innych do błędnych wniosków o propagacji. (5 W = 37 dBm, 1 W = 30 dBm, 0,5 W = 27 dBm.)</li>
      <li>Włącz <strong>zaplanowaną transmisję WSPR</strong>. Stan zmieni się na „zaplanowano", a w najbliższej parzystej minucie UTC rozpocznie się transmisja trwająca 110,6 sekundy.</li>
      <li>Po zakończeniu transmisji <strong>harmonogram sam się wyłącza</strong>. Jest to celowe, aby zapobiec nadawaniu bez nadzoru; kolejną transmisję trzeba uzbroić ponownie.</li>
      <li>Po kilku minutach wejdź na <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database i wyszukaj swój znak, aby zobaczyć, kto cię odebrał.</li>
    </ol>`,
  wspr_quick_note: 'Jeśli nic się nie pojawia, sprawdź najpierw trzy rzeczy: dokładność zegara telefonu, czy radio faktycznie oddaje moc (spójrz na miernik w trakcie nadawania) oraz czy <strong>częstotliwość audio nadawania mieści się w oknie WSPR</strong>. I jeszcze jedno: po zatrzymaniu harmonogramu radio <strong>pozostaje na częstotliwości WSPR</strong> — na poprzednie pasmo trzeba wrócić ręcznie.',

  wspr_callsign_title: 'Format znaku i znaki złożone',
  wspr_callsign_text:  'Wiadomość WSPR niesie zaledwie 50 bitów, co narzuca surowe ograniczenia na format znaku. <strong>Znak standardowy</strong> — z cyfrą na drugiej lub trzeciej pozycji, np. <code>BV6LC</code> lub <code>M0ABC</code> — mieści się w jednej wiadomości.',
  wspr_callsign_compound: '<strong>Znak złożony</strong> (<code>SM/DF6PA</code>, <code>DF6PA/P</code>) nie mieści się w polu znaku, więc protokół wymaga nadania go jako <strong>dwóch wiadomości na przemian</strong>: jedna niesie pełny znak i moc, druga skrót znaku oraz sześcioznakowy lokator. FT8TW robi to za ciebie — podgląd transmisji pokazuje obie wiadomości i informuje, że nadawane są na przemian, po jednej na transmisję. Ponieważ odbiornik potrzebuje obu, aby odtworzyć pełny znak, <strong>znak złożony pojawia się na WSPRnet później niż standardowy</strong>.',

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
      <li>La baliza transmite en cada <strong>minuto UTC par</strong>, durante 110,6 segundos.</li>
      <li>Justo antes de cada transmisión programada, la frecuencia del equipo cambia automáticamente a la subbanda WSPR. Al detener la programación, el equipo se queda en la frecuencia WSPR y no vuelve solo: cámbialo tú cuando quieras tu banda anterior.</li>
      <li>Selecciona la potencia de transmisión (dBm) que se codificará en el mensaje de la baliza.</li>
      <li>La frecuencia de audio de transmisión puede fijarse a mano o puedes activar la <strong>frecuencia de transmisión aleatoria automática</strong>, para que cada transmisión caiga en un punto distinto de la ventana WSPR y se solape menos con otras balizas.</li>
      <li>Tras completar una transmisión, la programación se desarma automáticamente y hay que volver a armarla a mano para la siguiente: es intencionado, para evitar balizas continuas sin vigilancia.</li>
      <li>La pestaña WSPR muestra una cuenta atrás y una vista previa del siguiente mensaje programado.</li>
    </ul>`,

  wspr_what_title: 'Qué es WSPR',
  wspr_what_text:  'WSPR (se pronuncia «whisper») se diferencia de FT8 y JS8 en algo fundamental: <strong>no sirve para hacer contactos</strong>. Es una <strong>sonda de propagación</strong>: emites en un solo sentido una baliza muy débil, y las estaciones receptoras voluntarias repartidas por el mundo, al oírla, suben el resultado a una base de datos. Consultarla te dice hasta dónde llegó tu señal y cuándo. Nadie te responde y no se registra ningún contacto.',
  wspr_what_list: `
    <ul>
      <li><strong>Transmite solo tres cosas</strong> — tu indicativo, un locator de 4 caracteres y tu potencia de transmisión en dBm. Nada más.</li>
      <li><strong>Muy lento y muy estrecho</strong> — una transmisión dura 110,6 segundos en un ancho de banda de unos 6 Hz. El precio es el tiempo; lo que se gana es decodificación hasta unos <strong>−28 dB</strong>, es decir, 7 dB por debajo de FT8.</li>
      <li><strong>Por eso la potencia puede ser mínima</strong> — unos cientos de milivatios dando la vuelta al mundo es lo habitual en WSPR. Subir la potencia más bien desvirtúa el propósito: lo que se mide es con cuán poco basta para llegar.</li>
      <li><strong>Las transmisiones van cada 2 minutos</strong>, alineadas con los minutos UTC pares, así que el reloj debe estar de nuevo en hora.</li>
      <li><strong>Los resultados se ven en la web</strong> — busca tu indicativo en Database o Map en <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> para ver quién te oyó, dónde y con qué relación señal/ruido.</li>
    </ul>`,

  wspr_quick_title: 'Inicio rápido: tu primera baliza WSPR',
  wspr_quick_text:  'WSPR es más sencillo de manejar que FT8: se configura, se arma y luego se consultan los resultados en internet.',
  wspr_quick_steps: `
    <ol>
      <li>En Ajustes → Información básica, comprueba que están rellenos <strong>tu indicativo</strong> y <strong>tu grid</strong> (el locator necesita al menos 4 caracteres).</li>
      <li><strong>Baja la potencia del equipo.</strong> La esencia de WSPR es mínima potencia a máxima distancia; un punto de partida habitual es por debajo de 5 W.</li>
      <li>Abre la pestaña <strong>WSPR</strong> desde el menú principal o la ventana flotante.</li>
      <li>Elige la <strong>frecuencia WSPR</strong>: cada banda tiene su propio subsegmento WSPR, basta con tomarlo de la lista.</li>
      <li>Ajusta la <strong>potencia de transmisión (dBm)</strong>. <strong>Introduce tu potencia real</strong>: esa cifra se codifica en el mensaje y entra en una base de datos mundial, de modo que un valor equivocado lleva a otros a conclusiones equivocadas sobre la propagación. (5 W = 37 dBm, 1 W = 30 dBm, 0,5 W = 27 dBm.)</li>
      <li>Activa <strong>Activar transmisión programada WSPR</strong>. El estado pasa a «programado» y, en el siguiente minuto UTC par, transmite durante 110,6 segundos.</li>
      <li>Al terminar la transmisión, <strong>la programación se desarma sola</strong>. Es deliberado, para evitar balizas desatendidas; para otra transmisión, vuelve a armarla.</li>
      <li>Unos minutos después, entra en <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database y busca tu indicativo para ver quién te recibió.</li>
    </ol>`,
  wspr_quick_note: 'Si no aparece nada, comprueba primero tres cosas: que el reloj del teléfono sea exacto, que el equipo esté dando potencia de verdad (mira el medidor durante la transmisión) y que <strong>la frecuencia de audio de transmisión caiga dentro de la ventana WSPR</strong>. Y recuerda además que, al detener la programación, el equipo <strong>se queda en la frecuencia WSPR</strong>: para volver a tu banda anterior, cámbiala tú.',

  wspr_callsign_title: 'Formato del indicativo e indicativos compuestos',
  wspr_callsign_text:  'Un mensaje WSPR transporta solo 50 bits, lo que impone límites estrictos al formato del indicativo. Un <strong>indicativo estándar</strong> —con un dígito en la 2.ª o 3.ª posición, como <code>BV6LC</code> o <code>M0ABC</code>— cabe en un único mensaje.',
  wspr_callsign_compound: 'Un <strong>indicativo compuesto</strong> (<code>SM/DF6PA</code>, <code>DF6PA/P</code>) no cabe en el campo de indicativo, y el protocolo exige enviarlo como <strong>dos mensajes alternos</strong>: uno lleva el indicativo completo y la potencia, y el otro un hash del indicativo más un locator de 6 caracteres. FT8TW se encarga de ello: la vista previa de transmisión muestra ambos mensajes e indica que se alternan, uno por transmisión. Como el receptor necesita los dos para reconstruir el indicativo completo, <strong>un indicativo compuesto tarda más en aparecer en WSPRnet que uno estándar</strong>.',

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
      <li>Ο φάρος εκπέμπει κάθε <strong>ζυγό λεπτό UTC</strong>, για 110,6 δευτερόλεπτα κάθε φορά.</li>
      <li>Λίγο πριν από κάθε προγραμματισμένη εκπομπή, η συχνότητα αλλάζει αυτόματα στην υπομπάντα WSPR. Όταν σταματήσει το πρόγραμμα, ο πομποδέκτης παραμένει στη συχνότητα WSPR και δεν επιστρέφει — αλλάξτε την μόνοι σας όταν χρειαστεί.</li>
      <li>Επιλέξτε την ισχύ εκπομπής (dBm) που θα κωδικοποιηθεί στο μήνυμα του φάρου.</li>
      <li>Η συχνότητα ήχου εκπομπής μπορεί να οριστεί χειροκίνητα ή να ενεργοποιήσετε την <strong>αυτόματη τυχαία συχνότητα ήχου εκπομπής</strong>, ώστε κάθε εκπομπή να πέφτει σε διαφορετικό σημείο του παραθύρου WSPR και να επικαλύπτεται λιγότερο με άλλους φάρους.</li>
      <li>Μετά από μια ολοκληρωμένη εκπομπή το πρόγραμμα αφοπλίζεται αυτόματα και πρέπει να οπλιστεί ξανά χειροκίνητα — είναι σκόπιμο, ώστε να αποφεύγεται η συνεχής εκπομπή φάρου χωρίς επίβλεψη.</li>
      <li>Η καρτέλα WSPR εμφανίζει αντίστροφη μέτρηση και προεπισκόπηση του επόμενου προγραμματισμένου μηνύματος.</li>
    </ul>`,

  wspr_what_title: 'Τι είναι το WSPR',
  wspr_what_text:  'Το WSPR (προφέρεται «γουίσπερ») διαφέρει από το FT8 και το JS8 σε κάτι θεμελιώδες: <strong>δεν προορίζεται για επαφές</strong>. Είναι ένα <strong>εργαλείο διερεύνησης της διάδοσης</strong>: εκπέμπετε μονόδρομα έναν πολύ ασθενή φάρο και οι εθελοντικοί σταθμοί λήψης σε όλο τον κόσμο, μόλις τον ακούσουν, ανεβάζουν αυτόματα το αποτέλεσμα σε μια βάση δεδομένων. Ψάχνοντας εκεί μαθαίνετε πού και πότε έφτασε το σήμα σας. Κανείς δεν σας απαντά και δεν καταγράφεται καμία επαφή.',
  wspr_what_list: `
    <ul>
      <li><strong>Μεταφέρει μόνο τρία πράγματα</strong> — το διακριτικό σας, ένα τετράγωνο 4 χαρακτήρων και την ισχύ εκπομπής σε dBm. Τίποτε άλλο.</li>
      <li><strong>Πολύ αργό, πολύ στενό</strong> — μία εκπομπή διαρκεί 110,6 δευτερόλεπτα σε εύρος περίπου 6 Hz. Το τίμημα είναι ο χρόνος· το κέρδος είναι αποκωδικοποίηση μέχρι περίπου <strong>−28 dB</strong>, δηλαδή 7 dB χαμηλότερα από το FT8.</li>
      <li><strong>Γι\' αυτό η ισχύς μπορεί να είναι ελάχιστη</strong> — μερικές εκατοντάδες milliwatt γύρω από τη Γη είναι συνηθισμένο στο WSPR. Η μεγάλη ισχύς μάλλον αναιρεί το νόημα: αυτό που μετριέται είναι πόσο λίγη αρκεί για να περάσει το σήμα.</li>
      <li><strong>Οι εκπομπές γίνονται κάθε 2 λεπτά</strong>, ευθυγραμμισμένες με τα ζυγά λεπτά UTC, οπότε το ρολόι πρέπει και πάλι να είναι ακριβές.</li>
      <li><strong>Τα αποτελέσματα φαίνονται στο διαδίκτυο</strong> — αναζητήστε το διακριτικό σας στο Database ή στο Map στο <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> για να δείτε ποιος σας άκουσε, πού και με τι λόγο σήματος προς θόρυβο.</li>
    </ul>`,

  wspr_quick_title: 'Γρήγορη εκκίνηση: ο πρώτος σας φάρος WSPR',
  wspr_quick_text:  'Το WSPR είναι απλούστερο στον χειρισμό από το FT8: ρυθμίζετε, ενεργοποιείτε και μετά βλέπετε τα αποτελέσματα στο διαδίκτυο.',
  wspr_quick_steps: `
    <ol>
      <li>Στις Ρυθμίσεις → Βασικές πληροφορίες βεβαιωθείτε ότι έχουν συμπληρωθεί το <strong>διακριτικό</strong> και το <strong>τετράγωνο</strong> (χρειάζονται τουλάχιστον 4 χαρακτήρες).</li>
      <li><strong>Χαμηλώστε την ισχύ του πομποδέκτη.</strong> Το νόημα του WSPR είναι ελάχιστη ισχύς σε μέγιστη απόσταση· συνηθισμένη αφετηρία είναι κάτω από 5 W.</li>
      <li>Ανοίξτε την καρτέλα <strong>WSPR</strong> από το κύριο μενού ή το αιωρούμενο παράθυρο.</li>
      <li>Επιλέξτε τη <strong>συχνότητα WSPR</strong> — κάθε μπάντα έχει τη δική της υποπεριοχή WSPR, απλώς πάρτε την από τη λίστα.</li>
      <li>Ορίστε την <strong>ισχύ εκπομπής (dBm)</strong>. <strong>Δηλώστε την πραγματική σας ισχύ</strong>: ο αριθμός αυτός κωδικοποιείται στο μήνυμα και καταλήγει σε παγκόσμια βάση δεδομένων, οπότε λάθος τιμή οδηγεί άλλους σε λανθασμένα συμπεράσματα για τη διάδοση. (5 W = 37 dBm, 1 W = 30 dBm, 0,5 W = 27 dBm.)</li>
      <li>Ενεργοποιήστε την <strong>προγραμματισμένη εκπομπή WSPR</strong>. Η κατάσταση αλλάζει σε «προγραμματισμένη» και στο επόμενο ζυγό λεπτό UTC εκπέμπει για 110,6 δευτερόλεπτα.</li>
      <li>Μόλις ολοκληρωθεί η εκπομπή, <strong>ο προγραμματισμός απενεργοποιείται μόνος του</strong>. Είναι σκόπιμο, ώστε να μην λειτουργεί φάρος χωρίς επίβλεψη· για επόμενη εκπομπή ενεργοποιήστε τον ξανά.</li>
      <li>Μετά από λίγα λεπτά, πηγαίνετε στο <a href="https://wsprnet.org" target="_blank">wsprnet.org</a> → Database και αναζητήστε το διακριτικό σας για να δείτε ποιος σας έλαβε.</li>
    </ol>`,
  wspr_quick_note: 'Αν δεν εμφανίζεται τίποτα, ελέγξτε πρώτα τρία πράγματα: την ακρίβεια του ρολογιού του τηλεφώνου, το αν ο πομποδέκτης βγάζει πράγματι ισχύ (δείτε το όργανο κατά την εκπομπή) και το αν <strong>η συχνότητα ήχου εκπομπής πέφτει μέσα στο παράθυρο WSPR</strong>. Και κάτι ακόμη: όταν σταματήσει ο προγραμματισμός, ο πομποδέκτης <strong>παραμένει στη συχνότητα WSPR</strong> — για να γυρίσετε στην προηγούμενη μπάντα, αλλάξτε την εσείς.',

  wspr_callsign_title: 'Μορφή διακριτικού και σύνθετα διακριτικά',
  wspr_callsign_text:  'Ένα μήνυμα WSPR μεταφέρει μόλις 50 bit, κάτι που θέτει αυστηρούς περιορισμούς στη μορφή του διακριτικού. Ένα <strong>τυπικό διακριτικό</strong> — με ψηφίο στη 2η ή 3η θέση, όπως <code>BV6LC</code> ή <code>M0ABC</code> — χωρά σε ένα μόνο μήνυμα.',
  wspr_callsign_compound: 'Ένα <strong>σύνθετο διακριτικό</strong> (<code>SM/DF6PA</code>, <code>DF6PA/P</code>) δεν χωρά στο πεδίο του διακριτικού, και το πρωτόκολλο απαιτεί να σταλεί ως <strong>δύο εναλλασσόμενα μηνύματα</strong>: το ένα μεταφέρει το πλήρες διακριτικό και την ισχύ, το άλλο έναν κατακερματισμό του διακριτικού συν ένα τετράγωνο 6 χαρακτήρων. Το FT8TW το χειρίζεται αυτόματα — η προεπισκόπηση εκπομπής δείχνει και τα δύο μηνύματα και σημειώνει ότι εναλλάσσονται, ένα ανά εκπομπή. Επειδή ο δέκτης χρειάζεται και τα δύο για να ανασυνθέσει το πλήρες διακριτικό, <strong>ένα σύνθετο διακριτικό αργεί περισσότερο να εμφανιστεί στο WSPRnet από ένα τυπικό</strong>.',

  wspr_rx_title: 'Αποκωδικοποίηση (πειραματική)',
  wspr_rx_text:  'Η αποκωδικοποίηση WSPR είναι πειραματική και έχει δύο γνωστά όρια: αποκωδικοποιεί ένα σήμα κάθε φορά και δεν αντισταθμίζει την ολίσθηση του ρολογιού του δέκτη. Για σοβαρή παρακολούθηση διάδοσης, ένας ειδικός αποκωδικοποιητής WSPR παραμένει το καταλληλότερο εργαλείο.',
},

}; /* end PAGE_T */
