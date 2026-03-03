/*
  # KI-Manager Memberbereich - Storage Buckets

  ## Übersicht
  Diese Migration erstellt alle Storage Buckets für den Member-Bereich:
  - member-videos (Video-Thumbnails)
  - member-pdfs (Downloadbare PDFs)
  - member-avatars (Student-Avatare)
  - member-modules (Modul-Thumbnails)

  ## Storage Buckets

  ### `member-videos`
  Für Video-Thumbnails und Preview-Bilder

  ### `member-pdfs`
  Für herunterladbare PDFs, Workbooks, Checklisten

  ### `member-avatars`
  Für Student-Profilbilder

  ### `member-modules`
  Für Modul-Thumbnails und Header-Bilder

  ## Sicherheit
  - Authenticated Students können lesen
  - Nur Admins können hochladen/löschen
  - Public URLs für bessere Performance
*/

-- ============================================================================
-- CREATE STORAGE BUCKETS
-- ============================================================================

-- Member Videos Bucket (Thumbnails)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-videos',
  'member-videos',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Member PDFs Bucket (Downloads)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-pdfs',
  'member-pdfs',
  true,
  52428800, -- 50MB
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip']
)
ON CONFLICT (id) DO NOTHING;

-- Member Avatars Bucket (Profile Pictures)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-avatars',
  'member-avatars',
  true,
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Member Modules Bucket (Module Thumbnails)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-modules',
  'member-modules',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES - member-videos
-- ============================================================================

-- Policy: Everyone can view video thumbnails
CREATE POLICY "Public can view member videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'member-videos');

-- Policy: Admins can upload video thumbnails
CREATE POLICY "Admins can upload member videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'member-videos'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can update video thumbnails
CREATE POLICY "Admins can update member videos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'member-videos'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can delete video thumbnails
CREATE POLICY "Admins can delete member videos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'member-videos'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- ============================================================================
-- STORAGE POLICIES - member-pdfs
-- ============================================================================

-- Policy: Authenticated students can view PDFs
CREATE POLICY "Students can view member PDFs"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'member-pdfs'
    AND (
      auth.role() = 'authenticated'
      OR EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
        AND is_active = true
      )
    )
  );

-- Policy: Admins can upload PDFs
CREATE POLICY "Admins can upload member PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'member-pdfs'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can update PDFs
CREATE POLICY "Admins can update member PDFs"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'member-pdfs'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can delete PDFs
CREATE POLICY "Admins can delete member PDFs"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'member-pdfs'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- ============================================================================
-- STORAGE POLICIES - member-avatars
-- ============================================================================

-- Policy: Everyone can view avatars
CREATE POLICY "Public can view member avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'member-avatars');

-- Policy: Students can upload own avatar
CREATE POLICY "Students can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'member-avatars'
    AND (
      -- Check if student owns this path (student_id in path)
      name LIKE (
        SELECT id::text || '%'
        FROM member_students
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      )
      OR EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
        AND is_active = true
      )
    )
  );

-- Policy: Students can update own avatar
CREATE POLICY "Students can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'member-avatars'
    AND (
      name LIKE (
        SELECT id::text || '%'
        FROM member_students
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      )
      OR EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
        AND is_active = true
      )
    )
  );

-- Policy: Students can delete own avatar
CREATE POLICY "Students can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'member-avatars'
    AND (
      name LIKE (
        SELECT id::text || '%'
        FROM member_students
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      )
      OR EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
        AND is_active = true
      )
    )
  );

-- ============================================================================
-- STORAGE POLICIES - member-modules
-- ============================================================================

-- Policy: Everyone can view module thumbnails
CREATE POLICY "Public can view member module images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'member-modules');

-- Policy: Admins can upload module thumbnails
CREATE POLICY "Admins can upload member module images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'member-modules'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can update module thumbnails
CREATE POLICY "Admins can update member module images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'member-modules'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );

-- Policy: Admins can delete module thumbnails
CREATE POLICY "Admins can delete member module images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'member-modules'
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (current_setting('request.jwt.claims', true)::json->>'email')
      AND is_active = true
    )
  );
