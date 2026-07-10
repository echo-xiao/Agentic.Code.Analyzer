import { Project, Node, SourceFile, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';
import type { CallEdge, EdgeType } from './state.js';

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

export class SkeletonGenerator {
    static generate(filePath: string): { skeleton: string, mapping: any } {
        const project = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: true } });
        const sourceFile = project.addSourceFileAtPath(filePath);

        const mapping: any = {
            sourcePath: filePath,
            symbols: [],
            imports: []
        };

        this.processImports(sourceFile, filePath, mapping);

        // Run BEFORE processClasses/processFunctions, which mutate the AST (setBodyText).
        this.processTopLevel(sourceFile, filePath, mapping);

        this.processClasses(sourceFile, mapping);
        this.processFunctions(sourceFile, mapping);
        this.processInterfacesAndTypes(sourceFile, mapping);
        this.processEnums(sourceFile, mapping);

        const skeletonMd = this.convertToMarkdown(sourceFile, filePath);
        sourceFile.forget();

        return { skeleton: skeletonMd, mapping };
    }

    private static extractCalls(node: any): CallEdge[] {
        const calls = new Map<string, CallEdge>();

        const add = (name: string, edgeType: EdgeType, event?: string) => {
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
    private static extractHeritage(cls: any): CallEdge[] {
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

    private static readonly HOOK_WRAPPERS = new Set([
        'useCallback', 'useMemo', 'useEffectEvent', 'useEvent',
    ]);

    private static unwrapHook(initNode: any): any {
        if (Node.isCallExpression(initNode)) {
            const callee = initNode.getExpression();
            const calleeName = Node.isIdentifier(callee) ? callee.getText() : null;
            if (calleeName && this.HOOK_WRAPPERS.has(calleeName)) {
                const args = initNode.getArguments();
                if (args.length > 0) return args[0];
            }
        }
        return initNode;
    }

    private static extractInnerFunctions(fnNode: any, outerName: string, mapping: any) {
        const HANDLER_RE = /^(on[A-Z]|handle[A-Z])/;

        const register = (name: string, fnBody: any, line: number) => {
            const calls = this.extractCalls(fnBody);
            if (calls.length === 0) return;
            mapping.symbols.push({
                type: 'inner_function',
                name,
                exported: false,
                qualifiedName: `${outerName}.${name}`,
                line,
                endLine: this.endLineOf(fnBody),
                signature: this.signatureOf(fnBody),
                containerClass: outerName.includes('.') ? outerName.split('.')[0] : undefined,
                calls,
            });
        };

        try {
            fnNode.getDescendantsOfKind(SyntaxKind.VariableDeclaration).forEach((v: any) => {
                const name = v.getName?.();
                if (!name || !HANDLER_RE.test(name)) return;
                const unwrapped = this.unwrapHook(v.getInitializer?.());
                if (!unwrapped) return;
                if (!Node.isArrowFunction(unwrapped) && !Node.isFunctionExpression(unwrapped)) return;
                register(name, unwrapped, v.getStartLineNumber());
            });

            fnNode.getDescendantsOfKind(SyntaxKind.PropertyAssignment).forEach((pa: any) => {
                const nameNode = pa.getNameNode?.();
                const name = nameNode && Node.isIdentifier(nameNode) ? nameNode.getText() : null;
                if (!name || !HANDLER_RE.test(name)) return;
                const unwrapped = this.unwrapHook(pa.getInitializer?.());
                if (!unwrapped) return;
                if (!Node.isArrowFunction(unwrapped) && !Node.isFunctionExpression(unwrapped)) return;
                register(name, unwrapped, pa.getStartLineNumber());
            });
        } catch { /* ignore */ }
    }

    // Module-top-level statements (bare `callbacks.add('afterSaveMessage', (m)=>..., ...)`,
    // `Meteor.startup(() => {...})`, etc.) are NOT inside any declared function/class/variable,
    // so the per-symbol extractCalls passes never see them — the most common Rocket.Chat hook
    // registration pattern was completely invisible to the graph (e.g. notifications listening on
    // afterSaveMessage). Capture them under a synthetic module symbol (named after the file).
    private static readonly TOP_LEVEL_SKIP = new Set<SyntaxKind>([
        SyntaxKind.FunctionDeclaration, SyntaxKind.ClassDeclaration,
        SyntaxKind.InterfaceDeclaration, SyntaxKind.TypeAliasDeclaration,
        SyntaxKind.EnumDeclaration, SyntaxKind.ImportDeclaration,
        SyntaxKind.ExportDeclaration, SyntaxKind.VariableStatement,
        SyntaxKind.ModuleDeclaration,
    ]);

    private static processTopLevel(sourceFile: SourceFile, filePath: string, mapping: any) {
        const moduleName = path.basename(filePath).replace(/\.(tsx?|jsx?)$/, '');
        const calls = new Map<string, CallEdge>();
        try {
            for (const stmt of sourceFile.getStatements()) {
                if (this.TOP_LEVEL_SKIP.has(stmt.getKind())) continue;
                for (const c of this.extractCalls(stmt)) {
                    const key = c.event ? `${c.name}:${c.edgeType}:${c.event}` : `${c.name}:${c.edgeType}`;
                    if (!calls.has(key)) calls.set(key, c);
                }
            }
        } catch { /* ignore */ }
        if (calls.size > 0) {
            mapping.symbols.push({
                type: 'module',
                name: moduleName,
                exported: false,
                line: 1,
                endLine: this.endLineOf(sourceFile),
                signature: moduleName,
                calls: Array.from(calls.values()),
            });
        }
    }

    private static processImports(sourceFile: SourceFile, filePath: string, mapping: any) {
        const dir = path.dirname(filePath);

        sourceFile.getImportDeclarations().forEach(imp => {
            const moduleSpecifier = imp.getModuleSpecifierValue();
            if (moduleSpecifier.startsWith('.')) {
                const base = path.resolve(dir, moduleSpecifier);
                const candidates = [
                    base + '.ts',
                    base + '.tsx',
                    base + '/index.ts',
                    base + '/index.tsx',
                    base.replace(/\.js$/, '.ts'),
                    base.replace(/\.js$/, '.tsx'),
                ];
                const resolved = candidates.find(c => fs.existsSync(c)) ?? base + '.ts';
                mapping.imports.push({ module: moduleSpecifier, resolved });
            } else {
                mapping.imports.push({ module: moduleSpecifier, resolved: 'external' });
            }
        });
    }

    private static processClasses(sourceFile: SourceFile, mapping: any) {
        sourceFile.getClasses().forEach(cls => {
            const className = cls.getName();
            if (!className) return;

            const classExported = cls.isExported();
            mapping.symbols.push({ type: 'class', name: className, exported: classExported, line: cls.getStartLineNumber(), endLine: this.endLineOf(cls), signature: this.signatureOf(cls), calls: this.extractHeritage(cls) });

            cls.getMethods().forEach(method => {
                const methodName = method.getName();
                this.extractInnerFunctions(method, `${className}.${methodName}`, mapping);
                const calls = this.extractCalls(method);
                mapping.symbols.push({
                    type: 'method',
                    name: methodName,
                    exported: classExported,
                    qualifiedName: `${className}.${methodName}`,
                    line: method.getStartLineNumber(),
                    endLine: this.endLineOf(method),
                    signature: this.signatureOf(method),
                    containerClass: className,
                    calls
                });
                if (method.getBody()) {
                    method.setBodyText('/* Implementation Hidden */');
                }
            });

            cls.getConstructors().forEach(ctor => {
                const calls = this.extractCalls(ctor);
                mapping.symbols.push({
                    type: 'method',
                    name: 'constructor',
                    exported: classExported,
                    qualifiedName: `${className}.constructor`,
                    line: ctor.getStartLineNumber(),
                    endLine: this.endLineOf(ctor),
                    signature: this.signatureOf(ctor),
                    containerClass: className,
                    calls
                });
                if (ctor.getBody()) {
                    ctor.setBodyText('/* Implementation Hidden */');
                }
            });

            cls.getProperties().forEach(prop => {
                const calls = this.extractCalls(prop);
                if (calls.length > 0) {
                    mapping.symbols.push({
                        type: 'class_property',
                        name: prop.getName(),
                        exported: classExported,
                        qualifiedName: `${className}.${prop.getName()}`,
                        line: prop.getStartLineNumber(),
                        endLine: this.endLineOf(prop),
                        signature: this.signatureOf(prop),
                        containerClass: className,
                        calls
                    });
                }
            });
        });
    }

    private static processFunctions(sourceFile: SourceFile, mapping: any) {
        sourceFile.getFunctions().forEach(fn => {
            const name = fn.getName();
            if (name && fn.getBody()) {
                this.extractInnerFunctions(fn, name, mapping);
                const calls = this.extractCalls(fn);
                mapping.symbols.push({ type: 'function', name, exported: fn.isExported(), line: fn.getStartLineNumber(), endLine: this.endLineOf(fn), signature: this.signatureOf(fn), calls });
                fn.setBodyText('/* Implementation Hidden */');
            }
        });

        sourceFile.getVariableDeclarations().forEach(v => {
            const initializer = v.getInitializer();
            const exported = v.getVariableStatement()?.isExported() ?? false;
            if (initializer && (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer))) {
                const name = v.getName();
                this.extractInnerFunctions(initializer, name, mapping);
                const calls = this.extractCalls(initializer);
                mapping.symbols.push({
                    type: 'variable_function',
                    name,
                    exported,
                    line: v.getStartLineNumber(),
                    endLine: this.endLineOf(initializer),
                    signature: this.signatureOf(initializer),
                    calls
                });
                try {
                    (initializer as any).setBodyText('/* Implementation Hidden */');
                } catch { /* ignore */ }
            } else if (exported && initializer) {
                const name = v.getName();
                const calls = this.extractCalls(initializer);
                mapping.symbols.push({
                    type: 'variable',
                    name,
                    exported,
                    line: v.getStartLineNumber(),
                    endLine: this.endLineOf(v),
                    signature: this.signatureOf(v),
                    calls
                });
            }
        });
    }

    private static processInterfacesAndTypes(sourceFile: SourceFile, mapping: any) {
        sourceFile.getInterfaces().forEach(i => {
            mapping.symbols.push({ type: 'interface', name: i.getName(), line: i.getStartLineNumber(), endLine: this.endLineOf(i), signature: this.signatureOf(i) });
        });
        sourceFile.getTypeAliases().forEach(t => {
            mapping.symbols.push({ type: 'type', name: t.getName(), line: t.getStartLineNumber(), endLine: this.endLineOf(t), signature: this.signatureOf(t) });
        });
    }

    private static processEnums(sourceFile: SourceFile, mapping: any) {
        sourceFile.getEnums().forEach(e => {
            mapping.symbols.push({ type: 'enum', name: e.getName(), line: e.getStartLineNumber(), endLine: this.endLineOf(e), signature: this.signatureOf(e) });
        });
    }

    // Returns the declaration line(s) without the body.
    // Prefers the node's body start when a body exists, so object-typed return types,
    // destructured params, and object defaults are not truncated at the first `{`.
    private static signatureOf(node: any): string {
        try {
            const start: number = node.getStart();
            // Prefer the body's opening brace: everything before it is the true signature
            // (avoids truncating on object return types `(): {x}` / destructured params `({a})` / default `= {}`).
            const body = typeof node.getBody === 'function' ? node.getBody() : undefined;
            const cut = body ? body.getStart() - start : -1;
            const txt: string = node.getText();
            const head = cut >= 0 ? txt.slice(0, cut)
                                  : (txt.includes('{') ? txt.slice(0, txt.indexOf('{')) : txt.split('\n')[0]);
            return head.replace(/\s+/g, ' ').trim().slice(0, 400);
        } catch { return ''; }
    }

    private static endLineOf(node: any): number {
        try { return node.getEndLineNumber(); } catch { return node.getStartLineNumber?.() ?? 0; }
    }

    private static convertToMarkdown(sourceFile: SourceFile, filePath: string): string {
        const relativePath = filePath.split('Rocket.Chat/')[1] || filePath;
        return `## File: ${relativePath}\n\n\`\`\`typescript\n${sourceFile.getFullText()}\n\`\`\``;
    }
}
