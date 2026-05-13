# Mushin · 無心

> Das mentale Dojo. Ein State-Intervention-System mit OpenAI im Backend.

Nicht ein Chatbot. Nicht eine Therapie-App. Ein Trainingsraum.
Sensei spricht wenig — aber im richtigen Moment.

---

## Schritt 1 — Auf Vercel hochladen (ohne Terminal, im Browser)

1. Geh auf **vercel.com** und logge dich ein.
2. Oben auf **"Add New..."** klicken → **"Project"**.
3. Du siehst Optionen für GitHub etc. **Ignorieren.** Such auf der Seite nach
   einer Option für "Import" oder Drag-and-Drop, oder klick auf **"Browse all
   templates"** ganz unten — Vercel hat über die Jahre verschiedene UIs gehabt.

**Wenn es keinen Drag-and-Drop-Upload gibt** (was 2025 oft so ist), dann:

1. Geh auf **github.com**, melde dich an oder registriere dich (kostenlos).
2. Klick auf das Plus-Symbol oben rechts → **"New repository"**.
3. Name: `mushin`. **Public** oder **Private** ist egal. Erstellen.
4. Auf der neuen Repo-Seite siehst du den Hinweis "uploading an existing file"
   oder einen Button **"uploading an existing file"** als Link.
5. Klick drauf. Zieh den entpackten `mushin`-Ordnerinhalt rein
   (alle Dateien, nicht den Ordner selbst).
6. Scroll nach unten, klick **"Commit changes"**.
7. Zurück auf Vercel: **"Add New" → "Project"** → GitHub auswählen →
   `mushin`-Repo auswählen → **Import**.

---

## Schritt 2 — API-Key bei Vercel hinterlegen

Bevor du auf "Deploy" klickst:

1. Auf der Konfigurationsseite klicke **"Environment Variables"** auf.
2. Name: **`OPENAI_API_KEY`**
3. Value: dein OpenAI-Key (beginnt mit `sk-...`)
4. Häkchen bei Production, Preview, Development.
5. **"Save"** drücken.
6. **"Deploy"** drücken.

Nach 1-2 Minuten ist die App live unter einer URL wie `mushin-deinname.vercel.app`.

---

## Schritt 3 — Auf dem Smartphone

1. URL auf dem iPhone in Safari öffnen.
2. Tippe auf das Teilen-Symbol unten in der Mitte.
3. Scroll nach unten → **"Zum Home-Bildschirm"**.
4. Bestätigen → fertig.

Du hast jetzt ein Mushin-Icon auf dem iPhone. Beim Tippen startet es im
Vollbild, ohne Browser-Leiste, wie eine echte App.

---

## Schritt 4 — Testen, ob OpenAI antwortet

Im Antwort-Bildschirm steht unten ein kleines Label:
- **"Sensei live"** = OpenAI antwortet (über API)
- **"Sensei offline"** = API ist gerade nicht erreichbar, Backend-Fallback
- **"Lokal"** = Browser konnte API gar nicht erreichen, Client-Fallback

Wenn dauerhaft "Sensei offline" oder "Lokal" erscheint, ist meist:
- Key falsch oder Tippfehler
- Key nicht in Production-Environment gespeichert
- Nach Hinzufügen nicht neu deployed (Vercel-Dashboard → Redeploy)

---

## Was sind die Kosten?

OpenAI mit `gpt-4o-mini`: ca. 0.0001-0.0003 USD pro Antwort.
1000 Anfragen kosten weniger als 30 Cent.

Für persönliche Nutzung wirst du in einem Monat wahrscheinlich keine
2 Euro ausgeben. Trotzdem: setz dir bei OpenAI ein Monatslimit
(platform.openai.com → Settings → Limits).

Wenn du gar kein Geld ausgeben willst: Die App läuft auch ohne Key,
mit der lokalen Heuristik. Funktioniert. Weniger nuanciert, aber sauber.

---

## Wie Sensei funktioniert

```
Frontend (Sensei.tsx)
  ↓ fetch POST /api/sensei

Backend (api/sensei/route.ts)
  ↓ System-Prompt mit Mushin-Verfassung
  ↓ OpenAI gpt-4o-mini aufrufen
  ↓ JSON validieren (state, intervention, action)
  ↓ Bei Fehler: lokale Heuristik

Frontend
  ↓ Antwort anzeigen (max 3 Zeilen + 1 Modul-Vorschlag)
  ↓ Pattern speichern (nur Zustand + line1, NIE Inhalt)
```

**System-Prompt-Garantien:**
- Keine Therapie-Sprache
- Maximal 3 Zeilen
- IMMER Körperanker
- Bei "spiral" → action="emergency"
- Bei Cantienica-Level → präzise Begriffe (Levator ani, Zwerchfell, etc.)

---

## Wenn du lokal entwickeln willst (optional)

```bash
cd mushin
npm install
cp .env.example .env.local
# Key in .env.local eintragen
npm run dev
```

Öffne http://localhost:3000

---

## Philosophie

- Stand first. Der Körper kommt vor der Analyse.
- Wenig sprechen. Drei Zeilen reichen meistens.
- Reduzieren, nicht aufblähen.
- Sensei ist erfolgreich, wenn du gehst.

Geschwindigkeit entsteht durch weniger Widerstand.
Richte den Körper aus. Der Geist folgt.
