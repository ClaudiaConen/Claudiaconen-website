import SubpageTemplate from '../components/SubpageTemplate';

export default function ZuDrittGewinnErzeugen() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Zu dritt Gewinn erzeugen
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Inhalt folgt in Kürze.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Zu dritt Gewinn erzeugen"
      subtitle="Claudia Conen"
      introText="Zu dritt Gewinn erzeugen – gemeinsam mehr erreichen."
      bodyContent={bodyContent}
      ctaText="Mehr erfahren?"
      topic="Zu dritt Gewinn erzeugen"
    />
  );
}
