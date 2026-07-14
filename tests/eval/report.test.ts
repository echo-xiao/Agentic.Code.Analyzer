import { test } from 'node:test';
import assert from 'node:assert/strict';

import { fmtAgentCalls, stopLabel, pathEq, computeGold, traceDrift, roundCoreHits, firstCoreStep, semanticLabel, renderScope, renderWalk } from '../../src/eval/report.js';

// ── renderScope ──────────────────────────────────────────────────────────────
test('renderScope: 选中页带分数(取自 options),不再单列重复的 reason 串', () => {
    const tr = { pageStep: {
        options: [{ page: 'A', score: 0.78 }, { page: 'B', score: 0.6 }, { page: 'C', score: 0.5 }],
        chosen: ['A', 'B'],
        reason: 'top-3 词面 A:0.78/B:0.6',   // 旧版会把这串重复贴出来
    } };
    const lines = renderScope(tr);
    assert.equal(lines[0], '**scope 入口页**（3 页打分 → 选 2）');
    assert.equal(lines[1], '- A `0.78`');
    assert.equal(lines[2], '- B `0.6`');
    assert.ok(!lines.join('\n').includes('top-3 词面'), '不该再出现重复的 reason 串');
});

test('renderScope: 无 chosen → 退回符号搜索', () => {
    const tr = { pageStep: { options: [{ page: 'A', score: 0.1 }], chosen: [] } };
    assert.equal(renderScope(tr)[0], '**scope 入口页**（1 页打分 → 选 0）：（退回符号搜索）');
});

// ── renderWalk ─────────────────────────────────────────────────────────────────
test('renderWalk: 按种子分组;顶行不堆停因;每组头带步数+停因', () => {
    const tr = { walk: [
        { anchor: 'seedA', round: 1, chosen: null, reason: '边际枯竭' },                                    // seedA: 0 步 → 枯竭
        { anchor: 'seedB', round: 1, chosen: 'x', reason: 'aff', result: { newFiles: ['a/core.ts'] } },      // seedB: 1 步(命中 core)
        { anchor: 'seedB', round: 2, chosen: null, reason: '预算用尽' },                                      // seedB → 预算
    ] };
    const lines = renderWalk(tr, ['a/core.ts']);
    assert.equal(lines[0], '**walk 游走**（2 seed · 1 步）');   // 顶行只 seed/步数
    assert.ok(!lines[0].includes('停因'), '顶行不再堆停因');
    assert.ok(lines.some(l => l === '- **seedA** · 0 步 · ⏹ 枯竭'), 'seedA 组头 bullet');
    assert.ok(lines.some(l => l === '- **seedB** · 1 步 · ⏹ 预算'), 'seedB 组头 bullet');
    assert.ok(lines.some(l => l.includes('R1 → `x` · 触达 1') && l.includes('core 命中 1⭐')), '轮次折成一条 + 命中 core⭐');
});

test('renderWalk: core 命中带短路径区分同名文件 + 保留 affinity 明细', () => {
    const tr = { walk: [
        { anchor: 's', round: 1, chosen: 'm', reason: 'affinity 最高 0.9 (expand)',
          result: { newFiles: ['x/functions/sendMessage.ts', 'x/methods/sendMessage.ts'] } },
    ] };
    const lines = renderWalk(tr, ['x/functions/sendMessage.ts', 'x/methods/sendMessage.ts']);
    const round = lines.find(l => l.includes('R1'))!;
    assert.ok(round.includes('functions/sendMessage.ts') && round.includes('methods/sendMessage.ts'), '短路径区分同名文件');
    assert.ok(round.includes('affinity 最高 0.9 (expand)'), '保留 affinity 明细');
});

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

// ── semanticLabel（Phase 2）──────────────────────────────────────────────────
test('semanticLabel: PASS/PARTIAL/FAIL 图标 + mode/reason；缺→未跑', () => {
    assert.match(semanticLabel({ verdict: 'PASS' }), /✓ PASS/);
    assert.equal(semanticLabel({ verdict: 'PARTIAL', mode: 'missing step', reason: 'x' }), '**语义**：◐ PARTIAL — missing step — x');
    assert.match(semanticLabel({ verdict: 'FAIL' }), /✗ FAIL/);
    assert.equal(semanticLabel(undefined), '**语义**：未跑');
    assert.equal(semanticLabel({}), '**语义**：未跑');
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
