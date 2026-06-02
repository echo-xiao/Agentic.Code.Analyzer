#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { OUTPUT_DIR } from '../config.js';
import { preWarmCache, initializeGlobalIndex, LocalDatabase } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { GLOBAL_INDEX } from '../indexer/state.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface TestCase {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    groundTruthFiles: string[];
    groundTruthPath?: Array<{ file: string; symbol: string }>;
    keySymbols?: string[];
}

interface TestResult {
    id: string;
    question: string;
    subsystem: string;
    searchFileRecall: { found: string[]; missed: string[]; rate: number };
    searchSymbolRecall: { found: string[]; missed: string[]; rate: number };
    graphReachability: { found: string[]; missed: string[]; rate: number } | null;
    pass: boolean;
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
    if (tc.groundTruthPath && tc.groundTruthPath.length > 1) {
        const allGraphText: string[] = [];
        const graphed = new Set<string>();

        const doGraph = async (sym: string, dir: 'up' | 'down', depth = 5) => {
            const key = `${sym}:${dir}`;
            if (graphed.has(key)) return;
            graphed.add(key);
            const res = await handleToolCall('graph', { query: sym, direction: dir, depth });
            allGraphText.push(extractText(res));
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
    }

    const fileRate = tc.groundTruthFiles.length > 0
        ? searchFileFound.length / tc.groundTruthFiles.length : 1;
    const symTotal = (tc.keySymbols ?? []).length;
    const symRate = symTotal > 0 ? searchSymFound.length / symTotal : 1;
    const graphRate = graphResult?.rate ?? 1;

    const pass = fileRate >= 0.95 && symRate >= 0.8 && graphRate >= 0.5;

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
        pass,
    };
}

function formatReport(results: TestResult[]): string {
    const lines: string[] = [];
    const passed = results.filter(r => r.pass).length;
    const total = results.length;

    lines.push(`# Layer 1 — Tool Eval Report`);
    lines.push(`\n${new Date().toLocaleString('en-US')}\n`);
    lines.push(`## Summary: ${passed}/${total} passed\n`);

    const avgFileRecall = results.reduce((s, r) => s + r.searchFileRecall.rate, 0) / total;
    const avgSymRecall = results.reduce((s, r) => s + r.searchSymbolRecall.rate, 0) / total;
    const graphResults = results.filter(r => r.graphReachability);
    const avgGraphReach = graphResults.length > 0
        ? graphResults.reduce((s, r) => s + r.graphReachability!.rate, 0) / graphResults.length : 0;

    lines.push(`| Metric | Average |`);
    lines.push(`|--------|---------|`);
    lines.push(`| File recall (search) | ${(avgFileRecall * 100).toFixed(1)}% |`);
    lines.push(`| Symbol recall (search) | ${(avgSymRecall * 100).toFixed(1)}% |`);
    lines.push(`| Graph reachability | ${(avgGraphReach * 100).toFixed(1)}% |`);
    lines.push('');

    lines.push(`## Per-Testcase Results\n`);
    lines.push(`| # | ID | Subsystem | Files | Symbols | Graph | Pass |`);
    lines.push(`|---|---|---|---|---|---|---|`);

    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const fc = `${r.searchFileRecall.found.length}/${r.searchFileRecall.found.length + r.searchFileRecall.missed.length}`;
        const sc = `${r.searchSymbolRecall.found.length}/${r.searchSymbolRecall.found.length + r.searchSymbolRecall.missed.length}`;
        const gc = r.graphReachability
            ? `${r.graphReachability.found.length}/${r.graphReachability.found.length + r.graphReachability.missed.length}`
            : '-';
        const status = r.pass ? 'PASS' : '**FAIL**';
        lines.push(`| ${i + 1} | ${r.id} | ${r.subsystem} | ${fc} | ${sc} | ${gc} | ${status} |`);
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
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const { updatedCount } = preWarmCache();
    const db = new LocalDatabase(OUTPUT_DIR);
    if (updatedCount > 0 || !db.loadIndex(GLOBAL_INDEX)) {
        initializeGlobalIndex();
        db.saveIndex(GLOBAL_INDEX);
    }

    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const testcases: TestCase[] = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'testcases.json'), 'utf-8')
    );

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
    const reportPath = path.join(logsDir, 'tool-eval.md');
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
