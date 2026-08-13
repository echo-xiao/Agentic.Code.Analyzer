// Budgeted reading: selected symbols' bodies by line range, chain budgets weighted by
// RRF mass so one strong chain cannot starve the others.
import * as fs from 'fs';
import { readDefinition } from '../engine/source-defs.js';
import { estimateTokens } from './llm.js';
import type { SkeletonNode, Material } from './types.js';

type ReadFn = (n: SkeletonNode) => { text: string; startLine: number; endLine: number } | null;

// A node IS a definition, so reading it is a slice of a known file at a known line range. The two
// name-based paths this replaces could each hand the model a different same-named file's body than
// the skeleton anchored on, and the fallback did it silently: bare files[0] plus a blind 60-line
// window presented as that symbol's implementation.
const defaultRead: ReadFn = (n) => {
    if (!n.defId) return null;
    const impl = readDefinition(n.defId);
    return impl ? { text: impl.text, startLine: impl.startLine, endLine: impl.endLine } : null;
};

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
