// LLM call 1: name the relevant wiki sections. The whole outline fits in one prompt,
// so the LLM reads titles+blurbs and picks — no embeddings in v1 (see spec, deferred).
import type { WikiOutline } from '../deepwiki/types.js';
import type { RoutedSection } from './types.js';
import type { LlmClient } from './llm.js';

export function buildRoutingPrompt(question: string, outline: WikiOutline): string {
    const lines = outline.sections.map(s => `- ${s.id}: ${s.title} — ${s.blurb.slice(0, 120)}`);
    return [
        'You are routing a question about the Rocket.Chat codebase to wiki sections.',
        'Sections (id: title — description):', ...lines, '',
        `Question: ${question}`, '',
        'Reply with the ids of ALL relevant sections (1-4 of them), one id per line, most relevant first.',
        'If the question spans multiple subsystems, include one section per subsystem. Reply with ids only.',
    ].join('\n');
}

export function parseRoutingReply(reply: string, outline: WikiOutline): RoutedSection[] {
    const known = new Set(outline.sections.map(s => s.id));
    const out: RoutedSection[] = [];
    for (const raw of reply.split('\n')) {
        const id = raw.trim().replace(/^[-*\d.\s]+/, '').trim();
        if (known.has(id) && !out.some(r => r.sectionId === id)) out.push({ sectionId: id, rank: out.length + 1 });
    }
    return out;
}

export async function route(question: string, outline: WikiOutline, llm: LlmClient): Promise<RoutedSection[]> {
    return parseRoutingReply(await llm.generate(buildRoutingPrompt(question, outline)), outline);
}
