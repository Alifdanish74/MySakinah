-- ============================================================
-- MySakinah Admin System — Supabase Schema
-- Single scalable table design: add new modules via INSERT only
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. MODULES TABLE
--    Master registry of all available modules.
--    To add a new module: just INSERT a row here.
-- ============================================================
create table if not exists public.modules (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,              -- e.g. 'kohasil', 'kopetro'
  display_name text not null,                     -- e.g. 'KOHASiL Raudhah'
  description  text,                              -- short module description
  icon         text,                              -- lucide icon name e.g. 'shield'
  color_from   text default '#6366f1',           -- gradient start (tailwind hex)
  color_to     text default '#8b5cf6',           -- gradient end
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- 2. SUBMISSIONS TABLE
--    Single table for all modules. form_data holds the payload.
-- ============================================================
create table if not exists public.submissions (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid not null references public.modules(id) on delete cascade,
  form_data    jsonb not null default '{}',       -- flexible per-module payload
  submitted_by text,                              -- name or identifier from form
  status       text not null default 'pending'    -- 'pending', 'new', 'reviewed', 'contacted', 'completed', 'archived'
                check (status in ('pending', 'new', 'reviewed', 'contacted', 'completed', 'archived')),
  notes        text,                              -- admin notes field
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Ensure check constraint allows all status values if table was previously created
alter table public.submissions drop constraint if exists submissions_status_check;
alter table public.submissions add constraint submissions_status_check
  check (status in ('pending', 'new', 'reviewed', 'contacted', 'completed', 'archived'));


-- Auto-update updated_at on row modification
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger submissions_updated_at
  before update on public.submissions
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 3. ADMIN ROLES TABLE
--    Maps Supabase auth users to roles and modules.
--    module_id = NULL means super admin (all modules).
-- ============================================================
create table if not exists public.admin_roles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  module_id    uuid references public.modules(id) on delete cascade, -- NULL = super admin
  role         text not null default 'viewer'
               check (role in ('viewer', 'editor', 'super')),
  created_at   timestamptz not null default now(),
  unique (user_id, module_id)
);

-- ============================================================
-- 4. INDEXES (performance)
-- ============================================================
create index if not exists idx_submissions_module_id   on public.submissions (module_id);
create index if not exists idx_submissions_created_at  on public.submissions (created_at desc);
create index if not exists idx_submissions_status      on public.submissions (status);
create index if not exists idx_submissions_form_data   on public.submissions using gin (form_data);
create index if not exists idx_admin_roles_user_module on public.admin_roles (user_id, module_id);

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================
alter table public.modules      enable row level security;
alter table public.submissions  enable row level security;
alter table public.admin_roles  enable row level security;

-- Helper: check if current user is super admin (role='super' with NULL module_id)
create or replace function public.is_super_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.admin_roles
    where user_id = auth.uid()
      and role = 'super'
      and module_id is null
  );
$$;

-- Helper: check if current user has access to a given module_id
create or replace function public.has_module_access(p_module_id uuid)
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.admin_roles
    where user_id = auth.uid()
      and (
        (role = 'super' and module_id is null)  -- super admin
        or module_id = p_module_id              -- scoped admin
      )
  );
$$;

-- MODULES: any authenticated user can read modules they have access to, or active modules publicly
drop policy if exists "modules_public_select" on public.modules;
create policy "modules_public_select" on public.modules
  for select using ( true );

drop policy if exists "modules_public_insert" on public.modules;
create policy "modules_public_insert" on public.modules
  for insert with check ( true );

create policy "modules_select" on public.modules
  for select using (
    public.is_super_admin()
    or exists (
      select 1 from public.admin_roles
      where user_id = auth.uid() and module_id = modules.id
    )
  );

-- SUBMISSIONS: select — super admin sees all; scoped admins see their module's submissions
create policy "submissions_select" on public.submissions
  for select using ( public.has_module_access(module_id) );

-- SUBMISSIONS: insert — editors, super admin, or public landing page form submissions
drop policy if exists "submissions_public_insert" on public.submissions;
create policy "submissions_public_insert" on public.submissions
  for insert with check ( true );

create policy "submissions_insert" on public.submissions
  for insert with check (
    exists (
      select 1 from public.admin_roles
      where user_id = auth.uid()
        and role in ('editor', 'super')
        and (module_id is null or module_id = submissions.module_id)
    )
  );

-- SUBMISSIONS: update — editors and super admin only
create policy "submissions_update" on public.submissions
  for update using ( public.has_module_access(module_id) )
  with check (
    exists (
      select 1 from public.admin_roles
      where user_id = auth.uid()
        and role in ('editor', 'super')
        and (module_id is null or module_id = submissions.module_id)
    )
  );

-- SUBMISSIONS: delete — editors and super admin only
create policy "submissions_delete" on public.submissions
  for delete using (
    exists (
      select 1 from public.admin_roles
      where user_id = auth.uid()
        and role in ('editor', 'super')
        and (module_id is null or module_id = submissions.module_id)
    )
  );

-- ADMIN ROLES: users can only view their own role rows
create policy "admin_roles_select" on public.admin_roles
  for select using ( user_id = auth.uid() or public.is_super_admin() );

-- ============================================================
-- 6. SEED DATA — Five initial modules
-- ============================================================
insert into public.modules (slug, display_name, description, icon, color_from, color_to) values
  ('kohasil',  'KOHASiL Raudhah',  'Skim Pengurusan Jenazah & Khairat Kematian untuk ahli KOHASiL',  'shield',    '#dc2626', '#991b1b'),
  ('kopetro',  'KOPETRO',          'Skim perlindungan untuk penjawat awam sektor petroleum',            'flame',     '#ea580c', '#9a3412'),
  ('krtb',     'KRTB',             'Skim perlindungan Kerajaan Tempatan dan Badan Berkanun',            'building2', '#0284c7', '#075985'),
  ('kotamas',  'KOTAMAS',          'Skim perlindungan anggota Tentera & Masyarakat',                   'star',      '#7c3aed', '#4c1d95'),
  ('albarzah', 'Al-Barzah',        'Skim takaful jenazah berasaskan prinsip syariah Islam',            'moon',      '#047857', '#064e3b')
on conflict (slug) do nothing;

-- Sample Seed Submissions matching CONTOH EXCEL JEMPUTAN (1).xlsx structure
insert into public.submissions (module_id, submitted_by, status, form_data)
select
  m.id,
  s.submitted_by,
  'pending',
  s.form_data
from public.modules m
cross join (
  values
    ('HAMZAH BIN ALI', '{"no": "1", "nama": "HAMZAH BIN ALI", "no_kp": "870654032121", "umur": "37", "kategori": "AHLI", "no_ahli": "1234567", "bukan_anggota": "", "no_telefon": "013 1300 1998", "alamat1": "NO 2", "alamat2": "KG RAJA", "poskod": "18500", "negeri": "KELANTAN", "pakej": "KELUARGA 20", "tarikh_daftar": "21102026", "utama": "HAMZAH BIN ALI"}'::jsonb),
    ('FATIMAH BINTI AHMAD', '{"no": "1", "nama": "FATIMAH BINTI AHMAD", "no_kp": "", "umur": "34", "kategori": "PASANGAN", "no_ahli": "", "bukan_anggota": "", "no_telefon": "013 1300 1998", "alamat1": "NO 2", "alamat2": "KG RAJA", "poskod": "18500", "negeri": "KELANTAN", "pakej": "KELUARGA 20", "tarikh_daftar": "21102026", "utama": "HAMZAH BIN ALI"}'::jsonb),
    ('ZARUL BIN HAMZAH', '{"no": "1", "nama": "ZARUL BIN HAMZAH", "no_kp": "", "umur": "12", "kategori": "ANAK", "no_ahli": "", "bukan_anggota": "", "no_telefon": "013 1300 1998", "alamat1": "NO 2", "alamat2": "KG RAJA", "poskod": "18500", "negeri": "KELANTAN", "pakej": "KELUARGA 20", "tarikh_daftar": "21102026", "utama": "HAMZAH BIN ALI"}'::jsonb),
    ('ZURA BINTI KASIM', '{"no": "2", "nama": "ZURA BINTI KASIM", "no_kp": "865543032134", "umur": "34", "kategori": "AHLI", "no_ahli": "", "bukan_anggota": "BUKAN ANGGOTA", "no_telefon": "011 678 900", "alamat1": "JLN 34", "alamat2": "TMN NUR", "poskod": "17900", "negeri": "JOHOR", "pakej": "KELUARGA 30", "tarikh_daftar": "8102026", "utama": "ZURA BINTI KASIM"}'::jsonb),
    ('CHIN SENG HUP', '{"no": "3", "nama": "CHIN SENG HUP", "no_kp": "785645330", "umur": "34", "kategori": "AHLI", "no_ahli": "345678", "bukan_anggota": "", "no_telefon": "019 887 7665", "alamat1": "LOT 12", "alamat2": "BANDAR JAYA", "poskod": "50000", "negeri": "WILAYAH PERSEKUTUAN", "pakej": "INDIVIDU 10", "tarikh_daftar": "8102026", "utama": "CHIN SENG HUP"}'::jsonb)
) as s(submitted_by, form_data)
where m.slug = 'kohasil';

