/*
  # KI-Manager Memberbereich - Quiz System

  ## Übersicht
  Diese Migration erstellt das komplette Quiz-System:
  - Quizzes (verknüpft mit Lektionen)
  - Quiz Questions (Fragen mit Typ)
  - Quiz Answers (Antwortoptionen mit richtig/falsch)
  - Student Quiz Attempts (Versuch-Historie mit Scores)

  ## Neue Tabellen

  ### `member_quizzes`
  Quiz-Definitionen pro Lektion:
  - Titel und Beschreibung
  - Passing Score (Mindestpunktzahl zum Bestehen)
  - XP Reward bei Bestehen

  ### `member_quiz_questions`
  Fragen innerhalb eines Quiz:
  - Fragetext
  - Fragetyp (Single Choice, Multiple Choice)
  - Reihenfolge
  - Optionale Erklärung

  ### `member_quiz_answers`
  Antwortoptionen pro Frage:
  - Antworttext
  - Richtig/Falsch Flag
  - Reihenfolge

  ### `member_student_quiz_attempts`
  Alle Quiz-Versuche von Students:
  - Score (0-100%)
  - Passed (ja/nein)
  - Antworten als JSON
  - Verdiente XP
  - Zeitstempel

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Students können Quiz-Definitionen sehen
  - Students können nur eigene Versuche sehen/erstellen
  - Admins haben vollen Zugriff
*/

-- ============================================================================
-- QUIZZES TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  passing_score integer DEFAULT 70 CHECK (passing_score >= 0 AND passing_score <= 100),
  xp_reward integer DEFAULT 100 CHECK (xp_reward >= 0),
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: Eine Lektion kann nur ein Quiz haben
  UNIQUE(lesson_id)
);

-- Index für Performance
CREATE INDEX IF NOT EXISTS idx_member_quizzes_lesson ON member_quizzes(lesson_id);

-- RLS aktivieren
ALTER TABLE member_quizzes ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Quizzes von veröffentlichten Lektionen sehen
CREATE POLICY "Students can view quizzes"
  ON member_quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_course_lessons mcl
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mcl.id = member_quizzes.lesson_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Quizzes sehen
CREATE POLICY "Admins can view all quizzes"
  ON member_quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Quizzes erstellen
CREATE POLICY "Admins can create quizzes"
  ON member_quizzes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Quizzes aktualisieren
CREATE POLICY "Admins can update quizzes"
  ON member_quizzes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Quizzes löschen
CREATE POLICY "Admins can delete quizzes"
  ON member_quizzes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- QUIZ QUESTIONS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES member_quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'single_choice' CHECK (question_type IN ('single_choice', 'multiple_choice')),
  order_index integer NOT NULL,
  explanation text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_quiz_questions_quiz ON member_quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_member_quiz_questions_order ON member_quiz_questions(order_index);

-- RLS aktivieren
ALTER TABLE member_quiz_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Fragen von zugänglichen Quizzes sehen
CREATE POLICY "Students can view quiz questions"
  ON member_quiz_questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_quizzes mq
      JOIN member_course_lessons mcl ON mq.lesson_id = mcl.id
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mq.id = member_quiz_questions.quiz_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Fragen sehen
CREATE POLICY "Admins can view all questions"
  ON member_quiz_questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Fragen erstellen
CREATE POLICY "Admins can create questions"
  ON member_quiz_questions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Fragen aktualisieren
CREATE POLICY "Admins can update questions"
  ON member_quiz_questions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Fragen löschen
CREATE POLICY "Admins can delete questions"
  ON member_quiz_questions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- QUIZ ANSWERS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES member_quiz_questions(id) ON DELETE CASCADE,
  answer_text text NOT NULL,
  is_correct boolean DEFAULT false,
  order_index integer NOT NULL,
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_quiz_answers_question ON member_quiz_answers(question_id);

-- RLS aktivieren
ALTER TABLE member_quiz_answers ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Antworten von zugänglichen Fragen sehen
CREATE POLICY "Students can view quiz answers"
  ON member_quiz_answers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_quiz_questions mqq
      JOIN member_quizzes mq ON mqq.quiz_id = mq.id
      JOIN member_course_lessons mcl ON mq.lesson_id = mcl.id
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mqq.id = member_quiz_answers.question_id
      AND mcl.is_published = true
      AND mcm.is_published = true
    )
  );

-- Policy: Admins können alle Antworten sehen
CREATE POLICY "Admins can view all answers"
  ON member_quiz_answers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Antworten erstellen
CREATE POLICY "Admins can create answers"
  ON member_quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Antworten aktualisieren
CREATE POLICY "Admins can update answers"
  ON member_quiz_answers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Antworten löschen
CREATE POLICY "Admins can delete answers"
  ON member_quiz_answers FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT QUIZ ATTEMPTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  quiz_id uuid NOT NULL REFERENCES member_quizzes(id) ON DELETE CASCADE,
  
  -- Results
  score integer DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  passed boolean DEFAULT false,
  answers_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  xp_earned integer DEFAULT 0 CHECK (xp_earned >= 0),
  
  -- Timestamps
  completed_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_student ON member_student_quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_quiz ON member_student_quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_passed ON member_student_quiz_attempts(passed);

-- RLS aktivieren
ALTER TABLE member_student_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigene Versuche sehen
CREATE POLICY "Students can view own quiz attempts"
  ON member_student_quiz_attempts FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigene Versuche erstellen
CREATE POLICY "Students can create own quiz attempts"
  ON member_student_quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können alle Versuche sehen
CREATE POLICY "Admins can view all quiz attempts"
  ON member_student_quiz_attempts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );
