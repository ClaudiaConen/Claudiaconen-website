import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Mic2, Star, GraduationCap, Headphones, Smartphone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselCard {
  title: string;
  subtitle: string;
  icon: any;
  link: string;
  gradient: string;
  hoverVideo?: string;
  thumbnail?: string;
}

const CAROUSEL_CARDS: CarouselCard[] = [
  {
    title: 'DU + KI = UNSCHLAGBAR',
    subtitle: 'Keynotes • Vorträge • Trainings',
    icon: Award,
    link: '/marke-und-positionierung',
    gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
    hoverVideo: 'https://player.vimeo.com/video/1133492788?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492788.jpg',
  },
  {
    title: 'POSITIONIERUNG\nPERSÖNLICHKEIT\nPERFORMANCE\nSTIMMWIRKUNG\n= KUNDENMAGNET',
    subtitle: 'Coaching • Mentoring • Workshops • Vorträge',
    icon: Mic2,
    link: '/keynote-und-buehnenperformance',
    gradient: 'from-[#0F1F3A] via-[#1A2B4C] to-[#1A2B4C]',
    hoverVideo: 'https://player.vimeo.com/video/1133492841?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492841.jpg',
  },
  {
    title: 'DEINE BERUFUNG.\nDEINE GESCHICHTE.\nDEINE MARKE.',
    subtitle: 'Die Keynote-Ausbildung für Menschen, die etwas bewegen wollen.',
    icon: Star,
    link: '/redner-ausbildungen',
    gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
    hoverVideo: 'https://player.vimeo.com/video/1133492925?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492925.jpg',
  },
  {
    title: 'WISSEN, DAS WIRKT – UND GESCHENKE FÜR DICH',
    subtitle: 'Ausbildungen\nOnline Kurse\nExklusives 1:1 Coaching\nGeschenke\nShop',
    icon: GraduationCap,
    link: '/premiumangebote', // vorher /stimme-hochzeit: Kachel verspricht Ausbildungen/Kurse/Coaching, fuehrte aber zur Zeremonien-Seite
    gradient: 'from-[#0F1F3A] via-[#1A2B4C] to-[#1A2B4C]',
    hoverVideo: 'https://player.vimeo.com/video/1133532511?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133532511.jpg',
  },
  {
    title: 'GESCHICHTEN SCHAFFEN GÄNSEHAUT',
    subtitle: 'Menschen merken sich Bilder, nicht Aufzählungen\n\nStorytelling • Emotional Selling • Elevator Pitch',
    icon: Headphones,
    link: '/storytelling-kurs', // vorher Zweitadresse /speaker-storytelling, die selbst hierher verweist
    gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
    hoverVideo: 'https://player.vimeo.com/video/1133493475?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133493475.jpg',
  },
  {
    title: 'WISSEN TO GO',
    subtitle: 'BLOG\nEVENTS\nÜBER MICH\nCOMMUNITY\nKOOPERATIONEN\nAUDIO IMPULSE',
    icon: Smartphone,
    link: '/wissen-to-go', // vorher /social-media-wirkung: Kachel heisst WISSEN TO GO
    gradient: 'from-[#0F1F3A] via-[#1A2B4C] to-[#1A2B4C]',
    hoverVideo: 'https://player.vimeo.com/video/1133532379?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133532379.jpg',
  },
  {
    title: 'VOM OHR INS HERZ',
    subtitle: 'Für unvergessliche Momente und Botschaften\n\nFreie Rednerin • Hochzeiten • Trauerfeiern • Events',
    icon: MapPin,
    link: '/freie-rednerin', // vorher /immer-da-wo-du-bist: Kachel verspricht Freie Rednerin, Hochzeiten, Trauerfeiern
    gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
    hoverVideo: 'https://player.vimeo.com/video/1133502217?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133502217.jpg',
  },
];

export default function ThemenCarousel() {
  // Welche Karte darf ein Video laden? Nur die, ueber der die Maus steht.
  // Vorher liefen alle sieben von Anfang an.
  const [videoKarte, setVideoKarte] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const screenWidth = window.innerWidth;
    let cardWidth = 220;
    let gap = 16;

    if (screenWidth < 640) {
      cardWidth = 160;
      gap = 12;
    } else if (screenWidth < 1024) {
      cardWidth = 200;
      gap = 14;
    }

    const totalWidth = CAROUSEL_CARDS.length * (cardWidth + gap);
    const scrollSpeed = 0.5;

    const animate = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + scrollSpeed;
        if (newPosition >= totalWidth) {
          return 0;
        }
        return newPosition;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="font-montserrat font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3">
              <span className="text-midnight-blue">Entdecke deine </span>
              <span className="text-dark-gold">
                Möglichkeiten
              </span>
            </h2>
            <p className="text-lg text-midnight-blue/70">
              Wähle deinen Weg zu mehr Wirkung und Präsenz
            </p>
          </div>

        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-3.5 lg:gap-4 overflow-x-hidden pb-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {[...CAROUSEL_CARDS, ...CAROUSEL_CARDS].map((card, index) => {
              const Icon = card.icon;

              return (
                <Link
                  key={index}
                  to={card.link}
                  className="flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[270px] group"
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setVideoKarte(index);
                  }}
                  onPointerLeave={() => setVideoKarte(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex flex-col overflow-hidden rounded-xl border border-luxury-gold/25 transition-colors group-hover:border-luxury-gold/60"
                    style={{ background: 'linear-gradient(180deg, #0F1F3A 0%, #0A1628 100%)' }}
                  >
                    {/* Bildfenster im Format der Bilder selbst. Vorher lagen
                        Querbilder (640x360) in hohen Karten - davon blieben
                        rechnerisch 32 Prozent der Breite sichtbar. */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      {card.hoverVideo ? (
                        <div className="absolute inset-0 overflow-hidden bg-black">
                          {/* Zuerst nur das Bild. Das Video entsteht erst,
                              wenn die Maus auf der Karte steht. */}
                          <img
                            src={card.thumbnail}
                            width={640}
                            height={360}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          {videoKarte === index && (
                            <iframe
                              src={`${card.hoverVideo}&autoplay=1&quality=360p`}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              title={card.title}
                            />
                          )}
                        </div>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon size={120} className="text-white opacity-40" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    </div>

                    <div className="flex flex-col p-3 lg:p-4">
                      {/* Groesser als vorher. Die Schrift stand bisher auf dem
                          Bild und musste klein bleiben; jetzt hat sie eine
                          eigene Flaeche. "CLAUDIA CONEN" auf jeder Karte ist
                          entfallen - auf ihrer eigenen Seite sagt das nichts. */}
                      <h3 className="font-montserrat text-[13px] font-bold leading-tight text-white lg:text-[15px]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 whitespace-pre-line text-[11px] leading-snug text-white/65 line-clamp-3 lg:text-xs">
                        {card.subtitle}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 font-montserrat text-[11px] font-semibold text-luxury-gold">
                        Ansehen
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                      </span>
                    </div>

                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-300" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
