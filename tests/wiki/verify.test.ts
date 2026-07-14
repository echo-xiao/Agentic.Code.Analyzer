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

import { verifyCitations, writeVerifyReport } from '../../src/wiki/verify.js';
import type { IndexLike } from '../../src/wiki/citations.js';
import type { ProseSection } from '../../src/wikimap/schema.js';

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

// ── Test 5: zero-citation chapter counted in uncited_chapters, excluded from rate

test('verifyCitations: zero-citation chapter counted in uncited_chapters, not in rate', () => {
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

  // Zero-citation chapter is tracked in uncited_chapters
  assert.equal(result.uncited_chapters, 1, 'uncited_chapters should be 1');

  // Rate should be defined and valid (not NaN, not Infinity)
  assert.ok(Number.isFinite(result.citation_validity_rate), 'rate should be finite');
  // No cited chapters → denominator = 0 → rate = 1.0 (divide-by-zero guard:
  // no invalid citations exist when no citations exist at all)
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0 (divide-by-zero guard)');
});

// ── Test 6: zero-citation chapter mixed with valid chapter ────────────────────

test('verifyCitations: zero-citation chapter mixed with valid chapter — rate from cited chapters only', () => {
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

  // "No Citations" chapter is in uncited_chapters, NOT in the rate denominator.
  assert.equal(result.uncited_chapters, 1, 'uncited_chapters should be 1');
  // Rate = 1 valid / 1 total (only "Has Citations" contributes) = 1.0.
  // NOT because zero-citation was substituted as 1/1 — it is simply excluded.
  assert.equal(result.citation_validity_rate, 1.0, 'rate should be 1.0 (only cited chapter in denominator)');
});

// ── Test 6b: inflation regression — 2 uncited + 1 chapter with 1 valid + 1 invalid

test('verifyCitations: uncited chapters do not inflate rate (regression)', () => {
  // 2 uncited chapters + 1 chapter with 1 valid + 1 invalid ref
  // Correct rate = 1 / 2 = 0.5 (only the cited chapter counts)
  // Inflated rate (old bug) = 3 valid / 4 total = 0.75 (uncited added as 1/1)
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose: ProseRecord = {
    'Uncited A': [{ section: 'Overview', text: 'No citations.' }],
    'Uncited B': [{ section: 'Overview', text: 'Also no citations.' }],
    'Mixed Chapter': [
      {
        section: 'Overview',
        text: [
          'AuthService handles auth.',
          'Sources: server/auth/AuthService.ts:L10-L50',
          'Ghost does nothing.',
          'Sources: server/nonexistent/Ghost.ts:L1-L10',
        ].join('\n'),
      },
    ],
  };

  const result = verifyCitations(prose, index);

  assert.equal(result.uncited_chapters, 2, 'uncited_chapters should be 2');
  assert.equal(result.perChapter.length, 3, 'should have 3 chapters');

  const mixed = result.perChapter.find(c => c.chapter === 'Mixed Chapter')!;
  assert.ok(mixed, 'Mixed Chapter should be present');
  assert.equal(mixed.citations, 2, 'Mixed Chapter should have 2 citations');
  assert.equal(mixed.valid, 1, 'Mixed Chapter should have 1 valid');
  assert.equal(mixed.invalid.length, 1, 'Mixed Chapter should have 1 invalid');

  // Only Mixed Chapter contributes: 1 valid / 2 total = 0.5
  assert.ok(
    Math.abs(result.citation_validity_rate - 0.5) < 0.001,
    `rate should be 0.5 (inflation-free), got ${result.citation_validity_rate}`,
  );
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
    uncited_chapters: 0,
  };

  writeVerifyReport(fakeResult, outPath);

  const content = fs.readFileSync(outPath, 'utf-8');

  assert.ok(content.includes('citation_validity_rate'), 'report should contain citation_validity_rate');
  assert.ok(content.includes('66.7%'), 'report should show rate as percentage');
  assert.ok(content.includes('uncited_chapters'), 'report should include uncited_chapters');
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

// ── Test 11: Sources: line with good + bad ref → entire line dropped → valid=0 ─

test('verifyCitations: Sources: line with one valid + one bad ref → valid=0 (whole line dropped)', () => {
  // enforceCitations drops the ENTIRE Sources: line when any ref on it is bad,
  // so the good ref does NOT survive into the kept text.
  // valid must be computed from countCitationRefs(kept), not total - dropped.length.
  const index = makeIndex(['server/auth/AuthService.ts']);
  const prose = makeProse({
    'Mixed Line Chapter': [
      'AuthService and Ghost are related.',
      'Sources: server/auth/AuthService.ts:L10-L50, server/ghost/Ghost.ts:L1-L5',
    ].join('\n'),
  });

  const result = verifyCitations(prose, index);

  const ch = result.perChapter[0];
  assert.equal(ch.chapter, 'Mixed Line Chapter');
  // Both refs are on one Sources: line; the whole line is dropped because Ghost.ts is bad.
  // valid = 0 (the AuthService ref did NOT survive into kept text).
  assert.equal(ch.valid, 0, 'valid should be 0 — entire Sources: line was dropped including the good ref');
  // citations: both refs were counted in the original text
  assert.equal(ch.citations, 2, 'citations should count both refs on the Sources: line');
  assert.ok(ch.invalid.length > 0, 'should have at least 1 invalid entry');
});
