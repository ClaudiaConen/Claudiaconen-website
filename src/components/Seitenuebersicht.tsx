import { Link } from 'react-router-dom';
import { megaMenuItems } from '../lib/megaMenuData';

/**
 * Die schlanke Wegweiser-Zeile am Fuss jeder Seite.
 *
 * Vorgeschichte, damit niemand sie versehentlich wieder aufblaeht:
 * Am 19.09.2026 stand hier die vollstaendige Liste aller Seiten - vier
 * Spalten, einundsechzig Verweise. Der Grund war nicht Gestaltung,
 * sondern Not: Das Aufklappmenue wurde nur gerendert, WENN es offen
 * ist. Ein Suchprogramm oeffnet kein Menue, also sah es keinen einzigen
 * Verweis, und die Startseite war eine Sackgasse.
 *
 * Claudia am 20.09.2026: "ich find das nicht gut, wenn alles unten in
 * dem Futter steht." Sie hat recht - eine Notloesung gehoert nicht in
 * die Gestaltung.
 *
 * Die Not ist seit dem 20.09.2026 behoben: Das Menuefeld steht jetzt
 * immer im HTML und wird nur per CSS ausgeblendet. Damit stehen
 * einundsechzig Verweise im Quelltext jeder Seite, ohne dass unten
 * etwas lang wird. Diese Zeile hier ist nur noch das, was sie sein
 * sollte: ein kurzer Wegweiser fuer Menschen, die nicht ins Menue
 * wollen.
 */
export default function Seitenuebersicht() {
  // Nur die Hauptwege, einer je Bereich - nicht jede einzelne Seite.
  const wege = megaMenuItems.flatMap((bereich) =>
    bereich.categories
      .filter((kat) => kat.uebersicht)
      .map((kat) => ({ titel: kat.label, ...kat.uebersicht! }))
  );

  if (wege.length === 0) return null;

  return (
    <nav aria-label="Schnellwege" className="border-t border-dark-gold/15 bg-midnight-blue/95 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {wege.map((w) => (
            <li key={w.href + w.name}>
              <Link
                to={w.href}
                className="font-inter text-[0.8rem] text-pearl-white/50 transition-colors duration-200 hover:text-dark-gold"
              >
                {w.titel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
