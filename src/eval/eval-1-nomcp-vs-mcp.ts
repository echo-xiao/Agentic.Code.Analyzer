#!/usr/bin/env npx tsx
/**
 * eval-1 — Does MCP help?  Gemini without MCP vs Gemini + MCP (self-loop).
 * Deterministic (no Gemini/key): coverage of {core files ∪ key symbols} + token cost.
 * Semantic "is the MCP answer actually better" is added by Claude into the report.
 * Run: npm run eval:1
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases } from './utils/load-testcases.js';
import { coverage, readSection, tokensOf } from './utils/eval-util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const LOGS = path.join(PROJECT_ROOT, 'logs');
const D_NOMCP = path.join(LOGS, 'answers-gemini-nomcp');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');

function main() {
    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const rows = testcases.map(tc => {
        const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
        const syms = tc.keySymbols ?? [];
        const a0 = readSection(path.join(D_NOMCP, `${tc.id}.md`), '## Baseline Answer (no tools)', ['## Metrics']);
        const a2 = readSection(path.join(D_MCP, `${tc.id}.md`), '## Gemini Answer', ['## Tool Calls']);
        return {
            id: tc.id, type: tc.questionType,
            cov0: coverage(a0, core, syms),
            cov2: coverage(a2, core, syms),
            tok0: tokensOf(path.join(D_NOMCP, `${tc.id}.md`), /\| Tokens \| ([\d,]+) \|/),
            tok2: tokensOf(path.join(D_MCP, `${tc.id}.md`), /## Tool Calls \(\d+ calls, ([\d,]+) tokens\)/),
        };
    });
    const n = rows.length;
    const avg = (f: (r: typeof rows[0]) => number) => rows.reduce((s, r) => s + f(r), 0) / n;
    const avgCov0 = avg(r => r.cov0), avgCov2 = avg(r => r.cov2);
    const avgTok0 = avg(r => r.tok0), avgTok2 = avg(r => r.tok2);
    const improved = rows.filter(r => r.cov2 > r.cov0).length;

    const L: string[] = [];
    L.push(`# eval-1 — Does MCP help?  (Gemini no-MCP vs Gemini + MCP)\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases | deterministic, no Gemini/key\n`);
    L.push(`Coverage = answer mentions of {core files ∪ key symbols}. Semantic comparison (is the MCP answer better) is added by Claude.\n`);
    L.push(`| Metric | no MCP | with MCP | change |`);
    L.push(`|---|---:|---:|---|`);
    L.push(`| Avg coverage | ${(avgCov0 * 100).toFixed(1)}% | ${(avgCov2 * 100).toFixed(1)}% | ${avgCov2 >= avgCov0 ? '+' : ''}${((avgCov2 - avgCov0) * 100).toFixed(1)} pts |`);
    L.push(`| Questions improved | — | — | ${improved}/${n} |`);
    L.push(`| Avg tokens / question | ${Math.round(avgTok0).toLocaleString()} | ${Math.round(avgTok2).toLocaleString()} | ×${(avgTok2 / Math.max(1, avgTok0)).toFixed(1)} |`);
    L.push('');
    L.push(`> MCP lifts coverage ${(avgCov0 * 100).toFixed(0)}% → ${(avgCov2 * 100).toFixed(0)}% at ×${(avgTok2 / Math.max(1, avgTok0)).toFixed(1)} token cost.\n`);
    L.push(`| # | id | type | cov no-MCP | cov MCP | Δ | tok no-MCP | tok MCP |`);
    L.push(`|---|---|---|---:|---:|---:|---:|---:|`);
    rows.forEach((r, i) => {
        const d = (r.cov2 - r.cov0) * 100;
        L.push(`| ${i + 1} | ${r.id} | ${r.type} | ${(r.cov0 * 100).toFixed(0)}% | ${(r.cov2 * 100).toFixed(0)}% | ${d >= 0 ? '+' : ''}${d.toFixed(0)} | ${r.tok0.toLocaleString()} | ${r.tok2.toLocaleString()} |`);
    });
    L.push('');

    fs.writeFileSync(path.join(LOGS, 'eval-1-nomcp-vs-mcp-agent.md'), L.join('\n'), 'utf-8');
    console.error(`Wrote logs/eval-1-nomcp-vs-mcp-agent.md`);
    console.log(`eval-1: coverage ${(avgCov0 * 100).toFixed(0)}%→${(avgCov2 * 100).toFixed(0)}%, token ×${(avgTok2 / Math.max(1, avgTok0)).toFixed(1)}, ${improved}/${n} improved`);
}

main();
