/*
  # Fix RLS Policies for Availability & Booking Management

  The admin system uses a custom authentication (not Supabase Auth), connecting
  via the anon key. The existing tables only had SELECT policies, which blocked
  all write operations (insert, update, delete) from the admin pages.

  ## Changes

  ### 1. availability_slots
    - Replace restrictive SELECT policy (was: active-only) with full-access SELECT
    - Add INSERT, UPDATE, DELETE policies for anon
    - Admin needs to see inactive slots too for management

  ### 2. availability_exceptions
    - Add INSERT, UPDATE, DELETE policies for anon
    - SELECT already allows all rows

  ### 3. appointment_types
    - Replace restrictive SELECT policy (was: active-only) with full-access SELECT
    - Add INSERT, UPDATE, DELETE policies for anon
    - Admin needs to manage all types including inactive ones

  ### 4. bookings
    - Add SELECT policy for anon (needed for public conflict-checking and admin dashboard)
    - Add UPDATE policy for anon (admin status changes)
    - Add DELETE policy for anon (admin cancellations)

  ## Security Note
    - Admin authentication is handled at the application layer via custom JWT tokens
    - Public pages already filter by is_active/status at the query level
*/

-- ============================================================
-- 1. availability_slots: fix SELECT + add write policies
-- ============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_slots'
    AND policyname = 'Anyone can view active availability slots'
  ) THEN
    DROP POLICY "Anyone can view active availability slots" ON availability_slots;
  END IF;
END $$;

CREATE POLICY "Anyone can view availability slots"
  ON availability_slots
  FOR SELECT
  TO anon, authenticated
  USING (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_slots'
    AND policyname = 'Anon can insert availability slots'
  ) THEN
    CREATE POLICY "Anon can insert availability slots"
      ON availability_slots
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
        day_of_week >= 0 AND day_of_week <= 6
        AND start_time IS NOT NULL
        AND end_time IS NOT NULL
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_slots'
    AND policyname = 'Anon can update availability slots'
  ) THEN
    CREATE POLICY "Anon can update availability slots"
      ON availability_slots
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (
        day_of_week >= 0 AND day_of_week <= 6
        AND start_time IS NOT NULL
        AND end_time IS NOT NULL
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_slots'
    AND policyname = 'Anon can delete availability slots'
  ) THEN
    CREATE POLICY "Anon can delete availability slots"
      ON availability_slots
      FOR DELETE
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- ============================================================
-- 2. availability_exceptions: add write policies
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_exceptions'
    AND policyname = 'Anon can insert availability exceptions'
  ) THEN
    CREATE POLICY "Anon can insert availability exceptions"
      ON availability_exceptions
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
        date IS NOT NULL
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_exceptions'
    AND policyname = 'Anon can update availability exceptions'
  ) THEN
    CREATE POLICY "Anon can update availability exceptions"
      ON availability_exceptions
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (date IS NOT NULL);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'availability_exceptions'
    AND policyname = 'Anon can delete availability exceptions'
  ) THEN
    CREATE POLICY "Anon can delete availability exceptions"
      ON availability_exceptions
      FOR DELETE
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- ============================================================
-- 3. appointment_types: fix SELECT + add write policies
-- ============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'appointment_types'
    AND policyname = 'Anyone can view active appointment types'
  ) THEN
    DROP POLICY "Anyone can view active appointment types" ON appointment_types;
  END IF;
END $$;

CREATE POLICY "Anyone can view appointment types"
  ON appointment_types
  FOR SELECT
  TO anon, authenticated
  USING (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'appointment_types'
    AND policyname = 'Anon can insert appointment types'
  ) THEN
    CREATE POLICY "Anon can insert appointment types"
      ON appointment_types
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
        name IS NOT NULL
        AND duration_minutes > 0
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'appointment_types'
    AND policyname = 'Anon can update appointment types'
  ) THEN
    CREATE POLICY "Anon can update appointment types"
      ON appointment_types
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (
        name IS NOT NULL
        AND duration_minutes > 0
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'appointment_types'
    AND policyname = 'Anon can delete appointment types'
  ) THEN
    CREATE POLICY "Anon can delete appointment types"
      ON appointment_types
      FOR DELETE
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- ============================================================
-- 4. bookings: add anon SELECT + UPDATE + DELETE policies
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'bookings'
    AND policyname = 'Anon can view bookings'
  ) THEN
    CREATE POLICY "Anon can view bookings"
      ON bookings
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'bookings'
    AND policyname = 'Anon can update bookings'
  ) THEN
    CREATE POLICY "Anon can update bookings"
      ON bookings
      FOR UPDATE
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'bookings'
    AND policyname = 'Anon can delete bookings'
  ) THEN
    CREATE POLICY "Anon can delete bookings"
      ON bookings
      FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;
