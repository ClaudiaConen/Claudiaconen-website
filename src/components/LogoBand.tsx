/**
 * Laufendes Logo-Band: Buehnen, Medien und Partner.
 *
 * Uebernommen aus dem Prototyp hautpseite26 (dort .logo-ticker). Dieses
 * Element beantwortet den dritten von fuenf Haupteinwaenden aus Claudias
 * Kritiker-Check: "Keine Beweise sichtbar." Zwoelf bekannte Namen wirken
 * staerker als jede Selbstbeschreibung.
 *
 * Die Beschriftung lautet bewusst "Buehnen, Medien und Partner" und nicht
 * "Kunden": Sat.1 und RTL sind Medienauftritte, die GSA ist ein Verband,
 * Greator und Speakerstars sind Plattformen. Eine falsche Behauptung an
 * dieser Stelle waere teurer als der Beweis wert ist.
 *
 * Die Liste steht zweimal im Markup. Das ist Absicht: Die Animation schiebt
 * um genau die halbe Breite, dadurch laeuft das Band nahtlos. Die zweite
 * Haelfte ist fuer Vorleseprogramme ausgeblendet, damit die Namen nicht
 * doppelt vorgelesen werden.
 */

type Marke = { datei: string; name: string };

const MARKEN: Marke[] = [
  { datei: 'sat1.png', name: 'Sat.1' },
  { datei: 'rtl.svg', name: 'RTL' },
  { datei: 'dometic.png', name: 'Dometic' },
  { datei: 'gsa.png', name: 'German Speakers Association' },
  { datei: 'erde-dna.png', name: 'MRS. B' },
  { datei: 'greator.png', name: 'Greator' },
  { datei: 'speakerstars.png', name: 'Speakerstars' },
  { datei: 'powerofai.png', name: 'The Power of AI' },
  { datei: 'blickwinkel.png', name: 'Eine Frage, 7 Blickwinkel' },
  { datei: 'karrierebibel.svg', name: 'Karrierebibel' },
  { datei: 'erfolg.png', name: 'ERFOLG Magazin' },
  { datei: 'charisma.png', name: 'Charisma Kongress' },
];

export default function LogoBand() {
  return (
    <section className="bg-pearl-white py-14" aria-label="Bühnen, Medien und Partner">
      <p className="mb-8 text-center font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-midnight-blue/45">
        Bühnen, Medien und Partner
      </p>

      <div className="logo-band">
        <div className="logo-band-track">
          {MARKEN.map((m) => (
            <img
              key={m.datei}
              src={`/logos/${m.datei}`}
              alt={m.name}
              loading="lazy"
              decoding="async"
            />
          ))}
          {MARKEN.map((m) => (
            <img
              key={`${m.datei}-2`}
              src={`/logos/${m.datei}`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
