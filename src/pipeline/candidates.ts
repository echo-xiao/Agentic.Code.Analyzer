// Step 2b-2d: expand every candidate chain, drop the ones that carry nothing new, and spend the
// quota on what is left.
//
// This replaces "build until MAX_CHAINS, then expand". Deciding the quota before expansion meant
// judging chains by their seed alone, and a chain's redundancy is not visible from its seed:
// measured over 34 questions, 385 candidates contained 61 exact duplicates and another 26 whose
// major set was wholly contained in a bigger chain's -- 23% of the slots, on questions where the
// quota was the binding constraint (10 of 34 hit it).
import { MAX_CHAINS } from './entry.js';
import { buildChainSkeletonByDef } from './skeleton-defs.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { Pool } from './entry.js';
import type { Chain, ChainSkeleton, SkeletonNode } from './types.js';

export interface Candidate {
    chain: Chain;
    skeleton: ChainSkeleton;
    majors: Set<string>;             // "symbol@file" of every major node, the unit of redundancy
}

// A seed names a symbol in a file, but the definition's qualified name can be longer than the
// symbol — `ChatAPI.flows.sendMessage` for a method, `outer.inner` for a nested function. Prefer
// an exact id, then the shortest qualified name in that file, which is the outermost declaration.
function findEntryDef(symbol: string, file: string): string {
    const exact = `${file}#${symbol}`;
    if (GLOBAL_INDEX.defs.has(exact)) return exact;
    const inFile = (GLOBAL_INDEX.byName.get(symbol) ?? []).filter(id => id.startsWith(`${file}#`));
    if (inFile.length > 0) return inFile.sort((a, b) => a.length - b.length)[0];
    return (GLOBAL_INDEX.byName.get(symbol) ?? [])[0] ?? exact;
}

export function majorsOf(skeleton: ChainSkeleton): Set<string> {
    const acc = new Set<string>();
    const walk = (n: SkeletonNode) => {
        if (n.kind === 'major') acc.add(`${n.symbol}@${n.file}`);
        n.children.forEach(walk);
    };
    skeleton.roots.forEach(walk);
    return acc;
}

// Containment, not similarity. "B's majors are all in A" means B adds nothing, which is a fact
// about the two trees; "B overlaps A by 80%" needs a threshold nobody can justify, and a partly
// overlapping chain really does carry something new. Equal sets keep the earlier chain.
//
// Note what survives this: a small chain that is NOT contained in a bigger one is, by definition,
// reachable from nowhere else -- which is why the leftovers are never ranked by tree size. The
// chains that touch ground-truth core files are mostly 1-4 majors (new-20's five core chains are
// 1,1,1,2,3 against a largest tree of 9; claude-02's only core chain is 4 against 35).
function isRedundant(i: number, cands: Candidate[], dropped: Set<number>): boolean {
    const B = cands[i].majors;
    if (B.size === 0) return false;                       // nothing to compare; let the quota decide
    for (let j = 0; j < cands.length; j++) {
        if (j === i || dropped.has(j)) continue;
        const A = cands[j].majors;
        if (A.size === 0) continue;
        if (A.size < B.size) continue;
        if (A.size === B.size && j > i) continue;         // equal sets: the earlier one wins
        let contained = true;
        for (const m of B) if (!A.has(m)) { contained = false; break; }
        if (contained) return true;
    }
    return false;
}

// Quota order: every pool is guaranteed its best chain, then the rest compete on lexical score.
//
// The floor exists because pools are not interchangeable and the leading pool can starve the
// others -- new-09's four core chains all sit in pools 2, 3 and 4, and plain pool order spends the
// quota on pool 1. It is deliberately 1, the smallest number that means "at least appears".
//
// Global comparison is legitimate here: lexicalScore reads only the symbol name and the question,
// never the pool, so a score from one pool means the same thing as a score from another.
function spendQuota(cands: Candidate[], quota: number): Candidate[] {
    const byPool = new Map<string, Candidate[]>();
    for (const c of cands) {
        if (!byPool.has(c.chain.pageId)) byPool.set(c.chain.pageId, []);
        byPool.get(c.chain.pageId)!.push(c);
    }
    const rank = (a: Candidate, b: Candidate) =>
        b.chain.score - a.chain.score || b.majors.size - a.majors.size;
    for (const v of byPool.values()) v.sort(rank);

    const floor = [...byPool.values()].map(v => v[0]).filter(Boolean);
    const floorSet = new Set(floor);
    const rest = cands.filter(c => !floorSet.has(c)).sort(rank);
    return [...floor, ...rest].slice(0, quota);
}

export function buildCandidates(
    chains: Chain[],
    pools: Pool[],
    question: string,
    quota = MAX_CHAINS,
): { kept: Candidate[]; expanded: number; droppedRedundant: number } {
    // The seed is still chosen by name — that is chain entry's job and the one place a name has
    // to become something. From here on the walk is by definition, so the seed's (symbol, file)
    // pair is turned into the id of the definition it names.
    const cands: Candidate[] = chains.map(chain => {
        const entryDefId = `${chain.seed.file}#${chain.seed.symbol}`;
        const skeleton = buildChainSkeletonByDef(
            chain,
            GLOBAL_INDEX.defs.has(entryDefId) ? entryDefId : findEntryDef(chain.seed.symbol, chain.seed.file),
            {}, question, chain.prose || undefined,
        );
        return { chain, skeleton, majors: majorsOf(skeleton) };
    });

    // Resolved against the ORIGINAL set, not incrementally: dropping B because it sits inside A
    // must not then let C survive merely because A was already gone.
    const dropped = new Set<number>();
    for (let i = 0; i < cands.length; i++) if (isRedundant(i, cands, new Set())) dropped.add(i);
    const live = cands.filter((_, i) => !dropped.has(i));

    // Chain ids must stay 1..n and contiguous -- node ids ("3f") are built from them, and the
    // select call answers with those numbers.
    const kept = spendQuota(live, quota).map((c, i) => {
        const chain = { ...c.chain, id: i + 1 };
        return { ...c, chain, skeleton: { ...c.skeleton, chain } };
    });
    return { kept, expanded: cands.length, droppedRedundant: dropped.size };
}
