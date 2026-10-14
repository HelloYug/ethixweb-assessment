create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 180),
  phone text null check (phone is null or char_length(phone) between 7 and 30),
  company text null check (company is null or char_length(company) <= 140),
  website text null check (website is null or char_length(website) <= 240),
  service text not null check (service in ('web', 'growth', 'ai', 'crm', 'data', 'accessibility', 'support')),
  message text not null check (char_length(message) between 20 and 3000),
  consent boolean not null check (consent is true),
  source_page text not null default '/contact' check (char_length(source_page) <= 120),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  internal_notes text null check (internal_notes is null or char_length(internal_notes) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rate_limit_buckets (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0 check (attempts >= 0),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_service_idx on public.leads (service);

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid() and is_active = true and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads for each row execute function public.set_updated_at();

create or replace function public.consume_lead_rate_limit(p_key_hash text, p_limit integer default 5, p_window_seconds integer default 900)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  bucket public.rate_limit_buckets;
begin
  insert into public.rate_limit_buckets (key_hash, attempts)
  values (p_key_hash, 1)
  on conflict (key_hash) do nothing;

  select * into bucket from public.rate_limit_buckets where key_hash = p_key_hash for update;
  if not found then
    return true;
  end if;
  if bucket.window_started_at < now() - make_interval(secs => p_window_seconds) then
    update public.rate_limit_buckets set window_started_at = now(), attempts = 1, updated_at = now() where key_hash = p_key_hash;
    return true;
  end if;
  if bucket.attempts >= p_limit then
    update public.rate_limit_buckets set updated_at = now() where key_hash = p_key_hash;
    return false;
  end if;
  update public.rate_limit_buckets set attempts = attempts + 1, updated_at = now() where key_hash = p_key_hash;
  return true;
end;
$$;

alter table public.leads enable row level security;
alter table public.admin_users enable row level security;
alter table public.rate_limit_buckets enable row level security;

drop policy if exists "approved admins can read leads" on public.leads;
create policy "approved admins can read leads" on public.leads for select to authenticated using (public.is_active_admin());

drop policy if exists "approved admins can update leads" on public.leads;
create policy "approved admins can update leads" on public.leads for update to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "admins can read own membership" on public.admin_users;
create policy "admins can read own membership" on public.admin_users for select to authenticated using (user_id = auth.uid() and is_active = true);

revoke all on public.leads from anon;
revoke all on public.leads from authenticated;
grant select on public.leads to authenticated;
grant update (status, internal_notes) on public.leads to authenticated;

revoke all on public.admin_users from anon;
revoke all on public.admin_users from authenticated;
grant select on public.admin_users to authenticated;

revoke all on public.rate_limit_buckets from anon, authenticated;
revoke all on function public.consume_lead_rate_limit(text, integer, integer) from public;
grant execute on function public.consume_lead_rate_limit(text, integer, integer) to service_role;

-- Public insertion is intentionally denied. The server-only service-role client
-- inserts a sanitized payload after validation, Turnstile and rate limiting.
-- To approve an existing Supabase Auth user, run:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
