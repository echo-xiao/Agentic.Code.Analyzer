// src/indexer/modulegraph.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clusterModules, assignAnchor, stableId } from './modulegraph.js';

test('clusterModules: 两个稠密团被分成两个社区', () => {
    // 团A: a1-a2-a3 互连; 团B: b1-b2-b3 互连; 团间仅一条弱边
    const edges: Array<[string, string, number]> = [
        ['a1', 'a2', 5], ['a2', 'a3', 5], ['a1', 'a3', 5],
        ['b1', 'b2', 5], ['b2', 'b3', 5], ['b1', 'b3', 5],
        ['a1', 'b1', 1],
    ];
    const nodes = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3'];
    const comms = clusterModules({ nodes, edges });
    assert.equal(comms.length, 2, `应 2 个社区,实际 ${comms.length}`);
    const sizes = comms.map(c => c.files.length).sort();
    assert.deepEqual(sizes, [3, 3]);
});

test('assignAnchor: 取 fan-in 最高的文件', () => {
    const anchor = assignAnchor(['x.ts', 'y.ts', 'z.ts'], new Map([['x.ts', 2], ['y.ts', 9], ['z.ts', 1]]));
    assert.equal(anchor, 'y.ts');
});

test('stableId: 成员大幅重叠 → 继承旧 id', () => {
    const prev = [{ id: 'mod:livechat', files: ['a.ts', 'b.ts', 'c.ts'] }];
    const id = stableId(['a.ts', 'b.ts', 'd.ts'], prev as any, 'a.ts'); // 2/4 交并=0.5
    assert.equal(id, 'mod:livechat');
});
test('stableId: 无重叠 → 用 anchor 派生新 id', () => {
    const prev = [{ id: 'mod:livechat', files: ['a.ts'] }];
    const id = stableId(['x.ts', 'y.ts'], prev as any, 'apps/z/PushService.ts');
    assert.equal(id, 'mod:PushService');
});
