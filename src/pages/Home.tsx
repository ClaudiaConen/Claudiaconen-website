import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import About from '../components/About';
import UpcomingEvents from '../components/UpcomingEvents';
import SocialProof from '../components/SocialProof';
import Offers from '../components/Offers';
import FrequentQuestions from '../components/FrequentQuestions';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from '../components/CookieBanner';
import SEO from '../components/SEO';
import ScrollProgressBar from '../components/ScrollProgressBar';

const SEO_KEYWORDS = ['Claudia Conen', 'Voice-to-Brain', 'Köln', 'Witten', 'Kommunikationstraining', 'Persönlichkeitsentwicklung', 'Stimm-Coaching', 'Neurowissenschaft', 'Speaker Training', 'Business Coach Köln'];

export default function Home() {
  return (
    <div className="relative">
      <ScrollProgressBar />
      <SEO
        title="Claudia Conen | Voice-to-Brain® Expert Köln | Der Türöffner ins Kundengehirn"
        description="In nur 180ms entscheidet sich alles. Claudia Conen aus Köln zeigt dir, wie du mit Voice-to-Brain® deine Persönlichkeit zum unkopierbaren Erfolgsgarant machst. Jetzt mehr erfahren!"
        keywords={SEO_KEYWORDS}
      />
      <a href="#main" className="visually-hidden focusable">
        Zum Hauptinhalt springen
      </a>
      <header>
        <Navigation />
      </header>
      <main id="main">
        <Hero />
        <ServiceCards />
        <About />
        <UpcomingEvents />
        <SocialProof />
        <Offers />
        <FrequentQuestions />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
