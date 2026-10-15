import { getToken } from './adminAuth';

/**
 * Zugriff auf die gemeinsame Terminuebersicht (Events, Workshops, Kundentermine).
 * Laeuft ausschliesslich ueber die geschuetzte Edge-Function 'team-termine' auf eamm,
 * die das Website-Admin-Login prueft. Die Tabelle team_termine ist privat (kein anon-Zugriff),
 * darum sind Kundentermine NICHT mit dem oeffentlichen Schluessel auslesbar.
 */

const FN_URL = 'https://eammlfkjtbqcubxpfxes.supabase.co/functions/v1/team-termine';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbW1sZmtqdGJxY3VieHBmeGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTcxNDcsImV4cCI6MjA4MDA3MzE0N30.6aBH-iPGT5Ez7f1GDphvplKde-ZBsiENZqB_5XgXBPQ';

export type TerminArt = 'event' | 'workshop' | 'kunde' | 'sonstiges';

export interface Termin {
  id: string;
  titel: string;
  art: TerminArt;
  start_am: string;
  ende_am: string | null;
  ganztags: boolean;
  ort: string | null;
  kunde: string | null;
  wer: string | null;
  notizen: string | null;
  erstellt_von: string | null;
  created_at?: string;
}

export type TerminEingabe = Omit<Termin, 'id' | 'created_at' | 'erstellt_von'>;

async function call(payload: Record<string, unknown>) {
  const res = await fetch(FN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      'X-Admin-Token': getToken() || '',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || 'Es ist ein Fehler aufgetreten.');
  return data;
}

export async function listTermine(): Promise<Termin[]> {
  const d = await call({ action: 'list' });
  return (d.termine || []) as Termin[];
}

export async function createTermin(termin: TerminEingabe): Promise<Termin> {
  const d = await call({ action: 'create', termin });
  return d.termin as Termin;
}

export async function updateTermin(id: string, termin: TerminEingabe): Promise<Termin> {
  const d = await call({ action: 'update', id, termin });
  return d.termin as Termin;
}

export async function deleteTermin(id: string): Promise<void> {
  await call({ action: 'delete', id });
}
