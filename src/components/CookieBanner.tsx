import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-royal-navy/95 backdrop-blur-sm border-t border-luxury-gold/20 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-pearl-white/90 text-sm">
                Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
                Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecline}
                className="px-6 py-2 text-pearl-white/80 hover:text-pearl-white transition-colors"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
