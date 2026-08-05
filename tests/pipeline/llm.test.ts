import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FakeLlm, estimateTokens } from '../../src/pipeline/llm.js';

test('FakeLlm returns queued replies and counts calls + prompt tokens', async () => {
    const llm = new FakeLlm(['first', 'second']);
    assert.equal(await llm.generate('abcd'.repeat(10)), 'first');
    assert.equal(await llm.generate('x'), 'second');
    assert.equal(llm.calls, 2);
    assert.equal(llm.promptTokensEst, 10 + 1);
    await assert.rejects(() => llm.generate('no more'));
});

test('estimateTokens is ceil(len/4)', () => {
    assert.equal(estimateTokens(''), 0);
    assert.equal(estimateTokens('abcde'), 2);
});
