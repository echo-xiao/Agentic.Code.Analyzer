#!/usr/bin/env npx tsx
// Orchestrator: route -> retrieve -> skeleton -> select -> read -> answer, then
// attribution + report. Fixed 3 LLM calls per question; 6s pause between questions
// keeps a 3-call question inside Gemini free-tier RPM.
import * as fs from 'fs';
import * as path from 'path';
import { ensureIndex } from '../indexer/index.js';
import { route } from './routing.js';
import { retrieveSeeds, groupChains } from './entry.js';
import { loadSectionContent } from '../deepwiki/content.js';
import { buildChainSkeleton, renderSkeletons } from './skeleton.js';
import { selectPaths } from './paths.js';
import { packMaterials } from './reading.js';
import { generateAnswer } from './answer.js';
import { attribute } from './attribution.js';
import { renderReport, type RunRow } from './report.js';
import { GeminiClient, type LlmClient } from './llm.js';
import { askDeepWiki } from '../deepwiki/ask.js';
import { loadTestcases } from '../eval/utils/load-testcases.js';
import { loadTestcasesWithTruth, TESTCASES_PATH, CLAUDE_TRUTH_PATH } from '../eval/utils/truth-io.js';
import type { WikiOutline } from '../deepwiki/types.js';
import type { QuestionTrace, SkeletonNode } from './types.js';

interface Deps {
    llm: LlmClient; outline: WikiOutline; truthCore: string[];
    deepwikiFn: (qid: string, q: string) => Promise<string>;
    readFn?: (n: SkeletonNode) => { text: string; startLine: number; endLine: number } | null;
    budgetTokens?: number;
}

export async function runQuestion(qid: string, question: string, deps: Deps): Promise<RunRow> {
    const { llm, outline } = deps;
    const routed = await route(question, outline, llm);                           // call 1
    const routingPromptTokens = llm.promptTokensEst;                               // snapshot right after call 1
    const seeds = retrieveSeeds(question, routed, outline);

    // Full wiki prose for each routed section — feeds the entry-retrieval prose-mention bonus
    // (via groupChains) and the path/answer prompt background below. null when a section has no
    // contentPath (older outline snapshot) or its markdown file is missing; both are harmless,
    // just no bonus/background for that section.
    const sectionContent = new Map<string, string | null>();
    for (const r of routed) {
        const sec = outline.sections.find(s => s.id === r.sectionId);
        if (sec) sectionContent.set(r.sectionId, loadSectionContent(sec));
    }
    const chains = groupChains(seeds, routed, outline, question, sectionContent);
    const skeletons = chains.map(c => buildChainSkeleton(c));
    const { text: skeletonText, nodeById } = renderSkeletons(skeletons);
    // Chain label == sectionId for section-born chains (the fallback chain, if any, has a
    // file-path label that never matches a sectionId, so it naturally gets no prose entry).
    const chainProse = new Map<number, string>();
    for (const c of chains) {
        const content = sectionContent.get(c.label);
        if (content) chainProse.set(c.id, content);
    }
    const sel = await selectPaths(question, skeletonText, nodeById, chains, llm, chainProse); // call 2
    const { materials, evicted } = packMaterials(sel.selected, nodeById, chains, deps.budgetTokens ?? 24000, { readFn: deps.readFn });
    const { answer, fabricated } = await generateAnswer(question, chains, materials, llm, chainProse); // call 3

    const totalMass = chains.reduce((a, c) => a + c.rrfMass, 0) || 1;
    const filesOf = (roots: SkeletonNode[]): string[] => {
        const acc: string[] = []; const walk = (n: SkeletonNode) => { acc.push(n.file); n.children.forEach(walk); };
        roots.forEach(walk); return acc;
    };
    const evictedFiles = evicted
        .map(id => nodeById.get(id)?.file)
        .filter((f): f is string => f !== undefined);
    const trace: QuestionTrace = {
        qid, question,
        routing: { sections: routed, promptTokens: routingPromptTokens },
        seeds,
        chains: chains.map(c => ({ id: c.id, label: c.label, budgetShare: c.rrfMass / totalMass })),
        skeleton: skeletons.map(s => ({ chainId: s.chain.id, majorCount: s.majorCount, nodeCount: filesOf(s.roots).length, files: filesOf(s.roots) })),
        pathsRaw: sel.raw, selectedIds: sel.selected, droppedIds: sel.dropped,
        reading: { materials: materials.map(m => ({ nodeId: m.nodeId, file: m.file, startLine: m.startLine, endLine: m.endLine, tokens: m.tokens })), evicted, evictedFiles },
        llm: { calls: llm.calls, promptTokensEst: llm.promptTokensEst },
    };
    let deepwiki: string;
    try {
        deepwiki = await deps.deepwikiFn(qid, question);
    } catch (e) {
        // The DeepWiki baseline is a comparison column, not load-bearing: a transport/parse
        // failure there must never sink the whole question (and its own 3 LLM calls' worth
        // of work already done above).
        const message = e instanceof Error ? e.message : String(e);
        deepwiki = `(DeepWiki 对照获取失败：${message})`;
    }
    return { trace, answer, fabricated, deepwiki, loss: attribute(trace, deps.truthCore) };
}

const isMain = process.argv[1]?.endsWith('run.ts');
if (isMain) {
    const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.split('=')[1];
    const filter = arg('filter') ?? ''; const limit = Number(arg('limit') ?? Infinity);
    const budget = arg('budget') !== undefined ? Number(arg('budget')) : undefined;
    await ensureIndex();
    const outline: WikiOutline = JSON.parse(fs.readFileSync('data/deepwiki/outline.json', 'utf8'));
    const { flat: truthFlat } = loadTestcasesWithTruth(TESTCASES_PATH, CLAUDE_TRUTH_PATH);
    const cases = loadTestcases(TESTCASES_PATH).flat.filter(c => c.id.includes(filter)).slice(0, limit);
    const rows: RunRow[] = [];
    for (const c of cases) {
        const llm = new GeminiClient();                                           // fresh counter per question
        const core: string[] = truthFlat.find(t => t.id === c.id)?.core ?? [];
        console.error(`[${c.id}] ...`);
        try {
            rows.push(await runQuestion(c.id, c.question, { llm, outline, truthCore: core, deepwikiFn: askDeepWiki, budgetTokens: budget }));
        } catch (e) { console.error(`[${c.id}] FAILED: ${e}`); }
        await new Promise(r => setTimeout(r, 6000));
    }
    const dir = path.join('runs', new Date().toISOString().replace(/[:.]/g, '-'));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'report.md'), renderReport(rows));
    console.error(`Wrote ${dir}/report.md (${rows.length} questions)`);
}
