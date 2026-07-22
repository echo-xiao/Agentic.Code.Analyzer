import * as crypto from 'crypto';
import * as fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadChunks, type Chunk } from '../indexer/chunks.js';
import { embedText, EMBED_MODEL } from '../server/engine/embeddings.js';
import { CHUNK_VECTORS_PATH, INDEX_DIR } from '../config.js';
import { guardModel, stampModel } from './utils/vec-model-guard.js';

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');
const b64 = (v: Float32Array) => Buffer.from(v.buffer, v.byteOffset, v.byteLength).toString('base64');

// At this stage chunks have no summary (§6.3 summaries land in P2), so embed the signature;
// switch to the chunk summary here once P2 produces it.
export function textForChunk(c: Chunk): string { return c.signature ?? ''; }

export async function embedChunks(): Promise<number> {
    const chunks = loadChunks();
    if (!chunks) { console.error('[embed-chunks] chunks.json missing — run module:build/prewarm first.'); return 0; }
    guardModel(CHUNK_VECTORS_PATH, EMBED_MODEL); stampModel(CHUNK_VECTORS_PATH, EMBED_MODEL);  // switching embedding model → wipe and re-embed
    const store: Record<string, { hash: string; vec: string }> =
        fs.existsSync(CHUNK_VECTORS_PATH) ? JSON.parse(fs.readFileSync(CHUNK_VECTORS_PATH, 'utf-8')) : {};
    const jobs = Object.values(chunks).filter(c => {
        const t = textForChunk(c);
        return t && store[c.id]?.hash !== sha1(t);
    });
    let done = 0;
    for (let i = 0; i < jobs.length; i++) {
        const c = jobs[i];
        const t = textForChunk(c);
        try {
            const v = await embedText(t, 'passage');
            store[c.id] = { hash: sha1(t), vec: b64(v) };
            done++;
        } catch (e: any) { console.error(`[embed-chunks] skipped ${c.id}: ${e?.message?.slice(0, 80)}`); }
        if ((i + 1) % 100 === 0 || i === jobs.length - 1) {
            fs.mkdirSync(INDEX_DIR, { recursive: true });
            const sorted: typeof store = {};
            for (const k of Object.keys(store).sort()) sorted[k] = store[k];
            fs.writeFileSync(CHUNK_VECTORS_PATH, JSON.stringify(sorted), 'utf-8');
        }
    }
    console.error(`[embed-chunks] newly embedded ${done} / stored ${Object.keys(store).length}`);
    return done;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    embedChunks().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
