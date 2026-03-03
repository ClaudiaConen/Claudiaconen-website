import SubpageTemplate from '../components/SubpageTemplate';

export default function UnternehmenKeynotes() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Keynotes & Firmenvorträge, die bewegen
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Eine Keynote ist mehr als ein Vortrag – sie ist ein Erlebnis, das nachhallt.
          Mit meiner einzigartigen Kombination aus Stimmkraft, emotionaler Intelligenz und
          praxisnahen Inhalten bringe ich Ihre Botschaft auf die Bühne und in die Herzen
          Ihrer Zielgruppe.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Meine Keynote-Themen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Umsatzstimme:</strong> Wie Sie mit Ihrer Stimme mehr Wirkung und Umsatz erzielen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Emotional Selling:</strong> Verkaufen über die emotionale Ebene</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Voice-to-Impact:</strong> Präsenz und Persönlichkeit in der Kommunikation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>KI meets Mensch:</strong> Die Zukunft der authentischen Kommunikation</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie erwarten dürfen
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Maßgeschneidert</h4>
            <p className="text-gray-600">
              Jede Keynote wird individuell auf Ihr Unternehmen, Ihre Branche und Ihre Ziele abgestimmt.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Interaktiv</h4>
            <p className="text-gray-600">
              Lebendige Vorträge mit praktischen Übungen und direktem Publikumsbezug.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Nachhaltig</h4>
            <p className="text-gray-600">
              Inhalte, die nicht nur inspirieren, sondern auch direkt umsetzbar sind.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Emotional</h4>
            <p className="text-gray-600">
              Mit Storytelling und Stimmgewalt schaffe ich unvergessliche Momente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Keynotes & Firmenvorträge"
      subtitle="Für Unternehmen"
      introText="Impulse, die bewegen. Vorträge, die wirken. Lassen Sie uns gemeinsam Ihre Veranstaltung zu einem unvergesslichen Erlebnis machen."
      bodyContent={bodyContent}
      ctaText="Bereit für eine inspirierende Keynote?"
      topic="Keynotes & Firmenvorträge"
    />
  );
}
