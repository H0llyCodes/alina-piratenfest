import React, { useState, useEffect } from 'react';

export default function ScrollShipTrack() {
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;

    const calcProgress = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.pageYOffset || window.scrollY || doc.scrollTop || body.scrollTop || 0;
      const scrollHeight = Math.max(
        doc.scrollHeight,
        body.scrollHeight,
        doc.offsetHeight,
        body.offsetHeight
      );
      const clientHeight = window.innerHeight || doc.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        return Math.min(1, Math.max(0, scrollTop / maxScroll));
      }
      return 0;
    };

    const onScrollOrResize = () => {
      targetProgress = calcProgress();
    };

    // Initialen Fortschritt setzen
    targetProgress = calcProgress();
    currentProgress = targetProgress;
    setSmoothProgress(currentProgress);

    // Butterweicher 60/120fps RAF Render-Loop (Lerp-Filter)
    const tick = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0002) {
        currentProgress += diff * 0.32; // Schnelle, direkt ansprechende aber butterweiche Annäherung
        setSmoothProgress(currentProgress);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    document.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('touchmove', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      document.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('touchmove', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ---------------------------------------------------------------
  // 1. MATHEMATISCH EXAKTER VERLAUF: MOBILE WELLE
  // Genügend Freiraum nach oben, damit das Schiff nie abgeschnitten wird!
  // ---------------------------------------------------------------
  const mobileVbWidth = 600;
  const mobileVbHeight = 44; // Viel Kopffreiheit oben
  const mobileStartX = 15;
  const mobileEndX = 585;
  const mobileRangeX = mobileEndX - mobileStartX; // 570
  const mobileCenterY = 28; // Welle im unteren Bereich, Schiffsmast ragt nach oben in die Bar
  const mobileAmplitude = 4.5;
  const mobileWaveCycles = 4; // 4 harmonische Wellenkämme

  const getMobileWaveCoord = (t) => {
    const clampedT = Math.min(1, Math.max(0, t));
    const x = mobileStartX + clampedT * mobileRangeX;
    const y = mobileCenterY + mobileAmplitude * Math.sin(clampedT * Math.PI * 2 * mobileWaveCycles);
    
    // Mathematische Kurvensteigung (Tangente) für sanftes Mitschwingen
    const dy_dt = mobileAmplitude * Math.PI * 2 * mobileWaveCycles * Math.cos(clampedT * Math.PI * 2 * mobileWaveCycles);
    const dx_dt = mobileRangeX;
    const slope = dy_dt / dx_dt;
    const angleDeg = Math.atan(slope) * (180 / Math.PI) * 0.65; // Sanfte, harmonische Neigung (max ~7 Grad)

    return {
      x,
      y,
      leftPercent: (x / mobileVbWidth) * 100,
      topPercent: (y / mobileVbHeight) * 100,
      angleDeg
    };
  };

  const generateMobileWavePath = () => {
    let d = `M ${mobileStartX} ${mobileCenterY} `;
    const steps = 80;
    for (let i = 1; i <= steps; i++) {
      const { x, y } = getMobileWaveCoord(i / steps);
      d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  const mobileShip = getMobileWaveCoord(smoothProgress);

  // ---------------------------------------------------------------
  // 2. MATHEMATISCH EXAKTER VERLAUF: DESKTOP KURVE
  // Der Pfad und das Schiff nutzen exakt dieselbe Kurvenfunktion!
  // ---------------------------------------------------------------
  const desktopWidth = 60;
  const desktopHeight = 440;
  const desktopCenterX = 30;
  const desktopStartY = 20;
  const desktopEndY = 420;
  const desktopTotalY = desktopEndY - desktopStartY; // 400
  const desktopAmplitude = 14;
  const desktopWaves = 3; // 3 sanfte S-Kurven

  const getDesktopCoord = (t) => {
    const clampedT = Math.min(1, Math.max(0, t));
    const y = desktopStartY + clampedT * desktopTotalY;
    const x = desktopCenterX + desktopAmplitude * Math.sin(clampedT * Math.PI * 2 * desktopWaves);

    // Sanftes Mitlehnen in die Kurve (nur max ±6 Grad)
    const dx_dt = desktopAmplitude * Math.PI * 2 * desktopWaves * Math.cos(clampedT * Math.PI * 2 * desktopWaves);
    const dy_dt = desktopTotalY;
    const slope = dx_dt / dy_dt;
    const angleDeg = Math.atan(slope) * (180 / Math.PI) * 0.45;

    return { x, y, angleDeg };
  };

  const generateDesktopWavyPath = () => {
    let d = `M ${desktopCenterX} ${desktopStartY} `;
    const steps = 80;
    for (let i = 1; i <= steps; i++) {
      const { x, y } = getDesktopCoord(i / steps);
      d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  const desktopShip = getDesktopCoord(smoothProgress);

  return (
    <>
      {/* ===================================================
          1. MOBILE TRACK: Horizontale Welle oben
          =================================================== */}
      <div className="mobile-scroll-track" aria-label="Kaperfahrt-Fortschritt">
        <div className="mobile-track-container">
          <span className="mobile-track-start">⛵️</span>

          {/* Exakte Wellenlinie & direkt darauf segelndes Schiff */}
          <div className="mobile-wave-wrapper">
            <svg 
              className="mobile-wave-svg" 
              viewBox={`0 0 ${mobileVbWidth} ${mobileVbHeight}`}
              preserveAspectRatio="none"
            >
              {/* Weißer Glow */}
              <path
                d={generateMobileWavePath()}
                fill="none"
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.95"
              />
              {/* Gestrichelte Wellenlinie in Lila */}
              <path
                d={generateMobileWavePath()}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>

            {/* Schiff segelt mathematisch exakt auf der Wellenlinie (Keel sitzt auf der Linie) */}
            <div 
              className="mobile-sailing-ship"
              style={{
                left: `${mobileShip.leftPercent}%`,
                top: `${mobileShip.topPercent}%`,
                transform: `translate(-50%, -72%) rotate(${mobileShip.angleDeg.toFixed(1)}deg)`
              }}
            >
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
                <path d="M 4,20 Q 7,26 15,26 Q 23,26 26,20 Z" fill="#b45309" stroke="#1e293b" strokeWidth="2" />
                <line x1="15" y1="20" x2="15" y2="4" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 7,12 C 11,10 19,10 23,12 C 20,6 18,5 15,5 C 12,5 10,6 7,12 Z" fill="#fdf2f8" stroke="#1e293b" strokeWidth="1.8" />
                <polygon points="15,4 20,7 15,9" fill="#ec4899" stroke="#1e293b" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <span className="mobile-track-goal" title="Ziel: Party!">🎉</span>
        </div>
      </div>

      {/* ===================================================
          2. DESKTOP TRACK: Vertikale Kurvenschiene links
          =================================================== */}
      <aside className="desktop-scroll-ship-track" aria-label="Kaperfahrt-Fortschritt">
        <div className="scroll-track-inner">
          <div className="track-marker-top" title="Start der Kaperfahrt">
            <span>⛵️</span>
          </div>

          <svg
            width={desktopWidth}
            height={desktopHeight}
            viewBox={`0 0 ${desktopWidth} ${desktopHeight}`}
            className="track-svg"
          >
            <path
              d={generateDesktopWavyPath()}
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d={generateDesktopWavyPath()}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeDasharray="6 5"
              strokeLinecap="round"
            />

            {/* Schiff gleitet mathematisch exakt auf der gestrichelten Linie nach unten */}
            <g
              transform={`translate(${desktopShip.x}, ${desktopShip.y}) rotate(${desktopShip.angleDeg.toFixed(1)}) translate(0, -6)`}
            >
              <ellipse cx="0" cy="9" rx="13" ry="3.5" fill="rgba(30, 41, 59, 0.15)" />
              <path
                d="M -15,2 Q -13,10 0,11 Q 13,10 15,2 Z"
                fill="#b45309"
                stroke="#1e293b"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="0" y1="2" x2="0" y2="-15" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M -10,-3 C -5,-5 5,-5 10,-3 C 8,-9 5,-13 0,-14 C -5,-13 -8,-9 -10,-3 Z"
                fill="#fdf2f8"
                stroke="#1e293b"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="-8" r="1.6" fill="#ec4899" />
              <polygon points="0,-15 5,-12 0,-10" fill="#f472b6" stroke="#1e293b" strokeWidth="1" />
            </g>
          </svg>

          <div className="track-marker-bottom" title="Ziel: Die Party!">
            <span className="goal-cross">❌</span>
            <span className="goal-label">Party!</span>
          </div>
        </div>
      </aside>
    </>
  );
}
