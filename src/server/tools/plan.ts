// plan — the control-plane tool (the "architect"). The agent declares what KIND of question it is
// answering; plan records the intent (so graph can pick default move/depth) AND — matching the WHOLE
// question against the architecture map — hands back the relevant subsystem hint BEFORE the agent
// searches. This is the one tool that sees the full question, so architecture routing lives here (not
// injected into search/graph results after the fact). Never touches the index.
import { SESSION } from '../session.js';
import { classifyIntent, isIntent, RECIPES } from '../intent.js';
import type { Intent } from '../intent.js';
import { routeSubsystem } from '../architecture/match.js';

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
    // Architecture routing: match the WHOLE question against the subsystem map, delivered up front,
    // with concrete index-validated seed symbols so the agent searches the right name from the start.
    const arch = routeSubsystem(question);
    const next = arch && arch.seedSymbols.length
        ? `**Next:** search("${arch.seedSymbols[0]}")${arch.seedSymbols.length > 1 ? ` — also: ${arch.seedSymbols.slice(1).join(', ')}` : ''} → graph("<seed>")`
        : `**Next:** search("<entry symbol or keyword>") → graph("<seed>")`;

    return [
        `🧭 intent: **${intent}**`,
        arch ? `\n📐 architecture:\n${arch.flow}\n` : '',
        `strategy: ${r.strategy}`,
        `defaults: graph(move="${r.move}", depth=${r.depth}) — override per call if the trail demands it.`,
        next,
    ].filter(Boolean).join('\n');
}
