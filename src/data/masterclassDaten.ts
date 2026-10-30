/**
 * Masterclass UNVERWECHSELBAR - gemeinsame Daten fuer die Angebotsseite (/masterclass) und die Dankesseite
 * (/masterclass/danke). Texte WORTGLEICH aus Claudias Dokument "Masterclass_Unverwechselbar_Angebotsseite"
 * (29.10.2026; ✎ = Ergaenzung von Vinci, uebernommen). Nichts erfunden.
 *
 * NOCH OFFEN (Dokument, Abschnitt "Offene Punkte") - hier als Platzhalter/sinnvolle Vorbelegung, bitte bestaetigen:
 *  - Preis brutto/netto + Ratenzahlung: hier 497/797 € (Auftraggeber 28.10.2026, Fruehbucher bis 12.11.).
 *  - Anmeldefrist: noch offen -> Seite zeigt keinen harten Stichtag, nur den Fruehbucher-Hinweis.
 *  - Video-Sprechstunden dienstags: noch offen -> nicht aufgefuehrt.
 *  - Punkt 4 "unverwechselbar" vs. "unaufhaltbar": vorlaeufig "unverwechselbar" (passt zum Markennamen).
 *  - Teilnehmerstimme aus der Challenge: es laufen bereits echte Stimmen (StimmenKarten).
 *  - Kontakt-Mail: claudiaconen@umsatzstimme.de (bestehende Adresse).
 */

export const START_LABEL = 'Donnerstag, 19. November 2026';

/** Die vier Live-Termine (donnerstags) mit beiden Gruppenzeiten. */
export const FRUEH = '7:30–9:00 Uhr';
export const ABEND = '18:30–20:00 Uhr';
export const TERMINE: string[] = [
  'Donnerstag, 19. November 2026',
  'Donnerstag, 26. November 2026',
  'Donnerstag, 3. Dezember 2026',
  'Donnerstag, 10. Dezember 2026',
];

/** Von der Challenge in die Tiefe: deine sieben Schritte (Dokument). Reihenfolge und Nummern wie im Dokument;
 *  die Termine sind absichtlich nicht aufsteigend - sie folgen dem Dokument (jeder Donnerstag traegt ~2 Schritte). */
export const SCHRITTE: { nr: number; titel: string; datum: string; text: string; mit: string }[] = [
  {
    nr: 1,
    titel: 'Kernbotschaft und Positionierung in der Tiefe',
    datum: '19. November',
    text: 'Die meisten beschreiben, was sie tun. Die Erfolgreichen sagen, wofür sie stehen. Du findest den einen Satz, den man nach einem Gespräch mit dir weitererzählt, so formuliert, wie ein Profi ihn sagen würde.',
    mit: 'deinen Kernsatz und eine Geschichte von einer Minute, die ihn beweist.',
  },
  {
    nr: 2,
    titel: 'Zielgruppenbrille: Achtung, knallharte Wahrheit',
    datum: '3. Dezember',
    text: 'Dein Kunde hört nicht, was du sagst. Er hört, was er davon hat. Wir schauen ehrlich auf deine Videos: Wo sprichst du über dich, wo über ihn? Daraus wächst echte Selbstsicherheit.',
    mit: 'klares Feedback und Tipps, wie du dich authentisch, echt und einfach präsentieren kannst, ohne dich zu verbiegen.',
  },
  {
    nr: 3,
    titel: 'Raus aus der Redeangst: spontan und flexibel pitchen',
    datum: '26. November',
    text: 'Netzwerktreffen, jemand fragt: „Und was machst du so?" Und du bist einfach da. Lampenfieber wird kleiner durch Üben, nicht durch Warten.',
    mit: 'den Weg zu deiner Selbstsicherheit und einen Notfallkoffer mit wertvollen Tipps.',
  },
  {
    nr: 4,
    titel: 'Deine Stimme: dein kostbarstes Marketinginstrument',
    datum: '26. November',
    text: 'Was du sagst, entscheidet, ob man dich versteht. Wie du es sagst, entscheidet, ob man dir glaubt. Mit Aufnahmen und Sprechübungen arbeitest du an Betonung, Pause, Tempo und Haltung.',
    mit: 'wichtige Tipps und Techniken, um mit deiner Stimme Wirkung zu erzielen, denn deine Stimme ist unverwechselbar. Du lernst deine Stimme besser kennen und redest selbstsicher.',
  },
  {
    nr: 5,
    titel: 'Storytelling: der Türöffner zu Kopf und Herz deiner Kunden',
    datum: '19. November',
    text: 'Fakten informieren. Geschichten bleiben. Du findest die Momente, die nur du erzählen kannst. Der Held ist dein Kunde, du zeigst den Weg.',
    mit: 'eine Schatzkiste voller Ideen und echter Geschichten, die authentisch zu dir passen. Denn wir beleuchten den Weg, wie du dein Business damit klar kommunizierst und neugierig machst.',
  },
  {
    nr: 6,
    titel: 'Wie Kunden entscheiden: was die Forschung über Zuhören weiß',
    datum: '3. Dezember',
    text: 'Wer fragt, gewinnt. Studien zeigen: Wer im Gespräch mehr Nachfragen stellt, wird als sympathischer erlebt.',
    mit: 'kostbare Erkenntnisse, welche Sätze, welche Worte und welche Art der Kommunikation wichtig sind, damit Menschen sich für dich entscheiden können.',
  },
  {
    nr: 7,
    titel: 'Elevator Pitch: authentisch, echt und einfach überall präsentieren',
    datum: '10. Dezember',
    text: 'Aus allem wird ein 60-Sekunden-Auftritt, manchmal sogar kürzer. Du willst dich doch im Gehirn anderer Menschen speichern, richtig? Das Kostbare ist: Menschen haben keine Reset-Taste. Du kannst dich positiv speichern, sodass man gern mit dir zusammenarbeiten möchte, weil du Vertrauen weckst. Genau darum geht es.',
    mit: 'deinen Fahrplan, die Übung und die Selbstsicherheit.',
  },
];

/** Deine Begleitung zwischen den Terminen (Dokument). Das letzte Element ist die 1:1-Uebungsstunde (hervorgehoben). */
export const BEGLEITUNG: { titel: string; text: string; stern?: boolean }[] = [
  { titel: 'Täglicher Audioimpuls', text: 'Montag bis Freitag ein Audioimpuls von etwa drei Minuten mit einer Mini-Übung, von Claudia gesprochen.' },
  { titel: 'Drei Übungsvideos pro Woche', text: 'Jeweils etwa eine Minute – zum Mitmachen und Dranbleiben.' },
  { titel: 'Ein fester Übungspartner', text: 'Du übst nicht allein: an deiner Seite ein fester Übungspartner aus der Gruppe.' },
  {
    titel: 'Deine persönliche 1:1-Übungsstunde',
    text: 'Zum Abschluss deine persönliche 1:1-Übungsstunde mit Claudia: 60 Minuten nur für dich, in der Woche vom 14. bis 18. Dezember. Dein Pitch bekommt den letzten Schliff, und du gehst mit deinem nächsten Schritt.',
    stern: true,
  },
];

/** Das Wichtigste auf einen Blick (Dokument). Preis wird auf der Seite dynamisch eingesetzt. */
export const BLICK: string[] = [
  '4 Live-Termine, donnerstags vom 19. November bis 10. Dezember 2026',
  'Frühgruppe 7:30–9:00 Uhr oder Abendgruppe 18:30–20:00 Uhr',
  'Begleitung von Montag bis Freitag und eine finale 1:1-Übungsstunde von 60 Minuten',
  'Höchstens 9 Personen pro Gruppe',
];

/** Persoenlich von Claudia (Dokument, Zitat wortgleich). */
export const CLAUDIA_ZITAT = 'Ich unterstütze Menschen dabei, authentisch, echt und einfach ihre beste Wirkungskraft nach außen zu tragen, sodass Kunden erkennen, dass sie die Lösung für ihr Problem sind. Als Rhetoriktrainerin möchte ich, dass du genauso sicher bist, wenn du deine Worte verwendest, weil sie zu dir passen: authentisch, echt, glaubwürdig.';
