// Chain-shaped skeletons (the DeepWiki-Codemap product structure, built statically):
// two node tiers (major w/ id, passthrough w/o), hot nodes stay leaves, chains cut at
// subsystem-anchor boundaries. Output feeds LLM call 2 as a checkbox list.
import * as fs from 'fs';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { buildCalleesOf } from '../engine/down.js';
import { relPath } from '../engine/common.js';
import type { Chain, ChainSkeleton, SkeletonNode } from './types.js';

export interface SkeletonOpts { maxDepth?: number; maxMajorPerChain?: number; hotFanIn?: number; maxChildrenPerNode?: number }

const fanIn = (sym: string) => GLOBAL_INDEX.callGraph.get(sym)?.length ?? 0;
const fileOf = (sym: string): string => relPath([...(GLOBAL_INDEX.symbols.get(sym) ?? [])][0] ?? '');

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

const firstLine = (sym: string): { line: number; snippet: string } => {
    const abs = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])][0];
    if (!abs || !fs.existsSync(abs)) return { line: 0, snippet: sym };
    const src = fs.readFileSync(abs, 'utf8').split('\n');
    const idx = src.findIndex(l => l.includes(sym));
    return { line: idx + 1, snippet: (src[idx] ?? sym).trim().slice(0, 140) };
};

export function buildChainSkeleton(chain: Chain, opts: SkeletonOpts = {}): ChainSkeleton {
    const { maxDepth = 3, maxMajorPerChain = 10, hotFanIn = 25, maxChildrenPerNode = 8 } = opts;
    const calleesOf = buildCalleesOf();
    let majorCount = 0;
    const visited = new Set<string>();
    const homeSeg = anchorSeg(chain.seeds[0]?.file ?? '');

    const build = (sym: string, depth: number): SkeletonNode | null => {
        if (visited.has(sym)) return null;
        visited.add(sym);
        const file = fileOf(sym);
        const { line, snippet } = firstLine(sym);
        const base = { symbol: sym, file, line, snippet, edgeType: null, children: [] as SkeletonNode[] };
        if (anchorSeg(file) !== homeSeg && depth > 0) return { ...base, id: '', kind: 'boundary' };
        if (fanIn(sym) > hotFanIn && depth > 0)      return { ...base, id: '', kind: 'hotleaf' };
        // Cap fan-out per node — an unbounded callee list is how one chain reached 888 nodes and
        // drowned the rendered prompt in noise. Order comes from buildCalleesOf (source order);
        // no attempt to prefer "future majors" — a plain width cap is enough.
        const callees = (calleesOf.get(sym) ?? []).filter(c => GLOBAL_INDEX.symbols.has(c.callee)).slice(0, maxChildrenPerNode);
        const isPass = depth > 0 && callees.length === 1 && fanIn(sym) <= 2;
        const kind: SkeletonNode['kind'] = isPass ? 'passthrough' : 'major';
        if (kind === 'major') {
            if (majorCount >= maxMajorPerChain) return null;
            majorCount++;
        }
        const node: SkeletonNode = { ...base, id: '', kind };
        if (depth < maxDepth)
            for (const c of callees) {
                const child = build(c.callee, depth + 1);
                if (child) { child.edgeType = c.edgeType as any; node.children.push(child); }
            }
        return node;
    };

    const roots = chain.seeds.map(s => build(s.symbol, 0)).filter((n): n is SkeletonNode => !!n);
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
