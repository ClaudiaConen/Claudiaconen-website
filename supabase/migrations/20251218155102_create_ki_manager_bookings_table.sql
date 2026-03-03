/*
  # KI-Manager Ausbildung Buchungen

  1. Neue Tabelle
    - `ki_manager_bookings`
      - `id` (uuid, primary key)
      - `vorname` (text, Vorname des Teilnehmers)
      - `name` (text, Nachname des Teilnehmers)
      - `adresse` (text, Adresse des Teilnehmers)
      - `email` (text, E-Mail Adresse)
      - `telefon` (text, Telefonnummer)
      - `selected_package` (text, gewähltes Paket)
      - `created_at` (timestamptz, Zeitpunkt der Anmeldung)
  
  2. Sicherheit
    - RLS aktiviert
    - Policy für anonyme Nutzer zum Erstellen von Buchungen
    - Policy für authentifizierte Nutzer zum Lesen aller Buchungen
*/

CREATE TABLE IF NOT EXISTS ki_manager_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname text NOT NULL,
  name text NOT NULL,
  adresse text NOT NULL,
  email text NOT NULL,
  telefon text NOT NULL,
  selected_package text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ki_manager_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON ki_manager_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all bookings"
  ON ki_manager_bookings
  FOR SELECT
  TO authenticated
  USING (true);