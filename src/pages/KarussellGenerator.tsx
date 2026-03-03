import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, Palette, Type, Sparkles, Zap, Star, CheckCircle, ArrowDown, Image as ImageIcon, Layers, Target, Heart, MessageSquare } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface SlideField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'photo';
  value?: string;
  imageData?: string;
}

interface SlideData {
  title: string;
  fields: SlideField[];
}

interface FormatOption {
  name: string;
  width: number;
  height: number;
  label: string;
}

const formats: FormatOption[] = [
  { name: 'instagram', width: 1080, height: 1350, label: 'LinkedIn / Instagram Feed' },
  { name: 'facebook', width: 1080, height: 1080, label: 'Facebook' },
  { name: 'stories', width: 1080, height: 1920, label: 'Reels / Stories' }
];

const initialSlideData: { [key: number]: SlideData } = {
  1: {
    title: 'Hook',
    fields: [
      { id: 'eventName', label: 'Event-Name', type: 'text', value: 'Mein Event 2025' },
      { id: 'hookQuestion', label: 'Hook-Frage oder Statement', type: 'textarea', value: 'Wann hast du zuletzt wirklich gelacht?' },
      { id: 'contrast1', label: 'Kontrast 1', type: 'text', value: 'machen statt reden' },
      { id: 'contrast2', label: 'Kontrast 2', type: 'text', value: 'verstehen statt verkaufen' },
      { id: 'contrast3', label: 'Kontrast 3', type: 'text', value: 'zuhören statt pitchen' },
      { id: 'comfortText', label: 'Komfort-Satz', type: 'text', value: 'Kein Druck. Einfach dabei sein.' },
      { id: 'date', label: 'Datum', type: 'text', value: '15.01.2025' },
      { id: 'time', label: 'Uhrzeit', type: 'text', value: '18:00 Uhr' },
      { id: 'photo', label: 'Dein Foto (optional)', type: 'photo' }
    ]
  },
  2: {
    title: 'Was passiert',
    fields: [
      { id: 'point1Title', label: 'Punkt 1 Titel', type: 'text', value: 'Kurzgeschichten' },
      { id: 'point1Desc', label: 'Punkt 1 Beschreibung', type: 'text', value: 'Die besten Moments des Jahres' },
      { id: 'point2Title', label: 'Punkt 2 Titel', type: 'text', value: 'Erfolge feiern' },
      { id: 'point2Desc', label: 'Punkt 2 Beschreibung', type: 'text', value: 'Was hat funktioniert?' },
      { id: 'point3Title', label: 'Punkt 3 Titel', type: 'text', value: 'Austausch' },
      { id: 'point3Desc', label: 'Punkt 3 Beschreibung', type: 'text', value: 'Von anderen lernen' },
      { id: 'point4Title', label: 'Punkt 4 Titel', type: 'text', value: 'Lachen' },
      { id: 'point4Desc', label: 'Punkt 4 Beschreibung', type: 'text', value: 'Weil es gut tut' }
    ]
  },
  3: {
    title: 'Atmosphäre',
    fields: [
      { id: 'atmosphereQuote', label: 'Atmosphäre-Zitat', type: 'textarea', value: 'Als würden wir lokal zusammensitzen und einfach reden.' },
      { id: 'desc1', label: 'Beschreibung 1', type: 'text', value: 'Entspannt und ungezwungen' },
      { id: 'desc2', label: 'Beschreibung 2', type: 'text', value: 'Auf Augenhöhe' },
      { id: 'desc3', label: 'Beschreibung 3', type: 'text', value: 'Mit Menschen, die verstehen' },
      { id: 'duration', label: 'Dauer-Info', type: 'text', value: 'Geplant: 90 Minuten' }
    ]
  },
  4: {
    title: 'Für wen',
    fields: [
      { id: 'target1', label: 'Zielgruppe 1', type: 'text', value: 'Unternehmer' },
      { id: 'target2', label: 'Zielgruppe 2', type: 'text', value: 'Speaker & Trainer' },
      { id: 'target3', label: 'Zielgruppe 3', type: 'text', value: 'Coaches' },
      { id: 'target4', label: 'Zielgruppe 4', type: 'text', value: 'Selbstständige' },
      { id: 'bringHeadline', label: 'Mitbring-Headline', type: 'text', value: 'Gute Laune - und wenn du willst:' },
      { id: 'bringItem1', label: 'Item 1', type: 'text', value: 'Eine Geschichte' },
      { id: 'bringItem2', label: 'Item 2', type: 'text', value: 'Neugier' },
      { id: 'comfortNote', label: 'Komfort-Zusatz', type: 'text', value: 'Alles freiwillig. Du entscheidest.' }
    ]
  },
  5: {
    title: 'Warum',
    fields: [
      { id: 'whyHeadline', label: 'Warum-Headline', type: 'text', value: 'Weil es sich lohnt.' },
      { id: 'benefit1', label: 'Vorteil 1', type: 'text', value: 'Menschen treffen, die dich verstehen' },
      { id: 'benefit2', label: 'Vorteil 2', type: 'text', value: 'Erfahrungen teilen, die zählen' },
      { id: 'benefit3', label: 'Vorteil 3', type: 'text', value: 'Inspiration mitnehmen' },
      { id: 'emotionalQuote', label: 'Emotionales Zitat', type: 'textarea', value: 'Manchmal sind es die kleinen Momente, die den größten Unterschied machen.' }
    ]
  },
  6: {
    title: 'Persönlich',
    fields: [
      { id: 'personalInvite', label: 'Persönliche Einladung', type: 'textarea', value: 'Ich freue mich auf dich.' },
      { id: 'personalNote', label: 'Persönlicher Zusatz', type: 'text', value: 'Lass uns gemeinsam einen schönen Abend haben.' },
      { id: 'value1', label: 'Wert 1', type: 'text', value: 'Authentisch' },
      { id: 'value2', label: 'Wert 2', type: 'text', value: 'Ehrlich' },
      { id: 'value3', label: 'Wert 3', type: 'text', value: 'Auf Augenhöhe' },
      { id: 'comfortFinal', label: 'Komfort-Satz', type: 'text', value: 'Du musst nichts vorbereiten. Sei einfach du.' },
      { id: 'mainPhoto', label: 'Dein Foto (empfohlen)', type: 'photo' }
    ]
  },
  7: {
    title: 'CTA',
    fields: [
      { id: 'category', label: 'Kategorie', type: 'text', value: 'Netzwerk-Event' },
      { id: 'finalEventName', label: 'Event-Name', type: 'text', value: 'Macher-Feierabend' },
      { id: 'year', label: 'Jahr/Untertitel', type: 'text', value: '2025' },
      { id: 'finalDate', label: 'Datum', type: 'text', value: '15.01.2025' },
      { id: 'finalTime', label: 'Uhrzeit', type: 'text', value: '18:00 Uhr' },
      { id: 'location', label: 'Ort/Format', type: 'text', value: 'Online via Zoom' },
      { id: 'price', label: 'Preis', type: 'text', value: 'Kostenlos' },
      { id: 'ctaQuestion', label: 'CTA-Frage', type: 'text', value: 'Bist du dabei?' },
      { id: 'keyword', label: 'Keyword', type: 'text', value: 'DABEI' },
      { id: 'ctaNote', label: 'CTA-Zusatz', type: 'text', value: 'Ich schicke dir den Link persönlich.' }
    ]
  }
};

export default function KarussellGenerator() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slideData, setSlideData] = useState(initialSlideData);
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [colors, setColors] = useState({
    bg: '#1A1A2E',
    accent: '#F4D03F',
    text: '#FFFFFF'
  });
  const [font, setFont] = useState('Montserrat');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    renderSlide();
  }, [currentSlide, slideData, selectedFormat, colors, font]);

  const updateField = (slideNum: number, fieldId: string, value: string) => {
    setSlideData(prev => ({
      ...prev,
      [slideNum]: {
        ...prev[slideNum],
        fields: prev[slideNum].fields.map(f =>
          f.id === fieldId ? { ...f, value } : f
        )
      }
    }));
  };

  const handlePhotoUpload = (slideNum: number, fieldId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSlideData(prev => ({
          ...prev,
          [slideNum]: {
            ...prev[slideNum],
            fields: prev[slideNum].fields.map(f =>
              f.id === fieldId ? { ...f, imageData } : f
            )
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
  };

  const renderSlide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = selectedFormat.width;
    const h = selectedFormat.height;
    const s = w / 1080;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = colors.accent;
    ctx.fillRect(0, 0, w, 8 * s);
    ctx.fillRect(0, h - 8 * s, w, 8 * s);

    const slide = slideData[currentSlide];
    const fields: { [key: string]: string } = {};
    slide.fields.forEach(f => {
      fields[f.id] = f.value || '';
    });

    switch (currentSlide) {
      case 1:
        renderSlide1(ctx, w, h, s, fields);
        break;
      case 2:
        renderSlide2(ctx, w, h, s, fields);
        break;
      case 3:
        renderSlide3(ctx, w, h, s, fields);
        break;
      case 4:
        renderSlide4(ctx, w, h, s, fields);
        break;
      case 5:
        renderSlide5(ctx, w, h, s, fields);
        break;
      case 6:
        renderSlide6(ctx, w, h, s, fields);
        break;
      case 7:
        renderSlide7(ctx, w, h, s, fields);
        break;
    }

    ctx.font = `bold ${11 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'right';
    ctx.fillText('Claudia Conen', w - 30 * s, h - 45 * s);
    ctx.fillStyle = '#999999';
    ctx.font = `${11 * s}px ${font}`;
    ctx.fillText('Die Umsatzstimme', w - 30 * s, h - 28 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide1 = (ctx: CanvasRenderingContext2D, w: number, h: number, s: number, fields: { [key: string]: string }) => {
    ctx.font = `bold ${20 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'right';
    ctx.fillText(fields.eventName, w - 50 * s, 80 * s);
    ctx.textAlign = 'left';

    ctx.font = `bold ${42 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    wrapText(ctx, fields.hookQuestion, 50 * s, 250 * s, w - 100 * s, 50 * s);

    const contrastY = 400 * s;
    ctx.fillStyle = colors.accent;
    ctx.fillRect(50 * s, contrastY, 8 * s, 120 * s);

    ctx.font = `${18 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.fillText('Mit Menschen, die ' + fields.contrast1, 75 * s, contrastY + 30 * s);
    ctx.fillText('Die ' + fields.contrast2, 75 * s, contrastY + 60 * s);
    ctx.fillText('Die ' + fields.contrast3, 75 * s, contrastY + 90 * s);

    const comfortY = 560 * s;
    ctx.fillStyle = 'rgba(244, 208, 63, 0.2)';
    roundRect(ctx, 50 * s, comfortY, w - 100 * s, 50 * s, 10 * s);
    ctx.font = `bold ${16 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.fillText(fields.comfortText, 70 * s, comfortY + 32 * s);

    const buttonY = 700 * s;
    ctx.fillStyle = colors.accent;
    roundRect(ctx, 100 * s, buttonY, w - 200 * s, 100 * s, 20 * s);
    ctx.fillStyle = colors.bg;
    ctx.font = `bold ${32 * s}px ${font}`;
    ctx.textAlign = 'center';
    ctx.fillText(fields.date, w / 2, buttonY + 40 * s);
    ctx.font = `bold ${22 * s}px ${font}`;
    ctx.fillText(fields.time, w / 2, buttonY + 75 * s);
    ctx.textAlign = 'left';

    ctx.font = `${16 * s}px ${font}`;
    ctx.fillStyle = '#999999';
    ctx.textAlign = 'center';
    ctx.fillText('Wisch weiter →', w / 2, h - 100 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide2 = (ctx: CanvasRenderingContext2D, w: number, h: number, s: number, fields: { [key: string]: string }) => {
    ctx.beginPath();
    ctx.arc(w / 2, 100 * s, 35 * s, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent;
    ctx.fill();
    ctx.font = `bold ${32 * s}px ${font}`;
    ctx.fillStyle = colors.bg;
    ctx.textAlign = 'center';
    ctx.fillText('?', w / 2, 112 * s);
    ctx.textAlign = 'left';

    ctx.font = `bold ${14 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText('WAS ERWARTET DICH', w / 2, 180 * s);
    ctx.textAlign = 'left';

    const points = [
      { title: fields.point1Title, desc: fields.point1Desc },
      { title: fields.point2Title, desc: fields.point2Desc },
      { title: fields.point3Title, desc: fields.point3Desc },
      { title: fields.point4Title, desc: fields.point4Desc }
    ];

    let y = 240 * s;
    points.forEach(() => {
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      roundRect(ctx, 50 * s, y, w - 100 * s, 90 * s, 12 * s);
      ctx.fillStyle = colors.accent;
      ctx.fillRect(50 * s, y, 8 * s, 90 * s);

      y += 110 * s;
    });

    y = 240 * s;
    points.forEach((point) => {
      ctx.font = `bold ${18 * s}px ${font}`;
      ctx.fillStyle = colors.text;
      ctx.fillText(point.title, 75 * s, y + 35 * s);
      ctx.font = `${14 * s}px ${font}`;
      ctx.fillStyle = '#999999';
      ctx.fillText(point.desc, 75 * s, y + 60 * s);

      y += 110 * s;
    });

    ctx.font = `${16 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText('Wisch weiter →', w / 2, h - 100 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide3 = (ctx: CanvasRenderingContext2D, w: number, _h: number, s: number, fields: { [key: string]: string }) => {
    ctx.font = `${80 * s}px ${font}`;
    ctx.fillStyle = 'rgba(244, 208, 63, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('"', w / 2, 150 * s);

    ctx.font = `bold ${28 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    wrapText(ctx, fields.atmosphereQuote, 80 * s, 250 * s, w - 160 * s, 40 * s);

    ctx.font = `${16 * s}px ${font}`;
    ctx.fillStyle = '#999999';
    ctx.fillText(fields.desc1, 150 * s, 400 * s);
    ctx.fillText(fields.desc2, 150 * s, 430 * s);
    ctx.fillText(fields.desc3, 150 * s, 460 * s);

    ctx.fillStyle = 'rgba(244, 208, 63, 0.15)';
    roundRect(ctx, 120 * s, 550 * s, w - 240 * s, 70 * s, 12 * s);
    ctx.font = `bold ${18 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText(fields.duration, w / 2, 595 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide4 = (ctx: CanvasRenderingContext2D, w: number, _h: number, s: number, fields: { [key: string]: string }) => {
    ctx.font = `bold ${14 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText('FÜR WEN IST DAS?', w / 2, 60 * s);
    ctx.textAlign = 'left';

    const targets = [fields.target1, fields.target2, fields.target3, fields.target4];
    let y = 120 * s;
    targets.forEach((target, i) => {
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      roundRect(ctx, 50 * s, y, w - 100 * s, 70 * s, 10 * s);

      ctx.fillStyle = colors.accent;
      roundRect(ctx, 70 * s, y + 15 * s, 40 * s, 40 * s, 8 * s);
      ctx.font = `bold ${12 * s}px ${font}`;
      ctx.fillStyle = colors.bg;
      ctx.textAlign = 'center';
      ctx.fillText('0' + (i + 1), 90 * s, y + 42 * s);
      ctx.textAlign = 'left';

      ctx.font = `bold ${18 * s}px ${font}`;
      ctx.fillStyle = colors.text;
      ctx.fillText(target, 130 * s, y + 45 * s);

      y += 85 * s;
    });

    ctx.fillStyle = 'rgba(244, 208, 63, 0.2)';
    roundRect(ctx, 50 * s, y + 20 * s, w - 100 * s, 150 * s, 14 * s);
    ctx.font = `bold ${16 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.fillText(fields.bringHeadline, 80 * s, y + 55 * s);

    ctx.font = `${14 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.fillText(fields.bringItem1 + ' | ' + fields.bringItem2, 80 * s, y + 90 * s);
    ctx.fillStyle = '#999999';
    ctx.fillText(fields.comfortNote, 80 * s, y + 125 * s);
  };

  const renderSlide5 = (ctx: CanvasRenderingContext2D, w: number, _h: number, s: number, fields: { [key: string]: string }) => {
    ctx.font = `bold ${14 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText('WARUM DABEI SEIN?', w / 2, 80 * s);

    ctx.font = `bold ${32 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.fillText(fields.whyHeadline, w / 2, 140 * s);
    ctx.textAlign = 'left';

    const benefits = [fields.benefit1, fields.benefit2, fields.benefit3];
    let y = 220 * s;
    benefits.forEach((benefit, i) => {
      ctx.beginPath();
      ctx.arc(110 * s, y + 20 * s, 25 * s, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.fill();
      ctx.font = `bold ${20 * s}px ${font}`;
      ctx.fillStyle = colors.bg;
      ctx.textAlign = 'center';
      ctx.fillText((i + 1).toString(), 110 * s, y + 28 * s);
      ctx.textAlign = 'left';

      ctx.font = `${18 * s}px ${font}`;
      ctx.fillStyle = colors.text;
      ctx.fillText(benefit, 160 * s, y + 28 * s);

      y += 80 * s;
    });

    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    roundRect(ctx, 80 * s, y + 40 * s, w - 160 * s, 120 * s, 14 * s);
    ctx.font = `bold ${18 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    wrapText(ctx, '"' + fields.emotionalQuote + '"', 100 * s, y + 90 * s, w - 200 * s, 28 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide6 = (ctx: CanvasRenderingContext2D, w: number, _h: number, s: number, fields: { [key: string]: string }) => {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 4 * s;
    ctx.beginPath();
    ctx.arc(w / 2, 150 * s, 80 * s, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = `${14 * s}px ${font}`;
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'center';
    ctx.fillText('DEIN FOTO', w / 2, 155 * s);

    ctx.font = `bold ${28 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    wrapText(ctx, fields.personalInvite, 80 * s, 300 * s, w - 160 * s, 38 * s);

    ctx.font = `${18 * s}px ${font}`;
    ctx.fillStyle = '#999999';
    ctx.fillText(fields.personalNote, w / 2, 420 * s);
    ctx.textAlign = 'left';

    const values = [fields.value1, fields.value2, fields.value3];
    let x = 150 * s;
    values.forEach(value => {
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      roundRect(ctx, x, 480 * s, 150 * s, 45 * s, 10 * s);
      ctx.font = `bold ${14 * s}px ${font}`;
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.fillText(value, x + 75 * s, 510 * s);
      x += 180 * s;
    });
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(244, 208, 63, 0.25)';
    roundRect(ctx, 80 * s, 580 * s, w - 160 * s, 80 * s, 12 * s);
    ctx.font = `bold ${16 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText(fields.comfortFinal, w / 2, 630 * s);
    ctx.textAlign = 'left';
  };

  const renderSlide7 = (ctx: CanvasRenderingContext2D, w: number, _h: number, s: number, fields: { [key: string]: string }) => {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.arc(w / 2, 80 * s, 40 * s, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = `bold ${16 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.textAlign = 'center';
    ctx.fillText(fields.category, w / 2, 170 * s);

    ctx.font = `bold ${40 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.fillText(fields.finalEventName, w / 2, 230 * s);

    ctx.font = `bold ${20 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    ctx.fillText(fields.year, w / 2, 270 * s);

    ctx.fillStyle = colors.accent;
    roundRect(ctx, 80 * s, 320 * s, w - 160 * s, 130 * s, 20 * s);
    ctx.fillStyle = colors.bg;
    ctx.font = `bold ${36 * s}px ${font}`;
    ctx.fillText(fields.finalDate, w / 2, 375 * s);
    ctx.font = `bold ${26 * s}px ${font}`;
    ctx.fillText(fields.finalTime, w / 2, 415 * s);
    ctx.font = `${14 * s}px ${font}`;
    ctx.fillText(fields.location + ' | ' + fields.price, w / 2, 440 * s);

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    roundRect(ctx, 60 * s, 500 * s, w - 120 * s, 140 * s, 16 * s);

    ctx.font = `bold ${24 * s}px ${font}`;
    ctx.fillStyle = colors.text;
    ctx.fillText(fields.ctaQuestion, w / 2, 545 * s);

    ctx.font = `bold ${18 * s}px ${font}`;
    ctx.fillStyle = colors.accent;
    const keywordWidth = ctx.measureText(fields.keyword).width;
    ctx.fillText('Schreib ', w / 2 - keywordWidth / 2 - 60 * s, 590 * s);

    ctx.fillStyle = colors.accent;
    roundRect(ctx, w / 2 - keywordWidth / 2 - 10 * s, 572 * s, keywordWidth + 20 * s, 30 * s, 6 * s);
    ctx.fillStyle = colors.bg;
    ctx.font = `bold ${14 * s}px ${font}`;
    ctx.fillText(fields.keyword, w / 2, 592 * s);

    ctx.fillStyle = colors.accent;
    ctx.font = `bold ${18 * s}px ${font}`;
    ctx.fillText(' in die Kommentare', w / 2 + keywordWidth / 2 + 30 * s, 590 * s);

    ctx.font = `${14 * s}px ${font}`;
    ctx.fillStyle = '#999999';
    ctx.fillText(fields.ctaNote, w / 2, 625 * s);

    ctx.textAlign = 'left';
  };

  const exportSlide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `slide-${currentSlide}-${slideData[currentSlide].title.toLowerCase().replace(' ', '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const exportAll = async () => {
    for (let i = 1; i <= 7; i++) {
      setCurrentSlide(i);
      await new Promise(resolve => setTimeout(resolve, 500));
      exportSlide();
    }
  };

  const scale = 324 / selectedFormat.width;
  const previewHeight = selectedFormat.height * scale;

  return (
    <>
      <SEO
        title="Karussell-Generator | Erstelle professionelle Social Media Karussells"
        description="Erstelle professionelle Social Media Karussell-Posts in wenigen Minuten mit der Claudia Write to Brain Formel."
      />

      <div className="min-h-screen bg-[#FBF8F3]">
        <Navigation />

        {/* Hero Intro Section */}
        <div className="bg-gradient-to-br from-[#FFF9E5] via-[#FBF8F3] to-[#FFF5DC] py-20 pt-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4D03F]/20 to-[#C9A227]/20 px-5 py-2.5 rounded-full mb-6 border border-[#C9A227]/30">
                <Sparkles className="w-5 h-5 text-[#C9A227]" />
                <span className="text-sm font-bold text-[#1A1A2E]">Premium Tool für Content Creator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1A1A2E] mb-4">
                Karussell-Generator
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#F4D03F] via-[#C9A227] to-[#F4D03F] mx-auto my-6 rounded-full" />
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                Erstelle professionelle Social Media Karussell-Posts in wenigen Minuten mit der bewährten <strong className="text-[#C9A227]">7-Slide Write-to-Brain Formel</strong>
              </p>
              <button
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="gold-button text-[#1A1A2E] font-bold py-4 px-8 rounded-xl inline-flex items-center gap-3 text-lg shadow-xl"
              >
                <Zap className="w-5 h-5" />
                Jetzt starten
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F4D03F]/30 text-center hover:scale-105 hover:shadow-xl transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <Layers className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#1A1A2E]">7-Slide System</h3>
                <p className="text-sm text-gray-600">Bewährte Struktur für maximale Aufmerksamkeit und Engagement</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F4D03F]/30 text-center hover:scale-105 hover:shadow-xl transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#1A1A2E]">Write-to-Brain</h3>
                <p className="text-sm text-gray-600">Gehirngerechte Kommunikation für bessere Conversion</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F4D03F]/30 text-center hover:scale-105 hover:shadow-xl transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#1A1A2E]">Schnell & Einfach</h3>
                <p className="text-sm text-gray-600">In wenigen Minuten zum fertigen Karussell</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-[#1A1A2E]">
                <Star className="w-7 h-7 text-[#C9A227]" />
                Was macht diesen Generator besonders?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle, text: 'Hook-optimierte erste Slide für maximale Aufmerksamkeit' },
                  { icon: MessageSquare, text: 'Psychologisch optimierte Slide-Reihenfolge' },
                  { icon: Heart, text: 'Emotionale Ansprache mit Komfort-Elementen' },
                  { icon: Download, text: 'Export in allen gängigen Social Media Formaten' },
                  { icon: Palette, text: 'Vollständig anpassbare Farben und Schriften' },
                  { icon: ImageIcon, text: 'Foto-Upload für persönliche Note' },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-[#F4D03F]/20 hover:shadow-lg transition-shadow">
                    <benefit.icon className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div id="generator" className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">Dein Karussell-Generator</h2>
            <p className="text-gray-600">Fülle die Felder aus und erstelle professionelle Karussell-Posts</p>
          </div>

          <div className="grid lg:grid-cols-[350px_1fr] gap-8">
            {/* Premium Sidebar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-[#F4D03F]/20 h-fit lg:sticky lg:top-4">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#C9A227] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Format wählen
                </h3>
                <div className="space-y-3">
                  {formats.map((format) => (
                    <button
                      key={format.name}
                      onClick={() => setSelectedFormat(format)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all border-2 ${
                        selectedFormat.name === format.name
                          ? 'border-[#F4D03F] bg-gradient-to-br from-[#F4D03F]/10 to-[#C9A227]/5 shadow-md'
                          : 'border-gray-200 hover:border-[#F4D03F]/50 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedFormat.name === format.name ? 'border-[#F4D03F] bg-[#F4D03F]/10' : 'border-gray-300'
                      }`}>
                        {selectedFormat.name === format.name && (
                          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#F4D03F] to-[#C9A227]" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-sm text-[#1A1A2E]">{format.label}</div>
                        <div className="text-xs text-gray-500 font-medium">{format.width} × {format.height} px</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#C9A227] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Farben
                </h3>
                <div className="space-y-4">
                  {Object.entries(colors).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="flex-1 text-sm font-semibold text-[#1A1A2E] capitalize">
                        {key === 'bg' ? 'Hintergrund' : key === 'accent' ? 'Akzent' : 'Text'}
                      </label>
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg text-xs font-mono text-gray-900 focus:border-[#F4D03F] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#C9A227] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Schrift
                </h3>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-bold bg-white cursor-pointer text-[#1A1A2E] hover:border-[#F4D03F] focus:border-[#F4D03F] focus:outline-none transition-colors"
                >
                  <option value="Montserrat">Montserrat</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Arial">Arial</option>
                </select>
              </div>

              <div className="space-y-3">
                <button
                  onClick={exportSlide}
                  className="gold-button w-full text-[#1A1A2E] font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-5 h-5" />
                  Diese Slide exportieren
                </button>
                <button
                  onClick={exportAll}
                  className="pulse-animation w-full bg-gradient-to-r from-[#1A1A2E] to-[#252540] text-white font-bold py-4 px-4 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-5 h-5" />
                  Alle 7 Slides exportieren
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-[#FBF8F3] to-white rounded-xl text-center border-2 border-[#F4D03F]/20">
                <p className="text-xs text-gray-600 mb-1 font-semibold">Signatur auf jeder Slide:</p>
                <p className="text-sm font-bold"><span className="text-[#C9A227]">Claudia Conen</span> - Die Umsatzstimme</p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-gray-200">
              {/* Slide Navigation */}
              <div className="flex gap-3 mb-8 flex-wrap">
                {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentSlide(num)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      currentSlide === num
                        ? 'bg-gradient-to-r from-[#F4D03F] to-[#C9A227] text-[#1A1A2E] shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-lg font-black text-xs ${
                      currentSlide === num
                        ? 'bg-[#1A1A2E] text-[#F4D03F]'
                        : 'bg-white text-gray-600 group-hover:bg-[#F4D03F] group-hover:text-[#1A1A2E]'
                    }`}>
                      {num}
                    </span>
                    {slideData[num].title}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-[auto_1fr] gap-8">
                {/* Canvas Preview */}
                <div style={{ width: '324px' }}>
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    <span className="text-xs font-bold text-[#C9A227] uppercase">Live Vorschau</span>
                  </div>
                  <div
                    className="bg-[#1A1A2E] rounded-xl overflow-hidden shadow-2xl border-4 border-[#F4D03F]/20 hover:border-[#F4D03F]/40 transition-all"
                    style={{ width: '324px', height: `${previewHeight}px` }}
                  >
                    <canvas
                      ref={canvasRef}
                      width={selectedFormat.width}
                      height={selectedFormat.height}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="number-badge">
                      {currentSlide}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1A1A2E]">
                        {slideData[currentSlide].title}
                      </h3>
                      <p className="text-sm text-gray-500">Fülle die Felder für diese Slide aus</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {slideData[currentSlide].fields.map((field) => (
                      <div key={field.id} className="group">
                        <label className="block text-xs font-bold text-[#C9A227] uppercase tracking-wide mb-2 flex items-center gap-2">
                          {field.type === 'photo' && <ImageIcon className="w-3.5 h-3.5" />}
                          {field.label}
                        </label>
                        {field.type === 'text' && (
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateField(currentSlide, field.id, e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#F4D03F] focus:outline-none focus:shadow-lg focus:shadow-[#F4D03F]/20 transition-all text-gray-900 font-medium"
                          />
                        )}
                        {field.type === 'textarea' && (
                          <textarea
                            value={field.value}
                            onChange={(e) => updateField(currentSlide, field.id, e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#F4D03F] focus:outline-none focus:shadow-lg focus:shadow-[#F4D03F]/20 transition-all min-h-[100px] resize-y text-gray-900 font-medium"
                          />
                        )}
                        {field.type === 'photo' && (
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(currentSlide, field.id, e)}
                              className="hidden"
                              id={`photo-${currentSlide}-${field.id}`}
                            />
                            <label
                              htmlFor={`photo-${currentSlide}-${field.id}`}
                              className="block w-full p-10 border-3 border-dashed border-[#F4D03F]/40 rounded-xl text-center cursor-pointer hover:border-[#F4D03F] hover:bg-[#F4D03F]/5 transition-all group-hover:scale-102"
                            >
                              <ImageIcon className="w-12 h-12 text-[#C9A227] mx-auto mb-3" />
                              <p className="text-sm font-bold text-[#1A1A2E]">Klicke zum Hochladen</p>
                              <p className="text-xs text-gray-500 mt-1">JPG, PNG oder WEBP</p>
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-16 bg-gradient-to-br from-[#FFF9E5] via-white to-[#FFF5DC] rounded-2xl p-8 shadow-xl border-2 border-[#F4D03F]/30">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E]">Pro-Tipps für bessere Karussells</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#F4D03F]/30 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h4 className="font-bold mb-2 text-[#1A1A2E]">Hook ist King</h4>
                <p className="text-sm text-gray-600">Die erste Slide entscheidet über Erfolg. Nutze Fragen, Kontraste und emotionale Trigger.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#F4D03F]/30 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <Heart className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h4 className="font-bold mb-2 text-[#1A1A2E]">Komfort-Elemente</h4>
                <p className="text-sm text-gray-600">Reduziere Widerstände mit Sätzen wie "Kein Druck" oder "Alles freiwillig".</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#F4D03F]/30 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-[#F4D03F]/20 to-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-[#C9A227]" />
                </div>
                <h4 className="font-bold mb-2 text-[#1A1A2E]">Klarer CTA</h4>
                <p className="text-sm text-gray-600">Slide 7 muss eine eindeutige Handlungsaufforderung haben - mach es einfach!</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 pt-8 border-t-2 border-gray-200">
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 mb-3">
                Basierend auf der <strong className="text-[#C9A227]">Claudia Write to Brain Formel</strong>
              </p>
              <p className="text-base text-gray-600 mb-4">
                <Link to="/" className="text-[#C9A227] hover:text-[#F4D03F] font-bold underline decoration-2">ClaudiaConen.com</Link>
                <span className="mx-2 text-gray-400">|</span>
                <a href="tel:+4916099142208" className="text-[#C9A227] hover:text-[#F4D03F] font-bold">0160 99 14 22 08</a>
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4D03F]/10 to-[#C9A227]/10 px-6 py-3 rounded-full border-2 border-[#F4D03F]/30">
                <Sparkles className="w-4 h-4 text-[#C9A227]" />
                <p className="text-sm font-bold text-[#1A1A2E]">
                  Perfektion klickt. Persönlichkeit bleibt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
