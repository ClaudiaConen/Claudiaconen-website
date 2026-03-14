import { useState, useEffect } from 'react';
import { BookOpen, Info } from 'lucide-react';

export interface GapTextEditorData {
  template: string;
  correct_answers: string[];
  word_bank: string[];
}

interface Props {
  initialData: GapTextEditorData | null;
  onChange: (data: GapTextEditorData | null) => void;
}

function countGaps(template: string): number {
  return (template.match(/\[gap\]/g) || []).length;
}

export default function GapTextEditor({ initialData, onChange }: Props) {
  const [enabled, setEnabled] = useState(!!initialData);
  const [template, setTemplate] = useState(initialData?.template || '');
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    initialData?.correct_answers || []
  );
  const [distractorsInput, setDistractorsInput] = useState<string>(() => {
    if (!initialData) return '';
    const correctSet = new Set(initialData.correct_answers);
    return initialData.word_bank.filter((w) => !correctSet.has(w)).join(', ');
  });

  const gapCount = countGaps(template);

  // Keep correct_answers array in sync with detected gap count
  useEffect(() => {
    setCorrectAnswers((prev) => {
      const adjusted = [...prev];
      while (adjusted.length < gapCount) adjusted.push('');
      return adjusted.slice(0, gapCount);
    });
  }, [gapCount]);

  // Notify parent when state changes
  useEffect(() => {
    if (!enabled) {
      onChange(null);
      return;
    }
    const distractors = distractorsInput
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);
    const wordBank = [...new Set([...correctAnswers.filter(Boolean), ...distractors])];
    onChange({ template, correct_answers: correctAnswers, word_bank: wordBank });
  }, [enabled, template, correctAnswers, distractorsInput]);

  const wordBankPreview = [
    ...new Set([
      ...correctAnswers.filter(Boolean),
      ...distractorsInput
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
    ]),
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <span>Lückentext</span>
      </h3>

      <label className="flex items-center space-x-2 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700">
          Diese Lektion hat einen Lückentext
        </span>
      </label>

      {enabled && (
        <div className="space-y-5 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
          {/* Hint */}
          <div className="flex items-start space-x-2 text-sm text-indigo-700 bg-indigo-100 p-3 rounded-lg">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Verwende <code className="bg-white px-1 rounded font-mono">[gap]</code> als
              Platzhalter für jede Lücke. Beispiel:{' '}
              <em>"KI steht für [gap] Intelligenz."</em>
            </span>
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text mit Lücken *
            </label>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
              placeholder="Die künstliche [gap] verändert die [gap] grundlegend."
            />
            <p className="text-xs text-gray-500 mt-1">
              Erkannte Lücken: <strong>{gapCount}</strong>
            </p>
          </div>

          {/* Correct answers per gap */}
          {gapCount > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Richtige Antworten (in Reihenfolge der Lücken)
              </label>
              <div className="space-y-2">
                {Array.from({ length: gapCount }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 w-16 flex-shrink-0">
                      Lücke {i + 1}:
                    </span>
                    <input
                      type="text"
                      value={correctAnswers[i] || ''}
                      onChange={(e) => {
                        const updated = [...correctAnswers];
                        updated[i] = e.target.value;
                        setCorrectAnswers(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={`Richtige Antwort für Lücke ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Distractors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zusätzliche Wörter / Falschantworten (kommagetrennt)
            </label>
            <input
              type="text"
              value={distractorsInput}
              onChange={(e) => setDistractorsInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              placeholder="falsch1, falsch2, falsch3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Diese Wörter erscheinen zusammen mit den richtigen Antworten in der Wortauswahl
            </p>
          </div>

          {/* Word bank preview */}
          {wordBankPreview.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vorschau Wortbank
              </label>
              <div className="flex flex-wrap gap-2">
                {wordBankPreview.map((word) => (
                  <span
                    key={word}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
