import { Calendar, Clock, MapPin, Users, ExternalLink, Star } from 'lucide-react';
import { useEvents } from '../hooks/useCmsContent';
import { Link } from 'react-router-dom';

interface EventsListProps {
  maxItems?: number;
  showFeaturedOnly?: boolean;
  compact?: boolean;
}

export default function EventsList({ maxItems, showFeaturedOnly, compact }: EventsListProps) {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  let filtered = events;
  if (showFeaturedOnly) filtered = filtered.filter(e => e.is_featured);
  if (maxItems) filtered = filtered.slice(0, maxItems);

  if (filtered.length === 0) return null;

  const eventTypeLabel = (type: string) => {
    switch (type) {
      case 'online': return 'Online';
      case 'offline': return 'Vor Ort';
      case 'hybrid': return 'Hybrid';
      default: return type;
    }
  };

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case 'keynote': return 'Keynote';
      case 'workshop': return 'Workshop';
      case 'mentoring': return 'Mentoring';
      case 'webinar': return 'Webinar';
      case 'networking': return 'Networking';
      default: return cat;
    }
  };

  return (
    <div className="space-y-4">
      {filtered.map(event => (
        <div
          key={event.id}
          className={`relative bg-pearl-white border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg ${
            event.is_featured ? 'border-bright-gold shadow-md' : 'border-bright-gold/30'
          }`}
        >
          {event.is_featured && (
            <div className="absolute top-3 right-3">
              <Star className="w-5 h-5 text-bright-gold fill-bright-gold" />
            </div>
          )}

          <div className={compact ? 'p-4' : 'p-6'}>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                event.event_type === 'online' ? 'bg-green-100 text-green-700' :
                event.event_type === 'offline' ? 'bg-orange-100 text-orange-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {eventTypeLabel(event.event_type)}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-midnight-blue/10 text-midnight-blue font-medium">
                {categoryLabel(event.category)}
              </span>
            </div>

            <h3 className={`font-bold text-midnight-blue ${compact ? 'text-lg' : 'text-xl'} mb-1`}>
              {event.title}
            </h3>
            {event.subtitle && (
              <p className="text-bright-gold font-medium text-sm mb-2">{event.subtitle}</p>
            )}
            {!compact && event.description && (
              <p className="text-gray-600 mb-3">{event.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {event.event_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-bright-gold" />
                  {new Date(event.event_date).toLocaleDateString('de-DE', {
                    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
                  })}
                </span>
              )}
              {event.event_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-bright-gold" />
                  {event.event_time}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-bright-gold" />
                  {event.location}
                </span>
              )}
              {event.max_participants && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-bright-gold" />
                  Max. {event.max_participants} Teilnehmer
                </span>
              )}
              {event.price_text && (
                <span className="font-semibold text-midnight-blue">{event.price_text}</span>
              )}
            </div>

            {event.registration_link && (
              <div className="mt-4">
                {event.registration_link.startsWith('/') ? (
                  <Link
                    to={event.registration_link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Jetzt anmelden
                  </Link>
                ) : (
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Jetzt anmelden <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
