import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Calendar, Ban, Clock, CalendarRange } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  AvailabilitySlot, AvailabilityException, BookingWithType,
  MONTH_NAMES, generateTimeOptions, toDateString, formatDateDE
} from '../../lib/availabilityTypes';

interface Props {
  slots: AvailabilitySlot[];
  exceptions: AvailabilityException[];
  bookings: BookingWithType[];
  onRefresh: () => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export default function MonthlyExceptions({ slots, exceptions, bookings, onRefresh, onToast }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [dayBlockAll, setDayBlockAll] = useState(true);
  const [dayStartTime, setDayStartTime] = useState('09:00');
  const [dayEndTime, setDayEndTime] = useState('17:00');
  const [dayReason, setDayReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [rangeReason, setRangeReason] = useState('');

  const timeOptions = generateTimeOptions();
  const today = toDateString(new Date());

  const exceptionMap = useMemo(() => {
    const map = new Map<string, AvailabilityException>();
    exceptions.forEach(ex => map.set(ex.date, ex));
    return map;
  }, [exceptions]);

  const bookingDates = useMemo(() => {
    const set = new Set<string>();
    bookings.forEach(b => set.add(b.appointment_date));
    return set;
  }, [bookings]);

  const availableDays = useMemo(() => {
    const set = new Set<number>();
    slots.filter(s => s.is_active).forEach(s => set.add(s.day_of_week));
    return set;
  }, [slots]);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    const startPad = (first.getDay() + 6) % 7;
    for (let i = 0; i < startPad; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  };

  const getDayStatus = (date: Date) => {
    const dateStr = toDateString(date);
    const exception = exceptionMap.get(dateStr);
    const hasBookings = bookingDates.has(dateStr);
    const isRegularlyAvailable = availableDays.has(date.getDay());

    if (exception) {
      if (!exception.is_available) return { type: 'blocked' as const, exception, hasBookings };
      return { type: 'modified' as const, exception, hasBookings };
    }
    if (isRegularlyAvailable) return { type: 'available' as const, exception: null, hasBookings };
    return { type: 'unavailable' as const, exception: null, hasBookings };
  };

  const handleDayClick = (date: Date) => {
    const dateStr = toDateString(date);
    const exception = exceptionMap.get(dateStr);

    setSelectedDate(dateStr);
    if (exception) {
      setDayBlockAll(!exception.is_available);
      setDayStartTime(exception.start_time || '09:00');
      setDayEndTime(exception.end_time || '17:00');
      setDayReason(exception.reason || '');
    } else {
      setDayBlockAll(true);
      setDayStartTime('09:00');
      setDayEndTime('17:00');
      setDayReason('');
    }
    setShowDayModal(true);
  };

  const handleDaySave = async () => {
    if (!selectedDate) return;
    setSaving(true);
    const existingException = exceptionMap.get(selectedDate);
    const data = {
      date: selectedDate,
      is_available: !dayBlockAll,
      start_time: !dayBlockAll ? dayStartTime : null,
      end_time: !dayBlockAll ? dayEndTime : null,
      reason: dayReason || null
    };

    const op = existingException
      ? supabase.from('availability_exceptions').update(data).eq('id', existingException.id)
      : supabase.from('availability_exceptions').insert(data);

    const { error } = await op;
    if (error) onToast('Fehler beim Speichern', 'error');
    else {
      onToast(dayBlockAll ? 'Tag blockiert' : 'Sonderzeiten eingetragen', 'success');
      setShowDayModal(false);
      onRefresh();
    }
    setSaving(false);
  };

  const handleRangeSave = async () => {
    if (!rangeStart || !rangeEnd) { onToast('Bitte Start- und Enddatum wählen', 'error'); return; }
    if (rangeEnd < rangeStart) { onToast('Enddatum muss nach Startdatum liegen', 'error'); return; }

    const start = new Date(rangeStart + 'T00:00:00');
    const end = new Date(rangeEnd + 'T00:00:00');
    const days: string[] = [];
    const current = new Date(start);
    while (current <= end) { days.push(toDateString(current)); current.setDate(current.getDate() + 1); }

    if (!confirm(`Sie blockieren ${days.length} Tag(e). Fortfahren?`)) return;

    setSaving(true);
    for (const d of days) {
      await supabase.from('availability_exceptions').delete().eq('date', d);
    }
    const inserts = days.map(d => ({
      date: d, is_available: false, start_time: null, end_time: null, reason: rangeReason || null
    }));
    const { error } = await supabase.from('availability_exceptions').insert(inserts);

    if (error) onToast('Fehler beim Blockieren', 'error');
    else {
      onToast(`${days.length} Tag(e) blockiert`, 'success');
      setShowRangeModal(false);
      setRangeStart(''); setRangeEnd(''); setRangeReason('');
      onRefresh();
    }
    setSaving(false);
  };

  const handleDeleteException = async (id: string) => {
    if (!confirm('Ausnahme wirklich löschen?')) return;
    const { error } = await supabase.from('availability_exceptions').delete().eq('id', id);
    if (error) onToast('Fehler beim Löschen', 'error');
    else { onToast('Ausnahme gelöscht', 'success'); onRefresh(); }
  };

  const days = getDaysInMonth();
  const selectedDateBookings = selectedDate ? bookings.filter(b => b.appointment_date === selectedDate) : [];
  const futureExceptions = exceptions.filter(ex => ex.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowRangeModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition font-medium"
        >
          <CalendarRange className="w-4 h-4" />
          Zeitraum blockieren
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-xl font-bold text-gray-900">
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-400" /> Regulär verfügbar</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400" /> Blockiert</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /> Abweichende Zeiten</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Hat Buchungen</span>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, i) => {
            if (!date) return <div key={`pad-${i}`} />;
            const dateStr = toDateString(date);
            const isPast = dateStr < today;
            const isToday = dateStr === today;
            const status = getDayStatus(date);

            let bgColor = 'bg-gray-50';
            let ring = '';
            if (isPast) { bgColor = 'bg-gray-50'; }
            else if (status.type === 'blocked') { bgColor = 'bg-red-50'; ring = 'ring-2 ring-red-300'; }
            else if (status.type === 'modified') { bgColor = 'bg-amber-50'; ring = 'ring-2 ring-amber-300'; }
            else if (status.type === 'available') { bgColor = 'bg-emerald-50'; }
            if (isToday) ring = 'ring-2 ring-blue-500';

            return (
              <button
                key={dateStr}
                onClick={() => !isPast && handleDayClick(date)}
                disabled={isPast}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all ${bgColor} ${ring} ${
                  isPast ? 'cursor-not-allowed text-gray-300' : 'hover:scale-105 hover:shadow-md cursor-pointer text-gray-900'
                }`}
              >
                <span className="font-medium">{date.getDate()}</span>
                {status.type === 'blocked' && !isPast && <Ban className="w-3 h-3 text-red-400 mt-0.5" />}
                {status.type === 'modified' && !isPast && <Clock className="w-3 h-3 text-amber-500 mt-0.5" />}
                {status.hasBookings && !isPast && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {futureExceptions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Aktive Ausnahmen</h3>
          <div className="space-y-2">
            {futureExceptions.map(ex => (
              <div
                key={ex.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  ex.is_available ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{formatDateDE(ex.date)}</span>
                  {ex.is_available && ex.start_time && (
                    <span className="text-xs text-gray-500">{ex.start_time} - {ex.end_time}</span>
                  )}
                  {ex.reason && <span className="text-xs text-gray-500">({ex.reason})</span>}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    ex.is_available ? 'bg-amber-200 text-amber-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {ex.is_available ? 'Sonderzeiten' : 'Blockiert'}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteException(ex.id)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDayModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowDayModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{formatDateDE(selectedDate)}</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex gap-3">
                <button
                  onClick={() => setDayBlockAll(true)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition ${
                    dayBlockAll ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Ban className="w-4 h-4 mx-auto mb-1" />
                  Ganzen Tag blockieren
                </button>
                <button
                  onClick={() => setDayBlockAll(false)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition ${
                    !dayBlockAll ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  Abweichende Zeiten
                </button>
              </div>

              {!dayBlockAll && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Von</label>
                    <select value={dayStartTime} onChange={e => setDayStartTime(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bis</label>
                    <select value={dayEndTime} onChange={e => setDayEndTime(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Grund / Notiz</label>
                <input
                  type="text"
                  value={dayReason}
                  onChange={e => setDayReason(e.target.value)}
                  placeholder="z.B. Urlaub, Fortbildung..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {selectedDateBookings.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Buchungen an diesem Tag:</h4>
                  <div className="space-y-1.5">
                    {selectedDateBookings.map(b => (
                      <div key={b.id} className="flex items-center justify-between text-sm">
                        <span className="text-blue-700">{b.customer_name}</span>
                        <span className="text-blue-600 font-medium">{b.start_time} - {b.end_time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-between">
              {exceptionMap.has(selectedDate) && (
                <button
                  onClick={async () => {
                    const ex = exceptionMap.get(selectedDate)!;
                    await handleDeleteException(ex.id);
                    setShowDayModal(false);
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Ausnahme entfernen
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button onClick={() => setShowDayModal(false)}
                  className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
                  Abbrechen
                </button>
                <button onClick={handleDaySave} disabled={saving}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50">
                  {saving ? 'Speichern...' : 'Speichern'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRangeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowRangeModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Zeitraum blockieren</h2>
              <p className="text-sm text-gray-500 mt-1">Alle Tage im Zeitraum werden als nicht verfügbar markiert</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start-Datum</label>
                  <input type="date" value={rangeStart} onChange={e => setRangeStart(e.target.value)}
                    min={today}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">End-Datum</label>
                  <input type="date" value={rangeEnd} onChange={e => setRangeEnd(e.target.value)}
                    min={rangeStart || today}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Grund / Notiz</label>
                <input type="text" value={rangeReason} onChange={e => setRangeReason(e.target.value)}
                  placeholder="z.B. Urlaub, Betriebsferien..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowRangeModal(false)}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
                Abbrechen
              </button>
              <button onClick={handleRangeSave} disabled={saving || !rangeStart || !rangeEnd}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50">
                {saving ? 'Blockiere...' : 'Zeitraum blockieren'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
