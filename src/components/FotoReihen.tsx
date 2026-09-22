/**
 * Drei laufende Reihen aus Foto-Kacheln als Hintergrund eines Seitenkopfs - Claudias Wunsch vom
 * 22.09.2026 (10:38/10:40 UTC): "diesen Effekt ganz oben von dem Slider ... finde ich sehr schoen ...
 * nur diese Kacheln mit Fotos, die du neu bestueckst, aus dem, die du alle schon hast".
 * Vorbild ist der Kopf von community.claudiaconen.com/netzwerkwebinar (Gabis Seite - die bleibt
 * unberuehrt; hier nur die Machart: drei Reihen, versetzte Richtung und Tempo, leicht gekippt,
 * dunkler Schleier darueber). Bilder: public/challenge/karten/*.webp (240x320, zusammen 124 KB),
 * alle von Claudia selbst, keine Dritten. CSS: .cc-fr* in index.css.
 */
const KARTEN: { datei: string; tag: string; text: string }[] = [
  { datei: 'keynote', tag: 'Bühne', text: 'Keynote' },
  { datei: 'telefon', tag: 'Stimme', text: 'Am Hörer' },
  { datei: 'kamera', tag: 'Video', text: 'Vor der Kamera' },
  { datei: 'training', tag: 'Training', text: 'Im Workshop' },
  { datei: 'rampenlicht', tag: 'Bühne', text: 'Im Rampenlicht' },
  { datei: 'zuhoeren', tag: 'Wirkung', text: 'Zuhören' },
  { datei: 'tonstudio', tag: 'Stimme', text: 'Im Tonstudio' },
  { datei: 'rednerin', tag: 'Rede', text: 'Freie Rednerin' },
  { datei: 'laptop', tag: 'Online', text: 'Vor dem Bildschirm' },
  { datei: 'messe', tag: 'Gespräch', text: 'Auf der Messe' },
  { datei: 'kopf-herz', tag: 'Wirkung', text: 'Kopf & Herz' },
  { datei: 'benefiz', tag: 'Bühne', text: 'Benefiz' },
  { datei: 'avatare', tag: 'KI & Mensch', text: 'Avatare' },
  { datei: 'mantel', tag: 'Präsenz', text: 'Haltung' },
  { datei: 'buch', tag: 'Autorin', text: 'Das Buch' },
  { datei: 'anlaesse', tag: 'Anlässe', text: 'Besondere Momente' },
  { datei: 'steinmauer', tag: 'Präsenz', text: 'Klarheit' },
  { datei: 'mappe', tag: 'Präsenz', text: 'Vorbereitet' },
];

const REIHEN = [KARTEN.slice(0, 6), KARTEN.slice(6, 12), KARTEN.slice(12, 18)];

function Karte({ k }: { k: (typeof KARTEN)[number] }) {
  return (
    <div className="cc-fr-karte">
      <img src={`/challenge/karten/${k.datei}.webp`} alt="" width={240} height={320} decoding="async" />
      <span className="cc-fr-schleier" aria-hidden="true" />
      <span className="cc-fr-tag">{k.tag}</span>
      <span className="cc-fr-text">{k.text}</span>
    </div>
  );
}

export default function FotoReihen() {
  return (
    <div className="cc-fr" aria-hidden="true">
      {REIHEN.map((reihe, i) => (
        <div key={i} className="cc-fr-reihe">
          <div className={`cc-fr-spur ${i === 1 ? 'cc-fr-spur--zurueck' : i === 2 ? 'cc-fr-spur--langsam' : ''}`}>
            {[...reihe, ...reihe].map((k, j) => (
              <Karte key={j} k={k} />
            ))}
          </div>
        </div>
      ))}
      <div className="cc-fr-decke" />
    </div>
  );
}
