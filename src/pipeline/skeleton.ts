// Chain-shaped skeletons (the DeepWiki-Codemap product structure, built statically):
// two node tiers (major w/ id, passthrough w/o), hot nodes stay leaves, chains cut at
// subsystem-anchor boundaries. Output feeds LLM call 2 as a checkbox list.
import * as fs from 'fs';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { buildCalleesOf } from '../engine/down.js';
import { relPath } from '../engine/common.js';
import { tokenizeQuestion, symbolTokens } from './entry.js';
import type { Chain, ChainSkeleton, SkeletonNode } from './types.js';

export interface SkeletonOpts { maxDepth?: number; maxMajorPerChain?: number; hotFanIn?: number; maxChildrenPerNode?: number }

const fanIn = (sym: string) => GLOBAL_INDEX.callGraph.get(sym)?.length ?? 0;

// String-dispatch edges carry a real mechanism (event bus, pub/sub, REST, stream) — the chain
// keeps making sense across them. Plain call/new/jsx are the default. `type` edges are the
// weakest signal (a type reference, not a real runtime call).
const STRING_EDGE_TYPES = new Set(['event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe', 'rest_call', 'rest_route', 'stream_def', 'stream_sub']);
const edgeWeight = (edgeType: string): number => STRING_EDGE_TYPES.has(edgeType) ? 1.0 : edgeType === 'type' ? 0.1 : 0.6;

// Rank a caller's candidate callees before expansion, instead of taking them in raw source
// (buildCalleesOf) order — the old slice(0, maxChildrenPerNode) silently dropped
// question-relevant callees that happened to sit past position 8. Score formula, per candidate:
//   (0.5 * lexicalNorm + edgeWeight) * viabilityMultiplier
// - lexicalNorm: fraction of the callee's own sub-word tokens that also appear in the question's
//   tokens (0 when no `question` was supplied — old callers keep their old, source-order-only
//   behavior on ties since every candidate then scores purely on edgeWeight*viability).
// - edgeWeight: 1.0 string-dispatch edges, 0.6 plain call/new/jsx, 0.1 type refs (mechanism
//   chains live on string edges — see STRING_EDGE_TYPES above).
// - viabilityMultiplier: 0.5 if the callee would be classified hotleaf (fan-in > hotFanIn) or
//   boundary (its anchor segment differs from the chain's home segment) — cheap pre-check using
//   only the callee's own first indexed file, not the full resolveFile/parent-preference walk
//   build() does later; those candidates can't grow a subtree so they're worth less real estate.
// Ties (equal score) keep source order — Array.prototype.sort is stable (Node/V8, ES2019+), so a
// single descending sort by score alone preserves the original candidate order among ties without
// needing an explicit index tiebreaker.
const scoreCallee = (callee: string, edgeType: string, qTokens: Set<string>, homeSeg: string, hotFanIn: number): number => {
    const symToks = symbolTokens(callee);
    const lexicalNorm = symToks.length === 0 || qTokens.size === 0 ? 0 : symToks.filter(t => qTokens.has(t)).length / symToks.length;
    const calleeFile = relPath([...(GLOBAL_INDEX.symbols.get(callee) ?? [])][0] ?? '');
    const notViable = fanIn(callee) > hotFanIn || anchorSeg(calleeFile) !== homeSeg;
    return (0.5 * lexicalNorm + edgeWeight(edgeType)) * (notViable ? 0.5 : 1);
};

// Resolve which of a (possibly multi-file) symbol's definitions to anchor a node on.
// Preference order: an entry whose repo-relative path equals `preferredRel` (the seed's own file,
// carefully chosen upstream by question-token affinity + section sources — do not discard it by
// blindly taking the index's first entry) > an entry in the SAME file as the parent node (a callee
// defined in the parent's own file is almost always the right instance for that call site) > the
// first entry, as before.
const resolveFile = (sym: string, preferredRel?: string, preferredParentAbs?: string): { abs: string; rel: string } => {
    const files = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])];
    if (files.length === 0) return { abs: '', rel: '' };
    if (preferredRel) {
        const match = files.find(f => relPath(f) === preferredRel);
        if (match) return { abs: match, rel: relPath(match) };
    }
    if (preferredParentAbs) {
        const match = files.find(f => f === preferredParentAbs);
        if (match) return { abs: match, rel: relPath(match) };
    }
    return { abs: files[0], rel: relPath(files[0]) };
};

// Top-level subsystem anchor segment for a file path — 'lib' from 'apps/meteor/app/lib/server/a.ts',
// 'rest-typings' from 'packages/rest-typings/src/x.ts'. Segment-array approach (not regex scanning):
// regex scanning latches onto the FIRST embedded 'apps/meteor/<layer>/<seg>' anywhere in the string,
// which misfires on paths that legitimately contain a second copy further in (e.g. a fixture path
// 'apps/meteor/tests/apps/meteor/app/lib/server/x.ts' should anchor on 'tests', not on the nested
// 'lib'). Instead: normalize once (strip down to the repo-relative part, without re-scanning for
// nested anchors), then read fixed segment positions.
export function anchorSeg(file: string): string {
    // Normalize to a repo-relative path. Only ONE anchor lookup happens here (never re-scanned deeper):
    // - path containing 'Rocket.Chat/' → keep the part after it (relPath's own convention).
    // - absolute/synthetic prefix (e.g. '/rc/...') → find the FIRST 'apps'/'packages'/'ee' segment and
    //   keep from there; this is a single lookup on the raw prefix, not a recursive scan into the tail.
    // - already relative → use as-is, no searching at all (so a relative path with a nested
    //   'apps/meteor/...' further in is read positionally, not by locating that nested copy).
    let normalized = file;
    if (file.includes('Rocket.Chat/')) {
        normalized = file.split('Rocket.Chat/')[1];
    } else if (file.startsWith('/')) {
        const segs = file.split('/');
        const idx = segs.findIndex(s => s === 'apps' || s === 'packages' || s === 'ee');
        if (idx >= 0) normalized = segs.slice(idx).join('/');
    }

    const seg = normalized.split('/').filter(Boolean);
    if (seg[0] === 'apps' && seg[1] === 'meteor') {
        const layer = seg[2];
        // Known layout layers are structural, not subsystem names — the subsystem is one level deeper.
        if (layer === 'app' || layer === 'client' || layer === 'server' || layer === 'ee') return seg[3] ?? '';
        // Anything else directly under apps/meteor (e.g. 'tests') IS the anchor itself.
        return layer ?? '';
    }
    if (seg[0] === 'packages') return seg[1] ?? '';
    if (seg[0] === 'ee' && seg[1] === 'packages') return seg[2] ?? '';
    if (seg[0] === 'apps') return seg[1] ?? '';        // apps/<seg> that isn't apps/meteor
    return seg[0] ?? '';
}

const firstLine = (sym: string, abs: string): { line: number; snippet: string } => {
    if (!abs || !fs.existsSync(abs)) return { line: 0, snippet: sym };
    const src = fs.readFileSync(abs, 'utf8').split('\n');
    const idx = src.findIndex(l => l.includes(sym));
    return { line: idx + 1, snippet: (src[idx] ?? sym).trim().slice(0, 140) };
};

export function buildChainSkeleton(chain: Chain, opts: SkeletonOpts = {}, question?: string): ChainSkeleton {
    // maxDepth was 3; real message chains run 6-7 hops through wrapper layers before reaching a
    // major node. Fan-out is already bounded by maxChildrenPerNode(8), passthrough compression,
    // and maxMajorPerChain(10) — depth now only controls REACH through those wrappers, not size.
    const { maxDepth = 6, maxMajorPerChain = 10, hotFanIn = 25, maxChildrenPerNode = 8 } = opts;
    const calleesOf = buildCalleesOf();
    let majorCount = 0;
    const visited = new Set<string>();
    const homeSeg = anchorSeg(chain.seeds[0]?.file ?? '');
    const qTokens = new Set(tokenizeQuestion(question ?? ''));

    const build = (sym: string, depth: number, parentAbs?: string, preferredFile?: string): SkeletonNode | null => {
        if (visited.has(sym)) return null;
        visited.add(sym);
        // Root nodes (depth 0) honor the seed's own file — the entry stage picked it deliberately via
        // question-token affinity + section sources, and must not be overridden by index insertion order.
        // Non-root nodes prefer a same-file definition as their parent when one exists.
        const { abs, rel: file } = resolveFile(sym, depth === 0 ? preferredFile : undefined, parentAbs);
        const { line, snippet } = firstLine(sym, abs);
        const base = { symbol: sym, file, line, snippet, edgeType: null, children: [] as SkeletonNode[] };
        if (anchorSeg(file) !== homeSeg && depth > 0) return { ...base, id: '', kind: 'boundary' };
        if (fanIn(sym) > hotFanIn && depth > 0)      return { ...base, id: '', kind: 'hotleaf' };
        // Cap fan-out per node — an unbounded callee list is how one chain reached 888 nodes and
        // drowned the rendered prompt in noise. Candidates are RANKED (see scoreCallee) before the
        // cut, not taken in raw source order, so a question-relevant callee past position 8 still
        // survives instead of being silently dropped.
        const candidates = (calleesOf.get(sym) ?? []).filter(c => GLOBAL_INDEX.symbols.has(c.callee));
        const callees = candidates
            .map(c => ({ c, score: scoreCallee(c.callee, c.edgeType, qTokens, homeSeg, hotFanIn) }))
            .sort((a, b) => b.score - a.score)                 // stable sort: ties keep source order
            .slice(0, maxChildrenPerNode)
            .map(x => x.c);
        const isPass = depth > 0 && callees.length === 1 && fanIn(sym) <= 2;
        const kind: SkeletonNode['kind'] = isPass ? 'passthrough' : 'major';
        if (kind === 'major') {
            if (majorCount >= maxMajorPerChain) return null;
            majorCount++;
        }
        const node: SkeletonNode = { ...base, id: '', kind };
        if (depth < maxDepth)
            for (const c of callees) {
                const child = build(c.callee, depth + 1, abs);
                if (child) { child.edgeType = c.edgeType as any; node.children.push(child); }
            }
        return node;
    };

    const roots = chain.seeds.map(s => build(s.symbol, 0, undefined, s.file)).filter((n): n is SkeletonNode => !!n);
    return { chain, roots, majorCount };
}

export function renderSkeletons(skeletons: ChainSkeleton[]): { text: string; nodeById: Map<string, SkeletonNode> } {
    const nodeById = new Map<string, SkeletonNode>();
    const lines: string[] = [];
    for (const sk of skeletons) {
        let letter = 0;
        lines.push(`Chain ${sk.chain.id} (${sk.chain.label}):`);
        const emit = (n: SkeletonNode, indent: number) => {
            const pad = '  '.repeat(indent);
            if (n.kind === 'major') {
                n.id = `${sk.chain.id}${String.fromCharCode(97 + letter++)}`;
                nodeById.set(n.id, n);
                lines.push(`${pad}[${n.id}] ${n.symbol}  ${n.file}:${n.line}  ${n.snippet}`);
            } else if (n.kind === 'hotleaf') lines.push(`${pad}(hot, not expanded) ${n.symbol}`);
            else if (n.kind === 'boundary') lines.push(`${pad}(-> other subsystem: ${anchorSeg(n.file)}) ${n.symbol}`);
            else lines.push(`${pad}${n.symbol}()`);                       // passthrough: bare line
            n.children.forEach(c => emit(c, indent + 1));
        };
        sk.roots.forEach(r => emit(r, 1));
        lines.push('');
    }
    return { text: lines.join('\n'), nodeById };
}
