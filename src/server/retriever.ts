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
                    sym?.calls?.forEach((c: string) => calleeSymbols.add(c));
                } catch { /* ignore */ }
            }
        }

        let calleeCount = 0;
        for (const callee of calleeSymbols) {
            if (calleeCount >= 5) break;
            for (const calleePath of GLOBAL_INDEX.symbols.get(callee) ?? []) {
                const calleeSkeletonPath = getOutputPaths(calleePath).skeletonPath;
                if (fs.existsSync(calleeSkeletonPath) && !included.has(calleeSkeletonPath)) {
                    results.push(fs.readFileSync(calleeSkeletonPath, 'utf-8'));
                    included.add(calleeSkeletonPath);
                    calleeCount++;
                    break;
                }
            }
        }

        return results;
    }

    static getImplementation(symbolName: string, preferredFile?: string): { text: string; filePath: string } | null {
        const paths = GLOBAL_INDEX.symbols.get(symbolName);
        if (!paths || paths.size === 0) return null;

        let sortedPaths = Array.from(paths);

        if (preferredFile) {
            const q = preferredFile.toLowerCase().replace(/\.tsx?$/, '');
            const exact = sortedPaths.find(p => p.toLowerCase().replace(/\.tsx?$/, '').endsWith(q));
            if (exact) sortedPaths = [exact];
        }

        for (const filePath of sortedPaths) {
            try {
                const project = new Project({ skipAddingFilesFromTsConfig: true });
                const sourceFile = project.addSourceFileAtPath(filePath);
                let text: string | null = null;

                for (const fn of sourceFile.getFunctions()) {
                    if (fn.getName() === symbolName) { text = fn.getFullText().trim(); break; }
                }

                if (!text) {
                    for (const v of sourceFile.getVariableDeclarations()) {
                        if (v.getName() === symbolName) {
                            text = v.getVariableStatement()?.getFullText().trim() ?? v.getFullText().trim();
                            break;
                        }
                    }
                }

                if (!text) {
                    for (const cls of sourceFile.getClasses()) {
                        if (cls.getName() === symbolName) { text = cls.getFullText().trim(); break; }
                    }
                }

                if (!text) {
                    for (const iface of sourceFile.getInterfaces()) {
                        if (iface.getName() === symbolName) { text = iface.getFullText().trim(); break; }
                    }
                }
                if (!text) {
                    for (const t of sourceFile.getTypeAliases()) {
                        if (t.getName() === symbolName) { text = t.getFullText().trim(); break; }
                    }
                }

                sourceFile.forget();
                if (text) return { text, filePath };
            } catch { /* ignore */ }
        }

        return null;
    }
}
