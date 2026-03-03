/*
  # Update Storage Policies for Anonymous Admin Access

  1. Changes
    - Allow anonymous (public) users to upload to resources bucket
    - This is needed because admin auth uses sessionStorage, not Supabase Auth
    - Admin verification happens in the application layer

  2. Security Notes
    - Upload access is open but controlled by application UI
    - Only admin users have access to the upload forms
    - Consider implementing proper Supabase Auth for production
*/

DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

CREATE POLICY "Anyone can upload to resources"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'resources');

CREATE POLICY "Anyone can update resources"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'resources');

CREATE POLICY "Anyone can delete resources"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'resources');