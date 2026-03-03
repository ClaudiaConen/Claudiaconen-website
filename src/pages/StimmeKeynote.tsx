import SubpageTemplate from '../components/SubpageTemplate';

export default function StimmeKeynote() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Keynote & Event-Moderation
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Sie planen eine Veranstaltung und suchen eine professionelle Stimme, die Ihr Event zu
          einem unvergesslichen Erlebnis macht? Als erfahrene Keynote-Speakerin und Event-Moderatorin
          bringe ich die perfekte Mischung aus Professionalität, Emotionalität und Entertainment auf
          Ihre Bühne.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Meine Services
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Keynote-Vorträge:</strong> Inspirierende Impulse zu Stimme, Wirkung und Kommunikation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Event-Moderation:</strong> Souveräne Führung durch Ihr Programm</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Podiumsdiskussionen:</strong> Lebendige und tiefgehende Gespräche</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Award-Zeremonien:</strong> Würdige Verleihung mit emotionaler Note</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Ihre Veranstaltung verdient eine Stimme, die im Gedächtnis bleibt."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Keynote & Event-Moderation"
      subtitle="Die Stimme für Ihre Botschaft"
      introText="Professionelle Keynotes und Event-Moderation für unvergessliche Veranstaltungen. Mit Stimmkraft, Präsenz und Emotionalität."
      bodyContent={bodyContent}
      ctaText="Buchen Sie mich für Ihr Event!"
      topic="Keynote & Event-Moderation"
    />
  );
}
