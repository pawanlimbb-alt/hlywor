import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileTopbar from '../components/MobileTopbar';
import BottomDock from '../components/BottomDock';
import AuthModal from '../components/AuthModal';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

/* ── Founder data (hardcoded, matching character.html exactly) ── */
const FOUNDERS = [
  {
    name: 'Pawan Limbu',
    handle: 'PAWAN.EXE',
    role: 'DEVELOPER · WRITER',
    bio: 'Writes stories and survives BTech. Believes every bad day is just future writing material.',
    accent: '#e8681a',
    pinColor: 'radial-gradient(circle at 35% 35%,#ff9999,#cc3333)',
    pinLeft: 36,
    tilt: -1.6,
    photo: '/img/me1.jpg',
    professions: ['Student', 'BTech'],
    age: 20,
    founderLabel: '★ FOUNDER',
    ctaText: 'Read his stories',
    slug: 'pawan',
    stats: [
      { label: 'WRITING', val: 88 },
      { label: 'CODING',  val: 82 },
      { label: 'VIBES',   val: 91 },
      { label: 'SLEEP',   val: 22 },
    ],
  },
  {
    name: 'Suvam Limbu',
    handle: 'SUVAM.EXE',
    role: 'DEVELOPER · MOVIE BRAIN',
    bio: 'Loves movies and chaos equally. Strong opinions about everything, apologises for none.',
    accent: '#5c8ae8',
    pinColor: 'radial-gradient(circle at 35% 35%,#99bbff,#2244cc)',
    pinLeft: 56,
    tilt: 1.3,
    photo: '/img/library1.jpg',
    professions: ['Student', 'BTech'],
    age: 20,
    founderLabel: '★ FOUNDER',
    ctaText: 'Read his stories',
    slug: 'suvam',
    stats: [
      { label: 'MOVIES', val: 95 },
      { label: 'CODING', val: 78 },
      { label: 'CHAOS',  val: 97 },
      { label: 'FILTER', val: 18 },
    ],
  },
  {
    name: 'Morak',
    handle: 'EzaF.EXE',
    role: 'CREATOR · OWN LANE',
    bio: "Making his own shit. Doesn't follow trends — sets them. Or at least that's the plan.",
    accent: '#5cbc7a',
    pinColor: 'radial-gradient(circle at 35% 35%,#aaeebb,#228844)',
    pinLeft: 44,
    tilt: -0.8,
    photo: '/img/koushik.webp',
    professions: ['Creator', 'Freelancer'],
    age: null,
    founderLabel: '★ FOUNDER',
    ctaText: 'Read his stories',
    slug: 'koushik',
    stats: [
      { label: 'GRIND', val: 93 },
      { label: 'IDEAS', val: 89 },
      { label: 'VIBE',  val: 85 },
      { label: 'CHILL', val: 55 },
    ],
  },
  {
    name: 'Charu',
    handle: 'CML.EXE',
    role: 'WRITER · DREAMER',
    bio: 'Writes with love. Sees the world softer than it is — and makes you see it that way too.',
    accent: '#e85c9a',
    pinColor: 'radial-gradient(circle at 35% 35%,#ffaacc,#cc2266)',
    pinLeft: 62,
    tilt: 1.9,
    photo: '/img/charu6.webp',
    professions: ['Writer', 'Student'],
    age: null,
    founderLabel: '★ 1st Poster',
    ctaText: 'Read her stories',
    slug: 'charu',
    stats: [
      { label: 'WARMTH',  val: 99 },
      { label: 'WRITING', val: 87 },
      { label: 'FEELS',   val: 96 },
      { label: 'MEAN',    val: 4  },
    ],
  },
];

const FOUNDER_NAMES = ['pawan','pawan limbu','pawan.exe','suvam','suvam limbu','suvam.exe','charu','charu maya limbu','cml.exe','morak','koushik','ezaf.exe'];
const FOUNDER_SLUGS = ['pawan','pawan-limbu','pawan-exe','suvam','suv','suvam-limbu','suvam-exe','charu','charu-maya-limbu','charu-limbu','cml','koushik','morak','ezaf'];

function isFounderPerson(p) {
  const n = (p.name || '').toLowerCase().trim();
  const s = (p.slug || '').toLowerCase().trim();
  return FOUNDER_NAMES.some(fn => n.includes(fn)) || FOUNDER_SLUGS.includes(s);
}

const ACCENTS = ['#e8681a','#5c8ae8','#5cbc7a','#a06ae8','#e85c9a','#e8c01a','#5ccfbc'];
const PIN_COLORS = [
  'radial-gradient(circle at 35% 35%,#ff9999,#cc3333)',
  'radial-gradient(circle at 35% 35%,#99bbff,#3355cc)',
  'radial-gradient(circle at 35% 35%,#aaeeaa,#228844)',
  'radial-gradient(circle at 35% 35%,#ffcc99,#cc6622)',
  'radial-gradient(circle at 35% 35%,#ffaacc,#cc2266)',
];
const TILT_MAP = [-1.4, 1.1, -0.6, 1.8];
const PIN_LEFTS = [30, 54, 40, 66, 44];

/* ── Stat Bar (animated on intersect) ── */
function StatBar({ label, val, accent }) {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { el.style.transform = `scaleX(${(val / 100).toFixed(2)})`; ro.unobserve(el); }
      });
    }, { threshold: 0.25 });
    ro.observe(el);
    return () => ro.disconnect();
  }, [val]);

  return (
    <div className="char-stat-r">
      <span className="char-stat-lbl">{label}</span>
      <div className="char-stat-bar-w">
        <div
          ref={barRef}
          className="char-stat-bar"
          style={{ '--acc': accent, '--sv': (val / 100).toFixed(2) }}
        ></div>
      </div>
      <span className="char-stat-n">{String(val).padStart(2, '0')}</span>
    </div>
  );
}

/* ── Founder Card (hardcoded) ── */
function FounderCard({ person }) {
  return (
    <Link
      to={`/profile/${person.slug}`}
      className="char-card"
      style={{ transform: `rotate(${person.tilt}deg)` }}
    >
      <div className="card-pin" style={{ left: `${person.pinLeft}%`, background: person.pinColor }}></div>
      <div className="founder-star">{person.founderLabel}</div>

      <div className="photos-area c1">
        <div className="diary-photo">
          <img src={person.photo} alt={person.name} loading="lazy" />
        </div>
      </div>

      <div className="card-body">
        <div className="card-ruled">
          <span className="card-handle" style={{ background: person.accent }}>{person.handle}</span>
          <div className="card-name">{person.name}</div>
          <div className="card-role" style={{ color: person.accent }}>{person.role}</div>
          <p className="card-bio">{person.bio}</p>

          <div className="card-prof-row">
            {person.professions.map(p => (
              <span key={p} className="prof-chip" style={{ background: person.accent }}>{p}</span>
            ))}
            {person.age && <span className="age-chip">AGE: {person.age}</span>}
          </div>

          <div className="char-card-stats">
            {person.stats.map(s => (
              <StatBar key={s.label} label={s.label} val={s.val} accent={person.accent} />
            ))}
          </div>
        </div>
        <div className="card-cta" style={{ background: person.accent }}>
          {person.ctaText} <span className="cta-arr">→</span>
        </div>
      </div>
      <div className="card-torn"></div>
    </Link>
  );
}

/* ── Community Person Card (from Firestore) ── */
function PersonCard({ person, index }) {
  const accent = person.accent || ACCENTS[index % ACCENTS.length];
  const pinColor = PIN_COLORS[index % PIN_COLORS.length];
  const pinLeft = PIN_LEFTS[index % PIN_LEFTS.length];
  const tilt = TILT_MAP[index % TILT_MAP.length];
  const photos = (person.photos || []).filter(Boolean).slice(0, 3);
  const stats = person.stats || [];
  const profs = person.professions || [];
  const slug = person.slug || (person.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <Link
      to={`/profile/${slug}`}
      className="char-card char-card-in"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="card-pin" style={{ left: `${pinLeft}%`, background: pinColor }}></div>

      {/* Photos collage */}
      {photos.length === 0 ? (
        <div className="photos-area c0">
          <span className="no-photo-hint">no photo yet</span>
        </div>
      ) : (
        <div className={`photos-area c${photos.length}`}>
          {photos.map((url, pi) => (
            <div key={pi} className="diary-photo">
              <img src={url} alt={person.name} loading="lazy" />
              {person.photoCaptions?.[pi] && (
                <div className="diary-photo-cap">{person.photoCaptions[pi]}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card-body">
        <div className="card-ruled">
          <span className="card-handle" style={{ background: accent }}>
            {person.handle || (person.name || '').split(' ')[0].toUpperCase() + '.EXE'}
          </span>
          <div className="card-name">{person.name}</div>
          <div className="card-role" style={{ color: accent }}>{(person.role || '').toUpperCase()}</div>
          <p className="card-bio">{person.bio || ''}</p>

          {(profs.length > 0 || person.age) && (
            <div className="card-prof-row">
              {profs.slice(0, 3).map(p => (
                <span key={p} className="prof-chip" style={{ background: accent }}>{p}</span>
              ))}
              {person.age && <span className="age-chip">AGE: {person.age}</span>}
            </div>
          )}

          {stats.length > 0 && (
            <div className="char-card-stats">
              {stats.slice(0, 4).map(s => {
                const v = Math.min(99, Math.max(1, parseInt(s.val) || 50));
                return <StatBar key={s.label} label={(s.label || '').slice(0, 7)} val={v} accent={accent} />;
              })}
            </div>
          )}
        </div>

        <div className="card-cta" style={{ background: accent }}>
          {person.ctaText || 'See their stories'} <span className="cta-arr">→</span>
        </div>
      </div>
      <div className="card-torn"></div>
    </Link>
  );
}

/* ── Main Character / People Page ── */
export default function Character() {
  const [people, setPeople] = useState([]);
  const [activeTag, setActiveTag] = useState('all');
  const [loading, setLoading] = useState(true);

  // Live Firestore feed — `people` collection, status == 'published'
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'people'), where('status', '==', 'published'));
    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => !isFounderPerson(p))
        .sort((a, b) => {
          const da = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const db_ = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return db_ - da;
        });
      setPeople(docs);
      setLoading(false);
    }, err => {
      console.error('People listener error:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredPeople = useMemo(() => {
    if (activeTag === 'all') return people;
    return people.filter(p => (p.type || 'other').toLowerCase() === activeTag);
  }, [people, activeTag]);

  const TAPE_FILTERS = [
    { tag: 'all',       label: 'ALL',     bg: '#3d3020' },
    { tag: 'writer',    label: 'WRITER',  bg: '#e85c5c' },
    { tag: 'developer', label: 'DEV',     bg: '#5c8ae8' },
    { tag: 'artist',    label: 'ARTIST',  bg: '#5cbc7a' },
    { tag: 'student',   label: 'STUDENT', bg: '#e8901a' },
    { tag: 'creator',   label: 'CREATOR', bg: '#a06ae8' },
    { tag: 'other',     label: 'OTHER',   bg: '#888'    },
  ];

  return (
    <div className="app-container">
      <AuthModal />
      <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
      <Navbar />

      {/* Page Header — matches HTML exactly */}
      <div className="char-page-header">
        <div>
          <div className="char-header-tape">// THE CREW</div>
          <h1 className="char-page-title">Meet the<br /><em>people.</em></h1>
          <p className="char-page-sub">
            Everyone who's pinned themselves here. Real people, real stories. You could be on this wall too.
          </p>
        </div>
        <Link to="/submit-profile" className="char-header-cta">Pin yourself →</Link>
      </div>

      {/* Board */}
      <div className="char-board">

        {/* ── FOUNDERS SECTION ── */}
        <div className="char-section-head" style={{ marginBottom: '20px' }}>
          <span className="char-section-label" style={{ color: 'var(--gold)' }}>THE FOUNDERS</span>
          <div className="char-section-line"></div>
          <span className="char-founder-badge">OG CREW</span>
        </div>

        <div className="char-pinboard" id="foundersBoard">
          {FOUNDERS.map(f => <FounderCard key={f.slug} person={f} />)}
        </div>

        {/* ── COMMUNITY SECTION ── */}
        <div className="char-section-head" style={{ margin: '52px 0 20px' }}>
          <span className="char-section-label" style={{ color: 'var(--fire)' }}>THE COMMUNITY</span>
          <div className="char-section-line"></div>
          <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.55rem', color: 'var(--ink4)', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            {loading ? 'LOADING...' : `${people.length} PINNED`}
          </span>
        </div>

        {/* Tape Filter */}
        <div className="char-tape-bar">
          {TAPE_FILTERS.map(f => (
            <button
              key={f.tag}
              className={`char-tape-btn ${activeTag === f.tag ? 'active' : ''}`}
              style={{ background: f.bg }}
              onClick={() => setActiveTag(f.tag)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Community Grid */}
        <div className="char-pinboard" id="communityBoard">
          {loading ? (
            // Skeleton loading
            [1, 2, 3, 4].map(i => (
              <div key={i} className="char-skel" style={{ transform: i % 2 === 0 ? 'rotate(0.9deg)' : 'rotate(-1.2deg)' }}>
                <div className="char-skel-ph shimmer"></div>
                <div className="char-skel-bd">
                  <div className="char-skel-ln shimmer" style={{ width: '40%' }}></div>
                  <div className="char-skel-ln shimmer" style={{ width: '70%' }}></div>
                  <div className="char-skel-ln shimmer" style={{ width: '55%' }}></div>
                </div>
              </div>
            ))
          ) : filteredPeople.length === 0 ? (
            <div className="char-board-empty">
              Nobody here yet in this category.<br />
              <Link to="/submit-profile" style={{ color: 'var(--fire)' }}>Be the first →</Link>
            </div>
          ) : (
            filteredPeople.map((p, i) => <PersonCard key={p.id} person={p} index={i} />)
          )}
        </div>

      </div>{/* /board */}

      {/* Footer */}
      <footer className="board-footer" role="contentinfo">
        <div className="footer-left">
          <span className="footer-copy">© {new Date().getFullYear()} HlyWor — a place to open up</span>
          <nav className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
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
