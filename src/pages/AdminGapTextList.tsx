import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApiCall } from '../lib/adminApi';
import AdminNavigation from '../components/AdminNavigation';
import {
  AlignLeft,
  Pencil,
  Trash2,
  Loader2,
  Search,
  BookOpen,
  Plus,
} from 'lucide-react';

interface GapTextDetailed {
  id: string;
  lesson_id: string;
  template: string;
  correct_answers: string[];
  word_bank: string[];
  created_at: string;
  updated_at: string;
  lesson_title: string | null;
  lesson_number: number | null;
  module_title: string;
  module_id: string;
}

export default function AdminGapTextList() {
  const [gapTexts, setGapTexts] = useState<GapTextDetailed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await adminApiCall('get-all-gap-texts', 'GET');
      setGapTexts(result.data || []);
    } catch (error: any) {
      console.error('Error loading gap texts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, lessonId: string, lessonTitle: string | null) => {
    if (!confirm(`Lückentext für "${lessonTitle || 'diese Lektion'}" wirklich löschen?`)) return;
    try {
      await adminApiCall('delete-gap-text', 'POST', { lessonId });
      setGapTexts(gapTexts.filter(g => g.id !== id));
    } catch (error: any) {
      alert(`Fehler: ${error.message}`);
    }
  };

  const filtered = gapTexts.filter(g => {
    const q = search.toLowerCase();
    return (
      (g.lesson_title || '').toLowerCase().includes(q) ||
      g.module_title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <AlignLeft className="w-7 h-7 text-teal-600" />
              <h1 className="text-3xl font-bold text-gray-900">Lückentexte</h1>
            </div>
            <Link
              to="/admin/member-lückentexte/neu"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Neuer Lückentext
            </Link>
          </div>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Lektion oder Modul suchen..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
              {search ? 'Keine Lückentexte gefunden.' : 'Noch keine Lückentexte vorhanden.'}
              {!search && (
                <div className="mt-4">
                  <Link
                    to="/admin/member-lückentexte/neu"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Ersten Lückentext erstellen
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Lektion</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Modul</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Lücken</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(g => (
                    <tr key={g.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {g.lesson_number != null ? `L${g.lesson_number} – ` : ''}{g.lesson_title || '–'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <BookOpen className="w-4 h-4" />
                          <span>{g.module_title || '–'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {g.correct_answers.length}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end space-x-2">
                          {g.lesson_id && (
                            <Link
                              to={`/admin/member-lückentexte/bearbeiten/${g.lesson_id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-xs font-medium"
                              title="Lückentext bearbeiten"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Bearbeiten</span>
                            </Link>
                          )}
                          <button
                            onClick={() => handleDelete(g.id, g.lesson_id, g.lesson_title)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-medium"
                            title="Lückentext löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
                {filtered.length} Lückentext{filtered.length !== 1 ? 'e' : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
