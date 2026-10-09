# AGENT – Dashboard (v1)

Next.js 14 (App Router) · TypeScript · Lucide Icons · Geist-Schrift · reines CSS

## Lokal starten

1. Node.js 18.18 oder neuer installieren (https://nodejs.org, „LTS“-Version).
2. Im Projektordner ein Terminal öffnen und ausführen:

       npm install
       npm run dev

3. Im Browser http://localhost:3000 öffnen. Läuft alles, siehst du das Dashboard.

Prüfen vor dem Veröffentlichen: `npm run lint`, `npm run typecheck`, `npm run build`.

## Auf GitHub und Vercel

1. Auf github.com ein neues, leeres Repository „agent“ anlegen.
2. Im Projektordner:

       git init
       git add .
       git commit -m "AGENT v1"
       git branch -M main
       git remote add origin https://github.com/DEIN-NAME/agent.git
       git push -u origin main

   Die `.gitignore` sorgt dafür, dass `node_modules`, `.next` und `.env`-Dateien nicht hochgeladen werden.
3. Auf vercel.com mit GitHub anmelden → „Add New… → Project“ → Repository „agent“ importieren.
4. Vercel erkennt Next.js automatisch. Keine Umgebungsvariablen nötig → „Deploy“.
5. Spätere Änderungen: lokal ändern, testen, dann `git add . && git commit -m "Beschreibung" && git push` – Vercel veröffentlicht automatisch neu.

## Struktur

- `app/` – Seiten (`page.tsx` = Dashboard, `einstellungen/page.tsx`), Layout, `globals.css` (Designsystem)
- `components/` – Sidebar, Header, Glocke, Profilformular usw.
- `lib/navigation.ts` – zentrale Navigationsliste (hier neue Bereiche ergänzen)
- `lib/user-context.tsx` – Benutzername und Profilbild
- `lib/notifications.ts` – Datenstruktur für spätere Benachrichtigungen

## Gut zu wissen

- Benutzername und Profilbild werden nur im Browser (localStorage) gespeichert, nicht auf einem Server.
- Das kleine Markenelement neben der Überschrift ist ein Platzhalter (`components/BrandMark.tsx`), bis ein AGENT-Logo vorliegt.
- Zoomen bleibt aus Gründen der Barrierefreiheit erlaubt. Kopierschutz gibt es nur für reine Bedienelemente; echten Schutz vor Kopieren oder Inspizieren kann eine Website nicht bieten.
