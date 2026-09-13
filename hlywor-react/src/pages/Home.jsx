import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileTopbar from '../components/MobileTopbar';
import BottomDock from '../components/BottomDock';
import AuthModal from '../components/AuthModal';
import SearchOverlay from '../components/SearchOverlay';
import PromptSheet from '../components/PromptSheet';
import FeaturedBanner from '../components/FeaturedBanner';
import MicroNotes from '../components/MicroNotes';
import PostCard from '../components/PostCard';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const TAG_COLORS = {
  all: 'var(--ink2)',
  '3am': '#7c3fa8',
  unsaid: '#b03070',
  story: '#cc3333',
  college: '#e8901a',
  thoughts: '#7a50c8',
  healing: '#3a9a60',
  movies: '#3355cc',
  books: '#228844',
};

const TAG_LABELS = {
  all: 'ALL',
  '3am': '🌙 3 AM',
  unsaid: '💔 UNSAID',
  story: '📖 STORY',
  college: '☕ COLLEGE',
  thoughts: '💭 THOUGHTS',
  healing: '🌿 HEALING',
  movies: '🎬 MOVIES',
  books: '📚 BOOKS',
};

export default function Home() {
  const [isNightMode, setIsNightMode] = useState(() => localStorage.getItem('hlywor_night_mode') === 'on');
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState('all');
  const [sortMode, setSortMode] = useState('latest'); // 'latest' | 'random'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Night Mode sync
  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('night-mode');
      localStorage.setItem('hlywor_night_mode', 'on');
    } else {
      document.body.classList.remove('night-mode');
      localStorage.setItem('hlywor_night_mode', 'off');
    }
  }, [isNightMode]);

  // Real-time Firestore listener
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'posts'), where('status', '==', 'published'));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const da = a.createdAt?.toDate ? a.createdAt.toDate() : (a.date ? new Date(a.date) : new Date(0));
          const db_ = b.createdAt?.toDate ? b.createdAt.toDate() : (b.date ? new Date(b.date) : new Date(0));
          return db_ - da;
        });
      setPosts(docs);
      setLoading(false);
    }, (err) => {
      console.error('Firestore posts listener error:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Filtered + sorted posts
  const filteredPosts = useMemo(() => {
    let list = activeTag === 'all'
      ? posts
      : posts.filter(p => {
          const cat = (p.category || p.type || '').toLowerCase();
          const mood = (p.mood || '').toLowerCase();
          const tags = (p.tags || []).map(t => t.toLowerCase());
          return cat === activeTag || mood === activeTag || tags.includes(activeTag);
        });

    if (sortMode === 'random') {
      list = [...list].sort(() => Math.random() - 0.5);
    }
    return list;
  }, [posts, activeTag, sortMode]);

  return (
    <div className="app-container">
      <AuthModal />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} posts={posts} />

      <MobileTopbar
        isNightMode={isNightMode}
        onToggleNightMode={() => setIsNightMode(n => !n)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <Navbar onSearchOpen={() => setIsSearchOpen(true)} />

      <main className="board" id="main-content">

        {/* ── 1. STORYTELLERS STRIP ── */}
        <div className="storytellers-strip reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div className="storytellers-avatars">
              <img src="img/paw.webp" className="storyteller-avatar" alt="Pawan" title="Pawan Limbu" />
              <img src="img/charu1.webp" className="storyteller-avatar" alt="Charu" title="Charu" />
              <img src="img/suv.webp" className="storyteller-avatar" alt="Suvam" title="Suvam Limbu" />
              <img src="img/koushik.webp" className="storyteller-avatar" alt="Morak" title="Morak" />
              <span className="storyteller-avatar-placeholder">+</span>
            </div>
            <div className="storytellers-text">
              <strong>24+ creators</strong> pinned their stories here.{' '}
              <Link to="/crew">Meet the crew →</Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div className="night-owls-badge">
              <span className="freshness-dot"></span>
              <span><strong>{Math.floor(Math.random() * 5) + 1}</strong> reading now</span>
            </div>
            <button
              type="button"
              className={`ambient-widget ${isNightMode ? 'active' : ''}`}
              onClick={() => setIsNightMode(n => !n)}
              aria-label="Toggle midnight mode"
            >
              <span className="ambient-dot"></span>
              <span className="ambient-label">🌙 NIGHT: {isNightMode ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* ── 2. HERO TITLE SHEET ── */}
        <div className="board-header">
          <div className="title-sheet reveal">
            <div className="pin" aria-hidden="true"></div>
            <span className="tape-label" aria-hidden="true">EST. 2025</span>

            <div className="sheet-text-col">
              <div>
                <div className="sheet-eyebrow">// A PINBOARD OF STORIES &amp; MOMENTS</div>
                <h1 className="sheet-title">A place to<br /><em>open up.</em></h1>
                <p className="sheet-sub">
                  Some things don't fit in a conversation. This is where they go.<br />
                  Read ours. Write yours.
                </p>

                <div id="heroLiveBar" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--fire)' }} aria-live="polite">
                    {loading
                      ? 'Connecting to board...'
                      : posts.length > 0
                        ? `// ${posts.length} ${posts.length === 1 ? 'story' : 'stories'} pinned so far`
                        : '// Be the first to pin a story'}
                  </div>
                </div>
              </div>

              <div className="sheet-ctas">
                <Link to="/submit" className="btn-sticky fire">Share your story →</Link>
                <a href="#posts" className="btn-sticky">Browse Stories ↓</a>
              </div>
              <div className="cta-helper">Not ready to write? Just read. No signup needed. ✨</div>
            </div>

            <div className="sheet-photo-col" aria-label="Featured moments">
              <div className="pasted-photo">
                <div className="photo-inner">
                  <span className="photo-inner-label">
                    <img src="img/view.webp" alt="The scenic horizon view" loading="lazy" decoding="async" />
                  </span>
                </div>
                <span className="photo-caption">the view 🌲</span>
              </div>
              <div className="pasted-photo">
                <div className="photo-inner" style={{ background: '#e8e0cc' }}>
                  <span className="photo-inner-label">
                    <img src="img/library.webp" alt="Old library and quiet study shelves" loading="lazy" decoding="async" />
                  </span>
                </div>
                <span className="photo-caption">the library 📚</span>
              </div>
              <div className="pasted-photo">
                <div className="photo-inner" style={{ background: '#dde8d8' }}>
                  <span className="photo-inner-label">
                    <img src="img/building.webp" alt="Campus building structure" loading="lazy" decoding="async" />
                  </span>
                </div>
                <span className="photo-caption">campus building 🏛️</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. DESK TRAY ── */}
        <div className="desk-tray" id="deskTray" style={{ marginBottom: '20px', padding: '14px 16px 10px' }}>
          {/* Row 1: Prompt + Editor's Pick */}
          <div className="desk-row desk-row-top" style={{ marginBottom: '10px' }}>
            <PromptSheet />
            <FeaturedBanner posts={posts} />
          </div>

          {/* Row 2: Micro Notes */}
          <MicroNotes />

          {/* Row 3: Category Filter + Sort */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(26,18,8,0.12)' }}>
            <div className="tape-filter reveal" id="tagBar" role="tablist" aria-label="Filter stories by category">
              {Object.entries(TAG_LABELS).map(([tag, label]) => (
                <button
                  key={tag}
                  className={`tape-tab ${activeTag === tag ? 'active' : ''}`}
                  data-tag={tag}
                  role="tab"
                  aria-selected={activeTag === tag}
                  aria-controls="postsGrid"
                  onClick={() => setActiveTag(tag)}
                  style={{ background: TAG_COLORS[tag] || 'var(--ink2)' }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="sort-bar reveal" role="group" aria-label="Sort stories">
              <button
                className={`sort-tab ${sortMode === 'latest' ? 'active' : ''}`}
                data-sort="latest"
                aria-pressed={sortMode === 'latest'}
                onClick={() => setSortMode('latest')}
              >
                🕐 Latest
              </button>
              <button
                className={`sort-tab ${sortMode === 'random' ? 'active' : ''}`}
                data-sort="random"
                aria-pressed={sortMode === 'random'}
                onClick={() => setSortMode('random')}
              >
                🎲 Random
              </button>
            </div>
          </div>
        </div>

        {/* ── 4. POSTS GRID ── */}
        <section id="posts" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingLeft: '4px' }}>
            <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.62rem', color: 'var(--fire)', letterSpacing: '2px' }}>
              // RECENTLY PINNED
            </span>
            {!loading && posts.length > 0 && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--fire)', boxShadow: '0 0 8px var(--fire)', display: 'inline-block' }} aria-hidden="true"></span>
            )}
          </div>

          <div className="pinboard" id="postsGrid" role="list" aria-label="Pinned stories">
            {loading ? (
              // Skeleton placeholders
              [1, 2, 3, 4].map(i => (
                <div key={i} className="skel-post" aria-hidden="true">
                  <div className="skel-img-box shimmer"></div>
                  <div className="skel-body-box">
                    <div className="skel-line shimmer" style={{ width: `${40 + i * 5}%` }}></div>
                    <div className="skel-line shimmer" style={{ width: `${65 + i * 4}%` }}></div>
                    <div className="skel-line shimmer" style={{ width: `${50 + i * 3}%` }}></div>
                  </div>
                </div>
              ))
            ) : filteredPosts.length === 0 ? (
              <div className="no-posts">
                Nothing pinned in this category yet.<br />
                <Link to="/submit" style={{ color: 'var(--fire)' }}>Be the first to write one. →</Link>
              </div>
            ) : (
              filteredPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))
            )}
          </div>
        </section>

        {/* ── 5. BOARD BOTTOM ── */}
        <div className="board-bottom" style={{ marginTop: '56px' }}>
          {/* About Note */}
          <div className="about-note reveal">
            <div className="pin" aria-hidden="true"></div>
            <div className="note-header">// WHO WE ARE</div>
            <p className="note-text">
              This started as our notebook. Things we lived through, couldn't forget, needed to write down at midnight.<br /><br />
              If you're carrying something like that — <strong>this place is yours too.</strong><br /><br />
              Even if you have no one to tell it to.
            </p>
            <span style={{ fontFamily: 'var(--hand)', fontSize: '0.95rem', color: 'var(--fire)', display: 'block', marginTop: '12px' }}>
              — Pawan &amp; Suvam
            </span>
            <Link to="/about" className="note-link">our full story →</Link>
          </div>

          {/* Team Stickies */}
          <div className="team-stickies reveal">
            <Link to="/crew" className="team-sticky">
              <div className="pin" aria-hidden="true"></div>
              <div className="sticky-name">Pawan Limbu</div>
              <div className="sticky-role">DEVELOPER · WRITER</div>
              <p className="sticky-bio">Building what needs to exist. Puts others first, always.</p>
              <span className="sticky-link">See posts →</span>
            </Link>
            <Link to="/crew" className="team-sticky">
              <div className="pin" aria-hidden="true"></div>
              <div className="sticky-name">Suvam Limbu</div>
              <div className="sticky-role">DEVELOPER · WRITER</div>
              <p className="sticky-bio">Still sees the world as mostly good. Turning that into words.</p>
              <span className="sticky-link">See posts →</span>
            </Link>
          </div>

          {/* CTA Note */}
          <div className="cta-note reveal">
            <div className="pin" aria-hidden="true"></div>
            <div className="cta-title">Got a story?</div>
            <p className="cta-text">
              Something you've been meaning to say. Something that happened and you still think about it.
              Doesn't matter if it's big, small, 3am, whatever.<br /><br />
              Just put it here.
            </p>
            <Link to="/submit" className="btn-sticky" style={{ background: '#fff', color: 'var(--fire)', display: 'inline-block' }}>
              Pin your story →
            </Link>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="board-footer" role="contentinfo">
        <div className="footer-left">
          <span className="footer-copy">© {new Date().getFullYear()} HlyWor — a place to open up</span>
          <nav className="footer-links" aria-label="Footer">
            <Link to="/about">About</Link>
            <Link to="/crew">The Crew</Link>
            <a href="https://hlywor.fun/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="https://hlywor.fun/terms&condition.html" target="_blank" rel="noopener noreferrer">Terms</a>
          </nav>
        </div>
        <div className="footer-center">
          <div className="footer-logo">HlYWoR</div>
        </div>
        <div className="footer-right">
          <div className="footer-location">
            📍 Somewhere between 3 AM<br />and everything left unsaid
          </div>
        </div>
      </footer>

      <BottomDock />
    </div>
  );
}