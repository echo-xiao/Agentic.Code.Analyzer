#!/usr/bin/env npx tsx
/**
 * eval-3 — How good is the agent?  Gemini + MCP (self-loop) vs Claude reference answers.
 * Deterministic HARD part (no key): % of files Claude cites that Gemini also mentions, + which it missed.
 * SEMANTIC part (verdict PASS/PARTIAL/FAIL): filled by Claude — with ANTHROPIC_API_KEY an API judge
 * could do it; without a key, Claude reads each pair and writes the verdict column into this report.
 * Run: npm run eval:3
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases } from './utils/load-testcases.js';
import { fileMatches, readSection, extractCitedFiles } from './utils/eval-util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const LOGS = path.join(PROJECT_ROOT, 'logs');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const D_CLAUDE = path.join(LOGS, 'answers-claude');

function main() {
    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const rows = testcases.map(tc => {
        const a2 = readSection(path.join(D_MCP, `${tc.id}.md`), '## Gemini Answer', ['## Tool Calls']);
        const ac = readSection(path.join(D_CLAUDE, `${tc.id}.md`), '## Answer', ['\n## Key', '\n## Metrics']);
        const claudeFiles = extractCitedFiles(ac);
        const missed = claudeFiles.filter(f => !fileMatches(a2, f));
        return { id: tc.id, type: tc.questionType, claudeFiles: claudeFiles.length, hit: claudeFiles.length - missed.length, missed };
    });
    const n = rows.length;
    const withC = rows.filter(r => r.claudeFiles > 0);
    const avgVsClaude = withC.length ? withC.reduce((s, r) => s + r.hit / r.claudeFiles, 0) / withC.length : 0;

    const L: string[] = [];
    L.push(`# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases\n`);
    L.push(`**Hard** = % of files Claude cites that Gemini also mentions. **Semantic** (verdict) = Claude's per-pair judgment.\n`);
    L.push(`**Hard: Gemini covers ${(avgVsClaude * 100).toFixed(0)}% of Claude's cited files (avg).**\n`);
    L.push(`> Semantic verdict column: filled by Claude (reads each Gemini vs Claude answer). With ANTHROPIC_API_KEY an API judge can fill it automatically.\n`);
    L.push(`| # | id | type | hard (Claude files) | missed Claude files | verdict | reason (Gemini vs Claude) |`);
    L.push(`|---|---|---|---:|---|---|---|`);
    rows.forEach((r, i) => {
        const hard = r.claudeFiles ? `${r.hit}/${r.claudeFiles} (${Math.round(r.hit / r.claudeFiles * 100)}%)` : '-';
        const miss = r.missed.length ? r.missed.map(m => path.basename(m)).slice(0, 6).join(', ') + (r.missed.length > 6 ? ` +${r.missed.length - 6}` : '') : '—';
        L.push(`| ${i + 1} | ${r.id} | ${r.type} | ${hard} | ${miss} | _TBD_ | _Claude to fill_ |`);
    });
    L.push('');

    fs.writeFileSync(path.join(LOGS, 'eval-3-mcp-agent-vs-claude.md'), L.join('\n'), 'utf-8');
    console.error(`Wrote logs/eval-3-mcp-agent-vs-claude.md (hard part; semantic verdict column = _TBD_ for Claude to fill)`);
    console.log(`eval-3: Gemini covers ${(avgVsClaude * 100).toFixed(0)}% of Claude's cited files`);
}

main();
