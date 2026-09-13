import React from 'react';
import Navbar from '../components/Navbar';
import MobileTopbar from '../components/MobileTopbar';
import BottomDock from '../components/BottomDock';

export default function About() {
  return (
    <div className="app-container">
      <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
      <Navbar />

      <main className="board" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
        <div className="title-sheet reveal" style={{ transform: 'none', maxWidth: '100%' }}>
          <div className="pin"></div>
          <h1 className="sheet-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            About <em>HlYWoR</em>
          </h1>
          <p className="sheet-sub" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink2)' }}>
            HlYWoR (Healing Words) is a digital pinboard born out of late-night thoughts, unsaid feelings, and personal stories.
            Some things don't fit into regular conversations, social media posts, or text messages. This is the quiet place where they belong.
          </p>
          <div style={{ marginTop: '24px' }}>
            <a href="/" className="btn-sticky fire">← Back to Pinboard</a>
          </div>
        </div>
      </main>

      <BottomDock />
    </div>
  );
}
