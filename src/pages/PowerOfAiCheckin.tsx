import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FotoReihen from '../components/FotoReihen';
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
  'w-full rounded-md border border-[#13233F]/30 bg-white px-4 py-4 font-inter text-[17px] text-[#13233F] placeholder:text-[#13233F]/45 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40';
const HAKEN = 'mt-1 h-5 w-5 flex-none accent-[#D4AF37]';
const TEXTSTAND = '14.10.2026 v5';

export default function PowerOfAiCheckin() {
  const [vorname, setVorname] = useState('');
  const [name, setName] = useState('');
  const [geburtstag, setGeburtstag] = useState('');
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
        name: `${vorname.trim()} ${name.trim()}`.trim(),
        email: email.trim(),
        phone: telefon.trim() || null,
        message:
          `POWER-OF-AI CHECK-IN – Köln, Motorworld, 18.10.2026 (claudiaconen.com/dabei)\n` +
          `Einwilligung Foto/Video, Veröffentlichung inkl. Social Media und Werbung durch Veranstalter und Teilnehmende: ja (Textstand ${TEXTSTAND})\n` +
          `Geburtstag (für Geburtstagsgeschenk): ${geburtstag.trim() || '–'}\n` +
          `Willkommensgeschenk 7 Tage Video-Training ab 26.10. (kostenlos): ${challenge ? 'ja' : 'nein'}\n` +
          `WhatsApp-Gruppe für Impulse nach dem Video-Training: ${whatsapp ? 'ja' : 'nein'}`,
      },
    ]);
    if (error) {
      console.error('Check-in fehlgeschlagen:', error);
      setZustand('fehler');
      return;
    }
    setEingetragen({ name: vorname.trim(), challenge });
    setZustand('fertig');
  }

  function naechstePerson() {
    setVorname('');
    setName('');
    setGeburtstag('');
    setEmail('');
    setTelefon('');
    setFotoVideo(false);
    setWhatsapp(false);
    setChallenge(false);
    setZustand('offen');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-pearl-white text-[#13233F]">
      <SEO
        title="Check-in – THE POWER OF AI Köln"
        description="Check-in für THE POWER OF AI am 18. Oktober 2026 in der Motorworld Köln-Rheinland."
        path="/dabei"
        noindex
      />
      {/* Kopf dunkel mit den laufenden Foto-Reihen wie auf /challenge (Claudia 14.10.2026 14:32: "bewegten Hintergrund
          wie auf der Challenge-Seite", "so hell und dunkel wie vorher auf der Challenge-Seite"). Dunkelblau statt #0A1628. */}
      <header className="relative overflow-hidden bg-[#13233F] px-10 pt-12 pb-14 sm:pt-20 sm:pb-20">
        <FotoReihen />
        <div className="relative z-10 mx-auto max-w-sm rounded-[12px] border border-[#D4AF37]/45 bg-[rgba(19,35,63,0.86)] px-5 py-5 text-pearl-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-8 sm:py-8" style={{ borderTopColor: '#F7E7CE' }}>
          {/* Foto der drei Gastgeber, von Claudia 14.10.2026 (3er_.png) */}
          <img src="/powerofai/team.webp" alt="Die Gastgeber von THE POWER OF AI" width={1100} height={619} className="aspect-video w-full rounded-md object-cover" />
          <p className="mt-5 flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.24em] text-[#EBD197]">
            <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${GOLD}`} />
            Anmeldung · Köln · 18.10.
          </p>
          {zustand === 'fertig' ? (
            <h1 className="mt-4 font-montserrat text-3xl font-bold leading-tight sm:text-4xl" aria-live="polite">
              Danke, {eingetragen.name || 'du'}.
              <span className="gold-text-animated block font-cormorant text-[2.4rem] font-semibold italic leading-tight sm:text-5xl">Du bist eingecheckt.</span>
            </h1>
          ) : (
            <h1 id="checkin-titel" className="mt-3 font-montserrat text-2xl font-bold leading-tight sm:text-3xl">
              Du bist dabei bei THE POWER OF AI.
              <span className="gold-text-animated block font-cormorant text-[1.8rem] font-semibold italic leading-tight sm:text-4xl">Kurz eintragen, dann geht’s los.</span>
            </h1>
          )}
        </div>
      </header>

      {/* Hell: das Formular, übersichtlich */}
      <main className="mx-auto max-w-xl px-4 py-8 sm:py-12">
        {zustand === 'fertig' ? (
          <section>
            <p className="font-inter text-[17px] leading-relaxed">
              Schön, dass du da bist. Viel Freude heute, gute Gespräche und neue Kontakte!
            </p>
            {eingetragen.challenge && (
              <p className="mt-4 font-inter text-[17px] leading-relaxed">
                Zur kostenlosen 7-Tage-Video-Challenge geht es hier:{' '}
                <Link to="/challenge" className="font-semibold underline decoration-[#D4AF37] decoration-2 underline-offset-4">claudiaconen.com/challenge</Link>
              </p>
            )}
            <button type="button" onClick={naechstePerson} className={`mt-8 inline-flex items-center rounded-full px-8 py-4 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-[#13233F] ${GOLD}`}>
              Nächste Person eintragen
            </button>
          </section>
        ) : (
          <form onSubmit={absenden} aria-labelledby="checkin-titel">
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block font-inter text-sm font-medium">Vorname</span>
                  <input name="vorname" type="text" required autoComplete="given-name" value={vorname} onChange={(e) => setVorname(e.target.value)} className={FELD} />
                </label>
                <label className="block">
                  <span className="mb-1 block font-inter text-sm font-medium">Name</span>
                  <input name="name" type="text" required autoComplete="family-name" value={name} onChange={(e) => setName(e.target.value)} className={FELD} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block font-inter text-sm font-medium">E-Mail</span>
                <input name="email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} className={FELD} />
              </label>
              <label className="block">
                <span className="mb-1 block font-inter text-sm font-medium">Handynummer {whatsapp ? '(für die WhatsApp-Gruppe)' : '(freiwillig)'}</span>
                <input name="telefon" type="tel" required={whatsapp} autoComplete="tel" inputMode="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={FELD} />
              </label>
              <label className="block">
                <span className="mb-1 block font-inter text-sm font-medium">Geburtstag (freiwillig, wenn du mein Geschenk zum Geburtstag möchtest)</span>
                <input name="geburtstag" type="text" inputMode="numeric" placeholder="TT.MM." maxLength={6} value={geburtstag} onChange={(e) => setGeburtstag(e.target.value)} className={FELD} />
              </label>
            </div>

            {/* Zweck des Events, steht direkt über der Einwilligung (Claudia 14.10.2026 14:46) */}
            <p className="mt-7 font-montserrat text-[17px] font-bold leading-snug">
              Es geht um Sichtbarkeit.{' '}
              <span className="font-cormorant text-[21px] font-semibold italic text-[#8C6A12]">Deshalb wird hier gefilmt und fotografiert, das Event dient diesem Zweck.</span>
            </p>
            {/* Einwilligung: kurzer Satz mit dem Wesentlichen (Fotos/Videos + Social Media), Details zum Aufklappen (Claudia 14.10.2026 14:19) */}
            <div className="mt-3 rounded-md border-2 border-[#D4AF37] bg-white p-4">
              <label className="flex items-start gap-3 font-inter text-[16px] leading-relaxed">
                <input name="foto_video" type="checkbox" required checked={fotoVideo} onChange={(e) => setFotoVideo(e.target.checked)} className={HAKEN} />
                <span><strong className="font-semibold">Ich bin einverstanden</strong>, dass heute Fotos und Videos von mir gemacht und veröffentlicht werden.</span>
              </label>
              <details className="group mt-2 pl-8">
                <summary className="cursor-pointer list-none font-inter text-sm font-medium underline decoration-[#D4AF37] underline-offset-2 [&::-webkit-details-marker]:hidden">
                  Was heißt das genau? <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-2 font-inter text-sm leading-relaxed text-[#13233F]/85">
                  Heute entstehen Fotos und Videos für Social Media. Mit dem Haken bist du einverstanden, dass die Veranstalter und die
                  Teilnehmenden vor Ort sie posten dürfen, auch zu Werbezwecken. Genau dafür treffen wir uns: gemeinsam stark für die Zukunft,
                  Content erstellen, sichtbar werden, Vertrauen aufbauen und Kunden gewinnen. Widerruf jederzeit für die Zukunft an
                  claudiaconen@umsatzstimme.de.
                </p>
                <p className="mt-3 font-inter text-sm leading-relaxed text-[#13233F]/85">
                  <strong className="font-semibold">Du möchtest nicht aufs Bild?</strong> Kein Problem: Mal dir am Empfang einen roten Punkt aufs
                  Namensschild. Die hinteren Reihen sind unsere kamerafreie Zone. Bitte trage selbst mit dafür Sorge, denn bei unserem Event geht
                  es um Sichtbarkeit im KI-Zeitalter, um Kunden gewinnen zu können. Solltest du zufällig gefilmt oder fotografiert worden sein und
                  es merken, sprich bitte die Person an der Kamera an. Das ist für uns mehr Aufwand, darum bitten wir um dein Verständnis.
                </p>
              </details>
            </div>

            <p className="mt-9 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#8C6A12]">Obendrauf: dein Willkommensgeschenk</p>
            {/* 7-Tage-Challenge als einladende Karte mit 3D-Icon, dunkel wie die Kacheln der Challenge-Seite */}
            <label className={`mt-3 flex cursor-pointer items-center gap-4 rounded-[10px] border-2 p-4 text-pearl-white transition-colors ${challenge ? 'border-[#F7E7CE] bg-[#1A2B4C]' : 'border-[#D4AF37]/60 bg-[#13233F]'}`}>
              <img src="/powerofai/icon-challenge.webp" alt="" width={64} height={64} className="h-16 w-16 flex-none object-contain" />
              <span className="flex-1">
                <span className="block font-montserrat text-[17px] font-bold leading-snug text-white">7-Tage-Video-Challenge</span>
                <span className="block font-inter text-[15px] leading-snug text-pearl-white/85">Kostenfrei · Start 26. Oktober · 7 Tage, 1 Minute Aufwand</span>
                <span className="mt-1 block font-cormorant text-[19px] font-semibold italic text-[#E4BC5D]">Wie wirkst du auf andere?</span>
              </span>
              <input name="challenge" type="checkbox" checked={challenge} onChange={(e) => setChallenge(e.target.checked)} className="h-6 w-6 flex-none accent-[#D4AF37]" aria-label="Ja, ich will bei der 7-Tage-Video-Challenge dabei sein" />
            </label>
            <p className="mt-2 text-right">
              <a href="/challenge" target="_blank" rel="noopener noreferrer" className="font-inter text-sm font-medium underline decoration-[#D4AF37] underline-offset-2">Was ist die Challenge? →</a>
            </p>
            <label className="mt-3 flex items-start gap-3 font-inter text-[15px] leading-relaxed">
              <input name="whatsapp" type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} className={HAKEN} />
              <span>Ja, nimm mich gern in die WhatsApp-Gruppe für kleine Impulse nach der Challenge auf. Austreten geht jederzeit.</span>
            </label>

            <button type="submit" disabled={zustand === 'sendet'} className={`mt-8 w-full rounded-full px-8 py-5 font-montserrat text-base font-bold uppercase tracking-[0.12em] text-[#13233F] shadow-[0_10px_24px_-10px_rgba(140,106,18,.6)] disabled:opacity-70 ${GOLD}`}>
              {zustand === 'sendet' ? 'Wird eingetragen …' : 'Einchecken'}
            </button>
            <p className="mt-4 font-inter text-sm leading-relaxed text-[#13233F]/75">
              Deine Angaben nutzen wir für die Teilnehmerliste und, falls angegeben, für Challenge, WhatsApp-Gruppe und deinen Geburtstagsgruß.{' '}
              <Link to="/datenschutz" className="underline decoration-[#D4AF37] underline-offset-2">Datenschutz</Link>
            </p>
            {zustand === 'fehler' && (
              <p role="alert" className="mt-4 font-inter text-[15px] font-semibold text-[#8C6A12]">
                Das Eintragen hat gerade nicht geklappt. Bitte noch einmal versuchen oder kurz am Empfang Bescheid geben.
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
