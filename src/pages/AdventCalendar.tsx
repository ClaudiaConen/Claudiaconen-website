import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Lock, Check, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Snowfall from '../components/Snowfall';
import ImageSlider from '../components/ImageSlider';
import { supabase } from '../lib/supabase';

interface DoorTitle {
  door_number: number;
  title: string;
}

export default function AdventCalendar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);
  const [doorTitles, setDoorTitles] = useState<Record<number, string>>({});

  useEffect(() => {
    const email = localStorage.getItem('advent_user_email');
    if (!email) {
      navigate('/adventskalender');
      return;
    }
    setUserEmail(email);

    const opened = JSON.parse(localStorage.getItem('advent_opened_doors') || '[]');
    setOpenedDoors(opened);

    loadDoorTitles();
  }, [navigate]);

  const loadDoorTitles = async () => {
    try {
      const { data, error } = await supabase
        .from('advent_doors')
        .select('door_number, title')
        .order('door_number');

      if (error) throw error;

      if (data) {
        const titlesMap: Record<number, string> = {};
        data.forEach((door: DoorTitle) => {
          titlesMap[door.door_number] = door.title;
        });
        setDoorTitles(titlesMap);
      }
    } catch (error) {
      console.error('Error loading door titles:', error);
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

  const isDoorUnlocked = (doorNumber: number) => {
    return doorNumber <= currentDay;
  };

  const isDoorOpened = (doorNumber: number) => {
    return openedDoors.includes(doorNumber);
  };

  const handleDoorClick = (doorNumber: number) => {
    if (isDoorUnlocked(doorNumber)) {
      navigate(`/adventskalender/tuerchen/${doorNumber}`);
    }
  };

  const getDoorImage = (doorNumber: number) => {
    return `/${doorNumber}.jpg`;
  };

  const doors = Array.from({ length: 24 }, (_, i) => i + 1);

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-sky-100 relative overflow-hidden">
      <Snowfall />

      <div className="absolute inset-0 pointer-events-none z-[1] opacity-30">
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
        title="Adventskalender 2025 | Claudia Conen"
        description="24 Tage Business-Wissen, das wirklich wirkt. Dein Adventskalender für mehr Erfolg, Sichtbarkeit und emotionale Intelligenz."
      />

      <Navigation />

      <div className="pt-24 pb-20 relative z-[5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-bright-gold/20 to-luxury-gold/20 rounded-full mb-6">
              <Calendar className="text-bright-gold" size={20} />
              <span className="text-midnight-blue font-semibold">
                Tag {currentDay} von 24
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue mb-6">
              Dein Business-Adventskalender
              <span className="block mt-2 bg-gradient-to-r from-bright-gold to-luxury-gold bg-clip-text text-transparent">
                2025
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              24 Tage wertvolles Wissen für mehr Erfolg, Sichtbarkeit und emotionale Intelligenz
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 mb-8"
            >
              <ImageSlider />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 mb-6"
            >
              <Link
                to="/ki-1zu1"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A227] to-[#F5E6B3] text-[#1A1A1A] font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Sparkles size={24} />
                Deine persönliche 1:1 Abkürzung
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                <span>{openedDoors.length} Türchen geöffnet</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-bright-gold" size={18} />
                <span>{Math.max(0, currentDay - openedDoors.length)} neu verfügbar</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
            {doors.map((doorNumber, index) => {
              const unlocked = isDoorUnlocked(doorNumber);
              const opened = isDoorOpened(doorNumber);
              const doorTitle = doorTitles[doorNumber];

              return (
                <motion.div
                  key={doorNumber}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex flex-col"
                >
                  <div
                    onClick={() => handleDoorClick(doorNumber)}
                    className={`
                      relative aspect-square rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden mb-2 bg-white
                      ${unlocked
                        ? 'shadow-xl hover:shadow-2xl hover:scale-105 border-4 border-bright-gold/50 hover:border-bright-gold ring-4 ring-white/80'
                        : 'border-4 border-gray-400 cursor-not-allowed opacity-70 ring-4 ring-white/60'
                      }
                    `}
                  >
                  <div
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${getDoorImage(doorNumber)})` }}
                  />

                  {opened && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg pointer-events-none">
                      <Check size={18} className="text-white" />
                    </div>
                  )}

                  {!unlocked && (
                    <>
                      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center z-10 shadow-lg pointer-events-none">
                        <Lock size={18} className="text-white" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="text-center">
                          <div className="text-xs text-white/90 font-semibold drop-shadow">
                            Ab {doorNumber}. Dezember
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {unlocked && !opened && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute bottom-3 right-3 z-10 pointer-events-none"
                    >
                      <div className="bg-bright-gold/90 rounded-full p-2 shadow-lg">
                        <Gift size={20} className="text-midnight-blue" />
                      </div>
                    </motion.div>
                  )}

                  {unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-bright-gold/0 to-bright-gold/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                  </div>

                  {doorTitle && (
                    <div className="text-center px-2">
                      <p className={`text-xs md:text-sm font-semibold leading-tight line-clamp-2 ${
                        unlocked
                          ? 'text-midnight-blue'
                          : 'text-gray-500'
                      }`}>
                        {doorTitle}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-bright-gold/10 to-luxury-gold/10 border-2 border-bright-gold/30 rounded-2xl p-8 max-w-2xl">
              <Sparkles className="mx-auto text-bright-gold mb-4" size={32} />
              <h3 className="text-2xl font-bold text-midnight-blue mb-4">
                Jeden Tag ein neues Geschenk
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Vom 1. bis 24. Dezember öffnest du täglich ein neues Türchen mit wertvollen Impulsen,
                praktischen Tools und sofort umsetzbarem Wissen für dein Business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
