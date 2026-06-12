-- Кодекс Майстра: Supabase schema for Stage 2.
-- Run this file in Supabase SQL Editor before seed.sql.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('admin', 'editor', 'user'))
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type text not null,
  url text,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sources_title_source_type_unique unique (title, source_type),
  constraint sources_source_type_check check (source_type in ('official', 'homebrew', 'campaign'))
);

create table if not exists public.races (
  id uuid primary key default gen_random_uuid(),
  title_ua text not null,
  title_original text,
  slug text not null unique,
  short_description text,
  full_description_markdown text,
  image_url text,
  source_id uuid references public.sources(id) on delete set null,
  tags text[] not null default '{}',
  publication_status text not null default 'draft',
  rules_version text not null default '2024',
  content_type text not null default 'draft',
  creature_type text,
  size text,
  speed text,
  languages text[] not null default '{}',
  lifespan text,
  alignment_or_behavior text,
  race_traits jsonb not null default '[]'::jsonb,
  ability_bonuses jsonb not null default '{}'::jsonb,
  proficiencies jsonb not null default '{}'::jsonb,
  additional_skills jsonb not null default '[]'::jsonb,
  subraces jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint races_publication_status_check check (publication_status in ('draft', 'published', 'hidden')),
  constraint races_rules_version_check check (rules_version in ('2024', 'homebrew')),
  constraint races_content_type_check check (content_type in ('official', 'homebrew', 'campaign', 'draft'))
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  title_ua text not null,
  title_original text,
  slug text not null unique,
  short_description text,
  full_description_markdown text,
  image_url text,
  source_id uuid references public.sources(id) on delete set null,
  tags text[] not null default '{}',
  publication_status text not null default 'draft',
  rules_version text not null default '2024',
  content_type text not null default 'draft',
  hit_die text,
  primary_ability text,
  saving_throws text[] not null default '{}',
  armor_proficiencies text[] not null default '{}',
  weapon_proficiencies text[] not null default '{}',
  tool_proficiencies text[] not null default '{}',
  skill_choices jsonb not null default '{}'::jsonb,
  starting_equipment jsonb not null default '[]'::jsonb,
  class_features jsonb not null default '[]'::jsonb,
  class_progression jsonb not null default '[]'::jsonb,
  subclasses jsonb not null default '[]'::jsonb,
  spellcasting jsonb not null default '{}'::jsonb,
  has_spellcasting boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint classes_publication_status_check check (publication_status in ('draft', 'published', 'hidden')),
  constraint classes_rules_version_check check (rules_version in ('2024', 'homebrew')),
  constraint classes_content_type_check check (content_type in ('official', 'homebrew', 'campaign', 'draft'))
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  title_ua text not null,
  title_original text,
  slug text not null unique,
  short_description text,
  full_description_markdown text,
  image_url text,
  source_id uuid references public.sources(id) on delete set null,
  tags text[] not null default '{}',
  publication_status text not null default 'draft',
  rules_version text not null default '2024',
  content_type text not null default 'draft',
  item_type text,
  category text,
  rarity text,
  price text,
  weight text,
  requires_attunement boolean not null default false,
  is_magical boolean not null default false,
  properties jsonb not null default '{}'::jsonb,
  damage text,
  damage_type text,
  range text,
  armor_class text,
  required_strength text,
  stealth_disadvantage boolean not null default false,
  quantity text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint items_publication_status_check check (publication_status in ('draft', 'published', 'hidden')),
  constraint items_rules_version_check check (rules_version in ('2024', 'homebrew')),
  constraint items_content_type_check check (content_type in ('official', 'homebrew', 'campaign', 'draft'))
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now(),
  constraint favorites_entity_type_check check (entity_type in ('race', 'class', 'item')),
  constraint favorites_unique_entity_per_user unique (user_id, entity_type, entity_id)
);

create index if not exists sections_slug_idx on public.sections(slug);
create index if not exists races_slug_idx on public.races(slug);
create index if not exists races_publication_status_idx on public.races(publication_status);
create index if not exists races_tags_idx on public.races using gin(tags);
create index if not exists classes_slug_idx on public.classes(slug);
create index if not exists classes_publication_status_idx on public.classes(publication_status);
create index if not exists classes_tags_idx on public.classes using gin(tags);
create index if not exists items_slug_idx on public.items(slug);
create index if not exists items_publication_status_idx on public.items(publication_status);
create index if not exists items_tags_idx on public.items using gin(tags);
create index if not exists favorites_user_id_idx on public.favorites(user_id);

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.has_admin_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('admin', 'editor'), false);
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'user'
  )
  on conflict (id) do update
  set email = excluded.email,
      updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists sections_set_updated_at on public.sections;
create trigger sections_set_updated_at
  before update on public.sections
  for each row execute function public.set_updated_at();

drop trigger if exists sources_set_updated_at on public.sources;
create trigger sources_set_updated_at
  before update on public.sources
  for each row execute function public.set_updated_at();

drop trigger if exists races_set_updated_at on public.races;
create trigger races_set_updated_at
  before update on public.races
  for each row execute function public.set_updated_at();

drop trigger if exists classes_set_updated_at on public.classes;
create trigger classes_set_updated_at
  before update on public.classes
  for each row execute function public.set_updated_at();

drop trigger if exists items_set_updated_at on public.items;
create trigger items_set_updated_at
  before update on public.items
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.sections enable row level security;
alter table public.sources enable row level security;
alter table public.races enable row level security;
alter table public.classes enable row level security;
alter table public.items enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile basics" on public.profiles;
create policy "Users can update own profile basics"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = public.current_user_role());

drop policy if exists "Admin editors can read profiles" on public.profiles;
create policy "Admin editors can read profiles"
  on public.profiles for select
  using (public.has_admin_access());

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
  on public.profiles for all
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

drop policy if exists "Public can read published sections" on public.sections;
create policy "Public can read published sections"
  on public.sections for select
  using (is_published = true);

drop policy if exists "Admin editors can manage sections" on public.sections;
create policy "Admin editors can manage sections"
  on public.sections for all
  using (public.has_admin_access())
  with check (public.has_admin_access());

drop policy if exists "Public can read sources" on public.sources;
create policy "Public can read sources"
  on public.sources for select
  using (true);

drop policy if exists "Admin editors can manage sources" on public.sources;
create policy "Admin editors can manage sources"
  on public.sources for all
  using (public.has_admin_access())
  with check (public.has_admin_access());

drop policy if exists "Public can read published races" on public.races;
create policy "Public can read published races"
  on public.races for select
  using (publication_status = 'published');

drop policy if exists "Admin editors can manage races" on public.races;
create policy "Admin editors can manage races"
  on public.races for all
  using (public.has_admin_access())
  with check (public.has_admin_access());

drop policy if exists "Public can read published classes" on public.classes;
create policy "Public can read published classes"
  on public.classes for select
  using (publication_status = 'published');

drop policy if exists "Admin editors can manage classes" on public.classes;
create policy "Admin editors can manage classes"
  on public.classes for all
  using (public.has_admin_access())
  with check (public.has_admin_access());

drop policy if exists "Public can read published items" on public.items;
create policy "Public can read published items"
  on public.items for select
  using (publication_status = 'published');

drop policy if exists "Admin editors can manage items" on public.items;
create policy "Admin editors can manage items"
  on public.items for all
  using (public.has_admin_access())
  with check (public.has_admin_access());

drop policy if exists "Users can read own favorites" on public.favorites;
create policy "Users can read own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

drop policy if exists "Users can manage own favorites" on public.favorites;
create policy "Users can manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Admin editors can read favorites" on public.favorites;
create policy "Admin editors can read favorites"
  on public.favorites for select
  using (public.has_admin_access());
