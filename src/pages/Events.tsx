import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import { supabaseCms, type WebsiteEvent } from '../lib/supabaseCms';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Monitor,
  Users,
  Clock,
  Calendar,
  Crown,
  Plus,
  Ticket,
  ExternalLink,
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://free.the-power-of.ai/assets/hero.jpg';

// ─── Types ──────────────────────────────────────────
interface CommunityEvent {
  id: string;
  creator_id: string;
  creator_name: string;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  type: 'zoom' | 'live' | 'workshop' | 'vortrag' | 'meetup' | 'speaker';
  location?: string;
  registration_link?: string;
  price_text?: string;
  max_participants?: number;
  current_participants: number;
  color: string;
  image_url?: string;
  created_at: string;
}

const EVENT_COLORS: Record<string, string> = {
  zoom: '#4A90D9',
  live: '#DAA520',
  workshop: '#9B59B6',
  vortrag: '#E74C3C',
  meetup: '#DAA520',
  speaker: '#E91E63',
};

// ─── Mapping: WebsiteEvent → CommunityEvent ────────
function mapCategoryToType(category: string, eventType: string): CommunityEvent['type'] {
  switch (category) {
    case 'workshop': return 'workshop';
    case 'keynote': return 'speaker';
    case 'networking': return 'meetup';
    case 'webinar': return 'vortrag';
    case 'mentoring': return 'zoom';
    default: return eventType === 'offline' ? 'live' : eventType === 'online' ? 'zoom' : 'live';
  }
}

function parseStartTime(timeStr: string): string {
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : '00:00';
}

function mapWebsiteEvent(ev: WebsiteEvent): CommunityEvent {
  const type = mapCategoryToType(ev.category, ev.event_type);
  const startTime = ev.event_time ? parseStartTime(ev.event_time) : '00:00';
  const date = ev.event_date ? `${ev.event_date}T${startTime}:00` : ev.created_at;

  return {
    id: ev.id,
    creator_id: 'admin',
    creator_name: 'Claudia Conen',
    title: ev.title,
    description: ev.description || ev.subtitle || '',
    date,
    end_date: ev.end_date ? `${ev.end_date}T23:59:00` : undefined,
    type,
    location: ev.event_type !== 'online' ? ev.location : undefined,
    registration_link: ev.registration_link || undefined,
    price_text: ev.price_text || undefined,
    max_participants: ev.max_participants ?? undefined,
    current_participants: 0,
    color: EVENT_COLORS[type] || EVENT_COLORS.zoom,
    image_url: ev.image_url || undefined,
    created_at: ev.created_at,
  };
}

// ─── Type label mapping ─────────────────────────────
const EVENT_TYPE_LABELS: Record<string, string> = {
  zoom: 'Zoom',
  live: 'Live',
  workshop: 'Workshop',
  vortrag: 'Vortrag',
  meetup: 'Meetup',
  speaker: 'Speaker-Event',
};

const ALL_EVENT_TYPES = Object.keys(EVENT_TYPE_LABELS);

// ─── German month / day names ───────────────────────
const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

const DAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

// ─── Framer Motion variants ─────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const calendarCellVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.015,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

// ─── Helpers ────────────────────────────────────────
function formatGermanDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day}. ${month} ${year}, ${hours}:${minutes} Uhr`;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

// ─── Calendar Component ─────────────────────────────
interface CalendarProps {
  year: number;
  month: number;
  events: CommunityEvent[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function AnimatedCalendar({ year, month, events, selectedDate, onSelectDate, onPrevMonth, onNextMonth }: CalendarProps) {
  const today = new Date();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const eventDayMap = useMemo(() => {
    const map = new Map<number, string[]>();
    events.forEach((ev) => {
      const evDate = new Date(ev.date);
      if (evDate.getFullYear() === year && evDate.getMonth() === month) {
        const day = evDate.getDate();
        const colors = map.get(day) || [];
        if (!colors.includes(ev.color)) colors.push(ev.color);
        map.set(day, colors);
      }
    });
    return map;
  }, [events, year, month]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="events-card p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }} onClick={onPrevMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-pearl-white/60 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.h3 key={`${year}-${month}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="font-montserrat text-xl font-bold text-pearl-white"
        >
          {MONTH_NAMES[month]} {year}
        </motion.h3>
        <motion.button whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }} onClick={onNextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-pearl-white/60 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="events-calendar-grid mb-2">
        {DAY_NAMES.map((day) => (
          <div key={day} className="text-center font-inter text-xs font-semibold text-pearl-white/40 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <motion.div key={`${year}-${month}`} className="events-calendar-grid" initial="hidden" animate="visible" variants={containerVariants}>
        {cells.map((dayNum, idx) => {
          if (dayNum === null) return <div key={`empty-${idx}`} />;

          const cellDate = new Date(year, month, dayNum);
          const isToday = isSameDay(cellDate, today);
          const isSelected = selectedDate ? isSameDay(cellDate, selectedDate) : false;
          const eventColors = eventDayMap.get(dayNum) || [];
          const hasEvent = eventColors.length > 0;

          return (
            <motion.button key={`day-${dayNum}`} custom={idx} variants={calendarCellVariants}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDate(cellDate)}
              className={`events-calendar-day flex-col gap-0.5 ${isToday ? 'today' : ''} ${
                isSelected && !isToday ? 'bg-luxury-gold/20 border border-luxury-gold/40 text-luxury-gold font-bold' : ''
              } ${hasEvent && !isToday && !isSelected ? 'text-pearl-white/90' : !isToday && !isSelected ? 'text-pearl-white/60' : ''}`}
            >
              <span className="text-sm leading-none">{dayNum}</span>
              {hasEvent && (
                <div className="flex gap-0.5 mt-0.5">
                  {eventColors.slice(0, 3).map((color, ci) => (
                    <span key={ci} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mt-6 pt-4 border-t border-pearl-white/10">
        <div className="flex flex-wrap gap-3 justify-center">
          {ALL_EVENT_TYPES.map((type) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: EVENT_COLORS[type] }} />
              <span className="font-inter text-xs text-pearl-white/50">{EVENT_TYPE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Event Card ─────────────────────────────────────
function EventCard({ event }: { event: CommunityEvent }) {
  const [expanded, setExpanded] = useState(false);
  const isOnline = !event.location;
  const spotsLeft = event.max_participants ? event.max_participants - event.current_participants : null;
  const isExternal = event.registration_link?.startsWith('http');
  const imgSrc = event.image_url || FALLBACK_IMAGE;

  const eventDate = new Date(event.date);
  const dayNum = eventDate.getDate();
  const monthName = MONTH_NAMES[eventDate.getMonth()].substring(0, 3).toUpperCase();
  const yearNum = eventDate.getFullYear();

  return (
    <motion.article variants={itemVariants} className="events-card overflow-hidden group">
      {/* Image header */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-midnight-blue/40 to-transparent" />
        {/* Color accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: event.color }} />

        {/* Date badge */}
        <div className="absolute top-4 right-4 flex flex-col items-center justify-center w-14 h-14 rounded-xl backdrop-blur-sm border"
          style={{ backgroundColor: `${event.color}25`, borderColor: `${event.color}50` }}
        >
          <span className="font-montserrat text-xl font-black leading-none" style={{ color: event.color }}>{dayNum}</span>
          <span className="font-inter text-[9px] font-bold tracking-widest text-pearl-white/80 uppercase mt-0.5">{monthName}</span>
          <span className="font-inter text-[9px] text-pearl-white/50">{yearNum}</span>
        </div>

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full font-inter text-xs font-semibold backdrop-blur-sm"
            style={{ backgroundColor: `${event.color}30`, color: event.color, border: `1px solid ${event.color}50` }}
          >
            {EVENT_TYPE_LABELS[event.type]}
          </span>
        </div>

        {/* Title on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="font-montserrat text-lg font-bold text-pearl-white group-hover:text-luxury-gold transition-colors duration-300 leading-tight">
            {event.title}
          </h4>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-pearl-white/60">
            <Clock className="w-3.5 h-3.5 text-luxury-gold/60" />
            <span className="font-inter text-xs">
              {formatTime(event.date)}
              {event.end_date ? ` – ${formatTime(event.end_date)}` : ''} Uhr
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-pearl-white/60">
            {isOnline ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#4A90D9]" />
                <span className="font-inter text-xs">Online</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-luxury-gold/60" />
                <span className="font-inter text-xs">{event.location}</span>
              </>
            )}
          </div>
          {event.price_text && (
            <div className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-luxury-gold/60" />
              <span className="font-inter text-xs font-semibold text-luxury-gold/90">{event.price_text}</span>
            </div>
          )}
          {event.max_participants && (
            <div className="flex items-center gap-1.5 text-pearl-white/50">
              <Users className="w-3.5 h-3.5" />
              <span className="font-inter text-xs">Max. {event.max_participants} Plätze</span>
              {spotsLeft !== null && spotsLeft <= 5 && spotsLeft > 0 && (
                <span className="text-[10px] text-[#E74C3C] font-bold ml-0.5">Nur noch {spotsLeft}!</span>
              )}
            </div>
          )}
        </div>

        {/* Toggle + CTA row */}
        <div className="flex items-center justify-between gap-3">
          {event.description ? (
            <motion.button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-pearl-white/50 hover:text-luxury-gold transition-colors font-inter text-xs font-medium"
              whileTap={{ scale: 0.97 }}
            >
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
              {expanded ? 'Weniger anzeigen' : 'Details anzeigen'}
            </motion.button>
          ) : <span />}

          {event.registration_link ? (
            <motion.a
              href={event.registration_link}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="events-outline-btn font-inter text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shrink-0"
            >
              Jetzt anmelden
              {isExternal && <ExternalLink className="w-3 h-3" />}
            </motion.a>
          ) : (
            <motion.a href="/#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="events-outline-btn font-inter text-xs font-semibold px-4 py-2 rounded-full shrink-0"
            >
              Anfragen
            </motion.a>
          )}
        </div>

        {/* Collapsible description */}
        <AnimatePresence initial={false}>
          {expanded && event.description && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-pearl-white/10">
                <p className="font-inter text-sm text-pearl-white/60 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Main Page ──────────────────────────────────────
export default function Events() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  const [dbEvents, setDbEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Lade Events aus Supabase (website_events, nur aktive)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data, error } = await supabaseCms
          .from('website_events')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!error && data) {
          setDbEvents(data.map(mapWebsiteEvent));
        }
      } catch {
        // Silently fail – show empty state
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) { setCurrentYear((y) => y - 1); return 11; }
      return prev - 1;
    });
    setSelectedDate(null);
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) { setCurrentYear((y) => y + 1); return 0; }
      return prev + 1;
    });
    setSelectedDate(null);
  }, []);

  const filteredEvents = useMemo(() => {
    let events = [...dbEvents];
    if (activeTypeFilter) events = events.filter((e) => e.type === activeTypeFilter);
    if (selectedDate) events = events.filter((e) => isSameDay(new Date(e.date), selectedDate));
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return events;
  }, [activeTypeFilter, selectedDate, dbEvents]);

  const allEventsForCalendar = useMemo(() => {
    if (activeTypeFilter) return dbEvents.filter((e) => e.type === activeTypeFilter);
    return dbEvents;
  }, [activeTypeFilter, dbEvents]);

  return (
    <>
      <SEO
        title="Events & Veranstaltungen"
        description="Zoom-Calls, Workshops, Meetups und Vorträge – Entdecke kommende Events im Kalender."
      />
      <Navigation />
      <div className="min-h-screen pt-24 pb-16 relative" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #1A2B4C 200px, #0A1628 500px)' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -5%, rgba(218,165,32,0.08) 0%, rgba(218,165,32,0.03) 50%, transparent 80%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold text-pearl-white mb-4">
              Events &amp; Kalender
            </h1>
            <p className="font-inter text-lg sm:text-xl text-pearl-white/60 max-w-2xl mx-auto">
              Zoom-Calls, Workshops, Meetups &ndash; erlebe Claudia Conen live
            </p>
          </motion.div>

          {/* Filter chips */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveTypeFilter(null); setSelectedDate(null); }}
              className={`px-4 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300 ${
                activeTypeFilter === null
                  ? 'gold-button text-midnight-blue'
                  : 'bg-royal-navy/60 text-pearl-white/60 border border-pearl-white/10 hover:border-luxury-gold/30 hover:text-pearl-white'
              }`}
            >
              Alle Events
            </motion.button>
            {ALL_EVENT_TYPES.map((type) => (
              <motion.button key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { setActiveTypeFilter(activeTypeFilter === type ? null : type); setSelectedDate(null); }}
                className={`px-4 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTypeFilter === type
                    ? 'text-midnight-blue'
                    : 'bg-royal-navy/60 text-pearl-white/60 border border-pearl-white/10 hover:border-pearl-white/30 hover:text-pearl-white'
                }`}
                style={activeTypeFilter === type ? { backgroundColor: EVENT_COLORS[type], boxShadow: `0 4px 15px ${EVENT_COLORS[type]}40` } : undefined}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTypeFilter === type ? '#0A1628' : EVENT_COLORS[type] }} />
                {EVENT_TYPE_LABELS[type]}
              </motion.button>
            ))}
          </motion.div>

          {/* Selected date indicator */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <span className="font-inter text-sm text-pearl-white/60">
                  Events am {selectedDate.getDate()}. {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </span>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(null)}
                  className="text-luxury-gold font-inter text-sm font-medium hover:underline"
                >
                  Alle anzeigen
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Two-column layout */}
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="absolute inset-0 -inset-x-8 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(253,251,247,0.04) 0%, transparent 70%)' }}
            />
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <AnimatedCalendar
                year={currentYear} month={currentMonth} events={allEventsForCalendar}
                selectedDate={selectedDate} onSelectDate={setSelectedDate}
                onPrevMonth={goToPrevMonth} onNextMonth={goToNextMonth}
              />
            </motion.div>

            <div className="lg:col-span-3">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5" style={{ padding: '0 4px' }}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <Calendar className="w-16 h-16 text-pearl-white/20 mx-auto mb-4" />
                    <p className="font-inter text-lg text-pearl-white/50">
                      {selectedDate ? 'Keine Events an diesem Tag.' : 'Keine Events gefunden.'}
                    </p>
                    <p className="font-inter text-sm text-pearl-white/30 mt-1">
                      {selectedDate ? 'Wähle einen anderen Tag oder zeige alle Events an.' : 'Versuche es mit einem anderen Filter.'}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Event Highlight */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-16 mb-8">
            <div className="events-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden min-h-[240px]">
                  <img
                    src={FALLBACK_IMAGE}
                    alt="The Power of AI Event"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight-blue/40 md:to-midnight-blue/80" />
                  {/* Logo overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold/50 flex items-center justify-center backdrop-blur-sm">
                      <Crown className="w-7 h-7 text-luxury-gold" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 mb-4 self-start">
                    <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                    <span className="font-inter text-xs text-luxury-gold font-semibold uppercase tracking-wider">Nächstes Highlight</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-pearl-white mb-3">
                    The Power of AI – Speaker Night
                  </h3>
                  <p className="font-inter text-pearl-white/60 text-sm leading-relaxed mb-6">
                    Top-Speaker teilen ihre Erfahrungen mit KI im Business. Von inspirierenden
                    Keynotes bis hin zu praxisnahen Workshops &ndash; hier passiert echte Verbindung.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      href="https://free.the-power-of.ai/?event=6"
                      target="_blank" rel="noopener noreferrer"
                      className="gold-button font-inter text-sm font-semibold text-midnight-blue px-6 py-3 rounded-full self-start flex items-center gap-2"
                    >
                      Ticket sichern
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="/#contact"
                      className="events-outline-btn font-inter text-sm font-semibold px-6 py-3 rounded-full self-start flex items-center gap-2"
                    >
                      Anfragen
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="events-card p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-luxury-gold/5 pointer-events-none" />
              <div className="relative z-10">
                <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center"
                >
                  <Crown className="w-8 h-8 text-luxury-gold" />
                </motion.div>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-pearl-white mb-3">
                  Erleben Sie Claudia Conen live
                </h2>
                <p className="font-inter text-pearl-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
                  Keynotes, Workshops, Speaker-Events &ndash; buchen Sie Claudia für Ihre
                  Veranstaltung oder nehmen Sie an kommenden Events teil.
                </p>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/#contact"
                  className="gold-button font-inter text-sm font-semibold text-midnight-blue px-8 py-3 rounded-full inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Jetzt anfragen
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
