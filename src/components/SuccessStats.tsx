import { motion } from 'framer-motion';
import { Trophy, FileText, Clock, Star } from 'lucide-react';
import { AchievementBadge } from './AchievementBadge';

interface SuccessStatsProps {
  postsCreated: number;
  timesSaved: number;
  points?: number;
  showBadges?: boolean;
}

export function SuccessStats({
  postsCreated,
  timesSaved,
  points = 50,
  showBadges = true
}: SuccessStatsProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 text-4xl font-bold text-[#e8b84a] mb-2">
          <Trophy className="w-10 h-10" />
          <span>GESCHAFFT!</span>
        </div>
        <p className="text-xl text-[#1e3a5f] font-light">
          Du hast deinen Contentplan erstellt
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-br from-[#e8b84a]/10 to-[#e8b84a]/5 border border-[#e8b84a]/30 rounded-2xl p-8"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e8b84a]/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#e8b84a] rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#1e3a5f]/70 font-light">Punkte gesammelt</p>
                <p className="text-2xl font-bold text-[#e8b84a]">+{points}</p>
              </div>
            </div>
            <p className="text-xs text-[#1e3a5f]/60">Für deinen ersten Plan</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-[#e8b84a]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1e3a5f]">{postsCreated}</p>
                <p className="text-xs text-[#1e3a5f]/70">Posts erstellt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-[#e8b84a]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1e3a5f]">~{timesSaved}h</p>
                <p className="text-xs text-[#1e3a5f]/70">Zeitersparnis</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {showBadges && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4 text-center">
            Deine Erfolge
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <AchievementBadge
              icon="🏆"
              title="Erste Woche geplant"
              delay={1.1}
            />
            <AchievementBadge
              icon="🌟"
              title="Plan erstellt"
              delay={1.2}
            />
            <AchievementBadge
              icon="🚀"
              title="Durchstarter"
              delay={1.3}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
