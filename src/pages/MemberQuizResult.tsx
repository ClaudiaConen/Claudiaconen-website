import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  Trophy,
  Target,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';

interface QuizAttempt {
  id: string;
  score: number;
  passed: boolean;
  answers_json: any;
  xp_earned: number;
  completed_at: string;
}

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
  question_type: string;
  explanation: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  answer_text: string;
  is_correct: boolean;
}

interface QuestionResult {
  question: Question;
  selectedAnswerIds: string[];
  isCorrect: boolean;
}

export default function MemberQuizResult() {
  const { quizId, attemptId } = useParams();
  useStudentAuth();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (quizId && attemptId) {
      loadResults();
    }
  }, [quizId, attemptId]);

  const loadResults = async () => {
    try {
      const { data: attemptData, error: attemptError } = await supabase
        .from('member_student_quiz_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (attemptError) throw attemptError;

      setAttempt(attemptData);

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
            is_correct
          )
        `)
        .eq('quiz_id', quizId)
        .order('order_index', { ascending: true });

      if (questionsError) throw questionsError;

      const results: QuestionResult[] = questionsData.map((q: any) => {
        const selectedAnswerIds = attemptData.answers_json[q.id] || [];
        const correctAnswerIds = q.member_quiz_answers
          .filter((a: Answer) => a.is_correct)
          .map((a: Answer) => a.id);

        const isCorrect =
          selectedAnswerIds.length === correctAnswerIds.length &&
          selectedAnswerIds.every((id: string) => correctAnswerIds.includes(id));

        return {
          question: {
            ...q,
            answers: q.member_quiz_answers,
          },
          selectedAnswerIds,
          isCorrect,
        };
      });

      setQuestionResults(results);

      if (attemptData.passed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const correctAnswers = questionResults.filter((r) => r.isCorrect).length;
  const totalQuestions = questionResults.length;

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

  if (!quiz || !attempt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Ergebnis nicht gefunden
            </h2>
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

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-9xl animate-bounce">🎉</div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={`/member/lesson/${quiz.lesson_id}`}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Lektion</span>
          </Link>

          <div
            className={`rounded-2xl shadow-lg p-8 ${
              attempt.passed
                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                : 'bg-gradient-to-br from-slate-700 to-slate-800 text-white'
            }`}
          >
            <div className="text-center">
              <div className="mb-4">
                {attempt.passed ? (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                    <Trophy className="w-12 h-12" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                    <Target className="w-12 h-12" />
                  </div>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-2">
                {attempt.passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h1>
              <p className="text-white/90 text-lg mb-6">
                {attempt.passed
                  ? 'Glückwunsch! Du hast das Quiz erfolgreich abgeschlossen.'
                  : 'Leider hast du die Mindestpunktzahl nicht erreicht.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{attempt.score}%</div>
                  <div className="text-sm text-white/80">Deine Punktzahl</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    {correctAnswers}/{totalQuestions}
                  </div>
                  <div className="text-sm text-white/80">Richtige Antworten</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    {attempt.passed ? `+${attempt.xp_earned}` : '0'} XP
                  </div>
                  <div className="text-sm text-white/80">Verdient</div>
                </div>
              </div>

              {!attempt.passed && (
                <p className="text-sm text-white/80">
                  Zum Bestehen benötigt: {quiz.passing_score}%
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Detaillierte Auswertung</h2>

          <div className="space-y-6">
            {questionResults.map((result, index) => (
              <div
                key={result.question.id}
                className={`border-2 rounded-xl p-6 ${
                  result.isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-slate-700">
                        Frage {index + 1}
                      </span>
                      {result.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">
                      {result.question.question_text}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {result.question.answers.map((answer) => {
                    const isSelected = result.selectedAnswerIds.includes(answer.id);
                    const isCorrect = answer.is_correct;

                    let bgColor = 'bg-white';
                    let borderColor = 'border-slate-200';
                    let icon = null;

                    if (isSelected && isCorrect) {
                      bgColor = 'bg-green-100';
                      borderColor = 'border-green-500';
                      icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-100';
                      borderColor = 'border-red-500';
                      icon = <XCircle className="w-5 h-5 text-red-600" />;
                    } else if (!isSelected && isCorrect) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-300';
                      icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
                    }

                    return (
                      <div
                        key={answer.id}
                        className={`p-4 rounded-lg border-2 ${bgColor} ${borderColor}`}
                      >
                        <div className="flex items-start space-x-3">
                          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
                          <div className="flex-1">
                            <p className="text-slate-900">{answer.answer_text}</p>
                            {isSelected && !isCorrect && (
                              <p className="text-sm text-red-600 mt-1">
                                Deine Antwort (falsch)
                              </p>
                            )}
                            {!isSelected && isCorrect && (
                              <p className="text-sm text-green-600 mt-1">
                                Richtige Antwort
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {result.question.explanation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Erklärung:</strong> {result.question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/member/lesson/${quiz.lesson_id}`}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition text-center"
          >
            Zurück zur Lektion
          </Link>

          {!attempt.passed && (
            <Link
              to={`/member/quiz/${quizId}`}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Quiz wiederholen</span>
            </Link>
          )}

          {attempt.passed && (
            <Link
              to="/member/courses"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Weiter lernen</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
