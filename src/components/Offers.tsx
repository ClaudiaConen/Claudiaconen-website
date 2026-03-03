import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star } from 'lucide-react';
import CoachingInquiryForm from './CoachingInquiryForm';

export default function Offers() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const offers = [
    {
      name: 'Voice to Impact – STORYGOLD',
      price: '87€',
      badge: 'Workshop',
      badgeColor: 'from-blue-500 to-blue-600',
      benefit: 'In 3 Stunden raus aus der Masse, rein in die Unverwechselbarkeit',
      features: [
        '3-stündiger intensiver Workshop',
        'Entwickle deine einzigartige Story',
        'Sofort anwendbare Techniken',
        'Unverwechselbare Wirkung schaffen',
      ],
      buttonText: 'Workshop buchen',
      buttonColor: 'from-blue-500 to-blue-600',
      link: 'https://voice-to-impact-conv-h10m.bolt.host/',
      highlighted: false,
      isExternal: true,
    },
    {
      name: 'Voice-to-Brain Mentoring',
      price: 'Hier weitere Informationen einsehen:',
      badge: 'BESTSELLER - KI-Zeitalter',
      badgeColor: 'from-[#D4AF37] to-[#FFD700]',
      benefit: '12-18 Wochen Mentoring: Unverwechselbar DU im KI-Zeitalter',
      features: [
        '12 wöchentliche Live-Sessions',
        '7 Schritte der Voice-to-Brain™ Methode',
        'WhatsApp-Support & Peer-Learning',
        '180ms Neurowissenschaft nutzen',
      ],
      buttonText: 'Hier weitere Informationen',
      buttonColor: 'from-[#D4AF37] to-[#FFD700]',
      link: 'https://claudia-conen-voice-ui2e.bolt.host/',
      highlighted: true,
      icon: Sparkles,
      isExternal: true,
    },
    {
      name: 'Voice-to-Brain 1:1 Coaching',
      price: 'Auf Anfrage',
      badge: 'EXKLUSIV',
      badgeColor: 'from-rose-500 to-pink-600',
      benefit: 'Dieses exklusive Einzelcoaching ist nur auf Anfrage verfügbar. Claudia Conen begleitet dich persönlich auf deinem individuellen Stimm- und Wirkungsweg.',
      features: [
        'Persönliche 1:1 Begleitung durch Claudia',
        'Individuell angepasstes Programm',
        'Flexible Termingestaltung',
        'Intensive persönliche Transformation',
      ],
      buttonText: 'Jetzt Anfrage stellen',
      buttonColor: 'from-rose-500 to-pink-600',
      highlighted: false,
      icon: Star,
      isExternal: false,
      openForm: true,
    },
  ];

  const handleOfferClick = (offer: typeof offers[0]) => {
    if (offer.openForm) {
      setIsFormOpen(true);
    }
  };

  return (
    <>
      <section id="offers" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-blue via-[#2a3f5f]/60 to-white" aria-labelledby="offers-headline">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 id="offers-headline" className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
              <span className="text-white">Wähle deinen </span>
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Transformationsweg
              </span>
            </h2>
            <p className="text-base md:text-xl text-white max-w-2xl mx-auto">
              Von Schnupper-Workshop bis intensives Mentoring
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 relative z-10">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: offer.highlighted ? -10 : -5, scale: offer.highlighted ? 1.02 : 1 }}
                  className={`relative bg-royal-navy/30 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                    offer.highlighted
                      ? 'border-luxury-gold ring-4 ring-luxury-gold/20 shadow-2xl'
                      : 'border-luxury-gold/10 hover:border-luxury-gold/30'
                  }`}
                >
                  {offer.highlighted && (
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(212, 175, 55, 0.3)',
                          '0 0 40px rgba(212, 175, 55, 0.6)',
                          '0 0 20px rgba(212, 175, 55, 0.3)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 pointer-events-none"
                    />
                  )}

                  <div className="p-6 md:p-8">
                    <div className={`inline-block mb-4 px-4 py-2 bg-gradient-to-r ${offer.badgeColor} rounded-full`}>
                      <span className="text-white font-semibold text-sm flex items-center gap-2">
                        {offer.highlighted && <Sparkles size={16} />}
                        {offer.badge}
                      </span>
                    </div>

                    <h3 className="font-montserrat font-bold text-xl md:text-2xl mb-2 text-pearl-white">
                      {offer.name}
                    </h3>

                    <div className="mb-4">
                      <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                        {offer.price}
                      </span>
                    </div>

                    <p className="text-pearl-white/80 mb-6 leading-relaxed text-sm md:text-base">{offer.benefit}</p>

                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {offer.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Check size={20} className="text-bright-gold" />
                          </div>
                          <span className="text-pearl-white/70 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {offer.isExternal ? (
                      <a
                        href={offer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r ${offer.buttonColor} text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg`}
                      >
                        {Icon && <Icon size={20} />}
                        {offer.buttonText}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleOfferClick(offer)}
                        className={`flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r ${offer.buttonColor} text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg`}
                      >
                        {Icon && <Icon size={20} />}
                        {offer.buttonText}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-center text-midnight-blue/70 text-xs md:text-base flex flex-wrap justify-center gap-2 md:gap-4"
          >
            <span>💎 Geld-zurück-Garantie</span>
            <span>•</span>
            <span>🔒 Sichere Zahlung</span>
            <span>•</span>
            <span>⚡ Sofortiger Zugang</span>
          </motion.div>
        </div>
      </section>

      <CoachingInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
