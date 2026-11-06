// 從 AI 廠商的收據信件判斷是哪個服務、金額與幣別。
// 只做保守判斷：認不出來就標成 unparsed，不亂建資料。

const VENDORS = [
  { re: /openai|chatgpt/i, pick: (t) => (/\bapi\b|platform\.openai|credit|prepaid|usage/i.test(t) ? "openai-api" : "chatgpt") },
  { re: /anthropic|claude/i, pick: (t) => (/\bapi\b|console|credit|platform\.claude|usage/i.test(t) ? "claude-api" : "claude") },
  { re: /google one|gemini|google ai (pro|ultra|plus)|ai premium/i, pick: () => "gemini" },
  { re: /copilot/i, pick: () => "copilot" },
  { re: /cursor|anysphere/i, pick: () => "cursor" },
  { re: /perplexity/i, pick: () => "perplexity" },
  { re: /midjourney/i, pick: () => "midjourney" },
  { re: /\bx\.ai\b|supergrok|grok|x premium/i, pick: () => "grok" },
];

const RECEIPT_WORDS = /receipt|invoice|payment|charged|renew|subscription|billing|收據|發票|付款|扣款|續訂|訂閱|帳單/i;
const TOTAL_WORDS = /total|amount paid|amount charged|charged|paid|總計|合計|總額|金額|已付款|付款金額/i;

const CUR_PREFIX = /(US\$|NT\$|USD|TWD|NTD|EUR|JPY|€|¥|\$)\s?([0-9][0-9,]*(?:\.[0-9]{1,2})?)/;
const CUR_SUFFIX = /([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s?(USD|TWD|NTD|EUR|JPY|美元|新台幣|元)/;

function normCur(c) {
  c = (c || "").toUpperCase();
  if (c === "US$" || c === "$" || c === "USD" || c === "美元") return "USD";
  if (c === "NT$" || c === "NTD" || c === "TWD" || c === "新台幣" || c === "元") return "TWD";
  if (c === "€") return "EUR";
  if (c === "¥") return "JPY";
  return c || "USD";
}

function findAmount(line) {
  let m = line.match(CUR_PREFIX);
  if (m) return { amount: parseFloat(m[2].replace(/,/g, "")), currency: normCur(m[1]) };
  m = line.match(CUR_SUFFIX);
  if (m) return { amount: parseFloat(m[1].replace(/,/g, "")), currency: normCur(m[2]) };
  return null;
}

/**
 * @param {{from:string, subject:string, text:string}} mail  from 是原始寄件者（含名稱）
 * @returns {{preset:string|null, amount:number|null, currency:string|null, isReceipt:boolean}}
 */
export function parseReceipt({ from = "", subject = "", text = "" }) {
  const head = `${from}\n${subject}`;
  const body = String(text).slice(0, 20000);
  const all = `${head}\n${body.slice(0, 3000)}`;
  const isReceipt = RECEIPT_WORDS.test(subject) || RECEIPT_WORDS.test(body.slice(0, 1500));

  let preset = null;
  // 先看寄件者與主旨，再看內文，避免內文提到別家產品時誤判
  for (const v of VENDORS) if (v.re.test(head)) { preset = v.pick(all); break; }
  if (!preset) for (const v of VENDORS) if (v.re.test(body.slice(0, 3000))) { preset = v.pick(all); break; }

  let found = null;
  const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (let i = 0; i < lines.length && !found; i++) {
    if (TOTAL_WORDS.test(lines[i])) found = findAmount(lines[i]) || (lines[i + 1] ? findAmount(lines[i + 1]) : null);
  }
  if (!found) found = findAmount(subject);
  if (!found) for (const l of lines) { found = findAmount(l); if (found) break; }
  if (found && !(found.amount > 0 && found.amount < 100000)) found = null;

  return { preset, amount: found?.amount ?? null, currency: found?.currency ?? null, isReceipt };
}

/** 信封寄件者是否在允許清單內（逗號分隔的子字串）。 */
export function senderAllowed(envelopeFrom, allowList) {
  const list = String(allowList || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!list.length) return false;
  const f = String(envelopeFrom || "").toLowerCase();
  return list.some((s) => f.includes(s));
}
