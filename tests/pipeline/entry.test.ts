import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { rrfFuse, retrieveSeeds, groupChains } from '../../src/pipeline/entry.js';
import type { WikiOutline } from '../../src/deepwiki/types.js';
import type { RankedSeed } from '../../src/pipeline/types.js';

beforeEach(() => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear();
    GLOBAL_INDEX.fileDependents.clear(); GLOBAL_INDEX.allFiles.clear();
});

test('rrfFuse: an item ranked #1 in two lists beats items ranked #1 in one', () => {
    const fused = rrfFuse([new Map([['a', 1], ['b', 2]]), new Map([['a', 1], ['c', 1]])]);
    assert.ok(fused.get('a')! > fused.get('c')!);
});

const outline: WikiOutline = { repo: 'r', commit: 'c', sections: [
    { id: 'msg', title: 'Messaging', blurb: '', sources: [{ file: 'apps/meteor/app/lib/server/sendMessage.ts', startLine: 1, endLine: 99 }] },
]};

test('retrieveSeeds: provenance + lexical + graph signals fuse; section-file symbols rank first', () => {
    const f = '/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts';
    GLOBAL_INDEX.symbols.set('sendMessage', new Set([f]));
    GLOBAL_INDEX.symbols.set('unrelatedThing', new Set(['/abs/Rocket.Chat/apps/other/x.ts']));
    GLOBAL_INDEX.callGraph.set('sendMessage', [{ caller: 'a', file: 'fa', edgeType: 'call' }, { caller: 'b', file: 'fb', edgeType: 'call' }]);
    const seeds = retrieveSeeds('how is a message sent (sendMessage)?', [{ sectionId: 'msg', rank: 1 }], outline, 5);
    assert.equal(seeds[0].symbol, 'sendMessage');
    assert.equal(seeds[0].sectionId, 'msg');
    assert.ok(seeds[0].signals.provenanceRank !== null && seeds[0].signals.graphRank !== null);
});

test('groupChains: same section -> one chain; lone weak seed chain is pruned', () => {
    const mk = (s: string, sec: string | null, rrf: number): RankedSeed =>
        ({ symbol: s, file: 'f/' + s, rrf, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: sec });
    const chains = groupChains([mk('a', 'msg', 0.10), mk('b', 'msg', 0.09), mk('c', 'auth', 0.08), mk('d', 'auth', 0.07), mk('noise', null, 0.001)]);
    assert.equal(chains.length, 2);
    assert.deepEqual(chains.map(c => c.seeds.length), [2, 2]);
    assert.ok(Math.abs(chains[0].rrfMass - 0.19) < 1e-9);
});
