// wiki — offline architecture answer: section-level prose (offline cache of the self-generated wiki, option 1) + structure map + path-grounding footnote.
// Zero network at runtime (self-generated wiki). Prose is consumed only in this file (invariant: walker/eval never import wiki-prose).
// Round-C evidence: the value of prose = feeding mechanism-chain symbol names to the agent as query terms — this file is responsible for preserving that value offline.
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

// Section scoring: title score ×1.2 + body max over lines (running fuzzysort on a whole long block saturates and distorts)
function scoreSection(tokens: string[], section: string, text: string): number {
    let body = 0;
    for (const line of text.split('\n')) { const s = scoreString(tokens, line); if (s > body) body = s; }
    return 1.2 * scoreString(tokens, section) + body;
}

// Path-grounding footnote (restored from the old online version): verify the paths in the prose exist in the index, and explicitly flag drifted paths as not-to-cite
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
    const structure = await offlineWikiAnswer(question);
    const m = await matchPages(question);
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
        if (parts.length) proseBlock = `## 📖 Architecture notes (offline cache of self-generated architecture wiki, matched to your question)\n\n${parts.join('\n\n')}\n\n`;
    }
    const out = proseBlock + (structure ?? '');
    if (!out.trim()) return 'No architecture-map hit for this question — use search/graph/details directly.';
    return ground(out);
}
