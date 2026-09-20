import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { MegaMenuItem, TileItem } from '../../lib/megaMenuData';

interface MegaMenuPanelProps {
  item: MegaMenuItem;
  onClose: () => void;
}

/**
 * Warum hier <Link> und <a> stehen und keine <button>:
 *
 * Ein Knopf hat kein Ziel. Ein Suchprogramm, das kein JavaScript
 * ausfuehrt - und das sind fast alle KI-Crawler - sieht bei einem
 * <button onClick={navigate}> gar nichts. Genau deshalb hatte die
 * Startseite am 19.09.2026 null Verweise nach innen, obwohl das Menue
 * einundsechzig Ziele kennt.
 *
 * Mit echten Verweisen sieht ein Programm dieselbe Struktur wie ein
 * Mensch. Nebenbei funktioniert dann auch, was Besucher erwarten:
 * mittlere Maustaste oeffnet in neuem Reiter, Rechtsklick bietet
 * "Adresse kopieren", und die Statuszeile zeigt, wohin es geht.
 */
export default function MegaMenuPanel({ item, onClose }: MegaMenuPanelProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(item.categories[0]?.id || '');
  const navigate = useNavigate();

  const activeCategory = item.categories.find(c => c.id === activeCategoryId) || item.categories[0];

  // Sprungmarken auf der Startseite brauchen weiterhin eine eigene
  // Behandlung: react-router springt bei einem #-Ziel nicht von selbst.
  const handleHash = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    navigate('/');
    setTimeout(() => {
      const el = document.querySelector(href.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const Kachel = ({ tile }: { tile: TileItem }) => {
    const TileIcon = tile.icon;
    const inhalt = (
      <>
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
      </>
    );
    const klasse = `mega-menu-tile ${tile.fullWidth ? 'full-width' : ''}`;

    if (tile.external) {
      return (
        <a
          href={tile.href}
          target="_blank"
          rel="noopener noreferrer"
          className={klasse}
          onClick={onClose}
        >
          {inhalt}
        </a>
      );
    }

    if (tile.href.startsWith('/#')) {
      return (
        <a href={tile.href} className={klasse} onClick={(e) => handleHash(e, tile.href)}>
          {inhalt}
        </a>
      );
    }

    return (
      <Link to={tile.href} className={klasse} onClick={onClose}>
        {inhalt}
      </Link>
    );
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
        {/* Alle Kategorien stehen im HTML, sichtbar ist die
            aufgeschlagene. Wuerde nur die aktive gerendert, staenden im
            Quelltext 41 statt 61 Verweise - ein Suchprogramm blaettert
            nicht durch die Kategorien. */}
        {item.categories.map((cat) => (
          <div
            key={cat.id}
            className={`mega-menu-panel ${cat.id === activeCategory?.id ? 'active' : ''}`}
            aria-hidden={cat.id !== activeCategory?.id}
          >
            <div className="mega-menu-panel-header">
              <span className="mega-menu-panel-title">{cat.panelTitle}</span>
              <span className="mega-menu-panel-subtitle">{cat.panelSubtitle}</span>
            </div>
            <div className={`mega-menu-tile-grid ${cat.columns === 3 ? 'cols-3' : ''}`}>
              {cat.tiles.map((tile) => (
                <Kachel key={tile.name} tile={tile} />
              ))}
            </div>
            {cat.uebersicht && (
              <Link
                to={cat.uebersicht.href}
                className="mega-menu-uebersicht"
                onClick={onClose}
              >
                <span>{cat.uebersicht.name}</span>
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
