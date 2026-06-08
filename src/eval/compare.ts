#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const LOGS = path.join(PROJECT_ROOT, 'logs');

interface TestCase {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    groundTruthFiles: string[];
    keySymbols?: string[];
}

function readMd(dir: string, id: string): string {
    const p = path.join(LOGS, dir, `${id}.md`);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : '';
}

function extractPaths(text: string): string[] {
    const re = /(?:apps\/meteor|packages|ee\/packages)\/[^\s`"',)>\]|]+\.(?:ts|tsx|js)/g;
    return [...new Set(text.match(re) ?? [])];
}

function extractTokens(text: string): number {
    const m = text.match(/Tokens?\s*\|\s*([\d,]+)/i) ?? text.match(/Total tokens?\s*\|\s*([\d,]+)/i);
    return m ? parseInt(m[1].replace(/,/g, '')) : 0;
}

function matchFile(text: string, gtFile: string): boolean {
    if (text.includes(gtFile)) return true;
    const basename = path.basename(gtFile);
    const dir = path.basename(path.dirname(gtFile));
    if (text.includes(`${dir}/${basename}`)) return true;
    const noExt = basename.replace(/\.(tsx?|js)$/, '');
    if (text.includes(`${dir}/${noExt}`)) return true;
    return false;
}

function matchSymbol(text: string, sym: string): boolean {
    const escaped = sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`).test(text);
}

function truncate(text: string, maxLines: number): string {
    const lines = text.split('\n');
    if (lines.length <= maxLines) return text;
    return lines.slice(0, maxLines).join('\n') + `\n\n... (${lines.length - maxLines} more lines)`;
}

function main() {
    const testcases: TestCase[] = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'testcases.json'), 'utf-8')
    );

    const L: string[] = [];

    L.push(`# Answer Comparison Report`);
    L.push(`\n${new Date().toLocaleString('en-US')} | ${testcases.length} testcases\n`);

    // --- Overall summary table ---
    const stats = { baseline: { fileHits: 0, symHits: 0, tokens: 0, paths: 0 },
                    gemini:   { fileHits: 0, symHits: 0, tokens: 0, paths: 0 },
                    benchmark:{ fileHits: 0, symHits: 0, tokens: 0, paths: 0 } };
    let totalGtFiles = 0;
    let totalGtSyms = 0;

    const rows: Array<{
        id: string; sub: string; diff: string;
        bFiles: number; gFiles: number; kFiles: number; gtFiles: number;
        bSyms: number; gSyms: number; kSyms: number; gtSyms: number;
        bTokens: number; gTokens: number;
        bPaths: number; gPaths: number; kPaths: number;
    }> = [];

    for (const tc of testcases) {
        const baseline  = readMd('baseline', tc.id);
        const gemini    = readMd('gemini-answers', tc.id);
        const benchmark = readMd('benchmark', tc.id);
        const gt = tc.groundTruthFiles;
        const syms = tc.keySymbols ?? [];

        const bFileHits = gt.filter(f => matchFile(baseline, f)).length;
        const gFileHits = gt.filter(f => matchFile(gemini, f)).length;
        const kFileHits = gt.filter(f => matchFile(benchmark, f)).length;

        const bSymHits = syms.filter(s => matchSymbol(baseline, s)).length;
        const gSymHits = syms.filter(s => matchSymbol(gemini, s)).length;
        const kSymHits = syms.filter(s => matchSymbol(benchmark, s)).length;

        const bTokens = extractTokens(baseline);
        const gTokens = extractTokens(gemini);

        const bPaths = extractPaths(baseline).length;
        const gPaths = extractPaths(gemini).length;
        const kPaths = extractPaths(benchmark).length;

        stats.baseline.fileHits += bFileHits;
        stats.gemini.fileHits += gFileHits;
        stats.benchmark.fileHits += kFileHits;
        stats.baseline.symHits += bSymHits;
        stats.gemini.symHits += gSymHits;
        stats.benchmark.symHits += kSymHits;
        stats.baseline.tokens += bTokens;
        stats.gemini.tokens += gTokens;
        stats.baseline.paths += bPaths;
        stats.gemini.paths += gPaths;
        stats.benchmark.paths += kPaths;
        totalGtFiles += gt.length;
        totalGtSyms += syms.length;

        rows.push({
            id: tc.id, sub: tc.subsystem, diff: tc.difficulty,
            bFiles: bFileHits, gFiles: gFileHits, kFiles: kFileHits, gtFiles: gt.length,
            bSyms: bSymHits, gSyms: gSymHits, kSyms: kSymHits, gtSyms: syms.length,
            bTokens, gTokens,
            bPaths, gPaths, kPaths,
        });
    }

    // --- Summary ---
    L.push(`## Overall\n`);
    L.push(`| Metric | Baseline (no tools) | Gemini + Tools | Benchmark (Claude) |`);
    L.push(`|--------|--------------------:|---------------:|-------------------:|`);
    L.push(`| Ground truth files hit | ${stats.baseline.fileHits}/${totalGtFiles} (${(stats.baseline.fileHits/totalGtFiles*100).toFixed(0)}%) | ${stats.gemini.fileHits}/${totalGtFiles} (${(stats.gemini.fileHits/totalGtFiles*100).toFixed(0)}%) | ${stats.benchmark.fileHits}/${totalGtFiles} (${(stats.benchmark.fileHits/totalGtFiles*100).toFixed(0)}%) |`);
    L.push(`| Key symbols hit | ${stats.baseline.symHits}/${totalGtSyms} (${(stats.baseline.symHits/totalGtSyms*100).toFixed(0)}%) | ${stats.gemini.symHits}/${totalGtSyms} (${(stats.gemini.symHits/totalGtSyms*100).toFixed(0)}%) | ${stats.benchmark.symHits}/${totalGtSyms} (${(stats.benchmark.symHits/totalGtSyms*100).toFixed(0)}%) |`);
    L.push(`| Real file paths in answer | ${stats.baseline.paths} | ${stats.gemini.paths} | ${stats.benchmark.paths} |`);
    L.push(`| Total tokens | ${stats.baseline.tokens.toLocaleString()} | ${stats.gemini.tokens.toLocaleString()} | N/A |`);
    L.push(`| Avg tokens / question | ${Math.round(stats.baseline.tokens/testcases.length).toLocaleString()} | ${Math.round(stats.gemini.tokens/testcases.length).toLocaleString()} | N/A |`);
    L.push('');

    // --- Per-testcase summary table ---
    L.push(`## Per-Testcase Comparison\n`);
    L.push(`| # | ID | Subsystem | GT Files | Baseline | Gemini+Tools | Benchmark | Winner |`);
    L.push(`|---|---|---|---:|---:|---:|---:|---|`);
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const scores = [
            { name: 'B', s: r.bFiles + r.bSyms * 0.5 },
            { name: 'G', s: r.gFiles + r.gSyms * 0.5 },
            { name: 'K', s: r.kFiles + r.kSyms * 0.5 },
        ].sort((a, b) => b.s - a.s);
        const winner = scores[0].s === scores[1].s ? 'Tie' :
            scores[0].name === 'K' ? 'Benchmark' :
            scores[0].name === 'G' ? '**Gemini+Tools**' : 'Baseline';
        L.push(`| ${i+1} | ${r.id} | ${r.sub} | ${r.gtFiles} | ${r.bFiles}/${r.gtFiles} (${r.bSyms}s) | ${r.gFiles}/${r.gtFiles} (${r.gSyms}s) | ${r.kFiles}/${r.gtFiles} (${r.kSyms}s) | ${winner} |`);
    }
    L.push('');

    // --- Detailed per-testcase ---
    L.push(`## Detailed Comparison\n`);
    for (let i = 0; i < testcases.length; i++) {
        const tc = testcases[i];
        const r = rows[i];
        const baseline  = readMd('baseline', tc.id);
        const gemini    = readMd('gemini-answers', tc.id);
        const benchmark = readMd('benchmark', tc.id);

        L.push(`### #${i+1} ${tc.id} — ${tc.subsystem} (${tc.difficulty})\n`);
        L.push(`**Q:** ${tc.question}\n`);

        // File hits detail
        L.push(`| Expected File | Baseline | Gemini | Benchmark |`);
        L.push(`|---------------|:--------:|:------:|:---------:|`);
        for (const f of tc.groundTruthFiles) {
            const b = matchFile(baseline, f) ? 'Y' : '-';
            const g = matchFile(gemini, f)   ? 'Y' : '-';
            const k = matchFile(benchmark, f)? 'Y' : '-';
            L.push(`| \`${f}\` | ${b} | ${g} | ${k} |`);
        }
        L.push('');

        if ((tc.keySymbols ?? []).length > 0) {
            L.push(`| Key Symbol | Baseline | Gemini | Benchmark |`);
            L.push(`|------------|:--------:|:------:|:---------:|`);
            for (const s of tc.keySymbols!) {
                const b = matchSymbol(baseline, s) ? 'Y' : '-';
                const g = matchSymbol(gemini, s)   ? 'Y' : '-';
                const k = matchSymbol(benchmark, s)? 'Y' : '-';
                L.push(`| \`${s}\` | ${b} | ${g} | ${k} |`);
            }
            L.push('');
        }

        L.push(`| Metric | Baseline | Gemini+Tools | Benchmark |`);
        L.push(`|--------|----------|-------------|-----------|`);
        L.push(`| Tokens | ${r.bTokens.toLocaleString()} | ${r.gTokens.toLocaleString()} | N/A |`);
        L.push(`| Real paths extracted | ${r.bPaths} | ${r.gPaths} | ${r.kPaths} |`);
        L.push('');

        // Truncated answers
        const extractAnswer = (md: string): string => {
            const m = md.match(/## (?:Answer|Gemini Answer|Baseline Answer[^]*?)\n\n([\s\S]*?)(?=\n## |\n---|\Z)/);
            return m ? m[1].trim() : md.slice(0, 500);
        };

        L.push(`<details><summary>Baseline answer</summary>\n\n${truncate(extractAnswer(baseline), 30)}\n</details>\n`);
        L.push(`<details><summary>Gemini + Tools answer</summary>\n\n${truncate(extractAnswer(gemini), 30)}\n</details>\n`);
        L.push(`<details><summary>Benchmark answer</summary>\n\n${truncate(extractAnswer(benchmark), 30)}\n</details>\n`);

        L.push(`---\n`);
    }

    const outPath = path.join(LOGS, 'comparison-report.md');
    fs.writeFileSync(outPath, L.join('\n'), 'utf-8');
    console.log(`Report: ${outPath}`);
    console.log(`${testcases.length} testcases compared.`);
}

main();
