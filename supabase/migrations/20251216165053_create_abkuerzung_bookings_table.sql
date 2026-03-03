/*
  # Create Abkürzung 1:1 Bookings Table

  1. New Tables
    - `abkuerzung_bookings`
      - `id` (uuid, primary key)
      - `first_name` (text) - Vorname des Buchers
      - `last_name` (text) - Nachname des Buchers
      - `email` (text) - Email für Kontakt und Terminbuchung
      - `phone` (text, nullable) - Optional: Telefonnummer
      - `package_type` (text) - Paket: '1x60min', '2x60min', oder '3x60min'
      - `price_paid` (numeric) - Bezahlter Preis in Euro
      - `booking_date` (timestamptz) - Zeitpunkt der Buchung
      - `created_at` (timestamptz) - Erstellungszeitpunkt

  2. Security
    - Enable RLS on `abkuerzung_bookings` table
    - Add policy for anonymous users to insert bookings
    - Add policy for authenticated users (admin) to view all bookings

  3. Indexes
    - Index on email for faster lookups
    - Index on booking_date for sorting
*/

CREATE TABLE IF NOT EXISTS abkuerzung_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  package_type text NOT NULL CHECK (package_type IN ('1x60min', '2x60min', '3x60min')),
  price_paid numeric NOT NULL CHECK (price_paid > 0),
  booking_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE abkuerzung_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bookings"
  ON abkuerzung_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON abkuerzung_bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON abkuerzung_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON abkuerzung_bookings
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_abkuerzung_bookings_email ON abkuerzung_bookings(email);
CREATE INDEX IF NOT EXISTS idx_abkuerzung_bookings_booking_date ON abkuerzung_bookings(booking_date DESC);
CREATE INDEX IF NOT EXISTS idx_abkuerzung_bookings_package_type ON abkuerzung_bookings(package_type);
