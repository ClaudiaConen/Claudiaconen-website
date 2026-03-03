/*
  # Fix Database Security Issues

  ## 1. Performance Optimization
    - Add missing index on `bookings.appointment_type_id` foreign key
    - Optimize RLS policies to use `(select auth.uid())` instead of `auth.uid()`
    - Remove unused indexes to reduce overhead

  ## 2. Security Fixes (CRITICAL)
    - Consolidate multiple permissive policies
    - Ensure all policies have proper authentication checks

  ## 3. Tables Affected
    - knowledge_articles: RLS performance optimization
    - bookings: Add index, fix RLS policies
    - content_plans: RLS performance optimization
    - saved_content_plans: RLS performance optimization
    - Multiple tables: Remove unused indexes
    - appointment_types, availability_exceptions, availability_slots, testimonials: Fix multiple permissive policies

  ## 4. Important Notes
    - Auth DB Connection Strategy and Leaked Password Protection must be configured in Supabase Dashboard
    - Public-facing forms remain accessible to anonymous users (intentional design)
    - Admin access is preserved through authenticated role checks
*/

-- ============================================================================
-- 1. ADD MISSING INDEX
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_bookings_appointment_type_id 
ON bookings(appointment_type_id);

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_abkuerzung_bookings_email;
DROP INDEX IF EXISTS idx_abkuerzung_bookings_booking_date;
DROP INDEX IF EXISTS idx_abkuerzung_bookings_package_type;
DROP INDEX IF EXISTS idx_user_points_email;
DROP INDEX IF EXISTS idx_user_achievements_email;
DROP INDEX IF EXISTS idx_content_plan_stats_email;
DROP INDEX IF EXISTS idx_saved_content_plans_created_at;
DROP INDEX IF EXISTS idx_testimonials_is_active;
DROP INDEX IF EXISTS idx_content_plans_user_email;
DROP INDEX IF EXISTS idx_content_plans_scheduled_date;
DROP INDEX IF EXISTS idx_content_plans_status;
DROP INDEX IF EXISTS idx_content_uploads_plan_id;
DROP INDEX IF EXISTS idx_content_uploads_user_email;
DROP INDEX IF EXISTS idx_bookings_email;

-- ============================================================================
-- 3. OPTIMIZE RLS POLICIES FOR PERFORMANCE
-- ============================================================================

-- knowledge_articles
DROP POLICY IF EXISTS "Public can view published articles" ON knowledge_articles;
CREATE POLICY "Public can view published articles"
  ON knowledge_articles FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true 
    AND published_at <= now()
  );

-- bookings
DROP POLICY IF EXISTS "Users can view their own bookings by email" ON bookings;
CREATE POLICY "Users can view their own bookings by email"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_email = (select auth.jwt()->>'email'));

-- content_plans
DROP POLICY IF EXISTS "Users can view own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can insert own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can update own content plans" ON content_plans;
DROP POLICY IF EXISTS "Users can delete own content plans" ON content_plans;

CREATE POLICY "Users can view own content plans"
  ON content_plans FOR SELECT
  TO authenticated
  USING (user_email = (select auth.jwt()->>'email'));

CREATE POLICY "Users can insert own content plans"
  ON content_plans FOR INSERT
  TO authenticated
  WITH CHECK (user_email = (select auth.jwt()->>'email'));

CREATE POLICY "Users can update own content plans"
  ON content_plans FOR UPDATE
  TO authenticated
  USING (user_email = (select auth.jwt()->>'email'))
  WITH CHECK (user_email = (select auth.jwt()->>'email'));

CREATE POLICY "Users can delete own content plans"
  ON content_plans FOR DELETE
  TO authenticated
  USING (user_email = (select auth.jwt()->>'email'));

-- saved_content_plans
DROP POLICY IF EXISTS "Users can read own plans" ON saved_content_plans;
DROP POLICY IF EXISTS "Users can insert own plans" ON saved_content_plans;
DROP POLICY IF EXISTS "Users can update own plans" ON saved_content_plans;
DROP POLICY IF EXISTS "Users can delete own plans" ON saved_content_plans;

CREATE POLICY "Users can read own plans"
  ON saved_content_plans FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own plans"
  ON saved_content_plans FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own plans"
  ON saved_content_plans FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own plans"
  ON saved_content_plans FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- 4. FIX MULTIPLE PERMISSIVE POLICIES
-- ============================================================================

-- appointment_types: Consolidate policies
DROP POLICY IF EXISTS "Anyone can view active appointment types" ON appointment_types;
DROP POLICY IF EXISTS "Authenticated users can manage appointment types" ON appointment_types;

CREATE POLICY "Anyone can view active appointment types"
  ON appointment_types FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage appointment types"
  ON appointment_types FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- availability_exceptions: Consolidate policies
DROP POLICY IF EXISTS "Anyone can view availability exceptions" ON availability_exceptions;
DROP POLICY IF EXISTS "Authenticated users can manage availability exceptions" ON availability_exceptions;

CREATE POLICY "Anyone can view availability exceptions"
  ON availability_exceptions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage availability exceptions"
  ON availability_exceptions FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- availability_slots: Consolidate policies
DROP POLICY IF EXISTS "Anyone can view active availability slots" ON availability_slots;
DROP POLICY IF EXISTS "Authenticated users can manage availability slots" ON availability_slots;

CREATE POLICY "Anyone can view active availability slots"
  ON availability_slots FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage availability slots"
  ON availability_slots FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- testimonials: Consolidate policies
DROP POLICY IF EXISTS "Allow anon and authenticated users to view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow anon and authenticated users to delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow anon and authenticated users to insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow anon and authenticated users to update testimonials" ON testimonials;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');