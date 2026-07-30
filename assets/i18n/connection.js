/* ── FT8TW User Manual – i18n: Radio Connection ──────────────────── */

const PAGE_T = {

en: {
  conn_title: 'Radio Connection',
  conn_intro: 'FT8TW supports four connection types. Select the appropriate method in Settings → Connection type.',

  conn_vox_title: 'VOX (Audio Only)',
  conn_vox_text:  'The simplest setup. The phone\'s microphone receives audio and the speaker/headphone output drives the radio\'s microphone input. The radio must be switched to transmit manually or via its built-in VOX feature. No CAT control is available — the app cannot change frequency, read meters, or control PTT.',
  conn_vox_use:   'Best for: Handheld radios, simple portable setups, or initial testing.',

  conn_usb_title: 'USB / CAT Control',
  conn_usb_text:  'Connect the radio\'s CAT/ACC port to the phone using a USB-to-serial cable and a USB OTG adapter. The app gains full control over frequency, mode, and PTT.',
  conn_usb_steps: `
    <ol>
      <li>Connect the USB-to-serial cable to your radio's CAT port.</li>
      <li>Attach a USB OTG (On-The-Go) adapter to your phone and plug in the cable.</li>
      <li>Grant USB device access when Android prompts you.</li>
      <li>In Settings, set <strong>Connection type</strong> to <em>USB</em>.</li>
      <li>Select your <strong>Radio model</strong> from the supported list (40+ models).</li>
      <li>Choose the correct <strong>Serial port</strong> device path.</li>
      <li>Set the <strong>Baud rate</strong> to match your radio's CAT speed.</li>
      <li>Set <strong>PTT control</strong>: <em>CAT</em> (preferred), <em>RTS</em>, or <em>DTR</em>.</li>
      <li>For ICOM radios, set the <strong>CI-V address</strong> to match the radio's menu setting.</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'FT8TW supports two Bluetooth operation modes:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP (Serial Port Profile)</strong> – A Bluetooth-to-serial adapter attached to the radio's CAT port replaces the USB cable. Pair the adapter in Android Bluetooth settings first, then select it in FT8TW Settings → Bluetooth device. Provides the same CAT functionality as USB.</li>
      <li><strong>Bluetooth Headset</strong> – Route audio through a Bluetooth headset while using a separate cable for PTT/CAT. Select the headset in Settings → Bluetooth headset. Note: not all Android devices support Bluetooth headset audio recording.</li>
    </ul>`,

  conn_flex_title: 'WiFi – FlexRadio (SmartSDR)',
  conn_flex_text:  'Connect to a FlexRadio FLEX-6000 series transceiver on the same local network using the SmartSDR protocol.',
  conn_flex_steps: `
    <ol>
      <li>Ensure the FlexRadio and the phone are on the same WiFi network.</li>
      <li>In Settings, set <strong>Connection type</strong> to <em>Network</em>.</li>
      <li>FT8TW will auto-discover available FlexRadio devices. Alternatively, enter the IP address manually.</li>
      <li>Optionally configure the maximum TX power (watts) and ATU tune power.</li>
    </ol>`,

  conn_icom_title: 'WiFi – ICOM RS-BA1',
  conn_icom_text:  'Connect to ICOM transceivers via the RS-BA1 remote control protocol (available on radios with built-in LAN/WiFi, or via an external RS-BA1 server).',
  conn_icom_steps: `
    <ol>
      <li>In Settings, set <strong>Connection type</strong> to <em>Network</em>.</li>
      <li>Enter the radio's <strong>IP address</strong>.</li>
      <li>Enter the <strong>UDP control port</strong>, <strong>username</strong>, and <strong>password</strong> configured in the ICOM network settings.</li>
      <li>Tap <strong>Login</strong> to connect.</li>
    </ol>`,

  conn_xiegu_title: 'WiFi – Xiegu X6100',
  conn_xiegu_text:  'Connect to the Xiegu X6100 SDR transceiver over its built-in WiFi interface. Ensure the phone and X6100 are on the same network or connected in hotspot mode, then select the device from the discovery list.',
},

'zh-TW': {
  conn_title: '電台連線',
  conn_intro: 'FT8TW 支援四種連線方式，請在設置中選擇「連接方式」。',

  conn_vox_title: 'VOX（僅音訊）',
  conn_vox_text:  '最簡單的連線方式。手機麥克風接收音訊，喇叭或耳機輸出驅動電台麥克風輸入。電台需手動切換至發射，或透過電台本身的 VOX 功能。無 CAT 控制，程式無法更改頻率或讀取儀表數值。',
  conn_vox_use:   '適用於：手持電台、簡易移動場合，或初步測試。',

  conn_usb_title: 'USB / CAT 控制',
  conn_usb_text:  '透過 USB 轉序列線搭配 USB OTG 轉接頭，將電台 CAT/ACC 埠連接至手機，程式可全面控制頻率、模式及 PTT。',
  conn_usb_steps: `
    <ol>
      <li>將 USB 轉序列線連接至電台的 CAT 埠。</li>
      <li>以 USB OTG 轉接頭接上手機，再插入連接線。</li>
      <li>Android 提示時授予 USB 裝置存取權限。</li>
      <li>在設置中將<strong>連接方式</strong>設為<em>有線連接（USB）</em>。</li>
      <li>從支援清單（40+ 款）選擇您的<strong>電台型號</strong>。</li>
      <li>選擇正確的<strong>連接埠</strong>裝置路徑。</li>
      <li>將<strong>傳輸速率（Baud rate）</strong>設為與電台 CAT 速度相符的數值。</li>
      <li>設定 <strong>PTT 控制</strong>：<em>CAT</em>（建議）、<em>RTS</em> 或 <em>DTR</em>。</li>
      <li>ICOM 電台需將 <strong>CI-V 地址</strong>設為與電台選單相同的值。</li>
    </ol>`,

  conn_bt_title: '藍牙',
  conn_bt_text:  'FT8TW 支援兩種藍牙操作模式：',
  conn_bt_modes: `
    <ul>
      <li><strong>藍牙 SPP（序列埠協議）</strong> — 電台 CAT 埠連接藍牙轉序列模組，取代 USB 線。請先在 Android 藍牙設定中配對模組，再於 FT8TW 設置中選取。提供與 USB 相同的 CAT 控制功能。</li>
      <li><strong>藍牙耳機</strong> — 透過藍牙耳機收發音訊，PTT/CAT 另以獨立線材處理。在設置中選取藍牙耳機裝置。注意：並非所有 Android 裝置均支援藍牙耳機錄音。</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio（SmartSDR）',
  conn_flex_text:  '透過 SmartSDR 協議在同一區域網路內連接 FlexRadio FLEX-6000 系列電台。',
  conn_flex_steps: `
    <ol>
      <li>確認 FlexRadio 與手機連接至同一 WiFi 網路。</li>
      <li>在設置中將<strong>連接方式</strong>設為<em>網路連接</em>。</li>
      <li>程式會自動搜尋可用的 FlexRadio 裝置；亦可手動輸入 IP 位址。</li>
      <li>可選設定最大發射功率（瓦）及 ATU 調諧功率。</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  '透過 RS-BA1 遠端控制協議連接 ICOM 電台（適用於具備內建 LAN/WiFi 的電台，或安裝外部 RS-BA1 伺服器的電台）。',
  conn_icom_steps: `
    <ol>
      <li>在設置中將<strong>連接方式</strong>設為<em>網路連接</em>。</li>
      <li>輸入電台的 <strong>IP 位址</strong>。</li>
      <li>輸入 ICOM 網路設定中的 <strong>UDP 控制埠</strong>、<strong>使用者代號</strong>及<strong>密碼</strong>。</li>
      <li>點選<strong>登入</strong>建立連線。</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — 協谷 X6100',
  conn_xiegu_text:  '透過 Xiegu X6100 SDR 電台的內建 WiFi 介面進行連線。確認手機與 X6100 連接至同一網路或直接連接熱點，再從搜尋清單中選取裝置。',
},

'zh-CN': {
  conn_title: '电台连接',
  conn_intro: 'FT8TW 支持四种连接方式，请在设置中选择「连接方式」。',

  conn_vox_title: 'VOX（仅音频）',
  conn_vox_text:  '最简单的连接方式。手机麦克风接收音频，扬声器或耳机输出驱动电台麦克风输入。电台需手动切换至发射，或通过电台自身的 VOX 功能。无 CAT 控制，程序无法更改频率或读取仪表数值。',
  conn_vox_use:   '适用于：手持电台、简易移动场合，或初步测试。',

  conn_usb_title: 'USB / CAT 控制',
  conn_usb_text:  '通过 USB 转串口线搭配 USB OTG 转接头，将电台 CAT/ACC 口连接至手机，程序可全面控制频率、模式及 PTT。',
  conn_usb_steps: `
    <ol>
      <li>将 USB 转串口线连接至电台的 CAT 口。</li>
      <li>用 USB OTG 转接头接上手机，再插入连接线。</li>
      <li>Android 提示时授予 USB 设备访问权限。</li>
      <li>在设置中将<strong>连接方式</strong>设为<em>有线连接（USB）</em>。</li>
      <li>从支持列表（40+ 款）选择您的<strong>电台型号</strong>。</li>
      <li>选择正确的<strong>串口</strong>设备路径。</li>
      <li>将<strong>波特率（Baud rate）</strong>设为与电台 CAT 速度相符的数值。</li>
      <li>设置 <strong>PTT 控制</strong>：<em>CAT</em>（推荐）、<em>RTS</em> 或 <em>DTR</em>。</li>
      <li>ICOM 电台需将 <strong>CI-V 地址</strong>设为与电台菜单相同的值。</li>
    </ol>`,

  conn_bt_title: '蓝牙',
  conn_bt_text:  'FT8TW 支持两种蓝牙操作模式：',
  conn_bt_modes: `
    <ul>
      <li><strong>蓝牙 SPP（串口协议）</strong> — 电台 CAT 口连接蓝牙转串口模块，取代 USB 线。请先在 Android 蓝牙设置中配对模块，再于 FT8TW 设置中选取。提供与 USB 相同的 CAT 控制功能。</li>
      <li><strong>蓝牙耳机</strong> — 通过蓝牙耳机收发音频，PTT/CAT 另以独立线材处理。在设置中选取蓝牙耳机设备。注意：并非所有 Android 设备均支持蓝牙耳机录音。</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio（SmartSDR）',
  conn_flex_text:  '通过 SmartSDR 协议在同一局域网内连接 FlexRadio FLEX-6000 系列电台。',
  conn_flex_steps: `
    <ol>
      <li>确认 FlexRadio 与手机连接至同一 WiFi 网络。</li>
      <li>在设置中将<strong>连接方式</strong>设为<em>网络连接</em>。</li>
      <li>程序会自动搜索可用的 FlexRadio 设备；也可手动输入 IP 地址。</li>
      <li>可选设置最大发射功率（瓦）及 ATU 调谐功率。</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  '通过 RS-BA1 远程控制协议连接 ICOM 电台（适用于具备内置 LAN/WiFi 的电台，或安装外部 RS-BA1 服务器的电台）。',
  conn_icom_steps: `
    <ol>
      <li>在设置中将<strong>连接方式</strong>设为<em>网络连接</em>。</li>
      <li>输入电台的 <strong>IP 地址</strong>。</li>
      <li>输入 ICOM 网络设置中的 <strong>UDP 控制端口</strong>、<strong>用户名</strong>及<strong>密码</strong>。</li>
      <li>点击<strong>登录</strong>建立连接。</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — 协谷 X6100',
  conn_xiegu_text:  '通过 Xiegu X6100 SDR 电台的内置 WiFi 接口进行连接。确认手机与 X6100 连接至同一网络或直接连接热点，再从搜索列表中选取设备。',
},

'ja': {
  conn_title: '無線機との接続',
  conn_intro: 'FT8TW は 4 種類の接続方式に対応しています。設定 → 接続方式 で適切なものを選んでください。',

  conn_vox_title: 'VOX（音声のみ）',
  conn_vox_text:  'いちばん簡単な構成です。スマートフォンのマイクで音声を受け、スピーカーまたはイヤホン出力で無線機のマイク入力を駆動します。送信への切り替えは手動、または無線機側の VOX 機能で行います。CAT 制御はないため、アプリから周波数の変更やメーターの読み取り、PTT の制御はできません。',
  conn_vox_use:   '向いている用途: ハンディ機、簡易な移動運用、最初の動作確認。',

  conn_usb_title: 'USB / CAT 制御',
  conn_usb_text:  'USB シリアル変換ケーブルと USB OTG アダプターで、無線機の CAT/ACC 端子をスマートフォンに接続します。周波数・モード・PTT をアプリから完全に制御できます。',
  conn_usb_steps: `
    <ol>
      <li>USB シリアル変換ケーブルを無線機の CAT 端子に接続します。</li>
      <li>スマートフォンに USB OTG アダプターを取り付け、ケーブルを挿します。</li>
      <li>Android から確認が出たら USB デバイスへのアクセスを許可します。</li>
      <li>設定で<strong>接続方式</strong>を <em>USB</em> にします。</li>
      <li>対応リスト（40 機種以上）から<strong>無線機の機種</strong>を選びます。</li>
      <li>正しい<strong>シリアルポート</strong>のデバイスパスを選びます。</li>
      <li><strong>ボーレート</strong>を無線機の CAT 速度に合わせます。</li>
      <li><strong>PTT 制御</strong>を設定します: <em>CAT</em>（推奨）、<em>RTS</em>、<em>DTR</em>。</li>
      <li>ICOM 機では <strong>CI-V アドレス</strong>を無線機のメニュー設定と一致させます。</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'FT8TW は 2 通りの Bluetooth 運用に対応します:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP（シリアルポートプロファイル）</strong> — 無線機の CAT 端子に Bluetooth シリアル変換アダプターを付け、USB ケーブルの代わりにします。先に Android の Bluetooth 設定でペアリングし、FT8TW の 設定 → Bluetooth デバイス で選択します。USB と同じ CAT 機能が使えます。</li>
      <li><strong>Bluetooth ヘッドセット</strong> — 音声を Bluetooth ヘッドセット経由にし、PTT/CAT は別のケーブルで扱います。設定 → Bluetooth ヘッドセット で選択します。なお、すべての Android 端末が Bluetooth ヘッドセットからの録音に対応しているわけではありません。</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio（SmartSDR）',
  conn_flex_text:  '同じローカルネットワーク上の FlexRadio FLEX-6000 シリーズに SmartSDR プロトコルで接続します。',
  conn_flex_steps: `
    <ol>
      <li>FlexRadio とスマートフォンを同じ WiFi ネットワークに接続します。</li>
      <li>設定で<strong>接続方式</strong>を<em>ネットワーク</em>にします。</li>
      <li>FT8TW が利用可能な FlexRadio を自動検出します。IP アドレスを手入力することもできます。</li>
      <li>必要に応じて最大送信出力（W）と ATU チューン出力を設定します。</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  'RS-BA1 のリモートコントロールプロトコルで ICOM の無線機に接続します（LAN/WiFi を内蔵した機種、または外部の RS-BA1 サーバー経由）。',
  conn_icom_steps: `
    <ol>
      <li>設定で<strong>接続方式</strong>を<em>ネットワーク</em>にします。</li>
      <li>無線機の <strong>IP アドレス</strong>を入力します。</li>
      <li>ICOM のネットワーク設定で決めた <strong>UDP 制御ポート</strong>、<strong>ユーザー名</strong>、<strong>パスワード</strong>を入力します。</li>
      <li><strong>ログイン</strong>をタップして接続します。</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — Xiegu X6100',
  conn_xiegu_text:  'Xiegu X6100 SDR トランシーバーの内蔵 WiFi で接続します。スマートフォンと X6100 を同じネットワークに接続するかテザリングでつなぎ、検出された一覧から選択してください。',
},

'ru': {
  conn_title: 'Подключение трансивера',
  conn_intro: 'FT8TW поддерживает четыре способа подключения. Нужный выбирается в Настройки → Тип подключения.',

  conn_vox_title: 'VOX (только звук)',
  conn_vox_text:  'Самый простой вариант. Микрофон телефона принимает звук, а выход на динамик или наушники подаётся на микрофонный вход трансивера. На передачу трансивер переводится вручную или его собственным VOX. Управления CAT нет: приложение не может менять частоту, читать приборы или управлять PTT.',
  conn_vox_use:   'Подходит для: носимых радиостанций, простых выездов и первых проверок.',

  conn_usb_title: 'USB / управление CAT',
  conn_usb_text:  'Соедините разъём CAT/ACC трансивера с телефоном кабелем USB–последовательный порт через переходник USB OTG. Приложение получает полный контроль над частотой, режимом и PTT.',
  conn_usb_steps: `
    <ol>
      <li>Подключите кабель USB–последовательный порт к разъёму CAT трансивера.</li>
      <li>Подсоедините к телефону переходник USB OTG и вставьте кабель.</li>
      <li>Разрешите доступ к USB-устройству, когда Android об этом спросит.</li>
      <li>В настройках выберите <strong>Тип подключения</strong> — <em>USB</em>.</li>
      <li>Выберите <strong>модель трансивера</strong> из списка поддерживаемых (более 40).</li>
      <li>Укажите правильный путь к устройству <strong>последовательного порта</strong>.</li>
      <li>Задайте <strong>скорость передачи</strong>, соответствующую настройке CAT в трансивере.</li>
      <li>Настройте <strong>управление PTT</strong>: <em>CAT</em> (предпочтительно), <em>RTS</em> или <em>DTR</em>.</li>
      <li>Для трансиверов ICOM задайте <strong>адрес CI-V</strong> так же, как в меню аппарата.</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'FT8TW поддерживает два режима работы по Bluetooth:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP (профиль последовательного порта)</strong> — адаптер Bluetooth–последовательный порт на разъёме CAT заменяет USB-кабель. Сначала выполните сопряжение в настройках Bluetooth Android, затем выберите адаптер в FT8TW: Настройки → Устройство Bluetooth. Возможности CAT те же, что и по USB.</li>
      <li><strong>Bluetooth-гарнитура</strong> — звук идёт через гарнитуру, а PTT/CAT — по отдельному кабелю. Гарнитура выбирается в Настройки → Bluetooth-гарнитура. Учтите: не все устройства Android умеют записывать звук с Bluetooth-гарнитуры.</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio (SmartSDR)',
  conn_flex_text:  'Подключение к трансиверам FlexRadio серии FLEX-6000 в той же локальной сети по протоколу SmartSDR.',
  conn_flex_steps: `
    <ol>
      <li>Убедитесь, что FlexRadio и телефон находятся в одной сети WiFi.</li>
      <li>В настройках выберите <strong>Тип подключения</strong> — <em>Сеть</em>.</li>
      <li>FT8TW сам найдёт доступные устройства FlexRadio. IP-адрес также можно ввести вручную.</li>
      <li>При желании задайте максимальную мощность передачи (Вт) и мощность настройки ATU.</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  'Подключение к трансиверам ICOM по протоколу удалённого управления RS-BA1 (для аппаратов со встроенным LAN/WiFi или через внешний сервер RS-BA1).',
  conn_icom_steps: `
    <ol>
      <li>В настройках выберите <strong>Тип подключения</strong> — <em>Сеть</em>.</li>
      <li>Введите <strong>IP-адрес</strong> трансивера.</li>
      <li>Введите <strong>UDP-порт управления</strong>, <strong>имя пользователя</strong> и <strong>пароль</strong>, заданные в сетевых настройках ICOM.</li>
      <li>Нажмите <strong>Войти</strong>, чтобы подключиться.</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — Xiegu X6100',
  conn_xiegu_text:  'Подключение к SDR-трансиверу Xiegu X6100 через его встроенный интерфейс WiFi. Убедитесь, что телефон и X6100 в одной сети либо соединены через точку доступа, затем выберите устройство из списка найденных.',
},

'pl': {
  conn_title: 'Połączenie z radiem',
  conn_intro: 'FT8TW obsługuje cztery rodzaje połączeń. Wybierz odpowiedni w Ustawienia → Rodzaj połączenia.',

  conn_vox_title: 'VOX (tylko dźwięk)',
  conn_vox_text:  'Najprostsza konfiguracja. Mikrofon telefonu odbiera dźwięk, a wyjście głośnika lub słuchawek steruje wejściem mikrofonowym radia. Na nadawanie trzeba przełączyć ręcznie albo skorzystać z funkcji VOX w radiu. Nie ma sterowania CAT — aplikacja nie zmieni częstotliwości, nie odczyta wskaźników ani nie załączy PTT.',
  conn_vox_use:   'Najlepsze do: radiotelefonów ręcznych, prostych wyjść w teren i pierwszych prób.',

  conn_usb_title: 'USB / sterowanie CAT',
  conn_usb_text:  'Połącz port CAT/ACC radia z telefonem kablem USB–port szeregowy oraz przejściówką USB OTG. Aplikacja uzyskuje pełną kontrolę nad częstotliwością, emisją i PTT.',
  conn_usb_steps: `
    <ol>
      <li>Podłącz kabel USB–port szeregowy do gniazda CAT radia.</li>
      <li>Podłącz do telefonu przejściówkę USB OTG i wepnij kabel.</li>
      <li>Zezwól na dostęp do urządzenia USB, gdy Android o to poprosi.</li>
      <li>W ustawieniach ustaw <strong>Rodzaj połączenia</strong> na <em>USB</em>.</li>
      <li>Wybierz swój <strong>model radia</strong> z listy obsługiwanych (ponad 40).</li>
      <li>Wskaż właściwą ścieżkę urządzenia <strong>portu szeregowego</strong>.</li>
      <li>Ustaw <strong>prędkość transmisji</strong> zgodnie z ustawieniem CAT w radiu.</li>
      <li>Ustaw <strong>sterowanie PTT</strong>: <em>CAT</em> (zalecane), <em>RTS</em> lub <em>DTR</em>.</li>
      <li>W radiach ICOM ustaw <strong>adres CI-V</strong> zgodny z menu urządzenia.</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'FT8TW obsługuje dwa tryby pracy przez Bluetooth:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP (profil portu szeregowego)</strong> — adapter Bluetooth–port szeregowy podłączony do gniazda CAT zastępuje kabel USB. Najpierw sparuj adapter w ustawieniach Bluetooth Androida, potem wybierz go w Ustawienia → Urządzenie Bluetooth. Daje te same możliwości CAT co USB.</li>
      <li><strong>Zestaw słuchawkowy Bluetooth</strong> — dźwięk idzie przez zestaw Bluetooth, a PTT/CAT osobnym kablem. Zestaw wybierz w Ustawienia → Zestaw słuchawkowy Bluetooth. Uwaga: nie wszystkie urządzenia z Androidem potrafią nagrywać dźwięk z zestawu Bluetooth.</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio (SmartSDR)',
  conn_flex_text:  'Połączenie z transceiverem FlexRadio serii FLEX-6000 w tej samej sieci lokalnej przy użyciu protokołu SmartSDR.',
  conn_flex_steps: `
    <ol>
      <li>Upewnij się, że FlexRadio i telefon są w tej samej sieci WiFi.</li>
      <li>W ustawieniach ustaw <strong>Rodzaj połączenia</strong> na <em>Sieć</em>.</li>
      <li>FT8TW automatycznie wykryje dostępne urządzenia FlexRadio. Adres IP można też wpisać ręcznie.</li>
      <li>Opcjonalnie ustaw maksymalną moc nadawania (W) oraz moc strojenia ATU.</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  'Połączenie z radiami ICOM przez protokół zdalnego sterowania RS-BA1 (dla urządzeń z wbudowanym LAN/WiFi lub przez zewnętrzny serwer RS-BA1).',
  conn_icom_steps: `
    <ol>
      <li>W ustawieniach ustaw <strong>Rodzaj połączenia</strong> na <em>Sieć</em>.</li>
      <li>Wpisz <strong>adres IP</strong> radia.</li>
      <li>Wpisz <strong>port sterujący UDP</strong>, <strong>nazwę użytkownika</strong> i <strong>hasło</strong> ustawione w konfiguracji sieciowej ICOM.</li>
      <li>Dotknij <strong>Zaloguj</strong>, aby się połączyć.</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — Xiegu X6100',
  conn_xiegu_text:  'Połączenie z transceiverem SDR Xiegu X6100 przez jego wbudowany interfejs WiFi. Upewnij się, że telefon i X6100 są w tej samej sieci lub połączone w trybie hotspotu, a następnie wybierz urządzenie z listy wykrytych.',
},

'es': {
  conn_title: 'Conexión del equipo',
  conn_intro: 'FT8TW admite cuatro tipos de conexión. Selecciona el adecuado en Ajustes → Tipo de conexión.',

  conn_vox_title: 'VOX (solo audio)',
  conn_vox_text:  'La configuración más sencilla. El micrófono del teléfono recibe el audio y la salida de altavoz o auriculares ataca la entrada de micrófono del equipo. El paso a transmisión se hace a mano o con la función VOX del propio equipo. No hay control CAT: la aplicación no puede cambiar de frecuencia, leer instrumentos ni controlar el PTT.',
  conn_vox_use:   'Ideal para: equipos portátiles de mano, montajes sencillos o pruebas iniciales.',

  conn_usb_title: 'USB / control CAT',
  conn_usb_text:  'Conecta el puerto CAT/ACC del equipo al teléfono con un cable USB-serie y un adaptador USB OTG. La aplicación obtiene control total de la frecuencia, el modo y el PTT.',
  conn_usb_steps: `
    <ol>
      <li>Conecta el cable USB-serie al puerto CAT de tu equipo.</li>
      <li>Acopla un adaptador USB OTG al teléfono y enchufa el cable.</li>
      <li>Concede el acceso al dispositivo USB cuando Android lo pida.</li>
      <li>En Ajustes, pon <strong>Tipo de conexión</strong> en <em>USB</em>.</li>
      <li>Selecciona tu <strong>modelo de equipo</strong> en la lista de compatibles (más de 40).</li>
      <li>Elige la ruta del dispositivo de <strong>puerto serie</strong> correcta.</li>
      <li>Ajusta la <strong>velocidad en baudios</strong> para que coincida con la del CAT de tu equipo.</li>
      <li>Configura el <strong>control de PTT</strong>: <em>CAT</em> (preferible), <em>RTS</em> o <em>DTR</em>.</li>
      <li>En equipos ICOM, ajusta la <strong>dirección CI-V</strong> igual que en el menú del equipo.</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'FT8TW admite dos modos de funcionamiento por Bluetooth:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP (perfil de puerto serie)</strong> — un adaptador Bluetooth-serie conectado al puerto CAT sustituye al cable USB. Empareja primero el adaptador en los ajustes de Bluetooth de Android y luego selecciónalo en Ajustes → Dispositivo Bluetooth. Ofrece las mismas funciones CAT que el USB.</li>
      <li><strong>Auricular Bluetooth</strong> — el audio pasa por un auricular Bluetooth mientras el PTT/CAT usa un cable aparte. Selecciona el auricular en Ajustes → Auricular Bluetooth. Nota: no todos los dispositivos Android admiten grabar audio desde un auricular Bluetooth.</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio (SmartSDR)',
  conn_flex_text:  'Conexión con un transceptor FlexRadio de la serie FLEX-6000 en la misma red local mediante el protocolo SmartSDR.',
  conn_flex_steps: `
    <ol>
      <li>Asegúrate de que el FlexRadio y el teléfono estén en la misma red WiFi.</li>
      <li>En Ajustes, pon <strong>Tipo de conexión</strong> en <em>Red</em>.</li>
      <li>FT8TW detectará automáticamente los FlexRadio disponibles. También puedes introducir la dirección IP a mano.</li>
      <li>Si quieres, configura la potencia máxima de transmisión (vatios) y la potencia de sintonía del ATU.</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  'Conexión con equipos ICOM mediante el protocolo de control remoto RS-BA1 (para equipos con LAN/WiFi integrada o a través de un servidor RS-BA1 externo).',
  conn_icom_steps: `
    <ol>
      <li>En Ajustes, pon <strong>Tipo de conexión</strong> en <em>Red</em>.</li>
      <li>Introduce la <strong>dirección IP</strong> del equipo.</li>
      <li>Introduce el <strong>puerto UDP de control</strong>, el <strong>usuario</strong> y la <strong>contraseña</strong> definidos en los ajustes de red de ICOM.</li>
      <li>Pulsa <strong>Iniciar sesión</strong> para conectar.</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — Xiegu X6100',
  conn_xiegu_text:  'Conexión con el transceptor SDR Xiegu X6100 por su interfaz WiFi integrada. Comprueba que el teléfono y el X6100 estén en la misma red o conectados en modo punto de acceso y selecciona el equipo en la lista de detectados.',
},

'el': {
  conn_title: 'Σύνδεση πομποδέκτη',
  conn_intro: 'Το FT8TW υποστηρίζει τέσσερις τύπους σύνδεσης. Επιλέξτε τον κατάλληλο στις Ρυθμίσεις → Τύπος σύνδεσης.',

  conn_vox_title: 'VOX (μόνο ήχος)',
  conn_vox_text:  'Η απλούστερη διάταξη. Το μικρόφωνο του τηλεφώνου λαμβάνει τον ήχο και η έξοδος ηχείου ή ακουστικών οδηγεί την είσοδο μικροφώνου του πομποδέκτη. Η μετάβαση σε εκπομπή γίνεται χειροκίνητα ή με τη λειτουργία VOX του πομποδέκτη. Δεν υπάρχει έλεγχος CAT — η εφαρμογή δεν μπορεί να αλλάξει συχνότητα, να διαβάσει όργανα ή να ελέγξει το PTT.',
  conn_vox_use:   'Κατάλληλο για: φορητούς πομποδέκτες, απλές διατάξεις εκτός βάσης ή αρχικές δοκιμές.',

  conn_usb_title: 'USB / έλεγχος CAT',
  conn_usb_text:  'Συνδέστε τη θύρα CAT/ACC του πομποδέκτη στο τηλέφωνο με καλώδιο USB προς σειριακή και αντάπτορα USB OTG. Η εφαρμογή αποκτά πλήρη έλεγχο συχνότητας, τρόπου λειτουργίας και PTT.',
  conn_usb_steps: `
    <ol>
      <li>Συνδέστε το καλώδιο USB προς σειριακή στη θύρα CAT του πομποδέκτη.</li>
      <li>Προσαρτήστε αντάπτορα USB OTG στο τηλέφωνο και συνδέστε το καλώδιο.</li>
      <li>Παραχωρήστε πρόσβαση στη συσκευή USB όταν το ζητήσει το Android.</li>
      <li>Στις Ρυθμίσεις ορίστε τον <strong>Τύπο σύνδεσης</strong> σε <em>USB</em>.</li>
      <li>Επιλέξτε το <strong>μοντέλο πομποδέκτη</strong> από τη λίστα υποστηριζόμενων (άνω των 40).</li>
      <li>Επιλέξτε τη σωστή διαδρομή συσκευής <strong>σειριακής θύρας</strong>.</li>
      <li>Ορίστε τον <strong>ρυθμό baud</strong> ώστε να ταιριάζει με την ταχύτητα CAT του πομποδέκτη.</li>
      <li>Ορίστε τον <strong>έλεγχο PTT</strong>: <em>CAT</em> (προτιμότερο), <em>RTS</em> ή <em>DTR</em>.</li>
      <li>Για πομποδέκτες ICOM ορίστε τη <strong>διεύθυνση CI-V</strong> ίδια με τη ρύθμιση στο μενού του μηχανήματος.</li>
    </ol>`,

  conn_bt_title: 'Bluetooth',
  conn_bt_text:  'Το FT8TW υποστηρίζει δύο τρόπους λειτουργίας μέσω Bluetooth:',
  conn_bt_modes: `
    <ul>
      <li><strong>Bluetooth SPP (προφίλ σειριακής θύρας)</strong> — ένας αντάπτορας Bluetooth προς σειριακή στη θύρα CAT αντικαθιστά το καλώδιο USB. Κάντε πρώτα σύζευξη στις ρυθμίσεις Bluetooth του Android και μετά επιλέξτε τον στις Ρυθμίσεις → Συσκευή Bluetooth. Προσφέρει τις ίδιες δυνατότητες CAT με το USB.</li>
      <li><strong>Ακουστικά Bluetooth</strong> — ο ήχος περνά από ακουστικά Bluetooth ενώ το PTT/CAT χρησιμοποιεί ξεχωριστό καλώδιο. Επιλέξτε τα ακουστικά στις Ρυθμίσεις → Ακουστικά Bluetooth. Σημείωση: δεν υποστηρίζουν όλες οι συσκευές Android εγγραφή ήχου από ακουστικά Bluetooth.</li>
    </ul>`,

  conn_flex_title: 'WiFi — FlexRadio (SmartSDR)',
  conn_flex_text:  'Σύνδεση με πομποδέκτη FlexRadio σειράς FLEX-6000 στο ίδιο τοπικό δίκτυο μέσω του πρωτοκόλλου SmartSDR.',
  conn_flex_steps: `
    <ol>
      <li>Βεβαιωθείτε ότι ο FlexRadio και το τηλέφωνο βρίσκονται στο ίδιο δίκτυο WiFi.</li>
      <li>Στις Ρυθμίσεις ορίστε τον <strong>Τύπο σύνδεσης</strong> σε <em>Δίκτυο</em>.</li>
      <li>Το FT8TW εντοπίζει αυτόματα τις διαθέσιμες συσκευές FlexRadio. Εναλλακτικά, εισαγάγετε τη διεύθυνση IP χειροκίνητα.</li>
      <li>Προαιρετικά ρυθμίστε τη μέγιστη ισχύ εκπομπής (watt) και την ισχύ συντονισμού ATU.</li>
    </ol>`,

  conn_icom_title: 'WiFi — ICOM RS-BA1',
  conn_icom_text:  'Σύνδεση με πομποδέκτες ICOM μέσω του πρωτοκόλλου απομακρυσμένου ελέγχου RS-BA1 (για μηχανήματα με ενσωματωμένο LAN/WiFi ή μέσω εξωτερικού διακομιστή RS-BA1).',
  conn_icom_steps: `
    <ol>
      <li>Στις Ρυθμίσεις ορίστε τον <strong>Τύπο σύνδεσης</strong> σε <em>Δίκτυο</em>.</li>
      <li>Εισαγάγετε τη <strong>διεύθυνση IP</strong> του πομποδέκτη.</li>
      <li>Εισαγάγετε τη <strong>θύρα ελέγχου UDP</strong>, το <strong>όνομα χρήστη</strong> και τον <strong>κωδικό</strong> που έχουν οριστεί στις ρυθμίσεις δικτύου του ICOM.</li>
      <li>Πατήστε <strong>Σύνδεση</strong> για να συνδεθείτε.</li>
    </ol>`,

  conn_xiegu_title: 'WiFi — Xiegu X6100',
  conn_xiegu_text:  'Σύνδεση με τον πομποδέκτη SDR Xiegu X6100 μέσω της ενσωματωμένης διεπαφής WiFi. Βεβαιωθείτε ότι το τηλέφωνο και το X6100 είναι στο ίδιο δίκτυο ή συνδεδεμένα σε λειτουργία hotspot και επιλέξτε τη συσκευή από τη λίστα εντοπισμού.',
},

}; /* end PAGE_T */
