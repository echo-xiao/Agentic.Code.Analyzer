// Budgeted reading: selected symbols' bodies by line range, chain budgets weighted by
// RRF mass so one strong chain cannot starve the others.
import * as fs from 'fs';
import { getImplementation } from '../engine/source.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { estimateTokens } from './llm.js';
import type { SkeletonNode, Material } from './types.js';

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

// `readIds` is the full read order decided upstream (run.ts): every chain's root nodes first,
// then the remaining major nodes by chain weight. There is no LLM selection step any more, so
// this single pass IS the reading stage -- per-chain budgets keep one heavy chain from eating
// the whole allowance, and anything that doesn't fit lands in `evicted` where attribution can
// see it as a budget loss.
// Single global ceiling, no per-chain quota. Quotas produced two wastes at once: a chain with one
// major node sat on 41% of the budget (9600 tokens idle) while another with ten majors lost five
// nodes to its 7% share. Measured usage is 5690 of 24000 -- the ceiling is a fuse, not a resource
// to allocate.
export function packMaterials(
    readIds: string[], nodeById: Map<string, SkeletonNode>,
    budgetTokens = 24000, opts: { readFn?: ReadFn } = {},
): { materials: Material[]; unread: string[]; cappedOut: boolean } {
    const readFn = opts.readFn ?? defaultRead;
    const materials: Material[] = [];
    const unread: string[] = [];
    const seen = new Set<string>();
    let spent = 0;
    let cappedOut = false;

    for (const id of readIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        const n = nodeById.get(id);
        if (!n) continue;
        if (cappedOut) { unread.push(id); continue; }
        const r = readFn(n);
        if (!r) { unread.push(id); continue; }
        const tokens = estimateTokens(r.text);
        if (spent + tokens > budgetTokens) { cappedOut = true; unread.push(id); continue; }
        spent += tokens;
        materials.push({ nodeId: id, symbol: n.symbol, file: n.file, startLine: r.startLine, endLine: r.endLine, text: r.text, tokens });
    }
    return { materials, unread, cappedOut };
}
