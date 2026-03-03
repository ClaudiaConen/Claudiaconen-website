import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../lib/adminAuth';
import { supabase } from '../lib/supabase';
import AdminNavigation from '../components/AdminNavigation';
import { BookOpen, Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Home, ArrowLeft } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  lesson_count: number;
  course_id?: string | null;
}

export default function AdminMemberCourses() {
  const { courseId } = useParams<{ courseId?: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    loadModules();
    if (courseId) loadCourseName();
  }, [courseId]);

  const loadCourseName = async () => {
    if (!courseId) return;
    const { data } = await supabase
      .from('member_courses')
      .select('title')
      .eq('id', courseId)
      .maybeSingle();
    if (data) setCourseName(data.title);
  };

  const loadModules = async () => {
    try {
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden. Bitte melde dich erneut an.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=list-modules`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        console.error('API Error:', result);
        throw new Error(result.error || result.details || 'Fehler beim Laden');
      }

      let data: Module[] = result.data || [];
      if (courseId) {
        data = data.filter((m: Module) => m.course_id === courseId);
      }

      setModules(data);
    } catch (error: any) {
      console.error('Error loading modules:', error);
      alert(`Fehler beim Laden der Module: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteModule = async (moduleId: string, moduleTitle: string) => {
    if (!confirm(`Modul "${moduleTitle}" wirklich loeschen? Alle zugehoerigen Lektionen, Quizze und Flashcards werden ebenfalls geloescht.`)) return;

    try {
      const adminToken = getToken();
      if (!adminToken) {
        alert('Keine Authentifizierung gefunden. Bitte melde dich erneut an.');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=delete-module`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: moduleId }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Fehler beim Loeschen');

      await loadModules();
    } catch (error: any) {
      console.error('Error deleting module:', error);
      alert(`Fehler beim Loeschen: ${error.message}`);
    }
  };

  const togglePublish = async (moduleId: string, currentStatus: boolean) => {
    try {
      const adminToken = getToken();
      if (!adminToken) {
        alert('Keine Authentifizierung gefunden. Bitte melde dich erneut an.');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=update-module`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: moduleId,
            is_published: !currentStatus,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Fehler beim Ändern des Status');

      await loadModules();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Fehler beim Ändern des Status');
    }
  };

  const newModuleLink = courseId
    ? `/admin/member-kurse/modul/new?courseId=${courseId}`
    : '/admin/member-kurse/modul/new';

  const pageTitle = courseId && courseName
    ? `Module: ${courseName}`
    : 'KI-Manager Kurse';

  const pageDescription = courseId
    ? 'Verwalte die Module dieses Kurses'
    : 'Verwalte Module, Lektionen und Inhalte';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {courseId && (
          <Link
            to="/admin/member-courses-list"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Kursübersicht
          </Link>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </div>

          <div className="flex items-center space-x-3">
            {!courseId && (
              <>
                <Link
                  to="/admin/willkommen"
                  className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition"
                >
                  <Home className="w-5 h-5" />
                  <span>Willkommensbereich</span>
                </Link>

                <Link
                  to="/member/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live-Vorschau</span>
                </Link>
              </>
            )}

            <Link
              to={newModuleLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Neues Modul</span>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Noch keine Module</h3>
            <p className="text-gray-600 mb-6">
              {courseId ? 'Erstelle das erste Modul für diesen Kurs' : 'Erstelle dein erstes Modul für die KI-Manager Ausbildung'}
            </p>
            <Link
              to={newModuleLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Erstes Modul erstellen</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lektionen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Erstellt
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modules.map((mod) => (
                  <tr key={mod.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{mod.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {mod.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{mod.lesson_count} Lektionen</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mod.is_published ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Veröffentlicht
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Entwurf
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(mod.created_at).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => togglePublish(mod.id, mod.is_published)}
                          className="text-blue-600 hover:text-blue-900 transition"
                        >
                          {mod.is_published ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <Link
                          to={`/admin/member-kurse/modul/${mod.id}`}
                          className="text-blue-600 hover:text-blue-900 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => deleteModule(mod.id, mod.title)}
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
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">Hinweis zur Struktur</h3>
          <p className="text-blue-800 text-sm mb-3">
            Ein <strong>Modul</strong> ist eine thematische Einheit (z.B. "Grundlagen der KI").
            Jedes Modul enthält mehrere <strong>Lektionen</strong> mit Videos, Texten und Downloads.
            Teilnehmer können Quizze absolvieren und Flashcards lernen.
          </p>
          <p className="text-blue-800 text-sm">
            Möchtest du sehen, wie die Kurse für Studenten aussehen? Klicke auf{' '}
            <Link
              to="/member/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:text-blue-900 transition"
            >
              Live-Vorschau
            </Link>{' '}
            oben, um die Student-Ansicht in einem neuen Tab zu öffnen.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
