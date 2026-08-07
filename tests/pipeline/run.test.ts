import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { runQuestion } from '../../src/pipeline/run.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { WikiSubsection } from '../../src/deepwiki/sections.js';

const ABS = '/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts';
const REL = 'apps/meteor/app/lib/server/sendMessage.ts';
const HELPER_ABS = '/abs/Rocket.Chat/apps/meteor/app/lib/server/helper.ts';

const sections: WikiSubsection[] = [
    { pageId: 'msg-page', heading: 'Message Sending Workflow', path: 'msg-page › Message Sending Workflow', sources: [REL], prose: 'the send flow' },
];
const readFn = () => ({ text: 'const x = 1;', startLine: 1, endLine: 1 });

beforeEach(() => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.fileDependents.clear();
    GLOBAL_INDEX.symbols.set('sendMessage', new Set([ABS]));
});

test('runQuestion wires every stage with exactly 3 LLM calls', async () => {
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案：sendMessage 做了这些事']);
    const row = await runQuestion('q1', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => 'baseline', readFn,
    });
    assert.equal(row.trace.llm.calls, 3);
    assert.equal(row.deepwiki, 'baseline');
    assert.equal(row.trace.chains.length, 1);
    assert.equal(row.trace.chains[0].seed.symbol, 'sendMessage');
    assert.ok(row.trace.readIds.length > 0 && row.answer.includes('答案'));
});

test('runQuestion records pool stats, including pages whose pool scored zero', async () => {
    GLOBAL_INDEX.symbols.set('rateLimiter', new Set(['/abs/Rocket.Chat/apps/meteor/api/rest.ts']));
    const twoSections: WikiSubsection[] = [
        sections[0],
        { pageId: 'api-page', heading: 'Rate Limiting', path: 'api-page › Rate Limiting', sources: ['apps/meteor/api/rest.ts'], prose: '' },
    ];
    const llm = new FakeLlm(['msg-page › Message Sending Workflow\napi-page › Rate Limiting', '1', '答案']);
    const row = await runQuestion('q2', 'how is a message sent?', {
        llm, sections: twoSections, deepwikiFn: async () => 'b', readFn,
    });
    const api = row.trace.pools.find(p => p.pageId === 'api-page')!;
    assert.deepEqual(api.seeds, []);                         // nothing in the pool matches the question
    assert.deepEqual(row.trace.chains.map(c => c.seed.symbol), ['sendMessage']);
});

test('runQuestion carries the rendered skeleton in the trace for the report to show', async () => {
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案']);
    const row = await runQuestion('q3', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => 'b', readFn,
    });
    assert.ok(row.trace.skeletonText.includes('sendMessage'));
    assert.ok(row.trace.skeletonText.includes('[1a]'));
});

test('runQuestion records routing.promptTokens from the first call only', async () => {
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案']);
    const row = await runQuestion('q4', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => 'b', readFn,
    });
    assert.ok(row.trace.routing.promptTokens > 0);
    assert.ok(row.trace.routing.promptTokens < row.trace.llm.promptTokensEst);
    assert.deepEqual(row.trace.selection.kept, [1]);
});

test('runQuestion reads every major node, chain root first', async () => {
    GLOBAL_INDEX.symbols.set('helper', new Set([HELPER_ABS]));
    GLOBAL_INDEX.callGraph.set('helper', [{ caller: 'sendMessage', file: ABS, edgeType: 'call' }]);
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案']);
    const row = await runQuestion('q5', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => 'b', budgetTokens: 24000, readFn,
    });
    assert.ok(row.trace.readIds.length > 1);
    assert.equal(row.trace.readIds[0], '1a');
    assert.deepEqual(row.trace.reading.materials.map(m => m.nodeId), row.trace.readIds);
    assert.deepEqual(row.trace.reading.unread, []);
});

test('runQuestion: a zero ceiling reads nothing and records it', async () => {
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案']);
    const row = await runQuestion('q6', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => 'b', budgetTokens: 0, readFn,
    });
    assert.deepEqual(row.trace.reading.unread, ['1a']);
    assert.equal(row.trace.reading.cappedOut, true);
});

test('runQuestion: a deepwikiFn that throws still resolves with the run row', async () => {
    const llm = new FakeLlm(['msg-page › Message Sending Workflow', '1', '答案']);
    const row = await runQuestion('q7', 'how is a message sent?', {
        llm, sections, deepwikiFn: async () => { throw new Error('mcp down'); }, readFn,
    });
    assert.ok(row.deepwiki.includes('mcp down'));
    assert.ok(row.answer.includes('答案'));
});
