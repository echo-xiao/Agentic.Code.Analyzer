import * as fs from 'fs';
import { INDEX_META_FILE, GENERATOR_VERSION } from '../config.js';

export interface IndexMeta {
    /** The target repo's HEAD when this index was built. null when the target is not a git repo. */
    targetCommit: string | null;
    generatorVersion: string;
    builtAt: string;
}

// Returns null for every failure mode -- absent, unreadable, malformed, or missing the version
// field. A caller that cannot trust the metadata must fall back to full detection, and "null"
// is the single signal for that; distinguishing the failures would give callers nothing to act on.
export function readIndexMeta(metaPath: string = INDEX_META_FILE): IndexMeta | null {
    if (!fs.existsSync(metaPath)) return null;
    try {
        const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        if (typeof raw.generatorVersion !== 'string') return null;
        return {
            targetCommit: typeof raw.targetCommit === 'string' ? raw.targetCommit : null,
            generatorVersion: raw.generatorVersion,
            builtAt: typeof raw.builtAt === 'string' ? raw.builtAt : '',
        };
    } catch {
        return null;
    }
}

export function writeIndexMeta(
    targetCommit: string | null,
    builtAt: string,
    metaPath: string = INDEX_META_FILE,
): void {
    const meta: IndexMeta = { targetCommit, generatorVersion: GENERATOR_VERSION, builtAt };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
}
