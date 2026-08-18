#!/usr/bin/env npx tsx
// Benchmark entry: run every testcase through the pipeline and write a run report to `runs/`.
// Split out of run.ts so runQuestion() can be imported by a second entry (the MCP server)
// without a module-level side effect that starts a 34-question benchmark.
//
// A 6s pause between questions keeps a 3-call question inside the Gemini free-tier RPM.
import '../eval/utils/load-env.js';   // side effect: .env -> process.env, before GeminiClient reads the key
import * as fs from 'fs';
import { loadIndex } from '../indexer/load.js';
import { loadAllSections } from '../deepwiki/sections.js';
import { runQuestion } from './run.js';
import { renderReport, nextReportPath, type RunRow } from './report.js';
import { GeminiClient } from './llm.js';
import { askDeepWiki } from '../deepwiki/ask.js';
import { loadTestcases } from '../eval/utils/load-testcases.js';
import { TESTCASES_PATH } from '../eval/utils/truth-io.js';

const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.split('=')[1];
const filter = arg('filter') ?? '';
const limit = Number(arg('limit') ?? Infinity);
const budget = arg('budget') !== undefined ? Number(arg('budget')) : undefined;
// The graph shards are the index; `npm run build:graph` regenerates them. Loading is a read
// of 71 files, so there is no cache to warm and no per-file mapping to re-parse.
const shardCount = loadIndex();
if (shardCount === 0) {
    console.error('No graph shards found. Build the index with `npm run prewarm`.');
    process.exit(1);
}
console.error(`index: ${shardCount} shards`);
const sections = loadAllSections();
const cases = loadTestcases(TESTCASES_PATH).flat.filter(c => c.id.includes(filter)).slice(0, limit);
const rows: RunRow[] = [];
for (const c of cases) {
    const llm = new GeminiClient();                                           // fresh counter per question
    console.error(`[${c.id}] ...`);
    try {
        rows.push(await runQuestion(c.id, c.question, { llm, sections, deepwikiFn: askDeepWiki, budgetTokens: budget }));
    } catch (e) { console.error(`[${c.id}] FAILED: ${e}`); }
    await new Promise(r => setTimeout(r, 6000));
}
const runsDir = 'runs';
fs.mkdirSync(runsDir, { recursive: true });
const file = nextReportPath(runsDir);
fs.writeFileSync(file, renderReport(rows));
console.error(`Wrote ${file} (${rows.length} questions)`);
