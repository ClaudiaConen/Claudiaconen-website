import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Edit2, Trash2, Save, X, Search, Filter } from 'lucide-react';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminLayout from '../components/AdminLayout';
import { supabaseCms, type SiteContent } from '../lib/supabaseCms';

const PAGE_OPTIONS = [
  { value: 'home', label: 'Startseite' },
  { value: 'ueber-mich', label: 'Über Mich' },
  { value: 'mentoring-gold', label: 'Mentoring Gold' },
  { value: 'mentoring-transformation', label: 'Mentoring Transformation' },
  { value: 'mentoring-online', label: 'Mentoring Online' },
  { value: 'unternehmen-keynotes', label: 'Unternehmen Keynotes' },
  { value: 'unternehmen-events', label: 'Unternehmen Events' },
  { value: 'unternehmen-leadership', label: 'Unternehmen Leadership' },
  { value: 'unternehmen-selling', label: 'Unternehmen Selling' },
  { value: 'speaker-positionierung', label: 'Speaker Positionierung' },
  { value: 'speaker-storytelling', label: 'Speaker Storytelling' },
  { value: 'speaker-buehne', label: 'Speaker Bühne' },
  { value: 'speaker-social', label: 'Speaker Social' },
  { value: 'speaker-training', label: 'Speaker Training' },
  { value: 'ki-manager-ausbildung', label: 'KI-Manager Ausbildung' },
  { value: 'blog', label: 'Blog' },
  { value: 'wissensbibliothek', label: 'Wissensbibliothek' },
  { value: 'global', label: 'Global (alle Seiten)' },
];

const SECTION_PRESETS = [
  'title', 'subtitle', 'intro-text', 'description', 'cta-text', 'cta-link',
  'hero-headline', 'hero-subline', 'section-1-title', 'section-1-text',
  'section-2-title', 'section-2-text', 'footer-text', 'meta-description',
];

const emptyContent = {
  page_slug: '',
  section_key: '',
  content: '',
  content_type: 'text' as const,
  label: '',
  is_active: true,
};

export default function AdminSiteContent() {
  const navigate = useNavigate();
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(emptyContent);
  const [error, setError] = useState('');
  const [filterPage, setFilterPage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    loadContents();
  }, [navigate]);

  const loadContents = async () => {
    setLoading(true);
    const { data, error } = await supabaseCms
      .from('site_content')
      .select('*')
      .order('page_slug', { ascending: true })
      .order('section_key', { ascending: true });

    if (error) {
      setError('Fehler beim Laden: ' + error.message);
    } else {
      setContents(data || []);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    setSaving(true);
    setError('');
    const { error } = await supabaseCms.from('site_content').insert(formData);
    if (error) {
      if (error.message.includes('unique') || error.message.includes('duplicate')) {
        setError('Diese Kombination aus Seite und Bereich existiert bereits.');
      } else {
        setError('Fehler: ' + error.message);
      }
    } else {
      setFormData(emptyContent);
      setShowAddForm(false);
      await loadContents();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setSaving(true);
    setError('');
    const { error } = await supabaseCms
      .from('site_content')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', editingId);

    if (error) {
      setError('Fehler: ' + error.message);
    } else {
      setEditingId(null);
      await loadContents();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Inhalt wirklich löschen?')) return;
    const { error } = await supabaseCms.from('site_content').delete().eq('id', id);
    if (error) {
      setError('Fehler: ' + error.message);
    } else {
      await loadContents();
    }
  };

  const startEdit = (item: SiteContent) => {
    setEditingId(item.id);
    setFormData({
      page_slug: item.page_slug,
      section_key: item.section_key,
      content: item.content,
      content_type: item.content_type,
      label: item.label,
      is_active: item.is_active,
    });
    setShowAddForm(false);
  };

  const filteredContents = contents.filter(c => {
    if (filterPage && c.page_slug !== filterPage) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.content.toLowerCase().includes(q) ||
             c.label.toLowerCase().includes(q) ||
             c.section_key.toLowerCase().includes(q) ||
             c.page_slug.toLowerCase().includes(q);
    }
    return true;
  });

  // Group by page
  const groupedContents = filteredContents.reduce((acc, item) => {
    if (!acc[item.page_slug]) acc[item.page_slug] = [];
    acc[item.page_slug].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  const ContentForm = ({ onSave, onCancel, isNew }: { onSave: () => void; onCancel: () => void; isNew: boolean }) => (
    <div className={`p-6 rounded-xl border ${isNew ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'} space-y-4`}>
      <h3 className="font-bold text-lg">{isNew ? 'Neuen Inhalt erstellen' : 'Inhalt bearbeiten'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seite *</label>
          <select
            value={formData.page_slug}
            onChange={e => setFormData({ ...formData, page_slug: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seite wählen...</option>
            {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          {!PAGE_OPTIONS.find(p => p.value === formData.page_slug) && formData.page_slug && (
            <input
              type="text"
              value={formData.page_slug}
              onChange={e => setFormData({ ...formData, page_slug: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Eigenen Slug eingeben..."
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bereich / Key *</label>
          <input
            type="text"
            value={formData.section_key}
            onChange={e => setFormData({ ...formData, section_key: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. hero-headline"
            list="section-presets"
          />
          <datalist id="section-presets">
            {SECTION_PRESETS.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label (Anzeigename)</label>
          <input
            type="text"
            value={formData.label}
            onChange={e => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. Hauptüberschrift"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Inhalt</label>
        <textarea
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={formData.content_type === 'richtext' ? 8 : 4}
          placeholder="Text eingeben..."
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Typ:</label>
        {['text', 'richtext', 'json'].map(type => (
          <label key={type} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              checked={formData.content_type === type}
              onChange={() => setFormData({ ...formData, content_type: type as any })}
              className="w-4 h-4"
            />
            <span className="text-sm capitalize">{type === 'richtext' ? 'Rich Text' : type === 'json' ? 'JSON' : 'Text'}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={saving || !formData.page_slug || !formData.section_key}
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

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-7 h-7 text-indigo-600" />
              Seiteninhalte bearbeiten
            </h1>
            <p className="text-gray-500 mt-1">Texte, Headlines und Beschreibungen auf allen Seiten bearbeiten</p>
          </div>
          {!showAddForm && !editingId && (
            <button
              onClick={() => { setShowAddForm(true); setFormData(emptyContent); setEditingId(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Neuer Inhalt
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Suchen..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterPage}
              onChange={e => setFilterPage(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Alle Seiten</option>
              {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6">
            <ContentForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} isNew />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Laden...</div>
        ) : filteredContents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {contents.length === 0
                ? 'Noch keine Inhalte vorhanden. Erstelle deinen ersten editierbaren Textblock!'
                : 'Keine Ergebnisse für diese Filter.'}
            </p>
            {contents.length === 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
              >
                Ersten Inhalt erstellen
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedContents).map(([pageSlug, items]) => (
              <div key={pageSlug} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b">
                  <h2 className="font-semibold text-gray-700">
                    {PAGE_OPTIONS.find(p => p.value === pageSlug)?.label || pageSlug}
                  </h2>
                </div>
                <div className="divide-y">
                  {items.map(item => (
                    <div key={item.id}>
                      {editingId === item.id ? (
                        <div className="p-4">
                          <ContentForm onSave={handleUpdate} onCancel={() => setEditingId(null)} isNew={false} />
                        </div>
                      ) : (
                        <div className={`px-5 py-3 flex items-start gap-4 hover:bg-gray-50 transition-colors ${!item.is_active ? 'opacity-50' : ''}`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {item.section_key}
                              </span>
                              {item.label && (
                                <span className="text-xs text-gray-500">{item.label}</span>
                              )}
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                item.content_type === 'richtext' ? 'bg-purple-100 text-purple-700' :
                                item.content_type === 'json' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {item.content_type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 truncate max-w-xl">
                              {item.content || <span className="text-gray-400 italic">Leer</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => startEdit(item)}
                              className="p-1.5 rounded hover:bg-gray-200 text-blue-600" title="Bearbeiten">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded hover:bg-gray-200 text-red-600" title="Löschen">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick-Add Info */}
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h3 className="font-medium text-indigo-800 mb-2">So funktioniert es:</h3>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>1. Wähle eine Seite und einen Bereich (z.B. "hero-headline")</li>
            <li>2. Gib den gewünschten Text ein</li>
            <li>3. Speichern - der Text wird sofort auf der Website aktualisiert</li>
            <li>4. Du kannst beliebig viele Textblöcke pro Seite erstellen</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
