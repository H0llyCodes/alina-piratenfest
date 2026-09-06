// ==========================================
// KALENDER EXPORT (.ICS & GOOGLE CALENDAR)
// ==========================================
import { PARTY_CONFIG } from '../config';

export function downloadIcsCalendar() {
  const startDate = new Date(PARTY_CONFIG.targetDate);
  // Endzeit: standardmäßig 8 Stunden später
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alinas Piraten-Kaperfahrt//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:alina-pirate-party-${startDate.getTime()}@piratencrew.party`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:🏴‍☠️ ${PARTY_CONFIG.title}`,
    `DESCRIPTION:${PARTY_CONFIG.subtitle}\\n\\nDresscode: ${PARTY_CONFIG.dresscode}\\n\\n${PARTY_CONFIG.dresscodeHint}`,
    `LOCATION:${PARTY_CONFIG.locationName}, ${PARTY_CONFIG.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Alinas_Piraten_Geburtstag.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getGoogleCalendarUrl() {
  const startDate = new Date(PARTY_CONFIG.targetDate);
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatGoogleDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';
  };

  const title = encodeURIComponent(`🏴‍☠️ ${PARTY_CONFIG.title}`);
  const details = encodeURIComponent(`${PARTY_CONFIG.subtitle}\n\nDresscode: ${PARTY_CONFIG.dresscode}\n${PARTY_CONFIG.dresscodeHint}`);
  const location = encodeURIComponent(`${PARTY_CONFIG.locationName}, ${PARTY_CONFIG.address}`);
  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
