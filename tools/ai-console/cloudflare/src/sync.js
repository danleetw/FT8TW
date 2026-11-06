// 從 Anthropic 與 OpenAI 的組織 Admin API 抓每日費用（美元）。
// 兩者都只適用於「組織」帳號的 API 用量；ChatGPT / Claude 個人月費方案沒有這類 API。

const UA = "ai-console/1.0 (+https://github.com/danleetw/FT8TW/tree/main/tools/ai-console)";

// 金額欄位可能是字串、數字或 {value} 物件，統一轉成數字
const num = (v) => (v && typeof v === "object" ? parseFloat(v.value) : parseFloat(v)) || 0;
const dayOf = (s) => (typeof s === "number" ? new Date(s * 1000).toISOString() : String(s)).slice(0, 10);

/**
 * Anthropic cost_report：金額是以「美分」表示的十進位字串，只支援 1d 粒度。
 * @returns {Promise<Map<string, number>>} 日期 → 美元
 */
export async function anthropicDailyCost(adminKey, startDate, endDate, fetchFn = fetch) {
  const out = new Map();
  let page = null;
  for (let i = 0; i < 10; i++) {
    const q = new URLSearchParams({ starting_at: `${startDate}T00:00:00Z`, ending_at: `${endDate}T00:00:00Z`, bucket_width: "1d" });
    if (page) q.set("page", page);
    const res = await fetchFn(`https://api.anthropic.com/v1/organizations/cost_report?${q}`, {
      headers: { "x-api-key": adminKey, "anthropic-version": "2026-10-21", "user-agent": UA },
    });
    if (!res.ok) throw new Error(`Anthropic cost_report HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const body = await res.json();
    for (const b of body.data || []) {
      const cents = (b.results || []).reduce((a, r) => a + num(r.amount), 0);
      const d = dayOf(b.starting_at);
      out.set(d, (out.get(d) || 0) + cents / 100);
    }
    if (!body.has_more || !body.next_page) break;
    page = body.next_page;
  }
  return out;
}

/**
 * OpenAI organization/costs：amount.value 單位是美元。
 * @returns {Promise<Map<string, number>>} 日期 → 美元
 */
export async function openaiDailyCost(adminKey, startDate, endDate, fetchFn = fetch) {
  const out = new Map();
  let page = null;
  const st = Math.floor(Date.parse(`${startDate}T00:00:00Z`) / 1000);
  const et = Math.floor(Date.parse(`${endDate}T00:00:00Z`) / 1000);
  for (let i = 0; i < 10; i++) {
    const q = new URLSearchParams({ start_time: String(st), end_time: String(et), bucket_width: "1d", limit: "31" });
    if (page) q.set("page", page);
    const res = await fetchFn(`https://api.openai.com/v1/organization/costs?${q}`, {
      headers: { authorization: `Bearer ${adminKey}`, "user-agent": UA },
    });
    if (!res.ok) throw new Error(`OpenAI costs HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const body = await res.json();
    for (const b of body.data || []) {
      const usd = (b.results || []).reduce((a, r) => a + num(r.amount), 0);
      const d = dayOf(b.start_time);
      out.set(d, (out.get(d) || 0) + usd);
    }
    if (!body.has_more || !body.next_page) break;
    page = body.next_page;
  }
  return out;
}
