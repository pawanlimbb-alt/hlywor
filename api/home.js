import fs from 'fs';
import path from 'path';

const FIRESTORE_PROJECT = 'hlywor';
const FIRESTORE_QUERY_URL = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents:runQuery`;

function parseFirestoreValue(val) {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('integerValue' in val) return parseInt(val.integerValue, 10);
  if ('doubleValue' in val) return parseFloat(val.doubleValue);
  if ('timestampValue' in val) return val.timestampValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    return (val.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ('mapValue' in val) {
    const res = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      res[k] = parseFirestoreValue(v);
    }
    return res;
  }
  return null;
}

function parseFirestoreDoc(doc) {
  if (!doc) return null;
  const post = {};
  if (doc.name) {
    post.id = doc.name.split('/').pop();
  }
  if (doc.fields) {
    for (const [k, v] of Object.entries(doc.fields)) {
      post[k] = parseFirestoreValue(v);
    }
  }
  return post;
}

function sanitizePost(post) {
  if (!post) return post;
  const isAnon = post.isAnonymous === true ||
    post.isAnonymous === 'true' ||
    (typeof post.author === 'string' && post.author.trim().toLowerCase() === 'anonymous');

  if (isAnon) {
    post.isAnonymous = true;
    post.author = 'Anonymous';
    delete post.authorUid;
    delete post.authorEmail;
    delete post.email;
    delete post.authorPhoto;
  } else {
    delete post.authorEmail;
    delete post.email;
  }
  return post;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const rots = [-1.2, 0.8, -0.4, 1.5, -0.9, 1.1, -1.6, 0.5, -0.7, 1.3, -0.3, 0.9];
const pcs = [
  'radial-gradient(circle at 35% 35%,#ff9999,#cc3333)',
  'radial-gradient(circle at 35% 35%,#99bbff,#3355cc)',
  'radial-gradient(circle at 35% 35%,#aaeeaa,#228844)',
  'radial-gradient(circle at 35% 35%,#ffcc99,#cc6622)'
];
const pls = [28, 55, 42, 65, 35];

function catClass(cat) {
  const map = {
    story: 'cat-story',
    movies: 'cat-movies',
    books: 'cat-books',
    thoughts: 'cat-thoughts',
    college: 'cat-college',
    news: 'cat-news'
  };
  return map[cat] || 'cat-default';
}

function renderServerCard(post, i) {
  const rot = rots[i % rots.length];
  const cat = (post.category || post.type || 'post').toLowerCase();
  let targetSlug = post.slug || post.id || '';
  if (typeof targetSlug === 'string') {
    targetSlug = targetSlug.replace(/^post\.html\?slug=/i, '').replace(/^post\.html\?id=/i, '').replace(/^post\.html\?p=/i, '').trim();
  }
  if (!targetSlug && post.url) {
    targetSlug = post.url.replace(/^post\.html\?slug=/i, '').replace(/^post\.html\?id=/i, '').replace(/^post\.html\?p=/i, '').trim();
  }
  if (!targetSlug && post.title) {
    targetSlug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  const slug = targetSlug || post.id || `story-${i + 1}`;
  const pl = pls[i % pls.length];
  const thumb = post.thumbnail
    ? `<div class="post-photo"><img src="${escapeAttr(post.thumbnail)}" alt="${escapeAttr(post.title || 'Story')}" loading="lazy" decoding="async"><div class="photo-corner tl" aria-hidden="true"></div><div class="photo-corner tr" aria-hidden="true"></div><div class="photo-corner bl" aria-hidden="true"></div><div class="photo-corner br" aria-hidden="true"></div></div>`
    : `<div class="post-noimg"><div class="post-noimg-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div><div class="post-noimg-label">no photo</div></div>`;
  const ds = post.date ? new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '';
  const an = post.author || 'HlyWor';
  const isAnon = !!post.isAnonymous;
  const readTime = post.readtime || (Math.max(2, Math.ceil((post.desc || '').split(/\s+/).length / 25 + 2)) + ' min read');
  const moodBadge = post.mood ? `<span class="post-mood-badge">${escapeHtml(post.mood)}</span>` : '';
  const rh = ['🔥', '❤️', '😭'].map(e => `<button class="sticker-btn" data-slug="${escapeAttr(slug)}" data-emoji="${e}" aria-label="React with ${e}">${e}<span class="sticker-count" aria-live="polite">…</span></button>`).join('');
  const authorMeta = isAnon
    ? `<span class="post-author-chip" style="cursor:default;"><span class="post-author-chip-dot" aria-hidden="true"></span>${escapeHtml(an)}${ds ? ' · ' + ds : ''}</span>`
    : `<button class="post-author-chip" data-author="${escapeAttr(an)}" data-uid="${escapeAttr(post.authorUid || '')}" aria-label="View ${escapeAttr(an)}'s profile"><span class="post-author-chip-dot" aria-hidden="true"></span>${escapeHtml(an)}${ds ? ' · ' + ds : ''}</button>`;

  return `<div class="pinned-post reveal" role="link" tabindex="0" data-slug="${escapeAttr(slug)}" aria-label="${escapeAttr(post.title || 'Story')} by ${escapeAttr(post.author || 'anonymous')}" style="--rot:${rot}deg;cursor:pointer;transition-delay:${i * 55}ms"><div class="post-pin" style="left:${pl}%;background:${pcs[i % 4]}" aria-hidden="true"></div>${thumb}<div class="post-note-body"><div class="post-badge-row"><span class="post-cat-tape ${catClass(cat)}" aria-label="Category: ${escapeAttr(cat)}">${escapeHtml(cat.toUpperCase())}</span><div class="post-badge-meta">${moodBadge}<span class="post-read-badge">⏱ ${escapeHtml(readTime)}</span></div></div><div class="post-note-title"><a href="/story/${encodeURIComponent(slug)}" class="post-title-link">${escapeHtml(post.title || 'Untitled')}</a></div><p class="post-note-desc">${escapeHtml(post.desc || '')}</p><div class="post-note-meta"><div class="post-author-wrap">${authorMeta}${(post.authorUid && !isAnon) ? `<button class="card-stick-btn" data-touid="${escapeAttr(post.authorUid)}" data-toname="${escapeAttr(an)}" aria-label="Follow ${escapeAttr(an)}">+ Follow</button>` : ''}</div><a href="/story/${encodeURIComponent(slug)}" class="post-read-hand" aria-hidden="true">read →</a></div></div><div class="post-stickers">${rh}<button class="card-save-btn" data-slug="${escapeAttr(slug)}" title="Save story" aria-label="Save story">🔖</button></div></div>`;
}

export default async function handler(req, res) {
  try {
    const indexPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    const posts = [];
    try {
      const resp = await fetch(FIRESTORE_QUERY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'posts' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'status' },
                op: 'EQUAL',
                value: { stringValue: 'published' }
              }
            },
            orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
            limit: 10
          }
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item.document) {
              const p = parseFirestoreDoc(item.document);
              if (p) posts.push(sanitizePost(p));
            }
          }
        }
      }
    } catch (fetchErr) {
      console.warn('[api/home] Error fetching posts:', fetchErr.message);
    }

    if (posts.length > 0) {
      const renderedCards = posts.map((p, idx) => renderServerCard(p, idx)).join('\n');
      
      // Replace skeletons inside postsGrid with pre-rendered story cards
      const targetGrid = '<div class="pinboard" id="postsGrid" role="list" aria-label="Pinned stories">';
      html = html.replace(
        /<div class="pinboard" id="postsGrid" role="list" aria-label="Pinned stories">[\s\S]*?<\/div>/i,
        `${targetGrid}\n${renderedCards}\n      </div>`
      );

      // Inject window.__PRELOADED_FEED__
      const safeJson = JSON.stringify(posts).replace(/</g, '\\u003c');
      const scriptTag = `<script>window.__PRELOADED_FEED__ = ${safeJson};</script>\n</head>`;
      html = html.replace('</head>', scriptTag);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[api/home] Server error:', err);
    const fallbackPath = path.join(process.cwd(), 'index.html');
    const fallbackHtml = fs.readFileSync(fallbackPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
}
