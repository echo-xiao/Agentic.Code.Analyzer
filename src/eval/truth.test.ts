import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attachTruth, extractAnswerSection, type ClaudeTruth } from './utils/truth-io.js';
import type { TestCase } from './utils/load-testcases.js';

const baseTc: TestCase = {
    id: 'q1', question: 'chain?', questionType: 'call-chain', subsystem: 'msg', difficulty: 'med',
    groundTruthFiles: ['old/hand.ts'], groundTruthPath: [{ file: 'old/hand.ts', symbol: 'old' }],
    keySymbols: ['old'], core: ['old/hand.ts'], supporting: [], ordered: true,
};

const truth: ClaudeTruth = {
    core: ['a/send.ts', 'b/validate.ts'],
    supporting: ['c/notify.ts'],
    chain: [{ file: 'a/send.ts', symbol: 'sendMessage' }, { file: 'b/validate.ts', symbol: 'validateMessage' }],
    keySymbols: ['sendMessage', 'validateMessage'],
};

test('attachTruth replaces the spine but preserves question metadata', () => {
    const m = attachTruth(baseTc, truth);
    assert.deepEqual(m.core, ['a/send.ts', 'b/validate.ts']);
    assert.deepEqual(m.supporting, ['c/notify.ts']);
    assert.deepEqual(m.groundTruthFiles, ['a/send.ts', 'b/validate.ts', 'c/notify.ts']); // unique core∪supporting
    assert.deepEqual(m.groundTruthPath, truth.chain);
    assert.deepEqual(m.keySymbols, ['sendMessage', 'validateMessage']);
    // metadata preserved
    assert.equal(m.id, 'q1');
    assert.equal(m.questionType, 'call-chain');
    assert.equal(m.subsystem, 'msg');
    assert.equal(m.ordered, true);
});

test('extractAnswerSection returns the ## Answer body up to the next heading', () => {
    const md = '# Q\n\n## Answer\n\nEntry is `a/send.ts`.\n\n## Metrics\n\n| x | y |';
    assert.equal(extractAnswerSection(md), 'Entry is `a/send.ts`.');
});
