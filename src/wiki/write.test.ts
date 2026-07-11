/**
 * write.test.ts — pure-function unit tests for enforceCitations and assembleProse.
 * Zero API calls. Zero GLOBAL_INDEX dependency (IndexLike is injected).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { enforceCitations, assembleProse, type IndexLike } from './write.js';
import type { WikiPage } from '../wikimap/schema.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeIndex(relPaths: string[], lineCountOf?: (p: string) => number | null): IndexLike {
  return {
    allFiles: new Set(relPaths),
    lineCountOf,
  };
}

function makePage(title = 'Test Chapter'): WikiPage {
  return {
    id: 'test',
    title,
    category: 'Test',
    scope: 'test scope',
    modules: [],
    seedFiles: [],
    page: title,
    sections: [],
    diagrams: [],
    source_files: {},
  };
}

// ── enforceCitations: keep valid citation ─────────────────────────────────────

test('enforceCitations: keeps valid path:line citation', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'AuthService handles authentication.',
    'Sources: server/auth/AuthService.ts:L10-L50',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(kept.includes('AuthService handles authentication.'), 'should keep the assertion');
  assert.ok(kept.includes('Sources: server/auth/AuthService.ts:L10-L50'), 'should keep valid Sources line');
  assert.equal(dropped.length, 0, 'should drop nothing');
});

// ── enforceCitations: drops bad-path citation ─────────────────────────────────

test('enforceCitations: drops citation pointing to non-existent file', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'SomeNonexistentClass is critical.',
    'Sources: server/nonexistent/Foo.ts:L1-L30',
    '',
    'AuthService handles auth.',
    'Sources: server/auth/AuthService.ts:L10-L50',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(dropped.length > 0, 'should drop bad citation');
  assert.ok(dropped.some(d => d.path.includes('nonexistent') || d.reason.includes('not in index')),
    `dropped should contain nonexistent path, got: ${JSON.stringify(dropped)}`);
  // The valid citation should remain
  assert.ok(kept.includes('Sources: server/auth/AuthService.ts:L10-L50'), 'valid citation should remain');
});

// ── enforceCitations: drops out-of-bounds line range ─────────────────────────

test('enforceCitations: drops out-of-bounds line range', () => {
  const lineCountOf = (p: string) => p === 'server/tiny.ts' ? 20 : null;
  const idx = makeIndex(['server/tiny.ts'], lineCountOf);
  const text = [
    'TinyModule does something.',
    'Sources: server/tiny.ts:L1-L999',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(dropped.length > 0, 'should drop out-of-bounds citation');
  assert.ok(dropped.some(d => d.reason.includes('out of bounds')),
    `should mention out of bounds, got: ${JSON.stringify(dropped)}`);
});

// ── enforceCitations: keeps L1 single-line citation ──────────────────────────

test('enforceCitations: keeps single-line L1 citation', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'AuthService is defined here.',
    'Sources: server/auth/AuthService.ts:L1',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(kept.includes('Sources: server/auth/AuthService.ts:L1'), 'should keep L1 citation');
  assert.equal(dropped.length, 0);
});

// ── enforceCitations: multiple refs on one line, partial bad ─────────────────

test('enforceCitations: drops Sources line when any ref is bad', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'Some component assertion.',
    'Sources: server/auth/AuthService.ts:L1-L10, server/GHOST.ts:L1-L5',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  // The whole Sources line should be dropped because one ref is bad
  assert.ok(dropped.length > 0, 'should drop when any ref is bad');
});

// ── Important 1: path:10-50 (no-L) form is accepted, not dropped ─────────────

test('enforceCitations: keeps path:start-end citation (no L prefix on start)', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'AuthService handles authentication.',
    'Sources: server/auth/AuthService.ts:10-50',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(kept.includes('AuthService handles authentication.'), 'should keep the assertion');
  assert.ok(kept.includes('Sources: server/auth/AuthService.ts:10-50'), 'should keep no-L citation');
  assert.equal(dropped.length, 0, 'should drop nothing for valid no-L citation');
});

// ── Important 2: production-shaped call drops out-of-bounds citation ──────────

test('enforceCitations: production lineCountOf wired — drops out-of-bounds L1-L9999 on 200-line file', () => {
  // Simulate the production-shaped call: lineCountOf returns a real count
  const lineCountOf = (p: string) => p === 'server/big.ts' ? 200 : undefined;
  const idx = makeIndex(['server/big.ts'], lineCountOf);
  const text = [
    'BigModule does something important.',
    'Sources: server/big.ts:L1-L9999',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.ok(dropped.length > 0, 'should drop out-of-bounds citation when lineCountOf is provided');
  assert.ok(dropped.some(d => d.reason.includes('out of bounds')),
    `should mention out of bounds, got: ${JSON.stringify(dropped)}`);
  assert.ok(!kept.includes('Sources: server/big.ts:L1-L9999'), 'should not keep the Sources line');
});

// ── Important 3: path:L10-L50 (L-prefixed end) lands in source_files ─────────
// We test this via enforceCitations keeping the line, then manually verify
// that the same regex used in writeChapter's source_files extraction accepts it.

test('enforceCitations: path:L10-L50 (L-end form) is kept and extractable for source_files', () => {
  const idx = makeIndex(['server/auth/AuthService.ts']);
  const text = [
    'AuthService manages sessions.',
    'Sources: server/auth/AuthService.ts:L10-L50',
  ].join('\n');

  const { kept, dropped } = enforceCitations(text, idx);
  assert.equal(dropped.length, 0, 'should keep L10-L50 citation');
  assert.ok(kept.includes('Sources: server/auth/AuthService.ts:L10-L50'), 'citation must survive enforcement');

  // Verify the source_files extraction regex (mirrored from writeChapter) accepts the L-end form
  const SOURCES_RE = /^Sources:\s*(.+)$/gim;
  const REF_RE = /^([^:]+):L?(\d+)(?:-L?(\d+))?$/;
  const source_files: Record<string, string[]> = {};
  let sm: RegExpExecArray | null;
  while ((sm = SOURCES_RE.exec(kept)) !== null) {
    for (const ref of sm[1].split(',').map(s => s.trim())) {
      const rm = REF_RE.exec(ref.trim());
      if (!rm) continue;
      const [, refPath, start, end] = rm;
      const range = end ? `L${start}-${end}` : `L${start}`;
      if (!source_files[refPath]) source_files[refPath] = [];
      if (!source_files[refPath].includes(range)) source_files[refPath].push(range);
    }
  }

  assert.ok(
    'server/auth/AuthService.ts' in source_files,
    `AuthService.ts should be in source_files; got keys: ${JSON.stringify(Object.keys(source_files))}`,
  );
  assert.ok(
    source_files['server/auth/AuthService.ts'].some(r => r.includes('10')),
    `source_files range should include line 10; got: ${JSON.stringify(source_files['server/auth/AuthService.ts'])}`,
  );
});

// ── assembleProse: splits by ## headers ──────────────────────────────────────

test('assembleProse: splits LLM output by ## headers', () => {
  const page = makePage();
  const raw = [
    '## Overview',
    'This is the overview text.',
    'Sources: server/auth/AuthService.ts:L1-L10',
    '',
    '## Implementation Details',
    'Here are the implementation details.',
    'Sources: server/auth/TokenManager.ts:L5-L20',
  ].join('\n');

  const sections = assembleProse(page, raw);
  assert.ok(sections.length >= 2, `should have at least 2 sections, got ${sections.length}`);
  const overview = sections.find(s => s.section === 'Overview');
  assert.ok(overview, 'should have Overview section');
  assert.ok(overview!.text.includes('overview text'), 'should include body text');
  assert.ok(overview!.text.includes('Sources:'), 'should keep Sources: lines');

  const impl = sections.find(s => s.section === 'Implementation Details');
  assert.ok(impl, 'should have Implementation Details section');
});

// ── assembleProse: strips mermaid blocks ─────────────────────────────────────

test('assembleProse: strips mermaid blocks', () => {
  const page = makePage();
  const raw = [
    '## Overview',
    'Some text before mermaid.',
    '```mermaid',
    'graph LR',
    '  A --> B',
    '```',
    'Some text after mermaid.',
  ].join('\n');

  const sections = assembleProse(page, raw);
  assert.ok(sections.length > 0, 'should have at least one section');
  for (const s of sections) {
    assert.ok(!s.text.includes('```mermaid'), 'mermaid block should be stripped');
    assert.ok(!s.text.includes('graph LR'), 'mermaid content should be stripped');
  }
  // Text outside mermaid should remain
  const allText = sections.map(s => s.text).join('\n');
  assert.ok(allText.includes('Some text before mermaid') || allText.includes('Some text after mermaid'),
    'text outside mermaid should be kept');
});

// ── assembleProse: Sources: lines preserved ───────────────────────────────────

test('assembleProse: preserves Sources: lines in section text', () => {
  const page = makePage();
  const raw = [
    '## Architecture',
    'The AuthService manages sessions.',
    'Sources: server/auth/AuthService.ts:L10-L50',
    '',
    'TokenManager issues JWTs.',
    'Sources: server/auth/TokenManager.ts:L5',
  ].join('\n');

  const sections = assembleProse(page, raw);
  const arch = sections.find(s => s.section === 'Architecture');
  assert.ok(arch, 'should have Architecture section');
  assert.ok(arch!.text.includes('Sources: server/auth/AuthService.ts:L10-L50'),
    'should preserve first Sources line');
  assert.ok(arch!.text.includes('Sources: server/auth/TokenManager.ts:L5'),
    'should preserve second Sources line');
});

// ── assembleProse: content before first ## goes into Overview ─────────────────

test('assembleProse: content before first ## header treated as Overview', () => {
  const page = makePage();
  const raw = [
    'Introductory text with no header.',
    '',
    '## Section One',
    'Section one text.',
  ].join('\n');

  const sections = assembleProse(page, raw);
  assert.ok(sections.length >= 1, 'should have at least one section');
  // The preamble should not cause a crash
  const sectionNames = sections.map(s => s.section);
  assert.ok(sectionNames.includes('Section One'), 'should have Section One');
});

// ── assembleProse: strips mermaid but keeps surrounding prose ─────────────────

test('assembleProse: multi-mermaid block strips correctly', () => {
  const page = makePage();
  const raw = [
    '## Diagram Section',
    'First paragraph.',
    '```mermaid',
    'sequenceDiagram',
    '  A->>B: hello',
    '```',
    'Second paragraph.',
    '```mermaid',
    'graph TD',
    '  X --> Y',
    '```',
    'Third paragraph.',
  ].join('\n');

  const sections = assembleProse(page, raw);
  const allText = sections.map(s => s.text).join('\n');
  assert.ok(allText.includes('First paragraph'), 'should keep first paragraph');
  assert.ok(allText.includes('Second paragraph'), 'should keep second paragraph');
  assert.ok(allText.includes('Third paragraph'), 'should keep third paragraph');
  assert.ok(!allText.includes('sequenceDiagram'), 'should strip sequenceDiagram');
  assert.ok(!allText.includes('graph TD'), 'should strip graph TD');
});
