/**
 * verify.test.ts — fixture-based unit tests for verifyCitations and writeVerifyReport.
 *
 * Zero API calls. Zero GLOBAL_INDEX dependency (IndexLike is injected).
 * No real data/wiki-prose.json read — all prose is supplied as fixtures.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { verifyCitations, writeVerifyReport } from './verify.js';
import type { IndexLike } from './write.js';
import type { ProseSection } from '../wikimap/schema.js';

// ── Fixture helpers ───────────────────────────────────────────────────────────

function makeIndex(
  relPaths: string[],
  lineCountOf?: (p: string) => number | null | undefined,
): IndexLike {
  return {
    allFiles: new Set(relPaths),
    lineCountOf,
  };
}

type ProseRecord = Record<string, ProseSection[]>;

function makeProse(chapters: Record<string, string>): ProseRecord {
  // Each value is the raw section text; wrap it as a single section per chapter.
  const result: ProseRecord = {};
  for (const [chapterTitle, text] of Object.entries(chapters)) {
    result[chapterTitle] = [{ section: 'Overview', text }];
  }
  return result;
}

// ── Test 1: valid citation counted as valid ───────────────────────────────────

test('verifyCitations: valid citation counts as valid', () => {
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose = makeProse({
    'Auth Chapter': [
      'AuthService handles authentication.',
      'Sources: server/auth/AuthService.ts:L10-L50',
    ].join('\n'),
  });

  const result = verifyCitations(prose, index);

  assert.equal(result.perChapter.length, 1);
  const ch = result.perChapter[0];
  assert.equal(ch.chapter, 'Auth Chapter');
  assert.equal(ch.citations, 1, 'should count 1 citation');
  assert.equal(ch.valid, 1, 'should have 1 valid citation');
  assert.equal(ch.invalid.length, 0, 'should have 0 invalid citations');
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0');
});

// ── Test 2: bad-path citation counts as invalid with reason ──────────────────

test('verifyCitations: bad-path citation counts as invalid with reason', () => {
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose = makeProse({
    'Broken Chapter': [
      'SomeNonexistentClass is critical.',
      'Sources: server/nonexistent/Ghost.ts:L1-L30',
    ].join('\n'),
  });

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.citations, 1, 'should count 1 citation');
  assert.equal(ch.valid, 0, 'should have 0 valid');
  assert.ok(ch.invalid.length > 0, 'should have at least 1 invalid');
  assert.ok(
    ch.invalid.some(d => d.reason.includes('not in index')),
    `invalid reason should say "not in index", got: ${JSON.stringify(ch.invalid)}`,
  );
  assert.ok(result.citation_validity_rate < 1.0, 'rate should be less than 1.0');
});

// ── Test 3: out-of-bounds line range counts as invalid with reason ────────────

test('verifyCitations: out-of-bounds citation counts as invalid with reason', () => {
  const lineCountOf = (p: string) => (p === 'server/tiny.ts' ? 20 : undefined);
  const index = makeIndex(['server/tiny.ts'], lineCountOf);
  const prose = makeProse({
    'Tiny Chapter': [
      'TinyModule does something.',
      'Sources: server/tiny.ts:L1-L999',
    ].join('\n'),
  });

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.citations, 1, 'should count 1 citation');
  assert.equal(ch.valid, 0, 'should have 0 valid');
  assert.ok(ch.invalid.length > 0, 'should have at least 1 invalid');
  assert.ok(
    ch.invalid.some(d => d.reason.includes('out of bounds')),
    `invalid reason should say "out of bounds", got: ${JSON.stringify(ch.invalid)}`,
  );
});

// ── Test 4: citation_validity_rate computed correctly ─────────────────────────

test('verifyCitations: citation_validity_rate numeric value correct', () => {
  // 1 valid + 1 invalid in different chapters → rate = 0.5
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose: ProseRecord = {
    'Good Chapter': [
      {
        section: 'Overview',
        text: [
          'AuthService handles auth.',
          'Sources: server/auth/AuthService.ts:L10-L50',
        ].join('\n'),
      },
    ],
    'Bad Chapter': [
      {
        section: 'Overview',
        text: [
          'Ghost class does nothing.',
          'Sources: server/ghost/Ghost.ts:L1-L10',
        ].join('\n'),
      },
    ],
  };

  const result = verifyCitations(prose, index);

  assert.equal(result.perChapter.length, 2, 'should have 2 chapters');

  const goodCh = result.perChapter.find(c => c.chapter === 'Good Chapter')!;
  const badCh = result.perChapter.find(c => c.chapter === 'Bad Chapter')!;

  assert.ok(goodCh, 'should have Good Chapter');
  assert.ok(badCh, 'should have Bad Chapter');

  assert.equal(goodCh.valid, 1, 'Good Chapter should have 1 valid');
  assert.equal(goodCh.invalid.length, 0, 'Good Chapter should have 0 invalid');

  assert.equal(badCh.valid, 0, 'Bad Chapter should have 0 valid');
  assert.ok(badCh.invalid.length > 0, 'Bad Chapter should have invalid citations');

  // rate = 1 valid / 2 total citations (each chapter has 1)
  assert.ok(
    Math.abs(result.citation_validity_rate - 0.5) < 0.001,
    `rate should be 0.5, got ${result.citation_validity_rate}`,
  );
});

// ── Test 5: zero-citation chapter handled gracefully ─────────────────────────

test('verifyCitations: zero-citation chapter does not crash', () => {
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose = makeProse({
    'Empty Chapter': 'This chapter has no source citations at all.',
  });

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.chapter, 'Empty Chapter');
  assert.equal(ch.citations, 0, 'citations should be 0');
  assert.equal(ch.valid, 0, 'valid should be 0');
  assert.equal(ch.invalid.length, 0, 'invalid should be empty array');

  // Rate should be defined and valid (not NaN, not Infinity)
  assert.ok(Number.isFinite(result.citation_validity_rate), 'rate should be finite');
  // Zero-citation chapters contribute 1/1 to rate (documented choice)
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0 when no citations');
});

// ── Test 6: zero-citation chapter mixed with valid chapter ────────────────────

test('verifyCitations: zero-citation chapter mixed with valid chapter', () => {
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose: ProseRecord = {
    'No Citations': [{ section: 'Overview', text: 'No citations here.' }],
    'Has Citations': [
      {
        section: 'Overview',
        text: [
          'AuthService handles auth.',
          'Sources: server/auth/AuthService.ts:L10-L50',
        ].join('\n'),
      },
    ],
  };

  const result = verifyCitations(prose, index);

  // Both chapters: each contributes 1 effective valid / 1 effective total
  // rate = 2/2 = 1.0
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0');
});

// ── Test 7: multiple valid citations in one chapter ───────────────────────────

test('verifyCitations: multiple valid citations in one chapter', () => {
  const index = makeIndex([
    'server/auth/AuthService.ts',
    'server/auth/TokenManager.ts',
  ]);
  const prose = makeProse({
    'Auth Chapter': [
      'AuthService handles auth.',
      'Sources: server/auth/AuthService.ts:L10-L50',
      '',
      'TokenManager issues JWTs.',
      'Sources: server/auth/TokenManager.ts:L5-L30',
    ].join('\n'),
  });

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.citations, 2, 'should count 2 citations');
  assert.equal(ch.valid, 2, 'should have 2 valid citations');
  assert.equal(ch.invalid.length, 0, 'should have 0 invalid');
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0');
});

// ── Test 8: multi-section chapter aggregates across sections ──────────────────

test('verifyCitations: multi-section chapter aggregates citations across sections', () => {
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose: ProseRecord = {
    'Multi Chapter': [
      {
        section: 'Overview',
        text: [
          'AuthService handles auth.',
          'Sources: server/auth/AuthService.ts:L10-L50',
        ].join('\n'),
      },
      {
        section: 'Details',
        text: [
          'Ghost does nothing.',
          'Sources: server/ghost/Ghost.ts:L1-L10',
        ].join('\n'),
      },
    ],
  };

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.chapter, 'Multi Chapter');
  assert.equal(ch.citations, 2, 'should aggregate citations from both sections');
  assert.equal(ch.valid, 1, 'should have 1 valid');
  assert.ok(ch.invalid.length >= 1, 'should have at least 1 invalid');

  assert.ok(
    Math.abs(result.citation_validity_rate - 0.5) < 0.001,
    `rate should be 0.5, got ${result.citation_validity_rate}`,
  );
});

// ── Test 9: writeVerifyReport writes a file with expected content ─────────────

test('writeVerifyReport: writes markdown report to a tmp path', () => {
  const tmpDir = os.tmpdir();
  const outPath = path.join(tmpDir, `wiki-verify-test-${Date.now()}.md`);

  const fakeResult = {
    perChapter: [
      {
        chapter: 'Auth Chapter',
        citations: 2,
        valid: 2,
        invalid: [],
      },
      {
        chapter: 'Broken Chapter',
        citations: 1,
        valid: 0,
        invalid: [
          {
            claim: 'Ghost class does stuff.',
            path: 'server/ghost/Ghost.ts:L1-L10',
            reason: 'path not in index: server/ghost/Ghost.ts',
          },
        ],
      },
    ],
    citation_validity_rate: 0.667,
  };

  writeVerifyReport(fakeResult, outPath);

  const content = fs.readFileSync(outPath, 'utf-8');

  assert.ok(content.includes('citation_validity_rate'), 'report should contain citation_validity_rate');
  assert.ok(content.includes('66.7%'), 'report should show rate as percentage');
  assert.ok(content.includes('Auth Chapter'), 'report should include Auth Chapter');
  assert.ok(content.includes('Broken Chapter'), 'report should include Broken Chapter');
  assert.ok(content.includes('path not in index'), 'report should include the invalid reason');
  assert.ok(content.includes('Ghost'), 'report should include the invalid path');

  // Clean up
  try { fs.unlinkSync(outPath); } catch { /* ignore */ }
});

// ── Test 10: empty prose (no chapters) ───────────────────────────────────────

test('verifyCitations: empty prose returns rate 1.0', () => {
  const index = makeIndex([]);
  const prose: ProseRecord = {};

  const result = verifyCitations(prose, index);

  assert.equal(result.perChapter.length, 0, 'no chapters');
  assert.equal(result.citation_validity_rate, 1.0, 'empty prose → rate 1.0 (divide-by-zero guard)');
});
