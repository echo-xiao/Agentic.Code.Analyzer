// Minimal static server: only serves wiki-site/* and data/*.json (allowlist; does not expose .env / src / anything else).
// Usage: npm run wiki:serve  →  open http://localhost:8080
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.WIKI_PORT || 8080);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };

// Allowlist: only static files under wiki-site/ + .json under data/
function resolveSafe(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  if (clean === '/' || clean === '') return path.join(ROOT, 'wiki-site', 'index.html');
  const rel = clean.replace(/^\/+/, '');
  // data/*.json served from data/; everything else (style.css/app.js/…) served from wiki-site/ — matches index.html's root-relative references
  const base = rel.startsWith('data/') ? ROOT : path.join(ROOT, 'wiki-site');
  const abs = path.resolve(base, rel);
  const okDir = abs.startsWith(path.join(ROOT, 'wiki-site') + path.sep) || abs.startsWith(path.join(ROOT, 'data') + path.sep);
  if (!okDir) return null;                                   // directory allowlist
  const ext = path.extname(abs);
  if (abs.startsWith(path.join(ROOT, 'data') + path.sep) && ext !== '.json') return null;  // data only serves .json
  if (!TYPES[ext]) return null;                              // extension allowlist
  return abs;
}

http.createServer((req, res) => {
  const file = resolveSafe(req.url || '/');
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('404 — only wiki-site/* and data/*.json are served');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`\n  📖 Code Wiki site: http://localhost:${PORT}\n  (serves only wiki-site/ and data/*.json; no-cache; Ctrl+C to stop)\n`);
});
