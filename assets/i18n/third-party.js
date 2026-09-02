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
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> is a worldwide propagation mapping service. FT8TW submits reception spots automatically — no account is required. Enable <strong>Spot to PSKReporter</strong> under Settings → <strong>Upload to Third-party</strong>. Your callsign, grid, and received station data are submitted anonymously over HTTPS. The <strong>Antenna</strong> field next to it is a free-text description of your antenna (<code>Dipole</code>, say) sent along with the reports; it is purely a label for the map to display. Below it, <strong>Also report my radio model</strong> adds the radio you picked in the radio settings to your reports, so it shows up next to the software name (for example <code>FT8TW 26.0902 (ICOM IC-705)</code>). It is <strong>off by default</strong> — your equipment is only published once you turn it on — and the setting is stored per radio profile.',

  third_api_title: 'Developer API (Add-ons)',
  third_api_text:  'Turning on the <strong>Developer API</strong> in Settings → <strong>Advanced &amp; Developer</strong> starts a small web service on the phone, letting other programs <strong>on the same local network</strong> read decodes, log entries, the spectrum and the current status — enough to build your own add-ons and tools against. The access address is shown once it is enabled.',
  third_api_list: `
    <ul>
      <li><strong>Web console</strong> — open the address shown on screen in a desktop browser. This is no longer a bare demonstration of the endpoints but a working console: the decode list in the same order as the phone, the spectrum, a settings tab, a collapsible status bar, and a map that draws the path to the station you are working. It <strong>has to be served by the phone itself</strong>; copying it to another site or opening it as a local file will be blocked by the browser's security rules.</li>
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
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球無線電傳播地圖服務。FT8TW 可自動提交收聽報告，無需帳號。在設置 → 上傳至第三方中開啟<strong>回報訊號到 PSK Reporter</strong>。您的呼號、網格及收聽到的電台資訊將透過 HTTPS 匿名提交。旁邊的<strong>天線資訊</strong>是隨報告一起送出的天線型號描述（例如 <code>Dipole</code>），純粹是給地圖看的說明文字。 下方的<strong>一併回報電台型號</strong>會把您在電台設定裡選的機型一起送出，顯示在軟體名稱旁邊（例如 <code>FT8TW 26.0902 (ICOM IC-705)</code>）。這個開關<strong>預設關閉</strong>——您的設備只有在自己打開之後才會被公開；設定隨電台設定組（profile）儲存。',

  third_api_title: '開發者 API（外掛）',
  third_api_text:  '在設置 → <strong>進階與開發者</strong>開啟<strong>開發者 API</strong>後，FT8TW 會在手機上開一個小型網頁服務，讓<strong>同一個區域網路內</strong>的其他程式讀取解碼結果、通聯記錄、頻譜與目前狀態，您可以據此開發自己的外掛與工具。開啟後畫面上會顯示存取網址。',
  third_api_list: `
    <ul>
      <li><strong>網頁主控台</strong> — 用電腦的瀏覽器打開畫面上顯示的網址。它已經不只是展示 API 有哪些資料的示範頁，而是一個可以實際操作的主控台：解碼清單的順序與手機一致，另有頻譜、設定分頁、可收合的狀態列，以及會把對方方向畫出來的地圖。這個頁面<strong>必須由手機本身提供</strong>；把它複製到別的網站或存成本機檔案再開，都會被瀏覽器的安全限制擋下。</li>
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

  third_api_title: '开发者 API（插件）',
  third_api_text:  '在设置 → <strong>高级与开发者</strong>开启<strong>开发者 API</strong>后，FT8TW 会在手机上开一个小型网页服务，让<strong>同一个局域网内</strong>的其他程序读取解码结果、通联日志、频谱与目前状态，您可以据此开发自己的插件与工具。开启后画面上会显示访问网址。',
  third_api_list: `
    <ul>
      <li><strong>网页主控台</strong> — 用电脑的浏览器打开画面上显示的网址。它已经不只是展示 API 有哪些数据的示范页，而是一个可以实际操作的主控台：解码列表的顺序与手机一致，另有频谱、设置分页、可收合的状态栏，以及会把对方方向画出来的地图。这个页面<strong>必须由手机本身提供</strong>；把它复制到别的网站或存成本地文件再打开，都会被浏览器的安全限制挡下。</li>
      <li><strong>只读 Token</strong> — 要让某个工具读取您的解码与日志时，给这一把。</li>
      <li><strong>完整权限 Token</strong> — 控制发射时才需要，请当成密码看待。<strong>重新生成</strong>会让旧的立即失效，所有连接中的插件都会被中断。</li>
      <li><strong>允许远程控制发射</strong> — 独立的开关，默认为关。只有它开启时，持有完整权限 Token 的程序才能开始或停止发射；其余功能一律只读，自由文本发射则刻意完全不开放。</li>
    </ul>`,
  third_api_warn: '同一个网络内只要有人拿到您的 Token，就能读取您的日志与设置，因此建议<strong>需要时才打开</strong>。第三方服务的账号密码（Cloudlog、QRZ）不会被读取。另外，若该端口已被其他程序占用，API 不会启动，画面上会直接说明。',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球无线电传播地图服务。FT8TW 可自动提交收听报告，无需账号。在设置 → <strong>上传至第三方</strong>中开启<strong>上报信号到 PSK Reporter</strong>。您的呼号、网格及收听到的电台信息将通过 HTTPS 匿名提交。旁边的<strong>天线信息</strong>是随报告一起送出的天线型号描述（例如 <code>Dipole</code>），纯粹是给地图看的说明文字。 下方的<strong>一并回报电台型号</strong>会把您在电台设置里选的机型一起送出，显示在软件名称旁边（例如 <code>FT8TW 26.0902 (ICOM IC-705)</code>）。这个开关<strong>默认关闭</strong>——您的设备只有在自己打开之后才会被公开；设置随电台设置组（profile）储存。',
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

  third_api_title: '開発者 API（アドオン）',
  third_api_text:  '設定 → <strong>詳細設定と開発者</strong>で<strong>開発者 API</strong> をオンにすると、FT8TW は端末上に小さな Web サービスを立ち上げます。<strong>同じローカルネットワーク上</strong>の他のプログラムから、デコード結果・交信ログ・スペクトラム・現在の状態を読み取れるようになり、自分用のアドオンやツールを作れます。オンにするとアクセス用のアドレスが画面に表示されます。',
  third_api_list: `
    <ul>
      <li><strong>ウェブコンソール</strong> — 表示されたアドレスをパソコンのブラウザーで開きます。API が返すデータを並べただけのデモではなく、実際に操作できるコンソールになっています。デコード一覧は端末と同じ並び順で、ほかにスペクトラム、設定タブ、折りたためるステータスバー、交信相手の方角を描く地図があります。このページは<strong>端末自身から配信される必要があります</strong>。別のサイトにコピーしたり、ローカルファイルとして開いたりすると、ブラウザーのセキュリティ制限でブロックされます。</li>
      <li><strong>読み取り専用トークン</strong> — デコードやログを読ませたいツールには、こちらを渡します。</li>
      <li><strong>フルアクセストークン</strong> — 送信を制御する場合にだけ必要です。パスワードと同じ扱いにしてください。<strong>再生成</strong>すると古いトークンは直ちに無効になり、接続中のアドオンはすべて切断されます。</li>
      <li><strong>送信のリモート操作を許可</strong> — 独立したスイッチで、既定はオフです。これがオンのときにだけ、フルアクセストークンを持つプログラムが送信を開始・停止できます。それ以外はすべて読み取り専用で、フリーテキスト送信は意図的にまったく公開していません。</li>
    </ul>`,
  third_api_warn: '同じネットワーク上でトークンを入手した人は、あなたのログや設定を読めてしまいます。<strong>必要なときだけオンにする</strong>ことをおすすめします。外部サービスの認証情報（Cloudlog、QRZ）が読み取られることはありません。また、ポートが他のプログラムに使われている場合、API は起動せず、その旨が画面に表示されます。',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> は世界規模の電波伝搬マッピングサービスです。FT8TW は受信レポートを自動送信します。アカウントは不要です。設定 → <strong>外部サービスへアップロード</strong>で<strong>PSK Reporterへ送信</strong>を有効にしてください。自局のコールサイン、グリッド、受信した局の情報は HTTPS 経由で匿名送信されます。隣の<strong>アンテナ情報</strong>はレポートと一緒に送られるアンテナの説明（例：<code>Dipole</code>）で、地図に表示するためだけのものです。 その下の<strong>無線機の機種も送信する</strong>を有効にすると、無線機設定で選んだ機種がレポートに含まれ、ソフトウェア名の横に表示されます（例：<code>FT8TW 26.0902 (ICOM IC-705)</code>）。この設定は<strong>既定でオフ</strong>です。自分でオンにしたときだけ機材が公開されます。設定は無線機プロファイルごとに保存されます。',
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

  third_api_title: 'API для разработчиков (дополнения)',
  third_api_text:  'Если включить <strong>API для разработчиков</strong> в Настройки → <strong>Дополнительно и разработка</strong>, FT8TW поднимает на телефоне небольшой веб-сервис. Другие программы <strong>в той же локальной сети</strong> смогут читать декодированные сообщения, журнал, спектр и текущее состояние — этого достаточно, чтобы писать собственные дополнения и инструменты. После включения на экране показывается адрес доступа.',
  third_api_list: `
    <ul>
      <li><strong>Веб-консоль</strong> — откройте показанный адрес в браузере на компьютере. Это уже не простая демонстрация того, что отдаёт API, а рабочая консоль: список декодированных сообщений в том же порядке, что и на телефоне, спектр, вкладка настроек, сворачиваемая строка состояния и карта, рисующая направление на корреспондента. Эта страница <strong>должна отдаваться самим телефоном</strong>: копия, размещённая на другом сайте или открытая как локальный файл, будет заблокирована правилами безопасности браузера.</li>
      <li><strong>Токен только для чтения</strong> — выдавайте его инструменту, которому нужно лишь читать ваши декоды и журнал.</li>
      <li><strong>Токен полного доступа</strong> — нужен только для управления передачей; относитесь к нему как к паролю. <strong>Создание заново</strong> немедленно делает старый недействительным и отключает все подключённые дополнения.</li>
      <li><strong>Разрешить удалённое управление передачей</strong> — отдельный переключатель, по умолчанию выключен. Только когда он включён, программа с токеном полного доступа может начинать и останавливать передачу; всё остальное доступно только для чтения, а передача произвольного текста намеренно не предоставляется вовсе.</li>
    </ul>`,
  third_api_warn: 'Любой в той же сети, кто получит ваш токен, сможет прочитать ваш журнал и настройки, поэтому <strong>включайте API только тогда, когда он нужен</strong>. Учётные данные внешних сервисов (Cloudlog, QRZ) никогда не раскрываются. Если порт уже занят другой программой, API не запустится, и об этом будет сказано на экране.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> — всемирный сервис карт прохождения. FT8TW отправляет отчёты о приёме автоматически, учётная запись не нужна. Включите <strong>Спот в PSK Reporter</strong> в Настройки → <strong>Выгрузка в сервисы</strong>. Ваш позывной, локатор и данные о принятых станциях передаются анонимно по HTTPS. Соседнее поле <strong>Антенна</strong> — свободное описание вашей антенны (например <code>Dipole</code>), которое уходит вместе с отчётами; это просто подпись для карты. Ниже переключатель <strong>Также сообщать модель трансивера</strong> добавляет в отчёты трансивер, выбранный в настройках радио, и он показывается рядом с названием программы (например <code>FT8TW 26.0902 (ICOM IC-705)</code>). По умолчанию он <strong>выключен</strong>: ваша аппаратура публикуется только после того, как вы сами его включите. Настройка хранится отдельно для каждого профиля радио.',
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

  third_api_title: 'API dla deweloperów (dodatki)',
  third_api_text:  'Włączenie <strong>API dla deweloperów</strong> w Ustawienia → <strong>Zaawansowane i deweloper</strong> uruchamia w telefonie niewielką usługę sieciową. Inne programy <strong>w tej samej sieci lokalnej</strong> mogą wtedy odczytywać zdekodowane wiadomości, dziennik, widmo i bieżący stan — tyle wystarczy, aby napisać własne dodatki i narzędzia. Po włączeniu na ekranie pojawia się adres dostępu.',
  third_api_list: `
    <ul>
      <li><strong>Konsola webowa</strong> — otwórz pokazany adres w przeglądarce na komputerze. To już nie jest sama demonstracja tego, co udostępnia API, lecz działająca konsola: lista dekodowanych wiadomości w tej samej kolejności co w telefonie, widmo, zakładka ustawień, zwijany pasek stanu oraz mapa rysująca kierunek na korespondenta. Ta strona <strong>musi być serwowana przez sam telefon</strong>; kopia umieszczona na innej witrynie lub otwarta jako plik lokalny zostanie zablokowana przez zabezpieczenia przeglądarki.</li>
      <li><strong>Token tylko do odczytu</strong> — przekaż go narzędziu, które ma jedynie czytać twoje dekodowania i dziennik.</li>
      <li><strong>Token pełnego dostępu</strong> — potrzebny wyłącznie do sterowania nadawaniem; traktuj go jak hasło. <strong>Wygenerowanie ponownie</strong> natychmiast unieważnia stary i rozłącza wszystkie podłączone dodatki.</li>
      <li><strong>Zezwól na zdalne sterowanie nadawaniem</strong> — osobny przełącznik, domyślnie wyłączony. Tylko gdy jest włączony, program z tokenem pełnego dostępu może rozpoczynać i zatrzymywać nadawanie; reszta pozostaje tylko do odczytu, a nadawanie tekstu dowolnego celowo nie jest udostępniane wcale.</li>
    </ul>`,
  third_api_warn: 'Każdy w tej samej sieci, kto zdobędzie twój token, może odczytać twój dziennik i ustawienia, dlatego lepiej <strong>włączać API tylko wtedy, gdy jest potrzebne</strong>. Dane logowania do usług zewnętrznych (Cloudlog, QRZ) nigdy nie są udostępniane. Jeśli port jest już zajęty przez inny program, API się nie uruchomi, a ekran o tym poinformuje.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> to światowy serwis map propagacji. FT8TW wysyła raporty odbioru automatycznie — konto nie jest potrzebne. Włącz <strong>Spot do PSK Reporter</strong> w Ustawienia → <strong>Wysyłanie do usług</strong>. Twój znak, lokator i dane odebranych stacji są przesyłane anonimowo przez HTTPS. Sąsiednie pole <strong>Antena</strong> to dowolny opis twojej anteny (np. <code>Dipole</code>) wysyłany razem z raportami; służy wyłącznie jako podpis na mapie. Poniżej przełącznik <strong>Zgłaszaj też model radia</strong> dodaje do raportów radio wybrane w ustawieniach radia, dzięki czemu pojawia się obok nazwy programu (na przykład <code>FT8TW 26.0902 (ICOM IC-705)</code>). Domyślnie jest <strong>wyłączony</strong> — Twój sprzęt jest publikowany dopiero po jego włączeniu — a ustawienie jest zapisywane osobno dla każdego profilu radia.',
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

  third_api_title: 'API para desarrolladores (complementos)',
  third_api_text:  'Al activar la <strong>API para desarrolladores</strong> en Ajustes → <strong>Avanzado y desarrollador</strong>, FT8TW levanta en el teléfono un pequeño servicio web. Otros programas <strong>de la misma red local</strong> pueden entonces leer las decodificaciones, el registro, el espectro y el estado actual, que es cuanto hace falta para crear tus propios complementos y herramientas. Al activarla se muestra en pantalla la dirección de acceso.',
  third_api_list: `
    <ul>
      <li><strong>Consola web</strong> — abre en el navegador del ordenador la dirección que aparece en pantalla. Ya no es una simple demostración de lo que ofrece la API, sino una consola operativa: la lista de decodificaciones en el mismo orden que en el teléfono, el espectro, una pestaña de ajustes, una barra de estado plegable y un mapa que dibuja la dirección hacia la estación con la que trabajas. Esa página <strong>tiene que servirla el propio teléfono</strong>; una copia alojada en otro sitio o abierta como archivo local será bloqueada por las reglas de seguridad del navegador.</li>
      <li><strong>Token de solo lectura</strong> — dáselo a la herramienta que únicamente necesita leer tus decodificaciones y tu registro.</li>
      <li><strong>Token de acceso completo</strong> — solo hace falta para controlar la transmisión; trátalo como una contraseña. <strong>Regenerarlo</strong> invalida el anterior de inmediato y desconecta todos los complementos conectados.</li>
      <li><strong>Permitir control remoto de transmisión</strong> — interruptor aparte, desactivado por defecto. Solo mientras está activado puede un programa con el token de acceso completo iniciar o detener la transmisión; todo lo demás es de solo lectura, y la transmisión de texto libre no se expone deliberadamente en absoluto.</li>
    </ul>`,
  third_api_warn: 'Cualquiera en la misma red que consiga tu token podrá leer tu registro y tus ajustes, así que conviene <strong>activar la API solo cuando la necesites</strong>. Las credenciales de servicios externos (Cloudlog, QRZ) nunca quedan expuestas. Si el puerto ya está ocupado por otro programa, la API no arrancará y la pantalla lo indicará.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> es un servicio mundial de mapas de propagación. FT8TW envía los informes de recepción automáticamente; no hace falta cuenta. Activa <strong>Reportar a PSK Reporter</strong> en Ajustes → <strong>Subida a servicios</strong>. Tu indicativo, tu localizador y los datos de las estaciones recibidas se envían de forma anónima por HTTPS. El campo <strong>Antena</strong> contiguo es una descripción libre de tu antena (por ejemplo <code>Dipole</code>) que viaja con los informes; es solo una etiqueta para el mapa. Debajo, <strong>Informar también mi modelo de radio</strong> añade a los informes el equipo que haya elegido en los ajustes de radio, de modo que aparece junto al nombre del programa (por ejemplo <code>FT8TW 26.0902 (ICOM IC-705)</code>). Está <strong>desactivado por defecto</strong>: su equipo solo se publica cuando usted lo activa, y el ajuste se guarda por perfil de radio.',
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

  third_api_title: 'API προγραμματιστή (πρόσθετα)',
  third_api_text:  'Ενεργοποιώντας το <strong>API προγραμματιστή</strong> στις Ρυθμίσεις → <strong>Για προχωρημένους</strong>, το FT8TW ξεκινά στο τηλέφωνο μια μικρή υπηρεσία web. Άλλα προγράμματα <strong>στο ίδιο τοπικό δίκτυο</strong> μπορούν έτσι να διαβάζουν αποκωδικοποιήσεις, το ημερολόγιο, το φάσμα και την τρέχουσα κατάσταση — αρκετά για να φτιάξετε τα δικά σας πρόσθετα και εργαλεία. Μόλις ενεργοποιηθεί, εμφανίζεται στην οθόνη η διεύθυνση πρόσβασης.',
  third_api_list: `
    <ul>
      <li><strong>Κονσόλα ιστού</strong> — ανοίξτε τη διεύθυνση που εμφανίζεται σε έναν browser στον υπολογιστή. Δεν είναι πια μια απλή επίδειξη του τι προσφέρει το API, αλλά μια λειτουργική κονσόλα: η λίστα αποκωδικοποιήσεων με την ίδια σειρά όπως στο τηλέφωνο, το φάσμα, καρτέλα ρυθμίσεων, συμπτυσσόμενη γραμμή κατάστασης και χάρτης που σχεδιάζει την κατεύθυνση προς τον σταθμό με τον οποίο εργάζεστε. Η σελίδα αυτή <strong>πρέπει να σερβίρεται από το ίδιο το τηλέφωνο</strong>· ένα αντίγραφο σε άλλον ιστότοπο ή ανοιγμένο ως τοπικό αρχείο θα μπλοκαριστεί από τους κανόνες ασφαλείας του browser.</li>
      <li><strong>Διακριτικό μόνο για ανάγνωση</strong> — δώστε το σε εργαλείο που χρειάζεται μόνο να διαβάζει τις αποκωδικοποιήσεις και το ημερολόγιό σας.</li>
      <li><strong>Διακριτικό πλήρους πρόσβασης</strong> — χρειάζεται μόνο για τον έλεγχο της εκπομπής· αντιμετωπίστε το σαν κωδικό. Η <strong>αναδημιουργία</strong> ακυρώνει αμέσως το παλιό και αποσυνδέει όλα τα συνδεδεμένα πρόσθετα.</li>
      <li><strong>Να επιτρέπεται ο απομακρυσμένος έλεγχος εκπομπής</strong> — ξεχωριστός διακόπτης, ανενεργός εξ ορισμού. Μόνο όσο είναι ενεργός μπορεί πρόγραμμα με το διακριτικό πλήρους πρόσβασης να ξεκινά ή να σταματά την εκπομπή· όλα τα υπόλοιπα είναι μόνο για ανάγνωση, ενώ η εκπομπή ελεύθερου κειμένου σκόπιμα δεν διατίθεται καθόλου.</li>
    </ul>`,
  third_api_warn: 'Οποιοσδήποτε στο ίδιο δίκτυο αποκτήσει το διακριτικό σας μπορεί να διαβάσει το ημερολόγιο και τις ρυθμίσεις σας, γι\' αυτό είναι προτιμότερο να <strong>ενεργοποιείτε το API μόνο όταν το χρειάζεστε</strong>. Τα διαπιστευτήρια εξωτερικών υπηρεσιών (Cloudlog, QRZ) δεν εκτίθενται ποτέ. Αν η θύρα χρησιμοποιείται ήδη από άλλο πρόγραμμα, το API δεν θα ξεκινήσει και η οθόνη θα το αναφέρει.',

  third_psk_title: 'PSKReporter',
  third_psk_text:  'Το <a href="https://pskreporter.info" target="_blank">PSKReporter</a> είναι παγκόσμια υπηρεσία χαρτογράφησης διάδοσης. Το FT8TW υποβάλλει αναφορές λήψης αυτόματα — δεν χρειάζεται λογαριασμός. Ενεργοποιήστε το <strong>Spot σε PSK Reporter</strong> στις Ρυθμίσεις → <strong>Μεταφόρτωση σε υπηρεσίες</strong>. Το διακριτικό σας, το τετράγωνό σας και τα δεδομένα των σταθμών που λάβατε υποβάλλονται ανώνυμα μέσω HTTPS. Το διπλανό πεδίο <strong>Κεραία</strong> είναι μια ελεύθερη περιγραφή της κεραίας σας (π.χ. <code>Dipole</code>) που στέλνεται μαζί με τις αναφορές· είναι απλώς μια ετικέτα για τον χάρτη. Από κάτω, η επιλογή <strong>Αποστολή και του μοντέλου του πομποδέκτη</strong> προσθέτει στις αναφορές τον πομποδέκτη που επιλέξατε στις ρυθμίσεις, ώστε να εμφανίζεται δίπλα στο όνομα του προγράμματος (για παράδειγμα <code>FT8TW 26.0902 (ICOM IC-705)</code>). Είναι <strong>απενεργοποιημένη από προεπιλογή</strong>: ο εξοπλισμός σας δημοσιεύεται μόνο αφού την ενεργοποιήσετε, και η ρύθμιση αποθηκεύεται ανά προφίλ πομποδέκτη.',
},

}; /* end PAGE_T */
