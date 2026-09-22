import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Anmeldung zur 7-Tage-Video-Challenge - Claudias Wunsch vom 22.09.2026, 09:35 UTC: "ein
 * Anmeldeformular, wo ich dann sehe, wer alles da drin ist, damit die mir nicht verloren gehen".
 * Die WhatsApp-Gruppe allein zeigt ihr nur Nummern; hier bekommt sie Name und E-Mail.
 *
 * Ablage: Tabelle contact_inquiries (anonymes Einfuegen erlaubt, Name + gueltige E-Mail Pflicht -
 * Migration 20260113144116). Im Admin unter /admin -> "Kontaktanfragen" -> CSV-Export; jede
 * Anmeldung beginnt in der Nachricht mit "7-TAGE-CHALLENGE", damit sie sich filtern laesst.
 * Kein eigener Tisch, weil ich keine Migration einspielen kann (nur anonymer Schluessel).
 * Eine E-Mail an Claudia je Anmeldung gibt es hier NICHT - dafuer braeuchte es eine Edge-Function
 * wie send-ki-workshop-booking-notification (Resend), die jemand mit Supabase-Zugang deployt.
 *
 * Nach dem Absenden erscheint der Weg in die Gruppe (Knopf + QR). Einen Weg in die Gruppe OHNE Eintrag gibt es
 * auf der Seite nicht mehr (Claudia, 22.09.2026 10:45 UTC: 'Nur in die Gruppe ohne eintragen geht nicht').
 */
const CHALLENGE_LINK = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

const FELD =
  'w-full rounded-md border border-midnight-blue/25 bg-white px-4 py-3 font-inter text-[15px] text-midnight-blue placeholder:text-midnight-blue/45 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40';

/** Schluessel im Browser: nach dem Eintrag duerfen die sieben Schritte aufgeklappt werden (Claudias Idee 22.09.2026 12:28 UTC). */
export const EINGETRAGEN_SCHLUESSEL = 'cc-challenge-eingetragen';

export default function ChallengeAnmeldung({ start, onEingetragen }: { start: string; onEingetragen?: () => void }) {
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [einverstanden, setEinverstanden] = useState(false);
  const [angebote, setAngebote] = useState(false);
  const [zustand, setZustand] = useState<'offen' | 'sendet' | 'fertig' | 'fehler'>('offen');

  async function absenden(e: FormEvent) {
    e.preventDefault();
    if (zustand === 'sendet') return;
    setZustand('sendet');
    const { error } = await supabase.from('contact_inquiries').insert([
      {
        name: vorname.trim(),
        email: email.trim(),
        phone: telefon.trim() || null,
        message: `7-TAGE-CHALLENGE – Anmeldung über claudiaconen.com/challenge\nStart: Montag, ${start}\nEinwilligung Challenge + WhatsApp-Gruppe: ja\nEinwilligung Angebote/Newsletter: ${angebote ? 'ja' : 'nein'}`,
      },
    ]);
    if (error) {
      console.error('Challenge-Anmeldung fehlgeschlagen:', error);
      setZustand('fehler');
      return;
    }
    setZustand('fertig');
    try { window.localStorage.setItem(EINGETRAGEN_SCHLUESSEL, '1'); } catch { /* privater Modus o. ae. */ }
    onEingetragen?.();
  }

  if (zustand === 'fertig') {
    return (
      <div id="anmelden" className={`mt-3 grid items-center gap-5 rounded-[10px] px-5 py-6 text-midnight-blue sm:grid-cols-[auto_minmax(0,1fr)] sm:px-7 ${GOLD}`}>
        <img src="/challenge/qr-whatsapp.png" alt="QR-Code: Einladung in die WhatsApp-Gruppe der Challenge" width={328} height={328} className="h-28 w-28 rounded-md bg-white" />
        <div className="min-w-0">
          <p className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">Danke, {vorname.trim() || 'du'} – du bist eingetragen.</p>
          <p className="mt-2 font-inter text-[15px] leading-relaxed sm:text-base">
            Jetzt noch in die Gruppe, dort läuft die Challenge: am Handy den Knopf drücken, am Rechner den Code scannen. Start: Montag, {start}.
          </p>
          <a href={CHALLENGE_LINK} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center rounded-full bg-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
            Zur WhatsApp-Gruppe
          </a>
        </div>
      </div>
    );
  }

  return (
    <form id="anmelden" onSubmit={absenden} className="mt-3 rounded-[10px] border border-[#D4AF37]/55 bg-[#13233F] px-5 py-6 text-pearl-white sm:px-7 sm:py-7" aria-labelledby="anmelden-titel">
      <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#EBD197]">Anmeldung · kostenfrei</p>
      <h3 id="anmelden-titel" className="mt-2 font-montserrat text-xl font-extrabold leading-tight text-white sm:text-2xl">
        Ich bin dabei.
      </h3>
      <p className="mt-2 max-w-2xl font-inter text-[15px] leading-relaxed text-pearl-white/85">
        Trag dich ein, damit ich weiß, wer mitmacht – auch wenn du schon in der Gruppe bist. Danach geht es direkt in die WhatsApp-Gruppe.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="sr-only">Vorname</span>
          <input id="challenge-vorname" name="vorname" type="text" required autoComplete="given-name" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)} className={FELD} />
        </label>
        <label className="block">
          <span className="sr-only">E-Mail</span>
          <input id="challenge-email" name="email" type="email" required autoComplete="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} className={FELD} />
        </label>
        <label className="block">
          <span className="sr-only">Handynummer (freiwillig)</span>
          <input id="challenge-telefon" name="telefon" type="tel" autoComplete="tel" placeholder="Handynummer (damit ich dich in der Gruppe erkenne)" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={FELD} />
        </label>
      </div>
      {/* Zwei Kaestchen statt einem (Kritiker-Durchgang 22.09.2026): Pflicht nur fuer die Challenge selbst, Werbung freiwillig
          (Art. 7 Abs. 4 DSGVO, § 7 UWG); Widerruf mit Adresse; WhatsApp/Meta benannt. */}
      <label className="mt-4 flex items-start gap-3 font-inter text-sm leading-relaxed text-pearl-white/85">
        <input id="challenge-einverstanden" name="einverstanden" type="checkbox" required checked={einverstanden} onChange={(e) => setEinverstanden(e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-[#D4AF37]" />
        <span>
          Ja, Claudia Conen darf meine Angaben speichern, um mich durch die Challenge zu begleiten. Mir ist klar: Die Challenge läuft in einer WhatsApp-Gruppe (Meta) – dort sehen die anderen Teilnehmer meine Nummer und meine Videos. Widerruf jederzeit an claudiaconen@umsatzstimme.de.{' '}
          <Link to="/datenschutz" className="underline decoration-[#D4AF37]/60 underline-offset-2 hover:decoration-[#F7E7CE]">Datenschutz</Link>
        </span>
      </label>
      <label className="mt-2 flex items-start gap-3 font-inter text-sm leading-relaxed text-pearl-white/85">
        <input id="challenge-angebote" name="angebote" type="checkbox" checked={angebote} onChange={(e) => setAngebote(e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-[#D4AF37]" />
        <span>Freiwillig: Claudia darf mich nach der Challenge per E-Mail zu Angeboten einladen (Rederaum, Coaching, Community).</span>
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={zustand === 'sendet'} className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px disabled:opacity-70 ${GOLD}`}>
          {zustand === 'sendet' ? 'Wird eingetragen …' : 'Eintragen und in die Gruppe'}
        </button>
      </div>
      {zustand === 'fehler' && (
        <p role="alert" className="mt-4 font-inter text-sm text-[#F7E7CE]">
          Das Eintragen hat gerade nicht geklappt. Geh trotzdem in die Gruppe – oder schreib mir an claudiaconen@umsatzstimme.de.
        </p>
      )}
    </form>
  );
}
