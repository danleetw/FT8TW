import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyAccess } from "../src/auth.js";
import { parseReceipt, senderAllowed } from "../src/receipts.js";
import { anthropicDailyCost, openaiDailyCost } from "../src/sync.js";
import { evaluate, withDefaults, nextRenewal, parse, iso } from "../public/logic.js";

const TEAM = "https://bv6lc.cloudflareaccess.com";
const AUD = "aud-123";
const b64u = (buf) => Buffer.from(buf).toString("base64url");

async function makeToken(payload, { kid = "k1", keyPair } = {}) {
  const header = b64u(JSON.stringify({ alg: "RS256", kid, typ: "JWT" }));
  const body = b64u(JSON.stringify(payload));
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", keyPair.privateKey, new TextEncoder().encode(`${header}.${body}`));
  return `${header}.${body}.${b64u(sig)}`;
}

test("Access JWT：有效通過，竄改、過期、錯誤 AUD、沒帶都擋下", async () => {
  const keyPair = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  const jwk = { ...(await crypto.subtle.exportKey("jwk", keyPair.publicKey)), kid: "k1" };
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(url, `${TEAM}/cdn-cgi/access/certs`);
    return new Response(JSON.stringify({ keys: [jwk] }));
  };
  try {
    const env = { ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: AUD };
    const now = Math.floor(Date.now() / 1000);
    const good = { aud: [AUD], email: "danlee.tw@gmail.com", exp: now + 600, iss: TEAM };
    const req = (tok) => new Request("https://ai.bv6lc.com/", { headers: tok ? { "Cf-Access-Jwt-Assertion": tok } : {} });

    assert.deepEqual(await verifyAccess(req(await makeToken(good, { keyPair })), env), { email: "danlee.tw@gmail.com" });
    assert.equal(await verifyAccess(req(null), env), null);
    assert.equal(await verifyAccess(req(await makeToken({ ...good, exp: now - 10 }, { keyPair })), env), null);
    assert.equal(await verifyAccess(req(await makeToken({ ...good, aud: ["other"] }, { keyPair })), env), null);
    assert.equal(await verifyAccess(req(await makeToken({ ...good, iss: "https://evil.cloudflareaccess.com" }, { keyPair })), env), null);
    const tok = await makeToken(good, { keyPair });
    const [h, , s] = tok.split(".");
    const forged = `${h}.${b64u(JSON.stringify({ ...good, email: "attacker@x.com" }))}.${s}`;
    assert.equal(await verifyAccess(req(forged), env), null);
    // 未設定 Access 時一律拒絕
    assert.equal(await verifyAccess(req(tok), {}), null);
    assert.equal(await verifyAccess(req(tok), { ACCESS_TEAM_DOMAIN: "https://REPLACE.cloudflareaccess.com", ACCESS_AUD: "x" }), null);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("收據解析：各家廠商、金額、幣別", () => {
  const cases = [
    [{ from: "OpenAI <noreply@tm.openai.com>", subject: "Your receipt from OpenAI", text: "ChatGPT Plus\nAmount paid\n$20.00" }, "chatgpt", 20, "USD"],
    [{ from: "OpenAI <noreply@tm.openai.com>", subject: "Your OpenAI API credit purchase", text: "Total $50.00" }, "openai-api", 50, "USD"],
    [{ from: "Anthropic <invoice+statements@anthropic.com>", subject: "Your receipt from Anthropic", text: "Claude Max\nTotal US$100.00" }, "claude", 100, "USD"],
    [{ from: "Anthropic <billing@anthropic.com>", subject: "Receipt", text: "Claude API credits\nAmount charged: $25.00" }, "claude-api", 25, "USD"],
    [{ from: "Google Payments <payments-noreply@google.com>", subject: "您的 Google One 收據", text: "Google AI Pro (2 TB)\n總計：NT$650.00" }, "gemini", 650, "TWD"],
    [{ from: "GitHub <noreply@github.com>", subject: "[GitHub] Payment receipt", text: "GitHub Copilot Pro\nTotal $10.00 USD" }, "copilot", 10, "USD"],
    [{ from: "Apple <no_reply@email.apple.com>", subject: "您的收據", text: "Perplexity Pro (月)\n總計 NT$ 690" }, "perplexity", 690, "TWD"],
  ];
  for (const [mail, preset, amount, cur] of cases) {
    const r = parseReceipt(mail);
    assert.equal(r.preset, preset, mail.subject);
    assert.equal(r.amount, amount, mail.subject);
    assert.equal(r.currency, cur, mail.subject);
  }
  assert.equal(parseReceipt({ from: "news@shop.com", subject: "Sale", text: "nothing" }).preset, null);
  assert.equal(senderAllowed("danlee.tw+caf_=receipts=bv6lc.com@gmail.com", "danlee.tw"), true);
  assert.equal(senderAllowed("evil@example.com", "danlee.tw"), false);
  assert.equal(senderAllowed("anyone@x.com", ""), false);
});

test("Anthropic 費用：美分轉美元、分頁", async () => {
  const pages = [
    { data: [{ starting_at: "2026-11-01T00:00:00Z", results: [{ amount: "1234.5", currency: "USD" }, { amount: "100", currency: "USD" }] }], has_more: true, next_page: "p2" },
    { data: [{ starting_at: "2026-11-02T00:00:00Z", results: [{ amount: "50", currency: "USD" }] }], has_more: false },
  ];
  const seen = [];
  const fake = async (url, opts) => { seen.push([url, opts.headers]); return new Response(JSON.stringify(pages[seen.length - 1])); };
  const m = await anthropicDailyCost("sk-ant-admin-x", "2026-11-01", "2026-11-03", fake);
  assert.equal(m.get("2026-11-01"), 13.345);
  assert.equal(m.get("2026-11-02"), 0.5);
  assert.match(seen[1][0], /page=p2/);
  assert.equal(seen[0][1]["x-api-key"], "sk-ant-admin-x");
  assert.equal(seen[0][1]["anthropic-version"], "2026-10-21");
});

test("OpenAI 費用：amount.value 美元", async () => {
  const body = { data: [{ start_time: 1793836800, results: [{ amount: { value: 1.25, currency: "usd" } }, { amount: { value: 0.75, currency: "usd" } }] }], has_more: false };
  const m = await openaiDailyCost("sk-admin", "2026-11-01", "2026-11-03", async () => new Response(JSON.stringify(body)));
  assert.equal([...m.values()][0], 2);
});

test("規則：未使用、鎖定、預算、續約時機", () => {
  const cfg = withDefaults({ rules: { unused_days: 30, monthly_budget: 1200 } });
  const t = parse("2026-11-06");
  const subs = [
    { id: "a", name: "A", status: "active", price: 20, currency: "USD", cycle: "monthly", start_date: "2026-08-07", keep: true, usage: [] },
    { id: "b", name: "B", status: "active", price: 20, currency: "USD", cycle: "monthly", start_date: "2026-08-20", usage: [{ date: "2026-11-05", count: 3 }] },
    { id: "c", name: "C", status: "active", price: 500, currency: "TWD", cycle: "monthly", start_date: "2026-10-01", usage: [{ date: "2026-11-01", count: 50 }] },
    { id: "d", name: "D", status: "active", price: 10, currency: "USD", cycle: "monthly", start_date: "2026-08-08", usage: [{ date: "2026-09-01", count: 1 }] },
  ];
  const r = evaluate(subs, cfg, t);
  const byId = Object.fromEntries(r.map((x) => [x.s.id, x]));
  assert.ok(!byId.a, "鎖定的不建議");
  assert.ok(byId.d.why[0].includes("66 天未使用"));
  assert.equal(byId.d.due, true, "續約日 11-08，2 天內 → 現在可取消");
  assert.ok(byId.b, "超出預算時砍每次使用成本最高的");
  assert.equal(iso(nextRenewal({ cycle: "monthly", start_date: "2026-01-31" }, t)), "2026-11-30");
});

test("收據把計費日往後推，不會讓「未使用」規則失效", () => {
  const cfg = withDefaults({ rules: { unused_days: 30 } });
  const t = parse("2026-11-06");
  const s = { id: "x", name: "X", status: "active", price: 20, currency: "USD", cycle: "monthly",
    start_date: "2026-11-05", created: "2026-08-01", usage: [] };
  const r = evaluate([s], cfg, t);
  assert.equal(r.length, 1);
  assert.match(r[0].why[0], /97 天未使用/);
});
