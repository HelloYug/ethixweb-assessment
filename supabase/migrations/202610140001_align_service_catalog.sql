-- Keep the database allow-list aligned with lib/validation/lead.js.
-- This is safe to run after the initial schema migration has already been applied.
alter table if exists public.leads drop constraint if exists leads_service_check;

alter table if exists public.leads
  add constraint leads_service_check
  check (service in ('web', 'growth', 'ai', 'crm', 'data', 'accessibility', 'support'));
