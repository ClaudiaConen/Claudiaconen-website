import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Trash2, MapPin, User, Clock } from 'lucide-react';
import {
  listTermine,
  createTermin,
  updateTermin,
  deleteTermin,
  type Termin,
  type TerminArt,
  type TerminEingabe,
} from '../../lib/teamTermine';

/**
 * Gemeinsame Terminuebersicht fuer Claudia & Gabi im Website-Admin (/admin/buchungen).
 * Monatskalender mit Anlegen/Bearbeiten/Loeschen. Laeuft ueber die geschuetzte
 * Edge-Function (Admin-Login wird geprueft), darum sind Kundentermine nicht oeffentlich lesbar.
 */

const ART_META: Record<TerminArt, { label: string; chip: string; dot: string }> = {
  event: { label: 'Event', chip: 'bg-amber-100 text-amber-900 border-amber-300', dot: 'bg-amber-500' },
  workshop: { label: 'Workshop', chip: 'bg-emerald-100 text-emerald-900 border-emerald-300', dot: 'bg-emerald-500' },
  kunde: { label: 'Kundentermin', chip: 'bg-indigo-100 text-indigo-900 border-indigo-300', dot: 'bg-indigo-500' },
  sonstiges: { label: 'Sonstiges', chip: 'bg-slate-100 text-slate-800 border-slate-300', dot: 'bg-slate-500' },
};
const ARTEN: TerminArt[] = ['event', 'workshop', 'kunde', 'sonstiges'];
const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function pad(n: number) { return String(n).padStart(2, '0'); }
function dateStr(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function timeStr(d: Date) { return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

interface FormState {
  id: string | null;
  titel: string; art: TerminArt; datum: string;
  ganztags: boolean; von: string; bis: string;
  wer: string; ort: string; kunde: string; notizen: string;
}
function leeresFormular(datum: string): FormState {
  return { id: null, titel: '', art: 'kunde', datum, ganztags: false, von: '10:00', bis: '11:00', wer: 'Claudia', ort: '', kunde: '', notizen: '' };
}
function formAus(t: Termin): FormState {
  const s = new Date(t.start_am);
  const e = t.ende_am ? new Date(t.ende_am) : null;
  return {
    id: t.id, titel: t.titel, art: t.art, datum: dateStr(s),
    ganztags: t.ganztags, von: timeStr(s), bis: e ? timeStr(e) : '',
    wer: t.wer || '', ort: t.ort || '', kunde: t.kunde || '', notizen: t.notizen || '',
  };
}

export default function TeamTerminKalender() {
  const [termine, setTermine] = useState<Termin[]>([]);
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState<string | null>(null);
  const [monat, setMonat] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [form, setForm] = useState<FormState | null>(null);
  const [speichert, setSpeichert] = useState(false);

  async function laden_() {
    setLaden(true); setFehler(null);
    try { setTermine(await listTermine()); }
    catch (e) { setFehler(e instanceof Error ? e.message : 'Fehler beim Laden'); }
    finally { setLaden(false); }
  }
  useEffect(() => { laden_(); }, []);

  const heute = new Date();
  const zellen = useMemo(() => {
    const first = new Date(monat.getFullYear(), monat.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // Montag = 0
    const start = new Date(first); start.setDate(first.getDate() - offset);
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  }, [monat]);

  const proTag = useMemo(() => {
    const map = new Map<string, Termin[]>();
    for (const t of termine) {
      const key = dateStr(new Date(t.start_am));
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return map;
  }, [termine]);

  function neu(d: Date) { setForm(leeresFormular(dateStr(d))); }
  function bearbeiten(t: Termin) { setForm(formAus(t)); }

  async function speichern() {
    if (!form) return;
    if (!form.titel.trim()) { setFehler('Bitte einen Titel eingeben.'); return; }
    setSpeichert(true); setFehler(null);
    try {
      const start = new Date(`${form.datum}T${form.ganztags ? '00:00' : (form.von || '00:00')}`);
      const ende = !form.ganztags && form.bis ? new Date(`${form.datum}T${form.bis}`) : null;
      const eingabe: TerminEingabe = {
        titel: form.titel.trim(), art: form.art,
        start_am: start.toISOString(), ende_am: ende ? ende.toISOString() : null,
        ganztags: form.ganztags,
        wer: form.wer.trim() || null, ort: form.ort.trim() || null,
        kunde: form.kunde.trim() || null, notizen: form.notizen.trim() || null,
      };
      if (form.id) await updateTermin(form.id, eingabe);
      else await createTermin(eingabe);
      setForm(null);
      await laden_();
    } catch (e) { setFehler(e instanceof Error ? e.message : 'Speichern fehlgeschlagen'); }
    finally { setSpeichert(false); }
  }

  async function loeschen() {
    if (!form?.id) return;
    if (!window.confirm('Diesen Termin wirklich löschen?')) return;
    setSpeichert(true); setFehler(null);
    try { await deleteTermin(form.id); setForm(null); await laden_(); }
    catch (e) { setFehler(e instanceof Error ? e.message : 'Löschen fehlgeschlagen'); }
    finally { setSpeichert(false); }
  }

  const set = (p: Partial<FormState>) => setForm((f) => (f ? { ...f, ...p } : f));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gemeinsame Termine</h2>
          <p className="text-sm text-slate-500">Events, Workshops und Kundentermine von Claudia &amp; Gabi</p>
        </div>
        <button onClick={() => neu(new Date())} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" /> Neuer Termin
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-1">
          <button onClick={() => setMonat(new Date(monat.getFullYear(), monat.getMonth() - 1, 1))} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Vorheriger Monat"><ChevronLeft className="w-5 h-5" /></button>
          <span className="min-w-[11rem] text-center font-semibold text-slate-800">{MONATE[monat.getMonth()]} {monat.getFullYear()}</span>
          <button onClick={() => setMonat(new Date(monat.getFullYear(), monat.getMonth() + 1, 1))} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Nächster Monat"><ChevronRight className="w-5 h-5" /></button>
          <button onClick={() => { const d = new Date(); setMonat(new Date(d.getFullYear(), d.getMonth(), 1)); }} className="ml-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Heute</button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {ARTEN.map((a) => (
            <span key={a} className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <span className={`w-2.5 h-2.5 rounded-full ${ART_META[a].dot}`} /> {ART_META[a].label}
            </span>
          ))}
        </div>
      </div>

      {fehler && !form && <div className="mb-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">{fehler}</div>}

      <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
        {WOCHENTAGE.map((w) => (
          <div key={w} className="bg-slate-50 text-center text-xs font-semibold text-slate-500 py-2">{w}</div>
        ))}
        {zellen.map((d, i) => {
          const imMonat = d.getMonth() === monat.getMonth();
          const istHeute = sameDay(d, heute);
          const eintraege = proTag.get(dateStr(d)) || [];
          return (
            <div key={i} onClick={() => neu(d)} className={`min-h-[92px] bg-white p-1.5 cursor-pointer hover:bg-slate-50 transition-colors ${imMonat ? '' : 'bg-slate-50/60'}`}>
              <div className={`text-xs mb-1 inline-flex items-center justify-center w-6 h-6 rounded-full ${istHeute ? 'bg-emerald-600 text-white font-bold' : imMonat ? 'text-slate-700' : 'text-slate-400'}`}>{d.getDate()}</div>
              <div className="space-y-1">
                {eintraege.slice(0, 3).map((t) => (
                  <button key={t.id} onClick={(e) => { e.stopPropagation(); bearbeiten(t); }} className={`block w-full text-left truncate rounded border px-1.5 py-0.5 text-[11px] leading-tight ${ART_META[t.art].chip}`} title={t.titel}>
                    {!t.ganztags && <span className="font-semibold">{timeStr(new Date(t.start_am))} </span>}{t.titel}
                  </button>
                ))}
                {eintraege.length > 3 && <div className="text-[11px] text-slate-400 pl-1">+{eintraege.length - 3} mehr</div>}
              </div>
            </div>
          );
        })}
      </div>

      {laden && <p className="text-sm text-slate-400 mt-3">Lade Termine …</p>}

      {form && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4" onClick={() => setForm(null)}>
          <div className="mt-10 w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-lg font-bold text-slate-900">{form.id ? 'Termin bearbeiten' : 'Neuer Termin'}</h3>
              <button onClick={() => setForm(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Titel</label>
                <input value={form.titel} onChange={(e) => set({ titel: e.target.value })} placeholder="z. B. Workshop Köln / Erstgespräch Frau Müller" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Art</label>
                  <select value={form.art} onChange={(e) => set({ art: e.target.value as TerminArt })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none">
                    {ARTEN.map((a) => <option key={a} value={a}>{ART_META[a].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Wer</label>
                  <select value={form.wer} onChange={(e) => set({ wer: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none">
                    <option value="Claudia">Claudia</option>
                    <option value="Gabi">Gabi</option>
                    <option value="Beide">Beide</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Datum</label>
                <input type="date" value={form.datum} onChange={(e) => set({ datum: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.ganztags} onChange={(e) => set({ ganztags: e.target.checked })} className="h-4 w-4 accent-emerald-600" /> Ganztägig
              </label>
              {!form.ganztags && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Von</label>
                    <input type="time" value={form.von} onChange={(e) => set({ von: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bis</label>
                    <input type="time" value={form.bis} onChange={(e) => set({ bis: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"><MapPin className="w-3.5 h-3.5 inline -mt-0.5" /> Ort (optional)</label>
                <input value={form.ort} onChange={(e) => set({ ort: e.target.value })} placeholder="z. B. Motorworld Köln / Online" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"><User className="w-3.5 h-3.5 inline -mt-0.5" /> Kunde / Kontakt (optional)</label>
                <input value={form.kunde} onChange={(e) => set({ kunde: e.target.value })} placeholder="Name der Kundin / des Kunden" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notizen (optional)</label>
                <textarea value={form.notizen} onChange={(e) => set({ notizen: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none" />
              </div>
              {fehler && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">{fehler}</div>}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
              {form.id ? (
                <button onClick={loeschen} disabled={speichert} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"><Trash2 className="w-4 h-4" /> Löschen</button>
              ) : <span />}
              <div className="flex items-center gap-2">
                <button onClick={() => setForm(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Abbrechen</button>
                <button onClick={speichern} disabled={speichert} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60">
                  <Clock className="w-4 h-4" /> {speichert ? 'Speichert …' : 'Speichern'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
