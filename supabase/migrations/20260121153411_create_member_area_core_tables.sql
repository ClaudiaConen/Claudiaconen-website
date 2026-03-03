/*
  # KI-Manager Memberbereich - Core Tabellen

  ## Übersicht
  Diese Migration erstellt die Kern-Tabellen für den KI-Manager 2026 Memberbereich:
  - Students (Teilnehmer)
  - Course Modules (9 Kurs-Module)
  - Course Lessons (Lektionen pro Modul)
  - Lesson Downloads (PDFs, Checklisten)

  ## Neue Tabellen

  ### `member_students`
  Speichert alle Teilnehmer des KI-Manager Kurses mit:
  - Authentifizierung (Email + 5-stelliger Access-Code)
  - Gamification (Level, XP, Streak)
  - Profil-Informationen

  ### `member_course_modules`
  Die 9 Hauptmodule des Kurses mit:
  - Metadaten (Titel, Beschreibung, Thumbnail)
  - Schwierigkeitsgrad
  - Lock/Unlock Mechanismus
  - Veröffentlichungs-Status

  ### `member_course_lessons`
  Alle Lektionen innerhalb der Module mit:
  - Video-Integration (Vimeo/YouTube)
  - XP-Belohnungen
  - Quiz/Flashcard Flags
  - Veröffentlichungs-Status

  ### `member_lesson_downloads`
  Herunterladbare Materialien pro Lektion:
  - PDFs, Workbooks, Checklisten
  - File Storage URLs
  - Dateigröße für UX

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Students können nur eigene Daten sehen/ändern
  - Admins haben vollen Zugriff
  - Kurs-Inhalte sind für alle authentifizierten Students lesbar
*/

-- ============================================================================
-- STUDENTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  access_code text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  avatar_url text,
  
  -- Gamification
  level integer DEFAULT 1 CHECK (level >= 1),
  total_xp integer DEFAULT 0 CHECK (total_xp >= 0),
  current_streak integer DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak integer DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date date,
  
  -- Status
  is_active boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  last_login_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Index für schnelle Lookups
CREATE INDEX IF NOT EXISTS idx_member_students_email ON member_students(email);
CREATE INDEX IF NOT EXISTS idx_member_students_access_code ON member_students(access_code);
CREATE INDEX IF NOT EXISTS idx_member_students_is_active ON member_students(is_active);

-- RLS aktivieren
ALTER TABLE member_students ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigene Daten sehen
CREATE POLICY "Students can view own profile"
  ON member_students FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Students können nur eigene Daten aktualisieren (aber nicht access_code oder email ändern)
CREATE POLICY "Students can update own profile"
  ON member_students FOR UPDATE
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (
    email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND email = (SELECT email FROM member_students WHERE id = member_students.id)
    AND access_code = (SELECT access_code FROM member_students WHERE id = member_students.id)
  );

-- Policy: Admins können alle Students sehen
CREATE POLICY "Admins can view all students"
  ON member_students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Students erstellen
CREATE POLICY "Admins can create students"
  ON member_students FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Students aktualisieren
CREATE POLICY "Admins can update students"
  ON member_students FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Students löschen
CREATE POLICY "Admins can delete students"
  ON member_students FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- COURSE MODULES TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_number integer UNIQUE NOT NULL CHECK (module_number >= 1 AND module_number <= 9),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  
  -- Metadaten
  difficulty text DEFAULT 'Einsteiger' CHECK (difficulty IN ('Einsteiger', 'Fortgeschritten', 'Expert')),
  estimated_duration_minutes integer DEFAULT 0 CHECK (estimated_duration_minutes >= 0),
  instructor_name text DEFAULT 'Claudia Conen',
  xp_reward integer DEFAULT 500 CHECK (xp_reward >= 0),
  
  -- Lock Mechanismus
  is_locked boolean DEFAULT false,
  unlock_date timestamptz,
  
  -- Verwaltung
  order_index integer NOT NULL,
  is_published boolean DEFAULT false,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index für Sortierung
CREATE INDEX IF NOT EXISTS idx_member_course_modules_order ON member_course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_member_course_modules_published ON member_course_modules(is_published);

-- RLS aktivieren
ALTER TABLE member_course_modules ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten Students können veröffentlichte Module sehen
CREATE POLICY "Students can view published modules"
  ON member_course_modules FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Policy: Admins können alle Module sehen
CREATE POLICY "Admins can view all modules"
  ON member_course_modules FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Module erstellen
CREATE POLICY "Admins can create modules"
  ON member_course_modules FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Module aktualisieren
CREATE POLICY "Admins can update modules"
  ON member_course_modules FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Module löschen
CREATE POLICY "Admins can delete modules"
  ON member_course_modules FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- COURSE LESSONS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES member_course_modules(id) ON DELETE CASCADE,
  lesson_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  
  -- Video
  video_platform text DEFAULT 'vimeo' CHECK (video_platform IN ('vimeo', 'youtube', 'self-hosted')),
  video_url text NOT NULL,
  video_duration_seconds integer DEFAULT 0 CHECK (video_duration_seconds >= 0),
  thumbnail_url text,
  
  -- Gamification
  xp_reward integer DEFAULT 50 CHECK (xp_reward >= 0),
  has_quiz boolean DEFAULT false,
  has_flashcards boolean DEFAULT false,
  
  -- Verwaltung
  order_index integer NOT NULL,
  is_published boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: lesson_number muss innerhalb eines Moduls unique sein
  UNIQUE(module_id, lesson_number)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_course_lessons_module ON member_course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_member_course_lessons_order ON member_course_lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_member_course_lessons_published ON member_course_lessons(is_published);

-- RLS aktivieren
ALTER TABLE member_course_lessons ENABLE ROW LEVEL SECURITY;

-- Policy: Students können veröffentlichte Lektionen von veröffentlichten Modulen sehen
CREATE POLICY "Students can view published lessons"
  ON member_course_lessons FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM member_course_modules
      WHERE id = member_course_lessons.module_id
      AND is_published = true
    )
  );

-- Policy: Admins können alle Lektionen sehen
CREATE POLICY "Admins can view all lessons"
  ON member_course_lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Lektionen erstellen
CREATE POLICY "Admins can create lessons"
  ON member_course_lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Lektionen aktualisieren
CREATE POLICY "Admins can update lessons"
  ON member_course_lessons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Lektionen löschen
CREATE POLICY "Admins can delete lessons"
  ON member_course_lessons FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- LESSON DOWNLOADS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_lesson_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text DEFAULT 'pdf' CHECK (file_type IN ('pdf', 'docx', 'xlsx', 'zip')),
  file_size_bytes bigint DEFAULT 0 CHECK (file_size_bytes >= 0),
  
  -- Verwaltung
  order_index integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

-- Index für Performance
CREATE INDEX IF NOT EXISTS idx_member_lesson_downloads_lesson ON member_lesson_downloads(lesson_id);

-- RLS aktivieren
ALTER TABLE member_lesson_downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Downloads von veröffentlichten Lektionen sehen
CREATE POLICY "Students can view downloads"
  ON member_lesson_downloads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_course_lessons mcl
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mcl.id = member_lesson_downloads.lesson_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Downloads sehen
CREATE POLICY "Admins can view all downloads"
  ON member_lesson_downloads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Downloads erstellen
CREATE POLICY "Admins can create downloads"
  ON member_lesson_downloads FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Downloads aktualisieren
CREATE POLICY "Admins can update downloads"
  ON member_lesson_downloads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Downloads löschen
CREATE POLICY "Admins can delete downloads"
  ON member_lesson_downloads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );
