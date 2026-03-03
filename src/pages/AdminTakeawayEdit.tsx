import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { adminApiCall } from '../lib/adminApi';
import AdminNavigation from '../components/AdminNavigation';
import {
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';

interface Takeaway {
  id: string;
  lesson_id: string | null;
  title: string;
  description: string;
  xp_reward: number;
}

interface TakeawayItem {
  id?: string;
  content: string;
  icon: string;
  order_index: number;
}

export default function AdminTakeawayEdit() {
  const { takeawayId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = takeawayId === 'new';
  const lessonIdFromParam = searchParams.get('lessonId');

  const [takeaway, setTakeaway] = useState<Takeaway>({
    id: '',
    lesson_id: lessonIdFromParam !== 'new' ? lessonIdFromParam : null,
    title: '',
    description: '',
    xp_reward: 50,
  });

  const [items, setItems] = useState<TakeawayItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isNew && takeawayId) {
      loadTakeaway();
    }
  }, [takeawayId]);

  const loadTakeaway = async () => {
    try {
      const result = await adminApiCall(`get-takeaway&id=${takeawayId}`, 'GET');
      const { takeaway: data, items: itemsData } = result.data;
      setTakeaway(data);
      setItems(itemsData || []);
      setExpandedItems((itemsData || []).map((_: any, i: number) => i));
    } catch (error: any) {
      console.error('Error loading takeaway:', error);
      alert(`Fehler beim Laden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!takeaway.title) {
      alert('Bitte gib einen Titel ein');
      return;
    }
    if (items.length === 0) {
      alert('Bitte fuge mindestens einen Takeaway-Punkt hinzu');
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (!items[i].content.trim()) {
        alert(`Punkt ${i + 1}: Inhalt darf nicht leer sein`);
        return;
      }
    }

    setIsSaving(true);
    try {
      let savedId = takeawayId;
      const payload = {
        lesson_id: takeaway.lesson_id,
        title: takeaway.title,
        description: takeaway.description,
        xp_reward: takeaway.xp_reward,
      };

      if (isNew) {
        const result = await adminApiCall('create-takeaway', 'POST', payload);
        savedId = result.data.id;
      } else {
        await adminApiCall('update-takeaway', 'POST', { id: takeawayId, ...payload });
      }

      await adminApiCall('save-takeaway-items', 'POST', { takeawayId: savedId, items });

      if (isNew) {
        navigate(`/admin/member-kurse/takeaway/${savedId}`);
      } else {
        alert('Takeaway erfolgreich gespeichert');
        loadTakeaway();
      }
    } catch (error: any) {
      alert(`Fehler beim Speichern: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Dieses Takeaway wirklich loschen?')) return;
    try {
      await adminApiCall('delete-takeaway', 'POST', { id: takeawayId });
      navigate('/admin/member-takeaways');
    } catch (error: any) {
      alert(`Fehler beim Loschen: ${error.message}`);
    }
  };

  const addItem = () => {
    setItems([...items, { content: '', icon: '', order_index: items.length }]);
    setExpandedItems([...expandedItems, items.length]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setExpandedItems(expandedItems.filter(i => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(i => i !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
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
              to="/admin/member-takeaways"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zuruck zur Takeaway-Ubersicht</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-amber-500" />
                {isNew ? 'Neues Takeaway erstellen' : 'Takeaway bearbeiten'}
              </h1>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Speichern...</span></>
                  ) : (
                    <><Save className="w-5 h-5" /><span>Speichern</span></>
                  )}
                </button>
                {!isNew && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                  >
                    <Trash2 className="w-5 h-5" /><span>Loschen</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={takeaway.title}
                  onChange={(e) => setTakeaway({ ...takeaway, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="z.B. Die 5 wichtigsten Erkenntnisse"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                <textarea
                  value={takeaway.description}
                  onChange={(e) => setTakeaway({ ...takeaway, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Optionale Beschreibung..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">XP Belohnung</label>
                <input
                  type="number"
                  value={takeaway.xp_reward}
                  onChange={(e) => setTakeaway({ ...takeaway, xp_reward: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Takeaway-Punkte</h2>
              <button
                onClick={addItem}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
              >
                <Plus className="w-5 h-5" /><span>Punkt hinzufugen</span>
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Noch keine Takeaway-Punkte vorhanden</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div
                      className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleItem(index)}
                    >
                      <h3 className="font-medium text-gray-900">
                        Punkt {index + 1}
                        {item.content && `: ${item.content.substring(0, 60)}...`}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); removeItem(index); }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {expandedItems.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>

                    {expandedItems.includes(index) && (
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Inhalt *</label>
                          <textarea
                            value={item.content}
                            onChange={(e) => updateItem(index, 'content', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Die wichtigste Erkenntnis..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon (optional)</label>
                          <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => updateItem(index, 'icon', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="z.B. lightbulb, star, check"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
