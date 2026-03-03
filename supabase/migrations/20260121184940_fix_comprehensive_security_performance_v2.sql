/*
  # Comprehensive Security and Performance Fixes v2

  ## Changes Made
  
  ### 1. Add Missing Foreign Key Indexes
  - Add index on bookings(appointment_type_id)
  - Add index on content_uploads(content_plan_id)
  - Add index on member_announcements(created_by_admin_id)
  
  ### 2. Fix RLS Performance Issues
  - Replace `auth.<function>()` with `(select auth.<function>())` in all policies
  - This prevents re-evaluation for each row
  
  ### 3. Fix "Always True" RLS Policies
  - Replace overly permissive policies with proper admin checks
  
  ### 4. Fix Function Search Paths
  - Set explicit search_path on all mutable functions
  
  ### 5. Fix Security Definer Views
  - Convert to security_invoker views
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_bookings_appointment_type_id 
  ON bookings(appointment_type_id);

CREATE INDEX IF NOT EXISTS idx_content_uploads_content_plan_id 
  ON content_uploads(content_plan_id);

CREATE INDEX IF NOT EXISTS idx_member_announcements_created_by_admin_id 
  ON member_announcements(created_by_admin_id);

-- =====================================================
-- 2. FIX RLS PERFORMANCE - user_points & user_achievements
-- =====================================================

DO $$
BEGIN
  -- user_points table (uses email)
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_points' AND policyname = 'Users can view own points') THEN
    DROP POLICY "Users can view own points" ON user_points;
  END IF;
  
  CREATE POLICY "Users can view own points"
    ON user_points FOR SELECT
    TO authenticated
    USING (email = (select auth.jwt()->>'email'));

  -- user_achievements table (uses email)
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_achievements' AND policyname = 'Users can view own achievements') THEN
    DROP POLICY "Users can view own achievements" ON user_achievements;
  END IF;
  
  CREATE POLICY "Users can view own achievements"
    ON user_achievements FOR SELECT
    TO authenticated
    USING (email = (select auth.jwt()->>'email'));
END $$;

-- =====================================================
-- 3. FIX RLS PERFORMANCE - member_students
-- =====================================================

DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can create students" ON member_students;
  DROP POLICY IF EXISTS "Admins can delete students" ON member_students;
  DROP POLICY IF EXISTS "Admins can update students" ON member_students;
  DROP POLICY IF EXISTS "Admins can view all students" ON member_students;
  DROP POLICY IF EXISTS "Students can update own profile" ON member_students;
  DROP POLICY IF EXISTS "Students can view own profile" ON member_students;
  DROP POLICY IF EXISTS "Admins and students can view" ON member_students;

  CREATE POLICY "Admins can manage students"
    ON member_students FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view and update own profile"
    ON member_students FOR ALL
    TO authenticated
    USING (id = (select auth.uid()))
    WITH CHECK (id = (select auth.uid()));
END $$;

-- =====================================================
-- 4. FIX RLS PERFORMANCE - member_course_modules
-- =====================================================

DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can create modules" ON member_course_modules;
  DROP POLICY IF EXISTS "Admins can delete modules" ON member_course_modules;
  DROP POLICY IF EXISTS "Admins can update modules" ON member_course_modules;
  DROP POLICY IF EXISTS "Admins can view all modules" ON member_course_modules;
  DROP POLICY IF EXISTS "Students can view published modules" ON member_course_modules;
  DROP POLICY IF EXISTS "Admins can manage modules" ON member_course_modules;

  CREATE POLICY "Admins can manage modules"
    ON member_course_modules FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view published modules"
    ON member_course_modules FOR SELECT
    TO authenticated
    USING (is_published = true);
END $$;

-- =====================================================
-- 5. FIX RLS PERFORMANCE - member_course_lessons
-- =====================================================

DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can create lessons" ON member_course_lessons;
  DROP POLICY IF EXISTS "Admins can delete lessons" ON member_course_lessons;
  DROP POLICY IF EXISTS "Admins can update lessons" ON member_course_lessons;
  DROP POLICY IF EXISTS "Admins can view all lessons" ON member_course_lessons;
  DROP POLICY IF EXISTS "Students can view published lessons" ON member_course_lessons;
  DROP POLICY IF EXISTS "Admins can manage lessons" ON member_course_lessons;

  CREATE POLICY "Admins can manage lessons"
    ON member_course_lessons FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view published lessons"
    ON member_course_lessons FOR SELECT
    TO authenticated
    USING (is_published = true);
END $$;

-- =====================================================
-- 6. FIX RLS PERFORMANCE - Progress Tables
-- =====================================================

DO $$
BEGIN
  -- member_student_lesson_progress
  DROP POLICY IF EXISTS "Admins can view all lesson progress" ON member_student_lesson_progress;
  DROP POLICY IF EXISTS "Students can create own lesson progress" ON member_student_lesson_progress;
  DROP POLICY IF EXISTS "Students can update own lesson progress" ON member_student_lesson_progress;
  DROP POLICY IF EXISTS "Students can view own lesson progress" ON member_student_lesson_progress;
  DROP POLICY IF EXISTS "Admins and students can view lesson progress" ON member_student_lesson_progress;
  DROP POLICY IF EXISTS "Students can manage own lesson progress" ON member_student_lesson_progress;

  CREATE POLICY "Admins can manage all lesson progress"
    ON member_student_lesson_progress FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can manage own lesson progress"
    ON member_student_lesson_progress FOR ALL
    TO authenticated
    USING (student_id = (select auth.uid()))
    WITH CHECK (student_id = (select auth.uid()));

  -- member_student_module_progress
  DROP POLICY IF EXISTS "Admins can view all module progress" ON member_student_module_progress;
  DROP POLICY IF EXISTS "Students can create own module progress" ON member_student_module_progress;
  DROP POLICY IF EXISTS "Students can update own module progress" ON member_student_module_progress;
  DROP POLICY IF EXISTS "Students can view own module progress" ON member_student_module_progress;
  DROP POLICY IF EXISTS "Admins and students can view module progress" ON member_student_module_progress;
  DROP POLICY IF EXISTS "Students can manage own module progress" ON member_student_module_progress;

  CREATE POLICY "Admins can manage all module progress"
    ON member_student_module_progress FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can manage own module progress"
    ON member_student_module_progress FOR ALL
    TO authenticated
    USING (student_id = (select auth.uid()))
    WITH CHECK (student_id = (select auth.uid()));
END $$;

-- =====================================================
-- 7. FIX RLS PERFORMANCE - Quiz System
-- =====================================================

DO $$
BEGIN
  -- member_quizzes
  DROP POLICY IF EXISTS "Admins can create quizzes" ON member_quizzes;
  DROP POLICY IF EXISTS "Admins can delete quizzes" ON member_quizzes;
  DROP POLICY IF EXISTS "Admins can update quizzes" ON member_quizzes;
  DROP POLICY IF EXISTS "Admins can view all quizzes" ON member_quizzes;
  DROP POLICY IF EXISTS "Students can view quizzes" ON member_quizzes;
  DROP POLICY IF EXISTS "Admins can manage quizzes" ON member_quizzes;

  CREATE POLICY "Admins can manage quizzes"
    ON member_quizzes FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view quizzes"
    ON member_quizzes FOR SELECT
    TO authenticated
    USING (true);

  -- member_quiz_questions
  DROP POLICY IF EXISTS "Admins can create questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Admins can delete questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Admins can update questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Admins can view all questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Students can view quiz questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Admins can manage questions" ON member_quiz_questions;
  DROP POLICY IF EXISTS "Students can view questions" ON member_quiz_questions;

  CREATE POLICY "Admins can manage questions"
    ON member_quiz_questions FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view questions"
    ON member_quiz_questions FOR SELECT
    TO authenticated
    USING (true);

  -- member_quiz_answers
  DROP POLICY IF EXISTS "Admins can create answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Admins can delete answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Admins can update answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Admins can view all answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Students can view quiz answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Admins can manage answers" ON member_quiz_answers;
  DROP POLICY IF EXISTS "Students can view answers" ON member_quiz_answers;

  CREATE POLICY "Admins can manage answers"
    ON member_quiz_answers FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view answers"
    ON member_quiz_answers FOR SELECT
    TO authenticated
    USING (true);

  -- member_student_quiz_attempts
  DROP POLICY IF EXISTS "Admins can view all quiz attempts" ON member_student_quiz_attempts;
  DROP POLICY IF EXISTS "Students can create own quiz attempts" ON member_student_quiz_attempts;
  DROP POLICY IF EXISTS "Students can view own quiz attempts" ON member_student_quiz_attempts;
  DROP POLICY IF EXISTS "Admins and students can view quiz attempts" ON member_student_quiz_attempts;

  CREATE POLICY "Admins can manage quiz attempts"
    ON member_student_quiz_attempts FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can manage own quiz attempts"
    ON member_student_quiz_attempts FOR ALL
    TO authenticated
    USING (student_id = (select auth.uid()))
    WITH CHECK (student_id = (select auth.uid()));
END $$;

-- =====================================================
-- 8. FIX RLS PERFORMANCE - Flashcard System
-- =====================================================

DO $$
BEGIN
  -- member_flashcard_decks
  DROP POLICY IF EXISTS "Admins can create flashcard decks" ON member_flashcard_decks;
  DROP POLICY IF EXISTS "Admins can delete flashcard decks" ON member_flashcard_decks;
  DROP POLICY IF EXISTS "Admins can update flashcard decks" ON member_flashcard_decks;
  DROP POLICY IF EXISTS "Admins can view all flashcard decks" ON member_flashcard_decks;
  DROP POLICY IF EXISTS "Students can view flashcard decks" ON member_flashcard_decks;
  DROP POLICY IF EXISTS "Admins can manage flashcard decks" ON member_flashcard_decks;

  CREATE POLICY "Admins can manage flashcard decks"
    ON member_flashcard_decks FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view flashcard decks"
    ON member_flashcard_decks FOR SELECT
    TO authenticated
    USING (true);

  -- member_flashcards
  DROP POLICY IF EXISTS "Admins can create flashcards" ON member_flashcards;
  DROP POLICY IF EXISTS "Admins can delete flashcards" ON member_flashcards;
  DROP POLICY IF EXISTS "Admins can update flashcards" ON member_flashcards;
  DROP POLICY IF EXISTS "Admins can view all flashcards" ON member_flashcards;
  DROP POLICY IF EXISTS "Students can view flashcards" ON member_flashcards;
  DROP POLICY IF EXISTS "Admins can manage flashcards" ON member_flashcards;

  CREATE POLICY "Admins can manage flashcards"
    ON member_flashcards FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can view flashcards"
    ON member_flashcards FOR SELECT
    TO authenticated
    USING (true);

  -- member_student_flashcard_progress
  DROP POLICY IF EXISTS "Admins can view all flashcard progress" ON member_student_flashcard_progress;
  DROP POLICY IF EXISTS "Students can create own flashcard progress" ON member_student_flashcard_progress;
  DROP POLICY IF EXISTS "Students can update own flashcard progress" ON member_student_flashcard_progress;
  DROP POLICY IF EXISTS "Students can view own flashcard progress" ON member_student_flashcard_progress;
  DROP POLICY IF EXISTS "Admins and students can view flashcard progress" ON member_student_flashcard_progress;
  DROP POLICY IF EXISTS "Students can manage own flashcard progress" ON member_student_flashcard_progress;

  CREATE POLICY "Admins can manage flashcard progress"
    ON member_student_flashcard_progress FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = (select auth.uid()) AND is_active = true
      )
    );

  CREATE POLICY "Students can manage own flashcard progress"
    ON member_student_flashcard_progress FOR ALL
    TO authenticated
    USING (student_id = (select auth.uid()))
    WITH CHECK (student_id = (select auth.uid()));
END $$;

-- Continue in next block due to size...
