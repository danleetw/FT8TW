/* ── FT8TW User Manual – i18n: Supported Radios ──────────────────────

   機型清單本身不在這裡：型號名稱不分語系，而且必須與 App 的
   assets/rigaddress.txt 一字不差（使用者要拿手冊上的字串去下拉選單裡對），
   所以清單直接寫在 radios.html，這裡只翻譯說明文字。BV6LC
   ───────────────────────────────────────────────────────────────── */

const PAGE_T = {

en: {
  radios_title: 'Supported Radios',
  radios_intro: 'FT8TW controls the radio over CAT for frequency readout, mode setting and PTT. The list below is the complete set of models offered in the app, grouped by manufacturer. It is taken from the same list the app itself uses, so the names match the drop-down exactly.',
  radios_howto: `
    <p>To select your radio:</p>
    <ol>
      <li>Open <strong>Settings</strong> &rarr; <strong>Radio &amp; Audio</strong>.</li>
      <li>Tap <strong>Radio Model</strong> and pick your model from the list.</li>
      <li>Set <strong>Control Mode</strong> (CAT / VOX / RTS / DTR) and <strong>Connection</strong> (cable / Bluetooth / network).</li>
      <li>The baud rate and CI-V address are filled in with the defaults for that model. Change them only if your radio's own menu is set differently.</li>
    </ol>`,
  radios_list_title: 'Model list',
  radios_variants_note: 'Some radios appear more than once with a suffix. USB and DATA-USB are two different data modes on the same radio, and U-DIG is Xiegu’s digital mode. Pick the one that matches how your radio is actually set. Choosing the wrong variant usually shows up as the radio connecting but never switching mode or never keying.',
  radios_missing_note: 'If your radio is not listed, try a model from the same manufacturer that uses the same command set. Many radios are compatible with an older model in the same family: Kenwood-compatible sets often work as TS-570 or TS-590, and Yaesu sets as FT-DX10 or FT-DX Other series.',
},

'zh-TW': {
  radios_title: '支援的電台',
  radios_intro: 'FT8TW 透過 CAT 控制電台，用來讀取頻率、設定模式與控制 PTT。以下是 App 內提供的完整機型清單，依廠牌分類。清單取自 App 自己使用的電台表，因此名稱與下拉選單中的字串完全一致。',
  radios_howto: `
    <p>選擇你的電台：</p>
    <ol>
      <li>開啟<strong>設定</strong> &rarr; <strong>電台與聲音</strong>。</li>
      <li>點選<strong>電台型號</strong>，從清單中挑選你的機型。</li>
      <li>設定<strong>控制方式</strong>（CAT / VOX / RTS / DTR）與<strong>連接方式</strong>（有線連接 / 藍牙連接 / 網路連接）。</li>
      <li>傳輸速率與 CI-V 位址會自動帶入該機型的預設值，只有在你電台選單裡的設定不同時才需要更改。</li>
    </ol>`,
  radios_list_title: '機型清單',
  radios_variants_note: '有些電台會出現多次，後面帶有括號。USB 與 DATA-USB 是同一台電台上的兩種不同資料模式，U-DIG 則是協谷的數位模式。請選擇與你電台實際設定相符的那一個。選錯變體最常見的症狀是電台連得上，卻不會切換模式或按不下 PTT。',
  radios_missing_note: '如果清單中沒有你的電台，可以試試同廠牌中使用相同指令集的機型。許多電台與同系列的舊機型相容：Kenwood 相容機通常可用 TS-570 或 TS-590，Yaesu 機種可試 FT-DX10 或 FT-DX Other series。',
},

'zh-CN': {
  radios_title: '支持的电台',
  radios_intro: 'FT8TW 通过 CAT 控制电台，用于读取频率、设置模式与控制 PTT。以下是 App 内提供的完整机型清单，按厂牌分类。清单取自 App 自己使用的电台表，因此名称与下拉菜单中的字符串完全一致。',
  radios_howto: `
    <p>选择你的电台：</p>
    <ol>
      <li>打开<strong>设置</strong> &rarr; <strong>电台与声音</strong>。</li>
      <li>点选<strong>电台型号</strong>，从清单中挑选你的机型。</li>
      <li>设置<strong>控制方式</strong>（CAT / VOX / RTS / DTR）与<strong>连接方式</strong>（有线连接 / 蓝牙连接 / 网络连接）。</li>
      <li>波特率与 CI-V 地址会自动带入该机型的默认值，只有在你电台菜单里的设置不同时才需要更改。</li>
    </ol>`,
  radios_list_title: '机型清单',
  radios_variants_note: '有些电台会出现多次，后面带有括号。USB 与 DATA-USB 是同一台电台上的两种不同数据模式，U-DIG 则是协谷的数字模式。请选择与你电台实际设置相符的那一个。选错变体最常见的症状是电台连得上，却不会切换模式或按不下 PTT。',
  radios_missing_note: '如果清单中没有你的电台，可以试试同厂牌中使用相同指令集的机型。许多电台与同系列的旧机型兼容：Kenwood 兼容机通常可用 TS-570 或 TS-590，Yaesu 机种可试 FT-DX10 或 FT-DX Other series。',
},

'ja': {
  radios_title: '対応リグ',
  radios_intro: 'FT8TW は CAT でリグを制御し、周波数の読み取り、モード設定、PTT を行います。以下はアプリに用意されている機種の一覧で、メーカー別に分類しています。アプリ自身が使うリストから取っているため、名称はドロップダウンの表記と完全に一致します。',
  radios_howto: `
    <p>リグの選び方：</p>
    <ol>
      <li><strong>設定</strong> &rarr; <strong>無線機と音声</strong> を開きます。</li>
      <li><strong>無線機の機種</strong> をタップし、一覧から自分の機種を選びます。</li>
      <li><strong>制御方式</strong>（CAT / VOX / RTS / DTR）と<strong>接続方法</strong>（ケーブル / Bluetooth / ネットワーク）を設定します。</li>
      <li>ボーレートと CI-V アドレスはその機種の既定値が入ります。リグ側のメニュー設定が異なる場合のみ変更してください。</li>
    </ol>`,
  radios_list_title: '機種一覧',
  radios_variants_note: '一部の機種は括弧付きで複数回出てきます。USB と DATA-USB は同じリグの異なるデータモード、U-DIG は Xiegu のデジタルモードです。実際のリグの設定に合うものを選んでください。誤った方を選ぶと、接続はできるのにモードが切り替わらない、PTT が入らないという症状になります。',
  radios_missing_note: '一覧に自分のリグがない場合は、同じメーカーで同じコマンド体系の機種を試してください。多くのリグは同系列の旧機種と互換性があります。Kenwood 互換機は TS-570 か TS-590、Yaesu 機は FT-DX10 か FT-DX Other series が使えることが多いです。',
},

'ru': {
  radios_title: 'Поддерживаемые трансиверы',
  radios_intro: 'FT8TW управляет трансивером по CAT: считывает частоту, задаёт режим и включает передачу. Ниже приведён полный список моделей, доступных в приложении, сгруппированный по производителям. Он взят из того же списка, который использует само приложение, поэтому названия точно совпадают с пунктами выпадающего списка.',
  radios_howto: `
    <p>Как выбрать свой трансивер:</p>
    <ol>
      <li>Откройте <strong>Настройки</strong> &rarr; <strong>Трансивер и звук</strong>.</li>
      <li>Нажмите <strong>Модель трансивера</strong> и выберите свою модель из списка.</li>
      <li>Задайте <strong>способ управления</strong> (CAT / VOX / RTS / DTR) и <strong>подключение</strong> (кабель / Bluetooth / сеть).</li>
      <li>Скорость порта и адрес CI-V подставляются по умолчанию для выбранной модели. Меняйте их только если меню вашего трансивера настроено иначе.</li>
    </ol>`,
  radios_list_title: 'Список моделей',
  radios_variants_note: 'Некоторые модели встречаются несколько раз с уточнением в скобках. USB и DATA-USB — это два разных режима передачи данных одного и того же трансивера, а U-DIG — цифровой режим Xiegu. Выбирайте тот, который соответствует настройкам вашего аппарата. Неверный вариант обычно проявляется так: трансивер подключается, но не переключает режим или не выходит на передачу.',
  radios_missing_note: 'Если вашего трансивера нет в списке, попробуйте модель того же производителя с тем же набором команд. Многие аппараты совместимы с более старой моделью того же семейства: совместимые с Kenwood обычно работают как TS-570 или TS-590, а Yaesu — как FT-DX10 или FT-DX Other series.',
},

'pl': {
  radios_title: 'Obsługiwane radia',
  radios_intro: 'FT8TW steruje radiem przez CAT: odczytuje częstotliwość, ustawia emisję i obsługuje PTT. Poniższa lista zawiera wszystkie modele dostępne w aplikacji, pogrupowane według producenta. Pochodzi z tej samej listy, której używa sama aplikacja, więc nazwy dokładnie odpowiadają pozycjom listy rozwijanej.',
  radios_howto: `
    <p>Aby wybrać swoje radio:</p>
    <ol>
      <li>Otwórz <strong>Ustawienia</strong> &rarr; <strong>Radio i dźwięk</strong>.</li>
      <li>Dotknij <strong>Model radia</strong> i wybierz swój model z listy.</li>
      <li>Ustaw <strong>tryb sterowania</strong> (CAT / VOX / RTS / DTR) oraz <strong>połączenie</strong> (kabel / Bluetooth / sieć).</li>
      <li>Prędkość transmisji i adres CI-V zostaną wypełnione wartościami domyślnymi dla danego modelu. Zmieniaj je tylko wtedy, gdy menu radia jest ustawione inaczej.</li>
    </ol>`,
  radios_list_title: 'Lista modeli',
  radios_variants_note: 'Niektóre modele występują kilka razy z dopiskiem. USB i DATA-USB to dwa różne tryby danych tego samego radia, a U-DIG to tryb cyfrowy Xiegu. Wybierz ten, który odpowiada rzeczywistym ustawieniom twojego radia. Zły wariant objawia się zwykle tak, że radio się łączy, ale nie zmienia emisji albo nie przechodzi na nadawanie.',
  radios_missing_note: 'Jeśli twojego radia nie ma na liście, spróbuj modelu tego samego producenta używającego tego samego zestawu poleceń. Wiele radiotelefonów jest zgodnych ze starszym modelem z tej samej rodziny: radia zgodne z Kenwood zwykle działają jako TS-570 lub TS-590, a Yaesu jako FT-DX10 lub FT-DX Other series.',
},

'es': {
  radios_title: 'Radios compatibles',
  radios_intro: 'FT8TW controla la radio mediante CAT para leer la frecuencia, fijar el modo y accionar el PTT. La lista siguiente contiene todos los modelos que ofrece la aplicación, agrupados por fabricante. Procede de la misma lista que usa la propia aplicación, por lo que los nombres coinciden exactamente con los del desplegable.',
  radios_howto: `
    <p>Para seleccionar su radio:</p>
    <ol>
      <li>Abra <strong>Ajustes</strong> &rarr; <strong>Radio y audio</strong>.</li>
      <li>Pulse <strong>Modelo de radio</strong> y elija su modelo en la lista.</li>
      <li>Configure el <strong>modo de control</strong> (CAT / VOX / RTS / DTR) y la <strong>conexión</strong> (cable / Bluetooth / red).</li>
      <li>La velocidad y la dirección CI-V se rellenan con los valores por defecto del modelo. Cámbielos solo si el menú de su radio está configurado de otro modo.</li>
    </ol>`,
  radios_list_title: 'Lista de modelos',
  radios_variants_note: 'Algunos modelos aparecen varias veces con un sufijo. USB y DATA-USB son dos modos de datos distintos de la misma radio, y U-DIG es el modo digital de Xiegu. Elija el que corresponda a la configuración real de su equipo. Elegir la variante equivocada suele manifestarse como una radio que conecta pero nunca cambia de modo o nunca transmite.',
  radios_missing_note: 'Si su radio no aparece, pruebe un modelo del mismo fabricante que use el mismo juego de comandos. Muchas radios son compatibles con un modelo anterior de la misma familia: las compatibles con Kenwood suelen funcionar como TS-570 o TS-590, y las Yaesu como FT-DX10 o FT-DX Other series.',
},

'el': {
  radios_title: 'Υποστηριζόμενοι πομποδέκτες',
  radios_intro: 'Το FT8TW ελέγχει τον πομποδέκτη μέσω CAT για ανάγνωση συχνότητας, ρύθμιση τρόπου εκπομπής και PTT. Ο παρακάτω κατάλογος περιέχει όλα τα μοντέλα που προσφέρει η εφαρμογή, ομαδοποιημένα ανά κατασκευαστή. Προέρχεται από τον ίδιο κατάλογο που χρησιμοποιεί η ίδια η εφαρμογή, οπότε τα ονόματα ταιριάζουν ακριβώς με αυτά της αναπτυσσόμενης λίστας.',
  radios_howto: `
    <p>Για να επιλέξετε τον πομποδέκτη σας:</p>
    <ol>
      <li>Ανοίξτε τις <strong>Ρυθμίσεις</strong> &rarr; <strong>Πομποδέκτης και ήχος</strong>.</li>
      <li>Πατήστε <strong>Μοντέλο πομποδέκτη</strong> και επιλέξτε το μοντέλο σας από τον κατάλογο.</li>
      <li>Ορίστε τον <strong>τρόπο ελέγχου</strong> (CAT / VOX / RTS / DTR) και τη <strong>σύνδεση</strong> (καλώδιο / Bluetooth / δίκτυο).</li>
      <li>Ο ρυθμός baud και η διεύθυνση CI-V συμπληρώνονται με τις προεπιλογές του μοντέλου. Αλλάξτε τα μόνο αν το μενού του πομποδέκτη σας είναι ρυθμισμένο διαφορετικά.</li>
    </ol>`,
  radios_list_title: 'Κατάλογος μοντέλων',
  radios_variants_note: 'Ορισμένα μοντέλα εμφανίζονται περισσότερες από μία φορές με κατάληξη. Τα USB και DATA-USB είναι δύο διαφορετικοί τρόποι δεδομένων του ίδιου πομποδέκτη, ενώ το U-DIG είναι ο ψηφιακός τρόπος της Xiegu. Επιλέξτε αυτό που ταιριάζει στη ρύθμιση του δικού σας. Η λάθος επιλογή συνήθως εμφανίζεται ως πομποδέκτης που συνδέεται αλλά δεν αλλάζει ποτέ τρόπο ή δεν εκπέμπει ποτέ.',
  radios_missing_note: 'Αν ο πομποδέκτης σας δεν υπάρχει στον κατάλογο, δοκιμάστε ένα μοντέλο του ίδιου κατασκευαστή με το ίδιο σύνολο εντολών. Πολλοί πομποδέκτες είναι συμβατοί με παλαιότερο μοντέλο της ίδιας οικογένειας: οι συμβατοί με Kenwood συνήθως δουλεύουν ως TS-570 ή TS-590, και οι Yaesu ως FT-DX10 ή FT-DX Other series.',
},

};
