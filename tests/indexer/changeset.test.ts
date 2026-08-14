import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNameStatus, currentCommit, isCleanWorktree } from '../../src/indexer/changeset.js';

test('changeset: 解析 A / M / D 三种状态', () => {
    const raw = [
        'A\tapps/meteor/server/new.ts',
        'M\tapps/meteor/server/changed.ts',
        'D\tapps/meteor/app/gone.ts',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.added, ['apps/meteor/server/new.ts']);
    assert.deepEqual(cs.modified, ['apps/meteor/server/changed.ts']);
    assert.deepEqual(cs.deleted, ['apps/meteor/app/gone.ts']);
    assert.deepEqual(cs.renamed, []);
});

test('changeset: 重命名保留成对，不拆成删除加新增', () => {
    const raw = 'R100\tapps/meteor/app/api/server/api.ts\tapps/meteor/server/api/api.ts';
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.renamed, [{
        from: 'apps/meteor/app/api/server/api.ts',
        to: 'apps/meteor/server/api/api.ts',
    }]);
    assert.deepEqual(cs.deleted, [], 'rename must not appear as a deletion');
    assert.deepEqual(cs.added, [], 'rename must not appear as an addition');
});

test('changeset: 非源码扩展名被过滤掉', () => {
    const raw = [
        'M\tpackage.json',
        'D\tREADME.md',
        'A\tapps/meteor/server/keep.tsx',
        'M\tdocker-compose-ci.yml',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.added, ['apps/meteor/server/keep.tsx']);
    assert.deepEqual(cs.modified, []);
    assert.deepEqual(cs.deleted, []);
});

test('changeset: 源码改名成非源码算删除，反之算新增', () => {
    const raw = [
        'R090\tapps/meteor/server/a.ts\tdocs/a.md',
        'R090\tdocs/b.md\tapps/meteor/server/b.ts',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.deleted, ['apps/meteor/server/a.ts']);
    assert.deepEqual(cs.added, ['apps/meteor/server/b.ts']);
    assert.deepEqual(cs.renamed, []);
});

test('changeset: 空输入产出空变更集', () => {
    const cs = parseNameStatus('');
    assert.deepEqual(cs, { added: [], modified: [], deleted: [], renamed: [] });
});

test('changeset: 与 scanDirectory() 一致 -- .test.ts 和 .d.ts 这类改动会被滤掉，不当成索引变更', () => {
    const raw = [
        'M\tapps/meteor/server/foo.test.ts',
        'A\tapps/meteor/server/types.d.ts',
        'M\tapps/meteor/client/Bar.spec.tsx',
        'A\tapps/meteor/server/real.ts',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.added, ['apps/meteor/server/real.ts']);
    assert.deepEqual(cs.modified, []);
    assert.deepEqual(cs.deleted, []);
});

test('changeset: 目标不是 git 仓库时 currentCommit 返回 null', () => {
    assert.equal(currentCommit('/tmp'), null);
});

test('changeset: Rocket.Chat 的 HEAD 是 40 位 sha', () => {
    const sha = currentCommit();
    assert.ok(sha, 'target repo should resolve HEAD');
    assert.match(sha!, /^[0-9a-f]{40}$/);
});

test('changeset: Rocket.Chat 工作区是干净的', () => {
    assert.equal(isCleanWorktree(), true, 'target must stay pinned and clean');
});
