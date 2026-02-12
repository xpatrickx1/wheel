create extension if not exists "pgcrypto";

create table if not exists public.widgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text,
  settings jsonb not null default '{}'::jsonb,
  template_id uuid,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.widget_results (
  id uuid primary key default gen_random_uuid(),
  widget_id uuid not null references public.widgets(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  contact text not null,
  prize text not null,
  created_at timestamptz default now()
);

create index if not exists idx_widget_results_widget_id on public.widget_results (widget_id);
create index if not exists idx_widget_results_user_id on public.widget_results (user_id);

alter table public.widgets alter column is_public set default true;

-- RLS for widget_results
alter table public.widget_results enable row level security;

drop policy if exists users_can_insert_results on public.widget_results;
create policy users_can_insert_results on public.widget_results
  for insert with check (auth.uid() = user_id);

drop policy if exists users_can_select_own_results on public.widget_results;
create policy users_can_select_own_results on public.widget_results
  for select using (auth.uid() = user_id);

-- function + trigger for widgets.updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_set_updated_at on public.widgets;
create trigger trigger_set_updated_at
before update on public.widgets
for each row execute procedure public.set_updated_at();

create index if not exists idx_widgets_user_id on public.widgets (user_id);
create unique index if not exists uq_widgets_user_slug on public.widgets (user_id, slug);

-- RLS for widgets
alter table public.widgets enable row level security;

drop policy if exists users_can_select_their_widgets on public.widgets;
create policy users_can_select_their_widgets on public.widgets
  for select using (auth.uid() = user_id or is_public = true);

drop policy if exists users_can_insert_widgets on public.widgets;
create policy users_can_insert_widgets on public.widgets
  for insert with check (auth.uid() = user_id);

drop policy if exists users_can_update_widgets on public.widgets;
create policy users_can_update_widgets on public.widgets
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists users_can_delete_widgets on public.widgets;
create policy users_can_delete_widgets on public.widgets
  for delete using (auth.uid() = user_id);

-- додаємо колонку, тільки якщо її ще немає
alter table public.widgets add column if not exists is_active boolean not null default true;

ALTER TABLE public.widget_results ENABLE ROW LEVEL SECURITY;

-- Видалити старі політики
DROP POLICY IF EXISTS users_can_insert_results ON public.widget_results;
DROP POLICY IF EXISTS users_can_select_own_results ON public.widget_results;
DROP POLICY IF EXISTS "Allow insert for public widgets" ON public.widget_results;
-- Дозволити вставку для всіх, якщо widget_id належить публічному віджету
CREATE POLICY "Allow insert for public widgets" ON public.widget_results
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.widgets
    WHERE id = widget_results.widget_id AND is_public = true AND is_active = true
  )
);

