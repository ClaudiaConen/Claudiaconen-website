import { useEffect, useState } from 'react';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import { Award, Lock, Trophy, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  achievement_key: string;
  title: string;
  description: string;
  icon_emoji: string;
  xp_reward: number;
  is_unlocked: boolean;
  unlocked_at?: string;
}

export default function MemberAchievements() {
  const { student } = useStudentAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, [student]);

  const loadAchievements = async () => {
    try {
      const { data: allAchievements } = await supabase
        .from('member_achievements')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      const { data: unlockedAchievements } = await supabase
        .from('member_student_achievements')
        .select('achievement_id, unlocked_at')
        .eq('student_id', student?.id);

      const unlockedMap = new Map(
        unlockedAchievements?.map((a) => [a.achievement_id, a.unlocked_at]) || []
      );

      const formatted: Achievement[] = (allAchievements || []).map((a) => ({
        id: a.id,
        achievement_key: a.achievement_key,
        title: a.title,
        description: a.description,
        icon_emoji: a.icon_emoji,
        xp_reward: a.xp_reward,
        is_unlocked: unlockedMap.has(a.id),
        unlocked_at: unlockedMap.get(a.id),
      }));

      setAchievements(formatted);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unlockedCount = achievements.filter((a) => a.is_unlocked).length;
  const totalXpEarned = achievements
    .filter((a) => a.is_unlocked)
    .reduce((sum, a) => sum + a.xp_reward, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Achievements</h1>
          <p className="text-slate-600">
            Schalte Erfolge frei und sammle Belohnungen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <Trophy className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Freigeschaltet</p>
            <p className="text-4xl font-bold">
              {unlockedCount} / {achievements.length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
            <Award className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Gesamt XP</p>
            <p className="text-4xl font-bold">{totalXpEarned}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
            <Sparkles className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Fortschritt</p>
            <p className="text-4xl font-bold">
              {achievements.length > 0
                ? Math.round((unlockedCount / achievements.length) * 100)
                : 0}
              %
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl ${
                  achievement.is_unlocked ? 'border-2 border-amber-200' : 'opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`text-4xl w-16 h-16 rounded-full flex items-center justify-center ${
                      achievement.is_unlocked ? 'bg-amber-100' : 'bg-slate-100'
                    }`}
                  >
                    {achievement.is_unlocked ? achievement.icon_emoji : <Lock className="w-8 h-8 text-slate-400" />}
                  </div>

                  {achievement.is_unlocked && (
                    <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>+{achievement.xp_reward}</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{achievement.description}</p>

                {achievement.is_unlocked && achievement.unlocked_at && (
                  <p className="text-xs text-slate-400">
                    Freigeschaltet am{' '}
                    {new Date(achievement.unlocked_at).toLocaleDateString('de-DE')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
