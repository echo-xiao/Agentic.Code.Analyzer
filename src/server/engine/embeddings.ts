// embeddings.ts — 本地句向量（xenova bge-small）。gen 与运行时共用一个懒加载单例。
import { pipeline } from '@xenova/transformers';

export const EMBED_MODEL = 'Xenova/bge-small-en-v1.5';
export const EMBED_DIM = 384;

const BGE_QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';

let extractorP: Promise<any> | null = null;
function extractor() {
    if (!extractorP) extractorP = pipeline('feature-extraction', EMBED_MODEL);
    return extractorP;
}

export async function embedText(text: string, mode: 'query' | 'passage' = 'passage'): Promise<Float32Array> {
    const input = mode === 'query' ? BGE_QUERY_PREFIX + text : text;
    const ex = await extractor();
    const out = await ex(input, { pooling: 'mean', normalize: true });
    return Float32Array.from(out.data as Float32Array);
}

/** 两个向量都必须已 L2 归一化（embedText 保证）；对归一化向量，点积 == cosine 相似度。 */
export function cosine(a: Float32Array, b: Float32Array): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
}
