#!/usr/bin/env npx tsx
// Orchestrator: route -> pools/entries -> skeleton -> read -> answer. Fixed 2 LLM calls per
// question; a 6s pause between questions keeps a 2-call question inside Gemini free-tier RPM.
//
// No path-selection call (removed 2026-08-06): it was measurably inert -- the deterministic
// backfill re-added every major node the model had skipped, so a question where it checked 1 of
// 40 nodes and one where it checked 14 produced an identical answer prompt. The skeleton text
// goes into the answer prompt instead, so the model can narrate the whole path including the
// pass-through, boundary and dispatch nodes that have no body at all.
import '../eval/utils/load-env.js';   // side effect: .env -> process.env, before GeminiClient reads the key
import * as fs from 'fs';
import * as path from 'path';
import { readShards, readDispatch, loadGlobalIndex } from '../indexer/graph-store.js';
import { route } from './routing.js';
import { buildChains, buildPools, pickSeeds } from './entry.js';
import { loadAllSections, type WikiSubsection } from '../deepwiki/sections.js';
import { renderSkeletons, resetSkeletonCaches } from './skeleton.js';
import { buildCandidates } from './candidates.js';
import { selectChains } from './select.js';
import { packMaterials } from './reading.js';
import { generateAnswer } from './answer.js';
import { renderReport, nextReportPath, type RunRow } from './report.js';
import { GeminiClient, type LlmClient } from './llm.js';
import { askDeepWiki } from '../deepwiki/ask.js';
import { loadTestcases } from '../eval/utils/load-testcases.js';
import { TESTCASES_PATH } from '../eval/utils/truth-io.js';
import type { QuestionTrace, SkeletonNode, PoolStat } from './types.js';

interface Deps {
    llm: LlmClient;
    sections: WikiSubsection[];
    deepwikiFn: (qid: string, q: string) => Promise<string>;
    readFn?: (n: SkeletonNode) => { text: string; startLine: number; endLine: number } | null;
    budgetTokens?: number;
}

export async function runQuestion(qid: string, question: string, deps: Deps): Promise<RunRow> {
    const { llm, sections } = deps;
    const routed = await route(question, sections, llm);                           // call 1
    const routingPromptTokens = llm.promptTokensEst;                               // snapshot right after call 1

    const pools = buildPools(routed, sections);
    const poolStats: PoolStat[] = pools.map(p => ({
        pageId: p.pageId,
        sections: p.sections.map(s => s.path),
        fileCount: p.files.length,
        symbolCount: p.symbols.length,
        seeds: pickSeeds(p, question).map(s => s.symbol),
    }));

    // Every seed becomes a candidate; the quota is spent after expansion, once the redundant
    // chains are visible. Expansion is in-memory graph work -- 3s for all 34 questions.
    resetSkeletonCaches();
    const { kept: candidates, expanded, droppedRedundant } =
        buildCandidates(buildChains(routed, sections, question), pools, question);
    const chains = candidates.map(c => c.chain);
    const skeletons = candidates.map(c => c.skeleton);
    const { text: skeletonText, nodeById, blocks } = renderSkeletons(skeletons);

    const selection = chains.length > 0
        ? await selectChains(question, skeletonText, chains, llm)                   // call 2
        : { kept: [] as number[], dropped: [] as number[], raw: '' };
    const keptSet = new Set(selection.kept);
    const keptChains = chains.filter(c => keptSet.has(c.id));

    const chainProse = new Map<number, string>();
    for (const c of keptChains) if (c.prose) chainProse.set(c.id, c.prose);

    // Round-robin across the surviving chains, roots first. Chain sizes are wildly uneven
    // (measured 35 / 81 / 81 / 4 / 6 / 7 / 30 / 13 majors), so reading in render order lets the
    // first big chain eat the ceiling -- that run left six chains with only their root read,
    // including a 7-node chain that would have fitted whole.
    const perChain = new Map<number, string[]>();
    for (const id of nodeById.keys()) {
        const chainId = Number(id.match(/^\d+/)![0]);
        if (!keptSet.has(chainId)) continue;
        if (!perChain.has(chainId)) perChain.set(chainId, []);
        perChain.get(chainId)!.push(id);
    }
    const readIds: string[] = [];
    for (let round = 0; ; round++) {
        let added = false;
        for (const ids of perChain.values()) {
            if (round < ids.length) { readIds.push(ids[round]); added = true; }
        }
        if (!added) break;
    }

    const { materials, unread, cappedOut } = packMaterials(readIds, nodeById, deps.budgetTokens ?? 24000, { readFn: deps.readFn });
    // Only the surviving chains reach the answer -- a dropped chain leaves no trace in the prompt.
    const keptSkeleton = keptChains.map(c => blocks.get(c.id) ?? '').filter(Boolean).join('\n\n');
    const { answer, citations } = await generateAnswer(question, keptChains, materials, llm, chainProse, keptSkeleton); // call 3

    const filesOf = (roots: SkeletonNode[]): string[] => {
        const acc: string[] = [];
        const walk = (n: SkeletonNode) => { if (n.file) acc.push(n.file); n.children.forEach(walk); };
        roots.forEach(walk);
        return acc;
    };
    const trace: QuestionTrace = {
        qid, question,
        routing: { sections: routed, promptTokens: routingPromptTokens },
        pools: poolStats,
        candidates: { expanded, droppedRedundant, kept: chains.length },
        chains: chains.map(c => {
            const sk = skeletons.find(s => s.chain.id === c.id);
            return { id: c.id, label: c.label, mode: sk?.mode ?? 'flow', seed: c.seed, tied: c.tied, rerooted: sk?.rerooted };
        }),
        skeleton: skeletons.map(s => ({
            chainId: s.chain.id, majorCount: s.majorCount,
            nodeCount: s.nodeCount, maxDepthReached: s.maxDepthReached,
            files: filesOf(s.roots),
        })),
        skeletonText, readIds,
        selection: { kept: selection.kept, dropped: selection.dropped },
        reading: {
            materials: materials.map(m => ({ nodeId: m.nodeId, file: m.file, startLine: m.startLine, endLine: m.endLine, tokens: m.tokens })),
            unread, cappedOut,
        },
        llm: { calls: llm.calls, promptTokensEst: llm.promptTokensEst },
    };

    let deepwiki: string;
    try {
        deepwiki = await deps.deepwikiFn(qid, question);
    } catch (e) {
        // The DeepWiki baseline is a comparison column, not load-bearing: a transport/parse
        // failure there must never sink the whole question and the LLM calls already spent on it.
        deepwiki = `(DeepWiki baseline unavailable: ${e instanceof Error ? e.message : String(e)})`;
    }
    return { trace, answer, citations, deepwiki };
}

const isMain = process.argv[1]?.endsWith('run.ts');
if (isMain) {
    const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.split('=')[1];
    const filter = arg('filter') ?? '';
    const limit = Number(arg('limit') ?? Infinity);
    const budget = arg('budget') !== undefined ? Number(arg('budget')) : undefined;
    // The graph shards are the index; `npm run build:graph` regenerates them. Loading is a read
    // of 71 files, so there is no cache to warm and no per-file mapping to re-parse.
    const shards = readShards();
    if (shards.length === 0) {
        console.error('No graph shards found. Run: npx tsx -e "import(\'./src/indexer/build-graph.js\').then(m => m.buildGraph({ progress: true }))"');
        process.exit(1);
    }
    loadGlobalIndex(shards, readDispatch());
    console.error(`index: ${shards.length} shards`);
    const sections = loadAllSections();
    const cases = loadTestcases(TESTCASES_PATH).flat.filter(c => c.id.includes(filter)).slice(0, limit);
    const rows: RunRow[] = [];
    for (const c of cases) {
        const llm = new GeminiClient();                                           // fresh counter per question
        console.error(`[${c.id}] ...`);
        try {
            rows.push(await runQuestion(c.id, c.question, { llm, sections, deepwikiFn: askDeepWiki, budgetTokens: budget }));
        } catch (e) { console.error(`[${c.id}] FAILED: ${e}`); }
        await new Promise(r => setTimeout(r, 6000));
    }
    const runsDir = 'runs';
    fs.mkdirSync(runsDir, { recursive: true });
    const file = nextReportPath(runsDir);
    fs.writeFileSync(file, renderReport(rows));
    console.error(`Wrote ${file} (${rows.length} questions)`);
}
