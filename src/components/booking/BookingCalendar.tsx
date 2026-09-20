import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  appointmentType: any;
  onSelectDateTime: (date: Date, time: string) => void;
  bookedSlots?: Array<{ date: string; time: string }>;
}

export default function BookingCalendar({ appointmentType, onSelectDateTime, bookedSlots = [] }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      ['00', '30'].forEach(minute => {
        const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        const isBooked = selectedDate && bookedSlots.some(
          slot => slot.date === selectedDate.toISOString().split('T')[0] && slot.time === time
        );
        slots.push({ time, available: !isBooked });
      });
    }

    return slots;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: Date | null) => {
    if (date && isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeClick = (time: string, available: boolean) => {
    if (available && selectedDate) {
      setSelectedTime(time);
      onSelectDateTime(selectedDate, time);
    }
  };

  const days = getDaysInMonth(currentDate);
  const timeSlots = selectedDate ? generateTimeSlots() : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr_280px] md:grid-cols-1">
        <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-8 border-r border-stone-200">
          <div className="flex justify-center mb-6">
            <img
              src="/claudiaconen_(3).webp"
              width={400}
              height={400}
              alt="Claudia Conen"
              className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-white"
            />
          </div>

          <h3 className="text-xl font-bold text-stone-800 mb-2 text-center">
            {appointmentType.name}
          </h3>

          <div className="space-y-3 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{appointmentType.duration_minutes} Minuten</span>
            </div>

            {parseFloat(appointmentType.price) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-stone-800">
                  {parseFloat(appointmentType.price).toFixed(2)} €
                </span>
              </div>
            )}
          </div>

          {appointmentType.description && (
            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              {appointmentType.description}
            </p>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-800">Wähle Datum und Uhrzeit</h2>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-stone-600" />
            </button>

            <h3 className="text-lg font-semibold text-stone-800">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-stone-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              const isAvailable = isDateAvailable(date);
              const isSelected = isDateSelected(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-all
                    ${!date ? 'invisible' : ''}
                    ${isAvailable
                      ? isSelected
                        ? 'bg-stone-800 text-white shadow-lg scale-105'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100 hover:shadow-md'
                      : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                    }
                  `}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-stone-50 p-6 border-l border-stone-200 max-h-[600px] overflow-y-auto">
          <div className="mb-4">
            <p className="text-sm font-medium text-stone-600 mb-2">
              {selectedDate
                ? `${selectedDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : 'Wähle zuerst ein Datum'
              }
            </p>
            <p className="text-xs text-stone-500">Central European</p>
          </div>

          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot.time}
                  onClick={() => handleTimeClick(slot.time, slot.available)}
                  disabled={!slot.available}
                  className={`
                    py-3 px-4 rounded-lg text-sm font-medium transition-all
                    ${slot.available
                      ? selectedTime === slot.time
                        ? 'bg-stone-800 text-white shadow-md'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 hover:border-stone-300'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-stone-400 text-sm mt-8">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Bitte wähle zuerst ein Datum aus dem Kalender</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
