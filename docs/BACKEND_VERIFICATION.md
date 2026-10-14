# Backend verification checklist

Use this checklist after configuring Supabase, Turnstile and the local environment.

## 1. Install and configure

From `main new website`:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set every value in `.env.local`. Never expose `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY` or `RATE_LIMIT_HMAC_SECRET` through a `NEXT_PUBLIC_` variable.

## 2. Set up Supabase

Run [`supabase/setup.sql`](../supabase/setup.sql) in the Supabase SQL Editor. It creates the tables, constraints, indexes, trigger, rate-limit function, RLS policies and grants.

Then:

1. Create an email/password user under Supabase Auth.
2. Copy the Auth user's UUID.
3. Run `insert into public.admin_users (user_id) values ('AUTH_USER_UUID');` with the real UUID.
4. Create a Turnstile widget for localhost and the deployed hostname.

## 3. Verify the public API

Replace `http://localhost:3000` with the deployed URL when checking production.

```powershell
curl.exe -i -X POST http://localhost:3000/api/leads -H "Content-Type: text/plain" --data "{}"
```

Expected: `415`.

```powershell
curl.exe -i -X POST http://localhost:3000/api/leads -H "Content-Type: application/json" --data "{"
```

Expected: `400`.

```powershell
curl.exe -i -X POST http://localhost:3000/api/leads -H "Content-Type: application/json" --data '{"name":"A","email":"bad","service":"invalid","message":"short","consent":false}'
```

Expected: `400` with structured validation errors and no database write.

Submit the real contact form with a valid Turnstile challenge. Expected: `201`, followed by exactly one row in `public.leads` with status `new`.

## 4. Verify the admin flow

1. Open `/admin` while signed out. It must redirect to `/admin/login`.
2. Sign in with the approved Auth user.
3. Confirm the lead list loads and search/status filtering work.
4. Open a lead, change only `status` and `internal_notes`, and save.
5. Confirm `updated_at` changes automatically.
6. Confirm the saved values are visible after refresh.
7. Log out, then confirm `/admin` redirects back to login.

## 5. Verify security boundaries in the SQL Editor

These checks should return `true` or the expected policy rows:

```sql
select relname, relrowsecurity
from pg_class
where relname in ('leads', 'admin_users', 'rate_limit_buckets');

select schemaname, tablename, policyname, cmd
from pg_policies
where tablename in ('leads', 'admin_users', 'rate_limit_buckets')
order by tablename, policyname;

select has_table_privilege('anon', 'public.leads', 'INSERT') as anon_can_insert;
select has_function_privilege('anon', 'public.consume_lead_rate_limit(text,integer,integer)', 'EXECUTE') as anon_can_rate_limit;
```

Expected: RLS is enabled, `anon_can_insert` is `false`, and `anon_can_rate_limit` is `false`.

To test the limiter without touching lead data, use a unique test key in the SQL Editor:

```sql
select public.consume_lead_rate_limit('backend-audit-unique-key', 2, 900);
select public.consume_lead_rate_limit('backend-audit-unique-key', 2, 900);
select public.consume_lead_rate_limit('backend-audit-unique-key', 2, 900);
delete from public.rate_limit_buckets where key_hash = 'backend-audit-unique-key';
```

Expected results are `true`, `true`, then `false`.

## 6. Run the automated checks

```powershell
npm test
npm run build
npm audit --offline --omit=dev --audit-level=high
```

For production, also check every public route, the `/admin` redirect, the 404 page, browser console output, and security headers. Live Supabase persistence, admin authentication and Turnstile cannot be fully verified until their credentials are configured.
