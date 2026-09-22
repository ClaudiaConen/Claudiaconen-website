import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import WorkbookBlaettern from '../components/WorkbookBlaettern';
import Stimmwelle from '../components/Stimmwelle';

/**
 * Landingpage "Unverwechselbar DU" - ein Produkt, eine Seite.
 *
 * Claudias Auftrag in der Nacht zum 22.09.2026: die Inhalte ihres Event-Flyers
 * "UNVERWECHSELBAR DU" (Fotos: projects/claudiaconen/ablage/eingang-2026-09-22/12+13)
 * zu einem Produkt und einer Landingpage machen. Vorschau:
 * https://claude.ai/artifact/4EkPsitMU5faoaaMppRioM
 *
 * Aus dem Flyer uebernommen: Titelseite (Ankreuzliste ChatGPT), "Dein KI-Agent ist
 * effizient. Und du?", Selbst-Check "So bleibst du unverwechselbar", die sieben Kacheln,
 * "Mein Geschenk fuer deine Wirkung", "Willst du dich speichern?".
 *
 * BEWUSST WEGGELASSEN (Pruefbefund an Claudia, 22.09.2026 01:50 UTC):
 *  - "180 ms", "60.000-mal schneller", "70.000 Eindruecke / 70": nicht belegbar, von der
 *    Webseite am 18./19.09. entfernt - hier ohne Zahl formuliert.
 *  - "Die 7 A's nach Karsten Brocke": ihr Produktdokument verbietet die Nennung.
 *  - Ihre Geschichte (5 akustische Fingerabdruecke) steht auf dem Flyer neben dem Angebot;
 *    ihre Regel: nie direkt vor einem Verkaufsangebot -> hier nur der Verweis auf "Ueber mich".
 *
 * OFFEN, bis Claudia es festlegt (kein Preis auf der Seite, den sie nicht genannt hat):
 *  Preis, Format und Termin des bezahlten Programms -> ANGEBOT.preis/format/termin.
 *  Solange die Felder leer sind, zeigt die Seite "auf Anfrage" und keinen Preis.
 *
 * Gestaltung nach DESIGN_PRAEFERENZEN.md: deckende Flaechen, harte Kanten, Community-Gold
 * (#D4AF37 / #F7E7CE / #C9A961), Gold nie als Schrift auf Hell, Kacheln mit Goldrand.
 */

const PFAD = '/unverwechselbar-du';

/** Das legt Claudia fest. Leere Felder = "auf Anfrage". */
const ANGEBOT = {
  preis: '' as string, // z. B. '690 €'
  format: '' as string, // z. B. 'Ein Tag in kleiner Runde, 6 bis 8 Personen'
};

/** Termine des Programms als ISO-Datum. Die Seite zeigt nur den naechsten, der noch in der Zukunft
 *  liegt; vergangene verschwinden von selbst - Claudias Sorge vom 22.09.2026 ("wenn es abgelaufen
 *  ist ... dann ist man wieder nicht aktuell"). Leer = "Naechster Termin auf Anfrage". */
const TERMINE: string[] = []; // z. B. ['2026-10-18']

const DATUM = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

function naechsterTermin(heute: Date): string | null {
  const start = new Date(heute); start.setHours(0, 0, 0, 0);
  const next = TERMINE.map((s) => new Date(s)).filter((d) => d >= start).sort((a, b) => a.getTime() - b.getTime())[0];
  return next ? DATUM.format(next) : null;
}

/** Die Challenge startet immer montags - der naechste Montag wird berechnet, nie eingetragen. */
function naechsterMontag(heute: Date): string {
  const d = new Date(heute);
  const tage = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + tage);
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' }).format(d);
}

const KREUZE = [
  'ChatGPT für schnelle Antworten',
  'ChatGPT für kreative Ideen',
  'ChatGPT ist immer verfügbar',
  'ChatGPT urteilt nicht',
  'ChatGPT hört immer zu',
  'ChatGPT kostet nichts',
];

const KI_GRUENDE: { titel: string; text: string }[] = [
  { titel: 'Keine Bewertung.', text: 'Der Avatar urteilt nicht. Nie.' },
  { titel: 'Keine Peinlichkeit.', text: 'Du kannst „dumme Fragen" stellen – ohne Scham.' },
  { titel: 'Sofortige Reaktion.', text: 'Der Avatar antwortet schnell, ohne zu zögern.' },
  { titel: 'Immer verfügbar.', text: '24/7 erreichbar. Kein Termin nötig.' },
  { titel: 'Kein Smalltalk. Kein Drama.', text: 'Der Avatar bleibt bei der Sache.' },
  { titel: 'Keine Körpersprache. Keine Unsicherheit.', text: 'Kein Flackern der Augen, keine nervöse Haltung.' },
  { titel: 'Optimierte Freundlichkeit.', text: 'Avatare sind höflich, geduldig, nie genervt.' },
  { titel: 'Datenspeicher statt Emotionen.', text: 'Der Avatar „weiß", was du vorher gesagt hast. Er vergisst nicht. Und er verzeiht sofort.' },
  { titel: 'Individuelle Anpassung.', text: 'Der Avatar klingt so, wie du es möchtest: ruhig, motivierend, sachlich, warm.' },
  { titel: 'Keine Geschichte. Kein Ego.', text: 'Der Avatar bringt kein Gepäck mit. Kein Stolz, keine Verletzlichkeit – nur Funktion.' },
];

const DU_ANTWORTEN: { titel: string; text: string }[] = [
  { titel: 'KI perfektioniert.', text: 'Persönlichkeit verankert.' },
  { titel: 'Tempo durch Technik.', text: 'Vertrauen durch dich.' },
  { titel: 'Der Mensch ist das Unikat.', text: 'KI ist der Beschleuniger.' },
  { titel: 'Wir Menschen haben keine Reset-Taste.', text: 'Was wir sagen und tun, kann sich bei anderen verankern.' },
];

const FRAGEN: { frage: string; text: string }[] = [
  { frage: 'Kennst du deine Berufung?', text: 'Und kannst du daraus echte Storys formen, die im Gedächtnis bleiben?' },
  { frage: 'Weißt du, wie das Gehirn Entscheidungen trifft?', text: 'Und wie du dich dort verankern kannst?' },
  { frage: 'Kannst du blitzschnell Emotionen wecken?', text: 'Und deine Botschaft fühlbar machen?' },
  { frage: 'Nutzt du deine Stimme bewusst?', text: 'Als eins der stärksten Marketinginstrumente, die Vertrauen schaffen und unaufhaltbar sind.' },
  { frage: 'Strahlst du Sicherheit aus?', text: 'So, dass andere sofort spüren: Bei dir bin ich richtig.' },
  { frage: 'Baust du Verbindung auf?', text: 'Von Mensch zu Mensch, statt nur Argument zu Argument.' },
  { frage: 'Bleibst du im Kopf deiner Zuhörer?', text: 'Weil du ihr Herz erreichst?' },
];

const SCHRITTE: { titel: string; text: string }[] = [
  { titel: 'Das Gehirn verstehen', text: 'Blitzschnell. Emotionen. Verstand. Wie Menschen entscheiden, bevor sie es merken – und was das für jeden deiner Sätze heißt.' },
  { titel: 'KI & Mensch – das Zusammenspiel', text: 'Perfektion klickt. Persönlichkeit bleibt. Was du der Technik gibst – und was du niemals abgibst.' },
  { titel: 'Essenz und Wirkung', text: 'Unverwechselbarkeit beginnt im Inneren. Was dich ausmacht, in einen Satz gebracht.' },
  { titel: 'Dein Kunde denkt in Bildern', text: 'Geschichten bleiben. Daten nicht. Wie du aus deiner Erfahrung Bilder machst, die man weitererzählt.' },
  { titel: 'Unaufhaltbar', text: 'Einzigartig. Unüberhörbar. Deine Stimme. Deine Wirkung. Das Zusammenspiel von Worten, Stimme und Haltung.' },
  { titel: 'Wirkung ist kein Zufall', text: 'Sie ist trainierbar. Sichtbar. Entscheidbar. Echt, unverwechselbar – nicht perfekt.' },
  { titel: 'Dein Kopf. Ihr Gefühl.', text: 'Wirkung beginnt im Inneren. Und bleibt im Kopf deiner Kunden. Der Schritt, in dem alles zusammenkommt.' },
];

const FAQ: { frage: string; antwort: string }[] = [
  {
    frage: 'Für wen ist das Programm?',
    antwort:
      'Für Menschen, die mit dem Reden Geld verdienen oder Verantwortung tragen: Unternehmer, Führungskräfte, Speaker, Coaches, Teams. Ob du auf einer Bühne stehst, im Meeting oder vor der Kamera – überall, wo jemand das Wort ergreift, beginnt die Bühne.',
  },
  {
    frage: 'Muss ich KI nutzen?',
    antwort:
      'Nein. Du lernst, was KI dir abnehmen kann und was nicht. Wer sie nutzen will, bekommt konkrete Handgriffe. Wer nicht, bleibt trotzdem unverwechselbar – darum geht es.',
  },
  {
    frage: 'Was, wenn ich Lampenfieber habe?',
    antwort: 'Dann bist du hier richtig. Lampenfieber ist kein Fehler, sondern Energie ohne Richtung. Im Programm bekommt sie eine.',
  },
  {
    frage: 'Was passiert nach dem Wirkungs-Check?',
    antwort: 'Nichts, was du nicht willst. Du bekommst drei Rückmeldungen und entscheidest selbst, ob du weitergehen möchtest.',
  },
];

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'rounded-[10px] border border-[#D4AF37]/55 transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]';
const DUNKEL = { background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' };
const WHATSAPP = 'https://wa.me/4916093102073';
/** Claudias Idee vom 22.09.2026, 02:13 UTC: vom Event per QR in eine Video-Challenge - sieben Tage,
 *  sieben Schritte, 60 Sekunden am Tag. Kanal: ihre WhatsApp-Gruppe "Video-Challenge" (Einladungslink
 *  von ihr am 22.09.2026, 02:20 UTC). Aendert sie den Link, hier tauschen. */
const CHALLENGE_LINK = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
/** Workbook "Entdecke deine Stimmwirkung" (Brainself-Buchauszug), korrigierte Fassung vom 22.09.2026
 *  (Aufgabe 18: keine Millisekunden-Zahl, kein "Opfer", 37 Jahre, Nachtblau). Blaettern: WorkbookBlaettern.tsx. */
const WORKBOOK_PDF = '/unverwechselbar/workbook-entdecke-deine-stimmwirkung.pdf';

const TAGE: { titel: string; aufgabe: string }[] = [
  { titel: 'Das Gehirn verstehen', aufgabe: 'Sag in 60 Sekunden, was du tust – ohne ein einziges Fachwort. So, dass es deine Nachbarin versteht.' },
  { titel: 'KI & Mensch', aufgabe: 'Lass dir von einer KI einen Satz über dich schreiben. Dann sag ihn so, wie du ihn wirklich sagen würdest. Nimm beides auf und hör den Unterschied.' },
  { titel: 'Essenz und Wirkung', aufgabe: 'Ein Satz: Wofür stehst du? Sag ihn dreimal – jedes Mal langsamer.' },
  { titel: 'Dein Kunde denkt in Bildern', aufgabe: 'Erzähl den Moment, in dem du wusstest: Das ist mein Beruf. Eine Person, ein Ort, ein Satz, der fiel.' },
  { titel: 'Unaufhaltbar', aufgabe: 'Wärm deine Stimme auf (Werkzeugkasten unten), dann dieselbe Aufnahme wie an Tag 1. Vergleich beide.' },
  { titel: 'Wirkung ist kein Zufall', aufgabe: 'Ein Satz, drei Absichten: einmal beruhigend, einmal weckend, einmal überzeugend. Dieselben Worte.' },
  { titel: 'Dein Kopf. Ihr Gefühl.', aufgabe: 'Dein Satz zum Mitnehmen – der eine, den du überall sagen kannst. Den schickst du mir. Du bekommst eine Antwort von mir, keine Vorlage.' },
];

const WERKZEUG: { titel: string; text: string }[] = [
  { titel: 'Stimme', text: 'Sprich zum letzten Stuhl im Raum – auch wenn nur das Handy vor dir steht. Ein Satz, eine Pause, der nächste Satz. Die Pause ist kein Loch, sie ist die Stelle, an der der Zuhörer nickt.' },
  { titel: 'Innere Haltung', text: 'Bevor du auf Aufnahme drückst: Wem erzählst du das? Stell dir einen Menschen vor, nicht ein Publikum. Die Kamera merkt, ob du jemanden meinst – und die Zuschauer merken es auch.' },
  { titel: 'Stimme aufwärmen', text: 'Zwei Minuten reichen. Summen auf „mmm", bis die Lippen kribbeln. Lippen flattern lassen wie ein Pferd. Dann drei Sätze laut lesen, übertrieben deutlich. Danach normal sprechen – es klingt sofort wacher.' },
  { titel: 'Storytelling', text: 'Fang mit dem Moment an, nicht mit der Vorgeschichte. Eine Person, ein Ort, etwas, das schiefging – und was du seitdem anders machst. Das ist eine Geschichte. Alles andere ist ein Bericht.' },
  { titel: 'Das Mikrofon', text: 'Das Handymikrofon nimmt den Raum auf, nicht dich. Ein Ansteckmikrofon fürs Handy – mit Kabel oder Funk, für wenig Geld – holt deine Stimme nach vorn. Gut soll sie klingen. Nicht perfekt. Perfekt ist der Avatar.' },
];

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#EBD197]'}`}>
      <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

/** Blendet einen Abschnitt beim Scrollen ein (Klassen cc-r / da in index.css). Ohne JavaScript
 *  oder mit "Bewegung reduzieren" ist alles sofort sichtbar. Ein Beobachter je Abschnitt, keine Bibliothek. */
function useEinblenden() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('da');
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.add('da');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** welle: eine hauchzarte Stimmwelle im Hintergrund (Claudia, 22.09.2026: "sanfte Schallwellen, die man kaum sieht");
 *  gold: leise wandernde Goldflecken hinter Glas-Kacheln ("mit dem bewegten Gold dahinter"). Beide reines CSS. */
function Abschnitt({ id, className, style, label, welle, gold, children }: { id?: string; className: string; style?: React.CSSProperties; label: string; welle?: boolean; gold?: boolean; children: React.ReactNode }) {
  const ref = useEinblenden();
  return (
    <section ref={ref} id={id} className={`cc-r ${gold ? 'cc-goldnebel' : ''} ${welle ? 'relative overflow-hidden' : ''} ${className}`} style={style} aria-labelledby={label}>
      {welle && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 opacity-[0.16]">
          <Stimmwelle />
        </div>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

/** Kleines Foto rechts neben der Ueberschrift eines Abschnitts - nie Text ueber einem riesigen Bild. */
function Kopfbild({ datei, alt, quer }: { datei: string; alt: string; quer?: boolean }) {
  return (
    <figure className={`m-0 overflow-hidden bg-[#13233F] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:justify-self-end ${KACHEL} ${quer ? 'aspect-[3/2] w-[clamp(220px,36vw,380px)]' : 'aspect-[9/16] w-[clamp(150px,22vw,210px)]'}`}>
      <img src={`/unverwechselbar/${datei}.webp`} alt={alt} width={quer ? 900 : 360} height={quer ? 600 : 640} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
    </figure>
  );
}
const KOPF = 'grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10';

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#D4AF37]" />;
}

export default function UnverwechselbarDu() {
  const [kreuze, setKreuze] = useState<boolean[]>(() => KREUZE.map(() => false));
  const [fragen, setFragen] = useState<boolean[]>(() => FRAGEN.map(() => false));
  const [buchOffen, setBuchOffen] = useState(false);
  const nKreuze = kreuze.filter(Boolean).length;
  const nFragen = fragen.filter(Boolean).length;
  // Sprungmarke aus der Adresse (z. B. /unverwechselbar-du#challenge vom Laufband der Startseite):
  // ScrollToTop springt bei jedem Seitenwechsel nach oben, deshalb hier nach dem Aufbau zum Ziel.
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, []);
  // Beim Vorrendern steht hier das Bau-Datum; im Browser rechnet React mit dem echten Tag neu.
  const heute = new Date();
  const montag = naechsterMontag(heute);
  const termin = naechsterTermin(heute);

  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Unverwechselbar DU – das Programm',
        description: 'Sieben Schritte zu unverwechselbarer persönlicher Wirkung: Rhetorik, Storytelling, Stimme und Haltung – mit und ohne KI.',
        serviceType: 'Training für persönliche Wirkung',
        areaServed: { '@type': 'Country', name: 'Deutschland' },
        provider: { '@type': 'Person', name: 'Claudia Conen', url: 'https://claudiaconen.com/' },
        url: `https://claudiaconen.com${PFAD}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.frage, acceptedAnswer: { '@type': 'Answer', text: f.antwort } })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Unverwechselbar DU – das Programm"
        description="Was hast du, was KI niemals haben wird? Sieben Schritte, nach denen du im Kopf deiner Kunden bleibst – mit deiner Stimme, deiner Geschichte und deiner Haltung. Kostenloser Wirkungs-Check als Einstieg."
        path={PFAD}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation />

      {/* Kopf: Text neben Bild */}
      <header
        className="relative pt-36 pb-16 sm:pt-44 sm:pb-24"
        style={{
          background:
            'radial-gradient(120% 85% at 12% 0%, rgba(26,43,76,0.95) 0%, rgba(10,22,40,0) 62%),' +
            'radial-gradient(90% 70% at 88% 18%, rgba(212,175,55,0.16) 0%, rgba(10,22,40,0) 58%),' +
            'linear-gradient(175deg, #0B1B33 0%, #0A1628 48%, #0C1E38 100%)',
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-16">
          <div className="min-w-0 text-pearl-white">
            <div className="mb-7 text-pearl-white/75">
              <Brotkrumen krumen={[{ name: 'Unverwechselbar DU' }]} />
            </div>
            <Kicker text="Das Programm" />
            <h1 className="mt-6 font-montserrat text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl">
              Unverwechselbar <span className="gold-text-animated">DU.</span>
            </h1>
            <p className="mt-6 font-montserrat text-xl font-bold leading-snug text-white sm:text-2xl">Was hast du, was KI niemals haben wird?</p>
            <p className="mt-4 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/90">
              Sieben Schritte, nach denen du im Kopf deiner Kunden bleibst – mit deiner Stimme, deiner Geschichte und deiner Haltung. Für Unternehmer, Führungskräfte, Speaker und Teams.
            </p>
            <p className="mt-7 font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">
              Perfektion ist klickbar. Persönlichkeit weckt Vertrauen. Und bleibt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#geschenk" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                Mein Geschenk holen: der Wirkungs-Check
              </a>
              <a href="#challenge" className="inline-flex items-center rounded-full border-2 border-[#D4AF37] px-7 py-4 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:text-[#EBD197]">
                Zur 7-Tage-Video-Challenge
              </a>
            </div>
          </div>
          <figure className={`cc-schweben relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden bg-[#13233F] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] ${KACHEL}`}>
            <img src="/situationen/06-kamera.webp" alt="Claudia Conen im dunklen Blazer, Arme verschränkt, Blick in die Kamera" width={360} height={640} className="h-full w-full object-cover" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0)_55%,rgba(10,22,40,0.9)_100%)]" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#EBD197]">
              Keynote-Speakerin · Trainerin · Coach · Autorin
              <span className="mt-1 block text-base normal-case tracking-normal text-white">Claudia Conen</span>
            </figcaption>
          </figure>
        </div>
      </header>

      {/* Hand aufs Herz */}
      <Abschnitt className="bg-pearl-white py-16 sm:py-24" label="hand-aufs-herz">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Hand aufs Herz" hell />
              <h2 id="hand-aufs-herz" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Bei wem holst du dir häufiger Rat – bei ChatGPT oder bei echten Menschen?
              </h2>
              <p className="mt-4 font-inter text-lg text-midnight-blue">Kreuze an, was du kennst.</p>
            </div>
            <Kopfbild datei="avatare" alt="Claudia Conen als Mensch neben ihren KI-Avataren" />
          </div>
          <ul className="mt-7 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {KREUZE.map((k, i) => (
              <li key={k}>
                <label className={`flex cursor-pointer items-center gap-3.5 bg-white px-4 py-3.5 font-inter font-medium text-midnight-blue ${KACHEL}`}>
                  <input type="checkbox" className="h-5 w-5 flex-none accent-[#D4AF37]" checked={kreuze[i]} onChange={() => setKreuze((a) => a.map((v, j) => (j === i ? !v : v)))} />
                  {k}
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-[10px] border border-[#D4AF37]/55 bg-midnight-blue px-6 py-5 text-pearl-white" aria-live="polite">
            <p className="font-inter text-pearl-white/90">
              {nKreuze === 0
                ? 'Kreuze an – und lies dann weiter.'
                : `${nKreuze === 1 ? 'Ein Kreuz.' : `${nKreuze} Kreuze.`} Alles richtig – und trotzdem: An nichts davon erinnert sich morgen jemand.`}
            </p>
            <p className="mt-1.5 font-cormorant text-2xl italic leading-tight text-[#F7E7CE] sm:text-3xl">Was hast du, was KI niemals haben wird? Dich.</p>
          </div>
        </div>
      </Abschnitt>

      {/* KI und du */}
      <Abschnitt className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="ki-und-du" welle>
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Dein KI-Agent ist effizient. Und du?" />
          <h2 id="ki-und-du" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Warum Menschen so gern mit der KI reden – und was trotzdem nur du kannst.
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <div className={`bg-[#13233F] p-6 sm:p-8 ${KACHEL}`}>
              <h3 className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#EBD197]">Warum die KI so bequem ist</h3>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {KI_GRUENDE.map((g) => (
                  <li key={g.titel} className="flex gap-3 font-inter text-[15px]">
                    <Haken />
                    <span>
                      <b className="block font-montserrat font-bold text-white">{g.titel}</b>
                      <span className="text-pearl-white/80">{g.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`bg-pearl-white p-6 text-midnight-blue sm:p-8 ${KACHEL} border-[#D4AF37]`}>
              <h3 className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em]">Und was bleibt davon im Kopf?</h3>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {DU_ANTWORTEN.map((g) => (
                  <li key={g.titel} className="flex gap-3 font-inter text-[15px]">
                    <Haken />
                    <span>
                      <b className="block font-montserrat font-bold">{g.titel}</b>
                      <span>{g.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-montserrat text-xl font-black uppercase leading-tight sm:text-2xl">
                Keine Geschichte, kein Ego, keine Verletzlichkeit – genau das ist der Grund, warum sich niemand an einen Avatar{' '}
                <span className="underline decoration-[#D4AF37] decoration-[3px] underline-offset-4">erinnert</span>.
              </p>
              <p className="mt-4 font-inter text-[15px] leading-relaxed">
                Der Avatar ist bequem. Du bist unvergesslich. Das Programm zeigt dir, wie du beides nutzt: die Technik für das Tempo – und dich für das, was bleibt.
              </p>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Selbst-Check */}
      <Abschnitt className="bg-white py-16 sm:py-24" label="selbstcheck">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Selbst-Check" hell />
              <h2 id="selbstcheck" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                So bleibst du unverwechselbar – auch im Zeitalter von KI.
              </h2>
              <p className="mt-4 font-inter text-lg text-midnight-blue">Sieben Fragen. Ehrlich beantwortet, sagen sie dir, wo du stehst.</p>
            </div>
            <Kopfbild datei="gehirn" alt="Claudia Conen mit einem Gehirnmodell in der Hand" />
          </div>
          <ul className="mt-7 grid list-none gap-2.5 p-0">
            {FRAGEN.map((f, i) => (
              <li key={f.frage}>
                <label className={`grid cursor-pointer grid-cols-[auto_1fr] items-start gap-4 bg-pearl-white px-4 py-4 text-midnight-blue ${KACHEL}`}>
                  <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[#D4AF37]" checked={fragen[i]} onChange={() => setFragen((a) => a.map((v, j) => (j === i ? !v : v)))} />
                  <span>
                    <b className="block font-montserrat font-bold">{f.frage}</b>
                    <span className="font-inter text-[15px]">{f.text}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-montserrat text-lg font-extrabold text-midnight-blue" aria-live="polite">
            {nFragen === 0 && 'Jeden Tag prasseln Eindrücke auf uns ein wie Regentropfen. Nur wenige bleiben. Die Frage ist: Bist du einer davon?'}
            {nFragen === 7 && 'Sieben von sieben. Dann brauchst du kein Programm – dann brauchst du eine Bühne. Melde dich trotzdem, ich glaube dir erst, wenn ich dich gehört habe.'}
            {nFragen > 0 && nFragen < 7 && `${nFragen} von 7. ${nFragen < 4 ? 'Da ist Luft – und genau dafür sind die sieben Schritte da.' : 'Gute Basis. Die fehlenden Punkte sind die, die den Unterschied machen.'}`}
          </p>
        </div>
      </Abschnitt>

      {/* Sieben Schritte */}
      <Abschnitt id="programm" className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="programm-titel" gold>
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Das Programm" />
              <h2 id="programm-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
                Sieben Schritte. Ein Ergebnis: <span className="gold-text-animated">Du bleibst im Kopf.</span>
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-lg text-pearl-white/90">
                Jeder Schritt ist ein eigener Baustein – und zusammen sind sie der Weg vom „Ich rede" zum „Man erinnert sich an mich".
              </p>
            </div>
            <Kopfbild datei="keynote" alt="Claudia Conen auf der Bühne bei einer Keynote" />
          </div>
          <ol className="mt-9 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {SCHRITTE.map((s, i) => {
              const letzter = i === SCHRITTE.length - 1;
              return (
                <li
                  key={s.titel}
                  style={{ ['--i' as string]: i }}
                  className={`cc-stufe min-h-[190px] p-6 hover:-translate-y-0.5 ${KACHEL} ${letzter ? `${GOLD} border-transparent text-midnight-blue` : 'cc-glaskachel text-pearl-white'}`}
                >
                  <span aria-hidden="true" className={`font-montserrat text-4xl font-black ${letzter ? 'text-midnight-blue/40' : 'text-[#D4AF37]/45'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`mt-3 font-montserrat text-base font-extrabold uppercase tracking-wide ${letzter ? '' : 'text-white'}`}>{s.titel}</h3>
                  <p className={`mt-2.5 font-inter text-[15px] leading-relaxed ${letzter ? '' : 'text-pearl-white/80'}`}>{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Abschnitt>

      {/* Challenge */}
      <Abschnitt id="challenge" className="bg-pearl-white py-16 sm:py-24" label="challenge-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Vom Event direkt in die Praxis" hell />
              <h2 id="challenge-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Die 7-Tage-Video-Challenge: sieben Tage, sieben Schritte, 60 Sekunden am Tag.
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-midnight-blue">
                <b>Start immer montags – nächster Start: Montag, {montag}.</b> Du scannst den Code, sagst „Ich bin dabei" – und ab dann bekommst du jeden Morgen eine Aufgabe. Du nimmst dich mit dem Handy auf – eine Minute, mehr nicht. Zu jedem Video, das du in der Gruppe teilst, bekommst du Feedback von mir. Kostenfrei. Und wer nach sieben Tagen weiter will: Ich lade dich ein zum Performance-Coaching und in die Netzwerk-Community. Wer mag, teilt sein Video mit <b>#unverwechselbarDU</b>.
              </p>
            </div>
            <Kopfbild datei="selfie" alt="Claudia Conen nimmt mit dem Handy ein Video auf, zwei Menschen lachen mit" quer />
          </div>
          <ol className="mt-8 grid list-none gap-2.5 p-0">
            {TAGE.map((tg, i) => {
              const letzter = i === TAGE.length - 1;
              return (
                <li key={tg.titel} style={{ ['--i' as string]: i }} className={`cc-stufe grid grid-cols-[auto_1fr] items-start gap-4 bg-white px-4 py-4 text-midnight-blue ${KACHEL}`}>
                  <span className={`mt-0.5 rounded-md px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] ${letzter ? `${GOLD} text-midnight-blue` : 'bg-midnight-blue text-pearl-white'}`}>
                    Tag {i + 1}
                  </span>
                  <span>
                    <b className="block font-montserrat font-extrabold">{tg.titel}</b>
                    <span className="font-inter text-[15px]">{tg.aufgabe}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={CHALLENGE_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
              Ich bin dabei – zur WhatsApp-Gruppe
            </a>
          </div>
          <p className="mt-4 max-w-2xl font-inter text-[15px] text-midnight-blue">
            Die Challenge läuft in einer WhatsApp-Gruppe. Dort sehen alle Mitglieder gegenseitig die Handynummern – wer das nicht möchte, schreibt mir direkt.
          </p>
        </div>
      </Abschnitt>

      {/* Werkzeugkasten + Workbook */}
      <Abschnitt className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="werkzeug-titel" gold welle>
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Dein Werkzeugkasten für die Challenge" />
              <h2 id="werkzeug-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
                Fünf Dinge, die du vor der ersten Aufnahme wissen solltest.
              </h2>
            </div>
            <Kopfbild datei="tonstudio" alt="Claudia Conen am Mikrofon im Tonstudio" />
          </div>
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {WERKZEUG.map((w, i) => (
              <article key={w.titel} style={{ ['--i' as string]: i }} className={`cc-stufe bg-white p-6 text-midnight-blue ${KACHEL}`}>
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-[10px] bg-midnight-blue font-montserrat font-black text-[#EBD197]">{i + 1}</span>
                <h3 className="mt-4 font-montserrat text-base font-extrabold uppercase tracking-wide">{w.titel}</h3>
                <p className="mt-2.5 font-inter text-[15px] leading-relaxed">{w.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid items-center gap-8 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:gap-12">
            <button
              type="button"
              onClick={() => setBuchOffen(true)}
              aria-label="Workbook öffnen und blättern"
              className={`group relative m-0 block max-w-[340px] -rotate-[1.5deg] overflow-hidden p-0 text-left shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] ${KACHEL}`}
            >
              <img src="/unverwechselbar/workbook/seite-01.webp" alt="Deckblatt des Workbooks Entdecke deine Stimmwirkung – Brainself, Buchauszug von Claudia Conen" width={900} height={1273} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute inset-x-0 bottom-0 bg-midnight-blue/80 px-4 py-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.16em] text-[#EBD197]">
                Antippen und blättern →
              </span>
            </button>
            <div>
              <Kicker text="Zum Mitnehmen" />
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase">Workbook „Entdecke deine Stimmwirkung"</h3>
              <p className="mt-3 font-inter leading-relaxed text-pearl-white/90">
                Mein Buchauszug aus <em>Brainself</em> – aus der Angst zum Selbstbewusstsein – als Workbook zum Ausfüllen: deine akustische Visitenkarte, Übungen für Stimme und Wirkung, Platz für deine eigenen Sätze.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setBuchOffen(true)} className={`inline-flex items-center rounded-full px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
                  Im Workbook blättern
                </button>
                <a href={WORKBOOK_PDF} download className="inline-flex items-center rounded-full border-2 border-[#D4AF37] px-6 py-3.5 font-montserrat text-sm font-bold text-pearl-white hover:text-[#EBD197]">
                  Als PDF speichern
                </a>
              </div>
              <WorkbookBlaettern offen={buchOffen} schliessen={() => setBuchOffen(false)} />
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Angebot */}
      <Abschnitt id="geschenk" className="bg-pearl-white py-16 sm:py-24" label="angebot-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Zwei Wege. Ein Anfang." hell />
              <h2 id="angebot-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Mein Geschenk für deine Wirkung – und der Schritt danach.
              </h2>
            </div>
            <Kopfbild datei="am-telefon" alt="Claudia Conen lächelt mit dem Telefon in der Hand" quer />
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <div className={`flex flex-col bg-white p-7 text-midnight-blue sm:p-9 ${KACHEL} border-[#D4AF37]`}>
              <span className="self-start rounded-full bg-midnight-blue px-3 py-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#EBD197]">Geschenk · kostenlos</span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase">Der Wirkungs-Check</h3>
              <p className="mt-4 font-montserrat text-4xl font-black">0 €</p>
              <p className="mt-4 font-inter leading-relaxed">
                20 Minuten am Telefon oder per Zoom. Du sprichst eine Minute über dein Thema – so, wie du es im Alltag tust. Dann hörst du von mir drei Dinge:
              </p>
              <ul className="mt-4 grid list-none gap-2.5 p-0 font-inter">
                {['Was von dir hängen bleibt.', 'Was verpufft – und warum.', 'Was du morgen anders machst.'].map((z) => (
                  <li key={z} className="flex gap-3"><Haken />{z}</li>
                ))}
              </ul>
              <p className="mt-4 font-inter leading-relaxed">Kein Verkaufsgespräch. Ein Gespräch, nach dem du weißt, wo du stehst.</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <Link to="/buchen/erstgespraech" className="inline-flex items-center rounded-full bg-midnight-blue px-6 py-3.5 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
                  Termin für den Wirkungs-Check
                </Link>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border-2 border-[#D4AF37] px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue">
                  Per WhatsApp melden
                </a>
              </div>
            </div>
            <div className={`flex flex-col bg-midnight-blue p-7 text-pearl-white sm:p-9 ${KACHEL} border-[#D4AF37]`}>
              <span className={`self-start rounded-full px-3 py-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-midnight-blue ${GOLD}`}>Das Programm</span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase">Unverwechselbar DU – die sieben Schritte live</h3>
              <p className="mt-4 font-montserrat text-4xl font-black">{ANGEBOT.preis || 'Auf Anfrage'}</p>
              <p className="mt-3 font-inter text-pearl-white/90">{[ANGEBOT.format, termin ?? 'Nächster Termin auf Anfrage'].filter(Boolean).join(' · ')}</p>
              <p className="mt-4 font-inter leading-relaxed text-pearl-white/90">Das ist drin:</p>
              <ul className="mt-4 grid list-none gap-2.5 p-0 font-inter text-pearl-white/90">
                {[
                  'Vorbereitung per Fragebogen: dein Thema, dein Ziel, deine Zuhörer.',
                  'Die sieben Schritte – jeder mit Übung, jeder mit Rückmeldung von mir.',
                  'Du stehst dreimal auf und redest. Es wird aufgenommen. Du siehst dich, wie andere dich sehen.',
                  'Dein Satz zum Mitnehmen: der eine, den du überall sagen kannst.',
                  'Zwei Wochen danach ein Nachgespräch: Was ist geblieben, was fehlt noch?',
                ].map((z) => (
                  <li key={z} className="flex gap-3"><Haken />{z}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <Link to="/buchen/erstgespraech" className={`inline-flex items-center rounded-full px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
                  Platz anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Warum ich */}
      <Abschnitt className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="warum" welle>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-14">
          <div>
            <Kicker text="Warum ich" />
            <h2 id="warum" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Menschen prägen Menschen.</h2>
            <p className="mt-7 border-l-4 border-[#D4AF37] pl-5 font-cormorant text-3xl italic leading-snug text-[#F7E7CE] sm:text-4xl">
              Ich höre, was andere überhören. Und mache daraus deine Wirkung.
            </p>
          </div>
          <div>
            <ul className="grid list-none gap-3 p-0 font-inter text-pearl-white/90">
              {[
                'Claudia Conen ist Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung.',
                'Sie trainiert Rhetorik, Storytelling, Präsentation und den Auftritt vor der Kamera – seit 37 Jahren.',
                'Ihr Schwerpunkt ist die hörbare Persönlichkeit: das Zusammenspiel von Worten, Stimme und Haltung.',
                'Bekannt als „Die Umsatzstimme" – zu hören unter anderem bei Sat.1 und RTL, gefragt auf Bühnen und in Unternehmen.',
              ].map((z) => (
                <li key={z} className="flex gap-3"><Haken />{z}</li>
              ))}
            </ul>
            <p className="mt-5 font-inter text-[15px] text-pearl-white/90">
              Warum ich weiß, dass Menschen sich für immer im Gehirn verankern können, erzähle ich auf{' '}
              <Link to="/ueber-mich" className="underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:text-[#EBD197]">„Über mich"</Link>.
            </p>
          </div>
        </div>
      </Abschnitt>

      {/* Fragen */}
      <Abschnitt className="bg-white py-16 sm:py-24" label="fragen">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Fragen, die vorher kommen" hell />
          <h2 id="fragen" className="mt-5 font-montserrat text-3xl font-extrabold text-midnight-blue sm:text-4xl">Kurz beantwortet.</h2>
          <div className="mt-7">
            {FAQ.map((f) => (
              <details key={f.frage} className="cc-mehr border-t border-midnight-blue/15 py-4 last:border-b">
                <summary className="cursor-pointer font-montserrat text-base font-bold text-midnight-blue">{f.frage}</summary>
                <p className="mt-3 max-w-2xl font-inter leading-relaxed text-midnight-blue">{f.antwort}</p>
              </details>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Community - Claudias Idee vom 22.09.2026 (02:24 UTC): wer sieben Tage lang auf die Seite kommt,
          soll wissen, wo es danach weitergeht. Text aus ihren Worten; die Community-Seite war beim Bau
          nicht lesbar (gleiches Netlify-Konto, abgeschaltet). */}
      <Abschnitt className="bg-pearl-white py-16 sm:py-24" label="community-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className="cc-goldbuehne rounded-[18px] p-3 shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:p-4">
          <div className="cc-glas grid items-center gap-8 rounded-[14px] p-7 text-pearl-white sm:p-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <Kicker text="Die Unverwechselbaren · nach der Challenge" />
              <h2 id="community-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Netzwerk Mittelstand – deine Community.
              </h2>
              {/* Beschreibung aus dem Seitentitel/der Suchbeschreibung von community.claudiaconen.com (22.09.2026);
                  Claudias Ansage: Gabi ist NUR fuer die Community mit zustaendig, nicht fuer Programm/Challenge. */}
              <p className="mt-4 font-inter text-lg leading-relaxed text-pearl-white/90">
                Sieben Tage sind ein Anfang. In der Community geht es weiter: die Premium-Community für den deutschen Mittelstand – Sichtbarkeit, Netzwerk und Umsatz, unverwechselbar im KI-Zeitalter. Dafür stehen Gabi Lindemann und ich gemeinsam.
              </p>
              <ul className="mt-5 grid list-none gap-2.5 p-0 font-inter text-pearl-white/90">
                {[
                  'Wer die Challenge gemacht hat, kennt schon die sieben Schritte – hier werden sie zur Gewohnheit.',
                  'Live-Abende im Rederaum, Menschen, die dich beim Wort nehmen.',
                  'Du bleibst nicht allein mit deiner Wirkung.',
                ].map((z) => (
                  <li key={z} className="flex gap-3"><Haken />{z}</li>
                ))}
              </ul>
              <a href="https://community.claudiaconen.com/" target="_blank" rel="noopener noreferrer" className={`mt-7 inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
                Zur Community
              </a>
            </div>
            {/* Foto von Claudia am 22.09.2026 (02:45 UTC), Schriftband unten weggeschnitten. */}
            <figure className={`relative m-0 aspect-[3/2] w-full max-w-[380px] justify-self-center overflow-hidden ${KACHEL}`}>
              <img src="/unverwechselbar/gabi-und-claudia.webp" alt="Claudia Conen und Gabi Lindemann lachen zusammen" width={900} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-midnight-blue/75 px-3 py-2 font-montserrat text-[11px] font-bold text-[#EBD197]">
                Gabi Lindemann und Claudia Conen – zusammen zuständig für die Community
              </figcaption>
            </figure>
          </div>
          </div>
        </div>
      </Abschnitt>

      {/* Schluss */}
      <Abschnitt className="py-16 text-center text-pearl-white sm:py-24" style={DUNKEL} label="schluss" gold welle>
        <div className="mx-auto max-w-4xl px-6">
          <p className="flex items-center justify-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#EBD197]">
            <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${GOLD}`} />
            Willst du dich speichern?
          </p>
          <h2 id="schluss" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl">
            Werde zur Persönlichkeit, die prägt. <span className="gold-text-animated">Nicht zur Stimme, die verpufft.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/buchen/erstgespraech" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
              Wirkungs-Check sichern
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border-2 border-[#D4AF37] px-7 py-4 font-montserrat text-sm font-bold text-pearl-white hover:text-[#EBD197]">
              Per WhatsApp melden
            </a>
          </div>
        </div>
      </Abschnitt>

      <Footer />
    </div>
  );
}
