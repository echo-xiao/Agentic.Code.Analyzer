// LLM call 2: single-shot answer over the skeleton plus the read bodies. Output format is
// unconstrained; citation checking is a diagnostic, not a requirement (see buildAnswerPrompt).
import type { Material, Chain } from './types.js';
import type { LlmClient } from './llm.js';

export function buildAnswerPrompt(
    question: string, chains: Chain[], materials: Material[],
    chainProse?: Map<number, string>, skeletonText?: string,
): string {
    // No output-format constraints. Earlier versions demanded Chinese, per-chain organisation and
    // a `file:line` after every claim, so that the trace would be visible inside the answer; the
    // report now carries the skeleton and the per-stage recap directly, so the answer no longer
    // has to double as a trace carrier.
    const parts: string[] = ['Answer a question about the Rocket.Chat codebase using the materials below.'];
    if (skeletonText) {
        // The skeleton is the SHAPE of the answer: which symbol reaches which, in what order,
        // where a chain hands off to another subsystem, and what is wired to each dispatch key.
        // Materials only cover the major nodes -- pass-through / hot / boundary / type / dispatch
        // nodes appear here and nowhere else.
        parts.push('',
            'Below is the call-path skeleton. Nodes tagged like `[1a]` have their full function body in the materials underneath;',
            'untagged nodes appear only here -- they carry the connective tissue: pass-through hops, cross-package hand-offs, and whatever is wired to a dispatch key (event / route / pubsub / stream).',
            '`↓` means "calls", `↑` means "is called by".',
            '', '## Call-path skeleton', skeletonText);
    }
    if (chainProse && chainProse.size > 0) {
        parts.push('', 'IMPORTANT: the "Wiki background notes" below are background only -- never treat them as evidence about the code.');
    }
    parts.push('');
    for (const c of chains) {
        const mats = materials.filter(m => m.nodeId.slice(0, -1) === String(c.id));
        if (!mats.length) continue;
        const prose = chainProse?.get(c.id);
        if (prose) parts.push(`Wiki background notes (Chain ${c.id}, background only): ${prose.slice(0, 1200)}`, '');
        parts.push(`## Chain ${c.id} (${c.label})`);
        for (const m of mats) parts.push(`--- ${m.file}:${m.startLine}-${m.endLine} (${m.symbol})`, m.text, '');
    }
    parts.push(`Question: ${question}`);
    return parts.join('\n');
}

const CITE_RE = /[\w@./-]+\.(?:ts|tsx|js|json|md):(\d+)/g;

// Diagnostic only: the prompt no longer requires citations, so this just observes whatever the
// model happened to emit and reports which references fall outside the supplied line ranges.
export function validateCitations(answer: string, materials: Material[]): { valid: string[]; fabricated: string[] } {
    const valid: string[] = []; const fabricated: string[] = [];
    for (const m of answer.matchAll(CITE_RE)) {
        const cite = m[0]; const file = cite.slice(0, cite.lastIndexOf(':')); const line = Number(m[1]);
        const ok = materials.some(mat => mat.file === file && line >= mat.startLine && line <= mat.endLine);
        (ok ? valid : fabricated).push(cite);
    }
    return { valid: [...new Set(valid)], fabricated: [...new Set(fabricated)] };
}

export async function generateAnswer(
    question: string, chains: Chain[], materials: Material[], llm: LlmClient,
    chainProse?: Map<number, string>, skeletonText?: string,
) {
    const answer = await llm.generate(buildAnswerPrompt(question, chains, materials, chainProse, skeletonText));
    return { answer, citations: validateCitations(answer, materials) };
}
