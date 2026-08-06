// LLM call 1: name the relevant wiki sections. The whole outline fits in one prompt,
// so the LLM reads titles+blurbs and picks — no embeddings in v1 (see spec, deferred).
import type { WikiOutline } from '../deepwiki/types.js';
import type { RoutedSection } from './types.js';
import type { LlmClient } from './llm.js';

export function buildRoutingPrompt(question: string, outline: WikiOutline): string {
    const lines = outline.sections.map(s => `- \`${s.id}\`: ${s.title} — ${s.blurb.slice(0, 120)}`);
    return [
        'You are routing a question about the Rocket.Chat codebase to wiki sections.',
        'Sections (id: title — description):', ...lines, '',
        `Question: ${question}`, '',
        'Name EVERY section whose source files could contain the code that answers the question — do not omit a section that lists concrete implementation files for the asked behavior. Do NOT name sections that merely relate topically: type-definition/API-contract/glossary sections only qualify if the question itself asks about types or contracts. Most relevant first, one id per line, ids only (e.g. `2.4-ui-component-system`).',
    ].join('\n');
}

export function parseRoutingReply(reply: string, outline: WikiOutline): RoutedSection[] {
    const knownIds = outline.sections.map(s => s.id);
    const out: RoutedSection[] = [];

    for (const raw of reply.split('\n')) {
        const line = raw.trim();
        if (!line) continue;

        let matchedId: string | undefined;

        // Try exact match: line contains a known id verbatim
        for (const id of knownIds) {
            if (line.includes(id)) {
                matchedId = id;
                break;
            }
        }

        // Try numeric-prefix match: extract numeric prefix and match against section ids
        if (!matchedId) {
            const prefixMatch = line.match(/^[`"'\s]*(\d+(?:\.\d+)?)[`"'\s]*$/);
            if (prefixMatch) {
                const prefix = prefixMatch[1];
                const candidates = knownIds.filter(id => id.startsWith(`${prefix}-`));
                if (candidates.length === 1) {
                    matchedId = candidates[0];
                }
            }
        }

        // Add if matched and not already present
        if (matchedId && !out.some(r => r.sectionId === matchedId)) {
            out.push({ sectionId: matchedId, rank: out.length + 1 });
        }
    }

    return out;
}

export async function route(question: string, outline: WikiOutline, llm: LlmClient): Promise<RoutedSection[]> {
    return parseRoutingReply(await llm.generate(buildRoutingPrompt(question, outline)), outline);
}
