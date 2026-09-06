import React from 'react';
import { PARTY_CONFIG } from '../config';
import { downloadIcsCalendar, getGoogleCalendarUrl } from '../services/calendar';
import { CompassSticker, TreasureMapSticker } from './ComicAssets';
import { Calendar, MapPin, ExternalLink, Download } from 'lucide-react';

export default function EventDetails() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PARTY_CONFIG.address)}`;

  return (
    <section id="details" className="comic-standard-card text-center-all">
      {/* Zentrierter Titel */}
      <div className="centered-header-group">
        <span className="header-sticker-desktop">
          <CompassSticker size={38} />
        </span>
        <h2 className="comic-section-heading" style={{ margin: 0, justifyContent: 'center' }}>
          <MapPin size={26} color="#0284c7" />
          <span>Eckdaten & Party-Infos</span>
        </h2>
        <span className="header-sticker-desktop">
          <TreasureMapSticker size={38} />
        </span>
      </div>

      <p className="section-desc-text" style={{ textAlign: 'center', margin: '0 auto 1.5rem auto' }}>
        Alle wichtigen Koordinaten für Alinas Geburtstags-Kaperfahrt auf einen Blick:
      </p>

      {/* Zentrierte Info-Bubbles */}
      <div className="comic-info-bubbles-grid centered-bubbles-grid">
        {/* Wann */}
        <div className="comic-info-bubble text-center-bubble">
          <div className="bubble-label-text">📅 Wann geht's los?</div>
          <div className="bubble-main-value">{PARTY_CONFIG.displayDate}</div>
          <div className="bubble-hint-value">{PARTY_CONFIG.displayTime}</div>
        </div>

        {/* Wo */}
        <div className="comic-info-bubble text-center-bubble">
          <div className="bubble-label-text">📍 Wo ankern wir?</div>
          <div className="bubble-main-value">{PARTY_CONFIG.locationName}</div>
          <div className="bubble-hint-value">{PARTY_CONFIG.address}</div>
        </div>

        {/* Dresscode */}
        <div className="comic-info-bubble text-center-bubble">
          <div className="bubble-label-text">🏴‍☠️ Piraten-Kluft</div>
          <div className="bubble-main-value">Piraten-Outfit erwünscht!</div>
          <div className="bubble-hint-value">Werdet gerne kreativ</div>
        </div>
      </div>

      {/* Zentrierte Aktions-Buttons */}
      <div className="centered-actions-row">
        <button onClick={downloadIcsCalendar} className="comic-btn">
          <Download size={16} />
          <span>In Kalender sichern (.ics)</span>
        </button>
        <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="comic-btn">
          <Calendar size={16} />
          <span>Google Kalender</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="comic-btn">
          <ExternalLink size={16} />
          <span>In Google Maps öffnen</span>
        </a>
      </div>
    </section>
  );
}
