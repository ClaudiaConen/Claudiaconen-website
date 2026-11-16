-- Kurs-Freigabe pro Teilnehmerin (16.11.2026).
-- Zweck: Masterclass-Teilnehmende bekommen NUR den Elevator-Pitch-Kurs, nicht alle Kurse.
-- Regel im Code (src/lib/kursFreigabe.ts): Wer mindestens eine Zeile hier hat, sieht nur diese Kurse;
-- wer keine Zeile hat (alle bisherigen Teilnehmenden), sieht wie bisher alle veroeffentlichten Kurse.
-- Einspielen: Supabase-Dashboard -> SQL Editor -> diesen Text einfuegen -> Run.

create table if not exists public.member_student_course_access (
  student_id uuid not null references public.member_students(id) on delete cascade,
  course_id  uuid not null references public.member_courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (student_id, course_id)
);

create index if not exists idx_member_student_course_access_course_id
  on public.member_student_course_access(course_id);

alter table public.member_student_course_access enable row level security;

-- Lesen: der Mitgliederbereich (anon, Login per Zugangscode) und der Admin-Bereich muessen die Freigaben sehen.
-- Die Tabelle enthaelt nur IDs, keine Namen oder E-Mails.
drop policy if exists "Kursfreigaben lesen" on public.member_student_course_access;
create policy "Kursfreigaben lesen"
  on public.member_student_course_access for select
  to anon, authenticated
  using (true);

-- Anlegen und Entfernen nur im Admin-Bereich: gleiche Admin-Pruefung wie bei member_students.
drop policy if exists "Kursfreigaben anlegen (Admin)" on public.member_student_course_access;
create policy "Kursfreigaben anlegen (Admin)"
  on public.member_student_course_access for insert
  to authenticated
  with check (
  exists (
    select 1 from public.admin_users
    where email = current_setting('request.jwt.claims', true)::json->>'email'
      and is_active = true
  )
  );

drop policy if exists "Kursfreigaben entfernen (Admin)" on public.member_student_course_access;
create policy "Kursfreigaben entfernen (Admin)"
  on public.member_student_course_access for delete
  to authenticated
  using (
  exists (
    select 1 from public.admin_users
    where email = current_setting('request.jwt.claims', true)::json->>'email'
      and is_active = true
  )
  );
