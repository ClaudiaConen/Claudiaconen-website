import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, Sparkles, Target, ArrowRight, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function LinkedInFreebie() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreedToPrivacy) {
      setError('Bitte akzeptiere die Datenschutzerklärung, um fortzufahren.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-freebie-confirmation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email,
            source: 'linkedin-organic'
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
        <SEO
          title="Fast geschafft! | LinkedIn Freebie"
          description="Bitte bestätige deine E-Mail-Adresse, um dein Workbook zu erhalten."
          path="/linkedin-freebie"
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
                Fast geschafft!
              </h1>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Wir haben dir eine E-Mail an <strong className="text-bright-gold">{email}</strong> gesendet.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Bitte bestätige deine E-Mail-Adresse:
                </p>
                <ol className="text-left text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Schau in deinem Posteingang nach (auch im Spam-Ordner)</li>
                  <li>Klicke auf den Bestätigungslink in der E-Mail</li>
                  <li>Du erhältst sofort Zugriff auf dein Workbook</li>
                </ol>
              </div>

              <p className="text-sm text-gray-600 italic">
                Du hast keine E-Mail erhalten? Prüfe deinen Spam-Ordner oder versuche es erneut.
              </p>
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
        title="Unverwechselbar Du - Dein 7-Schritte Content-Plan | Kostenloses Workbook"
        description="Dein Wegweiser zur Unverwechselbarkeit. Workbook mit 7 Schritten für authentischen Content auf Social Media."
        path="/linkedin-freebie"
      />
      <Navigation />

      <main className="pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue px-4 py-2 rounded-full font-semibold mb-6 text-sm">
                <Download size={18} />
                <span>Kostenloses Workbook</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-blue mb-6 leading-tight">
                Unverwechselbar Du
                <br />
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Dein 7-Schritte Content-Plan
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-semibold">
                Dein Wegweiser zur Unverwechselbarkeit
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dieses Workbook ist mehr als Social-Media-Tipps. Es ist dein Kompass für das, was dich einzigartig macht – als Mensch und als Marke.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Für deinen Auftritt auf Social Media. Für deine Content-Produktion. Mit der künstlichen Intelligenz als Abkürzung – und Prompts, die dir den Weg erleichtern.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
                <h3 className="font-bold text-amber-900 text-lg mb-3 flex items-center gap-2">
                  <Sparkles size={20} />
                  Warum dieses Workbook?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Hand aufs Herz: Können wir Menschen wirklich etwas verkaufen? Nein. Wir können nur Emotionen wecken, die zum Kauf führen. Wir können niemanden auf den Button drücken lassen. Aber wir können zeigen, dass wir die Zeit und das Geld unserer Kunden wert sind.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-midnight-blue text-xl flex items-center gap-2">
                  <CheckCircle className="text-bright-gold" size={24} />
                  Was du lernst
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  In sieben Schritten findest du heraus:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Was dich wirklich unverwechselbar macht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Wie du Vertrauen aufbaust</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Wie du Content entwickelst, der wirkt – ohne stundenlang nach Ideen zu suchen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                  <Target size={20} />
                  Dein nächster Schritt
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Du hast zwei Möglichkeiten:
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">👉</span>
                    <span>Du arbeitest das Workbook Schritt für Schritt für dich durch – und entdeckst deine Unverwechselbarkeit.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">👉</span>
                    <span>Oder du gehst den Weg gemeinsam mit mir. Dann begleite ich dich im Coaching, damit deine Geschichte hörbar, sichtbar und unvergesslich wird.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-midnight-blue mb-6 text-center">
                  Jetzt kostenlos herunterladen
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Deine E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.de"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-bright-gold transition-colors text-gray-900"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={agreedToPrivacy}
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                      className="mt-1 w-5 h-5 text-bright-gold border-gray-300 rounded focus:ring-bright-gold"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
                      Ich stimme der{' '}
                      <a href="/datenschutz" target="_blank" className="text-blue-600 hover:underline font-semibold">
                        Datenschutzerklärung
                      </a>{' '}
                      zu und möchte das Workbook per E-Mail erhalten. Ich kann meine Einwilligung jederzeit widerrufen.
                    </label>
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-red-800 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !agreedToPrivacy}
                    className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-blue border-t-transparent"></div>
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        <span>Jetzt kostenlos sichern</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    Nach Eingabe deiner E-Mail erhältst du eine Bestätigungsmail. Klicke auf den Link, um dein Workbook herunterzuladen.
                  </p>
                </form>

                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                  <p className="text-center text-gray-700 font-semibold mb-4">
                    Oder buche direkt ein kostenloses Erstgespräch:
                  </p>
                  <a
                    href="https://claudiaconen.com/termin-buchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-midnight-blue text-white font-semibold rounded-full hover:scale-105 transition-transform text-center flex items-center justify-center gap-2"
                  >
                    <Calendar size={20} />
                    <span>Termin vereinbaren</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
                <p className="text-sm text-gray-700 text-center">
                  <strong className="text-green-800">100% kostenfrei.</strong> Keine Kreditkarte erforderlich. Keine versteckten Kosten.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
