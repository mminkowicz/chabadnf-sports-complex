-- Dynamic dedication availability statuses used by /update-total and /dedications.

create table if not exists public.dedication_statuses (
  dedication_id integer primary key,
  status text not null check (status in ('available', 'reserved', 'sold')),
  updated_at timestamptz not null default now()
);

create or replace function public.set_dedication_statuses_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_dedication_statuses_updated_at on public.dedication_statuses;

create trigger set_dedication_statuses_updated_at
before update on public.dedication_statuses
for each row
execute function public.set_dedication_statuses_updated_at();

insert into public.dedication_statuses (dedication_id, status)
values
  (1, 'available'),
  (2, 'available'),
  (3, 'available'),
  (4, 'available'),
  (5, 'sold'),
  (6, 'sold'),
  (7, 'available'),
  (8, 'sold'),
  (9, 'sold'),
  (10, 'available'),
  (11, 'available'),
  (12, 'available'),
  (13, 'available'),
  (14, 'available'),
  (15, 'available'),
  (16, 'available')
on conflict (dedication_id) do nothing;

alter table public.dedication_statuses enable row level security;

drop policy if exists "Public can read dedication statuses" on public.dedication_statuses;

create policy "Public can read dedication statuses"
on public.dedication_statuses
for select
using (true);
