import SubpageTemplate from '../components/SubpageTemplate';

export default function StimmeVoiceover() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Voice-Over & Podcast-Trailer
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Ihre Marke braucht eine Stimme – und zwar eine, die gehört wird. Mit meiner professionellen
          Voice-Over-Arbeit verleihe ich Ihren Projekten die perfekte stimmliche Präsenz. Von
          Podcast-Trailern über Imagefilme bis zu Hörbüchern.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Meine Voice-Over Services
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Podcast-Trailer & Intros:</strong> Professionelle Eröffnung für Ihren Podcast</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Imagefilme:</strong> Unternehmensvideos mit authentischer Stimme</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>E-Learning & Online-Kurse:</strong> Verständliche und angenehme Begleitung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Werbespots:</strong> Verkaufsstarke Voice-Overs für Ihre Kampagnen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Audiobooks:</strong> Emotionales Vorlesen für Hörbücher</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <h3 className="text-xl font-bold text-midnight-blue mb-4">Technische Details</h3>
        <p className="text-gray-700">
          Professionelles Homestudio mit hochwertiger Technik. Lieferung in Ihrem gewünschten Format.
          Schnelle Turnaround-Zeiten und Revision inklusive.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Voice-Over & Podcast-Trailer"
      subtitle="Die Stimme für Ihre Botschaft"
      introText="Professionelle Voice-Over-Aufnahmen für Ihre Projekte. Von Podcast-Trailern bis zu Imagefilmen."
      bodyContent={bodyContent}
      ctaText="Lassen Sie uns über Ihr Projekt sprechen!"
      topic="Voice-Over & Podcast-Trailer"
    />
  );
}
