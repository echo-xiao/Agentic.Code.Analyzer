import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedText, cosine, EMBED_DIM } from '../../../src/server/engine/embeddings.js';

test('embedText returns a normalized 384-dim vector', async () => {
    const v = await embedText('livechat request routing');
    assert.equal(v.length, EMBED_DIM);
    const norm = Math.sqrt([...v].reduce((s, x) => s + x * x, 0));
    assert.ok(Math.abs(norm - 1) < 0.01, `norm=${norm} should be ≈1`);
});

test('cosine: semantically related > semantically unrelated', async () => {
    const q = await embedText('how are livechat requests routed');
    const near = await embedText('Route livechat inquiries to agents using routing strategies');
    const far = await embedText('Apple push notification delivery via APN tokens');
    assert.ok(cosine(q, near) > cosine(q, far), `near ${cosine(q,near).toFixed(3)} should be > far ${cosine(q,far).toFixed(3)}`);
});

test('embedText: query mode and passage mode both produce same-dim vectors, and semantically related text has high cosine', async () => {
    const q = await embedText('how are push notifications delivered', 'query');
    const p = await embedText('Apple push notification delivery via APN tokens', 'passage');
    const far = await embedText('billing invoice PDF export', 'passage');
    assert.equal(q.length, p.length);
    assert.ok(cosine(q, p) > cosine(q, far), 'related passage cosine should be higher than unrelated');
});

test('embedText: same text in query vs passage mode produces different vectors (proves the prefix is applied)', async () => {
    const q = await embedText('test sentence', 'query');
    const p = await embedText('test sentence', 'passage');
    assert.equal(q.length, p.length);
    assert.ok(cosine(q, p) < 0.9999, `query/passage vectors for same text should differ (prefix changes the input), cosine=${cosine(q, p)}`);
});
