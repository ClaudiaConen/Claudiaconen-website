import { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import LogoBand from '../components/LogoBand';
import Stimmwelle from '../components/Stimmwelle';
import Helix from '../components/Helix';
import StimmenKarten from '../components/StimmenKarten';
import { START_LABEL, FRUEH, ABEND, TERMINE, SCHRITTE, BEGLEITUNG, BLICK, CLAUDIA_ZITAT } from '../data/masterclassDaten';

/**
 * Masterclass UNVERWECHSELBAR - Angebots-/Verkaufsseite. Texte WORTGLEICH aus Claudias Dokument
 * "Masterclass_Unverwechselbar_Angebotsseite" (29.10.2026). Konkrete Termine (19.11.-10.12.2026),
 * zwei Gruppen (Frueh 7:30-9:00 / Abend 18:30-20:00), sieben Schritte mit "Du nimmst mit", Begleitung
 * zwischen den Terminen inkl. finaler 1:1-Uebungsstunde. Gemeinsame Daten in ../data/masterclassDaten.
 * Dankesseite: ../pages/MasterclassDanke (Route /masterclass/danke).
 *
 * Preis 797 € zzgl. MwSt.; Kauf ueber KAUF_LINK (Stripe), Ratenzahlung ueber Klarna im Checkout. Rabatt-Code
 * WIRKUNG7 nur fuer Challenge-Teilnehmer, NICHT auf der Seite (siehe Kommentar bei KAUF_LINK).
 */

const PFAD = '/masterclass';

/** Preise (Auftraggeber, 28.10.2026): Fruehbucher 497 €, regulaer 797 €, zzgl. MwSt. Fruehbucher bis 12.11.2026. */
const REGULAER = 797;
const EURO = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }) + ' €';
const BRUTTO = (n: number) => EURO(Math.round(n * 119) / 100);

/** Kauf ueber Stripe-Zahlungslink. Ratenzahlung laeuft fuer die Kundin ueber Klarna im Bezahlfenster (Claudia bekommt
 *  sofort den vollen Betrag). Der Rabatt-Code WIRKUNG7 (-300 €) steht BEWUSST NICHT auf der Seite: Claudia gibt ihn nur
 *  den Challenge-Teilnehmern persoenlich am letzten Challenge-Tag (Gabi 31.10.2026); im Stripe-Checkout gibt es dafuer
 *  das Feld "Code hinzufuegen". */
const KAUF_LINK = 'https://buy.stripe.com/9B600j5vWaOQd2w3ba3oA00';
const GESPRAECH = '/buchen/erstgespraech';

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
const KNOPF = `inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-5 font-montserrat text-base font-extrabold text-midnight-blue shadow-[0_10px_24px_-12px_rgba(19,35,63,0.45)] transition-transform hover:-translate-y-px sm:text-lg ${GOLD}`;

/** Der KI-Agent wird in der Masterclass gezeigt, ist aber separat im Abo (kein Gratis-Bonus, Auftraggeber 28.10.2026). */
const KI_AGENT = [
  'Ideen für Posts, Reels und Videos entwickeln.',
  'Eigene Themen und Botschaften in Content verwandeln.',
  'Texte und Hooks formulieren, die zur eigenen Persönlichkeit passen.',
  'Content planen und den Redaktionsalltag vereinfachen.',
  'Zeit sparen und leichter regelmäßig sichtbar werden.',
];

/** Haeufige Fragen. Fakten aus dem Dokument (Termine 19.11.-10.12.2026, zwei Gruppen, max. 9, 1:1-Stunde, Zoom ohne
 *  Aufzeichnung, Challenge keine Voraussetzung). */
const FRAGEN: [string, string][] = [
  ['Muss ich vorher an der 7-Tage-Challenge teilgenommen haben?', 'Nein. Du hast in der Challenge schon einen Vorsprung, aber die Masterclass ist ein eigenständiges Angebot. Wer neu einsteigt, findet genauso Zugang zu allen Themen.'],
  ['Für wen ist die Masterclass?', 'Für Selbstständige, Coaches und Unternehmerinnen, die sich zeigen wollen, ohne sich zu verbiegen – und die jetzt dranbleiben wollen, mit Begleitung statt allein.'],
  ['Wann sind die Termine?', '4 Live-Termine, donnerstags: 19. November, 26. November, 3. Dezember und 10. Dezember 2026. Du wählst die Frühgruppe (7:30–9:00 Uhr) oder die Abendgruppe (18:30–20:00 Uhr). Die Inhalte sind in beiden Gruppen gleich.'],
  ['Was brauche ich dafür?', 'Keine Technik-Kenntnisse, kein Studio und kein perfektes Video. Dein Handy und deinen Mut – mehr nicht. Alle Termine laufen live per Zoom, ohne Aufzeichnung.'],
  ['Bekomme ich persönliches Feedback?', 'Ja. Wir schauen gemeinsam auf deine Videos, und zum Abschluss bekommst du deine persönliche 1:1-Übungsstunde mit mir: 60 Minuten nur für dich, in der Woche vom 14. bis 18. Dezember.'],
  ['Wie viele Plätze gibt es?', 'Höchstens 9 Personen pro Gruppe. Darum laufen alle Termine live, und jede und jeder kommt dran.'],
  ['Ich bin vor der Kamera unsicher oder habe Redeangst. Ist das trotzdem etwas für mich?', 'Ja, gerade dann. Lampenfieber wird kleiner durch Üben, nicht durch Warten. Du lernst nicht, jemand anderes zu werden – du findest deinen eigenen, sicheren Weg.'],
  ['Kann ich in Raten zahlen?', 'Ja. Im Bezahlfenster kannst du neben der Einmalzahlung auch Klarna wählen und bequem in Raten zahlen.'],
  ['Ich habe noch eine Frage. Wen kann ich fragen?', 'Mich direkt. Ruf mich an unter +49 160 93102073 oder vereinbare ein kostenloses Kennenlernen.'],
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

  // DNA-Spur neben den sieben Schritten (wie auf /challenge): der Schritt, dessen Zeile die Bildschirmmitte
  // passiert hat, leuchtet.
  const schritteRef = useRef<HTMLOListElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const [sprossen, setSprossen] = useState<{ ys: number[]; h: number }>({ ys: [], h: 0 });
  useEffect(() => {
    const liste = schritteRef.current;
    if (!liste) return;
    const messen = () => {
      const oben = liste.getBoundingClientRect().top;
      const ys = [...liste.querySelectorAll<HTMLElement>('[data-schritt]')].map((z) => {
        const r = z.getBoundingClientRect();
        return r.top - oben + r.height / 2;
      });
      setSprossen({ ys, h: liste.offsetHeight });
    };
    const pruefen = () => {
      let n = 0;
      liste.querySelectorAll<HTMLElement>('[data-schritt]').forEach((z) => { if (z.getBoundingClientRect().top < window.innerHeight * 0.55) n = Number(z.dataset.schritt); });
      setAktiv(n);
    };
    messen(); pruefen();
    const ro = new ResizeObserver(messen); ro.observe(liste);
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', pruefen); };
  }, []);

  // Mitlaufender Kauf-Knopf (Sales-Leiste): erscheint nach dem Kopf, verschwindet, sobald die Anmeldung ODER der
  // Footer im Bild ist (sonst verdeckt die Leiste Impressum/Datenschutz im Footer, Gabi 31.10.2026).
  const [leiste, setLeiste] = useState(false);
  const ankerRef = useRef<HTMLDivElement>(null);
  const anmeldungRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anker = ankerRef.current, anmeldung = anmeldungRef.current, footer = footerRef.current;
    if (!anker || !anmeldung || !footer) return;
    let hinterKopf = false, inAnmeldung = false, inFooter = false;
    const aktualisieren = () => setLeiste(hinterKopf && !inAnmeldung && !inFooter);
    const io1 = new IntersectionObserver(([e]) => { hinterKopf = !e.isIntersecting; aktualisieren(); });
    const io2 = new IntersectionObserver(([e]) => { inAnmeldung = e.isIntersecting; aktualisieren(); }, { rootMargin: '0px 0px -20% 0px' });
    const io3 = new IntersectionObserver(([e]) => { inFooter = e.isIntersecting; aktualisieren(); });
    io1.observe(anker); io2.observe(anmeldung); io3.observe(footer);
    return () => { io1.disconnect(); io2.disconnect(); io3.disconnect(); };
  }, []);

  const kurz = 'UNVERWECHSELBAR ist die Masterclass für Menschen, die ihre Präsenz, Persönlichkeit und Wirkung gezielt weiterentwickeln möchten: vier Live-Termine in kleiner Gruppe, persönliches Feedback und eine finale 1:1-Übungsstunde mit Claudia Conen.';
  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UNVERWECHSELBAR – Die Masterclass für Präsenz, Persönlichkeit und Wirkung',
    description: kurz,
    provider: { '@type': 'Person', name: 'Claudia Conen', url: 'https://claudiaconen.com/ueber-mich' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', startDate: '2026-11-19', endDate: '2026-12-10' },
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
        description={`${kurz} Start 19. November 2026.`}
        path={PFAD}
        ogImage="https://claudiaconen.com/a27/og/og-challenge.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqDaten) }} />
      <Navigation hell />

      {/* Kopf: heller Grund, links Text + Verkaufs-Versprechen, rechts Claudias Foto. */}
      <header className="relative overflow-hidden bg-pearl-white pt-28 pb-14 sm:pt-32 sm:pb-20">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.9),rgba(247,231,206,0)_65%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-8 text-midnight-blue/70">
            <Brotkrumen krumen={[{ name: 'Masterclass UNVERWECHSELBAR' }]} />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-12">
            <div className="min-w-0 text-midnight-blue">
              <span aria-hidden="true" className={`block h-[3px] w-16 rounded-full ${GOLD}`} />
              <p className="mt-5 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] sm:text-sm">Masterclass · online · 4 Wochen · kleine Gruppe</p>
              <h1 className="mt-4 font-montserrat font-extrabold tracking-tight text-midnight-blue">
                <span className="gold-text-animated block whitespace-nowrap text-[length:min(3.6rem,calc((100vw_-_56px)/11.3))] leading-none lg:text-[3.2rem] xl:text-[3.6rem]">UNVERWECHSELBAR</span>
                <span className="mt-4 block text-2xl leading-tight sm:text-[2.1rem]">Die Masterclass für Präsenz, Persönlichkeit und Wirkung</span>
              </h1>
              <p className="mt-6 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-[1.9rem]">
                Sieben Tage hast du investiert. Jetzt geht's ans Eingemachte.
              </p>
              <p className="mt-2 font-montserrat text-lg font-extrabold leading-snug text-[#9A7B2F] sm:text-xl">
                Jetzt geht's in die Selbstsicherheit. Jetzt geht's weiter.
              </p>
              <figure className="mx-auto mt-8 w-64 sm:w-72 lg:hidden">
                <img src="/a27/p/ueber-claudia/hero.webp" alt="Claudia Conen, lächelnd, an einer Steinmauer" width={1067} height={1600} className="aspect-[4/5] w-full rounded-[14px] border border-[#C9A961]/60 object-cover object-top shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]" />
              </figure>
              <p className="mt-7 font-inter text-[17px] leading-relaxed text-midnight-blue/85">
                4 Wochen live mit Claudia Conen · in kleiner Gruppe · mit persönlichem Feedback · plus deine persönliche 1:1-Übungsstunde.
              </p>
              <p className="mt-6 max-w-xl border-l-4 border-[#C9A961] pl-4 font-montserrat text-base font-extrabold uppercase leading-snug tracking-[0.04em] sm:text-lg">
                Start: {START_LABEL}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#anmeldung" className={KNOPF}>Platz sichern →</a>
                <a href="#schritte" className="font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Deine sieben Schritte ansehen</a>
              </div>
            </div>
            <figure className="relative mx-auto hidden w-full lg:block">
              <span aria-hidden="true" className="absolute -inset-3 rounded-[20px] border border-[#C9A961]/50" />
              <img src="/a27/p/ueber-claudia/hero.webp" alt="Claudia Conen, lächelnd, an einer Steinmauer" width={1067} height={1600} className="relative aspect-[4/5] w-full rounded-[14px] object-cover object-top shadow-[0_30px_60px_-30px_rgba(19,35,63,0.65)]" />
            </figure>
          </div>
        </div>
      </header>
      <div ref={ankerRef} aria-hidden="true" />

      <LogoBand />

      {/* Bruecke aus der Challenge: dunkles Band wie "Du entscheidest." auf /challenge. Text wortgleich aus dem Dokument. */}
      <Abschnitt id="bruecke" className="bg-[#13233F] py-16 text-pearl-white sm:py-24" label="bruecke-titel" welle>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex justify-center"><Kicker text="Nach der 7-Tage-Challenge" /></div>
          <h2 id="bruecke-titel" className="cc-zeile mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl" style={{ ['--z' as string]: 0 }}>
            Du hast gezeigt, dass du es <span className="text-[#E6CC8F]">ernst meinst.</span>
          </h2>
          <p className="cc-zeile mt-6 font-inter text-lg leading-relaxed text-pearl-white/85" style={{ ['--z' as string]: 1 }}>
            Sieben Tage, sieben Videos, sieben Mal Mut. Du hast deine Kernbotschaft gefunden, deine Stimme gehört und dich gezeigt. Jetzt gehst du in die Tiefe: üben, bis es sitzt, mit Feedback, das dich wirklich weiterbringt.
          </p>
          <div className="cc-zeile mt-9" style={{ ['--z' as string]: 2 }}>
            <a href="#anmeldung" className={KNOPF}>Platz sichern →</a>
          </div>
        </div>
      </Abschnitt>

      {/* Gruppen und Termine. */}
      <Abschnitt id="termine" className="bg-white py-16 text-midnight-blue sm:py-24" label="termine-titel">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker text="Gruppen und Termine" hell />
          <h2 id="termine-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Deine Masterclass. Passend zu deinem Alltag.</h2>
          <p className="mt-4 max-w-2xl font-inter text-[17px] leading-relaxed text-midnight-blue/85">
            Starte morgens mit frischem Kopf oder nimm dir abends Zeit für deine Wirkungskraft. Du wählst deine Gruppe, die Inhalte sind in beiden Gruppen gleich.
          </p>
          <div className="mt-10 overflow-hidden rounded-[16px] border border-[#C9A961]/50 shadow-[0_24px_50px_-34px_rgba(19,35,63,0.5)]">
            <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] bg-[#13233F] text-pearl-white">
              <div className="px-4 py-3.5 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em] sm:px-6 sm:text-xs">Termin</div>
              <div className="px-4 py-3.5 text-center font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#E6CC8F] sm:px-6 sm:text-xs">Frühgruppe</div>
              <div className="px-4 py-3.5 text-center font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#E6CC8F] sm:px-6 sm:text-xs">Abendgruppe</div>
            </div>
            {TERMINE.map((t, i) => (
              <div key={t} className={`grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] items-center ${i % 2 ? 'bg-pearl-white' : 'bg-white'}`}>
                <div className="px-4 py-4 font-montserrat text-[13px] font-extrabold leading-snug sm:px-6 sm:text-base">{t}</div>
                <div className="px-4 py-4 text-center font-inter text-[13px] font-semibold text-midnight-blue/80 sm:px-6 sm:text-[15px]">{FRUEH}</div>
                <div className="px-4 py-4 text-center font-inter text-[13px] font-semibold text-midnight-blue/80 sm:px-6 sm:text-[15px]">{ABEND}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-montserrat text-base font-extrabold text-midnight-blue sm:text-lg">
            Vier Wochen. Vier Live-Termine. <span className="text-[#9A7B2F]">Insgesamt sechs Stunden pro Gruppe.</span>
          </p>
        </div>
      </Abschnitt>

      {/* Von der Challenge in die Tiefe: deine sieben Schritte (mit DNA-Spur). */}
      <Abschnitt id="schritte" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="schritte-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Von der Challenge in die Tiefe" hell />
          <h2 id="schritte-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Deine sieben Schritte.</h2>
          <p className="mt-4 max-w-2xl font-inter text-[17px] leading-relaxed text-midnight-blue/85">
            Jeder Schritt bringt dich näher an deinen souveränen Auftritt. Und aus jedem nimmst du etwas Konkretes mit.
          </p>
          <div className="mt-10 grid items-start gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
            <Helix aktiv={aktiv} ys={sprossen.ys} hoehe={sprossen.h} />
            <ol ref={schritteRef} className="grid min-w-0 list-none content-start gap-4 p-0">
              {SCHRITTE.map((s, k) => (
                <li key={s.nr} data-schritt={k} style={{ ['--i' as string]: k % 2 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL} ${k === aktiv ? 'border-[#C9A961] shadow-[0_18px_40px_-22px_rgba(201,169,97,0.75)]' : ''}`}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="gold-text-animated font-montserrat text-3xl font-extrabold leading-none sm:text-4xl">{s.nr}</span>
                    <h3 className="min-w-0 flex-1 font-montserrat text-lg font-extrabold leading-snug sm:text-xl">{s.titel}</h3>
                    <span className="whitespace-nowrap rounded-full border border-[#C9A961]/70 bg-pearl-white px-3.5 py-1.5 font-montserrat text-xs font-extrabold text-[#9A7B2F]">{s.datum}</span>
                  </div>
                  <p className="mt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90 sm:text-base">{s.text}</p>
                  <p className="mt-4 flex items-start gap-3 border-t border-[#C9A961]/35 pt-4 font-inter text-[15px] leading-relaxed text-midnight-blue/90">
                    <Haken /><span><b className="font-montserrat font-extrabold text-midnight-blue">Du nimmst mit:</b> {s.mit}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Abschnitt>

      {/* Deine Begleitung zwischen den Terminen. */}
      <Abschnitt id="begleitung" className="bg-white py-16 text-midnight-blue sm:py-24" label="begleitung-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Zwischen den Terminen" hell />
          <h2 id="begleitung-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Du bleibst nicht allein. Deine Begleitung.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {BEGLEITUNG.map((b, k) => (
              <article key={b.titel} style={{ ['--i' as string]: k % 2 }} className={`cc-stufe p-6 sm:p-7 ${b.stern ? 'relative overflow-hidden rounded-[10px] border-2 border-[#C9A961] bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] shadow-[0_24px_50px_-30px_rgba(201,169,97,0.9)] md:col-span-2' : `bg-white ${KACHEL}`}`}>
                {b.stern && <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.9),rgba(247,231,206,0)_70%)]" />}
                <div className="relative">
                  {b.stern && <span className="inline-block rounded-md border border-[#C9A961] px-3 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.18em] text-[#9A7B2F]">Dein Höhepunkt zum Abschluss</span>}
                  <h3 className={`font-montserrat font-extrabold leading-snug ${b.stern ? 'mt-3 text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{b.titel}</h3>
                  <p className="mt-2 font-inter text-[15px] leading-relaxed text-midnight-blue/85 sm:text-base">{b.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Fuer wen ist die Masterclass. */}
      <Abschnitt id="fuer-wen" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="fuer-wen-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Für wen ist die Masterclass?" hell />
          <h2 id="fuer-wen-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Für alle, die gespürt haben: <span className="text-[#9A7B2F]">Da steckt mehr in mir.</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Für dich', 'Für Selbstständige, Coaches und Unternehmerinnen, die sich zeigen wollen, ohne sich zu verbiegen. Und die jetzt dranbleiben wollen, mit Begleitung statt allein.'],
              ['Was du nicht brauchst', 'Keine Technik-Kenntnisse, kein Studio und kein perfektes Video. Dein Handy und den Mut aus der Challenge hast du schon.'],
              ['Live und persönlich', 'Alle Termine laufen live per Zoom, ohne Aufzeichnung. Darum sind die Gruppen klein, und jede und jeder kommt dran.'],
            ].map(([t, x], k) => (
              <article key={t} style={{ ['--i' as string]: k % 3 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL}`}>
                <h3 className="font-montserrat text-lg font-extrabold leading-snug">{t}</h3>
                <p className="mt-3 font-inter text-[15px] leading-relaxed text-midnight-blue/85">{x}</p>
              </article>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Persoenlich von Claudia (Zitat wortgleich aus dem Dokument) + Trainerin. */}
      <Abschnitt className="bg-white py-16 text-midnight-blue sm:py-24" label="trainerin">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-[14px] shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]">
            <img src="/a27/p/ueber-claudia/erfahrung.webp" alt="Claudia Conen im dunkelblauen Blazer, lächelnd" width={900} height={1350} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
          </figure>
          <div className="min-w-0">
            <Kicker text="Persönlich von Claudia" hell />
            <h2 id="trainerin" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Claudia Conen</h2>
            <blockquote className="mt-6 border-l-4 border-[#C9A961] pl-5 font-cormorant text-[1.6rem] italic leading-snug text-midnight-blue sm:text-[1.9rem]">
              „{CLAUDIA_ZITAT}"
            </blockquote>
            <a href="/ueber-mich" className="mt-8 inline-flex items-center font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Mehr über Claudia – die Umsatzstimme →</a>
          </div>
        </div>
      </Abschnitt>

      {/* Kundenstimmen: echte Stimmen wie auf /challenge (woertlich, mit Foto). */}
      <StimmenKarten />

      {/* KI-Agent: in der Masterclass gezeigt, separat im Abo (kein Gratis-Bonus, 28.10.2026). */}
      <Abschnitt id="bonus" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="bonus-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[20px] border-2 border-[#C9A961] bg-white p-7 shadow-[0_30px_60px_-36px_rgba(201,169,97,0.9)] sm:p-10">
            <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.95),rgba(247,231,206,0)_70%)]" />
            <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
              <div className="min-w-0">
                <span className="inline-block rounded-md border border-[#C9A961] px-3 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.18em] text-[#9A7B2F]">Einblick in der Masterclass</span>
                <h2 id="bonus-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight">Der KI-Agent für die Hosentasche</h2>
                <p className="mt-2 font-cormorant text-2xl italic text-[#9A7B2F]">Social Media mit Leichtigkeit gestalten</p>
                <p className="mt-5 font-inter text-[17px] leading-relaxed text-midnight-blue/90">In der Masterclass zeige ich dir, wie der KI-Agent dir den Alltag im Business erleichtert. Entdecke, wie du KI als persönlichen Assistenten nutzen kannst, um deine Sichtbarkeit einfacher und effizienter zu gestalten – ohne dabei deine eigene Stimme und Authentizität zu verlieren.</p>
              </div>
              <div className="min-w-0">
                <ul className="grid list-none gap-2.5 p-0">
                  {KI_AGENT.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed"><Haken /><span>{b}</span></li>
                  ))}
                </ul>
                <p className="mt-6 border-l-4 border-[#C9A961] bg-pearl-white px-4 py-3 font-inter text-[15px] leading-relaxed">
                  <b className="font-montserrat font-extrabold">Dein Vorteil:</b> Mit dem KI-Agenten musst du nicht jedes Mal bei null anfangen. Du hast einen digitalen Sparringspartner an deiner Seite, der dich dabei unterstützt, deine Expertise sichtbar zu machen.
                </p>
                <p className="mt-4 font-inter text-sm leading-relaxed text-midnight-blue/75">
                  <b className="font-montserrat font-bold text-midnight-blue">Gut zu wissen:</b> Der KI-Agent ist nicht im Preis der Masterclass enthalten. Du bekommst ihn separat im Monats- oder Jahresabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Das Wichtigste auf einen Blick + Anmeldung (Verkaufs-Block). */}
      <Abschnitt id="anmeldung" className="bg-white py-16 text-midnight-blue sm:py-24" label="anmeldung-titel">
        <div ref={anmeldungRef} className="mx-auto max-w-4xl px-6">
          <div className="rounded-[22px] border border-[#C9A961]/70 bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] p-7 text-center shadow-[0_30px_70px_-40px_rgba(19,35,63,0.55)] sm:p-12">
            <div className="flex justify-center"><Kicker text="Das Wichtigste auf einen Blick" hell /></div>
            <h2 id="anmeldung-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="gold-text-animated">UNVERWECHSELBAR</span><br />Die Masterclass
            </h2>
            <ul className="mx-auto mt-8 grid max-w-2xl list-none gap-2.5 p-0 text-left">
              {BLICK.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-[12px] border border-[#13233F]/10 bg-white px-4 py-3 font-inter text-[15px] leading-relaxed text-midnight-blue/90"><Haken /><span>{b}</span></li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="gold-text-animated font-montserrat text-5xl font-extrabold sm:text-6xl">{EURO(REGULAER)}</p>
              <p className="mt-2 font-inter text-sm text-midnight-blue/75">zzgl. MwSt. · {BRUTTO(REGULAER)} inkl. MwSt. · Ratenzahlung über Klarna möglich</p>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a href={KAUF_LINK} className={KNOPF}>Platz sichern →</a>
              <a href={GESPRAECH} className="font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Lieber erst sprechen? 15 Minuten kennenlernen</a>
            </div>
            <p className="mt-4 font-inter text-sm text-midnight-blue/75">Sichere Bezahlung über Stripe.</p>
            <p className="mt-2 font-inter text-sm text-midnight-blue/60">Du hast einen Gutscheincode? Den kannst du im nächsten Schritt im Bezahlfenster eingeben.</p>
            <p className="mt-6 font-inter text-[15px] text-midnight-blue/80">
              Du hast Fragen? <a href="tel:+4916093102073" className="font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Dann ruf mich an.</a>
            </p>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-montserrat text-xl font-extrabold leading-relaxed sm:text-2xl">
            Du musst nicht werden wie andere. <span className="text-[#9A7B2F]">Entdecke, was dich ausmacht, und bring es wirkungsvoll zum Ausdruck.</span>
          </p>
        </div>
      </Abschnitt>

      {/* Haeufige Fragen. */}
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
            <a href="#anmeldung" className={KNOPF}>Platz sichern →</a>
          </div>
        </div>
      </Abschnitt>

      {/* Mitlaufende Verkaufs-Leiste (erscheint nach dem Kopf, verschwindet in der Anmeldung). */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#C9A961]/50 bg-white/95 backdrop-blur transition-transform duration-300 ${leiste ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-montserrat text-sm font-extrabold text-midnight-blue sm:text-base">UNVERWECHSELBAR · ab {START_LABEL.replace('Donnerstag, ', '')}</p>
            <p className="truncate font-inter text-xs text-midnight-blue/70 sm:text-[13px]">{EURO(REGULAER)} zzgl. MwSt. · Ratenzahlung möglich · höchstens 9 Plätze</p>
          </div>
          <a href="#anmeldung" className={`${GOLD} inline-flex flex-none items-center gap-2 rounded-full px-5 py-3 font-montserrat text-sm font-extrabold text-midnight-blue shadow-[0_8px_18px_-10px_rgba(19,35,63,0.5)] sm:px-7 sm:text-base`}>Platz sichern →</a>
        </div>
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
  );
}
