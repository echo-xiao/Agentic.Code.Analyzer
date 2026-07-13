import Anthropic from '@anthropic-ai/sdk';
import { MODEL_TIERS } from '../config.js';
import { TAXONOMY } from './taxonomy.js';
import type { Classify, RouteInput, Routed } from './route.js';
import type { NameClusters, FamilyInput } from './families.js';

export interface AnthropicLike { messages: { create(args: any): Promise<any> } }
const real = (): AnthropicLike => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY }) as unknown as AnthropicLike;
const textOf = (res: any): string => (res?.content ?? []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('');
function parse<T>(s: string, fallback: T): T {
  const t = s.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try { return JSON.parse(t); } catch { /* fall through */ }
  // 容忍 LLM 前后夹带散文/围栏:提取第一个完整 JSON 值
  for (const [open, close] of [['[', ']'], ['{', '}']] as const) {
    const i = t.indexOf(open), j = t.lastIndexOf(close);
    if (i >= 0 && j > i) { try { return JSON.parse(t.slice(i, j + 1)); } catch { /* try next */ } }
  }
  return fallback;
}

const TAX_TEXT = TAXONOMY.map(t => `- "${t.l1}": 区 ∈ [${t.areas.join(', ')}]`).join('\n');

export function makeClassify(client: AnthropicLike = real()): Classify {
  return async (pages: RouteInput[]): Promise<Routed[]> => {
    const prompt = `把每页路由到开发者意图。L1 严格三选一、L2 从对应集合选：\n${TAX_TEXT}\n判断依据 title+scope。只输出 JSON 数组 [{id,l1,l2}]。\n页面：${JSON.stringify(pages.map(p => ({ id: p.id, title: p.title, scope: p.scope })))}`;
    const res = await client.messages.create({ model: MODEL_TIERS.leaf, max_tokens: 8192, temperature: 0, messages: [{ role: 'user', content: prompt }] });
    return parse<Routed[]>(textOf(res), []);
  };
}

export function makeNameClusters(client: AnthropicLike = real()): NameClusters {
  return async (bucket: string, clusters: string[][], pages: Record<string, FamilyInput>) => {
    const view = clusters.map((ids, i) => ({ cluster: i, titles: ids.map(id => pages[id]?.title) }));
    const prompt = `给 "${bucket}" 下每个簇起简短中文家族名(≤6字)。只输出 JSON {families:[{name,ids}]}，ids 用原簇成员 id。\n簇：${JSON.stringify(view)}\nid 映射：${JSON.stringify(clusters)}`;
    const res = await client.messages.create({ model: MODEL_TIERS.leaf, max_tokens: 4096, temperature: 0, messages: [{ role: 'user', content: prompt }] });
    const out = parse<{ families: { name: string; ids: string[] }[] }>(textOf(res), { families: clusters.map((ids, i) => ({ name: `族${i}`, ids })) });
    return out.families;
  };
}
