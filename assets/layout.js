/* ── FT8TW User Manual – shared layout engine ─────────────────────
   Injects header + sidebar + overlay into every page, merges
   COMMON_T (assets/i18n/common.js) with the page's own PAGE_T
   (assets/i18n/<page>.js), and drives language switching.
   Both scripts above this one must be loaded first. ────────────── */

const NAV_ITEMS = [
  { id: 'intro',        file: 'index.html',        key: 'nav_intro'        },
  { id: 'requirements', file: 'requirements.html', key: 'nav_requirements' },
  { id: 'install',      file: 'install.html',      key: 'nav_install'      },
  { id: 'first-setup',  file: 'first-setup.html',  key: 'nav_first_setup'  },
  { id: 'screens',      file: 'screens.html',      key: 'nav_screens'      },
  { id: 'connection',   file: 'connection.html',   key: 'nav_connection'   },
  { id: 'radios',       file: 'radios.html',       key: 'nav_radios'       },
  { id: 'operating',    file: 'operating.html',    key: 'nav_operating'    },
  { id: 'js8',          file: 'js8.html',          key: 'nav_js8'          },
  { id: 'wspr',         file: 'wspr.html',         key: 'nav_wspr'         },
  { id: 'ssb',          file: 'ssb.html',          key: 'nav_ssb'          },
  { id: 'gridtracker',  file: 'gridtracker.html',  key: 'nav_gridtracker'  },
  { id: 'logging',      file: 'logging.html',      key: 'nav_logging'      },
  { id: 'third-party',  file: 'third-party.html',  key: 'nav_third_party'  },
  { id: 'settings',     file: 'settings.html',     key: 'nav_settings'     },
  { id: 'troubleshoot', file: 'troubleshoot.html', key: 'nav_troubleshoot' },
];

/* Merge shared + page-specific dictionaries.
   語系清單不寫死，直接看 COMMON_T 有哪些語言，
   日後 i18n 檔多一個語系區塊就自動多一種語言，這裡不用再改。 */
const LANGS = Object.keys((typeof COMMON_T !== 'undefined' && COMMON_T) || { en: {} });
const T = {};
for (const lang of LANGS) {
  T[lang] = {};
  Object.assign(T[lang], (typeof COMMON_T !== 'undefined' && COMMON_T[lang]) || {});
  Object.assign(T[lang], (typeof PAGE_T !== 'undefined' && PAGE_T[lang]) || {});
}

/* 語言選單的顯示名稱；未列出者退回代碼本身，漏補這張表不會壞 */
const LANG_LABELS = {
  'en': 'EN', 'zh-TW': '繁中', 'zh-CN': '简中', 'ja': '日本語',
  'ru': 'Русский', 'pl': 'Polski', 'es': 'Español', 'el': 'Ελληνικά',
};
const langLabel = l => LANG_LABELS[l] || l;

/* 取字串：目標語系缺字時退回英文。
   某語系只翻了一部分時，未翻的地方顯示英文而不是留下空白。 */
function pickT(lang, key) {
  const d = T[lang];
  if (d && d[key] !== undefined) return d[key];
  const en = T['en'];
  if (en && en[key] !== undefined) return en[key];
  return undefined;
}

const currentPage = document.body.dataset.page || 'intro';

/* 少數語系用並排按鈕，多了就改下拉，否則手機 header 會被擠爆。
   下拉收合時只看得到目前的語言，很容易被當成純文字標籤，
   所以前面固定放一個地球圖示，讓它一眼就是語言選擇器。 */
function buildLangSwitch() {
  if (LANGS.length <= 3) {
    return LANGS.map(l =>
      `<button class="lang-btn" data-lang="${l}">${langLabel(l)}</button>`).join('');
  }
  return `<span class="lang-icon" aria-hidden="true">&#127760;</span>` +
    `<select class="lang-select" id="langSelect" aria-label="Language">${
      LANGS.map(l => `<option value="${l}">${langLabel(l)}</option>`).join('')
    }</select>`;
}

/* ── Build header ──────────────────────────────────────────────── */
const header = document.createElement('header');
header.innerHTML = `
  <div class="header-inner">
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">&#9776;</button>
    <a class="brand" href="index.html" style="text-decoration:none; color:#fff;">
      <img class="brand-icon" src="assets/ft8tw-icon.png" alt="FT8TW">
      <span class="brand-name">FT8TW</span>
      <span class="brand-sep">|</span>
      <span class="brand-sub" data-i18n="brand_sub"></span>
      <span class="last-updated" id="lastUpdated"></span>
      <img id="view-badge" src="" alt="views" class="view-badge">
    </a>
    <div class="lang-switch">${buildLangSwitch()}</div>
  </div>`;
document.body.insertBefore(header, document.body.firstChild);

/* ── Build sidebar ─────────────────────────────────────────────── */
const sidebar = document.createElement('nav');
sidebar.className = 'sidebar';
sidebar.id = 'sidebar';
const ul = document.createElement('ul');
NAV_ITEMS.forEach(item => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = item.file;
  a.setAttribute('data-i18n', item.key);
  if (item.id === currentPage) a.classList.add('active');
  li.appendChild(a);
  ul.appendChild(li);
});

/* 整本手冊的 PDF 入口。刻意排在章節清單之外，
   這樣它不會被算成一章，也不會出現在 PDF 自己的目錄裡。 */
const pdfLi = document.createElement('li');
pdfLi.className = 'nav-pdf';
const pdfLink = document.createElement('a');
pdfLink.id = 'navPdfLink';
pdfLink.href = 'print.html';
pdfLink.innerHTML = '&#11015; <span data-i18n="nav_pdf"></span>';
pdfLi.appendChild(pdfLink);
ul.appendChild(pdfLi);

sidebar.appendChild(ul);
const layoutDiv = document.querySelector('.layout');
layoutDiv.insertBefore(sidebar, layoutDiv.firstChild);

/* ── Build mobile overlay ──────────────────────────────────────── */
const overlay = document.createElement('div');
overlay.className = 'overlay';
overlay.id = 'overlay';
document.body.appendChild(overlay);

/* ── i18n engine ───────────────────────────────────────────────── */
let currentLang = 'en';

function applyLang(lang) {
  const dict = T[lang];
  if (!dict) return;
  currentLang = lang;

  const navTitle = pickT(lang, NAV_ITEMS.find(n => n.id === currentPage)?.key);
  const pageTitle = pickT(lang, 'page_title');
  document.title = currentPage === 'intro' || !navTitle
    ? (pageTitle || document.title)
    : `${pageTitle} – ${navTitle}`;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = pickT(lang, el.getAttribute('data-i18n'));
    if (v !== undefined) el.innerHTML = v;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = pickT(lang, el.getAttribute('data-i18n-html'));
    if (v !== undefined) el.innerHTML = v;
  });

  /* 截圖的 fallback 順序：該語系 → 同語言的其他變體(简中→繁中) → 英文 → 第一張。
     少了這段，新增語系時所有截圖會因為沒有對應的 data-lang-img 而整批消失。 */
  const base = lang.split('-')[0];
  document.querySelectorAll('.screenshot-wrap').forEach(wrap => {
    const group = [...wrap.querySelectorAll('[data-lang-img]')];
    if (!group.length) return;
    const tagOf = el => el.getAttribute('data-lang-img');
    const target =
      group.find(el => tagOf(el) === lang) ||
      group.find(el => tagOf(el).split('-')[0] === base) ||
      group.find(el => tagOf(el) === 'en') ||
      group[0];
    group.forEach(el => { el.style.display = (el === target) ? '' : 'none'; });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = lang;

  /* PDF 頁沿用同一個語系，順手帶在網址上讓連結可分享 */
  const pdfA = document.getElementById('navPdfLink');
  if (pdfA) pdfA.href = `print.html?lang=${encodeURIComponent(lang)}`;

  /* 日期是非同步取回的，切語言時用已取到的值重畫標籤即可 */
  renderLastUpdated();

  const badge = document.getElementById('view-badge');
  if (badge) {
    /* 每個語系分開計數，用來判斷哪些語言版本值得繼續維護。
       page_id 由語系代碼直接推導（zh-TW → zhtw），所以日後新增語系
       不必再改這裡。en 與 zh-TW 推導出來的 ID 與先前寫死的相同，
       之前累積的數字因此不會歸零；其餘語系從零開始各自計數。 */
    const pageId = 'danleetw.FT8TW.' + lang.toLowerCase().replace(/-/g, '');
    const title  = lang.toUpperCase() + '+Visitors';
    const newSrc  = `https://visitor-badge.laobi.icu/badge?page_id=${pageId}&title=${title}&color=blue&style=flat-square`;

    /* 顯示與否交給 class，不要寫 inline style：inline style 的優先序高過
       CSS，會蓋掉手機版隱藏徽章的 media query，徽章就會把語言選擇器
       擠出畫面外。 */
    if (badge.getAttribute('data-src') !== newSrc) {
      badge.classList.remove('loaded');
      badge.onload  = () => { badge.classList.add('loaded'); };
      badge.onerror = () => { badge.classList.remove('loaded'); };
      badge.setAttribute('data-src', newSrc);
      badge.src = newSrc;
    }
  }

  try { localStorage.setItem('ft8tw-lang', lang); } catch (e) {}
}

function setLang(lang) { applyLang(lang); }

/* 手冊最後更新日期。取不到就整個不顯示（見 common.js 的說明）。 */
let manualUpdated = null;
function renderLastUpdated() {
  const el = document.getElementById('lastUpdated');
  if (!el) return;
  if (!manualUpdated) { el.innerHTML = ''; return; }
  /* 標籤與日期分開包，手機上只留日期——有些語系的標籤很長
     （例如 Ostatnia aktualizacja），整串塞進頁首會被截成半個詞。 */
  const label = document.createElement('span');
  label.className = 'lu-label';
  label.textContent = pickT(currentLang, 'last_updated') || '';
  const date = document.createElement('span');
  date.className = 'lu-date';
  date.textContent = manualUpdated;
  el.innerHTML = '';
  el.appendChild(label);
  el.appendChild(document.createTextNode(' '));
  el.appendChild(date);
}

/* 依瀏覽器語系猜預設語言，猜不到才用英文。
   只在使用者從未手動選過語言時作為預設值使用。 */
function detectBrowserLang() {
  let list = [];
  try {
    list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];
  } catch (e) { list = ['']; }

  for (const raw of list) {
    const l = (raw || '').trim();
    if (!l) continue;
    if (LANGS.includes(l)) return l;

    const lower = l.toLowerCase();
    /* 中文要分繁簡：Hant / TW / HK / MO 算繁體，其餘 zh 算簡體；
       手冊還沒有的那一邊就退到另一邊。 */
    if (lower.indexOf('zh') === 0) {
      const trad = /hant|tw|hk|mo/.test(lower);
      const order = trad ? ['zh-TW', 'zh-CN'] : ['zh-CN', 'zh-TW'];
      const zhHit = order.find(x => LANGS.includes(x));
      if (zhHit) return zhHit;
    }

    const base = lower.split('-')[0];
    const hit = LANGS.find(x => x.toLowerCase().split('-')[0] === base);
    if (hit) return hit;
  }
  return 'en';
}

/* ── Init ──────────────────────────────────────────────────────── */
(function init() {
  /* 優先序：網址 ?lang=（分享連結）> 使用者記住的選擇 > 瀏覽器語系 > 英文 */
  let stored = null;
  try { stored = localStorage.getItem('ft8tw-lang'); } catch (e) {}
  let lang = stored || detectBrowserLang();
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && T[urlLang]) lang = urlLang;
  if (!T[lang]) lang = 'en';

  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.addEventListener('change', () => setLang(langSelect.value));

  const toggle = document.getElementById('menuToggle');

  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  if (toggle)  toggle.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSidebar));

  fetchManualUpdated().then(d => { manualUpdated = d; renderLastUpdated(); });
})();
