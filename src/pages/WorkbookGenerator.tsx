import { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Download, Save, Upload } from 'lucide-react';

declare global {
  interface Window {
    html2pdf: any;
  }
}

interface WorkbookData {
  authorName: string;
  authorTitle: string;
  website: string;
  email: string;
  akademie: string;
  coverPhoto: string;
}

export default function WorkbookGenerator() {
  const [formData, setFormData] = useState<WorkbookData>({
    authorName: '',
    authorTitle: '',
    website: '',
    email: '',
    akademie: '',
    coverPhoto: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pagesContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof WorkbookData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, coverPhoto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePDF = async () => {
    if (!window.html2pdf) {
      alert('PDF-Bibliothek wird geladen. Bitte versuchen Sie es erneut.');
      return;
    }

    setIsGenerating(true);
    const element = pagesContainerRef.current;

    const opt = {
      margin: 0,
      filename: 'Wirkungskraft-Workbook.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], before: '.workbook-page' }
    };

    try {
      await window.html2pdf().set(opt).from(element).save();
    } catch (error) {
      alert('Fehler beim Erstellen des PDFs');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveData = () => {
    const dataToSave = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workbook-daten.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadData = () => {
    fileInputRef.current?.click();
  };

  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setFormData({
            authorName: data.authorName || '',
            authorTitle: data.authorTitle || '',
            website: data.website || '',
            email: data.email || '',
            akademie: data.akademie || '',
            coverPhoto: data.coverPhoto || ''
          });
          alert('Daten erfolgreich geladen!');
        } catch {
          alert('Fehler beim Laden der Datei.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getPhotoSrc = () => {
    return formData.coverPhoto || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23555' width='120' height='120'/%3E%3Ctext x='60' y='65' text-anchor='middle' fill='%23999' font-size='11'%3EFoto%3C/text%3E%3C/svg%3E";
  };

  return (
    <>
      <SEO
        title="Workbook Generator - Wirkungskraft Workbook erstellen"
        description="Erstelle dein personalisiertes Wirkungskraft Workbook mit Live-Vorschau und PDF-Export"
      />
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-midnight-blue to-royal-navy py-8 px-4">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-gold mb-3">
              Wirkungskraft Workbook Generator
            </h1>
            <p className="text-white text-lg">
              Das komplette 15-seitige Workbook – alle Texte sind editierbar!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            <div className="bg-white rounded-2xl p-6 h-fit lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-midnight-blue mb-4 pb-3 border-b-2 border-bright-gold">
                📝 Deine Daten
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    Dein Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange('authorName', e.target.value)}
                    placeholder="Dein Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-bright-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    Dein Titel
                  </label>
                  <input
                    type="text"
                    value={formData.authorTitle}
                    onChange={(e) => handleInputChange('authorTitle', e.target.value)}
                    placeholder="z.B. Coach & Speaker"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-bright-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    Profilfoto
                  </label>
                  <label className="block w-full px-3 py-2.5 bg-warm border-2 border-dashed border-gray-400 rounded-lg cursor-pointer text-center text-sm hover:border-bright-gold hover:bg-yellow-50 transition-all">
                    📷 Foto auswählen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.coverPhoto && (
                    <img
                      src={formData.coverPhoto}
                      alt="Vorschau"
                      className="mt-3 w-24 h-24 rounded-full object-cover border-2 border-bright-gold mx-auto"
                    />
                  )}
                </div>

                <h2 className="text-xl font-bold text-midnight-blue pt-4 mb-3 pb-2 border-b-2 border-bright-gold">
                  📞 Kontakt
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    Website
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.deineseite.de"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-bright-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="mail@beispiel.de"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-bright-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-midnight-blue mb-1.5">
                    Akademie/Zusatz
                  </label>
                  <input
                    type="text"
                    value={formData.akademie}
                    onChange={(e) => handleInputChange('akademie', e.target.value)}
                    placeholder="akademie.de"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-bright-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="bg-blue-50 border-l-4 border-midnight-blue p-3 rounded-r-lg text-xs text-midnight-blue mt-4">
                  💡 <strong>Tipp:</strong> Klicke direkt auf jeden Text in der Vorschau, um ihn zu bearbeiten!
                </div>

                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-bright-gold to-luxury-gold text-white py-3 rounded-lg font-semibold mt-4 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {isGenerating ? 'Wird erstellt...' : 'PDF erstellen (15 Seiten)'}
                </button>

                <button
                  onClick={handleSaveData}
                  className="w-full bg-midnight-blue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-royal-navy transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Daten speichern
                </button>

                <button
                  onClick={handleLoadData}
                  className="w-full bg-midnight-blue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-royal-navy transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={16} />
                  Daten laden
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileLoad}
                  className="hidden"
                />
              </div>
            </div>

            <div className="bg-gray-600 rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-white text-center text-xl mb-6">
                👁️ Live-Vorschau (klicke zum Bearbeiten)
              </h2>

              <div ref={pagesContainerRef} className="flex flex-col gap-6 items-center">
                {/* Page 1: Cover */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative overflow-hidden" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue text-white h-full flex flex-col">
                    <div className="bg-bright-gold text-midnight-blue text-center py-2 text-[8px] font-semibold tracking-[2.5px] uppercase">
                      <div contentEditable suppressContentEditableWarning className="outline-none hover:bg-black/5 focus:bg-black/10 transition-colors px-2">
                        Wirkungskraft Mensch im KI-Zeitalter
                      </div>
                    </div>

                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                      <div className="text-center p-5 border border-bright-gold/30 bg-bright-gold/5 mb-4">
                        <h2 className="font-serif text-xl text-bright-gold font-normal leading-snug mb-2" contentEditable suppressContentEditableWarning>
                          Welche Stimmen würdest du am Telefon erkennen – ohne ein Bild zu sehen?
                        </h2>
                        <p className="text-xs text-white/70" contentEditable suppressContentEditableWarning>
                          Und was, wenn deine Stimme auch so unvergesslich werden könnte?
                        </p>
                      </div>

                      <div className="text-center py-4">
                        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-[5px] mb-2">
                          WIRKUNGS<span className="text-bright-gold">KRAFT</span>
                        </h1>
                        <p className="text-xs text-white/80 tracking-[3px] uppercase mb-5" contentEditable suppressContentEditableWarning>
                          Persönlichkeit • Präsenz • Wirkung
                        </p>
                        <img
                          src={getPhotoSrc()}
                          alt="Foto"
                          className="w-32 h-32 rounded-full border-4 border-bright-gold object-cover mx-auto"
                        />
                      </div>

                      <div className="bg-white/5 border-t border-b border-bright-gold/20 py-5 px-6 my-4">
                        <h3 className="text-bright-gold text-[9px] uppercase tracking-[2px] mb-3 text-center" contentEditable suppressContentEditableWarning>
                          Was du in diesem Workbook entdeckst
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center text-[10px] text-white/85">
                            <span className="text-bright-gold font-bold mr-2 text-[9px]">01</span>
                            <span contentEditable suppressContentEditableWarning>Warum 180 Millisekunden über alles entscheiden</span>
                          </div>
                          <div className="flex items-center text-[10px] text-white/85">
                            <span className="text-bright-gold font-bold mr-2 text-[9px]">02</span>
                            <span contentEditable suppressContentEditableWarning>Wie deine Persönlichkeit zum Magneten wird</span>
                          </div>
                          <div className="flex items-center text-[10px] text-white/85">
                            <span className="text-bright-gold font-bold mr-2 text-[9px]">03</span>
                            <span contentEditable suppressContentEditableWarning>Der Weg von Lampenfieber zu Bühnenpräsenz</span>
                          </div>
                          <div className="flex items-center text-[10px] text-white/85">
                            <span className="text-bright-gold font-bold mr-2 text-[9px]">04</span>
                            <span contentEditable suppressContentEditableWarning>Warum du im KI-Zeitalter unersetzlich bist</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center py-4 italic">
                        <p className="text-xs text-white/80 mb-1" contentEditable suppressContentEditableWarning>
                          „Worte sind die mächtigste Droge, welche die Menschheit benutzt."
                        </p>
                        <cite className="text-[9px] text-bright-gold not-italic" contentEditable suppressContentEditableWarning>
                          — Rudyard Kipling, Nobelpreisträger
                        </cite>
                      </div>

                      <div className="flex justify-between items-end pt-4 border-t border-bright-gold/20">
                        <div className="text-[10px]">
                          <strong className="text-bright-gold text-sm block">
                            {formData.authorName || 'Dein Name'}
                          </strong>
                          <span>{formData.authorTitle || 'Dein Titel'}</span>
                        </div>
                        <div className="text-right text-[10px] text-white/70" contentEditable suppressContentEditableWarning>
                          Perfektion klickt.<br />Persönlichkeit bleibt.
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                      Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                    </div>
                  </div>
                </div>

                {/* Page 2: Welcome */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Wirkungskraft Magazin</div>
                    <div>02</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Schön, dass du hier bist
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Eine Einladung zu dir selbst
                    </p>

                    <div className="bg-gradient-to-r from-midnight-blue to-royal-navy text-white p-4 rounded-lg my-3">
                      <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1.5">Persönlich für dich</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Ich freue mich, dass du dieses Workbook aufgeschlagen hast. Es ist mehr als Papier mit Buchstaben – es ist eine Einladung zur Begegnung mit dir selbst. Nimm dir Zeit. Sei neugierig. Und vor allem: Sei ehrlich zu dir.
                      </p>
                    </div>

                    <p className="text-[10.5px] leading-relaxed mb-2.5 text-justify" contentEditable suppressContentEditableWarning>
                      <strong>Stell dir vor, dein Telefon klingelt.</strong> Keine Nummer im Display, kein Bild – nur eine Stimme.
                      Welche Menschen könntest du sofort erkennen? Deine Mutter, deinen Partner, deinen Chef?
                    </p>

                    <p className="text-[10.5px] leading-relaxed mb-2.5 text-justify" contentEditable suppressContentEditableWarning>
                      Und jetzt frag dich: Könntest du auch <em>hören</em>, wie sie sich fühlen? Nervös, wütend, liebevoll?
                      <span className="bg-gradient-to-b from-transparent from-60% to-bright-gold/30 to-60% px-0.5">Ja, das kannst du.</span> Dein Gehirn speichert nicht nur Stimmen, sondern die gesamte Persönlichkeit dahinter.
                    </p>

                    <div className="border-l-4 border-bright-gold pl-4 py-2.5 my-3 bg-[#F7F3EB] rounded-r">
                      <p className="font-serif text-xs italic text-midnight-blue mb-1" contentEditable suppressContentEditableWarning>
                        „Wir sind, was wir denken. Alles, was wir sind, entsteht aus unseren Gedanken."
                      </p>
                      <cite className="text-[9px] text-gray-500 not-italic" contentEditable suppressContentEditableWarning>— Buddha</cite>
                    </div>

                    <p className="text-[10.5px] leading-relaxed mb-2.5 text-justify" contentEditable suppressContentEditableWarning>
                      In Zukunft siehst du Perfektion auf Mausklick – überall. Aber ist es nicht das Gegenteil, was Vertrauen schafft?
                      <strong>Das Einzigartige. Das Echte. Das Menschliche.</strong>
                    </p>

                    <div className="bg-bright-gold text-midnight-blue p-4 rounded-lg my-3">
                      <h4 className="text-xs font-semibold mb-1.5" contentEditable suppressContentEditableWarning>Deine Reise durch dieses Workbook:</h4>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        ✦ Die Wissenschaft des ersten Eindrucks verstehen<br />
                        ✦ Deine einzigartige Persönlichkeit entfalten<br />
                        ✦ Lampenfieber in Energie verwandeln<br />
                        ✦ Selbsttests für echte Erkenntnis<br />
                        ✦ Verstehen, warum Menschlichkeit dein Trumpf ist
                      </p>
                    </div>

                    <div className="bg-[#F7F3EB] p-3 rounded-lg border-l-4 border-bright-gold my-3">
                      <div className="text-[8px] font-bold text-bright-gold uppercase tracking-wider mb-1">Bevor du weiterblätterst</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Halte kurz inne. Atme einmal tief ein – und langsam aus. Dieses Workbook gehört dir. Es gibt hier kein Richtig und kein Falsch. Nur Entdeckung.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 3: 180 Milliseconds */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Die Wissenschaft der Wirkung</div>
                    <div>03</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      180 Millisekunden
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Der Augenblick, der alles entscheidet
                    </p>

                    <div className="bg-gradient-to-r from-midnight-blue to-royal-navy text-white p-4 rounded-lg my-3">
                      <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1.5">Aus meiner Erfahrung</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Was ich bei meiner Arbeit erkannt habe, hat meine gesamte Arbeit verändert – und wird auch dich überraschen.
                      </p>
                    </div>

                    <p className="text-xs leading-relaxed mb-3 text-midnight-blue" contentEditable suppressContentEditableWarning>
                      Bevor du deinen ersten Satz beendet hast, hat dein Gegenüber bereits entschieden:
                      <span className="bg-gradient-to-b from-transparent from-60% to-bright-gold/30 to-60% px-0.5">Vertrauen oder Skepsis</span>. Das ist messbare Wissenschaft.
                    </p>

                    <div className="grid grid-cols-2 gap-3 my-4">
                      <div className="bg-midnight-blue text-white p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-bright-gold" contentEditable suppressContentEditableWarning>180</div>
                        <div className="text-[10px] text-bright-gold mb-1.5" contentEditable suppressContentEditableWarning>Millisekunden</div>
                        <p className="text-[9px] leading-tight opacity-90" contentEditable suppressContentEditableWarning>
                          In dieser Zeit entsteht die erste Emotion – noch bevor der Verstand eingreift.
                        </p>
                      </div>
                      <div className="bg-midnight-blue text-white p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-bright-gold" contentEditable suppressContentEditableWarning>60.000×</div>
                        <div className="text-[10px] text-bright-gold mb-1.5" contentEditable suppressContentEditableWarning>schneller</div>
                        <p className="text-[9px] leading-tight opacity-90" contentEditable suppressContentEditableWarning>
                          verarbeitet das Gehirn Bilder und Emotionen als Zahlen und Fakten.
                        </p>
                      </div>
                    </div>

                    <p className="text-[10.5px] leading-relaxed mb-2.5 text-justify" contentEditable suppressContentEditableWarning>
                      Das Gefühl kommt immer zuerst. Der Verstand liefert anschließend nur die Begründung für das, was das Herz längst entschieden hat.
                    </p>

                    <div className="bg-midnight-blue text-white p-5 rounded-lg text-center my-4">
                      <p className="font-serif text-sm italic leading-snug mb-2" contentEditable suppressContentEditableWarning>
                        Menschen werden vergessen, was du gesagt hast. Aber niemals, wie sie sich bei dir gefühlt haben.
                      </p>
                      <cite className="text-[9px] text-bright-gold not-italic" contentEditable suppressContentEditableWarning>— Maya Angelou</cite>
                    </div>

                    <div className="bg-[#F7F3EB] p-3 rounded-lg border-l-4 border-bright-gold my-3">
                      <div className="text-[8px] font-bold text-bright-gold uppercase tracking-wider mb-1">Sofort anwendbar</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Beginne dein nächstes Gespräch nicht mit Fakten, sondern mit einem inneren Bild. Frage dich: „Wie möchte ich, dass sich mein Gegenüber fühlt?"
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 4: Self-Test */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Selbsterkenntnis</div>
                    <div>04</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Spiegel der Wahrheit
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Ein ehrlicher Blick auf deine Wirkung
                    </p>

                    <div className="bg-gradient-to-r from-midnight-blue to-royal-navy text-white p-4 rounded-lg my-3">
                      <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1.5">Warum dieser Test wichtig ist</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Diese Fragen sind nicht dazu da, dich zu bewerten – sondern um dir einen Spiegel vorzuhalten. Sei ehrlich zu dir. Erkenntnis ist der erste Schritt zu Veränderung.
                      </p>
                    </div>

                    <div className="bg-[#F7F3EB] p-4 rounded-lg my-3">
                      <h3 className="text-xs font-bold text-midnight-blue mb-2.5 pb-1.5 border-b border-midnight-blue/20" contentEditable suppressContentEditableWarning>
                        Teil 1: Deine äußere Wirkung
                      </h3>
                      <div className="space-y-2">
                        {[
                          'Ich kann in einem Satz sagen, wofür ich stehe – klar und ohne zu zögern.',
                          'Wenn ich spreche, spüre ich, dass Menschen wirklich zuhören.',
                          'Ich habe eine Geschichte, die erklärt, warum ich tue, was ich tue.',
                          'Menschen geben mir positives Feedback zu meiner Art zu kommunizieren.'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-3.5 h-3.5 border-2 border-midnight-blue rounded flex-shrink-0 mr-2.5 mt-0.5"></div>
                            <div className="text-[10px] leading-tight" contentEditable suppressContentEditableWarning>
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-midnight-blue text-white p-4 rounded-lg my-3">
                      <h3 className="text-xs font-bold text-bright-gold mb-2.5 pb-1.5 border-b border-bright-gold/30" contentEditable suppressContentEditableWarning>
                        Teil 2: Deine innere Haltung
                      </h3>
                      <div className="space-y-2">
                        {[
                          'Ich weiß genau, welches Problem ich für andere löse.',
                          'Ich verkaufe nicht – ich lade ein, weil ich an das glaube, was ich anbiete.',
                          'Ich erlaube mir, echt zu sein – auch wenn das verletzlich macht.',
                          'Vor Menschen zu stehen fühlt sich gut an – wie eine Einladung.'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-3.5 h-3.5 border-2 border-bright-gold rounded flex-shrink-0 mr-2.5 mt-0.5"></div>
                            <div className="text-[10px] leading-tight" contentEditable suppressContentEditableWarning>
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-bright-gold text-midnight-blue p-4 rounded-lg my-3">
                      <h4 className="text-xs font-semibold mb-1.5" contentEditable suppressContentEditableWarning>Deine Auswertung:</h4>
                      <p className="text-[10px] leading-snug" contentEditable suppressContentEditableWarning>
                        <strong>6-8 Kreuze:</strong> Du hast ein starkes Fundament.<br />
                        <strong>3-5 Kreuze:</strong> Solides Potenzial – dort liegt Gold.<br />
                        <strong>0-2 Kreuze:</strong> Hier beginnt deine spannendste Reise.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 5: Human vs AI */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Dein unfairer Vorteil</div>
                    <div>05</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Warum du unersetzlich bist
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Der Mensch im Zeitalter der Maschinen
                    </p>

                    <div className="bg-gradient-to-r from-midnight-blue to-royal-navy text-white p-4 rounded-lg my-3">
                      <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1.5">Die Frage, die mir am häufigsten gestellt wird</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        „Macht uns KI nicht überflüssig?" Meine Antwort: Im Gegenteil! Je perfekter die Maschinen werden, desto mehr sehnen sich Menschen nach dem Echten. Deine Menschlichkeit ist kein Bug – sie ist dein Feature.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-4">
                      <div className="bg-[#F7F3EB] p-3 rounded-lg border-t-4 border-gray-400">
                        <h4 className="text-[9px] text-gray-500 mb-2 uppercase font-semibold" contentEditable suppressContentEditableWarning>Was KI kann:</h4>
                        <p className="text-[9.5px] leading-relaxed" contentEditable suppressContentEditableWarning>
                          • Perfekte Antworten liefern<br />
                          • Unendlich viel speichern<br />
                          • Immer verfügbar sein<br />
                          • Fehlerlos kommunizieren
                        </p>
                      </div>
                      <div className="bg-midnight-blue text-white p-3 rounded-lg border-t-4 border-bright-gold">
                        <h4 className="text-[9px] text-bright-gold mb-2 uppercase font-semibold" contentEditable suppressContentEditableWarning>Was nur du kannst:</h4>
                        <p className="text-[9.5px] leading-relaxed" contentEditable suppressContentEditableWarning>
                          • Echte Verbindung schaffen<br />
                          • Intuition einsetzen<br />
                          • Mit Herz berühren<br />
                          • Authentisch verletzlich sein
                        </p>
                      </div>
                    </div>

                    <div className="bg-midnight-blue text-white p-4 rounded-lg my-3">
                      <h4 className="text-xs font-semibold text-bright-gold mb-1.5" contentEditable suppressContentEditableWarning>Das Mogelpackungs-Paradox</h4>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Dein KI-Assistent kommuniziert brillant mit einem Kunden. Dann kommt das echte Gespräch mit dir – du bist abgelenkt, vergisst Details. Der Kunde fragt sich: „Mit wem habe ich vorher gesprochen?" <strong>Wenn die Maschine besser wirkt als du, wirst du zur Mogelpackung.</strong>
                      </p>
                    </div>

                    <div className="bg-midnight-blue text-white p-5 rounded-lg text-center my-4">
                      <p className="font-serif text-sm italic leading-snug mb-2" contentEditable suppressContentEditableWarning>
                        Menschen wollen gehört werden. Nicht von einem Algorithmus – von jemandem, der wirklich wahrnimmt.
                      </p>
                      <cite className="text-[9px] text-bright-gold not-italic" contentEditable suppressContentEditableWarning>— Das Prinzip der echten Begegnung</cite>
                    </div>

                    <div className="bg-[#F7F3EB] p-3 rounded-lg border-l-4 border-bright-gold my-3">
                      <div className="text-[8px] font-bold text-bright-gold uppercase tracking-wider mb-1">Der entscheidende Unterschied</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        KI schenkt dir Zeit. Nutze sie, um bei dem, was du tust, wirklich DA zu sein. Präsenz schlägt Perfektion. Immer.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 6: 7 Keys */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Dein Kompass</div>
                    <div>06</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Die 7 Schlüssel zur Wirkung
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Dein Wegweiser zum Unverwechselbaren
                    </p>

                    <div className="space-y-2.5">
                      {[
                        { title: 'Die ersten Momente meistern', text: '180 Millisekunden entscheiden. Nutze sie für ein Gefühl, nicht für Fakten.' },
                        { title: 'Dich selbst kennen und lieben', text: 'Deine Persönlichkeit ist einzigartig. Du bist dein wichtigstes Instrument.' },
                        { title: 'Deine Geschichte erzählen', text: 'Warum tust du, was du tust? Die Wendepunkte machen dich interessant.' },
                        { title: 'Den Nutzen klar benennen', text: 'Welches Problem löst du? Sprich über den Unterschied, den du machst.' },
                        { title: 'Kongruent sein', text: 'Worte, Stimme, Körper – alles erzählt dieselbe Geschichte.' },
                        { title: 'Wirklich präsent sein', text: 'Wer wirklich zuhört, wird auch gehört.' },
                        { title: 'Den Mut zur Echtheit haben', text: 'Deine Ecken und Kanten sind dein unverwechselbares Profil.' }
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-start p-2.5 bg-[#F7F3EB] rounded-lg border-l-4 border-bright-gold">
                          <div className="w-7 h-7 bg-midnight-blue text-white rounded-full flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs text-midnight-blue font-semibold mb-0.5" contentEditable suppressContentEditableWarning>
                              {step.title}
                            </h4>
                            <p className="text-[9.5px] leading-snug text-gray-700" contentEditable suppressContentEditableWarning>
                              {step.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 7: Reflection */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Deine Rhetorik</div>
                    <div>07</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Wie wirkst du, wenn du sprichst?
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Eine Bestandsaufnahme
                    </p>

                    <div className="bg-[#F7F3EB] p-4 rounded-lg my-3">
                      <h3 className="text-xs font-bold text-midnight-blue mb-2.5 pb-1.5 border-b border-midnight-blue/20" contentEditable suppressContentEditableWarning>
                        Wie kommunizierst du wirklich?
                      </h3>
                      <div className="space-y-2">
                        {[
                          'Ich nutze Bilder und Geschichten, wenn ich etwas erkläre.',
                          'Menschen sagen mir, dass ich Dinge verständlich mache.',
                          'Ich setze Pausen bewusst ein – Stille wirkt.',
                          'Was ich sage und wie ich es sage – das passt zusammen.'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-3.5 h-3.5 border-2 border-midnight-blue rounded flex-shrink-0 mr-2.5 mt-0.5"></div>
                            <div className="text-[10px] leading-tight" contentEditable suppressContentEditableWarning>
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Menschen, die dich beeindruckt haben
                      </div>
                      <p className="text-[10px] mb-2" contentEditable suppressContentEditableWarning>
                        An welche Menschen erinnerst du dich, die diese besondere Wirkung hatten?
                      </p>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Dein persönliches Warum
                      </div>
                      <p className="text-[10px] mb-2" contentEditable suppressContentEditableWarning>
                        Warum tust du, was du tust? Die echte Version:
                      </p>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="border-l-4 border-bright-gold pl-4 py-2.5 my-3 bg-[#F7F3EB] rounded-r">
                      <p className="font-serif text-xs italic text-midnight-blue mb-1" contentEditable suppressContentEditableWarning>
                        „Der größte Ruhm liegt nicht darin, nie zu fallen, sondern jedes Mal wieder aufzustehen."
                      </p>
                      <cite className="text-[9px] text-gray-500 not-italic" contentEditable suppressContentEditableWarning>— Nelson Mandela</cite>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 8: Mindfulness */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Der Weg nach innen</div>
                    <div>08</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Selbstbewusstsein beginnt mit Selbst-Bewusstsein
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Übungen für mehr Präsenz
                    </p>

                    <div className="bg-midnight-blue text-white p-5 rounded-lg text-center my-4">
                      <p className="font-serif text-sm italic leading-snug mb-2" contentEditable suppressContentEditableWarning>
                        Wir sind, was wir denken. Mit unseren Gedanken formen wir die Welt.
                      </p>
                      <cite className="text-[9px] text-bright-gold not-italic" contentEditable suppressContentEditableWarning>— Buddha</cite>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-4">
                      <div className="bg-[#F7F3EB] p-3 rounded-lg border-l-4 border-bright-gold">
                        <div className="text-[8px] font-bold text-bright-gold uppercase tracking-wider mb-1" contentEditable suppressContentEditableWarning>Übung 1</div>
                        <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                          <strong>Der wohlwollende Begleiter:</strong> Achte auf deinen inneren Dialog. Wie sprichst du mit dir selbst?
                        </p>
                      </div>
                      <div className="bg-bright-gold text-midnight-blue p-3 rounded-lg border-l-4 border-midnight-blue">
                        <div className="text-[8px] font-bold bg-midnight-blue text-bright-gold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block" contentEditable suppressContentEditableWarning>Übung 2</div>
                        <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                          <strong>Die kleine Mutprobe:</strong> Tu heute eine Sache außerhalb deiner Komfortzone.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        3 Dinge, die ich an mir mag
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Mein innerer Dialog – wie spreche ich mit mir selbst?
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="border-l-4 border-bright-gold pl-4 py-2.5 my-3 bg-[#F7F3EB] rounded-r">
                      <p className="font-serif text-xs italic text-midnight-blue mb-1" contentEditable suppressContentEditableWarning>
                        „Selbstvertrauen gewinnt man, indem man genau das tut, wovor man Angst hat."
                      </p>
                      <cite className="text-[9px] text-gray-500 not-italic" contentEditable suppressContentEditableWarning>— Dale Carnegie</cite>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 9: Action Plan */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Dein nächster Schritt</div>
                    <div>09</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Von der Erkenntnis zur Wirkung
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Wissen ohne Umsetzung ist nur Unterhaltung
                    </p>

                    <div className="bg-gradient-to-r from-midnight-blue to-royal-navy text-white p-4 rounded-lg my-3">
                      <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1.5">Mein Wunsch für dich</div>
                      <p className="text-[10px] leading-relaxed" contentEditable suppressContentEditableWarning>
                        Wähle EINEN Punkt. Nur einen. Und setze ihn diese Woche um. Nicht perfekt – nur anfangen.
                      </p>
                    </div>

                    <div className="bg-[#F7F3EB] p-4 rounded-lg my-3">
                      <h3 className="text-xs font-bold text-midnight-blue mb-2.5 pb-1.5 border-b border-midnight-blue/20" contentEditable suppressContentEditableWarning>
                        Was wirst du tun? (Wähle mindestens eines)
                      </h3>
                      <div className="space-y-2">
                        {[
                          'Ich werde mich selbst aufnehmen und mir anhören, wie ich wirke.',
                          'Ich werde mein „Warum" aufschreiben – die echte Geschichte.',
                          'Ich werde vor Gesprächen bewusst atmen und mich erden.',
                          'Ich werde wirklich zuhören – ohne im Kopf die Antwort zu formulieren.'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-3.5 h-3.5 border-2 border-midnight-blue rounded flex-shrink-0 mr-2.5 mt-0.5"></div>
                            <div className="text-[10px] leading-tight" contentEditable suppressContentEditableWarning>
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-3">
                      <div className="border-l-4 border-bright-gold pl-4 py-2.5 bg-[#F7F3EB] rounded-r">
                        <p className="font-serif text-xs italic text-midnight-blue mb-1" contentEditable suppressContentEditableWarning>
                          „Wer immer tut, was er schon kann, bleibt immer das, was er schon ist."
                        </p>
                        <cite className="text-[9px] text-gray-500 not-italic" contentEditable suppressContentEditableWarning>— Henry Ford</cite>
                      </div>
                      <div className="border-l-4 border-bright-gold pl-4 py-2.5 bg-[#F7F3EB] rounded-r">
                        <p className="font-serif text-xs italic text-midnight-blue mb-1" contentEditable suppressContentEditableWarning>
                          „Die Zukunft gehört denen, die an ihre Träume glauben."
                        </p>
                        <cite className="text-[9px] text-gray-500 not-italic" contentEditable suppressContentEditableWarning>— Eleanor Roosevelt</cite>
                      </div>
                    </div>

                    <div className="bg-bright-gold text-midnight-blue p-4 rounded-lg my-3 text-center">
                      <h4 className="text-base font-semibold mb-2" contentEditable suppressContentEditableWarning>
                        Bereit für den nächsten Schritt?
                      </h4>
                      <p className="text-xs" contentEditable suppressContentEditableWarning>
                        Entdecke deine einzigartige Wirkungskraft<br />
                        <strong>{formData.website || 'deinewebsite.de'}</strong>
                      </p>
                    </div>

                    <div className="bg-bright-gold text-midnight-blue p-5 rounded-lg text-center my-3">
                      <p className="font-serif text-sm italic leading-snug mb-2" contentEditable suppressContentEditableWarning>
                        Perfektion klickt. Persönlichkeit bleibt.
                      </p>
                      <cite className="text-[9px] text-midnight-blue/70 not-italic font-semibold" contentEditable suppressContentEditableWarning>
                        — Das Prinzip der Wirkungskraft
                      </cite>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 10: Notes */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="flex justify-between px-8 py-2 bg-[#F7F3EB] text-[8px] text-gray-500 uppercase tracking-wider">
                    <div contentEditable suppressContentEditableWarning>Raum für deine Gedanken</div>
                    <div>10</div>
                  </div>
                  <div className="p-8">
                    <h1 className="font-serif text-3xl text-midnight-blue mb-1 font-normal" contentEditable suppressContentEditableWarning>
                      Deine Notizen
                    </h1>
                    <p className="text-xs text-bright-gold italic mb-4" contentEditable suppressContentEditableWarning>
                      Was bewegt dich? Schreib es auf.
                    </p>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3 mt-4">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Was hat mich am meisten berührt?
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Was werde ich ab morgen anders machen?
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Wer inspiriert mich – und warum?
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-midnight-blue rounded-lg p-4 my-3">
                      <div className="text-[10px] font-bold text-midnight-blue mb-2.5" contentEditable suppressContentEditableWarning>
                        Weitere Gedanken, Ideen, Fragen:
                      </div>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="border-b border-gray-200 min-h-[28px] my-1 px-1 text-[10px] focus:bg-bright-gold/10 focus:outline-none" contentEditable suppressContentEditableWarning></div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[8px] text-gray-500 border-t border-gray-200 pt-2">
                    <span>{formData.authorName || 'Dein Name'} – {formData.authorTitle || 'Dein Titel'}</span>
                    <span>{formData.website || 'deinewebsite.de'}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                    Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                  </div>
                </div>

                {/* Page 11: Back Cover */}
                <div className="workbook-page w-[210mm] min-h-[297mm] bg-cream shadow-2xl relative overflow-hidden" style={{fontSize: '11px', lineHeight: 1.6, color: '#2C3E50'}}>
                  <div className="bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue text-white h-full flex flex-col">
                    <div className="flex-1 p-8 md:p-12 text-center">
                      <h2 className="font-serif text-2xl text-bright-gold mb-5" contentEditable suppressContentEditableWarning>
                        Über den Autor
                      </h2>
                      <img
                        src={getPhotoSrc()}
                        alt="Foto"
                        className="w-36 h-36 rounded-full border-4 border-bright-gold object-cover mx-auto mb-5"
                      />
                      <p className="text-[10.5px] leading-relaxed max-w-md mx-auto mb-6 text-justify" contentEditable suppressContentEditableWarning>
                        Hier steht deine Biografie. Beschreibe, wer du bist und was dich antreibt.
                        Erkläre, welchen Mehrwert du bietest und warum Menschen mit dir arbeiten sollten.
                        Deine Überzeugung: In einer Welt voller Perfektion auf Mausklick wird das Echte zum Goldstandard.
                      </p>
                      <div className="flex justify-center gap-10 mb-4">
                        <div className="text-center">
                          <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1">Website</div>
                          <div className="text-xs font-bold" contentEditable suppressContentEditableWarning>
                            {formData.website || 'deinewebsite.de'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-[8px] text-bright-gold uppercase tracking-wider mb-1">Kontakt</div>
                          <div className="text-xs font-bold" contentEditable suppressContentEditableWarning>
                            {formData.email || 'mail@beispiel.de'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center py-5 px-5 bg-black/20">
                      <p className="font-serif text-base italic text-bright-gold mb-2.5" contentEditable suppressContentEditableWarning>
                        „Perfektion klickt. Persönlichkeit bleibt."
                      </p>
                      <p className="text-[8px] opacity-70" contentEditable suppressContentEditableWarning>
                        © {formData.authorName || 'Dein Name'} | Wirkungskraft Mensch im KI-Zeitalter
                      </p>
                    </div>

                    <div className="absolute bottom-2 right-3 text-[6.5pt] text-gray-400 italic">
                      Generiert von Claudia Conen – Die Umsatzstimme | 15.12.25
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
