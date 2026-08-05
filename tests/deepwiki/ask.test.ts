import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import { askDeepWiki } from '../../src/deepwiki/ask.js';

test('askDeepWiki caches: second call does not hit the network', async () => {
    const dir = 'data/deepwiki/answers';
    fs.rmSync(`${dir}/test-q.md`, { force: true });
    let hits = 0;
    const postFn = async () => { hits++; return 'DeepWiki says: because.'; };
    const a1 = await askDeepWiki('test-q', 'why?', { postFn });
    const a2 = await askDeepWiki('test-q', 'why?', { postFn });
    assert.equal(a1, 'DeepWiki says: because.');
    assert.equal(a2, a1);
    assert.equal(hits, 1);
    fs.rmSync(`${dir}/test-q.md`, { force: true });
});
