import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';
import { CodebaseHasher } from './hasher.js';
import { SkeletonGenerator } from './skeleton.js';
import { LocalDatabase } from './local-db.js';
import { TARGET_SRC_DIR, OUTPUT_DIR, CACHE_FILE, getOutputPaths, SOURCE_GLOB, SOURCE_IGNORE } from '../config.js';
import { GLOBAL_INDEX } from './state.js';
import { readIndexMeta, writeIndexMeta } from './meta.js';
import { currentCommit, isCleanWorktree, changeSetSince } from './changeset.js';
import { findOrphanMappings, sourcePathOf, stripFromIndex, deleteArtifacts, filterGitVictims } from './prune.js';

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

// Which files vanished since the index was built.
//
// Two detection paths. The git one is exact and cheap but needs a recorded starting commit and a
// clean tree, so it only works from the second run onward. The scan is the cold-start path and the
// correctness backstop, and it is what actually does the work the first time this ships.
//
// `artifacts` is the list of mapping paths to erase. The scan path reports the orphan mappings it
// actually found rather than re-deriving them from the victims: a mapping that is corrupt or has no
// sourcePath yields no victim at all, and deriving the delete list from victims would leave exactly
// those unreadable files on disk for the next full rebuild to choke on again.
export function findVanishedFiles(scannedFiles: string[]): { victims: string[]; artifacts: string[]; via: 'git' | 'scan' } {
    const meta = readIndexMeta();
    const head = currentCommit();

    if (meta?.targetCommit && head && meta.targetCommit !== head && isCleanWorktree()) {
        const cs = changeSetSince(meta.targetCommit, head);
        if (cs) {
            const rel = [...cs.deleted, ...cs.renamed.map(r => r.from)];
            const victims = filterGitVictims(rel.map(r => path.join(TARGET_SRC_DIR, r)), scannedFiles);
            return { victims, artifacts: victims.map(v => getOutputPaths(v).mappingPath), via: 'git' };
        }
    }

    const mappingFiles = globSync('**/*.mapping.json', { cwd: OUTPUT_DIR, absolute: true });
    const orphanMappings = findOrphanMappings(scannedFiles, mappingFiles);
    const victims = orphanMappings.map(sourcePathOf).filter((s): s is string => s !== null);
    return { victims, artifacts: orphanMappings, via: 'scan' };
}

// Remove every trace of files that no longer exist: mapping, skeleton, and whatever is already in
// the in-memory index.
//
// The *disk* deletion must happen before loadIndex, and before any later full rebuild: both read
// the mapping files, so an orphan left on disk is resurrected. The in-memory strip here is close to
// a no-op at this point (GLOBAL_INDEX is still empty on the normal path); the strip that matters
// runs after loadIndex, because loadIndex merges into the maps without clearing them.
// Deletion is safe to automate because mappings are derived from source: a wrong removal costs a
// prewarm run, not data.
function pruneVanished(scannedFiles: string[]): number {
    const { victims, artifacts, via } = findVanishedFiles(scannedFiles);
    if (victims.length === 0 && artifacts.length === 0) return 0;

    console.error(`🧹 ${victims.length} source files no longer exist (detected via ${via}); removing their index entries and artifacts:`);
    for (const v of victims.slice(0, 5)) console.error(`     ${path.relative(TARGET_SRC_DIR, v)}`);
    if (victims.length > 5) console.error(`     … +${victims.length - 5} more`);

    stripFromIndex(victims);
    const removed = deleteArtifacts(artifacts);
    console.error(`   removed ${removed} artifact files.`);
    return victims.length;
}

// Single entry point: regenerate stale skeletons, then bring the in-memory index up to date the
// cheapest correct way — load cache + incremental patch when few files changed, full rebuild only
// on a cold start or a large change set (e.g. GENERATOR_VERSION bump).
export async function ensureIndex(): Promise<void> {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const db = new LocalDatabase(OUTPUT_DIR);
    const { changedFiles } = preWarmCache();

    // Before loading anything: get the orphaned artifacts off disk, so neither the cache load
    // below nor any later full rebuild (which globs *.mapping.json) can resurrect them.
    const scanned = scanDirectory(TARGET_SRC_DIR);
    const prunedCount = pruneVanished(scanned);

    const loaded = db.loadIndex(GLOBAL_INDEX);
    // This is where stale entries actually die: the cache was written before the prune, and
    // loadIndex merges rather than replaces. Run it on every load, not only when this run pruned
    // something — a cache can carry residue from an interrupted or older run that today's detection
    // (either path) has no way to notice. Costs ~7851 stats, well under a second.
    let strippedCount = 0;
    if (loaded) {
        const stale = [...GLOBAL_INDEX.allFiles].filter(f => !fs.existsSync(f));
        stripFromIndex(stale);
        strippedCount = stale.length;
    }

    const total = GLOBAL_INDEX.allFiles.size;
    const bigChange = changedFiles.length > Math.max(1500, total * 0.3);

    if (!loaded || bigChange) {
        await initializeGlobalIndex();
        db.saveIndex(GLOBAL_INDEX);
    } else if (changedFiles.length > 0 || prunedCount > 0 || strippedCount > 0) {
        if (changedFiles.length > 0) incrementalUpdate(changedFiles);
        db.saveIndex(GLOBAL_INDEX);
    } else {
        console.error('⚡ Index loaded from cache (no source changes detected).');
    }

    writeIndexMeta(currentCommit(), new Date().toISOString());
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
