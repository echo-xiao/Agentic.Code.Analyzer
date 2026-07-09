// plan — declares the question's intent and returns the recipe. For mechanism/flow intents it ALSO
// fetches the grounded DeepWiki architecture map up front — agents don't reliably call wiki on their own
// (wiki-called questions PASS ~65% vs ~38% when skipped), so plan hands them the map and steers them to
// CONFIRM the named symbols via search/graph rather than answer from the overview. Never touches the index.
import { SESSION } from '../session.js';
import { classifyIntent, isIntent, RECIPES } from '../intent.js';
import type { Intent } from '../intent.js';
import { askWiki } from './wiki.js';
import { candidateMap } from '../engine/entry-map.js';

// Intents whose answer is a cross-layer mechanism/flow — the DeepWiki map pays off most here.
// locate/pattern (find-a-thing / how-to) are left to the agent; pattern especially is wiki-gap-prone.
const WIKI_INTENTS: ReadonlySet<string> = new Set(['architecture', 'call-chain', 'routing', 'impact']);

export async function runPlan(args: { question?: string; intent?: string }): Promise<string> {
    const question = args.question ?? '';
    if (!question && !args.intent) return 'Missing parameter: question';

    // Priority: eval oracle > agent's own claim > keyword classification.
    let intent: Intent;
    const forced = SESSION.forceIntent ?? (isIntent(process.env.FORCE_INTENT) ? process.env.FORCE_INTENT : null);
    if (forced) intent = forced;
    else if (isIntent(args.intent)) intent = args.intent;
    else intent = classifyIntent(question);

    SESSION.intent = intent;
    const r = RECIPES[intent];
    const lines = [
        `🧭 intent: **${intent}**`,
        `strategy: ${r.strategy}`,
        `defaults: graph(move="${r.move}", depth=${r.depth}) — override per call if the trail demands it.`,
    ];
    // 候选地图（entrySeeds 通道）：离线游走的候选文件面直接进开局上下文——agent 的检索面
    // 实测只有游走器的一半（46 vs 85 / 144 个答案文件），把候选喂进来让预算花在验证上。
    // WIKI_INTENTS 分支下面会附 askWiki（离线版，已含候选），此处只给其余意图附，避免重复。
    if (question && !WIKI_INTENTS.has(intent)) {
        const cm = await candidateMap(question);
        if (cm) lines.push(cm);
    }
    if (question && WIKI_INTENTS.has(intent)) {
        // Force-fetch the architecture map so the agent always has it (it under-calls wiki on its own).
        const map = await askWiki(question);
        lines.push(
            `\n## 📐 Architecture map (offline wiki-map)\n${map}`,
            `\n**Next:** the map above is an OVERVIEW — do NOT answer from it alone. For each symbol/file it names, confirm in THIS codebase via search/graph/details (all listed paths are index-verified, but still confirm the symbols), then write the full chain including entry points and post-save/downstream steps.`,
        );
    } else {
        lines.push(
            `**Next:** search("<entry symbol or keyword>") → graph("<seed>") → details on 1-2 key symbols. Call wiki("${question || '<your question>'}") if you need a high-level architecture overview.`,
        );
    }
    return lines.join('\n');
}
