import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Question {
  level: number;
  question: string;
  options: string[];
  correct: number;
  insight: string;
}

interface Flashcard {
  front: string;
  back: string;
}

const quizData: Question[] = [
  {
    level: 1,
    question: "Wie schnell entsteht der erste Eindruck, den Menschen von dir haben?",
    options: ["In etwa 3 Sekunden", "In nur 180 Millisekunden – schneller als ein Wimpernschlag", "Nach ungefähr einer Minute", "Erst nach 5 Sekunden bewusster Wahrnehmung"],
    correct: 1,
    insight: "Unglaublich aber wahr: In nur 180 Millisekunden entsteht die erste unbewusste Emotion über dich – noch bevor der Verstand überhaupt einschaltet!"
  },
  {
    level: 1,
    question: "Welchen Anteil unserer täglichen Entscheidungen trifft unser Unterbewusstsein?",
    options: ["Etwa die Hälfte – also rund 50%", "Ungefähr 70% aller Entscheidungen", "Nur etwa 30% – wir sind meist rational", "Ganze 90% werden unbewusst gesteuert"],
    correct: 3,
    insight: "90% unserer Entscheidungen werden vom Unterbewusstsein getroffen! Das macht uns zutiefst menschlich – aber auch ablenkbar."
  },
  {
    level: 1,
    question: "Was macht deine Stimme laut Sprechwirkungsforschung so besonders?",
    options: ["Sie kann durch Training perfektioniert werden", "Sie verändert sich ständig und ist daher unwichtig", "Sie existiert weltweit wahrscheinlich nur ein einziges Mal", "Sie ist im digitalen Zeitalter kaum noch relevant"],
    correct: 2,
    insight: "Deine Stimme ist wie ein akustischer Fingerabdruck – sie existiert global wahrscheinlich nur ein einziges Mal!"
  },
  {
    level: 1,
    question: "Warum zieht eine gelbe Ente inmitten von 100 schwarzen Hochglanz-Porsches alle Blicke auf sich?",
    options: ["Weil sie deutlich günstiger ist", "Weil gelb einfach eine auffällige Farbe ist", "Weil Oldtimer generell interessanter sind", "Weil Unverwechselbarkeit dich aus der Masse heraushebt"],
    correct: 3,
    insight: "Wenn Perfektion auf Mausklick möglich ist, wird Unverwechselbarkeit Gold wert! Sei die gelbe Ente, nicht der hundertste perfekte Porsche!"
  },
  {
    level: 1,
    question: "Wie viel schneller verarbeitet unser Gehirn Bilder und Geschichten im Vergleich zu reinen Daten?",
    options: ["Etwa 60.000-mal schneller – Geschichten sind Gehirnnahrung", "Ungefähr 100-mal schneller", "Rund 1.000-mal schneller", "Nur etwa 10-mal schneller"],
    correct: 0,
    insight: "Bilder und Geschichten werden 60.000-mal schneller verarbeitet als Text und Fakten! Deshalb ist Storytelling so kraftvoll."
  },
  {
    level: 1,
    question: "Von welchem Autor stammt: 'Worte sind die mächtigste Droge, die die Menschheit benutzt'?",
    options: ["Sigmund Freud", "Albert Einstein", "Rudyard Kipling", "Mark Twain"],
    correct: 2,
    insight: "Rudyard Kipling erkannte die Macht der Worte. Doch es ist die Emotion, die das Wort trägt, die wirklich wirkt."
  },
  {
    level: 1,
    question: "Was ist die fundamentale Wahrheit über das Verkaufen?",
    options: ["Mit genug Druck kauft am Ende jeder", "Im Internet verkauft sich alles von selbst", "Du kannst niemandem etwas verkaufen – du kannst nur zum Kaufen anregen", "Verkaufen funktioniert nur über Rabatte"],
    correct: 2,
    insight: "Du kannst niemanden zum Kauf zwingen. Aber du kannst durch Authentizität und echte Emotion zum Kaufen ANREGEN!"
  },
  {
    level: 1,
    question: "Was kann künstliche Intelligenz NICHT authentisch übertragen?",
    options: ["Perfekte Antworten in Sekundenbruchteilen", "Echte Emotionen über unsere Spiegelneuronen", "Blitzschnelle Reaktionen auf Anfragen", "Fehlerfreie Kommunikation rund um die Uhr"],
    correct: 1,
    insight: "Spiegelneuronen übertragen echte Emotionen von Mensch zu Mensch. KI kann Emotionen simulieren, aber nicht FÜHLEN!"
  },
  {
    level: 1,
    question: "Wie stehen die meisten Menschen dazu, sich selbst auf Aufnahmen reden zu hören?",
    options: ["Sie lieben es", "Sie mögen es überhaupt nicht", "Es ist ihnen gleichgültig", "Sie analysieren regelmäßig ihre Aufnahmen"],
    correct: 1,
    insight: "Die meisten Menschen mögen sich selbst nicht reden hören. Dabei übersehen sie: Ihre Stimme ist ihr einzigartiges Markenzeichen!"
  },
  {
    level: 2,
    question: "In welcher Reihenfolge reagieren wir neurologisch auf neue Reize?",
    options: ["Verstand → Gefühl → Emotion", "Emotion (unbewusst) → Gefühl → Verstand", "Gefühl → Verstand → Emotion", "Verstand → Emotion → Gefühl"],
    correct: 1,
    insight: "Erst Emotion (180ms), dann Gefühl, dann Verstand! Deshalb sind erste Eindrücke so mächtig – und so schwer zu korrigieren."
  },
  {
    level: 2,
    question: "Wenn 10 Verkäufer exakt dieselben Worte sagen – was entscheidet, wem du vertraust?",
    options: ["Der günstigste Preis", "Die Körpergröße", "Die übertragene Emotion und Kongruenz von Worten, Stimme und Körper", "Die auffälligste Kleidung"],
    correct: 2,
    insight: "Worte sind nur der Träger! Die Emotion und die Kongruenz – die Übereinstimmung von allem – DAS schafft echtes Vertrauen."
  },
  {
    level: 2,
    question: "Warum kann ein perfekt agierender KI-Agent zur 'Mogelpackung' werden?",
    options: ["Weil KI zu teuer ist", "Weil Kunden Technologie ablehnen", "Weil KI Fehler macht", "Weil der Mensch dahinter die perfekten KI-Erwartungen nicht erfüllen kann"],
    correct: 3,
    insight: "Wenn dein KI-Agent perfekt kommuniziert und du dann anders auftrittst, entsteht Enttäuschung. Die Lösung: Durchgängig AUTHENTISCH sein!"
  },
  {
    level: 2,
    question: "Wann ist JEDER Ort automatisch deine Bühne?",
    options: ["Nur bei offiziellen Präsentationen", "Sobald du den Mund aufmachst – egal wo", "Nur wenn du dafür bezahlt wirst", "Nur wenn mehr als 10 Personen zuhören"],
    correct: 1,
    insight: "Ob am Telefon, im Video-Call, im Kundengespräch oder beim Netzwerken – sobald du sprichst, ist es deine Bühne!"
  },
  {
    level: 2,
    question: "Welche Kernfrage solltest du dir stellen, bevor du dein Angebot präsentierst?",
    options: ["Wie verdiene ich am meisten?", "Wie schlage ich die Konkurrenz?", "Welches Problem löse ich für andere – welche Abkürzung bin ich?", "Welchen maximalen Preis kann ich durchsetzen?"],
    correct: 2,
    insight: "Erkenne: Welchen echten Nutzen hat der andere? Welche Abkürzung bist du? Das 'Warum' ist stärker als jedes Feature!"
  },
  {
    level: 2,
    question: "Was bedeutet 'authentisch' im tiefsten Sinne?",
    options: ["Perfekt und fehlerfrei auftreten", "Allen zustimmen und Konflikte vermeiden", "Zu den Worten stehen, die du sagst – Kongruenz leben", "Niemals Fehler zugeben"],
    correct: 2,
    insight: "Authentizität bedeutet Kongruenz: Stimme, Verhalten, Körpersprache und Worte müssen übereinstimmen. Dann entsteht Vertrauen!"
  },
  {
    level: 2,
    question: "Welcher Neurowissenschaftler prägte die '7 A' der Kommunikation?",
    options: ["Daniel Kahneman", "Karsten Bredemeier", "Karsten Brocke", "Gerald Hüther"],
    correct: 2,
    insight: "Karsten Brocke entwickelte die 7 A der Neurokommunikation als Wegweiser für wirkungsvolle, gehirngerechte Kommunikation."
  },
  {
    level: 2,
    question: "Welchen 'Vorteil' hat KI, den Menschen als Nachteil empfinden könnten?",
    options: ["KI ist ständig müde", "KI hat keine eigenen Emotionen, die im Wege stehen", "KI vergisst alles sofort", "KI kann nicht zuhören"],
    correct: 1,
    insight: "KI ist unvoreingenommen, weil keine Emotionen stören. Aber genau diese Emotionen machen DICH einzigartig und vertrauenswürdig!"
  },
  {
    level: 2,
    question: "Was passiert neurologisch, BEVOR wir etwas bewusst wahrnehmen?",
    options: ["Wir analysieren rational", "Wir treffen eine logische Entscheidung", "Eine blitzschnelle emotionale Vorbewertung", "Wir sammeln alle Fakten"],
    correct: 2,
    insight: "Die emotionale Vorbewertung geschieht in Millisekunden – lange bevor der Verstand eingreift. Der erste Eindruck entscheidet!"
  },
  {
    level: 3,
    question: "Was kann ein geschultes Ohr aus einer Stimme NICHT heraushören?",
    options: ["Den emotionalen Zustand", "Unsicherheit oder Selbstbewusstsein", "Die Kontonummer des Sprechers", "Ob die Aussage authentisch gemeint ist"],
    correct: 2,
    insight: "Die Stimme verrät Emotionen, Sicherheit und Authentizität – aber natürlich keine Daten! Sie ist ein Fenster zur Seele."
  },
  {
    level: 3,
    question: "Warum erkennst du einen Anrufer oft sofort, OHNE sein Gesicht zu sehen?",
    options: ["Wegen der Telefonnummer", "Weil die Stimme einzigartig ist und emotionale Erinnerungen aktiviert", "Wegen der Uhrzeit", "Das ist Zufall"],
    correct: 1,
    insight: "Die Stimme ist ein akustischer Fingerabdruck, tief mit emotionalen Erinnerungen verknüpft – so einzigartig wie du selbst!"
  },
  {
    level: 3,
    question: "Warum wird die menschliche Stimme in der Zukunft NOCH wertvoller?",
    options: ["Weil Telefone teurer werden", "Weil KI perfekte Texte generiert, aber keine echte Emotion transportiert", "Weil weniger Menschen sprechen", "Weil Stimmen seltener werden"],
    correct: 1,
    insight: "Je mehr KI kommuniziert, desto wertvoller wird echte menschliche Stimme mit authentischer Emotion!"
  },
  {
    level: 3,
    question: "Was ist der Unterschied zwischen Zuhören und Hinhören?",
    options: ["Kein Unterschied, nur Synonyme", "Zuhören ist aktiv, Hinhören ist passiv", "Hinhören bedeutet, den Menschen wirklich wahrzunehmen", "Zuhören ist höflicher"],
    correct: 2,
    insight: "Hinhören im wahrsten Sinne des Wortes: Den Menschen wirklich wahrnehmen, ohne dass das Unterbewusstsein dich ablenkt."
  },
  {
    level: 3,
    question: "Was ist der größte Vorteil eines Menschen gegenüber seinem KI-Agenten?",
    options: ["Schnellere Antworten", "Die Fähigkeit zu echter emotionaler Verbindung", "Besseres Faktenwissen", "Längere Verfügbarkeit"],
    correct: 1,
    insight: "Echte emotionale Verbindung, Intuition und Spiegelneuronen – das kann keine KI. DAS ist dein uneinholbarer Vorsprung!"
  },
  {
    level: 3,
    question: "Was solltest du tun, um nicht zur 'Mogelpackung' zu werden?",
    options: ["Noch perfekter werden als die KI", "Alle KI-Tools vermeiden", "Durchgängig authentisch sein – online wie offline", "Weniger kommunizieren"],
    correct: 2,
    insight: "Die Lösung ist nicht Perfektion, sondern durchgängige Authentizität. Sei konsistent in allem, was du tust und sagst!"
  },
  {
    level: 3,
    question: "Was ist das wertvollste Marketing-Instrument, das du bereits besitzt?",
    options: ["Deine Social-Media-Kanäle", "Deine Website", "Deine einzigartige Stimme", "Dein Werbebudget"],
    correct: 2,
    insight: "Deine Stimme ist eines der wertvollsten Marketing-Instrumente unserer Zeit – einzigartig, authentisch und nicht kopierbar!"
  },
  {
    level: 3,
    question: "Was ist die wichtigste Frage nach diesem Quiz?",
    options: ["Wie werde ich perfekter?", "Welche KI-Tools brauche ich?", "Was macht MICH einzigartig – und wie zeige ich das der Welt?", "Wie kopiere ich erfolgreiche Menschen?"],
    correct: 2,
    insight: "Die entscheidende Frage ist nicht, wie du perfekter wirst – sondern wie du deine EINZIGARTIGKEIT erkennst und lebst!"
  },
  {
    level: 3,
    question: "Welches Bild beschreibt am besten deine Aufgabe im KI-Zeitalter?",
    options: ["Der perfekte Roboter", "Die gelbe Ente unter 100 schwarzen Porsches", "Der unsichtbare Beobachter", "Der schnellste Rechner"],
    correct: 1,
    insight: "Sei die gelbe Ente! Nicht perfekt, aber unverwechselbar. In einer Welt der Perfektion wird Einzigartigkeit Gold wert."
  }
];

const flashcards: Flashcard[] = [
  { front: "Wie schnell entsteht der erste Eindruck?", back: "180 Millisekunden – schneller als ein Wimpernschlag, noch bevor der Verstand einschaltet." },
  { front: "Wie viel Prozent unserer Entscheidungen sind unbewusst?", back: "90% – Das Unterbewusstsein steuert den Großteil unseres Verhaltens." },
  { front: "Was macht deine Stimme einzigartig?", back: "Sie existiert weltweit wahrscheinlich nur ein einziges Mal – wie ein akustischer Fingerabdruck." },
  { front: "Was ist das 'Gelbe Ente'-Prinzip?", back: "Unverwechselbarkeit hebt dich aus der Masse heraus – sei einzigartig, nicht perfekt." },
  { front: "Wie viel schneller verarbeitet das Gehirn Bilder vs. Daten?", back: "60.000-mal schneller! Deshalb ist Storytelling so kraftvoll." },
  { front: "Was kann KI nicht authentisch übertragen?", back: "Echte Emotionen über Spiegelneuronen – KI kann simulieren, aber nicht fühlen." },
  { front: "Was bedeutet 'Authentizität'?", back: "Kongruenz: Stimme, Verhalten, Körpersprache und Worte stimmen überein." },
  { front: "Wer prägte die '7 A' der Neurokommunikation?", back: "Neurowissenschaftler Karsten Brocke." },
  { front: "Warum wird der Mensch zur 'Mogelpackung'?", back: "Wenn sein KI-Agent perfekt agiert, er selbst aber anders auftritt – Erwartungsenttäuschung." },
  { front: "Wann ist jeder Ort deine Bühne?", back: "Sobald du den Mund aufmachst – egal ob Telefon, Video, Netzwerkevent oder Meeting." },
  { front: "Was ist die Kernfrage vor jeder Präsentation?", back: "Welches Problem löse ich? Welche Abkürzung bin ich für den anderen?" },
  { front: "In welcher Reihenfolge reagieren wir neurologisch?", back: "1. Emotion (180ms) → 2. Gefühl → 3. Verstand" },
  { front: "Was entscheidet, wem wir vertrauen?", back: "Die übertragene Emotion und Kongruenz von Worten, Stimme und Körpersprache." },
  { front: "Wer sagte: 'Worte sind die mächtigste Droge'?", back: "Rudyard Kipling – aber es ist die Emotion, die das Wort trägt, die wirklich wirkt." },
  { front: "Was ist die Wahrheit über Verkaufen?", back: "Du kannst niemandem etwas verkaufen – du kannst nur zum Kaufen anregen." },
  { front: "Was unterscheidet Zuhören von Hinhören?", back: "Hinhören bedeutet, den Menschen wirklich wahrzunehmen, ohne Ablenkung durch das Unterbewusstsein." },
  { front: "Was ist dein größter Vorteil gegenüber KI?", back: "Echte emotionale Verbindung, Intuition und Spiegelneuronen – nicht kopierbar!" },
  { front: "Was ist das wertvollste Marketing-Instrument?", back: "Deine einzigartige Stimme – authentisch und nicht kopierbar." },
  { front: "Warum mögen Menschen sich selbst nicht hören?", back: "Die Stimme klingt für uns anders als für andere – wir unterschätzen ihr Potenzial." },
  { front: "Was macht 38% unserer Wirkung aus?", back: "Die Stimme! (7% Worte, 38% Stimme, 55% Körpersprache)" },
  { front: "Warum wird die Kamera zur Herausforderung?", back: "Sie 'schluckt' etwa 20% deiner Energie – du musst mehr geben, um natürlich zu wirken." },
  { front: "Was ist der häufigste Kamera-Fehler?", back: "Nicht in die Linse schauen, sondern auf den Bildschirm – verliert emotionale Verbindung." },
  { front: "Wie lautet die wichtigste Frage im KI-Zeitalter?", back: "Was macht MICH einzigartig – und wie zeige ich das der Welt?" },
  { front: "Warum wird menschliche Stimme wertvoller?", back: "Je mehr KI kommuniziert, desto wertvoller wird echte Emotion und Authentizität." },
  { front: "Was ist die Lösung gegen die 'Mogelpackung'?", back: "Durchgängig authentisch sein – online wie offline, konsistent in allem." }
];

export default function WirkungskraftQuiz() {
  const [mode, setMode] = useState<'quiz' | 'flashcards' | null>(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === quizData[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const markKnown = () => {
    setKnownCards([...knownCards, currentCard]);
    nextCard();
  };

  const markUnknown = () => {
    setUnknownCards([...unknownCards, currentCard]);
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentCard < flashcards.length - 1) {
        setCurrentCard(currentCard + 1);
      }
    }, 300);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentCard > 0) {
        setCurrentCard(currentCard - 1);
      }
    }, 300);
  };

  const restartFlashcards = () => {
    setCurrentCard(0);
    setFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  };

  const getResultLevel = () => {
    const pct = (score / quizData.length) * 100;
    if (pct >= 90) return { title: "Wirkungskraft-Meister!", emoji: "🏆", text: "Du verstehst die Kraft menschlicher Einzigartigkeit perfekt!" };
    if (pct >= 75) return { title: "Exzellent!", emoji: "🌟", text: "Du hast ein starkes Fundament für deine Wirkungskraft." };
    if (pct >= 60) return { title: "Gut gemacht!", emoji: "💪", text: "Du bist auf dem richtigen Weg. Vertiefe dein Wissen!" };
    if (pct >= 40) return { title: "Guter Start!", emoji: "🚀", text: "Die Reise zur Einzigartigkeit beginnt jetzt!" };
    return { title: "Willkommen!", emoji: "🌱", text: "Jetzt weißt du, wo du ansetzen kannst!" };
  };

  const getLevelBadge = (level: number) => {
    if (level === 1) return { class: "bg-green-50 text-green-700", text: "Einstieg" };
    if (level === 2) return { class: "bg-amber-50 text-amber-700", text: "Fortgeschritten" };
    return { class: "bg-red-50 text-red-700", text: "Experte" };
  };

  if (!mode) {
    return (
      <>
        <SEO
          title="Wirkungskraft Mensch im KI-Zeitalter | Quiz & Lernkarten"
          description="27 Fragen & 25 Lernkarten: Entdecke deine einzigartige Wirkungskraft im KI-Zeitalter."
        />

        <div className="min-h-screen bg-[#FBF8F3]">
          <Navigation />

          <div className="min-h-screen flex items-center justify-center p-4 pt-24">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-[#C9A227]/10 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#C9A227] to-[#DAA520] flex items-center justify-center text-3xl mx-auto mb-6">
                  💎
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A2E] mb-4">
                  Wirkungskraft Mensch<br/>
                  <span className="text-[#C9A227]">im KI-Zeitalter</span>
                </h1>

                <p className="text-gray-600 mb-8 text-lg">
                  Entdecke, was dich einzigartig macht – mit Quiz oder Lernkarten
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button
                    onClick={() => setMode('quiz')}
                    className="bg-white border-2 border-gray-200 hover:border-[#C9A227] rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 min-w-[200px]"
                  >
                    <div className="text-4xl mb-3">🎯</div>
                    <div className="font-bold text-[#1A1A2E] text-xl mb-2">Quiz starten</div>
                    <div className="text-gray-500 text-sm">27 Fragen · 3 Level</div>
                  </button>

                  <button
                    onClick={() => setMode('flashcards')}
                    className="bg-white border-2 border-gray-200 hover:border-[#C9A227] rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 min-w-[200px]"
                  >
                    <div className="text-4xl mb-3">🃏</div>
                    <div className="font-bold text-[#1A1A2E] text-xl mb-2">Lernkarten</div>
                    <div className="text-gray-500 text-sm">25 Karten zum Lernen</div>
                  </button>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Auf <a href="https://claudiaconen.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline font-medium">claudiaconen.com</a> gibt es noch mehr zu entdecken
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }

  if (mode === 'flashcards') {
    const isComplete = currentCard >= flashcards.length - 1 && (knownCards.includes(currentCard) || unknownCards.includes(currentCard));

    if (isComplete) {
      return (
        <>
          <SEO title="Lernkarten Abgeschlossen | Wirkungskraft Quiz" description="Du hast alle Lernkarten durchgearbeitet!" />

          <div className="min-h-screen bg-[#FBF8F3]">
            <Navigation />

            <div className="min-h-screen flex items-center justify-center p-4 pt-24">
              <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-[#C9A227]/10">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-4">
                  Alle Karten durchgearbeitet!
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600">{knownCards.length}</div>
                    <div className="text-green-700">Gewusst ✓</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-amber-600">{unknownCards.length}</div>
                    <div className="text-amber-700">Noch lernen</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={restartFlashcards}
                    className="bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                  >
                    🔄 Nochmal durchgehen
                  </button>
                  <button
                    onClick={() => setMode(null)}
                    className="bg-white border-2 border-[#1A1A2E] text-[#1A1A2E] font-semibold px-8 py-4 rounded-full hover:bg-[#1A1A2E] hover:text-white transition-all"
                  >
                    ← Zurück zur Auswahl
                  </button>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </>
      );
    }

    return (
      <>
        <SEO title="Lernkarten | Wirkungskraft Quiz" description="25 Lernkarten über Wirkungskraft im KI-Zeitalter" />

        <div className="min-h-screen bg-[#FBF8F3]">
          <Navigation />

          <div className="min-h-screen flex items-center justify-center p-4 pt-24">
            <div className="max-w-xl w-full">
              <div className="text-center mb-6">
                <button
                  onClick={() => setMode(null)}
                  className="text-gray-500 hover:text-[#C9A227] text-sm mb-4 transition-colors"
                >
                  ← Zurück zur Auswahl
                </button>
                <h1 className="text-2xl font-serif font-bold text-[#1A1A2E]">Lernkarten</h1>
                <p className="text-gray-500 mt-1">Karte {currentCard + 1} von {flashcards.length}</p>

                <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A227] to-[#DAA520] rounded-full transition-all duration-500"
                    style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
                  />
                </div>
              </div>

              <div
                onClick={() => setFlipped(!flipped)}
                className="cursor-pointer perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full h-80 transition-transform duration-600"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div
                    className="absolute w-full h-full bg-white rounded-3xl border-2 border-[#C9A227]/20 shadow-2xl flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="text-4xl mb-4">❓</div>
                    <p className="text-xl font-bold text-[#1A1A2E]">{flashcards[currentCard].front}</p>
                    <p className="text-gray-400 mt-4 text-sm">Tippe zum Umdrehen</p>
                  </div>
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-[#C9A227] to-[#DAA520] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-4xl mb-4">💡</div>
                    <p className="text-lg">{flashcards[currentCard].back}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={markUnknown}
                  className="bg-white border-2 border-gray-200 text-[#1A1A2E] font-semibold px-6 py-3 rounded-full hover:border-[#C9A227] hover:bg-[#FBF8F3] transition-all flex items-center gap-2"
                >
                  ❌ Noch lernen
                </button>
                <button
                  onClick={markKnown}
                  className="bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-2"
                >
                  ✓ Gewusst!
                </button>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  className={`text-sm ${currentCard === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-[#C9A227]'} transition-colors`}
                >
                  ← Vorherige
                </button>
                <div className="text-sm text-gray-400">
                  ✓ {knownCards.length} | ❌ {unknownCards.length}
                </div>
                <button
                  onClick={nextCard}
                  disabled={currentCard >= flashcards.length - 1}
                  className={`text-sm ${currentCard >= flashcards.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-[#C9A227]'} transition-colors`}
                >
                  Nächste →
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }

  if (quizComplete) {
    const result = getResultLevel();
    return (
      <>
        <SEO title="Quiz Abgeschlossen | Wirkungskraft Quiz" description={`Du hast ${score} von ${quizData.length} Fragen richtig beantwortet!`} />

        <div className="min-h-screen bg-[#FBF8F3]">
          <Navigation />

          <div className="min-h-screen flex items-center justify-center p-4 pt-24">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-[#C9A227]/10">
              <div className="text-6xl mb-4">{result.emoji}</div>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-2">{result.title}</h2>
              <div className="text-5xl font-bold text-[#C9A227] my-6">{score} / {quizData.length}</div>
              <p className="text-gray-600 mb-8">{result.text}</p>

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
                >
                  🔄 Nochmal spielen
                </button>
                <button
                  onClick={() => setMode('flashcards')}
                  className="bg-white border-2 border-[#1A1A2E] text-[#1A1A2E] font-semibold px-8 py-4 rounded-full hover:bg-[#1A1A2E] hover:text-white transition-all"
                >
                  🃏 Zu den Lernkarten
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Auf <a href="https://claudiaconen.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline font-medium">claudiaconen.com</a> gibt es noch mehr zu entdecken
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Erstellt von Ann-Kathrin Andresen & Claudia Conen
                </p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }

  const levelBadge = getLevelBadge(quizData[currentQ].level);

  return (
    <>
      <SEO title="Wirkungskraft Quiz | Teste dein Wissen" description="27 Fragen in 3 Levels über Wirkungskraft im KI-Zeitalter" />

      <div className="min-h-screen bg-[#FBF8F3]">
        <Navigation />

        <div className="min-h-screen flex items-center justify-center p-4 pt-24">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-6">
              <button
                onClick={() => setMode(null)}
                className="text-gray-500 hover:text-[#C9A227] text-sm mb-4 transition-colors"
              >
                ← Zurück zur Auswahl
              </button>
              <h1 className="text-2xl font-serif font-bold text-[#1A1A2E]">
                Wirkungskraft-Quiz
              </h1>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-[#C9A227]/10">
              <div className="flex justify-between items-center mb-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${levelBadge.class}`}>
                  {levelBadge.text}
                </span>
                <span className="text-sm text-gray-500">
                  Frage {currentQ + 1} / {quizData.length}
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A227] to-[#DAA520] rounded-full transition-all duration-500"
                  style={{ width: `${((currentQ + 1) / quizData.length) * 100}%` }}
                />
              </div>

              <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">{quizData[currentQ].question}</h2>

              <div className="space-y-3 mb-6">
                {quizData[currentQ].options.map((option, index) => {
                  let className = "border-2 rounded-xl p-4 cursor-pointer transition-all ";
                  if (showResult) {
                    if (index === quizData[currentQ].correct) {
                      className += "border-green-500 bg-green-50";
                    } else if (index === selected) {
                      className += "border-red-400 bg-red-50";
                    } else {
                      className += "border-gray-200";
                    }
                  } else {
                    className += "border-gray-200 hover:border-[#C9A227] hover:bg-[#FBF8F3]";
                  }

                  return (
                    <div key={index} onClick={() => handleAnswer(index)} className={className}>
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showResult && index === quizData[currentQ].correct
                            ? 'bg-green-500 text-white'
                            : showResult && index === selected
                            ? 'bg-red-400 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium text-gray-800">{option}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {showResult && (
                <div className="bg-[#FBF8F3] border-l-4 border-[#C9A227] rounded-r-2xl p-5 mb-6">
                  <p className="font-bold text-[#C9A227] mb-1">💡 Insight:</p>
                  <p className="text-gray-700">{quizData[currentQ].insight}</p>
                </div>
              )}

              {showResult && (
                <button
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all"
                >
                  {currentQ < quizData.length - 1 ? 'Nächste Frage →' : 'Ergebnis ansehen →'}
                </button>
              )}

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <span className="text-sm text-[#C9A227] font-semibold">{score} Punkte</span>
                <span className="text-sm text-gray-400">
                  Level {quizData[currentQ].level} von 3
                </span>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Auf <Link to="/" className="text-[#C9A227] hover:underline font-medium">claudiaconen.com</Link> gibt es noch mehr zu entdecken
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
