import * as path from 'path';
import { fileURLToPath } from 'url';

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
export const GENERATOR_VERSION = '11';   // was '10' — P1 adds a chunk field to mapping, requires a full-repo regeneration

export function getOutputPaths(sourceFile: string): { skeletonPath: string; mappingPath: string } {
    const rel = path.relative(TARGET_SRC_DIR, sourceFile).replace(/\.(tsx?|js)$/, '');
    return {
        skeletonPath: path.join(OUTPUT_DIR, rel + '.skeleton.ts'),
        mappingPath: path.join(OUTPUT_DIR, rel + '.mapping.json'),
    };
}

export const DATA_DIR = path.join(PROJECT_ROOT, 'data');
export const INDEX_DIR = path.join(DATA_DIR, 'index');
export const CHUNKS_PATH = path.join(INDEX_DIR, 'chunks.json');
export const CHUNK_VECTORS_PATH = path.join(INDEX_DIR, 'chunk-vectors.json');
export const MODULE_GRAPH_PATH = path.join(INDEX_DIR, 'module-graph.json');

export const MODEL_TIERS = {
  leaf:    'claude-haiku-4-5-20251001',
  module:  'claude-sonnet-4-6',
  outline: 'claude-sonnet-4-6',
  chapter: 'claude-sonnet-4-6',
  verify:  'claude-haiku-4-5-20251001',
  embed:   'Xenova/bge-small-en-v1.5',
} as const;
