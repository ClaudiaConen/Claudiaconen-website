/*
  # Increase course-media bucket file size limit to 200MB

  ## Summary
  Raises the maximum upload size for the "course-media" storage bucket from the
  Supabase default to 200 MB (209715200 bytes) so that larger audio files can be
  uploaded via the admin lesson editor.

  ## Changes
  - Updates the `file_size_limit` on the existing "course-media" bucket to 209715200 bytes (200 MB)
*/

UPDATE storage.buckets
SET file_size_limit = 209715200
WHERE id = 'course-media';
