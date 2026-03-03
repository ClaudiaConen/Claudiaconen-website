/*
  # Storage Buckets für Kurs-Medien

  ## Übersicht
  Erstellt Storage Buckets für:
  - course-media: Alle Kurs-bezogenen Medien (Bilder, Audio, PDFs, Videos)

  ## Struktur innerhalb des Buckets:
  - /thumbnails: Modul-Vorschaubilder
  - /audio: Audio-Dateien für Lektionen
  - /documents: PDF-Downloads
  - /images: Allgemeine Bilder
  - /videos: Selbst-gehostete Videos (optional)

  ## Security
  - Admins: Vollzugriff (Upload, Update, Delete)
  - Members: Nur Lesezugriff
*/

-- Storage Bucket erstellen
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-media', 'course-media', true)
ON CONFLICT (id) DO NOTHING;

-- Admin-Vollzugriff für Upload
DROP POLICY IF EXISTS "Admins can upload course media" ON storage.objects;
CREATE POLICY "Admins can upload course media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'course-media' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

-- Admin-Vollzugriff für Update
DROP POLICY IF EXISTS "Admins can update course media" ON storage.objects;
CREATE POLICY "Admins can update course media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'course-media' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    bucket_id = 'course-media' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

-- Admin-Vollzugriff für Delete
DROP POLICY IF EXISTS "Admins can delete course media" ON storage.objects;
CREATE POLICY "Admins can delete course media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'course-media' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

-- Öffentlicher Lesezugriff für alle (da Bucket public ist)
DROP POLICY IF EXISTS "Public read access for course media" ON storage.objects;
CREATE POLICY "Public read access for course media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'course-media');
