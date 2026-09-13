import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileTopbar({ isNightMode, onToggleNightMode, onSearchOpen }) {
  return (
    <header className="mobile-topbar">
      <Link to="/" className="mtb-logo">HlYWoR</Link>
      <div className="mtb-right">
        <button type="button" className="mtb-night-btn" onClick={onToggleNightMode}>
          {isNightMode ? '☀️ Day' : '🌙 Theme'}
        </button>
        <button type="button" className="mtb-search-btn" onClick={onSearchOpen} aria-label="Search">
          ⌕
        </button>
      </div>
    </header>
  );
}