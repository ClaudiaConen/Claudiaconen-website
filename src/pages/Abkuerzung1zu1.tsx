import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Sparkles, Users, Briefcase, Target,
  Mic, BookOpen, Lightbulb, Megaphone, TrendingUp, Gift, Award
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import CountdownTimer from '../components/CountdownTimer';

export default function Abkuerzung1zu1() {
  const [expandedText, setExpandedText] = useState(false);

  const packages = [
    {
      type: '1x60min' as const,
      name: '1× 60 Minuten',
      oldPrice: 370,
      newPrice: 127,
      saving: 243,
      buyLink: 'https://umsatzstimme-claudiaconen.tentary.com/p/wyryok'
    },
    {
      type: '2x60min' as const,
      name: '2× 60 Minuten',
      oldPrice: 740,
      newPrice: 227,
      saving: 513,
      buyLink: 'https://umsatzstimme-claudiaconen.tentary.com/p/qlaMMQ'
    },
    {
      type: '3x60min' as const,
      name: '3× 60 Minuten',
      oldPrice: 1110,
      newPrice: 297,
      saving: 813,
      buyLink: 'https://umsatzstimme-claudiaconen.tentary.com/p/p0QvpV'
    }
  ];

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const topics = [
    { title: 'KI-Texte generieren', desc: 'Texte, die nach DIR klingen – nicht nach Maschine', icon: Sparkles },
    { title: 'Storytelling mit KI', desc: 'Geschichten, die im Kopf bleiben', icon: BookOpen },
    { title: 'Positionierung mit KI', desc: 'Was dich unverwechselbar macht', icon: Target },
    { title: 'Rhetoriktraining', desc: 'So sprechen, dass Menschen zuhören', icon: Mic },
    { title: 'Selbstbewusst reden', desc: 'Nervosität überwinden, souverän auftreten', icon: Award },
    { title: 'Audios aufzeichnen', desc: 'Podcast, Voice, Audiobook professionell umsetzen', icon: Mic },
    { title: 'Canva-Unterstützung', desc: 'Visuelles Marketing ohne Designstudium', icon: Lightbulb },
    { title: 'Freebie mit KI', desc: 'Lead-Magneten, die Kunden anziehen', icon: Gift },
    { title: 'Rede & Keynote', desc: 'Von der Idee bis zur Bühne', icon: Megaphone },
    { title: 'Elevator Pitch', desc: 'Dein Satz, der im Kopf bleibt', icon: TrendingUp },
    { title: 'Stimme & Wirkung', desc: 'Dein stärkstes Marketing-Instrument', icon: Mic },
    { title: '35 Jahre Praxiserfahrung', desc: 'Wissen, das in keinem Kurs steht', icon: Award }
  ];

  const targetGroups = [
    { text: 'Unternehmer & Selbstständige', icon: Briefcase },
    { text: 'Coaches, Trainer & Speaker', icon: Users },
    { text: 'Führungskräfte & Teamleiter', icon: Target },
    { text: 'Menschen, die an Wirkung, Stimme & Positionierung arbeiten wollen', icon: Mic },
    { text: 'Teilnehmer des Adventskalenders, die jetzt umsetzen wollen', icon: Sparkles }
  ];

  const processSteps = [
    'Buchung nur im Dezember 2025',
    '12 Monate Zeit für deinen Termin',
    'Thema frei wählbar (24 Türen + 35 Jahre Praxis)',
    'Persönlicher Zoom-Call',
    'Terminbuchung per Link nach dem Kauf'
  ];

  return (
    <>
      <SEO
        title="Deine 1:1 Abkürzung - 60 Minuten persönliches Coaching | Claudia Conen"
        description="60 Minuten. Ein Gespräch. Dein nächstes Level. Nur im Dezember 2025 - 12 Monate gültig. Persönliches 1:1 Coaching mit Claudia Conen."
        keywords={['1:1 Coaching', 'Persönliches Coaching', 'Mentoring', 'Business Coaching', 'Dezember Special']}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FBF8F3] to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-6 py-2 bg-[#C9A227] text-white rounded-full mb-6 text-sm font-semibold">
                  12 Monate gültig
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                  Deine 1:1 Abkürzung
                </h1>

                <p className="text-2xl sm:text-3xl text-[#C9A227] font-semibold mb-6">
                  60 Minuten. Ein Gespräch. Dein nächstes Level.
                </p>

                <div className="space-y-3 mb-8">
                  <p className="text-lg text-[#1A1A1A]">
                    24 Türchen geöffnet. Eine Tür fehlt noch.
                  </p>

                  {expandedText && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <p className="text-lg text-[#1A1A1A]">
                        Die Tür zu deiner Umsetzung – und ich halte sie dir auf.
                      </p>
                      <p className="text-lg text-[#1A1A1A]">
                        Weil ich weiß: 2026 steht vor der Tür. Und du willst vorbereitet sein.
                      </p>
                      <p className="text-lg text-[#C9A227] font-semibold">
                        Ich bin da, wo du mich brauchst.
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setExpandedText(!expandedText)}
                    className="text-[#C9A227] hover:text-[#F5E6B3] font-medium transition-colors underline"
                  >
                    {expandedText ? 'Weniger anzeigen' : 'Mehr lesen...'}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={scrollToPricing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A227] to-[#F5E6B3] text-[#1A1A1A] font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    JETZT SICHERN
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#C9A227]/20">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#C9A227]/20 to-[#F5E6B3]/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Sparkles className="mx-auto mb-4 text-[#C9A227]" size={64} />
                      <p className="text-2xl font-bold text-[#1A1A1A]">Deine persönliche Abkürzung</p>
                      <p className="text-[#666666] mt-2">60 Minuten volle Aufmerksamkeit</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FBF8F3]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
                Für wen ist dieses Angebot gemacht?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md border-2 border-[#C9A227]/10 hover:border-[#C9A227]/30 transition-colors"
                >
                  <group.icon className="text-[#C9A227] flex-shrink-0 mt-1" size={24} />
                  <p className="text-[#1A1A1A] font-medium">{group.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
                Dein Thema. Meine volle Aufmerksamkeit.
              </h2>
              <p className="text-lg text-[#666666] max-w-3xl mx-auto">
                Du wählst dein Thema frei – aus allen 24 Adventskalender-Türen PLUS 35 Jahren Praxiserfahrung.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 bg-[#FBF8F3] rounded-2xl border-2 border-[#C9A227]/10 hover:border-[#C9A227]/30 transition-all hover:shadow-lg group"
                  >
                    <Icon className="text-[#C9A227] mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{topic.title}</h3>
                    <p className="text-sm text-[#666666]">{topic.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FBF8F3] to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-8">
                Dezember-Special – einmalig & zeitlich begrenzt
              </h2>

              <div className="max-w-3xl mx-auto">
                <CountdownTimer targetDate="2025-12-31T23:59:59" />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 bg-white rounded-3xl border-4 shadow-xl hover:shadow-2xl transition-all ${
                    index === 1
                      ? 'border-[#C9A227] transform lg:scale-105'
                      : 'border-[#C9A227]/20'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#C9A227] text-white rounded-full text-sm font-bold shadow-lg">
                      BELIEBT
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{pkg.name}</h3>

                    <div className="mb-4">
                      <p className="text-lg text-[#666666] line-through">{pkg.oldPrice}€</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-[#C9A227]">{pkg.newPrice}€</span>
                      </div>
                    </div>

                    <div className="inline-block px-4 py-2 bg-green-50 border-2 border-green-200 rounded-xl">
                      <p className="text-green-700 font-bold">
                        Spare {pkg.saving}€
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>60 Minuten {index === 0 ? '' : `× ${index + 1}`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>Zoom-Call</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>Freie Themenwahl</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>12 Monate gültig</span>
                    </div>
                  </div>

                  <a
                    href={pkg.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full px-6 py-4 rounded-full font-bold text-lg transition-all block text-center ${
                      index === 1
                        ? 'bg-gradient-to-r from-[#C9A227] to-[#F5E6B3] text-[#1A1A1A] hover:scale-105 shadow-lg'
                        : 'bg-[#1A1A1A] text-white hover:bg-[#C9A227]'
                    }`}
                  >
                    JETZT SICHERN
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FBF8F3]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-8">
                So läuft es ab
              </h2>
            </motion.div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-lg text-[#1A1A1A] pt-1.5">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FBF8F3] to-white p-8 sm:p-12 rounded-3xl border-2 border-[#C9A227]/20 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">
                Du hast das Wissen. Dir fehlt der eine Schritt, der alles verbindet...
              </h2>

              <div className="space-y-6 text-lg text-[#1A1A1A]">
                <p className="text-center text-xl font-semibold text-[#C9A227]">
                  60 Minuten. Du und ich. Dein Thema.<br />
                  Keine Theorie – nur das, was dich wirklich weiterbringt.
                </p>

                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">Was dich erwartet:</h3>
                  <div className="space-y-3">
                    {[
                      'Volle Aufmerksamkeit – nur für DICH',
                      'Antworten auf DEINE Fragen',
                      'Konkrete nächste Schritte zur sofortigen Umsetzung',
                      'Die Abkürzung, die du brauchst'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="text-[#C9A227] flex-shrink-0 mt-1" size={20} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">So funktioniert es:</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Jetzt buchen im Dezember</li>
                    <li>Thema wählen</li>
                    <li>Termin innerhalb von 12 Monaten</li>
                    <li>Klarheit im Zoom-Call</li>
                  </ol>
                </div>

                <p className="text-center text-xl font-semibold italic">
                  Kein Druck. Keine Ausreden. Nur Klarheit.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A2E] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Bereit für deine Abkürzung?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Nur noch wenige Tage bis zum Jahresende. Sichere dir jetzt dein persönliches Coaching-Paket.
              </p>
              <motion.button
                onClick={scrollToPricing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C9A227] to-[#F5E6B3] text-[#1A1A1A] font-bold text-xl rounded-full shadow-2xl"
              >
                JETZT SICHERN
                <ArrowRight size={24} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
