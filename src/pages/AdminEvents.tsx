import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Edit2, Trash2, Eye, EyeOff, Star, MapPin, Clock, Users, ExternalLink, Save, X, ChevronUp, ChevronDown } from 'lucide-react';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import AdminLayout from '../components/AdminLayout';
import { supabaseCms, type WebsiteEvent } from '../lib/supabaseCms';

const EVENT_TYPES = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Vor Ort' },
  { value: 'hybrid', label: 'Hybrid' },
];

const CATEGORIES = [
  { value: 'keynote', label: 'Keynote' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'networking', label: 'Networking' },
  { value: 'other', label: 'Sonstiges' },
];

const emptyEvent: Omit<WebsiteEvent, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  subtitle: '',
  description: '',
  event_date: null,
  event_time: '',
  end_date: null,
  location: '',
  event_type: 'online',
  category: 'keynote',
  image_url: '',
  registration_link: '/termin-buchen',
  price_text: '',
  max_participants: null,
  is_featured: false,
  is_active: true,
  display_order: 0,
};

type EventFormData = Omit<WebsiteEvent, 'id' | 'created_at' | 'updated_at'>;

function EventForm({ formData, setFormData, error, saving, onSave, onCancel, isNew }: {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  error: string;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}) {
  return (
    <div className={`p-6 rounded-xl border ${isNew ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'} space-y-4`}>
      <h3 className="font-bold text-lg">{isNew ? 'Neues Event erstellen' : 'Event bearbeiten'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titel *</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. The Power of AI – Live Event"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={e => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. KI-Strategien für Unternehmer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Beschreibe das Event..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
          <input
            type="date"
            value={formData.event_date || ''}
            onChange={e => setFormData(prev => ({ ...prev, event_date: e.target.value || null }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Uhrzeit</label>
          <input
            type="text"
            value={formData.event_time}
            onChange={e => setFormData(prev => ({ ...prev, event_time: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. 18:00 - 21:00 Uhr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
          <select
            value={formData.event_type}
            onChange={e => setFormData(prev => ({ ...prev, event_type: e.target.value as any }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
          <select
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
          <input
            type="text"
            value={formData.location}
            onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. Online via Zoom / Köln"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preis</label>
          <input
            type="text"
            value={formData.price_text}
            onChange={e => setFormData(prev => ({ ...prev, price_text: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. Kostenlos / Ab 297€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max. Teilnehmer</label>
          <input
            type="number"
            value={formData.max_participants || ''}
            onChange={e => setFormData(prev => ({ ...prev, max_participants: e.target.value ? parseInt(e.target.value) : null }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Unbegrenzt"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Anmelde-Link</label>
          <input
            type="text"
            value={formData.registration_link}
            onChange={e => setFormData(prev => ({ ...prev, registration_link: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/termin-buchen oder externer Link"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bild-URL</label>
          <input
            type="text"
            value={formData.image_url}
            onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_featured}
            onChange={e => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Featured (hervorgehoben)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Aktiv (sichtbar)</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={saving || !formData.title}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Speichert...' : 'Speichern'}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <X className="w-4 h-4" />
          Abbrechen
        </button>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(emptyEvent);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    loadEvents();
  }, [navigate]);

  const loadEvents = async () => {
    setLoading(true);
    const { data, error } = await supabaseCms
      .from('website_events')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      setError('Fehler beim Laden: ' + error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    setSaving(true);
    setError('');
    const maxOrder = events.reduce((max, e) => Math.max(max, e.display_order), 0);
    const { error } = await supabaseCms
      .from('website_events')
      .insert({ ...formData, display_order: maxOrder + 1 });

    if (error) {
      setError('Fehler beim Erstellen: ' + error.message);
    } else {
      setFormData(emptyEvent);
      setShowAddForm(false);
      await loadEvents();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setSaving(true);
    setError('');
    const { error } = await supabaseCms
      .from('website_events')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', editingId);

    if (error) {
      setError('Fehler beim Speichern: ' + error.message);
    } else {
      setEditingId(null);
      await loadEvents();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Event wirklich löschen?')) return;
    const { error } = await supabaseCms.from('website_events').delete().eq('id', id);
    if (error) {
      setError('Fehler beim Löschen: ' + error.message);
    } else {
      await loadEvents();
    }
  };

  const toggleActive = async (event: WebsiteEvent) => {
    await supabaseCms
      .from('website_events')
      .update({ is_active: !event.is_active, updated_at: new Date().toISOString() })
      .eq('id', event.id);
    await loadEvents();
  };

  const toggleFeatured = async (event: WebsiteEvent) => {
    await supabaseCms
      .from('website_events')
      .update({ is_featured: !event.is_featured, updated_at: new Date().toISOString() })
      .eq('id', event.id);
    await loadEvents();
  };

  const moveEvent = async (event: WebsiteEvent, direction: 'up' | 'down') => {
    const idx = events.findIndex(e => e.id === event.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= events.length) return;

    const other = events[swapIdx];
    await supabaseCms.from('website_events').update({ display_order: other.display_order }).eq('id', event.id);
    await supabaseCms.from('website_events').update({ display_order: event.display_order }).eq('id', other.id);
    await loadEvents();
  };

  const startEdit = (event: WebsiteEvent) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      event_date: event.event_date,
      event_time: event.event_time,
      end_date: event.end_date,
      location: event.location,
      event_type: event.event_type,
      category: event.category,
      image_url: event.image_url,
      registration_link: event.registration_link,
      price_text: event.price_text,
      max_participants: event.max_participants,
      is_featured: event.is_featured,
      is_active: event.is_active,
      display_order: event.display_order,
    });
    setShowAddForm(false);
  };

  // EventForm is now a separate component above to prevent re-mounting on every keystroke

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-blue-600" />
              Events verwalten
            </h1>
            <p className="text-gray-500 mt-1">Erstelle und verwalte Veranstaltungen für die Website</p>
          </div>
          {!showAddForm && !editingId && (
            <button
              onClick={() => { setShowAddForm(true); setFormData(emptyEvent); setEditingId(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Neues Event
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-6">
            <EventForm formData={formData} setFormData={setFormData} error={error} saving={saving} onSave={handleAdd} onCancel={() => setShowAddForm(false)} isNew />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Laden...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Noch keine Events vorhanden</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
            >
              Erstes Event erstellen
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event, idx) => (
              <div key={event.id}>
                {editingId === event.id ? (
                  <EventForm
                    formData={formData}
                    setFormData={setFormData}
                    error={error}
                    saving={saving}
                    onSave={handleUpdate}
                    onCancel={() => setEditingId(null)}
                    isNew={false}
                  />
                ) : (
                  <div className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${!event.is_active ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {event.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                          <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            event.event_type === 'online' ? 'bg-green-100 text-green-700' :
                            event.event_type === 'offline' ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {EVENT_TYPES.find(t => t.value === event.event_type)?.label}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                            {CATEGORIES.find(c => c.value === event.category)?.label}
                          </span>
                        </div>
                        {event.subtitle && <p className="text-gray-600 text-sm mb-2">{event.subtitle}</p>}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {event.event_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(event.event_date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                          )}
                          {event.event_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {event.event_time}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {event.location}
                            </span>
                          )}
                          {event.max_participants && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              Max. {event.max_participants}
                            </span>
                          )}
                          {event.price_text && (
                            <span className="font-medium text-gray-700">{event.price_text}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-4">
                        <button onClick={() => moveEvent(event, 'up')} disabled={idx === 0}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Nach oben">
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button onClick={() => moveEvent(event, 'down')} disabled={idx === events.length - 1}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Nach unten">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleFeatured(event)}
                          className={`p-1.5 rounded hover:bg-gray-100 ${event.is_featured ? 'text-yellow-500' : 'text-gray-400'}`}
                          title={event.is_featured ? 'Featured entfernen' : 'Als Featured markieren'}>
                          <Star className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleActive(event)}
                          className="p-1.5 rounded hover:bg-gray-100" title={event.is_active ? 'Deaktivieren' : 'Aktivieren'}>
                          {event.is_active ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                        </button>
                        <button onClick={() => startEdit(event)}
                          className="p-1.5 rounded hover:bg-gray-100 text-blue-600" title="Bearbeiten">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(event.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-red-600" title="Löschen">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
