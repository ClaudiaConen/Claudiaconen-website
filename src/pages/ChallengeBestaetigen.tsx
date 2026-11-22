import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/**
 * Bestätigungsseite nach dem Eintragen ins Challenge-Formular (Double-Opt-in, Claudia 22.11.2026).
 * Erscheint SOFORT nach dem Absenden – die Teilnehmerin bekommt dann eine E-Mail und muss erst den
 * Link darin klicken. Danach landet sie auf /challenge/danke (die bleibt unverändert).
 * Hier stehen keine privaten Links (Zoom/Gruppen), aber die Seite soll nicht in die Suche – deshalb noindex.
 */

/** Die drei Schritte aus Claudias Text – fetter Kopf + optionaler Zusatz. */
const SCHRITTE: { kopf: string; text?: string }[] = [
  { kopf: 'Öffne dein E-Mail-Postfach.' },
  { kopf: 'Such die Mail von Claudia Conen', text: 'mit dem Betreff „Bitte bestätige deine Anmeldung zur 7-Tage-Challenge".' },
  { kopf: 'Klick in der Mail auf „Ja, ich bin dabei“ – fertig!', text: 'Danach landest du automatisch auf der Dankeseite mit allen Infos (Mitgliederbereich, WhatsApp-Gruppe & Co.).' },
];

export default function ChallengeBestaetigen() {
  return (
    <div className="min-h-screen bg-[#13233F] text-pearl-white">
      <SEO
        title="Fast geschafft – bitte bestätige deine E-Mail"
        description="Nur noch ein Klick: Bestätige deine Anmeldung zur kostenfreien 7-Tage-Challenge in deinem Postfach."
        path="/challenge/bestaetigen"
        noindex
      />
      <Navigation />

      <header className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,#2A4170_0%,#1A2B4C_45%,#13233F_100%)] pt-32 pb-14 text-center sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] text-[#C9A961]"><span className="h-px w-10 bg-[#C9A961]" />Fast geschafft<span className="h-px w-10 bg-[#C9A961]" /></p>
          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A961]/50 bg-white/[0.06] text-3xl shadow-[0_14px_30px_-16px_rgba(0,0,0,0.8)]" aria-hidden>✉️</div>
          <h1 className="mt-6 font-cormorant text-[32px] font-semibold leading-[1.08] tracking-[0.02em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Nur noch ein Klick –
            <span className="mt-2 block bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">dann bist du bei der 7-Tage-Challenge dabei.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/85">
            Wir haben dir gerade eine E-Mail geschickt. Darin ist ein Bestätigungs-Knopf. Erst wenn du darauf klickst, bist du wirklich angemeldet <span className="text-pearl-white/70">(so sind wir sicher, dass die Adresse wirklich dir gehört)</span>.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20">
        <section className="rounded-[18px] border border-[#C9A961]/35 bg-[linear-gradient(180deg,#1E3257,#13233F)] p-7 sm:p-9">
          <h2 className="font-montserrat text-sm font-extrabold uppercase tracking-[0.2em] text-[#C9A961]">So geht’s</h2>
          <ol className="mt-5 grid list-none gap-5 p-0">
            {SCHRITTE.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span aria-hidden className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#C9A961] font-montserrat text-sm font-black text-midnight-blue">{i + 1}</span>
                <p className="font-inter text-[15px] leading-relaxed text-pearl-white/90 sm:text-base">
                  <span className="font-montserrat font-extrabold text-white">{s.kopf}</span>{s.text ? ' ' + s.text : ''}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6 rounded-[14px] border border-[#C9A961]/25 bg-white/[0.04] p-5 text-center">
          <p className="font-inter text-sm leading-relaxed text-pearl-white/80">
            <b className="font-montserrat font-extrabold text-white">Keine Mail bekommen?</b> Schau bitte auch im Spam- oder Werbung-Ordner nach. Manchmal dauert es ein, zwei Minuten.
          </p>
        </div>

        <p className="mt-10 text-center font-cormorant text-2xl italic text-[#F7E7CE] sm:text-3xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Die Challenge startet am 7. Dezember 2026. Wir freuen uns auf dich! 💛
        </p>
      </main>

      <Footer />
    </div>
  );
}
