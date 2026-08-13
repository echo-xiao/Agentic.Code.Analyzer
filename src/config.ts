import * as path from 'path';
import { fileURLToPath } from 'url';
import { minimatch } from 'minimatch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');

export const TARGET_SRC_DIR = process.env.ROCKET_CHAT_SRC
    || path.join(PROJECT_ROOT, '..', 'Rocket.Chat');
// `.nosync` suffix → macOS iCloud (Desktop & Documents) skips this folder. The index is a large
// (~50M, 15k files) regenerable build artifact; syncing it to iCloud wastes bandwidth and the
// upload storm throttles the thousands of small-file reads during an index rebuild.
export const OUTPUT_DIR = path.join(PROJECT_ROOT, 'output.nosync');
export const CACHE_FILE = path.join(OUTPUT_DIR, '.hash_cache.json');
// The index has no other record of which revision it describes. Without it, a deleted file is
// invisible to incremental update and its symbols survive forever (measured: 714 orphans, 8.3%).
export const INDEX_META_FILE = path.join(OUTPUT_DIR, '.index-meta.json');
export const GENERATOR_VERSION = '11';   // was '10' — P1 adds a chunk field to mapping, requires a full-repo regeneration

export function getOutputPaths(sourceFile: string): { skeletonPath: string; mappingPath: string } {
    const rel = path.relative(TARGET_SRC_DIR, sourceFile).replace(/\.(tsx?|js)$/, '');
    return {
        skeletonPath: path.join(OUTPUT_DIR, rel + '.skeleton.ts'),
        mappingPath: path.join(OUTPUT_DIR, rel + '.mapping.json'),
    };
}

// One graph shard per workspace package, plus one reduced dispatch artifact. Replaces the 7851
// per-file mapping/skeleton pairs: the shards are the cache, so there is no second serialization.
export const GRAPH_DIR = path.join(OUTPUT_DIR, 'graph');

export const DATA_DIR = path.join(PROJECT_ROOT, 'data');

// Single source of truth for "is this file part of the index". Two consumers:
// - scanDirectory() (src/indexer/index.ts) globs the target repo with this exact pattern/ignore
//   pair to build the file list it hashes and skeletonizes.
// - isIndexedSourceFile() (below) answers the same question for repo-relative paths coming out of
//   `git diff --name-status` (src/indexer/changeset.ts), which never touches disk and can't glob.
// They used to be two separately-maintained regexes that drifted: the changeset filter matched
// bare `.ts`/`.tsx`/`.js` and let .d.ts / .test.ts / .spec.ts / .min.js / dist / node_modules
// through. Measured against Rocket.Chat's tracked tree: 861 test/spec files and 76 .d.ts files
// were never indexed by scanDirectory() but were still reported as index-relevant changes.
export const SOURCE_GLOB = '**/*.{ts,tsx,js}';
export const SOURCE_IGNORE = [
    '**/node_modules/**',
    '**/*.d.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/*.test.tsx',
    '**/*.spec.tsx',
    '**/dist/**',
    '**/*.min.js',
];

// `p` is a repo-relative path in the form git prints (no leading slash, forward slashes).
export function isIndexedSourceFile(p: string): boolean {
    if (!minimatch(p, SOURCE_GLOB)) return false;
    return !SOURCE_IGNORE.some((pattern) => minimatch(p, pattern));
}
