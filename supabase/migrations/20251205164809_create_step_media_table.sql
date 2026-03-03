/*
  # Create step_media table for Hero section media

  1. New Tables
    - `step_media`
      - `id` (uuid, primary key)
      - `step_number` (integer, 1-7) - unique constraint to ensure one media per step
      - `title` (text) - descriptive title (e.g., "KLARHEIT", "BOTSCHAFT", etc.)
      - `media_type` (text) - either 'audio' or 'video'
      - `media_url` (text) - for video: YouTube/Vimeo URL, for audio: Supabase storage URL
      - `platform` (text, nullable) - 'youtube', 'vimeo', or null for audio
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `step_media` table
    - Add policy for public read access (needed for homepage display)
    - Add policy for authenticated admin write access
    
  3. Constraints
    - Unique constraint on step_number to ensure only one media per step
    - Check constraint on step_number to ensure it's between 1 and 7
    - Check constraint on media_type to ensure it's either 'audio' or 'video'
*/

CREATE TABLE IF NOT EXISTS step_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL,
  title text NOT NULL,
  media_type text NOT NULL,
  media_url text NOT NULL,
  platform text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT step_media_unique_step UNIQUE (step_number),
  CONSTRAINT step_media_step_range CHECK (step_number >= 1 AND step_number <= 7),
  CONSTRAINT step_media_type_check CHECK (media_type IN ('audio', 'video'))
);

ALTER TABLE step_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view step media"
  ON step_media
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert step media"
  ON step_media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update step media"
  ON step_media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete step media"
  ON step_media
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('step-audio-files', 'step-audio-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for audio files
CREATE POLICY "Anyone can view audio files"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'step-audio-files');

CREATE POLICY "Authenticated users can upload audio files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'step-audio-files');

CREATE POLICY "Authenticated users can update audio files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'step-audio-files')
  WITH CHECK (bucket_id = 'step-audio-files');

CREATE POLICY "Authenticated users can delete audio files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'step-audio-files');