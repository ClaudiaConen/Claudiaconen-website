/*
  # Downloadbare Ressourcen für Adventskalender-Türchen

  1. Änderungen an bestehenden Tabellen
    - `advent_doors` erweitert um:
      - `resources_json` (jsonb) - Enthält Array von downloadbaren Ressourcen
        Struktur: [{
          type: 'checklist' | 'worksheet' | 'training' | 'guide' | 'template',
          title: string,
          description: string,
          file_url: string,
          file_name: string,
          icon: string
        }]
  
  2. Neue Tabelle
    - `advent_downloads`
      - `id` (uuid, primary key)
      - `user_email` (text)
      - `door_number` (integer)
      - `resource_type` (text)
      - `resource_title` (text)
      - `downloaded_at` (timestamp)
      - Tracking welche Ressourcen heruntergeladen wurden

  3. Security
    - Enable RLS auf advent_downloads
    - Public kann eigene Downloads tracken
*/

-- Erweitere advent_doors Tabelle
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'advent_doors' AND column_name = 'resources_json'
  ) THEN
    ALTER TABLE advent_doors ADD COLUMN resources_json jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Erstelle advent_downloads Tabelle
CREATE TABLE IF NOT EXISTS advent_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  door_number integer NOT NULL,
  resource_type text NOT NULL,
  resource_title text NOT NULL,
  downloaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advent_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track downloads"
  ON advent_downloads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own downloads"
  ON advent_downloads
  FOR SELECT
  TO public
  USING (true);

-- Index für schnellere Abfragen
CREATE INDEX IF NOT EXISTS idx_advent_downloads_email_door 
  ON advent_downloads(user_email, door_number);
