import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getEmbedUrl } from '../lib/videoUtils';

interface VideoModalPropsNew {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  platform: 'youtube' | 'vimeo';
  title?: string;
}

interface VideoModalPropsLegacy {
  vimeoUrl: string;
  onClose: () => void;
  title?: string;
}

type VideoModalProps = VideoModalPropsNew | VideoModalPropsLegacy;

export default function VideoModal(props: VideoModalProps) {
  const isLegacyProps = 'vimeoUrl' in props;

  const isOpen = isLegacyProps ? !!props.vimeoUrl : props.isOpen;
  const onClose = props.onClose;
  const videoUrl = isLegacyProps ? props.vimeoUrl : props.videoUrl;
  const platform = isLegacyProps ? 'vimeo' : props.platform;
  const title = props.title;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const embedUrl = getEmbedUrl(videoUrl, platform);

  if (!embedUrl) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-midnight-blue/95 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-pearl-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            <div className="relative rounded-2xl overflow-hidden border-2 border-luxury-gold/30 shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title || 'Video'}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
