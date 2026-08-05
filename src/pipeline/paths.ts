// LLM call 2: one global path decision over all chain skeletons (checkbox output).
// Hallucinated ids are dropped by table lookup; over-selection is capped by chain RRF mass.
import type { SkeletonNode, Chain } from './types.js';
import type { LlmClient } from './llm.js';

export function buildPathPrompt(question: string, skeletonText: string): string {
    return [
        'You are choosing which code locations must be READ to answer a question about Rocket.Chat.',
        'Below are call-chain skeletons. Only lines tagged like [1a] are selectable.',
        '', skeletonText, '',
        `Question: ${question}`, '',
        'Reply with ONLY the ids of nodes whose source must be read, comma or newline separated.',
        'Cover every chain that is relevant to the question; skip nodes that are plumbing.',
    ].join('\n');
}

export function parsePathReply(reply: string, nodeById: Map<string, SkeletonNode>): { selected: string[]; dropped: string[] } {
    const ids = reply.match(/\b\d+[a-z]\b/g) ?? [];
    const selected: string[] = []; const dropped: string[] = [];
    for (const id of ids) {
        if (selected.includes(id) || dropped.includes(id)) continue;
        (nodeById.has(id) ? selected : dropped).push(id);
    }
    return { selected, dropped };
}

// Chain id of a node id is everything but the trailing letter (chain numbers can be
// multi-digit, e.g. '12c' belongs to chain '12'), so id.slice(0, -1) is used everywhere
// below instead of id[0].
export function capSelection(selected: string[], nodeById: Map<string, SkeletonNode>, chains: Chain[], maxNodes = 14): string[] {
    if (selected.length <= maxNodes) return selected;
    const mass = new Map(chains.map(c => [String(c.id), c.rrfMass]));
    const order = new Map(selected.map((id, i) => [id, i]));
    return [...selected]
        .sort((a, b) => {
            const massDiff = (mass.get(b.slice(0, -1)) ?? 0) - (mass.get(a.slice(0, -1)) ?? 0);
            if (massDiff !== 0) return massDiff;
            return (order.get(a) ?? 0) - (order.get(b) ?? 0);
        })
        .slice(0, maxNodes);
}

export async function selectPaths(
    question: string,
    skeletonText: string,
    nodeById: Map<string, SkeletonNode>,
    chains: Chain[],
    llm: LlmClient,
): Promise<{ selected: string[]; dropped: string[]; raw: string }> {
    const raw = await llm.generate(buildPathPrompt(question, skeletonText));
    const { selected, dropped } = parsePathReply(raw, nodeById);
    return { selected: capSelection(selected, nodeById, chains), dropped, raw };
}
