import React from 'react';

// =========================================================================
// 2D COMIC-ILLUSTRATIONEN (KINDERBUCH-STIL)
// Kräftige schwarze Outlines, weiche Formen, Cell-Shading, Glanzlichter
// =========================================================================

export function CutePirate({ size = 120, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rumpf mit Ringelshirt */}
        <path d="M 45,150 C 45,120 55,108 80,108 C 105,108 115,120 115,150 Z" fill="#f8fafc" />
        <path d="M 48,122 C 58,118 102,118 112,122 L 114,130 C 100,126 60,126 46,130 Z" fill="#ef4444" stroke="none" />
        <path d="M 45,138 C 58,134 102,134 115,138 L 115,145 C 100,141 60,141 45,145 Z" fill="#ef4444" stroke="none" />

        {/* Hals */}
        <rect x="73" y="98" width="14" height="14" rx="4" fill="#fcd34d" />
        <rect x="73" y="103" width="14" height="5" fill="#f59e0b" stroke="none" />

        {/* Kopf */}
        <circle cx="80" cy="75" r="32" fill="#fef3c7" />
        <path d="M 52,85 C 60,104 100,104 108,85 C 98,96 62,96 52,85 Z" fill="#fde68a" stroke="none" />

        {/* Rote Wangen */}
        <circle cx="62" cy="83" r="6" fill="#f87171" opacity="0.65" stroke="none" />
        <circle cx="98" cy="83" r="6" fill="#f87171" opacity="0.65" stroke="none" />

        {/* Rechter Blick / Kullerauge */}
        <ellipse cx="94" cy="74" rx="4.5" ry="6" fill="#1e293b" />
        <circle cx="96" cy="72" r="2" fill="#ffffff" stroke="none" />

        {/* Augenklappe links */}
        <path d="M 52,65 Q 80,72 108,68" fill="none" strokeWidth="2.5" />
        <ellipse cx="66" cy="74" rx="8" ry="7.5" fill="#1e293b" />
        <circle cx="68" cy="72" r="2" fill="#ffffff" opacity="0.3" stroke="none" />

        {/* Nase & Lächeln */}
        <path d="M 80,75 Q 83,78 80,80" fill="none" strokeWidth="2.5" />
        <path d="M 73,85 Q 80,92 87,85" fill="none" strokeWidth="3" />

        {/* Piratenhut */}
        <path d="M 28,62 C 35,32 60,20 80,20 C 100,20 125,32 132,62 C 110,54 98,58 80,58 C 62,58 50,54 28,62 Z" fill="#1e293b" />
        <path d="M 28,62 C 50,54 62,58 80,58 C 98,58 110,54 132,62" fill="none" stroke="#fbbf24" strokeWidth="3.5" />
        
        {/* Totenkopf auf Hut */}
        <circle cx="80" cy="40" r="7" fill="#ffffff" />
        <path d="M 76,46 L 84,46 L 83,49 L 77,49 Z" fill="#ffffff" />
        <circle cx="78" cy="40" r="1.5" fill="#1e293b" stroke="none" />
        <circle cx="82" cy="40" r="1.5" fill="#1e293b" stroke="none" />

        {/* Rote Feder */}
        <path d="M 108,35 C 122,20 135,22 138,26 C 136,36 124,42 110,42 Z" fill="#ef4444" />
        <path d="M 112,33 Q 125,28 132,26" fill="none" stroke="#b91c1c" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function FriendlyOctopus({ size = 110, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Tentakeln */}
        <path d="M 35,95 Q 15,115 28,135 Q 40,140 45,120 Q 48,105 52,98" fill="#14b8a6" />
        <path d="M 115,95 Q 135,115 122,135 Q 110,140 105,120 Q 102,105 98,98" fill="#14b8a6" />
        <path d="M 52,105 Q 45,135 62,142 Q 74,138 68,115" fill="#2dd4bf" />
        <path d="M 98,105 Q 105,135 88,142 Q 76,138 82,115" fill="#2dd4bf" />
        <path d="M 72,110 Q 75,142 80,142 Q 85,142 78,110" fill="#2dd4bf" />

        {/* Saugnäpfe */}
        <circle cx="28" cy="125" r="3.5" fill="#ccfbf1" stroke="#1e293b" strokeWidth="2" />
        <circle cx="122" cy="125" r="3.5" fill="#ccfbf1" stroke="#1e293b" strokeWidth="2" />
        <circle cx="62" cy="132" r="3" fill="#ccfbf1" stroke="#1e293b" strokeWidth="2" />
        <circle cx="88" cy="132" r="3" fill="#ccfbf1" stroke="#1e293b" strokeWidth="2" />

        {/* Haupt-Kopf */}
        <ellipse cx="75" cy="72" rx="42" ry="38" fill="#2dd4bf" />
        <path d="M 37,85 C 45,105 105,105 113,85 C 100,100 50,100 37,85 Z" fill="#0d9488" stroke="none" />

        {/* Große Kulleraugen */}
        <ellipse cx="60" cy="72" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="63" cy="69" r="3" fill="#ffffff" stroke="none" />
        <circle cx="58" cy="75" r="1.5" fill="#ffffff" stroke="none" />

        <ellipse cx="90" cy="72" rx="7.5" ry="9" fill="#1e293b" />
        <circle cx="93" cy="69" r="3" fill="#ffffff" stroke="none" />
        <circle cx="88" cy="75" r="1.5" fill="#ffffff" stroke="none" />

        {/* Bäckchen & Lächeln */}
        <ellipse cx="50" cy="80" rx="5" ry="3" fill="#f43f5e" opacity="0.5" stroke="none" />
        <ellipse cx="100" cy="80" rx="5" ry="3" fill="#f43f5e" opacity="0.5" stroke="none" />
        <path d="M 70,80 Q 75,87 80,80" fill="none" strokeWidth="3" />

        {/* Kleines Kopftuch */}
        <path d="M 45,46 Q 75,32 105,46 Q 95,36 75,36 Q 55,36 45,46 Z" fill="#ef4444" />
        <circle cx="42" cy="48" r="4" fill="#ef4444" />

        {/* Glanzlicht */}
        <path d="M 52,52 Q 62,44 78,44" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function TreasureChest({ size = 110, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rumpf */}
        <path d="M 28,80 L 32,130 C 33,136 40,140 48,140 L 102,140 C 110,140 117,136 118,130 L 122,80 Z" fill="#b45309" />
        <path d="M 32,80 L 35,130 L 45,130 L 40,80 Z" fill="#78350f" stroke="none" />
        <path d="M 105,80 L 105,130 L 115,130 L 118,80 Z" fill="#78350f" stroke="none" />

        {/* Goldbänder */}
        <rect x="42" y="80" width="10" height="58" fill="#fbbf24" />
        <rect x="98" y="80" width="10" height="58" fill="#fbbf24" />

        {/* Goldmünzen */}
        <ellipse cx="75" cy="74" rx="42" ry="14" fill="#1e293b" />
        <circle cx="58" cy="72" r="9" fill="#fcd34d" />
        <circle cx="72" cy="67" r="10" fill="#fcd34d" />
        <circle cx="88" cy="70" r="9" fill="#fcd34d" />
        <circle cx="65" cy="62" r="8" fill="#fde68a" />
        <circle cx="80" cy="61" r="9" fill="#fde68a" />

        {/* Edelsteine */}
        <polygon points="96,62 102,57 108,62 105,69 99,69" fill="#ef4444" />
        <polygon points="46,65 52,60 58,65 55,72 49,72" fill="#3b82f6" />

        {/* Deckel */}
        <path d="M 22,50 C 22,26 50,22 75,22 C 100,22 128,26 128,50 L 120,62 L 30,62 Z" fill="#d97706" />
        <path d="M 40,24 C 40,40 40,55 38,62" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <path d="M 110,24 C 110,40 110,55 112,62" fill="none" stroke="#fbbf24" strokeWidth="3" />

        {/* Schloss */}
        <rect x="70" y="82" width="10" height="13" rx="3" fill="#f59e0b" />
        <circle cx="75" cy="87" r="2" fill="#1e293b" />
      </g>
    </svg>
  );
}

export function PirateShip({ size = 110, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rumpf */}
        <path d="M 22,95 Q 26,128 45,130 L 105,130 Q 128,126 135,95 Z" fill="#b45309" />
        <path d="M 25,108 Q 75,115 131,108" fill="none" stroke="#78350f" strokeWidth="2.5" />
        <path d="M 18,95 L 138,95" fill="none" stroke="#fbbf24" strokeWidth="4" />

        {/* Bullaugen */}
        <circle cx="50" cy="112" r="4.5" fill="#fcd34d" stroke="#1e293b" strokeWidth="2" />
        <circle cx="75" cy="113" r="4.5" fill="#fcd34d" stroke="#1e293b" strokeWidth="2" />
        <circle cx="100" cy="112" r="4.5" fill="#fcd34d" stroke="#1e293b" strokeWidth="2" />

        {/* Mast */}
        <line x1="75" y1="95" x2="75" y2="28" strokeWidth="4.5" stroke="#78350f" />

        {/* Großsegel */}
        <path d="M 45,42 C 60,38 90,38 105,42 C 95,58 95,78 108,88 C 88,84 62,84 42,88 C 55,78 55,58 45,42 Z" fill="#f8fafc" />
        <circle cx="75" cy="62" r="6" fill="#1e293b" stroke="none" />
        <path d="M 72,66 L 78,66" stroke="#1e293b" strokeWidth="1.5" />

        {/* Vorsegel & Wimpel */}
        <path d="M 78,35 C 90,45 110,55 120,65 C 105,65 92,62 78,58 Z" fill="#fee2e2" />
        <path d="M 75,28 L 52,22 L 75,16 Z" fill="#ef4444" />

        {/* Wellen */}
        <path d="M 12,132 Q 25,124 38,132 Q 52,140 66,132 Q 80,124 94,132 Q 108,140 122,132 Q 135,124 145,132" fill="none" stroke="#38bdf8" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function CuteParrot({ size = 95, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 130" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Ast */}
        <path d="M 15,115 Q 65,110 115,118" stroke="#78350f" strokeWidth="5" />

        {/* Schwanzfedern */}
        <path d="M 45,95 Q 35,120 28,125 Q 40,115 52,98" fill="#3b82f6" />
        <path d="M 40,95 Q 30,115 22,118 Q 35,110 45,95" fill="#10b981" />

        {/* Körper */}
        <path d="M 52,50 C 52,30 75,25 85,38 C 95,50 92,90 75,100 C 60,105 50,85 52,50 Z" fill="#ef4444" />
        <path d="M 68,55 C 75,65 75,85 68,95 C 60,92 56,80 58,65 Z" fill="#fde047" stroke="none" />

        {/* Flügel */}
        <path d="M 75,55 C 88,58 92,80 82,92 C 78,85 75,70 75,55 Z" fill="#3b82f6" />
        <path d="M 77,65 C 85,68 86,80 80,86" fill="none" stroke="#10b981" strokeWidth="2" />

        {/* Kullerauge & Schnabel */}
        <circle cx="68" cy="42" r="5" fill="#ffffff" />
        <circle cx="67" cy="42" r="2.5" fill="#1e293b" />
        <path d="M 58,42 C 45,45 42,54 48,60 C 52,58 56,54 58,48 Z" fill="#fbbf24" />

        {/* Kopftuch */}
        <path d="M 60,35 Q 75,26 88,35 Q 82,28 72,28 Q 64,28 60,35 Z" fill="#1e293b" />
        <circle cx="88" cy="36" r="3" fill="#1e293b" />
      </g>
    </svg>
  );
}

export function CrossedSabres({ size = 85, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Klinge 1 (von links unten nach rechts oben) */}
        <path d="M 22,78 L 45,55 L 75,25 Q 85,15 85,25 Q 82,35 65,52 L 35,82 Z" fill="#e2e8f0" />
        <path d="M 45,55 L 75,25" stroke="#cbd5e1" strokeWidth="1.5" />
        {/* Parierstange & Griff 1 */}
        <rect x="24" y="66" width="6" height="16" rx="3" transform="rotate(45 27 74)" fill="#fbbf24" />
        <rect x="18" y="76" width="6" height="12" rx="3" transform="rotate(45 21 82)" fill="#b45309" />
        <circle cx="16" cy="88" r="4" fill="#fbbf24" />

        {/* Klinge 2 (von rechts unten nach links oben) */}
        <path d="M 78,78 L 55,55 L 25,25 Q 15,15 15,25 Q 18,35 35,52 L 65,82 Z" fill="#e2e8f0" />
        <path d="M 55,55 L 25,25" stroke="#cbd5e1" strokeWidth="1.5" />
        {/* Parierstange & Griff 2 */}
        <rect x="70" y="66" width="6" height="16" rx="3" transform="rotate(-45 73 74)" fill="#fbbf24" />
        <rect x="76" y="76" width="6" height="12" rx="3" transform="rotate(-45 79 82)" fill="#b45309" />
        <circle cx="84" cy="88" r="4" fill="#fbbf24" />
      </g>
    </svg>
  );
}

export function PalmIsland({ size = 95, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Sandhügel / Insel */}
        <path d="M 15,95 Q 60,78 105,95 Q 60,110 15,95 Z" fill="#fde047" />
        <path d="M 22,96 Q 60,84 98,96" fill="#f59e0b" stroke="none" />

        {/* Wellen um die Insel */}
        <path d="M 8,102 Q 35,96 60,102 Q 85,96 112,102" fill="none" stroke="#38bdf8" strokeWidth="3" />

        {/* Palmenstamm (geschwungen) */}
        <path d="M 55,88 Q 62,60 52,38" fill="none" stroke="#b45309" strokeWidth="6" />
        <line x1="53" y1="74" x2="60" y2="72" stroke="#78350f" strokeWidth="2" />
        <line x1="54" y1="56" x2="61" y2="54" stroke="#78350f" strokeWidth="2" />

        {/* Palmwedel */}
        <path d="M 52,38 Q 30,22 18,36 Q 32,38 52,38" fill="#22c55e" />
        <path d="M 52,38 Q 45,12 60,8 Q 62,25 52,38" fill="#22c55e" />
        <path d="M 52,38 Q 75,18 90,26 Q 78,35 52,38" fill="#16a34a" />
        <path d="M 52,38 Q 80,42 85,55 Q 70,50 52,38" fill="#16a34a" />

        {/* Kokosnüsse */}
        <circle cx="48" cy="40" r="3.5" fill="#78350f" />
        <circle cx="56" cy="41" r="3.5" fill="#78350f" />
      </g>
    </svg>
  );
}

export function StarfishSticker({ size = 50, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 30,8 Q 34,22 46,24 Q 36,33 40,48 Q 28,40 18,48 Q 22,33 12,24 Q 24,22 30,8 Z" fill="#f43f5e" />
        <circle cx="27" cy="28" r="1.5" fill="#ffffff" />
        <circle cx="33" cy="28" r="1.5" fill="#ffffff" />
        <path d="M 28,32 Q 30,34 32,32" fill="none" stroke="#1e293b" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function AnchorSticker({ size = 80, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 42,22 Q 35,35 55,42 Q 65,50 48,62 Q 35,72 52,82" fill="none" stroke="#d97706" strokeWidth="3" />
        <circle cx="50" cy="20" r="9" fill="#94a3b8" />
        <circle cx="50" cy="20" r="4" fill="#ffffff" />
        <rect x="25" y="36" width="50" height="8" rx="4" fill="#64748b" />
        <rect x="46" y="27" width="8" height="56" rx="3" fill="#64748b" />
        <path d="M 20,68 C 22,88 78,88 80,68" fill="none" strokeWidth="7" stroke="#64748b" />
        <polygon points="14,68 24,62 26,74" fill="#94a3b8" />
        <polygon points="86,68 76,62 74,74" fill="#94a3b8" />
      </g>
    </svg>
  );
}

export function TreasureMapSticker({ size = 80, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 18,22 C 22,18 78,16 82,24 C 85,45 80,75 82,82 C 75,85 24,84 18,80 C 15,60 18,40 18,22 Z" fill="#fef3c7" />
        <path d="M 28,68 Q 38,45 52,55 T 72,40" fill="none" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4,4" />
        <line x1="68" y1="36" x2="78" y2="46" stroke="#ef4444" strokeWidth="4" />
        <line x1="78" y1="36" x2="68" y2="46" stroke="#ef4444" strokeWidth="4" />
        <path d="M 32,58 Q 35,46 36,40" stroke="#78350f" strokeWidth="2.5" />
        <path d="M 36,40 Q 28,38 28,42" stroke="#10b981" strokeWidth="2.5" />
        <path d="M 36,40 Q 42,36 44,40" stroke="#10b981" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function CompassSticker({ size = 80, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`comic-sticker ${className}`}>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="42" fill="#fbbf24" />
        <circle cx="50" cy="50" r="34" fill="#fef3c7" />
        <polygon points="50,22 55,50 50,46 45,50" fill="#ef4444" />
        <polygon points="50,78 55,50 50,54 45,50" fill="#3b82f6" />
        <circle cx="50" cy="50" r="4" fill="#f59e0b" />
      </g>
    </svg>
  );
}
