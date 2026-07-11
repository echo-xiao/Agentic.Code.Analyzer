/**
 * retrieval-context.test.ts — fixture-based unit tests for buildChapterContext.
 *
 * Populates a tiny GLOBAL_INDEX in memory (no ensureIndex(), no real data files).
 * Cleans up GLOBAL_INDEX state after each test.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { buildChapterContext, type RetrievalDeps } from './retrieval-context.js';
import type { WikiPage } from '../wikimap/schema.js';

// ── Fixtures ───────────────────────────────────────────────────────────────────

// We use absolute-like paths matching the "Rocket.Chat/" split convention
// so relPath() returns something meaningful.
const ROOT = '/repo/Rocket.Chat';
const fileA = `${ROOT}/server/auth/AuthService.ts`;
const fileB = `${ROOT}/server/auth/TokenManager.ts`;
const fileC = `${ROOT}/server/users/UserService.ts`;

function resetIndex() {
  GLOBAL_INDEX.symbols.clear();
  GLOBAL_INDEX.fileDependents.clear();
  GLOBAL_INDEX.allFiles.clear();
  GLOBAL_INDEX.callGraph.clear();
  // Also clear the cached adjacency in expand.ts by resetting the module-level cache.
  // expandNeighborhood's NEIGHBORS/TYPED_NEIGHBORS are lazily rebuilt from callGraph,
  // so clearing callGraph is sufficient for isolation (they rebuild on next call).
}

function buildFixturePage(overrides: Partial<WikiPage> = {}): WikiPage {
  return {
    id: 'auth-system',
    title: 'Authentication System',
    category: 'Core Services',
    scope: 'Covers AuthService, token management, and user login flows',
    modules: ['auth', 'users'],
    seedFiles: [fileA],
    page: 'Authentication System',
    sections: [],
    diagrams: [],
    source_files: {},
    ...overrides,
  };
}

function buildDeps(overrides: Partial<RetrievalDeps> = {}): RetrievalDeps {
  return {
    fileSummaries: {
      'server/auth/AuthService.ts': { ranking_line: 'Handles authentication lifecycle' },
      'server/auth/TokenManager.ts': { ranking_line: 'Issues and validates JWT tokens' },
      'server/users/UserService.ts': { ranking_line: 'User CRUD and profile management' },
    },
    moduleSummaries: {
      auth: 'Authentication and session management',
      users: 'User management subsystem',
    },
    lineOf: (sym: string) => {
      const lineMap: Record<string, number> = {
        AuthService: 10,
        TokenManager: 5,
        UserService: 3,
      };
      return lineMap[sym] ?? 1;
    },
    ...overrides,
  };
}

// ── Test 1: seedSymbols carry path and line ───────────────────────────────────

test('buildChapterContext: seedSymbols carry path and line', () => {
  resetIndex();

  GLOBAL_INDEX.allFiles.add(fileA);
  GLOBAL_INDEX.allFiles.add(fileB);
  GLOBAL_INDEX.symbols.set('AuthService', new Set([fileA]));
  GLOBAL_INDEX.symbols.set('TokenManager', new Set([fileB]));
  GLOBAL_INDEX.fileDependents.set(fileA, new Set([fileB]));
  GLOBAL_INDEX.callGraph.set('TokenManager', [{ caller: 'AuthService', file: fileA, edgeType: 'call' }]);

  const page = buildFixturePage();
  const deps = buildDeps();
  const ctx = buildChapterContext(page, deps);

  assert.ok(ctx.seedSymbols.length > 0, 'should have at least one seed symbol');
  for (const s of ctx.seedSymbols) {
    assert.ok(typeof s.name === 'string' && s.name.length > 0, 'seed symbol must have name');
    assert.ok(typeof s.path === 'string' && s.path.length > 0, `seed symbol ${s.name} must have path`);
    assert.ok(typeof s.line === 'number' && s.line >= 1, `seed symbol ${s.name} must have line >= 1`);
    assert.ok(s.path.includes('/'), `seed symbol path should look like a file path: ${s.path}`);
  }

  resetIndex();
});

// ── Test 2: candidates carry path and lines ───────────────────────────────────

test('buildChapterContext: candidates carry path and lines', () => {
  resetIndex();

  GLOBAL_INDEX.allFiles.add(fileA);
  GLOBAL_INDEX.allFiles.add(fileB);
  GLOBAL_INDEX.allFiles.add(fileC);
  GLOBAL_INDEX.symbols.set('AuthService', new Set([fileA]));
  GLOBAL_INDEX.symbols.set('TokenManager', new Set([fileB]));
  GLOBAL_INDEX.symbols.set('UserService', new Set([fileC]));
  GLOBAL_INDEX.callGraph.set('TokenManager', [{ caller: 'AuthService', file: fileA, edgeType: 'call' }]);
  GLOBAL_INDEX.callGraph.set('UserService', [{ caller: 'TokenManager', file: fileB, edgeType: 'call' }]);

  const page = buildFixturePage();
  const deps = buildDeps();
  const ctx = buildChapterContext(page, deps);

  assert.ok(ctx.candidates.length > 0, 'should have at least one candidate');
  for (const c of ctx.candidates) {
    assert.ok(typeof c.path === 'string' && c.path.length > 0, 'candidate must have path');
    assert.ok(typeof c.lines === 'string' && c.lines.length > 0, 'candidate must have lines');
    assert.ok(c.lines.startsWith('L'), `candidate lines should start with L: ${c.lines}`);
  }

  resetIndex();
});

// ── Test 3: seedSymbols are deduped ──────────────────────────────────────────

test('buildChapterContext: seedSymbols are deduped', () => {
  resetIndex();

  // Same symbol appears in two files (collision) — should appear only once
  const fileDup = `${ROOT}/server/auth/AuthServiceImpl.ts`;
  GLOBAL_INDEX.allFiles.add(fileA);
  GLOBAL_INDEX.allFiles.add(fileDup);
  // AuthService appears in both files
  GLOBAL_INDEX.symbols.set('AuthService', new Set([fileA, fileDup]));

  const page = buildFixturePage({ seedFiles: [fileA, fileDup] });
  const deps = buildDeps();
  const ctx = buildChapterContext(page, deps);

  const names = ctx.seedSymbols.map(s => s.name);
  const uniqueNames = new Set(names);
  assert.equal(names.length, uniqueNames.size, 'seedSymbols must be deduped by name');

  resetIndex();
});

// ── Test 4: candidates capped at MAX_CANDIDATES (40) ─────────────────────────

test('buildChapterContext: candidates capped at 40', () => {
  resetIndex();

  // Create 60 files all connected to seed
  const seed = 'HubService';
  const seedFile = `${ROOT}/server/hub/HubService.ts`;
  GLOBAL_INDEX.allFiles.add(seedFile);
  GLOBAL_INDEX.symbols.set(seed, new Set([seedFile]));

  const callers: Array<{ caller: string; file: string; edgeType: 'call' }> = [];
  for (let i = 0; i < 60; i++) {
    const sym = `Caller${i}`;
    const f = `${ROOT}/server/callers/Caller${i}.ts`;
    GLOBAL_INDEX.allFiles.add(f);
    GLOBAL_INDEX.symbols.set(sym, new Set([f]));
    callers.push({ caller: sym, file: f, edgeType: 'call' });
  }
  GLOBAL_INDEX.callGraph.set(seed, callers);

  const page = buildFixturePage({ seedFiles: [seedFile], modules: [] });
  const deps = buildDeps({ moduleSummaries: null, fileSummaries: null });
  const ctx = buildChapterContext(page, deps);

  assert.ok(ctx.candidates.length <= 40, `candidates should be capped at 40, got ${ctx.candidates.length}`);

  resetIndex();
});

// ── Test 5: moduleSummaries injected correctly ────────────────────────────────

test('buildChapterContext: moduleSummaries come from injected deps', () => {
  resetIndex();

  GLOBAL_INDEX.allFiles.add(fileA);
  GLOBAL_INDEX.symbols.set('AuthService', new Set([fileA]));

  const page = buildFixturePage();
  const deps = buildDeps({
    moduleSummaries: {
      auth: 'Auth module summary',
      users: 'Users module summary',
    },
  });
  const ctx = buildChapterContext(page, deps);

  assert.equal(ctx.moduleSummaries['auth'], 'Auth module summary');
  assert.equal(ctx.moduleSummaries['users'], 'Users module summary');

  resetIndex();
});

// ── Test 6: no crash with empty seedFiles ─────────────────────────────────────

test('buildChapterContext: graceful with empty seedFiles', () => {
  resetIndex();

  const page = buildFixturePage({ seedFiles: [] });
  const deps = buildDeps();
  const ctx = buildChapterContext(page, deps);

  // Should not throw, just return empty collections
  assert.ok(Array.isArray(ctx.seedSymbols));
  assert.ok(Array.isArray(ctx.candidates));
  assert.equal(ctx.seedSymbols.length, 0);

  resetIndex();
});
