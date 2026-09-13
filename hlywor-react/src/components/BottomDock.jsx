import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BottomDock() {
  const location = useLocation();
  const { currentUser, requireLogin } = useAuth();
  const path = location.pathname;

  return (
    <div className="bottom-dock">
      <div className="dock-inner">
        <Link to="/" className={`dock-item ${path === '/' ? 'active' : ''}`}>
          <div className="dock-icon">
            <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <span className="dock-label">Pinboard</span>
        </Link>

        <Link to="/about" className={`dock-item ${path === '/about' ? 'active' : ''}`}>
          <div className="dock-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          <span className="dock-label">About</span>
        </Link>

        <Link 
          to="/submit" 
          className="dock-item dock-write"
          onClick={(e) => {
            if (!currentUser) {
              e.preventDefault();
              requireLogin('Sign in to share your story.');
            }
          }}
        >
          <div className="dock-icon">
            <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <span className="dock-label">Write</span>
        </Link>

        <Link to="/crew" className={`dock-item ${path === '/crew' ? 'active' : ''}`}>
          <div className="dock-icon">
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>
          </div>
          <span className="dock-label">Crew</span>
        </Link>
      </div>
    </div>
  );
}
