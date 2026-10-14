import { createServerSupabaseClient, getSupabaseConfig } from '@/lib/supabase/server';

export async function getApprovedAdmin() {
  try {
    const { url, key } = getSupabaseConfig();
    if (!url || !key) return { ok: false, reason: 'missing_config' };
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { ok: false, reason: 'missing_config' };
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { ok: false, reason: 'unauthorized' };
    const { data: admin, error: adminError } = await supabase.from('admin_users').select('user_id, role, is_active').eq('user_id', user.id).eq('is_active', true).maybeSingle();
    if (adminError) return { ok: false, reason: 'service_unavailable' };
    if (!admin) return { ok: false, reason: 'forbidden', user, supabase };
    return { ok: true, user, admin, supabase };
  } catch {
    return { ok: false, reason: 'service_unavailable' };
  }
}
