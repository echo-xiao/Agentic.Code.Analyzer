import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNameStatus, currentCommit, isCleanWorktree } from '../../src/indexer/changeset.js';

test('parseNameStatus reads the added, modified and deleted statuses', () => {
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

test('a rename stays a pair rather than splitting into a delete plus an add', () => {
    const raw = 'R100\tapps/meteor/app/api/server/api.ts\tapps/meteor/server/api/api.ts';
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.renamed, [{
        from: 'apps/meteor/app/api/server/api.ts',
        to: 'apps/meteor/server/api/api.ts',
    }]);
    assert.deepEqual(cs.deleted, [], 'rename must not appear as a deletion');
    assert.deepEqual(cs.added, [], 'rename must not appear as an addition');
});

test('paths whose extension is not indexed source are filtered out', () => {
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

test('a rename across the source boundary counts as a delete one way and an add the other', () => {
    const raw = [
        'R090\tapps/meteor/server/a.ts\tdocs/a.md',
        'R090\tdocs/b.md\tapps/meteor/server/b.ts',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.deleted, ['apps/meteor/server/a.ts']);
    assert.deepEqual(cs.added, ['apps/meteor/server/b.ts']);
    assert.deepEqual(cs.renamed, []);
});

test('empty input yields an empty change set', () => {
    const cs = parseNameStatus('');
    assert.deepEqual(cs, { added: [], modified: [], deleted: [], renamed: [] });
});

test('the filter matches isIndexedSourceFile, so .test.ts and .d.ts changes are not index changes', () => {
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

test('currentCommit returns null when the target is not a git repository', () => {
    assert.equal(currentCommit('/tmp'), null);
});

test('currentCommit reads a 40-character sha from the target repository', () => {
    const sha = currentCommit();
    assert.ok(sha, 'target repo should resolve HEAD');
    assert.match(sha!, /^[0-9a-f]{40}$/);
});

test('isCleanWorktree reports the target repository as clean', () => {
    assert.equal(isCleanWorktree(), true, 'target must stay pinned and clean');
});
