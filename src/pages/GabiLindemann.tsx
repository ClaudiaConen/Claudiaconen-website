import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Magnet, CheckCircle, ArrowRight, Users, BarChart3, Globe, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ContactFormModal from '../components/ContactFormModal';
import SEO from '../components/SEO';

const packages = [
  {
    id: 'sichtbar',
    icon: Search,
    title: 'Sichtbar',
    subtitle: 'Website-Audit & Optimierung',
    price: 'ab 3.000',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-300/30',
    deliverables: [
      'Website-Audit (IST-Analyse, 5 Seiten)',
      'Conversion-Optimierung (Headlines, CTAs, Struktur)',
      '1 Landingpage (Design + Text + Funnel-Anbindung)',
    ],
    cta: 'Audit anfragen',
  },
  {
    id: 'unverwechselbar',
    icon: Palette,
    title: 'Unverwechselbar',
    subtitle: 'Komplettes Website-Redesign',
    price: 'ab 7.500',
    color: 'from-bright-gold to-luxury-gold',
    borderColor: 'border-bright-gold/30',
    deliverables: [
      'Komplettes Website-Redesign (bis 10 Seiten)',
      'Emotional-Selling-Konzept (Story, Proof, CTA-Logik)',
      'Content-Assets (Header-Bilder, Social Templates, Favicon)',
    ],
    cta: 'Projekt besprechen',
    recommended: true,
  },
  {
    id: 'magnetisch',
    icon: Magnet,
    title: 'Magnetisch',
    subtitle: 'Website + Funnel-System',
    price: 'ab 15.000',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-300/30',
    deliverables: [
      'Website + Funnel-System (Landing + E-Mail-Sequenz + Upsell)',
      'Emotional-Selling-Komplettpaket (Texte, Bilder, Video-Integration)',
      '3 Monate Betreuung (A/B-Tests, Optimierung, monatl. Report)',
    ],
    cta: 'Kostenlos beraten lassen',
  },
];

export default function GabiLindemann() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('');

  return (
    <>
      <SEO
        title="Emotionales Verkaufen im Webdesign | Claudia Conen & Gabi Lindemann"
        description="Webdesign, das berührt und konvertiert. Claudia Conen und Gabi Lindemann verbinden Emotional Selling mit professionellem Webdesign. Für Coaches, Speaker und Berater."
        keywords={['Webdesign', 'Emotional Selling', 'Conversion Optimierung', 'Claudia Conen', 'Gabi Lindemann', 'Landingpage', 'Funnel']}
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-bright-gold font-semibold text-lg mb-4 tracking-wide uppercase">Kooperation</p>
              <h1 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-5xl text-pearl-white mb-6 leading-tight">
                Deine Website verkauft –{' '}
                <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  oder sie kostet dich Kunden.
                </span>
              </h1>
              <p className="text-xl text-pearl-white/80 max-w-3xl mx-auto leading-relaxed">
                Claudia Conen & Gabi Lindemann: Webdesign, das berührt und konvertiert.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Gabi */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0 w-32 h-32 bg-gradient-to-br from-bright-gold to-luxury-gold rounded-full flex items-center justify-center">
                  <Globe size={48} className="text-midnight-blue" />
                </div>
                <div>
                  <h2 className="font-montserrat font-bold text-2xl text-midnight-blue mb-2">Gabi Lindemann</h2>
                  <p className="text-bright-gold font-semibold mb-4">Webdesign & Social Media Agentur</p>
                  <p className="text-gray-700 leading-relaxed">
                    Gabi Lindemann ist Expertin für emotionales Webdesign, Funnel-Strategie und Conversion-Optimierung.
                    Zusammen mit Claudia entsteht eine einzigartige Kombination: Die Kraft der Worte und der Stimme
                    trifft auf visuelles Storytelling, das verkauft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-pearl-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-midnight-blue text-center mb-4">
              Drei Pakete für deine digitale Präsenz
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Von der schnellen Optimierung bis zum kompletten Funnel-System.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
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
                    {pkg.recommended && (
                      <div className="absolute top-4 right-4 bg-bright-gold text-midnight-blue text-xs font-bold px-3 py-1 rounded-full">
                        Beliebt
                      </div>
                    )}
                    <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                      <Icon size={32} className="mb-3" />
                      <h3 className="font-montserrat font-bold text-2xl mb-1">{pkg.title}</h3>
                      <p className="text-white/90 text-sm">{pkg.subtitle}</p>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <ul className="space-y-3 mb-6 flex-1">
                        {pkg.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-midnight-blue">{pkg.price} €</span>
                        <span className="text-sm text-gray-500 ml-1">netto</span>
                      </div>
                      <button
                        onClick={() => {
                          setContactTopic(`Kooperation: ${pkg.title}`);
                          setIsContactFormOpen(true);
                        }}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${pkg.color} text-white font-bold rounded-full hover:scale-[1.02] transition-transform shadow`}
                      >
                        {pkg.cta} <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Für wen */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-50 rounded-2xl border border-green-200">
              <h3 className="font-bold text-xl text-green-800 mb-4 flex items-center gap-2">
                <Users size={24} /> Für wen?
              </h3>
              <ul className="space-y-2 text-green-700">
                {['Coaches, Speaker und Berater', 'Selbstständige, die online verkaufen wollen', 'Unternehmer, die ihre Website als Verkaufstool nutzen wollen', 'Alle, die eine Website wollen, die berührt UND konvertiert'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-red-50 rounded-2xl border border-red-200">
              <h3 className="font-bold text-xl text-red-800 mb-4 flex items-center gap-2">
                <Star size={24} /> Nicht geeignet für
              </h3>
              <ul className="space-y-2 text-red-700">
                {['E-Commerce / Shop-Projekte', 'Reine Logo- oder CI-Aufträge', 'Projekte ohne Budget für professionelles Design'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why this works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-pearl-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl text-midnight-blue mb-8">
              Warum diese Kombination funktioniert
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BarChart3, title: 'Strategie', desc: 'Claudia bringt die Verkaufspsychologie und Storytelling-Expertise – jedes Wort sitzt.' },
                { icon: Palette, title: 'Design', desc: 'Gabi macht aus Strategie ein visuelles Erlebnis, das Besucher in Kunden verwandelt.' },
                { icon: Magnet, title: 'Ergebnis', desc: 'Eine Website, die nicht nur gut aussieht, sondern tatsächlich Umsatz generiert.' },
              ].map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 bg-white rounded-2xl shadow-md border border-gray-200"
                  >
                    <ItemIcon size={32} className="mx-auto text-bright-gold mb-4" />
                    <h3 className="font-bold text-lg text-midnight-blue mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-midnight-blue to-royal-navy rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="font-montserrat font-bold text-3xl text-pearl-white mb-4">
              In 30 Minuten wissen Sie, ob wir zusammenpassen.
            </h2>
            <p className="text-pearl-white/80 text-lg mb-8">
              Kostenloses Kennenlerngespräch – unverbindlich und persönlich.
            </p>
            <button
              onClick={() => {
                setContactTopic('Kooperation Claudia & Gabi – Kennenlerngespräch');
                setIsContactFormOpen(true);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Kennenlerngespräch buchen
              <ArrowRight size={20} />
            </button>
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
