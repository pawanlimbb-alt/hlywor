import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileTopbar from '../components/MobileTopbar';
import BottomDock from '../components/BottomDock';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Submit() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, requireLogin } = useAuth();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [category, setCategory] = useState('story');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const promptParam = searchParams.get('prompt');

  useEffect(() => {
    if (!currentUser) {
      requireLogin('Sign in to publish your story.');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please provide both a title and content for your story.");
      return;
    }
    if (!currentUser) {
      requireLogin('Sign in to publish your story.');
      return;
    }

    setSubmitting(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString(36);
      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        desc: desc.trim() || content.trim().slice(0, 140),
        content: content.trim(),
        category: category,
        photo: photo.trim() || null,
        thumbnail: photo.trim() || null,
        author: isAnonymous ? 'Anonymous' : (currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous'),
        authorUid: currentUser.uid,
        isAnonymous: isAnonymous,
        status: 'published',
        slug: slug,
        createdAt: serverTimestamp()
      });
      alert("Story pinned to the board successfully! ✨");
      navigate('/');
    } catch (err) {
      console.error("Failed to submit story", err);
      alert("Error publishing story: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <MobileTopbar isNightMode={false} onToggleNightMode={() => {}} onSearchOpen={() => {}} />
      <Navbar />

      <main className="board" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '30px' }}>
        <div className="title-sheet reveal" style={{ transform: 'none', maxWidth: '100%', display: 'block', padding: '28px 32px' }}>
          <div className="pin"></div>
          
          <h1 className="sheet-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
            Pin a <em>Story</em>
          </h1>
          {promptParam && (
            <p style={{ fontFamily: 'var(--hand)', fontSize: '1.1rem', color: 'var(--fire)', marginBottom: '16px' }}>
              Writing prompt: "{promptParam}"
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '6px' }}>
                TITLE *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a title..."
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--hand)', fontSize: '1.3rem', background: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '6px' }}>
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--sans)', fontSize: '0.9rem', background: '#fff' }}
                >
                  <option value="story">Story</option>
                  <option value="3am">3 AM</option>
                  <option value="unsaid">Unsaid</option>
                  <option value="college">College</option>
                  <option value="thoughts">Thoughts</option>
                  <option value="healing">Healing</option>
                  <option value="movies">Movies</option>
                  <option value="books">Books</option>
                </select>
              </div>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '6px' }}>
                  COVER PHOTO URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--sans)', fontSize: '0.9rem', background: '#fff' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '6px' }}>
                SHORT EXCERPT / SUMMARY (OPTIONAL)
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="A short 1-line teaser for the card preview..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--sans)', fontSize: '0.9rem', background: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--pixel)', fontSize: '0.52rem', color: 'var(--fire)', marginBottom: '6px' }}>
                STORY CONTENT *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Write your story here..."
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--serif)', fontSize: '1.05rem', lineHeight: 1.6, background: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Post anonymously 🕵️
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="btn-sticky fire"
                style={{ border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                {submitting ? 'Pinning...' : 'Pin to Board 📌'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <BottomDock />
    </div>
  );
}
