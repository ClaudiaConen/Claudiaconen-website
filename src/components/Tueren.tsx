import { Link } from 'react-router-dom';

/**
 * Die vier Tueren: der Einstieg nach ZIELGRUPPE, nicht nach Format.
 *
 * Der Unterschied ist der ganze Punkt. Kacheln nach Format (Seminar, Keynote,
 * Coaching, Podcast) sind eine Rollenliste und genau der Einwand Nummer eins
 * aus dem Kritiker-Check. Kacheln nach Zielgruppe sind eine Weiche: Der
 * Besucher sortiert sich selbst ein.
 *
 * Reihenfolge nach Umsatzanteil, nicht nach Sympathie. Unternehmen zuerst,
 * weil dort zwei Drittel des Ziels liegen; diese Tuer bekommt als einzige
 * visuelles Gewicht, damit sich die vier nicht gegenseitig aufheben.
 *
 * Jede zweite Zeile nennt das PROBLEM, nicht das Angebot. Menschen erkennen
 * sich am Problem wieder, nicht an einer Leistungsbeschreibung.
 *
 * Die Knopftexte beginnen mit So, Was oder Wie: Ein Knopf mit Fragewort
 * verspricht eine Antwort, ein Knopf mit Verb verlangt eine Handlung. Beim
 * ersten Klick gibt man Antworten.
 */

type Tuer = {
  wer: string;
  problem: string;
  satz: string;
  knopf: string;
  ziel: string;
  betont?: boolean;
};

const TUEREN: Tuer[] = [
  {
    wer: 'Unternehmen und Teams',
    problem: 'Die KI ist eingeführt. Nur die Menschen ziehen nicht mit.',
    satz: 'Eure Werkzeuge sind da. Was fehlt, ist die Sprache, mit der ihr darüber redet.',
    knopf: 'So läuft ein Tag bei euch ab',
    ziel: '/unternehmen-keynotes',
    betont: true,
  },
  {
    wer: 'Selbstständige und Coaches',
    problem: 'Du hast etwas zu sagen. Es kommt nur nicht an.',
    satz: 'Deine Kompetenz steht nicht infrage. Deine Wirkung schon.',
    knopf: 'Was in zwölf Wochen passiert',
    ziel: '/1-zu-1-mentoring',
  },
  {
    wer: 'Speaker und Vortragende',
    problem: 'Die Bühne wartet. Dein Auftritt sitzt noch nicht.',
    satz: 'Ein guter Inhalt trägt dich bis zur ersten Reihe. Alles dahinter entscheidet deine Präsenz.',
    knopf: 'Wie du auf die Bühne kommst',
    ziel: '/redner-ausbildungen',
  },
  {
    wer: 'Einsteiger ab 50',
    problem: 'Alle reden von KI. Dich fragt niemand, ob du mitkommst.',
    satz: 'Keine Fachbegriffe, keine Eile, keine dummen Fragen. Nur der erste Schritt, in deinem Tempo.',
    knopf: 'Wie der erste Schritt aussieht',
    ziel: '/ki-einsteiger-coaching',
  },
];

export default function Tueren() {
  return (
    <section className="bg-pearl-white py-20 sm:py-28" aria-labelledby="tueren-titel">
      <div className="mx-auto max-w-5xl px-6">
        <h2
          id="tueren-titel"
          className="font-montserrat text-3xl font-bold tracking-tight text-midnight-blue sm:text-4xl"
        >
          Wofür bist du hier?
        </h2>
        <div className="mt-5 h-0.5 w-16 bg-luxury-gold" aria-hidden="true" />

        <div className="mt-12 flex flex-col gap-5">
          {TUEREN.map((t) => (
            <article
              key={t.ziel}
              className={
                t.betont
                  ? 'group border-l-4 border-luxury-gold bg-midnight-blue px-7 py-8 text-pearl-white sm:px-10 sm:py-10'
                  : 'group border-l-4 border-luxury-gold/40 bg-white px-7 py-8 text-midnight-blue sm:px-10 sm:py-10'
              }
            >
              <h3
                className={
                  t.betont
                    ? 'font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-luxury-gold'
                    : 'font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-midnight-blue/50'
                }
              >
                {t.wer}
              </h3>

              <p className="mt-3 font-montserrat text-xl font-bold leading-snug sm:text-2xl">
                {t.problem}
              </p>

              <p
                className={
                  t.betont
                    ? 'mt-3 max-w-2xl font-inter text-base leading-relaxed text-pearl-white/75'
                    : 'mt-3 max-w-2xl font-inter text-base leading-relaxed text-midnight-blue/70'
                }
              >
                {t.satz}
              </p>

              <Link
                to={t.ziel}
                className={
                  t.betont
                    ? 'mt-6 inline-block font-montserrat text-base font-semibold text-luxury-gold underline decoration-luxury-gold/40 underline-offset-4 transition-colors hover:decoration-luxury-gold'
                    : 'mt-6 inline-block font-montserrat text-base font-semibold text-midnight-blue underline decoration-midnight-blue/25 underline-offset-4 transition-colors hover:text-luxury-gold hover:decoration-luxury-gold'
                }
              >
                {t.knopf} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
