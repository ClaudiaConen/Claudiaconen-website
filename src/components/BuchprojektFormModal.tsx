import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  QrCode,
  BookOpen,
} from 'lucide-react';
import { supabaseBuchprojekt as supabase } from '../lib/supabaseBuchprojekt';

const STORAGE_BUCKET = 'buchprojekt-files';

function safeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function uploadAsset(file: File, emailFolder: string, kind: 'portrait' | 'qr'): Promise<string> {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const path = `${emailFolder}/${Date.now()}-${kind}-${safeFilename(file.name)}.${ext}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(`${kind === 'portrait' ? 'Foto' : 'QR-Code'}-Upload fehlgeschlagen: ${error.message}`);
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

interface BuchprojektFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TierKey = 'standard' | 'business' | 'premium';

interface TierConfig {
  key: TierKey;
  name: string;
  price: number;
  pages: string;
  books: string;
}

const TIERS: TierConfig[] = [
  { key: 'standard', name: 'Standard', price: 555, pages: '4 Seiten', books: '50 Bücher' },
  { key: 'business', name: 'Business', price: 777, pages: '6 Seiten', books: '60 Bücher' },
  { key: 'premium', name: 'Premium', price: 999, pages: '8 Seiten', books: '70 Bücher' },
];

const ADDON_SPARRING = { id: 'sparring', label: 'Story-Sparring', price: 333 } as const;
const ADDON_CHRONIST = { id: 'chronist', label: 'Persönlicher Chronist', price: 1555 } as const;

interface TextFieldConfig {
  key:
    | 'beitragstitel'
    | 'story'
    | 'kiErfahrung'
    | 'learnings'
    | 'zukunft'
    | 'cta';
  label: string;
  placeholder: string;
  max: number;
  rows?: number;
}

const TEXT_FIELDS: TextFieldConfig[] = [
  {
    key: 'beitragstitel',
    label: 'Titel deines Beitrags',
    placeholder: 'Eine Headline, die deine Geschichte auf den Punkt bringt …',
    max: 120,
  },
  {
    key: 'story',
    label: 'Deine Story',
    placeholder:
      'Wer bist du und wofür stehst du? Was war dein Wendepunkt? Erzähle so, wie du es einer Freundin erzählen würdest.',
    max: 1500,
    rows: 6,
  },
  {
    key: 'kiErfahrung',
    label: 'Deine KI-Erfahrung',
    placeholder:
      'Wie nutzt du KI in deinem Business? Was hat sich für dich verändert?',
    max: 1500,
    rows: 5,
  },
  {
    key: 'learnings',
    label: 'Deine Learnings',
    placeholder:
      'Was darf der Leser aus deiner Geschichte mitnehmen? Welche Stolpersteine, welche Erkenntnisse?',
    max: 1000,
    rows: 5,
  },
  {
    key: 'zukunft',
    label: 'Deine Zukunft & Positionierung',
    placeholder:
      'Wo siehst du dich in 3 Jahren? Wofür möchtest du im Mittelstand bekannt sein?',
    max: 1000,
    rows: 4,
  },
  {
    key: 'cta',
    label: 'Dein Call-to-Action',
    placeholder:
      'Wie können Leser dich erreichen? Welchen nächsten Schritt sollen sie gehen?',
    max: 380,
    rows: 3,
  },
];

export default function BuchprojektFormModal({ isOpen, onClose }: BuchprojektFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    unternehmen: '',
    stadt: '',
    email: '',
    telefon: '',
    beitragstitel: '',
    story: '',
    kiErfahrung: '',
    learnings: '',
    zukunft: '',
    cta: '',
  });
  const [tier, setTier] = useState<TierKey>('business');
  const [addonSparring, setAddonSparring] = useState(false);
  const [addonChronist, setAddonChronist] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [confirmThreshold, setConfirmThreshold] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  const tierConfig = TIERS.find((t) => t.key === tier) ?? TIERS[0];
  const totalPrice =
    tierConfig.price +
    (addonSparring ? ADDON_SPARRING.price : 0) +
    (addonChronist ? ADDON_CHRONIST.price : 0);

  const isValid =
    formData.name.trim().length > 1 &&
    formData.email.includes('@') &&
    formData.stadt.trim().length > 1 &&
    formData.beitragstitel.trim().length > 0 &&
    formData.story.trim().length > 0 &&
    !!photoFile &&
    confirmBooking &&
    confirmThreshold;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (f: File | null) => void,
    setPreview: (url: string | null) => void,
  ) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview((ev.target?.result as string) ?? null);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1) Foto-Upload (Pflicht — durch isValid bereits geprüft)
      const emailFolder = safeFilename(formData.email) || 'unknown';
      const photoUrl = photoFile ? await uploadAsset(photoFile, emailFolder, 'portrait') : null;

      // 2) QR-Upload (optional)
      const qrUrl = qrFile ? await uploadAsset(qrFile, emailFolder, 'qr') : null;

      // 3) Anmeldung in Supabase speichern
      const { error: insertError } = await supabase
        .from('buchprojekt_anmeldungen')
        .insert({
          name: formData.name.trim(),
          unternehmen: formData.unternehmen.trim() || null,
          stadt: formData.stadt.trim() || null,
          email: formData.email.trim().toLowerCase(),
          telefon: formData.telefon.trim() || null,
          beitragstitel: formData.beitragstitel.trim() || null,
          story: formData.story.trim() || null,
          ki_erfahrung: formData.kiErfahrung.trim() || null,
          learnings: formData.learnings.trim() || null,
          zukunft: formData.zukunft.trim() || null,
          cta: formData.cta.trim() || null,
          tier,
          tier_price: tierConfig.price,
          addon_sparring: addonSparring,
          addon_chronist: addonChronist,
          total_price: totalPrice,
          photo_url: photoUrl,
          qr_url: qrUrl,
          status: 'pending',
        });

      if (insertError) {
        throw new Error(`Anmeldung konnte nicht gespeichert werden: ${insertError.message}`);
      }

      // 4) Admin-Benachrichtigung läuft serverseitig per Postgres-Trigger
      //    `notify_buchprojekt_admin_mail` (pg_net + Resend). Kein Frontend-Call nötig.

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Etwas ist schiefgegangen. Bitte versuche es erneut.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[120] flex items-start justify-center bg-[rgba(15,10,42,0.45)] backdrop-blur-md overflow-y-auto p-4 md:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', damping: 24, stiffness: 240 }}
          className="poai-glass poai-glass-strong relative w-full max-w-3xl my-8 rounded-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header gradient bar */}
          <div className="relative bg-gradient-to-r from-poai-magenta to-poai-magenta-2 px-6 py-5 md:px-8 ring-1 ring-poai-turquoise/30">
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 text-white">
              <BookOpen className="h-6 w-6" />
              <div>
                <h2 className="font-montserrat text-xl md:text-2xl font-bold leading-tight">
                  Autorenplatz buchen
                </h2>
                <p className="text-white/85 text-sm md:text-base">
                  THE POWER OF AI &mdash; Die 80 Stimmen deiner Stadt
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {isSuccess ? (
            <SuccessView onClose={onClose} />
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 md:px-8 md:py-8 space-y-8">
              {/* Section: Kontaktdaten */}
              <Section title="Über dich" subtitle="Wer wirst du im Buch sein?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Name *"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                    placeholder="Vor- und Nachname"
                  />
                  <Field
                    label="Unternehmen"
                    value={formData.unternehmen}
                    onChange={(v) => setFormData({ ...formData, unternehmen: v })}
                    placeholder="Firma / Marke"
                  />
                  <Field
                    label="Stadt *"
                    value={formData.stadt}
                    onChange={(v) => setFormData({ ...formData, stadt: v })}
                    placeholder="Köln"
                  />
                  <Field
                    label="E-Mail *"
                    type="email"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    placeholder="dein@email.de"
                  />
                  <Field
                    label="Telefon"
                    type="tel"
                    value={formData.telefon}
                    onChange={(v) => setFormData({ ...formData, telefon: v })}
                    placeholder="+49 …"
                  />
                </div>
              </Section>

              {/* Section: Beitrag */}
              <Section title="Dein Beitrag" subtitle="So erscheinst du im Buch.">
                <div className="space-y-4">
                  {TEXT_FIELDS.map((f) => (
                    <CountedField
                      key={f.key}
                      label={f.label + (f.key === 'beitragstitel' || f.key === 'story' ? ' *' : '')}
                      value={formData[f.key]}
                      onChange={(v) =>
                        setFormData({ ...formData, [f.key]: v.slice(0, f.max) })
                      }
                      placeholder={f.placeholder}
                      max={f.max}
                      rows={f.rows}
                    />
                  ))}
                </div>
              </Section>

              {/* Section: Uploads */}
              <Section
                title="Foto & QR-Code"
                subtitle="Portrait-Foto (JPG/PNG, min. 1200×1200) und optional ein QR-Code, der zu dir führt (Website, Linktree, …)."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUpload
                    icon={<ImageIcon className="h-5 w-5" />}
                    label="Portrait-Foto * (JPG/PNG, min. 1200×1200)"
                    accept="image/*"
                    file={photoFile}
                    preview={photoPreview}
                    inputRef={photoInputRef}
                    onChange={(e) => handleFileChange(e, setPhotoFile, setPhotoPreview)}
                    onClear={() => {
                      setPhotoFile(null);
                      setPhotoPreview(null);
                      if (photoInputRef.current) photoInputRef.current.value = '';
                    }}
                  />
                  <FileUpload
                    icon={<QrCode className="h-5 w-5" />}
                    label="QR-Code (optional, SVG/PNG)"
                    accept="image/*"
                    file={qrFile}
                    preview={qrPreview}
                    inputRef={qrInputRef}
                    onChange={(e) => handleFileChange(e, setQrFile, setQrPreview)}
                    onClear={() => {
                      setQrFile(null);
                      setQrPreview(null);
                      if (qrInputRef.current) qrInputRef.current.value = '';
                    }}
                  />
                </div>
              </Section>

              {/* Section: Tier-Wahl */}
              <Section
                title="Wähle dein Produkt"
                subtitle="Drei Stufen, drei Schnapszahlen. Je mehr Seiten, desto mehr Hardcover bekommst du als Geschäftswerkzeug."
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TIERS.map((opt) => {
                    const active = tier === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setTier(opt.key)}
                        className={`poai-glass relative rounded-2xl p-4 text-left transition-all ${
                          active
                            ? 'poai-glass-tinted !border-poai-magenta/70 !shadow-[0_0_0_3px_rgba(214,56,143,0.18),0_18px_50px_-18px_rgba(124,58,237,0.32)]'
                            : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] font-mono text-poai-text-mute">
                            {opt.name}
                          </span>
                          {active && <CheckCircle2 className="h-5 w-5 text-poai-magenta" />}
                        </div>
                        <p className="font-montserrat text-2xl font-bold text-poai-text mt-2 tracking-tight">
                          {opt.price} €
                        </p>
                        <p className="text-xs text-poai-text-mute mt-1">
                          {opt.pages} · {opt.books}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Section: Add-Ons */}
              <Section
                title="Optional dazubuchen"
                subtitle="Manche schreiben selbst. Andere lassen schreiben."
              >
                <div className="space-y-3">
                  <AddonRow
                    checked={addonSparring}
                    onChange={setAddonSparring}
                    title="Story-Sparring"
                    sub="Du schreibst, wir schärfen. 2 × 60 Min Live-Sparring + Lektorat."
                    price={ADDON_SPARRING.price}
                  />
                  <AddonRow
                    checked={addonChronist}
                    onChange={setAddonChronist}
                    title="Persönlicher Chronist"
                    sub="Du erzählst, wir schreiben. 3 × 60 Min Story-Interviews + Beitrags-Entwurf + 2 Korrektur-Runden."
                    price={ADDON_CHRONIST.price}
                  />
                </div>

                <div className="poai-glass poai-glass-tinted mt-5 rounded-xl px-5 py-4 flex items-center justify-between !border-poai-gold/40">
                  <span className="text-poai-text font-semibold">Dein Gesamtpreis</span>
                  <span className="font-montserrat text-2xl font-bold text-poai-gold">
                    {totalPrice.toLocaleString('de-DE')} €
                  </span>
                </div>
                <p className="mt-2 text-xs text-poai-text-mute">
                  Alle Preise zzgl. MwSt. Rechnung vor Produktionsbeginn.
                </p>
              </Section>

              {/* Confirmations */}
              <Section title="Verbindlichkeit" subtitle="Bitte bestätige, damit wir dir die Rechnung senden können.">
                <div className="space-y-3">
                  <Checkbox
                    checked={confirmBooking}
                    onChange={setConfirmBooking}
                    label={
                      <>
                        Ich buche <strong>verbindlich</strong> meinen Autorenplatz. Die Rechnung
                        wird vor Produktionsbeginn gestellt.
                      </>
                    }
                    required
                  />
                  <Checkbox
                    checked={confirmThreshold}
                    onChange={setConfirmThreshold}
                    label={
                      <>
                        Mir ist bewusst, dass das <strong>Hauptbuch bis Ende 2026</strong>{' '}
                        produziert wird.
                      </>
                    }
                    required
                  />
                </div>
              </Section>

              {error && (
                <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-400/40 px-4 py-3 text-sm text-red-200">
                  <AlertCircle className="h-5 w-5 flex-none" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <div className="flex flex-col-reverse md:flex-row gap-3 md:items-center md:justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-poai-text-dim hover:text-poai-text transition"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="group relative px-6 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-lg shadow-poai-magenta/40 hover:shadow-poai-magenta/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all ring-1 ring-poai-turquoise/40"
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? 'Wird gesendet …' : 'Platz reservieren und Rechnung anfordern'}
                    <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ----------- Subcomponents ----------- */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="font-montserrat text-lg font-bold text-poai-text mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-poai-text-dim mb-4">{subtitle}</p>}
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-poai-text mb-1.5 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/70 backdrop-blur-md border border-poai-violet-soft/60 px-4 py-3 text-poai-text placeholder-poai-text-mute/70 focus:border-poai-magenta focus:bg-white focus:ring-4 focus:ring-poai-magenta/15 outline-none transition shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
      />
    </label>
  );
}

function CountedField({
  label,
  value,
  onChange,
  placeholder,
  max,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max: number;
  rows?: number;
}) {
  const used = value.length;
  const ratio = used / max;
  const colorClass =
    ratio >= 1
      ? 'text-red-400'
      : ratio > 0.85
      ? 'text-poai-gold'
      : 'text-poai-text-dim';
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-poai-text">{label}</span>
        <span className={`text-xs font-mono tabular-nums ${colorClass}`}>
          {used} / {max}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={max}
        className="w-full rounded-xl bg-white/70 backdrop-blur-md border border-poai-violet-soft/60 px-4 py-3 text-poai-text placeholder-poai-text-mute/70 focus:border-poai-magenta focus:bg-white focus:ring-4 focus:ring-poai-magenta/15 outline-none transition shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] resize-y"
      />
    </label>
  );
}

function FileUpload({
  icon,
  label,
  accept,
  file,
  preview,
  inputRef,
  onChange,
  onClear,
}: {
  icon: React.ReactNode;
  label: string;
  accept: string;
  file: File | null;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-poai-violet-soft/70 bg-white/55 backdrop-blur-md p-4 hover:border-poai-violet/60 hover:bg-white/70 transition shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center gap-2 text-poai-text-dim text-sm mb-3">
        {icon}
        <span className="font-medium text-poai-text">{label}</span>
      </div>
      {preview ? (
        <div className="flex items-center gap-3">
          <img
            src={preview}
            alt="Vorschau"
            className="h-16 w-16 rounded-lg object-cover ring-1 ring-poai-violet-soft"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-poai-text truncate">{file?.name}</p>
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-poai-magenta hover:underline mt-1 font-medium"
            >
              Entfernen
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/70 hover:bg-white text-poai-text text-sm font-medium transition ring-1 ring-poai-violet-soft/70"
        >
          <Upload className="h-4 w-4" />
          Datei wählen
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

function AddonRow({
  checked,
  onChange,
  title,
  sub,
  price,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  sub: string;
  price: number;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`poai-glass w-full rounded-2xl p-4 text-left transition-all flex items-start gap-3 ${
        checked
          ? 'poai-glass-tinted !border-poai-magenta/70 !shadow-[0_0_0_3px_rgba(214,56,143,0.18),0_18px_50px_-18px_rgba(124,58,237,0.32)]'
          : ''
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition ${
          checked
            ? 'bg-poai-magenta border-poai-magenta shadow-[0_2px_8px_-2px_rgba(214,56,143,0.4)]'
            : 'bg-white border-poai-violet-soft'
        }`}
      >
        {checked && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-semibold text-poai-text">{title}</span>
          <span className="font-mono text-sm font-bold text-poai-magenta-2 tabular-nums">
            +{price.toLocaleString('de-DE')} €
          </span>
        </div>
        <p className="text-xs text-poai-text-mute mt-1 leading-snug">{sub}</p>
      </div>
    </button>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition ${
          checked
            ? 'bg-poai-magenta border-poai-magenta shadow-[0_2px_8px_-2px_rgba(214,56,143,0.4)]'
            : 'bg-white border-poai-violet-soft group-hover:border-poai-violet'
        }`}
      >
        {checked && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
      </span>
      <span className="text-sm text-poai-text leading-relaxed">
        {label}
        {required && <span className="text-poai-magenta ml-1">*</span>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </label>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 py-12 md:px-12 md:py-16 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-poai-magenta to-poai-magenta-2 flex items-center justify-center shadow-lg shadow-poai-magenta/35 ring-1 ring-poai-violet/30 mb-6">
        <CheckCircle2 className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-montserrat text-2xl font-bold text-poai-text mb-3">
        Willkommen im Kreis der 77!
      </h3>
      <p className="text-poai-text-dim max-w-md mx-auto leading-relaxed">
        Wir haben deine Bewerbung erhalten und lesen sie persönlich. Innerhalb von 24 Stunden
        bekommst du deine Rechnung per E-Mail. Dein Platz ist gesichert, sobald die Zahlung
        eingegangen ist.
      </p>
      <button
        onClick={onClose}
        className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-poai-magenta to-poai-magenta-2 text-white font-semibold shadow-lg shadow-poai-magenta/40 hover:shadow-poai-magenta/60 transition ring-1 ring-poai-turquoise/40"
      >
        Schließen
      </button>
    </div>
  );
}
