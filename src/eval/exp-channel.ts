#!/usr/bin/env npx tsx
/**
 * exp-channel — CORRELATIONAL channel attribution (read-only, no Gemini, deterministic).
 *
 * The `search` tool concatenates up to 6 sections (channels). This measures each channel's
 * contribution to surfacing the core-spine files, on the SAME primary query eval-2 uses.
 *
 *   coverage  = core files this channel surfaced (any)
 *   unique    = core files ONLY this channel surfaced (marginal value proxy)
 *   junk      = non-GT paths emitted (noise / token cost proxy)
 *   fires     = # testcases where the channel produced any output
 *
 * NOTE: correlational, not causal. It attributes at the FILE level on ONE query; it cannot
 * see cross-turn pivots (a channel's seed symbol → agent graph-walks to a core file later).
 * For causal marginal value, ablate the channel and re-run gen (separate experiment).
 */
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { handleToolCall } from '../server/registry.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';
import * as fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ANSWERS_DIR = path.resolve(__dirname, '..', '..', 'logs', 'answers-gemini-mcp-selfloop');

// Pull the agent's ACTUAL search queries for a testcase out of its saved answer .md.
// (search args are short → survive the 100-char trace truncation; graph/implement don't, but
//  only search carries the channels, so that's all we need.)
function realSearchQueries(id: string): string[] {
    const f = path.join(ANSWERS_DIR, `${id}.md`);
    if (!fs.existsSync(f)) return [];
    const txt = fs.readFileSync(f, 'utf-8');
    const qs: string[] = [];
    for (const m of txt.matchAll(/`search\(\{"query":"([^"]+)"/g)) qs.push(m[1]);
    return Array.from(new Set(qs));
}

const CHANNELS = [
    { key: 'EXACT',   header: '🎯 Symbol "' },
    { key: 'CLUSTER', header: '🧭 Subsystem' },
    { key: 'PREFIX1', header: '🔍 Symbol "' },
    { key: 'PREFIXn', header: '💡 Symbol prefix matches:' },
    { key: 'SCORE',   header: '🔍 Symbols:' },
    { key: 'PATH',    header: '📁 Files:' },
    { key: 'GREP',    header: '🔍 Text matches for "' },
] as const;
type ChanKey = typeof CHANNELS[number]['key'];

function pathMatchesGt(rankedPath: string, gtFile: string): boolean {
    const a = rankedPath.replace(/\\/g, '/');
    const b = gtFile.replace(/\\/g, '/');
    if (a === b || a.endsWith(b)) return true;
    return a.replace(/\.(tsx?|js)$/, '').endsWith(b.replace(/\.(tsx?|js)$/, ''));
}

// Assign each line of the search result to the channel of the most recent header above it.
function splitByChannel(text: string): Map<ChanKey, string[]> {
    const out = new Map<ChanKey, string[]>();
    let cur: ChanKey | null = null;
    for (const line of text.split('\n')) {
        const hit = CHANNELS.find(c => line.startsWith(c.header));
        if (hit) { cur = hit.key; if (!out.has(cur)) out.set(cur, []); continue; }
        if (cur) out.get(cur)!.push(line);
    }
    return out;
}

// Extract candidate file paths from a block, normalised to repo-relative.
function extractPaths(lines: string[]): Set<string> {
    const paths = new Set<string>();
    const re = /[\w./@-]+\.tsx?/g;
    for (const line of lines) {
        for (const m of line.matchAll(re)) {
            let p = m[0];
            const idx = p.indexOf('Rocket.Chat/');
            if (idx >= 0) p = p.slice(idx + 'Rocket.Chat/'.length);
            paths.add(p);
        }
    }
    return paths;
}

function primaryQueryOf(tc: TestCase): string {
    return (tc.groundTruthPath?.[0]?.symbol
        ?? tc.keySymbols?.[0]
        ?? path.basename((tc.groundTruthFiles?.[0] ?? '')).replace(/\.(tsx?|js)$/, ''));
}

async function runPass(label: string, flat: TestCase[], queriesOf: (tc: TestCase) => string[], ceilingNote: string) {
    const agg: Record<ChanKey, { fires: number; cov: number; uniq: number; junk: number }> =
        Object.fromEntries(CHANNELS.map(c => [c.key, { fires: 0, cov: 0, uniq: 0, junk: 0 }])) as any;
    let totalCore = 0, unionCov = 0, skipped = 0;

    for (const tc of flat) {
        const core = (tc.core?.length ? tc.core : tc.groundTruthFiles) ?? [];
        if (core.length === 0) continue;
        const gtAll = new Set([...core, ...(tc.supporting ?? [])]);
        const queries = queriesOf(tc).filter(Boolean);
        if (queries.length === 0) { skipped++; continue; }
        totalCore += core.length;

        // Aggregate a channel's surfaced core files across ALL of this tc's queries.
        const coreByChan = new Map<ChanKey, Set<string>>();
        const firedThisTc = new Set<ChanKey>();
        const junkByChan = new Map<ChanKey, number>();
        for (const query of queries) {
            const res: any = await handleToolCall('search', { query });
            const byChan = splitByChannel(res?.content?.[0]?.text ?? '');
            for (const c of CHANNELS) {
                const lines = byChan.get(c.key);
                if (!lines) continue;
                firedThisTc.add(c.key);
                if (!coreByChan.has(c.key)) coreByChan.set(c.key, new Set());
                for (const p of extractPaths(lines)) {
                    const cf = core.find(f => pathMatchesGt(p, f));
                    if (cf) coreByChan.get(c.key)!.add(cf);
                    else if (![...gtAll].some(g => pathMatchesGt(p, g)))
                        junkByChan.set(c.key, (junkByChan.get(c.key) ?? 0) + 1);
                }
            }
        }
        for (const k of firedThisTc) agg[k].fires++;
        for (const [k, s] of coreByChan) agg[k].cov += s.size;
        for (const [k, j] of junkByChan) agg[k].junk += j;

        const union = new Set<string>();
        for (const s of coreByChan.values()) for (const f of s) union.add(f);
        unionCov += union.size;
        for (const f of union) {
            const owners = [...coreByChan.entries()].filter(([, s]) => s.has(f)).map(([k]) => k);
            if (owners.length === 1) agg[owners[0]].uniq++;
        }
    }

    const pct = (n: number) => `${(100 * n / totalCore).toFixed(0)}%`;
    console.log(`\n# ${label} (${totalCore} core files${skipped ? `, ${skipped} tc skipped (no queries)` : ''})\n`);
    console.log(`Union coverage (any channel): ${unionCov}/${totalCore} = ${pct(unionCov)}   ${ceilingNote}\n`);
    console.log('| channel | fires | core-cov | cov% | UNIQUE | junk/fire |');
    console.log('|---|---:|---:|---:|---:|---:|');
    for (const c of CHANNELS) {
        const a = agg[c.key];
        console.log(`| ${c.key} | ${a.fires} | ${a.cov} | ${pct(a.cov)} | **${a.uniq}** | ${a.fires ? (a.junk / a.fires).toFixed(1) : '—'} |`);
    }
}

async function main() {
    await ensureIndex();
    console.error(`Index: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files\n`);
    const { flat } = loadTestcases(path.resolve(__dirname, 'utils', 'testcases.json'));

    await runPass('A. Primary query (single, eval-2 style)', flat,
        tc => [primaryQueryOf(tc)], '[eval-2 top-50 ceiling ≈ 55%]');
    await runPass("B. Agent's ACTUAL search queries (real usage, multi-query)", flat,
        tc => realSearchQueries(tc.id), '[what the agent really exposed itself to]');

    console.log(`\nUNIQUE = core files ONLY that channel surfaced (irreplaceable contribution).`);
    console.log(`junk/fire = avg non-GT paths emitted per firing (noise/token cost).`);
}

main().catch(e => { console.error(e); process.exit(1); });
