-- Erweitert die anon-Leseregel aus 20261014161101 um die Event-Check-ins
-- (message beginnt mit "POWER-OF-AI CHECK-IN"). Das Admin-Dashboard liest mit dem
-- oeffentlichen anon-Schluessel; es darf weiterhin NUR diese markierten oeffentlichen
-- Anmeldungen sehen, nicht die sonstigen privaten Kontaktanfragen.
DROP POLICY IF EXISTS "Anon can read challenge signups" ON public.contact_inquiries;
CREATE POLICY "Anon can read public signups"
  ON public.contact_inquiries
  FOR SELECT
  TO anon
  USING (message ILIKE '%CHALLENGE%' OR message ILIKE '%POWER-OF-AI CHECK-IN%');
