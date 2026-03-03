import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  CreditCard,
  BookOpen,
  Loader2,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  lesson_title: string;
  lesson_id: string;
  total_cards: number;
  mastered_cards: number;
  due_today: number;
}

export default function MemberFlashcards() {
  const { student } = useStudentAuth();
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDecks: 0,
    totalCards: 0,
    masteredCards: 0,
    dueToday: 0,
  });

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const { data: decksData, error: decksError } = await supabase
        .from('member_flashcard_decks')
        .select(`
          id,
          title,
          description,
          xp_reward,
          member_course_lessons!inner (
            id,
            title
          )
        `);

      if (decksError) throw decksError;

      const decksWithProgress = await Promise.all(
        decksData.map(async (deck: any) => {
          const { count: totalCards } = await supabase
            .from('member_flashcards')
            .select('*', { count: 'exact', head: true })
            .eq('deck_id', deck.id);

          const { data: flashcardIds } = await supabase
            .from('member_flashcards')
            .select('id')
            .eq('deck_id', deck.id);

          const ids = flashcardIds?.map(f => f.id) || [];

          const { data: progressData } = ids.length > 0
            ? await supabase
                .from('member_student_flashcard_progress')
                .select('mastery_level, next_review_at')
                .eq('student_id', student?.id)
                .in('flashcard_id', ids)
            : { data: [] };

          const masteredCards = progressData?.filter(p => p.mastery_level === 3).length || 0;
          const dueToday = progressData?.filter(p =>
            p.next_review_at && new Date(p.next_review_at) <= new Date()
          ).length || 0;

          return {
            id: deck.id,
            title: deck.title,
            description: deck.description,
            xp_reward: deck.xp_reward,
            lesson_title: deck.member_course_lessons.title,
            lesson_id: deck.member_course_lessons.id,
            total_cards: totalCards || 0,
            mastered_cards: masteredCards,
            due_today: dueToday,
          };
        })
      );

      setDecks(decksWithProgress);

      const totalDecks = decksWithProgress.length;
      const totalCards = decksWithProgress.reduce((sum, d) => sum + d.total_cards, 0);
      const masteredCards = decksWithProgress.reduce((sum, d) => sum + d.mastered_cards, 0);
      const dueToday = decksWithProgress.reduce((sum, d) => sum + d.due_today, 0);

      setStats({
        totalDecks,
        totalCards,
        masteredCards,
        dueToday,
      });
    } catch (error) {
      console.error('Error loading flashcard decks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMasteryPercentage = (mastered: number, total: number) => {
    return total > 0 ? Math.round((mastered / total) * 100) : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Flashcards</h1>
          <p className="text-slate-600">
            Lerne mit Karteikarten und verbessere dein Langzeitgedächtnis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 rounded-lg p-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-600">Decks</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalDecks}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-purple-100 rounded-lg p-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-600">Karten</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalCards}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-green-100 rounded-lg p-2">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-600">Gemeistert</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.masteredCards}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-amber-100 rounded-lg p-2">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-600">Fällig heute</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.dueToday}</p>
          </div>
        </div>

        {decks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Flashcard-Decks</h3>
            <p className="text-slate-600 mb-6">
              Es sind noch keine Flashcard-Decks verfügbar.
            </p>
            <Link
              to="/member/courses"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              <BookOpen className="w-5 h-5" />
              <span>Zu den Kursen</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decks.map((deck) => {
              const masteryPercentage = getMasteryPercentage(
                deck.mastered_cards,
                deck.total_cards
              );

              return (
                <div
                  key={deck.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {deck.title}
                      </h3>
                      <Link
                        to={`/member/lesson/${deck.lesson_id}`}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {deck.lesson_title}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">+{deck.xp_reward} XP</span>
                    </div>
                  </div>

                  {deck.description && (
                    <p className="text-slate-600 text-sm mb-4">{deck.description}</p>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                      <span>Fortschritt</span>
                      <span>{masteryPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${masteryPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-lg font-bold text-slate-900">{deck.total_cards}</p>
                      <p className="text-xs text-slate-600">Karten</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">
                        {deck.mastered_cards}
                      </p>
                      <p className="text-xs text-green-600">Gemeistert</p>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-lg font-bold text-amber-600">{deck.due_today}</p>
                      <p className="text-xs text-amber-600">Fällig</p>
                    </div>
                  </div>

                  <Link
                    to={`/member/flashcards/${deck.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-2 group"
                  >
                    {deck.due_today > 0 ? (
                      <>
                        <Clock className="w-5 h-5" />
                        <span>Üben ({deck.due_today} fällig)</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5" />
                        <span>Üben starten</span>
                      </>
                    )}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
