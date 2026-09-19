import { motion } from 'framer-motion';
import { ExternalLink, Star, Award, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Expert {
  name: string;
  expertise: string;
  description: string;
  website: string;
}

const experts: Expert[] = [
  {
    name: 'Dr. Karsten Brocke',
    expertise: 'Neurowissenschaften & Kommunikation',
    description: 'Experte für neurowissenschaftliche Grundlagen der Kommunikation und Wirkung. Seine Forschung zur 180-Millisekunden-Regel prägt das Verständnis für authentische Kommunikation.',
    website: 'https://www.example.com'
  },
  {
    name: 'Alexander Christiani',
    expertise: 'Storytelling & Verkauf',
    description: 'Einer der führenden Storytelling-Experten im deutschsprachigen Raum. Seine Methoden zeigen, wie Geschichten verkaufen und Menschen bewegen.',
    website: 'https://www.christiani.de'
  },
  {
    name: 'René Borbonus',
    expertise: 'Rhetorik & Präsentation',
    description: 'Rhetorik-Experte und Bestseller-Autor. Seine klare, direkte Art zu kommunizieren ist Vorbild für wirkungsvolles Sprechen ohne Verpackung.',
    website: 'https://www.borbonus.de'
  }
];

export default function Experten() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
      <SEO
        title="Experten | Die Wissensquellen der Umsatzstimme"
        description="Diese Experten haben mein Wissen geprägt. Menschen, von denen ich lernen durfte und die ich mit gutem Gewissen weiterempfehle."
        path="/experten"
      />
      <Navigation />

      <main className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/wissensbibliothek"
              className="inline-flex items-center gap-2 text-midnight-blue hover:text-bright-gold transition-colors font-semibold group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Zurück zur Wissensbibliothek</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue px-6 py-2 rounded-full font-semibold mb-6">
              <Star size={20} />
              <span>Expertenwissen</span>
            </div>
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-midnight-blue mb-6 px-2">
              Die Experten, von denen ich
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                lernen durfte
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
              Mein Wissen basiert auf 37 Jahren eigener Erfahrung und der Expertise dieser außergewöhnlichen Menschen.
              Diese Experten empfehle ich mit gutem Gewissen weiter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-luxury-gold/30"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                      <Award className="text-midnight-blue" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-midnight-blue">
                        {expert.name}
                      </h3>
                      <p className="text-sm text-bright-gold font-semibold">
                        {expert.expertise}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {expert.description}
                  </p>

                  <a
                    href={expert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                  >
                    <span>Website besuchen</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Users className="text-blue-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                  Über diese Liste
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die Wissensbibliothek auf dieser Website wurde mit KI-Unterstützung erstellt. Sie kombiniert meine
                  <strong> 37 Jahre praktische Erfahrung</strong> mit über <strong>2.100 Kunden</strong> und dem Wissen
                  dieser herausragenden Experten.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jeder Artikel in der Wissensbibliothek zeigt transparent, welche Expertenquellen verwendet wurden.
                  Die Kennzeichnung finden Sie am Ende jedes Artikels.
                </p>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Hinweis:</strong> Diese Liste wird kontinuierlich erweitert. Alle genannten Experten
                    und deren Beiträge sind in den jeweiligen Artikeln gekennzeichnet.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
