// 极小静态服务器:只暴露 wiki-site/* 和 data/*.json(白名单,不暴露 .env / src / 其它)。
// 用法: npm run wiki:serve  →  打开 http://localhost:8080
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.WIKI_PORT || 8080);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };

// 白名单:仅 wiki-site/ 下静态文件 + data/ 下 .json
function resolveSafe(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  if (clean === '/' || clean === '') return path.join(ROOT, 'wiki-site', 'index.html');
  const rel = clean.replace(/^\/+/, '');
  // data/*.json 从 data/ 取;其余(style.css/app.js/…)从 wiki-site/ 取 —— 对齐 index.html 的根相对引用
  const base = rel.startsWith('data/') ? ROOT : path.join(ROOT, 'wiki-site');
  const abs = path.resolve(base, rel);
  const okDir = abs.startsWith(path.join(ROOT, 'wiki-site') + path.sep) || abs.startsWith(path.join(ROOT, 'data') + path.sep);
  if (!okDir) return null;                                   // 目录白名单
  const ext = path.extname(abs);
  if (abs.startsWith(path.join(ROOT, 'data') + path.sep) && ext !== '.json') return null;  // data 只放 .json
  if (!TYPES[ext]) return null;                              // 扩展名白名单
  return abs;
}

http.createServer((req, res) => {
  const file = resolveSafe(req.url || '/');
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('404 — 只提供 wiki-site/* 和 data/*.json');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`\n  📖 Code Wiki 站点: http://localhost:${PORT}\n  (只暴露 wiki-site/ 和 data/*.json;no-cache;Ctrl+C 停)\n`);
});
