// LLM call 3: single-shot answer, organized per chain, every claim cited file:line.
// Citations are validated against the materials — anything outside is flagged fabricated.
import type { Material, Chain } from './types.js';
import type { LlmClient } from './llm.js';

export function buildAnswerPrompt(question: string, chains: Chain[], materials: Material[], chainProse?: Map<number, string>): string {
    const parts: string[] = [
        'Answer a question about the Rocket.Chat codebase using ONLY the materials below.',
        '要求：用中文回答；按途径（链）组织（"途径一/途径二"）；每个论断后面必须带 `文件路径:行号` 引用，行号必须落在给出的材料行区间内；不要引用材料之外的文件。'];
    if (chainProse && chainProse.size > 0) {
        // BACKGROUND ONLY: the wiki prose is prior/context, not evidence — every citation must
        // trace back to the code materials below, never to a claim made only in these notes.
        parts.push('IMPORTANT: any "Wiki background notes" below are BACKGROUND ONLY — every `文件路径:行号` citation must come from the code materials, never from the wiki notes.');
    }
    parts.push('');
    for (const c of chains) {
        const mats = materials.filter(m => m.nodeId.slice(0, -1) === String(c.id));
        if (!mats.length) continue;
        const prose = chainProse?.get(c.id);
        if (prose) parts.push(`Wiki background notes (Chain ${c.id}, background only — do not cite): ${prose.slice(0, 1200)}`, '');
        parts.push(`## Chain ${c.id} (${c.label})`);
        for (const m of mats) parts.push(`--- ${m.file}:${m.startLine}-${m.endLine} (${m.symbol})`, m.text, '');
    }
    parts.push(`Question: ${question}`);
    return parts.join('\n');
}

const CITE_RE = /[\w@./-]+\.(?:ts|tsx|js|json|md):(\d+)/g;

export function validateCitations(answer: string, materials: Material[]): { valid: string[]; fabricated: string[] } {
    const valid: string[] = []; const fabricated: string[] = [];
    for (const m of answer.matchAll(CITE_RE)) {
        const cite = m[0]; const file = cite.slice(0, cite.lastIndexOf(':')); const line = Number(m[1]);
        const ok = materials.some(mat => mat.file === file && line >= mat.startLine && line <= mat.endLine);
        (ok ? valid : fabricated).push(cite);
    }
    return { valid: [...new Set(valid)], fabricated: [...new Set(fabricated)] };
}

export async function generateAnswer(question: string, chains: Chain[], materials: Material[], llm: LlmClient, chainProse?: Map<number, string>) {
    const answer = await llm.generate(buildAnswerPrompt(question, chains, materials, chainProse));
    return { answer, fabricated: validateCitations(answer, materials).fabricated };
}
