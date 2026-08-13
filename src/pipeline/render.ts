// render.ts — the skeleton the model sees.
//
// Everything else that lived beside this — name-keyed traversal, four-tier file resolution, the
// anchorOf regexes, boundary early-stop — is gone: the graph carries resolved definition ids, so
// nothing has to be located or guessed. What remains is turning a built chain into text.
import type { ChainSkeleton, SkeletonNode } from './types.js';

const ARROW: Record<string, string> = { down: '↓', up: '↑' };

export function letterId(n: number): string {
    let out = '';
    let i = n + 1;
    while (i > 0) {
        i--;
        out = String.fromCharCode(97 + (i % 26)) + out;
        i = Math.floor(i / 26);
    }
    return out;
}

// Returns the full text plus each chain's own block, so step 6 can render only the chains that
// survived selection without re-running the walk (ids are assigned here and must stay stable).
export function renderSkeletons(skeletons: ChainSkeleton[]): { text: string; nodeById: Map<string, SkeletonNode>; blocks: Map<number, string> } {
    const nodeById = new Map<string, SkeletonNode>();
    const blocks = new Map<number, string>();
    const lines: string[] = [];
    for (const sk of skeletons) {
        const start = lines.length;
        let letter = 0;
        const modeLabel = sk.mode === 'flow' ? 'flow ↓' : 'impact ↑';
        const reroot = sk.rerooted ? `  [re-rooted ${sk.rerooted.from} -> ${sk.rerooted.to}]` : '';
        lines.push(`${modeLabel} ${sk.chain.id} (${sk.chain.label})${sk.chain.tied ? ' [tied seed]' : ''}${reroot}`);

        const emit = (n: SkeletonNode, indent: number) => {
            const pad = '  '.repeat(indent);
            const arrow = ARROW[n.direction];
            if (n.kind === 'major') {
                n.id = `${sk.chain.id}${letterId(letter++)}`;
                nodeById.set(n.id, n);
                // A fork must be visible. An interface member with several implementations that
                // renders like any other node reads as one destination, which is the same failure
                // as coverage mode silently picking one.
                const fork = n.implCount && n.implCount > 1 ? `  [${n.implCount} implementations]` : '';
                const swapped = n.overrides?.length ? `  [overridden: ${n.overrides.map(o => o.condition?.module ?? o.source).join(', ')}]` : '';
                lines.push(`${pad}[${n.id}] ${arrow} ${n.symbol}  ${n.file}:${n.line}  ${n.snippet}${fork}${swapped}`);
            } else if (n.kind === 'dispatch') {
                lines.push(`${pad}◆ ${n.symbol}  [dispatch key]`);
                if (n.siblings) {
                    const g = n.siblings;
                    lines.push(`${pad}  ├ wired (${g.total})  ${g.refs.map(r => `${r.symbol}@${r.file}`).join(`\n${pad}  │           `)}`);
                    if (g.total > g.refs.length) lines.push(`${pad}  │           … +${g.total - g.refs.length}`);
                }
            } else if (n.kind === 'hotleaf') {
                lines.push(`${pad}(hot, not expanded) ${arrow} ${n.symbol}  ${n.file}:${n.line}`);
            } else if (n.kind === 'type') {
                lines.push(`${pad}(type) ${n.symbol}  ${n.file}:${n.line}`);
            } else {
                lines.push(`${pad}${arrow} ${n.symbol}()`);
            }
            n.children.forEach(c => emit(c, indent + 1));
        };

        sk.roots.forEach(r => emit(r, 1));
        blocks.set(sk.chain.id, lines.slice(start).join('\n'));
        lines.push('');
    }
    return { text: lines.join('\n'), nodeById, blocks };
}
