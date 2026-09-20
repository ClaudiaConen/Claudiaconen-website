import { useEffect, useState } from 'react';

/**
 * Ein kleiner Hinweis, dass gerade gebaut wird.
 *
 * Claudia am 19.09.2026, 10:59: "irgendwo einen kleinen Hinweis geben, hier
 * wird gearbeitet, falls jemand da rumscrollt, dass er sich wundert."
 *
 * BEWUSST ANDERS als das gelbe Laufband, das heute frueh ausgebaut wurde.
 * Das lief als Leuchtschrift ganz oben ueber jede Seite und war das Erste,
 * was ein neuer Besucher las. Dieser Hinweis sitzt unten links, ist klein,
 * laesst sich wegklicken und bleibt dann weg. Er erklaert eine Baustelle,
 * statt die Seite fuer unfertig zu erklaeren.
 *
 * Das Wegklicken merkt sich der Browser des Besuchers. Falls das nicht
 * moeglich ist - privates Fenster, gesperrte Speicherung -, erscheint der
 * Hinweis eben wieder. Deshalb steht jeder Zugriff in einem try/catch.
 */
export default function Umbauhinweis() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('umbauhinweis-weg') === 'ja') return;
    } catch {
      // Kein Speicher, kein Problem: dann wird der Hinweis eben gezeigt.
    }
    const t = setTimeout(() => setSichtbar(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!sichtbar) return null;

  return (
    <div
      role="status"
      className="fixed bottom-3 left-3 right-20 z-30 max-w-[15rem] rounded-lg border border-luxury-gold/40 bg-midnight-blue/95 px-3 py-2 shadow-xl backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[17rem] sm:px-4 sm:py-3"
    >
      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-luxury-gold">
        Hier wird gerade gebaut
      </p>
      <p className="mt-1.5 font-inter text-xs leading-relaxed text-pearl-white/70">
        Einzelne Seiten ändern sich gerade von Tag zu Tag. Wenn etwas seltsam
        aussieht, liegt es an mir und nicht an Ihnen.
      </p>
      <button
        type="button"
        onClick={() => {
          setSichtbar(false);
          try {
            localStorage.setItem('umbauhinweis-weg', 'ja');
          } catch {
            // Dann eben nur fuer diesen Besuch.
          }
        }}
        className="mt-2 font-inter text-[11px] text-pearl-white/45 underline-offset-2 hover:text-luxury-gold hover:underline"
      >
        Verstanden, ausblenden
      </button>
    </div>
  );
}
