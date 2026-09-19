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
    gradient: 'from-[#B8860B] via-[#D4AF37] to-[#FFD700]',
    hoverVideo: 'https://player.vimeo.com/video/1133492788?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492788.jpg',
  },
  {
    title: 'POSITIONIERUNG\nPERSÖNLICHKEIT\nPERFORMANCE\nSTIMMWIRKUNG\n= KUNDENMAGNET',
    subtitle: 'Coaching • Mentoring • Workshops • Vorträge',
    icon: Mic2,
    link: '/keynote-und-buehnenperformance',
    gradient: 'from-[#1a2332] via-[#243447] to-[#2e4257]',
    hoverVideo: 'https://player.vimeo.com/video/1133492841?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492841.jpg',
  },
  {
    title: 'DEINE BERUFUNG.\nDEINE GESCHICHTE.\nDEINE MARKE.',
    subtitle: 'Die Keynote-Ausbildung für Menschen, die etwas bewegen wollen.',
    icon: Star,
    link: '/redner-ausbildungen',
    gradient: 'from-[#B8860B] via-[#D4AF37] to-[#FFD700]',
    hoverVideo: 'https://player.vimeo.com/video/1133492925?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133492925.jpg',
  },
  {
    title: 'WISSEN, DAS WIRKT – UND GESCHENKE FÜR DICH',
    subtitle: 'Ausbildungen\nOnline Kurse\nExklusives 1:1 Coaching\nGeschenke\nShop',
    icon: GraduationCap,
    link: '/stimme-hochzeit',
    gradient: 'from-[#1a2332] via-[#243447] to-[#2e4257]',
    hoverVideo: 'https://player.vimeo.com/video/1133532511?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133532511.jpg',
  },
  {
    title: 'GESCHICHTEN SCHAFFEN GÄNSEHAUT',
    subtitle: 'Menschen merken sich Bilder, nicht Aufzählungen\n\nStorytelling • Emotional Selling • Elevator Pitch',
    icon: Headphones,
    link: '/speaker-storytelling',
    gradient: 'from-[#B8860B] via-[#D4AF37] to-[#FFD700]',
    hoverVideo: 'https://player.vimeo.com/video/1133493475?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133493475.jpg',
  },
  {
    title: 'WISSEN TO GO',
    subtitle: 'BLOG\nEVENTS\nÜBER MICH\nCOMMUNITY\nKOOPERATIONEN\nAUDIO IMPULSE',
    icon: Smartphone,
    link: '/social-media-wirkung',
    gradient: 'from-[#1a2332] via-[#243447] to-[#2e4257]',
    hoverVideo: 'https://player.vimeo.com/video/1133532379?background=1&loop=1&byline=0&title=0&muted=1',
    thumbnail: 'https://vumbnail.com/1133532379.jpg',
  },
  {
    title: 'VOM OHR INS HERZ',
    subtitle: 'Für unvergessliche Momente und Botschaften\n\nFreie Rednerin • Hochzeiten • Trauerfeiern • Events',
    icon: MapPin,
    link: '/immer-da-wo-du-bist',
    gradient: 'from-[#B8860B] via-[#D4AF37] to-[#FFD700]',
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
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
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
                  className="flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[220px] group"
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setVideoKarte(index);
                  }}
                  onPointerLeave={() => setVideoKarte(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-xl overflow-hidden"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <div className="absolute inset-0">
                      {card.hoverVideo ? (
                        <div className="absolute inset-0 overflow-hidden bg-black">
                          {/* Zuerst nur das Bild. Das Video entsteht erst,
                              wenn die Maus auf der Karte steht. */}
                          <img
                            src={card.thumbnail}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>

                    <div className="relative h-full flex flex-col justify-end p-2 sm:p-3 lg:p-4 z-10">
                      <p className="text-white/80 text-[8px] sm:text-[9px] lg:text-[10px] font-semibold tracking-wider mb-1">
                        CLAUDIA CONEN
                      </p>
                      <h3 className="font-montserrat font-bold text-[10px] sm:text-xs lg:text-sm text-white mb-0.5 sm:mb-1 leading-tight whitespace-pre-line">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-[8px] sm:text-[9px] lg:text-[10px] leading-snug whitespace-pre-line line-clamp-3">
                        {card.subtitle}
                      </p>
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
