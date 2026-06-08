import fuzzysort from 'fuzzysort';
import * as fs from 'fs';
import { Project } from 'ts-morph';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { getOutputPaths } from '../config.js';

const PATH_HINTS: Array<{ keywords: string[]; segment: string }> = [
    { keywords: ['client', 'ui', 'component', 'react'], segment: 'client' },
    { keywords: ['server', 'backend', 'method'],        segment: 'server' },
    { keywords: ['api', 'rest', 'endpoint', 'route'],   segment: 'api/server' },
    { keywords: ['package', 'shared', 'model'],         segment: 'packages' },
    { keywords: ['enterprise', 'ee', 'premium'],        segment: 'ee/' },
];

export class CodeRetriever {
    static search(query: string, limit = 5, layer?: string): any[] {
        const symbolList = Array.from(GLOBAL_INDEX.symbols.keys());
        const fuzzyResults = fuzzysort.go(query, symbolList, { threshold: -3000, limit: 50 });

        const q = query.toLowerCase();
        const layerSegment = layer ? `/${layer}/` : null;
        const inferredSegments = PATH_HINTS
            .filter(h => h.keywords.some(k => q.includes(k)))
            .map(h => h.segment);

        return fuzzyResults
            .map(res => {
                const rawScore = Math.max(0, 1 + res.score / 3000);
                const lengthRatio = query.length / res.target.length;
                const baseScore = lengthRatio < 0.4 ? rawScore * (lengthRatio / 0.4) : rawScore;
                const paths = Array.from(GLOBAL_INDEX.symbols.get(res.target) ?? []);
                let pathBonus = 0;
                if (layerSegment && paths.some(p => p.includes(layerSegment))) {
                    pathBonus = 0.5;
                } else if (inferredSegments.length > 0 && paths.some(p => inferredSegments.some(s => p.includes(s)))) {
                    pathBonus = 0.3;
                }
                const finalScore = baseScore + pathBonus;
                return { symbolName: res.target, paths, score: baseScore, finalScore };
            })
            .sort((a, b) => b.finalScore - a.finalScore)
            .slice(0, limit);
    }

    static getContext(symbolName: string, callerFile?: string): string[] {
        const paths = GLOBAL_INDEX.symbols.get(symbolName);
        if (!paths) return [];

        let sortedPaths = Array.from(paths);

        if (callerFile) {
            const q = callerFile.toLowerCase().replace(/\.tsx?$/, '');
            const exactMatch = sortedPaths.find(p =>
                p.toLowerCase().replace(/\.tsx?$/, '').endsWith(q)
            );
            if (exactMatch) sortedPaths = [exactMatch];
        }

        if (callerFile && sortedPaths.length > 1) {
            const callerMappingPath = getOutputPaths(callerFile).mappingPath;
            if (fs.existsSync(callerMappingPath)) {
                try {
                    const callerMapping = JSON.parse(fs.readFileSync(callerMappingPath, 'utf-8'));
                    const importedPaths = new Set<string>(
                        (callerMapping.imports ?? [])
                            .filter((imp: any) => imp.resolved && imp.resolved !== 'external')
                            .map((imp: any) => imp.resolved)
                    );
                    sortedPaths.sort((a, b) => (importedPaths.has(a) ? 0 : 1) - (importedPaths.has(b) ? 0 : 1));
                } catch { /* ignore */ }
            }
        }

        const results: string[] = [];
        const included = new Set<string>();
        const calleeSymbols = new Set<string>();

        for (const sourcePath of sortedPaths) {
            const { skeletonPath, mappingPath } = getOutputPaths(sourcePath);
            if (fs.existsSync(skeletonPath) && !included.has(skeletonPath)) {
                results.push(fs.readFileSync(skeletonPath, 'utf-8'));
                included.add(skeletonPath);
            }
            if (fs.existsSync(mappingPath)) {
                try {
                    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
                    const sym = (mapping.symbols ?? []).find(
                        (s: any) => s.name === symbolName || s.qualifiedName?.endsWith(`.${symbolName}`)
                    );
                    sym?.calls?.forEach((c: any) => calleeSymbols.add(typeof c === 'string' ? c : c.name));
                } catch { /* ignore */ }
            }
        }

        return results;
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
