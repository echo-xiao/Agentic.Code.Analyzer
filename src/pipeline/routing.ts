// LLM call 1: name the wiki subsections whose source files could hold the answer.
//
// The menu is subsection titles ("2.2-core-application › Message Sending Workflow"), not page
// blurbs. Measured, a page blurb is literally the first 200 characters of the page's prose --
// question-word coverage on it is 0~1 of 4, while a subsection title often matches directly.
//
// This step cannot be replaced by lexical or similarity matching (measured): title-only matching
// has good precision but collapses on recall (1 of 294 hits for "how do push notifications work",
// and that hit was a video-call notification), while title+prose matching lifts recall but
// squeezes every score into a 0.09~0.155 band where noise outranks signal. Blast-radius questions
// need "understand that this asks about dependents", which similarity cannot express.
import type { WikiSubsection } from '../deepwiki/sections.js';
import type { RoutedSection } from './types.js';
import type { LlmClient } from './llm.js';

export function buildRoutingPrompt(question: string, sections: WikiSubsection[]): string {
    const lines = sections.map(s => `- \`${s.path}\``);
    return [
        'You are routing a question about the Rocket.Chat codebase to wiki subsections.',
        'Each subsection below is backed by a small set of source files.',
        'Subsections:', ...lines, '',
        `Question: ${question}`, '',
        'Name every subsection whose source files could contain the code that answers the question. Prefer precision: a subsection whose title is only topically adjacent is not a hit. Most relevant first, one path per line, paths only (e.g. `2.2-core-application › Message Sending Workflow`).',
    ].join('\n');
}

// Matching is by the full `page › heading` path. Headings repeat across pages ("Overview",
// "Core Components"), so a bare heading is ambiguous and is never matched on its own.
export function parseRoutingReply(reply: string, sections: WikiSubsection[]): RoutedSection[] {
    const out: RoutedSection[] = [];
    const seen = new Set<string>();
    for (const raw of reply.split('\n')) {
        const line = raw.trim();
        if (!line) continue;
        // Longest path first so that a page whose id prefixes another can't steal the match.
        const hit = [...sections]
            .sort((a, b) => b.path.length - a.path.length)
            .find(s => line.includes(s.path));
        if (hit && !seen.has(hit.path)) {
            seen.add(hit.path);
            out.push({ path: hit.path, rank: out.length + 1 });
        }
    }
    return out;
}

export async function route(question: string, sections: WikiSubsection[], llm: LlmClient): Promise<RoutedSection[]> {
    return parseRoutingReply(await llm.generate(buildRoutingPrompt(question, sections)), sections);
}
