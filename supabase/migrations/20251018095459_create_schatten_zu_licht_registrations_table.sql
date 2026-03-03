/*
  # Create schatten_zu_licht_registrations table

  1. New Tables
    - `schatten_zu_licht_registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `first_name` (text) - First name of the registrant
      - `last_name` (text) - Last name of the registrant
      - `email` (text) - Email address of the registrant
      - `phone` (text, optional) - Phone number for follow-up questions
      - `created_at` (timestamptz) - Timestamp when the registration was created

  2. Security
    - Enable RLS on `schatten_zu_licht_registrations` table
    - Add policy for inserting registrations (public access for form submissions)
    - Add policy for reading registrations (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS schatten_zu_licht_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schatten_zu_licht_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert registrations"
  ON schatten_zu_licht_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations"
  ON schatten_zu_licht_registrations
  FOR SELECT
  TO authenticated
  USING (true);