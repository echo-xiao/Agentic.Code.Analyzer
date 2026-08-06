import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildAnswerPrompt, validateCitations, generateAnswer } from '../../src/pipeline/answer.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { Material, Chain } from '../../src/pipeline/types.js';

const mats: Material[] = [{ nodeId: '1a', symbol: 's', file: 'apps/meteor/app/lib/server/a.ts', startLine: 40, endLine: 90, text: 'code', tokens: 1 }];
const chains: Chain[] = [{ id: 1, label: 'msg', seeds: [], rrfMass: 1 }];

test('buildAnswerPrompt groups materials by chain and demands Chinese + citations', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(p.includes('Chain 1') && p.includes('apps/meteor/app/lib/server/a.ts:40-90'));
    assert.ok(p.includes('中文'));
});

test('buildAnswerPrompt: chainProse renders as background notes with an explicit do-not-cite instruction', () => {
    const prose = new Map([[1, 'Messaging flows through sendMessage, which validates and dispatches.']]);
    const p = buildAnswerPrompt('q', chains, mats, prose);
    assert.ok(p.includes('Wiki background notes (Chain 1'));
    assert.ok(p.includes('Messaging flows through sendMessage'));
    assert.ok(p.includes('BACKGROUND ONLY'));
    assert.ok(/never (come |cite )?from the (wiki )?notes/i.test(p) || p.includes('never from the wiki notes'));
});

test('buildAnswerPrompt: without chainProse, output is unchanged from before (no background section)', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(!p.includes('Wiki background notes'));
    assert.ok(!p.includes('BACKGROUND ONLY'));
});

test('validateCitations flags citations outside the materials', () => {
    const { valid, fabricated } = validateCitations(
        '入口在 apps/meteor/app/lib/server/a.ts:52，另见 apps/meteor/fake.ts:10 和 apps/meteor/app/lib/server/a.ts:300', mats);
    assert.deepEqual(valid, ['apps/meteor/app/lib/server/a.ts:52']);
    assert.deepEqual(fabricated, ['apps/meteor/fake.ts:10', 'apps/meteor/app/lib/server/a.ts:300']);
});

test('generateAnswer returns the llm text plus fabrication report', async () => {
    const r = await generateAnswer('q', chains, mats, new FakeLlm(['答案 apps/meteor/app/lib/server/a.ts:52']));
    assert.ok(r.answer.includes('答案'));
    assert.deepEqual(r.fabricated, []);
});
