import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Wissen to go - die Übersicht über alles Kostenlose.
 *
 * Diese Seite ist das Ziel der Übersichtszeile im Menü ("Wissen to go —
 * alles im Überblick"). Vorher stand hier ein Werbetext über
 * "wertvollen Content aufs Smartphone" und drei Kacheln ohne Verweise.
 * Wer daraufklickte, kam nirgendwo hin.
 *
 * Jetzt steht hier, was es WIRKLICH gibt, mit Verweis und mit dem, was
 * man dafür hergeben muss - denn "kostenlos" heißt bei den meisten
 * Anbietern "gegen deine E-Mail-Adresse", und das gehört dazugesagt.
 *
 * KEINE ZAHLEN zu Hörerzahlen, Abonnenten oder Downloads. Die kenne ich
 * nicht, und eine geschätzte wäre eine erfundene.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/wissen-to-go',
  wer: 'Kostenlos',
  frage: 'Was gibt es hier umsonst — und was kostet es wirklich?',
  vorspann:
    'Die zweite Frage stellt selten jemand, und sie ist die wichtigere. Bei den meisten Anbietern heißt „kostenlos" gegen deine E-Mail-Adresse. Hier steht bei jedem Angebot, was du dafür hergibst: manchmal nichts, manchmal deine Adresse, einmal eine Anmeldung.',

  problemTitel: 'Warum es diese Seite gibt',
  problemAbsaetze: [
    'Über die Jahre sind viele kostenlose Sachen entstanden: Artikel, Werkzeuge, Webinare, Audioimpulse. Sie lagen an verschiedenen Stellen, und niemand hatte einen Überblick.',
    'Diese Seite ist der Überblick. Sie nennt alles beim Namen, sagt, was dahintersteckt, und wo eine Anmeldung nötig ist.',
    'Wenn du nur eines mitnehmen willst: die Wissensbibliothek. Dort stehen die Artikel, sie sind lang, und sie brauchen nichts von dir.',
  ],

  angebotName: 'Was dich nichts kostet',
  angebotZeile: 'Alles auf dieser Liste ist ohne Bezahlung zugänglich',
  angebotPreis: 'Kostenlos',
  angebotPreisHinweis:
    'Wo eine E-Mail-Adresse oder eine Anmeldung nötig ist, steht es unten ausdrücklich dabei.',
  angebotPunkte: [
    'Wissensbibliothek — Artikel zu Stimme, Auftritt, Reden und Wirkung. Ohne Anmeldung lesbar.',
    'Neun ausführliche Antworten auf die Fragen, die am häufigsten gestellt werden — je ein eigener Artikel.',
    'Wirkungskraft-Werkzeuge — kleine Helfer zum Ausprobieren, direkt im Browser.',
    'Gratis-Webinare — live, mit der Möglichkeit, Fragen zu stellen. Dafür ist eine Anmeldung nötig.',
    'Telegram-Audioimpulse — kurze gesprochene Gedanken. Du brauchst Telegram, sonst nichts.',
    'Die Community — Austausch mit anderen, die am selben arbeiten.',
    'Der Adventskalender — vierundzwanzig Türchen im Dezember.',
  ],

  ablaufTitel: 'Womit anfangen',
  ablauf: [
    { schritt: 'Wenn Sie lesen wollen', text: 'Die Wissensbibliothek. Die Artikel sind ausführlich, nicht angerissen — und sie verlangen keine Adresse.' },
    { schritt: 'Wenn Sie eine konkrete Frage haben', text: 'Die neun Antwortseiten: Keynote aufbauen, Thema finden, Lampenfieber, Sprechpausen, Stimme trainieren, Charisma, Vier-Ohren-Modell, Speakerhonorare, den passenden Speaker finden.' },
    { schritt: 'Wenn Sie etwas tun wollen', text: 'Die Wirkungskraft-Werkzeuge. Ausprobieren dauert Minuten und sagt mehr als eine Stunde Lesen.' },
    { schritt: 'Wenn Sie Fragen stellen wollen', text: 'Ein Gratis-Webinar. Dort geht es hin und her, und Sie hören, wie andere dieselbe Frage anders stellen.' },
    { schritt: 'Wenn Sie dranbleiben wollen', text: 'Telegram oder die Community. Beides ist regelmäßig, beides ohne Verpflichtung.' },
  ],

  fragen: [
    {
      frage: 'Ist das wirklich kostenlos, oder ist es Werbung?',
      antwort:
        'Es ist beides. Die Inhalte sind vollständig und nicht abgeschnitten — es steht nirgends „mehr dazu im Kurs". Und natürlich hofft Claudia Conen, dass jemand, dem das hilft, irgendwann etwas bucht. Beides gleichzeitig zu sagen ist ehrlicher, als eines davon zu verschweigen.',
    },
    {
      frage: 'Wofür brauche ich eine E-Mail-Adresse?',
      antwort:
        'Für die Webinare, weil Sie sonst den Zugangslink nicht bekommen. Für die Artikel in der Wissensbibliothek nicht, für die Werkzeuge nicht, für Telegram nicht.',
    },
    {
      frage: 'Wie lang sind die Artikel?',
      antwort:
        'Die neun Antwortseiten haben je zwischen fünf und zehn Minuten Lesezeit und beantworten die Frage im ersten Absatz — der Rest ist Begründung und Beispiel. Wer nur die Antwort will, liest drei Sätze und ist fertig.',
    },
    {
      frage: 'Steht in den Artikeln das Übliche über Körpersprache und Millisekunden?',
      antwort:
        'Nein, und das ist Absicht. Zahlen wie „93 Prozent Körpersprache" oder „in 180 Millisekunden entscheidet sich Vertrauen" kursieren in der Branche und lassen sich nicht belegen. Sie wurden im September 2026 von dieser Seite entfernt. Wo eine Spanne belegbar ist, steht sie als Spanne.',
    },
    {
      frage: 'Kann ich die Sachen weitergeben?',
      antwort:
        'Die Artikel gern verlinken — das hilft beiden Seiten. Die Werkzeuge und Downloads sind für den eigenen Gebrauch gedacht; wenn Sie damit in Ihrer Firma arbeiten wollen, fragen Sie kurz, dann wird es meistens ein Ja.',
    },
    {
      frage: 'Wie oft kommt etwas Neues?',
      antwort:
        'Unregelmäßig. Es gibt keinen Redaktionsplan, den ich hier versprechen kann, und ein Versprechen, das nicht gehalten wird, ist schlechter als keines. Wer nichts verpassen will, nimmt Telegram oder den Newsletter.',
    },
  ],

  schrittTitel: 'Der einfachste Anfang',
  schrittText:
    'Die Wissensbibliothek. Keine Anmeldung, kein Newsletter, nichts einzugeben — einfach lesen.',
  schrittKnopf: 'Zur Wissensbibliothek',
  schrittZiel: '/wissensbibliothek',

  brotkrumen: [{ name: 'Wissen', ziel: '/wissensbibliothek' }, { name: 'Wissen to go' }],
  stimmung: 'hell',

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Telefon in der Hand, Kopfhörer, unterwegs — ohne Gesicht' },
    { bereich: 'Beim Überblick', motiv: 'Aufgeschlagenes Notizbuch mit handschriftlichen Notizen' },
  ],

  weitere: [
    { titel: 'Wissensbibliothek', text: 'Alle Artikel, ohne Anmeldung lesbar.', ziel: '/wissensbibliothek' },
    { titel: 'Wirkungskraft-Werkzeuge', text: 'Zum Ausprobieren, direkt im Browser.', ziel: '/generatoren' },
    { titel: 'Gratis-Webinar', text: 'Live dabei sein und Fragen stellen.', ziel: '/wissen-webinare' },
    { titel: 'Telegram-Audioimpulse', text: 'Kurze gesprochene Gedanken.', ziel: '/wissen-telegram' },
    { titel: 'Community', text: 'Austausch mit anderen.', ziel: '/wissen-community' },
    { titel: 'Adventskalender', text: 'Vierundzwanzig Türchen im Dezember.', ziel: '/adventskalender' },
  ],

  // Kopfbild (22.09.2026): Claudia Conen mit einem Gehirnmodell in der Hand
  bild: '/seiten/gehirn.webp',
  bildAlt: 'Claudia Conen mit einem Gehirnmodell in der Hand',

  seoTitel: 'Kostenlos: Artikel, Werkzeuge und Webinare | Claudia Conen',
  seoText:
    'Was es bei Claudia Conen umsonst gibt — und was es wirklich kostet. Wissensbibliothek und Werkzeuge ohne Anmeldung, Webinare mit. Bei jedem Angebot steht dabei, was Sie dafür hergeben.',
};

export default function WissenToGo() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
