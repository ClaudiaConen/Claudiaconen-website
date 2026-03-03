/*
  # Consolidate Multiple Permissive Policies - Part 1

  Fixes the "multiple permissive policies" warning for tables where an ALL-action admin 
  policy overlaps with specific student/member policies for the same action. 

  Strategy: Drop the broad ALL admin policy and replace with action-specific admin policies
  that only cover actions NOT already handled by a separate student policy. Where both admin 
  and student have SELECT, merge into a single combined SELECT policy.

  ## Tables fixed in this migration:
  - course_recommendations
  - lesson_recommendations
  - member_achievements
  - member_announcements
  - member_course_lessons
  - member_course_modules
  - member_flashcard_decks
  - member_flashcards
  - member_forum_categories
  - member_lesson_downloads
  - member_quiz_answers
  - member_quiz_questions
  - member_quizzes
  - module_bonus_content
*/

-- Helper: reusable admin check subquery
-- (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))

-- =============================================
-- course_recommendations
-- Has: ALL admin + SELECT member => overlap on SELECT
-- Fix: Drop ALL, add specific INSERT/UPDATE/DELETE for admin, merge SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage recommendations" ON public.course_recommendations;
DROP POLICY IF EXISTS "Members can view active recommendations" ON public.course_recommendations;

CREATE POLICY "Admin or member can view recommendations"
  ON public.course_recommendations FOR SELECT TO authenticated
  USING (
    is_active = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can insert recommendations"
  ON public.course_recommendations FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update recommendations"
  ON public.course_recommendations FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete recommendations"
  ON public.course_recommendations FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- lesson_recommendations
-- Has: ALL admin + SELECT member => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage lesson recommendations" ON public.lesson_recommendations;
DROP POLICY IF EXISTS "Members can view lesson recommendations" ON public.lesson_recommendations;

CREATE POLICY "Authenticated can view lesson recommendations"
  ON public.lesson_recommendations FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert lesson recommendations"
  ON public.lesson_recommendations FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update lesson recommendations"
  ON public.lesson_recommendations FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete lesson recommendations"
  ON public.lesson_recommendations FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_achievements
-- Has: admin(ALL) + SELECT(member) => overlap on SELECT only
-- Also has separate INSERT/UPDATE/DELETE for admin (already specific)
-- =============================================
DROP POLICY IF EXISTS "Admins can view all achievements" ON public.member_achievements;
DROP POLICY IF EXISTS "Everyone can view active achievements" ON public.member_achievements;

CREATE POLICY "Admin or member can view achievements"
  ON public.member_achievements FOR SELECT TO authenticated
  USING (
    is_active = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_announcements
-- Has: admin SELECT + member SELECT => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can view all announcements" ON public.member_announcements;
DROP POLICY IF EXISTS "Everyone can view active announcements" ON public.member_announcements;

CREATE POLICY "Admin or member can view announcements"
  ON public.member_announcements FOR SELECT TO authenticated
  USING (
    ((published_at <= now()) AND ((expires_at IS NULL) OR (expires_at > now())))
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_course_lessons
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage lessons" ON public.member_course_lessons;
DROP POLICY IF EXISTS "Students can view published lessons" ON public.member_course_lessons;

CREATE POLICY "Admin or student can view lessons"
  ON public.member_course_lessons FOR SELECT TO anon, authenticated
  USING (
    is_published = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can insert lessons"
  ON public.member_course_lessons FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update lessons"
  ON public.member_course_lessons FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete lessons"
  ON public.member_course_lessons FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_course_modules
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage modules" ON public.member_course_modules;
DROP POLICY IF EXISTS "Students can view published modules" ON public.member_course_modules;

CREATE POLICY "Admin or student can view modules"
  ON public.member_course_modules FOR SELECT TO anon, authenticated
  USING (
    is_published = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can insert modules"
  ON public.member_course_modules FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update modules"
  ON public.member_course_modules FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete modules"
  ON public.member_course_modules FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_flashcard_decks
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage flashcard decks" ON public.member_flashcard_decks;
DROP POLICY IF EXISTS "Students can view flashcard decks" ON public.member_flashcard_decks;

CREATE POLICY "Authenticated can view flashcard decks"
  ON public.member_flashcard_decks FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert flashcard decks"
  ON public.member_flashcard_decks FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update flashcard decks"
  ON public.member_flashcard_decks FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete flashcard decks"
  ON public.member_flashcard_decks FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_flashcards
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage flashcards" ON public.member_flashcards;
DROP POLICY IF EXISTS "Students can view flashcards" ON public.member_flashcards;

CREATE POLICY "Authenticated can view flashcards"
  ON public.member_flashcards FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert flashcards"
  ON public.member_flashcards FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update flashcards"
  ON public.member_flashcards FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete flashcards"
  ON public.member_flashcards FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_forum_categories
-- Has: admin SELECT + member SELECT => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can view all categories" ON public.member_forum_categories;
DROP POLICY IF EXISTS "Everyone can view active categories" ON public.member_forum_categories;

CREATE POLICY "Admin or member can view categories"
  ON public.member_forum_categories FOR SELECT TO authenticated
  USING (
    is_active = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_lesson_downloads
-- Has: admin SELECT + student SELECT => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can view all downloads" ON public.member_lesson_downloads;
DROP POLICY IF EXISTS "Students can view downloads" ON public.member_lesson_downloads;

CREATE POLICY "Admin or student can view downloads"
  ON public.member_lesson_downloads FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR EXISTS (
      SELECT 1 FROM member_course_lessons mcl
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mcl.id = member_lesson_downloads.lesson_id
      AND mcl.is_published = true AND mcm.is_published = true
    )
  );

-- =============================================
-- member_quiz_answers
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage answers" ON public.member_quiz_answers;
DROP POLICY IF EXISTS "Students can view answers" ON public.member_quiz_answers;

CREATE POLICY "Authenticated can view quiz answers"
  ON public.member_quiz_answers FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert quiz answers"
  ON public.member_quiz_answers FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update quiz answers"
  ON public.member_quiz_answers FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete quiz answers"
  ON public.member_quiz_answers FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_quiz_questions
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage questions" ON public.member_quiz_questions;
DROP POLICY IF EXISTS "Students can view questions" ON public.member_quiz_questions;

CREATE POLICY "Authenticated can view quiz questions"
  ON public.member_quiz_questions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert quiz questions"
  ON public.member_quiz_questions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update quiz questions"
  ON public.member_quiz_questions FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete quiz questions"
  ON public.member_quiz_questions FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_quizzes
-- Has: ALL admin + SELECT student => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage quizzes" ON public.member_quizzes;
DROP POLICY IF EXISTS "Students can view quizzes" ON public.member_quizzes;

CREATE POLICY "Authenticated can view quizzes"
  ON public.member_quizzes FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert quizzes"
  ON public.member_quizzes FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update quizzes"
  ON public.member_quizzes FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete quizzes"
  ON public.member_quizzes FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- module_bonus_content
-- Has: ALL admin + SELECT member => overlap on SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can manage bonus content" ON public.module_bonus_content;
DROP POLICY IF EXISTS "Members can view published bonus content" ON public.module_bonus_content;

CREATE POLICY "Admin or member can view bonus content"
  ON public.module_bonus_content FOR SELECT TO authenticated
  USING (
    is_published = true
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can insert bonus content"
  ON public.module_bonus_content FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can update bonus content"
  ON public.module_bonus_content FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

CREATE POLICY "Admins can delete bonus content"
  ON public.module_bonus_content FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));
