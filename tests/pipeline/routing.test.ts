import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRoutingPrompt, parseRoutingReply, route } from '../../src/pipeline/routing.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { WikiOutline } from '../../src/deepwiki/types.js';

const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
    { id: 'authentication', title: 'Authentication', blurb: 'login flows', sources: [] },
    { id: 'room-management', title: 'Room Management', blurb: 'rooms', sources: [] },
]};

test('buildRoutingPrompt lists every section id and the question', () => {
    const p = buildRoutingPrompt('How does login work?', outline);
    assert.ok(p.includes('authentication') && p.includes('room-management') && p.includes('How does login work?'));
});

test('parseRoutingReply keeps valid ids in order, drops unknown ids', () => {
    const r = parseRoutingReply('authentication\nnot-a-section\nroom-management', outline);
    assert.deepEqual(r, [{ sectionId: 'authentication', rank: 1 }, { sectionId: 'room-management', rank: 2 }]);
});

test('route returns [] when the model names nothing valid', async () => {
    const r = await route('q', outline, new FakeLlm(['nothing relevant']));
    assert.deepEqual(r, []);
});
