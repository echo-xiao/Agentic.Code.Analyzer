// Budgeted reading: selected symbols' bodies by line range, chain budgets weighted by
// RRF mass so one strong chain cannot starve the others.
import * as fs from 'fs';
import { getImplementation } from '../engine/source.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { estimateTokens } from './llm.js';
import type { SkeletonNode, Chain, Material } from './types.js';

type ReadFn = (n: SkeletonNode) => { text: string; startLine: number; endLine: number } | null;

const FALLBACK_WINDOW = 60;

// getImplementation uses ts-morph AST lookup by symbol name — it returns null for symbols it
// can't resolve this way (e.g. destructured bindings, re-exports, ambient/type-only symbols ts-morph
// doesn't classify as one of function/variable/class/interface/type). Previously that meant the
// node was evicted outright, so entire chains lost all their materials. Fall back to a raw-line-range
// read around the node's known call-site/definition line instead of giving up.
export function fallbackRead(n: SkeletonNode, readFileFn: (p: string) => string = (p) => fs.readFileSync(p, 'utf8')):
    { text: string; startLine: number; endLine: number } | null {
    const files = GLOBAL_INDEX.symbols.get(n.symbol);
    const abs = files ? [...files][0] : undefined;
    if (!abs) return null;
    let raw: string;
    try { raw = readFileFn(abs); } catch { return null; }
    const lines = raw.split('\n');
    const startLine = Math.max(1, n.line || 1);
    const endLine = Math.min(lines.length, startLine + FALLBACK_WINDOW - 1);
    const text = lines.slice(startLine - 1, endLine).join('\n');
    return { text, startLine, endLine };
}

const defaultRead: ReadFn = (n) => {
    const impl = getImplementation(n.symbol, n.file);
    if (!impl) return fallbackRead(n);
    const lines = impl.text.split('\n').length;
    return { text: impl.text, startLine: n.line || 1, endLine: (n.line || 1) + lines - 1 };
};

export function packMaterials(
    selectedIds: string[], nodeById: Map<string, SkeletonNode>, chains: Chain[],
    budgetTokens = 24000, opts: { readFn?: ReadFn; backfillIds?: string[]; fillTo?: number } = {},
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

    // Deterministic backfill: the selected-path budget above is often only lightly used (LLM
    // call 2 tends to select 3-10 nodes out of a much larger 24k-token allowance), so top up
    // with additional candidates (chain roots first, then remaining majors ordered by chain
    // weight -- see run.ts) charged against a single GLOBAL watermark rather than per-chain
    // caps, so one chain's unused budget can be spent on any chain's backfill candidates.
    // Backfilled items append to `materials`; ids that don't fit go nowhere -- `evicted` stays
    // reserved for selected-but-dropped ids only.
    const backfillIds = opts.backfillIds ?? [];
    if (backfillIds.length > 0) {
        const watermark = budgetTokens * (opts.fillTo ?? 0.6);
        const handled = new Set([...materials.map(m => m.nodeId), ...evicted]);
        let globalSpent = materials.reduce((a, m) => a + m.tokens, 0);
        for (const id of backfillIds) {
            if (handled.has(id)) continue;
            handled.add(id);
            if (globalSpent >= watermark) continue;                     // no room left at all
            const n = nodeById.get(id); if (!n) continue;
            const r = readFn(n);
            if (!r) continue;
            let text = r.text; let tokens = estimateTokens(text);
            const room = watermark - globalSpent;
            if (tokens > room) {
                if (room < 50) continue;                                 // not worth a fragment; a
                                                                           // smaller later candidate may
                                                                           // still fit, so keep scanning
                text = text.slice(0, room * 4); tokens = estimateTokens(text);
            }
            globalSpent += tokens;
            materials.push({ nodeId: id, symbol: n.symbol, file: n.file, startLine: r.startLine, endLine: r.endLine, text, tokens });
        }
    }

    return { materials, evicted };
}
