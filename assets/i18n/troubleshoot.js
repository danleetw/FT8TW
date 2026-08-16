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
      <li>If no audio is arriving at all, or you suspect the app is recording the room rather than the radio (most common with a USB sound card or Bluetooth), see <strong>Audio Device and USB Sound Cards</strong> below for how to confirm the actual recording source.</li>
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
      <li><strong>Plugging and unplugging switches automatically</strong> on Android 6 and later, with three deliberate exceptions: audio coming from a <strong>network radio</strong> (FlexRadio / ICOM / Xiegu) is left alone, otherwise the source would be snatched back to the microphone; <strong>acoustic link</strong> mode always uses the built-in microphone; and <strong>while transmitting</strong> the switch is deferred, for up to 30 seconds. In the first case, pressing Re-detect tells you plainly that audio is coming from a network radio.</li>
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
      <li>完全收不到音訊、或懷疑收的其實是室內的環境音（用了 USB 音效卡、藍牙時最常見），請看下面的<strong>「音訊裝置與 USB 音效卡」</strong>一節，那裡有怎麼確認實際錄音來源的方法。</li>
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
      <li><strong>插拔會自動切換</strong>（Android 6 以上），但有三種情況刻意不切：音訊來自<strong>網路電台</strong>（FlexRadio／ICOM／協谷）時不切，否則會把音源搶回麥克風；<strong>聲學隱形連結</strong>模式固定使用內建麥克風；<strong>發射中</strong>會延後處理，最多讓路 30 秒。第一種情況按下重新偵測會直接告訴您「音訊來自網路電台」。</li>
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
      <li><strong>Yaesu FTX-1:</strong> USB で送った音声ではなくマイクが拾った音が送信される場合は、無線機の <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> を <strong>USB</strong> に設定してください。工場出荷時は AUTO で、CAT/RTS/DTR 以外で送信を開始するとマイクが使われます。26.0814-2 以降のバージョンでは接続時に自動で設定します。</li>
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
      <li><strong>Yaesu FTX-1:</strong> если трансивер передаёт звук с микрофона вместо аудио, отправленного по USB, установите на трансивере <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> в <strong>USB</strong>. Заводское значение — AUTO: микрофон используется всегда, когда передача начата не по CAT/RTS/DTR. Версия 26.0814-2 и новее устанавливает это автоматически при подключении.</li>
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
      <li><strong>Yaesu FTX-1:</strong> jeśli radio nadaje dźwięk z mikrofonu zamiast dźwięku wysłanego przez USB, ustaw w radiu <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> na <strong>USB</strong>. Wartość fabryczna to AUTO, przy której mikrofon jest używany zawsze, gdy nadawanie nie zostało uruchomione przez CAT/RTS/DTR. Wersja 26.0814-2 i nowsze ustawiają to automatycznie po połączeniu.</li>
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
      <li><strong>Yaesu FTX-1:</strong> si el equipo transmite el sonido del micrófono en lugar del audio enviado por USB, ajusta en el equipo <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> a <strong>USB</strong>. El valor de fábrica es AUTO, que usa el micrófono siempre que la transmisión no se inicie por CAT/RTS/DTR. La versión 26.0814-2 y posteriores lo ajustan automáticamente al conectar.</li>
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
      <li><strong>Yaesu FTX-1:</strong> αν ο πομποδέκτης εκπέμπει τον ήχο του μικροφώνου αντί για τον ήχο που στέλνεται μέσω USB, ρυθμίστε στον πομποδέκτη <strong>MENU → RADIO SETTING → MODE DATA → MOD SOURCE</strong> σε <strong>USB</strong>. Η εργοστασιακή τιμή είναι AUTO, που χρησιμοποιεί το μικρόφωνο όποτε η εκπομπή δεν ξεκινά από CAT/RTS/DTR. Η έκδοση 26.0814-2 και νεότερες το ρυθμίζουν αυτόματα κατά τη σύνδεση.</li>
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
