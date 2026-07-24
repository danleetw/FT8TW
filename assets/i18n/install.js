/* ── FT8TW User Manual – i18n: Installation ──────────────────────── */

const PAGE_T = {

en: {
  install_title:       'Installation',
  install_p1:          'FT8TW is available on the Google Play Store and can also be downloaded directly as an APK from GitHub Releases.',
  install_steps_title: 'Installation Methods',
  install_steps: `
    <h4>Method 1 – Google Play Store (Recommended)</h4>
    <ol>
      <li>Open the <strong>Google Play Store</strong> on your Android device.</li>
      <li>Search for <strong>FT8TW</strong> or use the direct link:<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>Tap <strong>Install</strong> and grant the required permissions when prompted.</li>
    </ol>
    <h4>Method 2 – GitHub APK (Latest / Beta)</h4>
    <ol>
      <li><strong>Download</strong> the latest <code>.apk</code> file from the <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> page.</li>
      <li><strong>Allow unknown sources:</strong> Go to <em>Android Settings → Security → Install unknown apps</em> and grant permission to your browser or file manager.</li>
      <li><strong>Open</strong> the downloaded APK and tap <em>Install</em>.</li>
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
},

'zh-TW': {
  install_title:       '安裝',
  install_p1:          'FT8TW 已上架 Google Play 商店，也可直接從 GitHub Releases 下載 APK 安裝。',
  install_steps_title: '安裝方式',
  install_steps: `
    <h4>方式一 — Google Play 商店（建議）</h4>
    <ol>
      <li>在 Android 裝置上開啟 <strong>Google Play 商店</strong>。</li>
      <li>搜尋 <strong>FT8TW</strong>，或直接前往：<br>
        <a href="https://play.google.com/store/apps/details?id=com.bv6lc.ft8tw&hl=zh_TW" target="_blank">play.google.com/store/apps/details?id=com.bv6lc.ft8tw</a></li>
      <li>點選<strong>安裝</strong>，依提示授予所需權限。</li>
    </ol>
    <h4>方式二 — GitHub APK（最新版 / 測試版）</h4>
    <ol>
      <li>前往 <a href="https://github.com/danleetw/FT8TW/releases" target="_blank">GitHub Releases</a> 頁面，下載最新的 <code>.apk</code> 檔案。</li>
      <li><strong>開啟未知來源安裝：</strong>進入<em>設定 → 安全性 → 安裝未知應用程式</em>，對瀏覽器或檔案管理員授予安裝權限。</li>
      <li>開啟下載的 APK 檔案，點選<em>安裝</em>。</li>
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
},

}; /* end PAGE_T */
