// src/eval/summarize-modules.ts
import './utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { assembleModuleInput, buildModulePrompt, MODULE_SUMMARY_SCHEMA } from './module-summary.js';
import { DATA_DIR, MODULE_GRAPH_PATH } from '../config.js';

export const MODEL_MODULE = 'claude-sonnet-4-6';
const OUT_DIR = path.join(DATA_DIR, 'summaries');
const OUT = path.join(OUT_DIR, 'module-summaries.json');
const FS_PATH = path.join(OUT_DIR, 'file-summaries.json');
const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

export async function summarizeModules(): Promise<number> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) { console.error('[module:summarize] 无 ANTHROPIC_API_KEY — 跳过。'); return 0; }
  let graph, fileSummaries;
  try { graph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8')); fileSummaries = JSON.parse(fs.readFileSync(FS_PATH, 'utf-8')); }
  catch { console.error('[module:summarize] 缺 module-graph 或 file-summaries — 先 module:build / summaries:gen。'); return 0; }
  const client = new Anthropic({ apiKey });
  const store: Record<string, any> = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
  const limit = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  let mods = graph.modules as any[];
  if (limit) mods = mods.slice(0, Number(limit));
  let done = 0;
  for (const mod of mods) {
    const input = assembleModuleInput(mod, fileSummaries, graph);
    const memberHash = sha1(input.fileSummaries.map(f => (fileSummaries[f.file]?.hash ?? '')).join('|'));
    if (store[mod.id]?.hash === memberHash) continue;
    try {
      const resp = await client.messages.create({
        model: MODEL_MODULE, max_tokens: 4096,
        messages: [{ role: 'user', content: buildModulePrompt(input) }],
        output_config: { format: { type: 'json_schema', schema: MODULE_SUMMARY_SCHEMA } },
      } as any);
      const block = (resp.content as any[]).find(b => b.type === 'text');
      const out = JSON.parse(block.text);
      store[mod.id] = { hash: memberHash, ...out };
      done++;
      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(OUT, JSON.stringify(sortKeys(store), null, 1), 'utf-8');   // 每成功即落盘 → 中断可断点续(hash 增量跳过已完成)
    } catch (e: any) { console.error(`[module:summarize] ${mod.id} 失败: ${e?.message?.slice(0,100)}`); }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true }); fs.writeFileSync(OUT, JSON.stringify(sortKeys(store), null, 1), 'utf-8');
  console.error(`[module:summarize] 新增/更新 ${done} · 库存 ${Object.keys(store).length} → ${OUT}`);
  return done;
}
function sortKeys(o: Record<string, any>) { const r: Record<string, any> = {}; for (const k of Object.keys(o).sort()) r[k] = o[k]; return r; }
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) summarizeModules().catch(e => { console.error('Fatal:', e); process.exit(2); });
