import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { TERMINE, FRUEH, ABEND, SCHRITTE, BEGLEITUNG } from '../data/masterclassDaten';

/**
 * Dankesseite nach der Buchung der Masterclass UNVERWECHSELBAR (Route /masterclass/danke, von Stripe/Tentary als
 * Erfolgsseite angesteuert). Texte WORTGLEICH aus Claudias Dokument "Masterclass_Unverwechselbar_Angebotsseite"
 * (Abschnitt "Dankesseite nach der Buchung"). Zusaetzlich die KOMPLETTE Ablauf-Uebersicht (Gabi 30.10.2026:
 * hier darf nichts fehlen) - die sieben Schritte und die Begleitung aus ../data/masterclassDaten. noindex.
 */

const PFAD = '/masterclass/danke';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'rounded-[10px] border border-[#13233F]/[0.13]';
const KONTAKT = 'claudiaconen@umsatzstimme.de';

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#C9A961]" />;
}

function Kicker({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue">
      <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

export default function MasterclassDanke() {
  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO
        title="Danke – deine Masterclass UNVERWECHSELBAR"
        description="Dein Platz in der Masterclass UNVERWECHSELBAR ist gesichert. Hier findest du deine Termine und die komplette Übersicht, wie die Masterclass abläuft."
        path={PFAD}
        ogImage="https://claudiaconen.com/a27/og/og-challenge.jpg"
        noindex
      />
      <Navigation hell />

      {/* Kopf: dunkel, links „Danke", rechts Claudias Business-Foto, Termine gross im Goldfeld. */}
      <header className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_75%_10%,#24396A_0%,#1A2B4C_45%,#13233F_100%)] pt-32 pb-16 text-pearl-white sm:pt-36 sm:pb-24">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div className="min-w-0">
              <p className="flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.24em] text-[#C9A961]">
                <span aria-hidden="true" className={`h-[3px] w-8 rounded-full ${GOLD}`} />Masterclass UNVERWECHSELBAR
              </p>
              <h1 className="mt-6 font-cormorant text-[40px] font-semibold leading-[1.05] sm:text-6xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Danke. <span className="bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">Dein Platz ist gesichert.</span>
              </h1>
              <p className="mt-5 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/85">
                Schön, dass du dabei bist. Ich freue mich auf vier Donnerstage mit dir.
              </p>
              <div className="mt-8 rounded-[16px] border-2 border-[#C9A961] bg-white/[0.06] p-5 sm:p-6">
                <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#E6CC8F]">Deine Termine</p>
                <p className="mt-2 font-montserrat text-lg font-extrabold leading-snug text-white sm:text-xl">
                  Donnerstags am 19. November, 26. November, 3. Dezember und 10. Dezember 2026
                </p>
                <p className="mt-2 font-inter text-[15px] text-pearl-white/85">Frühgruppe {FRUEH} oder Abendgruppe {ABEND}</p>
                <p className="mt-3 border-t border-[#C9A961]/40 pt-3 font-inter text-[15px] text-pearl-white/85">
                  Dazu deine 1:1-Übungsstunde von 60 Minuten in der Woche vom 14. bis 18. Dezember.
                </p>
              </div>
            </div>
            <figure className="relative mx-auto hidden w-full max-w-sm lg:block">
              <span aria-hidden="true" className="absolute -inset-3 rounded-[20px] border border-[#C9A961]/50" />
              <img src="/a27/p/ueber-claudia/erfahrung.webp" alt="Claudia Conen im dunkelblauen Blazer, lächelnd" width={900} height={1350} className="relative aspect-[4/5] w-full rounded-[14px] object-cover object-top shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" />
            </figure>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* So geht es jetzt weiter. */}
        <section aria-labelledby="weiter-titel">
          <Kicker text="So geht es jetzt weiter" />
          <h2 id="weiter-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">Deine nächsten Schritte</h2>
          <ol className="mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
            {[
              'In den nächsten Minuten bekommst du eine Bestätigung per Mail, mit deiner Rechnung.',
              'Eine Woche vor dem Start schicke ich dir den Zoom-Link und alle Termine deiner Gruppe für deinen Kalender.',
              'Bring zum ersten Termin deinen Kernsatz aus der Challenge mit. Mehr Vorbereitung brauchst du nicht.',
            ].map((t, k) => (
              <li key={t} className={`bg-white p-6 ${KACHEL}`}>
                <span className={`inline-grid h-9 w-9 place-items-center rounded-full font-montserrat text-sm font-extrabold text-midnight-blue ${GOLD}`}>{k + 1}</span>
                <p className="mt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90">{t}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Komplette Uebersicht: wie die Masterclass ablaeuft (alle sieben Schritte). */}
        <section aria-labelledby="ablauf-titel" className="mt-16 sm:mt-20">
          <Kicker text="Deine Übersicht" />
          <h2 id="ablauf-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Hier ist deine erste Übersicht, wie die Masterclass abläuft.
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-[17px] leading-relaxed text-midnight-blue/85">
            Deine sieben Schritte über die vier Live-Termine – und was du aus jedem mitnimmst.
          </p>
          <ol className="mt-10 grid list-none gap-4 p-0">
            {SCHRITTE.map((s) => (
              <li key={s.nr} className={`bg-white p-6 sm:p-7 ${KACHEL}`}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className={`inline-grid h-10 w-10 flex-none place-items-center rounded-full font-montserrat text-base font-extrabold text-midnight-blue ${GOLD}`}>{s.nr}</span>
                  <h3 className="min-w-0 flex-1 font-montserrat text-lg font-extrabold leading-snug text-midnight-blue sm:text-xl">{s.titel}</h3>
                  <span className="whitespace-nowrap rounded-full border border-[#C9A961]/70 bg-pearl-white px-3.5 py-1.5 font-montserrat text-xs font-extrabold text-[#9A7B2F]">{s.datum}</span>
                </div>
                <p className="mt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90 sm:text-base">{s.text}</p>
                <p className="mt-4 flex items-start gap-3 border-t border-[#C9A961]/35 pt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90">
                  <Haken /><span><b className="font-montserrat font-extrabold text-midnight-blue">Du nimmst mit:</b> {s.mit}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Deine Begleitung zwischen den Terminen. */}
        <section aria-labelledby="begleitung-titel" className="mt-16 sm:mt-20">
          <Kicker text="Zwischen den Terminen" />
          <h2 id="begleitung-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">Du bleibst nicht allein.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BEGLEITUNG.map((b) => (
              <article key={b.titel} className={`p-6 ${b.stern ? 'border-2 border-[#C9A961] bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] md:col-span-2' : `bg-white ${KACHEL}`} rounded-[10px]`}>
                <h3 className={`font-montserrat font-extrabold leading-snug text-midnight-blue ${b.stern ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{b.titel}</h3>
                <p className="mt-2 font-inter text-[15px] leading-relaxed text-midnight-blue/85">{b.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Kontakt + Abschluss. */}
        <section className="mt-16 rounded-[18px] border border-[#C9A961]/60 bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] p-7 text-center shadow-[0_24px_50px_-34px_rgba(19,35,63,0.5)] sm:mt-20 sm:p-10">
          <p className="font-inter text-[17px] leading-relaxed text-midnight-blue/90">
            Du hast eine Frage? Schreib mir einfach: <a href={`mailto:${KONTAKT}`} className="font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">{KONTAKT}</a>
          </p>
          <p className="mt-6 font-cormorant text-3xl italic text-[#9A7B2F] sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Bis bald, deine Claudia</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
