import { useEffect, useRef, useState } from 'react';

/** Lichtspirale neben den sieben Tagen (Claudias Vorbilder 24.10.2026 21:10 und 21:33: DNA aus Lichtpunkten, der
 *  aktuelle Schritt leuchtet). Eigene Zeichnung in Gold auf Dunkelblau; jede Tages-Sprosse sitzt neben ihrem Tag. */
export default function Helix({ aktiv, ys, hoehe }: { aktiv: number; ys: number[]; hoehe: number }) {
  // Dreht sich um die eigene Achse (Claudia, 24.10.2026 21:34); steht still bei reduzierter Bewegung oder ausser Sicht.
  const [winkel, setWinkel] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, sichtbar = false, letzte = 0;
    const io = new IntersectionObserver(([e]) => { sichtbar = e.isIntersecting; });
    if (boxRef.current) io.observe(boxRef.current);
    const lauf = (t: number) => {
      raf = requestAnimationFrame(lauf);
      if (!sichtbar || t - letzte < 33) return;
      letzte = t;
      setWinkel((t / 1000) * 0.55);
    };
    raf = requestAnimationFrame(lauf);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  if (!hoehe || ys.length < 2) return <div ref={boxRef} className="hidden md:block" />;
  const b = 132, a = 40, mitte = b / 2;
  const welle = ((ys[ys.length - 1] - ys[0]) / (ys.length - 1)) * 2;
  const phase = (y: number) => (2 * Math.PI * (y - ys[0])) / welle + Math.PI / 2 + winkel;
  const x = (y: number, vorn: boolean) => mitte + (vorn ? 1 : -1) * a * Math.sin(phase(y));
  // Tiefe: vorne groesser und heller, hinten kleiner und blasser
  const tiefe = (y: number, vorn: boolean) => 0.5 + 0.5 * (vorn ? 1 : -1) * Math.cos(phase(y));
  const punkte: { cx: number; cy: number; r: number; o: number }[] = [];
  for (let y = 4; y <= hoehe - 4; y += 7) {
    for (const vorn of [true, false]) {
      const t = tiefe(y, vorn);
      punkte.push({ cx: x(y, vorn), cy: y, r: 1.2 + 1.6 * t, o: 0.25 + 0.7 * t });
    }
  }
  const zart: number[] = [];
  for (let y = 10; y <= hoehe - 10; y += 18) if (!ys.some((t) => Math.abs(t - y) < 9)) zart.push(y);
  return (
    <div ref={boxRef} className="relative hidden overflow-hidden rounded-[14px] bg-[#13233F] shadow-[0_24px_50px_-28px_rgba(19,35,63,0.8)] md:block" aria-hidden="true">
      <svg viewBox={`0 0 ${b} ${hoehe}`} width={b} height={hoehe} className="mx-auto block overflow-visible">
        <defs>
          <filter id="cc-glut" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {zart.map((y) => (
          <line key={`z${y}`} x1={x(y, true)} y1={y} x2={x(y, false)} y2={y} stroke="#C9A961" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="1.5 4" strokeLinecap="round" />
        ))}
        {ys.map((y, i) => {
          const an = i === aktiv;
          return (
            <line key={`s${i}`} x1={x(y, true)} y1={y} x2={x(y, false)} y2={y} stroke={an ? '#F7E7CE' : '#C9A961'} strokeOpacity={an ? 1 : 0.6} strokeWidth={an ? 3.5 : 1.8} strokeDasharray={an ? undefined : '2 3'} strokeLinecap="round" filter={an ? 'url(#cc-glut)' : undefined} style={{ transition: 'all .45s ease' }} />
          );
        })}
        <g filter="url(#cc-glut)">
          {punkte.map((p, k) => <circle key={k} cx={p.cx} cy={p.cy} r={p.r} fill="#E2C98A" fillOpacity={p.o} />)}
        </g>
        {ys.map((y, i) => {
          const an = i === aktiv;
          return (
            <g key={`k${i}`} style={{ transition: 'all .45s ease' }}>
              <circle cx={x(y, true)} cy={y} r={an ? 7 : 4} fill={an ? '#F7E7CE' : '#C9A961'} filter="url(#cc-glut)" />
              <circle cx={x(y, false)} cy={y} r={an ? 5 : 3} fill={an ? '#F7E7CE' : '#C9A961'} fillOpacity={an ? 1 : 0.6} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

