import { Video } from 'lucide-react';

interface VideoButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export default function VideoButton({ onClick, ariaLabel }: VideoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-gradient-to-r from-[#DAA520] to-[#F4D03F] flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
      aria-label={ariaLabel || 'Play video'}
    >
      <Video size={16} className="text-midnight-blue" />
    </button>
  );
}
