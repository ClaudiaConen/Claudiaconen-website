/*
  # KI-Manager Memberbereich - Ankündigungen

  ## Übersicht
  Diese Migration erstellt das Ankündigungs-System:
  - Announcements (News/Updates vom Admin)
  - Student Announcement Reads (Gelesen-Status)

  ## Neue Tabellen

  ### `member_announcements`
  Ankündigungen vom Admin:
  - Titel und Content (Markdown/HTML)
  - Announcement Type (Info, Warning, Success, Urgent)
  - Pinned Flag (oben festhalten)
  - Created by Admin
  - Veröffentlichungsdatum
  - Ablaufdatum (optional)

  ### `member_student_announcement_reads`
  Tracking welcher Student welche Ankündigung gelesen hat:
  - Student ID
  - Announcement ID
  - Read Timestamp

  ## Features
  - Admins erstellen Ankündigungen
  - Type-basierte Styling (Info/Warning/Success/Urgent)
  - Pinned Announcements oben
  - Auto-Ablauf nach Datum
  - Read-Status pro Student

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Alle authentifizierten Students können Ankündigungen sehen
  - Students können eigenen Read-Status setzen
  - Admins haben vollen Zugriff
*/

-- ============================================================================
-- ANNOUNCEMENTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  
  -- Type
  announcement_type text DEFAULT 'info' CHECK (announcement_type IN ('info', 'warning', 'success', 'urgent')),
  
  -- Display
  is_pinned boolean DEFAULT false,
  
  -- Admin
  created_by_admin_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  
  -- Timing
  published_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_announcements_type ON member_announcements(announcement_type);
CREATE INDEX IF NOT EXISTS idx_member_announcements_pinned ON member_announcements(is_pinned);
CREATE INDEX IF NOT EXISTS idx_member_announcements_published ON member_announcements(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_member_announcements_expires ON member_announcements(expires_at);

-- RLS aktivieren
ALTER TABLE member_announcements ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten Students können aktive Ankündigungen sehen
CREATE POLICY "Everyone can view active announcements"
  ON member_announcements FOR SELECT
  TO authenticated
  USING (
    published_at <= now()
    AND (expires_at IS NULL OR expires_at > now())
  );

-- Policy: Admins können alle Ankündigungen sehen
CREATE POLICY "Admins can view all announcements"
  ON member_announcements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Ankündigungen erstellen
CREATE POLICY "Admins can create announcements"
  ON member_announcements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Ankündigungen aktualisieren
CREATE POLICY "Admins can update announcements"
  ON member_announcements FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Ankündigungen löschen
CREATE POLICY "Admins can delete announcements"
  ON member_announcements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT ANNOUNCEMENT READS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_announcement_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id uuid NOT NULL REFERENCES member_announcements(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  
  -- Timestamps
  read_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann eine Ankündigung nur einmal als gelesen markieren
  UNIQUE(announcement_id, student_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_announcement_reads_announcement ON member_student_announcement_reads(announcement_id);
CREATE INDEX IF NOT EXISTS idx_member_student_announcement_reads_student ON member_student_announcement_reads(student_id);

-- RLS aktivieren
ALTER TABLE member_student_announcement_reads ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigenen Read-Status sehen
CREATE POLICY "Students can view own read status"
  ON member_student_announcement_reads FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Read-Status setzen
CREATE POLICY "Students can mark as read"
  ON member_student_announcement_reads FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können alle Read-Status sehen (für Analytics)
CREATE POLICY "Admins can view all read status"
  ON member_student_announcement_reads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- HELPER FUNCTION: Get unread count for student
-- ============================================================================

CREATE OR REPLACE FUNCTION get_unread_announcements_count(p_student_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM member_announcements ma
    WHERE ma.published_at <= now()
    AND (ma.expires_at IS NULL OR ma.expires_at > now())
    AND NOT EXISTS (
      SELECT 1 FROM member_student_announcement_reads
      WHERE announcement_id = ma.id
      AND student_id = p_student_id
    )
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- HELPER FUNCTION: Get read count for announcement
-- ============================================================================

CREATE OR REPLACE FUNCTION get_announcement_read_count(p_announcement_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM member_student_announcement_reads
    WHERE announcement_id = p_announcement_id
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- HELPER FUNCTION: Check if student has read announcement
-- ============================================================================

CREATE OR REPLACE FUNCTION has_student_read_announcement(
  p_student_id uuid,
  p_announcement_id uuid
)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM member_student_announcement_reads
    WHERE student_id = p_student_id
    AND announcement_id = p_announcement_id
  );
END;
$$ LANGUAGE plpgsql STABLE;
