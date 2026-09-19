import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Play, Quote } from 'lucide-react';
import VideoModal from './VideoModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  vimeo_url: string;
  thumbnail_path: string | null;
  display_order: number;
}

export default function TestimonialsSection() {
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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Testimonials werden geladen...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Quote className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Was unsere Kunden sagen
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-gold max-w-4xl mx-auto leading-relaxed tracking-wide">
            Echte Erfahrungen von Menschen, die ihre Stimme und Wirkung transformiert haben
          </h3>
        </div>

        <div className="space-y-6 max-w-7xl mx-auto">
          {firstRow.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {firstRow.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  thumbnailUrl={getThumbnailUrl(testimonial.thumbnail_path)}
                  onClick={() => setSelectedVideo(testimonial.vimeo_url)}
                />
              ))}
            </div>
          )}

          {secondRow.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {secondRow.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  thumbnailUrl={getThumbnailUrl(testimonial.thumbnail_path)}
                  onClick={() => setSelectedVideo(testimonial.vimeo_url)}
                />
              ))}
            </div>
          )}
        </div>
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

interface TestimonialCardProps {
  testimonial: Testimonial;
  thumbnailUrl: string | null;
  onClick: () => void;
}

function TestimonialCard({ testimonial, thumbnailUrl, onClick }: TestimonialCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Quote className="w-12 h-12 text-white opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
            <Play className="w-8 h-8 text-blue-600 ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1 leading-tight">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-200 leading-tight">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
