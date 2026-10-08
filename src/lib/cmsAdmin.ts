import { getToken } from './adminAuth';

// Admin-Zugriff auf die Inhalte, die im Community-Supabase-Projekt (eammlfkjtbqcubxpfxes) liegen:
// Termine (website_events), Seiteninhalte (site_content), Mentoring-Pakete (mentoring_packages)
// und Buchprojekt-Anmeldungen (buchprojekt_anmeldungen).
//
// Früher schrieb die Hauptseite diese Tabellen direkt mit dem öffentlichen anon-Schlüssel.
// Seit dem Datenschutz-Update (08.10.2026) sind sie nur noch für Admins änderbar/lesbar. Deshalb
// läuft jeder schreibende/lesende Admin-Zugriff jetzt über die Server-Funktion `cms-admin`, die das
// Admin-Token der Hauptseite prüft und erst dann mit dem Server-Schlüssel arbeitet.

const CMS_SUPABASE_URL = 'https://eammlfkjtbqcubxpfxes.supabase.co';
const CMS_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbW1sZmtqdGJxY3VieHBmeGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTcxNDcsImV4cCI6MjA4MDA3MzE0N30.6aBH-iPGT5Ez7f1GDphvplKde-ZBsiENZqB_5XgXBPQ';

export type CmsTable = 'website_events' | 'site_content' | 'mentoring_packages' | 'buchprojekt_anmeldungen';

interface CmsRequest {
  action: 'list' | 'insert' | 'update' | 'delete' | 'upload_url';
  table?: CmsTable;
  id?: string;
  values?: Record<string, unknown>;
  filename?: string;
}

async function cmsCall<T = unknown>(payload: CmsRequest): Promise<T> {
  const adminToken = getToken();
  if (!adminToken) {
    throw new Error('Keine Anmeldung gefunden. Bitte im Admin-Bereich neu einloggen.');
  }

  const response = await fetch(`${CMS_SUPABASE_URL}/functions/v1/cms-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CMS_SUPABASE_ANON_KEY}`,
      'X-Admin-Token': adminToken,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || 'Ein Fehler ist aufgetreten.');
  }
  return result as T;
}

export async function cmsList<T = any>(table: CmsTable): Promise<T[]> {
  const { data } = await cmsCall<{ data: T[] }>({ action: 'list', table });
  return data ?? [];
}

export async function cmsInsert<T = any>(table: CmsTable, values: Record<string, unknown>): Promise<T> {
  const { data } = await cmsCall<{ data: T }>({ action: 'insert', table, values });
  return data;
}

export async function cmsUpdate<T = any>(table: CmsTable, id: string, values: Record<string, unknown>): Promise<T> {
  const { data } = await cmsCall<{ data: T }>({ action: 'update', table, id, values });
  return data;
}

export async function cmsDelete(table: CmsTable, id: string): Promise<void> {
  await cmsCall({ action: 'delete', table, id });
}

// Signierter Upload-Link für ein Terminbild (Bucket event-images). Danach lädt der Client die Datei
// direkt hoch (uploadToSignedUrl) und bekommt die öffentliche URL zurück.
export async function cmsEventImageUploadUrl(filename: string): Promise<{ path: string; token: string; publicUrl: string }> {
  return cmsCall<{ path: string; token: string; publicUrl: string }>({ action: 'upload_url', filename });
}

export { CMS_SUPABASE_URL, CMS_SUPABASE_ANON_KEY };
