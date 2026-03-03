import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const bannerClosed = localStorage.getItem('betaBannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('betaBannerClosed', 'true');
  };

  if (!isVisible || location.pathname.startsWith('/member/') || location.pathname.startsWith('/admin/')) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#f5c400] text-black overflow-hidden z-[9999] py-1.5 flex items-center justify-between">
      <div className="inline-block whitespace-nowrap animate-scroll-left text-base tracking-wide">
        🛈 Dies ist die Betaversion der Webseite, Änderungen finden täglich statt.
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🛈 Dies ist die Betaversion der Webseite, Änderungen finden täglich statt.
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🛈 Dies ist die Betaversion der Webseite, Änderungen finden täglich statt.
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🛈 Dies ist die Betaversion der Webseite, Änderungen finden täglich statt.
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🛈 Dies ist die Betaversion der Webseite, Änderungen finden täglich statt.
      </div>
      <button
        onClick={handleClose}
        className="bg-transparent border-none text-black text-xl cursor-pointer mr-4 transition-all duration-200 hover:scale-110 hover:opacity-80"
        aria-label="Banner schließen"
      >
        ✕
      </button>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll-left {
            animation-duration: 70s;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .animate-scroll-left {
            animation-duration: 80s;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
