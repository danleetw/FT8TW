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
      <li>The map carries floating shortcut buttons too, and <strong>quick mode switch</strong> moves between FT8／FT4／FT2 without leaving the map. JS8, WSPR and the radio tool are deliberately not offered here: they are separate screens, so opening one would mean leaving the map — the opposite of what switching mode on the map is for.</li>
      <li>The floating buttons on the map have a darker fill and a light outline, so they stand out both against the pale street map and against dark woodland. The per-button settings are shared with the main screen, but the "Show floating window" master switch does not apply to the map — there it is the only way in to transmitting and to the map settings.</li>
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
      <li>附近波段活跃度面板会定期刷新，摘要各频段近期的信号密度。</li>
      <li>可从主导航菜单打开地图，若已启用悬浮窗口，也能从快捷按钮打开。</li>
      <li>地图上同样有悬浮快捷按钮，其中<strong>快速切换模式</strong>可以直接在 FT8／FT4／FT2 之间切换，不必离开地图。JS8、WSPR 与电台工具不列在这里——它们是各自独立的画面，按下去等于离开地图，与「在地图上快速换模式」的用意相反。</li>
      <li>地图上的悬浮按钮加了深色底与亮色外框，在浅色的街道底图与深色的森林区块上都看得清楚。单个按钮的显示设置与主画面共用，但地图不受「显示悬浮窗口」总开关影响——它是地图上唯一的发射与地图设置入口。</li>
    </ul>`,
},

'ja': {
  grid_title: 'グリッドトラッカー',
  grid_intro: 'グリッドトラッカーは全画面の地図ビュー（OpenStreetMap ベース）で、デコードした局や交信済みの局を Maidenhead グリッドロケーターに基づいて表示し、現在のバンドの状況を地理的に把握できます。',
  grid_features: `
    <ul>
      <li>交信済みの局と新たにデコードした局はマーカーで区別され、タップするとコールサインや信号の詳細が表示されます。</li>
      <li>近隣バンドのアクティビティ表示は定期的に更新され、各バンドの最近のスポット密度をまとめて示します。</li>
      <li>地図はメインのナビゲーションメニューから開けます。フローティングウィンドウを有効にしていれば、ショートカットからも開けます。</li>
      <li>地図上にもフローティングのショートカットがあり、<strong>クイックモード切替</strong>で地図を離れずに FT8／FT4／FT2 を切り替えられます。JS8・WSPR・無線機ツールはここには出しません。いずれも独立した画面で、押すと地図を離れてしまい、「地図上でモードだけ切り替える」という意図に反するためです。</li>
      <li>地図上のフローティングボタンは濃い下地と明るい輪郭を備えており、明るい街路地図の上でも、暗い森林の上でも見分けられます。個々のボタンの表示設定はメイン画面と共通ですが、地図は「フローティングウィンドウを表示」の総合スイッチの影響を受けません。地図上ではそこが送信と地図設定への唯一の入口だからです。</li>
    </ul>`,
},

'ru': {
  grid_title: 'Карта локаторов',
  grid_intro: 'Карта локаторов — полноэкранный вид карты (на основе OpenStreetMap), на котором декодированные и проведённые станции отображаются по их локатору Maidenhead, что даёт географическую картину активности на диапазоне.',
  grid_features: `
    <ul>
      <li>Маркеры отличают уже отработанные станции от только что декодированных; по нажатию показываются позывной и параметры сигнала.</li>
      <li>Панель активности соседних диапазонов периодически обновляется и сводит воедино плотность спотов по каждому диапазону.</li>
      <li>Карту можно открыть из главного меню, а если включено плавающее окно — то и с его кнопки.</li>
      <li>На карте тоже есть плавающие кнопки, и <strong>быстрая смена режима</strong> позволяет переключаться между FT8, FT4 и FT2, не покидая карту. JS8, WSPR и инструменты трансивера сюда не вынесены: это отдельные экраны, и переход на них означал бы уход с карты, что противоречит самой идее быстрой смены режима на карте.</li>
      <li>Плавающие кнопки на карте получили тёмную подложку и светлый контур, так что они различимы и на светлой уличной подложке, и на тёмных лесных массивах. Настройки отдельных кнопок общие с главным экраном, но общий выключатель «Показать плавающее окно» на карту не действует: там это единственный вход к передаче и к настройкам карты.</li>
    </ul>`,
},

'pl': {
  grid_title: 'Mapa lokatorów',
  grid_intro: 'Mapa lokatorów to pełnoekranowy widok mapy (oparty na OpenStreetMap), który nanosi zdekodowane i przeprowadzone stacje według ich lokatora Maidenhead, dając geograficzny obraz aktywności na paśmie.',
  grid_features: `
    <ul>
      <li>Znaczniki odróżniają stacje już pracowane od świeżo zdekodowanych; po dotknięciu pokazują znak i szczegóły sygnału.</li>
      <li>Panel aktywności pobliskich pasm odświeża się okresowo i podsumowuje ostatnią gęstość spotów w każdym paśmie.</li>
      <li>Mapę można otworzyć z głównego menu nawigacji, a jeśli włączone jest pływające okno — również z jego skrótu.</li>
      <li>Na mapie także są pływające przyciski, a <strong>szybka zmiana trybu</strong> pozwala przełączać FT8／FT4／FT2 bez opuszczania mapy. JS8, WSPR i narzędzia radia nie są tu umieszczone — to osobne ekrany, a przejście do nich oznaczałoby opuszczenie mapy, co przeczy idei szybkiej zmiany trybu na mapie.</li>
      <li>Pływające przyciski na mapie mają ciemne tło i jasną obwódkę, dzięki czemu są czytelne zarówno na jasnym podkładzie ulic, jak i na ciemnych obszarach leśnych. Ustawienia poszczególnych przycisków są wspólne z ekranem głównym, ale główny przełącznik „Pokaż pływające okno" nie dotyczy mapy — tam jest to jedyne wejście do nadawania i ustawień mapy.</li>
    </ul>`,
},

'es': {
  grid_title: 'Mapa de localizadores',
  grid_intro: 'El mapa de localizadores es una vista de mapa a pantalla completa (basada en OpenStreetMap) que sitúa las estaciones decodificadas y trabajadas según su localizador Maidenhead, ofreciendo una visión geográfica de la actividad actual en la banda.',
  grid_features: `
    <ul>
      <li>Los marcadores distinguen las estaciones ya trabajadas de las recién decodificadas; al pulsarlos muestran el indicativo y los detalles de la señal.</li>
      <li>El panel de actividad de bandas cercanas se refresca periódicamente y resume la densidad reciente de spots por banda.</li>
      <li>El mapa se abre desde el menú de navegación principal y, si la ventana flotante está activada, también desde su acceso directo.</li>
      <li>En el mapa hay también botones flotantes, y el de <strong>cambio rápido de modo</strong> permite alternar entre FT8／FT4／FT2 sin salir del mapa. JS8, WSPR y las herramientas de radio no se incluyen aquí: son pantallas independientes y entrar en ellas supondría abandonar el mapa, justo lo contrario de la idea de cambiar de modo sobre el mapa.</li>
      <li>Los botones flotantes del mapa llevan un fondo oscuro y un contorno claro, de modo que se distinguen tanto sobre el callejero claro como sobre las zonas boscosas oscuras. Los ajustes de cada botón son los mismos que en la pantalla principal, pero el interruptor general «Mostrar ventana flotante» no afecta al mapa: allí es la única vía de acceso a la transmisión y a los ajustes del mapa.</li>
    </ul>`,
},

'el': {
  grid_title: 'Χάρτης τετραγώνων',
  grid_intro: 'Ο χάρτης τετραγώνων είναι μια προβολή χάρτη σε πλήρη οθόνη (βασισμένη στο OpenStreetMap) που τοποθετεί τους σταθμούς που αποκωδικοποιήθηκαν και με τους οποίους έγινε επαφή σύμφωνα με το τετράγωνο Maidenhead, δίνοντας γεωγραφική εικόνα της δραστηριότητας στην μπάντα.',
  grid_features: `
    <ul>
      <li>Οι δείκτες ξεχωρίζουν τους ήδη δουλεμένους σταθμούς από τους μόλις αποκωδικοποιημένους· με πάτημα εμφανίζουν το διακριτικό και λεπτομέρειες του σήματος.</li>
      <li>Ο πίνακας δραστηριότητας γειτονικών μπαντών ανανεώνεται περιοδικά και συνοψίζει την πρόσφατη πυκνότητα spot ανά μπάντα.</li>
      <li>Ο χάρτης ανοίγει από το κύριο μενού πλοήγησης και, αν είναι ενεργό το αιωρούμενο παράθυρο, και από τη συντόμευσή του.</li>
      <li>Στον χάρτη υπάρχουν επίσης αιωρούμενα κουμπιά, και η <strong>γρήγορη αλλαγή λειτουργίας</strong> επιτρέπει εναλλαγή μεταξύ FT8／FT4／FT2 χωρίς να φύγετε από τον χάρτη. Τα JS8, WSPR και τα εργαλεία πομποδέκτη δεν περιλαμβάνονται εδώ: είναι ξεχωριστές οθόνες και το άνοιγμά τους θα σήμαινε έξοδο από τον χάρτη, δηλαδή το αντίθετο από την ιδέα της γρήγορης αλλαγής λειτουργίας πάνω στον χάρτη.</li>
      <li>Τα αιωρούμενα κουμπιά στον χάρτη έχουν σκούρο υπόβαθρο και φωτεινό περίγραμμα, ώστε να ξεχωρίζουν τόσο πάνω στον ανοιχτόχρωμο χάρτη δρόμων όσο και πάνω σε σκούρες δασικές εκτάσεις. Οι ρυθμίσεις των επιμέρους κουμπιών είναι κοινές με την κύρια οθόνη, αλλά ο γενικός διακόπτης «Εμφάνιση αιωρούμενου παραθύρου» δεν ισχύει για τον χάρτη: εκεί αποτελούν τη μοναδική είσοδο στην εκπομπή και στις ρυθμίσεις του χάρτη.</li>
    </ul>`,
},

}; /* end PAGE_T */
