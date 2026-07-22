import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankCandidates } from '../../../src/server/engine/entry-map.js';

test('rankCandidates: for equally unnamed files, the earlier discovery round ranks first (logic-chain proximity dominates)', () => {
    const r = rankCandidates([
        { f: 'server/zzz.ts', round: 4 },
        { f: 'server/apn.ts', round: 1 },
    ], ['push', 'notification']);
    assert.deepEqual(r, ['server/apn.ts', 'server/zzz.ts']);
});

test('rankCandidates: the seed file itself (round 0 = 2.0 score) outranks any later-round file', () => {
    const r = rankCandidates([
        { f: 'server/pushNotification.ts', round: 1 },   // 1.0 + high lexical
        { f: 'server/anything.ts', round: 0 },           // 2.0
    ], ['push', 'notification']);
    assert.equal(r[0], 'server/anything.ts');
});

test('rankCandidates: within the same round, the lexical score decides', () => {
    const r = rankCandidates([
        { f: 'server/unrelated.ts', round: 1 },
        { f: 'server/pushConfig.ts', round: 1 },
    ], ['push']);
    assert.equal(r[0], 'server/pushConfig.ts');
});

test('rankCandidates: test files are excluded', () => {
    const r = rankCandidates([
        { f: 'apps/meteor/tests/end-to-end/api/push.ts', round: 0 },
        { f: 'src/foo.spec.ts', round: 0 },
        { f: 'server/push.ts', round: 2 },
    ], ['push']);
    assert.deepEqual(r, ['server/push.ts']);
});

test('rankCandidates: when the filename has no signal but the summary hits, the summary lifts it up (approach 2 semantic term)', () => {
    const summaries = { 'server/apn.ts': { hash: 'x', ranking_line: 'Apple push notification delivery via APN tokens' } };
    const without = rankCandidates([
        { f: 'server/apn.ts', round: 2 },
        { f: 'server/zzz.ts', round: 1 },
    ], ['push', 'notification']);
    const withSum = rankCandidates([
        { f: 'server/apn.ts', round: 2 },
        { f: 'server/zzz.ts', round: 1 },
    ], ['push', 'notification'], summaries as any);
    assert.equal(without[0], 'server/zzz.ts');   // no summary: earlier round wins (lexical is 0 for both)
    assert.equal(withSum[0], 'server/apn.ts');   // with summary: 0.67+0.87 > 1.0+0
});

test('rankCandidates RRF: semantically strong files rank via semantics, lexically strong files rank via lexical', () => {
    // A: lexical hit (near round), weak semantics; B: weak lexical (far round), strong semantics
    const items = [{ f: 'server/manualSelection.ts', round: 1 }, { f: 'server/RoutingManager.ts', round: 4 }, { f: 'server/noise.ts', round: 0 }];
    const q = Float32Array.from([1, 0]);
    const vecs: Record<string, Float32Array> = {
        'server/manualSelection.ts': Float32Array.from([0, 1]),  // semantically far
        'server/RoutingManager.ts': Float32Array.from([1, 0]),   // semantically near (= query)
        'server/noise.ts': Float32Array.from([0, 1]),
    };
    const sem = { queryVec: q, vecOf: (f: string) => vecs[f] ?? null };
    const ranked = rankCandidates(items.map(x => ({ ...x })), ['routing'], null,
        sem);
    // RoutingManager ranks #1 via semantics; it should not be completely buried by the round-0 noise
    assert.ok(ranked.indexOf('server/RoutingManager.ts') < ranked.indexOf('server/noise.ts'),
        `RRF should place the semantically strong RoutingManager before noise: ${ranked.join(',')}`);
});

test('rankCandidates: without sem, falls back to the current fuzzy behavior (backward compatible)', () => {
    const items = [{ f: 'a/x.ts', round: 2 }, { f: 'a/y.ts', round: 0 }];
    const ranked = rankCandidates(items, ['x'], null);
    assert.equal(ranked[0], 'a/y.ts');   // round-0 proximity dominates, consistent with before the change
});
