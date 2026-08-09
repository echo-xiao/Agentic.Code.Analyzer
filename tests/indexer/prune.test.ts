import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
    findOrphanMappings, sourcePathOf, skeletonPathOf, stripFromIndex, deleteArtifacts,
} from '../../src/indexer/prune.js';
import { getOutputPaths } from '../../src/config.js';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';

function tmpDir(): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), `prune-${process.pid}-`));
}

test('prune: 现存源文件对应的 mapping 不算孤儿', () => {
    const live = '/repo/apps/meteor/server/live.ts';
    const liveMapping = getOutputPaths(live).mappingPath;
    assert.deepEqual(findOrphanMappings([live], [liveMapping]), []);
});

test('prune: 没有对应源文件的 mapping 是孤儿', () => {
    const live = '/repo/apps/meteor/server/live.ts';
    const liveMapping = getOutputPaths(live).mappingPath;
    const orphanMapping = getOutputPaths('/repo/apps/meteor/app/gone.ts').mappingPath;
    assert.deepEqual(findOrphanMappings([live], [liveMapping, orphanMapping]), [orphanMapping]);
});

test('prune: .ts 与 .tsx 折叠到同一 mapping 路径，不会误判为孤儿', () => {
    // getOutputPaths strips the extension, so both spellings expect the same mapping path.
    const a = '/repo/apps/meteor/server/dup.ts';
    const b = '/repo/apps/meteor/server/dup.tsx';
    assert.equal(getOutputPaths(a).mappingPath, getOutputPaths(b).mappingPath);
    assert.deepEqual(findOrphanMappings([b], [getOutputPaths(a).mappingPath]), []);
});

test('prune: skeletonPathOf 由 mapping 路径推出同名 skeleton', () => {
    assert.equal(
        skeletonPathOf('/out/apps/meteor/server/api.mapping.json'),
        '/out/apps/meteor/server/api.skeleton.ts',
    );
});

test('prune: sourcePathOf 读出 mapping 内记录的源路径', () => {
    const d = tmpDir();
    try {
        const m = path.join(d, 'x.mapping.json');
        fs.writeFileSync(m, JSON.stringify({ sourcePath: '/repo/apps/meteor/x.ts', symbols: [] }));
        assert.equal(sourcePathOf(m), '/repo/apps/meteor/x.ts');
    } finally {
        fs.rmSync(d, { recursive: true, force: true });
    }
});

test('prune: sourcePathOf 对损坏或缺字段的 mapping 返回 null', () => {
    const d = tmpDir();
    try {
        const bad = path.join(d, 'bad.mapping.json');
        fs.writeFileSync(bad, '{ not json');
        assert.equal(sourcePathOf(bad), null);

        const noField = path.join(d, 'nofield.mapping.json');
        fs.writeFileSync(noField, JSON.stringify({ symbols: [] }));
        assert.equal(sourcePathOf(noField), null);

        assert.equal(sourcePathOf(path.join(d, 'missing.mapping.json')), null);
    } finally {
        fs.rmSync(d, { recursive: true, force: true });
    }
});

test('prune: stripFromIndex 摘掉四张表里的痕迹', () => {
    const gone = '/repo/gone.ts';
    const kept = '/repo/kept.ts';

    GLOBAL_INDEX.symbols.clear();
    GLOBAL_INDEX.callGraph.clear();
    GLOBAL_INDEX.fileDependents.clear();
    GLOBAL_INDEX.allFiles.clear();

    GLOBAL_INDEX.allFiles.add(gone);
    GLOBAL_INDEX.allFiles.add(kept);
    GLOBAL_INDEX.symbols.set('shared', new Set([gone, kept]));
    GLOBAL_INDEX.symbols.set('onlyGone', new Set([gone]));
    GLOBAL_INDEX.callGraph.set('callee', [
        { caller: 'a', file: gone, edgeType: 'call' },
        { caller: 'b', file: kept, edgeType: 'call' },
    ]);
    GLOBAL_INDEX.callGraph.set('onlyFromGone', [{ caller: 'c', file: gone, edgeType: 'call' }]);
    GLOBAL_INDEX.fileDependents.set(kept, new Set([gone, kept]));
    GLOBAL_INDEX.fileDependents.set(gone, new Set([kept]));

    stripFromIndex([gone]);

    assert.equal(GLOBAL_INDEX.allFiles.has(gone), false, 'allFiles must drop it');
    assert.equal(GLOBAL_INDEX.allFiles.has(kept), true, 'allFiles must keep the survivor');
    assert.deepEqual([...GLOBAL_INDEX.symbols.get('shared')!], [kept]);
    assert.equal(GLOBAL_INDEX.symbols.has('onlyGone'), false, 'symbol with no file left must go');
    assert.deepEqual(GLOBAL_INDEX.callGraph.get('callee')!.map(c => c.file), [kept]);
    assert.equal(GLOBAL_INDEX.callGraph.has('onlyFromGone'), false, 'callee with no caller left must go');
    assert.deepEqual([...GLOBAL_INDEX.fileDependents.get(kept)!], [kept]);
    assert.equal(GLOBAL_INDEX.fileDependents.has(gone), false, 'dependents keyed on a gone file must go');
});

test('prune: deleteArtifacts 删掉 mapping 与 skeleton，缺失的不报错', () => {
    const d = tmpDir();
    try {
        const m = path.join(d, 'a.mapping.json');
        const s = path.join(d, 'a.skeleton.ts');
        fs.writeFileSync(m, '{}');
        fs.writeFileSync(s, '// x');

        const onlyMapping = path.join(d, 'b.mapping.json');
        fs.writeFileSync(onlyMapping, '{}');

        const n = deleteArtifacts([m, onlyMapping, path.join(d, 'ghost.mapping.json')]);

        assert.equal(n, 3, 'two files for a, one for b, none for the missing one');
        assert.equal(fs.existsSync(m), false);
        assert.equal(fs.existsSync(s), false);
        assert.equal(fs.existsSync(onlyMapping), false);
    } finally {
        fs.rmSync(d, { recursive: true, force: true });
    }
});
