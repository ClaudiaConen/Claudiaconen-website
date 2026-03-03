/*
  # Fix RLS Policies for Takeaways and Mini-Tasks

  ## Problem
  The member_takeaways, member_takeaway_items, member_mini_tasks, and member_mini_task_steps
  tables only allowed 'authenticated' role access. However, the student area uses a custom
  JWT-based authentication (not Supabase Auth), so students query as 'anon'.

  ## Changes
  - Drop existing SELECT policies that only allow 'authenticated'
  - Recreate them to also allow 'anon' (matching the pattern used for member_course_lessons)
  - Access is still restricted to content from published lessons/modules
*/

DROP POLICY IF EXISTS "Students can view takeaways from published lessons" ON member_takeaways;
DROP POLICY IF EXISTS "Students can view takeaway items from published lessons" ON member_takeaway_items;
DROP POLICY IF EXISTS "Students can view mini-tasks from published lessons" ON member_mini_tasks;
DROP POLICY IF EXISTS "Students can view mini-task steps from published lessons" ON member_mini_task_steps;

CREATE POLICY "Students can view takeaways from published lessons"
  ON member_takeaways
  FOR SELECT
  TO anon, authenticated
  USING (
    lesson_id IS NULL OR EXISTS (
      SELECT 1 FROM member_course_lessons l
      JOIN member_course_modules m ON l.module_id = m.id
      WHERE l.id = member_takeaways.lesson_id
        AND l.is_published = true
        AND m.is_published = true
    )
  );

CREATE POLICY "Students can view takeaway items from published lessons"
  ON member_takeaway_items
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_takeaways t
      WHERE t.id = member_takeaway_items.takeaway_id
        AND (
          t.lesson_id IS NULL OR EXISTS (
            SELECT 1 FROM member_course_lessons l
            JOIN member_course_modules m ON l.module_id = m.id
            WHERE l.id = t.lesson_id
              AND l.is_published = true
              AND m.is_published = true
          )
        )
    )
  );

CREATE POLICY "Students can view mini-tasks from published lessons"
  ON member_mini_tasks
  FOR SELECT
  TO anon, authenticated
  USING (
    lesson_id IS NULL OR EXISTS (
      SELECT 1 FROM member_course_lessons l
      JOIN member_course_modules m ON l.module_id = m.id
      WHERE l.id = member_mini_tasks.lesson_id
        AND l.is_published = true
        AND m.is_published = true
    )
  );

CREATE POLICY "Students can view mini-task steps from published lessons"
  ON member_mini_task_steps
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_mini_tasks t
      WHERE t.id = member_mini_task_steps.mini_task_id
        AND (
          t.lesson_id IS NULL OR EXISTS (
            SELECT 1 FROM member_course_lessons l
            JOIN member_course_modules m ON l.module_id = m.id
            WHERE l.id = t.lesson_id
              AND l.is_published = true
              AND m.is_published = true
          )
        )
    )
  );
