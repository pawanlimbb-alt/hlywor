import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileTopbar from '../components/MobileTopbar';
import BottomDock from '../components/BottomDock';
import AuthModal from '../components/AuthModal';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const REACTION_EMOJIS = ['🔥', '❤️', '😭', '🤝', '💡'];

const CAT_CLASSES = {
  story: 'cat-story',
  movies: 'cat-movies',
  books: 'cat-books',
  thoughts: 'cat-thoughts',
  college: 'cat-college',
  news: 'cat-news'
};

export default function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser, requireLogin } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingTheme, setReadingTheme] = useState(() => localStorage.getItem('hlywor_reader_theme') || 'sepia');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reactions state
  const [reactionCounts, setReactionCounts] = useState({ '🔥': 0, '❤️': 0, '😭': 0, '🤝': 0, '💡': 0 });
  const [userReactions, setUserReactions] = useState({});

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentMood, setCommentMood] = useState('🌙');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [collapsedThreads, setCollapsedThreads] = useState({});

  // Author Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Read Next Stories
  const [readNext, setReadNext] = useState([]);

  // Follow state
  const [isFollowing, setIsFollowing] = useState(false);
  const [stickDocId, setStickDocId] = useState(null);

  // Reading Theme sync
  useEffect(() => {
    if (readingTheme === 'sepia') {
      document.body.removeAttribute('data-reading-theme');
    } else {
      document.body.setAttribute('data-reading-theme', readingTheme);
    }
    localStorage.setItem('hlywor_reader_theme', readingTheme);
    return () => document.body.removeAttribute('data-reading-theme');
  }, [readingTheme]);

  // Scroll Progress sync
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Post
  useEffect(() => {
    if (!db || !slug) return;
    setLoading(true);

    const fetchPost = async () => {
      try {
        let q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
        let snap = await getDocs(q);

        if (snap.empty) {
          q = query(collection(db, 'posts'), where('__name__', '==', slug), limit(1));
          snap = await getDocs(q);
        }

        if (!snap.empty) {
          const docData = { id: snap.docs[0].id, ...snap.docs[0].data() };
          setPost(docData);
          setEditTitle(docData.title || '');
          setEditDesc(docData.desc || '');
          setEditContent(docData.content || '');

          // Fetch Read Next
          const nextSnap = await getDocs(query(collection(db, 'posts'), where('status', '==', 'published'), limit(6)));
          const nextDocs = nextSnap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(d => (d.slug || d.id) !== slug && d.id !== docData.id)
            .slice(0, 3);
          setReadNext(nextDocs);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Fetch post error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Reactions snapshot
  useEffect(() => {
    if (!db || !slug) return;
    const q = query(collection(db, 'reactions'), where('postSlug', '==', slug));
    const unsub = onSnapshot(q, (snap) => {
      const counts = { '🔥': 0, '❤️': 0, '😭': 0, '🤝': 0, '💡': 0 };
      const userState = {};
      snap.docs.forEach(d => {
        const { emoji, uid } = d.data();
        if (counts[emoji] !== undefined) counts[emoji]++;
        if (currentUser && uid === currentUser.uid) userState[emoji] = d.id;
      });
      setReactionCounts(counts);
      setUserReactions(userState);
    });
    return () => unsub();
  }, [slug, currentUser]);

  // Comments snapshot
  useEffect(() => {
    if (!db || !slug) return;
    const q = query(collection(db, 'comments'), where('postSlug', '==', slug));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const da = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
          const db_ = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
          return da - db_;
        });
      setComments(docs);
    });
    return () => unsub();
  }, [slug]);

  // Follow author status
  useEffect(() => {
    if (!db || !currentUser || !post?.authorUid || currentUser.uid === post.authorUid) return;
    const checkFollow = async () => {
      try {
        const snap = await getDocs(query(
          collection(db, 'sticks'),
          where('fromUid', '==', currentUser.uid),
          where('toUid', '==', post.authorUid),
          limit(1)
        ));
        if (!snap.empty) {
          setIsFollowing(true);
          setStickDocId(snap.docs[0].id);
        } else {
          setIsFollowing(false);
          setStickDocId(null);
        }
      } catch (e) { }
    };
    checkFollow();
  }, [post?.authorUid, currentUser]);

  // Reaction toggle handler
  const handleToggleReaction = async (emoji) => {
    if (!currentUser) {
      requireLogin('Sign in to react to this story.');
      return;
    }

    const existingDocId = userReactions[emoji];
    try {
      if (existingDocId) {
        await deleteDoc(doc(db, 'reactions', existingDocId));
      } else {
        await addDoc(collection(db, 'reactions'), {
          postSlug: slug,
          emoji,
          uid: currentUser.uid,
          createdAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.error("Reaction toggle error:", e);
    }
  };

  // Submit comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!currentUser) {
      requireLogin('Sign in to leave a note.');
      return;
    }

    setIsSubmittingComment(true);
    try {
      await addDoc(collection(db, 'comments'), {
        postId: post.id,
        postSlug: slug,
        postTitle: post.title,
        parentId: null,
        name: commentName.trim() || currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        mood: commentMood,
        text: commentText.trim(),
        authorUid: currentUser.uid,
        authorEmail: currentUser.email || '',
        createdAt: serverTimestamp()
      });
      setCommentText('');
    } catch (err) {
      console.error("Add comment error:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Submit nested reply
  const handleAddReply = async (parentId) => {
    if (!replyText.trim()) return;
    if (!currentUser) {
      requireLogin('Sign in to reply.');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        postId: post.id,
        postSlug: slug,
        postTitle: post.title,
        parentId,
        name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        text: replyText.trim(),
        authorUid: currentUser.uid,
        authorEmail: currentUser.email || '',
        createdAt: serverTimestamp()
      });
      setReplyText('');
      setActiveReplyId(null);
    } catch (err) {
      console.error("Add reply error:", err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this note permanently?")) return;
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  // Toggle author follow
  const handleToggleFollow = async () => {
    if (!currentUser) {
      requireLogin('Sign in to follow authors.');
      return;
    }
    try {
      if (isFollowing && stickDocId) {
        await deleteDoc(doc(db, 'sticks', stickDocId));
        setIsFollowing(false);
        setStickDocId(null);
      } else if (post.authorUid) {
        const ref = await addDoc(collection(db, 'sticks'), {
          fromUid: currentUser.uid,
          fromName: currentUser.displayName || 'Anonymous',
          toUid: post.authorUid,
          toName: post.author || '',
          createdAt: serverTimestamp()
        });
        setIsFollowing(true);
        setStickDocId(ref.id);
      }
    } catch (e) {
      console.error("Follow error:", e);
    }
  };

  // Save changes (Author Edit)
  const handleSaveEdit = async () => {
    if (!post) return;
    setIsSavingEdit(true);
    try {
      await updateDoc(doc(db, 'posts', post.id), {
        title: editTitle,
        desc: editDesc,
        content: editContent,
        updatedAt: serverTimestamp()
      });
      setPost(prev => ({ ...prev, title: editTitle, desc: editDesc, content: editContent }));
      setIsEditMode(false);
    } catch (err) {
      console.error("Save post edit error:", err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    if (!window.confirm(`Delete "${post.title}" permanently? This action cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'posts', post.id));
      navigate('/');
    } catch (err) {
      console.error("Delete post error:", err);
    }
  };

  // Group top-level comments & replies
  const { topLevelComments, repliesMap } = useMemo(() => {
    const top = [];
    const map = {};
    comments.forEach(c => {
      if (c.parentId) {
        if (!map[c.parentId]) map[c.parentId] = [];
        map[c.parentId].push(c);
      } else {
        top.push(c);
      }
    });
    return { topLevelComments: top, repliesMap: map };
  }, [comments]);

  if (loading) {
    return (
      <div className="app-container">
        <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
        <Navbar />
        <div className="page-wrap" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div className="loading-book">
            <div className="loading-spine-el"></div>
            <div className="loading-page-el"></div>
          </div>
          <p className="loading-text" style={{ marginTop: '20px' }}>Unpinning story from the board...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="app-container">
        <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
        <Navbar />
        <div className="page-wrap" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2 style={{ fontFamily: 'var(--hand)', fontSize: '2.2rem', marginBottom: '16px' }}>Story Not Found</h2>
          <p style={{ fontFamily: 'var(--serif)', opacity: 0.7, marginBottom: '24px' }}>It may have been removed or the link is incorrect.</p>
          <Link to="/" className="btn-sticky fire">← Back to Pinboard</Link>
        </div>
      </div>
    );
  }

  const coverUrl = post.thumbnail || post.photo || post.coverImage || post.image;
  const wordCount = (post.content || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));
  const category = (post.category || post.type || 'story').toLowerCase();
  const catClass = CAT_CLASSES[category] || 'cat-default';
  const isAuthor = currentUser && post.authorUid && currentUser.uid === post.authorUid;
  const isAdmin = currentUser && currentUser.uid === '2aTrlq56lZd3UScCfk7g8g3lBP73';

  return (
    <div className="app-container">
      <AuthModal />

      {/* Reading Progress Bar */}
      <div
        id="progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--fire), var(--gold))',
          zIndex: 10000,
          transition: 'width 0.08s linear'
        }}
      />

      <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
      <Navbar />

      {/* Reader Top Bar */}
      <div className="reader-top-bar">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--fire)', fontFamily: 'var(--pixel)', fontSize: '0.52rem' }}>
            {category.toUpperCase()}
          </span>
          <span>›</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{post.title}</span>
        </div>

        <div className="reading-theme-picker">
          <button
            type="button"
            className={`theme-pill ${readingTheme === 'sepia' ? 'active' : ''}`}
            onClick={() => setReadingTheme('sepia')}
          >
            📜 Sepia
          </button>
          <button
            type="button"
            className={`theme-pill ${readingTheme === 'midnight' ? 'active' : ''}`}
            onClick={() => setReadingTheme('midnight')}
          >
            🌙 Midnight
          </button>
          <button
            type="button"
            className={`theme-pill ${readingTheme === 'rainy' ? 'active' : ''}`}
            onClick={() => setReadingTheme('rainy')}
          >
            🌧️ Rainy
          </button>
        </div>
      </div>

      {/* Main Reader Page Wrap */}
      <div className="page-wrap">
        <div className="diary-book-wrap">
          <div className="book-shadow"></div>
          <div className="diary-book">
            <div className="book-pin"></div>
            <div className="diary-spine"></div>

            <div className="diary-page">
              <div className="page-curl"></div>

              {/* Author Control Toolbar (Edit/Delete) */}
              {(isAuthor || isAdmin) && (
                <div className="author-toolbar visible">
                  <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.48rem', color: 'var(--fire)', letterSpacing: '1px' }}>YOUR POST</span>
                  {!isEditMode ? (
                    <>
                      <button className="toolbar-btn toolbar-btn-edit" onClick={() => setIsEditMode(true)}>✏ Edit</button>
                      <button className="toolbar-btn toolbar-btn-delete" onClick={handleDeletePost}>✕ Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="toolbar-btn toolbar-btn-save" onClick={handleSaveEdit} disabled={isSavingEdit}>
                        {isSavingEdit ? 'Saving...' : '✓ Save changes'}
                      </button>
                      <button className="toolbar-btn toolbar-btn-cancel" onClick={() => setIsEditMode(false)}>✕ Cancel</button>
                    </>
                  )}
                </div>
              )}

              {/* Header */}
              <header className="post-header">
                <div className="post-date-mood">
                  <span className="post-date">{post.date || 'Pinned on HlyWor'}</span>
                  {post.mood && <span className="post-mood">{post.mood}</span>}
                </div>

                {!isEditMode ? (
                  <h1 className="post-title">{post.title}</h1>
                ) : (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ width: '100%', fontFamily: 'var(--hand)', fontSize: '2rem', padding: '4px', marginBottom: '10px' }}
                  />
                )}

                {!isEditMode ? (
                  post.desc && <p className="post-desc">{post.desc}</p>
                ) : (
                  <textarea
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    style={{ width: '100%', fontFamily: 'var(--serif)', fontSize: '1rem', padding: '4px', marginBottom: '10px' }}
                    rows={2}
                  />
                )}

                <div className="post-meta">
                  <div className="post-meta-item">
                    <span className="post-meta-label">BY</span>
                    <span className="post-meta-val" style={{ color: 'var(--fire)', fontWeight: 600 }}>
                      {post.isAnonymous ? 'Anonymous' : (post.author || 'HlyWor')}
                    </span>
                  </div>
                  <div className="post-meta-item">
                    <span className="post-meta-label">READ</span>
                    <span className="post-meta-val">{readTimeMinutes} min</span>
                  </div>
                  <span className={`post-cat-tape ${catClass}`}>
                    {category.toUpperCase()}
                  </span>

                  {currentUser && !isAuthor && post.authorUid && !post.isAnonymous && (
                    <button
                      type="button"
                      className={`card-stick-btn ${isFollowing ? 'is-stuck' : ''}`}
                      onClick={handleToggleFollow}
                    >
                      {isFollowing ? '📌 Following ✦' : `📌 Follow ${(post.author || '').split(' ')[0]}`}
                    </button>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {post.tags.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--hand)', fontSize: '0.85rem', color: 'var(--ink3)' }}>#{t}</span>
                    ))}
                  </div>
                )}
              </header>

              {/* Cover Photo */}
              {coverUrl && (
                <div className="post-cover">
                  <img src={coverUrl} alt={post.title} loading="eager" />
                </div>
              )}

              {/* Story Content */}
              <article className="post-body">
                {!isEditMode ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content || editContent }} />
                ) : (
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={12}
                    style={{ width: '100%', fontFamily: 'var(--serif)', fontSize: '1rem', padding: '8px' }}
                  />
                )}
              </article>

              {/* Reactions Bar */}
              <div className="post-reactions">
                <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.5rem', color: 'var(--fire)', letterSpacing: '1px', alignSelf: 'center', marginRight: '4px' }}>
                  STICKERS:
                </span>
                {REACTION_EMOJIS.map(e => (
                  <button
                    key={e}
                    type="button"
                    className={`react-btn ${userReactions[e] ? 'reacted' : ''}`}
                    onClick={() => handleToggleReaction(e)}
                  >
                    {e} <span>{reactionCounts[e] || 0}</span>
                  </button>
                ))}
              </div>

              {/* Social Share Bar */}
              <div className="post-share">
                <span style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'var(--ink3)', marginRight: '4px' }}>Share:</span>
                <button
                  type="button"
                  className="share-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Story link copied to clipboard! 📋");
                  }}
                  title="Copy link"
                >
                  📋
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn"
                  title="Share to Twitter"
                  style={{ textDecoration: 'none' }}
                >
                  🐦
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn"
                  title="Share to WhatsApp"
                  style={{ textDecoration: 'none' }}
                >
                  💬
                </a>
              </div>

              {/* Author Profile Box */}
              <div style={{ margin: '24px 36px 0 84px', padding: '18px 20px', background: 'var(--paper2)', borderRadius: '4px', borderLeft: '4px solid var(--fire)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--paper3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hand)', fontSize: '1.5rem', color: 'var(--fire)', fontWeight: 'bold', flexShrink: 0 }}>
                  {(post.author || 'H')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--hand)', fontSize: '1.25rem', color: 'var(--ink)', fontWeight: 'bold' }}>
                    {post.isAnonymous ? 'Anonymous Writer' : (post.author || 'HlyWor Writer')}
                  </div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '0.9rem', color: 'var(--ink2)', margin: '2px 0 0' }}>
                    Storyteller on HlyWor. Sharing reflections, unsaid thoughts, and quiet moments.
                  </p>
                </div>
              </div>

              {/* Threaded Comments Section */}
              <section className="comments-section">
                <div className="comments-heading">
                  <span>💭 Thoughts &amp; Notes</span>
                  <span className="comments-count">{comments.length} note{comments.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} style={{ marginBottom: '28px' }}>
                  <div className="comment-form-row">
                    <div>
                      <label className="comment-input-label">YOUR NAME</label>
                      <input
                        type="text"
                        className="comment-input"
                        placeholder="Anonymous or name..."
                        value={commentName}
                        onChange={e => setCommentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="comment-input-label">MOOD STICKER</label>
                      <select
                        className="comment-input"
                        value={commentMood}
                        onChange={e => setCommentMood(e.target.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="🌙">🌙 Quiet 3 AM</option>
                        <option value="❤️">❤️ Felt This</option>
                        <option value="😭">😭 Emotional</option>
                        <option value="🔥">🔥 Relatable</option>
                        <option value="🫂">🫂 Hugs</option>
                        <option value="✨">✨ Warm</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea
                      className="comment-textarea"
                      placeholder="Write a gentle thought or reply to the author..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      maxLength={500}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', color: 'var(--ink4)' }}>
                        {commentText.length}/500 characters
                      </span>
                      <button type="submit" className="comment-submit" disabled={isSubmittingComment || !commentText.trim()}>
                        {isSubmittingComment ? 'Pinning...' : 'Pin Note 📌'}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="comments-list">
                  {topLevelComments.length === 0 ? (
                    <p style={{ opacity: 0.6, fontStyle: 'italic', fontSize: '0.92rem', padding: '12px 0' }}>
                      No notes yet — be the first to leave one for the author.
                    </p>
                  ) : (
                    topLevelComments.map(c => {
                      const replies = repliesMap[c.id] || [];
                      const isCollapsed = collapsedThreads[c.id];
                      const isOP = c.authorUid && post.authorUid && c.authorUid === post.authorUid;
                      const canDelete = (currentUser && c.authorUid && currentUser.uid === c.authorUid) || isAdmin;

                      return (
                        <div key={c.id} className="comment-thread">
                          <div className="comment-item">
                            <div className="comment-header">
                              <span className={`comment-author ${isOP ? 'is-op' : ''}`}>
                                {c.mood || '🌙'} {c.name || 'Anonymous'}
                              </span>
                              <span className="comment-date">
                                {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'recently'}
                              </span>
                            </div>
                            <div className="comment-text">{c.text}</div>
                            <div className="comment-actions">
                              <button
                                type="button"
                                className="comment-reply-btn"
                                onClick={() => setActiveReplyId(activeReplyId === c.id ? null : c.id)}
                              >
                                ↩ Reply
                              </button>
                              {canDelete && (
                                <button
                                  type="button"
                                  className="comment-delete-btn"
                                  onClick={() => handleDeleteComment(c.id)}
                                >
                                  ✕ delete
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Reply Form */}
                          {activeReplyId === c.id && (
                            <div className="reply-form open">
                              <textarea
                                className="reply-input"
                                placeholder={`Reply to ${c.name || 'Anonymous'}...`}
                                rows={2}
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                              />
                              <div className="reply-form-actions">
                                <button
                                  type="button"
                                  className="reply-submit-btn"
                                  onClick={() => handleAddReply(c.id)}
                                >
                                  Reply ✦
                                </button>
                                <button
                                  type="button"
                                  className="reply-cancel-btn"
                                  onClick={() => { setActiveReplyId(null); setReplyText(''); }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Nested Replies */}
                          {replies.length > 0 && (
                            <>
                              <button
                                type="button"
                                className="toggle-replies-btn"
                                onClick={() => setCollapsedThreads(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                              >
                                {isCollapsed ? `+ Show ${replies.length} replies` : `- Hide ${replies.length} replies`}
                              </button>
                              {!isCollapsed && (
                                <div className="replies-wrap">
                                  {replies.map(r => {
                                    const isReplyOP = r.authorUid && post.authorUid && r.authorUid === post.authorUid;
                                    const canDeleteReply = (currentUser && r.authorUid && currentUser.uid === r.authorUid) || isAdmin;
                                    return (
                                      <div key={r.id} className="comment-item">
                                        <div className="comment-header">
                                          <span className={`comment-author ${isReplyOP ? 'is-op' : ''}`}>
                                            {r.name || 'Anonymous'}
                                          </span>
                                          <span className="comment-date">
                                            {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'recently'}
                                          </span>
                                        </div>
                                        <div className="comment-text">{r.text}</div>
                                        <div className="comment-actions">
                                          {canDeleteReply && (
                                            <button
                                              type="button"
                                              className="comment-delete-btn"
                                              onClick={() => handleDeleteComment(r.id)}
                                            >
                                              ✕ delete
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              {/* Read Next Section */}
              {readNext.length > 0 && (
                <section className="read-next-section">
                  <div style={{ fontFamily: 'var(--pixel)', fontSize: '0.55rem', color: 'var(--fire)', letterSpacing: '2px', marginBottom: '14px' }}>
                    // READ NEXT ON THE BOARD
                  </div>
                  <div className="read-next-grid">
                    {readNext.map(item => (
                      <Link key={item.id} to={`/post/${item.slug || item.id}`} className="read-next-card">
                        <span className="read-next-tag">{(item.category || 'STORY').toUpperCase()}</span>
                        <div className="read-next-title">{item.title}</div>
                        <span className="read-next-author">by {item.author || 'Anonymous'}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </div>{/* end diary-page */}
          </div>{/* end diary-book */}
        </div>{/* end diary-book-wrap */}
      </div>{/* end page-wrap */}

      {/* Footer */}
      <footer className="board-footer" role="contentinfo">
        <div className="footer-left">
          <span className="footer-copy">© {new Date().getFullYear()} HlyWor — a place to open up</span>
          <nav className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/crew">The Crew</Link>
            <a href="https://hlywor.fun/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
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
