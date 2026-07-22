#!/usr/bin/env npx tsx
/**
 * summarize — P2: generate a multi-field structured summary for every indexed file in the repo (Claude API,
 * one independent call per file that injects structural facts).
 *
 * Target set = all skeletons (output.nosync/**​/*.skeleton.ts).
 * Output: data/summaries/file-summaries.json { relPath: FileSummary } (committed, deterministic sorted-key output).
 * Cache: sha1 hash of skeleton content — skeleton changes → hash changes → regenerate (resumable).
 * Run: npm run summaries:gen [-- --dry] [-- --limit=N]
 *   --dry      only report target-set stats and samples, no API calls (zero-cost preflight)
 *   --limit=N  only run the first N files (spend a few cents to validate output quality first, then go full)
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import cliProgress from 'cli-progress';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { OUTPUT_DIR } from '../config.js';
import { computeFacts } from '../indexer/structural-facts.js';
import { ensureIndex, LocalDatabase } from '../indexer/index.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { assembleSummary, FILE_SUMMARY_LLM_SCHEMA, type FileSummary, type LLMFields } from './file-summary.js';
import { runPool, callWithRetry } from './utils/pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const SUMMARIES_DIR = path.join(ROOT, 'data', 'summaries');
const OUT = path.join(SUMMARIES_DIR, 'file-summaries.json');
export const MODEL_LEAF = 'claude-haiku-4-5-20251001';
const MAX_SKELETON_LINES = 400;

type Store = Record<string, FileSummary>;

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

// Recursively glob all skeleton files (pure filesystem traversal)
function allSkeletons(dir: string, out: string[] = []): string[] {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) allSkeletons(p, out);
        else if (e.name.endsWith('.skeleton.ts')) out.push(p);
    }
    return out;
}

/**
 * buildPrompt — pure function that assembles the prompt string from skeleton + structural facts.
 * Exported for use by the Task 8 A/B script and unit tests.
 */
export function buildPrompt(rel: string, skeletonText: string, facts: FileSummary): string {
    const lines = skeletonText.split('\n');
    const truncated = lines.length > MAX_SKELETON_LINES;
    const skeletonBody = lines.slice(0, MAX_SKELETON_LINES).join('\n')
        + (truncated ? `\n\n// [truncated: ${lines.length} lines total, showing first ${MAX_SKELETON_LINES}]` : '');

    return [
        `You summarize ONE source file of the Rocket.Chat codebase. Output the 4 schema fields.`,
        `Use the STRUCTURAL FACTS below (they are ground truth from the dependency graph — do not contradict them):`,
        `- exports: ${facts.key_exports.join(', ') || '(none)'}`,
        `- fanIn (files importing this): ${facts.fanIn}  ·  fanOut: ${facts.fanOut}`,
        `- upstream (this file calls): ${facts.upstream.join(', ') || '(none)'}`,
        `- cross-layer edges: ${facts.crossLayerEdges.join(', ') || '(none)'}`,
        ``,
        `role = one line what this file does (concrete domain nouns). responsibilities = 2-4 short phrases.`,
        `characteristics = tags from: entry-point|singleton|cross-layer-dispatcher|service-class|react-component|react-hook|model|util|config|type-only|hot-path (a file with high fanIn is often hot-path; cross-layer edges → cross-layer-dispatcher).`,
        `subsystem_hint = which subsystem (e.g. messaging, livechat, auth).`,
        ``,
        `File: ${rel}`,
        '```', skeletonBody, '```',
    ].join('\n');
}

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    // no key → graceful skip (exit 0): summaries are an incremental optional layer and shouldn't drag down the whole refresh pipeline
    if (!apiKey) { console.error('[summaries] ANTHROPIC_API_KEY not set — skipping summary generation (does not affect the other steps).'); return; }
    if (!fs.existsSync(OUTPUT_DIR)) { console.error('[summaries] output.nosync does not exist — run npm run prewarm first.'); return; }

    // Load the global index (ensures GLOBAL_INDEX.fileDependents/allFiles are populated so downstream/fanIn have data)
    await ensureIndex();

    // Create the output directory
    fs.mkdirSync(SUMMARIES_DIR, { recursive: true });

    const client = new Anthropic({ apiKey });
    const store: Store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const skeletons = allSkeletons(OUTPUT_DIR).sort();
    console.error(`${skeletons.length} skeletons in the repo`);

    // Read skeleton + hash, pick the ones that need work (new or content changed).
    const pending: Array<{ rel: string; hash: string; skeletonText: string; skeletonPath: string }> = [];
    let missing = 0;
    for (const sk of skeletons) {
        const content = fs.readFileSync(sk, 'utf-8');
        const m = content.match(/^## File:\s*(.+)$/m);
        if (!m) { missing++; continue; }         // no File header (malformed skeleton) → skip
        const rel = m[1].trim();
        const hash = sha1(content);              // hash computed over the skeleton (source changes → skeleton changes → hash changes)
        if (store[rel]?.hash === hash) continue; // cache hit
        pending.push({ rel, hash, skeletonText: content, skeletonPath: sk });
    }
    console.error(`cache hits ${skeletons.length - missing - pending.length} · to generate ${pending.length} · malformed skipped ${missing}`);

    if (process.argv.includes('--dry')) {
        console.error(`[dry] estimated ${pending.length} API calls (one per file, ${MODEL_LEAF}). Samples to generate:`);
        for (const p of pending.slice(0, 8)) console.error(`  - ${p.rel}`);
        return;
    }

    const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
    if (limitArg) {
        pending.splice(Number(limitArg));
        console.error(`[limit] only running the first ${pending.length} this time`);
    }
    if (pending.length === 0) { console.error('nothing to generate.'); write(store); return; }

    let done = 0, failed = 0;
    const t0 = Date.now();
    const fmt = (sec: number) => sec >= 60 ? `${Math.floor(sec / 60)}m${Math.round(sec % 60)}s` : `${Math.round(sec)}s`;

    // Progress bar: a live-refresh bar in an interactive terminal; when piped to a nohup log (non-TTY) it prints one line every 5s
    const bar = new cliProgress.SingleBar({
        format: '  summary generation [{bar}] {percentage}% | {value}/{total} files | elapsed {elapsed} | eta {eta_fmt} | saved {saved} failed {failed}',
        noTTYOutput: true, notTTYSchedule: 5000, hideCursor: true, etaBuffer: 5,
    }, cliProgress.Presets.shades_classic);
    bar.start(pending.length, 0, { elapsed: '0s', eta_fmt: '?', saved: Object.keys(store).length, failed: 0 });

    const CONCURRENCY = Number(process.env.SUMMARIES_CONCURRENCY || 8);
    console.error(`concurrency ${CONCURRENCY}`);
    let processed = 0;
    await runPool(pending, CONCURRENCY, async ({ rel, hash, skeletonText, skeletonPath }) => {
        // Read mapping.json to get symbols
        const mappingPath = skeletonPath.replace('.skeleton.ts', '.mapping.json');
        let symbols: any[] = [];
        if (fs.existsSync(mappingPath)) {
            try {
                const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
                symbols = mapping.symbols ?? [];
            } catch { /* mapping read failed, empty symbols */ }
        }

        const facts = computeFacts(rel, symbols);
        const factsForPrompt = { ...facts, hash: '', role: '', responsibilities: [], characteristics: [], subsystem_hint: '', ranking_line: '' } as FileSummary;
        const prompt = buildPrompt(rel, skeletonText, factsForPrompt);

        try {
            const resp = await callWithRetry(() => client.messages.create({
                model: MODEL_LEAF,
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
                output_config: { format: { type: 'json_schema', schema: FILE_SUMMARY_LLM_SCHEMA } },
            } as any));

            const block = (resp.content as any[]).find((b: any) => b.type === 'text');
            const llm = JSON.parse(block.text) as LLMFields;
            store[rel] = assembleSummary(hash, llm, facts);
            done++;
        } catch (e: any) {
            failed++;
            console.error(`  file ${rel} failed: ${e?.message?.slice(0, 120)}`);
        }

        // Checkpoint save: flush immediately after each completion (writeFileSync is synchronous, single-threaded; a crash loses nothing completed, and a rerun skips via hash)
        write(store);
        processed++;
        const elapsed = (Date.now() - t0) / 1000;
        const eta = (elapsed / processed) * (pending.length - processed);
        bar.update(processed, { elapsed: fmt(elapsed), eta_fmt: fmt(eta), saved: Object.keys(store).length, failed });
    });

    bar.stop();
    write(store);
    console.error(`done: added/updated ${done}, failed ${failed}, stored ${Object.keys(store).length} → data/summaries/file-summaries.json · total time ${fmt((Date.now() - t0) / 1000)}`);
}

function write(store: Store) {
    fs.mkdirSync(SUMMARIES_DIR, { recursive: true });
    const sorted: Store = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1), 'utf-8');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
