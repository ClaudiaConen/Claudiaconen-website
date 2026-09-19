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
              Menschen, mit denen ich
            </span>
            <span className="text-white"> gearbeitet habe</span>
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Keine ausgedachten Zitate. Menschen, die mit mir gearbeitet haben, und die
            selbst erzählen, was sich verändert hat.
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
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold/70 hover:shadow-[0_18px_40px_-18px_rgba(218,165,32,0.45)]">
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

                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/25 to-transparent transition-opacity group-hover:opacity-80" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}
                  />

                  {/* Oben rechts statt mittig: der Knopf sass vorher genau
                      auf dem Gesicht. Claudias Hinweis vom 19.09.2026. */}
                  <div className="absolute right-2.5 top-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/40 bg-midnight-blue/70 backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="ml-0.5 h-4 w-4 text-luxury-gold" />
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
