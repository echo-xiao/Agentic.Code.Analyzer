import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';
import { CodebaseHasher } from './hasher.js';
import { SkeletonGenerator } from './skeleton.js';
import { LocalDatabase } from './local-db.js';
import { TARGET_SRC_DIR, OUTPUT_DIR, CACHE_FILE, getOutputPaths, SOURCE_GLOB, SOURCE_IGNORE } from '../config.js';
import { GLOBAL_INDEX } from './state.js';

export function scanDirectory(dir: string): string[] {
    return globSync(SOURCE_GLOB, {
        cwd: dir,
        absolute: true,
        ignore: SOURCE_IGNORE
    });
}

export function preWarmCache(): { updatedCount: number; totalFiles: number; changedFiles: string[] } {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    console.error('🚀 Starting Incremental Dehydration...');
    const hasher = new CodebaseHasher(CACHE_FILE);
    console.error(`🔍 Scanning ${TARGET_SRC_DIR} for source files (a few seconds)...`);
    const allFiles = scanDirectory(TARGET_SRC_DIR);
    console.error(`   found ${allFiles.length} files — checking for changes...`);
    let updatedCount = 0;
    const changedFiles: string[] = [];

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
                changedFiles.push(file);
            } catch (e) {
                console.error(`❌ Failed to process ${file}:`, e);
            }
        }
    }

    bar.stop();
    hasher.prune(allFiles);
    hasher.save();
    console.error(`✨ Pre-warm complete. Updated ${updatedCount} / ${allFiles.length} files.`);
    return { updatedCount, totalFiles: allFiles.length, changedFiles };
}

// Apply one mapping.json's contributions to the in-memory index. Shared by full build
// (initializeGlobalIndex) and incremental patch (incrementalUpdate) so edge semantics stay identical.
function addMappingToIndex(data: any) {
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
}

// Patch the loaded index in place for a small set of changed files — instead of re-reading all
// ~7600 mappings. Strip each changed file's old contributions (one pass each over the three maps),
// then re-add from its freshly-regenerated mapping.json. Turns minute-scale rebuilds into sub-second.
// Note: does not handle source-file deletions (rare; covered by a GENERATOR_VERSION full rebuild).
export function incrementalUpdate(changedFiles: string[]) {
    const changed = new Set(changedFiles);

    for (const [name, fileSet] of GLOBAL_INDEX.symbols) {
        for (const f of fileSet) if (changed.has(f)) fileSet.delete(f);
        if (fileSet.size === 0) GLOBAL_INDEX.symbols.delete(name);
    }
    for (const [callee, callers] of GLOBAL_INDEX.callGraph) {
        const filtered = callers.filter(c => !changed.has(c.file));
        if (filtered.length === 0) GLOBAL_INDEX.callGraph.delete(callee);
        else if (filtered.length !== callers.length) GLOBAL_INDEX.callGraph.set(callee, filtered);
    }
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        for (const f of importers) if (changed.has(f)) importers.delete(f);
        if (importers.size === 0) GLOBAL_INDEX.fileDependents.delete(target);
    }

    let added = 0;
    for (const src of changedFiles) {
        const { mappingPath } = getOutputPaths(src);
        try {
            addMappingToIndex(JSON.parse(fs.readFileSync(mappingPath, 'utf-8')));
            added++;
        } catch { /* mapping absent if generation failed — skip */ }
    }
    console.error(`🔧 Incremental update: patched ${added}/${changedFiles.length} changed mappings.`);
}

// Single entry point: regenerate stale skeletons, then bring the in-memory index up to date the
// cheapest correct way — load cache + incremental patch when few files changed, full rebuild only
// on a cold start or a large change set (e.g. GENERATOR_VERSION bump).
export async function ensureIndex(): Promise<void> {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const db = new LocalDatabase(OUTPUT_DIR);
    const { changedFiles } = preWarmCache();
    const loaded = db.loadIndex(GLOBAL_INDEX);
    const total = GLOBAL_INDEX.allFiles.size;
    const bigChange = changedFiles.length > Math.max(1500, total * 0.3);

    if (!loaded || bigChange) {
        await initializeGlobalIndex();
        db.saveIndex(GLOBAL_INDEX);
    } else if (changedFiles.length > 0) {
        incrementalUpdate(changedFiles);
        db.saveIndex(GLOBAL_INDEX);
    } else {
        console.error('⚡ Index loaded from cache (no source changes detected).');
    }
}

export async function initializeGlobalIndex() {
    console.error('🧠 Building memory-resident index...');
    GLOBAL_INDEX.symbols.clear();
    GLOBAL_INDEX.fileDependents.clear();
    GLOBAL_INDEX.allFiles.clear();
    GLOBAL_INDEX.callGraph.clear();

    const mappingFiles = globSync('**/*.mapping.json', { cwd: OUTPUT_DIR, absolute: true });

    // Read in concurrent batches — the bottleneck is per-file I/O latency (7600 tiny files),
    // not CPU, so overlapping reads cuts wall time several-fold vs serial readFileSync.
    const bar = new cliProgress.SingleBar({
        format: '  [{bar}] {value}/{total} mappings | {percentage}%',
        clearOnComplete: true, stream: process.stderr,
    }, cliProgress.Presets.shades_classic);
    bar.start(mappingFiles.length, 0);

    const BATCH = 128;
    for (let i = 0; i < mappingFiles.length; i += BATCH) {
        const slice = mappingFiles.slice(i, i + BATCH);
        const datas = await Promise.all(slice.map(async (mFile) => {
            try { return JSON.parse(await fs.promises.readFile(mFile, 'utf-8')); }
            catch (e) { console.error(`❌ Failed to load mapping ${mFile}:`, e); return null; }
        }));
        for (const data of datas) if (data) addMappingToIndex(data);
        bar.increment(slice.length);
    }
    bar.stop();

    console.error(`✅ Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.`);
}

export { LocalDatabase };
