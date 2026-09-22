import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AudioButton from './AudioButton';
import VideoButton from './VideoButton';
import VideoModal from './VideoModal';

interface StepMedia {
  step_number: number;
  media_type: 'audio' | 'video';
  media_url: string;
  platform: 'youtube' | 'vimeo' | null;
}

export default function Hero() {
  const [stepMediaData, setStepMediaData] = useState<Record<number, StepMedia>>({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; platform: 'youtube' | 'vimeo'; title: string } | null>(null);
  useEffect(() => {
    loadStepMedia();
  }, []);

  const loadStepMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('step_media')
        .select('*');

      if (error) throw error;

      if (data) {
        const mediaMap: Record<number, StepMedia> = {};
        data.forEach((item) => {
          mediaMap[item.step_number] = item;
        });
        setStepMediaData(mediaMap);
      }
    } catch (error) {
      console.error('Error loading step media:', error);
    }
  };

  const handleVideoClick = (url: string, platform: 'youtube' | 'vimeo', title: string) => {
    setCurrentVideo({ url, platform, title });
    setVideoModalOpen(true);
  };

  const keyPoints = [
    {
      icon: 'klarheit',
      title: 'KLARHEIT.',
      subtitle: 'Wofür du stehst.',
      href: '#schritt3',
      stepNumber: 3,
    },
    {
      icon: 'botschaft',
      title: 'BOTSCHAFT.',
      subtitle: 'Die Vertrauen schafft.',
      href: '#schritt2',
      stepNumber: 2,
    },
    {
      icon: 'story',
      title: 'STORY.',
      subtitle: 'Die Emotionen weckt.',
      href: '#schritt4',
      stepNumber: 4,
    },
    {
      icon: 'stimme',
      title: 'STIMME.',
      subtitle: 'Die unaufhaltbar ist.',
      href: '#schritt6',
      stepNumber: 6,
    },
    {
      icon: 'praesenz',
      title: 'PRÄSENZ.',
      subtitle: 'Die wirkt, bevor du sprichst.',
      href: '#schritt5',
      stepNumber: 5,
    },
    {
      icon: 'ki',
      title: 'KI.',
      subtitle: 'Die dich beschleunigt.',
      href: '#schritt1',
      stepNumber: 1,
    },
    {
      icon: 'wirkung',
      title: 'WIRKUNG.',
      subtitle: 'Die bleibt.',
      href: '#schritt7',
      stepNumber: 7,
    },
  ];

  return (
    <section
      className="relative px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
      aria-labelledby="hero-headline"
    >
      {/* Vorher lag hier ein Hintergrundfoto mit einem Schleier von 90
          Prozent Deckkraft darueber. Das Foto
          ("/photo_2025-07-09 16.44.30.jpeg") EXISTIERT NICHT - der
          Abruf antwortet mit HTTP 200, liefert aber die Auffangseite.
          Uebrig blieb ein fast undurchsichtiger Schleier ueber nichts:
          genau das "riesige dunkle Feld".

          Solange kein Buehnenfoto da ist, entsteht die Tiefe aus zwei
          weichen Lichtquellen statt aus einer flachen Flaeche. Das ist
          der Griff, mit dem Apple Tiefe ohne Bild erzeugt - nicht
          heller machen, sondern ungleichmaessig. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 12% 0%, rgba(26,43,76,0.95) 0%, rgba(10,22,40,0) 62%),' +
            'radial-gradient(90% 70% at 88% 18%, rgba(218,165,32,0.14) 0%, rgba(10,22,40,0) 58%),' +
            'linear-gradient(175deg, #0B1B33 0%, #0A1628 48%, #0C1E38 100%)',
          zIndex: 0,
        }}
      />
      {/* Die Kante nach unten: kein harter Schnitt, sondern ein
          Auslaufen. Ein Block, der abrupt endet, wirkt wie ein Kasten;
          einer, der ausblendet, wie eine Seite. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background: 'linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(255,254,249,0.06) 100%)',
          zIndex: 1,
        }}
      />
      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 10 }}>
        {/* minmax(0,1fr) statt 1fr und min-w-0 auf den Spalten: Ohne das darf eine Rasterspalte
            nie schmaler werden als ihr Inhalt - und die sieben Wischkacheln unten sind auf dem
            Telefon rund 1.300 px breit. Dann wurde der ganze Kopf breiter als der Bildschirm,
            Safari zoomte heraus, und alles darunter wirkte winzig (Claudias Foto vom 22.09.2026,
            03:32 Uhr: "Am Handy sieht das noch alles sehr verschoben aus"). */}
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-w-0 space-y-5 sm:space-y-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="accent-line"></div>
              <h1 id="hero-headline" className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span className="headline-line1">Würdest du DIR selbst zuhören?</span>
                <span className="headline-line2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 block">
                  Berühre das Herz. Bleib im Kopf.
                </span>
              </h1>

              <motion.div
                className="subline text-base sm:text-xl md:text-2xl mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="subline-part1">
                  KI liefert <span className="keyword-highlight">Perfektion</span> auf Mausklick.
                </span>
                <span className="subline-part2">
                  Deine <span className="keyword-highlight">Unverwechselbarkeit</span> schafft <span className="keyword-highlight">Vertrauen</span>.
                </span>
              </motion.div>

              {/* Hauchzart, damit klar ist: beides ist moeglich, mit KI und ohne. */}
              <p className="mt-3 sm:mt-5 font-inter text-xs sm:text-sm font-light tracking-[0.22em] text-pearl-white/45">
                mit und ohne KI
              </p>

              <p className="mt-4 sm:mt-6 font-montserrat text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-pearl-white/60">
                Rhetorik · Storytelling · Performance · Wirkung
              </p>
            </div>

            <div className="hero-kacheln flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible lg:grid-cols-7">
              {keyPoints.map((point, index) => {
                const media = stepMediaData[point.stepNumber];
                return (
                  <motion.a
                    key={index}
                    href={point.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hero-glass-card group w-[11rem] flex-shrink-0 snap-start rounded-xl p-3.5 sm:w-auto sm:flex-shrink"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(point.href);
                      if (target) {
                        const yOffset = -100;
                        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                  >
                    {/* Titel links, Abspielknopf rechts auf gleicher Hoehe.
                        Vorher waren es vier gestapelte Ebenen je Kachel -
                        goldener Kreis, Titel, Unterzeile, Knopf - und das
                        siebenmal nebeneinander. Sieben goldene Kreise sind
                        sieben Betonungen, und sieben Betonungen sind keine.
                        Das Gold bleibt jetzt dort, wo etwas passiert: am
                        Abspielknopf. */}
                    <div className="flex items-start gap-2.5 text-left">
                      {/* 3-D-Icons (22.09.2026, ueber Claudias Gemini-Schluessel erzeugt, freigestellt):
                          Nachtblau-Glas mit Goldfassung - eine Materialsprache fuer alle sieben Kacheln. */}
                      <img
                        src={`/icons/${point.icon}.webp`}
                        alt=""
                        width={256}
                        height={256}
                        loading="eager"
                        decoding="async"
                        className="h-9 w-9 flex-shrink-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.82rem] font-semibold leading-snug text-pearl-white">
                          {point.title}
                        </p>
                        <p className="mt-0.5 text-[0.7rem] leading-snug text-pearl-white/60">
                          {point.subtitle}
                        </p>
                      </div>
                      {media && (
                        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          {media.media_type === 'audio' ? (
                            <AudioButton audioUrl={media.media_url} ariaLabel={`Play ${point.title} audio`} />
                          ) : media.media_type === 'video' && media.platform ? (
                            <VideoButton
                              onClick={() => handleVideoClick(media.media_url, media.platform as 'youtube' | 'vimeo', point.title)}
                              ariaLabel={`Play ${point.title} video`}
                            />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <a
                href="#schritt1"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#schritt1');
                  if (target) {
                    const yOffset = -100;
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                <Calendar size={20} />
                JETZT UNVERWECHSELBAR WERDEN
              </a>
              {/* Hier stand bis 21.09.2026 der Knopf "Zum Gratis Webinar" auf
                  claudiaconen-akademie.de/workshop-claudia. Die Webseite dieser
                  Domain antwortet seit mindestens 18.09.2026 nicht mehr - der
                  zweite Knopf der Startseite fuehrte ins Leere. Bewusst ENTFERNT
                  statt umgebogen: Claudias Knopf-Regel vom 18.09. sagt, der erste
                  Klick verspricht einen Blick, keine Verpflichtung. Wieder
                  einsetzen, sobald es ein Webinar mit lebender Adresse gibt. */}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative group min-w-0 w-full lg:w-[400px] xl:w-[450px] video-nebel"
          >
            {/* Vorher lag hinter dem Rahmen ein weichgezeichneter
                Goldverlauf, der bei Maus darueber auf doppelte Staerke
                ging. Claudias Gestaltungsvorgabe vom 18.09.2026: "keine
                unnoetigen Glow-, Neon-, Gold- oder Effektwelten". Eine
                Haarlinie und ein ruhiger Schatten sagen dasselbe, ohne
                zu leuchten. */}
            <div
              className="relative overflow-hidden rounded-2xl border border-luxury-gold/25"
              style={{
                aspectRatio: '16/9',
                boxShadow: '0 24px 60px -24px rgba(0,0,0,0.65)',
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/1143907515"
                className="h-full w-full"
                frameBorder="0"
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                title="Claudia Conen im Video"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      {currentVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={currentVideo.url}
          platform={currentVideo.platform}
          title={currentVideo.title}
        />
      )}
    </section>
  );
}
