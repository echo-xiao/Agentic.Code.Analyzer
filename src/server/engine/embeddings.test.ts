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

test('embedText: query 模式与 passage 模式都产出同维向量,且语义相近文本余弦高', async () => {
    const q = await embedText('how are push notifications delivered', 'query');
    const p = await embedText('Apple push notification delivery via APN tokens', 'passage');
    const far = await embedText('billing invoice PDF export', 'passage');
    assert.equal(q.length, p.length);
    assert.ok(cosine(q, p) > cosine(q, far), '相关 passage 余弦应高于无关');
});

test('embedText: 同一文本 query 与 passage 模式产出不同向量(证明前缀被应用)', async () => {
    const q = await embedText('test sentence', 'query');
    const p = await embedText('test sentence', 'passage');
    assert.equal(q.length, p.length);
    assert.ok(cosine(q, p) < 0.9999, `query/passage 同文本向量应不同(前缀改变输入),cosine=${cosine(q, p)}`);
});
