import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankCandidates } from './entry-map.js';

test('rankCandidates：同为无名文件，发现轮次早的排前（逻辑链邻近主导）', () => {
    const r = rankCandidates([
        { f: 'server/zzz.ts', round: 4 },
        { f: 'server/apn.ts', round: 1 },
    ], ['push', 'notification']);
    assert.deepEqual(r, ['server/apn.ts', 'server/zzz.ts']);
});

test('rankCandidates：seed 自身文件(第0轮=2.0分)压过任何后轮文件', () => {
    const r = rankCandidates([
        { f: 'server/pushNotification.ts', round: 1 },   // 1.0 + 词面高
        { f: 'server/anything.ts', round: 0 },           // 2.0
    ], ['push', 'notification']);
    assert.equal(r[0], 'server/anything.ts');
});

test('rankCandidates：同轮次时词面分决胜', () => {
    const r = rankCandidates([
        { f: 'server/unrelated.ts', round: 1 },
        { f: 'server/pushConfig.ts', round: 1 },
    ], ['push']);
    assert.equal(r[0], 'server/pushConfig.ts');
});

test('rankCandidates：测试文件被剔除', () => {
    const r = rankCandidates([
        { f: 'apps/meteor/tests/end-to-end/api/push.ts', round: 0 },
        { f: 'src/foo.spec.ts', round: 0 },
        { f: 'server/push.ts', round: 2 },
    ], ['push']);
    assert.deepEqual(r, ['server/push.ts']);
});

test('rankCandidates：文件名无信号但摘要命中时，靠摘要排上来（方案2语义项）', () => {
    const summaries = { 'server/apn.ts': { hash: 'x', summary: 'Apple push notification delivery via APN tokens' } };
    const without = rankCandidates([
        { f: 'server/apn.ts', round: 2 },
        { f: 'server/zzz.ts', round: 1 },
    ], ['push', 'notification']);
    const withSum = rankCandidates([
        { f: 'server/apn.ts', round: 2 },
        { f: 'server/zzz.ts', round: 1 },
    ], ['push', 'notification'], summaries as any);
    assert.equal(without[0], 'server/zzz.ts');   // 无摘要: 轮次早者胜(词面都是0)
    assert.equal(withSum[0], 'server/apn.ts');   // 有摘要: 0.67+0.87 > 1.0+0
});

test('rankCandidates RRF: 语义强的文件靠语义上榜, 字面强的靠字面上榜', () => {
    // A: 字面命中(round近), 语义弱; B: 字面弱(round远), 语义强
    const items = [{ f: 'server/manualSelection.ts', round: 1 }, { f: 'server/RoutingManager.ts', round: 4 }, { f: 'server/noise.ts', round: 0 }];
    const q = Float32Array.from([1, 0]);
    const vecs: Record<string, Float32Array> = {
        'server/manualSelection.ts': Float32Array.from([0, 1]),  // 语义远
        'server/RoutingManager.ts': Float32Array.from([1, 0]),   // 语义近(=query)
        'server/noise.ts': Float32Array.from([0, 1]),
    };
    const sem = { queryVec: q, vecOf: (f: string) => vecs[f] ?? null };
    const ranked = rankCandidates(items.map(x => ({ ...x })), ['routing'], null,
        sem);
    // RoutingManager 靠语义 #1；不应被 round-0 的 noise 完全压死
    assert.ok(ranked.indexOf('server/RoutingManager.ts') < ranked.indexOf('server/noise.ts'),
        `RRF 应让语义强的 RoutingManager 排在 noise 前: ${ranked.join(',')}`);
});

test('rankCandidates: 无 sem 时退回当前 fuzzy 行为(向后兼容)', () => {
    const items = [{ f: 'a/x.ts', round: 2 }, { f: 'a/y.ts', round: 0 }];
    const ranked = rankCandidates(items, ['x'], null);
    assert.equal(ranked[0], 'a/y.ts');   // round0 邻近主导, 与改动前一致
});
