import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie laeuft eine freie Trauung ab?"
 *
 * Aus der Fragenerhebung vom 21.09.2026: "freie trauung was ist das", "wie
 * laeuft freie trauung ab", "wie lange freie trauung", "freie trauung
 * rechtskraeftig", "freie trauung ohne standesamt". Das Wort "Standesamt" kam
 * bis dahin auf der gesamten Seite nicht vor.
 *
 * RECHTLICHES: Nur die Aussage, die im Gesetz steht - eine Ehe wird in
 * Deutschland vor dem Standesamt geschlossen (Paragraf 1310 BGB). Keine
 * Rechtsberatung, keine Sonderfaelle. Seit 2009 darf eine Zeremonie auch ohne
 * vorherige standesamtliche Eheschliessung stattfinden - rechtlich verheiratet
 * ist man dadurch nicht.
 *
 * ZAHLEN: Dauer als Faustwert ("etwa"), Honorarspanne WORTGLEICH von
 * /freie-trauung (Hochzeitsrednerin.tsx), Vorlauf ebenfalls von dort.
 * Anrede wie auf /freie-trauung: ihr.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/freie-trauung-ablauf',
  bereich: 'Hochzeit & freie Trauung',
  aktualisiert: '2026-09-21',
  frage: 'Wie läuft eine freie Trauung ab?',

  kurzantwort:
    'Eine freie Trauung dauert meist etwa 30 bis 45 Minuten und folgt einem einfachen Bogen: Einzug, Begrüßung, eure Geschichte, ein Ritual, euer Versprechen mit Ja-Wort und Ringen, Auszug. Sie ist eine Hochzeitszeremonie ohne Kirche und ohne Standesamt, gestaltet von einer freien Rednerin oder einem freien Redner. Rechtlich verheiratet seid ihr dadurch nicht. Die Ehe wird in Deutschland nur vor dem Standesamt geschlossen. Viele Paare gehen deshalb vorher oder nachher im kleinen Kreis zum Standesamt und feiern die freie Trauung als ihr eigentliches Fest.',

  vorspann:
    'Eine freie Trauung hat keine vorgeschriebene Form. Das ist ihre Stärke und der Grund, warum viele Paare zuerst nicht wissen, wo sie anfangen sollen. Der Ablauf unten ist kein Muss, sondern das Gerüst, das sich bewährt hat.',

  motiv: 'Später hier: Trauung im Freien von hinten über die Stuhlreihen fotografiert, Paar vorn klein, viel Licht. Keine erkennbaren Gesichter.',

  abschnitte: [
    {
      titel: 'Was eine freie Trauung ist',
      absaetze: [
        'Eine freie Trauung ist eine Zeremonie, die allein euch gehört. Kein Amt und keine Kirche geben vor, was gesagt wird, wo sie stattfindet und wer mitwirkt. Eine freie Rednerin lernt euch vorher kennen und erzählt in der Zeremonie eure Geschichte: wie ihr euch gefunden habt, was euch ausmacht, was ihr einander versprecht.',
        'Sie passt für Paare ohne Konfession, für Paare mit zwei verschiedenen Glaubensrichtungen, für Paare, die schon standesamtlich verheiratet sind und ihr Fest nachholen, und für alle, die woanders als in einer Kirche feiern möchten.',
      ],
    },
    {
      titel: 'Ist eine freie Trauung rechtsgültig?',
      absaetze: [
        'Nein. In Deutschland wird eine Ehe nur dadurch geschlossen, dass beide vor der Standesbeamtin oder dem Standesbeamten erklären, die Ehe miteinander eingehen zu wollen. So steht es im Bürgerlichen Gesetzbuch. Eine freie Trauung hat keine rechtliche Wirkung, auch nicht mit Ringen, Unterschrift und Urkunde.',
        'Ihr dürft die freie Trauung feiern, ohne vorher beim Standesamt gewesen zu sein. Verheiratet im Sinne des Gesetzes seid ihr dann aber nicht, mit allem, was daran hängt: Name, Steuer, Erbrecht. Wer das möchte, braucht den Termin beim Standesamt. Viele Paare erledigen ihn ein paar Tage vorher zu zweit oder mit den Trauzeugen und behalten das große Ja für die freie Trauung.',
      ],
    },
    {
      titel: 'Der Ablauf, Schritt für Schritt',
      absaetze: [
        'Einzug. Die Gäste sitzen, Musik beginnt, ihr kommt gemeinsam oder nacheinander. Wer wen begleitet, entscheidet ihr. Es gibt keine Regel, die jemand verletzen könnte.',
        'Begrüßung. Die Rednerin heißt alle willkommen und sagt, warum dieser Tag an diesem Ort stattfindet. Das dauert zwei, drei Minuten und nimmt allen die Anspannung.',
        'Eure Geschichte. Der längste Teil und der, an den sich die Gäste erinnern. Keine Aufzählung von Jahreszahlen, sondern die Begebenheiten, in denen man euch erkennt.',
        'Ein Ritual, wenn ihr eines wollt: eine Kerze, Sand aus zwei Gefäßen, Bänder, ein Baum, Wünsche der Gäste. Ein Ritual trägt nur, wenn es etwas mit euch zu tun hat. Eines reicht.',
        'Euer Versprechen. Ihr sprecht selbst oder antwortet auf Fragen der Rednerin. Dann das Ja-Wort, die Ringe, der Kuss.',
        'Auszug. Musik, ihr geht zuerst, die Gäste folgen. Danach ist Zeit für Glückwünsche, und das Fest beginnt.',
      ],
    },
    {
      titel: 'Wie lange eine freie Trauung dauert',
      absaetze: [
        'Meist etwa 30 bis 45 Minuten. Kürzer wirkt gehetzt, deutlich länger wird für Gäste anstrengend, vor allem im Stehen, in der Sonne oder mit kleinen Kindern. Musikstücke und Beiträge von Gästen zählen mit. Drei Lieder in voller Länge sind schon gut zehn Minuten.',
        'Plant rund um die Zeremonie Luft ein: eine Viertelstunde, bis alle sitzen, und danach mindestens eine halbe Stunde für Glückwünsche, bevor Fotos oder Essen anstehen.',
      ],
    },
    {
      titel: 'Wo sie stattfinden kann',
      absaetze: [
        'Überall, wo ihr feiern dürft: im Garten, am See, im Wald, in einer Scheune, im Saal eures Festes. Drei Dinge entscheiden draußen über das Gelingen. Man muss euch hören, also braucht es draußen fast immer ein Mikrofon, sonst kommt schon in der dritten Reihe wenig an. Es braucht Schatten oder einen Plan für Regen. Und die Gäste sollten sitzen können.',
      ],
    },
    {
      titel: 'Was ihr vorher mit der Rednerin klärt',
      absaetze: [
        'Ein gutes Vorgespräch ist der eigentliche Anfang der Zeremonie. Ihr erzählt, die Rednerin fragt nach, und aus dem Gespräch entsteht die Rede. Klärt dabei auch das Praktische: wer Musik und Technik stellt, ob Gäste mitwirken, was auf keinen Fall vorkommen soll, und ob ihr die Rede vorher lesen könnt. Bei mir bekommt ihr sie vorab.',
        'Für Samstage zwischen Mai und September sind zwölf bis achtzehn Monate Vorlauf üblich. Kurzfristig geht öfter, als man denkt, weil Termine auch frei werden.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Was ist eine freie Trauung?',
      antwort:
        'Eine freie Trauung ist eine Hochzeitszeremonie ohne Kirche und ohne Standesamt, gestaltet von einer freien Rednerin oder einem freien Redner. Ort, Ablauf und Inhalt bestimmt das Paar selbst. Rechtlich hat sie keine Wirkung.',
    },
    {
      frage: 'Ist eine freie Trauung rechtskräftig?',
      antwort:
        'Nein. In Deutschland wird die Ehe nur vor dem Standesamt geschlossen. Eine freie Trauung ist ein Fest und ein Versprechen, aber keine Eheschließung im Sinne des Gesetzes.',
    },
    {
      frage: 'Kann man eine freie Trauung ohne Standesamt machen?',
      antwort:
        'Ja, feiern dürft ihr sie auch ohne Standesamt. Verheiratet im rechtlichen Sinn seid ihr dann aber nicht. Wer Name, Steuer und Erbrecht als Ehepaar möchte, braucht zusätzlich den Termin beim Standesamt, vorher oder nachher.',
    },
    {
      frage: 'Wie lange dauert eine freie Trauung?',
      antwort:
        'Meist etwa 30 bis 45 Minuten, Musik und Beiträge von Gästen eingerechnet. Plant davor eine Viertelstunde ein, bis alle sitzen, und danach mindestens eine halbe Stunde für Glückwünsche.',
    },
    {
      frage: 'Was kostet eine freie Rednerin für die Hochzeit?',
      antwort:
        'Der Durchschnitt liegt in Deutschland bei rund 1.000 Euro je Trauung, erfahrene Rednerinnen liegen zwischen 1.100 und 1.600 Euro, die gesamte Spanne reicht von etwa 800 bis 2.500. Dahinter stecken das Vorgespräch, das Schreiben der Rede, die Anfahrt und die Zeremonie selbst.',
    },
    {
      frage: 'Dürfen Familie und Freunde mitwirken?',
      antwort:
        'Ja. Eine Lesung, ein Lied, ein Wunsch der Trauzeugen oder das Halten der Ringe. Sprecht es vorher mit der Rednerin ab, damit die Zeremonie nicht zu lang wird und jeder weiß, wann er dran ist.',
    },
  ],

  weiter: {
    text: 'Wenn ihr eine Rednerin sucht: Schreibt mir, wann und wo ihr feiert. Ich begleite freie Trauungen im Ruhrgebiet, weitere Wege nach Absprache.',
    knopf: 'Zur Seite freie Trauung',
    ziel: '/freie-trauung',
  },

  seoText:
    'Freie Trauung: Ablauf Schritt für Schritt, Dauer etwa 30 bis 45 Minuten, warum sie rechtlich keine Ehe schließt und wie Paare Standesamt und Zeremonie verbinden.',
};

export default function ArtikelFreieTrauung() {
  return <ArtikelSeite inhalt={INHALT} />;
}
