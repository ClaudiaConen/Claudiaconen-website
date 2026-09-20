import { useRef, type ReactNode } from 'react';

/**
 * Die Karte, die sich unter dem Zeiger neigt.
 *
 * Claudias Wunsch vom 18.09.2026 um 22:50: der hochwertige Premium-Look, bei
 * dem sich eine Kachel beim Darueberfahren leicht dreht, Tiefe bekommt und
 * ein Glanz ueber die Oberflaeche wandert. Fachlich: 3D card tilt hover.
 *
 * Drei Entscheidungen, damit daraus kein Spielzeug wird:
 *
 * 1. NUR MIT MAUS. Auf dem Telefon gibt es kein Darueberfahren — dort wuerde
 *    der Effekt entweder gar nichts tun oder beim Tippen zucken. Deshalb
 *    steigt er bei Zeigergeraeten ohne Maus per CSS komplett aus, und der
 *    Bewegungscode laeuft nur fuer pointerType "mouse".
 *
 * 2. NUR TRANSFORM, IM BILDTAKT. Bewegt wird ausschliesslich ueber transform
 *    und ueber CSS-Variablen, gebuendelt in einem requestAnimationFrame. So
 *    rechnet der Browser kein Layout neu, und es bleibt fluessig, auch wenn
 *    vier Karten nebeneinander stehen.
 *
 * 3. ABSCHALTBAR. Wer im System "weniger Bewegung" eingestellt hat, bekommt
 *    eine ruhige Karte. Das ist keine Feinheit: Fuer manche Menschen loesen
 *    kippende Flaechen Schwindel aus.
 *
 * Der Winkel ist bewusst klein (max. 5 Grad). Alles darueber sieht nach
 * Effekt aus statt nach Material — und Material ist hier das Ziel.
 */
export default function KippKarte({
  children,
  className = '',
  href,
}: {
  children: ReactNode;
  className?: string;
  /** Macht die ganze Karte zu einem echten Verweis. Ein <div> mit
   *  onClick haette kein Ziel: kein Suchprogramm sieht es, die mittlere
   *  Maustaste oeffnet nichts, und mit der Tastatur kommt man nicht
   *  hin. Mit href wird daraus ein <a>. */
  href?: string;
}) {
  const karte = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const bild = useRef<number | null>(null);

  function bewege(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const el = karte.current;
    if (!el || bild.current !== null) return;
    const x = e.clientX;
    const y = e.clientY;
    bild.current = requestAnimationFrame(() => {
      bild.current = null;
      const r = el.getBoundingClientRect();
      const px = (x - r.left) / r.width;
      const py = (y - r.top) / r.height;
      el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
      el.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  }

  function ruhe() {
    const el = karte.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  const inhalt = (
    <>
      <span aria-hidden="true" className="cc-kipp-glanz" />
      <div className="cc-kipp-inhalt">{children}</div>
    </>
  );

  return (
    <div className="cc-kipp-buehne h-full">
      {href ? (
        <a
          ref={karte}
          href={href}
          onPointerMove={bewege}
          onPointerLeave={ruhe}
          className={`cc-kipp block h-full ${className}`}
        >
          {inhalt}
        </a>
      ) : (
        <div
          ref={karte}
          onPointerMove={bewege}
          onPointerLeave={ruhe}
          className={`cc-kipp h-full ${className}`}
        >
          {inhalt}
        </div>
      )}
    </div>
  );
}
