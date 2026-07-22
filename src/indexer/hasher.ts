import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { GENERATOR_VERSION } from '../config.js';

const VERSION_KEY = '__version__';

interface FileRecord { hash: string; mtimeMs: number; size: number; }
type CacheEntry = FileRecord | string;   // string = legacy entry (hash only, pre-mtime)

export class CodebaseHasher {
    private cachePath: string;
    private hashCache: Record<string, CacheEntry>;

    constructor(cachePath: string) {
        this.cachePath = cachePath;
        if (fs.existsSync(cachePath)) {
            const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
            if (cached[VERSION_KEY] === GENERATOR_VERSION) {
                this.hashCache = cached;
            } else {
                console.error(`⚡ Generator version changed (${cached[VERSION_KEY] ?? 'none'} → ${GENERATOR_VERSION}), clearing hash cache.`);
                this.hashCache = {};
            }
        } else {
            this.hashCache = {};
        }
    }

    static getFileHash(filePath: string): string {
        const buffer = fs.readFileSync(filePath);
        return crypto.createHash('md5').update(buffer).digest('hex');
    }

    // Legacy string entries carry no mtime/size → return -1 so they never hit the
    // fast path and get re-hashed once (upgrading them to the new format).
    private static toMeta(entry: CacheEntry | undefined): FileRecord | undefined {
        if (!entry) return undefined;
        if (typeof entry === 'string') return { hash: entry, mtimeMs: -1, size: -1 };
        return entry;
    }

    // Fast path: if mtime+size match the cache, the file is unchanged — skip the
    // read+md5 entirely. Only stat()-changed files get hashed to confirm.
    shouldUpdate(filePath: string): { needsUpdate: boolean; currentHash: string; mtimeMs: number; size: number } {
        const stat = fs.statSync(filePath);
        const prev = CodebaseHasher.toMeta(this.hashCache[filePath]);

        if (prev && prev.mtimeMs === stat.mtimeMs && prev.size === stat.size) {
            return { needsUpdate: false, currentHash: prev.hash, mtimeMs: stat.mtimeMs, size: stat.size };
        }

        const currentHash = CodebaseHasher.getFileHash(filePath);
        const changed = !prev || prev.hash !== currentHash;
        if (!changed) {
            // content identical but mtime/size drifted (e.g. touched) — refresh metadata
            // so the next run hits the fast path; no skeleton regen needed.
            this.hashCache[filePath] = { hash: currentHash, mtimeMs: stat.mtimeMs, size: stat.size };
        }
        return { needsUpdate: changed, currentHash, mtimeMs: stat.mtimeMs, size: stat.size };
    }

    updateRecord(filePath: string, hash: string, mtimeMs: number, size: number) {
        this.hashCache[filePath] = { hash, mtimeMs, size };
    }

    prune(allScannedFiles: string[]) {
        const currentFiles = new Set(allScannedFiles);
        let deletedCount = 0;
        for (const cachedFile in this.hashCache) {
            if (cachedFile === VERSION_KEY) continue;
            if (!currentFiles.has(cachedFile)) {
                delete this.hashCache[cachedFile];
                deletedCount++;
            }
        }
        if (deletedCount > 0) {
            console.error(`🧹 Pruned ${deletedCount} obsolete records from cache.`);
        }
    }

    save() {
        this.hashCache[VERSION_KEY] = GENERATOR_VERSION;
        fs.writeFileSync(this.cachePath, JSON.stringify(this.hashCache, null, 2));
    }
}