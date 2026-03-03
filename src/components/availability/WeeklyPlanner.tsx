import { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Check, X, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  AvailabilitySlot, DAY_NAMES, DAY_NAMES_SHORT, DAY_ORDER,
  HOUR_START, HOUR_END, generateTimeOptions, timeToMinutes
} from '../../lib/availabilityTypes';

interface Props {
  slots: AvailabilitySlot[];
  onRefresh: () => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

const TOTAL_HOURS = HOUR_END - HOUR_START;

export default function WeeklyPlanner({ slots, onRefresh, onToast }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [formDay, setFormDay] = useState(1);
  const [formStart, setFormStart] = useState('09:00');
  const [formEnd, setFormEnd] = useState('17:00');
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySource, setCopySource] = useState(1);
  const [copyTargets, setCopyTargets] = useState<Set<number>>(new Set());

  const timeOptions = generateTimeOptions();

  const slotsByDay = slots.reduce((acc, s) => {
    if (!acc[s.day_of_week]) acc[s.day_of_week] = [];
    acc[s.day_of_week].push(s);
    return acc;
  }, {} as Record<number, AvailabilitySlot[]>);

  const getPosition = (startTime: string, endTime: string) => {
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);
    const dayStartMins = HOUR_START * 60;
    const totalMins = TOTAL_HOURS * 60;
    return {
      top: `${((startMins - dayStartMins) / totalMins) * 100}%`,
      height: `${((endMins - startMins) / totalMins) * 100}%`
    };
  };

  const openAddModal = (dayNum: number) => {
    setEditingSlot(null);
    setFormDay(dayNum);
    setFormStart('09:00');
    setFormEnd('17:00');
    setFormActive(true);
    setShowModal(true);
  };

  const openEditModal = (slot: AvailabilitySlot) => {
    setEditingSlot(slot);
    setFormDay(slot.day_of_week);
    setFormStart(slot.start_time);
    setFormEnd(slot.end_time);
    setFormActive(slot.is_active);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (timeToMinutes(formEnd) <= timeToMinutes(formStart)) {
      onToast('Endzeit muss nach Startzeit liegen', 'error');
      return;
    }
    setSaving(true);

    const payload = {
      day_of_week: formDay,
      start_time: formStart,
      end_time: formEnd,
      is_active: formActive
    };

    if (editingSlot) {
      const { error } = await supabase
        .from('availability_slots')
        .update(payload)
        .eq('id', editingSlot.id);
      if (error) onToast('Fehler beim Speichern', 'error');
      else {
        onToast('Zeitblock aktualisiert', 'success');
        setShowModal(false);
        onRefresh();
      }
    } else {
      const { error } = await supabase
        .from('availability_slots')
        .insert(payload);
      if (error) onToast('Fehler beim Erstellen', 'error');
      else {
        onToast('Zeitblock erstellt', 'success');
        setShowModal(false);
        onRefresh();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Zeitblock wirklich löschen?')) return;
    const { error } = await supabase.from('availability_slots').delete().eq('id', id);
    if (error) onToast('Fehler beim Löschen', 'error');
    else { onToast('Zeitblock gelöscht', 'success'); onRefresh(); }
  };

  const toggleActive = async (slot: AvailabilitySlot) => {
    const { error } = await supabase
      .from('availability_slots')
      .update({ is_active: !slot.is_active })
      .eq('id', slot.id);
    if (!error) {
      onToast(slot.is_active ? 'Zeitblock deaktiviert' : 'Zeitblock aktiviert', 'success');
      onRefresh();
    }
  };

  const handleCopy = async () => {
    if (copyTargets.size === 0) {
      onToast('Bitte wählen Sie mindestens einen Zieltag', 'error');
      return;
    }
    const sourceSlots = slotsByDay[copySource] || [];
    if (sourceSlots.length === 0) {
      onToast('Der Quelltag hat keine Zeitblöcke', 'error');
      return;
    }
    if (!confirm(`Die bestehenden Zeitblöcke der ${copyTargets.size} Zieltag(e) werden ersetzt. Fortfahren?`)) return;

    setSaving(true);
    for (const targetDay of copyTargets) {
      await supabase.from('availability_slots').delete().eq('day_of_week', targetDay);
      const newSlots = sourceSlots.map(s => ({
        day_of_week: targetDay,
        start_time: s.start_time,
        end_time: s.end_time,
        is_active: s.is_active
      }));
      await supabase.from('availability_slots').insert(newSlots);
    }
    setSaving(false);
    setShowCopyModal(false);
    setCopyTargets(new Set());
    onToast(`Zeiten auf ${copyTargets.size} Tag(e) kopiert`, 'success');
    onRefresh();
  };

  const toggleCopyTarget = (day: number) => {
    const next = new Set(copyTargets);
    if (next.has(day)) next.delete(day); else next.add(day);
    setCopyTargets(next);
  };

  const hours = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => HOUR_START + i);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAddModal(1)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Zeitblock hinzufügen
          </button>
          <button
            onClick={() => setShowCopyModal(true)}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            <Copy className="w-4 h-4" />
            Vorlage kopieren
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" /> Aktiv
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gray-300" /> Inaktiv
          </span>
        </div>
      </div>

      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
          <div className="bg-gray-50 border-b border-r border-gray-200 p-2" />
          {DAY_ORDER.map(d => {
            const daySlots = slotsByDay[d] || [];
            const activeCount = daySlots.filter(s => s.is_active).length;
            return (
              <div
                key={d}
                className="bg-gray-50 border-b border-r border-gray-200 p-3 text-center cursor-pointer hover:bg-gray-100 transition"
                onClick={() => openAddModal(d)}
              >
                <div className="font-semibold text-gray-900 text-sm">{DAY_NAMES_SHORT[d]}</div>
                {activeCount > 0 && (
                  <div className="text-xs text-emerald-600 mt-0.5">{activeCount} Block{activeCount > 1 ? 'öcke' : ''}</div>
                )}
              </div>
            );
          })}

          <div className="border-r border-gray-200 relative" style={{ height: `${TOTAL_HOURS * 50}px` }}>
            {hours.map((h, i) => (
              <div
                key={h}
                className="absolute left-0 right-0 flex items-start justify-end pr-2 text-xs text-gray-400 font-medium"
                style={{ top: `${(i / TOTAL_HOURS) * 100}%` }}
              >
                {`${String(h).padStart(2, '0')}:00`}
              </div>
            ))}
          </div>

          {DAY_ORDER.map(d => {
            const daySlots = slotsByDay[d] || [];
            return (
              <div
                key={d}
                className="border-r border-gray-200 relative cursor-pointer group"
                style={{ height: `${TOTAL_HOURS * 50}px` }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.slot-block')) return;
                  openAddModal(d);
                }}
              >
                {hours.map((h, i) => (
                  <div key={h} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: `${(i / TOTAL_HOURS) * 100}%` }} />
                ))}

                {daySlots.map(slot => {
                  const pos = getPosition(slot.start_time, slot.end_time);
                  return (
                    <div
                      key={slot.id}
                      className={`slot-block absolute left-1 right-1 rounded-lg px-2 py-1 transition-all cursor-pointer group/slot ${
                        slot.is_active
                          ? 'bg-emerald-100 border border-emerald-300 hover:bg-emerald-200'
                          : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 opacity-60'
                      }`}
                      style={{ top: pos.top, height: pos.height, minHeight: '28px', zIndex: 10 }}
                      onClick={(e) => { e.stopPropagation(); openEditModal(slot); }}
                    >
                      <div className="flex items-center justify-between h-full">
                        <div className="text-xs font-medium text-gray-800 truncate">
                          {slot.start_time} - {slot.end_time}
                        </div>
                        <div className="hidden group-hover/slot:flex items-center gap-0.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleActive(slot); }}
                            className={`p-0.5 rounded ${slot.is_active ? 'text-emerald-700 hover:bg-emerald-300' : 'text-gray-500 hover:bg-gray-300'}`}
                          >
                            {slot.is_active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(slot.id); }}
                            className="p-0.5 rounded text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none z-0">
                  <div className="bg-blue-500/10 rounded-lg px-3 py-1.5">
                    <Plus className="w-4 h-4 text-blue-500 mx-auto" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {DAY_ORDER.map(d => {
          const daySlots = slotsByDay[d] || [];
          return (
            <div key={d} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{DAY_NAMES[d]}</h3>
                <button
                  onClick={() => openAddModal(d)}
                  className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {daySlots.length === 0 ? (
                <p className="text-sm text-gray-400">Keine Zeiten eingetragen</p>
              ) : (
                <div className="space-y-2">
                  {daySlots.map(slot => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        slot.is_active
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-gray-50 border border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{slot.start_time} - {slot.end_time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleActive(slot)} className="p-1.5 rounded hover:bg-white transition">
                          {slot.is_active ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-gray-400" />}
                        </button>
                        <button onClick={() => openEditModal(slot)} className="p-1.5 rounded hover:bg-white transition">
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(slot.id)} className="p-1.5 rounded hover:bg-white transition">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSlot ? 'Zeitblock bearbeiten' : 'Neuer Zeitblock'}
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Wochentag</label>
                <select
                  value={formDay}
                  onChange={e => setFormDay(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {DAY_ORDER.map(d => (
                    <option key={d} value={d}>{DAY_NAMES[d]}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Von</label>
                  <select
                    value={formStart}
                    onChange={e => setFormStart(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bis</label>
                  <select
                    value={formEnd}
                    onChange={e => setFormEnd(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setFormActive(!formActive)}
                  className={`relative w-11 h-6 rounded-full transition ${formActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${formActive ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm font-medium text-gray-700">{formActive ? 'Aktiv' : 'Inaktiv'}</span>
              </label>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                {saving ? 'Speichern...' : editingSlot ? 'Speichern' : 'Erstellen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCopyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowCopyModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Vorlage kopieren</h2>
              <p className="text-sm text-gray-500 mt-1">Übertragen Sie die Zeiten eines Tages auf andere Wochentage</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quelltag (kopieren von)</label>
                <select
                  value={copySource}
                  onChange={e => { setCopySource(Number(e.target.value)); setCopyTargets(new Set()); }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {DAY_ORDER.map(d => {
                    const count = (slotsByDay[d] || []).length;
                    return (
                      <option key={d} value={d}>
                        {DAY_NAMES[d]} ({count} Block{count !== 1 ? 'öcke' : ''})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zieltage (kopieren nach)</label>
                <div className="grid grid-cols-2 gap-2">
                  {DAY_ORDER.filter(d => d !== copySource).map(d => (
                    <label
                      key={d}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${
                        copyTargets.has(d) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={copyTargets.has(d)}
                        onChange={() => toggleCopyTarget(d)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">{DAY_NAMES[d]}</span>
                    </label>
                  ))}
                </div>
              </div>
              {copyTargets.size > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                  Die bestehenden Zeitblöcke der {copyTargets.size} Zieltag(e) werden durch die Kopie ersetzt.
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => { setShowCopyModal(false); setCopyTargets(new Set()); }}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={handleCopy}
                disabled={saving || copyTargets.size === 0}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                {saving ? 'Kopiere...' : `Auf ${copyTargets.size} Tag(e) kopieren`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
