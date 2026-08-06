import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { anchorSeg, buildChainSkeleton, renderSkeletons } from '../../src/pipeline/skeleton.js';
import type { Chain } from '../../src/pipeline/types.js';

// Graph: seedFn -> wrap -> core -> hot(fanIn 30) ; core -> farAway (different anchor segment)
beforeEach(() => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.allFiles.clear();
    const put = (sym: string, file: string) => GLOBAL_INDEX.symbols.set(sym, new Set([file]));
    put('seedFn', '/rc/apps/meteor/app/lib/server/a.ts');
    put('wrap',   '/rc/apps/meteor/app/lib/server/a.ts');
    put('core',   '/rc/apps/meteor/app/lib/server/b.ts');
    put('hot',    '/rc/apps/meteor/app/lib/server/hot.ts');
    put('farAway','/rc/apps/meteor/app/federation/x.ts');
    // callGraph is reverse (callee -> callers); fan-in for hot = 30
    GLOBAL_INDEX.callGraph.set('wrap', [{ caller: 'seedFn', file: 'a', edgeType: 'call' }]);
    GLOBAL_INDEX.callGraph.set('core', [{ caller: 'wrap', file: 'a', edgeType: 'call' }]);
    GLOBAL_INDEX.callGraph.set('hot', Array.from({ length: 30 }, (_, i) => ({ caller: 'c' + i, file: 'f', edgeType: 'call' as const })));
    GLOBAL_INDEX.callGraph.get('hot')!.push({ caller: 'core', file: 'b', edgeType: 'call' });
    GLOBAL_INDEX.callGraph.set('farAway', [{ caller: 'core', file: 'b', edgeType: 'call' }]);
});

const chain: Chain = { id: 1, label: 'msg', rrfMass: 1, seeds: [
    { symbol: 'seedFn', file: 'apps/meteor/app/lib/server/a.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: 1, graphRank: 1 }, sectionId: 'msg' },
]};

test('skeleton: passthrough wrap has no id; hot is a leaf; cross-segment call becomes boundary', () => {
    const sk = buildChainSkeleton(chain, { hotFanIn: 25 });
    const flat: any[] = [];
    const walk = (ns: any[]) => ns.forEach(n => { flat.push(n); walk(n.children); });
    walk(sk.roots);
    const byKind = (k: string) => flat.filter(n => n.kind === k).map(n => n.symbol);
    assert.deepEqual(byKind('passthrough'), ['wrap']);
    assert.deepEqual(byKind('hotleaf'), ['hot']);
    assert.deepEqual(byKind('boundary'), ['farAway']);
    assert.ok(byKind('major').includes('seedFn') && byKind('major').includes('core'));
    assert.ok(flat.find(n => n.symbol === 'wrap').id === '');            // passthrough: no id
});

test('renderSkeletons: ids are chainNumber+letter and the lookup table matches', () => {
    const { text, nodeById } = renderSkeletons([buildChainSkeleton(chain, { hotFanIn: 25 })]);
    assert.ok(nodeById.has('1a'));
    assert.ok(text.includes('[1a]') && text.includes('Chain 1'));
    for (const [id, n] of nodeById) assert.equal(n.kind, 'major', id);   // only major nodes are selectable
});

test('skeleton: maxChildrenPerNode caps fan-out (default 8; 12 callees -> <=8 children)', () => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.allFiles.clear();
    const put = (sym: string, file: string) => GLOBAL_INDEX.symbols.set(sym, new Set([file]));
    put('wide', '/rc/apps/meteor/app/lib/server/wide.ts');
    const callees = Array.from({ length: 12 }, (_, i) => `callee${i}`);
    for (const c of callees) {
        put(c, '/rc/apps/meteor/app/lib/server/wide.ts');
        GLOBAL_INDEX.callGraph.set(c, [{ caller: 'wide', file: 'wide', edgeType: 'call' }]);
    }
    const wideChain: Chain = { id: 1, label: 'wide', rrfMass: 1, seeds: [
        { symbol: 'wide', file: 'apps/meteor/app/lib/server/wide.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: 1, graphRank: 1 }, sectionId: 'wide' },
    ]};
    const skDefault = buildChainSkeleton(wideChain, { hotFanIn: 25 });
    assert.ok(skDefault.roots[0].children.length <= 8);

    const skExplicit = buildChainSkeleton(wideChain, { hotFanIn: 25, maxChildrenPerNode: 8 });
    assert.equal(skExplicit.roots[0].children.length, 8);
});

test('buildChainSkeleton: root node file honors the seed\'s own file for multi-file symbols', () => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.allFiles.clear();
    // 'dual' is defined in two files (e.g. a client flow vs a server function) — the root must
    // anchor on whichever one the entry stage picked (seed.file), not the index's first entry.
    GLOBAL_INDEX.symbols.set('dual', new Set([
        '/x/Rocket.Chat/apps/meteor/client/a.ts',
        '/x/Rocket.Chat/apps/meteor/server/b.ts',
    ]));

    const clientChain: Chain = { id: 1, label: 'dual', rrfMass: 1, seeds: [
        { symbol: 'dual', file: 'apps/meteor/client/a.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: 1, graphRank: 1 }, sectionId: 'dual' },
    ]};
    assert.equal(buildChainSkeleton(clientChain, { hotFanIn: 25 }).roots[0].file, 'apps/meteor/client/a.ts');

    const serverChain: Chain = { id: 2, label: 'dual', rrfMass: 1, seeds: [
        { symbol: 'dual', file: 'apps/meteor/server/b.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: 1, graphRank: 1 }, sectionId: 'dual' },
    ]};
    assert.equal(buildChainSkeleton(serverChain, { hotFanIn: 25 }).roots[0].file, 'apps/meteor/server/b.ts');
});

test('buildChainSkeleton: a callee prefers the definition in the same file as its parent', () => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.allFiles.clear();
    GLOBAL_INDEX.symbols.set('root', new Set(['/x/Rocket.Chat/apps/meteor/app/lib/server/root.ts']));
    // 'helper' is defined in two files; the same-file-as-parent one is listed SECOND, so a naive
    // "first entry" resolution would pick the wrong one.
    GLOBAL_INDEX.symbols.set('helper', new Set([
        '/x/Rocket.Chat/apps/meteor/app/lib/server/other.ts',
        '/x/Rocket.Chat/apps/meteor/app/lib/server/root.ts',
    ]));
    GLOBAL_INDEX.callGraph.set('helper', [{ caller: 'root', file: 'root', edgeType: 'call' }]);

    const chain2: Chain = { id: 1, label: 'root', rrfMass: 1, seeds: [
        { symbol: 'root', file: 'apps/meteor/app/lib/server/root.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: 1, graphRank: 1 }, sectionId: 'root' },
    ]};
    const sk = buildChainSkeleton(chain2, { hotFanIn: 25 });
    const helperNode = sk.roots[0].children.find(c => c.symbol === 'helper');
    assert.ok(helperNode);
    assert.equal(helperNode!.file, 'apps/meteor/app/lib/server/root.ts');
});

test('anchorSeg: segment-array reads fixed positions, never latches onto a nested anchor', () => {
    assert.equal(anchorSeg('apps/meteor/app/lib/server/x.ts'), 'lib');
    assert.equal(anchorSeg('packages/rest-typings/src/x.ts'), 'rest-typings');
    // A nested 'apps/meteor/app/lib' further in the path must NOT hijack the anchor — the real
    // anchor is the first segment after apps/meteor here ('tests'), read positionally.
    assert.equal(anchorSeg('apps/meteor/tests/apps/meteor/app/lib/server/x.ts'), 'tests');
    assert.equal(anchorSeg('/x/Rocket.Chat/apps/meteor/app/federation/y.ts'), 'federation');
});
