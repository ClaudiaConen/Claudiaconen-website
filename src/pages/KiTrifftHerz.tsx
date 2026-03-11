import SubpageTemplate from '../components/SubpageTemplate';

export default function KiTrifftHerz() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          KI trifft Herz
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Inhalt folgt in Kürze.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="KI trifft Herz"
      subtitle="Claudia Conen"
      introText="KI trifft Herz – wenn Technologie und Menschlichkeit sich begegnen."
      bodyContent={bodyContent}
      ctaText="Neugierig geworden?"
      topic="KI trifft Herz"
    />
  );
}
