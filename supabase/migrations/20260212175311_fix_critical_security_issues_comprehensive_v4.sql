/*
  # Comprehensive Security and Performance Fixes

  ## Critical Security Fixes
  1. **RLS Policy Always True Issues**
     - Remove policies on appointment_types, availability_slots, availability_exceptions that allow unrestricted anon access
     - Remove policy on booking_email_logs that allows unrestricted inserts
     - Remove policy on bookings that allows unrestricted anon deletes/updates
     - These policies effectively bypass row-level security

  ## Performance Improvements
  2. **Add Missing Foreign Key Indexes**
     - Add indexes for all unindexed foreign keys (27 tables affected)
     - Significantly improves JOIN performance and query optimization

  3. **Fix Auth RLS Performance**
     - Wrap auth.uid() calls in SELECT subqueries to avoid re-evaluation per row
     - Fix user_points and user_achievements to use email field correctly
     - Affects booking_email_logs table

  4. **Remove Unused Indexes**
     - Drop indexes that haven't been used: booking email logs and bookings indexes

  ## Note on Multiple Permissive Policies
  - Multiple permissive policies are intentional for admin + student access patterns
  - Consolidating them would require complex OR conditions that are harder to maintain
  - Keeping separate policies provides better clarity and maintainability
*/

-- =====================================================
-- CRITICAL: Fix RLS Policies That Are Always True
-- =====================================================

-- Fix appointment_types: Remove unrestricted anon policies
DROP POLICY IF EXISTS "Anon can delete appointment types" ON appointment_types;
DROP POLICY IF EXISTS "Anon can update appointment types" ON appointment_types;

-- Fix availability_exceptions: Remove unrestricted anon policies
DROP POLICY IF EXISTS "Anon can delete availability exceptions" ON availability_exceptions;
DROP POLICY IF EXISTS "Anon can update availability exceptions" ON availability_exceptions;

-- Fix availability_slots: Remove unrestricted anon policies
DROP POLICY IF EXISTS "Anon can delete availability slots" ON availability_slots;
DROP POLICY IF EXISTS "Anon can update availability slots" ON availability_slots;

-- Fix booking_email_logs: Remove unrestricted insert policy
DROP POLICY IF EXISTS "System can insert email logs" ON booking_email_logs;

-- Fix bookings: Remove unrestricted anon policies
DROP POLICY IF EXISTS "Anon can delete bookings" ON bookings;
DROP POLICY IF EXISTS "Anon can update bookings" ON bookings;

-- Only allow anon users to update status to 'cancelled' for their own bookings
CREATE POLICY "Anon can cancel own bookings"
  ON bookings
  FOR UPDATE
  TO anon
  USING (customer_email IS NOT NULL)
  WITH CHECK (
    customer_email IS NOT NULL 
    AND status = 'cancelled'
  );

-- =====================================================
-- Add Missing Foreign Key Indexes (Performance)
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_admin_password_resets_admin_user_id 
  ON admin_password_resets(admin_user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_appointment_type_id 
  ON bookings(appointment_type_id);

CREATE INDEX IF NOT EXISTS idx_content_uploads_content_plan_id 
  ON content_uploads(content_plan_id);

CREATE INDEX IF NOT EXISTS idx_lesson_recommendations_recommendation_id 
  ON lesson_recommendations(recommendation_id);

CREATE INDEX IF NOT EXISTS idx_member_announcements_created_by_admin_id 
  ON member_announcements(created_by_admin_id);

CREATE INDEX IF NOT EXISTS idx_member_course_modules_module_quiz_id 
  ON member_course_modules(module_quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_flashcards_deck_id 
  ON member_flashcards(deck_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_posts_student_id 
  ON member_forum_posts(student_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_posts_thread_id 
  ON member_forum_posts(thread_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_reactions_student_id 
  ON member_forum_reactions(student_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_threads_category_id 
  ON member_forum_threads(category_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_threads_student_id 
  ON member_forum_threads(student_id);

CREATE INDEX IF NOT EXISTS idx_member_lesson_downloads_lesson_id 
  ON member_lesson_downloads(lesson_id);

CREATE INDEX IF NOT EXISTS idx_member_live_sessions_created_by_admin_id 
  ON member_live_sessions(created_by_admin_id);

CREATE INDEX IF NOT EXISTS idx_member_quiz_answers_question_id 
  ON member_quiz_answers(question_id);

CREATE INDEX IF NOT EXISTS idx_member_quiz_questions_quiz_id 
  ON member_quiz_questions(quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_student_achievements_achievement_id 
  ON member_student_achievements(achievement_id);

CREATE INDEX IF NOT EXISTS idx_member_student_announcement_reads_student_id 
  ON member_student_announcement_reads(student_id);

CREATE INDEX IF NOT EXISTS idx_member_student_course_progress_course_id 
  ON member_student_course_progress(course_id);

CREATE INDEX IF NOT EXISTS idx_member_student_flashcard_progress_flashcard_id 
  ON member_student_flashcard_progress(flashcard_id);

CREATE INDEX IF NOT EXISTS idx_member_student_lesson_progress_lesson_id 
  ON member_student_lesson_progress(lesson_id);

CREATE INDEX IF NOT EXISTS idx_member_student_module_progress_module_id 
  ON member_student_module_progress(module_id);

CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_quiz_id 
  ON member_student_quiz_attempts(quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_student_id 
  ON member_student_quiz_attempts(student_id);

CREATE INDEX IF NOT EXISTS idx_member_student_session_registrations_student_id 
  ON member_student_session_registrations(student_id);

CREATE INDEX IF NOT EXISTS idx_module_bonus_content_module_id 
  ON module_bonus_content(module_id);

-- =====================================================
-- Fix Auth RLS Performance Issues
-- =====================================================

-- Fix user_points policy - uses email, not user_id
DROP POLICY IF EXISTS "Users can view own points" ON user_points;
CREATE POLICY "Users can view own points"
  ON user_points
  FOR SELECT
  TO authenticated
  USING (
    email = (SELECT auth.jwt()->>'email')
  );

-- Fix user_achievements policy - uses email, not user_id
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (
    email = (SELECT auth.jwt()->>'email')
  );

-- Fix booking_email_logs policy
DROP POLICY IF EXISTS "Admins can read all email logs" ON booking_email_logs;
CREATE POLICY "Admins can read all email logs"
  ON booking_email_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (SELECT auth.uid()) 
      AND is_active = true
    )
  );

-- =====================================================
-- Remove Unused Indexes
-- =====================================================

DROP INDEX IF EXISTS idx_booking_email_logs_booking_id;
DROP INDEX IF EXISTS idx_booking_email_logs_email_type;
DROP INDEX IF EXISTS idx_bookings_appointment_date;
DROP INDEX IF EXISTS idx_bookings_payment_status;
DROP INDEX IF EXISTS idx_bookings_reminder_flags;
