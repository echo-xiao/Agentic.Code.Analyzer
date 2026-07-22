// src/eval/summarize-modules.ts
import './utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { assembleModuleInput, buildModulePrompt, MODULE_SUMMARY_SCHEMA } from './module-summary.js';
import { DATA_DIR, MODULE_GRAPH_PATH } from '../config.js';
import { runPool, callWithRetry } from './utils/pool.js';

export const MODEL_MODULE = 'claude-sonnet-4-6';
const OUT_DIR = path.join(DATA_DIR, 'summaries');
const OUT = path.join(OUT_DIR, 'module-summaries.json');
const FS_PATH = path.join(OUT_DIR, 'file-summaries.json');
const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

export async function summarizeModules(): Promise<number> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) { console.error('[module:summarize] no ANTHROPIC_API_KEY — skipping.'); return 0; }
  let graph, fileSummaries;
  try { graph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8')); fileSummaries = JSON.parse(fs.readFileSync(FS_PATH, 'utf-8')); }
  catch { console.error('[module:summarize] missing module-graph or file-summaries — run module:build / summaries:gen first.'); return 0; }
  const client = new Anthropic({ apiKey });
  const store: Record<string, any> = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
  const limit = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  let mods = graph.modules as any[];
  if (limit) mods = mods.slice(0, Number(limit));
  const CONCURRENCY = Number(process.env.MODULE_CONCURRENCY || 6);
  const pending = mods.map(mod => {
    const input = assembleModuleInput(mod, fileSummaries, graph);
    const memberHash = sha1(input.fileSummaries.map((f: any) => (fileSummaries[f.file]?.hash ?? '')).join('|'));
    return { mod, input, memberHash };
  }).filter(x => store[x.mod.id]?.hash !== x.memberHash);
  console.error(`[module:summarize] to generate ${pending.length} / ${mods.length} (concurrency ${CONCURRENCY})`);
  let done = 0;
  await runPool(pending, CONCURRENCY, async ({ mod, input, memberHash }) => {
    try {
      const resp = await callWithRetry(() => client.messages.create({
        model: MODEL_MODULE, max_tokens: 4096,
        messages: [{ role: 'user', content: buildModulePrompt(input) }],
        output_config: { format: { type: 'json_schema', schema: MODULE_SUMMARY_SCHEMA } },
      } as any));
      const block = (resp.content as any[]).find(b => b.type === 'text');
      const out = JSON.parse(block.text);
      store[mod.id] = { hash: memberHash, ...out };
      done++;
      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(OUT, JSON.stringify(sortKeys(store), null, 1), 'utf-8');   // flush on each success → resumable (hash skips completed ones)
      if (done % 10 === 0) console.error(`[module:summarize] ${done}/${pending.length}...`);
    } catch (e: any) { console.error(`[module:summarize] ${mod.id} failed: ${e?.message?.slice(0,100)}`); }
  });
  fs.mkdirSync(OUT_DIR, { recursive: true }); fs.writeFileSync(OUT, JSON.stringify(sortKeys(store), null, 1), 'utf-8');
  console.error(`[module:summarize] added/updated ${done} · stored ${Object.keys(store).length} → ${OUT}`);
  return done;
}
function sortKeys(o: Record<string, any>) { const r: Record<string, any> = {}; for (const k of Object.keys(o).sort()) r[k] = o[k]; return r; }
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) summarizeModules().catch(e => { console.error('Fatal:', e); process.exit(2); });
