import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Video, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface EventData {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time?: string;
  location?: string;
  event_type: string;
  is_online: boolean;
  price?: number;
  registration_url?: string;
}

const TYPE_COLORS: Record<string, string> = {
  'zoom-call': 'bg-blue-100 text-blue-700 border-blue-300',
  'workshop': 'bg-amber-50 text-amber-700 border-amber-300',
  'keynote': 'bg-purple-100 text-purple-700 border-purple-300',
  'meetup': 'bg-green-100 text-green-700 border-green-300',
  'webinar': 'bg-teal-100 text-teal-700 border-teal-300',
  'live-event': 'bg-red-100 text-red-700 border-red-300',
};

const TYPE_LABELS: Record<string, string> = {
  'zoom-call': 'Zoom-Call',
  'workshop': 'Workshop',
  'keynote': 'Keynote',
  'meetup': 'Meetup',
  'webinar': 'Webinar',
  'live-event': 'Live-Event',
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const { data, error } = await supabase
        .from('community_events')
        .select('*')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || events.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pearl-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-bright-gold/10 text-bright-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar size={16} /> Nächste Events
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-midnight-blue">
            Erlebe Claudia live
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {events.map((event, index) => {
            const typeColor = TYPE_COLORS[event.event_type] || 'bg-gray-100 text-gray-700 border-gray-300';
            const typeLabel = TYPE_LABELS[event.event_type] || event.event_type;
            const date = new Date(event.event_date);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${typeColor}`}>
                      {typeLabel}
                    </span>
                    {event.event_time && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {event.event_time} Uhr
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-midnight-blue mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      {event.is_online ? <Video size={14} /> : <MapPin size={14} />}
                      {event.is_online ? 'Online' : event.location || 'Vor Ort'}
                    </span>
                    <span className="text-sm font-bold text-midnight-blue">
                      {date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-bright-gold font-semibold hover:gap-4 transition-all"
          >
            Alle Events ansehen <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
