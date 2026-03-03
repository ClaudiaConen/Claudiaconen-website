import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Clock, Euro, Calendar, Check, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';

interface AppointmentType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  color: string;
  is_active: boolean;
  booking_buffer_minutes: number;
  advance_booking_days: number;
  digistore_link: string;
  paypal_link: string;
  tentary_link: string;
  welcome_text: string;
}

export default function AdminBookingTypes() {
  const navigate = useNavigate();
  const [types, setTypes] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<AppointmentType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_minutes: 60,
    price: 0,
    color: '#3b82f6',
    is_active: true,
    booking_buffer_minutes: 0,
    advance_booking_days: 30,
    digistore_link: '',
    paypal_link: '',
    tentary_link: '',
    welcome_text: ''
  });

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    fetchTypes();
  }, [navigate]);

  const fetchTypes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointment_types')
      .select('*')
      .order('price');

    if (data && !error) {
      setTypes(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingType) {
      const { error } = await supabase
        .from('appointment_types')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingType.id);

      if (!error) {
        resetForm();
        fetchTypes();
      }
    } else {
      const { error } = await supabase
        .from('appointment_types')
        .insert(formData);

      if (!error) {
        resetForm();
        fetchTypes();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie diesen Termintyp wirklich löschen?')) {
      const { error } = await supabase
        .from('appointment_types')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchTypes();
      }
    }
  };

  const handleEdit = (type: AppointmentType) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      description: type.description,
      duration_minutes: type.duration_minutes,
      price: type.price,
      color: type.color,
      is_active: type.is_active,
      booking_buffer_minutes: type.booking_buffer_minutes,
      advance_booking_days: type.advance_booking_days,
      digistore_link: type.digistore_link || '',
      paypal_link: type.paypal_link || '',
      tentary_link: type.tentary_link || '',
      welcome_text: type.welcome_text || ''
    });
    setShowModal(true);
  };

  const toggleActive = async (type: AppointmentType) => {
    const { error } = await supabase
      .from('appointment_types')
      .update({
        is_active: !type.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', type.id);

    if (!error) {
      fetchTypes();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration_minutes: 60,
      price: 0,
      color: '#3b82f6',
      is_active: true,
      booking_buffer_minutes: 0,
      advance_booking_days: 30,
      digistore_link: '',
      paypal_link: '',
      tentary_link: '',
      welcome_text: ''
    });
    setEditingType(null);
    setShowModal(false);
  };

  const colorOptions = [
    { name: 'Blau', value: '#3b82f6' },
    { name: 'Grün', value: '#10b981' },
    { name: 'Lila', value: '#8b5cf6' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Rot', value: '#ef4444' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Türkis', value: '#06b6d4' },
    { name: 'Grau', value: '#6b7280' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Termintypen</h1>
            <p className="text-gray-600">Verwalten Sie die verschiedenen Terminarten</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Neuer Termintyp
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : types.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Noch keine Termintypen vorhanden</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Ersten Termintyp erstellen
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
                style={{ borderLeft: `4px solid ${type.color}` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                    </div>
                    <button
                      onClick={() => toggleActive(type)}
                      className={`p-2 rounded-full ${
                        type.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                      title={type.is_active ? 'Aktiv' : 'Inaktiv'}
                    >
                      {type.is_active ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{type.duration_minutes} Minuten</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Euro className="w-4 h-4 mr-2" />
                      <span className="text-sm">{type.price > 0 ? `${type.price}€` : 'Kostenlos'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Buchbar bis {type.advance_booking_days} Tage im Voraus</span>
                    </div>
                    {type.booking_buffer_minutes > 0 && (
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{type.booking_buffer_minutes} Min. Puffer</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(type)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingType ? 'Termintyp bearbeiten' : 'Neuer Termintyp'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. Coaching Session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Kurze Beschreibung des Termins"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dauer (Minuten) *
                  </label>
                  <input
                    type="number"
                    required
                    min="15"
                    step="15"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preis (€) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puffer vor/nach Termin (Min.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={formData.booking_buffer_minutes}
                    onChange={(e) => setFormData({ ...formData, booking_buffer_minutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buchbar bis (Tage voraus)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.advance_booking_days}
                    onChange={(e) => setFormData({ ...formData, advance_booking_days: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farbe
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`p-4 rounded-lg border-2 transition ${
                        formData.color === color.value ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Willkommenstext für Buchungsseite
                </label>
                <input
                  type="text"
                  value={formData.welcome_text}
                  onChange={(e) => setFormData({ ...formData, welcome_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. Buche dein persönliches Coaching"
                />
              </div>

              {formData.price > 0 && (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Zahlungslinks (optional)</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Digistore24 Zahlungslink
                    </label>
                    <input
                      type="url"
                      value={formData.digistore_link}
                      onChange={(e) => setFormData({ ...formData, digistore_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.digistore24.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PayPal Zahlungslink
                    </label>
                    <input
                      type="url"
                      value={formData.paypal_link}
                      onChange={(e) => setFormData({ ...formData, paypal_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.paypal.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tentary Shop Zahlungslink
                    </label>
                    <input
                      type="url"
                      value={formData.tentary_link}
                      onChange={(e) => setFormData({ ...formData, tentary_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://umsatzstimme-claudiaconen.tentary.com/..."
                    />
                  </div>
                </>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                  Aktiv (Kunden können diesen Termin buchen)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingType ? 'Speichern' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}