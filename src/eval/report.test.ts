import { test } from 'node:test';
import assert from 'node:assert/strict';

import { fmtAgentCalls, stopLabel, pathEq, computeGold, traceDrift, roundCoreHits, firstCoreStep } from './report.js';

// ── stopLabel ──────────────────────────────────────────────────────────────────
test('stopLabel: 已知 reason 子串映射；未知→stop', () => {
    assert.equal(stopLabel('边际枯竭（相关性 0.1）'), '枯竭');
    assert.equal(stopLabel('相关性衰减'), '衰减');
    assert.equal(stopLabel('预算用尽'), '预算');
    assert.equal(stopLabel('节点阀触发'), '节点');
    assert.equal(stopLabel('无可继续'), '无继续');
    assert.equal(stopLabel('some other reason'), 'stop');
});

// ── pathEq ─────────────────────────────────────────────────────────────────────
test('pathEq: 精确 / 后缀包含（双向）/ 反斜杠归一 / 不等', () => {
    assert.equal(pathEq('a/b/c.ts', 'a/b/c.ts'), true);
    assert.equal(pathEq('repo/apps/x/send.ts', 'apps/x/send.ts'), true);   // a endsWith '/'+b
    assert.equal(pathEq('apps/x/send.ts', 'repo/apps/x/send.ts'), true);   // b endsWith '/'+a
    assert.equal(pathEq('a\\b\\c.ts', 'a/b/c.ts'), true);                   // 反斜杠归一
    assert.equal(pathEq('apps/x/send.ts', 'apps/x/recv.ts'), false);
});

// ── fmtAgentCalls ────────────────────────────────────────────────────────────
test('fmtAgentCalls: 逐调渲染 + 相邻折叠 ×N', () => {
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

test('fmtAgentCalls: 空/缺 → (nothing)，calls 退回 sequence 长度，hitBudget 布尔化', () => {
    assert.deepEqual(fmtAgentCalls(null), { calls: 0, sequence: '(nothing)', hitBudget: false });
    assert.deepEqual(fmtAgentCalls({ sequence: [] }), { calls: 0, sequence: '(nothing)', hitBudget: false });
    const r = fmtAgentCalls({ hitBudget: 1, sequence: [{ tool: 'search', args: '{"query":"x"}' }] });
    assert.equal(r.calls, 1);
    assert.equal(r.hitBudget, true);
    assert.equal(r.sequence, 'search:"x"');
});

// ── computeGold ────────────────────────────────────────────────────────────────
// wiki-map: file_to_pages 值是页 id；pages 给 id→page(名字)。pageStep.chosen 用页名。
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

test('computeGold: entryHit 需 id→页名归一才命中（回归 ID-vs-title bug）', () => {
    const tr = {
        pageStep: { chosen: ['Messaging Core'] },   // 页名，非 id
        seedStep: [{ page: 'Messaging Core', chosen: 'sendMessage', options: [{ symbol: 'sendMessage', file: 'apps/x/sendMessage.ts' }] }],
        walk: [],
    };
    const g = computeGold(tr, ['apps/x/sendMessage.ts'], WIKI_MAP);
    // gold 文件 → file_to_pages=['msg-core'] → 归一到页名 'Messaging Core' → ∈ chosen → true。
    // 若不归一(拿 'msg-core' 比 'Messaging Core')→ 永假,本断言即失败 → 鉴别该修复。
    assert.equal(g.entryHit, true);
    assert.equal(g.reachGoldN, 1);   // seed 文件即答案文件
    assert.equal(g.coreN, 1);
});

test('computeGold: entryHit=false（gold 页不在 scope）', () => {
    const tr = { pageStep: { chosen: ['UI System'] }, seedStep: [], walk: [] };
    const g = computeGold(tr, ['apps/x/sendMessage.ts'], WIKI_MAP);
    assert.equal(g.entryHit, false);   // gold 页 'Messaging Core' 不在 ['UI System']
});

test('computeGold: entryHit=null（答案文件不属任何页）', () => {
    const tr = { pageStep: { chosen: ['Messaging Core'] }, seedStep: [], walk: [] };
    const g = computeGold(tr, ['apps/unknown/nope.ts'], WIKI_MAP);
    assert.equal(g.entryHit, null);
});

test('computeGold: reachGoldN 数 seed∪walk.newFiles 里命中的 core', () => {
    const tr = {
        pageStep: { chosen: ['Messaging Core'] },
        seedStep: [{ page: 'Messaging Core', chosen: 'seed', options: [{ symbol: 'seed', file: 'apps/x/seed.ts' }] }],
        walk: [{ anchor: 'seed', round: 1, chosen: 'y', result: { newFiles: ['apps/x/sendMessage.ts'] } }],
    };
    const g = computeGold(tr, ['apps/x/sendMessage.ts', 'apps/x/missing.ts'], WIKI_MAP);
    assert.equal(g.reachGoldN, 1);   // sendMessage 经 walk 命中；missing 没到
    assert.equal(g.coreN, 2);
});

// ── roundCoreHits ────────────────────────────────────────────────────────────
test('roundCoreHits: 数触达文件 + 命中的 core（pathEq 后缀匹配）', () => {
    const w = { result: { newFiles: ['apps/x/a.ts', 'repo/apps/x/sendMessage.ts', 'apps/x/b.ts'] } };
    const r = roundCoreHits(w, ['apps/x/sendMessage.ts', 'apps/x/missing.ts']);
    assert.equal(r.reached, 3);
    assert.deepEqual(r.coreHits, ['apps/x/sendMessage.ts']);   // 后缀匹配到 repo/.../sendMessage.ts
});

test('roundCoreHits: 无 result → reached 0、无命中', () => {
    const r = roundCoreHits({ chosen: 'x' }, ['apps/x/a.ts']);
    assert.equal(r.reached, 0);
    assert.deepEqual(r.coreHits, []);
});

// ── firstCoreStep ────────────────────────────────────────────────────────────
test('firstCoreStep: seed 即命中 → 第0步', () => {
    const tr = { seedStep: [{ chosen: 'x', options: [{ symbol: 'x', file: 'apps/x/createRoom.ts' }] }], walk: [] };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: true, firstStep: 0 });
});

test('firstCoreStep: seed 没中、walk 第2个 move 命中', () => {
    const tr = {
        seedStep: [{ chosen: 's', options: [{ symbol: 's', file: 'apps/x/seed.ts' }] }],
        walk: [
            { chosen: 'a', result: { newFiles: ['apps/x/nope.ts'] } },
            { chosen: 'b', result: { newFiles: ['apps/x/createRoom.ts'] } },
        ],
    };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: false, firstStep: 2 });
});

test('firstCoreStep: STOP 轮不计步；全程没命中 → null', () => {
    const tr = { seedStep: [], walk: [{ chosen: null, reason: '预算' }, { chosen: 'a', result: { newFiles: ['x.ts'] } }] };
    assert.deepEqual(firstCoreStep(tr, ['apps/x/createRoom.ts']), { seedHit: false, firstStep: null });
});

// ── traceDrift ─────────────────────────────────────────────────────────────────
test('traceDrift: 全命中→不 stale；大面积对不上→stale', () => {
    const wm = { pages: [{ id: 'a', page: 'Alpha' }, { id: 'b', page: 'Beta' }] };
    assert.equal(traceDrift([{ pageStep: { chosen: ['Alpha', 'Beta'] } }], wm).stale, false);   // 2/2
    const d = traceDrift([{ pageStep: { chosen: ['Old1', 'Old2', 'Alpha'] } }], wm);             // 1/3 < 0.5
    assert.equal(d.stale, true);
    assert.equal(d.matched, 1);
    assert.equal(d.total, 3);
});
