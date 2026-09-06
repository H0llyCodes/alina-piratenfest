import React from 'react';
import { 
  PalmIsland, 
  StarfishSticker, 
  CrossedSabres, 
  TreasureMapSticker, 
  CompassSticker,
  FriendlyOctopus 
} from './ComicAssets';

// Zwischenraum-Trenner 1: Tropische Insel & Seestern
export function DividerIsland() {
  return (
    <div className="mobile-section-divider" aria-hidden="true">
      <div className="divider-line" />
      <div className="divider-asset-cluster">
        <PalmIsland size={60} />
        <StarfishSticker size={32} className="divider-floating-star" />
      </div>
      <div className="divider-line" />
    </div>
  );
}

// Zwischenraum-Trenner 2: Gekreuzte Säbel & Kompass
export function DividerSabres() {
  return (
    <div className="mobile-section-divider" aria-hidden="true">
      <div className="divider-line" />
      <div className="divider-asset-cluster">
        <CrossedSabres size={55} />
        <CompassSticker size={34} />
      </div>
      <div className="divider-line" />
    </div>
  );
}

// Zwischenraum-Trenner 3: Kleine Schatzkarte
export function DividerTreasure() {
  return (
    <div className="mobile-section-divider" aria-hidden="true">
      <div className="divider-line" />
      <div className="divider-asset-cluster">
        <TreasureMapSticker size={50} />
      </div>
      <div className="divider-line" />
    </div>
  );
}
