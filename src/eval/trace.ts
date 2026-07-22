#!/usr/bin/env npx tsx
/**
 * trace — per-question autonomous-walk trace runner (record-only, no gold-file metrics).
 * Each question produces a decision log: pageStep/seedStep/walk (options+chosen+reason+result)/entryPages/agentCalls.
 * Honesty constraint: this file and walker/* do not import truth-io and do not read claude-truth.json.
 * Usage: npm run trace [-- --filter=<id substring>]
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { relPath } from '../server/engine/common.js';
import { loadTestcases } from './utils/load-testcases.js';
import { questionTokens } from '../server/engine/walker/affinity.js';
import { selectPages, resolveWikiFiles, selectSeedForPage, fallbackSeeds, informativeTokens, type SeedStep } from '../server/engine/walker/entry.js';
import { buildDirectedAdjacency, walkFromSeed, type WalkCtx, type WalkRound } from '../server/engine/walker/walk.js';
import { parseAgentCalls, type AgentCalls } from './walker/agent-calls.js';
import { withBar } from './utils/progress.js';
import type { WikiMap } from '../wikimap/schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
const WIKI_MAP = path.join(ROOT, 'data', 'wiki-map.json');
const TESTCASES = path.join(__dirname, 'utils', 'testcases.json');
const ANSWERS_DIR = path.join(ROOT, 'logs', 'answers-gemini-mcp-selfloop');
const VERDICTS = path.join(ROOT, 'logs', 'reports', 'verdicts.md');
const OUT_DIR = path.join(ROOT, 'logs', 'data', 'retrieval-trace');

interface Trace {
    id: string; question: string;
    tokens: { used: string[]; genericDropped: Array<{ token: string; df: number; pages: number }> };
    pageStep: ReturnType<typeof selectPages> | { options: never[]; chosen: never[]; reason: string };
    seedStep: SeedStep[];
    walk: WalkRound[];
    entryPages: Record<string, string[]>;
    agentCalls: AgentCalls | null;
}

function buildSymbolsOfFile(): (f: string) => string[] {
    // GLOBAL_INDEX.symbols is symbol -> Set<paths>; build a reverse index once, file -> symbols (alphabetical, for determinism)
    const byFile = new Map<string, string[]>();
    for (const [sym, paths] of GLOBAL_INDEX.symbols) {
        for (const p of paths) {
            let arr = byFile.get(p); if (!arr) { arr = []; byFile.set(p, arr); } arr.push(sym);
        }
    }
    for (const arr of byFile.values()) arr.sort();
    return (f: string) => byFile.get(f) ?? [];
}

async function main() {
    console.error('Loading index...');
    await ensureIndex();
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.`);

    if (!fs.existsSync(WIKI_MAP)) { console.error(`Missing ${WIKI_MAP} — run \`npm run wiki:map\` first.`); process.exit(2); }
    const wikiMap = JSON.parse(fs.readFileSync(WIKI_MAP, 'utf-8')) as WikiMap;

    // Drift rate (spec §4.1): the existence rate of wiki-map files against the current checkout
    const allFiles = [...GLOBAL_INDEX.allFiles];
    const { missing: allMissing } = resolveWikiFiles(Object.keys(wikiMap.file_to_pages), allFiles);
    console.error(`wiki-map drift rate: ${allMissing.length}/${Object.keys(wikiMap.file_to_pages).length} files not found in checkout`);

    const symbolsOfFile = buildSymbolsOfFile();
    const adj = buildDirectedAdjacency(GLOBAL_INDEX.callGraph);
    const realByRel = new Map(allFiles.map(f => [relPath(f), f]));   // build the table once, O(1) reverse lookup inside walk
    const walkCtx: WalkCtx = {
        adj,
        filesOf: (sym) => [...(GLOBAL_INDEX.symbols.get(sym) ?? [])].sort().map(relPath),
        symbolsOfFile: (relF) => {
            const real = realByRel.get(relF);
            return real ? symbolsOfFile(real) : [];
        },
    };

    const { flat } = loadTestcases(TESTCASES);
    const filterArg = process.argv.find(a => a.startsWith('--filter='))?.split('=')[1]?.toLowerCase();
    const selected = filterArg ? flat.filter(t => t.id.toLowerCase().includes(filterArg)) : flat;
    console.error(`Running ${selected.length} question(s)...`);
    fs.mkdirSync(OUT_DIR, { recursive: true });

    let fallbackCount = 0;
    await withBar('trace', selected, async (tc) => {
        // Corpus-level generic-term removal: tokens with df/N>0.5 (rocket/chat, etc.) have no discriminative power for page selection; derived from wiki-map and dropped.
        // The filtered tokens are shared throughout (page selection / seed selection / walk affinity), keeping "define once, consistent everywhere".
        const { kept: tokens, dropped: genericDropped } = informativeTokens(questionTokens(tc.question), wikiMap);
        const pageStep = selectPages(tokens, wikiMap);
        const seedSteps: SeedStep[] = [];
        let seeds: string[] = [];

        if (pageStep) {
            for (const pageName of pageStep.chosen) {
                const page = wikiMap.pages.find(p => p.page === pageName)!;
                const { resolved } = resolveWikiFiles(Object.keys(page.source_files), allFiles);
                const step = selectSeedForPage(tokens, page, resolved, symbolsOfFile);
                seedSteps.push(step);
                if (step.chosen) seeds.push(step.chosen);
            }
        }
        if (seeds.length === 0) {
            fallbackCount++;
            const fb = fallbackSeeds(tokens);
            seeds = fb.chosen;
            seedSteps.push({ page: '(fallback)', options: [], chosen: null, reason: fb.reason });
        }

        const walk: WalkRound[] = [];
        for (const seed of [...new Set(seeds)]) walk.push(...walkFromSeed(seed, walkCtx, tokens));

        // entryPages: seed file → architecture page
        const entryPages: Record<string, string[]> = {};
        for (const seed of new Set(seeds)) {
            for (const f of walkCtx.filesOf(seed)) {
                const wikiKey = Object.keys(wikiMap.file_to_pages).find(w => f.endsWith(w) || f === w);
                if (wikiKey) entryPages[f] = wikiMap.file_to_pages[wikiKey];
            }
        }

        const trace: Trace = {
            id: tc.id, question: tc.question,
            tokens: { used: tokens, genericDropped },
            pageStep: pageStep ?? { options: [], chosen: [], reason: 'fallback: no entry-graph hit (all pages below threshold)' },
            seedStep: seedSteps, walk, entryPages,
            agentCalls: parseAgentCalls(tc.id, ANSWERS_DIR, VERDICTS),
        };
        fs.writeFileSync(path.join(OUT_DIR, `${tc.id}.json`), JSON.stringify(trace, null, 2), 'utf-8');
        return `${tc.id}: ${pageStep?.chosen.length ?? 0} pages ${seeds.length} seed ${walk.length} steps`;
    });
    console.error(`Done. traces -> ${OUT_DIR} · fallback triggered ${fallbackCount}/${selected.length}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
