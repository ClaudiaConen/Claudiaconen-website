import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from '../components/CookieBanner';
import SEO from '../components/SEO';
import OrbitalHero from '../components/premium/OrbitalHero';
import GlassPathwayCards from '../components/premium/GlassPathwayCards';
import ContactSection from '../components/ContactSection';

const SEO_KEYWORDS = [
  'Claudia Conen',
  'Premiumangebote',
  'Keynotes',
  'Coaching',
  'Mentoring',
  'Ausbildung',
  'KI-Manager',
  'Speaker-Ausbildung',
  'Unverwechselbarkeit',
];

export default function PremiumAngebote() {
  return (
    <div className="relative bg-pearl-white">
      <SEO
        title="Premium Angebote"
        description="Entdecke die vier Wege zur Unverwechselbarkeit: Vorträge & Events, Coaching & Mentoring, Ausbildung und Mensch & KI. Deine Einzigartigkeit ist Gold wert."
        keywords={SEO_KEYWORDS}
      />
      <a href="#main" className="visually-hidden focusable">
        Zum Hauptinhalt springen
      </a>
      <header>
        <Navigation />
      </header>
      <main id="main">
        <OrbitalHero />
        <GlassPathwayCards />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
