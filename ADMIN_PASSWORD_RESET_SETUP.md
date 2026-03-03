# Admin Passwort-Zurücksetzen - Fehlerbehebung

## Problem
Keine E-Mail für das Zurücksetzen des Admin-Passworts wird empfangen.

## Ursachen und Lösungen

### 1. Resend API Key in Supabase Edge Functions fehlt

**Problem:** Der RESEND_API_KEY ist in der `.env` Datei vorhanden, aber Edge Functions haben keinen Zugriff darauf. Sie benötigen ihre eigenen Secrets.

**Lösung:** Setze den RESEND_API_KEY als Secret in Supabase:

```bash
# In deinem Terminal:
npx supabase secrets set RESEND_API_KEY=re_K81nTq2Y_EVFfuxRqxG5sjbwFydHYG3HB
```

**Alternative über Supabase Dashboard:**
1. Gehe zu [Supabase Dashboard](https://supabase.com/dashboard)
2. Wähle dein Projekt aus
3. Gehe zu **Settings** → **Edge Functions**
4. Unter **Secrets** füge hinzu:
   - Name: `RESEND_API_KEY`
   - Value: `re_K81nTq2Y_EVFfuxRqxG5sjbwFydHYG3HB`

Nach dem Setzen des Secrets müssen die Edge Functions **neu deployed** werden.

### 2. Domain-Verifizierung fehlt

**Problem:** Die E-Mail wird von `noreply@claudiaconen-akademie.de` versendet, aber diese Domain ist nicht bei Resend verifiziert.

**Resend Test-Modus Einschränkungen:**
- E-Mails können nur von `onboarding@resend.dev` versendet werden
- E-Mails können nur an die bei Resend registrierte E-Mail-Adresse gesendet werden

**Temporäre Lösung (für Tests):**

Ändere die Edge Function `request-password-reset/index.ts` Zeile 98:

```typescript
// VORHER:
from: "Claudia Conen Akademie <noreply@claudiaconen-akademie.de>",

// NACHHER (für Tests):
from: "Claudia Conen Akademie <onboarding@resend.dev>",
```

**Permanente Lösung (empfohlen):**

1. Gehe zu [Resend Dashboard - Domains](https://resend.com/domains)
2. Klicke auf **Add Domain**
3. Füge `claudiaconen-akademie.de` hinzu
4. Kopiere die angezeigten DNS-Records:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT oder CNAME)
   - **DMARC Record** (TXT, optional)

5. Füge diese Records bei deinem Domain-Provider hinzu:
   - Gehe zu deinem Domain-Provider (z.B. Hetzner, Cloudflare, etc.)
   - Navigiere zu den DNS-Einstellungen für `claudiaconen-akademie.de`
   - Füge die Records hinzu

6. Warte auf die Verifizierung (kann 24-48 Stunden dauern)

7. Sobald verifiziert, kannst du E-Mails von `noreply@claudiaconen-akademie.de` senden

### 3. E-Mail landet im Spam

**Lösung:**
- Prüfe den Spam-Ordner
- Mit verifierter Domain ist die Zustellbarkeit besser
- DMARC Record hilft gegen Spam-Klassifizierung

## Schritt-für-Schritt Anleitung

### Sofort-Lösung (funktioniert jetzt):

1. **Setze das Resend Secret in Supabase:**
   ```bash
   npx supabase secrets set RESEND_API_KEY=re_K81nTq2Y_EVFfuxRqxG5sjbwFydHYG3HB
   ```

2. **Ändere temporär die Absender-Adresse** in der Edge Function auf `onboarding@resend.dev`

3. **Deploy die Edge Function neu:**
   Der Deployment-Befehl wird automatisch ausgeführt, wenn du die Datei änderst

4. **Teste mit der bei Resend registrierten E-Mail-Adresse**
   - Nur diese E-Mail-Adresse empfängt E-Mails im Test-Modus
   - Prüfe bei Resend, mit welcher E-Mail du registriert bist

### Langfristige Lösung (professionell):

1. **Verifiziere die Domain** wie oben beschrieben
2. **Behalte** `noreply@claudiaconen-akademie.de` als Absender
3. **E-Mails können dann an jede E-Mail-Adresse** gesendet werden

## Testen

Nach dem Setup:

1. Gehe zu `https://claudiaconen-akademie.de/admin/passwort-vergessen`
2. Gib die E-Mail-Adresse ein:
   - Im Test-Modus: Die bei Resend registrierte E-Mail
   - Mit verifierter Domain: `info@claudiaconen-akademie.de`
3. Prüfe dein Postfach (inkl. Spam)
4. Klicke auf den Link in der E-Mail
5. Setze ein neues Passwort

## Debugging

### Prüfe Resend Logs:
[https://resend.com/emails](https://resend.com/emails)

Hier siehst du:
- Ob die E-Mail versendet wurde
- Fehler bei der Zustellung
- Delivery Status

### Prüfe Supabase Edge Function Logs:
1. Gehe zu [Supabase Dashboard](https://supabase.com/dashboard)
2. Wähle dein Projekt
3. **Edge Functions** → **request-password-reset** → **Logs**

Hier siehst du:
- Ob die Function aufgerufen wurde
- Console Logs und Fehler
- API Antworten von Resend

## Wichtige Hinweise

- **Nie den API Key im Code committen**
- **Test-Modus ist nur für Entwicklung geeignet**
- **Für Production immer Domain verifizieren**
- **Secrets nach dem Setzen dauern 1-2 Minuten bis sie aktiv sind**
- **Nach Änderung der Secrets Edge Functions neu deployen**

## Resend Limits (Free Plan)

- 3.000 E-Mails/Monat kostenlos
- 100 E-Mails/Tag
- Upgrade auf Pro: $20/Monat für 50.000 E-Mails
