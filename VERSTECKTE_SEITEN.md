# Versteckte Seiten – „3 Wege“ und alle Unterseiten

Stand: 28.10.2026. Sichtbar ist zurzeit nur die **Masterclass UNVERWECHSELBAR** (`/masterclass`).

Die folgenden Seiten sind **nicht gelöscht und nicht umgeleitet**. Sie funktionieren weiterhin unter ihrer Adresse,
sind aber unsichtbar gestellt:

- kein Eintrag im Menü, im Footer oder in der Linkleiste unten,
- nicht in der Sitemap,
- `noindex` gesetzt, damit Google sie nicht anzeigt.

| Seite | Adresse | Datei |
|---|---|---|
| Drei Wege zu deiner Wirkung (Übersicht) | https://claudiaconen.com/3-wege | `public/3-wege.html` |
| Angebote im Vergleich | https://claudiaconen.com/angebote | `public/angebote.html` |
| Deine Abkürzung (1:1) | https://claudiaconen.com/abkuerzung | `public/abkuerzung.html` |
| Live-Workshop Köln | https://claudiaconen.com/live-workshop | `public/live-workshop.html` |
| Unverwechselbar. Das 12-Wochen-Mentoring | https://claudiaconen.com/mentoring-programm | `public/mentoring-programm.html` |
| Mentoring-Inhalte (für Teilnehmende) | https://claudiaconen.com/mentoring-inhalte | `public/mentoring-inhalte.html` |
| Danke-Seite Live-Workshop | https://claudiaconen.com/live-workshop-danke | `public/live-workshop-danke.html` |
| Danke-Seite Mentoring | https://claudiaconen.com/mentoring-danke | `public/mentoring-danke.html` |
| Danke-Seite 1:1 | https://claudiaconen.com/1zu1-danke | `public/1zu1-danke.html` |

Die Seite „3 Wege“ verlinkt weiterhin auf alle Unterseiten. Wer `/3-wege` kennt, findet also alles wieder.

## Eine Seite wieder sichtbar machen

1. In der HTML-Datei `noindex,follow` zurück auf `index,follow` stellen.
2. In `scripts/generate-sitemap.ts` die auskommentierte Zeile wieder einschalten.
3. In `src/lib/megaMenuData.ts` die auskommentierte Kachel wieder einschalten (Menü „Für Experten“).
