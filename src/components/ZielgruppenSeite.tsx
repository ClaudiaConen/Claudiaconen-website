import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';

/**
 * Gemeinsames Geruest fuer die vier Zielgruppen-Seiten hinter den Tueren.
 *
 * Warum ein gemeinsames Geruest: Vier einzeln gebaute Seiten driften nach
 * dem dritten Aenderungswunsch auseinander. Hier liegt die Form an einer
 * Stelle und der Inhalt in vier Datensaetzen.
 *
 * Aufbau, in dieser Reihenfolge, und die Reihenfolge ist die Botschaft:
 *   1. Die Frage, die sich nur diese Zielgruppe stellt.
 *   2. Das Problem, konkret und ohne Schuldzuweisung.
 *   3. EIN Angebot. Nicht drei. Drei gleichrangige Angebote sind der
 *      Bauchladen-Einwand aus dem Kritiker-Check.
 *   4. Der Ablauf, damit niemand die Katze im Sack kauft.
 *   5. Haeufige Fragen, die ehrlich auch die unbequemen beantworten.
 *   6. EIN naechster Schritt.
 *
 * Fuer Maschinen: semantische Ueberschriften in richtiger Reihenfolge, dazu
 * strukturierte Daten als Service und FAQPage. Das ist der Teil, den KI-
 * Systeme lesen, wenn sie entscheiden, ob sie Claudia empfehlen.
 */

export type Frage = { frage: string; antwort: string };

export type ZielgruppenInhalt = {
  pfad: string;
  wer: string;
  frage: string;
  vorspann: string;
  problemTitel: string;
  problemAbsaetze: string[];
  angebotName: string;
  angebotZeile: string;
  angebotPreis: string;
  angebotPreisHinweis?: string;
  angebotPunkte: string[];
  ablaufTitel: string;
  ablauf: { schritt: string; text: string }[];
  fragen: Frage[];
  schrittTitel: string;
  schrittText: string;
  schrittKnopf: string;
  schrittZiel: string;
  bild?: string;
  bildAlt?: string;
  seoTitel: string;
  seoText: string;
};

export default function ZielgruppenSeite({ inhalt }: { inhalt: ZielgruppenInhalt }) {
  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: inhalt.angebotName,
        description: inhalt.angebotZeile,
        serviceType: inhalt.wer,
        areaServed: { '@type': 'Country', name: 'Deutschland' },
        provider: {
          '@type': 'Person',
          name: 'Claudia Conen',
          url: 'https://claudiaconen.com/',
        },
        url: `https://claudiaconen.com${inhalt.pfad}`,
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
      <SEO title={inhalt.seoTitel} description={inhalt.seoText} path={inhalt.pfad} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }}
      />

      <Navigation />

      {/* 1. Die Frage */}
      <header
        className="relative pt-36 pb-16 sm:pt-44 sm:pb-24"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)' }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
            {inhalt.wer}
          </p>
          <h1 className="mt-5 font-montserrat text-3xl font-bold leading-[1.15] tracking-tight text-pearl-white sm:text-5xl">
            {inhalt.frage}
          </h1>
          <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/75">
            {inhalt.vorspann}
          </p>
        </div>
      </header>

      <main>
        {/* 2. Das Problem */}
        <section className="bg-pearl-white py-16 sm:py-24" aria-labelledby="problem">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="problem"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              {inhalt.problemTitel}
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {inhalt.problemAbsaetze.map((a) => (
                <p key={a.slice(0, 24)} className="font-inter text-lg leading-relaxed text-midnight-blue/75">
                  {a}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Ein Angebot */}
        <section className="bg-warm py-16 sm:py-24" aria-labelledby="angebot">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="angebot"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              {inhalt.angebotName}
            </h2>
            <p className="mt-4 font-inter text-lg leading-relaxed text-midnight-blue/75">
              {inhalt.angebotZeile}
            </p>

            <div className="mt-8 border-l-4 border-luxury-gold bg-white px-7 py-8">
              <p className="font-montserrat text-3xl font-bold text-midnight-blue">
                {inhalt.angebotPreis}
              </p>
              {inhalt.angebotPreisHinweis && (
                <p className="mt-2 font-inter text-sm text-midnight-blue/60">
                  {inhalt.angebotPreisHinweis}
                </p>
              )}
              <ul className="mt-6 flex flex-col gap-3">
                {inhalt.angebotPunkte.map((p) => (
                  <li key={p} className="flex gap-3 font-inter text-base text-midnight-blue/80">
                    <span aria-hidden="true" className="text-luxury-gold">
                      ›
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Der Ablauf */}
        <section className="bg-pearl-white py-16 sm:py-24" aria-labelledby="ablauf">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="ablauf"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              {inhalt.ablaufTitel}
            </h2>
            <ol className="mt-8 flex flex-col gap-7">
              {inhalt.ablauf.map((s, i) => (
                <li key={s.schritt} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-montserrat text-2xl font-bold tabular-nums text-luxury-gold"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-montserrat text-lg font-semibold text-midnight-blue">
                      {s.schritt}
                    </p>
                    <p className="mt-1 font-inter text-base leading-relaxed text-midnight-blue/70">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Häufige Fragen */}
        <section className="bg-warm py-16 sm:py-24" aria-labelledby="fragen">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="fragen"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              Häufige Fragen
            </h2>
            <dl className="mt-8 flex flex-col gap-8">
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
          </div>
        </section>

        {/* 6. Ein nächster Schritt */}
        <section
          className="py-16 sm:py-24"
          style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)' }}
          aria-labelledby="schritt"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="schritt"
              className="font-montserrat text-2xl font-bold text-pearl-white sm:text-3xl"
            >
              {inhalt.schrittTitel}
            </h2>
            <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/75">
              {inhalt.schrittText}
            </p>
            <Link
              to={inhalt.schrittZiel}
              className="mt-8 inline-block rounded-sm bg-luxury-gold px-8 py-4 font-montserrat text-base font-semibold text-midnight-blue transition-colors hover:bg-bright-gold"
            >
              {inhalt.schrittKnopf}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
