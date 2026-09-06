import React, { useState } from 'react';
import { isSoundEnabled, toggleSound } from '../services/sound';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  const handleToggle = () => {
    const newState = toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="comic-sound-btn"
      title={enabled ? "Sound stummschalten" : "Sound aktivieren"}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span>{enabled ? 'Sound an' : 'Stumm'}</span>
    </button>
  );
}
