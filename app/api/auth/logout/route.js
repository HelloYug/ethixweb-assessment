import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) await supabase.auth.signOut();
  } catch {
    // Logout remains idempotent even if the auth service is unavailable.
  }
  return NextResponse.json({ data: { ok: true } });
}
