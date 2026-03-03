/*
  # Make Global Welcome Video Fields Nullable

  1. Changes
    - Make video_url and video_platform nullable in member_welcome_content
    - This allows the global welcome to not have a video (generic welcome)
    
  2. Purpose
    - Global welcome should be generic and not require a video
    - Course-specific welcomes can have their own videos
*/

-- Make video fields nullable in member_welcome_content
ALTER TABLE member_welcome_content 
ALTER COLUMN video_url DROP NOT NULL,
ALTER COLUMN video_platform DROP NOT NULL;