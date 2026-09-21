import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie halte ich eine gute Rede?"
 *
 * Aus der Fragenerhebung vom 21.09.2026: "wie rede halten", "vortrag halten
 * tipps", "rede halten tipps" - zehn Abrufe. In der alten Bibliothek lagen dazu
 * drei Artikel, die nie eine eigene Seite hatten.
 *
 * Dieser Artikel ist der Einstieg fuer alle, die KEINE Keynote halten, sondern
 * eine Rede: Geburtstag, Jubilaeum, Abschied, Vereinsversammlung, Betriebsfeier.
 * Er verweist auf die vorhandenen Artikel (Lampenfieber, Pausen, Keynote-Aufbau),
 * statt sie zu wiederholen.
 *
 * KEINE Wirkungszahlen, keine Studien. Laengenangaben als Faustwerte ("etwa").
 * Die Handgriffe decken sich mit ArtikelLampenfieber.tsx (erste zwei Saetze
 * auswendig, laut ueben) - nichts Abweichendes behaupten.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/gute-rede-halten',
  bereich: 'Bühne & Vortrag',
  aktualisiert: '2026-09-21',
  frage: 'Wie halte ich eine gute Rede?',

  kurzantwort:
    'Eine gute Rede hat einen einzigen Gedanken, den die Zuhörenden hinterher in einem Satz wiedergeben können. Alles andere dient diesem Gedanken: ein Anfang, der ohne Vorrede ins Thema geht, zwei oder drei Begebenheiten statt einer Aufzählung, und ein Schluss, der auf einem klaren Satz endet. Schreiben Sie für das Ohr, also kurze Sätze, und üben Sie laut, nicht im Kopf. Die ersten beiden Sätze lernen Sie auswendig, den Rest sprechen Sie frei nach Stichworten. Und kürzen Sie: Über eine zu kurze Rede beschwert sich selten jemand.',

  vorspann:
    'Wenn eine Rede nicht ankommt, liegt es nach meiner Erfahrung selten an Lampenfieber oder Stimme. Meist fehlt der eine Satz, der sagt, worum es geht.',

  motiv: 'Später hier: Rednerin an einem Stehpult bei einer Feier, von der Seite, Gäste im Anschnitt mit erhobenen Gläsern. Keine erkennbaren Gesichter.',

  abschnitte: [
    {
      titel: 'Erst der eine Satz',
      absaetze: [
        'Bevor Sie ein Wort der Rede schreiben, schreiben Sie den Satz auf, den ein Gast am nächsten Tag weitererzählen soll. „Sie hat gesagt, dass …" Wenn Ihnen dazu drei Sätze einfallen, haben Sie drei Reden. Entscheiden Sie sich für eine.',
        'Dieser Satz ist der Maßstab für alles Weitere. Was ihm dient, bleibt. Was nur nett ist, fliegt raus.',
      ],
    },
    {
      titel: 'Der Anfang: ohne Anlauf',
      absaetze: [
        '„Ich freue mich, heute hier zu sein" ist freundlich, bringt aber kaum jemanden zum Zuhören. Beginnen Sie mit einer Szene, einer Frage oder einem Satz, der stutzen lässt. Die Begrüßung kann danach kommen oder ganz entfallen, wenn ohnehin jeder weiß, wer spricht.',
        'Diese ersten beiden Sätze lernen Sie auswendig, Wort für Wort. Nicht mehr, Ihren einen Satz kennen Sie ohnehin. Die beiden Sätze tragen Sie über die Minute, in der die Aufregung am größten ist.',
      ],
    },
    {
      titel: 'Die Mitte: Begebenheiten statt Aufzählungen',
      absaetze: [
        'Eigenschaften behaupten kann jeder: zuverlässig, herzlich, humorvoll. Glauben wird man Ihnen erst die Begebenheit, in der man es sieht. Zwei oder drei davon reichen, jede so genau erzählt, dass die Zuhörenden sie vor sich haben.',
        'Bei einer Rede auf einen Menschen gilt dasselbe wie bei jeder anderen: nicht der Lebenslauf, sondern die Momente. Bei einer Rede zur Sache: nicht alle Argumente, sondern das stärkste, mit einem Beispiel.',
      ],
    },
    {
      titel: 'Der Schluss: ein Satz, dann Stille',
      absaetze: [
        'Kündigen Sie das Ende nicht dreimal an. Kommen Sie zu Ihrem einen Satz zurück, sagen Sie ihn, und hören Sie auf. Bei einem Anlass mit Gläsern ist der Toast der Schluss. Danach kommt nichts mehr.',
      ],
    },
    {
      titel: 'Wie lang',
      absaetze: [
        'Für eine Rede auf einer Feier sind etwa fünf Minuten ein gutes Maß, mehr als acht sollten es selten sein. Wer ruhig spricht und Pausen lässt, braucht für eine normal beschriebene Seite ungefähr drei Minuten. Fünf Minuten sind also gut anderthalb Seiten, acht etwa zweieinhalb. Wenn Sie beim Proben über der Zeit liegen, streichen Sie eine ganze Begebenheit, statt überall ein bisschen zu kürzen.',
      ],
    },
    {
      titel: 'Frei sprechen oder ablesen',
      absaetze: [
        'Meist am besten wirkt freies Sprechen nach Stichworten: eine Karte je Gedanke, darauf drei, vier Wörter. So bleiben Sie bei den Menschen statt beim Papier. Wer sich damit nicht sicher fühlt, schreibt aus und liest, aber in großer Schrift, mit Absätzen und mit Blick nach jedem Satz. Ein gut gelesener Text ist besser als ein verhaspelter freier.',
        'In beiden Fällen gilt: laut üben, mindestens zweimal. Im Kopf läuft jede Rede glatt. Erst beim Sprechen merken Sie, welche Sätze zu lang sind.',
      ],
    },
    {
      titel: 'Und die Aufregung',
      absaetze: [
        'Sie gehört dazu und geht nicht weg, sie hindert nur immer weniger. Länger ausatmen als einatmen, die ersten zwei Sätze sicher haben, früh im Raum sein. Mehr dazu steht im Artikel über Lampenfieber.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wie beginne ich eine Rede?',
      antwort:
        'Ohne Vorrede: mit einer Szene, einer Frage oder einem Satz, der stutzen lässt. Die Begrüßung kann danach kommen. Die ersten beiden Sätze lernen Sie auswendig, damit der Anfang trägt, auch wenn die Aufregung groß ist.',
    },
    {
      frage: 'Wie lang sollte eine Rede sein?',
      antwort:
        'Auf einer Feier etwa fünf Minuten, mehr als acht sollten es selten sein. Entscheidend ist, dass die Zuhörenden den einen Gedanken mitnehmen. Wer über der Zeit liegt, streicht besser eine ganze Begebenheit als überall ein bisschen.',
    },
    {
      frage: 'Soll ich frei sprechen oder ablesen?',
      antwort:
        'Frei nach Stichwortkarten wirkt meist am besten, weil Sie bei den Menschen bleiben. Ablesen ist in Ordnung, wenn der Text in großer Schrift steht und Sie nach jedem Satz aufschauen. Ein gut gelesener Text ist besser als ein verhaspelter freier.',
    },
    {
      frage: 'Wie ende ich eine Rede?',
      antwort:
        'Mit dem einen Satz, um den es ging, und danach mit Stille. Kündigen Sie das Ende nicht mehrfach an. Bei einem festlichen Anlass ist der Toast der Schluss.',
    },
    {
      frage: 'Wie übe ich eine Rede?',
      antwort:
        'Laut und im Stehen, mindestens zweimal, einmal davon mit Uhr. Beim stillen Durchgehen fällt nichts auf. Beim lauten Sprechen hören Sie, wo ein Satz stockt und wo Sie Luft brauchen.',
    },
  ],

  weiter: {
    text: 'Wenn aus der Rede ein Vortrag werden soll, der gebucht wird: Der nächste Schritt steht im Artikel über den Aufbau einer Keynote.',
    knopf: 'Wie baue ich eine Keynote auf?',
    ziel: '/wissen/keynote-aufbauen',
  },

  seoText:
    'Eine gute Rede halten: der eine Gedanke, ein Anfang ohne Vorrede, Begebenheiten statt Aufzählungen, ein klarer Schluss, die richtige Länge und wie man laut übt.',
};

export default function ArtikelGuteRede() {
  return <ArtikelSeite inhalt={INHALT} />;
}
