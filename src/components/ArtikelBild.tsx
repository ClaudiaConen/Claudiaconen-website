/**
 * Platzhalter fuer Artikelbilder.
 *
 * Bewusst KEIN gekauftes Stockfoto und kein erzeugtes Bild, das so tut, als
 * waere es eines. Ein Platzhalter, der sich als Platzhalter zu erkennen gibt,
 * ist ehrlicher als ein beliebiges Motiv und sieht besser aus als ein graues
 * Rechteck.
 *
 * Gebaut aus den Markenfarben: Mitternachtsblau, die Goldverlaeufe der
 * Marken-Referenz, dazu eine ruhige Struktur. Keine Bilddatei, also null
 * Ladezeit.
 *
 * Wird ersetzt, sobald echte Bilder da sind: eine Zeile je Artikel.
 */
export default function ArtikelBild({ bereich, motiv }: { bereich: string; motiv?: string }) {
  return (
    <figure className="mt-10">
      <div
        className="relative flex aspect-[16/7] w-full items-end overflow-hidden rounded-lg"
        style={{
          background:
            'linear-gradient(135deg, #0A1628 0%, #0F1F3A 45%, #1A2B4C 100%)',
        }}
      >
        {/* Ruhige Struktur statt Motiv. Zwei weiche Goldflaechen, nichts blinkt. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 80% at 15% 20%, rgba(218,165,32,0.22), transparent 70%), radial-gradient(45% 70% at 85% 90%, rgba(201,169,97,0.16), transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, #DAA520, #F4D03F, #DAA520)' }}
        />
        <div className="relative px-7 py-7 sm:px-10 sm:py-9">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-luxury-gold">
            {bereich}
          </p>
          {motiv && (
            <p className="mt-2 max-w-md font-inter text-sm leading-relaxed text-pearl-white/65">
              {motiv}
            </p>
          )}
        </div>
      </div>
      <figcaption className="mt-2 font-inter text-xs text-midnight-blue/45">
        Platzhalter. Hier steht später ein echtes Bild.
      </figcaption>
    </figure>
  );
}
