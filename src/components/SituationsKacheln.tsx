import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Das kleine Situationen-Band: Claudia in vielen Rede-Situationen, je Kachel EIN Satz.
 *
 * Claudias Auftrag vom 21.09.2026: ihr Band "wesentlich kleiner machen und obendrauf setzen ...
 * als durchlaufenden Slide ... dann steht da immer nur ein Satz drauf mit verschiedenen
 * Situationen". Es ersetzt den grossen Bereich "Entdecke deine Moeglichkeiten".
 *
 * BAUPLAN = ihr eigenes Dokument "Die Slider-Werkstatt", Variante 01, nur die Hochkant-Reihe
 * (all ihr Material ist 9:16): kleine Kacheln, 11 px Abstand, der Block steht zweimal
 * hintereinander, die Animation schiebt um -50 % (nahtlos), Pause beim Darueberfahren, weiche
 * Maskenraender, ein schwacher, seltener Glanz ("nicht so viel Glitzer"). Reines CSS - siehe
 * .cc-lauf in src/index.css.
 *
 * REGELN, die aus verworfenen Entwuerfen stammen (projects/claudiaconen/DESIGN_PRAEFERENZEN.md):
 * - Jeder Satz ist VOM BILD HER geschrieben und stammt aus ihrem Situationen-Laufband bzw. ihren
 *   sieben Schritten. "Mensch oder Avatar?" ist ihre Ansage zum Avatar-Bild.
 * - Nie duerfen dieselben Bilder gleichzeitig zweimal zu sehen sein -> das Band ist auf gut elf
 *   Kachelbreiten begrenzt (.cc-lauf-band). Mit mehr Kacheln kann es breiter werden.
 * - Gold ist das metallische Gold ihrer Community-Seite (#D4AF37 / #F7E7CE / #C9A961), nicht das
 *   gelbliche #F7E7CE.
 *
 * Die Bilder liegen in public/situationen/ (360x640, WebP, zusammen rund 215 KB). Die Kachel
 * "In der Moderation" ist ein stummer Clip (Founder Summit, Sekunde 7-14, ihre Ansage); er laedt
 * erst, wenn das Band sichtbar wird, und gar nicht, wenn das System Bewegung abgeschaltet hat.
 */

type Kachel = { bild: string; oben: string; satz: string; ziel: string; clip?: string };

const KACHELN: Kachel[] = [
  { bild: '01-avatare', oben: 'Du + KI', satz: 'Mensch oder Avatar?', ziel: '/marke-und-positionierung' },
  { bild: '03-keynote', oben: 'Keynote', satz: 'Auf der Bühne', ziel: '/unternehmen-keynotes' },
  { bild: '02-training', oben: 'Im Training', satz: 'Im Team, das wieder brennt', ziel: '/keynote-und-buehnenperformance' },
  { bild: '08-gehirn', oben: 'Mensch + KI', satz: 'Empathie schlägt Algorithmus', ziel: '/unternehmen-keynotes' },
  { bild: '14-besondere-anlaesse', oben: 'Bei der Hochzeit', satz: 'Stimmen bestimmen die Stimmung', ziel: '/freie-trauung' },
  { bild: '04-zuhoeren', oben: 'Im Gespräch', satz: 'Wenn Vertrauen entsteht', ziel: '/1-zu-1-mentoring' },
  { bild: 'moderation', oben: 'Am Mikrofon', satz: 'In der Moderation', ziel: '/freie-rednerin', clip: '/situationen/moderation.mp4' },
  { bild: '05-grosse-buehne', oben: 'Live', satz: 'Im Rampenlicht', ziel: '/redner-ausbildungen' },
  { bild: '12-buch', oben: 'Autorin', satz: 'Wenn jedes Wort zählt', ziel: '/wissen-to-go' },
  { bild: '10-messe', oben: 'The Power of AI', satz: 'KI spart Zeit. Du gibst ihr Bedeutung.', ziel: '/ki-einsteiger-coaching' },
  { bild: '06-kamera', oben: 'Im Studio', satz: 'Vor laufender Kamera', ziel: '/storytelling-kurs' },
  // Claudias Foto vom 22.09.2026 ("Momente im Tonstudio als Voice Over"); nur 360x254 px - sobald ein groesseres Original da ist, ersetzen.
  { bild: '15-tonstudio', oben: 'Im Tonstudio', satz: 'Vom Ohr ins Herz', ziel: '/stimme-voiceover' },
  { bild: '07-freie-rednerin', oben: 'Freie Rednerin', satz: 'In Momenten, die bleiben', ziel: '/freie-rednerin' },
];

function Block({ still }: { still?: boolean }) {
  return (
    <div className="flex gap-[11px] pr-[11px]" aria-hidden={still ? true : undefined}>
      {KACHELN.map((k, i) => (
        <Link
          key={k.bild}
          to={k.ziel}
          tabIndex={still ? -1 : undefined}
          style={{ ['--i' as string]: i }}
          className="cc-glanz group relative block aspect-[9/16] w-[clamp(98px,25vw,124px)] flex-none overflow-hidden rounded-[10px] border border-[#D4AF37]/55 bg-midnight-blue text-white transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBD197]"
        >
          <img
            src={`/situationen/${k.bild}.webp`}
            alt=""
            width={360}
            height={640}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {k.clip && (
            <video
              data-clip={k.clip}
              muted
              loop
              playsInline
              preload="none"
              poster={`/situationen/${k.bild}.webp`}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0)_38%,rgba(10,22,40,0.55)_62%,rgba(10,22,40,0.96)_100%)]"
          />
          <span className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-1 px-2 pb-2.5 pt-2">
            <span className="font-montserrat text-[8.6px] font-bold uppercase leading-tight tracking-[0.12em] text-[#EBD197]">
              {k.oben}
            </span>
            <span className="font-montserrat text-[10.9px] font-black uppercase leading-[1.14] tracking-[0.01em]">
              {k.satz}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function SituationsKacheln() {
  const band = useRef<HTMLDivElement>(null);

  // Der Clip laedt erst, wenn das Band zum ersten Mal sichtbar wird.
  useEffect(() => {
    const el = band.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (eintraege) => {
        if (!eintraege.some((e) => e.isIntersecting)) return;
        el.querySelectorAll<HTMLVideoElement>('video[data-clip]').forEach((v) => {
          if (!v.src) v.src = v.dataset.clip || '';
          v.muted = true;
          v.play().catch(() => undefined); // verweigert der Browser das Abspielen, bleibt das Standbild
        });
        io.disconnect();
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-midnight-blue to-[#0F1F3A] py-6 text-pearl-white sm:py-7"
      aria-label="Überall, wo wir den Mund aufmachen, ist Bühne"
    >
      <div className="mx-auto mb-3.5 flex max-w-7xl flex-wrap items-baseline justify-between gap-x-5 gap-y-2 px-4 sm:px-6 lg:px-8">
        <p className="font-cormorant text-xl font-semibold italic leading-tight text-pearl-white/80 sm:text-2xl">
          Überall, wo wir den Mund aufmachen, ist Bühne.
        </p>
        <p className="flex items-center gap-2.5 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#EBD197]">
          <span aria-hidden="true" className="h-[3px] w-6 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
          Einblicke. Neue Möglichkeiten.
        </p>
      </div>

      <div ref={band} className="cc-lauf cc-lauf-band">
        <div className="cc-lauf-spur">
          <Block />
          <Block still />
        </div>
      </div>
    </section>
  );
}
