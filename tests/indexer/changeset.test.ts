import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNameStatus, currentCommit, isCleanWorktree } from '../../src/indexer/changeset.js';

test('changeset: parses the A / M / D statuses', () => {
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

test('changeset: a rename stays a pair, not a delete plus an add', () => {
    const raw = 'R100\tapps/meteor/app/api/server/api.ts\tapps/meteor/server/api/api.ts';
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.renamed, [{
        from: 'apps/meteor/app/api/server/api.ts',
        to: 'apps/meteor/server/api/api.ts',
    }]);
    assert.deepEqual(cs.deleted, [], 'rename must not appear as a deletion');
    assert.deepEqual(cs.added, [], 'rename must not appear as an addition');
});

test('changeset: non-source extensions are filtered out', () => {
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

test('changeset: source renamed to non-source counts as a delete, and the reverse as an add', () => {
    const raw = [
        'R090\tapps/meteor/server/a.ts\tdocs/a.md',
        'R090\tdocs/b.md\tapps/meteor/server/b.ts',
    ].join('\n');
    const cs = parseNameStatus(raw);
    assert.deepEqual(cs.deleted, ['apps/meteor/server/a.ts']);
    assert.deepEqual(cs.added, ['apps/meteor/server/b.ts']);
    assert.deepEqual(cs.renamed, []);
});

test('changeset: empty input yields an empty changeset', () => {
    const cs = parseNameStatus('');
    assert.deepEqual(cs, { added: [], modified: [], deleted: [], renamed: [] });
});

test('changeset: matches scanDirectory() -- .test.ts and .d.ts changes are filtered out, not counted as index changes', () => {
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

test('changeset: currentCommit returns null when the target is not a git repository', () => {
    assert.equal(currentCommit('/tmp'), null);
});

test('changeset: Rocket.Chat HEAD is a 40-character sha', () => {
    const sha = currentCommit();
    assert.ok(sha, 'target repo should resolve HEAD');
    assert.match(sha!, /^[0-9a-f]{40}$/);
});

test('changeset: the Rocket.Chat worktree is clean', () => {
    assert.equal(isCleanWorktree(), true, 'target must stay pinned and clean');
});
