/* ── FT8TW User Manual – i18n: Installation ──────────────────────── */

const PAGE_T = {

en: {
  install_title:       'Installation',
  install_p1:          'FT8TW is available on the Google Play Store and can also be downloaded directly as an APK from GitHub Releases.',
  install_steps_title: 'Installation Methods',
  install_steps: `
    <h4>Method 1 – Google Play Store (Recommended)</h4>
    <ol>
      <li>Open the <strong>Google Play Store</strong> on your Android device.</li>
      <li>Search for <strong>FT8TW</strong> or use the direct link:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Tap <strong>Install</strong> and grant the required permissions when prompted.</li>
    </ol>
    <h4>Method 2 – GitHub APK (Latest / Beta)</h4>
    <ol>
      <li><strong>Download</strong> the latest <code>.apk</code> file from the <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> page.</li>
      <li><strong>Allow unknown sources:</strong> Go to <em>Android Settings → Security → Install unknown apps</em> and grant permission to your browser or file manager.</li>
      <li><strong>Open</strong> the downloaded APK and tap <em>Install</em>.</li>
    </ol>`,
  install_perms_title: 'Required Permissions',
  install_perms: `
    <table>
      <tr><th>Permission</th><th>Purpose</th></tr>
      <tr><td>Microphone</td><td>Record audio for FT8/FT4 decoding (required)</td></tr>
      <tr><td>Location (coarse/fine)</td><td>Optional – GPS time synchronization and automatic grid locator</td></tr>
      <tr><td>Bluetooth / Nearby Devices</td><td>Bluetooth radio connection (Android 12+ requires Nearby Devices)</td></tr>
      <tr><td>Storage / Files</td><td>Import and export ADIF log files</td></tr>
    </table>`,
},

'zh-TW': {
  install_title:       '安裝',
  install_p1:          'FT8TW 已上架 Google Play 商店，也可直接從 GitHub Releases 下載 APK 安裝。',
  install_steps_title: '安裝方式',
  install_steps: `
    <h4>方式一 — Google Play 商店（建議）</h4>
    <ol>
      <li>在 Android 裝置上開啟 <strong>Google Play 商店</strong>。</li>
      <li>搜尋 <strong>FT8TW</strong>，或直接前往：<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw&hl=zh_TW" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>點選<strong>安裝</strong>，依提示授予所需權限。</li>
    </ol>
    <h4>方式二 — GitHub APK（最新版 / 測試版）</h4>
    <ol>
      <li>前往 <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> 頁面，下載最新的 <code>.apk</code> 檔案。</li>
      <li><strong>開啟未知來源安裝：</strong>進入<em>設定 → 安全性 → 安裝未知應用程式</em>，對瀏覽器或檔案管理員授予安裝權限。</li>
      <li>開啟下載的 APK 檔案，點選<em>安裝</em>。</li>
    </ol>`,
  install_perms_title: '所需權限',
  install_perms: `
    <table>
      <tr><th>權限</th><th>用途</th></tr>
      <tr><td>麥克風</td><td>錄製音訊以進行 FT8/FT4 解碼（必要）</td></tr>
      <tr><td>位置（粗略/精確）</td><td>選用 — GPS 時間同步及自動取得網格座標</td></tr>
      <tr><td>藍牙 / 附近裝置</td><td>藍牙電台連線（Android 12+ 需要「附近裝置」權限）</td></tr>
      <tr><td>儲存空間 / 檔案</td><td>ADIF 日誌匯入匯出</td></tr>
    </table>`,
},

'zh-CN': {
  install_title:       '安装',
  install_p1:          'FT8TW 已上架 Google Play 商店，也可直接从 GitHub Releases 下载 APK 安装。',
  install_steps_title: '安装方式',
  install_steps: `
    <h4>方式一 — Google Play 商店（推荐）</h4>
    <ol>
      <li>在 Android 设备上打开 <strong>Google Play 商店</strong>。</li>
      <li>搜索 <strong>FT8TW</strong>，或直接前往：<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>点击<strong>安装</strong>，按提示授予所需权限。</li>
    </ol>
    <h4>方式二 — GitHub APK（最新版 / 测试版）</h4>
    <ol>
      <li>前往 <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> 页面，下载最新的 <code>.apk</code> 文件。</li>
      <li><strong>开启未知来源安装：</strong>进入<em>设置 → 安全 → 安装未知应用</em>，对浏览器或文件管理器授予安装权限。</li>
      <li>打开下载的 APK 文件，点击<em>安装</em>。</li>
    </ol>`,
  install_perms_title: '所需权限',
  install_perms: `
    <table>
      <tr><th>权限</th><th>用途</th></tr>
      <tr><td>麦克风</td><td>录制音频以进行 FT8/FT4 解码（必需）</td></tr>
      <tr><td>位置（粗略/精确）</td><td>可选 — GPS 时间同步及自动获取网格坐标</td></tr>
      <tr><td>蓝牙 / 附近设备</td><td>蓝牙电台连接（Android 12+ 需要「附近设备」权限）</td></tr>
      <tr><td>存储空间 / 文件</td><td>ADIF 日志导入导出</td></tr>
    </table>`,
},

'ja': {
  install_title:       'インストール',
  install_p1:          'FT8TW は Google Play ストアで公開されているほか、GitHub Releases から APK を直接ダウンロードすることもできます。',
  install_steps_title: 'インストール方法',
  install_steps: `
    <h4>方法 1 — Google Play ストア（推奨）</h4>
    <ol>
      <li>Android 端末で <strong>Google Play ストア</strong>を開きます。</li>
      <li><strong>FT8TW</strong> を検索するか、次のリンクを直接開きます:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li><strong>インストール</strong>をタップし、求められた権限を許可します。</li>
    </ol>
    <h4>方法 2 — GitHub の APK（最新版 / ベータ版）</h4>
    <ol>
      <li><a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> のページから最新の <code>.apk</code> ファイルを<strong>ダウンロード</strong>します。</li>
      <li><strong>提供元不明のアプリを許可:</strong> <em>Android の設定 → セキュリティ → 不明なアプリのインストール</em>で、ブラウザーまたはファイルマネージャーに許可を与えます。</li>
      <li>ダウンロードした APK を<strong>開き</strong>、<em>インストール</em>をタップします。</li>
    </ol>`,
  install_perms_title: '必要な権限',
  install_perms: `
    <table>
      <tr><th>権限</th><th>用途</th></tr>
      <tr><td>マイク</td><td>FT8/FT4 デコード用の音声録音（必須）</td></tr>
      <tr><td>位置情報（おおよそ/正確）</td><td>任意 — GPS による時刻同期とグリッドロケーターの自動入力</td></tr>
      <tr><td>Bluetooth / 付近のデバイス</td><td>Bluetooth による無線機接続（Android 12 以降は「付近のデバイス」が必要）</td></tr>
      <tr><td>ストレージ / ファイル</td><td>ADIF ログファイルの読み込みと書き出し</td></tr>
    </table>`,
},

'ru': {
  install_title:       'Установка',
  install_p1:          'FT8TW доступна в Google Play Store, а также её можно скачать напрямую в виде APK из GitHub Releases.',
  install_steps_title: 'Способы установки',
  install_steps: `
    <h4>Способ 1 — Google Play Store (рекомендуется)</h4>
    <ol>
      <li>Откройте <strong>Google Play Store</strong> на устройстве Android.</li>
      <li>Найдите <strong>FT8TW</strong> или перейдите по прямой ссылке:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Нажмите <strong>Установить</strong> и выдайте запрошенные разрешения.</li>
    </ol>
    <h4>Способ 2 — APK с GitHub (последняя / бета-версия)</h4>
    <ol>
      <li><strong>Скачайте</strong> свежий файл <code>.apk</code> со страницы <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a>.</li>
      <li><strong>Разрешите неизвестные источники:</strong> откройте <em>Настройки Android → Безопасность → Установка неизвестных приложений</em> и разрешите установку браузеру или файловому менеджеру.</li>
      <li><strong>Откройте</strong> скачанный APK и нажмите <em>Установить</em>.</li>
    </ol>`,
  install_perms_title: 'Необходимые разрешения',
  install_perms: `
    <table>
      <tr><th>Разрешение</th><th>Назначение</th></tr>
      <tr><td>Микрофон</td><td>Запись звука для декодирования FT8/FT4 (обязательно)</td></tr>
      <tr><td>Местоположение (примерное/точное)</td><td>Необязательно — синхронизация времени по GPS и автоматический локатор</td></tr>
      <tr><td>Bluetooth / устройства поблизости</td><td>Подключение трансивера по Bluetooth (на Android 12+ нужны «Устройства поблизости»)</td></tr>
      <tr><td>Память / файлы</td><td>Импорт и экспорт журналов ADIF</td></tr>
    </table>`,
},

'pl': {
  install_title:       'Instalacja',
  install_p1:          'FT8TW jest dostępna w sklepie Google Play, a także do pobrania bezpośrednio jako plik APK z GitHub Releases.',
  install_steps_title: 'Metody instalacji',
  install_steps: `
    <h4>Metoda 1 — sklep Google Play (zalecana)</h4>
    <ol>
      <li>Otwórz <strong>sklep Google Play</strong> na urządzeniu z Androidem.</li>
      <li>Wyszukaj <strong>FT8TW</strong> lub użyj bezpośredniego odnośnika:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Dotknij <strong>Zainstaluj</strong> i przyznaj wymagane uprawnienia.</li>
    </ol>
    <h4>Metoda 2 — APK z GitHuba (najnowsza / beta)</h4>
    <ol>
      <li><strong>Pobierz</strong> najnowszy plik <code>.apk</code> ze strony <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a>.</li>
      <li><strong>Zezwól na nieznane źródła:</strong> przejdź do <em>Ustawienia Androida → Bezpieczeństwo → Instalowanie nieznanych aplikacji</em> i przyznaj uprawnienie przeglądarce lub menedżerowi plików.</li>
      <li><strong>Otwórz</strong> pobrany plik APK i dotknij <em>Zainstaluj</em>.</li>
    </ol>`,
  install_perms_title: 'Wymagane uprawnienia',
  install_perms: `
    <table>
      <tr><th>Uprawnienie</th><th>Przeznaczenie</th></tr>
      <tr><td>Mikrofon</td><td>Nagrywanie dźwięku do dekodowania FT8/FT4 (wymagane)</td></tr>
      <tr><td>Lokalizacja (przybliżona/dokładna)</td><td>Opcjonalnie — synchronizacja czasu z GPS i automatyczny lokator</td></tr>
      <tr><td>Bluetooth / urządzenia w pobliżu</td><td>Połączenie z radiem przez Bluetooth (Android 12+ wymaga „Urządzenia w pobliżu”)</td></tr>
      <tr><td>Pamięć / pliki</td><td>Import i eksport dzienników ADIF</td></tr>
    </table>`,
},

'es': {
  install_title:       'Instalación',
  install_p1:          'FT8TW está disponible en Google Play Store y también puede descargarse directamente como APK desde GitHub Releases.',
  install_steps_title: 'Métodos de instalación',
  install_steps: `
    <h4>Método 1 — Google Play Store (recomendado)</h4>
    <ol>
      <li>Abre <strong>Google Play Store</strong> en tu dispositivo Android.</li>
      <li>Busca <strong>FT8TW</strong> o usa el enlace directo:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Pulsa <strong>Instalar</strong> y concede los permisos que se soliciten.</li>
    </ol>
    <h4>Método 2 — APK de GitHub (última versión / beta)</h4>
    <ol>
      <li><strong>Descarga</strong> el archivo <code>.apk</code> más reciente desde la página de <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a>.</li>
      <li><strong>Permite orígenes desconocidos:</strong> ve a <em>Ajustes de Android → Seguridad → Instalar apps desconocidas</em> y concede el permiso a tu navegador o gestor de archivos.</li>
      <li><strong>Abre</strong> el APK descargado y pulsa <em>Instalar</em>.</li>
    </ol>`,
  install_perms_title: 'Permisos necesarios',
  install_perms: `
    <table>
      <tr><th>Permiso</th><th>Finalidad</th></tr>
      <tr><td>Micrófono</td><td>Grabar audio para decodificar FT8/FT4 (obligatorio)</td></tr>
      <tr><td>Ubicación (aproximada/precisa)</td><td>Opcional — sincronización horaria por GPS y localizador automático</td></tr>
      <tr><td>Bluetooth / dispositivos cercanos</td><td>Conexión del equipo por Bluetooth (Android 12+ requiere «Dispositivos cercanos»)</td></tr>
      <tr><td>Almacenamiento / archivos</td><td>Importar y exportar registros ADIF</td></tr>
    </table>`,
},

'el': {
  install_title:       'Εγκατάσταση',
  install_p1:          'Το FT8TW διατίθεται στο Google Play Store και μπορεί επίσης να ληφθεί απευθείας ως APK από τα GitHub Releases.',
  install_steps_title: 'Τρόποι εγκατάστασης',
  install_steps: `
    <h4>Τρόπος 1 — Google Play Store (συνιστάται)</h4>
    <ol>
      <li>Ανοίξτε το <strong>Google Play Store</strong> στη συσκευή σας Android.</li>
      <li>Αναζητήστε το <strong>FT8TW</strong> ή χρησιμοποιήστε τον απευθείας σύνδεσμο:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Πατήστε <strong>Εγκατάσταση</strong> και παραχωρήστε τις απαιτούμενες άδειες.</li>
    </ol>
    <h4>Τρόπος 2 — APK από το GitHub (τελευταία / δοκιμαστική έκδοση)</h4>
    <ol>
      <li><strong>Κατεβάστε</strong> το πιο πρόσφατο αρχείο <code>.apk</code> από τη σελίδα <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a>.</li>
      <li><strong>Επιτρέψτε άγνωστες πηγές:</strong> μεταβείτε στις <em>Ρυθμίσεις Android → Ασφάλεια → Εγκατάσταση άγνωστων εφαρμογών</em> και δώστε άδεια στο πρόγραμμα περιήγησης ή στη διαχείριση αρχείων.</li>
      <li><strong>Ανοίξτε</strong> το APK που κατεβάσατε και πατήστε <em>Εγκατάσταση</em>.</li>
    </ol>`,
  install_perms_title: 'Απαιτούμενες άδειες',
  install_perms: `
    <table>
      <tr><th>Άδεια</th><th>Σκοπός</th></tr>
      <tr><td>Μικρόφωνο</td><td>Εγγραφή ήχου για αποκωδικοποίηση FT8/FT4 (απαιτείται)</td></tr>
      <tr><td>Τοποθεσία (κατά προσέγγιση/ακριβής)</td><td>Προαιρετικό — συγχρονισμός ώρας μέσω GPS και αυτόματο τετράγωνο</td></tr>
      <tr><td>Bluetooth / συσκευές σε κοντινή απόσταση</td><td>Σύνδεση πομποδέκτη μέσω Bluetooth (σε Android 12+ απαιτούνται οι «Συσκευές σε κοντινή απόσταση»)</td></tr>
      <tr><td>Αποθηκευτικός χώρος / αρχεία</td><td>Εισαγωγή και εξαγωγή αρχείων ημερολογίου ADIF</td></tr>
    </table>`,
},

}; /* end PAGE_T */
