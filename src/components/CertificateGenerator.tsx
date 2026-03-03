import React from 'react';
import { jsPDF } from 'jspdf';

interface CertificateGeneratorProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  onGenerate?: () => void;
}

export const generateCertificate = async (
  studentName: string,
  courseName: string,
  completionDate: string,
  certificateNumber: string
) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(240, 248, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setDrawColor(0, 102, 204);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

  pdf.setDrawColor(0, 153, 255);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  pdf.setFontSize(48);
  pdf.setTextColor(0, 51, 102);
  pdf.text('Zertifikat', pageWidth / 2, 40, { align: 'center' });

  pdf.setFontSize(16);
  pdf.setTextColor(102, 102, 102);
  pdf.text('wird verliehen an', pageWidth / 2, 55, { align: 'center' });

  pdf.setFontSize(32);
  pdf.setTextColor(0, 102, 204);
  pdf.text(studentName, pageWidth / 2, 75, { align: 'center' });

  pdf.setFontSize(16);
  pdf.setTextColor(102, 102, 102);
  pdf.text('für die erfolgreiche Teilnahme am', pageWidth / 2, 95, { align: 'center' });

  pdf.setFontSize(24);
  pdf.setTextColor(0, 51, 102);
  pdf.text(courseName, pageWidth / 2, 110, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setTextColor(102, 102, 102);
  const formattedDate = new Date(completionDate).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  pdf.text(`Abgeschlossen am ${formattedDate}`, pageWidth / 2, 130, {
    align: 'center',
  });

  pdf.setFontSize(10);
  pdf.setTextColor(153, 153, 153);
  pdf.text(
    `Zertifikatsnummer: ${certificateNumber}`,
    pageWidth / 2,
    pageHeight - 25,
    { align: 'center' }
  );

  pdf.setLineWidth(0.5);
  pdf.line(50, 150, 130, 150);
  pdf.setFontSize(10);
  pdf.setTextColor(102, 102, 102);
  pdf.text('Claudia Conen', 90, 156, { align: 'center' });
  pdf.text('Geschäftsführerin', 90, 162, { align: 'center' });

  return pdf;
};

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  studentName,
  courseName,
  completionDate,
  certificateNumber,
  onGenerate,
}) => {
  const handleGeneratePDF = async () => {
    const pdf = await generateCertificate(
      studentName,
      courseName,
      completionDate,
      certificateNumber
    );

    pdf.save(`Zertifikat_${courseName.replace(/\s+/g, '_')}_${studentName.replace(/\s+/g, '_')}.pdf`);

    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center space-x-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>Zertifikat herunterladen</span>
    </button>
  );
};

export default CertificateGenerator;
