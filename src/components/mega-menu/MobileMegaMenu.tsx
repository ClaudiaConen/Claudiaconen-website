import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, BookOpen } from 'lucide-react';
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
      className="xl:hidden bg-[rgba(10,31,68,0.98)] backdrop-blur-xl border-t border-[rgba(212,175,55,0.2)] max-h-[80vh] overflow-y-auto"
    >
      <div className="px-4 py-5 space-y-1">
        {megaMenuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => toggleMenu(item.id)}
              className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-white/90 hover:text-[#F7E7CE] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-200"
            >
              <span className="font-semibold text-[0.95rem]">{item.label}</span>
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
                          className="flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-white/70 hover:text-white hover:bg-[rgba(212,175,55,0.06)] transition-all duration-200"
                        >
                          <CatIcon size={16} className="text-[#D4AF37]/50 flex-shrink-0" />
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
                                  className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-white/60 hover:text-[#F7E7CE] hover:bg-[rgba(212,175,55,0.05)] transition-all duration-200 text-left"
                                >
                                  <ChevronRight size={12} className="text-[#D4AF37]/40 flex-shrink-0" />
                                  <span className="text-[0.8rem]">{tile.name}</span>
                                </button>
                              ))}
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

        <button
          onClick={() => handleTileClick('/buchprojekt')}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-4 rounded-full font-bold text-[0.8rem] uppercase tracking-wider border-2 border-[rgba(212,175,55,0.55)] text-[#F7E7CE] hover:text-white hover:bg-[rgba(212,175,55,0.1)] hover:border-[#D4AF37] transition-all duration-200"
        >
          <BookOpen size={16} />
          Buchprojekt
        </button>

        <button
          onClick={() => handleTileClick('/#contact')}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-2 rounded-full font-bold text-[0.8rem] uppercase tracking-wider"
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
