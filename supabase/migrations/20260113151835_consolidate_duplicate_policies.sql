/*
  # Consolidate Duplicate Permissive Policies

  ## Overview
  Removes duplicate permissive policies that can cause confusion and 
  potential security issues. Consolidates multiple policies into single,
  clear policies for each table and action.

  ## Changes Made

  ### Policy Consolidation
  - Removes duplicate SELECT policies across multiple tables
  - Creates single, clear policies for each operation
  - Ensures consistent permission patterns

  ## Tables Affected
  - abkuerzung_bookings
  - advent_doors
  - appointment_types
  - availability_exceptions
  - availability_slots
  - step_media
  - testimonials
  - user_achievements
  - user_points
*/

-- ============================================================================
-- 1. ABKUERZUNG_BOOKINGS - Remove any duplicate SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON abkuerzung_bookings;

-- Keep only the single SELECT policy
-- "Authenticated users can view bookings" already exists

-- ============================================================================
-- 2. ADVENT_DOORS - Consolidate SELECT policies
-- ============================================================================

-- Drop all existing SELECT policies
DROP POLICY IF EXISTS "Anyone can view advent doors" ON advent_doors;
DROP POLICY IF EXISTS "Anyone can view published doors" ON advent_doors;

-- Create single consolidated SELECT policy
CREATE POLICY "Anyone can view published doors"
  ON advent_doors FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR (select auth.role()) = 'authenticated');

-- Keep existing management policies
-- Already have: insert, update, delete policies

-- ============================================================================
-- 3. APPOINTMENT_TYPES - Consolidate policies
-- ============================================================================

-- The SELECT policy already exists and is correct
-- Keep existing: "Anyone can view active appointment types"
-- Keep existing management policies: insert, update, delete

-- ============================================================================
-- 4. AVAILABILITY_EXCEPTIONS - Verify single policies
-- ============================================================================

-- Already has single policies for each operation
-- No changes needed

-- ============================================================================
-- 5. AVAILABILITY_SLOTS - Verify single policies
-- ============================================================================

-- Already has single policies for each operation
-- No changes needed

-- ============================================================================
-- 6. STEP_MEDIA - Verify single policies
-- ============================================================================

-- Already has single policies for each operation
-- No changes needed

-- ============================================================================
-- 7. TESTIMONIALS - Verify single policies
-- ============================================================================

-- Already has single policies for each operation
-- No changes needed

-- ============================================================================
-- 8. USER_ACHIEVEMENTS - Remove duplicate SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can read achievements" ON user_achievements;

-- Keep only: "Users can view own achievements"
-- Already exists

-- ============================================================================
-- 9. USER_POINTS - Remove duplicate SELECT policies
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can read their own points" ON user_points;

-- Keep only: "Users can view own points"
-- Already exists
