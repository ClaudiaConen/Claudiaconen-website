/*
  # Add audio_url to member_course_modules

  ## Summary
  Adds an audio_url column to member_course_modules so that each module can have
  an associated podcast/audio file. The existing thumbnail_url column is kept and
  repurposed as the infographic image field in the admin UI.

  ## Changes
  - Adds `audio_url` (text, nullable) to `member_course_modules`
*/

ALTER TABLE member_course_modules
  ADD COLUMN IF NOT EXISTS audio_url text;
