// src/indexer/modulegraph.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clusterModules, assignAnchor, featureKey, isTestFile } from '../../src/indexer/modulegraph.js';

test('clusterModules: two dense clusters are split into two communities', () => {
    // cluster A: a1-a2-a3 fully connected; cluster B: b1-b2-b3 fully connected; only one weak edge between clusters
    const edges: Array<[string, string, number]> = [
        ['a1', 'a2', 5], ['a2', 'a3', 5], ['a1', 'a3', 5],
        ['b1', 'b2', 5], ['b2', 'b3', 5], ['b1', 'b3', 5],
        ['a1', 'b1', 1],
    ];
    const nodes = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3'];
    const comms = clusterModules({ nodes, edges });
    assert.equal(comms.length, 2, `expected 2 communities, got ${comms.length}`);
    const sizes = comms.map(c => c.files.length).sort();
    assert.deepEqual(sizes, [3, 3]);
});

test('assignAnchor: picks the file with the highest fan-in', () => {
    const anchor = assignAnchor(['x.ts', 'y.ts', 'z.ts'], new Map([['x.ts', 2], ['y.ts', 9], ['z.ts', 1]]));
    assert.equal(anchor, 'y.ts');
});

// featureKey tests
test('featureKey: app/livechat/server/x.ts → livechat', () => {
    assert.equal(featureKey('apps/meteor/app/livechat/server/x.ts'), 'livechat');
});

test('featureKey: packages/apps-engine/src/x.ts → pkg:apps-engine', () => {
    assert.equal(featureKey('packages/apps-engine/src/x.ts'), 'pkg:apps-engine');
});

test('featureKey: client/views/room/x.tsx → room', () => {
    assert.equal(featureKey('apps/meteor/client/views/room/x.tsx'), 'room');
});

test('featureKey: ee/apps/meteor/app/livechat-enterprise/x.ts → ee:livechat-enterprise', () => {
    assert.equal(featureKey('ee/apps/meteor/app/livechat-enterprise/x.ts'), 'ee:livechat-enterprise');
});

// isTestFile tests
test('isTestFile: tests/e2e/.. path → true', () => {
    assert.equal(isTestFile('apps/meteor/tests/e2e/livechat.spec.ts'), true);
});

test('isTestFile: normal app/x.ts → false', () => {
    assert.equal(isTestFile('apps/meteor/app/livechat/server/x.ts'), false);
});

test('isTestFile: .test. in filename → true', () => {
    assert.equal(isTestFile('apps/meteor/app/livechat/server/x.test.ts'), true);
});

test('isTestFile: .spec. in filename → true', () => {
    assert.equal(isTestFile('apps/meteor/app/livechat/server/x.spec.ts'), true);
});

test('isTestFile: e2e in path → true', () => {
    assert.equal(isTestFile('apps/meteor/e2e/livechat.ts'), true);
});

test('isTestFile: page-objects in path → true', () => {
    assert.equal(isTestFile('apps/meteor/page-objects/livechat.ts'), true);
});

test('isTestFile: .stories. in filename → true', () => {
    assert.equal(isTestFile('apps/meteor/app/livechat/ui/x.stories.tsx'), true);
});
