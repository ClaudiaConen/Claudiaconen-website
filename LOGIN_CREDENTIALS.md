# Login-Zugangsdaten

## Admin-Bereich

**URL:** `/admin/login` oder `http://localhost:5173/admin/login`

**Zugangsdaten:**
- E-Mail: `info@claudiaconen-akademie.de`
- Passwort: *(Bitte über Passwort-Vergessen-Funktion zurücksetzen)*

**Passwort zurücksetzen:**
1. Gehe zu `/admin/passwort-vergessen`
2. Gib die E-Mail-Adresse ein: `info@claudiaconen-akademie.de`
3. Folge den Anweisungen in der E-Mail

**Navigation:**
- Nach dem Login kommst du automatisch zum Adventskalender-Dashboard
- Über "Studenten" in der Navigation gelangst du zur Member-Studenten-Verwaltung
- Über "Kurse" kannst du Kurs-Inhalte verwalten

---

## Member-Bereich (Studenten)

**URL:** `/member/login` oder `http://localhost:5173/member/login`

**Test-Zugangsdaten:**
- E-Mail: `test@claudiaconen-akademie.de`
- Access Code: `TEST2026`

**Wichtig:**
- Member-Studenten verwenden **keinen klassischen Benutzernamen/Passwort**
- Stattdessen: **E-Mail + Access Code**
- Der Access Code wird bei der Erstellung durch den Admin generiert

**Neue Studenten erstellen:**
1. Als Admin einloggen
2. Navigiere zu "Studenten" (`/admin/member-studenten`)
3. Klicke auf "Neuer Student"
4. Fülle die Daten aus (Access Code wird automatisch generiert)
5. Der Student kann sich dann mit E-Mail + Access Code einloggen

---

## Navigation zwischen den Bereichen

**Vom Admin zum Member:**
- Klicke auf "Zum Member-Bereich →" in der Admin-Navigation

**Vom Member zum Admin:**
- Logout aus dem Member-Bereich
- Gehe manuell zu `/admin/login`

**Zur Website:**
- In beiden Bereichen gibt es einen Link "Zur Website"

---

## Funktionen im Admin-Bereich

### Member-Studenten-Verwaltung (`/admin/member-studenten`)
- Alle Studenten anzeigen
- Neue Studenten erstellen mit automatisch generierten Access Codes
- Access Codes anzeigen/verbergen/kopieren
- Studenten aktivieren/deaktivieren
- Studenten löschen
- Level, XP und Streak jedes Studenten sehen

### Kurs-Verwaltung (`/admin/member-kurse`)
- Module verwalten (9 Module)
- Lektionen mit Videos hinzufügen
- Quizzes erstellen
- Flashcards erstellen
- Downloads zu Lektionen hinzufügen

---

## Sicherheitshinweise

1. **Admin-Passwörter**: Werden mit bcrypt gehasht
2. **Access Codes**: Werden in Klartext gespeichert (nur über Admin sichtbar)
3. **RLS (Row Level Security)**: Ist für alle Tabellen aktiviert
4. **Tokens**: Admin-Tokens laufen nach 24 Stunden ab

---

## Häufige Probleme

**Problem:** Kann mich nicht als Admin einloggen
**Lösung:** Nutze die Passwort-Vergessen-Funktion

**Problem:** Member kann sich nicht einloggen
**Lösung:** Überprüfe, ob der Student aktiv ist und der Access Code korrekt ist (Groß-/Kleinschreibung beachten)

**Problem:** "Not authenticated" Fehler
**Lösung:** Logout und erneut einloggen - Token könnte abgelaufen sein
