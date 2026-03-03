/*
  # KI-Manager Memberbereich - Initial Seeds

  ## Übersicht
  Diese Migration fügt initiale Daten ein:
  - 6 vordefinierte Achievements/Badges
  - 5 Forum-Kategorien

  ## Achievements
  1. 🚀 Early Adopter - Registrierung in erster Woche
  2. ⚡ Schnelllerner - 3 Lektionen an einem Tag
  3. 🎯 Quiz Master - 5 Quizzes mit 100%
  4. 🔥 Streak Champion - 7 Tage Streak
  5. 📚 Bücherwurm - Alle PDFs heruntergeladen
  6. 🏆 Perfektionist - Alle Module 100%

  ## Forum-Kategorien
  1. Allgemeine Fragen
  2. KI-Tools & Technologie
  3. Praxis & Umsetzung
  4. Erfolgsgeschichten
  5. Feedback & Vorschläge
*/

-- ============================================================================
-- SEED ACHIEVEMENTS
-- ============================================================================

INSERT INTO member_achievements (achievement_key, title, description, icon_emoji, criteria_json, xp_reward, is_active)
VALUES
  (
    'early_adopter',
    'Early Adopter',
    'Registrierung in der ersten Woche des Kurses',
    '🚀',
    '{"type": "early_registration", "days": 7}'::jsonb,
    100,
    true
  ),
  (
    'schnelllerner',
    'Schnelllerner',
    'Schließe 3 Lektionen an einem Tag ab',
    '⚡',
    '{"type": "lessons_per_day", "count": 3}'::jsonb,
    150,
    true
  ),
  (
    'quiz_master',
    'Quiz Master',
    'Bestehe 5 Quizzes mit 100% Punktzahl',
    '🎯',
    '{"type": "perfect_quizzes", "count": 5}'::jsonb,
    200,
    true
  ),
  (
    'streak_champion',
    'Streak Champion',
    'Erreiche einen 7-Tage-Streak',
    '🔥',
    '{"type": "streak_days", "days": 7}'::jsonb,
    250,
    true
  ),
  (
    'buecherwurm',
    'Bücherwurm',
    'Lade alle verfügbaren PDFs herunter',
    '📚',
    '{"type": "all_pdfs_downloaded"}'::jsonb,
    150,
    true
  ),
  (
    'perfektionist',
    'Perfektionist',
    'Schließe alle Module mit 100% ab',
    '🏆',
    '{"type": "all_modules_completed"}'::jsonb,
    500,
    true
  )
ON CONFLICT (achievement_key) DO NOTHING;

-- ============================================================================
-- SEED FORUM CATEGORIES
-- ============================================================================

INSERT INTO member_forum_categories (name, description, icon, order_index, is_active)
VALUES
  (
    'Allgemeine Fragen',
    'Stelle allgemeine Fragen zum Kurs und zur Plattform',
    '💬',
    1,
    true
  ),
  (
    'KI-Tools & Technologie',
    'Diskutiere über KI-Tools, Software und technische Themen',
    '🤖',
    2,
    true
  ),
  (
    'Praxis & Umsetzung',
    'Teile Erfahrungen und praktische Tipps zur Umsetzung',
    '💼',
    3,
    true
  ),
  (
    'Erfolgsgeschichten',
    'Teile deine Erfolge und inspiriere andere Teilnehmer',
    '🎉',
    4,
    true
  ),
  (
    'Feedback & Vorschläge',
    'Gib Feedback zum Kurs und mache Verbesserungsvorschläge',
    '💡',
    5,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- HELPER VIEW: Student Dashboard Stats
-- ============================================================================

CREATE OR REPLACE VIEW member_student_dashboard_stats AS
SELECT
  s.id AS student_id,
  s.email,
  s.first_name,
  s.last_name,
  s.level,
  s.total_xp,
  s.current_streak,
  s.longest_streak,
  
  -- Module Progress
  COALESCE(
    (
      SELECT AVG(smp.completion_percentage)
      FROM member_student_module_progress smp
      WHERE smp.student_id = s.id
    ),
    0
  ) AS overall_progress_percentage,
  
  -- Completed Lessons Count
  (
    SELECT COUNT(*)
    FROM member_student_lesson_progress slp
    WHERE slp.student_id = s.id
    AND slp.is_completed = true
  ) AS completed_lessons_count,
  
  -- Total Available Lessons Count
  (
    SELECT COUNT(*)
    FROM member_course_lessons mcl
    JOIN member_course_modules mcm ON mcl.module_id = mcm.id
    WHERE mcl.is_published = true
    AND mcm.is_published = true
  ) AS total_lessons_count,
  
  -- Quiz Attempts Count
  (
    SELECT COUNT(*)
    FROM member_student_quiz_attempts sqat
    WHERE sqat.student_id = s.id
  ) AS quiz_attempts_count,
  
  -- Passed Quizzes Count
  (
    SELECT COUNT(*)
    FROM member_student_quiz_attempts sqat
    WHERE sqat.student_id = s.id
    AND sqat.passed = true
  ) AS passed_quizzes_count,
  
  -- Achievements Count
  (
    SELECT COUNT(*)
    FROM member_student_achievements sa
    WHERE sa.student_id = s.id
  ) AS achievements_count,
  
  -- Forum Posts Count
  (
    SELECT COUNT(*)
    FROM member_forum_posts fp
    WHERE fp.student_id = s.id
  ) AS forum_posts_count,
  
  -- Last Activity
  s.last_activity_date,
  s.last_login_at,
  s.created_at
  
FROM member_students s
WHERE s.is_active = true;

-- Grant access to authenticated users
GRANT SELECT ON member_student_dashboard_stats TO authenticated;

-- ============================================================================
-- HELPER VIEW: Module Progress Overview
-- ============================================================================

CREATE OR REPLACE VIEW member_module_progress_overview AS
SELECT
  mcm.id AS module_id,
  mcm.module_number,
  mcm.title AS module_title,
  mcm.thumbnail_url,
  mcm.difficulty,
  mcm.estimated_duration_minutes,
  mcm.is_locked,
  
  -- Lesson Counts
  (
    SELECT COUNT(*)
    FROM member_course_lessons mcl
    WHERE mcl.module_id = mcm.id
    AND mcl.is_published = true
  ) AS total_lessons,
  
  -- Total Duration (sum of all lesson durations)
  (
    SELECT SUM(mcl.video_duration_seconds)
    FROM member_course_lessons mcl
    WHERE mcl.module_id = mcm.id
    AND mcl.is_published = true
  ) AS total_duration_seconds,
  
  -- Total XP Available
  mcm.xp_reward + (
    SELECT COALESCE(SUM(mcl.xp_reward), 0)
    FROM member_course_lessons mcl
    WHERE mcl.module_id = mcm.id
    AND mcl.is_published = true
  ) AS total_xp_available,
  
  mcm.order_index,
  mcm.is_published

FROM member_course_modules mcm
WHERE mcm.is_published = true
ORDER BY mcm.order_index;

-- Grant access to authenticated users
GRANT SELECT ON member_module_progress_overview TO authenticated;

-- ============================================================================
-- HELPER FUNCTION: Get Next Lesson for Student
-- ============================================================================

CREATE OR REPLACE FUNCTION get_next_lesson_for_student(p_student_id uuid)
RETURNS TABLE (
  lesson_id uuid,
  lesson_title text,
  module_id uuid,
  module_title text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mcl.id AS lesson_id,
    mcl.title AS lesson_title,
    mcm.id AS module_id,
    mcm.title AS module_title
  FROM member_course_lessons mcl
  JOIN member_course_modules mcm ON mcl.module_id = mcm.id
  LEFT JOIN member_student_lesson_progress slp ON slp.lesson_id = mcl.id AND slp.student_id = p_student_id
  WHERE mcl.is_published = true
  AND mcm.is_published = true
  AND (slp.is_completed IS NULL OR slp.is_completed = false)
  ORDER BY mcm.order_index, mcl.order_index
  LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- HELPER FUNCTION: Get Student Rank by XP
-- ============================================================================

CREATE OR REPLACE FUNCTION get_student_rank(p_student_id uuid)
RETURNS integer AS $$
DECLARE
  v_rank integer;
BEGIN
  SELECT rank INTO v_rank
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (ORDER BY total_xp DESC) AS rank
    FROM member_students
    WHERE is_active = true
  ) ranked
  WHERE id = p_student_id;
  
  RETURN COALESCE(v_rank, 0);
END;
$$ LANGUAGE plpgsql STABLE;
