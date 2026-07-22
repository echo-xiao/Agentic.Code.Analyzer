import { Project, Node, SourceFile, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';
import type { CallEdge } from './state.js';
import { extractCalls, extractHeritage } from './extract-edges.js';

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
            const calls = extractCalls(fnBody);
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
                for (const c of extractCalls(stmt)) {
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
            mapping.symbols.push({ type: 'class', name: className, exported: classExported, line: cls.getStartLineNumber(), endLine: this.endLineOf(cls), signature: this.signatureOf(cls), calls: extractHeritage(cls) });

            cls.getMethods().forEach(method => {
                const methodName = method.getName();
                this.extractInnerFunctions(method, `${className}.${methodName}`, mapping);
                const calls = extractCalls(method);
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
                const calls = extractCalls(ctor);
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
                const calls = extractCalls(prop);
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
                const calls = extractCalls(fn);
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
                const calls = extractCalls(initializer);
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
                const calls = extractCalls(initializer);
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
