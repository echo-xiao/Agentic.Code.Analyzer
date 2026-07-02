// graph — the one traversal tool. move selects the shape: expand = ranked neighborhood (map),
// down = ordered callee tree (chain), up = layered dependents (blast radius). Defaults come from
// SESSION.intent (set by plan); explicit arguments always win.
import { SESSION } from '../session.js';
import { RECIPES } from '../intent.js';
import type { Move } from '../intent.js';
import { lexicalSeeds } from '../engine/seeds.js';
import { expandNeighborhood } from '../engine/expand.js';
import { graphDown } from '../engine/down.js';
import { graphUp } from '../engine/up.js';
import { relPath } from '../engine/common.js';

const MOVES: Move[] = ['expand', 'down', 'up'];
const DEFAULT_DEPTH: Record<Move, number> = { expand: 2, down: 4, up: 4 };

export interface GraphArgs {
    query?: string; move?: string; depth?: number; layer?: string; edgeTypes?: string[]; file?: string;
}

export function runGraph(args: GraphArgs): string {
    const { query, layer, edgeTypes, file } = args;
    if (!query) return 'Missing parameter: query';
    SESSION.hasCalledSearchOrGraph = true;

    const recipe = SESSION.intent ? RECIPES[SESSION.intent] : null;
    const move: Move = MOVES.includes(args.move as Move)
        ? (args.move as Move)
        : (recipe?.move ?? 'expand');
    const rawDepth = typeof args.depth === 'number'
        ? args.depth
        : (recipe && recipe.move === move ? recipe.depth : DEFAULT_DEPTH[move]);
    const depth = Math.min(rawDepth, 6);

    if (move === 'down') return graphDown(query, { depth, layer, edgeTypes, file });
    if (move === 'up') return graphUp(query, { depth, layer, edgeTypes, file });

    // expand — ranked subsystem neighborhood around the lexical seeds.
    const ranked = expandNeighborhood(lexicalSeeds(query, layer), { maxHop: depth, limit: 15 });
    if (ranked.length === 0) {
        return `No neighborhood found for "${query}". Use search to find a seed symbol first.`;
    }
    const lines: string[] = [];
    const seenPaths = new Set<string>();
    let rank = 1;
    for (const r of ranked) {
        const p = r.paths[0];
        if (!p || seenPaths.has(p)) continue;
        seenPaths.add(p);
        const tag = r.hop === 0 ? 'seed' : `${r.hop} hop${r.hop > 1 ? 's' : ''}`;
        lines.push(`${rank}. ${relPath(p)}  ·  \`${r.symbolName}\` (${tag})`);
        rank++;
    }
    const body = `🧭 Subsystem (ranked by graph proximity to \`${query}\`, depth=${depth}):\n${lines.join('\n')}`;
    const navHint = `\n\n💡 **Next:** details("<symbol>", "<file>") on 1-2 key hits, or graph("${query}", move="down") for the call order.`;
    return body + navHint;
}
