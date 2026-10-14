import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function getSupabaseConfig() {
  return { url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY };
}

export async function createServerSupabaseClient() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  const cookieStore = await cookies();
  return createServerClient(url, key, { cookies: { getAll: () => cookieStore.getAll(), setAll: (items) => items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } });
}
