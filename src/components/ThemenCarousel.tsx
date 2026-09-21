import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Themenband "Entdecke deine Moeglichkeiten".
 *
 * HOCHFORMAT - und das ist der ganze Punkt. Claudias sieben Videos sind
 * 720 x 1280 (am 21.09.2026 bei Vimeo nachgemessen). Am 19.09. hatte ich sie in
 * 16:9-Fenster gesetzt und die Vorschaubilder von vumbnail.com geholt, das nur
 * den Mittelstreifen liefert: abgeschnittene Koepfe, ein Oberkoerper ohne
 * Gesicht. Claudia nannte es zu Recht "entstellt". Deshalb:
 *   - Karten im Format der Videos (9:16),
 *   - die echten Vorschaubilder, von der eigenen Seite (public/themen/, 163 KB
 *     zusammen) statt von einem fremden Dienst,
 *   - Text auf einer Glasflaeche im Bild (ihr Wunsch vom 21.09.: Glas, nicht
 *     so dunkle Felder).
 *
 * KEIN DAUERLAUF mehr. Vorher schob requestAnimationFrame das Band und setzte
 * dabei 60-mal je Sekunde einen State - jede Karte wurde jedes Mal neu
 * gerechnet. Jetzt: eine Schiene mit Scroll-Snap. Am Handy wischt man, am
 * Rechner gibt es zwei Pfeile. Das kostet im Ruhezustand nichts.
 *
 * Das Video laedt weiterhin erst, wenn eine MAUS auf der Karte steht.
 */

type Karte = {
  vimeo: string;
  titel: string;
  unterzeile: string;
  ziel: string;
};

const KARTEN: Karte[] = [
  {
    vimeo: '1133492788',
    titel: 'Du + KI = unschlagbar',
    unterzeile: 'Keynotes · Vorträge · Trainings',
    ziel: '/marke-und-positionierung',
  },
  {
    vimeo: '1133492841',
    titel: 'Positionierung, Persönlichkeit, Performance, Stimmwirkung = Kundenmagnet',
    unterzeile: 'Coaching · Mentoring · Workshops · Vorträge',
    ziel: '/keynote-und-buehnenperformance',
  },
  {
    vimeo: '1133492925',
    titel: 'Deine Berufung. Deine Geschichte. Deine Marke.',
    unterzeile: 'Die Keynote-Ausbildung für Menschen, die etwas bewegen wollen.',
    ziel: '/redner-ausbildungen',
  },
  {
    vimeo: '1133532511',
    titel: 'Wissen, das wirkt – und Geschenke für dich',
    unterzeile: 'Ausbildungen · Online-Kurse · 1:1 Coaching · Shop',
    ziel: '/premiumangebote',
  },
  {
    vimeo: '1133493475',
    titel: 'Geschichten schaffen Gänsehaut',
    unterzeile: 'Storytelling · Emotional Selling · Elevator Pitch',
    ziel: '/storytelling-kurs',
  },
  {
    vimeo: '1133532379',
    titel: 'Wissen to go',
    unterzeile: 'Blog · Events · Community · Audio-Impulse',
    ziel: '/wissen-to-go',
  },
  {
    vimeo: '1133502217',
    titel: 'Vom Ohr ins Herz',
    unterzeile: 'Freie Rednerin · Hochzeiten · Trauerfeiern · Events',
    ziel: '/freie-rednerin',
  },
];

export default function ThemenCarousel() {
  // Welche Karte darf ein Video laden? Nur die, ueber der die Maus steht.
  const [videoKarte, setVideoKarte] = useState<number | null>(null);
  const schiene = useRef<HTMLDivElement>(null);

  const schieben = (richtung: 1 | -1) => {
    const el = schiene.current;
    if (!el) return;
    const karte = el.querySelector<HTMLElement>('[data-karte]');
    const schritt = ((karte?.offsetWidth ?? 260) + 16) * 2;
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: richtung * schritt, behavior: ruhig ? 'auto' : 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-pearl-white py-12 md:py-16" aria-labelledby="themen-headline">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <h2
              id="themen-headline"
              className="font-montserrat text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl"
            >
              <span className="text-midnight-blue">Entdecke deine </span>
              <span className="text-dark-gold">Möglichkeiten</span>
            </h2>
            <p className="mt-2 font-inter text-base text-midnight-blue/70 md:text-lg">
              Wähle deinen Weg zu mehr Wirkung und Präsenz
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => schieben(-1)}
              aria-label="Band zurück"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-midnight-blue/10 bg-white/70 text-lg text-midnight-blue backdrop-blur-md transition-colors hover:border-luxury-gold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => schieben(1)}
              aria-label="Band weiter"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-midnight-blue/10 bg-white/70 text-lg text-midnight-blue backdrop-blur-md transition-colors hover:border-luxury-gold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div
          ref={schiene}
          className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {KARTEN.map((k, index) => (
            <Link
              key={k.vimeo}
              to={k.ziel}
              data-karte
              className="group relative aspect-[9/16] w-[62vw] max-w-[264px] flex-none snap-start overflow-hidden rounded-[20px] bg-[#0F1F3A] text-white shadow-[0_22px_44px_-26px_rgba(10,22,40,0.7)] transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-luxury-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[240px] lg:w-[264px]"
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setVideoKarte(index);
              }}
              onPointerLeave={() => setVideoKarte(null)}
            >
              <img
                src={`/themen/${k.vimeo}.webp`}
                width={540}
                height={960}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />

              {videoKarte === index && (
                <iframe
                  src={`https://player.vimeo.com/video/${k.vimeo}?background=1&loop=1&byline=0&title=0&muted=1&autoplay=1&quality=360p`}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={k.titel}
                  tabIndex={-1}
                />
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[#0A1628]/55"
              />

              <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col gap-1 rounded-[15px] border border-white/30 bg-[#0A1628]/40 px-3.5 pb-3 pt-3 backdrop-blur-lg backdrop-saturate-150">
                <h3 className="font-montserrat text-[15px] font-bold leading-[1.22]">{k.titel}</h3>
                <p className="font-inter text-xs leading-snug text-white/80">{k.unterzeile}</p>
                <span className="mt-1 inline-flex items-center gap-1 font-montserrat text-xs font-semibold text-bright-gold">
                  Ansehen
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
