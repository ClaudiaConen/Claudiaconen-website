/*
  # Jahres-Contentplan System

  ## Overview
  Creates a comprehensive content planning system for managing annual content calendars.
  Users can create, organize, and track content across different channels and formats.

  ## New Tables
  
  ### `content_plans`
  Stores individual content entries for the content calendar.
  
  - `id` (uuid, primary key) - Unique identifier for each content entry
  - `user_email` (text) - Email of the user who created the content plan
  - `title` (text) - Title/name of the content piece
  - `description` (text, nullable) - Detailed description of the content
  - `content_type` (text) - Type of content (e.g., "Blogartikel", "Social Media Post", "Video", "Podcast", "Newsletter", "Webinar")
  - `channel` (text) - Distribution channel (e.g., "LinkedIn", "Instagram", "Facebook", "YouTube", "Website", "E-Mail")
  - `target_audience` (text, nullable) - Intended audience for the content
  - `status` (text) - Current status ("Idee", "Geplant", "In Bearbeitung", "Fertig", "Veröffentlicht")
  - `priority` (text) - Priority level ("Niedrig", "Mittel", "Hoch")
  - `scheduled_date` (date) - Date when content should be published
  - `actual_publish_date` (date, nullable) - Actual date when content was published
  - `tags` (text[], nullable) - Array of tags/keywords for content categorization
  - `notes` (text, nullable) - Additional notes and comments
  - `created_at` (timestamptz) - Timestamp when entry was created
  - `updated_at` (timestamptz) - Timestamp when entry was last updated

  ## Security
  
  - Enable Row Level Security (RLS) on content_plans table
  - Policy: Users can view their own content plans
  - Policy: Users can insert their own content plans
  - Policy: Users can update their own content plans
  - Policy: Users can delete their own content plans
  
  ## Important Notes
  
  1. **Data Safety**: Uses IF NOT EXISTS to prevent errors on re-runs
  2. **User Ownership**: All policies check user_email to ensure data isolation
  3. **Flexible Schema**: Supports multiple content types and channels
  4. **Status Tracking**: Comprehensive status field for workflow management
  5. **Tag System**: Array field for flexible categorization
  6. **Audit Trail**: Created_at and updated_at for tracking changes
*/

CREATE TABLE IF NOT EXISTS content_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  title text NOT NULL,
  description text,
  content_type text NOT NULL,
  channel text NOT NULL,
  target_audience text,
  status text NOT NULL DEFAULT 'Idee',
  priority text NOT NULL DEFAULT 'Mittel',
  scheduled_date date NOT NULL,
  actual_publish_date date,
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE content_plans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own content plans
CREATE POLICY "Users can view own content plans"
  ON content_plans
  FOR SELECT
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Users can insert their own content plans
CREATE POLICY "Users can insert own content plans"
  ON content_plans
  FOR INSERT
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Users can update their own content plans
CREATE POLICY "Users can update own content plans"
  ON content_plans
  FOR UPDATE
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Users can delete their own content plans
CREATE POLICY "Users can delete own content plans"
  ON content_plans
  FOR DELETE
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create index for faster queries on scheduled_date and user_email
CREATE INDEX IF NOT EXISTS idx_content_plans_user_email ON content_plans(user_email);
CREATE INDEX IF NOT EXISTS idx_content_plans_scheduled_date ON content_plans(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_content_plans_status ON content_plans(status);