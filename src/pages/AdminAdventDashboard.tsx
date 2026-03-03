import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Edit, Eye, Plus, CheckCircle } from 'lucide-react';
import AdminNavigation from '../components/AdminNavigation';
import SEO from '../components/SEO';
import { checkAdminAuth } from '../lib/adminAuth';
import { supabase } from '../lib/supabase';

interface DoorSummary {
  door_number: number;
  title: string;
  is_published: boolean;
  icon: string;
}

export default function AdminAdventDashboard() {
  const navigate = useNavigate();
  const [doors, setDoors] = useState<DoorSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }

    loadDoors();
  }, [navigate]);

  const loadDoors = async () => {
    try {
      const { data, error } = await supabase
        .from('advent_doors')
        .select('door_number, title, is_published, icon')
        .order('door_number', { ascending: true });

      if (error) throw error;

      if (data) {
        setDoors(data);
      }
    } catch (error) {
      console.error('Error loading doors:', error);
    } finally {
      setLoading(false);
    }
  };

  const allDoors = Array.from({ length: 24 }, (_, i) => {
    const doorNumber = i + 1;
    const existingDoor = doors.find(d => d.door_number === doorNumber);
    return existingDoor || {
      door_number: doorNumber,
      title: '',
      is_published: false,
      icon: '🎁'
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO
        title="Adventskalender Verwaltung | Admin"
        description="Verwalte die Türchen des Adventskalenders"
      />

      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold text-midnight-blue mb-2">
                Adventskalender Verwaltung
              </h1>
              <p className="text-gray-600">
                Verwalte die 24 Türchen deines Adventskalenders
              </p>
            </motion.div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-bright-gold/20 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-midnight-blue">{doors.length}</div>
                <div className="text-sm text-gray-600">Erstellt</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {doors.filter(d => d.is_published).length}
                </div>
                <div className="text-sm text-gray-600">Veröffentlicht</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {doors.filter(d => !d.is_published).length}
                </div>
                <div className="text-sm text-gray-600">Entwürfe</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">
                  {24 - doors.length}
                </div>
                <div className="text-sm text-gray-600">Fehlend</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDoors.map((door) => {
              const exists = door.title !== '';

              return (
                <motion.div
                  key={door.door_number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: door.door_number * 0.02 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-bright-gold transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{door.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-bright-gold" />
                            <span className="font-bold text-midnight-blue">
                              Türchen {door.door_number}
                            </span>
                          </div>
                          {door.is_published && (
                            <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                              <CheckCircle size={12} />
                              <span>Veröffentlicht</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {exists ? (
                      <>
                        <h3 className="font-semibold text-midnight-blue mb-4 line-clamp-2">
                          {door.title}
                        </h3>

                        <div className="flex gap-2">
                          <Link
                            to={`/admin/adventskalender/bearbeiten/${door.door_number}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-semibold rounded-lg hover:scale-105 transition-transform"
                          >
                            <Edit size={16} />
                            Bearbeiten
                          </Link>

                          <Link
                            to={`/adventskalender/tuerchen/${door.door_number}`}
                            target="_blank"
                            className="flex items-center justify-center px-4 py-2 border-2 border-bright-gold text-bright-gold rounded-lg hover:bg-bright-gold hover:text-midnight-blue transition-colors"
                            title="Vorschau anzeigen"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 text-gray-400 text-sm">
                          Noch nicht erstellt
                        </div>

                        <Link
                          to={`/admin/adventskalender/bearbeiten/${door.door_number}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-bright-gold hover:text-bright-gold transition-colors"
                        >
                          <Plus size={16} />
                          Erstellen
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
