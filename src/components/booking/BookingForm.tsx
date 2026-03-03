import { useState } from 'react';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  appointmentType: any;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (formData: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function BookingForm({
  appointmentType,
  selectedDate,
  selectedTime,
  onSubmit,
  onBack,
  isSubmitting = false
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Bitte gib deinen Namen an';
    }

    if (!formData.customer_email.trim()) {
      newErrors.customer_email = 'Bitte gib deine E-Mail-Adresse an';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = 'Bitte gib eine gültige E-Mail-Adresse an';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const formattedDate = selectedDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const isPaid = parseFloat(appointmentType.price) > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white p-8">
        <h2 className="text-2xl font-bold mb-2">Deine Kontaktdaten</h2>
        <p className="text-stone-200">Vervollständige deine Buchung</p>
      </div>

      <div className="p-8">
        <div className="bg-stone-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-stone-800 mb-4">Deine gewählte Zeit:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Terminart:</span>
              <span className="font-medium text-stone-800">{appointmentType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Datum:</span>
              <span className="font-medium text-stone-800">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Uhrzeit:</span>
              <span className="font-medium text-stone-800">{selectedTime} Uhr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Dauer:</span>
              <span className="font-medium text-stone-800">{appointmentType.duration_minutes} Min.</span>
            </div>
            {isPaid && (
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-stone-600">Preis:</span>
                <span className="font-bold text-stone-800 text-lg">
                  {parseFloat(appointmentType.price).toFixed(2)} €
                </span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name *
              </div>
            </label>
            <input
              type="text"
              value={formData.customer_name}
              onChange={(e) => handleChange('customer_name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all ${
                errors.customer_name ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="Dein vollständiger Name"
            />
            {errors.customer_name && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-Mail-Adresse *
              </div>
            </label>
            <input
              type="email"
              value={formData.customer_email}
              onChange={(e) => handleChange('customer_email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all ${
                errors.customer_email ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="deine@email.de"
            />
            {errors.customer_email && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefonnummer (optional)
              </div>
            </label>
            <input
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => handleChange('customer_phone', e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all"
              placeholder="+49 123 456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Nachricht oder Anliegen (optional)
              </div>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all resize-none"
              placeholder="Was möchtest du besprechen oder was soll ich vorbereiten?"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Zurück
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-stone-800 to-stone-700 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gebucht...' : isPaid ? 'Weiter zur Zahlung' : 'Termin buchen'}
            </button>
          </div>
        </form>

        <p className="text-xs text-stone-500 text-center mt-6">
          * Pflichtfelder
        </p>
      </div>
    </div>
  );
}
