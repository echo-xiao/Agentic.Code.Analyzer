import * as fs from 'fs';
import { getOutputPaths } from '../config.js';
import { GLOBAL_INDEX } from './state.js';

// Set difference in the "sources -> expected mappings" direction, never the reverse. getOutputPaths
// strips .ts/.tsx/.js, so a mapping path does not name a unique source file; going forwards keeps
// it unambiguous and costs one path join per live file instead of a stat per mapping.
export function findOrphanMappings(scannedFiles: string[], mappingFiles: string[]): string[] {
    const expected = new Set(scannedFiles.map(f => getOutputPaths(f).mappingPath));
    return mappingFiles.filter(m => !expected.has(m));
}

// The git path names victims by their *source* path, which does not survive the trip through
// getOutputPaths: the extension is stripped, so rooms.js and rooms.ts share one rooms.mapping.json.
// A .js -> .ts refactor therefore hands us `rooms.js` as a deletion while the very artifact we would
// delete belongs to the freshly added, live `rooms.ts`. Measured on the real
// e75965c0 -> origin/develop range: 20 of 845 git victims collided this way, every one of them a
// same-directory extension swap. Dropping such a victim only loses a cleanup that the scan-based
// fallback would catch anyway; keeping it silently deletes a live file's artifacts, and the hash
// cache then reports that file as fresh forever, so it never comes back.
export function filterGitVictims(candidates: string[], scannedFiles: string[]): string[] {
    const liveMappings = new Set(scannedFiles.map(f => getOutputPaths(f).mappingPath));
    const live = new Set(scannedFiles);
    return candidates.filter(c =>
        !live.has(c) &&
        !fs.existsSync(c) &&
        !liveMappings.has(getOutputPaths(c).mappingPath));
}

export function skeletonPathOf(mappingPath: string): string {
    return mappingPath.replace(/\.mapping\.json$/, '.skeleton.ts');
}

// Only called for files already judged orphaned -- a few hundred -- so parsing is cheap here.
// Finding the orphans uses set difference precisely so the other 8000 mappings are never read.
export function sourcePathOf(mappingPath: string): string | null {
    try {
        const raw = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
        return typeof raw.sourcePath === 'string' ? raw.sourcePath : null;
    } catch {
        return null;
    }
}

// Mirrors incrementalUpdate's stripping (src/indexer/index.ts:105) with one addition: allFiles.
// incrementalUpdate never removes from allFiles because it re-adds every file it strips; a pruned
// file is not coming back, so leaving it there would keep the file count wrong.
export function stripFromIndex(sourcePaths: string[]): void {
    const gone = new Set(sourcePaths);
    if (gone.size === 0) return;

    for (const f of gone) GLOBAL_INDEX.allFiles.delete(f);

    for (const [name, fileSet] of GLOBAL_INDEX.symbols) {
        for (const f of fileSet) if (gone.has(f)) fileSet.delete(f);
        if (fileSet.size === 0) GLOBAL_INDEX.symbols.delete(name);
    }

    for (const [callee, callers] of GLOBAL_INDEX.callGraph) {
        const kept = callers.filter(c => !gone.has(c.file));
        if (kept.length === 0) GLOBAL_INDEX.callGraph.delete(callee);
        else if (kept.length !== callers.length) GLOBAL_INDEX.callGraph.set(callee, kept);
    }

    // fileDependents is keyed by the imported file and valued by its importers, so a vanished file
    // can appear on either side.
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        for (const f of importers) if (gone.has(f)) importers.delete(f);
        if (importers.size === 0) GLOBAL_INDEX.fileDependents.delete(target);
    }
    for (const t of gone) GLOBAL_INDEX.fileDependents.delete(t);
}

/** Returns how many files were actually removed from disk. */
export function deleteArtifacts(mappingPaths: string[]): number {
    let removed = 0;
    for (const mappingPath of mappingPaths) {
        for (const p of [mappingPath, skeletonPathOf(mappingPath)]) {
            try {
                if (fs.existsSync(p)) { fs.rmSync(p); removed++; }
            } catch (e) {
                console.error(`❌ Failed to remove ${p}:`, e);
            }
        }
    }
    return removed;
}
