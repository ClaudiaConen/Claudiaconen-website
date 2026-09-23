import SubpageTemplate from '../components/SubpageTemplate';

export default function WissenCommunity() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Community
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Lernen und wachsen Sie gemeinsam mit Gleichgesinnten! Unsere Community ist ein inspirierender
          Ort für Speaker, Selbstständige und alle, die an ihrer Stimme und Wirkung arbeiten möchten.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie in der Community erwartet
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Regelmäßige Live-Sessions:</strong> Q&A, Masterclasses und Workshops</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Austausch & Networking:</strong> Verbinden Sie sich mit anderen Mitgliedern</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Exklusive Inhalte:</strong> Videos, Übungen und Trainingsmaterialien</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Feedback-Runden:</strong> Präsentieren Sie Ihre Arbeit und erhalten Sie Feedback</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/messe.webp"
      bildAlt="Claudia Conen mit dem Magazin The Power of AI"
      title="Community"
      subtitle="Wissen to go"
      introText="Werden Sie Teil unserer inspirierenden Community und wachsen Sie gemeinsam mit Gleichgesinnten."
      bodyContent={bodyContent}
      ctaText="Jetzt Community beitreten!"
      topic="Community"
    />
  );
}
