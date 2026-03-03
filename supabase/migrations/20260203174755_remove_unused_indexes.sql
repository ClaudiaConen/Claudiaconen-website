/*
  # Remove Unused Indexes

  1. Performance Optimization
    - Drop indexes that are not being used by any queries
    - Reduces index maintenance overhead during INSERTs/UPDATEs
    - Frees up storage space
    
  2. Indexes Removed
    - All unused indexes identified by Supabase database analyzer
    - These indexes can be recreated later if needed
*/

-- Admin tables
DROP INDEX IF EXISTS idx_admin_users_is_active;
DROP INDEX IF EXISTS idx_password_resets_token;
DROP INDEX IF EXISTS idx_password_resets_admin_user_id;
DROP INDEX IF EXISTS idx_password_resets_expires_at;

-- Member students
DROP INDEX IF EXISTS idx_member_students_is_active;

-- Course structure
DROP INDEX IF EXISTS idx_member_course_lessons_order;
DROP INDEX IF EXISTS idx_member_course_lessons_published;
DROP INDEX IF EXISTS idx_course_modules_quiz;

-- Progress tracking
DROP INDEX IF EXISTS idx_member_student_module_progress_student;
DROP INDEX IF EXISTS idx_member_student_module_progress_module;
DROP INDEX IF EXISTS idx_member_student_lesson_progress_student;
DROP INDEX IF EXISTS idx_member_student_lesson_progress_lesson;
DROP INDEX IF EXISTS idx_member_student_lesson_progress_completed;
DROP INDEX IF EXISTS idx_member_student_course_progress_student_id;
DROP INDEX IF EXISTS idx_member_student_course_progress_course_id;

-- Lesson resources
DROP INDEX IF EXISTS idx_member_lesson_downloads_lesson;

-- Quiz system
DROP INDEX IF EXISTS idx_member_quizzes_lesson;
DROP INDEX IF EXISTS idx_member_quiz_questions_quiz;
DROP INDEX IF EXISTS idx_member_quiz_questions_order;
DROP INDEX IF EXISTS idx_member_quiz_answers_question;
DROP INDEX IF EXISTS idx_member_student_quiz_attempts_student;
DROP INDEX IF EXISTS idx_member_student_quiz_attempts_quiz;
DROP INDEX IF EXISTS idx_member_student_quiz_attempts_passed;

-- Flashcard system
DROP INDEX IF EXISTS idx_member_flashcard_decks_lesson;
DROP INDEX IF EXISTS idx_member_flashcards_deck;
DROP INDEX IF EXISTS idx_member_flashcards_order;
DROP INDEX IF EXISTS idx_member_student_flashcard_progress_student;
DROP INDEX IF EXISTS idx_member_student_flashcard_progress_flashcard;
DROP INDEX IF EXISTS idx_member_student_flashcard_progress_next_review;

-- Achievement system
DROP INDEX IF EXISTS idx_member_achievements_key;
DROP INDEX IF EXISTS idx_member_achievements_active;
DROP INDEX IF EXISTS idx_member_student_achievements_student;
DROP INDEX IF EXISTS idx_member_student_achievements_achievement;

-- Forum system
DROP INDEX IF EXISTS idx_member_forum_categories_order;
DROP INDEX IF EXISTS idx_member_forum_categories_active;
DROP INDEX IF EXISTS idx_member_forum_threads_category;
DROP INDEX IF EXISTS idx_member_forum_threads_student;
DROP INDEX IF EXISTS idx_member_forum_threads_pinned;
DROP INDEX IF EXISTS idx_member_forum_threads_updated;
DROP INDEX IF EXISTS idx_member_forum_posts_thread;
DROP INDEX IF EXISTS idx_member_forum_posts_student;
DROP INDEX IF EXISTS idx_member_forum_posts_created;
DROP INDEX IF EXISTS idx_member_forum_reactions_post;
DROP INDEX IF EXISTS idx_member_forum_reactions_student;

-- Live sessions
DROP INDEX IF EXISTS idx_member_live_sessions_date;
DROP INDEX IF EXISTS idx_member_live_sessions_created_by;
DROP INDEX IF EXISTS idx_member_student_session_registrations_session;
DROP INDEX IF EXISTS idx_member_student_session_registrations_student;

-- Announcements
DROP INDEX IF EXISTS idx_member_announcements_type;
DROP INDEX IF EXISTS idx_member_announcements_pinned;
DROP INDEX IF EXISTS idx_member_announcements_published;
DROP INDEX IF EXISTS idx_member_announcements_expires;
DROP INDEX IF EXISTS idx_member_announcements_created_by_admin_id;
DROP INDEX IF EXISTS idx_member_student_announcement_reads_announcement;
DROP INDEX IF EXISTS idx_member_student_announcement_reads_student;

-- Booking system
DROP INDEX IF EXISTS idx_bookings_appointment_type_id;

-- Content management
DROP INDEX IF EXISTS idx_content_uploads_content_plan_id;

-- Recommendations
DROP INDEX IF EXISTS idx_lesson_recommendations_lesson;
DROP INDEX IF EXISTS idx_lesson_recommendations_recommendation;
DROP INDEX IF EXISTS idx_module_bonus_module;