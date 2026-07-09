#!/usr/bin/env npx tsx
/**
 * embed — 预计算全库摘要向量（本地 xenova，零 API）。方案2 语义排序的向量层。
 * 输入 data/file-summaries.json（每条 {hash, summary}），输出 data/summary-vectors.json
 * （{relPath:{hash, vec:base64}}）。按摘要文本 hash 缓存：摘要没变永不重嵌（增量）。
 * Run: npm run embed:gen [-- --dry] [-- --limit=N]  · 断点续传：每批落盘。
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { embedText } from '../server/engine/embeddings.js';
import { makeBar, fmtSec } from './utils/progress.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SUMS = path.join(ROOT, 'data', 'file-summaries.json');
const OUT = path.join(ROOT, 'data', 'summary-vectors.json');
const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');
const b64 = (v: Float32Array) => Buffer.from(v.buffer, v.byteOffset, v.byteLength).toString('base64');

async function main() {
    if (!fs.existsSync(SUMS)) { console.error('[embed] data/file-summaries.json 不存在 — 先 summaries:gen。'); return; }
    const sums: Record<string, { hash: string; summary: string }> = JSON.parse(fs.readFileSync(SUMS, 'utf-8'));
    const store: Record<string, { hash: string; vec: string }> = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const pending = Object.entries(sums).filter(([rel, s]) => {
        const h = sha1(s.summary);
        return store[rel]?.hash !== h;
    });
    console.error(`摘要 ${Object.keys(sums).length} 条 · 待嵌入 ${pending.length}（其余缓存命中）`);
    if (process.argv.includes('--dry')) { console.error('[dry] 不嵌入。'); return; }
    const lim = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
    const jobs = lim ? pending.slice(0, Number(lim)) : pending;
    if (!jobs.length) { console.error('无需嵌入。'); return; }

    const bar = makeBar('embed:gen 嵌入');
    const t0 = Date.now();
    bar.start(jobs.length, 0, { elapsed: '0秒', eta_fmt: '?', status: '' });
    for (let i = 0; i < jobs.length; i++) {
        const [rel, s] = jobs[i];
        try {
            const v = await embedText(s.summary);
            store[rel] = { hash: sha1(s.summary), vec: b64(v) };
        } catch (e: any) { /* 跳过单条失败，下轮补 */ }
        if ((i + 1) % 50 === 0 || i === jobs.length - 1) {   // 每 50 条落盘（断点）
            const sorted: typeof store = {};
            for (const k of Object.keys(store).sort()) sorted[k] = store[k];
            fs.writeFileSync(OUT, JSON.stringify(sorted), 'utf-8');
        }
        const el = (Date.now() - t0) / 1000;
        bar.update(i + 1, { elapsed: fmtSec(el), eta_fmt: fmtSec(i > 0 ? (el / (i + 1)) * (jobs.length - i - 1) : 0), status: `${rel.split('/').pop()}` });
    }
    bar.stop();
    const sorted: typeof store = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.writeFileSync(OUT, JSON.stringify(sorted), 'utf-8');
    console.error(`完成：库存 ${Object.keys(store).length} 向量 → data/summary-vectors.json · ${fmtSec((Date.now() - t0) / 1000)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main().catch(e => { console.error('Fatal:', e); process.exit(2); });
