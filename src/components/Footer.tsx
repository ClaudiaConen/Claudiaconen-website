import { Link } from 'react-router-dom';
import Seitenuebersicht from './Seitenuebersicht';
import { Mail, Linkedin, Phone, Calendar, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections: Record<string, { title: string; links: { label: string; href: string; external?: boolean }[] }> = {
    about: {
      title: 'Über',
      links: [
        { label: 'Über mich', href: '/ueber-mich' },
        { label: 'Methode', href: '#solution' },
        { label: 'Menschen, mit denen ich gearbeitet habe', href: '#social-proof' },
      ],
    },
    offers: {
      title: 'Angebote',
      links: [
        { label: 'Voice to Impact', href: 'https://voice-to-impact-conv-h10m.bolt.host', external: true },
        { label: 'Voice-to-Brain Mentoring', href: 'https://claudia-conen-voice-ui2e.bolt.host', external: true },
        { label: 'Premium Workshop', href: '#offers' },
      ],
    },
    resources: {
      title: 'Ressourcen',
      links: [
        { label: 'ClaudiaAI Beta', href: '/claudia-ai' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shop', href: 'https://umsatzstimme-claudiaconen.tentary.com/', external: true },
        // 'Partnerprogramm' zeigte auf partnerprogramm.claudiaconen-akademie.de - nicht
        // erreichbar (geprueft 20. und 21.09.2026). Entfernt, bis es wieder eine Adresse gibt.
        { label: 'Kontakt', href: 'https://claudiaconen.com/termin-buchen', external: true },
      ],
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Seitenuebersicht />
    <footer className="bg-midnight-blue border-t border-luxury-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 border-b border-luxury-gold/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-pearl-white/80">
              <a href="mailto:info@claudiaconen-akademie.de" className="flex items-center gap-2 hover:text-bright-gold transition-colors">
                <Mail size={20} />
                info@claudiaconen-akademie.de
              </a>
              <a href="https://wa.me/4916093102073" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-bright-gold transition-colors">
                <Phone size={20} />
                +49 160 93102073
              </a>
            </div>
            <a
              href="https://claudiaconen.com/termin-buchen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            >
              <Calendar size={18} />
              Kostenloses Gespräch buchen
            </a>
          </div>
        </div>

        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-4">
              <picture>
                <source srcSet="/logo-192.webp" type="image/webp" />
                <img
                  src="/logo-192.jpg"
                  alt="Claudia Conen – KI & Mensch"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(218,165,32,0.4))' }}
                />
              </picture>
              <div>
                <h3 className="text-2xl font-montserrat font-bold text-bright-gold mb-2">
                  Claudia Conen
                </h3>
                <p className="text-pearl-white/60">Die Umsatzstimme</p>
              </div>
            </div>
            <p className="text-pearl-white/70 mb-4 leading-relaxed">
              37 Jahre Expertise in Persönlichkeitsentwicklung und Storytelling.
              Voice-to-Brain™ - Die Methode für unverwechselbare Wirkung.
            </p>
            <p className="text-pearl-white/70 mb-4 leading-relaxed">
              <span className="font-semibold">Standort:</span> Beisenweg 20, 58452 Witten, Deutschland
            </p>

            <div className="mb-6 rounded-xl overflow-hidden border border-luxury-gold/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.8!2d7.3365!3d51.4439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9193!2sBeisenweg%2020%2C%2058452%20Witten!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Karte Standort Claudia Conen Coaching Witten"
                title="Standort Claudia Conen in Witten"
              ></iframe>
            </div>

            <div className="flex gap-4">
              <a
                href="mailto:info@claudiaconen-akademie.de"
                className="w-10 h-10 rounded-full bg-royal-navy border border-luxury-gold/20 flex items-center justify-center hover:border-luxury-gold transition-colors"
              >
                <Mail size={18} className="text-pearl-white/70" />
              </a>
              <a
                href="https://www.linkedin.com/in/claudia-conen-die-stimme/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-royal-navy border border-luxury-gold/20 flex items-center justify-center hover:border-luxury-gold transition-colors"
              >
                <Linkedin size={18} className="text-pearl-white/70" />
              </a>
              <a
                href="https://www.instagram.com/claudia_conen_umsatzstimme/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-royal-navy border border-luxury-gold/20 flex items-center justify-center hover:border-luxury-gold transition-colors"
              >
                <Instagram size={18} className="text-pearl-white/70" />
              </a>
              <a
                href="https://wa.me/4916093102073"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-royal-navy border border-luxury-gold/20 flex items-center justify-center hover:border-luxury-gold transition-colors"
              >
                <Phone size={18} className="text-pearl-white/70" />
              </a>
            </div>
          </div>

          {Object.entries(sections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-montserrat font-semibold text-pearl-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pearl-white/70 hover:text-bright-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className="text-pearl-white/70 hover:text-bright-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-pearl-white/70 hover:text-bright-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-luxury-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-pearl-white/60 text-sm">
            © 2025 Claudia Conen. Alle Rechte vorbehalten.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            aria-label="Nach oben scrollen"
          >
            <ArrowUp size={18} />
            Nach oben
          </button>
          <div className="flex gap-6 text-sm">
            <Link to="/impressum" className="text-pearl-white/60 hover:text-bright-gold transition-colors font-semibold">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-pearl-white/60 hover:text-bright-gold transition-colors font-semibold">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-pearl-white/60 hover:text-bright-gold transition-colors font-semibold">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
