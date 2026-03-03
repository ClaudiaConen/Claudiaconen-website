import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2, Loader2, Award, Lightbulb } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TakeawayItem {
  id: string;
  content: string;
  icon: string | null;
  order_index: number;
}

interface Takeaway {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number | null;
  items: TakeawayItem[];
}

interface LessonTakeawayProps {
  takeaway: Takeaway;
  studentId: string;
  alreadyCompleted: boolean;
  onCompleted: () => void;
}

export default function LessonTakeaway({ takeaway, studentId, alreadyCompleted, onCompleted }: LessonTakeawayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(alreadyCompleted);

  const handleMarkRead = async () => {
    if (completed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('member_student_takeaway_completions')
        .insert({ student_id: studentId, takeaway_id: takeaway.id });

      if (!error) {
        setCompleted(true);
        onCompleted();
      }
    } catch (err) {
      console.error('Error marking takeaway as read:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const iconMap: Record<string, string> = {
    lightbulb: '💡',
    star: '⭐',
    check: '✅',
    fire: '🔥',
    brain: '🧠',
    rocket: '🚀',
    target: '🎯',
    book: '📚',
    key: '🔑',
    heart: '❤️',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-teal-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-teal-100 rounded-xl p-2.5 flex-shrink-0">
            <BookOpen className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-lg">{takeaway.title}</h3>
              {completed && (
                <span className="inline-flex items-center space-x-1 bg-teal-100 text-teal-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gelesen</span>
                </span>
              )}
            </div>
            {takeaway.description && (
              <p className="text-sm text-slate-500 mt-0.5">{takeaway.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          {takeaway.xp_reward && takeaway.xp_reward > 0 && (
            <span className="hidden sm:flex items-center space-x-1 text-amber-600 text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>+{takeaway.xp_reward} XP</span>
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
            {takeaway.items.length > 0 ? (
              <div className="space-y-3 mb-6">
                {takeaway.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 bg-teal-50 rounded-xl p-4"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">
                      {item.icon && iconMap[item.icon] ? iconMap[item.icon] : <Lightbulb className="w-5 h-5 text-teal-600 mt-0.5" />}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm mb-6">Keine Einträge vorhanden.</p>
            )}

            {completed ? (
              <div className="flex items-center justify-center space-x-2 bg-teal-50 text-teal-700 rounded-xl py-3 px-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Zusammenfassung gelesen</span>
                {takeaway.xp_reward && takeaway.xp_reward > 0 && (
                  <span className="text-amber-600 font-bold ml-2">+{takeaway.xp_reward} XP</span>
                )}
              </div>
            ) : (
              <button
                onClick={handleMarkRead}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Speichere...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Als gelesen markieren{takeaway.xp_reward && takeaway.xp_reward > 0 ? ` (+${takeaway.xp_reward} XP)` : ''}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
