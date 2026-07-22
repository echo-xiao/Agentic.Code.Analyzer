import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDirectedAdjacency, walkFromSeed, type WalkCtx } from '../../../../src/server/engine/walker/walk.js';
import { scoreString } from '../../../../src/server/engine/walker/affinity.js';

// synthetic graph: pushSend --calls--> pushQueue --calls--> pushGateway; adminPage --calls--> pushSend
// callGraph shape Map<callee, [{caller}]>
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

test('buildDirectedAdjacency: down = caller→callee, up = callee→caller', () => {
    const adj = buildDirectedAdjacency(CALL_GRAPH);
    assert.deepEqual([...adj.down.get('pushSend')!], ['pushQueue']);
    assert.deepEqual([...adj.up.get('pushQueue')!], ['pushSend']);
});

test('walkFromSeed: each round records the three-direction options + chosen + reason', () => {
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

test('walk down: the push-related callee has higher affinity than the up-direction adminPage', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.equal(rounds[0].chosen, 'down');
    assert.ok(rounds[0].result!.newFiles.includes('server/pushQueue.ts'));
});

test('marginal-exhaustion stop: after the graph is fully walked, the stop reason records marginal exhaustion', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    const last = rounds[rounds.length - 1];
    assert.equal(last.chosen, null);
    assert.ok(last.reason.includes('stop'));
});

test('deterministic: the same input yields deeply equal results twice', () => {
    const a = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    const b = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.deepEqual(a, b);
});

test('entity-wise affinity: a symbol and its file take the highest score as that entity score, avoiding double-count', () => {
    const rounds = walkFromSeed('pushSend', ctx, ['push'], { minNewFiles: 1 });
    assert.ok(rounds.length > 0, 'there should be at least one round');
    const r1 = rounds[0];

    // down should be the best choice (compared to up and expand)
    assert.equal(r1.chosen, 'down', 'down should be the chosen direction');
    assert.ok(
        r1.options.down.affinity > r1.options.up.affinity,
        `down.affinity ${r1.options.down.affinity} should be higher than up.affinity ${r1.options.up.affinity}`
    );

    // verify pushQueue and its file use the entity-wise max score, not a mixed pool
    // pushQueue symbol score = 0.895, server/pushQueue.ts file score = 0.824, entity max = 0.895
    const pushQueueScore = scoreString(['push'], 'pushQueue');
    const pushQueueFileScore = scoreString(['push'], 'server/pushQueue.ts');
    const expectedEntityScore = Math.max(pushQueueScore, pushQueueFileScore);
    const expectedAfinityRounded = Number(expectedEntityScore.toFixed(3));

    assert.equal(
        r1.options.down.affinity,
        expectedAfinityRounded,
        `down.affinity ${r1.options.down.affinity} should equal entity-wise max(${pushQueueScore.toFixed(3)}, ${pushQueueFileScore.toFixed(3)}) = ${expectedAfinityRounded}`
    );
});

test('isolated seed: round 1 has all three directions empty, stops immediately', () => {
    const rounds = walkFromSeed('lonelySymbol', ctx, ['push'], { minNewFiles: 1 });
    assert.equal(rounds.length, 1);
    assert.equal(rounds[0].chosen, null);
    assert.ok(rounds[0].reason.includes('stop'));
    for (const m of ['expand', 'down', 'up'] as const) assert.equal(rounds[0].options[m].newFiles, 0);
});
