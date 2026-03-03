import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Share2, Check, Eye, Settings } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Snowfall from '../components/Snowfall';
import AdventResourceDownload from '../components/AdventResourceDownload';
import EnhancedVideoPlayer from '../components/EnhancedVideoPlayer';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import { processContentWithLinks } from '../lib/linkify';

interface Resource {
  type: 'checklist' | 'worksheet' | 'training' | 'guide' | 'template';
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  icon?: string;
}

interface DoorData {
  door_number: number;
  title: string;
  description: string;
  content_type: string;
  content_text: string;
  download_title: string;
  download_description: string;
  icon: string;
  resources_json: Resource[];
  audio_url?: string;
  video_url?: string;
}

export default function AdventDoor() {
  const { doorNumber } = useParams<{ doorNumber: string }>();
  const navigate = useNavigate();
  const [doorData, setDoorData] = useState<DoorData | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [marked, setMarked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const currentDoorNumber = parseInt(doorNumber || '0');

  useEffect(() => {
    const adminAuth = checkAdminAuth();
    setIsAdmin(adminAuth);

    const email = localStorage.getItem('advent_user_email');
    const name = localStorage.getItem('advent_user_name') || '';

    if (!email && !adminAuth) {
      navigate('/adventskalender');
      return;
    }

    setUserEmail(email || 'admin@preview.com');
    setUserName(name || 'Admin');
    loadDoorData();
  }, [doorNumber, navigate]);

  const loadDoorData = async () => {
    try {
      const adminAuth = checkAdminAuth();
      console.log('Admin Auth Status:', adminAuth);
      console.log('Current Door Number:', currentDoorNumber);

      let query = supabase
        .from('advent_doors')
        .select('*')
        .eq('door_number', currentDoorNumber);

      if (!adminAuth) {
        console.log('Filtering for published doors only');
        query = query.eq('is_published', true);
      } else {
        console.log('Admin mode: Loading all doors');
      }

      const { data, error } = await query.maybeSingle();

      console.log('Door data loaded:', data);
      console.log('Door error:', error);

      if (error) throw error;

      if (data) {
        setDoorData(data);
        markAsOpened();
      }
    } catch (error) {
      console.error('Error loading door:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsOpened = () => {
    const openedDoors = JSON.parse(localStorage.getItem('advent_opened_doors') || '[]');
    if (!openedDoors.includes(currentDoorNumber)) {
      openedDoors.push(currentDoorNumber);
      localStorage.setItem('advent_opened_doors', JSON.stringify(openedDoors));
      setMarked(true);
    }
  };

  const getCurrentDay = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    if (month === 11) {
      return Math.min(day, 24);
    }

    if (month === 0 && day <= 6) {
      return 24;
    }

    return 0;
  };

  const currentDay = getCurrentDay();
  const adminUnlock = checkAdminAuth();
  console.log('isUnlocked check - Admin:', adminUnlock, 'Current Day:', currentDay, 'Door:', currentDoorNumber);
  const isUnlocked = adminUnlock || currentDoorNumber <= currentDay;

  const shareUrl = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: doorData?.title,
        text: doorData?.description,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link kopiert!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-gold"></div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-sky-100 relative overflow-hidden">
        <Snowfall />
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
          <div className="absolute top-20 left-10 text-9xl">🎄</div>
          <div className="absolute top-40 right-20 text-8xl">⭐</div>
          <div className="absolute bottom-40 left-20 text-9xl">🎁</div>
          <div className="absolute bottom-20 right-10 text-8xl">🎅</div>
          <div className="absolute top-1/2 left-1/3 text-7xl">✨</div>
        </div>
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl font-bold text-midnight-blue mb-4">
              Noch nicht verfügbar
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Dieses Türchen öffnet sich am {currentDoorNumber}. Dezember
            </p>
            <Link
              to="/adventskalender/kalender"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform"
            >
              <ArrowLeft size={20} />
              Zurück zum Kalender
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doorData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Türchen nicht gefunden</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-sky-100 relative overflow-hidden">
      <Snowfall />

      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-20 left-10 text-9xl">🎄</div>
        <div className="absolute top-40 right-20 text-8xl">⭐</div>
        <div className="absolute bottom-40 left-20 text-9xl">🎁</div>
        <div className="absolute bottom-20 right-10 text-8xl">🎅</div>
        <div className="absolute top-1/2 left-1/3 text-7xl">✨</div>
        <div className="absolute top-1/3 right-1/4 text-7xl">🔔</div>
        <div className="absolute top-60 right-1/3 text-6xl">🧤</div>
        <div className="absolute bottom-60 left-1/4 text-6xl">❄️</div>
      </div>

      <SEO
        title={`Türchen ${doorData.door_number}: ${doorData.title} | Adventskalender`}
        description={doorData.description}
      />

      <Navigation />

      <div className="pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6">
              <Link
                to="/adventskalender/kalender"
                className="inline-flex items-center gap-2 text-bright-gold hover:text-luxury-gold transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-semibold">Zurück zum Kalender</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-bright-gold/20 to-luxury-gold/20 rounded-full">
                <Calendar size={16} className="text-bright-gold" />
                <span className="text-sm font-semibold text-midnight-blue">
                  Türchen {doorData.door_number} von 24
                </span>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
                  <Eye size={16} className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">Admin-Vorschau</span>
                </div>
              )}

              {marked && !isAdmin && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                  <Check size={16} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Geöffnet</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-bright-gold/20 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl mb-6">{doorData.icon}</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-blue mb-4">
                  {doorData.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {doorData.description}
                </p>
              </div>

              <div
                className="prose prose-lg max-w-none mb-8 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: processContentWithLinks(doorData.content_text)
                }}
              />

              {doorData.audio_url && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-midnight-blue mb-4">Audio</h3>
                  <audio controls className="w-full">
                    <source src={doorData.audio_url} type="audio/mpeg" />
                    <source src={doorData.audio_url} type="audio/wav" />
                    <source src={doorData.audio_url} type="audio/ogg" />
                    Dein Browser unterstützt das Audio-Element nicht.
                  </audio>
                </div>
              )}

              {doorData.video_url && (
                <EnhancedVideoPlayer
                  videoUrl={doorData.video_url}
                  title={doorData.title}
                />
              )}

              {doorData.resources_json && doorData.resources_json.length > 0 && (
                <div className="mb-8">
                  <AdventResourceDownload
                    resources={doorData.resources_json}
                    doorNumber={doorData.door_number}
                    userEmail={userEmail || ''}
                  />
                </div>
              )}

              <div className="border-t-2 border-gray-200 pt-6">
                <button
                  onClick={shareUrl}
                  className="inline-flex items-center gap-2 text-bright-gold hover:text-luxury-gold transition-colors"
                >
                  <Share2 size={18} />
                  <span className="font-semibold">Teile diesen Impuls</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              {currentDoorNumber > 1 ? (
                <Link
                  to={`/adventskalender/tuerchen/${currentDoorNumber - 1}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-bright-gold/30 text-midnight-blue font-semibold rounded-full hover:border-bright-gold hover:scale-105 transition-all shadow-md"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Vorheriges Türchen</span>
                  <span className="sm:hidden">Zurück</span>
                </Link>
              ) : (
                <div></div>
              )}

              {currentDoorNumber < 24 && currentDoorNumber < currentDay ? (
                <Link
                  to={`/adventskalender/tuerchen/${currentDoorNumber + 1}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-semibold rounded-full hover:scale-105 transition-all shadow-xl"
                >
                  <span className="hidden sm:inline">Nächstes Türchen</span>
                  <span className="sm:hidden">Weiter</span>
                  <ArrowRight size={20} />
                </Link>
              ) : null}
            </div>

            {userName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center bg-gradient-to-r from-bright-gold/10 to-luxury-gold/10 border-2 border-bright-gold/30 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-midnight-blue mb-4">
                  Bis morgen, {userName}! 🎁
                </h3>
                <p className="text-gray-700">
                  Komm morgen wieder und entdecke das nächste wertvolle Geschenk für dein Business.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />

      {isAdmin && (
        <Link
          to="/admin/adventskalender"
          className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 hover:scale-105 transition-all duration-300"
          title="Zum Admin-Bereich"
        >
          <Settings size={20} />
          <span className="font-semibold hidden sm:inline">Admin</span>
        </Link>
      )}
    </div>
  );
}
