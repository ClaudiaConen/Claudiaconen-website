import { Link } from 'react-router-dom';
import Stimmwelle from './Stimmwelle';

/**
 * Impressionen: der Bildstreifen vor dem Fuss der Startseite.
 *
 * Claudia am 18.09.2026 um 23:06 zum unteren Teil der Startseite:
 * "Das als Bild muss noch mit Bildern mehr" und "Lebendige ansprechen
 * sein mit Fotos". Sie hat recht - ab dem letzten Textblock ist die
 * Seite nur noch dunkelblau mit zwei gelben Knoepfen.
 *
 * Die Fotos habe ich nicht. Deshalb steht hier vorerst die Form, und
 * zwar so, dass jeder Platz SAGT, welches Foto dorthin gehoert. Das ist
 * ehrlicher als ein gekauftes Stockfoto und nuetzlicher als ein graues
 * Rechteck: Claudia sieht auf einen Blick, welche vier Aufnahmen fehlen.
 *
 * Die Stimmwelle laeuft darueber hinweg, damit der Bereich auch ohne
 * Fotos schon lebt.
 *
 * ERSETZEN, sobald die Bilder da sind: je Eintrag eine Zeile mit dem
 * Dateinamen. Vorher durch /opt/vinci/tools/bild_verkleinern.py schicken,
 * Zielbreite rund 900 Pixel.
 */
const PLAETZE = [
  {
    bereich: 'Bühne',
    motiv: 'Quer, mit sichtbarem Publikum. Ein Saal zeigt eine gebuchte Rednerin, ein Foto allein nur eine Rednerin.',
    hoch: false,
  },
  {
    bereich: 'Im Raum',
    motiv: 'Workshop oder Training, im Gespräch mit Teilnehmenden. Nah, nicht gestellt.',
    hoch: true,
  },
  {
    bereich: 'Porträt',
    motiv: 'Hochformat, ruhiger Hintergrund. Das Bild, das später überall wiederkommt.',
    hoch: true,
  },
  {
    bereich: 'Detail',
    motiv: 'Mikrofon, Hände, Blick ins Publikum. Etwas Kleines, das die Arbeit zeigt.',
    hoch: false,
  },
];

export default function Impressionen() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }}
      aria-labelledby="impressionen"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-60 sm:h-64"
      >
        <Stimmwelle />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-luxury-gold">
          Impressionen
        </p>
        <h2
          id="impressionen"
          className="mt-5 max-w-2xl font-cormorant text-3xl italic leading-tight text-pearl-white sm:text-5xl"
        >
          Da, wo es wirklich passiert.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {PLAETZE.map((p) => (
            <figure key={p.bereich} className="flex flex-col">
              <div
                className={`relative flex items-end overflow-hidden rounded-lg border border-pearl-white/10 ${
                  p.hoch ? 'aspect-[3/4]' : 'aspect-[4/5]'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #0F1F3A 0%, #16294A 50%, #1A2B4C 100%)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(60% 70% at 20% 15%, rgba(218,165,32,0.20), transparent 70%), radial-gradient(50% 60% at 85% 90%, rgba(201,169,97,0.14), transparent 70%)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                  style={{ background: 'linear-gradient(90deg, #DAA520, #F4D03F, #DAA520)' }}
                />
                <figcaption className="relative px-5 py-5">
                  <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                    {p.bereich}
                  </p>
                  <p className="mt-2 font-inter text-xs leading-relaxed text-pearl-white/55">
                    {p.motiv}
                  </p>
                </figcaption>
              </div>
              <p className="mt-2 font-inter text-[11px] text-pearl-white/35">
                Platzhalter
              </p>
            </figure>
          ))}
        </div>

        <p className="mt-10 max-w-xl font-inter text-base leading-relaxed text-pearl-white/60">
          Wie das klingt, hörst du an anderer Stelle: sieben Gedanken, die meine Arbeit tragen,
          in meiner Stimme.
        </p>
        <Link
          to="/hoeren"
          className="mt-6 inline-block border-b-2 border-luxury-gold pb-1 font-montserrat text-sm font-semibold text-pearl-white transition-colors hover:text-luxury-gold"
        >
          Zur Hören-Seite →
        </Link>
      </div>
    </section>
  );
}
