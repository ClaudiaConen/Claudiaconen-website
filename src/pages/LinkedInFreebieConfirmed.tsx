import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Calendar, ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function LinkedInFreebieConfirmed() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [email, setEmail] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-freebie-token?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.status === 'expired') {
          setStatus('expired');
          setEmail(data.email || '');
          return;
        }
        setStatus('error');
        return;
      }

      setEmail(data.email);
      setStatus('success');
    } catch (err) {
      console.error('Error verifying token:', err);
      setStatus('error');
    }
  };

  const handleDownload = () => {
    window.open('https://drive.google.com/file/d/1b1CtorSd9CBf4g9tNJUZ9qRDbkN6CPjY/view?usp=sharing', '_blank');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
        <SEO
          title="Bestätigung | LinkedIn Freebie"
          description="Deine E-Mail-Adresse wird bestätigt."
          path="/linkedin-freebie-confirmed"
          noindex
        />
        <Navigation />
        <main className="pt-40 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-bright-gold border-t-transparent mb-6"></div>
            <p className="text-xl text-gray-700">Bestätige deine E-Mail-Adresse...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
        <SEO
          title="Fehler | LinkedIn Freebie"
          description="Ein Fehler ist aufgetreten."
          path="/linkedin-freebie-confirmed"
          noindex
        />
        <Navigation />
        <main className="pt-40 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-midnight-blue mb-4">
                Ungültiger Link
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet.
              </p>
              <Link
                to="/linkedin-freebie"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform"
              >
                Zurück zur Anmeldung
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
        <SEO
          title="Link abgelaufen | LinkedIn Freebie"
          description="Dein Bestätigungslink ist abgelaufen."
          path="/linkedin-freebie-confirmed"
          noindex
        />
        <Navigation />
        <main className="pt-40 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-midnight-blue mb-4">
                Link abgelaufen
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Dieser Bestätigungslink ist leider abgelaufen. Links sind 24 Stunden gültig.
              </p>
              <Link
                to="/linkedin-freebie"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform"
              >
                Neue Anfrage stellen
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
      <SEO
        title="Vielen Dank! Dein Workbook wartet | LinkedIn Freebie"
        description="Deine E-Mail wurde bestätigt. Lade jetzt dein kostenloses Workbook herunter."
        path="/linkedin-freebie-confirmed"
        noindex
      />
      <Navigation />

      <main className="pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
              Vielen Dank, {email.split('@')[0]}!
            </h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Deine E-Mail-Adresse wurde erfolgreich bestätigt. Dein Workbook{' '}
              <strong className="text-bright-gold">"Unverwechselbar Du"</strong> wartet jetzt auf dich.
            </p>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-xl mb-8"
            >
              <Download size={24} />
              <span>Workbook jetzt herunterladen</span>
              <ExternalLink size={20} />
            </button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-bold text-blue-900 text-lg mb-3">
                Was als Nächstes?
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Arbeite das Workbook Schritt für Schritt durch</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Entdecke, was dich wirklich unverwechselbar macht</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Nutze die KI-Prompts für deinen Content</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-amber-900 text-lg mb-3">
                Brauchst du persönliche Unterstützung?
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ich begleite dich gerne persönlich auf deinem Weg zur Unverwechselbarkeit. Lass uns gemeinsam daran arbeiten, dass deine Geschichte hörbar, sichtbar und unvergesslich wird.
              </p>
              <a
                href="https://claudiaconen.com/termin-buchen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-blue text-white font-semibold rounded-full hover:scale-105 transition-transform"
              >
                <Calendar size={20} />
                <span>Kostenloses Erstgespräch buchen</span>
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                Du kannst das Workbook jederzeit erneut herunterladen, indem du diesen Link in deinen Lesezeichen speicherst.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
