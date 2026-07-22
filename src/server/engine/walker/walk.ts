// Autonomous walk: affinity-guided direction + self-assessed stopping. Direction and stopping share one signal (the frontier's lexical affinity to the question tokens).
// The stop decision never looks at gold files. Everything is dependency-injected (WalkCtx), unit-testable with a synthetic graph.
import { scoreString } from './affinity.js';

export type Move = 'expand' | 'down' | 'up';
export interface DirAdj { down: Map<string, Set<string>>; up: Map<string, Set<string>> }

export function buildDirectedAdjacency(callGraph: ReadonlyMap<string, ReadonlyArray<{ caller: string }>>): DirAdj {
    const down = new Map<string, Set<string>>();
    const up = new Map<string, Set<string>>();
    const add = (m: Map<string, Set<string>>, k: string, v: string) => {
        let s = m.get(k); if (!s) { s = new Set(); m.set(k, s); } s.add(v);
    };
    for (const [callee, refs] of callGraph) {
        for (const { caller } of refs) {
            if (caller === callee) continue;
            add(down, caller, callee);   // caller calls down into callee
            add(up, callee, caller);     // callee is called up by caller
        }
    }
    return { down, up };
}

export interface MoveOption { newFiles: number; affinity: number; topFiles: string[] }
export interface WalkRound {
    anchor: string; round: number;
    options: Record<Move, MoveOption>;
    chosen: Move | null; reason: string;
    result?: { newFiles: string[]; newFileCount: number; newSymbolCount: number; cumulativeFiles: number };
}
export interface WalkCtx { adj: DirAdj; filesOf: (sym: string) => string[]; symbolsOfFile: (f: string) => string[] }

export const DEFAULT_OPTS = { maxRounds: 8, minNewFiles: 3, minAffinity: 0.3, nodeCap: 6000 };
const MOVE_ORDER: Move[] = ['expand', 'down', 'up'];   // tie-break priority order

function neighborsOf(frontier: Set<string>, adj: DirAdj, move: Move): Set<string> {
    const out = new Set<string>();
    for (const s of frontier) {
        if (move === 'down' || move === 'expand') for (const n of adj.down.get(s) ?? []) out.add(n);
        if (move === 'up' || move === 'expand') for (const n of adj.up.get(s) ?? []) out.add(n);
    }
    return out;
}

export function walkFromSeed(
    seed: string, ctx: WalkCtx, tokens: string[],
    optsIn: Partial<typeof DEFAULT_OPTS> = {},
): WalkRound[] {
    const opts = { ...DEFAULT_OPTS, ...optsIn };
    const visitedSyms = new Set<string>([seed]);
    const visitedFiles = new Set<string>(ctx.filesOf(seed));
    let frontier = new Set<string>([seed]);
    const rounds: WalkRound[] = [];

    for (let round = 1; round <= opts.maxRounds; round++) {
        // 1) Preview all three directions
        const preview = {} as Record<Move, { syms: Set<string>; files: string[]; opt: MoveOption }>;
        for (const move of MOVE_ORDER) {
            const nextSyms = new Set([...neighborsOf(frontier, ctx.adj, move)].filter(s => !visitedSyms.has(s)));
            const fileSet = new Set<string>();
            for (const s of nextSyms) for (const f of ctx.filesOf(s)) if (!visitedFiles.has(f)) fileSet.add(f);
            const files = [...fileSet].sort((a, b) => scoreString(tokens, b) - scoreString(tokens, a) || a.localeCompare(b));
            // affinity = mean of the top-5 candidate scores (signal density). Can't take max: expand's neighbor set is a
            // superset of down∪up, so max(expand) is always ≥ max(any direction), and tie-breaking toward expand would degrade
            // direction selection into "always expand". Score per entity: each new symbol takes max(symbol-name score, its
            // highest new-file score) — a symbol and its files are the same entity, and mixing them into one pool double-counts and distorts the direction comparison.
            const entityScores = [...nextSyms].map(s => {
                let best = scoreString(tokens, s);
                for (const f of ctx.filesOf(s)) {
                    if (!fileSet.has(f)) continue;
                    const v = scoreString(tokens, f);
                    if (v > best) best = v;
                }
                return best;
            }).sort((a, b) => b - a);
            const topN = entityScores.slice(0, 5);
            const affinity = topN.length ? topN.reduce((s, v) => s + v, 0) / topN.length : 0;
            preview[move] = {
                syms: nextSyms, files,
                opt: { newFiles: files.length, affinity: Number(affinity.toFixed(3)), topFiles: files.slice(0, 3) },
            };
        }
        const options = { expand: preview.expand.opt, down: preview.down.opt, up: preview.up.opt };

        // 2) Choose direction: highest affinity, ties broken by MOVE_ORDER
        let best: Move = 'expand';
        for (const m of MOVE_ORDER) if (preview[m].opt.affinity > preview[best].opt.affinity) best = m;
        const bo = preview[best].opt;

        // 3) Self-assessed stopping (stop when any triggers, reason records the trigger)
        let stopReason: string | null = null;
        if (bo.newFiles < opts.minNewFiles) stopReason = `stop: marginal exhaustion, best dir adds ${bo.newFiles} < ${opts.minNewFiles}`;
        else if (bo.affinity < opts.minAffinity) stopReason = `stop: relevance decay, best dir affinity ${bo.affinity} < ${opts.minAffinity}`;
        else if (visitedSyms.size + preview[best].syms.size > opts.nodeCap) stopReason = `stop: node cap, ${visitedSyms.size}+${preview[best].syms.size} > ${opts.nodeCap}`;

        if (stopReason) {
            rounds.push({ anchor: seed, round, options, chosen: null, reason: stopReason });
            return rounds;
        }

        // 4) Walk: commit to this direction, record result
        for (const s of preview[best].syms) visitedSyms.add(s);
        for (const f of preview[best].files) visitedFiles.add(f);
        rounds.push({
            anchor: seed, round, options, chosen: best,
            reason: `affinity top ${bo.affinity} (${best}) vs ${MOVE_ORDER.filter(m => m !== best).map(m => `${preview[m].opt.affinity} (${m})`).join(' / ')}`,
            result: {
                newFiles: preview[best].files,   // record in full (the report side computes neighborhood recall against gold files; truncation would skew it)
                newFileCount: preview[best].files.length,
                newSymbolCount: preview[best].syms.size,
                cumulativeFiles: visitedFiles.size,
            },
        });

        // 5) Next-round frontier: this round's top-3 new files × ≤2 symbols per file (spec §2.4)
        const next = new Set<string>();
        for (const f of preview[best].files.slice(0, 3))
            for (const s of ctx.symbolsOfFile(f).slice(0, 2))
                if (visitedSyms.has(s) || preview[best].syms.has(s)) next.add(s);
        frontier = next.size > 0 ? next : preview[best].syms;
        if (frontier.size === 0) {
            rounds.push({ anchor: seed, round: round + 1, options, chosen: null, reason: 'stop: no more symbols' });
            return rounds;
        }
    }
    // Budget exhausted: append a stop record (options reuse the last round's)
    const last = rounds[rounds.length - 1];
    rounds.push({ anchor: seed, round: opts.maxRounds + 1, options: last.options, chosen: null, reason: `stop: ${opts.maxRounds}-round budget exhausted` });
    return rounds;
}
