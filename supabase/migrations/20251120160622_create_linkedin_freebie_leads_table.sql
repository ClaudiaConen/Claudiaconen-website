/*
  # LinkedIn Freebie Leads mit Double-Opt-In

  1. Neue Tabelle
    - `linkedin_freebie_leads`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `opted_in` (boolean, default false) - Ob Nutzer E-Mail bestätigt hat
      - `opted_in_at` (timestamptz) - Zeitpunkt der Bestätigung
      - `confirmation_token` (text, unique) - Token für Double-Opt-In
      - `token_expires_at` (timestamptz) - Ablaufdatum des Tokens (24h)
      - `download_count` (integer, default 0) - Wie oft heruntergeladen
      - `last_download_at` (timestamptz) - Letzter Download
      - `source` (text) - Tracking-Quelle (z.B. 'linkedin-post', 'linkedin-ad')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sicherheit
    - RLS aktiviert
    - Keine öffentlichen Policies (nur über Edge Functions)
    - Service Role für Backend-Operationen
*/

CREATE TABLE IF NOT EXISTS linkedin_freebie_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  opted_in boolean DEFAULT false,
  opted_in_at timestamptz,
  confirmation_token text UNIQUE,
  token_expires_at timestamptz,
  download_count integer DEFAULT 0,
  last_download_at timestamptz,
  source text DEFAULT 'organic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE linkedin_freebie_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_linkedin_leads_email ON linkedin_freebie_leads(email);
CREATE INDEX IF NOT EXISTS idx_linkedin_leads_token ON linkedin_freebie_leads(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_linkedin_leads_opted_in ON linkedin_freebie_leads(opted_in);

COMMENT ON TABLE linkedin_freebie_leads IS 'Speichert LinkedIn-Leads mit Double-Opt-In für Freebie-Downloads';
COMMENT ON COLUMN linkedin_freebie_leads.opted_in IS 'True wenn E-Mail bestätigt wurde (Double-Opt-In)';
COMMENT ON COLUMN linkedin_freebie_leads.confirmation_token IS 'Einmaliger Token für E-Mail-Bestätigung';
COMMENT ON COLUMN linkedin_freebie_leads.token_expires_at IS 'Token läuft nach 24 Stunden ab';
