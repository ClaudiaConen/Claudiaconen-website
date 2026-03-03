/*
  # Fix Security Issues: Indexes and RLS Auth Initialization

  1. New Indexes
    - Add index on `booking_email_logs.booking_id` to cover foreign key constraint
  
  2. RLS Performance Fixes
    - `user_points`: Replace `auth.jwt()` with `(select auth.jwt())` in SELECT policy
    - `user_achievements`: Replace `auth.jwt()` with `(select auth.jwt())` in SELECT policy
  
  3. Dropped Unused Indexes (25 indexes)
    - Remove indexes that have never been used according to pg_stat_user_indexes
    - These indexes consume storage and slow down writes without providing query benefit
  
  4. Important Notes
    - The foreign key index prevents full table scans during cascading operations
    - The RLS auth function wrapping prevents re-evaluation per row, improving query performance
    - Unused indexes are safely dropped since they have zero usage
*/

-- 1. Add missing foreign key index
CREATE INDEX IF NOT EXISTS idx_booking_email_logs_booking_id 
  ON public.booking_email_logs (booking_id);

-- 2. Fix RLS auth function initialization (wrap auth.jwt() in select)
DROP POLICY IF EXISTS "Users can view own points" ON public.user_points;
CREATE POLICY "Users can view own points"
  ON public.user_points
  FOR SELECT
  TO authenticated
  USING (email = (select (select auth.jwt()) ->> 'email'));

DROP POLICY IF EXISTS "Users can view own achievements" ON public.user_achievements;
CREATE POLICY "Users can view own achievements"
  ON public.user_achievements
  FOR SELECT
  TO authenticated
  USING (email = (select (select auth.jwt()) ->> 'email'));

-- 3. Drop unused indexes
DROP INDEX IF EXISTS idx_admin_password_resets_admin_user_id;
DROP INDEX IF EXISTS idx_bookings_appointment_type_id;
DROP INDEX IF EXISTS idx_content_uploads_content_plan_id;
DROP INDEX IF EXISTS idx_lesson_recommendations_recommendation_id;
DROP INDEX IF EXISTS idx_member_announcements_created_by_admin_id;
DROP INDEX IF EXISTS idx_member_course_modules_module_quiz_id;
DROP INDEX IF EXISTS idx_member_flashcards_deck_id;
DROP INDEX IF EXISTS idx_member_forum_posts_student_id;
DROP INDEX IF EXISTS idx_member_forum_posts_thread_id;
DROP INDEX IF EXISTS idx_member_forum_reactions_student_id;
DROP INDEX IF EXISTS idx_member_forum_threads_category_id;
DROP INDEX IF EXISTS idx_member_forum_threads_student_id;
DROP INDEX IF EXISTS idx_member_lesson_downloads_lesson_id;
DROP INDEX IF EXISTS idx_member_live_sessions_created_by_admin_id;
DROP INDEX IF EXISTS idx_member_quiz_questions_quiz_id;
DROP INDEX IF EXISTS idx_member_student_achievements_achievement_id;
DROP INDEX IF EXISTS idx_member_student_announcement_reads_student_id;
DROP INDEX IF EXISTS idx_member_student_course_progress_course_id;
DROP INDEX IF EXISTS idx_member_student_flashcard_progress_flashcard_id;
DROP INDEX IF EXISTS idx_member_student_lesson_progress_lesson_id;
DROP INDEX IF EXISTS idx_member_student_module_progress_module_id;
DROP INDEX IF EXISTS idx_member_student_quiz_attempts_quiz_id;
DROP INDEX IF EXISTS idx_member_student_quiz_attempts_student_id;
DROP INDEX IF EXISTS idx_member_student_session_registrations_student_id;
DROP INDEX IF EXISTS idx_module_bonus_content_module_id;
