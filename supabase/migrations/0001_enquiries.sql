-- Enquiries submitted through the website's /start form.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'won', 'closed')),
  services text[] not null default '{}',
  package text,
  stage text not null,
  business text not null,
  goal text not null,
  name text not null,
  email text,
  phone text,
  contact_pref text not null,
  source text,
  user_agent text,
  notes text
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row level security on with no policies: browsers (anon key) can't read or write.
-- Only the website server, using the service role key, can insert. Staff view rows in the dashboard.
alter table public.enquiries enable row level security;
