import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Was ist Storytelling?"
 *
 * Aus der Fragenerhebung vom 21.09.2026: "was ist storytelling einfach
 * erklaert", "warum funktioniert storytelling", "wie funktioniert gutes
 * storytelling", "kann man storytelling lernen". Eine Definition stand auf der
 * ganzen Seite nirgends.
 *
 * DIE VERSUCHUNG, siehe StorytellingKurs.tsx: Der Markt bewirbt Storytelling mit
 * "60.000x schneller", "22-mal besser gemerkt", Oxytocin und Spiegelneuronen.
 * Nichts davon steht hier - auch nicht abgeschwaecht. Was dasteht, ist
 * ueberpruefbar und reicht: Menschen erzaehlen weiter, was sich nacherzaehlen
 * laesst.
 *
 * Haltung und Bausteine stammen von der Kursseite: am Kipppunkt beginnen, etwas
 * riskieren, die Moral nicht hinterherschieben, nur Erlebtes, erst die Szene,
 * dann die Zahl. Das Beispiel ist ausgedacht und so gekennzeichnet.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/storytelling',
  bereich: 'Auftritt & Gespräch',
  aktualisiert: '2026-09-21',
  frage: 'Was ist Storytelling?',

  kurzantwort:
    'Storytelling heißt, eine Aussage nicht zu behaupten, sondern an einer Begebenheit zu zeigen: ein Mensch, ein Moment, in dem etwas kippt, und das, was danach anders ist. Es funktioniert, weil sich eine Szene nacherzählen lässt und eine Aufzählung kaum. Im Beruf braucht man es überall dort, wo etwas hängen bleiben soll: im Vortrag, im Verkaufsgespräch, in der Vorstellung, auf der Webseite. Eine gute Geschichte ist erlebt, kurz und endet, bevor jemand ihre Moral erklärt.',

  vorspann:
    'Weitererzählt wird, was sich nacherzählen lässt. Eine Zahl kann man nicht nacherzählen. Eine Szene schon.',

  motiv: 'Später hier: Rednerin im Halbprofil mitten in einer Geste, Publikum im Anschnitt, das sichtbar zuhört. Keine erkennbaren Gesichter im Publikum.',

  abschnitte: [
    {
      titel: 'Was eine Geschichte von einem Bericht unterscheidet',
      absaetze: [
        'Ein Bericht erzählt der Reihe nach: Dann kam das, dann kam jenes. Eine Geschichte beginnt an dem Punkt, an dem etwas kippt. Alles davor ist Anlauf und kann weg.',
        'Drei Dinge braucht sie, mehr nicht. Einen Menschen, dem man folgen kann. Einen Moment, in dem etwas auf dem Spiel steht. Und ein Danach, das anders ist als das Davor. Fehlt eines davon, ist es ein Beispiel oder eine Behauptung, aber keine Geschichte.',
      ],
    },
    {
      titel: 'Warum es funktioniert',
      absaetze: [
        'Meine Beobachtung ist unspektakulär: Menschen erzählen weiter, was sie vor sich sehen konnten. Wer nach einem Vortrag gefragt wird, worum es ging, gibt selten die Gliederung wieder. Er sagt: „Da war diese eine Geschichte mit …" Was sich so weitergeben lässt, bleibt. Was sich nicht weitergeben lässt, endet meist im Saal.',
        'Zum Storytelling kursieren viele eindrucksvolle Zahlen darüber, wie viel schneller oder besser das Gehirn Geschichten verarbeite. Wer den bekanntesten davon nachgeht, findet keine Studie, die das hergibt. Man braucht sie auch nicht. Probieren Sie es aus: Erzählen Sie denselben Inhalt einmal als Liste und einmal als Szene, und fragen Sie am nächsten Tag, woran sich jemand erinnert.',
      ],
    },
    {
      titel: 'Ein ausgedachtes Beispiel',
      absaetze: [
        'Das Beispiel ist ausgedacht, es zeigt nur die Form. Als Behauptung: „Wir legen großen Wert auf Kundennähe und schnelle Reaktionszeiten."',
        'Als Geschichte: „An einem Freitag um halb sechs rief ein Bäcker an. Seine Kasse war ausgefallen, der Samstag ist sein umsatzstärkster Tag. Unsere Technikerin saß schon im Auto nach Hause, und ehrlich gesagt wusste bei uns niemand, ob wir das Ersatzteil überhaupt dahaben. Sie ist trotzdem umgedreht. Um acht am Abend lief die Kasse wieder. Am Montag kam ein Blech Streuselkuchen."',
        'Beide Fassungen sagen dasselbe. Die erste steht so ähnlich auf vielen Webseiten. Die zweite erzählt man beim Abendessen weiter.',
      ],
    },
    {
      titel: 'Die drei häufigsten Fehler',
      absaetze: [
        'Zu früh anfangen. Die Vorgeschichte ist für den Erzähler wichtig, für den Zuhörer nicht. Beginnen Sie so spät wie möglich.',
        'Nichts riskieren. Die meisten erzählen Geschichten, in denen sie gut aussehen. Zugehört wird dort, wo jemand etwas zugibt. Das heißt nicht, sich kleinzumachen. Es heißt, den Moment zu zeigen, in dem es unklar war.',
        'Die Moral hinterherschieben. Wer am Schluss erklärt, was die Geschichte bedeutet, nimmt dem Publikum die Arbeit ab und damit das Erlebnis. Eine Geschichte, die man erklären muss, hat nicht funktioniert.',
      ],
    },
    {
      titel: 'Wo die Grenze liegt',
      absaetze: [
        'Storytelling kann manipulieren. Eine erfundene Geschichte ist eine Lüge mit Gefühl obendrauf. Arbeiten Sie deshalb nur mit Erlebtem, und sagen Sie dazu, wenn etwas gekürzt oder zusammengezogen wurde. Wer Geschichten erfindet, fliegt irgendwann auf, meistens bei jemandem, der dabei war.',
        'Und Sie bestimmen, wie privat es wird. Eine gute Geschichte braucht Nähe, nicht Intimität.',
      ],
    },
    {
      titel: 'Und die Zahlen?',
      absaetze: [
        'Die brauchen Sie weiterhin. Es kommt auf die Reihenfolge an: erst die Szene, dann die Zahl. Eine Zahl nach einer Geschichte wird als Beleg gehört. Eine Zahl davor wird als Behauptung gehört, die man erst einmal prüfen müsste.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Was ist Storytelling, einfach erklärt?',
      antwort:
        'Storytelling heißt, eine Aussage nicht zu behaupten, sondern an einer Begebenheit zu zeigen: ein Mensch, ein Moment, in dem etwas kippt, und das, was danach anders ist. Man nutzt es überall dort, wo etwas im Gedächtnis bleiben soll, etwa im Vortrag, im Verkaufsgespräch oder auf der Webseite.',
    },
    {
      frage: 'Warum funktioniert Storytelling?',
      antwort:
        'Weil sich eine Szene nacherzählen lässt und eine Aufzählung kaum. Menschen geben weiter, was sie vor sich sehen konnten. Für die bekanntesten der oft zitierten Zahlen dazu, wie viel schneller das Gehirn Geschichten verarbeite, ist keine Quelle auffindbar. Nötig sind sie auch nicht.',
    },
    {
      frage: 'Wie ist eine gute Geschichte aufgebaut?',
      antwort:
        'Sie braucht einen Menschen, dem man folgen kann, einen Moment, in dem etwas auf dem Spiel steht, und ein Danach, das anders ist als das Davor. Sie beginnt so spät wie möglich und endet, bevor jemand ihre Moral erklärt.',
    },
    {
      frage: 'Kann man Storytelling lernen?',
      antwort:
        'Ja. Es ist ein Handwerk mit wenigen Handgriffen: den Kipppunkt finden, alles davor streichen, laut erzählen statt nur aufschreiben. Die meisten Menschen haben mehr erzählbare Momente, als sie glauben. Spannend ist nicht das Ereignis, sondern der Moment der Entscheidung.',
    },
    {
      frage: 'Ist Storytelling manipulativ?',
      antwort:
        'Es kann manipulativ sein, wenn Geschichten erfunden werden. Wer nur Erlebtes erzählt und dazusagt, wenn etwas gekürzt wurde, bleibt auf der ehrlichen Seite.',
    },
    {
      frage: 'Funktioniert Storytelling auch schriftlich?',
      antwort:
        'Ja, die Handgriffe sind dieselben. Beim Schreiben können Sie kürzen, bis nichts Überflüssiges übrig ist. Beim Sprechen brauchen Sie Pausen, wo beim Lesen ein Absatz steht.',
    },
  ],

  weiter: {
    text: 'Wenn Sie Ihre eigenen Geschichten finden wollen: Im Storytelling-Kurs gehen Sie mit drei erzählbaren Geschichten heraus, einer über sich, einer über einen Kunden, einer über einen Fehler.',
    knopf: 'Zum Storytelling-Kurs',
    ziel: '/storytelling-kurs',
  },

  seoText:
    'Storytelling einfach erklärt: was eine Geschichte von einem Bericht unterscheidet, warum sie hängen bleibt, ein Vorher-Nachher-Beispiel, die drei häufigsten Fehler und wo die Grenze zur Manipulation liegt.',
};

export default function ArtikelStorytelling() {
  return <ArtikelSeite inhalt={INHALT} />;
}
