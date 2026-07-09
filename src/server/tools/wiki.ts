// wiki — 离线架构回答：章节级散文（DeepWiki 散文的离线缓存，方案1）+ 结构地图 + 路径验真脚注。
// 运行期零 DeepWiki/零网络。散文只在本文件消费（红线：walker/eval 永不 import wiki-prose）。
// C 轮实证：散文的价值 = 把机制链符号名喂给 agent 当查询词——本文件负责把这个价值离线留住。
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { scoreString } from '../engine/walker/affinity.js';
import { offlineWikiAnswer, matchPages } from '../engine/entry-map.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROSE_PATH = path.resolve(__dirname, '..', '..', '..', 'data', 'wiki-prose.json');
const TOP_SECTIONS = 4, SECTION_CAP = 2000, TOTAL_CAP = 5000;

let proseCache: Record<string, Array<{ section: string; text: string }>> | null | undefined;
function loadProse() {
    if (proseCache !== undefined) return proseCache;
    try { proseCache = JSON.parse(fs.readFileSync(PROSE_PATH, 'utf-8')); } catch { proseCache = null; }
    return proseCache;
}

// 章节打分：标题分×1.2 + 正文逐行取最大（整段长文直接 fuzzysort 会饱和失真）
function scoreSection(tokens: string[], section: string, text: string): number {
    let body = 0;
    for (const line of text.split('\n')) { const s = scoreString(tokens, line); if (s > body) body = s; }
    return 1.2 * scoreString(tokens, section) + body;
}

// 路径验真脚注（恢复自旧在线版）：散文里的路径对索引验存在，漂移路径明示勿引
function ground(text: string): string {
    const paths = [...new Set([...text.matchAll(/(?:apps|packages|ee)\/[\w./-]+\.(?:tsx?|js)/g)].map(m => m[0]))];
    if (!paths.length) return text;
    const files = [...GLOBAL_INDEX.allFiles].map(f => f.replace(/\\/g, '/'));
    const real: string[] = [], fake: string[] = [];
    for (const p of paths) (files.some(f => f.endsWith('/' + p) || f.endsWith(p)) ? real : fake).push(p);
    let footer = `\n\n---\n[grounding] ${real.length}/${paths.length} cited paths verified in this codebase's index.`;
    if (fake.length) footer += `\n⚠️ NOT in this codebase (stale — do NOT cite): ${fake.join(', ')}`;
    footer += `\n→ Overview only: confirm each named symbol/file via search/graph/details before answering.`;
    return text + footer;
}

export async function askWiki(question: string): Promise<string> {
    if (!question) return 'Missing parameter: question';
    const structure = offlineWikiAnswer(question);
    const m = matchPages(question);
    const prose = loadProse();
    let proseBlock = '';
    if (m && prose) {
        const scored: Array<{ page: string; section: string; text: string; s: number }> = [];
        for (const page of m.pages) {
            for (const sec of (prose[page] ?? [])) {
                scored.push({ page, section: sec.section, text: sec.text, s: scoreSection(m.tokens, sec.section, sec.text) });
            }
        }
        scored.sort((a, b) => b.s - a.s || a.section.localeCompare(b.section));
        const parts: string[] = [];
        let budget = TOTAL_CAP;
        for (const sec of scored.slice(0, TOP_SECTIONS)) {
            if (budget <= 0) break;
            const t = sec.text.slice(0, Math.min(SECTION_CAP, budget));
            parts.push(`### ${sec.page} › ${sec.section}\n${t}`);
            budget -= t.length;
        }
        if (parts.length) proseBlock = `## 📖 Architecture notes (offline cache of DeepWiki prose, matched to your question)\n\n${parts.join('\n\n')}\n\n`;
    }
    const out = proseBlock + (structure ?? '');
    if (!out.trim()) return 'No architecture-map hit for this question — use search/graph/details directly.';
    return ground(out);
}
