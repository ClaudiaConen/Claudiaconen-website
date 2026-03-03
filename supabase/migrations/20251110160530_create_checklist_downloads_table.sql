/*
  # Create checklist downloads table

  1. New Tables
    - `checklist_downloads`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `article_slug` (text, not null)
      - `article_title` (text, not null)
      - `downloaded_at` (timestamptz, default now())
      - `consent` (boolean, default true)
  
  2. Security
    - Enable RLS on `checklist_downloads` table
    - Add policy for anonymous users to insert their own download requests
    - Add policy for authenticated admin users to view all downloads
  
  3. Indexes
    - Add index on email for faster lookups
    - Add index on article_slug for analytics
*/

CREATE TABLE IF NOT EXISTS checklist_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  article_slug text NOT NULL,
  article_title text NOT NULL,
  downloaded_at timestamptz DEFAULT now(),
  consent boolean DEFAULT true
);

ALTER TABLE checklist_downloads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert download requests
CREATE POLICY "Anyone can request checklist downloads"
  ON checklist_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view downloads (for admin purposes)
CREATE POLICY "Authenticated users can view all downloads"
  ON checklist_downloads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_checklist_downloads_email ON checklist_downloads(email);
CREATE INDEX IF NOT EXISTS idx_checklist_downloads_article_slug ON checklist_downloads(article_slug);
CREATE INDEX IF NOT EXISTS idx_checklist_downloads_created_at ON checklist_downloads(downloaded_at);