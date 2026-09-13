import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchOverlay({ isOpen, onClose, posts }) {
  const [queryText, setQueryText] = useState('');

  if (!isOpen) return null;

  const results = !queryText.trim() ? [] : posts.filter(p => {
    const q = queryText.toLowerCase();
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.desc || '').toLowerCase().includes(q) ||
      (p.author || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="search-overlay open" onClick={(e) => e.target.classList.contains('search-overlay') && onClose()}>
      <div className="search-modal">
        <div className="search-modal-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search stories by title, topic, or author..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            autoFocus
          />
          <button type="button" className="search-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="search-results">
          {queryText.trim() && results.length === 0 && (
            <p style={{ opacity: 0.5, textAlign: 'center', padding: '20px' }}>No stories match your search.</p>
          )}

          {results.map(post => (
            <Link
              key={post.id}
              to={`/post/${post.slug || post.id}`}
              className="search-result-item"
              onClick={onClose}
              style={{ display: 'block', padding: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none' }}
            >
              <div style={{ fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '4px' }}>
                {(post.category || 'STORY').toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--hand)', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 'bold' }}>
                {post.title}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--ink3)' }}>
                by {post.author || 'Anonymous'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
