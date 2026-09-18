import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SituationsBand from '../components/SituationsBand';
import Tueren from '../components/Tueren';
import LogoBand from '../components/LogoBand';
import MissionSection from '../components/MissionSection';
import ThemenCarousel from '../components/ThemenCarousel';
import ServiceCards from '../components/ServiceCards';
import HeroBrainSection from '../components/HeroBrainSection';
import Timeline from '../components/Timeline';
import About from '../components/About';
import SocialProof from '../components/SocialProof';
import ClaudiaAI from '../components/ClaudiaAI';
import Offers from '../components/Offers';
import FrequentQuestions from '../components/FrequentQuestions';
import ContactSection from '../components/ContactSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from '../components/CookieBanner';
import SEO from '../components/SEO';

const SEO_KEYWORDS = ['Claudia Conen', 'Voice-to-Brain', 'Köln', 'Witten', 'Kommunikationstraining', 'Persönlichkeitsentwicklung', 'Stimm-Coaching', 'Neurowissenschaft', 'Speaker Training', 'Business Coach Köln'];

export default function Home() {
  return (
    <div className="relative">
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
        <SituationsBand />
        <Tueren />
        <LogoBand />
        <ThemenCarousel />
        <ServiceCards />
        <HeroBrainSection />
        <MissionSection />
        <Timeline />
        <About />
        <SocialProof />
        <ClaudiaAI />
        <Offers />
        <FrequentQuestions />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
