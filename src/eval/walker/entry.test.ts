import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionTokens } from './affinity.js';
import { selectPages, resolveWikiFiles, selectSeedForPage } from './entry.js';
import type { WikiMap, WikiPage } from '../../wikimap/parse.js';

const PAGE_NOTIF: WikiPage = {
    page: 'Notifications',
    sections: ['Push Pipeline', 'Email Notifications'],
    diagrams: [{ nodes: { PUSH: 'sendPushNotification / push.ts' }, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/lib/push.ts': ['1-10'], 'apps/meteor/gone.ts': [] },
};
const PAGE_AUTH: WikiPage = {
    page: 'Authentication and Authorization',
    sections: ['LDAP', 'OAuth'],
    diagrams: [{ nodes: {}, edges: [], subgraphs: [] }],
    source_files: { 'apps/meteor/server/auth.ts': [] },
};
const MAP: WikiMap = {
    repo: 'r', derived_from: 'd',
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
