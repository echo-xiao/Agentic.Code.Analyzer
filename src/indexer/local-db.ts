import * as fs from 'fs';
import * as path from 'path';

export interface SymbolIndex {
    symbols: Record<string, string[]>;
    fileDependents: Record<string, string[]>;
    allFiles: string[];
    callGraph: Record<string, Array<{ caller: string; file: string; edgeType?: string }>>;
}

export class LocalDatabase {
    private indexPath: string;

    constructor(outputDir: string) {
        this.indexPath = path.join(outputDir, '.global_index.json');
    }

    saveIndex(globalIndex: any) {
        console.error("💾 Saving global index to disk...");
        const data: SymbolIndex = {
            symbols: Object.fromEntries(
                Array.from(globalIndex.symbols.entries()).map(([k, v]: [any, any]) => [k, Array.from(v)])
            ),
            fileDependents: Object.fromEntries(
                Array.from(globalIndex.fileDependents.entries()).map(([k, v]: [any, any]) => [k, Array.from(v)])
            ),
            allFiles: Array.from(globalIndex.allFiles),
            callGraph: Object.fromEntries(globalIndex.callGraph.entries()),
        };

        // Compact (no pretty-print): the index is machine-read only. `null, 2` indentation
        // roughly doubles the size (~24M→~13M) and is markedly slower to stringify+write.
        fs.writeFileSync(this.indexPath, JSON.stringify(data));
        console.error("✅ Index persisted successfully.");
    }

    loadIndex(globalIndex: any): boolean {
        if (!fs.existsSync(this.indexPath)) return false;

        console.error("📂 Loading index from cache...");
        const data: SymbolIndex = JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'));

        for (const [name, paths] of Object.entries(data.symbols)) {
            globalIndex.symbols.set(name, new Set(paths));
        }
        for (const [p, deps] of Object.entries(data.fileDependents)) {
            globalIndex.fileDependents.set(p, new Set(deps as string[]));
        }
        data.allFiles.forEach((f: string) => globalIndex.allFiles.add(f));
        for (const [callee, callers] of Object.entries(data.callGraph ?? {})) {
            globalIndex.callGraph.set(callee, callers);
        }

        return true;
    }

    watchAndReload(globalIndex: any) {
        if (!fs.existsSync(this.indexPath)) return;
        fs.watch(this.indexPath, (event) => {
            if (event !== 'change') return;
            try {
                globalIndex.symbols.clear();
                globalIndex.fileDependents.clear();
                globalIndex.allFiles.clear();
                globalIndex.callGraph.clear();
                this.loadIndex(globalIndex);
                console.error('🔄 Index hot-reloaded from disk.');
            } catch (e) {
                console.error('⚠️ Failed to hot-reload index:', e);
            }
        });
        console.error('👀 Watching index for changes...');
    }
}
