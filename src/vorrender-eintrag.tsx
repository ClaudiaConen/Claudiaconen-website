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
import React from 'react';

/** Adresse -> Seite. Von Hand gepflegt, weil App.tsx die Zuordnung nur
 *  innerhalb von JSX kennt. Fehlt eine Seite hier, verhaelt sie sich wie
 *  bisher: leere Huelle, Inhalt erst per JavaScript. */
export const SEITEN: { pfad: string; laden: () => Promise<any> }[] = [
  { pfad: '/', laden: () => import('./pages/Home') },
  { pfad: '/ueber-mich', laden: () => import('./pages/UeberMich') },
  { pfad: '/hoeren', laden: () => import('./pages/Hoeren') },
  { pfad: '/unverwechselbare', laden: () => import('./pages/Unverwechselbare') },

  { pfad: '/freie-rednerin', laden: () => import('./pages/FreieRednerin') },
  { pfad: '/trauerrede', laden: () => import('./pages/Trauerrednerin') },
  { pfad: '/freie-trauung', laden: () => import('./pages/Hochzeitsrednerin') },

  { pfad: '/speaker-ausbildung', laden: () => import('./pages/SpeakerAusbildung') },
  { pfad: '/freie-redner-ausbildung', laden: () => import('./pages/FreieRednerAusbildung') },
  { pfad: '/trauerredner-ausbildung', laden: () => import('./pages/TrauerrednerAusbildung') },
  { pfad: '/hochzeitsredner-ausbildung', laden: () => import('./pages/HochzeitsrednerAusbildung') },
  { pfad: '/elevator-pitch-kurs', laden: () => import('./pages/ElevatorPitchKurs') },
  { pfad: '/storytelling-kurs', laden: () => import('./pages/StorytellingKurs') },
  { pfad: '/redner-ausbildungen', laden: () => import('./pages/RednerAusbildungen') },
  { pfad: '/unternehmen-keynotes', laden: () => import('./pages/UnternehmenKeynotes') },

  { pfad: '/wissen/was-kostet-ein-keynote-speaker', laden: () => import('./pages/ArtikelKeynotePreis') },
  { pfad: '/wissen/keynote-speaker-finden', laden: () => import('./pages/ArtikelSpeakerFinden') },
  { pfad: '/wissen/stimme-trainieren', laden: () => import('./pages/ArtikelStimmeTrainieren') },
  { pfad: '/wissen/lampenfieber', laden: () => import('./pages/ArtikelLampenfieber') },
  { pfad: '/wissen/keynote-aufbauen', laden: () => import('./pages/ArtikelKeynoteAufbauen') },
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
      React.createElement(Seite)
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
