import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function QuizGenerator() {
  return (
    <>
      <Navigation />
      <SEO
        title="Quiz Generator – Claudia Conen"
        description="Erstelle individuelle Quizze für dein Business."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] pt-44 pb-20 flex items-center justify-center">
        <div className="text-center text-pearl-white">
          <h1 className="text-4xl font-montserrat font-bold mb-4">Quiz Generator</h1>
          <p className="text-pearl-white/70 mb-8">Diese Seite wird gerade vorbereitet.</p>
          <Link to="/" className="text-bright-gold hover:underline">← Zurück zur Startseite</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
