// make_posts_index.js
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const postsDir = './posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));
const posts = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector('meta[name="post-title"]')?.content || file;
  const date = doc.querySelector('meta[name="post-date"]')?.content || '2000-01-01';
  const desc = doc.querySelector('meta[name="post-desc"]')?.content || '';
  const thumb = doc.querySelector('meta[name="post-thumbnail"]')?.content || '';

  posts.push({
    title,
    date,
    desc,
    thumbnail: thumb,
    url: `/posts/${file}`
  });
}

// Sort by newest date
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Save to posts.json in root folder
fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
console.log('✅ posts.json updated successfully!');