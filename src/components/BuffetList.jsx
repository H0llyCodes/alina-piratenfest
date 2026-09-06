import React, { useState, useEffect } from 'react';
import { getBuffetItems, addBuffetItem, removeBuffetItem } from '../services/storage';
import confetti from 'canvas-confetti';
import { Utensils, Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'deftig', label: 'Deftiges & Salate', icon: '🍕', color: '#fee2e2', border: '#fca5a5' },
  { id: 'suess', label: 'Kuchen, Obst & Süßes', icon: '🧁', color: '#fef3c7', border: '#fde047' },
  { id: 'snacks', label: 'Knabberkram & Dips', icon: '🍿', color: '#dcfce7', border: '#86efac' },
  { id: 'sonstiges', label: 'Sonstiges Zeug', icon: '📦', color: '#f1f5f9', border: '#cbd5e1' }
];

export default function BuffetList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formular State
  const [guestName, setGuestName] = useState('');
  const [itemText, setItemText] = useState('');
  const [category, setCategory] = useState('deftig');
  const [notes, setNotes] = useState('');
  const [dietary, setDietary] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await getBuffetItems();
    setItems(data || []);
    setLoading(false);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#fbbf24', '#f59e0b', '#ef4444', '#14b8a6', '#38bdf8']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Bitte gib kurz deinen Namen ein!');
      return;
    }
    if (!itemText.trim()) {
      setErrorMsg('Was möchtest du zum Buffet mitbringen?');
      return;
    }

    setErrorMsg('');
    try {
      const newItem = await addBuffetItem({
        guestName: guestName.trim(),
        item: itemText.trim(),
        category,
        dietary,
        notes: notes.trim()
      });

      triggerCelebration();
      setItems(prev => [newItem, ...prev]);

      setItemText('');
      setNotes('');
      setDietary('');
      setSuccessMsg(`Klasse! "${itemText.trim()}" steht nun auf der Liste!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Konnte nicht gespeichert werden. Bitte nochmal versuchen!');
    }
  };

  const handleDelete = async (itemId, itemName) => {
    if (confirm(`Möchtest du "${itemName}" wirklich wieder austragen?`)) {
      const updated = await removeBuffetItem(itemId);
      setItems(updated);
    }
  };

  return (
    <section id="buffet" className="buffet-master-card">
      {/* Titelbereich */}
      <div className="section-title-wrap">
        <h2 className="comic-section-heading">
          <Utensils size={28} color="#ef4444" />
          <span>Das Piraten-Buffet (Mitbringliste)</span>
        </h2>
        <div className="comic-badge-counter">
          {items.length} Schätze an Bord
        </div>
      </div>

      <p className="section-desc-text">
        Damit die ganze Piraten-Crew satt wird – trage einfach ein, was du mitbringst!
      </p>

      {/* ==========================================
          EINGABEFORMULAR
          ========================================== */}
      <div className="buffet-input-panel">
        <h3 className="input-panel-title">
          <Plus size={20} />
          <span>Ich bringe etwas mit:</span>
        </h3>

        {errorMsg && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            border: '2px solid #ef4444',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            background: '#dcfce7',
            color: '#15803d',
            border: '2px solid #22c55e',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="buffet-clean-form">
          {/* Reihe 1: Name & Speise (Gleiche Breite & Höhe) */}
          <div className="form-two-col-grid">
            <div className="comic-field">
              <label className="comic-label" htmlFor="gName">Dein Name *</label>
              <input
                id="gName"
                type="text"
                className="comic-text-input"
                placeholder="z.B. Sarah, Jonas..."
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className="comic-field">
              <label className="comic-label" htmlFor="iText">Was bringst du mit? *</label>
              <input
                id="iText"
                type="text"
                className="comic-text-input"
                placeholder="z.B. Nudelsalat, Muffins..."
                value={itemText}
                onChange={e => setItemText(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Reihe 2: Kategorie-Auswahl im Comic-Button-Design */}
          <div className="comic-field-block">
            <label className="comic-label">Kategorie auswählen *</label>
            <div className="category-picker-grid">
              {CATEGORIES.map(cat => {
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`cat-picker-btn ${isSelected ? 'is-selected' : ''}`}
                  >
                    <span className="cat-picker-icon">{cat.icon}</span>
                    <span className="cat-picker-text">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reihe 3: Optionale Notiz */}
          <div className="comic-field">
            <label className="comic-label" htmlFor="nText">Optionale Notiz</label>
            <input
              id="nText"
              type="text"
              className="comic-text-input"
              placeholder="z.B. für ca. 8 Personen, kalt servieren..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Reihe 4: Ernährungs-Auswahl (3 gleich große Buttons nebeneinander) */}
          <div className="comic-field-block">
            <label className="comic-label">Ernährung</label>
            <div className="diet-picker-grid">
              {[
                { id: '', label: 'Normal' },
                { id: 'vegetarisch', label: '🌱 Vegetarisch' },
                { id: 'vegan', label: '🌿 Vegan' }
              ].map(diet => {
                const isActive = dietary === diet.id;
                return (
                  <button
                    type="button"
                    key={diet.id}
                    onClick={() => setDietary(diet.id)}
                    className={`diet-option-btn ${isActive ? 'is-active' : ''}`}
                  >
                    {diet.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reihe 5: Zentrierter Eintragen-Button */}
          <div className="form-submit-centered-wrap">
            <button type="submit" className="comic-submit-btn">
              <Plus size={20} />
              <span>Auf die Liste setzen</span>
            </button>
          </div>
        </form>
      </div>

      {/* ==========================================
          ÜBERSICHT: NACH KATEGORIEN GEGLIEDERT (OHNE FILTER-TABS!)
          ========================================== */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Lade Essensliste der Crew... ⚓️
        </div>
      ) : (
        <div className="buffet-grouped-categories">
          {CATEGORIES.map(cat => {
            const catItems = items.filter(i => i.category === cat.id);

            return (
              <div key={cat.id} className="category-group-block">
                {/* Kategorie-Überschrift */}
                <div className="category-group-header">
                  <div className="cat-header-left">
                    <span className="cat-group-icon">{cat.icon}</span>
                    <h3 className="cat-group-title">{cat.label}</h3>
                  </div>
                  <span className="cat-group-count">
                    {catItems.length} {catItems.length === 1 ? 'Eintrag' : 'Einträge'}
                  </span>
                </div>

                {/* Einträge dieser Kategorie */}
                {catItems.length === 0 ? (
                  <div className="empty-category-notice">
                    Hier ist noch nichts eingetragen – wer bringt etwas mit? ⚓️
                  </div>
                ) : (
                  <div className="clean-food-list">
                    {catItems.map(item => (
                      <div key={item.id} className="food-item-row">
                        <div className="food-icon-circle" style={{ background: cat.color }}>
                          {cat.icon}
                        </div>

                        <div className="food-details-content">
                          <div className="food-title-text">{item.item}</div>
                          <div className="food-guest-text">
                            von <strong>{item.guestName}</strong>
                            {item.notes && <span className="food-notes-quote"> • „{item.notes}“</span>}
                          </div>
                        </div>

                        <div className="food-actions-right">
                          {item.dietary === 'vegetarisch' && (
                            <span className="diet-pill-badge veggie">🌱 Veggie</span>
                          )}
                          {item.dietary === 'vegan' && (
                            <span className="diet-pill-badge vegan">🌿 Vegan</span>
                          )}

                          <button
                            onClick={() => handleDelete(item.id, item.item)}
                            className="comic-delete-btn"
                            title="Eintrag entfernen"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
