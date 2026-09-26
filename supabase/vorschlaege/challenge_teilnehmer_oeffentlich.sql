-- VORSCHLAG, NICHT AUSGEFUEHRT (26.09.2026). Einspielen: Supabase-Dashboard -> SQL Editor.
--
-- Zweck: /shop zeigt neben der Challenge "X / 10 Gratis-Plaetze vergeben" und eine
-- nummerierte Liste mit VORNAMEN. Die Anmeldungen liegen in contact_inquiries; "anon" darf
-- dort nur einfuegen, nicht lesen (RLS). Diese Funktion gibt deshalb nur heraus:
--   anzahl   = Zahl der Anmeldungen (je E-Mail einmal)
--   vornamen = NUR der Vorname (erstes Wort des Namens) derjenigen, die bei der Anmeldung
--              ausdruecklich zugestimmt haben, dass ihr Vorname oeffentlich erscheint.
-- Keine Nachnamen, keine E-Mails, keine Telefonnummern.
--
-- DATENSCHUTZ: Ohne Einwilligung kein Name. Die Einwilligung muss das Anmeldeformular
-- in die Nachricht schreiben (Zeile "VORNAME-OEFFENTLICH: ja"); bis das Formular diese
-- Checkbox hat, liefert die Liste niemanden - nur die Zahl.

create or replace function public.challenge_teilnehmer_oeffentlich(p_start text default null)
returns json
language sql
stable
security definer
set search_path = public
as $$
  with anm as (
    select distinct on (lower(trim(email)))
           lower(trim(email)) as mail, name, message, created_at
    from public.contact_inquiries
    where message like '7-TAGE-CHALLENGE%'
      and (p_start is null or message like '%Start: Montag, ' || p_start || '%')
    order by lower(trim(email)), created_at
  )
  select json_build_object(
    'anzahl', (select count(*) from anm),
    'vornamen', coalesce((
      select json_agg(split_part(trim(name), ' ', 1) order by created_at)
      from anm
      where message like '%VORNAME-OEFFENTLICH: ja%'
    ), '[]'::json)
  );
$$;

revoke all on function public.challenge_teilnehmer_oeffentlich(text) from public;
grant execute on function public.challenge_teilnehmer_oeffentlich(text) to anon, authenticated;

-- Probe danach:
--   select public.challenge_teilnehmer_oeffentlich('26. Oktober 2026');
