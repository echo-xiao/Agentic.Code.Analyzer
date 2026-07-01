#!/usr/bin/env npx tsx
/**
 * exp-depth — for the CLUSTER-ablation regressions, is the lost core file DEEP (needs more graph
 * depth) or SHALLOW-BUT-BURIED (depth won't help, per-hop truncation/ranking is the wall)?
 * Read-only, deterministic, no Gemini. BFS undirected call-graph from the entry symbol; report for
 * each core file the min hop it's reachable at, and the frontier size at each hop (crowding).
 */
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGRESSED = ['claude-08-federation', 'tour-04-msg-client', 'new-09-realtime-streamer',
    'new-22-2fa', 'new-14-ee-license', 'claude-06-livechat-routing'];
const MAX_HOP = 6;

let NB: Map<string, Set<string>> | null = null;
function neighbors(): Map<string, Set<string>> {
    if (NB) return NB;
    const n = new Map<string, Set<string>>();
    const link = (a: string, b: string) => { let s = n.get(a); if (!s) { s = new Set(); n.set(a, s); } s.add(b); };
    for (const [callee, callers] of GLOBAL_INDEX.callGraph as Map<string, Array<{ caller: string }>>)
        for (const { caller } of callers) { if (caller !== callee) { link(callee, caller); link(caller, callee); } }
    NB = n; return n;
}

function pathMatch(a: string, b: string): boolean {
    a = a.replace(/\\/g, '/'); b = b.replace(/\\/g, '/');
    return a === b || a.endsWith(b) || a.replace(/\.(tsx?|js)$/, '').endsWith(b.replace(/\.(tsx?|js)$/, ''));
}
function entrySym(tc: TestCase): string {
    return tc.groundTruthPath?.[0]?.symbol ?? tc.keySymbols?.[0] ?? '';
}

async function main() {
    await ensureIndex();
    const { flat } = loadTestcases(path.resolve(__dirname, 'utils', 'testcases.json'));
    const nb = neighbors();

    for (const id of REGRESSED) {
        const tc = flat.find(t => t.id === id); if (!tc) continue;
        const core = (tc.core?.length ? tc.core : tc.groundTruthFiles) ?? [];
        const seed = entrySym(tc);
        console.log(`\n### ${id}   seed=\`${seed}\`  (${core.length} core files)`);
        if (!nb.has(seed)) { console.log(`  seed has NO graph neighbors — graph can't start here`); continue; }

        // BFS, record hop per symbol + frontier sizes
        const hop = new Map<string, number>([[seed, 0]]);
        const frontierSize: number[] = [1];
        let frontier = [seed];
        for (let d = 1; d <= MAX_HOP && frontier.length; d++) {
            const next: string[] = [];
            for (const s of frontier) for (const x of nb.get(s) ?? []) if (!hop.has(x)) { hop.set(x, d); next.push(x); }
            frontier = next; frontierSize[d] = next.length;
        }

        // for each core file, min hop at which a symbol living in it appears
        for (const cf of core) {
            let min = Infinity;
            for (const [sym, h] of hop) {
                if (h >= min) continue;
                const files = GLOBAL_INDEX.symbols.get(sym);
                if (files && [...files].some(f => pathMatch(f, cf))) min = h;
            }
            const rel = cf.split('/').slice(-2).join('/');
            const crowd = min <= MAX_HOP ? `  (hop-${min} frontier had ${frontierSize[min]} nodes)` : '';
            console.log(`  ${min <= MAX_HOP ? `hop ${min}` : 'UNREACHABLE ≤6'} — ${rel}${crowd}`);
        }
        console.log(`  frontier per hop: ${frontierSize.map((n, i) => `h${i}:${n}`).join('  ')}`);
    }
}
main().catch(e => { console.error(e); process.exit(1); });
