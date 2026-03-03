import SubpageTemplate from '../components/SubpageTemplate';

export default function AusbildungBeruf() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Redner als Beruf
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Sie wollen nicht nur gelegentlich auf der Bühne stehen – Sie wollen Speaker als Beruf.
          In dieser umfassenden Ausbildung lernen Sie alles, was Sie brauchen, um als professioneller
          Redner erfolgreich zu sein: von der Positionierung über die Bühnenperformance bis hin zum
          Business-Aufbau.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Module der Ausbildung
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Positionierung & Marke:</strong> Finden Sie Ihre Nische und Unique Voice</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimm- und Sprechtechnik:</strong> Entwickeln Sie Ihre volle Stimmkraft</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Bühnenpräsenz:</strong> Performen Sie wie ein Profi</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Storytelling & Dramaturgie:</strong> Bauen Sie fesselnde Vorträge</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Marketing & Akquise:</strong> Gewinnen Sie Buchungen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Business-Aufbau:</strong> Von Preisfindung bis Vertragsgestaltung</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <h3 className="text-xl font-bold text-midnight-blue mb-4">Dauer & Format</h3>
        <p className="text-gray-700">
          3 Monate intensive Ausbildung mit Live-Trainings, Online-Modulen, praktischen Übungen
          und individuellen Coaching-Sessions. Abschluss mit Zertifikat.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Redner als Beruf"
      subtitle="Redner-Ausbildungen"
      introText="Die komplette Ausbildung für alle, die Speaker als Beruf ausüben wollen. Von der Positionierung bis zum Business-Aufbau."
      bodyContent={bodyContent}
      ctaText="Bereit für Ihre Speaker-Karriere?"
      topic="Redner als Beruf Ausbildung"
    />
  );
}
