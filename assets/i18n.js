/* ── FT8TW User Manual – i18n ─────────────────────────────────── */

const T = {

/* ════════════════════════════════════════════════════════════════
   ENGLISH
════════════════════════════════════════════════════════════════ */
en: {
  page_title: 'FT8TW User Manual',
  brand_sub:  'User Manual',

  /* Navigation */
  nav_intro:        'Introduction',
  nav_requirements: 'Requirements',
  nav_install:      'Installation',
  nav_first_setup:  'First Setup',
  nav_screens:      'Main Screens',
  nav_connection:   'Radio Connection',
  nav_operating:    'Operating FT8 / FT4',
  nav_logging:      'QSO Logging',
  nav_third_party:  'Third-party Services',
  nav_settings:     'Settings Reference',
  nav_troubleshoot: 'Troubleshooting',

  /* ── Introduction ─────────────────────────────────────────── */
  intro_title: 'Introduction',
  intro_p1: 'FT8TW is an Android application for FT8 and FT4 digital-mode amateur radio communication. It is a fork of FT8CN (originally developed by BG7YOZ), actively maintained by BV6LC with additional features and improvements tailored for the Taiwan amateur radio community.',
  intro_p2: 'Key features:',
  intro_features: `
    <ul>
      <li>Supports both <strong>FT8</strong> (15-second slots) and <strong>FT4</strong> (7.5-second slots) digital modes</li>
      <li>Connects to <strong>40+ radio models</strong> via USB CAT, Bluetooth SPP, FlexRadio WiFi, ICOM RS-BA1, or Xiegu WiFi</li>
      <li>Native <strong>C/C++ signal processing</strong> (LDPC, CRC, Kiss FFT) for high-performance encoding and decoding</li>
      <li>Automatic CQ response with configurable priority strategies</li>
      <li>QSO logging with ADIF export/import and log sharing</li>
      <li>Integration with <strong>Cloudlog</strong>, <strong>QRZ.com</strong>, and <strong>PSKReporter</strong></li>
      <li>Maidenhead grid tracker with OpenStreetMap overlay</li>
      <li>ITU, CQ zone, and DXCC statistics</li>
      <li>Light / Dark / System theme</li>
      <li>Requires Android 5.0 (API 21) or later</li>
    </ul>`,

  /* ── Requirements ─────────────────────────────────────────── */
  req_title:        'Requirements',
  req_device_title: 'Device Requirements',
  req_device_list: `
    <ul>
      <li>Android 5.0 (Lollipop, API 21) or later</li>
      <li>At least 150 MB of free storage</li>
      <li>For USB connection: device must support <strong>USB OTG</strong></li>
      <li>For Bluetooth connection: Bluetooth 2.0 or later with SPP profile support</li>
      <li>Working microphone (built-in or wired) for audio reception</li>
    </ul>`,
  req_license_title: 'Amateur Radio License',
  req_license_text:  'FT8TW is intended for licensed amateur radio operators. A valid amateur radio license issued by your national telecommunications authority is required to transmit. Reception (SWL mode) does not require a license.',

  /* ── Installation ─────────────────────────────────────────── */
  install_title:       'Installation',
  install_p1:          'FT8TW is distributed as an APK file via GitHub Releases. Because it is not published on the Google Play Store, you must allow your device to install apps from external sources.',
  install_steps_title: 'Installation Steps',
  install_steps: `
    <ol>
      <li><strong>Download</strong> the latest <code>.apk</code> file from the <a href="https://github.com/danleetw/ft8tw/releases" target="_blank">GitHub Releases</a> page.</li>
      <li><strong>Allow unknown sources:</strong> Go to <em>Android Settings → Security → Install unknown apps</em> (path varies by Android version) and grant permission to your browser or file manager.</li>
      <li><strong>Open</strong> the downloaded APK and tap <em>Install</em>.</li>
      <li><strong>Grant permissions</strong> when prompted – see the table below.</li>
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

  /* ── First Setup ──────────────────────────────────────────── */
  setup_title: 'First Setup',
  setup_intro: 'Complete these steps before making your first contact.',

  setup_s1_title: '1. Enter Your Callsign',
  setup_s1_text:  'Open the <strong>Settings</strong> tab and enter your amateur radio callsign in the <em>Callsign</em> field. The app validates the format and will refuse to transmit if the callsign is invalid. Secondary callsigns and portable suffixes (e.g., BV6LC/P) are supported.',

  setup_s2_title: '2. Enter Your Grid Locator',
  setup_s2_text:  'Enter your 4-character or 6-character <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead grid locator</a> in the <em>Grid square</em> field (e.g., <code>PL05</code> or <code>PL05so</code>). This locator is transmitted in FT8 messages and used to calculate distances. Tap the locate button to fill in your grid automatically using GPS.',

  setup_s3_title: '3. Select Operating Band',
  setup_s3_text:  'Choose your carrier frequency band (e.g., 20m, 40m) from the <em>Frequency</em> selector. If CAT control is connected, the app will automatically tune the radio to the standard FT8 dial frequency for that band.',

  setup_s4_title: '4. Select FT4 or FT8 Mode',
  setup_s4_text:  'Use the <em>FT4/FT8 mode</em> toggle to choose your operating mode. FT8 uses 15-second TX/RX slots and is the more widely used mode. FT4 uses 7.5-second slots and is approximately 4 dB less sensitive but twice as fast.',

  setup_s5_title: '5. Synchronize Time',
  setup_s5_text:  'FT8 decoding requires your device clock to be accurate to within ±1 second. In Settings, tap <strong>Sync</strong> to synchronize with an internet NTP server. A GPS fix also provides highly accurate time. The app displays the current time offset after synchronization.',

  /* ── Main Screens ─────────────────────────────────────────── */
  screens_title: 'Main Screens',
  screens_intro: 'FT8TW has five tabs accessible from the bottom navigation bar:',

  screens_content_title: 'Content Tab',
  screens_content_text:  'The primary operating screen. Shows a list of decoded stations currently calling CQ. Each row displays callsign, signal level (dB), time offset (Δt), audio frequency (Hz), Maidenhead grid, distance, and country/location. Tap a row to select that station as your call target.',

  screens_decode_title:       'Decode Tab',
  screens_decode_text:        'Displays all raw decoded messages from the current cycle in chronological order. Useful for monitoring overall band activity and verifying your receive chain. Two display modes are available: <strong>Standard</strong> (full details) and <strong>Simple</strong> (compact).',
  screens_decode_modes_label: 'Decode depth modes:',
  screens_decode_modes: `
    <ul>
      <li><strong>Fast</strong> – Single-pass decode; low CPU usage; may miss very weak signals</li>
      <li><strong>Standard</strong> – Balanced speed and sensitivity (recommended default)</li>
      <li><strong>Deep</strong> – Multiple decode passes; highest sensitivity; higher CPU and battery use</li>
    </ul>`,

  screens_calling_title: 'Calling Tab',
  screens_calling_text:  'Your transmit control panel. Displays the current target callsign, TX audio frequency, cycle sequence counter, and QSO/message counts. Start and stop transmitting from this tab.',
  screens_calling_features: `
    <ul>
      <li><strong>TX Freq</strong> – Your transmit audio frequency in Hz (valid range: 0–2900 Hz; default 1500 Hz)</li>
      <li><strong>Locked TX=RX</strong> – TX frequency follows the selected station's frequency</li>
      <li><strong>Tx/Rx Split</strong> – TX and RX use independent frequencies</li>
      <li><strong>CQ Modifier</strong> – Append a geographic or activity modifier to your CQ (e.g., <code>CQ DX</code>, <code>CQ EU</code>)</li>
      <li><strong>Free Text</strong> – Send a custom free-text message (max 13 characters)</li>
      <li><strong>Auto response CQ</strong> – Automatically reply to CQ calls; configure priority in Settings</li>
    </ul>`,

  screens_logs_title: 'QSO Logs Tab',
  screens_logs_text:  'A chronological list of all completed QSOs. Each entry shows callsign, band, mode, date/time (UTC), grid, RST reports, and confirmation status (Unconfirmed / LoTW / QRZ / Manual). Tap an entry to view full details or confirm the contact.',

  screens_settings_title: 'Settings Tab',
  screens_settings_text:  'All configuration options for your station, radio interface, decoding, logging, and third-party integrations. See the Settings Reference section for a complete list.',

  /* ── Radio Connection ─────────────────────────────────────── */
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

  /* ── Operating ────────────────────────────────────────────── */
  op_title: 'Operating FT8 / FT4',

  op_rx_title:      'Receiving',
  op_rx_text:       'Tap <strong>Start decoding</strong> on the Content or Decode tab. The app records audio and decodes FT8/FT4 messages at the start of each 15-second (FT8) or 7.5-second (FT4) slot. Decoded stations appear in the Content list.',
  op_rx_tips_label: 'Tips for good reception:',
  op_rx_tips: `
    <ul>
      <li>Set your radio to <strong>USB mode</strong> (Upper Sideband). Do not use LSB, AM, or FM for FT8.</li>
      <li>Center the audio passband around <strong>1500 Hz</strong> for best results. The valid audio range is 200–2700 Hz.</li>
      <li>Adjust the radio's AF gain so the audio level is strong but not clipping. Clipping causes decoding failures.</li>
      <li>Use <strong>Deep</strong> decode mode for weak-signal DX conditions.</li>
      <li>Enable <strong>DeNoise</strong> on the Spectrum screen to suppress broadband noise.</li>
    </ul>`,

  op_tx_title: 'Making a Contact',
  op_tx_text:  'A typical FT8 QSO is fully automated once you select a target station:',
  op_tx_seq: `
    <ol>
      <li>In the <strong>Content</strong> tab, tap a station calling CQ to select them as your target.</li>
      <li>Switch to the <strong>Calling</strong> tab and tap <strong>TX</strong> to start transmitting.</li>
      <li>The app automatically sequences through the FT8 exchange:<br>
        <code>CQ reply → RST report → RRR → 73</code></li>
      <li>The QSO is logged automatically upon completion.</li>
    </ol>`,

  op_autocq_title: 'Auto CQ Response',
  op_autocq_text:  'Enable <strong>Auto response CQ</strong> in the Calling tab to respond to CQ calls without manual intervention. Select a priority strategy in Settings → CQ method:',
  op_autocq_opts: `
    <ul>
      <li><strong>Strong &amp; Nearby</strong> – Prioritize stations with strong signals and short distance</li>
      <li><strong>Grid Distance: Far</strong> – Prefer distant stations (useful for distance award chasers)</li>
      <li><strong>Grid Distance: Near</strong> – Prefer nearby stations</li>
      <li><strong>More (ITU/CQ/DX) Zone</strong> – Prefer zones where most stations are calling</li>
      <li><strong>ITU / CQ / DX Zone Priority</strong> – Prefer specific zone types for award chasing</li>
    </ul>`,
  op_autocq_filter: 'Use <strong>Exclude QSOs</strong> in Settings to automatically skip stations already worked within a selected time window (1 hour, 4 hours, Today, 30 days, or 365 days).',

  op_watchdog_title: 'TX Watchdog',
  op_watchdog_text:  'The TX watchdog automatically stops transmitting after a configurable time limit (in minutes) to prevent accidentally prolonged transmission. Set the limit in Settings → TX watchdog. Set to 0 to disable.',

  op_noresponse_title: 'No Response Limit',
  op_noresponse_text:  'If the called station does not reply after a set number of TX cycles, the app stops calling automatically and frees the system for the next station. Configure the limit in Settings → No response.',

  op_freetext_title: 'Free Text Mode',
  op_freetext_text:  'Tap the free text icon in the Calling tab to enter a custom message up to 13 characters. Free text bypasses the standard FT8 QSO sequence — use it for special event messages or announcements. Switch back to Standard Message Mode to resume normal QSOs.',

  /* ── QSO Logging ──────────────────────────────────────────── */
  log_title: 'QSO Logging',
  log_intro: 'FT8TW logs every completed QSO automatically. The log database stores date/time (UTC), callsign, band, mode, frequency, RST reports, grid locator, and confirmation status.',

  log_view_title:  'Viewing Logs',
  log_view_text:   'Open the <strong>QSO Logs</strong> tab to browse your contact history. Tap a log entry to view full details. Long-press an entry to manually mark it as confirmed.',
  log_view_filter: 'Filter options: <em>Show all</em>, <em>Show confirmed</em>, or <em>Show unconfirmed</em>.',

  log_export_title: 'Exporting Logs',
  log_export_text:  'Logs are exported via FT8TW\'s built-in web server. Tap <strong>Export</strong> in the Logs tab; the app displays a local URL. Open that URL in a browser on any device on the same WiFi network. Available export formats:',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> – Industry-standard amateur radio log format; compatible with LoTW, WSJT-X, Log4OM, N1MM, and most logging software</li>
      <li><strong>CSV</strong> – Comma-separated values for spreadsheet analysis</li>
      <li><strong>TEXT</strong> – Human-readable plain text</li>
      <li><strong>SOTA</strong> – Summits on the Air format (requires SOTA summit reference)</li>
    </ul>`,
  log_share_text: 'Alternatively, use <strong>Share logs</strong> (in the Logs menu) to send an ADIF file directly via Android\'s share sheet — email, cloud storage, messaging apps, etc.',

  log_import_title: 'Importing Logs',
  log_import_text:  'Import ADIF files via the web UI to synchronize log history from other software (JTDX, WSJT-X, LoTW, Log4OM, N1MM, Log32, etc.). The importer reports how many records were added, updated, or skipped.',

  log_confirm_title: 'Confirming QSOs',
  log_confirm_text:  'QSOs can be confirmed through three methods:',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> – Download your LoTW ADIF file from <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> and import it; matching contacts are marked as LoTW-confirmed</li>
      <li><strong>QRZ.com Logbook</strong> – Enable auto-upload (Settings → QRZ.com); QRZ.com automatically marks mutual contacts as confirmed</li>
      <li><strong>Manual</strong> – Long-press any log entry and tap <em>Manual confirmation</em></li>
    </ul>`,

  /* ── Third-party Services ─────────────────────────────────── */
  third_title: 'Third-party Services',

  third_cloudlog_title: 'Cloudlog',
  third_cloudlog_text:  'FT8TW can upload QSOs to a <a href="https://www.cloudlogger.de" target="_blank">Cloudlog</a> instance in real time via its REST API.',
  third_cloudlog_setup: `
    <ol>
      <li>Go to Settings → <strong>Cloudlog Settings</strong>.</li>
      <li>Enter the <strong>Server Address</strong> (e.g., <code>https://cloudlog.example.com</code>).</li>
      <li>Enter your Cloudlog <strong>API Key</strong> (found in Cloudlog → My Profile).</li>
      <li>Enter the <strong>Station ID</strong> if you operate multiple stations in Cloudlog.</li>
      <li>Tap <strong>Test</strong> to verify connectivity – a success message confirms the connection.</li>
      <li>Enable <strong>Auto-upload to Cloudlog</strong>.</li>
    </ol>`,

  third_qrz_title: 'QRZ.com Logbook',
  third_qrz_text:  'Automatically upload completed QSOs to your QRZ.com online logbook. Requires a QRZ.com XML Subscription.',
  third_qrz_setup: `
    <ol>
      <li>Go to Settings → <strong>QRZ.com Settings</strong>.</li>
      <li>Enter your <strong>QRZ.com API Key</strong> (found under your callsign page → Logbook settings).</li>
      <li>Enable <strong>Auto-upload to QRZ.com</strong>.</li>
      <li>Use the <strong>Manual Upload</strong> button to push existing logs on demand.</li>
    </ol>`,

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> is a worldwide propagation mapping service. FT8TW submits reception spots automatically — no account is required. Enable the feature in Settings → PSKReporter. Your callsign, grid, and received station data are submitted anonymously over HTTPS.',

  /* ── Settings Reference ───────────────────────────────────── */
  set_title: 'Settings Reference',

  set_station_title: 'Station',
  set_station_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Callsign</td><td>Your amateur radio callsign (required to transmit)</td></tr>
      <tr><td>Grid square</td><td>Your 4- or 6-character Maidenhead locator</td></tr>
    </table>`,

  set_radio_title: 'Radio / Connection',
  set_radio_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Connection type</td><td>USB, Bluetooth, Network, or VOX</td></tr>
      <tr><td>Radio model</td><td>Your transceiver model (USB / Bluetooth mode)</td></tr>
      <tr><td>Serial port</td><td>USB serial device path</td></tr>
      <tr><td>Baud rate</td><td>CAT serial speed (must match radio setting)</td></tr>
      <tr><td>CI-V address</td><td>ICOM CI-V bus address (ICOM radios only)</td></tr>
      <tr><td>PTT control</td><td>VOX / CAT / RTS / DTR – how PTT is asserted</td></tr>
      <tr><td>PTT delay</td><td>Milliseconds to wait after PTT before sending audio</td></tr>
      <tr><td>TX delay</td><td>Audio output timing compensation (ms)</td></tr>
    </table>`,

  set_op_title: 'Operation',
  set_op_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Frequency</td><td>Operating band / carrier frequency</td></tr>
      <tr><td>FT4 / FT8 mode</td><td>Toggle between FT4 and FT8</td></tr>
      <tr><td>Audio freq</td><td>Default TX audio frequency in Hz (0–2900)</td></tr>
      <tr><td>Decode mode</td><td>Fast / Standard / Deep</td></tr>
      <tr><td>Message mode</td><td>Standard or Simple display layout</td></tr>
      <tr><td>TX watchdog</td><td>Auto-stop TX after N minutes (0 = off)</td></tr>
      <tr><td>No response</td><td>Stop calling after N unanswered TX cycles</td></tr>
      <tr><td>CQ method</td><td>Priority strategy for Auto response CQ</td></tr>
      <tr><td>Exclude QSOs</td><td>Skip stations worked within selected time window</td></tr>
      <tr><td>Time offset</td><td>Manual clock correction in seconds</td></tr>
      <tr><td>Sync</td><td>Synchronize clock with internet NTP server</td></tr>
    </table>`,

  set_audio_title: 'Audio',
  set_audio_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Sample rate</td><td>12 kHz (default), 24 kHz, or 48 kHz</td></tr>
      <tr><td>Bit depth</td><td>16-bit integer or 32-bit float audio output</td></tr>
    </table>`,

  set_display_title: 'Display &amp; Misc',
  set_display_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>Theme</td><td>Light, Dark, or follow device setting</td></tr>
      <tr><td>Keep Screen On</td><td>Prevent the screen from turning off during operation</td></tr>
      <tr><td>SWR / ALC Alert</td><td>Pop-up warning when SWR or ALC exceeds safe limits</td></tr>
      <tr><td>Save SWL Decoded</td><td>Store all decoded messages to the database (increases storage use)</td></tr>
      <tr><td>Save QSO for SWL</td><td>Log overheard QSOs between other stations</td></tr>
      <tr><td>Clear QSO count</td><td>Reset the session QSO counter</td></tr>
      <tr><td>Del Temp files</td><td>Remove temporary log sharing files</td></tr>
    </table>`,

  /* ── Troubleshooting ──────────────────────────────────────── */
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

  /* Footer */
  footer_text: 'FT8TW · Maintained by BV6LC · Fork of FT8CN by BG7YOZ · Released under open-source license',
},

/* ════════════════════════════════════════════════════════════════
   繁體中文
════════════════════════════════════════════════════════════════ */
'zh-TW': {
  page_title: 'FT8TW 使用者手冊',
  brand_sub:  '使用者手冊',

  /* 導覽 */
  nav_intro:        '簡介',
  nav_requirements: '系統需求',
  nav_install:      '安裝',
  nav_first_setup:  '初始設定',
  nav_screens:      '主要畫面',
  nav_connection:   '電台連線',
  nav_operating:    '操作 FT8 / FT4',
  nav_logging:      '通聯記錄',
  nav_third_party:  '第三方服務',
  nav_settings:     '設定說明',
  nav_troubleshoot: '問題排除',

  /* ── 簡介 ──────────────────────────────────────────────────── */
  intro_title: '簡介',
  intro_p1: 'FT8TW 是一款 Android 業餘無線電應用程式，支援 FT8 與 FT4 數位模式通聯。本程式由 BV6LC 維護，基於 BG7YOZ 開發的 FT8CN，新增了多項功能並針對中文使用者優化。',
  intro_p2: '主要功能：',
  intro_features: `
    <ul>
      <li>支援 <strong>FT8</strong>（15 秒時隙）及 <strong>FT4</strong>（7.5 秒時隙）數位模式</li>
      <li>透過 USB CAT、藍牙 SPP、FlexRadio WiFi、ICOM RS-BA1 或協谷 WiFi 控制 <strong>40+ 款電台</strong></li>
      <li>使用原生 <strong>C/C++ 訊號處理</strong>（LDPC、CRC、Kiss FFT），編解碼效能優異</li>
      <li>自動回應 CQ，可設定優先策略</li>
      <li>通聯日誌管理，支援 ADIF 匯出／匯入及日誌分享</li>
      <li>整合 <strong>Cloudlog</strong>、<strong>QRZ.com</strong> 及 <strong>PSKReporter</strong></li>
      <li>Maidenhead 網格追蹤器，結合 OpenStreetMap 顯示</li>
      <li>ITU、CQ 分區及 DXCC 統計</li>
      <li>淺色 / 深色 / 跟隨系統佈景</li>
      <li>需要 Android 5.0（API 21）或更新版本</li>
    </ul>`,

  /* ── 系統需求 ───────────────────────────────────────────────── */
  req_title:        '系統需求',
  req_device_title: '裝置需求',
  req_device_list: `
    <ul>
      <li>Android 5.0（Lollipop，API 21）或更新版本</li>
      <li>至少 150 MB 可用儲存空間</li>
      <li>USB 連線需裝置支援 <strong>USB OTG</strong></li>
      <li>藍牙連線需支援 Bluetooth 2.0 以上及 SPP 協議</li>
      <li>需有可用麥克風（內建或有線耳機）以接收音訊</li>
    </ul>`,
  req_license_title: '業餘無線電執照',
  req_license_text:  'FT8TW 供持有有效業餘無線電執照的人士使用。發射訊號必須持有當地電信主管機關核發的執照。純接收（SWL 模式）無需執照。',

  /* ── 安裝 ──────────────────────────────────────────────────── */
  install_title:       '安裝',
  install_p1:          'FT8TW 以 APK 格式透過 GitHub Releases 發布，尚未上架 Google Play 商店，因此需要允許安裝來自外部來源的應用程式。',
  install_steps_title: '安裝步驟',
  install_steps: `
    <ol>
      <li>前往 <a href="https://github.com/danleetw/ft8tw/releases" target="_blank">GitHub Releases</a> 頁面，下載最新的 <code>.apk</code> 檔案。</li>
      <li><strong>開啟未知來源安裝：</strong>進入<em>設定 → 安全性 → 安裝未知應用程式</em>（路徑依 Android 版本略有不同），對您的瀏覽器或檔案管理員授予安裝權限。</li>
      <li>開啟下載的 APK 檔案，點選<em>安裝</em>。</li>
      <li>依提示授予所需權限（參見下方權限說明）。</li>
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

  /* ── 初始設定 ───────────────────────────────────────────────── */
  setup_title: '初始設定',
  setup_intro: '首次使用前，請完成以下設定。',

  setup_s1_title: '1. 輸入呼號',
  setup_s1_text:  '開啟<strong>設置</strong>頁面，在<em>我的呼號</em>欄位輸入您的業餘無線電呼號。程式會驗證呼號格式，若呼號無效將無法發射。支援附加字尾（如 BV6LC/P）。',

  setup_s2_title: '2. 輸入網格座標',
  setup_s2_text:  '在<em>我的位置</em>欄位輸入 4 碼或 6 碼的 <a href="https://www.qrz.com/page/maidenhead.html" target="_blank">Maidenhead 網格座標</a>（例如 <code>PL05</code> 或 <code>PL05so</code>）。此座標會在 FT8 訊息中傳送，也用於計算通聯距離。可點選定位按鈕由 GPS 自動填入。',

  setup_s3_title: '3. 選擇頻段',
  setup_s3_text:  '從<em>載波頻段</em>選擇器選擇操作頻段（如 20m、40m）。若已連接 CAT 控制，程式會自動將電台調至該頻段的 FT8 標準頻率。',

  setup_s4_title: '4. 選擇 FT4 或 FT8 模式',
  setup_s4_text:  '使用<em>FT4/FT8 模式</em>切換選擇操作模式。FT8 使用 15 秒時隙，使用較為普遍。FT4 使用 7.5 秒時隙，速度較快但靈敏度低約 4 dB。',

  setup_s5_title: '5. 時間同步',
  setup_s5_text:  'FT8 解碼需要裝置時間準確至 ±1 秒內。在設置頁面點選<strong>同步時間</strong>，透過網路 NTP 伺服器校時。取得 GPS 訊號亦可提供高精度時間。同步後程式會顯示目前的時間偏差值。',

  /* ── 主要畫面 ───────────────────────────────────────────────── */
  screens_title: '主要畫面',
  screens_intro: 'FT8TW 底部導覽列有五個分頁：',

  screens_content_title: '通聯內容（Content）',
  screens_content_text:  '主要操作畫面，顯示目前正在呼叫 CQ 的電台清單。每一列顯示呼號、訊號強度（dB）、時間偏差（Δt）、音訊頻率（Hz）、Maidenhead 網格、距離及國家地點。點選任一列即可選定為呼叫目標。',

  screens_decode_title:       '解碼（Decode）',
  screens_decode_text:        '依時序顯示目前週期內解碼到的所有原始訊息，適合監看波段活動及驗證接收鏈路。提供<strong>標準</strong>（完整資訊）及<strong>精簡</strong>兩種顯示模式。',
  screens_decode_modes_label: '解碼深度模式：',
  screens_decode_modes: `
    <ul>
      <li><strong>快速</strong> — 單次解碼，CPU 佔用低，弱訊號可能遺漏</li>
      <li><strong>標準</strong> — 速度與靈敏度均衡（建議預設）</li>
      <li><strong>多次</strong> — 多輪解碼，靈敏度最高，CPU 及電池消耗較大</li>
    </ul>`,

  screens_calling_title: '呼叫（Calling）',
  screens_calling_text:  '發射控制面板，顯示目標呼號、發射音訊頻率、週期序號計數及 QSO / 訊息數量。在此頁面啟動及停止發射。',
  screens_calling_features: `
    <ul>
      <li><strong>發射頻率（TX Freq）</strong> — 發射音訊頻率（有效範圍：0–2900 Hz，預設 1500 Hz）</li>
      <li><strong>同頻發射</strong> — 發射頻率跟隨選定電台的接收頻率</li>
      <li><strong>異頻發射</strong> — 發射與接收使用各自獨立的頻率</li>
      <li><strong>CQ 對象</strong> — 在 CQ 呼叫後附加地理或活動修飾詞（如 <code>CQ DX</code>、<code>CQ EU</code>）</li>
      <li><strong>自定義訊息</strong> — 發送最多 13 個字元的自由文字</li>
      <li><strong>自動回應 CQ</strong> — 自動回應收到的 CQ，優先策略可在設置中設定</li>
    </ul>`,

  screens_logs_title: '通聯記錄（QSO Logs）',
  screens_logs_text:  '依時序顯示所有已完成的通聯記錄。每筆包含呼號、頻段、模式、UTC 時間、網格、RST 報告及確認狀態（未確認 / LoTW / QRZ / 手工確認）。點選記錄可查看詳情或確認通聯。',

  screens_settings_title: '設置（Settings）',
  screens_settings_text:  '包含電台資訊、電台連線、解碼、日誌、第三方整合等所有設定選項。詳細說明請參閱「設定說明」章節。',

  /* ── 電台連線 ───────────────────────────────────────────────── */
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

  /* ── 操作 ──────────────────────────────────────────────────── */
  op_title: '操作 FT8 / FT4',

  op_rx_title:      '接收',
  op_rx_text:       '點選通聯內容或解碼頁面的<strong>開始解碼</strong>。程式會開始錄製音訊，並在每個 15 秒（FT8）或 7.5 秒（FT4）時隙開始時進行解碼。解碼到的電台會顯示在通聯內容清單中。',
  op_rx_tips_label: '接收品質提示：',
  op_rx_tips: `
    <ul>
      <li>電台請設定為 <strong>USB 模式</strong>（上旁頻）。勿使用 LSB、AM 或 FM。</li>
      <li>將音訊通帶中心設在 <strong>1500 Hz</strong> 附近效果最佳，有效音訊範圍為 200–2700 Hz。</li>
      <li>調整電台的 AF 增益，確保音訊訊號強勁但不失真。失真會造成解碼失敗。</li>
      <li>弱訊號 DX 情況下使用<strong>多次</strong>解碼模式。</li>
      <li>在頻譜畫面開啟<strong>噪聲抑制（DeNoise）</strong>以降低寬頻雜訊。</li>
    </ul>`,

  op_tx_title: '建立通聯',
  op_tx_text:  '選定目標電台後，FT8 通聯流程將全自動進行：',
  op_tx_seq: `
    <ol>
      <li>在<strong>通聯內容</strong>頁面，點選正在呼叫 CQ 的電台以選定為目標。</li>
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
      <li><strong>區域最多優先（ITU/CQ/DX）</strong> — 優先回應呼叫數量最多的分區</li>
      <li><strong>ITU / CQ / DX 分區優先</strong> — 依指定分區類型優先排序（適合獎項追求）</li>
    </ul>`,
  op_autocq_filter: '在設置中使用<strong>排除已通聯</strong>，可自動跳過在選定時間窗口內（1 小時、4 小時、今天、30 天、365 天）已通聯過的電台。',

  op_watchdog_title: '發射監管（TX Watchdog）',
  op_watchdog_text:  '發射監管功能在設定的分鐘數後自動停止發射，防止意外長時間佔用頻道。在設置 → 發射監管中設定時間限制，設為 0 表示停用。',

  op_noresponse_title: '沒回應次數限制',
  op_noresponse_text:  '若被呼叫的電台在設定的週期數內均無回應，程式將自動停止呼叫，以便嘗試下一個目標。在設置 → 沒回應中設定次數限制。',

  op_freetext_title: '自定義訊息模式',
  op_freetext_text:  '點選呼叫頁面的自定義訊息圖示，輸入最多 13 個字元的自由文字。自定義訊息會跳過標準 FT8 通聯流程，適用於特殊活動或公告。點選「標準訊息模式」可返回正常通聯。',

  /* ── 通聯記錄 ───────────────────────────────────────────────── */
  log_title: '通聯記錄',
  log_intro: 'FT8TW 自動記錄每筆完成的通聯。日誌資料庫儲存 UTC 時間、呼號、頻段、模式、頻率、RST 報告、網格座標及確認狀態。',

  log_view_title:  '查看記錄',
  log_view_text:   '開啟<strong>通聯記錄</strong>頁面可瀏覽聯絡歷史。點選任一記錄查看完整資訊，長按記錄可手動標記為已確認。',
  log_view_filter: '篩選選項：<em>顯示全部</em>、<em>只顯示確認的</em> 或 <em>只顯示未確認的</em>。',

  log_export_title: '匯出日誌',
  log_export_text:  '日誌透過 FT8TW 內建的 Web 伺服器匯出。點選記錄頁面的<strong>匯出</strong>，程式會顯示一組本地網址；在同一 WiFi 網路的其他裝置瀏覽器中開啟該網址即可下載。支援格式：',
  log_export_formats: `
    <ul>
      <li><strong>ADIF (.adi)</strong> — 業餘無線電標準日誌格式，相容 LoTW、WSJT-X、Log4OM、N1MM 等</li>
      <li><strong>CSV</strong> — 逗號分隔格式，可用試算表軟體分析</li>
      <li><strong>TEXT</strong> — 純文字格式</li>
      <li><strong>SOTA</strong> — 山峰通聯（Summits on the Air）格式（需填入山峰編號）</li>
    </ul>`,
  log_share_text: '也可使用<strong>分享通聯紀錄</strong>功能（記錄選單中），透過 Android 分享介面直接傳送 ADIF 檔案——電子郵件、雲端儲存、通訊軟體等均可使用。',

  log_import_title: '匯入日誌',
  log_import_text:  '透過 Web UI 匯入 ADIF 檔案，可同步來自其他軟體（JTDX、WSJT-X、LoTW、Log4OM、N1MM、Log32 等）的歷史記錄。匯入完成後程式會顯示新增、更新及略過的記錄數。',

  log_confirm_title: '確認通聯',
  log_confirm_text:  '通聯可透過三種方式確認：',
  log_confirm_list: `
    <ul>
      <li><strong>LoTW</strong> — 從 <a href="https://lotw.arrl.org" target="_blank">lotw.arrl.org</a> 下載您的 LoTW ADIF 檔並匯入，符合的記錄會標記為 LoTW 已確認</li>
      <li><strong>QRZ.com 日誌簿</strong> — 啟用自動上傳（設置 → QRZ.com）；雙方均上傳後 QRZ.com 自動標記為已確認</li>
      <li><strong>手工確認</strong> — 長按任一日誌記錄，點選<em>手工確認</em></li>
    </ul>`,

  /* ── 第三方服務 ─────────────────────────────────────────────── */
  third_title: '第三方服務',

  third_cloudlog_title: 'Cloudlog',
  third_cloudlog_text:  'FT8TW 可透過 REST API 即時將通聯記錄上傳至 <a href="https://www.cloudlogger.de" target="_blank">Cloudlog</a> 伺服器。',
  third_cloudlog_setup: `
    <ol>
      <li>進入設置 → <strong>Cloudlog 設定</strong>。</li>
      <li>輸入<strong>伺服器地址</strong>（例如 <code>https://cloudlog.example.com</code>）。</li>
      <li>輸入 Cloudlog 帳號中的 <strong>API 金鑰</strong>（Cloudlog → 我的個人資料）。</li>
      <li>若 Cloudlog 中設有多個站台，請輸入<strong>站點 ID</strong>。</li>
      <li>點選<strong>測試連線</strong>驗證設定是否正確，成功訊息表示連線正常。</li>
      <li>開啟<strong>自動上傳至 Cloudlog</strong>。</li>
    </ol>`,

  third_qrz_title: 'QRZ.com 日誌簿',
  third_qrz_text:  '自動將完成的通聯上傳至您的 QRZ.com 線上日誌簿。需要 QRZ.com XML 訂閱方案。',
  third_qrz_setup: `
    <ol>
      <li>進入設置 → <strong>QRZ.com 設定</strong>。</li>
      <li>輸入您的 <strong>QRZ.com API 金鑰</strong>（在 QRZ.com 呼號頁面 → Logbook 設定中取得）。</li>
      <li>開啟<strong>自動上傳至 QRZ.com</strong>。</li>
      <li>可點選<strong>手動上傳</strong>按鈕立即推送現有日誌。</li>
    </ol>`,

  third_psk_title: 'PSKReporter',
  third_psk_text:  '<a href="https://pskreporter.info" target="_blank">PSKReporter</a> 是全球無線電傳播地圖服務。FT8TW 可自動提交收聽報告，無需帳號。在設置中開啟 PSKReporter 功能。您的呼號、網格及收聽到的電台資訊將透過 HTTPS 匿名提交。',

  /* ── 設定說明 ───────────────────────────────────────────────── */
  set_title: '設定說明',

  set_station_title: '站台',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>我的呼號</td><td>您的業餘無線電呼號（發射前必填）</td></tr>
      <tr><td>我的位置（Grid）</td><td>4 碼或 6 碼 Maidenhead 網格座標</td></tr>
    </table>`,

  set_radio_title: '電台 / 連線',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>連接方式</td><td>USB、藍牙、網路或 VOX</td></tr>
      <tr><td>電台型號</td><td>您的電台型號（USB / 藍牙模式）</td></tr>
      <tr><td>連接埠</td><td>USB 序列裝置路徑</td></tr>
      <tr><td>傳輸速率</td><td>CAT 序列速度（須與電台設定相符）</td></tr>
      <tr><td>CI-V 地址</td><td>ICOM CI-V 匯流排地址（僅 ICOM 電台）</td></tr>
      <tr><td>PTT 控制方式</td><td>VOX / CAT / RTS / DTR</td></tr>
      <tr><td>PTT 延遲</td><td>PTT 觸發後至開始發射音訊的等待時間（毫秒）</td></tr>
      <tr><td>發射延遲</td><td>音訊輸出時序補償（毫秒）</td></tr>
    </table>`,

  set_op_title: '操作',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>載波頻段</td><td>操作頻段</td></tr>
      <tr><td>FT4/FT8 模式</td><td>切換 FT4 或 FT8</td></tr>
      <tr><td>預設頻率</td><td>預設發射音訊頻率（0–2900 Hz）</td></tr>
      <tr><td>解碼模式</td><td>快速 / 標準 / 多次</td></tr>
      <tr><td>顯示模式</td><td>標準列表或精簡列表</td></tr>
      <tr><td>發射監管</td><td>N 分鐘後自動停止發射（0 = 停用）</td></tr>
      <tr><td>沒回應</td><td>N 次無回應後停止呼叫</td></tr>
      <tr><td>回應 CQ 方案</td><td>自動回應 CQ 的優先策略</td></tr>
      <tr><td>排除已通聯</td><td>跳過在選定時間窗口內已通聯過的電台</td></tr>
      <tr><td>時間偏移</td><td>手動時鐘修正（秒）</td></tr>
      <tr><td>同步時間</td><td>透過網路 NTP 伺服器校時</td></tr>
    </table>`,

  set_audio_title: '音訊',
  set_audio_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>取樣頻率</td><td>12 kHz（預設）、24 kHz 或 48 kHz</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮點音訊輸出</td></tr>
    </table>`,

  set_display_title: '顯示與其他',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>佈景模式</td><td>淺色、深色或跟隨裝置設定</td></tr>
      <tr><td>防止螢幕關閉</td><td>操作中防止螢幕自動熄滅</td></tr>
      <tr><td>SWR / ALC 警報</td><td>駐波比或 ALC 超出安全值時顯示警告</td></tr>
      <tr><td>保存解碼訊息</td><td>將所有解碼訊息存入資料庫（增加儲存空間使用量）</td></tr>
      <tr><td>保存 SWL 記錄</td><td>記錄監聽到的其他電台 QSO</td></tr>
      <tr><td>清除 QSO 計數</td><td>重設本次作業的 QSO 計數器</td></tr>
      <tr><td>清除暫存檔</td><td>刪除日誌分享的暫存檔案</td></tr>
    </table>`,

  /* ── 問題排除 ───────────────────────────────────────────────── */
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

  /* 頁尾 */
  footer_text: 'FT8TW · 由 BV6LC 維護 · 基於 BG7YOZ 開發的 FT8CN · 以開源授權發布',
},

}; /* end T */

/* ════════════════════════════════════════════════════════════════
   Engine
════════════════════════════════════════════════════════════════ */

let currentLang = 'en';

function applyLang(lang) {
  const dict = T[lang];
  if (!dict) return;
  currentLang = lang;

  /* Update page title */
  document.title = dict.page_title || document.title;

  /* Update html[lang] */
  document.documentElement.lang = lang;

  /* Text content nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  /* HTML content nodes */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* Active button highlight */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* Persist */
  try { localStorage.setItem('ft8tw-lang', lang); } catch(e) {}
}

function setLang(lang) { applyLang(lang); }

/* ── Init ────────────────────────────────────────────────────── */
(function init() {
  /* Detect preferred language */
  let lang = 'en';
  try { lang = localStorage.getItem('ft8tw-lang') || lang; } catch(e) {}
  /* Honour URL param: ?lang=zh-TW */
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && T[urlLang]) lang = urlLang;
  if (!T[lang]) lang = 'en';

  applyLang(lang);

  /* Language buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  /* Mobile sidebar toggle */
  const toggle  = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  if (toggle)  toggle.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  /* Close sidebar on nav link click (mobile) */
  sidebar && sidebar.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeSidebar)
  );

  /* Active sidebar link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
})();
