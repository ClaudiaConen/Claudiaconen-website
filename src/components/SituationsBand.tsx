/**
 * Laufendes Band der Situationen: "Ueberall, wo wir den Mund aufmachen, ist Buehne."
 *
 * Uebernommen aus dem Prototyp hautpseite26 (.tickerbar.top). Eine Aenderung
 * gegenueber dem Original: Dort stand als Eintrag "in 180 ms". Das FUNDAMENT
 * verbietet feste Neuro-Zahlen, und der Kritiker-Check hat genau diese Zahl
 * als fachlich angreifbar markiert. Claudia hat am 18.09.2026 entschieden:
 * stattdessen "blitzschnell". Damit steht hier ihr Bild statt einer Zahl,
 * die niemand belegen kann.
 *
 * Die Liste steht zweimal im Markup, damit das Band nahtlos laeuft; die
 * zweite Haelfte ist fuer Vorleseprogramme ausgeblendet.
 */

const SITUATIONEN = [
  'Auf der großen Bühne',
  'im Kundengespräch',
  'am Telefon',
  'im Vier-Augen-Gespräch',
  'im Meeting',
  'im Team, das wieder brennt',
  'vor 500 Menschen',
  'auf der Messe',
  'im Radio',
  'im Podcast',
  'im Zoom-Call',
  'vor laufender Kamera',
  'auf Social Media',
  'bei der Firmen-Keynote',
  'in der Moderation',
  'beim Ja-Wort',
  'in Momenten, die bleiben',
  'beim Elevator Pitch',
  'wenn jedes Wort zählt',
  'blitzschnell',
  'wenn Vertrauen entsteht',
  'Empathie schlägt Algorithmus',
];

function Lauf({ still }: { still?: boolean }) {
  return (
    <span aria-hidden={still ? true : undefined}>
      {SITUATIONEN.map((s, i) => (
        <span key={`${s}-${i}`}>
          <span className="sit-wort">{s}</span>
          <span className="sit-punkt">•</span>
        </span>
      ))}
    </span>
  );
}

export default function SituationsBand() {
  return (
    <div className="sit-band" aria-label="Überall, wo wir den Mund aufmachen, ist Bühne">
      <div className="sit-track">
        <Lauf />
        <Lauf still />
      </div>
    </div>
  );
}
