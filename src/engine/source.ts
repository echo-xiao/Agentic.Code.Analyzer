// Source reading — loads a file with ts-morph and extracts one symbol's implementation.
// Functions/variables return full source; classes return a signature skeleton + method list
// (read a single method via getClassMethod); interfaces/types return the full definition.
import { Project } from 'ts-morph';
import { GLOBAL_INDEX } from '../indexer/state.js';

function resolveFile(symbolName: string, preferredFile?: string): string[] {
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

export function getImplementation(symbolName: string, preferredFile?: string): { text: string; filePath: string; kind: string; methods?: string[] } | null {
    const sortedPaths = resolveFile(symbolName, preferredFile);
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

export function getClassMethod(className: string, methodName: string, preferredFile?: string): { text: string; filePath: string } | null {
    const sortedPaths = resolveFile(className, preferredFile);
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
