import SubpageTemplate from '../components/SubpageTemplate';

export default function AusbildungZertifizierung() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Zertifizierung & Lizenzprogramm
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Sie möchten die Voice-to-Impact® Methode in Ihrer eigenen Arbeit nutzen und weitergeben?
          Mit unserem Zertifizierungs- und Lizenzprogramm werden Sie zum autorisierten Voice-to-Impact®
          Trainer und können die Methode in Ihren eigenen Trainings, Coachings und Workshops einsetzen.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie erhalten
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Komplette Methode:</strong> Alle Tools, Techniken und Strategien der Voice-to-Impact® Methode</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Trainingsmaterialien:</strong> Präsentationen, Workbooks und Übungen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Zertifikat:</strong> Offizielles Voice-to-Impact® Trainer-Zertifikat</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Marketing-Support:</strong> Logo, Badges und Promotional Materials</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Community-Zugang:</strong> Netzwerk mit anderen zertifizierten Trainern</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Laufender Support:</strong> Updates und Weiterbildungen</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <h3 className="text-xl font-bold text-midnight-blue mb-4">Voraussetzungen</h3>
        <p className="text-gray-700 mb-4">
          Abgeschlossene Speaker-Ausbildung oder mehrjährige Erfahrung als Trainer/Coach.
          Bewerbungsprozess mit persönlichem Interview.
        </p>
        <p className="text-midnight-blue font-bold">
          Limitierte Plätze pro Jahr – frühzeitige Bewerbung empfohlen.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Zertifizierung & Lizenzprogramm"
      subtitle="Redner-Ausbildungen"
      introText="Werden Sie autorisierter Voice-to-Impact® Trainer und geben Sie die Methode in Ihrer eigenen Arbeit weiter."
      bodyContent={bodyContent}
      ctaText="Interessiert an der Zertifizierung?"
      topic="Voice-to-Impact Zertifizierung"
    />
  );
}
