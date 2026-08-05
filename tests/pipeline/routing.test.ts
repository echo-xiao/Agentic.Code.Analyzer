import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRoutingPrompt, parseRoutingReply, route } from '../../src/pipeline/routing.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { WikiOutline } from '../../src/deepwiki/types.js';

const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
    { id: '2.4-ui-component-system', title: 'UI Component System', blurb: 'component library and rendering', sources: [] },
    { id: '6.2-message-sending', title: 'Message Sending', blurb: 'message delivery flows', sources: [] },
]};

test('buildRoutingPrompt lists every section id and the question', () => {
    const p = buildRoutingPrompt('How does login work?', outline);
    assert.ok(p.includes('2.4-ui-component-system') && p.includes('6.2-message-sending') && p.includes('How does login work?'));
});

test('parseRoutingReply keeps valid ids in order, drops unknown ids', () => {
    const r = parseRoutingReply('2.4-ui-component-system\nnot-a-section\n6.2-message-sending', outline);
    assert.deepEqual(r, [{ sectionId: '2.4-ui-component-system', rank: 1 }, { sectionId: '6.2-message-sending', rank: 2 }]);
});

test('route returns [] when the model names nothing valid', async () => {
    const r = await route('q', outline, new FakeLlm(['nothing relevant']));
    assert.deepEqual(r, []);
});

test('parseRoutingReply resolves bare numeric prefixes to matching section ids', () => {
    const r = parseRoutingReply('2.4\n6.2', outline);
    assert.deepEqual(r, [{ sectionId: '2.4-ui-component-system', rank: 1 }, { sectionId: '6.2-message-sending', rank: 2 }]);
});

test('parseRoutingReply matches exact full section ids', () => {
    const r = parseRoutingReply('2.4-ui-component-system\n6.2-message-sending', outline);
    assert.deepEqual(r, [{ sectionId: '2.4-ui-component-system', rank: 1 }, { sectionId: '6.2-message-sending', rank: 2 }]);
});

test('parseRoutingReply resolves prefix to unique section id when sub-versions exist', () => {
    const outlineWithSubversions: WikiOutline = { repo: 'r', commit: 'c', sections: [
        { id: '5-security', title: 'Security', blurb: 'auth and encryption', sources: [] },
        { id: '5.1-permissions', title: 'Permissions', blurb: 'access control', sources: [] },
    ]};
    const r = parseRoutingReply('5', outlineWithSubversions);
    assert.deepEqual(r, [{ sectionId: '5-security', rank: 1 }]);
});

test('parseRoutingReply skips prefix when it matches no section', () => {
    const r = parseRoutingReply('9\n2.4\n99', outline);
    assert.deepEqual(r, [{ sectionId: '2.4-ui-component-system', rank: 1 }]);
});
