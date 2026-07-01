// plan — the control-plane tool. The agent declares what KIND of question it is answering; the
// server records the intent so graph can pick sensible default move/depth. Never touches the index.
import { SESSION } from '../session.js';
import { classifyIntent, isIntent, RECIPES } from '../intent.js';
import type { Intent } from '../intent.js';

export function runPlan(args: { question?: string; intent?: string }): string {
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

    return [
        `🧭 intent: **${intent}**`,
        `strategy: ${r.strategy}`,
        `defaults: graph(move="${r.move}", depth=${r.depth}) — override per call if the trail demands it.`,
        `**Next:** search("<entry symbol or keyword>") → graph("<seed>")`,
    ].join('\n');
}
