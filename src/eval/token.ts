#!/usr/bin/env npx tsx
/**
 * token — is the graph worth its tokens?  Three-way coverage comparison:
 *   - no-MCP   : Gemini with no tools (baseline).
 *   - naive    : dumb keyword retrieval ONLY (no agent loop), given the SAME token budget as MCP.
 *   - MCP      : Gemini + plan/search/graph/details agent.
 * The naive column is the control: if MCP beats naive at an equal token budget, the lift comes from
 * the AGENT (choosing moves, following the trail), not just from spending more tokens. Naive is
 * deterministic (no LLM) and computed inline here — it needs the code index.
 * Run: npm run eval:token   (after gen --mode=nomcp and gen --mode=mcp)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';
import { coverage, readSection, tokensOf } from './utils/eval-util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const LOGS = path.join(PROJECT_ROOT, 'logs');
const D_NOMCP = path.join(LOGS, 'answers-gemini-nomcp');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const REPORT = path.join(LOGS, 'reports', 'token.md');

// ── Naive baseline (the FAIR control) ───────────────────────────────────────────────────────────
// A dumb keyword retriever: search + expand per question keyword (no agent loop, no move choice,
// no details). Its output is capped to the SAME SIZE as MCP's written answer (NOT MCP's total
// token spend) — so both are scored on an equal-length "answer" and naive can't win just by
// dumping a giant keyword blob. Coverage = "in the same space, does mechanical retrieval surface
// as many core files as the agent wrote".
const STOP = new Set(['the','a','an','is','are','how','what','where','does','do','in','on','of','to','and','from','for','with','rocket','chat','rocketchat','side','work','works','new','get','use','used','using']);

function queryTerms(question: string): string[] {
    const camel = question.match(/\b[a-z]+[A-Z][A-Za-z]+\b|\b[A-Z][a-z]+[A-Z][A-Za-z]+\b/g) ?? [];
    const words = (question.toLowerCase().match(/[a-z][a-z0-9]{3,}/g) ?? []).filter(w => !STOP.has(w));
    return Array.from(new Set([...camel, ...words.sort((a, b) => b.length - a.length)])).slice(0, 12);
}

async function naiveCoverage(tc: TestCase, answerChars: number, core: string[], syms: string[]): Promise<number> {
    const charBudget = Math.max(1, answerChars); // match the length of MCP's written answer
    const parts: string[] = [];
    let chars = 0;
    for (const q of queryTerms(tc.question)) {
        if (chars >= charBudget) break;
        for (const call of [
            () => handleToolCall('search', { query: q }),
            () => handleToolCall('graph', { query: q, move: 'expand', depth: 2 }),
        ]) {
            if (chars >= charBudget) break;
            const res = await call();
            const txt = res?.content?.[0]?.text ?? '';
            if (!txt) continue;
            parts.push(txt);
            chars += txt.length;
        }
    }
    const body = parts.join('\n').slice(0, charBudget);
    return coverage(body, core, syms);
}

async function main() {
    // Delete the stale report up front so a mid-run crash leaves no misleading old file.
    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.mkdirSync(path.join(LOGS, 'data'), { recursive: true });
    fs.rmSync(REPORT, { force: true });
    await ensureIndex();

    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const rows = [];
    for (const tc of testcases) {
        const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
        const syms = tc.keySymbols ?? [];
        const a0 = readSection(path.join(D_NOMCP, `${tc.id}.md`), '## Baseline Answer (no tools)', ['## Metrics']);
        const a2 = readSection(path.join(D_MCP, `${tc.id}.md`), '## Gemini Answer', ['## Tool Calls']);
        const tok0 = tokensOf(path.join(D_NOMCP, `${tc.id}.md`), /\| Tokens \| ([\d,]+) \|/);
        const tok2 = tokensOf(path.join(D_MCP, `${tc.id}.md`), /## Tool Calls \(\d+ calls, ([\d,]+) tokens\)/);
        rows.push({
            id: tc.id, type: tc.questionType,
            cov0: coverage(a0, core, syms),
            cov2: coverage(a2, core, syms),
            covN: await naiveCoverage(tc, a2.length, core, syms), // naive capped to MCP's answer length
            tok0, tok2,
        });
    }

    const n = rows.length;
    const avg = (f: (r: typeof rows[0]) => number) => rows.reduce((s, r) => s + f(r), 0) / n;
    const avgCov0 = avg(r => r.cov0), avgCovN = avg(r => r.covN), avgCov2 = avg(r => r.cov2);
    const avgTok0 = avg(r => r.tok0), avgTok2 = avg(r => r.tok2);
    const improved = rows.filter(r => r.cov2 > r.cov0).length;
    const graphGain = (avgCov2 - avgCovN) * 100; // MCP minus same-budget naive = the agent's contribution

    const L: string[] = [];
    L.push(`# token — is the graph worth its tokens?  (no-MCP vs naive@same-budget vs MCP)\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases | deterministic, no Gemini/key\n`);
    L.push(`Coverage = answer mentions of {core files ∪ key symbols}.\n`);
    L.push(`| Metric | no MCP | naive (same answer size) | with MCP |`);
    L.push(`|---|---:|---:|---:|`);
    L.push(`| Avg coverage | ${(avgCov0 * 100).toFixed(1)}% | ${(avgCovN * 100).toFixed(1)}% | ${(avgCov2 * 100).toFixed(1)}% |`);
    L.push(`| Avg tokens / question | ${Math.round(avgTok0).toLocaleString()} | ~${Math.round(avgTok2).toLocaleString()} | ${Math.round(avgTok2).toLocaleString()} |`);
    L.push(`| Questions improved (MCP > no-MCP) | — | — | ${improved}/${n} |`);
    L.push('');
    L.push(`| # | id | type | cov no-MCP | cov naive | cov MCP | MCP−naive | tok no-MCP | tok MCP |`);
    L.push(`|---|---|---|---:|---:|---:|---:|---:|---:|`);
    rows.forEach((r, i) => {
        const gain = (r.cov2 - r.covN) * 100;
        L.push(`| ${i + 1} | ${r.id} | ${r.type} | ${(r.cov0 * 100).toFixed(0)}% | ${(r.covN * 100).toFixed(0)}% | ${(r.cov2 * 100).toFixed(0)}% | ${gain >= 0 ? '+' : ''}${gain.toFixed(0)} | ${r.tok0.toLocaleString()} | ${r.tok2.toLocaleString()} |`);
    });
    L.push('');

    fs.writeFileSync(REPORT, L.join('\n'), 'utf-8');
    // Machine-readable sidecar for the unified report (src/eval/report.ts). Join key = id.
    fs.writeFileSync(path.join(LOGS, 'data', 'token-data.json'),
        JSON.stringify({ n, avgCov0, avgCovN, avgCov2, avgTok0, avgTok2, improved, graphGain, rows }), 'utf-8');
    console.error(`Wrote logs/reports/token.md`);
    console.log(`token: no-MCP ${(avgCov0 * 100).toFixed(0)}% | naive@budget ${(avgCovN * 100).toFixed(0)}% | MCP ${(avgCov2 * 100).toFixed(0)}% → agent adds ${graphGain >= 0 ? '+' : ''}${graphGain.toFixed(0)} pts`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
