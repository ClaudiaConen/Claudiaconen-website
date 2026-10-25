import { useEffect, useState, type FormEvent } from 'react';
import { supabaseCms } from '../lib/supabaseCms';

/**
 * Tag 8 "Vernetzt euch" im Mitgliederbereich (Claudia, 25.10.2026 16:47): alle tragen ihre Social-Media-Kanaele und
 * einen Werbe-Pitch ein, alle sehen die Visitenkarten der anderen. Speicher: eamm-Tabelle netzwerk_eintraege
 * (legt Gabi per SQL an, siehe projects/claudiaconen/angebote/gabi_tentary/SQL_Netzwerk_Tag8.sql). Ohne Tabelle
 * zeigt die Wand einen freundlichen Hinweis statt eines Fehlers.
 */
const AB = '2026-11-03T07:00:00+01:00';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

type Eintrag = { id?: string; name: string; beruf: string; instagram: string; linkedin: string; facebook: string; tiktok: string; website: string; pitch: string };
const LEER: Eintrag = { name: '', beruf: '', instagram: '', linkedin: '', facebook: '', tiktok: '', website: '', pitch: '' };
const KANAELE: { feld: keyof Eintrag; label: string; platzhalter: string }[] = [
  { feld: 'instagram', label: 'Instagram', platzhalter: '@deinname' },
  { feld: 'linkedin', label: 'LinkedIn', platzhalter: 'linkedin.com/in/…' },
  { feld: 'facebook', label: 'Facebook', platzhalter: 'facebook.com/…' },
  { feld: 'tiktok', label: 'TikTok', platzhalter: '@deinname' },
  { feld: 'website', label: 'Website', platzhalter: 'deine-website.de' },
];

function link(feld: keyof Eintrag, wert: string): string {
  const w = wert.trim().replace(/^@/, '');
  if (/^https?:\/\//i.test(w)) return w;
  if (feld === 'instagram') return `https://instagram.com/${w}`;
  if (feld === 'tiktok') return `https://www.tiktok.com/@${w}`;
  return `https://${w}`;
}

export default function NetzwerkTag8({ jetzt }: { jetzt: number }) {
  const offen = jetzt >= Date.parse(AB);
  const [liste, setListe] = useState<Eintrag[]>([]);
  const [bereit, setBereit] = useState<boolean | null>(null);
  const [form, setForm] = useState<Eintrag>(LEER);
  const [ok, setOk] = useState(false);
  const [einwilligung, setEinwilligung] = useState(false);
  const [meldung, setMeldung] = useState('');

  async function laden() {
    const { data, error } = await supabaseCms.from('netzwerk_eintraege').select('id,name,beruf,instagram,linkedin,facebook,tiktok,website,pitch').order('created_at', { ascending: true });
    if (error) { setBereit(false); return; }
    setBereit(true); setListe((data as Eintrag[]) || []);
  }
  useEffect(() => { if (offen) void laden(); }, [offen]);

  async function eintragen(e: FormEvent) {
    e.preventDefault();
    setMeldung('');
    if (!form.name.trim() || !form.pitch.trim()) { setMeldung('Bitte trag mindestens deinen Namen und deinen Pitch ein.'); return; }
    if (!einwilligung) { setMeldung('Bitte bestätige, dass dein Eintrag für die anderen sichtbar sein darf.'); return; }
    const sauber = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, String(v).trim().slice(0, k === 'pitch' ? 600 : 160)]));
    const { error } = await supabaseCms.from('netzwerk_eintraege').insert([sauber]);
    if (error) { setMeldung('Das hat leider nicht geklappt. Bitte versuch es später noch einmal.'); return; }
    setOk(true); setForm(LEER); void laden();
  }

  return (
    <section className="mt-14 overflow-hidden rounded-[22px] border-2 border-[#C9A961]/70 bg-[linear-gradient(180deg,#24396A,#13233F)] p-6 sm:p-10" aria-labelledby="tag8-titel">
      <div className="text-center">
        <p className="inline-flex flex-wrap items-center justify-center gap-2 font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A961]">
          <span>Trag dich ein</span><span aria-hidden="true">·</span><span>Tag 8</span><span aria-hidden="true">·</span><span>Öffentlicher Kontakt</span><span aria-hidden="true">·</span><span>Business-Chat</span>
        </p>
        <h2 id="tag8-titel" className="mt-4 text-4xl font-semibold uppercase tracking-[0.04em] text-white sm:text-5xl" style={SERIF}>
          Vernetzt <span className="bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">euch</span>
        </h2>
        <p className="mt-3 text-2xl italic text-[#F7E7CE]" style={SERIF}>Gemeinsam vernetzen. „Alle wissen mehr als einer.“</p>
        <p className="mt-1 font-inter text-xs text-pearl-white/60">Zitat: Carmen Thomas</p>
        <p className="mx-auto mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-pearl-white/85">Trag deine Social-Media-Kanäle und deinen Werbe-Pitch ein. So findet ihr euch, folgt euch und empfehlt euch weiter.</p>
      </div>

      {!offen ? (
        <p className="mx-auto mt-8 w-fit rounded-xl bg-[#13233F]/85 px-5 py-3 text-center font-inter text-sm font-extrabold text-[#F7E7CE]">Öffnet am Di 3.11. um 7 Uhr</p>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <form onSubmit={eintragen} noValidate className="grid content-start gap-3 rounded-[16px] border border-white/15 bg-white/[0.05] p-5">
            <h3 className="font-montserrat text-lg font-extrabold text-white">Deine Visitenkarte</h3>
            {ok && <p role="status" className="rounded-lg bg-[#C9A961]/20 px-3 py-2 font-inter text-sm font-bold text-[#F7E7CE]">Danke, dein Eintrag ist da!</p>}
            {(['name', 'beruf'] as const).map((f) => (
              <label key={f} className="grid gap-1 font-inter text-sm font-bold text-white">{f === 'name' ? 'Name *' : 'Beruf / was du anbietest'}
                <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full min-w-0 rounded-[10px] bg-white px-3 py-2.5 font-normal text-midnight-blue" />
              </label>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              {KANAELE.map((k) => (
                <label key={k.feld} className="grid min-w-0 gap-1 font-inter text-sm font-bold text-white">{k.label}
                  <input value={form[k.feld] as string} placeholder={k.platzhalter} onChange={(e) => setForm({ ...form, [k.feld]: e.target.value })} className="w-full min-w-0 rounded-[10px] bg-white px-3 py-2.5 font-normal text-midnight-blue" />
                </label>
              ))}
            </div>
            <label className="grid gap-1 font-inter text-sm font-bold text-white">Dein Werbe-Pitch *
              <textarea value={form.pitch} rows={4} maxLength={600} placeholder="In zwei, drei Sätzen: für wen du da bist und was du löst." onChange={(e) => setForm({ ...form, pitch: e.target.value })} className="w-full min-w-0 rounded-[10px] bg-white px-3 py-2.5 font-normal text-midnight-blue" />
            </label>
            <label className="flex items-start gap-2 font-inter text-xs leading-relaxed text-pearl-white/80">
              <input type="checkbox" checked={einwilligung} onChange={(e) => setEinwilligung(e.target.checked)} className="mt-0.5 h-4 w-4 flex-none accent-[#C9A961]" />
              Mein Eintrag darf für alle im Mitgliederbereich sichtbar sein. Löschen geht jederzeit auf Anfrage an Claudia.
            </label>
            <button type="submit" className={`mt-1 rounded-full px-6 py-3.5 font-montserrat text-sm font-bold uppercase tracking-[0.08em] text-midnight-blue ${GOLD}`}>Eintragen</button>
            {meldung && <p role="status" className="font-inter text-sm font-semibold text-[#F7B48A]">{meldung}</p>}
          </form>

          <div className="min-w-0">
            <h3 className="font-montserrat text-lg font-extrabold text-white">Die Netzwerkwand</h3>
            {bereit === false && <p className="mt-3 font-inter text-sm text-pearl-white/75">Die Netzwerkwand wird gerade eingerichtet. Schau gleich noch einmal vorbei.</p>}
            {bereit && liste.length === 0 && <p className="mt-3 font-inter text-sm text-pearl-white/75">Sei die oder der Erste!</p>}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {liste.map((p, i) => (
                <article key={p.id || i} className="rounded-[14px] border border-[#C9A961]/40 bg-white/[0.05] p-4">
                  <b className="block font-montserrat text-base font-extrabold text-white">{p.name}</b>
                  {p.beruf && <span className="block font-inter text-xs text-[#C9A961]">{p.beruf}</span>}
                  <p className="mt-2 font-inter text-sm leading-relaxed text-pearl-white/85">{p.pitch}</p>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {KANAELE.filter((k) => (p[k.feld] as string)?.trim()).map((k) => (
                      <a key={k.feld} href={link(k.feld, p[k.feld] as string)} target="_blank" rel="noopener noreferrer nofollow" className="rounded-full border border-white/30 px-2.5 py-1 font-inter text-xs font-bold text-white hover:border-[#C9A961]">{k.label}</a>
                    ))}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
