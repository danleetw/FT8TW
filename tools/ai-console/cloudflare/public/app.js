import { PRESETS, withDefaults, evaluate, nextRenewal, monthlyCost, uses30, lastUsed, iso, parse, days } from "./logic.js";

const CYCLE_LABEL = { monthly: "月", quarterly: "季", yearly: "年", usage: "用量" };
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let state = null;           // /api/state 的回應
let cfg = withDefaults();
let subs = [];
let today = parse(new Date().toISOString());

// ---------------------------------------------------------------- 連線

async function api(path, opts = {}) {
  const res = await fetch(path, { credentials: "same-origin", ...opts,
    headers: opts.body && !(opts.body instanceof Blob) && typeof opts.body === "string" ? { "content-type": "application/json", ...(opts.headers || {}) } : opts.headers });
  if (res.status === 403) throw new Error("登入已過期，請重新整理頁面");
  const data = res.headers.get("content-type")?.includes("json") ? await res.json() : null;
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}
async function refresh() {
  try {
    state = await api("/api/state");
    cfg = withDefaults(state.cfg);
    subs = state.subs;
    today = parse(state.today);
    $("#sync").textContent = `已同步 · ${state.user}`;
    render();
  } catch (e) {
    $("#sync").textContent = "連線失敗";
    showBanner(esc(e.message), true);
  }
}
async function act(fn, okMsg) {
  try { await fn(); if (okMsg) toast(okMsg); await refresh(); return true; }
  catch (e) { toast("失敗：" + e.message); return false; }
}
const post = (path, body) => api(path, { method: "POST", body: JSON.stringify(body ?? {}) });

// ---------------------------------------------------------------- 畫面

const fmt = (v, cur = cfg.base_currency) => `${v.toLocaleString("zh-TW", { maximumFractionDigits: v < 100 ? 2 : 0 })} ${cur}`;
const active = () => subs.filter((s) => s.status === "active");
const timeStr = (s) => (s || "").replace("T", " ").slice(0, 16);

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 2600);
}
function showBanner(htmlMsg, bad) {
  const b = $("#banner"); b.className = "notice" + (bad ? " bad" : "");
  b.innerHTML = htmlMsg + ' <button style="margin-left:8px;padding:1px 8px" id="banner-x">知道了</button>'; b.hidden = false;
  $("#banner-x").onclick = () => (b.hidden = true);
}
function showTab(name) {
  if (!["subs", "rules", "backup", "data"].includes(name)) name = "subs";
  document.querySelectorAll("nav button").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === name));
  document.querySelectorAll("section[id^=tab-]").forEach((s) => (s.hidden = s.id !== "tab-" + name));
}
document.querySelectorAll("nav button").forEach((b) => b.addEventListener("click", () => { showTab(b.dataset.tab); location.hash = b.dataset.tab; }));
window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));
showTab(location.hash.slice(1));

function render() {
  const act_ = active();
  const total = act_.reduce((a, s) => a + monthlyCost(s, cfg, today), 0);
  const flagged = evaluate(subs, cfg, today);
  const flaggedIds = new Map(flagged.map((f) => [f.s.id, f]));
  $("#s-count").textContent = act_.length;
  $("#s-month").textContent = fmt(total);
  $("#s-year").textContent = fmt(total * 12);
  const b = cfg.rules.monthly_budget;
  $("#s-budget").textContent = b ? fmt(b) : "未設定";
  $("#s-bar").hidden = !b;
  if (b) { const i = $("#s-bar i"); i.style.width = Math.min(total / b * 100, 100) + "%"; i.classList.toggle("over", total > b); }
  $("#s-flag").textContent = flagged.length;
  $("#tab-badge").hidden = !flagged.length; $("#tab-badge").textContent = flagged.length;

  // 訂閱表
  const list = $("#show-all").checked ? subs : act_;
  const sorted = [...list].sort((a, b) => (a.status !== "active") - (b.status !== "active") || monthlyCost(b, cfg, today) - monthlyCost(a, cfg, today));
  if (!sorted.length) {
    $("#subs-list").innerHTML = `<div class="empty">還沒有訂閱。按右上角「＋ 新增訂閱」，選常用服務並輸入你實際付的價格。</div>`;
  } else {
    $("#subs-list").innerHTML = `<div class="tablewrap"><table><thead><tr>
      <th>服務</th><th>價格</th><th class="r">月費 ${esc(cfg.base_currency)}</th><th>下次續約</th>
      <th class="r">近 30 天</th><th>最後使用</th><th>狀態</th><th>操作</th></tr></thead><tbody>${sorted.map((s) => {
        const nr = s.status === "active" ? nextRenewal(s, today) : null;
        const lu = lastUsed(s), f = flaggedIds.get(s.id);
        const price = s.cycle === "usage" ? "用量計費" : `${s.price} ${esc(s.currency)} / ${CYCLE_LABEL[s.cycle]}`;
        const st = s.status !== "active" ? `<span class="pill off">${s.status === "cancelled" ? "已取消 " + esc(s.cancelled_date || "") : "暫停"}</span>`
          : f ? `<span class="pill warn">建議取消</span>` : `<span class="pill ok">使用中</span>`;
        const soon = nr && days(today, nr) <= 7 ? ` <small>（${days(today, nr)} 天後）</small>` : "";
        const charge = s.last_charge ? `<br><small>上次扣款 ${esc(s.last_charge.date)} ${esc(s.last_charge.amount)} ${esc(s.last_charge.currency)}</small>` : "";
        return `<tr class="${s.status !== "active" ? "off" : ""}">
          <td><b>${esc(s.name)}</b>${s.keep ? ' <span class="pill lock">鎖定</span>' : ""}<br><small>${esc([s.vendor, s.plan, s.account].filter(Boolean).join(" · "))}</small></td>
          <td class="num">${price}${charge}</td>
          <td class="r num">${Math.round(monthlyCost(s, cfg, today)).toLocaleString("zh-TW")}</td>
          <td class="num">${nr ? iso(nr) + soon : "—"}</td>
          <td class="r num">${uses30(s, today)}</td>
          <td class="num">${lu ? iso(lu) : "—"}</td>
          <td>${st}</td>
          <td><div class="acts">
            ${s.status === "active" ? (s.cycle === "usage" ? `<button data-act="cost" data-id="${esc(s.id)}">記花費</button>` : `<button data-act="use" data-id="${esc(s.id)}">＋1</button>`) : ""}
            <button data-act="edit" data-id="${esc(s.id)}">編輯</button>
            ${s.status === "active" ? `<button data-act="cancel" data-id="${esc(s.id)}" class="danger">取消</button>` : `<button data-act="reactivate" data-id="${esc(s.id)}">恢復</button>`}
            ${s.manage_url ? `<a class="btn" href="${esc(s.manage_url)}" target="_blank" rel="noopener">管理頁</a>` : ""}
          </div></td></tr>`;
      }).join("")}</tbody></table></div>`;
  }

  // 建議取消
  $("#sugg").innerHTML = flagged.length ? flagged.map(({ s, why, due, nr }) => `
    <div class="item ${due ? "due" : ""}">
      <div class="row between"><b>${esc(s.name)}</b><span class="pill ${due ? "warn" : "off"}">${due ? "現在可取消" : `續約前處理（${iso(nr)}）`}</span></div>
      <ul>${why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
      <div class="acts">
        <button data-act="cancel" data-id="${esc(s.id)}" class="danger">標記取消</button>
        <button data-act="keep" data-id="${esc(s.id)}">鎖定保留</button>
        ${s.manage_url ? `<a class="btn" href="${esc(s.manage_url)}" target="_blank" rel="noopener">前往取消頁</a>` : ""}
      </div></div>`).join("") : `<div class="empty">目前沒有需要取消的訂閱。</div>`;

  // 規則與匯率表單（正在輸入時不覆蓋）
  const r = cfg.rules;
  for (const [id, k] of [["#r-unused", "unused_days"], ["#r-minuses", "min_uses_per_month"], ["#r-budget", "monthly_budget"], ["#r-warn", "renewal_warning_days"]])
    if (document.activeElement !== $(id)) $(id).value = r[k];
  $("#r-auto").checked = !!r.auto_apply;
  if (document.activeElement !== $("#d-base")) $("#d-base").value = cfg.base_currency;
  if (document.activeElement !== $("#d-rates")) $("#d-rates").value = Object.entries(cfg.rates).map(([k, v]) => `${k}=${v}`).join("\n");

  // 備份
  const bk = state.backups || [];
  $("#b-list").innerHTML = bk.length ? `<div class="tablewrap"><table style="min-width:560px"><thead><tr><th>名稱</th><th>建立時間</th><th class="r">大小</th><th>來源</th><th>操作</th></tr></thead><tbody>${
    bk.map((b) => `<tr><td><b>${esc(b.name)}</b></td><td class="num">${esc(timeStr(b.created_at))}</td>
      <td class="r num">${Math.max(1, Math.round(b.size / 1024)).toLocaleString()} KB</td><td><span class="tag">${esc(b.source)}</span></td>
      <td><div class="acts"><a class="btn" href="/api/backups/${encodeURIComponent(b.id)}">下載</a>
      <button data-act="delbackup" data-id="${esc(b.id)}" class="danger">刪除</button></div></td></tr>`).join("")}</tbody></table></div>`
    : `<div class="empty">還沒有備份。設定好 Mac mini 後每天會自動上傳一份。</div>`;

  // 同步狀態
  const ag = state.agent;
  const agentLine = ag ? `Mac mini（${esc(ag.host || ag.source)}）最後上傳：${esc(timeStr(ag.at))}，${ag.rows} 筆`
    + (days(parse(ag.at), today) >= 2 ? ' <span class="pill warn">超過 2 天沒上傳</span>' : "")
    : "Mac mini 尚未上傳過資料";
  const yes = (b) => (b ? '<span class="pill ok">已設定</span>' : '<span class="pill off">未設定</span>');
  $("#sync-status").innerHTML = `<div>${agentLine}</div>
    <div>Claude API 費用 ${yes(state.sync.anthropic)}　OpenAI API 費用 ${yes(state.sync.openai)}</div>
    <div>Telegram 通知 ${yes(state.notify.telegram)}　Email 通知 ${yes(state.notify.email)}</div>`;

  // 收據
  const rc = state.receipts || [];
  const stLabel = { matched: "已對應", created: "已建立訂閱", unparsed: "無法判讀" };
  $("#receipts").innerHTML = rc.length ? `<div class="tablewrap"><table style="min-width:560px"><thead><tr><th>收到時間</th><th>服務</th><th class="r">金額</th><th>主旨</th><th>結果</th></tr></thead><tbody>${
    rc.map((x) => `<tr><td class="num">${esc(timeStr(x.received_at))}</td><td>${esc(x.vendor || "—")}</td>
      <td class="r num">${x.amount != null ? esc(x.amount) + " " + esc(x.currency) : "—"}</td><td>${esc(x.subject)}<br><small>${esc(x.sender)}</small></td>
      <td><span class="pill ${x.status === "unparsed" ? "warn" : "ok"}">${stLabel[x.status] || esc(x.status)}</span></td></tr>`).join("")}</tbody></table></div>`
    : `<div class="empty">還沒收到收據。</div>`;

  // 活動紀錄
  const ev = state.events || [];
  $("#events").innerHTML = ev.length ? ev.map((e) => `<div><span class="mut">${esc(timeStr(e.time))}</span><span>${esc(e.msg)}</span></div>`).join("") : `<div class="mut">尚無紀錄</div>`;
}

// ---------------------------------------------------------------- 操作

const findSub = (id) => subs.find((x) => x.id === id);
function confirmClick(btn, label) {
  if (btn.dataset.confirm === "1") return true;
  const orig = btn.textContent;
  btn.dataset.confirm = "1"; btn.textContent = label;
  setTimeout(() => { btn.dataset.confirm = ""; btn.textContent = orig; }, 3000);
  return false;
}

document.addEventListener("click", async (ev) => {
  const btn = ev.target.closest("button[data-act]"); if (!btn) return;
  const id = btn.dataset.id, s = findSub(id), a = btn.dataset.act;
  if (a === "use") act(() => post(`/api/subs/${encodeURIComponent(id)}/use`, { count: 1 }), `${s.name}：已記錄一次使用`);
  if (a === "cost") openCost(s);
  if (a === "edit") openForm(s);
  if (a === "keep") act(() => api(`/api/subs/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ keep: true }) }), `${s.name} 已鎖定`);
  if (a === "reactivate") act(() => api(`/api/subs/${encodeURIComponent(id)}`, { method: "PATCH",
    body: JSON.stringify({ status: "active", cancelled_date: null, cancel_reason: null }) }), `${s.name} 已恢復為使用中`);
  if (a === "cancel") {
    if (!confirmClick(btn, "確定取消？")) return;
    const f = evaluate(subs, cfg, today).find((x) => x.s.id === id);
    if (await act(() => post(`/api/subs/${encodeURIComponent(id)}/cancel`, { reason: f ? f.why.join("；") : "手動取消" })))
      showBanner(`已標記取消 ${esc(s.name)}。${s.manage_url ? `請到 <a href="${esc(s.manage_url)}" target="_blank" rel="noopener">${esc(s.name)} 的帳單頁</a> 按下取消按鈕，才會真正停止扣款。` : "請到該服務網站完成取消。"}`);
  }
  if (a === "delbackup") {
    if (!confirmClick(btn, "確定刪除？")) return;
    act(() => api(`/api/backups/${encodeURIComponent(id)}`, { method: "DELETE" }), "已刪除備份");
  }
});
$("#show-all").addEventListener("change", render);

// 新增 / 編輯
const dlg = $("#dlg"); let editing = null;
for (const [k, [n]] of Object.entries(PRESETS)) $("#f-preset").insertAdjacentHTML("beforeend", `<option value="${k}">${esc(n)}</option>`);
$("#f-preset").addEventListener("change", (e) => {
  const p = PRESETS[e.target.value]; if (!p) return;
  $("#f-name").value = p[0]; $("#f-vendor").value = p[1]; $("#f-url").value = p[2];
  if (e.target.value.endsWith("-api")) $("#f-cycle").value = "usage";
});
const FIELDS = { name: "#f-name", vendor: "#f-vendor", plan: "#f-plan", cycle: "#f-cycle", currency: "#f-currency", start_date: "#f-start",
  cancel_on: "#f-cancelon", account: "#f-account", payment: "#f-payment", manage_url: "#f-url", notes: "#f-notes" };
function openForm(s) {
  editing = s || null;
  $("#f-title").textContent = s ? `編輯 ${s.name}` : "新增訂閱";
  $("#f-preset").value = ""; $("#f-preset-wrap").hidden = !!s;
  for (const [k, sel] of Object.entries(FIELDS)) $(sel).value = s ? (s[k] ?? "") : "";
  $("#f-cycle").value = s?.cycle || "monthly"; $("#f-currency").value = s?.currency || "USD";
  $("#f-start").value = s?.start_date || iso(today);
  $("#f-price").value = s?.price ?? 0; $("#f-keep").checked = !!s?.keep;
  $("#f-delete").hidden = !s; $("#f-delete").textContent = "刪除紀錄"; $("#f-delete").dataset.confirm = "";
  dlg.showModal();
}
$("#btn-add").addEventListener("click", () => openForm());
$("#f-delete").addEventListener("click", async (e) => {
  if (!confirmClick(e.currentTarget, "確定刪除？（不會取消實際訂閱）")) return;
  if (await act(() => api(`/api/subs/${encodeURIComponent(editing.id)}`, { method: "DELETE" }), `已刪除 ${editing.name} 的紀錄`)) dlg.close();
});
dlg.addEventListener("close", () => {
  if (dlg.returnValue !== "ok") return;
  const data = {};
  for (const [k, sel] of Object.entries(FIELDS)) data[k] = $(sel).value.trim();
  data.price = +$("#f-price").value || 0; data.keep = $("#f-keep").checked;
  if (!data.cancel_on) data.cancel_on = null;
  if (editing) act(() => api(`/api/subs/${encodeURIComponent(editing.id)}`, { method: "PATCH", body: JSON.stringify(data) }), `已更新 ${data.name}`);
  else act(() => post("/api/subs", { id: $("#f-preset").value || undefined, ...data, status: "active" }), `已新增 ${data.name}`);
});

// 記花費
const dlgCost = $("#dlg-cost"); let costFor = null;
function openCost(s) { costFor = s; $("#c-amt").value = ""; $("#c-date").value = iso(today); $("#c-note").value = ""; dlgCost.showModal(); }
dlgCost.addEventListener("close", () => {
  if (dlgCost.returnValue !== "ok" || !costFor) return;
  const body = { date: $("#c-date").value || iso(today), count: 1, cost: +$("#c-amt").value || 0, note: $("#c-note").value.trim() || undefined };
  act(() => post(`/api/subs/${encodeURIComponent(costFor.id)}/use`, body), `${costFor.name}：已記錄 ${body.cost} ${costFor.currency}`);
});

// 規則、匯率
$("#btn-save-rules").addEventListener("click", () => act(() => api("/api/config", { method: "PUT", body: JSON.stringify({ rules: {
  unused_days: +$("#r-unused").value || 0, min_uses_per_month: +$("#r-minuses").value || 0, monthly_budget: +$("#r-budget").value || 0,
  renewal_warning_days: +$("#r-warn").value || 0, auto_apply: $("#r-auto").checked } }) }), "規則已儲存"));
$("#btn-save-rates").addEventListener("click", () => {
  const rates = {};
  for (const line of $("#d-rates").value.split(/\n|,/)) { const [k, v] = line.split("="); if (k && v && isFinite(+v)) rates[k.trim().toUpperCase()] = +v; }
  act(() => api("/api/config", { method: "PUT", body: JSON.stringify({ base_currency: $("#d-base").value.trim(), rates }) }), "匯率已儲存");
});
$("#btn-sync").addEventListener("click", () => act(async () => {
  const r = await post("/api/sync");
  toast(r.results.length ? r.results.join("；") : "尚未設定任何 Admin key");
}));
$("#btn-daily").addEventListener("click", () => act(async () => {
  const r = await post("/api/daily");
  toast(`建議取消 ${r.flagged} 項${r.sent.length ? "，已通知 " + r.sent.join("、") : r.text ? "（未設定通知管道）" : "，沒有需要通知的事"}`);
}));

// 備份上傳
$("#btn-backup").addEventListener("click", async () => {
  const f = $("#b-file").files[0];
  if (!f) { $("#b-msg").textContent = "請先選擇 zip 檔"; return; }
  $("#b-msg").textContent = "上傳中…";
  const name = $("#b-name").value.trim();
  const ok = await act(() => api(`/api/backups?source=web${name ? "&name=" + encodeURIComponent(name) : ""}`, { method: "POST", body: f }), "已上傳備份");
  $("#b-msg").textContent = ok ? "" : "上傳失敗";
  if (ok) { $("#b-file").value = ""; $("#b-name").value = ""; }
});

// 匯入
$("#d-import").addEventListener("change", async (e) => {
  const file = e.target.files[0]; e.target.value = ""; if (!file) return;
  let data; try { data = JSON.parse(await file.text()); } catch { toast("這不是有效的 JSON 檔"); return; }
  if (!Array.isArray(data.subscriptions)) { toast("格式不符：缺少 subscriptions"); return; }
  const box = $("#import-confirm");
  box.innerHTML = `「${esc(file.name)}」有 ${data.subscriptions.length} 筆訂閱。匯入會<b>取代</b>目前的 ${subs.length} 筆訂閱與使用紀錄。
    <div class="row" style="margin-top:8px"><button class="primary" id="imp-ok">取代並匯入</button><button id="imp-no">不要</button></div>`;
  box.hidden = false;
  $("#imp-no").onclick = () => (box.hidden = true);
  $("#imp-ok").onclick = () => { box.hidden = true; act(() => post("/api/import", data), `已匯入 ${data.subscriptions.length} 筆訂閱`); };
});

refresh();
