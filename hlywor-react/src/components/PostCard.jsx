import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs, onSnapshot, limit, serverTimestamp } from 'firebase/firestore';

const TILT_ANGLES = [-1.4, 1.2, -0.8, 1.6, -1.2, 0.9, -1.5, 1.3];

export default function PostCard({ post, index }) {
  const { currentUser, requireLogin } = useAuth();
  const [reactions, setReactions] = useState({ '🔥': 0, '❤️': 0, '😭': 0 });
  const [userReacted, setUserReacted] = useState({});

  const cover = post.thumbnail || post.photo || post.coverImage || post.image;
  const slug = post.slug || post.id;
  const rot = TILT_ANGLES[index % TILT_ANGLES.length];

  // Load real reaction counts from Firestore
  useEffect(() => {
    if (!db || !slug) return;
    const q = query(collection(db, 'reactions'), where('postSlug', '==', slug));
    const unsub = onSnapshot(q, (snap) => {
      const counts = { '🔥': 0, '❤️': 0, '😭': 0 };
      const reacted = {};
      snap.docs.forEach(d => {
        const { emoji, uid } = d.data();
        if (counts[emoji] !== undefined) counts[emoji]++;
        if (currentUser && uid === currentUser.uid) reacted[emoji] = true;
      });
      setReactions(counts);
      setUserReacted(reacted);
    });
    return () => unsub();
  }, [slug, currentUser]);

  const handleToggleReaction = async (emoji) => {
    if (!currentUser) {
      requireLogin('Sign in to react to stories.');
      return;
    }
    const isReacted = userReacted[emoji];

    // Optimistic UI update
    setUserReacted(prev => ({ ...prev, [emoji]: !isReacted }));
    setReactions(prev => ({ ...prev, [emoji]: isReacted ? Math.max(0, prev[emoji] - 1) : prev[emoji] + 1 }));

    if (!db) return;
    try {
      if (isReacted) {
        const snap = await getDocs(query(
          collection(db, 'reactions'),
          where('postSlug', '==', slug),
          where('emoji', '==', emoji),
          where('uid', '==', currentUser.uid),
          limit(1)
        ));
        if (!snap.empty) await deleteDoc(doc(db, 'reactions', snap.docs[0].id));
      } else {
        await addDoc(collection(db, 'reactions'), {
          postSlug: slug,
          emoji,
          uid: currentUser.uid,
          createdAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn("Reaction toggle error", e);
      // Revert optimistic update on failure
      setUserReacted(prev => ({ ...prev, [emoji]: isReacted }));
      setReactions(prev => ({ ...prev, [emoji]: isReacted ? prev[emoji] + 1 : Math.max(0, prev[emoji] - 1) }));
    }
  };

  const category = (post.category || post.type || 'story').toLowerCase();
  const readTime = post.readtime || (Math.max(2, Math.ceil(((post.desc || '').split(/\s+/).length) / 25 + 2)) + ' min');

  return (
    <div className="pinned-post reveal" style={{ '--rot': `${rot}deg`, transform: `rotate(${rot}deg)` }}>
      {/* Red/Blue/Green Pushpin at top of each polaroid card */}
      <div className="post-pin" aria-hidden="true"></div>

      {cover ? (
        <div className="post-photo">
          <Link to={`/post/${slug}`}>
            <img src={cover} alt={post.title} loading="lazy" decoding="async" />
          </Link>
          <div className="photo-corner tl" aria-hidden="true"></div>
          <div className="photo-corner tr" aria-hidden="true"></div>
          <div className="photo-corner bl" aria-hidden="true"></div>
          <div className="photo-corner br" aria-hidden="true"></div>
        </div>
      ) : (
        <div className="post-noimg">
          <div className="post-noimg-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
          <div className="post-noimg-label">no photo</div>
        </div>
      )}

      <div className="post-note-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.48rem', color: 'var(--fire)', letterSpacing: '1.5px' }}>
            {category.toUpperCase()}
          </span>
          {post.mood && (
            <span className="post-mood-badge">{post.mood}</span>
          )}
        </div>

        <h3 className="post-note-title">
          <Link to={`/post/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{post.title}</Link>
        </h3>
        <p className="post-note-desc">
          {post.desc || (post.content ? post.content.replace(/<[^>]*>?/gm, '').slice(0, 130) + '...' : '')}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          <div className="post-author-wrap">
            <span className="post-author-hand">
              by {post.isAnonymous ? 'Anonymous' : (post.author || 'HlyWor')}
            </span>
          </div>
          <Link to={`/post/${slug}`} className="post-read-hand">
            {readTime} read →
          </Link>
        </div>
      </div>

      <div className="post-stickers">
        {['🔥', '❤️', '😭'].map(e => (
          <button
            key={e}
            className={`sticker-btn ${userReacted[e] ? 'reacted' : ''}`}
            type="button"
            onClick={() => handleToggleReaction(e)}
            aria-label={`React with ${e}`}
          >
            {e} <span className="sticker-count" aria-live="polite">{reactions[e]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
