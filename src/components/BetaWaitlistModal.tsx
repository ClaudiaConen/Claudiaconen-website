import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BetaWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetaWaitlistModal({ isOpen, onClose }: BetaWaitlistModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('beta_waitlist')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            company: formData.company || null,
            reason: formData.reason || null,
            status: 'pending',
            notified: false
          }
        ]);

      if (submitError) {
        if (submitError.code === '23505') {
          throw new Error('Diese E-Mail-Adresse ist bereits auf der Warteliste registriert.');
        }
        throw submitError;
      }

      setIsSuccess(true);
      setShowConfetti(true);
      setFormData({ firstName: '', lastName: '', email: '', company: '', reason: '' });

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0px 8px 20px rgba(0,0,0,0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-[60]">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: '50%',
                        y: '50%',
                        scale: 0,
                        rotate: 0
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        y: `${50 + (Math.random() - 0.5) * 100}%`,
                        scale: [0, 1, 0.8],
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ['#FFD84D', '#DAA520', '#F4D03F', '#DAA520'][Math.floor(Math.random() * 4)]
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-midnight-blue flex items-center gap-2">
                    <Sparkles className="text-bright-gold" size={28} />
                    Beta-Warteliste
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Erhalte exklusiven Zugang, sobald die Plattform live geht.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-bright-gold to-luxury-gold rounded-full mb-4">
                    <Sparkles size={40} className="text-midnight-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-midnight-blue mb-2">
                    Vielen Dank für dein Interesse!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Du stehst jetzt auf der Beta-Warteliste und wirst benachrichtigt, sobald der Zugang geöffnet wird.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Dein Vorname"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-gold focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Dein Nachname"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-gold focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@beispiel.de"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-gold focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Unternehmen (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Dein Unternehmen oder Organisation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-gold focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                      Warum möchtest du an der Beta teilnehmen?
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Optional: Erzähl uns kurz mehr..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-gold focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-midnight-blue/30 border-t-midnight-blue rounded-full animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Jetzt auf Warteliste eintragen
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
