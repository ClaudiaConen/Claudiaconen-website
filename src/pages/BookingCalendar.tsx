import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Euro, Check, ArrowRight, Mail, Phone, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface AppointmentType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  color: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingCalendar() {
  const navigate = useNavigate();
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [bookingComplete, setBookingComplete] = useState(false);

  const typeToSlugMap: Record<string, string> = {
    'Erstgespräch (30 Min.)': 'erstgespraech',
    'Coaching Session (60 Min.)': 'coaching',
    'Intensive Session (90 Min.)': 'intensive',
    'Workshop Buchung': 'workshop'
  };

  useEffect(() => {
    fetchAppointmentTypes();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedType) {
      fetchAvailableSlots(selectedDate, selectedType);
    }
  }, [selectedDate, selectedType]);

  const fetchAppointmentTypes = async () => {
    const { data, error } = await supabase
      .from('appointment_types')
      .select('*')
      .eq('is_active', true)
      .order('price');

    if (data && !error) {
      // Drei Terminarten stammen NICHT von Claudia, sondern aus der Vorlage des
      // Baukastens (supabase/migrations/20251206202906_create_booking_calendar_tables.sql):
      // gleiche Sekunde angelegt, nie geaendert - mit 150, 200 und 300 Euro. Regel: Kein
      // Preis steht auf der Seite, den Claudia nicht selbst genannt hat. Sobald sie eine
      // davon im Admin-Bereich umbenennt oder den Preis aendert, erscheint sie wieder.
      const VORLAGEN: [string, number][] = [
        ['Coaching Session (60 Min.)', 150],
        ['Intensive Session (90 Min.)', 200],
        ['Workshop Buchung', 300],
      ];
      setAppointmentTypes(
        data.filter((t) => !VORLAGEN.some(([name, preis]) => t.name === name && Number(t.price) === preis))
      );
    }
  };

  const fetchAvailableSlots = async (date: Date, type: AppointmentType) => {
    setLoading(true);
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split('T')[0];

    const { data: availabilityData } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true);

    const { data: exceptionData } = await supabase
      .from('availability_exceptions')
      .select('*')
      .eq('date', dateStr);

    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('start_time, end_time')
      .eq('appointment_date', dateStr)
      .in('status', ['pending', 'confirmed']);

    if (exceptionData && exceptionData.length > 0) {
      const exception = exceptionData[0];
      if (!exception.is_available) {
        setAvailableSlots([]);
        setLoading(false);
        return;
      }
    }

    const slots: TimeSlot[] = [];

    if (availabilityData && availabilityData.length > 0) {
      availabilityData.forEach(slot => {
        const startHour = parseInt(slot.start_time.split(':')[0]);
        const endHour = parseInt(slot.end_time.split(':')[0]);

        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute of [0, 30]) {
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const endTime = new Date(`2000-01-01T${timeStr}`);
            endTime.setMinutes(endTime.getMinutes() + type.duration_minutes);

            const isBooked = bookingsData?.some(booking => {
              return timeStr >= booking.start_time && timeStr < booking.end_time;
            });

            const slotDateTime = new Date(date);
            slotDateTime.setHours(hour, minute);
            const isPast = slotDateTime < new Date();

            if (!isBooked && !isPast) {
              slots.push({ time: timeStr, available: true });
            }
          }
        }
      });
    }

    setAvailableSlots(slots);
    setLoading(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBooking = async () => {
    if (!selectedType || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      return;
    }

    setLoading(true);

    const endTime = new Date(`2000-01-01T${selectedTime}`);
    endTime.setMinutes(endTime.getMinutes() + selectedType.duration_minutes);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const { error } = await supabase
      .from('bookings')
      .insert({
        appointment_type_id: selectedType.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        appointment_date: selectedDate.toISOString().split('T')[0],
        start_time: selectedTime,
        end_time: endTimeStr,
        notes: formData.notes,
        status: 'confirmed'
      });

    setLoading(false);

    if (!error) {
      setBookingComplete(true);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
        <SEO
          title="Buchung bestätigt - Claudia Conen"
          description="Ihre Buchung wurde erfolgreich bestätigt"
        />
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Buchung erfolgreich!</h1>
            <p className="text-gray-600 mb-6">
              Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigungsmail an {formData.email}.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Ihre Buchungsdetails:</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Termin:</strong> {selectedType?.name}</p>
                <p><strong>Datum:</strong> {selectedDate && formatDate(selectedDate)}</p>
                <p><strong>Uhrzeit:</strong> {selectedTime} Uhr</p>
                <p><strong>Dauer:</strong> {selectedType?.duration_minutes} Minuten</p>
                {selectedType && selectedType.price > 0 && (
                  <p><strong>Preis:</strong> {selectedType.price}€</p>
                )}
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Zurück zur Startseite
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation und Fusszeile fehlten. Die Seite hatte vier
          Verweise und KEIN Impressum - eine Sackgasse, und das
          Impressum muss von jeder Seite erreichbar sein. */}
      <Navigation />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
      <SEO
        title="Termin bei Claudia Conen buchen — Erstgespräch kostenlos"
        description="Vier Termine zur Auswahl: kostenloses Erstgespräch über dreißig Minuten, Einzelcoaching, eine intensive Sitzung und die Buchung für einen Workshop. Online buchen, Bestätigung per E-Mail."
        path="/termin-buchen"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Termin buchen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wählen Sie Ihren gewünschten Termin und buchen Sie direkt online
          </p>
        </div>

        {/* Text vor dem Kalender. Vorher hatte diese Seite 275 Zeichen -
            ein Kalenderfenster ohne Worte drumherum. Sie steht in der
            Sitemap, also findet Google sie und sah nichts.
            RICHTIGSTELLUNG 21.09.2026: Hier standen vier Termine, weil sie als aktive
            Eintraege in appointment_types liegen. Drei davon (Coaching 150 Euro,
            Intensive 200 Euro, Workshop 300 Euro) sind aber Vorlagenwerte des
            Baukastens - in derselben Sekunde angelegt wie die Tabelle, nie geaendert,
            woertlich in der Migration 20251206202906. Claudia hat diese Preise nie
            genannt. Deshalb beschreibt der Text nur noch das Erstgespraech; siehe
            Filter in fetchAppointmentTypes. */}
        <div className="max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Was Sie hier buchen können
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Hier buchen Sie das Erstgespräch. Es kostet nichts. Dreißig Minuten reichen, um zu
            klären, ob und wie es weitergeht — und wenn ich nicht die Richtige bin, sage ich
            Ihnen das dort. Coaching, Training oder einen Workshop vereinbaren wir danach
            gemeinsam, passend zu dem, was Sie vorhaben.
          </p>
          <dl className="space-y-4 text-gray-700">
            <div>
              <dt className="font-semibold text-gray-900">Erstgespräch · 30 Minuten · kostenlos</dt>
              <dd className="mt-1 leading-relaxed">
                Kennenlernen. Sie schildern, worum es geht, ich sage Ihnen ehrlich, ob ich helfen
                kann. Ohne Verpflichtung und ohne Verkaufsgespräch am Ende.
              </dd>
            </div>
          </dl>
          <p className="text-gray-700 leading-relaxed mt-6">
            <strong className="text-gray-900">Was nach der Buchung passiert:</strong> Sie bekommen
            eine Bestätigung per E-Mail mit dem Termin und dem Zugangslink. Wenn Ihnen etwas
            dazwischenkommt, schreiben Sie mir — verschieben ist kein Problem, solange es nicht in
            der letzten Stunde passiert.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Terminart</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Datum & Zeit</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Kontaktdaten</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wählen Sie eine Terminart</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {appointmentTypes.map((type) => {
                const slug = typeToSlugMap[type.name];
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      if (slug) {
                        navigate(`/buchen/${slug}`);
                      } else {
                        setSelectedType(type);
                        setStep(2);
                      }
                    }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-left border-2 border-transparent hover:border-blue-500"
                    style={{ borderLeftWidth: '4px', borderLeftColor: type.color }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{type.duration_minutes} Min.</span>
                      </div>
                      <div className="flex items-center text-gray-900 font-semibold">
                        {type.price > 0 ? (
                          <>
                            <Euro className="w-5 h-5 mr-1" />
                            <span>{type.price}</span>
                          </>
                        ) : (
                          <span className="text-green-600">Kostenlos</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && selectedType && (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
            >
              ← Zurück zur Terminart
            </button>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="font-semibold text-gray-900">Ausgewählter Termin:</h3>
              <p className="text-gray-600">{selectedType.name} ({selectedType.duration_minutes} Min.)</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    ←
                  </button>
                  <h3 className="text-xl font-bold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} />;
                    }
                    const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                    const isSelected = selectedDate?.toDateString() === day.toDateString();

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => !isPast && handleDateSelect(day)}
                        disabled={isPast}
                        className={`aspect-square flex items-center justify-center rounded-lg text-sm transition ${
                          isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 text-white font-bold'
                            : 'hover:bg-blue-50 text-gray-900'
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  {selectedDate ? formatDate(selectedDate) : 'Wählen Sie ein Datum'}
                </h3>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => handleTimeSelect(slot.time)}
                          className={`p-3 rounded-lg border-2 transition ${
                            selectedTime === slot.time
                              ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                              : 'border-gray-200 hover:border-blue-300 text-gray-900 hover:text-blue-600'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      An diesem Tag sind leider keine Termine verfügbar.
                    </p>
                  )
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Bitte wählen Sie zunächst ein Datum aus.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedType && selectedDate && selectedTime && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setStep(2)}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
            >
              ← Zurück zur Terminauswahl
            </button>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ihre Kontaktdaten</h2>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2"><strong>Ausgewählter Termin:</strong></p>
                <p className="text-gray-900">{selectedType.name}</p>
                <p className="text-gray-700">{formatDate(selectedDate)} um {selectedTime} Uhr</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max Mustermann"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="max@beispiel.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anliegen / Notizen (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={loading || !formData.name || !formData.email}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? 'Wird gebucht...' : 'Verbindlich buchen'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Mit der Buchung akzeptieren Sie unsere AGB und Datenschutzerklärung
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}