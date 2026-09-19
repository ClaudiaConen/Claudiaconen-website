import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="text-center max-w-xl">
          <h1 className="text-8xl md:text-9xl font-montserrat font-bold bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-pearl-white mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-pearl-white/70 text-lg mb-8 leading-relaxed">
            Die angeforderte Seite existiert leider nicht oder wurde verschoben.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <Home size={18} />
              Zur Startseite
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-3 border-2 border-luxury-gold/40 text-bright-gold font-semibold rounded-full hover:bg-luxury-gold/10 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Zurueck
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
