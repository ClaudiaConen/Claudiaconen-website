# Buchprojekt — Architektur & Erkenntnisse

> Notizen zur Buchprojekt-Landingpage `/buchprojekt` und ihrem Backend.
> Stand: Mai 2026, nach mehrtägigem Setup.
> **Zweck:** Beim nächsten Anfassen (oder beim Migrieren zu the-power-of-ai.team) wissen wir sofort, was wo liegt und warum.

---

## 1. Was ist das Buchprojekt?

Eine eigenständige Marketing-/Bewerbungs-Landingpage für das **Hauptbuch 2026 — „THE POWER OF AI · Premiere Edition"**, ein Hardcover-Sammelwerk mit 77 Mittelstand-Persönlichkeiten.

- **URL:** https://claudiaconen.com/buchprojekt
- **Konzeptionell gehört es zu:** the-power-of-ai.team
- **Aktuell hostet es:** claudiaconen.com (pragmatisch, Migration zu power-of-ai.team ist später geplant)

---

## 2. Das WICHTIGSTE: zwei Supabase-Projekte

claudiaconen.com nutzt **zwei verschiedene** Supabase-Projekte parallel. Das war die größte Stolperfalle des ganzen Setups.

| | Production (Hauptseite) | Buchprojekt-Backend |
|---|---|---|
| **Project Ref** | `szilqjmcqdydwwtitxyb` | `eammlfkjtbqcubxpfxes` |
| **Wer hat Owner-Zugriff?** | NIEMAND (Bolt-managed, kein Dashboard-Login möglich) | Claudia, eingeloggt mit `claudiaconen@umsatzstimme.de` |
| **Was läuft dort?** | Member-Login, Bookings, Adventskalender, Testimonials, Knowledge-Articles, Blog, KI-Manager-Anmeldungen | **NUR** Buchprojekt-Anmeldungen + Mail-Trigger |
| **Frontend-Client** | `src/lib/supabase.ts` (Standard, via `import.meta.env.VITE_SUPABASE_URL`) | `src/lib/supabaseBuchprojekt.ts` (URL + Anon-Key hardcoded) |

**Warum getrennt?**
Ursprünglich war geplant, alles in einem Projekt zu machen. Aber das Production-Projekt ist von Bolt automatisiert eingerichtet worden — wir haben keinen Owner-Zugriff darauf, können dort weder Tabellen anlegen noch Edge Functions deployen. Lösung: ein dediziertes zweites Supabase-Projekt **nur für das Buchprojekt**, auf das wir vollen Zugriff haben.

**Konsequenz für künftige Features:**
Wenn ein Feature dauerhaft auf claudiaconen.com leben und in der Production-DB landen soll, musst du Bolt-Zugang besorgen oder das Feature in eigenes Supabase-Projekt auslagern wie hier.

---

## 3. Resend (Mail) — auch zwei Accounts

Resend's Free-Plan erlaubt nur eine verifizierte Domain pro Account. Daher zwei Accounts:

| Account | Login-Email | Verifizierte Domain | Wofür benutzt |
|---|---|---|---|
| **A** | claudiaconen@umsatzstimme.de | `claudiaconen.com` | Buchprojekt-Mails (`from: noreply@claudiaconen.com`) |
| **B** | info@claudiaconen-akademie.de | `the-power-of-ai.team` | Bisher ungenutzt — bereit für spätere power-of-ai-Mails |

**Wichtig:** Resend lässt einen API-Key NUR Mails von der **verifizierten Domain seines Accounts** senden. Falsche Domain → HTTP 403 „domain not verified". Heißt: Wenn das Buchprojekt eines Tages zu power-of-ai.team migriert, müssen wir Account B verwenden und `from` auf `noreply@the-power-of-ai.team` umstellen.

---

## 4. Mail-Notification — der Lehr-Reiche Teil

### Was wir versucht haben (und verworfen):
- **Supabase Edge Function** `send-buchprojekt-notification` (Deno + Resend SDK)
  → Mehrere Redeploys über Dashboard sind nicht durchgegangen. Symptom: Code-Updates schienen erfolgreich, aber im Live-Code lief weiterhin die alte Version. Plus: Deno's HTTP-Header-Validierung (strikt nach ByteString-Regel) sprengte beim leiseren Whitespace-Zeichen im Resend-Key.

### Was jetzt läuft (stabil):
- **Postgres-Trigger via `pg_net`**
  → Sobald eine Zeile in `buchprojekt_anmeldungen` geinserted wird, feuert `trg_buchprojekt_admin_mail` automatisch und ruft Resend's HTTP-API direkt aus der Datenbank. Async, non-blocking, keine Edge Function nötig.

**Architektur:**

```
[Browser]
  └─ POST /buchprojekt-anmeldungen (REST, anon-Key, RLS-Policy „Anyone can submit")
       ↓
[Supabase Tabelle buchprojekt_anmeldungen]
  └─ AFTER INSERT TRIGGER (notify_buchprojekt_admin_mail)
       ↓ (pg_net.http_post — async)
[api.resend.com/emails]
       ↓
[claudiaconen@umsatzstimme.de]
[kontakt@the-power-of-ai.team]
```

**Vorteile dieser Architektur:**
- Nur ein Code-Pfad (SQL), kein Frontend-Kram für Mail-Versand
- Kein „der Mail-Versand schlägt fehl, aber die Anmeldung ist gespeichert"-Inkonsistenz
- Update der Mail-Logik = einmaliges SQL-Statement im SQL-Editor
- Resend API-Key liegt im Function-Body (in pg_proc, nur admin-lesbar)

**Wo finde ich was?**

| Komponente | Ort |
|---|---|
| Trigger-Function & Trigger | Supabase-Projekt `eammlfkjtbqcubxpfxes` → SQL-Editor → gespeichert als laufende Funktion |
| Tabelle | `buchprojekt_anmeldungen` (gleicher Projekt) |
| Storage-Bucket | `buchprojekt-files` (gleicher Projekt) |
| Frontend-Submit | `src/components/BuchprojektFormModal.tsx` |
| Resend-API-Key | Hardcoded im Trigger-SQL der Function `notify_buchprojekt_admin_mail` |
| Edge Function `send-buchprojekt-notification` | **Obsolet**, kann gelöscht werden — wir rufen sie nicht mehr |

---

## 5. Diagnose-Werkzeuge (wenn was nicht läuft)

### Sind Mails rausgegangen?
Im Supabase SQL-Editor des Buchprojekt-Projekts:

```sql
SELECT id, status_code, error_msg, content::text, created
FROM net._http_response
ORDER BY id DESC
LIMIT 10;
```

- `status_code: 200` → Resend nahm Mail an (vielleicht im Spam)
- `status_code: 401` → API-Key abgelaufen/falsch — neuen erstellen + im Trigger ersetzen
- `status_code: 403` → Sender-Domain nicht verifiziert
- `status_code: 422` → Resend-API-Validierung gescheitert (in `content` steht warum)
- `error_msg gesetzt, status_code null` → pg_net konnte nicht raus (Worker down?)

### Wie viele Anmeldungen sind drin?
Im Buchprojekt-Supabase → Table Editor → `buchprojekt_anmeldungen`. Sortieren nach `created_at desc`.

### Live-Counter zeigt komische Zahl?
Counter-Logik: `26 (Basis) + count(buchprojekt_anmeldungen)` mit Cap bei 77.
Code: `src/pages/Buchprojekt.tsx`, Konstanten `PARTICIPANTS_BASE` und `PARTICIPANTS_TARGET`.

---

## 6. Frontend-Konventionen für /buchprojekt

- **Farb-Palette:** POAI-Tokens (`poai-magenta`, `poai-turquoise`, `poai-gold`, `poai-violet`) in `tailwind.config.js`
- **Glas-Stil:** `.poai-glass` + `.poai-glass-tinted` in `src/index.css`
- **Apple-Vibe:** Aurora-Hintergrund, sanfte Scroll-Animationen, lila Akzent-Ränder, dezente Hover-Lifts
- **NIEMALS** Layout, Farben oder Animationen ändern, ohne expliziten Auftrag — die User-Erfahrung ist sorgfältig getuned

---

## 7. Datums-Konstanten (Stand Mai 2026)

| Wo | Was | Wert |
|---|---|---|
| `Buchprojekt.tsx` `LAUNCH_DEADLINE` | Bewerbungsschluss-Countdown | aktuell `today + 62 Tage` |
| `Buchprojekt.tsx` `PARTICIPANTS_BASE` | Basis-Counter | 26 |
| `Buchprojekt.tsx` `PARTICIPANTS_TARGET` | Ziel-Counter | 77 |
| `KIManagerAusbildung.tsx` | Ausbildungs-Start | 01.07.2026 |
| `KIManagerAusbildung.tsx` | Einführungspreis-Cutoff | 15.06.2026 |
| `KIManagerAusbildung.tsx` | Regulärpreis-Beginn | 16.06.2026 |
| `KIManagerAusbildung.tsx` | Countdown-Target | `2026-06-15T23:59:59` |

---

## 8. Workflow-Konventionen für diesen Repo

- **Ein Chat = ein Thema** (Buchprojekt-Chat ≠ Startseiten-Chat)
- **Keine Color/Layout-Änderungen** ohne explizite Freigabe
- **Surgical Edits** statt Komplett-Rewrites — eine Zeile genau, nicht 100 Zeilen geraten
- **Vor Live-Schalten:** PR auf Feature-Branch → Netlify-Preview-URL prüfen → erst nach Bestätigung mergen
- **Nach Merge:** Netlify deployt automatisch zu claudiaconen.com (~ 1–2 Min)

---

## 9. Bekannte offene Punkte (Stand Mai 2026)

- [ ] Resend-API-Key (`re_4kmasn…`) wurde im Chat geteilt — bei Gelegenheit rotieren (alten in Resend löschen, neuen anlegen, im SQL-Trigger ersetzen)
- [ ] Edge Function `send-buchprojekt-notification` ist obsolet — kann in Supabase Dashboard gelöscht werden, hat keinen Effekt mehr
- [ ] Migration zu power-of-ai.team noch offen (Phase 2): Repo umziehen, Buchprojekt-Page rüber, claudiaconen.com/buchprojekt → 301-Redirect zu power-of-ai.team/buchprojekt, Sender-Domain auf `noreply@the-power-of-ai.team` umstellen, Resend-Key aus Account B nehmen
- [ ] Test-Zeilen in DB ggf. noch zu löschen (Erika Testermann, Live-Test, Mail-Trigger-Test) — nur via Studio, weil RLS keine anon-DELETE erlaubt

---

## 10. Quick-References

- **Buchprojekt-Supabase Dashboard:** https://supabase.com/dashboard/project/eammlfkjtbqcubxpfxes
- **Resend-API-Keys:** https://resend.com/api-keys (zwei Accounts!)
- **Live-Seite:** https://claudiaconen.com/buchprojekt
- **Admin-Dashboard:** https://claudiaconen.com/admin/buchprojekt (nach Admin-Login)
- **Member-View:** https://claudiaconen.com/member/buchprojekt (nach Member-Login)
- **Sicherheits-Hinweis:** Resend-API-Key liegt im Repo-Code (Trigger-Function als String), nicht in einem Secret-Store. Akzeptables Risiko, weil pg_proc nur admin-lesbar ist. Bei Bedarf später auf Supabase Vault umstellen.
