import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Phone, User, MapPin, Package, Calendar, Search, FileDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';

interface KIManagerBooking {
  id: string;
  vorname: string;
  name: string;
  adresse: string;
  email: string;
  telefon: string;
  selected_package: string;
  created_at: string;
}

export default function AdminKIManagerBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<KIManagerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [packageFilter, setPackageFilter] = useState<string>('all');

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
      .from('ki_manager_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setBookings(data);
    }
    setLoading(false);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.vorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage = packageFilter === 'all' || booking.selected_package === packageFilter;
    return matchesSearch && matchesPackage;
  });

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateStr));
  };

  const uniquePackages = Array.from(new Set(bookings.map(b => b.selected_package)));

  const exportToCSV = () => {
    const headers = ['Vorname', 'Nachname', 'E-Mail', 'Telefon', 'Adresse', 'Paket', 'Anmeldedatum'];
    const rows = filteredBookings.map(b => [
      b.vorname,
      b.name,
      b.email,
      b.telefon,
      b.adresse,
      b.selected_package,
      formatDate(b.created_at)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ki-manager-buchungen-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const packageStats = {
    total: bookings.length,
    earlyBirdEinmal: bookings.filter(b => b.selected_package === 'Early Bird Einmalzahlung').length,
    earlyBirdRaten: bookings.filter(b => b.selected_package === 'Early Bird Ratenzahlung').length,
    regularEinmal: bookings.filter(b => b.selected_package === 'Regulär Einmalzahlung').length,
    regularRaten: bookings.filter(b => b.selected_package === 'Regulär Ratenzahlung').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                KI-Manager Ausbildung Anmeldungen
              </h1>
              <p className="text-gray-600">Übersicht aller verbindlichen Anmeldungen</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FileDown className="w-5 h-5" />
              Als CSV exportieren
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Gesamt</p>
            <p className="text-3xl font-bold text-gray-900">{packageStats.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6">
            <p className="text-sm text-green-700 mb-1">Early Bird Einmal</p>
            <p className="text-3xl font-bold text-green-800">{packageStats.earlyBirdEinmal}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-6">
            <p className="text-sm text-blue-700 mb-1">Early Bird Raten</p>
            <p className="text-3xl font-bold text-blue-800">{packageStats.earlyBirdRaten}</p>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-6">
            <p className="text-sm text-purple-700 mb-1">Regulär Einmal</p>
            <p className="text-3xl font-bold text-purple-800">{packageStats.regularEinmal}</p>
          </div>
          <div className="bg-orange-50 rounded-lg shadow p-6">
            <p className="text-sm text-orange-700 mb-1">Regulär Raten</p>
            <p className="text-3xl font-bold text-orange-800">{packageStats.regularRaten}</p>
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
                <Package className="w-5 h-5 text-gray-400" />
                <select
                  value={packageFilter}
                  onChange={(e) => setPackageFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Alle Pakete</option>
                  {uniquePackages.map((pkg) => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
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
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Keine Anmeldungen gefunden</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teilnehmer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontakt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gewähltes Paket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anmeldedatum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.vorname} {booking.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700 flex items-center">
                            <Mail className="w-4 h-4 mr-1 text-gray-400" />
                            {booking.email}
                          </p>
                          <p className="text-sm text-gray-700 flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-gray-400" />
                            {booking.telefon}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 flex items-start">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="whitespace-pre-line">{booking.adresse}</span>
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.selected_package.includes('Early Bird')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.selected_package}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {formatDate(booking.created_at)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
