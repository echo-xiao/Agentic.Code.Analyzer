import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildAnswerPrompt, validateCitations, generateAnswer } from '../../src/pipeline/answer.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { Material, Chain } from '../../src/pipeline/types.js';

const mats: Material[] = [{ nodeId: '1a', symbol: 's', file: 'apps/meteor/app/lib/server/a.ts', startLine: 40, endLine: 90, text: 'code', tokens: 1 }];
const chains: Chain[] = [{ id: 1, pageId: 'msg', sections: ['msg › S'], label: 'msg › S · e1', seed: { symbol: 'e1', file: 'f/e1.ts' }, score: 1, tied: false, prose: '' }];

test('buildAnswerPrompt groups materials by chain and states their line ranges', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(p.includes('Chain 1') && p.includes('apps/meteor/app/lib/server/a.ts:40-90'));
});

// The prompt used to demand Chinese, per-chain organisation and a file:line after every claim so
// the trace would show up inside the answer. The report carries the skeleton and the recap now,
// so those constraints are gone; citation checking survives only as a diagnostic.
test('buildAnswerPrompt imposes no output-format constraints', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(!/答案|中文|按途径|每个论断/.test(p));
});

test('buildAnswerPrompt: chainProse renders as background notes with an explicit do-not-cite instruction', () => {
    const prose = new Map([[1, 'Messaging flows through sendMessage, which validates and dispatches.']]);
    const p = buildAnswerPrompt('q', chains, mats, prose);
    assert.ok(p.includes('Wiki background notes (Chain 1'));
    assert.ok(p.includes('Messaging flows through sendMessage'));
    assert.ok(p.includes('background only'));
});

test('buildAnswerPrompt: without chainProse, output is unchanged from before (no background section)', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(!p.includes('Wiki background notes'));
    assert.ok(!p.includes('background only'));
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
    assert.deepEqual(r.citations.fabricated, []);
});

// The skeleton is what lets the answer narrate a PATH rather than describe disconnected bodies:
// it carries the passthrough/boundary nodes that never become materials, so it must reach the
// prompt verbatim, and the citation rule must stay pinned to the materials (only those carry
// line ranges validateCitations can check).
test('buildAnswerPrompt: skeletonText is embedded verbatim under its own heading', () => {
    const skeleton = 'Chain 1 (msg):\n  [1a] sendMessage  a.ts:1  const x = 1;\n    helper()';
    const p = buildAnswerPrompt('q', chains, mats, undefined, skeleton);
    assert.ok(p.includes('## Call-path skeleton'));
    assert.ok(p.includes(skeleton));
    assert.ok(p.includes('dispatch key'));      // dispatch nodes are explained to the model
});

test('buildAnswerPrompt: without skeletonText, no skeleton section appears', () => {
    const p = buildAnswerPrompt('q', chains, mats);
    assert.ok(!p.includes('## Call-path skeleton'));
});

test('generateAnswer forwards skeletonText into the prompt it sends', async () => {
    const llm = new FakeLlm(['答案 apps/meteor/app/lib/server/a.ts:52']);
    const seen: string[] = [];
    const spy = { calls: 0, promptTokensEst: 0, generate: async (p: string) => { seen.push(p); return llm.generate(p); } };
    await generateAnswer('q', chains, mats, spy, undefined, 'Chain 1 (msg):\n  [1a] sendMessage  a.ts:1');
    assert.ok(seen[0].includes('[1a] sendMessage'));
});
