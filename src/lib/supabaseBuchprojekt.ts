import { createClient } from '@supabase/supabase-js';

/**
 * Dedizierter Supabase-Client NUR für das Buchprojekt
 * (THE POWER OF AI – Hauptbuch 2026 · Premiere Edition).
 *
 * Hintergrund:
 *   Die Hauptseite (claudiaconen.com) spricht über `lib/supabase.ts`
 *   mit dem Live-Production-Projekt (ref `szilqjmcqdydwwtitxyb`).
 *   Auf dieses Projekt haben wir keinen Owner-Zugriff (es wurde
 *   ursprünglich von Bolt automatisiert eingerichtet).
 *
 *   Damit wir Buchprojekt-Anmeldungen, Foto-Uploads, Edge Function
 *   trotzdem voll betreiben können, läuft das ganze Buchprojekt-
 *   Backend in einem separaten Supabase-Projekt, auf das wir
 *   vollständigen Zugriff haben (ref `eammlfkjtbqcubxpfxes`).
 *
 *   Dort liegen:
 *     - Tabelle  `buchprojekt_anmeldungen`
 *     - Storage  `buchprojekt-files`
 *     - Function `send-buchprojekt-notification`
 *
 *   Beide Werte unten sind die *öffentlichen* Anon-Konfigwerte
 *   (URL und Anon-Key) — sie würden im Build sowieso im Bundle landen.
 *   RLS schützt die Daten serverseitig.
 *
 *   Wenn das Buchprojekt später nach the-power-of-ai.team migriert wird,
 *   bleibt das Backend wie es ist — wir ändern dort nur den Frontend-
 *   Aufrufer.
 */
const BUCHPROJEKT_SUPABASE_URL = 'https://eammlfkjtbqcubxpfxes.supabase.co';
const BUCHPROJEKT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbW1sZmtqdGJxY3VieHBmeGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTcxNDcsImV4cCI6MjA4MDA3MzE0N30.6aBH-iPGT5Ez7f1GDphvplKde-ZBsiENZqB_5XgXBPQ';

export const supabaseBuchprojekt = createClient(
  BUCHPROJEKT_SUPABASE_URL,
  BUCHPROJEKT_SUPABASE_ANON_KEY,
  {
    auth: {
      // Eigener Storage-Schlüssel, damit dieser Client nicht mit dem
      // Haupt-Supabase-Client um localStorage konkurriert.
      storageKey: 'buchprojekt-supabase-auth',
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
