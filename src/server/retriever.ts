import fuzzysort from 'fuzzysort';
import { Project } from 'ts-morph';
import { GLOBAL_INDEX } from '../indexer/state.js';

const PATH_HINTS: Array<{ keywords: string[]; segment: string }> = [
    { keywords: ['client', 'ui', 'component', 'react'], segment: 'client' },
    { keywords: ['server', 'backend', 'method'],        segment: 'server' },
    { keywords: ['api', 'rest', 'endpoint', 'route'],   segment: 'api/server' },
    { keywords: ['package', 'shared', 'model'],         segment: 'packages' },
    { keywords: ['enterprise', 'ee', 'premium'],        segment: 'ee/' },
];

// A subsystem's files are related by dependency edges, not by having names similar to one query
// word. So name-fuzzy ranking over definition sites can only ever surface the seed's own file
// (recall ceiling ≈ 1/N). We instead treat search as navigation: seed lexically, EXPAND along the
// call graph to gather the neighborhood, then RANK that neighborhood by a graph-aware score.

// Undirected symbol adjacency, derived once from callGraph (callee↔caller). Cached because it is a
// pure function of the (immutable-per-process) index; rebuilding per query would be wasteful.
let NEIGHBORS: Map<string, Set<string>> | null = null;
function getNeighbors(): Map<string, Set<string>> {
    if (NEIGHBORS) return NEIGHBORS;
    const n = new Map<string, Set<string>>();
    const link = (a: string, b: string) => {
        if (a === b) return;
        let s = n.get(a); if (!s) { s = new Set(); n.set(a, s); } s.add(b);
    };
    for (const [callee, callers] of GLOBAL_INDEX.callGraph) {
        for (const { caller } of callers) { link(callee, caller); link(caller, callee); }
    }
    NEIGHBORS = n;
    return n;
}

function isTestPath(p: string): boolean {
    const s = p.toLowerCase();
    return s.includes('.test.') || s.includes('.spec.') || s.includes('.mocks.') ||
        s.includes('/tests/') || s.includes('/test/') || s.includes('/e2e/') || s.includes('/__tests__/');
}

// Fan-in centrality of a file, log-normalized to ~0..1. Real subsystem hubs are imported widely;
// peripheral/test files are not — this lifts the central definitions of the neighborhood.
function centralityOf(filePath: string): number {
    const c = GLOBAL_INDEX.fileDependents.get(filePath)?.size ?? 0;
    return Math.log1p(c) / Math.log1p(300);
}

export interface RankedSymbol { symbolName: string; paths: string[]; score: number; finalScore: number; hop: number; }

export class CodeRetriever {
    // Graph-aware subsystem search. Returns symbols ranked so that flattening their `paths` yields
    // the query's subsystem cluster (seed first, then graph neighbors ordered by relevance).
    static search(query: string, limit = 5, layer?: string): RankedSymbol[] {
        const q = query.toLowerCase();
        const layerSegment = layer ? `/${layer}/` : null;
        const inferredSegments = PATH_HINTS
            .filter(h => h.keywords.some(k => q.includes(k)))
            .map(h => h.segment);

        // 1. SEED — lexical name match (exact + fuzzy). lexical ∈ 0..1 per symbol.
        const symbolList = Array.from(GLOBAL_INDEX.symbols.keys());
        const fuzzyResults = fuzzysort.go(query, symbolList, { threshold: -3000, limit: 50 });
        const lexical = new Map<string, number>();
        for (const res of fuzzyResults) {
            const rawScore = Math.max(0, 1 + res.score / 3000);
            const lengthRatio = query.length / res.target.length;
            const base = lengthRatio < 0.4 ? rawScore * (lengthRatio / 0.4) : rawScore;
            lexical.set(res.target, Math.max(lexical.get(res.target) ?? 0, base));
        }
        if (GLOBAL_INDEX.symbols.has(query)) lexical.set(query, 1);

        // Strong name matches become BFS seeds. Fall back to the best few if none clear the bar.
        let seeds = Array.from(lexical.entries()).filter(([, s]) => s >= 0.5).map(([s]) => s);
        if (seeds.length === 0) {
            seeds = Array.from(lexical.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s);
        }
        seeds = seeds.slice(0, 10);
        if (seeds.length === 0) return [];

        // 2. EXPAND — BFS depth 2 over the call graph. hop = min distance from any seed.
        const neighbors = getNeighbors();
        const hop = new Map<string, number>();
        for (const s of seeds) hop.set(s, 0);
        let frontier = [...seeds];
        for (let d = 1; d <= 2 && frontier.length > 0; d++) {
            const next: string[] = [];
            for (const s of frontier) {
                for (const nb of neighbors.get(s) ?? []) {
                    if (!hop.has(nb)) { hop.set(nb, d); next.push(nb); }
                }
            }
            frontier = next;
            if (hop.size > 6000) break; // safety on hub explosions
        }

        // 3. RANK — proximity to seed dominates (subsystem membership); lexical pins the seed at the
        // top; a mild centrality reward favours real definitions; an IDF-style hub penalty suppresses
        // generic utilities that neighbour everything but belong to no single subsystem.
        const scored: RankedSymbol[] = [];
        for (const [sym, h] of hop) {
            let paths = Array.from(GLOBAL_INDEX.symbols.get(sym) ?? []);
            if (paths.length === 0) continue;
            if (layerSegment) {
                const f = paths.filter(p => p.includes(layerSegment));
                if (f.length > 0) paths = f;
            }
            // Within a symbol, prefer non-test + higher-centrality definition first.
            paths.sort((a, b) =>
                (isTestPath(a) ? 1 : 0) - (isTestPath(b) ? 1 : 0) ||
                centralityOf(b) - centralityOf(a));

            const lex = lexical.get(sym) ?? 0;
            const proximity = 1 / (1 + h);
            const cent = centralityOf(paths[0]);
            const nbrs = neighbors.get(sym);
            const degree = nbrs?.size ?? 0;
            const hubPenalty = Math.log1p(degree) / Math.log1p(2000); // generic glue → ~1, subsystem node → small
            // Cohesion: how many of this symbol's neighbours also fell inside the discovered
            // neighbourhood. A real subsystem member references several siblings; an incidental
            // neighbour links mostly outward. Pulls true core files up (and MRR with them).
            let inSet = 0;
            if (nbrs) for (const nb of nbrs) if (hop.has(nb)) inSet++;
            const cohesion = Math.min(1, inSet / 4);
            let prior = 0;
            if (layerSegment && paths.some(p => p.includes(layerSegment))) prior = 0.5;
            else if (inferredSegments.length > 0 && paths.some(p => inferredSegments.some(s => p.includes(s)))) prior = 0.3;

            const testPenalty = isTestPath(paths[0]) ? 0.5 : 0;
            const finalScore =
                2.0 * proximity +   // hop-1 ≫ hop-2: subsystem files sit next to the seed
                1.5 * lex +         // exact/strong name match (the seed) pinned to the top
                0.6 * cohesion +    // densely wired into the rest of the neighbourhood
                0.2 * cent +        // real definitions get imported; mild reward
                prior -
                0.6 * hubPenalty -  // demote everything-touches utilities
                testPenalty;
            scored.push({ symbolName: sym, paths, score: lex, finalScore, hop: h });
        }

        return scored.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit);
    }

    private static resolveFile(symbolName: string, preferredFile?: string): string[] {
        const paths = GLOBAL_INDEX.symbols.get(symbolName);
        if (!paths || paths.size === 0) return [];
        let sorted = Array.from(paths);
        if (preferredFile) {
            const q = preferredFile.toLowerCase().replace(/\.tsx?$/, '');
            const exact = sorted.find(p => p.toLowerCase().replace(/\.tsx?$/, '').endsWith(q));
            if (exact) sorted = [exact];
        }
        return sorted;
    }

    static getImplementation(symbolName: string, preferredFile?: string): { text: string; filePath: string; kind: string; methods?: string[] } | null {
        const sortedPaths = this.resolveFile(symbolName, preferredFile);
        if (sortedPaths.length === 0) return null;

        for (const filePath of sortedPaths) {
            try {
                const project = new Project({ skipAddingFilesFromTsConfig: true });
                const sourceFile = project.addSourceFileAtPath(filePath);
                let text: string | null = null;
                let kind = 'symbol';
                let methods: string[] | undefined;

                for (const fn of sourceFile.getFunctions()) {
                    if (fn.getName() === symbolName) { text = fn.getFullText().trim(); kind = 'function'; break; }
                }

                if (!text) {
                    for (const v of sourceFile.getVariableDeclarations()) {
                        if (v.getName() === symbolName) {
                            text = v.getVariableStatement()?.getFullText().trim() ?? v.getFullText().trim();
                            kind = 'variable';
                            break;
                        }
                    }
                }

                if (!text) {
                    for (const cls of sourceFile.getClasses()) {
                        if (cls.getName() === symbolName) {
                            kind = 'class';
                            methods = cls.getMethods().map(m => m.getName()).filter(Boolean);
                            // Return skeleton: signatures only, no method bodies
                            const lines: string[] = [];
                            const heritage = cls.getHeritageClauses().map(h => h.getText()).join(' ');
                            lines.push(`class ${symbolName}${heritage ? ' ' + heritage : ''} {`);
                            for (const ctor of cls.getConstructors()) {
                                const params = ctor.getParameters().map(p => p.getText()).join(', ');
                                lines.push(`  constructor(${params}) { /* ... */ }`);
                            }
                            for (const prop of cls.getProperties()) {
                                lines.push(`  ${prop.getText()};`);
                            }
                            for (const method of cls.getMethods()) {
                                const mods = method.getModifiers().map(m => m.getText()).join(' ');
                                const name = method.getName();
                                const params = method.getParameters().map(p => p.getText()).join(', ');
                                const ret = method.getReturnTypeNode()?.getText() ?? '';
                                lines.push(`  ${mods ? mods + ' ' : ''}${name}(${params})${ret ? ': ' + ret : ''} { /* ... */ }`);
                            }
                            lines.push('}');
                            text = lines.join('\n');
                            break;
                        }
                    }
                }

                if (!text) {
                    for (const iface of sourceFile.getInterfaces()) {
                        if (iface.getName() === symbolName) { text = iface.getFullText().trim(); kind = 'interface'; break; }
                    }
                }
                if (!text) {
                    for (const t of sourceFile.getTypeAliases()) {
                        if (t.getName() === symbolName) { text = t.getFullText().trim(); kind = 'type'; break; }
                    }
                }

                sourceFile.forget();
                if (text) return { text, filePath, kind, methods };
            } catch { /* ignore */ }
        }

        return null;
    }

    static getClassMethod(className: string, methodName: string, preferredFile?: string): { text: string; filePath: string } | null {
        const sortedPaths = this.resolveFile(className, preferredFile);
        if (sortedPaths.length === 0) return null;

        for (const filePath of sortedPaths) {
            try {
                const project = new Project({ skipAddingFilesFromTsConfig: true });
                const sourceFile = project.addSourceFileAtPath(filePath);
                for (const cls of sourceFile.getClasses()) {
                    if (cls.getName() === className) {
                        for (const method of cls.getMethods()) {
                            if (method.getName() === methodName) {
                                const text = method.getFullText().trim();
                                sourceFile.forget();
                                return { text, filePath };
                            }
                        }
                    }
                }
                sourceFile.forget();
            } catch { /* ignore */ }
        }
        return null;
    }
}
