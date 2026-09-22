/**
 * Einstiegspunkt fuer das Vorrendern.
 *
 * Wird von Vite als eigenes Serverbuendel gebaut (vite build --ssr). Das ist
 * wichtig: Nur so werden import.meta.env, Stilangaben und Pfad-Kuerzel genauso
 * aufgeloest wie im normalen Bau. Ein Versuch, die Seiten direkt mit tsx oder
 * bun zu laden, laeuft hier auf dem Server zwar, wuerde auf Netlify aber still
 * scheitern - und still scheitern ist die schlimmste Sorte Fehler.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Seitenuebersicht from './components/Seitenuebersicht';
import React from 'react';

/** Adresse -> Seite. Von Hand gepflegt, weil App.tsx die Zuordnung nur
 *  innerhalb von JSX kennt. Fehlt eine Seite hier, verhaelt sie sich wie
 *  bisher: leere Huelle, Inhalt erst per JavaScript. */
export const SEITEN: { pfad: string; laden: () => Promise<any> }[] = [
  // Erzeugt aus der Routentabelle in App.tsx. Von Hand gepflegt waren
  // es 24 von 148 - jede fehlende Seite ist eine Seite, die eine KI
  // nicht lesen kann. Ausgenommen: Adressen mit Platzhalter, der
  // Auffangpfad, Admin und Mitgliederbereich.
  { pfad: '/', laden: () => import('./pages/Home') },
  { pfad: '/claudia-ai', laden: () => import('./pages/ClaudiaAIBeta') },
  { pfad: '/newsletter', laden: () => import('./pages/Newsletter') },
  { pfad: '/unverwechselbare', laden: () => import('./pages/Unverwechselbare') },
  { pfad: '/hoeren', laden: () => import('./pages/Hoeren') },
  { pfad: '/trauerrede', laden: () => import('./pages/Trauerrednerin') },
  { pfad: '/freie-trauung', laden: () => import('./pages/Hochzeitsrednerin') },
  { pfad: '/freie-rednerin', laden: () => import('./pages/FreieRednerin') },
  { pfad: '/freie-redner-ausbildung', laden: () => import('./pages/FreieRednerAusbildung') },
  { pfad: '/trauerredner-ausbildung', laden: () => import('./pages/TrauerrednerAusbildung') },
  { pfad: '/hochzeitsredner-ausbildung', laden: () => import('./pages/HochzeitsrednerAusbildung') },
  { pfad: '/speaker-ausbildung', laden: () => import('./pages/SpeakerAusbildung') },
  { pfad: '/elevator-pitch-kurs', laden: () => import('./pages/ElevatorPitchKurs') },
  { pfad: '/storytelling-kurs', laden: () => import('./pages/StorytellingKurs') },
  { pfad: '/wissen/was-kostet-ein-keynote-speaker', laden: () => import('./pages/ArtikelKeynotePreis') },
  { pfad: '/wissen/keynote-speaker-finden', laden: () => import('./pages/ArtikelSpeakerFinden') },
  { pfad: '/wissen/stimme-trainieren', laden: () => import('./pages/ArtikelStimmeTrainieren') },
  { pfad: '/wissen/lampenfieber', laden: () => import('./pages/ArtikelLampenfieber') },
  { pfad: '/wissen/charisma-lernen', laden: () => import('./pages/ArtikelCharisma') },
  { pfad: '/wissen/thema-finden-speaker', laden: () => import('./pages/ArtikelThemaFinden') },
  { pfad: '/wissen/sprechpausen', laden: () => import('./pages/ArtikelSprechpausen') },
  { pfad: '/wissen/trauerrede-schreiben', laden: () => import('./pages/ArtikelTrauerredeSchreiben') },
  { pfad: '/wissen/keynote-speaker-werden', laden: () => import('./pages/ArtikelSpeakerWerden') },
  { pfad: '/wissen/freie-trauung-ablauf', laden: () => import('./pages/ArtikelFreieTrauung') },
  { pfad: '/wissen/elevator-pitch', laden: () => import('./pages/ArtikelElevatorPitch') },
  { pfad: '/wissen/storytelling', laden: () => import('./pages/ArtikelStorytelling') },
  { pfad: '/wissen/tiefere-stimme', laden: () => import('./pages/ArtikelTiefereStimme') },
  { pfad: '/wissen/gute-rede-halten', laden: () => import('./pages/ArtikelGuteRede') },
  { pfad: '/wissen/vier-ohren-modell', laden: () => import('./pages/ArtikelVierOhren') },
  { pfad: '/wissen/keynote-aufbauen', laden: () => import('./pages/ArtikelKeynoteAufbauen') },
  { pfad: '/marke-und-positionierung', laden: () => import('./pages/MarkeUndPositionierung') },
  { pfad: '/keynote-und-buehnenperformance', laden: () => import('./pages/KeynoteUndBuehnenperformance') },
  { pfad: '/1-zu-1-mentoring', laden: () => import('./pages/EinsZuEinsMentoring') },
  { pfad: '/redner-ausbildungen', laden: () => import('./pages/RednerAusbildungen') },
  { pfad: '/wissen-to-go', laden: () => import('./pages/WissenToGo') },
  { pfad: '/social-media-wirkung', laden: () => import('./pages/SocialMediaWirkung') },
  { pfad: '/immer-da-wo-du-bist', laden: () => import('./pages/ImmerDaWoDuBist') },
  { pfad: '/unternehmen-keynotes', laden: () => import('./pages/UnternehmenKeynotes') },
  { pfad: '/unternehmen-leadership', laden: () => import('./pages/UnternehmenLeadership') },
  { pfad: '/unternehmen-selling', laden: () => import('./pages/UnternehmenSelling') },
  { pfad: '/unternehmen-events', laden: () => import('./pages/UnternehmenEvents') },
  { pfad: '/speaker-positionierung', laden: () => import('./pages/SpeakerPositionierung') },
  { pfad: '/speaker-storytelling', laden: () => import('./pages/SpeakerStorytelling') },
  { pfad: '/speaker-buehne', laden: () => import('./pages/SpeakerBuehne') },
  { pfad: '/speaker-social', laden: () => import('./pages/SpeakerSocial') },
  { pfad: '/speaker-training', laden: () => import('./pages/SpeakerTraining') },
  { pfad: '/mentoring-transformation', laden: () => import('./pages/MentoringTransformation') },
  { pfad: '/mentoring-gold', laden: () => import('./pages/MentoringGold') },
  { pfad: '/mentoring-online', laden: () => import('./pages/MentoringOnline') },
  { pfad: '/ausbildung-beruf', laden: () => import('./pages/AusbildungBeruf') },
  { pfad: '/ausbildung-zertifizierung', laden: () => import('./pages/AusbildungZertifizierung') },
  { pfad: '/ki-manager-ausbildung', laden: () => import('./pages/KIManagerAusbildung') },
  { pfad: '/ki-webseite-erlebnis', laden: () => import('./pages/KIWebseiteErlebnis') },
  { pfad: '/ki-einsteiger-coaching', laden: () => import('./pages/KIEinsteigerCoaching') },
  { pfad: '/ki-1zu1', laden: () => import('./pages/KI1zu1') },
  { pfad: '/premiumangebote', laden: () => import('./pages/PremiumAngebote') },
  { pfad: '/stimme-keynote', laden: () => import('./pages/StimmeKeynote') },
  { pfad: '/stimme-hochzeit', laden: () => import('./pages/StimmeHochzeit') },
  { pfad: '/stimme-trauer', laden: () => import('./pages/StimmeTrauer') },
  { pfad: '/stimme-voiceover', laden: () => import('./pages/StimmeVoiceover') },
  { pfad: '/unverwechselbar-du', laden: () => import('./pages/UnverwechselbarDu') },
  { pfad: '/wissensbibliothek', laden: () => import('./pages/Wissensbibliothek') },
  { pfad: '/wissensmagazin', laden: () => import('./pages/Wissensbibliothek') },
  { pfad: '/experten', laden: () => import('./pages/Experten') },
  { pfad: '/checklist-bestaetigung', laden: () => import('./pages/ChecklistBestaetigung') },
  { pfad: '/linkedin-freebie', laden: () => import('./pages/LinkedInFreebie') },
  { pfad: '/linkedin-freebie-confirmed', laden: () => import('./pages/LinkedInFreebieConfirmed') },
  { pfad: '/wissen-community', laden: () => import('./pages/WissenCommunity') },
  { pfad: '/wissen-webinare', laden: () => import('./pages/WissenWebinare') },
  { pfad: '/wissen-telegram', laden: () => import('./pages/WissenTelegram') },
  { pfad: '/wissen-whatsapp', laden: () => import('./pages/WissenWhatsapp') },
  { pfad: '/adventskalender', laden: () => import('./pages/AdventLanding') },
  // '/1zu1-abkuerzung-dezember' wird seit 21.09.2026 nicht mehr vorgerendert: Die Seite
  // zeigte einen am 31.12.2025 abgelaufenen Countdown ("00 Tage") samt Aktionspreis.
  // Die Adresse leitet per _redirects auf /ki-1zu1.
  { pfad: '/termin-buchen', laden: () => import('./pages/BookingCalendar') },
  { pfad: '/events', laden: () => import('./pages/Events') },
  { pfad: '/spanien-ki-workshop', laden: () => import('./pages/SpanienRetreat') },
  { pfad: '/spanien-ki-workshop/danke', laden: () => import('./pages/SpanienBookingDanke') },
  { pfad: '/ki-workshop-unverwechselbar', laden: () => import('./pages/KIWorkshopUnverwechselbar') },
  { pfad: '/ki-workshop-unverwechselbar/danke', laden: () => import('./pages/KIWorkshopUnverwechselbarDanke') },
  { pfad: '/blog', laden: () => import('./pages/Blog') },
  { pfad: '/blog-ki', laden: () => import('./pages/BlogKI') },
  { pfad: '/blog-wirkung', laden: () => import('./pages/BlogWirkung') },
  { pfad: '/blog-neuro', laden: () => import('./pages/BlogNeuro') },
  { pfad: '/ueber-mich', laden: () => import('./pages/UeberMich') },
  { pfad: '/impressum', laden: () => import('./pages/Impressum') },
  { pfad: '/datenschutz', laden: () => import('./pages/Datenschutz') },
  { pfad: '/agb', laden: () => import('./pages/AGB') },
  { pfad: '/von-schatten-zu-licht', laden: () => import('./pages/VonSchattenZuLicht') },
  { pfad: '/buchprojekt', laden: () => import('./pages/Buchprojekt') },
  { pfad: '/generatoren', laden: () => import('./pages/Generatoren') },
  { pfad: '/workbook-generator', laden: () => import('./pages/WorkbookGenerator') },
  { pfad: '/quiz-generator', laden: () => import('./pages/QuizGenerator') },
  { pfad: '/wirkungskraft-quiz', laden: () => import('./pages/WirkungskraftQuiz') },
  { pfad: '/karussell-generator', laden: () => import('./pages/KarussellGenerator') },
];

export type SeoPaket = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
};

/**
 * Rechnet EINE Seite aus. Gibt den Rumpf und die Kopfangaben zurueck.
 * Wirft, wenn die Seite sich nicht rendern laesst - das Aufrufskript faengt
 * das ab und laesst die Seite dann einfach wie bisher laufen.
 */
export async function rendern(pfad: string) {
  const eintrag = SEITEN.find((s) => s.pfad === pfad);
  if (!eintrag) throw new Error(`unbekannte Adresse ${pfad}`);

  const mod = await eintrag.laden();
  const Seite = mod.default;
  if (!Seite) throw new Error('kein Standard-Export');

  const roh = renderToStaticMarkup(
    React.createElement(
      StaticRouter as any,
      { location: pfad },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Seite),
        // Die Uebersicht muss mit in die Datei. Ohne sie hat die
        // Startseite null interne Verweise und ein Suchprogramm kommt
        // von dort nirgendwo hin.
        React.createElement(Seitenuebersicht)
      )
    )
  );

  // Das Paket, das die SEO-Komponente mitrendert, herausloesen. Im Browser
  // ist es ein inertes Element; in der fertigen Datei werden daraus echte
  // Kopfzeilen, deshalb hat es im Rumpf nichts verloren.
  const muster = /<script type="application\/json" data-cc-seo="">([\s\S]*?)<\/script>/;
  const treffer = roh.match(muster);
  let seo: SeoPaket = {};
  if (treffer) {
    try {
      seo = JSON.parse(treffer[1]);
    } catch {
      // Ein kaputtes Paket ist kein Grund, die Seite nicht auszuliefern.
    }
  }
  const markup = treffer ? roh.replace(muster, '') : roh;

  const text = markup
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return { markup, seo, textLaenge: text.length };
}
