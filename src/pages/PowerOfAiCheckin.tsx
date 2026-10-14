import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

/**
 * Check-in an der Tür bei THE POWER OF AI, Köln, 18.10.2026 – Claudias Auftrag vom 14.10.2026, 14:12 UTC:
 * Formular für die Menschen an der Tür, Lead-Magnet, Pflicht-Häkchen für Foto/Video auf Social Media
 * ("sonst haben wir nachher ein Problem"), Name + E-Mail, Telefon freiwillig, nicht aufdringlich.
 * Dazu freiwillig: WhatsApp-Impulse zur wirkungsvollen Kommunikation und die kostenlose 7-Tage-Challenge.
 *
 * Ablage wie ChallengeAnmeldung: Tabelle contact_inquiries (anonymes Einfügen erlaubt, Name + gültige E-Mail
 * Pflicht). Jede Zeile beginnt in message mit "POWER-OF-AI CHECK-IN", damit das Admin-Dashboard sie als eigene
 * Kategorie zeigt. Die Einwilligungen stehen mit Textstand im Eintrag (Nachweis nach Art. 7 Abs. 1 DSGVO).
 * Nach dem Absenden: Danke-Ansicht mit Knopf "Nächste Person", damit ein Tablet an der Tür reihum genutzt werden kann.
 */
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const FELD =
  'w-full rounded-md border border-[#13233F]/25 bg-white px-4 py-4 font-inter text-[17px] text-[#13233F] placeholder:text-[#13233F]/45 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40';
const HAKEN = 'mt-1 h-5 w-5 flex-none accent-[#D4AF37]';
const TEXTSTAND = '14.10.2026 v2';

export default function PowerOfAiCheckin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [fotoVideo, setFotoVideo] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [challenge, setChallenge] = useState(false);
  const [zustand, setZustand] = useState<'offen' | 'sendet' | 'fertig' | 'fehler'>('offen');
  const [eingetragen, setEingetragen] = useState({ name: '', challenge: false });

  async function absenden(e: FormEvent) {
    e.preventDefault();
    if (zustand === 'sendet') return;
    setZustand('sendet');
    const { error } = await supabase.from('contact_inquiries').insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: telefon.trim() || null,
        message:
          `POWER-OF-AI CHECK-IN – Köln, Motorworld, 18.10.2026 (claudiaconen.com/powerofai)\n` +
          `Einwilligung Foto/Video inkl. Social Media: ja (Textstand ${TEXTSTAND})\n` +
          `WhatsApp-Impulse zur wirkungsvollen Kommunikation: ${whatsapp ? 'ja' : 'nein'}\n` +
          `Interesse 7 Tage Video-Training (kostenlos): ${challenge ? 'ja' : 'nein'}`,
      },
    ]);
    if (error) {
      console.error('Check-in fehlgeschlagen:', error);
      setZustand('fehler');
      return;
    }
    setEingetragen({ name: name.trim(), challenge });
    setZustand('fertig');
  }

  function naechstePerson() {
    setName('');
    setEmail('');
    setTelefon('');
    setFotoVideo(false);
    setWhatsapp(false);
    setChallenge(false);
    setZustand('offen');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(120%_90%_at_78%_18%,#24406F_0%,#1A2B4C_48%,#13233F_100%)] px-4 py-10 text-pearl-white sm:py-16">
      <SEO
        title="Check-in – THE POWER OF AI Köln"
        description="Check-in für THE POWER OF AI am 18. Oktober 2026 in der Motorworld Köln-Rheinland."
        path="/powerofai"
        noindex
      />
      <main className="mx-auto max-w-xl">
        {/* Foto der drei Gastgeber, von Claudia 14.10.2026 (3er_.png) */}
        <img src="/powerofai/team.webp" alt="Die Gastgeber von THE POWER OF AI" width={1100} height={619} className="mb-6 aspect-video w-full rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,.35)]" />
        <p className="flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-[0.26em] text-[#E4BC5D]">
          <span aria-hidden="true" className="h-px w-8 bg-[#D4AF37]" />
          THE POWER OF AI · Köln · 18.10.
        </p>

        {zustand === 'fertig' ? (
          <section className="mt-6" aria-live="polite">
            <h1 className="font-montserrat text-3xl font-bold leading-tight sm:text-4xl">
              Danke, {eingetragen.name || 'du'}.{' '}
              <em className="block font-cormorant font-semibold italic text-[#E4BC5D]">Du bist eingecheckt.</em>
            </h1>
            <p className="mt-5 font-inter text-[17px] leading-relaxed text-pearl-white/90">
              Viel Freude heute! Das Foto- und Videomaterial vom Tag schicken wir dir nach dem Event an deine E-Mail-Adresse.
            </p>
            {eingetragen.challenge && (
              <p className="mt-4 font-inter text-[17px] leading-relaxed text-pearl-white/90">
                Zur kostenlosen 7-Tage-Video-Challenge geht es hier:{' '}
                <Link to="/challenge" className="font-semibold text-[#F7E7CE] underline decoration-[#D4AF37] underline-offset-4">
                  claudiaconen.com/challenge
                </Link>
              </p>
            )}
            <button
              type="button"
              onClick={naechstePerson}
              className={`mt-8 inline-flex items-center rounded-full px-8 py-4 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-[#13233F] ${GOLD}`}
            >
              Nächste Person eintragen
            </button>
          </section>
        ) : (
          <form onSubmit={absenden} className="mt-6" aria-labelledby="checkin-titel">
            <h1 id="checkin-titel" className="font-montserrat text-3xl font-bold leading-tight sm:text-4xl">
              Schön, dass du da bist.
              <em className="block font-cormorant font-semibold italic text-[#E4BC5D]">Kurz eintragen, dann geht’s los.</em>
            </h1>
            <p className="mt-4 font-inter text-[17px] leading-relaxed text-pearl-white/85">
              Dein Geschenk: Nach dem Event bekommst du per E-Mail den Link zum Foto- und Videomaterial vom Tag.
            </p>

            <div className="mt-6 grid gap-3">
              <label className="block">
                <span className="mb-1 block font-inter text-sm text-pearl-white/80">Vor- und Nachname</span>
                <input name="name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={FELD} />
              </label>
              <label className="block">
                <span className="mb-1 block font-inter text-sm text-pearl-white/80">E-Mail</span>
                <input name="email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} className={FELD} />
              </label>
              <label className="block">
                <span className="mb-1 block font-inter text-sm text-pearl-white/80">
                  Handynummer {whatsapp ? '(für die WhatsApp-Impulse)' : '(freiwillig)'}
                </span>
                <input name="telefon" type="tel" required={whatsapp} autoComplete="tel" inputMode="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={FELD} />
              </label>
            </div>

            {/* Einwilligung: kurzer Satz mit dem Wesentlichen (Fotos/Videos + Social Media), Details zum Aufklappen (Claudia 14.10.2026 14:19) */}
            <div className="mt-6 rounded-md border border-[#D4AF37]/60 bg-white/5 p-4">
              <label className="flex items-start gap-3 font-inter text-[16px] leading-relaxed text-pearl-white">
                <input name="foto_video" type="checkbox" required checked={fotoVideo} onChange={(e) => setFotoVideo(e.target.checked)} className={HAKEN} />
                <span><strong className="font-semibold">Ich bin einverstanden</strong>, dass heute Fotos und Videos von mir gemacht und auf Social Media gepostet werden.</span>
              </label>
              <details className="group mt-2 pl-8">
                <summary className="cursor-pointer list-none font-inter text-sm text-[#EBD197] underline decoration-[#D4AF37]/60 underline-offset-2 [&::-webkit-details-marker]:hidden">
                  Was heißt das genau? <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-2 font-inter text-sm leading-relaxed text-pearl-white/85">
                  Bei THE POWER OF AI am 18.10.2026 wird fotografiert und gefilmt. Die Veranstalter und alle Teilnehmenden dürfen die Beiträge
                  auf ihren Social-Media-Kanälen und Webseiten posten. Das Rohmaterial steht allen Teilnehmenden per Link zur Verfügung.
                  Widerruf jederzeit für die Zukunft an claudiaconen@umsatzstimme.de.
                </p>
              </details>
            </div>

            <p className="mt-7 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#E4BC5D]">Freiwillig dazu</p>
            {/* 7-Tage-Challenge als einladende Karte mit 3D-Icon */}
            <label className={`mt-3 flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${challenge ? 'border-[#D4AF37] bg-[#D4AF37]/15' : 'border-[#D4AF37]/40 bg-white/5'}`}>
              <img src="/powerofai/icon-challenge.webp" alt="" width={64} height={64} className="h-16 w-16 flex-none object-contain" />
              <span className="flex-1">
                <span className="block font-montserrat text-[17px] font-bold leading-snug text-white">7-Tage-Video-Challenge</span>
                <span className="block font-inter text-[15px] leading-snug text-pearl-white/85">Gratis · ab 26.10. · 1 Minute am Tag</span>
                <span className="mt-1 block font-cormorant text-[19px] font-semibold italic text-[#E4BC5D]">Wie wirkst du auf andere?</span>
              </span>
              <input name="challenge" type="checkbox" checked={challenge} onChange={(e) => setChallenge(e.target.checked)} className="h-6 w-6 flex-none accent-[#D4AF37]" aria-label="Ja, ich will bei der 7-Tage-Video-Challenge dabei sein" />
            </label>
            <label className="mt-3 flex items-start gap-3 font-inter text-[15px] leading-relaxed text-pearl-white/90">
              <input name="whatsapp" type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} className={HAKEN} />
              <span>Schick mir per WhatsApp kleine Impulse zur wirkungsvollen Kommunikation. Abmelden geht jederzeit.</span>
            </label>

            <button
              type="submit"
              disabled={zustand === 'sendet'}
              className={`mt-7 w-full rounded-full px-8 py-5 font-montserrat text-base font-bold uppercase tracking-[0.12em] text-[#13233F] disabled:opacity-70 ${GOLD}`}
            >
              {zustand === 'sendet' ? 'Wird eingetragen …' : 'Einchecken'}
            </button>
            <p className="mt-4 font-inter text-sm leading-relaxed text-pearl-white/70">
              Deine Angaben nutzen wir, um dir das Material vom Tag zu schicken und, falls angehakt, für Impulse und Challenge.{' '}
              <Link to="/datenschutz" className="underline decoration-[#D4AF37]/60 underline-offset-2">Datenschutz</Link>
            </p>
            {zustand === 'fehler' && (
              <p role="alert" className="mt-4 font-inter text-[15px] text-[#F7E7CE]">
                Das Eintragen hat gerade nicht geklappt. Bitte noch einmal versuchen oder kurz am Empfang Bescheid geben.
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
