
/*
  # Add Missing Foreign Key Indexes

  ## Summary
  Creates covering indexes for all foreign key columns that currently lack them.
  This improves JOIN and lookup performance for queries that reference these relationships.

  ## Tables Affected
  1. admin_password_resets - admin_user_id
  2. bookings - appointment_type_id
  3. content_uploads - content_plan_id
  4. lesson_recommendations - recommendation_id
  5. member_announcements - created_by_admin_id
  6. member_course_modules - module_quiz_id
  7. member_flashcards - deck_id
  8. member_forum_posts - student_id, thread_id
  9. member_forum_reactions - student_id
  10. member_forum_threads - category_id, student_id
  11. member_lesson_downloads - lesson_id
  12. member_live_sessions - created_by_admin_id
  13. member_quiz_questions - quiz_id
  14. member_student_achievements - achievement_id
  15. member_student_announcement_reads - student_id
  16. member_student_course_progress - course_id
  17. member_student_flashcard_progress - flashcard_id
  18. member_student_lesson_progress - lesson_id
  19. member_student_module_progress - module_id
  20. member_student_quiz_attempts - quiz_id, student_id
  21. member_student_session_registrations - student_id
  22. module_bonus_content - module_id
*/

CREATE INDEX IF NOT EXISTS idx_admin_password_resets_admin_user_id
  ON public.admin_password_resets (admin_user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_appointment_type_id
  ON public.bookings (appointment_type_id);

CREATE INDEX IF NOT EXISTS idx_content_uploads_content_plan_id
  ON public.content_uploads (content_plan_id);

CREATE INDEX IF NOT EXISTS idx_lesson_recommendations_recommendation_id
  ON public.lesson_recommendations (recommendation_id);

CREATE INDEX IF NOT EXISTS idx_member_announcements_created_by_admin_id
  ON public.member_announcements (created_by_admin_id);

CREATE INDEX IF NOT EXISTS idx_member_course_modules_module_quiz_id
  ON public.member_course_modules (module_quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_flashcards_deck_id
  ON public.member_flashcards (deck_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_posts_student_id
  ON public.member_forum_posts (student_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_posts_thread_id
  ON public.member_forum_posts (thread_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_reactions_student_id
  ON public.member_forum_reactions (student_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_threads_category_id
  ON public.member_forum_threads (category_id);

CREATE INDEX IF NOT EXISTS idx_member_forum_threads_student_id
  ON public.member_forum_threads (student_id);

CREATE INDEX IF NOT EXISTS idx_member_lesson_downloads_lesson_id
  ON public.member_lesson_downloads (lesson_id);

CREATE INDEX IF NOT EXISTS idx_member_live_sessions_created_by_admin_id
  ON public.member_live_sessions (created_by_admin_id);

CREATE INDEX IF NOT EXISTS idx_member_quiz_questions_quiz_id
  ON public.member_quiz_questions (quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_student_achievements_achievement_id
  ON public.member_student_achievements (achievement_id);

CREATE INDEX IF NOT EXISTS idx_member_student_announcement_reads_student_id
  ON public.member_student_announcement_reads (student_id);

CREATE INDEX IF NOT EXISTS idx_member_student_course_progress_course_id
  ON public.member_student_course_progress (course_id);

CREATE INDEX IF NOT EXISTS idx_member_student_flashcard_progress_flashcard_id
  ON public.member_student_flashcard_progress (flashcard_id);

CREATE INDEX IF NOT EXISTS idx_member_student_lesson_progress_lesson_id
  ON public.member_student_lesson_progress (lesson_id);

CREATE INDEX IF NOT EXISTS idx_member_student_module_progress_module_id
  ON public.member_student_module_progress (module_id);

CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_quiz_id
  ON public.member_student_quiz_attempts (quiz_id);

CREATE INDEX IF NOT EXISTS idx_member_student_quiz_attempts_student_id
  ON public.member_student_quiz_attempts (student_id);

CREATE INDEX IF NOT EXISTS idx_member_student_session_registrations_student_id
  ON public.member_student_session_registrations (student_id);

CREATE INDEX IF NOT EXISTS idx_module_bonus_content_module_id
  ON public.module_bonus_content (module_id);
