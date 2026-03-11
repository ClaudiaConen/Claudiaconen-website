import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Video, Users, Clock, ArrowRight, Filter, ChevronLeft, ChevronRight, Star, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { supabaseCms, type WebsiteEvent } from '../lib/supabaseCms';

const CATEGORY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  keynote: { label: 'Keynote', color: 'text-purple-700', bg: 'bg-purple-100/80 border-purple-300' },
  workshop: { label: 'Workshop', color: 'text-amber-700', bg: 'bg-amber-100/80 border-amber-300' },
  mentoring: { label: 'Mentoring', color: 'text-rose-700', bg: 'bg-rose-100/80 border-rose-300' },
  webinar: { label: 'Webinar', color: 'text-teal-700', bg: 'bg-teal-100/80 border-teal-300' },
  networking: { label: 'Networking', color: 'text-blue-700', bg: 'bg-blue-100/80 border-blue-300' },
  other: { label: 'Event', color: 'text-gray-700', bg: 'bg-gray-100/80 border-gray-300' },
};

const TYPE_LABELS: Record<string, { label: string; icon: typeof Video }> = {
  online: { label: 'Online', icon: Video },
  offline: { label: 'Vor Ort', icon: MapPin },
  hybrid: { label: 'Hybrid', icon: Globe },
};

const FILTER_TABS = [
  { id: 'all', label: 'Alle Events' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'Vor Ort' },
  { id: 'hybrid', label: 'Hybrid' },
];

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.other;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
}

export default function Events() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const { data, error } = await supabaseCms
        .from('website_events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.event_type === activeFilter);
  }, [events, activeFilter]);

  const featuredEvents = useMemo(() => events.filter(e => e.is_featured), [events]);

  // Calendar logic
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const days: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
    return days;
  }, [currentMonth]);

  const eventDates = useMemo(() => {
    const dates = new Set<string>();
    events.forEach(e => {
      if (!e.event_date) return;
      const d = new Date(e.event_date);
      if (d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()) {
        dates.add(d.getDate().toString());
      }
    });
    return dates;
  }, [events, currentMonth]);

  const monthLabel = currentMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

  return (
    <>
      <SEO
        title="Events & Termine | Claudia Conen"
        description="Entdecke kommende Events, Workshops, Webinare und Live-Events mit Claudia Conen. Online und vor Ort – für Unternehmer, Speaker und alle, die wachsen wollen."
        keywords={['Events', 'Workshops', 'Webinare', 'Claudia Conen', 'Live Events', 'Networking', 'Business Events']}
      />
      <div className="min-h-screen bg-pearl-white">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 215, 77, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
            <div className="absolute top-20 right-20 w-72 h-72 bg-bright-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-bright-gold/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bright-gold/10 border border-bright-gold/20 mb-6">
                <Sparkles size={16} className="text-bright-gold" />
                <span className="text-bright-gold text-sm font-semibold tracking-wide">Live erleben & wachsen</span>
              </div>
              <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl text-pearl-white mb-6">
                Events &{' '}
                <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Termine
                </span>
              </h1>
              <p className="text-xl text-pearl-white/80 max-w-3xl mx-auto leading-relaxed">
                Workshops, Webinare, Vorträge und Netzwerk-Events – online und vor Ort.
                <br className="hidden sm:block" />
                Begegnungen, die bewegen. Wissen, das bleibt.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Event Highlight */}
        {featuredEvents.length > 0 && (
          <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-blue/5 to-transparent">
            <div className="max-w-7xl mx-auto">
              {featuredEvents.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-gradient-to-r from-midnight-blue via-royal-navy to-midnight-blue rounded-3xl p-8 lg:p-10 overflow-hidden border border-bright-gold/20"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-bright-gold/5 rounded-full blur-3xl" />
                  <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bright-gold to-luxury-gold flex flex-col items-center justify-center text-midnight-blue shadow-lg">
                        {event.event_date ? (
                          <>
                            <span className="text-2xl font-black leading-none">{new Date(event.event_date).getDate()}</span>
                            <span className="text-xs font-bold uppercase">{new Date(event.event_date).toLocaleDateString('de-DE', { month: 'short' })}</span>
                          </>
                        ) : (
                          <Calendar size={28} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Star size={16} className="text-bright-gold fill-bright-gold" />
                        <span className="text-bright-gold text-sm font-semibold uppercase tracking-wider">Highlight-Event</span>
                      </div>
                      <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-pearl-white mb-2">{event.title}</h2>
                      {event.subtitle && <p className="text-pearl-white/70 text-lg mb-3">{event.subtitle}</p>}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-pearl-white/60">
                        {event.event_date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} /> {formatDate(event.event_date)}
                          </span>
                        )}
                        {event.event_time && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} /> {event.event_time}
                          </span>
                        )}
                        {(() => {
                          const typeInfo = TYPE_LABELS[event.event_type];
                          const TypeIcon = typeInfo?.icon || Globe;
                          return (
                            <span className="flex items-center gap-1.5">
                              <TypeIcon size={14} /> {typeInfo?.label || event.event_type}
                            </span>
                          );
                        })()}
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} /> {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                      {event.price_text && (
                        <span className="text-bright-gold font-bold text-lg">{event.price_text}</span>
                      )}
                      <a
                        href={event.registration_link || '/termin-buchen'}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-bright-gold/20"
                      >
                        Jetzt anmelden <ArrowRight size={18} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Filter Tabs */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200/60">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
            <Filter size={18} className="text-gray-400 shrink-0" />
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-midnight-blue to-royal-navy text-pearl-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Main Content: Calendar + List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-10">

            {/* Calendar Sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-midnight-blue" />
                  </button>
                  <h3 className="font-bold text-midnight-blue capitalize">{monthLabel}</h3>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} className="text-midnight-blue" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 flex items-center justify-center rounded-full relative transition-colors ${
                        day === null ? '' :
                        eventDates.has(day.toString())
                          ? 'bg-gradient-to-br from-bright-gold/20 to-luxury-gold/20 text-midnight-blue font-bold ring-1 ring-bright-gold/30'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                      {day && eventDates.has(day.toString()) && (
                        <span className="absolute bottom-0.5 w-1.5 h-1.5 bg-bright-gold rounded-full" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Category Legend */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kategorien</h4>
                  <div className="space-y-2">
                    {Object.entries(CATEGORY_STYLES).filter(([k]) => k !== 'other').map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        <span className={`w-3 h-3 rounded-full ${val.bg} border`} />
                        <span className="text-gray-600">{val.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-midnight-blue/5 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-midnight-blue">{events.length}</div>
                      <div className="text-xs text-gray-500 font-medium">Events</div>
                    </div>
                    <div className="bg-bright-gold/10 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-midnight-blue">
                        {events.filter(e => e.event_type === 'online').length}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Online</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event List */}
            <div>
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-12 h-12 border-4 border-bright-gold/30 border-t-bright-gold rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">Events werden geladen...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-midnight-blue/10 to-bright-gold/10 rounded-2xl flex items-center justify-center">
                    <Calendar size={36} className="text-midnight-blue/40" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-midnight-blue mb-3">Keine Events gefunden</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Aktuell sind keine Events im gewählten Filter geplant. Abonniere den Newsletter und erfahre als Erste von neuen Terminen.
                  </p>
                  <Link
                    to="/newsletter"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform shadow-md"
                  >
                    Newsletter abonnieren <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {filteredEvents.map((event, index) => {
                    const catStyle = getCategoryStyle(event.category);
                    const typeInfo = TYPE_LABELS[event.event_type];
                    const TypeIcon = typeInfo?.icon || Globe;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                          event.is_featured ? 'ring-2 ring-bright-gold/30' : ''
                        }`}
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Date Column */}
                          <div className="flex-shrink-0 md:w-24 bg-gradient-to-br from-midnight-blue to-royal-navy flex md:flex-col items-center justify-center p-4 md:p-0 gap-2 md:gap-0">
                            {event.event_date ? (
                              <>
                                <span className="text-bright-gold/80 text-xs font-semibold uppercase md:mt-4">
                                  {new Date(event.event_date).toLocaleDateString('de-DE', { weekday: 'short' })}
                                </span>
                                <span className="text-pearl-white text-3xl font-black leading-none">
                                  {new Date(event.event_date).getDate()}
                                </span>
                                <span className="text-pearl-white/60 text-sm font-medium md:mb-4">
                                  {new Date(event.event_date).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })}
                                </span>
                              </>
                            ) : (
                              <Calendar size={24} className="text-bright-gold" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {event.is_featured && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bright-gold/15 text-xs font-bold text-amber-700">
                                  <Star size={10} className="fill-amber-500 text-amber-500" /> Highlight
                                </span>
                              )}
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${catStyle.bg} ${catStyle.color}`}>
                                {catStyle.label}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                <TypeIcon size={10} /> {typeInfo?.label || event.event_type}
                              </span>
                            </div>

                            <h3 className="font-montserrat font-bold text-lg text-midnight-blue mb-1 group-hover:text-royal-navy transition-colors">
                              {event.title}
                            </h3>
                            {event.subtitle && (
                              <p className="text-gray-500 text-sm mb-2">{event.subtitle}</p>
                            )}
                            {event.description && (
                              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              {event.event_time && (
                                <span className="flex items-center gap-1.5">
                                  <Clock size={14} className="text-gray-400" /> {event.event_time}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} className="text-gray-400" /> {event.location}
                                </span>
                              )}
                              {event.max_participants && (
                                <span className="flex items-center gap-1.5">
                                  <Users size={14} className="text-gray-400" /> Max. {event.max_participants} Plätze
                                </span>
                              )}
                            </div>
                          </div>

                          {/* CTA Column */}
                          <div className="flex-shrink-0 flex md:flex-col items-center justify-center gap-3 p-6 md:border-l border-gray-100">
                            {event.price_text && (
                              <span className="font-bold text-midnight-blue text-lg">{event.price_text}</span>
                            )}
                            <a
                              href={event.registration_link || '/termin-buchen'}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-md shadow-bright-gold/10 whitespace-nowrap"
                            >
                              Anmelden <ArrowRight size={16} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto relative bg-gradient-to-br from-midnight-blue to-royal-navy rounded-3xl p-8 lg:p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-bright-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-bright-gold/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-montserrat font-bold text-3xl text-pearl-white mb-4">
                Du planst ein Event?
              </h2>
              <p className="text-pearl-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Ob Keynote, Workshop oder Firmen-Event – Claudia bringt dein Publikum zum Staunen.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-bright-gold/20"
              >
                Claudia als Rednerin buchen
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
