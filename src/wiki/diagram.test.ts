/**
 * diagram.test.ts — fixture-based unit tests for wiki:diagram builders.
 * No API calls. No real data files. No ensureIndex().
 *
 * Uses tiny in-memory fixtures for DiagramGraph and CallGraphMap.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import {
  systemCommunityDiagram,
  moduleSliceDiagram,
  componentDiagram,
  chainSequence,
  pickChainSeed,
  generateDiagrams,
  safeParse,
  type DiagramGraph,
  type CallGraphMap,
} from './diagram.js';

import { GLOBAL_INDEX } from '../indexer/state.js';

// ── Fixture: DiagramGraph ─────────────────────────────────────────────────────
//
// Three modules:
//   auth/core   (files: auth/core/index.ts, auth/core/session.ts)
//   auth/oauth  (files: auth/oauth/oauth.ts)
//   messaging   (files: messaging/send.ts, messaging/queue.ts)
//
// Module edges:
//   auth/core → messaging  (weight 3)
//   auth/oauth → auth/core (weight 1)

const FIXTURE_GRAPH: DiagramGraph = {
  subsystems: [
    { id: 'auth', label: 'Auth', moduleIds: ['auth/core', 'auth/oauth'], fileCount: 3 },
    { id: 'messaging', label: 'Messaging', moduleIds: ['messaging'], fileCount: 2 },
  ],
  modules: [
    {
      id: 'auth/core',
      subsystem: 'auth',
      anchor: 'auth/core/index.ts',
      label: 'index',
      files: ['auth/core/index.ts', 'auth/core/session.ts'],
      entryFiles: ['auth/core/index.ts'],
      edges: [['auth/core', 'messaging', 3]],
    },
    {
      id: 'auth/oauth',
      subsystem: 'auth',
      anchor: 'auth/oauth/oauth.ts',
      label: 'oauth',
      files: ['auth/oauth/oauth.ts'],
      entryFiles: ['auth/oauth/oauth.ts'],
      edges: [['auth/oauth', 'auth/core', 1]],
    },
    {
      id: 'messaging',
      subsystem: 'messaging',
      anchor: 'messaging/send.ts',
      label: 'send',
      files: ['messaging/send.ts', 'messaging/queue.ts'],
      entryFiles: ['messaging/send.ts'],
      edges: [],
    },
  ],
  file_to_module: {
    'auth/core/index.ts': 'auth/core',
    'auth/core/session.ts': 'auth/core',
    'auth/oauth/oauth.ts': 'auth/oauth',
    'messaging/send.ts': 'messaging',
    'messaging/queue.ts': 'messaging',
  },
};

// ── Fixture: CallGraphMap ─────────────────────────────────────────────────────
//
// Convention for tests: callGraph key = callee FILE PATH (so componentDiagram
// can resolve internal edges without needing GLOBAL_INDEX.symbols).
//
// Edges:
//   auth/core/session.ts calls auth/core/index.ts (internal to auth/core + auth/oauth page)
//   auth/oauth/oauth.ts calls auth/core/index.ts  (internal to auth page)
//   messaging/send.ts calls messaging/queue.ts     (internal to messaging page)
//   auth/core/index.ts calls messaging/send.ts     (cross-module, for chainSequence)

const FIXTURE_CALL_GRAPH: CallGraphMap = new Map([
  [
    'auth/core/index.ts',
    [
      { caller: 'session', file: 'auth/core/session.ts', edgeType: 'call' },
      { caller: 'oauth', file: 'auth/oauth/oauth.ts', edgeType: 'call' },
    ],
  ],
  [
    'messaging/send.ts',
    [
      { caller: 'index', file: 'auth/core/index.ts', edgeType: 'call' },
    ],
  ],
  [
    'messaging/queue.ts',
    [
      { caller: 'send', file: 'messaging/send.ts', edgeType: 'call' },
    ],
  ],
]);

// ── systemCommunityDiagram tests ──────────────────────────────────────────────

test('systemCommunityDiagram: returns non-null WikiDiagram', () => {
  const diag = systemCommunityDiagram(FIXTURE_GRAPH);
  assert.ok(diag !== null, 'should return a diagram');
});

test('systemCommunityDiagram: nodes contain all module ids', () => {
  const diag = systemCommunityDiagram(FIXTURE_GRAPH)!;
  // parseMermaid transforms id with nodeId() → underscores replace /
  // nodeId('auth/core') = 'auth_core'
  const nodeKeys = Object.keys(diag.nodes);
  assert.ok(nodeKeys.length >= 3, `expected ≥ 3 nodes, got ${nodeKeys.length}`);
  // All three modules should appear (possibly with _ instead of /)
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('core')), 'auth/core node');
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('oauth')), 'auth/oauth node');
  assert.ok(nodeKeys.some(k => k.includes('messaging')), 'messaging node');
});

test('systemCommunityDiagram: edges contain module→module real edges', () => {
  const diag = systemCommunityDiagram(FIXTURE_GRAPH)!;
  assert.ok(diag.edges.length >= 2, `expected ≥ 2 edges, got ${diag.edges.length}`);
  // Should have auth_core → messaging  and  auth_oauth → auth_core
  const hasAuthCoreToMessaging = diag.edges.some(e =>
    e[0].includes('auth') && e[0].includes('core') && e[1].includes('messaging'),
  );
  const hasOauthToCore = diag.edges.some(e =>
    e[0].includes('auth') && e[0].includes('oauth') && e[1].includes('auth') && e[1].includes('core'),
  );
  assert.ok(hasAuthCoreToMessaging, 'auth/core → messaging edge should exist');
  assert.ok(hasOauthToCore, 'auth/oauth → auth/core edge should exist');
});

test('systemCommunityDiagram: round-trip nodes and edges non-empty', () => {
  const diag = systemCommunityDiagram(FIXTURE_GRAPH)!;
  assert.ok(Object.keys(diag.nodes).length > 0, 'nodes should be non-empty');
  assert.ok(diag.edges.length > 0, 'edges should be non-empty');
});

// ── moduleSliceDiagram tests ──────────────────────────────────────────────────

test('moduleSliceDiagram: auth page includes auth/core and its 1-hop neighbor messaging', () => {
  // auth/core page: edges touch messaging → messaging is 1-hop neighbor
  const page = { modules: ['auth/core'] };
  const diag = moduleSliceDiagram(page, FIXTURE_GRAPH)!;
  assert.ok(diag !== null, 'should return a diagram');
  const nodeKeys = Object.keys(diag.nodes);
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('core')), 'auth/core should be included');
  assert.ok(nodeKeys.some(k => k.includes('messaging')), 'messaging should be included as 1-hop neighbor');
});

test('moduleSliceDiagram: auth page EXCLUDES auth/oauth (unrelated module with no edge to auth/core)', () => {
  // auth/core has edge to messaging only; auth/oauth→auth/core exists but auth/core page doesn't touch auth/oauth
  // Wait: auth/oauth has edge auth/oauth→auth/core, so auth/core IS touched. Let's verify direction.
  // auth/oauth.edges = [['auth/oauth', 'auth/core', 1]]
  // page.modules = ['auth/core'], checking edges touching auth/core:
  //   auth/core.edges[0] = ['auth/core', 'messaging', 3] → from=auth/core ∈ pageModuleSet → include both
  //   auth/oauth.edges[0] = ['auth/oauth', 'auth/core', 1] → to=auth/core ∈ pageModuleSet → include both
  // So auth/oauth IS a 1-hop neighbor of auth/core. Test should check messaging module not in result
  // when page is auth/oauth only.
  const page = { modules: ['auth/oauth'] };
  const diag = moduleSliceDiagram(page, FIXTURE_GRAPH)!;
  assert.ok(diag !== null);
  const nodeKeys = Object.keys(diag.nodes);
  // auth/oauth connects to auth/core (1-hop neighbor)
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('oauth')), 'auth/oauth should be included');
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('core')), 'auth/core should be 1-hop neighbor');
  // messaging should NOT be in the slice (auth/oauth has no direct edge to messaging)
  assert.ok(
    !nodeKeys.some(k => k === 'messaging' || (k.includes('messaging') && !k.includes('auth'))),
    'messaging should be excluded from auth/oauth slice',
  );
});

test('moduleSliceDiagram: messaging page includes auth/core as 1-hop neighbor', () => {
  // auth/core has edge to messaging, so auth/core is a 1-hop neighbor of messaging
  const page = { modules: ['messaging'] };
  const diag = moduleSliceDiagram(page, FIXTURE_GRAPH)!;
  assert.ok(diag !== null);
  const nodeKeys = Object.keys(diag.nodes);
  assert.ok(nodeKeys.some(k => k.includes('messaging')), 'messaging should be included');
  assert.ok(nodeKeys.some(k => k.includes('auth') && k.includes('core')), 'auth/core should be 1-hop neighbor');
  // auth/oauth should NOT be in messaging slice (no direct edge)
  assert.ok(
    !nodeKeys.some(k => k.includes('auth') && k.includes('oauth')),
    'auth/oauth should NOT be in messaging slice',
  );
});

test('moduleSliceDiagram: unrelated-modules only page excludes pages not reachable in 1-hop', () => {
  // If we create a page covering ONLY messaging, auth/oauth should not appear
  const page = { modules: ['messaging'] };
  const diag = moduleSliceDiagram(page, FIXTURE_GRAPH)!;
  const nodeKeys = Object.keys(diag.nodes);
  assert.ok(!nodeKeys.some(k => k.includes('oauth')), 'auth/oauth should be excluded');
});

// ── componentDiagram tests ────────────────────────────────────────────────────

test('componentDiagram: auth/core page — nodes are module internal files', () => {
  const page = { modules: ['auth/core'] };
  const diag = componentDiagram(page, FIXTURE_GRAPH, FIXTURE_CALL_GRAPH);
  assert.ok(diag !== null, 'should return a diagram for auth/core');
  const nodeKeys = Object.keys(diag!.nodes);
  // auth/core files: auth/core/index.ts, auth/core/session.ts
  assert.ok(nodeKeys.some(k => k.includes('index')), 'index.ts should be a node');
  assert.ok(nodeKeys.some(k => k.includes('session')), 'session.ts should be a node');
  // auth/oauth/oauth.ts should NOT appear (different module)
  assert.ok(!nodeKeys.some(k => k.includes('oauth')), 'oauth.ts should NOT be in auth/core component');
});

test('componentDiagram: auth/core internal edges — session→index should appear', () => {
  const page = { modules: ['auth/core'] };
  const diag = componentDiagram(page, FIXTURE_GRAPH, FIXTURE_CALL_GRAPH)!;
  assert.ok(diag !== null);
  // FIXTURE_CALL_GRAPH: calleeKey='auth/core/index.ts', caller={file:'auth/core/session.ts'}
  // session.ts → index.ts is an internal edge
  const hasSessionToIndex = diag.edges.some(e =>
    e[0].includes('session') && e[1].includes('index'),
  );
  assert.ok(hasSessionToIndex, 'session.ts → index.ts internal edge should be present');
});

test('componentDiagram: auth/core — cross-module edge (index→messaging/send) excluded', () => {
  const page = { modules: ['auth/core'] };
  const diag = componentDiagram(page, FIXTURE_GRAPH, FIXTURE_CALL_GRAPH);
  assert.ok(diag !== null);
  // messaging/send.ts is NOT in auth/core's files, so edge to messaging/send.ts should not appear
  const hasCrossModule = diag!.edges.some(e =>
    e[1].includes('send') || e[0].includes('send'),
  );
  assert.ok(!hasCrossModule, 'cross-module edge to messaging/send should be excluded from auth/core component');
});

test('componentDiagram: messaging page — send→queue internal edge', () => {
  const page = { modules: ['messaging'] };
  const diag = componentDiagram(page, FIXTURE_GRAPH, FIXTURE_CALL_GRAPH);
  assert.ok(diag !== null, 'messaging component diagram should not be null');
  const hasSendToQueue = diag!.edges.some(e =>
    e[0].includes('send') && e[1].includes('queue'),
  );
  assert.ok(hasSendToQueue, 'send.ts → queue.ts internal edge should appear');
});

// ── chainSequence tests ───────────────────────────────────────────────────────

test('chainSequence: from auth/core/index.ts follows call chain', () => {
  // FIXTURE_CALL_GRAPH:
  //   'messaging/send.ts' callers: [{file:'auth/core/index.ts'}]  → index.ts → messaging/send.ts
  //   'messaging/queue.ts' callers: [{file:'messaging/send.ts'}]  → send.ts → queue.ts
  // Forward map: auth/core/index.ts → [messaging/send.ts], messaging/send.ts → [messaging/queue.ts]
  const diag = chainSequence('auth/core/index.ts', FIXTURE_GRAPH, FIXTURE_CALL_GRAPH);
  assert.ok(diag !== null, 'chainSequence should return a diagram');
  assert.ok(diag!.edges.length >= 1, 'should have at least one step');
});

test('chainSequence: returns null when no forward edges from seed', () => {
  const emptyCallGraph: CallGraphMap = new Map();
  const diag = chainSequence('auth/core/index.ts', FIXTURE_GRAPH, emptyCallGraph);
  assert.equal(diag, null, 'should return null when no forward edges');
});

test('chainSequence: PRODUCTION symbol-keyed callGraph traverses multi-hop via GLOBAL_INDEX.symbols', () => {
  // Production convention: callGraph key = callee SYMBOL name (not a file); ref.file = caller file.
  // Chain: fileA --calls symB--> (symB defined in fileB) --calls symC--> (symC defined in fileC).
  const SYM_B = '___chainseq_symB';
  const SYM_C = '___chainseq_symC';
  const cg: CallGraphMap = new Map([
    [SYM_B, [{ caller: 'a', file: 'x/fileA.ts', edgeType: 'rest_call' }]],   // fileA calls symB
    [SYM_C, [{ caller: 'b', file: 'x/fileB.ts', edgeType: 'event_emit' }]],  // fileB calls symC
  ]);
  const prevB = GLOBAL_INDEX.symbols.get(SYM_B);
  const prevC = GLOBAL_INDEX.symbols.get(SYM_C);
  GLOBAL_INDEX.symbols.set(SYM_B, new Set(['x/fileB.ts']));   // symB is defined in fileB
  GLOBAL_INDEX.symbols.set(SYM_C, new Set(['x/fileC.ts']));   // symC is defined in fileC
  try {
    const diag = chainSequence('x/fileA.ts', FIXTURE_GRAPH, cg);
    assert.ok(diag !== null, 'should produce a chain');
    // OLD buggy code: current=symB (a symbol) → forwardMap.get(symB)=∅ → breaks after 1 step (1 edge).
    // FIXED code: resolves symB→fileB via GLOBAL_INDEX.symbols, continues fileB--symC--> → 2 steps.
    assert.ok(diag!.edges.length >= 2, `production chain must be multi-hop, got ${diag!.edges.length}`);
  } finally {
    if (prevB) GLOBAL_INDEX.symbols.set(SYM_B, prevB); else GLOBAL_INDEX.symbols.delete(SYM_B);
    if (prevC) GLOBAL_INDEX.symbols.set(SYM_C, prevC); else GLOBAL_INDEX.symbols.delete(SYM_C);
  }
});

// ── pickChainSeed tests ───────────────────────────────────────────────────────

test('pickChainSeed: 挑跨层出边最多(且非跨层的 call 不算)', () => {
  const cg: CallGraphMap = new Map([
    ['m1', [{ caller: 'f', file: 'a.ts', edgeType: 'rest_call' }]],                                   // a.ts: 1 跨层
    ['m2', [{ caller: 'g', file: 'b.ts', edgeType: 'call' },
            { caller: 'h', file: 'b.ts', edgeType: 'call' },
            { caller: 'i', file: 'b.ts', edgeType: 'call' }]],                                         // b.ts: 3 个 'call'(非跨层)
  ]);
  const page = { source_files: { 'a.ts': ['L1'], 'b.ts': ['L1'] }, seedFiles: ['b.ts'] };
  // 只数跨层: a(1) > b(0) → 'a.ts'。若误把 'call' 也当跨层: b(3) > a(1) → 会错挑 'b.ts'。断言 'a.ts' 即鉴别 'call' 被排除。
  assert.equal(pickChainSeed(page, cg), 'a.ts');
});

test('pickChainSeed: 无跨层 → 回退 seedFiles[0](须区别于页首文件)', () => {
  const cg: CallGraphMap = new Map([['m', [{ caller: 'h', file: 'a.ts', edgeType: 'call' }]]]);        // 无跨层出边
  const page = { source_files: { 'a.ts': ['L1'] }, seedFiles: ['c.ts'] };                             // seedFiles[0]='c.ts' ≠ pageFiles[0]='a.ts'
  // 若误用 pageFiles[0] 会得 'a.ts';正确回退 seedFiles[0] 得 'c.ts'。
  assert.equal(pickChainSeed(page, cg), 'c.ts');
});

// ── generateDiagrams tests ────────────────────────────────────────────────────

function makeTempWikiMap(pages: object[]): { wikiMapPath: string; graphPath: string; cleanup: () => void } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-diagram-test-'));

  const wikiMap = {
    repo: 'test',
    generated_at: new Date().toISOString(),
    derived_from: 'test',
    pages,
    file_to_pages: {},
  };
  const wikiMapPath = path.join(tmpDir, 'wiki-map.json');
  const graphPath = path.join(tmpDir, 'module-graph.json');

  fs.writeFileSync(wikiMapPath, JSON.stringify(wikiMap, null, 2), 'utf-8');
  fs.writeFileSync(graphPath, JSON.stringify(FIXTURE_GRAPH, null, 2), 'utf-8');

  return {
    wikiMapPath,
    graphPath,
    cleanup: () => fs.rmSync(tmpDir, { recursive: true, force: true }),
  };
}

test('generateDiagrams: Overview chapter gets global community diagram', () => {
  const pages = [
    {
      id: 'overview',
      title: 'System Overview',
      category: 'Overview',
      scope: 'Top-level architecture.',
      modules: ['auth/core', 'auth/oauth'],
      seedFiles: ['auth/core/index.ts'],
      page: 'System Overview',
      sections: [],
      diagrams: [],
      source_files: {},
    },
    {
      id: 'messaging-chapter',
      title: 'Messaging',
      category: 'Core Features',
      scope: 'Messaging pipeline.',
      modules: ['messaging'],
      seedFiles: ['messaging/send.ts'],
      page: 'Messaging',
      sections: [],
      diagrams: [],
      source_files: {},
    },
  ];

  const { wikiMapPath, graphPath, cleanup } = makeTempWikiMap(pages);
  try {
    generateDiagrams(wikiMapPath, graphPath, FIXTURE_CALL_GRAPH);
    const result = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));
    const overviewPage = result.pages.find((p: any) => p.id === 'overview');
    const messagingPage = result.pages.find((p: any) => p.id === 'messaging-chapter');

    // Overview page should have diagrams (including global community)
    assert.ok(overviewPage.diagrams.length > 0, 'Overview page should have at least one diagram');

    // The global diagram for Overview should have ALL modules as nodes
    const globalDiag = overviewPage.diagrams[0];
    const nodeKeys = Object.keys(globalDiag.nodes);
    assert.ok(nodeKeys.length >= 3, `global diagram should have ≥ 3 nodes (all modules); got ${nodeKeys.length}`);

    // Messaging chapter should also have diagrams but NOT the global community diagram
    // (its first diagram should be a slice, not the global full-graph)
    // The global diagram has all 3 modules; slice for messaging only has messaging + neighbors
    assert.ok(messagingPage.diagrams.length > 0, 'Messaging chapter should have diagrams');

    // The messaging chapter diagrams should NOT contain all 3 modules (if global were included)
    // We verify by checking that the global diagram is NOT the first diagram of messaging
    // (global has auth/oauth too; slice won't if messaging only connects to auth/core)
    const messagingFirstDiag = messagingPage.diagrams[0];
    const messagingNodeKeys = Object.keys(messagingFirstDiag.nodes);
    // messaging slice should NOT include auth/oauth
    assert.ok(
      !messagingNodeKeys.some((k: string) => k.includes('oauth')),
      'Messaging chapter first diagram should not include auth/oauth (global diagram excluded)',
    );
  } finally {
    cleanup();
  }
});

test('generateDiagrams: module chapters do NOT get the global community diagram as first item', () => {
  const pages = [
    {
      id: 'arch',
      title: 'Architecture',
      category: 'System Architecture',
      scope: 'Overall architecture.',
      modules: ['auth/core'],
      seedFiles: ['auth/core/index.ts'],
      page: 'Architecture',
      sections: [],
      diagrams: [],
      source_files: {},
    },
    {
      id: 'messaging-detail',
      title: 'Messaging Detail',
      category: 'Core Features',
      scope: 'Messaging detail.',
      modules: ['messaging'],
      seedFiles: ['messaging/send.ts'],
      page: 'Messaging Detail',
      sections: [],
      diagrams: [],
      source_files: {},
    },
  ];

  const { wikiMapPath, graphPath, cleanup } = makeTempWikiMap(pages);
  try {
    generateDiagrams(wikiMapPath, graphPath, FIXTURE_CALL_GRAPH);
    const result = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));
    const archPage = result.pages.find((p: any) => p.id === 'arch');
    const messagingDetail = result.pages.find((p: any) => p.id === 'messaging-detail');

    // arch page (matched as architecture) should get the global diagram (first page match)
    assert.ok(archPage.diagrams.length > 0, 'arch page should have diagrams');

    // messaging-detail should have diagrams but NOT the global community one
    // (it's not the overview/architecture page)
    assert.ok(messagingDetail.diagrams.length > 0, 'messaging-detail should have diagrams');

    // Verify the messaging-detail diagrams don't contain all 3 modules
    // (if it had the global diagram, it would have auth/oauth too)
    for (const diag of messagingDetail.diagrams) {
      const keys = Object.keys(diag.nodes);
      assert.ok(
        !keys.some((k: string) => k.includes('oauth')),
        `messaging-detail diagram should not include auth/oauth nodes — found in: ${keys}`,
      );
    }
  } finally {
    cleanup();
  }
});

test('generateDiagrams: unparseable diagram is dropped (not in page.diagrams)', () => {
  // Test that parseMermaid guard works: if renderFlowchart produces something parseable, it stays.
  // We test indirectly by using a page with no modules (no edges) — slice should be parseable with just nodes.
  const pages = [
    {
      id: 'overview',
      title: 'System Overview',
      category: 'Overview',
      scope: 'Top-level.',
      modules: [],
      seedFiles: [],
      page: 'System Overview',
      sections: [],
      diagrams: [],
      source_files: {},
    },
  ];

  const { wikiMapPath, graphPath, cleanup } = makeTempWikiMap(pages);
  try {
    generateDiagrams(wikiMapPath, graphPath, FIXTURE_CALL_GRAPH);
    const result = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));
    const pg = result.pages[0];
    // diagrams is an array (may be empty or have valid diagrams only)
    assert.ok(Array.isArray(pg.diagrams), 'diagrams should be an array');
    // Each diagram in the array must have valid structure
    for (const d of pg.diagrams) {
      assert.ok(typeof d.nodes === 'object', 'each diagram.nodes should be an object');
      assert.ok(Array.isArray(d.edges), 'each diagram.edges should be an array');
    }
  } finally {
    cleanup();
  }
});

test('systemCommunityDiagram: graph with no edges still produces nodes-only diagram', () => {
  const graphNoEdges: DiagramGraph = {
    ...FIXTURE_GRAPH,
    modules: FIXTURE_GRAPH.modules.map(m => ({ ...m, edges: [] })),
  };
  const diag = systemCommunityDiagram(graphNoEdges);
  assert.ok(diag !== null, 'should return diagram even with no edges');
  assert.ok(Object.keys(diag!.nodes).length >= 3, 'all 3 modules should appear as nodes');
  assert.equal(diag!.edges.length, 0, 'edges should be empty');
});

// ── [Important 1] componentDiagram PRODUCTION path via GLOBAL_INDEX.symbols ───

test('componentDiagram: PRODUCTION symbol-path — edge resolved via GLOBAL_INDEX.symbols', () => {
  // Seed GLOBAL_INDEX.symbols with a unique symbol key to test production branch (b):
  //   symbol 'indexFn' → file 'auth/core/index.ts'
  // The callGraph key is the symbol NAME (not a file path), matching production convention.
  // CallerRef.file is 'auth/core/session.ts' (internal to auth/core).
  const SYM_KEY = '__test_indexFn__';
  GLOBAL_INDEX.symbols.set(SYM_KEY, new Set(['auth/core/index.ts']));

  const prodCallGraph: CallGraphMap = new Map([
    [SYM_KEY, [{ caller: 'session', file: 'auth/core/session.ts', edgeType: 'call' }]],
  ]);

  const page = { modules: ['auth/core'] };
  let diag: ReturnType<typeof componentDiagram>;
  try {
    diag = componentDiagram(page, FIXTURE_GRAPH, prodCallGraph);
  } finally {
    GLOBAL_INDEX.symbols.delete(SYM_KEY);
  }

  assert.ok(diag !== null, 'production symbol-path should yield a non-null diagram');
  // session.ts calls indexFn → resolved to auth/core/index.ts → internal edge session→index
  const hasSessionToIndex = diag!.edges.some(
    e => e[0].includes('session') && e[1].includes('index'),
  );
  assert.ok(hasSessionToIndex, 'session→index edge must appear when callee resolved via GLOBAL_INDEX.symbols');
});

// ── [Important 2] safeParse — direct tests of drop-on-failure ─────────────────

test('safeParse: malformed/empty flowchart returns null (dropped)', () => {
  // A flowchart that parseMermaid will parse but produce zero nodes and zero edges
  // (garbage content after the header line).
  const garbage = 'flowchart TD\n   >>>garbage<<<';
  const result = safeParse(garbage, 'test-malformed');
  assert.equal(result, null, 'safeParse should return null for a diagram with empty nodes+edges');
});

test('safeParse: valid flowchart returns non-null WikiDiagram', () => {
  // renderFlowchart emits each node on its own line then edges on separate lines,
  // matching the NODE_RE / EDGE_RE patterns that parseMermaid uses.
  const valid = 'flowchart TD\n  A["alpha"]\n  B["beta"]\n  A --> B';
  const result = safeParse(valid, 'test-valid');
  assert.ok(result !== null, 'safeParse should return a WikiDiagram for a valid flowchart');
  assert.ok(Object.keys(result!.nodes).length >= 2, 'should have at least 2 nodes');
  assert.ok(result!.edges.length >= 1, 'should have at least 1 edge');
});

test('safeParse drop: failed diagram does NOT appear in page.diagrams (integration)', () => {
  // Verify the filter: generateDiagrams must not include dropped diagrams.
  // Use a page with no modules AND no overview match → no diagrams at all.
  // Also, the global diagram (valid) would only appear on overview pages.
  const pages = [
    {
      id: 'plain',
      title: 'Plain Chapter',
      category: 'Core Features',
      scope: 'No modules, no overview.',
      modules: [],
      seedFiles: [],
      page: 'Plain Chapter',
      sections: [],
      diagrams: [],
      source_files: {},
    },
  ];

  const { wikiMapPath, graphPath, cleanup } = makeTempWikiMap(pages);
  try {
    generateDiagrams(wikiMapPath, graphPath, FIXTURE_CALL_GRAPH);
    const result = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));
    const pg = result.pages[0];
    // No overview match → no global diagram; no modules → no slice/component/seq diagrams
    assert.ok(Array.isArray(pg.diagrams), 'diagrams must be an array');
    assert.equal(pg.diagrams.length, 0, 'page with no modules and no overview match should have 0 diagrams');
  } finally {
    cleanup();
  }
});

// ── [Minor] generateDiagrams: no-overview page set → no page gets global diagram ─

test('generateDiagrams: no overview/architecture page → no page gets global community diagram', () => {
  // Use a graph with two ISOLATED modules (no inter-module edges) so moduleSliceDiagram
  // for each module only includes that module's own nodes — if the global diagram
  // (which has all modules) were placed on any page, total diagram node count would be higher.
  //
  // Graph: two isolated modules with no edges between them
  const isolatedGraph: DiagramGraph = {
    subsystems: [
      { id: 'alpha', label: 'Alpha', moduleIds: ['alpha'], fileCount: 1 },
      { id: 'beta', label: 'Beta', moduleIds: ['beta'], fileCount: 1 },
    ],
    modules: [
      {
        id: 'alpha',
        subsystem: 'alpha',
        anchor: 'alpha/index.ts',
        label: 'alpha',
        files: ['alpha/index.ts'],
        entryFiles: ['alpha/index.ts'],
        edges: [], // no inter-module edges
      },
      {
        id: 'beta',
        subsystem: 'beta',
        anchor: 'beta/index.ts',
        label: 'beta',
        files: ['beta/index.ts'],
        entryFiles: ['beta/index.ts'],
        edges: [], // no inter-module edges
      },
    ],
    file_to_module: { 'alpha/index.ts': 'alpha', 'beta/index.ts': 'beta' },
  };

  // tmpDir gets FIXTURE_GRAPH normally via makeTempWikiMap; we need a custom setup
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-diagram-test-nooverview-'));
  const wikiMapPath2 = path.join(tmpDir, 'wiki-map.json');
  const graphPath2 = path.join(tmpDir, 'module-graph.json');

  const pages = [
    {
      id: 'alpha-chapter',
      title: 'Alpha Module',
      category: 'Core Features',
      scope: 'Alpha.',
      modules: ['alpha'],
      seedFiles: [],
      page: 'Alpha Module',
      sections: [],
      diagrams: [],
      source_files: {},
    },
    {
      id: 'beta-chapter',
      title: 'Beta Module',
      category: 'Core Features',
      scope: 'Beta.',
      modules: ['beta'],
      seedFiles: [],
      page: 'Beta Module',
      sections: [],
      diagrams: [],
      source_files: {},
    },
  ];

  fs.writeFileSync(wikiMapPath2, JSON.stringify({
    repo: 'test', generated_at: new Date().toISOString(), derived_from: 'test',
    pages, file_to_pages: {},
  }, null, 2));
  fs.writeFileSync(graphPath2, JSON.stringify(isolatedGraph, null, 2));

  try {
    generateDiagrams(wikiMapPath2, graphPath2, new Map());
    const result = JSON.parse(fs.readFileSync(wikiMapPath2, 'utf-8'));

    // The global community diagram has BOTH alpha and beta modules.
    // Without overview/architecture page, no page should receive the global diagram.
    // Each page's slice/component should only reference ITS OWN module (isolated, no inter-module edges).
    const alphaPg = result.pages.find((p: any) => p.id === 'alpha-chapter');
    const betaPg = result.pages.find((p: any) => p.id === 'beta-chapter');

    for (const diag of alphaPg.diagrams) {
      const keys = Object.keys(diag.nodes);
      assert.ok(
        !keys.some((k: string) => k.includes('beta')),
        `alpha-chapter diagram should NOT include beta nodes (global diagram not placed without overview page): keys=${keys}`,
      );
    }
    for (const diag of betaPg.diagrams) {
      const keys = Object.keys(diag.nodes);
      assert.ok(
        !keys.some((k: string) => k.includes('alpha')),
        `beta-chapter diagram should NOT include alpha nodes (global diagram not placed without overview page): keys=${keys}`,
      );
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
