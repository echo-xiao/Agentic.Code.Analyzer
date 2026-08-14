// One report per benchmark run. The answer no longer carries the trace (its output
// format is unconstrained now), so everything diagnostic lives here: the skeleton the model
// actually saw, plus a one-line-per-stage recap.
import * as fs from 'fs';
import * as path from 'path';
import type { QuestionTrace } from './types.js';

const REPORT_RE = /^(\d{4}-\d{2}-\d{2})-report-v(\d+)\.md$/;

// Reports are flat files named `<date>-report-v<n>.md`. The version is a single global counter,
// not per-day, so the filenames sort into run order even when several runs land on one date --
// that ordering is the whole point: a report only means something next to the one before it.
export function nextReportPath(runsDir: string, now = new Date()): string {
    const existing = fs.existsSync(runsDir) ? fs.readdirSync(runsDir) : [];
    const maxVersion = existing.reduce((max, name) => {
        const m = name.match(REPORT_RE);
        return m ? Math.max(max, Number(m[2])) : max;
    }, 0);
    const date = now.toISOString().slice(0, 10);
    return path.join(runsDir, `${date}-report-v${maxVersion + 1}.md`);
}

export interface RunRow {
    trace: QuestionTrace;
    answer: string;
    citations: { valid: string[]; fabricated: string[] };
    deepwiki: string;
}

const MODE_LABEL = { flow: 'flow down', impact: 'impact up' } as const;

// Prefix every major node line with whether its body actually reached the materials -- the
// difference between "the skeleton found it" and "the model got to read it" is the single most
// useful thing to see when a chain underperforms.
function renderSkeletonBlock(t: QuestionTrace): string[] {
    const read = new Set(t.reading.materials.map(m => m.nodeId));
    const out: string[] = ['<details><summary>Call skeleton (verbatim, as the model saw it; a leading tick means the body reached the materials)</summary>', '', '```'];
    for (const line of t.skeletonText.split('\n')) {
        const m = line.match(/\[(\d+[a-z]+)\]/);
        out.push(m ? (read.has(m[1]) ? `✓ ${line}` : `· ${line}`) : `  ${line}`);
    }
    out.push('```', '', '</details>');
    return out;
}

function renderRecap(t: QuestionTrace): string[] {
    const L: string[] = [];
    L.push(`- routing: ${t.routing.sections.map(s => s.path).join(', ') || '(none)'}`);

    L.push(`- pools: ${t.pools.map(p =>
        `${p.pageId} (${p.sections.length} sections / ${p.fileCount} files / ${p.symbolCount} symbols)`).join(', ') || '(none)'}`);
    const empty = t.pools.filter(p => p.seeds.length === 0);
    if (empty.length) L.push(`      no lexical hit inside ${empty.map(p => p.pageId).join(', ')}, so no chain was built there`);

    L.push(`- seeds: ${t.chains.map(c =>
        `chain ${c.id} ${c.seed.symbol}@${c.seed.file}${c.tied ? ' [tied]' : ''}${c.rerooted ? ` [rerooted upward ${c.rerooted.from} -> ${c.rerooted.to}]` : ''}`
    ).join(', ') || '(no chains)'}`);

    L.push(`- chains: ${t.chains.map(c => `chain ${c.id} ${c.label} (${MODE_LABEL[c.mode]})`).join(', ') || '(none)'}`);

    const cd = t.candidates;
    L.push(`- dedupe: ${cd.expanded} candidates, ${cd.droppedRedundant} dropped as duplicate or subset, ${cd.expanded - cd.droppedRedundant} net, ${cd.kept} taken`);

    L.push(`- skeleton: ${t.skeleton.map(s =>
        `chain ${s.chainId} ${s.majorCount} major / ${s.nodeCount} total / depth ${s.maxDepthReached}`).join(', ') || '(none)'}`);

    L.push(`- selection: kept ${t.selection.kept.join(', ') || '(none)'}${t.selection.dropped.length ? `; dropped ${t.selection.dropped.join(', ')}` : ''}`);

    const tokens = t.reading.materials.reduce((a, m) => a + m.tokens, 0);
    const capped = t.reading.cappedOut ? `; hit the cap, ${t.reading.unread.length} left unread` : '';
    L.push(`- reading: ${t.readIds.length} major nodes in the skeleton, ${t.reading.materials.length} materials read, ${tokens} tokens${capped}`);
    return L;
}

export function renderReport(rows: RunRow[]): string {
    const L: string[] = ['# Benchmark Run Report', '', '| question | chains | major nodes | materials | tokens | LLM calls | manual score |', '|---|---|---|---|---|---|---|'];
    for (const r of rows) {
        const t = r.trace;
        const tokens = t.reading.materials.reduce((a, m) => a + m.tokens, 0);
        L.push(`| ${t.qid} | ${t.chains.length} | ${t.readIds.length} | ${t.reading.materials.length} | ${tokens} | ${t.llm.calls} |  |`);
    }
    const total = rows.reduce((a, r) => a + r.trace.llm.calls, 0);
    L.push('', `Total: ${rows.length} questions, ${total} LLM calls.`, '');

    for (const r of rows) {
        L.push(`## ${r.trace.qid}: ${r.trace.question}`, '', '### This system', '', r.answer, '');
        if (r.citations.fabricated.length) {
            L.push(`> Citation check (diagnostic, not enforced): these citations fall outside the materials -- ${r.citations.fabricated.join(', ')}`, '');
        }
        L.push('### Reference answer', '', r.deepwiki, '', '### Stage recap', '');
        L.push(...renderRecap(r.trace));
        L.push('');
        L.push(...renderSkeletonBlock(r.trace));
        L.push('');
    }
    return L.join('\n');
}
