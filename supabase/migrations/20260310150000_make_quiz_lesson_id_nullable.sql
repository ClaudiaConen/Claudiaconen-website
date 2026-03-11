/*
  # Quiz lesson_id nullable machen

  ## Problem
  Beim Erstellen eines neuen Quiz über /admin/member-kurse/quiz/new wird lesson_id als NULL gesendet,
  da die Lektionszuordnung nachträglich über die Quiz-Liste erfolgt.
  Die Spalte war aber als NOT NULL definiert, was den Insert blockiert hat.

  ## Lösung
  lesson_id wird nullable gemacht. Quizze können ohne Lektionszuordnung erstellt
  und nachträglich zugewiesen werden.

  PostgreSQL UNIQUE erlaubt mehrere NULL-Werte, daher kein Problem mit dem bestehenden UNIQUE-Constraint.
*/

ALTER TABLE member_quizzes ALTER COLUMN lesson_id DROP NOT NULL;
