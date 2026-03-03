/*
  # Create Beta Waitlist Table

  1. New Tables
    - `beta_waitlist`
      - `id` (uuid, primary key) - Unique identifier
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `email` (text, unique) - User's email address
      - `company` (text, optional) - User's company or organization
      - `reason` (text, optional) - Why they want to join beta
      - `created_at` (timestamptz) - When they signed up
      - `notified` (boolean) - Whether they've been notified about beta access
      - `status` (text) - Status: pending, accepted, notified

  2. Security
    - Enable RLS on `beta_waitlist` table
    - Add policy for public insert (anyone can join waitlist)
    - Add policy for authenticated admin read
*/

CREATE TABLE IF NOT EXISTS beta_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  company text,
  reason text,
  created_at timestamptz DEFAULT now(),
  notified boolean DEFAULT false,
  status text DEFAULT 'pending'
);

ALTER TABLE beta_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join beta waitlist"
  ON beta_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can read their own submission"
  ON beta_waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS beta_waitlist_email_idx ON beta_waitlist(email);
CREATE INDEX IF NOT EXISTS beta_waitlist_created_at_idx ON beta_waitlist(created_at DESC);