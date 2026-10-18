import { getToken } from './adminAuth';

// Sicheres Löschen von Einträgen in den Kontakt-/Registrierungs-Listen über die Server-Funktion
// admin-contacts (prüft das Admin-Login und arbeitet dann mit dem Server-Schlüssel).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export async function deleteContacts(table: string, ids: string[]): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Keine Anmeldung gefunden. Bitte neu einloggen.');

  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'delete', table, ids }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || 'Löschen fehlgeschlagen.');
  }
}
