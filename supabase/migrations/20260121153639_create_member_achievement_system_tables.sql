/*
  # KI-Manager Memberbereich - Achievement/Badge System

  ## Übersicht
  Diese Migration erstellt das Achievement/Badge System:
  - Achievements (Badge-Definitionen mit Kriterien)
  - Student Achievements (Freigeschaltete Badges pro Student)

  ## Neue Tabellen

  ### `member_achievements`
  Badge-Definitionen:
  - Eindeutiger Key (z.B. 'early_adopter', 'quiz_master')
  - Titel und Beschreibung
  - Icon (Emoji)
  - Kriterien als JSON (für automatische Freischaltung)
  - XP Reward bei Freischaltung

  Vordefinierte Badges:
  - 🚀 Early Adopter (Registrierung in erster Woche)
  - ⚡ Schnelllerner (3 Lektionen an einem Tag)
  - 🎯 Quiz Master (5 Quizzes mit 100%)
  - 🔥 Streak Champion (7 Tage Streak)
  - 📚 Bücherwurm (Alle PDFs heruntergeladen)
  - 🏆 Perfektionist (Alle Module 100%)

  ### `member_student_achievements`
  Tracking welcher Student welche Badges freigeschaltet hat:
  - Student ID
  - Achievement ID
  - Unlock Timestamp

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Alle können Achievement-Definitionen sehen
  - Students können nur eigene freigeschalteten Badges sehen
  - Admins haben vollen Zugriff
*/

-- ============================================================================
-- ACHIEVEMENTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon_emoji text NOT NULL,
  criteria_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  xp_reward integer DEFAULT 100 CHECK (xp_reward >= 0),
  is_active boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index für schnelle Lookups
CREATE INDEX IF NOT EXISTS idx_member_achievements_key ON member_achievements(achievement_key);
CREATE INDEX IF NOT EXISTS idx_member_achievements_active ON member_achievements(is_active);

-- RLS aktivieren
ALTER TABLE member_achievements ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten User können aktive Achievements sehen
CREATE POLICY "Everyone can view active achievements"
  ON member_achievements FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policy: Admins können alle Achievements sehen
CREATE POLICY "Admins can view all achievements"
  ON member_achievements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Achievements erstellen
CREATE POLICY "Admins can create achievements"
  ON member_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Achievements aktualisieren
CREATE POLICY "Admins can update achievements"
  ON member_achievements FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Achievements löschen
CREATE POLICY "Admins can delete achievements"
  ON member_achievements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT ACHIEVEMENTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES member_achievements(id) ON DELETE CASCADE,
  
  -- Timestamps
  unlocked_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann ein Achievement nur einmal freischalten
  UNIQUE(student_id, achievement_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_achievements_student ON member_student_achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_achievements_achievement ON member_student_achievements(achievement_id);

-- RLS aktivieren
ALTER TABLE member_student_achievements ENABLE ROW LEVEL SECURITY;

-- Policy: Students können nur eigene freigeschalteten Achievements sehen
CREATE POLICY "Students can view own achievements"
  ON member_student_achievements FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigene Achievements freischalten (via Edge Function)
CREATE POLICY "Students can unlock own achievements"
  ON member_student_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können alle Student Achievements sehen
CREATE POLICY "Admins can view all student achievements"
  ON member_student_achievements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Student Achievements manuell vergeben
CREATE POLICY "Admins can create student achievements"
  ON member_student_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Student Achievements löschen
CREATE POLICY "Admins can delete student achievements"
  ON member_student_achievements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- TRIGGER: Add XP when Achievement is unlocked
-- ============================================================================

CREATE OR REPLACE FUNCTION award_achievement_xp()
RETURNS TRIGGER AS $$
DECLARE
  v_xp_reward integer;
BEGIN
  -- Get XP reward from achievement
  SELECT xp_reward INTO v_xp_reward
  FROM member_achievements
  WHERE id = NEW.achievement_id;
  
  -- Add XP to student
  UPDATE member_students
  SET 
    total_xp = total_xp + v_xp_reward,
    level = LEAST(100, 1 + FLOOR((total_xp + v_xp_reward) / 1000)),
    updated_at = now()
  WHERE id = NEW.student_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_award_achievement_xp ON member_student_achievements;
CREATE TRIGGER trigger_award_achievement_xp
  AFTER INSERT
  ON member_student_achievements
  FOR EACH ROW
  EXECUTE FUNCTION award_achievement_xp();
