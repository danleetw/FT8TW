/* ── FT8TW User Manual – 整本手冊列印／PDF 頁 ──────────────────────
   把 layout.js 裡列出的所有章節抓回來，依語系套上 i18n 字串後串成
   一份連續文件，交給瀏覽器的列印功能輸出 PDF。

   刻意不改動既有 15 個章節頁與 i18n 檔，全部靠 fetch 取得：
     ‧ 章節清單    ← 從 layout.js 的 NAV_ITEMS 直接取，避免兩份清單走鐘
     ‧ 章節骨架    ← fetch 各章 html，取出 .main-content 內容
     ‧ 章節字典    ← fetch assets/i18n/<id>.js，在獨立 scope 求值
   語系清單也不寫死，直接看 COMMON_T 有哪些語言，
   日後 i18n 檔多一個語系，這頁的語言選單就自動多一種。 ─────────── */

const PRINT_STATE = {
  navItems: [],
  chapters: [],          /* { id, key, node, dict } */
  lang: 'en',
  ready: false,
};

/* ── 小工具 ─────────────────────────────────────────────────────── */

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

/* COMMON_T 的 key 就是本手冊實際擁有的語系 */
function availableLangs() {
  return (typeof COMMON_T !== 'undefined') ? Object.keys(COMMON_T) : ['en'];
}

/* 語言選單上的顯示名稱。未列出的語系退回代碼本身，
   所以新增語系即使忘了補這張表也不會壞，只是顯示得比較樸素。 */
const LANG_LABELS = {
  'en':    'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'ja':    '日本語',
  'ru':    'Русский',
  'pl':    'Polski',
  'es':    'Español',
  'el':    'Ελληνικά',
};

/* 取字串：目標語系缺字時退回英文，再退回 key 本身。
   語系只翻一半時仍能出得了 PDF，未翻的部分顯示英文而不是空白。 */
function pick(dict, key, lang) {
  const d = dict[lang];
  if (d && d[key] !== undefined) return d[key];
  const en = dict['en'];
  if (en && en[key] !== undefined) return en[key];
  return null;
}

/* ── 資料載入 ───────────────────────────────────────────────────── */

/* 章節清單只有 layout.js 一份，從那裡抽出來用 */
async function loadNavItems() {
  const src = await fetchText('assets/layout.js');
  const m = src.match(/const\s+NAV_ITEMS\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('在 layout.js 找不到 NAV_ITEMS');
  return new Function('return ' + m[1])();
}

/* 每個 i18n 檔都宣告 const PAGE_T，全部塞進同一個 scope 會重複宣告而爆掉。
   包進各自的 Function scope 求值就互不干擾，原檔一行都不用改。 */
async function loadPageDict(id) {
  const src = await fetchText(`assets/i18n/${id}.js`);
  return new Function(`${src}\n;return PAGE_T;`)();
}

/* 取出章節內容。footer 每章都有一份，整本手冊只需要最後一份，先拆掉。 */
async function loadPageNode(file) {
  const html = await fetchText(file);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const main = doc.querySelector('.main-content');
  if (!main) throw new Error(`${file} 沒有 .main-content`);
  main.querySelectorAll('footer').forEach(f => f.remove());

  const wrap = document.createElement('article');
  wrap.className = 'print-chapter';
  while (main.firstChild) wrap.appendChild(main.firstChild);
  return wrap;
}

/* ── 套用語系 ───────────────────────────────────────────────────── */

/* 截圖的 fallback 順序：目標語系 → 同語言的其他變體(zh-CN→zh-TW) → 英文 → 第一張。
   沒有這段，新增語系時 9 張截圖會因為沒有對應的 data-lang-img 而整批消失。 */
function applyLangImages(root, lang) {
  const base = lang.split('-')[0];
  root.querySelectorAll('[data-lang-img]').forEach(img => {
    const group = img.parentElement
      ? [...img.parentElement.querySelectorAll('[data-lang-img]')]
      : [img];
    const tagOf = el => el.getAttribute('data-lang-img');
    const target =
      group.find(el => tagOf(el) === lang) ||
      group.find(el => tagOf(el).split('-')[0] === base) ||
      group.find(el => tagOf(el) === 'en') ||
      group[0];
    img.style.display = (img === target) ? '' : 'none';
  });
}

function applyDict(root, dict, lang) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const v = pick(dict, el.getAttribute('data-i18n'), lang);
    if (v !== null) el.innerHTML = v;
  });
  root.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = pick(dict, el.getAttribute('data-i18n-html'), lang);
    if (v !== null) el.innerHTML = v;
  });
  applyLangImages(root, lang);
}

/* ── 封面與目錄 ─────────────────────────────────────────────────── */

function buildCover(lang) {
  const cover = document.createElement('section');
  cover.className = 'print-cover';
  const title = pick(COMMON_T, 'page_title', lang) || 'FT8TW User Manual';
  const sub   = pick(COMMON_T, 'brand_sub', lang)  || 'User Manual';
  const date  = new Date().toISOString().slice(0, 10);
  cover.innerHTML = `
    <div class="cover-icon">&#128251;</div>
    <h1 class="cover-title">FT8TW</h1>
    <p class="cover-sub">${sub}</p>
    <p class="cover-meta">${title}<br>${date}<br>
      <span class="cover-url">https://danleetw.github.io/FT8TW/</span></p>`;
  return cover;
}

function buildToc(lang) {
  const toc = document.createElement('section');
  toc.className = 'print-toc';
  const heading = pick(COMMON_T, 'print_toc', lang) || 'Contents';
  const items = PRINT_STATE.navItems.map((item, i) => {
    const label = pick(COMMON_T, item.key, lang) || item.id;
    return `<li><span class="toc-no">${i + 1}.</span> ${label}</li>`;
  }).join('');
  toc.innerHTML = `<h1>${heading}</h1><ol class="toc-list">${items}</ol>`;
  return toc;
}

/* ── 組裝 ───────────────────────────────────────────────────────── */

function render(lang) {
  PRINT_STATE.lang = lang;
  document.documentElement.lang = lang;

  const root = document.getElementById('printRoot');
  root.innerHTML = '';
  root.appendChild(buildCover(lang));
  root.appendChild(buildToc(lang));

  PRINT_STATE.chapters.forEach((ch, i) => {
    const node = ch.node.cloneNode(true);
    /* 章節字典疊在共用字典之上，與 layout.js 的合併順序一致 */
    const merged = {};
    for (const l of availableLangs()) {
      merged[l] = Object.assign({},
        (COMMON_T[l] || {}),
        (ch.dict[l] || {}));
    }
    applyDict(node, merged, lang);

    const first = node.querySelector('h1, h2');
    if (first) {
      const no = document.createElement('span');
      no.className = 'chapter-no';
      no.textContent = `${i + 1}. `;
      first.insertBefore(no, first.firstChild);
    }
    root.appendChild(node);
  });

  const footer = document.createElement('footer');
  footer.className = 'print-footer';
  footer.innerHTML = `<p>${pick(COMMON_T, 'footer_text', lang) || ''}</p>`;
  root.appendChild(footer);

  /* 工具列與提示文字本身也要跟著語系走 */
  document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(el => {
    if (root.contains(el)) return;
    const key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
    const v = pick(COMMON_T, key, lang);
    if (v !== null) el.innerHTML = v;
  });
  document.title = pick(COMMON_T, 'page_title', lang) || document.title;

  try { localStorage.setItem('ft8tw-lang', lang); } catch (e) {}
}

/* 圖片沒載完就列印，PDF 裡會出現空白框，所以要等 */
function waitForImages(root) {
  const imgs = [...root.querySelectorAll('img')]
    .filter(img => img.style.display !== 'none');
  return Promise.all(imgs.map(img =>
    (img.complete && img.naturalWidth > 0)
      ? Promise.resolve()
      : new Promise(res => { img.onload = img.onerror = () => res(); })
  ));
}

/* ── 初始化 ─────────────────────────────────────────────────────── */

function initLangSelect() {
  const sel = document.getElementById('printLang');
  sel.innerHTML = '';
  availableLangs().forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.textContent = LANG_LABELS[lang] || lang;
    sel.appendChild(opt);
  });
  sel.value = PRINT_STATE.lang;
  sel.addEventListener('change', () => {
    render(sel.value);
    waitForImages(document.getElementById('printRoot'));
  });
}

/* 語系優先序與 layout.js 一致：?lang= > 記住的選擇 > 瀏覽器語系 > 英文 */
function initialLang() {
  const langs = availableLangs();
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang && langs.includes(urlLang)) return urlLang;

  let stored = null;
  try { stored = localStorage.getItem('ft8tw-lang'); } catch (e) {}
  if (stored && langs.includes(stored)) return stored;

  let list = [];
  try {
    list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || ''];
  } catch (e) { list = ['']; }
  for (const raw of list) {
    const l = (raw || '').trim();
    if (!l) continue;
    if (langs.includes(l)) return l;

    const lower = l.toLowerCase();
    /* 中文分繁簡的規則與 layout.js 一致 */
    if (lower.indexOf('zh') === 0) {
      const order = /hant|tw|hk|mo/.test(lower) ? ['zh-TW', 'zh-CN'] : ['zh-CN', 'zh-TW'];
      const zhHit = order.find(x => langs.includes(x));
      if (zhHit) return zhHit;
    }

    const base = lower.split('-')[0];
    const hit = langs.find(x => x.toLowerCase().split('-')[0] === base);
    if (hit) return hit;
  }
  return 'en';
}

(async function init() {
  const status = document.getElementById('printStatus');
  const btn = document.getElementById('printBtn');
  PRINT_STATE.lang = initialLang();

  try {
    PRINT_STATE.navItems = await loadNavItems();
    initLangSelect();

    /* i18n 檔名與 NAV_ITEMS 的 id 同名（intro.js、first-setup.js…） */
    PRINT_STATE.chapters = await Promise.all(
      PRINT_STATE.navItems.map(async item => ({
        id: item.id,
        key: item.key,
        node: await loadPageNode(item.file),
        dict: await loadPageDict(item.id),
      }))
    );

    render(PRINT_STATE.lang);
    await waitForImages(document.getElementById('printRoot'));

    PRINT_STATE.ready = true;
    status.style.display = 'none';
    btn.disabled = false;
    btn.addEventListener('click', async () => {
      await waitForImages(document.getElementById('printRoot'));
      window.print();
    });
  } catch (err) {
    status.classList.add('print-error');
    status.textContent = `載入失敗 / Failed to load: ${err.message}`;
    console.error('[print]', err);
  }
})();
