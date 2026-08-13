import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { buildGraph } from '../../src/indexer/build-graph.js';
import { readShards, readDispatch } from '../../src/indexer/graph-store.js';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';

const TSCONFIG = JSON.stringify({
    compilerOptions: { target: 'esnext', module: 'esnext', moduleResolution: 'bundler', allowJs: true, noEmit: true },
    include: ['./**/*'],
});

const mkRepo = (tree: Record<string, Record<string, string>>): string => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'build-'));
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ workspaces: ['apps/*', 'packages/*'] }));
    fs.mkdirSync(path.join(root, 'node_modules'), { recursive: true });
    for (const [id, files] of Object.entries(tree)) {
        const dir = path.join(root, id);
        for (const [rel, body] of Object.entries(files)) {
            const abs = path.join(dir, rel);
            fs.mkdirSync(path.dirname(abs), { recursive: true });
            fs.writeFileSync(abs, body);
        }
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: `@t/${path.basename(id)}` }));
        fs.writeFileSync(path.join(dir, 'tsconfig.json'), TSCONFIG);
    }
    return root;
};

test('buildGraph writes one shard per package plus one dispatch artifact, and loads them', () => {
    const root = mkRepo({
        'packages/core': { 'src/index.ts': 'export function shared() { return 1; }\n' },
        'apps/web': { 'src/use.ts': 'import { shared } from "@t/core";\nexport function use() { return shared(); }\n' },
    });
    const out = path.join(root, '.graph');

    const summary = buildGraph({ repoRoot: root, graphDir: out, budgetFile: null });

    assert.equal(summary.packages, 2);
    assert.equal(readShards(out).length, 2);
    assert.ok(readDispatch(out));
    // The index is loaded in the same pass: a caller that builds does not then re-read from disk.
    assert.ok(GLOBAL_INDEX.defs.has('apps/web/src/use.ts#use'));
    assert.deepEqual(GLOBAL_INDEX.out.get('apps/web/src/use.ts#use')!.map(e => e.to),
        ['packages/core/src/index.ts#shared']);
});

test('buildGraph refuses to run against a repo with no dependencies installed', () => {
    const root = mkRepo({ 'packages/core': { 'src/index.ts': 'export const a = 1;\n' } });
    fs.rmSync(path.join(root, 'node_modules'), { recursive: true });

    // A missing install does not fail loudly on its own: the checker simply resolves nothing and
    // the index comes out empty but well-formed. Failing here is the whole point.
    assert.throws(() => buildGraph({ repoRoot: root, graphDir: path.join(root, '.graph'), budgetFile: null }), /install/);
});

test('a rebuild replaces a package shard rather than accumulating', () => {
    const root = mkRepo({ 'packages/core': { 'src/index.ts': 'export function a() { return 1; }\n' } });
    const out = path.join(root, '.graph');
    buildGraph({ repoRoot: root, graphDir: out, budgetFile: null });

    fs.writeFileSync(path.join(root, 'packages/core/src/index.ts'), 'export function b() { return 2; }\n');
    buildGraph({ repoRoot: root, graphDir: out, budgetFile: null });

    const shards = readShards(out);
    assert.equal(shards.length, 1);
    assert.deepEqual(shards[0].defs.map(d => d.name).filter(n => n !== '<module>'), ['b']);
});
