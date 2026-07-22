// embeddings.ts — local sentence embeddings (xenova bge-small). gen and runtime share one lazily-loaded singleton.
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

/** Both vectors must be L2-normalized (embedText guarantees this); for normalized vectors, dot product == cosine similarity. */
export function cosine(a: Float32Array, b: Float32Array): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
}
