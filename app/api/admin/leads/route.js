import { NextResponse } from 'next/server';
import { getApprovedAdmin } from '@/lib/auth/authorization';

export const runtime = 'nodejs';
const statuses = new Set(['new', 'contacted', 'qualified', 'won', 'lost', 'spam']);

function authFailure(auth) {
  const status = auth.reason === 'missing_config' || auth.reason === 'service_unavailable' ? 503 : auth.reason === 'forbidden' ? 403 : 401;
  const message = auth.reason === 'missing_config' ? 'Supabase is not configured.' : auth.reason === 'service_unavailable' ? 'The admin service is temporarily unavailable.' : 'You are not authorized.';
  return NextResponse.json({ error: { code: auth.reason, message } }, { status });
}

function parsePageValue(value, fallback, maximum) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? Math.min(maximum, Math.max(1, parsed)) : fallback;
}

export async function GET(request) {
  const auth = await getApprovedAdmin();
  if (!auth.ok) return authFailure(auth);
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get('search') || '').trim().slice(0, 100).replace(/[^\p{L}\p{N}\s@+-]/gu, ' ').replace(/\s+/g, ' ').trim();
  const status = searchParams.get('status');
  const page = parsePageValue(searchParams.get('page'), 1, 10000);
  const pageSize = parsePageValue(searchParams.get('pageSize'), 25, 50);
  let query = auth.supabase.from('leads').select('id,name,email,phone,company,service,status,created_at,updated_at', { count: 'exact' }).order('created_at', { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
  if (status && statuses.has(status)) query = query.eq('status', status);
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: { code: 'query_failed', message: 'Unable to load enquiries.' } }, { status: 503 });
  return NextResponse.json({ data: data || [], meta: { count: count || 0, page, pageSize } });
}
