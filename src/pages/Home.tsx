import Navigation from '../components/Navigation';
import Hero, { HERO_HELL } from '../components/Hero';
import SituationsBand from '../components/SituationsBand';
import SituationsKacheln from '../components/SituationsKacheln';
import Tueren from '../components/Tueren';
import LogoBand from '../components/LogoBand';
import Werte from '../components/Werte';
import MissionSection from '../components/MissionSection';
import Timeline from '../components/Timeline';
import About from '../components/About';
import SocialProof from '../components/SocialProof';
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
        // Seitentitel und Suchbeschreibung: Claudias Vorgabe vom 23.09.2026 (10:37 UTC), Speaker ergaenzt (eine der vier Tueren).
        title="Claudia Conen | Keynotes, Rhetoriktraining & Auftrittscoaching"
        description="Keynotes, Rhetoriktraining und Auftrittscoaching für Unternehmer, Führungskräfte, Speaker, Coaches und Teams – klar sprechen, glaubwürdig auftreten, Menschen bewegen. Seit 37 Jahren."
        keywords={SEO_KEYWORDS}
      />
      <a href="#main" className="visually-hidden focusable">
        Zum Hauptinhalt springen
      </a>
      <header>
        {/* Helle Leiste, wenn der Kopf hell ist - kein Dunkel auf Dunkel am Seitenanfang (Claudia, 22.09.2026). */}
        <Navigation hell={HERO_HELL} />
      </header>
      <main id="main">
        <Hero />
        <SituationsBand />
        <SituationsKacheln />
        <Tueren />
        <Werte />
        <LogoBand />
        <MissionSection />
        <Timeline />
        <About />
        <SocialProof />
        {/* Block "Claudia AI" entfernt (Claudia, 22.09.2026 17:08 UTC: "nimm das ganz raus") - die Seite /claudia-ai bleibt ueber Menue und Fusszeile erreichbar. */}
        {/* "Haeufige Fragen" entfernt (Claudia, 23.09.2026 16:21 UTC): Die Wissensbibliothek hat ihre
            eigene Seite; auf der Startseite lenkte der Block vom Kontakt ab. Die Komponente
            FrequentQuestions.tsx bleibt im Code, falls sie zurueckkommen soll. */}
        <Momente />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
