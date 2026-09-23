import SubpageTemplate from '../components/SubpageTemplate';

export default function BlogWirkung() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Wirkung & Persönlichkeit
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Wahre Wirkung entsteht nicht durch Techniken, sondern durch Authentizität. In diesem
          Blog-Bereich schreibe ich über Persönlichkeitsentwicklung, Präsenz und die Kunst, mit
          der eigenen Einzigartigkeit zu überzeugen.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Beliebte Artikel
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Authentische Präsenz:</strong> Wie Sie Räume mit Ihrer Persönlichkeit füllen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Macht der Verletzlichkeit:</strong> Warum echte Stärke in der Offenheit liegt</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Charisma entwickeln:</strong> Ist Ausstrahlung erlernbar?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmige Persönlichkeit:</strong> Wenn innere und äußere Haltung übereinstimmen</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Ihre größte Wirkung entfalten Sie, wenn Sie einfach Sie selbst sind – nur in Bestform."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/kamera.webp"
      bildAlt="Claudia Conen im Porträt, Arme verschränkt"
      title="Wirkung & Persönlichkeit"
      subtitle="Blog & Aktuelles"
      introText="Artikel über authentische Präsenz, Persönlichkeitsentwicklung und die Kunst, mit Ihrer Einzigartigkeit zu überzeugen."
      bodyContent={bodyContent}
      ctaText="Lassen Sie uns über Ihre Wirkung sprechen!"
      topic="Wirkung & Persönlichkeit Blog"
    />
  );
}
