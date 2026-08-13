// Step 3: expand each chain's entry into a skeleton. A chain walks in exactly ONE direction,
// decided at its entry from the data (never from keywords in the question):
//   flow   — downstream, "how does this happen"      (26 of the 34 benchmark questions)
//   impact — upstream, "what depends on this"        (3 questions: blast-radius shaped)
// Horizontal relations (all listeners of an event, all handlers of a route) are NOT reached by
// turning around mid-chain -- they hang off dispatch-key pseudo-nodes, see buildSiblingIndex.
import * as fs from 'fs';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { LegacyEdgeType as EdgeType, CallerRef } from '../indexer/state.js';
import { relPath } from '../engine/common.js';
import { questionTokens, symbolTokens } from './entry.js';
import type { Chain, ChainMode, ChainSkeleton, SkeletonNode, SiblingGroup, SiblingRef, Direction } from './types.js';

export interface SkeletonOpts {
    maxDepth?: number;
    upstreamMaxDepth?: number;
    maxNodesPerChain?: number;
    hotFanIn?: number;
    maxChildrenPerNode?: number;
    upstreamWeight?: number;
    siblingMax?: number;
    chainFiles?: Set<string>;
    prose?: string;            // this chain's section wiki prose; feeds scoreCandidate
}

const DEFAULTS = {
    maxDepth: 6,
    upstreamMaxDepth: 3,
    maxNodesPerChain: 200,
    hotFanIn: 25,
    maxChildrenPerNode: 8,
    upstreamWeight: 0.7,
    siblingMax: 8,
};

const STRING_EDGE_TYPES = new Set<EdgeType>([
    'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe',
    'rest_call', 'rest_route', 'stream_def', 'stream_sub',
]);
const STATIC_EDGE_TYPES = new Set<EdgeType>(['call', 'new', 'jsx', 'type']);

const fanIn = (sym: string): number => GLOBAL_INDEX.callGraph.get(sym)?.length ?? 0;
const isStringEdge = (e: EdgeType): boolean => STRING_EDGE_TYPES.has(e);
const edgeWeight = (e: EdgeType): number => isStringEdge(e) ? 1.0 : e === 'type' ? 0.1 : 0.6;

const TEST_PATH_MARKERS = ['.test.', '.spec.', '/tests/', '/test/', '/__tests__/', '.mocks.'];
export const isTestPath = (p: string): boolean => {
    const s = p.toLowerCase();
    return TEST_PATH_MARKERS.some(m => s.includes(m));
};

// --- forward adjacency, file-tagged ---------------------------------------------------------
// callGraph is reverse (callee -> callers) and keyed purely by SYMBOL NAME, so two same-named
// functions in different files pile all their out-edges under one key. Keeping the call site's
// own file on every edge lets build() expand a node using ONLY the edges that actually
// originated in the file that node resolved to.
export type FileAwareCallee = { callee: string; edgeType: EdgeType; file: string };
let calleesCache: Map<string, FileAwareCallee[]> | null = null;

export function buildFileAwareCalleesOf(): Map<string, FileAwareCallee[]> {
    const out = new Map<string, FileAwareCallee[]>();
    for (const [callee, callersList] of GLOBAL_INDEX.callGraph) {
        for (const { caller, file, edgeType } of callersList) {
            if (!out.has(caller)) out.set(caller, []);
            const arr = out.get(caller)!;
            if (!arr.some(x => x.callee === callee && x.file === file)) arr.push({ callee, edgeType, file });
        }
    }
    return out;
}

// --- dispatch keys ---------------------------------------------------------------------------
// A dispatch key (event name, normalised REST route, pubsub name, streamer name) is stored by the
// indexer as an ordinary callGraph key, but it is NOT a real symbol. The old
// `symbols.has(callee)` guard therefore discarded 77.7% of all string-dispatch edges
// (1835 of 2363) -- exactly the cross-layer wiring the 12-edge-type extractor exists to capture.
// Such names now survive as pseudo-nodes carrying their sibling group.
// A real dispatch key reads like an event or a route ('afterSaveMessage', 'notify.ephemeral',
// 'unread-state-change', 'user.roleUpdate'); a Promise callback parameter reads like a plain
// identifier ('resolve', 'cb', 'done'). The extractor cannot tell them apart, so filter on the
// NAME'S SHAPE rather than on a blacklist: a key must carry a separator or split into at least
// two sub-words. Measured against the hottest mis-detected keys, this drops `resolve` and `cb`
// while keeping every genuine event/route name.
export const looksLikeDispatchKey = (name: string): boolean =>
    /[.\-/:_]/.test(name) || symbolTokens(name).length >= 2;

export const isDispatchKey = (name: string): boolean =>
    !GLOBAL_INDEX.symbols.has(name) &&
    looksLikeDispatchKey(name) &&
    (GLOBAL_INDEX.callGraph.get(name) ?? []).some(c => isStringEdge(c.edgeType));

let siblingCache: Map<string, SiblingRef[]> | null = null;

// Members wired to each dispatch key, collected in one pass. Two storage shapes exist:
//   A. callGraph[key] holds {caller: registering symbol}          — emitters and most listeners
//   B. callGraph[handler] holds {caller: key, edgeType:'event_listen'} — listeners whose handler
//      name the extractor could resolve; the key sits in the CALLER slot, so only a reverse
//      scan finds them.
export function buildSiblingIndex(): Map<string, SiblingRef[]> {
    const out = new Map<string, SiblingRef[]>();
    const push = (key: string, ref: SiblingRef) => {
        if (!out.has(key)) out.set(key, []);
        const arr = out.get(key)!;
        if (!arr.some(x => x.symbol === ref.symbol && x.file === ref.file && x.edgeType === ref.edgeType)) arr.push(ref);
    };
    for (const [name, refs] of GLOBAL_INDEX.callGraph) {
        for (const r of refs as CallerRef[]) {
            if (!isStringEdge(r.edgeType)) continue;
            push(name, { symbol: r.caller, file: relPath(r.file), edgeType: r.edgeType });      // shape A
            if (r.edgeType === 'event_listen') push(r.caller, { symbol: name, file: relPath(r.file), edgeType: r.edgeType }); // shape B
        }
    }
    return out;
}

export function siblingsOf(key: string, siblingMax: number): SiblingGroup | undefined {
    siblingCache ??= buildSiblingIndex();
    const all = (siblingCache.get(key) ?? []).filter(r => !isTestPath(r.file));
    if (all.length === 0) return undefined;
    return { key, refs: all.slice(0, siblingMax), total: all.length };
}

// Test seam: caches are built from GLOBAL_INDEX, which unit tests mutate between cases.
export function resetSkeletonCaches(): void { calleesCache = null; siblingCache = null; }

// --- anchoring ---------------------------------------------------------------------------------
// Locate a symbol by DEFINITION, not by "first line that contains the name". Plain substring
// matching anchors on import statements, and makes `MessageAction` land on the line declaring
// `MessageActionProps` -- two distinct nodes pointing at one location, reading the same body twice.
const defPatterns = (sym: string): RegExp[] => {
    const e = sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return [
        new RegExp(`(^|\\W)(export\\s+)?(default\\s+)?(async\\s+)?function\\s+${e}\\b`),
        new RegExp(`(^|\\W)(export\\s+)?(const|let|var)\\s+${e}\\b`),
        new RegExp(`(^|\\W)(export\\s+)?(abstract\\s+)?class\\s+${e}\\b`),
        new RegExp(`(^|\\W)(export\\s+)?(type|interface|enum)\\s+${e}\\b`),
        new RegExp(`^\\s*(public|private|protected|static|async|\\*)?\\s*${e}\\s*[(<]`),
    ];
};

export interface Anchor { line: number; snippet: string; isType: boolean }

export function anchorOf(sym: string, abs: string): Anchor {
    if (!abs || !fs.existsSync(abs)) return { line: 0, snippet: sym, isType: false };
    const src = fs.readFileSync(abs, 'utf8').split('\n');
    const pats = defPatterns(sym);
    let idx = src.findIndex(l => pats.some(p => p.test(l)));
    if (idx < 0) idx = src.findIndex(l => l.includes(sym));      // last resort
    const raw = src[idx] ?? sym;
    return {
        line: idx + 1,
        snippet: raw.trim().slice(0, 140),
        isType: new RegExp(`(export\\s+)?(type\\s+\\w+\\s*=|interface\\s+\\w+)`).test(raw),
    };
}

// --- file resolution ----------------------------------------------------------------------------
const resolveFile = (sym: string, preferredRel?: string, parentAbs?: string, chainFiles?: Set<string>): string => {
    const all = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])];
    // A symbol defined in BOTH production and test files passes the candidate-level test filter
    // (which only drops symbols defined *exclusively* under test paths), so the test definition
    // can still win here and anchor the node on a fixture. Prefer production definitions.
    const production = all.filter(f => !isTestPath(relPath(f)));
    const files = production.length > 0 ? production : all;
    if (files.length === 0) return '';
    if (preferredRel) {
        const m = files.find(f => relPath(f) === preferredRel);
        if (m) return m;
    }
    if (parentAbs) {
        const same = files.find(f => f === parentAbs);
        if (same) return same;
        const imported = files.filter(f => GLOBAL_INDEX.fileDependents.get(f)?.has(parentAbs));
        if (imported.length > 0) return imported[0];
    }
    if (chainFiles?.size) {
        const inChain = files.filter(f => chainFiles.has(relPath(f)));
        if (inChain.length > 0) return inChain[0];
    }
    return files[0];
};

// Subsystem identity for a path, at PACKAGE granularity. Earlier this cut on a directory
// segment inside the package, which split `apps/meteor/server/services/...` ('services') from
// `apps/meteor/app/lib/server/methods/...` ('lib') -- both plain server-side app code on the same
// message-sending flow. Chain 1 collapsed to a single node because of it.
//
// Measured on a real run: of 53 boundary cuts, package granularity releases 16 (every one of them
// inside apps/meteor, including the executeSendMessage hop that chain 1 needed) and keeps 37 --
// core-typings 14, media-signaling 3, ui-contexts 3, apps-engine 2, models 2, message-parser 2 …
// i.e. exactly the leaf libraries that should stay leaves.
export function anchorSeg(file: string): string {
    let normalized = file;
    if (file.includes('Rocket.Chat/')) normalized = file.split('Rocket.Chat/')[1];
    else if (file.startsWith('/')) {
        const segs = file.split('/');
        const idx = segs.findIndex(s => s === 'apps' || s === 'packages' || s === 'ee');
        if (idx >= 0) normalized = segs.slice(idx).join('/');
    }
    const seg = normalized.split('/').filter(Boolean);
    if (seg[0] === 'apps') return seg[1] ? `apps/${seg[1]}` : 'apps';
    if (seg[0] === 'packages') return seg[1] ? `packages/${seg[1]}` : 'packages';
    if (seg[0] === 'ee' && seg[1] === 'packages') return seg[2] ? `ee/packages/${seg[2]}` : 'ee/packages';
    return seg[0] ?? '';
}

// --- candidates ----------------------------------------------------------------------------------
export interface Candidate { symbol: string; edgeType: EdgeType; file: string; direction: Direction }

// Downstream: only edges whose call site lives in THIS node's file. Without it a client-side
// `sendMessage` node inherits all 165 out-edges recorded under that name (livechat server,
// e2e tests, ddp-client, slackbridge…) instead of the 19 that are actually its own.
export function downstreamCandidates(sym: string, abs: string, calleesOf: Map<string, FileAwareCallee[]>): Candidate[] {
    return (calleesOf.get(sym) ?? [])
        .filter(c => c.file === abs)
        .filter(c => GLOBAL_INDEX.symbols.has(c.callee) || isDispatchKey(c.callee))
        // Exclude by where the CALLEE is defined, not where the call site sits: a production file
        // calling a test helper must drop the helper, and the call site is production either way.
        .filter(c => {
            const defs = [...(GLOBAL_INDEX.symbols.get(c.callee) ?? [])];
            return defs.length === 0 || !defs.every(f => isTestPath(relPath(f)));
        })
        .map(c => ({ symbol: c.callee, edgeType: c.edgeType, file: c.file, direction: 'down' as Direction }));
}

// Upstream: same-name collisions pull in unrelated callers, so static edges are pruned to callers
// whose file actually imports one of this symbol's defining files. String-dispatch edges carry no
// import relationship by construction and are kept unconditionally.
export function upstreamCandidates(sym: string): Candidate[] {
    const defFiles = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])];
    const out: Candidate[] = [];
    for (const r of GLOBAL_INDEX.callGraph.get(sym) ?? []) {
        if (isTestPath(relPath(r.file))) continue;
        if (!GLOBAL_INDEX.symbols.has(r.caller) && !isDispatchKey(r.caller)) continue;
        if (STATIC_EDGE_TYPES.has(r.edgeType)) {
            const imported = defFiles.some(df => GLOBAL_INDEX.fileDependents.get(df)?.has(r.file));
            if (!imported) continue;
        }
        if (!out.some(x => x.symbol === r.caller && x.file === r.file)) {
            out.push({ symbol: r.caller, edgeType: r.edgeType, file: r.file, direction: 'up' });
        }
    }
    return out;
}

// The chain's own section prose describes the flow in words, so a candidate the prose names is
// more likely to sit on the intended path. Membership, not position: prose position skews toward
// the overview paragraph's generic nouns, while "is it mentioned at all" is a reliable signal.
// Deliberately the same order of magnitude as edgeWeight (0.1~1.0) -- never a dominating constant.
export const PROSE_BONUS = 0.5;

export function proseMentions(symbol: string, prose?: string): boolean {
    if (!prose || symbol.length < 4) return false;
    if (prose.includes(symbol)) return true;
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('`' + escaped + '`', 'i').test(prose);
}

export function scoreCandidate(c: Candidate, qTokens: Set<string>, homeSeg: string, hotFanIn: number, upstreamWeight: number, prose?: string): number {
    const toks = symbolTokens(c.symbol);
    const lexicalNorm = toks.length === 0 || qTokens.size === 0 ? 0 : toks.filter(t => qTokens.has(t)).length / toks.length;
    const targetFile = relPath([...(GLOBAL_INDEX.symbols.get(c.symbol) ?? [])][0] ?? c.file);
    const notViable = fanIn(c.symbol) > hotFanIn || (targetFile !== '' && anchorSeg(targetFile) !== homeSeg);
    const dirCoef = c.direction === 'down' ? 1 : upstreamWeight;
    const proseTerm = proseMentions(c.symbol, prose) ? PROSE_BONUS : 0;
    return (0.5 * lexicalNorm + edgeWeight(c.edgeType) + proseTerm) * (notViable ? 0.5 : 1) * dirCoef;
}

// --- build ------------------------------------------------------------------------------------------
export function buildChainSkeleton(chain: Chain, opts: SkeletonOpts = {}, question?: string): ChainSkeleton {
    const o = { ...DEFAULTS, ...opts };
    calleesCache ??= buildFileAwareCalleesOf();
    const calleesOf = calleesCache;
    const qTokens = questionTokens(question ?? '');

    let entrySym = chain.seed.symbol;
    let entryAbs = resolveFile(entrySym, chain.seed.file);
    const homeSegOf = (abs: string) => anchorSeg(relPath(abs));

    // Direction mode: compare the best candidate each way. Blast-radius entries (an event name,
    // a settings cache, a streamer) structurally have little or nothing downstream and plenty
    // upstream, so the data decides without reading intent out of the question text.
    const score = (c: Candidate, seg: string) => scoreCandidate(c, qTokens, seg, o.hotFanIn, o.upstreamWeight, opts.prose);
    const bestScore = (cands: Candidate[], seg: string) => cands.reduce((m, c) => Math.max(m, score(c, seg)), 0);
    const seg0 = homeSegOf(entryAbs);
    const down0 = downstreamCandidates(entrySym, entryAbs, calleesOf);
    const up0 = upstreamCandidates(entrySym);
    const mode: ChainMode = bestScore(up0, seg0) > bestScore(down0, seg0) ? 'impact' : 'flow';

    // Flow chains may re-root ONE hop upstream when the entry sits mid-flow (measured: chain 3's
    // entry was `decrypt`, whose downstream is only key management). This is a root swap, not a
    // tree edge -- afterwards every edge in the tree still points downstream.
    let rerooted: { from: string; to: string } | undefined;
    if (mode === 'flow' && up0.length > 0) {
        const bestUp = [...up0].sort((a, b) => score(b, seg0) - score(a, seg0))[0];
        const bestDown = bestScore(down0, seg0);
        if (bestUp && score(bestUp, seg0) > bestDown && GLOBAL_INDEX.symbols.has(bestUp.symbol)) {
            rerooted = { from: entrySym, to: bestUp.symbol };
            entrySym = bestUp.symbol;
            entryAbs = resolveFile(entrySym, relPath(bestUp.file));
        }
    }

    const homeSeg = homeSegOf(entryAbs);
    const chainFiles = new Set<string>([...(opts.chainFiles ?? []), chain.seed.file]);
    const maxDepth = mode === 'flow' ? o.maxDepth : o.upstreamMaxDepth;
    const visited = new Set<string>();
    let majorCount = 0;
    let nodeCount = 0;
    let maxDepthReached = 0;

    const build = (sym: string, depth: number, parentAbs: string | undefined, direction: Direction, edgeType: EdgeType | null, edgeFile?: string): SkeletonNode | null => {
        if (visited.has(sym)) return null;
        // Fuse, not a quota: expansion is free (pure computation, no tokens), so nothing is cut
        // for being "the 11th node" -- this only stops a pathological module from exploding.
        if (nodeCount >= o.maxNodesPerChain) return null;
        visited.add(sym);
        nodeCount++;
        maxDepthReached = Math.max(maxDepthReached, depth);

        // Dispatch pseudo-node: no definition site, no body; carries the sibling group.
        if (isDispatchKey(sym)) {
            const siblings = siblingsOf(sym, o.siblingMax);
            return { id: '', symbol: sym, file: '', line: 0, snippet: '', kind: 'dispatch', direction, edgeType, siblings, children: [] };
        }

        const abs = resolveFile(sym, depth === 0 ? chain.seed.file : undefined, parentAbs, chainFiles);
        const file = relPath(abs);
        const anchor = anchorOf(sym, abs);
        const base = { symbol: sym, file, line: anchor.line, snippet: anchor.snippet, direction, edgeType, children: [] as SkeletonNode[] };

        // Early-stop kinds: decided before any edge lookup, so they never grow a subtree.
        if (depth > 0 && file && anchorSeg(file) !== homeSeg) return { ...base, id: '', kind: 'boundary' };
        if (depth > 0 && fanIn(sym) > o.hotFanIn) return { ...base, id: '', kind: 'hotleaf' };
        if (depth > 0 && anchor.isType) return { ...base, id: '', kind: 'type' };

        const raw = mode === 'flow' ? downstreamCandidates(sym, abs, calleesOf) : upstreamCandidates(sym);
        const cands = raw
            .map(c => ({ c, score: score(c, homeSeg) }))
            .sort((a, b) => b.score - a.score)             // stable: ties keep source order
            .slice(0, o.maxChildrenPerNode)
            .map(x => x.c);

        // Impact chains never mark pass-through: every caller hop IS the answer, there is no
        // "wrapper that merely forwards" to compress away.
        const isPass = mode === 'flow' && depth > 0 && cands.length === 1 && fanIn(sym) <= 2;
        const kind = isPass ? 'passthrough' as const : 'major' as const;
        if (kind === 'major') majorCount++;

        const node: SkeletonNode = { ...base, id: '', kind };
        if (depth < maxDepth) {
            for (const c of cands) {
                const child = build(c.symbol, depth + 1, abs, c.direction, c.edgeType, c.file);
                if (child) node.children.push(child);
            }
        }
        return node;
    };

    const root = build(entrySym, 0, undefined, 'down', null);
    return { chain, mode, roots: root ? [root] : [], majorCount, nodeCount, maxDepthReached, rerooted };
}

// --- render -------------------------------------------------------------------------------------------
const ARROW: Record<Direction, string> = { down: '↓', up: '↑' };

// Base-26 letters: a…z, aa, ab, … Single-character ids overflow past 'z' -- with no major-node
// cap a chain reached 81 majors, and `String.fromCharCode(97 + n)` then produced `1{` / `1|` /
// `1€`, which the model cannot cite reliably.
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
            } else if (n.kind === 'boundary') {
                lines.push(`${pad}(-> other package: ${anchorSeg(n.file)}) ${arrow} ${n.symbol}  ${n.file}:${n.line}`);
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
