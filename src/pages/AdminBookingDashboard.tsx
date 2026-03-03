import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Mail, Phone, User, Check, X, Filter, Search, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
  admin_notes: string;
  created_at: string;
  payment_status: string;
  payment_provider: string;
  payment_transaction_id: string;
  paid_at: string;
  reminder_24h_sent: boolean;
  reminder_3h_sent: boolean;
  reminder_24h_sent_at: string;
  reminder_3h_sent_at: string;
  meeting_link: string;
  appointment_type: {
    name: string;
    duration_minutes: number;
    price: number;
    color: string;
  };
}

export default function AdminBookingDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        appointment_type:appointment_types(name, duration_minutes, price, color)
      `)
      .order('appointment_date', { ascending: false })
      .order('start_time', { ascending: false });

    if (data && !error) {
      setBookings(data);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (!error) {
      fetchBookings();
    }
  };

  const updateAdminNotes = async () => {
    if (!selectedBooking) return;

    const { error } = await supabase
      .from('bookings')
      .update({ admin_notes: adminNote, updated_at: new Date().toISOString() })
      .eq('id', selectedBooking.id);

    if (!error) {
      setSelectedBooking(null);
      setAdminNote('');
      fetchBookings();
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch =
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateStr));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Bestätigt';
      case 'pending':
        return 'Ausstehend';
      case 'cancelled':
        return 'Storniert';
      case 'completed':
        return 'Abgeschlossen';
      default:
        return status;
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buchungsverwaltung</h1>
          <p className="text-gray-600">Verwalten Sie alle Terminbuchungen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Gesamt</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-6">
            <p className="text-sm text-yellow-700 mb-1">Ausstehend</p>
            <p className="text-3xl font-bold text-yellow-800">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6">
            <p className="text-sm text-green-700 mb-1">Bestätigt</p>
            <p className="text-3xl font-bold text-green-800">{stats.confirmed}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-6">
            <p className="text-sm text-blue-700 mb-1">Abgeschlossen</p>
            <p className="text-3xl font-bold text-blue-800">{stats.completed}</p>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-6">
            <p className="text-sm text-red-700 mb-1">Storniert</p>
            <p className="text-3xl font-bold text-red-800">{stats.cancelled}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Suche nach Name oder E-Mail..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Alle Status</option>
                  <option value="pending">Ausstehend</option>
                  <option value="confirmed">Bestätigt</option>
                  <option value="completed">Abgeschlossen</option>
                  <option value="cancelled">Storniert</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Keine Buchungen gefunden</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kunde
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Terminart
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum & Zeit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <User className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.customer_name}</p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <Mail className="w-4 h-4 mr-1" />
                              {booking.customer_email}
                            </p>
                            {booking.customer_phone && (
                              <p className="text-sm text-gray-500 flex items-center mt-1">
                                <Phone className="w-4 h-4 mr-1" />
                                {booking.customer_phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="inline-block px-2 py-1 rounded text-sm font-medium"
                          style={{ backgroundColor: booking.appointment_type.color + '20', color: booking.appointment_type.color }}
                        >
                          {booking.appointment_type.name}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {booking.appointment_type.duration_minutes} Min. | {booking.appointment_type.price}€
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(booking.appointment_date)}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.start_time} - {booking.end_time}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded"
                              title="Bestätigen"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          {(booking.status === 'pending' || booking.status === 'confirmed') && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Stornieren"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="Als abgeschlossen markieren"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setAdminNote(booking.admin_notes || '');
                            }}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                            title="Notizen bearbeiten"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Buchungsdetails</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kunde</h3>
                <p className="text-gray-700">{selectedBooking.customer_name}</p>
                <p className="text-gray-600 text-sm">{selectedBooking.customer_email}</p>
                {selectedBooking.customer_phone && (
                  <p className="text-gray-600 text-sm">{selectedBooking.customer_phone}</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Termin</h3>
                <p className="text-gray-700">{selectedBooking.appointment_type.name}</p>
                <p className="text-gray-600 text-sm">
                  {formatDate(selectedBooking.appointment_date)} um {selectedBooking.start_time}
                </p>
              </div>

              {selectedBooking.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kundennotizen</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedBooking.notes}</p>
                </div>
              )}

              {parseFloat(selectedBooking.appointment_type.price) > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Zahlungsinformationen</h3>
                  <div className="bg-gray-50 p-3 rounded space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-600">Status:</span>{' '}
                      <span className={`font-medium ${
                        selectedBooking.payment_status === 'completed' ? 'text-green-600' :
                        selectedBooking.payment_status === 'pending' ? 'text-yellow-600' :
                        selectedBooking.payment_status === 'failed' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {selectedBooking.payment_status === 'completed' ? 'Bezahlt' :
                         selectedBooking.payment_status === 'pending' ? 'Ausstehend' :
                         selectedBooking.payment_status === 'failed' ? 'Fehlgeschlagen' :
                         selectedBooking.payment_status === 'refunded' ? 'Erstattet' : 'Keine'}
                      </span>
                    </p>
                    {selectedBooking.payment_provider && selectedBooking.payment_provider !== 'none' && (
                      <p className="text-sm">
                        <span className="text-gray-600">Anbieter:</span>{' '}
                        <span className="font-medium text-gray-700">
                          {selectedBooking.payment_provider === 'digistore' ? 'Digistore24' :
                           selectedBooking.payment_provider === 'paypal' ? 'PayPal' : selectedBooking.payment_provider}
                        </span>
                      </p>
                    )}
                    {selectedBooking.payment_transaction_id && (
                      <p className="text-sm">
                        <span className="text-gray-600">Transaktions-ID:</span>{' '}
                        <span className="font-mono text-xs text-gray-700">{selectedBooking.payment_transaction_id}</span>
                      </p>
                    )}
                    {selectedBooking.paid_at && (
                      <p className="text-sm">
                        <span className="text-gray-600">Bezahlt am:</span>{' '}
                        <span className="text-gray-700">{new Date(selectedBooking.paid_at).toLocaleString('de-DE')}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">E-Mail-Erinnerungen</h3>
                <div className="bg-gray-50 p-3 rounded space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    {selectedBooking.reminder_24h_sent ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-gray-700">24h-Erinnerung</span>
                    {selectedBooking.reminder_24h_sent_at && (
                      <span className="text-gray-500 text-xs">
                        ({new Date(selectedBooking.reminder_24h_sent_at).toLocaleString('de-DE')})
                      </span>
                    )}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    {selectedBooking.reminder_3h_sent ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-gray-700">3h-Erinnerung</span>
                    {selectedBooking.reminder_3h_sent_at && (
                      <span className="text-gray-500 text-xs">
                        ({new Date(selectedBooking.reminder_3h_sent_at).toLocaleString('de-DE')})
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {selectedBooking.meeting_link && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Meeting-Link</h3>
                  <a
                    href={selectedBooking.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    {selectedBooking.meeting_link}
                  </a>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Admin-Notizen (intern)</h3>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Interne Notizen zu dieser Buchung..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  setAdminNote('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Abbrechen
              </button>
              <button
                onClick={updateAdminNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}