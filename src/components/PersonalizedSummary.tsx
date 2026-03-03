import { motion } from 'framer-motion';

interface PersonalizedSummaryProps {
  userName?: string;
  industry: string;
  goal: string;
  channels: string[];
  frequency: string;
}

export function PersonalizedSummary({
  userName,
  industry,
  goal,
  channels
}: PersonalizedSummaryProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <h3 className="text-[32px] text-[#1a2744] mb-4 font-semibold">
        {userName ? (
          <>
            <span className="text-[#e8b84a]">{userName}</span>s Contentplan
          </>
        ) : (
          'Dein Contentplan'
        )}
      </h3>

      <div className="bg-[#f5f5f5] border-l-4 border-[#e8b84a] rounded-r-lg" style={{ padding: '20px 24px' }}>
        <div className="space-y-3 text-[15px] text-[#1e3a5f]">
          <p>
            <span className="font-bold">Branche:</span> <span className="font-normal">{industry || 'Nicht angegeben'}</span>
          </p>
          <p>
            <span className="font-bold">Ziel:</span> <span className="font-normal">{goal || 'Nicht angegeben'}</span>
          </p>
          <p>
            <span className="font-bold">Plattformen:</span> <span className="font-normal">{channels.length > 0 ? channels.join(', ') : 'Nicht angegeben'}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
