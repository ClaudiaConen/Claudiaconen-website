/*
  # KI-Manager Memberbereich - Progress Tracking

  ## Übersicht
  Diese Migration erstellt alle Tabellen für Fortschritts-Tracking:
  - Student Progress pro Lektion (Video-Fortschritt, Abschluss, Notizen)
  - Student Progress pro Modul (Aggregierte Statistiken)

  ## Neue Tabellen

  ### `member_student_lesson_progress`
  Detaillierter Fortschritt pro Student pro Lektion:
  - Completion Status (abgeschlossen ja/nein)
  - Video Progress (wie viele Sekunden angesehen)
  - Completion Percentage (0-100%)
  - Notizen des Students
  - Timestamps für Tracking

  ### `member_student_module_progress`
  Aggregierter Fortschritt pro Student pro Modul:
  - Anzahl abgeschlossener Lektionen
  - Gesamtanzahl Lektionen
  - Berechneter Completion Percentage
  - Start- und Abschlusszeitpunkt

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Students können nur eigenen Fortschritt sehen/ändern
  - Admins haben Lesezugriff auf allen Fortschritt (für Analytics)
*/

-- ============================================================================
-- STUDENT LESSON PROGRESS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  
  -- Completion Status
  is_completed boolean DEFAULT false,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  
  -- Video Progress
  video_progress_seconds integer DEFAULT 0 CHECK (video_progress_seconds >= 0),
  
  -- Notizen
  notes text,
  
  -- Timestamps
  completed_at timestamptz,
  last_watched_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann nur einen Progress-Eintrag pro Lektion haben
  UNIQUE(student_id, lesson_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_lesson_progress_student ON member_student_lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_lesson_progress_lesson ON member_student_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_member_student_lesson_progress_completed ON member_student_lesson_progress(is_completed);

-- RLS aktivieren
ALTER TABLE member_student_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigenen Fortschritt sehen
CREATE POLICY "Students can view own lesson progress"
  ON member_student_lesson_progress FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Fortschritt erstellen
CREATE POLICY "Students can create own lesson progress"
  ON member_student_lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Fortschritt aktualisieren
CREATE POLICY "Students can update own lesson progress"
  ON member_student_lesson_progress FOR UPDATE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können allen Fortschritt sehen
CREATE POLICY "Admins can view all lesson progress"
  ON member_student_lesson_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT MODULE PROGRESS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_module_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES member_course_modules(id) ON DELETE CASCADE,
  
  -- Progress Tracking
  completed_lessons integer DEFAULT 0 CHECK (completed_lessons >= 0),
  total_lessons integer DEFAULT 0 CHECK (total_lessons >= 0),
  completion_percentage integer GENERATED ALWAYS AS (
    CASE 
      WHEN total_lessons > 0 THEN (completed_lessons * 100 / total_lessons)
      ELSE 0
    END
  ) STORED,
  
  -- Timestamps
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann nur einen Progress-Eintrag pro Modul haben
  UNIQUE(student_id, module_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_module_progress_student ON member_student_module_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_module_progress_module ON member_student_module_progress(module_id);

-- RLS aktivieren
ALTER TABLE member_student_module_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigenen Modul-Fortschritt sehen
CREATE POLICY "Students can view own module progress"
  ON member_student_module_progress FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Modul-Fortschritt erstellen
CREATE POLICY "Students can create own module progress"
  ON member_student_module_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Modul-Fortschritt aktualisieren
CREATE POLICY "Students can update own module progress"
  ON member_student_module_progress FOR UPDATE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können allen Modul-Fortschritt sehen
CREATE POLICY "Admins can view all module progress"
  ON member_student_module_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- HELPER FUNCTION: Update Module Progress when Lesson Progress changes
-- ============================================================================

CREATE OR REPLACE FUNCTION update_module_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_module_id uuid;
  v_total_lessons integer;
  v_completed_lessons integer;
BEGIN
  -- Get module_id from lesson
  SELECT module_id INTO v_module_id
  FROM member_course_lessons
  WHERE id = NEW.lesson_id;
  
  -- Count total published lessons in module
  SELECT COUNT(*) INTO v_total_lessons
  FROM member_course_lessons
  WHERE module_id = v_module_id
  AND is_published = true;
  
  -- Count completed lessons for this student in this module
  SELECT COUNT(*) INTO v_completed_lessons
  FROM member_student_lesson_progress lp
  JOIN member_course_lessons l ON lp.lesson_id = l.id
  WHERE lp.student_id = NEW.student_id
  AND l.module_id = v_module_id
  AND lp.is_completed = true;
  
  -- Upsert module progress
  INSERT INTO member_student_module_progress (
    student_id,
    module_id,
    completed_lessons,
    total_lessons,
    updated_at,
    completed_at
  )
  VALUES (
    NEW.student_id,
    v_module_id,
    v_completed_lessons,
    v_total_lessons,
    now(),
    CASE WHEN v_completed_lessons = v_total_lessons AND v_total_lessons > 0 THEN now() ELSE NULL END
  )
  ON CONFLICT (student_id, module_id)
  DO UPDATE SET
    completed_lessons = v_completed_lessons,
    total_lessons = v_total_lessons,
    updated_at = now(),
    completed_at = CASE 
      WHEN v_completed_lessons = v_total_lessons AND v_total_lessons > 0 THEN now() 
      ELSE member_student_module_progress.completed_at 
    END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Update module progress when lesson progress changes
DROP TRIGGER IF EXISTS trigger_update_module_progress ON member_student_lesson_progress;
CREATE TRIGGER trigger_update_module_progress
  AFTER INSERT OR UPDATE OF is_completed
  ON member_student_lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_module_progress();
