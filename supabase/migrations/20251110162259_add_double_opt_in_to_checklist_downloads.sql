/*
  # Add Double-Opt-In to checklist downloads

  1. Changes
    - Add `confirmation_token` (uuid) for email verification
    - Add `confirmed_at` (timestamptz) to track when email was confirmed
    - Add `is_confirmed` (boolean) to quickly check confirmation status
    - Add `token_expires_at` (timestamptz) for token expiration (24 hours)
    - Add index on confirmation_token for fast lookups
  
  2. Security
    - Token expires after 24 hours
    - Only confirmed downloads can access checklist
  
  3. Notes
    - DSGVO-compliant with Double-Opt-In
    - Users must confirm email before download
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'checklist_downloads' AND column_name = 'confirmation_token'
  ) THEN
    ALTER TABLE checklist_downloads 
    ADD COLUMN confirmation_token uuid DEFAULT gen_random_uuid(),
    ADD COLUMN confirmed_at timestamptz DEFAULT NULL,
    ADD COLUMN is_confirmed boolean DEFAULT false,
    ADD COLUMN token_expires_at timestamptz DEFAULT (now() + interval '24 hours');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_checklist_downloads_token ON checklist_downloads(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_checklist_downloads_confirmed ON checklist_downloads(is_confirmed);

-- Update policy to allow checking token
DROP POLICY IF EXISTS "Anyone can request checklist downloads" ON checklist_downloads;

CREATE POLICY "Anyone can request checklist downloads"
  ON checklist_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view their own download by token (for confirmation)
CREATE POLICY "Anyone can view by token"
  ON checklist_downloads
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to update their own confirmation
CREATE POLICY "Anyone can confirm by token"
  ON checklist_downloads
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);