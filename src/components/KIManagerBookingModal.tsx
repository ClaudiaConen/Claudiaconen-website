import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface KIManagerBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
}

export default function KIManagerBookingModal({
  isOpen,
  onClose,
  selectedPackage
}: KIManagerBookingModalProps) {
  const [formData, setFormData] = useState({
    vorname: '',
    name: '',
    adresse: '',
    email: '',
    telefon: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('ki_manager_bookings')
        .insert([
          {
            vorname: formData.vorname,
            name: formData.name,
            adresse: formData.adresse,
            email: formData.email,
            telefon: formData.telefon,
            selected_package: selectedPackage
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          vorname: '',
          name: '',
          adresse: '',
          email: '',
          telefon: ''
        });
      }, 3000);
    } catch (err) {
      setError('Es gab einen Fehler bei der Anmeldung. Bitte versuche es erneut.');
      console.error('Error submitting booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8 sm:p-12">
                {!isSuccess ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold text-midnight-blue mb-4">
                        Verbindliche Anmeldung
                      </h2>
                      <p className="text-lg text-gray-600">
                        KI Manager Ausbildung
                      </p>
                      <div className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-luxury-gold to-bright-gold text-white rounded-full font-bold shadow-lg">
                        {selectedPackage}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="vorname" className="block text-sm font-semibold text-midnight-blue mb-2">
                            Vorname *
                          </label>
                          <input
                            type="text"
                            id="vorname"
                            name="vorname"
                            required
                            value={formData.vorname}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-midnight-blue mb-2">
                            Nachname *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adresse" className="block text-sm font-semibold text-midnight-blue mb-2">
                          Adresse *
                        </label>
                        <textarea
                          id="adresse"
                          name="adresse"
                          required
                          rows={3}
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors resize-none text-gray-900 placeholder:text-gray-500"
                          placeholder="Straße, Hausnummer, PLZ, Ort"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-midnight-blue mb-2">
                          E-Mail Adresse *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefon" className="block text-sm font-semibold text-midnight-blue mb-2">
                          Telefonnummer *
                        </label>
                        <input
                          type="tel"
                          id="telefon"
                          name="telefon"
                          required
                          value={formData.telefon}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                        />
                      </div>

                      <div className="bg-pearl-white rounded-2xl p-6 border-2 border-luxury-gold/20">
                        <p className="text-midnight-blue font-semibold mb-3">
                          Hiermit möchte ich mich verbindlich für den Start des Programms zum KI-Manager anmelden.
                        </p>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p className="flex items-start gap-2">
                            <Check className="text-luxury-gold flex-shrink-0 mt-0.5" size={16} />
                            <span>Wir setzen uns mit dir in Verbindung.</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <Check className="text-luxury-gold flex-shrink-0 mt-0.5" size={16} />
                            <span>Du bekommst eine Rechnung von uns.</span>
                          </p>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
                          {error}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-luxury-gold to-bright-gold text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin" size={20} />
                            <span>Wird gesendet...</span>
                          </>
                        ) : (
                          'Jetzt verbindlich anmelden'
                        )}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="text-white" size={40} />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-midnight-blue mb-4">
                      Anmeldung erfolgreich!
                    </h3>
                    <p className="text-lg text-gray-700 mb-2">
                      Vielen Dank für deine Anmeldung zur KI Manager Ausbildung.
                    </p>
                    <p className="text-gray-600">
                      Wir setzen uns in Kürze mit dir in Verbindung.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
