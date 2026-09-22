import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CoachingInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoachingInquiryForm({ isOpen, onClose }: CoachingInquiryFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase.from('coaching_inquiries').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message || null,
        },
      ]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError('Es gab einen Fehler beim Senden deiner Anfrage. Bitte versuche es erneut.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-royal-navy/95 backdrop-blur-md border border-luxury-gold/30 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-royal-navy/98 backdrop-blur-md border-b border-luxury-gold/20 p-6 flex items-center justify-between">
                <h2 className="font-montserrat font-bold text-2xl text-pearl-white">
                  Anfrage zum Voice-to-Brain{' '}
                  <span className="text-bright-gold">
                    1:1 Coaching
                  </span>
                </h2>
                <button
                  onClick={onClose}
                  className="text-pearl-white/60 hover:text-pearl-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-pearl-white mb-2">Anfrage gesendet!</h3>
                    <p className="text-pearl-white/70">
                      Vielen Dank für deine Anfrage! Wir melden uns in Kürze persönlich bei dir.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-pearl-white/90 font-medium mb-2">
                          Vorname <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20 transition-all"
                          placeholder="Max"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-pearl-white/90 font-medium mb-2">
                          Nachname <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20 transition-all"
                          placeholder="Mustermann"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-pearl-white/90 font-medium mb-2">
                        E-Mail-Adresse <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20 transition-all"
                        placeholder="max@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-pearl-white/90 font-medium mb-2">
                        Telefonnummer (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20 transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-pearl-white/90 font-medium mb-2">
                        Nachricht oder Anliegen
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20 transition-all resize-none"
                        placeholder="Erzähl uns kurz, was dich beschäftigt..."
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        'Anfrage senden'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
