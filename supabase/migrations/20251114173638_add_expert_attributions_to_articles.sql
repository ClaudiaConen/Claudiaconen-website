/*
  # Füge Experten-Attribution zu Artikeln hinzu

  1. Änderungen
    - Füge `expert_attributions` Feld hinzu (JSONB Array)
    - Jedes Element enthält: name, expertise, website, contribution
    - Ermöglicht strukturierte Kennzeichnung von Expertenquellen

  2. Wichtige Hinweise
    - Ergänzt das bestehende `sources` Array-Feld
    - Beide Felder können parallel verwendet werden
    - `sources` für einfache Text-Quellen
    - `expert_attributions` für strukturierte Experten-Info
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'knowledge_articles' AND column_name = 'expert_attributions'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN expert_attributions JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

COMMENT ON COLUMN knowledge_articles.expert_attributions IS 'Strukturierte Informationen über Experten, deren Wissen in diesem Artikel verwendet wurde. Format: [{"name": "Name", "expertise": "Bereich", "website": "URL", "contribution": "Was wurde verwendet"}]';
