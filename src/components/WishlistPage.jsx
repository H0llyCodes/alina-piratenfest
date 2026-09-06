import React, { useState, useEffect } from 'react';
import { 
  getWishes, 
  claimWish, 
  unclaimWish, 
  contributeToWish, 
  removeContributorFromWish,
  addNewWish,
  removeWish 
} from '../services/storage';
import { TreasureChest } from './ComicAssets';
import confetti from 'canvas-confetti';
import { Gift, Check, X, Sparkles, Users, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function WishlistPage({ onBackToParty }) {
  const [wishes, setWishes] = useState([]);
  const [claimingId, setClaimingId] = useState(null);
  const [name, setName] = useState('');
  
  // Für Zusammenlegen
  const [joiningId, setJoiningId] = useState(null);
  const [contributorName, setContributorName] = useState('');

  // Neue Idee vorschlagen
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIsGroup, setNewIsGroup] = useState(true);

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const load = async () => {
    setWishes(await getWishes() || []);
  };

  // Solo-Wunsch reservieren
  const handleClaim = async (id) => {
    if (!name.trim()) {
      alert('Bitte gib deinen Namen ein!');
      return;
    }
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#c084fc', '#38bdf8']
    });
    setWishes(await claimWish(id, name.trim()));
    setClaimingId(null);
    setName('');
  };

  const handleUnclaim = async (id, who) => {
    if (confirm(`Möchtest du die Reservierung von ${who} wieder aufheben?`)) {
      setWishes(await unclaimWish(id));
    }
  };

  // Gruppen-Geschenk: Beitreten (Zusammenlegen!)
  const handleJoinGroup = async (id) => {
    if (!contributorName.trim()) {
      alert('Bitte gib deinen Namen ein!');
      return;
    }
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f472b6', '#38bdf8', '#fcd34d']
    });
    setWishes(await contributeToWish(id, contributorName.trim()));
    setJoiningId(null);
    setContributorName('');
  };

  const handleLeaveGroup = async (id, who) => {
    if (confirm(`Möchtest du ${who} wirklich wieder aus der Gruppe austragen?`)) {
      setWishes(await removeContributorFromWish(id, who));
    }
  };

  const handleCreateWish = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const updated = await addNewWish(newTitle.trim(), newDesc.trim(), newIsGroup);
    setWishes(updated);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const handleDeleteWish = async (id, title) => {
    if (confirm(`Möchtest du den Wunsch "${title}" wirklich löschen?`)) {
      setWishes(await removeWish(id));
    }
  };

  const groupWishes = wishes.filter(w => w.isGroupGift);
  const soloWishes = wishes.filter(w => !w.isGroupGift);

  return (
    <div className="wishlist-page-card">
      {/* Zurück-Button */}
      <div className="wishlist-back-nav">
        <button onClick={onBackToParty} className="comic-btn comic-btn-primary">
          <ArrowLeft size={18} />
          <span>Zurück zur Party & Essensliste</span>
        </button>
      </div>

      {/* Kopfbereich (Zentriert) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <TreasureChest size={70} />
        <div>
          <h1 className="comic-section-heading" style={{ fontSize: '1.85rem', justifyContent: 'center' }}>
            <span>Worüber Alina sich freuen würde</span>
          </h1>
          <p className="section-desc-text" style={{ marginBottom: 0, marginTop: '0.35rem', textAlign: 'center', maxWidth: '580px', lineHeight: '1.5' }}>
            Ihr müsst mir wirklich gar nichts schenken – das Schönste für mich ist einfach, Zeit mit euch zu verbringen und dass wir ein buntes Buffet zusammenbekommen! Wer mir trotzdem unbedingt eine kleine Freude machen möchte, findet hier ein paar Ideen:
          </p>
        </div>
      </div>

      {/* Button: Neue Idee vorschlagen (Zentriert) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="comic-btn comic-btn-purple"
          style={{ minHeight: '48px', height: '48px' }}
        >
          <Plus size={16} />
          <span>Einen Wunsch vorschlagen</span>
        </button>
      </div>

      {/* Formular für neuen Wunsch */}
      {showAddForm && (
        <form onSubmit={handleCreateWish} style={{
          background: 'var(--sky-light)',
          border: '2.5px solid var(--outline-dark)',
          borderRadius: '16px',
          padding: '1.2rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ fontFamily: 'var(--font-comic)', fontSize: '1.1rem', marginBottom: '0.6rem', color: 'var(--sky-deep)' }}>
            Neuen Wunsch hinzufügen
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <input
              type="text"
              placeholder="Titel des Wunsches *"
              className="comic-text-input"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Optionale Details / Beschreibung"
              className="comic-text-input"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-comic)', fontSize: '0.92rem', cursor: 'pointer', marginTop: '0.2rem' }}>
              <input
                type="checkbox"
                checked={newIsGroup}
                onChange={e => setNewIsGroup(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Größere Sache zum Zusammenlegen (mehrere können mitmachen)</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
            <button type="submit" className="comic-btn comic-btn-primary">
              Wunsch speichern
            </button>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontFamily: 'var(--font-comic)', fontSize: '0.95rem' }}
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}

      {/* ===================================================
          TEIL 1: GRÖSSERE SACHEN (ZUSAMMENLEGEN / TEILEN)
          =================================================== */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Users size={22} color="#a855f7" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--accent-purple-dark)', margin: 0 }}>
            Größere Schätze (Zum Zusammenlegen)
          </h3>
        </div>

        {groupWishes.length === 0 ? (
          <div className="empty-category-notice" style={{ margin: '0 auto', maxWidth: '500px' }}>
            Noch keine größeren Wünsche eingetragen – schlage gerne oben einen vor!
          </div>
        ) : (
          <div className="comic-wishes-grid">
            {groupWishes.map(wish => {
              const isJoining = joiningId === wish.id;
              const count = wish.contributors.length;

              return (
                <div key={wish.id} className="comic-wish-card" style={{ borderLeft: '6px solid #a855f7' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span className="wish-card-title">{wish.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span className="group-gift-badge">
                          <Users size={12} />
                          <span>{count} {count === 1 ? 'Person' : 'Personen'} dabei</span>
                        </span>
                        <button
                          onClick={() => handleDeleteWish(wish.id, wish.title)}
                          title="Wunsch löschen"
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {wish.description && (
                      <p className="wish-card-desc">{wish.description}</p>
                    )}

                    {/* Liste der bisherigen Mitschenkenden */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        Bereits dabei:
                      </span>
                      {count === 0 ? (
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginLeft: '0.35rem' }}>
                          Noch niemand – sei der Erste!
                        </span>
                      ) : (
                        <div className="contributors-tag-cloud">
                          {wish.contributors.map((person, idx) => (
                            <span key={idx} className="contributor-chip">
                              <span>🏴‍☠️ {person}</span>
                              <button
                                onClick={() => handleLeaveGroup(wish.id, person)}
                                title="Austragen"
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Beitreten Button / Input */}
                  <div style={{ marginTop: '0.5rem' }}>
                    {isJoining ? (
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          placeholder="Dein Name..."
                          value={contributorName}
                          onChange={e => setContributorName(e.target.value)}
                          className="comic-text-input"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '16px', width: '130px' }}
                          autoFocus
                        />
                        <button 
                          onClick={() => handleJoinGroup(wish.id)}
                          className="comic-claim-btn"
                          style={{ background: 'var(--accent-purple-deep)' }}
                        >
                          Mitmachen
                        </button>
                        <button 
                          onClick={() => setJoiningId(null)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setJoiningId(wish.id); setContributorName(''); }}
                        className="comic-claim-btn"
                        style={{ background: 'var(--accent-purple-deep)' }}
                      >
                        <Plus size={15} />
                        <span>Ich lege mit zusammen!</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===================================================
          TEIL 2: EINZEL-WÜNSCHE
          =================================================== */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Gift size={22} color="#ec4899" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--accent-pink-dark)', margin: 0 }}>
            Einzel-Wünsche
          </h3>
        </div>

        {soloWishes.length === 0 ? (
          <div className="empty-category-notice" style={{ margin: '0 auto', maxWidth: '500px' }}>
            Noch keine Einzel-Wünsche eingetragen – schlage gerne oben einen vor!
          </div>
        ) : (
          <div className="comic-wishes-grid">
            {soloWishes.map(wish => {
            const isClaimed = !!wish.claimedBy;
            const isClaiming = claimingId === wish.id;

            return (
              <div key={wish.id} className={`comic-wish-card ${isClaimed ? 'is-claimed' : ''}`}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div className="wish-card-title">{wish.title}</div>
                    <button
                      onClick={() => handleDeleteWish(wish.id, wish.title)}
                      title="Wunsch löschen"
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {wish.description && (
                    <div className="wish-card-desc">{wish.description}</div>
                  )}
                </div>

                <div>
                  {isClaimed ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span style={{
                        background: '#dcfce7',
                        color: '#166534',
                        border: '1.5px solid #16a34a',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-comic)',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Check size={14} />
                        <span>Besorgt von: {wish.claimedBy}</span>
                      </span>

                      <button
                        onClick={() => handleUnclaim(wish.id, wish.claimedBy)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        Freigeben
                      </button>
                    </div>
                  ) : isClaiming ? (
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Dein Name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="comic-text-input"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '16px', width: '130px' }}
                        autoFocus
                      />
                      <button onClick={() => handleClaim(wish.id)} className="comic-claim-btn">
                        OK
                      </button>
                      <button onClick={() => setClaimingId(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setClaimingId(wish.id); setName(''); }}
                      className="comic-claim-btn"
                    >
                      <Sparkles size={14} />
                      <span>Diesen Wunsch schenken</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
