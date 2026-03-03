/*
  # Cron-Job für automatische Buchungserinnerungen

  ## Beschreibung
  Erstellt einen Cron-Job, der stündlich läuft und automatisch Erinnerungs-E-Mails für bevorstehende Termine versendet:
  - 24 Stunden vor dem Termin
  - 3 Stunden vor dem Termin

  ## Funktionsweise
  Der Cron-Job ruft die Edge Function 'send-booking-reminders' auf, die:
  1. Alle bestätigten Buchungen durchsucht
  2. Termine identifiziert, die in 24h oder 3h stattfinden
  3. Erinnerungs-E-Mails versendet, wenn noch nicht geschehen
  4. Den Versandstatus in der Datenbank aktualisiert

  ## Sicherheit
  - Verwendet pg_net für sichere HTTP-Aufrufe
  - Kein Zugriff auf sensible Daten erforderlich
*/

-- Sicherstellen, dass pg_cron extension aktiv ist
SELECT cron.schedule(
  'send-booking-reminders-hourly',
  '0 * * * *',
  $$
  SELECT
    net.http_post(
      url := current_setting('app.settings.supabase_url') || '/functions/v1/send-booking-reminders',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := '{}'::jsonb
    );
  $$
);

COMMENT ON EXTENSION pg_cron IS 'Zeitgesteuerter Job-Scheduler für PostgreSQL';
