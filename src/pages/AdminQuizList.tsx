import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApiCall } from '../lib/adminApi';
import AdminNavigation from '../components/AdminNavigation';
import {
  Brain,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Link as LinkIcon,
  Unlink,
  BookOpen,
} from 'lucide-react';

interface QuizDetailed {
  id: string;
  title: string;
  description: string;
  lesson_id: string | null;
  passing_score: number;
  xp_reward: number;
  created_at: string;
  question_count: number;
  lesson_title: string | null;
  module_name: string | null;
  module_id: string | null;
}

interface LessonOption {
  id: string;
  title: string;
  module_id: string;
  module_title: string;
  lesson_number: number;
}

export default function AdminQuizList() {
  const [quizzes, setQuizzes] = useState<QuizDetailed[]>([]);
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [quizResult, lessonResult] = await Promise.all([
        adminApiCall('get-quizzes-detailed', 'GET'),
        adminApiCall('get-all-lessons', 'GET'),
      ]);
      setQuizzes(quizResult.data || []);
      setLessons(lessonResult.data || []);
    } catch (error: any) {
      console.error('Error loading quizzes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Quiz "${title}" wirklich loschen?`)) return;
    try {
      await adminApiCall('delete-quiz', 'POST', { id });
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (error: any) {
      alert(`Fehler: ${error.message}`);
    }
  };

  const handleAssign = async (quizId: string) => {
    try {
      await adminApiCall('update-lesson-assignment', 'POST', {
        resourceType: 'quiz',
        resourceId: quizId,
        lessonId: selectedLessonId || null,
      });
      setAssigningId(null);
      setSelectedLessonId('');
      loadData();
    } catch (error: any) {
      alert(`Fehler: ${error.message}`);
    }
  };

  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    (q.lesson_title || '').toLowerCase().includes(search.toLowerCase()) ||
    (q.module_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                Quiz-Verwaltung
              </h1>
              <p className="text-gray-500 mt-1">{quizzes.length} Quizze insgesamt</p>
            </div>
            <Link
              to="/admin/member-kurse/quiz/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Neues Quiz
            </Link>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Quizze durchsuchen..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {search ? 'Keine Quizze gefunden' : 'Noch keine Quizze vorhanden'}
              </h2>
              <p className="text-gray-500 mb-6">
                {search ? 'Versuche einen anderen Suchbegriff.' : 'Erstelle dein erstes Quiz, um loszulegen.'}
              </p>
              {!search && (
                <Link
                  to="/admin/member-kurse/quiz/new"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                >
                  <Plus className="w-5 h-5" />
                  Erstes Quiz erstellen
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{quiz.title}</h3>
                        <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {quiz.question_count} Fragen
                        </span>
                        <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          {quiz.passing_score}% | {quiz.xp_reward} XP
                        </span>
                      </div>

                      {quiz.lesson_title ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LinkIcon className="w-3.5 h-3.5 text-green-500" />
                          <span>{quiz.module_name} &rarr; {quiz.lesson_title}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <Unlink className="w-3.5 h-3.5" />
                          <span>Nicht zugeordnet</span>
                        </div>
                      )}

                      {assigningId === quiz.id && (
                        <div className="mt-3 flex items-center gap-2">
                          <select
                            value={selectedLessonId}
                            onChange={(e) => setSelectedLessonId(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Keine Lektion (entfernen)</option>
                            {lessons.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.module_title} &rarr; L{l.lesson_number}: {l.title}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssign(quiz.id)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                          >
                            Speichern
                          </button>
                          <button
                            onClick={() => { setAssigningId(null); setSelectedLessonId(''); }}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
                          >
                            Abbrechen
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setAssigningId(quiz.id); setSelectedLessonId(quiz.lesson_id || ''); }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Lektion zuordnen"
                      >
                        <BookOpen className="w-4.5 h-4.5" />
                      </button>
                      <Link
                        to={`/admin/member-kurse/quiz/${quiz.id}`}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="Bearbeiten"
                      >
                        <Pencil className="w-4.5 h-4.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(quiz.id, quiz.title)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Loschen"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
