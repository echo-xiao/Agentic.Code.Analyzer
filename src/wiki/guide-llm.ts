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
  // Tolerate prose/fences the LLM wraps around the output: extract the first complete JSON value
  for (const [open, close] of [['[', ']'], ['{', '}']] as const) {
    const i = t.indexOf(open), j = t.lastIndexOf(close);
    if (i >= 0 && j > i) { try { return JSON.parse(t.slice(i, j + 1)); } catch { /* try next */ } }
  }
  return fallback;
}

const TAX_TEXT = TAXONOMY.map(t => `- "${t.l1}": L2 ∈ [${t.areas.join(', ')}]`).join('\n');

export function makeClassify(client: AnthropicLike = real()): Classify {
  return async (pages: RouteInput[]): Promise<Routed[]> => {
    const prompt = `Route each page to a developer intent. Pick exactly one L1 and one L2 from its allowed set:\n${TAX_TEXT}\nDecide by title + scope. Output only a JSON array [{id,l1,l2}].\npages: ${JSON.stringify(pages.map(p => ({ id: p.id, title: p.title, scope: p.scope })))}`;
    const res = await client.messages.create({ model: MODEL_TIERS.leaf, max_tokens: 8192, temperature: 0, messages: [{ role: 'user', content: prompt }] });
    return parse<Routed[]>(textOf(res), []);
  };
}

export function makeNameClusters(client: AnthropicLike = real()): NameClusters {
  return async (bucket: string, clusters: string[][], pages: Record<string, FamilyInput>) => {
    const view = clusters.map((ids, i) => ({ cluster: i, titles: ids.map(id => pages[id]?.title) }));
    const prompt = `Name each cluster below with a short English family label (2-4 words, e.g. "Auth & Permissions", "Messaging & Rooms"). Output only JSON {families:[{name,ids}]}; use the original member ids.\nclusters: ${JSON.stringify(view)}\nid map: ${JSON.stringify(clusters)}`;
    const res = await client.messages.create({ model: MODEL_TIERS.leaf, max_tokens: 4096, temperature: 0, messages: [{ role: 'user', content: prompt }] });
    const out = parse<{ families: { name: string; ids: string[] }[] }>(textOf(res), { families: clusters.map((ids, i) => ({ name: `Group ${i + 1}`, ids })) });
    return out.families;
  };
}
