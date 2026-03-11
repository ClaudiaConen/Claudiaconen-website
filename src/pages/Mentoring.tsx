import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Rocket, Clock, Video, MapPin, CheckCircle, ArrowRight, Calendar, MessageSquare, FileText, Users, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ContactFormModal from '../components/ContactFormModal';
import SEO from '../components/SEO';

const packages = [
  {
    id: 'power-session',
    icon: Zap,
    badge: 'Einzelimpuls',
    title: 'Power-Session',
    subtitle: '1:1 Intensiv, online',
    duration: '90–120 Min.',
    format: 'Online (Zoom)',
    price: '497',
    priceNote: 'netto',
    color: 'from-bright-gold to-luxury-gold',
    borderColor: 'border-bright-gold/30',
    description: 'Manchmal braucht es keinen Marathon, sondern einen Sprint. 90 Minuten geballte Expertise für deine konkrete Herausforderung.',
    includes: [
      '15 Min. Vorgespräch (Zoom, kostenlos)',
      '90 Min. Intensiv-Session (Zoom)',
      'Audio-Zusammenfassung + 3 Action Points per E-Mail',
    ],
    themes: [
      'Performance & Wirkung',
      'Stimme & Präsenz',
      'Pitch & Positionierung',
      'KI-Workflow für Content',
    ],
    forWhom: 'Unternehmer, Speaker und Führungskräfte, die einen konkreten Impuls brauchen.',
    notFor: 'Menschen, die langfristige Begleitung suchen.',
    cta: 'Power-Session buchen',
    ctaAction: 'booking',
    options: [
      { label: 'Einstieg', price: '397', note: 'Zugänglich für Erstbucher' },
      { label: 'Standard', price: '497', note: 'Inkl. Vor-/Nachbereitung', recommended: true },
      { label: 'Premium', price: '697', note: '+ 30 Min. Follow-up nach 2 Wochen' },
    ],
  },
  {
    id: 'vip-day',
    icon: Crown,
    badge: 'Ganztag',
    title: 'VIP Day',
    subtitle: 'Live oder Hybrid',
    duration: '6–8 Stunden',
    format: 'Vor Ort oder Zoom',
    price: '3.997',
    priceNote: 'netto',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-400/30',
    description: '1 intensiver Tag – dein persönlicher Durchbruch. Maximale Klarheit in minimaler Zeit.',
    includes: [
      'Vorbereitung: Fragebogen + 30 Min. Kickoff-Call',
      '6–8 Stunden VIP Day (vor Ort oder hybrid)',
      'Performance-Coaching + Stimme/Wirkung + KI-Setup',
      'Individueller Umsetzungsplan',
      '60 Min. Check-in Call nach 4 Wochen',
    ],
    themes: [
      'Persönliche Marke schärfen',
      'Stimme & Bühnenpräsenz',
      'KI-Tools & Workflows einrichten',
      'Content-Strategie entwickeln',
    ],
    forWhom: 'Selbstständige und Führungskräfte, die in 1 Tag maximale Klarheit wollen.',
    notFor: 'Teams oder Anfänger ohne Business-Grundlage.',
    cta: 'VIP Day anfragen',
    ctaAction: 'contact',
    options: [
      { label: 'Einstieg', price: '2.997', note: 'Für Soloselbstständige' },
      { label: 'Standard', price: '3.997', note: 'Inkl. Vor-/Nachbereitung + Follow-up', recommended: true },
      { label: 'Premium', price: '5.497', note: '+ 2. Follow-up + 30 Tage Voxer-Support' },
    ],
  },
  {
    id: 'signature',
    icon: Rocket,
    badge: '8–12 Wochen',
    title: 'Signature Mentoring',
    subtitle: 'Hybrid, intensive Begleitung',
    duration: '8–12 Wochen',
    format: 'Wöchentlich 1:1 + Voxer',
    price: '8.997',
    priceNote: 'netto (12 Wochen)',
    color: 'from-rose-500 to-pink-500',
    borderColor: 'border-rose-400/30',
    description: 'Deine komplette Transformation. Woche für Woche bauen wir gemeinsam deine unverwechselbare Marke auf.',
    includes: [
      'Wöchentliche 1:1 Sessions (60 Min., Zoom)',
      'Voxer-Audio-Feedback (Mo–Fr) zwischen den Sessions',
      'KI-Setup: Persönliche Prompts, Tool-Einrichtung, Content-Workflow',
      'Performance-Coaching: Stimme, Wirkung, Bühnenpräsenz',
      'Workbook + Leitfäden',
      'Abschluss-Session mit Zukunftsplan',
    ],
    themes: [
      'Persönliche Marke aufbauen',
      'Sichtbarkeit & Positionierung',
      'Stimme & Performance',
      'KI-Integration ins Business',
    ],
    forWhom: 'Ambitionierte Unternehmer, Speaker und Coaches, die ihre Marke auf das nächste Level bringen wollen.',
    notFor: 'Menschen, die „nur mal gucken" wollen oder ohne Umsetzungsbereitschaft.',
    cta: 'Signature Mentoring anfragen',
    ctaAction: 'contact',
    options: [
      { label: '8 Wochen', price: '5.997', note: '8 Sessions + Voxer + KI' },
      { label: '12 Wochen', price: '8.997', note: 'Volle Begleitung + alle Extras', recommended: true },
      { label: 'Premium 12 Wo.', price: '11.997', note: '+ 2 VIP-Halbtage + 6 Mo. Community Platin' },
    ],
  },
];

export default function Mentoring() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('');

  const handleCTA = (pkg: typeof packages[0]) => {
    if (pkg.ctaAction === 'booking') {
      window.location.href = '/termin-buchen';
    } else {
      setContactTopic(pkg.title);
      setIsContactFormOpen(true);
    }
  };

  return (
    <>
      <SEO
        title="Mentoring & Coaching | 1:1 mit Claudia Conen"
        description="Persönliches Mentoring mit Claudia Conen: Power-Session (90 Min.), VIP Day oder Signature Mentoring (8-12 Wochen). Performance, Stimme & KI – dein Durchbruch."
        keywords={['Mentoring', 'Coaching', '1:1', 'Claudia Conen', 'VIP Day', 'Power Session', 'Performance Coaching', 'Business Coaching Köln']}
      />
      <div className="relative min-h-screen bg-pearl-white">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 215, 77, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-bright-gold font-semibold text-lg mb-4 tracking-wide uppercase">Mentoring & Coaching</p>
              <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl text-pearl-white mb-6">
                Dein persönlicher{' '}
                <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Durchbruch
                </span>
              </h1>
              <p className="text-xl text-pearl-white/80 max-w-3xl mx-auto leading-relaxed">
                Drei Wege, mit mir zu arbeiten – vom schnellen Impuls bis zur kompletten Transformation.
                Performance, Stimme & KI in einer einzigartigen Kombination.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative bg-white rounded-3xl shadow-lg border-2 ${pkg.borderColor} overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col`}
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {pkg.badge}
                        </span>
                        <Icon size={32} />
                      </div>
                      <h3 className="font-montserrat font-bold text-2xl mb-1">{pkg.title}</h3>
                      <p className="text-white/90 text-sm">{pkg.subtitle}</p>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-gray-700 leading-relaxed mb-6">{pkg.description}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Clock size={14} /> {pkg.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          {pkg.format.includes('Zoom') || pkg.format.includes('Online') ? <Video size={14} /> : <MapPin size={14} />}
                          {pkg.format}
                        </span>
                      </div>

                      {/* Includes */}
                      <div className="mb-6">
                        <h4 className="font-bold text-midnight-blue mb-3">Inklusive:</h4>
                        <ul className="space-y-2">
                          {pkg.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* For whom */}
                      <div className="mb-6 p-4 bg-green-50 rounded-xl">
                        <p className="text-sm"><span className="font-bold text-green-700">Für wen:</span> {pkg.forWhom}</p>
                      </div>
                      <div className="mb-6 p-4 bg-red-50 rounded-xl">
                        <p className="text-sm"><span className="font-bold text-red-700">Nicht geeignet für:</span> {pkg.notFor}</p>
                      </div>

                      {/* Price options */}
                      <div className="mb-6">
                        <h4 className="font-bold text-midnight-blue mb-3">Investition (netto):</h4>
                        <div className="space-y-2">
                          {pkg.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                                opt.recommended
                                  ? 'border-bright-gold bg-bright-gold/5'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div>
                                <span className="font-semibold text-midnight-blue">{opt.label}</span>
                                {opt.recommended && (
                                  <span className="ml-2 text-xs bg-bright-gold text-midnight-blue px-2 py-0.5 rounded-full font-bold">
                                    Empfohlen
                                  </span>
                                )}
                                <p className="text-xs text-gray-500 mt-0.5">{opt.note}</p>
                              </div>
                              <span className="font-bold text-lg text-midnight-blue">{opt.price} €</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto">
                        <button
                          onClick={() => handleCTA(pkg)}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${pkg.color} text-white font-bold rounded-full hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
                        >
                          {pkg.cta}
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-pearl-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-midnight-blue text-center mb-4">
              So starten wir zusammen
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Egal welches Paket – der erste Schritt ist immer ein persönliches Gespräch.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: MessageSquare, step: '1', title: 'Erstgespräch', desc: 'Kostenlos & unverbindlich – wir klären deine Ziele und finden das passende Format.' },
                { icon: FileText, step: '2', title: 'Angebot', desc: 'Du erhältst ein individuelles Angebot mit allen Details zu Ablauf und Investition.' },
                { icon: Calendar, step: '3', title: 'Termin', desc: 'Wir finden den perfekten Zeitpunkt und starten mit deiner Vorbereitung.' },
                { icon: Rocket, step: '4', title: 'Durchbruch', desc: 'Wir arbeiten intensiv an deinem Ziel – mit messbaren Ergebnissen.' },
              ].map((item, i) => {
                const StepIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-bright-gold to-luxury-gold rounded-2xl flex items-center justify-center shadow-lg">
                      <StepIcon size={28} className="text-midnight-blue" />
                    </div>
                    <div className="text-sm font-bold text-bright-gold mb-1">Schritt {item.step}</div>
                    <h3 className="font-bold text-midnight-blue text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust / Warum Claudia */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-midnight-blue to-royal-navy rounded-3xl p-8 lg:p-12 text-pearl-white">
              <h2 className="font-montserrat font-bold text-3xl mb-6">
                Warum Mentoring mit Claudia?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Star, text: '35+ Jahre Erfahrung in Stimme, Performance & Kommunikation' },
                  { icon: Users, text: 'Tausende erfolgreiche Coachings und Mentorings' },
                  { icon: Zap, text: 'Einzigartige Kombination: Voice + Performance + KI' },
                  { icon: Crown, text: 'Persönliche Begleitung statt Massenprogramme' },
                ].map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <ItemIcon size={24} className="text-bright-gold shrink-0 mt-0.5" />
                      <p className="text-pearl-white/90">{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    setContactTopic('Mentoring – Erstgespräch');
                    setIsContactFormOpen(true);
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  Kostenloses Erstgespräch vereinbaren
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />

        <ContactFormModal
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          topic={contactTopic}
        />
      </div>
    </>
  );
}
