import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import { CodeRetriever } from './retriever.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import { TARGET_SRC_DIR } from '../config.js';

const SESSION = {
    startTime: Date.now(),
    calls: [] as Array<{ tool: string; symbol?: string; tokensReturned: number; ts: number }>,
    symbolHits: new Map<string, number>(),
    totalSkeletonTokens: 0,
    hasCalledSearchOrGraph: false,
};

function trackCall(tool: string, response: string, symbol?: string) {
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

export const TOOL_DEFINITIONS = [
    {
        name: "search",
        description: "Step 1 — Find symbols and files by name. Searches the symbol index and file paths simultaneously. Pass `layer` when the user's question specifies client/server/packages/ee. Start every investigation here. Also supports call-pattern queries (e.g. 'sdk.call', 'Meteor.call') via full-text search.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Symbol name, filename, path fragment, or call pattern (e.g. 'sendMessage', 'ChatMessages.ts', 'sdk.call')" },
                layer: { type: "string", enum: ["client", "server", "packages", "ee"], description: "Restrict results to this layer. Pass when the user specifies client/server/UI/backend." }
            },
            required: ["query"]
        }
    },
    {
        name: "graph",
        description: "Traverse the full call graph in one shot. direction='up' (default) follows callers upstream — use for 'how does X work' and impact analysis. direction='down' follows callees downstream. mode='impact' shows blast radius layer-by-layer (best for impact analysis). edgeTypes filters which edge types to traverse (default: all types including event/pubsub).",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Symbol name or event name to start traversal from" },
                direction: { type: "string", enum: ["up", "down"], description: "up=trace callers/listeners upstream (default), down=trace callees/emitters downstream" },
                depth: { type: "number", description: "Max traversal depth (default 4, max 6)" },
                layer: { type: "string", enum: ["client", "server", "packages", "ee"], description: "Restrict to this layer." },
                mode: { type: "string", enum: ["tree", "impact"], description: "tree=standard tree view (default), impact=layer-by-layer blast radius (use for impact analysis)" },
                file: { type: "string", description: "Pin the traversal root when the symbol has multiple definitions (collisions like 'Streamer', 'sendMessage'). Pass the exact file path from search results. Omit to auto-pick the most-imported definition." },
                edgeTypes: {
                    type: "array",
                    items: { type: "string", enum: ["call", "jsx", "new", "event_emit", "event_listen", "pubsub_publish", "pubsub_subscribe", "type"] },
                    description: "Filter to specific edge types. Default: all types including 'type' edges (TypeScript type annotation references). Example: ['call','event_listen'] to only traverse direct calls and event listeners."
                },
            },
            required: ["query"]
        }
    },
    {
        name: "implement",
        description: "Read source implementation. For functions/variables: returns full source. For classes: returns method signatures (skeleton) — use `symbolName='ClassName.methodName'` to read a specific method's full source. Call ONLY after search/graph has located the symbol. `filename` is REQUIRED.",
        inputSchema: {
            type: "object",
            properties: {
                symbolName: { type: "string", description: "Symbol name (e.g. 'sendMessage') or class method (e.g. 'RoomService.createRoom')" },
                filename: { type: "string", description: "REQUIRED: exact file path from search/graph results" }
            },
            required: ["symbolName", "filename"]
        }
    }
];

const __registryDir = path.dirname(fileURLToPath(import.meta.url));
const ARCHITECTURE: Array<{ keywords: string[]; hint: string }> = JSON.parse(
    fs.readFileSync(path.resolve(__registryDir, '..', 'architecture.json'), 'utf-8')
);

function getArchitectureHint(query: string): string | null {
    const q = query.toLowerCase();
    for (const { keywords, hint } of ARCHITECTURE) {
        if (keywords.some(k => q.includes(k.toLowerCase()) || k.toLowerCase().includes(q))) {
            return hint;
        }
    }
    return null;
}

const LAYER_SEGMENTS: Record<string, string> = {
    client:   '/client/',
    server:   '/server/',
    packages: '/packages/',
    ee:       '/ee/',
};

function isTestFile(filePath: string): boolean {
    const p = filePath.toLowerCase();
    return p.includes('.test.ts') || p.includes('.spec.ts') ||
        p.includes('.test.tsx') || p.includes('.spec.tsx') ||
        p.includes('/e2e/') || p.includes('/__tests__/') ||
        // Test-data/helper files live under /tests/ without a .test suffix, yet are imported by
        // many other tests → high fan-in. Without this they'd win centrality root selection
        // (e.g. tests/data/livechat/rooms.ts outranking the real sendMessage definition).
        p.includes('/tests/') || p.includes('/test/') || p.includes('.mocks.');
}

// Event/pubsub dependents register via string-keyed dispatch (callbacks.add, Meteor.subscribe…)
// and do NOT statically import the emitter — so import-based scoping would wrongly drop them.
// Only static edges (call/new/jsx/type) carry a real import relationship to scope on.
const DYNAMIC_EDGES = new Set<EdgeType>(['event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe']);
function isDynamicEdge(et: EdgeType): boolean { return DYNAMIC_EDGES.has(et); }

function computeImportDistances(startFile: string): Map<string, number> {
    const dist = new Map<string, number>();
    const queue: string[] = [startFile];
    dist.set(startFile, 0);
    while (queue.length > 0) {
        const cur = queue.shift()!;
        const d = dist.get(cur)!;
        const importers = GLOBAL_INDEX.fileDependents.get(cur);
        if (!importers) continue;
        for (const importer of importers) {
            if (!dist.has(importer)) {
                dist.set(importer, d + 1);
                queue.push(importer);
            }
        }
    }
    return dist;
}

// Choose which definition of a colliding symbol to traverse from.
// Preference order: explicit file > highest fan-in centrality (most-imported) > non-test.
// Avoids the old `Array.from(symbolFiles)[0]` (insertion order ≈ random) that traced the wrong
// definition for collisions like `Streamer` (message streamer vs admin deploy UI).
function pickRootFile(files: string[], preferredFile?: string): string {
    if (files.length === 0) return '';
    if (files.length === 1) return files[0];
    if (preferredFile) {
        const q = preferredFile.toLowerCase().replace(/\.tsx?$/, '');
        const exact = files.find(p => p.toLowerCase().replace(/\.tsx?$/, '').endsWith(q));
        if (exact) return exact;
    }
    return [...files].sort((a, b) => {
        const ta = isTestFile(a) ? 1 : 0, tb = isTestFile(b) ? 1 : 0;
        if (ta !== tb) return ta - tb;
        const ca = GLOBAL_INDEX.fileDependents.get(a)?.size ?? 0;
        const cb = GLOBAL_INDEX.fileDependents.get(b)?.size ?? 0;
        return cb - ca;
    })[0];
}

function filterByLayer(paths: string[], layer: string, strict = false): string[] {
    const seg = LAYER_SEGMENTS[layer];
    if (!seg) return paths;
    const filtered = paths.filter(p => p.includes(seg));
    if (filtered.length > 0) return filtered;
    return strict ? [] : paths;
}

export async function handleToolCall(name: string, args: any): Promise<any> {
    switch (name) {

        case "search": {
            SESSION.hasCalledSearchOrGraph = true;
            const { query, layer } = args;
            if (!query) return err("Missing parameter: query");

            const sections: string[] = [];
            const seenPaths = new Set<string>();
            const q = query.toLowerCase();

            const exactMatch = GLOBAL_INDEX.symbols.get(query);
            if (exactMatch && exactMatch.size > 0) {
                let paths = Array.from(exactMatch);
                if (layer) paths = filterByLayer(paths, layer);
                if (paths.length > 0) {
                    paths.forEach(p => seenPaths.add(p));
                    sections.push(`🎯 Symbol "${query}":\n${paths.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
                }
            }

            // Graph-aware subsystem cluster: seed lexically, expand along the call graph, rank the
            // neighbourhood. This is what lets ONE query surface the whole subsystem (the other core
            // files are graph neighbours of the entry symbol, not name-alikes of the query).
            const cluster = CodeRetriever.search(query, 12, layer);
            const clusterLines: string[] = [];
            let crank = 1;
            for (const r of cluster) {
                const p = r.paths[0];
                if (!p || seenPaths.has(p)) continue;
                seenPaths.add(p);
                const rel = p.split('Rocket.Chat/')[1] || p;
                const tag = r.hop === 0 ? 'seed' : `${r.hop} hop${r.hop > 1 ? 's' : ''}`;
                clusterLines.push(`${crank}. ${rel}  ·  \`${r.symbolName}\` (${tag})`);
                crank++;
            }
            if (clusterLines.length > 0) {
                sections.push(`🧭 Subsystem (ranked by graph proximity to \`${query}\`):\n${clusterLines.join('\n')}`);
            }

            if (sections.length === 0) {
                const prefixHits = Array.from(GLOBAL_INDEX.symbols.keys())
                    .filter(k => k.toLowerCase().startsWith(q))
                    .slice(0, 5);
                if (prefixHits.length === 1) {
                    let paths = Array.from(GLOBAL_INDEX.symbols.get(prefixHits[0]) ?? []);
                    if (layer) paths = filterByLayer(paths, layer);
                    paths.forEach(p => seenPaths.add(p));
                    sections.push(`🔍 Symbol "${prefixHits[0]}":\n${paths.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
                } else if (prefixHits.length > 1) {
                    sections.push(`💡 Symbol prefix matches: ${prefixHits.join(', ')}`);
                }
            }

            if (sections.length === 0) {
                const ranked = CodeRetriever.search(query, 20, layer);
                if (ranked.length > 0) {
                    const top = ranked.filter(r => r.finalScore >= 0.3).slice(0, 5);
                    if (top.length > 0) {
                        top.forEach(r => r.paths.forEach((p: string) => seenPaths.add(p)));
                        sections.push(`🔍 Symbols:\n${top.map((r, i) =>
                            `${i + 1}. [${r.finalScore.toFixed(3)}] ${r.symbolName}\n   → ${r.paths[0] ?? 'unknown'}`
                        ).join('\n')}`);
                    }
                }
            }

            let pathMatches = Array.from(GLOBAL_INDEX.allFiles)
                .filter(f => f.toLowerCase().includes(q) && !seenPaths.has(f));
            if (layer) pathMatches = filterByLayer(pathMatches, layer);
            pathMatches = pathMatches.slice(0, 15);
            if (pathMatches.length > 0) {
                sections.push(`📁 Files:\n${pathMatches.join('\n')}`);
            }

            // Run content grep for call-pattern queries, OR as a last resort when the symbol/file
            // index matched nothing — so a wrong entry-symbol guess still surfaces a file instead of
            // returning "no results" and letting the agent give up (federation / apps-engine).
            const isCallPattern = /[.'"(\s]/.test(query);
            if (isCallPattern || sections.length === 0) {
                const grepArgs = [
                    '-r', '-n', '-F',
                    '--include=*.ts', '--include=*.tsx',
                    '--exclude-dir=node_modules', '--exclude-dir=dist',
                    '--exclude=*.test.ts', '--exclude=*.spec.ts',
                    query, TARGET_SRC_DIR,
                ];
                const grep = spawnSync('grep', grepArgs, { encoding: 'utf-8', maxBuffer: 4 * 1024 * 1024 });
                if (grep.stdout) {
                    const byFile = new Map<string, { example: string; count: number }>();
                    for (const line of grep.stdout.trim().split('\n').filter(Boolean)) {
                        const m = line.match(/^(.+?):(\d+):(.*)$/);
                        if (!m) continue;
                        const rel = m[1].split('Rocket.Chat/')[1] ?? m[1];
                        if (layer && !rel.includes(`/${layer}/`)) continue;
                        if (!byFile.has(rel)) byFile.set(rel, { example: m[3].trim(), count: 0 });
                        byFile.get(rel)!.count++;
                    }
                    if (byFile.size > 0) {
                        const sorted = Array.from(byFile.entries())
                            .sort((a, b) => b[1].count - a[1].count);
                        const top = sorted.slice(0, 10);
                        const formatted = top
                            .map(([file, { example, count }]) =>
                                `  ${file} (${count} match${count > 1 ? 'es' : ''})\n    → ${example}`)
                            .join('\n');
                        const extra = sorted.length > 10 ? `\n  … +${sorted.length - 10} more files` : '';
                        sections.push(`🔍 Text matches for "${query}" (${sorted.length} files, top 10 by count):\n${formatted}${extra}`);
                    }
                }
            }

            if (sections.length === 0) return ok(`No results for "${query}". Try a different keyword.`);

            const hint = getArchitectureHint(query);
            const body = hint
                ? `${hint}\n\n---\n\n${sections.join('\n\n')}`
                : sections.join('\n\n');
            const navHint = `\n\n💡 **Next:** Use graph("${query}", "down") to trace the call chain, or graph("${query}", "up") to find callers.`;
            return ok(body + navHint);
        }

        case "implement": {
            const { symbolName, filename } = args;
            if (!symbolName) return err("Missing parameter: symbolName");
            if (!filename) return err("Missing parameter: filename — provide the exact file path from search/graph results.");

            // Enforce: must call search or graph before implement
            if (!SESSION.hasCalledSearchOrGraph) {
                return ok(
                    `⚠️ Use search or graph first to locate symbols before reading implementations.\n` +
                    `Example: search("${symbolName}") → find the file → then implement.`
                );
            }

            // Support ClassName.methodName syntax
            if (symbolName.includes('.')) {
                const [className, methodName] = symbolName.split('.', 2);
                const method = CodeRetriever.getClassMethod(className, methodName, filename);
                if (!method) {
                    return ok(`Method "${methodName}" not found in class "${className}" in "${filename}". Use implement("${className}", "${filename}") to see available methods.`);
                }
                const rel = method.filePath.split('Rocket.Chat/')[1] || method.filePath;
                const result = `## ${className}.${methodName} — ${rel}\n\n\`\`\`typescript\n${method.text}\n\`\`\`\n\n💡 **Next:** graph("${methodName}", "down") to trace callees, or graph("${methodName}", "up") to find callers.`;
                trackCall(name, result, symbolName);
                return ok(result);
            }

            const impl = CodeRetriever.getImplementation(symbolName, filename);
            if (!impl) {
                const paths = GLOBAL_INDEX.symbols.get(symbolName);
                if (paths && paths.size > 0) {
                    return ok(
                        `Symbol "${symbolName}" not found in "${filename}".\n` +
                        `It exists in:\n${Array.from(paths).map((p, i) => `${i + 1}. ${p}`).join('\n')}\n` +
                        `Retry with the correct filename.`
                    );
                }
                return ok(`Symbol "${symbolName}" not found. Use search to confirm the name.`);
            }

            const relativePath = impl.filePath.split('Rocket.Chat/')[1] || impl.filePath;
            let result = `## File: ${relativePath}\n\n\`\`\`typescript\n${impl.text}\n\`\`\``;

            // For classes: list methods and hint to use ClassName.methodName
            if (impl.kind === 'class' && impl.methods && impl.methods.length > 0) {
                result += `\n\n📋 **Methods (${impl.methods.length}):** ${impl.methods.join(', ')}\n`;
                result += `💡 To read a specific method: implement("${symbolName}.methodName", "${filename}")`;
            }

            // Navigation hints
            result += `\n\n💡 **Next:** graph("${symbolName}", "down") to trace callees, or graph("${symbolName}", "up") to find callers.`;

            trackCall(name, result, symbolName);
            return ok(result);
        }

        case "graph": {
            SESSION.hasCalledSearchOrGraph = true;
            const { query, direction = "up", depth: rawDepth, layer, mode = "tree", edgeTypes, file: preferredFile } = args;
            if (!query) return err("Missing parameter: query");
            const maxDepth = Math.min(typeof rawDepth === 'number' ? rawDepth : 4, 6);

            const DEFAULT_EDGE_TYPES = new Set<EdgeType>([
                'call', 'jsx', 'new', 'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe', 'type'
            ]);
            const allowedEdgeTypes: Set<EdgeType> = edgeTypes?.length > 0
                ? new Set(edgeTypes as EdgeType[])
                : DEFAULT_EDGE_TYPES;

            const edgeAllowed = (et: EdgeType): boolean => allowedEdgeTypes.has(et);

            const edgeLabel: Record<EdgeType, string> = {
                call: '',
                jsx: ' [jsx]',
                new: ' [new]',
                event_emit: ' [event→]',
                event_listen: ' [→event]',
                pubsub_publish: ' [pub]',
                pubsub_subscribe: ' [sub]',
                type: ' [type]',
            };

            if (direction === "down") {
                const calleesOf = new Map<string, Array<{ callee: string; edgeType: EdgeType }>>();
                for (const [callee, callersList] of GLOBAL_INDEX.callGraph.entries()) {
                    for (const { caller, edgeType } of callersList) {
                        if (!edgeAllowed(edgeType as EdgeType)) continue;
                        if (!calleesOf.has(caller)) calleesOf.set(caller, []);
                        const arr = calleesOf.get(caller)!;
                        if (!arr.some(x => x.callee === callee)) arr.push({ callee, edgeType: edgeType as EdgeType });
                    }
                }

                const symbolFiles = GLOBAL_INDEX.symbols.get(query);
                if (!symbolFiles || symbolFiles.size === 0) {
                    return ok(`Symbol "${query}" not found. Use search first.`);
                }
                let startFiles = Array.from(symbolFiles);
                if (layer) { const f = filterByLayer(startFiles, layer); if (f.length) startFiles = f; }
                const rootDown = pickRootFile(startFiles, preferredFile);
                const relStart = rootDown.split('Rocket.Chat/')[1] || rootDown;

                const out: string[] = [
                    `## Call Graph ↓ downstream of \`${query}\` (depth=${maxDepth})\n`,
                    `📍 \`${query}\` · ${relStart}`,
                ];
                const visited = new Set<string>();

                const traverseDown = (sym: string, indent: number, d: number) => {
                    if (d <= 0) return;
                    const entries = calleesOf.get(sym) ?? [];
                    const filtered = layer
                        ? entries.filter(e => {
                            const files = GLOBAL_INDEX.symbols.get(e.callee);
                            return !files || filterByLayer(Array.from(files), layer, true).length > 0;
                        })
                        : entries;

                    // Rank children by relevance before truncating: real (non-test), higher-fan-in
                    // definitions first. The old arbitrary `.slice(0,6)` (index scan order) is a
                    // direct cause of thin, downstream-missing answers — it could drop the important
                    // callee and keep an incidental one.
                    const centralityOf = (sym: string): number => {
                        const cp = GLOBAL_INDEX.symbols.get(sym);
                        if (!cp) return 0;
                        return Math.max(0, ...Array.from(cp).map(p => GLOBAL_INDEX.fileDependents.get(p)?.size ?? 0));
                    };
                    const isTestSym = (sym: string): boolean => {
                        const cp = GLOBAL_INDEX.symbols.get(sym);
                        return cp ? Array.from(cp).every(p => isTestFile(p)) : false;
                    };
                    const ranked = [...filtered].sort((a, b) =>
                        (isTestSym(a.callee) ? 1 : 0) - (isTestSym(b.callee) ? 1 : 0) ||
                        centralityOf(b.callee) - centralityOf(a.callee));
                    const shown = ranked.slice(0, 6);
                    for (const { callee, edgeType } of shown) {
                        const key = `${sym}→${callee}`;
                        const pad = '  '.repeat(indent);
                        const label = edgeLabel[edgeType] ?? '';
                        if (visited.has(key)) { out.push(`${pad}→ \`${callee}\`${label} ↩`); continue; }
                        visited.add(key);
                        const cp = GLOBAL_INDEX.symbols.get(callee);
                        const rf = cp ? path.basename(Array.from(cp)[0]) : '';
                        out.push(`${pad}→ \`${callee}\`${label}${rf ? ` · ${rf}` : ''}`);
                        traverseDown(callee, indent + 1, d - 1);
                    }
                    if (filtered.length > 6) out.push(`${'  '.repeat(indent)}… +${filtered.length - 6} more`);
                };

                traverseDown(query, 1, maxDepth);
                if (out.length <= 2) out.push('  (no callees found in index)');
                const graphHintDown = getArchitectureHint(query);
                const graphOutDown = graphHintDown ? `${graphHintDown}\n\n---\n\n${out.join('\n')}` : out.join('\n');
                trackCall(name, graphOutDown);
                return ok(graphOutDown);
            }

            const symbolFiles = GLOBAL_INDEX.symbols.get(query);
            if (!symbolFiles && !GLOBAL_INDEX.callGraph.has(query)) {
                return ok(`Symbol "${query}" not found. Use search first.`);
            }

            let relStart = '(unknown file)';
            let startFile = '';
            if (symbolFiles) {
                let files = Array.from(symbolFiles);
                if (layer) { const f = filterByLayer(files, layer); if (f.length) files = f; }
                startFile = pickRootFile(files, preferredFile);
                relStart = startFile.split('Rocket.Chat/')[1] || startFile;
            }
            const importDist = startFile ? computeImportDistances(startFile) : new Map<string, number>();

            const scopeCallers = (
                callers: Array<{ caller: string; file: string; edgeType: EdgeType }>,
                fromFile: string | null
            ) => {
                if (!fromFile) return callers;
                const importers = GLOBAL_INDEX.fileDependents.get(fromFile);
                if (!importers || importers.size === 0) return callers;
                const scoped = callers.filter(c => importers.has(c.file) || c.file === fromFile);
                return scoped.length > 0 ? scoped : callers;
            };

            if (mode === 'impact') {
                const out: string[] = [
                    `## Impact Analysis: changing \`${query}\`\n`,
                    `📍 \`${query}\` · ${relStart}\n`,
                ];

                const visited = new Set<string>();
                let frontier: Array<{ sym: string; file: string }> = [{ sym: query, file: startFile }];
                visited.add(`${query}@${startFile}`);

                for (let hop = 1; hop <= maxDepth && frontier.length > 0; hop++) {
                    const nextFrontier: Array<{ sym: string; file: string }> = [];
                    const layerEntries: Array<{ sym: string; file: string; edgeType: EdgeType }> = [];

                    for (const { sym, file: fromFile } of frontier) {
                        const allCallers = (GLOBAL_INDEX.callGraph.get(sym) ?? []) as Array<{ caller: string; file: string; edgeType: EdgeType }>;
                        // Scope only static edges by import distance; keep dynamic (event/pubsub) deps unconditionally.
                        const staticScoped = scopeCallers(allCallers.filter(c => !isDynamicEdge(c.edgeType as EdgeType)), fromFile);
                        const dynamic = allCallers.filter(c => isDynamicEdge(c.edgeType as EdgeType));
                        const callers = [...staticScoped, ...dynamic];
                        for (const { caller, file, edgeType } of callers) {
                            if (!edgeAllowed(edgeType as EdgeType)) continue;
                            if (layer && filterByLayer([file], layer, true).length === 0) continue;
                            if (isTestFile(file)) continue;
                            const key = `${caller}@${file}`;
                            if (!visited.has(key)) {
                                visited.add(key);
                                nextFrontier.push({ sym: caller, file });
                                layerEntries.push({ sym: caller, file, edgeType: edgeType as EdgeType });
                            }
                        }
                    }

                    if (layerEntries.length === 0) break;

                    const byType = new Map<EdgeType, typeof layerEntries>();
                    for (const e of layerEntries) {
                        if (!byType.has(e.edgeType)) byType.set(e.edgeType, []);
                        byType.get(e.edgeType)!.push(e);
                    }

                    const hopLabel = hop === 1 ? 'Direct callers' : hop === 2 ? 'Indirect dependents' : `${hop}-hop dependents`;
                    out.push(`### ${hopLabel} (${layerEntries.length} symbols)\n`);

                    for (const [et, entries] of byType.entries()) {
                        const label = edgeLabel[et] || '[call]';
                        out.push(`**${label.trim() || 'call'}** (${entries.length}):`);
                        const shown = entries.slice(0, 15);
                        for (const { sym, file } of shown) {
                            const rel = file.split('Rocket.Chat/')[1] || file;
                            out.push(`  · \`${sym}\` — ${rel}`);
                        }
                        if (entries.length > 15) out.push(`  … +${entries.length - 15} more`);
                    }
                    out.push('');

                    frontier = nextFrontier;
                }

                if (out.length <= 3) out.push('  (no dependents found — symbol may be a leaf node)');
                const graphHintImpact = getArchitectureHint(query);
                const graphOutImpact = graphHintImpact ? `${graphHintImpact}\n\n---\n\n${out.join('\n')}` : out.join('\n');
                trackCall(name, graphOutImpact);
                return ok(graphOutImpact);
            }

            const out: string[] = [
                `## Call Graph ↑ upstream of \`${query}\` (depth=${maxDepth})\n`,
                `📍 \`${query}\` · ${relStart}`,
            ];
            const visited = new Set<string>();

            const traverseUp = (sym: string, fromFile: string | null, indent: number, d: number) => {
                if (d <= 0) { out.push(`${'  '.repeat(indent)}… (max depth reached)`); return; }
                let callers = GLOBAL_INDEX.callGraph.get(sym);
                if (!callers || callers.length === 0) return;

                callers = scopeCallers(callers, fromFile);

                callers = callers.filter(c => edgeAllowed(c.edgeType as EdgeType));
                if (layer) {
                    const f = callers.filter(c => filterByLayer([c.file], layer, true).length > 0);
                    if (f.length > 0) callers = f;
                }

                const byFile = new Map<string, Array<{ caller: string; edgeType: EdgeType }>>();
                for (const { caller, file, edgeType } of callers) {
                    if (!byFile.has(file)) byFile.set(file, []);
                    byFile.get(file)!.push({ caller, edgeType: edgeType as EdgeType });
                }

                const cap = layer ? 8 : 5;
                const ranked = Array.from(byFile.entries())
                    .filter(([file]) => !isTestFile(file))
                    .map(([file, entries]) => ({ file, entries, dist: importDist.get(file) ?? Infinity }))
                    .sort((a, b) => a.dist - b.dist);
                const testFilesHidden = byFile.size - ranked.length;
                const topFiles = ranked.slice(0, cap);
                const extraFiles = ranked.length - topFiles.length;

                const pad0 = '  '.repeat(indent);
                for (const { file, entries } of topFiles) {
                    const rel = file.split('Rocket.Chat/')[1] || file;
                    const key = `${entries[0].caller}@${file}`;
                    const labels = entries.map(e => `\`${e.caller}\`${edgeLabel[e.edgeType]}`).join(', ');
                    if (visited.has(key)) {
                        out.push(`${pad0}← ${labels} · ${rel} ↩`);
                        continue;
                    }
                    visited.add(key);
                    out.push(`${pad0}← ${labels} · ${rel}`);
                    for (const { caller } of entries.slice(0, 3)) traverseUp(caller, file, indent + 1, d - 1);
                }
                const notes: string[] = [];
                if (extraFiles > 0) notes.push(`+${extraFiles} more files`);
                if (testFilesHidden > 0) notes.push(`${testFilesHidden} test/spec hidden`);
                if (notes.length > 0) out.push(`${pad0}… (${notes.join(', ')})`);
            };

            traverseUp(query, startFile || null, 1, maxDepth);
            if (out.length <= 2) out.push('  (no callers found — try without layer filter, or check symbol name)');
            const graphHintUp = getArchitectureHint(query);
            const graphOutUp = graphHintUp ? `${graphHintUp}\n\n---\n\n${out.join('\n')}` : out.join('\n');
            trackCall(name, graphOutUp);
            return ok(graphOutUp);
        }

        default:
            return err(`未知工具: ${name}`);
    }
}

function ok(text: string) { return { content: [{ type: "text", text }] }; }
function err(text: string) { return { content: [{ type: "text", text }], isError: true }; }
