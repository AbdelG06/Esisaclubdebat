create extension if not exists "pgcrypto";

create table if not exists public.inscriptions (
  id uuid primary key default gen_random_uuid(),
  nom text not null check (char_length(trim(nom)) between 2 and 80),
  prenom text not null check (char_length(trim(prenom)) between 2 and 80),
  telephone text not null unique check (telephone ~ '^(\+212|00212|0)[67][0-9]{8}$'),
  niveau integer not null check (niveau between 1 and 5),
  section text not null check (section in ('francaise', 'arabe', 'anglaise')),
  experience text not null check (experience in ('regulierement', 'un_peu', 'premiere_fois')),
  note integer check (note between 0 and 20),
  commentaire text check (commentaire is null or char_length(commentaire) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.inscriptions
  add column if not exists note integer check (note between 0 and 20),
  add column if not exists commentaire text check (commentaire is null or char_length(commentaire) <= 1000);

alter table public.inscriptions enable row level security;

drop policy if exists "Tout visiteur peut s'inscrire" on public.inscriptions;
create policy "Tout visiteur peut s'inscrire"
  on public.inscriptions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins authentifiés peuvent consulter" on public.inscriptions;
create policy "Admins authentifiés peuvent consulter"
  on public.inscriptions for select
  to authenticated
  using (true);

drop policy if exists "Admins authentifiés peuvent modifier" on public.inscriptions;
create policy "Admins authentifiés peuvent modifier"
  on public.inscriptions for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Admins authentifiés peuvent supprimer" on public.inscriptions;
create policy "Admins authentifiés peuvent supprimer"
  on public.inscriptions for delete
  to authenticated
  using (true);

alter table public.inscriptions replica identity full;
-- Dans Supabase Dashboard > Database > Publications, ajoutez inscriptions à supabase_realtime.
