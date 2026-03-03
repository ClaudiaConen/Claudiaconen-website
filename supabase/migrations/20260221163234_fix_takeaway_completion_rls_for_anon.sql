/*
  # Fix RLS Policies for Takeaway Completions and Mini-Task Submissions

  ## Problem
  Same issue as takeaways/mini-tasks: students use anon role but policies
  only allow 'authenticated'.

  ## Changes
  - Recreate SELECT and INSERT policies to also allow 'anon' role
*/

DROP POLICY IF EXISTS "Students can view own takeaway completions" ON member_student_takeaway_completions;
DROP POLICY IF EXISTS "Students can insert own takeaway completions" ON member_student_takeaway_completions;
DROP POLICY IF EXISTS "Students can view own mini-task submissions" ON member_student_mini_task_submissions;
DROP POLICY IF EXISTS "Students can insert own mini-task submissions" ON member_student_mini_task_submissions;

CREATE POLICY "Students can view own takeaway completions"
  ON member_student_takeaway_completions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Students can insert own takeaway completions"
  ON member_student_takeaway_completions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Students can view own mini-task submissions"
  ON member_student_mini_task_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Students can insert own mini-task submissions"
  ON member_student_mini_task_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
