/*
  # Fix Function Search Path Mutability

  1. Security Fix
    - Set explicit search_path for functions to prevent search path manipulation attacks
    - Ensures functions always resolve schema-qualified objects correctly
    
  2. Functions Fixed
    - update_module_progress
    - calculate_next_review_date
    - update_flashcard_next_review
    - award_achievement_xp
    - update_thread_post_count
    - is_session_full
    - get_session_registration_count
    - get_unread_announcements_count
    - get_announcement_read_count
    - has_student_read_announcement
    - get_next_lesson_for_student
    - get_student_rank
*/

-- Set search_path for all affected functions
ALTER FUNCTION update_module_progress SET search_path = public, pg_temp;
ALTER FUNCTION calculate_next_review_date SET search_path = public, pg_temp;
ALTER FUNCTION update_flashcard_next_review SET search_path = public, pg_temp;
ALTER FUNCTION award_achievement_xp SET search_path = public, pg_temp;
ALTER FUNCTION update_thread_post_count SET search_path = public, pg_temp;
ALTER FUNCTION is_session_full SET search_path = public, pg_temp;
ALTER FUNCTION get_session_registration_count SET search_path = public, pg_temp;
ALTER FUNCTION get_unread_announcements_count SET search_path = public, pg_temp;
ALTER FUNCTION get_announcement_read_count SET search_path = public, pg_temp;
ALTER FUNCTION has_student_read_announcement SET search_path = public, pg_temp;
ALTER FUNCTION get_next_lesson_for_student SET search_path = public, pg_temp;
ALTER FUNCTION get_student_rank SET search_path = public, pg_temp;