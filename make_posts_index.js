import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const ignoredDirs = ['node_modules', '.github'];
const htmlFiles = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !ignoredDirs.includes(item)) walk(fullPath);
    else if (item.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

walk('.');

const posts = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector('meta[name="post-title"]')?.content || path.basename(file);
  const date = doc.querySelector('meta[name="post-date"]')?.content || '2000-01-01';
  const desc = doc.querySelector('meta[name="post-desc"]')?.content || '';
  const thumb = doc.querySelector('meta[name="post-thumbnail"]')?.content || '';
  const url = file.replace(/^\.\/+/, '').replace(/\\/g, '/');

  posts.push({ title, date, desc, thumbnail: thumb, url });
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
console.log('✅ posts.json updated.');
