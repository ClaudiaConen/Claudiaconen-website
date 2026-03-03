import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';

interface AudioButtonProps {
  audioUrl: string;
  ariaLabel?: string;
}

let currentPlayingAudio: HTMLAudioElement | null = null;

export default function AudioButton({ audioUrl, ariaLabel }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadstart', () => setIsLoading(true));
    audio.addEventListener('canplay', () => setIsLoading(false));
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('play', () => setIsPlaying(true));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (currentPlayingAudio && currentPlayingAudio !== audioRef.current) {
        currentPlayingAudio.pause();
      }
      currentPlayingAudio = audioRef.current;
      audioRef.current.play();
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
      aria-label={ariaLabel || 'Play audio'}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={16} className="text-midnight-blue animate-spin" />
      ) : isPlaying ? (
        <Pause size={16} className="text-midnight-blue fill-midnight-blue" />
      ) : (
        <Play size={16} className="text-midnight-blue fill-midnight-blue ml-0.5" />
      )}
    </button>
  );
}
