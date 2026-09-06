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
      <li><strong>Nothing decodes while you sit on the WSPR, JS8 or Radio Tools screen.</strong> That is deliberate (26.0817 and later): all three take over the same radio and the same audio path, so FT8 decoding is paused while you are there and resumes when you leave. The one case where it does not resume by itself is JS8 left switched on — JS8 keeps running in the background on its own frequency, so switch it off and return to the decode tab.</li>
      <li>If no audio is arriving at all, or you suspect the app is recording the room rather than the radio (most common with a USB sound card or Bluetooth), see <strong>Audio Device and USB Sound Cards</strong> below for how to confirm the actual recording source.</li>
    </ul>`,

  ts_noconn_title: 'Cannot Connect to Radio',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> Confirm USB OTG is supported by your device. Grant USB device permission when Android prompts you. Try a different OTG adapter or cable.</li>
      <li>Verify the <strong>radio model</strong> and <strong>baud rate</strong> match your radio's CAT settings.</li>
      <li>For ICOM: check the <strong>CI-V address</strong> matches the radio's menu setting (often 0x94 or 0xA4).</li>
      <li><strong>Bluetooth:</strong> Pair the adapter in Android Bluetooth settings before selecting it in FT8TW. Ensure the adapter is powered and within range.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> Confirm both phone and radio are on the same network. Check the IP address and port number. A wrong IP produces no error of its own — the radio simply never answers — so before 26.0816-2 the app would keep retrying silently with nothing shown on screen. Newer versions raise a <strong>connection timeout</strong> notice instead, which is worth trusting: a login that appears to hang is far more often a wrong address than a wrong password.</li>
      <li>If all of the above checks out and there is still no response, use the <strong>Radio Test Tool</strong> at the bottom of the Radio Tool page to work through it item by item: <strong>Read Freq</strong> shows whether the radio answers at all, and <strong>PTT Test</strong> whether it will key. The response window lists the commands sent and whatever came back verbatim, so you can tell straight away whether the command never went out, went out with no reply, or was answered in a different format. See <a href="ssb.html">Radio Tool</a>.</li>
      <li>If you are on USB and the test tool says <strong>the radio is not connected</strong>, read the next section — that message means something much narrower than it appears to.</li>
    </ul>`,

  ts_usb_title: 'USB Connection (CAT Control)',
  ts_usb_intro: 'Keep the two paths apart. <strong>CAT control</strong> runs over the USB serial port and decides whether the app can read and set the frequency and key PTT. <strong>Audio</strong> travels a separate path and decides what the decoder hears. They are independent — one can work while the other does not. When the Radio Test Tool says <strong>the radio is not connected</strong>, it means exactly one thing: <strong>the serial port was never opened</strong>. Baud rate, data bits, parity, radio model and PTT method are <em>not involved at all</em> — none of them come into play until the port is open. So when you see that message, work through the list below rather than going back to the CAT settings.',
  ts_usb_list: `
    <ul>
      <li><strong>No USB device list appears on the main screen.</strong> The list is shown above the decode screen only when a serial device was detected, the connection type is USB, and no radio is connected yet. It lists whatever Android reports and needs <strong>no permission and no recognised chipset</strong> to show an entry — so if the list never appears, the phone is almost certainly <strong>not enumerating the device at all</strong>, rather than the app declining to list it. Quick check: unplug and replug the cable. Android should offer to "Open FT8TW". If nothing happens at all, the phone cannot see the device.</li>
      <li><strong>The same cable works on a PC but not on the phone.</strong> A PC's USB-A port is always the host and negotiates nothing; a phone has to switch itself into USB host mode (OTG) and supply 5 V. The most common failure is a <strong>USB-C to USB-C</strong> connection: many CH340 and CP2102 boards with a USB-C socket omit the 5.1 kΩ CC pull-down resistors, so the phone decides nothing is attached and never enters host mode. Use <strong>phone → USB-C OTG adapter (with a USB-A socket) → your existing USB-A cable → radio</strong> instead; a USB-A-to-C cable carries that resistor in its C plug, so this path works even with boards that leave it out. A "USB Device Info" style app will also tell you directly whether the phone sees the device.</li>
      <li><strong>You tapped Allow and nothing happened.</strong> Versions before 26.0815-2 had a bug that discarded the permission result Android sent back: no reaction on screen, not even a toast. The workaround was to <strong>tap the same device in the list a second time</strong>. From 26.0815-2 the app connects as soon as permission is granted, so the second tap is no longer needed.</li>
      <li><strong>Devices that are not radios show up in the list.</strong> Before 26.0815-2, anything whose chipset was not recognised was listed as a serial port, so sound cards, keyboards and flash drives all appeared. A Digirig, being a serial port plus a sound card, produced two entries and it was easy to pick the wrong one. Newer versions filter out audio, HID, storage and hub devices, which cannot be serial ports.</li>
      <li><strong>No automatic connection at startup.</strong> Automatic connection requires <strong>exactly one serial device</strong> to be present. The bug above meant Digirig users could never satisfy that condition, so automatic connection silently stopped working; 26.0815-2 restores it. If you genuinely have two or more serial devices attached, you still need to pick one from the list.</li>
      <li><strong>Still shows connected after unplugging, or will not reconnect when plugged back in.</strong> From 26.0815-2, unplugging the device in use disconnects the radio immediately, and plugging it back in reconnects after a second or two. Older versions only noticed the missing cable when the next read or write failed; until then the screen still said connected, and that stale state then blocked the reconnect, which is why automatic reconnection used to be hit and miss.</li>
      <li><strong>Decoding successfully is not evidence that USB works.</strong> The phone's microphone will happily pick up the radio's speaker, and that path needs no USB at all. There is a one-move test: <strong>unplug the USB cable completely</strong>. If decodes continue, the audio was always acoustic. This matters most with <strong>(tr)uSDX audio over CAT</strong>: in that mode receive audio arrives <em>as serial data over the CAT link itself</em>, and only after the app has sent the radio a CAT command to start the stream. With the port closed there can be no audio, so "the test tool says not connected" and "the audio is coming over USB" cannot both be true.</li>
    </ul>`,

  ts_audio_title: 'Audio Device and USB Sound Cards',
  ts_audio_intro: 'The trap with a USB sound card (a Digirig, say) is that <strong>the decode screen keeps running and the level meter keeps moving even when the app is recording the room</strong>. Nothing on screen gives it away. To see which device is actually in use, open Settings → <strong>Advanced &amp; Developer</strong> and look at "Audio device": one status line, followed by six diagnostic fields. All six ask the recorder itself rather than reporting the values we requested.',
  ts_audio_fields: `
    <table>
      <tr><th>Field</th><th>How to read it</th></tr>
      <tr><td><code>Device type</code></td><td>The device audio is <strong>actually routed to right now</strong>. A USB sound card that reads <code>BUILTIN_MIC</code> means the room is still being recorded; it should read <code>USB_DEVICE</code>, <code>USB_HEADSET</code> or <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>The actual rate. The system is free to ignore what we asked for, and USB sound cards often do (48k requested, 44.1k delivered)</td></tr>
      <tr><td><code>Channel count</code></td><td>The actual channel count, likewise (mono requested, stereo delivered is common)</td></tr>
      <tr><td><code>Record source</code></td><td>The capture source constant, e.g. <code>MIC</code>, <code>VOICE_RECOGNITION</code>, <code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>The <strong>real</strong> Bluetooth SCO state as reported by the system broadcast</td></tr>
      <tr><td><code>SCO requested</code></td><td>The flag the app <strong>asked</strong> for. <code>requested=true</code> with <code>state=DISCONNECTED</code> is a Bluetooth adapter that has quietly dropped the link — the mismatch is the clue</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>If the status line reads <strong>"USB audio … found, but the system did not accept the routing request; still recording from the built-in microphone"</strong>, the device was found but the routing never moved. Press <strong>Re-detect</strong> first; if that does not help, unplug and replug the sound card and make sure no other app (voice recorder, a call in progress, a second copy of FT8TW) is holding the microphone.</li>
      <li><strong>Plugging and unplugging switches automatically</strong> on Android 6 and later, with two deliberate exceptions: audio coming from a <strong>network radio</strong> (FlexRadio / ICOM / Xiegu) is left alone, otherwise the source would be snatched back to the microphone; and <strong>while transmitting</strong> the switch is deferred, for up to 30 seconds. In the first case, pressing Re-detect tells you plainly that audio is coming from a network radio.</li>
      <li><strong>It says it is recording but not a single sample arrives.</strong> Before 26.0815-2, if the recorder failed to start the app still showed "recording", the timer still ran and the log even said recording had begun, while no audio would ever arrive. Newer versions report the failure instead, and the watchdog now also covers the one case it previously could not: a recorder that never started in the first place.</li>
      <li>If the decode screen shows a persistent <strong>⚠ No audio input</strong> notice, tap it — the app lists the likely causes: microphone permission missing or held by another app, a problem with the audio source itself (cable, radio volume, Bluetooth link), or a second copy of FT8TW on the same phone that has taken the microphone.</li>
      <li><strong>When the radio's own output level cannot be changed</strong>, use <strong>Receive audio gain</strong> under Settings → Radio &amp; Audio. A QMX sends a fixed level over USB, and on ICOM radios the USB level lives in the set menu rather than on the AF knob.</li>
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
      <li><strong>A WSPR run blocks FT8/FT4/FT2 transmission</strong> (26.0815-2 and later). Both share one radio and one audio path, and previously FT8 carried on transmitting slot after slot during the gaps while WSPR waited for an even UTC minute. Enabling WSPR now switches FT8 transmission off first and tells you so; conversely, starting FT8 while a WSPR run is in progress is blocked with an explanation. <strong>FT8 is not switched back on when WSPR finishes</strong> — deliberately, since restoring it quietly would produce an unexpected transmission.</li>
      <li><strong>Transmission stopped by itself and did not return to calling CQ.</strong> Check whether you selected the station by <strong>swiping left</strong>. A left swipe means "call this one station": if transmission was off at that moment, the app enters single-QSO mode, stops transmitting when that contact finishes, and does not pick up other stations calling you in the meantime. To keep it running, switch transmission on before swiping, or select the station by tapping instead.</li>
      <li><strong>Yaesu FTX-1:</strong> if the radio transmits what its microphone picks up instead of the audio sent over the USB cable, set <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> to <strong>USB</strong>. The factory value is AUTO, which uses the microphone whenever transmission is not started by CAT/RTS/DTR. Version 26.0814-2 and later set this for you when the radio connects.</li>
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
      <li>If you suspect the Bluetooth audio link has quietly dropped, check the <code>SCO state</code> and <code>SCO requested</code> lines under Settings → <strong>Advanced &amp; Developer</strong> → Audio device. <code>requested=true</code> with <code>state=DISCONNECTED</code> is exactly that: the link is gone while the app still believes it is up.</li>
    </ul>`,

  ts_report_title: 'What to Include When Reporting a Problem',
  ts_report_intro: 'The <strong>ISSUE</strong> button at the bottom of the Settings page opens the issue tracker directly (<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>). Items 1 and 2 are needed almost every time. Without a version number we cannot tell whether you have hit something already fixed, and more than one build may be released on the same day, so "the latest version" is not specific enough. Add the rest according to the kind of problem.',
  ts_report_list: `
    <ol>
      <li><strong>The version number.</strong> It is on the welcome screen at startup, and in the top right of any help (<strong>?</strong>) dialog. Please copy it in full, <strong>including any suffix</strong> (for example <code>26.0815-2</code>) — two builds from the same day are not the same, and dropping the <code>-2</code> can point us at the wrong one.</li>
      <li><strong>The error information (Debug screen).</strong> The <strong>Debug</strong> button at the bottom of the Settings page opens the "Last error dump" screen. The upper part is the <strong>runtime diagnostic report</strong>: decoding that has silently stalled, a dead recording thread, a decode lock timeout — faults that never crash the app and give no on-screen warning, and that can be seen nowhere else. The lower part is the last crash log, including the version and run time at the time. <strong>Copy Error Message</strong> puts the whole thing on the clipboard, ready to paste. Even a bare <code>No issues detected.</code> is useful information. The report itself is always in English, whatever the interface language, so that reports from anywhere can be read.</li>
      <li><strong>Phone model and Android version</strong>, plus the <strong>radio model</strong> and <strong>connection type</strong> (VOX / USB / Bluetooth / network).</li>
      <li><strong>For connection or CAT problems:</strong> include the contents of the response window in the <strong>Radio Test Tool</strong> on the Radio Tool page — it has a <strong>Copy</strong> button. It lists every command sent and every reply received, which usually shows at a glance whether the command never went out, the radio did not answer, or it answered in a different format.</li>
      <li><strong>For decoding or missing audio:</strong> include the status line and the six diagnostic fields from Settings → <strong>Advanced &amp; Developer</strong> → Audio device. A screenshot is fine.</li>
      <li><strong>For display or waterfall problems:</strong> <strong>Copy diagnostics</strong> in the waterfall adjustment panel puts the current levels, gains and other internal values on the clipboard.</li>
    </ol>`,
  ts_report_note: 'Nothing on the Debug screen is sent anywhere automatically. It leaves your phone only when you copy it and paste it yourself.',
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
      <li><strong>人停在 WSPR、JS8 或電台工具畫面時完全不解碼。</strong>這是刻意的（26.0817 起）：這三個畫面都會獨佔同一具電台與同一條音訊路徑，所以在這些畫面時 FT8 解碼會暫停，離開就恢復。唯一不會自己恢復的情況是 JS8 還開著——JS8 會留在背景用自己的頻率繼續跑，把它關掉再回到解碼分頁即可。</li>
      <li>完全收不到音訊、或懷疑收的其實是室內的環境音（用了 USB 音效卡、藍牙時最常見），請看下面的<strong>「音訊裝置與 USB 音效卡」</strong>一節，那裡有怎麼確認實際錄音來源的方法。</li>
    </ul>`,

  ts_noconn_title: '無法連接電台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>確認裝置支援 USB OTG，Android 提示時授予 USB 裝置存取權限，可嘗試更換 OTG 轉接頭或連接線。</li>
      <li>確認<strong>電台型號</strong>及<strong>傳輸速率</strong>與電台 CAT 設定相符。</li>
      <li>ICOM 電台需確認 <strong>CI-V 地址</strong>與電台選單設定一致（常見值為 0x94 或 0xA4）。</li>
      <li><strong>藍牙：</strong>請先在 Android 藍牙設定中完成配對，再於 FT8TW 中選取裝置，並確認藍牙模組已通電且在有效範圍內。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>確認手機與電台連接至同一網路，並核對 IP 位址及埠號。IP 打錯時電台根本不會回應，本身不會產生任何錯誤，所以 26.0816-2 以前程式只會無聲地一直重試，畫面上看不出任何徵兆。新版改為顯示<strong>連線逾時</strong>提示，這個提示值得相信：登入像是卡住時，位址寫錯的機率遠高於帳號密碼錯誤。</li>
      <li>以上都對過還是沒反應時，請用電台工具頁最下方的<strong>電台測試工具</strong>逐項確認：按<strong>讀取頻率</strong>看電台有沒有回應、按 <strong>PTT 測試</strong>看能不能拉起發射。回應視窗會把送出的指令與收到的回覆原樣列出來，可以直接分辨是「指令沒送出去」、「送出去了但電台不回」還是「回了但格式不同」。詳見<a href="ssb.html">「電台工具」</a>。</li>
      <li>用 USB 連線而測試工具顯示<strong>「電台未連線」</strong>時，請看下一節——那句話的意思比它看起來的窄很多。</li>
    </ul>`,

  ts_usb_title: 'USB 連線（CAT 控制）',
  ts_usb_intro: '先把兩條路分開：<strong>CAT 控制</strong>走 USB 序列埠，決定程式能不能讀寫頻率、能不能拉 PTT；<strong>音訊</strong>走另一條路，決定解碼器聽到什麼。兩者互相獨立，可以一條通、另一條不通。電台測試工具顯示<strong>「電台未連線」</strong>時只代表一件事：<strong>序列埠沒有開起來</strong>。這與傳輸速率、資料位、同位元、電台型號、PTT 方式<em>全都無關</em>——那些參數要等序列埠開了才輪得到。所以看到這句話請往下面查，不要回頭調 CAT 參數。',
  ts_usb_list: `
    <ul>
      <li><strong>主畫面沒有出現 USB 裝置清單。</strong>這份清單要「偵測到序列埠裝置、連接方式為 USB、且尚未連線」三者同時成立，才會出現在解碼畫面上方。它列的是 Android 回報的裝置，<strong>不需要授權、也不必先認得晶片</strong>就會列出來——所以看不到清單，通常代表<strong>手機根本沒有列舉到這個裝置</strong>，而不是程式沒把它列進去。判斷方法：把線拔掉重插，Android 應該跳出「要開啟 FT8TW 嗎？」。完全沒有任何反應，就是手機沒看到它。</li>
      <li><strong>同一條線在電腦上正常、在手機上看不到。</strong>電腦的 USB-A 埠永遠是主機端，什麼都不必協商；手機則必須自己切換成 USB 主機（OTG）並供應 5 V。最常見的失敗是 <strong>USB-C 對 USB-C 直連</strong>：很多 CH340／CP2102 的 USB-C 板子沒有做 CC 腳的 5.1 kΩ 下拉電阻，手機判定「這裡沒有裝置」而不切換到主機模式。改走<strong>手機 → USB-C OTG 轉接頭（帶 USB-A 母座）→ 原本那條 USB-A 的線 → 電台</strong>就會正常，因為 USB-A 對 USB-C 的線在 C 端插頭裡本來就有那顆電阻。也可以裝一個「USB Device Info」之類的工具程式，直接確認手機到底有沒有看到這顆裝置。</li>
      <li><strong>按了「允許」卻毫無反應。</strong>26.0815-2 以前有一個 bug：Android 送回來的授權結果整包收不到，畫面完全沒有動靜，連提示都不會出現。當時的解法是<strong>在清單上再點一次同一個裝置</strong>，第二次才會連上。26.0815-2 起授權完成即自動連線，不必再點第二次。</li>
      <li><strong>清單裡出現不是電台的東西。</strong>26.0815-2 以前，只要晶片不在已知清單內就一律被當成序列埠列出來，音效卡、鍵盤、隨身碟都會冒出來。Digirig 這種「序列埠＋音效卡」的介面因此會出現兩項，很容易點到錯的那一項。新版已濾掉音訊、HID、儲存、集線器等明確不可能是序列埠的裝置。</li>
      <li><strong>開機沒有自動連線。</strong>自動連線的條件是<strong>「剛好只有一個序列埠裝置」</strong>。上一條那個 bug 會讓 Digirig 使用者永遠湊不齊這個條件，自動連線於是靜默失效；升到 26.0815-2 即恢復。若您本來就同時接了兩條以上的序列線，仍需手動在清單點一次。</li>
      <li><strong>拔線後仍顯示已連線、重插又沒反應。</strong>26.0815-2 起，拔掉正在使用的那一顆會主動斷線，重新插上約一兩秒後自動接回。舊版要等下一次讀寫真的失敗才會發現線不見了，在那之前畫面仍顯示已連線，而重插時又會被這個過期狀態擋掉，於是自動重連時靈時不靈。</li>
      <li><strong>「解得開」不能當成 USB 有通的證據。</strong>手機麥克風會拾取電台喇叭的聲音，這條路完全不需要 USB。要一刀切開很簡單：<strong>把 USB 線整條拔掉</strong>——若照樣解碼，音訊本來就是走麥克風。選用 <strong>(tr)uSDX audio over CAT</strong> 的人尤其要注意：那個模式的接收音訊是<em>以序列資料的形式從 CAT 這條線送過來的</em>，而且要先由程式送出 CAT 指令才會開始串流。序列埠沒開就不可能有音訊，所以「測試工具說未連線」與「音訊從 USB 來」不可能同時成立。</li>
    </ul>`,

  ts_audio_title: '音訊裝置與 USB 音效卡',
  ts_audio_intro: '用了 USB 音效卡（Digirig 這類）之後最容易踩的坑是：<strong>就算收的是室內的環境音，解碼畫面照跑、電平也照動</strong>，畫面上完全沒有徵兆。要確認實際在收哪一個裝置，請到設置 → <strong>進階與開發者</strong>看「音訊裝置」——上面一行是狀態文字，下面六行是診斷細節，問的都是錄音物件本人，而不是我們送進去的參數。',
  ts_audio_fields: `
    <table>
      <tr><th>欄位</th><th>怎麼看</th></tr>
      <tr><td><code>Device type</code></td><td>錄音<strong>當下實際</strong>路由到的裝置。接了 USB 音效卡卻顯示 <code>BUILTIN_MIC</code>，就代表還在收室內的聲音；正常應該是 <code>USB_DEVICE</code>、<code>USB_HEADSET</code> 或 <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>實際取樣率。系統可以不照我們要求的辦，USB 音效卡尤其常見（要求 48k 實際給 44.1k）</td></tr>
      <tr><td><code>Channel count</code></td><td>實際聲道數，同上（要求單聲道實際給雙聲道也很常見）</td></tr>
      <tr><td><code>Record source</code></td><td>錄音來源常數，例如 <code>MIC</code>、<code>VOICE_RECOGNITION</code>、<code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>藍牙 SCO 由系統廣播回報的<strong>真實</strong>狀態</td></tr>
      <tr><td><code>SCO requested</code></td><td>程式<strong>要求</strong>過的旗標。<code>requested=true</code> 而 <code>state=DISCONNECTED</code>，就是藍牙模組悄悄斷線了——這個落差本身就是線索</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>狀態文字若顯示<strong>「找到 USB 音訊 …，但系統未接受路由要求，實際仍在收內建麥克風」</strong>，代表裝置找到了、路由卻沒切過去。先按<strong>重新偵測</strong>；仍然不行就把音效卡拔插一次，並確認沒有別的程式（錄音機、通話中、另一個 FT8TW）佔著麥克風。</li>
      <li><strong>插拔會自動切換</strong>（Android 6 以上），但有兩種情況刻意不切：音訊來自<strong>網路電台</strong>（FlexRadio／ICOM／協谷）時不切，否則會把音源搶回麥克風；<strong>發射中</strong>會延後處理，最多讓路 30 秒。第一種情況按下重新偵測會直接告訴您「音訊來自網路電台」。</li>
      <li><strong>畫面顯示錄音中，卻一筆音訊都沒有。</strong>26.0815-2 以前，錄音啟動失敗時程式仍會顯示錄音中、計時器照跑、記錄也寫了「開始錄音」，實際上永遠不會有音訊進來。新版起不來就會直接反映出來，看門狗也補上了「從第一秒就沒起來」這個先前唯一救不到的死角。</li>
      <li>解碼畫面若常駐顯示<strong>「⚠ 沒有收到音訊」</strong>，點一下會列出可能原因：麥克風權限未開或被其他程式佔用、音源本身有問題（連接線、電台音量、藍牙連線），或這台手機還裝了另一個 FT8TW 把麥克風拿走了。</li>
      <li><strong>電台的音量根本調不動時</strong>，用設置 → 電台與聲音的<strong>接收音訊增益</strong>從 App 這端調最快。QMX 這類純數位機的 USB 音訊電平是固定的，ICOM 的 USB 音量則藏在 SET 選單而不是 AF 旋鈕。</li>
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
      <li><strong>WSPR 排程進行中會擋下 FT8／FT4／FT2 的發射</strong>（26.0815-2 起）。兩者共用同一具電台與同一條音訊路徑，先前「發一次 WSPR」的等待空檔裡 FT8 仍會一輪一輪照發。現在開啟 WSPR 會先把 FT8 的發射關掉並告知，反過來 WSPR 進行中要開 FT8 也會被擋下並說明解除方式。<strong>WSPR 結束後不會自動幫您把 FT8 開回來</strong>——這是刻意的，悄悄恢復等於製造一次沒人預期的自動發射。</li>
      <li><strong>發射自己停了、而且沒有回去呼叫 CQ</strong>：檢查是不是用<strong>左滑</strong>選的對象。左滑的語意是「我只要呼叫這一個人」，若左滑當下發射是關著的，程式會進入單次通聯模式——這一場結束就停止發射，期間也不接手其他呼叫您的人。想要持續運作，請先開啟發射再左滑，或改用點選的方式。</li>
      <li><strong>Yaesu FTX-1：</strong>若電台發出去的是麥克風收到的聲音、而不是 USB 線送來的音訊，請將電台的 <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> 設為 <strong>USB</strong>。原廠值是 AUTO，只要不是由 CAT/RTS/DTR 觸發發射就會改用麥克風。26.0814-2 以後的版本會在連線時自動設定。</li>
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
      <li>懷疑藍牙音訊悄悄斷了，就到設置 → <strong>進階與開發者</strong>看「音訊裝置」的 <code>SCO state</code> 與 <code>SCO requested</code> 兩行：<code>requested=true</code> 而 <code>state=DISCONNECTED</code> 正是鏈路已斷、程式卻還以為連著的樣態。</li>
    </ul>`,

  ts_report_title: '回報問題時請附上這些資訊',
  ts_report_intro: '設置頁最下方的<strong>回報</strong>鍵會直接開啟問題回報頁（<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>）。下面第 1、2 兩項幾乎一定用得到：沒有版本號，我們無法判斷您遇到的是不是已經修掉的問題；而同一天可能不只發布一個版本，光說「最新版」並不足以辨識。其餘幾項依問題類型附上即可。',
  ts_report_list: `
    <ol>
      <li><strong>版本號。</strong>App 啟動時的歡迎畫面上就有；任何一個說明（<strong>?</strong>）對話框的右上角也會顯示。請完整照抄，<strong>包含後面的尾碼</strong>（例如 <code>26.0815-2</code>）——同一天的兩個版本內容並不相同，少抄一個 <code>-2</code> 就可能對到錯的版本。</li>
      <li><strong>錯誤訊息（Debug 畫面）。</strong>設置頁最下方的 <strong>Debug</strong> 鍵會開啟「最後一次錯誤訊息」畫面。上半部是<strong>執行期異常診斷</strong>（<code>Runtime diagnostics</code>）——解碼靜默停擺、錄音執行緒死亡、解碼鎖逾時這類<em>不會當機、畫面也不會有任何提示</em>的故障，只有這裡看得到；下半部是最後一次當機的完整記錄，含當時的版本與運行時間。按 <strong>Copy Error Message</strong> 就整份複製到剪貼簿，直接貼過來即可。就算它只顯示 <code>No issues detected.</code>，那也是有用的資訊。報告內容一律是英文，不隨介面語言改變——這樣我們收到哪一國的回報都讀得懂。</li>
      <li><strong>手機型號與 Android 版本</strong>，以及<strong>電台型號</strong>與<strong>連線方式</strong>（VOX／USB／藍牙／網路）。</li>
      <li><strong>電台連不上、CAT 沒反應時</strong>：附上電台工具頁<strong>電台測試工具</strong>回應視窗的內容（該視窗有<strong>複製</strong>鍵）。它逐筆列出送出的指令與收到的回覆，通常一眼就能分辨是指令沒送出去、電台不回應，還是回了但格式不同。</li>
      <li><strong>解不開、收不到音訊時</strong>：附上設置 → <strong>進階與開發者</strong>「音訊裝置」的狀態文字與那六行診斷細節，截圖即可。</li>
      <li><strong>顯示或瀑布圖相關</strong>：瀑布圖調整面板裡的<strong>複製診斷資訊</strong>會把目前的位準、增益等內部數值複製到剪貼簿。</li>
    </ol>`,
  ts_report_note: 'Debug 畫面裡的內容不會自動傳送到任何地方——只有在您按下複製、並自己貼出來時才會離開手機。',
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
      <li><strong>人停在 WSPR、JS8 或电台工具画面时完全不解码。</strong>这是刻意的（26.0817 起）：这三个画面都会独占同一具电台与同一条音频路径，所以在这些画面时 FT8 解码会暂停，离开就恢复。唯一不会自己恢复的情况是 JS8 还开着——JS8 会留在后台用自己的频率继续跑，把它关掉再回到解码分页即可。</li>
      <li>完全收不到音频、或怀疑收的其实是室内的环境音（用了 USB 声卡、蓝牙时最常见），请看下面的<strong>「音频设备与 USB 声卡」</strong>一节，那里有怎么确认实际录音来源的方法。</li>
    </ul>`,

  ts_noconn_title: '无法连接电台',
  ts_noconn_list: `
    <ul>
      <li><strong>USB：</strong>确认设备支持 USB OTG，Android 提示时授予 USB 设备访问权限，可尝试更换 OTG 转接头或连接线。</li>
      <li>确认<strong>电台型号</strong>及<strong>波特率</strong>与电台 CAT 设置相符。</li>
      <li>ICOM 电台需确认 <strong>CI-V 地址</strong>与电台菜单设置一致（常见值为 0x94 或 0xA4）。</li>
      <li><strong>蓝牙：</strong>请先在 Android 蓝牙设置中完成配对，再于 FT8TW 中选取设备，并确认蓝牙模块已通电且在有效范围内。</li>
      <li><strong>WiFi（FlexRadio / ICOM）：</strong>确认手机与电台连接至同一网络，并核对 IP 地址及端口号。IP 打错时电台根本不会回应，本身不会产生任何错误，所以 26.0816-2 以前程序只会无声地一直重试，画面上看不出任何征兆。新版改为显示<strong>连接超时</strong>提示，这个提示值得相信：登录像是卡住时，地址写错的机率远高于账号密码错误。</li>
      <li>以上都对过还是没反应时，请用电台工具页最下方的<strong>电台测试工具</strong>逐项确认：按<strong>读取频率</strong>看电台有没有回应、按 <strong>PTT 测试</strong>看能不能拉起发射。回应窗口会把送出的指令与收到的回复原样列出来，可以直接分辨是「指令没送出去」、「送出去了但电台不回」还是「回了但格式不同」。详见<a href="ssb.html">「电台工具」</a>。</li>
      <li>用 USB 连线而测试工具显示<strong>「电台未连线」</strong>时，请看下一节——那句话的意思比它看起来的窄很多。</li>
    </ul>`,

  ts_usb_title: 'USB 连接（CAT 控制）',
  ts_usb_intro: '请把两条路分开看。<strong>CAT 控制</strong>走 USB 串口，决定 App 能不能读取与设定频率、能不能按下 PTT；<strong>音频</strong>走另一条路，决定解码器听到什么。两者互相独立——一条通、另一条不通是常事。电台测试工具说<strong>「电台未连线」</strong>时，它的意思只有一个：<strong>串口根本没有打开</strong>。波特率、数据位、校验、电台型号与 PTT 方式<em>完全不参与</em>——端口没开之前，它们一个都还轮不到。所以看到这句话时，请照下面的清单排查，不要回头去调 CAT 参数。',
  ts_usb_list: `
    <ul>
      <li><strong>主画面上根本没有出现 USB 设备列表。</strong>该列表只在检测到串口设备、连接方式为 USB、且尚未连接时才会显示在解码画面上方。它列的是 Android 报上来的东西，<strong>不需要授权、也不需要认得芯片</strong>就能列出一项——所以列表始终不出现，几乎可以断定是<strong>手机根本没有枚举到这个设备</strong>，而不是 App 不肯列。快速确认：把线拔掉再插上，Android 应该会询问是否「开启 FT8TW」。若完全没有任何反应，就是手机看不到这个设备。</li>
      <li><strong>同一条线在电脑上正常，在手机上却不行。</strong>电脑的 USB-A 口永远是主机端，不需要协商；手机则必须自己切换成 USB 主机模式（OTG）并供给 5V。最常见的失败是 <strong>USB-C 对 USB-C</strong> 的接法：不少带 USB-C 座的 CH340、CP2102 板子省掉了 5.1kΩ 的 CC 下拉电阻，手机因此判定没有接东西，也就不会进入主机模式。请改走<strong>手机 → USB-C OTG 转接头（带 USB-A 母座）→ 原本的 USB-A 线 → 电台</strong>；USB-A 转 C 的线在 C 头里带着那颗电阻，所以即使板子省掉了也能通。装一个「USB Device Info」之类的 App 也能直接看出手机有没有看到这个设备。</li>
      <li><strong>按了「允许」却毫无反应。</strong>26.0815-2 以前有一个 bug 会把 Android 回传的授权结果丢掉：画面上没有任何反应，连提示都没有。当时的绕过方法是<strong>在列表里再点一次同一个设备</strong>。26.0815-2 起授权一通过就直接连线，不必再点第二次。</li>
      <li><strong>列表里出现了不是电台的东西。</strong>26.0815-2 以前，只要芯片不被认得就一律列成串口，于是声卡、键盘、U 盘全都跑出来。Digirig 本身是「串口＋声卡」，因此会出现两项，很容易点错。新版会滤掉音频、HID、存储与集线器这类明确不可能是串口的设备。</li>
      <li><strong>启动时不自动连线。</strong>自动连线的条件是<strong>刚好只有一个串口设备</strong>。上面那个 bug 让 Digirig 使用者永远满足不了这个条件，自动连线因此悄悄失效；26.0815-2 修回来了。若您确实接了两个以上的串口设备，仍需自己从列表里点一个。</li>
      <li><strong>拔掉线仍显示已连线，或插回去不会自动接回。</strong>26.0815-2 起，拔掉正在使用的设备会立刻断开电台，插回去约一两秒自动接回。旧版要等到下一次读写失败才发现线不见了，在那之前画面还写着已连线，而这个过期的状态又会挡住重新连线——这正是以前「自动重连时灵时不灵」的原因。</li>
      <li><strong>解得出讯号并不能证明 USB 是通的。</strong>手机麦克风照样收得到电台喇叭的声音，那条路完全不需要 USB。有一个一步到位的测试：<strong>把 USB 线整条拔掉</strong>。若解码照常继续，那音频从头到尾都是靠拾音。这一点在 <strong>(tr)uSDX 的 audio over CAT</strong> 上最关键：该模式的接收音频是<em>以串口数据的形式走 CAT 链路本身</em>，而且要等 App 送出 CAT 指令启动数据流之后才有。端口没开就不可能有音频，所以「测试工具说未连线」与「音频是走 USB 来的」不可能同时成立。</li>
    </ul>`,

  ts_audio_title: '音频设备与 USB 声卡',
  ts_audio_intro: 'USB 声卡（例如 Digirig）的陷阱在于：<strong>即使 App 正在收室内的环境声，解码画面照样在跑、电平表照样在动</strong>，画面上看不出任何破绽。要知道现在实际用的是哪个设备，请打开设置 → <strong>进阶与开发者</strong>，看「音频设备」：一行状态文字，后面跟着六行诊断字段。这六行问的都是录音对象本人，而不是复述我们请求的值。',
  ts_audio_fields: `
    <table>
      <tr><th>字段</th><th>怎么判读</th></tr>
      <tr><td><code>Device type</code></td><td>音频<strong>现在实际路由到</strong>的设备。接了 USB 声卡却显示 <code>BUILTIN_MIC</code>，就是还在录室内的声音；正常应该是 <code>USB_DEVICE</code>、<code>USB_HEADSET</code> 或 <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>实际的采样率。系统可以不理会我们的请求，USB 声卡尤其常见（要求 48k、实际给 44.1k）</td></tr>
      <tr><td><code>Channel count</code></td><td>实际的声道数，同理（要求单声道、实际给立体声很常见）</td></tr>
      <tr><td><code>Record source</code></td><td>采集来源常数，例如 <code>MIC</code>、<code>VOICE_RECOGNITION</code>、<code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>系统广播报上来的蓝牙 SCO <strong>真实</strong>状态</td></tr>
      <tr><td><code>SCO requested</code></td><td>App <strong>要求</strong>过的标志。<code>requested=true</code> 而 <code>state=DISCONNECTED</code>，就是蓝牙适配器悄悄把链路断掉了——两者不一致正是线索</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>状态文字若显示<strong>「找到 USB 音频 …，但系统未接受路由请求，实际仍在收内置麦克风」</strong>，代表设备找到了、路由却没切过去。先按<strong>重新检测</strong>；仍然不行就把声卡拔插一次，并确认没有别的程序（录音机、通话中、另一个 FT8TW）占着麦克风。</li>
      <li><strong>插拔会自动切换</strong>（Android 6 以上），但有两种情况刻意不切：音频来自<strong>网络电台</strong>（FlexRadio／ICOM／协谷）时不切，否则会把音源抢回麦克风；<strong>发射中</strong>会延后处理，最多让路 30 秒。第一种情况按下重新检测会直接告诉您「音频来自网络电台」。</li>
      <li><strong>画面显示录音中，却一笔音频都没有。</strong>26.0815-2 以前，录音启动失败时程序仍会显示录音中、计时器照跑、记录也写了「开始录音」，实际上永远不会有音频进来。新版起不来就会直接反映出来，看门狗也补上了「从第一秒就没起来」这个先前唯一救不到的死角。</li>
      <li>解码画面若常驻显示<strong>「⚠ 没有收到音频」</strong>，点一下会列出可能原因：麦克风权限未开或被其他程序占用、音源本身有问题（连接线、电台音量、蓝牙连接），或这台手机还装了另一个 FT8TW 把麦克风拿走了。</li>
      <li><strong>电台的音量根本调不动时</strong>，用设置 → 电台与声音的<strong>接收音频增益</strong>从 App 这端调最快。QMX 这类纯数字机的 USB 音频电平是固定的，ICOM 的 USB 音量则藏在 SET 菜单而不是 AF 旋钮。</li>
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
      <li><strong>WSPR 计划进行中会挡下 FT8／FT4／FT2 的发射</strong>（26.0815-2 起）。两者共用同一具电台与同一条音频路径，先前「发一次 WSPR」的等待空档里 FT8 仍会一轮一轮照发。现在开启 WSPR 会先把 FT8 的发射关掉并告知，反过来 WSPR 进行中要开 FT8 也会被挡下并说明解除方式。<strong>WSPR 结束后不会自动帮您把 FT8 开回来</strong>——这是刻意的，悄悄恢复等于制造一次没人预期的自动发射。</li>
      <li><strong>发射自己停了、而且没有回去呼叫 CQ：</strong>检查是不是用<strong>左滑</strong>选的对象。左滑的语意是「我只要呼叫这一个人」，若左滑当下发射是关着的，程序会进入单次通联模式——这一场结束就停止发射，期间也不接手其他呼叫您的人。想让它继续跑，请先把发射打开再左滑，或改用点选的方式选对象。</li>
      <li><strong>Yaesu FTX-1：</strong>若电台发出去的是麦克风收到的声音、而不是 USB 线送来的音频，请将电台的 <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> 设为 <strong>USB</strong>。原厂值是 AUTO，只要不是由 CAT/RTS/DTR 触发发射就会改用麦克风。26.0814-2 以后的版本会在连接时自动设定。</li>
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
      <li>怀疑蓝牙音频悄悄断了，就到设置 → <strong>进阶与开发者</strong>看「音频设备」的 <code>SCO state</code> 与 <code>SCO requested</code> 两行：<code>requested=true</code> 而 <code>state=DISCONNECTED</code> 正是链路已断、程序却还以为连着的样态。</li>
    </ul>`,

  ts_report_title: '回报问题时请附上这些信息',
  ts_report_intro: '设置页最下方的<strong>回报</strong>键会直接打开问题回报页（<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>）。下面第 1、2 两项几乎一定用得到：没有版本号，我们无法判断您遇到的是不是已经修掉的问题；而同一天可能不只发布一个版本，光说「最新版」并不足以辨识。其余几项依问题类型附上即可。',
  ts_report_list: `
    <ol>
      <li><strong>版本号。</strong>App 启动时的欢迎画面上就有；任何一个说明（<strong>?</strong>）对话框的右上角也会显示。请完整照抄，<strong>包含后面的尾码</strong>（例如 <code>26.0815-2</code>）——同一天的两个版本内容并不相同，少抄一个 <code>-2</code> 就可能对到错的版本。</li>
      <li><strong>错误信息（Debug 画面）。</strong>设置页最下方的 <strong>Debug</strong> 键会打开「最后一次错误信息」画面。上半部是<strong>运行期异常诊断</strong>（<code>Runtime diagnostics</code>）——解码静默停摆、录音线程死亡、解码锁超时这类<em>不会崩溃、画面也不会有任何提示</em>的故障，只有这里看得到；下半部是最后一次崩溃的完整记录，含当时的版本与运行时间。按 <strong>Copy Error Message</strong> 就整份复制到剪贴板，直接贴过来即可。就算它只显示 <code>No issues detected.</code>，那也是有用的信息。报告内容一律是英文，不随界面语言改变——这样我们收到哪一国的回报都读得懂。</li>
      <li><strong>手机型号与 Android 版本</strong>，以及<strong>电台型号</strong>与<strong>连接方式</strong>（VOX／USB／蓝牙／网络）。</li>
      <li><strong>电台连不上、CAT 没反应时</strong>：附上电台工具页<strong>电台测试工具</strong>回应窗口的内容（该窗口有<strong>复制</strong>键）。它逐笔列出送出的指令与收到的回复，通常一眼就能分辨是指令没送出去、电台不回应，还是回了但格式不同。</li>
      <li><strong>解不开、收不到音频时</strong>：附上设置 → <strong>进阶与开发者</strong>「音频设备」的状态文字与那六行诊断细节，截图即可。</li>
      <li><strong>显示或瀑布图相关</strong>：瀑布图调整面板里的<strong>复制诊断信息</strong>会把目前的电平、增益等内部数值复制到剪贴板。</li>
    </ol>`,
  ts_report_note: 'Debug 画面里的内容不会自动传送到任何地方——只有在您按下复制、并自己贴出来时才会离开手机。',
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
      <li><strong>WSPR・JS8・無線機ツールの画面にいる間、まったくデコードされない。</strong>これは意図した動作です（26.0817 以降）。この 3 つの画面はいずれも同じ無線機と同じ音声経路を占有するため、そこにいる間は FT8 のデコードを一時停止し、画面を離れると再開します。自動で戻らない唯一のケースが、JS8 をオンのままにしている場合です。JS8 は自分の周波数で背景に居続けるので、オフにしてデコードのタブへ戻ってください。</li>
      <li>音声がまったく来ない、あるいは録っているのは室内の音ではないかと疑われるとき（USB サウンドカードや Bluetooth でとくに多い）は、下の<strong>「オーディオデバイスと USB サウンドカード」</strong>をご覧ください。実際の録音元を確かめる方法があります。</li>
    </ul>`,

  ts_noconn_title: '無線機に接続できない',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> 端末が USB OTG に対応しているか確認し、Android の確認画面で USB デバイスへの権限を許可します。別の OTG アダプターやケーブルも試してください。</li>
      <li><strong>無線機の機種</strong>と<strong>ボーレート</strong>が無線機側の CAT 設定と一致しているか確認します。</li>
      <li>ICOM の場合は <strong>CI-V アドレス</strong>が無線機のメニュー設定と一致しているか確認します（0x94 や 0xA4 が多いです）。</li>
      <li><strong>Bluetooth:</strong> 先に Android の Bluetooth 設定でペアリングしてから FT8TW で選択します。アダプターに電源が入っていて、通信範囲内にあるかも確認してください。</li>
      <li><strong>WiFi（FlexRadio / ICOM）:</strong> スマートフォンと無線機が同じネットワークにあるか確認し、IP アドレスとポート番号を見直します。</li>
      <li>以上をすべて確認しても反応がない場合は、無線機ツール画面の下部にある <strong>無線機テストツール</strong> で 1 項目ずつ確かめてください。<strong>Read Freq</strong> で無線機が応答するか、<strong>PTT Test</strong> で送信に入れるかが分かります。応答ウィンドウには送ったコマンドと返ってきた内容がそのまま並ぶので、「コマンドが出ていない」「出ているが無線機が返さない」「返ってきたが形式が違う」のどれなのかを直接見分けられます。詳しくは<a href="ssb.html">「無線機ツール」</a>。</li>
      <li>USB 接続でテストツールが<strong>「無線機が接続されていません」</strong>と表示する場合は、次の節をご覧ください。この一文が意味する範囲は、見た目よりずっと狭いのです。</li>
    </ul>`,

  ts_usb_title: 'USB 接続（CAT 制御）',
  ts_usb_intro: '2 つの経路は分けて考えてください。<strong>CAT 制御</strong>は USB シリアルポートを通り、周波数の読み書きと PTT ができるかを決めます。<strong>音声</strong>は別の経路を通り、デコーダーが何を聞くかを決めます。両者は独立していて、片方だけが通じることも普通にあります。無線機テストツール が<strong>「無線機が接続されていません」</strong>と言うとき、その意味はただ一つ、<strong>シリアルポートが開けていない</strong>ということです。ボーレート、データビット、パリティ、無線機の機種、PTT の方式は<em>まったく関係しません</em>——ポートが開くまで、どれも出番が来ないからです。ですからこのメッセージが出たときは、CAT の設定に戻らず、下のリストを順に確認してください。',
  ts_usb_list: `
    <ul>
      <li><strong>メイン画面に USB デバイスの一覧がそもそも出ない。</strong>この一覧は、シリアルデバイスを検出していて、接続方式が USB で、まだ接続していないときだけデコード画面の上に出ます。並ぶのは Android が報告してきたもので、<strong>許可も、チップの認識も不要</strong>で 1 行は出せます。つまり一覧が一度も出ないなら、アプリが載せないのではなく<strong>端末がそのデバイスを認識できていない</strong>とほぼ断定できます。手早い確認方法：ケーブルを抜き差ししてみてください。Android が「FT8TW を開きますか」と尋ねるはずです。まったく何も起こらなければ、端末からデバイスが見えていません。</li>
      <li><strong>同じケーブルがパソコンでは動くのに端末では動かない。</strong>パソコンの USB-A ポートは常にホスト側で、交渉は要りません。一方スマートフォンは自分で USB ホストモード（OTG）に切り替え、5V を供給する必要があります。もっとも多い失敗が <strong>USB-C 対 USB-C</strong> の接続です。USB-C コネクターを備えた CH340 や CP2102 のボードには 5.1kΩ の CC プルダウン抵抗を省いたものが少なくなく、そうすると端末は「何もつながっていない」と判断してホストモードに入りません。<strong>端末 → USB-C の OTG アダプター（USB-A メス付き）→ 手持ちの USB-A ケーブル → 無線機</strong>の順でつないでください。USB-A→C のケーブルは C プラグ側にその抵抗を持っているため、ボードが省いていてもこの経路なら通ります。「USB Device Info」のようなアプリを入れれば、端末がデバイスを見えているかどうかを直接確認できます。</li>
      <li><strong>「許可」を押したのに何も起きない。</strong>26.0815-2 より前のバージョンには、Android が返してきた許可の結果を捨ててしまう不具合がありました。画面には何の反応もなく、トーストすら出ません。当時の回避策は<strong>一覧の同じデバイスをもう一度タップする</strong>ことでした。26.0815-2 以降は許可が下りた時点で接続するので、2 度目のタップは不要です。</li>
      <li><strong>無線機ではないものが一覧に出る。</strong>26.0815-2 より前は、チップが認識できないものはすべてシリアルポートとして並べていたため、サウンドカードもキーボードも USB メモリーも出てきました。Digirig は「シリアルポート＋サウンドカード」なので 2 行現れ、間違ったほうを選びやすい状態でした。新しいバージョンでは、シリアルポートではありえないオーディオ・HID・ストレージ・ハブの各デバイスを除外します。</li>
      <li><strong>起動時に自動接続しない。</strong>自動接続の条件は<strong>シリアルデバイスがちょうど 1 台</strong>であることです。上記の不具合のせいで Digirig 利用者はこの条件を満たせず、自動接続は黙って働かなくなっていました。26.0815-2 で元に戻っています。実際に 2 台以上のシリアルデバイスをつないでいる場合は、これまでどおり一覧から選んでください。</li>
      <li><strong>抜いても接続中のまま、あるいは挿し直しても再接続しない。</strong>26.0815-2 以降は、使用中のデバイスを抜くと直ちに切断し、挿し直すと 1〜2 秒で再接続します。旧バージョンは次の読み書きが失敗するまでケーブルが無いことに気づかず、それまで画面は接続中のままでした。その古い状態が再接続を妨げていたため、自動再接続がうまくいったりいかなかったりしていたのです。</li>
      <li><strong>デコードできることは USB が通じている証拠になりません。</strong>端末のマイクは無線機のスピーカーの音を平気で拾いますし、その経路に USB は要りません。一手で分かる試し方があります：<strong>USB ケーブルを完全に抜く</strong>こと。それでもデコードが続くなら、音声は最初から音響経由だったということです。これは <strong>(tr)uSDX の audio over CAT</strong> でとくに重要です。このモードの受信音声は<em>CAT リンクそのものをシリアルデータとして</em>流れてきますし、アプリが CAT コマンドを送ってストリームを開始したあとにしか来ません。ポートが開いていなければ音声はありえないので、「テストツールが未接続と言う」ことと「音声は USB で来ている」ことは同時には成り立ちません。</li>
    </ul>`,

  ts_audio_title: 'オーディオデバイスと USB サウンドカード',
  ts_audio_intro: 'USB サウンドカード（Digirig など）の落とし穴は、<strong>アプリが部屋の音を録っていても、デコード画面は動き続け、レベルメーターも振れ続ける</strong>ことです。画面上に手がかりはありません。いま実際にどのデバイスを使っているかを見るには、設定 → <strong>詳細と開発者向け</strong>を開き、「オーディオデバイス」を確認します。状態を示す 1 行と、その下に 6 行の診断項目が並びます。この 6 行はいずれも、こちらが要求した値ではなく、録音オブジェクト自身に尋ねた結果です。',
  ts_audio_fields: `
    <table>
      <tr><th>項目</th><th>読み方</th></tr>
      <tr><td><code>Device type</code></td><td>音声が<strong>いま実際にルーティングされている</strong>デバイス。USB サウンドカードを挿しているのに <code>BUILTIN_MIC</code> と出ていれば、まだ部屋の音を録っています。正常なら <code>USB_DEVICE</code>、<code>USB_HEADSET</code>、<code>USB_ACCESSORY</code> のいずれかです</td></tr>
      <tr><td><code>Sample rate</code></td><td>実際のサンプルレート。システムは要求を無視できますし、USB サウンドカードではよくあります（48k を要求して 44.1k が返る、など）</td></tr>
      <tr><td><code>Channel count</code></td><td>実際のチャンネル数。同様に、モノラルを要求してステレオが返ることはよくあります</td></tr>
      <tr><td><code>Record source</code></td><td>キャプチャーソースの定数。例：<code>MIC</code>、<code>VOICE_RECOGNITION</code>、<code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>システムのブロードキャストが報告する Bluetooth SCO の<strong>実際の</strong>状態</td></tr>
      <tr><td><code>SCO requested</code></td><td>アプリが<strong>要求した</strong>フラグ。<code>requested=true</code> なのに <code>state=DISCONNECTED</code> なら、Bluetooth アダプターが黙ってリンクを切った状態です——この食い違いが手がかりになります</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>状態の行に<strong>「USB オーディオ … を検出しましたが、システムが経路の変更を受け付けず、実際には内蔵マイクから録音しています」</strong>と出ている場合、デバイスは見つかったのに経路が移っていません。まず<strong>再検出</strong>を押してください。それでも変わらなければ、サウンドカードを抜き差しし、ほかのアプリ（ボイスレコーダー、通話中、もう 1 つの FT8TW）がマイクを掴んでいないか確認します。</li>
      <li><strong>抜き差しは自動で切り替わります</strong>（Android 6 以降）。ただし意図的に切り替えない場合が 2 つあります。<strong>ネットワーク無線機</strong>（FlexRadio／ICOM／Xiegu）から音声が来ているときは、切り替えると音源をマイクに奪い返してしまうため、そのままにします。<strong>送信中</strong>は切り替えを保留し、最大 30 秒まで待ちます。前者の場合、再検出を押すと「音声はネットワーク無線機から来ています」とはっきり表示されます。</li>
      <li><strong>録音中と表示されているのに、音声が 1 サンプルも来ない。</strong>26.0815-2 より前は、録音の開始に失敗してもアプリは「録音中」と表示し、タイマーも回り、ログにも「録音を開始しました」と残る一方、音声は永久に来ませんでした。新しいバージョンでは失敗をそのまま報告し、ウォッチドッグも「最初から起動していない」という、以前は救えなかった唯一の死角をカバーします。</li>
      <li>デコード画面に<strong>「⚠ 音声入力がありません」</strong>が出続ける場合はタップしてください。考えられる原因が一覧で示されます：マイクの権限が無い、あるいは他のアプリに掴まれている／音源そのものの問題（ケーブル、無線機の音量、Bluetooth リンク）／同じ端末にもう 1 つ入っている FT8TW がマイクを取っている。</li>
      <li><strong>無線機側の音量がどうしても変えられないとき</strong>は、設定 → 無線機と音声の<strong>受信音声ゲイン</strong>を使います。QMX は USB へ固定レベルで送りますし、ICOM の USB 音量は AF つまみではなくセットメニューの中にあります。</li>
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
      <li>無線機ツール画面の <strong>無線機テストツール</strong> で <strong>PTT Test</strong> を押してみてください。ここで PTT を入れて解除できるなら、PTT の経路そのものは通っており、問題は送信の流れの別の部分にあります。</li>
      <li><strong>Yaesu FTX-1:</strong> USB で送った音声ではなくマイクが拾った音が送信される場合は、無線機の <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> を <strong>USB</strong> に設定してください。工場出荷時は AUTO で、CAT/RTS/DTR 以外で送信を開始するとマイクが使われます。26.0814-2 以降のバージョンでは接続時に自動で設定します。</li>
      <li><strong>WSPR のスケジュール中は FT8／FT4／FT2 の送信がブロックされます</strong>（26.0815-2 以降）。どちらも同じ無線機と同じ音声経路を使いますが、以前は「WSPR を 1 回送る」までの待ち時間に FT8 がスロットごとに送信し続けていました。現在は WSPR を有効にすると先に FT8 の送信をオフにしてお知らせします。逆に WSPR の進行中に FT8 を開始しようとすると、理由の説明とともに止められます。<strong>WSPR が終わっても FT8 は自動では戻りません</strong>——黙って戻すと、誰も予期しない送信が 1 回発生してしまうためです。</li>
      <li><strong>送信が勝手に止まり、CQ にも戻らない。</strong>相手を<strong>左スワイプ</strong>で選んでいないか確認してください。左スワイプは「この 1 局だけを呼ぶ」という意味です。その時点で送信がオフだった場合、アプリは単発交信モードに入り、その交信が終わると送信を止め、その間はほかから呼ばれても応じません。動かし続けたいときは、スワイプの前に送信をオンにするか、タップで相手を選んでください。</li>
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
      <li>Bluetooth の音声が黙って切れた疑いがあるときは、設定 → <strong>詳細と開発者向け</strong>で「オーディオデバイス」の <code>SCO state</code> と <code>SCO requested</code> の 2 行を見てください。<code>requested=true</code> なのに <code>state=DISCONNECTED</code> なら、リンクはすでに切れているのにアプリはつながっていると思い込んでいる状態です。</li>
    </ul>`,

  ts_report_title: '問題を報告するときに添えていただきたい情報',
  ts_report_intro: '設定画面のいちばん下にある<strong>報告</strong>ボタンから、問題報告ページ（<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>）を直接開けます。下の 1 と 2 はほぼ必ず必要です。バージョン番号がないと、すでに修正済みの問題かどうか判断できませんし、同じ日に複数のバージョンを公開することもあるため「最新版」だけでは特定できません。それ以外は問題の種類に応じて添えてください。',
  ts_report_list: `
    <ol>
      <li><strong>バージョン番号。</strong>アプリ起動時のスプラッシュ画面に表示されます。ヘルプ（<strong>?</strong>）ダイアログの右上にも出ます。<strong>末尾の枝番も含めて</strong>そのまま書き写してください（例：<code>26.0815-2</code>）。同じ日の 2 つのバージョンは中身が違うので、<code>-2</code> を落とすと別のバージョンを指してしまいます。</li>
      <li><strong>エラーメッセージ（Debug 画面）。</strong>設定画面のいちばん下の <strong>Debug</strong> ボタンで「最後のエラーメッセージ」画面が開きます。上半分は<strong>実行時の異常診断</strong>（<code>Runtime diagnostics</code>）——デコードが黙って止まる、録音スレッドが死ぬ、デコードロックがタイムアウトするといった、<em>クラッシュもせず画面にも何も出ない</em>不具合は、ここでしか分かりません。下半分は最後のクラッシュの完全な記録で、そのときのバージョンと稼働時間も含みます。<strong>Copy Error Message</strong> を押せば全体がクリップボードに入るので、そのまま貼り付けてください。<code>No issues detected.</code> としか出ていなくても、それ自体が有用な情報です。報告の内容は表示言語に関わらず常に英語です——どの国からの報告でも読めるようにするためです。</li>
      <li><strong>端末の機種と Android のバージョン</strong>、それに<strong>無線機の機種</strong>と<strong>接続方式</strong>（VOX／USB／Bluetooth／ネットワーク）。</li>
      <li><strong>無線機につながらない、CAT が反応しないとき</strong>：無線機ツール画面の <strong>無線機テストツール</strong> の応答ウィンドウの内容を添えてください（このウィンドウには<strong>コピー</strong>ボタンがあります）。送ったコマンドと返ってきた内容が 1 行ずつ並ぶので、「コマンドが出ていない」「無線機が返さない」「返っているが形式が違う」のどれなのかがたいてい一目で分かります。</li>
      <li><strong>デコードできない、音声が来ないとき</strong>：設定 → <strong>詳細と開発者向け</strong>の「オーディオデバイス」の状態表示と 6 行の診断項目を、スクリーンショットで添えてください。</li>
      <li><strong>表示やウォーターフォールに関すること</strong>：ウォーターフォール調整パネルの<strong>診断情報をコピー</strong>で、現在のレベルやゲインなどの内部値がクリップボードに入ります。</li>
    </ol>`,
  ts_report_note: 'Debug 画面の内容がどこかへ自動的に送られることはありません。あなたがコピーして自分で貼り付けたときにだけ、端末の外に出ます。',
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
      <li><strong>Пока вы находитесь на экране WSPR, JS8 или инструментов трансивера, ничего не декодируется.</strong> Так задумано (с 26.0817): все три экрана занимают один и тот же трансивер и один и тот же звуковой тракт, поэтому декодирование FT8 на это время приостанавливается и возобновляется, когда вы уходите. Единственный случай, когда оно не возобновляется само, — оставленный включённым JS8: он продолжает работать в фоне на своей частоте, так что выключите его и вернитесь на вкладку декодирования.</li>
      <li>Если звук не приходит вовсе или есть подозрение, что записывается комната, а не трансивер (чаще всего со звуковой картой USB или Bluetooth), см. ниже раздел <strong>«Аудиоустройство и звуковые карты USB»</strong>: там описано, как узнать реальный источник записи.</li>
    </ul>`,

  ts_noconn_title: 'Не удаётся подключиться к трансиверу',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> убедитесь, что устройство поддерживает USB OTG. Разрешите доступ к USB-устройству по запросу Android. Попробуйте другой переходник OTG или кабель.</li>
      <li>Проверьте, что <strong>модель трансивера</strong> и <strong>скорость передачи</strong> соответствуют настройкам CAT в аппарате.</li>
      <li>Для ICOM: проверьте, что <strong>адрес CI-V</strong> совпадает с настройкой в меню аппарата (часто 0x94 или 0xA4).</li>
      <li><strong>Bluetooth:</strong> выполните сопряжение адаптера в настройках Bluetooth Android до выбора его в FT8TW. Убедитесь, что адаптер запитан и находится в зоне действия.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> проверьте, что телефон и трансивер в одной сети, и сверьте IP-адрес и номер порта.</li>
      <li>Если всё перечисленное проверено, а отклика нет, воспользуйтесь разделом <strong>Тестер трансивера</strong> внизу страницы инструментов трансивера и проверьте по пунктам: <strong>Read Freq</strong> покажет, отвечает ли трансивер, а <strong>PTT Test</strong> — удаётся ли перейти на передачу. В окне ответов отправленные команды и полученные ответы выводятся дословно, поэтому сразу видно, что именно произошло: команда не ушла, ушла но ответа нет, или ответ пришёл в другом формате. Подробнее см. <a href="ssb.html">«Инструменты трансивера»</a>.</li>
      <li>Если подключение по USB, а тестовая утилита говорит, что <strong>трансивер не подключён</strong>, прочитайте следующий раздел: смысл этой фразы гораздо уже, чем кажется.</li>
    </ul>`,

  ts_usb_title: 'USB-подключение (управление CAT)',
  ts_usb_intro: 'Разделяйте два пути. <strong>Управление CAT</strong> идёт через USB-порт и определяет, может ли приложение читать и задавать частоту и нажимать PTT. <strong>Звук</strong> идёт по другому пути и определяет, что слышит декодер. Они независимы: одно вполне может работать, когда другое — нет. Если Тестер трансивера сообщает, что <strong>трансивер не подключён</strong>, это означает ровно одно: <strong>последовательный порт так и не был открыт</strong>. Скорость, биты данных, чётность, модель трансивера и способ PTT <em>здесь вообще ни при чём</em> — до открытия порта очередь до них не доходит. Поэтому, увидев это сообщение, идите по списку ниже, а не возвращайтесь к настройкам CAT.',
  ts_usb_list: `
    <ul>
      <li><strong>Список USB-устройств вообще не появляется на главном экране.</strong> Он показывается над экраном декодирования только тогда, когда последовательное устройство обнаружено, тип подключения — USB, а трансивер ещё не подключён. В списке — то, о чём сообщает Android, и для строки <strong>не нужны ни разрешение, ни распознанная микросхема</strong>. Значит, если список не появляется никогда, телефон почти наверняка <strong>вообще не видит устройство</strong>, а не приложение отказывается его показывать. Быстрая проверка: отсоедините и вставьте кабель снова. Android должен предложить «Открыть FT8TW». Если не происходит вообще ничего — телефон устройство не видит.</li>
      <li><strong>Тот же кабель работает на компьютере, но не на телефоне.</strong> Порт USB-A компьютера всегда хост и ни о чём не договаривается; телефон же должен сам перейти в режим USB-хоста (OTG) и подать 5 В. Чаще всего подводит соединение <strong>USB-C — USB-C</strong>: на многих платах CH340 и CP2102 с разъёмом USB-C нет подтягивающих резисторов CC на 5,1 кОм, поэтому телефон решает, что ничего не подключено, и в режим хоста не переходит. Соберите цепочку <strong>телефон → переходник USB-C OTG (с гнездом USB-A) → ваш обычный кабель USB-A → трансивер</strong>: в вилке C кабеля USB-A→C такой резистор есть, поэтому этот путь работает даже с платами, где его сэкономили. Приложение вроде «USB Device Info» тоже прямо покажет, видит ли телефон устройство.</li>
      <li><strong>Вы нажали «Разрешить», и ничего не произошло.</strong> В версиях до 26.0815-2 была ошибка: результат выдачи разрешения, который возвращал Android, терялся — на экране никакой реакции, даже уведомления. Обходной приём состоял в том, чтобы <strong>нажать то же устройство в списке второй раз</strong>. Начиная с 26.0815-2 приложение подключается сразу после выдачи разрешения, второе нажатие больше не нужно.</li>
      <li><strong>В списке появляются устройства, которые трансиверами не являются.</strong> До 26.0815-2 всё, чью микросхему не удавалось распознать, показывалось как последовательный порт, поэтому в списке оказывались звуковые карты, клавиатуры и флешки. Digirig — это последовательный порт плюс звуковая карта, поэтому он давал две строки, и промахнуться было легко. Новые версии отфильтровывают аудио-, HID-, накопительные и хаб-устройства, которые последовательными портами быть не могут.</li>
      <li><strong>Нет автоматического подключения при запуске.</strong> Для него нужно, чтобы последовательное устройство было <strong>ровно одно</strong>. Из-за ошибки выше владельцы Digirig это условие выполнить не могли, и автоподключение тихо перестало работать; в 26.0815-2 оно восстановлено. Если у вас действительно подключены два и более последовательных устройства, выбирать по-прежнему нужно вручную.</li>
      <li><strong>После отсоединения по-прежнему «подключено» или не подключается снова при обратном подключении.</strong> С 26.0815-2 отсоединение используемого устройства сразу разрывает связь, а обратное подключение восстанавливает её через секунду-другую. Старые версии замечали пропажу кабеля лишь при следующей неудачной операции чтения или записи; до того экран показывал «подключено», и это устаревшее состояние мешало переподключению — отсюда и былая ненадёжность автоматического восстановления связи.</li>
      <li><strong>Успешное декодирование не доказывает, что USB работает.</strong> Микрофон телефона прекрасно слышит динамик трансивера, и для этого пути USB не нужен вовсе. Есть проверка в одно действие: <strong>полностью выньте кабель USB</strong>. Если декодирование продолжается, звук всё это время шёл по воздуху. Особенно это важно для <strong>(tr)uSDX с audio over CAT</strong>: там принимаемый звук приходит <em>последовательными данными по самому каналу CAT</em>, и только после того, как приложение отправит трансиверу команду CAT на запуск потока. При закрытом порте звука быть не может, поэтому «тестовая утилита говорит, что не подключено» и «звук идёт по USB» одновременно истинными быть не могут.</li>
    </ul>`,

  ts_audio_title: 'Аудиоустройство и звуковые карты USB',
  ts_audio_intro: 'Ловушка звуковой карты USB (например, Digirig) в том, что <strong>экран декодирования продолжает работать, а индикатор уровня — двигаться, даже когда приложение записывает комнату</strong>. На экране это ничем не выдаётся. Чтобы увидеть, какое устройство используется на самом деле, откройте Настройки → <strong>Дополнительно и для разработчиков</strong> и посмотрите «Аудиоустройство»: одна строка состояния и следом шесть строк диагностики. Все шесть спрашивают сам рекордер, а не повторяют то, что мы запросили.',
  ts_audio_fields: `
    <table>
      <tr><th>Поле</th><th>Как читать</th></tr>
      <tr><td><code>Device type</code></td><td>Устройство, на которое звук <strong>реально направлен прямо сейчас</strong>. Если при подключённой карте USB здесь <code>BUILTIN_MIC</code>, значит записывается комната; должно быть <code>USB_DEVICE</code>, <code>USB_HEADSET</code> или <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>Фактическая частота дискретизации. Система вправе не выполнить запрос, и звуковые карты USB часто так и делают (запрошено 48k, выдано 44,1k)</td></tr>
      <tr><td><code>Channel count</code></td><td>Фактическое число каналов — то же самое (запрошено моно, выдано стерео — обычное дело)</td></tr>
      <tr><td><code>Record source</code></td><td>Константа источника захвата, например <code>MIC</code>, <code>VOICE_RECOGNITION</code>, <code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td><strong>Реальное</strong> состояние Bluetooth SCO по данным системной рассылки</td></tr>
      <tr><td><code>SCO requested</code></td><td>Флаг, который <strong>запросило</strong> приложение. <code>requested=true</code> при <code>state=DISCONNECTED</code> — это адаптер Bluetooth, который тихо разорвал канал; подсказкой служит само расхождение</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>Если в строке состояния написано <strong>«Найдено USB-аудио …, но система не приняла запрос на маршрутизацию; запись по-прежнему идёт со встроенного микрофона»</strong>, устройство найдено, а маршрут не переключился. Сначала нажмите <strong>Определить заново</strong>; если не помогло, отсоедините и подключите звуковую карту снова и убедитесь, что микрофон не занят другим приложением (диктофоном, идущим вызовом, второй копией FT8TW).</li>
      <li><strong>Подключение и отсоединение переключаются автоматически</strong> (Android 6 и новее), с двумя намеренными исключениями: звук от <strong>сетевого трансивера</strong> (FlexRadio / ICOM / Xiegu) не трогается, иначе источник отобрали бы обратно микрофону; и <strong>во время передачи</strong> переключение откладывается — не более чем на 30 секунд. В первом случае нажатие «Определить заново» прямо сообщит, что звук идёт от сетевого трансивера.</li>
      <li><strong>Пишет, что идёт запись, но не приходит ни одного отсчёта.</strong> До 26.0815-2, если рекордер не запускался, приложение всё равно показывало «запись», таймер шёл, и в журнале даже значилось, что запись началась, а звук так и не появлялся. Новые версии сообщают об отказе, и сторожевой механизм теперь закрывает единственный случай, который раньше пропускал: рекордер, который вообще не стартовал.</li>
      <li>Если на экране декодирования постоянно висит <strong>⚠ Нет входного звука</strong>, нажмите на него — приложение перечислит вероятные причины: нет разрешения на микрофон или он занят другим приложением; проблема с самим источником (кабель, громкость трансивера, канал Bluetooth); либо на этом же телефоне стоит вторая копия FT8TW, забравшая микрофон.</li>
      <li><strong>Когда выходной уровень самого трансивера изменить нельзя</strong>, используйте <strong>Усиление принимаемого звука</strong> в Настройки → Трансивер и звук. QMX отдаёт по USB фиксированный уровень, а у аппаратов ICOM громкость USB живёт в меню настроек, а не на ручке AF.</li>
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
      <li>Нажмите <strong>PTT Test</strong> в разделе <strong>Тестер трансивера</strong> на странице инструментов трансивера: если PTT там включается и выключается нормально, сам путь PTT исправен, и причина лежит в другой части процесса передачи.</li>
      <li><strong>Yaesu FTX-1:</strong> если трансивер передаёт звук с микрофона вместо аудио, отправленного по USB, установите на трансивере <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> в <strong>USB</strong>. Заводское значение — AUTO: микрофон используется всегда, когда передача начата не по CAT/RTS/DTR. Версия 26.0814-2 и новее устанавливает это автоматически при подключении.</li>
      <li><strong>Запланированная передача WSPR блокирует передачу FT8/FT4/FT2</strong> (с 26.0815-2). Оба используют один трансивер и один звуковой тракт, а раньше в паузах, пока WSPR ждал чётной минуты UTC, FT8 продолжал передавать интервал за интервалом. Теперь включение WSPR сначала выключает передачу FT8 и сообщает об этом; и наоборот, запуск FT8 во время сеанса WSPR блокируется с пояснением. <strong>После завершения WSPR передача FT8 обратно не включается</strong> — намеренно, потому что тихое восстановление породило бы неожиданную передачу.</li>
      <li><strong>Передача прекратилась сама и не вернулась к вызову CQ.</strong> Проверьте, не выбрали ли вы станцию <strong>свайпом влево</strong>. Свайп влево означает «вызвать только эту станцию»: если в тот момент передача была выключена, приложение переходит в режим одиночной связи, прекращает передачу по её завершении и в это время не отвечает другим вызывающим вас станциям. Чтобы работа продолжалась, включите передачу до свайпа или выбирайте станцию нажатием.</li>
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
      <li>Если есть подозрение, что звук Bluetooth тихо пропал, откройте Настройки → <strong>Дополнительно и для разработчиков</strong> и посмотрите в «Аудиоустройстве» строки <code>SCO state</code> и <code>SCO requested</code>: <code>requested=true</code> при <code>state=DISCONNECTED</code> — это ровно тот случай, когда канал уже разорван, а приложение всё ещё считает его живым.</li>
    </ul>`,

  ts_report_title: 'Что приложить к сообщению о проблеме',
  ts_report_intro: 'Кнопка <strong>Сообщить</strong> в самом низу экрана настроек открывает страницу сообщений о проблемах (<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>). Пункты 1 и 2 ниже нужны почти всегда: без номера версии невозможно понять, не исправлена ли ваша проблема уже, а в один день может выйти не одна версия, поэтому «последняя версия» ничего не уточняет. Остальное прикладывайте по характеру проблемы.',
  ts_report_list: `
    <ol>
      <li><strong>Номер версии.</strong> Он есть на заставке при запуске приложения, а также в правом верхнем углу любого справочного диалога (<strong>?</strong>). Перепишите его полностью, <strong>вместе с суффиксом</strong> (например, <code>26.0815-2</code>): две версии одного дня различаются по содержимому, и пропущенное <code>-2</code> может указать не на ту.</li>
      <li><strong>Сообщение об ошибке (экран Debug).</strong> Кнопка <strong>Debug</strong> в самом низу настроек открывает экран «Последнее сообщение об ошибке». Верхняя половина — <strong>диагностика ошибок времени выполнения</strong> (<code>Runtime diagnostics</code>): молчаливая остановка декодирования, гибель потока записи, тайм-аут блокировки декодера — сбои, которые <em>не приводят к аварийному завершению и никак не показываются на экране</em>, видны только здесь. Нижняя половина — полная запись последнего сбоя вместе с версией и временем работы. Кнопка <strong>Copy Error Message</strong> копирует всё в буфер обмена — просто вставьте это в сообщение. Даже если там только <code>No issues detected.</code>, это тоже полезные сведения. Текст отчёта всегда на английском и не зависит от языка интерфейса — чтобы мы могли прочитать сообщение из любой страны.</li>
      <li><strong>Модель телефона и версия Android</strong>, а также <strong>модель трансивера</strong> и <strong>способ подключения</strong> (VOX / USB / Bluetooth / сеть).</li>
      <li><strong>Если трансивер не подключается или CAT не отвечает</strong>: приложите содержимое окна ответов <strong>Тестер трансивера</strong> на экране инструментов трансивера (в этом окне есть кнопка <strong>копирования</strong>). Там построчно видны отправленные команды и полученные ответы, поэтому обычно сразу понятно, что именно происходит: команда не ушла, трансивер не отвечает или отвечает, но в другом формате.</li>
      <li><strong>Если нет декодирования или не приходит звук</strong>: приложите строку состояния и шесть строк диагностики из раздела «Аудиоустройство» в Настройки → <strong>Дополнительно и для разработчиков</strong> — достаточно снимка экрана.</li>
      <li><strong>Если вопрос об отображении или водопаде</strong>: кнопка <strong>Скопировать диагностику</strong> в панели настройки водопада копирует в буфер обмена текущие уровни, усиление и другие внутренние значения.</li>
    </ol>`,
  ts_report_note: 'Содержимое экрана Debug никуда не отправляется автоматически: оно покидает телефон только тогда, когда вы скопируете его и вставите сами.',
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
      <li><strong>Dopóki jesteś na ekranie WSPR, JS8 albo narzędzi radia, nic się nie dekoduje.</strong> Tak ma być (od 26.0817): wszystkie trzy zajmują to samo radio i tę samą ścieżkę dźwiękową, więc dekodowanie FT8 jest na ten czas wstrzymywane i wraca, gdy stamtąd wyjdziesz. Jedyny przypadek, gdy nie wraca samo, to pozostawiony włączony JS8 — pracuje on dalej w tle na własnej częstotliwości, więc wyłącz go i wróć na zakładkę dekodowania.</li>
      <li>Jeśli dźwięk nie przychodzi wcale albo podejrzewasz, że nagrywane jest pomieszczenie zamiast radia (najczęściej przy karcie dźwiękowej USB lub Bluetooth), zajrzyj niżej do sekcji <strong>„Urządzenie audio i karty dźwiękowe USB"</strong> — jest tam sposób na ustalenie rzeczywistego źródła nagrania.</li>
    </ul>`,

  ts_noconn_title: 'Nie można połączyć się z radiem',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> sprawdź, czy urządzenie obsługuje USB OTG. Zezwól na dostęp do urządzenia USB, gdy Android o to poprosi. Spróbuj innej przejściówki OTG lub kabla.</li>
      <li>Sprawdź, czy <strong>model radia</strong> i <strong>prędkość transmisji</strong> odpowiadają ustawieniom CAT w radiu.</li>
      <li>W radiach ICOM sprawdź, czy <strong>adres CI-V</strong> zgadza się z ustawieniem w menu (często 0x94 lub 0xA4).</li>
      <li><strong>Bluetooth:</strong> sparuj adapter w ustawieniach Bluetooth Androida, zanim wybierzesz go w FT8TW. Upewnij się, że adapter ma zasilanie i jest w zasięgu.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> sprawdź, czy telefon i radio są w tej samej sieci, oraz zweryfikuj adres IP i numer portu.</li>
      <li>Jeśli wszystko powyższe zostało sprawdzone, a radio nadal nie reaguje, użyj sekcji <strong>Narzędzie testowe radia</strong> na dole strony narzędzi radia i sprawdź po kolei: <strong>Read Freq</strong> pokaże, czy radio odpowiada, a <strong>PTT Test</strong> — czy da się przejść na nadawanie. W oknie odpowiedzi wysłane polecenia i otrzymane odpowiedzi pojawiają się dosłownie, więc od razu widać, czy polecenie nie wyszło, wyszło ale nie ma odpowiedzi, czy odpowiedź przyszła w innym formacie. Zobacz <a href="ssb.html">„Narzędzia radia”</a>.</li>
      <li>Jeśli łączysz się przez USB, a narzędzie testowe mówi, że <strong>radio nie jest połączone</strong>, przeczytaj następną sekcję — to zdanie znaczy znacznie mniej, niż się wydaje.</li>
    </ul>`,

  ts_usb_title: 'Połączenie USB (sterowanie CAT)',
  ts_usb_intro: 'Trzeba rozdzielić dwie drogi. <strong>Sterowanie CAT</strong> idzie przez port szeregowy USB i decyduje, czy aplikacja może odczytywać i ustawiać częstotliwość oraz włączać PTT. <strong>Dźwięk</strong> idzie inną drogą i decyduje o tym, co słyszy dekoder. Są od siebie niezależne — jedno może działać, gdy drugie nie. Gdy Narzędzie testowe radia mówi, że <strong>radio nie jest połączone</strong>, znaczy to dokładnie jedno: <strong>port szeregowy nigdy nie został otwarty</strong>. Prędkość transmisji, bity danych, parzystość, model radia i sposób PTT <em>nie mają tu nic do rzeczy</em> — zanim port się otworzy, żadne z nich nie wchodzi do gry. Widząc ten komunikat, przejdź więc poniższą listę, zamiast wracać do ustawień CAT.',
  ts_usb_list: `
    <ul>
      <li><strong>Na ekranie głównym w ogóle nie pojawia się lista urządzeń USB.</strong> Lista wyświetla się nad ekranem dekodowania tylko wtedy, gdy wykryto urządzenie szeregowe, typ połączenia to USB, a radio nie jest jeszcze połączone. Zawiera to, co zgłasza Android, i do pokazania pozycji <strong>nie potrzebuje ani uprawnienia, ani rozpoznanego układu</strong> — jeśli więc lista nigdy się nie pojawia, telefon niemal na pewno <strong>w ogóle nie wykrywa urządzenia</strong>, a nie aplikacja odmawia jego pokazania. Szybkie sprawdzenie: odłącz i podłącz kabel ponownie. Android powinien zaproponować „Otwórz FT8TW". Jeśli nie dzieje się absolutnie nic, telefon nie widzi urządzenia.</li>
      <li><strong>Ten sam kabel działa na komputerze, ale nie w telefonie.</strong> Port USB-A komputera zawsze jest hostem i niczego nie negocjuje; telefon musi sam przejść w tryb hosta USB (OTG) i podać 5 V. Najczęstsza przyczyna to połączenie <strong>USB-C do USB-C</strong>: wiele płytek CH340 i CP2102 z gniazdem USB-C nie ma rezystorów podciągających CC 5,1 kΩ, więc telefon uznaje, że nic nie jest podłączone, i nie wchodzi w tryb hosta. Zbuduj zamiast tego łańcuch <strong>telefon → przejściówka USB-C OTG (z gniazdem USB-A) → twój dotychczasowy kabel USB-A → radio</strong>; kabel USB-A→C ma ten rezystor we wtyku C, dzięki czemu ta droga działa nawet z płytkami, w których go pominięto. Aplikacja typu „USB Device Info" również powie wprost, czy telefon widzi urządzenie.</li>
      <li><strong>Nacisnąłeś „Zezwól" i nic się nie stało.</strong> Wersje przed 26.0815-2 miały błąd, który gubił wynik uprawnienia odsyłany przez Androida: żadnej reakcji na ekranie, nawet komunikatu. Obejściem było <strong>naciśnięcie tego samego urządzenia na liście po raz drugi</strong>. Od 26.0815-2 aplikacja łączy się od razu po przyznaniu uprawnienia, więc drugie naciśnięcie nie jest już potrzebne.</li>
      <li><strong>Na liście pojawiają się urządzenia, które nie są radiem.</strong> Przed 26.0815-2 wszystko, czego układu nie rozpoznano, trafiało na listę jako port szeregowy, więc pokazywały się karty dźwiękowe, klawiatury i pendrive'y. Digirig, będący portem szeregowym plus kartą dźwiękową, dawał dwie pozycje i łatwo było wybrać niewłaściwą. Nowsze wersje odfiltrowują urządzenia audio, HID, pamięci masowe i huby, które portami szeregowymi być nie mogą.</li>
      <li><strong>Brak automatycznego połączenia przy starcie.</strong> Automatyczne połączenie wymaga, by urządzenie szeregowe było <strong>dokładnie jedno</strong>. Przez powyższy błąd użytkownicy Digiriga nigdy nie spełniali tego warunku, więc automatyczne łączenie po cichu przestało działać; 26.0815-2 je przywraca. Jeśli naprawdę masz podłączone dwa lub więcej urządzeń szeregowych, nadal musisz wybrać jedno z listy.</li>
      <li><strong>Po odłączeniu nadal pokazuje połączenie albo nie łączy się ponownie po podłączeniu.</strong> Od 26.0815-2 odłączenie używanego urządzenia natychmiast rozłącza radio, a ponowne podłączenie przywraca połączenie po sekundzie lub dwóch. Starsze wersje zauważały brak kabla dopiero przy nieudanym odczycie lub zapisie; do tego czasu ekran nadal pokazywał połączenie, a ten nieaktualny stan blokował ponowne łączenie — stąd dawna zawodność automatycznego przywracania połączenia.</li>
      <li><strong>Udane dekodowanie nie dowodzi, że USB działa.</strong> Mikrofon telefonu bez trudu wychwytuje dźwięk z głośnika radia, a ta droga nie potrzebuje USB w ogóle. Jest test w jednym ruchu: <strong>wyjmij kabel USB całkowicie</strong>. Jeśli dekodowanie trwa dalej, dźwięk przez cały czas szedł akustycznie. Najbardziej liczy się to przy <strong>(tr)uSDX z audio over CAT</strong>: w tym trybie dźwięk odbioru przychodzi <em>jako dane szeregowe po samym łączu CAT</em> i dopiero po tym, jak aplikacja wyśle radiu polecenie CAT uruchamiające strumień. Przy zamkniętym porcie dźwięku być nie może, więc „narzędzie testowe mówi, że nie połączono" i „dźwięk idzie po USB" nie mogą być prawdziwe jednocześnie.</li>
    </ul>`,

  ts_audio_title: 'Urządzenie audio i karty dźwiękowe USB',
  ts_audio_intro: 'Pułapka karty dźwiękowej USB (na przykład Digiriga) polega na tym, że <strong>ekran dekodowania działa dalej, a wskaźnik poziomu nadal się rusza, nawet gdy aplikacja nagrywa pomieszczenie</strong>. Nic na ekranie tego nie zdradza. Aby zobaczyć, które urządzenie jest naprawdę używane, otwórz Ustawienia → <strong>Zaawansowane i dla deweloperów</strong> i spójrz na „Urządzenie audio": jedna linia stanu, a pod nią sześć pól diagnostycznych. Wszystkie sześć pytają sam rejestrator, zamiast powtarzać wartości, o które prosiliśmy.',
  ts_audio_fields: `
    <table>
      <tr><th>Pole</th><th>Jak czytać</th></tr>
      <tr><td><code>Device type</code></td><td>Urządzenie, do którego dźwięk jest <strong>faktycznie skierowany w tej chwili</strong>. Karta USB podłączona, a tu <code>BUILTIN_MIC</code> — nagrywane jest pomieszczenie; powinno być <code>USB_DEVICE</code>, <code>USB_HEADSET</code> albo <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>Rzeczywista częstotliwość próbkowania. System może zignorować to, o co prosiliśmy, a karty USB często to robią (prośba o 48k, dostarczone 44,1k)</td></tr>
      <tr><td><code>Channel count</code></td><td>Rzeczywista liczba kanałów, tak samo (prośba o mono, dostarczone stereo to częsty przypadek)</td></tr>
      <tr><td><code>Record source</code></td><td>Stała źródła przechwytywania, np. <code>MIC</code>, <code>VOICE_RECOGNITION</code>, <code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td><strong>Rzeczywisty</strong> stan Bluetooth SCO zgłaszany przez rozgłoszenie systemowe</td></tr>
      <tr><td><code>SCO requested</code></td><td>Flaga, o którą aplikacja <strong>prosiła</strong>. <code>requested=true</code> przy <code>state=DISCONNECTED</code> to adapter Bluetooth, który po cichu zerwał łącze — wskazówką jest sama rozbieżność</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>Jeśli w linii stanu widnieje <strong>„Znaleziono audio USB …, ale system nie przyjął żądania przekierowania; nagrywanie nadal z mikrofonu wbudowanego"</strong>, urządzenie zostało znalezione, ale przekierowanie nie nastąpiło. Naciśnij najpierw <strong>Wykryj ponownie</strong>; jeśli to nie pomoże, odłącz i podłącz kartę dźwiękową i upewnij się, że mikrofonu nie trzyma inna aplikacja (dyktafon, trwające połączenie, druga kopia FT8TW).</li>
      <li><strong>Podłączanie i odłączanie przełącza się automatycznie</strong> (Android 6 i nowszy), z dwoma celowymi wyjątkami: dźwięku z <strong>radia sieciowego</strong> (FlexRadio / ICOM / Xiegu) się nie rusza, bo inaczej źródło zostałoby odebrane z powrotem mikrofonowi; a <strong>w trakcie nadawania</strong> przełączenie jest odraczane, maksymalnie o 30 sekund. W pierwszym przypadku naciśnięcie „Wykryj ponownie" wprost informuje, że dźwięk pochodzi z radia sieciowego.</li>
      <li><strong>Pisze, że nagrywa, a nie przychodzi ani jedna próbka.</strong> Przed 26.0815-2, jeśli rejestrator nie wystartował, aplikacja i tak pokazywała „nagrywanie", zegar szedł, a w logu widniało nawet, że nagrywanie się zaczęło, podczas gdy dźwięk nigdy nie przychodził. Nowsze wersje zgłaszają niepowodzenie, a nadzorca obejmuje teraz również ten jedyny przypadek, którego wcześniej nie łapał: rejestrator, który w ogóle nie wystartował.</li>
      <li>Jeśli na ekranie dekodowania stale widnieje <strong>⚠ Brak sygnału audio</strong>, dotknij go — aplikacja wypisze prawdopodobne przyczyny: brak uprawnienia do mikrofonu albo mikrofon zajęty przez inną aplikację, problem z samym źródłem dźwięku (kabel, głośność radia, łącze Bluetooth) lub druga kopia FT8TW na tym samym telefonie, która przejęła mikrofon.</li>
      <li><strong>Gdy poziomu wyjścia samego radia nie da się zmienić</strong>, użyj <strong>Wzmocnienia dźwięku odbioru</strong> w Ustawienia → Radio i dźwięk. QMX podaje przez USB stały poziom, a w radiach ICOM głośność USB znajduje się w menu ustawień, nie na gałce AF.</li>
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
      <li>Naciśnij <strong>PTT Test</strong> w sekcji <strong>Narzędzie testowe radia</strong> na stronie narzędzi radia: jeśli PTT włącza się i zwalnia prawidłowo, sama ścieżka PTT jest sprawna, a przyczyna leży w innym miejscu procesu nadawania.</li>
      <li><strong>Yaesu FTX-1:</strong> jeśli radio nadaje dźwięk z mikrofonu zamiast dźwięku wysłanego przez USB, ustaw w radiu <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> na <strong>USB</strong>. Wartość fabryczna to AUTO, przy której mikrofon jest używany zawsze, gdy nadawanie nie zostało uruchomione przez CAT/RTS/DTR. Wersja 26.0814-2 i nowsze ustawiają to automatycznie po połączeniu.</li>
      <li><strong>Trwające nadawanie WSPR blokuje nadawanie FT8/FT4/FT2</strong> (od 26.0815-2). Oba korzystają z jednego radia i jednej ścieżki dźwiękowej, a wcześniej w przerwach, gdy WSPR czekał na parzystą minutę UTC, FT8 nadawał slot po slocie. Teraz włączenie WSPR najpierw wyłącza nadawanie FT8 i informuje o tym; odwrotnie, uruchomienie FT8 w trakcie sesji WSPR jest blokowane z wyjaśnieniem. <strong>Po zakończeniu WSPR nadawanie FT8 nie włącza się z powrotem</strong> — celowo, bo ciche przywrócenie wywołałoby niespodziewane nadawanie.</li>
      <li><strong>Nadawanie zatrzymało się samo i nie wróciło do wywoływania CQ.</strong> Sprawdź, czy stacja nie została wybrana <strong>przesunięciem w lewo</strong>. Przesunięcie w lewo znaczy „wywołaj tylko tę stację": jeśli w tym momencie nadawanie było wyłączone, aplikacja przechodzi w tryb pojedynczej łączności, kończy nadawanie po jej zakończeniu i w tym czasie nie odpowiada innym stacjom, które cię wołają. Aby praca trwała dalej, włącz nadawanie przed przesunięciem albo wybierz stację dotknięciem.</li>
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
      <li>Jeśli podejrzewasz, że dźwięk Bluetooth po cichu się urwał, wejdź w Ustawienia → <strong>Zaawansowane i dla deweloperów</strong> i zobacz w „Urządzeniu audio" wiersze <code>SCO state</code> i <code>SCO requested</code>: <code>requested=true</code> przy <code>state=DISCONNECTED</code> to dokładnie ten stan, w którym łącze już padło, a aplikacja wciąż uważa je za czynne.</li>
    </ul>`,

  ts_report_title: 'Co dołączyć, zgłaszając problem',
  ts_report_intro: 'Przycisk <strong>Zgłoś</strong> na samym dole ekranu ustawień otwiera bezpośrednio stronę zgłoszeń (<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>). Punkty 1 i 2 poniżej przydają się niemal zawsze: bez numeru wersji nie da się ocenić, czy trafiłeś na problem już naprawiony, a jednego dnia może ukazać się więcej niż jedna wersja, więc samo „najnowsza" niczego nie identyfikuje. Resztę dołącz zależnie od rodzaju problemu.',
  ts_report_list: `
    <ol>
      <li><strong>Numer wersji.</strong> Jest na ekranie powitalnym przy uruchamianiu aplikacji, a także w prawym górnym rogu każdego okna pomocy (<strong>?</strong>). Przepisz go w całości, <strong>razem z końcówką</strong> (na przykład <code>26.0815-2</code>) — dwie wersje z tego samego dnia różnią się zawartością, a pominięcie <code>-2</code> może wskazać niewłaściwą.</li>
      <li><strong>Komunikat błędu (ekran Debug).</strong> Przycisk <strong>Debug</strong> na samym dole ustawień otwiera ekran „Ostatni komunikat błędu". Górna połowa to <strong>diagnostyka błędów czasu wykonania</strong> (<code>Runtime diagnostics</code>) — ciche zatrzymanie dekodowania, śmierć wątku nagrywania, przekroczenie czasu blokady dekodera: awarie, które <em>nie powodują wysypania się aplikacji ani żadnego komunikatu na ekranie</em>, widać wyłącznie tutaj. Dolna połowa to pełny zapis ostatniej awarii wraz z ówczesną wersją i czasem działania. Przycisk <strong>Copy Error Message</strong> kopiuje całość do schowka — wystarczy wkleić. Nawet jeśli widnieje tam tylko <code>No issues detected.</code>, to również jest użyteczna informacja. Treść raportu jest zawsze po angielsku, niezależnie od języka interfejsu — dzięki temu przeczytamy zgłoszenie z każdego kraju.</li>
      <li><strong>Model telefonu i wersja Androida</strong>, a także <strong>model radia</strong> i <strong>sposób połączenia</strong> (VOX / USB / Bluetooth / sieć).</li>
      <li><strong>Gdy radio się nie łączy albo CAT nie odpowiada</strong>: dołącz zawartość okna odpowiedzi <strong>Narzędzie testowe radia</strong> z ekranu narzędzi radia (okno ma przycisk <strong>kopiowania</strong>). Wypisuje ono wiersz po wierszu wysłane polecenia i otrzymane odpowiedzi, więc zwykle od razu widać, czy polecenie nie wyszło, radio nie odpowiada, czy odpowiedziało w innym formacie.</li>
      <li><strong>Gdy nic się nie dekoduje albo nie ma dźwięku</strong>: dołącz linię stanu i sześć wierszy diagnostycznych z „Urządzenia audio" w Ustawienia → <strong>Zaawansowane i dla deweloperów</strong> — wystarczy zrzut ekranu.</li>
      <li><strong>Sprawy wyświetlania lub wodospadu</strong>: przycisk <strong>Kopiuj informacje diagnostyczne</strong> w panelu regulacji wodospadu kopiuje do schowka bieżące poziomy, wzmocnienia i inne wartości wewnętrzne.</li>
    </ol>`,
  ts_report_note: 'Zawartość ekranu Debug nie jest nigdzie wysyłana automatycznie — opuszcza telefon dopiero wtedy, gdy sam ją skopiujesz i wkleisz.',
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
      <li><strong>Mientras estás en la pantalla de WSPR, JS8 o herramientas de radio no se decodifica nada.</strong> Es deliberado (desde 26.0817): las tres se apropian del mismo equipo y de la misma ruta de audio, así que la decodificación de FT8 queda en pausa mientras estás ahí y se reanuda al salir. El único caso en que no se reanuda sola es dejar JS8 encendido: JS8 sigue funcionando en segundo plano en su propia frecuencia, así que desactívalo y vuelve a la pestaña de decodificación.</li>
      <li>Si no llega audio en absoluto, o sospechas que se está grabando la habitación en vez del equipo (lo más habitual con tarjeta de sonido USB o Bluetooth), consulta más abajo la sección <strong>«Dispositivo de audio y tarjetas de sonido USB»</strong>: allí se explica cómo confirmar la fuente real de grabación.</li>
    </ul>`,

  ts_noconn_title: 'No se puede conectar con el equipo',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> confirma que tu dispositivo admite USB OTG. Concede el permiso al dispositivo USB cuando Android lo pida. Prueba con otro adaptador OTG o con otro cable.</li>
      <li>Verifica que el <strong>modelo de equipo</strong> y la <strong>velocidad en baudios</strong> coincidan con los ajustes CAT de tu equipo.</li>
      <li>Para ICOM: comprueba que la <strong>dirección CI-V</strong> coincida con la del menú del equipo (a menudo 0x94 o 0xA4).</li>
      <li><strong>Bluetooth:</strong> empareja el adaptador en los ajustes de Bluetooth de Android antes de seleccionarlo en FT8TW. Asegúrate de que tenga alimentación y esté dentro del alcance.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> confirma que el teléfono y el equipo estén en la misma red y revisa la dirección IP y el número de puerto.</li>
      <li>Si has comprobado todo lo anterior y sigue sin responder, usa la sección <strong>Herramienta de prueba del equipo</strong> al final de la página de herramientas de radio y verifica punto por punto: <strong>Read Freq</strong> muestra si el equipo responde y <strong>PTT Test</strong> si consigue pasar a transmisión. En la ventana de respuestas aparecen literalmente las órdenes enviadas y lo recibido, de modo que se distingue en el acto si la orden no salió, si salió pero no hay respuesta, o si la respuesta llegó con otro formato. Consulta <a href="ssb.html">«Herramientas de radio»</a>.</li>
      <li>Si vas por USB y la herramienta de prueba dice que <strong>el equipo no está conectado</strong>, lee la sección siguiente: esa frase significa mucho menos de lo que parece.</li>
    </ul>`,

  ts_usb_title: 'Conexión USB (control CAT)',
  ts_usb_intro: 'Conviene separar las dos rutas. El <strong>control CAT</strong> va por el puerto serie USB y determina si la aplicación puede leer y fijar la frecuencia y accionar el PTT. El <strong>audio</strong> viaja por otra ruta y determina qué oye el decodificador. Son independientes: una puede funcionar mientras la otra no. Cuando la Herramienta de prueba del equipo dice que <strong>el equipo no está conectado</strong>, significa exactamente una cosa: <strong>el puerto serie nunca llegó a abrirse</strong>. La velocidad, los bits de datos, la paridad, el modelo de equipo y el método de PTT <em>no intervienen en absoluto</em>: hasta que el puerto no se abre, ninguno entra en juego. Así que, al ver ese mensaje, repasa la lista de abajo en lugar de volver a los ajustes CAT.',
  ts_usb_list: `
    <ul>
      <li><strong>En la pantalla principal no aparece ninguna lista de dispositivos USB.</strong> La lista se muestra sobre la pantalla de decodificación solo cuando se ha detectado un dispositivo serie, el tipo de conexión es USB y todavía no hay equipo conectado. Recoge lo que informa Android y <strong>no necesita permiso ni un chipset reconocido</strong> para mostrar una entrada; por tanto, si la lista no aparece nunca, casi con seguridad <strong>el teléfono no está enumerando el dispositivo</strong>, y no es que la aplicación se niegue a mostrarlo. Comprobación rápida: desconecta y vuelve a conectar el cable. Android debería ofrecer «Abrir FT8TW». Si no ocurre absolutamente nada, el teléfono no ve el dispositivo.</li>
      <li><strong>El mismo cable funciona en el ordenador pero no en el teléfono.</strong> El puerto USB-A de un ordenador es siempre el anfitrión y no negocia nada; un teléfono tiene que pasar por sí mismo a modo anfitrión USB (OTG) y suministrar 5 V. El fallo más habitual es la conexión <strong>USB-C a USB-C</strong>: muchas placas CH340 y CP2102 con conector USB-C omiten las resistencias de pull-down CC de 5,1 kΩ, así que el teléfono concluye que no hay nada conectado y nunca entra en modo anfitrión. Usa en su lugar <strong>teléfono → adaptador USB-C OTG (con hembra USB-A) → tu cable USB-A de siempre → equipo</strong>: un cable USB-A a C lleva esa resistencia en su conector C, de modo que esta ruta funciona incluso con placas que la omiten. Una aplicación del tipo «USB Device Info» también te dirá directamente si el teléfono ve el dispositivo.</li>
      <li><strong>Pulsaste «Permitir» y no pasó nada.</strong> Las versiones anteriores a la 26.0815-2 tenían un fallo que descartaba el resultado del permiso que devolvía Android: ninguna reacción en pantalla, ni siquiera un aviso. La solución provisional era <strong>tocar el mismo dispositivo de la lista una segunda vez</strong>. Desde la 26.0815-2 la aplicación conecta en cuanto se concede el permiso, así que ese segundo toque ya no hace falta.</li>
      <li><strong>Aparecen en la lista dispositivos que no son el equipo.</strong> Antes de la 26.0815-2, todo aquello cuyo chipset no se reconocía se listaba como puerto serie, de modo que salían tarjetas de sonido, teclados y memorias USB. Un Digirig, que es puerto serie más tarjeta de sonido, generaba dos entradas y era fácil elegir la equivocada. Las versiones nuevas filtran los dispositivos de audio, HID, almacenamiento y concentradores, que no pueden ser puertos serie.</li>
      <li><strong>No hay conexión automática al arrancar.</strong> La conexión automática exige que haya <strong>exactamente un dispositivo serie</strong>. Por el fallo anterior, quienes usaban un Digirig nunca podían cumplir esa condición y la conexión automática dejó de funcionar en silencio; la 26.0815-2 la restaura. Si de verdad tienes dos o más dispositivos serie conectados, seguirás teniendo que elegir uno en la lista.</li>
      <li><strong>Sigue indicando conectado tras desenchufar, o no reconecta al volver a enchufar.</strong> Desde la 26.0815-2, desconectar el dispositivo en uso desconecta el equipo de inmediato, y volver a conectarlo restablece la conexión en uno o dos segundos. Las versiones antiguas solo advertían la falta del cable cuando fallaba la siguiente lectura o escritura; hasta entonces la pantalla seguía diciendo «conectado», y ese estado obsoleto bloqueaba después la reconexión: de ahí que la reconexión automática funcionara unas veces sí y otras no.</li>
      <li><strong>Que decodifique no prueba que el USB funcione.</strong> El micrófono del teléfono capta sin problema el altavoz del equipo, y esa ruta no necesita USB en absoluto. Hay una prueba de un solo movimiento: <strong>desenchufa el cable USB por completo</strong>. Si las decodificaciones continúan, el audio siempre fue acústico. Esto importa sobre todo con <strong>(tr)uSDX y audio over CAT</strong>: en ese modo el audio de recepción llega <em>como datos serie por el propio enlace CAT</em>, y solo después de que la aplicación haya enviado al equipo una orden CAT para iniciar el flujo. Con el puerto cerrado no puede haber audio, así que «la herramienta de prueba dice que no está conectado» y «el audio llega por USB» no pueden ser ciertas a la vez.</li>
    </ul>`,

  ts_audio_title: 'Dispositivo de audio y tarjetas de sonido USB',
  ts_audio_intro: 'La trampa de una tarjeta de sonido USB (un Digirig, por ejemplo) es que <strong>la pantalla de decodificación sigue funcionando y el medidor de nivel sigue moviéndose aunque la aplicación esté grabando la habitación</strong>. Nada en pantalla lo delata. Para ver qué dispositivo se usa realmente, abre Ajustes → <strong>Avanzado y desarrollador</strong> y mira «Dispositivo de audio»: una línea de estado y, debajo, seis campos de diagnóstico. Los seis preguntan al propio grabador, en vez de repetir los valores que solicitamos.',
  ts_audio_fields: `
    <table>
      <tr><th>Campo</th><th>Cómo leerlo</th></tr>
      <tr><td><code>Device type</code></td><td>El dispositivo al que el audio está <strong>realmente encaminado ahora mismo</strong>. Una tarjeta USB conectada con <code>BUILTIN_MIC</code> aquí significa que se sigue grabando la habitación; debería poner <code>USB_DEVICE</code>, <code>USB_HEADSET</code> o <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>La frecuencia real. El sistema puede ignorar lo que pedimos, y las tarjetas USB lo hacen a menudo (se pide 48k y se entrega 44,1k)</td></tr>
      <tr><td><code>Channel count</code></td><td>El número real de canales, igualmente (pedir mono y recibir estéreo es habitual)</td></tr>
      <tr><td><code>Record source</code></td><td>La constante de la fuente de captura, p. ej. <code>MIC</code>, <code>VOICE_RECOGNITION</code>, <code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>El estado <strong>real</strong> del SCO de Bluetooth según informa la difusión del sistema</td></tr>
      <tr><td><code>SCO requested</code></td><td>La marca que <strong>pidió</strong> la aplicación. <code>requested=true</code> con <code>state=DISCONNECTED</code> es un adaptador Bluetooth que ha soltado el enlace en silencio: la pista es justamente la discrepancia</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>Si la línea de estado dice <strong>«Se encontró audio USB …, pero el sistema no aceptó la petición de encaminamiento; se sigue grabando del micrófono integrado»</strong>, el dispositivo se encontró pero el encaminamiento nunca se movió. Pulsa primero <strong>Volver a detectar</strong>; si no ayuda, desconecta y vuelve a conectar la tarjeta de sonido y asegúrate de que ninguna otra aplicación (grabadora de voz, una llamada en curso, una segunda copia de FT8TW) tenga tomado el micrófono.</li>
      <li><strong>Conectar y desconectar cambia automáticamente</strong> (Android 6 o posterior), con dos excepciones deliberadas: el audio procedente de un <strong>equipo en red</strong> (FlexRadio / ICOM / Xiegu) se deja en paz, pues de lo contrario se le arrebataría la fuente al micrófono; y <strong>durante la transmisión</strong> el cambio se pospone, hasta 30 segundos. En el primer caso, al pulsar «Volver a detectar» se te dice sin rodeos que el audio viene de un equipo en red.</li>
      <li><strong>Dice que está grabando pero no llega ni una muestra.</strong> Antes de la 26.0815-2, si el grabador no arrancaba la aplicación seguía mostrando «grabando», el temporizador seguía corriendo y el registro decía incluso que la grabación había comenzado, mientras que el audio no llegaba nunca. Las versiones nuevas informan del fallo, y el vigilante cubre ahora también el único caso que antes se le escapaba: un grabador que nunca llegó a arrancar.</li>
      <li>Si la pantalla de decodificación muestra de forma permanente <strong>⚠ Sin entrada de audio</strong>, púlsalo: la aplicación enumera las causas probables: falta el permiso de micrófono o lo tiene otra aplicación, hay un problema con la propia fuente de audio (cable, volumen del equipo, enlace Bluetooth), o una segunda copia de FT8TW en el mismo teléfono se ha quedado con el micrófono.</li>
      <li><strong>Cuando no se puede cambiar el nivel de salida del propio equipo</strong>, usa <strong>Ganancia de audio de recepción</strong> en Ajustes → Radio y audio. El QMX envía un nivel fijo por USB, y en los equipos ICOM el volumen USB está en el menú de ajustes y no en el mando de AF.</li>
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
      <li>Pulsa <strong>PTT Test</strong> en la sección <strong>Herramienta de prueba del equipo</strong> de la página de herramientas de radio: si allí el PTT se activa y se suelta con normalidad, la vía del PTT en sí funciona y el problema está en otra parte del proceso de transmisión.</li>
      <li><strong>Yaesu FTX-1:</strong> si el equipo transmite el sonido del micrófono en lugar del audio enviado por USB, ajusta en el equipo <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> a <strong>USB</strong>. El valor de fábrica es AUTO, que usa el micrófono siempre que la transmisión no se inicie por CAT/RTS/DTR. La versión 26.0814-2 y posteriores lo ajustan automáticamente al conectar.</li>
      <li><strong>Una programación WSPR en curso bloquea la transmisión de FT8/FT4/FT2</strong> (desde 26.0815-2). Ambos comparten un equipo y una ruta de audio, y antes, en los huecos en que WSPR esperaba a un minuto UTC par, FT8 seguía transmitiendo ranura tras ranura. Ahora, activar WSPR apaga primero la transmisión de FT8 y te lo dice; a la inversa, iniciar FT8 mientras hay una sesión WSPR queda bloqueado con una explicación. <strong>Al terminar WSPR, FT8 no se vuelve a encender</strong>: es deliberado, porque restaurarlo en silencio produciría una transmisión inesperada.</li>
      <li><strong>La transmisión se detuvo sola y no volvió a llamar CQ.</strong> Comprueba si elegiste la estación <strong>deslizando a la izquierda</strong>. Deslizar a la izquierda significa «llama solo a esta estación»: si en ese momento la transmisión estaba apagada, la aplicación entra en modo de contacto único, deja de transmitir al terminar ese contacto y entretanto no atiende a otras estaciones que te llamen. Para que siga funcionando, activa la transmisión antes de deslizar, o elige la estación pulsándola.</li>
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
      <li>Si sospechas que el audio Bluetooth se ha cortado en silencio, ve a Ajustes → <strong>Avanzado y desarrollador</strong> y mira en «Dispositivo de audio» las líneas <code>SCO state</code> y <code>SCO requested</code>: <code>requested=true</code> con <code>state=DISCONNECTED</code> es exactamente el estado en que el enlace ya ha caído y la aplicación todavía lo cree activo.</li>
    </ul>`,

  ts_report_title: 'Qué adjuntar al informar de un problema',
  ts_report_intro: 'El botón <strong>Informar</strong>, al final de la pantalla de ajustes, abre directamente la página de incidencias (<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>). Los puntos 1 y 2 de abajo hacen falta casi siempre: sin el número de versión no podemos saber si te has topado con un problema ya corregido, y en un mismo día puede publicarse más de una versión, así que decir «la última» no identifica nada. El resto, adjúntalo según el tipo de problema.',
  ts_report_list: `
    <ol>
      <li><strong>Número de versión.</strong> Aparece en la pantalla de bienvenida al arrancar la aplicación, y también en la esquina superior derecha de cualquier diálogo de ayuda (<strong>?</strong>). Cópialo entero, <strong>incluido el sufijo</strong> (por ejemplo <code>26.0815-2</code>): dos versiones del mismo día no tienen el mismo contenido, y omitir un <code>-2</code> puede señalar a la equivocada.</li>
      <li><strong>Mensaje de error (pantalla Debug).</strong> El botón <strong>Debug</strong>, al final de los ajustes, abre la pantalla «Último mensaje de error». La mitad superior es el <strong>diagnóstico de excepciones en ejecución</strong> (<code>Runtime diagnostics</code>): decodificación detenida en silencio, hilo de grabación muerto, tiempo de espera del bloqueo del decodificador… fallos que <em>no provocan un cierre inesperado ni muestran nada en pantalla</em> y que solo se ven aquí. La mitad inferior es el registro completo del último cierre inesperado, con la versión y el tiempo de funcionamiento de entonces. El botón <strong>Copy Error Message</strong> copia todo al portapapeles: basta con pegarlo. Aunque solo ponga <code>No issues detected.</code>, eso también es información útil. El informe está siempre en inglés, con independencia del idioma de la interfaz, para que podamos leer cualquier informe venga del país que venga.</li>
      <li><strong>Modelo de teléfono y versión de Android</strong>, además del <strong>modelo del equipo</strong> y el <strong>tipo de conexión</strong> (VOX / USB / Bluetooth / red).</li>
      <li><strong>Si el equipo no conecta o el CAT no responde</strong>: adjunta el contenido de la ventana de respuestas de la <strong>Herramienta de prueba del equipo</strong>, en la pantalla de herramientas de radio (esa ventana tiene un botón de <strong>copiar</strong>). Enumera línea a línea las órdenes enviadas y las respuestas recibidas, de modo que suele verse de un vistazo si la orden no salió, si el equipo no responde o si responde en otro formato.</li>
      <li><strong>Si no decodifica o no llega audio</strong>: adjunta la línea de estado y las seis líneas de diagnóstico de «Dispositivo de audio» en Ajustes → <strong>Avanzado y desarrollador</strong>; basta con una captura de pantalla.</li>
      <li><strong>Si es cuestión de la visualización o la cascada</strong>: el botón <strong>Copiar información de diagnóstico</strong> del panel de ajuste de la cascada copia al portapapeles los niveles, ganancias y demás valores internos actuales.</li>
    </ol>`,
  ts_report_note: 'El contenido de la pantalla Debug no se envía a ninguna parte por su cuenta: solo sale del teléfono cuando tú lo copias y lo pegas.',
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
      <li><strong>Όσο βρίσκεστε στην οθόνη WSPR, JS8 ή εργαλείων πομποδέκτη δεν αποκωδικοποιείται τίποτα.</strong> Είναι σκόπιμο (από 26.0817): και οι τρεις δεσμεύουν τον ίδιο πομποδέκτη και την ίδια διαδρομή ήχου, οπότε η αποκωδικοποίηση FT8 διακόπτεται όσο είστε εκεί και επανέρχεται μόλις φύγετε. Η μόνη περίπτωση που δεν επανέρχεται μόνη της είναι το JS8 αφημένο ανοιχτό — συνεχίζει να τρέχει στο παρασκήνιο στη δική του συχνότητα, οπότε κλείστε το και γυρίστε στην καρτέλα αποκωδικοποίησης.</li>
      <li>Αν δεν έρχεται καθόλου ήχος, ή υποψιάζεστε ότι ηχογραφείται το δωμάτιο αντί για τον πομποδέκτη (συνηθέστερο με κάρτα ήχου USB ή Bluetooth), δείτε παρακάτω την ενότητα <strong>«Συσκευή ήχου και κάρτες ήχου USB»</strong>: εκεί περιγράφεται πώς επιβεβαιώνετε την πραγματική πηγή εγγραφής.</li>
    </ul>`,

  ts_noconn_title: 'Δεν γίνεται σύνδεση με τον πομποδέκτη',
  ts_noconn_list: `
    <ul>
      <li><strong>USB:</strong> επιβεβαιώστε ότι η συσκευή σας υποστηρίζει USB OTG. Παραχωρήστε την άδεια συσκευής USB όταν σας τη ζητήσει το Android. Δοκιμάστε άλλον αντάπτορα OTG ή άλλο καλώδιο.</li>
      <li>Επαληθεύστε ότι το <strong>μοντέλο πομποδέκτη</strong> και ο <strong>ρυθμός baud</strong> ταιριάζουν με τις ρυθμίσεις CAT του μηχανήματος.</li>
      <li>Για ICOM: ελέγξτε ότι η <strong>διεύθυνση CI-V</strong> ταιριάζει με τη ρύθμιση στο μενού (συχνά 0x94 ή 0xA4).</li>
      <li><strong>Bluetooth:</strong> κάντε πρώτα σύζευξη του αντάπτορα στις ρυθμίσεις Bluetooth του Android και μετά επιλέξτε τον στο FT8TW. Βεβαιωθείτε ότι τροφοδοτείται και βρίσκεται εντός εμβέλειας.</li>
      <li><strong>WiFi (FlexRadio/ICOM):</strong> επιβεβαιώστε ότι τηλέφωνο και πομποδέκτης είναι στο ίδιο δίκτυο και ελέγξτε τη διεύθυνση IP και τον αριθμό θύρας.</li>
      <li>Αν έχετε ελέγξει όλα τα παραπάνω και εξακολουθεί να μην αποκρίνεται, χρησιμοποιήστε την ενότητα <strong>Εργαλείο δοκιμής πομποδέκτη</strong> στο κάτω μέρος της σελίδας εργαλείων πομποδέκτη και ελέγξτε βήμα-βήμα: το <strong>Read Freq</strong> δείχνει αν ο πομποδέκτης απαντά και το <strong>PTT Test</strong> αν μπαίνει σε εκπομπή. Στο παράθυρο απαντήσεων οι εντολές που στάλθηκαν και όσα επέστρεψαν εμφανίζονται αυτούσια, οπότε ξεχωρίζετε αμέσως αν η εντολή δεν έφυγε, αν έφυγε χωρίς απάντηση, ή αν η απάντηση ήρθε σε άλλη μορφή. Δείτε τα <a href="ssb.html">«Εργαλεία πομποδέκτη»</a>.</li>
      <li>Αν συνδέεστε μέσω USB και το εργαλείο δοκιμής λέει ότι <strong>ο πομποδέκτης δεν είναι συνδεδεμένος</strong>, διαβάστε την επόμενη ενότητα — η φράση αυτή σημαίνει πολύ λιγότερα απ᾽ όσα δείχνει.</li>
    </ul>`,

  ts_usb_title: 'Σύνδεση USB (έλεγχος CAT)',
  ts_usb_intro: 'Κρατήστε τις δύο διαδρομές χωριστά. Ο <strong>έλεγχος CAT</strong> περνά από τη σειριακή θύρα USB και καθορίζει αν η εφαρμογή μπορεί να διαβάζει και να ορίζει τη συχνότητα και να ενεργοποιεί το PTT. Ο <strong>ήχος</strong> ταξιδεύει από άλλη διαδρομή και καθορίζει τι ακούει ο αποκωδικοποιητής. Είναι ανεξάρτητες — η μία μπορεί κάλλιστα να δουλεύει ενώ η άλλη όχι. Όταν το Εργαλείο δοκιμής πομποδέκτη λέει ότι <strong>ο πομποδέκτης δεν είναι συνδεδεμένος</strong>, σημαίνει ακριβώς ένα πράγμα: <strong>η σειριακή θύρα δεν άνοιξε ποτέ</strong>. Ο ρυθμός baud, τα bits δεδομένων, η ισοτιμία, το μοντέλο του πομποδέκτη και ο τρόπος PTT <em>δεν εμπλέκονται καθόλου</em> — κανένα τους δεν παίζει ρόλο πριν ανοίξει η θύρα. Όταν λοιπόν δείτε αυτό το μήνυμα, ακολουθήστε την παρακάτω λίστα αντί να γυρίσετε στις ρυθμίσεις CAT.',
  ts_usb_list: `
    <ul>
      <li><strong>Δεν εμφανίζεται καθόλου λίστα συσκευών USB στην κύρια οθόνη.</strong> Η λίστα εμφανίζεται πάνω από την οθόνη αποκωδικοποίησης μόνο όταν έχει εντοπιστεί σειριακή συσκευή, ο τύπος σύνδεσης είναι USB και δεν έχει συνδεθεί ακόμη πομποδέκτης. Δείχνει ό,τι αναφέρει το Android και <strong>δεν χρειάζεται ούτε άδεια ούτε αναγνωρισμένο ολοκληρωμένο</strong> για να εμφανίσει μια γραμμή — αν λοιπόν η λίστα δεν εμφανίζεται ποτέ, το τηλέφωνο σχεδόν σίγουρα <strong>δεν απαριθμεί καθόλου τη συσκευή</strong>, δεν είναι ότι η εφαρμογή αρνείται να τη δείξει. Γρήγορος έλεγχος: αποσυνδέστε και ξανασυνδέστε το καλώδιο. Το Android θα πρέπει να προτείνει «Άνοιγμα του FT8TW». Αν δεν συμβεί απολύτως τίποτα, το τηλέφωνο δεν βλέπει τη συσκευή.</li>
      <li><strong>Το ίδιο καλώδιο δουλεύει στον υπολογιστή αλλά όχι στο τηλέφωνο.</strong> Η θύρα USB-A ενός υπολογιστή είναι πάντα ο host και δεν διαπραγματεύεται τίποτα· το τηλέφωνο πρέπει να περάσει μόνο του σε λειτουργία USB host (OTG) και να δώσει 5 V. Η πιο συνηθισμένη αποτυχία είναι η σύνδεση <strong>USB-C προς USB-C</strong>: πολλές πλακέτες CH340 και CP2102 με υποδοχή USB-C παραλείπουν τις αντιστάσεις pull-down CC των 5,1 kΩ, οπότε το τηλέφωνο κρίνει ότι δεν υπάρχει τίποτα συνδεδεμένο και δεν μπαίνει ποτέ σε λειτουργία host. Χρησιμοποιήστε αντ᾽ αυτού <strong>τηλέφωνο → αντάπτορα USB-C OTG (με θηλυκή USB-A) → το υπάρχον καλώδιο USB-A → πομποδέκτη</strong>· ένα καλώδιο USB-A προς C φέρει αυτή την αντίσταση στο βύσμα C, οπότε η διαδρομή αυτή λειτουργεί ακόμη και με πλακέτες που την παραλείπουν. Μια εφαρμογή τύπου «USB Device Info» θα σας πει επίσης απευθείας αν το τηλέφωνο βλέπει τη συσκευή.</li>
      <li><strong>Πατήσατε «Να επιτραπεί» και δεν έγινε τίποτα.</strong> Οι εκδόσεις πριν από την 26.0815-2 είχαν σφάλμα που πετούσε το αποτέλεσμα της άδειας που επέστρεφε το Android: καμία αντίδραση στην οθόνη, ούτε καν μήνυμα. Η λύση τότε ήταν <strong>να πατήσετε την ίδια συσκευή στη λίστα δεύτερη φορά</strong>. Από την 26.0815-2 η εφαρμογή συνδέεται μόλις δοθεί η άδεια, οπότε το δεύτερο πάτημα δεν χρειάζεται πια.</li>
      <li><strong>Στη λίστα εμφανίζονται συσκευές που δεν είναι πομποδέκτες.</strong> Πριν από την 26.0815-2, οτιδήποτε το ολοκληρωμένο του οποίου δεν αναγνωριζόταν καταχωριζόταν ως σειριακή θύρα, οπότε εμφανίζονταν κάρτες ήχου, πληκτρολόγια και στικάκια USB. Το Digirig, όντας σειριακή θύρα συν κάρτα ήχου, έδινε δύο καταχωρίσεις και ήταν εύκολο να διαλέξετε τη λάθος. Οι νεότερες εκδόσεις φιλτράρουν τις συσκευές ήχου, HID, αποθήκευσης και τους διανομείς, που δεν μπορούν να είναι σειριακές θύρες.</li>
      <li><strong>Δεν γίνεται αυτόματη σύνδεση κατά την εκκίνηση.</strong> Η αυτόματη σύνδεση απαιτεί να υπάρχει <strong>ακριβώς μία</strong> σειριακή συσκευή. Λόγω του παραπάνω σφάλματος, όσοι είχαν Digirig δεν μπορούσαν ποτέ να ικανοποιήσουν αυτή τη συνθήκη, οπότε η αυτόματη σύνδεση σταμάτησε σιωπηλά να λειτουργεί· η 26.0815-2 την επαναφέρει. Αν όντως έχετε συνδεδεμένες δύο ή περισσότερες σειριακές συσκευές, θα πρέπει και πάλι να επιλέξετε μία από τη λίστα.</li>
      <li><strong>Δείχνει ακόμη συνδεδεμένο μετά την αποσύνδεση ή δεν επανασυνδέεται όταν ξανασυνδέσετε.</strong> Από την 26.0815-2, η αποσύνδεση της συσκευής που χρησιμοποιείται αποσυνδέει αμέσως τον πομποδέκτη, και η επανασύνδεση αποκαθίσταται σε ένα-δύο δευτερόλεπτα. Οι παλαιότερες εκδόσεις αντιλαμβάνονταν το καλώδιο που έλειπε μόλις αποτύγχανε η επόμενη ανάγνωση ή εγγραφή· ως τότε η οθόνη έλεγε ακόμη «συνδεδεμένο», και αυτή η ξεπερασμένη κατάσταση εμπόδιζε στη συνέχεια την επανασύνδεση — γι᾽ αυτό η αυτόματη επανασύνδεση άλλοτε δούλευε κι άλλοτε όχι.</li>
      <li><strong>Το ότι αποκωδικοποιεί δεν αποδεικνύει ότι δουλεύει το USB.</strong> Το μικρόφωνο του τηλεφώνου πιάνει άνετα το ηχείο του πομποδέκτη, και αυτή η διαδρομή δεν χρειάζεται καθόλου USB. Υπάρχει δοκιμή μιας κίνησης: <strong>βγάλτε εντελώς το καλώδιο USB</strong>. Αν οι αποκωδικοποιήσεις συνεχίζονται, ο ήχος ερχόταν ανέκαθεν ακουστικά. Αυτό έχει τη μεγαλύτερη σημασία με το <strong>(tr)uSDX και audio over CAT</strong>: σε αυτή τη λειτουργία ο ήχος λήψης φτάνει <em>ως σειριακά δεδομένα μέσα από την ίδια τη ζεύξη CAT</em>, και μόνο αφού η εφαρμογή στείλει στον πομποδέκτη εντολή CAT για να ξεκινήσει η ροή. Με κλειστή θύρα δεν μπορεί να υπάρχει ήχος, οπότε το «το εργαλείο δοκιμής λέει μη συνδεδεμένο» και το «ο ήχος έρχεται από USB» δεν μπορούν να ισχύουν ταυτόχρονα.</li>
    </ul>`,

  ts_audio_title: 'Συσκευή ήχου και κάρτες ήχου USB',
  ts_audio_intro: 'Η παγίδα με μια κάρτα ήχου USB (ένα Digirig, ας πούμε) είναι ότι <strong>η οθόνη αποκωδικοποίησης συνεχίζει να τρέχει και το μετρητικό στάθμης να κινείται ακόμη κι όταν η εφαρμογή ηχογραφεί το δωμάτιο</strong>. Τίποτα στην οθόνη δεν το προδίδει. Για να δείτε ποια συσκευή χρησιμοποιείται πραγματικά, ανοίξτε Ρυθμίσεις → <strong>Για προχωρημένους και προγραμματιστές</strong> και δείτε τη «Συσκευή ήχου»: μία γραμμή κατάστασης και από κάτω έξι πεδία διαγνωστικών. Και τα έξι ρωτούν τον ίδιο τον εγγραφέα αντί να επαναλαμβάνουν τις τιμές που ζητήσαμε.',
  ts_audio_fields: `
    <table>
      <tr><th>Πεδίο</th><th>Πώς διαβάζεται</th></tr>
      <tr><td><code>Device type</code></td><td>Η συσκευή στην οποία ο ήχος είναι <strong>πράγματι δρομολογημένος αυτή τη στιγμή</strong>. Κάρτα ήχου USB συνδεδεμένη και εδώ <code>BUILTIN_MIC</code> σημαίνει ότι εξακολουθεί να ηχογραφείται το δωμάτιο· θα έπρεπε να γράφει <code>USB_DEVICE</code>, <code>USB_HEADSET</code> ή <code>USB_ACCESSORY</code></td></tr>
      <tr><td><code>Sample rate</code></td><td>Ο πραγματικός ρυθμός δειγματοληψίας. Το σύστημα είναι ελεύθερο να αγνοήσει ό,τι ζητήσαμε, και οι κάρτες ήχου USB συχνά το κάνουν (ζητήθηκε 48k, δόθηκε 44,1k)</td></tr>
      <tr><td><code>Channel count</code></td><td>Ο πραγματικός αριθμός καναλιών, ομοίως (ζητήθηκε μονοφωνικό και δόθηκε στερεοφωνικό είναι συνηθισμένο)</td></tr>
      <tr><td><code>Record source</code></td><td>Η σταθερά της πηγής καταγραφής, π.χ. <code>MIC</code>, <code>VOICE_RECOGNITION</code>, <code>UNPROCESSED</code></td></tr>
      <tr><td><code>SCO state</code></td><td>Η <strong>πραγματική</strong> κατάσταση του Bluetooth SCO όπως την αναφέρει η εκπομπή του συστήματος</td></tr>
      <tr><td><code>SCO requested</code></td><td>Η σημαία που <strong>ζήτησε</strong> η εφαρμογή. <code>requested=true</code> με <code>state=DISCONNECTED</code> είναι προσαρμογέας Bluetooth που άφησε σιωπηλά τη ζεύξη — η ίδια η ασυμφωνία είναι η ένδειξη</td></tr>
    </table>`,
  ts_audio_list: `
    <ul>
      <li>Αν η γραμμή κατάστασης γράφει <strong>«Βρέθηκε ήχος USB …, αλλά το σύστημα δεν δέχτηκε το αίτημα δρομολόγησης· η εγγραφή συνεχίζεται από το ενσωματωμένο μικρόφωνο»</strong>, η συσκευή βρέθηκε αλλά η δρομολόγηση δεν μετακινήθηκε ποτέ. Πατήστε πρώτα <strong>Νέος εντοπισμός</strong>· αν δεν βοηθήσει, αποσυνδέστε και ξανασυνδέστε την κάρτα ήχου και βεβαιωθείτε ότι καμία άλλη εφαρμογή (μαγνητόφωνο, κλήση σε εξέλιξη, δεύτερο αντίγραφο του FT8TW) δεν κρατά το μικρόφωνο.</li>
      <li><strong>Η σύνδεση και αποσύνδεση εναλλάσσεται αυτόματα</strong> (Android 6 και νεότερο), με δύο σκόπιμες εξαιρέσεις: ο ήχος που έρχεται από <strong>δικτυακό πομποδέκτη</strong> (FlexRadio / ICOM / Xiegu) δεν πειράζεται, αλλιώς η πηγή θα άρπαζε πίσω το μικρόφωνο· και <strong>κατά την εκπομπή</strong> η εναλλαγή αναβάλλεται, το πολύ για 30 δευτερόλεπτα. Στην πρώτη περίπτωση, πατώντας «Νέος εντοπισμός» σας λέει ευθέως ότι ο ήχος έρχεται από δικτυακό πομποδέκτη.</li>
      <li><strong>Λέει ότι ηχογραφεί, αλλά δεν φτάνει ούτε ένα δείγμα.</strong> Πριν από την 26.0815-2, αν ο εγγραφέας αποτύγχανε να ξεκινήσει, η εφαρμογή έδειχνε παρ᾽ όλα αυτά «εγγραφή», το χρονόμετρο έτρεχε και το log έλεγε ακόμη ότι η εγγραφή είχε αρχίσει, ενώ ήχος δεν ερχόταν ποτέ. Οι νεότερες εκδόσεις αναφέρουν την αποτυχία, και ο επιτηρητής καλύπτει πλέον και τη μοναδική περίπτωση που παλιότερα του ξέφευγε: εγγραφέα που δεν ξεκίνησε ποτέ εξαρχής.</li>
      <li>Αν η οθόνη αποκωδικοποίησης δείχνει μόνιμα <strong>⚠ Δεν υπάρχει είσοδος ήχου</strong>, πατήστε το — η εφαρμογή απαριθμεί τις πιθανές αιτίες: λείπει η άδεια μικροφώνου ή το κρατά άλλη εφαρμογή, υπάρχει πρόβλημα με την ίδια την πηγή ήχου (καλώδιο, ένταση πομποδέκτη, ζεύξη Bluetooth), ή ένα δεύτερο αντίγραφο του FT8TW στο ίδιο τηλέφωνο έχει πάρει το μικρόφωνο.</li>
      <li><strong>Όταν η στάθμη εξόδου του ίδιου του πομποδέκτη δεν αλλάζει</strong>, χρησιμοποιήστε την <strong>Απολαβή ήχου λήψης</strong> στις Ρυθμίσεις → Πομποδέκτης και ήχος. Το QMX στέλνει σταθερή στάθμη μέσω USB, ενώ στα ICOM η ένταση USB βρίσκεται στο μενού ρυθμίσεων και όχι στο κουμπί AF.</li>
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
      <li>Πατήστε το <strong>PTT Test</strong> στην ενότητα <strong>Εργαλείο δοκιμής πομποδέκτη</strong> της σελίδας εργαλείων πομποδέκτη: αν εκεί το PTT ανοίγει και κλείνει κανονικά, η ίδια η διαδρομή PTT λειτουργεί και το πρόβλημα βρίσκεται σε άλλο σημείο της ροής εκπομπής.</li>
      <li><strong>Yaesu FTX-1:</strong> αν ο πομποδέκτης εκπέμπει τον ήχο του μικροφώνου αντί για τον ήχο που στέλνεται μέσω USB, ρυθμίστε στον πομποδέκτη <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> σε <strong>USB</strong>. Η εργοστασιακή τιμή είναι AUTO, που χρησιμοποιεί το μικρόφωνο όποτε η εκπομπή δεν ξεκινά από CAT/RTS/DTR. Η έκδοση 26.0814-2 και νεότερες το ρυθμίζουν αυτόματα κατά τη σύνδεση.</li>
      <li><strong>Πρόγραμμα WSPR σε εξέλιξη μπλοκάρει την εκπομπή FT8/FT4/FT2</strong> (από 26.0815-2). Και τα δύο μοιράζονται έναν πομποδέκτη και μία διαδρομή ήχου, ενώ προηγουμένως, στα κενά όπου το WSPR περίμενε ζυγό λεπτό UTC, το FT8 συνέχιζε να εκπέμπει χρονοθυρίδα με χρονοθυρίδα. Τώρα η ενεργοποίηση του WSPR κλείνει πρώτα την εκπομπή FT8 και σας ενημερώνει· αντίστροφα, η εκκίνηση του FT8 ενώ τρέχει WSPR μπλοκάρεται με εξήγηση. <strong>Όταν τελειώσει το WSPR, το FT8 δεν ξανανοίγει μόνο του</strong> — σκόπιμα, γιατί η σιωπηλή επαναφορά θα προκαλούσε μια απροσδόκητη εκπομπή.</li>
      <li><strong>Η εκπομπή σταμάτησε μόνη της και δεν επέστρεψε σε κλήση CQ.</strong> Ελέγξτε μήπως επιλέξατε τον σταθμό με <strong>σύρσιμο προς τα αριστερά</strong>. Το σύρσιμο αριστερά σημαίνει «κάλεσε μόνο αυτόν τον σταθμό»: αν εκείνη τη στιγμή η εκπομπή ήταν κλειστή, η εφαρμογή μπαίνει σε λειτουργία μονής επαφής, σταματά την εκπομπή μόλις ολοκληρωθεί η επαφή και στο μεταξύ δεν ανταποκρίνεται σε άλλους που σας καλούν. Για να συνεχίσει να δουλεύει, ανοίξτε την εκπομπή πριν από το σύρσιμο ή επιλέξτε τον σταθμό με πάτημα.</li>
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
      <li>Αν υποψιάζεστε ότι ο ήχος Bluetooth κόπηκε σιωπηλά, πηγαίνετε στις Ρυθμίσεις → <strong>Για προχωρημένους και προγραμματιστές</strong> και δείτε στη «Συσκευή ήχου» τις γραμμές <code>SCO state</code> και <code>SCO requested</code>: <code>requested=true</code> με <code>state=DISCONNECTED</code> είναι ακριβώς η κατάσταση όπου η ζεύξη έχει ήδη πέσει και η εφαρμογή τη θεωρεί ακόμη ενεργή.</li>
    </ul>`,

  ts_report_title: 'Τι να επισυνάψετε όταν αναφέρετε πρόβλημα',
  ts_report_intro: 'Το κουμπί <strong>Αναφορά</strong> στο κάτω μέρος της οθόνης ρυθμίσεων ανοίγει απευθείας τη σελίδα αναφοράς προβλημάτων (<a href="https://github.com/danleetw/FT8TW/issues" target="_blank">GitHub Issues</a>). Τα σημεία 1 και 2 παρακάτω χρειάζονται σχεδόν πάντα: χωρίς τον αριθμό έκδοσης δεν μπορούμε να κρίνουμε αν πέσατε σε πρόβλημα που έχει ήδη διορθωθεί, ενώ την ίδια ημέρα μπορεί να κυκλοφορήσει περισσότερες από μία εκδόσεις, οπότε το «η τελευταία» δεν προσδιορίζει τίποτα. Τα υπόλοιπα επισυνάψτε τα ανάλογα με το είδος του προβλήματος.',
  ts_report_list: `
    <ol>
      <li><strong>Αριθμός έκδοσης.</strong> Υπάρχει στην οθόνη υποδοχής κατά την εκκίνηση της εφαρμογής, καθώς και πάνω δεξιά σε κάθε παράθυρο βοήθειας (<strong>?</strong>). Αντιγράψτε τον ολόκληρο, <strong>μαζί με την κατάληξη</strong> (για παράδειγμα <code>26.0815-2</code>) — δύο εκδόσεις της ίδιας ημέρας δεν έχουν το ίδιο περιεχόμενο, και το να παραλείψετε ένα <code>-2</code> μπορεί να δείξει σε λάθος έκδοση.</li>
      <li><strong>Μήνυμα σφάλματος (οθόνη Debug).</strong> Το κουμπί <strong>Debug</strong> στο κάτω μέρος των ρυθμίσεων ανοίγει την οθόνη «Τελευταίο μήνυμα σφάλματος». Το πάνω μισό είναι τα <strong>διαγνωστικά εξαιρέσεων χρόνου εκτέλεσης</strong> (<code>Runtime diagnostics</code>) — σιωπηλή διακοπή της αποκωδικοποίησης, θάνατος του νήματος εγγραφής, λήξη χρόνου του κλειδώματος του αποκωδικοποιητή: βλάβες που <em>δεν προκαλούν κατάρρευση ούτε εμφανίζουν κάτι στην οθόνη</em> και φαίνονται μόνο εδώ. Το κάτω μισό είναι η πλήρης καταγραφή της τελευταίας κατάρρευσης, μαζί με την έκδοση και τον χρόνο λειτουργίας εκείνης της στιγμής. Το κουμπί <strong>Copy Error Message</strong> αντιγράφει τα πάντα στο πρόχειρο — απλώς επικολλήστε τα. Ακόμη κι αν γράφει μόνο <code>No issues detected.</code>, και αυτό είναι χρήσιμη πληροφορία. Η αναφορά είναι πάντα στα αγγλικά, ανεξάρτητα από τη γλώσσα της διεπαφής — ώστε να μπορούμε να διαβάσουμε αναφορές από οποιαδήποτε χώρα.</li>
      <li><strong>Μοντέλο τηλεφώνου και έκδοση Android</strong>, καθώς και <strong>μοντέλο πομποδέκτη</strong> και <strong>τρόπο σύνδεσης</strong> (VOX / USB / Bluetooth / δίκτυο).</li>
      <li><strong>Όταν ο πομποδέκτης δεν συνδέεται ή το CAT δεν αποκρίνεται</strong>: επισυνάψτε το περιεχόμενο του παραθύρου αποκρίσεων του <strong>Εργαλείο δοκιμής πομποδέκτη</strong> στην οθόνη εργαλείων πομποδέκτη (το παράθυρο έχει κουμπί <strong>αντιγραφής</strong>). Παραθέτει γραμμή προς γραμμή τις εντολές που στάλθηκαν και τις απαντήσεις που ήρθαν, οπότε συνήθως φαίνεται αμέσως αν η εντολή δεν βγήκε, αν ο πομποδέκτης δεν απαντά ή αν απάντησε σε άλλη μορφή.</li>
      <li><strong>Όταν δεν αποκωδικοποιεί ή δεν έρχεται ήχος</strong>: επισυνάψτε τη γραμμή κατάστασης και τις έξι γραμμές διαγνωστικών της «Συσκευής ήχου» στις Ρυθμίσεις → <strong>Για προχωρημένους και προγραμματιστές</strong> — αρκεί ένα στιγμιότυπο οθόνης.</li>
      <li><strong>Για θέματα εμφάνισης ή waterfall</strong>: το κουμπί <strong>Αντιγραφή διαγνωστικών πληροφοριών</strong> στον πίνακα ρύθμισης του waterfall αντιγράφει στο πρόχειρο τις τρέχουσες στάθμες, απολαβές και άλλες εσωτερικές τιμές.</li>
    </ol>`,
  ts_report_note: 'Το περιεχόμενο της οθόνης Debug δεν αποστέλλεται πουθενά αυτόματα — φεύγει από το τηλέφωνο μόνο όταν το αντιγράψετε και το επικολλήσετε εσείς.',
},

}; /* end PAGE_T */
