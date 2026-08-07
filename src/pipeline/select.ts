// LLM call 2: given every chain's skeleton, decide which chains are worth reading.
//
// This judgement cannot be left to the answer call. Measured: 8 chains expanded to 257 major
// nodes while the read ceiling covered only 96, so 161 never had their bodies read at all -- the
// generating model cannot weigh material it never received. Worse, the 96 that were read included
// 26 from an unrelated message-rendering chain while the encryptMessage chain got only its root.
//
// Chains, not nodes: a chain header carries three reliable signals (page, subsection, seed
// symbol). Node names alone mislead -- in a skeleton-only generation the model narrated
// `clear` / `stop` (boundary leaves from packages/media-signaling) as steps of the send flow.
import type { Chain } from './types.js';
import type { LlmClient } from './llm.js';

export function buildSelectPrompt(question: string, skeletonText: string, chains: Chain[]): string {
    const roster = chains.map(c => `- Chain ${c.id}: ${c.label}${c.tied ? ' (tied seed: another symbol in the same pool scored the same)' : ''}`);
    return [
        'You are choosing which call-chains are worth reading in full to answer a question about Rocket.Chat.',
        '', '## Candidate chains', ...roster,
        '', '## Skeletons', skeletonText,
        '', `Question: ${question}`, '',
        'Keep only the chains that help answer this question; the rest are discarded. A discarded chain is never read and never reaches the answer.',
        'When unsure, keep the chain -- but discard chains that are plainly unrelated (for example a pure rendering-component chain for a question about the send flow).',
        'Reply with the chain numbers to keep, comma or newline separated. No explanation.',
    ].join('\n');
}

// Ids are plain integers, so a bare digit scan is enough; anything not a known chain id is
// ignored. Returning every chain on a failed parse is deliberate: dropping is irreversible, and a
// model that answered in prose should not cost the run all of its material.
export function parseSelectReply(reply: string, chains: Chain[]): { kept: number[]; dropped: number[] } {
    const known = new Set(chains.map(c => c.id));
    const kept: number[] = [];
    for (const m of reply.matchAll(/\d+/g)) {
        const id = Number(m[0]);
        if (known.has(id) && !kept.includes(id)) kept.push(id);
    }
    if (kept.length === 0) return { kept: chains.map(c => c.id), dropped: [] };
    return { kept, dropped: chains.map(c => c.id).filter(id => !kept.includes(id)) };
}

export async function selectChains(
    question: string, skeletonText: string, chains: Chain[], llm: LlmClient,
): Promise<{ kept: number[]; dropped: number[]; raw: string }> {
    const raw = await llm.generate(buildSelectPrompt(question, skeletonText, chains));
    return { ...parseSelectReply(raw, chains), raw };
}
