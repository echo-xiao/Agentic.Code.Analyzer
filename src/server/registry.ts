import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { CodeRetriever } from './retriever.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import { getOutputPaths, TARGET_SRC_DIR } from '../config.js';

const SESSION = {
    startTime: Date.now(),
    calls: [] as Array<{ tool: string; symbol?: string; tokensReturned: number; ts: number }>,
    symbolHits: new Map<string, number>(),
    totalSkeletonTokens: 0
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
                edgeTypes: {
                    type: "array",
                    items: { type: "string", enum: ["call", "jsx", "new", "event_emit", "event_listen", "pubsub_publish", "pubsub_subscribe", "type"] },
                    description: "Filter to specific edge types. Default: all types including 'type' edges (TypeScript type annotation references). Example: ['call','event_listen'] to only traverse direct calls and event listeners."
                },
                question: { type: "string", description: "Original user question. When provided, enables semantic pruning — edges irrelevant to the question are deprioritized during traversal." }
            },
            required: ["query"]
        }
    },
    {
        name: "implement",
        description: "Step 3 — Read the full source implementation of a specific symbol, plus callee skeletons for downstream context. Call this ONLY after graph has mapped the relationship network. `filename` is REQUIRED — use the exact path returned by search or graph.",
        inputSchema: {
            type: "object",
            properties: {
                symbolName: { type: "string", description: "Symbol name (e.g. sendMessage, executeSendMessage)" },
                filename: { type: "string", description: "REQUIRED: exact file path from search/explore results (e.g. 'apps/meteor/server/methods/sendMessage.ts')" }
            },
            required: ["symbolName", "filename"]
        }
    }
];

const ARCHITECTURE_HINTS: Array<{ keywords: string[]; hint: string }> = [
    {
        keywords: ['sendMessage', 'ComposerMessage', 'ComposerContainer', 'MessageBox', 'handleSendMessage', 'onSend', 'RoomComposer'],
        hint: `⚠️ Architecture Note (Flow 1 — Client Message Sending):
Entry point is RoomBody, NOT sendMessage. Traversing graph up from sendMessage will surface server/federation noise.
Chain: RoomBody → ComposerContainer → ComposerMessage → MessageBox → sendMessage → sdk.call('sendMessage')
Use implement on each component in order. graph(sendMessage, up, client) works but start from RoomBody if possible.`,
    },
    {
        keywords: ['executeSendMessage', 'canSendMessage', 'afterSaveMessage', 'beforeSaveMessage'],
        hint: `⚠️ Architecture Note (Flow 2 — Server Message Sending):
Chain: Meteor.methods(sendMessage) → executeSendMessage → sendMessage(server) → Messages.insertOne → afterSaveMessage callbacks
Entry file: apps/meteor/app/lib/server/methods/sendMessage.ts`,
    },
    {
        keywords: ['sendNotificationsOnMessage', 'sendNotification', 'sendMessageNotifications'],
        hint: `⚠️ Architecture Note (Flow 4 — Push Notifications):
Triggered by afterSaveMessage callback chain after DB write.
Entry: sendNotificationsOnMessage → per-user shouldNotifyMobile/Desktop/Email checks → push queue`,
    },
    {
        keywords: ['StreamerCentral', 'Streamer', 'Meteor.publish', 'registerPublication'],
        hint: `⚠️ Architecture Note (Flow 7 — DDP Subscription/Real-time):
Client subscribes → server publish initial data → StreamerCentral pushes deltas via DDP WebSocket.
Entry: apps/meteor/server/modules/streamer/streamer.module.ts`,
    },
    {
        keywords: ['AppManager', 'AppListenerManager', 'RealAppBridges', 'ProxiedApp', 'AppBridge'],
        hint: `⚠️ Architecture Note (Flow 8 — Apps Engine):
App registers hooks → AppListenerManager fires at event points → Bridge adapts core ↔ App.
Entry: packages/apps-engine/src/server/AppManager.ts`,
    },
    {
        keywords: ['registerLoginHandler', 'authenticationMiddleware', 'loginWithPassword', 'loginWithLDAP'],
        hint: `⚠️ Architecture Note (Flow 9 — Authentication):
Client calls Meteor.loginWith*() → server Accounts.registerLoginHandler → returns token → REST uses authenticationMiddleware.
Entry: apps/meteor/app/authentication/server/index.ts`,
    },
    {
        keywords: ['proxify', 'LocalBroker', 'ServiceClass', 'createService'],
        hint: `⚠️ Special Pattern (core-services Bus):
Services do NOT call each other directly. Calls go through proxify() → LocalBroker.
If you can't find an implementation via graph, search for the ServiceClass with matching name.
Entry: packages/core-services/src/LocalBroker.ts`,
    },
    {
        keywords: ['parse', 'Markup', 'GazzodownText', 'MessageContentBody', 'message-parser'],
        hint: `⚠️ Special Pattern (Message Rendering Pipeline):
This is a data transformation pipeline, NOT a call chain. graph cannot traverse it.
Chain: parse() → AST → <Markup> → <GazzodownText> → <MessageContentBody>
Use implement on each step directly.`,
    },
];

function getArchitectureHint(query: string): string | null {
    const q = query.toLowerCase();
    for (const { keywords, hint } of ARCHITECTURE_HINTS) {
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
        p.includes('/e2e/') || p.includes('/__tests__/');
}

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

            const isCallPattern = /[.'"(\s]/.test(query);
            if (isCallPattern) {
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
                        const formatted = Array.from(byFile.entries())
                            .map(([file, { example, count }]) =>
                                `  ${file} (${count} match${count > 1 ? 'es' : ''})\n    → ${example}`)
                            .join('\n');
                        sections.push(`🔍 Text matches for "${query}" (${byFile.size} files):\n${formatted}`);
                    }
                }
            }

            if (sections.length === 0) return ok(`No results for "${query}". Try a different keyword.`);

            const hint = getArchitectureHint(query);
            const output = hint
                ? `${hint}\n\n---\n\n${sections.join('\n\n')}`
                : sections.join('\n\n');
            return ok(output);
        }

        case "implement": {
            const { symbolName, filename } = args;
            if (!symbolName) return err("Missing parameter: symbolName");
            if (!filename) return err("Missing parameter: filename — provide the exact file path from search/explore results.");

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

            const contexts = CodeRetriever.getContext(symbolName, filename);
            const callees = contexts.slice(1);
            if (callees.length > 0) {
                result += `\n\n---\n\n### Callee Skeletons\n\n${callees.join('\n\n---\n\n')}`;
            }

            trackCall(name, result, symbolName);
            return ok(result);
        }

        case "graph": {
            const { query, direction = "up", depth: rawDepth, layer, mode = "tree", edgeTypes, question } = args;
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
                const relStart = startFiles[0].split('Rocket.Chat/')[1] || startFiles[0];

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

                    const shown = filtered.slice(0, 6);
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
                trackCall(name, out.join('\n'));
                return ok(out.join('\n'));
            }

            const symbolFiles = GLOBAL_INDEX.symbols.get(query);
            if (!symbolFiles && !GLOBAL_INDEX.callGraph.has(query)) {
                return ok(`Symbol "${query}" not found. Use search first.`);
            }

            let relStart = '(unknown file)';
            if (symbolFiles) {
                let files = Array.from(symbolFiles);
                if (layer) { const f = filterByLayer(files, layer); if (f.length) files = f; }
                relStart = files[0].split('Rocket.Chat/')[1] || files[0];
            }

            const startFile = symbolFiles ? Array.from(symbolFiles)[0] : '';
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
                        let callers = (GLOBAL_INDEX.callGraph.get(sym) ?? []) as Array<{ caller: string; file: string; edgeType: EdgeType }>;
                        callers = scopeCallers(callers, fromFile);
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
                trackCall(name, out.join('\n'));
                return ok(out.join('\n'));
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
            trackCall(name, out.join('\n'));
            return ok(out.join('\n'));
        }

        default:
            return err(`未知工具: ${name}`);
    }
}

function ok(text: string) { return { content: [{ type: "text", text }] }; }
function err(text: string) { return { content: [{ type: "text", text }], isError: true }; }
