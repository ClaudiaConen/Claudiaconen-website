import { supabase } from './supabase';

/**
 * Kurs-Freigabe pro Teilnehmerin (16.11.2026): Masterclass-Teilnehmende bekommen nur den Elevator-Pitch-Kurs.
 * Tabelle member_student_course_access (Migration 20261116120000). Regel:
 *   - Hat jemand mindestens eine Freigabe, sieht er NUR diese Kurse.
 *   - Hat jemand keine Freigabe (alle bisherigen Teilnehmenden), sieht er wie bisher alle Kurse.
 *   - Fehlt die Tabelle noch (Migration nicht eingespielt), gilt ebenfalls "alle Kurse".
 * Rueckgabe null = alle Kurse erlaubt.
 */
export async function freigegebeneKurse(studentId: string | undefined): Promise<Set<string> | null> {
  if (!studentId) return null;
  const { data, error } = await supabase
    .from('member_student_course_access')
    .select('course_id')
    .eq('student_id', studentId);
  if (error || !data || data.length === 0) return null;
  return new Set(data.map((z: { course_id: string }) => z.course_id));
}

export function kursErlaubt(freigabe: Set<string> | null, courseId: string | undefined): boolean {
  return !freigabe || (!!courseId && freigabe.has(courseId));
}

/** Persoenlicher Ein-Klick-Link: /member/login?email=...&code=... loggt direkt ein. */
export function loginLink(email: string, accessCode: string): string {
  const basis = typeof window !== 'undefined' ? window.location.origin : 'https://claudiaconen.com';
  return `${basis}/member/login?email=${encodeURIComponent(email)}&code=${encodeURIComponent(accessCode)}`;
}
