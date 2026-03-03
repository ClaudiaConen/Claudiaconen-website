import { CreditCard, ExternalLink, ShoppingBag } from 'lucide-react';

interface PaymentSelectionProps {
  appointmentType: any;
  bookingData: any;
  onSelectPayment: (provider: 'digistore' | 'paypal' | 'tentary') => void;
  onBack: () => void;
}

export default function PaymentSelection({
  appointmentType,
  bookingData,
  onSelectPayment,
  onBack
}: PaymentSelectionProps) {
  const price = parseFloat(appointmentType.price);
  const hasDigistore = appointmentType.digistore_link;
  const hasPaypal = appointmentType.paypal_link;
  const hasTentary = appointmentType.tentary_link;

  const formattedDate = bookingData.selectedDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white p-8">
        <h2 className="text-2xl font-bold mb-2">Zahlungsmethode wählen</h2>
        <p className="text-stone-200">Sichere Zahlung über unsere Partner</p>
      </div>

      <div className="p-8">
        <div className="bg-stone-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-stone-800 mb-4">Zusammenfassung deiner Buchung:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Name:</span>
              <span className="font-medium text-stone-800">{bookingData.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">E-Mail:</span>
              <span className="font-medium text-stone-800">{bookingData.customer_email}</span>
            </div>
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
              <span className="font-medium text-stone-800">{bookingData.selectedTime} Uhr</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-stone-200">
              <span className="text-stone-600 font-semibold">Gesamtpreis:</span>
              <span className="font-bold text-stone-800 text-xl">
                {price.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-stone-800 mb-4">Wähle deine Zahlungsmethode:</h3>
          <div className="space-y-4">
            {hasDigistore && (
              <button
                onClick={() => onSelectPayment('digistore')}
                className="w-full p-6 border-2 border-stone-300 rounded-xl hover:border-stone-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-stone-800">Digistore24</p>
                      <p className="text-sm text-stone-600">
                        Kreditkarte, SOFORT, PayPal & mehr
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-stone-400 group-hover:text-stone-600" />
                </div>
              </button>
            )}

            {hasPaypal && (
              <button
                onClick={() => onSelectPayment('paypal')}
                className="w-full p-6 border-2 border-stone-300 rounded-xl hover:border-stone-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#003087">
                        <path d="M20.905 9.5c.21-1.342.09-2.26-.427-3.016C19.77 5.5 18.432 5 16.5 5h-5.03c-.33 0-.615.24-.664.564L8.41 16.99c-.04.235.138.445.374.445h2.73l.685-4.338-.021.138c.05-.324.33-.564.664-.564h1.382c2.717 0 4.843-1.104 5.463-4.296.02-.1.037-.197.052-.29.197-1.256.01-2.111-.418-2.805z"/>
                        <path d="M8.788 9.79c.05-.324.33-.564.664-.564h4.81c.57 0 1.1.037 1.588.115.14.023.277.05.412.08.135.032.267.068.396.108.065.02.128.041.191.063.253.09.492.196.715.322.21-1.342.09-2.26-.427-3.016C16.43 5.5 15.092 5 13.16 5H8.13c-.33 0-.615.24-.664.564L5.07 19.554c-.04.235.138.445.374.445h2.73l1.614-10.21z" opacity=".7"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-stone-800">PayPal</p>
                      <p className="text-sm text-stone-600">
                        Schnell & sicher mit PayPal bezahlen
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-stone-400 group-hover:text-stone-600" />
                </div>
              </button>
            )}

            {hasTentary && (
              <button
                onClick={() => onSelectPayment('tentary')}
                className="w-full p-6 border-2 border-stone-300 rounded-xl hover:border-stone-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <ShoppingBag className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-stone-800">Tentary Shop</p>
                      <p className="text-sm text-stone-600">
                        Bezahlung über unseren Shop
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-stone-400 group-hover:text-stone-600" />
                </div>
              </button>
            )}

            {!hasDigistore && !hasPaypal && !hasTentary && (
              <div className="text-center py-8">
                <p className="text-stone-600">
                  Keine Zahlungsmethoden verfügbar. Bitte kontaktiere uns direkt.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>💳 Sichere Zahlung:</strong> Alle Zahlungen werden über unsere vertrauenswürdigen Partner verschlüsselt und sicher abgewickelt.
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 transition-colors"
        >
          Zurück
        </button>
      </div>
    </div>
  );
}
