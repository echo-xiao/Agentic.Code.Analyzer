import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';
import { CodebaseHasher } from './hasher.js';
import { SkeletonGenerator } from './skeleton.js';
import { LocalDatabase } from './local-db.js';
import { TARGET_SRC_DIR, OUTPUT_DIR, CACHE_FILE, getOutputPaths } from '../config.js';
import { GLOBAL_INDEX } from './state.js';

export function scanDirectory(dir: string): string[] {
    return globSync('**/*.{ts,tsx,js}', {
        cwd: dir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/*.d.ts', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx', '**/dist/**', '**/*.min.js']
    });
}

export function preWarmCache(): { updatedCount: number; totalFiles: number } {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    console.error('🚀 Starting Incremental Dehydration...');
    const hasher = new CodebaseHasher(CACHE_FILE);
    console.error(`🔍 Scanning ${TARGET_SRC_DIR} for source files (a few seconds)...`);
    const allFiles = scanDirectory(TARGET_SRC_DIR);
    console.error(`   found ${allFiles.length} files — checking for changes...`);
    let updatedCount = 0;

    const bar = new cliProgress.SingleBar({
        format: '  [{bar}] {value}/{total} | {percentage}% | {filename}',
        clearOnComplete: true,
        stream: process.stderr,
    }, cliProgress.Presets.shades_classic);
    bar.start(allFiles.length, 0, { filename: '' });

    for (const file of allFiles) {
        bar.increment({ filename: path.basename(file) });
        let needsUpdate: boolean, currentHash: string, mtimeMs: number, size: number;
        try {
            ({ needsUpdate, currentHash, mtimeMs, size } = hasher.shouldUpdate(file));
        } catch {
            continue;
        }
        if (needsUpdate) {
            try {
                const { skeleton, mapping } = SkeletonGenerator.generate(file);
                const { skeletonPath, mappingPath } = getOutputPaths(file);
                const outDir = path.dirname(skeletonPath);
                if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
                fs.writeFileSync(skeletonPath, skeleton, 'utf-8');
                fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf-8');
                hasher.updateRecord(file, currentHash, mtimeMs, size);
                updatedCount++;
            } catch (e) {
                console.error(`❌ Failed to process ${file}:`, e);
            }
        }
    }

    bar.stop();
    hasher.prune(allFiles);
    hasher.save();
    console.error(`✨ Pre-warm complete. Updated ${updatedCount} / ${allFiles.length} files.`);
    return { updatedCount, totalFiles: allFiles.length };
}

export function initializeGlobalIndex() {
    console.error('🧠 Building memory-resident index...');
    GLOBAL_INDEX.symbols.clear();
    GLOBAL_INDEX.fileDependents.clear();
    GLOBAL_INDEX.allFiles.clear();
    GLOBAL_INDEX.callGraph.clear();

    const mappingFiles = globSync('**/*.mapping.json', { cwd: OUTPUT_DIR, absolute: true });
    for (const mFile of mappingFiles) {
        try {
            const data = JSON.parse(fs.readFileSync(mFile, 'utf-8'));
            const sourcePath: string = data.sourcePath;
            GLOBAL_INDEX.allFiles.add(sourcePath);

            (data.symbols ?? []).forEach((s: any) => {
                if (!GLOBAL_INDEX.symbols.has(s.name)) GLOBAL_INDEX.symbols.set(s.name, new Set());
                GLOBAL_INDEX.symbols.get(s.name)!.add(sourcePath);

                (s.calls ?? []).forEach((call: any) => {
                    const name: string = typeof call === 'string' ? call : call.name;
                    const edgeType: string = typeof call === 'string' ? 'call' : (call.edgeType ?? 'call');
                    const event: string | undefined = typeof call === 'object' ? call.event : undefined;

                    if (edgeType === 'event_listen' && event) {
                        if (!GLOBAL_INDEX.callGraph.has(name)) GLOBAL_INDEX.callGraph.set(name, []);
                        GLOBAL_INDEX.callGraph.get(name)!.push({ caller: event, file: sourcePath, edgeType: 'event_listen' });
                    } else {
                        if (!GLOBAL_INDEX.callGraph.has(name)) GLOBAL_INDEX.callGraph.set(name, []);
                        GLOBAL_INDEX.callGraph.get(name)!.push({ caller: s.name, file: sourcePath, edgeType: edgeType as any });
                    }
                });
            });

            (data.imports ?? []).forEach((imp: any) => {
                if (imp.resolved && imp.resolved !== 'external') {
                    if (!GLOBAL_INDEX.fileDependents.has(imp.resolved)) GLOBAL_INDEX.fileDependents.set(imp.resolved, new Set());
                    GLOBAL_INDEX.fileDependents.get(imp.resolved)!.add(sourcePath);
                }
            });
        } catch (e) {
            console.error(`❌ Failed to load mapping ${mFile}:`, e);
        }
    }

    console.error(`✅ Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.`);
}

export { LocalDatabase };
