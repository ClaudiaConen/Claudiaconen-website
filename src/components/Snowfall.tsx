import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  delay: number;
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 5,
        opacity: Math.random() * 0.3 + 0.2,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            top: '-10%',
            filter: 'drop-shadow(0 0 2px rgba(135, 206, 235, 0.9))',
            textShadow: '0 0 3px rgba(135, 206, 235, 0.8), 0 0 5px rgba(135, 206, 235, 0.5)',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(flake.id) * 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.animationDuration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          <span className="text-sky-400">❄</span>
        </motion.div>
      ))}
    </div>
  );
}
