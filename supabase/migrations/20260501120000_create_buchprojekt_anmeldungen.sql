/* # Buchprojekt-Anmeldungen
 *
 * Lead-Tabelle für Bewerbungen zum Buchprojekt
 * "THE POWER OF AI – Hauptbuch 2026 · Premiere Edition".
 *
 * Frontend: src/components/BuchprojektFormModal.tsx (Insert)
 *           src/pages/AdminBuchprojektDashboard.tsx (Liste / Detail)
 *           src/pages/MemberBuchprojekt.tsx (eigene Anmeldung)
 *
 * Foto- und QR-Code-Uploads landen im Storage-Bucket "buchprojekt-files".
 */

CREATE TABLE IF NOT EXISTS buchprojekt_anmeldungen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Kontaktdaten
  name text NOT NULL,
  unternehmen text,
  stadt text,
  email text NOT NULL,
  telefon text,

  -- Beitrag
  beitragstitel text,
  story text,
  ki_erfahrung text,
  learnings text,
  zukunft text,
  cta text,

  -- Produkt / Tier + Add-Ons
  tier text NOT NULL CHECK (tier IN ('standard', 'business', 'premium')),
  tier_price integer NOT NULL,
  addon_sparring boolean NOT NULL DEFAULT false,
  addon_chronist boolean NOT NULL DEFAULT false,
  total_price integer NOT NULL,

  -- Uploads
  photo_url text,
  qr_url text,

  -- Optionale Verknüpfung mit Member, falls Anmelder eingeloggt war
  member_student_id uuid,

  -- Workflow / Status
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'invoiced', 'paid', 'in_production', 'delivered', 'declined')),
  admin_notes text,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indizes für häufige Queries
CREATE INDEX IF NOT EXISTS buchprojekt_anmeldungen_email_idx
  ON buchprojekt_anmeldungen (lower(email));
CREATE INDEX IF NOT EXISTS buchprojekt_anmeldungen_status_idx
  ON buchprojekt_anmeldungen (status);
CREATE INDEX IF NOT EXISTS buchprojekt_anmeldungen_created_at_idx
  ON buchprojekt_anmeldungen (created_at DESC);

-- updated_at automatisch pflegen
CREATE OR REPLACE FUNCTION buchprojekt_anmeldungen_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS buchprojekt_anmeldungen_updated_at ON buchprojekt_anmeldungen;
CREATE TRIGGER buchprojekt_anmeldungen_updated_at
  BEFORE UPDATE ON buchprojekt_anmeldungen
  FOR EACH ROW
  EXECUTE FUNCTION buchprojekt_anmeldungen_set_updated_at();

-- RLS
ALTER TABLE buchprojekt_anmeldungen ENABLE ROW LEVEL SECURITY;

-- Jeder Besucher darf eine Anmeldung absenden.
CREATE POLICY "Anyone can submit Buchprojekt-Anmeldung"
  ON buchprojekt_anmeldungen FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- SELECT ist nötig für:
--   * das Admin-Dashboard (UI-seitige Admin-Auth-Prüfung erfolgt im Frontend
--     wie bei den anderen Admin-Pages auch)
--   * das Member-Dashboard, das eigene Anmeldungen via .eq('email', …) liest
-- TODO Security: später per RPC + Admin-Token härten.
CREATE POLICY "Read Buchprojekt-Anmeldungen"
  ON buchprojekt_anmeldungen FOR SELECT
  TO anon, authenticated
  USING (true);

-- UPDATE: für Admin-Status-Wechsel.
CREATE POLICY "Update Buchprojekt-Anmeldungen"
  ON buchprojekt_anmeldungen FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Storage-Bucket für Foto + QR-Code
INSERT INTO storage.buckets (id, name, public)
VALUES ('buchprojekt-files', 'buchprojekt-files', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "buchprojekt_files_upload"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'buchprojekt-files');

CREATE POLICY "buchprojekt_files_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'buchprojekt-files');
