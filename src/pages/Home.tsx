import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SituationsBand from '../components/SituationsBand';
import Tueren from '../components/Tueren';
import LogoBand from '../components/LogoBand';
import MissionSection from '../components/MissionSection';
import ThemenCarousel from '../components/ThemenCarousel';
import HeroBrainSection from '../components/HeroBrainSection';
import Timeline from '../components/Timeline';
import About from '../components/About';
import SocialProof from '../components/SocialProof';
import ClaudiaAI from '../components/ClaudiaAI';
import FrequentQuestions from '../components/FrequentQuestions';
import ContactSection from '../components/ContactSection';
import Impressionen from '../components/Impressionen';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from '../components/CookieBanner';
import SEO from '../components/SEO';

const SEO_KEYWORDS = ['Claudia Conen', 'Keynote-Speakerin', 'persönliche Wirkung', 'Wirkung auf andere', 'Stimme', 'Redner-Ausbildung', 'Voice-to-Brain', 'Witten', 'Ruhrgebiet'];

export default function Home() {
  return (
    <div className="relative">
      <SEO
        title="Claudia Conen | Keynote-Speakerin, Trainerin & Coach"
        description="Claudia Conen: Keynote-Speakerin, Trainerin, Coach und Autorin. Präsentationscoaching, Rhetoriktraining und Storytelling für Bühne, Kamera und Gespräch."
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
        <HeroBrainSection />
        <MissionSection />
        <Timeline />
        <About />
        <SocialProof />
        <ClaudiaAI />
        <FrequentQuestions />
        <ContactSection />
        <Impressionen />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
