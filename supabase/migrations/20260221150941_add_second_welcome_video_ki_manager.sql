/*
  # Add Second Welcome Video for KI Manager Course

  ## Summary
  Adds a second video entry to the member_course_welcome_content table for the
  KI Manager Ausbildung course. This video ("7 Lernziele...") was previously only
  accessible as a link card (Wegweiser Karte 1) and is now elevated to a full
  video block directly below the main welcome video.

  ## Changes
  - New entry in `member_course_welcome_content` with order_index 2
  - Video URL from the existing Karte 1: https://vimeo.com/1157206486
  - Title and description taken from the card content

  ## Notes
  - The Wegweiser card (Karte 1) with icon_name='Video' will be filtered out from
    the cards display in the frontend to avoid duplication
*/

INSERT INTO member_course_welcome_content (
  course_id,
  title,
  description,
  video_url,
  video_platform,
  order_index
)
SELECT
  '16f17971-b7f2-4710-8da1-f737530d1ab5',
  '7 Lernziele, ein Ergebnis: KI verstehen, anwenden und Zeit gewinnen',
  E'1. KI verstehen: Grundlegende und fortgeschrittene Konzepte wie maschinelles Lernen und Deep Learning verstehen und anwenden.\n\n2. Projektmanagement: KI-Projekte erfolgreich initiieren und umsetzen – inklusive Integration agiler Methoden.\n\n3. KI-Sicherheit: Ethische, rechtliche und sicherheitsrelevante Herausforderungen der KI-Nutzung kennen.\n\n4. Daten als Grundlage: Die strategische Rolle von Datenmanagement in KI-Projekten verstehen und effizient anwenden.\n\n5. Mit KI zum Erfolg: KI als strategisches Instrument nutzen, um Geschäftsprozesse zu optimieren und Innovationen zu fördern.\n\n6. Live sehen, wie ich KI nutze: Du erlebst, wie ich KI, Avatare und KI-Stimmen einsetze, um Zeitersparnis sichtbar zu machen – inkl. wechselnder Tonalitäten.\n\n7. Tools testen & Ergebnisse mitgeben: Ich probiere Programme aus (mit Einarbeitungsaufwand) und gebe dir mit, was daraus entstanden ist – z. B. Workbook, Audio, Avatar oder KI-Stimme.\n\nWenn ich das mit über 50, ohne viel technischen Verstand und ohne Hintergrundwissen lernen konnte, kannst du es auch.',
  'https://vimeo.com/1157206486',
  'vimeo',
  2
WHERE NOT EXISTS (
  SELECT 1 FROM member_course_welcome_content
  WHERE course_id = '16f17971-b7f2-4710-8da1-f737530d1ab5'
  AND order_index = 2
);
