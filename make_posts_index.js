// make_posts_index.js
// CommonJS version — no package.json type changes needed
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const postsDir = path.join(process.cwd(), 'post'); // absolute path to ./posts
if (!fs.existsSync(postsDir)) {
  console.error('🔥 posts directory not found at', postsDir);
  process.exit(1);
}

const htmlFiles = [];

// recursive walker that ONLY walks inside postsDir
function walkPosts(dir) {
  const items = fs.readdirSync(dir);
  for (const it of items) {
    const full = path.join(dir, it);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkPosts(full);
    } else if (stat.isFile() && it.toLowerCase().endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}

walkPosts(postsDir);

if (htmlFiles.length === 0) {
  console.log('⚠️  No .html files found inside /posts/. Will write empty posts.json');
}

const posts = [];

for (const filePath of htmlFiles) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const title = doc.querySelector('meta[name="post-title"]')?.getAttribute('content') || doc.title || path.basename(filePath);
    const date = doc.querySelector('meta[name="post-date"]')?.getAttribute('content') || '2000-01-01';
    const desc = doc.querySelector('meta[name="post-desc"]')?.getAttribute('content') || '';
    const thumbnail = doc.querySelector('meta[name="post-thumbnail"]')?.getAttribute('content') || '';

    // make url relative to repo root and use forward slashes
    let rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    if (!rel.startsWith('/')) rel = '/' + rel;

    posts.push({
      title: title,
      date: date,
      desc: desc,
      thumbnail: thumbnail,
      url: rel
    });

    console.log(' + indexed:', rel);
  } catch (err) {
    console.error('Error parsing', filePath, err);
  }
}

// sort newest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// write posts.json to repo root
const outPath = path.join(process.cwd(), 'posts.json');
fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf8');

console.log(`✅ posts.json written (${posts.length} items) -> ${outPath}`);
