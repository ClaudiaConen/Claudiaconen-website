/*
  # Optimize RLS Auth Function Calls - Corrected

  1. Performance Optimization
    - Replace auth.uid() and auth.jwt() with (select auth.uid()) and (select auth.jwt())
    - This evaluates the function once per query instead of once per row
    - Significantly improves query performance at scale
    
  2. Tables Fixed
    - user_points, user_achievements
    - member_student_achievements
    - member_forum_threads, member_forum_posts, member_forum_reactions
    - member_student_session_registrations
    - member_student_announcement_reads
    - member_student_course_progress
*/

-- user_points: Optimize auth.jwt() call
DROP POLICY IF EXISTS "Users can view own points" ON user_points;
CREATE POLICY "Users can view own points"
  ON user_points FOR SELECT
  TO authenticated
  USING (email = (select (auth.jwt() ->> 'email')));

-- user_achievements: Optimize auth.jwt() call
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (email = (select (auth.jwt() ->> 'email')));

-- member_student_achievements: Optimize student_id checks
DROP POLICY IF EXISTS "Students can unlock own achievements" ON member_student_achievements CASCADE;
DROP POLICY IF EXISTS "Students can view own achievements" ON member_student_achievements CASCADE;

CREATE POLICY "Students can unlock own achievements"
  ON member_student_achievements FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can view own achievements"
  ON member_student_achievements FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));

-- member_forum_threads: Optimize creator checks
DROP POLICY IF EXISTS "Students can create threads" ON member_forum_threads CASCADE;
DROP POLICY IF EXISTS "Students can update own threads" ON member_forum_threads CASCADE;

CREATE POLICY "Students can create threads"
  ON member_forum_threads FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can update own threads"
  ON member_forum_threads FOR UPDATE
  TO authenticated
  USING (student_id = (select auth.uid()))
  WITH CHECK (student_id = (select auth.uid()));

-- member_forum_posts: Optimize creator checks
DROP POLICY IF EXISTS "Students can create posts" ON member_forum_posts CASCADE;
DROP POLICY IF EXISTS "Students can update own posts" ON member_forum_posts CASCADE;
DROP POLICY IF EXISTS "Students can delete own posts" ON member_forum_posts CASCADE;

CREATE POLICY "Students can create posts"
  ON member_forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can update own posts"
  ON member_forum_posts FOR UPDATE
  TO authenticated
  USING (student_id = (select auth.uid()))
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can delete own posts"
  ON member_forum_posts FOR DELETE
  TO authenticated
  USING (student_id = (select auth.uid()));

-- member_forum_reactions: Optimize student checks
DROP POLICY IF EXISTS "Students can add reactions" ON member_forum_reactions CASCADE;
DROP POLICY IF EXISTS "Students can delete own reactions" ON member_forum_reactions CASCADE;

CREATE POLICY "Students can add reactions"
  ON member_forum_reactions FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can delete own reactions"
  ON member_forum_reactions FOR DELETE
  TO authenticated
  USING (student_id = (select auth.uid()));

-- member_student_session_registrations: Optimize student checks
DROP POLICY IF EXISTS "Students can register for sessions" ON member_student_session_registrations CASCADE;
DROP POLICY IF EXISTS "Students can cancel own registrations" ON member_student_session_registrations CASCADE;

CREATE POLICY "Students can register for sessions"
  ON member_student_session_registrations FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can cancel own registrations"
  ON member_student_session_registrations FOR DELETE
  TO authenticated
  USING (student_id = (select auth.uid()));

-- member_student_announcement_reads: Optimize student checks
DROP POLICY IF EXISTS "Students can mark as read" ON member_student_announcement_reads CASCADE;
DROP POLICY IF EXISTS "Students can view own read status" ON member_student_announcement_reads CASCADE;

CREATE POLICY "Students can mark as read"
  ON member_student_announcement_reads FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can view own read status"
  ON member_student_announcement_reads FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));

-- member_student_course_progress: Optimize student checks
DROP POLICY IF EXISTS "Students can insert own course progress" ON member_student_course_progress CASCADE;
DROP POLICY IF EXISTS "Students can update own course progress" ON member_student_course_progress CASCADE;
DROP POLICY IF EXISTS "Students can view own course progress" ON member_student_course_progress CASCADE;

CREATE POLICY "Students can insert own course progress"
  ON member_student_course_progress FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can update own course progress"
  ON member_student_course_progress FOR UPDATE
  TO authenticated
  USING (student_id = (select auth.uid()))
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can view own course progress"
  ON member_student_course_progress FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));