import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BookingCalendar from '../components/booking/BookingCalendar';
import BookingForm from '../components/booking/BookingForm';
import PaymentSelection from '../components/booking/PaymentSelection';
import { CheckCircle, ArrowLeft } from 'lucide-react';

type Step = 'calendar' | 'form' | 'payment' | 'success';

export default function BookingPage() {
  const { typeSlug } = useParams<{ typeSlug: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<Step>('calendar');
  const [appointmentType, setAppointmentType] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<Array<{ date: string; time: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const typeMap: Record<string, string> = {
    'erstgespraech': 'Erstgespräch (30 Min.)',
    'coaching': 'Coaching Session (60 Min.)',
    'intensive': 'Intensive Session (90 Min.)',
    'workshop': 'Workshop Buchung'
  };

  useEffect(() => {
    loadAppointmentType();
    loadBookedSlots();
  }, [typeSlug]);

  const loadAppointmentType = async () => {
    try {
      const typeName = typeMap[typeSlug || ''];

      if (!typeName) {
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('appointment_types')
        .select('*')
        .eq('name', typeName)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        console.error('Error loading appointment type:', error);
        navigate('/');
        return;
      }

      setAppointmentType(data);
    } catch (error) {
      console.error('Error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadBookedSlots = async () => {
    try {
      const today = new Date();
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(today.getMonth() + 3);

      const { data, error } = await supabase
        .from('bookings')
        .select('appointment_date, start_time')
        .in('status', ['pending', 'confirmed'])
        .gte('appointment_date', today.toISOString().split('T')[0])
        .lte('appointment_date', threeMonthsLater.toISOString().split('T')[0]);

      if (error) throw error;

      const slots = data?.map(booking => ({
        date: booking.appointment_date,
        time: booking.start_time.substring(0, 5)
      })) || [];

      setBookedSlots(slots);
    } catch (error) {
      console.error('Error loading booked slots:', error);
    }
  };

  const handleSelectDateTime = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep('form');
  };

  const handleFormSubmit = async (formData: any) => {
    setBookingData({
      ...formData,
      selectedDate,
      selectedTime
    });

    const isPaid = parseFloat(appointmentType.price) > 0;

    if (isPaid) {
      setCurrentStep('payment');
    } else {
      await createBooking(formData, 'none');
    }
  };

  const handlePaymentSelection = async (provider: 'digistore' | 'paypal' | 'tentary') => {
    await createBooking(bookingData, provider);
  };

  const createBooking = async (formData: any, paymentProvider: 'none' | 'digistore' | 'paypal' | 'tentary') => {
    setIsSubmitting(true);

    try {
      if (!selectedDate || !selectedTime || !appointmentType) {
        throw new Error('Fehlende Buchungsdaten');
      }

      const [startHour, startMinute] = selectedTime.split(':');
      const endTime = new Date(selectedDate);
      endTime.setHours(parseInt(startHour), parseInt(startMinute));
      endTime.setMinutes(endTime.getMinutes() + appointmentType.duration_minutes);
      const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}:00`;

      const isPaid = parseFloat(appointmentType.price) > 0;

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          appointment_type_id: appointmentType.id,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone || null,
          appointment_date: selectedDate.toISOString().split('T')[0],
          start_time: `${selectedTime}:00`,
          end_time: endTimeString,
          status: isPaid ? 'pending' : 'confirmed',
          notes: formData.notes || null,
          payment_status: isPaid ? 'pending' : 'none',
          payment_provider: paymentProvider,
        })
        .select()
        .single();

      if (bookingError || !booking) {
        throw new Error('Buchung konnte nicht erstellt werden');
      }

      setBookingId(booking.id);

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!isPaid) {
        await fetch(`${supabaseUrl}/functions/v1/send-booking-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ bookingId: booking.id }),
        });

        setCurrentStep('success');
      } else {
        let paymentLink;
        if (paymentProvider === 'digistore') {
          paymentLink = appointmentType.digistore_link;
        } else if (paymentProvider === 'paypal') {
          paymentLink = appointmentType.paypal_link;
        } else if (paymentProvider === 'tentary') {
          paymentLink = appointmentType.tentary_link;
        }

        if (paymentLink) {
          const linkWithParams = `${paymentLink}?booking_id=${booking.id}&email=${encodeURIComponent(formData.customer_email)}`;
          window.location.href = linkWithParams;
        } else {
          throw new Error('Zahlungslink nicht verfügbar');
        }
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Es gab einen Fehler bei der Buchung. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Lade Buchungsseite...</p>
        </div>
      </div>
    );
  }

  if (!appointmentType) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Startseite
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">
            {appointmentType.welcome_text || `Buche dein ${appointmentType.name}`}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Plane mit mir deinen einzigartigen Weg zum Erfolg und buche dir hier dein Gespräch.
          </p>
        </div>

        {currentStep === 'calendar' && (
          <BookingCalendar
            appointmentType={appointmentType}
            onSelectDateTime={handleSelectDateTime}
            bookedSlots={bookedSlots}
          />
        )}

        {currentStep === 'form' && selectedDate && selectedTime && (
          <BookingForm
            appointmentType={appointmentType}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentStep('calendar')}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'payment' && bookingData && (
          <PaymentSelection
            appointmentType={appointmentType}
            bookingData={bookingData}
            onSelectPayment={handlePaymentSelection}
            onBack={() => setCurrentStep('form')}
          />
        )}

        {currentStep === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Buchung erfolgreich!</h2>
            </div>

            <div className="p-8 text-center">
              <p className="text-lg text-stone-700 mb-6">
                Vielen Dank für deine Buchung! Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
              </p>

              <div className="bg-stone-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-stone-800 mb-4">Was passiert als nächstes?</h3>
                <ul className="text-left space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Du erhältst eine Bestätigungs-E-Mail mit allen Termindetails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>24 Stunden vor dem Termin sende ich dir eine Erinnerung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>3 Stunden vor dem Termin erhältst du eine weitere Erinnerung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Den Meeting-Link findest du in den E-Mails</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-stone-800 to-stone-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
