import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedText, cosine, EMBED_DIM } from './embeddings.js';

test('embedText 返回归一化的 384 维向量', async () => {
    const v = await embedText('livechat request routing');
    assert.equal(v.length, EMBED_DIM);
    const norm = Math.sqrt([...v].reduce((s, x) => s + x * x, 0));
    assert.ok(Math.abs(norm - 1) < 0.01, `norm=${norm} 应≈1`);
});

test('cosine: 语义相近 > 语义无关', async () => {
    const q = await embedText('how are livechat requests routed');
    const near = await embedText('Route livechat inquiries to agents using routing strategies');
    const far = await embedText('Apple push notification delivery via APN tokens');
    assert.ok(cosine(q, near) > cosine(q, far), `near ${cosine(q,near).toFixed(3)} 应 > far ${cosine(q,far).toFixed(3)}`);
});
