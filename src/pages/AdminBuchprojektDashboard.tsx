import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Image as ImageIcon,
  QrCode,
  X,
  Star,
  Download,
} from 'lucide-react';
import { supabaseBuchprojekt as supabase } from '../lib/supabaseBuchprojekt';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';

/* ------------------------------------------------------------------
 * Buchprojekt-Anmeldungen — Admin-Übersicht
 * Liest aus Supabase-Tabelle `buchprojekt_anmeldungen`.
 * ------------------------------------------------------------------ */

interface Anmeldung {
  id: string;
  name: string;
  unternehmen: string | null;
  stadt: string | null;
  email: string;
  telefon: string | null;
  beitragstitel: string | null;
  story: string | null;
  ki_erfahrung: string | null;
  learnings: string | null;
  zukunft: string | null;
  cta: string | null;
  tier: 'standard' | 'business' | 'premium';
  tier_price: number;
  addon_sparring: boolean;
  addon_chronist: boolean;
  total_price: number;
  photo_url: string | null;
  qr_url: string | null;
  status: 'pending' | 'invoiced' | 'paid' | 'in_production' | 'delivered' | 'declined';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS: { value: Anmeldung['status']; label: string; color: string }[] = [
  { value: 'pending', label: 'Eingegangen', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'invoiced', label: 'Rechnung gestellt', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { value: 'paid', label: 'Bezahlt', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { value: 'in_production', label: 'In Produktion', color: 'bg-violet-100 text-violet-800 border-violet-200' },
  { value: 'delivered', label: 'Ausgeliefert', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { value: 'declined', label: 'Abgelehnt', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

const TIER_LABEL: Record<Anmeldung['tier'], string> = {
  standard: 'Standard · 555 €',
  business: 'Business · 777 €',
  premium: 'Premium · 999 €',
};

export default function AdminBuchprojektDashboard() {
  const navigate = useNavigate();
  const [list, setList] = useState<Anmeldung[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | Anmeldung['status']>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Anmeldung | null>(null);
  const [adminNoteDraft, setAdminNoteDraft] = useState('');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }
    fetchList();
  }, [navigate]);

  async function fetchList() {
    setLoading(true);
    const { data, error } = await supabase
      .from('buchprojekt_anmeldungen')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Fehler beim Laden der Anmeldungen:', error);
    } else if (data) {
      setList(data as Anmeldung[]);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: Anmeldung['status']) {
    const { error } = await supabase
      .from('buchprojekt_anmeldungen')
      .update({ status })
      .eq('id', id);
    if (error) {
      alert('Status konnte nicht aktualisiert werden: ' + error.message);
      return;
    }
    fetchList();
    if (selected?.id === id) {
      setSelected({ ...selected, status });
    }
  }

  async function saveAdminNotes(id: string, notes: string) {
    const { error } = await supabase
      .from('buchprojekt_anmeldungen')
      .update({ admin_notes: notes })
      .eq('id', id);
    if (error) {
      alert('Notizen konnten nicht gespeichert werden: ' + error.message);
      return;
    }
    fetchList();
    if (selected?.id === id) {
      setSelected({ ...selected, admin_notes: notes });
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter((a) => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        (a.unternehmen ?? '').toLowerCase().includes(q) ||
        (a.stadt ?? '').toLowerCase().includes(q) ||
        (a.beitragstitel ?? '').toLowerCase().includes(q)
      );
    });
  }, [list, statusFilter, search]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = { all: list.length };
    for (const a of list) counts[a.status] = (counts[a.status] ?? 0) + 1;
    const sum = list.reduce((s, a) => s + (a.total_price ?? 0), 0);
    return { counts, sum };
  }, [list]);

  function exportCSV() {
    const rows = [
      [
        'Erstellt',
        'Name',
        'Unternehmen',
        'Stadt',
        'E-Mail',
        'Telefon',
        'Tier',
        'Add-On Sparring',
        'Add-On Chronist',
        'Gesamtpreis',
        'Status',
        'Beitragstitel',
      ],
      ...list.map((a) => [
        new Date(a.created_at).toISOString(),
        a.name,
        a.unternehmen ?? '',
        a.stadt ?? '',
        a.email,
        a.telefon ?? '',
        a.tier,
        a.addon_sparring ? 'ja' : 'nein',
        a.addon_chronist ? 'ja' : 'nein',
        String(a.total_price),
        a.status,
        a.beitragstitel ?? '',
      ]),
    ];
    const csv = rows
      .map((r) =>
        r
          .map((c) => {
            const s = String(c).replace(/"/g, '""');
            return /[",;\n]/.test(s) ? `"${s}"` : s;
          })
          .join(';'),
      )
      .join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buchprojekt-anmeldungen-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4 mb-8">
          <div>
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/25">
                <BookOpen className="h-6 w-6" />
              </span>
              Buchprojekt-Anmeldungen
            </h1>
            <p className="mt-2 text-slate-600">
              Bewerbungen für „THE POWER OF AI – Hauptbuch 2026 · Premiere Edition".
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow"
          >
            <Download className="h-4 w-4" />
            CSV exportieren
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="Gesamt" value={stats.counts.all ?? 0} icon={<BookOpen className="h-4 w-4" />} />
          <StatCard label="Eingegangen" value={stats.counts.pending ?? 0} icon={<Calendar className="h-4 w-4" />} />
          <StatCard label="Bezahlt" value={stats.counts.paid ?? 0} icon={<Star className="h-4 w-4" />} />
          <StatCard label="Volumen brutto" value={`${stats.sum.toLocaleString('de-DE')} €`} icon={<Building2 className="h-4 w-4" />} />
        </div>

        {/* Filter / Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, E-Mail, Unternehmen, Stadt …"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 outline-none transition"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Anmeldung['status'])}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 outline-none appearance-none"
            >
              <option value="all">Alle Stati</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="px-6 py-16 text-center text-slate-500">Lädt …</div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-500">
              {list.length === 0
                ? 'Noch keine Anmeldungen vorhanden.'
                : 'Keine Anmeldungen für diese Filter gefunden.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Datum</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Unternehmen / Stadt</th>
                    <th className="px-4 py-3 text-left">Tier</th>
                    <th className="px-4 py-3 text-right">Gesamt</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((a) => {
                    const statusOpt = STATUS_OPTIONS.find((s) => s.value === a.status);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-4 py-3 text-slate-700 tabular-nums whitespace-nowrap">
                          {new Date(a.created_at).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{a.name}</div>
                          <div className="text-xs text-slate-500">{a.email}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {a.unternehmen ?? <span className="text-slate-400">—</span>}
                          {a.stadt && <div className="text-xs text-slate-500">{a.stadt}</div>}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{TIER_LABEL[a.tier]}</div>
                          {(a.addon_sparring || a.addon_chronist) && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {a.addon_sparring && '+ Sparring'}
                              {a.addon_sparring && a.addon_chronist && ' · '}
                              {a.addon_chronist && '+ Chronist'}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900 tabular-nums">
                          {a.total_price.toLocaleString('de-DE')} €
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                              statusOpt?.color ?? 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {statusOpt?.label ?? a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setSelected(a);
                              setAdminNoteDraft(a.admin_notes ?? '');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail-Modal */}
      {selected && (
        <DetailModal
          anmeldung={selected}
          adminNoteDraft={adminNoteDraft}
          onAdminNoteChange={setAdminNoteDraft}
          onClose={() => setSelected(null)}
          onUpdateStatus={(s) => updateStatus(selected.id, s)}
          onSaveNotes={() => saveAdminNotes(selected.id, adminNoteDraft)}
        />
      )}
    </div>
  );
}

/* ----------- Subcomponents ----------- */

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <span className="text-fuchsia-500">{icon}</span>
        {label}
      </div>
      <div className="mt-1 font-montserrat text-xl font-bold text-slate-900 tabular-nums">{value}</div>
    </div>
  );
}

function DetailModal({
  anmeldung,
  adminNoteDraft,
  onAdminNoteChange,
  onClose,
  onUpdateStatus,
  onSaveNotes,
}: {
  anmeldung: Anmeldung;
  adminNoteDraft: string;
  onAdminNoteChange: (v: string) => void;
  onClose: () => void;
  onUpdateStatus: (s: Anmeldung['status']) => void;
  onSaveNotes: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 px-6 py-5 md:px-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="font-montserrat text-xl md:text-2xl font-bold">{anmeldung.name}</h2>
          <p className="text-white/85 text-sm">{anmeldung.email}</p>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-8 space-y-6 text-slate-800">
          {/* Basisinfos */}
          <Grid2>
            <InfoLine icon={<Mail className="h-4 w-4" />} label="E-Mail" value={anmeldung.email} />
            <InfoLine icon={<Phone className="h-4 w-4" />} label="Telefon" value={anmeldung.telefon} />
            <InfoLine icon={<Building2 className="h-4 w-4" />} label="Unternehmen" value={anmeldung.unternehmen} />
            <InfoLine icon={<MapPin className="h-4 w-4" />} label="Stadt" value={anmeldung.stadt} />
            <InfoLine icon={<Calendar className="h-4 w-4" />} label="Eingegangen" value={new Date(anmeldung.created_at).toLocaleString('de-DE')} />
          </Grid2>

          {/* Produkt */}
          <Section title="Produkt">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-slate-900">{TIER_LABEL[anmeldung.tier]}</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {anmeldung.tier_price.toLocaleString('de-DE')} €
                </span>
              </div>
              {anmeldung.addon_sparring && (
                <div className="flex items-baseline justify-between text-sm text-slate-700">
                  <span>+ Story-Sparring</span>
                  <span className="font-mono tabular-nums">333 €</span>
                </div>
              )}
              {anmeldung.addon_chronist && (
                <div className="flex items-baseline justify-between text-sm text-slate-700">
                  <span>+ Persönlicher Chronist</span>
                  <span className="font-mono tabular-nums">1.555 €</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 mt-2 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Gesamtpreis</span>
                <span className="font-montserrat font-bold text-xl text-slate-900 tabular-nums">
                  {anmeldung.total_price.toLocaleString('de-DE')} €
                </span>
              </div>
            </div>
          </Section>

          {/* Beitrag */}
          {(anmeldung.beitragstitel || anmeldung.story || anmeldung.ki_erfahrung || anmeldung.learnings || anmeldung.zukunft || anmeldung.cta) && (
            <Section title="Beitrag">
              {anmeldung.beitragstitel && <FieldBlock label="Beitragstitel">{anmeldung.beitragstitel}</FieldBlock>}
              {anmeldung.story && <FieldBlock label="Story">{anmeldung.story}</FieldBlock>}
              {anmeldung.ki_erfahrung && <FieldBlock label="KI-Erfahrung">{anmeldung.ki_erfahrung}</FieldBlock>}
              {anmeldung.learnings && <FieldBlock label="Learnings">{anmeldung.learnings}</FieldBlock>}
              {anmeldung.zukunft && <FieldBlock label="Zukunft & Positionierung">{anmeldung.zukunft}</FieldBlock>}
              {anmeldung.cta && <FieldBlock label="Call-to-Action">{anmeldung.cta}</FieldBlock>}
            </Section>
          )}

          {/* Uploads */}
          {(anmeldung.photo_url || anmeldung.qr_url) && (
            <Section title="Uploads">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anmeldung.photo_url && (
                  <UploadPreview
                    icon={<ImageIcon className="h-4 w-4" />}
                    label="Portrait-Foto"
                    url={anmeldung.photo_url}
                  />
                )}
                {anmeldung.qr_url && (
                  <UploadPreview
                    icon={<QrCode className="h-4 w-4" />}
                    label="QR-Code"
                    url={anmeldung.qr_url}
                  />
                )}
              </div>
            </Section>
          )}

          {/* Status */}
          <Section title="Status">
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => {
                const active = anmeldung.status === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => onUpdateStatus(s.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      active ? `${s.color} ring-2 ring-offset-1 ring-fuchsia-400` : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Admin-Notizen */}
          <Section title="Interne Notizen">
            <textarea
              value={adminNoteDraft}
              onChange={(e) => onAdminNoteChange(e.target.value)}
              rows={4}
              placeholder="Notizen für dich und dein Team …"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 outline-none transition"
            />
            <button
              onClick={onSaveNotes}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
            >
              Notizen speichern
            </button>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-slate-400 mt-0.5">{icon}</span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
        <div className="text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500 mb-3">{title}</h3>
      {children}
    </section>
  );
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
        {children}
      </div>
    </div>
  );
}

function UploadPreview({ icon, label, url }: { icon: React.ReactNode; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-slate-200 hover:border-fuchsia-400 hover:shadow-md transition bg-white overflow-hidden"
    >
      <div className="aspect-square bg-slate-50 flex items-center justify-center">
        <img src={url} alt={label} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="px-3 py-2 flex items-center gap-2 text-xs text-slate-600">
        <span className="text-fuchsia-500">{icon}</span>
        {label} öffnen ↗
      </div>
    </a>
  );
}
