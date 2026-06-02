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

                    const name = method;
                    if (name && name.length > 1 && !BUILTIN_IGNORE.has(name) &&
                        !CALLBACKS_EMIT_METHODS.has(name) && !CALLBACKS_LISTEN_METHODS.has(name) &&
                        !['emit', 'on', 'once', 'publish', 'subscribe'].includes(name)) {
                        add(name, 'call');
                    }

                } else if (Node.isIdentifier(expr)) {
                    add(expr.getText(), 'call');
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
            mapping.symbols.push({ type: 'class', name: className, exported: classExported, line: cls.getStartLineNumber() });

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
                mapping.symbols.push({ type: 'function', name, exported: fn.isExported(), line: fn.getStartLineNumber(), calls });
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
                    calls
                });
            }
        });
    }

    private static processInterfacesAndTypes(sourceFile: SourceFile, mapping: any) {
        sourceFile.getInterfaces().forEach(i => {
            mapping.symbols.push({ type: 'interface', name: i.getName(), line: i.getStartLineNumber() });
        });
        sourceFile.getTypeAliases().forEach(t => {
            mapping.symbols.push({ type: 'type', name: t.getName(), line: t.getStartLineNumber() });
        });
    }

    private static processEnums(sourceFile: SourceFile, mapping: any) {
        sourceFile.getEnums().forEach(e => {
            mapping.symbols.push({ type: 'enum', name: e.getName(), line: e.getStartLineNumber() });
        });
    }

    private static convertToMarkdown(sourceFile: SourceFile, filePath: string): string {
        const relativePath = filePath.split('Rocket.Chat/')[1] || filePath;
        return `## File: ${relativePath}\n\n\`\`\`typescript\n${sourceFile.getFullText()}\n\`\`\``;
    }
}
