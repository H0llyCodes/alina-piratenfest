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
  dresscode: "Piraten-Outfit erwünscht!",
  dresscodeHint: "Werdet gerne kreativ",

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

  // Initiale Wünsche für Alina
  initialWishes: [
    {
      id: "wish-gymhandschuhe",
      title: "Gymhandschuhe",
      description: "In süßem Pink, Rosa oder Lila",
      isGroupGift: false,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    },
    {
      id: "wish-charms-perlen",
      title: "Charms fürs Basteln mit Perlen",
      description: "Schöne bunte Charms und Anhänger zum Selberbasteln",
      isGroupGift: false,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    },
    {
      id: "wish-kirschkernkissen",
      title: "Kirschkernkissen",
      description: "Kirschkernkissen zum Wärmen",
      isGroupGift: false,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    },
    {
      id: "wish-proteinshaker",
      title: "Süßer Proteinshaker",
      description: "In Rosa, Lila oder Dunkelrot",
      isGroupGift: false,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    },
    {
      id: "wish-potterypainting",
      title: "Potterypainting (Keramik bemalen)",
      description: "Gutschein oder gemeinsames Keramik-Bemalen",
      isGroupGift: true,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    },
    {
      id: "wish-malstifte-textmarker",
      title: "Schöne Malstifte im Textmarker-Style",
      description: "Coole Stifte & Textmarker in Pastell- oder bunten Farben",
      isGroupGift: false,
      contributors: [],
      claimedBy: null,
      claimedAt: null
    }
  ]
};
