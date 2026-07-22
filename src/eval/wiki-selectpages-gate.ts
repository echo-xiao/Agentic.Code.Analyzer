#!/usr/bin/env npx tsx
/**
 * wiki-selectpages-gate.ts — P3 gate: selectPages hit rate (absolute gold, zero external dependencies, zero API).
 *
 * Evaluation: for each question with a claude-truth entry, check whether the pages selectPages picks (top-k)
 * cover the pages corresponding to the modules that the Claude gold-answer core files belong to (expectedPages).
 *
 * Exports:
 *   expectedPages(coreFiles, map, fileToModule) → string[]
 *   runGate(opts?) → GateResult
 *
 * CLI (`import.meta.url` guard): loads real files, prints the summary + a per-question table.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { selectPages, type PageStep } from '../server/engine/walker/entry.js';
import { questionTokens } from '../server/engine/walker/affinity.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';
import type { WikiMap } from '../wikimap/schema.js';
import type { ClaudeTruthMap } from './utils/truth-io.js';
import { embedText } from '../server/engine/embeddings.js';
import { semanticPageScores } from '../server/engine/walker/semantic-page.js';
import { loadVectors } from '../server/engine/entry-map.js';

// ── Paths (used only by CLI main) ─────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
const WIKI_MAP_PATH = path.join(ROOT, 'data', 'wiki-map.json');
const MODULE_GRAPH_PATH = path.join(ROOT, 'data', 'index', 'module-graph.json');
const TESTCASES_PATH = path.join(__dirname, 'utils', 'testcases.json');
const CLAUDE_TRUTH_PATH = path.join(__dirname, 'utils', 'claude-truth.json');
const WIKI_VERIFY_PATH = path.join(ROOT, 'logs', 'reports', 'wiki-verify.md');
const QUERY_EXPANSIONS_PATH = path.join(__dirname, 'utils', 'query-expansions.json');

// ── Expansion type ─────────────────────────────────────────────────────────────
interface Expansion { expandedSymbols: string[]; candidateModules: string[]; }
type ExpansionsMap = Record<string, Expansion>;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PerQuestion {
    id: string;
    hit: boolean;
    chosen: string[];
    expected: string[];
    goldCore: string[];
}

export interface GateResult {
    hitRate: number;
    perQuestion: PerQuestion[];
    skipped: string[];
    citationRate: number | null;
}

export interface GateOpts {
    map: WikiMap;
    fileToModule: Record<string, string>;
    testcases: TestCase[];
    claudeTruth: ClaudeTruthMap;
    /** Override the path to wiki-verify.md (for testing). Defaults to WIKI_VERIFY_PATH. */
    verifyPath?: string;
}

// ── Core logic ────────────────────────────────────────────────────────────────

/**
 * Given the list of core files from the Claude gold answer, return the page identifiers (p.page) in the
 * wiki-map that should be routed to.
 *
 * Steps:
 *   1. core files → fileToModule → collect the set of module IDs
 *   2. iterate map.pages, take every page whose page.modules intersects the module set
 *   3. return the deduplicated list of page.page (page identifiers)
 */
export function expectedPages(
    coreFiles: string[],
    map: WikiMap,
    fileToModule: Record<string, string>,
): string[] {
    // Step 1: core files → module set
    const moduleSet = new Set<string>();
    for (const f of coreFiles) {
        const mod = fileToModule[f];
        if (mod) moduleSet.add(mod);
    }
    if (moduleSet.size === 0) return [];

    // Steps 2-3: find the pages whose modules intersect moduleSet
    const result: string[] = [];
    const seen = new Set<string>();
    for (const p of map.pages) {
        if (!p.modules || p.modules.length === 0) continue;
        const intersects = p.modules.some(m => moduleSet.has(m));
        if (intersects && !seen.has(p.page)) {
            seen.add(p.page);
            result.push(p.page);
        }
    }
    return result;
}

/**
 * Read citation_validity_rate from logs/reports/wiki-verify.md.
 * Format: `**citation_validity_rate:** 92.5%`
 * Returns null if the file does not exist or there is no match.
 */
export function readCitationRate(verifyPath: string): number | null {
    if (!fs.existsSync(verifyPath)) return null;
    const text = fs.readFileSync(verifyPath, 'utf-8');
    const m = text.match(/\*\*citation_validity_rate:\*\*\s*([\d.]+)%/);
    if (!m) return null;
    return parseFloat(m[1]) / 100;
}

/**
 * Run wiki:gate.
 *
 * For each question with a claude-truth entry:
 *   - use questionTokens + selectPages to pick entry pages (chosen), passing in semantic scores + the query-expansion cache
 *   - use expectedPages to derive the pages that should be selected from the core files (expected)
 *   - hit = chosen ∩ expected is non-empty
 *   - hitRate = Σhit / #scored
 *
 * Questions without a claude-truth entry go into skipped (do not fabricate gold).
 */
export async function runGate(opts?: GateOpts): Promise<GateResult> {
    const { map, fileToModule, testcases, claudeTruth, verifyPath } = opts ?? loadReal();

    // Load the query-expansion cache (degrade gracefully when missing)
    let expansions: ExpansionsMap = {};
    try {
        expansions = JSON.parse(fs.readFileSync(QUERY_EXPANSIONS_PATH, 'utf-8'));
    } catch {
        // when the file does not exist, degrade to no query expansion
    }

    // Preload the vector table (lazy load; when it returns null the semantic score degrades to a lazy map)
    const vectors = loadVectors() ?? new Map<string, Float32Array>();

    const perQuestion: PerQuestion[] = [];
    const skipped: string[] = [];

    for (const tc of testcases) {
        const truth = claudeTruth[tc.id];
        if (!truth) {
            skipped.push(tc.id);
            continue;
        }

        const tokens = questionTokens(tc.question);

        // Compute semantic page scores (embedText is local bge, zero API)
        const qVec = await embedText(tc.question, 'query');
        const sem = semanticPageScores(qVec, map, vectors);

        // Read the query-expansion cache (degrade to empty when the key is missing)
        const exp: Expansion = expansions[tc.id] ?? { expandedSymbols: [], candidateModules: [] };

        const pageStep: PageStep | null = selectPages(tokens, map, undefined, {
            semScores: sem,
            expandedTokens: exp.expandedSymbols,
            candidateModules: exp.candidateModules,
        });
        const chosen: string[] = pageStep?.chosen ?? [];

        const expected = expectedPages(truth.core, map, fileToModule);

        const chosenSet = new Set(chosen);
        const hit = expected.some(p => chosenSet.has(p));

        perQuestion.push({
            id: tc.id,
            hit,
            chosen,
            expected,
            goldCore: truth.core,
        });
    }

    const scored = perQuestion.length;
    const hitCount = perQuestion.filter(r => r.hit).length;
    const hitRate = scored > 0 ? hitCount / scored : 0;

    const citationRate = readCitationRate(verifyPath ?? WIKI_VERIFY_PATH);

    return { hitRate, perQuestion, skipped, citationRate };
}

// ── Real file loader (CLI only) ───────────────────────────────────────────────

function loadReal(): GateOpts {
    if (!fs.existsSync(WIKI_MAP_PATH)) {
        throw new Error(`wiki-map.json not found at ${WIKI_MAP_PATH} — run wiki:gen first.`);
    }
    const map: WikiMap = JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8'));

    if (!fs.existsSync(MODULE_GRAPH_PATH)) {
        throw new Error(`module-graph.json not found at ${MODULE_GRAPH_PATH} — run module:build first.`);
    }
    const moduleGraph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8'));
    const fileToModule: Record<string, string> = moduleGraph.file_to_module ?? {};
    if (Object.keys(fileToModule).length === 0) {
        console.error('[wiki:gate] WARNING: module-graph.json has no file_to_module entries — all expectedPages will be empty and hitRate will be 0. Run module:build to regenerate.');
    }

    const { flat: testcases } = loadTestcases(TESTCASES_PATH);
    const claudeTruth: ClaudeTruthMap = JSON.parse(fs.readFileSync(CLAUDE_TRUTH_PATH, 'utf-8'));

    return { map, fileToModule, testcases, claudeTruth };
}

// ── CLI main ──────────────────────────────────────────────────────────────────

async function main() {
    console.log('[wiki:gate] loading files...');
    const result = await runGate();

    const { hitRate, perQuestion, skipped, citationRate } = result;
    const scored = perQuestion.length;
    const hitCount = perQuestion.filter(r => r.hit).length;

    console.log('');
    console.log('=== wiki:gate results ===');
    console.log(`hitRate:      ${(hitRate * 100).toFixed(1)}%  (${hitCount}/${scored} questions hit)`);
    console.log(`skipped:      ${skipped.length} questions (no claude-truth entry)`);
    if (skipped.length > 0) console.log(`  skipped: ${skipped.join(', ')}`);
    if (citationRate !== null) {
        console.log(`citationRate: ${(citationRate * 100).toFixed(1)}%  (from logs/reports/wiki-verify.md)`);
    } else {
        console.log(`citationRate: N/A  (logs/reports/wiki-verify.md does not exist or has no data; run wiki:verify first)`);
    }

    console.log('');
    console.log('=== per-question detail ===');
    const colId = 32, colHit = 5, colChosen = 40, colExpected = 40;
    const header =
        'id'.padEnd(colId) + ' | ' +
        'hit'.padEnd(colHit) + ' | ' +
        'chosen'.padEnd(colChosen) + ' | ' +
        'expected';
    console.log(header);
    console.log('-'.repeat(header.length + 20));

    for (const r of perQuestion) {
        const chosenStr = r.chosen.join(', ').slice(0, colChosen);
        const expectedStr = r.expected.join(', ').slice(0, colExpected);
        console.log(
            r.id.padEnd(colId) + ' | ' +
            (r.hit ? 'HIT' : 'miss').padEnd(colHit) + ' | ' +
            chosenStr.padEnd(colChosen) + ' | ' +
            expectedStr,
        );
    }

    console.log('');
    console.log('[wiki:gate] done.');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(err => { console.error('[wiki:gate] error:', err); process.exit(1); });
}
