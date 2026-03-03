import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AbkuerzungBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: {
    type: '1x60min' | '2x60min' | '3x60min';
    price: number;
    name: string;
  };
}

export default function AbkuerzungBookingModal({ isOpen, onClose, selectedPackage }: AbkuerzungBookingModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    packageType: selectedPackage?.type || '1x60min'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const packages = [
    { type: '1x60min', name: '1× 60 Minuten', price: 127 },
    { type: '2x60min', name: '2× 60 Minuten', price: 227 },
    { type: '3x60min', name: '3× 60 Minuten', price: 297 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const selectedPkg = packages.find(p => p.type === formData.packageType);
      if (!selectedPkg) {
        throw new Error('Ungültiges Paket ausgewählt');
      }

      const { error } = await supabase
        .from('abkuerzung_bookings')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            package_type: formData.packageType,
            price_paid: selectedPkg.price
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        packageType: '1x60min'
      });

      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Es gab einen Fehler bei der Buchung. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Schließen"
          >
            <X size={28} />
          </button>

          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check size={40} className="text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                Buchung erfolgreich!
              </h3>
              <p className="text-lg text-[#666666] mb-4">
                Vielen Dank für deine Buchung, {formData.firstName}!
              </p>
              <p className="text-[#666666]">
                Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details und dem Link zur Terminbuchung.
              </p>
              <p className="text-sm text-[#666666] mt-4">
                Du hast 12 Monate Zeit, deinen Termin zu vereinbaren.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
                Deine 1:1 Abkürzung buchen
              </h2>
              <p className="text-[#666666] mb-6">
                Fülle das Formular aus und sichere dir dein persönliches Coaching-Paket
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-colors text-[#1A1A1A]"
                      placeholder="Dein Vorname"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-colors text-[#1A1A1A]"
                      placeholder="Dein Nachname"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    E-Mail Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-colors text-[#1A1A1A]"
                    placeholder="deine@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Telefonnummer (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-colors text-[#1A1A1A]"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label htmlFor="packageType" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Wähle dein Paket *
                  </label>
                  <select
                    id="packageType"
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-colors text-[#1A1A1A] bg-white"
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.type} value={pkg.type}>
                        {pkg.name} - {pkg.price}€
                      </option>
                    ))}
                  </select>
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <div className="bg-[#FBF8F3] border-2 border-[#C9A227]/20 rounded-xl p-4">
                  <p className="text-sm text-[#666666]">
                    <strong className="text-[#1A1A1A]">Wichtig:</strong> Nach der Buchung erhältst du eine E-Mail mit dem Link zur Terminvereinbarung. Du hast 12 Monate Zeit, deinen Termin zu buchen und einzulösen.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#C9A227] to-[#F5E6B3] text-[#1A1A1A] font-bold text-lg rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Wird gebucht...' : 'Jetzt verbindlich buchen'}
                </button>

                <p className="text-xs text-center text-[#666666]">
                  Mit der Buchung akzeptierst du unsere AGB und Datenschutzerklärung
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
