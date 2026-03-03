# Resend E-Mail Setup

## Status: ✅ Konfiguriert

Der Resend API Key wurde erfolgreich konfiguriert.

## API Key
```
re_LvP4boL9_BDbfrbQzeHEJJ7YdZAAeYaG3
```

## Wichtige Hinweise

### 1. Domain-Verifizierung (empfohlen für Production)

Aktuell nutzt das System die Test-Absenderadresse. Für professionelle E-Mails solltest du deine Domain verifizieren:

1. Gehe zu [Resend Dashboard](https://resend.com/domains)
2. Füge `claudiaconen.com` hinzu
3. Kopiere die DNS-Records
4. Füge diese bei deinem Domain-Provider (z.B. Hetzner, Cloudflare) hinzu:
   - SPF Record
   - DKIM Record
   - DMARC Record (optional, aber empfohlen)
5. Warte auf Verifizierung (kann 24-48h dauern)

Dann ändere in der Edge Function:
```typescript
from: 'Claudia Conen <noreply@claudiaconen.com>',
```

### 2. Test-Modus (aktuell aktiv)

Für erste Tests kannst du die onboarding Domain nutzen:
```typescript
from: 'Claudia Conen <onboarding@resend.dev>',
```

**Achtung:** Test-E-Mails können nur an die E-Mail-Adresse gesendet werden, mit der du dich bei Resend registriert hast!

### 3. Production-Modus

Sobald deine Domain verifiziert ist:
- E-Mails können an jede E-Mail-Adresse versendet werden
- Absender zeigt deine echte Domain
- Bessere Zustellbarkeit
- Professionellerer Eindruck

## API Limits (Free Plan)

- 3.000 E-Mails pro Monat kostenlos
- 100 E-Mails pro Tag
- Für mehr: Upgrade auf Pro Plan ($20/Monat für 50.000 E-Mails)

## Testen

1. Gehe auf die Website zu einem Artikel mit Checkliste
2. Klicke auf "Erweiterte Checkliste herunterladen"
3. Gib deine E-Mail-Adresse ein (im Test-Modus nur die bei Resend registrierte!)
4. Prüfe dein Postfach (auch Spam-Ordner!)
5. Klicke auf den Bestätigungslink
6. Lade die Checkliste herunter

## Troubleshooting

### Keine E-Mail erhalten?

1. **Spam-Ordner prüfen**
2. **Test-Modus?** → Nur registrierte E-Mail funktioniert
3. **Resend Dashboard prüfen:** [Logs anschauen](https://resend.com/emails)
4. **Supabase Edge Function Logs prüfen:** Project → Edge Functions → Logs

### E-Mail kommt an, aber sieht komisch aus?

- Manche E-Mail-Clients blockieren CSS/Styling
- HTML ist robust für alle gängigen Clients optimiert

## Security

- API Key ist als Environment Variable gespeichert
- Nie im Code committen
- Bei Kompromittierung: Neuen Key in Resend erstellen und in Supabase updaten
