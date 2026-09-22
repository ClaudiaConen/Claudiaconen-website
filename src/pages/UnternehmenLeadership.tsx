import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Führung & Kommunikation.
 *
 * Vorher: eine Schablonenseite mit 1.185 Zeichen, fünf Stichpunkten und
 * einem Zitat. Kein einziges Wort darüber, was eigentlich passiert.
 *
 * Die inhaltlichen Schwerpunkte stammen aus der alten Fassung und sind
 * Claudias eigene: authentische Führung, Kommunikationsstrategien,
 * stimmige Präsenz, emotionale Intelligenz, Konfliktmanagement. Sie
 * sind hier nur ausformuliert statt aufgezählt.
 *
 * KEINE ZAHLEN. Nirgends steht, wie viel Prozent mehr irgendwas wird -
 * das lässt sich nicht belegen, und Führungskräfte sind die Zielgruppe,
 * die am schnellsten nachfragt.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/unternehmen-leadership',
  wer: 'Für Unternehmen',
  frage: 'Sie sagen es klar. Warum kommt es nicht an?',
  vorspann:
    'Führungskräfte scheitern selten am Inhalt. Sie scheitern daran, dass der Inhalt nicht ankommt — weil die Stimme etwas anderes sagt als der Satz, weil der Raum schon eine Meinung hat, oder weil niemand widerspricht und alle trotzdem etwas anderes tun.',

  problemTitel: 'Was in Besprechungen wirklich passiert',
  problemAbsaetze: [
    'Sie kündigen eine Veränderung an. Alle nicken. Drei Wochen später läuft es wie vorher. Das ist kein Widerstand — es ist ein Zeichen, dass die Botschaft den Kopf erreicht hat und nicht den Bauch.',
    'Oder umgekehrt: Sie halten eine gute Rede, die Stimmung ist da, und am nächsten Tag weiß niemand mehr, was jetzt gilt. Dann war es Stimmung ohne Struktur.',
    'Beides hat dieselbe Ursache. Führung wird als Inhalt gedacht und als Wirkung erlebt. Wer nur am Inhalt arbeitet, arbeitet an der falschen Hälfte.',
  ],

  angebotName: 'Führung & Kommunikation',
  angebotZeile: 'Ein Tag oder eine Reihe — mit Ihrem Führungskreis, an Ihren echten Situationen',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Der Preis hängt davon ab, wie viele Menschen kommen und ob es ein Tag ist oder eine Begleitung über Monate. Sie bekommen ihn vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Wir arbeiten an Ihren Fällen, nicht an Beispielen. Sie bringen die Ansage mit, die nicht ankam.',
    'Jede und jeder spricht mehrfach vor der Gruppe. Zuhören allein verändert nichts.',
    'Aufnahme und gemeinsames Ansehen — der Teil, an dem die meisten am meisten lernen.',
    'Stimme als Handwerk: Tempo, Pausen, der Moment, in dem ein Satz fest wird.',
    'Was tun, wenn niemand widerspricht. Schweigen ist die häufigste Form von Widerspruch.',
    'Konflikte ansprechen, ohne dass jemand das Gesicht verliert.',
  ],

  ablaufTitel: 'Wie ein Tag abläuft',
  ablauf: [
    { schritt: 'Vorgespräch', text: 'Dreißig bis sechzig Minuten mit Ihnen allein. Ich frage nach der Lage, nicht nach dem Wunschthema. Was ich dort erfahre, bleibt zwischen uns.' },
    { schritt: 'Vormittag', text: 'Die Grundlagen, an echten Situationen aus Ihrem Haus. Jede und jeder spricht. Kurze Runden, sofortige Rückmeldung.' },
    { schritt: 'Nachmittag', text: 'Die schwierigen Fälle: die Ansage, die niemand hören will. Das Gespräch, das vertagt wurde. Aufnahme und Auswertung.' },
    { schritt: 'Abschluss', text: 'Jede Person nimmt einen Satz mit, den sie ab morgen anders sagt. Nicht mehr — einer, der sitzt, ist mehr wert als zehn Notizen.' },
    { schritt: 'Danach', text: 'Auf Wunsch ein Nachgespräch nach sechs bis acht Wochen. Dann zeigt sich, was geblieben ist.' },
  ],

  fragen: [
    {
      frage: 'Wie viele Teilnehmer sind sinnvoll?',
      antwort:
        'Sechs bis zwölf. Darunter fehlt der Gruppendruck, der die Übungen ernst macht. Darüber kommt nicht jede Person mehrfach dran, und dann ist es ein Vortrag mit Übungsanteil — das wirkt anders.',
    },
    {
      frage: 'Muss die Geschäftsführung dabei sein?',
      antwort:
        'Nicht zwingend, aber es ändert den Tag. Ist sie dabei, sprechen manche vorsichtiger. Ist sie nicht dabei, fehlt am Ende jemand, der die Entscheidungen mitträgt. Wir klären das im Vorgespräch — es gibt für beides gute Gründe.',
    },
    {
      frage: 'Wird aufgenommen, und was passiert mit den Aufnahmen?',
      antwort:
        'Ja, und sie gehören der jeweiligen Person. Sie werden auf deren Gerät gespeichert, nicht auf meinem. Wer nicht aufgenommen werden will, sagt es — dann arbeiten wir ohne, der Lerneffekt ist nur kleiner.',
    },
    {
      frage: 'Was, wenn jemand nicht mitmachen will?',
      antwort:
        'Das kommt vor und ist kein Problem, solange es offen liegt. Ich zwinge niemanden vor die Gruppe. Meistens ändert sich das im Lauf des Tages von selbst, wenn sichtbar wird, dass niemand vorgeführt wird.',
    },
    {
      frage: 'Ist das ein Rhetorikseminar?',
      antwort:
        'Nein. Rhetorik arbeitet an der Rede, hier arbeiten wir an der Wirkung — auch im Gespräch zu zweit, in der Besprechung und in dem Moment, in dem jemand nachfragt und man nicht vorbereitet ist.',
    },
    {
      frage: 'Wie schnell sieht man etwas?',
      antwort:
        'Am selben Tag hört man einen Unterschied, wenn jemand zum zweiten Mal spricht. Ob er bleibt, zeigt sich nach sechs bis acht Wochen. Deshalb das Nachgespräch — und deshalb sage ich vorher nicht, was dabei herauskommt.',
    },
  ],

  nichtFuer: [
    'Sie brauchen eine Schulung zu einem Werkzeug oder einer Software. Dann empfehle ich jemanden — ich arbeite an Kommunikation.',
    'Es soll nach dem Tag erledigt sein. Ein Tag verändert, wie gesprochen wird, nicht die Struktur, die das Schweigen erzeugt hat.',
    'Die eigentliche Lage darf nicht angesprochen werden. Erfahre ich im Vorgespräch nicht, was wirklich los ist, halte ich einen freundlichen Workshop — und der wirkt nicht.',
    'Sie wollen, dass ich jemanden im Team zurechtrücke. Das mache ich nicht, und es würde vor der Gruppe ohnehin nach hinten losgehen.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Ein Vorgespräch, dreißig Minuten, ohne Kosten. Danach wissen Sie, ob es passt — und ich weiß, ob ich Ihnen helfen kann. Wenn nicht, sage ich das.',
  schrittKnopf: 'Vorgespräch anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Für Unternehmen', ziel: '/unternehmen-keynotes' }, { name: 'Führung & Kommunikation' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Claudia vor einer kleinen Gruppe, alle stehen, niemand sitzt am Tisch' },
    { bereich: 'Beim Ablauf', motiv: 'Rückmeldung zu zweit, konzentriert, kein Applaus' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Führungskraft spricht, Gruppe hört zu — von hinten fotografiert' },
  ],

  weitere: [
    { titel: 'Keynote für Ihr Unternehmen', text: 'Wenn erst einmal alle dasselbe gehört haben sollen.', ziel: '/unternehmen-keynotes' },
    { titel: 'Verkauf & Auftreten', text: 'Dieselbe Arbeit, gerichtet auf das Kundengespräch.', ziel: '/unternehmen-selling' },
    { titel: 'Interne Events & Moderation', text: 'Wenn jemand durch den Tag führen soll.', ziel: '/unternehmen-events' },
  ],

  // Kopfbild (22.09.2026): Claudia Conen im Training vor einer Gruppe
  bild: '/seiten/training.webp',
  bildAlt: 'Claudia Conen im Training vor einer Gruppe',

  seoTitel: 'Führung & Kommunikation für Führungskräfte | Claudia Conen',
  seoText:
    'Training für Führungskräfte: Wie Ansagen ankommen, was zu tun ist, wenn niemand widerspricht, und wie man Konflikte anspricht, ohne dass jemand das Gesicht verliert. An Ihren echten Situationen.',
};

export default function UnternehmenLeadership() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
