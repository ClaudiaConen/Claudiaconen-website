import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  CheckCircle2,
  ArrowLeft,
  Loader2,
  ChevronRight,
  Trophy,
  Target,
} from 'lucide-react';

interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  passing_score: number;
  xp_reward: number;
}

interface Question {
  id: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice';
  order_index: number;
  explanation: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

interface SelectedAnswers {
  [questionId: string]: string[];
}

export default function MemberQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { student } = useStudentAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (quizId) {
      loadQuiz();
    }
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      const { data: quizData, error: quizError } = await supabase
        .from('member_quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) throw quizError;

      setQuiz(quizData);

      const { data: questionsData, error: questionsError } = await supabase
        .from('member_quiz_questions')
        .select(`
          *,
          member_quiz_answers (
            id,
            answer_text,
            is_correct,
            order_index
          )
        `)
        .eq('quiz_id', quizId)
        .order('order_index', { ascending: true });

      if (questionsError) throw questionsError;

      const formattedQuestions = questionsData.map((q: any) => ({
        ...q,
        answers: (q.member_quiz_answers || []).sort(
          (a: Answer, b: Answer) => a.order_index - b.order_index
        ),
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    if (question.question_type === 'single_choice') {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: [answerId],
      });
    } else {
      const currentAnswers = selectedAnswers[questionId] || [];
      const newAnswers = currentAnswers.includes(answerId)
        ? currentAnswers.filter((id) => id !== answerId)
        : [...currentAnswers, answerId];

      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: newAnswers,
      });
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !student) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-quiz-attempt`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            studentId: student.id,
            quizId: quiz.id,
            answers: selectedAnswers,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate(`/member/quiz/${quizId}/result/${result.attemptId}`);
      } else {
        alert('Fehler beim Absenden des Quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Fehler beim Absenden des Quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionAnswered = (questionId: string) => {
    return selectedAnswers[questionId] && selectedAnswers[questionId].length > 0;
  };

  const allQuestionsAnswered = questions.every((q) => isQuestionAnswered(q.id));
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiz nicht gefunden</h2>
            <Link
              to="/member/courses"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Zurück zu den Kursen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={`/member/lesson/${quiz.lesson_id}`}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Lektion</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{quiz.title}</h1>
                {quiz.description && (
                  <p className="text-slate-600">{quiz.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">+{quiz.xp_reward} XP</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Zum Bestehen: {quiz.passing_score}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{questions.length} Fragen</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Fortschritt</span>
                <span>
                  Frage {currentQuestionIndex + 1} von {questions.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentQuestion && (
            <div>
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {currentQuestion.question_text}
                  </h2>
                  {currentQuestion.question_type === 'multiple_choice' && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      Mehrfachauswahl
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {currentQuestion.answers.map((answer) => {
                  const isSelected = selectedAnswers[currentQuestion.id]?.includes(
                    answer.id
                  );

                  return (
                    <button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-slate-900">{answer.answer_text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && currentQuestion.explanation && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Erklärung:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {isQuestionAnswered(currentQuestion.id) && !showExplanation && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Erklärung anzeigen
                </button>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Zurück
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={!isQuestionAnswered(currentQuestion.id)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Weiter</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={!allQuestionsAnswered || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Quiz abschließen</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  setShowExplanation(false);
                }}
                className={`w-8 h-8 rounded-full text-xs font-medium transition ${
                  idx === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : isQuestionAnswered(q.id)
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
