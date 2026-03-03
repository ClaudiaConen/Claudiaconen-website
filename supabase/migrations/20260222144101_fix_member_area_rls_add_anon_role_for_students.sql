/*
  # Fix member area RLS policies -- Add anon role for student access

  Students use the anon key (not authenticated Supabase sessions) because the
  student auth system is custom (edge function + localStorage). All member tables
  that students need to read must allow the `anon` role in their SELECT policies.

  ## Tables fixed (SELECT policies updated to include anon role)
  1. `member_lesson_downloads` -- lesson download files (PDFs, docs, etc.)
  2. `member_flashcard_decks` -- flashcard deck metadata
  3. `member_flashcards` -- individual flashcard content
  4. `member_quizzes` -- quiz metadata
  5. `member_quiz_questions` -- quiz question content
  6. `member_quiz_answers` -- quiz answer options
  7. `member_achievements` -- achievement definitions
  8. `member_announcements` -- announcements for members
  9. `member_live_sessions` -- live session listings
  10. `member_welcome_content` -- welcome page content
  11. `member_forum_categories` -- forum category listings
  12. `member_forum_threads` -- forum thread listings
  13. `member_forum_posts` -- forum post content
  14. `member_forum_reactions` -- forum post reactions
  15. `member_student_session_registrations` -- session registration records

  ## Security notes
  - Only SELECT policies are modified; INSERT/UPDATE/DELETE remain authenticated-only
  - All existing USING conditions are preserved (published checks, ownership checks, etc.)
  - Admin fallback checks via admin_users table are preserved
*/

-- 1. member_lesson_downloads: drop old, create new with anon
DROP POLICY IF EXISTS "Admin or student can view downloads" ON member_lesson_downloads;
CREATE POLICY "Admin or student can view downloads"
  ON member_lesson_downloads
  FOR SELECT
  TO anon, authenticated
  USING (
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
    OR
    (EXISTS (
      SELECT 1 FROM member_course_lessons mcl
      JOIN member_course_modules mcm ON mcl.module_id = mcm.id
      WHERE mcl.id = member_lesson_downloads.lesson_id
        AND mcl.is_published = true
        AND mcm.is_published = true
    ))
  );

-- 2. member_flashcard_decks
DROP POLICY IF EXISTS "Authenticated can view flashcard decks" ON member_flashcard_decks;
CREATE POLICY "Students can view flashcard decks"
  ON member_flashcard_decks
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 3. member_flashcards
DROP POLICY IF EXISTS "Authenticated can view flashcards" ON member_flashcards;
CREATE POLICY "Students can view flashcards"
  ON member_flashcards
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. member_quizzes
DROP POLICY IF EXISTS "Authenticated can view quizzes" ON member_quizzes;
CREATE POLICY "Students can view quizzes"
  ON member_quizzes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. member_quiz_questions
DROP POLICY IF EXISTS "Authenticated can view quiz questions" ON member_quiz_questions;
CREATE POLICY "Students can view quiz questions"
  ON member_quiz_questions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. member_quiz_answers
DROP POLICY IF EXISTS "Authenticated can view quiz answers" ON member_quiz_answers;
CREATE POLICY "Students can view quiz answers"
  ON member_quiz_answers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7. member_achievements
DROP POLICY IF EXISTS "Admin or member can view achievements" ON member_achievements;
CREATE POLICY "Admin or member can view achievements"
  ON member_achievements
  FOR SELECT
  TO anon, authenticated
  USING (
    (is_active = true)
    OR
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
  );

-- 8. member_announcements
DROP POLICY IF EXISTS "Admin or member can view announcements" ON member_announcements;
CREATE POLICY "Admin or member can view announcements"
  ON member_announcements
  FOR SELECT
  TO anon, authenticated
  USING (
    ((published_at <= now()) AND ((expires_at IS NULL) OR (expires_at > now())))
    OR
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
  );

-- 9. member_live_sessions
DROP POLICY IF EXISTS "Everyone can view sessions" ON member_live_sessions;
CREATE POLICY "Everyone can view sessions"
  ON member_live_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 10. member_welcome_content
DROP POLICY IF EXISTS "Authenticated users can view welcome content" ON member_welcome_content;
CREATE POLICY "Anyone can view active welcome content"
  ON member_welcome_content
  FOR SELECT
  TO anon, authenticated
  USING (
    (is_active = true)
    OR
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
  );

-- 11. member_forum_categories
DROP POLICY IF EXISTS "Admin or member can view categories" ON member_forum_categories;
CREATE POLICY "Admin or member can view categories"
  ON member_forum_categories
  FOR SELECT
  TO anon, authenticated
  USING (
    (is_active = true)
    OR
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
  );

-- 12. member_forum_threads
DROP POLICY IF EXISTS "Admin or member can view threads" ON member_forum_threads;
CREATE POLICY "Admin or member can view threads"
  ON member_forum_threads
  FOR SELECT
  TO anon, authenticated
  USING (
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
    OR
    (EXISTS (
      SELECT 1 FROM member_forum_categories
      WHERE member_forum_categories.id = member_forum_threads.category_id
        AND member_forum_categories.is_active = true
    ))
  );

-- 13. member_forum_posts
DROP POLICY IF EXISTS "Admin or member can view posts" ON member_forum_posts;
CREATE POLICY "Admin or member can view posts"
  ON member_forum_posts
  FOR SELECT
  TO anon, authenticated
  USING (
    (EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (SELECT auth.uid()) AND admin_users.is_active = true
    ))
    OR
    (EXISTS (
      SELECT 1 FROM member_forum_threads mft
      JOIN member_forum_categories mfc ON mft.category_id = mfc.id
      WHERE mft.id = member_forum_posts.thread_id
        AND mfc.is_active = true
    ))
  );

-- 14. member_forum_reactions
DROP POLICY IF EXISTS "Everyone can view reactions" ON member_forum_reactions;
CREATE POLICY "Everyone can view reactions"
  ON member_forum_reactions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 15. member_student_session_registrations
DROP POLICY IF EXISTS "Everyone can view registrations" ON member_student_session_registrations;
CREATE POLICY "Everyone can view registrations"
  ON member_student_session_registrations
  FOR SELECT
  TO anon, authenticated
  USING (true);
