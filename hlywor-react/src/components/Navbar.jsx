import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearchOpen }) {
  return (
    <nav className="nav-strip" role="navigation" aria-label="Main">
      <Link to="/" className="nav-logo">HlYWoR</Link>
      <div className="nav-divider"></div>
      <div className="nav-icon-links">
        <Link to="/about" className="nav-icon-link">ABOUT</Link>
        <Link to="/crew" className="nav-icon-link">THE CREW</Link>
      </div>
      <div className="nav-bottom">
        <button className="nav-btn" onClick={onSearchOpen} aria-label="Open search">⌕</button>
      </div>
    </nav>
  );
}