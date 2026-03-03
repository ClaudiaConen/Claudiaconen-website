import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (firstName: string, email: string) => void;
}

export default function AdventRegistrationModal({ isOpen, onClose, onSuccess }: AdventRegistrationModalProps) {
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('advent_registrations')
        .insert([
          {
            first_name: formData.firstName,
            email: formData.email.toLowerCase(),
            email_confirmed: true
          }
        ]);

      if (error && error.code !== '23505') {
        throw error;
      }

      localStorage.setItem('advent_user_email', formData.email.toLowerCase());
      localStorage.setItem('advent_user_name', formData.firstName);

      try {
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

        const response = await fetch(`${SUPABASE_URL}/functions/v1/add-advent-contact-to-resend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            firstName: formData.firstName,
          }),
        });

        if (!response.ok) {
          console.error('Failed to add contact to Resend');
        }
      } catch (resendError) {
        console.error('Resend integration error:', resendError);
      }

      onSuccess(formData.firstName, formData.email);
    } catch (error) {
      console.error('Error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full border-2 border-bright-gold/30"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="text-bright-gold mx-auto mb-4" size={48} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
                Öffne deine Türchen
              </h2>
              <p className="text-gray-600 text-lg">
                Sichere dir Zugang zu allen 24 Tagen voller wertvollem Business-Wissen
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="modal-firstName" className="block text-sm font-semibold text-midnight-blue mb-2">
                  <User className="inline mr-2" size={16} />
                  Dein Vorname
                </label>
                <input
                  id="modal-firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-bright-gold focus:outline-none transition-colors bg-white text-gray-900"
                  placeholder="Maria"
                />
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-sm font-semibold text-midnight-blue mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Deine E-Mail
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-bright-gold focus:outline-none transition-colors bg-white text-gray-900"
                  placeholder="maria@beispiel.de"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold text-lg rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-midnight-blue"></div>
                    Einen Moment...
                  </span>
                ) : (
                  'Jetzt Türchen öffnen'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Mit der Anmeldung stimmst du unserer Datenschutzerklärung zu.
                Du kannst dich jederzeit wieder abmelden.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
