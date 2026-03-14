import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import MediaUploader from '../components/MediaUploader';
import GapTextEditor, { GapTextEditorData } from '../components/GapTextEditor';
import {
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus,
  X,
  Upload,
  FileText,
  Brain,
  CreditCard,
  Video,
  ExternalLink,
  Pencil,
} from 'lucide-react';

interface Lesson {
  id: string;
  module_id: string;
  lesson_number: number;
  title: string;
  description: string;
  content: string;
  video_url: string | null;
  video_duration_seconds: number | null;
  video_platform?: string;
  audio_url?: string | null;
  audio_duration_seconds?: number | null;
  xp_reward: number;
  order_index: number;
  is_published: boolean;
  has_quiz: boolean;
  has_flashcards: boolean;
}

interface Download {
  id?: string;
  title: string;
  file_url: string;
  file_type: string;
  order_index: number;
}

export default function AdminLessonEdit() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const isNew = lessonId === 'new';

  const [lesson, setLesson] = useState<Lesson>({
    id: '',
    module_id: moduleId || '',
    lesson_number: 1,
    title: '',
    description: '',
    content: '',
    video_url: null,
    video_duration_seconds: null,
    video_platform: 'youtube',
    audio_url: null,
    audio_duration_seconds: null,
    xp_reward: 100,
    order_index: 0,
    is_published: false,
    has_quiz: false,
    has_flashcards: false,
  });

  const [downloads, setDownloads] = useState<Download[]>([]);
  const [availableQuizzes, setAvailableQuizzes] = useState<any[]>([]);
  const [availableFlashcardDecks, setAvailableFlashcardDecks] = useState<any[]>([]);
  const [availableRecommendations, setAvailableRecommendations] = useState<any[]>([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [selectedFlashcardDeckId, setSelectedFlashcardDeckId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialGapText, setInitialGapText] = useState<GapTextEditorData | null>(null);
  const [gapText, setGapText] = useState<GapTextEditorData | null>(null);

  const apiCall = async (action: string, method: string = 'GET', body?: any) => {
    const adminToken = getToken();
    if (!adminToken) {
      throw new Error('Keine Authentifizierung gefunden. Bitte erneut einloggen.');
    }

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=${action}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.details || 'Ein Fehler ist aufgetreten');
    }

    return result;
  };

  useEffect(() => {
    if (!isNew && lessonId) {
      loadLesson();
    }
    loadAvailableQuizzes();
    loadAvailableFlashcardDecks();
    loadAvailableRecommendations();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      const result = await apiCall(`get-lesson&id=${lessonId}`, 'GET');
      const { lesson: lessonData, downloads: downloadsData, recommendations, quizId, flashcardDeckId } = result.data;

      if (quizId && !lessonData.has_quiz) {
        lessonData.has_quiz = true;
      }
      if (flashcardDeckId && !lessonData.has_flashcards) {
        lessonData.has_flashcards = true;
      }
      setLesson(lessonData);
      setDownloads(downloadsData || []);
      setSelectedRecommendations(recommendations || []);
      if (quizId) setSelectedQuizId(quizId);
      if (flashcardDeckId) setSelectedFlashcardDeckId(flashcardDeckId);

      try {
        const gapResult = await apiCall(`get-gap-text&lessonId=${lessonId}`, 'GET');
        if (gapResult.data) {
          setInitialGapText(gapResult.data);
          setGapText(gapResult.data);
        }
      } catch {
        // No gap text yet – that's fine
      }
    } catch (error: any) {
      console.error('Error loading lesson:', error);
      setErrorMessage(error.message || 'Fehler beim Laden der Lektion');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableQuizzes = async () => {
    try {
      const result = await apiCall('get-quizzes', 'GET');
      setAvailableQuizzes(result.data || []);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  };

  const loadAvailableFlashcardDecks = async () => {
    try {
      const result = await apiCall('get-flashcard-decks', 'GET');
      setAvailableFlashcardDecks(result.data || []);
    } catch (error) {
      console.error('Error loading flashcard decks:', error);
    }
  };

  const loadAvailableRecommendations = async () => {
    try {
      const result = await apiCall('get-recommendations', 'GET');
      setAvailableRecommendations(result.data || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const handleSave = async () => {
    if (!lesson.title || !lesson.description) {
      alert('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      let savedLessonId = lessonId;

      const lessonPayload = {
        module_id: lesson.module_id,
        lesson_number: lesson.lesson_number,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        video_url: lesson.video_url || null,
        video_duration_seconds: lesson.video_duration_seconds || null,
        video_platform: lesson.video_platform || 'youtube',
        audio_url: lesson.audio_url || null,
        audio_duration_seconds: lesson.audio_duration_seconds || null,
        xp_reward: lesson.xp_reward,
        order_index: lesson.order_index,
        is_published: lesson.is_published,
        has_quiz: lesson.has_quiz,
        has_flashcards: lesson.has_flashcards,
      };

      if (isNew) {
        const result = await apiCall('create-lesson', 'POST', lessonPayload);
        savedLessonId = result.data.id;
      } else {
        await apiCall('update-lesson', 'POST', { id: lessonId, ...lessonPayload });
      }

      await apiCall('save-lesson-extras', 'POST', {
        lessonId: savedLessonId,
        downloads: downloads.filter(d => d.title && d.file_url),
        recommendations: selectedRecommendations,
        quizId: selectedQuizId,
        flashcardDeckId: selectedFlashcardDeckId,
        hasQuiz: lesson.has_quiz,
        hasFlashcards: lesson.has_flashcards,
      });

      // Save gap text
      if (gapText && gapText.template && gapText.correct_answers.some(Boolean)) {
        await apiCall('save-gap-text', 'POST', {
          lessonId: savedLessonId,
          template: gapText.template,
          correct_answers: gapText.correct_answers,
          word_bank: gapText.word_bank,
        });
      } else if (!gapText && !isNew && savedLessonId) {
        try {
          await apiCall('delete-gap-text', 'POST', { lessonId: savedLessonId });
        } catch {
          // No gap text to delete
        }
      }

      if (isNew) {
        navigate(`/admin/member-kurse/modul/${moduleId}/lektion/${savedLessonId}`);
      } else {
        alert('Lektion erfolgreich gespeichert');
      }
    } catch (error: any) {
      console.error('Error saving lesson:', error);
      const errorMsg = error.message || 'Fehler beim Speichern';
      setErrorMessage(errorMsg);
      alert(`Fehler beim Speichern: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Möchtest du diese Lektion wirklich löschen?')) return;

    try {
      await apiCall('delete-lesson', 'POST', { id: lessonId });
      navigate(`/admin/member-kurse/modul/${moduleId}`);
    } catch (error: any) {
      console.error('Error deleting lesson:', error);
      alert(`Fehler beim Löschen: ${error.message || 'Unbekannter Fehler'}`);
    }
  };

  const addDownload = () => {
    setDownloads([
      ...downloads,
      {
        title: '',
        file_url: '',
        file_type: 'pdf',
        order_index: downloads.length,
      },
    ]);
  };

  const removeDownload = (index: number) => {
    setDownloads(downloads.filter((_, i) => i !== index));
  };

  const updateDownload = (index: number, field: string, value: string) => {
    const updated = [...downloads];
    updated[index] = { ...updated[index], [field]: value };
    setDownloads(updated);
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
            to={`/admin/member-kurse/modul/${moduleId}`}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Modul</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Neue Lektion erstellen' : 'Lektion bearbeiten'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lektionsnummer *
              </label>
              <input
                type="number"
                value={lesson.lesson_number}
                onChange={(e) =>
                  setLesson({ ...lesson, lesson_number: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sortierung
              </label>
              <input
                type="number"
                value={lesson.order_index}
                onChange={(e) =>
                  setLesson({ ...lesson, order_index: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. Einführung in ChatGPT"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung *
              </label>
              <textarea
                value={lesson.description}
                onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kurze Zusammenfassung der Lektion..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inhalt (HTML möglich)
              </label>
              <textarea
                value={lesson.content}
                onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="<h2>Überschrift</h2><p>Text...</p>"
              />
            </div>

            <div className="md:col-span-2 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Video className="w-5 h-5 text-blue-600" />
                <span>Video</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video-Plattform
                  </label>
                  <select
                    value={lesson.video_platform || 'youtube'}
                    onChange={(e) =>
                      setLesson({ ...lesson, video_platform: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="self-hosted">Selbst gehostet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video-URL
                  </label>
                  <input
                    type="url"
                    value={lesson.video_url || ''}
                    onChange={(e) =>
                      setLesson({ ...lesson, video_url: e.target.value || null })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      lesson.video_platform === 'youtube'
                        ? 'https://youtube.com/watch?v=... oder Video-ID'
                        : lesson.video_platform === 'vimeo'
                        ? 'https://vimeo.com/... oder Video-ID'
                        : 'https://...'
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video-Dauer (Sekunden)
                  </label>
                  <input
                    type="number"
                    value={lesson.video_duration_seconds || ''}
                    onChange={(e) =>
                      setLesson({
                        ...lesson,
                        video_duration_seconds: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <ExternalLink className="w-5 h-5 text-green-600" />
                <span>Empfehlungen & Tools</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Wähle Tools und Produkte, die in dieser Lektion empfohlen werden
              </p>
              <div className="space-y-2">
                {availableRecommendations.map((rec) => (
                  <label key={rec.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRecommendations.includes(rec.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRecommendations([...selectedRecommendations, rec.id]);
                        } else {
                          setSelectedRecommendations(
                            selectedRecommendations.filter((id) => id !== rec.id)
                          );
                        }
                      }}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{rec.name}</div>
                      <div className="text-xs text-gray-500">{rec.category}</div>
                    </div>
                  </label>
                ))}
                {availableRecommendations.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Keine Empfehlungen verfügbar.{' '}
                    <Link to="/admin/empfehlungen" className="text-blue-600 hover:text-blue-700">
                      Erstelle zuerst Empfehlungen
                    </Link>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XP Belohnung
              </label>
              <input
                type="number"
                value={lesson.xp_reward}
                onChange={(e) =>
                  setLesson({ ...lesson, xp_reward: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lesson.is_published}
                  onChange={(e) =>
                    setLesson({ ...lesson, is_published: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Veröffentlicht</span>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>Quiz</span>
            </h3>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lesson.has_quiz}
                  onChange={(e) =>
                    setLesson({ ...lesson, has_quiz: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Diese Lektion hat ein Quiz
                </span>
              </label>

              {lesson.has_quiz && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz auswählen
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedQuizId}
                      onChange={(e) => setSelectedQuizId(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Quiz auswählen...</option>
                      {availableQuizzes.map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>
                          {quiz.title}
                          {quiz.lesson_id && quiz.lesson_id !== lessonId
                            ? ' (bereits zugewiesen)'
                            : ''}
                        </option>
                      ))}
                    </select>
                    {selectedQuizId && (
                      <Link
                        to={`/admin/member-kurse/quiz/${selectedQuizId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Quiz bearbeiten</span>
                      </Link>
                    )}
                  </div>
                  <div className="mt-2">
                    <Link
                      to={`/admin/member-kurse/quiz/new?lessonId=${lessonId || 'new'}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Neues Quiz erstellen</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <span>Flashcards</span>
            </h3>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lesson.has_flashcards}
                  onChange={(e) =>
                    setLesson({ ...lesson, has_flashcards: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Diese Lektion hat Flashcards
                </span>
              </label>

              {lesson.has_flashcards && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flashcard Deck auswählen
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedFlashcardDeckId}
                      onChange={(e) => setSelectedFlashcardDeckId(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Deck auswählen...</option>
                      {availableFlashcardDecks.map((deck) => (
                        <option key={deck.id} value={deck.id}>
                          {deck.title}
                          {deck.lesson_id && deck.lesson_id !== lessonId
                            ? ' (bereits zugewiesen)'
                            : ''}
                        </option>
                      ))}
                    </select>
                    {selectedFlashcardDeckId && (
                      <Link
                        to={`/admin/member-kurse/flashcards/${selectedFlashcardDeckId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Deck bearbeiten</span>
                      </Link>
                    )}
                  </div>
                  <div className="mt-2">
                    <Link
                      to={`/admin/member-kurse/flashcards/new?lessonId=${lessonId || 'new'}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Neues Flashcard Deck erstellen</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span>Downloads</span>
              </h3>
              <button
                onClick={addDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Download hinzufügen</span>
              </button>
            </div>

            {downloads.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Noch keine Downloads vorhanden
              </p>
            ) : (
              <div className="space-y-3">
                {downloads.map((download, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={download.title}
                        onChange={(e) => updateDownload(index, 'title', e.target.value)}
                        placeholder="Titel"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="url"
                        value={download.file_url}
                        onChange={(e) =>
                          updateDownload(index, 'file_url', e.target.value)
                        }
                        placeholder="URL"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <select
                        value={download.file_type}
                        onChange={(e) =>
                          updateDownload(index, 'file_type', e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="pdf">PDF</option>
                        <option value="docx">DOCX</option>
                        <option value="xlsx">XLSX</option>
                        <option value="zip">ZIP</option>
                        <option value="mp3">MP3</option>
                        <option value="audio">Audio</option>
                        <option value="pptx">PPTX</option>
                      </select>
                    </div>
                    <button
                      onClick={() => removeDownload(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <GapTextEditor
            key={lessonId}
            initialData={initialGapText}
            onChange={setGapText}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <Upload className="w-6 h-6 text-blue-600" />
            <span>Datei-Uploads</span>
          </h3>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Dateien werden sofort hochgeladen. Klicke "Speichern" oben, um alle Änderungen zu übernehmen.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <MediaUploader
                bucket="course-media"
                folder="audio"
                fileType="audio"
                maxSizeMB={200}
                label="Audio-Datei hochladen"
                currentUrl={lesson.audio_url || ''}
                onUploadComplete={(url) => setLesson({ ...lesson, audio_url: url })}
              />
              {lesson.audio_url && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio-Dauer (Sekunden)
                  </label>
                  <input
                    type="number"
                    value={lesson.audio_duration_seconds || ''}
                    onChange={(e) =>
                      setLesson({
                        ...lesson,
                        audio_duration_seconds: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
