import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie wird man Keynote Speaker?"
 *
 * Aus der Fragenerhebung vom 21.09.2026: "wie wird man keynote speaker",
 * "wie kann ich speaker werden", "speaker werden voraussetzungen", dazu die
 * Definitionsfrage "was macht ein keynote speaker" / "keynote speaker was ist
 * das" - die stand auf der ganzen Seite nirgends.
 *
 * ZAHLEN: ausschliesslich die Marktspannen nach Erfahrungsstufe, die wortgleich
 * auf /speaker-ausbildung stehen. Der Preis-Artikel nennt fuer eine gebuchte
 * Keynote "meist 2.500 bis 10.000 Euro" - deshalb steht unten ein Brueckensatz. Keine neuen erfinden,
 * keine abweichenden nennen - zwei Seiten mit zwei Zahlen zur selben Frage
 * kosten mehr Vertrauen als eine Seite ohne Zahl.
 *
 * TON: Wer hier landet, traeumt oft von der grossen Buehne. Der Text ist
 * ehrlich ueber den Weg (erst kleine Saele, erst ohne Honorar), ohne jemandem
 * den Mut zu nehmen. Kein Versprechen, was jemand verdienen wird.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/keynote-speaker-werden',
  bereich: 'Bühne & Vortrag',
  aktualisiert: '2026-09-21',
  frage: 'Wie wird man Keynote Speaker?',

  kurzantwort:
    'Keynote Speaker wird man nicht durch einen Abschluss, sondern durch ein Thema, für das Veranstalter Sie buchen, und durch Auftritte, über die nachher gesprochen wird. Der Beruf ist nicht geschützt: Es gibt keine vorgeschriebene Ausbildung und kein Zertifikat, das man braucht. Der übliche Weg hat vier Schritte. Ein Thema finden, für das Sie nachweislich stehen. Daraus einen Vortrag von etwa 45 bis 60 Minuten bauen. Ihn vor kleinen Sälen so oft halten, bis er sitzt. Und eine gute Aufnahme davon haben, denn gebucht wird, wen man vorher sehen konnte.',

  vorspann:
    'Die meisten Menschen, die auf Bühnen stehen, haben nicht als Speaker angefangen. Sie waren Fachleute, Unternehmerinnen, Sportler, Ärztinnen – und hatten etwas erlebt oder verstanden, das andere hören wollten. Die Bühne kam danach.',

  motiv: 'Später hier: Blick von der Seitenbühne in einen mittelgroßen Saal, Rednerin von hinten, Publikum erkennbar.',

  abschnitte: [
    {
      titel: 'Was ein Keynote Speaker ist',
      absaetze: [
        'Ein Keynote Speaker hält den Hauptvortrag einer Veranstaltung: den einen Vortrag, der das Thema des Tages setzt und an den sich die Teilnehmenden nachher erinnern sollen. Das Wort kommt aus der Musik. Die „keynote" ist der Grundton einer Tonart, auf den sich alles bezieht.',
        'Das unterscheidet die Keynote vom Fachvortrag und vom Training. Ein Fachvortrag vermittelt Wissen, ein Training übt etwas ein. Eine Keynote soll eine Haltung verändern oder eine Richtung geben, und sie tut das in einer knappen Stunde vor Menschen, die sich den Redner nicht ausgesucht haben.',
      ],
    },
    {
      titel: 'Braucht man eine Ausbildung?',
      absaetze: [
        'Nein. Der Beruf ist nicht geschützt, es gibt keine gesetzliche Voraussetzung und keinen Titel, den jemand vergeben müsste. Ein Zertifikat verlangt bei diesem Beruf niemand. Veranstalter wollen sehen, was im Saal passiert.',
        'Was eine gute Ausbildung kann: den Weg abkürzen. Sie zeigt, wie aus Wissen ein Thema wird, wie ein Vortrag einen Saal hält und was die Stimme dabei macht. Das alles lässt sich auch allein lernen, es dauert nur länger, und man merkt die eigenen Fehler später.',
      ],
    },
    {
      titel: 'Erstens: ein Thema, für das Sie stehen',
      absaetze: [
        'Veranstalter buchen kein „Motivation" und kein „Erfolg". Sie buchen eine Antwort auf ein Problem, das ihr Publikum gerade hat, von jemandem, dem man diese Antwort glaubt. Glaubwürdig wird ein Thema durch das, was Sie nachweislich getan, geleitet, überstanden oder erforscht haben.',
        'Die Probe ist ein einziger Satz: „Ich spreche darüber, wie … – und ich weiß das, weil …". Wenn die zweite Hälfte fehlt, fehlt das Thema noch.',
      ],
    },
    {
      titel: 'Zweitens: ein Vortrag, der trägt',
      absaetze: [
        'Eine Keynote ist kein langes Referat. Sie hat einen Gedanken, nicht zwölf, und sie erzählt ihn über Begebenheiten, nicht über Folien. Wer seinen Kerngedanken nicht in einem Satz sagen kann, hat noch keinen Vortrag, sondern Material.',
        'Rechnen Sie damit, den Vortrag mehrmals umzuschreiben. Was am Schreibtisch überzeugt, funktioniert im Saal oft nicht, und umgekehrt.',
      ],
    },
    {
      titel: 'Drittens: Bühnenzeit, erst einmal ohne Honorar',
      absaetze: [
        'Für den ersten Vortrag wird kaum jemand bezahlt. Die ersten Säle sind klein und zahlen nichts: Unternehmerabende, Verbände, Kammern, Netzwerktreffen, Barcamps, Kundentage, Hochschulen. Dort lernt man, was kein Buch beibringt: wo ein Saal wegdriftet, welcher Satz hängen bleibt, wie sich die eigene Stimme nach vierzig Minuten anfühlt.',
        'An dieser Stelle hören viele auf. Wer weitermacht, hat nach einiger Zeit einen Vortrag, der zuverlässig funktioniert, und Menschen, die ihn weiterempfehlen.',
      ],
    },
    {
      titel: 'Viertens: gesehen werden können',
      absaetze: [
        'Wer einen Redner bucht, geht ein Risiko ein: Der Saal ist voll, und es gibt keinen zweiten Versuch. Deshalb wollen Veranstalter Sie vorher sehen. Eine Aufnahme von einigen Minuten aus einem echten Saal, mit echtem Publikum und gutem Ton, ist mehr wert als jede Selbstbeschreibung.',
        'Dazu gehört eine Seite, auf der in wenigen Sätzen steht, worüber Sie sprechen, für wen und was das Publikum danach anders macht. Agenturen und Rednerverzeichnisse können später helfen. Agenturen nehmen in der Regel erst auf, wer schon Auftritte und eine Aufnahme vorweisen kann, und arbeiten gegen Provision. Verzeichnisse verlangen oft eine Eintragsgebühr.',
      ],
    },
    {
      titel: 'Was man damit verdient',
      absaetze: [
        'Im deutschen Markt bewegen sich Einsteiger und lokale Anlässe zwischen 500 und 2.000 Euro je Vortrag, etablierte Fachspeaker zwischen 3.000 und 8.000 Euro, bekannte Namen zwischen 8.000 und 20.000 Euro. Für eine gebuchte Keynote nennt der Preis-Artikel meist 2.500 bis 10.000 Euro, die Spannen hier ordnen nach Erfahrungsstufe. Was Sie erreichen, hängt von Ihrem Thema und Ihrer Sichtbarkeit ab. Eine Zahl für Sie persönlich zu nennen, wäre ein Versprechen ohne Deckung.',
        'Viele Speaker leben nicht allein vom Honorar, sondern von dem, was auf einen Vortrag folgt: Beratung, Trainings, Bücher. Die Bühne ist dann weniger Einnahmequelle als der Ort, an dem man gefunden wird.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Was ist ein Keynote Speaker?',
      antwort:
        'Ein Keynote Speaker hält den Hauptvortrag einer Veranstaltung, also den Vortrag, der das Thema des Tages setzt. Anders als ein Fachvortrag oder ein Training soll eine Keynote in etwa 45 bis 60 Minuten eine Richtung geben oder eine Haltung verändern.',
    },
    {
      frage: 'Welche Voraussetzungen braucht man, um Speaker zu werden?',
      antwort:
        'Keine formalen. Der Beruf ist nicht geschützt, es gibt weder eine vorgeschriebene Ausbildung noch ein nötiges Zertifikat. Was Sie brauchen, ist ein Thema, für das Sie durch Ihre eigene Geschichte oder Arbeit glaubwürdig stehen, einen Vortrag, der im Saal funktioniert, und eine Aufnahme davon.',
    },
    {
      frage: 'Kann man nebenberuflich Keynote Speaker werden?',
      antwort:
        'Ja, und so fangen viele an. Der eigene Beruf ist sogar ein Vorteil, weil er das Thema glaubwürdig macht. Wer nur noch auf Bühnen steht, muss aufpassen, dass ihm die Erfahrung nicht ausgeht, von der er erzählt.',
    },
    {
      frage: 'Brauche ich ein Buch?',
      antwort:
        'Nein, aber es hilft. Ein Buch beweist, dass Sie Ihr Thema durchdacht haben, und gibt Veranstaltern etwas in die Hand. Es ersetzt keinen guten Vortrag. Es gibt Autoren, die niemand ein zweites Mal bucht, und gefragte Rednerinnen ohne Buch.',
    },
    {
      frage: 'Brauche ich eine Redneragentur?',
      antwort:
        'Am Anfang nicht. Agenturen vermitteln gegen Provision und nehmen meist erst auf, wer schon Auftritte und eine Aufnahme vorweisen kann. Die ersten Buchungen kommen meist über Empfehlungen aus dem eigenen Umfeld.',
    },
    {
      frage: 'Was verdient ein Keynote Speaker?',
      antwort:
        'Im deutschen Markt liegen Einsteiger und lokale Anlässe zwischen 500 und 2.000 Euro je Vortrag, etablierte Fachspeaker zwischen 3.000 und 8.000 Euro, bekannte Namen zwischen 8.000 und 20.000 Euro. Wie sich ein Honorar zusammensetzt, steht im Artikel „Was kostet ein Keynote Speaker?".',
    },
  ],

  weiter: {
    text: 'Wenn Sie ein Thema haben und wissen wollen, ob daraus ein Vortrag wird: In der Speaker-Ausbildung erarbeiten wir gemeinsam Thema, Vortrag und Auftritt. Das Vorgespräch kostet nichts.',
    knopf: 'Zur Speaker-Ausbildung',
    ziel: '/speaker-ausbildung',
  },

  seoText:
    'Wie wird man Keynote Speaker? Keine Ausbildung ist vorgeschrieben. Der Weg: ein glaubwürdiges Thema, ein Vortrag, der trägt, Bühnenzeit in kleinen Sälen und eine gute Aufnahme.',
};

export default function ArtikelSpeakerWerden() {
  return <ArtikelSeite inhalt={INHALT} />;
}
