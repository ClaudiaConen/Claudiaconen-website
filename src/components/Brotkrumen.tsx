import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export type Krume = { name: string; ziel?: string };

/**
 * Brotkrumen: der Pfad von der Startseite bis hierher.
 *
 * Zwei Gruende, beide nachprüfbar:
 *
 * 1. Fuer Menschen. Wer ueber die Suche auf /trauerredner-ausbildung
 *    landet, sieht sonst nicht, wo er gelandet ist - und ob es hier
 *    noch mehr gibt. Der Weg zurueck nach oben ist ein Klick.
 *
 * 2. Fuer Google. Mit BreadcrumbList-Daten zeigt Google im Suchergebnis
 *    den Pfad an (Claudia Conen > Ausbildungen > Trauerredner) statt
 *    der nackten Adresse. Das ist mehr Flaeche und mehr Zusammenhang -
 *    ohne dass man etwas dafuer bezahlt.
 *
 * Die letzte Krume traegt nie einen Verweis. Ein Verweis auf die Seite,
 * auf der man schon steht, ist eine Sackgasse; aria-current sagt
 * Vorleseprogrammen, dass hier Schluss ist.
 */
export default function Brotkrumen({ krumen }: { krumen: Krume[] }) {
  if (krumen.length === 0) return null;

  const alle: Krume[] = [{ name: 'Start', ziel: '/' }, ...krumen];

  const daten = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: alle.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.name,
      ...(k.ziel ? { item: `https://claudiaconen.com${k.ziel}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
      />
      <nav aria-label="Sie sind hier" className="font-inter text-[0.78rem]">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {alle.map((k, i) => {
            const letzte = i === alle.length - 1;
            return (
              <li key={k.name + i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight size={12} aria-hidden="true" className="opacity-40" />
                )}
                {k.ziel && !letzte ? (
                  <Link to={k.ziel} className="opacity-60 transition-opacity hover:opacity-100">
                    {k.name}
                  </Link>
                ) : (
                  <span aria-current={letzte ? 'page' : undefined} className="opacity-90">
                    {k.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
