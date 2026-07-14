import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionTokens } from '../../../../src/server/engine/walker/affinity.js';
import { selectPages, resolveWikiFiles, selectSeedForPage, informativeTokens } from '../../../../src/server/engine/walker/entry.js';
import type { WikiMap, WikiPage } from '../../../../src/wikimap/schema.js';

const PAGE_NOTIF: WikiPage = {
    id: 'notifications', title: 'Notifications', category: '', scope: '', modules: [], seedFiles: [],
    page: 'Notifications',
    sections: ['Push Pipeline', 'Email Notifications'],
    diagrams: [{ nodes: { PUSH: 'sendPushNotification / push.ts' }, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/lib/push.ts': ['1-10'], 'apps/meteor/gone.ts': [] },
};
const PAGE_AUTH: WikiPage = {
    id: 'authentication-and-authorization', title: 'Authentication and Authorization', category: '', scope: '', modules: [], seedFiles: [],
    page: 'Authentication and Authorization',
    sections: ['LDAP', 'OAuth'],
    diagrams: [{ nodes: {}, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/auth.ts': [] },
};
const MAP: WikiMap = {
    repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
    pages: [PAGE_NOTIF, PAGE_AUTH],
    file_to_pages: { 'apps/meteor/server/lib/push.ts': ['Notifications'] },
};

test('selectPages：push 问题命中 Notifications 页，带 hitOn 与分数', () => {
    const tokens = questionTokens('How are push notifications triggered?');
    const step = selectPages(tokens, MAP)!;
    assert.equal(step.chosen[0], 'Notifications');
    assert.ok(step.options[0].score > 0.3);
    assert.ok(step.options[0].hitOn.length > 0);
    assert.ok(step.reason.includes('Notifications'));
});

test('selectPages：全部低于阈值返回 null（触发 fallback）', () => {
    const step = selectPages(['zzzzqq'], MAP);
    assert.equal(step, null);
});

test('resolveWikiFiles：endsWith 匹配真实路径，缺失文件进 missing', () => {
    const all = ['/abs/repo/apps/meteor/server/lib/push.ts', '/abs/repo/other.ts'];
    const { resolved, missing } = resolveWikiFiles(Object.keys(PAGE_NOTIF.source_files), all);
    assert.equal(resolved.get('apps/meteor/server/lib/push.ts'), '/abs/repo/apps/meteor/server/lib/push.ts');
    assert.deepEqual(missing, ['apps/meteor/gone.ts']);
});

test('selectSeedForPage：按词面分选每页最优符号，带 options 和 reason', () => {
    const tokens = questionTokens('How are push notifications triggered?');
    const { resolved } = resolveWikiFiles(Object.keys(PAGE_NOTIF.source_files), ['/abs/repo/apps/meteor/server/lib/push.ts']);
    const symbolsOfFile = (p: string) => p.endsWith('push.ts') ? ['sendPushNotification', 'initPush'] : [];
    const step = selectSeedForPage(tokens, PAGE_NOTIF, resolved, symbolsOfFile);
    assert.equal(step.chosen, 'initPush');
    assert.equal(step.page, 'Notifications');
    assert.ok(step.options.length >= 1);
    assert.ok(step.reason.length > 0);
});

test('selectSeedForPage：页面无可解析文件时 chosen=null', () => {
    const step = selectSeedForPage(['push'], PAGE_NOTIF, new Map(), () => []);
    assert.equal(step.chosen, null);
});

test('selectSeedForPage：相同分数时按符号字母序作为 tie-break', () => {
    // zebraPush 和 alphaPush 对于 token 'push' 应该有相同的分数，
    // tie-break 应该选择 alphaPush（字母序较早）
    const tokens = ['push'];
    const pageWithSymbols: WikiPage = {
        id: 'tiebreakpage', title: 'TieBreakPage', category: '', scope: '', modules: [], seedFiles: [],
        page: 'TieBreakPage',
        sections: [],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }],
        source_files: { 'tie/symbols.ts': [] },
    };
    const { resolved } = resolveWikiFiles(Object.keys(pageWithSymbols.source_files), ['/abs/repo/tie/symbols.ts']);
    const symbolsOfFile = (p: string) => p.endsWith('symbols.ts') ? ['zebraPush', 'alphaPush'] : [];
    const step = selectSeedForPage(tokens, pageWithSymbols, resolved, symbolsOfFile);
    // 如果分数相同，应该选择 alphaPush（字母序较早）
    assert.equal(step.chosen, 'alphaPush');
});

test('informativeTokens：匹配过半页面的泛词被剔除，特异词保留', () => {
    const generic = (name: string): WikiPage => ({
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: name, category: '', scope: '', modules: [], seedFiles: [],
        page: name, sections: [],
        diagrams: [{ nodes: { X: 'rocketchat deployment server' }, edges: [], subgraphs: [] }],
        source_files: {},
    });
    const map3: WikiMap = {
        repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
        pages: [
            { ...generic('CI/CD Pipeline') },
            { ...generic('Development Workflow') },
            { id: 'notifications', title: 'Notifications', category: '', scope: '', modules: [], seedFiles: [],
              page: 'Notifications', sections: ['Push Pipeline'],
              diagrams: [{ nodes: { P: 'sendPushNotification / rocketchat push' }, edges: [], subgraphs: [] }],
              source_files: {} },
        ],
        file_to_pages: {},
    };
    const { kept, dropped } = informativeTokens(['rocketchat', 'push'], map3);
    assert.deepEqual(kept, ['push']);                       // 只命中 1/3 页
    assert.equal(dropped.length, 1);
    assert.equal(dropped[0].token, 'rocketchat');           // 命中 3/3 页 → 泛词
    assert.equal(dropped[0].df, 3);
});

test('informativeTokens：全是泛词时回退原 tokens，不剃光头', () => {
    const map1: WikiMap = {
        repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd',
        pages: [{ id: 'overview', title: 'Overview', category: '', scope: '', modules: [], seedFiles: [],
            page: 'Overview', sections: [],
            diagrams: [{ nodes: { X: 'rocketchat core' }, edges: [], subgraphs: [] }], source_files: {} }],
        file_to_pages: {},
    };
    const { kept, dropped } = informativeTokens(['rocketchat'], map1);
    assert.deepEqual(kept, ['rocketchat']);
    assert.deepEqual(dropped, []);
});

const mapSem = {
  pages: [
    { page: 'Integrations, Webhooks & Slash Commands', sections: [], diagrams: [], source_files: { 'a.ts': ['L1'] } },
    { page: 'Room Views', sections: [], diagrams: [], source_files: { 'b.ts': ['L1'] } },
  ],
} as any;

test('selectPages: 纯语义把词面选不出的页顶上来', () => {
  const tok = ['qzxvwq'];   // 蓄意乱码 token：对 mapSem 两页词面都 < 阈值 0.3
  // 无 semScores → 词面选不出 → null（证明不是词面在选）
  assert.equal(selectPages(tok, mapSem, 0.3), null);
  // 给语义分 → 只靠语义进候选 → Slash 页胜
  const sem = new Map([['Integrations, Webhooks & Slash Commands', 0.8], ['Room Views', 0.2]]);
  const r = selectPages(tok, mapSem, 0.3, { semScores: sem });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'Integrations, Webhooks & Slash Commands');
});

test('selectPages: 不传 semScores 与现状一致(纯词面)', () => {
  const r = selectPages(['room'], mapSem, 0.3);
  assert.ok(r);   // 'room' 词面命中 Room Views
  assert.equal(r!.chosen[0], 'Room Views');
});

test('扩词并入 tokens 后能词面命中', () => {
  // 原问题 'slash' 命中不到;扩词补 'commands' → 命中 Slash 页
  const r = selectPages(['zzz'], mapSem, 0.3, { expandedTokens: ['commands'] });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'Integrations, Webhooks & Slash Commands');
});

const mMod = { pages: [
  { page: 'LDAP Directory', sections: [], diagrams: [], source_files: { 'l.ts': ['L1'] }, modules: ['ldap'] },
  { page: 'Room Views', sections: [], diagrams: [], source_files: { 'r.ts': ['L1'] }, modules: ['ui'] },
] } as any;

test('候选模块 OR-gate(救场分支): 词面空时语义/候选模块才进候选', () => {
  const tok = ['qzxvwq'];                                   // 词面对两页均 < 0.3
  const semLow = new Map([['LDAP Directory', 0.2], ['Room Views', 0.1]]);
  // 无 semScores、无候选模块 → 词面空、无救场 → null（证明不是词面在选）
  assert.equal(selectPages(tok, mMod, 0.3), null);
  // 给语义分 → 词面空走救场路径 → semScore 最高的 LDAP Directory 胜（证明救场分支在选）
  const r = selectPages(tok, mMod, 0.3, { semScores: semLow });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'LDAP Directory');
  // 候选模块在救场路径中前置 → 效果等同（模块 ldap 对应 LDAP Directory 仍居首）
  const r2 = selectPages(tok, mMod, 0.3, { semScores: semLow, candidateModules: ['ldap'] });
  assert.ok(r2);
  assert.equal(r2!.chosen[0], 'LDAP Directory');
});

test('候选模块 no-sem 分支: 词面 null 时候选模块页仍进 chosen', () => {
  const tok = ['qzxvwq'];                                   // 词面 null
  assert.equal(selectPages(tok, mMod, 0.3), null);          // 无候选 → null
  const r = selectPages(tok, mMod, 0.3, { candidateModules: ['ldap'] });
  assert.ok(r);
  assert.equal(r!.chosen[0], 'LDAP Directory');
});

test('selectPages：多 token 佐证——孤证页(仅 push 命中)被双证页压下去', () => {
    const gitPage: WikiPage = {
        id: 'ci-pipeline', title: 'CI Pipeline', category: '', scope: '', modules: [], seedFiles: [],
        page: 'CI Pipeline', sections: ['Push to develop'],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }], source_files: {},
    };
    const msgPage: WikiPage = {
        id: 'messaging', title: 'Messaging', category: '', scope: '', modules: [], seedFiles: [],
        page: 'Messaging', sections: ['Push Notifications'],
        diagrams: [{ nodes: {}, edges: [], subgraphs: [] }], source_files: {},
    };
    const m: WikiMap = { repo: 'r', generated_at: '2026-01-01T00:00:00.000Z', derived_from: 'd', pages: [gitPage, msgPage], file_to_pages: {} };
    const step = selectPages(['push', 'notifications'], m)!;
    assert.equal(step.chosen[0], 'Messaging');
    const git = step.options.find(o => o.page === 'CI Pipeline')!;
    const msg = step.options.find(o => o.page === 'Messaging')!;
    assert.ok(msg.score > git.score, `双证 ${msg.score} 应 > 孤证 ${git.score}`);
});
