import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  Calendar,
  Star,
  ArrowRight,
  Image as ImageIcon,
  QrCode,
  CheckCircle2,
  Clock,
  Truck,
  Receipt,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import MemberNavigation from '../components/MemberNavigation';

/* ------------------------------------------------------------------
 * Member-View: eigene Buchprojekt-Anmeldung
 * Liest aus `buchprojekt_anmeldungen` per E-Mail-Match.
 * ------------------------------------------------------------------ */

interface Anmeldung {
  id: string;
  name: string;
  unternehmen: string | null;
  stadt: string | null;
  email: string;
  beitragstitel: string | null;
  tier: 'standard' | 'business' | 'premium';
  tier_price: number;
  addon_sparring: boolean;
  addon_chronist: boolean;
  total_price: number;
  photo_url: string | null;
  qr_url: string | null;
  status: 'pending' | 'invoiced' | 'paid' | 'in_production' | 'delivered' | 'declined';
  created_at: string;
}

const TIER_LABEL: Record<Anmeldung['tier'], { name: string; perks: string }> = {
  standard: { name: 'Standard', perks: '4 Seiten · 50 Hardcover' },
  business: { name: 'Business', perks: '6 Seiten · 60 Hardcover' },
  premium: { name: 'Premium', perks: '8 Seiten · 70 Hardcover' },
};

const STATUS_FLOW: { key: Anmeldung['status']; label: string; icon: React.ElementType }[] = [
  { key: 'pending', label: 'Bewerbung eingegangen', icon: CheckCircle2 },
  { key: 'invoiced', label: 'Rechnung versendet', icon: Receipt },
  { key: 'paid', label: 'Bezahlt — Platz fix', icon: Star },
  { key: 'in_production', label: 'In Produktion', icon: Clock },
  { key: 'delivered', label: 'Bei dir', icon: Truck },
];

export default function MemberBuchprojekt() {
  const { student } = useStudentAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [anmeldung, setAnmeldung] = useState<Anmeldung | null>(null);

  useEffect(() => {
    if (!student) {
      navigate('/member/login');
      return;
    }
    void fetchAnmeldung();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.email]);

  async function fetchAnmeldung() {
    if (!student?.email) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('buchprojekt_anmeldungen')
      .select('id, name, unternehmen, stadt, email, beitragstitel, tier, tier_price, addon_sparring, addon_chronist, total_price, photo_url, qr_url, status, created_at')
      .ilike('email', student.email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Fehler beim Laden der Anmeldung:', error);
    }
    setAnmeldung((data as Anmeldung | null) ?? null);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MemberNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 lg:pl-[18rem]">
        <Link
          to="/member/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Zurück zum Dashboard
        </Link>

        <div className="flex items-start gap-3 mb-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/25 flex-shrink-0">
            <BookOpen className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900">
              Mein Buchprojekt
            </h1>
            <p className="mt-1 text-slate-600">
              Status deiner Bewerbung für das Hauptbuch 2026 · Premiere Edition.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-16 text-center text-slate-500">
            Lädt …
          </div>
        ) : !anmeldung ? (
          <EmptyState />
        ) : (
          <Detail anmeldung={anmeldung} />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 mb-5">
        <BookOpen className="h-7 w-7" />
      </span>
      <h2 className="font-montserrat text-2xl font-bold text-slate-900 mb-3">
        Noch keine Anmeldung gefunden
      </h2>
      <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
        Wir haben unter deiner E-Mail keine Bewerbung für das Hauptbuch gefunden.
        Wenn du dabei sein willst — der Premiere-Edition gehören 77 Persönlichkeiten an.
      </p>
      <Link
        to="/buchprojekt"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/35 transition"
      >
        Zum Buchprojekt
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Detail({ anmeldung }: { anmeldung: Anmeldung }) {
  const tier = TIER_LABEL[anmeldung.tier];
  const currentIdx = STATUS_FLOW.findIndex((s) => s.key === anmeldung.status);
  const isDeclined = anmeldung.status === 'declined';

  return (
    <div className="space-y-6">
      {/* Status-Timeline */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500 mb-5">
          Dein Status
        </h3>

        {isDeclined ? (
          <div className="rounded-xl bg-rose-50 border border-rose-200 px-5 py-4 text-rose-800 text-sm">
            Deine Bewerbung wurde leider nicht angenommen. Bei Fragen melde dich gerne direkt bei
            uns.
          </div>
        ) : (
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {STATUS_FLOW.map((s, i) => {
              const Icon = s.icon;
              const done = i <= currentIdx;
              const active = i === currentIdx;
              return (
                <li
                  key={s.key}
                  className={`relative rounded-2xl p-4 border transition ${
                    active
                      ? 'bg-gradient-to-br from-fuchsia-50 to-pink-50 border-fuchsia-300 shadow-sm'
                      : done
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                        active
                          ? 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white'
                          : done
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Schritt {i + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">
                    {s.label}
                  </p>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Produkt + Preise */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500">
              Dein Produkt
            </h3>
            <p className="font-montserrat text-2xl font-bold text-slate-900 mt-1">{tier.name}</p>
            <p className="text-sm text-slate-600">{tier.perks}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">Gesamt</p>
            <p className="font-montserrat text-3xl font-bold text-slate-900 tabular-nums">
              {anmeldung.total_price.toLocaleString('de-DE')} €
            </p>
          </div>
        </div>

        {(anmeldung.addon_sparring || anmeldung.addon_chronist) && (
          <div className="border-t border-slate-100 pt-4 mt-4 space-y-1.5 text-sm text-slate-700">
            {anmeldung.addon_sparring && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Story-Sparring dazugebucht
              </div>
            )}
            {anmeldung.addon_chronist && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Persönlicher Chronist dazugebucht
              </div>
            )}
          </div>
        )}
      </div>

      {/* Beitrag + Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {anmeldung.beitragstitel && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500 mb-2">
              Dein Beitragstitel
            </h3>
            <p className="text-slate-900 font-semibold leading-snug">{anmeldung.beitragstitel}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500 mb-3">
            Bewerbung eingegangen
          </h3>
          <p className="flex items-center gap-2 text-slate-800 font-semibold">
            <Calendar className="h-4 w-4 text-slate-400" />
            {new Date(anmeldung.created_at).toLocaleString('de-DE', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {(anmeldung.photo_url || anmeldung.qr_url) && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-500 mb-4">
            Eingereichte Dateien
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anmeldung.photo_url && (
              <a
                href={anmeldung.photo_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 hover:border-pink-400 hover:shadow-md transition bg-white overflow-hidden"
              >
                <div className="aspect-square bg-slate-50 flex items-center justify-center">
                  <img
                    src={anmeldung.photo_url}
                    alt="Portrait"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="px-4 py-2.5 flex items-center gap-2 text-xs text-slate-600">
                  <ImageIcon className="h-4 w-4 text-pink-500" />
                  Portrait-Foto öffnen ↗
                </div>
              </a>
            )}
            {anmeldung.qr_url && (
              <a
                href={anmeldung.qr_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 hover:border-pink-400 hover:shadow-md transition bg-white overflow-hidden"
              >
                <div className="aspect-square bg-slate-50 flex items-center justify-center">
                  <img
                    src={anmeldung.qr_url}
                    alt="QR-Code"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="px-4 py-2.5 flex items-center gap-2 text-xs text-slate-600">
                  <QrCode className="h-4 w-4 text-pink-500" />
                  QR-Code öffnen ↗
                </div>
              </a>
            )}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-400">
        Fragen zu deiner Anmeldung? Antworte einfach auf die Bestätigungsmail —
        wir melden uns persönlich.
      </p>
    </div>
  );
}
