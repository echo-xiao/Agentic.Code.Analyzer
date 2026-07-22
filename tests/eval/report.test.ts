import { test } from 'node:test';
import assert from 'node:assert/strict';

import { fmtAgentCalls, stopLabel, pathEq, computeGold, traceDrift, roundCoreHits, firstCoreStep, semanticLabel, renderScope, renderWalk } from '../../src/eval/report.js';

// ── renderScope ──────────────────────────────────────────────────────────────
test('renderScope: chosen pages carry scores (taken from options), no longer repeating the reason string', () => {
    const tr = { pageStep: {
        options: [{ page: 'A', score: 0.78 }, { page: 'B', score: 0.6 }, { page: 'C', score: 0.5 }],
        chosen: ['A', 'B'],
        reason: 'top-3 lexical A:0.78/B:0.6',   // the old version pasted this string again
    } };
    const lines = renderScope(tr);
    assert.equal(lines[0], '**scope entry pages** (3 scored → 2 chosen)');
    assert.equal(lines[1], '- A `0.78`');
    assert.equal(lines[2], '- B `0.6`');
    assert.ok(!lines.join('\n').includes('top-3 lexical'), 'should not repeat the reason string');
});

test('renderScope: no chosen → falls back to symbol search', () => {
    const tr = { pageStep: { options: [{ page: 'A', score: 0.1 }], chosen: [] } };
    assert.equal(renderScope(tr)[0], '**scope entry pages** (1 scored → 0 chosen): (fell back to symbol search)');
});

// ── renderWalk ─────────────────────────────────────────────────────────────────
test('renderWalk: grouped by seed; top line does not pile up stop reasons; each group head carries steps + stop reason', () => {
    const tr = { walk: [
        { anchor: 'seedA', round: 1, chosen: null, reason: 'marginal exhaustion' },                          // seedA: 0 steps → exhausted
        { anchor: 'seedB', round: 1, chosen: 'x', reason: 'aff', result: { newFiles: ['a/core.ts'] } },      // seedB: 1 step (hits core)
        { anchor: 'seedB', round: 2, chosen: null, reason: 'budget exhausted' },                             // seedB → budget
    ] };
    const lines = renderWalk(tr, ['a/core.ts']);
    assert.equal(lines[0], '**walk** (2 seeds · 1 steps)');   // top line only seeds/steps
    assert.ok(!lines[0].includes('⏹'), 'top line no longer piles up stop reasons');
    assert.ok(lines.some(l => l === '- **seedA** · 0 steps · ⏹ exhausted'), 'seedA group head bullet');
    assert.ok(lines.some(l => l === '- **seedB** · 1 steps · ⏹ budget'), 'seedB group head bullet');
    assert.ok(lines.some(l => l.includes('R1 → `x`') && l.includes('aff')), 'R line carries affinity detail');
    assert.ok(lines.some(l => l.includes('reached 1 files') && l.includes('core hit 1⭐')), '↳ sub-item: reached + core hit⭐');
});

test('renderWalk: core hit carries short path to distinguish same-named files + retains affinity detail', () => {
    const tr = { walk: [
        { anchor: 's', round: 1, chosen: 'm', reason: 'affinity top 0.9 (expand)',
          result: { newFiles: ['x/functions/sendMessage.ts', 'x/methods/sendMessage.ts'] } },
    ] };
    const lines = renderWalk(tr, ['x/functions/sendMessage.ts', 'x/methods/sendMessage.ts']);
    const rline = lines.find(l => l.includes('R1'))!;
    assert.ok(rline.includes('affinity top 0.9 (expand)'), 'affinity on the R line');
    const coreLine = lines.find(l => l.includes('↳') && l.includes('core hit'))!;
    assert.ok(coreLine.includes('functions/sendMessage.ts') && coreLine.includes('methods/sendMessage.ts'), '↳ sub-item: short path distinguishes same-named files');
});

// ── stopLabel ──────────────────────────────────────────────────────────────────
test('stopLabel: maps known reason substrings; unknown → stop', () => {
    assert.equal(stopLabel('marginal exhaustion (relevance 0.1)'), 'exhausted');
    assert.equal(stopLabel('relevance decay'), 'decayed');
    assert.equal(stopLabel('budget exhausted'), 'budget');
    assert.equal(stopLabel('node cap triggered'), 'node-cap');
    assert.equal(stopLabel('no more symbols'), 'no-more');
    assert.equal(stopLabel('some other reason'), 'stop');
});

// ── pathEq ─────────────────────────────────────────────────────────────────────
test('pathEq: exact / suffix containment (both directions) / backslash normalization / unequal', () => {
    assert.equal(pathEq('a/b/c.ts', 'a/b/c.ts'), true);
    assert.equal(pathEq('repo/apps/x/send.ts', 'apps/x/send.ts'), true);   // a endsWith '/'+b
    assert.equal(pathEq('apps/x/send.ts', 'repo/apps/x/send.ts'), true);   // b endsWith '/'+a
    assert.equal(pathEq('a\\b\\c.ts', 'a/b/c.ts'), true);                   // backslash normalization
    assert.equal(pathEq('apps/x/send.ts', 'apps/x/recv.ts'), false);
});

// ── fmtAgentCalls ────────────────────────────────────────────────────────────
test('fmtAgentCalls: renders each call + collapses adjacent duplicates ×N', () => {
    const ac = {
        totalCalls: 5, hitBudget: false,
        sequence: [
            { step: 1, tool: 'plan', args: JSON.stringify({ intent: 'call-chain' }) },
            { step: 2, tool: 'search', args: JSON.stringify({ query: 'sendMessage', layer: 'server' }) },
            { step: 3, tool: 'graph', args: JSON.stringify({ move: 'down', query: 'sendMessage' }) },
            { step: 4, tool: 'details', args: JSON.stringify({ filename: 'apps/meteor/app/x/sendMessage.ts' }) },
            { step: 5, tool: 'details', args: JSON.stringify({ filename: 'apps/meteor/app/x/sendMessage.ts' }) },
        ],
    };
    const r = fmtAgentCalls(ac);
    assert.equal(r.calls, 5);
    assert.equal(r.hitBudget, false);
    assert.equal(
        r.sequence,
        'plan:call-chain  →  search:"sendMessage"·server  →  graph↓:sendMessage  →  details:sendMessage.ts ×2',
    );
});

test('fmtAgentCalls: empty/missing → (nothing), calls falls back to sequence length, hitBudget coerced to boolean', () => {
    assert.deepEqual(fmtAgentCalls(null), { calls: 0, sequence: '(nothing)', hitBudget: false });
    assert.deepEqual(fmtAgentCalls({ sequence: [] }), { calls: 0, sequence: '(nothing)', hitBudget: false });
    const r = fmtAgentCalls({ hitBudget: 1, sequence: [{ tool: 'search', args: '{"query":"x"}' }] });
    assert.equal(r.calls, 1);
    assert.equal(r.hitBudget, true);
    assert.equal(r.sequence, 'search:"x"');
});

// ── computeGold ────────────────────────────────────────────────────────────────
// wiki-map: file_to_pages values are page ids; pages give id→page (name). pageStep.chosen uses page names.
const WIKI_MAP = {
    pages: [
        { id: 'msg-core', page: 'Messaging Core', title: 'Messaging Core' },
        { id: 'ui', page: 'UI System', title: 'UI System' },
    ],
    file_to_pages: {
        'apps/x/sendMessage.ts': ['msg-core'],
        'apps/x/ui.tsx': ['ui'],
    },
};

test('computeGold: entryHit needs id→page-name normalization to hit (regression on the ID-vs-title bug)', () => {
    const tr = {
        pageStep: { chosen: ['Messaging Core'] },   // page name, not id
        seedStep: [{ page: 'Messaging Core', chosen: 'sendMessage', options: [{ symbol: 'sendMessage', file: 'apps/x/sendMessage.ts' }] }],
        walk: [],
    };
    const g = computeGold(tr, ['apps/x/sendMessage.ts'], WIKI_MAP);
    // gold file → file_to_pages=['msg-core'] → normalized to page name 'Messaging Core' → ∈ chosen → true.
    // Without normalization (comparing 'msg-core' to 'Messaging Core') → always false, this assertion fails → catches the fix.
    assert.equal(g.entryHit, true);
    assert.equal(g.reachGoldN, 1);   // seed file is the answer file
    assert.equal(g.coreN, 1);
});

test('computeGold: entryHit=false (gold page not in scope)', () => {
    const tr = { pageStep: { chosen: ['UI System'] }, seedStep: [], walk: [] };
    const g = computeGold(tr, ['apps/x/sendMessage.ts'], WIKI_MAP);
    assert.equal(g.entryHit, false);   // gold page 'Messaging Core' not in ['UI System']
});

test('computeGold: entryHit=null (answer file belongs to no page)', () => {
    const tr = { pageStep: { chosen: ['Messaging Core'] }, seedStep: [], walk: [] };
    const g = computeGold(tr, ['apps/unknown/nope.ts'], WIKI_MAP);
    assert.equal(g.entryHit, null);
});

test('computeGold: reachGoldN counts core hits within seed∪walk.newFiles', () => {
    const tr = {
        pageStep: { chosen: ['Messaging Core'] },
        seedStep: [{ page: 'Messaging Core', chosen: 'seed', options: [{ symbol: 'seed', file: 'apps/x/seed.ts' }] }],
        walk: [{ anchor: 'seed', round: 1, chosen: 'y', result: { newFiles: ['apps/x/sendMessage.ts'] } }],
    };
    const g = computeGold(tr, ['apps/x/sendMessage.ts', 'apps/x/missing.ts'], WIKI_MAP);
    assert.equal(g.reachGoldN, 1);   // sendMessage hit via walk; missing not reached
    assert.equal(g.coreN, 2);
});

// ── roundCoreHits ────────────────────────────────────────────────────────────
test('roundCoreHits: counts reached files + core hits (pathEq suffix match)', () => {
    const w = { result: { newFiles: ['apps/x/a.ts', 'repo/apps/x/sendMessage.ts', 'apps/x/b.ts'] } };
    const r = roundCoreHits(w, ['apps/x/sendMessage.ts', 'apps/x/missing.ts']);
    assert.equal(r.reached, 3);
    assert.deepEqual(r.coreHits, ['apps/x/sendMessage.ts']);   // suffix-matches repo/.../sendMessage.ts
});

test('roundCoreHits: no result → reached 0, no hits', () => {
    const r = roundCoreHits({ chosen: 'x' }, ['apps/x/a.ts']);
    assert.equal(r.reached, 0);
    assert.deepEqual(r.coreHits, []);
});

// ── firstCoreStep ────────────────────────────────────────────────────────────
test('firstCoreStep: seed hits immediately → step 0', () => {
    const tr = { seedStep: [{ chosen: 'x', options: [{ symbol: 'x', file: 'apps/x/createRoom.ts' }] }], walk: [] };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: true, firstStep: 0 });
});

test('firstCoreStep: seed misses, walk hits on the 2nd move', () => {
    const tr = {
        seedStep: [{ chosen: 's', options: [{ symbol: 's', file: 'apps/x/seed.ts' }] }],
        walk: [
            { chosen: 'a', result: { newFiles: ['apps/x/nope.ts'] } },
            { chosen: 'b', result: { newFiles: ['apps/x/createRoom.ts'] } },
        ],
    };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: false, firstStep: 2 });
});

test('firstCoreStep: STOP rounds do not count as steps; never hit → null', () => {
    const tr = { seedStep: [], walk: [{ chosen: null, reason: 'budget' }, { chosen: 'a', result: { newFiles: ['x.ts'] } }] };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: false, firstStep: null });
});

// ── semanticLabel (Phase 2) ──────────────────────────────────────────────────
test('semanticLabel: PASS/PARTIAL/FAIL icon + mode/reason; missing → not run', () => {
    assert.match(semanticLabel({ verdict: 'PASS' }), /✓ PASS/);
    assert.equal(semanticLabel({ verdict: 'PARTIAL', mode: 'missing step', reason: 'x' }), '**Semantic**: ◐ PARTIAL — missing step — x');
    assert.match(semanticLabel({ verdict: 'FAIL' }), /✗ FAIL/);
    assert.equal(semanticLabel(undefined), '**Semantic**: not run');
    assert.equal(semanticLabel({}), '**Semantic**: not run');
});

// ── traceDrift ─────────────────────────────────────────────────────────────────
test('traceDrift: all hit → not stale; broad mismatch → stale', () => {
    const wm = { pages: [{ id: 'a', page: 'Alpha' }, { id: 'b', page: 'Beta' }] };
    assert.equal(traceDrift([{ pageStep: { chosen: ['Alpha', 'Beta'] } }], wm).stale, false);   // 2/2
    const d = traceDrift([{ pageStep: { chosen: ['Old1', 'Old2', 'Alpha'] } }], wm);             // 1/3 < 0.5
    assert.equal(d.stale, true);
    assert.equal(d.matched, 1);
    assert.equal(d.total, 3);
});
