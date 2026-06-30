#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { CodeRetriever } from '../server/retriever.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Track A — ranking quality of the search tool (precision / recall@k / MRR).
interface RetrievalMetrics {
    primaryQuery: string;
    rankedDepth: number;
    coreRanks: { file: string; rank: number | null }[];
    recallAt5: number;
    recallAt10: number;
    recallAt20: number;
    mrr: number;
    precisionAt5: number;
    f1At5: number;
    diagnosis: 'ok' | 'ranked-low' | 'recall-miss' | 'mixed' | 'n/a';
}

// Chain-order quality (LCS). Only meaningful for questions flagged `ordered`.
interface OrderMetric {
    applicable: boolean;        // ordered question with a chain length > 1
    expectedChain: string[];    // ground-truth chain symbols, in order
    observedChain: string[];    // chain symbols sorted by first appearance in graph(down) output
    lcs: number;                // longest common subsequence length (expected vs observed)
    score: number;              // lcs / expectedChain.length, 0..1 (partial credit)
}

interface TestResult {
    id: string;
    question: string;
    subsystem: string;
    searchFileRecall: { found: string[]; missed: string[]; rate: number };
    searchSymbolRecall: { found: string[]; missed: string[]; rate: number };
    graphReachability: { found: string[]; missed: string[]; rate: number } | null;
    order: OrderMetric;
    retrieval: RetrievalMetrics;
    sanityPass: boolean;
    retrievalPass: boolean;
    pass: boolean;
}

function pathMatchesGt(rankedPath: string, gtFile: string): boolean {
    const a = rankedPath.replace(/\\/g, '/');
    const b = gtFile.replace(/\\/g, '/');
    if (a === b || a.endsWith(b)) return true;
    const aNoExt = a.replace(/\.(tsx?|js)$/, '');
    const bNoExt = b.replace(/\.(tsx?|js)$/, '');
    return aNoExt.endsWith(bNoExt);
}

// Longest common subsequence length between two symbol sequences (for chain-order scoring).
function lcsLength(a: string[], b: string[]): number {
    const m = a.length, n = b.length;
    if (m === 0 || n === 0) return 0;
    const dp: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        let prev = 0;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : Math.max(dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}

// First index where `symbol` appears as a whole word, or -1.
function firstSymbolIndex(text: string, symbol: string): number {
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = new RegExp(`\\b${escaped}\\b`).exec(text);
    return m ? m.index : -1;
}

// Run the *primary* search query and measure how well it ranks the core GT files.
function computeRetrievalMetrics(tc: TestCase): RetrievalMetrics {
    const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
    const supporting = tc.supporting ?? [];
    const gtAll = Array.from(new Set([...core, ...supporting]));

    const primaryQuery =
        tc.groundTruthPath?.[0]?.symbol ??
        tc.keySymbols?.[0] ??
        path.basename((tc.groundTruthFiles?.[0] ?? '')).replace(/\.(tsx?|js)$/, '');

    const empty: RetrievalMetrics = {
        primaryQuery, rankedDepth: 0, coreRanks: core.map(f => ({ file: f, rank: null })),
        recallAt5: 0, recallAt10: 0, recallAt20: 0, mrr: 0, precisionAt5: 0, f1At5: 0, diagnosis: 'n/a',
    };
    if (!primaryQuery || core.length === 0) return empty;

    const results = CodeRetriever.search(primaryQuery, 50);
    const rankedFiles: string[] = [];
    const seen = new Set<string>();
    for (const r of results) {
        for (const p of ((r.paths ?? []) as string[])) {
            if (!seen.has(p)) { seen.add(p); rankedFiles.push(p); }
        }
    }

    const bestRank = (gtFile: string): number | null => {
        for (let i = 0; i < rankedFiles.length; i++) {
            if (pathMatchesGt(rankedFiles[i], gtFile)) return i + 1;
        }
        return null;
    };

    const coreRanks = core.map(f => ({ file: f, rank: bestRank(f) }));
    const within = (k: number) => coreRanks.filter(c => c.rank !== null && c.rank <= k).length / core.length;
    const recallAt5 = within(5), recallAt10 = within(10), recallAt20 = within(20);
    const mrr = coreRanks.reduce((s, c) => s + (c.rank ? 1 / c.rank : 0), 0) / core.length;

    const top5 = rankedFiles.slice(0, 5);
    const top5Hits = top5.filter(p => gtAll.some(g => pathMatchesGt(p, g))).length;
    const precisionAt5 = top5.length ? top5Hits / 5 : 0;
    const f1At5 = (precisionAt5 + recallAt5) > 0
        ? 2 * precisionAt5 * recallAt5 / (precisionAt5 + recallAt5) : 0;

    const missedTop5 = coreRanks.filter(c => c.rank === null || c.rank > 5);
    let diagnosis: RetrievalMetrics['diagnosis'] = 'ok';
    if (missedTop5.length > 0) {
        const rankedLow = missedTop5.some(c => c.rank !== null);
        const recallMiss = missedTop5.some(c => c.rank === null);
        diagnosis = rankedLow && recallMiss ? 'mixed' : rankedLow ? 'ranked-low' : 'recall-miss';
    }

    return { primaryQuery, rankedDepth: rankedFiles.length, coreRanks,
        recallAt5, recallAt10, recallAt20, mrr, precisionAt5, f1At5, diagnosis };
}

function extractText(result: any): string {
    return result?.content?.[0]?.text ?? '';
}

function fileMatchesInText(text: string, gtFile: string): boolean {
    const fullPath = gtFile;
    if (text.includes(fullPath)) return true;

    const basename = path.basename(gtFile);
    const dir = path.basename(path.dirname(gtFile));
    if (text.includes(`${dir}/${basename}`)) return true;

    const noExt = basename.replace(/\.(tsx?|js)$/, '');
    const dirSlash = `${dir}/${noExt}`;
    if (text.includes(dirSlash)) return true;

    return false;
}

function symbolMatchesInText(text: string, symbol: string): boolean {
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`);
    return re.test(text);
}

async function runTestCase(tc: TestCase): Promise<TestResult> {
    const allSearchText: string[] = [];
    const searched = new Set<string>();

    const doSearch = async (query: string) => {
        if (!query || searched.has(query)) return;
        searched.add(query);
        const result = await handleToolCall('search', { query });
        allSearchText.push(extractText(result));
    };

    for (const sym of (tc.keySymbols ?? [])) {
        await doSearch(sym);
    }

    for (const step of (tc.groundTruthPath ?? [])) {
        if (step.symbol) await doSearch(step.symbol);
    }

    for (const f of tc.groundTruthFiles) {
        const basename = path.basename(f).replace(/\.(tsx?|js)$/, '');
        if (basename !== 'index') {
            await doSearch(basename);
        } else {
            const parentDir = path.basename(path.dirname(f));
            if (parentDir) await doSearch(`${parentDir}/index`);
        }
    }

    const combinedSearch = allSearchText.join('\n');

    const searchFileFound: string[] = [];
    const searchFileMissed: string[] = [];
    for (const gtFile of tc.groundTruthFiles) {
        if (fileMatchesInText(combinedSearch, gtFile)) {
            searchFileFound.push(gtFile);
        } else {
            searchFileMissed.push(gtFile);
        }
    }

    const searchSymFound: string[] = [];
    const searchSymMissed: string[] = [];
    for (const sym of (tc.keySymbols ?? [])) {
        if (symbolMatchesInText(combinedSearch, sym)) {
            searchSymFound.push(sym);
        } else {
            searchSymMissed.push(sym);
        }
    }

    let graphResult: TestResult['graphReachability'] = null;
    let orderMetric: OrderMetric = { applicable: false, expectedChain: [], observedChain: [], lcs: 0, score: 1 };
    if (tc.groundTruthPath && tc.groundTruthPath.length > 1) {
        const allGraphText: string[] = [];
        const downText: string[] = [];   // forward traversals only — used for chain-order scoring
        const graphed = new Set<string>();

        const doGraph = async (sym: string, dir: 'up' | 'down', depth = 5) => {
            const key = `${sym}:${dir}`;
            if (graphed.has(key)) return;
            graphed.add(key);
            const res = await handleToolCall('graph', { query: sym, direction: dir, depth });
            const txt = extractText(res);
            allGraphText.push(txt);
            if (dir === 'down') downText.push(txt);
        };

        const entrySymbol = tc.groundTruthPath[0].symbol;
        if (entrySymbol) await doGraph(entrySymbol, 'down');

        const lastSymbol = tc.groundTruthPath[tc.groundTruthPath.length - 1].symbol;
        if (lastSymbol && lastSymbol !== entrySymbol) await doGraph(lastSymbol, 'up');

        const midIdx = Math.floor(tc.groundTruthPath.length / 2);
        const midSymbol = tc.groundTruthPath[midIdx].symbol;
        if (midSymbol && midSymbol !== entrySymbol && midSymbol !== lastSymbol) {
            await doGraph(midSymbol, 'down', 4);
        }

        for (const step of tc.groundTruthPath) {
            if (step.symbol && !graphed.has(`${step.symbol}:down`) && !graphed.has(`${step.symbol}:up`)) {
                await doGraph(step.symbol, 'down', 3);
            }
        }

        const combinedGraph = allGraphText.join('\n');
        const graphFound: string[] = [];
        const graphMissed: string[] = [];
        for (const step of tc.groundTruthPath) {
            if (!step.symbol) continue;
            if (symbolMatchesInText(combinedGraph, step.symbol)) {
                graphFound.push(step.symbol);
            } else {
                graphMissed.push(step.symbol);
            }
        }
        const total = graphFound.length + graphMissed.length;
        graphResult = {
            found: graphFound,
            missed: graphMissed,
            rate: total > 0 ? graphFound.length / total : 1,
        };

        // Chain order (LCS) — only for questions flagged `ordered`. Partial credit, report-only.
        if (tc.ordered) {
            const expectedChain = tc.groundTruthPath.map(s => s.symbol).filter(Boolean);
            const orderSrc = downText.join('\n') || combinedGraph;
            const observedChain = expectedChain
                .map(sym => ({ sym, idx: firstSymbolIndex(orderSrc, sym) }))
                .filter(x => x.idx >= 0)
                .sort((a, b) => a.idx - b.idx)
                .map(x => x.sym);
            const lcs = lcsLength(expectedChain, observedChain);
            orderMetric = {
                applicable: expectedChain.length > 1,
                expectedChain,
                observedChain,
                lcs,
                score: expectedChain.length ? lcs / expectedChain.length : 1,
            };
        }
    }

    const fileRate = tc.groundTruthFiles.length > 0
        ? searchFileFound.length / tc.groundTruthFiles.length : 1;
    const symTotal = (tc.keySymbols ?? []).length;
    const symRate = symTotal > 0 ? searchSymFound.length / symTotal : 1;
    const graphRate = graphResult?.rate ?? 1;

    const retrieval = computeRetrievalMetrics(tc);

    // SANITY (substring): "if you already know every symbol name, can the index find the files?"
    // This is near-100% by construction and must NOT be the headline gate — it masks real quality.
    const sanityPass = fileRate >= 0.95 && symRate >= 0.8 && graphRate >= 0.5;
    // RETRIEVAL (honest): a SINGLE realistic query must locate the subsystem — at least a third of
    // its core files surfaced within the top 10. This is what actually drives agent answer quality.
    const retrievalPass = retrieval.diagnosis === 'n/a' || retrieval.recallAt10 >= 0.3;
    const pass = sanityPass && retrievalPass;

    return {
        id: tc.id,
        question: tc.question,
        subsystem: tc.subsystem,
        searchFileRecall: {
            found: searchFileFound,
            missed: searchFileMissed,
            rate: fileRate,
        },
        searchSymbolRecall: {
            found: searchSymFound,
            missed: searchSymMissed,
            rate: symRate,
        },
        graphReachability: graphResult,
        order: orderMetric,
        retrieval,
        sanityPass,
        retrievalPass,
        pass,
    };
}

function formatReport(results: TestResult[]): string {
    const lines: string[] = [];
    const passed = results.filter(r => r.pass).length;
    const total = results.length;

    const sanityPassed = results.filter(r => r.sanityPass).length;
    const retrievalPassed = results.filter(r => r.retrievalPass).length;

    lines.push(`# Layer 1 — Tool Eval Report`);
    lines.push(`\n${new Date().toLocaleString('en-US')}\n`);
    lines.push(`## Summary: ${passed}/${total} passed\n`);
    lines.push(`> Gate = **sanity** (substring recall, near-100% by construction — a floor, not a score) `);
    lines.push(`> **AND retrieval** (a single realistic query surfaces ≥30% of core files in top-10 — the honest bar).\n`);
    lines.push(`| Gate | Pass |`);
    lines.push(`|---|---:|`);
    lines.push(`| Sanity (substring recall) | ${sanityPassed}/${total} |`);
    lines.push(`| **Retrieval (single-query R@10 ≥ 0.3)** | **${retrievalPassed}/${total}** |`);
    lines.push(`| Combined | ${passed}/${total} |\n`);

    const avgFileRecall = results.reduce((s, r) => s + r.searchFileRecall.rate, 0) / total;
    const avgSymRecall = results.reduce((s, r) => s + r.searchSymbolRecall.rate, 0) / total;
    const graphResults = results.filter(r => r.graphReachability);
    const avgGraphReach = graphResults.length > 0
        ? graphResults.reduce((s, r) => s + r.graphReachability!.rate, 0) / graphResults.length : 0;

    const avgPrec5 = results.reduce((s, r) => s + r.retrieval.precisionAt5, 0) / total;
    const avgRec5 = results.reduce((s, r) => s + r.retrieval.recallAt5, 0) / total;
    const avgRec10 = results.reduce((s, r) => s + r.retrieval.recallAt10, 0) / total;
    const avgRec20 = results.reduce((s, r) => s + r.retrieval.recallAt20, 0) / total;
    const avgMrr = results.reduce((s, r) => s + r.retrieval.mrr, 0) / total;
    const avgF1 = results.reduce((s, r) => s + r.retrieval.f1At5, 0) / total;

    const orderedAgg = results.filter(r => r.order.applicable);
    const avgOrder = orderedAgg.length
        ? orderedAgg.reduce((s, r) => s + r.order.score, 0) / orderedAgg.length : null;

    lines.push(`| Metric | Average |`);
    lines.push(`|--------|---------|`);
    lines.push(`| File recall (search, substring) | ${(avgFileRecall * 100).toFixed(1)}% |`);
    lines.push(`| Symbol recall (search, substring) | ${(avgSymRecall * 100).toFixed(1)}% |`);
    lines.push(`| Graph reachability | ${(avgGraphReach * 100).toFixed(1)}% |`);
    lines.push(`| **Precision@5** (primary query) | ${(avgPrec5 * 100).toFixed(1)}% |`);
    lines.push(`| **Recall@5 / @10 / @20** | ${(avgRec5 * 100).toFixed(1)}% / ${(avgRec10 * 100).toFixed(1)}% / ${(avgRec20 * 100).toFixed(1)}% |`);
    lines.push(`| **MRR** (core files) | ${avgMrr.toFixed(3)} |`);
    lines.push(`| **F1@5** | ${(avgF1 * 100).toFixed(1)}% |`);
    lines.push(`| **Chain order LCS** (ordered Qs: ${orderedAgg.length}, report-only) | ${avgOrder === null ? 'n/a' : (avgOrder * 100).toFixed(1) + '%'} |`);
    lines.push('');

    lines.push(`## Per-Testcase Results\n`);
    lines.push(`| # | ID | Subsystem | Files | Symbols | Graph | R@10 | Retr | Pass |`);
    lines.push(`|---|---|---|---|---|---|---:|---|---|`);

    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const fc = `${r.searchFileRecall.found.length}/${r.searchFileRecall.found.length + r.searchFileRecall.missed.length}`;
        const sc = `${r.searchSymbolRecall.found.length}/${r.searchSymbolRecall.found.length + r.searchSymbolRecall.missed.length}`;
        const gc = r.graphReachability
            ? `${r.graphReachability.found.length}/${r.graphReachability.found.length + r.graphReachability.missed.length}`
            : '-';
        const r10 = `${(r.retrieval.recallAt10 * 100).toFixed(0)}%`;
        const retr = r.retrievalPass ? '✅' : '❌';
        const status = r.pass ? 'PASS' : '**FAIL**';
        lines.push(`| ${i + 1} | ${r.id} | ${r.subsystem} | ${fc} | ${sc} | ${gc} | ${r10} | ${retr} | ${status} |`);
    }

    // Ranking quality per testcase + search-truncation diagnosis
    lines.push(`## Retrieval Ranking (primary query → search top-50)\n`);
    lines.push(`| # | ID | Query | P@5 | R@5 | R@10 | R@20 | MRR | Diagnosis |`);
    lines.push(`|---|---|---|----:|----:|----:|----:|----:|---|`);
    for (let i = 0; i < results.length; i++) {
        const m = results[i].retrieval;
        lines.push(`| ${i + 1} | ${results[i].id} | \`${m.primaryQuery}\` | ${(m.precisionAt5 * 100).toFixed(0)}% | ${(m.recallAt5 * 100).toFixed(0)}% | ${(m.recallAt10 * 100).toFixed(0)}% | ${(m.recallAt20 * 100).toFixed(0)}% | ${m.mrr.toFixed(2)} | ${m.diagnosis} |`);
    }
    lines.push('');
    const diagCount = new Map<string, number>();
    for (const r of results) diagCount.set(r.retrieval.diagnosis, (diagCount.get(r.retrieval.diagnosis) ?? 0) + 1);
    lines.push(`### Truncation diagnosis summary`);
    lines.push(`| Diagnosis | Count | Action |`);
    lines.push(`|-----------|------:|--------|`);
    const actions: Record<string, string> = {
        'ok': 'core files in top-5 — no change',
        'ranked-low': 'in top-50 but >5 → improve ranking / re-rank (not just bigger top-k)',
        'recall-miss': 'absent from top-50 → fix matching (threshold / split / hints)',
        'mixed': 'both ranking + matching issues',
        'n/a': 'no core files / no query',
    };
    for (const [d, c] of diagCount) lines.push(`| ${d} | ${c} | ${actions[d] ?? ''} |`);
    lines.push('');

    // Chain order (LCS) — ordered questions only. Report-only: NOT part of the pass gate.
    if (orderedAgg.length > 0) {
        lines.push(`## Chain Order (LCS — ordered questions only, report-only, not a pass gate)\n`);
        lines.push(`| # | ID | Chain | LCS | Order | Observed order |`);
        lines.push(`|---|---|----:|----:|----:|---|`);
        for (let i = 0; i < results.length; i++) {
            const r = results[i];
            if (!r.order.applicable) continue;
            const o = r.order;
            const obs = o.observedChain.join(' → ') || '(none surfaced)';
            lines.push(`| ${i + 1} | ${r.id} | ${o.expectedChain.length} | ${o.lcs} | ${(o.score * 100).toFixed(0)}% | ${obs} |`);
        }
        lines.push('');
    }

    const failures = results.filter(r => !r.pass);
    if (failures.length > 0) {
        lines.push(`\n## Failures\n`);
        for (const r of failures) {
            lines.push(`### ${r.id} — ${r.subsystem}\n`);
            lines.push(`**Q:** ${r.question}\n`);

            if (r.searchFileRecall.missed.length > 0) {
                lines.push(`**Missed files (search):**`);
                for (const f of r.searchFileRecall.missed) lines.push(`- \`${f}\``);
                lines.push('');
            }
            if (r.searchSymbolRecall.missed.length > 0) {
                lines.push(`**Missed symbols (search):**`);
                for (const s of r.searchSymbolRecall.missed) lines.push(`- \`${s}\``);
                lines.push('');
            }
            if (r.graphReachability && r.graphReachability.missed.length > 0) {
                lines.push(`**Unreachable via graph(down):**`);
                for (const s of r.graphReachability.missed) lines.push(`- \`${s}\``);
                lines.push('');
            }
        }
    }

    return lines.join('\n');
}

async function main() {
    console.error('Loading index...');
    await ensureIndex();
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));

    const filter = process.argv.find(a => a.startsWith('--filter='));
    const filterVal = filter?.split('=')[1]?.toLowerCase();
    const selected = filterVal
        ? testcases.filter(t => t.id.toLowerCase().includes(filterVal) || t.subsystem.toLowerCase().includes(filterVal))
        : testcases;

    console.error(`Running ${selected.length} test cases...\n`);

    const results: TestResult[] = [];
    for (const tc of selected) {
        process.stderr.write(`  ${tc.id}... `);
        const result = await runTestCase(tc);
        console.error(result.pass ? 'PASS' : 'FAIL');
        results.push(result);
    }

    const report = formatReport(results);

    const logsDir = path.join(__dirname, '..', '..', 'logs');
    fs.mkdirSync(logsDir, { recursive: true });
    const reportPath = path.join(logsDir, 'eval-2-mcp-tools.md');
    fs.writeFileSync(reportPath, report, 'utf-8');

    console.error(`\nReport: ${reportPath}`);

    const passed = results.filter(r => r.pass).length;
    console.log(`\n${passed}/${results.length} passed`);

    if (passed < results.length) process.exitCode = 1;
}

main().catch(e => {
    console.error('Fatal:', e);
    process.exit(2);
});
