// Intent → move policy: the question-type knowledge, encoded as data instead of prose.
// plan writes SESSION.intent using this table; graph reads it for default move/depth.
//
// The intents mirror the answer SHAPE the question demands:
//   architecture = map · call-chain = ordered chain · routing = cross-boundary dispatch map ·
//   locate/pattern = a point · impact = blast radius.

export type Intent = 'architecture' | 'call-chain' | 'locate' | 'pattern' | 'routing' | 'impact';
export type Move = 'expand' | 'down' | 'up';

export interface Recipe {
    move: Move;
    depth: number;
    strategy: string;   // one line the agent can act on
}

export const RECIPES: Record<Intent, Recipe> = {
    architecture: { move: 'expand', depth: 2, strategy: 'Map the subsystem: search the entry symbol, graph(expand) for the wide neighborhood, then details on 1-2 hubs. Answer = a component map with file paths.' },
    routing:      { move: 'expand', depth: 2, strategy: 'Find both sides of the dispatch boundary: search the route/event name, graph(expand) surfaces client + server via string-keyed edges. Answer = who dispatches, who handles.' },
    locate:       { move: 'expand', depth: 1, strategy: 'Pinpoint the definition: search the symbol, graph(expand) shallow to confirm context. Answer = exact file(s) + role.' },
    pattern:      { move: 'expand', depth: 1, strategy: 'Find one canonical example: search the API name, graph(expand) shallow for a real usage site. Answer = the recipe with a concrete file.' },
    'call-chain': { move: 'down',   depth: 5, strategy: 'Trace the chain: search the entry symbol, graph(down) for the ordered callee tree. Answer = Entry → step → … → end, every hop with its file.' },
    impact:       { move: 'up',     depth: 5, strategy: 'Measure the blast radius: search the symbol, graph(up) for layered dependents (dynamic edges included). Answer = who breaks, grouped by hop.' },
};

// First hit wins; checked in order (most specific phrasing first). No hit → architecture (when
// unsure, map wide). These are DEFAULTS — the agent can always pass an explicit move to graph.
const KEYWORDS: Array<{ intent: Intent; words: string[] }> = [
    { intent: 'impact',      words: ['what breaks', 'break if', 'impact', 'affected', 'blast radius', 'who depends', 'regress', 'if i change', 'if we change'] },
    { intent: 'call-chain',  words: ['call chain', 'end to end', 'end-to-end', 'step by step', 'trace the', 'what happens when', 'flow of', 'chain of calls', 'from click to'] },
    { intent: 'routing',     words: ['routing', 'routed', 'dispatch', 'which handler', 'webhook', 'reach the server', 'endpoint for', 'how does the request'] },
    { intent: 'pattern',     words: ['how do i add', 'how to add', 'how do i create', 'how to create', 'how do i register', 'convention', 'pattern for', 'example of', 'boilerplate', 'a new '] },
    { intent: 'locate',      words: ['where is', 'where are', 'which file', 'where does', 'where do', 'defined', 'implemented where', 'find the file', 'located'] },
    { intent: 'architecture', words: ['architecture', 'overview', 'how does', 'how is', 'structured', 'components', 'subsystem', 'work internally'] },
];

export function classifyIntent(question: string): Intent {
    const q = question.toLowerCase();
    for (const { intent, words } of KEYWORDS) {
        if (words.some(w => q.includes(w))) return intent;
    }
    return 'architecture';
}

export const INTENTS = Object.keys(RECIPES) as Intent[];

export function isIntent(x: unknown): x is Intent {
    return typeof x === 'string' && (INTENTS as string[]).includes(x);
}
