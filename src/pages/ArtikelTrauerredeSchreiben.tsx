import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie schreibe ich eine Trauerrede?"
 *
 * Aus der Fragenerhebung vom 21.09.2026 (Googles Suchvorschlaege, 736 Abrufe):
 * eine der am breitesten belegten Fragen ueberhaupt - "wie ist eine trauerrede
 * aufgebaut", "trauerrede was muss rein", "wie beginnt eine trauerrede",
 * "trauerrede wie lange". Auf der Seite gab es dazu nichts Lesbares.
 *
 * WER HIER LANDET: Menschen, die in wenigen Tagen vor einer Trauergemeinde
 * stehen und noch nie eine Rede gehalten haben. Kein Marketington, keine
 * Dringlichkeit, kein Angebot im Text. Der Verweis auf Claudia steht am Ende
 * und ist ein Satz.
 *
 * KEINE ZAHLEN AUS STUDIEN. Die einzigen Zahlen sind Faustwerte zum Sprechtempo
 * und zur Laenge - als "etwa" gekennzeichnet, so wie Claudia es verlangt.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/trauerrede-schreiben',
  bereich: 'Abschied & Trauerfeier',
  aktualisiert: '2026-09-21',
  frage: 'Wie schreibe ich eine Trauerrede?',

  kurzantwort:
    'Eine Trauerrede hat drei Teile: Anfang, Erinnerungen, Abschied. Der Anfang sagt, wer Sie für den Verstorbenen waren. Der Mittelteil erzählt zwei oder drei Erinnerungen, die zeigen, wie dieser Mensch war. Der Abschied spricht ihn direkt an oder gibt den Anwesenden etwas mit. Schreiben Sie so, wie Sie sprechen, und erzählen Sie lieber eine Begebenheit genau als ein ganzes Leben im Überblick. Als Angehörige oder Freund reichen etwa drei bis fünf Minuten. Das sind eine bis anderthalb normal beschriebene Seiten.',

  vorspann:
    'Niemand erwartet von Ihnen eine perfekte Rede. Die Menschen im Raum wollen den Verstorbenen noch einmal erkennen – in einem Satz, einer Geste, einer Geschichte. Das können Sie, auch wenn Sie noch nie vor anderen gesprochen haben.',

  motiv: 'Später hier: aufgeschlagenes Notizbuch am Fenster, Handschrift, ruhiges Licht. Kein Gesicht.',

  abschnitte: [
    {
      titel: 'Womit eine Trauerrede beginnt',
      absaetze: [
        'Mit dem Einfachsten: dem Namen und Ihrer Verbindung. „Ich bin Anna, die jüngere Schwester von Martin." Dieser eine Satz ordnet den Raum: Jeder weiß, wer spricht und aus welcher Nähe. Er gibt auch Ihnen Halt, weil er sich nicht verhaspeln lässt.',
        'Danach ein Satz, der ausspricht, was alle fühlen. Er muss nicht klug sein. „Ich hätte nie gedacht, dass ich heute hier stehe" ist ehrlicher als jedes Zitat. Gedichte und Sprüche sind erlaubt, aber sie sind kein guter erster Satz: Sie klingen nach jedem, nicht nach diesem einen Menschen.',
      ],
    },
    {
      titel: 'Was in den Mittelteil gehört',
      absaetze: [
        'Nicht der Lebenslauf. Geburtsort, Ausbildung, Stationen – das kennen viele der Anwesenden ohnehin, und wer es nicht kennt, lernt den Menschen dadurch nicht kennen. Ein paar Eckdaten reichen, wenn sie für die Geschichte gebraucht werden.',
        'Was trägt, sind Begebenheiten. Zwei oder drei, jede so genau erzählt, dass man sie vor sich sieht: was er sagte, wenn er ans Telefon ging. Wie sie den Tisch deckte. Womit er alle zur Verzweiflung brachte. Eine gute Begebenheit darf auch komisch sein. Ein Lachen in einer Trauerfeier ist kein Fehler, sondern ein Zeichen, dass alle denselben Menschen vor Augen haben.',
        'Hilfreich ist eine einzige Leitfrage: Was würde fehlen, wenn ich es nicht sage? Alles, was diese Frage nicht besteht, können Sie streichen.',
      ],
    },
    {
      titel: 'Was nicht hinein muss',
      absaetze: [
        'Sie müssen nichts glätten und nichts erfinden. Ein Mensch, der schwierig war, wird durch eine Rede nicht einfach, und die Anwesenden merken es, wenn ein Bild nicht stimmt. Sie müssen aber auch nicht alles erzählen. Eine Trauerrede ist keine Bilanz. Sie darf auswählen, solange das, was sie sagt, wahr ist.',
        'Ebenfalls nicht nötig: eine Erklärung für den Tod, ein Trost, der alles auflöst, oder ein Schlusswort über den Sinn. Es genügt, wenn Sie sagen, was dieser Mensch Ihnen bedeutet hat.',
      ],
    },
    {
      titel: 'Wie eine Trauerrede endet',
      absaetze: [
        'Am stärksten ist oft der direkte Abschied: sich zum Sarg oder zur Urne wenden und den Verstorbenen ansprechen. „Danke, Papa." Ein Satz, dann eine Pause, dann setzen Sie sich. Wer lieber zu den Anwesenden spricht, gibt ihnen etwas mit, das bleibt: eine Eigenschaft, eine Gewohnheit, einen Satz des Verstorbenen, den alle kennen.',
        'Sie müssen das Ende nicht ankündigen und nichts mehr dahinterhängen. Der letzte Satz wirkt am stärksten, wenn danach Stille ist.',
      ],
    },
    {
      titel: 'Wie lang und wie aufschreiben',
      absaetze: [
        'Für Angehörige und Freunde sind etwa drei bis fünf Minuten ein gutes Maß. Wer ruhig spricht und Pausen lässt, braucht für eine normal beschriebene Seite ungefähr drei Minuten. Die Rede einer Trauerrednerin, die das ganze Leben würdigt, ist länger. Fragen Sie beim Bestattungshaus nach, wie viel Zeit die Feier insgesamt hat, denn viele Trauerhallen werden in festen Zeitfenstern vergeben.',
        'Schreiben Sie die Rede vollständig aus, in großer Schrift, mit einem Absatz je Gedanke. Das werden dann mehrere Blätter, nummerieren Sie sie. Niemand nimmt es Ihnen übel, wenn Sie ablesen. Lesen Sie sie vorher zweimal laut, nicht im Kopf. Beim lauten Lesen merken Sie, welche Sätze zu lang sind und an welcher Stelle Ihnen die Stimme wegbleibt. Genau dort machen Sie im Manuskript ein Zeichen für eine Pause.',
      ],
    },
    {
      titel: 'Wenn die Stimme versagt',
      absaetze: [
        'Das passiert, und es ist nie peinlich. Hören Sie auf zu sprechen, atmen Sie länger aus als ein, schauen Sie auf Ihr Blatt und lesen Sie den nächsten Satz. Die Anwesenden warten. Sie sind auf Ihrer Seite.',
        'Wer sich unsicher ist, bittet vorher jemanden, das Blatt zu übernehmen, falls es nicht weitergeht. Allein zu wissen, dass jemand bereitsteht, hilft oft schon so sehr, dass es gar nicht nötig wird.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wie ist eine Trauerrede aufgebaut?',
      antwort:
        'In drei Teilen: Anfang (wer spricht, in welcher Verbindung, ein Satz zum Anlass), Mittelteil (zwei oder drei genau erzählte Begebenheiten, die den Menschen zeigen) und Abschied (den Verstorbenen direkt ansprechen oder den Anwesenden etwas mitgeben). Der Lebenslauf gehört höchstens in Stichworten dazu.',
    },
    {
      frage: 'Wie lange dauert eine Trauerrede?',
      antwort:
        'Als Angehörige oder Freund etwa drei bis fünf Minuten, das sind eine bis anderthalb Seiten Text. Die Rede einer Trauerrednerin ist länger, weil sie das ganze Leben würdigt. Wie viel Zeit insgesamt zur Verfügung steht, weiß das Bestattungshaus: Viele Trauerhallen sind in festen Zeitfenstern gebucht.',
    },
    {
      frage: 'Darf ich eine Trauerrede ablesen?',
      antwort:
        'Ja. Schreiben Sie sie vollständig aus, in großer Schrift, und lesen Sie sie vorher zweimal laut. Ein ausgeschriebenes Blatt ist ein Geländer, gerade dann, wenn die Stimme nicht mitmacht.',
    },
    {
      frage: 'Darf in einer Trauerrede gelacht werden?',
      antwort:
        'Ja. Eine Begebenheit, bei der die Anwesenden lächeln oder lachen, zeigt, dass alle denselben Menschen vor Augen haben. Witze über den Verstorbenen sind etwas anderes. Die gehören nicht hinein.',
    },
    {
      frage: 'Was, wenn das Verhältnis schwierig war?',
      antwort:
        'Dann sagen Sie nichts Falsches und nicht alles. Eine Trauerrede darf auswählen. Sie können von dem sprechen, was gut war, oder schlicht benennen, dass es nicht leicht war. Ein ehrlicher Satz wirkt stärker als ein geschöntes Bild.',
    },
    {
      frage: 'Kann ich die Rede von einer KI schreiben lassen?',
      antwort:
        'Für die Gliederung und fürs Kürzen kann sie helfen. Was sie nicht hat, sind die Begebenheiten, und genau die machen eine Trauerrede aus. Ein Text ohne eigene Erinnerung klingt nach jedem Menschen, nicht nach diesem einen. Schreiben Sie die Erinnerungen selbst auf; ordnen lassen können Sie sie danach.',
    },
  ],

  weiter: {
    text: 'Wenn Sie die Rede nicht selbst halten möchten oder jemanden brauchen, der mit Ihnen die richtigen Worte findet: Ich spreche als Trauerrednerin im Ruhrgebiet und bereite Angehörige vor, die bei der Trauerfeier selbst ein paar Worte sagen möchten.',
    knopf: 'Zur Seite Trauerrede',
    ziel: '/trauerrede',
  },

  seoText:
    'Trauerrede schreiben: Aufbau in drei Teilen, womit sie beginnt, was hinein muss und was nicht, wie lang sie ist – und was hilft, wenn die Stimme versagt.',
};

export default function ArtikelTrauerredeSchreiben() {
  return <ArtikelSeite inhalt={INHALT} />;
}
