/* ── FT8TW User Manual – i18n: Operating FT8 / FT4 ───────────────── */

const PAGE_T = {

en: {
  op_title: 'Operating FT8 / FT4',

  op_what_title: 'What FT8 / FT4 / FT2 Are',
  op_what_text:  'FT8 is a <strong>weak-signal digital mode</strong>, published in 2017 by K1JT and K9AN, and now the most used mode on HF. Its goal is a narrow one: <strong>to complete a minimal contact under conditions where the signal is entirely inaudible</strong>. To manage that, it gives up a great deal:',
  op_what_list: `
    <ul>
      <li><strong>Messages are short and rigidly formatted</strong> — one message holds little more than callsigns, a grid square and a signal report. There is no free conversation (free text is 13 characters at most). For typed conversation see <a href="js8.html">JS8 Chat Mode</a>.</li>
      <li><strong>Time is cut into fixed slots</strong> — FT8 runs on 15-second slots, one station transmitting on even slots and the other on odd ones, alternating. Your <strong>phone's clock therefore has to be right</strong> (within about a second), or the two ends never line up.</li>
      <li><strong>The signal is narrow</strong> — about 50 Hz, so dozens of stations can work at once on the same dial frequency, each at its own audio frequency. That is what the row of signals on the waterfall is.</li>
      <li><strong>What you get in return is sensitivity</strong> — typically decoding down to around −21 dB SNR, roughly 20 dB below what the ear can pick out. That is why modest power and simple antennas still cross continents.</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>Mode</th><th>Slot</th><th>Notes</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 s</td><td>The general-purpose choice, and the most sensitive. Use this if unsure</td></tr>
      <tr><td><strong>FT4</strong></td><td>7.5 s</td><td>Designed for contesting: twice the rate, slightly less sensitive. Good when signals are strong and volume matters</td></tr>
      <tr><td><strong>FT2</strong></td><td>3.75 s</td><td>FT8TW's experimental mode, twice as fast again as FT4. Not yet proven in real contacts</td></tr>
    </table>`,

  op_quick_title: 'Quick Start: Your First FT8 Contact',
  op_quick_text:  'The quickest way in is not to call CQ yourself but to <strong>answer someone else\'s CQ</strong> — they are already waiting for a reply, which makes success far more likely.',
  op_quick_steps: `
    <ol>
      <li>In Settings → Basic Information, fill in <strong>your callsign</strong> and <strong>your grid</strong>. <strong>Without a callsign the app will not transmit.</strong></li>
      <li>Check the radio is in <strong>USB mode</strong> (upper sideband) and connected (see <a href="connection.html">Radio Connection</a>).</li>
      <li>Back on the <strong>Decode</strong> tab, start decoding. After a slot or two, messages begin to fill the list.</li>
      <li>Find a <strong>green</strong> line — green means that station is calling CQ, i.e. waiting for someone to answer. <strong>Tap it</strong> to select it as your target.</li>
      <li>Switch to the <strong>Calling</strong> tab and start transmitting.</li>
      <li>The rest is automatic: the app works through the exchange below and writes the contact to the log when it finishes.</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>Slot</th><th>Who sends</th><th>Sent</th><th>Meaning</th></tr>
      <tr><td>1</td><td>Them</td><td><code>CQ BX1AA PL04</code></td><td>"BX1AA here, in PL04, anyone about?"</td></tr>
      <tr><td>2</td><td><strong>You</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>"BX1AA, this is BV6LC, in PL03"</td></tr>
      <tr><td>3</td><td>Them</td><td><code>BV6LC BX1AA −09</code></td><td>"Got you, your signal is −9 dB"</td></tr>
      <tr><td>4</td><td><strong>You</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>"Roger your report (R); yours is −12 dB"</td></tr>
      <tr><td>5</td><td>Them</td><td><code>BV6LC BX1AA RR73</code></td><td>"All received, goodbye"</td></tr>
      <tr><td>6</td><td><strong>You</strong></td><td><code>BX1AA BV6LC 73</code></td><td>"Goodbye" — contact complete and logged</td></tr>
    </table>`,
  op_quick_note: 'The whole thing takes about a minute and a half. The signal report is a <strong>dB figure</strong> (−09, −12 and so on); the more negative, the weaker, and the legal range is −30 to +20. It is not the 59-style RST used on SSB. If the other station never answers, the app gives up after the number of tries set under <strong>No response</strong> and moves on to another target, so there is no need to sit and watch.',

  op_rx_title:      'Receiving',
  op_rx_text:       'Tap <strong>Start decoding</strong> on the Decode tab. The app records audio and decodes FT8/FT4 messages at the start of each 15-second (FT8) or 7.5-second (FT4) slot. Decoded stations appear in the decode list.',
  op_rx_tips_label: 'Tips for good reception:',
  op_rx_tips: `
    <ul>
      <li>Set your radio to <strong>USB mode</strong> (Upper Sideband). Do not use LSB, AM, or FM for FT8.</li>
      <li>Center the audio passband around <strong>1500 Hz</strong> for best results. The valid audio range is 200–2700 Hz.</li>
      <li>Adjust the radio's AF gain so the audio level is strong but not clipping. Clipping causes decoding failures.</li>
      <li>Use <strong>Deep</strong> decode mode for weak-signal DX conditions.</li>
      <li>Enable <strong>DeNoise</strong> on the Spectrum screen to suppress broadband noise.</li>
    </ul>`,

  op_perf_title:  'Decoding Performance',
  op_perf_intro:  `<p>In August 2026 the FT8TW decoder gained two improvements: <strong>continuous-domain fine alignment</strong> (locking onto each signal's exact timing and frequency instead of a coarse grid) and <strong>subtract-and-redecode</strong> (removing an already-decoded strong signal from the audio so that weaker signals hidden underneath can surface).</p>
    <p>The figures below were measured on the same phone with the same test recordings, generated by WSJT-X's <code>ft8sim</code>. Three situations were covered:</p>
    <ul>
      <li><strong>Single signal</strong> — one signal per recording; this measures sensitivity, i.e. how weak a signal can still be decoded</li>
      <li><strong>Several stations, spread out</strong> — 10 stations per recording on well-separated frequencies</li>
      <li><strong>Several stations, crowded</strong> — 20 stations per recording, half of them buried under a strong station only 20 Hz away; closest to a busy DX or POTA frequency</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>Version</th><th>Mode</th><th>Single signal<br>(of 300)</th><th>Spread out<br>(of 300)</th><th>Crowded<br>(of 600)</th></tr>
      <tr><td>FT8CN</td><td>Fast</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>Deep</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW (old)</td><td>Balanced</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW (new)</strong></td><td>Fast</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW (new)</strong></td><td>Balanced</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW (new)</strong></td><td>Deep</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>With a single signal the new version decodes roughly 14–18&nbsp;% more messages than the old one.</li>
      <li>The crowded case shows the largest difference: the old version decodes only the strong stations (300), while the new version also recovers the weaker ones hidden underneath (about 500).</li>
      <li>All figures are <em>correctly</em> decoded messages. <strong>There were no false decodes</strong> in any of the runs.</li>
      <li>Decoding now takes longer, but still far less than the 15-second FT8 cycle — at most about 0.3&nbsp;s in Deep mode.</li>
    </ul>`,
  op_perf_limits: `<strong>About these figures:</strong> all recordings are computer-generated and do not include real propagation effects such as multipath or fading, so on the air the difference may be larger or smaller. The <strong>*</strong> in the <em>Crowded</em> column marks a measurement that covers only FT8CN's core decoder — its app performs an additional processing stage that this test could not reach, so that figure understates FT8CN.`,

  op_tx_title: 'Making a Contact',
  op_tx_text:  'A typical FT8 QSO is fully automated once you select a target station:',
  op_tx_seq: `
    <ol>
      <li>In the <strong>Decode</strong> tab, tap a station calling CQ to select them as your target.</li>
      <li>Switch to the <strong>Calling</strong> tab and tap <strong>TX</strong> to start transmitting.</li>
      <li>The app automatically sequences through the FT8 exchange:<br>
        <code>CQ reply → RST report → RRR → 73</code></li>
      <li>The QSO is logged automatically upon completion.</li>
    </ol>`,

  op_autocq_title: 'Auto CQ Response',
  op_autocq_text:  'Enable <strong>Auto response CQ</strong> in the Calling tab to respond to CQ calls without manual intervention. Select a priority strategy in Settings → CQ method:',
  op_autocq_opts: `
    <ul>
      <li><strong>Strong &amp; Nearby</strong> — favours stations that are both loud and close</li>
      <li><strong>Grid Distance: Far</strong> — favours the most distant station (for distance awards)</li>
      <li><strong>Grid Distance: Near</strong> — favours the closest station</li>
      <li><strong>More (ITU/CQ/DX) Zone</strong> — favours the zone with the most stations calling</li>
      <li><strong>ITU Zone Priority</strong> / <strong>CQ Zone Priority</strong> / <strong>Dx Zone Priority</strong> — three separate options that order by ITU zone, CQ zone or DXCC respectively (useful when chasing awards)</li>
    </ul>`,
  op_autocq_filter: 'Use <strong>Exclude QSOs</strong> in Settings to skip stations already worked within a chosen window: <strong>Off</strong>, <strong>All</strong>, <strong>1 hour</strong>, <strong>4 hours</strong>, <strong>8 hours</strong>, <strong>Today</strong>, <strong>30 days</strong> or <strong>365 days</strong>.',

  op_autocq_lists: 'Two callsign lists refine this further: <strong>Follow</strong> keeps specific callsigns in view so you can catch them when they appear, while <strong>Excluded prefixes</strong> skips whole prefixes you do not want the automation to answer.',

  op_modifier_title: 'CQ Modifier',
  op_modifier_text:  'A CQ can carry a geographic or activity modifier — <code>CQ DX</code>, <code>CQ EU</code>, <code>CQ TEST</code> and so on. The list is editable, so you can add the modifier a particular event calls for instead of being limited to the built-in entries.',

  op_contest_title: 'Contest Mode (Grid Exchange)',
  op_contest_text:  'Some contests exchange grid locators instead of signal reports — ARRL Digital, WW Digi and CQ WW VHF among them. Enable <strong>Contest mode (grid exchange)</strong> in Settings and the second transmission sends <code>R</code> followed by your own grid, in place of the usual report:',
  op_contest_seq: `
    <ol>
      <li>You call <code>CQ TEST</code> — switching the mode on sets the CQ modifier to <code>TEST</code> for you, and restores the previous value when you switch it off.</li>
      <li>The other station answers with their grid.</li>
      <li>You send <code>R</code> plus your grid instead of a signal report.</li>
      <li>The other station confirms and the QSO is logged.</li>
    </ol>`,
  op_contest_note: 'The exchange is one transmit slot shorter than an ordinary FT8 QSO, so contest runs go faster. Incoming <code>R + grid</code> messages are always understood whether or not this switch is on — it only changes what <em>you</em> send.',

  op_fd_title: 'Field Day Mode (ARRL Field Day)',
  op_fd_text:  'ARRL Field Day exchanges a <strong>number of transmitters, a class and a section</strong> (for example <code>10C IN</code>) rather than a signal report. Switch on <strong>Field Day mode (ARRL FD exchange)</strong> under Settings → Basic information and the 2nd and 3rd transmissions carry that exchange in place of the report.',
  op_fd_steps: `
    <ol>
      <li>Settings → Basic information → turn on <strong>Field Day mode (ARRL FD exchange)</strong>.</li>
      <li>Enter the <strong>number of transmitters</strong> (1–32) and choose your <strong>class</strong> (A–F) and <strong>section</strong>.</li>
      <li>A live <strong>"Will send: …"</strong> preview appears below the switch — check it once against what you intend to send. If no section is chosen the app says so rather than sending something incomplete.</li>
      <li>Turning it on sets the <strong>CQ modifier to FD</strong> automatically and restores your previous value when you turn it off.</li>
    </ol>`,
  op_fd_seq: `
    <table>
      <tr><th>Slot</th><th>Sender</th><th>Message</th><th>Meaning</th></tr>
      <tr><td>1</td><td>Them</td><td><code>CQ FD W1AW EM37</code></td><td>A Field Day CQ</td></tr>
      <tr><td>2</td><td><strong>You</strong></td><td><code>W1AW BV6LC 10C IN</code></td><td>"10 transmitters, class C, section IN" — in place of the report</td></tr>
      <tr><td>3</td><td>Them</td><td><code>BV6LC W1AW R 2B EMA</code></td><td>"Roger; 2 transmitters, class B, section EMA"</td></tr>
      <tr><td>4</td><td><strong>You</strong></td><td><code>W1AW BV6LC RR73</code></td><td>Complete — logged automatically</td></tr>
    </table>`,
  op_fd_note: 'A few limits worth knowing. <strong>Class must be A–F and the transmitter count 1–32</strong>: that is the capacity of the protocol itself, which is why the Winter Field Day classes I, O and H cannot be sent. <strong>Receiving</strong> a Field Day exchange always works regardless of this switch — it only changes what <em>you</em> send. In the log, the other station\'s class and section are stored in the ADIF <code>CLASS</code> and <code>ARRL_SECT</code> fields, both visible and editable in the QSO edit dialog, and the mode filter in the export dialog offers <strong>Field Day only</strong> so you can submit just those contacts (the option appears once you have Field Day contacts to export).',

  op_single_title: 'Calling a Single Station (Swipe Left)',
  op_single_text:  'Swiping left on a row in the decode list means "call this one station". If transmission was <strong>off</strong> at that moment, the app enters <strong>single-QSO mode</strong>: it stops transmitting once that contact finishes and will not pick up other stations calling you in the meantime. If transmission was <strong>already on</strong> when you swiped, the normal automatic sequence continues unchanged — that is what you asked for by having it running. If the station never replies, the <strong>No response</strong> limit still applies and transmission stops.',

  op_watchdog_title: 'TX Watchdog',
  op_watchdog_text:  'The TX watchdog automatically stops transmitting after a configurable time limit (in minutes) to prevent accidentally prolonged transmission. Set the limit in Settings → TX watchdog. Set to 0 to disable.',

  op_noresponse_title: 'No Response Limit',
  op_noresponse_text:  'If the called station does not reply after a set number of TX cycles, the app switches to calling CQ to look for someone else, rather than stopping transmission altogether. Configure the limit in Settings → No response.',

  op_freetext_title: 'Free Text Mode',
  op_freetext_text:  'Tap the free text icon in the Calling tab to enter a custom message up to 13 characters. Free text bypasses the standard FT8 QSO sequence — use it for special event messages or announcements. Switch back to Standard Message Mode to resume normal QSOs.',

  op_modeswitch_title: 'Switching Between FT8 / FT4 / FT2',
  op_modeswitch_text:  'The mode can be changed in Settings → Basic Information under <strong>FT8/FT4/FT2 mode</strong>, or straight from the <strong>quick mode</strong> button in the floating window. <strong>The radio then retunes to the frequency for that mode by itself</strong> — there is no need to pick the frequency again afterwards. Switching from FT8 to FT4 on 20 m, for instance, moves the radio from 14.074 to 14.080 on its own. (This applies when PTT control is CAT, RTS or DTR; VOX has no control channel, so the radio still has to be retuned by hand.)',

  op_ft2_title: 'FT2 (Experimental)',
  op_ft2_text:  'FT8TW includes early support for FT2, a faster mode derived from FT4. FT2 should still be treated as experimental: it has not yet been proven over real contacts, so approach it as something to try rather than rely on.',
},

'zh-TW': {
  op_title: '操作 FT8 / FT4',

  op_what_title: '什麼是 FT8／FT4／FT2',
  op_what_text:  'FT8 是一種<strong>弱訊號數位模式</strong>，由 K1JT 與 K9AN 於 2017 年發表，如今是短波上最多人使用的模式。它的設計目標很單純：<strong>在人耳完全聽不到訊號的條件下，仍然完成一次最基本的通聯</strong>。為了做到這件事，它捨棄了很多東西：',
  op_what_list: `
    <ul>
      <li><strong>訊息很短、格式固定</strong> — 一則訊息只裝得下呼號、網格與訊號報告這類內容，不能自由聊天（自由文字最多 13 個字元）。想打字對談請看<a href="js8.html">「JS8 聊天模式」</a>。</li>
      <li><strong>時間切成固定的時隙</strong> — FT8 每 15 秒一輪，一方在偶數時隙送、另一方在奇數時隙送，輪流交替。因此<strong>手機時間必須準</strong>（誤差最好在 1 秒內），否則雙方對不上。</li>
      <li><strong>訊號很窄</strong> — 一個訊號只佔約 50 Hz，所以同一個頻率上可以有數十台電台各據一個音訊頻率同時工作，彼此不打架。這就是瀑布圖上會看到一整排訊號的原因。</li>
      <li><strong>換來的是靈敏度</strong> — 典型可解出到約 −21 dB 訊雜比，比人耳能辨識的門檻還低約 20 dB。這正是小功率、簡易天線也能跨洲通聯的原因。</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>模式</th><th>時隙長度</th><th>說明</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 秒</td><td>最通用，靈敏度最好。不確定該用哪個就用它</td></tr>
      <tr><td><strong>FT4</strong></td><td>7.5 秒</td><td>為競賽設計，速度加倍、靈敏度略降。適合訊號好、要拚數量時</td></tr>
      <tr><td><strong>FT2</strong></td><td>3.75 秒</td><td>FT8TW 的實驗性模式，比 FT4 再快一倍。尚未在實際通聯中獲得驗證</td></tr>
    </table>`,

  op_quick_title: '快速上手：完成第一次 FT8 通聯',
  op_quick_text:  '最快的入門方式不是自己呼叫 CQ，而是<strong>去回應別人的 CQ</strong>——對方已經在等人回應，成功率高得多。',
  op_quick_steps: `
    <ol>
      <li>設置 → 基本資訊，填好<strong>我的呼號</strong>與<strong>我的位置</strong>（網格）。<strong>沒填呼號不能發射。</strong></li>
      <li>確認電台設在 <strong>USB 模式</strong>（上旁頻），而且已經連上（見<a href="connection.html">「電台連線」</a>）。</li>
      <li>回到<strong>解碼</strong>分頁開始解碼。等一兩個時隙，清單就會陸續出現訊息。</li>
      <li>找一列<strong>綠色</strong>的訊息——綠色代表那台電台正在呼叫 CQ，也就是正在等人回應。<strong>點它一下</strong>選為目標。</li>
      <li>切到<strong>呼叫</strong>分頁，按下發射。</li>
      <li>接下來完全自動：程式會照著下面的順序一來一往，收尾後自動寫進通聯記錄。</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>時隙</th><th>誰在送</th><th>送出的內容</th><th>意思</th></tr>
      <tr><td>1</td><td>對方</td><td><code>CQ BX1AA PL04</code></td><td>「我是 BX1AA，在 PL04，有人嗎」</td></tr>
      <tr><td>2</td><td><strong>您</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>「BX1AA，我是 BV6LC，在 PL03」</td></tr>
      <tr><td>3</td><td>對方</td><td><code>BV6LC BX1AA −09</code></td><td>「收到你了，你的訊號 −9 dB」</td></tr>
      <tr><td>4</td><td><strong>您</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>「收到你的報告（R），你的訊號 −12 dB」</td></tr>
      <tr><td>5</td><td>對方</td><td><code>BV6LC BX1AA RR73</code></td><td>「都收到了，再見」</td></tr>
      <tr><td>6</td><td><strong>您</strong></td><td><code>BX1AA BV6LC 73</code></td><td>「再見」— 通聯完成，自動記錄</td></tr>
    </table>`,
  op_quick_note: '整趟大約一分半鐘。訊號報告是 <strong>dB 值</strong>（例如 −09、−12），負得愈多代表訊號愈弱，合法範圍是 −30 到 +20——這與 SSB 講的 59 那種 RST 不是同一回事。若對方一直沒回應，程式會依<strong>沒回應</strong>的設定次數放棄，改去找下一個對象，不必守在旁邊等。',

  op_rx_title:      '接收',
  op_rx_text:       '點選<strong>解碼</strong>分頁的<strong>開始解碼</strong>。程式會開始錄製音訊，並在每個 15 秒（FT8）或 7.5 秒（FT4）時隙開始時進行解碼。解碼到的電台會顯示在解碼清單中。',
  op_rx_tips_label: '接收品質提示：',
  op_rx_tips: `
    <ul>
      <li>電台請設定為 <strong>USB 模式</strong>（上旁頻）。勿使用 LSB、AM 或 FM。</li>
      <li>將音訊通帶中心設在 <strong>1500 Hz</strong> 附近效果最佳，有效音訊範圍為 200–2700 Hz。</li>
      <li>調整電台的 AF 增益，確保音訊訊號強勁但不失真。失真會造成解碼失敗。</li>
      <li>弱訊號 DX 情況下使用<strong>多次</strong>解碼模式。</li>
      <li>在頻譜畫面開啟<strong>噪聲抑制（DeNoise）</strong>以降低寬頻雜訊。</li>
    </ul>`,

  op_perf_title:  '解碼效能',
  op_perf_intro:  `<p>FT8TW 的解碼器在 2026 年 8 月做了兩項改進：<strong>連續域精細對齊</strong>（準確鎖定每個訊號的時間與頻率，不再受限於粗略的格點）與<strong>訊號相減後重解</strong>（把已解出的強訊號從音訊中移除，讓被蓋在底下的弱訊號浮現）。</p>
    <p>下面的數字是在同一支手機、同一批測試音檔上實測的結果。測試音檔以 WSJT-X 的 <code>ft8sim</code> 產生，涵蓋三種情境：</p>
    <ul>
      <li><strong>單一訊號</strong>——每個音檔只有一個訊號，測的是靈敏度，也就是能收到多弱的訊號</li>
      <li><strong>多台分散</strong>——每個音檔 10 台，頻率彼此分開、互不重疊</li>
      <li><strong>多台密集</strong>——每個音檔 20 台，其中一半被相隔僅 20 Hz 的強台蓋住；這最接近熱門 DX 或 POTA 頻率擠成一團的情況</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>版本</th><th>模式</th><th>單一訊號<br>（共 300）</th><th>多台分散<br>（共 300）</th><th>多台密集<br>（共 600）</th></tr>
      <tr><td>FT8CN</td><td>快速</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>深度</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW （舊版）</td><td>平衡</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>快速</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>平衡</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>深度</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>單一訊號的情況下，新版比舊版多解出約 14～18&nbsp;% 的訊息。</li>
      <li>多台密集的差距最大：舊版只解得出強台（300），新版連被蓋在底下的弱台也解得出來（約 500）。</li>
      <li>表中全部是<em>正確</em>解出的訊息數。所有測試<strong>都沒有出現錯誤解碼</strong>。</li>
      <li>解碼時間變長了，但仍遠低於 FT8 的 15 秒週期——深度模式最多約 0.3&nbsp;秒。</li>
    </ul>`,
  op_perf_limits: `<strong>關於這些數字：</strong>測試音檔全部由電腦合成，不包含實際電波傳播的多重路徑與衰落，因此在空中的差異可能更大或更小。<em>多台密集</em>欄標示 <strong>*</strong> 的數字只涵蓋 FT8CN 的核心解碼器——它的 App 另有一層本測試無法觸及的處理，所以該欄低估了 FT8CN。`,

  op_tx_title: '建立通聯',
  op_tx_text:  '選定目標電台後，FT8 通聯流程將全自動進行：',
  op_tx_seq: `
    <ol>
      <li>在<strong>解碼</strong>分頁，點選正在呼叫 CQ 的電台以選定為目標。</li>
      <li>切換至<strong>呼叫</strong>頁面，點選<strong>發射</strong>開始通聯。</li>
      <li>程式自動依序完成 FT8 通聯流程：<br>
        <code>回應 CQ → 訊號報告 → RRR → 73</code></li>
      <li>通聯完成後自動記錄至日誌。</li>
    </ol>`,

  op_autocq_title: '自動回應 CQ',
  op_autocq_text:  '在呼叫頁面開啟<strong>自動回應 CQ</strong>，程式將自動回應收到的 CQ 呼叫，無需手動操作。在設置 → 回應 CQ 方案中選擇優先策略：',
  op_autocq_opts: `
    <ul>
      <li><strong>距離短、強度強優先</strong> — 優先回應訊號強且距離近的電台</li>
      <li><strong>遠距優先</strong> — 優先回應最遠的電台（適合距離獎項追求者）</li>
      <li><strong>近距優先</strong> — 優先回應最近的電台</li>
      <li><strong>區域最多優先(ITU/CQ/DX)</strong> — 優先回應呼叫數量最多的分區</li>
      <li><strong>ITU 區域優先</strong>／<strong>CQ 區域優先</strong>／<strong>Dx 區域優先</strong> — 三個各自獨立的選項，分別依 ITU 分區、CQ 分區或 DXCC 排序（適合獎項追求）</li>
    </ul>`,
  op_autocq_filter: '在設置中使用<strong>排除已通聯</strong>，可自動跳過在選定時間窗口內已通聯過的電台：<strong>關閉（不排除）</strong>、<strong>所有</strong>、<strong>1 小時內</strong>、<strong>4 小時內</strong>、<strong>8 小時內</strong>、<strong>今天</strong>、<strong>30 天內</strong>或 <strong>365 天內</strong>。',

  op_autocq_lists: '另有兩份呼號清單可進一步調整：<strong>關注的呼號</strong>會讓指定的呼號持續留在視線內，一出現就能抓到；<strong>排除的呼號前綴</strong>則整批跳過您不想讓自動回應去回的前綴。',

  op_modifier_title: 'CQ 對象（修飾詞）',
  op_modifier_text:  'CQ 呼叫可以附加地理或活動修飾詞，例如 <code>CQ DX</code>、<code>CQ EU</code>、<code>CQ TEST</code>。這份清單可以自行編輯，遇到特定活動需要的修飾詞可以自己加，不受內建項目限制。',

  op_contest_title: '競賽模式（交換網格）',
  op_contest_text:  '部分競賽交換的是網格座標而非訊號報告，例如 ARRL Digital、WW Digi 及 CQ WW VHF。在設置中開啟<strong>競賽模式（交換網格）</strong>後，第二個發射時段會改送 <code>R</code> 加上自己的網格，取代原本的訊號報告：',
  op_contest_seq: `
    <ol>
      <li>您呼叫 <code>CQ TEST</code>——開啟此模式時會自動把 CQ 對象設為 <code>TEST</code>，關閉時再還原成原本的值。</li>
      <li>對方以自己的網格回應。</li>
      <li>您送出 <code>R</code> 加上自己的網格，而不是訊號報告。</li>
      <li>對方確認後完成通聯並記錄。</li>
    </ol>`,
  op_contest_note: '這樣的交換比一般 FT8 通聯少一個發射時段，競賽時節奏更快。收到的 <code>R + 網格</code> 訊息無論此開關是否開啟都能正確辨識——它只改變<em>您自己</em>送出的內容。',

  op_fd_title: '野外日模式（ARRL Field Day）',
  op_fd_text:  'ARRL Field Day 交換的不是訊號報告，而是<strong>台數＋等級＋分區</strong>（例如 <code>10C IN</code>）。在設置 → 基本資訊開啟<strong>野外日模式（ARRL FD 交換）</strong>後，第 2、3 則發射會改送這組交換內容取代訊號報告。',
  op_fd_steps: `
    <ol>
      <li>設置 → 基本資訊 → 開啟<strong>野外日模式（ARRL FD 交換）</strong>。</li>
      <li>填入<strong>發射台數</strong>（1~32）、選擇<strong>等級</strong>（A~F）與<strong>分區</strong>。</li>
      <li>開關下方會即時顯示<strong>「將送出：…」</strong>，請對照確認一次。分區沒選會直接提示無法送出。</li>
      <li>開啟時 <strong>CQ 對象自動改為 FD</strong>，關閉時還原成原本的值，不必自己去改。</li>
    </ol>`,
  op_fd_seq: `
    <table>
      <tr><th>時隙</th><th>誰在送</th><th>送出的內容</th><th>意思</th></tr>
      <tr><td>1</td><td>對方</td><td><code>CQ FD W1AW EM37</code></td><td>野外日的 CQ</td></tr>
      <tr><td>2</td><td><strong>您</strong></td><td><code>W1AW BV6LC 10C IN</code></td><td>「我是 10 台、C 級、IN 分區」——取代訊號報告</td></tr>
      <tr><td>3</td><td>對方</td><td><code>BV6LC W1AW R 2B EMA</code></td><td>「收到（R），我是 2 台、B 級、EMA 分區」</td></tr>
      <tr><td>4</td><td><strong>您</strong></td><td><code>W1AW BV6LC RR73</code></td><td>完成，自動寫進通聯記錄</td></tr>
    </table>`,
  op_fd_note: '幾個限制與注意事項：<strong>等級只能是 A~F、台數只能是 1~32</strong>，這是協定本身的容量上限，所以 Winter Field Day 的 I／O／H 等級送不出去。<strong>收到</strong>對方的野外日交換一律能正確辨識，不受這個開關影響——它只改變<em>您自己</em>送出的內容。通聯記錄方面，對方的等級與分區會存進 ADIF 的 <code>CLASS</code> 與 <code>ARRL_SECT</code> 欄位，兩者都可以在 QSO 編輯畫面裡查看與修改；匯出時在模式篩選裡選<strong>「僅野外日」</strong>就能單獨挑出野外日的紀錄交件（有野外日紀錄時才會出現這個選項）。',

  op_single_title: '只呼叫一個人（左滑）',
  op_single_text:  '在解碼清單上<strong>左滑</strong>一列的語意是「我只要呼叫這一個人」。若左滑當下發射是<strong>關閉</strong>的，程式會進入<strong>單次通聯模式</strong>：這一場結束就自動停止發射，期間也不會接手其他呼叫您的人。若左滑時發射<strong>已經開著</strong>，則維持原本的自動流程不變——那代表您本來就要它持續運作。對方一直沒回應時，仍依<strong>沒回應</strong>的設定次數收尾並停止發射。',

  op_watchdog_title: '發射監管（TX Watchdog）',
  op_watchdog_text:  '發射監管功能在設定的分鐘數後自動停止發射，防止意外長時間佔用頻道。在設置 → 發射監管中設定時間限制，設為 0 表示停用。',

  op_noresponse_title: '沒回應次數限制',
  op_noresponse_text:  '若被呼叫的電台在設定的週期數內均無回應，程式會轉為呼叫 CQ 另尋對象，而不是停掉整個發射。在設置 → 沒回應中設定次數限制。',

  op_freetext_title: '自定義訊息模式',
  op_freetext_text:  '點選呼叫頁面的自定義訊息圖示，輸入最多 13 個字元的自由文字。自定義訊息會跳過標準 FT8 通聯流程，適用於特殊活動或公告。點選「標準訊息模式」可返回正常通聯。',

  op_modeswitch_title: '切換 FT8 / FT4 / FT2',
  op_modeswitch_text:  '模式可以在設置 → 基本資訊的 <strong>FT8/FT4/FT2 模式</strong>切換，也可以用浮動視窗的<strong>快速切換模式</strong>按鈕直接切。<strong>切換之後電台會自動跟著換到該模式對應的頻率</strong>，不必再自己去選一次頻率——例如從 FT8 切到 FT4，電台會自己從 14.074 移到 14.080。（使用 CAT／RTS／DTR 控制時才會自動換頻；VOX 沒有可控制的通道，仍需手動轉台。）',

  op_ft2_title: 'FT2（實驗性）',
  op_ft2_text:  'FT8TW 已初步支援 FT2，這是由 FT4 衍生、速度更快的模式。FT2 目前仍應視為實驗性功能：尚未在實際通聯中獲得驗證，建議以嘗試的心態使用，而非倚賴它。',
},

'zh-CN': {
  op_title: '操作 FT8 / FT4',

  op_what_title: '什么是 FT8／FT4／FT2',
  op_what_text:  'FT8 是一种<strong>弱信号数字模式</strong>，由 K1JT 与 K9AN 于 2017 年发表，如今是短波上最多人使用的模式。它的设计目标很单纯：<strong>在人耳完全听不到信号的条件下，仍然完成一次最基本的通联</strong>。为了做到这件事，它舍弃了很多东西：',
  op_what_list: `
    <ul>
      <li><strong>消息很短、格式固定</strong> — 一则消息只装得下呼号、网格与信号报告这类内容，不能自由聊天（自由文本最多 13 个字符）。想打字对谈请看<a href="js8.html">「JS8 聊天模式」</a>。</li>
      <li><strong>时间切成固定的时隙</strong> — FT8 每 15 秒一轮，一方在偶数时隙送、另一方在奇数时隙送，轮流交替。因此<strong>手机时间必须准</strong>（误差最好在 1 秒内），否则双方对不上。</li>
      <li><strong>信号很窄</strong> — 一个信号只占约 50 Hz，所以同一个频率上可以有数十台电台各据一个音频频率同时工作，彼此不打架。这就是瀑布图上会看到一整排信号的原因。</li>
      <li><strong>换来的是灵敏度</strong> — 典型可解出到约 −21 dB 信噪比，比人耳能辨识的门槛还低约 20 dB。这正是小功率、简易天线也能跨洲通联的原因。</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>模式</th><th>时隙长度</th><th>说明</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 秒</td><td>最通用，灵敏度最好。不确定该用哪个就用它</td></tr>
      <tr><td><strong>FT4</strong></td><td>7.5 秒</td><td>为竞赛设计，速度加倍、灵敏度略降。适合信号好、要拼数量时</td></tr>
      <tr><td><strong>FT2</strong></td><td>3.75 秒</td><td>FT8TW 的实验性模式，比 FT4 再快一倍。尚未在实际通联中获得验证</td></tr>
    </table>`,

  op_quick_title: '快速上手：完成第一次 FT8 通联',
  op_quick_text:  '最快的入门方式不是自己呼叫 CQ，而是<strong>去回应别人的 CQ</strong>——对方已经在等人回应，成功率高得多。',
  op_quick_steps: `
    <ol>
      <li>设置 → 基本信息，填好<strong>我的呼号</strong>与<strong>我的位置</strong>（网格）。<strong>没填呼号不能发射。</strong></li>
      <li>确认电台设在 <strong>USB 模式</strong>（上边带），而且已经连上（见<a href="connection.html">「电台连接」</a>）。</li>
      <li>回到<strong>解码</strong>分页开始解码。等一两个时隙，列表就会陆续出现消息。</li>
      <li>找一行<strong>绿色</strong>的消息——绿色代表那台电台正在呼叫 CQ，也就是正在等人回应。<strong>点它一下</strong>选为目标。</li>
      <li>切到<strong>呼叫</strong>分页，按下发射。</li>
      <li>接下来完全自动：程序会照着下面的顺序一来一往，收尾后自动写进通联日志。</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>时隙</th><th>谁在送</th><th>送出的内容</th><th>意思</th></tr>
      <tr><td>1</td><td>对方</td><td><code>CQ BX1AA PL04</code></td><td>「我是 BX1AA，在 PL04，有人吗」</td></tr>
      <tr><td>2</td><td><strong>您</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>「BX1AA，我是 BV6LC，在 PL03」</td></tr>
      <tr><td>3</td><td>对方</td><td><code>BV6LC BX1AA −09</code></td><td>「收到你了，你的信号 −9 dB」</td></tr>
      <tr><td>4</td><td><strong>您</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>「收到你的报告（R），你的信号 −12 dB」</td></tr>
      <tr><td>5</td><td>对方</td><td><code>BV6LC BX1AA RR73</code></td><td>「都收到了，再见」</td></tr>
      <tr><td>6</td><td><strong>您</strong></td><td><code>BX1AA BV6LC 73</code></td><td>「再见」— 通联完成，自动记录</td></tr>
    </table>`,
  op_quick_note: '整趟大约一分半钟。信号报告是 <strong>dB 值</strong>（例如 −09、−12），负得越多代表信号越弱，合法范围是 −30 到 +20——这与 SSB 讲的 59 那种 RST 不是同一回事。若对方一直没回应，程序会依<strong>无回应</strong>的设定次数放弃，改去找下一个对象，不必守在旁边等。',

  op_modeswitch_title: '切换 FT8 / FT4 / FT2',
  op_modeswitch_text:  '模式可以在设置 → 基本信息的 <strong>FT8/FT4/FT2 模式</strong>切换，也可以用悬浮窗口的<strong>快速切换模式</strong>按钮直接切。<strong>切换之后电台会自动跟着换到该模式对应的频率</strong>，不必再自己去选一次频率——例如从 FT8 切到 FT4，电台会自己从 14.074 移到 14.080。（使用 CAT／RTS／DTR 控制时才会自动换频；VOX 没有可控制的通道，仍需手动转台。）',

  op_rx_title:      '接收',
  op_rx_text:       '点击<strong>解码</strong>分页的<strong>开始解码</strong>。程序会开始录制音频，并在每个 15 秒（FT8）或 7.5 秒（FT4）时隙开始时进行解码。解码到的电台会显示在解码列表中。',
  op_rx_tips_label: '接收质量提示：',
  op_rx_tips: `
    <ul>
      <li>电台请设置为 <strong>USB 模式</strong>（上边带）。勿使用 LSB、AM 或 FM。</li>
      <li>将音频通带中心设在 <strong>1500 Hz</strong> 附近效果最佳，有效音频范围为 200–2700 Hz。</li>
      <li>调整电台的 AF 增益，确保音频信号强劲但不失真。失真会造成解码失败。</li>
      <li>弱信号 DX 情况下使用<strong>多次</strong>解码模式。</li>
      <li>在频谱界面开启<strong>噪声抑制（DeNoise）</strong>以降低宽带噪声。</li>
    </ul>`,

  op_perf_title:  '解码效能',
  op_perf_intro:  `<p>FT8TW 的解码器在 2026 年 8 月做了两项改进：<strong>连续域精细对齐</strong>（准确锁定每个信号的时间与频率，不再受限于粗略的格点）与<strong>信号相减后重解</strong>（把已解出的强信号从音频中移除，让被盖在底下的弱信号浮现）。</p>
    <p>下面的数字是在同一部手机、同一批测试音频上实测的结果。测试音频以 WSJT-X 的 <code>ft8sim</code> 生成，涵盖三种情境：</p>
    <ul>
      <li><strong>单一信号</strong>——每个音频只有一个信号，测的是灵敏度，也就是能收到多弱的信号</li>
      <li><strong>多台分散</strong>——每个音频 10 台，频率彼此分开、互不重叠</li>
      <li><strong>多台密集</strong>——每个音频 20 台，其中一半被相隔仅 20 Hz 的强台盖住；这最接近热门 DX 或 POTA 频率挤成一团的情况</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>版本</th><th>模式</th><th>单一信号<br>（共 300）</th><th>多台分散<br>（共 300）</th><th>多台密集<br>（共 600）</th></tr>
      <tr><td>FT8CN</td><td>快速</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>深度</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW （旧版）</td><td>平衡</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>快速</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>平衡</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW （新版）</strong></td><td>深度</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>单一信号的情况下，新版比旧版多解出约 14～18&nbsp;% 的消息。</li>
      <li>多台密集的差距最大：旧版只解得出强台（300），新版连被盖在底下的弱台也解得出来（约 500）。</li>
      <li>表中全部是<em>正确</em>解出的消息数。所有测试<strong>都没有出现错误解码</strong>。</li>
      <li>解码时间变长了，但仍远低于 FT8 的 15 秒周期——深度模式最多约 0.3&nbsp;秒。</li>
    </ul>`,
  op_perf_limits: `<strong>关于这些数字：</strong>测试音频全部由计算机合成，不包含实际电波传播的多径与衰落，因此在空中的差异可能更大或更小。<em>多台密集</em>栏标示 <strong>*</strong> 的数字只涵盖 FT8CN 的核心解码器——它的 App 另有一层本测试无法触及的处理，所以该栏低估了 FT8CN。`,

  op_tx_title: '建立通联',
  op_tx_text:  '选定目标电台后，FT8 通联流程将全自动进行：',
  op_tx_seq: `
    <ol>
      <li>在<strong>解码</strong>分页，点击正在呼叫 CQ 的电台以选定为目标。</li>
      <li>切换至<strong>呼叫</strong>页面，点击<strong>发射</strong>开始通联。</li>
      <li>程序自动依次完成 FT8 通联流程：<br>
        <code>回应 CQ → 信号报告 → RRR → 73</code></li>
      <li>通联完成后自动记录至日志。</li>
    </ol>`,

  op_autocq_title: '自动回应 CQ',
  op_autocq_text:  '在呼叫页面开启<strong>自动回应 CQ</strong>，程序将自动回应收到的 CQ 呼叫，无需手动操作。在设置 → 回应 CQ 方案中选择优先策略：',
  op_autocq_opts: `
    <ul>
      <li><strong>距离短、强度强优先</strong> — 优先回应信号强且距离近的电台</li>
      <li><strong>远距优先</strong> — 优先回应最远的电台（适合距离奖项追求者）</li>
      <li><strong>近距优先</strong> — 优先回应最近的电台</li>
      <li><strong>区域最多优先(ITU/CQ/DX)</strong> — 优先回应呼叫数量最多的分区</li>
      <li><strong>ITU 区域优先</strong>／<strong>CQ 区域优先</strong>／<strong>Dx 区域优先</strong> — 三个各自独立的选项，分别依 ITU 分区、CQ 分区或 DXCC 排序（适合奖项追求）</li>
    </ul>`,
  op_autocq_filter: '在设置中使用<strong>排除已通联</strong>，可自动跳过在选定时间窗口内已通联过的电台：<strong>关闭（不排除）</strong>、<strong>所有</strong>、<strong>1 小时内</strong>、<strong>4 小时内</strong>、<strong>8 小时内</strong>、<strong>今天</strong>、<strong>30 天内</strong>或 <strong>365 天内</strong>。',

  op_autocq_lists: '另有两份呼号列表可进一步调整：<strong>关注的呼号</strong>会让指定的呼号持续留在视线内，一出现就能抓到；<strong>排除的呼号前缀</strong>则整批跳过您不想让自动回应去回的前缀。',

  op_modifier_title: 'CQ 对象（修饰词）',
  op_modifier_text:  'CQ 呼叫可以附加地理或活动修饰词，例如 <code>CQ DX</code>、<code>CQ EU</code>、<code>CQ TEST</code>。这份列表可以自行编辑，遇到特定活动需要的修饰词可以自己加，不受内置项目限制。',

  op_contest_title: '竞赛模式（交换网格）',
  op_contest_text:  '部分竞赛交换的是网格坐标而非信号报告，例如 ARRL Digital、WW Digi 及 CQ WW VHF。在设置中开启<strong>竞赛模式（交换网格）</strong>后，第二个发射时隙会改送 <code>R</code> 加上自己的网格，取代原本的信号报告：',
  op_contest_seq: `
    <ol>
      <li>您呼叫 <code>CQ TEST</code>——开启此模式时会自动把 CQ 对象设为 <code>TEST</code>，关闭时再还原成原本的值。</li>
      <li>对方以自己的网格回应。</li>
      <li>您送出 <code>R</code> 加上自己的网格，而不是信号报告。</li>
      <li>对方确认后完成通联并记录。</li>
    </ol>`,
  op_contest_note: '这样的交换比一般 FT8 通联少一个发射时隙，竞赛时节奏更快。收到的 <code>R + 网格</code> 消息无论此开关是否开启都能正确识别——它只改变<em>您自己</em>送出的内容。',

  op_watchdog_title: '发射监管（TX Watchdog）',
  op_watchdog_text:  '发射监管功能在设定的分钟数后自动停止发射，防止意外长时间占用频道。在设置 → 发射监管中设定时间限制，设为 0 表示停用。',

  op_noresponse_title: '无回应次数限制',
  op_noresponse_text:  '若被呼叫的电台在设定的周期数内均无回应，程序会转为呼叫 CQ 另寻对象，而不是停掉整个发射。在设置 → 无回应中设定次数限制。',

  op_freetext_title: '自定义消息模式',
  op_freetext_text:  '点击呼叫页面的自定义消息图标，输入最多 13 个字符的自由文本。自定义消息会跳过标准 FT8 通联流程，适用于特殊活动或公告。点击「标准消息模式」可返回正常通联。',

  op_ft2_title: 'FT2（实验性）',
  op_ft2_text:  'FT8TW 已初步支持 FT2，这是由 FT4 衍生、速度更快的模式。FT2 目前仍应视为实验性功能：尚未在实际通联中获得验证，建议以尝试的心态使用，而非依赖它。',
},

'ja': {
  op_title: 'FT8 / FT4 の運用',

  op_what_title: 'FT8／FT4／FT2 とは',
  op_what_text:  'FT8 は 2017 年に K1JT と K9AN が発表した<strong>微弱信号用のデジタルモード</strong>で、いまや HF でもっとも使われているモードです。目的ははっきりしています。<strong>耳ではまったく聞こえない信号でも、最低限の交信を成立させること</strong>。そのために多くのものを捨てています。',
  op_what_list: `
    <ul>
      <li><strong>電文は短く、形式は固定</strong> — 1 通に入るのはコールサイン、グリッド、シグナルレポート程度で、自由な会話はできません（フリーテキストは最大 13 文字）。文字で会話したい場合は<a href="js8.html">「JS8 チャットモード」</a>をご覧ください。</li>
      <li><strong>時間が固定のスロットに区切られている</strong> — FT8 は 15 秒ごとに 1 回。一方が偶数スロット、もう一方が奇数スロットで交互に送信します。そのため<strong>端末の時計が正確である必要があります</strong>（誤差 1 秒以内が望ましい）。ずれていると相手とかみ合いません。</li>
      <li><strong>信号が狭い</strong> — 1 つの信号が占める幅は約 50 Hz なので、同じ周波数上で数十局がそれぞれ別の音声周波数で同時に運用できます。ウォーターフォールに信号がずらりと並ぶのはこのためです。</li>
      <li><strong>その代わりに得られるのが感度</strong> — おおむね −21 dB の SN 比まで復号でき、これは耳で聞き分けられる限界よりさらに約 20 dB 低い値です。小電力と簡単なアンテナで大陸間の交信ができるのはこのおかげです。</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>モード</th><th>スロット長</th><th>説明</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 秒</td><td>もっとも一般的で感度も最良。迷ったらこれ</td></tr>
      <tr><td><strong>FT4</strong></td><td>7.5 秒</td><td>コンテスト向け。速度は倍で感度はやや低下。信号が強く数をこなしたいときに</td></tr>
      <tr><td><strong>FT2</strong></td><td>3.75 秒</td><td>FT8TW の実験的モードで、FT4 のさらに倍の速さ。実際の交信ではまだ検証されていません</td></tr>
    </table>`,

  op_quick_title: 'クイックスタート：はじめての FT8 交信',
  op_quick_text:  'いちばん手早いのは自分から CQ を出すことではなく、<strong>誰かの CQ に応答すること</strong>です。相手はすでに応答を待っているので、成功する可能性がずっと高くなります。',
  op_quick_steps: `
    <ol>
      <li>設定 → 基本情報で<strong>自局コール</strong>と<strong>自局GL</strong>（グリッド）を入力します。<strong>コールサインがないと送信できません。</strong></li>
      <li>無線機が <strong>USB モード</strong>（上側波帯）になっていて、接続済みであることを確認します（<a href="connection.html">「無線機との接続」</a>を参照）。</li>
      <li><strong>デコード</strong>タブに戻ってデコードを開始します。1〜2 スロット待つと電文が並び始めます。</li>
      <li><strong>緑色</strong>の行を探します。緑はその局が CQ を出している、つまり応答を待っている状態です。<strong>タップ</strong>して相手に選びます。</li>
      <li><strong>コール</strong>タブに切り替えて送信を開始します。</li>
      <li>あとは自動です。下の順序どおりにやり取りし、終わるとログに自動で記録されます。</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>スロット</th><th>送信側</th><th>送る内容</th><th>意味</th></tr>
      <tr><td>1</td><td>相手</td><td><code>CQ BX1AA PL04</code></td><td>「BX1AA です、PL04 にいます、どなたか」</td></tr>
      <tr><td>2</td><td><strong>あなた</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>「BX1AA、こちら BV6LC、PL03 です」</td></tr>
      <tr><td>3</td><td>相手</td><td><code>BV6LC BX1AA −09</code></td><td>「受信しました、信号は −9 dB」</td></tr>
      <tr><td>4</td><td><strong>あなた</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>「レポート了解（R）、そちらは −12 dB」</td></tr>
      <tr><td>5</td><td>相手</td><td><code>BV6LC BX1AA RR73</code></td><td>「すべて受信しました、さようなら」</td></tr>
      <tr><td>6</td><td><strong>あなた</strong></td><td><code>BX1AA BV6LC 73</code></td><td>「さようなら」— 交信成立、自動記録</td></tr>
    </table>`,
  op_quick_note: '全体で 1 分半ほどです。シグナルレポートは <strong>dB の値</strong>（−09、−12 など）で、マイナスが大きいほど弱く、有効範囲は −30〜+20 です。SSB でいう 59 のような RST とは別物です。相手から応答がない場合は、<strong>応答なし</strong>で設定した回数で見切りをつけて次の相手を探すので、そばで見ている必要はありません。',

  op_modeswitch_title: 'FT8 / FT4 / FT2 の切り替え',
  op_modeswitch_text:  'モードは設定 → 基本情報の <strong>FT8/FT4/FT2 モード</strong>で切り替えられるほか、フローティングウィンドウの<strong>クイックモード切替</strong>ボタンからも直接切り替えられます。<strong>切り替えると無線機もそのモードの周波数へ自動的に移動します</strong>ので、周波数を選び直す必要はありません。たとえば 20 m で FT8 から FT4 にすると、無線機は自分で 14.074 から 14.080 へ移ります。（自動で移動するのは PTT 制御が CAT・RTS・DTR のときです。VOX には制御線がないため、周波数は手動で合わせてください。）',

  op_rx_title:      '受信',
  op_rx_text:       '<strong>デコード</strong>タブで<strong>デコード開始</strong>をタップします。アプリが音声を録音し、15 秒（FT8）または 7.5 秒（FT4）の各スロットの先頭で FT8/FT4 の電文をデコードします。デコードした局はデコードの一覧に表示されます。',
  op_rx_tips_label: '良好な受信のためのヒント:',
  op_rx_tips: `
    <ul>
      <li>無線機は <strong>USB モード</strong>（上側波帯）にしてください。FT8 で LSB・AM・FM は使いません。</li>
      <li>音声の通過帯域の中心を <strong>1500 Hz</strong> 付近に合わせると最良です。有効な音声範囲は 200〜2700 Hz です。</li>
      <li>無線機の AF ゲインを調整し、音声レベルを十分に大きく、かつ歪まない範囲にします。歪むとデコードに失敗します。</li>
      <li>弱い信号の DX には<strong>多回</strong>デコードモードを使います。</li>
      <li>スペクトラム画面で<strong>ノイズ抑制（DeNoise）</strong>を有効にすると広帯域の雑音を抑えられます。</li>
    </ul>`,

  op_perf_title:  'デコード性能',
  op_perf_intro:  `<p>FT8TW のデコーダーは 2026 年 8 月に 2 つの改良が加わりました。<strong>連続領域での精密同期</strong>（粗いグリッドに縛られず、各信号の時刻と周波数を正確に捉える）と、<strong>信号減算後の再デコード</strong>（デコード済みの強い信号を音声から取り除き、その下に隠れていた弱い信号を浮かび上がらせる）です。</p>
    <p>以下の数値は、同じスマートフォンと同じテスト音源で測定したものです。音源は WSJT-X の <code>ft8sim</code> で生成し、3 つの状況を対象としました。</p>
    <ul>
      <li><strong>単一信号</strong>——1 ファイルに 1 信号のみ。感度（どれだけ弱い信号までデコードできるか）を測ります</li>
      <li><strong>複数局・分散</strong>——1 ファイルに 10 局、周波数は互いに十分離れています</li>
      <li><strong>複数局・密集</strong>——1 ファイルに 20 局、うち半数はわずか 20 Hz 隣の強い局に埋もれています。混雑した DX や POTA の周波数に最も近い状況です</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>バージョン</th><th>モード</th><th>単一信号<br>（300 中）</th><th>分散<br>（300 中）</th><th>密集<br>（600 中）</th></tr>
      <tr><td>FT8CN</td><td>高速</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>詳細</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW （旧）</td><td>標準</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW （新）</strong></td><td>高速</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW （新）</strong></td><td>標準</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW （新）</strong></td><td>詳細</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>単一信号では、新版は旧版より約 14〜18&nbsp;% 多くデコードします。</li>
      <li>差が最も大きいのは密集時です。旧版は強い局しかデコードできませんが（300）、新版はその下に隠れた弱い局も拾えます（約 500）。</li>
      <li>表の数値はすべて<em>正しく</em>デコードされたメッセージ数です。いずれの測定でも<strong>誤デコードは 0 件</strong>でした。</li>
      <li>デコード時間は長くなりましたが、FT8 の 15 秒周期に比べればごくわずかで、詳細モードでも最大 0.3&nbsp;秒程度です。</li>
    </ul>`,
  op_perf_limits: `<strong>この数値について：</strong>テスト音源はすべてコンピューター生成で、マルチパスやフェージングといった実際の伝搬の影響は含まれません。そのため実際の運用では差がこれより大きくも小さくもなり得ます。<em>密集</em>欄の <strong>*</strong> は FT8CN のコアデコーダーのみを測定した値です。同アプリには本テストでは到達できない処理層がもう一段あるため、この欄は FT8CN を低く見積もっています。`,

  op_tx_title: '交信する',
  op_tx_text:  '相手局を選べば、一般的な FT8 の交信は自動的に進みます:',
  op_tx_seq: `
    <ol>
      <li><strong>デコード</strong>タブで CQ を出している局をタップして相手に指定します。</li>
      <li><strong>呼び出し</strong>タブに切り替え、<strong>送信</strong>をタップして送信を始めます。</li>
      <li>アプリが FT8 のシーケンスを自動的に進めます:<br>
        <code>CQ への応答 → シグナルレポート → RRR → 73</code></li>
      <li>交信が完了すると自動的にログへ記録されます。</li>
    </ol>`,

  op_autocq_title: 'CQ への自動応答',
  op_autocq_text:  '呼び出しタブで<strong>CQ 自動応答</strong>を有効にすると、手を触れずに CQ へ応答します。優先条件は 設定 → CQ 応答方式 で選べます:',
  op_autocq_opts: `
    <ul>
      <li><strong>距離が近く信号が強い局を優先</strong> — 強くて近い局を優先します</li>
      <li><strong>グリッド距離：遠い順</strong> — もっとも遠い局を優先します（距離系のアワード向け）</li>
      <li><strong>グリッド距離：近い順</strong> — もっとも近い局を優先します</li>
      <li><strong>ゾーンの局数が多い順 (ITU/CQ/DX)</strong> — 呼んでいる局がもっとも多いゾーンを優先します</li>
      <li><strong>ITU ゾーン優先</strong>／<strong>CQ ゾーン優先</strong>／<strong>Dx ゾーン優先</strong> — それぞれ ITU ゾーン、CQ ゾーン、DXCC で並べ替える 3 つの独立した選択肢です（アワード狙いに向きます）</li>
    </ul>`,
  op_autocq_filter: '設定の<strong>交信済みを除外</strong>を使うと、選んだ期間内にすでに交信した局を自動的に飛ばします。<strong>オフ</strong>、<strong>すべて</strong>、<strong>1 時間</strong>、<strong>4 時間</strong>、<strong>8 時間</strong>、<strong>今日</strong>、<strong>30 日</strong>、<strong>365 日</strong>から選べます。',

  op_autocq_lists: 'さらに 2 つのコールサイン一覧で細かく調整できます。<strong>フォロー</strong>は指定した局を見失わないように表示し続け、<strong>除外プリフィックス</strong>は自動応答させたくないプリフィックスをまとめて飛ばします。',

  op_modifier_title: 'CQ の対象（修飾語）',
  op_modifier_text:  'CQ には地域や運用の修飾語を付けられます（<code>CQ DX</code>、<code>CQ EU</code>、<code>CQ TEST</code> など）。この一覧は編集できるので、特定のイベントで必要な修飾語を自分で追加でき、初期状態の項目だけに縛られません。',

  op_contest_title: 'コンテストモード（グリッド交換）',
  op_contest_text:  'ARRL Digital、WW Digi、CQ WW VHF など、シグナルレポートではなくグリッドロケーターを交換するコンテストがあります。設定で<strong>コンテストモード（グリッド交換）</strong>を有効にすると、2 回目の送信でレポートの代わりに <code>R</code> と自局のグリッドを送ります:',
  op_contest_seq: `
    <ol>
      <li>自局が <code>CQ TEST</code> を出します。モードを有効にすると CQ の対象が自動的に <code>TEST</code> になり、無効に戻すと元の値に戻ります。</li>
      <li>相手局が自分のグリッドで応答します。</li>
      <li>シグナルレポートではなく <code>R</code> と自局のグリッドを送ります。</li>
      <li>相手局が確認して交信が成立し、ログに記録されます。</li>
    </ol>`,
  op_contest_note: 'この交換は通常の FT8 交信より送信スロットが 1 つ少なく、コンテストではその分テンポが上がります。受信した <code>R + グリッド</code> はこのスイッチの状態に関係なく常に正しく解釈されます。変わるのは<em>自分が送る内容</em>だけです。',

  op_watchdog_title: '送信ウォッチドッグ',
  op_watchdog_text:  '送信ウォッチドッグは設定した分数で送信を自動停止し、意図しない長時間送信を防ぎます。設定 → 送信ウォッチドッグ で上限を指定します。0 にすると無効です。',

  op_noresponse_title: '無応答回数の上限',
  op_noresponse_text:  '呼び出した局が指定した回数の送信サイクル内に応答しない場合、送信を止めるのではなく CQ を出して別の相手を探します。上限は 設定 → 無応答 で設定します。',

  op_freetext_title: 'フリーテキストモード',
  op_freetext_text:  '呼び出しタブのフリーテキストアイコンをタップすると、最大 13 文字の自由な電文を入力できます。フリーテキストは標準の FT8 シーケンスを飛ばすため、記念局の案内などに使います。通常の交信に戻るには標準電文モードに切り替えてください。',

  op_ft2_title: 'FT2（実験的）',
  op_ft2_text:  'FT8TW は FT4 から派生したより高速なモード FT2 に暫定対応しています。FT2 は実際の交信で十分に確かめられていないため、あくまで実験的な機能としてお試しの範囲でご利用ください。',
},

'ru': {
  op_title: 'Работа в FT8 / FT4',

  op_what_title: 'Что такое FT8 / FT4 / FT2',
  op_what_text:  'FT8 — это <strong>цифровой режим для слабых сигналов</strong>, опубликованный в 2017 году K1JT и K9AN и ставший самым используемым режимом на КВ. Его задача узкая: <strong>провести минимальную связь там, где сигнал вообще не слышен на слух</strong>. Ради этого пришлось многим пожертвовать:',
  op_what_list: `
    <ul>
      <li><strong>Сообщения короткие и жёстко форматированные</strong> — в одно сообщение помещаются немногим больше, чем позывные, локатор и рапорт. Свободного разговора нет (произвольный текст — не более 13 знаков). Для переписки см. <a href="js8.html">«Режим чата JS8»</a>.</li>
      <li><strong>Время разбито на фиксированные интервалы</strong> — FT8 работает интервалами по 15 секунд: одна станция передаёт в чётных, другая в нечётных, по очереди. Поэтому <strong>часы телефона должны быть точны</strong> (желательно в пределах секунды), иначе стороны не совпадут.</li>
      <li><strong>Сигнал очень узкий</strong> — около 50 Гц, так что на одной частоте настройки одновременно работают десятки станций, каждая на своей звуковой частоте. Именно поэтому на водопаде виден целый ряд сигналов.</li>
      <li><strong>Взамен получается чувствительность</strong> — обычно декодирование идёт примерно до −21 дБ отношения сигнал/шум, то есть примерно на 20 дБ ниже порога слышимости. Отсюда и связи между континентами при малой мощности и простых антеннах.</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>Режим</th><th>Интервал</th><th>Описание</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 с</td><td>Самый универсальный и самый чувствительный. Если сомневаетесь — выбирайте его</td></tr>
      <tr><td><strong>FT4</strong></td><td>7,5 с</td><td>Создан для соревнований: вдвое быстрее, чувствительность чуть ниже. Подходит, когда сигналы сильные и важно количество</td></tr>
      <tr><td><strong>FT2</strong></td><td>3,75 с</td><td>Экспериментальный режим FT8TW, ещё вдвое быстрее FT4. В реальных связях пока не проверен</td></tr>
    </table>`,

  op_quick_title: 'Быстрый старт: первая связь в FT8',
  op_quick_text:  'Быстрее всего начать не с собственного CQ, а <strong>с ответа на чужой CQ</strong> — там уже ждут ответа, и шансов на успех гораздо больше.',
  op_quick_steps: `
    <ol>
      <li>В настройках → Основные сведения заполните <strong>позывной</strong> и <strong>квадрат</strong>. <strong>Без позывного передача невозможна.</strong></li>
      <li>Убедитесь, что трансивер стоит в режиме <strong>USB</strong> (верхняя боковая) и подключён (см. <a href="connection.html">«Подключение трансивера»</a>).</li>
      <li>Вернитесь на вкладку <strong>декодера</strong> и запустите декодирование. Через один-два интервала список начнёт заполняться.</li>
      <li>Найдите <strong>зелёную</strong> строку — зелёный означает, что станция даёт CQ, то есть ждёт ответа. <strong>Нажмите</strong> на неё, чтобы выбрать корреспондента.</li>
      <li>Перейдите на вкладку <strong>вызова</strong> и включите передачу.</li>
      <li>Дальше всё автоматически: приложение отработает приведённый ниже обмен и по завершении само запишет связь в журнал.</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>Интервал</th><th>Кто передаёт</th><th>Передаётся</th><th>Смысл</th></tr>
      <tr><td>1</td><td>Он</td><td><code>CQ BX1AA PL04</code></td><td>«Здесь BX1AA, квадрат PL04, кто-нибудь?»</td></tr>
      <tr><td>2</td><td><strong>Вы</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>«BX1AA, здесь BV6LC, квадрат PL03»</td></tr>
      <tr><td>3</td><td>Он</td><td><code>BV6LC BX1AA −09</code></td><td>«Принял вас, сигнал −9 дБ»</td></tr>
      <tr><td>4</td><td><strong>Вы</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>«Рапорт принял (R), ваш сигнал −12 дБ»</td></tr>
      <tr><td>5</td><td>Он</td><td><code>BV6LC BX1AA RR73</code></td><td>«Всё принято, до свидания»</td></tr>
      <tr><td>6</td><td><strong>Вы</strong></td><td><code>BX1AA BV6LC 73</code></td><td>«До свидания» — связь завершена и записана</td></tr>
    </table>`,
  op_quick_note: 'Весь обмен занимает около полутора минут. Рапорт — это <strong>значение в дБ</strong> (−09, −12 и т. д.): чем больше минус, тем слабее сигнал; допустимый диапазон от −30 до +20. Это не тот RST вида 59, что используется на SSB. Если корреспондент так и не ответит, приложение прекратит вызов после числа попыток, заданного в параметре <strong>Нет ответа</strong>, и перейдёт к другой станции — сидеть и следить не нужно.',

  op_modeswitch_title: 'Переключение между FT8 / FT4 / FT2',
  op_modeswitch_text:  'Режим меняется в настройках → Основные сведения в пункте <strong>Режим FT8/FT4/FT2</strong>, а также прямо кнопкой <strong>быстрой смены режима</strong> в плавающем окне. <strong>После переключения трансивер сам перестраивается на частоту этого режима</strong> — выбирать её заново не нужно. Например, на 20 м при переходе с FT8 на FT4 трансивер сам уйдёт с 14,074 на 14,080. (Это работает, когда управление PTT идёт через CAT, RTS или DTR; у VOX канала управления нет, поэтому частоту придётся сменить вручную.)',

  op_rx_title:      'Приём',
  op_rx_text:       'Нажмите <strong>Начать декодирование</strong> на вкладке декодера. Приложение записывает звук и декодирует сообщения FT8/FT4 в начале каждого интервала 15 с (FT8) или 7,5 с (FT4). Декодированные станции появляются в списке.',
  op_rx_tips_label: 'Советы для уверенного приёма:',
  op_rx_tips: `
    <ul>
      <li>Установите на трансивере режим <strong>USB</strong> (верхняя боковая). Для FT8 не используйте LSB, AM или FM.</li>
      <li>Лучший результат — когда полоса звука отцентрована около <strong>1500 Гц</strong>. Рабочий диапазон звука 200–2700 Гц.</li>
      <li>Отрегулируйте усиление НЧ так, чтобы сигнал был громким, но без ограничения. Ограничение срывает декодирование.</li>
      <li>В условиях слабых сигналов DX используйте режим декодирования <strong>Deep</strong>.</li>
      <li>Включите <strong>шумоподавление (DeNoise)</strong> на экране спектра, чтобы убрать широкополосный шум.</li>
    </ul>`,

  op_perf_title:  'Качество декодирования',
  op_perf_intro:  `<p>В августе 2026 года декодер FT8TW получил два улучшения: <strong>точную синхронизацию в непрерывной области</strong> (определение точного времени и частоты каждого сигнала вместо привязки к грубой сетке) и <strong>вычитание сигнала с повторным декодированием</strong> (удаление уже декодированного сильного сигнала из звука, благодаря чему проявляются слабые сигналы, скрытые под ним).</p>
    <p>Приведённые ниже данные измерены на одном и том же телефоне с одними и теми же тестовыми записями, созданными программой <code>ft8sim</code> из WSJT-X. Проверялись три ситуации:</p>
    <ul>
      <li><strong>Один сигнал</strong> — по одному сигналу на запись; измеряется чувствительность, то есть насколько слабый сигнал ещё декодируется</li>
      <li><strong>Несколько станций, разнесённых</strong> — 10 станций на запись на хорошо разнесённых частотах</li>
      <li><strong>Несколько станций, плотно</strong> — 20 станций на запись, половина из них перекрыта сильной станцией всего в 20 Гц; ближе всего к загруженной частоте DX или POTA</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>Версия</th><th>Режим</th><th>Один сигнал<br>(из 300)</th><th>Разнесённые<br>(из 300)</th><th>Плотно<br>(из 600)</th></tr>
      <tr><td>FT8CN</td><td>Быстрый</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>Глубокий</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW (старая)</td><td>Сбалансированный</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW (новая)</strong></td><td>Быстрый</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW (новая)</strong></td><td>Сбалансированный</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW (новая)</strong></td><td>Глубокий</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>При одиночном сигнале новая версия декодирует примерно на 14–18&nbsp;% больше сообщений, чем старая.</li>
      <li>Наибольшая разница — в плотном случае: старая версия декодирует только сильные станции (300), новая извлекает и слабые, скрытые под ними (около 500).</li>
      <li>Все значения — количество <em>правильно</em> декодированных сообщений. <strong>Ложных декодирований не было</strong> ни в одном из измерений.</li>
      <li>Декодирование стало дольше, но всё равно занимает намного меньше 15-секундного цикла FT8 — не более примерно 0,3&nbsp;с в глубоком режиме.</li>
    </ul>`,
  op_perf_limits: `<strong>Об этих цифрах:</strong> все записи созданы на компьютере и не учитывают реальные эффекты распространения, такие как многолучёвость и замирания, поэтому в эфире разница может оказаться больше или меньше. Знак <strong>*</strong> в столбце <em>Плотно</em> отмечает измерение, охватывающее только ядро декодера FT8CN: в самом приложении есть ещё один этап обработки, недоступный для этого теста, поэтому данное значение занижает FT8CN.`,

  op_tx_title: 'Проведение связи',
  op_tx_text:  'После выбора корреспондента типовое QSO в FT8 проходит полностью автоматически:',
  op_tx_seq: `
    <ol>
      <li>На вкладке <strong>Декодер</strong> нажмите на станцию, дающую CQ, чтобы выбрать её.</li>
      <li>Перейдите на вкладку <strong>Вызов</strong> и нажмите <strong>Передача</strong>.</li>
      <li>Приложение само проходит обмен FT8:<br>
        <code>ответ на CQ → рапорт → RRR → 73</code></li>
      <li>По завершении связь автоматически заносится в журнал.</li>
    </ol>`,

  op_autocq_title: 'Автоответ на CQ',
  op_autocq_text:  'Включите <strong>Автоответ на CQ</strong> на вкладке вызова, чтобы отвечать на CQ без вашего участия. Правило приоритета выбирается в Настройки → Способ ответа на CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Сильные и близкие</strong> — предпочтение станциям, которые и громкие, и рядом</li>
      <li><strong>По локатору: дальние</strong> — предпочтение самой дальней станции (для дипломов на дальность)</li>
      <li><strong>По локатору: ближние</strong> — предпочтение ближайшей станции</li>
      <li><strong>Зона с наибольшим числом (ITU/CQ/DX)</strong> — предпочтение зоне, откуда зовёт больше всего станций</li>
      <li><strong>Приоритет зоны ITU</strong> / <strong>Приоритет зоны CQ</strong> / <strong>Приоритет зоны Dx</strong> — три отдельных варианта, сортирующих соответственно по зоне ITU, зоне CQ или по DXCC (удобно при охоте за дипломами)</li>
    </ul>`,
  op_autocq_filter: 'Параметр <strong>Исключить QSO</strong> в настройках позволяет пропускать станции, отработанные в выбранном интервале: <strong>выкл.</strong>, <strong>все</strong>, <strong>1 час</strong>, <strong>4 часа</strong>, <strong>8 часов</strong>, <strong>сегодня</strong>, <strong>30 дней</strong> или <strong>365 дней</strong>.',

  op_autocq_lists: 'Уточнить выбор помогают два списка позывных: <strong>Отслеживать</strong> держит нужные позывные на виду, чтобы не пропустить их появление, а <strong>Исключаемые префиксы</strong> целиком пропускают префиксы, которым автоответ отвечать не должен.',

  op_modifier_title: 'Уточнение CQ',
  op_modifier_text:  'К вызову CQ можно добавить географическое или тематическое уточнение — <code>CQ DX</code>, <code>CQ EU</code>, <code>CQ TEST</code> и другие. Список редактируется, поэтому нужное для конкретного мероприятия уточнение можно добавить самому, не ограничиваясь встроенными вариантами.',

  op_contest_title: 'Контестовый режим (обмен локаторами)',
  op_contest_text:  'В части соревнований обмениваются локаторами, а не рапортами: ARRL Digital, WW Digi, CQ WW VHF и другие. Включите в настройках <strong>контестовый режим (обмен локаторами)</strong>, и во второй передаче вместо обычного рапорта пойдёт <code>R</code> и ваш локатор:',
  op_contest_seq: `
    <ol>
      <li>Вы даёте <code>CQ TEST</code> — при включении режима уточнение CQ автоматически становится <code>TEST</code>, а при выключении возвращается прежнее значение.</li>
      <li>Корреспондент отвечает своим локатором.</li>
      <li>Вы отправляете <code>R</code> и свой локатор вместо рапорта.</li>
      <li>Корреспондент подтверждает, связь состоялась и заносится в журнал.</li>
    </ol>`,
  op_contest_note: 'Такой обмен на один интервал передачи короче обычного QSO в FT8, поэтому в соревновании темп выше. Приходящие сообщения <code>R + локатор</code> распознаются всегда, независимо от этого переключателя: он меняет только то, что передаёте <em>вы</em>.',

  op_watchdog_title: 'Сторожевой таймер передачи',
  op_watchdog_text:  'Сторожевой таймер автоматически прекращает передачу по истечении заданного времени (в минутах), чтобы исключить случайно затянувшуюся передачу. Предел задаётся в Настройки → Сторожевой таймер. Значение 0 отключает его.',

  op_noresponse_title: 'Предел без ответа',
  op_noresponse_text:  'Если вызываемая станция не отвечает в течение заданного числа циклов, приложение переходит на вызов CQ в поисках другого корреспондента, а не прекращает передачу совсем. Предел задаётся в Настройки → Без ответа.',

  op_freetext_title: 'Режим свободного текста',
  op_freetext_text:  'Нажмите значок свободного текста на вкладке вызова, чтобы ввести собственное сообщение длиной до 13 символов. Свободный текст обходит стандартную последовательность QSO — используйте его для объявлений и специальных мероприятий. Чтобы вернуться к обычным связям, переключитесь в режим стандартных сообщений.',

  op_ft2_title: 'FT2 (экспериментально)',
  op_ft2_text:  'В FT8TW есть предварительная поддержка FT2 — более быстрого режима, производного от FT4. FT2 пока следует считать экспериментальным: он ещё не подтверждён реальными связями, поэтому относитесь к нему как к пробе, а не как к основному режиму.',
},

'pl': {
  op_title: 'Praca w FT8 / FT4',

  op_what_title: 'Czym są FT8 / FT4 / FT2',
  op_what_text:  'FT8 to <strong>cyfrowa emisja dla słabych sygnałów</strong>, opublikowana w 2017 roku przez K1JT i K9AN, dziś najczęściej używana emisja na falach krótkich. Jej cel jest wąski: <strong>przeprowadzić minimalną łączność tam, gdzie sygnału w ogóle nie słychać</strong>. Aby to osiągnąć, zrezygnowano z wielu rzeczy:',
  op_what_list: `
    <ul>
      <li><strong>Wiadomości są krótkie i sztywno sformatowane</strong> — w jednej mieszczą się właściwie tylko znaki, lokator i raport. Swobodnej rozmowy nie ma (tekst dowolny to najwyżej 13 znaków). Do pisanej rozmowy służy <a href="js8.html">„Tryb czatu JS8"</a>.</li>
      <li><strong>Czas jest podzielony na stałe okna</strong> — FT8 pracuje w oknach 15-sekundowych: jedna stacja nadaje w parzystych, druga w nieparzystych, na przemian. Dlatego <strong>zegar telefonu musi być dokładny</strong> (najlepiej w granicach sekundy), inaczej strony się nie zgrają.</li>
      <li><strong>Sygnał jest wąski</strong> — zajmuje około 50 Hz, więc na jednej częstotliwości pracują jednocześnie dziesiątki stacji, każda na własnej częstotliwości audio. Stąd cały rząd sygnałów na wodospadzie.</li>
      <li><strong>W zamian jest czułość</strong> — dekodowanie sięga zwykle około −21 dB stosunku sygnału do szumu, czyli mniej więcej 20 dB poniżej progu słyszalności. To dlatego mała moc i prosta antena wystarczają do łączności między kontynentami.</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>Emisja</th><th>Okno</th><th>Opis</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 s</td><td>Najbardziej uniwersalna i najczulsza. W razie wątpliwości wybierz ją</td></tr>
      <tr><td><strong>FT4</strong></td><td>7,5 s</td><td>Stworzona na zawody: dwa razy szybsza, nieco mniej czuła. Dobra, gdy sygnały są mocne i liczy się tempo</td></tr>
      <tr><td><strong>FT2</strong></td><td>3,75 s</td><td>Eksperymentalna emisja FT8TW, dwukrotnie szybsza od FT4. Nie sprawdzona jeszcze w rzeczywistych łącznościach</td></tr>
    </table>`,

  op_quick_title: 'Szybki start: pierwsza łączność FT8',
  op_quick_text:  'Najszybciej zacząć nie od własnego CQ, lecz <strong>od odpowiedzi na cudze CQ</strong> — tam ktoś już czeka na odzew, więc szanse powodzenia są dużo większe.',
  op_quick_steps: `
    <ol>
      <li>W Ustawieniach → Informacje podstawowe wpisz <strong>swój znak</strong> i <strong>kwadrat siatki</strong>. <strong>Bez znaku nadawanie jest niemożliwe.</strong></li>
      <li>Sprawdź, że radio pracuje w trybie <strong>USB</strong> (górna wstęga) i jest połączone (zob. <a href="connection.html">„Połączenie z radiem"</a>).</li>
      <li>Wróć na zakładkę <strong>dekodowania</strong> i uruchom dekodowanie. Po jednym–dwóch oknach lista zacznie się zapełniać.</li>
      <li>Znajdź <strong>zielony</strong> wiersz — zielony oznacza, że stacja woła CQ, czyli czeka na odpowiedź. <strong>Dotknij go</strong>, aby wybrać ją jako korespondenta.</li>
      <li>Przejdź na zakładkę <strong>wywołania</strong> i włącz nadawanie.</li>
      <li>Reszta dzieje się sama: aplikacja przeprowadzi poniższą wymianę i po jej zakończeniu zapisze łączność w dzienniku.</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>Okno</th><th>Kto nadaje</th><th>Treść</th><th>Znaczenie</th></tr>
      <tr><td>1</td><td>On</td><td><code>CQ BX1AA PL04</code></td><td>„Tu BX1AA, kwadrat PL04, jest tam kto?"</td></tr>
      <tr><td>2</td><td><strong>Ty</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>„BX1AA, tu BV6LC, kwadrat PL03"</td></tr>
      <tr><td>3</td><td>On</td><td><code>BV6LC BX1AA −09</code></td><td>„Odebrałem, sygnał −9 dB"</td></tr>
      <tr><td>4</td><td><strong>Ty</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>„Raport przyjęty (R), twój sygnał −12 dB"</td></tr>
      <tr><td>5</td><td>On</td><td><code>BV6LC BX1AA RR73</code></td><td>„Wszystko odebrane, do usłyszenia"</td></tr>
      <tr><td>6</td><td><strong>Ty</strong></td><td><code>BX1AA BV6LC 73</code></td><td>„Do usłyszenia" — łączność zakończona i zapisana</td></tr>
    </table>`,
  op_quick_note: 'Całość trwa około półtorej minuty. Raport to <strong>wartość w dB</strong> (−09, −12 itd.): im większy minus, tym słabszy sygnał, a dopuszczalny zakres to −30 do +20. To nie jest RST typu 59 znany z SSB. Jeśli korespondent nie odpowie, aplikacja przerwie wywołanie po liczbie prób ustawionej w <strong>Brak odpowiedzi</strong> i poszuka kogoś innego — nie trzeba przy tym siedzieć.',

  op_modeswitch_title: 'Przełączanie FT8 / FT4 / FT2',
  op_modeswitch_text:  'Emisję zmienia się w Ustawieniach → Informacje podstawowe w pozycji <strong>Tryb FT8/FT4/FT2</strong>, a także bezpośrednio przyciskiem <strong>szybkiej zmiany trybu</strong> w pływającym oknie. <strong>Po przełączeniu radio samo przestraja się na częstotliwość danej emisji</strong> — nie trzeba jej wybierać ponownie. Na 20 m przejście z FT8 na FT4 samo przeniesie radio z 14,074 na 14,080. (Działa to, gdy PTT sterowane jest przez CAT, RTS lub DTR; VOX nie ma kanału sterowania, więc częstotliwość trzeba zmienić ręcznie.)',

  op_rx_title:      'Odbiór',
  op_rx_text:       'Dotknij <strong>Rozpocznij dekodowanie</strong> w zakładce dekodowania. Aplikacja nagrywa dźwięk i dekoduje wiadomości FT8/FT4 na początku każdego okna 15-sekundowego (FT8) lub 7,5-sekundowego (FT4). Zdekodowane stacje pojawiają się na liście.',
  op_rx_tips_label: 'Wskazówki dla dobrego odbioru:',
  op_rx_tips: `
    <ul>
      <li>Ustaw radio w tryb <strong>USB</strong> (wstęga górna). Do FT8 nie używaj LSB, AM ani FM.</li>
      <li>Najlepsze wyniki daje pasmo akustyczne wyśrodkowane około <strong>1500 Hz</strong>. Dopuszczalny zakres to 200–2700 Hz.</li>
      <li>Ustaw wzmocnienie m.cz. tak, aby sygnał był mocny, ale bez przesterowania. Przesterowanie uniemożliwia dekodowanie.</li>
      <li>Przy słabych sygnałach DX używaj trybu dekodowania <strong>Deep</strong>.</li>
      <li>Włącz <strong>redukcję szumów (DeNoise)</strong> na ekranie widma, aby stłumić szum szerokopasmowy.</li>
    </ul>`,

  op_perf_title:  'Skuteczność dekodowania',
  op_perf_intro:  `<p>W sierpniu 2026 dekoder FT8TW zyskał dwa usprawnienia: <strong>precyzyjne dopasowanie w dziedzinie ciągłej</strong> (dokładne ustalenie czasu i częstotliwości każdego sygnału zamiast trzymania się zgrubnej siatki) oraz <strong>odejmowanie sygnału i ponowne dekodowanie</strong> (usunięcie już zdekodowanego silnego sygnału z dźwięku, dzięki czemu ujawniają się słabsze sygnały ukryte pod nim).</p>
    <p>Poniższe wyniki zmierzono na tym samym telefonie i na tych samych nagraniach testowych, wygenerowanych przez <code>ft8sim</code> z WSJT-X. Sprawdzono trzy sytuacje:</p>
    <ul>
      <li><strong>Pojedynczy sygnał</strong> — jeden sygnał na nagranie; mierzy czułość, czyli jak słaby sygnał daje się jeszcze zdekodować</li>
      <li><strong>Kilka stacji, rozproszonych</strong> — 10 stacji na nagranie na dobrze odseparowanych częstotliwościach</li>
      <li><strong>Kilka stacji, gęsto</strong> — 20 stacji na nagranie, połowa przykryta silną stacją oddaloną tylko o 20 Hz; najbliżej zatłoczonej częstotliwości DX lub POTA</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>Wersja</th><th>Tryb</th><th>Pojedynczy<br>(z 300)</th><th>Rozproszone<br>(z 300)</th><th>Gęsto<br>(z 600)</th></tr>
      <tr><td>FT8CN</td><td>Szybki</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>Głęboki</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW (stara)</td><td>Zrównoważony</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW (nowa)</strong></td><td>Szybki</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW (nowa)</strong></td><td>Zrównoważony</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW (nowa)</strong></td><td>Głęboki</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>Przy pojedynczym sygnale nowa wersja dekoduje o około 14–18&nbsp;% więcej wiadomości niż stara.</li>
      <li>Największa różnica występuje przy gęstym ruchu: stara wersja dekoduje tylko silne stacje (300), nowa odzyskuje także słabsze ukryte pod nimi (około 500).</li>
      <li>Wszystkie liczby to wiadomości zdekodowane <em>poprawnie</em>. W żadnym pomiarze <strong>nie wystąpiły błędne dekodowania</strong>.</li>
      <li>Dekodowanie trwa dłużej niż wcześniej, ale wciąż znacznie krócej niż 15-sekundowy cykl FT8 — najwyżej około 0,3&nbsp;s w trybie głębokim.</li>
    </ul>`,
  op_perf_limits: `<strong>O tych liczbach:</strong> wszystkie nagrania są generowane komputerowo i nie uwzględniają rzeczywistych zjawisk propagacyjnych, takich jak wielodrogowość czy zaniki, więc na paśmie różnica może być większa lub mniejsza. <strong>*</strong> w kolumnie <em>Gęsto</em> oznacza pomiar obejmujący wyłącznie rdzeń dekodera FT8CN — jego aplikacja wykonuje dodatkowy etap przetwarzania, niedostępny dla tego testu, więc ta wartość zaniża FT8CN.`,

  op_tx_title: 'Przeprowadzenie łączności',
  op_tx_text:  'Po wybraniu stacji docelowej typowa łączność FT8 przebiega w pełni automatycznie:',
  op_tx_seq: `
    <ol>
      <li>W zakładce <strong>Dekodowanie</strong> dotknij stacji wywołującej CQ, aby ją wybrać.</li>
      <li>Przejdź do zakładki <strong>Wywołanie</strong> i dotknij <strong>Nadawanie</strong>.</li>
      <li>Aplikacja sama przechodzi przez wymianę FT8:<br>
        <code>odpowiedź na CQ → raport → RRR → 73</code></li>
      <li>Po zakończeniu łączność jest automatycznie zapisywana w dzienniku.</li>
    </ol>`,

  op_autocq_title: 'Automatyczna odpowiedź na CQ',
  op_autocq_text:  'Włącz <strong>Automatyczną odpowiedź na CQ</strong> w zakładce wywołania, aby odpowiadać na wywołania bez ręcznej obsługi. Zasadę priorytetu wybierz w Ustawienia → Sposób odpowiedzi na CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Mocne i bliskie</strong> — preferuje stacje jednocześnie głośne i blisko</li>
      <li><strong>Odległość: dalekie</strong> — preferuje najdalszą stację (przydatne przy dyplomach za odległość)</li>
      <li><strong>Odległość: bliskie</strong> — preferuje stację najbliższą</li>
      <li><strong>Strefa z największą liczbą (ITU/CQ/DX)</strong> — preferuje strefę, z której woła najwięcej stacji</li>
      <li><strong>Priorytet strefy ITU</strong> / <strong>Priorytet strefy CQ</strong> / <strong>Priorytet strefy Dx</strong> — trzy osobne opcje sortujące odpowiednio według strefy ITU, strefy CQ lub DXCC (przydatne przy polowaniu na dyplomy)</li>
    </ul>`,
  op_autocq_filter: 'Opcja <strong>Wyklucz QSO</strong> w ustawieniach pomija stacje pracowane w wybranym okresie: <strong>wyłączone</strong>, <strong>wszystkie</strong>, <strong>1 godzina</strong>, <strong>4 godziny</strong>, <strong>8 godzin</strong>, <strong>dzisiaj</strong>, <strong>30 dni</strong> lub <strong>365 dni</strong>.',

  op_autocq_lists: 'Wybór doprecyzowują dwie listy znaków: <strong>Obserwowane</strong> utrzymuje wskazane znaki na widoku, by nie przegapić ich pojawienia się, a <strong>Wykluczone prefiksy</strong> pomijają w całości prefiksy, na które automat nie ma odpowiadać.',

  op_modifier_title: 'Dopisek do CQ',
  op_modifier_text:  'Do wywołania CQ można dodać określenie geograficzne lub tematyczne — <code>CQ DX</code>, <code>CQ EU</code>, <code>CQ TEST</code> i inne. Listę można edytować, więc określenie potrzebne na daną imprezę dopiszesz sam, bez ograniczania się do wpisów wbudowanych.',

  op_contest_title: 'Tryb zawodów (wymiana lokatorów)',
  op_contest_text:  'W części zawodów wymienia się lokatory zamiast raportów — m.in. ARRL Digital, WW Digi i CQ WW VHF. Po włączeniu w ustawieniach <strong>trybu zawodów (wymiana lokatorów)</strong> druga transmisja wysyła <code>R</code> wraz z twoim lokatorem zamiast zwykłego raportu:',
  op_contest_seq: `
    <ol>
      <li>Wywołujesz <code>CQ TEST</code> — włączenie trybu samo ustawia dopisek CQ na <code>TEST</code>, a wyłączenie przywraca poprzednią wartość.</li>
      <li>Stacja odpowiada swoim lokatorem.</li>
      <li>Wysyłasz <code>R</code> i swój lokator zamiast raportu.</li>
      <li>Stacja potwierdza, łączność dochodzi do skutku i trafia do dziennika.</li>
    </ol>`,
  op_contest_note: 'Taka wymiana jest o jeden okres nadawania krótsza od zwykłej łączności FT8, więc w zawodach tempo rośnie. Odbierane wiadomości <code>R + lokator</code> są rozpoznawane zawsze, niezależnie od tego przełącznika — zmienia on tylko to, co nadajesz <em>ty</em>.',

  op_watchdog_title: 'Nadzorca nadawania',
  op_watchdog_text:  'Nadzorca nadawania automatycznie przerywa nadawanie po ustawionym czasie (w minutach), aby zapobiec przypadkowemu przedłużonemu nadawaniu. Limit ustawisz w Ustawienia → Nadzorca nadawania. Wartość 0 wyłącza tę funkcję.',

  op_noresponse_title: 'Limit braku odpowiedzi',
  op_noresponse_text:  'Jeśli wywoływana stacja nie odpowie w zadanej liczbie cykli, aplikacja przechodzi do wywoływania CQ w poszukiwaniu kogoś innego, zamiast całkiem przerywać nadawanie. Limit ustawisz w Ustawienia → Brak odpowiedzi.',

  op_freetext_title: 'Tryb dowolnego tekstu',
  op_freetext_text:  'Dotknij ikony dowolnego tekstu w zakładce wywołania, aby wpisać własną wiadomość o długości do 13 znaków. Dowolny tekst pomija standardową sekwencję łączności FT8 — używaj go do ogłoszeń i imprez okolicznościowych. Aby wrócić do zwykłych łączności, przełącz się na tryb wiadomości standardowych.',

  op_ft2_title: 'FT2 (eksperymentalny)',
  op_ft2_text:  'FT8TW ma wstępną obsługę FT2 — szybszego trybu wywodzącego się z FT4. FT2 należy nadal traktować jako eksperymentalny: nie potwierdzono go w rzeczywistych łącznościach, więc warto go próbować, a nie na nim polegać.',
},

'es': {
  op_title: 'Operar en FT8 / FT4',

  op_what_title: 'Qué son FT8 / FT4 / FT2',
  op_what_text:  'FT8 es un <strong>modo digital para señales débiles</strong>, publicado en 2017 por K1JT y K9AN, y hoy el modo más usado en HF. Su objetivo es muy concreto: <strong>completar un contacto mínimo en condiciones en las que la señal no se oye en absoluto</strong>. Para conseguirlo renuncia a muchas cosas:',
  op_what_list: `
    <ul>
      <li><strong>Los mensajes son cortos y de formato rígido</strong> — en uno solo caben poco más que los indicativos, el locator y el reporte. No hay conversación libre (el texto libre admite 13 caracteres como mucho). Para conversar escribiendo, consulta <a href="js8.html">«Modo chat JS8»</a>.</li>
      <li><strong>El tiempo se divide en intervalos fijos</strong> — FT8 trabaja en intervalos de 15 segundos: una estación transmite en los pares y la otra en los impares, alternándose. Por eso <strong>el reloj del teléfono debe estar en hora</strong> (mejor dentro de un segundo), o los dos extremos nunca coincidirán.</li>
      <li><strong>La señal es muy estrecha</strong> — ocupa unos 50 Hz, así que decenas de estaciones pueden trabajar a la vez en la misma frecuencia de dial, cada una en su frecuencia de audio. De ahí la hilera de señales que se ve en la cascada.</li>
      <li><strong>Lo que se gana a cambio es sensibilidad</strong> — normalmente decodifica hasta unos −21 dB de relación señal/ruido, alrededor de 20 dB por debajo del umbral del oído. Por eso bastan poca potencia y antenas sencillas para cruzar continentes.</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>Modo</th><th>Intervalo</th><th>Descripción</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 s</td><td>El más general y el más sensible. Si dudas, usa este</td></tr>
      <tr><td><strong>FT4</strong></td><td>7,5 s</td><td>Pensado para concursos: el doble de rápido, algo menos sensible. Va bien cuando las señales son fuertes y prima el ritmo</td></tr>
      <tr><td><strong>FT2</strong></td><td>3,75 s</td><td>Modo experimental de FT8TW, otra vez el doble de rápido que FT4. Todavía sin comprobar en contactos reales</td></tr>
    </table>`,

  op_quick_title: 'Inicio rápido: tu primer contacto en FT8',
  op_quick_text:  'La forma más rápida de empezar no es llamar CQ tú, sino <strong>responder al CQ de otro</strong>: al otro lado ya están esperando respuesta, así que las probabilidades de éxito son mucho mayores.',
  op_quick_steps: `
    <ol>
      <li>En Ajustes → Información básica, rellena <strong>tu indicativo</strong> y <strong>tu grid</strong>. <strong>Sin indicativo no se puede transmitir.</strong></li>
      <li>Comprueba que el equipo está en <strong>modo USB</strong> (banda lateral superior) y conectado (ver <a href="connection.html">«Conexión del equipo»</a>).</li>
      <li>Vuelve a la pestaña de <strong>decodificación</strong> e inicia la decodificación. Tras uno o dos intervalos la lista empezará a llenarse.</li>
      <li>Busca una línea <strong>verde</strong>: el verde indica que esa estación está llamando CQ, es decir, esperando respuesta. <strong>Púlsala</strong> para elegirla como corresponsal.</li>
      <li>Cambia a la pestaña de <strong>llamada</strong> y comienza a transmitir.</li>
      <li>El resto es automático: la aplicación recorre el intercambio de abajo y, al terminar, anota el contacto en el registro.</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>Intervalo</th><th>Quién transmite</th><th>Se envía</th><th>Significado</th></tr>
      <tr><td>1</td><td>Él</td><td><code>CQ BX1AA PL04</code></td><td>«Aquí BX1AA, en PL04, ¿hay alguien?»</td></tr>
      <tr><td>2</td><td><strong>Tú</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>«BX1AA, aquí BV6LC, en PL03»</td></tr>
      <tr><td>3</td><td>Él</td><td><code>BV6LC BX1AA −09</code></td><td>«Te recibo, tu señal es −9 dB»</td></tr>
      <tr><td>4</td><td><strong>Tú</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>«Recibido tu reporte (R); el tuyo es −12 dB»</td></tr>
      <tr><td>5</td><td>Él</td><td><code>BV6LC BX1AA RR73</code></td><td>«Todo recibido, hasta luego»</td></tr>
      <tr><td>6</td><td><strong>Tú</strong></td><td><code>BX1AA BV6LC 73</code></td><td>«Hasta luego» — contacto completado y registrado</td></tr>
    </table>`,
  op_quick_note: 'Todo el intercambio dura alrededor de minuto y medio. El reporte es un <strong>valor en dB</strong> (−09, −12…): cuanto más negativo, más débil, y el rango válido va de −30 a +20. No es el RST tipo 59 que se usa en SSB. Si el corresponsal no responde, la aplicación abandona tras el número de intentos fijado en <strong>Ninguna respuesta</strong> y busca otra estación, así que no hace falta vigilarlo.',

  op_modeswitch_title: 'Cambiar entre FT8 / FT4 / FT2',
  op_modeswitch_text:  'El modo se cambia en Ajustes → Información básica, en <strong>Modo FT8/FT4/FT2</strong>, o directamente con el botón de <strong>cambio rápido de modo</strong> de la ventana flotante. <strong>Al cambiar, la radio se sintoniza sola en la frecuencia de ese modo</strong>; no hay que volver a elegirla. En 20 m, por ejemplo, pasar de FT8 a FT4 mueve la radio de 14,074 a 14,080 por sí sola. (Esto ocurre cuando el PTT se controla por CAT, RTS o DTR; VOX no tiene canal de control, así que ahí hay que cambiar la frecuencia a mano.)',

  op_rx_title:      'Recepción',
  op_rx_text:       'Pulsa <strong>Iniciar decodificación</strong> en la pestaña de decodificación. La aplicación graba audio y decodifica los mensajes FT8/FT4 al comienzo de cada intervalo de 15 segundos (FT8) o 7,5 segundos (FT4). Las estaciones decodificadas aparecen en la lista de decodificación.',
  op_rx_tips_label: 'Consejos para una buena recepción:',
  op_rx_tips: `
    <ul>
      <li>Pon el equipo en <strong>modo USB</strong> (banda lateral superior). No uses LSB, AM ni FM para FT8.</li>
      <li>Centra el paso de banda de audio en torno a <strong>1500 Hz</strong> para obtener el mejor resultado. El rango de audio válido es de 200 a 2700 Hz.</li>
      <li>Ajusta la ganancia de AF del equipo para que el audio sea fuerte pero sin recorte. El recorte impide decodificar.</li>
      <li>Usa el modo de decodificación <strong>Deep</strong> en condiciones de DX con señales débiles.</li>
      <li>Activa <strong>DeNoise</strong> en la pantalla de espectro para reducir el ruido de banda ancha.</li>
    </ul>`,

  op_perf_title:  'Rendimiento de decodificación',
  op_perf_intro:  `<p>En agosto de 2026 el decodificador de FT8TW incorporó dos mejoras: <strong>alineación fina en dominio continuo</strong> (fijar el instante y la frecuencia exactos de cada señal en lugar de ceñirse a una rejilla gruesa) y <strong>resta de señal y nueva decodificación</strong> (eliminar del audio una señal fuerte ya decodificada para que afloren las señales débiles ocultas debajo).</p>
    <p>Las cifras siguientes se midieron en el mismo teléfono y con las mismas grabaciones de prueba, generadas por <code>ft8sim</code> de WSJT-X. Se cubrieron tres situaciones:</p>
    <ul>
      <li><strong>Señal única</strong> — una señal por grabación; mide la sensibilidad, es decir, hasta qué señal tan débil se puede decodificar</li>
      <li><strong>Varias estaciones, separadas</strong> — 10 estaciones por grabación en frecuencias bien separadas</li>
      <li><strong>Varias estaciones, apiñadas</strong> — 20 estaciones por grabación, la mitad sepultadas bajo una estación fuerte a solo 20 Hz; lo más parecido a una frecuencia concurrida de DX o POTA</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>Versión</th><th>Modo</th><th>Señal única<br>(de 300)</th><th>Separadas<br>(de 300)</th><th>Apiñadas<br>(de 600)</th></tr>
      <tr><td>FT8CN</td><td>Rápido</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>Profundo</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW (anterior)</td><td>Equilibrado</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW (nueva)</strong></td><td>Rápido</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW (nueva)</strong></td><td>Equilibrado</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW (nueva)</strong></td><td>Profundo</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>Con una sola señal, la nueva versión decodifica aproximadamente un 14–18&nbsp;% más de mensajes que la anterior.</li>
      <li>La mayor diferencia aparece en el caso apiñado: la versión anterior solo decodifica las estaciones fuertes (300), mientras que la nueva recupera también las débiles ocultas debajo (unas 500).</li>
      <li>Todas las cifras son mensajes decodificados <em>correctamente</em>. <strong>No hubo decodificaciones falsas</strong> en ninguna medición.</li>
      <li>La decodificación tarda más que antes, pero sigue siendo mucho menos que el ciclo de 15 segundos de FT8: como máximo unos 0,3&nbsp;s en modo profundo.</li>
    </ul>`,
  op_perf_limits: `<strong>Sobre estas cifras:</strong> todas las grabaciones se generan por ordenador y no incluyen efectos reales de propagación como el multitrayecto o el desvanecimiento, por lo que en el aire la diferencia puede ser mayor o menor. El <strong>*</strong> de la columna <em>Apiñadas</em> señala una medición que abarca únicamente el núcleo del decodificador de FT8CN: su aplicación realiza una etapa de procesamiento adicional que esta prueba no pudo alcanzar, así que esa cifra subestima a FT8CN.`,

  op_tx_title: 'Realizar un contacto',
  op_tx_text:  'Una vez seleccionada la estación, un QSO típico de FT8 se desarrolla de forma totalmente automática:',
  op_tx_seq: `
    <ol>
      <li>En la pestaña <strong>Decodificación</strong>, pulsa una estación que esté llamando CQ para seleccionarla.</li>
      <li>Cambia a la pestaña <strong>Llamada</strong> y pulsa <strong>TX</strong> para empezar a transmitir.</li>
      <li>La aplicación recorre automáticamente el intercambio FT8:<br>
        <code>respuesta al CQ → informe de señal → RRR → 73</code></li>
      <li>Al completarse, el QSO se registra automáticamente.</li>
    </ol>`,

  op_autocq_title: 'Respuesta automática a CQ',
  op_autocq_text:  'Activa <strong>Respuesta automática a CQ</strong> en la pestaña de llamada para contestar las llamadas sin intervenir. Elige la estrategia de prioridad en Ajustes → Método de CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Fuertes y cercanas</strong> — prefiere las estaciones a la vez potentes y próximas</li>
      <li><strong>Distancia: lejanas</strong> — prefiere la estación más lejana (útil para diplomas de distancia)</li>
      <li><strong>Distancia: cercanas</strong> — prefiere la estación más próxima</li>
      <li><strong>Zona con más estaciones (ITU/CQ/DX)</strong> — prefiere la zona desde la que llaman más estaciones</li>
      <li><strong>Prioridad zona ITU</strong> / <strong>Prioridad zona CQ</strong> / <strong>Prioridad zona Dx</strong> — tres opciones independientes que ordenan por zona ITU, zona CQ o DXCC respectivamente (útiles para cazar diplomas)</li>
    </ul>`,
  op_autocq_filter: 'Usa <strong>Excluir QSO</strong> en Ajustes para saltar las estaciones ya trabajadas dentro del periodo elegido: <strong>desactivado</strong>, <strong>todos</strong>, <strong>1 hora</strong>, <strong>4 horas</strong>, <strong>8 horas</strong>, <strong>hoy</strong>, <strong>30 días</strong> o <strong>365 días</strong>.',

  op_autocq_lists: 'Dos listas de indicativos afinan aún más el comportamiento: <strong>Seguir</strong> mantiene a la vista los indicativos que te interesan para no perderlos cuando aparezcan, y <strong>Prefijos excluidos</strong> salta por completo los prefijos a los que no quieres que conteste la automatización.',

  op_modifier_title: 'Modificador de CQ',
  op_modifier_text:  'Un CQ puede llevar un modificador geográfico o de actividad: <code>CQ DX</code>, <code>CQ EU</code>, <code>CQ TEST</code>, etc. La lista es editable, así que puedes añadir el modificador que exija un evento concreto sin limitarte a las entradas predefinidas.',

  op_contest_title: 'Modo concurso (intercambio de localizador)',
  op_contest_text:  'Algunos concursos intercambian localizadores en lugar de informes de señal: ARRL Digital, WW Digi y CQ WW VHF entre otros. Activa <strong>Modo concurso (intercambio de localizador)</strong> en Ajustes y la segunda transmisión enviará <code>R</code> seguido de tu localizador en lugar del informe habitual:',
  op_contest_seq: `
    <ol>
      <li>Llamas <code>CQ TEST</code>: al activar el modo, el modificador de CQ pasa solo a <code>TEST</code>, y al desactivarlo se restaura el valor anterior.</li>
      <li>La otra estación responde con su localizador.</li>
      <li>Envías <code>R</code> y tu localizador en lugar del informe de señal.</li>
      <li>La otra estación confirma, el QSO se completa y se registra.</li>
    </ol>`,
  op_contest_note: 'El intercambio es un intervalo de transmisión más corto que un QSO normal de FT8, así que el ritmo del concurso es más rápido. Los mensajes <code>R + localizador</code> que recibas se interpretan siempre, esté o no activado este conmutador: solo cambia lo que envías <em>tú</em>.',

  op_watchdog_title: 'Vigilante de transmisión',
  op_watchdog_text:  'El vigilante de transmisión detiene automáticamente la emisión tras un límite de tiempo configurable (en minutos) para evitar transmisiones prolongadas por descuido. Fija el límite en Ajustes → Vigilante de TX. Ponlo a 0 para desactivarlo.',

  op_noresponse_title: 'Límite de intentos sin respuesta',
  op_noresponse_text:  'Si la estación llamada no responde tras un número determinado de ciclos, la aplicación pasa a llamar CQ para buscar a otra, en lugar de detener la transmisión por completo. Configura el límite en Ajustes → Sin respuesta.',

  op_freetext_title: 'Modo de texto libre',
  op_freetext_text:  'Pulsa el icono de texto libre en la pestaña de llamada para escribir un mensaje propio de hasta 13 caracteres. El texto libre omite la secuencia estándar de QSO de FT8: úsalo para anuncios o eventos especiales. Vuelve al modo de mensaje estándar para retomar los QSO normales.',

  op_ft2_title: 'FT2 (experimental)',
  op_ft2_text:  'FT8TW incluye compatibilidad preliminar con FT2, un modo más rápido derivado de FT4. FT2 debe seguir considerándose experimental: todavía no se ha confirmado en contactos reales, así que conviene probarlo más que confiar en él.',
},

'el': {
  op_title: 'Λειτουργία FT8 / FT4',

  op_what_title: 'Τι είναι τα FT8 / FT4 / FT2',
  op_what_text:  'Το FT8 είναι μια <strong>ψηφιακή λειτουργία για ασθενή σήματα</strong>, που δημοσιεύθηκε το 2017 από τους K1JT και K9AN και σήμερα είναι η πιο διαδεδομένη λειτουργία στα βραχέα. Ο στόχος του είναι συγκεκριμένος: <strong>να ολοκληρώνει μια στοιχειώδη επαφή εκεί όπου το σήμα δεν ακούγεται καθόλου</strong>. Για να το πετύχει, θυσιάζει πολλά:',
  op_what_list: `
    <ul>
      <li><strong>Τα μηνύματα είναι σύντομα και αυστηρά δομημένα</strong> — σε ένα μήνυμα χωρούν λίγο περισσότερα από τα διακριτικά, το τετράγωνο και την αναφορά σήματος. Ελεύθερη συνομιλία δεν υπάρχει (το ελεύθερο κείμενο φτάνει τους 13 χαρακτήρες). Για συνομιλία με πληκτρολόγιο δείτε τη <a href="js8.html">«Λειτουργία συνομιλίας JS8»</a>.</li>
      <li><strong>Ο χρόνος χωρίζεται σε σταθερές χρονοθυρίδες</strong> — το FT8 δουλεύει σε θυρίδες 15 δευτερολέπτων: ο ένας σταθμός εκπέμπει στις ζυγές και ο άλλος στις μονές, εναλλάξ. Γι\' αυτό <strong>το ρολόι του τηλεφώνου πρέπει να είναι ακριβές</strong> (κατά προτίμηση μέσα σε ένα δευτερόλεπτο), αλλιώς οι δύο πλευρές δεν συγχρονίζονται.</li>
      <li><strong>Το σήμα είναι πολύ στενό</strong> — καταλαμβάνει περίπου 50 Hz, οπότε δεκάδες σταθμοί δουλεύουν ταυτόχρονα στην ίδια συχνότητα, ο καθένας στη δική του συχνότητα ήχου. Αυτός είναι ο λόγος που στον καταρράκτη φαίνεται μια ολόκληρη σειρά σημάτων.</li>
      <li><strong>Το αντάλλαγμα είναι η ευαισθησία</strong> — η αποκωδικοποίηση φτάνει συνήθως ως περίπου −21 dB λόγου σήματος προς θόρυβο, δηλαδή περίπου 20 dB κάτω από το κατώφλι της ακοής. Γι\' αυτό αρκούν μικρή ισχύς και απλές κεραίες για επαφές μεταξύ ηπείρων.</li>
    </ul>`,
  op_what_table: `
    <table>
      <tr><th>Λειτουργία</th><th>Χρονοθυρίδα</th><th>Περιγραφή</th></tr>
      <tr><td><strong>FT8</strong></td><td>15 δ</td><td>Η πιο γενική και η πιο ευαίσθητη. Αν έχετε αμφιβολία, επιλέξτε αυτήν</td></tr>
      <tr><td><strong>FT4</strong></td><td>7,5 δ</td><td>Σχεδιασμένη για αγώνες: διπλάσια ταχύτητα, ελαφρώς μικρότερη ευαισθησία. Ταιριάζει όταν τα σήματα είναι δυνατά και μετράει ο ρυθμός</td></tr>
      <tr><td><strong>FT2</strong></td><td>3,75 δ</td><td>Πειραματική λειτουργία του FT8TW, διπλάσια ταχύτητα από το FT4. Δεν έχει ακόμη δοκιμαστεί σε πραγματικές επαφές</td></tr>
    </table>`,

  op_quick_title: 'Γρήγορη εκκίνηση: η πρώτη σας επαφή σε FT8',
  op_quick_text:  'Ο γρηγορότερος τρόπος να ξεκινήσετε δεν είναι να καλέσετε εσείς CQ, αλλά <strong>να απαντήσετε στο CQ κάποιου άλλου</strong> — εκείνος ήδη περιμένει απάντηση, οπότε οι πιθανότητες επιτυχίας είναι πολύ μεγαλύτερες.',
  op_quick_steps: `
    <ol>
      <li>Στις Ρυθμίσεις → Βασικές πληροφορίες συμπληρώστε το <strong>διακριτικό</strong> και το <strong>τετράγωνο</strong> σας. <strong>Χωρίς διακριτικό δεν γίνεται εκπομπή.</strong></li>
      <li>Βεβαιωθείτε ότι ο πομποδέκτης είναι σε <strong>λειτουργία USB</strong> (άνω πλευρική) και συνδεδεμένος (δείτε <a href="connection.html">«Σύνδεση πομποδέκτη»</a>).</li>
      <li>Επιστρέψτε στην καρτέλα <strong>αποκωδικοποίησης</strong> και ξεκινήστε την. Μετά από μία-δύο χρονοθυρίδες η λίστα αρχίζει να γεμίζει.</li>
      <li>Βρείτε μια <strong>πράσινη</strong> γραμμή — το πράσινο σημαίνει ότι ο σταθμός καλεί CQ, δηλαδή περιμένει απάντηση. <strong>Πατήστε την</strong> για να τον επιλέξετε.</li>
      <li>Πηγαίνετε στην καρτέλα <strong>κλήσης</strong> και ξεκινήστε την εκπομπή.</li>
      <li>Τα υπόλοιπα γίνονται αυτόματα: η εφαρμογή εκτελεί την παρακάτω ανταλλαγή και στο τέλος καταγράφει την επαφή στο ημερολόγιο.</li>
    </ol>`,
  op_quick_seq: `
    <table>
      <tr><th>Θυρίδα</th><th>Ποιος εκπέμπει</th><th>Τι στέλνεται</th><th>Σημασία</th></tr>
      <tr><td>1</td><td>Αυτός</td><td><code>CQ BX1AA PL04</code></td><td>«Εδώ BX1AA, στο PL04, είναι κανείς;»</td></tr>
      <tr><td>2</td><td><strong>Εσείς</strong></td><td><code>BX1AA BV6LC PL03</code></td><td>«BX1AA, εδώ BV6LC, στο PL03»</td></tr>
      <tr><td>3</td><td>Αυτός</td><td><code>BV6LC BX1AA −09</code></td><td>«Σας λαμβάνω, το σήμα σας είναι −9 dB»</td></tr>
      <tr><td>4</td><td><strong>Εσείς</strong></td><td><code>BX1AA BV6LC R−12</code></td><td>«Έλαβα την αναφορά σας (R)· η δική σας είναι −12 dB»</td></tr>
      <tr><td>5</td><td>Αυτός</td><td><code>BV6LC BX1AA RR73</code></td><td>«Όλα ελήφθησαν, γεια σας»</td></tr>
      <tr><td>6</td><td><strong>Εσείς</strong></td><td><code>BX1AA BV6LC 73</code></td><td>«Γεια σας» — η επαφή ολοκληρώθηκε και καταγράφηκε</td></tr>
    </table>`,
  op_quick_note: 'Όλη η ανταλλαγή διαρκεί περίπου ενάμισι λεπτό. Η αναφορά είναι <strong>τιμή σε dB</strong> (−09, −12 κ.λπ.): όσο πιο αρνητική, τόσο ασθενέστερο το σήμα, και το επιτρεπτό εύρος είναι −30 έως +20. Δεν είναι το RST τύπου 59 που χρησιμοποιείται στο SSB. Αν ο ανταποκριτής δεν απαντήσει ποτέ, η εφαρμογή σταματά μετά από τον αριθμό προσπαθειών που ορίζει η <strong>Καμιά απόκριση</strong> και προχωρά σε άλλον σταθμό, οπότε δεν χρειάζεται να παρακολουθείτε.',

  op_modeswitch_title: 'Εναλλαγή μεταξύ FT8 / FT4 / FT2',
  op_modeswitch_text:  'Η λειτουργία αλλάζει στις Ρυθμίσεις → Βασικές πληροφορίες, στο <strong>Λειτουργία FT8/FT4/FT2</strong>, ή απευθείας με το κουμπί <strong>γρήγορης αλλαγής λειτουργίας</strong> στο αιωρούμενο παράθυρο. <strong>Μετά την εναλλαγή ο πομποδέκτης συντονίζεται μόνος του στη συχνότητα της λειτουργίας</strong> — δεν χρειάζεται να την επιλέξετε ξανά. Στα 20 m, για παράδειγμα, η μετάβαση από FT8 σε FT4 μετακινεί τον πομποδέκτη από τους 14,074 στους 14,080 από μόνη της. (Ισχύει όταν ο έλεγχος PTT γίνεται με CAT, RTS ή DTR· το VOX δεν έχει κανάλι ελέγχου, οπότε εκεί η συχνότητα αλλάζει χειροκίνητα.)',

  op_rx_title:      'Λήψη',
  op_rx_text:       'Πατήστε <strong>Έναρξη αποκωδικοποίησης</strong> στην καρτέλα αποκωδικοποίησης. Η εφαρμογή καταγράφει ήχο και αποκωδικοποιεί μηνύματα FT8/FT4 στην αρχή κάθε χρονοθυρίδας 15 δευτερολέπτων (FT8) ή 7,5 δευτερολέπτων (FT4). Οι σταθμοί που αποκωδικοποιούνται εμφανίζονται στη λίστα αποκωδικοποίησης.',
  op_rx_tips_label: 'Συμβουλές για καλή λήψη:',
  op_rx_tips: `
    <ul>
      <li>Ρυθμίστε τον πομποδέκτη σε <strong>USB</strong> (άνω πλευρική ζώνη). Για FT8 μην χρησιμοποιείτε LSB, AM ή FM.</li>
      <li>Το καλύτερο αποτέλεσμα δίνει ζώνη ήχου κεντραρισμένη γύρω στα <strong>1500 Hz</strong>. Το έγκυρο εύρος ήχου είναι 200–2700 Hz.</li>
      <li>Ρυθμίστε την ενίσχυση AF ώστε ο ήχος να είναι δυνατός αλλά χωρίς ψαλίδισμα. Το ψαλίδισμα χαλάει την αποκωδικοποίηση.</li>
      <li>Σε συνθήκες DX με ασθενή σήματα χρησιμοποιήστε τη λειτουργία αποκωδικοποίησης <strong>Deep</strong>.</li>
      <li>Ενεργοποιήστε το <strong>DeNoise</strong> στην οθόνη φάσματος για να μειώσετε τον ευρυζωνικό θόρυβο.</li>
    </ul>`,

  op_perf_title:  'Απόδοση αποκωδικοποίησης',
  op_perf_intro:  `<p>Τον Αύγουστο του 2026 ο αποκωδικοποιητής του FT8TW απέκτησε δύο βελτιώσεις: <strong>λεπτομερή ευθυγράμμιση στο συνεχές πεδίο</strong> (εντοπισμός του ακριβούς χρόνου και της συχνότητας κάθε σήματος αντί για προσκόλληση σε αδρό πλέγμα) και <strong>αφαίρεση σήματος με εκ νέου αποκωδικοποίηση</strong> (απομάκρυνση ενός ήδη αποκωδικοποιημένου ισχυρού σήματος από τον ήχο, ώστε να αναδυθούν τα ασθενέστερα που κρύβονταν από κάτω).</p>
    <p>Τα παρακάτω μετρήθηκαν στο ίδιο τηλέφωνο με τις ίδιες δοκιμαστικές ηχογραφήσεις, που δημιουργήθηκαν με το <code>ft8sim</code> του WSJT-X. Καλύφθηκαν τρεις καταστάσεις:</p>
    <ul>
      <li><strong>Ένα σήμα</strong> — ένα σήμα ανά ηχογράφηση· μετρά την ευαισθησία, δηλαδή πόσο ασθενές σήμα μπορεί ακόμη να αποκωδικοποιηθεί</li>
      <li><strong>Πολλοί σταθμοί, διάσπαρτοι</strong> — 10 σταθμοί ανά ηχογράφηση σε καλά διαχωρισμένες συχνότητες</li>
      <li><strong>Πολλοί σταθμοί, πυκνά</strong> — 20 σταθμοί ανά ηχογράφηση, οι μισοί θαμμένοι κάτω από ισχυρό σταθμό μόλις 20 Hz μακριά· ό,τι πλησιέστερο σε πολυσύχναστη συχνότητα DX ή POTA</li>
    </ul>`,
  op_perf_table:  `
    <table>
      <tr><th>Έκδοση</th><th>Λειτουργία</th><th>Ένα σήμα<br>(από 300)</th><th>Διάσπαρτοι<br>(από 300)</th><th>Πυκνά<br>(από 600)</th></tr>
      <tr><td>FT8CN</td><td>Γρήγορη</td><td>79</td><td>198</td><td>300 *</td></tr>
      <tr><td>FT8CN</td><td>Βαθιά</td><td>82</td><td>200</td><td>300 *</td></tr>
      <tr><td>FT8TW (παλιά)</td><td>Ισορροπημένη</td><td>80</td><td>199</td><td>300</td></tr>
      <tr><td><strong>FT8TW (νέα)</strong></td><td>Γρήγορη</td><td><strong>91</strong></td><td><strong>213</strong></td><td><strong>498</strong></td></tr>
      <tr><td><strong>FT8TW (νέα)</strong></td><td>Ισορροπημένη</td><td><strong>93</strong></td><td><strong>214</strong></td><td><strong>502</strong></td></tr>
      <tr><td><strong>FT8TW (νέα)</strong></td><td>Βαθιά</td><td><strong>94</strong></td><td><strong>214</strong></td><td><strong>503</strong></td></tr>
    </table>`,
  op_perf_points: `<ul>
      <li>Με ένα μόνο σήμα, η νέα έκδοση αποκωδικοποιεί περίπου 14–18&nbsp;% περισσότερα μηνύματα από την παλιά.</li>
      <li>Η μεγαλύτερη διαφορά εμφανίζεται στην πυκνή περίπτωση: η παλιά έκδοση αποκωδικοποιεί μόνο τους ισχυρούς σταθμούς (300), ενώ η νέα ανακτά και τους ασθενέστερους που κρύβονταν από κάτω (περίπου 500).</li>
      <li>Όλα τα νούμερα αφορούν <em>σωστά</em> αποκωδικοποιημένα μηνύματα. <strong>Δεν υπήρξαν εσφαλμένες αποκωδικοποιήσεις</strong> σε καμία μέτρηση.</li>
      <li>Η αποκωδικοποίηση διαρκεί περισσότερο από πριν, αλλά παραμένει πολύ μικρότερη από τον κύκλο των 15 δευτερολέπτων του FT8 — το πολύ γύρω στα 0,3&nbsp;δευτ. στη βαθιά λειτουργία.</li>
    </ul>`,
  op_perf_limits: `<strong>Σχετικά με αυτά τα νούμερα:</strong> όλες οι ηχογραφήσεις είναι δημιουργημένες από υπολογιστή και δεν περιλαμβάνουν πραγματικά φαινόμενα διάδοσης όπως πολυδιαδρομική λήψη ή διαλείψεις, επομένως στον αέρα η διαφορά μπορεί να είναι μεγαλύτερη ή μικρότερη. Ο <strong>*</strong> στη στήλη <em>Πυκνά</em> επισημαίνει μέτρηση που καλύπτει μόνο τον πυρήνα του αποκωδικοποιητή του FT8CN: η εφαρμογή του εκτελεί ένα επιπλέον στάδιο επεξεργασίας που η δοκιμή αυτή δεν μπόρεσε να προσεγγίσει, οπότε το νούμερο αυτό υποτιμά το FT8CN.`,

  op_tx_title: 'Πραγματοποίηση επαφής',
  op_tx_text:  'Μόλις επιλέξετε σταθμό, μια τυπική επαφή FT8 εξελίσσεται εντελώς αυτόματα:',
  op_tx_seq: `
    <ol>
      <li>Στην καρτέλα <strong>Αποκωδικοποίηση</strong> πατήστε έναν σταθμό που καλεί CQ για να τον επιλέξετε.</li>
      <li>Μεταβείτε στην καρτέλα <strong>Κλήση</strong> και πατήστε <strong>Εκπομπή</strong>.</li>
      <li>Η εφαρμογή εκτελεί αυτόματα την ακολουθία FT8:<br>
        <code>απάντηση σε CQ → αναφορά σήματος → RRR → 73</code></li>
      <li>Με την ολοκλήρωση, η επαφή καταχωρείται αυτόματα στο ημερολόγιο.</li>
    </ol>`,

  op_autocq_title: 'Αυτόματη απάντηση σε CQ',
  op_autocq_text:  'Ενεργοποιήστε την <strong>Αυτόματη απάντηση σε CQ</strong> στην καρτέλα κλήσης για να απαντάτε χωρίς χειροκίνητη παρέμβαση. Επιλέξτε στρατηγική προτεραιότητας στις Ρυθμίσεις → Μέθοδος CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Δυνατοί και κοντινοί</strong> — προτιμά σταθμούς που είναι ταυτόχρονα δυνατοί και κοντά</li>
      <li><strong>Απόσταση: μακρινοί</strong> — προτιμά τον πιο μακρινό σταθμό (χρήσιμο για διπλώματα απόστασης)</li>
      <li><strong>Απόσταση: κοντινοί</strong> — προτιμά τον πλησιέστερο σταθμό</li>
      <li><strong>Ζώνη με τους περισσότερους (ITU/CQ/DX)</strong> — προτιμά τη ζώνη από την οποία καλούν οι περισσότεροι σταθμοί</li>
      <li><strong>Προτεραιότητα ζώνης ITU</strong> / <strong>Προτεραιότητα ζώνης CQ</strong> / <strong>Προτεραιότητα ζώνης Dx</strong> — τρεις ξεχωριστές επιλογές που ταξινομούν αντίστοιχα κατά ζώνη ITU, ζώνη CQ ή DXCC (χρήσιμες για κυνήγι διπλωμάτων)</li>
    </ul>`,
  op_autocq_filter: 'Με την επιλογή <strong>Εξαίρεση QSO</strong> στις Ρυθμίσεις παραλείπονται σταθμοί με τους οποίους έχει ήδη γίνει επαφή μέσα στο επιλεγμένο διάστημα: <strong>ανενεργό</strong>, <strong>όλα</strong>, <strong>1 ώρα</strong>, <strong>4 ώρες</strong>, <strong>8 ώρες</strong>, <strong>σήμερα</strong>, <strong>30 ημέρες</strong> ή <strong>365 ημέρες</strong>.',

  op_autocq_lists: 'Δύο λίστες διακριτικών ρυθμίζουν περαιτέρω τη συμπεριφορά: η <strong>Παρακολούθηση</strong> κρατά συγκεκριμένα διακριτικά σε κοινή θέα ώστε να μην τα χάσετε όταν εμφανιστούν, ενώ τα <strong>Εξαιρούμενα προθέματα</strong> παρακάμπτουν ολόκληρα προθέματα στα οποία δεν θέλετε να απαντά ο αυτοματισμός.',

  op_modifier_title: 'Προσδιορισμός CQ',
  op_modifier_text:  'Μια κλήση CQ μπορεί να φέρει γεωγραφικό ή θεματικό προσδιορισμό — <code>CQ DX</code>, <code>CQ EU</code>, <code>CQ TEST</code> κ.ά. Η λίστα είναι επεξεργάσιμη, οπότε μπορείτε να προσθέσετε τον προσδιορισμό που απαιτεί μια συγκεκριμένη εκδήλωση χωρίς να περιορίζεστε στις προεπιλεγμένες επιλογές.',

  op_contest_title: 'Λειτουργία διαγωνισμού (ανταλλαγή τετραγώνου)',
  op_contest_text:  'Ορισμένοι διαγωνισμοί ανταλλάσσουν τετράγωνα αντί για αναφορές σήματος — μεταξύ άλλων οι ARRL Digital, WW Digi και CQ WW VHF. Ενεργοποιήστε τη <strong>λειτουργία διαγωνισμού (ανταλλαγή τετραγώνου)</strong> στις Ρυθμίσεις και η δεύτερη εκπομπή θα στέλνει <code>R</code> και το δικό σας τετράγωνο στη θέση της συνηθισμένης αναφοράς:',
  op_contest_seq: `
    <ol>
      <li>Καλείτε <code>CQ TEST</code> — με την ενεργοποίηση, ο προσδιορισμός CQ γίνεται αυτόματα <code>TEST</code> και με την απενεργοποίηση επανέρχεται η προηγούμενη τιμή.</li>
      <li>Ο άλλος σταθμός απαντά με το τετράγωνό του.</li>
      <li>Στέλνετε <code>R</code> και το τετράγωνό σας αντί για αναφορά σήματος.</li>
      <li>Ο άλλος σταθμός επιβεβαιώνει, η επαφή ολοκληρώνεται και καταγράφεται.</li>
    </ol>`,
  op_contest_note: 'Η ανταλλαγή είναι μία χρονοθυρίδα εκπομπής συντομότερη από μια συνηθισμένη επαφή FT8, οπότε ο ρυθμός στον διαγωνισμό ανεβαίνει. Τα εισερχόμενα μηνύματα <code>R + τετράγωνο</code> αναγνωρίζονται πάντα, ανεξάρτητα από αυτόν τον διακόπτη — αλλάζει μόνο αυτό που στέλνετε <em>εσείς</em>.',

  op_watchdog_title: 'Επιτηρητής εκπομπής',
  op_watchdog_text:  'Ο επιτηρητής εκπομπής σταματά αυτόματα την εκπομπή μετά από ρυθμιζόμενο χρονικό όριο (σε λεπτά), ώστε να αποφεύγεται η κατά λάθος παρατεταμένη εκπομπή. Ορίστε το όριο στις Ρυθμίσεις → Επιτηρητής εκπομπής. Η τιμή 0 το απενεργοποιεί.',

  op_noresponse_title: 'Όριο χωρίς απάντηση',
  op_noresponse_text:  'Αν ο σταθμός που καλείτε δεν απαντήσει μέσα σε καθορισμένο αριθμό κύκλων, η εφαρμογή περνά σε κλήση CQ για να βρει άλλον, αντί να σταματήσει τελείως την εκπομπή. Ορίστε το όριο στις Ρυθμίσεις → Χωρίς απάντηση.',

  op_freetext_title: 'Λειτουργία ελεύθερου κειμένου',
  op_freetext_text:  'Πατήστε το εικονίδιο ελεύθερου κειμένου στην καρτέλα κλήσης για να γράψετε δικό σας μήνυμα έως 13 χαρακτήρες. Το ελεύθερο κείμενο παρακάμπτει την τυπική ακολουθία επαφής FT8 — χρησιμοποιήστε το για ανακοινώσεις ή ειδικές εκδηλώσεις. Επιστρέψτε στη λειτουργία τυπικών μηνυμάτων για κανονικές επαφές.',

  op_ft2_title: 'FT2 (πειραματικό)',
  op_ft2_text:  'Το FT8TW περιλαμβάνει πρώιμη υποστήριξη για το FT2, μια ταχύτερη λειτουργία που προέρχεται από το FT4. Το FT2 πρέπει να θεωρείται ακόμη πειραματικό: δεν έχει επιβεβαιωθεί σε πραγματικές επαφές, οπότε δοκιμάστε το αντί να το εμπιστευτείτε.',
},

}; /* end PAGE_T */
