/**
 * prebrief.test.ts — fixture-based unit tests (no real data, no API calls).
 * Uses a 2-subsystem / 3-module fixture graph.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrebriefFromGraph, type ModuleGraph } from './prebrief.js';

// ── Fixture ───────────────────────────────────────────────────────────────────

const FIXTURE_GRAPH: ModuleGraph = {
  subsystems: ['auth', 'messaging'],
  modules: [
    {
      id: 'auth/core',
      subsystem: 'auth',
      anchor: 'packages/auth/src/index.ts',
      label: 'core',
      files: ['packages/auth/src/index.ts', 'packages/auth/src/session.ts'],
      entryFiles: ['packages/auth/src/index.ts'],
      // auth/core is imported by messaging/send and messaging/queue → high fanIn
      edges: [
        ['auth/core', 'auth/oauth', 5],
      ],
    },
    {
      id: 'auth/oauth',
      subsystem: 'auth',
      anchor: 'packages/auth/src/oauth.ts',
      label: 'oauth',
      files: ['packages/auth/src/oauth.ts'],
      entryFiles: ['packages/auth/src/oauth.ts'],
      edges: [],
    },
    {
      id: 'messaging/send',
      subsystem: 'messaging',
      anchor: 'apps/meteor/server/send.ts',
      label: 'send',
      files: ['apps/meteor/server/send.ts', 'apps/meteor/server/send-utils.ts'],
      entryFiles: ['apps/meteor/server/send.ts'],
      // messaging/send imports auth/core (adds to auth/core's fanIn)
      edges: [
        ['messaging/send', 'auth/core', 20],
        ['messaging/send', 'auth/oauth', 3],
      ],
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

// ── Tests ─────────────────────────────────────────────────────────────────────

test('buildPrebriefFromGraph: subsystems structure', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });

  assert.equal(pb.repo, 'Rocket.Chat');
  // Two subsystems present
  assert.equal(pb.subsystems.length, 2);

  const authSys = pb.subsystems.find(s => s.subsystem === 'auth');
  assert.ok(authSys, 'auth subsystem should be present');
  assert.equal(authSys!.modules.length, 2);

  const messagingSys = pb.subsystems.find(s => s.subsystem === 'messaging');
  assert.ok(messagingSys, 'messaging subsystem should be present');
  assert.equal(messagingSys!.modules.length, 1);
});

test('buildPrebriefFromGraph: fanIn correctly derived from edges', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });

  const authSys = pb.subsystems.find(s => s.subsystem === 'auth')!;
  const authCore = authSys.modules.find(m => m.id === 'auth/core')!;
  const authOauth = authSys.modules.find(m => m.id === 'auth/oauth')!;

  // auth/core gets 20 from messaging/send
  assert.equal(authCore.fanIn, 20, 'auth/core fanIn should be 20');
  // auth/oauth gets 5 from auth/core + 3 from messaging/send = 8
  assert.equal(authOauth.fanIn, 8, 'auth/oauth fanIn should be 8');

  // Within auth subsystem, modules sorted by fanIn descending
  assert.ok(authSys.modules[0].fanIn >= authSys.modules[1].fanIn,
    'modules should be sorted descending by fanIn');
});

test('buildPrebriefFromGraph: entryFiles sorted by module fanIn descending (no duplicates)', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });

  // Top fanIn module is auth/core (20), then auth/oauth (8), then messaging/send (0)
  // entryFiles should start with auth/core's entryFiles
  assert.ok(pb.entryFiles.length > 0, 'entryFiles should not be empty');
  assert.equal(pb.entryFiles[0], 'packages/auth/src/index.ts',
    'first entry file should be from highest fan-in module');

  // No duplicates
  const seen = new Set(pb.entryFiles);
  assert.equal(seen.size, pb.entryFiles.length, 'entryFiles should have no duplicates');
});

test('buildPrebriefFromGraph: topGroups from /nonexistent is empty (graceful)', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });
  // /nonexistent doesn't exist → topGroups = []
  assert.ok(Array.isArray(pb.topGroups), 'topGroups should be an array');
  assert.equal(pb.topGroups.length, 0, 'topGroups should be empty for nonexistent repoRoot');
});

test('buildPrebriefFromGraph: hasConfig gracefully handles missing repoRoot', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });
  assert.equal(typeof pb.hasConfig.build, 'boolean');
  assert.equal(typeof pb.hasConfig.ci, 'boolean');
  // /nonexistent has no files → both false
  assert.equal(pb.hasConfig.build, false);
  assert.equal(pb.hasConfig.ci, false);
});

test('buildPrebriefFromGraph: each module has entryFiles array', () => {
  const pb = buildPrebriefFromGraph(FIXTURE_GRAPH, { repoRoot: '/nonexistent' });
  for (const sys of pb.subsystems) {
    for (const m of sys.modules) {
      assert.ok(Array.isArray(m.entryFiles), `${m.id} should have entryFiles array`);
    }
  }
});
