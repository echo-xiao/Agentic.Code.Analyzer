import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRoutingPrompt, parseRoutingReply, route } from '../../src/pipeline/routing.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { WikiSubsection } from '../../src/deepwiki/sections.js';

const sec = (pageId: string, heading: string): WikiSubsection =>
    ({ pageId, heading, path: `${pageId} › ${heading}`, sources: ['x.ts'], prose: '' });

const sections = [
    sec('2.2-core-application', 'Message Sending Workflow'),
    sec('2.2-core-application', 'Room Navigation and Opening Flow'),
    sec('6.2-messaging-and-room-apis', 'Data Flow: Sending a Message'),
    sec('2.4-ui-component-system', 'Overview'),
    sec('3.5-end-to-end-encryption', 'Overview'),
];

test('buildRoutingPrompt lists subsection paths and the question, never page blurbs', () => {
    const p = buildRoutingPrompt('how is a message sent?', sections);
    assert.ok(p.includes('2.2-core-application › Message Sending Workflow'));
    assert.ok(p.includes('6.2-messaging-and-room-apis › Data Flow: Sending a Message'));
    assert.ok(p.includes('how is a message sent?'));
    assert.ok(!/blurb/i.test(p));
});

test('parseRoutingReply matches full paths in order, ignoring duplicates and unknowns', () => {
    const r = parseRoutingReply(
        '2.2-core-application › Message Sending Workflow\nnope › nothing\n6.2-messaging-and-room-apis › Data Flow: Sending a Message\n2.2-core-application › Message Sending Workflow',
        sections);
    assert.deepEqual(r.map(x => x.path), [
        '2.2-core-application › Message Sending Workflow',
        '6.2-messaging-and-room-apis › Data Flow: Sending a Message',
    ]);
    assert.deepEqual(r.map(x => x.rank), [1, 2]);
});

// Headings repeat across pages ("Overview" appears in both 2.4 and 3.5), so a bare heading is
// ambiguous and must never match on its own.
test('parseRoutingReply requires the page-qualified path, not a bare heading', () => {
    assert.deepEqual(parseRoutingReply('Overview', sections), []);
    assert.deepEqual(parseRoutingReply('3.5-end-to-end-encryption › Overview', sections).map(x => x.path),
        ['3.5-end-to-end-encryption › Overview']);
});

test('parseRoutingReply tolerates decoration around the path', () => {
    const r = parseRoutingReply('1. `2.2-core-application › Message Sending Workflow` — most relevant', sections);
    assert.deepEqual(r.map(x => x.path), ['2.2-core-application › Message Sending Workflow']);
});

test('route returns [] when the model names nothing valid', async () => {
    assert.deepEqual(await route('q', sections, new FakeLlm(['I am not sure.'])), []);
});
