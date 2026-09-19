import { Link } from 'react-router-dom';
import { megaMenuItems } from '../lib/megaMenuData';

/**
 * Die Seitenuebersicht am Fuss jeder Seite.
 *
 * Warum es sie gibt: Die vorgerenderte Startseite hatte am 19.09.2026
 * NULL interne Verweise. Das Aufklappmenue ist aus Knoepfen gebaut, und
 * Knoepfe haben kein href - ein Suchprogramm sieht sie nicht und findet
 * von der Startseite aus keine einzige Unterseite. Der einzige Weg
 * hinein war die sitemap.xml.
 *
 * Diese Uebersicht ist immer im Text, auf jeder Seite, als echte
 * Verweise. Damit kann jedes Programm die Seite durchlaufen - und ein
 * Mensch, der das Menue nicht mag, findet trotzdem alles.
 *
 * Die Liste kommt aus derselben Quelle wie das Menue. Ein neuer Punkt
 * dort steht automatisch auch hier; zwei Listen, die auseinanderlaufen,
 * waeren genau der Fehler, den es hier zu vermeiden gilt.
 */
export default function Seitenuebersicht() {
  const spalten = megaMenuItems.flatMap((bereich) =>
    bereich.categories.map((kat) => ({
      id: `${bereich.id}-${kat.id}`,
      titel: kat.label,
      ziele: [
        ...kat.tiles
          .filter((t) => !t.external && !t.href.startsWith('/#'))
          .map((t) => ({ name: t.name, href: t.href })),
        ...(kat.uebersicht ? [kat.uebersicht] : []),
      ],
    }))
  );

  return (
    <nav aria-label="Seitenübersicht" className="border-t border-dark-gold/15 bg-midnight-blue/95 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-dark-gold">
          Alle Seiten im Überblick
        </h2>

        <div className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {spalten.map((s) => (
            <div key={s.id}>
              <h3 className="font-montserrat text-sm font-semibold text-pearl-white/90">{s.titel}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {s.ziele.map((z) => (
                  <li key={z.href + z.name}>
                    <Link
                      to={z.href}
                      className="font-inter text-[0.82rem] leading-snug text-pearl-white/55 transition-colors duration-200 hover:text-dark-gold"
                    >
                      {z.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
