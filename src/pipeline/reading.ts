// Budgeted reading: selected symbols' bodies by line range, chain budgets weighted by
// RRF mass so one strong chain cannot starve the others.
import { getImplementation } from '../engine/source.js';
import { estimateTokens } from './llm.js';
import type { SkeletonNode, Chain, Material } from './types.js';

type ReadFn = (n: SkeletonNode) => { text: string; startLine: number; endLine: number } | null;

const defaultRead: ReadFn = (n) => {
    const impl = getImplementation(n.symbol, n.file);
    if (!impl) return null;
    const lines = impl.text.split('\n').length;
    return { text: impl.text, startLine: n.line || 1, endLine: (n.line || 1) + lines - 1 };
};

export function packMaterials(
    selectedIds: string[], nodeById: Map<string, SkeletonNode>, chains: Chain[],
    budgetTokens = 24000, opts: { readFn?: ReadFn } = {},
): { materials: Material[]; evicted: string[] } {
    const readFn = opts.readFn ?? defaultRead;
    const totalMass = chains.reduce((a, c) => a + c.rrfMass, 0) || 1;
    const chainBudget = new Map(chains.map(c => [String(c.id), Math.floor(budgetTokens * c.rrfMass / totalMass)]));
    const spent = new Map<string, number>();
    const materials: Material[] = []; const evicted: string[] = [];

    for (const id of selectedIds) {
        const n = nodeById.get(id); if (!n) continue;
        const chainId = id.slice(0, -1);
        const budget = chainBudget.get(chainId) ?? 0;
        const used = spent.get(chainId) ?? 0;
        const r = readFn(n);
        if (!r) { evicted.push(id); continue; }
        let text = r.text; let tokens = estimateTokens(text);
        if (used + tokens > budget) {
            const room = budget - used;
            if (room < 50) { evicted.push(id); continue; }               // not worth a fragment
            text = text.slice(0, room * 4); tokens = estimateTokens(text);
        }
        spent.set(chainId, used + tokens);
        materials.push({ nodeId: id, symbol: n.symbol, file: n.file, startLine: r.startLine, endLine: r.endLine, text, tokens });
    }
    return { materials, evicted };
}
