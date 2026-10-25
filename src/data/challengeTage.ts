/** Die sieben Challenge-Tage (aus src/pages/Challenge.tsx ausgelagert am 25.10.2026, damit Challenge-Seite und Mitgliederbereich denselben Inhalt nutzen). */
export type Tag = {
  titel: string;
  /** Schwerpunkt - steht auf der Programm-Kachel unter der Ueberschrift. */
  schwerpunkt: string;
  /** Der Gedanke zum Einstieg, in dem man sich wiedererkennt. */
  einstieg: string;
  /** Worum es geht - ein, zwei Saetze. */
  inhalt: string;
  aufgabe: string;
  /** Freiwilliger Zusatz zur Aufgabe (z. B. Aufnahme). */
  zusatz?: string;
  reflexion: string;
  /** Tag mit persoenlichem Feedback von Claudia (Tag 2 und 6 - Claudia, 21.10.2026 10:12 UTC). */
  feedback?: boolean;
  /** Icon in public/icons/ */
  icon: string;
};

/** Der Uebungssatz - an allen sieben Tagen wortgleich (Claudias Briefing, 22.09.2026 12:54 UTC). */
export const UEBUNGSSATZ = 'Wo ich spreche, ist meine Bühne – mit Persönlichkeit, Achtsamkeit und Leichtigkeit berühre ich Menschen.';

/** Die sieben Tage - Claudias Aufbau vom 21.10.2026 (Vinci-App + Discord, 10:42-11:34 UTC): Tag 1 und 2 in ihren
 *  Worten (Diktat in projects/claudiaconen/challenge/diktat_tage_2026-10-21.md), Tag 3 Redeangst, Tag 6 Kaufentscheidung
 *  + Call to Action, Tag 7 Generalprobe vor dem Pitch im Abschluss-Zoom. Tag 3-7 inhaltlich aus dem App-Plan von 09:49 UTC,
 *  bis Claudia sie diktiert. Keine Hirnforschungs-Behauptungen ohne Quelle (siehe Kopfkommentar). */
export const TAGE: Tag[] = [
  {
    // Tag 1 in Claudias Worten (Vinci-App, 21.10.2026 10:42-10:45 UTC), nur geordnet und geglaettet.
    titel: 'Deine Kernbotschaft', schwerpunkt: 'Positionierung in einem Satz · dein Vorher-Video', icon: 'schritt-1',
    einstieg: 'Die beste Positionierung bringt nichts, wenn niemand davon weiß.',
    inhalt: 'Klarheit im Kopf bringt Klarheit in deine Worte – und in deine Selbstsicherheit. Verkauf keine Erklärung, sondern ein Ergebnis: das, was du für deinen Kunden kreierst. Von der Selbsterkenntnis zum selbstsicheren Auftritt – wo auch immer du den Mund aufmachst.',
    aufgabe: 'Fixiere deine Kernbotschaft. Wer bist du? Für wen hast du eine Lösung? Welches Problem löst du – ohne Fachbegriffe, so dass es jeder versteht? Frag dich: Welches Bild, welches Gefühl kannst du dabei in anderen Menschen schnell wecken? Am ersten Tag darfst du es auch einfach erzählen. Nimm es als Video auf. Hau raus.',
    zusatz: 'Bonus: Sag, warum du das überhaupt tust – und wie lange schon. Speicher dein Video: Es ist dein Vorher-Video. Daran entdeckst du selbst, wie du dich entwickelst.',
    reflexion: 'Würde ein Fremder nach deinem Video wissen, ob er dich braucht?',
  },
  {
    // Tag 2 in Claudias Worten (Vinci-App, 21.10.2026 10:46 UTC), nur geglaettet.
    titel: 'Die Zielgruppenbrille', schwerpunkt: 'Dein Video mit Kundenaugen', icon: 'schritt-3', feedback: true,
    einstieg: 'Würdest du bei dir kaufen?',
    inhalt: 'Setz die Brille deiner Zielgruppe auf. Stell dir vor, du bist dein Kunde: Du hast einen Schmerz, ein Problem, einen Wunsch – und du willst, dass er erfüllt wird.',
    aufgabe: 'Schau dir ganz objektiv dein Video von Tag 1 an. Frag dich: Ist sofort klar, welches Problem du löst? Hörst du heraus, dass du als Kunde hier gut bedient wirst? Wenn nicht, schauen wir genauer hin – dann brauchst du ein Story-Gerüst. Nimm dein Video neu auf, mit dem, was du entdeckt hast.',
    reflexion: 'Was hat dein Kunde in deinem ersten Video vermisst?',
  },
  {
    titel: 'Raus aus der Redeangst – auch vor der Kamera', schwerpunkt: 'Körper vor Kopf · Stand, Atem, Hände', icon: 'schritt-8',
    einstieg: 'Festgehaltene Hände halten die Stimme fest. Wer oben atmet, klingt dünn und wird schnell.',
    inhalt: 'Redeangst beginnt im Körper – und dort lässt sie sich auch lösen. Stand, Atem und Hände gehören zusammen.',
    aufgabe: 'Stell dich hin. Atme viermal langsam aus, länger aus als ein. Dann sprich deine Kernbotschaft mit freien Händen. Das ist dein erstes Video im Stehen.',
    zusatz: 'Eine Hauptübung reicht: das Ausatmen. Stand und Hände folgen meist von allein.',
    reflexion: 'Was hat sich verändert, als du nach dem Ausatmen gesprochen hast?',
  },
  {
    titel: 'Deine Stimme', schwerpunkt: 'Niemand klingt wie du – nutze deine Betonung und Pausen.', icon: 'schritt-9',
    einstieg: 'Der Tag, an dem du dich zum ersten Mal wirklich hörst.',
    inhalt: 'Derselbe Satz klingt unsicher oder überzeugt – je nachdem, wie du ihn meinst. Dann die drei Wörter, die Gewicht bekommen, und die Pause danach. Die besten Redner reden nicht mehr als andere, sie schweigen mehr.',
    aufgabe: 'Sprich deine Kernbotschaft zweimal: einmal unsicher, einmal überzeugt. Dann markiere die drei Wörter, die Gewicht bekommen, und setz nach dem wichtigsten eine Pause. Poste die überzeugte Fassung.',
    reflexion: 'Wo hast du die Pause gesetzt – und was macht sie mit deinem Satz?',
  },
  {
    titel: 'Storytelling', schwerpunkt: 'Bilder können Lösungen aufzeigen – erwecke sie.', icon: 'schritt-4',
    einstieg: 'Wer sich selbst zum Helden macht, erzählt einen Lebenslauf.',
    inhalt: 'Ab hier wird aus dem Video eine Geschichte. Wer den Kunden zum Helden macht, erzählt etwas, das weitererzählt wird.',
    aufgabe: 'Erzähl eine Geschichte in fünf Stationen: ein Kunde, ein Moment, ein Satz, den er gesagt hat, was sich verändert hat, was er heute sagt. Eine Minute, nicht länger.',
    reflexion: 'Wer ist in deiner Geschichte der Held – du oder dein Kunde?',
  },
  {
    titel: 'Wie Kunden entscheiden', schwerpunkt: 'Zuhören und Call to Action', icon: 'schritt-5', feedback: true,
    einstieg: 'Menschen kaufen das Gefühl, verstanden zu sein.',
    inhalt: 'Menschen entscheiden, bevor sie verstehen. Wer zuhört, merkt, wann der andere innerlich Ja sagt. Und dann braucht er einen klaren nächsten Schritt: Menschen müssen wissen, wo es langgeht.',
    aufgabe: 'Lass heute einen echten Menschen zwei Minuten erzählen – Kollegin, Partner oder Kunde – und merk dir einen Satz von ihm. Dann erzähl deine Geschichte von Tag 5 noch einmal: mit der Pause nach dem Satz deines Kunden und einer klaren Handlungsaufforderung am Ende.',
    zusatz: 'Zuhören übt man nicht allein vor der Kamera. Ein echtes Gespräch zählt mehr als ein perfektes Video.',
    reflexion: 'Weiß dein Zuhörer am Ende genau, was er jetzt tun soll?',
  },
  {
    titel: 'Dein Elevator Pitch', schwerpunkt: 'In 30–60 Sekunden · live im Zoom-Call', icon: 'schritt-7',
    einstieg: 'Sein Problem. Dein Beweis. Warum du.',
    inhalt: 'Alles in drei Sätzen, zu einem Menschen gesprochen, nicht in eine Linse. Das ist deine Generalprobe für die Bühne beim Abschluss.',
    aufgabe: 'Sprich deinen Pitch in drei Sätzen – sein Problem, dein Beweis, warum du – mit deinem Call to Action am Ende. Leg danach dein Vorher-Video von Tag 1 daneben und poste beide zusammen, mit #unverwechselbar.',
    zusatz: 'Schau dir beide Videos an. Das ist Selbstsicherheit: das Ergebnis von sieben Videos. Am Montag beim Abschluss kannst du ihn live vor der Gruppe halten, 30–60 Sekunden, freiwillig – vielleicht sitzt dort schon dein nächster Kunde.',
    reflexion: 'Was hörst und siehst du heute, das an Tag 1 noch nicht da war?',
  },
];
