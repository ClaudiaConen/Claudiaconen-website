import { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import LogoBand from '../components/LogoBand';
import Stimmwelle from '../components/Stimmwelle';

/**
 * Elevator-Pitch – Online-Selbstlernkurs (Verkaufsseite). Umbau der alten /elevator-pitch-kurs-Seite ins
 * Marken-Design (Mitternacht + Gold, wie die Masterclass). Texte WORTGLEICH aus Claudias bestehender
 * Verkaufsseite (Screenshots, 01.11.2026) + aus dem echten Kurs in der Plattform (Kursbeschreibung, Module).
 * NICHTS erfunden.
 *
 * Kleine, gekennzeichnete Korrekturen (Produktname statt „Speaker-Ausbildung", weil es der Elevator-Pitch-Kurs
 * ist): siehe KURS_LERNST + ERWARTET_INTRO.
 *
 * Header-Video: Vimeo 150929970 (Link vom Auftraggeber). Preis 249 €. Reiner Selbstlernkurs im Mitgliederbereich.
 * OFFEN: Stripe-Kauf-Link (KAUF_LINK) + optional längere Claudia-Bio („Vollblut-Experte").
 */

const PFAD = '/elevator-pitch-kurs';
const VIMEO = 'https://player.vimeo.com/video/150929970';
const PREIS = 249;
const EURO = (n: number) => n.toLocaleString('de-DE') + ' €';

/** OFFEN: Stripe-Zahlungslink des Auftraggebers hier eintragen. Solange leer, führt der Knopf zum #kaufen-Block. */
const KAUF_LINK = '';
const MEMBER_LOGIN = '/member/login';

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
const KNOPF = `inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-5 font-montserrat text-base font-extrabold text-midnight-blue shadow-[0_10px_24px_-12px_rgba(19,35,63,0.45)] transition-transform hover:-translate-y-px sm:text-lg ${GOLD}`;

/** Intro – wortgleich aus der bestehenden Verkaufsseite (Screenshot). */
const INTRO = `Stell dir vor, du betrittst einen Raum und fesselst sofort die Aufmerksamkeit deines Publikums. Ihre Augen leuchten vor Neugier, und sie können es kaum erwarten, mehr über dein Produkt oder deine Dienstleistung zu erfahren. Ob online oder live, was wäre, wenn du die Geheimnisse entdecken könntest, um genau das zu erreichen?

In diesem Abschnitt unseres Kurses erfährst du, wie du das Gehirn deiner Zuhörer aktivieren und ihre Neugier wecken kannst – eine Fähigkeit, die deine Präsentationen unvergesslich machen wird.`;

/** „Elevator-Pitch – Online-Kurs" – wortgleich aus der Verkaufsseite (Screenshot). */
const ONLINE_EINLEITUNG = `Entdecke, wie du als selbstständiger Unternehmer, Coach oder Trainer die Tür zum menschlichen Gehirn öffnest und die richtigen Emotionen weckst, um dein Business auf das nächste Level zu heben.`;
const NEURO = `Menschen handeln und kaufen aufgrund von Emotionen. Deine Stimme und Persönlichkeit sind der Schlüssel, um blitzschnell das emotionale Zentrum – das limbische System – deiner Kunden zu erreichen.`;
// Korrektur „Mit einer Speaker-Ausbildung lernst du:" -> „In diesem Kurs lernst du:" (es ist der Elevator-Pitch-Kurs)
const KURS_LERNST = `deine Botschaft authentisch und überzeugend zu präsentieren, sodass du nicht nur Produkte, sondern emotionale Erfahrungen verkaufst. Nutze die Macht deiner Stimme, um eine unvergleichliche Verbindung zu deinem Publikum herzustellen und deine Vision, dein Produkt oder deine Dienstleistung erfolgreich zu teilen. Entdecke, wie du mit Glaubwürdigkeit und Authentizität überzeugst und deine Persönlichkeit als dein stärkstes Werkzeug einsetzt. Sei bereit, die Herzen deines Publikums zu erobern und Türen zu neuen Möglichkeiten aufzustoßen. Nutze die Chance, durch deine hörbare, authentische Persönlichkeit Verbindungen aufzubauen, die weit über eine bloße Verkaufspräsentation hinausgehen. Steigere deinen Erfolg als selbstständiger Unternehmer, Coach oder Trainer mit der unvergleichlichen Kraft deiner Stimme. Verankere dich fest in deinem Publikum.`;

/** „Was erwartet dich genau?" – wortgleich aus der Verkaufsseite (Screenshot). */
const ERWARTET_INTRO = `Tauche ein in eine Welt, in der deine Worte die Macht besitzen, Realitäten zu formen und Herzen zu erobern. Mit diesem Kurs steht dir eine Tür offen, hinter der sich unendliche Möglichkeiten verbergen.`;
const ERWARTET_PUNKTE = [
  'Du wirst nicht nur lernen, mit Leichtigkeit und Überzeugungskraft zu sprechen, sondern auch die Geheimnisse zu entdecken, die hinter wahrhaft mitreißender und einflussreicher Rhetorik stecken.',
  'Bereite dich darauf vor, die Kunst des Sprechens zu meistern, und werde zu dem Sprecher, der du schon immer sein wolltest – charismatisch, wirkungsvoll und unvergesslich.',
  'Jede Sitzung, jedes Modul dieses Kurses ist sorgfältig darauf ausgerichtet, dich auf die nächste Stufe deiner sprecherischen Fähigkeiten zu heben.',
  'Deine Investition in diesen Kurs ist eine Investition in dich selbst und in deine Zukunft, in der du die Fähigkeit besitzt, jedes Publikum zu fesseln und zu beeindrucken.',
  'Erwarte intensive Trainingseinheiten, persönliches Feedback ist empfehlenswert und optional, sowie Techniken, die dich von anderen abheben werden.',
];

/** Kursinhalt – Modultitel wortgleich aus dem echten Kurs in der Plattform (Reihenfolge wie dort). */
const MODULE = [
  'Kernproblem erkennen',
  'Wecke Emotionen',
  'Entwickle einen Plan',
  'Warum du?',
  'Nutze Storytelling',
  'Formuliere die Lösung',
  'Rede wirkungsvoll',
];
/** Kursbeschreibung wortgleich aus der Plattform. */
const KURS_BESCHREIBUNG = `In diesem Kurs lernst du, wie du mit wenigen Sätzen begeisterst und in Erinnerung bleibst. Auf Basis von Erkenntnissen aus der Neurowissenschaft entwickelst du Schritt für Schritt deinen eigenen Elevator-Pitch – von der Kernbotschaft über die passende Struktur bis zur wirkungsvollen Stimme. Zu den Lektionen gehören Arbeitsbücher zum Download.`;

/** Claudia-Bio – echte, bereits veröffentlichte Texte der Website (Über-mich / Footer / Masterclass). */
const BIO = [
  'Claudia Conen ist Expertin für menschliche Wirkungskraft. Mein ganzes Leben lang beschäftige ich mich damit, dass manche Menschen eine Wirkungskraft haben, die unvergesslich ist, und andere nicht.',
  'Rhetorik, Storytelling, Präsentation und der Auftritt vor der Kamera – seit 37 Jahren. Bekannt als „die Umsatzstimme".',
  'Und das habe ich zu meinem Beruf gemacht und darum begleite ich dich.',
];

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#C9A961]'}`}>
      <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

function useEinblenden() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('da'); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { el.classList.add('da'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 opacity-[0.16]"><Stimmwelle /></div>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#C9A961]" />;
}

function Absaetze({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className={className}>{p}</p>
      ))}
    </>
  );
}

export default function ElevatorPitchKurs() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Mitlaufender Kauf-Knopf: erscheint nach dem Kopf, verschwindet bei Kauf-Block oder Footer (verdeckt nichts).
  const [leiste, setLeiste] = useState(false);
  const ankerRef = useRef<HTMLDivElement>(null);
  const kaufenRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anker = ankerRef.current, kaufen = kaufenRef.current, footer = footerRef.current;
    if (!anker || !kaufen || !footer) return;
    let hinterKopf = false, inKaufen = false, inFooter = false;
    const upd = () => setLeiste(hinterKopf && !inKaufen && !inFooter);
    const io1 = new IntersectionObserver(([e]) => { hinterKopf = !e.isIntersecting; upd(); });
    const io2 = new IntersectionObserver(([e]) => { inKaufen = e.isIntersecting; upd(); }, { rootMargin: '0px 0px -20% 0px' });
    const io3 = new IntersectionObserver(([e]) => { inFooter = e.isIntersecting; upd(); });
    io1.observe(anker); io2.observe(kaufen); io3.observe(footer);
    return () => { io1.disconnect(); io2.disconnect(); io3.disconnect(); };
  }, []);

  const kurz = 'Elevator-Pitch – „Die Macht der Sekunde": der Online-Selbstlernkurs von Claudia Conen. Auf Basis der Neurowissenschaft entwickelst du Schritt für Schritt deinen eigenen Elevator-Pitch – mit Arbeitsbüchern, jederzeit im Mitgliederbereich.';
  const strukturierteDaten = {
    '@context': 'https://schema.org', '@type': 'Course',
    name: 'Elevator-Pitch – Die Macht der Sekunde',
    description: kurz,
    provider: { '@type': 'Person', name: 'Claudia Conen', url: 'https://claudiaconen.com/ueber-mich' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    offers: { '@type': 'Offer', price: String(PREIS), priceCurrency: 'EUR' },
    url: `https://claudiaconen.com${PFAD}`,
  };

  const kaufHref = KAUF_LINK || '#kaufen';

  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO title="Elevator-Pitch-Kurs – Die Macht der Sekunde | Claudia Conen" description={kurz} path={PFAD} ogImage="https://claudiaconen.com/seiten/mikrofon.webp" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation hell />

      {/* Kopf: links Text, rechts das Vimeo-Video. */}
      <header className="relative overflow-hidden bg-pearl-white pt-28 pb-14 sm:pt-32 sm:pb-20">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(247,231,206,0.9),rgba(247,231,206,0)_65%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-8 text-midnight-blue/70"><Brotkrumen krumen={[{ name: 'Elevator-Pitch-Kurs' }]} /></div>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-12">
            <div className="min-w-0 text-midnight-blue">
              <span aria-hidden="true" className={`block h-[3px] w-16 rounded-full ${GOLD}`} />
              <p className="mt-5 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] sm:text-sm">Online-Selbstlernkurs</p>
              <h1 className="mt-4 font-montserrat font-extrabold tracking-tight text-midnight-blue">
                <span className="block text-3xl leading-tight sm:text-5xl">Elevator-Pitch</span>
                <span className="gold-text-animated mt-2 block text-2xl leading-tight sm:text-[2.1rem]">„Die Macht der Sekunde"</span>
              </h1>
              <p className="mt-6 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-[1.9rem]">
                „Worte sind die mächtigste Droge, die die Menschheit benutzt."
              </p>
              <p className="mt-1 font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#9A7B2F]">Rudyard Kipling</p>

              {/* Video auf dem Smartphone direkt unter der Headline */}
              <div className="mt-8 lg:hidden">
                <div className="relative overflow-hidden rounded-[14px] border border-[#C9A961]/50 shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]" style={{ aspectRatio: '16 / 9' }}>
                  <iframe src={VIMEO} title="Elevator-Pitch – Die Macht der Sekunde" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href={kaufHref} className={KNOPF}>Jetzt Zugang sichern – {EURO(PREIS)} →</a>
                <a href="#inhalt" className="font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Kursinhalt ansehen</a>
              </div>
              <p className="mt-5 font-inter text-sm text-midnight-blue/70">Reiner Selbstlernkurs · 9 Module · 87 Lektionen · Arbeitsbücher zum Download · jederzeit im Mitgliederbereich</p>
            </div>

            <figure className="relative mx-auto hidden w-full lg:block">
              <span aria-hidden="true" className="absolute -inset-3 rounded-[20px] border border-[#C9A961]/40" />
              <div className="relative overflow-hidden rounded-[14px] border border-[#C9A961]/50 shadow-[0_30px_60px_-30px_rgba(19,35,63,0.65)]" style={{ aspectRatio: '16 / 9' }}>
                <iframe src={VIMEO} title="Elevator-Pitch – Die Macht der Sekunde" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            </figure>
          </div>
        </div>
      </header>
      <div ref={ankerRef} aria-hidden="true" />

      <LogoBand />

      {/* Intro. */}
      <Abschnitt id="worum" className="bg-white py-16 text-midnight-blue sm:py-24" label="worum-titel">
        <div className="mx-auto max-w-4xl px-6">
          <Kicker text="Worum es geht" hell />
          <h2 id="worum-titel" className="mt-6 font-montserrat text-[1.75rem] font-bold leading-[1.3] sm:text-[2.3rem] sm:leading-[1.25]">
            Fessle dein Publikum – ab der ersten Sekunde.
          </h2>
          <div className="mt-8 grid gap-6 font-inter text-[17px] leading-[1.8] text-midnight-blue/85">
            <Absaetze text={INTRO} />
          </div>
        </div>
      </Abschnitt>

      {/* Online-Kurs + Neurowissenschaft (dunkles Band). */}
      <Abschnitt className="bg-[#13233F] py-16 text-pearl-white sm:py-24" label="online-titel" welle>
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex justify-center"><Kicker text="Elevator-Pitch · Online-Kurs" /></div>
          <h2 id="online-titel" className="cc-zeile mt-5 text-center font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl" style={{ ['--z' as string]: 0 }}>
            Die Tür zum <span className="text-[#E6CC8F]">menschlichen Gehirn.</span>
          </h2>
          <p className="cc-zeile mx-auto mt-6 max-w-3xl text-center font-inter text-lg leading-relaxed text-pearl-white/85" style={{ ['--z' as string]: 1 }}>{ONLINE_EINLEITUNG}</p>
          <div className="mt-10 rounded-[16px] border border-[#C9A961]/40 bg-white/[0.05] p-6 sm:p-8">
            <p className="font-montserrat text-sm font-extrabold uppercase tracking-[0.2em] text-[#E6CC8F]">Die Neurowissenschaft hat bewiesen</p>
            <p className="mt-3 font-inter text-lg leading-relaxed text-pearl-white/90">{NEURO}</p>
          </div>
          <p className="mt-8 font-montserrat text-base font-extrabold text-[#E6CC8F]">In diesem Kurs lernst du:</p>
          <p className="mt-3 font-inter text-[17px] leading-[1.8] text-pearl-white/85">{KURS_LERNST}</p>
          <div className="mt-9 text-center"><a href={kaufHref} className={KNOPF}>Jetzt Zugang sichern – {EURO(PREIS)} →</a></div>
        </div>
      </Abschnitt>

      {/* Was erwartet dich genau? */}
      <Abschnitt className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="erwartet-titel">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker text="Was erwartet dich genau?" hell />
          <h2 id="erwartet-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Deine Worte formen Realitäten.</h2>
          <p className="mt-5 max-w-3xl font-inter text-[17px] leading-relaxed text-midnight-blue/85">{ERWARTET_INTRO}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ERWARTET_PUNKTE.map((p, k) => (
              <div key={k} style={{ ['--i' as string]: k % 2 }} className={`cc-stufe flex items-start gap-3 bg-white p-6 ${KACHEL}`}>
                <Haken /><p className="font-inter text-[15px] leading-relaxed text-midnight-blue/90">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Kursinhalt – echte Module aus der Plattform. */}
      <Abschnitt id="inhalt" className="bg-white py-16 text-midnight-blue sm:py-24" label="inhalt-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Das lernst du Schritt für Schritt" hell />
          <h2 id="inhalt-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Dein Weg zum eigenen Elevator-Pitch.</h2>
          <p className="mt-4 max-w-3xl font-inter text-[17px] leading-relaxed text-midnight-blue/85">{KURS_BESCHREIBUNG}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODULE.map((m, k) => (
              <article key={m} style={{ ['--i' as string]: k % 3 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL}`}>
                <span className="gold-text-animated font-montserrat text-3xl font-extrabold leading-none">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-montserrat text-lg font-extrabold leading-snug">{m}</h3>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[['9 Module', 'klar aufeinander aufgebaut'], ['87 Lektionen', 'Videos & Übungen'], ['Arbeitsbücher', 'zum Download je Lektion']].map(([t, u]) => (
              <div key={t} className="rounded-[12px] border border-[#13233F]/10 bg-pearl-white px-5 py-4 text-center">
                <p className="gold-text-animated font-montserrat text-xl font-extrabold">{t}</p>
                <p className="mt-1 font-inter text-sm text-midnight-blue/70">{u}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-inter text-[15px] text-midnight-blue/70">Dazu: ein Begrüßungs-Modul und Aufzeichnungen von Live-Webinaren zum Thema Elevator-Pitch.</p>
        </div>
      </Abschnitt>

      {/* Reiner Selbstlernkurs. */}
      <Abschnitt className="bg-[#13233F] py-14 text-pearl-white sm:py-20" label="selbst-titel">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex justify-center"><Kicker text="So funktioniert's" /></div>
          <h2 id="selbst-titel" className="mt-5 font-montserrat text-2xl font-extrabold leading-tight sm:text-3xl">Ein reiner Selbstlernkurs – <span className="text-[#E6CC8F]">in deinem Tempo.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/85">
            Nach dem Kauf bekommst du deinen Zugang zum Mitgliederbereich. Dort lernst du jederzeit und in deinem eigenen Tempo – Modul für Modul, mit Videos und Arbeitsbüchern zum Download.
          </p>
        </div>
      </Abschnitt>

      {/* Wer ist Claudia. */}
      <Abschnitt className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="claudia-titel">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-[14px] shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]">
            <img src="/a27/p/ueber-claudia/erfahrung.webp" alt="Claudia Conen, lächelnd" width={900} height={1350} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
          </figure>
          <div className="min-w-0">
            <Kicker text="Wer ist Claudia?" hell />
            <h2 id="claudia-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Claudia Conen</h2>
            <div className="mt-6 grid gap-4 font-inter text-lg leading-relaxed text-midnight-blue">
              {BIO.map((b, i) => <p key={i} className={i === BIO.length - 1 ? 'font-semibold' : ''}>{b}</p>)}
            </div>
            <a href="/ueber-mich" className="mt-8 inline-flex items-center font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">Mehr über Claudia →</a>
          </div>
        </div>
      </Abschnitt>

      {/* Kauf. */}
      <Abschnitt id="kaufen" className="bg-white py-16 text-midnight-blue sm:py-24" label="kaufen-titel">
        <div ref={kaufenRef} className="mx-auto max-w-4xl px-6">
          <div className="rounded-[22px] border border-[#C9A961]/70 bg-[linear-gradient(180deg,#FFFFFF,#FBF7EE)] p-7 text-center shadow-[0_30px_70px_-40px_rgba(19,35,63,0.55)] sm:p-12">
            <div className="flex justify-center"><Kicker text="Dein Zugang" hell /></div>
            <h2 id="kaufen-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Elevator-Pitch – <span className="gold-text-animated">Die Macht der Sekunde</span></h2>
            <ul className="mx-auto mt-8 grid max-w-2xl list-none gap-2.5 p-0 text-left">
              {['9 Module, 87 Lektionen – klar aufeinander aufgebaut', 'Arbeitsbücher zum Download zu den Lektionen', 'Reiner Selbstlernkurs – jederzeit im Mitgliederbereich, in deinem Tempo'].map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-[12px] border border-[#13233F]/10 bg-white px-4 py-3 font-inter text-[15px] leading-relaxed text-midnight-blue/90"><Haken /><span>{b}</span></li>
              ))}
            </ul>
            <p className="mt-8 gold-text-animated font-montserrat text-5xl font-extrabold sm:text-6xl">{EURO(PREIS)}</p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a href={kaufHref} className={KNOPF}>Jetzt kaufen – {EURO(PREIS)} →</a>
            </div>
            <p className="mt-4 font-inter text-sm text-midnight-blue/75">Sichere Bezahlung über Stripe.</p>
            <p className="mt-2 font-inter text-sm text-midnight-blue/60">Nach dem Kauf erhältst du deine Zugangsdaten per E-Mail und loggst dich im <a href={MEMBER_LOGIN} className="font-semibold underline decoration-[#C9A961] decoration-2 underline-offset-4">Mitgliederbereich</a> ein.</p>
          </div>
        </div>
      </Abschnitt>

      {/* Mitlaufende Kauf-Leiste. */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#C9A961]/50 bg-white/95 backdrop-blur transition-transform duration-300 ${leiste ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-montserrat text-sm font-extrabold text-midnight-blue sm:text-base">Elevator-Pitch – Die Macht der Sekunde</p>
            <p className="truncate font-inter text-xs text-midnight-blue/70 sm:text-[13px]">Online-Selbstlernkurs · {EURO(PREIS)}</p>
          </div>
          <a href={kaufHref} className={`${GOLD} inline-flex flex-none items-center gap-2 rounded-full px-5 py-3 font-montserrat text-sm font-extrabold text-midnight-blue shadow-[0_8px_18px_-10px_rgba(19,35,63,0.5)] sm:px-7 sm:text-base`}>Zugang sichern →</a>
        </div>
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
  );
}
