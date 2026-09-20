import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Was mache ich gegen Lampenfieber?"
 *
 * Von allen vorgeschlagenen Unterseiten die mit der groessten Nachfrage:
 * Es ist die Frage, die Menschen nachts eingeben, nicht am Arbeitsplatz.
 *
 * VORSICHT BEIM TON: Hier landen auch Menschen mit echter Redeangst, nicht
 * nur mit Nervositaet vor einem Vortrag. Der Text unterscheidet beides und
 * sagt ausdruecklich, wo Claudias Arbeit aufhoert. Sie ist keine
 * Therapeutin, und das gehoert auf die Seite, nicht ins Kleingedruckte.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/lampenfieber',
  bereich: 'Bühne & Vortrag',
  aktualisiert: '2026-09-19',
  frage: 'Was hilft gegen Lampenfieber?',

  kurzantwort:
    'Drei Dinge, und keines davon ist Mut. Erstens: langsamer ausatmen als einatmen — das bremst den Körper aus und ist in einer Minute zu machen. Zweitens: die ersten beiden Sätze auswendig können, damit der Anfang nicht gedacht werden muss. Drittens: vorher laut sprechen, nicht nur im Kopf durchgehen. Lampenfieber verschwindet nicht, aber es wird kleiner als die Aufgabe.',

  vorspann:
    'Fast jeder Mensch, den Sie auf einer Bühne sehen, hat Lampenfieber. Der Unterschied ist nicht, dass es weg ist. Der Unterschied ist, dass es nichts mehr verhindert.',

  motiv: 'Später hier: Moment kurz vor dem Auftritt, Seitenbühne, ruhig.',

  abschnitte: [
    {
      titel: 'Warum Atmen wirkt und Mutmachen nicht',
      absaetze: [
        'Lampenfieber ist eine Körperreaktion, keine Meinung über Sie. Der Körper macht sich bereit: Herz schneller, Atmung flacher, Hände kalt. Man kann einem Körper in diesem Zustand nicht erklären, dass alles gut wird — er hört nicht auf Argumente.',
        'Worauf er hört, ist die Atmung. Länger ausatmen als einatmen ist das einzige bewusste Signal, mit dem sich der Körper herunterregeln lässt. Vier Sekunden ein, sechs bis acht Sekunden aus, eine Minute lang. Das ist kein Entspannungsritual, sondern Mechanik.',
        'Deshalb funktionieren Ratschläge wie „denk einfach positiv" so schlecht. Sie richten sich an den Teil, der gerade nicht zuständig ist.',
      ],
    },
    {
      titel: 'Der Anfang muss sitzen, der Rest nicht',
      absaetze: [
        'Die schlimmste Minute ist die erste. Wer sie auswendig kann, muss sie nicht denken — und gewinnt genau die Sekunden, in denen sich der Körper beruhigt.',
        'Auswendig heißt hier: die ersten beiden Sätze, Wort für Wort. Nicht mehr. Ein ganzer auswendig gelernter Vortrag ist gefährlich, weil man nach einem Aussetzer nicht zurückfindet. Zwei Sätze sind eine Rampe, kein Käfig.',
      ],
    },
    {
      titel: 'Laut üben, nicht im Kopf',
      absaetze: [
        'Im Kopf läuft alles glatt. Der Kopf macht keine Pausen, verschluckt keine Silben und hat keinen trockenen Mund.',
        'Wer einen Vortrag nur gedanklich durchgeht, übt eine Situation, die es nicht gibt. Zweimal laut sprechen bringt mehr als zehnmal lesen — und es ist der Punkt, an dem man merkt, welche Sätze beim Sprechen stolpern.',
      ],
    },
    {
      titel: 'Was am Tag selbst hilft',
      absaetze: [
        'Früh da sein und den Raum betreten, bevor er voll ist. Ein bekannter Raum ist weniger bedrohlich als ein unbekannter, und das ist keine Einbildung.',
        'Einmal laut sprechen im leeren Saal, egal was. Die eigene Stimme im Raum gehört zu haben, nimmt der ersten Minute die Fremdheit.',
        'Und etwas, das fast nie gesagt wird: Wasser trinken, aber nicht eiskalt. Kalte Flüssigkeit zieht die Stimmlippen zusammen. Zimmerwarm ist besser als jeder Trick.',
      ],
    },
    {
      titel: 'Wo Lampenfieber aufhört und etwas anderes anfängt',
      absaetze: [
        'Nervosität vor einem Auftritt ist normal und geht mit Übung zurück. Redeangst ist etwas anderes: Sie führt dazu, dass Menschen Situationen vermeiden, Karrieren umbauen, Einladungen ausschlagen — über Jahre.',
        'Das ist kein Mangel an Training, und es lässt sich nicht mit Atemtechnik lösen. Ich arbeite mit Menschen, die jahrzehntelang nicht gesprochen haben, und es ist möglich. Aber es braucht Zeit und manchmal mehr als mich. Ich bin Rednerin und Trainerin, keine Therapeutin — und wenn ich den Eindruck habe, dass jemand anderes zuerst gebraucht wird, sage ich das.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Hilft ein Glas Wein vorher?',
      antwort:
        'Kurzfristig fühlt es sich lockerer an, hörbar wird es schlechter. Alkohol trocknet die Schleimhäute aus, nimmt der Stimme Präzision und dem Sprechen das Tempo. Wer es einmal auf einer Aufnahme gehört hat, macht es nicht wieder.',
    },
    {
      frage: 'Soll ich dem Publikum sagen, dass ich aufgeregt bin?',
      antwort:
        'Meistens nein. Es verschiebt die Aufmerksamkeit von Ihrem Thema auf Ihren Zustand, und die Zuhörenden können nichts damit anfangen. Eine Ausnahme: Wenn die Aufregung ohnehin sichtbar ist, ist ein kurzer, unaufgeregter Satz besser als der Versuch, sie zu verstecken.',
    },
    {
      frage: 'Wird es mit mehr Auftritten besser?',
      antwort:
        'Ja, aber nicht so, wie die meisten hoffen. Das Lampenfieber wird selten kleiner. Was größer wird, ist die Gewissheit, dass man trotzdem sprechen kann. Genau das nennen erfahrene Rednerinnen dann Routine.',
    },
    {
      frage: 'Was, wenn ich mitten im Vortrag den Faden verliere?',
      antwort:
        'Stehenbleiben und schweigen. Eine Pause von drei Sekunden wirkt auf der Bühne endlos und im Saal souverän — niemand merkt, dass sie nicht geplant war. Wer weiterredet, um die Lücke zu füllen, verrät sie erst.',
    },
    {
      frage: 'Ich habe seit Jahrzehnten Angst davor. Ist es dafür zu spät?',
      antwort:
        'Nein. Ich habe mit Menschen gearbeitet, die jahrzehntelang jede Gelegenheit vermieden haben — und danach gesprochen haben. Es dauert länger als bei Nervosität, und es braucht mehr als Technik. Aber zu spät ist es nicht.',
    },
  ],

  weiter: {
    text: 'Wenn Sie an Ihrer eigenen Sicherheit arbeiten wollen, statt weiter darüber zu lesen: Im Vorgespräch klären wir, wo Sie stehen — kostenlos und ohne Verpflichtung.',
    knopf: 'Vorgespräch vereinbaren',
    ziel: '/termin-buchen',
  },

  seoText:
    'Was gegen Lampenfieber hilft: Atmung, die ersten zwei Sätze auswendig, laut üben statt im Kopf. Und wo Nervosität aufhört und Redeangst anfängt.',
};

export default function ArtikelLampenfieber() {
  return <ArtikelSeite inhalt={INHALT} />;
}
