import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
    discoverWorkspace, assertDepsInstalled, packageIdOf, dirtyClosure,
} from '../../src/indexer/workspace.js';

const mkRepo = (): string => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ws-'));
    const write = (rel: string, body: string) => {
        const abs = path.join(root, rel);
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, body);
    };
    write('package.json', JSON.stringify({ workspaces: ['apps/*', 'packages/*'] }));
    write('apps/web/package.json', JSON.stringify({
        name: '@acme/web', dependencies: { '@acme/core': '*', react: '^18' },
    }));
    write('apps/web/tsconfig.json', '{}');
    write('packages/core/package.json', JSON.stringify({
        name: '@acme/core', dependencies: { '@acme/util': '*' },
    }));
    write('packages/core/tsconfig.json', '{}');
    write('packages/util/package.json', JSON.stringify({ name: '@acme/util' }));
    return root;
};

test('discoverWorkspace finds every workspace package and its workspace-only deps', () => {
    const root = mkRepo();
    const pkgs = discoverWorkspace(root);
    const byId = new Map(pkgs.map(p => [p.id, p]));

    assert.deepEqual([...byId.keys()].sort(), ['apps/web', 'packages/core', 'packages/util']);
    assert.equal(byId.get('apps/web')!.name, '@acme/web');
    // react is a real third-party dep and must not appear: deps lists workspace packages only
    assert.deepEqual(byId.get('apps/web')!.deps, ['@acme/core']);
    assert.deepEqual(byId.get('packages/util')!.deps, []);
    assert.ok(byId.get('apps/web')!.tsconfig!.endsWith('apps/web/tsconfig.json'));
    assert.equal(byId.get('packages/util')!.tsconfig, null);
});

test('assertDepsInstalled throws with the install command when node_modules is absent', () => {
    const root = mkRepo();
    assert.throws(() => assertDepsInstalled(root), /yarn.*install/s);
    fs.mkdirSync(path.join(root, 'node_modules'));
    assert.doesNotThrow(() => assertDepsInstalled(root));
});

test('packageIdOf maps a file to its most specific package', () => {
    const root = mkRepo();
    const pkgs = discoverWorkspace(root);
    assert.equal(packageIdOf(path.join(root, 'apps/web/src/a.ts'), pkgs), 'apps/web');
    assert.equal(packageIdOf(path.join(root, 'packages/core/src/b.ts'), pkgs), 'packages/core');
    assert.equal(packageIdOf(path.join(root, 'scripts/x.ts'), pkgs), null);
});

test('dirtyClosure adds the dependents of every dirty package, transitively', () => {
    const root = mkRepo();
    const pkgs = discoverWorkspace(root);
    // util changed -> core depends on util -> web depends on core
    assert.deepEqual(dirtyClosure(['packages/util'], pkgs).sort(),
        ['apps/web', 'packages/core', 'packages/util']);
    // web changed -> nothing depends on web
    assert.deepEqual(dirtyClosure(['apps/web'], pkgs), ['apps/web']);
});
