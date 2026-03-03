
/*
  # Fix RLS Policies That Are Always True

  ## Problem
  Two INSERT policies use `WITH CHECK (true)` which allows anyone to insert any data,
  effectively bypassing row-level security. Since this app uses a custom JWT auth system
  (students connect as 'anon'), we cannot use auth.uid(). Instead, we restrict inserts
  to only rows where the student_id references a real student in the member_students table.

  ## Changes
  1. member_student_takeaway_completions - INSERT policy: require student_id exists in member_students
  2. member_student_mini_task_submissions - INSERT policy: require student_id exists in member_students

  ## Security Improvement
  Previously any anon caller could insert arbitrary rows with any student_id.
  Now the student_id must reference an actual student record, preventing fabricated submissions.
*/

DROP POLICY IF EXISTS "Students can insert own takeaway completions" ON member_student_takeaway_completions;
DROP POLICY IF EXISTS "Students can insert own mini-task submissions" ON member_student_mini_task_submissions;

CREATE POLICY "Students can insert own takeaway completions"
  ON member_student_takeaway_completions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM member_students
      WHERE member_students.id = student_id
    )
  );

CREATE POLICY "Students can insert own mini-task submissions"
  ON member_student_mini_task_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM member_students
      WHERE member_students.id = student_id
    )
  );
