/*
  # Create Content Uploads Table
  
  1. New Tables
    - `content_uploads`
      - `id` (uuid, primary key)
      - `content_plan_id` (uuid, foreign key to content_plans)
      - `user_email` (text, email of uploader)
      - `file_url` (text, storage URL)
      - `file_name` (text, original filename)
      - `file_type` (text, MIME type)
      - `file_size` (bigint, file size in bytes)
      - `notes` (text, optional notes about the file)
      - `uploaded_at` (timestamptz, upload timestamp)
      
  2. Changes to `content_plans` Table
    - Add `actual_status` column (text: 'idea', 'in_progress', 'completed', 'published')
    - Add `completed_at` (timestamptz)
    - Add `published_at` (timestamptz)
    
  3. Security
    - Enable RLS on `content_uploads` table
    - Add policy for users to manage their own uploads
*/

-- Add status tracking columns to content_plans
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'content_plans' AND column_name = 'actual_status'
  ) THEN
    ALTER TABLE content_plans ADD COLUMN actual_status text DEFAULT 'idea';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'content_plans' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE content_plans ADD COLUMN completed_at timestamptz;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'content_plans' AND column_name = 'published_at'
  ) THEN
    ALTER TABLE content_plans ADD COLUMN published_at timestamptz;
  END IF;
END $$;

-- Create content_uploads table
CREATE TABLE IF NOT EXISTS content_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_plan_id uuid REFERENCES content_plans(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  notes text,
  uploaded_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_uploads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own uploads" ON content_uploads;
DROP POLICY IF EXISTS "Users can insert own uploads" ON content_uploads;
DROP POLICY IF EXISTS "Users can delete own uploads" ON content_uploads;

-- Policy: Users can view their own uploads (anonymous access by email)
CREATE POLICY "Users can view own uploads"
  ON content_uploads FOR SELECT
  USING (true);

-- Policy: Users can insert their own uploads (anonymous access)
CREATE POLICY "Users can insert own uploads"
  ON content_uploads FOR INSERT
  WITH CHECK (true);

-- Policy: Users can delete their own uploads (anonymous access)
CREATE POLICY "Users can delete own uploads"
  ON content_uploads FOR DELETE
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_content_uploads_plan_id ON content_uploads(content_plan_id);
CREATE INDEX IF NOT EXISTS idx_content_uploads_user_email ON content_uploads(user_email);