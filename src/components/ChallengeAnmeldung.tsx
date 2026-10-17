import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabaseCms } from '../lib/supabaseCms';

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
/** Alternative fuer alle ohne WhatsApp (Claudia, 15.10.2026). */
const TELEGRAM_LINK = 'https://t.me/+0ePKVbpBySlmZWZi';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

const FELD =
  'w-full rounded-md border border-midnight-blue/25 bg-white px-4 py-3 font-inter text-[15px] text-midnight-blue placeholder:text-midnight-blue/45 focus:border-[#C9A961] focus:outline-none focus:ring-2 focus:ring-[#C9A961]/40';

/** Schluessel im Browser: nach dem Eintrag duerfen die sieben Schritte aufgeklappt werden (Claudias Idee 22.09.2026 12:28 UTC). */
export const EINGETRAGEN_SCHLUESSEL = 'cc-challenge-eingetragen';

/** Erkennungszeichen (vereinfacht, eigene Zeichnung): gruener Kreis mit Hoerer bzw. blauer Kreis mit Papierflieger. */
function WhatsAppZeichen({ gross = 28 }: { gross?: number }) {
  return (
    <svg width={gross} height={gross} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path fill="#fff" d="M16 7.2a8.8 8.8 0 0 0-7.6 13.2L7.2 24.8l4.5-1.2A8.8 8.8 0 1 0 16 7.2Zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 1 1 16 23.2Zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.5c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9 4.4 4.4 0 0 0 .9 2.3 10 10 0 0 0 3.8 3.4c1.4.6 2 .7 2.7.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.5-.5Z" />
    </svg>
  );
}
function TelegramZeichen({ gross = 28 }: { gross?: number }) {
  return (
    <svg width={gross} height={gross} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#229ED9" />
      <path fill="#fff" d="M7.4 15.6c4.7-2 7.8-3.4 9.4-4 4.5-1.9 5.4-2.2 6-2.2.1 0 .4 0 .6.2.2.1.2.3.2.4v.6c-.2 2.6-1.3 8.9-1.8 11.8-.2 1.2-.7 1.6-1.1 1.7-1 .1-1.7-.6-2.6-1.2l-3.7-2.5c-1.6-1.1-.6-1.7.4-2.6.2-.3 4.4-4 4.5-4.4v-.3a.4.4 0 0 0-.4 0c-.2 0-2.9 1.9-8.2 5.4-.8.5-1.5.8-2.1.8-.7 0-2-.4-3-.7-1.2-.4-2.1-.6-2-1.2 0-.3.5-.6 1.2-.9Z" />
    </svg>
  );
}

export default function ChallengeAnmeldung({ start, onEingetragen }: { start: string; onEingetragen?: () => void }) {
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [angebote, setAngebote] = useState(false);
  const [zustand, setZustand] = useState<'offen' | 'sendet' | 'fertig' | 'fehler'>(() => {
    // Zurueck aus WhatsApp/Telegram (Claudia 17.10.2026: „komme nicht mehr zurueck“): die Gruppenwahl bleibt stehen.
    try { return window.localStorage.getItem(EINGETRAGEN_SCHLUESSEL) === '1' ? 'fertig' : 'offen'; } catch { return 'offen'; }
  });

  async function absenden(e: FormEvent) {
    e.preventDefault();
    if (zustand === 'sendet') return;
    setZustand('sendet');
    const { error } = await supabaseCms.from('contact_inquiries').insert([
      {
        name: vorname.trim(),
        email: email.trim(),
        phone: telefon.trim() || null,
        message: `7-TAGE-CHALLENGE – Anmeldung über claudiaconen.com/challenge\nStart: Montag, ${start}\nHinweis Challenge + Gruppe (WhatsApp/Telegram) gelesen: ja\nEinwilligung Angebote/Newsletter: ${angebote ? 'ja' : 'nein'}`,
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
      <div id="anmelden" className={`mt-3 grid items-center gap-5 rounded-[10px] border border-[#C9A961]/60 bg-[linear-gradient(135deg,#FCF6EC,#F7E7CE)] px-5 py-6 text-midnight-blue sm:grid-cols-[auto_minmax(0,1fr)] sm:px-7`}>
        <div className="flex gap-4">
          <figure className="m-0 text-center">
            <div className="mb-1.5 flex justify-center"><WhatsAppZeichen /></div>
            <img src="/challenge/qr-whatsapp.png" alt="QR-Code: Einladung in die WhatsApp-Gruppe der Challenge" width={328} height={328} className="h-28 w-28 rounded-md bg-white" />
            <figcaption className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-wide">WhatsApp</figcaption>
          </figure>
          <figure className="m-0 text-center">
            <div className="mb-1.5 flex justify-center"><TelegramZeichen /></div>
            <img src="/challenge/qr-telegram.png" alt="QR-Code: Einladung in die Telegram-Gruppe der Challenge" width={328} height={328} className="h-28 w-28 rounded-md bg-white" />
            <figcaption className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-wide">Telegram</figcaption>
          </figure>
        </div>
        <div className="min-w-0">
          <p className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{vorname.trim() ? `Danke, ${vorname.trim()} – du bist eingetragen.` : 'Du bist eingetragen.'}</p>
          <p className="mt-2 font-inter text-[15px] leading-relaxed sm:text-base">
            Jetzt noch in deine Gruppe. <b>Du hast die Wahl:</b> WhatsApp oder Telegram – gleiche Inhalte, gleiche Anleitungen. Start: Montag, {start}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={CHALLENGE_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-midnight-blue py-3 pl-3 pr-6 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
              <WhatsAppZeichen gross={26} /> Zur WhatsApp-Gruppe
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-midnight-blue py-3 pl-3 pr-6 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
              <TelegramZeichen gross={26} /> Zur Telegram-Gruppe
            </a>
          </div>
          <p className="mt-4 font-inter text-sm leading-relaxed text-midnight-blue/85">
            <b>Und zurück?</b> Die Gruppe öffnet sich in der App, diese Seite bleibt offen. Wechsle danach einfach zurück in deinen Browser – deine Auswahl steht hier weiter für dich bereit.
          </p>
          <button type="button" onClick={() => { try { window.localStorage.removeItem(EINGETRAGEN_SCHLUESSEL); } catch { /* egal */ } setZustand('offen'); }} className="mt-2 font-inter text-xs text-midnight-blue/70 underline underline-offset-2 hover:text-midnight-blue">
            Jemand anderen eintragen
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id="anmelden" onSubmit={absenden} className="mt-3 rounded-[10px] border border-[#C9A961]/55 bg-[#13233F] px-5 py-6 text-pearl-white sm:px-7 sm:py-7" aria-labelledby="anmelden-titel">
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
      {/* Ein Haekchen (Claudia 15.10.2026): Die Challenge selbst braucht keine Einwilligung (Art. 6 Abs. 1 lit. b DSGVO), nur einen
          Hinweis. Werbung bleibt ein eigenes, freiwilliges Haekchen (Art. 7 Abs. 2 DSGVO, § 7 UWG; nie buendeln, OLG Muenchen 29 U 599/24). */}
      <p className="mt-4 font-inter text-sm leading-relaxed text-pearl-white/85">
        Mit Klick auf „Eintragen“ meldest du dich zur Challenge an. Deine Angaben werden nur dafür gespeichert. Die Challenge läuft in einer WhatsApp-Gruppe (Meta) oder, wenn du magst, in einer Telegram-Gruppe: Dort sehen die anderen Teilnehmer deinen Namen, deine Nummer und deine Videos. Widerruf jederzeit an claudiaconen@umsatzstimme.de.{' '}
          <Link to="/datenschutz" className="underline decoration-[#C9A961]/60 underline-offset-2 hover:decoration-[#F7E7CE]">Datenschutz</Link>
      </p>
      <label className="mt-2 flex items-start gap-3 font-inter text-sm leading-relaxed text-pearl-white/85">
        <input id="challenge-angebote" name="angebote" type="checkbox" checked={angebote} onChange={(e) => setAngebote(e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-[#C9A961]" />
        <span>Ja, schick mir nach der Challenge weitere Gratis-Aktionen und Angebote per E-Mail. Abmelden geht jederzeit mit einem Klick.</span>
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={zustand === 'sendet'} className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px disabled:opacity-70 ${GOLD}`}>
          {zustand === 'sendet' ? 'Wird eingetragen …' : 'Eintragen und in die Gruppe'}
        </button>
        {/* Claudia, 22.09.2026 16:19 UTC: "kleinen Button 'Vereinbarung widerrufen', der sich aufklappt - bedenke: was du
            selbst ins Netz gibst, kann ich nicht zurueckholen". Steht im Quelltext, nur per CSS zu. */}
        <details className="group w-full sm:w-auto">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#C9A961]/60 px-4 py-2 font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-[#EBD197] transition-colors hover:border-[#F7E7CE] hover:text-[#F7E7CE] [&::-webkit-details-marker]:hidden">
            Vereinbarung widerrufen <span aria-hidden="true" className="transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 max-w-xl font-inter text-sm leading-relaxed text-pearl-white/90">
            Jederzeit und ohne Begründung: eine kurze Nachricht an{' '}
            <a href="mailto:claudiaconen@umsatzstimme.de?subject=Widerruf%20Challenge" className="underline decoration-[#C9A961]/60 underline-offset-2 hover:decoration-[#F7E7CE]">claudiaconen@umsatzstimme.de</a>
            {' '}– ich nehme dich aus der Gruppe und lösche deine Angaben. Bedenke: Was du selbst ins Netz gibst – deine Videos, deine Nummer in der Gruppe –, kann ich nicht zurückholen.
          </p>
        </details>
      </div>
      {zustand === 'fehler' && (
        <p role="alert" className="mt-4 font-inter text-sm text-[#F7E7CE]">
          Das Eintragen hat gerade nicht geklappt. Geh trotzdem in die Gruppe – oder schreib mir an claudiaconen@umsatzstimme.de.
        </p>
      )}
    </form>
  );
}
