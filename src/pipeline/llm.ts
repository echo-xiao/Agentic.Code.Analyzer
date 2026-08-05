// LlmClient boundary: the pipeline depends on this interface only, so every stage is
// testable with FakeLlm and the free-tier request budget is metered in one place.
import { GoogleGenerativeAI } from '@google/generative-ai';

export const estimateTokens = (text: string): number => Math.ceil(text.length / 4);

export interface LlmClient {
    generate(prompt: string): Promise<string>;
    readonly calls: number;
    readonly promptTokensEst: number;
}

export class FakeLlm implements LlmClient {
    calls = 0;
    promptTokensEst = 0;
    constructor(private replies: string[]) {}
    async generate(prompt: string): Promise<string> {
        this.calls++;
        this.promptTokensEst += estimateTokens(prompt);
        const r = this.replies.shift();
        if (r === undefined) throw new Error('FakeLlm: no more queued replies');
        return r;
    }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export class GeminiClient implements LlmClient {
    calls = 0;
    promptTokensEst = 0;
    private model;
    constructor(modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash') {
        const key = process.env.GEMINI_API_KEY;
        if (!key) throw new Error('GEMINI_API_KEY missing (put it in .env)');
        this.model = new GoogleGenerativeAI(key).getGenerativeModel({ model: modelName });
    }
    async generate(prompt: string): Promise<string> {
        this.calls++;
        this.promptTokensEst += estimateTokens(prompt);
        let lastErr: unknown;
        for (let attempt = 0; attempt < 4; attempt++) {
            try {
                const res = await this.model.generateContent(prompt);
                return res.response.text();
            } catch (e: any) {
                lastErr = e;
                const status = e?.status ?? e?.response?.status;
                if (status && status !== 429 && status < 500) throw e; // real errors: fail fast
                await sleep(2000 * 2 ** attempt); // 429/5xx/transient: backoff
            }
        }
        throw lastErr;
    }
}
