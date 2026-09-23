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
  problem: string;
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
    frage: 'Wie wird aus Kommunikation Vertrauen – und aus Vertrauen Geschäft?',
    problem:
      'Wenn Botschaften unklar bleiben, Teams unterschiedlich kommunizieren oder Verkaufsgespräche keine Verbindung schaffen, geht Wirkung verloren.',
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
    frage: 'Wie bleibt deine Botschaft im Kopf, wenn du längst aufgehört hast zu sprechen?',
    problem:
      'Eine gute Rede reicht nicht, wenn Story, Persönlichkeit und Performance keinen bleibenden Eindruck hinterlassen.',
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
    frage: 'Warum sollte man dich buchen – und nicht den nächsten Experten?',
    problem:
      'Kompetenz allein macht noch keine unverwechselbare Marke. Entscheidend ist, ob Menschen erkennen, wofür du stehst, dir vertrauen und dich im Kopf behalten.',
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
    frage: 'Wie nutzt du KI als Abkürzung – und bleibst trotzdem unverwechselbar?',
    problem:
      'KI kann Zeit schenken, Ideen beschleunigen und Arbeit erleichtern. Entscheidend ist, zu verstehen, was wirklich zu dir und deinem Business passt.',
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
        <h2
          id="tueren-frage"
          className="mb-10 font-montserrat text-2xl font-extrabold leading-tight text-midnight-blue sm:mb-14 sm:text-4xl"
        >
          Klar sprechen. Glaubwürdig auftreten. Vertrauen aufbauen.
          <span className="mt-3 block font-montserrat text-lg font-semibold text-midnight-blue/80 sm:text-2xl">Wofür bist du hier?</span>
        </h2>

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
                style={{ transform: `scale(${1 - (TUEREN.length - 1 - i) * 0.012})` }}
              >
               {/* Foto links, Text rechts (Claudia, 22.09.2026 21:31 UTC) - auf dem Handy das Foto oben, 16:9. */}
               <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <figure className="m-0 aspect-[16/9] overflow-hidden md:aspect-auto md:h-full">
                  <img src={`/tueren/${t.bild.datei}.webp`} alt={t.bild.alt} width={960} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </figure>
                <div className="px-7 py-8 sm:px-10 sm:py-11">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3>
                    <span
                      className={
                        'inline-block rounded-sm bg-midnight-blue px-4 py-2 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-pearl-white sm:text-base' +
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

                <p className="mt-5 font-montserrat text-2xl font-bold leading-[1.15] text-midnight-blue sm:text-3xl">
                  {t.frage}
                </p>

                <p className="mt-4 max-w-2xl font-inter text-sm leading-relaxed text-midnight-blue/65 sm:text-base">
                  {t.problem}
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

                <Link
                  to={t.ziel}
                  className="mt-7 inline-block font-montserrat text-base font-semibold text-dark-gold underline decoration-dark-gold/40 underline-offset-4 transition-colors hover:decoration-dark-gold"
                >
                  {t.knopf} →
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
        </div>
      </div>
    </section>
  );
}
