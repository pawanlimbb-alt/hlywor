import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function MicroNotes() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('global');
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('🌙');
  const [visibility, setVisibility] = useState('global');
  const { currentUser, requireLogin } = useAuth();

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'microNotes'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const docs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(n => {
          // 48 hour expiration check
          if (n.createdAt?.toDate) {
            const ageHours = (now - n.createdAt.toDate()) / (1000 * 60 * 60);
            if (ageHours > 48) return false;
          }
          return true;
        });
      setNotes(docs);
    });
    return () => unsub();
  }, []);

  const handlePostNote = async () => {
    if (!text.trim()) return;
    if (!currentUser) {
      requireLogin('Sign in to pin a micro note.');
      return;
    }
    try {
      await addDoc(collection(db, 'microNotes'), {
        authorUid: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        content: text.trim(),
        emoji: emoji,
        visibility: visibility,
        createdAt: serverTimestamp()
      });
      setText('');
    } catch (e) {
      console.error("Failed to post note", e);
      alert("Failed to post note: " + e.message);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteDoc(doc(db, 'microNotes', id));
    } catch (e) {
      console.error("Failed to delete note", e);
    }
  };

  const filteredNotes = notes.filter(n => {
    if (viewMode === 'global') return n.visibility === 'global' || !n.visibility;
    return n.visibility === 'following' || n.authorUid === currentUser?.uid;
  });

  const remaining = 180 - text.length;

  return (
    <div className="micro-notes-box reveal" style={{ marginBottom: '12px' }}>
      <div className="micro-head">
        <button 
          className="micro-head-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="micro-head-title">📌 DROP A QUICK NOTE</span>
          <span className="micro-head-sub">Raw · 1-2 lines · 48h expire</span>
          <span className="micro-head-chevron">{isOpen ? '▾' : '▸'}</span>
        </button>
        <div className="micro-view-tabs" role="tablist">
          <button 
            className={`micro-view-toggle-btn ${viewMode === 'global' ? 'active' : ''}`}
            onClick={() => setViewMode('global')}
          >
            🌍 Global
          </button>
          <button 
            className={`micro-view-toggle-btn ${viewMode === 'following' ? 'active' : ''}`}
            onClick={() => setViewMode('following')}
          >
            👥 Following
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="micro-body">
          <div className="micro-compose">
            <div className="micro-compose-row" style={{ position: 'relative' }}>
              <textarea
                className="micro-textarea"
                maxLength={180}
                placeholder="Type a midnight thought, confession, or feeling…"
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <span 
                style={{ 
                  fontFamily: 'var(--sans)', 
                  fontSize: '0.68rem', 
                  color: remaining < 20 ? 'var(--fire)' : 'rgba(255,255,255,0.4)', 
                  fontWeight: remaining < 20 ? '700' : 'normal',
                  position: 'absolute', 
                  right: '10px', 
                  bottom: '6px', 
                  pointerEvents: 'none' 
                }}
              >
                {remaining}
              </span>
            </div>
            <div className="micro-actions">
              <div className="micro-emojis">
                {['🌙', '❤️', '😭', '🔥', '🫂', '✨'].map(em => (
                  <button
                    key={em}
                    type="button"
                    className={`micro-emoji-btn ${emoji === em ? 'selected' : ''}`}
                    onClick={() => setEmoji(em)}
                  >
                    {em}
                  </button>
                ))}
              </div>
              <div className="micro-post-controls">
                <div className="micro-vis-select">
                  <label>
                    <input 
                      type="radio" 
                      name="visibility" 
                      value="global" 
                      checked={visibility === 'global'} 
                      onChange={() => setVisibility('global')} 
                    /> 🌍 Global
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="visibility" 
                      value="following" 
                      checked={visibility === 'following'} 
                      onChange={() => setVisibility('following')} 
                    /> 👥 Followers
                  </label>
                </div>
                <button type="button" className="micro-pin-btn" onClick={handlePostNote}>
                  Pin Note 📌
                </button>
              </div>
            </div>
          </div>

          <div className="micro-feed">
            {filteredNotes.length === 0 ? (
              <p style={{ opacity: 0.4, fontSize: '0.8rem', textAlign: 'center', padding: '12px 0' }}>
                No notes pinned recently. Be the first!
              </p>
            ) : (
              filteredNotes.map(n => (
                <div key={n.id} className="micro-card">
                  <span className="micro-card-emoji">{n.emoji || '🌙'}</span>
                  <div className="micro-card-content">
                    <p className="micro-card-text">{n.content}</p>
                    <span className="micro-card-author">— {n.authorName || 'Anonymous'}</span>
                  </div>
                  {currentUser && currentUser.uid === n.authorUid && (
                    <button 
                      type="button" 
                      className="micro-card-del" 
                      onClick={() => handleDeleteNote(n.id)}
                      title="Delete note"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
