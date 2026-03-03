import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  ArrowLeft,
  Loader2,
  RotateCcw,
  CheckCircle2,
  Award,
  Star,
  TrendingUp,
} from 'lucide-react';

interface Flashcard {
  id: string;
  front_text: string;
  back_text: string;
  mastery_level: number;
  review_count: number;
}

interface Deck {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  lesson_id: string;
}

export default function MemberFlashcardTrainer() {
  const { deckId } = useParams();
  const { student } = useStudentAuth();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsReviewed: 0,
    xpEarned: 0,
  });

  useEffect(() => {
    if (deckId) {
      loadDeck();
    }
  }, [deckId]);

  const loadDeck = async () => {
    try {
      const { data: deckData, error: deckError } = await supabase
        .from('member_flashcard_decks')
        .select('*, member_course_lessons!inner (id)')
        .eq('id', deckId)
        .single();

      if (deckError) throw deckError;

      setDeck({
        ...deckData,
        lesson_id: deckData.member_course_lessons.id,
      });

      const { data: flashcardsData, error: flashcardsError } = await supabase
        .from('member_flashcards')
        .select('*')
        .eq('deck_id', deckId)
        .order('order_index', { ascending: true });

      if (flashcardsError) throw flashcardsError;

      const cardsWithProgress = await Promise.all(
        flashcardsData.map(async (card: any) => {
          const { data: progressData } = await supabase
            .from('member_student_flashcard_progress')
            .select('mastery_level, review_count, next_review_at')
            .eq('student_id', student?.id)
            .eq('flashcard_id', card.id)
            .maybeSingle();

          return {
            ...card,
            mastery_level: progressData?.mastery_level || 0,
            review_count: progressData?.review_count || 0,
            next_review_at: progressData?.next_review_at,
          };
        })
      );

      const dueCards = cardsWithProgress.filter(
        (card) =>
          !card.next_review_at || new Date(card.next_review_at) <= new Date()
      );

      if (dueCards.length === 0) {
        setCards(cardsWithProgress);
      } else {
        setCards(dueCards);
      }
    } catch (error) {
      console.error('Error loading deck:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = async (difficulty: 'hard' | 'medium' | 'easy') => {
    const currentCard = cards[currentCardIndex];
    if (!currentCard) return;

    const masteryChange = {
      hard: 0,
      medium: 1,
      easy: 2,
    };

    const newMasteryLevel = Math.min(
      3,
      Math.max(0, currentCard.mastery_level + (difficulty === 'hard' ? -1 : masteryChange[difficulty]))
    );

    const intervals = [
      1,
      3,
      7,
      14,
    ];
    const interval = intervals[newMasteryLevel] || 1;
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-flashcard-progress`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            studentId: student?.id,
            flashcardId: currentCard.id,
            masteryLevel: newMasteryLevel,
            nextReviewAt: nextReviewDate.toISOString(),
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSessionStats({
          cardsReviewed: sessionStats.cardsReviewed + 1,
          xpEarned: sessionStats.xpEarned + (result.xpEarned || 0),
        });

        if (currentCardIndex < cards.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
          setIsFlipped(false);
        } else {
          setSessionComplete(true);
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setSessionStats({ cardsReviewed: 0, xpEarned: 0 });
    loadDeck();
  };

  const currentCard = cards[currentCardIndex];
  const progress = cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0;

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

  if (!deck) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Deck nicht gefunden</h2>
            <Link
              to="/member/flashcards"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Zurück zu den Flashcards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h1 className="text-4xl font-bold mb-2">Session abgeschlossen!</h1>
              <p className="text-white/90 text-lg mb-6">
                Großartig! Du hast alle Karten dieser Session durchgearbeitet.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{sessionStats.cardsReviewed}</div>
                  <div className="text-sm text-white/80">Karten gelernt</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">+{sessionStats.xpEarned} XP</div>
                  <div className="text-sm text-white/80">Verdient</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-900 font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nochmal üben</span>
            </button>

            <Link
              to={`/member/lesson/${deck.lesson_id}`}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition text-center flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Zurück zur Lektion</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Alle Karten sind aktuell!
            </h3>
            <p className="text-slate-600 mb-6">
              Es sind derzeit keine Karten zur Wiederholung fällig. Komm später wieder!
            </p>
            <Link
              to="/member/flashcards"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zu den Flashcards</span>
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
            to="/member/flashcards"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zu den Flashcards</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{deck.title}</h1>
                {deck.description && (
                  <p className="text-slate-600">{deck.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-lg">
                <Award className="w-5 h-5" />
                <span className="font-medium">+{deck.xp_reward} XP</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Fortschritt</span>
                <span>
                  Karte {currentCardIndex + 1} von {cards.length}
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

        {currentCard && (
          <div className="mb-6">
            <div
              className="relative bg-white rounded-2xl shadow-lg p-8 cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{ minHeight: '400px' }}
              onClick={handleFlip}
            >
              <div className="absolute top-4 right-4 flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentCard.mastery_level
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center h-full min-h-[320px]">
                <div className="text-center">
                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">
                    {isFlipped ? 'Rückseite' : 'Vorderseite'}
                  </p>
                  <p className="text-2xl font-medium text-slate-900">
                    {isFlipped ? currentCard.back_text : currentCard.front_text}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 text-sm text-slate-400">
                Klicke zum Umdrehen
              </div>
            </div>

            {isFlipped && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <p className="text-center text-slate-700 mb-4 font-medium">
                  Wie gut kanntest du die Antwort?
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleRating('hard')}
                    className="bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-4 px-4 rounded-xl transition border-2 border-red-200"
                  >
                    <div className="text-xl mb-1">😓</div>
                    <div>Schwer</div>
                    <div className="text-xs mt-1">Nochmal in 1 Tag</div>
                  </button>

                  <button
                    onClick={() => handleRating('medium')}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold py-4 px-4 rounded-xl transition border-2 border-amber-200"
                  >
                    <div className="text-xl mb-1">🤔</div>
                    <div>Mittel</div>
                    <div className="text-xs mt-1">Nochmal in 3 Tagen</div>
                  </button>

                  <button
                    onClick={() => handleRating('easy')}
                    className="bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-4 px-4 rounded-xl transition border-2 border-green-200"
                  >
                    <div className="text-xl mb-1">😊</div>
                    <div>Einfach</div>
                    <div className="text-xs mt-1">Nochmal in 7 Tagen</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
          <strong>Tipp:</strong> Verwende die Spaced Repetition-Methode für optimales Lernen.
          Je öfter du eine Karte richtig beantwortest, desto seltener wird sie dir angezeigt.
        </div>
      </div>
    </div>
  );
}
