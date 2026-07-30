/* ── FT8TW User Manual – i18n: Introduction ──────────────────────── */

const PAGE_T = {

en: {
  intro_title: 'Introduction',
  intro_p1: 'FT8TW is an Android application for FT8/FT4/FT2 digital-mode amateur radio communication, plus JS8 chat, WSPR beacon, and SSB voice. It is a fork of FT8CN (originally developed by BG7YOZ), actively maintained by BV6LC with additional features and improvements tailored for the Taiwan amateur radio community.',
  intro_p2: 'Key features:',
  intro_features: `
    <ul>
      <li>Supports <strong>FT8</strong> (15-second slots), <strong>FT4</strong> (7.5-second slots), and experimental <strong>FT2</strong> digital modes</li>
      <li>Also includes <strong>JS8</strong> chat mode, <strong>WSPR</strong> beacon transmission/decoding, and <strong>SSB</strong> push-to-talk voice</li>
      <li>Connects to <strong>40+ radio models</strong> via USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1, or Xiegu WiFi</li>
      <li>Native <strong>C/C++ signal processing</strong> (LDPC, CRC, Kiss FFT) for high-performance encoding and decoding</li>
      <li>Automatic CQ response with configurable priority strategies</li>
      <li>QSO logging with ADIF export/import and log sharing</li>
      <li>Integration with <strong>QRZ.com</strong>, <strong>PSKReporter</strong> and <strong>Cloudlog / Wavelog</strong></li>
      <li>Contest mode with grid exchange, and SOTA / POTA activation logging</li>
      <li>Named setting profiles, and automatic backup of the log database</li>
      <li>Maidenhead grid tracker with OpenStreetMap overlay</li>
      <li>ITU, CQ zone, and DXCC statistics</li>
      <li>Light / Dark / System theme</li>
      <li>Requires Android 5.0 (API 21) or later</li>
    </ul>`,
  intro_support: 'The app has a coffee link under About for anyone who wants to support development. It is entirely voluntary and unlocks nothing — every feature works the same either way.',
},

'zh-TW': {
  intro_title: '簡介',
  intro_p1: 'FT8TW 是一款 Android 業餘無線電應用程式，支援 FT8／FT4／FT2 數位模式通聯，並提供 JS8 聊天、WSPR 信標及 SSB 語音功能。本程式由 BV6LC 維護，基於 BG7YOZ 開發的 FT8CN，新增了多項功能並針對中文使用者優化。',
  intro_p2: '主要功能：',
  intro_features: `
    <ul>
      <li>支援 <strong>FT8</strong>（15 秒時隙）、<strong>FT4</strong>（7.5 秒時隙）及實驗性的 <strong>FT2</strong> 數位模式</li>
      <li>另支援 <strong>JS8</strong> 聊天模式、<strong>WSPR</strong> 信標發射／解碼，以及 <strong>SSB</strong> 按住通話語音</li>
      <li>透過 USB CAT、藍牙 SPP、FlexRadio WiFi、ICOM RS-BA1 或協谷 WiFi 控制 <strong>40+ 款電台</strong></li>
      <li>使用原生 <strong>C/C++ 訊號處理</strong>（LDPC、CRC、Kiss FFT），編解碼效能優異</li>
      <li>自動回應 CQ，可設定優先策略</li>
      <li>通聯日誌管理，支援 ADIF 匯出／匯入及日誌分享</li>
      <li>整合 <strong>QRZ.com</strong>、<strong>PSKReporter</strong> 及 <strong>Cloudlog／Wavelog</strong></li>
      <li>競賽模式（交換網格），以及 SOTA／POTA 啟動記錄</li>
      <li>多組具名設定檔，日誌資料庫可自動備份</li>
      <li>Maidenhead 網格追蹤器，結合 OpenStreetMap 顯示</li>
      <li>ITU、CQ 分區及 DXCC 統計</li>
      <li>淺色 / 深色 / 跟隨系統佈景</li>
      <li>需要 Android 5.0（API 21）或更新版本</li>
    </ul>`,
  intro_support: 'App 的「關於」裡有一個請喝咖啡的連結，供想支持開發的人使用。純屬自願，也不會解鎖任何東西——所有功能給不給都一樣可用。',
},

'zh-CN': {
  intro_title: '简介',
  intro_p1: 'FT8TW 是一款 Android 业余无线电应用程序，支持 FT8／FT4／FT2 数字模式通联，并提供 JS8 聊天、WSPR 信标及 SSB 语音功能。本程序由 BV6LC 维护，基于 BG7YOZ 开发的 FT8CN，新增了多项功能并针对中文用户优化。',
  intro_p2: '主要功能：',
  intro_features: `
    <ul>
      <li>支持 <strong>FT8</strong>（15 秒时隙）、<strong>FT4</strong>（7.5 秒时隙）及实验性的 <strong>FT2</strong> 数字模式</li>
      <li>另支持 <strong>JS8</strong> 聊天模式、<strong>WSPR</strong> 信标发射／解码，以及 <strong>SSB</strong> 按住通话语音</li>
      <li>通过 USB CAT、蓝牙 SPP、FlexRadio WiFi、ICOM RS-BA1 或协谷 WiFi 控制 <strong>40+ 款电台</strong></li>
      <li>使用原生 <strong>C/C++ 信号处理</strong>（LDPC、CRC、Kiss FFT），编解码性能优异</li>
      <li>自动回应 CQ，可设置优先策略</li>
      <li>通联日志管理，支持 ADIF 导出／导入及日志分享</li>
      <li>集成 <strong>QRZ.com</strong>、<strong>PSKReporter</strong> 及 <strong>Cloudlog／Wavelog</strong></li>
      <li>竞赛模式（交换网格），以及 SOTA／POTA 启动记录</li>
      <li>多组具名配置文件，日志数据库可自动备份</li>
      <li>Maidenhead 网格追踪器，结合 OpenStreetMap 显示</li>
      <li>ITU、CQ 分区及 DXCC 统计</li>
      <li>浅色 / 深色 / 跟随系统主题</li>
      <li>需要 Android 5.0（API 21）或更新版本</li>
    </ul>`,
  intro_support: 'App 的「关于」里有一个请喝咖啡的链接，供想支持开发的人使用。纯属自愿，也不会解锁任何东西——所有功能给不给都一样可用。',
},

'ja': {
  intro_title: 'はじめに',
  intro_p1: 'FT8TW は FT8/FT4/FT2 のデジタルモードによる交信に加え、JS8 チャット、WSPR ビーコン、SSB 音声にも対応した Android 用アマチュア無線アプリです。BG7YOZ が開発した FT8CN のフォークで、BV6LC が機能追加と改良を続けています。',
  intro_p2: '主な機能:',
  intro_features: `
    <ul>
      <li><strong>FT8</strong>（15 秒スロット）、<strong>FT4</strong>（7.5 秒スロット）、実験的な <strong>FT2</strong> のデジタルモードに対応</li>
      <li><strong>JS8</strong> チャットモード、<strong>WSPR</strong> ビーコンの送信／デコード、<strong>SSB</strong> のプレストーク音声にも対応</li>
      <li>USB CAT、Bluetooth SPP、FlexRadio WiFi、ICOM RS-BA1、Xiegu WiFi で <strong>40 機種以上の無線機</strong>を制御</li>
      <li>ネイティブの <strong>C/C++ 信号処理</strong>（LDPC、CRC、Kiss FFT）による高速なエンコード／デコード</li>
      <li>CQ への自動応答（優先条件を設定可能）</li>
      <li>交信ログ管理、ADIF のエクスポート／インポートとログ共有</li>
      <li><strong>QRZ.com</strong>、<strong>PSKReporter</strong>、<strong>Cloudlog / Wavelog</strong> との連携</li>
      <li>グリッド交換のコンテストモードと、SOTA / POTA のアクティベーション記録</li>
      <li>名前付きの設定プロファイルと、ログデータベースの自動バックアップ</li>
      <li>OpenStreetMap を用いた Maidenhead グリッドトラッカー</li>
      <li>ITU ゾーン、CQ ゾーン、DXCC の統計</li>
      <li>ライト / ダーク / システムに従うテーマ</li>
      <li>Android 5.0（API 21）以降が必要</li>
    </ul>`,
  intro_support: 'アプリの「情報」にはコーヒーをおごるためのリンクがあります。開発を応援したい方向けで、完全に任意です。何かが解放されることはなく、機能はどちらでも同じように使えます。',
},

'ru': {
  intro_title: 'Введение',
  intro_p1: 'FT8TW — приложение для Android для работы цифровыми видами связи FT8/FT4/FT2, а также чатом JS8, маяком WSPR и голосом SSB. Это форк FT8CN (первоначально разработан BG7YOZ), который активно поддерживает BV6LC, добавляя новые возможности и улучшения.',
  intro_p2: 'Основные возможности:',
  intro_features: `
    <ul>
      <li>Поддержка <strong>FT8</strong> (интервалы 15 с), <strong>FT4</strong> (интервалы 7,5 с) и экспериментального режима <strong>FT2</strong></li>
      <li>Также чат <strong>JS8</strong>, передача и декодирование маяка <strong>WSPR</strong> и голос <strong>SSB</strong> с кнопкой передачи</li>
      <li>Управление <strong>более чем 40 моделями трансиверов</strong> через USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1 или Xiegu WiFi</li>
      <li>Нативная <strong>обработка сигналов на C/C++</strong> (LDPC, CRC, Kiss FFT) для быстрого кодирования и декодирования</li>
      <li>Автоматический ответ на CQ с настраиваемыми правилами приоритета</li>
      <li>Ведение аппаратного журнала с экспортом/импортом ADIF и обменом записями</li>
      <li>Интеграция с <strong>QRZ.com</strong>, <strong>PSKReporter</strong> и <strong>Cloudlog / Wavelog</strong></li>
      <li>Контестовый режим с обменом локаторами и запись активаций SOTA / POTA</li>
      <li>Именованные профили настроек и автоматические резервные копии журнала</li>
      <li>Карта локаторов Maidenhead поверх OpenStreetMap</li>
      <li>Статистика по зонам ITU, CQ и по DXCC</li>
      <li>Светлая / тёмная / системная тема</li>
      <li>Требуется Android 5.0 (API 21) или новее</li>
    </ul>`,
  intro_support: 'В разделе «О программе» есть ссылка «угостить кофе» для тех, кто хочет поддержать разработку. Это полностью добровольно и ничего не открывает — все возможности работают одинаково в любом случае.',
},

'pl': {
  intro_title: 'Wprowadzenie',
  intro_p1: 'FT8TW to aplikacja na Androida do łączności emisjami cyfrowymi FT8/FT4/FT2, a także do czatu JS8, latarni WSPR i głosu SSB. Jest to fork FT8CN (pierwotnie autorstwa BG7YOZ), aktywnie rozwijany przez BV6LC o dodatkowe funkcje i usprawnienia.',
  intro_p2: 'Najważniejsze funkcje:',
  intro_features: `
    <ul>
      <li>Obsługa <strong>FT8</strong> (okna 15-sekundowe), <strong>FT4</strong> (okna 7,5-sekundowe) i eksperymentalnego <strong>FT2</strong></li>
      <li>Dodatkowo czat <strong>JS8</strong>, nadawanie i dekodowanie latarni <strong>WSPR</strong> oraz głos <strong>SSB</strong> z przyciskiem nadawania</li>
      <li>Sterowanie <strong>ponad 40 modelami radiotelefonów</strong> przez USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1 lub Xiegu WiFi</li>
      <li>Natywne <strong>przetwarzanie sygnałów w C/C++</strong> (LDPC, CRC, Kiss FFT) zapewniające szybkie kodowanie i dekodowanie</li>
      <li>Automatyczna odpowiedź na CQ z konfigurowalnymi zasadami priorytetu</li>
      <li>Dziennik łączności z eksportem/importem ADIF i udostępnianiem</li>
      <li>Integracja z <strong>QRZ.com</strong>, <strong>PSKReporter</strong> i <strong>Cloudlog / Wavelog</strong></li>
      <li>Tryb zawodów z wymianą lokatorów oraz zapis aktywacji SOTA / POTA</li>
      <li>Nazwane profile ustawień i automatyczne kopie zapasowe dziennika</li>
      <li>Mapa lokatorów Maidenhead na podkładzie OpenStreetMap</li>
      <li>Statystyki stref ITU, CQ i DXCC</li>
      <li>Motyw jasny / ciemny / zgodny z systemem</li>
      <li>Wymaga Androida 5.0 (API 21) lub nowszego</li>
    </ul>`,
  intro_support: 'W sekcji „O programie” jest odnośnik na kawę dla osób, które chcą wesprzeć rozwój. Jest to całkowicie dobrowolne i niczego nie odblokowuje — wszystkie funkcje działają tak samo.',
},

'es': {
  intro_title: 'Introducción',
  intro_p1: 'FT8TW es una aplicación para Android destinada a la comunicación en los modos digitales FT8/FT4/FT2, además de chat JS8, baliza WSPR y voz SSB. Es un fork de FT8CN (desarrollado originalmente por BG7YOZ), mantenido activamente por BV6LC con funciones y mejoras adicionales.',
  intro_p2: 'Funciones principales:',
  intro_features: `
    <ul>
      <li>Admite <strong>FT8</strong> (intervalos de 15 s), <strong>FT4</strong> (intervalos de 7,5 s) y el modo experimental <strong>FT2</strong></li>
      <li>También incluye chat <strong>JS8</strong>, transmisión y decodificación de baliza <strong>WSPR</strong> y voz <strong>SSB</strong> con pulsar para hablar</li>
      <li>Controla <strong>más de 40 modelos de equipos</strong> mediante USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1 o Xiegu WiFi</li>
      <li><strong>Procesado de señal nativo en C/C++</strong> (LDPC, CRC, Kiss FFT) para codificar y decodificar con alto rendimiento</li>
      <li>Respuesta automática a CQ con estrategias de prioridad configurables</li>
      <li>Registro de contactos con exportación/importación ADIF y uso compartido</li>
      <li>Integración con <strong>QRZ.com</strong>, <strong>PSKReporter</strong> y <strong>Cloudlog / Wavelog</strong></li>
      <li>Modo concurso con intercambio de localizador y registro de activaciones SOTA / POTA</li>
      <li>Perfiles de ajustes con nombre y copia de seguridad automática del registro</li>
      <li>Mapa de localizadores Maidenhead sobre OpenStreetMap</li>
      <li>Estadísticas de zonas ITU, CQ y DXCC</li>
      <li>Tema claro / oscuro / según el sistema</li>
      <li>Requiere Android 5.0 (API 21) o posterior</li>
    </ul>`,
  intro_support: 'En «Acerca de» hay un enlace para invitar a un café a quien quiera apoyar el desarrollo. Es totalmente voluntario y no desbloquea nada: todas las funciones funcionan igual en cualquier caso.',
},

'el': {
  intro_title: 'Εισαγωγή',
  intro_p1: 'Το FT8TW είναι εφαρμογή Android για επικοινωνία με τους ψηφιακούς τρόπους FT8/FT4/FT2, καθώς και για συνομιλία JS8, φάρο WSPR και φωνή SSB. Είναι fork του FT8CN (αρχική ανάπτυξη από τον BG7YOZ) και συντηρείται ενεργά από τον BV6LC με πρόσθετες λειτουργίες και βελτιώσεις.',
  intro_p2: 'Βασικές λειτουργίες:',
  intro_features: `
    <ul>
      <li>Υποστήριξη <strong>FT8</strong> (χρονοθυρίδες 15 δευτ.), <strong>FT4</strong> (χρονοθυρίδες 7,5 δευτ.) και του πειραματικού <strong>FT2</strong></li>
      <li>Επίσης συνομιλία <strong>JS8</strong>, εκπομπή/αποκωδικοποίηση φάρου <strong>WSPR</strong> και φωνή <strong>SSB</strong> με πλήκτρο εκπομπής</li>
      <li>Έλεγχος <strong>άνω των 40 μοντέλων πομποδεκτών</strong> μέσω USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1 ή Xiegu WiFi</li>
      <li>Εγγενής <strong>επεξεργασία σήματος σε C/C++</strong> (LDPC, CRC, Kiss FFT) για γρήγορη κωδικοποίηση και αποκωδικοποίηση</li>
      <li>Αυτόματη απάντηση σε CQ με ρυθμιζόμενες προτεραιότητες</li>
      <li>Ημερολόγιο επαφών με εξαγωγή/εισαγωγή ADIF και κοινή χρήση</li>
      <li>Ενσωμάτωση με <strong>QRZ.com</strong>, <strong>PSKReporter</strong> και <strong>Cloudlog / Wavelog</strong></li>
      <li>Λειτουργία διαγωνισμού με ανταλλαγή τετραγώνου και καταγραφή ενεργοποιήσεων SOTA / POTA</li>
      <li>Ονομασμένα προφίλ ρυθμίσεων και αυτόματα αντίγραφα ασφαλείας του ημερολογίου</li>
      <li>Χάρτης τετραγώνων Maidenhead πάνω σε OpenStreetMap</li>
      <li>Στατιστικά ζωνών ITU, CQ και DXCC</li>
      <li>Φωτεινό / σκοτεινό θέμα ή σύμφωνα με το σύστημα</li>
      <li>Απαιτείται Android 5.0 (API 21) ή νεότερο</li>
    </ul>`,
  intro_support: 'Στην ενότητα «Σχετικά» υπάρχει σύνδεσμος για έναν καφέ, για όποιον θέλει να στηρίξει την ανάπτυξη. Είναι εντελώς προαιρετικό και δεν ξεκλειδώνει τίποτα — όλες οι λειτουργίες δουλεύουν το ίδιο.',
},

}; /* end PAGE_T */
