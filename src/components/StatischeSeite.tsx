import { useEffect } from 'react';

/**
 * Die Angebotsseiten (/angebote, /live-workshop, /mentoring-programm, /mentoring-inhalte)
 * liegen als fertige Seiten im neuen Design als public/<name>.html (Claudia 15.10.2026).
 * Kommt man per Klick im Menue hierher, hat React die Adresse uebernommen und kennt sie nicht -
 * dann einmal richtig laden, damit Netlify die fertige Seite ausliefert. Ein Merker in der
 * Sitzung verhindert eine Endlosschleife, falls die Datei einmal fehlen sollte.
 */
export default function StatischeSeite() {
  const pfad = typeof window !== 'undefined' ? window.location.pathname : '';
  let gerade = false;
  try {
    const t = Number(window.sessionStorage.getItem('statisch:' + pfad) || 0);
    gerade = Date.now() - t < 8000;
  } catch { /* privater Modus */ }
  useEffect(() => {
    if (gerade) return;
    try { window.sessionStorage.setItem('statisch:' + pfad, String(Date.now())); } catch { /* egal */ }
    window.location.reload();
  }, [pfad, gerade]);
  if (!gerade) return null;
  return (
    <div style={{ padding: '120px 24px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <p>Diese Seite lädt gerade nicht. <a href="/">Zur Startseite</a></p>
    </div>
  );
}
