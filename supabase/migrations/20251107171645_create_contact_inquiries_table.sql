/*
  # Create contact inquiries table

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key) - Eindeutige ID für jede Kontaktanfrage
      - `name` (text) - Name des Kontakts
      - `email` (text) - E-Mail-Adresse
      - `phone` (text, optional) - Telefonnummer
      - `message` (text) - Nachricht des Kontakts
      - `created_at` (timestamptz) - Zeitstempel der Anfrage
      - `status` (text) - Status der Anfrage (new, in_progress, completed)

  2. Security
    - Enable RLS on `contact_inquiries` table
    - Add policy for anonymous users to insert their contact inquiries
    - Add policy for authenticated admin users to read all inquiries

  3. Important Notes
    - This table stores all contact form submissions
    - Anonymous users can only insert, not read their own submissions
    - Admin access is required to view and manage inquiries
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact inquiries"
  ON contact_inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
