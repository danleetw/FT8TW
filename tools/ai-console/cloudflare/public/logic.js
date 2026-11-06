// AI Console 共用邏輯：Worker（排程、API）與網頁共用同一份，確保兩邊算出來的結果一致。
// 與 ../ai_console.py 的規則相同。

export const CYCLES = { monthly: 1, quarterly: 3, yearly: 12, usage: 0 };

export const DEFAULT_CFG = {
  base_currency: "TWD",
  rates: { TWD: 1, USD: 32, EUR: 35, JPY: 0.21 },
  rules: {
    unused_days: 30,          // 超過 N 天沒使用 → 建議取消（0 = 停用）
    monthly_budget: 0,        // 每月總預算（基準幣別，0 = 不限）
    min_uses_per_month: 0,    // 近 30 天少於 N 次 → 建議取消（0 = 停用）
    renewal_warning_days: 3,  // 續約前 N 天內才執行取消
    auto_apply: false,        // 排程時自動標記取消
  },
};

export const PRESETS = {
  chatgpt: ["ChatGPT", "OpenAI", "https://chatgpt.com/#settings/Account"],
  "openai-api": ["OpenAI API", "OpenAI", "https://platform.openai.com/settings/organization/billing"],
  claude: ["Claude", "Anthropic", "https://claude.ai/settings/billing"],
  "claude-api": ["Claude API", "Anthropic", "https://platform.claude.com/settings/billing"],
  gemini: ["Google AI (Gemini)", "Google", "https://one.google.com/settings"],
  copilot: ["GitHub Copilot", "GitHub", "https://github.com/settings/copilot"],
  cursor: ["Cursor", "Anysphere", "https://cursor.com/settings"],
  perplexity: ["Perplexity", "Perplexity", "https://www.perplexity.ai/settings/account"],
  midjourney: ["Midjourney", "Midjourney", "https://www.midjourney.com/account"],
  grok: ["Grok / X Premium", "xAI", "https://x.com/settings/manage_subscriptions"],
};

const pad = (n) => String(n).padStart(2, "0");
export const iso = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
export const parse = (s) => { const [y, m, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
export const days = (a, b) => Math.round((b - a) / 86400000);

/** 依時區（預設台北）取得「今天」的 UTC 午夜日期物件。 */
export function todayIn(tz = "Asia/Taipei", now = new Date()) {
  const s = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return parse(s);
}

export function addMonths(d, n) {
  const m = d.getUTCMonth() + n;
  const y = d.getUTCFullYear() + Math.floor(m / 12), mm = ((m % 12) + 12) % 12;
  const last = new Date(Date.UTC(y, mm + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, mm, Math.min(d.getUTCDate(), last)));
}

export function nextRenewal(s, ref) {
  const months = CYCLES[s.cycle || "monthly"];
  if (!months || !s.start_date) return null;
  const d = parse(s.start_date);
  let n = 0;
  while (addMonths(d, n) <= ref) n += months;
  return addMonths(d, n);
}

export function withDefaults(cfg = {}) {
  return {
    base_currency: cfg.base_currency || DEFAULT_CFG.base_currency,
    rates: { ...DEFAULT_CFG.rates, ...(cfg.rates || {}) },
    rules: { ...DEFAULT_CFG.rules, ...(cfg.rules || {}) },
  };
}

const rate = (cfg, cur) => cfg.rates[(cur || cfg.base_currency).toUpperCase()] ?? 1;
const recent = (s, today) => { const cut = today.getTime() - 30 * 86400000; return (s.usage || []).filter((u) => parse(u.date).getTime() > cut); };

export function monthlyCost(s, cfg, today) {
  const amt = s.cycle === "usage"
    ? recent(s, today).reduce((a, u) => a + (u.cost || 0), 0)
    : (s.price || 0) / CYCLES[s.cycle || "monthly"];
  return amt * rate(cfg, s.currency) / rate(cfg, cfg.base_currency);
}
export const uses30 = (s, today) => recent(s, today).reduce((a, u) => a + (u.count ?? 1), 0);
export function lastUsed(s) {
  const d = (s.usage || []).filter((u) => (u.count ?? 1) > 0).map((u) => u.date).sort();
  return d.length ? parse(d[d.length - 1]) : null;
}

/** 回傳建議取消的清單：[{s, why[], due, nr}]。due = 現在就該取消（已接近續約或到預定日）。 */
export function evaluate(subs, cfg, today) {
  const r = cfg.rules, out = new Map();
  const act = subs.filter((s) => s.status === "active");
  const flag = (s, why) => { if (!out.has(s.id)) out.set(s.id, { s, why: [] }); out.get(s.id).why.push(why); };
  const fmt = (v) => `${Math.round(v).toLocaleString("en-US")} ${cfg.base_currency}`;
  for (const s of act) {
    if (s.keep) continue;
    if (s.cancel_on && parse(s.cancel_on) <= today) flag(s, `已到預定取消日 ${s.cancel_on}`);
    // 沒有使用紀錄時，從「加入日」起算；不能用計費日，因為收據每次扣款都會把計費日往後推
    const since = s.created || s.start_date;
    const lu = lastUsed(s) || (since ? parse(since) : null);
    if (r.unused_days && lu && days(lu, today) >= r.unused_days) flag(s, `已 ${days(lu, today)} 天未使用（規則：${r.unused_days} 天）`);
    if (r.min_uses_per_month && since && days(parse(since), today) >= 30 && uses30(s, today) < r.min_uses_per_month)
      flag(s, `近 30 天僅使用 ${uses30(s, today)} 次（規則：至少 ${r.min_uses_per_month} 次）`);
  }
  if (r.monthly_budget) {
    let total = act.reduce((a, s) => a + monthlyCost(s, cfg, today), 0);
    const cpu = (s) => monthlyCost(s, cfg, today) / Math.max(uses30(s, today), 1);
    for (const s of act.filter((s) => !s.keep).sort((a, b) => cpu(b) - cpu(a))) {
      if (total <= r.monthly_budget) break;
      flag(s, `總月費 ${fmt(total)} 超出預算 ${fmt(r.monthly_budget)}，此項每次使用成本最高`);
      total -= monthlyCost(s, cfg, today);
    }
  }
  return [...out.values()].map(({ s, why }) => {
    const nr = nextRenewal(s, today);
    const due = !nr || days(today, nr) <= r.renewal_warning_days || why.some((w) => w.startsWith("已到預定取消日"));
    return { s, why, due, nr };
  });
}
