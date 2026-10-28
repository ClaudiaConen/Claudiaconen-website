import { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import LogoBand from '../components/LogoBand';
import Stimmwelle from '../components/Stimmwelle';
import Helix from '../components/Helix';
import StimmenKarten from '../components/StimmenKarten';
import { TAGE } from '../data/challengeTage';

/**
 * Masterclass UNVERWECHSELBAR (28.10.2026) - das eine Angebot nach der 7-Tage-Challenge.
 * Texte wortgleich aus Claudias "Unverwechselbar_Masterclass_Webmaster_Briefing" (Abschnitte 1-8), Zitate in
 * "Dann ist es Zeit, tiefer einzusteigen" wortgleich aus ihren Challenge-Workbooks Tag 1-3. Dauer 4 Wochen,
 * Start Januar 2027 (Auftraggeber, 28.10.2026; genaues Datum folgt).
 *
 * Regeln aus dem Briefing (Abschnitt 7): eigenstaendiges Angebot, Challenge KEINE Voraussetzung; Zielgruppe offen;
 * KI-Agent als Bonus hervorheben, aber nicht ueber die Module stellen; KEINE Ergebnisse garantieren; Ablauf,
 * Termine, Preis, Testimonials und Anmeldung erst nach Bestaetigung eintragen (siehe OFFEN unten).
 * Bezahlung kuenftig ueber Stripe (Einmalzahlung + Raten 6/12 Monate), nicht mehr Tentary.
 */

const PFAD = '/masterclass';

/** OFFEN - erst nach Claudias Bestaetigung fuellen. Solange leer, zeigt die Seite "folgt" statt einer Zahl. */
const STARTDATUM = ''; // z. B. 'Di., 12. Januar 2027'
const PREIS = ''; // z. B. '… € zzgl. MwSt.'
const STRIPE_LINK = ''; // Stripe-Checkout; solange leer, fuehrt der Knopf zum Gespraech

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
const KNOPF = `inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-5 font-montserrat text-base font-extrabold text-midnight-blue shadow-[0_10px_24px_-12px_rgba(19,35,63,0.45)] transition-transform hover:-translate-y-px sm:text-lg ${GOLD}`;
const GESPRAECH = '/buchen/erstgespraech';

/** Briefing Abschnitt 3 - die acht Module, wortgleich. Icons aus /public/icons. */
const MODULE: { titel: string; icon: string; punkte: string[] }[] = [
  { titel: 'Positionierung und Kernbotschaft', icon: 'botschaft', punkte: [
    'Die eigene Kernbotschaft entwickeln, schärfen und weiterentwickeln.',
    'Eigene Stärken, Besonderheiten und Werte herausarbeiten.',
    'Klar kommunizieren, wofür man steht und welchen Unterschied man macht.',
    'Die eigene Positionierung verständlich und unverwechselbar vermitteln.',
  ] },
  { titel: 'Zielgruppe und Kundenverständnis', icon: 'schritt-3', punkte: [
    'Die eigene Kommunikation aus Kundensicht betrachten.',
    'Bedürfnisse, Erwartungen und mögliche Einwände besser verstehen.',
    'Relevanz und Nutzen klarer vermitteln.',
    'Vertrauen aufbauen und Botschaften gezielter platzieren.',
  ] },
  { titel: 'Präsenz, Selbstsicherheit und Kamera', icon: 'praesenz', punkte: [
    'Individuelle Herausforderungen beim Auftreten erkennen.',
    'Persönliche Wege im Umgang mit Nervosität und Redeangst entwickeln.',
    'Körpersprache, Haltung, Mimik und Blickkontakt bewusst einsetzen.',
    'Vor der Kamera natürlicher und freier sprechen.',
    'Auch in herausfordernden Situationen präsent bleiben.',
  ] },
  { titel: 'Stimme, Sprache und Rhetorik', icon: 'stimme', punkte: [
    'Betonung, Pausen, Artikulation und Sprechtempo gezielt einsetzen.',
    'Die eigene Stimme ausdrucksstärker und variabler nutzen.',
    'Klarer, prägnanter und verständlicher formulieren.',
    'Spontaner sprechen und auf Rückfragen reagieren.',
    'Rhetorische Mittel nutzen, um Aufmerksamkeit und Wirkung zu verstärken.',
  ] },
  { titel: 'Storytelling und persönliche Geschichten', icon: 'story', punkte: [
    'Geschichten mit einer klaren Botschaft entwickeln.',
    'Die eigene Geschichte authentisch erzählen.',
    'Kunden und ihre Bedürfnisse in den Mittelpunkt stellen.',
    'Emotionen mit Fakten und nachvollziehbaren Beispielen verbinden.',
    'Mit Geschichten und Erfahrungen Vertrauen schaffen.',
  ] },
  { titel: 'Kundenkommunikation und Überzeugungskraft', icon: 'schritt-5', punkte: [
    'Verstehen, wie Kunden Entscheidungen treffen.',
    'Gute Fragen stellen und aktiv zuhören.',
    'Den eigenen Wert und Nutzen nachvollziehbar vermitteln.',
    'Mit Einwänden und kritischen Fragen souverän umgehen.',
    'Gespräche klar führen und nächste Schritte ermöglichen, ohne Druck auszuüben.',
  ] },
  { titel: 'Elevator Pitch und Signature-Auftritt', icon: 'schritt-7', punkte: [
    'Den eigenen Pitch weiterentwickeln und individualisieren.',
    'Die Botschaft in 30, 60 oder 90 Sekunden auf den Punkt bringen.',
    'Unterschiedliche Pitches für Kunden, Kooperationspartner und Präsentationen entwickeln.',
    'Überzeugende Einstiege und klare Abschlüsse gestalten.',
    'Den persönlichen Stil finden, statt nur vorgefertigte Formulierungen zu übernehmen.',
    'Den eigenen Auftritt praktisch erproben und verbessern.',
  ] },
  { titel: 'Sichtbarkeit, Persönlichkeit und Umsetzung', icon: 'wirkung', punkte: [
    'Die eigene Expertise sichtbar machen.',
    'Die persönliche Marke und die eigene Tonalität weiterentwickeln.',
    'Video-, Präsentations- und Gesprächsformate passend zu den eigenen Zielen gestalten.',
    'Individuelle Rückmeldungen in die Weiterentwicklung integrieren.',
    'Einen persönlichen Plan für die nächsten Entwicklungsschritte erstellen.',
  ] },
];

/** Briefing Abschnitt 4 - so wird gearbeitet, wortgleich. */
const ARBEITSWEISE: [string, string][] = [
  ['Individuelle Wirkungsanalyse', 'Standortbestimmung zu Beginn, z. B. mit einem kurzen Video, Pitch oder einer Präsentationsübung.'],
  ['Praxisnahe Übungen', 'Inhalte direkt ausprobieren und auf reale Situationen übertragen.'],
  ['Videoanalyse und konkretes Feedback', 'Wahrnehmen, was bereits wirkt und wo gezielte Veränderungen helfen können.'],
  ['Live-Training und Hot Seats', 'Individuelle Herausforderungen anhand konkreter Fälle bearbeiten.'],
  ['Peer-Feedback und Austausch', 'Von unterschiedlichen Perspektiven und Erfahrungen profitieren.'],
  ['Übungen unter Realbedingungen', 'Spontane Fragen, Einwände und ungeplante Situationen trainieren.'],
  ['Abschlussperformance', 'Einen persönlichen Signature-Auftritt entwickeln und präsentieren.'],
  ['Transfer in den Alltag', 'Konkrete nächste Schritte für die Anwendung im Berufsleben festlegen.'],
];

/** Briefing Abschnitt 5 - Bonus, wortgleich. */
const BONUS = [
  'Ideen für Posts, Reels und Videos entwickeln.',
  'Eigene Themen und Botschaften in Content verwandeln.',
  'Texte und Hooks formulieren, die zur eigenen Persönlichkeit passen.',
  'Content planen und den Redaktionsalltag vereinfachen.',
  'Zeit sparen und leichter regelmäßig sichtbar werden.',
];

/** Haeufige Fragen. Antworten nur aus Claudias Briefing und bestaetigten Eckdaten (4 Wochen, online, Start Januar
 *  2027, Raten 6/12 Monate laut Fabian). Preis und genaue Termine erst nach Bestaetigung ergaenzen. */
const FRAGEN: [string, string][] = [
  ['Muss ich vorher an der 7-Tage-Challenge teilgenommen haben?', 'Nein. Die Masterclass ist ein eigenständiges Angebot und offen für Menschen mit unterschiedlichen Vorerfahrungen. Wer bereits an einer Challenge teilgenommen hat, kann Bekanntes vertiefen und weiterentwickeln. Wer neu einsteigt, findet ebenfalls Zugang zu den relevanten Themen.'],
  ['Für wen ist die Masterclass?', 'Für Menschen, die ihre Persönlichkeit, Kommunikation und Wirkung gezielt weiterentwickeln möchten – vor Kunden, in Gesprächen, bei Präsentationen und vor der Kamera.'],
  ['Wie lange dauert die Masterclass und wann geht es los?', 'Die Masterclass läuft vier Wochen online. Start ist im Januar 2027, die genauen Termine geben wir in Kürze bekannt.'],
  ['Wie wird in der Masterclass gearbeitet?', 'Praxisnah: mit einer individuellen Wirkungsanalyse zu Beginn, praxisnahen Übungen, Videoanalyse und konkretem Feedback, Live-Training und Hot Seats, Peer-Feedback und Austausch sowie Übungen unter Realbedingungen. Zum Abschluss entwickelst und präsentierst du deinen persönlichen Signature-Auftritt und legst konkrete nächste Schritte für deinen Berufsalltag fest.'],
  ['Bekomme ich persönliches Feedback?', 'Ja. Videoanalyse und konkretes Feedback gehören fest dazu: Du nimmst wahr, was bereits wirkt und wo gezielte Veränderungen helfen können. In den Hot Seats bearbeiten wir individuelle Herausforderungen anhand konkreter Fälle.'],
  ['Ich bin vor der Kamera unsicher oder habe Redeangst. Ist das trotzdem etwas für mich?', 'Ja. Auch persönliche Herausforderungen beim Auftreten, Unsicherheiten vor der Kamera oder Fragen zur eigenen Wirkung bekommen Raum. Jeder Mensch bringt andere Voraussetzungen mit und steht an einem anderen Punkt seiner Entwicklung. Du lernst nicht, jemand anderes zu werden oder eine perfekte Rolle zu spielen.'],
  ['Was ist der KI-Agent für die Hosentasche?', 'Dein Bonus: Du entdeckst, wie du KI als persönlichen Assistenten nutzen kannst, um deine Sichtbarkeit einfacher und effizienter zu gestalten – ohne dabei deine eigene Stimme und Authentizität zu verlieren. Zum Beispiel für Ideen für Posts, Reels und Videos, für Texte und Hooks und für deine Content-Planung.'],
  ['Kann ich in Raten zahlen?', 'Ja. Neben der Einmalzahlung kannst du in 6 oder 12 Monatsraten zahlen.'],
  ['Ich habe noch eine Frage. Wen kann ich fragen?', 'Mich direkt. Ruf mich an unter +49 160 93102073 oder vereinbare ein kostenloses Gespräch.'],
];

/** Challenge-Tag -> Masterclass-Modul. Zitate wortgleich aus Claudias Workbooks (Tag 1, 2, 3); fuer Tag 4-7
 *  stehen nur die Tagestitel, bis die Workbooks fertig sind. Modulnummern 1-basiert. */
const BRUECKE: { tag: number; modul: number[]; zitat?: string }[] = [
  { tag: 1, modul: [1], zitat: 'An einem Tag können wir nicht ganz in die Tiefe gehen.' },
  { tag: 2, modul: [2], zitat: 'Positionierung und Kernbotschaft sind das Fundament für deine Kundengewinnung. Das geht nicht mal eben zwischen Tür und Angel.' },
  { tag: 3, modul: [3], zitat: 'Lampenfieber wird kleiner, wenn jemand an deiner Seite ist, der dir zeigt, was schon gut ist.' },
  { tag: 4, modul: [4] },
  { tag: 5, modul: [5] },
  { tag: 6, modul: [6] },
  { tag: 7, modul: [7, 8] },
];

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#C9A961]'}`}>
      <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

/** Blendet einen Abschnitt beim Scrollen ein (wie auf /challenge, Klassen cc-r / da in index.css). */
function useEinblenden() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('da');
      return;
    }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { el.classList.add('da'); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Abschnitt({ id, className, label, welle, children }: { id?: string; className: string; label: string; welle?: boolean; children: React.ReactNode }) {
  const ref = useEinblenden();
  return (
    <section ref={ref} id={id} className={`cc-r ${welle ? 'relative overflow-hidden' : ''} ${className}`} aria-labelledby={label}>
      {welle && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 opacity-[0.16]">
          <Stimmwelle />
        </div>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#C9A961]" />;
}

export default function Masterclass() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, []);

  // DNA-Spur neben den sieben Tagen wie auf /challenge (Auftraggeber, 28.10.2026): Sprossen neben die Zeilen,
  // der Tag, dessen Zeile die Bildschirmmitte passiert hat, leuchtet.
  const tageRef = useRef<HTMLOListElement>(null);
  const [aktiverTag, setAktiverTag] = useState(0);
  const [sprossen, setSprossen] = useState<{ ys: number[]; h: number }>({ ys: [], h: 0 });
  useEffect(() => {
    const liste = tageRef.current;
    if (!liste) return;
    const messen = () => {
      const oben = liste.getBoundingClientRect().top;
      const ys = [...liste.querySelectorAll<HTMLElement>('[data-tag]')].map((z) => {
        const r = z.getBoundingClientRect();
        return r.top - oben + r.height / 2;
      });
      setSprossen({ ys, h: liste.offsetHeight });
    };
    const pruefen = () => {
      let n = 0;
      liste.querySelectorAll<HTMLElement>('[data-tag]').forEach((z) => { if (z.getBoundingClientRect().top < window.innerHeight * 0.55) n = Number(z.dataset.tag); });
      setAktiverTag(n);
    };
    messen(); pruefen();
    const ro = new ResizeObserver(messen); ro.observe(liste);
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', pruefen); };
  }, []);

  const kurz = 'UNVERWECHSELBAR ist die Masterclass für Menschen, die ihre Präsenz, Persönlichkeit und Wirkung gezielt weiterentwickeln möchten. Von Positionierung und Kernbotschaft über Stimme, Körpersprache und Storytelling bis hin zu Kundenkommunikation, Signature Pitch und Sichtbarkeit.';
  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UNVERWECHSELBAR – Die Masterclass für Präsenz, Persönlichkeit und Wirkung',
    description: kurz,
    provider: { '@type': 'Person', name: 'Claudia Conen', url: 'https://claudiaconen.com/ueber-mich' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', duration: 'P4W' },
    url: `https://claudiaconen.com${PFAD}`,
  };
  const faqDaten = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FRAGEN.map(([f, a]) => ({ '@type': 'Question', name: f, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO
        title="UNVERWECHSELBAR – Die Masterclass für Präsenz, Persönlichkeit und Wirkung"
        description={`${kurz} Vier Wochen online mit Claudia Conen.`}
        path={PFAD}
        ogImage="https://claudiaconen.com/a27/og/og-challenge.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqDaten) }} />
      <Navigation hell />

      {/* Kopf im Stil von /challenge und der Startseite: heller Grund, links Text, rechts Claudias Foto. */}
      <header className="relative overflow-hidden bg-pearl-white pt-28 pb-14 sm:pt-32 sm:pb-20">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.9),rgba(247,231,206,0)_65%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-8 text-midnight-blue/70">
            <Brotkrumen krumen={[{ name: 'Masterclass UNVERWECHSELBAR' }]} />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-12">
            <div className="min-w-0 text-midnight-blue">
              <span aria-hidden="true" className={`block h-[3px] w-16 rounded-full ${GOLD}`} />
              <p className="mt-5 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] sm:text-sm">Masterclass · online · 4 Wochen</p>
              <h1 className="mt-4 font-montserrat font-extrabold tracking-tight text-midnight-blue">
                <span className="gold-text-animated block whitespace-nowrap text-[length:min(3.6rem,calc((100vw_-_56px)/11.3))] leading-none lg:text-[3.2rem] xl:text-[3.6rem]">UNVERWECHSELBAR</span>
                <span className="mt-4 block text-2xl leading-tight sm:text-[2.1rem]">Die Masterclass für Präsenz, Persönlichkeit und Wirkung</span>
              </h1>
              <p className="mt-6 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-[1.9rem]">
                Zeig, was in dir steckt. Schärfe deine Botschaft. Entfalte deine Wirkung.
              </p>
              <figure className="mx-auto mt-8 w-64 sm:w-72 lg:hidden">
                <img src="/a27/p/ueber-claudia/hero.webp" alt="Claudia Conen, lächelnd, an einer Steinmauer" width={1067} height={1600} className="aspect-[4/5] w-full rounded-[14px] border border-[#C9A961]/60 object-cover object-top shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]" />
              </figure>
              <p className="mt-6 max-w-xl border-l-4 border-[#C9A961] pl-4 font-montserrat text-base font-extrabold uppercase leading-snug tracking-[0.04em] sm:text-lg">
                Start im Januar 2027{STARTDATUM ? ` · ${STARTDATUM}` : ''}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#anmeldung" className={KNOPF}>Deinen Platz sichern →</a>
                <a href="#module" className="font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Die acht Module ansehen</a>
              </div>
            </div>
            <figure className="relative mx-auto hidden w-full lg:block">
              <span aria-hidden="true" className="absolute -inset-3 rounded-[20px] border border-[#C9A961]/50" />
              <img src="/a27/p/ueber-claudia/hero.webp" alt="Claudia Conen, lächelnd, an einer Steinmauer" width={1067} height={1600} className="relative aspect-[4/5] w-full rounded-[14px] object-cover object-top shadow-[0_30px_60px_-30px_rgba(19,35,63,0.65)]" />
            </figure>
          </div>
        </div>
      </header>

      <LogoBand />

      {/* Briefing Abschnitt 2 - Hauptbereich, wortgleich. */}
      <Abschnitt id="worum" className="bg-white py-16 text-midnight-blue sm:py-24" label="worum-titel">
        <div className="mx-auto max-w-3xl px-6">
          <Kicker text="Worum es geht" hell />
          <h2 id="worum-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Du möchtest mit deiner Persönlichkeit überzeugen, deine Botschaft klar vermitteln und Menschen wirklich erreichen?
          </h2>
          <ul className="mt-6 flex list-none flex-wrap gap-2.5 p-0">
            {['vor Kunden', 'in Gesprächen', 'bei Präsentationen', 'vor der Kamera'].map((o) => (
              <li key={o} className="rounded-full border border-[#C9A961]/70 bg-pearl-white px-4 py-2 font-montserrat text-sm font-bold">{o}</li>
            ))}
          </ul>
          <p className="mt-8 font-montserrat text-2xl font-extrabold text-[#9A7B2F] sm:text-3xl">Dann ist es Zeit, tiefer einzusteigen.</p>
          <div className="mt-6 grid gap-4 font-inter text-lg leading-relaxed text-midnight-blue/90">
            <p>In der Masterclass UNVERWECHSELBAR geht es darum, deine persönliche Wirkung gezielt weiterzuentwickeln. Du beschäftigst dich mit deiner Positionierung, deiner Kommunikation, deiner Präsenz und der Frage, wie du deine Stärken so einsetzt, dass sie bei anderen ankommen.</p>
            <p>Dabei schauen wir nicht nur darauf, was du sagst, sondern auch darauf, wie du es sagst, wie du wahrgenommen wirst und was deine Kommunikation bei deinem Gegenüber auslöst.</p>
            <p>Du entwickelst deine Kernbotschaft, lernst deine Zielgruppe besser zu verstehen, arbeitest an deiner Stimme und Körpersprache, vertiefst dein Storytelling und stärkst deine Fähigkeit, überzeugend zu kommunizieren.</p>
            <p>Auch persönliche Herausforderungen beim Auftreten, Unsicherheiten vor der Kamera oder Fragen zur eigenen Wirkung bekommen Raum. Jeder Mensch bringt andere Voraussetzungen mit und steht an einem anderen Punkt seiner Entwicklung.</p>
            <p>Ob du bereits Erfahrung mitbringst oder dich intensiver mit diesen Themen beschäftigen möchtest: Wir beleuchten die relevanten Bereiche, vertiefen die Inhalte und arbeiten praxisnah an deiner individuellen Entwicklung – mit konkreten Übungen, Feedback, neuen Perspektiven und Raum zum Ausprobieren.</p>
          </div>
        </div>
      </Abschnitt>

      {/* Bruecke von der Challenge: dunkles Band wie "Du entscheidest." auf /challenge. Zitate aus Claudias Workbooks. */}
      <Abschnitt id="challenge" className="bg-[#13233F] py-16 text-pearl-white sm:py-24" label="bruecke-titel" welle>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center"><Kicker text="Nach der 7-Tage-Challenge" /></div>
            <h2 id="bruecke-titel" className="cc-zeile mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl" style={{ ['--z' as string]: 0 }}>
              Sieben Tage, sieben Schritte. <span className="text-[#E6CC8F]">Jetzt gehst du in die Tiefe.</span>
            </h2>
            <p className="cc-zeile mt-6 font-inter text-lg leading-relaxed text-pearl-white/85" style={{ ['--z' as string]: 1 }}>
              Wer bereits an einer Challenge teilgenommen hat, kann Bekanntes vertiefen und weiterentwickeln. Wer neu einsteigt, findet ebenfalls Zugang zu den relevanten Themen. Niemand muss vorher an einer Challenge teilgenommen haben.
            </p>
          </div>
          <div className="mt-12 grid items-start gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
          <Helix aktiv={aktiverTag} ys={sprossen.ys} hoehe={sprossen.h} />
          <ol ref={tageRef} className="grid min-w-0 list-none content-start gap-3 p-0">
            {BRUECKE.map((b, k) => (
              <li key={b.tag} data-tag={k} style={{ ['--i' as string]: k }} className={`cc-stufe grid items-center gap-3 rounded-[14px] border bg-white/[0.04] p-4 transition-[border-color,box-shadow] duration-500 sm:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] sm:gap-5 sm:p-5 ${k === aktiverTag ? 'border-[#C9A961] md:shadow-[0_14px_34px_-18px_rgba(201,169,97,0.75)]' : 'border-[#C9A961]/35'}`}>
                <div className="min-w-0">
                  <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] text-pearl-white/60">Challenge · Tag {b.tag}</p>
                  <p className="mt-1 font-montserrat text-base font-extrabold text-white">{TAGE[b.tag - 1].titel}</p>
                  {b.zitat && <p className="mt-1.5 font-cormorant text-lg italic leading-snug text-[#F7E7CE]">„{b.zitat}"</p>}
                </div>
                <span aria-hidden="true" className="hidden h-10 w-10 place-items-center rounded-full border border-[#C9A961] font-montserrat text-[#C9A961] sm:grid">→</span>
                <div className="min-w-0 rounded-[10px] bg-white/[0.06] px-4 py-3">
                  {b.modul.map((m) => (
                    <p key={m} className="font-montserrat text-base font-extrabold text-white">
                      <span className="mr-2 whitespace-nowrap text-[#C9A961]">Modul {m}</span>{MODULE[m - 1].titel}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </Abschnitt>

      {/* Briefing Abschnitt 3 - die acht Module, scannbar als Karten. */}
      <Abschnitt id="module" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="module-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Die Inhalte der Masterclass" hell />
          <h2 id="module-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Acht Module für deine Wirkung.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {MODULE.map((m, k) => (
              <article key={m.titel} style={{ ['--i' as string]: k % 2 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL}`}>
                <div className="flex items-center gap-4">
                  <img src={`/icons/${m.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="h-14 w-14 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.2)]" />
                  <div className="min-w-0">
                    <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#9A7B2F]">Modul {k + 1}</p>
                    <h3 className="mt-0.5 font-montserrat text-lg font-extrabold leading-snug sm:text-xl">{m.titel}</h3>
                  </div>
                </div>
                <ul className="mt-5 grid list-none gap-2 border-t border-[#C9A961]/35 p-0 pt-4">
                  {m.punkte.map((p) => (
                    <li key={p} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed text-midnight-blue/90"><Haken /><span>{p}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Briefing Abschnitt 5 - Bonus, optisch hervorgehoben, aber nach den Modulen (Briefing 7: nicht ueberlagern). */}
      <Abschnitt id="bonus" className="bg-pearl-white pb-16 text-midnight-blue sm:pb-24" label="bonus-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[20px] border-2 border-[#C9A961] bg-white p-7 shadow-[0_30px_60px_-36px_rgba(201,169,97,0.9)] sm:p-10">
            <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.95),rgba(247,231,206,0)_70%)]" />
            <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
              <div className="min-w-0">
                <span className={`inline-block rounded-md px-3 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.18em] text-midnight-blue ${GOLD}`}>Bonus</span>
                <h2 id="bonus-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight">Dein KI-Agent für die Hosentasche</h2>
                <p className="mt-2 font-cormorant text-2xl italic text-[#9A7B2F]">Social Media mit Leichtigkeit gestalten</p>
                <p className="mt-5 font-inter text-[17px] leading-relaxed text-midnight-blue/90">Entdecke, wie du KI als persönlichen Assistenten nutzen kannst, um deine Sichtbarkeit einfacher und effizienter zu gestalten – ohne dabei deine eigene Stimme und Authentizität zu verlieren.</p>
              </div>
              <div className="min-w-0">
                <ul className="grid list-none gap-2.5 p-0">
                  {BONUS.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed"><Haken /><span>{b}</span></li>
                  ))}
                </ul>
                <p className="mt-6 border-l-4 border-[#C9A961] bg-pearl-white px-4 py-3 font-inter text-[15px] leading-relaxed">
                  <b className="font-montserrat font-extrabold">Dein Vorteil:</b> Du musst nicht jedes Mal bei null anfangen. Du hast einen digitalen Sparringspartner an deiner Seite, der dich dabei unterstützt, deine Expertise sichtbar zu machen und Social Media mit mehr Leichtigkeit in deinen Alltag zu integrieren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Briefing Abschnitt 4 - Arbeitsweise. */}
      <Abschnitt id="arbeitsweise" className="bg-white py-16 text-midnight-blue sm:py-24" label="arbeit-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="So wird in der Masterclass gearbeitet" hell />
          <h2 id="arbeit-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Ausprobieren, Feedback, Weiterentwickeln.</h2>
          <ol className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {ARBEITSWEISE.map(([t, x], k) => (
              <li key={t} style={{ ['--i' as string]: k % 4 }} className={`cc-stufe bg-white p-6 ${KACHEL}`}>
                <span className="gold-text-animated font-montserrat text-4xl font-extrabold leading-none">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-montserrat text-base font-extrabold leading-snug">{t}</h3>
                <p className="mt-2 font-inter text-[15px] leading-relaxed text-midnight-blue/80">{x}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center font-inter text-lg leading-relaxed text-midnight-blue/90">
            Du lernst nicht, jemand anderes zu werden oder eine perfekte Rolle zu spielen. Du erkundest deine Stärken, beleuchtest persönliche Herausforderungen und entwickelst deinen eigenen Weg, deine Botschaft klarer und deine Wirkung bewusster zu gestalten.
          </p>
        </div>
      </Abschnitt>

      {/* Trainerin - Claudias Originaltext von /challenge, wortgleich. */}
      <Abschnitt className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="trainerin">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-[14px] shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]">
            <img src="/a27/p/ueber-claudia/erfahrung.webp" alt="Claudia Conen im dunkelblauen Blazer, lächelnd" width={900} height={1350} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
          </figure>
          <div className="min-w-0">
            <Kicker text="Deine Trainerin" hell />
            <h2 id="trainerin" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Claudia Conen</h2>
            <div className="mt-6 grid gap-4 font-inter text-lg leading-relaxed text-midnight-blue">
              <p>Stell dir vor, es gibt Menschen, die sich im Gehirn speichern, die begeistern, faszinieren, motivieren und schockieren.</p>
              <p>Mein ganzes Leben lang beschäftige ich mich damit, dass manche Menschen eine Wirkungskraft haben, die unvergesslich ist, und andere nicht.</p>
              <p className="font-semibold">Und das habe ich zu meinem Beruf gemacht und darum begleite ich dich.</p>
            </div>
            <a href="/ueber-mich" className="mt-8 inline-flex items-center font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Mehr über Claudia – die Umsatzstimme →</a>
          </div>
        </div>
      </Abschnitt>

      {/* Kundenstimmen: dieselben echten Stimmen wie auf /challenge (woertlich, mit Foto, siehe SocialProof.tsx). */}
      <StimmenKarten />

      {/* Anmeldung. Termine, Preis und Stripe-Link oben unter OFFEN eintragen; bis dahin "folgt" + Gespraech.
          Testimonials erst nach Bestaetigung (Briefing 7). */}
      <Abschnitt id="anmeldung" className="bg-white py-16 text-midnight-blue sm:py-24" label="anmeldung-titel">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-[22px] border border-[#C9A961]/70 bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] p-7 text-center shadow-[0_30px_70px_-40px_rgba(19,35,63,0.55)] sm:p-12">
            <div className="flex justify-center"><Kicker text="Deine Anmeldung" hell /></div>
            <h2 id="anmeldung-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="gold-text-animated">UNVERWECHSELBAR</span><br />Die Masterclass
            </h2>
            <dl className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
              {[
                ['Dauer', '4 Wochen'],
                ['Format', 'online, live'],
                ['Start', STARTDATUM || 'Januar 2027 · Termin folgt'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[12px] border border-[#13233F]/10 bg-white px-4 py-3">
                  <dt className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] text-midnight-blue/60">{k}</dt>
                  <dd className="mt-1 font-montserrat text-base font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 font-montserrat text-2xl font-extrabold">{PREIS || 'Preis und Anmeldung folgen in Kürze.'}</p>
            {PREIS && <p className="mt-2 font-inter text-sm text-midnight-blue/75">Auch in 6 oder 12 Monatsraten möglich.</p>}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {STRIPE_LINK
                ? <a href={STRIPE_LINK} className={KNOPF}>Jetzt anmelden →</a>
                : <a href={GESPRAECH} className={KNOPF}>Platz vormerken – lass uns sprechen →</a>}
            </div>
            <p className="mt-5 font-inter text-[15px] text-midnight-blue/80">
              Du hast Fragen? <a href="tel:+4916093102073" className="font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Dann ruf mich an.</a>
            </p>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-montserrat text-xl font-extrabold leading-relaxed sm:text-2xl">
            Du musst nicht werden wie andere. <span className="text-[#9A7B2F]">Entdecke, was dich ausmacht, und bring es wirkungsvoll zum Ausdruck.</span>
          </p>
        </div>
      </Abschnitt>

      {/* Haeufige Fragen - Antworten nur aus dem Briefing (siehe FRAGEN oben). */}
      <Abschnitt id="fragen" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="fragen-titel">
        <div className="mx-auto max-w-3xl px-6">
          <Kicker text="Häufige Fragen" hell />
          <h2 id="fragen-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Fragen und Antworten zur Masterclass</h2>
          <div className="mt-8 grid gap-3">
            {FRAGEN.map(([f, a], k) => (
              <details key={f} style={{ ['--i' as string]: k % 3 }} className={`cc-stufe group bg-white ${KACHEL}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-montserrat text-base font-extrabold sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{f}</span>
                  <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full border border-[#C9A961] text-[#9A7B2F] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-[#C9A961]/35 px-5 pb-5 pt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90 sm:px-6">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#anmeldung" className={KNOPF}>Deinen Platz sichern →</a>
          </div>
        </div>
      </Abschnitt>

      <Footer />
    </div>
  );
}
