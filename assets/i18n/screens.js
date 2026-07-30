/* ── FT8TW User Manual – i18n: Main Screens ──────────────────────── */

const PAGE_T = {

en: {
  screens_title: 'Main Screens',
  screens_intro: 'The bottom navigation bar gives access to the main operating tabs. Additional screens for JS8, WSPR, SSB, and the grid tracker are described in their own sections below.',

  screens_decode_title:       'Decode Tab',
  screens_decode_text:        'The app\'s default screen on launch, and its primary operating screen. Shows every decoded FT8/FT4 message from the current cycle in chronological order. Stations calling CQ are highlighted; tap a row to select that station as your call target. Each row shows callsign, signal level (dB), time offset (Δt), audio frequency (Hz), Maidenhead grid, distance, and country/location.',
  screens_decode_modes_label: 'List display modes:',
  screens_decode_modes: `
    <ul>
      <li><strong>Standard</strong> – Full details per row</li>
      <li><strong>Simple</strong> – Compact, single-line layout</li>
    </ul>
    <p>Decode sensitivity (Fast / Standard / Deep) is a separate setting — see <a href="settings.html">Settings Reference</a>.</p>`,

  screens_calling_title: 'Calling Tab',
  screens_calling_text:  'Your transmit control panel. Displays the current target callsign, TX audio frequency, cycle sequence counter, and QSO/message counts. Start and stop transmitting from this tab.',
  screens_calling_features: `
    <ul>
      <li><strong>TX Freq</strong> – Your transmit audio frequency in Hz (valid range: 0–2900 Hz; default 1500 Hz)</li>
      <li><strong>Locked TX=RX</strong> – TX frequency follows the selected station's frequency</li>
      <li><strong>Tx/Rx Split</strong> – TX and RX use independent frequencies</li>
      <li><strong>CQ Modifier</strong> – Append a geographic or activity modifier to your CQ (e.g., <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Free Text</strong> – Send a custom free-text message (max 13 characters)</li>
      <li><strong>Auto response CQ</strong> – Automatically reply to CQ calls; configure priority in Settings</li>
    </ul>`,

  screens_logs_title: 'QSO Logs Tab',
  screens_logs_text:  'A chronological list of all completed QSOs. Each entry shows callsign, band, mode, date/time (UTC), grid, RST reports, and confirmation status (Unconfirmed / LoTW / QRZ / Manual). Tap an entry to view full details or confirm the contact.',

  screens_settings_title: 'Settings Tab',
  screens_settings_text:  'All configuration options for your station, radio interface, decoding, logging, and third-party integrations. See the Settings Reference section for a complete list.',

  screens_more_title: 'Other Screens',
  screens_more_text:  'Beyond the core FT8/FT4 tabs, FT8TW includes several additional screens, accessible from the navigation menu or the floating shortcut window:',
  screens_more_list: `
    <ul>
      <li><strong>Spectrum</strong> – Live waterfall and spectrum display of the receive audio, with adjustable color scheme and noise-floor-anchored contrast; also shows your own transmit audio during TX.</li>
      <li><strong>JS8</strong> – Chat-style conversation screen for JS8 mode. See the <a href="js8.html">JS8 Chat Mode</a> section.</li>
      <li><strong>WSPR</strong> – Beacon scheduling screen for WSPR mode. See the <a href="wspr.html">WSPR Beacon</a> section.</li>
      <li><strong>SSB</strong> – Push-to-talk voice screen. See the <a href="ssb.html">SSB Voice</a> section.</li>
      <li><strong>Grid Tracker</strong> – Full-screen map view. See the <a href="gridtracker.html">Grid Tracker</a> section.</li>
      <li><strong>Count</strong> – QSO statistics: totals by band, mode, DXCC, ITU/CQ zone, and time period.</li>
      <li><strong>QRZ.com Lookup</strong> – Embedded QRZ.com callsign lookup for the currently selected station.</li>
      <li><strong>Floating Window</strong> – An optional always-on-top overlay with quick-access buttons (frequency, volume, grid tracker, and more), independently toggleable per button in Settings.</li>
    </ul>`,
},

'zh-TW': {
  screens_title: '主要畫面',
  screens_intro: '底部導覽列可切換主要操作分頁；JS8、WSPR、SSB 及網格追蹤地圖等畫面在下方各有獨立章節說明。',

  screens_decode_title:       '解碼（Decode）',
  screens_decode_text:        'App 開啟後預設顯示的主要操作畫面。依時序顯示目前週期內解碼到的所有 FT8/FT4 訊息，正在呼叫 CQ 的電台會特別標示，點選任一列即可選定為呼叫目標。每一列顯示呼號、訊號強度（dB）、時間偏差（Δt）、音訊頻率（Hz）、Maidenhead 網格、距離及國家地點。',
  screens_decode_modes_label: '清單顯示模式：',
  screens_decode_modes: `
    <ul>
      <li><strong>標準</strong> — 每列顯示完整資訊</li>
      <li><strong>精簡</strong> — 單行精簡版面</li>
    </ul>
    <p>解碼靈敏度（快速 / 標準 / 多次）是另一項獨立設定，詳見<a href="settings.html">「設定說明」</a>。</p>`,

  screens_calling_title: '呼叫（Calling）',
  screens_calling_text:  '發射控制面板，顯示目標呼號、發射音訊頻率、週期序號計數及 QSO / 訊息數量。在此頁面啟動及停止發射。',
  screens_calling_features: `
    <ul>
      <li><strong>發射頻率（TX Freq）</strong> — 發射音訊頻率（有效範圍：0–2900 Hz，預設 1500 Hz）</li>
      <li><strong>同頻發射</strong> — 發射頻率跟隨選定電台的接收頻率</li>
      <li><strong>異頻發射</strong> — 發射與接收使用各自獨立的頻率</li>
      <li><strong>CQ 對象</strong> — 在 CQ 呼叫後附加地理或活動修飾詞（如 <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>自定義訊息</strong> — 發送最多 13 個字元的自由文字</li>
      <li><strong>自動回應 CQ</strong> — 自動回應收到的 CQ，優先策略可在設置中設定</li>
    </ul>`,

  screens_logs_title: '通聯記錄（QSO Logs）',
  screens_logs_text:  '依時序顯示所有已完成的通聯記錄。每筆包含呼號、頻段、模式、UTC 時間、網格、RST 報告及確認狀態（未確認 / LoTW / QRZ / 手工確認）。點選記錄可查看詳情或確認通聯。',

  screens_settings_title: '設置（Settings）',
  screens_settings_text:  '包含電台資訊、電台連線、解碼、日誌、第三方整合等所有設定選項。詳細說明請參閱「設定說明」章節。',

  screens_more_title: '其他畫面',
  screens_more_text:  '除了核心的 FT8/FT4 分頁之外，FT8TW 還有下列畫面，可從導覽選單或浮動快捷視窗開啟：',
  screens_more_list: `
    <ul>
      <li><strong>頻譜（Spectrum）</strong> — 即時顯示接收音訊的瀑布圖與頻譜，色階可切換，黑點錨定雜訊地板以維持對比；發射時也會顯示自己的發射音訊。</li>
      <li><strong>JS8</strong> — JS8 模式的聊天式對話畫面，詳見<a href="js8.html">「JS8 聊天模式」</a>章節。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信標排程畫面，詳見<a href="wspr.html">「WSPR 信標」</a>章節。</li>
      <li><strong>SSB</strong> — 按住通話語音畫面，詳見<a href="ssb.html">「SSB 語音」</a>章節。</li>
      <li><strong>網格追蹤（Grid Tracker）</strong> — 全螢幕地圖畫面，詳見<a href="gridtracker.html">「網格追蹤地圖」</a>章節。</li>
      <li><strong>統計（Count）</strong> — 依頻段、模式、DXCC、ITU/CQ 分區及時間區間統計 QSO 數量。</li>
      <li><strong>QRZ.com 查詢</strong> — 內嵌 QRZ.com 呼號查詢，顯示目前選定電台的資料。</li>
      <li><strong>浮動視窗</strong> — 可選的常駐懸浮功能表（頻率、音量、網格追蹤等快捷按鈕），每個按鈕可在設置中個別開關。</li>
    </ul>`,
},

'zh-CN': {
  screens_title: '主要界面',
  screens_intro: '底部导航栏可切换主要操作分页；JS8、WSPR、SSB 及网格追踪地图等界面在下方各有独立章节说明。',

  screens_decode_title:       '解码（Decode）',
  screens_decode_text:        'App 打开后默认显示的主要操作界面。按时序显示当前周期内解码到的所有 FT8/FT4 消息，正在呼叫 CQ 的电台会特别标示，点击任一行即可选定为呼叫目标。每一行显示呼号、信号强度（dB）、时间偏差（Δt）、音频频率（Hz）、Maidenhead 网格、距离及国家地点。',
  screens_decode_modes_label: '列表显示模式：',
  screens_decode_modes: `
    <ul>
      <li><strong>标准</strong> — 每行显示完整信息</li>
      <li><strong>精简</strong> — 单行精简版面</li>
    </ul>
    <p>解码灵敏度（快速 / 标准 / 多次）是另一项独立设置，详见<a href="settings.html">「设置说明」</a>。</p>`,

  screens_calling_title: '呼叫（Calling）',
  screens_calling_text:  '发射控制面板，显示目标呼号、发射音频频率、周期序号计数及 QSO / 消息数量。在此页面启动及停止发射。',
  screens_calling_features: `
    <ul>
      <li><strong>发射频率（TX Freq）</strong> — 发射音频频率（有效范围：0–2900 Hz，默认 1500 Hz）</li>
      <li><strong>同频发射</strong> — 发射频率跟随选定电台的接收频率</li>
      <li><strong>异频发射</strong> — 发射与接收使用各自独立的频率</li>
      <li><strong>CQ 对象</strong> — 在 CQ 呼叫后附加地理或活动修饰词（如 <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>自定义消息</strong> — 发送最多 13 个字符的自由文本</li>
      <li><strong>自动回应 CQ</strong> — 自动回应收到的 CQ，优先策略可在设置中设定</li>
    </ul>`,

  screens_logs_title: '通联日志（QSO Logs）',
  screens_logs_text:  '按时序显示所有已完成的通联记录。每条包含呼号、频段、模式、UTC 时间、网格、RST 报告及确认状态（未确认 / LoTW / QRZ / 手工确认）。点击记录可查看详情或确认通联。',

  screens_settings_title: '设置（Settings）',
  screens_settings_text:  '包含电台信息、电台连接、解码、日志、第三方集成等所有设置选项。详细说明请参阅「设置说明」章节。',

  screens_more_title: '其他界面',
  screens_more_text:  '除了核心的 FT8/FT4 分页之外，FT8TW 还有下列界面，可从导航菜单或悬浮快捷窗口打开：',
  screens_more_list: `
    <ul>
      <li><strong>频谱（Spectrum）</strong> — 实时显示接收音频的瀑布图与频谱，色阶可切换，黑点锚定噪声基底以维持对比；发射时也会显示自己的发射音频。</li>
      <li><strong>JS8</strong> — JS8 模式的聊天式对话界面，详见<a href="js8.html">「JS8 聊天模式」</a>章节。</li>
      <li><strong>WSPR</strong> — WSPR 模式的信标计划界面，详见<a href="wspr.html">「WSPR 信标」</a>章节。</li>
      <li><strong>SSB</strong> — 按住通话语音界面，详见<a href="ssb.html">「SSB 语音」</a>章节。</li>
      <li><strong>网格追踪（Grid Tracker）</strong> — 全屏地图界面，详见<a href="gridtracker.html">「网格追踪地图」</a>章节。</li>
      <li><strong>统计（Count）</strong> — 按频段、模式、DXCC、ITU/CQ 分区及时间区间统计 QSO 数量。</li>
      <li><strong>QRZ.com 查询</strong> — 内嵌 QRZ.com 呼号查询，显示当前选定电台的资料。</li>
      <li><strong>悬浮窗口</strong> — 可选的常驻悬浮菜单（频率、音量、网格追踪等快捷按钮），每个按钮可在设置中单独开关。</li>
    </ul>`,
},

'ja': {
  screens_title: '主な画面',
  screens_intro: '画面下部のナビゲーションバーから主要な操作タブに移動できます。JS8、WSPR、SSB、グリッドトラッカーの画面については、それぞれ後の章で説明します。',

  screens_decode_title:       'デコードタブ',
  screens_decode_text:        '起動時に最初に表示される、いちばんよく使う画面です。今のサイクルでデコードした FT8/FT4 の電文を時系列で表示します。CQ を出している局は強調表示され、行をタップするとその局を呼び出し相手に指定できます。各行にはコールサイン、信号強度（dB）、時間差（Δt）、音声周波数（Hz）、Maidenhead グリッド、距離、国や地域が表示されます。',
  screens_decode_modes_label: '一覧の表示モード:',
  screens_decode_modes: `
    <ul>
      <li><strong>標準</strong> — 1 行に詳細をすべて表示</li>
      <li><strong>簡易</strong> — 1 行にまとめたコンパクト表示</li>
    </ul>
    <p>デコード感度（高速 / 標準 / 多回）は別の設定項目です。<a href="settings.html">設定リファレンス</a>を参照してください。</p>`,

  screens_calling_title: '呼び出しタブ',
  screens_calling_text:  '送信の操作パネルです。現在の相手局、送信音声周波数、サイクルのシーケンス番号、交信数と電文数を表示します。送信の開始と停止もこのタブで行います。',
  screens_calling_features: `
    <ul>
      <li><strong>送信周波数（TX Freq）</strong> — 送信音声周波数（有効範囲 0〜2900 Hz、既定 1500 Hz）</li>
      <li><strong>同一周波数送信</strong> — 選んだ局の受信周波数に送信周波数を合わせます</li>
      <li><strong>スプリット送信</strong> — 送信と受信で別々の周波数を使います</li>
      <li><strong>CQ の対象</strong> — CQ に地域や運用の識別語を付けます（例: <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>フリーテキスト</strong> — 最大 13 文字の自由な電文を送ります</li>
      <li><strong>CQ 自動応答</strong> — 受信した CQ に自動応答します。優先条件は設定で指定します</li>
    </ul>`,

  screens_logs_title: '交信ログタブ',
  screens_logs_text:  '完了した交信を時系列で一覧表示します。各項目にはコールサイン、バンド、モード、日時（UTC）、グリッド、RST レポート、確認状況（未確認 / LoTW / QRZ / 手動）が表示されます。項目をタップすると詳細の確認や交信の確認ができます。',

  screens_settings_title: '設定タブ',
  screens_settings_text:  '自局情報、無線機インターフェース、デコード、ログ、外部サービス連携など、すべての設定項目があります。詳しい一覧は設定リファレンスの章をご覧ください。',

  screens_more_title: 'その他の画面',
  screens_more_text:  'FT8/FT4 の主要タブのほかに、ナビゲーションメニューまたはフローティングショートカットから開ける画面があります:',
  screens_more_list: `
    <ul>
      <li><strong>スペクトラム</strong> — 受信音声のウォーターフォールとスペクトラムをリアルタイム表示します。配色は切り替え可能で、暗部はノイズフロアを基準にコントラストを保ちます。送信中は自局の送信音声も表示します。</li>
      <li><strong>JS8</strong> — JS8 モードのチャット画面。<a href="js8.html">JS8 チャットモード</a>の章を参照してください。</li>
      <li><strong>WSPR</strong> — WSPR のビーコン予約画面。<a href="wspr.html">WSPR ビーコン</a>の章を参照してください。</li>
      <li><strong>SSB</strong> — プレストークの音声画面。<a href="ssb.html">SSB 音声</a>の章を参照してください。</li>
      <li><strong>グリッドトラッカー</strong> — 全画面の地図表示。<a href="gridtracker.html">グリッドトラッカー</a>の章を参照してください。</li>
      <li><strong>統計</strong> — バンド、モード、DXCC、ITU/CQ ゾーン、期間ごとの交信数を集計します。</li>
      <li><strong>QRZ.com 検索</strong> — 選択中の局について QRZ.com のコールサイン検索を内蔵表示します。</li>
      <li><strong>フローティングウィンドウ</strong> — 常に手前に表示できる任意のオーバーレイで、周波数・音量・グリッドトラッカーなどのボタンを備えます。ボタンごとに設定で表示/非表示を切り替えられます。</li>
    </ul>`,
},

'ru': {
  screens_title: 'Основные экраны',
  screens_intro: 'Нижняя панель навигации открывает основные рабочие вкладки. Экраны JS8, WSPR, SSB и карты локаторов описаны в отдельных разделах ниже.',

  screens_decode_title:       'Вкладка декодера',
  screens_decode_text:        'Экран, который открывается при запуске, — основной рабочий. Показывает все декодированные сообщения FT8/FT4 текущего цикла в хронологическом порядке. Станции, дающие CQ, выделяются; нажмите на строку, чтобы выбрать станцию для вызова. В строке видны позывной, уровень сигнала (дБ), смещение времени (Δt), звуковая частота (Гц), локатор Maidenhead, расстояние и страна или местность.',
  screens_decode_modes_label: 'Режимы отображения списка:',
  screens_decode_modes: `
    <ul>
      <li><strong>Стандартный</strong> — полные сведения в каждой строке</li>
      <li><strong>Простой</strong> — компактный однострочный вид</li>
    </ul>
    <p>Чувствительность декодирования (быстро / стандарт / глубоко) — отдельная настройка, см. <a href="settings.html">описание настроек</a>.</p>`,

  screens_calling_title: 'Вкладка вызова',
  screens_calling_text:  'Панель управления передачей. Показывает текущий позывной корреспондента, звуковую частоту передачи, счётчик циклов и количество QSO и сообщений. Отсюда же передача запускается и останавливается.',
  screens_calling_features: `
    <ul>
      <li><strong>Частота передачи</strong> — звуковая частота передачи в Гц (рабочий диапазон 0–2900 Гц, по умолчанию 1500 Гц)</li>
      <li><strong>TX=RX</strong> — частота передачи следует за частотой выбранной станции</li>
      <li><strong>Раздельные TX/RX</strong> — передача и приём на независимых частотах</li>
      <li><strong>Уточнение CQ</strong> — добавляет к вызову географическое или тематическое уточнение (например, <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Свободный текст</strong> — отправка собственного сообщения (до 13 символов)</li>
      <li><strong>Автоответ на CQ</strong> — автоматический ответ на вызовы CQ; приоритет задаётся в настройках</li>
    </ul>`,

  screens_logs_title: 'Вкладка журнала',
  screens_logs_text:  'Хронологический список всех завершённых связей. В каждой записи видны позывной, диапазон, вид работы, дата и время (UTC), локатор, рапорты RST и статус подтверждения (не подтверждено / LoTW / QRZ / вручную). Нажмите запись, чтобы открыть подробности или подтвердить связь.',

  screens_settings_title: 'Вкладка настроек',
  screens_settings_text:  'Все параметры вашей станции, интерфейса с трансивером, декодирования, журнала и внешних сервисов. Полный перечень — в разделе описания настроек.',

  screens_more_title: 'Другие экраны',
  screens_more_text:  'Помимо основных вкладок FT8/FT4, в FT8TW есть дополнительные экраны, доступные из меню навигации или плавающего окна:',
  screens_more_list: `
    <ul>
      <li><strong>Спектр</strong> — водопад и спектр принимаемого звука в реальном времени, с выбором цветовой схемы и контрастом, привязанным к уровню шума; во время передачи показывает и ваш сигнал.</li>
      <li><strong>JS8</strong> — экран чата для режима JS8. См. раздел <a href="js8.html">Режим чата JS8</a>.</li>
      <li><strong>WSPR</strong> — экран расписания маяка. См. раздел <a href="wspr.html">Маяк WSPR</a>.</li>
      <li><strong>SSB</strong> — экран голосовой работы с кнопкой передачи. См. раздел <a href="ssb.html">Голос SSB</a>.</li>
      <li><strong>Карта локаторов</strong> — полноэкранная карта. См. раздел <a href="gridtracker.html">Карта локаторов</a>.</li>
      <li><strong>Статистика</strong> — количество QSO по диапазонам, видам работы, DXCC, зонам ITU/CQ и периодам.</li>
      <li><strong>Поиск на QRZ.com</strong> — встроенный поиск позывного выбранной станции.</li>
      <li><strong>Плавающее окно</strong> — необязательный слой поверх других приложений с кнопками быстрого доступа (частота, громкость, карта локаторов и др.); каждую кнопку можно включить или выключить в настройках.</li>
    </ul>`,
},

'pl': {
  screens_title: 'Główne ekrany',
  screens_intro: 'Dolny pasek nawigacji daje dostęp do głównych zakładek pracy. Ekrany JS8, WSPR, SSB oraz mapy lokatorów opisano w osobnych rozdziałach poniżej.',

  screens_decode_title:       'Zakładka dekodowania',
  screens_decode_text:        'Ekran otwierany po uruchomieniu aplikacji i podstawowy ekran pracy. Pokazuje w kolejności chronologicznej wszystkie zdekodowane wiadomości FT8/FT4 z bieżącego cyklu. Stacje wywołujące CQ są wyróżnione; dotknij wiersza, aby wybrać stację do wywołania. W wierszu widać znak wywoławczy, poziom sygnału (dB), przesunięcie czasu (Δt), częstotliwość akustyczną (Hz), lokator Maidenhead, odległość oraz kraj lub miejsce.',
  screens_decode_modes_label: 'Tryby wyświetlania listy:',
  screens_decode_modes: `
    <ul>
      <li><strong>Standardowy</strong> — pełne dane w każdym wierszu</li>
      <li><strong>Uproszczony</strong> — zwarty układ jednowierszowy</li>
    </ul>
    <p>Czułość dekodowania (szybko / standardowo / głęboko) to osobne ustawienie — zobacz <a href="settings.html">opis ustawień</a>.</p>`,

  screens_calling_title: 'Zakładka wywołania',
  screens_calling_text:  'Panel sterowania nadawaniem. Pokazuje aktualny znak stacji docelowej, częstotliwość akustyczną nadawania, licznik cykli oraz liczbę łączności i wiadomości. Stąd też uruchamia się i zatrzymuje nadawanie.',
  screens_calling_features: `
    <ul>
      <li><strong>Częstotliwość nadawania</strong> — akustyczna częstotliwość nadawania w Hz (zakres 0–2900 Hz, domyślnie 1500 Hz)</li>
      <li><strong>TX=RX</strong> — częstotliwość nadawania podąża za częstotliwością wybranej stacji</li>
      <li><strong>Split TX/RX</strong> — nadawanie i odbiór na niezależnych częstotliwościach</li>
      <li><strong>Dopisek do CQ</strong> — dodaje do wywołania określenie geograficzne lub tematyczne (np. <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Dowolny tekst</strong> — wysyła własną wiadomość (do 13 znaków)</li>
      <li><strong>Automatyczna odpowiedź na CQ</strong> — automatycznie odpowiada na wywołania CQ; priorytet ustawia się w ustawieniach</li>
    </ul>`,

  screens_logs_title: 'Zakładka dziennika',
  screens_logs_text:  'Chronologiczna lista wszystkich zakończonych łączności. Każdy wpis pokazuje znak wywoławczy, pasmo, emisję, datę i godzinę (UTC), lokator, raporty RST oraz status potwierdzenia (niepotwierdzone / LoTW / QRZ / ręcznie). Dotknij wpisu, aby zobaczyć szczegóły lub potwierdzić łączność.',

  screens_settings_title: 'Zakładka ustawień',
  screens_settings_text:  'Wszystkie opcje konfiguracji stacji, interfejsu radia, dekodowania, dziennika i usług zewnętrznych. Pełny wykaz znajduje się w rozdziale z opisem ustawień.',

  screens_more_title: 'Pozostałe ekrany',
  screens_more_text:  'Poza podstawowymi zakładkami FT8/FT4 FT8TW ma kilka dodatkowych ekranów dostępnych z menu nawigacji lub z okna pływającego:',
  screens_more_list: `
    <ul>
      <li><strong>Widmo</strong> — wodospad i widmo odbieranego dźwięku na żywo, z wyborem palety barw i kontrastem odniesionym do poziomu szumów; w czasie nadawania pokazuje także własny sygnał.</li>
      <li><strong>JS8</strong> — ekran rozmowy w trybie JS8. Zobacz rozdział <a href="js8.html">Tryb czatu JS8</a>.</li>
      <li><strong>WSPR</strong> — ekran harmonogramu latarni. Zobacz rozdział <a href="wspr.html">Latarnia WSPR</a>.</li>
      <li><strong>SSB</strong> — ekran pracy głosem z przyciskiem nadawania. Zobacz rozdział <a href="ssb.html">Głos SSB</a>.</li>
      <li><strong>Mapa lokatorów</strong> — pełnoekranowa mapa. Zobacz rozdział <a href="gridtracker.html">Mapa lokatorów</a>.</li>
      <li><strong>Statystyki</strong> — liczba łączności według pasm, emisji, DXCC, stref ITU/CQ i okresów.</li>
      <li><strong>Wyszukiwanie QRZ.com</strong> — wbudowane wyszukiwanie znaku wybranej stacji.</li>
      <li><strong>Okno pływające</strong> — opcjonalna nakładka zawsze na wierzchu z przyciskami szybkiego dostępu (częstotliwość, głośność, mapa lokatorów i inne); każdy przycisk można osobno włączyć w ustawieniach.</li>
    </ul>`,
},

'es': {
  screens_title: 'Pantallas principales',
  screens_intro: 'La barra de navegación inferior da acceso a las pestañas principales de trabajo. Las pantallas de JS8, WSPR, SSB y el mapa de localizadores se describen en sus propias secciones más abajo.',

  screens_decode_title:       'Pestaña de decodificación',
  screens_decode_text:        'Es la pantalla que aparece al abrir la aplicación y su pantalla principal de trabajo. Muestra en orden cronológico todos los mensajes FT8/FT4 decodificados del ciclo actual. Las estaciones que llaman CQ aparecen resaltadas; pulsa una fila para elegir esa estación como destino de tu llamada. Cada fila muestra indicativo, nivel de señal (dB), desfase temporal (Δt), frecuencia de audio (Hz), localizador Maidenhead, distancia y país o ubicación.',
  screens_decode_modes_label: 'Modos de presentación de la lista:',
  screens_decode_modes: `
    <ul>
      <li><strong>Estándar</strong> — todos los datos en cada fila</li>
      <li><strong>Sencillo</strong> — presentación compacta de una sola línea</li>
    </ul>
    <p>La sensibilidad de decodificación (rápida / estándar / profunda) es un ajuste aparte; consulta la <a href="settings.html">referencia de ajustes</a>.</p>`,

  screens_calling_title: 'Pestaña de llamada',
  screens_calling_text:  'Tu panel de control de transmisión. Muestra el indicativo de destino, la frecuencia de audio de transmisión, el contador de secuencia del ciclo y el número de QSO y mensajes. Desde aquí se inicia y se detiene la transmisión.',
  screens_calling_features: `
    <ul>
      <li><strong>Frecuencia de TX</strong> — frecuencia de audio de transmisión en Hz (rango válido 0–2900 Hz; 1500 Hz por defecto)</li>
      <li><strong>TX=RX</strong> — la frecuencia de transmisión sigue a la de la estación seleccionada</li>
      <li><strong>Split TX/RX</strong> — transmisión y recepción en frecuencias independientes</li>
      <li><strong>Modificador de CQ</strong> — añade a tu CQ un modificador geográfico o de actividad (por ejemplo, <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Texto libre</strong> — envía un mensaje propio (máximo 13 caracteres)</li>
      <li><strong>Respuesta automática a CQ</strong> — contesta automáticamente a las llamadas CQ; la prioridad se configura en Ajustes</li>
    </ul>`,

  screens_logs_title: 'Pestaña de registro',
  screens_logs_text:  'Lista cronológica de todos los QSO completados. Cada entrada muestra indicativo, banda, modo, fecha y hora (UTC), localizador, informes RST y estado de confirmación (sin confirmar / LoTW / QRZ / manual). Pulsa una entrada para ver todos los detalles o confirmar el contacto.',

  screens_settings_title: 'Pestaña de ajustes',
  screens_settings_text:  'Todas las opciones de configuración de tu estación, la interfaz con el equipo, la decodificación, el registro y los servicios externos. Consulta la sección de referencia de ajustes para ver la lista completa.',

  screens_more_title: 'Otras pantallas',
  screens_more_text:  'Además de las pestañas básicas de FT8/FT4, FT8TW incluye varias pantallas adicionales, accesibles desde el menú de navegación o desde la ventana flotante:',
  screens_more_list: `
    <ul>
      <li><strong>Espectro</strong> — cascada y espectro en vivo del audio recibido, con paleta de color ajustable y contraste anclado al nivel de ruido; durante la transmisión también muestra tu propio audio.</li>
      <li><strong>JS8</strong> — pantalla de conversación del modo JS8. Consulta la sección <a href="js8.html">Modo chat JS8</a>.</li>
      <li><strong>WSPR</strong> — pantalla de programación de la baliza. Consulta la sección <a href="wspr.html">Baliza WSPR</a>.</li>
      <li><strong>SSB</strong> — pantalla de voz con pulsar para hablar. Consulta la sección <a href="ssb.html">Voz SSB</a>.</li>
      <li><strong>Mapa de localizadores</strong> — vista de mapa a pantalla completa. Consulta la sección <a href="gridtracker.html">Mapa de localizadores</a>.</li>
      <li><strong>Estadísticas</strong> — totales de QSO por banda, modo, DXCC, zona ITU/CQ y periodo.</li>
      <li><strong>Búsqueda en QRZ.com</strong> — búsqueda integrada del indicativo de la estación seleccionada.</li>
      <li><strong>Ventana flotante</strong> — capa opcional siempre visible con botones de acceso rápido (frecuencia, volumen, mapa de localizadores y más); cada botón se activa por separado en Ajustes.</li>
    </ul>`,
},

'el': {
  screens_title: 'Κύριες οθόνες',
  screens_intro: 'Η κάτω γραμμή πλοήγησης δίνει πρόσβαση στις βασικές καρτέλες λειτουργίας. Οι οθόνες JS8, WSPR, SSB και του χάρτη τετραγώνων περιγράφονται σε δικά τους κεφάλαια παρακάτω.',

  screens_decode_title:       'Καρτέλα αποκωδικοποίησης',
  screens_decode_text:        'Είναι η οθόνη που εμφανίζεται με την εκκίνηση και η κύρια οθόνη λειτουργίας. Δείχνει με χρονολογική σειρά όλα τα μηνύματα FT8/FT4 που αποκωδικοποιήθηκαν στον τρέχοντα κύκλο. Οι σταθμοί που καλούν CQ επισημαίνονται· πατήστε μια γραμμή για να επιλέξετε τον σταθμό ως στόχο κλήσης. Κάθε γραμμή δείχνει διακριτικό, στάθμη σήματος (dB), χρονική απόκλιση (Δt), συχνότητα ήχου (Hz), τετράγωνο Maidenhead, απόσταση και χώρα ή τοποθεσία.',
  screens_decode_modes_label: 'Τρόποι εμφάνισης λίστας:',
  screens_decode_modes: `
    <ul>
      <li><strong>Τυπικός</strong> — πλήρη στοιχεία σε κάθε γραμμή</li>
      <li><strong>Απλός</strong> — συμπαγής διάταξη μίας γραμμής</li>
    </ul>
    <p>Η ευαισθησία αποκωδικοποίησης (γρήγορη / τυπική / βαθιά) είναι ξεχωριστή ρύθμιση — δείτε τον <a href="settings.html">οδηγό ρυθμίσεων</a>.</p>`,

  screens_calling_title: 'Καρτέλα κλήσης',
  screens_calling_text:  'Ο πίνακας ελέγχου εκπομπής. Εμφανίζει το τρέχον διακριτικό στόχου, τη συχνότητα ήχου εκπομπής, τον μετρητή κύκλων και το πλήθος επαφών και μηνυμάτων. Από εδώ ξεκινά και σταματά η εκπομπή.',
  screens_calling_features: `
    <ul>
      <li><strong>Συχνότητα εκπομπής</strong> — συχνότητα ήχου εκπομπής σε Hz (έγκυρο εύρος 0–2900 Hz, προεπιλογή 1500 Hz)</li>
      <li><strong>TX=RX</strong> — η συχνότητα εκπομπής ακολουθεί τη συχνότητα του επιλεγμένου σταθμού</li>
      <li><strong>Split TX/RX</strong> — εκπομπή και λήψη σε ανεξάρτητες συχνότητες</li>
      <li><strong>Προσδιορισμός CQ</strong> — προσθέτει γεωγραφικό ή θεματικό προσδιορισμό στην κλήση σας (π.χ. <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Ελεύθερο κείμενο</strong> — αποστολή δικού σας μηνύματος (έως 13 χαρακτήρες)</li>
      <li><strong>Αυτόματη απάντηση σε CQ</strong> — απαντά αυτόματα σε κλήσεις CQ· η προτεραιότητα ορίζεται στις Ρυθμίσεις</li>
    </ul>`,

  screens_logs_title: 'Καρτέλα ημερολογίου',
  screens_logs_text:  'Χρονολογική λίστα όλων των ολοκληρωμένων επαφών. Κάθε εγγραφή δείχνει διακριτικό, μπάντα, τρόπο λειτουργίας, ημερομηνία και ώρα (UTC), τετράγωνο, αναφορές RST και κατάσταση επιβεβαίωσης (ανεπιβεβαίωτη / LoTW / QRZ / χειροκίνητη). Πατήστε μια εγγραφή για πλήρη στοιχεία ή για επιβεβαίωση.',

  screens_settings_title: 'Καρτέλα ρυθμίσεων',
  screens_settings_text:  'Όλες οι επιλογές διαμόρφωσης για τον σταθμό σας, τη διεπαφή με τον πομποδέκτη, την αποκωδικοποίηση, το ημερολόγιο και τις εξωτερικές υπηρεσίες. Πλήρης κατάλογος στο κεφάλαιο του οδηγού ρυθμίσεων.',

  screens_more_title: 'Άλλες οθόνες',
  screens_more_text:  'Πέρα από τις βασικές καρτέλες FT8/FT4, το FT8TW περιλαμβάνει και άλλες οθόνες, προσβάσιμες από το μενού πλοήγησης ή από το αιωρούμενο παράθυρο:',
  screens_more_list: `
    <ul>
      <li><strong>Φάσμα</strong> — ζωντανή προβολή καταρράκτη και φάσματος του ήχου λήψης, με εναλλάξιμη χρωματική κλίμακα και αντίθεση αγκυρωμένη στο επίπεδο θορύβου· κατά την εκπομπή δείχνει και τον δικό σας ήχο.</li>
      <li><strong>JS8</strong> — οθόνη συνομιλίας για τη λειτουργία JS8. Δείτε το κεφάλαιο <a href="js8.html">Λειτουργία συνομιλίας JS8</a>.</li>
      <li><strong>WSPR</strong> — οθόνη προγραμματισμού φάρου. Δείτε το κεφάλαιο <a href="wspr.html">Φάρος WSPR</a>.</li>
      <li><strong>SSB</strong> — οθόνη φωνής με πλήκτρο εκπομπής. Δείτε το κεφάλαιο <a href="ssb.html">Φωνή SSB</a>.</li>
      <li><strong>Χάρτης τετραγώνων</strong> — προβολή χάρτη σε πλήρη οθόνη. Δείτε το κεφάλαιο <a href="gridtracker.html">Χάρτης τετραγώνων</a>.</li>
      <li><strong>Στατιστικά</strong> — σύνολα επαφών ανά μπάντα, τρόπο λειτουργίας, DXCC, ζώνη ITU/CQ και χρονική περίοδο.</li>
      <li><strong>Αναζήτηση QRZ.com</strong> — ενσωματωμένη αναζήτηση διακριτικού για τον επιλεγμένο σταθμό.</li>
      <li><strong>Αιωρούμενο παράθυρο</strong> — προαιρετική επικάλυψη πάντα σε πρώτο πλάνο με πλήκτρα γρήγορης πρόσβασης (συχνότητα, ένταση, χάρτης τετραγώνων κ.ά.)· κάθε πλήκτρο ενεργοποιείται ξεχωριστά στις Ρυθμίσεις.</li>
    </ul>`,
},

}; /* end PAGE_T */
