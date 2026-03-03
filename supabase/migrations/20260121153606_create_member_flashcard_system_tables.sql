/*
  # KI-Manager Memberbereich - Flashcard System

  ## Übersicht
  Diese Migration erstellt das komplette Flashcard-System mit Spaced Repetition:
  - Flashcard Decks (verknüpft mit Lektionen)
  - Flashcards (Vorder- und Rückseite)
  - Student Flashcard Progress (Mastery Level, Spaced Repetition)

  ## Neue Tabellen

  ### `member_flashcard_decks`
  Flashcard-Decks pro Lektion:
  - Titel und Beschreibung
  - XP Reward wenn Deck gemeistert

  ### `member_flashcards`
  Einzelne Karten innerhalb eines Decks:
  - Vorderseite (Frage)
  - Rückseite (Antwort)
  - Reihenfolge

  ### `member_student_flashcard_progress`
  Lernfortschritt pro Karte mit Spaced Repetition:
  - Mastery Level (0=neu, 1-2=lernend, 3=gemeistert)
  - Last Review Datum
  - Next Review Datum (für Spaced Repetition)
  - Review Count

  ## Spaced Repetition Algorithmus
  - Level 0 (neu): Sofort wiederholen
  - Level 1 (erkannt): In 1 Tag wiederholen
  - Level 2 (gelernt): In 3 Tagen wiederholen
  - Level 3 (gemeistert): In 7 Tagen wiederholen

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Students können Decks/Cards sehen
  - Students können nur eigenen Progress sehen/ändern
  - Admins haben vollen Zugriff
*/

-- ============================================================================
-- FLASHCARD DECKS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_flashcard_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  xp_reward integer DEFAULT 50 CHECK (xp_reward >= 0),
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: Eine Lektion kann nur ein Flashcard Deck haben
  UNIQUE(lesson_id)
);

-- Index für Performance
CREATE INDEX IF NOT EXISTS idx_member_flashcard_decks_lesson ON member_flashcard_decks(lesson_id);

-- RLS aktivieren
ALTER TABLE member_flashcard_decks ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Decks von veröffentlichten Lektionen sehen
CREATE POLICY "Students can view flashcard decks"
  ON member_flashcard_decks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_course_lessons mcl
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mcl.id = member_flashcard_decks.lesson_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Decks sehen
CREATE POLICY "Admins can view all flashcard decks"
  ON member_flashcard_decks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Decks erstellen
CREATE POLICY "Admins can create flashcard decks"
  ON member_flashcard_decks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Decks aktualisieren
CREATE POLICY "Admins can update flashcard decks"
  ON member_flashcard_decks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Decks löschen
CREATE POLICY "Admins can delete flashcard decks"
  ON member_flashcard_decks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- FLASHCARDS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid NOT NULL REFERENCES member_flashcard_decks(id) ON DELETE CASCADE,
  front_text text NOT NULL,
  back_text text NOT NULL,
  order_index integer NOT NULL,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_flashcards_deck ON member_flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_member_flashcards_order ON member_flashcards(order_index);

-- RLS aktivieren
ALTER TABLE member_flashcards ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Karten von zugänglichen Decks sehen
CREATE POLICY "Students can view flashcards"
  ON member_flashcards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_flashcard_decks mfd
      JOIN member_course_lessons mcl ON mfd.lesson_id = mcl.id
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mfd.id = member_flashcards.deck_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Karten sehen
CREATE POLICY "Admins can view all flashcards"
  ON member_flashcards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Karten erstellen
CREATE POLICY "Admins can create flashcards"
  ON member_flashcards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Karten aktualisieren
CREATE POLICY "Admins can update flashcards"
  ON member_flashcards FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Karten löschen
CREATE POLICY "Admins can delete flashcards"
  ON member_flashcards FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT FLASHCARD PROGRESS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_flashcard_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  flashcard_id uuid NOT NULL REFERENCES member_flashcards(id) ON DELETE CASCADE,
  
  -- Mastery Tracking
  mastery_level integer DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 3),
  review_count integer DEFAULT 0 CHECK (review_count >= 0),
  
  -- Spaced Repetition
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann nur einen Progress-Eintrag pro Karte haben
  UNIQUE(student_id, flashcard_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_flashcard_progress_student ON member_student_flashcard_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_flashcard_progress_flashcard ON member_student_flashcard_progress(flashcard_id);
CREATE INDEX IF NOT EXISTS idx_member_student_flashcard_progress_next_review ON member_student_flashcard_progress(next_review_at);

-- RLS aktivieren
ALTER TABLE member_student_flashcard_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigenen Flashcard-Progress sehen
CREATE POLICY "Students can view own flashcard progress"
  ON member_student_flashcard_progress FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Flashcard-Progress erstellen
CREATE POLICY "Students can create own flashcard progress"
  ON member_student_flashcard_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigenen Flashcard-Progress aktualisieren
CREATE POLICY "Students can update own flashcard progress"
  ON member_student_flashcard_progress FOR UPDATE
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

-- Policy: Admins können allen Flashcard-Progress sehen
CREATE POLICY "Admins can view all flashcard progress"
  ON member_student_flashcard_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- HELPER FUNCTION: Calculate Next Review Date (Spaced Repetition)
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_next_review_date(p_mastery_level integer)
RETURNS timestamptz AS $$
BEGIN
  RETURN CASE
    WHEN p_mastery_level = 0 THEN now() -- Sofort wiederholen
    WHEN p_mastery_level = 1 THEN now() + interval '1 day'
    WHEN p_mastery_level = 2 THEN now() + interval '3 days'
    WHEN p_mastery_level >= 3 THEN now() + interval '7 days'
    ELSE now()
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- TRIGGER: Auto-calculate next_review_at when mastery_level changes
-- ============================================================================

CREATE OR REPLACE FUNCTION update_flashcard_next_review()
RETURNS TRIGGER AS $$
BEGIN
  NEW.next_review_at := calculate_next_review_date(NEW.mastery_level);
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_flashcard_next_review ON member_student_flashcard_progress;
CREATE TRIGGER trigger_update_flashcard_next_review
  BEFORE INSERT OR UPDATE OF mastery_level
  ON member_student_flashcard_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_flashcard_next_review();
