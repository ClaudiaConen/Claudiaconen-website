import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/Claudia11.png',
  '/Claudia12.png',
  '/Claudia13.png',
  '/Claudia14.png',
  '/Claudia15.png',
  '/Claudia16.png',
  '/Claudia17.png'
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Claudia Conen Impression ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.border = '2px solid red';
            }}
          />
        </AnimatePresence>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft size={20} className="text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Nächstes Bild"
      >
        <ChevronRight size={20} className="text-gray-800" />
      </button>

      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#D4AF37] w-8'
                : 'bg-gray-400/50 hover:bg-gray-400/70'
            }`}
            aria-label={`Bild ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
