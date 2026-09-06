# 🏴‍☠️ Alinas Piraten-Geburtstags-Website

Eine stilvolle, interaktive Geburtstagseinladung & Party-Zentrale im Piraten-Look mit Buffet-Mitbringliste, Alinas Schatzkiste (Wunschliste), Logbuch (Eckdaten mit Kalender-Export) und Flaschenpost.

---

## 🚀 Schnellstart (Lokal auf deinem Rechner)

1. Öffne das Terminal in diesem Ordner.
2. Installiere die Abhängigkeiten (falls noch nicht geschehen):
   ```bash
   npm install
   ```
3. Starte den lokalen Server:
   ```bash
   npm run dev
   ```
4. Klicke auf den angezeigten Link (in der Regel `http://localhost:3000`), um die Website im Browser zu bewundern!

---

## ⚙️ Wie du Party-Infos, Datum & Wünsche anpasst

Alle Einstellungen befinden sich in einer einzigen, übersichtlichen Datei:
👉 **[`src/config.js`](./src/config.js)**

Dort kannst du ganz bequem anpassen:
- **`title` & `subtitle`**: Die Überschriften und Piratensprüche.
- **`targetDate`**: Das Datum für den Live-Countdown (z.B. `"2026-09-19T18:00:00"`).
- **`displayDate` & `displayTime`**: Wie das Datum für die Gäste lesbar formatiert ist.
- **`locationName` & `address`**: Wo die Party stattfindet (inklusive Google Maps-Verlinkung).
- **`dresscode`**: Hinweise zum Piraten-Outfit.
- **`hostSupplies`**: Was ihr als Gastgeber schon bereitstellt (z.B. Bowle, Grillfeuer, Brot).
- **`initialWishes`**: Alinas Geschenkideen für die Schatzkiste.
- **`adminPin`**: Geheimer Code (Standard: `ahoi`) zum Zurücksetzen von Testdaten.

---

## 🌐 Wie du die Seite online für alle Gäste veröffentlichst (100% kostenlos)

Damit du den Link per WhatsApp an alle Freunde schicken kannst und jeder von unterwegs eintragen kann, empfehlen wir **Vercel** + **Supabase**:

### Schritt 1: Kostenlose Supabase-Datenbank einrichten (Dauert ca. 3 Minuten)
1. Gehe auf [supabase.com](https://supabase.com) und erstelle einen kostenlosen Account.
2. Erstelle ein neues Projekt (z.B. "alina-party").
3. Klicke im Menü links auf **SQL Editor** und führe folgenden kurzen Befehl aus, um die beiden Tabellen anzulegen:

```sql
-- Tabelle für das Buffet
create table buffet_items (
  id text primary key,
  "guestName" text not null,
  item text not null,
  category text not null,
  dietary text,
  notes text,
  "createdAt" text
);

-- Tabelle für die Wunschliste
create table wishes (
  id text primary key,
  title text not null,
  description text,
  priority text,
  "claimedBy" text,
  "claimedAt" text
);

-- Leserechte & Schreibrechte für Gäste aktivieren
alter table buffet_items enable row level security;
alter table wishes enable row level security;

create policy "Public Read Buffet" on buffet_items for select using (true);
create policy "Public Insert Buffet" on buffet_items for insert with check (true);
create policy "Public Delete Buffet" on buffet_items for delete using (true);

create policy "Public Read Wishes" on wishes for select using (true);
create policy "Public Update Wishes" on wishes for update using (true);
create policy "Public Insert Wishes" on wishes for insert with check (true);
```

4. Gehe auf **Project Settings -> API** und kopiere:
   - `Project URL`
   - `anon public key`

### Schritt 2: Kostenloses Hosting auf Vercel
1. Lade den Ordner auf GitHub hoch (oder nutze das Vercel CLI: `npx vercel`).
2. Alternativ: Importiere das GitHub-Repository in [vercel.com](https://vercel.com).
3. Füge in den Vercel-Projekteinstellungen (unter *Environment Variables*) die beiden Werte ein:
   - `VITE_SUPABASE_URL` = deine Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = dein Anon Key
4. Klicke auf **Deploy** – fertig! Du erhältst sofort eine hübsche URL (z.B. `https://alinas-piratenfest.vercel.app`), die du verschicken kannst.

---

## 🎨 Features im Überblick

- 🏴‍☠️ **Authentisches Piraten-Design:** Pergament-Textur, Wachssiegel, Jolly-Roger-Flagge, Kraken-Tentakel & Goldmünzen.
- ⏳ **Live-Countdown:** Zählt die Tage, Stunden, Minuten und Sekunden bis zur Kaperfahrt.
- 🍖 **Interaktive Kombüse (Buffetliste):**
  - Kategorien (Deftig, Süß, Drinks, Snacks, Sonstiges)
  - Ernährungs-Badges (Veggie, Vegan, Glutenfrei)
  - Automatische Goldmünzen-Animation & Konfetti beim Eintragen!
- 🎁 **Die Schatzkiste (Wunschliste):**
  - Wünsche reservieren ("kapern"), damit nichts doppelt geschenkt wird.
- 📅 **Logbuch & Kalender-Export:**
  - 1-Klick-Download für Apple Kalender / Outlook (.ics)
  - 1-Klick zu Google Kalender
  - 1-Klick zu Google Maps
- 🍾 **Flaschenpost:** Seemannsgrüße für Alina hinterlassen.
- 🔊 **Web Audio Effekte:** Münz-Klingeln und Kanonenschuss (jederzeit stummschaltbar).
- 📱 **Mobile First:** Perfekt bedienbar auf iPhone und Android-Smartphones.
