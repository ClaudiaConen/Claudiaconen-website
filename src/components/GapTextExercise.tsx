import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface GapTextData {
  id: string;
  template: string;
  correct_answers: string[];
  word_bank: string[];
}

interface Props {
  gapText: GapTextData;
  nextLesson: string | null;
}

type Segment = { type: 'text'; value: string } | { type: 'gap'; index: number };

function parseTemplate(template: string): Segment[] {
  const parts = template.split('[gap]');
  const segments: Segment[] = [];
  parts.forEach((part, i) => {
    if (part) segments.push({ type: 'text', value: part });
    if (i < parts.length - 1) {
      segments.push({ type: 'gap', index: i });
    }
  });
  return segments;
}

export default function GapTextExercise({ gapText, nextLesson }: Props) {
  const totalGaps = gapText.correct_answers.length;
  const [answers, setAnswers] = useState<string[]>(Array(totalGaps).fill(''));

  const segments = useMemo(() => parseTemplate(gapText.template), [gapText.template]);

  const shuffledWordBank = useMemo(() => {
    return [...gapText.word_bank].sort(() => Math.random() - 0.5);
  }, [gapText.word_bank]);

  const correctCount = answers.filter(
    (a, i) => a !== '' && a === gapText.correct_answers[i]
  ).length;

  const allCorrect = correctCount === totalGaps && totalGaps > 0;
  const progress = totalGaps > 0 ? (correctCount / totalGaps) * 100 : 0;

  const setAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="px-8 pt-8 pb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Ergänze folgenden Text mit den vorgegebenen Bausteinen
        </h2>

        <div className="text-slate-700 text-base leading-10">
          {segments.map((seg, i) => {
            if (seg.type === 'text') {
              return <span key={i}>{seg.value}</span>;
            }

            const gapIndex = seg.index;
            const selected = answers[gapIndex];
            const isCorrect = selected !== '' && selected === gapText.correct_answers[gapIndex];
            const isWrong = selected !== '' && !isCorrect;

            return (
              <select
                key={i}
                value={selected}
                onChange={(e) => setAnswer(gapIndex, e.target.value)}
                className={`mx-1 inline-block px-2 py-1 border-2 rounded-lg text-sm font-medium focus:outline-none transition-all cursor-pointer ${
                  isCorrect
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : isWrong
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-slate-300 bg-slate-50 text-slate-500'
                }`}
              >
                <option value="">Wählen ...</option>
                {shuffledWordBank.map((word) => (
                  <option key={word} value={word}>
                    {word}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      </div>

      {/* Word bank */}
      <div className="px-8 py-5 bg-slate-50 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Wähle die passende Antwort aus.
        </p>
        <div className="flex flex-wrap gap-2">
          {shuffledWordBank.map((word) => {
            const isUsedCorrectly =
              answers.some((a, i) => a === word && gapText.correct_answers[i] === word);
            return (
              <span
                key={word}
                className={`px-3 py-1.5 rounded-lg text-sm border shadow-sm transition-colors ${
                  isUsedCorrectly
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100">
        <div
          className="h-2 bg-green-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Success state */}
      {allCorrect && (
        <div className="px-8 py-5 bg-green-50 border-t border-green-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-green-700 font-bold text-lg">
              Yeah – gut gemacht! 🎉
            </p>
            {nextLesson && (
              <Link
                to={`/member/lesson/${nextLesson}`}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center space-x-2 group"
              >
                <span>Weiter</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
