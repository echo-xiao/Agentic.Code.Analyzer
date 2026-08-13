import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { buildShard, workspacePaths } from '../../src/indexer/graph-build.js';
import type { WorkspacePackage } from '../../src/indexer/workspace.js';

const TSCONFIG = JSON.stringify({
    compilerOptions: {
        target: 'esnext', module: 'esnext', moduleResolution: 'bundler',
        allowJs: true, noEmit: true, jsx: 'react-jsx',
    },
    include: ['./**/*'],
});

// One repo root, many packages: cross-package resolution is the thing this module exists to fix,
// and it cannot be exercised with a single-package fixture.
const mkRepo = (tree: Record<string, Record<string, string>>): { root: string; packages: WorkspacePackage[] } => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'shard-'));
    const packages: WorkspacePackage[] = [];
    for (const [id, files] of Object.entries(tree)) {
        const dir = path.join(root, id);
        for (const [rel, body] of Object.entries(files)) {
            const abs = path.join(dir, rel);
            fs.mkdirSync(path.dirname(abs), { recursive: true });
            fs.writeFileSync(abs, body);
        }
        const name = `@t/${id.split('/').pop()}`;
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, main: 'dist/index.js' }));
        fs.writeFileSync(path.join(dir, 'tsconfig.json'), TSCONFIG);
        packages.push({ id, dir, name, tsconfig: path.join(dir, 'tsconfig.json'), deps: [] });
    }
    return { root, packages };
};

const one = (files: Record<string, string>) => {
    const { root, packages } = mkRepo({ 'packages/p': files });
    return { root, pkg: packages[0], packages };
};

test('buildShard emits defs and resolved edges, and drops builtin references', () => {
    const { root, pkg, packages } = one({
        'src/util.ts': 'export function helper() { return 1; }\n',
        'src/main.ts': 'import { helper } from "./util.js";\n' +
                       'export function main(xs: string[]) { helper(); return xs.map(x => x.trim()); }\n',
    });
    const shard = buildShard(pkg, root, packages);

    assert.ok(shard.defs.some(d => d.id === 'packages/p/src/util.ts#helper'));
    assert.ok(shard.edges.some(e =>
        e.from === 'packages/p/src/main.ts#main' &&
        e.to === 'packages/p/src/util.ts#helper' && e.kind === 'call'));
    // map/trim resolve to lib and must not appear as edges at all
    assert.ok(!shard.edges.some(e => e.to.includes('map') || e.to.includes('trim')));
    assert.ok(shard.stats.external > 0);
});

test('unbound references are recorded with reason and excluded from edges', () => {
    const { root, pkg, packages } = one({
        'src/x.ts': 'declare const box: any;\nexport function f() { return box.whatever(); }\n',
    });
    const shard = buildShard(pkg, root, packages);

    assert.ok(shard.unbound.some(u => u.at === 'packages/p/src/x.ts#f' && u.text.includes('whatever')));
    assert.equal(shard.stats.unbound, shard.unbound.length);
    assert.ok(!shard.edges.some(e => e.to.includes('whatever')));
});

test('a shard collects only its own package files, never the packages it imports', () => {
    const { root, packages } = mkRepo({
        'packages/core': { 'src/index.ts': 'export function shared() { return 1; }\n' },
        'apps/web': {
            'src/use.ts': 'import { shared } from "@t/core";\nexport function use() { return shared(); }\n',
        },
    });
    const web = packages.find(p => p.id === 'apps/web')!;
    const shard = buildShard(web, root, packages);

    // Injecting workspace paths pulls the imported package's sources into the Program (measured:
    // 853 files for a 28-file package). Without this filter every shard re-emits every other
    // package's defs.
    assert.ok(shard.defs.every(d => d.file.startsWith('apps/web/')),
        shard.defs.map(d => d.file).filter(f => !f.startsWith('apps/web/')).join(','));
    assert.ok(shard.files.every(f => f.startsWith('apps/web/')));
});

test('workspace paths make a cross-package import bind to the other package source', () => {
    const { root, packages } = mkRepo({
        'packages/core': { 'src/index.ts': 'export function shared() { return 1; }\n' },
        'apps/web': {
            'src/use.ts': 'import { shared } from "@t/core";\nexport function use() { return shared(); }\n',
        },
    });
    const web = packages.find(p => p.id === 'apps/web')!;

    // Every package.json points main at a dist/ that does not exist, so without paths the checker
    // reports "no declarations" and the edge is lost. Measured on one real package: 0 cross-package
    // bindings without, 347 with.
    const withPaths = buildShard(web, root, packages);
    assert.ok(withPaths.edges.some(e =>
        e.from === 'apps/web/src/use.ts#use' && e.to === 'packages/core/src/index.ts#shared'),
        JSON.stringify(withPaths.edges));

    // And the binding points at src, not at a dist/.d.ts that no shard collects defs for.
    assert.ok(withPaths.edges.every(e => !e.to.includes('dist/') && !e.to.includes('.d.ts')));
});

test('workspacePaths maps every named package to its own src, and skips packages without one', () => {
    const { root, packages } = mkRepo({
        'packages/core': { 'src/index.ts': 'export const a = 1;\n' },
    });
    const noSrc: WorkspacePackage = {
        id: 'packages/flat', dir: path.join(root, 'packages/flat'),
        name: '@t/flat', tsconfig: null, deps: [],
    };
    fs.mkdirSync(noSrc.dir, { recursive: true });

    const paths = workspacePaths([...packages, noSrc]);

    assert.ok(paths['@t/core'][0].endsWith('packages/core/src/index.ts'));
    assert.ok(paths['@t/core/*'][0].endsWith('packages/core/src/*'));
    assert.equal(paths['@t/flat'], undefined);
});

test('a shard carries the slot and override sections the dispatch side fills in', () => {
    const { root, pkg, packages } = one({ 'src/a.ts': 'export const a = 1;\n' });
    const shard = buildShard(pkg, root, packages);

    // Shape only. What goes into them is idioms.ts's and overrides.ts's job, tested there —
    // buildShard must not grow a second copy of that logic.
    assert.ok(Array.isArray(shard.slots));
    assert.ok(Array.isArray(shard.overrides));
    assert.equal(shard.package, 'packages/p');
    assert.deepEqual(shard.failedFiles, []);
});

test('an implements edge carries how many classes implement the member', () => {
    const { root, packages } = mkRepo({
        'packages/core': { 'src/index.ts': 'export interface IStore { save(x: unknown): void }\n' },
        'apps/web': {
            'src/a.ts': 'import type { IStore } from "@t/core";\n' +
                        'export class MemoryStore implements IStore { save(x: unknown) { void x; } }\n',
            'src/b.ts': 'import type { IStore } from "@t/core";\n' +
                        'export class DiskStore implements IStore { save(x: unknown) { void x; } }\n',
        },
    });
    const web = packages.find(p => p.id === 'apps/web')!;

    const impl = buildShard(web, root, packages).edges.filter(e => e.kind === 'implements');

    // Two implementations, and both edges say so. Dropping the count on the way into the shard
    // leaves the graph looking like each call has one destination.
    assert.equal(impl.length, 2);
    assert.deepEqual([...new Set(impl.map(e => e.implCount))], [2]);
});
