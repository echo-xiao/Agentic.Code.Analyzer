// Chain-shaped skeletons (the DeepWiki-Codemap product structure, built statically):
// two node tiers (major w/ id, passthrough w/o), hot nodes stay leaves, chains cut at
// subsystem-anchor boundaries. Output feeds LLM call 2 as a checkbox list.
import * as fs from 'fs';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { buildCalleesOf } from '../engine/down.js';
import { relPath } from '../engine/common.js';
import type { Chain, ChainSkeleton, SkeletonNode } from './types.js';

export interface SkeletonOpts { maxDepth?: number; maxMajorPerChain?: number; hotFanIn?: number }

const fanIn = (sym: string) => GLOBAL_INDEX.callGraph.get(sym)?.length ?? 0;
const fileOf = (sym: string): string => relPath([...(GLOBAL_INDEX.symbols.get(sym) ?? [])][0] ?? '');

// Top-level subsystem anchor segment for a file path — 'lib' from 'apps/meteor/app/lib/server/a.ts',
// 'core' from 'packages/core/x.ts'. Deliberately non-anchored (`(?:^|\/)` instead of `^`) so it still
// works after an absolute or synthetic prefix (e.g. test paths like '/rc/apps/meteor/...') that
// relPath() doesn't strip — relPath only strips the literal 'Rocket.Chat/' substring.
export function anchorSeg(file: string): string {
    const stripped = file.split('Rocket.Chat/')[1] ?? file;
    const m = stripped.match(/(?:^|\/)apps\/meteor\/(?:app|client|server|ee)\/([^/]+)/)
        || stripped.match(/(?:^|\/)(?:packages|ee\/packages|apps)\/([^/]+)/);
    return m?.[1] ?? stripped.split('/').filter(Boolean)[0] ?? '';
}

const firstLine = (sym: string): { line: number; snippet: string } => {
    const abs = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])][0];
    if (!abs || !fs.existsSync(abs)) return { line: 0, snippet: sym };
    const src = fs.readFileSync(abs, 'utf8').split('\n');
    const idx = src.findIndex(l => l.includes(sym));
    return { line: idx + 1, snippet: (src[idx] ?? sym).trim().slice(0, 140) };
};

export function buildChainSkeleton(chain: Chain, opts: SkeletonOpts = {}): ChainSkeleton {
    const { maxDepth = 3, maxMajorPerChain = 10, hotFanIn = 25 } = opts;
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
        const callees = (calleesOf.get(sym) ?? []).filter(c => GLOBAL_INDEX.symbols.has(c.callee));
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
