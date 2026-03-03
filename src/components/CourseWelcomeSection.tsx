import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface WelcomeContent {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
  video_platform: string | null;
  order_index: number;
}

interface WelcomeCard {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  link_url: string | null;
  link_text: string | null;
  order_index: number;
}

interface CourseWelcomeSectionProps {
  courseId: string;
  section?: 'intro' | 'cards' | 'all';
}

export default function CourseWelcomeSection({ courseId, section = 'all' }: CourseWelcomeSectionProps) {
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent[]>([]);
  const [welcomeCards, setWelcomeCards] = useState<WelcomeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWelcomeContent();
  }, [courseId]);

  const loadWelcomeContent = async () => {
    try {
      const [contentResult, cardsResult] = await Promise.all([
        supabase
          .from('member_course_welcome_content')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true }),

        supabase
          .from('member_course_welcome_cards')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true })
      ]);

      if (contentResult.data) setWelcomeContent(contentResult.data);
      if (cardsResult.data) setWelcomeCards(cardsResult.data);
    } catch (error) {
      console.error('Error loading course welcome content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.Sparkles;
  };

  const getVideoEmbedUrl = (url: string, platform: string): string => {
    if (platform === 'youtube') {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } else if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  if (isLoading) {
    if (section === 'cards') return null;
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-2/3"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (section === 'intro') {
    if (welcomeContent.length === 0) return null;
    const displayCardsIntro = welcomeCards.filter(card => card.icon_name !== 'Video');
    return (
      <div className="mb-8 space-y-6">
        {welcomeContent.map((content) => (
          <div key={content.id} className="bg-gradient-to-br from-blue-50 via-white to-slate-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            {content.video_url && content.video_platform && (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getVideoEmbedUrl(content.video_url, content.video_platform)}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={content.title}
                />
              </div>
            )}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{content.title}</h2>
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{content.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayCards = welcomeCards.filter(card => card.icon_name !== 'Video');

  if (section === 'cards') {
    if (displayCards.length === 0) return null;
    return <WegweiserCards cards={displayCards} getIcon={getIcon} />;
  }

  if (welcomeContent.length === 0 && displayCards.length === 0) return null;

  return (
    <div className="mb-8 space-y-6">
      {welcomeContent.map((content) => (
        <div key={content.id} className="bg-gradient-to-br from-blue-50 via-white to-slate-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          {content.video_url && content.video_platform && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={getVideoEmbedUrl(content.video_url, content.video_platform)}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={content.title}
              />
            </div>
          )}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{content.title}</h2>
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{content.description}</p>
          </div>
        </div>
      ))}
      {displayCards.length > 0 && <WegweiserCards cards={displayCards} getIcon={getIcon} />}
    </div>
  );
}

interface WegweiserCardsProps {
  cards: WelcomeCard[];
  getIcon: (iconName: string) => LucideIcon;
}

function WegweiserCards({ cards, getIcon }: WegweiserCardsProps) {
  const [firstCard, ...restCards] = cards;

  const iconColors = [
    'bg-blue-600',
    'bg-teal-600',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-600',
    'bg-emerald-600',
    'bg-orange-500',
    'bg-slate-600',
  ];

  const getCardColor = (index: number) => iconColors[index % iconColors.length];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-slate-200"></div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Dein Wegweiser</span>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="space-y-4">
        {firstCard && (
          <FeaturedCard card={firstCard} colorClass={getCardColor(0)} getIcon={getIcon} />
        )}

        {restCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restCards.map((card, index) => {
              const Icon = getIcon(card.icon_name);
              const colorClass = getCardColor(index + 1);

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 flex items-start gap-4 group"
                >
                  <div className={`flex-shrink-0 w-11 h-11 ${colorClass} rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-base mb-1 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    {card.link_url && card.link_text && (
                      <a
                        href={card.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      >
                        {card.link_text}
                        <Icons.ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface FeaturedCardProps {
  card: WelcomeCard;
  colorClass: string;
  getIcon: (iconName: string) => LucideIcon;
}

function FeaturedCard({ card, colorClass, getIcon }: FeaturedCardProps) {
  const Icon = getIcon(card.icon_name);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 flex items-start gap-4">
      <div className={`flex-shrink-0 w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-900 text-lg mb-1 leading-snug">
          {card.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {card.description}
        </p>
        {card.link_url && card.link_text && (
          <a
            href={card.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {card.link_text}
            <Icons.ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
