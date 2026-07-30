/* ── FT8TW User Manual – i18n: Troubleshooting ───────────────────── */

const PAGE_T = {

en: {
  ts_title: 'Troubleshooting',

  ts_nodecode_title: 'No Decodes / Poor Reception',
  ts_nodecode_list: `
    <ul>
      <li>Verify your device clock is accurate (±1 second). Tap <strong>Sync</strong> in Settings.</li>
      <li>Make sure the <strong>Microphone permission</strong> is granted to FT8TW.</li>
      <li>Check that the radio is in <strong>USB mode</strong> (upper sideband), not LSB, AM, or FM.</li>
      <li>Adjust the radio's AF output level — audio should be clean and not clipping.</li>
      <li>Switch decode mode to <strong>Deep</strong> for marginal signal conditions.</li>
      <li>Ensure you are on the correct FT8 frequency for your band (e.g., 14.074 MHz for 20m).</li>
    </ul>`,

  ts_noconn_title: 'Cannot Connect to Radio',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> Confirm USB OTG is supported by your device. Grant USB device permission when Android prompts you. Try a different OTG adapter or cable.</li>
      <li>Verify the <strong>radio model</strong> and <strong>baud rate</strong> match your radio's CAT settings.</li>
      <li>For ICOM: check the <strong>CI-V address</strong> matches the radio's menu setting (often 0x94 or 0xA4).</li>
      <li><strong>Bluetooth:</strong> Pair the adapter in Android Bluetooth settings before selecting it in FT8TW. Ensure the adapter is powered and within range.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> Confirm both phone and radio are on the same network. Check the IP address and port number.</li>
    </ul>`,

  ts_notx_title: 'No Transmission',
  ts_notx_list: `
    <ul>
      <li>Confirm your <strong>callsign</strong> is entered and valid — the app will not transmit with an invalid callsign.</li>
      <li>Check the <strong>PTT control</strong> setting (VOX / CAT / RTS / DTR) matches your hardware.</li>
      <li>Increase <strong>PTT delay</strong> if the radio is slow to switch to transmit.</li>
      <li>Check whether the <strong>TX watchdog</strong> timer has stopped transmission.</li>
      <li>FT8TW will refuse to transmit on <strong>WSPR-2 frequencies</strong> to avoid interference.</li>
      <li>Verify audio output routing — for Bluetooth headsets, confirm the headset is the selected audio output.</li>
    </ul>`,

  ts_timesync_title: 'Time Synchronization Issues',
  ts_timesync_list: `
    <ul>
      <li>Tap <strong>Sync</strong> in Settings to resynchronize the clock via NTP.</li>
      <li>Ensure the device has an internet connection for network time sync.</li>
      <li>If you have a GPS lock, the app prefers GPS time for higher accuracy.</li>
      <li>A large displayed offset (e.g., &gt;500 ms) indicates a system clock problem — check Android date/time settings.</li>
      <li>If auto time is disabled on the device, the app will fall back to a time server and display a warning.</li>
    </ul>`,

  ts_bt_title: 'Bluetooth Audio Issues',
  ts_bt_list: `
    <ul>
      <li>After connecting a Bluetooth headset, wait a few seconds for audio routing to switch automatically.</li>
      <li>If recording fails, your headset may not support the <strong>HFP (Hands-Free Profile)</strong> required for microphone input. Use a wired headset instead.</li>
      <li>Some Android devices do not support Bluetooth audio recording. In that case, use the built-in microphone or a wired connection for receiving and Bluetooth only for transmit audio.</li>
    </ul>`,
},

'zh-TW': {
  ts_title: '問題排除',

  ts_nodecode_title: '無解碼結果 / 接收品質不佳',
  ts_nodecode_list: `
    <ul>
      <li>確認裝置時間準確（±1 秒內），在設置中點選<strong>同步時間</strong>。</li>
      <li>確認已授予 FT8TW <strong>麥克風</strong>權限。</li>
      <li>確認電台設定為 <strong>USB 模式</strong>（上旁頻），勿使用 LSB、AM 或 FM。</li>
      <li>調整電台 AF 增益，音訊應清晰且不失真。失真會導致解碼失敗。</li>
      <li>弱訊號條件下改用<strong>多次</strong>解碼模式。</li>
      <li>確認所在頻率為該頻段的 FT8 標準頻率（例如 20m 為 14.074 MHz）。</li>
    </ul>`,

  ts_noconn_title: '無法連接電台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>確認裝置支援 USB OTG，Android 提示時授予 USB 裝置存取權限，可嘗試更換 OTG 轉接頭或連接線。</li>
      <li>確認<strong>電台型號</strong>及<strong>傳輸速率</strong>與電台 CAT 設定相符。</li>
      <li>ICOM 電台需確認 <strong>CI-V 地址</strong>與電台選單設定一致（常見值為 0x94 或 0xA4）。</li>
      <li><strong>藍牙：</strong>請先在 Android 藍牙設定中完成配對，再於 FT8TW 中選取裝置，並確認藍牙模組已通電且在有效範圍內。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>確認手機與電台連接至同一網路，並核對 IP 位址及埠號。</li>
    </ul>`,

  ts_notx_title: '無法發射',
  ts_notx_list: `
    <ul>
      <li>確認<strong>呼號</strong>已填入且格式正確——呼號無效時程式拒絕發射。</li>
      <li>確認 <strong>PTT 控制</strong>設定（VOX / CAT / RTS / DTR）與硬體接線相符。</li>
      <li>若電台切換至發射較慢，請增加 <strong>PTT 延遲</strong>時間。</li>
      <li>確認<strong>發射監管</strong>計時器是否已觸發停止發射。</li>
      <li>程式會拒絕在 <strong>WSPR-2 頻率</strong>發射 FT8 訊號以避免干擾。</li>
      <li>確認音訊輸出路由——藍牙耳機需確認為選定的音訊輸出裝置。</li>
    </ul>`,

  ts_timesync_title: '時間同步問題',
  ts_timesync_list: `
    <ul>
      <li>在設置中點選<strong>同步時間</strong>重新透過 NTP 校時。</li>
      <li>確認裝置有網路連線以進行網路校時。</li>
      <li>取得 GPS 訊號時，程式會優先使用 GPS 時間以提高精度。</li>
      <li>偏差值過大（例如 &gt;500 ms）表示系統時鐘有問題——請檢查 Android 日期時間設定。</li>
      <li>若裝置關閉了自動時間，程式會改用時間伺服器並顯示提示。</li>
    </ul>`,

  ts_bt_title: '藍牙音訊問題',
  ts_bt_list: `
    <ul>
      <li>連接藍牙耳機後請稍候數秒，等待音訊路由自動切換。</li>
      <li>若錄音失敗，耳機可能不支援麥克風輸入所需的 <strong>HFP（免持聽筒協議）</strong>，請改用有線耳機。</li>
      <li>部分 Android 裝置不支援藍牙錄音，此時可使用內建麥克風或有線連線接收，藍牙僅用於發射音訊輸出。</li>
    </ul>`,
},

'zh-CN': {
  ts_title: '问题排查',

  ts_nodecode_title: '无解码结果 / 接收质量不佳',
  ts_nodecode_list: `
    <ul>
      <li>确认设备时间准确（±1 秒内），在设置中点击<strong>同步时间</strong>。</li>
      <li>确认已授予 FT8TW <strong>麦克风</strong>权限。</li>
      <li>确认电台设置为 <strong>USB 模式</strong>（上边带），勿使用 LSB、AM 或 FM。</li>
      <li>调整电台 AF 增益，音频应清晰且不失真。失真会导致解码失败。</li>
      <li>弱信号条件下改用<strong>多次</strong>解码模式。</li>
      <li>确认所在频率为该频段的 FT8 标准频率（例如 20m 为 14.074 MHz）。</li>
    </ul>`,

  ts_noconn_title: '无法连接电台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>确认设备支持 USB OTG，Android 提示时授予 USB 设备访问权限，可尝试更换 OTG 转接头或连接线。</li>
      <li>确认<strong>电台型号</strong>及<strong>波特率</strong>与电台 CAT 设置相符。</li>
      <li>ICOM 电台需确认 <strong>CI-V 地址</strong>与电台菜单设置一致（常见值为 0x94 或 0xA4）。</li>
      <li><strong>蓝牙：</strong>请先在 Android 蓝牙设置中完成配对，再于 FT8TW 中选取设备，并确认蓝牙模块已通电且在有效范围内。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>确认手机与电台连接至同一网络，并核对 IP 地址及端口号。</li>
    </ul>`,

  ts_notx_title: '无法发射',
  ts_notx_list: `
    <ul>
      <li>确认<strong>呼号</strong>已填入且格式正确——呼号无效时程序拒绝发射。</li>
      <li>确认 <strong>PTT 控制</strong>设置（VOX / CAT / RTS / DTR）与硬件接线相符。</li>
      <li>若电台切换至发射较慢，请增加 <strong>PTT 延迟</strong>时间。</li>
      <li>确认<strong>发射监管</strong>计时器是否已触发停止发射。</li>
      <li>程序会拒绝在 <strong>WSPR-2 频率</strong>发射 FT8 信号以避免干扰。</li>
      <li>确认音频输出路由——蓝牙耳机需确认为选定的音频输出设备。</li>
    </ul>`,

  ts_timesync_title: '时间同步问题',
  ts_timesync_list: `
    <ul>
      <li>在设置中点击<strong>同步时间</strong>重新通过 NTP 校时。</li>
      <li>确认设备有网络连接以进行网络校时。</li>
      <li>获取 GPS 信号时，程序会优先使用 GPS 时间以提高精度。</li>
      <li>偏差值过大（例如 &gt;500 ms）表示系统时钟有问题——请检查 Android 日期时间设置。</li>
      <li>若设备关闭了自动时间，程序会改用时间服务器并显示提示。</li>
    </ul>`,

  ts_bt_title: '蓝牙音频问题',
  ts_bt_list: `
    <ul>
      <li>连接蓝牙耳机后请稍候数秒，等待音频路由自动切换。</li>
      <li>若录音失败，耳机可能不支持麦克风输入所需的 <strong>HFP（免提协议）</strong>，请改用有线耳机。</li>
      <li>部分 Android 设备不支持蓝牙录音，此时可使用内置麦克风或有线连接接收，蓝牙仅用于发射音频输出。</li>
    </ul>`,
},

'ja': {
  ts_title: 'トラブルシューティング',

  ts_nodecode_title: 'デコードできない / 受信状態が悪い',
  ts_nodecode_list: `
    <ul>
      <li>端末の時計が正確か（±1 秒以内）確認します。設定で<strong>同期</strong>をタップしてください。</li>
      <li>FT8TW に<strong>マイクの権限</strong>が許可されているか確認します。</li>
      <li>無線機が <strong>USB モード</strong>（上側波帯）になっているか確認します。LSB・AM・FM では受信できません。</li>
      <li>無線機の AF 出力レベルを調整します。音声は歪みのない状態が理想です。</li>
      <li>信号が弱いときはデコードモードを<strong>多回</strong>に切り替えます。</li>
      <li>そのバンドの正しい FT8 周波数か確認します（例: 20m は 14.074 MHz）。</li>
    </ul>`,

  ts_noconn_title: '無線機に接続できない',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> 端末が USB OTG に対応しているか確認し、Android の確認画面で USB デバイスへの権限を許可します。別の OTG アダプターやケーブルも試してください。</li>
      <li><strong>無線機の機種</strong>と<strong>ボーレート</strong>が無線機側の CAT 設定と一致しているか確認します。</li>
      <li>ICOM の場合は <strong>CI-V アドレス</strong>が無線機のメニュー設定と一致しているか確認します（0x94 や 0xA4 が多いです）。</li>
      <li><strong>Bluetooth:</strong> 先に Android の Bluetooth 設定でペアリングしてから FT8TW で選択します。アダプターに電源が入っていて、通信範囲内にあるかも確認してください。</li>
      <li><strong>WiFi（FlexRadio / ICOM）:</strong> スマートフォンと無線機が同じネットワークにあるか確認し、IP アドレスとポート番号を見直します。</li>
    </ul>`,

  ts_notx_title: '送信できない',
  ts_notx_list: `
    <ul>
      <li><strong>コールサイン</strong>が入力され、書式が正しいか確認します。不正なコールサインでは送信しません。</li>
      <li><strong>PTT 制御</strong>の設定（VOX / CAT / RTS / DTR）が実際の配線と合っているか確認します。</li>
      <li>無線機の送信切り替えが遅い場合は <strong>PTT 遅延</strong>を長くします。</li>
      <li><strong>送信ウォッチドッグ</strong>のタイマーが送信を止めていないか確認します。</li>
      <li>混信を避けるため、FT8TW は <strong>WSPR-2 の周波数</strong>では送信しません。</li>
      <li>音声の出力先を確認します。Bluetooth ヘッドセットの場合は、それが選択中の音声出力になっているか確かめてください。</li>
    </ul>`,

  ts_timesync_title: '時刻同期の問題',
  ts_timesync_list: `
    <ul>
      <li>設定で<strong>同期</strong>をタップし、NTP で時刻を取り直します。</li>
      <li>ネットワーク経由で時刻を合わせるため、インターネット接続があるか確認します。</li>
      <li>GPS を測位できている場合、アプリは精度の高い GPS の時刻を優先します。</li>
      <li>表示されるずれが大きい場合（&gt;500 ms など）はシステム時計の問題です。Android の日付と時刻の設定を確認してください。</li>
      <li>端末の自動時刻設定がオフのときは、アプリが時刻サーバーを使い、警告を表示します。</li>
    </ul>`,

  ts_bt_title: 'Bluetooth 音声の問題',
  ts_bt_list: `
    <ul>
      <li>Bluetooth ヘッドセットを接続したら、音声の経路が自動的に切り替わるまで数秒待ってください。</li>
      <li>録音できない場合、そのヘッドセットがマイク入力に必要な <strong>HFP（ハンズフリープロファイル）</strong>に対応していない可能性があります。有線のヘッドセットをお使いください。</li>
      <li>Android 端末によっては Bluetooth からの録音に対応していません。その場合は受信に内蔵マイクか有線接続を使い、Bluetooth は送信音声の出力だけに使ってください。</li>
    </ul>`,
},

'ru': {
  ts_title: 'Устранение неполадок',

  ts_nodecode_title: 'Нет декодирования / плохой приём',
  ts_nodecode_list: `
    <ul>
      <li>Проверьте точность часов устройства (±1 секунда). Нажмите <strong>Синхронизировать</strong> в настройках.</li>
      <li>Убедитесь, что приложению выдано <strong>разрешение на микрофон</strong>.</li>
      <li>Проверьте, что трансивер работает в режиме <strong>USB</strong> (верхняя боковая), а не LSB, AM или FM.</li>
      <li>Отрегулируйте уровень НЧ-выхода трансивера — звук должен быть чистым, без ограничения.</li>
      <li>При слабых сигналах переключите декодирование в режим <strong>Deep</strong>.</li>
      <li>Убедитесь, что вы на правильной частоте FT8 для своего диапазона (например, 14,074 МГц на 20 м).</li>
    </ul>`,

  ts_noconn_title: 'Не удаётся подключиться к трансиверу',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> убедитесь, что устройство поддерживает USB OTG. Разрешите доступ к USB-устройству по запросу Android. Попробуйте другой переходник OTG или кабель.</li>
      <li>Проверьте, что <strong>модель трансивера</strong> и <strong>скорость передачи</strong> соответствуют настройкам CAT в аппарате.</li>
      <li>Для ICOM: проверьте, что <strong>адрес CI-V</strong> совпадает с настройкой в меню аппарата (часто 0x94 или 0xA4).</li>
      <li><strong>Bluetooth:</strong> выполните сопряжение адаптера в настройках Bluetooth Android до выбора его в FT8TW. Убедитесь, что адаптер запитан и находится в зоне действия.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> проверьте, что телефон и трансивер в одной сети, и сверьте IP-адрес и номер порта.</li>
    </ul>`,

  ts_notx_title: 'Нет передачи',
  ts_notx_list: `
    <ul>
      <li>Убедитесь, что <strong>позывной</strong> введён и корректен — с неверным позывным приложение передавать не будет.</li>
      <li>Проверьте, что настройка <strong>управления PTT</strong> (VOX / CAT / RTS / DTR) соответствует вашему оборудованию.</li>
      <li>Если трансивер медленно переходит на передачу, увеличьте <strong>задержку PTT</strong>.</li>
      <li>Проверьте, не остановил ли передачу <strong>сторожевой таймер</strong>.</li>
      <li>Во избежание помех FT8TW не передаёт на <strong>частотах WSPR-2</strong>.</li>
      <li>Проверьте маршрут вывода звука: при использовании Bluetooth-гарнитуры убедитесь, что выбран именно этот выход.</li>
    </ul>`,

  ts_timesync_title: 'Проблемы с синхронизацией времени',
  ts_timesync_list: `
    <ul>
      <li>Нажмите <strong>Синхронизировать</strong> в настройках, чтобы заново сверить часы по NTP.</li>
      <li>Для сетевой синхронизации нужно интернет-соединение.</li>
      <li>При наличии приёма GPS приложение предпочитает время GPS как более точное.</li>
      <li>Большое отображаемое смещение (например, &gt;500 мс) говорит о проблеме системных часов — проверьте настройки даты и времени Android.</li>
      <li>Если автоматическое время на устройстве отключено, приложение переключится на сервер времени и покажет предупреждение.</li>
    </ul>`,

  ts_bt_title: 'Проблемы со звуком Bluetooth',
  ts_bt_list: `
    <ul>
      <li>После подключения Bluetooth-гарнитуры подождите несколько секунд, пока маршрут звука переключится автоматически.</li>
      <li>Если запись не идёт, гарнитура может не поддерживать профиль <strong>HFP (Hands-Free Profile)</strong>, необходимый для микрофонного входа. Используйте проводную гарнитуру.</li>
      <li>Некоторые устройства Android не умеют записывать звук по Bluetooth. В этом случае принимайте через встроенный микрофон или по проводу, а Bluetooth используйте только для вывода звука передачи.</li>
    </ul>`,
},

'pl': {
  ts_title: 'Rozwiązywanie problemów',

  ts_nodecode_title: 'Brak dekodowania / słaby odbiór',
  ts_nodecode_list: `
    <ul>
      <li>Sprawdź dokładność zegara urządzenia (±1 sekunda). Dotknij <strong>Synchronizuj</strong> w ustawieniach.</li>
      <li>Upewnij się, że aplikacja ma <strong>uprawnienie do mikrofonu</strong>.</li>
      <li>Sprawdź, czy radio pracuje w trybie <strong>USB</strong> (wstęga górna), a nie LSB, AM czy FM.</li>
      <li>Wyreguluj poziom wyjścia m.cz. radia — dźwięk powinien być czysty i nieprzesterowany.</li>
      <li>Przy słabych sygnałach przełącz dekodowanie w tryb <strong>Deep</strong>.</li>
      <li>Upewnij się, że jesteś na właściwej częstotliwości FT8 dla swojego pasma (np. 14,074 MHz na 20 m).</li>
    </ul>`,

  ts_noconn_title: 'Nie można połączyć się z radiem',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> sprawdź, czy urządzenie obsługuje USB OTG. Zezwól na dostęp do urządzenia USB, gdy Android o to poprosi. Spróbuj innej przejściówki OTG lub kabla.</li>
      <li>Sprawdź, czy <strong>model radia</strong> i <strong>prędkość transmisji</strong> odpowiadają ustawieniom CAT w radiu.</li>
      <li>W radiach ICOM sprawdź, czy <strong>adres CI-V</strong> zgadza się z ustawieniem w menu (często 0x94 lub 0xA4).</li>
      <li><strong>Bluetooth:</strong> sparuj adapter w ustawieniach Bluetooth Androida, zanim wybierzesz go w FT8TW. Upewnij się, że adapter ma zasilanie i jest w zasięgu.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> sprawdź, czy telefon i radio są w tej samej sieci, oraz zweryfikuj adres IP i numer portu.</li>
    </ul>`,

  ts_notx_title: 'Brak nadawania',
  ts_notx_list: `
    <ul>
      <li>Sprawdź, czy <strong>znak wywoławczy</strong> jest wpisany i poprawny — z błędnym znakiem aplikacja nie nadaje.</li>
      <li>Sprawdź, czy ustawienie <strong>sterowania PTT</strong> (VOX / CAT / RTS / DTR) odpowiada twojemu sprzętowi.</li>
      <li>Jeśli radio wolno przechodzi na nadawanie, zwiększ <strong>opóźnienie PTT</strong>.</li>
      <li>Sprawdź, czy nadawania nie przerwał <strong>nadzorca nadawania</strong>.</li>
      <li>Aby uniknąć zakłóceń, FT8TW nie nadaje na <strong>częstotliwościach WSPR-2</strong>.</li>
      <li>Sprawdź trasę wyjścia dźwięku — przy zestawie Bluetooth upewnij się, że to on jest wybranym wyjściem audio.</li>
    </ul>`,

  ts_timesync_title: 'Problemy z synchronizacją czasu',
  ts_timesync_list: `
    <ul>
      <li>Dotknij <strong>Synchronizuj</strong> w ustawieniach, aby ponownie uzgodnić zegar przez NTP.</li>
      <li>Do synchronizacji sieciowej potrzebne jest połączenie z internetem.</li>
      <li>Przy ustalonej pozycji GPS aplikacja woli czas z GPS jako dokładniejszy.</li>
      <li>Duże wyświetlane przesunięcie (np. &gt;500 ms) wskazuje na problem z zegarem systemowym — sprawdź ustawienia daty i godziny Androida.</li>
      <li>Jeśli automatyczny czas jest wyłączony, aplikacja skorzysta z serwera czasu i pokaże ostrzeżenie.</li>
    </ul>`,

  ts_bt_title: 'Problemy z dźwiękiem Bluetooth',
  ts_bt_list: `
    <ul>
      <li>Po podłączeniu zestawu Bluetooth odczekaj kilka sekund, aż trasa dźwięku przełączy się automatycznie.</li>
      <li>Jeśli nagrywanie nie działa, zestaw może nie obsługiwać profilu <strong>HFP (Hands-Free Profile)</strong> wymaganego do wejścia mikrofonowego. Użyj zestawu przewodowego.</li>
      <li>Część urządzeń z Androidem nie potrafi nagrywać dźwięku przez Bluetooth. W takim przypadku odbieraj przez wbudowany mikrofon lub kabel, a Bluetooth wykorzystaj tylko do wyprowadzenia dźwięku nadawania.</li>
    </ul>`,
},

'es': {
  ts_title: 'Solución de problemas',

  ts_nodecode_title: 'No decodifica / recepción deficiente',
  ts_nodecode_list: `
    <ul>
      <li>Comprueba que el reloj del dispositivo sea exacto (±1 segundo). Pulsa <strong>Sincronizar</strong> en Ajustes.</li>
      <li>Asegúrate de haber concedido a FT8TW el <strong>permiso de micrófono</strong>.</li>
      <li>Verifica que el equipo esté en <strong>modo USB</strong> (banda lateral superior) y no en LSB, AM o FM.</li>
      <li>Ajusta el nivel de salida de AF del equipo: el audio debe ser limpio y sin recorte.</li>
      <li>Cambia el modo de decodificación a <strong>Deep</strong> cuando las señales estén al límite.</li>
      <li>Comprueba que estés en la frecuencia FT8 correcta para tu banda (por ejemplo, 14,074 MHz en 20 m).</li>
    </ul>`,

  ts_noconn_title: 'No se puede conectar con el equipo',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> confirma que tu dispositivo admite USB OTG. Concede el permiso al dispositivo USB cuando Android lo pida. Prueba con otro adaptador OTG o con otro cable.</li>
      <li>Verifica que el <strong>modelo de equipo</strong> y la <strong>velocidad en baudios</strong> coincidan con los ajustes CAT de tu equipo.</li>
      <li>Para ICOM: comprueba que la <strong>dirección CI-V</strong> coincida con la del menú del equipo (a menudo 0x94 o 0xA4).</li>
      <li><strong>Bluetooth:</strong> empareja el adaptador en los ajustes de Bluetooth de Android antes de seleccionarlo en FT8TW. Asegúrate de que tenga alimentación y esté dentro del alcance.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> confirma que el teléfono y el equipo estén en la misma red y revisa la dirección IP y el número de puerto.</li>
    </ul>`,

  ts_notx_title: 'No transmite',
  ts_notx_list: `
    <ul>
      <li>Confirma que el <strong>indicativo</strong> esté introducido y sea válido: con un indicativo no válido la aplicación no transmite.</li>
      <li>Comprueba que el ajuste de <strong>control de PTT</strong> (VOX / CAT / RTS / DTR) coincida con tu equipamiento.</li>
      <li>Aumenta el <strong>retardo de PTT</strong> si el equipo tarda en pasar a transmisión.</li>
      <li>Comprueba si el <strong>vigilante de transmisión</strong> ha detenido la emisión.</li>
      <li>Para evitar interferencias, FT8TW no transmite en <strong>frecuencias de WSPR-2</strong>.</li>
      <li>Revisa el encaminamiento de la salida de audio; con auriculares Bluetooth, confirma que sean la salida seleccionada.</li>
    </ul>`,

  ts_timesync_title: 'Problemas de sincronización horaria',
  ts_timesync_list: `
    <ul>
      <li>Pulsa <strong>Sincronizar</strong> en Ajustes para volver a ajustar el reloj por NTP.</li>
      <li>Para la sincronización por red hace falta conexión a internet.</li>
      <li>Si hay posición GPS, la aplicación prefiere la hora del GPS por su mayor precisión.</li>
      <li>Un desfase grande (por ejemplo, &gt;500 ms) indica un problema del reloj del sistema: revisa los ajustes de fecha y hora de Android.</li>
      <li>Si la hora automática está desactivada en el dispositivo, la aplicación recurrirá a un servidor de hora y mostrará un aviso.</li>
    </ul>`,

  ts_bt_title: 'Problemas de audio Bluetooth',
  ts_bt_list: `
    <ul>
      <li>Tras conectar unos auriculares Bluetooth, espera unos segundos a que el audio se encamine automáticamente.</li>
      <li>Si falla la grabación, es posible que los auriculares no admitan el perfil <strong>HFP (manos libres)</strong> necesario para la entrada de micrófono. Usa unos auriculares con cable.</li>
      <li>Algunos dispositivos Android no admiten grabar audio por Bluetooth. En ese caso, recibe con el micrófono integrado o por cable y usa el Bluetooth solo para la salida de audio de transmisión.</li>
    </ul>`,
},

'el': {
  ts_title: 'Αντιμετώπιση προβλημάτων',

  ts_nodecode_title: 'Καμία αποκωδικοποίηση / κακή λήψη',
  ts_nodecode_list: `
    <ul>
      <li>Επαληθεύστε ότι το ρολόι της συσκευής είναι ακριβές (±1 δευτερόλεπτο). Πατήστε <strong>Συγχρονισμός</strong> στις Ρυθμίσεις.</li>
      <li>Βεβαιωθείτε ότι έχει παραχωρηθεί στο FT8TW η <strong>άδεια μικροφώνου</strong>.</li>
      <li>Ελέγξτε ότι ο πομποδέκτης είναι σε <strong>USB</strong> (άνω πλευρική ζώνη) και όχι σε LSB, AM ή FM.</li>
      <li>Ρυθμίστε τη στάθμη εξόδου AF του πομποδέκτη — ο ήχος πρέπει να είναι καθαρός και χωρίς ψαλίδισμα.</li>
      <li>Σε οριακές συνθήκες σήματος αλλάξτε τη λειτουργία αποκωδικοποίησης σε <strong>Deep</strong>.</li>
      <li>Βεβαιωθείτε ότι βρίσκεστε στη σωστή συχνότητα FT8 για τη μπάντα σας (π.χ. 14,074 MHz στα 20 m).</li>
    </ul>`,

  ts_noconn_title: 'Δεν γίνεται σύνδεση με τον πομποδέκτη',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> επιβεβαιώστε ότι η συσκευή σας υποστηρίζει USB OTG. Παραχωρήστε την άδεια συσκευής USB όταν σας τη ζητήσει το Android. Δοκιμάστε άλλον αντάπτορα OTG ή άλλο καλώδιο.</li>
      <li>Επαληθεύστε ότι το <strong>μοντέλο πομποδέκτη</strong> και ο <strong>ρυθμός baud</strong> ταιριάζουν με τις ρυθμίσεις CAT του μηχανήματος.</li>
      <li>Για ICOM: ελέγξτε ότι η <strong>διεύθυνση CI-V</strong> ταιριάζει με τη ρύθμιση στο μενού (συχνά 0x94 ή 0xA4).</li>
      <li><strong>Bluetooth:</strong> κάντε πρώτα σύζευξη του αντάπτορα στις ρυθμίσεις Bluetooth του Android και μετά επιλέξτε τον στο FT8TW. Βεβαιωθείτε ότι τροφοδοτείται και βρίσκεται εντός εμβέλειας.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> επιβεβαιώστε ότι τηλέφωνο και πομποδέκτης είναι στο ίδιο δίκτυο και ελέγξτε τη διεύθυνση IP και τον αριθμό θύρας.</li>
    </ul>`,

  ts_notx_title: 'Δεν γίνεται εκπομπή',
  ts_notx_list: `
    <ul>
      <li>Επιβεβαιώστε ότι το <strong>διακριτικό</strong> έχει εισαχθεί και είναι έγκυρο — με άκυρο διακριτικό η εφαρμογή δεν εκπέμπει.</li>
      <li>Ελέγξτε ότι η ρύθμιση <strong>ελέγχου PTT</strong> (VOX / CAT / RTS / DTR) ταιριάζει με τον εξοπλισμό σας.</li>
      <li>Αν ο πομποδέκτης αργεί να περάσει σε εκπομπή, αυξήστε την <strong>καθυστέρηση PTT</strong>.</li>
      <li>Ελέγξτε μήπως ο <strong>επιτηρητής εκπομπής</strong> σταμάτησε την εκπομπή.</li>
      <li>Για αποφυγή παρεμβολών, το FT8TW δεν εκπέμπει σε <strong>συχνότητες WSPR-2</strong>.</li>
      <li>Ελέγξτε τη διαδρομή εξόδου ήχου — με ακουστικά Bluetooth βεβαιωθείτε ότι αυτά είναι η επιλεγμένη έξοδος.</li>
    </ul>`,

  ts_timesync_title: 'Προβλήματα συγχρονισμού ώρας',
  ts_timesync_list: `
    <ul>
      <li>Πατήστε <strong>Συγχρονισμός</strong> στις Ρυθμίσεις για νέο συγχρονισμό μέσω NTP.</li>
      <li>Για τον συγχρονισμό μέσω δικτύου απαιτείται σύνδεση στο διαδίκτυο.</li>
      <li>Αν υπάρχει στίγμα GPS, η εφαρμογή προτιμά την ώρα του GPS για μεγαλύτερη ακρίβεια.</li>
      <li>Μεγάλη εμφανιζόμενη απόκλιση (π.χ. &gt;500 ms) δείχνει πρόβλημα στο ρολόι του συστήματος — ελέγξτε τις ρυθμίσεις ημερομηνίας και ώρας του Android.</li>
      <li>Αν η αυτόματη ώρα είναι απενεργοποιημένη στη συσκευή, η εφαρμογή θα χρησιμοποιήσει διακομιστή ώρας και θα εμφανίσει προειδοποίηση.</li>
    </ul>`,

  ts_bt_title: 'Προβλήματα ήχου Bluetooth',
  ts_bt_list: `
    <ul>
      <li>Μετά τη σύνδεση ακουστικών Bluetooth, περιμένετε λίγα δευτερόλεπτα να αλλάξει αυτόματα η διαδρομή του ήχου.</li>
      <li>Αν αποτυγχάνει η εγγραφή, τα ακουστικά σας ίσως δεν υποστηρίζουν το προφίλ <strong>HFP (Hands-Free Profile)</strong> που απαιτείται για είσοδο μικροφώνου. Χρησιμοποιήστε ενσύρματα ακουστικά.</li>
      <li>Ορισμένες συσκευές Android δεν υποστηρίζουν εγγραφή ήχου μέσω Bluetooth. Σε αυτή την περίπτωση χρησιμοποιήστε το ενσωματωμένο μικρόφωνο ή ενσύρματη σύνδεση για λήψη και το Bluetooth μόνο για την έξοδο ήχου εκπομπής.</li>
    </ul>`,
},

}; /* end PAGE_T */
