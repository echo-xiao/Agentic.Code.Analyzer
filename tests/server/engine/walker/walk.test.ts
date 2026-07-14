import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDirectedAdjacency, walkFromSeed, type WalkCtx } from '../../../../src/server/engine/walker/walk.js';
import { scoreString } from '../../../../src/server/engine/walker/affinity.js';

// 合成图：pushSend --calls--> pushQueue --calls--> pushGateway；adminPage --calls--> pushSend
// callGraph 形态 Map<callee, [{caller}]>
const CALL_GRAPH = new Map([
    ['pushQueue',   [{ caller: 'pushSend' }]],
    ['pushGateway', [{ caller: 'pushQueue' }]],
    ['pushSend',    [{ caller: 'adminPage' }]],
]);
const FILES: Record<string, string[]> = {
    pushSend: ['server/pushSend.ts'], pushQueue: ['server/pushQueue.ts'],
    pushGateway: ['server/pushGateway.ts'], adminPage: ['client/adminPage.tsx'],
};
const ctx: WalkCtx = {
    adj: buildDirectedAdjacency(CALL_GRAPH),
    filesOf: s => FILES[s] ?? [],
    symbolsOfFile: f => Object.entries(FILES).filter(([, fs]) => fs.includes(f)).map(([s]) => s),
};

test('buildDirectedAdjacency：down = caller→callee，up = callee→caller', () => {
    const adj = buildDirectedAdjacency(CALL_GRAPH);
    assert.deepEqual([...adj.down.get('pushSend')!], ['pushQueue']);
    assert.deepEqual([...adj.up.get('pushQueue')!], ['pushSend']);
});

test('walkFromSeed：每轮记录三方向 options + chosen + reason', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.ok(rounds.length >= 1);
    const r1 = rounds[0];
    assert.equal(r1.anchor, 'pushSend');
    for (const m of ['expand', 'down', 'up'] as const) {
        assert.ok(m in r1.options);
        assert.ok(typeof r1.options[m].affinity === 'number');
    }
    assert.ok(r1.reason.includes('affinity') || r1.reason.startsWith('stop'));
});

test('走 down：push 相关的 callee 亲和度高于 up 的 adminPage', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.equal(rounds[0].chosen, 'down');
    assert.ok(rounds[0].result!.newFiles.includes('server/pushQueue.ts'));
});

test('边际枯竭停止：图走完后 stop reason 记边际枯竭', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    const last = rounds[rounds.length - 1];
    assert.equal(last.chosen, null);
    assert.ok(last.reason.includes('stop'));
});

test('确定性：同输入两次结果深度相等', () => {
    const a = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    const b = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.deepEqual(a, b);
});

test('entity-wise affinity：符号与其文件的最高分为该实体的分数，避免double-count', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.ok(rounds.length > 0, '应至少有一轮');
    const r1 = rounds[0];

    // down 的选择应是最优的（对比 up 和 expand）
    assert.equal(r1.chosen, 'down', 'down 应是选中方向');
    assert.ok(
        r1.options.down.affinity > r1.options.up.affinity,
        `down.affinity ${r1.options.down.affinity} 应高于 up.affinity ${r1.options.up.affinity}`
    );

    // 验证 pushQueue 和其文件采用 entity-wise 最高分，而非混池
    // pushQueue 符号分 = 0.895，server/pushQueue.ts 文件分 = 0.824，entity max = 0.895
    const pushQueueScore = scoreString(['push'], 'pushQueue');
    const pushQueueFileScore = scoreString(['push'], 'server/pushQueue.ts');
    const expectedEntityScore = Math.max(pushQueueScore, pushQueueFileScore);
    const expectedAfinityRounded = Number(expectedEntityScore.toFixed(3));

    assert.equal(
        r1.options.down.affinity,
        expectedAfinityRounded,
        `down.affinity ${r1.options.down.affinity} 应等于 entity-wise max(${pushQueueScore.toFixed(3)}, ${pushQueueFileScore.toFixed(3)}) = ${expectedAfinityRounded}`
    );
});

test('孤立种子：round 1 三方向全空，立即 stop', () => {
    const rounds = walkFromSeed('lonelySymbol', ctx, ['push'], { minNewFiles: 1 });
    assert.equal(rounds.length, 1);
    assert.equal(rounds[0].chosen, null);
    assert.ok(rounds[0].reason.includes('stop'));
    for (const m of ['expand', 'down', 'up'] as const) assert.equal(rounds[0].options[m].newFiles, 0);
});
