import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authPromptText, loginWithGoogle } = useAuth();

  if (!showAuthModal) return null;

  return (
    <div className="search-overlay open" onClick={(e) => e.target.classList.contains('search-overlay') && setShowAuthModal(false)}>
      <div className="search-modal" style={{ maxWidth: '380px', textAlign: 'center', padding: '28px 24px' }}>
        <div className="search-modal-header" style={{ justifyContent: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'var(--pixel)', fontSize: '0.65rem', color: 'var(--fire)', letterSpacing: '1px' }}>
            🔐 SIGN IN TO HLYWOR
          </h3>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--ink2)', marginBottom: '20px' }}>
          {authPromptText}
        </p>
        <button
          type="button"
          onClick={loginWithGoogle}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: '6px',
            border: '1px solid rgba(0,0,0,0.15)',
            background: '#ffffff',
            color: '#333',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.13-3.72L.97 13.07C2.47 16.05 5.51 18 9 18z"/>
            <path fill="#FBBC05" d="M3.87 10.8c-.19-.53-.3-1.1-.3-1.8s.11-1.27.3-1.8L.97 4.93C.35 6.16 0 7.54 0 9s.35 2.84.97 4.07l2.9-2.27z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.51 0 2.47 1.95.97 4.93l2.9 2.27c.72-2.15 2.75-3.62 5.13-3.62z"/>
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => setShowAuthModal(false)}
          style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--ink3)', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
