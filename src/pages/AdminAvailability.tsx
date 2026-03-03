import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CalendarCheck, Ban, BarChart3, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import WeeklyPlanner from '../components/availability/WeeklyPlanner';
import MonthlyExceptions from '../components/availability/MonthlyExceptions';
import CombinedCalendarView from '../components/availability/CombinedCalendarView';
import {
  AvailabilitySlot, AvailabilityException, BookingWithType, toDateString
} from '../lib/availabilityTypes';

type Tab = 'planner' | 'exceptions' | 'overview';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export default function AdminAvailability() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('planner');
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>([]);
  const [bookings, setBookings] = useState<BookingWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (!checkAdminAuth()) { navigate('/admin/login'); return; }
    fetchAll();
  }, [navigate]);

  const fetchAll = async () => {
    setLoading(true);
    const [slotsRes, exceptionsRes, bookingsRes] = await Promise.all([
      supabase.from('availability_slots').select('*').order('day_of_week').order('start_time'),
      supabase.from('availability_exceptions').select('*').order('date'),
      supabase
        .from('bookings')
        .select('id, customer_name, appointment_date, start_time, end_time, status, appointment_types(name, color)')
        .in('status', ['pending', 'confirmed'])
        .gte('appointment_date', toDateString(new Date()))
        .order('appointment_date')
    ]);

    if (slotsRes.data) setSlots(slotsRes.data);
    if (exceptionsRes.data) setExceptions(exceptionsRes.data);
    if (bookingsRes.data) setBookings(bookingsRes.data as unknown as BookingWithType[]);
    setLoading(false);
  };

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const todayStr = toDateString(new Date());
  const activeDays = new Set(slots.filter(s => s.is_active).map(s => s.day_of_week)).size;
  const activeExceptions = exceptions.filter(ex => ex.date >= todayStr).length;
  const thisWeekBookings = bookings.filter(b => {
    const d = new Date(b.appointment_date + 'T00:00:00');
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return d >= now && d <= weekEnd;
  }).length;

  const nextAvailableDay = (() => {
    const activeDaySet = new Set(slots.filter(s => s.is_active).map(s => s.day_of_week));
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const check = new Date(today);
      check.setDate(check.getDate() + i);
      const dateStr = toDateString(check);
      const hasBlock = exceptions.some(e => e.date === dateStr && !e.is_available);
      if (activeDaySet.has(check.getDay()) && !hasBlock) {
        return new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: 'numeric', month: 'short' }).format(check);
      }
    }
    return '\u2014';
  })();

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'planner', label: 'Wochenplaner', icon: Clock },
    { key: 'exceptions', label: 'Ausnahmen & Kalender', icon: Calendar },
    { key: 'overview', label: 'Gesamtübersicht', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verfügbarkeiten</h1>
            <p className="text-gray-600">Verwalten Sie Ihre regelmäßigen Zeiten, Ausnahmen und behalten Sie den Überblick</p>
          </div>

          {!loading && slots.filter(s => s.is_active).length === 0 && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800">Keine aktiven Verfügbarkeiten</p>
                <p className="text-sm text-amber-700 mt-1">
                  Bitte tragen Sie Ihre wöchentlichen Verfügbarkeiten im Wochenplaner ein, damit Kunden Termine buchen können.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-50"><Clock className="w-5 h-5 text-emerald-600" /></div>
                <span className="text-sm text-gray-500">Aktive Wochentage</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{activeDays}<span className="text-lg text-gray-400">/7</span></div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-50"><Ban className="w-5 h-5 text-red-600" /></div>
                <span className="text-sm text-gray-500">Aktive Ausnahmen</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{activeExceptions}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-50"><CalendarCheck className="w-5 h-5 text-blue-600" /></div>
                <span className="text-sm text-gray-500">Buchungen (7 Tage)</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{thisWeekBookings}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-50"><Calendar className="w-5 h-5 text-amber-600" /></div>
                <span className="text-sm text-gray-500">Nächster freier Tag</span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">{nextAvailableDay}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition ${
                        activeTab === tab.key
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <div className="p-6">
                {activeTab === 'planner' && (
                  <WeeklyPlanner slots={slots} onRefresh={fetchAll} onToast={showToast} />
                )}
                {activeTab === 'exceptions' && (
                  <MonthlyExceptions
                    slots={slots}
                    exceptions={exceptions}
                    bookings={bookings}
                    onRefresh={fetchAll}
                    onToast={showToast}
                  />
                )}
                {activeTab === 'overview' && (
                  <CombinedCalendarView
                    slots={slots}
                    exceptions={exceptions}
                    bookings={bookings}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white pointer-events-auto ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
