import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, MessageCircle, BookOpen, Mic2, Eye, Sparkles, Heart, Calendar } from 'lucide-react';
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
      icon: Lightbulb,
      title: 'KLARHEIT.',
      subtitle: 'Wofür du stehst.',
      href: '#schritt3',
      stepNumber: 3,
    },
    {
      icon: MessageCircle,
      title: 'BOTSCHAFT.',
      subtitle: 'Die Vertrauen schafft.',
      href: '#schritt2',
      stepNumber: 2,
    },
    {
      icon: BookOpen,
      title: 'STORY.',
      subtitle: 'Die Emotionen weckt.',
      href: '#schritt4',
      stepNumber: 4,
    },
    {
      icon: Mic2,
      title: 'STIMME.',
      subtitle: 'Die unaufhaltbar ist.',
      href: '#schritt6',
      stepNumber: 6,
    },
    {
      icon: Eye,
      title: 'PRÄSENZ.',
      subtitle: 'Die wirkt, bevor du sprichst.',
      href: '#schritt5',
      stepNumber: 5,
    },
    {
      icon: Sparkles,
      title: 'KI.',
      subtitle: 'Die dich beschleunigt.',
      href: '#schritt1',
      stepNumber: 1,
    },
    {
      icon: Heart,
      title: 'WIRKUNG.',
      subtitle: 'Die bleibt.',
      href: '#schritt7',
      stepNumber: 7,
    },
  ];

  return (
    <section className="relative pt-40 md:pt-40 lg:pt-44 pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8" style={{ minHeight: '85vh' }} aria-labelledby="hero-headline">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/photo_2025-07-09%2016.44.30.jpeg)',
          zIndex: 0
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)',
          opacity: 0.9,
          zIndex: 1,
        }}
      />
      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="accent-line"></div>
              <h1 id="hero-headline" className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span className="headline-line1">Würdest du DIR selbst zuhören?</span>
                <span className="headline-line2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 block">
                  Berühre das Herz. Bleib im Kopf.
                </span>
              </h1>

              <motion.div
                className="subline text-lg sm:text-xl md:text-2xl mt-6"
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
              <p className="mt-5 font-inter text-xs sm:text-sm font-light tracking-[0.22em] text-pearl-white/45">
                mit und ohne KI
              </p>

              <p className="mt-6 font-montserrat text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-pearl-white/60">
                Rhetorik · Storytelling · Performance · Wirkung
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {keyPoints.map((point, index) => {
                const Icon = point.icon;
                const media = stepMediaData[point.stepNumber];
                return (
                  <motion.a
                    key={index}
                    href={point.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hero-glass-card p-4 rounded-xl group"
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
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="p-2 rounded-full bg-gradient-to-r from-[#DAA520] to-[#F4D03F] group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-midnight-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-pearl-white">{point.title}</p>
                        <p className="text-xs text-pearl-white/70">{point.subtitle}</p>
                      </div>
                      {media && (
                        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
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
              <a
                href="https://claudiaconen-akademie.de/workshop-claudia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-4 border-2 border-luxury-gold text-pearl-white font-semibold rounded-full hover:bg-luxury-gold/10 transition-all duration-300 whitespace-nowrap"
              >
                Zum Gratis Webinar
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative group w-full lg:w-[400px] xl:w-[450px] video-nebel"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-luxury-gold/30" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://player.vimeo.com/video/1143907515"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Claudia Conen Video"
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
