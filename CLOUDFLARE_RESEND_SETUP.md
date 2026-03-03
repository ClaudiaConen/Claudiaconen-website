# Resend Domain-Verifizierung mit Cloudflare

## Schritt-für-Schritt Anleitung

### 1. Domain in Resend hinzufügen

1. Gehe zu [Resend Dashboard](https://resend.com/domains)
2. Klicke auf "Add Domain"
3. Gib `claudiaconen.com` ein
4. Klicke auf "Add"

### 2. DNS Records kopieren

Resend zeigt dir jetzt **3 DNS-Records** an, die du hinzufügen musst:

#### SPF Record (TXT)
```
Type: TXT
Name: @ (oder claudiaconen.com)
Content: v=spf1 include:resend.com ~all
TTL: Auto
```

#### DKIM Record (TXT oder CNAME)
```
Type: TXT oder CNAME
Name: resend._domainkey
Content: [wird von Resend angezeigt - einzigartiger Key]
TTL: Auto
```

#### DMARC Record (TXT) - Optional aber empfohlen
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none
TTL: Auto
```

### 3. Records in Cloudflare hinzufügen

1. **Cloudflare Dashboard öffnen:** [cloudflare.com/login](https://cloudflare.com/login)
2. **Domain auswählen:** Klicke auf `claudiaconen.com`
3. **DNS-Verwaltung:** Klicke auf "DNS" im linken Menü
4. **Records hinzufügen:**

#### SPF Record hinzufügen:
- Klicke auf "Add record"
- **Type:** TXT
- **Name:** @ (oder leer lassen)
- **Content:** `v=spf1 include:resend.com ~all`
- **Proxy status:** DNS only (grauer Cloud)
- **TTL:** Auto
- Klicke "Save"

#### DKIM Record hinzufügen:
- Klicke auf "Add record"
- **Type:** TXT (oder CNAME, je nachdem was Resend anzeigt)
- **Name:** `resend._domainkey`
- **Content:** [Den Wert aus Resend Dashboard kopieren]
- **Proxy status:** DNS only (grauer Cloud)
- **TTL:** Auto
- Klicke "Save"

#### DMARC Record hinzufügen (optional):
- Klicke auf "Add record"
- **Type:** TXT
- **Name:** `_dmarc`
- **Content:** `v=DMARC1; p=none`
- **Proxy status:** DNS only (grauer Cloud)
- **TTL:** Auto
- Klicke "Save"

### 4. Verifizierung in Resend

1. Zurück zum [Resend Dashboard](https://resend.com/domains)
2. Bei `claudiaconen.com` auf "Verify" klicken
3. Resend prüft die DNS-Records (kann 1-5 Minuten dauern)
4. Status sollte auf "Verified" ✅ wechseln

**Wichtig:** DNS-Änderungen können 5-60 Minuten dauern. Manchmal bis zu 24 Stunden.

### 5. Edge Function aktualisieren

Sobald die Domain verifiziert ist, sag mir Bescheid! Dann ändere ich:

**Vorher (Test-Modus):**
```typescript
from: 'Claudia Conen <onboarding@resend.dev>',
```

**Nachher (Production-Modus):**
```typescript
from: 'Claudia Conen <noreply@claudiaconen.com>',
```

## Vorteile nach Verifizierung

✅ **E-Mails an ALLE Adressen** - nicht nur Test-E-Mails
✅ **Professioneller Absender** - deine eigene Domain
✅ **Bessere Zustellrate** - weniger Spam-Ordner
✅ **Vertrauen** - Empfänger sehen deine echte Domain
✅ **Branding** - konsistente Markenidentität

## Troubleshooting

### DNS-Records werden nicht erkannt?

**Warte 15-30 Minuten** und versuche es erneut.

**Prüfe die Records:**
```bash
# SPF prüfen
nslookup -type=TXT claudiaconen.com

# DKIM prüfen
nslookup -type=TXT resend._domainkey.claudiaconen.com

# DMARC prüfen
nslookup -type=TXT _dmarc.claudiaconen.com
```

### Cloudflare Proxy-Status

**WICHTIG:** E-Mail DNS-Records müssen auf "DNS only" (grauer Cloud) stehen, NICHT auf "Proxied" (oranger Cloud)!

### SPF Record bereits vorhanden?

Falls du bereits einen SPF-Record hast, musst du ihn erweitern:

**Alt:**
```
v=spf1 include:_spf.google.com ~all
```

**Neu:**
```
v=spf1 include:_spf.google.com include:resend.com ~all
```

### Mehrere SPF Records?

**Nicht erlaubt!** Du darfst nur EINEN TXT-Record mit `v=spf1` haben. Kombiniere alle includes in einem Record.

## Nächste Schritte

1. DNS-Records in Cloudflare hinzufügen
2. 15-30 Minuten warten
3. In Resend auf "Verify" klicken
4. Sobald verifiziert ✅, mir Bescheid sagen
5. Ich aktualisiere die Edge Function für Production-Modus

Bei Fragen oder Problemen, sag Bescheid!
