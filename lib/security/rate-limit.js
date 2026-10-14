import crypto from 'node:crypto';
import { isIP } from 'node:net';
import { createAdminClient } from '@/lib/supabase/admin';

export async function consumeLeadRateLimit(ip) {
  const secret = process.env.RATE_LIMIT_HMAC_SECRET;
  const supabase = createAdminClient();
  if (!secret || !supabase) return { ok: false, reason: 'not_configured' };
  const keyHash = crypto.createHmac('sha256', secret).update(ip || 'unknown').digest('hex');
  const { data, error } = await supabase.rpc('consume_lead_rate_limit', { p_key_hash: keyHash, p_limit: 5, p_window_seconds: 900 });
  if (error) return { ok: false, reason: 'unavailable', error };
  return { ok: data === true, reason: data === true ? undefined : 'limited' };
}

export function getRequestIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',').map((value) => value.trim()).reverse() || [];
  const candidates = [
    request.headers.get('x-nf-client-connection-ip'),
    request.headers.get('cf-connecting-ip'),
    request.headers.get('x-vercel-forwarded-for'),
    request.headers.get('x-real-ip'),
    ...forwarded,
  ];
  return candidates.find((value) => value && isIP(value.trim()))?.trim() || 'unknown';
}
