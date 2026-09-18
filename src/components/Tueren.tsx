import { Link } from 'react-router-dom';

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
  },
];

export default function Tueren() {
  return (
    <section className="relative bg-midnight-blue" aria-labelledby="tueren-titel">
      {/* Platz fuer ein spaeteres Hintergrundvideo. Bis dahin ein ruhiger Verlauf. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-royal-navy/70 via-midnight-blue to-midnight-blue"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <header className="max-w-3xl">
          <h2
            id="tueren-titel"
            className="font-montserrat text-3xl font-bold leading-[1.1] tracking-tight text-pearl-white sm:text-5xl"
          >
            Würdest du DIR selbst zuhören?
          </h2>

          <p className="mt-5 font-montserrat text-xl font-semibold text-luxury-gold sm:text-2xl">
            Berühre Menschen. Bleib im Kopf.
          </p>

          <p className="mt-6 font-inter text-lg leading-relaxed text-pearl-white/75">
            KI liefert Perfektion auf Mausklick.
            <br />
            <span className="font-semibold text-pearl-white">
              Deine Unverwechselbarkeit schafft Vertrauen.
            </span>
          </p>

          <p className="mt-3 font-inter text-base italic text-pearl-white/60">mit und ohne KI</p>

          <p className="mt-7 font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-pearl-white/55">
            Rhetorik · Storytelling · Performance · Wirkung
          </p>
        </header>

        {/* Gestapelte Kacheln. Der wachsende Abstand nach oben laesst sie beim
            Scrollen uebereinander gleiten, die Skalierung gibt die Tiefe. */}
        <div className="mt-16 flex flex-col">
          {TUEREN.map((t, i) => (
            <div
              key={t.ziel}
              className="sticky mb-6 motion-reduce:static"
              style={{ top: `${72 + i * 18}px`, zIndex: i + 1 }}
            >
              <article
                className="rounded-xl border border-white/15 bg-white/[0.08] px-7 py-8 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(218,165,32,0.08)] backdrop-blur-xl transition duration-500 hover:border-luxury-gold/45 hover:shadow-[0_22px_60px_-12px_rgba(0,0,0,0.7),0_0_34px_-8px_rgba(218,165,32,0.35)] motion-reduce:transform-none motion-reduce:transition-none sm:px-10 sm:py-11"
                style={{ transform: `scale(${1 - (TUEREN.length - 1 - i) * 0.012})` }}
              >
                <h3 className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                  {t.wer}
                </h3>

                <p className="mt-4 font-montserrat text-xl font-bold leading-snug text-pearl-white sm:text-2xl">
                  {t.frage}
                </p>

                <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-pearl-white/70">
                  {t.problem}
                </p>

                <p className="mt-6 font-montserrat text-sm font-semibold text-pearl-white">
                  {t.vorspann}
                </p>

                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                  {t.stichworte.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-inter text-sm text-pearl-white/85"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <Link
                  to={t.ziel}
                  className="mt-7 inline-block font-montserrat text-base font-semibold text-luxury-gold underline decoration-luxury-gold/40 underline-offset-4 transition-colors hover:decoration-luxury-gold"
                >
                  {t.knopf} →
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
