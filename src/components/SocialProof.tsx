import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import VideoModal from './VideoModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  vimeo_url: string;
  thumbnail_path: string | null;
  display_order: number;
}

export default function SocialProof() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(10);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getThumbnailUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage
      .from('testimonial-thumbnails')
      .getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <section id="social-proof" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-blue via-[#1A2B4C]/60 to-white" aria-labelledby="testimonials-headline">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 id="testimonials-headline" className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            <span className="text-bright-gold">
              Echte Stimmen unserer Kunden –
            </span>
            <span className="text-white"> Echte Wirkung</span>
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-7xl mx-auto leading-relaxed text-justify">
            Erfahrungen, Bewertungen und ehrliche Worte von Menschen, die Claudia Conen live erlebt haben – auf der Bühne, im Coaching, in Unternehmen oder bei freien Reden.
            Hier finden Sie authentische Feedbacks, persönliche Erfahrungsberichte, Videostimmen, O-Töne und Textnachrichten, die zeigen, was Wirkung wirklich bedeutet.
            <span className="block mt-3">
              Ob als Speakerin, Coach oder freie Rednerin – jede Stimme erzählt eine eigene Geschichte über Vertrauen, Emotion, Persönlichkeit und Wirkungskraft.
            </span>
            <span className="block mt-3">
              Diese echten Erfahrungen machen spürbar, was keine künstliche Intelligenz ersetzen kann: Menschliche Verbindung – vom Ohr über den Kopf direkt ins Herz.
            </span>
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/80 py-12">
            Testimonials werden geladen...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-white/80 py-12">
            Noch keine Testimonials vorhanden
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedVideo(testimonial.vimeo_url)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-luxury-gold/10 hover:border-luxury-gold/30">
                  {testimonial.thumbnail_path ? (
                    <img
                      src={getThumbnailUrl(testimonial.thumbnail_path) || ''}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F7F3EB] via-[#F2E8D5] to-[#E8DCC4] flex items-center justify-center">
                      <Play className="w-12 h-12 text-dark-gold/60" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-100 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="w-8 h-8 text-luxury-gold ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-semibold text-base mb-1 leading-tight">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-200 leading-tight">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {selectedVideo && (
        <VideoModal
          vimeoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
