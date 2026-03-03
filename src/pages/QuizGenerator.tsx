import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Question {
  question: string;
  options: string[];
  correct: number;
  insight: string;
}

const exampleQuestions: Question[] = [
  {
    question: "Wie lange dauert der erste Eindruck?",
    options: ["3 Sekunden", "180 Millisekunden", "1 Minute", "5 Sekunden"],
    correct: 1,
    insight: "180 Millisekunden – schneller als ein Wimpernschlag entsteht die erste Emotion!"
  },
  {
    question: "Was macht deine Stimme einzigartig?",
    options: ["Training", "Sie existiert nur einmal", "Lautstärke", "Tonhöhe"],
    correct: 1,
    insight: "Deine Stimme ist wie ein akustischer Fingerabdruck – weltweit einzigartig!"
  },
  {
    question: "Was kann KI nicht übertragen?",
    options: ["Daten", "Echte Emotionen", "Texte", "Bilder"],
    correct: 1,
    insight: "Spiegelneuronen ermöglichen echte emotionale Verbindung – das kann keine KI!"
  }
];

export default function QuizGenerator() {
  const [activeTab, setActiveTab] = useState<'anleitung' | 'inhalte' | 'fragen' | 'design'>('anleitung');
  const [quizTitle, setQuizTitle] = useState('Mein Quiz');
  const [quizSubtitle, setQuizSubtitle] = useState('Teste dein Wissen!');
  const [questions, setQuestions] = useState<Question[]>(exampleQuestions);
  const [inputText, setInputText] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [primaryColor, setPrimaryColor] = useState('#C9A227');
  const [darkColor, setDarkColor] = useState('#1A1A2E');

  const addQuestion = () => {
    setQuestions([...questions, {
      question: "Neue Frage hier eingeben",
      options: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
      correct: 0,
      insight: "Erklärung zur richtigen Antwort..."
    }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const updated = [...questions];
    updated[index][field] = value as never;
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const setCorrectAnswer = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].correct = oIndex;
    setQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const generateFromText = () => {
    if (!inputText.trim()) return;

    const lines = inputText.split('\n').filter(l => l.trim());
    const newQuestions: Question[] = [];

    if (lines.length > 0) {
      newQuestions.push({
        question: `Was ist das Hauptthema von "${lines[0].substring(0, 30)}..."?`,
        options: ["Antwort A (anpassen)", "Antwort B (anpassen)", "Antwort C (anpassen)", "Antwort D (anpassen)"],
        correct: 0,
        insight: "Passe diese Erklärung an dein Thema an."
      });
    }

    if (lines.length > 1) {
      newQuestions.push({
        question: "Welche Aussage trifft zu? (basierend auf deinem Text)",
        options: ["Aussage 1", "Aussage 2", "Aussage 3", "Aussage 4"],
        correct: 0,
        insight: "Erkläre hier, warum diese Antwort richtig ist."
      });
    }

    if (newQuestions.length > 0) {
      setQuestions([...questions, ...newQuestions]);
      setActiveTab('fragen');
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setPreviewMode(false);
  };

  const exportQuiz = () => {
    const quizData = {
      title: quizTitle,
      subtitle: quizSubtitle,
      questions: questions,
      colors: { primary: primaryColor, dark: darkColor }
    };
    const blob = new Blob([JSON.stringify(quizData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mein-quiz.json';
    a.click();
  };

  if (previewMode) {
    const isComplete = currentQ >= questions.length - 1 && showResult;

    return (
      <>
        <SEO
          title="Quiz Vorschau"
          description="Vorschau deines Quiz"
        />
        <div className="min-h-screen bg-[#FBF8F3] p-4 pt-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <button
                onClick={resetQuiz}
                className="text-sm text-gray-500 hover:text-[#C9A227] mb-4 inline-block transition-colors"
              >
                ← Zurück zum Editor
              </button>
              <h1 className="text-3xl font-serif font-bold text-[#1A1A2E]">{quizTitle}</h1>
              <p className="text-gray-600 mt-2">{quizSubtitle}</p>
            </div>

            {!isComplete ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#C9A227]/15">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500 font-semibold">
                    Frage {currentQ + 1} von {questions.length}
                  </span>
                  <span className="text-sm text-[#C9A227] font-semibold">
                    {score} Punkte
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mb-8">
                  <div
                    className="h-full bg-[#C9A227] rounded-full transition-all duration-500"
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3 mb-6">
                  {questions[currentQ].options.map((option, index) => {
                    let className = "border-2 rounded-xl p-4 cursor-pointer transition-all ";
                    if (showResult) {
                      if (index === questions[currentQ].correct) {
                        className += "border-green-500 bg-green-50";
                      } else if (index === selectedAnswer) {
                        className += "border-red-400 bg-red-50";
                      } else {
                        className += "border-gray-200";
                      }
                    } else if (index === selectedAnswer) {
                      className += "border-[#C9A227] bg-[#C9A227]/10";
                    } else {
                      className += "border-gray-200 hover:border-[#C9A227] hover:bg-[#FBF8F3]";
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className={className}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            showResult && index === questions[currentQ].correct
                              ? 'bg-green-500 text-white'
                              : showResult && index === selectedAnswer
                              ? 'bg-red-400 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium text-gray-900">{option}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showResult && (
                  <div className="bg-[#FBF8F3] border-l-4 border-[#C9A227] rounded-r-lg p-4 mb-6">
                    <p className="font-bold text-[#C9A227] mb-1">💡 Insight:</p>
                    <p className="text-gray-700">{questions[currentQ].insight}</p>
                  </div>
                )}

                {showResult && currentQ < questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all"
                  >
                    Nächste Frage →
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#C9A227]/15">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-2">
                  Quiz abgeschlossen!
                </h2>
                <div className="text-4xl font-bold text-[#C9A227] my-6">
                  {score} / {questions.length}
                </div>
                <p className="text-gray-600 mb-8">
                  {score === questions.length ? "Perfekt! Alle richtig!" :
                   score >= questions.length * 0.7 ? "Sehr gut gemacht!" :
                   score >= questions.length * 0.5 ? "Gut! Da geht noch mehr." :
                   "Übung macht den Meister!"}
                </p>
                <button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                >
                  Zurück zum Editor
                </button>
              </div>
            )}

            <div className="text-center mt-8 text-xs text-gray-500">
              Quiz erstellt mit dem Generator von{' '}
              <Link to="/" className="text-[#C9A227] hover:underline">Claudia Conen</Link>
              {' '}· Voice-to-Brain Expertin
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Quiz-Generator | Erstelle dein eigenes interaktives Quiz"
        description="Erstelle dein eigenes interaktives Quiz in wenigen Minuten. Kostenloser Quiz-Generator von Claudia Conen."
      />

      <div className="min-h-screen bg-[#FBF8F3]">
        <Navigation />

        <div className="bg-[#1A1A2E] text-white py-12 px-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  <span className="text-[#C9A227]">Quiz</span>-Generator
                </h1>
                <p className="text-gray-300 mt-2">
                  Erstelle dein eigenes interaktives Quiz
                </p>
              </div>
              <button
                onClick={() => setPreviewMode(true)}
                className="bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all text-sm"
              >
                👁️ Vorschau
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-2 -mt-1 overflow-x-auto">
            {[
              { id: 'anleitung', label: '📖 Anleitung' },
              { id: 'inhalte', label: '📝 Inhalte' },
              { id: 'fragen', label: '❓ Fragen' },
              { id: 'design', label: '🎨 Design' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 font-semibold rounded-t-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1A1A2E]'
                    : 'bg-white/30 text-gray-600 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">

          {activeTab === 'anleitung' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#C9A227]/15">
              <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-6">
                So erstellst du dein Quiz in 3 Schritten
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A227] text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-lg">Inhalte eingeben</h3>
                    <p className="text-gray-600 mt-1">
                      Gehe zum Tab <strong>"Inhalte"</strong> und füge deinen Text, dein Dokument oder deine Stichpunkte ein.
                      Der Generator erstellt daraus Fragen-Vorlagen, die du anpassen kannst.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A227] text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-lg">Fragen bearbeiten</h3>
                    <p className="text-gray-600 mt-1">
                      Im Tab <strong>"Fragen"</strong> kannst du jede Frage individuell anpassen:
                      Formulierungen ändern, Antworten bearbeiten, die richtige Antwort markieren und Insights hinzufügen.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A227] text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-lg">Vorschau & Teilen</h3>
                    <p className="text-gray-600 mt-1">
                      Klicke auf <strong>"Vorschau"</strong> um dein Quiz zu testen.
                      Wenn alles passt, kannst du es exportieren und auf deiner Website einbinden.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#FBF8F3] rounded-xl border border-[#C9A227]/20">
                <p className="text-sm text-gray-600">
                  <strong className="text-[#C9A227]">💡 Tipp:</strong> Für optimale Aufmerksamkeit empfehlen wir
                  <strong> 7-12 Fragen</strong>. Zu wenige wirken oberflächlich, zu viele ermüden.
                  Mix verschiedene Schwierigkeitsgrade für Spannung!
                </p>
              </div>

              <button
                onClick={() => setActiveTab('inhalte')}
                className="mt-6 bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
              >
                Los geht's →
              </button>
            </div>
          )}

          {activeTab === 'inhalte' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#C9A227]/15">
              <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-2">
                Deine Inhalte
              </h2>
              <p className="text-gray-600 mb-6">
                Füge hier deinen Text, Artikel, Notizen oder Stichpunkte ein.
                Daraus werden Fragen-Vorlagen generiert.
              </p>

              <div className="mb-6">
                <label className="block font-semibold text-[#1A1A2E] mb-2">
                  Quiz-Titel
                </label>
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 transition-all text-black"
                  placeholder="z.B. Wirkungskraft im KI-Zeitalter"
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-[#1A1A2E] mb-2">
                  Untertitel
                </label>
                <input
                  type="text"
                  value={quizSubtitle}
                  onChange={(e) => setQuizSubtitle(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 transition-all text-black"
                  placeholder="z.B. Teste dein Wissen in 10 Fragen!"
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-[#1A1A2E] mb-2">
                  Dein Inhalt / Text / Dokument
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 min-h-[200px] focus:border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 transition-all resize-y text-black"
                  placeholder="Füge hier deinen Text ein...

Beispiel:
- Der erste Eindruck entsteht in 180 Millisekunden
- 90% unserer Entscheidungen sind unbewusst
- Die Stimme ist wie ein akustischer Fingerabdruck
- KI kann keine echten Emotionen übertragen

Je mehr Inhalt du einfügst, desto mehr Fragen können generiert werden."
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={generateFromText}
                  className="bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                >
                  ✨ Fragen generieren
                </button>
                <button
                  onClick={() => setActiveTab('fragen')}
                  className="bg-[#1A1A2E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1A1A2E]/90 transition-all"
                >
                  Direkt zu den Fragen →
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                <strong>📋 Aktuell:</strong> {questions.length} Fragen im Quiz
              </div>
            </div>
          )}

          {activeTab === 'fragen' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-serif font-bold text-[#1A1A2E]">
                  Deine Fragen ({questions.length})
                </h2>
                <button
                  onClick={addQuestion}
                  className="bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all text-sm"
                >
                  + Frage hinzufügen
                </button>
              </div>

              {questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-white rounded-2xl shadow-xl p-6 border border-[#C9A227]/15">
                  <div className="flex justify-between items-start mb-4">
                    <span className="w-9 h-9 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center font-bold text-sm">
                      {qIndex + 1}
                    </span>
                    <button
                      onClick={() => deleteQuestion(qIndex)}
                      className="text-red-400 hover:text-red-600 text-sm transition-colors"
                    >
                      🗑️ Löschen
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Frage
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#C9A227] focus:outline-none transition-all text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Antworten <span className="font-normal text-gray-400">(Klicke ✓ für die richtige)</span>
                    </label>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex gap-2 items-center">
                          <div
                            onClick={() => setCorrectAnswer(qIndex, oIndex)}
                            className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${
                              q.correct === oIndex
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-[#C9A227]'
                            }`}
                          >
                            {q.correct === oIndex && '✓'}
                          </div>
                          <span className="text-sm font-bold text-gray-400 w-6">
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-[#C9A227] focus:outline-none transition-all text-black"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Insight / Erklärung
                    </label>
                    <textarea
                      value={q.insight}
                      onChange={(e) => updateQuestion(qIndex, 'insight', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 min-h-[80px] focus:border-[#C9A227] focus:outline-none transition-all resize-y text-black"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={addQuestion}
                  className="flex-1 bg-[#1A1A2E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1A1A2E]/90 transition-all"
                >
                  + Weitere Frage
                </button>
                <button
                  onClick={() => setPreviewMode(true)}
                  className="flex-1 bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                >
                  👁️ Quiz testen
                </button>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#C9A227]/15">
              <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-6">
                Design anpassen
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-semibold text-[#1A1A2E] mb-2">
                    Hauptfarbe (Gold)
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#C9A227] focus:outline-none transition-all text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1A1A2E] mb-2">
                    Dunkle Farbe
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#C9A227] focus:outline-none transition-all text-black"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-[#1A1A2E] mb-4">Export</h3>
                <button
                  onClick={exportQuiz}
                  className="bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                >
                  📥 Quiz als JSON exportieren
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Die JSON-Datei kann von einem Webmaster in deine Website eingebunden werden.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center py-8 text-xs text-gray-500">
          <p>
            Quiz-Generator erstellt von{' '}
            <Link to="/" className="text-[#C9A227] hover:underline">Claudia Conen</Link>
            {' '}· Voice-to-Brain Expertin
          </p>
          <p className="mt-1">
            Perfektion klickt. Persönlichkeit bleibt.
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
}
