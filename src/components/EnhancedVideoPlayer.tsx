import { useState, useRef, useEffect } from 'react';
import { ExternalLink, AlertCircle, Play } from 'lucide-react';

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  title?: string;
}

export default function EnhancedVideoPlayer({ videoUrl, title }: EnhancedVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<'cors' | 'format' | 'network' | 'unknown'>('unknown');
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHasError(false);
    setShowFallback(false);
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (isLoading && !hasError) {
        console.warn('Video lädt sehr langsam oder hat CORS-Probleme');
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [videoUrl]);

  const detectErrorType = (error: MediaError | null) => {
    if (!error) return 'unknown';

    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        return 'network';
      case error.MEDIA_ERR_NETWORK:
        return 'cors';
      case error.MEDIA_ERR_DECODE:
        return 'format';
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'format';
      default:
        return 'unknown';
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    const detectedType = detectErrorType(target.error);

    console.error('Video-Fehler:', {
      url: videoUrl,
      error: target.error,
      errorCode: target.error?.code,
      errorMessage: target.error?.message,
      networkState: target.networkState,
      readyState: target.readyState,
      detectedType
    });

    setHasError(true);
    setErrorType(detectedType);
    setShowFallback(true);
    setIsLoading(false);
  };

  const handleLoadedMetadata = () => {
    console.log('Video erfolgreich geladen');
    setIsLoading(false);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 'cors':
        return 'Das Video kann aufgrund von Sicherheitseinstellungen nicht direkt eingebettet werden.';
      case 'format':
        return 'Das Video-Format wird von deinem Browser nicht unterstützt.';
      case 'network':
        return 'Netzwerkfehler beim Laden des Videos.';
      default:
        return 'Das Video kann leider nicht in der Vorschau angezeigt werden.';
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-midnight-blue mb-4 flex items-center gap-2">
        <Play size={24} className="text-bright-gold" />
        Video
      </h3>

      <div className="space-y-4">
        {!showFallback && (
          <div className="relative bg-black rounded-lg overflow-hidden border-2 border-bright-gold/20">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-gold mx-auto mb-4"></div>
                  <p className="text-white text-sm">Video wird geladen...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              controls
              className="w-full rounded-lg"
              onError={handleError}
              onLoadedMetadata={handleLoadedMetadata}
              onCanPlay={handleCanPlay}
              preload="metadata"
              controlsList="nodownload"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/ogg" />
              Dein Browser unterstützt das Video-Element nicht.
            </video>
          </div>
        )}

        {(hasError || showFallback) && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 mb-2">
                  {hasError ? 'Video-Vorschau nicht verfügbar' : 'Alternative Option'}
                </h4>
                <p className="text-amber-800 text-sm mb-4">
                  {hasError ? getErrorMessage() : 'Falls das Video nicht lädt, kannst du es direkt im Browser öffnen.'}
                </p>

                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-full hover:scale-105 transition-all shadow-lg"
                >
                  <ExternalLink size={20} />
                  Video im neuen Tab öffnen
                </a>

                <p className="text-xs text-amber-700 mt-3">
                  💡 Tipp: Das Video wird dann in einem neuen Tab abgespielt und sollte problemlos funktionieren.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {title || 'Video-Inhalt'}
          </span>

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-bright-gold hover:text-luxury-gold transition-colors font-semibold"
          >
            <ExternalLink size={16} />
            Direkt öffnen
          </a>
        </div>
      </div>
    </div>
  );
}
