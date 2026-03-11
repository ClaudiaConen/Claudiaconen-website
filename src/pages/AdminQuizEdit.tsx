import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import MediaUploader from '../components/MediaUploader';
import {
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Upload,
} from 'lucide-react';

interface Quiz {
  id: string;
  lesson_id: string | null;
  title: string;
  description: string;
  passing_score: number;
  xp_reward: number;
  quiz_image_url?: string | null;
}

interface Question {
  id?: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice';
  explanation: string;
  order_index: number;
  answers: Answer[];
}

interface Answer {
  id?: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

export default function AdminQuizEdit() {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = quizId === 'new';
  const lessonIdFromParam = searchParams.get('lessonId');

  const [quiz, setQuiz] = useState<Quiz>({
    id: '',
    lesson_id: lessonIdFromParam !== 'new' ? lessonIdFromParam : null,
    title: '',
    description: '',
    passing_score: 70,
    xp_reward: 150,
    quiz_image_url: null,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [lessonModuleId, setLessonModuleId] = useState<string | null>(null);

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
    if (!isNew && quizId) {
      loadQuiz();
    }
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      const result = await apiCall(`get-quiz&id=${quizId}`, 'GET');
      const { quiz: quizData, questions: questionsData } = result.data;

      setQuiz(quizData);
      setQuestions(questionsData);
      setExpandedQuestions(questionsData.map((_: any, i: number) => i));

      if (quizData.lesson_id) {
        try {
          const lessonResult = await apiCall(`get-lesson&id=${quizData.lesson_id}`, 'GET');
          setLessonModuleId(lessonResult.data.lesson.module_id);
        } catch {
          // ignore
        }
      }
    } catch (error: any) {
      console.error('Error loading quiz:', error);
      alert(`Fehler beim Laden des Quiz: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!quiz.title) {
      alert('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    if (questions.length === 0) {
      alert('Bitte füge mindestens eine Frage hinzu');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim()) {
        alert(`Frage ${i + 1}: Fragetext darf nicht leer sein`);
        return;
      }
      if (q.answers.length < 2) {
        alert(`Frage ${i + 1}: Mindestens 2 Antworten erforderlich`);
        return;
      }
      const hasCorrect = q.answers.some(a => a.is_correct);
      if (!hasCorrect) {
        alert(`Frage ${i + 1}: Mindestens eine Antwort muss als korrekt markiert sein`);
        return;
      }
    }

    setIsSaving(true);
    try {
      let savedQuizId = quizId;

      const quizPayload = {
        lesson_id: quiz.lesson_id,
        title: quiz.title,
        description: quiz.description,
        passing_score: quiz.passing_score,
        xp_reward: quiz.xp_reward,
        quiz_image_url: quiz.quiz_image_url,
      };

      if (isNew) {
        const result = await apiCall('create-quiz', 'POST', quizPayload);
        savedQuizId = result.data.id;
      } else {
        await apiCall('update-quiz', 'POST', { id: quizId, ...quizPayload });
      }

      await apiCall('save-quiz-questions', 'POST', {
        quizId: savedQuizId,
        questions: questions,
      });

      if (isNew) {
        navigate(`/admin/member-kurse/quiz/${savedQuizId}`);
      } else {
        alert('Quiz erfolgreich gespeichert');
        loadQuiz();
      }
    } catch (error: any) {
      console.error('Error saving quiz:', error);
      const errorMessage = error?.message || 'Unbekannter Fehler beim Speichern';
      alert(`Fehler beim Speichern: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Möchtest du dieses Quiz wirklich löschen?')) return;

    try {
      await apiCall('delete-quiz', 'POST', { id: quizId });
      if (quiz.lesson_id && lessonModuleId) {
        navigate(`/admin/member-kurse/modul/${lessonModuleId}/lektion/${quiz.lesson_id}`);
      } else {
        navigate('/admin/member-quizze');
      }
    } catch (error: any) {
      console.error('Error deleting quiz:', error);
      alert(`Fehler beim Löschen: ${error.message}`);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        question_type: 'single_choice',
        explanation: '',
        order_index: questions.length,
        answers: [
          { answer_text: '', is_correct: true, order_index: 0 },
          { answer_text: '', is_correct: false, order_index: 1 },
        ],
      },
    ]);
    setExpandedQuestions([...expandedQuestions, questions.length]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setExpandedQuestions(expandedQuestions.filter((i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const addAnswer = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].answers.push({
      answer_text: '',
      is_correct: false,
      order_index: updated[questionIndex].answers.length,
    });
    setQuestions(updated);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].answers = updated[questionIndex].answers.filter(
      (_, i) => i !== answerIndex
    );
    setQuestions(updated);
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...questions];
    updated[questionIndex].answers[answerIndex] = {
      ...updated[questionIndex].answers[answerIndex],
      [field]: value,
    };
    setQuestions(updated);
  };

  const toggleQuestion = (index: number) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((i) => i !== index));
    } else {
      setExpandedQuestions([...expandedQuestions, index]);
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
          {quiz.lesson_id && lessonModuleId ? (
            <Link
              to={`/admin/member-kurse/modul/${lessonModuleId}/lektion/${quiz.lesson_id}`}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Lektion</span>
            </Link>
          ) : (
            <Link
              to="/admin/member-quizze"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Quiz-Übersicht</span>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Neues Quiz erstellen' : 'Quiz bearbeiten'}
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. ChatGPT Grundlagen Quiz"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optionale Beschreibung..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bestehende Punktzahl (%)
              </label>
              <input
                type="number"
                value={quiz.passing_score}
                onChange={(e) =>
                  setQuiz({ ...quiz, passing_score: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XP Belohnung
              </label>
              <input
                type="number"
                value={quiz.xp_reward}
                onChange={(e) =>
                  setQuiz({ ...quiz, xp_reward: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fragen</h2>
            <button
              onClick={addQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Frage hinzufügen</span>
            </button>
          </div>

          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Fragen vorhanden</p>
          ) : (
            <div className="space-y-4">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="border border-gray-200 rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleQuestion(qIndex)}
                  >
                    <h3 className="font-medium text-gray-900">
                      Frage {qIndex + 1}
                      {question.question_text && `: ${question.question_text.substring(0, 50)}...`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeQuestion(qIndex);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      {expandedQuestions.includes(qIndex) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>

                  {expandedQuestions.includes(qIndex) && (
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fragetext *
                        </label>
                        <textarea
                          value={question.question_text}
                          onChange={(e) =>
                            updateQuestion(qIndex, 'question_text', e.target.value)
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Was ist...?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fragentyp
                        </label>
                        <select
                          value={question.question_type}
                          onChange={(e) =>
                            updateQuestion(qIndex, 'question_type', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="single_choice">Single Choice</option>
                          <option value="multiple_choice">Multiple Choice</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Erklärung
                        </label>
                        <textarea
                          value={question.explanation}
                          onChange={(e) =>
                            updateQuestion(qIndex, 'explanation', e.target.value)
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Erklärung der richtigen Antwort..."
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Antworten
                          </label>
                          <button
                            onClick={() => addAnswer(qIndex)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Antwort hinzufügen</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {question.answers.map((answer, aIndex) => (
                            <div
                              key={aIndex}
                              className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg"
                            >
                              <input
                                type="checkbox"
                                checked={answer.is_correct}
                                onChange={(e) =>
                                  updateAnswer(
                                    qIndex,
                                    aIndex,
                                    'is_correct',
                                    e.target.checked
                                  )
                                }
                                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                              />
                              <input
                                type="text"
                                value={answer.answer_text}
                                onChange={(e) =>
                                  updateAnswer(qIndex, aIndex, 'answer_text', e.target.value)
                                }
                                placeholder="Antworttext"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                              {question.answers.length > 2 && (
                                <button
                                  onClick={() => removeAnswer(qIndex, aIndex)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
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
            <MediaUploader
              bucket="course-media"
              folder="quiz-images"
              fileType="image"
              label="Quiz-Bild hochladen (optional)"
              currentUrl={quiz.quiz_image_url || ''}
              onUploadComplete={(url) => setQuiz({ ...quiz, quiz_image_url: url })}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
