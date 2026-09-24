import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { megaMenuItems } from '../../lib/megaMenuData';

interface MobileMegaMenuProps {
  onClose: () => void;
}

export default function MobileMegaMenu({ onClose }: MobileMegaMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTileClick = (href: string, external?: boolean) => {
    onClose();
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href);
    }
  };

  const toggleMenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
    setExpandedCategory(null);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="xl:hidden bg-white border-t border-[rgba(26,43,76,0.08)] shadow-[0_20px_50px_-20px_rgba(26,43,76,0.25)] max-h-[80vh] overflow-y-auto"
    >
      <div className="px-4 py-5 space-y-1">
        {/* Start steht ganz oben - am Telefon ist das Logo klein und wird nicht als Heimweg erkannt. */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onClose(); navigate('/'); }}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-[#1A2B4C] font-semibold text-[0.95rem] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-200 no-underline"
        >
          <Home size={17} className="text-[#B8860B] flex-shrink-0" aria-hidden="true" />
          Start
        </a>
        {megaMenuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => toggleMenu(item.id)}
              className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-[#1A2B4C] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-200"
            >
              <span className="flex items-center gap-2 font-semibold text-[0.95rem]">
                {item.geschenk && (
                  <img src="/icons/geschenk.webp" alt="" width={242} height={256} decoding="async" className="cc-geschenk" />
                )}
                {item.label}
                {item.punkt && <span className="cc-geschenk-punkt" aria-hidden="true" />}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 text-[#D4AF37]/60 ${expandedMenu === item.id ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {expandedMenu === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden pl-2"
                >
                  {item.categories.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <div key={cat.id} className="mb-1">
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className="flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-[rgba(26,43,76,0.78)] hover:text-[#1A2B4C] hover:bg-[rgba(212,175,55,0.07)] transition-all duration-200"
                        >
                          <CatIcon size={16} className="text-[#B8860B]/70 flex-shrink-0" />
                          <span className="text-[0.85rem] font-medium flex-1 text-left">{cat.label}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 text-[#D4AF37]/40 ${expandedCategory === cat.id ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedCategory === cat.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 space-y-0.5"
                            >
                              {cat.tiles.map((tile) => (
                                <button
                                  key={tile.name}
                                  onClick={() => handleTileClick(tile.href, tile.external)}
                                  className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-[rgba(26,43,76,0.68)] hover:text-[#B8860B] hover:bg-[rgba(212,175,55,0.06)] transition-all duration-200 text-left"
                                >
                                  <ChevronRight size={12} className="text-[#B8860B]/55 flex-shrink-0" />
                                  <span className="text-[0.8rem]">{tile.name}</span>
                                </button>
                              ))}
                              {cat.uebersicht && (
                                <button
                                  onClick={() => handleTileClick(cat.uebersicht!.href)}
                                  className="mt-1 flex w-full items-center gap-2 border-t border-[rgba(26,43,76,0.09)] px-3 py-2.5 text-left text-[rgba(26,43,76,0.66)] transition-colors duration-200 hover:text-[#B8860B]"
                                >
                                  <span className="text-[0.78rem]">{cat.uebersicht.name}</span>
                                  <ChevronRight size={12} className="flex-shrink-0 text-[#D4AF37]/60" />
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <a
          href="https://the-power-of-ai.team"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          aria-label="The Power of AI – Klick für Chancen"
          className="flex items-center justify-center w-full mt-4 rounded-2xl overflow-hidden ring-1 ring-[rgba(212,175,55,0.4)] hover:ring-[rgba(212,175,55,0.7)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.25)] transition-all duration-200"
        >
          <img
            src="/power-of-ai-banner.jpg"
            width={300}
            height={100}
            alt="The Power of AI – Klick für Chancen"
            className="block w-full h-auto"
            loading="eager"
            decoding="async"
          />
        </a>

        <button
          onClick={() => handleTileClick('/#contact')}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-3 rounded-full font-bold text-[0.8rem] uppercase tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
            color: '#0A1F44',
            boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
          }}
        >
          <Calendar size={16} />
          Jetzt anfragen
        </button>
      </div>
    </motion.div>
  );
}
