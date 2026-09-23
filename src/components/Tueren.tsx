import { Link } from 'react-router-dom';
import KachelStimme from './KachelStimme';

/**
 * Kopfzeile und die vier Tueren: der Einstieg nach ZIELGRUPPE, nicht nach Format.
 *
 * Texte: Wort fuer Wort von Claudia. Jede Tuer beginnt mit einer Frage, die
 * nur diese eine Zielgruppe sich stellt. Menschen erkennen sich an ihrer
 * eigenen Frage wieder, nicht an einer Leistungsbeschreibung.
 *
 * Effekt: vier gestapelte Kacheln, die beim Scrollen uebereinander gleiten
 * (position: sticky mit wachsendem Abstand nach oben), dazu eine leichte
 * Tiefenstaffelung und ein dezenter Goldschein. Ruhig, nicht verspielt.
 *
 * WICHTIG fuer jeden, der hier spaeter aendert: Der umgebende Abschnitt darf
 * KEIN overflow-hidden bekommen. Sticky funktioniert dann nicht mehr, und der
 * ganze Effekt faellt lautlos aus.
 *
 * Wer Animationen im Betriebssystem abgeschaltet hat, bekommt keine
 * Bewegung und keine Tiefenstaffelung, nur die vier Kacheln untereinander.
 */

type Tuer = {
  wer: string;
  frage: string;
  /** Ein Satz von Claudia je Tuer - kurz, warm, ihre Worte (Vorbild mymiapage.de, 23.09.2026). Ersetzt den Problem-Absatz. */
  satz: string;
  vorspann: string;
  stichworte: string[];
  knopf: string;
  ziel: string;
  /* Optionaler zweiter Verweis unter dem Knopf (22.09.2026: Claudia will die
     KI-Manager-Ausbildung von der Startseite aus verlinkt haben). */
  zweiter?: { text: string; ziel: string };
  /** Claudias Sprechtext zu dieser Tuer, z. B. '/audio/tuer-unternehmen.mp3'.
   *  Solange die Aufnahme fehlt, bleibt das Feld leer und es erscheint kein Knopf. */
  stimme?: string;
  /** Foto zum Thema, links neben dem Text (Claudia, 22.09.2026 21:31 UTC: "damit auch bessere Orientierung ist und die
   *  Kacheln nicht so untergehen"). Nur ihre eigenen Fotos, keine erkennbaren Dritten. Dateien in public/tueren/, 960x720. */
  bild: { datei: string; alt: string };
};

const TUEREN: Tuer[] = [
  {
    wer: 'Unternehmer & Teams',
    /* FREIGEGEBEN von Claudia 23.09.2026 15:05 UTC (Kachel 1, 9er-Fassung ohne Floskel). */
    frage: 'In Firmen durfte ich erleben, wie das beste Produkt am Gespräch scheitert – nicht am Wissen, sondern am Ton: am Telefon, beim Kunden, im Team. Worte, die kein Vertrauen wecken, bringen kein Geschäft. Was ein Team entzündet, ist die Energie der Führungskraft. Wie willst du deins stärken – damit aus Motivation Selbstsicherheit wird, aus Vertrauen Kunden?',
    satz: 'Wir verkaufen nicht an Brieftaschen. Wir verkaufen an den Menschen dahinter.',
    vorspann: 'Das verändert ihr:',
    stichworte: [
      'Klar kommunizieren',
      'Vertrauen stärken',
      'Emotional verkaufen',
      'Teams verbinden',
      'Kunden gewinnen',
    ],
    knopf: 'Mehr Wirkung im Unternehmen',
    ziel: '/unternehmen-keynotes',
    /* Claudia, 22.09.2026 22:49 UTC: "setze das 2. auf die 1. Karte" - Buehnenfoto hierher, Workshop-Foto auf die Speaker-Karte. */
    bild: { datei: 'speaker', alt: 'Claudia Conen auf der Bühne einer Benefizveranstaltung' },
  },
  {
    wer: 'Speaker & freie Redner',
    /* FREIGEGEBEN von Claudia 23.09.2026 15:11 UTC (Kachel 2, mit ihrer Ergaenzung 'einzigartige Buehnenidee'). */
    frage: 'Das Licht geht an, der Saal wartet – und jetzt zählt nicht dein Manuskript, sondern du. Niemand kennt deine Geschichte, deine Berufung, dein Ziel. Dabei ist genau sie deine Antwort auf die Herausforderungen dieser Zeit: Sie hebt dich aus der Masse der Angebote heraus und macht dich unvergleichbar. Ich finde mit dir die Worte, die einen Saal auf diese Reise mitnehmen – und den Weg von der Redeangst bis zur Selbstsicherheit für deine einzigartige Bühnenidee. An deiner Seite, so wie du bist.',
    satz: 'Berühre das Herz. Bleib im Kopf.',
    vorspann: 'Das entwickelst du:',
    stichworte: [
      'Storytelling',
      'Präsenz',
      'Performance',
      'Hörbare Persönlichkeit',
      'Emotionale Wirkung',
    ],
    knopf: 'Unverwechselbar sprechen',
    ziel: '/redner-ausbildungen',
    /* Claudia, 22.09.2026 23:09 UTC: neues Buehnenfoto (grosse Buehne mit Leinwand) hierher, das Workshop-Foto auf Karte 3. */
    bild: { datei: 'keynote', alt: 'Claudia Conen auf einer großen Bühne, hinter ihr die Leinwand mit ihrem Bild' },
  },
  {
    wer: 'Coaches & Trainer',
    /* FREIGEGEBEN von Claudia 23.09.2026 15:14 UTC (Kachel 3, mit ihrer Szene 'die Angst in den Augen'). */
    frage: 'Du bist gut in dem, was du tust. Und trotzdem klingst du wie alle anderen – gleiche Worte, gleiche Versprechen? Ich habe sie gesehen, die Angst in den Augen derer, die am Telefon keine Kunden gewinnen konnten. Kompetenz allein macht keine unverwechselbare Marke. Jeder Mensch ist unverwechselbar. Das zu erkennen und zu nutzen, ist das Gold von morgen. Ich höre, was andere überhören – und mache daraus deine Wirkung: eine Positionierung, die man hört, bevor man dich bucht. Damit die Wahl auf dich fällt und nicht auf den nächsten Experten.',
    satz: 'Die Stimme ist der Zugang. Die Persönlichkeit ist das Ergebnis.',
    vorspann: 'Das schärfst du:',
    stichworte: [
      'Positionierung',
      'Persönlichkeit',
      'Unverwechselbarkeit',
      'Vertrauen',
      'Kundengewinnung',
    ],
    knopf: 'Zur klaren Wahl werden',
    ziel: '/1-zu-1-mentoring',
    bild: { datei: 'unternehmen', alt: 'Claudia Conen im Workshop vor den Moderationswänden' },
  },
  {
    wer: 'KI-Einsteiger & Neugierige',
    /* FREIGEGEBEN von Claudia 23.09.2026 15:22 UTC (Kachel 4, 'Arbeitswelt veraendert' statt 'Arbeitsplatz nimmt'). */
    frage: 'Überall höre ich es: Hilfe, die KI kommt – was können wir tun? Dass sie die Arbeitswelt verändert, kann kaum jemand bestreiten. Wir definieren uns über unsere Arbeit, fürchten, den Anschluss zu verpassen – und stecken gleichzeitig im Hamsterrad. Was ist der Unterschied zwischen uns und der Maschine? Ich sage: Die Karten werden neu gemischt. In meinen Einsteigerkursen lernst du, mit KI Prozesse zu optimieren und die gewonnene Lebenszeit in Menschlichkeit zu investieren – denn genau damit hebst du dich aus der Masse heraus. Fang klein an.',
    satz: 'Der Mensch ist das Unikat. KI ist der Beschleuniger.',
    vorspann: 'Das gewinnst du:',
    stichworte: [
      'KI verstehen',
      'Sicher anwenden',
      'Zeit gewinnen',
      'Mensch & KI verbinden',
      'Persönlichkeit verstärken',
    ],
    knopf: 'Einfach mit KI starten',
    ziel: '/ki-einsteiger-coaching',
    bild: { datei: 'ki', alt: 'Claudia Conen mit dem Magazin The Power of AI in der Hand' },
    zweiter: { text: 'Oder gleich tiefer: KI-Manager-Ausbildung', ziel: '/ki-manager-ausbildung' },
  },
];

/** Fuenfte Kachel "Deine Mentorin" - Claudias Diktat vom 23.09.2026 (13:42 UTC), geglaettet; Mias Satz
 *  ("nicht darum, noch mehr zu tun") bewusst nicht uebernommen, "Menschen" nur einmal. Die Zahl 300 steht
 *  nur mit ihrer Bestaetigung. Foto: Platzhalter Workshop, bis ihr Bild kommt. */
const MENTORIN = {
  /* FREIGEGEBEN von Claudia 23.09.2026 15:30 UTC ("Okay") - Kachel 5, ihr Diktat 15:26 + Schlussfrage 15:28. */
  wer: 'Deine Mentorin',
  titel: 'Claudia als deine Mentorin',
  absatz:
    'Warum finden manche ihr Glück im Business – und andere nicht? Wofür brennst du, wofür würdest du Tag und Nacht bereitstehen, wenn es darauf ankommt? Welche Botschaft, welche Handlung steckt in dir? Ich durfte viele Menschen begleiten – manche ganz vorsichtig am Telefon, andere live vor Ort, mit einigen ging ich auf Reisen, raus aus dem Alltag, um herauszufinden, was sie wirklich wollen. Deine Stärken, deine Berufung, deine Positionierung – das macht den Unterschied. Aus Selbsterkenntnis wird Selbstbewusstsein, aus Ruhe wird Kraft. Kleine Schritte zu deinem Ziel. Nutzt du deine Lebenszeit für das, was in dir brennt?',
  punkte: [] as string[],
  knopf: 'Kostenloses Erstgespräch buchen',
  ziel: '/termin-buchen',
  bild: { datei: 'mentorin', alt: 'Claudia Conen mit Laptop in einer Lounge, den Blick zur Kamera' },
};

/** Einstieg ueber dem Stapel - Claudias Diktat vom 23.09.2026 (15:30 UTC), gewandelt; der Werbeslogan-Satz ist aus
 *  ihrem Diktat von 13:49 UTC. Wartet auf ihr Ja (Vorschau 16:08 UTC). */
const EINSTIEG =
  'Was macht uns als Menschen wirklich aus – gerade im Zeitalter der Vergleichbarkeit? Denk eine Sekunde nach: Welcher Werbeslogan sitzt in deinem Ohr, welche Stimme in deinem Kopf? Wir haben keine Reset-Taste. Worte speichern sich in uns, Emotionen übertragen sich, Geschichten faszinieren und begeistern. Genau darin liegt unsere Macht. Nutzen wir den Fortschritt und investieren die gewonnene Zeit, um uns als Unikat zu zeigen: nicht Perfektion auf Mausklick, sondern Menschlichkeit, die Vertrauen weckt.';

export default function Tueren() {
  return (
    <section className="relative bg-pearl-white" aria-labelledby="tueren-frage">
      {/* Platz fuer ein spaeteres Hintergrundvideo. Bis dahin ein ruhiger Verlauf. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F7F3EB 100%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">

        {/* Die Frage stand bisher NUR im aria-label des Abschnitts - also
            fuer Vorleseprogramme da und fuer sonst niemanden. Im
            sichtbaren Text kam sie null mal vor.

            Beim Vergleich mit yvonnedebark.de aufgefallen: Dort steht
            direkt unter der Ueberschrift "Was suchst du:" und darunter
            sechs benannte Tueren. Das ist ihr eigentliches
            Klarheitswerkzeug - eine direkte Frage, die sortiert, bevor
            jemand lesen muss.

            Eine Frage, kein Slogan. Sie trifft den Moment: Jemand ist
            gelandet und weiss noch nicht, wo er hingehoert. */}
        {/* Claudias Dreiklang vom 23.09.2026 (00:11 UTC) als Ueberschrift ueber den Tueren; die sortierende Frage bleibt darunter. */}
        {/* Wie bei mymiapage.de (Claudia, 23.09.2026 13:43 UTC): kleine Zeile, darunter die grosse Ueberschrift,
            dann ihr Ich-Text, dann die sortierende Frage direkt ueber den Kacheln. */}
        <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-midnight-blue/70 sm:text-sm">Deine Wege mit Claudia</p>
        <h2
          id="tueren-frage"
          className="mt-3 font-montserrat text-2xl font-extrabold leading-tight text-midnight-blue sm:text-4xl"
        >
          Klar sprechen. Glaubwürdig auftreten. Vertrauen aufbauen.
        </h2>
        <p className="mt-6 max-w-3xl font-inter text-base leading-relaxed text-midnight-blue sm:text-lg">{EINSTIEG}</p>
        <p className="mb-10 mt-6 font-montserrat text-lg font-semibold text-midnight-blue sm:mb-14 sm:text-2xl">Wofür bist du hier?</p>

        {/* Gestapelte Kacheln. Der wachsende Abstand nach oben laesst sie beim
            Scrollen uebereinander gleiten, die Skalierung gibt die Tiefe. */}
        <div className="flex flex-col">
          {TUEREN.map((t, i) => (
            <div
              key={t.ziel}
              className="sticky mb-6 motion-reduce:static"
              style={{ top: `${72 + i * 18}px`, zIndex: i + 1 }}
            >
              <article
                className="tuer-karte overflow-hidden rounded-xl motion-reduce:transform-none"
                style={{ transform: `scale(${1 - (TUEREN.length - i) * 0.012})` }}
              >
               {/* Foto abwechselnd links und rechts, schmaler als der Text (Claudia, 23.09.2026 13:45 UTC: "Bilder wechseln mal
                   rechts und links", "nicht so viel fuer mein Bild ... eher die Botschaft") - auf dem Handy das Foto oben, 16:9. */}
               <div className={`grid ${i % 2 === 0 ? 'md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]' : 'md:grid-cols-[minmax(0,1.38fr)_minmax(0,0.62fr)]'}`}>
                <figure className={`m-0 aspect-[16/9] overflow-hidden md:aspect-auto md:h-full ${i % 2 === 0 ? '' : 'md:order-2'}`}>
                  <img src={`/tueren/${t.bild.datei}.webp`} alt={t.bild.alt} width={960} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </figure>
                <div className="px-7 py-8 sm:px-10 sm:py-11">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3>
                    <span
                      className={
                        'inline-block rounded-sm bg-[#13233F] px-4 py-2 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-pearl-white sm:text-base' +
                        (i === 0 ? ' tuer-marke-puls' : '')
                      }
                    >
                      {t.wer}
                    </span>
                  </h3>
                  <KachelStimme
                    quelle={t.stimme}
                    aufHell
                    beschreibung={`Claudia erzählt, was hinter der Tür „${t.wer}" liegt`}
                  />
                </div>

                {/* Ihr Satz gross, die Frage darunter (23.09.2026, Vorbild mymiapage.de: ein Satz statt Erklaertext). */}
                <p className="mt-5 font-montserrat text-2xl font-bold leading-[1.15] text-midnight-blue sm:text-3xl">
                  {t.satz}
                </p>

                <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-midnight-blue/80 sm:text-lg">
                  {t.frage}
                </p>

                <p className="mt-6 font-montserrat text-sm font-semibold text-midnight-blue">
                  {t.vorspann}
                </p>

                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                  {t.stichworte.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-luxury-gold/35 bg-white/70 px-3 py-1 font-inter text-sm text-midnight-blue/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <Link to={t.ziel} className="cc-knopf mt-7">
                  {t.knopf}
                </Link>
                {t.zweiter && (
                  <Link
                    to={t.zweiter.ziel}
                    className="ml-6 mt-7 inline-block font-inter text-sm font-medium text-midnight-blue/70 underline decoration-midnight-blue/25 underline-offset-4 transition-colors hover:text-dark-gold hover:decoration-dark-gold"
                  >
                    {t.zweiter.text} →
                  </Link>
                )}
                </div>
               </div>
              </article>
            </div>
          ))}

          {/* Fuenfte Karte: Deine Mentorin - Aufbau wie "Ueber deine Mentorin" bei mymiapage.de (Claudias Vorbild, 23.09.2026):
              kleine Zeile, grosse Ueberschrift, Absatz, drei Haken, Knopf. Bild rechts und schmal - "eher die Botschaft". */}
          <div className="sticky mb-6 motion-reduce:static" style={{ top: `${72 + TUEREN.length * 18}px`, zIndex: TUEREN.length + 1 }}>
            <article className="tuer-karte overflow-hidden rounded-xl motion-reduce:transform-none">
              <div className="grid md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
                <figure className="m-0 aspect-[16/9] overflow-hidden md:aspect-auto md:h-full">
                  <img src={`/tueren/${MENTORIN.bild.datei}.webp`} alt={MENTORIN.bild.alt} width={960} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: '50% 18%' }} />
                </figure>
                <div className="px-7 py-8 sm:px-10 sm:py-11">
                  <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-midnight-blue/70 sm:text-sm">Über deine Mentorin</p>
                  <h3 className="mt-3 font-montserrat text-2xl font-extrabold leading-tight text-midnight-blue sm:text-3xl">{MENTORIN.titel}</h3>
                  <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-midnight-blue sm:text-lg">{MENTORIN.absatz}</p>
                  {MENTORIN.punkte.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {MENTORIN.punkte.map((pkt) => (
                      <li key={pkt} className="flex items-start gap-3 font-inter text-base text-midnight-blue">
                        <span aria-hidden="true" className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] text-[11px] font-bold text-midnight-blue">✓</span>
                        <span>{pkt}</span>
                      </li>
                    ))}
                  </ul>
                  )}
                  <Link to={MENTORIN.ziel} className="cc-knopf mt-7">
                    {MENTORIN.knopf}
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
