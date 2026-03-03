import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'E-Mail',
      value: 'info@claudiaconen-akademie.de',
      href: 'mailto:info@claudiaconen-akademie.de',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+49 160 99142208',
      href: 'tel:+4916099142208',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+49 160 93102073',
      href: 'https://wa.me/4916093102073',
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Beisenweg 20, 58452 Witten',
      href: 'https://maps.google.com/?q=Beisenweg+20+58452+Witten',
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pearl-white to-white"
      aria-labelledby="contact-headline"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full border border-luxury-gold/30">
            <span className="text-[#B8860B] font-semibold">Kontakt</span>
          </div>
          <h2
            id="contact-headline"
            className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
          >
            <span className="text-midnight-blue">Lass uns </span>
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              sprechen
            </span>
          </h2>
          <p className="text-lg md:text-xl text-midnight-blue/70 max-w-2xl mx-auto">
            Bereit, deine Wirkung zu transformieren? Ich freue mich auf deine Nachricht!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-montserrat font-bold text-midnight-blue mb-6">
                Kontaktinformationen
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.label === 'WhatsApp' || item.label === 'Adresse' ? '_blank' : undefined}
                      rel={item.label === 'WhatsApp' || item.label === 'Adresse' ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-luxury-gold/20 hover:border-luxury-gold/40 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} className="text-midnight-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-midnight-blue/60 mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg font-medium text-midnight-blue">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/10 rounded-2xl p-6 border border-luxury-gold/30">
              <h4 className="text-xl font-montserrat font-bold text-midnight-blue mb-4">
                Direkt buchen
              </h4>
              <p className="text-midnight-blue/70 mb-4">
                Buche jetzt einen kostenlosen Ersttermin und lass uns gemeinsam deine Wirkung entfalten.
              </p>
              <a
                href="https://claudiaconen.com/termin-buchen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Phone size={20} />
                Termin vereinbaren
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-luxury-gold/20 p-8 shadow-xl"
          >
            <h3 className="text-2xl font-montserrat font-bold text-midnight-blue mb-6">
              Schreib mir eine Nachricht
            </h3>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
              >
                <CheckCircle size={24} className="text-green-600" />
                <p className="text-green-800">
                  Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-800">
                  Ein Fehler ist aufgetreten. Bitte versuche es erneut.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-midnight-blue mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-luxury-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-midnight-blue mb-2"
                >
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-luxury-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
                  placeholder="deine@email.de"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-midnight-blue mb-2"
                >
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-luxury-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
                  placeholder="+49 123 456789"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-midnight-blue mb-2"
                >
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-luxury-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all resize-none"
                  placeholder="Erzähl mir, wie ich dir helfen kann..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-midnight-blue/30 border-t-midnight-blue rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Nachricht senden
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
