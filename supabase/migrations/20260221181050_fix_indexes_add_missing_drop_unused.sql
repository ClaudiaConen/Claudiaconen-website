
/*
  # Fix Indexes: Add Missing FK Indexes, Drop Unused Indexes

  ## Summary
  Three foreign key columns are missing covering indexes. Additionally, many indexes
  created in a previous migration are flagged as unused and should be removed to reduce
  write overhead. The three new FK indexes replace the dropped ones where applicable.

  ## New Indexes (missing FK coverage)
  - booking_email_logs.booking_id
  - member_student_mini_task_submissions.student_id
  - member_student_takeaway_completions.takeaway_id

  ## Dropped Indexes (never used by query planner)
  All indexes from the previous migration plus a few others that have never been used.
*/

-- Add the three missing FK indexes
CREATE INDEX IF NOT EXISTS idx_booking_email_logs_booking_id
  ON public.booking_email_logs (booking_id);

CREATE INDEX IF NOT EXISTS idx_member_student_mini_task_submissions_student_id
  ON public.member_student_mini_task_submissions (student_id);

CREATE INDEX IF NOT EXISTS idx_member_student_takeaway_completions_takeaway_id
  ON public.member_student_takeaway_completions (takeaway_id);

-- Drop all unused indexes
DROP INDEX IF EXISTS public.idx_member_forum_posts_thread_id;
DROP INDEX IF EXISTS public.idx_member_forum_reactions_student_id;
DROP INDEX IF EXISTS public.idx_member_forum_threads_category_id;
DROP INDEX IF EXISTS public.idx_member_forum_threads_student_id;
DROP INDEX IF EXISTS public.idx_member_lesson_downloads_lesson_id;
DROP INDEX IF EXISTS public.idx_member_live_sessions_created_by_admin_id;
DROP INDEX IF EXISTS public.idx_member_quiz_questions_quiz_id;
DROP INDEX IF EXISTS public.idx_member_student_achievements_achievement_id;
DROP INDEX IF EXISTS public.idx_admin_password_resets_admin_user_id;
DROP INDEX IF EXISTS public.idx_bookings_appointment_type_id;
DROP INDEX IF EXISTS public.idx_content_uploads_content_plan_id;
DROP INDEX IF EXISTS public.idx_lesson_recommendations_recommendation_id;
DROP INDEX IF EXISTS public.idx_member_announcements_created_by_admin_id;
DROP INDEX IF EXISTS public.idx_member_course_modules_module_quiz_id;
DROP INDEX IF EXISTS public.idx_member_flashcards_deck_id;
DROP INDEX IF EXISTS public.idx_member_forum_posts_student_id;
DROP INDEX IF EXISTS public.idx_member_student_announcement_reads_student_id;
DROP INDEX IF EXISTS public.idx_member_student_course_progress_course_id;
DROP INDEX IF EXISTS public.idx_member_student_flashcard_progress_flashcard_id;
DROP INDEX IF EXISTS public.idx_member_student_lesson_progress_lesson_id;
DROP INDEX IF EXISTS public.idx_member_student_module_progress_module_id;
DROP INDEX IF EXISTS public.idx_member_student_quiz_attempts_quiz_id;
DROP INDEX IF EXISTS public.idx_member_student_quiz_attempts_student_id;
DROP INDEX IF EXISTS public.idx_member_student_session_registrations_student_id;
DROP INDEX IF EXISTS public.idx_module_bonus_content_module_id;
