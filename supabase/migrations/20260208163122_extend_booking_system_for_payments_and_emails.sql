/*
  # Erweitere Buchungssystem für Zahlungen und E-Mail-Automatisierung

  ## Neue Funktionen
  1. Zahlungsintegration (Digistore24 & PayPal)
  2. E-Mail-Erinnerungen (24h & 3h vorher)
  3. E-Mail-Logging und Tracking

  ## Änderungen an bestehenden Tabellen
  
  ### appointment_types
  - `digistore_link` - Link zur Digistore24-Zahlungsseite
  - `paypal_link` - Link zur PayPal-Zahlungsseite
  - `welcome_text` - Individueller Willkommenstext für Buchungsseite
  
  ### bookings
  - `payment_status` - Status der Zahlung (pending, completed, failed)
  - `payment_provider` - Zahlungsanbieter (digistore, paypal, none)
  - `payment_transaction_id` - Transaktions-ID vom Zahlungsanbieter
  - `paid_at` - Zeitpunkt der erfolgreichen Zahlung
  - `reminder_24h_sent` - Wurde 24h-Erinnerung versendet
  - `reminder_3h_sent` - Wurde 3h-Erinnerung versendet
  - `reminder_24h_sent_at` - Zeitpunkt des 24h-Erinnerungsversands
  - `reminder_3h_sent_at` - Zeitpunkt des 3h-Erinnerungsversands
  - `meeting_link` - Video-Meeting-Link für den Termin

  ## Neue Tabellen
  
  ### booking_email_logs
  - Protokolliert alle versendeten E-Mails zu Buchungen
  - Ermöglicht Fehleranalyse und Re-Send

  ## Sicherheit
  - RLS Policies für alle neuen Tabellen
  - Admin-Zugriff für booking_email_logs
*/

-- Erweitere appointment_types Tabelle
ALTER TABLE appointment_types 
ADD COLUMN IF NOT EXISTS digistore_link text,
ADD COLUMN IF NOT EXISTS paypal_link text,
ADD COLUMN IF NOT EXISTS welcome_text text DEFAULT 'Buchen Sie Ihren Termin bequem online.';

-- Erweitere bookings Tabelle
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'none' CHECK (payment_status IN ('none', 'pending', 'completed', 'failed', 'refunded')),
ADD COLUMN IF NOT EXISTS payment_provider text CHECK (payment_provider IN ('none', 'digistore', 'paypal')),
ADD COLUMN IF NOT EXISTS payment_transaction_id text,
ADD COLUMN IF NOT EXISTS paid_at timestamptz,
ADD COLUMN IF NOT EXISTS reminder_24h_sent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_3h_sent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_24h_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS reminder_3h_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS meeting_link text;

-- Erstelle booking_email_logs Tabelle
CREATE TABLE IF NOT EXISTS booking_email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  email_type text NOT NULL CHECK (email_type IN ('confirmation', 'reminder_24h', 'reminder_3h', 'cancellation', 'update')),
  recipient_email text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Erstelle Index für Performance
CREATE INDEX IF NOT EXISTS idx_booking_email_logs_booking_id ON booking_email_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_email_logs_email_type ON booking_email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_reminder_flags ON bookings(reminder_24h_sent, reminder_3h_sent);

-- RLS für booking_email_logs aktivieren
ALTER TABLE booking_email_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admins können alle E-Mail-Logs lesen
CREATE POLICY "Admins can read all email logs"
  ON booking_email_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: System kann E-Mail-Logs erstellen (für Edge Functions)
CREATE POLICY "System can insert email logs"
  ON booking_email_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Kommentar für Dokumentation
COMMENT ON TABLE booking_email_logs IS 'Protokolliert alle versendeten E-Mails zu Buchungen für Tracking und Fehleranalyse';
COMMENT ON COLUMN bookings.payment_status IS 'Status der Zahlung: none (kostenlos), pending (ausstehend), completed (bezahlt), failed (fehlgeschlagen), refunded (erstattet)';
COMMENT ON COLUMN bookings.meeting_link IS 'Video-Meeting-Link (Zoom, Teams, etc.) für den Termin';