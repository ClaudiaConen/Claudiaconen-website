import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SituationsBand from '../components/SituationsBand';
import SituationsKacheln from '../components/SituationsKacheln';
import Tueren from '../components/Tueren';
import LogoBand from '../components/LogoBand';
import MissionSection from '../components/MissionSection';
import Timeline from '../components/Timeline';
import About from '../components/About';
import SocialProof from '../components/SocialProof';
import ClaudiaAI from '../components/ClaudiaAI';
import FrequentQuestions from '../components/FrequentQuestions';
import ContactSection from '../components/ContactSection';
import Momente from '../components/Momente';
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
        description="Claudia Conen: Keynote-Speakerin, Trainerin, Coach und Autorin. Rhetorik, Storytelling, Präsentation und Kameratraining – seit 37 Jahren."
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
        <SituationsKacheln />
        <Tueren />
        <LogoBand />
        <MissionSection />
        <Timeline />
        <About />
        <SocialProof />
        <ClaudiaAI />
        <FrequentQuestions />
        <ContactSection />
        <Momente />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
