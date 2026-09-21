import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const { pathname } = useLocation();

  // In welchem Menuebereich liegt die Seite, auf der wir gerade sind?
  // Gesucht wird in allen Kacheln und Uebersichtszielen - der erste
  // Bereich, der die Adresse kennt, gewinnt.
  const hierBereich = megaMenuItems.find((bereich) =>
    bereich.categories.some(
      (kat) =>
        kat.tiles.some((t) => !t.external && t.href === pathname) ||
        kat.uebersicht?.href === pathname
    )
  )?.id;

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

  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsMobileMenuOpen(false);
    closeMegaMenu();
    navigate('/');
    // Die Startseite laedt ihre Abschnitte nach. Nach festen 100 ms gab es
    // #contact von einer Unterseite aus oft noch nicht - der Besucher landete
    // dann oben auf der Startseite statt beim Formular. Deshalb: suchen, bis
    // der Abschnitt da ist, hoechstens zwei Sekunden.
    let versuche = 0;
    const suchen = () => {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      versuche += 1;
      if (versuche < 20) setTimeout(suchen, 100);
    };
    setTimeout(suchen, 100);
  };

  return (
    <nav
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'mega-nav-scrolled'
          : 'mega-nav-default'
      }`}
      style={{ borderBottom: '1px solid rgba(218,165,32,0.2)' }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); closeMegaMenu(); }}
            title="Zur Startseite"
            aria-label="Zur Startseite"
            className="flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
          >
            {/* 192 Pixel statt 1254. Angezeigt werden 48 - das reicht
                auch bei dreifacher Bildschirmdichte. Das Logo laedt auf
                JEDER Seite, deshalb zaehlt hier jedes Kilobyte:
                7 statt 112 KB. */}
            <picture>
              <source srcSet="/logo-192.webp" type="image/webp" />
              <img
                src="/logo-192.jpg"
                alt="Claudia Conen – KI & Mensch"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
                style={{ filter: 'drop-shadow(0 0 8px rgba(218,165,32,0.4))' }}
              />
            </picture>
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
                  className={`mega-nav-link ${activeMenuId === item.id ? 'active' : ''} ${
                    hierBereich === item.id ? 'hier' : ''
                  }`}
                  aria-current={hierBereich === item.id ? 'true' : undefined}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`mega-nav-chevron ${activeMenuId === item.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Das Feld steht immer im HTML und wird nur ausgeblendet.
                    Wuerde es erst beim Oeffnen entstehen, saehe ein
                    Suchprogramm nie einen einzigen Menuepunkt - es
                    oeffnet ja kein Menue. */}
                <div
                  className={`mega-menu-container ${activeMenuId === item.id ? '' : 'zu'}`}
                  aria-hidden={activeMenuId !== item.id}
                  onMouseEnter={handlePanelEnter}
                  onMouseLeave={handlePanelLeave}
                >
                  <MegaMenuPanel item={item} onClose={closeMegaMenu} />
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href="https://the-power-of-ai.team"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Power of AI – Klick für Chancen"
              className="inline-flex h-11 overflow-hidden rounded-xl ring-1 ring-[rgba(218,165,32,0.35)] hover:ring-[rgba(218,165,32,0.7)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(218,165,32,0.25)] transition-all duration-300"
            >
              <img
                src="/power-of-ai-banner.jpg"
                width={300}
                height={100}
                alt="The Power of AI – Klick für Chancen"
                className="h-full w-auto block"
                loading="eager"
                decoding="async"
              />
            </a>
            {/* Ein echter Verweis statt eines Knopfes: Als <button> war der
                einzige Anfrage-Weg der Kopfzeile fuer Suchprogramme unsichtbar
                (gemessen am 21.09.2026: null Verweise auf Kontakt im Menue). */}
            <a
              href="/#contact"
              onClick={handleCtaClick}
              className="mega-nav-cta no-underline"
            >
              <Calendar size={16} />
              Jetzt anfragen
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-pearl-white p-2 hover:text-[#DAA520] transition-colors"
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
