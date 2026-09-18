import { Link } from 'react-router-dom';

/**
 * Der schmale Hinweis auf der Startseite.
 *
 * Claudias Idee vom 18.09.2026 um 22:41: "Waere ein kleiner Hinweis auf der
 * Haupt-Startseite clever, so wie: Rund ums Reden mit Wirkung, mit und ohne
 * KI, menschlich."
 *
 * Ja, und zwar genau so klein. Ihr FUNDAMENT haelt Trauerreden bewusst aus
 * dem Schaufenster heraus, damit die Marke nicht verwaessert. Eine Kachel
 * neben den vier Tueren waere ein fuenftes gleichrangiges Angebot und damit
 * genau der Bauchladen-Einwand aus ihrem Kritiker-Check. Ein schmales Band
 * mit EINEM Link ist etwas anderes: eine Tuer im Flur, nicht im Schaufenster.
 * Wer sie sucht, findet sie. Wer wegen Keynotes da ist, liest eine Zeile.
 *
 * Steht bewusst NACH den vier Tueren: Erst die Positionierung, dann die
 * Anlaesse.
 */
export default function HinweisRednerin() {
  return (
    <section className="bg-warm py-12 sm:py-16" aria-labelledby="hinweis-rednerin">
      <div className="mx-auto max-w-4xl px-6">
        <div className="border-y border-luxury-gold/30 py-10 text-center">
          <p
            id="hinweis-rednerin"
            className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-dark-gold"
          >
            Rund ums Reden mit Wirkung. Mit und ohne KI. Menschlich.
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
            Ich bin auch als freie Rednerin buchbar — und bilde die aus, die es
            selbst werden wollen.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-inter text-base leading-relaxed text-midnight-blue/65">
            Trauerfeier, freie Trauung, besondere Anlässe. Die Bühne ist da, wo jemand den Mund
            aufmacht.
          </p>
          <Link
            to="/freie-rednerin"
            className="mt-7 inline-block border-b-2 border-luxury-gold pb-1 font-montserrat text-sm font-semibold text-midnight-blue transition-colors hover:text-dark-gold"
          >
            Die Stimme fürs Herz →
          </Link>
        </div>
      </div>
    </section>
  );
}
