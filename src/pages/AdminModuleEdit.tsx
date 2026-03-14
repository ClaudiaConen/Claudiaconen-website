import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import MediaUploader from '../components/MediaUploader';
import { Save, ArrowLeft, Loader2, Trash2, Plus, Edit, QrCode } from 'lucide-react';

interface Module {
  id: string;
  module_number: number;
  title: string;
  description: string;
  difficulty: string;
  estimated_duration_minutes: number;
  xp_reward: number;
  is_locked: boolean;
  order_index: number;
  is_published: boolean;
  thumbnail_url?: string | null;
  audio_url?: string | null;
  module_quiz_id?: string | null;
  bonus_page_enabled?: boolean;
  qr_code_data?: string | null;
  course_id?: string | null;
}

interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  order_index: number;
  is_published: boolean;
}

export default function AdminModuleEdit() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = moduleId === 'new';
  const courseIdFromQuery = searchParams.get('courseId');

  const [module, setModule] = useState<Module>({
    id: '',
    module_number: 1,
    title: '',
    description: '',
    difficulty: 'Einsteiger',
    estimated_duration_minutes: 60,
    xp_reward: 500,
    is_locked: false,
    order_index: 0,
    is_published: false,
    thumbnail_url: null,
    audio_url: null,
    module_quiz_id: null,
    bonus_page_enabled: false,
    qr_code_data: null,
    course_id: courseIdFromQuery || null,
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [availableQuizzes, setAvailableQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadAvailableQuizzes();
    if (!isNew && moduleId) {
      loadModule();
      loadLessons();
    } else if (isNew) {
      loadNextModuleNumber();
    }
  }, [moduleId]);

  const loadNextModuleNumber = async () => {
    try {
      const { data, error } = await supabase
        .from('member_course_modules')
        .select('module_number')
        .order('module_number', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      const nextNumber = data ? data.module_number + 1 : 1;
      setModule(prev => ({ ...prev, module_number: nextNumber, order_index: nextNumber }));
    } catch (error) {
      console.error('Error loading next module number:', error);
    }
  };

  const loadModule = async () => {
    try {
      const adminToken = getToken();

      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=get-module&id=${moduleId}`,
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
        throw new Error(result.error || 'Fehler beim Laden');
      }

      setModule(result.module);
    } catch (error: any) {
      console.error('Error loading module:', error);
      alert(`Fehler beim Laden des Moduls: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLessons = async () => {
    try {
      const adminToken = getToken();

      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=get-lessons&moduleId=${moduleId}`,
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
        throw new Error(result.error || 'Fehler beim Laden der Lektionen');
      }

      setLessons(result.data || []);
    } catch (error: any) {
      console.error('Error loading lessons:', error);
    }
  };

  const loadAvailableQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('member_quizzes')
        .select('id, title')
        .order('title', { ascending: true });

      if (error) throw error;
      setAvailableQuizzes(data || []);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  };

  const handleSave = async () => {
    if (!module.title || !module.description) {
      alert('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    if (module.module_number < 1 || module.module_number > 99) {
      alert('Modulnummer muss zwischen 1 und 99 liegen');
      return;
    }

    setIsSaving(true);
    try {
      const adminToken = getToken();

      if (isNew) {
        const { id, ...moduleData } = module;

        // Check if module_number already exists
        const { data: existingModule } = await supabase
          .from('member_course_modules')
          .select('id')
          .eq('module_number', module.module_number)
          .maybeSingle();

        if (existingModule) {
          alert(`Modulnummer ${module.module_number} existiert bereits. Bitte lade die Seite neu, um die nächste verfügbare Nummer zu erhalten.`);
          setIsSaving(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=create-module`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(moduleData),
          }
        );

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Fehler beim Erstellen');

        alert('Modul erfolgreich erstellt!');
        navigate(`/admin/member-kurse/modul/${result.data.id}`);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=update-module`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(module),
          }
        );

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Fehler beim Speichern');

        alert('Modul erfolgreich gespeichert!');
      }
    } catch (error: any) {
      console.error('Error saving module:', error);
      const errorMessage = error?.message || error?.details || 'Unbekannter Fehler';
      alert(`Fehler beim Speichern: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Mochtest du dieses Modul wirklich loschen?')) return;

    try {
      const adminToken = getToken();

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
      if (!response.ok) throw new Error(result.error || 'Fehler beim Loschen');

      navigate('/admin/member-kurse');
    } catch (error: any) {
      console.error('Error deleting module:', error);
      alert(`Fehler beim Loschen: ${error?.message || 'Unbekannter Fehler'}`);
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
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Neues Modul erstellen' : 'Modul bearbeiten'}
            </h1>

            <div className="flex items-center space-x-3">
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

              {!isNew && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Löschen</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modulnummer *
              </label>
              <input
                type="number"
                value={module.module_number}
                onChange={(e) =>
                  setModule({ ...module, module_number: parseInt(e.target.value, 10) })
                }
                disabled={isNew}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                min="1"
                max="99"
              />
              {isNew && (
                <p className="text-xs text-gray-500 mt-1">
                  Die Modulnummer wird automatisch vergeben
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sortierung
              </label>
              <input
                type="number"
                value={module.order_index}
                onChange={(e) =>
                  setModule({ ...module, order_index: parseInt(e.target.value, 10) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                value={module.title}
                onChange={(e) => setModule({ ...module, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="z.B. Grundlagen der KI"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung *
              </label>
              <textarea
                value={module.description}
                onChange={(e) => setModule({ ...module, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Beschreibe den Inhalt dieses Moduls..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schwierigkeit
              </label>
              <select
                value={module.difficulty}
                onChange={(e) => setModule({ ...module, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="Einsteiger">Einsteiger</option>
                <option value="Fortgeschritten">Fortgeschritten</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geschätzte Dauer (Minuten)
              </label>
              <input
                type="number"
                value={module.estimated_duration_minutes}
                onChange={(e) =>
                  setModule({
                    ...module,
                    estimated_duration_minutes: parseInt(e.target.value, 10),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XP Belohnung
              </label>
              <input
                type="number"
                value={module.xp_reward}
                onChange={(e) =>
                  setModule({ ...module, xp_reward: parseInt(e.target.value, 10) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                min="0"
              />
            </div>

            <div className="md:col-span-2">
              <MediaUploader
                bucket="member-modules"
                folder="infographics"
                fileType="image"
                label="Infografik"
                currentUrl={module.thumbnail_url || ''}
                onUploadComplete={(url) =>
                  setModule({ ...module, thumbnail_url: url })
                }
              />
            </div>

            <div className="md:col-span-2">
              <MediaUploader
                bucket="course-media"
                folder="module-audio"
                fileType="audio"
                maxSizeMB={200}
                label="Audio / Podcast"
                currentUrl={module.audio_url || ''}
                onUploadComplete={(url) =>
                  setModule({ ...module, audio_url: url })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modul-Abschluss-Quiz (verpflichtend)
              </label>
              <select
                value={module.module_quiz_id || ''}
                onChange={(e) =>
                  setModule({ ...module, module_quiz_id: e.target.value || null })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Kein Quiz</option>
                {availableQuizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Teilnehmer müssen dieses Quiz bestehen, um das nächste Modul freizuschalten
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={module.is_locked}
                  onChange={(e) =>
                    setModule({ ...module, is_locked: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Modul gesperrt</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={module.is_published}
                  onChange={(e) =>
                    setModule({ ...module, is_published: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Veröffentlicht</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={module.bonus_page_enabled || false}
                  onChange={(e) =>
                    setModule({ ...module, bonus_page_enabled: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Bonus-Seite aktiviert</span>
              </label>
            </div>
          </div>

          {!isNew && module.bonus_page_enabled && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-blue-900 flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>QR-Code & Bonus-Inhalte</span>
                  </h3>
                  <p className="text-sm text-blue-800 mt-1">
                    Erstelle Bonus-Inhalte und generiere einen QR-Code für dieses Modul
                  </p>
                </div>
                <Link
                  to={`/admin/member-kurse/modul/${moduleId}/bonus`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                >
                  <Edit className="w-5 h-5" />
                  <span>Bonus-Inhalte verwalten</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {!isNew && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Lektionen</h2>
              <Link
                to={`/admin/member-kurse/modul/${moduleId}/lektion/new`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Neue Lektion</span>
              </Link>
            </div>

            {lessons.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Noch keine Lektionen vorhanden
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">
                        Lektion {lesson.lesson_number} • Reihenfolge: {lesson.order_index}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {lesson.is_published ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Veröffentlicht
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          Entwurf
                        </span>
                      )}

                      <Link
                        to={`/admin/member-kurse/modul/${moduleId}/lektion/${lesson.id}`}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
