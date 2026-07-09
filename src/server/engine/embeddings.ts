// embeddings.ts — 本地句向量（xenova all-MiniLM）。gen 与运行时共用一个懒加载单例。
import { pipeline } from '@xenova/transformers';

export const EMBED_MODEL = 'Xenova/all-MiniLM-L6-v2';
export const EMBED_DIM = 384;

let extractorP: Promise<any> | null = null;
function extractor() {
    if (!extractorP) extractorP = pipeline('feature-extraction', EMBED_MODEL);
    return extractorP;
}

export async function embedText(text: string): Promise<Float32Array> {
    const ex = await extractor();
    const out = await ex(text, { pooling: 'mean', normalize: true });
    return Float32Array.from(out.data as Float32Array);
}

export function cosine(a: Float32Array, b: Float32Array): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
}
