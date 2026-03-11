-- =============================================
-- Site Content: Editierbare Seiteninhalte
-- =============================================
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_key text NOT NULL,
  content text NOT NULL DEFAULT '',
  content_type text NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'richtext', 'json')),
  label text NOT NULL DEFAULT '',
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_slug, section_key)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_content_select" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content_all" ON site_content FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_site_content_page ON site_content(page_slug);

-- =============================================
-- Events: Veranstaltungen
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text DEFAULT '',
  description text DEFAULT '',
  event_date date,
  event_time text DEFAULT '',
  end_date date,
  location text DEFAULT '',
  event_type text NOT NULL DEFAULT 'online' CHECK (event_type IN ('online', 'offline', 'hybrid')),
  category text DEFAULT 'keynote' CHECK (category IN ('keynote', 'workshop', 'mentoring', 'webinar', 'networking', 'other')),
  image_url text DEFAULT '',
  registration_link text DEFAULT '',
  price_text text DEFAULT '',
  max_participants integer,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_select" ON events FOR SELECT USING (true);
CREATE POLICY "events_all" ON events FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_active ON events(is_active, display_order);

-- =============================================
-- Mentoring Packages: Mentoring-Pakete
-- =============================================
CREATE TABLE IF NOT EXISTS mentoring_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  subtitle text DEFAULT '',
  description text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  price_text text DEFAULT '',
  duration_text text DEFAULT '',
  cta_text text DEFAULT 'Jetzt buchen',
  cta_link text DEFAULT '',
  is_highlighted boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  icon text DEFAULT 'star',
  color_theme text DEFAULT 'gold',
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentoring_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mentoring_packages_select" ON mentoring_packages FOR SELECT USING (true);
CREATE POLICY "mentoring_packages_all" ON mentoring_packages FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_mentoring_packages_active ON mentoring_packages(is_active, display_order);

-- =============================================
-- Default-Daten: Mentoring-Pakete
-- =============================================
INSERT INTO mentoring_packages (name, slug, subtitle, description, features, price_text, duration_text, cta_text, cta_link, is_highlighted, display_order, color_theme) VALUES
(
  'Gold Mentoring',
  'mentoring-gold',
  'Dein persönliches Premium-Mentoring',
  'Intensive 1:1-Begleitung für maximale Wirkung. Du arbeitest direkt mit Claudia an deiner Positionierung, deiner Stimme und deinem Auftritt.',
  '["12 Wochen intensive Begleitung", "Wöchentliche 1:1 Sessions (60 Min.)", "Persönliche Positionierungsanalyse", "Stimm- und Wirkungstraining", "Individuelle Content-Strategie", "WhatsApp-Support zwischen den Sessions", "Aufzeichnungen aller Sessions"]'::jsonb,
  'Auf Anfrage',
  '12 Wochen',
  'Erstgespräch vereinbaren',
  '/termin-buchen',
  true,
  1,
  'gold'
),
(
  'Transformation Mentoring',
  'mentoring-transformation',
  'Von der Raupe zum Schmetterling',
  'Das Komplett-Paket für deine persönliche und berufliche Transformation. Tiefgreifende Arbeit an Persönlichkeit, Wirkung und Performance.',
  '["6 Monate Begleitung", "Bi-weekly 1:1 Sessions (90 Min.)", "Komplette Markenentwicklung", "Keynote-Vorbereitung", "Bühnentraining", "Medientraining", "VIP-Zugang zur Community", "Persönlicher Entwicklungsplan"]'::jsonb,
  'Auf Anfrage',
  '6 Monate',
  'Erstgespräch vereinbaren',
  '/termin-buchen',
  false,
  2,
  'navy'
),
(
  'Online Mentoring',
  'mentoring-online',
  'Flexibel und ortsunabhängig',
  'Professionelles Mentoring von überall. Perfekt für Unternehmer und Selbständige, die zeitlich flexibel bleiben wollen.',
  '["8 Wochen Programm", "Wöchentliche Video-Calls (45 Min.)", "Online-Kurs-Zugang", "Workbooks & Templates", "Community-Zugang", "E-Mail-Support"]'::jsonb,
  'Ab 1.497 €',
  '8 Wochen',
  'Jetzt starten',
  '/termin-buchen',
  false,
  3,
  'blue'
);

-- =============================================
-- Default-Daten: Beispiel-Events
-- =============================================
INSERT INTO events (title, subtitle, description, event_date, event_time, location, event_type, category, registration_link, is_featured, display_order) VALUES
(
  'The Power of AI – Live Event',
  'KI-Strategien für Unternehmer',
  'Erlebe live, wie du KI als Abkürzung nutzt, um mehr Zeit für das Wesentliche zu gewinnen. Praxisnah, inspirierend, transformierend.',
  '2026-04-15',
  '18:00 - 21:00 Uhr',
  'Online via Zoom',
  'online',
  'keynote',
  '/termin-buchen',
  true,
  1
),
(
  'Wirkungskraft Workshop',
  'Deine Stimme, dein Auftritt, deine Wirkung',
  'Ein intensiver Workshop-Tag, an dem du an deiner persönlichen Wirkung arbeitest. Stimme, Körpersprache, Storytelling – alles aus einem Guss.',
  '2026-05-10',
  '10:00 - 17:00 Uhr',
  'Köln',
  'offline',
  'workshop',
  '/termin-buchen',
  false,
  2
);
