#!/usr/bin/env npx tsx
/**
 * eval-3 — How good is the agent?  Gemini + MCP (self-loop) vs Claude reference answers.
 *
 * Three deterministic columns (no key, reproducible):
 *   1. HARD coverage   — % of files Claude cites that Gemini also mentions.
 *   2. SYNTHESIS split — of the core spine, what the tools surfaced (retrieval) vs what the agent
 *      actually wrote (synthesis). Isolates the real bottleneck: files retrieved-but-not-written.
 *   3. AUTO verdict    — PASS/PARTIAL/FAIL from a FROZEN rubric (file-overlap based).
 *
 * The SEMANTIC verdict ("did the agent get the mechanism right, regardless of which files") is NOT
 * computed here — the file-overlap rubric can't see "right mechanism, different files". It is judged
 * by Claude in-conversation and written to logs/reports/eval-3-mcp-agent-vs-claude-semantic-judgment.md.
 * Run: npm run eval:3
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases } from './utils/load-testcases.js';
import { fileMatches, symMatch, readSection, extractCitedFiles } from './utils/eval-util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const LOGS = path.join(PROJECT_ROOT, 'logs');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const D_CLAUDE = path.join(LOGS, 'answers-claude');

// ── FROZEN RUBRIC (do not tune per run) ──────────────────────────────────────────────────────
// Verdict is a pure function of measurable signals. Hard FAIL conditions take precedence.
// Coverage is measured over the curated CORE SPINE (tc.core), not Claude's full citation list:
// Claude over-cites (every leaf file), so gating on it false-negatives conceptually-correct answers
// that name the pattern + entry points. Core-spine coverage is the must-find set the Q actually tests.
const RUBRIC = {
    FAIL_IF_NO_ANSWER: true,        // empty answer or one that begins with "ERROR"
    FAIL_IF_COV_BELOW: 0.25,        // missed ~the entire must-find spine
    PASS_COV_AT_LEAST: 0.50,        // recovered at least half of the spine …
    PASS_REQUIRES_ENDPOINTS: true,  // … AND both the chain entry and terminal symbols are present
};
type Verdict = 'PASS' | 'PARTIAL' | 'FAIL';

function verdictFor(opts: {
    answer: string; cov: number; covLabel: string; entryOk: boolean; terminalOk: boolean; hasEndpoints: boolean;
}): { verdict: Verdict; reason: string } {
    const { answer, cov, covLabel, entryOk, terminalOk, hasEndpoints } = opts;
    const covPct = Math.round(cov * 100);
    const noAnswer = !answer.trim() || /^ERROR\b/.test(answer.trim());
    if (RUBRIC.FAIL_IF_NO_ANSWER && noAnswer) return { verdict: 'FAIL', reason: 'no answer / ERROR' };
    if (cov < RUBRIC.FAIL_IF_COV_BELOW) return { verdict: 'FAIL', reason: `${covLabel} ${covPct}% < ${RUBRIC.FAIL_IF_COV_BELOW * 100}% (spine missed)` };

    const endpointsOk = !RUBRIC.PASS_REQUIRES_ENDPOINTS || !hasEndpoints || (entryOk && terminalOk);
    const ep = hasEndpoints ? ` entry${entryOk ? '✓' : '✗'} term${terminalOk ? '✓' : '✗'}` : '';
    if (cov >= RUBRIC.PASS_COV_AT_LEAST && endpointsOk) {
        return { verdict: 'PASS', reason: `${covLabel} ${covPct}%${ep}` };
    }
    return { verdict: 'PARTIAL', reason: `${covLabel} ${covPct}%${ep}` };
}

function main() {
    // Delete the stale report up front so a mid-run crash leaves no misleading old file.
    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.mkdirSync(path.join(LOGS, 'data'), { recursive: true });
    fs.rmSync(path.join(LOGS, 'reports', 'eval-3-mcp-agent-vs-claude.md'), { force: true });
    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const rows = testcases.map(tc => {
        const mcpFile = path.join(D_MCP, `${tc.id}.md`);
        const a2 = readSection(mcpFile, '## Gemini Answer', ['## Tool Calls']);
        // Guard: readSection falls back to the whole file when the marker is absent. Older answers
        // (generated before seen-files tracking) lack this section → treat as "no seen data".
        const SEEN_MARKER = '## Files Seen In Tool Results';
        const hasSeen = (() => { try { return fs.readFileSync(mcpFile, 'utf-8').includes(SEEN_MARKER); } catch { return false; } })();
        const seenText = hasSeen ? readSection(mcpFile, SEEN_MARKER, []) : '';
        const seenFiles = extractCitedFiles(seenText);
        const ac = readSection(path.join(D_CLAUDE, `${tc.id}.md`), '## Answer', ['\n## Key', '\n## Metrics']);

        // Block 1 — hard coverage vs Claude's cited files.
        const claudeFiles = extractCitedFiles(ac);
        const missed = claudeFiles.filter(f => !fileMatches(a2, f));
        const hardCov = claudeFiles.length ? (claudeFiles.length - missed.length) / claudeFiles.length : 0;

        // Block 2 — synthesis split over the ground-truth core spine.
        const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
        const retrieved = core.filter(f => seenFiles.some(s => fileMatches(s, f)) || fileMatches(seenText, f));
        const written = core.filter(f => fileMatches(a2, f));
        const writtenOfRetrieved = retrieved.filter(f => fileMatches(a2, f));
        const retrievalRecall = core.length ? retrieved.length / core.length : 1;       // tools surfaced it
        const synthRecall = retrieved.length ? writtenOfRetrieved.length / retrieved.length : 1; // …and agent wrote it
        const droppedBySynth = retrieved.filter(f => !fileMatches(a2, f)); // retrieved but not written
        const coreCov = core.length ? written.length / core.length : hardCov; // fraction of must-find spine written

        // Block 3 — frozen-rubric verdict (gated on core-spine coverage; Claude-file hard is reported-only).
        const pathSyms = (tc.groundTruthPath ?? []).map(s => s.symbol).filter(Boolean);
        const hasEndpoints = pathSyms.length >= 2;
        const entryOk = hasEndpoints ? symMatch(a2, pathSyms[0]) : true;
        const terminalOk = hasEndpoints ? symMatch(a2, pathSyms[pathSyms.length - 1]) : true;
        const gateCov = core.length ? coreCov : hardCov;
        const { verdict, reason } = verdictFor({ answer: a2, cov: gateCov, covLabel: core.length ? 'core cov' : 'hard cov', entryOk, terminalOk, hasEndpoints });

        // Separate infra failures (empty / "ERROR …" e.g. Gemini 503) from capability failures so the
        // funnel report can exclude them from retrieval/synthesis averages instead of scoring them 0.
        const errored = !a2.trim() || /^ERROR\b/.test(a2.trim());

        return {
            id: tc.id, type: tc.questionType, claudeFiles: claudeFiles.length,
            hit: claudeFiles.length - missed.length, missed, hardCov,
            coreN: core.length, coreWritten: written.length, coreCov, seen: hasSeen, errored,
            retrievalRecall, synthRecall, droppedBySynth, verdict, reason,
        };
    });

    const n = rows.length;
    const withC = rows.filter(r => r.claudeFiles > 0);
    const avgHard = withC.length ? withC.reduce((s, r) => s + r.hardCov, 0) / withC.length : 0;
    // Synthesis split only meaningful for answers that recorded seen-files (post gen:mcp re-run).
    const seenRows = rows.filter(r => r.seen && r.coreN > 0);
    const avgRetr = seenRows.length ? seenRows.reduce((s, r) => s + r.retrievalRecall, 0) / seenRows.length : 0;
    const synthApplicable = seenRows.filter(r => r.retrievalRecall > 0);
    const avgSynth = synthApplicable.length ? synthApplicable.reduce((s, r) => s + r.synthRecall, 0) / synthApplicable.length : 0;
    const totalDropped = rows.reduce((s, r) => s + r.droppedBySynth.length, 0);
    const counts = { PASS: 0, PARTIAL: 0, FAIL: 0 } as Record<Verdict, number>;
    rows.forEach(r => counts[r.verdict]++);

    const L: string[] = [];
    L.push(`# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases | deterministic (no key, frozen rubric)\n`);
    L.push(`**Hard: Gemini covers ${(avgHard * 100).toFixed(0)}% of Claude's cited files (avg).**\n`);
    if (seenRows.length) {
        L.push(`**Synthesis split (core spine): retrieval-recall ${(avgRetr * 100).toFixed(0)}% (tools surfaced it) → synthesis-recall ${(avgSynth * 100).toFixed(0)}% (agent then wrote it).**\n`);
    } else {
        L.push(`**Synthesis split: n/a — re-run \`npm run gen:mcp\` to record per-answer "Files Seen In Tool Results", then this splits coverage into retrieval vs synthesis.**\n`);
    }
    L.push(`**Auto verdict (frozen rubric): PASS ${counts.PASS} / PARTIAL ${counts.PARTIAL} / FAIL ${counts.FAIL}.**\n`);
    L.push(`> Frozen rubric — verdict is a pure function of measured signals (reproducible, no hand-judging).`);
    L.push(`> Gated on **core-spine coverage** (must-find files), not Claude's full citation list (Claude over-cites):`);
    L.push(`> - **FAIL** if the answer is empty/ERROR, **or** core coverage < ${RUBRIC.FAIL_IF_COV_BELOW * 100}% (the spine was missed).`);
    L.push(`> - **PASS** if core coverage ≥ ${RUBRIC.PASS_COV_AT_LEAST * 100}% **and** both chain endpoints (entry + terminal symbol) appear.`);
    L.push(`> - **PARTIAL** otherwise.\n`);
    L.push(`> Semantic verdict (right mechanism, different files) is judged by Claude in \`logs/reports/eval-3-mcp-agent-vs-claude-semantic-judgment.md\`.\n`);
    L.push(`| # | id | type | core cov (gate) | hard (Claude files) | retr→synth (core) | auto verdict |`);
    L.push(`|---|---|---|---:|---:|---|---|`);
    rows.forEach((r, i) => {
        const coreCol = r.coreN ? `${r.coreWritten}/${r.coreN} (${Math.round(r.coreCov * 100)}%)` : '-';
        const hard = r.claudeFiles ? `${r.hit}/${r.claudeFiles} (${Math.round(r.hardCov * 100)}%)` : '-';
        const synth = (r.seen && r.coreN)
            ? `${(r.retrievalRecall * 100).toFixed(0)}% → ${(r.synthRecall * 100).toFixed(0)}%`
            : '-';
        L.push(`| ${i + 1} | ${r.id} | ${r.type} | ${coreCol} | ${hard} | ${synth} | ${r.verdict} |`);
    });
    L.push('');

    fs.writeFileSync(path.join(LOGS, 'reports', 'eval-3-mcp-agent-vs-claude.md'), L.join('\n'), 'utf-8');
    // Machine-readable sidecar for the unified funnel report (src/eval/report.ts). Join key = id.
    fs.writeFileSync(path.join(LOGS, 'data', 'eval-3-data.json'), JSON.stringify(rows.map(r => ({
        id: r.id, type: r.type, hardCov: r.hardCov,
        coreN: r.coreN, coreWritten: r.coreWritten, coreCov: r.coreCov, seen: r.seen, errored: r.errored,
        retrievalRecall: r.retrievalRecall, synthRecall: r.synthRecall, dropped: r.droppedBySynth.length,
        verdict: r.verdict,
    }))), 'utf-8');
    console.error(`Wrote logs/eval-3-mcp-agent-vs-claude.md`);
    const synthStr = seenRows.length ? `retr ${(avgRetr * 100).toFixed(0)}%→synth ${(avgSynth * 100).toFixed(0)}%` : 'synth n/a (re-run gen:mcp)';
    console.log(`eval-3: hard ${(avgHard * 100).toFixed(0)}% | ${synthStr} | auto PASS ${counts.PASS}/PARTIAL ${counts.PARTIAL}/FAIL ${counts.FAIL}`);
}

main();
