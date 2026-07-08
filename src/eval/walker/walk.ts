// 自主游走：亲和度引导方向 + 自评停止。方向与停止共用同一信号（frontier 对 question tokens 的词面亲和度）。
// stop 决不看金文件。全部依赖注入（WalkCtx），可用合成图单测。
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
            add(down, caller, callee);   // caller 往下调 callee
            add(up, callee, caller);     // callee 往上被 caller 调
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
const MOVE_ORDER: Move[] = ['expand', 'down', 'up'];   // 平分时的优先序

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
        // 1) 三方向预览
        const preview = {} as Record<Move, { syms: Set<string>; files: string[]; opt: MoveOption }>;
        for (const move of MOVE_ORDER) {
            const nextSyms = new Set([...neighborsOf(frontier, ctx.adj, move)].filter(s => !visitedSyms.has(s)));
            const fileSet = new Set<string>();
            for (const s of nextSyms) for (const f of ctx.filesOf(s)) if (!visitedFiles.has(f)) fileSet.add(f);
            const files = [...fileSet].sort((a, b) => scoreString(tokens, b) - scoreString(tokens, a) || a.localeCompare(b));
            // affinity = 候选分 top-5 均值（信号密度）。不能取 max：expand 的邻居集是 down∪up 的
            // 超集，max(expand) 恒 ≥ max(方向)，平分再优先 expand 会让方向选择退化成"永远 expand"。
            // 按实体计分：每个新符号取 max(符号名分, 其新增文件最高分)——符号和它的文件是同一实体，
            // 混入同一池会重复计分、扭曲方向对比。
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

        // 2) 选方向：affinity 最高，平分按 MOVE_ORDER
        let best: Move = 'expand';
        for (const m of MOVE_ORDER) if (preview[m].opt.affinity > preview[best].opt.affinity) best = m;
        const bo = preview[best].opt;

        // 3) 自评停止（任一触发即停，reason 记触发项）
        let stopReason: string | null = null;
        if (bo.newFiles < opts.minNewFiles) stopReason = `stop：边际枯竭，最优方向新增 ${bo.newFiles} < ${opts.minNewFiles}`;
        else if (bo.affinity < opts.minAffinity) stopReason = `stop：相关性衰减，最优方向 affinity ${bo.affinity} < ${opts.minAffinity}`;
        else if (visitedSyms.size + preview[best].syms.size > opts.nodeCap) stopReason = `stop：节点阀，${visitedSyms.size}+${preview[best].syms.size} > ${opts.nodeCap}`;

        if (stopReason) {
            rounds.push({ anchor: seed, round, options, chosen: null, reason: stopReason });
            return rounds;
        }

        // 4) 走：采纳该方向，记 result
        for (const s of preview[best].syms) visitedSyms.add(s);
        for (const f of preview[best].files) visitedFiles.add(f);
        rounds.push({
            anchor: seed, round, options, chosen: best,
            reason: `affinity 最高 ${bo.affinity} (${best}) vs ${MOVE_ORDER.filter(m => m !== best).map(m => `${preview[m].opt.affinity} (${m})`).join(' / ')}`,
            result: {
                newFiles: preview[best].files,   // 全量记录（report 端要对金文件算邻域召回，截断会失准）
                newFileCount: preview[best].files.length,
                newSymbolCount: preview[best].syms.size,
                cumulativeFiles: visitedFiles.size,
            },
        });

        // 5) 下一轮 frontier：本轮新增 top-3 文件 × 每文件 ≤2 符号（spec §2.4）
        const next = new Set<string>();
        for (const f of preview[best].files.slice(0, 3))
            for (const s of ctx.symbolsOfFile(f).slice(0, 2))
                if (visitedSyms.has(s) || preview[best].syms.has(s)) next.add(s);
        frontier = next.size > 0 ? next : preview[best].syms;
        if (frontier.size === 0) {
            rounds.push({ anchor: seed, round: round + 1, options, chosen: null, reason: 'stop：无可继续符号' });
            return rounds;
        }
    }
    // 预算耗尽：补一条 stop 记录（options 沿用最后一轮的）
    const last = rounds[rounds.length - 1];
    rounds.push({ anchor: seed, round: opts.maxRounds + 1, options: last.options, chosen: null, reason: `stop：${opts.maxRounds} 轮预算用尽` });
    return rounds;
}
