import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import Stimmwelle from './Stimmwelle';
import Brotkrumen from './Brotkrumen';
import HinweisRednerin from './HinweisRednerin';

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
  /** Kopfbild rechts neben Frage und Vorspann (22.09.2026) - nie Text ueber einem riesigen Foto.
   *  Hochkant 360x640 oder, mit bildQuer, 900x600. Liegt in public/seiten/. */
  bild?: string;
  bildAlt?: string;
  bildQuer?: boolean;
  seoTitel: string;
  seoText: string;
  /** dunkel = Standard, hell = festlich mit mehr Gold, ruhig = zurueckhaltend */
  stimmung?: 'dunkel' | 'hell' | 'ruhig';
  /** Rueckweg zur Dachseite. Wichtig bei Seiten, die ueber einen QR-Code
   *  geoeffnet werden: ohne ihn ist die Seite eine Sackgasse. */
  zurueck?: { text: string; ziel: string };
  /** Der Pfad von der Startseite bis hierher, ohne "Start".
   *  Ausdruecklich und nicht abgeleitet: Der Zurueck-Verweis sagt,
   *  wo man herkam, nicht, was ueber dieser Seite steht. */
  brotkrumen?: { name: string; ziel?: string }[];
  /** Goldene Klangwellen im Kopf. Nur fuer dunkle Stimmung gedacht -
   *  auf hellem Grund verschwindet Gold auf Creme. */
  welle?: boolean;
  /** Verwandte Seiten. Stehen VOR dem letzten Schritt, damit sie niemanden
   *  ablenken, der schon auf dem Weg zum Knopf ist. */
  weitere?: { titel: string; text: string; ziel: string }[];
  /** Das schmale Band zur Dachseite "Freie Rednerin". Steht bewusst NUR
   *  hinter Tuer 2 und nicht auf der Startseite: Ein Unternehmen, das eine
   *  Keynote sucht, soll Trauerfeier und Trauung nicht im Schaufenster
   *  sehen. Claudias Entscheidung vom 19.09.2026. */
  hinweisRednerin?: boolean;
  /** "Wofuer buchen Unternehmen eine Rednerin" - die Frage, die Einkaeufer
   *  wirklich eingeben. Jeder Eintrag ist eine zitierfaehige Einheit. */
  anlaesse?: { titel: string; text: string }[];
  anlaesseTitel?: string;
  anlaesseVorspann?: string;
  /** Zahlen MIT Quelle. Ohne Quelle kommt hier nichts hinein. */
  belege?: { zahl: string; aussage: string; quelle: string; url: string }[];
  belegeTitel?: string;
  belegeVorspann?: string;
  /** Platzhalter fuer Fotos, die noch fehlen. Jeder sagt, was dorthin gehoert. */
  bilder?: { bereich: string; motiv: string }[];
  /** "Nicht fuer dich, wenn ..." - Claudias eigene Gliederung aus
   *  ihrem Produktdokument, Teil C2. Ein Angebot, das jemanden
   *  wegschickt, wirkt wie eine Einschaetzung statt wie Werbung. */
  nichtFuer?: string[];
  nichtFuerTitel?: string;
  /** Eine Kundenstimme, die genau zu dieser Leistung gehoert (22.09.2026). Saetze woertlich
   *  aus dem Video, nie umformuliert. Das Video laedt erst beim Klick auf Abspielen. */
  kundenstimme?: {
    titel: string;
    name: string;
    rolle: string;
    saetze: string[];
    video: { quelle: string; standbild: string; breite: number; hoehe: number };
    verweis?: { text: string; ziel: string };
  };
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
        {inhalt.welle && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-70 sm:h-72"
          >
            <Stimmwelle />
          </div>
        )}
        <div className={`relative z-10 mx-auto px-6 ${inhalt.bild ? 'grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14' : 'max-w-4xl'}`}>
          <div className="min-w-0">
          {/* Der Pfad von der Startseite bis hierher. Er ersetzt den
              frueheren Zurueck-Verweis: derselbe Weg, aber vollstaendig
              und mit den Daten, aus denen Google den Pfad im
              Suchergebnis baut. */}
          <div className={`mb-7 ${s.kopfLeise}`}>
            <Brotkrumen
              krumen={
                inhalt.brotkrumen ?? [
                  ...(inhalt.zurueck
                    ? [{ name: inhalt.zurueck.text, ziel: inhalt.zurueck.ziel }]
                    : []),
                  { name: inhalt.wer },
                ]
              }
            />
          </div>
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
          {inhalt.bild && (
            <figure
              className={`m-0 justify-self-start overflow-hidden rounded-[10px] border border-[#D4AF37]/55 bg-[#13233F] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] md:justify-self-end ${
                inhalt.bildQuer ? 'aspect-[3/2] w-full max-w-[420px]' : 'aspect-[9/16] w-[clamp(180px,26vw,260px)]'
              }`}
            >
              <img
                src={inhalt.bild}
                alt={inhalt.bildAlt ?? ''}
                width={inhalt.bildQuer ? 900 : 360}
                height={inhalt.bildQuer ? 600 : 640}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </figure>
          )}
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

        {/* 3a. Eine Kundenstimme zu genau dieser Leistung. Deckende Flaeche, harte Kante, Goldrand -
            Claudias Kacheln (DESIGN_PRAEFERENZEN.md), kein Glas. */}
        {inhalt.kundenstimme && (
          <section className="bg-pearl-white py-16 sm:py-24" aria-labelledby="kundenstimme">
            <div className="mx-auto max-w-4xl px-6">
              <p className="flex items-center gap-3 font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-midnight-blue">
                <span aria-hidden="true" className="h-[3px] w-7 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
                Kundenstimme
              </p>
              <h2
                id="kundenstimme"
                className="mt-4 font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
              >
                {inhalt.kundenstimme.titel}
              </h2>
              <figure className="mt-8 grid overflow-hidden rounded-[10px] border border-[#D4AF37]/55 bg-[#13233F] text-pearl-white shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] md:grid-cols-2">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={inhalt.kundenstimme.video.standbild}
                  width={inhalt.kundenstimme.video.breite}
                  height={inhalt.kundenstimme.video.hoehe}
                  className="block h-full w-full bg-[#0A1628] object-cover"
                  aria-label={`Video: ${inhalt.kundenstimme.name} über die Zusammenarbeit`}
                >
                  <source src={inhalt.kundenstimme.video.quelle} type="video/mp4" />
                </video>
                <div className="flex flex-col justify-center gap-4 px-6 py-7 sm:px-8">
                  <blockquote className="flex flex-col gap-3 font-inter text-base leading-relaxed text-pearl-white/90">
                    {inhalt.kundenstimme.saetze.map((satz) => (
                      <p key={satz.slice(0, 24)}>„{satz}“</p>
                    ))}
                  </blockquote>
                  <figcaption className="border-t border-[#D4AF37]/40 pt-4">
                    <p className="font-montserrat text-base font-bold text-[#EBD197]">{inhalt.kundenstimme.name}</p>
                    <p className="font-inter text-sm text-pearl-white/80">{inhalt.kundenstimme.rolle}</p>
                    {inhalt.kundenstimme.verweis && (
                      <a
                        href={inhalt.kundenstimme.verweis.ziel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block font-inter text-sm text-pearl-white underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:text-[#EBD197]"
                      >
                        {inhalt.kundenstimme.verweis.text} ↗
                      </a>
                    )}
                  </figcaption>
                </div>
              </figure>
            </div>
          </section>
        )}

        {/* 3b. Wofuer gebucht wird */}
        {inhalt.anlaesse && inhalt.anlaesse.length > 0 && (
          <section className="bg-pearl-white py-16 sm:py-24" aria-labelledby="anlaesse">
            <div className="mx-auto max-w-4xl px-6">
              <h2
                id="anlaesse"
                className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
              >
                {inhalt.anlaesseTitel ?? 'Wofür Unternehmen eine Rednerin buchen'}
              </h2>
              {inhalt.anlaesseVorspann && (
                <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-midnight-blue/70">
                  {inhalt.anlaesseVorspann}
                </p>
              )}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {inhalt.anlaesse.map((a) => (
                  <div
                    key={a.titel}
                    className="border-l-4 border-luxury-gold bg-warm px-6 py-5"
                  >
                    <h3 className="font-montserrat text-base font-semibold text-midnight-blue">
                      {a.titel}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-midnight-blue/70">
                      {a.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3c. Belegte Zahlen */}
        {inhalt.belege && inhalt.belege.length > 0 && (
          <section
            className="py-16 sm:py-24"
            style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }}
            aria-labelledby="belege"
          >
            <div className="mx-auto max-w-4xl px-6">
              <h2
                id="belege"
                className="font-montserrat text-2xl font-bold text-pearl-white sm:text-3xl"
              >
                {inhalt.belegeTitel ?? 'Woran sich das messen lässt'}
              </h2>
              {inhalt.belegeVorspann && (
                <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/70">
                  {inhalt.belegeVorspann}
                </p>
              )}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {inhalt.belege.map((b) => (
                  <div
                    key={b.aussage}
                    className="glas px-6 py-6"
                  >
                    <p className="font-montserrat text-3xl font-bold text-luxury-gold">{b.zahl}</p>
                    <p className="mt-2 font-inter text-base leading-relaxed text-pearl-white/80">
                      {b.aussage}
                    </p>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-inter text-xs text-pearl-white/45 underline-offset-4 hover:text-luxury-gold hover:underline"
                    >
                      Quelle: {b.quelle}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3d. Bildplaetze. Claudias Vorgabe: immer Platzhalter lassen,
            und jeder sagt, welches Foto dorthin gehoert. */}
        {inhalt.bilder && inhalt.bilder.length > 0 && (
          <section className="bg-warm py-16 sm:py-20" aria-label="Bildplätze">
            <div className="mx-auto max-w-4xl px-6">
              <div className="grid gap-5 sm:grid-cols-3">
                {inhalt.bilder.map((b) => (
                  <figure key={b.bereich} className="flex flex-col" aria-hidden="true" data-bildplatz={b.bereich} data-motiv={b.motiv}>
                    <div
                      className="relative flex aspect-[4/3] items-end overflow-hidden rounded-lg border border-midnight-blue/10"
                      style={{
                        background:
                          'linear-gradient(135deg, #0F1F3A 0%, #16294A 55%, #1A2B4C 100%)',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'radial-gradient(60% 70% at 20% 15%, rgba(218,165,32,0.20), transparent 70%)',
                        }}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                        style={{ background: 'linear-gradient(90deg, #DAA520, #F4D03F, #DAA520)' }}
                      />
                      <figcaption className="relative px-5 py-4">
                        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-luxury-gold">
                          {b.bereich}
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* 4b. Fuer wen das nicht ist */}
        {inhalt.nichtFuer && inhalt.nichtFuer.length > 0 && (
          <section className="bg-warm py-16 sm:py-20" aria-labelledby="nichtfuer">
            <div className="mx-auto max-w-3xl px-6">
              <h2
                id="nichtfuer"
                className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
              >
                {inhalt.nichtFuerTitel ?? 'Nicht für Sie, wenn'}
              </h2>
              <ul className="mt-7 flex flex-col gap-4">
                {inhalt.nichtFuer.map((n) => (
                  <li key={n.slice(0, 26)} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 text-dark-gold">
                      &mdash;
                    </span>
                    <span className="font-inter text-base leading-relaxed text-midnight-blue/75">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-inter text-sm leading-relaxed text-midnight-blue/55">
                Das steht hier, weil es stimmt. Wenn einer dieser Punkte auf Sie zutrifft, sagen
                Sie es im Vorgespräch — dann sparen wir uns beide die Zeit.
              </p>
            </div>
          </section>
        )}

        {/* 5. Häufige Fragen */}
        <section className="bg-warm py-16 sm:py-24" aria-labelledby="fragen">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="fragen"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              Häufige Fragen
            </h2>
            {/* Pinnwand statt Liste. Die Antworten bleiben sichtbar im Text:
                Eingeklappt waere es fuer Menschen bequemer, aber Claudia will
                sie lesbar haben - fuer Suchmaschinen und fuer KI-Systeme. */}
            <dl className="mt-10 grid gap-5 sm:grid-cols-2">
              {inhalt.fragen.map((f) => (
                <div
                  key={f.frage}
                  className="glas-hell glas-heben flex flex-col p-6"
                >
                  <dt className="font-montserrat text-base font-semibold leading-snug text-midnight-blue">
                    {f.frage}
                  </dt>
                  <dd className="mt-3 font-inter text-sm leading-relaxed text-midnight-blue/75">
                    {f.antwort}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {inhalt.hinweisRednerin && <HinweisRednerin />}

        {/* 5b. Passt dazu */}
        {inhalt.weitere && inhalt.weitere.length > 0 && (
          <section className="bg-pearl-white py-16 sm:py-20" aria-labelledby="weitere">
            <div className="mx-auto max-w-4xl px-6">
              <h2
                id="weitere"
                className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold"
              >
                Passt dazu
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {inhalt.weitere.map((w) => (
                  <Link
                    key={w.ziel}
                    to={w.ziel}
                    className="glas-hell glas-heben group flex flex-col p-6"
                  >
                    <p className="font-montserrat text-base font-semibold text-midnight-blue">
                      {w.titel}
                    </p>
                    <p className="mt-2 flex-1 font-inter text-sm leading-relaxed text-midnight-blue/65">
                      {w.text}
                    </p>
                    <span className="mt-4 font-montserrat text-sm font-semibold text-dark-gold underline-offset-4 group-hover:underline">
                      Ansehen &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
