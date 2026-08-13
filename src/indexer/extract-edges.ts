// extract-edges.ts — cross-layer edge detection from a ts-morph AST node.
// Extracted from skeleton.ts: the 12-edge-type string-dispatch detector
// (event_emit/listen · pubsub · rest_call/route · stream · call · type). Pure: node → CallEdge[].
// Consumed by skeleton.ts's process* methods (per-symbol edge lists).
import { Node, SyntaxKind } from 'ts-morph';
import type { CallEdge, LegacyEdgeType } from './state.js';

const BUILTIN_IGNORE = new Set([
    'console', 'Math', 'Object', 'Array', 'String', 'Number', 'JSON',
    'Promise', 'Error', 'setTimeout', 'clearTimeout', 'setInterval',
    'parseInt', 'parseFloat', 'require', 'import', 'super', 'toString'
]);

const TS_BUILTIN_TYPES = new Set([
    'Promise', 'Array', 'Record', 'Map', 'Set', 'WeakMap', 'WeakSet',
    'Partial', 'Required', 'Readonly', 'Pick', 'Omit', 'Extract', 'Exclude',
    'ReturnType', 'Parameters', 'InstanceType', 'NonNullable', 'Awaited',
    'ConstructorParameters', 'ThisParameterType', 'OmitThisParameter',
    'void', 'never', 'unknown', 'any', 'boolean', 'string', 'number',
    'object', 'Function', 'Date', 'RegExp', 'Event', 'Element', 'Node',
    'Error', 'TypeError', 'RangeError', 'EventEmitter', 'Buffer',
    'ReadonlyArray', 'ReadonlyMap', 'ReadonlySet',
]);

const CALLBACKS_EMIT_METHODS = new Set(['run', 'runAsync', 'priority']);
const CALLBACKS_LISTEN_METHODS = new Set(['add', 'addFrom']);

export function extractCalls(node: any): CallEdge[] {
        const calls = new Map<string, CallEdge>();

        const add = (name: string, edgeType: LegacyEdgeType, event?: string) => {
            if (!name || name.length <= 1 || BUILTIN_IGNORE.has(name)) return;
            const key = event ? `${name}:${edgeType}:${event}` : `${name}:${edgeType}`;
            if (!calls.has(key)) calls.set(key, { name, edgeType, ...(event ? { event } : {}) });
        };

        // Normalize a REST path to a version-less key so the client call and server route match:
        // '/v1/livechat/room' → 'livechat/room', 'livechat/room' → 'livechat/room'.
        const normRoute = (p: string) => p.replace(/^\//, '').replace(/^v\d+\//, '');

        try {
            node.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call: any) => {
                const expr = call.getExpression();

                if (Node.isPropertyAccessExpression(expr)) {
                    const method = expr.getName();
                    const objText = expr.getExpression().getText();
                    const args = call.getArguments();

                    if (CALLBACKS_EMIT_METHODS.has(method) &&
                        (objText === 'callbacks' || objText.endsWith('.callbacks'))) {
                        const firstArg = args[0];
                        if (firstArg && Node.isStringLiteral(firstArg)) {
                            add(firstArg.getLiteralValue(), 'event_emit');
                        }
                    }

                    if (CALLBACKS_LISTEN_METHODS.has(method) &&
                        (objText === 'callbacks' || objText.endsWith('.callbacks'))) {
                        const eventArg = args[0];
                        const handlerArg = args[1];
                        if (eventArg && Node.isStringLiteral(eventArg)) {
                            const eventName = eventArg.getLiteralValue();
                            let handlerName: string | null = null;
                            if (handlerArg) {
                                if (Node.isIdentifier(handlerArg)) {
                                    handlerName = handlerArg.getText();
                                } else if (Node.isPropertyAccessExpression(handlerArg)) {
                                    handlerName = handlerArg.getName();
                                }
                            }
                            if (handlerName) {
                                add(handlerName, 'event_listen', eventName);
                            } else {
                                add(eventName, 'event_listen');
                            }
                        }
                    }

                    if (method === 'emit') {
                        const firstArg = args[0];
                        if (firstArg) {
                            if (Node.isStringLiteral(firstArg)) {
                                add(firstArg.getLiteralValue(), 'event_emit');
                            } else if (Node.isPropertyAccessExpression(firstArg)) {
                                add(firstArg.getText(), 'event_emit');
                            }
                        }
                    }

                    if (method === 'on' || method === 'once') {
                        const eventArg = args[0];
                        const handlerArg = args[1];
                        if (eventArg) {
                            const eventName = Node.isStringLiteral(eventArg)
                                ? eventArg.getLiteralValue()
                                : Node.isPropertyAccessExpression(eventArg)
                                    ? eventArg.getText()
                                    : null;
                            if (eventName) {
                                let handlerName: string | null = null;
                                if (handlerArg) {
                                    if (Node.isIdentifier(handlerArg)) {
                                        handlerName = handlerArg.getText();
                                    } else if (Node.isPropertyAccessExpression(handlerArg)) {
                                        handlerName = handlerArg.getName();
                                    }
                                }
                                if (handlerName) {
                                    add(handlerName, 'event_listen', eventName);
                                } else {
                                    add(eventName, 'event_listen');
                                }
                            }
                        }
                    }

                    if (objText === 'Meteor' && method === 'publish') {
                        const nameArg = args[0];
                        if (nameArg && Node.isStringLiteral(nameArg)) {
                            add(nameArg.getLiteralValue(), 'pubsub_publish');
                        }
                    }

                    if (objText === 'Meteor' && method === 'subscribe') {
                        const nameArg = args[0];
                        if (nameArg && Node.isStringLiteral(nameArg)) {
                            add(nameArg.getLiteralValue(), 'pubsub_subscribe');
                        }
                    }

                    if (method === 'call' || method === 'callAsync') {
                        const firstArg = args[0];
                        if (firstArg && Node.isStringLiteral(firstArg)) {
                            const target = firstArg.getLiteralValue();
                            add(target, 'call');
                        }
                    }

                    if (method === 'methods' && (objText === 'Meteor')) {
                        const firstArg = args[0];
                        if (firstArg && Node.isObjectLiteralExpression(firstArg)) {
                            for (const prop of firstArg.getProperties()) {
                                if (Node.isMethodDeclaration(prop) || Node.isPropertyAssignment(prop)) {
                                    const nameNode = prop.getNameNode?.();
                                    if (nameNode) {
                                        const methodName = Node.isStringLiteral(nameNode)
                                            ? nameNode.getLiteralValue()
                                            : Node.isIdentifier(nameNode)
                                                ? nameNode.getText()
                                                : null;
                                        if (methodName) {
                                            add(methodName, 'call');
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // REST client call: X.rest.get/post('/v1/path', …) — the path literal is the
                    // cross-layer link to the server route registration (client↔server seam).
                    if (/(^|\.)rest$/.test(objText) &&
                        ['get', 'post', 'put', 'delete'].includes(method)) {
                        const p = args[0];
                        if (p && Node.isStringLiteral(p)) add(normRoute(p.getLiteralValue()), 'rest_call');
                    }
                    // REST server route registration: API.v1.addRoute('path') / API.v1.get/post('path').
                    if (method === 'addRoute' ||
                        (/(^|\.)API(\.(v\d+|default))?$/.test(objText) &&
                            ['get', 'post', 'put', 'delete'].includes(method))) {
                        const p = args[0];
                        if (p && Node.isStringLiteral(p)) add(normRoute(p.getLiteralValue()), 'rest_route');
                    }
                    // Service-bus broadcast: api.broadcast('watch.rooms') — emit half, pairs with onEvent.
                    if (method === 'broadcast') {
                        const p = args[0];
                        if (p && Node.isStringLiteral(p)) add(p.getLiteralValue(), 'event_emit');
                    }
                    // Streamer subscribe (client): sdk.stream('notify-user', …) — pairs with new Streamer(…).
                    if (method === 'stream') {
                        const p = args[0];
                        if (p && Node.isStringLiteral(p)) add(p.getLiteralValue(), 'stream_sub');
                    }
                    // Slash command registration: slashCommands.add('kick', …) or .add({ command: 'kick' }).
                    if (method === 'add' && /(^|\.)slashCommands$/.test(objText)) {
                        const a = args[0];
                        if (a && Node.isStringLiteral(a)) add(a.getLiteralValue(), 'event_listen');
                        else if (a && Node.isObjectLiteralExpression(a)) {
                            for (const prop of a.getProperties()) {
                                if (Node.isPropertyAssignment(prop) && prop.getName?.() === 'command') {
                                    const init = prop.getInitializer?.();
                                    if (init && Node.isStringLiteral(init)) add(init.getLiteralValue(), 'event_listen');
                                }
                            }
                        }
                    }

                    const name = method;
                    if (name && name.length > 1 && !BUILTIN_IGNORE.has(name) &&
                        !CALLBACKS_EMIT_METHODS.has(name) && !CALLBACKS_LISTEN_METHODS.has(name) &&
                        !['emit', 'on', 'once', 'publish', 'subscribe', 'broadcast'].includes(name)) {
                        add(name, 'call');
                    }

                } else if (Node.isIdentifier(expr)) {
                    const fnName = expr.getText();
                    // Service-bus listener: onEvent('watch.rooms', handler) — listen half of broadcast.
                    if (fnName === 'onEvent') {
                        const evt = call.getArguments()[0];
                        if (evt && Node.isStringLiteral(evt)) add(evt.getLiteralValue(), 'event_listen');
                    } else {
                        add(fnName, 'call');
                    }
                }
            });

            node.getDescendantsOfKind(SyntaxKind.JsxOpeningElement).forEach((el: any) => {
                const tagName = el.getTagNameNode()?.getText?.();
                if (tagName && /^[A-Z]/.test(tagName) && !BUILTIN_IGNORE.has(tagName)) {
                    add(tagName, 'jsx');
                }
            });
            node.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement).forEach((el: any) => {
                const tagName = el.getTagNameNode()?.getText?.();
                if (tagName && /^[A-Z]/.test(tagName) && !BUILTIN_IGNORE.has(tagName)) {
                    add(tagName, 'jsx');
                }
            });

            node.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach((attr: any) => {
                const init = attr.getInitializer();
                if (Node.isJsxExpression(init)) {
                    const expr = init.getExpression();
                    if (Node.isIdentifier(expr)) {
                        const name = expr.getText();
                        add(name, 'jsx');
                    }
                }
            });

            node.getDescendantsOfKind(SyntaxKind.NewExpression).forEach((expr: any) => {
                const ctor = expr.getExpression();
                const name = Node.isIdentifier(ctor) ? ctor.getText() : null;
                if (name) add(name, 'new');
                // Streamer definition: new [this.|Meteor.]Streamer('notify-user') — pairs with sdk.stream(…).
                const ctorName = Node.isIdentifier(ctor) ? ctor.getText()
                    : Node.isPropertyAccessExpression(ctor) ? ctor.getName() : null;
                if (ctorName === 'Streamer' || (ctorName && ctorName.endsWith('Streamer'))) {
                    const a = expr.getArguments?.()[0];
                    if (a && Node.isStringLiteral(a)) add(a.getLiteralValue(), 'stream_def');
                }
            });

            node.getDescendantsOfKind(SyntaxKind.TypeReference).forEach((typeRef: any) => {
                const typeName = typeRef.getTypeName?.();
                if (!typeName) return;
                const tName = Node.isIdentifier(typeName) ? typeName.getText() : null;
                if (tName && /^[A-Z]/.test(tName) &&
                    !BUILTIN_IGNORE.has(tName) && !TS_BUILTIN_TYPES.has(tName)) {
                    add(tName, 'type');
                }
            });

        } catch { /* ignore */ }

        return Array.from(calls.values());
    }

    // Class heritage: `extends ServiceClassInternal implements IRoomService` — the base class and
    // interfaces are a shared static anchor linking a service to its consumers (who reference the
    // same interface). Emitted as `type` edges on the class symbol (heritage lives on the class
    // declaration, outside any method, so extractCalls never sees it).
export function extractHeritage(cls: any): CallEdge[] {
        const out: CallEdge[] = [];
        try {
            for (const hc of cls.getHeritageClauses?.() ?? []) {
                for (const t of hc.getTypeNodes?.() ?? []) {
                    const e = t.getExpression?.();
                    const nm = e && Node.isIdentifier(e) ? e.getText() : null;
                    if (nm && nm.length > 1 && /^[A-Z]/.test(nm) &&
                        !BUILTIN_IGNORE.has(nm) && !TS_BUILTIN_TYPES.has(nm)) {
                        out.push({ name: nm, edgeType: 'type' });
                    }
                }
            }
        } catch { /* ignore */ }
        return out;
    }

