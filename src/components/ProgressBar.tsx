import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  showSuccess?: boolean;
}

const PROGRESS_VALUES: Record<number, number> = {
  1: 14,
  2: 28,
  3: 42,
  4: 57,
  5: 71,
  6: 85,
  7: 100
};

const Confetti = () => {
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 0.5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute w-2 h-2 bg-[#e8b84a] rounded-full"
          initial={{
            x: `${item.x}vw`,
            y: -20,
            opacity: 1,
            rotate: 0
          }}
          animate={{
            y: '100vh',
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
};

export function ProgressBar({ currentStep, totalSteps = 7, showSuccess = false }: ProgressBarProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const progressPercent = PROGRESS_VALUES[currentStep] || 0;

  useEffect(() => {
    if (showSuccess && currentStep > 1) {
      setShowCheckmark(true);
      const timer = setTimeout(() => setShowCheckmark(false), 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, showSuccess]);

  useEffect(() => {
    if (currentStep === 7 && progressPercent === 100) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, progressPercent]);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="relative h-1 bg-[#e0e0e0]">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#e8b84a]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {showCheckmark && (
            <motion.div
              className="absolute right-4 -top-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-6 h-6 bg-[#e8b84a] rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="px-12 py-3">
          <div className="flex justify-between items-center">
            {currentStep === 7 && progressPercent === 100 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-base text-[#e8b84a] font-semibold">
                  🎉 Geschafft!
                </p>
              </motion.div>
            )}
            <p className="text-sm text-[#1e3a5f] font-light ml-auto">
              Schritt {currentStep} von {totalSteps} • {progressPercent}% geschafft
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
