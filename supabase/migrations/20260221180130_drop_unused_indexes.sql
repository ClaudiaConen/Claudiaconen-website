
/*
  # Drop Unused Indexes

  ## Summary
  Removes indexes that have never been used by the query planner.
  Unused indexes waste storage space and slow down write operations (INSERT/UPDATE/DELETE)
  without providing any read performance benefit.

  ## Indexes Removed
  1. idx_booking_email_logs_booking_id - on public.booking_email_logs
  2. idx_member_takeaway_items_order - on public.member_takeaway_items
  3. idx_member_mini_task_steps_order - on public.member_mini_task_steps
  4. idx_member_takeaway_completions_student - on public.member_student_takeaway_completions
  5. idx_member_takeaway_completions_takeaway - on public.member_student_takeaway_completions
  6. idx_member_mini_task_submissions_student - on public.member_student_mini_task_submissions
*/

DROP INDEX IF EXISTS public.idx_booking_email_logs_booking_id;
DROP INDEX IF EXISTS public.idx_member_takeaway_items_order;
DROP INDEX IF EXISTS public.idx_member_mini_task_steps_order;
DROP INDEX IF EXISTS public.idx_member_takeaway_completions_student;
DROP INDEX IF EXISTS public.idx_member_takeaway_completions_takeaway;
DROP INDEX IF EXISTS public.idx_member_mini_task_submissions_student;
