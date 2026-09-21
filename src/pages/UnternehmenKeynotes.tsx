import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 1: Unternehmen und Teams. Die Seite, auf der Claudias Umsatz entsteht.
 *
 * Claudias Auftrag vom 19.09.2026: vollstaendig ausarbeiten, damit sie von
 * Menschen UND von KI-Systemen als Expertin gefunden wird. Ausdruecklich
 * gewuenscht: recherchieren, wofuer Unternehmen ueberhaupt Redner buchen,
 * und besonders das Thema Mensch und KI im Unternehmen.
 *
 * DIE LEITFRAGE ist deshalb bewusst nicht "Wie wird aus Kommunikation
 * Vertrauen". Das ist Claudias Sprache, nicht die des Einkaeufers. Ein
 * Personalleiter sucht nicht nach Vertrauen, er sucht nach einer Loesung
 * fuer ein Problem, das er benennen kann - und im Herbst 2026 lautet das
 * haeufigste: Wir haben KI eingefuehrt, und die Leute nutzen sie nicht.
 *
 * DIE ZAHLEN SIND BELEGT. Nach zwei Tagen, in denen von dieser Webseite
 * erfundene Zahlen entfernt wurden, ist das der Gegenentwurf: Jede Zahl
 * hier stammt aus der Pronova-BKK-Studie "Arbeiten 2025" (1.230 befragte
 * Arbeitnehmerinnen und Arbeitnehmer, Oktober 2025) und ist mit einem Link
 * zur Quelle versehen. Genau diese Sorte Einheit uebernehmen KI-Systeme.
 *
 * DIE ANLAESSE stammen aus der Recherche vom selben Tag. Sie beantworten
 * die Frage, die Einkaeufer tatsaechlich eingeben - "wofuer braucht man
 * einen Redner" - und fuer die es im deutschen Netz kaum gute Antworten
 * gibt.
 *
 * PREIS: Am 21.09.2026 entfernt. Die 3.900 Euro "standen bereits live" - aber
 * nur, weil Vinci sie am 18.09.2026 selbst dorthin geschrieben hatte (Commit
 * fbdffa0), aus einem Entwurfswert. Vorher standen sie nie auf der Seite. In Claudias eigenem Produktdokument steht fuer Firmen
 * allerdings "auf Anfrage". Sie wurde darauf hingewiesen; die Entscheidung
 * gehoert ihr.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/unternehmen-keynotes',
  stimmung: 'dunkel',
  wer: 'Unternehmen & Teams',
  welle: true,
  frage: 'Sie haben KI eingeführt. Warum benutzt sie kaum jemand?',
  vorspann:
    'Weil die Technik das kleinere Problem ist. Werkzeuge lassen sich ausrollen. Vertrauen nicht — und ohne Vertrauen rührt niemand freiwillig etwas an, das seinen Arbeitsplatz kosten könnte.',

  problemTitel: 'Was in Unternehmen wirklich passiert, wenn KI kommt',
  problemAbsaetze: [
    'Die Einführung läuft. Lizenzen sind gekauft, eine Schulung hat stattgefunden, ein Leitfaden liegt im Intranet. Und trotzdem arbeitet die Hälfte der Belegschaft weiter wie vorher.',
    'Der Grund wird selten ausgesprochen, weil ihn niemand aussprechen will: Wer ein Werkzeug benutzt, das seine eigene Arbeit überflüssig machen könnte, tut das nicht aus Neugier. Er tut es, wenn er weiß, was aus ihm wird. Diese Frage beantwortet kein Werkzeug und kein Leitfaden.',
    'Dazu kommt ein zweiter, leiserer Effekt: Je mehr Texte, Präsentationen und Mails erzeugt statt geschrieben werden, desto gleichförmiger klingt das Unternehmen nach außen. Und desto schwerer wird es, dass jemand einem Menschen darin glaubt.',
    'Beides ist kein Technikproblem. Beides ist ein Kommunikationsproblem — und es wird als Technikproblem behandelt.',
  ],

  belegeTitel: 'Was Beschäftigte wirklich über KI sagen',
  belegeVorspann:
    'Alle Zahlen aus der Studie „Arbeiten 2025" der Pronova BKK: 1.230 befragte Arbeitnehmerinnen und Arbeitnehmer ab 18 Jahren, Online-Befragung im Oktober 2025. Jede Zahl ist verlinkt und nachprüfbar.',
  belege: [
    {
      zahl: '40 %',
      aussage: 'nutzen KI-Werkzeuge regelmäßig. Die anderen sechzig Prozent sitzen in denselben Besprechungen.',
      quelle: 'Pronova BKK, Arbeiten 2025',
      url: 'https://www.pronovabkk.de/unternehmen/presse/pressemitteilungen/pressemitteilungen-2026/zukunftsangst-durch-ki-am-arbeitsplatz.html',
    },
    {
      zahl: 'fast 50 %',
      aussage: 'befürchten, dass KI den eigenen Arbeitsplatz überflüssig macht. Das ist die Zahl, die jede Einführung bremst.',
      quelle: 'Pronova BKK, Arbeiten 2025',
      url: 'https://www.pronovabkk.de/unternehmen/presse/pressemitteilungen/pressemitteilungen-2026/zukunftsangst-durch-ki-am-arbeitsplatz.html',
    },
    {
      zahl: '2 von 3',
      aussage: 'KI-Nutzenden berichten von mehr Aufwand fürs Prüfen und Korrigieren. Die versprochene Zeitersparnis kommt nicht überall an.',
      quelle: 'Pronova BKK, Arbeiten 2025',
      url: 'https://www.pronovabkk.de/unternehmen/presse/pressemitteilungen/pressemitteilungen-2026/zukunftsangst-durch-ki-am-arbeitsplatz.html',
    },
    {
      zahl: '6 von 10',
      aussage: 'unter Dreißigjährigen sorgen sich um ihren Job. Ausgerechnet die Generation, von der Sie sich den schnellsten Umstieg erhoffen.',
      quelle: 'Pronova BKK, Arbeiten 2025',
      url: 'https://www.pronovabkk.de/unternehmen/presse/pressemitteilungen/pressemitteilungen-2026/zukunftsangst-durch-ki-am-arbeitsplatz.html',
    },
  ],

  anlaesseTitel: 'Wofür Unternehmen mich buchen',
  anlaesseVorspann:
    'Nicht jeder Anlass braucht dieselbe Rede. Was sich unterscheidet, ist nicht das Thema — sondern was danach passieren soll.',
  anlaesse: [
    {
      titel: 'Betriebs- und Mitarbeiterversammlung',
      text: 'Wenn etwas Unbequemes zu sagen ist: Umbau, Standortfrage, neue Richtung. Eine Versammlung entscheidet nicht, ob die Botschaft ankommt — sie entscheidet, ob man Ihnen danach noch glaubt.',
    },
    {
      titel: 'Führungskräftetagung',
      text: 'Führungskräfte müssen die Veränderung tragen, die sie selbst nicht beschlossen haben. Hier geht es darum, wie sie das sagen, ohne auswendig gelernt zu klingen.',
    },
    {
      titel: 'Kick-off und Jahresauftakt',
      text: 'Der Ton für zwölf Monate wird in neunzig Minuten gesetzt. Danach ist er schwer zu korrigieren.',
    },
    {
      titel: 'KI-Einführung und Digitalprojekte',
      text: 'Der häufigste Anlass im Moment. Eine Einführung scheitert selten an der Software und fast immer daran, dass niemand die Angst benannt hat, die im Raum steht.',
    },
    {
      titel: 'Kundenveranstaltung und Roadshow',
      text: 'Ihre Kunden haben heute dieselben Werkzeuge wie Sie. Der Unterschied ist der Mensch, der vorne steht — und ob man ihm abnimmt, was er sagt.',
    },
    {
      titel: 'Firmenjubiläum',
      text: 'Rückblick und Ausblick in einer Rede, ohne dass es nach Festschrift klingt. Das ist Handwerk, keine Frage des Anlasses.',
    },
    {
      titel: 'Vertrieb und Kundengespräch',
      text: 'Wenn Ihre Leute fachlich stark sind und trotzdem verlieren, liegt es selten am Angebot. Es liegt daran, wie es klingt, wenn sie es erklären.',
    },
    {
      titel: 'Messe, Kongress, Podium',
      text: 'Dreißig Minuten, in denen ein Saal entscheidet, ob er sich Ihren Namen merkt.',
    },
  ],

  angebotName: 'Ein Tag im Haus',
  angebotZeile:
    'Keynote am Vormittag für alle, Arbeit am Nachmittag mit denen, die danach sprechen müssen. Ein Tag, ein Raum, ein Ergebnis — kein Programm über Monate.',
  angebotPreis: 'Honorar im Vorgespräch',
  angebotPreisHinweis:
    'Es hängt von Dauer, Ort und Vorbereitung ab. Zur Einordnung: Im deutschen Markt liegen etablierte Fachrednerinnen zwischen 3.000 und 8.000 Euro je Vortrag.',
  angebotPunkte: [
    'Vorgespräch mit Ihnen: Was ist die eigentliche Lage, und was darf ich ansprechen?',
    'Keynote für die gesamte Mannschaft, auf Ihre Situation zugeschnitten',
    'Nachmittag in kleiner Gruppe: die Menschen, die die Botschaft weitertragen müssen',
    'Jede und jeder spricht, wird aufgenommen und bekommt Rückmeldung',
    'Eine Seite Zusammenfassung für Sie: was im Raum wirklich Thema war',
    'Auf Wunsch ein Nachgespräch nach sechs Wochen',
  ],

  ablaufTitel: 'Wie ein Tag im Haus abläuft',
  ablauf: [
    {
      schritt: 'Das Vorgespräch',
      text:
        'Zwanzig Minuten mit Ihnen, kostenlos. Ich frage nach dem, was nicht in der Ausschreibung steht: Was ist vorgefallen? Wer im Raum ist dagegen? Was darf ich sagen, was nicht?',
    },
    {
      schritt: 'Die Keynote',
      text:
        'Sechzig bis neunzig Minuten für alle. Keine Standardrede mit Ihrem Logo darauf — sondern Ihre Lage, Ihre Beispiele, Ihre Sprache.',
    },
    {
      schritt: 'Der Nachmittag',
      text:
        'Kleine Gruppe, höchstens zwölf Menschen. Hier wird gesprochen, nicht zugehört. Jeder bekommt Rückmeldung — konkret, nicht nett.',
    },
    {
      schritt: 'Danach',
      text:
        'Sie bekommen eine Seite: was im Raum Thema war, wo es hakt, was ich an Ihrer Stelle als Nächstes täte. Kein Foliensatz, eine Seite.',
    },
  ],

  bilder: [
    {
      bereich: 'Keynote',
      motiv: 'Querformat, Bühne, Publikum im Bild. Ein Saal zeigt eine gebuchte Rednerin, ein Porträt zeigt nur eine Rednerin.',
    },
    {
      bereich: 'Nachmittag im Haus',
      motiv: 'Kleine Gruppe, im Gespräch, nicht gestellt. Zeigt, dass am Nachmittag gearbeitet wird und nicht zugehört.',
    },
    {
      bereich: 'Video',
      motiv: 'Mitschnitt einer echten Keynote, zwei bis drei Minuten. Ohne Video ist jede Anfrage schwerer.',
    },
  ],

  nichtFuer: [
    'Sie brauchen eine Schulung für ein bestimmtes Werkzeug. Dann empfehle ich Ihnen jemanden — ich arbeite an Kommunikation, nicht an Software.',
    'Es soll nach der Veranstaltung erledigt sein. Ein Tag verändert, wie gesprochen wird, nicht die Struktur, die das Schweigen erzeugt hat.',
    'Die eigentliche Lage darf nicht angesprochen werden. Wenn ich im Vorgespräch nicht erfahre, was wirklich los ist, halte ich einen freundlichen Vortrag — und der wirkt nicht.',
  ],

  brotkrumen: [
    { name: 'Für Unternehmen' },
  ],

  fragen: [
    {
      frage: 'Ist das ein KI-Training?',
      antwort:
        'Nein. Es geht nicht um Werkzeuge, Prompts oder Software. Es geht darum, dass Menschen KI erst dann benutzen, wenn sie wissen, was aus ihnen wird — und das ist eine Frage der Kommunikation, nicht der Schulung. Wenn Sie ein Werkzeugtraining brauchen, sagen Sie es; dann empfehle ich Ihnen jemanden.',
    },
    {
      frage: 'Wir brauchen eher eine Keynote als einen Workshop. Geht das auch?',
      antwort:
        'Ja. Die Keynote gibt es einzeln, sechzig bis neunzig Minuten, mit eigenem Honorar. Der Workshop am Nachmittag ist das, was den Unterschied hält — aber er ist nicht Bedingung.',
    },
    {
      frage: 'Funktioniert das auch bei Menschen, die keine Lust darauf haben?',
      antwort:
        'Das ist der Normalfall, nicht die Ausnahme. Wer in eine Pflichtveranstaltung geht, ist erst einmal dagegen. Deshalb fange ich nicht mit Motivation an, sondern mit dem, was im Raum ohnehin gedacht wird. Wer sich ernst genommen fühlt, hört zu.',
    },
    {
      frage: 'Wie viele Personen können teilnehmen?',
      antwort:
        'Die Keynote hat keine Obergrenze — ich habe vor Sälen gesprochen und vor elf Menschen. Der Nachmittag liegt bei höchstens zwölf, weil jeder mehrfach dran sein muss.',
    },
    {
      frage: 'Wie kurzfristig geht das?',
      antwort:
        'Kurzfristiger, als die meisten denken. Fragen Sie einfach mit Ihrem Wunschtermin an. Wenn es nicht geht, sage ich es sofort statt Sie hinzuhalten.',
    },
    {
      frage: 'Was kostet eine Keynote bei Ihnen?',
      antwort:
        'Das Honorar nennen wir im Vorgespräch, weil es von Dauer, Ort und Vorbereitung abhängt. Zur Einordnung: Im deutschen Markt liegen etablierte Fachrednerinnen zwischen 3.000 und 8.000 Euro je Vortrag.',
    },
    {
      frage: 'Sprechen Sie auch online?',
      antwort:
        'Ja, und es ist etwas anderes als vor Ort — nicht schlechter, aber anders. Eine Kamera verzeiht weniger als ein Saal. Online-Formate haben ein eigenes Honorar.',
    },
    {
      frage: 'Was unterscheidet Sie von anderen Rednerinnen zu diesem Thema?',
      antwort:
        'Zwei Dinge, beide überprüfbar. Erstens siebenunddreißig Jahre Arbeit mit dem gesprochenen Wort statt einer Meinung zu KI. Zweitens: Ich bin ausgebildete KI-Managerin (IHK) — ich rede nicht über etwas, das ich selbst nicht benutze. Und ich arbeite weiter als freie Rednerin bei echten Anlässen, nicht nur auf Firmenbühnen. Wer nur noch unterrichtet, merkt nach zwei Jahren nicht mehr, was in einem Raum passiert.',
    },
  ],

  weitere: [
    {
      titel: 'Speakerin werden',
      text: 'Wenn jemand aus Ihrem Haus selbst auf die Bühne soll.',
      ziel: '/speaker-ausbildung',
    },
    {
      titel: 'Elevator-Pitch-Kurs',
      text: 'Für Vertrieb und Messe: der eine Satz, der sitzt.',
      ziel: '/elevator-pitch-kurs',
    },
    {
      titel: 'Storytelling-Kurs',
      text: 'Damit aus Zahlen etwas wird, das jemand weitererzählt.',
      ziel: '/storytelling-kurs',
    },
  ],

  schrittTitel: 'Sagen Sie mir, was bei Ihnen los ist',
  schrittText:
    'Zwanzig Minuten am Telefon, kostenlos und ohne Verpflichtung. Danach wissen Sie, ob ich die Richtige bin — und wenn nicht, sage ich Ihnen das und nenne Ihnen jemanden, der besser passt.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Keynote Speakerin für Unternehmen: Mensch und KI | Claudia Conen',
  seoText:
    'Keynote und Workshop für Unternehmen zum Thema Mensch und KI: warum Belegschaften KI nicht nutzen, was dagegen hilft und wie Botschaften ankommen. Mit belegten Zahlen.',
};

export default function UnternehmenKeynotes() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
