// AI Console — Cloudflare Worker
// fetch：網頁與 /api/*（全部需通過 Cloudflare Access）
// scheduled：每天檢查規則、抓 API 費用、寄提醒
// email：解析轉寄來的收據

import PostalMime from "postal-mime";
import { verifyAccess } from "./auth.js";
import { parseReceipt, senderAllowed } from "./receipts.js";
import { anthropicDailyCost, openaiDailyCost } from "./sync.js";
import { PRESETS, CYCLES, withDefaults, evaluate, todayIn, iso, parse, days, nextRenewal, monthlyCost } from "../public/logic.js";

const SUB_FIELDS = ["name", "vendor", "plan", "price", "currency", "cycle", "start_date", "status", "account", "payment",
  "manage_url", "keep", "notes", "cancel_on", "cancelled_date", "cancel_reason", "last_charge", "created"];
const ID_RE = /^[a-z0-9一-鿿][a-z0-9一-鿿-]{0,79}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const USAGE_DAYS = 400;

// ---------------------------------------------------------------- 工具

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});
const fail = (status, msg) => json({ error: msg }, status);
const nowIso = () => new Date().toISOString();
const today = (env) => todayIn(env.TIMEZONE || "Asia/Taipei");

function cleanSub(input, partial = false) {
  const out = {};
  for (const k of SUB_FIELDS) if (k in input) out[k] = input[k];
  if ("price" in out) out.price = Math.max(0, Number(out.price) || 0);
  if ("currency" in out) out.currency = String(out.currency || "USD").toUpperCase().slice(0, 8);
  if ("cycle" in out && !(out.cycle in CYCLES)) out.cycle = "monthly";
  if ("status" in out && !["active", "paused", "cancelled"].includes(out.status)) out.status = "active";
  for (const k of ["start_date", "cancel_on", "cancelled_date", "created"]) if (k in out && out[k] && !DATE_RE.test(out[k])) out[k] = null;
  if ("manage_url" in out && out.manage_url && !/^https:\/\//.test(out.manage_url)) out.manage_url = "";
  for (const k of ["name", "vendor", "plan", "account", "payment", "notes", "cancel_reason"])
    if (k in out) out[k] = String(out[k] ?? "").slice(0, 300);
  if ("keep" in out) out.keep = !!out.keep;
  if (!partial) {
    out.name ||= "未命名";
    out.cycle ||= "monthly";
    out.currency ||= "USD";
    out.status ||= "active";
    out.price ??= 0;
  }
  return out;
}

function slug(name, taken) {
  const base = String(name).toLowerCase().replace(/[^a-z0-9一-鿿]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "sub";
  let id = base, i = 2;
  while (taken.has(id)) id = `${base}-${i++}`;
  return id;
}

// ---------------------------------------------------------------- 資料存取

async function getCfg(env) {
  const row = await env.DB.prepare("SELECT value FROM config WHERE key='settings'").first();
  return withDefaults(row ? JSON.parse(row.value) : {});
}
async function putCfg(env, cfg) {
  await env.DB.prepare("INSERT INTO config(key,value) VALUES('settings',?1) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    .bind(JSON.stringify(withDefaults(cfg))).run();
}
async function getMeta(env, key) {
  const row = await env.DB.prepare("SELECT value FROM config WHERE key=?1").bind(key).first();
  return row ? JSON.parse(row.value) : null;
}
async function putMeta(env, key, value) {
  await env.DB.prepare("INSERT INTO config(key,value) VALUES(?1,?2) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    .bind(key, JSON.stringify(value)).run();
}

async function loadSubs(env, t) {
  const since = iso(new Date(t.getTime() - USAGE_DAYS * 86400000));
  const [subs, usage] = await Promise.all([
    env.DB.prepare("SELECT id, data FROM subs").all(),
    env.DB.prepare("SELECT sub_id, date, SUM(count) AS count, SUM(cost) AS cost, SUM(tokens) AS tokens FROM usage WHERE date >= ?1 GROUP BY sub_id, date ORDER BY date")
      .bind(since).all(),
  ]);
  const byId = new Map(subs.results.map((r) => [r.id, { id: r.id, ...JSON.parse(r.data), usage: [] }]));
  for (const u of usage.results) {
    const s = byId.get(u.sub_id);
    if (s) s.usage.push({ date: u.date, count: u.count, cost: Math.round(u.cost * 10000) / 10000, tokens: u.tokens });
  }
  return [...byId.values()];
}
async function getSub(env, id) {
  const row = await env.DB.prepare("SELECT data FROM subs WHERE id=?1").bind(id).first();
  return row ? { id, ...JSON.parse(row.data) } : null;
}
async function putSub(env, id, data) {
  const { id: _, usage: __, ...rest } = data;
  await env.DB.prepare("INSERT INTO subs(id,data,updated_at) VALUES(?1,?2,?3) ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at")
    .bind(id, JSON.stringify(rest), nowIso()).run();
}
async function patchSub(env, id, patch) {
  const cur = await getSub(env, id);
  if (!cur) return null;
  const next = { ...cur, ...patch };
  for (const k of Object.keys(next)) if (next[k] === null) delete next[k];
  await putSub(env, id, next);
  return next;
}

/** mode "add" 累加（手動 ＋1），"replace" 覆蓋（Mac mini、API 同步，重跑不會重複計算） */
function usageStmt(env, subId, date, source, v, mode) {
  const sql = mode === "add"
    ? `INSERT INTO usage(sub_id,date,source,count,cost,tokens,note) VALUES(?1,?2,?3,?4,?5,?6,?7)
       ON CONFLICT(sub_id,date,source) DO UPDATE SET count=count+excluded.count, cost=cost+excluded.cost, tokens=tokens+excluded.tokens, note=COALESCE(excluded.note,note)`
    : `INSERT INTO usage(sub_id,date,source,count,cost,tokens,note) VALUES(?1,?2,?3,?4,?5,?6,?7)
       ON CONFLICT(sub_id,date,source) DO UPDATE SET count=excluded.count, cost=excluded.cost, tokens=excluded.tokens, note=excluded.note`;
  return env.DB.prepare(sql).bind(subId, date, source, Math.max(0, Math.round(v.count ?? 0)),
    Math.max(0, Number(v.cost) || 0), Math.max(0, Math.round(v.tokens ?? 0)), v.note ? String(v.note).slice(0, 200) : null);
}

async function logEvent(env, kind, msg) {
  await env.DB.batch([
    env.DB.prepare("INSERT INTO events(time,kind,msg) VALUES(?1,?2,?3)").bind(nowIso(), kind, String(msg).slice(0, 1000)),
    env.DB.prepare("DELETE FROM events WHERE time < ?1").bind(new Date(Date.now() - 90 * 86400000).toISOString()),
  ]);
}

async function ensureSub(env, presetId, extra = {}) {
  const existing = await getSub(env, presetId);
  if (existing) return existing;
  const p = PRESETS[presetId] || [presetId, "", ""];
  const sub = cleanSub({ name: p[0], vendor: p[1], manage_url: p[2], cycle: presetId.endsWith("-api") ? "usage" : "monthly",
    currency: "USD", price: 0, status: "active", start_date: iso(today(env)), created: iso(today(env)), ...extra });
  await putSub(env, presetId, sub);
  return { id: presetId, ...sub };
}

// ---------------------------------------------------------------- 規則與提醒

async function cancelSub(env, s, reason, t) {
  await patchSub(env, s.id, { status: "cancelled", cancelled_date: iso(t), cancel_reason: reason });
  await logEvent(env, "cancel", `取消 ${s.name}：${reason}`);
}

async function runCheck(env, { apply = false } = {}) {
  const t = today(env);
  const cfg = await getCfg(env);
  const subs = await loadSubs(env, t);
  const flagged = evaluate(subs, cfg, t);
  const cancelled = [];
  if (apply) for (const f of flagged.filter((f) => f.due)) { await cancelSub(env, f.s, "自動取消：" + f.why.join("；"), t); cancelled.push(f.s); }
  return { t, cfg, subs, flagged, cancelled };
}

async function syncApiCosts(env) {
  const t = today(env);
  const start = iso(new Date(t.getTime() - 7 * 86400000));
  const end = iso(new Date(t.getTime() + 86400000));
  const results = [];
  const jobs = [
    ["ANTHROPIC_ADMIN_KEY", "claude-api", "anthropic-api", anthropicDailyCost],
    ["OPENAI_ADMIN_KEY", "openai-api", "openai-api", openaiDailyCost],
  ];
  for (const [secret, subId, source, fn] of jobs) {
    if (!env[secret]) continue;
    try {
      const daily = await fn(env[secret], start, end);
      await ensureSub(env, subId);
      const stmts = [...daily].map(([date, usd]) => usageStmt(env, subId, date, source, { count: usd > 0 ? 1 : 0, cost: usd }, "replace"));
      if (stmts.length) await env.DB.batch(stmts);
      const total = [...daily.values()].reduce((a, b) => a + b, 0);
      results.push(`${subId}：近 7 天 ${total.toFixed(2)} USD`);
    } catch (e) {
      results.push(`${subId}：同步失敗（${e.message}）`);
    }
  }
  if (results.length) await logEvent(env, "sync", results.join("；"));
  return results;
}

function buildDigest({ t, cfg, subs, flagged, cancelled }, extra = []) {
  const lines = [];
  const due = flagged.filter((f) => f.due && !cancelled.some((c) => c.id === f.s.id));
  if (cancelled.length) {
    lines.push("已依規則標記取消，請到各服務按下取消按鈕：");
    for (const s of cancelled) lines.push(`・${s.name}${s.manage_url ? "  " + s.manage_url : ""}`);
  }
  if (due.length) {
    lines.push("建議現在取消：");
    for (const f of due) lines.push(`・${f.s.name}：${f.why.join("；")}${f.s.manage_url ? "  " + f.s.manage_url : ""}`);
  }
  const soon = subs.filter((s) => s.status === "active").map((s) => [s, nextRenewal(s, t)])
    .filter(([, d]) => d && days(t, d) <= 3).sort((a, b) => a[1] - b[1]);
  if (soon.length) {
    lines.push("3 天內續約：");
    for (const [s, d] of soon) lines.push(`・${iso(d)} ${s.name} ${s.price} ${s.currency}`);
  }
  if (cfg.rules.monthly_budget) {
    const total = subs.filter((s) => s.status === "active").reduce((a, s) => a + monthlyCost(s, cfg, t), 0);
    if (total > cfg.rules.monthly_budget)
      lines.push(`月費合計 ${Math.round(total)} ${cfg.base_currency}，超出預算 ${cfg.rules.monthly_budget} ${cfg.base_currency}`);
  }
  if (extra.length) lines.push(...extra);
  return lines.length ? `AI Console 每日提醒（${iso(t)}）\n\n${lines.join("\n")}` : "";
}

async function notify(env, text) {
  const sent = [];
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    });
    sent.push(r.ok ? "Telegram" : `Telegram 失敗（HTTP ${r.status}）`);
  }
  if (env.MAILER && env.NOTIFY_EMAIL_TO) {
    try {
      const { EmailMessage } = await import("cloudflare:email");
      const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
      const body = b64(text).replace(/.{76}/g, "$&\r\n");
      const from = env.NOTIFY_EMAIL_FROM;
      const raw = [
        `From: AI Console <${from}>`, `To: ${env.NOTIFY_EMAIL_TO}`,
        `Subject: =?UTF-8?B?${b64("AI Console 每日提醒")}?=`, `Date: ${new Date().toUTCString()}`,
        `Message-ID: <${crypto.randomUUID()}@${from.split("@")[1]}>`, "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "", body,
      ].join("\r\n");
      await env.MAILER.send(new EmailMessage(from, env.NOTIFY_EMAIL_TO, raw));
      sent.push("Email");
    } catch (e) { sent.push(`Email 失敗（${e.message}）`); }
  }
  return sent;
}

async function daily(env) {
  const syncNotes = await syncApiCosts(env);
  const cfg = await getCfg(env);
  const res = await runCheck(env, { apply: !!cfg.rules.auto_apply });
  const lastRun = await getMeta(env, "last_digest_receipts") || "1970-01-01";
  const newReceipts = await env.DB.prepare("SELECT vendor, amount, currency, status FROM receipts WHERE received_at > ?1").bind(lastRun).all();
  const extra = newReceipts.results.length
    ? ["新收據：", ...newReceipts.results.map((r) => `・${r.vendor || "未知"} ${r.amount ?? "?"} ${r.currency ?? ""}${r.status === "unparsed" ? "（無法判讀，請到網頁確認）" : ""}`)]
    : [];
  await putMeta(env, "last_digest_receipts", nowIso());
  const text = buildDigest(res, extra);
  const sent = text ? await notify(env, text) : [];
  await logEvent(env, "daily", `每日檢查：建議取消 ${res.flagged.length} 項，自動取消 ${res.cancelled.length} 項${sent.length ? "，已通知 " + sent.join("、") : ""}${syncNotes.length ? "；" + syncNotes.join("；") : ""}`);
  return { text, sent, flagged: res.flagged.length, cancelled: res.cancelled.length };
}

// ---------------------------------------------------------------- 收據

async function handleEmail(message, env) {
  // 在 Gmail 新增轉寄地址時，Google 會先寄確認碼到這裡；把確認碼記到活動紀錄，讓你在網頁上看得到
  if (/^forwarding-noreply@google\.com$/i.test(message.from)) {
    const mail = await PostalMime.parse(await new Response(message.raw).arrayBuffer());
    const text = `${mail.subject || ""}\n${mail.text || ""}`;
    if (/forwarding confirmation|轉寄確認|轉送確認/i.test(text)) {
      const code = (text.match(/(?:code|確認碼|驗證碼)[^0-9]{0,20}(\d{6,12})/i) || text.match(/\b(\d{9})\b/) || [])[1];
      const link = (text.match(/https:\/\/mail(?:-settings)?\.google\.com\/mail\/[^\s<>"]+/) || [])[0];
      await logEvent(env, "gmail", `Gmail 轉寄確認碼：${code || "（找不到，請看連結）"}${link ? "　確認連結：" + link : ""}`);
      return;
    }
  }
  if (!senderAllowed(message.from, env.RECEIPT_ALLOWED_FROM)) {
    message.setReject("Sender not allowed");
    await logEvent(env, "receipt", `拒收來自 ${message.from} 的信`);
    return;
  }
  const raw = await new Response(message.raw).arrayBuffer();
  const mail = await PostalMime.parse(raw);
  const from = `${mail.from?.name || ""} <${mail.from?.address || ""}>`;
  const text = mail.text || (mail.html || "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, "\n").replace(/&nbsp;/g, " ");
  const r = parseReceipt({ from, subject: mail.subject || "", text });
  const date = mail.date ? iso(new Date(mail.date)) : iso(today(env));
  const id = crypto.randomUUID();
  let status = "unparsed", subId = null;

  if (r.preset && r.amount) {
    const existing = await getSub(env, r.preset);
    if (existing) {
      status = "matched"; subId = existing.id;
      const patch = { last_charge: { date, amount: r.amount, currency: r.currency } };
      if (existing.cycle !== "usage") Object.assign(patch, { price: r.amount, currency: r.currency, start_date: date });
      await patchSub(env, subId, patch);
    } else {
      status = "created"; subId = r.preset;
      await ensureSub(env, r.preset, { price: r.amount, currency: r.currency, start_date: date,
        last_charge: { date, amount: r.amount, currency: r.currency }, notes: "由收據自動建立，請確認計費週期" });
    }
    if (r.preset.endsWith("-api")) await usageStmt(env, subId, date, "receipt", { count: 0, cost: r.amount, note: "儲值 / 帳單" }, "add").run();
  }
  await env.DB.prepare("INSERT INTO receipts(id,received_at,vendor,sub_id,amount,currency,sender,subject,status) VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9)")
    .bind(id, nowIso(), r.preset, subId, r.amount, r.currency, from.slice(0, 200), (mail.subject || "").slice(0, 300), status).run();
  await logEvent(env, "receipt", `收據 ${r.preset || "未知"} ${r.amount ?? "?"} ${r.currency ?? ""}（${status}）`);
}

// ---------------------------------------------------------------- API

async function api(request, env, url, user) {
  const p = url.pathname.replace(/\/+$/, "");
  const m = request.method;
  const body = async () => { try { return await request.json(); } catch { return {}; } };
  const seg = p.split("/").slice(2).map(decodeURIComponent); // ["subs", id, "use"]

  if (p === "/api/state" && m === "GET") {
    const t = today(env);
    const [cfg, subs, backups, receipts, events, agent] = await Promise.all([
      getCfg(env), loadSubs(env, t),
      env.DB.prepare("SELECT id,name,created_at,size,source FROM backups ORDER BY created_at DESC LIMIT 100").all(),
      env.DB.prepare("SELECT * FROM receipts ORDER BY received_at DESC LIMIT 50").all(),
      env.DB.prepare("SELECT * FROM events ORDER BY time DESC LIMIT 50").all(),
      getMeta(env, "agent"),
    ]);
    return json({ user: user.email, today: iso(t), cfg, subs, backups: backups.results, receipts: receipts.results,
      events: events.results, agent, sync: { anthropic: !!env.ANTHROPIC_ADMIN_KEY, openai: !!env.OPENAI_ADMIN_KEY },
      notify: { telegram: !!(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID), email: !!(env.MAILER && env.NOTIFY_EMAIL_TO) } });
  }

  if (seg[0] === "subs") {
    if (seg.length === 1 && m === "POST") {
      const b = await body();
      const taken = new Set((await env.DB.prepare("SELECT id FROM subs").all()).results.map((r) => r.id));
      const id = b.id && ID_RE.test(b.id) && !taken.has(b.id) ? b.id : slug(b.name || "sub", taken);
      const sub = cleanSub(b);
      sub.created = iso(today(env));
      await putSub(env, id, sub);
      await logEvent(env, "edit", `新增 ${sub.name}`);
      return json({ id, ...sub }, 201);
    }
    const id = seg[1];
    if (!id || !(await getSub(env, id))) return fail(404, "找不到這個訂閱");
    if (seg.length === 2 && m === "PATCH") {
      const next = await patchSub(env, id, cleanSub(await body(), true));
      return json(next);
    }
    if (seg.length === 2 && m === "DELETE") {
      await env.DB.batch([env.DB.prepare("DELETE FROM subs WHERE id=?1").bind(id), env.DB.prepare("DELETE FROM usage WHERE sub_id=?1").bind(id)]);
      await logEvent(env, "edit", `刪除紀錄 ${id}`);
      return json({ ok: true });
    }
    if (seg[2] === "use" && m === "POST") {
      const b = await body();
      const date = DATE_RE.test(b.date || "") ? b.date : iso(today(env));
      await usageStmt(env, id, date, "manual", { count: b.count ?? 1, cost: b.cost, note: b.note }, "add").run();
      return json({ ok: true });
    }
    if (seg[2] === "cancel" && m === "POST") {
      const b = await body();
      const s = await getSub(env, id);
      await cancelSub(env, s, b.reason || "手動取消", today(env));
      return json({ ok: true, manage_url: s.manage_url || null });
    }
  }

  if (p === "/api/config" && m === "PUT") {
    const b = await body();
    const cur = await getCfg(env);
    const rules = { ...cur.rules };
    for (const k of ["unused_days", "monthly_budget", "min_uses_per_month", "renewal_warning_days"]) if (k in (b.rules || {})) rules[k] = Math.max(0, Number(b.rules[k]) || 0);
    if ("auto_apply" in (b.rules || {})) rules.auto_apply = !!b.rules.auto_apply;
    const rates = {};
    for (const [k, v] of Object.entries(b.rates || cur.rates)) if (/^[A-Z]{3}$/.test(k.toUpperCase()) && Number(v) > 0) rates[k.toUpperCase()] = Number(v);
    const base = /^[A-Z]{3}$/.test(String(b.base_currency || "").toUpperCase()) ? b.base_currency.toUpperCase() : cur.base_currency;
    rates[base] ||= 1;
    await putCfg(env, { base_currency: base, rates, rules });
    return json(await getCfg(env));
  }

  if (p === "/api/check" && m === "POST") {
    const res = await runCheck(env, { apply: url.searchParams.get("apply") === "1" });
    return json({ flagged: res.flagged.map((f) => ({ id: f.s.id, why: f.why, due: f.due })), cancelled: res.cancelled.map((s) => s.id) });
  }
  if (p === "/api/daily" && m === "POST") return json(await daily(env));
  if (p === "/api/sync" && m === "POST") return json({ results: await syncApiCosts(env) });

  // Mac mini 代理程式上傳本機使用紀錄（重複上傳同一天會覆蓋，不會重複計算）
  if (p === "/api/ingest" && m === "POST") {
    const b = await body();
    const source = /^[a-z0-9-]{1,40}$/.test(b.source || "") ? b.source : "agent";
    const known = new Set((await env.DB.prepare("SELECT id FROM subs").all()).results.map((r) => r.id));
    const rows = (b.usage || []).slice(0, 5000);
    const stmts = [], skipped = new Set();
    for (const u of rows) {
      if (!known.has(u.sub_id)) { skipped.add(u.sub_id); continue; }
      if (!DATE_RE.test(u.date || "")) continue;
      stmts.push(usageStmt(env, u.sub_id, u.date, source, u, "replace"));
    }
    for (let i = 0; i < stmts.length; i += 100) await env.DB.batch(stmts.slice(i, i + 100));
    await putMeta(env, "agent", { source, host: String(b.host || "").slice(0, 80), version: String(b.version || "").slice(0, 20), at: nowIso(), rows: stmts.length });
    if (skipped.size) await logEvent(env, "ingest", `${source} 上傳了未建立的訂閱：${[...skipped].join(", ")}（請先在網頁新增，或修改 Mac mini 的對應設定）`);
    return json({ ok: true, written: stmts.length, skipped: [...skipped] });
  }

  if (seg[0] === "backups") {
    if (seg.length === 1 && m === "GET") return json((await env.DB.prepare("SELECT id,name,created_at,size,source FROM backups ORDER BY created_at DESC").all()).results);
    if (seg.length === 1 && m === "POST") {
      const len = Number(request.headers.get("content-length") || 0);
      if (len > 50 * 1024 * 1024) return fail(413, "備份檔超過 50 MB");
      const data = await request.arrayBuffer();
      if (data.byteLength < 22 || new Uint8Array(data, 0, 2)[0] !== 0x50) return fail(400, "請上傳 zip 檔");
      const id = `${new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`;
      const key = `backups/${id}.zip`;
      await env.BACKUPS.put(key, data, { httpMetadata: { contentType: "application/zip" } });
      const name = (url.searchParams.get("name") || `備份 ${iso(today(env))}`).slice(0, 120);
      const source = (url.searchParams.get("source") || "web").slice(0, 40);
      await env.DB.prepare("INSERT INTO backups(id,name,created_at,size,source,r2_key) VALUES(?1,?2,?3,?4,?5,?6)")
        .bind(id, name, nowIso(), data.byteLength, source, key).run();
      // 保留最新 N 份
      const keep = Number(url.searchParams.get("keep_last") || 0);
      if (keep > 0) {
        const old = (await env.DB.prepare("SELECT id,r2_key FROM backups WHERE source=?1 ORDER BY created_at DESC LIMIT -1 OFFSET ?2").bind(source, keep).all()).results;
        for (const o of old) { await env.BACKUPS.delete(o.r2_key); await env.DB.prepare("DELETE FROM backups WHERE id=?1").bind(o.id).run(); }
      }
      await logEvent(env, "backup", `新增備份 ${name}（${Math.round(data.byteLength / 1024)} KB，來源 ${source}）`);
      return json({ id, name }, 201);
    }
    const row = seg[1] && await env.DB.prepare("SELECT * FROM backups WHERE id=?1").bind(seg[1]).first();
    if (!row) return fail(404, "找不到這份備份");
    if (m === "GET") {
      const obj = await env.BACKUPS.get(row.r2_key);
      if (!obj) return fail(404, "備份檔已不存在");
      return new Response(obj.body, { headers: { "content-type": "application/zip",
        "content-disposition": `attachment; filename="ai-env-${row.id}.zip"`, "cache-control": "no-store" } });
    }
    if (m === "DELETE") {
      await env.BACKUPS.delete(row.r2_key);
      await env.DB.prepare("DELETE FROM backups WHERE id=?1").bind(row.id).run();
      return json({ ok: true });
    }
  }

  if (p === "/api/export" && m === "GET") {
    const t = today(env);
    const cfg = await getCfg(env);
    const subs = await loadSubs(env, t);
    return json({ version: 1, base_currency: cfg.base_currency, rates: cfg.rates,
      rules: (({ auto_apply, ...r }) => r)(cfg.rules), subscriptions: subs, log: [] });
  }
  if (p === "/api/import" && m === "POST") {
    const b = await body();
    if (!Array.isArray(b.subscriptions)) return fail(400, "格式不符：缺少 subscriptions");
    const stmts = [env.DB.prepare("DELETE FROM subs"), env.DB.prepare("DELETE FROM usage")];
    const taken = new Set();
    for (const raw of b.subscriptions.slice(0, 500)) {
      const id = raw.id && ID_RE.test(raw.id) && !taken.has(raw.id) ? raw.id : slug(raw.name || "sub", taken);
      taken.add(id);
      const clean = cleanSub(raw);
      clean.created ||= clean.start_date || iso(today(env));
      stmts.push(env.DB.prepare("INSERT INTO subs(id,data,updated_at) VALUES(?1,?2,?3)").bind(id, JSON.stringify(clean), nowIso()));
      for (const u of (raw.usage || []).slice(-USAGE_DAYS)) if (DATE_RE.test(u.date || ""))
        stmts.push(usageStmt(env, id, u.date, "manual", { count: u.count ?? 1, cost: u.cost, tokens: u.tokens, note: u.note }, "add"));
    }
    for (let i = 0; i < stmts.length; i += 100) await env.DB.batch(stmts.slice(i, i + 100));
    await putCfg(env, { base_currency: b.base_currency, rates: b.rates, rules: { ...(await getCfg(env)).rules, ...(b.rules || {}) } });
    await logEvent(env, "import", `匯入 ${taken.size} 筆訂閱`);
    return json({ ok: true, count: taken.size });
  }

  return fail(404, "沒有這個 API");
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const user = await verifyAccess(request, env).catch(() => null);
    if (!user) return new Response("需要透過 Cloudflare Access 登入。若你是管理者，請確認 ACCESS_TEAM_DOMAIN 與 ACCESS_AUD 已設定。", {
      status: 403, headers: { "content-type": "text/plain; charset=utf-8" } });
    if (url.pathname.startsWith("/api/")) {
      try { return await api(request, env, url, user); }
      catch (e) { console.error(e); return fail(500, "伺服器錯誤：" + e.message); }
    }
    const res = await env.ASSETS.fetch(request);
    const h = new Headers(res.headers);
    h.set("content-security-policy", "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-ancestors 'none'");
    h.set("x-content-type-options", "nosniff");
    h.set("referrer-policy", "same-origin");
    return new Response(res.body, { status: res.status, headers: h });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(daily(env));
  },

  async email(message, env, ctx) {
    await handleEmail(message, env);
  },
};
