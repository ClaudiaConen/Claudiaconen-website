import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/**
 * "Hoeren" — die Seite, auf der Claudias Stimme der Beweis ist.
 *
 * Warum Zitate von IHR und nicht von beruehmten Menschen: Ein falsch
 * zugeschriebenes Zitat ist der haeufigste Fehler auf solchen Seiten, und
 * ausgerechnet auf einer Seite ueber Vertrauen waere er toedlich. Alle
 * Saetze hier stammen aus ihren eigenen Unterlagen: den Grossen Thesen der
 * Strategie 2026/27, dem FUNDAMENT und der gemeinsam abgestimmten Kopfzeile
 * vom 18.09.2026. Nichts davon ist erfunden, alles ist von ihr freigegeben.
 *
 * Die Kurzgeschichten sind bewusst NICHT vorgeschrieben. Zu jeder steht ein
 * Vorschlag, welche Geschichte aus ihrem Material dorthin passt. Ihre
 * persoenliche Geschichte gehoert ihr, und die Nutzungsregeln aus dem
 * FUNDAMENT sind streng: Narbe statt Wunde, kein Mitleid, nie unmittelbar
 * vor einem Verkaufsangebot. Ein fremdgeschriebener Entwurf davon waere
 * anmassend.
 *
 * Audio: Platzhalter, bis die Aufnahmen da sind. Ein Abspielknopf ohne Ton
 * waere eine Attrappe, deshalb ist er sichtbar deaktiviert und sagt, worauf
 * er wartet.
 */

type Block = {
  id: string;
  thema: string;
  zitat: string;
  quelle: string;
  gedanke: string;
  geschichte: string;
};

const BLOECKE: Block[] = [
  {
    id: 'unverwechselbar',
    thema: 'Unverwechselbarkeit',
    zitat: 'Jeder Mensch ist unverwechselbar. Das zu erkennen und zu nutzen, ist das Gold von morgen.',
    quelle: 'Große Thesen',
    gedanke:
      'Die meisten Menschen suchen nach dem, was sie besser können als andere. Die falsche Frage. Interessant ist, was nur du mitbringst, und das steht selten im Lebenslauf.',
    geschichte:
      'Vorschlag: die Geschichte einer Kundin, die ihren eigenen Wert erst gesehen hat, als jemand anderes ihn benannt hat.',
  },
  {
    id: 'vertrauen',
    thema: 'Vertrauen',
    zitat: 'Perfektion ist klickbar. Vertrauen entsteht durch dich.',
    quelle: 'Claim',
    gedanke:
      'Alles, was makellos ist, lässt sich heute in Sekunden herstellen. Genau deshalb überzeugt es nicht mehr. Was überzeugt, ist der Mensch, der zu dem steht, was er sagt.',
    geschichte:
      'Vorschlag: der Moment, in dem ein perfekter Auftritt gescheitert ist und ein unperfekter getragen hat.',
  },
  {
    id: 'stimme',
    thema: 'Stimme',
    zitat: 'Die Stimme ist der Zugang. Die Persönlichkeit ist das Ergebnis.',
    quelle: 'FUNDAMENT',
    gedanke:
      'An der Stimme hörst du nicht, wie jemand geschult ist. Du hörst, wie jemand zu sich steht. Deshalb ist Stimmarbeit nie nur Technik.',
    geschichte:
      'Vorschlag: die Geschichte vom Verstummen und davon, wie die Stimme zurückkam. Nach den Regeln des FUNDAMENT: als Narbe, nicht als Wunde.',
  },
  {
    id: 'buehne',
    thema: 'Bühne',
    zitat: 'Überall, wo wir den Mund aufmachen, ist Bühne.',
    quelle: 'Große Thesen',
    gedanke:
      'Nicht nur im Scheinwerferlicht. Am Telefon, im Vier-Augen-Gespräch, beim Elternabend. Wer das begriffen hat, übt nicht mehr für den großen Moment, sondern für den Dienstag.',
    geschichte:
      'Vorschlag: eine kleine Szene aus dem Alltag, in der ein einziger Satz alles gedreht hat.',
  },
  {
    id: 'ki',
    thema: 'Mensch und KI',
    zitat: 'Der Mensch ist das Unikat. KI ist der Beschleuniger.',
    quelle: 'Leitgedanke',
    gedanke:
      'Je vergleichbarer erzeugte Kommunikation wird, desto wertvoller wird alles, was sich nicht erzeugen lässt: Geschichte, Werte, echte Begegnung. Das ist keine Warnung, das ist eine gute Nachricht.',
    geschichte:
      'Vorschlag: der Moment, in dem jemand merkt, dass ihm ein Werkzeug die Arbeit abnimmt, aber nicht die Verantwortung.',
  },
  {
    id: 'wirkung',
    thema: 'Wirkung',
    zitat: 'Wir Menschen haben keine Reset-Taste. Was wir sagen und tun, kann sich bei anderen verankern.',
    quelle: 'Große Thesen',
    gedanke:
      'Das ist die unbequeme Seite von Wirkung. Sie hört nicht auf, wenn du den Raum verlässt. Deshalb lohnt es sich, vorher zu wissen, was man auslösen will.',
    geschichte:
      'Vorschlag: ein Satz, den jemand vor Jahren zu dir gesagt hat und der bis heute nachwirkt.',
  },
  {
    id: 'begegnung',
    thema: 'Begegnung',
    zitat: 'Berühre das Herz. Bleib im Kopf.',
    quelle: 'Kopfzeile',
    gedanke:
      'In dieser Reihenfolge, nicht umgekehrt. Wer zuerst den Kopf sucht, bekommt Zustimmung. Wer das Herz erreicht, bekommt Erinnerung.',
    geschichte:
      'Vorschlag: die Begegnung, die dich selbst verändert hat, erzählt aus der Sicht der anderen Person.',
  },
];

function Hoerknopf({ thema }: { thema: string }) {
  const [hinweis, setHinweis] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setHinweis(true)}
        className="inline-flex items-center gap-3 rounded-full border border-luxury-gold/50 bg-white/70 px-5 py-2.5 font-montserrat text-sm font-semibold text-midnight-blue/70 transition-colors hover:border-luxury-gold"
        aria-label={`Hörprobe zu ${thema}, folgt in Kürze`}
      >
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-luxury-gold/20 text-dark-gold"
        >
          ▶
        </span>
        Hören
      </button>
      {hinweis && (
        <p className="mt-3 font-inter text-sm text-midnight-blue/60">
          Die Aufnahme zu diesem Thema folgt in Kürze.
        </p>
      )}
    </div>
  );
}

export default function Hoeren() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Hören | Claudia Conen"
        description="Gedanken, Sätze und Hörproben von Claudia Conen zu Unverwechselbarkeit, Vertrauen, Stimme und der Frage, was der Mensch kann, das eine KI nicht kann."
        path="/hoeren"
      />

      <Navigation />

      <header
        className="relative pt-36 pb-16 sm:pt-44 sm:pb-24"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)' }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
            Hören
          </p>
          <h1 className="mt-5 font-montserrat text-3xl font-bold leading-[1.15] tracking-tight text-pearl-white sm:text-5xl">
            Lesen kannst du überall. Hier kannst du hören.
          </h1>
          <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-pearl-white/75">
            Sieben Gedanken, die meine Arbeit tragen. Jeder davon in einem Satz, einer kurzen
            Geschichte und in meiner Stimme.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="flex flex-col gap-20">
          {BLOECKE.map((b) => (
            <section key={b.id} aria-labelledby={`t-${b.id}`}>
              <h2
                id={`t-${b.id}`}
                className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold"
              >
                {b.thema}
              </h2>

              <blockquote className="mt-5">
                <p className="font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-4xl">
                  „{b.zitat}"
                </p>
                <footer className="mt-3 font-inter text-sm text-midnight-blue/50">
                  Claudia Conen, {b.quelle}
                </footer>
              </blockquote>

              <p className="mt-7 font-inter text-lg leading-relaxed text-midnight-blue/80">
                {b.gedanke}
              </p>

              <Hoerknopf thema={b.thema} />

              {/* Platz für die Kurzgeschichte. Bewusst leer und sichtbar als Platz. */}
              <div className="mt-7 border-l-4 border-luxury-gold/40 bg-warm px-5 py-4">
                <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.15em] text-midnight-blue/45">
                  Platz für eine kurze Geschichte
                </p>
                <p className="mt-2 font-inter text-sm leading-relaxed text-midnight-blue/60">
                  {b.geschichte}
                </p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
