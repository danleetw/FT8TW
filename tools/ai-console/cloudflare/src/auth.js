// 驗證 Cloudflare Access 簽發的 JWT（Cf-Access-Jwt-Assertion）。
// 即使 Access 已擋在前面，Worker 仍自行驗證，避免有人繞過 Access 直接打到 Worker。

let certCache = { at: 0, keys: [] };

const b64urlToBytes = (s) => {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(s + "=".repeat((4 - (s.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64urlJson = (s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

async function getKeys(team, force = false) {
  if (!force && certCache.keys.length && Date.now() - certCache.at < 3600_000) return certCache.keys;
  const res = await fetch(`${team}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`無法取得 Access 憑證：HTTP ${res.status}`);
  const body = await res.json();
  certCache = { at: Date.now(), keys: body.keys || [] };
  return certCache.keys;
}

/** 回傳 {email} 表示已登入；回傳 null 表示未通過驗證。 */
export async function verifyAccess(request, env) {
  if (env.ALLOW_INSECURE_DEV === "1") return { email: "dev@localhost", dev: true };
  const team = (env.ACCESS_TEAM_DOMAIN || "").replace(/\/$/, "");
  const aud = env.ACCESS_AUD || "";
  if (!team || !aud || team.includes("REPLACE") || aud.includes("REPLACE")) return null;
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  let header, payload;
  try { header = b64urlJson(parts[0]); payload = b64urlJson(parts[1]); } catch { return null; }
  if (header.alg !== "RS256") return null;

  let keys = await getKeys(team);
  let jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) { keys = await getKeys(team, true); jwk = keys.find((k) => k.kid === header.kid); }
  if (!jwk) return null;

  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!ok) return null;

  const now = Math.floor(Date.now() / 1000);
  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud)) return null;
  if (payload.exp && payload.exp < now) return null;
  if (payload.nbf && payload.nbf > now + 60) return null;
  if (payload.iss && payload.iss !== team) return null;
  return { email: payload.email || payload.common_name || "service-token" };
}
