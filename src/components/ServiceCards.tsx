import { motion } from 'framer-motion';
import { ArrowRight, Mic, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCards() {
  const services = [
    {
      number: '1.',
      title: 'Du willst überzeugen & im Kopf bleiben',
      tags: 'Bühne | Keynotes | Vorträge | Social Media',
      description: 'Entwickle eine Persönlichkeit, die unverwechselbar ist – auf jeder Bühne und in jedem Format.',
      link: '/speaker-training',
      footer: 'Speakerausbildung',
      icon: Mic,
      gradient: 'from-royal-navy to-midnight-blue',
      borderColor: 'royal-navy',
    },
    {
      number: '2.',
      title: 'Du willst dein Team stärken',
      tags: 'KI | Führung | Storytelling',
      description: 'KI ist die Abkürzung – dein Team macht den Unterschied. Kommunikation, die verkauft.',
      link: '/ki-manager-ausbildung',
      footer: 'KI-Manager Ausbildung',
      icon: Users,
      gradient: 'from-[#D4AF37] to-[#B8860B]',
      borderColor: 'luxury-gold',
    },
    {
      number: '3.',
      title: 'Du suchst einen Redner',
      tags: 'Hochzeit | Trauer | Voice Over',
      description: 'Für Momente, die unvergesslich bleiben. Worte, die berühren und verbinden.',
      link: '/redner-ausbildungen',
      footer: 'Ausbildung freie Redner',
      icon: Heart,
      gradient: 'from-midnight-blue to-[#0D1F3C]',
      borderColor: 'midnight-blue',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link to={service.link} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-8 flex flex-col"
                    style={{
                      borderTopWidth: '4px',
                      borderTopColor: service.borderColor === 'luxury-gold' ? '#D4AF37' : service.borderColor === 'royal-navy' ? '#1A2B4C' : '#0A1628'
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full" />

                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl font-bold text-luxury-gold/30">{service.number}</span>
                        <div className={`p-3 rounded-full bg-gradient-to-br ${service.gradient}`}>
                          <Icon size={24} className="text-white" />
                        </div>
                      </div>

                      <h3 className="font-montserrat font-bold text-xl md:text-2xl mb-3 text-midnight-blue leading-tight">
                        {service.title}
                      </h3>

                      <div className="mb-4">
                        <p className="text-sm text-luxury-gold font-medium">
                          {service.tags}
                        </p>
                      </div>

                      <p className="text-royal-navy/80 mb-6 leading-relaxed flex-1">
                        {service.description}
                      </p>

                      <div className="space-y-4">
                        <motion.div
                          className="flex items-center gap-2 text-midnight-blue font-semibold group-hover:gap-4 transition-all duration-300"
                        >
                          <span>Jetzt entdecken</span>
                          <motion.div
                            animate={{
                              x: [0, 5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowRight size={20} className="text-luxury-gold" />
                          </motion.div>
                        </motion.div>

                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${service.gradient} rounded-full`}>
                          <span className="text-white font-semibold text-sm">
                            {service.footer}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
