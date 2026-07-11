/**
 * outline.test.ts — fixture-based unit tests.
 * No API calls, no real data files.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateOutline, assembleWikiMap, deterministicFallback, type LLMPage, type ModuleGraphLike } from './outline.js';

// ── Fixture graph ─────────────────────────────────────────────────────────────

const FIXTURE_GRAPH: ModuleGraphLike = {
  modules: [
    {
      id: 'auth/core',
      entryFiles: ['packages/auth/src/index.ts'],
      files: ['packages/auth/src/index.ts', 'packages/auth/src/session.ts'],
    },
    {
      id: 'auth/oauth',
      entryFiles: ['packages/auth/src/oauth.ts'],
      files: ['packages/auth/src/oauth.ts'],
    },
    {
      id: 'messaging/send',
      entryFiles: ['apps/meteor/server/send.ts'],
      files: ['apps/meteor/server/send.ts', 'apps/meteor/server/send-utils.ts'],
    },
  ],
  file_to_module: {
    'packages/auth/src/index.ts': 'auth/core',
    'packages/auth/src/session.ts': 'auth/core',
    'packages/auth/src/oauth.ts': 'auth/oauth',
    'apps/meteor/server/send.ts': 'messaging/send',
    'apps/meteor/server/send-utils.ts': 'messaging/send',
  },
};

// ── validateOutline tests ─────────────────────────────────────────────────────

test('validateOutline: unknown module id → ok:false, unknownModules non-empty', () => {
  const pages = [
    { modules: ['auth/core', 'FAKE_MODULE_XYZ'] },
    { modules: ['auth/oauth', 'messaging/send'] },
  ];
  const result = validateOutline(pages, FIXTURE_GRAPH);
  assert.equal(result.ok, false);
  assert.ok(result.unknownModules.includes('FAKE_MODULE_XYZ'),
    'unknownModules should include the bogus id');
  assert.equal(result.unknownModules.length, 1);
});

test('validateOutline: uncovered module → ok:false, uncoveredModules non-empty', () => {
  // Only cover auth/core and auth/oauth, leave messaging/send uncovered
  const pages = [
    { modules: ['auth/core'] },
    { modules: ['auth/oauth'] },
    // messaging/send is missing
  ];
  const result = validateOutline(pages, FIXTURE_GRAPH);
  assert.equal(result.ok, false);
  assert.ok(result.uncoveredModules.includes('messaging/send'),
    'uncoveredModules should include messaging/send');
});

test('validateOutline: full coverage + all real modules → ok:true', () => {
  const pages = [
    { modules: ['auth/core', 'auth/oauth'] },
    { modules: ['messaging/send'] },
  ];
  const result = validateOutline(pages, FIXTURE_GRAPH);
  assert.equal(result.ok, true);
  assert.equal(result.unknownModules.length, 0);
  assert.equal(result.uncoveredModules.length, 0);
});

test('validateOutline: both unknown and uncovered → ok:false, both non-empty', () => {
  const pages = [
    { modules: ['auth/core', 'BOGUS_A'] },
    { modules: ['auth/oauth', 'BOGUS_B'] },
    // messaging/send uncovered
  ];
  const result = validateOutline(pages, FIXTURE_GRAPH);
  assert.equal(result.ok, false);
  assert.ok(result.unknownModules.length >= 2);
  assert.ok(result.uncoveredModules.includes('messaging/send'));
});

test('validateOutline: duplicate unknown ids deduplicated', () => {
  const pages = [
    { modules: ['auth/core', 'FAKE'] },
    { modules: ['auth/oauth', 'FAKE'] },   // FAKE appears twice
    { modules: ['messaging/send'] },
  ];
  const result = validateOutline(pages, FIXTURE_GRAPH);
  assert.equal(result.ok, false);
  // FAKE should appear only once in unknownModules
  assert.equal(result.unknownModules.filter(x => x === 'FAKE').length, 1);
});

// ── assembleWikiMap tests ─────────────────────────────────────────────────────

const GOOD_LLM_PAGES: LLMPage[] = [
  {
    id: 'authentication',
    title: 'Authentication',
    category: 'Core Services',
    scope: 'Covers login, session management, and OAuth flows.',
    modules: ['auth/core', 'auth/oauth'],
  },
  {
    id: 'messaging',
    title: 'Messaging',
    category: 'Core Features',
    scope: 'Covers message sending and delivery pipeline.',
    modules: ['messaging/send'],
  },
];

test('assembleWikiMap: page === title (convention)', () => {
  const wikiMap = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  for (const p of wikiMap.pages) {
    assert.equal(p.page, p.title, `page should equal title for page ${p.id}`);
  }
});

test('assembleWikiMap: seedFiles from module entryFiles (deduped)', () => {
  const wikiMap = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  const authPage = wikiMap.pages.find(p => p.id === 'authentication')!;
  assert.ok(authPage, 'authentication page should exist');
  // entryFiles of auth/core + auth/oauth
  assert.ok(authPage.seedFiles.includes('packages/auth/src/index.ts'));
  assert.ok(authPage.seedFiles.includes('packages/auth/src/oauth.ts'));
  // No duplicates
  const seen = new Set(authPage.seedFiles);
  assert.equal(seen.size, authPage.seedFiles.length);
});

test('assembleWikiMap: sections/diagrams/source_files initialized empty', () => {
  const wikiMap = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  for (const p of wikiMap.pages) {
    assert.deepEqual(p.sections, []);
    assert.deepEqual(p.diagrams, []);
    assert.deepEqual(p.source_files, {});
  }
});

test('assembleWikiMap: file_to_pages only contains real graph files', () => {
  const wikiMap = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  const realFiles = new Set(Object.keys(FIXTURE_GRAPH.file_to_module));
  for (const file of Object.keys(wikiMap.file_to_pages)) {
    assert.ok(realFiles.has(file), `file_to_pages key ${file} not in graph`);
  }
});

test('assembleWikiMap: file_to_pages maps each file to the correct page', () => {
  const wikiMap = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  const ftp = wikiMap.file_to_pages;

  // auth/core files → authentication page
  assert.ok(ftp['packages/auth/src/index.ts']?.includes('authentication'),
    'auth/core entry file should map to authentication page');
  assert.ok(ftp['packages/auth/src/session.ts']?.includes('authentication'),
    'auth/core member file should map to authentication page');

  // auth/oauth files → authentication page
  assert.ok(ftp['packages/auth/src/oauth.ts']?.includes('authentication'),
    'auth/oauth file should map to authentication page');

  // messaging files → messaging page
  assert.ok(ftp['apps/meteor/server/send.ts']?.includes('messaging'),
    'messaging/send entry file should map to messaging page');
  assert.ok(ftp['apps/meteor/server/send-utils.ts']?.includes('messaging'),
    'messaging/send member file should map to messaging page');
});

test('assembleWikiMap: file_to_pages is deterministic (sorted keys)', () => {
  const wikiMap1 = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  const wikiMap2 = assembleWikiMap(GOOD_LLM_PAGES, FIXTURE_GRAPH);
  assert.deepEqual(
    Object.keys(wikiMap1.file_to_pages),
    Object.keys(wikiMap2.file_to_pages),
    'file_to_pages keys should be in deterministic order',
  );
});

test('assembleWikiMap: unknown module ids in LLM pages are silently dropped from page.modules', () => {
  const pagesWithBogus: LLMPage[] = [
    { ...GOOD_LLM_PAGES[0], modules: ['auth/core', 'BOGUS_ID'] },
    GOOD_LLM_PAGES[1],
  ];
  const wikiMap = assembleWikiMap(pagesWithBogus, FIXTURE_GRAPH);
  const authPage = wikiMap.pages.find(p => p.id === 'authentication')!;
  assert.ok(!authPage.modules.includes('BOGUS_ID'),
    'BOGUS_ID should be dropped from page.modules');
  assert.ok(authPage.modules.includes('auth/core'));
});

// ── deterministicFallback tests ───────────────────────────────────────────────

test('deterministicFallback: post-fallback output passes validateOutline', () => {
  // llmPages with an unknown module id AND a real module left uncovered
  const badPages: LLMPage[] = [
    {
      id: 'auth-page',
      title: 'Auth',
      category: 'Core',
      scope: 'Auth modules.',
      // auth/oauth is intentionally omitted (uncovered), GHOST is unknown
      modules: ['auth/core', 'GHOST_MODULE'],
    },
    // messaging/send is also omitted (uncovered)
  ];
  const result = deterministicFallback(badPages, FIXTURE_GRAPH);
  const validation = validateOutline(result, FIXTURE_GRAPH);
  assert.equal(validation.ok, true,
    `post-fallback pages should be valid; got: ${JSON.stringify(validation)}`);
});

test('assembleWikiMap: multi-page file_to_pages — file covered by two pages contains both ids', () => {
  // auth/core belongs to BOTH pages
  const overlapPages: LLMPage[] = [
    {
      id: 'auth-overview',
      title: 'Auth Overview',
      category: 'Core',
      scope: 'Overview of auth.',
      modules: ['auth/core'],
    },
    {
      id: 'auth-oauth',
      title: 'OAuth',
      category: 'Core',
      scope: 'OAuth details.',
      modules: ['auth/core', 'auth/oauth'],
    },
    {
      id: 'messaging',
      title: 'Messaging',
      category: 'Core',
      scope: 'Messaging.',
      modules: ['messaging/send'],
    },
  ];
  const wikiMap = assembleWikiMap(overlapPages, FIXTURE_GRAPH);
  // packages/auth/src/index.ts belongs to auth/core, which is in BOTH auth-overview and auth-oauth
  const pageIds = wikiMap.file_to_pages['packages/auth/src/index.ts'];
  assert.ok(Array.isArray(pageIds), 'file_to_pages entry should be an array');
  assert.ok(pageIds.includes('auth-overview'),
    'should include auth-overview page id');
  assert.ok(pageIds.includes('auth-oauth'),
    'should include auth-oauth page id');
});
