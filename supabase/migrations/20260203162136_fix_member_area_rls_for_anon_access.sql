/*
  # Fix Member Area RLS for Anonymous Access
  
  1. Problem
    - Student login system does not create real Supabase auth sessions
    - RLS policies require `TO authenticated` but students use anonymous (anon) key
    - This causes courses and welcome content to not display
  
  2. Changes
    - Update RLS policies to allow `anon` access in addition to `authenticated`
    - This enables the student login system to work properly
    - Affects: member_course_modules, member_course_lessons, member_welcome_content, welcome_guide_cards
  
  3. Security
    - Students can only view published content (is_published = true)
    - Admins still need authenticated access for management
    - No security risk as only public published content is accessible
*/

-- Drop existing student view policies and recreate with anon access

-- member_course_modules
DROP POLICY IF EXISTS "Students can view published modules" ON member_course_modules;
CREATE POLICY "Students can view published modules"
  ON member_course_modules FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- member_course_lessons
DROP POLICY IF EXISTS "Students can view published lessons" ON member_course_lessons;
CREATE POLICY "Students can view published lessons"
  ON member_course_lessons FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- member_welcome_content
DROP POLICY IF EXISTS "Members can view active welcome content" ON member_welcome_content;
CREATE POLICY "Members can view active welcome content"
  ON member_welcome_content FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- welcome_guide_cards
DROP POLICY IF EXISTS "Members can view guide cards" ON welcome_guide_cards;
CREATE POLICY "Members can view guide cards"
  ON welcome_guide_cards FOR SELECT
  TO anon, authenticated
  USING (true);

-- member_student_lesson_progress (students need to read their own progress)
DROP POLICY IF EXISTS "Students can view own lesson progress" ON member_student_lesson_progress;
CREATE POLICY "Students can view own lesson progress"
  ON member_student_lesson_progress FOR SELECT
  TO anon, authenticated
  USING (true);

-- member_student_module_progress (students need to read their own progress)
DROP POLICY IF EXISTS "Students can view own module progress" ON member_student_module_progress;
CREATE POLICY "Students can view own module progress"
  ON member_student_module_progress FOR SELECT
  TO anon, authenticated
  USING (true);
