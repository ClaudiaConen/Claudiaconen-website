import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import KippKarte from '../components/KippKarte';

/**
 * /freie-rednerin — die Dachseite.
 *
 * Claudias Auftrag vom 18.09.2026 um 22:41: "Freie Rednerin / Die Stimme
 * fuers Herz / und Rednerausbildung auf eine Seite setzen ... So dass klar
 * ist, dass ich als Rednerin buchbar bin und auf der unteren Seite das
 * Angebot zur freien Redner Ausbildung."
 *
 * WAS DER MARKT MACHT (Recherche 18.09.2026): Die groessten Anbieter trennen
 * beides auf ZWEI DOMAINS — freieredner.com fuer das Buchen, freieredner-
 * ausbildung.com fuer das Lernen. Der Grund ist nicht Technik, sondern
 * Publikum: Auf der einen Seite sitzt eine Familie, die gerade jemanden
 * verloren hat. Auf der anderen jemand, der ueber einen Berufswechsel
 * nachdenkt. Zwei Menschen, die weniger gemeinsam haben als fast jedes
 * andere Besucherpaar einer Website.
 *
 * DESHALB DIESER AUFBAU: Eine Seite, aber die Gabelung steht GANZ OBEN, vor
 * allem anderen. Wer trauert, klickt links und sieht den Ausbildungsteil nie.
 * Wer Rednerin werden will, springt rechts direkt nach unten. Die zwei
 * Haelften sind auch farblich zwei Welten: hell und warm oben, tiefes Blau
 * unten. Das ist die Trennung der zwei Domains, uebersetzt in eine Seite.
 *
 * Was NICHT behauptet wird: kein IHK-Zertifikat (haben die Wettbewerber, sie
 * nicht), keine Zahl von Ausbildungsteilnehmern, kein Preis. Preise stehen
 * erst drauf, wenn Claudia sie entschieden hat.
 */

type Anlass = {
  titel: string;
  zeile: string;
  text: string;
  knopf: string;
  ziel: string;
};

const ANLAESSE: Anlass[] = [
  {
    titel: 'Trauerfeier',
    zeile: 'Wenn die Worte fehlen',
    text:
      'Ich berühre mit persönlichen Lebensgeschichten. Angehörige sollen lebendige Momente im Herzen spüren — so, wie der Mensch wirklich war. Nicht wie ein Lebenslauf klingt.',
    knopf: 'Zur Trauerrede',
    ziel: '/trauerrede',
  },
  {
    titel: 'Freie Trauung',
    zeile: 'Wenn zwei Menschen Ja sagen',
    text:
      'Eine Zeremonie, die nur zu euch passt. Aus eurer Geschichte geschrieben, vorab zum Lesen und Ändern, und am Tag selbst getragen von einer Stimme, die auch in der letzten Reihe ankommt.',
    knopf: 'Zur freien Trauung',
    ziel: '/freie-trauung',
  },
  {
    titel: 'Andere Anlässe',
    zeile: 'Jubiläum, Abschied, Willkommensfest',
    text:
      'Überall, wo jemand vor Menschen steht und es ernst meint. Ein rundes Firmenjubiläum, der Abschied aus dem Berufsleben, die Begrüßung eines Kindes. Erzählen Sie mir den Anlass, dann sage ich Ihnen, ob ich die Richtige bin.',
    knopf: 'Anlass schildern',
    ziel: '/termin-buchen',
  },
];

type Weg = {
  titel: string;
  zeile: string;
  text: string;
  punkte: string[];
  knopf: string;
  ziel: string;
};

const WEGE: Weg[] = [
  {
    titel: 'Speakerin werden',
    zeile: 'Für die Bühne',
    text:
      'Sie haben ein Fachgebiet. Was fehlt, ist das Thema, mit dem ein Veranstalter Sie ankündigt — und eine Stimme, die einen Saal hält.',
    punkte: ['Vom Fachgebiet zum Thema', 'Die Keynote bauen', 'Auftritt und Aufnahme'],
    knopf: 'Zur Ausbildung',
    ziel: '/speaker-ausbildung',
  },
  {
    titel: 'Freie Rednerin werden',
    zeile: 'Der ganze Weg',
    text:
      'Für alle, die vor Menschen sprechen wollen, wenn es zählt — bei Hochzeiten, Abschieden, Festen. Handwerk, Stimme und Haltung in einem Durchgang.',
    punkte: ['Stimme und Wirkung', 'Aus einem Leben eine Rede machen', 'Der Auftritt selbst'],
    knopf: 'Zur Ausbildung',
    ziel: '/freie-redner-ausbildung',
  },
  {
    titel: 'Hochzeitsrednerin werden',
    zeile: 'Bewegend, ohne kitschig zu werden',
    text:
      'Die häufigste Bitte von Paaren ist: bewegend, aber bitte nicht rührselig. Genau da liegt das Handwerk, und genau das steht im Mittelpunkt.',
    punkte: ['Das Paargespräch, das alles trägt', 'Zeremonie und Ritual aufbauen', 'Der Tag selbst, mit Technik und Wetter'],
    knopf: 'Zur Ausbildung',
    ziel: '/hochzeitsredner-ausbildung',
  },
  {
    titel: 'Trauerrednerin werden',
    zeile: 'Der schwerste und der schönste Teil',
    text:
      'Wer Abschiede begleitet, braucht zwei Dinge: das Handwerk und einen Umgang mit dem, was die Arbeit mit einem selbst macht. Beides ist lernbar.',
    punkte: ['Das Gespräch mit Angehörigen führen', 'Ein Leben in Worte fassen', 'Nähe halten, ohne zu zerbrechen'],
    knopf: 'Zur Ausbildung',
    ziel: '/trauerredner-ausbildung',
  },
];

const FRAGEN = [
  {
    frage: 'Sie sind Rednerin und bilden gleichzeitig aus. Ist das kein Widerspruch?',
    antwort:
      'Nein, es ist die Voraussetzung. Ich unterrichte nichts, was ich nicht selbst am Wochenende davor gemacht habe. Wer nur noch unterrichtet, verliert nach zwei Jahren den Kontakt zu dem, was im Raum wirklich passiert.',
  },
  {
    frage: 'Ich suche eine Rednerin und will mit der Ausbildung nichts zu tun haben.',
    antwort:
      'Dann klicken Sie oben auf den linken Weg. Sie landen direkt auf der Seite zu Ihrem Anlass, und die Ausbildung kommt dort nicht vor.',
  },
  {
    frage: 'Gibt es bei Ihnen ein IHK-Zertifikat?',
    antwort:
      'Nein. Mehrere Anbieter im Markt vergeben eines, ich nicht. Was Sie bei mir bekommen, ist Arbeit an Stimme, Wirkung und Handwerk aus fünfunddreißig Jahren Praxis. Wenn ein Zertifikat für Sie entscheidend ist, sagen Sie es im Gespräch — dann nenne ich Ihnen die Anbieter, die eines ausstellen.',
  },
  {
    frage: 'Was kostet die Ausbildung?',
    antwort:
      'Das bespreche ich im Vorgespräch, weil es von Umfang und Format abhängt. Zur Einordnung des Marktes: Reine Video-Ausbildungen beginnen bei rund 950 Euro, mehrtägige Seminare liegen bei 2.900 bis 3.600 Euro.',
  },
  {
    frage: 'Kann ich das nebenberuflich machen?',
    antwort:
      'Ja, und die meisten tun es am Anfang. Trauerfeiern liegen werktags, Trauungen am Wochenende. Wer beides anbietet, kommt schneller auf eine tragfähige Anzahl von Aufträgen als wer sich auf einen Anlass beschränkt.',
  },
];

const STRUKTUR = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Claudia Conen',
      jobTitle: 'Freie Rednerin und Rednerausbilderin',
      url: 'https://claudiaconen.com/freie-rednerin',
      knowsAbout: ['Trauerrede', 'Freie Trauung', 'Rednerausbildung', 'Stimme', 'Rhetorik'],
    },
    {
      '@type': 'Service',
      name: 'Freie Rednerin für Trauerfeiern, Trauungen und Feste',
      serviceType: 'Freie Rednerin',
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      provider: { '@type': 'Person', name: 'Claudia Conen' },
      url: 'https://claudiaconen.com/freie-rednerin',
    },
    ...WEGE.map((w) => ({
      '@type': 'Course',
      name: w.titel,
      description: w.text,
      url: `https://claudiaconen.com${w.ziel}`,
      provider: { '@type': 'Person', name: 'Claudia Conen' },
    })),
    {
      '@type': 'FAQPage',
      mainEntity: FRAGEN.map((f) => ({
        '@type': 'Question',
        name: f.frage,
        acceptedAnswer: { '@type': 'Answer', text: f.antwort },
      })),
    },
  ],
};

export default function FreieRednerin() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Freie Rednerin — Die Stimme fürs Herz | Claudia Conen"
        description="Claudia Conen als freie Rednerin buchen: Trauerfeier, freie Trauung und besondere Anlässe. Und die Ausbildung für alle, die selbst Rednerin oder Redner werden wollen."
        path="/freie-rednerin"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUKTUR) }}
      />

      <Navigation />

      {/* Kopf: der Satz, und sofort danach die Gabelung. */}
      <header
        className="relative pt-36 pb-16 sm:pt-44 sm:pb-20"
        style={{ background: 'linear-gradient(180deg, #FFFEF9 0%, #F8F5EF 55%, #F3EDE2 100%)' }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-dark-gold">
            Freie Rednerin
          </p>
          <h1 className="mt-6 font-cormorant text-5xl italic leading-[1.05] text-midnight-blue sm:text-7xl">
            Die Stimme fürs Herz
          </h1>
          <p className="mt-6 max-w-2xl font-inter text-xl leading-relaxed text-midnight-blue/70">
            Das Leben in gelebten Worten.
          </p>
        </div>

        {/* Die Gabelung. Steht bewusst vor allem anderen. */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 px-6 sm:grid-cols-2">
          <a
            href="#anlaesse"
            className="group block border border-luxury-gold/40 bg-white px-7 py-8 transition-all hover:border-luxury-gold hover:shadow-lg"
          >
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-dark-gold">
              Ich suche eine Rednerin
            </p>
            <p className="mt-4 font-cormorant text-3xl italic leading-tight text-midnight-blue">
              Für unseren Anlass
            </p>
            <p className="mt-3 font-inter text-base leading-relaxed text-midnight-blue/65">
              Trauerfeier, freie Trauung, Jubiläum. Sie buchen mich als Rednerin.
            </p>
            <span className="mt-5 inline-block font-montserrat text-sm font-semibold text-midnight-blue underline-offset-4 group-hover:underline">
              Anlässe ansehen ↓
            </span>
          </a>

          <a
            href="#ausbildung"
            className="group block border border-midnight-blue/15 bg-midnight-blue px-7 py-8 transition-all hover:border-luxury-gold hover:shadow-lg"
          >
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-luxury-gold">
              Ich möchte Rednerin werden
            </p>
            <p className="mt-4 font-cormorant text-3xl italic leading-tight text-pearl-white">
              Für meinen Weg
            </p>
            <p className="mt-3 font-inter text-base leading-relaxed text-pearl-white/70">
              Die Ausbildung für alle, die selbst vor Menschen sprechen wollen.
            </p>
            <span className="mt-5 inline-block font-montserrat text-sm font-semibold text-luxury-gold underline-offset-4 group-hover:underline">
              Zur Ausbildung ↓
            </span>
          </a>
        </div>
      </header>

      <main>
        {/* TEIL 1 — buchen */}
        <section id="anlaesse" className="scroll-mt-24 bg-pearl-white py-20 sm:py-28" aria-labelledby="anlaesse-titel">
          <div className="mx-auto max-w-5xl px-6">
            <h2
              id="anlaesse-titel"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              Verschiedene Anlässe
            </h2>
            <p className="mt-4 max-w-2xl font-inter text-lg leading-relaxed text-midnight-blue/70">
              Die Bühne ist da, wo jemand den Mund aufmacht. Das ist mal ein Saal mit dreihundert
              Gästen und mal ein Raum mit elf Menschen, die geweint haben.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {ANLAESSE.map((a) => (
                <article
                  key={a.titel}
                  className="flex flex-col border border-midnight-blue/10 bg-white p-7 transition-shadow hover:shadow-lg"
                >
                  <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-dark-gold">
                    {a.zeile}
                  </p>
                  <h3 className="mt-3 font-cormorant text-3xl italic leading-tight text-midnight-blue">
                    {a.titel}
                  </h3>
                  <p className="mt-4 flex-1 font-inter text-base leading-relaxed text-midnight-blue/70">
                    {a.text}
                  </p>
                  <Link
                    to={a.ziel}
                    className="mt-7 inline-block self-start border-b-2 border-luxury-gold pb-1 font-montserrat text-sm font-semibold text-midnight-blue transition-colors hover:text-dark-gold"
                  >
                    {a.knopf} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Der Bruch zwischen den zwei Welten. */}
        <section aria-hidden="true" className="bg-warm py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-cormorant text-3xl italic leading-snug text-midnight-blue/80 sm:text-4xl">
              Das Leben in gelebten Worten.
            </p>
            <div className="mx-auto mt-8 h-px w-24 bg-luxury-gold" />
          </div>
        </section>

        {/* TEIL 2 — lernen */}
        <section
          id="ausbildung"
          className="scroll-mt-24 py-20 sm:py-28"
          style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }}
          aria-labelledby="ausbildung-titel"
        >
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-luxury-gold">
              Rednerin werden
            </p>
            <h2
              id="ausbildung-titel"
              className="mt-5 font-montserrat text-2xl font-bold text-pearl-white sm:text-4xl"
            >
              Wenn Sie selbst diejenige sein wollen, die spricht
            </h2>
            <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/70">
              Der Beruf lässt sich lernen. Was sich nicht lernen lässt, ist der Wunsch, für andere
              Menschen die richtigen Worte zu finden. Den bringen Sie mit.
            </p>
            <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-pearl-white/55">
              Sie wollen erst einmal hineinschnuppern? Dann ist der{' '}
              <Link
                to="/redner-ausbildungen"
                className="text-luxury-gold underline-offset-4 hover:underline"
              >
                Workshop an einem Tag
              </Link>{' '}
              der kleinere Anfang. Die Wege hier darunter sind der ganze Weg.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WEGE.map((w) => (
                <KippKarte
                  key={w.titel}
                  className="border border-pearl-white/15 bg-white/[0.05] p-7 backdrop-blur-sm hover:border-luxury-gold/60"
                >
                  <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-luxury-gold">
                    {w.zeile}
                  </p>
                  <h3 className="mt-3 font-cormorant text-3xl italic leading-tight text-pearl-white">
                    {w.titel}
                  </h3>
                  <p className="mt-4 font-inter text-base leading-relaxed text-pearl-white/70">
                    {w.text}
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {w.punkte.map((p) => (
                      <li key={p} className="flex gap-2 font-inter text-sm text-pearl-white/60">
                        <span aria-hidden="true" className="text-luxury-gold">
                          ›
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={w.ziel}
                    className="mt-7 inline-block self-start rounded-sm bg-luxury-gold px-5 py-3 font-montserrat text-sm font-semibold text-midnight-blue transition-colors hover:bg-bright-gold"
                  >
                    {w.knopf}
                  </Link>
                </KippKarte>
              ))}
            </div>
          </div>
        </section>

        {/* Fragen, die beide Seiten betreffen */}
        <section className="bg-pearl-white py-20 sm:py-28" aria-labelledby="fragen-titel">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="fragen-titel"
              className="font-montserrat text-2xl font-bold text-midnight-blue sm:text-3xl"
            >
              Häufige Fragen
            </h2>
            <dl className="mt-10 flex flex-col gap-8">
              {FRAGEN.map((f) => (
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
      </main>

      <Footer />
    </div>
  );
}
