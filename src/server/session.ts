// Per-process session state: the declared intent (control plane) plus call metering.
import type { Intent } from './intent.js';

export const SESSION = {
    startTime: Date.now(),
    calls: [] as Array<{ tool: string; symbol?: string; tokensReturned: number; ts: number }>,
    symbolHits: new Map<string, number>(),
    totalSkeletonTokens: 0,
    hasCalledSearchOrGraph: false,
    // Set by the plan tool; graph reads it for default move/depth when the agent omits them.
    intent: null as Intent | null,
    // Set by plan; graph(expand) reads it to embed for semantic-RRF ranking of the neighbourhood.
    question: null as string | null,
    // Oracle override (eval harnesses set this per-testcase to measure the routing ceiling).
    forceIntent: null as Intent | null,
};

export function trackCall(tool: string, response: string, symbol?: string) {
    const tokens = Math.ceil(response.length / 4);
    SESSION.calls.push({ tool, symbol, tokensReturned: tokens, ts: Date.now() });
    SESSION.totalSkeletonTokens += tokens;
    if (symbol) {
        SESSION.symbolHits.set(symbol, (SESSION.symbolHits.get(symbol) ?? 0) + 1);
    }
    console.error(`[TOOL_CALL] tool=${tool} symbol=${symbol ?? '-'} tokens=${tokens} ts=${new Date().toISOString()}`);
}

process.on('exit', () => {
    const duration = ((Date.now() - SESSION.startTime) / 1000).toFixed(1);
    const repeated = Array.from(SESSION.symbolHits.values()).filter(c => c > 1).length;
    const total = SESSION.symbolHits.size;
    const hotSymbols = Array.from(SESSION.symbolHits.entries())
        .sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([s, c]) => `${s}(×${c})`).join(', ');

    console.error([
        '',
        '=== SESSION SUMMARY ===',
        `duration        : ${duration}s`,
        `total_calls     : ${SESSION.calls.length}`,
        `skeleton_tokens : ${SESSION.totalSkeletonTokens}`,
        `repeat_rate     : ${total > 0 ? (repeated / total * 100).toFixed(1) : 0}% (${repeated}/${total})`,
        `hot_symbols     : ${hotSymbols || 'none'}`,
        '======================',
    ].join('\n'));
});
