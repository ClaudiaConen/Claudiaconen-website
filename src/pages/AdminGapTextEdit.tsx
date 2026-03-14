import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApiCall } from '../lib/adminApi';
import AdminNavigation from '../components/AdminNavigation';
import GapTextEditor, { GapTextEditorData } from '../components/GapTextEditor';
import { AlignLeft, Loader2, Save, ArrowLeft } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  lesson_number: number | null;
  module_id: string;
  module_title: string;
}

const EMPTY_GAP_TEXT: GapTextEditorData = { template: '', correct_answers: [], word_bank: [] };

export default function AdminGapTextEdit() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const isNew = !lessonId;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState(lessonId || '');
  const [gapTextData, setGapTextData] = useState<GapTextEditorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [lessonId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const lessonsResult = await adminApiCall('get-all-lessons', 'GET');
      setLessons(lessonsResult.data || []);

      if (!isNew && lessonId) {
        const result = await adminApiCall(`get-gap-text&lessonId=${lessonId}`, 'GET');
        if (result.data) {
          setGapTextData({
            template: result.data.template,
            correct_answers: result.data.correct_answers,
            word_bank: result.data.word_bank,
          });
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const effectiveLessonId = isNew ? selectedLessonId : lessonId;
    if (!effectiveLessonId) {
      setError('Bitte eine Lektion auswählen.');
      return;
    }
    if (!gapTextData || !gapTextData.template.trim()) {
      setError('Bitte einen Text mit Lücken eingeben.');
      return;
    }
    if (gapTextData.correct_answers.some(a => !a.trim())) {
      setError('Bitte alle Lücken mit richtigen Antworten füllen.');
      return;
    }
    if (gapTextData.correct_answers.length === 0) {
      setError('Der Text enthält keine Lücken ([gap]). Bitte mindestens eine einfügen.');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      await adminApiCall('save-gap-text', 'POST', {
        lessonId: effectiveLessonId,
        template: gapTextData.template,
        correct_answers: gapTextData.correct_answers,
        word_bank: gapTextData.word_bank,
      });
      setSuccessMessage('Lückentext gespeichert!');
      setTimeout(() => {
        navigate('/admin/member-lückentexte');
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Group lessons by module for the dropdown
  const lessonsByModule = lessons.reduce((acc, lesson) => {
    const key = lesson.module_title || 'Kein Modul';
    if (!acc[key]) acc[key] = [];
    acc[key].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const selectedLesson = lessons.find(l => l.id === (isNew ? selectedLessonId : lessonId));

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-6">
            <Link
              to="/admin/member-lückentexte"
              className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <AlignLeft className="w-7 h-7 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Neuer Lückentext' : 'Lückentext bearbeiten'}
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Lesson selector */}
              {isNew ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lektion auswählen *
                  </label>
                  <select
                    value={selectedLessonId}
                    onChange={e => setSelectedLessonId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">-- Lektion wählen --</option>
                    {Object.entries(lessonsByModule).map(([moduleName, moduleLessons]) => (
                      <optgroup key={moduleName} label={moduleName}>
                        {moduleLessons.map(lesson => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.lesson_number != null ? `L${lesson.lesson_number} – ` : ''}{lesson.title}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <span className="font-medium">Lektion: </span>
                  {selectedLesson ? (
                    <>
                      {selectedLesson.lesson_number != null ? `L${selectedLesson.lesson_number} – ` : ''}
                      {selectedLesson.title}
                      {' '}
                      <span className="text-gray-400">({selectedLesson.module_title})</span>
                    </>
                  ) : (
                    'Lektion wird geladen...'
                  )}
                </div>
              )}

              {/* Gap text editor */}
              <GapTextEditor
                key={isNew ? 'new' : lessonId}
                initialData={isNew ? EMPTY_GAP_TEXT : (gapTextData ?? null)}
                onChange={setGapTextData}
              />

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <Link
                  to="/admin/member-lückentexte"
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                >
                  Abbrechen
                </Link>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
