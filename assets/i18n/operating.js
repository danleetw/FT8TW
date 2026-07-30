/* ── FT8TW User Manual – i18n: Operating FT8 / FT4 ───────────────── */

const PAGE_T = {

en: {
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

  op_ft2_title: 'FT2 (Experimental)',
  op_ft2_text:  'FT8TW includes early support for FT2, a faster FT4-derived mode. FT2 has not yet been field-verified against a second station and should be considered experimental — please report any issues you encounter.',
},

'zh-TW': {
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

  op_ft2_title: 'FT2（實驗性）',
  op_ft2_text:  'FT8TW 已初步支援 FT2，這是基於 FT4 衍生、速度更快的模式。FT2 尚未完成與第二台電台的實機互測，請視為實驗性功能，若遇到問題還請回報。',
},

'zh-CN': {
  op_title: '操作 FT8 / FT4',

  op_rx_title:      '接收',
  op_rx_text:       '点击通联内容或解码页面的<strong>开始解码</strong>。程序会开始录制音频，并在每个 15 秒（FT8）或 7.5 秒（FT4）时隙开始时进行解码。解码到的电台会显示在通联内容列表中。',
  op_rx_tips_label: '接收质量提示：',
  op_rx_tips: `
    <ul>
      <li>电台请设置为 <strong>USB 模式</strong>（上边带）。勿使用 LSB、AM 或 FM。</li>
      <li>将音频通带中心设在 <strong>1500 Hz</strong> 附近效果最佳，有效音频范围为 200–2700 Hz。</li>
      <li>调整电台的 AF 增益，确保音频信号强劲但不失真。失真会造成解码失败。</li>
      <li>弱信号 DX 情况下使用<strong>多次</strong>解码模式。</li>
      <li>在频谱界面开启<strong>噪声抑制（DeNoise）</strong>以降低宽带噪声。</li>
    </ul>`,

  op_tx_title: '建立通联',
  op_tx_text:  '选定目标电台后，FT8 通联流程将全自动进行：',
  op_tx_seq: `
    <ol>
      <li>在<strong>通联内容</strong>页面，点击正在呼叫 CQ 的电台以选定为目标。</li>
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
      <li><strong>区域最多优先（ITU/CQ/DX）</strong> — 优先回应呼叫数量最多的分区</li>
      <li><strong>ITU / CQ / DX 分区优先</strong> — 按指定分区类型优先排序（适合奖项追求）</li>
    </ul>`,
  op_autocq_filter: '在设置中使用<strong>排除已通联</strong>，可自动跳过在选定时间窗口内（1 小时、4 小时、今天、30 天、365 天）已通联过的电台。',

  op_watchdog_title: '发射监管（TX Watchdog）',
  op_watchdog_text:  '发射监管功能在设定的分钟数后自动停止发射，防止意外长时间占用频道。在设置 → 发射监管中设定时间限制，设为 0 表示停用。',

  op_noresponse_title: '无回应次数限制',
  op_noresponse_text:  '若被呼叫的电台在设定的周期数内均无回应，程序将自动停止呼叫，以便尝试下一个目标。在设置 → 无回应中设定次数限制。',

  op_freetext_title: '自定义消息模式',
  op_freetext_text:  '点击呼叫页面的自定义消息图标，输入最多 13 个字符的自由文本。自定义消息会跳过标准 FT8 通联流程，适用于特殊活动或公告。点击「标准消息模式」可返回正常通联。',

  op_ft2_title: 'FT2（实验性）',
  op_ft2_text:  'FT8TW 已初步支持 FT2，这是基于 FT4 衍生、速度更快的模式。FT2 尚未完成与第二台电台的实机互测，请视为实验性功能，若遇到问题还请反馈。',
},

'ja': {
  op_title: 'FT8 / FT4 の運用',

  op_rx_title:      '受信',
  op_rx_text:       '交信内容タブまたはデコードタブで<strong>デコード開始</strong>をタップします。アプリが音声を録音し、15 秒（FT8）または 7.5 秒（FT4）の各スロットの先頭で FT8/FT4 の電文をデコードします。デコードした局は交信内容の一覧に表示されます。',
  op_rx_tips_label: '良好な受信のためのヒント:',
  op_rx_tips: `
    <ul>
      <li>無線機は <strong>USB モード</strong>（上側波帯）にしてください。FT8 で LSB・AM・FM は使いません。</li>
      <li>音声の通過帯域の中心を <strong>1500 Hz</strong> 付近に合わせると最良です。有効な音声範囲は 200〜2700 Hz です。</li>
      <li>無線機の AF ゲインを調整し、音声レベルを十分に大きく、かつ歪まない範囲にします。歪むとデコードに失敗します。</li>
      <li>弱い信号の DX には<strong>多回</strong>デコードモードを使います。</li>
      <li>スペクトラム画面で<strong>ノイズ抑制（DeNoise）</strong>を有効にすると広帯域の雑音を抑えられます。</li>
    </ul>`,

  op_tx_title: '交信する',
  op_tx_text:  '相手局を選べば、一般的な FT8 の交信は自動的に進みます:',
  op_tx_seq: `
    <ol>
      <li><strong>交信内容</strong>タブで CQ を出している局をタップして相手に指定します。</li>
      <li><strong>呼び出し</strong>タブに切り替え、<strong>送信</strong>をタップして送信を始めます。</li>
      <li>アプリが FT8 のシーケンスを自動的に進めます:<br>
        <code>CQ への応答 → シグナルレポート → RRR → 73</code></li>
      <li>交信が完了すると自動的にログへ記録されます。</li>
    </ol>`,

  op_autocq_title: 'CQ への自動応答',
  op_autocq_text:  '呼び出しタブで<strong>CQ 自動応答</strong>を有効にすると、手を触れずに CQ へ応答します。優先条件は 設定 → CQ 応答方式 で選べます:',
  op_autocq_opts: `
    <ul>
      <li><strong>近距離・強信号優先</strong> — 信号が強く距離の近い局を優先します</li>
      <li><strong>遠距離優先</strong> — 遠い局を優先します（距離系アワード狙いに便利）</li>
      <li><strong>近距離優先</strong> — 近い局を優先します</li>
      <li><strong>ゾーン最多優先（ITU/CQ/DX）</strong> — 呼び出しの多いゾーンを優先します</li>
      <li><strong>ITU / CQ / DX ゾーン優先</strong> — アワード狙いで特定のゾーン種別を優先します</li>
    </ul>`,
  op_autocq_filter: '設定の<strong>交信済みを除外</strong>を使うと、選んだ期間内（1 時間、4 時間、今日、30 日、365 日）にすでに交信した局を自動的に飛ばします。',

  op_watchdog_title: '送信ウォッチドッグ',
  op_watchdog_text:  '送信ウォッチドッグは設定した分数で送信を自動停止し、意図しない長時間送信を防ぎます。設定 → 送信ウォッチドッグ で上限を指定します。0 にすると無効です。',

  op_noresponse_title: '無応答回数の上限',
  op_noresponse_text:  '呼び出した局が指定した回数の送信サイクル内に応答しない場合、アプリは自動的に呼び出しをやめ、次の局へ移れるようにします。上限は 設定 → 無応答 で設定します。',

  op_freetext_title: 'フリーテキストモード',
  op_freetext_text:  '呼び出しタブのフリーテキストアイコンをタップすると、最大 13 文字の自由な電文を入力できます。フリーテキストは標準の FT8 シーケンスを飛ばすため、記念局の案内などに使います。通常の交信に戻るには標準電文モードに切り替えてください。',

  op_ft2_title: 'FT2（実験的）',
  op_ft2_text:  'FT8TW は FT4 から派生したより高速なモード FT2 に暫定対応しています。FT2 は第二の局との実機相互試験がまだ済んでいないため実験的機能とお考えください。問題があればご報告ください。',
},

'ru': {
  op_title: 'Работа в FT8 / FT4',

  op_rx_title:      'Приём',
  op_rx_text:       'Нажмите <strong>Начать декодирование</strong> на вкладке содержимого или декодера. Приложение записывает звук и декодирует сообщения FT8/FT4 в начале каждого интервала 15 с (FT8) или 7,5 с (FT4). Декодированные станции появляются в списке.',
  op_rx_tips_label: 'Советы для уверенного приёма:',
  op_rx_tips: `
    <ul>
      <li>Установите на трансивере режим <strong>USB</strong> (верхняя боковая). Для FT8 не используйте LSB, AM или FM.</li>
      <li>Лучший результат — когда полоса звука отцентрована около <strong>1500 Гц</strong>. Рабочий диапазон звука 200–2700 Гц.</li>
      <li>Отрегулируйте усиление НЧ так, чтобы сигнал был громким, но без ограничения. Ограничение срывает декодирование.</li>
      <li>В условиях слабых сигналов DX используйте режим декодирования <strong>Deep</strong>.</li>
      <li>Включите <strong>шумоподавление (DeNoise)</strong> на экране спектра, чтобы убрать широкополосный шум.</li>
    </ul>`,

  op_tx_title: 'Проведение связи',
  op_tx_text:  'После выбора корреспондента типовое QSO в FT8 проходит полностью автоматически:',
  op_tx_seq: `
    <ol>
      <li>На вкладке <strong>Содержимое</strong> нажмите на станцию, дающую CQ, чтобы выбрать её.</li>
      <li>Перейдите на вкладку <strong>Вызов</strong> и нажмите <strong>Передача</strong>.</li>
      <li>Приложение само проходит обмен FT8:<br>
        <code>ответ на CQ → рапорт → RRR → 73</code></li>
      <li>По завершении связь автоматически заносится в журнал.</li>
    </ol>`,

  op_autocq_title: 'Автоответ на CQ',
  op_autocq_text:  'Включите <strong>Автоответ на CQ</strong> на вкладке вызова, чтобы отвечать на CQ без вашего участия. Правило приоритета выбирается в Настройки → Способ ответа на CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Сильные и близкие</strong> — приоритет станциям с сильным сигналом и небольшим расстоянием</li>
      <li><strong>Дальние по локатору</strong> — предпочтение дальним станциям (удобно для дистанционных дипломов)</li>
      <li><strong>Ближние по локатору</strong> — предпочтение ближним станциям</li>
      <li><strong>Наибольшая зона (ITU/CQ/DX)</strong> — предпочтение зонам, откуда зовёт больше всего станций</li>
      <li><strong>Приоритет зон ITU / CQ / DX</strong> — предпочтение определённым типам зон для охоты за дипломами</li>
    </ul>`,
  op_autocq_filter: 'Параметр <strong>Исключать проведённые</strong> в настройках позволяет автоматически пропускать станции, с которыми связь уже была в выбранном интервале (1 час, 4 часа, сегодня, 30 дней или 365 дней).',

  op_watchdog_title: 'Сторожевой таймер передачи',
  op_watchdog_text:  'Сторожевой таймер автоматически прекращает передачу по истечении заданного времени (в минутах), чтобы исключить случайно затянувшуюся передачу. Предел задаётся в Настройки → Сторожевой таймер. Значение 0 отключает его.',

  op_noresponse_title: 'Предел без ответа',
  op_noresponse_text:  'Если вызываемая станция не отвечает в течение заданного числа циклов передачи, приложение само прекращает вызов и освобождает время для следующей станции. Предел задаётся в Настройки → Без ответа.',

  op_freetext_title: 'Режим свободного текста',
  op_freetext_text:  'Нажмите значок свободного текста на вкладке вызова, чтобы ввести собственное сообщение длиной до 13 символов. Свободный текст обходит стандартную последовательность QSO — используйте его для объявлений и специальных мероприятий. Чтобы вернуться к обычным связям, переключитесь в режим стандартных сообщений.',

  op_ft2_title: 'FT2 (экспериментально)',
  op_ft2_text:  'В FT8TW есть предварительная поддержка FT2 — более быстрого режима, производного от FT4. FT2 ещё не проверялся в эфире со второй станцией и считается экспериментальным; сообщайте о любых замеченных проблемах.',
},

'pl': {
  op_title: 'Praca w FT8 / FT4',

  op_rx_title:      'Odbiór',
  op_rx_text:       'Dotknij <strong>Rozpocznij dekodowanie</strong> w zakładce treści lub dekodowania. Aplikacja nagrywa dźwięk i dekoduje wiadomości FT8/FT4 na początku każdego okna 15-sekundowego (FT8) lub 7,5-sekundowego (FT4). Zdekodowane stacje pojawiają się na liście.',
  op_rx_tips_label: 'Wskazówki dla dobrego odbioru:',
  op_rx_tips: `
    <ul>
      <li>Ustaw radio w tryb <strong>USB</strong> (wstęga górna). Do FT8 nie używaj LSB, AM ani FM.</li>
      <li>Najlepsze wyniki daje pasmo akustyczne wyśrodkowane około <strong>1500 Hz</strong>. Dopuszczalny zakres to 200–2700 Hz.</li>
      <li>Ustaw wzmocnienie m.cz. tak, aby sygnał był mocny, ale bez przesterowania. Przesterowanie uniemożliwia dekodowanie.</li>
      <li>Przy słabych sygnałach DX używaj trybu dekodowania <strong>Deep</strong>.</li>
      <li>Włącz <strong>redukcję szumów (DeNoise)</strong> na ekranie widma, aby stłumić szum szerokopasmowy.</li>
    </ul>`,

  op_tx_title: 'Przeprowadzenie łączności',
  op_tx_text:  'Po wybraniu stacji docelowej typowa łączność FT8 przebiega w pełni automatycznie:',
  op_tx_seq: `
    <ol>
      <li>W zakładce <strong>Treść</strong> dotknij stacji wywołującej CQ, aby ją wybrać.</li>
      <li>Przejdź do zakładki <strong>Wywołanie</strong> i dotknij <strong>Nadawanie</strong>.</li>
      <li>Aplikacja sama przechodzi przez wymianę FT8:<br>
        <code>odpowiedź na CQ → raport → RRR → 73</code></li>
      <li>Po zakończeniu łączność jest automatycznie zapisywana w dzienniku.</li>
    </ol>`,

  op_autocq_title: 'Automatyczna odpowiedź na CQ',
  op_autocq_text:  'Włącz <strong>Automatyczną odpowiedź na CQ</strong> w zakładce wywołania, aby odpowiadać na wywołania bez ręcznej obsługi. Zasadę priorytetu wybierz w Ustawienia → Sposób odpowiedzi na CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Silne i bliskie</strong> — priorytet dla stacji o mocnym sygnale i małej odległości</li>
      <li><strong>Odległe wg lokatora</strong> — preferuje stacje dalekie (przydatne przy dyplomach za odległość)</li>
      <li><strong>Bliskie wg lokatora</strong> — preferuje stacje bliskie</li>
      <li><strong>Najliczniejsza strefa (ITU/CQ/DX)</strong> — preferuje strefy, z których woła najwięcej stacji</li>
      <li><strong>Priorytet stref ITU / CQ / DX</strong> — preferuje wybrane rodzaje stref przy polowaniu na dyplomy</li>
    </ul>`,
  op_autocq_filter: 'Opcja <strong>Pomijaj przepracowane</strong> w ustawieniach automatycznie pomija stacje, z którymi łączność odbyła się w wybranym okresie (1 godzina, 4 godziny, dziś, 30 dni lub 365 dni).',

  op_watchdog_title: 'Nadzorca nadawania',
  op_watchdog_text:  'Nadzorca nadawania automatycznie przerywa nadawanie po ustawionym czasie (w minutach), aby zapobiec przypadkowemu przedłużonemu nadawaniu. Limit ustawisz w Ustawienia → Nadzorca nadawania. Wartość 0 wyłącza tę funkcję.',

  op_noresponse_title: 'Limit braku odpowiedzi',
  op_noresponse_text:  'Jeśli wywoływana stacja nie odpowie w zadanej liczbie cykli nadawania, aplikacja sama przerywa wywoływanie i zwalnia czas dla kolejnej stacji. Limit ustawisz w Ustawienia → Brak odpowiedzi.',

  op_freetext_title: 'Tryb dowolnego tekstu',
  op_freetext_text:  'Dotknij ikony dowolnego tekstu w zakładce wywołania, aby wpisać własną wiadomość o długości do 13 znaków. Dowolny tekst pomija standardową sekwencję łączności FT8 — używaj go do ogłoszeń i imprez okolicznościowych. Aby wrócić do zwykłych łączności, przełącz się na tryb wiadomości standardowych.',

  op_ft2_title: 'FT2 (eksperymentalny)',
  op_ft2_text:  'FT8TW ma wstępną obsługę FT2 — szybszego trybu wywodzącego się z FT4. FT2 nie został jeszcze sprawdzony w łączności z drugą stacją i należy traktować go jako eksperymentalny; prosimy o zgłaszanie napotkanych problemów.',
},

'es': {
  op_title: 'Operar en FT8 / FT4',

  op_rx_title:      'Recepción',
  op_rx_text:       'Pulsa <strong>Iniciar decodificación</strong> en la pestaña de contenido o de decodificación. La aplicación graba audio y decodifica los mensajes FT8/FT4 al comienzo de cada intervalo de 15 segundos (FT8) o 7,5 segundos (FT4). Las estaciones decodificadas aparecen en la lista de contenido.',
  op_rx_tips_label: 'Consejos para una buena recepción:',
  op_rx_tips: `
    <ul>
      <li>Pon el equipo en <strong>modo USB</strong> (banda lateral superior). No uses LSB, AM ni FM para FT8.</li>
      <li>Centra el paso de banda de audio en torno a <strong>1500 Hz</strong> para obtener el mejor resultado. El rango de audio válido es de 200 a 2700 Hz.</li>
      <li>Ajusta la ganancia de AF del equipo para que el audio sea fuerte pero sin recorte. El recorte impide decodificar.</li>
      <li>Usa el modo de decodificación <strong>Deep</strong> en condiciones de DX con señales débiles.</li>
      <li>Activa <strong>DeNoise</strong> en la pantalla de espectro para reducir el ruido de banda ancha.</li>
    </ul>`,

  op_tx_title: 'Realizar un contacto',
  op_tx_text:  'Una vez seleccionada la estación, un QSO típico de FT8 se desarrolla de forma totalmente automática:',
  op_tx_seq: `
    <ol>
      <li>En la pestaña <strong>Contenido</strong>, pulsa una estación que esté llamando CQ para seleccionarla.</li>
      <li>Cambia a la pestaña <strong>Llamada</strong> y pulsa <strong>TX</strong> para empezar a transmitir.</li>
      <li>La aplicación recorre automáticamente el intercambio FT8:<br>
        <code>respuesta al CQ → informe de señal → RRR → 73</code></li>
      <li>Al completarse, el QSO se registra automáticamente.</li>
    </ol>`,

  op_autocq_title: 'Respuesta automática a CQ',
  op_autocq_text:  'Activa <strong>Respuesta automática a CQ</strong> en la pestaña de llamada para contestar las llamadas sin intervenir. Elige la estrategia de prioridad en Ajustes → Método de CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Fuertes y cercanas</strong> — da prioridad a las estaciones con señal fuerte y poca distancia</li>
      <li><strong>Localizador: lejanas</strong> — prefiere estaciones lejanas (útil para diplomas por distancia)</li>
      <li><strong>Localizador: cercanas</strong> — prefiere estaciones cercanas</li>
      <li><strong>Zona más numerosa (ITU/CQ/DX)</strong> — prefiere las zonas desde las que llaman más estaciones</li>
      <li><strong>Prioridad de zona ITU / CQ / DX</strong> — prefiere ciertos tipos de zona para la caza de diplomas</li>
    </ul>`,
  op_autocq_filter: 'Usa <strong>Excluir QSO ya hechos</strong> en Ajustes para saltar automáticamente las estaciones ya trabajadas dentro del periodo elegido (1 hora, 4 horas, hoy, 30 días o 365 días).',

  op_watchdog_title: 'Vigilante de transmisión',
  op_watchdog_text:  'El vigilante de transmisión detiene automáticamente la emisión tras un límite de tiempo configurable (en minutos) para evitar transmisiones prolongadas por descuido. Fija el límite en Ajustes → Vigilante de TX. Ponlo a 0 para desactivarlo.',

  op_noresponse_title: 'Límite de intentos sin respuesta',
  op_noresponse_text:  'Si la estación llamada no responde tras un número determinado de ciclos de transmisión, la aplicación deja de llamar automáticamente y libera el sistema para la siguiente estación. Configura el límite en Ajustes → Sin respuesta.',

  op_freetext_title: 'Modo de texto libre',
  op_freetext_text:  'Pulsa el icono de texto libre en la pestaña de llamada para escribir un mensaje propio de hasta 13 caracteres. El texto libre omite la secuencia estándar de QSO de FT8: úsalo para anuncios o eventos especiales. Vuelve al modo de mensaje estándar para retomar los QSO normales.',

  op_ft2_title: 'FT2 (experimental)',
  op_ft2_text:  'FT8TW incluye compatibilidad preliminar con FT2, un modo más rápido derivado de FT4. FT2 aún no se ha verificado en aire con una segunda estación y debe considerarse experimental: informa de cualquier problema que encuentres.',
},

'el': {
  op_title: 'Λειτουργία FT8 / FT4',

  op_rx_title:      'Λήψη',
  op_rx_text:       'Πατήστε <strong>Έναρξη αποκωδικοποίησης</strong> στην καρτέλα περιεχομένου ή αποκωδικοποίησης. Η εφαρμογή καταγράφει ήχο και αποκωδικοποιεί μηνύματα FT8/FT4 στην αρχή κάθε χρονοθυρίδας 15 δευτερολέπτων (FT8) ή 7,5 δευτερολέπτων (FT4). Οι σταθμοί που αποκωδικοποιούνται εμφανίζονται στη λίστα περιεχομένου.',
  op_rx_tips_label: 'Συμβουλές για καλή λήψη:',
  op_rx_tips: `
    <ul>
      <li>Ρυθμίστε τον πομποδέκτη σε <strong>USB</strong> (άνω πλευρική ζώνη). Για FT8 μην χρησιμοποιείτε LSB, AM ή FM.</li>
      <li>Το καλύτερο αποτέλεσμα δίνει ζώνη ήχου κεντραρισμένη γύρω στα <strong>1500 Hz</strong>. Το έγκυρο εύρος ήχου είναι 200–2700 Hz.</li>
      <li>Ρυθμίστε την ενίσχυση AF ώστε ο ήχος να είναι δυνατός αλλά χωρίς ψαλίδισμα. Το ψαλίδισμα χαλάει την αποκωδικοποίηση.</li>
      <li>Σε συνθήκες DX με ασθενή σήματα χρησιμοποιήστε τη λειτουργία αποκωδικοποίησης <strong>Deep</strong>.</li>
      <li>Ενεργοποιήστε το <strong>DeNoise</strong> στην οθόνη φάσματος για να μειώσετε τον ευρυζωνικό θόρυβο.</li>
    </ul>`,

  op_tx_title: 'Πραγματοποίηση επαφής',
  op_tx_text:  'Μόλις επιλέξετε σταθμό, μια τυπική επαφή FT8 εξελίσσεται εντελώς αυτόματα:',
  op_tx_seq: `
    <ol>
      <li>Στην καρτέλα <strong>Περιεχόμενο</strong> πατήστε έναν σταθμό που καλεί CQ για να τον επιλέξετε.</li>
      <li>Μεταβείτε στην καρτέλα <strong>Κλήση</strong> και πατήστε <strong>Εκπομπή</strong>.</li>
      <li>Η εφαρμογή εκτελεί αυτόματα την ακολουθία FT8:<br>
        <code>απάντηση σε CQ → αναφορά σήματος → RRR → 73</code></li>
      <li>Με την ολοκλήρωση, η επαφή καταχωρείται αυτόματα στο ημερολόγιο.</li>
    </ol>`,

  op_autocq_title: 'Αυτόματη απάντηση σε CQ',
  op_autocq_text:  'Ενεργοποιήστε την <strong>Αυτόματη απάντηση σε CQ</strong> στην καρτέλα κλήσης για να απαντάτε χωρίς χειροκίνητη παρέμβαση. Επιλέξτε στρατηγική προτεραιότητας στις Ρυθμίσεις → Μέθοδος CQ:',
  op_autocq_opts: `
    <ul>
      <li><strong>Ισχυροί και κοντινοί</strong> — προτεραιότητα σε σταθμούς με ισχυρό σήμα και μικρή απόσταση</li>
      <li><strong>Μακρινοί κατά τετράγωνο</strong> — προτιμά μακρινούς σταθμούς (χρήσιμο για διπλώματα απόστασης)</li>
      <li><strong>Κοντινοί κατά τετράγωνο</strong> — προτιμά κοντινούς σταθμούς</li>
      <li><strong>Περισσότεροι ανά ζώνη (ITU/CQ/DX)</strong> — προτιμά τις ζώνες από τις οποίες καλούν οι περισσότεροι σταθμοί</li>
      <li><strong>Προτεραιότητα ζώνης ITU / CQ / DX</strong> — προτιμά συγκεκριμένους τύπους ζώνης για κυνήγι διπλωμάτων</li>
    </ul>`,
  op_autocq_filter: 'Με την επιλογή <strong>Εξαίρεση ολοκληρωμένων επαφών</strong> στις Ρυθμίσεις παραλείπονται αυτόματα σταθμοί με τους οποίους έχει ήδη γίνει επαφή μέσα στο επιλεγμένο διάστημα (1 ώρα, 4 ώρες, σήμερα, 30 ημέρες ή 365 ημέρες).',

  op_watchdog_title: 'Επιτηρητής εκπομπής',
  op_watchdog_text:  'Ο επιτηρητής εκπομπής σταματά αυτόματα την εκπομπή μετά από ρυθμιζόμενο χρονικό όριο (σε λεπτά), ώστε να αποφεύγεται η κατά λάθος παρατεταμένη εκπομπή. Ορίστε το όριο στις Ρυθμίσεις → Επιτηρητής εκπομπής. Η τιμή 0 το απενεργοποιεί.',

  op_noresponse_title: 'Όριο χωρίς απάντηση',
  op_noresponse_text:  'Αν ο σταθμός που καλείτε δεν απαντήσει μέσα σε καθορισμένο αριθμό κύκλων εκπομπής, η εφαρμογή σταματά αυτόματα την κλήση και ελευθερώνει τον χρόνο για τον επόμενο σταθμό. Ορίστε το όριο στις Ρυθμίσεις → Χωρίς απάντηση.',

  op_freetext_title: 'Λειτουργία ελεύθερου κειμένου',
  op_freetext_text:  'Πατήστε το εικονίδιο ελεύθερου κειμένου στην καρτέλα κλήσης για να γράψετε δικό σας μήνυμα έως 13 χαρακτήρες. Το ελεύθερο κείμενο παρακάμπτει την τυπική ακολουθία επαφής FT8 — χρησιμοποιήστε το για ανακοινώσεις ή ειδικές εκδηλώσεις. Επιστρέψτε στη λειτουργία τυπικών μηνυμάτων για κανονικές επαφές.',

  op_ft2_title: 'FT2 (πειραματικό)',
  op_ft2_text:  'Το FT8TW περιλαμβάνει πρώιμη υποστήριξη για το FT2, μια ταχύτερη λειτουργία που προέρχεται από το FT4. Το FT2 δεν έχει ακόμη επαληθευτεί στον αέρα με δεύτερο σταθμό και θεωρείται πειραματικό — παρακαλούμε αναφέρετε τυχόν προβλήματα.',
},

}; /* end PAGE_T */
