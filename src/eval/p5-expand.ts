#!/usr/bin/env npx tsx
/**
 * p5-expand.ts — P5 Task 4: offline query expansion / candidate cache
 *
 * For each testcase, calls a real LLM (Claude Haiku) to expand the question into
 * implementation symbols + candidate module ids, then grounds them against the
 * real index (red-line: only real symbols/modules kept).
 *
 * Output: src/eval/utils/query-expansions.json  (keys = testcase id)
 *
 * Usage (paid run, done by controller):
 *   npm run p5:expand
 */

import '../eval/utils/load-env.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export interface Expansion {
  expandedSymbols: string[];
  candidateModules: string[];
}

/**
 * Ground raw LLM output against the real index.
 * Only keeps symbols that exist in `symbols` Set and modules that exist in `modules` Set.
 * This is the red-line: LLM hallucinations are silently dropped.
 */
export function ground(
  raw: { expandedSymbols?: string[]; candidateModules?: string[] },
  symbols: Set<string>,
  modules: Set<string>,
): Expansion {
  return {
    expandedSymbols: [...new Set(raw.expandedSymbols ?? [])].filter(s => symbols.has(s)),
    candidateModules: [...new Set(raw.candidateModules ?? [])].filter(m => modules.has(m)),
  };
}

/**
 * Call the LLM for a single question, then ground the result.
 */
export async function expandOne(
  question: string,
  llm: (q: string) => Promise<{ expandedSymbols: string[]; candidateModules: string[] }>,
  symbols: Set<string>,
  modules: Set<string>,
): Promise<Expansion> {
  return ground(await llm(question), symbols, modules);
}

// ── CLI ───────────────────────────────────────────────────────────────────────

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  async function main() {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const { ensureIndex } = await import('../indexer/index.js');
    const { GLOBAL_INDEX } = await import('../indexer/state.js');
    const { loadTestcases } = await import('./utils/load-testcases.js');
    const { MODEL_TIERS, MODULE_GRAPH_PATH } = await import('../config.js');

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      console.error('[p5:expand] ANTHROPIC_API_KEY not set — aborting.');
      process.exit(1);
    }
    const client = new Anthropic({ apiKey });

    // Build symbol set from GLOBAL_INDEX
    console.error('[p5:expand] Loading index...');
    await ensureIndex();
    const symbols = new Set<string>(GLOBAL_INDEX.symbols.keys());
    console.error(`[p5:expand] Index ready: ${symbols.size} symbols.`);

    // Build module set from module-graph.json
    const moduleGraph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8'));
    const modules = new Set<string>((moduleGraph.modules as Array<{ id: string }>).map(m => m.id));
    console.error(`[p5:expand] Module graph loaded: ${modules.size} modules.`);

    // Load testcases
    const tcPath = path.join(__dirname, 'utils', 'testcases.json');
    const { flat: testcases } = loadTestcases(tcPath);
    console.error(`[p5:expand] Testcases: ${testcases.length}`);

    // Real LLM function
    const llm = async (question: string): Promise<{ expandedSymbols: string[]; candidateModules: string[] }> => {
      const prompt = `You are helping analyze the Rocket.Chat codebase.

Given the question: "${question}"

Identify:
1. Implementation symbols (function names, class names, method names, variable names, type names) that would likely be involved in answering this question.
2. Module IDs from the codebase that are likely relevant to this question.

Output ONLY a JSON object with this exact shape:
{
  "expandedSymbols": ["symbol1", "symbol2", ...],
  "candidateModules": ["module-id-1", "module-id-2", ...]
}

List 5-15 expanded symbols and 2-8 candidate module ids. Output ONLY the JSON, no prose.`;

      const resp = await client.messages.create({
        model: MODEL_TIERS.leaf,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const block = (resp.content as any[]).find((b: any) => b.type === 'text');
      const text: string = block?.text ?? '{}';

      // Extract JSON from response (strip any prose wrapping)
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error(`[p5:expand] No JSON found in response for question: ${question.slice(0, 60)}`);
        return { expandedSymbols: [], candidateModules: [] };
      }

      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.error(`[p5:expand] JSON parse error: ${e}`);
        return { expandedSymbols: [], candidateModules: [] };
      }
    };

    // Process each testcase
    const expansions: Record<string, Expansion> = {};
    for (let i = 0; i < testcases.length; i++) {
      const tc = testcases[i];
      console.error(`[p5:expand] [${i + 1}/${testcases.length}] ${tc.id}`);
      try {
        expansions[tc.id] = await expandOne(tc.question, llm, symbols, modules);
        console.error(`  → symbols: ${expansions[tc.id].expandedSymbols.length}, modules: ${expansions[tc.id].candidateModules.length}`);
      } catch (e: any) {
        console.error(`  → ERROR: ${e?.message}`);
        expansions[tc.id] = { expandedSymbols: [], candidateModules: [] };
      }

      // Brief pause to avoid rate limiting
      if (i < testcases.length - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Write output
    const outPath = path.join(__dirname, 'utils', 'query-expansions.json');
    fs.writeFileSync(outPath, JSON.stringify(expansions, null, 2), 'utf-8');
    console.error(`[p5:expand] Wrote ${Object.keys(expansions).length} expansions to ${outPath}`);
  }

  main().catch(e => {
    console.error('[p5:expand] Fatal:', e);
    process.exit(1);
  });
}
