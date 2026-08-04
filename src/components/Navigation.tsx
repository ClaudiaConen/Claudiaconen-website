import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { megaMenuItems } from '../lib/megaMenuData';
import MegaMenuPanel from './mega-menu/MegaMenuPanel';
import MobileMegaMenu from './mega-menu/MobileMegaMenu';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearTimers = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  const handleMenuEnter = useCallback((menuId: string) => {
    clearTimers();
    if (activeMenuId) {
      setActiveMenuId(menuId);
    } else {
      openTimeoutRef.current = setTimeout(() => {
        setActiveMenuId(menuId);
      }, 150);
    }
  }, [activeMenuId, clearTimers]);

  const handleMenuLeave = useCallback(() => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 400);
  }, [clearTimers]);

  const handlePanelEnter = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  const handlePanelLeave = useCallback(() => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 300);
  }, [clearTimers]);

  const closeMegaMenu = useCallback(() => {
    clearTimers();
    setActiveMenuId(null);
  }, [clearTimers]);

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false);
    closeMegaMenu();
    navigate('/');
    setTimeout(() => {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'mega-nav-scrolled'
          : 'mega-nav-default'
      }`}
      style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); closeMegaMenu(); }}
            className="flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/logo-claudia-neu.jpg"
              alt="Claudia Conen – KI & Mensch"
              className="h-12 w-12 rounded-full object-cover"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))' }}
            />
          </a>

          <ul className="hidden xl:flex items-center gap-1 list-none">
            {megaMenuItems.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMenuEnter(item.id)}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`mega-nav-link ${activeMenuId === item.id ? 'active' : ''}`}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`mega-nav-chevron ${activeMenuId === item.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMenuId === item.id && (
                  <div
                    className="mega-menu-container"
                    onMouseEnter={handlePanelEnter}
                    onMouseLeave={handlePanelLeave}
                  >
                    <MegaMenuPanel item={item} onClose={closeMegaMenu} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href="https://the-power-of-ai.team"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Power of AI – Klick für Chancen"
              className="inline-flex h-11 overflow-hidden rounded-xl ring-1 ring-[rgba(212,175,55,0.35)] hover:ring-[rgba(212,175,55,0.7)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,175,55,0.25)] transition-all duration-300"
            >
              <img
                src="/power-of-ai-banner.jpg"
                alt="The Power of AI – Klick für Chancen"
                className="h-full w-auto block"
                loading="eager"
                decoding="async"
              />
            </a>
            <button
              onClick={handleCtaClick}
              className="mega-nav-cta"
            >
              <Calendar size={16} />
              Jetzt anfragen
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-pearl-white p-2 hover:text-[#D4AF37] transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMegaMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}
