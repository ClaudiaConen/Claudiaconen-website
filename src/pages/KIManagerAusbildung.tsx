import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Sparkles, Users, Target,
  Brain, Award, Shield, Star,
  Clock, Video, PlayCircle, HeartHandshake, Zap,
  X, Calendar, Mic
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import CountdownTimer from '../components/CountdownTimer';
import WhatsAppButton from '../components/WhatsAppButton';
import KIManagerBookingModal from '../components/KIManagerBookingModal';

export default function KIManagerAusbildung() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage] = useState('');

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const modules = [
    {
      number: 1,
      title: 'Orientierung im KI-Zeitalter',
      description: 'Einordnung, Möglichkeiten, Grenzen.'
    },
    {
      number: 2,
      title: 'Mensch im KI-Zeitalter als Vertrauensbooster',
      description: 'Persönlichkeit, Wirkung, Vertrauen.'
    },
    {
      number: 3,
      title: 'Grundlagen Künstliche Intelligenz',
      description: 'KI verständlich erklärt – ohne Technikstress.'
    },
    {
      number: 4,
      title: 'Data Literacy & Datenkompetenz',
      description: 'Datenqualität, Interpretation, Verantwortung.'
    },
    {
      number: 5,
      title: 'KI als Abkürzung im Alltag',
      description: 'Zeitgewinn, Struktur, Workflows.'
    },
    {
      number: 6,
      title: 'KI im Business',
      description: 'Praxis, Projekte, Integration.'
    },
    {
      number: 7,
      title: 'KI & Kommunikation',
      description: 'Positionierung, Ton-of-Voice, Social Media.'
    },
    {
      number: 8,
      title: 'Persönlichkeit, Stimme & Wirkung',
      description: 'Vertrauen aufbauen – analog & digital.'
    },
    {
      number: 9,
      title: 'Zukunftsmarkt & Transfer',
      description: 'Einordnung, Perspektive, Vorbereitung auf Zertifizierung.'
    }
  ];

  const results = [
    'KI verstehen und sinnvoll einordnen',
    'KI als Abkürzung im Alltag souverän nutzen',
    'Daten bewerten und fundierte Entscheidungen treffen (Data Literacy)',
    'KI für Organisation, Kommunikation, Inhalte & Social Media einsetzen',
    'Positionierung und Tonalität schärfen',
    'Vertrauen über Persönlichkeit, Stimme und Haltung aufbauen',
    'mit einer KI-Manager-Zertifizierung abschließen'
  ];

  const forWhom = [
    { text: 'KI im Alltag oder im Business souverän nutzen möchten', icon: Brain },
    { text: 'nicht austauschbar werden wollen', icon: Star },
    { text: 'Verantwortung tragen oder übernehmen', icon: Shield },
    { text: 'Klarheit, Struktur und Begleitung schätzen', icon: Target },
    { text: 'berufsbegleitend lernen möchten', icon: Clock }
  ];

  const notForWhom = [
    'nur Tools oder schnelle Hacks sammeln möchten',
    'ausschließlich Programmierung erwarten',
    'keine Bereitschaft zur Umsetzung mitbringen',
    'Verantwortung vollständig an Systeme abgeben wollen'
  ];

  const typicalParticipants = [
    'Unternehmer',
    'Selbstständige',
    'Führungskräfte',
    'Coaches',
    'Trainer',
    'Berater',
    'Angestellte mit Weiterbildungswunsch'
  ];

  const packages = [
    {
      name: 'Early Bird Einmalzahlung',
      priceNet: 1200,
      priceGross: 1428,
      validUntil: '15.06.2026',
      saving: 350,
      payment: 'Einmalig',
      highlight: true,
      features: [
        '3 Monate Ausbildung',
        'Selbstlern-Module',
        '8 Live-Sessions pro Monat',
        'Community-Zugang',
        'Aufzeichnungen',
        'Zertifizierung',
        'Ersparnis: 350€ zzgl. MwSt.'
      ]
    },
    {
      name: 'Early Bird Ratenzahlung',
      priceNet: 1320,
      priceGross: 1570.80,
      validUntil: '15.06.2026',
      saving: 385,
      payment: '6× 220€ zzgl. MwSt.',
      highlight: false,
      features: [
        '3 Monate Ausbildung',
        'Selbstlern-Module',
        '8 Live-Sessions pro Monat',
        'Community-Zugang',
        'Aufzeichnungen',
        'Zertifizierung',
        'Ersparnis: 385€ zzgl. MwSt.'
      ]
    },
    {
      name: 'Regulär Einmalzahlung',
      priceNet: 1550,
      priceGross: 1844.50,
      validFrom: '16.06.2026',
      payment: 'Einmalig',
      highlight: false,
      features: [
        '3 Monate Ausbildung',
        'Selbstlern-Module',
        '8 Live-Sessions pro Monat',
        'Community-Zugang',
        'Aufzeichnungen',
        'Zertifizierung'
      ]
    },
    {
      name: 'Regulär Ratenzahlung',
      priceNet: 1705,
      priceGross: 2028.95,
      validFrom: '16.06.2026',
      payment: '6× 284,17€ zzgl. MwSt.',
      highlight: false,
      features: [
        '3 Monate Ausbildung',
        'Selbstlern-Module',
        '8 Live-Sessions pro Monat',
        'Community-Zugang',
        'Aufzeichnungen',
        'Zertifizierung',
        '10% Flexibilitätsaufschlag'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="KI Manager Ausbildung – Mensch & KI im Einklang | Claudia Conen"
        description="Mit Persönlichkeit aus der Masse hervorstechen. KI als Abkürzung im Alltag souverän nutzen. 3 Monate Online-Ausbildung mit Claudia Conen. Start: 01.07.2026"
        keywords={['KI Manager Ausbildung', 'KI Weiterbildung', 'Data Literacy', 'KI im Business', 'Künstliche Intelligenz lernen', 'KI Zertifizierung', 'Claudia Conen']}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <section className="pt-44 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pearl-white via-white to-pearl-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-luxury-gold to-bright-gold text-white rounded-full mb-6 text-sm font-bold shadow-lg">
                  Start: 01.07.2026
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-blue mb-6 leading-tight">
                  KI Manager Ausbildung – Mensch & KI im Einklang
                </h1>

                <div className="space-y-3 mb-8 text-lg text-gray-700">
                  <p className="flex items-start gap-3">
                    <Check className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                    <span>Mit Persönlichkeit aus der Masse hervorstechen.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                    <span>KI als Abkürzung im Alltag souverän nutzen.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                    <span>Schritt für Schritt. Verständlich. Begleitet.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                    <span className="font-semibold">Auch ohne Vorerfahrung.</span>
                  </p>
                </div>

                <div className="bg-white border-2 border-luxury-gold/30 rounded-2xl p-6 mb-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-midnight-blue">3</div>
                      <div className="text-sm text-gray-600">Monate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-midnight-blue">Online</div>
                      <div className="text-sm text-gray-600">Selbstlernen + Live</div>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={scrollToPricing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Platz jetzt verbindlich sichern
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                  <img
                    src="/claudiaconen2.jpg"
                    alt="Claudia Conen - KI Manager Ausbildung"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight-blue/90 to-transparent p-6">
                    <p className="text-pearl-white font-semibold text-lg">Claudia Conen</p>
                    <p className="text-bright-gold">Die Umsatzstimme · KI-Managerin</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight text-white">
                Künstliche Intelligenz beschleunigt Prozesse<br />
                und verändert Arbeit, Kommunikation und Entscheidungen.
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-white">
                  Was sie nicht ersetzt, ist menschliche Wirkung.
                </p>
                <p className="text-white">
                  Diese Ausbildung zeigt dir, wie du KI nutzt,<br />
                  um Zeit zu gewinnen –<br />
                  und diese Zeit für Klarheit, Vertrauen und Persönlichkeit einsetzt.
                </p>
                <div className="pt-4">
                  <p className="text-2xl font-bold text-bright-gold">KI ist Werkzeug.</p>
                  <p className="text-2xl font-bold text-bright-gold">Der Mensch bleibt Entscheider.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
                Programm & Inhalte
              </h2>
              <p className="text-lg text-gray-600">9 Lektionen für deine KI-Manager Ausbildung</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-pearl-white rounded-2xl p-6 border-2 border-luxury-gold/10 hover:border-luxury-gold/30 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-bright-gold text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {module.number}
                    </div>
                    <h3 className="text-lg font-bold text-midnight-blue group-hover:text-luxury-gold transition-colors">
                      {module.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pearl-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="/kimanager1.png"
                  alt="KI Manager Ausbildung"
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-luxury-gold/20"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-6">
                  Dein Ergebnis nach 3 Monaten
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Nach dieser Ausbildung kannst du:
                </p>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-pearl-white rounded-xl"
                    >
                      <Award className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                      <span className="text-gray-700 font-medium">{result}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8">
                  <motion.button
                    onClick={scrollToPricing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                  >
                    Jetzt starten und durchstarten
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-luxury-gold/5 to-bright-gold/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-luxury-gold/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="text-luxury-gold" size={48} />
                <h2 className="text-3xl font-bold text-midnight-blue">
                  Data Literacy – Verständlich erklärt
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Data Literacy bedeutet, Daten zu verstehen, einzuordnen<br />
                und verantwortungsvoll für Entscheidungen zu nutzen.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Check className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">wie KI mit Daten arbeitet</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">wie Ergebnisse zu bewerten sind</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">wo menschliche Verantwortung bleibt</span>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xl font-bold text-midnight-blue text-center">
                  KI liefert Impulse. Menschen geben Richtung.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pearl-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
                Format & Ablauf
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-luxury-gold" size={32} />
                    <h3 className="text-2xl font-bold text-midnight-blue">Dauer & Start</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-luxury-gold">3</div>
                      <div>
                        <div className="font-bold text-midnight-blue">Monate</div>
                        <div className="text-sm text-gray-600">intensive Ausbildung</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Calendar className="text-luxury-gold" size={24} />
                      <div>
                        <div className="font-bold text-midnight-blue">Start: 01.07.2026</div>
                        <div className="text-sm text-gray-600">Sei von Anfang an dabei</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Video className="text-luxury-gold" size={32} />
                    <h3 className="text-2xl font-bold text-midnight-blue">Selbstlernen</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <PlayCircle className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Video- & Audioformate</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Lernen im eigenen Tempo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">auch für unterwegs geeignet</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-midnight-blue to-royal-navy text-pearl-white rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-bright-gold" size={32} />
                    <h3 className="text-2xl font-bold">Live-Begleitung</h3>
                  </div>
                  <p className="text-pearl-white/90 mb-6">Jeden Donnerstag:</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                      <Clock className="text-bright-gold" size={24} />
                      <div>
                        <div className="font-bold">10:00 – 11:00 Uhr</div>
                        <div className="text-sm text-pearl-white/70">Vormittags-Session</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                      <Clock className="text-bright-gold" size={24} />
                      <div>
                        <div className="font-bold">18:00 – 19:00 Uhr</div>
                        <div className="text-sm text-pearl-white/70">Abend-Session</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <p className="text-sm text-pearl-white/90">
                      <strong>4 Termine vormittags + 4 Termine abends pro Monat</strong>
                    </p>
                    <p className="text-sm text-pearl-white/70 mt-2">
                      Teilnahme flexibel: morgens, abends oder beides
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Check className="text-bright-gold flex-shrink-0 mt-1" size={20} />
                      <span className="text-sm">Fokus: Umsetzung, Fragen, Klarheit</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="text-bright-gold flex-shrink-0 mt-1" size={20} />
                      <span className="text-sm">Aufzeichnungen verfügbar</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HeartHandshake className="text-luxury-gold" size={32} />
                    <h3 className="text-2xl font-bold text-midnight-blue">Community</h3>
                  </div>
                  <p className="text-gray-700">
                    Geschützter Arbeits- & Austauschraum für Fragen, Impulse und gemeinsames Lernen – ruhig, wertschätzend, auf Augenhöhe.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-luxury-gold" size={32} />
                  <h3 className="text-2xl font-bold text-midnight-blue">Bonus</h3>
                </div>
                <p className="font-semibold text-midnight-blue mb-3">Impulse von Gastdozenten</p>
                <p className="text-gray-700 text-sm">
                  Im Laufe der Ausbildung wird es vereinzelt zusätzliche Impulse von erfahrenen Persönlichkeiten aus unterschiedlichen Fachbereichen geben. Diese Gastbeiträge sind als Bonus gedacht – zur Inspiration, zum Perspektivwechsel und zur Vertiefung einzelner Themen.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-luxury-gold" size={32} />
                  <h3 className="text-2xl font-bold text-midnight-blue">1:1-Sessions</h3>
                </div>
                <p className="font-semibold text-midnight-blue mb-3">Optional buchbar</p>
                <p className="text-gray-700 text-sm">
                  Zusätzlich zur Gruppenbegleitung können persönliche 1:1-Sessions auf Wunsch hinzugebucht werden. Diese Einzeltermine dienen der individuellen Vertiefung, strategischen Klärung und persönlichen Ausrichtung. Für Teilnehmer gelten exklusive Sonderkonditionen.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
                Für wen ist diese Ausbildung geeignet?
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-gold/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Check className="text-green-500" size={32} />
                  <h3 className="text-2xl font-bold text-midnight-blue">Geeignet für</h3>
                </div>
                <p className="text-gray-700 mb-6">Diese Ausbildung ist geeignet für Menschen, die:</p>
                <div className="space-y-4">
                  {forWhom.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Icon className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="font-semibold text-midnight-blue mb-3">Typische Teilnehmer:</p>
                  <div className="flex flex-wrap gap-2">
                    {typicalParticipants.map((participant, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-luxury-gold/10 text-midnight-blue rounded-full text-sm font-medium"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <X className="text-red-500" size={32} />
                  <h3 className="text-2xl font-bold text-midnight-blue">Nicht geeignet für</h3>
                </div>
                <p className="text-gray-700 mb-6">Diese Ausbildung ist nicht gedacht für Menschen, die:</p>
                <div className="space-y-4">
                  {notForWhom.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.button
                onClick={scrollToPricing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Das passt zu mir – jetzt anmelden
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pearl-white to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-6">
                  Zertifizierung & Prüfung
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Award className="text-luxury-gold flex-shrink-0 mt-1" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-midnight-blue mb-2">
                        KI-Manager-Zertifizierung
                      </h3>
                      <p className="text-gray-700">
                        Die Zertifizierung kann innerhalb von 12 Monaten nach Start der Ausbildung abgelegt werden.
                      </p>
                    </div>
                  </div>
                  <div className="bg-pearl-white rounded-2xl p-6">
                    <h4 className="font-bold text-midnight-blue mb-3">Flexibilität</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>
                        Der Prüfungstermin wird individuell in Absprache festgelegt und richtet sich nach dem persönlichen Lernfortschritt sowie den verfügbaren Terminen im Prüfungskalender.
                      </p>
                      <p>
                        In begründeten Fällen ist eine Verlängerung möglich.
                      </p>
                    </div>
                  </div>
                  <div className="bg-pearl-white rounded-2xl p-6">
                    <h4 className="font-bold text-midnight-blue mb-3">Dein Lerntempo</h4>
                    <p className="text-sm text-gray-700">
                      Die Ausbildung ist auf 3 Monate ausgelegt. Wer fokussiert arbeitet und schnell umsetzt, kann die Ausbildung auch in kürzerer Zeit absolvieren. Du bestimmst dein Lerntempo – die Begleitung bleibt für alle gleich wertvoll.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="/claudiaconen3_(1).png"
                  alt="Claudia Conen - Zertifizierte KI-Managerin"
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-luxury-gold/20"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pearl-white to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src="/claudiaconen_(3).png"
                  alt="Claudia Conen - Die Umsatzstimme"
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-luxury-gold/20"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-6">
                  Über mich
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="text-xl font-bold text-luxury-gold">
                    Claudia Conen – bekannt als „Die Umsatzstimme"
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Award className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                      <span>Performance-Coach seit über 35 Jahren</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Brain className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                      <span>KI-Managerin</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mic className="text-luxury-gold flex-shrink-0 mt-1" size={24} />
                      <span>Expertin für Wirkung, Persönlichkeit und hörbare Präsenz</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-midnight-blue to-royal-navy text-pearl-white rounded-2xl p-6 mt-6">
                    <p className="text-lg font-semibold mb-2 text-white">Meine Überzeugung:</p>
                    <p className="text-2xl font-bold text-bright-gold">
                      KI schenkt Zeit.<br />
                      Diese Zeit gehört dem Menschen.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <motion.button
                    onClick={scrollToPricing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                  >
                    Mit Claudia zusammenarbeiten
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pearl-white to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
                Preise & Zahlungsweisen
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Alle Preise zzgl. gesetzlicher Mehrwertsteuer
              </p>
              <div className="max-w-3xl mx-auto">
                <CountdownTimer targetDate="2026-06-15T23:59:59" />
                <p className="text-sm text-gray-600 mt-4">
                  Einführungspreis endet am 15.06.2026
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 bg-white rounded-3xl shadow-xl transition-all hover:shadow-2xl ${
                    pkg.highlight
                      ? 'border-4 border-luxury-gold transform lg:scale-105'
                      : 'border-2 border-gray-200'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-luxury-gold to-bright-gold text-white rounded-full text-sm font-bold shadow-lg">
                      EMPFOHLEN
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-midnight-blue mb-3">{pkg.name}</h3>
                    {pkg.validUntil && (
                      <div className="inline-block px-3 py-1 bg-green-50 border-2 border-green-200 rounded-lg mb-3">
                        <p className="text-xs text-green-700 font-semibold">
                          Gültig bis {pkg.validUntil}
                        </p>
                      </div>
                    )}
                    {pkg.validFrom && (
                      <div className="inline-block px-3 py-1 bg-gray-50 border-2 border-gray-200 rounded-lg mb-3">
                        <p className="text-xs text-gray-700 font-semibold">
                          Ab {pkg.validFrom}
                        </p>
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-luxury-gold">{pkg.priceNet}€</span>
                      </div>
                      <p className="text-sm text-gray-600">zzgl. MwSt.</p>
                      <p className="text-xs text-gray-500 mt-1">
                        (inkl. MwSt: {pkg.priceGross}€)
                      </p>
                    </div>
                    <p className="text-sm text-midnight-blue font-semibold mb-3">{pkg.payment}</p>
                    {pkg.saving && (
                      <div className="inline-block px-4 py-2 bg-green-50 border-2 border-green-200 rounded-xl">
                        <p className="text-green-700 font-bold text-sm">
                          Spare {pkg.saving}€ zzgl. MwSt.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2 text-sm">
                        <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => {
                      if (index <= 1) {
                        window.open('https://umsatzstimme-claudiaconen.tentary.com/p/ki-manager-ausbildung', '_blank');
                      } else {
                        window.open('https://umsatzstimme-claudiaconen.tentary.com/p/ki-manager-ausbildungregulaer', '_blank');
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-6 py-3 rounded-full font-bold transition-all ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-luxury-gold to-bright-gold text-white shadow-lg'
                        : 'bg-midnight-blue text-white hover:bg-royal-navy'
                    }`}
                  >
                    Jetzt buchen
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-midnight-blue to-royal-navy text-pearl-white rounded-3xl p-8 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Verbindliche Anmeldung</h3>
              <div className="space-y-3">
                <p className="text-white">
                  <strong className="text-white">Du sicherst dir jetzt deinen Platz und meldest dich verbindlich an.</strong>
                </p>
                <p className="text-white">
                  Die Ausbildung beginnt am 01.07.2026.
                </p>
                <p className="text-white">
                  Wer sich bis zum 15.06.2026 anmeldet oder bezahlt, erhält automatisch den Einführungspreis (bei Einmalzahlung oder Early-Bird-Ratenzahlung).
                </p>
                <p className="text-bright-gold font-semibold">
                  Das ist seriös, fair und transparent.
                </p>
              </div>
              <div className="mt-6 text-center">
                <motion.button
                  onClick={scrollToPricing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Platz jetzt verbindlich sichern
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] text-pearl-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight text-bright-gold">
                KI wird schneller.<br />
                Märkte werden voller.<br />
                Persönlichkeit bleibt das,<br />
                was Vertrauen entstehen lässt.
              </h2>
              <p className="text-xl mb-10 text-pearl-white/80">
                Sichere dir jetzt deinen Platz in der KI Manager Ausbildung und profitiere vom Einführungspreis.
              </p>
              <motion.button
                onClick={scrollToPricing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-xl rounded-full shadow-2xl"
              >
                JETZT VERBINDLICH ANMELDEN
                <ArrowRight size={24} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
        <KIManagerBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPackage={selectedPackage}
        />
      </div>
    </>
  );
}
