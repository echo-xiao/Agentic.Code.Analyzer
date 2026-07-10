import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import { OUTPUT_DIR, CHUNKS_PATH, INDEX_DIR, TARGET_SRC_DIR } from '../config.js';

export interface Chunk {
    id: string; kind: string; name: string; qualifiedName?: string;
    file: string; startLine: number; endLine: number;
    signature: string; containerClass?: string; exported: boolean;
}

export function relPathOf(absFile: string): string {
    return path.relative(TARGET_SRC_DIR, absFile).replace(/\\/g, '/');
}

export function chunkId(relFile: string, sym: { qualifiedName?: string; name: string }): string {
    return `${relFile}#${sym.qualifiedName ?? sym.name}`;
}

// kind 里没有 endLine/signature 的记录(旧 mapping 或异常)跳过,不入 chunk。
export async function buildChunks(): Promise<number> {
    const mappingFiles = globSync('**/*.mapping.json', { cwd: OUTPUT_DIR, absolute: true });
    const store: Record<string, Chunk> = {};
    const BATCH = 128;
    for (let i = 0; i < mappingFiles.length; i += BATCH) {
        const datas = await Promise.all(mappingFiles.slice(i, i + BATCH).map(async (m) => {
            try { return JSON.parse(await fs.promises.readFile(m, 'utf-8')); } catch { return null; }
        }));
        for (const data of datas) {
            if (!data?.sourcePath) continue;
            const rel = relPathOf(data.sourcePath);
            for (const s of (data.symbols ?? [])) {
                if (typeof s.endLine !== 'number' || typeof s.line !== 'number') continue;
                const id = chunkId(rel, s);
                store[id] = {
                    id, kind: s.type, name: s.name, qualifiedName: s.qualifiedName,
                    file: rel, startLine: s.line, endLine: s.endLine,
                    signature: s.signature ?? '', containerClass: s.containerClass,
                    exported: !!s.exported,
                };
            }
        }
    }
    const sorted: Record<string, Chunk> = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.mkdirSync(INDEX_DIR, { recursive: true });
    fs.writeFileSync(CHUNKS_PATH, JSON.stringify(sorted), 'utf-8');
    return Object.keys(sorted).length;
}

let cache: Record<string, Chunk> | null | undefined;
export function loadChunks(): Record<string, Chunk> | null {
    if (cache !== undefined) return cache;
    try { cache = JSON.parse(fs.readFileSync(CHUNKS_PATH, 'utf-8')); } catch { cache = null; }
    return cache;
}

export function chunksBySymbol(chunks: Record<string, Chunk>): Map<string, Chunk[]> {
    const m = new Map<string, Chunk[]>();
    for (const c of Object.values(chunks)) {
        (m.get(c.name) ?? m.set(c.name, []).get(c.name)!).push(c);
    }
    return m;
}

export function chunksByFile(chunks: Record<string, Chunk>): Map<string, Chunk[]> {
    const m = new Map<string, Chunk[]>();
    for (const c of Object.values(chunks)) {
        (m.get(c.file) ?? m.set(c.file, []).get(c.file)!).push(c);
    }
    return m;
}
