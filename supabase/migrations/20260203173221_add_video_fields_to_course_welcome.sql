/*
  # Add Video Support to Course Welcome Content

  1. Changes
    - Add `video_url` column to store video URLs
    - Add `video_platform` column to store platform type (youtube, vimeo, self-hosted)
    
  2. Purpose
    - Enable course-specific welcome areas to have their own welcome videos
    - Support multiple video platforms for flexibility
*/

-- Add video fields to member_course_welcome_content table
ALTER TABLE member_course_welcome_content 
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS video_platform text DEFAULT 'vimeo' CHECK (video_platform IN ('youtube', 'vimeo', 'self-hosted'));