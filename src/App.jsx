import React, { useState, useEffect } from 'react';
import HeaderHero from './components/HeaderHero';
import EventDetails from './components/EventDetails';
import BuffetList from './components/BuffetList';
import WishlistPage from './components/WishlistPage';
import GuestMessages from './components/GuestMessages';
import Decorations from './components/Decorations';
import ScrollShipTrack from './components/ScrollShipTrack';
import { DividerIsland, DividerSabres, DividerTreasure } from './components/MobileDividers';
import { PARTY_CONFIG } from './config';
import { initStorage } from './services/storage';
import { Gift, Home } from 'lucide-react';
import './styles/pirate.css';

export default function App() {
  const [currentView, setCurrentView] = useState('party'); // 'party' | 'wishes'

  useEffect(() => {
    initStorage();

    // Hash Navigation unterstützen
    const checkHash = () => {
      if (window.location.hash === '#wishes' || window.location.hash === '#geschenke') {
        setCurrentView('wishes');
      } else {
        setCurrentView('party');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const goToWishes = () => {
    window.location.hash = 'wishes';
    setCurrentView('wishes');
  };

  const goToParty = () => {
    window.location.hash = '';
    setCurrentView('party');
  };

  const handleAdminReset = () => {
    const pin = prompt("Käpt'n-Code:");
    if (pin === PARTY_CONFIG.adminPin) {
      if (confirm("Möchtest du alle Einträge auf die Standardwerte zurücksetzen?")) {
        localStorage.clear();
        window.location.reload();
      }
    } else if (pin !== null) {
      alert("Falscher Code!");
    }
  };

  return (
    <>
      {/* 2D-Comic Vektor-Rahmen am Seitenrand (Desktop) */}
      <Decorations />

      {/* Vertikale Kurven-Scroll-Leiste (Desktop & Handy) */}
      <ScrollShipTrack />

      <div className="main-wrapper">
        {/* Kopfzeile mit 2 gleich großen zentrierten Elementen */}
        <nav className="comic-top-bar">
          <div className="comic-nav-logo">
            <span className="logo-pirate-icon">🏴‍☠️</span>
            <span className="logo-pirate-title">Alinas Piratenfest</span>
          </div>

          {currentView === 'party' ? (
            <button onClick={goToWishes} className="page-switch-btn" title="Worüber Alina sich freuen würde">
              <Gift size={17} />
              <span>Worüber Alina sich freuen würde</span>
            </button>
          ) : (
            <button onClick={goToParty} className="page-switch-btn" title="Zurück zur Party">
              <Home size={17} />
              <span>Zurück zur Party</span>
            </button>
          )}
        </nav>

        {/* ===================================================
            SEITE 1: HAUPTSEITE (PARTY & BUFFET)
            =================================================== */}
        {currentView === 'party' && (
          <>
            <HeaderHero onOpenWishes={goToWishes} />
            <DividerIsland />
            <BuffetList />
            <DividerSabres />
            <EventDetails />
            <DividerTreasure />
            <GuestMessages />
          </>
        )}

        {/* ===================================================
            SEITE 2: EXTRA-PAGE (WUNSCHLISTE & ZUSAMMENLEGEN)
            =================================================== */}
        {currentView === 'wishes' && (
          <WishlistPage onBackToParty={goToParty} />
        )}

        {/* Fußzeile */}
        <footer className="comic-footer">
          <p>
            ⛵️ Gestaltet mit Liebe für Käpt'n {PARTY_CONFIG.pirateCaptain}s Geburtstag
          </p>
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={handleAdminReset}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-comic)' }}
            >
              ⚙️ Zurücksetzen (PIN: ahoi)
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
