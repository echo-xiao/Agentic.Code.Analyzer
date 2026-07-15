// build-site.mjs — assemble the static wiki site for deployment (Vercel / Netlify / any static host).
// The viewer (wiki-site/) fetches /data/wiki-map.json + /data/wiki-prose.json at absolute paths, so the
// deploy root must contain BOTH the site files and a data/ subdir. This copies them into dist/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const SITE_FILES = ['index.html', 'app.js', 'style.css'];
const DATA_FILES = ['wiki-map.json', 'wiki-prose.json'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'data'), { recursive: true });

for (const f of SITE_FILES) {
  fs.copyFileSync(path.join(ROOT, 'wiki-site', f), path.join(DIST, f));
}
for (const f of DATA_FILES) {
  const src = path.join(ROOT, 'data', f);
  if (!fs.existsSync(src)) throw new Error(`[build-site] missing ${src} — run the wiki pipeline first (npm run wiki:gen)`);
  fs.copyFileSync(src, path.join(DIST, 'data', f));
}

const bytes = [...SITE_FILES, ...DATA_FILES.map((f) => path.join('data', f))]
  .reduce((sum, f) => sum + fs.statSync(path.join(DIST, f)).size, 0);
console.log(`[build-site] dist/ ready — ${SITE_FILES.length} site files + ${DATA_FILES.length} data files (${(bytes / 1024 / 1024).toFixed(2)} MB)`);
