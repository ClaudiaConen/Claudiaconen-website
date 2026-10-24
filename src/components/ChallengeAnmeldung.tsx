import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
/** Alternative fuer alle ohne WhatsApp (Claudia, 15.10.2026). */
const TELEGRAM_LINK = 'https://t.me/+Tn_rHmElfidjYzcy';
/** Zoom-Raum fuer Auftakt und Finale (Claudia, 23.10.2026) - steht nur im Danke-Bereich, nicht offen auf der Seite. */
const ZOOM_LINK = 'https://us02web.zoom.us/j/3240814498';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

const FELD =
  'w-full rounded-md border border-midnight-blue/25 bg-white px-4 py-3 font-inter text-[15px] text-midnight-blue placeholder:text-midnight-blue/45 focus:border-[#C9A961] focus:outline-none focus:ring-2 focus:ring-[#C9A961]/40';

/** Schluessel im Browser: nach dem Eintrag duerfen die sieben Schritte aufgeklappt werden (Claudias Idee 22.09.2026 12:28 UTC). */
export const EINGETRAGEN_SCHLUESSEL = 'cc-challenge-eingetragen';

export default function ChallengeAnmeldung({ start, onEingetragen }: { start: string; onEingetragen?: () => void }) {
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [angebote, setAngebote] = useState(false);
  const [zustand, setZustand] = useState<'offen' | 'sendet' | 'fertig' | 'fehler'>('offen');
  const navigate = useNavigate();

  async function absenden(e: FormEvent) {
    e.preventDefault();
    if (zustand === 'sendet') return;
    setZustand('sendet');
    const { error } = await supabase.from('contact_inquiries').insert([
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
    // Eigene Danke-Seite mit Gruppenwahl und Wegweiser (Claudia, 24.10.2026 20:00).
    navigate('/challenge/danke', { state: { vorname: vorname.trim(), angemeldet: true } });
  }

  if (zustand === 'fertig') {
    // Danke-Bereich mit Wappen aus dem Gruppenbild und klickbaren QR-Codes (Claudia, 23.10.2026).
    // Weiss statt Creme (Designregel 22.10.2026). Die Gruppen-Links stehen nur hier, nicht offen auf der Seite.
    const GRUPPEN = [
      { name: 'WhatsApp', zusatz: 'empfohlen – dort ist am meisten los', link: CHALLENGE_LINK, qr: '/challenge/qr-whatsapp.png', knopf: 'Zur WhatsApp-Gruppe', voll: true },
      { name: 'Telegram', zusatz: 'ohne WhatsApp – gleiche Inhalte, gleiches Feedback', link: TELEGRAM_LINK, qr: '/challenge/qr-telegram.png', knopf: 'Zur Telegram-Gruppe', voll: false },
    ];
    return (
      <div id="anmelden" className="mt-3 grid items-start gap-6 rounded-[10px] border-2 border-[#C9A961] bg-white px-5 py-6 text-midnight-blue sm:px-7 sm:py-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <img src="/challenge/wappen.webp" alt="Wappen der Challenge-Gruppe UNVERWECHSELBAR" width={560} height={684} className="mx-auto w-44 drop-shadow-[0_16px_24px_rgba(19,35,63,0.35)] md:w-full" />
        <div className="min-w-0">
          <p className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">Danke, {vorname.trim() || 'du'} – du bist eingetragen.</p>
          <p className="mt-2 font-inter text-[15px] leading-relaxed sm:text-base">
            Start: Montag, {start}, 19 Uhr, live im Zoom. Speichere dir den Link gleich:
          </p>
          <a href={ZOOM_LINK} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
            Zum Zoom-Raum
          </a>
          <p className="mt-6 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#9A7B2F]">Und jetzt in deine Gruppe – du hast die Wahl</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {GRUPPEN.map((g) => (
              <div key={g.name} className="flex items-center gap-4 rounded-[10px] border border-midnight-blue/15 p-4">
                <a href={g.link} target="_blank" rel="noopener noreferrer" aria-label={`QR-Code: ${g.knopf}`} className="flex-none">
                  <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-24 w-24 rounded-md bg-white ring-1 ring-midnight-blue/10" />
                </a>
                <div className="min-w-0">
                  <p className="font-montserrat text-base font-extrabold">{g.name}</p>
                  <p className="font-inter text-xs leading-snug text-midnight-blue/70">{g.zusatz}</p>
                  <a href={g.link} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex items-center rounded-full px-4 py-2 font-montserrat text-xs font-bold transition-colors ${g.voll ? 'bg-midnight-blue text-pearl-white hover:bg-royal-navy' : 'border-2 border-midnight-blue text-midnight-blue hover:bg-midnight-blue/5'}`}>
                    {g.knopf} →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-inter text-xs text-midnight-blue/60">Am Handy: Knopf antippen. Am Computer: QR-Code mit dem Handy scannen.</p>
        </div>
      </div>
    );
  }

  return (
    <form id="anmelden" onSubmit={absenden} className="mt-3 rounded-[10px] border border-[#C9A961]/55 bg-[#13233F] px-5 py-6 text-pearl-white sm:px-7 sm:py-7" aria-labelledby="anmelden-titel">
      {/* Zwei Schritte sichtbar machen (Claudias Liste 24.10.2026 22:58, Punkt 8). */}
      <ol className="flex flex-wrap items-center gap-3 p-0 font-montserrat text-xs font-extrabold uppercase tracking-[0.14em]" aria-label="Zwei Schritte">
        <li className="flex items-center gap-2 text-[#C9A961]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A961] text-[#13233F]">1</span>Anmelden</li>
        <li aria-hidden="true" className="h-px w-8 bg-pearl-white/30" />
        <li className="flex items-center gap-2 text-pearl-white/60"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-pearl-white/40">2</span>Gruppe wählen</li>
      </ol>
      <h3 id="anmelden-titel" className="mt-4 font-montserrat text-xl font-extrabold leading-tight text-white sm:text-2xl">
        Ich bin dabei.
      </h3>
      <p className="mt-2 max-w-2xl font-inter text-[15px] leading-relaxed text-pearl-white/85">
        Melde dich zur kostenfreien 7-Tage-Challenge an. Nach deiner Anmeldung kannst du deine Gruppe wählen: WhatsApp oder Telegram.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block font-montserrat text-xs font-bold text-pearl-white">Vorname <span className="font-inter font-normal text-pearl-white/70">(Pflichtfeld)</span></span>
          <input id="challenge-vorname" name="vorname" type="text" required autoComplete="given-name" placeholder="z. B. Anna" value={vorname} onInvalid={(e) => e.currentTarget.setCustomValidity('Bitte trag deinen Vornamen ein.')} onInput={(e) => e.currentTarget.setCustomValidity('')} onChange={(e) => setVorname(e.target.value)} className={FELD} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-montserrat text-xs font-bold text-pearl-white">E-Mail <span className="font-inter font-normal text-pearl-white/70">(Pflichtfeld)</span></span>
          <input id="challenge-email" name="email" type="email" required autoComplete="email" placeholder="name@beispiel.de" value={email} onInvalid={(e) => e.currentTarget.setCustomValidity('Bitte trag eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.')} onInput={(e) => e.currentTarget.setCustomValidity('')} onChange={(e) => setEmail(e.target.value)} className={FELD} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-montserrat text-xs font-bold text-pearl-white">Handynummer <span className="font-inter font-normal text-pearl-white/70">(freiwillig)</span></span>
          <input id="challenge-telefon" name="telefon" type="tel" autoComplete="tel" placeholder="damit ich dich in der Gruppe erkenne" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={FELD} />
        </label>
      </div>
      {/* Ein Haekchen (Claudia 15.10.2026): Die Challenge selbst braucht keine Einwilligung (Art. 6 Abs. 1 lit. b DSGVO), nur einen
          Hinweis. Werbung bleibt ein eigenes, freiwilliges Haekchen (Art. 7 Abs. 2 DSGVO, § 7 UWG; nie buendeln, OLG Muenchen 29 U 599/24). */}
      <p className="mt-4 font-inter text-sm leading-relaxed text-pearl-white/85">
        Mit Klick auf „Jetzt kostenfrei anmelden“ meldest du dich zur Challenge an. Deine Angaben werden nur dafür gespeichert. Die Challenge läuft in einer WhatsApp-Gruppe (Meta) oder, wenn du magst, in einer Telegram-Gruppe: Dort sehen die anderen Teilnehmer deinen Namen, deine Nummer und deine Videos. Widerruf jederzeit an claudiaconen@umsatzstimme.de.{' '}
          <Link to="/datenschutz" className="underline decoration-[#C9A961]/60 underline-offset-2 hover:decoration-[#F7E7CE]">Datenschutz</Link>
      </p>
      <label className="mt-2 flex items-start gap-3 font-inter text-sm leading-relaxed text-pearl-white/85">
        <input id="challenge-angebote" name="angebote" type="checkbox" checked={angebote} onChange={(e) => setAngebote(e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-[#C9A961]" />
        <span>Ja, schick mir nach der Challenge weitere Gratis-Aktionen und Angebote per E-Mail. Abmelden geht jederzeit mit einem Klick.</span>
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={zustand === 'sendet'} className={`cc-puls-knopf inline-flex items-center justify-center rounded-full px-9 py-5 font-montserrat text-base font-extrabold text-midnight-blue transition-transform hover:-translate-y-px disabled:opacity-70 sm:text-lg ${GOLD}`}>
          {zustand === 'sendet' ? 'Wird angemeldet …' : 'Jetzt kostenfrei anmelden'}
        </button>
        {/* Letzte Huerde vor dem Klick: Kosten und Druck ausraeumen ("Kein Verkaufsdruck", Claudias Wortlaut 24.10.2026). */}
        <span className="font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-pearl-white/85">Kostenfrei · Kein Verkaufsdruck</span>
        {/* Claudia, 22.09.2026 16:19 UTC: "kleinen Button 'Vereinbarung widerrufen', der sich aufklappt - bedenke: was du
            selbst ins Netz gibst, kann ich nicht zurueckholen". Steht im Quelltext, nur per CSS zu. */}
        <details className="group w-full sm:w-auto">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#C9A961]/60 px-4 py-2 font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-[#C9A961] transition-colors hover:border-[#F7E7CE] hover:text-[#F7E7CE] [&::-webkit-details-marker]:hidden">
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
          Die Anmeldung hat gerade nicht geklappt. Bitte versuch es gleich noch einmal oder schreib mir an claudiaconen@umsatzstimme.de.
        </p>
      )}
    </form>
  );
}
