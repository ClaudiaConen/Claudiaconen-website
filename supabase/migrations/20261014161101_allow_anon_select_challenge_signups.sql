-- Challenge-Anmeldungen landen in contact_inquiries (Nachricht enthaelt "7-TAGE-CHALLENGE").
-- Das Website-Admin-Dashboard liest alle Listen mit dem oeffentlichen anon-Schluessel
-- (eigenes Token-Login, keine Supabase-Auth-Session). Damit die Admin-Kachel
-- "Challenge-Anmeldungen" die Eintraege anzeigen kann, braucht anon ein SELECT -
-- bewusst NUR auf Challenge-Zeilen beschraenkt, nicht auf sonstige Kontaktanfragen.
DROP POLICY IF EXISTS "Anon can read challenge signups" ON public.contact_inquiries;
CREATE POLICY "Anon can read challenge signups"
  ON public.contact_inquiries
  FOR SELECT
  TO anon
  USING (message ILIKE '%CHALLENGE%');
