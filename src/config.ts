import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');

export const TARGET_SRC_DIR = process.env.ROCKET_CHAT_SRC
    || path.join(PROJECT_ROOT, '..', 'Rocket.Chat');
export const OUTPUT_DIR = path.join(PROJECT_ROOT, 'output');
export const CACHE_FILE = path.join(OUTPUT_DIR, '.hash_cache.json');
export const GENERATOR_VERSION = '7';
export const LOGS_DIR = path.join(PROJECT_ROOT, 'logs');

export function getOutputPaths(sourceFile: string): { skeletonPath: string; mappingPath: string } {
    const rel = path.relative(TARGET_SRC_DIR, sourceFile).replace(/\.(tsx?|js)$/, '');
    return {
        skeletonPath: path.join(OUTPUT_DIR, rel + '.skeleton.ts'),
        mappingPath: path.join(OUTPUT_DIR, rel + '.mapping.json'),
    };
}
