import { NextResponse } from 'next/server';
import { getApprovedAdmin } from '@/lib/auth/authorization';

export const runtime = 'nodejs';
const statuses = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function authFailure(auth) {
  const status = auth.reason === 'missing_config' || auth.reason === 'service_unavailable' ? 503 : auth.reason === 'forbidden' ? 403 : 401;
  const message = auth.reason === 'missing_config' ? 'Supabase is not configured.' : auth.reason === 'service_unavailable' ? 'The admin service is temporarily unavailable.' : 'You are not authorized.';
  return NextResponse.json({ error: { code: auth.reason, message } }, { status });
}

export async function GET(request, { params }) {
  const { id } = await params;
  const auth = await getApprovedAdmin();
  if (!auth.ok) return authFailure(auth);
  if (!uuidPattern.test(id)) return NextResponse.json({ error: { code: 'invalid_id', message: 'Invalid enquiry id.' } }, { status: 400 });
  const { data, error } = await auth.supabase.from('leads').select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: { code: 'query_failed', message: 'Unable to load this enquiry.' } }, { status: 503 });
  if (!data) return NextResponse.json({ error: { code: 'not_found', message: 'Enquiry not found.' } }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const auth = await getApprovedAdmin();
  if (!auth.ok) return authFailure(auth);
  if (!uuidPattern.test(id)) return NextResponse.json({ error: { code: 'invalid_id', message: 'Invalid enquiry id.' } }, { status: 400 });
  const contentType = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') return NextResponse.json({ error: { code: 'invalid_content_type', message: 'JSON is required.' } }, { status: 415 });
  const rawLength = request.headers.get('content-length');
  const length = Number(rawLength || 0);
  if (rawLength && (!Number.isFinite(length) || length < 0)) return NextResponse.json({ error: { code: 'invalid_content_length', message: 'Invalid request size.' } }, { status: 400 });
  if (length > 8000) return NextResponse.json({ error: { code: 'payload_too_large', message: 'This update is too large.' } }, { status: 413 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: { code: 'invalid_json', message: 'Invalid update.' } }, { status: 400 }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: { code: 'invalid_payload', message: 'Invalid update.' } }, { status: 400 });
  const update = {};
  if (Object.prototype.hasOwnProperty.call(body, 'status')) { if (!statuses.includes(body.status)) return NextResponse.json({ error: { code: 'invalid_status', message: 'Invalid lead status.' } }, { status: 400 }); update.status = body.status; }
  if (Object.prototype.hasOwnProperty.call(body, 'internal_notes')) { if (typeof body.internal_notes !== 'string' || body.internal_notes.length > 5000) return NextResponse.json({ error: { code: 'invalid_notes', message: 'Notes are too long.' } }, { status: 400 }); update.internal_notes = body.internal_notes; }
  if (!Object.keys(update).length) return NextResponse.json({ error: { code: 'empty_update', message: 'Nothing to update.' } }, { status: 400 });
  const { data, error } = await auth.supabase.from('leads').update(update).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: { code: 'update_failed', message: 'Unable to update this enquiry.' } }, { status: 503 });
  return NextResponse.json({ data });
}
