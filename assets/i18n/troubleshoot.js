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
      <li>If the app is recording but no audio is arriving at all, the decode screen shows a persistent <strong>⚠ No audio input</strong> notice. Tap it and the app lists the likely causes: microphone permission missing or another app (voice recorder, phone call) holding the microphone; a problem with the audio source itself (cable, radio volume, Bluetooth link); or a second copy of FT8TW installed on the same phone that has taken the microphone.</li>
      <li><strong>Using a USB sound card (a Digirig, say) but it sounds like the room is being recorded:</strong> look at "Audio device" under Settings → <strong>Advanced &amp; Developer</strong> to see which device is actually being recorded. If it shows the built-in microphone, press <strong>Re-detect</strong> to switch to the USB card without restarting the app. That page also states outright the case where USB audio was found but the system refused the routing request and recording is still coming from the built-in microphone, so there is nothing to guess at.</li>
      <li><strong>When the radio's own output level cannot be changed:</strong> use <strong>Receive audio gain</strong> under Settings → Radio &amp; Audio. A QMX sends a fixed level over USB, and on ICOM radios the USB level lives in the set menu rather than on the AF knob — in those cases adjusting from the app side is the quickest route.</li>
    </ul>`,

  ts_noconn_title: 'Cannot Connect to Radio',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> Confirm USB OTG is supported by your device. Grant USB device permission when Android prompts you. Try a different OTG adapter or cable.</li>
      <li>Verify the <strong>radio model</strong> and <strong>baud rate</strong> match your radio's CAT settings.</li>
      <li>For ICOM: check the <strong>CI-V address</strong> matches the radio's menu setting (often 0x94 or 0xA4).</li>
      <li><strong>Bluetooth:</strong> Pair the adapter in Android Bluetooth settings before selecting it in FT8TW. Ensure the adapter is powered and within range.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> Confirm both phone and radio are on the same network. Check the IP address and port number.</li>
      <li>If all of the above checks out and there is still no response, use the <strong>Radio Test Tool</strong> at the bottom of the Radio Tool page to work through it item by item: <strong>Read Freq</strong> shows whether the radio answers at all, and <strong>PTT Test</strong> whether it will key. The response window lists the commands sent and whatever came back verbatim, so you can tell straight away whether the command never went out, went out with no reply, or was answered in a different format. See <a href="ssb.html">Radio Tool</a>.</li>
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
      <li>If the app reports a pending <strong>mandatory update</strong>, every transmit path is blocked until you have installed it (FT8/FT4/FT2, WSPR, JS8, push-to-talk and tune). Browsing, the log and the settings are unaffected. See the update section in <a href="install.html">Installation</a>.</li>
      <li>Press <strong>PTT Test</strong> in the <strong>Radio Test Tool</strong> on the Radio Tool page: if PTT keys and releases normally there, the PTT path itself is sound and the problem lies elsewhere in the transmit sequence.</li>
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
      <li>若程式確實在錄音、卻完全收不到音訊，解碼畫面會常駐顯示<strong>「⚠ 沒有收到音訊」</strong>。點一下就會列出可能原因：麥克風權限未開啟，或被其他程式（錄音機、通話）佔用；音源本身有問題（連接線、電台音量、藍牙連線）；或這台手機還裝了另一個 FT8TW，麥克風被它拿走了。</li>
      <li><strong>用了 USB 音效卡（Digirig 等）卻好像收的是室內的聲音：</strong>到設置 → <strong>進階與開發者</strong>看「音訊裝置」目前實際在收哪一個裝置。若顯示的是內建麥克風，按<strong>重新偵測</strong>即可改用 USB 音效卡，不必重開 App。這一頁也會明講「找到 USB 音訊、但系統不接受路由要求，實際仍在收內建麥克風」這種情況，不必自己猜。</li>
      <li><strong>電台的音量根本調不動時：</strong>用設置 → 電台與聲音的<strong>接收音訊增益</strong>在 App 內調整。QMX 這類純數位機的 USB 音訊電平是固定的，ICOM 的 USB 音量則藏在 SET 選單而不是 AF 旋鈕——這時從 App 這端調最快。</li>
    </ul>`,

  ts_noconn_title: '無法連接電台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>確認裝置支援 USB OTG，Android 提示時授予 USB 裝置存取權限，可嘗試更換 OTG 轉接頭或連接線。</li>
      <li>確認<strong>電台型號</strong>及<strong>傳輸速率</strong>與電台 CAT 設定相符。</li>
      <li>ICOM 電台需確認 <strong>CI-V 地址</strong>與電台選單設定一致（常見值為 0x94 或 0xA4）。</li>
      <li><strong>藍牙：</strong>請先在 Android 藍牙設定中完成配對，再於 FT8TW 中選取裝置，並確認藍牙模組已通電且在有效範圍內。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>確認手機與電台連接至同一網路，並核對 IP 位址及埠號。</li>
      <li>以上都對過還是沒反應時，請用電台工具頁最下方的<strong>電台測試工具</strong>逐項確認：按<strong>讀取頻率</strong>看電台有沒有回應、按 <strong>PTT 測試</strong>看能不能拉起發射。回應視窗會把送出的指令與收到的回覆原樣列出來，可以直接分辨是「指令沒送出去」、「送出去了但電台不回」還是「回了但格式不同」。詳見<a href="ssb.html">「電台工具」</a>。</li>
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
      <li>若程式提示有一個<strong>必要更新</strong>尚未安裝，在更新完成之前所有發射入口都會被擋下（FT8/FT4/FT2、WSPR、JS8、按住通話與調諧）。瀏覽、通聯記錄與設定則不受影響。詳見<a href="install.html">「安裝」</a>的版本更新說明。</li>
      <li>用電台工具頁的<strong>電台測試工具</strong>按一下 <strong>PTT 測試</strong>：如果這裡能正常拉起與放開 PTT，代表 PTT 這條路本身是通的，問題就在發射流程的其他環節。</li>
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
      <li>若程序确实在录音、却完全收不到音频，解码界面会常驻显示<strong>「⚠ 没有收到音频」</strong>。点一下就会列出可能原因：麦克风权限未开启，或被其他程序（录音机、通话）占用；音源本身有问题（连接线、电台音量、蓝牙连接）；或这台手机还装了另一个 FT8TW，麦克风被它拿走了。</li>
      <li><strong>用了 USB 声卡（Digirig 等）却好像收的是室内的声音：</strong>到设置 → <strong>高级与开发者</strong>看「音频设备」目前实际在收哪一个设备。若显示的是内置麦克风，按<strong>重新检测</strong>即可改用 USB 声卡，不必重开 App。这一页也会明讲「找到 USB 音频、但系统不接受路由请求，实际仍在收内置麦克风」这种情况，不必自己猜。</li>
      <li><strong>电台的音量根本调不动时：</strong>用设置 → 电台与声音的<strong>接收音频增益</strong>在 App 内调整。QMX 这类纯数字机的 USB 音频电平是固定的，ICOM 的 USB 音量则藏在 SET 菜单而不是 AF 旋钮——这时从 App 这端调最快。</li>
    </ul>`,

  ts_noconn_title: '无法连接电台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>确认设备支持 USB OTG，Android 提示时授予 USB 设备访问权限，可尝试更换 OTG 转接头或连接线。</li>
      <li>确认<strong>电台型号</strong>及<strong>波特率</strong>与电台 CAT 设置相符。</li>
      <li>ICOM 电台需确认 <strong>CI-V 地址</strong>与电台菜单设置一致（常见值为 0x94 或 0xA4）。</li>
      <li><strong>蓝牙：</strong>请先在 Android 蓝牙设置中完成配对，再于 FT8TW 中选取设备，并确认蓝牙模块已通电且在有效范围内。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>确认手机与电台连接至同一网络，并核对 IP 地址及端口号。</li>
      <li>以上都对过还是没反应时，请用电台工具页最下方的<strong>电台测试工具</strong>逐项确认：按<strong>读取频率</strong>看电台有没有回应、按 <strong>PTT 测试</strong>看能不能拉起发射。回应窗口会把送出的指令与收到的回复原样列出来，可以直接分辨是「指令没送出去」、「送出去了但电台不回」还是「回了但格式不同」。详见<a href="ssb.html">「电台工具」</a>。</li>
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
      <li>若程序提示有一个<strong>必要更新</strong>尚未安装，在更新完成之前所有发射入口都会被挡下（FT8/FT4/FT2、WSPR、JS8、按住发射与调谐）。浏览、通联日志与设置则不受影响。详见<a href="install.html">「安装」</a>的版本更新说明。</li>
      <li>用电台工具页的<strong>电台测试工具</strong>按一下 <strong>PTT 测试</strong>：如果这里能正常拉起与放开 PTT，代表 PTT 这条路本身是通的，问题就在发射流程的其他环节。</li>
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
      <li>録音はできているのに音声がまったく届いていない場合、デコード画面に<strong>「⚠ 音声が入力されていません」</strong>が常時表示されます。タップすると原因の候補が並びます: マイクの権限がないか、他のアプリ（ボイスレコーダー、通話など）がマイクを使っている、音源側の問題（ケーブル、無線機の音量、Bluetooth 接続）、あるいは同じ端末にもう一つ FT8TW が入っていてマイクを取っている。</li>
      <li><strong>USB サウンドカード（Digirig など）を使っているのに部屋の音を拾っているようなとき:</strong> 設定 → <strong>詳細設定と開発者</strong>の「オーディオデバイス」で、実際にどのデバイスから録音しているかを確認します。内蔵マイクと表示されていれば<strong>再検出</strong>を押せば USB サウンドカードに切り替わり、アプリの再起動は不要です。「USB オーディオは見つかったが、システムが経路の変更を受け付けず、実際には内蔵マイクから録音している」という状態もこのページがはっきり示すので、推測する必要はありません。</li>
      <li><strong>無線機側の音量がどうしても変えられないとき:</strong> 設定 → 無線機と音声の<strong>受信音声ゲイン</strong>でアプリ内から調整します。QMX のようなデジタル機の USB 音声レベルは固定で、ICOM の USB 音量は AF つまみではなくセットメニューの中にあります。こうした場合はアプリ側で調整するのが早道です。</li>
    </ul>`,

  ts_noconn_title: '無線機に接続できない',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> 端末が USB OTG に対応しているか確認し、Android の確認画面で USB デバイスへの権限を許可します。別の OTG アダプターやケーブルも試してください。</li>
      <li><strong>無線機の機種</strong>と<strong>ボーレート</strong>が無線機側の CAT 設定と一致しているか確認します。</li>
      <li>ICOM の場合は <strong>CI-V アドレス</strong>が無線機のメニュー設定と一致しているか確認します（0x94 や 0xA4 が多いです）。</li>
      <li><strong>Bluetooth:</strong> 先に Android の Bluetooth 設定でペアリングしてから FT8TW で選択します。アダプターに電源が入っていて、通信範囲内にあるかも確認してください。</li>
      <li><strong>WiFi（FlexRadio / ICOM）:</strong> スマートフォンと無線機が同じネットワークにあるか確認し、IP アドレスとポート番号を見直します。</li>
      <li>以上をすべて確認しても反応がない場合は、無線機ツール画面の下部にある <strong>Radio Test Tool</strong> で 1 項目ずつ確かめてください。<strong>Read Freq</strong> で無線機が応答するか、<strong>PTT Test</strong> で送信に入れるかが分かります。応答ウィンドウには送ったコマンドと返ってきた内容がそのまま並ぶので、「コマンドが出ていない」「出ているが無線機が返さない」「返ってきたが形式が違う」のどれなのかを直接見分けられます。詳しくは<a href="ssb.html">「無線機ツール」</a>。</li>
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
      <li><strong>必須更新</strong>が未適用であるとアプリが表示している場合、更新が完了するまで送信系の操作はすべて止まります（FT8/FT4/FT2、WSPR、JS8、プレストーク、チューン）。閲覧・ログ・設定には影響しません。詳しくは<a href="install.html">「インストール」</a>のバージョン更新の説明をご覧ください。</li>
      <li>無線機ツール画面の <strong>Radio Test Tool</strong> で <strong>PTT Test</strong> を押してみてください。ここで PTT を入れて解除できるなら、PTT の経路そのものは通っており、問題は送信の流れの別の部分にあります。</li>
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
      <li>Если запись идёт, а звук вообще не поступает, на экране декодера постоянно висит предупреждение <strong>«⚠ Нет входного звука»</strong>. По нажатию приложение перечисляет вероятные причины: нет разрешения на микрофон либо его заняло другое приложение (диктофон, звонок); проблема с самим источником (кабель, громкость трансивера, связь Bluetooth); либо на том же телефоне установлена вторая копия FT8TW, забравшая микрофон.</li>
      <li><strong>Используется звуковая карта USB (Digirig и т. п.), но похоже, что пишется комната:</strong> откройте «Аудиоустройство» в Настройки → <strong>Дополнительно и разработка</strong> и посмотрите, с какого устройства идёт запись. Если там встроенный микрофон, нажмите <strong>Определить заново</strong> — переключится на карту USB без перезапуска приложения. Эта же страница прямо сообщает о случае «устройство USB найдено, но система отказалась перенаправить запись, и звук по-прежнему идёт со встроенного микрофона», так что гадать не придётся.</li>
      <li><strong>Когда уровень выхода самого трансивера изменить нельзя:</strong> воспользуйтесь параметром <strong>Усиление принимаемого звука</strong> в Настройки → Трансивер и звук. У QMX уровень по USB фиксирован, а у ICOM громкость USB находится в меню SET, а не на ручке AF — в таких случаях быстрее отрегулировать со стороны приложения.</li>
    </ul>`,

  ts_noconn_title: 'Не удаётся подключиться к трансиверу',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> убедитесь, что устройство поддерживает USB OTG. Разрешите доступ к USB-устройству по запросу Android. Попробуйте другой переходник OTG или кабель.</li>
      <li>Проверьте, что <strong>модель трансивера</strong> и <strong>скорость передачи</strong> соответствуют настройкам CAT в аппарате.</li>
      <li>Для ICOM: проверьте, что <strong>адрес CI-V</strong> совпадает с настройкой в меню аппарата (часто 0x94 или 0xA4).</li>
      <li><strong>Bluetooth:</strong> выполните сопряжение адаптера в настройках Bluetooth Android до выбора его в FT8TW. Убедитесь, что адаптер запитан и находится в зоне действия.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> проверьте, что телефон и трансивер в одной сети, и сверьте IP-адрес и номер порта.</li>
      <li>Если всё перечисленное проверено, а отклика нет, воспользуйтесь разделом <strong>Radio Test Tool</strong> внизу страницы инструментов трансивера и проверьте по пунктам: <strong>Read Freq</strong> покажет, отвечает ли трансивер, а <strong>PTT Test</strong> — удаётся ли перейти на передачу. В окне ответов отправленные команды и полученные ответы выводятся дословно, поэтому сразу видно, что именно произошло: команда не ушла, ушла но ответа нет, или ответ пришёл в другом формате. Подробнее см. <a href="ssb.html">«Инструменты трансивера»</a>.</li>
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
      <li>Если приложение сообщает о неустановленном <strong>обязательном обновлении</strong>, все пути передачи блокируются до его установки (FT8/FT4/FT2, WSPR, JS8, передача по нажатию и настройка антенны). Просмотр, журнал и настройки при этом доступны. См. описание обновлений в разделе <a href="install.html">«Установка»</a>.</li>
      <li>Нажмите <strong>PTT Test</strong> в разделе <strong>Radio Test Tool</strong> на странице инструментов трансивера: если PTT там включается и выключается нормально, сам путь PTT исправен, и причина лежит в другой части процесса передачи.</li>
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
      <li>Jeśli aplikacja nagrywa, ale dźwięk w ogóle nie dociera, na ekranie dekodowania widnieje stałe ostrzeżenie <strong>„⚠ Brak sygnału audio”</strong>. Po dotknięciu aplikacja wymienia prawdopodobne przyczyny: brak uprawnienia do mikrofonu albo zajęcie go przez inną aplikację (dyktafon, rozmowa); problem po stronie źródła dźwięku (kabel, głośność radia, połączenie Bluetooth); albo druga kopia FT8TW na tym samym telefonie, która przejęła mikrofon.</li>
      <li><strong>Używasz karty dźwiękowej USB (np. Digirig), a wygląda na to, że nagrywane jest pomieszczenie:</strong> sprawdź „Urządzenie audio” w Ustawienia → <strong>Zaawansowane i deweloper</strong>, aby zobaczyć, z którego urządzenia faktycznie idzie nagranie. Jeśli widnieje mikrofon wbudowany, naciśnij <strong>Wykryj ponownie</strong> — przełączy się na kartę USB bez restartu aplikacji. Ta sama strona wprost informuje o sytuacji „znaleziono urządzenie USB, ale system odmówił przekierowania nagrywania i dźwięk nadal pochodzi z mikrofonu wbudowanego”, więc nie trzeba zgadywać.</li>
      <li><strong>Gdy poziomu wyjścia samego radia nie da się zmienić:</strong> skorzystaj z <strong>Wzmocnienia dźwięku odbioru</strong> w Ustawienia → Radio i dźwięk. QMX podaje przez USB stały poziom, a w radiach ICOM głośność USB jest w menu SET, a nie na gałce AF — wtedy najszybciej wyregulować to po stronie aplikacji.</li>
    </ul>`,

  ts_noconn_title: 'Nie można połączyć się z radiem',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> sprawdź, czy urządzenie obsługuje USB OTG. Zezwól na dostęp do urządzenia USB, gdy Android o to poprosi. Spróbuj innej przejściówki OTG lub kabla.</li>
      <li>Sprawdź, czy <strong>model radia</strong> i <strong>prędkość transmisji</strong> odpowiadają ustawieniom CAT w radiu.</li>
      <li>W radiach ICOM sprawdź, czy <strong>adres CI-V</strong> zgadza się z ustawieniem w menu (często 0x94 lub 0xA4).</li>
      <li><strong>Bluetooth:</strong> sparuj adapter w ustawieniach Bluetooth Androida, zanim wybierzesz go w FT8TW. Upewnij się, że adapter ma zasilanie i jest w zasięgu.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> sprawdź, czy telefon i radio są w tej samej sieci, oraz zweryfikuj adres IP i numer portu.</li>
      <li>Jeśli wszystko powyższe zostało sprawdzone, a radio nadal nie reaguje, użyj sekcji <strong>Radio Test Tool</strong> na dole strony narzędzi radia i sprawdź po kolei: <strong>Read Freq</strong> pokaże, czy radio odpowiada, a <strong>PTT Test</strong> — czy da się przejść na nadawanie. W oknie odpowiedzi wysłane polecenia i otrzymane odpowiedzi pojawiają się dosłownie, więc od razu widać, czy polecenie nie wyszło, wyszło ale nie ma odpowiedzi, czy odpowiedź przyszła w innym formacie. Zobacz <a href="ssb.html">„Narzędzia radia”</a>.</li>
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
      <li>Jeśli aplikacja zgłasza niezainstalowaną <strong>aktualizację obowiązkową</strong>, wszystkie drogi nadawania są zablokowane do czasu jej wykonania (FT8/FT4/FT2, WSPR, JS8, nadawanie przyciskiem i strojenie). Przeglądanie, dziennik i ustawienia pozostają dostępne. Zobacz opis aktualizacji w rozdziale <a href="install.html">„Instalacja”</a>.</li>
      <li>Naciśnij <strong>PTT Test</strong> w sekcji <strong>Radio Test Tool</strong> na stronie narzędzi radia: jeśli PTT włącza się i zwalnia prawidłowo, sama ścieżka PTT jest sprawna, a przyczyna leży w innym miejscu procesu nadawania.</li>
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
      <li>Si la aplicación graba pero no llega audio alguno, la pantalla de decodificación muestra de forma permanente el aviso <strong>«⚠ Sin entrada de audio»</strong>. Al pulsarlo se enumeran las causas probables: falta el permiso de micrófono o lo tiene otra aplicación (grabadora, llamada); hay un problema en la propia fuente de audio (cable, volumen del equipo, enlace Bluetooth); o hay una segunda copia de FT8TW instalada en el mismo teléfono que se ha quedado con el micrófono.</li>
      <li><strong>Usas una tarjeta de sonido USB (un Digirig, por ejemplo) pero parece que se graba la habitación:</strong> mira «Dispositivo de audio» en Ajustes → <strong>Avanzado y desarrollador</strong> para ver de qué dispositivo se está grabando realmente. Si aparece el micrófono integrado, pulsa <strong>Volver a detectar</strong> y pasará a la tarjeta USB sin reiniciar la aplicación. Esa misma página indica claramente el caso de «se encontró un dispositivo USB pero el sistema rechazó encaminar la grabación y se sigue grabando del micrófono integrado», así que no hay que adivinar.</li>
      <li><strong>Cuando no se puede cambiar el nivel de salida del propio equipo:</strong> usa la <strong>Ganancia de audio de recepción</strong> en Ajustes → Radio y audio. El QMX entrega un nivel fijo por USB y en los ICOM el volumen USB está en el menú SET y no en el mando de AF; en esos casos lo más rápido es ajustarlo desde la aplicación.</li>
    </ul>`,

  ts_noconn_title: 'No se puede conectar con el equipo',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> confirma que tu dispositivo admite USB OTG. Concede el permiso al dispositivo USB cuando Android lo pida. Prueba con otro adaptador OTG o con otro cable.</li>
      <li>Verifica que el <strong>modelo de equipo</strong> y la <strong>velocidad en baudios</strong> coincidan con los ajustes CAT de tu equipo.</li>
      <li>Para ICOM: comprueba que la <strong>dirección CI-V</strong> coincida con la del menú del equipo (a menudo 0x94 o 0xA4).</li>
      <li><strong>Bluetooth:</strong> empareja el adaptador en los ajustes de Bluetooth de Android antes de seleccionarlo en FT8TW. Asegúrate de que tenga alimentación y esté dentro del alcance.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> confirma que el teléfono y el equipo estén en la misma red y revisa la dirección IP y el número de puerto.</li>
      <li>Si has comprobado todo lo anterior y sigue sin responder, usa la sección <strong>Radio Test Tool</strong> al final de la página de herramientas de radio y verifica punto por punto: <strong>Read Freq</strong> muestra si el equipo responde y <strong>PTT Test</strong> si consigue pasar a transmisión. En la ventana de respuestas aparecen literalmente las órdenes enviadas y lo recibido, de modo que se distingue en el acto si la orden no salió, si salió pero no hay respuesta, o si la respuesta llegó con otro formato. Consulta <a href="ssb.html">«Herramientas de radio»</a>.</li>
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
      <li>Si la aplicación avisa de una <strong>actualización obligatoria</strong> pendiente, todas las vías de transmisión quedan bloqueadas hasta instalarla (FT8/FT4/FT2, WSPR, JS8, pulsar para hablar y sintonía). La consulta, el registro y los ajustes siguen disponibles. Consulta la explicación de las actualizaciones en <a href="install.html">«Instalación»</a>.</li>
      <li>Pulsa <strong>PTT Test</strong> en la sección <strong>Radio Test Tool</strong> de la página de herramientas de radio: si allí el PTT se activa y se suelta con normalidad, la vía del PTT en sí funciona y el problema está en otra parte del proceso de transmisión.</li>
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
      <li>Αν η εφαρμογή καταγράφει αλλά δεν φτάνει καθόλου ήχος, η οθόνη αποκωδικοποίησης εμφανίζει μόνιμα την ειδοποίηση <strong>«⚠ Δεν υπάρχει είσοδος ήχου»</strong>. Με πάτημα εμφανίζονται οι πιθανές αιτίες: λείπει η άδεια μικροφώνου ή το κρατά άλλη εφαρμογή (ηχογράφος, κλήση)· πρόβλημα στην ίδια την πηγή (καλώδιο, ένταση πομποδέκτη, σύνδεση Bluetooth)· ή υπάρχει δεύτερο αντίγραφο του FT8TW στο ίδιο τηλέφωνο που πήρε το μικρόφωνο.</li>
      <li><strong>Χρησιμοποιείτε κάρτα ήχου USB (π.χ. Digirig) αλλά φαίνεται ότι καταγράφεται ο χώρος:</strong> δείτε τη «Συσκευή ήχου» στις Ρυθμίσεις → <strong>Για προχωρημένους</strong> για να διαπιστώσετε από ποια συσκευή γίνεται πράγματι η εγγραφή. Αν εμφανίζεται το ενσωματωμένο μικρόφωνο, πατήστε <strong>Νέος εντοπισμός</strong> και θα περάσει στην κάρτα USB χωρίς επανεκκίνηση. Η ίδια σελίδα δηλώνει ρητά και την περίπτωση «βρέθηκε συσκευή USB αλλά το σύστημα αρνήθηκε τη δρομολόγηση και η εγγραφή συνεχίζει από το ενσωματωμένο μικρόφωνο», οπότε δεν χρειάζεται να μαντεύετε.</li>
      <li><strong>Όταν η στάθμη εξόδου του ίδιου του πομποδέκτη δεν αλλάζει:</strong> χρησιμοποιήστε την <strong>Απολαβή ήχου λήψης</strong> στις Ρυθμίσεις → Πομποδέκτης και ήχος. Ο QMX δίνει σταθερή στάθμη μέσω USB και στους ICOM η ένταση USB βρίσκεται στο μενού SET και όχι στο κουμπί AF· σε αυτές τις περιπτώσεις είναι ταχύτερο να ρυθμιστεί από την εφαρμογή.</li>
    </ul>`,

  ts_noconn_title: 'Δεν γίνεται σύνδεση με τον πομποδέκτη',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> επιβεβαιώστε ότι η συσκευή σας υποστηρίζει USB OTG. Παραχωρήστε την άδεια συσκευής USB όταν σας τη ζητήσει το Android. Δοκιμάστε άλλον αντάπτορα OTG ή άλλο καλώδιο.</li>
      <li>Επαληθεύστε ότι το <strong>μοντέλο πομποδέκτη</strong> και ο <strong>ρυθμός baud</strong> ταιριάζουν με τις ρυθμίσεις CAT του μηχανήματος.</li>
      <li>Για ICOM: ελέγξτε ότι η <strong>διεύθυνση CI-V</strong> ταιριάζει με τη ρύθμιση στο μενού (συχνά 0x94 ή 0xA4).</li>
      <li><strong>Bluetooth:</strong> κάντε πρώτα σύζευξη του αντάπτορα στις ρυθμίσεις Bluetooth του Android και μετά επιλέξτε τον στο FT8TW. Βεβαιωθείτε ότι τροφοδοτείται και βρίσκεται εντός εμβέλειας.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> επιβεβαιώστε ότι τηλέφωνο και πομποδέκτης είναι στο ίδιο δίκτυο και ελέγξτε τη διεύθυνση IP και τον αριθμό θύρας.</li>
      <li>Αν έχετε ελέγξει όλα τα παραπάνω και εξακολουθεί να μην αποκρίνεται, χρησιμοποιήστε την ενότητα <strong>Radio Test Tool</strong> στο κάτω μέρος της σελίδας εργαλείων πομποδέκτη και ελέγξτε βήμα-βήμα: το <strong>Read Freq</strong> δείχνει αν ο πομποδέκτης απαντά και το <strong>PTT Test</strong> αν μπαίνει σε εκπομπή. Στο παράθυρο απαντήσεων οι εντολές που στάλθηκαν και όσα επέστρεψαν εμφανίζονται αυτούσια, οπότε ξεχωρίζετε αμέσως αν η εντολή δεν έφυγε, αν έφυγε χωρίς απάντηση, ή αν η απάντηση ήρθε σε άλλη μορφή. Δείτε τα <a href="ssb.html">«Εργαλεία πομποδέκτη»</a>.</li>
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
      <li>Αν η εφαρμογή αναφέρει εκκρεμή <strong>υποχρεωτική ενημέρωση</strong>, όλες οι διαδρομές εκπομπής μπλοκάρονται μέχρι να γίνει (FT8/FT4/FT2, WSPR, JS8, ομιλία με πάτημα και συντονισμός). Η περιήγηση, το ημερολόγιο και οι ρυθμίσεις παραμένουν διαθέσιμα. Δείτε την εξήγηση των ενημερώσεων στην <a href="install.html">«Εγκατάσταση»</a>.</li>
      <li>Πατήστε το <strong>PTT Test</strong> στην ενότητα <strong>Radio Test Tool</strong> της σελίδας εργαλείων πομποδέκτη: αν εκεί το PTT ανοίγει και κλείνει κανονικά, η ίδια η διαδρομή PTT λειτουργεί και το πρόβλημα βρίσκεται σε άλλο σημείο της ροής εκπομπής.</li>
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
