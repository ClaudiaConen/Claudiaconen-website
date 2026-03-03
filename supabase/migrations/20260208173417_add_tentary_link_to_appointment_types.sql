/*
  # Tentary Zahlungslink hinzufügen
  
  1. Änderungen
    - Fügt `tentary_link` Spalte zur `appointment_types` Tabelle hinzu
    - Ermöglicht Tentary als weitere Zahlungsoption neben Digistore24 und PayPal
  
  2. Details
    - Spalte: tentary_link (text, nullable)
    - Speichert den Tentary-Shop-Link für Zahlungen
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'appointment_types' 
    AND column_name = 'tentary_link'
  ) THEN
    ALTER TABLE appointment_types 
    ADD COLUMN tentary_link text;
  END IF;
END $$;