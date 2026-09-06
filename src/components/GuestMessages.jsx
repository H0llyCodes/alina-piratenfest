import React, { useState, useEffect } from 'react';
import { getGuestMessages, addGuestMessage, removeGuestMessage } from '../services/storage';
import { Send, Mail, Trash2 } from 'lucide-react';

export default function GuestMessages() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setMessages(await getGuestMessages() || []);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!sender.trim() || !text.trim()) return;
    const updated = await addGuestMessage(sender.trim(), text.trim());
    setMessages(updated);
    setSender('');
    setText('');
    setShowForm(false);
  };

  const handleDelete = async (id, senderName) => {
    if (confirm(`Möchtest du den Gruß von "${senderName}" wirklich löschen?`)) {
      setMessages(await removeGuestMessage(id));
    }
  };

  return (
    <section id="messages" className="comic-standard-card text-center-all">
      <div className="section-title-wrap">
        <h2 className="comic-section-heading" style={{ margin: 0, justifyContent: 'center' }}>
          <Mail size={24} color="#0284c7" />
          <span>Flaschenpost (Grüße an Alina)</span>
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="comic-btn" style={{ minHeight: '44px', height: '44px' }}>
          <Send size={15} />
          <span>Gruß schreiben</span>
        </button>
      </div>

      <p className="section-desc-text">
        Hinterlasse Alina einen lieben Geburtstagsgruß für ihre Kaperfahrt!
      </p>

      {showForm && (
        <form onSubmit={handleSend} style={{
          background: '#f8fafc',
          padding: '1.1rem',
          borderRadius: '14px',
          border: '2px solid var(--outline-dark)',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <input
              type="text"
              placeholder="Dein Name..."
              className="comic-text-input"
              value={sender}
              onChange={e => setSender(e.target.value)}
              required
            />
            <textarea
              rows="3"
              placeholder="Deine Nachricht an Alina..."
              className="comic-text-input"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button type="submit" className="comic-btn comic-btn-primary">
              Flaschenpost abschicken
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontFamily: 'var(--font-comic)', fontSize: '0.95rem' }}
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            background: '#ffffff',
            border: '2px solid var(--outline-dark)',
            borderLeft: '6px solid #0284c7',
            padding: '0.85rem 1.1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 0 var(--outline-dark)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
              <div style={{ fontFamily: 'var(--font-comic)', fontSize: '1rem', fontWeight: 700, color: '#0284c7' }}>
                🏴‍☠️ {msg.sender}
              </div>
              <button
                onClick={() => handleDelete(msg.id, msg.sender)}
                title="Gruß löschen"
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              „{msg.text}“
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
