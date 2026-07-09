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
