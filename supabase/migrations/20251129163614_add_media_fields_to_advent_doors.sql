/*
  # Add media fields to advent doors

  1. Changes
    - Add `audio_url` field for audio content
    - Add `video_url` field for video content
    - These fields are optional and can be used alongside text content
  
  2. Notes
    - Fields are nullable to maintain backward compatibility
    - Can be used to embed audio/video in advent door content
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'advent_doors' AND column_name = 'audio_url'
  ) THEN
    ALTER TABLE advent_doors ADD COLUMN audio_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'advent_doors' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE advent_doors ADD COLUMN video_url text;
  END IF;
END $$;