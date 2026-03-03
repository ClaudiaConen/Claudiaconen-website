-- Booking Calendar System
-- Complete booking calendar with appointment types, availability, and bookings

-- 1. Appointment Types Table
CREATE TABLE IF NOT EXISTS appointment_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration_minutes integer NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  color text DEFAULT '#3b82f6',
  is_active boolean DEFAULT true,
  booking_buffer_minutes integer DEFAULT 0,
  advance_booking_days integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Availability Slots (Regular weekly schedule)
CREATE TABLE IF NOT EXISTS availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 3. Availability Exceptions (Vacations, special hours)
CREATE TABLE IF NOT EXISTS availability_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  is_available boolean DEFAULT false,
  start_time time,
  end_time time,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_type_id uuid NOT NULL REFERENCES appointment_types(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  admin_notes text,
  confirmation_token text,
  confirmed_at timestamptz,
  google_calendar_event_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Calendar Connections (for Google Calendar sync)
CREATE TABLE IF NOT EXISTS calendar_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'google',
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  calendar_id text,
  is_active boolean DEFAULT false,
  sync_direction text DEFAULT 'bidirectional' CHECK (sync_direction IN ('to_google', 'from_google', 'bidirectional')),
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(appointment_date, status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_availability_slots_day ON availability_slots(day_of_week);
CREATE INDEX IF NOT EXISTS idx_availability_exceptions_date ON availability_exceptions(date);

-- Enable RLS
ALTER TABLE appointment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointment_types
CREATE POLICY "Anyone can view active appointment types"
  ON appointment_types FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage appointment types"
  ON appointment_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for availability_slots
CREATE POLICY "Anyone can view active availability slots"
  ON availability_slots FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage availability slots"
  ON availability_slots FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for availability_exceptions
CREATE POLICY "Anyone can view availability exceptions"
  ON availability_exceptions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage availability exceptions"
  ON availability_exceptions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings by email"
  ON bookings FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for calendar_connections
CREATE POLICY "Only authenticated users can manage calendar connections"
  ON calendar_connections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default appointment types
INSERT INTO appointment_types (name, description, duration_minutes, price, color) VALUES
  ('Erstgespräch (30 Min.)', 'Kostenloses Erstgespräch zum Kennenlernen', 30, 0, '#10b981'),
  ('Coaching Session (60 Min.)', 'Einzelcoaching für persönliche Entwicklung', 60, 150, '#3b82f6'),
  ('Intensive Session (90 Min.)', 'Intensive Coaching Session für tiefgehende Themen', 90, 200, '#8b5cf6'),
  ('Workshop Buchung', 'Buchung für Workshop oder Gruppenveranstaltung', 120, 300, '#f59e0b')
ON CONFLICT DO NOTHING;