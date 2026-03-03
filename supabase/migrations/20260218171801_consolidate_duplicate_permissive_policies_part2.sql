/*
  # Consolidate Multiple Permissive Policies - Part 2

  Fixes remaining "multiple permissive policies" warnings for tables where 
  admin ALL policies overlap with student-specific policies.

  ## Tables fixed in this migration:
  - member_forum_posts (ALL admin + specific student policies)
  - member_forum_threads (ALL admin + specific student policies)
  - member_student_achievements (admin SELECT + student SELECT, admin INSERT + student INSERT)
  - member_student_announcement_reads (admin SELECT + student SELECT)
  - member_student_flashcard_progress (ALL admin + ALL student)
  - member_student_lesson_progress (ALL admin + ALL student + extra SELECT)
  - member_student_module_progress (ALL admin + ALL student + extra SELECT)
  - member_student_quiz_attempts (ALL admin + ALL student)
  - member_student_session_registrations (admin DELETE + student DELETE)
  - member_students (ALL admin + ALL student)

  Strategy: Replace overlapping permissive policies with single merged policies per action.
*/

-- =============================================
-- member_forum_posts
-- Has: ALL admin + INSERT/DELETE/SELECT/UPDATE student
-- =============================================
DROP POLICY IF EXISTS "Admins can moderate all posts" ON public.member_forum_posts;
DROP POLICY IF EXISTS "Students can create posts" ON public.member_forum_posts;
DROP POLICY IF EXISTS "Students can delete own posts" ON public.member_forum_posts;
DROP POLICY IF EXISTS "Everyone can view posts" ON public.member_forum_posts;
DROP POLICY IF EXISTS "Students can update own posts" ON public.member_forum_posts;

CREATE POLICY "Admin or member can view posts"
  ON public.member_forum_posts FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR EXISTS (
      SELECT 1 FROM member_forum_threads mft
      JOIN member_forum_categories mfc ON mft.category_id = mfc.id
      WHERE mft.id = member_forum_posts.thread_id AND mfc.is_active = true
    )
  );

CREATE POLICY "Admin or student can create posts"
  ON public.member_forum_posts FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  );

CREATE POLICY "Admin or student can update posts"
  ON public.member_forum_posts FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  );

CREATE POLICY "Admin or student can delete posts"
  ON public.member_forum_posts FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  );

-- =============================================
-- member_forum_threads
-- Has: ALL admin + INSERT/SELECT/UPDATE student
-- =============================================
DROP POLICY IF EXISTS "Admins can moderate all threads" ON public.member_forum_threads;
DROP POLICY IF EXISTS "Students can create threads" ON public.member_forum_threads;
DROP POLICY IF EXISTS "Everyone can view threads" ON public.member_forum_threads;
DROP POLICY IF EXISTS "Students can update own threads" ON public.member_forum_threads;

CREATE POLICY "Admin or member can view threads"
  ON public.member_forum_threads FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR EXISTS (
      SELECT 1 FROM member_forum_categories
      WHERE member_forum_categories.id = member_forum_threads.category_id
      AND member_forum_categories.is_active = true
    )
  );

CREATE POLICY "Admin or student can create threads"
  ON public.member_forum_threads FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  );

CREATE POLICY "Admin or student can update threads"
  ON public.member_forum_threads FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
    OR student_id = (select auth.uid())
  );

CREATE POLICY "Admins can delete threads"
  ON public.member_forum_threads FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));

-- =============================================
-- member_student_achievements
-- Has: admin INSERT + student INSERT, admin SELECT + student SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can create student achievements" ON public.member_student_achievements;
DROP POLICY IF EXISTS "Students can unlock own achievements" ON public.member_student_achievements;
DROP POLICY IF EXISTS "Admins can view all student achievements" ON public.member_student_achievements;
DROP POLICY IF EXISTS "Students can view own achievements" ON public.member_student_achievements;

CREATE POLICY "Admin or student can view student achievements"
  ON public.member_student_achievements FOR SELECT TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert student achievements"
  ON public.member_student_achievements FOR INSERT TO authenticated
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_announcement_reads
-- Has: admin SELECT + student SELECT
-- =============================================
DROP POLICY IF EXISTS "Admins can view all read status" ON public.member_student_announcement_reads;
DROP POLICY IF EXISTS "Students can view own read status" ON public.member_student_announcement_reads;

CREATE POLICY "Admin or student can view read status"
  ON public.member_student_announcement_reads FOR SELECT TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_flashcard_progress
-- Has: ALL admin + ALL student
-- =============================================
DROP POLICY IF EXISTS "Admins can manage flashcard progress" ON public.member_student_flashcard_progress;
DROP POLICY IF EXISTS "Students can manage own flashcard progress" ON public.member_student_flashcard_progress;

CREATE POLICY "Admin or student can view flashcard progress"
  ON public.member_student_flashcard_progress FOR SELECT TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert flashcard progress"
  ON public.member_student_flashcard_progress FOR INSERT TO authenticated
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can update flashcard progress"
  ON public.member_student_flashcard_progress FOR UPDATE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  )
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can delete flashcard progress"
  ON public.member_student_flashcard_progress FOR DELETE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_lesson_progress
-- Has: ALL admin + ALL student + extra SELECT(anon) with USING(true)
-- =============================================
DROP POLICY IF EXISTS "Admins can manage all lesson progress" ON public.member_student_lesson_progress;
DROP POLICY IF EXISTS "Students can manage own lesson progress" ON public.member_student_lesson_progress;
DROP POLICY IF EXISTS "Students can view own lesson progress" ON public.member_student_lesson_progress;

CREATE POLICY "Admin or student can view lesson progress"
  ON public.member_student_lesson_progress FOR SELECT TO anon, authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert lesson progress"
  ON public.member_student_lesson_progress FOR INSERT TO authenticated
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can update lesson progress"
  ON public.member_student_lesson_progress FOR UPDATE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  )
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can delete lesson progress"
  ON public.member_student_lesson_progress FOR DELETE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_module_progress
-- Has: ALL admin + ALL student + extra SELECT(anon) with USING(true)
-- =============================================
DROP POLICY IF EXISTS "Admins can manage all module progress" ON public.member_student_module_progress;
DROP POLICY IF EXISTS "Students can manage own module progress" ON public.member_student_module_progress;
DROP POLICY IF EXISTS "Students can view own module progress" ON public.member_student_module_progress;

CREATE POLICY "Admin or student can view module progress"
  ON public.member_student_module_progress FOR SELECT TO anon, authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert module progress"
  ON public.member_student_module_progress FOR INSERT TO authenticated
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can update module progress"
  ON public.member_student_module_progress FOR UPDATE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  )
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can delete module progress"
  ON public.member_student_module_progress FOR DELETE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_quiz_attempts
-- Has: ALL admin + ALL student
-- =============================================
DROP POLICY IF EXISTS "Admins can manage quiz attempts" ON public.member_student_quiz_attempts;
DROP POLICY IF EXISTS "Students can manage own quiz attempts" ON public.member_student_quiz_attempts;

CREATE POLICY "Admin or student can view quiz attempts"
  ON public.member_student_quiz_attempts FOR SELECT TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert quiz attempts"
  ON public.member_student_quiz_attempts FOR INSERT TO authenticated
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can update quiz attempts"
  ON public.member_student_quiz_attempts FOR UPDATE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  )
  WITH CHECK (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can delete quiz attempts"
  ON public.member_student_quiz_attempts FOR DELETE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_student_session_registrations
-- Has: admin DELETE + student DELETE
-- =============================================
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.member_student_session_registrations;
DROP POLICY IF EXISTS "Students can cancel own registrations" ON public.member_student_session_registrations;

CREATE POLICY "Admin or student can delete registrations"
  ON public.member_student_session_registrations FOR DELETE TO authenticated
  USING (
    student_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

-- =============================================
-- member_students
-- Has: ALL admin + ALL student
-- =============================================
DROP POLICY IF EXISTS "Admins can manage students" ON public.member_students;
DROP POLICY IF EXISTS "Students can view and update own profile" ON public.member_students;

CREATE POLICY "Admin or student can view students"
  ON public.member_students FOR SELECT TO authenticated
  USING (
    id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can insert students"
  ON public.member_students FOR INSERT TO authenticated
  WITH CHECK (
    id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admin or student can update students"
  ON public.member_students FOR UPDATE TO authenticated
  USING (
    id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  )
  WITH CHECK (
    id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can delete students"
  ON public.member_students FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = (select auth.uid()) AND admin_users.is_active = true));
