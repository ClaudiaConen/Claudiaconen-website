import { useState } from 'react';

/**
 * Quizfragen unter einem Artikel.
 *
 * Claudias Wunsch vom 19.09.2026: "immer Fragen und Antworten ... und
 * vielleicht darunter Quizfragen dazu".
 *
 * ZWEI ENTSCHEIDUNGEN, die den Unterschied machen:
 *
 * 1. KEIN RICHTIG UND FALSCH ohne Begruendung. Nach dem Klick steht nicht
 *    nur, ob es stimmt, sondern WARUM. Ein Quiz, das nur bewertet, bringt
 *    nichts; eines, das erklaert, ist eine Uebung.
 *
 * 2. ALLE ANTWORTEN STEHEN IM QUELLTEXT, auch die noch nicht angeklickten.
 *    Sie sind nur visuell verborgen, nicht technisch. Genau das hat Claudia
 *    bei den sieben Schritten verlangt: aufklappbar, aber fuer KI lesbar.
 *    Deshalb aria-hidden NICHT setzen und die Erklaerungen nicht erst bei
 *    Bedarf erzeugen.
 *
 * Kein Punktestand, keine Auswertung am Ende. Wer sich selbst pruefen will,
 * soll nachdenken, nicht punkten.
 */
export type QuizFrage = {
  frage: string;
  antworten: { text: string; richtig?: boolean; warum: string }[];
};

export default function ArtikelQuiz({ fragen }: { fragen: QuizFrage[] }) {
  const [gewaehlt, setGewaehlt] = useState<Record<number, number>>({});

  return (
    <section className="mt-16 border-t border-midnight-blue/10 pt-12" aria-labelledby="quiz">
      <h2
        id="quiz"
        className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold"
      >
        Kurz nachgedacht
      </h2>
      <p className="mt-3 max-w-2xl font-inter text-base leading-relaxed text-midnight-blue/65">
        Drei Fragen zum Mitdenken. Es gibt keine Punkte und keine Auswertung — nur eine
        Begründung zu jeder Antwort.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {fragen.map((f, i) => {
          const wahl = gewaehlt[i];
          return (
            <div key={f.frage} className="border border-midnight-blue/10 bg-white p-6">
              <p className="font-montserrat text-base font-semibold leading-snug text-midnight-blue">
                {i + 1}. {f.frage}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {f.antworten.map((a, j) => {
                  const dran = wahl === j;
                  const richtig = Boolean(a.richtig);
                  return (
                    <button
                      key={a.text}
                      type="button"
                      onClick={() => setGewaehlt((g) => ({ ...g, [i]: j }))}
                      aria-pressed={dran}
                      className={
                        'rounded-sm border px-4 py-3 text-left font-inter text-sm leading-snug transition-colors ' +
                        (dran
                          ? richtig
                            ? 'border-luxury-gold bg-luxury-gold/10 text-midnight-blue'
                            : 'border-midnight-blue/30 bg-warm text-midnight-blue'
                          : 'border-midnight-blue/10 bg-white text-midnight-blue/80 hover:border-luxury-gold/50')
                      }
                    >
                      {a.text}
                    </button>
                  );
                })}
              </div>

              {/* Alle Begruendungen stehen im Quelltext. Sichtbar wird nur die
                  angeklickte - technisch sind sie fuer Suchmaschinen und KI
                  vollstaendig lesbar. */}
              <div className="mt-4 flex flex-col gap-2">
                {f.antworten.map((a, j) => (
                  <p
                    key={a.text + '-warum'}
                    hidden={wahl !== j}
                    className="border-l-4 border-luxury-gold bg-warm px-4 py-3 font-inter text-sm leading-relaxed text-midnight-blue/75"
                  >
                    <strong className="font-montserrat text-midnight-blue">
                      {a.richtig ? 'Das trifft es. ' : 'Naheliegend, aber: '}
                    </strong>
                    {a.warum}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
