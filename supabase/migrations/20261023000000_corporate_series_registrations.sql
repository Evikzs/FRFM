-- Corporate Series: registrations sent by a company's contact person.
-- Rows are written only by the "submit-corporate-registration" Edge Function
-- (service role). The public anon key has no access to this table.

create table if not exists public.corporate_series_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  edition smallint not null default 1,
  company text not null check (char_length(company) between 1 and 150),
  contact_name text not null check (char_length(contact_name) between 1 and 120),
  role text check (char_length(role) <= 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (char_length(phone) <= 40),
  city text check (char_length(city) <= 80),
  participation text not null check (participation in ('company', 'team', 'colleagues')),
  players text not null check (players in ('2-4', '5-10', '11-20', '20+', 'unsure')),
  message text check (char_length(message) <= 2000),
  wants_updates boolean not null default false,
  language text not null default 'en' check (language in ('en', 'ro')),
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'declined'))
);

comment on table public.corporate_series_registrations is
  'Corporate Series registrations. Personal data (GDPR): delete a row when the contact person asks.';

create index if not exists corporate_series_registrations_created_at_idx
  on public.corporate_series_registrations (created_at desc);

alter table public.corporate_series_registrations enable row level security;

-- No policies for anon or authenticated users: RLS blocks all direct access.
-- To let the site's admins read the list in the app, add a policy that matches
-- how the main app identifies admins. Example, if profiles.role holds 'admin':
--
-- create policy "Admins can read corporate registrations"
--   on public.corporate_series_registrations for select
--   to authenticated
--   using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
