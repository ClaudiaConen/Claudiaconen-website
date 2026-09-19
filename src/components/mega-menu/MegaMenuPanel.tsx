import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MegaMenuItem } from '../../lib/megaMenuData';

interface MegaMenuPanelProps {
  item: MegaMenuItem;
  onClose: () => void;
}

export default function MegaMenuPanel({ item, onClose }: MegaMenuPanelProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(item.categories[0]?.id || '');
  const navigate = useNavigate();

  const activeCategory = item.categories.find(c => c.id === activeCategoryId) || item.categories[0];

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

  return (
    <div className="mega-menu-split">
      <div className="mega-menu-sidebar">
        <div className="mega-menu-sidebar-header">{item.label}</div>
        {item.categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeCategoryId;
          return (
            <div
              key={cat.id}
              className={`mega-menu-sidebar-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategoryId(cat.id)}
            >
              <div className="mega-menu-sidebar-icon">
                <Icon size={18} />
              </div>
              <span className="mega-menu-sidebar-label">{cat.label}</span>
              <span className="mega-menu-sidebar-arrow">
                <ChevronRight size={14} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mega-menu-panels">
        {activeCategory && (
          <div className="mega-menu-panel active">
            <div className="mega-menu-panel-header">
              <span className="mega-menu-panel-title">{activeCategory.panelTitle}</span>
              <span className="mega-menu-panel-subtitle">{activeCategory.panelSubtitle}</span>
            </div>
            <div className={`mega-menu-tile-grid ${activeCategory.columns === 3 ? 'cols-3' : ''}`}>
              {activeCategory.tiles.map((tile) => {
                const TileIcon = tile.icon;
                return (
                  <button
                    key={tile.name}
                    className={`mega-menu-tile ${tile.fullWidth ? 'full-width' : ''}`}
                    onClick={() => handleTileClick(tile.href, tile.external)}
                  >
                    <div className="mega-menu-tile-icon">
                      <TileIcon size={16} />
                    </div>
                    <div className="mega-menu-tile-text">
                      <span className="mega-menu-tile-name">{tile.name}</span>
                      {tile.desc && <span className="mega-menu-tile-desc">{tile.desc}</span>}
                    </div>
                    <span className="mega-menu-tile-arrow">
                      <ChevronRight size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
            {activeCategory.uebersicht && (
              <button
                className="mega-menu-uebersicht"
                onClick={() => handleTileClick(activeCategory.uebersicht!.href)}
              >
                <span>{activeCategory.uebersicht.name}</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
