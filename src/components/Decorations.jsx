import React from 'react';
import { 
  CutePirate, 
  FriendlyOctopus, 
  TreasureChest, 
  PirateShip, 
  CuteParrot, 
  CrossedSabres,
  PalmIsland,
  AnchorSticker,
  TreasureMapSticker,
  CompassSticker,
  StarfishSticker
} from './ComicAssets';

export default function Decorations() {
  return (
    <div className="comic-frame-environment" aria-hidden="true">
      {/* ===================================================
          LINKER RAHMEN (VON OBEN NACH UNTEN)
          =================================================== */}
      <div className="frame-column frame-left">
        {/* Ecke Oben-Links: Niedlicher Pirat */}
        <div className="frame-asset-anchor asset-top-left">
          <CutePirate size={125} />
        </div>

        {/* Mitte-Links: Gekreuzte Comic-Säbel */}
        <div className="frame-asset-anchor asset-mid-left-1">
          <CrossedSabres size={85} />
        </div>

        {/* Mitte-Links 2: Schatzkarte */}
        <div className="frame-asset-anchor asset-mid-left-2">
          <TreasureMapSticker size={75} />
        </div>

        {/* Unten-Links: Anker & Freundlicher Oktopus */}
        <div className="frame-asset-anchor asset-bottom-left">
          <div style={{ position: 'relative' }}>
            <AnchorSticker size={85} style={{ opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: -15, left: -10 }}>
              <FriendlyOctopus size={115} />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          RECHTER RAHMEN (VON OBEN NACH UNTEN)
          =================================================== */}
      <div className="frame-column frame-right">
        {/* Ecke Oben-Rechts: Bunter Papagei */}
        <div className="frame-asset-anchor asset-top-right">
          <CuteParrot size={115} />
        </div>

        {/* Mitte-Rechts 1: Palmen-Insel */}
        <div className="frame-asset-anchor asset-mid-right-1">
          <PalmIsland size={95} />
        </div>

        {/* Mitte-Rechts 2: Kompassrose */}
        <div className="frame-asset-anchor asset-mid-right-2">
          <CompassSticker size={75} />
        </div>

        {/* Unten-Rechts: Funkelnde Schatztruhe */}
        <div className="frame-asset-anchor asset-bottom-right">
          <div style={{ position: 'relative' }}>
            <TreasureChest size={120} />
            <div style={{ position: 'absolute', bottom: -5, left: -25 }}>
              <StarfishSticker size={45} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
