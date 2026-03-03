import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, CheckCircle2, Loader2, Award, Lightbulb, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MiniTaskStep {
  id: string;
  instruction: string;
  hint: string | null;
  order_index: number;
}

interface MiniTask {
  id: string;
  title: string;
  description: string | null;
  task_type: string;
  xp_reward: number | null;
  steps: MiniTaskStep[];
}

interface MiniTaskSubmission {
  response_text: string;
  xp_earned: number | null;
  submitted_at: string;
}

interface LessonMiniTaskProps {
  miniTask: MiniTask;
  studentId: string;
  existingSubmission: MiniTaskSubmission | null;
  onSubmitted: () => void;
}

const taskTypeConfig: Record<string, { label: string; color: string; bg: string }> = {
  reflexion: { label: 'Reflexion', color: 'text-blue-700', bg: 'bg-blue-100' },
  aktion: { label: 'Aktion', color: 'text-orange-700', bg: 'bg-orange-100' },
  kreativ: { label: 'Kreativ', color: 'text-rose-700', bg: 'bg-rose-100' },
  recherche: { label: 'Recherche', color: 'text-slate-700', bg: 'bg-slate-100' },
};

export default function LessonMiniTask({ miniTask, studentId, existingSubmission, onSubmitted }: LessonMiniTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<MiniTaskSubmission | null>(existingSubmission);
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const typeConfig = taskTypeConfig[miniTask.task_type?.toLowerCase()] ?? { label: miniTask.task_type, color: 'text-slate-700', bg: 'bg-slate-100' };

  const handleSubmit = async () => {
    if (!answer.trim() || isSubmitting || submission) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('member_student_mini_task_submissions')
        .insert({
          student_id: studentId,
          mini_task_id: miniTask.id,
          response_text: answer.trim(),
          xp_earned: miniTask.xp_reward ?? 0,
        })
        .select()
        .single();

      if (!error && data) {
        setSubmission({
          response_text: data.response_text,
          xp_earned: data.xp_earned,
          submitted_at: data.submitted_at,
        });
        onSubmitted();
      }
    } catch (err) {
      console.error('Error submitting mini task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHint = (stepId: string) => {
    setShowHint((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-orange-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 rounded-xl p-2.5 flex-shrink-0">
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="font-bold text-slate-900 text-lg">{miniTask.title}</h3>
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${typeConfig.bg} ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              {submission && (
                <span className="inline-flex items-center space-x-1 bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Erledigt</span>
                </span>
              )}
            </div>
            {miniTask.description && (
              <p className="text-sm text-slate-500 mt-0.5">{miniTask.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          {miniTask.xp_reward && miniTask.xp_reward > 0 && (
            <span className="hidden sm:flex items-center space-x-1 text-amber-600 text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>+{miniTask.xp_reward} XP</span>
            </span>
          )}
          <div className="bg-slate-100 rounded-lg p-1.5">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-slate-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-600" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100">
          <div className="px-6 py-5">
            {miniTask.steps.length > 0 && (
              <div className="space-y-4 mb-6">
                {miniTask.steps.map((step, index) => (
                  <div key={step.id} className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-200 text-orange-800 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700 leading-relaxed">{step.instruction}</p>
                        {step.hint && (
                          <div className="mt-2">
                            <button
                              onClick={() => toggleHint(step.id)}
                              className="inline-flex items-center space-x-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"
                            >
                              <Lightbulb className="w-3.5 h-3.5" />
                              <span>{showHint[step.id] ? 'Hinweis verbergen' : 'Hinweis anzeigen'}</span>
                            </button>
                            {showHint[step.id] && (
                              <p className="mt-2 text-sm text-slate-600 bg-white rounded-lg px-3 py-2 border border-orange-200 italic">
                                {step.hint}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {submission ? (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Deine Antwort:</p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                  {submission.response_text}
                </div>
                <div className="flex items-center justify-center space-x-2 bg-orange-50 text-orange-700 rounded-xl py-3 px-4 mt-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Aufgabe abgeschlossen</span>
                  {submission.xp_earned && submission.xp_earned > 0 && (
                    <span className="text-amber-600 font-bold ml-2">+{submission.xp_earned} XP</span>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deine Antwort
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Schreibe deine Antwort hier..."
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || isSubmitting}
                  className="mt-3 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Wird eingereicht...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Aufgabe einreichen{miniTask.xp_reward && miniTask.xp_reward > 0 ? ` (+${miniTask.xp_reward} XP)` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
