import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye, User } from 'lucide-react';
import {
  AvailabilitySlot, AvailabilityException, BookingWithType,
  DAY_NAMES, HOUR_START, HOUR_END, timeToMinutes, toDateString
} from '../../lib/availabilityTypes';

interface Props {
  slots: AvailabilitySlot[];
  exceptions: AvailabilityException[];
  bookings: BookingWithType[];
}

type ViewMode = 'week' | 'day';

export default function CombinedCalendarView({ slots, exceptions, bookings }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const totalHours = HOUR_END - HOUR_START;
  const hours = Array.from({ length: totalHours + 1 }, (_, i) => HOUR_START + i);

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
  };

  const weekStart = getWeekStart(currentDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const visibleDates = viewMode === 'week' ? weekDates : [currentDate];

  const exceptionMap = useMemo(() => {
    const map = new Map<string, AvailabilityException>();
    exceptions.forEach(ex => map.set(ex.date, ex));
    return map;
  }, [exceptions]);

  const slotsByDay = useMemo(() => {
    const map: Record<number, AvailabilitySlot[]> = {};
    slots.filter(s => s.is_active).forEach(s => {
      if (!map[s.day_of_week]) map[s.day_of_week] = [];
      map[s.day_of_week].push(s);
    });
    return map;
  }, [slots]);

  const bookingsByDate = useMemo(() => {
    const map: Record<string, BookingWithType[]> = {};
    bookings.forEach(b => {
      if (!map[b.appointment_date]) map[b.appointment_date] = [];
      map[b.appointment_date].push(b);
    });
    return map;
  }, [bookings]);

  const getPosition = (startTime: string, endTime: string) => {
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);
    const dayStartMins = HOUR_START * 60;
    const totalMins = totalHours * 60;
    return {
      top: `${((startMins - dayStartMins) / totalMins) * 100}%`,
      height: `${((endMins - startMins) / totalMins) * 100}%`
    };
  };

  const getBlocksForDate = (date: Date) => {
    const dateStr = toDateString(date);
    const dayOfWeek = date.getDay();
    const exception = exceptionMap.get(dateStr);
    const dayBookings = bookingsByDate[dateStr] || [];
    const blocks: { type: 'available' | 'blocked' | 'booking'; startTime: string; endTime: string; label?: string }[] = [];

    if (exception) {
      if (exception.is_available && exception.start_time && exception.end_time) {
        blocks.push({ type: 'available', startTime: exception.start_time, endTime: exception.end_time });
      }
      if (!exception.is_available) {
        blocks.push({
          type: 'blocked',
          startTime: `${String(HOUR_START).padStart(2, '0')}:00`,
          endTime: `${String(HOUR_END).padStart(2, '0')}:00`
        });
      }
    } else {
      const daySlots = slotsByDay[dayOfWeek] || [];
      daySlots.forEach(s => {
        blocks.push({ type: 'available', startTime: s.start_time, endTime: s.end_time });
      });
    }

    dayBookings.forEach(b => {
      blocks.push({ type: 'booking', startTime: b.start_time, endTime: b.end_time, label: b.customer_name });
    });

    return blocks;
  };

  const navigate = (direction: number) => {
    const d = new Date(currentDate);
    if (viewMode === 'week') d.setDate(d.getDate() + direction * 7);
    else d.setDate(d.getDate() + direction);
    setCurrentDate(d);
  };

  const formatHeader = () => {
    if (viewMode === 'day') {
      return new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(currentDate);
    }
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    const startStr = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short' }).format(weekStart);
    const endStr = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short', year: 'numeric' }).format(end);
    return `${startStr} \u2013 ${endStr}`;
  };

  const todayStr = toDateString(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === 'week' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Woche
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === 'day' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tag
            </button>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
          >
            Heute
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">{formatHeader()}</span>
          <button onClick={() => navigate(1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-400" /> Verfügbar</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-300" /> Blockiert</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-400" /> Gebucht</span>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-600">
        <Eye className="w-4 h-4 flex-shrink-0" />
        Nur-Lese-Ansicht – Änderungen über "Wochenplaner" und "Ausnahmen & Kalender" vornehmen
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid" style={{ gridTemplateColumns: viewMode === 'week' ? '60px repeat(7, 1fr)' : '60px 1fr' }}>
            <div className="bg-gray-50 border-b border-r border-gray-200 p-2" />
            {visibleDates.map(date => {
              const dateStr = toDateString(date);
              const isToday = dateStr === todayStr;
              return (
                <div key={dateStr} className={`border-b border-r border-gray-200 p-3 text-center ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="text-xs text-gray-500">{DAY_NAMES[date.getDay()].slice(0, 2)}</div>
                  <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{date.getDate()}</div>
                </div>
              );
            })}

            <div className="border-r border-gray-200 relative" style={{ height: `${totalHours * 50}px` }}>
              {hours.map((h, i) => (
                <div key={h} className="absolute left-0 right-0 flex items-start justify-end pr-2 text-xs text-gray-400 font-medium"
                  style={{ top: `${(i / totalHours) * 100}%` }}>
                  {`${String(h).padStart(2, '0')}:00`}
                </div>
              ))}
            </div>

            {visibleDates.map(date => {
              const dateStr = toDateString(date);
              const blocks = getBlocksForDate(date);
              return (
                <div key={dateStr} className="border-r border-gray-200 relative" style={{ height: `${totalHours * 50}px` }}>
                  {hours.map((h, i) => (
                    <div key={h} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: `${(i / totalHours) * 100}%` }} />
                  ))}

                  {blocks.map((block, idx) => {
                    const pos = getPosition(block.startTime, block.endTime);
                    let cls = '';
                    if (block.type === 'available') cls = 'bg-emerald-100 border border-emerald-300';
                    else if (block.type === 'blocked') cls = 'bg-red-50 border border-red-200';
                    else cls = 'bg-blue-100 border border-blue-300';

                    return (
                      <div
                        key={idx}
                        className={`absolute left-1 right-1 rounded-lg px-2 py-1 ${cls}`}
                        style={{ top: pos.top, height: pos.height, minHeight: '24px', zIndex: block.type === 'booking' ? 20 : 10 }}
                      >
                        <div className="text-xs font-medium truncate">
                          {block.type === 'booking' && block.label && (
                            <span className="flex items-center gap-1 text-blue-800">
                              <User className="w-3 h-3 flex-shrink-0" />
                              {block.label}
                            </span>
                          )}
                          {block.type === 'available' && (
                            <span className="text-emerald-700">{block.startTime} - {block.endTime}</span>
                          )}
                          {block.type === 'blocked' && (
                            <span className="text-red-500">Blockiert</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
