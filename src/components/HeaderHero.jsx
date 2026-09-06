import React, { useState, useEffect } from 'react';
import { PARTY_CONFIG } from '../config';
import { CutePirate, PirateShip } from './ComicAssets';
import { Utensils, MapPin, Gift, Clock } from 'lucide-react';

export default function HeaderHero({ onOpenWishes }) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const diff = +new Date(PARTY_CONFIG.targetDate) - +new Date();
      setDaysLeft(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0);
    };
    calculate();
    const timer = setInterval(calculate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="comic-hero-card">
      <div className="hero-header-flex">
        <div className="hero-pirate-badge-wrap">
          <CutePirate size={75} />
        </div>
        <div className="hero-text-block">
          <h1 className="comic-hero-title">{PARTY_CONFIG.title}</h1>
          <p className="comic-hero-subtitle">{PARTY_CONFIG.subtitle}</p>
        </div>
        <div className="hero-ship-badge-wrap hero-ship-hide-mobile">
          <PirateShip size={75} />
        </div>
      </div>

      {/* Dezenter Countdown-Badge */}
      <div>
        <div className="comic-countdown-pill">
          <Clock size={17} />
          <span>
            {daysLeft > 1
              ? `Noch ${daysLeft} Tage bis zur Kaperfahrt!`
              : daysLeft === 1
                ? 'Morgen geht die Kaperfahrt los!'
                : 'Heute wird gefeiert!'}
          </span>
        </div>
      </div>

      {/* Schnelle Navigation */}
      <div className="hero-actions-row">
        <a href="#buffet" className="comic-btn comic-btn-primary">
          <Utensils size={17} />
          <span>Direkt zum Buffet</span>
        </a>
        <a href="#details" className="comic-btn">
          <MapPin size={16} />
          <span>Wann & Wo?</span>
        </a>
        <button onClick={onOpenWishes} className="comic-btn comic-btn-purple">
          <Gift size={16} />
          <span>Worüber Alina sich freuen würde</span>
        </button>
      </div>
    </header>
  );
}
