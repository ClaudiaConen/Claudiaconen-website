import { getToken } from './adminAuth';

// Teilnehmende des Mitgliederbereichs ueber die Server-Funktion admin-member-students verwalten
// (prueft das Admin-Login und arbeitet mit dem Server-Schluessel, wie admin-contacts).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export async function mitgliederAktion<T = Record<string, unknown>>(payload: Record<string, unknown>): Promise<T> {
  const token = getToken();
  if (!token) throw new Error('Keine Anmeldung gefunden. Bitte neu einloggen.');
  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/functions/v1/admin-member-students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Server-Funktion „admin-member-students“ nicht erreichbar – ist sie in Supabase eingerichtet?');
  }
  const result = await response.json().catch(() => ({}));
  if (response.status === 404) throw new Error('Server-Funktion „admin-member-students“ ist in Supabase noch nicht eingerichtet.');
  if (!response.ok) throw new Error(result.error || 'Aktion fehlgeschlagen.');
  return result as T;
}
