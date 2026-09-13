import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedBanner({ posts }) {
  // Find featured post or fallback
  const featured = posts.find(p => p.featured || p.thumbnail || p.photo || p.coverImage) || posts[0];

  if (!featured) return null;

  const coverUrl = featured.thumbnail || featured.photo || featured.coverImage || featured.image || 'img/view.webp';
  const slug = featured.slug || featured.id;

  return (
    <div className="featured-banner reveal" style={{ display: 'block' }}>
      <div className="gold-pin"></div>
      <div className="featured-layout">
        <div className="featured-img-wrap">
          <img src={coverUrl} alt={featured.title || "Featured cover"} loading="lazy" />
        </div>
        <div className="featured-content">
          <span className="featured-badge">✦ EDITOR'S PICK</span>
          <Link to={`/post/${slug}`} className="featured-title">
            {featured.title}
          </Link>
          <p className="featured-desc">
            {featured.desc || (featured.content ? featured.content.slice(0, 100) + '...' : '')}
          </p>
          <div className="featured-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--pixel)', fontSize: '0.48rem', color: 'var(--fire)', letterSpacing: '1px' }}>
                {(featured.category || featured.type || 'STORY').toUpperCase()}
              </span>
              <span style={{ fontFamily: 'var(--hand)', fontSize: '0.9rem', color: 'var(--ink2)' }}>
                by {featured.author || 'Anonymous'}
              </span>
            </div>
            <Link to={`/post/${slug}`} className="featured-btn">
              Read →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
