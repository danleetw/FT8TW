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

}; /* end PAGE_T */
