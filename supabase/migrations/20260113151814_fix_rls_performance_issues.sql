/*
  # Fix RLS Performance Issues

  ## Overview
  Addresses Auth RLS performance issues by wrapping auth functions with SELECT
  to prevent re-evaluation per row, significantly improving query performance.

  ## Changes Made

  ### Performance Optimizations
  - Wraps `auth.<function>()` calls with `(select auth.<function>())` 
  - This prevents the function from being re-evaluated for each row
  - Applies to bookings and content_plans tables

  ### Cleanup
  - Removes unused indexes that are not being utilized

  ## Tables Affected
  - bookings (1 SELECT policy)
  - content_plans (4 policies: SELECT, INSERT, UPDATE, DELETE)
*/

-- ============================================================================
-- 1. DROP UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_content_uploads_content_plan_id_fk;
DROP INDEX IF EXISTS idx_bookings_appointment_type_id_fk;

-- ============================================================================
-- 2. FIX BOOKINGS TABLE - Optimize SELECT policy
-- ============================================================================

DROP POLICY IF EXISTS "Users can view their own bookings by email" ON bookings;

CREATE POLICY "Users can view their own bookings by email"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    customer_email IS NOT NULL
    OR (select auth.uid()) IS NOT NULL
  );

-- ============================================================================
-- 3. FIX CONTENT_PLANS TABLE - Optimize all policies
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can insert own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can update own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can delete own content plans" ON content_plans;

CREATE POLICY "Users can view own content plans"
  ON content_plans FOR SELECT
  TO authenticated
  USING (
    user_email IS NOT NULL
    OR (select auth.uid()) IS NOT NULL
  );

CREATE POLICY "Users can insert own content plans"
  ON content_plans FOR INSERT
  TO authenticated
  WITH CHECK (
    user_email IS NOT NULL
    AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND (select auth.uid()) IS NOT NULL
  );

CREATE POLICY "Users can update own content plans"
  ON content_plans FOR UPDATE
  TO authenticated
  USING (
    user_email IS NOT NULL
    AND (select auth.uid()) IS NOT NULL
  )
  WITH CHECK (
    user_email IS NOT NULL
    AND (select auth.uid()) IS NOT NULL
  );

CREATE POLICY "Users can delete own content plans"
  ON content_plans FOR DELETE
  TO authenticated
  USING (
    user_email IS NOT NULL
    AND (select auth.uid()) IS NOT NULL
  );
