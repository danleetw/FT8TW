/* ── FT8TW User Manual – i18n: Settings Reference ────────────────── */

const PAGE_T = {

en: {
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

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Setting</th><th>Description</th></tr>
      <tr><td>JS8 speed</td><td>Normal / Fast / Turbo / Slow submode</td></tr>
      <tr><td>JS8 heartbeat</td><td>Off, or every 10 / 15 / 30 minutes</td></tr>
      <tr><td>JS8 auto-reply</td><td>Auto-answer directed queries and/or CQ calls addressed to you</td></tr>
      <tr><td>JS8 enhanced encoding (UTX)</td><td>Force free text to always use the Unicode-capable encoding, even for plain ASCII</td></tr>
      <tr><td>WSPR TX power</td><td>Power level (dBm) encoded in the beacon message</td></tr>
      <tr><td>Waterfall color scheme</td><td>Classic or rainbow color mapping for the spectrum/waterfall display</td></tr>
      <tr><td>Floating window</td><td>Master toggle plus individual show/hide for each shortcut button</td></tr>
    </table>`,
},

'zh-TW': {
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

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>設定項目</th><th>說明</th></tr>
      <tr><td>JS8 速度</td><td>Normal / Fast / Turbo / Slow 子模式</td></tr>
      <tr><td>JS8 heartbeat</td><td>關閉，或每 10／15／30 分鐘廣播一次</td></tr>
      <tr><td>JS8 自動回覆</td><td>自動應答指向自己的查詢指令，及／或自動回應 CQ</td></tr>
      <tr><td>JS8 強化編碼（UTX）</td><td>強制自由文字一律使用可承載 Unicode 的編碼，即使是純 ASCII 內容</td></tr>
      <tr><td>WSPR 發射功率</td><td>編碼進信標訊息的功率等級（dBm）</td></tr>
      <tr><td>瀑布圖色階</td><td>頻譜／瀑布圖顯示採經典色階或彩虹色階</td></tr>
      <tr><td>浮動視窗</td><td>總開關，以及各快捷按鈕的個別顯示／隱藏</td></tr>
    </table>`,
},

'zh-CN': {
  set_title: '设置说明',

  set_station_title: '台站',
  set_station_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>我的呼号</td><td>您的业余无线电呼号（发射前必填）</td></tr>
      <tr><td>我的位置（Grid）</td><td>4 位或 6 位 Maidenhead 网格坐标</td></tr>
    </table>`,

  set_radio_title: '电台 / 连接',
  set_radio_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>连接方式</td><td>USB、蓝牙、网络或 VOX</td></tr>
      <tr><td>电台型号</td><td>您的电台型号（USB / 蓝牙模式）</td></tr>
      <tr><td>串口</td><td>USB 串口设备路径</td></tr>
      <tr><td>波特率</td><td>CAT 串口速度（须与电台设置相符）</td></tr>
      <tr><td>CI-V 地址</td><td>ICOM CI-V 总线地址（仅 ICOM 电台）</td></tr>
      <tr><td>PTT 控制方式</td><td>VOX / CAT / RTS / DTR</td></tr>
      <tr><td>PTT 延迟</td><td>PTT 触发后至开始发射音频的等待时间（毫秒）</td></tr>
      <tr><td>发射延迟</td><td>音频输出时序补偿（毫秒）</td></tr>
    </table>`,

  set_op_title: '操作',
  set_op_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>载波频段</td><td>操作频段</td></tr>
      <tr><td>FT4/FT8 模式</td><td>切换 FT4 或 FT8</td></tr>
      <tr><td>默认频率</td><td>默认发射音频频率（0–2900 Hz）</td></tr>
      <tr><td>解码模式</td><td>快速 / 标准 / 多次</td></tr>
      <tr><td>显示模式</td><td>标准列表或精简列表</td></tr>
      <tr><td>发射监管</td><td>N 分钟后自动停止发射（0 = 停用）</td></tr>
      <tr><td>无回应</td><td>N 次无回应后停止呼叫</td></tr>
      <tr><td>回应 CQ 方案</td><td>自动回应 CQ 的优先策略</td></tr>
      <tr><td>排除已通联</td><td>跳过在选定时间窗口内已通联过的电台</td></tr>
      <tr><td>时间偏移</td><td>手动时钟修正（秒）</td></tr>
      <tr><td>同步时间</td><td>通过网络 NTP 服务器校时</td></tr>
    </table>`,

  set_audio_title: '音频',
  set_audio_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>采样率</td><td>12 kHz（默认）、24 kHz 或 48 kHz</td></tr>
      <tr><td>位深</td><td>16 位整型或 32 位浮点音频输出</td></tr>
    </table>`,

  set_display_title: '显示与其他',
  set_display_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>主题模式</td><td>浅色、深色或跟随设备设置</td></tr>
      <tr><td>防止屏幕关闭</td><td>操作中防止屏幕自动熄灭</td></tr>
      <tr><td>SWR / ALC 报警</td><td>驻波比或 ALC 超出安全值时显示警告</td></tr>
      <tr><td>保存解码消息</td><td>将所有解码消息存入数据库（增加存储空间占用）</td></tr>
      <tr><td>保存 SWL 记录</td><td>记录监听到的其他电台 QSO</td></tr>
      <tr><td>清除 QSO 计数</td><td>重置本次运行的 QSO 计数器</td></tr>
      <tr><td>清除临时文件</td><td>删除日志分享的临时文件</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>设置项</th><th>说明</th></tr>
      <tr><td>JS8 速度</td><td>Normal / Fast / Turbo / Slow 子模式</td></tr>
      <tr><td>JS8 heartbeat</td><td>关闭，或每 10／15／30 分钟广播一次</td></tr>
      <tr><td>JS8 自动回复</td><td>自动应答指向自己的查询指令，及／或自动回应 CQ</td></tr>
      <tr><td>JS8 强化编码（UTX）</td><td>强制自由文本一律使用可承载 Unicode 的编码，即使是纯 ASCII 内容</td></tr>
      <tr><td>WSPR 发射功率</td><td>编码进信标消息的功率等级（dBm）</td></tr>
      <tr><td>瀑布图色阶</td><td>频谱／瀑布图显示采用经典色阶或彩虹色阶</td></tr>
      <tr><td>悬浮窗口</td><td>总开关，以及各快捷按钮的单独显示／隐藏</td></tr>
    </table>`,
},

'ja': {
  set_title: '設定リファレンス',

  set_station_title: '自局',
  set_station_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>コールサイン</td><td>自局のコールサイン（送信には必須）</td></tr>
      <tr><td>グリッド</td><td>4 桁または 6 桁の Maidenhead ロケーター</td></tr>
    </table>`,

  set_radio_title: '無線機 / 接続',
  set_radio_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>接続方式</td><td>USB、Bluetooth、ネットワーク、VOX</td></tr>
      <tr><td>無線機の機種</td><td>お使いの無線機の機種（USB / Bluetooth 時）</td></tr>
      <tr><td>シリアルポート</td><td>USB シリアルデバイスのパス</td></tr>
      <tr><td>ボーレート</td><td>CAT のシリアル速度（無線機の設定と一致させます）</td></tr>
      <tr><td>CI-V アドレス</td><td>ICOM の CI-V バスアドレス（ICOM 機のみ）</td></tr>
      <tr><td>PTT 制御</td><td>VOX / CAT / RTS / DTR — PTT の制御方法</td></tr>
      <tr><td>PTT 遅延</td><td>PTT を入れてから音声を出すまでの待ち時間（ミリ秒）</td></tr>
      <tr><td>送信遅延</td><td>音声出力のタイミング補正（ミリ秒）</td></tr>
    </table>`,

  set_op_title: '運用',
  set_op_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>周波数</td><td>運用バンド / 搬送波周波数</td></tr>
      <tr><td>FT4 / FT8 モード</td><td>FT4 と FT8 の切り替え</td></tr>
      <tr><td>音声周波数</td><td>既定の送信音声周波数（0〜2900 Hz）</td></tr>
      <tr><td>デコードモード</td><td>高速 / 標準 / 多回</td></tr>
      <tr><td>表示モード</td><td>標準表示または簡易表示</td></tr>
      <tr><td>送信ウォッチドッグ</td><td>N 分後に送信を自動停止（0 = 無効）</td></tr>
      <tr><td>無応答</td><td>応答のない送信サイクルが N 回で呼び出しを終了</td></tr>
      <tr><td>CQ 応答方式</td><td>CQ 自動応答の優先条件</td></tr>
      <tr><td>交信済みを除外</td><td>選んだ期間内に交信した局を飛ばします</td></tr>
      <tr><td>時刻オフセット</td><td>時計の手動補正（秒）</td></tr>
      <tr><td>同期</td><td>インターネットの NTP サーバーと時刻を合わせます</td></tr>
    </table>`,

  set_audio_title: '音声',
  set_audio_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>サンプリング周波数</td><td>12 kHz（既定）、24 kHz、48 kHz</td></tr>
      <tr><td>ビット深度</td><td>16 ビット整数または 32 ビット浮動小数点の音声出力</td></tr>
    </table>`,

  set_display_title: '表示・その他',
  set_display_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>テーマ</td><td>ライト、ダーク、端末の設定に従う</td></tr>
      <tr><td>画面を消さない</td><td>運用中に画面が消灯しないようにします</td></tr>
      <tr><td>SWR / ALC 警告</td><td>SWR や ALC が安全域を超えたときに警告を表示します</td></tr>
      <tr><td>デコード結果を保存</td><td>デコードした電文をすべてデータベースへ保存します（容量が増えます）</td></tr>
      <tr><td>SWL の交信を保存</td><td>他局同士の交信も記録します</td></tr>
      <tr><td>交信数をクリア</td><td>今回の交信カウンターをリセットします</td></tr>
      <tr><td>一時ファイル削除</td><td>ログ共有用の一時ファイルを削除します</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>設定項目</th><th>説明</th></tr>
      <tr><td>JS8 スピード</td><td>Normal / Fast / Turbo / Slow のサブモード</td></tr>
      <tr><td>JS8 Heartbeat</td><td>オフ、または 10 / 15 / 30 分ごと</td></tr>
      <tr><td>JS8 自動応答</td><td>自局宛ての問い合わせや CQ に自動応答します</td></tr>
      <tr><td>JS8 拡張エンコード（UTX）</td><td>純粋な ASCII でも、フリーテキストを常に Unicode 対応の符号化で送ります</td></tr>
      <tr><td>WSPR 送信出力</td><td>ビーコン電文に載せる出力（dBm）</td></tr>
      <tr><td>ウォーターフォールの配色</td><td>スペクトラム／ウォーターフォールをクラシックまたはレインボーの配色で表示</td></tr>
      <tr><td>フローティングウィンドウ</td><td>全体のオン/オフと、各ショートカットボタンの表示/非表示</td></tr>
    </table>`,
},

'ru': {
  set_title: 'Описание настроек',

  set_station_title: 'Станция',
  set_station_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Позывной</td><td>Ваш любительский позывной (обязателен для передачи)</td></tr>
      <tr><td>Локатор</td><td>Ваш локатор Maidenhead из 4 или 6 знаков</td></tr>
    </table>`,

  set_radio_title: 'Трансивер / подключение',
  set_radio_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Тип подключения</td><td>USB, Bluetooth, сеть или VOX</td></tr>
      <tr><td>Модель трансивера</td><td>Модель вашего аппарата (режим USB / Bluetooth)</td></tr>
      <tr><td>Последовательный порт</td><td>Путь к устройству USB-серийного порта</td></tr>
      <tr><td>Скорость передачи</td><td>Скорость последовательного порта CAT (должна совпадать с настройкой аппарата)</td></tr>
      <tr><td>Адрес CI-V</td><td>Адрес шины CI-V (только для трансиверов ICOM)</td></tr>
      <tr><td>Управление PTT</td><td>VOX / CAT / RTS / DTR — способ включения передачи</td></tr>
      <tr><td>Задержка PTT</td><td>Пауза после включения PTT до подачи звука (мс)</td></tr>
      <tr><td>Задержка передачи</td><td>Компенсация задержки вывода звука (мс)</td></tr>
    </table>`,

  set_op_title: 'Работа',
  set_op_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Частота</td><td>Рабочий диапазон / частота несущей</td></tr>
      <tr><td>Режим FT4 / FT8</td><td>Переключение между FT4 и FT8</td></tr>
      <tr><td>Звуковая частота</td><td>Звуковая частота передачи по умолчанию, Гц (0–2900)</td></tr>
      <tr><td>Режим декодирования</td><td>Быстро / стандарт / глубоко</td></tr>
      <tr><td>Режим отображения</td><td>Стандартный или упрощённый вид списка</td></tr>
      <tr><td>Сторожевой таймер</td><td>Автостоп передачи через N минут (0 — выключено)</td></tr>
      <tr><td>Без ответа</td><td>Прекратить вызов после N циклов без ответа</td></tr>
      <tr><td>Способ ответа на CQ</td><td>Правило приоритета для автоответа на CQ</td></tr>
      <tr><td>Исключать проведённые</td><td>Пропускать станции, сработанные за выбранный период</td></tr>
      <tr><td>Смещение времени</td><td>Ручная поправка часов в секундах</td></tr>
      <tr><td>Синхронизация</td><td>Сверка часов с NTP-сервером в интернете</td></tr>
    </table>`,

  set_audio_title: 'Звук',
  set_audio_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Частота дискретизации</td><td>12 кГц (по умолчанию), 24 кГц или 48 кГц</td></tr>
      <tr><td>Разрядность</td><td>Вывод звука: 16 бит целые или 32 бита с плавающей точкой</td></tr>
    </table>`,

  set_display_title: 'Экран и прочее',
  set_display_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Тема</td><td>Светлая, тёмная или как в системе</td></tr>
      <tr><td>Не гасить экран</td><td>Запрещает отключение экрана во время работы</td></tr>
      <tr><td>Оповещение SWR / ALC</td><td>Предупреждение при превышении безопасных значений КСВ или ALC</td></tr>
      <tr><td>Сохранять декодированное</td><td>Записывать все декодированные сообщения в базу (растёт объём данных)</td></tr>
      <tr><td>Сохранять QSO для SWL</td><td>Записывать услышанные связи других станций</td></tr>
      <tr><td>Сбросить счётчик QSO</td><td>Обнуляет счётчик связей текущего сеанса</td></tr>
      <tr><td>Удалить временные файлы</td><td>Удаляет временные файлы для обмена журналом</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Параметр</th><th>Описание</th></tr>
      <tr><td>Скорость JS8</td><td>Подрежим Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Выключено либо каждые 10 / 15 / 30 минут</td></tr>
      <tr><td>Автоответ JS8</td><td>Автоматические ответы на адресованные вам запросы и/или на вызовы CQ</td></tr>
      <tr><td>Расширенное кодирование JS8 (UTX)</td><td>Всегда использовать кодирование с поддержкой Unicode, даже для обычного ASCII</td></tr>
      <tr><td>Мощность WSPR</td><td>Уровень мощности (дБм), кодируемый в сообщении маяка</td></tr>
      <tr><td>Палитра водопада</td><td>Классическая или радужная расцветка спектра и водопада</td></tr>
      <tr><td>Плавающее окно</td><td>Общий переключатель и показ/скрытие каждой кнопки по отдельности</td></tr>
    </table>`,
},

'pl': {
  set_title: 'Opis ustawień',

  set_station_title: 'Stacja',
  set_station_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Znak wywoławczy</td><td>Twój znak krótkofalarski (wymagany do nadawania)</td></tr>
      <tr><td>Lokator</td><td>Twój 4- lub 6-znakowy lokator Maidenhead</td></tr>
    </table>`,

  set_radio_title: 'Radio / połączenie',
  set_radio_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Rodzaj połączenia</td><td>USB, Bluetooth, sieć lub VOX</td></tr>
      <tr><td>Model radia</td><td>Model twojego transceivera (tryb USB / Bluetooth)</td></tr>
      <tr><td>Port szeregowy</td><td>Ścieżka urządzenia szeregowego USB</td></tr>
      <tr><td>Prędkość transmisji</td><td>Szybkość portu CAT (musi odpowiadać ustawieniu radia)</td></tr>
      <tr><td>Adres CI-V</td><td>Adres magistrali CI-V (tylko radia ICOM)</td></tr>
      <tr><td>Sterowanie PTT</td><td>VOX / CAT / RTS / DTR — sposób załączania nadawania</td></tr>
      <tr><td>Opóźnienie PTT</td><td>Czas od załączenia PTT do podania dźwięku (ms)</td></tr>
      <tr><td>Opóźnienie nadawania</td><td>Korekta czasowa wyjścia audio (ms)</td></tr>
    </table>`,

  set_op_title: 'Praca',
  set_op_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Częstotliwość</td><td>Pasmo pracy / częstotliwość nośnej</td></tr>
      <tr><td>Tryb FT4 / FT8</td><td>Przełączanie między FT4 a FT8</td></tr>
      <tr><td>Częstotliwość audio</td><td>Domyślna akustyczna częstotliwość nadawania w Hz (0–2900)</td></tr>
      <tr><td>Tryb dekodowania</td><td>Szybki / standardowy / głęboki</td></tr>
      <tr><td>Tryb wyświetlania</td><td>Standardowy lub uproszczony układ listy</td></tr>
      <tr><td>Nadzorca nadawania</td><td>Automatyczne zatrzymanie po N minutach (0 = wyłączone)</td></tr>
      <tr><td>Brak odpowiedzi</td><td>Zakończ wywoływanie po N cyklach bez odpowiedzi</td></tr>
      <tr><td>Sposób odpowiedzi na CQ</td><td>Zasada priorytetu dla automatycznej odpowiedzi na CQ</td></tr>
      <tr><td>Pomijaj przepracowane</td><td>Pomija stacje pracowane w wybranym okresie</td></tr>
      <tr><td>Przesunięcie czasu</td><td>Ręczna korekta zegara w sekundach</td></tr>
      <tr><td>Synchronizuj</td><td>Uzgodnienie zegara z internetowym serwerem NTP</td></tr>
    </table>`,

  set_audio_title: 'Dźwięk',
  set_audio_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Częstotliwość próbkowania</td><td>12 kHz (domyślnie), 24 kHz lub 48 kHz</td></tr>
      <tr><td>Rozdzielczość bitowa</td><td>Wyjście audio 16-bitowe całkowite lub 32-bitowe zmiennoprzecinkowe</td></tr>
    </table>`,

  set_display_title: 'Wyświetlanie i inne',
  set_display_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Motyw</td><td>Jasny, ciemny lub zgodny z ustawieniem urządzenia</td></tr>
      <tr><td>Nie wygaszaj ekranu</td><td>Zapobiega wygaszaniu ekranu podczas pracy</td></tr>
      <tr><td>Alarm SWR / ALC</td><td>Ostrzeżenie, gdy SWR lub ALC przekroczy bezpieczne wartości</td></tr>
      <tr><td>Zapisuj zdekodowane</td><td>Zapisuje wszystkie zdekodowane wiadomości do bazy (rośnie zajętość pamięci)</td></tr>
      <tr><td>Zapisuj łączności SWL</td><td>Zapisuje podsłuchane łączności innych stacji</td></tr>
      <tr><td>Wyzeruj licznik łączności</td><td>Resetuje licznik łączności bieżącej sesji</td></tr>
      <tr><td>Usuń pliki tymczasowe</td><td>Kasuje pliki tymczasowe udostępniania dziennika</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ustawienie</th><th>Opis</th></tr>
      <tr><td>Prędkość JS8</td><td>Podtryb Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Wyłączony albo co 10 / 15 / 30 minut</td></tr>
      <tr><td>Automatyczna odpowiedź JS8</td><td>Automatyczne odpowiedzi na kierowane do ciebie zapytania i/lub wywołania CQ</td></tr>
      <tr><td>Rozszerzone kodowanie JS8 (UTX)</td><td>Zawsze używaj kodowania obsługującego Unicode, nawet dla zwykłego ASCII</td></tr>
      <tr><td>Moc nadawania WSPR</td><td>Poziom mocy (dBm) kodowany w wiadomości latarni</td></tr>
      <tr><td>Paleta wodospadu</td><td>Klasyczna lub tęczowa kolorystyka widma i wodospadu</td></tr>
      <tr><td>Okno pływające</td><td>Przełącznik główny oraz osobne pokazywanie/ukrywanie każdego przycisku</td></tr>
    </table>`,
},

'es': {
  set_title: 'Referencia de ajustes',

  set_station_title: 'Estación',
  set_station_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Indicativo</td><td>Tu indicativo de radioaficionado (obligatorio para transmitir)</td></tr>
      <tr><td>Localizador</td><td>Tu localizador Maidenhead de 4 o 6 caracteres</td></tr>
    </table>`,

  set_radio_title: 'Equipo / conexión',
  set_radio_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Tipo de conexión</td><td>USB, Bluetooth, red o VOX</td></tr>
      <tr><td>Modelo de equipo</td><td>El modelo de tu transceptor (modo USB / Bluetooth)</td></tr>
      <tr><td>Puerto serie</td><td>Ruta del dispositivo serie USB</td></tr>
      <tr><td>Velocidad en baudios</td><td>Velocidad del puerto CAT (debe coincidir con la del equipo)</td></tr>
      <tr><td>Dirección CI-V</td><td>Dirección del bus CI-V (solo equipos ICOM)</td></tr>
      <tr><td>Control de PTT</td><td>VOX / CAT / RTS / DTR — cómo se activa el PTT</td></tr>
      <tr><td>Retardo de PTT</td><td>Milisegundos de espera tras el PTT antes de enviar audio</td></tr>
      <tr><td>Retardo de TX</td><td>Compensación temporal de la salida de audio (ms)</td></tr>
    </table>`,

  set_op_title: 'Operación',
  set_op_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Frecuencia</td><td>Banda de trabajo / frecuencia de portadora</td></tr>
      <tr><td>Modo FT4 / FT8</td><td>Alterna entre FT4 y FT8</td></tr>
      <tr><td>Frecuencia de audio</td><td>Frecuencia de audio de transmisión por defecto en Hz (0–2900)</td></tr>
      <tr><td>Modo de decodificación</td><td>Rápido / estándar / profundo</td></tr>
      <tr><td>Modo de presentación</td><td>Lista estándar o simplificada</td></tr>
      <tr><td>Vigilante de TX</td><td>Detiene la transmisión tras N minutos (0 = desactivado)</td></tr>
      <tr><td>Sin respuesta</td><td>Deja de llamar tras N ciclos sin contestación</td></tr>
      <tr><td>Método de CQ</td><td>Estrategia de prioridad de la respuesta automática a CQ</td></tr>
      <tr><td>Excluir QSO ya hechos</td><td>Salta las estaciones trabajadas dentro del periodo elegido</td></tr>
      <tr><td>Desfase horario</td><td>Corrección manual del reloj en segundos</td></tr>
      <tr><td>Sincronizar</td><td>Ajusta el reloj con un servidor NTP de internet</td></tr>
    </table>`,

  set_audio_title: 'Audio',
  set_audio_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Frecuencia de muestreo</td><td>12 kHz (por defecto), 24 kHz o 48 kHz</td></tr>
      <tr><td>Profundidad de bits</td><td>Salida de audio de 16 bits enteros o 32 bits en coma flotante</td></tr>
    </table>`,

  set_display_title: 'Pantalla y varios',
  set_display_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Tema</td><td>Claro, oscuro o según el ajuste del dispositivo</td></tr>
      <tr><td>Mantener pantalla encendida</td><td>Evita que la pantalla se apague durante la operación</td></tr>
      <tr><td>Aviso de SWR / ALC</td><td>Advertencia emergente cuando la ROE o el ALC superan los límites seguros</td></tr>
      <tr><td>Guardar decodificados</td><td>Guarda en la base de datos todos los mensajes decodificados (ocupa más espacio)</td></tr>
      <tr><td>Guardar QSO para SWL</td><td>Registra los QSO escuchados entre otras estaciones</td></tr>
      <tr><td>Borrar contador de QSO</td><td>Reinicia el contador de QSO de la sesión</td></tr>
      <tr><td>Borrar archivos temporales</td><td>Elimina los archivos temporales de compartición del registro</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ajuste</th><th>Descripción</th></tr>
      <tr><td>Velocidad JS8</td><td>Submodo Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Desactivado, o cada 10 / 15 / 30 minutos</td></tr>
      <tr><td>Respuesta automática JS8</td><td>Contesta automáticamente a las consultas dirigidas a ti o a las llamadas CQ</td></tr>
      <tr><td>Codificación ampliada JS8 (UTX)</td><td>Usa siempre la codificación compatible con Unicode en el texto libre, incluso con ASCII simple</td></tr>
      <tr><td>Potencia de TX en WSPR</td><td>Nivel de potencia (dBm) codificado en el mensaje de la baliza</td></tr>
      <tr><td>Paleta de la cascada</td><td>Coloreado clásico o arcoíris para el espectro y la cascada</td></tr>
      <tr><td>Ventana flotante</td><td>Conmutador general y visibilidad individual de cada botón de acceso rápido</td></tr>
    </table>`,
},

'el': {
  set_title: 'Οδηγός ρυθμίσεων',

  set_station_title: 'Σταθμός',
  set_station_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Διακριτικό</td><td>Το διακριτικό σας (απαιτείται για εκπομπή)</td></tr>
      <tr><td>Τετράγωνο</td><td>Το τετράγωνο Maidenhead 4 ή 6 χαρακτήρων</td></tr>
    </table>`,

  set_radio_title: 'Πομποδέκτης / σύνδεση',
  set_radio_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Τύπος σύνδεσης</td><td>USB, Bluetooth, δίκτυο ή VOX</td></tr>
      <tr><td>Μοντέλο πομποδέκτη</td><td>Το μοντέλο του πομποδέκτη σας (λειτουργία USB / Bluetooth)</td></tr>
      <tr><td>Σειριακή θύρα</td><td>Διαδρομή συσκευής σειριακής μέσω USB</td></tr>
      <tr><td>Ρυθμός baud</td><td>Ταχύτητα σειριακής CAT (πρέπει να ταιριάζει με τη ρύθμιση του πομποδέκτη)</td></tr>
      <tr><td>Διεύθυνση CI-V</td><td>Διεύθυνση διαύλου CI-V (μόνο για πομποδέκτες ICOM)</td></tr>
      <tr><td>Έλεγχος PTT</td><td>VOX / CAT / RTS / DTR — πώς ενεργοποιείται το PTT</td></tr>
      <tr><td>Καθυστέρηση PTT</td><td>Χιλιοστά του δευτερολέπτου αναμονής μετά το PTT πριν σταλεί ήχος</td></tr>
      <tr><td>Καθυστέρηση εκπομπής</td><td>Αντιστάθμιση χρονισμού εξόδου ήχου (ms)</td></tr>
    </table>`,

  set_op_title: 'Λειτουργία',
  set_op_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Συχνότητα</td><td>Μπάντα λειτουργίας / συχνότητα φέροντος</td></tr>
      <tr><td>Λειτουργία FT4 / FT8</td><td>Εναλλαγή μεταξύ FT4 και FT8</td></tr>
      <tr><td>Συχνότητα ήχου</td><td>Προεπιλεγμένη συχνότητα ήχου εκπομπής σε Hz (0–2900)</td></tr>
      <tr><td>Λειτουργία αποκωδικοποίησης</td><td>Γρήγορη / τυπική / βαθιά</td></tr>
      <tr><td>Λειτουργία εμφάνισης</td><td>Τυπική ή απλή διάταξη λίστας</td></tr>
      <tr><td>Επιτηρητής εκπομπής</td><td>Αυτόματη διακοπή εκπομπής μετά από N λεπτά (0 = ανενεργό)</td></tr>
      <tr><td>Χωρίς απάντηση</td><td>Διακοπή κλήσης μετά από N κύκλους χωρίς απάντηση</td></tr>
      <tr><td>Μέθοδος CQ</td><td>Στρατηγική προτεραιότητας για την αυτόματη απάντηση σε CQ</td></tr>
      <tr><td>Εξαίρεση ολοκληρωμένων επαφών</td><td>Παράλειψη σταθμών με τους οποίους έγινε επαφή στο επιλεγμένο διάστημα</td></tr>
      <tr><td>Απόκλιση ώρας</td><td>Χειροκίνητη διόρθωση ρολογιού σε δευτερόλεπτα</td></tr>
      <tr><td>Συγχρονισμός</td><td>Συγχρονισμός ρολογιού με διακομιστή NTP στο διαδίκτυο</td></tr>
    </table>`,

  set_audio_title: 'Ήχος',
  set_audio_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Ρυθμός δειγματοληψίας</td><td>12 kHz (προεπιλογή), 24 kHz ή 48 kHz</td></tr>
      <tr><td>Βάθος bit</td><td>Έξοδος ήχου 16 bit ακεραίων ή 32 bit κινητής υποδιαστολής</td></tr>
    </table>`,

  set_display_title: 'Εμφάνιση και διάφορα',
  set_display_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Θέμα</td><td>Φωτεινό, σκοτεινό ή σύμφωνα με τη συσκευή</td></tr>
      <tr><td>Διατήρηση οθόνης αναμμένης</td><td>Αποτρέπει το σβήσιμο της οθόνης κατά τη λειτουργία</td></tr>
      <tr><td>Ειδοποίηση SWR / ALC</td><td>Προειδοποίηση όταν ο λόγος στάσιμων ή το ALC ξεπεράσουν τα ασφαλή όρια</td></tr>
      <tr><td>Αποθήκευση αποκωδικοποιημένων</td><td>Αποθηκεύει όλα τα αποκωδικοποιημένα μηνύματα στη βάση (αυξάνει τον χώρο)</td></tr>
      <tr><td>Αποθήκευση επαφών SWL</td><td>Καταγράφει επαφές άλλων σταθμών που ακούγονται</td></tr>
      <tr><td>Μηδενισμός μετρητή επαφών</td><td>Μηδενίζει τον μετρητή επαφών της συνεδρίας</td></tr>
      <tr><td>Διαγραφή προσωρινών αρχείων</td><td>Διαγράφει τα προσωρινά αρχεία κοινής χρήσης ημερολογίου</td></tr>
    </table>`,

  set_modes_title: 'JS8 / WSPR / SSB',
  set_modes_table: `
    <table>
      <tr><th>Ρύθμιση</th><th>Περιγραφή</th></tr>
      <tr><td>Ταχύτητα JS8</td><td>Υπολειτουργία Normal / Fast / Turbo / Slow</td></tr>
      <tr><td>Heartbeat JS8</td><td>Ανενεργό ή κάθε 10 / 15 / 30 λεπτά</td></tr>
      <tr><td>Αυτόματη απάντηση JS8</td><td>Αυτόματες απαντήσεις σε ερωτήματα προς εσάς ή/και σε κλήσεις CQ</td></tr>
      <tr><td>Εκτεταμένη κωδικοποίηση JS8 (UTX)</td><td>Χρήση της κωδικοποίησης με υποστήριξη Unicode πάντα, ακόμη και για απλό ASCII</td></tr>
      <tr><td>Ισχύς εκπομπής WSPR</td><td>Επίπεδο ισχύος (dBm) που κωδικοποιείται στο μήνυμα του φάρου</td></tr>
      <tr><td>Χρωματική κλίμακα καταρράκτη</td><td>Κλασική ή ουράνιο τόξο απόδοση χρωμάτων για φάσμα και καταρράκτη</td></tr>
      <tr><td>Αιωρούμενο παράθυρο</td><td>Γενικός διακόπτης και ξεχωριστή εμφάνιση/απόκρυψη κάθε πλήκτρου</td></tr>
    </table>`,
},

}; /* end PAGE_T */
