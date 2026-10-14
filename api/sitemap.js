const FIRESTORE_PROJECT = 'hlywor';
const FIRESTORE_QUERY_URL = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents:runQuery`;

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateVal) {
  if (!dateVal) return new Date().toISOString().split('T')[0];
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
}

export default async function handler(req, res) {
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
          select: {
            fields: [
              { fieldPath: 'slug' },
              { fieldPath: 'title' },
              { fieldPath: 'updatedAt' },
              { fieldPath: 'createdAt' },
              { fieldPath: 'date' }
            ]
          }
        }
      })
    });

    const staticUrls = [
      { loc: 'https://hlywor.fun/', priority: '1.0', changefreq: 'daily' },
      { loc: 'https://hlywor.fun/about.html', priority: '0.8', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/gallery.html', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://hlywor.fun/submit.html', priority: '0.8', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/movies.html', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://hlywor.fun/book.html', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://hlywor.fun/news.html', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://hlywor.fun/series.html', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://hlywor.fun/character.html', priority: '0.7', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/suggestion.html', priority: '0.6', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/contact.html', priority: '0.6', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/privacy.html', priority: '0.5', changefreq: 'monthly' },
      { loc: 'https://hlywor.fun/terms&amp;condition.html', priority: '0.5', changefreq: 'monthly' }
    ];

    const storyUrls = [];
    if (resp.ok) {
      const results = await resp.json();
      if (Array.isArray(results)) {
        for (const item of results) {
          if (!item.document) continue;
          const doc = item.document;
          const fields = doc.fields || {};
          const docId = doc.name ? doc.name.split('/').pop() : '';
          const rawSlug = fields.slug?.stringValue || docId;
          const cleanSlug = rawSlug.replace(/^post\.html\?slug=/i, '').replace(/^post\.html\?id=/i, '').trim();
          if (!cleanSlug) continue;

          const dateVal = fields.updatedAt?.timestampValue || fields.createdAt?.timestampValue || fields.date?.stringValue;
          storyUrls.push({
            loc: `https://hlywor.fun/story/${encodeURIComponent(cleanSlug)}`,
            lastmod: formatDate(dateVal),
            priority: '0.85',
            changefreq: 'weekly'
          });
        }
      }
    }

    const today = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticUrls) {
      xml += `  <url>\n`;
      xml += `    <loc>${page.loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic story pages
    for (const story of storyUrls) {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(story.loc)}</loc>\n`;
      xml += `    <lastmod>${story.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${story.changefreq}</changefreq>\n`;
      xml += `    <priority>${story.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('[api/sitemap] Error generating sitemap:', err);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
}
