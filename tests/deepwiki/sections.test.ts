import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { parseSections, loadAllSections } from '../../src/deepwiki/sections.js';

const MD = [
    'preamble before any heading, cites [pre/amble.ts:1]() which must be ignored',
    '',
    '## Purpose and Scope',
    'Pure prose, no citations at all.',
    '',
    '## Message Sending Workflow',
    'The flow starts in [apps/meteor/client/lib/chats/flows/sendMessage.ts:59-120]().',
    'It then calls [apps/meteor/app/lib/client/methods/sendMessage.ts:12]().',
    'A repeat of [apps/meteor/client/lib/chats/flows/sendMessage.ts:200]() must not duplicate.',
    '',
    '### Optimistic Update',
    'Handled by [apps/meteor/client/lib/optimistic.ts:5-40]().',
    '',
    '## Relevant source files',
    '- [apps/meteor/package.json](apps/meteor/package.json)',
].join('\n');

test('parseSections attributes citations to the heading they appear under', () => {
    const secs = parseSections('2.2-core-application', MD);
    assert.deepEqual(secs.map(s => s.heading), ['Message Sending Workflow', 'Optimistic Update']);
    assert.deepEqual(secs[0].sources, [
        'apps/meteor/client/lib/chats/flows/sendMessage.ts',
        'apps/meteor/app/lib/client/methods/sendMessage.ts',
    ]);
    assert.deepEqual(secs[1].sources, ['apps/meteor/client/lib/optimistic.ts']);
});

test('parseSections drops prose-only subsections and the page preamble', () => {
    const secs = parseSections('p', MD);
    assert.ok(!secs.some(s => s.heading === 'Purpose and Scope'));
    assert.ok(!secs.some(s => s.sources.includes('pre/amble.ts')));
});

// The page header's `- [path](path)` bullet list is page-wide and carries no line anchor, so it
// must not be mistaken for a subsection-scoped citation.
test('parseSections ignores the page-level bullet list of relevant files', () => {
    const secs = parseSections('p', MD);
    assert.ok(!secs.some(s => s.heading === 'Relevant source files'));
});

test('parseSections builds a page-qualified path and keeps the subsection prose', () => {
    const secs = parseSections('2.2-core-application', MD);
    assert.equal(secs[0].path, '2.2-core-application › Message Sending Workflow');
    assert.ok(secs[0].prose.includes('The flow starts in'));
    assert.ok(!secs[0].prose.includes('Handled by'));      // stops at the next heading
});

test('loadAllSections reads a directory of pages', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'secs-'));
    fs.writeFileSync(path.join(dir, 'a-page.md'), '## S\ncites [x/y.ts:1]()\n');
    fs.writeFileSync(path.join(dir, 'b-page.md'), '## T\ncites [z/w.ts:2]()\n');
    const all = loadAllSections(dir);
    assert.deepEqual(all.map(s => s.path), ['a-page › S', 'b-page › T']);
});
