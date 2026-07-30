/* ── FT8TW User Manual – i18n: Requirements ──────────────────────── */

const PAGE_T = {

en: {
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
},

'zh-TW': {
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
},

'zh-CN': {
  req_title:        '系统需求',
  req_device_title: '设备需求',
  req_device_list: `
    <ul>
      <li>Android 5.0（Lollipop，API 21）或更新版本</li>
      <li>至少 150 MB 可用存储空间</li>
      <li>USB 连接需设备支持 <strong>USB OTG</strong></li>
      <li>蓝牙连接需支持 Bluetooth 2.0 以上及 SPP 协议</li>
      <li>需有可用麦克风（内置或有线耳机）以接收音频</li>
    </ul>`,
  req_license_title: '业余无线电执照',
  req_license_text:  'FT8TW 供持有有效业余无线电执照的人士使用。发射信号必须持有当地电信主管部门核发的执照。纯接收（SWL 模式）无需执照。',
},

'ja': {
  req_title:        '動作環境',
  req_device_title: '端末の要件',
  req_device_list: `
    <ul>
      <li>Android 5.0（Lollipop、API 21）以降</li>
      <li>150 MB 以上の空き容量</li>
      <li>USB 接続の場合：端末が <strong>USB OTG</strong> に対応していること</li>
      <li>Bluetooth 接続の場合：Bluetooth 2.0 以降で SPP プロファイルに対応していること</li>
      <li>音声受信のための使用可能なマイク（内蔵または有線）</li>
    </ul>`,
  req_license_title: 'アマチュア無線免許',
  req_license_text:  'FT8TW は免許を受けたアマチュア無線家の使用を想定しています。送信するには各国の電気通信主管庁が発行する有効なアマチュア無線免許が必要です。受信のみ（SWL モード）であれば免許は不要です。',
},

'ru': {
  req_title:        'Требования',
  req_device_title: 'Требования к устройству',
  req_device_list: `
    <ul>
      <li>Android 5.0 (Lollipop, API 21) или новее</li>
      <li>Не менее 150 МБ свободной памяти</li>
      <li>Для подключения по USB: устройство должно поддерживать <strong>USB OTG</strong></li>
      <li>Для подключения по Bluetooth: Bluetooth 2.0 или новее с поддержкой профиля SPP</li>
      <li>Исправный микрофон (встроенный или проводной) для приёма звука</li>
    </ul>`,
  req_license_title: 'Любительская лицензия',
  req_license_text:  'FT8TW предназначена для лицензированных радиолюбителей. Для передачи требуется действующая любительская лицензия, выданная органом связи вашей страны. Для приёма (режим SWL) лицензия не нужна.',
},

'pl': {
  req_title:        'Wymagania',
  req_device_title: 'Wymagania sprzętowe',
  req_device_list: `
    <ul>
      <li>Android 5.0 (Lollipop, API 21) lub nowszy</li>
      <li>Co najmniej 150 MB wolnej pamięci</li>
      <li>Do połączenia USB: urządzenie musi obsługiwać <strong>USB OTG</strong></li>
      <li>Do połączenia Bluetooth: Bluetooth 2.0 lub nowszy z obsługą profilu SPP</li>
      <li>Sprawny mikrofon (wbudowany lub przewodowy) do odbioru dźwięku</li>
    </ul>`,
  req_license_title: 'Licencja krótkofalarska',
  req_license_text:  'FT8TW jest przeznaczona dla licencjonowanych krótkofalowców. Do nadawania wymagana jest ważna licencja wydana przez krajowy urząd telekomunikacyjny. Sam odbiór (tryb SWL) nie wymaga licencji.',
},

'es': {
  req_title:        'Requisitos',
  req_device_title: 'Requisitos del dispositivo',
  req_device_list: `
    <ul>
      <li>Android 5.0 (Lollipop, API 21) o posterior</li>
      <li>Al menos 150 MB de espacio libre</li>
      <li>Para conexión USB: el dispositivo debe admitir <strong>USB OTG</strong></li>
      <li>Para conexión Bluetooth: Bluetooth 2.0 o posterior con perfil SPP</li>
      <li>Micrófono operativo (integrado o con cable) para la recepción de audio</li>
    </ul>`,
  req_license_title: 'Licencia de radioaficionado',
  req_license_text:  'FT8TW está destinada a radioaficionados con licencia. Para transmitir se requiere una licencia de radioaficionado válida emitida por la autoridad de telecomunicaciones de su país. La recepción (modo SWL) no requiere licencia.',
},

'el': {
  req_title:        'Απαιτήσεις',
  req_device_title: 'Απαιτήσεις συσκευής',
  req_device_list: `
    <ul>
      <li>Android 5.0 (Lollipop, API 21) ή νεότερο</li>
      <li>Τουλάχιστον 150 MB ελεύθερου χώρου</li>
      <li>Για σύνδεση USB: η συσκευή πρέπει να υποστηρίζει <strong>USB OTG</strong></li>
      <li>Για σύνδεση Bluetooth: Bluetooth 2.0 ή νεότερο με υποστήριξη προφίλ SPP</li>
      <li>Λειτουργικό μικρόφωνο (ενσωματωμένο ή ενσύρματο) για τη λήψη ήχου</li>
    </ul>`,
  req_license_title: 'Άδεια ραδιοερασιτέχνη',
  req_license_text:  'Το FT8TW προορίζεται για αδειούχους ραδιοερασιτέχνες. Για εκπομπή απαιτείται έγκυρη άδεια ραδιοερασιτέχνη από την εθνική αρχή τηλεπικοινωνιών. Η λήψη μόνο (λειτουργία SWL) δεν απαιτεί άδεια.',
},

}; /* end PAGE_T */
