import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { runQuestion } from '../../src/pipeline/run.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { WikiOutline } from '../../src/deepwiki/types.js';

beforeEach(() => { GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.fileDependents.clear(); });

test('runQuestion wires all six stages with exactly 3 LLM calls', async () => {
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/rc/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.callGraph.set('sendMessage', [{ caller: 'x', file: 'f', edgeType: 'call' }]);
    const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
        { id: 'msg', title: 'Messaging', blurb: 'messages', sources: [{ file: 'apps/meteor/app/lib/server/sendMessage.ts', startLine: 1, endLine: 9 }] }] };
    const llm = new FakeLlm(['msg', '1a', '答案：apps/meteor/app/lib/server/sendMessage.ts:1']);
    const row = await runQuestion('q1', 'how is a message sent (sendMessage)?', {
        llm, outline, truthCore: ['apps/meteor/app/lib/server/sendMessage.ts'],
        deepwikiFn: async () => 'baseline', readFn: () => ({ text: 'const x = 1;', startLine: 1, endLine: 1 }),
    });
    assert.equal(row.trace.llm.calls, 3);
    assert.equal(row.deepwiki, 'baseline');
    assert.ok(['hit', 'paths', 'graph', 'budget', 'routing'].includes(row.loss.stage));
    assert.ok(row.trace.selectedIds.length >= 0 && row.answer.includes('答案'));
});

// Unlike the Step-1 fixture (which uses a '/rc/...' prefix that relPath does not strip, so
// retrieveSeeds legitimately comes back empty), these two tests need a real seed -> chain ->
// skeleton -> selection chain to exercise evictedFiles/promptTokens, so they use the
// '/abs/Rocket.Chat/...' prefix convention from entry.test.ts, which relPath does strip.
test('runQuestion populates evictedFiles by mapping evicted node ids through nodeById', async () => {
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.callGraph.set('sendMessage', [{ caller: 'x', file: 'f', edgeType: 'call' }]);
    const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
        { id: 'msg', title: 'Messaging', blurb: 'messages', sources: [{ file: 'apps/meteor/app/lib/server/sendMessage.ts', startLine: 1, endLine: 9 }] }] };
    const llm = new FakeLlm(['msg', '1a', '答案：apps/meteor/app/lib/server/sendMessage.ts:1']);
    const row = await runQuestion('q2', 'how is a message sent (sendMessage)?', {
        llm, outline, truthCore: ['apps/meteor/app/lib/server/sendMessage.ts'],
        deepwikiFn: async () => 'baseline',
        // budgetTokens=0 forces every selected node to be evicted, exercising evictedFiles mapping
        budgetTokens: 0,
        readFn: () => ({ text: 'const x = 1;', startLine: 1, endLine: 1 }),
    });
    assert.deepEqual(row.trace.selectedIds, ['1a']);
    assert.deepEqual(row.trace.reading.evicted, ['1a']);
    assert.deepEqual(row.trace.reading.evictedFiles, ['apps/meteor/app/lib/server/sendMessage.ts']);
});

test('runQuestion records routing.promptTokens from llm.promptTokensEst after route()', async () => {
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.callGraph.set('sendMessage', [{ caller: 'x', file: 'f', edgeType: 'call' }]);
    const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
        { id: 'msg', title: 'Messaging', blurb: 'messages', sources: [{ file: 'apps/meteor/app/lib/server/sendMessage.ts', startLine: 1, endLine: 9 }] }] };
    const llm = new FakeLlm(['msg', '1a', '答案：apps/meteor/app/lib/server/sendMessage.ts:1']);
    const row = await runQuestion('q3', 'how is a message sent (sendMessage)?', {
        llm, outline, truthCore: [],
        deepwikiFn: async () => 'baseline', readFn: () => ({ text: 'const x = 1;', startLine: 1, endLine: 1 }),
    });
    assert.ok(row.trace.routing.promptTokens > 0);
    // Must reflect only the routing call, not the final total after all 3 calls.
    assert.ok(row.trace.routing.promptTokens < row.trace.llm.promptTokensEst);
});
