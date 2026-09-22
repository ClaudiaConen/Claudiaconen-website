import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import ChallengeAnmeldung from '../components/ChallengeAnmeldung';
import FotoReihen from '../components/FotoReihen';

/**
 * Die 7-Tage-Video-Challenge - eine kurze Seite, kein Programm.
 *
 * Claudias Ansage vom 22.09.2026, 09:13 UTC: "die 7 Tage challenge unterseite soll nicht zu lang
 * sein, dafuer fuer alle sieben Tage eine Anleitung mit kostbaren Tipps ... nicht so eine lange
 * Seite". Vorher fuehrte das Laufband der Startseite auf die lange Produktseite /unverwechselbar-du
 * (Abschnitt Challenge). Jetzt: Kopf, sieben Tage mit je einer Aufgabe und drei Tipps, der
 * WhatsApp-Einstieg, "Nach Tag 7". Sonst nichts.
 *
 * Die Tipps sind Handwerk in ihrer Stimme: klar, respektvoll, ohne Show - keine Zahlen aus der
 * Hirnforschung, keine Zitate Dritter (die Machart eines Rhetoriktrainers ist kein Zitat).
 * Kostenfrei ist ihr Wort ("Kostenfrei mitmachen"); ein Preis kommt nur auf ihre Ansage.
 * Der Einladungslink ist derselbe wie auf /unverwechselbar-du - aendert sie ihn, an beiden Stellen tauschen.
 */

const PFAD = '/challenge';
const CHALLENGE_LINK = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'rounded-[10px] border border-[#D4AF37]/55 transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]';

/** Start immer montags - der naechste Montag wird berechnet, nie eingetragen (Datum nie ohne Ablauf). */
function naechsterMontag(heute: Date): string {
  const d = new Date(heute);
  const tage = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + tage);
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' }).format(d);
}

type Tag = {
  titel: string;
  /** Eine Zeile, die auf der zugeklappten Kachel steht. */
  vorschau: string;
  /** Die Aufgabe des Tages - steht oben in der aufgeklappten Kachel. */
  aufgabe: string;
  /** Der Satz, der eingesprochen wird (Tag 1 - Claudias Wortlaut). */
  satz?: string;
  /** Ueberschrift ueber den Schritten, z. B. "Dann weck deine Stimme auf - fuenf Minuten:". */
  schrittTitel: string;
  schritte: string[];
  /** Der Abschluss, nach den Schritten. */
  danach?: string;
};

/** Tag 1 ist Claudias Wortlaut (Discord, 22.09.2026, 09:19 UTC), nur geglaettet: ihr Satz, ihre Bilder
 *  (Eisschollen, Raubkatze, Glas Wasser), ihre Reihenfolge. Tage 2 bis 7 sind meine Entwuerfe, bis
 *  ihre Fassungen kommen - dann hier ersetzen. */
const TAGE: Tag[] = [
  {
    titel: 'Lerne deine Stimmwirkung kennen',
    vorschau: 'Der Satz am Morgen – und fünf Minuten, die deine Stimme aufwecken.',
    aufgabe: 'Morgens, bevor du irgendetwas anderes tust: Handy in die Hand, Aufnahme an – und sprich diesen Satz ein.',
    satz: 'Meine Stimme ist unaufhaltbar. Überall auf der Welt kann ich blitzschnell Menschen erreichen – sobald ich den Hörer in die Hand nehme, in ein Video spreche, auf einer Bühne stehe oder ins Radio rede. Deshalb lerne ich meine Stimme kennen.',
    schrittTitel: 'Dann weck deine Stimme auf – fünf Minuten:',
    schritte: [
      'Stell dir vor: Du wirst wach, und deine Stimmlippen sind über Nacht eingefroren – wie Eisschollen auf dem Wasser. Sobald du dich streckst und die Lippen leckst, knackt das Eis. Es beginnt zu tauen.',
      'Gib deinem Rachen, deinem Mund, deinem ganzen Sprechapparat Platz. Spiel mit der Zunge: Drück sie oben an den Gaumen – und sag dir dabei „Guten Morgen".',
      'Streck die Zunge weit heraus, ganz weit – und zähl dabei bis zehn.',
      'Kreise mit der Zunge jeden einzelnen Zahn ab – außen, hinter der Lippe.',
      'Summ. Ungefähr eine Minute. Und beweg dich dabei in deinem Bett wie eine Raubkatze.',
      'Trink ein Glas Wasser. Über Nacht verlierst du viel davon – und deine Stimmlippen sind fein und zart.',
      'Bei jeder Bewegung: Die Eisschollen draußen auf dem Meer tauen, und das Meer beginnt, Wellen zu schlagen. Genau so schwingen deine Stimmlippen – zart, weich, in Wellen. Je freier sie schwingen, desto besser klingen sie.',
    ],
    danach: 'Jetzt noch einmal den Satz. Fühl hinein: Klingt deine Stimme ein bisschen anders?',
  },
  {
    titel: 'Die Pause gehört dem Zuhörer',
    vorschau: 'Atmen, Tempo, Stille – die drei Dinge, die Profis anders machen.',
    aufgabe: 'Nach den fünf Minuten von Tag 1: Sag deinen Satz noch einmal – und mach nach jedem Komma eine Pause, in der du still bis zwei zählst. Dann drei Sätze über deinen gestrigen Tag, genauso.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Atme vor dem ersten Wort aus, nicht ein. Wer mit vollen Lungen startet, presst. Wer ruhig einatmet, klingt ruhig.',
      'Die Pause fühlt sich für dich lang an – für den Zuhörer ist sie genau richtig. Dort versteht er dich. Dort nickt er.',
      'Tiefer wird die Stimme nicht durch Drücken, sondern durch Ruhe. Ein Satz, eine Pause, der nächste Satz. Eile hört man.',
    ],
  },
  {
    titel: 'Sag, was du tust',
    vorschau: 'Eine Minute ohne Fachwort – so, dass deine Nachbarin es versteht.',
    aufgabe: 'Eine Minute: Was tust du – ohne ein einziges Fachwort. So, dass deine Nachbarin es versteht.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Ein Gedanke pro Satz. Wo ein „und" steht, versteckt sich meist ein zweiter Satz. Punkt setzen, atmen, weiter.',
      'Fang beim Menschen an, nicht bei dir: „Wenn jemand …, dann …" – so hört jeder sofort, ob es ihn betrifft.',
      'Sag es einmal so, wie du es am Telefon einer Freundin sagen würdest. Genau diese Fassung nimmst du auf – nicht die offizielle.',
    ],
  },
  {
    titel: 'Dieselben Worte, drei Wirkungen',
    vorschau: 'Beruhigend, weckend, überzeugend – mit demselben Satz.',
    aufgabe: 'Ein Satz, drei Absichten: einmal beruhigend, einmal weckend, einmal überzeugend. Dieselben Worte.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Entscheide vor dem Sprechen, was der Zuhörer danach tun soll. Die Absicht färbt die Stimme – ohne dass du an ihr herumbastelst.',
      'Beruhigen: Tempo runter, Stimme am Satzende nach unten. Wecken: kürzere Sätze, direkter Blick. Überzeugen: eine Pause vor dem wichtigsten Wort.',
      'Respekt ist hörbar. Wer den Zuhörer verstehen statt überreden will, klingt anders – das ist die überzeugende Fassung.',
    ],
  },
  {
    titel: 'Ein Moment statt Lebenslauf',
    vorschau: 'Der Moment, in dem du wusstest: Das ist mein Beruf.',
    aufgabe: 'Erzähl den Moment, in dem du wusstest: Das ist mein Beruf. Eine Person, ein Ort, ein Satz, der fiel.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Beginn mittendrin: „Dienstag, acht Uhr, der Kunde sagt …" – keine Vorgeschichte, keine Einleitung.',
      'Zeig, was zu sehen war, statt zu sagen, was zu fühlen ist. „Sie legte den Stift weg" wirkt stärker als „Sie war beeindruckt".',
      'Ende mit dem, was sich seitdem geändert hat – ein Satz. Er ist der Grund, warum du die Geschichte erzählst.',
    ],
  },
  {
    titel: 'Deine Stimme gegen die Maschine',
    vorschau: 'Ein Satz von der KI, ein Satz von dir – und der Unterschied, den man hört.',
    aufgabe: 'Lass dir von einer KI einen Satz über dich schreiben und sag ihn. Dann sag es so, wie du es wirklich sagen würdest. Nimm beides auf.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Streich jedes Wort, das du im Gespräch nie benutzt. „Innovativ", „ganzheitlich", „Lösungen" – das sagt die Maschine, nicht du.',
      'Persönlich wird ein Satz durch ein Detail, das nur du kennst: ein Ort, ein Name, eine Zahl aus deinem Alltag.',
      'Hör beide Aufnahmen mit geschlossenen Augen. Welchem Menschen würdest du glauben? Das ist deine Richtung.',
    ],
  },
  {
    titel: 'Dein Satz zum Mitnehmen',
    vorschau: 'Tag 1 neben Tag 7 hören – und der eine Satz, den du überall sagen kannst.',
    aufgabe: 'Nach den fünf Minuten: Sag deinen Satz von Tag 1 und hör ihn neben der Aufnahme vom ersten Morgen. Dann der eine Satz, den du überall sagen kannst. Den schickst du mir – und bekommst eine Antwort von mir, keine Vorlage.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Kurz genug, dass ihn jemand weitererzählen kann, ohne nachzulesen. Test: Sag ihn einer Person und bitte sie, ihn morgen zu wiederholen.',
      'Kein Superlativ. „Die Beste", „einzigartig", „führend" – das behauptet jeder. Ein konkretes Versprechen behauptet keiner.',
      'Er muss nach dir klingen, nicht nach einem Slogan. Wenn du dich beim Sagen räusperst, ist es noch nicht deiner.',
    ],
  },
];

/** "Zuallererst" - Claudias Wegweiser-Tipp (22.09.2026): eine WhatsApp-Gruppe nur mit sich selbst. */
const WEGWEISER = {
  titel: 'Zuallererst: Leg dir eine Gruppe nur für dich an',
  text: 'Bevor es losgeht, legst du in WhatsApp eine Gruppe an, in der nur du bist. Dort landen deine sieben Aufnahmen, deine Notizen und die Hinweise aus der Challenge. So übst du, ohne dass jemand zusieht – und am Ende hörst du im Vergleich, wie sich deine Stimme von Tag 1 bis Tag 7 verändert hat.',
  wie: 'So geht es: Neue Gruppe anlegen, niemanden hinzufügen, Namen vergeben – zum Beispiel „Meine Stimme". Fertig.',
};

const ABLAUF = [
  'Du trägst dich unten ein und gehst in die WhatsApp-Gruppe – dort läuft die Challenge.',
  'Ab Montag bekommst du jeden Morgen eine Aufgabe – die sieben stehen hier unten zum Aufklappen.',
  'Du nimmst dich mit dem Handy auf, eine Minute, und teilst das Video in der Gruppe. Du bekommst Feedback von mir.',
];

const FUER = [
  'gehört werden willst – im Meeting, am Telefon, vor Kunden, auf der Bühne',
  'täglich fünf Minuten und ein Handy hast',
  'dich selbst hören willst, auch wenn es am Anfang unangenehm ist',
  'Feedback willst statt Applaus',
  'eine Woche durchhältst – sieben Aufnahmen, keine mehr',
];
const NICHT_FUER = [
  'eine perfekte Aufnahme willst statt einer echten',
  'Tipps sammeln, aber nichts aufnehmen möchtest',
  'erst eine Bühne brauchst, bevor du übst',
  'erwartest, dass die KI das Sprechen für dich übernimmt',
];

/** Goldene Linie links neben den sieben Tagen; der Pfeil wandert beim Scrollen mit (setzt --p). */
function Schiene() {
  return (
    <div className="cc-schiene" aria-hidden="true">
      <span className="cc-schiene-wort">Deine sieben Tage</span>
      <span className="cc-schiene-linie"><span className="cc-schiene-pfeil" data-pfeil>➜</span></span>
    </div>
  );
}

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#EBD197]'}`}>
      <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#D4AF37]" />;
}

/** Einblenden beim Scrollen (Klassen cc-r / da in index.css) - ohne JavaScript ist alles sofort da. */
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

function Abschnitt({ id, className, style, label, children }: { id: string; className: string; style?: CSSProperties; label: string; children: ReactNode }) {
  const ref = useEinblenden();
  return (
    <section id={id} ref={ref} className={`cc-r ${className}`} style={style} aria-labelledby={label}>
      {children}
    </section>
  );
}

function Einstieg({ hell }: { hell?: boolean }) {
  return (
    <a
      href={CHALLENGE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold transition-transform hover:-translate-y-px ${
        hell ? 'bg-midnight-blue text-pearl-white hover:bg-royal-navy' : `text-midnight-blue ${GOLD}`
      }`}
    >
      Ich bin dabei – zur WhatsApp-Gruppe
    </a>
  );
}

/** Der Einstieg zwischen den Kacheln: Knopf fuer das Handy, QR-Code fuer alle, die am Rechner lesen.
 *  QR zeigt auf den Gruppenlink (public/challenge/qr-whatsapp.png, erzeugt 22.09.2026, zurueckgelesen). */
function WhatsAppBlock() {
  return (
    <div className={`mt-3 grid items-center gap-5 px-5 py-5 text-midnight-blue sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-7 ${GOLD} ${KACHEL} border-transparent`}>
      <img src="/challenge/qr-whatsapp.png" alt="QR-Code: Einladung in die WhatsApp-Gruppe der Challenge" width={328} height={328} loading="lazy" decoding="async" className="h-24 w-24 rounded-md bg-white sm:h-28 sm:w-28" />
      <div className="min-w-0">
        <p className="font-montserrat text-lg font-extrabold leading-tight sm:text-xl">Hier geht es in die Gruppe.</p>
        <p className="mt-1 font-inter text-[15px] leading-relaxed">
          Am Handy: Knopf drücken. Am Rechner: Code mit dem Handy scannen. Noch nicht eingetragen?{' '}
          <a href="#anmelden" className="font-semibold underline decoration-midnight-blue/40 underline-offset-2">Hier eintragen.</a>
        </p>
      </div>
      <Einstieg hell />
    </div>
  );
}

export default function Challenge() {
  // Beim Vorrendern steht hier das Bau-Datum; im Browser rechnet React mit dem echten Tag neu.
  const montag = naechsterMontag(new Date());
  const listeRef = useRef<HTMLOListElement>(null);
  // Pfeil auf der Schiene folgt dem Scrollen: 0 % am Anfang der Liste, 100 % am Ende.
  useEffect(() => {
    const liste = listeRef.current;
    const pfeil = liste?.parentElement?.querySelector<HTMLElement>('[data-pfeil]');
    if (!liste || !pfeil || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const setzen = () => {
      raf = 0;
      const r = liste.getBoundingClientRect();
      const mitte = window.innerHeight * 0.45;
      const p = Math.min(1, Math.max(0, (mitte - r.top) / Math.max(1, r.height)));
      pfeil.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(setzen); };
    setzen();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) window.cancelAnimationFrame(raf); };
  }, []);

  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sieben Tage für deine Wirkung – die Video-Challenge',
    description: 'Sieben Tage, jeden Tag eine Aufgabe und eine Minute Video mit dem Handy – mit Feedback von Claudia Conen. Kostenfrei, in einer WhatsApp-Gruppe.',
    totalTime: 'P7D',
    step: TAGE.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Tag ${i + 1}: ${t.titel}`, text: t.aufgabe })),
    url: `https://claudiaconen.com${PFAD}`,
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Sieben Tage für deine Wirkung – die Video-Challenge"
        description="Sieben Tage, jeden Tag eine Aufgabe, eine Minute Video mit dem Handy, Feedback von Claudia Conen. Kostenfrei, in einer WhatsApp-Gruppe. Für alle, die gehört werden wollen – ohne Show."
        path={PFAD}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation />

      {/* Kopf: Foto-Reihen laufen hinter dem Text (Claudia, 22.09.2026 10:38 UTC: "dass diese Kacheln
          von der Webinar-Seite im Hintergrund hier auch laufen"), davor eine deckende Text-Kachel. */}
      <header className="relative overflow-hidden bg-[#0A1628] pt-32 pb-16 sm:pt-40 sm:pb-24">
        <FotoReihen />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-6 text-pearl-white/75">
            <Brotkrumen krumen={[{ name: 'Sieben Tage für deine Wirkung' }]} />
          </div>
          <div className="max-w-3xl rounded-[12px] border border-[#D4AF37]/45 bg-[rgba(10,22,40,0.86)] px-6 py-8 text-pearl-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-10 sm:py-11" style={{ borderTopColor: '#F7E7CE' }}>
            <Kicker text="Video-Challenge · kostenfrei" />
            <h1 className="mt-6 font-montserrat text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl">
              <span className="block text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.65)]">Sieben Tage</span>
              <span className="gold-text-animated block">für deine Wirkung.</span>
            </h1>
            <p className="mt-5 font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">Zeig dich. Sei dabei. Lerne deine Wirkungskraft kennen.</p>
            <p className="mt-5 max-w-xl font-inter text-lg leading-relaxed text-white">
              <b className="font-montserrat font-extrabold">So starten wir:</b> Jeden Tag eine kleine Anleitung für dich – und eine Chance auf Feedback. Du hast 24 Stunden, um dein Video einzureichen und ein kostenfreies persönliches Feedback zu erhalten.
            </p>
            <p className="mt-4 font-montserrat text-base font-bold text-[#EBD197]">
              Start immer montags – nächster Start: Montag, {montag}.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#anmelden" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                Ich bin dabei – eintragen
              </a>
              <a href="#tage" className="font-montserrat text-sm font-semibold text-[#EBD197] underline decoration-[#D4AF37]/50 underline-offset-4 hover:decoration-[#F7E7CE]">
                Die sieben Tage ansehen ↓
              </a>
            </div>
            <p className="mt-5 max-w-xl font-inter text-sm text-pearl-white/80">
              Die Challenge läuft in einer WhatsApp-Gruppe; dort sehen die Mitglieder gegenseitig die Handynummern. Wer das nicht möchte, schreibt mir direkt.
            </p>
          </div>
        </div>
      </header>

      {/* So läuft es - drei Zeilen, nicht mehr */}
      <Abschnitt id="ablauf" className="bg-pearl-white py-12 sm:py-16" label="ablauf-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="So läuft es" hell />
          <h2 id="ablauf-titel" className="sr-only">So läuft die Challenge</h2>
          <ol className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-3">
            {ABLAUF.map((s, i) => (
              <li key={s} style={{ ['--i' as string]: i }} className={`cc-stufe flex items-start gap-4 bg-white px-5 py-5 text-midnight-blue ${KACHEL}`}>
                <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-md font-montserrat text-sm font-black text-midnight-blue ${GOLD}`}>{i + 1}</span>
                <span className="font-inter text-[15px] leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Abschnitt>

      {/* Die sieben Tage als Klapp-Kacheln (Claudia, 09:19 UTC: "damit die ganze Anleitung nicht die
          Seite ueberflutet"), dazwischen der WhatsApp-Einstieg mit QR-Code. Vorschau bleibt sichtbar
          (Designliste: nie alles hinter einem Klick). Tag 1 ist aufgeklappt. */}
      <Abschnitt id="tage" className="bg-pearl-white pb-16 sm:pb-24" label="tage-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Dein Wegweiser" hell />
          <h2 id="tage-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Sieben Tage. Jeden Tag eine Anleitung – zum Aufklappen.
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-midnight-blue">
            Jeder Morgen beginnt mit den fünf Minuten von Tag 1 – und mit deinem Satz. So hörst du am Ende, was sich verändert hat.
          </p>

          <div className={`mt-8 grid gap-x-6 gap-y-3 bg-white px-5 py-5 text-midnight-blue sm:grid-cols-[auto_minmax(0,1fr)] sm:px-7 sm:py-6 ${KACHEL}`}>
            <span className={`self-start rounded-md px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Zuerst</span>
            <div className="min-w-0">
              <h3 className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{WEGWEISER.titel}</h3>
              <p className="mt-2 font-inter text-[15px] leading-relaxed sm:text-base">{WEGWEISER.text}</p>
              <p className="mt-2 font-inter text-[15px] leading-relaxed text-midnight-blue/80">{WEGWEISER.wie}</p>
            </div>
          </div>

          <div className="mt-3 grid gap-5 md:grid-cols-[34px_minmax(0,1fr)]">
          <Schiene />
          <ol ref={listeRef} className="grid list-none gap-3 p-0">
            {TAGE.map((t, i) => {
              const letzter = i === TAGE.length - 1;
              return (
                <li key={t.titel} style={{ ['--i' as string]: i }} className="cc-stufe">
                  <details className={`group bg-white text-midnight-blue ${KACHEL}`} open={i === 0}>
                    <summary className="grid cursor-pointer list-none gap-x-6 gap-y-2 px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
                      <span className={`self-start rounded-md px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] ${letzter ? `${GOLD} text-midnight-blue` : 'bg-midnight-blue text-pearl-white'}`}>
                        Tag {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{t.titel}</span>
                        <span className="mt-1 block font-inter text-[15px] leading-relaxed">{t.vorschau}</span>
                      </span>
                      <span className="flex items-center gap-2 font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#D4AF37] underline-offset-4">
                        <span className="group-open:hidden">Anleitung lesen</span>
                        <span className="hidden group-open:inline">Zuklappen</span>
                        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
                      </span>
                    </summary>
                    <div className="border-t border-[#D4AF37]/40 px-5 pb-6 pt-4 sm:px-7 sm:pb-7">
                      <p className="font-inter text-[15px] leading-relaxed sm:text-base">
                        <b className="font-montserrat font-extrabold">Deine Aufgabe: </b>
                        {t.aufgabe}
                      </p>
                      {t.satz && (
                        <blockquote className="mt-4 border-l-4 border-[#D4AF37] bg-pearl-white px-5 py-4 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-[1.7rem]">
                          „{t.satz}"
                        </blockquote>
                      )}
                      <p className="mt-4 font-montserrat text-sm font-extrabold uppercase tracking-[0.12em]">{t.schrittTitel}</p>
                      <ul className="mt-2 grid list-none gap-2 p-0">
                        {t.schritte.map((s) => (
                          <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed">
                            <Haken />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      {t.danach && <p className="mt-4 font-montserrat text-base font-bold">{t.danach}</p>}
                    </div>
                  </details>
                  {i === 0 && <ChallengeAnmeldung montag={montag} />}
                </li>
              );
            })}
          </ol>
          </div>
          <WhatsAppBlock />
        </div>
      </Abschnitt>

      {/* Fuer wen - und fuer wen nicht (Claudia, 22.09.2026: "fuer wen ist das? Und fuer wen ist das nicht?") */}
      <Abschnitt id="fuer-wen" className="bg-[#0A1628] py-14 text-pearl-white sm:py-20" label="fuer-wen-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Für wen das ist" />
          <h2 id="fuer-wen-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Sieben Tage sind kurz. Für die Richtigen reichen sie.
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[12px] border border-[#D4AF37]/40 bg-[#D4AF37]/30 sm:grid-cols-2">
            <div className="bg-[#0F1F3A] p-6 sm:p-7">
              <h3 className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EBD197]">Für dich, wenn du</h3>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {FUER.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed text-white"><Haken /><span>{s}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F1F3A] p-6 sm:p-7">
              <h3 className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-pearl-white/70">Nicht für dich, wenn du</h3>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {NICHT_FUER.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed text-pearl-white/80"><span aria-hidden="true" className="mt-0.5 font-montserrat font-black text-pearl-white/40">✕</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Abschnitt>


      {/* Nach Tag 7 - kurz */}
      <Abschnitt id="danach" className="py-14 text-pearl-white sm:py-20" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }} label="danach-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Nach Tag 7" />
          <h2 id="danach-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Sieben Tage sind ein Anfang. Wer weiter will, hat zwei Türen.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link to="/1-zu-1-mentoring" className={`block bg-[#13233F] p-6 no-underline ${KACHEL}`}>
              <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#EBD197]">Performance-Coaching</p>
              <p className="mt-2 font-montserrat text-xl font-extrabold text-white">Deine Wirkung, mit mir, eins zu eins.</p>
              <p className="mt-2 font-inter text-[15px] leading-relaxed text-pearl-white/85">Wir nehmen deinen Satz, deine Geschichte, deine Stimme – und machen daraus deinen Auftritt. Erstgespräch kostenlos.</p>
              <p className="mt-4 font-montserrat text-sm font-bold text-[#F7E7CE]">Mehr dazu →</p>
            </Link>
            <a href="https://community.claudiaconen.com/" target="_blank" rel="noopener noreferrer" className={`block bg-[#13233F] p-6 no-underline ${KACHEL}`}>
              <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#EBD197]">Netzwerk Mittelstand – deine Community</p>
              <p className="mt-2 font-montserrat text-xl font-extrabold text-white">Die Unverwechselbaren.</p>
              <p className="mt-2 font-inter text-[15px] leading-relaxed text-pearl-white/85">Menschen, die ihre Wirkung ernst nehmen – und sich gegenseitig eine Bühne geben. Dort wird aus sieben Tagen eine Gewohnheit.</p>
              <p className="mt-4 font-montserrat text-sm font-bold text-[#F7E7CE]">Zur Community →</p>
            </a>
          </div>
        </div>
      </Abschnitt>

      <Footer />
    </div>
  );
}
