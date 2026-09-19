/**
 * Die Stimmwelle.
 *
 * Claudias Vorlage vom 18.09.2026 um 23:04: goldene Klangwellen auf
 * Schwarz, "minimal schimmern", auf die Speaker-Seite.
 *
 * WARUM ALS SVG UND NICHT ALS BILD: Ihr Vorlagenbild wiegt 95 KB, und das
 * ist die kleine Fassung. Als SVG sind es rund zwei KB, es ist in jeder
 * Aufloesung scharf, es nimmt automatisch die Markenfarben an - und es kann
 * sich wirklich bewegen. Ein Foto einer Welle kann nur so tun.
 *
 * DER SCHIMMER: Jede Linie liegt doppelt uebereinander. Unten eine sehr
 * leise Goldlinie, darueber dieselbe Linie als kurzes helles Stueck, das
 * per stroke-dashoffset an ihr entlangwandert. Das ergibt Licht, das ueber
 * die Welle laeuft, statt einer blinkenden Flaeche.
 *
 * Bewusst per CSS animiert und nicht mit SMIL: CSS-Animationen lassen sich
 * ueber prefers-reduced-motion abschalten, SVG-eigene nicht.
 *
 * aria-hidden, weil es nichts erzaehlt. Wer die Seite vorgelesen bekommt,
 * verpasst hier nichts.
 */
const WELLEN = [
  { d: 'M0,150 C150,60 300,60 450,150 S750,240 900,150 S1200,60 1350,150', o: 0.55, v: 0 },
  { d: 'M0,160 C150,230 300,230 450,160 S750,90 900,160 S1200,230 1350,160', o: 0.4, v: 2.5 },
  { d: 'M0,140 C200,80 400,200 600,140 S1000,80 1200,140 S1400,200 1350,140', o: 0.3, v: 5 },
  { d: 'M0,170 C250,110 500,215 750,170 S1150,110 1350,170', o: 0.22, v: 7.5 },
];

export default function Stimmwelle({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1350 300"
      preserveAspectRatio="none"
      className={`cc-welle ${className}`}
    >
      <defs>
        <linearGradient id="cc-welle-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8860B" stopOpacity="0" />
          <stop offset="25%" stopColor="#DAA520" stopOpacity="1" />
          <stop offset="75%" stopColor="#DAA520" stopOpacity="1" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {WELLEN.map((w) => (
        <g key={w.d}>
          {/* die ruhende Linie */}
          <path
            d={w.d}
            fill="none"
            stroke="url(#cc-welle-gold)"
            strokeWidth="1.2"
            opacity={w.o * 0.5}
          />
          {/* das Licht, das daran entlanglaeuft */}
          <path
            className="cc-welle-licht"
            d={w.d}
            fill="none"
            stroke="#F4D03F"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={w.o}
            style={{ animationDelay: `${w.v}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
