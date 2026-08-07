/* ── FT8TW User Manual – i18n: Grid Tracker ──────────────────────── */

const PAGE_T = {

en: {
  grid_title: 'Grid Tracker',
  grid_intro: 'The Grid Tracker is a full-screen map view (based on OpenStreetMap) that plots decoded and worked stations by their Maidenhead grid locator, giving a geographic view of current band activity.',
  grid_features: `
    <ul>
      <li>Markers distinguish stations you have already worked from newly decoded ones, and show callsign/signal details on tap.</li>
      <li>A nearby band-activity panel summarizes recent spot density per band, refreshed periodically.</li>
      <li>The map can be opened from the main navigation menu or, if enabled, from the floating shortcut window.</li>
    </ul>`,
},

'zh-TW': {
  grid_title: '網格追蹤地圖',
  grid_intro: '網格追蹤地圖是一個全螢幕地圖畫面（基於 OpenStreetMap），依 Maidenhead 網格座標標示解碼到及已通聯的電台，以地理視角呈現目前波段活動狀況。',
  grid_features: `
    <ul>
      <li>標記會區分已通聯過的電台與新解碼到的電台，點選可查看呼號與訊號詳情。</li>
      <li>附近波段活躍度面板會定期刷新，摘要各頻段近期的訊號密度。</li>
      <li>可從主導覽選單開啟地圖，若已啟用浮動視窗，也能從快捷按鈕開啟。</li>
      <li>地圖上同樣有浮動快捷按鈕，其中<strong>快速切換模式</strong>可以直接在 FT8／FT4／FT2 之間切換，不必離開地圖。JS8、WSPR 與電台工具不列在這裡——它們是各自獨立的畫面，按下去等於離開地圖，與「在地圖上快速換模式」的用意相反。</li>
      <li>地圖上的浮動按鈕加了深色底與亮色外框，在淺色的街道底圖與深色的森林區塊上都看得清楚。個別按鈕的顯示設定與主畫面共用，但地圖不受「顯示浮動視窗」總開關影響——它是地圖上唯一的發射與地圖設定入口。</li>
    </ul>`,
},

'zh-CN': {
  grid_title: '网格追踪地图',
  grid_intro: '网格追踪地图是一个全屏地图界面（基于 OpenStreetMap），按 Maidenhead 网格坐标标示解码到及已通联的电台，以地理视角呈现当前波段活动状况。',
  grid_features: `
    <ul>
      <li>标记会区分已通联过的电台与新解码到的电台，点击可查看呼号与信号详情。</li>
      <li>附近波段活跃度面板会定期刷新，汇总各频段近期的信号密度。</li>
      <li>可从主导航菜单打开地图，若已启用悬浮窗口，也能从快捷按钮打开。</li>
    </ul>`,
},

'ja': {
  grid_title: 'グリッドトラッカー',
  grid_intro: 'グリッドトラッカーは全画面の地図ビュー（OpenStreetMap ベース）で、デコードした局や交信済みの局を Maidenhead グリッドロケーターに基づいて表示し、現在のバンドの状況を地理的に把握できます。',
  grid_features: `
    <ul>
      <li>交信済みの局と新たにデコードした局はマーカーで区別され、タップするとコールサインや信号の詳細が表示されます。</li>
      <li>付近のバンド状況パネルは定期的に更新され、バンドごとの最近のスポット密度をまとめて表示します。</li>
      <li>地図はメインのナビゲーションメニューから開けます。フローティングウィンドウを有効にしている場合はそのショートカットからも開けます。</li>
    </ul>`,
},

'ru': {
  grid_title: 'Карта локаторов',
  grid_intro: 'Карта локаторов — полноэкранный вид карты (на основе OpenStreetMap), на котором декодированные и проведённые станции отображаются по их локатору Maidenhead, что даёт географическую картину активности на диапазоне.',
  grid_features: `
    <ul>
      <li>Маркеры отличают уже проведённые станции от только что декодированных; при нажатии показываются позывной и данные о сигнале.</li>
      <li>Панель активности ближайших диапазонов периодически обновляется и показывает плотность недавних спотов по диапазонам.</li>
      <li>Карту можно открыть из главного меню навигации, а при включённом плавающем окне — с его кнопки быстрого доступа.</li>
    </ul>`,
},

'pl': {
  grid_title: 'Mapa lokatorów',
  grid_intro: 'Mapa lokatorów to pełnoekranowy widok mapy (oparty na OpenStreetMap), który nanosi zdekodowane i przeprowadzone stacje według ich lokatora Maidenhead, dając geograficzny obraz aktywności na paśmie.',
  grid_features: `
    <ul>
      <li>Znaczniki odróżniają stacje już przepracowane od nowo zdekodowanych, a po dotknięciu pokazują znak wywoławczy i szczegóły sygnału.</li>
      <li>Panel aktywności pobliskich pasm jest okresowo odświeżany i podsumowuje zagęszczenie ostatnich spotów w poszczególnych pasmach.</li>
      <li>Mapę można otworzyć z głównego menu nawigacji, a przy włączonym oknie pływającym również z jego skrótu.</li>
    </ul>`,
},

'es': {
  grid_title: 'Mapa de localizadores',
  grid_intro: 'El mapa de localizadores es una vista de mapa a pantalla completa (basada en OpenStreetMap) que sitúa las estaciones decodificadas y trabajadas según su localizador Maidenhead, ofreciendo una visión geográfica de la actividad actual en la banda.',
  grid_features: `
    <ul>
      <li>Los marcadores distinguen las estaciones ya trabajadas de las recién decodificadas y, al tocarlos, muestran el indicativo y los detalles de la señal.</li>
      <li>El panel de actividad de bandas cercanas se actualiza periódicamente y resume la densidad de spots recientes por banda.</li>
      <li>El mapa se abre desde el menú de navegación principal o, si está activada, desde la ventana flotante de accesos directos.</li>
    </ul>`,
},

'el': {
  grid_title: 'Χάρτης τετραγώνων',
  grid_intro: 'Ο χάρτης τετραγώνων είναι μια προβολή χάρτη σε πλήρη οθόνη (βασισμένη στο OpenStreetMap) που τοποθετεί τους σταθμούς που αποκωδικοποιήθηκαν και με τους οποίους έγινε επαφή σύμφωνα με το τετράγωνο Maidenhead, δίνοντας γεωγραφική εικόνα της δραστηριότητας στην μπάντα.',
  grid_features: `
    <ul>
      <li>Οι δείκτες ξεχωρίζουν τους σταθμούς με τους οποίους έχει ήδη γίνει επαφή από τους νέους και, με πάτημα, εμφανίζουν το διακριτικό και λεπτομέρειες σήματος.</li>
      <li>Ο πίνακας δραστηριότητας κοντινών μπαντών ανανεώνεται περιοδικά και συνοψίζει την πυκνότητα πρόσφατων αναφορών ανά μπάντα.</li>
      <li>Ο χάρτης ανοίγει από το κύριο μενού πλοήγησης ή, εφόσον είναι ενεργό, από το αιωρούμενο παράθυρο συντομεύσεων.</li>
    </ul>`,
},

}; /* end PAGE_T */
