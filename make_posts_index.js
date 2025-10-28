// make_posts_index.js
// Auto-index only posts inside /post and auto-detect first image as thumbnail

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const postsDir = path.join(process.cwd(), 'post'); // absolute path to ./post
if (!fs.existsSync(postsDir)) {
  console.error('🔥 posts directory not found at', postsDir);
  process.exit(1);
}

const htmlFiles = [];

// recursively collect only .html inside /post
function walkPosts(dir) {
  const items = fs.readdirSync(dir);
  for (const it of items) {
    const full = path.join(dir, it);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkPosts(full);
    else if (stat.isFile() && it.toLowerCase().endsWith('.html')) htmlFiles.push(full);
  }
}
walkPosts(postsDir);

if (htmlFiles.length === 0) {
  console.log('⚠️ No HTML files found inside /post');
}

const posts = [];

for (const filePath of htmlFiles) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const title = doc.querySelector('meta[name="post-title"]')?.getAttribute('content') ||
      doc.title || path.basename(filePath);
    const date = doc.querySelector('meta[name="post-date"]')?.getAttribute('content') || '2000-01-01';
    const desc = doc.querySelector('meta[name="post-desc"]')?.getAttribute('content') || '';

    // 1️⃣ Check meta thumbnail
    let thumbnail = doc.querySelector('meta[name="post-thumbnail"]')?.getAttribute('content') || '';

    // 2️⃣ If no meta thumbnail, pick first <img> in the post
    if (!thumbnail) {
      const firstImg = doc.querySelector('img');
      if (firstImg) thumbnail = firstImg.getAttribute('src');
    }

    // 3️⃣ Normalize the path to repo root
    if (thumbnail && !/^https?:\/\//.test(thumbnail)) {
      const baseDir = path.dirname(filePath);
      const thumbPath = path.resolve(baseDir, thumbnail);
      thumbnail = '/' + path.relative(process.cwd(), thumbPath).replace(/\\/g, '/');
    }

    // Build relative URL to the post itself
    let rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    if (!rel.startsWith('/')) rel = '/' + rel;

    posts.push({
      title,
      date,
      desc,
      thumbnail,
      url: rel
    });

    console.log('✅ Indexed:', rel);
  } catch (err) {
    console.error('❌ Error parsing', filePath, err);
  }
}

// sort newest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// write posts.json
const outPath = path.join(process.cwd(), 'posts.json');
fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf8');

console.log(`🎉 posts.json written (${posts.length} posts) -> ${outPath}`);
