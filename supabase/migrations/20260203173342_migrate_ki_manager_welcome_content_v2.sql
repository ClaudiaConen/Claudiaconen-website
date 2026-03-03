/*
  # Migrate KI-Manager Content to Course-Specific Welcome

  1. Updates
    - Move detailed KI-Manager content from global welcome to course-specific welcome
    - Add video URL and platform to KI-Manager course welcome
    - Create course-specific welcome cards with the 7 learning goals
    - Update global welcome to be generic for all courses
    
  2. Security
    - No RLS changes needed (existing policies apply)
*/

-- Update KI-Manager course welcome content with detailed information and video
UPDATE member_course_welcome_content
SET 
  title = 'Willkommen zu deiner KI-Manager-Ausbildung:',
  description = 'Die Zukunft ist jetzt: KI als Werkzeug, Persönlichkeit als Stärke: Du hast erkannt: Die Zukunft verändert sich – und ein klarer Blick auf Veränderung ist essenziell. Nicht irgendwann, sondern jetzt: Die Karten werden neu gemischt. KI ist nicht langsam. Sie fragt nicht, ob du bereit bist. Hier geht es nicht um Hype, sondern um Handlungssicherheit: KI in dein Business integrieren, Prozesse optimieren, deine Arbeit erleichtern – und klar erkennen, was möglich ist und was nicht.

Du brauchst nicht mehr Arbeit, du brauchst mehr Zeit: für Kunden, Führung und echte Verbindung. KI ist Werkzeug, Persönlichkeit ist Macht. Vertrauen entsteht nicht durch perfekte Inhalte, sondern durch Persönlichkeit. Wenn Perfektion auf Mausklick funktioniert, wird Menschlichkeit zum Luxus. Mit Durchblick triffst du klare Entscheidungen: Was nutzt deinem Business wirklich, was bringt dich (und dein Team) weiter und was kostet nur Zeit und Ressourcen? Willkommen in deiner KI-Manager-Ausbildung.

„KI ist Werkzeug - Persönlichkeit ist Macht." Danke für dein Vertrauen.',
  video_url = 'https://vimeo.com/1157184527?share=copy&fl=sv&fe=ci',
  video_platform = 'vimeo',
  updated_at = now()
WHERE course_id = '16f17971-b7f2-4710-8da1-f737530d1ab5';

-- Delete existing generic cards for KI-Manager course
DELETE FROM member_course_welcome_cards 
WHERE course_id = '16f17971-b7f2-4710-8da1-f737530d1ab5';

-- Add the detailed 7 learning goals card
INSERT INTO member_course_welcome_cards (course_id, title, description, icon_name, link_url, link_text, order_index)
VALUES (
  '16f17971-b7f2-4710-8da1-f737530d1ab5',
  '7 Lernziele, ein Ergebnis: KI verstehen, anwenden und Zeit gewinnen',
  '1. KI verstehen: Grundlegende und fortgeschrittene Konzepte wie maschinelles Lernen und Deep Learning verstehen und anwenden.

2. Projektmanagement: KI-Projekte erfolgreich initiieren und umsetzen – inklusive Integration agiler Methoden.

3. KI-Sicherheit: Ethische, rechtliche und sicherheitsrelevante Herausforderungen der KI-Nutzung kennen.

4. Daten als Grundlage: Die strategische Rolle von Datenmanagement in KI-Projekten verstehen und effizient anwenden.

5. Mit KI zum Erfolg: KI als strategisches Instrument nutzen, um Geschäftsprozesse zu optimieren und Innovationen zu fördern.

6. Live sehen, wie ich KI nutze: Du erlebst, wie ich KI, Avatare und KI-Stimmen einsetze, um Zeitersparnis sichtbar zu machen – inkl. wechselnder Tonalitäten („Was ist echt und was nicht?").

7. Tools testen & Ergebnisse mitgeben: Ich probiere Programme aus (mit Einarbeitungsaufwand) und gebe dir mit, was daraus entstanden ist – z. B. Workbook, Audio, Avatar oder KI-Stimme.

Kurzer persönlicher Satz: Wenn ich das mit über 50, ohne viel technischen Verstand und ohne Hintergrundwissen lernen konnte, kannst du es auch.',
  'Video',
  'https://vimeo.com/1157206486',
  'Video ansehen',
  1
);

-- Add additional helpful cards for the KI-Manager course
INSERT INTO member_course_welcome_cards (course_id, title, description, icon_name, order_index)
VALUES 
  (
    '16f17971-b7f2-4710-8da1-f737530d1ab5',
    'Lerne in deinem Tempo',
    'Alle Inhalte sind jederzeit verfügbar. Du entscheidest, wann und wie schnell du lernst.',
    'Clock',
    2
  ),
  (
    '16f17971-b7f2-4710-8da1-f737530d1ab5',
    'Sammle XP und Level auf',
    'Für jede abgeschlossene Lektion erhältst du XP. Steige auf und schalte Achievements frei!',
    'Award',
    3
  ),
  (
    '16f17971-b7f2-4710-8da1-f737530d1ab5',
    'Nutze die Community',
    'Tausche dich im Forum aus, stelle Fragen und lerne von anderen Teilnehmern.',
    'MessageSquare',
    4
  ),
  (
    '16f17971-b7f2-4710-8da1-f737530d1ab5',
    'Praxisnahe Übungen',
    'Setze das Gelernte direkt um mit Quizzes, Flashcards und praktischen Aufgaben.',
    'Target',
    5
  );

-- Update global welcome content to be generic
UPDATE member_welcome_content
SET 
  welcome_title = 'Willkommen im Mitgliederbereich!',
  welcome_message = 'Schön, dass du da bist! Hier findest du alle deine Kurse, kannst deinen Fortschritt verfolgen und mit der Community in Kontakt treten.

Nutze die Navigation oben, um zwischen deinen Kursen zu wechseln, dein Profil anzupassen oder im Forum aktiv zu werden. Für jede abgeschlossene Lektion erhältst du Erfahrungspunkte (XP) und kannst Achievements freischalten.

Viel Erfolg auf deiner Lernreise!',
  video_url = null,
  video_platform = null,
  guide_cards_json = '[
    {
      "icon": "BookOpen",
      "title": "Deine Kurse",
      "number": 1,
      "description": "Wähle einen Kurs aus und starte mit dem Lernen. Alle Inhalte sind jederzeit verfügbar."
    },
    {
      "icon": "Trophy",
      "title": "Fortschritt verfolgen",
      "number": 2,
      "description": "Sammle XP, steige Level auf und schalte Achievements frei. Dein Fortschritt wird automatisch gespeichert."
    },
    {
      "icon": "Users",
      "title": "Community",
      "number": 3,
      "description": "Tausche dich im Forum aus, stelle Fragen und lerne von anderen Mitgliedern."
    },
    {
      "icon": "Calendar",
      "title": "Live-Sessions",
      "number": 4,
      "description": "Nimm an Live-Sessions teil und lerne direkt von Experten. Termine findest du im Session-Bereich."
    }
  ]'::jsonb,
  updated_at = now()
WHERE is_active = true;

-- Delete old welcome guide cards (they're now in the JSON field)
DELETE FROM welcome_guide_cards;