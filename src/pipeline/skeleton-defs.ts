// skeleton-defs.ts — chain skeletons built on definitions.
//
// Same output shape as the name-keyed builder it replaces, and considerably shorter, because the
// heuristics that file had all existed to compensate for one thing: a bare name carried every
// same-named symbol's edges. With edges that know both of their ends, they are not replaced by
// better heuristics — they are deleted.
//
//   resolveFile's four tiers   a node IS a definition; nothing needs to be located
//   anchorOf's regexes         the definition records its own line and endLine
//   boundary early-stop        cut 40.5% of unambiguous edges; real flows cross packages
//   upstream import evidence   dropped 77.3% of static upstream edges
//   visited by bare name       collided 400 expansion points across 69 of 311 chains
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import { fanIn, downstreamOf, upstreamOf, siblingsOf, isDispatchNode, type DefCandidate } from './traverse.js';
import type { Chain, ChainMode, ChainSkeleton, Direction, SkeletonNode } from './types.js';

export interface DefSkeletonOpts {
    maxDepth?: number;
    upstreamMaxDepth?: number;
    maxChildrenPerNode?: number;
    maxNodesPerChain?: number;
    hotFanIn?: number;
    upstreamWeight?: number;
    siblingMax?: number;
}

// Identical to the name-keyed builder's, deliberately. A regression run compares one variable at
// a time, and the first attempt at this file invented its own defaults — maxNodesPerChain 40
// against 200 — which capped every chain and showed up as a 47% drop in major nodes that had
// nothing to do with the graph.
const DEFAULTS: Required<DefSkeletonOpts> = {
    maxDepth: 6, upstreamMaxDepth: 3, maxChildrenPerNode: 8, maxNodesPerChain: 200,
    hotFanIn: 25, upstreamWeight: 0.7, siblingMax: 12,
};

// Same three tiers as before: a string-dispatch hop is the most informative, a type reference the
// least. Only the names changed with the edge kinds.
// `implements` sits with `call` rather than with `type`: arriving at an interface and stepping to
// its implementation is a real transfer of control, not a type reference.
const edgeWeight = (e: EdgeType): number =>
    e === 'registers' || e === 'dispatches' || e === 'handles' ? 1.0 : e === 'type' ? 0.1 : 0.6;

const tokensOf = (s: string): string[] =>
    s.split(/[^A-Za-z0-9]+/).flatMap(w => w.split(/(?=[A-Z])/)).filter(Boolean).map(w => w.toLowerCase());

function scoreOf(c: DefCandidate, qTokens: Set<string>, hotFanIn: number, upstreamWeight: number, prose?: string): number {
    const name = nameOf(c.defId);
    const toks = tokensOf(name);
    const lexical = toks.length === 0 || qTokens.size === 0 ? 0 : toks.filter(t => qTokens.has(t)).length / toks.length;
    const proseTerm = prose && prose.toLowerCase().includes(name.toLowerCase()) ? 0.5 : 0;
    // A definition too widely used to be part of one flow is down-weighted but not discarded:
    // its own edges decide, and fanIn is now a count of this definition alone.
    const viable = fanIn(c.defId) > hotFanIn ? 0.5 : 1;
    const dirCoef = c.direction === 'down' ? 1 : upstreamWeight;
    return (0.5 * lexical + edgeWeight(c.edgeType) + proseTerm) * viable * dirCoef;
}

function nameOf(defId: string): string {
    if (isDispatchNode(defId)) return defId.split('/').slice(2).join('/');
    return GLOBAL_INDEX.defs.get(defId)?.name ?? defId.split('#')[1] ?? defId;
}

export function buildChainSkeletonByDef(
    chain: Chain, entryDefId: string, opts: DefSkeletonOpts = {}, question?: string, prose?: string,
): ChainSkeleton {
    const o = { ...DEFAULTS, ...opts };
    const qTokens = new Set(tokensOf(question ?? ''));
    const score = (c: DefCandidate) => scoreOf(c, qTokens, o.hotFanIn, o.upstreamWeight, prose);
    const best = (cs: DefCandidate[]) => cs.reduce((m, c) => Math.max(m, score(c)), 0);

    // Direction is decided by the data, not by reading intent out of the question: a blast-radius
    // entry structurally has little downstream and plenty above it.
    const mode: ChainMode = best(upstreamOf(entryDefId)) > best(downstreamOf(entryDefId)) ? 'impact' : 'flow';
    const maxDepth = mode === 'flow' ? o.maxDepth : o.upstreamMaxDepth;

    const visited = new Set<string>();
    let majorCount = 0, nodeCount = 0, maxDepthReached = 0;

    const build = (defId: string, depth: number, direction: Direction, edgeType: EdgeType | null): SkeletonNode | null => {
        if (visited.has(defId)) return null;
        // A fuse, not a quota: expansion costs no tokens, so nothing is cut for being the 41st
        // node — this only stops a pathological module from exploding.
        if (nodeCount >= o.maxNodesPerChain) return null;
        visited.add(defId);
        nodeCount++;
        maxDepthReached = Math.max(maxDepthReached, depth);

        const children: SkeletonNode[] = [];
        const overrides = GLOBAL_INDEX.overrides.get(defId);

        if (isDispatchNode(defId)) {
            const refs = siblingsOf(defId).slice(0, o.siblingMax);
            const node: SkeletonNode = {
                id: '', defId, symbol: nameOf(defId), file: '', line: 0, snippet: '',
                kind: 'dispatch', direction, edgeType,
                siblings: { key: nameOf(defId), refs: refs as never, total: siblingsOf(defId).length },
                children,
            };
            if (depth < maxDepth) {
                for (const c of downstreamOf(defId).slice(0, o.maxChildrenPerNode)) {
                    const child = build(c.defId, depth + 1, c.direction, c.edgeType);
                    if (child) children.push(child);
                }
            }
            return node;
        }

        const d = GLOBAL_INDEX.defs.get(defId);
        const base = {
            id: '', defId, symbol: nameOf(defId), file: d?.file ?? '', line: d?.line ?? 0,
            snippet: d?.signature ?? '', direction, edgeType, children,
            ...(overrides ? { overrides } : {}),
        };

        // Early-stop kinds, decided before any edge lookup so they never grow a subtree. There is
        // no boundary kind any more: a package hop is a normal edge.
        if (depth > 0 && fanIn(defId) > o.hotFanIn) return { ...base, kind: 'hotleaf' };
        if (depth > 0 && (d?.kind === 'interface' || d?.kind === 'type')) return { ...base, kind: 'type' };

        const cands = (mode === 'flow' ? downstreamOf(defId) : upstreamOf(defId))
            .map(c => ({ c, s: score(c) }))
            .sort((a, b) => b.s - a.s)
            .slice(0, o.maxChildrenPerNode)
            .map(x => x.c);

        // Impact chains never mark pass-through: every caller hop IS the answer, there is no
        // forwarding wrapper to compress away.
        const isPass = mode === 'flow' && depth > 0 && cands.length === 1 && fanIn(defId) <= 2;
        if (!isPass) majorCount++;

        const node: SkeletonNode = { ...base, kind: isPass ? 'passthrough' : 'major' };
        if (depth < maxDepth) {
            for (const c of cands) {
                const child = build(c.defId, depth + 1, c.direction, c.edgeType);
                if (child) children.push(child);
            }
        }
        return node;
    };

    const root = build(entryDefId, 0, 'down', null);
    return {
        chain, mode, roots: root ? [root] : [],
        majorCount, nodeCount, maxDepthReached,
    };
}
