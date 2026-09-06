import React, { useState, useEffect } from 'react';
import { getWishes, claimWish, unclaimWish } from '../services/storage';
import { playCoinSound } from '../services/sound';
import { TreasureChest } from './ComicAssets';
import confetti from 'canvas-confetti';
import { Gift, Check, X, Sparkles } from 'lucide-react';

export default function Wishlist() {
  const [wishes, setWishes] = useState([]);
  const [claimingId, setClaimingId] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setWishes(await getWishes() || []);
  };

  const handleClaim = async (id) => {
    if (!name.trim()) {
      alert('Bitte gib deinen Namen ein!');
      return;
    }
    playCoinSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#fbbf24', '#f59e0b', '#22c55e']
    });
    setWishes(await claimWish(id, name.trim()));
    setClaimingId(null);
    setName('');
  };

  const handleUnclaim = async (id, who) => {
    if (confirm(`Möchtest du die Reservierung von ${who} wieder freigeben?`)) {
      setWishes(await unclaimWish(id));
    }
  };

  return (
    <section id="wishes" className="comic-standard-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h2 className="comic-section-heading" style={{ margin: 0 }}>
          <Gift size={26} color="#fbbf24" />
          <span>Die Schatzkiste (Alinas Wünsche)</span>
        </h2>
        <TreasureChest size={55} />
      </div>

      <p className="section-desc-text">
        Hier kannst du einen Wunsch reservieren, damit Alina nichts doppelt geschenkt bekommt!
      </p>

      <div className="comic-wishes-grid">
        {wishes.map(wish => {
          const isClaimed = !!wish.claimedBy;
          const isClaiming = claimingId === wish.id;

          return (
            <div key={wish.id} className={`comic-wish-card ${isClaimed ? 'is-claimed' : ''}`}>
              <div>
                <div className="wish-card-title">{wish.title}</div>
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
                      padding: '0.3rem 0.7rem',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-comic)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <Check size={15} />
                      <span>Wird besorgt von: {wish.claimedBy}</span>
                    </span>

                    <button
                      onClick={() => handleUnclaim(wish.id, wish.claimedBy)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.78rem', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
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
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: '130px' }}
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
                    <Sparkles size={15} />
                    <span>Diesen Wunsch erfüllen</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
