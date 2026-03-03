import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  BookOpen,
  Video,
  Brain,
  Users,
  Award,
  Target,
  Calendar,
  MessageCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface WelcomeContent {
  id: string;
  welcome_title: string;
  welcome_message: string;
  video_url: string;
  video_platform: 'youtube' | 'vimeo' | 'self-hosted';
  is_active: boolean;
}

interface GuideCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link_url: string;
  order_index: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Video,
  Brain,
  Users,
  Award,
  Target,
  Calendar,
  MessageCircle,
  Sparkles,
};

export default function MemberWelcomeSection() {
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent | null>(null);
  const [guideCards, setGuideCards] = useState<GuideCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWelcomeContent();
  }, []);

  const loadWelcomeContent = async () => {
    try {
      const { data: contentData, error: contentError } = await supabase
        .from('member_welcome_content')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (contentError) {
        console.error('Error loading welcome content:', contentError);
        return;
      }

      if (contentData) {
        setWelcomeContent(contentData);

        const { data: cardsData, error: cardsError } = await supabase
          .from('welcome_guide_cards')
          .select('*')
          .eq('welcome_id', contentData.id)
          .order('order_index', { ascending: true });

        if (cardsError) {
          console.error('Error loading guide cards:', cardsError);
        } else {
          setGuideCards(cardsData || []);
        }
      }
    } catch (error) {
      console.error('Error loading welcome content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmbedUrl = (url: string, platform: string) => {
    if (!url) return '';

    if (platform === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } else if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
    }
    return url;
  };

  if (isLoading) {
    return (
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
        <div className="aspect-video bg-slate-200 rounded-xl"></div>
      </div>
    );
  }

  if (!welcomeContent) {
    return null;
  }

  return (
    <div className="mb-8 space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {welcomeContent.welcome_title}
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            {welcomeContent.welcome_message}
          </p>

          {welcomeContent.video_url && (
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-xl">
              {welcomeContent.video_platform === 'self-hosted' ? (
                <video
                  controls
                  className="w-full h-full"
                  src={welcomeContent.video_url}
                >
                  Dein Browser unterstützt dieses Video nicht.
                </video>
              ) : (
                <iframe
                  src={getEmbedUrl(welcomeContent.video_url, welcomeContent.video_platform)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Willkommensvideo"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {guideCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guideCards.map((card) => {
            const IconComponent = iconMap[card.icon] || BookOpen;

            return (
              <a
                key={card.id}
                href={card.link_url}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition border-2 border-transparent hover:border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                      {card.title}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
