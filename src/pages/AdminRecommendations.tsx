import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminNavigation from '../components/AdminNavigation';
import MediaUploader from '../components/MediaUploader';
import {
  Save,
  Loader2,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recommendation {
  id: string;
  name: string;
  description: string | null;
  affiliate_link: string | null;
  logo_url: string | null;
  category: string;
  is_active: boolean;
  order_index: number;
}

export default function AdminRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Recommendation>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('course_recommendations')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      alert('Fehler beim Laden der Empfehlungen');
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (recommendation: Recommendation) => {
    setEditingId(recommendation.id);
    setEditForm(recommendation);
  };

  const startNew = () => {
    setEditingId('new');
    setEditForm({
      name: '',
      description: '',
      affiliate_link: '',
      logo_url: '',
      category: 'Software',
      is_active: true,
      order_index: recommendations.length,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.name) {
      alert('Bitte gib einen Namen ein');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId === 'new') {
        const { error } = await supabase
          .from('course_recommendations')
          .insert([editForm]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('course_recommendations')
          .update(editForm)
          .eq('id', editingId);

        if (error) throw error;
      }

      await loadRecommendations();
      cancelEdit();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      alert('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchtest du diese Empfehlung wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('course_recommendations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadRecommendations();
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      alert('Fehler beim Löschen');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('course_recommendations')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await loadRecommendations();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Fehler beim Ändern des Status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/admin/member-kurse"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kursübersicht</span>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Empfehlungen & Affiliate-Links
            </h1>
            <p className="text-gray-600">
              Verwalte Tool- und Produktempfehlungen für deinen Kurs
            </p>
          </div>

          {!editingId && (
            <button
              onClick={startNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Neue Empfehlung</span>
            </button>
          )}
        </div>

        {editingId && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId === 'new' ? 'Neue Empfehlung erstellen' : 'Empfehlung bearbeiten'}
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="z.B. ChatGPT Plus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategorie
                  </label>
                  <select
                    value={editForm.category || 'Software'}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Software">Software</option>
                    <option value="Tool">Tool</option>
                    <option value="Kurs">Kurs</option>
                    <option value="Buch">Buch</option>
                    <option value="Service">Service</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Beschreibe das Tool oder Produkt..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliate-Link / URL
                </label>
                <input
                  type="url"
                  value={editForm.affiliate_link || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm, affiliate_link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <MediaUploader
                bucket="course-media"
                folder="recommendations"
                fileType="image"
                label="Logo / Bild"
                currentUrl={editForm.logo_url || ''}
                onUploadComplete={(url) => setEditForm({ ...editForm, logo_url: url })}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editForm.is_active || false}
                  onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">Aktiv</label>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Speichern...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Speichern</span>
                    </>
                  )}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {recommendations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">Noch keine Empfehlungen vorhanden</p>
              <button
                onClick={startNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Erste Empfehlung erstellen
              </button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empfehlung
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendations.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {rec.logo_url && (
                          <img
                            src={rec.logo_url}
                            alt={rec.name}
                            className="w-10 h-10 object-contain rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{rec.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {rec.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {rec.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rec.is_active ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Aktiv
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inaktiv
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {rec.affiliate_link && (
                          <a
                            href={rec.affiliate_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        <button
                          onClick={() => toggleActive(rec.id, rec.is_active)}
                          className="text-blue-600 hover:text-blue-900 transition"
                        >
                          {rec.is_active ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => startEdit(rec)}
                          className="text-blue-600 hover:text-blue-900 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="text-red-600 hover:text-red-900 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
