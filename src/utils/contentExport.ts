interface ContentPlanItem {
  id?: string;
  month: string;
  title: string;
  description: string;
  contentType: string;
  channel: string;
  targetAudience: string;
  status: string;
  priority: string;
  scheduledDate: string;
  actualStatus?: 'idea' | 'in_progress' | 'completed' | 'published';
  uploadCount?: number;
}

export const encodeForCanva = (text: string): string => {
  return encodeURIComponent(text);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const openInCanva = (post: ContentPlanItem): void => {
  const text = `${post.title}\n\n${post.description}`;
  const encodedText = encodeForCanva(text);

  let canvaUrl = '';

  switch (post.channel.toLowerCase()) {
    case 'instagram':
      canvaUrl = `https://www.canva.com/design/create?type=InstagramPost&text=${encodedText}`;
      break;
    case 'linkedin':
      canvaUrl = `https://www.canva.com/design/create?type=LinkedInPost&text=${encodedText}`;
      break;
    case 'facebook':
      canvaUrl = `https://www.canva.com/design/create?type=FacebookPost&text=${encodedText}`;
      break;
    case 'twitter/x':
    case 'twitter':
      canvaUrl = `https://www.canva.com/design/create?type=TwitterPost&text=${encodedText}`;
      break;
    default:
      canvaUrl = `https://www.canva.com/design/create?type=SocialMediaPost&text=${encodedText}`;
  }

  window.open(canvaUrl, '_blank', 'noopener,noreferrer');
};

export const generatePostPDF = async (post: ContentPlanItem): Promise<Blob> => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;

  doc.setFillColor(26, 39, 74);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Content Plan', margin, 25);

  let yPosition = 60;

  doc.setTextColor(26, 39, 74);
  doc.setFontSize(18);
  doc.text(post.title, margin, yPosition);
  yPosition += 15;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);

  const metaData = [
    `Content-Typ: ${post.contentType}`,
    `Kanal: ${post.channel}`,
    `Datum: ${post.scheduledDate}`,
    `Status: ${post.actualStatus || post.status}`,
    `Priorität: ${post.priority}`
  ];

  metaData.forEach(item => {
    doc.text(item, margin, yPosition);
    yPosition += 7;
  });

  yPosition += 10;

  doc.setFontSize(12);
  doc.setTextColor(26, 39, 74);
  doc.text('Beschreibung:', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const descriptionLines = doc.splitTextToSize(post.description, maxWidth);
  doc.text(descriptionLines, margin, yPosition);
  yPosition += descriptionLines.length * 7 + 15;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Zielgruppe:', margin, yPosition);
  yPosition += 7;
  const audienceLines = doc.splitTextToSize(post.targetAudience, maxWidth);
  doc.text(audienceLines, margin, yPosition);

  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Erstellt mit Claudia Conen Content Planer', margin, footerY);
  doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, pageWidth - margin, footerY, { align: 'right' });

  return doc.output('blob');
};

export const downloadPDF = async (post: ContentPlanItem): Promise<void> => {
  try {
    const pdfBlob = await generatePostPDF(post);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_contentplan.pdf`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

export const generateGoogleCalendarURL = (post: ContentPlanItem): string => {
  const title = encodeURIComponent(post.title);
  const details = encodeURIComponent(`${post.description}\n\nContent-Typ: ${post.contentType}\nKanal: ${post.channel}`);
  const location = encodeURIComponent(post.channel);

  const dateStr = post.scheduledDate;
  const [day, month] = dateStr.split('.').map(Number);
  const year = new Date().getFullYear();
  const startDate = new Date(year, month - 1, day, 9, 0);
  const endDate = new Date(year, month - 1, day, 10, 0);

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
};

export const generateICS = (post: ContentPlanItem): string => {
  const dateStr = post.scheduledDate;
  const [day, month] = dateStr.split('.').map(Number);
  const year = new Date().getFullYear();
  const startDate = new Date(year, month - 1, day, 9, 0);
  const endDate = new Date(year, month - 1, day, 10, 0);

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Claudia Conen//Content Planer//DE',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@claudiaconen.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${post.title}`,
    `DESCRIPTION:${post.description}\\n\\nContent-Typ: ${post.contentType}\\nKanal: ${post.channel}`,
    `LOCATION:${post.channel}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
};

export const downloadICS = (post: ContentPlanItem): void => {
  const icsContent = generateICS(post);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_calendar.ics`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
