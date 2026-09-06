// ==========================================
// ALINAS PIRATEN-PARTY KONFIGURATION
// ==========================================

export const PARTY_CONFIG = {
  pirateCaptain: "Alina",
  title: "Alinas Piratenfest",
  subtitle: "Ahoi, meine Piratenfreunde, ich freue mich schon auf einen sehr spaßigen und piratischen Abend mit euch! ~ Captain Alina",

  // Datum & Uhrzeit (Freitag, 02. Oktober, 19 Uhr)
  targetDate: "2026-10-02T19:00:00",
  displayDate: "Freitag, 02. Oktober 2026",
  displayTime: "Ab 19:00 Uhr Open End",

  // Koordinaten & Adresse
  locationName: "Alinas Piratenquartier",
  address: "Am Kirchfeld 58, 85368 Wang",
  mapsQuery: "Am Kirchfeld 58, 85368 Wang",
  locationHint: "Klingeln bei Alina. Folgt einfach den Lichtern und Piraten-Flaggen!",

  // Dresscode
  dresscode: "Piraten-Kluft erwünscht! (Dreispitz, Bandana, Augenklappe oder Ringelshirt)",
  dresscodeHint: "Wer ohne Piraten-Accessoire kommt, muss zur Strafe kielholen!",

  // Was die Gastgeber stellen
  hostSupplies: [
    "Käpt'ns Piraten-Bowle & Getränke",
    "Grillfeuer & Kohle zum Brutzeln",
    "Frisches Krustenbrot & Dips",
    "Teller, Besteck, Becher & Servietten"
  ],

  adminPin: "ahoi",

  // Kategorien für die Kombüse (OHNE Getränke!)
  buffetCategories: [
    { id: "deftig", label: "Deftiges & Salate", icon: "🍕" },
    { id: "suess", label: "Kuchen, Obst & Süßes", icon: "🧁" },
    { id: "snacks", label: "Knabberkram & Dips", icon: "🍿" },
    { id: "sonstiges", label: "Sonstiges Zeug", icon: "📦" }
  ],

  // Keine Platzhalter – die Liste ist leer zum echten Eintragen!
  initialBuffetItems: [],

  // Keine Platzhalter – Wünsche können selbst eingetragen werden!
  initialWishes: []
};
