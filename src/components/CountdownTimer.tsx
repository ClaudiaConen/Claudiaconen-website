import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Tage', value: timeLeft.days },
    { label: 'Stunden', value: timeLeft.hours },
    { label: 'Minuten', value: timeLeft.minutes },
    { label: 'Sekunden', value: timeLeft.seconds }
  ];

  return (
    <div className="bg-gradient-to-r from-[#C9A227]/10 to-[#F5E6B3]/10 border-2 border-[#C9A227]/30 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="text-[#C9A227]" size={24} />
        <p className="text-lg font-semibold text-[#1A1A1A]">Angebot endet in:</p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {timeUnits.map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#C9A227] text-white rounded-xl p-3 md:p-4 w-full text-center shadow-lg">
              <span className="text-2xl md:text-4xl font-bold block">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs md:text-sm text-[#666666] mt-2 font-medium">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
