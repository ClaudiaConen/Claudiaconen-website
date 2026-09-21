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
/*
 * Korrektur vom 21.09.2026: Die Motivbeschreibung ("kurz vor dem Auftritt,
 * Seitenbuehne, ruhig") und die Zeile "Platzhalter. Hier steht spaeter ein
 * echtes Bild." standen sichtbar auf der Seite - auf 27 Seiten, lesbar fuer
 * jeden Besucher und jede KI. Das war eine Notiz an Claudia, kein Inhalt.
 * Die Flaeche bleibt (ihre Vorgabe), die Notiz wandert ins data-Attribut:
 * im Quelltext auffindbar, auf der Seite unsichtbar.
 */
export default function ArtikelBild({ bereich, motiv }: { bereich: string; motiv?: string }) {
  return (
    <figure className="mt-10" aria-hidden="true" data-bildplatz={bereich} data-motiv={motiv}>
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
        </div>
      </div>
    </figure>
  );
}
