/*
  # video_url optional machen

  ## Problem
  - `video_url` ist derzeit als NOT NULL definiert
  - Lektionen sollten auch ohne Video erstellt werden können (z.B. nur Audio oder Text)
  - Das Frontend erlaubt bereits null-Werte, was zu Speicherfehlern führt

  ## Änderungen
  1. `video_url` zu nullable ändern
  2. Standardwert auf leeren String setzen für Kompatibilität

  ## Security
  - Keine Änderung an RLS-Policies erforderlich
*/

-- video_url zu nullable ändern
ALTER TABLE member_course_lessons 
  ALTER COLUMN video_url DROP NOT NULL;

-- Optional: Leere video_url mit leerem String auffüllen statt NULL
UPDATE member_course_lessons 
SET video_url = '' 
WHERE video_url IS NULL;
