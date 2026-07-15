#!/usr/bin/env npx tsx
/**
 * wiki-selectpages-gate.ts — P3 门：selectPages 命中率（绝对 gold，零外部依赖，零 API）。
 *
 * 评测：对每个有 claude-truth 条目的题，检查 selectPages 选出的页面（top-k）是否覆盖
 * Claude 金答案 core 文件所属模块对应的页面（expectedPages）。
 *
 * 导出:
 *   expectedPages(coreFiles, map, fileToModule) → string[]
 *   runGate(opts?) → GateResult
 *
 * CLI（`import.meta.url` guard）: 加载真实文件，打印汇总 + 逐题表格。
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
 * 给定 Claude 金答案的 core 文件列表，返回 wiki-map 中应该被路由到的页面标识符（p.page）。
 *
 * 步骤：
 *   1. core 文件 → fileToModule → 收集模块 ID 集合
 *   2. 遍历 map.pages，取 page.modules 与模块集合有交集的所有页
 *   3. 返回去重后的 page.page（页面标识符）列表
 */
export function expectedPages(
    coreFiles: string[],
    map: WikiMap,
    fileToModule: Record<string, string>,
): string[] {
    // 步骤 1：core 文件 → 模块集合
    const moduleSet = new Set<string>();
    for (const f of coreFiles) {
        const mod = fileToModule[f];
        if (mod) moduleSet.add(mod);
    }
    if (moduleSet.size === 0) return [];

    // 步骤 2-3：找出 modules 与 moduleSet 有交集的页
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
 * 读取 logs/reports/wiki-verify.md 中的 citation_validity_rate。
 * 格式: `**citation_validity_rate:** 92.5%`
 * 若文件不存在或无匹配，返回 null。
 */
export function readCitationRate(verifyPath: string): number | null {
    if (!fs.existsSync(verifyPath)) return null;
    const text = fs.readFileSync(verifyPath, 'utf-8');
    const m = text.match(/\*\*citation_validity_rate:\*\*\s*([\d.]+)%/);
    if (!m) return null;
    return parseFloat(m[1]) / 100;
}

/**
 * 运行 wiki:gate。
 *
 * 对每个有 claude-truth 条目的题：
 *   - 用 questionTokens + selectPages 选入口页（chosen），并传入语义分 + 扩词缓存
 *   - 用 expectedPages 从 core 文件推算应选页（expected）
 *   - hit = chosen ∩ expected 非空
 *   - hitRate = Σhit / #scored
 *
 * 无 claude-truth 条目的题放入 skipped（不编造 gold）。
 */
export async function runGate(opts?: GateOpts): Promise<GateResult> {
    const { map, fileToModule, testcases, claudeTruth, verifyPath } = opts ?? loadReal();

    // 加载扩词缓存（缺失时优雅退化）
    let expansions: ExpansionsMap = {};
    try {
        expansions = JSON.parse(fs.readFileSync(QUERY_EXPANSIONS_PATH, 'utf-8'));
    } catch {
        // 文件不存在时退化为无扩词
    }

    // 预加载向量表（懒加载，返回 null 时语义分退化为惰性 map）
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

        // 计算语义页面分（embedText 本地 bge，零 API）
        const qVec = await embedText(tc.question, 'query');
        const sem = semanticPageScores(qVec, map, vectors);

        // 读取扩词缓存（缺失键时退化为空）
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
    console.log('[wiki:gate] 加载文件...');
    const result = await runGate();

    const { hitRate, perQuestion, skipped, citationRate } = result;
    const scored = perQuestion.length;
    const hitCount = perQuestion.filter(r => r.hit).length;

    console.log('');
    console.log('=== wiki:gate 结果 ===');
    console.log(`hitRate:      ${(hitRate * 100).toFixed(1)}%  (${hitCount}/${scored} 题命中)`);
    console.log(`skipped:      ${skipped.length} 题（无 claude-truth 条目）`);
    if (skipped.length > 0) console.log(`  跳过: ${skipped.join(', ')}`);
    if (citationRate !== null) {
        console.log(`citationRate: ${(citationRate * 100).toFixed(1)}%  (来自 logs/reports/wiki-verify.md)`);
    } else {
        console.log(`citationRate: N/A  (logs/reports/wiki-verify.md 不存在或无数据，需先运行 wiki:verify)`);
    }

    console.log('');
    console.log('=== 逐题明细 ===');
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
    console.log('[wiki:gate] 完成。');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(err => { console.error('[wiki:gate] 错误:', err); process.exit(1); });
}
