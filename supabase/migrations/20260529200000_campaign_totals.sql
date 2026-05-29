-- Campaign running total used by /update-total and the homepage.

create table if not exists public.campaign_totals (
  id text primary key,
  goal integer not null default 150000,
  raised integer not null default 10400,
  match integer not null default 150000,
  last_updated date not null default current_date,
  updated_at timestamptz not null default now()
);

create or replace function public.set_campaign_totals_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_campaign_totals_updated_at on public.campaign_totals;

create trigger set_campaign_totals_updated_at
before update on public.campaign_totals
for each row
execute function public.set_campaign_totals_updated_at();

insert into public.campaign_totals (id, goal, raised, match, last_updated)
values ('last-mile-campaign', 150000, 10400, 150000, current_date)
on conflict (id) do update
set
  goal = excluded.goal,
  match = excluded.match;

alter table public.campaign_totals enable row level security;

drop policy if exists "Public can read campaign totals" on public.campaign_totals;

create policy "Public can read campaign totals"
on public.campaign_totals
for select
using (true);

-- This keeps /update-total simple for a non-technical updater.
-- For stricter security, replace this with a Supabase Edge Function and remove public write access.
drop policy if exists "Public can update campaign totals" on public.campaign_totals;

create policy "Public can update campaign totals"
on public.campaign_totals
for insert
with check (id = 'last-mile-campaign');

drop policy if exists "Public can edit campaign totals" on public.campaign_totals;

create policy "Public can edit campaign totals"
on public.campaign_totals
for update
using (id = 'last-mile-campaign')
with check (id = 'last-mile-campaign');
