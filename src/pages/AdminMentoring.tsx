import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Plus, Edit2, Trash2, Eye, EyeOff, Star, Save, X, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminLayout from '../components/AdminLayout';
import { supabaseCms, type MentoringPackage } from '../lib/supabaseCms';

const COLOR_THEMES = [
  { value: 'gold', label: 'Gold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'navy', label: 'Navy', color: 'bg-blue-100 text-blue-800' },
  { value: 'blue', label: 'Blau', color: 'bg-sky-100 text-sky-800' },
  { value: 'green', label: 'Grün', color: 'bg-green-100 text-green-800' },
  { value: 'purple', label: 'Lila', color: 'bg-purple-100 text-purple-800' },
];

const emptyPackage = {
  name: '',
  slug: '',
  subtitle: '',
  description: '',
  features: [] as string[],
  price_text: '',
  duration_text: '',
  cta_text: 'Jetzt buchen',
  cta_link: '/termin-buchen',
  is_highlighted: false,
  is_active: true,
  display_order: 0,
  icon: 'star',
  color_theme: 'gold',
};

export default function AdminMentoring() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<MentoringPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(emptyPackage);
  const [newFeature, setNewFeature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    loadPackages();
  }, [navigate]);

  const loadPackages = async () => {
    setLoading(true);
    const { data, error } = await supabaseCms
      .from('mentoring_packages')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      setError('Fehler beim Laden: ' + error.message);
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleAdd = async () => {
    setSaving(true);
    setError('');
    const maxOrder = packages.reduce((max, p) => Math.max(max, p.display_order), 0);
    const slug = formData.slug || generateSlug(formData.name);
    const { error } = await supabaseCms
      .from('mentoring_packages')
      .insert({ ...formData, slug, display_order: maxOrder + 1 });

    if (error) {
      setError('Fehler: ' + error.message);
    } else {
      setFormData(emptyPackage);
      setShowAddForm(false);
      await loadPackages();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setSaving(true);
    setError('');
    const { error } = await supabaseCms
      .from('mentoring_packages')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', editingId);

    if (error) {
      setError('Fehler: ' + error.message);
    } else {
      setEditingId(null);
      await loadPackages();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Mentoring-Paket wirklich löschen?')) return;
    const { error } = await supabaseCms.from('mentoring_packages').delete().eq('id', id);
    if (error) {
      setError('Fehler: ' + error.message);
    } else {
      await loadPackages();
    }
  };

  const toggleActive = async (pkg: MentoringPackage) => {
    await supabaseCms.from('mentoring_packages')
      .update({ is_active: !pkg.is_active, updated_at: new Date().toISOString() })
      .eq('id', pkg.id);
    await loadPackages();
  };

  const toggleHighlighted = async (pkg: MentoringPackage) => {
    await supabaseCms.from('mentoring_packages')
      .update({ is_highlighted: !pkg.is_highlighted, updated_at: new Date().toISOString() })
      .eq('id', pkg.id);
    await loadPackages();
  };

  const movePackage = async (pkg: MentoringPackage, direction: 'up' | 'down') => {
    const idx = packages.findIndex(p => p.id === pkg.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= packages.length) return;
    const other = packages[swapIdx];
    await supabaseCms.from('mentoring_packages').update({ display_order: other.display_order }).eq('id', pkg.id);
    await supabaseCms.from('mentoring_packages').update({ display_order: pkg.display_order }).eq('id', other.id);
    await loadPackages();
  };

  const startEdit = (pkg: MentoringPackage) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      slug: pkg.slug,
      subtitle: pkg.subtitle,
      description: pkg.description,
      features: pkg.features || [],
      price_text: pkg.price_text,
      duration_text: pkg.duration_text,
      cta_text: pkg.cta_text,
      cta_link: pkg.cta_link,
      is_highlighted: pkg.is_highlighted,
      is_active: pkg.is_active,
      display_order: pkg.display_order,
      icon: pkg.icon,
      color_theme: pkg.color_theme,
    });
    setShowAddForm(false);
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const PackageForm = ({ onSave, onCancel, isNew }: { onSave: () => void; onCancel: () => void; isNew: boolean }) => (
    <div className={`p-6 rounded-xl border ${isNew ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'} space-y-4`}>
      <h3 className="font-bold text-lg">{isNew ? 'Neues Mentoring-Paket' : 'Paket bearbeiten'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => {
              setFormData({ ...formData, name: e.target.value, slug: isNew ? generateSlug(e.target.value) : formData.slug });
            }}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. Gold Mentoring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={e => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
            placeholder="mentoring-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="z.B. Dein persönliches Premium-Mentoring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Features / Leistungen</label>
        <div className="space-y-2 mb-2">
          {formData.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-300" />
              <span className="flex-1 text-sm bg-white px-3 py-1.5 rounded border">{feature}</span>
              <button onClick={() => removeFeature(idx)} className="p-1 text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={e => setNewFeature(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Neue Leistung hinzufügen..."
          />
          <button onClick={addFeature} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preis</label>
          <input
            type="text"
            value={formData.price_text}
            onChange={e => setFormData({ ...formData, price_text: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. Auf Anfrage / Ab 1.497€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dauer</label>
          <input
            type="text"
            value={formData.duration_text}
            onChange={e => setFormData({ ...formData, duration_text: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="z.B. 12 Wochen"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Farbthema</label>
          <select
            value={formData.color_theme}
            onChange={e => setFormData({ ...formData, color_theme: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {COLOR_THEMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button-Text</label>
          <input
            type="text"
            value={formData.cta_text}
            onChange={e => setFormData({ ...formData, cta_text: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button-Link</label>
          <input
            type="text"
            value={formData.cta_link}
            onChange={e => setFormData({ ...formData, cta_link: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_highlighted}
            onChange={e => setFormData({ ...formData, is_highlighted: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Hervorgehoben (empfohlen)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Aktiv (sichtbar)</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={saving || !formData.name}
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
              <Award className="w-7 h-7 text-yellow-600" />
              Mentoring-Pakete verwalten
            </h1>
            <p className="text-gray-500 mt-1">Erstelle und bearbeite Mentoring-Angebote</p>
          </div>
          {!showAddForm && !editingId && (
            <button
              onClick={() => { setShowAddForm(true); setFormData(emptyPackage); setEditingId(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Neues Paket
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-6">
            <PackageForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} isNew />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Laden...</div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Noch keine Mentoring-Pakete vorhanden</p>
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map((pkg, idx) => (
              <div key={pkg.id}>
                {editingId === pkg.id ? (
                  <PackageForm onSave={handleUpdate} onCancel={() => setEditingId(null)} isNew={false} />
                ) : (
                  <div className={`bg-white rounded-xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${
                    pkg.is_highlighted ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-200'
                  } ${!pkg.is_active ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {pkg.is_highlighted && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                          <h3 className="font-bold text-lg text-gray-800">{pkg.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            COLOR_THEMES.find(t => t.value === pkg.color_theme)?.color || 'bg-gray-100 text-gray-600'
                          }`}>
                            {pkg.color_theme}
                          </span>
                        </div>
                        {pkg.subtitle && <p className="text-gray-600 text-sm mb-2">{pkg.subtitle}</p>}
                        {pkg.description && <p className="text-gray-500 text-sm mb-3">{pkg.description}</p>}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(pkg.features || []).slice(0, 4).map((f, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {f}
                            </span>
                          ))}
                          {(pkg.features || []).length > 4 && (
                            <span className="text-xs text-gray-400">+{pkg.features.length - 4} weitere</span>
                          )}
                        </div>
                        <div className="flex gap-4 text-sm text-gray-500">
                          {pkg.price_text && <span className="font-medium text-gray-700">{pkg.price_text}</span>}
                          {pkg.duration_text && <span>{pkg.duration_text}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-4">
                        <button onClick={() => movePackage(pkg, 'up')} disabled={idx === 0}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Nach oben">
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button onClick={() => movePackage(pkg, 'down')} disabled={idx === packages.length - 1}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Nach unten">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleHighlighted(pkg)}
                          className={`p-1.5 rounded hover:bg-gray-100 ${pkg.is_highlighted ? 'text-yellow-500' : 'text-gray-400'}`}>
                          <Star className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleActive(pkg)}
                          className="p-1.5 rounded hover:bg-gray-100">
                          {pkg.is_active ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                        </button>
                        <button onClick={() => startEdit(pkg)}
                          className="p-1.5 rounded hover:bg-gray-100 text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pkg.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-red-600">
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
