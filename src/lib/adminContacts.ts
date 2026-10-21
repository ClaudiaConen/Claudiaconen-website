import { getToken } from './adminAuth';

// Sicheres Löschen von Einträgen in den Kontakt-/Registrierungs-Listen über die Server-Funktion
// admin-contacts (prüft das Admin-Login und arbeitet dann mit dem Server-Schlüssel).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function call(payload: Record<string, unknown>) {
  const token = getToken();
  if (!token) throw new Error('Keine Anmeldung gefunden. Bitte neu einloggen.');

  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || 'Aktion fehlgeschlagen.');
  }
  return result;
}

export async function deleteContacts(table: string, ids: string[]): Promise<void> {
  await call({ action: 'delete', table, ids });
}

export async function addContact(
  table: string,
  listKey: string,
  fields: { email: string; firstName?: string; lastName?: string },
): Promise<any> {
  const result = await call({ action: 'add', table, listKey, ...fields });
  return result.data;
}

// Lädt alle Einträge einer Liste (mit Kategorie-Filter) über die Server-Funktion.
export async function listContacts<T = any>(table: string, listKey: string): Promise<T[]> {
  const result = await call({ action: 'list', table, listKey });
  return (result.data as T[]) ?? [];
}

// Holt alle Zähler des Dashboards in einem Aufruf.
export async function getContactCounts(): Promise<Record<string, number>> {
  const result = await call({ action: 'counts' });
  return (result.counts as Record<string, number>) ?? {};
}
