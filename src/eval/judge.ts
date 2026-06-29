import type { TestCase } from './load-testcases.js';

export interface JudgeScore {
    completeness: number;   // semantic recall: key chain covered
    grounding: number;      // semantic precision: no wrong/hallucinated files
    order: number;          // call-chain direction/sequence correct
    correctness: number;    // relations/assertions are true
    overall: number;
    verdict: 'PASS' | 'PARTIAL' | 'FAIL';
    missed: string[];
    hallucinated: string[];
    reasoning: string;
}

/**
 * LLM-as-judge (Track B quality). Uses a DIFFERENT model than the one under test
 * (Claude judging Gemini) to avoid self-preference bias. Returns null if no key.
 * Shared by layer2 (self-loop) and the agy session scorer.
 */
export async function runJudge(tc: TestCase, answer: string): Promise<JudgeScore | null> {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return null;
    const judgeModel = process.env.JUDGE_MODEL ?? 'claude-sonnet-4-6';

    const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
    const supporting = tc.supporting ?? [];
    const chain = (tc.groundTruthPath ?? []).map(p => `${p.symbol} (${p.file})`).join(' -> ');

    const prompt = [
        `You are grading an AI assistant's answer about the Rocket.Chat codebase, against a reference.`,
        `Do NOT reward length or verbosity. Judge only substance.`,
        ``,
        `QUESTION: ${tc.question}`,
        ``,
        `REFERENCE (ground truth):`,
        `- core files (must be covered): ${JSON.stringify(core)}`,
        `- supporting files (bonus, optional): ${JSON.stringify(supporting)}`,
        `- expected call chain (order matters if present): ${chain || '(n/a)'}`,
        `- key symbols: ${JSON.stringify(tc.keySymbols ?? [])}`,
        ``,
        `ANSWER TO GRADE:`,
        answer || '(empty)',
        ``,
        `Score each 0..1 and return ONLY a JSON object, no prose:`,
        `{"completeness":0..1,"grounding":0..1,"order":0..1,"correctness":0..1,"overall":0..1,`,
        `"verdict":"PASS|PARTIAL|FAIL","missed":["core files not covered"],`,
        `"hallucinated":["files/claims in answer that are wrong or invented"],"reasoning":"one sentence"}`,
        `Rules: completeness=core coverage; grounding=are cited files real & relevant (penalize invented);`,
        `order=is the chain direction/sequence right; correctness=are the relationships/assertions true.`,
        `verdict: overall>=0.8 PASS, 0.4-0.79 PARTIAL, <0.4 FAIL.`,
    ].join('\n');

    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': key,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: judgeModel,
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
            }),
        });
        if (!res.ok) { console.error(`judge HTTP ${res.status}`); return null; }
        const data: any = await res.json();
        const text: string = (data.content ?? []).map((c: any) => c.text ?? '').join('');
        const m = text.match(/\{[\s\S]*\}/);
        if (!m) return null;
        const j = JSON.parse(m[0]);
        return {
            completeness: Number(j.completeness) || 0,
            grounding: Number(j.grounding) || 0,
            order: Number(j.order) || 0,
            correctness: Number(j.correctness) || 0,
            overall: Number(j.overall) || 0,
            verdict: (j.verdict === 'PASS' || j.verdict === 'PARTIAL' || j.verdict === 'FAIL') ? j.verdict : 'FAIL',
            missed: Array.isArray(j.missed) ? j.missed : [],
            hallucinated: Array.isArray(j.hallucinated) ? j.hallucinated : [],
            reasoning: String(j.reasoning ?? ''),
        };
    } catch (e: any) {
        console.error(`judge error: ${e?.message?.slice(0, 80)}`);
        return null;
    }
}

// Pull path-like file references out of the answer prose (for answer-level precision).
export function extractCitedFiles(answer: string): string[] {
    const m = answer.match(/(?:apps\/meteor|packages|ee)\/[\w./-]+\.(?:tsx?|js)/g) ?? [];
    return Array.from(new Set(m));
}
