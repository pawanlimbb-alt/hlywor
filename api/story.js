import fs from 'fs';
import path from 'path';

const FIRESTORE_PROJECT = 'hlywor';
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents`;

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

function sanitizeForPrivacy(post) {
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
    // Keep authorUid and authorPhoto for follow and profile features,
    // but never leak email addresses to public server-rendered HTML.
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

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function fetchStoryFromFirestore(targetSlug) {
  if (!targetSlug) return null;
  const clean = targetSlug.replace(/^post\.html\?slug=/i, '').replace(/^post\.html\?id=/i, '').trim();
  const normalized = clean.toLowerCase();

  // 1. Query by exact slug
  try {
    const qResp = await fetch(`${FIRESTORE_BASE_URL}:runQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'posts' }],
          where: {
            compositeFilter: {
              op: 'AND',
              filters: [
                {
                  fieldFilter: {
                    field: { fieldPath: 'status' },
                    op: 'EQUAL',
                    value: { stringValue: 'published' }
                  }
                },
                {
                  fieldFilter: {
                    field: { fieldPath: 'slug' },
                    op: 'EQUAL',
                    value: { stringValue: clean }
                  }
                }
              ]
            }
          },
          limit: 1
        }
      })
    });

    if (qResp.ok) {
      const qData = await qResp.json();
      if (Array.isArray(qData) && qData[0] && qData[0].document) {
        return parseFirestoreDoc(qData[0].document);
      }
    }
  } catch (err) {
    console.warn('[api/story] Error querying by slug:', err.message);
  }

  // 2. Query by lowercase slug if different
  if (normalized !== clean) {
    try {
      const qResp = await fetch(`${FIRESTORE_BASE_URL}:runQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'posts' }],
            where: {
              compositeFilter: {
                op: 'AND',
                filters: [
                  {
                    fieldFilter: {
                      field: { fieldPath: 'status' },
                      op: 'EQUAL',
                      value: { stringValue: 'published' }
                    }
                  },
                  {
                    fieldFilter: {
                      field: { fieldPath: 'slug' },
                      op: 'EQUAL',
                      value: { stringValue: normalized }
                    }
                  }
                ]
              }
            },
            limit: 1
          }
        })
      });

      if (qResp.ok) {
        const qData = await qResp.json();
        if (Array.isArray(qData) && qData[0] && qData[0].document) {
          return parseFirestoreDoc(qData[0].document);
        }
      }
    } catch (err) {
      console.warn('[api/story] Error querying by normalized slug:', err.message);
    }
  }

  // 3. Direct document lookup by doc ID
  try {
    const dResp = await fetch(`${FIRESTORE_BASE_URL}/posts/${encodeURIComponent(clean)}`);
    if (dResp.ok) {
      const doc = await dResp.json();
      const parsed = parseFirestoreDoc(doc);
      if (parsed && parsed.status === 'published') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[api/story] Direct doc lookup failed:', err.message);
  }

  return null;
}

export default async function handler(req, res) {
  const storyId = req.query.id || req.query.slug || '';

  if (!storyId) {
    return res.redirect(307, '/');
  }

  try {
    const post = await fetchStoryFromFirestore(storyId);

    // Read template post.html
    const templatePath = path.join(process.cwd(), 'post.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    if (!post) {
      // Return 404 response with not-found state rendered
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
      
      const notFoundHtml = html
        .replace('<title>HlyWor — A place to open up</title>', '<title>Story Not Found — HlyWor</title>')
        .replace('id="loadingState"', 'id="loadingState" style="display:none"')
        .replace('id="notFound" style="display:none"', 'id="notFound" style="display:block"')
        .replace(
          '<p class="not-found-desc" id="notFoundMsg">This post doesn\'t exist or was removed.</p>',
          `<p class="not-found-desc" id="notFoundMsg">No story found for "${escapeHtml(storyId)}". It may have been removed or moved.</p>`
        );

      return res.status(404).send(notFoundHtml);
    }

    // Sanitize author information for privacy
    sanitizeForPrivacy(post);

    const canonicalSlug = post.slug || post.id || storyId;
    const canonicalUrl = `https://hlywor.fun/story/${encodeURIComponent(canonicalSlug)}`;
    const pageTitle = `${post.title || 'Untitled'} — HlyWor`;
    const excerpt = post.desc || (stripHtml(post.content).slice(0, 160) + (stripHtml(post.content).length > 160 ? '...' : '')) || 'A story on HlyWor';
    const ogImage = post.thumbnail || 'https://hlywor.fun/og-image.jpg';

    const dateStr = post.date
      ? new Date(post.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '';
    const cat = (post.category || post.type || 'story').toLowerCase();
    const catClass = { story: 'cat-story', movies: 'cat-movies', books: 'cat-books', thoughts: 'cat-thoughts', college: 'cat-college', news: 'cat-news' }[cat] || 'cat-default';
    const tagsHtml = (post.tags || []).length
      ? `<div class="post-tags">${post.tags.map(t => `<span class="post-tag">#${escapeHtml(t)}</span>`).join('')}</div>`
      : '';
    const readtime = post.readtime || '~1 min read';

    const preloadedHeader = `
      <div class="post-date-mood">
        ${dateStr ? `<span class="post-date">${escapeHtml(dateStr)}</span>` : ''}
        ${post.mood ? `<span class="post-mood" aria-label="Mood: ${escapeHtml(post.mood)}">${escapeHtml(post.mood)}</span>` : ''}
      </div>
      <h1 class="post-title" tabindex="-1">${escapeHtml(post.title || 'Untitled')}</h1>
      ${post.desc ? `<p class="post-desc">${escapeHtml(post.desc)}</p>` : ''}
      <div class="post-meta">
        ${post.author ? (post.isAnonymous
          ? `<div class="post-meta-item"><span class="post-meta-label">BY</span><span class="post-meta-val">${escapeHtml(post.author)}</span></div>`
          : `<div class="post-meta-item"><span class="post-meta-label">BY</span><span class="post-meta-val" id="authorName" style="cursor:pointer;text-decoration:underline dotted;color:var(--fire)" tabindex="0" role="button" aria-label="View ${escapeHtml(post.author)}'s profile">${escapeHtml(post.author)}</span></div>`
        ) : ''}
        ${readtime ? `<div class="post-meta-item"><span class="post-meta-label">READ</span><span class="post-meta-val">${escapeHtml(readtime)}</span></div>` : ''}
        <span class="post-cat-tape ${catClass}" aria-label="Category: ${escapeHtml(cat.toUpperCase())}">${escapeHtml(cat.toUpperCase())}</span>
        ${(post.authorUid && !post.isAnonymous) ? `<button class="card-stick-btn" id="postPageStickBtn" data-touid="${escapeHtml(post.authorUid)}" data-toname="${escapeHtml(post.author || '')}" aria-label="Follow ${escapeHtml(post.author || 'author')}">📌 Follow</button>` : ''}
      </div>
      ${tagsHtml}`;

    const preloadedCover = post.thumbnail
      ? `<div class="post-cover" id="postCover" style="display:block"><img src="${escapeAttr(post.thumbnail)}" alt="${escapeAttr(post.title || 'Story')} - cover image" loading="eager" decoding="async"></div>`
      : `<div class="post-cover" id="postCover" style="display:none"></div>`;

    // Strip contenteditable and data-sticky attributes from content
    const sanitizedBody = (post.content || '<p>No content.</p>')
      .replace(/\s*contenteditable(=("[^"]*"|'[^']*'|[^\s>]+))?/gi, '')
      .replace(/\s*data-sticky(=("[^"]*"|'[^']*'|[^\s>]+))?/gi, '');

    // 1. Replace SEO Meta Tags
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${escapeAttr(excerpt)}">`);
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${escapeAttr(canonicalUrl)}">`);
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(pageTitle)}">`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(excerpt)}">`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`);
    html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${escapeAttr(ogImage)}">`);
    html = html.replace(/<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:type" content="article">`);

    // Ensure twitter tags exist or update them
    if (html.includes('name="twitter:title"')) {
      html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(pageTitle)}">`);
    } else {
      html = html.replace('<meta name="twitter:card" content="summary_large_image">', `<meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeAttr(pageTitle)}">\n  <meta name="twitter:description" content="${escapeAttr(excerpt)}">\n  <meta name="twitter:image" content="${escapeAttr(ogImage)}">`);
    }

    // 2. Pre-render Breadcrumb
    html = html.replace('<span id="breadcrumbTitle" aria-current="page"></span>', `<span id="breadcrumbTitle" aria-current="page">${escapeHtml(post.title || '')}</span>`);

    // 3. Pre-render Header, Cover & Body
    html = html.replace('<div class="post-header" id="postHeader"></div>', `<div class="post-header" id="postHeader">${preloadedHeader}</div>`);
    html = html.replace('<div class="post-cover" id="postCover" style="display:none"></div>', preloadedCover);
    html = html.replace('<div class="post-body" id="postBody" role="article" aria-label="Post content"></div>', `<div class="post-body" id="postBody" role="article" aria-label="Post content">${sanitizedBody}</div>`);

    // 4. Toggle loading / post visibility for SSR
    html = html.replace('<div class="loading-page" id="loadingState"', '<div class="loading-page" id="loadingState" style="display:none"');
    html = html.replace('<div id="postWrap" style="display:none">', '<div id="postWrap" style="display:block">');

    // 5. Inject Preloaded Post Data Script for seamless client hydration
    const safeJson = JSON.stringify(post).replace(/</g, '\\u003c');
    const preloadScript = `<script>window.__PRELOADED_POST__ = ${safeJson};</script>\n</head>`;
    html = html.replace('</head>', preloadScript);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Public cache: fresh for 60s, stale-while-revalidate for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[api/story] Internal server error:', err);
    // Graceful fallback to client-side post.html
    const fallbackPath = path.join(process.cwd(), 'post.html');
    const fallbackHtml = fs.readFileSync(fallbackPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
}
