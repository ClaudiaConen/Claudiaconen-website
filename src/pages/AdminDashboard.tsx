import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import { Calendar, Video, MessageSquare, ArrowRight, BarChart, Brain, BookOpen, GraduationCap, Mail, Users, FileDown, ChevronDown, ChevronUp, Trash2, Copy, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { supabaseBuchprojekt } from '../lib/supabaseBuchprojekt';
import { deleteContacts, addContact, listContacts, getContactCounts } from '../lib/adminContacts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    adventDoors: 0,
    stepMedia: 0,
    testimonials: 0,
    kiManagerBookings: 0,
    buchprojektAnmeldungen: 0,
    students: 0,
    courses: 0
  });
  const [emailStats, setEmailStats] = useState({
    betaWaitlist: 0,
    coachingInquiries: 0,
    contactInquiries: 0,
    challenge: 0,
    powerofai: 0,
    adventRegistrations: 0,
    abkuerzungBookings: 0,
    checklistDownloads: 0,
    linkedinFreebie: 0,
    kiManagerBookings: 0,
  });
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [sourceData, setSourceData] = useState<Record<string, any[]>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({ email: '', firstName: '', lastName: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    checkAuth();
    loadStats();
    loadEmailStats();
  }, []);

  const checkAuth = async () => {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      navigate('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const [doorsResult, mediaResult, testimonialsResult, kiManagerResult, buchprojektResult, studentsResult, coursesResult] = await Promise.all([
        supabase.from('advent_doors').select('id', { count: 'exact', head: true }),
        supabase.from('step_media').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('ki_manager_bookings').select('id', { count: 'exact', head: true }),
        // Anmeldungen sind nicht mehr öffentlich lesbar – nur die anonyme Anzahl per Funktion.
        supabaseBuchprojekt.rpc('buchprojekt_anzahl'),
        supabase.from('member_students').select('id', { count: 'exact', head: true }),
        supabase.from('member_courses').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        adventDoors: doorsResult.count || 0,
        stepMedia: mediaResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        kiManagerBookings: kiManagerResult.count || 0,
        buchprojektAnmeldungen: (typeof buchprojektResult.data === 'number' ? buchprojektResult.data : 0),
        students: studentsResult.count || 0,
        courses: coursesResult.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEmailStats = async () => {
    try {
      // Zählen läuft über die Server-Funktion (die Tabellen sind per RLS geschützt und
      // für den öffentlichen Schlüssel nicht lesbar).
      const counts = await getContactCounts();
      setEmailStats({
        betaWaitlist: counts.betaWaitlist || 0,
        coachingInquiries: counts.coachingInquiries || 0,
        contactInquiries: counts.contactInquiries || 0,
        challenge: counts.challenge || 0,
        powerofai: counts.powerofai || 0,
        adventRegistrations: counts.adventRegistrations || 0,
        abkuerzungBookings: counts.abkuerzungBookings || 0,
        checklistDownloads: counts.checklistDownloads || 0,
        linkedinFreebie: counts.linkedinFreebie || 0,
        kiManagerBookings: counts.kiManagerBookings || 0,
      });
    } catch (error) {
      console.error('Error loading email stats:', error);
    }
  };

  const toggleSourceExpand = async (source: { key: string; table: string }) => {
    if (expandedSource === source.key) {
      setExpandedSource(null);
      return;
    }

    setExpandedSource(source.key);
    setNewEntry({ email: '', firstName: '', lastName: '' });
    if (!sourceData[source.key]) {
      try {
        const data = await listContacts(source.table, source.key);
        setSourceData(prev => ({ ...prev, [source.key]: data }));
      } catch (error) {
        console.error('Error loading source data:', error);
      }
    }
  };

  // Einen Eintrag löschen (doppelt oder falsch) – über die sichere Server-Funktion admin-contacts.
  const handleDeleteEntry = async (
    source: { key: string; table: string; emailField: string },
    item: any,
  ) => {
    if (!item?.id) {
      alert('Dieser Eintrag hat keine ID und kann nicht gelöscht werden.');
      return;
    }
    const label = item[source.emailField] || item.id;
    if (!confirm(`Diesen Eintrag wirklich endgültig löschen?\n\n${label}`)) return;
    setDeletingId(item.id);
    try {
      await deleteContacts(source.table, [item.id]);
      setSourceData(prev => ({ ...prev, [source.key]: (prev[source.key] || []).filter((r: any) => r.id !== item.id) }));
      loadEmailStats();
    } catch (error) {
      alert('Löschen fehlgeschlagen: ' + (error instanceof Error ? error.message : String(error)));
    }
    setDeletingId(null);
  };

  // Eine E-Mail manuell zu einer Liste hinzufügen (Pflichtfelder füllt die Server-Funktion).
  const handleAddEntry = async (source: { key: string; table: string }) => {
    const email = newEntry.email.trim();
    if (!email) { alert('Bitte eine E-Mail eingeben.'); return; }
    setAdding(true);
    try {
      const row = await addContact(source.table, source.key, {
        email,
        firstName: newEntry.firstName.trim(),
        lastName: newEntry.lastName.trim(),
      });
      setSourceData(prev => ({ ...prev, [source.key]: [row, ...(prev[source.key] || [])] }));
      setNewEntry({ email: '', firstName: '', lastName: '' });
      loadEmailStats();
    } catch (error) {
      alert('Hinzufügen fehlgeschlagen: ' + (error instanceof Error ? error.message : String(error)));
    }
    setAdding(false);
  };

  const exportSourceCSV = async (source: { key: string; table: string }) => {
    try {
      const data = await listContacts(source.table, source.key);
      if (!data || data.length === 0) return;

      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map((row: any) => headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${source.key}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const [exportingAll, setExportingAll] = useState(false);

  const exportAllEmailsCSV = async () => {
    setExportingAll(true);
    try {
      const results = await Promise.all(
        emailSources.map(async (source) => {
          const data = await listContacts(source.table, source.key);
          return (data || []).map((row: any) => ({
            email: row[source.emailField] || '',
            name: [row[source.nameField], row.last_name].filter(Boolean).join(' ') || '',
            quelle: source.label,
            datum: row.created_at ? new Date(row.created_at).toLocaleDateString('de-DE') : '',
          }));
        })
      );

      const allRows = results.flat();
      if (allRows.length === 0) return;

      const headers = ['E-Mail', 'Name', 'Quelle', 'Datum'];
      const csvContent = [
        headers.join(';'),
        ...allRows.map(r => [r.email, r.name, r.quelle, r.datum].map(v => `"${String(v).replace(/"/g, '""')}"`).join(';'))
      ].join('\n');

      const bom = '\uFEFF';
      const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `alle-email-registrierungen-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting all emails:', error);
    } finally {
      setExportingAll(false);
    }
  };

  const totalEmails = Object.values(emailStats).reduce((a, b) => a + b, 0);

  type EmailSource = {
    key: string; label: string; table: string; count: number;
    color: string; emailField: string; nameField: string;
    filter?: (q: any) => any;
    client?: any;
  };
  const emailSources: EmailSource[] = [
    { key: 'kiManagerBookings', label: 'KI-Manager Anmeldungen', table: 'ki_manager_bookings', count: emailStats.kiManagerBookings, color: 'bg-orange-100 text-orange-800', emailField: 'email', nameField: 'vorname' },
    { key: 'challenge', label: 'Challenge-Anmeldungen', table: 'contact_inquiries', count: emailStats.challenge, color: 'bg-fuchsia-100 text-fuchsia-800', emailField: 'email', nameField: 'name', filter: (q: any) => q.or('message.ilike.*CHALLENGE*,message.ilike.*Video-Training ab 26.10.*: ja*') },
    { key: 'powerofai', label: 'EventKöln – THE POWER OF AI (Check-in)', table: 'contact_inquiries', count: emailStats.powerofai, color: 'bg-amber-100 text-amber-800', emailField: 'email', nameField: 'name', filter: (q: any) => q.ilike('message', '%POWER-OF-AI CHECK-IN%') },
    { key: 'adventRegistrations', label: 'Adventskalender Registrierungen', table: 'advent_registrations', count: emailStats.adventRegistrations, color: 'bg-red-100 text-red-800', emailField: 'email', nameField: 'first_name' },
    { key: 'checklistDownloads', label: 'Checklisten Downloads', table: 'checklist_downloads', count: emailStats.checklistDownloads, color: 'bg-blue-100 text-blue-800', emailField: 'email', nameField: 'article_title' },
    { key: 'linkedinFreebie', label: 'LinkedIn Freebie Leads', table: 'linkedin_freebie_leads', count: emailStats.linkedinFreebie, color: 'bg-sky-100 text-sky-800', emailField: 'email', nameField: 'source' },
    { key: 'coachingInquiries', label: 'Coaching Anfragen', table: 'coaching_inquiries', count: emailStats.coachingInquiries, color: 'bg-green-100 text-green-800', emailField: 'email', nameField: 'first_name' },
    { key: 'contactInquiries', label: 'Kontaktanfragen', table: 'contact_inquiries', count: emailStats.contactInquiries, color: 'bg-teal-100 text-teal-800', emailField: 'email', nameField: 'name', filter: (q: any) => q.not('message', 'ilike', '%CHALLENGE%').not('message', 'ilike', '%POWER-OF-AI CHECK-IN%') },
    { key: 'abkuerzungBookings', label: 'Abkuerzung 1:1 Buchungen', table: 'abkuerzung_bookings', count: emailStats.abkuerzungBookings, color: 'bg-amber-100 text-amber-800', emailField: 'email', nameField: 'first_name' },
    { key: 'betaWaitlist', label: 'Beta Warteliste', table: 'beta_waitlist', count: emailStats.betaWaitlist, color: 'bg-gray-100 text-gray-800', emailField: 'email', nameField: 'first_name' },
  ];

  const adminSections = [
    {
      title: 'Adventskalender',
      description: 'Verwalte alle 24 Türchen des Adventskalenders mit Inhalten, Videos und Ressourcen',
      icon: Calendar,
      link: '/admin/adventskalender',
      color: 'from-red-500 to-red-600',
      stat: `${stats.adventDoors} Türchen`,
      features: ['Inhalte bearbeiten', 'Videos verwalten', 'Ressourcen hochladen', 'Vorschau']
    },
    {
      title: 'KI-Manager Anmeldungen',
      description: 'Verwalte alle Anmeldungen zur KI-Manager Ausbildung mit Kontaktdaten und Paketauswahl',
      icon: Brain,
      link: '/admin/ki-manager-anmeldungen',
      color: 'from-orange-500 to-red-600',
      stat: `${stats.kiManagerBookings} Anmeldungen`,
      features: ['Anmeldungen verwalten', 'Emails exportieren', 'Nach Paketen filtern', 'Suchfunktion']
    },
    {
      title: 'Buchprojekt-Anmeldungen',
      description: 'Bewerbungen zum Hauptbuch 2026 (Premiere Edition) — Tier, Add-Ons, Foto, QR-Code, Status',
      icon: BookOpen,
      link: '/admin/buchprojekt',
      color: 'from-fuchsia-500 to-pink-600',
      stat: `${stats.buchprojektAnmeldungen} Anmeldungen`,
      features: ['Bewerbungen sichten', 'Status & Notizen', 'Foto + QR ansehen', 'CSV-Export']
    },
    {
      title: 'Member-Bereich',
      description: 'Verwalte Studenten, Kurse, Module, Lektionen und den gesamten E-Learning Bereich',
      icon: GraduationCap,
      link: '/admin/member-kurse',
      color: 'from-purple-500 to-indigo-600',
      stat: `${stats.students} Studenten · ${stats.courses} Kurse`,
      features: ['Studenten verwalten', 'Kurse erstellen', 'Module & Lektionen', 'Quizze & Flashcards']
    },
    {
      title: 'Schritte Media',
      description: 'Verwalte Bilder und Videos für die Timeline-Schritte auf der Homepage',
      icon: Video,
      link: '/admin/schritte-media',
      color: 'from-blue-500 to-blue-600',
      stat: `${stats.stepMedia} Medien`,
      features: ['Bilder hochladen', 'Videos einbinden', 'Reihenfolge ändern', 'Vorschau']
    },
    {
      title: 'Testimonials',
      description: 'Verwalte Kundenstimmen im Reel-Format mit Thumbnails und Videos',
      icon: MessageSquare,
      link: '/admin/testimonials',
      color: 'from-green-500 to-green-600',
      stat: `${stats.testimonials} Testimonials`,
      features: ['Videos hinzufügen', 'Thumbnails hochladen', 'Sortierung anpassen', 'Aktiv/Inaktiv']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-600">Laden...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />

      <div className="lg:pl-72 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Willkommen im Admin-Bereich
          </h1>
          <p className="text-xl text-gray-600">
            Verwalte alle Inhalte deiner Website zentral an einem Ort
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.link}
                to={section.link}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {section.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <BarChart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">
                      {section.stat}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <ul className="space-y-2">
                      {section.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">E-Mail Registrierungen</h2>
                <p className="text-sm text-gray-500">Alle Eintragungen aus verschiedenen Quellen</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-2xl font-bold text-gray-900">{totalEmails}</span>
                <span className="text-sm text-gray-500">gesamt</span>
              </div>
              <button
                onClick={exportAllEmailsCSV}
                disabled={exportingAll || totalEmails === 0}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileDown className="w-4 h-4" />
                {exportingAll ? 'Exportiere...' : 'Alle als CSV'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {emailSources.map((source) => (
              <div key={source.key} className="border border-gray-100 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSourceExpand(source)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${source.color}`}>
                      {source.count}
                    </span>
                    <span className="font-medium text-gray-800">{source.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); exportSourceCSV(source); }}
                      disabled={source.count === 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Diese Liste als CSV herunterladen"
                    >
                      <FileDown className="w-4 h-4" />
                      CSV
                    </button>
                    {expandedSource === source.key ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedSource === source.key && sourceData[source.key] && (() => {
                  const rows = sourceData[source.key];
                  const emailCounts: Record<string, number> = {};
                  rows.forEach((r: any) => {
                    const e = String(r[source.emailField] ?? '').toLowerCase().trim();
                    if (e) emailCounts[e] = (emailCounts[e] || 0) + 1;
                  });
                  const dupTotal = Object.values(emailCounts).filter((n) => n > 1).reduce((a, n) => a + (n - 1), 0);
                  return (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                      <input
                        type="email"
                        placeholder="E-Mail hinzufügen *"
                        value={newEntry.email}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewEntry(p => ({ ...p, email: e.target.value }))}
                        className="flex-1 min-w-[180px] px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Vorname"
                        value={newEntry.firstName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewEntry(p => ({ ...p, firstName: e.target.value }))}
                        className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Nachname"
                        value={newEntry.lastName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewEntry(p => ({ ...p, lastName: e.target.value }))}
                        className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddEntry(source); }}
                        disabled={adding || !newEntry.email.trim()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />{adding ? 'Fügt hinzu…' : 'Hinzufügen'}
                      </button>
                    </div>
                    {rows.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-2">Keine Eintraege vorhanden</p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 mb-2">
                          {rows.length} Eintr&auml;ge{dupTotal > 0 ? ` · ${dupTotal} doppelt (gelb markiert)` : ''}
                        </p>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {rows.map((item: any) => {
                            const email = String(item[source.emailField] ?? '').toLowerCase().trim();
                            const isDup = !!email && emailCounts[email] > 1;
                            return (
                              <div key={item.id} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${isDup ? 'bg-amber-50 border border-amber-200' : 'bg-white'}`}>
                                <div className="flex items-center gap-2 min-w-0">
                                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-900 truncate">{item[source.emailField]}</span>
                                  {isDup && (
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-100 rounded-full px-2 py-0.5 flex-shrink-0">
                                      <Copy className="w-3 h-3" />doppelt
                                    </span>
                                  )}
                                  {item[source.nameField] && (
                                    <span className="text-gray-500 truncate hidden sm:inline">
                                      ({item[source.nameField]}{item.last_name ? ` ${item.last_name}` : ''}{item.name && source.nameField !== 'name' ? ` ${item.name}` : ''})
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  <span className="text-xs text-gray-400">
                                    {item.created_at ? new Date(item.created_at).toLocaleDateString('de-DE') : ''}
                                  </span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteEntry(source, item); }}
                                    disabled={deletingId === item.id}
                                    className="p-1.5 text-gray-300 hover:text-red-600 transition-colors disabled:opacity-50"
                                    title="Eintrag löschen"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Schnellzugriff
          </h2>
          <p className="text-blue-700 mb-4">
            Nutze die Navigation oben, um schnell zwischen den verschiedenen Admin-Bereichen zu wechseln.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/adventskalender"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Adventskalender öffnen
            </Link>
            <Link
              to="/admin/ki-manager-anmeldungen"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              KI-Manager Anmeldungen
            </Link>
            <Link
              to="/admin/member-kurse"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Member-Bereich öffnen
            </Link>
            <Link
              to="/admin/schritte-media"
              className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Schritte Media öffnen
            </Link>
            <Link
              to="/admin/testimonials"
              className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Testimonials öffnen
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
