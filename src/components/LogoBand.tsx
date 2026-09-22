/**
 * Laufendes Logo-Band: Buehnen, Medien, Partner und Kunden.
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
 * Nachtrag 22.09.2026 (Claudia: "ja bitte auch die anderen logos"): dazu
 * kommen die Logos der Kunden, die ihr eine Kundenstimme gegeben haben -
 * Kloster Kitchen, Volz Personalberatung, Freimuth Gorter, Miderma, Ing.-up,
 * Tobias Conrad. Jedes stammt von der eigenen Webseite des Kunden, ist nur
 * zugeschnitten (Rand weg, transparenter Grund), nicht veraendert. Seitdem
 * heisst die Zeile "... Partner und Kunden". NICHT aufgenommen: die Akademie
 * fuer Management-Kommunikation (Aimee Bastian sprach als Person, nicht fuer
 * die Akademie), Videographiq (Stephan arbeitet dort nicht mehr). Julien
 * Backhaus ist mit dem ERFOLG Magazin schon vertreten.
 *
 * Die Liste steht zweimal im Markup. Das ist Absicht: Die Animation schiebt
 * um genau die halbe Breite, dadurch laeuft das Band nahtlos. Die zweite
 * Haelfte ist fuer Vorleseprogramme ausgeblendet, damit die Namen nicht
 * doppelt vorgelesen werden.
 */

type Marke = { datei: string; name: string   /** Aus der Bilddatei ausgelesen. Ohne Groessenangabe haelt der
   *  Browser keinen Platz frei und die Seite springt beim Laden. */
  breite: number;
  hoehe: number;
};

const MARKEN: Marke[] = [
  { datei: 'sat1.png', name: 'Sat.1' , breite: 60, hoehe: 60 },
  { datei: 'rtl.svg', name: 'RTL' , breite: 120, hoehe: 40 },
  { datei: 'dometic.png', name: 'Dometic' , breite: 462, hoehe: 60 },
  { datei: 'klosterkitchen.png', name: 'Kloster Kitchen' , breite: 219, hoehe: 90 },
  { datei: 'gsa.png', name: 'German Speakers Association' , breite: 194, hoehe: 56 },
  { datei: 'volz.png', name: 'Volz Personalberatung' , breite: 270, hoehe: 90 },
  { datei: 'erde-dna.png', name: 'MRS. B' , breite: 60, hoehe: 60 },
  { datei: 'greator.png', name: 'Greator' , breite: 222, hoehe: 60 },
  { datei: 'speakerstars.png', name: 'Speakerstars' , breite: 265, hoehe: 60 },
  { datei: 'miderma.png', name: 'Miderma' , breite: 90, hoehe: 90 },
  { datei: 'gorter.png', name: 'Freimuth Gorter, Pohltherapie' , breite: 450, hoehe: 87 },
  { datei: 'powerofai.png', name: 'The Power of AI' , breite: 60, hoehe: 60 },
  { datei: 'blickwinkel.png', name: 'Eine Frage, 7 Blickwinkel' , breite: 185, hoehe: 60 },
  { datei: 'ing-up.png', name: 'Ing.-up' , breite: 90, hoehe: 90 },
  { datei: 'karrierebibel.svg', name: 'Karrierebibel' , breite: 120, hoehe: 40 },
  { datei: 'erfolg.png', name: 'ERFOLG Magazin' , breite: 330, hoehe: 60 },
  { datei: 'tobias-conrad.png', name: 'Tobias Conrad' , breite: 450, hoehe: 50 },
  { datei: 'charisma.png', name: 'Charisma Kongress' , breite: 60, hoehe: 60 },
];

export default function LogoBand() {
  return (
    <section className="bg-pearl-white py-14" aria-label="Bühnen, Medien, Partner und Kunden">
      <p className="mb-8 text-center font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-midnight-blue/45">
        Bühnen, Medien, Partner und Kunden
      </p>

      <div className="logo-band">
        <div className="logo-band-track">
          {MARKEN.map((m) => (
            <img
              key={m.datei}
              src={`/logos/${m.datei}`}
              alt={m.name}
              width={m.breite}
              height={m.hoehe}
              loading="lazy"
              decoding="async"
            />
          ))}
          {MARKEN.map((m) => (
            <img
              key={`${m.datei}-2`}
              src={`/logos/${m.datei}`}
              width={m.breite}
              height={m.hoehe}
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
