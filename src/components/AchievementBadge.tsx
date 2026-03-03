import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  icon: string;
  title: string;
  unlocked?: boolean;
  delay?: number;
}

export function AchievementBadge({ icon, title, unlocked = true, delay = 0 }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
        unlocked
          ? 'bg-gradient-to-br from-[#e8b84a]/10 to-[#e8b84a]/5 border border-[#e8b84a]/30'
          : 'bg-gray-100 border border-gray-300 opacity-50'
      }`}
    >
      <div className={`text-3xl ${unlocked ? '' : 'grayscale'}`}>
        {icon}
      </div>
      <p className={`text-xs text-center font-medium ${
        unlocked ? 'text-[#1e3a5f]' : 'text-gray-500'
      }`}>
        {title}
      </p>
    </motion.div>
  );
}
