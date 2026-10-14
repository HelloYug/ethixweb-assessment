import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation/lead';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { consumeLeadRateLimit, getRequestIp } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';

export async function POST(request) {
  const contentType = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') return NextResponse.json({ error: { code: 'invalid_content_type', message: 'JSON is required.' } }, { status: 415 });
  const rawLength = request.headers.get('content-length');
  const length = Number(rawLength || 0);
  if (rawLength && (!Number.isFinite(length) || length < 0)) return NextResponse.json({ error: { code: 'invalid_content_length', message: 'Invalid request size.' } }, { status: 400 });
  if (length > 12000) return NextResponse.json({ error: { code: 'payload_too_large', message: 'This enquiry is too large.' } }, { status: 413 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: { code: 'invalid_json', message: 'Please send a valid enquiry.' } }, { status: 400 }); }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: { code: 'validation_error', message: 'Please check the highlighted fields.' }, fieldErrors }, { status: 400 });
  }
  const value = parsed.data;
  if (value.honeypot) return NextResponse.json({ error: { code: 'invalid_submission', message: 'Unable to process this enquiry.' } }, { status: 400 });
  const ip = getRequestIp(request);
  const turnstile = await verifyTurnstile(value.turnstileToken, ip);
  if (!turnstile.ok) {
    const userActionNeeded = turnstile.reason === 'missing_token' || turnstile.reason === 'rejected';
    const message = turnstile.reason === 'not_configured'
      ? 'Spam protection is not configured yet. Please try again after deployment setup.'
      : turnstile.reason === 'unavailable'
        ? 'Spam protection is temporarily unavailable. Please try again.'
        : 'Please complete the spam check and try again.';
    return NextResponse.json({ error: { code: userActionNeeded ? 'spam_check_failed' : 'spam_protection_unavailable', message } }, { status: userActionNeeded ? 400 : 503 });
  }
  const rate = await consumeLeadRateLimit(ip);
  if (!rate.ok) return NextResponse.json({ error: { code: rate.reason === 'limited' ? 'rate_limited' : 'rate_limit_unavailable', message: rate.reason === 'limited' ? 'Too many attempts. Please try again later.' : 'Rate limiting is not configured yet.' } }, { status: rate.reason === 'limited' ? 429 : 503, headers: rate.reason === 'limited' ? { 'Retry-After': '900' } : undefined });
  const supabase = createAdminClient();
  if (!supabase) return NextResponse.json({ error: { code: 'server_not_configured', message: 'The enquiry service is not configured yet.' } }, { status: 503 });
  const { data, error } = await supabase.from('leads').insert({ name: value.name, email: value.email, phone: value.phone || null, company: value.company || null, website: value.website || null, service: value.service, message: value.message, consent: true, source_page: value.sourcePage || '/contact', status: 'new' }).select('id, status').single();
  if (error) { console.error('lead_insert_failed', error.code); return NextResponse.json({ error: { code: 'insert_failed', message: 'We could not save this enquiry. Please try again.' } }, { status: 503 }); }
  return NextResponse.json({ data: { id: data.id, status: data.status } }, { status: 201 });
}
