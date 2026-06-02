#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

interface TestCase {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    groundTruthFiles: string[];
    keySymbols?: string[];
}

interface BaselineResult {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    answer: string;
    tokens: { prompt: number; candidates: number; total: number };
}

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY not set.');
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.argv.find(a => a.startsWith('--model='))?.split('=')[1] ?? 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: {
            role: 'user',
            parts: [{ text: 'You are a software architect expert on the Rocket.Chat open-source codebase (https://github.com/RocketChat/Rocket.Chat). Answer questions about its architecture, code structure, and implementation details. Always include specific file paths when possible.' }],
        },
    });

    const testcases: TestCase[] = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'testcases.json'), 'utf-8')
    );

    const filter = process.argv.find(a => a.startsWith('--filter='));
    const filterVal = filter?.split('=')[1]?.toLowerCase();
    const selected = filterVal
        ? testcases.filter(t => t.id.toLowerCase().includes(filterVal) || t.subsystem.toLowerCase().includes(filterVal))
        : testcases;

    console.error(`Running ${selected.length} baseline questions with ${modelName} (NO tools)...\n`);

    const baselineDir = path.join(PROJECT_ROOT, 'logs', 'baseline');
    fs.mkdirSync(baselineDir, { recursive: true });

    const results: BaselineResult[] = [];

    for (let i = 0; i < selected.length; i++) {
        const tc = selected[i];
        process.stderr.write(`  [${i + 1}/${selected.length}] ${tc.id}... `);

        try {
            const result = await model.generateContent(tc.question);
            const answer = result.response.text();
            const usage = result.response.usageMetadata;

            const tokens = {
                prompt: usage?.promptTokenCount ?? 0,
                candidates: usage?.candidatesTokenCount ?? 0,
                total: usage?.totalTokenCount ?? 0,
            };

            results.push({
                id: tc.id,
                question: tc.question,
                questionType: tc.questionType,
                subsystem: tc.subsystem,
                answer,
                tokens,
            });

            const md = `# ${tc.question}\n\n## Baseline Answer (no tools)\n\n${answer}\n\n## Metrics\n\n| Metric | Value |\n|--------|-------|\n| Tokens | ${tokens.total.toLocaleString()} |\n| Model | ${modelName} |\n| Tools | NONE |\n`;
            fs.writeFileSync(path.join(baselineDir, `${tc.id}.md`), md, 'utf-8');

            console.error(`OK (${tokens.total} tokens)`);

            if (i < selected.length - 1) {
                await new Promise(r => setTimeout(r, 4500));
            }
        } catch (e: any) {
            console.error(`ERROR: ${e?.message?.slice(0, 100)}`);
            results.push({
                id: tc.id,
                question: tc.question,
                questionType: tc.questionType,
                subsystem: tc.subsystem,
                answer: `ERROR: ${e?.message}`,
                tokens: { prompt: 0, candidates: 0, total: 0 },
            });
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    // Generate summary report
    const totalTokens = results.reduce((s, r) => s + r.tokens.total, 0);
    const avgTokens = totalTokens / results.length;

    const lines: string[] = [];
    lines.push(`# Baseline Eval Report (No Tools)\n`);
    lines.push(`${new Date().toLocaleString('en-US')} | Model: ${modelName} | Testcases: ${results.length}\n`);
    lines.push(`## Summary\n`);
    lines.push(`| Metric | Value |`);
    lines.push(`|--------|-------|`);
    lines.push(`| Avg tokens / question | ${Math.round(avgTokens).toLocaleString()} |`);
    lines.push(`| Total tokens | ${totalTokens.toLocaleString()} |`);
    lines.push(`| Tools | NONE |`);
    lines.push('');

    lines.push(`## Per-Question\n`);
    lines.push(`| # | ID | Type | Subsystem | Tokens | Words |`);
    lines.push(`|---|---|---|---|------:|------:|`);
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const words = r.answer.split(/\s+/).length;
        lines.push(`| ${i + 1} | ${r.id} | ${r.questionType} | ${r.subsystem} | ${r.tokens.total.toLocaleString()} | ${words} |`);
    }

    const reportPath = path.join(PROJECT_ROOT, 'logs', 'baseline-eval.md');
    fs.writeFileSync(reportPath, lines.join('\n'), 'utf-8');
    console.error(`\nReport: ${reportPath}`);
    console.error(`Answers: logs/baseline/`);
    console.log(`\n${results.length} answers | ${totalTokens.toLocaleString()} total tokens`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
