/* ── FT8TW User Manual – i18n: SSB Voice ─────────────────────────── */

const PAGE_T = {

en: {
  ssb_title: 'SSB Voice',
  ssb_intro: 'Beyond digital modes, FT8TW can also operate as a simple push-to-talk voice interface, using the same radio connection already configured for FT8/FT4.',

  ssb_use_title: 'Push-to-Talk Operation',
  ssb_use_text:  'Open the SSB tab and press and hold the talk button to transmit:',
  ssb_use_list: `
    <ul>
      <li>Holding the button captures audio from the phone's microphone, asserts PTT via CAT command, and routes audio out through the connected USB sound card or Bluetooth SCO audio.</li>
      <li>Releasing the button (or if the touch is interrupted) immediately stops transmission and releases PTT.</li>
      <li>USB audio PTT is field-verified. Bluetooth SCO audio PTT is functional but has seen less field testing — please report any issues.</li>
    </ul>`,

  ssb_safety_title: 'PTT-Stuck Protection',
  ssb_safety_text:  'The talk button uses a triple safety mechanism — release, touch-cancel, and a backstop timeout — so that a stuck or interrupted touch event cannot leave the radio transmitting indefinitely.',
},

'zh-TW': {
  ssb_title: 'SSB 語音',
  ssb_intro: '除了數位模式之外，FT8TW 也能作為簡易的按住通話（PTT）語音介面，沿用與 FT8/FT4 相同的電台連線設定。',

  ssb_use_title: '按住通話操作',
  ssb_use_text:  '開啟 SSB 分頁，按住通話按鈕即可發射：',
  ssb_use_list: `
    <ul>
      <li>按住按鈕時，程式會擷取手機麥克風音訊、透過 CAT 指令觸發 PTT，並將音訊輸出至已連接的 USB 音效卡或藍牙 SCO 音訊。</li>
      <li>放開按鈕（或觸控被中斷）會立即停止發射並釋放 PTT。</li>
      <li>USB 音訊 PTT 已完成實機驗證；藍牙 SCO 音訊 PTT 功能可運作，但實機測試較少，若遇到問題還請回報。</li>
    </ul>`,

  ssb_safety_title: 'PTT 卡住防護',
  ssb_safety_text:  '通話按鈕採用三重安全機制——放開、觸控取消、以及保底逾時——確保觸控事件卡住或被中斷時，電台不會無限期持續發射。',
},

}; /* end PAGE_T */
