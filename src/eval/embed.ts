#!/usr/bin/env npx tsx
/**
 * embed — precompute summary vectors for the whole repo (local xenova, zero API). The vector layer of
 * Approach 2 semantic ranking.
 * Input data/summaries/file-summaries.json (each entry {hash, ranking_line}), output data/summaries/summary-vectors.json
 * ({relPath:{hash, vec:base64}}). Cached by summary-text hash: unchanged summaries are never re-embedded (incremental).
 * Run: npm run embed:gen [-- --dry] [-- --limit=N]  · resumable: flushes to disk each batch.
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { embedText, EMBED_MODEL } from '../server/engine/embeddings.js';
import { makeBar, fmtSec } from './utils/progress.js';
import { guardModel, stampModel } from './utils/vec-model-guard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SUMS = path.join(ROOT, 'data', 'summaries', 'file-summaries.json');
const OUT = path.join(ROOT, 'data', 'summaries', 'summary-vectors.json');
const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');
const b64 = (v: Float32Array) => Buffer.from(v.buffer, v.byteOffset, v.byteLength).toString('base64');

export function textForSummary(fs: any): string {
  return fs.ranking_line ?? '';
}

async function main() {
    if (!fs.existsSync(SUMS)) { console.error('[embed] data/summaries/file-summaries.json does not exist — run summaries:gen first.'); return; }
    guardModel(OUT, EMBED_MODEL); stampModel(OUT, EMBED_MODEL);   // switching embedding model → wipe old vectors and force re-embed
    const sums: Record<string, { hash: string; ranking_line: string }> = JSON.parse(fs.readFileSync(SUMS, 'utf-8'));
    const store: Record<string, { hash: string; vec: string }> = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const pending = Object.entries(sums).filter(([rel, s]) => {
        const text = textForSummary(s);
        if (!text) return false;  // skip entries with an empty ranking_line
        const h = sha1(text);
        return store[rel]?.hash !== h;
    });
    console.error(`summaries ${Object.keys(sums).length} · to embed ${pending.length} (rest are cache hits)`);
    if (process.argv.includes('--dry')) { console.error('[dry] not embedding.'); return; }
    const lim = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
    const jobs = lim ? pending.slice(0, Number(lim)) : pending;
    if (!jobs.length) { console.error('nothing to embed.'); return; }

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    const bar = makeBar('embed:gen embedding');
    const t0 = Date.now();
    bar.start(jobs.length, 0, { elapsed: '0s', eta_fmt: '?', status: '' });
    for (let i = 0; i < jobs.length; i++) {
        const [rel, s] = jobs[i];
        try {
            const text = textForSummary(s);
            const v = await embedText(text);
            store[rel] = { hash: sha1(text), vec: b64(v) };
        } catch (e: any) { bar.stop(); console.error(`[embed] skipped ${rel}: ${e?.message?.slice(0, 80)}`); bar.start(jobs.length, i + 1); }  // log it to avoid "whole batch fails silently → 0" (summaries got bitten by this once)
        if ((i + 1) % 50 === 0 || i === jobs.length - 1) {   // flush every 50 entries (checkpoint)
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
    console.error(`done: stored ${Object.keys(store).length} vectors → data/summaries/summary-vectors.json · ${fmtSec((Date.now() - t0) / 1000)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main().catch(e => { console.error('Fatal:', e); process.exit(2); });
