export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, reason: 'not_configured' };
  if (!token) return { ok: false, reason: 'missing_token' };
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body, cache: 'no-store' });
    const result = await response.json();
    return { ok: Boolean(result.success), reason: result.success ? undefined : 'rejected' };
  } catch { return { ok: false, reason: 'unavailable' }; }
}
