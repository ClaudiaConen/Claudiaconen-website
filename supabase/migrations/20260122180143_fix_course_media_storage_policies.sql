/*
  # Fix Storage Policies für course-media Bucket

  1. Änderungen
    - Aktualisiert alle course-media Storage-Policies von auth.uid() zu Email-basierter Authentifizierung
    - Macht die Authentifizierung konsistent mit anderen Member-Area Buckets
    - Ermöglicht Admin-Uploads über die MediaUploader-Komponente

  2. Betroffene Policies
    - Admins can upload course media (INSERT)
    - Admins can update course media (UPDATE)
    - Admins can delete course media (DELETE)

  3. Sicherheit
    - Verwendet die gleiche Email-Vergleichsmethode wie andere Member-Buckets
    - Prüft admin_users Tabelle auf is_active = true
    - Public read access bleibt unverändert
*/

-- Drop alte Policies
DROP POLICY IF EXISTS "Admins can upload course media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update course media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete course media" ON storage.objects;

-- Neue Policies mit Email-basierter Authentifizierung
CREATE POLICY "Admins can upload course media"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'course-media' 
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can update course media"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (
    bucket_id = 'course-media' 
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can delete course media"
  ON storage.objects
  FOR DELETE
  TO public
  USING (
    bucket_id = 'course-media' 
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND admin_users.is_active = true
    )
  );