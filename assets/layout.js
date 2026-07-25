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

/* Merge shared + page-specific dictionaries */
const T = { en: {}, 'zh-TW': {} };
for (const lang of Object.keys(T)) {
  Object.assign(T[lang], (typeof COMMON_T !== 'undefined' && COMMON_T[lang]) || {});
  Object.assign(T[lang], (typeof PAGE_T !== 'undefined' && PAGE_T[lang]) || {});
}

const currentPage = document.body.dataset.page || 'intro';

/* ── Build header ──────────────────────────────────────────────── */
const header = document.createElement('header');
header.innerHTML = `
  <div class="header-inner">
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">&#9776;</button>
    <a class="brand" href="index.html" style="text-decoration:none; color:#fff;">
      <span class="brand-icon">&#128251;</span>
      <span class="brand-name">FT8TW</span>
      <span class="brand-sep">|</span>
      <span class="brand-sub" data-i18n="brand_sub"></span>
      <img id="view-badge" src="" alt="views" class="view-badge">
    </a>
    <div class="lang-switch">
      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="zh-TW">繁中</button>
    </div>
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

  const navTitle = dict[NAV_ITEMS.find(n => n.id === currentPage)?.key];
  document.title = currentPage === 'intro' || !navTitle
    ? (dict.page_title || document.title)
    : `${dict.page_title} – ${navTitle}`;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-lang-img]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang-img') === lang) ? '' : 'none';
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const badge = document.getElementById('view-badge');
  if (badge) {
    const pageIds = { 'en': 'danleetw.FT8TW.en', 'zh-TW': 'danleetw.FT8TW.zhtw' };
    const titles  = { 'en': 'EN+Visitors', 'zh-TW': 'ZH+Visitors' };
    const pageId  = pageIds[lang] || 'danleetw.FT8TW';
    const title   = titles[lang]  || 'Visitors';
    const newSrc  = `https://visitor-badge.laobi.icu/badge?page_id=${pageId}&title=${title}&color=blue&style=flat-square`;

    if (badge.getAttribute('data-src') !== newSrc) {
      badge.style.display = 'none';
      badge.onload  = () => { badge.style.display = 'inline'; };
      badge.onerror = () => { badge.style.display = 'none'; };
      badge.setAttribute('data-src', newSrc);
      badge.src = newSrc;
    }
  }

  try { localStorage.setItem('ft8tw-lang', lang); } catch (e) {}
}

function setLang(lang) { applyLang(lang); }

/* 依瀏覽器語系猜預設語言：中文語系(zh*)→繁中，其餘一律英文。
   只在使用者從未手動選過語言時作為預設值使用。 */
function detectBrowserLang() {
  let list = [];
  try {
    list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];
  } catch (e) { list = ['']; }
  for (const l of list) {
    if (l && l.toLowerCase().indexOf('zh') === 0) return 'zh-TW';
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

  const toggle = document.getElementById('menuToggle');

  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  if (toggle)  toggle.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSidebar));
})();
