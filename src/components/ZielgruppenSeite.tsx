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
  /** dunkel = Standard, hell = festlich mit mehr Gold, ruhig = zurueckhaltend */
  stimmung?: 'dunkel' | 'hell' | 'ruhig';
  /** Rueckweg zur Dachseite. Wichtig bei Seiten, die ueber einen QR-Code
   *  geoeffnet werden: ohne ihn ist die Seite eine Sackgasse. */
  zurueck?: { text: string; ziel: string };
};


/** Die drei Stimmungen. Werte aus der Marken-Referenz, nur anders gewichtet.
 *  hell:  festlich, viel Gold, warme helle Flaechen. Fuer Hochzeiten.
 *  ruhig: gedeckt, wenig Gold, viel Weissraum. Fuer Trauerfeiern. Kitsch
 *         entsteht durch Ueberschmueckung, deshalb hier bewusst weniger.
 *  dunkel: der Standard fuer Geschaeftsseiten.
 */
const STIMMUNG = {
  dunkel: {
    kopf: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)',
    kopfText: 'text-pearl-white',
    kopfLeise: 'text-pearl-white/75',
    marke: 'text-luxury-gold',
    fuss: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)',
    fussText: 'text-pearl-white',
    fussLeise: 'text-pearl-white/75',
    knopf: 'bg-luxury-gold text-midnight-blue hover:bg-bright-gold',
  },
  hell: {
    kopf: 'linear-gradient(180deg, #FFFEF9 0%, #F7F3EB 60%, #F2E8D5 100%)',
    kopfText: 'text-midnight-blue',
    kopfLeise: 'text-midnight-blue/70',
    marke: 'text-dark-gold',
    fuss: 'linear-gradient(180deg, #F7F3EB 0%, #F2E8D5 100%)',
    fussText: 'text-midnight-blue',
    fussLeise: 'text-midnight-blue/70',
    knopf: 'bg-midnight-blue text-pearl-white hover:bg-royal-navy',
  },
  ruhig: {
    kopf: 'linear-gradient(180deg, #FDFBF7 0%, #F4F1EC 100%)',
    kopfText: 'text-midnight-blue',
    kopfLeise: 'text-midnight-blue/65',
    marke: 'text-midnight-blue/45',
    fuss: 'linear-gradient(180deg, #F4F1EC 0%, #EDE9E3 100%)',
    fussText: 'text-midnight-blue',
    fussLeise: 'text-midnight-blue/65',
    knopf: 'bg-midnight-blue text-pearl-white hover:bg-royal-navy',
  },
} as const;

export default function ZielgruppenSeite({ inhalt }: { inhalt: ZielgruppenInhalt }) {
  const s = STIMMUNG[inhalt.stimmung ?? 'dunkel'];
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
        style={{ background: s.kopf }}
      >
        <div className="mx-auto max-w-4xl px-6">
          {inhalt.zurueck && (
            <Link
              to={inhalt.zurueck.ziel}
              className={`mb-7 inline-block font-inter text-sm underline-offset-4 hover:underline ${s.kopfLeise}`}
            >
              &larr; {inhalt.zurueck.text}
            </Link>
          )}
          <p className={`font-montserrat text-xs font-semibold uppercase tracking-[0.2em] ${s.marke}`}>
            {inhalt.wer}
          </p>
          <h1 className={`mt-5 font-montserrat text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl ${s.kopfText}`}>
            {inhalt.frage}
          </h1>
          <p className={`mt-6 max-w-2xl font-inter text-lg leading-relaxed ${s.kopfLeise}`}>
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
          style={{ background: s.fuss }}
          aria-labelledby="schritt"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="schritt"
              className={`font-montserrat text-2xl font-bold sm:text-3xl ${s.fussText}`}
            >
              {inhalt.schrittTitel}
            </h2>
            <p className={`mt-4 max-w-2xl font-inter text-lg leading-relaxed ${s.fussLeise}`}>
              {inhalt.schrittText}
            </p>
            <Link
              to={inhalt.schrittZiel}
              className={`mt-8 inline-block rounded-sm px-8 py-4 font-montserrat text-base font-semibold transition-colors ${s.knopf}`}
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
