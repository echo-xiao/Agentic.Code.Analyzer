#!/usr/bin/env npx tsx
/**
 * Track B — agy (real) harness.
 *
 * agy is interactive, so a human runs each group as one session and records:
 *   1) each question's answer text
 *   2) the cumulative token usage from `/context` after the last question
 *   3) (optional) quota used, from a quota monitor
 *
 * This script does NOT drive agy. It reads the recorded transcripts, runs the
 * shared Claude judge on each answer, and reports the headline metric:
 * "can a related-question session be answered within one free-tier budget?"
 *
 * Usage:
 *   npx tsx src/eval/agy-session-eval.ts --init     # write blank transcript templates
 *   ANTHROPIC_API_KEY=... npx tsx src/eval/agy-session-eval.ts   # score recorded transcripts
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases, type TestCase } from './load-testcases.js';
import { runJudge, type JudgeScore } from './judge.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const SESS_DIR = path.join(PROJECT_ROOT, 'logs', 'agy-sessions');

// Free-tier budget line (override with FREE_TIER_BUDGET). Default = flash 1M context window.
const FREE_TIER_BUDGET = Number(process.env.FREE_TIER_BUDGET ?? 1_000_000);

interface Transcript {
    groupId: string;
    contextTokensFinal: number;     // from agy `/context` after the last question
    quotaUsed?: number;             // optional, from a quota monitor
    answers: { id: string; answer: string }[];
}

function transcriptPath(groupId: string) { return path.join(SESS_DIR, `${groupId}.json`); }

function initTemplates() {
    const { groups } = loadTestcases(path.join(__dirname, 'testcases.json'));
    fs.mkdirSync(SESS_DIR, { recursive: true });
    for (const g of groups) {
        const p = transcriptPath(g.id);
        if (fs.existsSync(p)) { console.error(`skip (exists): ${p}`); continue; }
        const tpl: Transcript = {
            groupId: g.id,
            contextTokensFinal: 0,
            quotaUsed: 0,
            answers: g.questions.map(q => ({ id: q.id, answer: '' })),
        };
        fs.writeFileSync(p, JSON.stringify(tpl, null, 2), 'utf-8');
        console.error(`wrote template: ${p}  (${g.questions.length} questions, in order)`);
    }
    console.error(`\nRun each group as one agy session, paste answers, fill contextTokensFinal from /context, then re-run without --init.`);
}

async function main() {
    if (process.argv.includes('--init')) { initTemplates(); return; }

    const { groups, flat } = loadTestcases(path.join(__dirname, 'testcases.json'));
    const byId = new Map<string, TestCase>(flat.map(t => [t.id, t]));

    if (!fs.existsSync(SESS_DIR)) {
        console.error(`No transcripts at ${SESS_DIR}. Run with --init first, run agy per group, then re-run.`);
        process.exit(1);
    }

    const L: string[] = [];
    L.push(`# Track B (agy) — Free-tier Session Report\n`);
    L.push(`${new Date().toLocaleString('en-US')} | budget: ${FREE_TIER_BUDGET.toLocaleString()} tokens\n`);
    L.push(`| Session | Questions | Judge PASS | Context tokens | ≤ budget? | Completed |`);
    L.push(`|---------|----------:|-----------:|---------------:|:---------:|:---------:|`);

    const details: string[] = [];
    let judgeAvailable = !!process.env.ANTHROPIC_API_KEY;

    for (const g of groups) {
        const p = transcriptPath(g.id);
        if (!fs.existsSync(p)) { console.error(`missing transcript: ${g.id} (skip)`); continue; }
        const t: Transcript = JSON.parse(fs.readFileSync(p, 'utf-8'));
        const answered = t.answers.filter(a => a.answer.trim().length > 0);

        details.push(`\n## ${g.id}\n`);
        let pass = 0;
        for (const a of t.answers) {
            const tc = byId.get(a.id);
            if (!tc) { details.push(`- \`${a.id}\` — not found in testcases`); continue; }
            let j: JudgeScore | null = null;
            if (a.answer.trim()) j = await runJudge(tc, a.answer);
            if (j?.verdict === 'PASS') pass++;
            const v = j ? j.verdict : (a.answer.trim() ? 'unjudged' : 'no-answer');
            details.push(`- \`${a.id}\` — ${v}${j ? ` (overall ${j.overall.toFixed(2)})` : ''}: ${tc.question}`);
            if (j?.reasoning) details.push(`  - ${j.reasoning}`);
        }

        const withinBudget = t.contextTokensFinal > 0 && t.contextTokensFinal <= FREE_TIER_BUDGET;
        const completed = withinBudget && answered.length === t.answers.length;
        L.push(`| ${g.id} | ${t.answers.length} | ${pass}/${t.answers.length} | ${t.contextTokensFinal.toLocaleString()} | ${t.contextTokensFinal > 0 ? (withinBudget ? 'YES' : 'NO') : '?'} | ${completed ? 'YES' : `NO (answered ${answered.length}/${t.answers.length})`} |`);
    }

    if (!judgeAvailable) L.push(`\n> Judge not run (ANTHROPIC_API_KEY unset) — verdicts show as "unjudged".`);
    L.push(`\n---`);
    L.push(details.join('\n'));

    fs.mkdirSync(path.join(PROJECT_ROOT, 'logs'), { recursive: true });
    const out = path.join(PROJECT_ROOT, 'logs', 'agy-session-eval.md');
    fs.writeFileSync(out, L.join('\n'), 'utf-8');
    console.error(`Report: ${out}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
