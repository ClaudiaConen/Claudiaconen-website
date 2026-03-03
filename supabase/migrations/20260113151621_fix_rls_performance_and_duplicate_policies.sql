/*
  # Fix RLS Performance and Duplicate Policies

  1. Performance Fixes
    - Optimize RLS policies to use `(select auth.<function>())` instead of `auth.<function>()`
    - Remove unused indexes to reduce maintenance overhead

  2. Security Fixes
    - Consolidate duplicate permissive policies
    - Ensure each table has only one policy per role per action

  3. Changes Made
    - Fixed RLS policies on: bookings, content_plans
    - Removed unused indexes: idx_content_uploads_content_plan_id_fk, idx_bookings_appointment_type_id_fk
    - Consolidated duplicate policies on multiple tables

  Note: Auth DB Connection Strategy and Leaked Password Protection must be configured in Supabase Dashboard
*/

-- =============================================
-- 1. FIX RLS PERFORMANCE ISSUES
-- =============================================

-- Fix bookings table RLS policy
DROP POLICY IF EXISTS "Users can view their own bookings by email" ON bookings;
CREATE POLICY "Users can view their own bookings by email"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (customer_email = (SELECT auth.jwt()->>'email'));

-- Fix content_plans table RLS policies
DROP POLICY IF EXISTS "Users can view own content plans" ON content_plans;
CREATE POLICY "Users can view own content plans"
  ON content_plans
  FOR SELECT
  TO authenticated
  USING (user_email = (SELECT auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can insert own content plans" ON content_plans;
CREATE POLICY "Users can insert own content plans"
  ON content_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = (SELECT auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can update own content plans" ON content_plans;
CREATE POLICY "Users can update own content plans"
  ON content_plans
  FOR UPDATE
  TO authenticated
  USING (user_email = (SELECT auth.jwt()->>'email'))
  WITH CHECK (user_email = (SELECT auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can delete own content plans" ON content_plans;
CREATE POLICY "Users can delete own content plans"
  ON content_plans
  FOR DELETE
  TO authenticated
  USING (user_email = (SELECT auth.jwt()->>'email'));

-- =============================================
-- 2. REMOVE UNUSED INDEXES
-- =============================================

DROP INDEX IF EXISTS idx_content_uploads_content_plan_id_fk;
DROP INDEX IF EXISTS idx_bookings_appointment_type_id_fk;

-- =============================================
-- 3. CONSOLIDATE DUPLICATE PERMISSIVE POLICIES
-- =============================================

-- abkuerzung_bookings: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON abkuerzung_bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON abkuerzung_bookings;
CREATE POLICY "Authenticated users can view bookings"
  ON abkuerzung_bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- advent_doors: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view advent doors" ON advent_doors;
DROP POLICY IF EXISTS "Anyone can view published doors" ON advent_doors;
DROP POLICY IF EXISTS "Authenticated admins can manage advent doors" ON advent_doors;

CREATE POLICY "Anyone can view published doors"
  ON advent_doors
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated admins can insert doors"
  ON advent_doors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update doors"
  ON advent_doors
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete doors"
  ON advent_doors
  FOR DELETE
  TO authenticated
  USING (true);

-- appointment_types: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view active appointment types" ON appointment_types;
DROP POLICY IF EXISTS "Authenticated users can manage appointment types" ON appointment_types;

CREATE POLICY "Anyone can view active appointment types"
  ON appointment_types
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert appointment types"
  ON appointment_types
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update appointment types"
  ON appointment_types
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete appointment types"
  ON appointment_types
  FOR DELETE
  TO authenticated
  USING (true);

-- availability_exceptions: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view availability exceptions" ON availability_exceptions;
DROP POLICY IF EXISTS "Authenticated users can manage availability exceptions" ON availability_exceptions;

CREATE POLICY "Anyone can view availability exceptions"
  ON availability_exceptions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert exceptions"
  ON availability_exceptions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exceptions"
  ON availability_exceptions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exceptions"
  ON availability_exceptions
  FOR DELETE
  TO authenticated
  USING (true);

-- availability_slots: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view active availability slots" ON availability_slots;
DROP POLICY IF EXISTS "Authenticated users can manage availability slots" ON availability_slots;

CREATE POLICY "Anyone can view active availability slots"
  ON availability_slots
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert slots"
  ON availability_slots
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update slots"
  ON availability_slots
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete slots"
  ON availability_slots
  FOR DELETE
  TO authenticated
  USING (true);

-- step_media: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view step media" ON step_media;
DROP POLICY IF EXISTS "Authenticated admins can manage step media" ON step_media;

CREATE POLICY "Anyone can view step media"
  ON step_media
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated admins can insert media"
  ON step_media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update media"
  ON step_media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete media"
  ON step_media
  FOR DELETE
  TO authenticated
  USING (true);

-- testimonials: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- user_achievements: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can read achievements" ON user_achievements;
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;

CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO anon, authenticated
  USING (email = (SELECT auth.jwt()->>'email'));

-- user_points: Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can read their own points" ON user_points;
DROP POLICY IF EXISTS "Users can view own points" ON user_points;

CREATE POLICY "Users can view own points"
  ON user_points
  FOR SELECT
  TO anon, authenticated
  USING (email = (SELECT auth.jwt()->>'email'));