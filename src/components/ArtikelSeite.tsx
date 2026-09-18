import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';

/**
 * Geruest fuer Artikel, die eine echte Frage beantworten.
 *
 * Gebaut fuer den Fall, dass eine KI entscheidet, wen sie zitiert. Was dabei
 * hilft, ist nicht Laenge, sondern Form:
 *
 *   1. Die Ueberschrift IST die Frage, wortgleich so, wie Menschen sie
 *      stellen. Kein Wortspiel.
 *   2. Die Antwort steht in den ersten zwei Saetzen, nicht am Ende. Wer
 *      zitiert, zitiert den Anfang.
 *   3. Konkrete Zahlen, Spannen und Bedingungen statt "es kommt darauf an".
 *   4. Was NICHT geht, steht auch drin. Eine Quelle, die nur wirbt, wird
 *      nicht zitiert.
 *   5. Strukturierte Daten als Article und FAQPage, mit Autorin und Datum.
 *
 * Bewusst KEINE erfundenen Studienzahlen. Das FUNDAMENT verbietet feste
 * Neuro-Zahlen, und eine unbelegte Zahl macht aus einer zitierfaehigen
 * Quelle eine angreifbare.
 */

export type Abschnitt = { titel: string; absaetze: string[]; liste?: string[] };

export type ArtikelInhalt = {
  pfad: string;
  frage: string;
  kurzantwort: string;
  vorspann: string;
  bereich: string;
  aktualisiert: string;
  abschnitte: Abschnitt[];
  fragen: { frage: string; antwort: string }[];
  weiter: { text: string; knopf: string; ziel: string };
  seoText: string;
};

export default function ArtikelSeite({ inhalt }: { inhalt: ArtikelInhalt }) {
  const daten = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: inhalt.frage,
        description: inhalt.kurzantwort,
        articleSection: inhalt.bereich,
        dateModified: inhalt.aktualisiert,
        inLanguage: 'de-DE',
        author: {
          '@type': 'Person',
          name: 'Claudia Conen',
          jobTitle: 'Keynote Speakerin und KI-Managerin (IHK)',
          url: 'https://claudiaconen.com/ueber-mich',
        },
        publisher: { '@type': 'Person', name: 'Claudia Conen' },
        mainEntityOfPage: `https://claudiaconen.com${inhalt.pfad}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: inhalt.fragen.map((f) => ({
          '@type': 'Question',
          name: f.frage,
          acceptedAnswer: { '@type': 'Answer', text: f.antwort },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO title={`${inhalt.frage} | Claudia Conen`} description={inhalt.seoText} path={inhalt.pfad} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
      />

      <Navigation />

      <article className="pt-36 pb-20 sm:pt-44">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold">
            {inhalt.bereich}
          </p>

          <h1 className="mt-5 font-montserrat text-3xl font-bold leading-[1.15] tracking-tight text-midnight-blue sm:text-4xl">
            {inhalt.frage}
          </h1>

          {/* Die Antwort zuerst. Wer zitiert, zitiert den Anfang. */}
          <div className="mt-8 border-l-4 border-luxury-gold bg-warm px-6 py-6">
            <p className="font-inter text-lg font-medium leading-relaxed text-midnight-blue">
              {inhalt.kurzantwort}
            </p>
          </div>

          <p className="mt-8 font-inter text-lg leading-relaxed text-midnight-blue/75">
            {inhalt.vorspann}
          </p>

          {inhalt.abschnitte.map((a) => (
            <section key={a.titel} className="mt-12">
              <h2 className="font-montserrat text-2xl font-bold text-midnight-blue">{a.titel}</h2>
              {a.absaetze.map((p) => (
                <p
                  key={p.slice(0, 28)}
                  className="mt-4 font-inter text-base leading-relaxed text-midnight-blue/80"
                >
                  {p}
                </p>
              ))}
              {a.liste && (
                <ul className="mt-5 flex flex-col gap-3">
                  {a.liste.map((l) => (
                    <li key={l} className="flex gap-3 font-inter text-base text-midnight-blue/80">
                      <span aria-hidden="true" className="text-dark-gold">
                        ›
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-16">
            <h2 className="font-montserrat text-2xl font-bold text-midnight-blue">
              Häufige Fragen dazu
            </h2>
            <dl className="mt-6 flex flex-col gap-7">
              {inhalt.fragen.map((f) => (
                <div key={f.frage}>
                  <dt className="font-montserrat text-lg font-semibold text-midnight-blue">
                    {f.frage}
                  </dt>
                  <dd className="mt-2 font-inter text-base leading-relaxed text-midnight-blue/75">
                    {f.antwort}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <aside className="mt-16 border-l-4 border-luxury-gold bg-warm px-6 py-7">
            <p className="font-inter text-base leading-relaxed text-midnight-blue/80">
              {inhalt.weiter.text}
            </p>
            <Link
              to={inhalt.weiter.ziel}
              className="mt-5 inline-block font-montserrat text-base font-semibold text-dark-gold underline decoration-dark-gold/40 underline-offset-4 hover:decoration-dark-gold"
            >
              {inhalt.weiter.knopf} →
            </Link>
          </aside>

          <footer className="mt-14 border-t border-midnight-blue/10 pt-6">
            <p className="font-inter text-sm text-midnight-blue/60">
              Geschrieben von Claudia Conen, Keynote Speakerin und KI-Managerin (IHK). Zuletzt
              geprüft am{' '}
              {new Date(inhalt.aktualisiert).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
              .
            </p>
          </footer>
        </div>
      </article>

      <Footer />
    </div>
  );
}
