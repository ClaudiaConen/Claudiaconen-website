/*
  # Fix Critical RLS Policies That Always Return True

  1. Security Issues Fixed
    - Remove overly permissive RLS policies that bypass security
    - These tables should only be accessed via admin edge functions using service role
    - Authenticated users should not have direct database access to admin tables
    
  2. Tables Affected
    - advent_doors
    - appointment_types
    - availability_slots
    - availability_exceptions
    - step_media
    - testimonials
    
  3. Approach
    - Drop the "always true" policies for authenticated users
    - These tables will be accessed via edge functions with service role key
    - Service role bypasses RLS, providing proper admin-only access
*/

-- Fix advent_doors policies
DROP POLICY IF EXISTS "Authenticated admins can delete doors" ON advent_doors;
DROP POLICY IF EXISTS "Authenticated admins can insert doors" ON advent_doors;
DROP POLICY IF EXISTS "Authenticated admins can update doors" ON advent_doors;

-- Fix appointment_types policies
DROP POLICY IF EXISTS "Authenticated users can delete appointment types" ON appointment_types;
DROP POLICY IF EXISTS "Authenticated users can insert appointment types" ON appointment_types;
DROP POLICY IF EXISTS "Authenticated users can update appointment types" ON appointment_types;

-- Fix availability_exceptions policies
DROP POLICY IF EXISTS "Authenticated users can delete exceptions" ON availability_exceptions;
DROP POLICY IF EXISTS "Authenticated users can insert exceptions" ON availability_exceptions;
DROP POLICY IF EXISTS "Authenticated users can update exceptions" ON availability_exceptions;

-- Fix availability_slots policies
DROP POLICY IF EXISTS "Authenticated users can delete slots" ON availability_slots;
DROP POLICY IF EXISTS "Authenticated users can insert slots" ON availability_slots;
DROP POLICY IF EXISTS "Authenticated users can update slots" ON availability_slots;

-- Fix step_media policies
DROP POLICY IF EXISTS "Authenticated admins can delete media" ON step_media;
DROP POLICY IF EXISTS "Authenticated admins can insert media" ON step_media;
DROP POLICY IF EXISTS "Authenticated admins can update media" ON step_media;

-- Fix testimonials policies
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;