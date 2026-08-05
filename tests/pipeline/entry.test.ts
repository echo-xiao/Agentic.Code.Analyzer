import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { rrfFuse, retrieveSeeds, groupChains, tokenizeQuestion, symbolTokens } from '../../src/pipeline/entry.js';
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

test('retrieveSeeds: within a routed section, lexically relevant symbols outrank generic ones in provenance', () => {
    const f = '/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts';
    // `close` is a generic hub defined in the SAME section file as `sendMessage` — Map-iteration
    // order used to let it win provRank regardless of relevance. It must not outrank sendMessage.
    GLOBAL_INDEX.symbols.set('close', new Set([f]));
    GLOBAL_INDEX.symbols.set('sendMessage', new Set([f]));
    const seeds = retrieveSeeds('send a message', [{ sectionId: 'msg', rank: 1 }], outline, 5);
    const send = seeds.find(s => s.symbol === 'sendMessage')!;
    const close = seeds.find(s => s.symbol === 'close')!;
    assert.ok(send.signals.provenanceRank! < close.signals.provenanceRank!);
    assert.equal(seeds[0].symbol, 'sendMessage');
});

test('tokenizeQuestion: lowercases, strips punctuation, drops stopwords/short tokens, dedups', () => {
    assert.deepEqual(
        tokenizeQuestion('How is a message sent on the client side in Rocket.Chat?'),
        ['message', 'sent', 'client'],
    );
});

test('symbolTokens: splits camelCase/PascalCase into lowercase sub-words', () => {
    assert.deepEqual(symbolTokens('sendMessage'), ['send', 'message']);
    assert.deepEqual(symbolTokens('MessageBox'), ['message', 'box']);
});

test('lexical scoring (via retrieveSeeds): keyword-overlap ranks the more specific symbol first; ' +
    'zero-overlap symbols never surface', () => {
    // NOTE ON PHRASING: the stemming rule (strip trailing s/ed/ing) is a trivial regular-verb
    // stemmer — it does NOT turn 'sent' into 'send' (irregular verb), so a question using 'sent'
    // scores sendMessage and MessageBox identically (both match only on 'message') and the tie
    // would be broken alphabetically ('MessageBox' < 'sendMessage'), NOT what we want to assert
    // here. Using 'send' (regular form) instead lets sendMessage match both 'send' and 'message'
    // (score 2.0) while MessageBox matches only 'message' (score 0.5) — an unambiguous ordering
    // that isolates the lexical-scoring behavior itself rather than the stemmer's known gap.
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.symbols.set('MessageBox', new Set(['/abs/Rocket.Chat/apps/meteor/client/views/room/MessageBox.tsx']));
    GLOBAL_INDEX.symbols.set('close', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    const seeds = retrieveSeeds('how does the app send a message', [], outline, 10);
    const send = seeds.find(s => s.symbol === 'sendMessage')!;
    const box = seeds.find(s => s.symbol === 'MessageBox')!;
    assert.equal(send.signals.lexicalRank, 1);
    assert.ok(box.signals.lexicalRank! > 1);
    assert.ok(!seeds.some(s => s.symbol === 'close'));   // 'close' has zero token overlap -> absent everywhere
});

test('lexical scoring: irregular verb (sent -> send) lets sendMessage outrank single-token junk', () => {
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.symbols.set('message', new Set(['/abs/Rocket.Chat/apps/meteor/app/models/message.ts']));
    GLOBAL_INDEX.symbols.set('IMessage', new Set(['/abs/Rocket.Chat/packages/core-typings/src/IMessage.ts']));
    const seeds = retrieveSeeds('How is a message sent on the client side in Rocket.Chat?', [], outline, 10);
    assert.equal(seeds[0].symbol, 'sendMessage');
    assert.equal(seeds[0].signals.lexicalRank, 1);
});

test('groupChains: same section -> one chain; lone weak seed chain is pruned', () => {
    const mk = (s: string, sec: string | null, rrf: number): RankedSeed =>
        ({ symbol: s, file: 'f/' + s, rrf, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: sec });
    const chains = groupChains([mk('a', 'msg', 0.10), mk('b', 'msg', 0.09), mk('c', 'auth', 0.08), mk('d', 'auth', 0.07), mk('noise', null, 0.001)]);
    assert.equal(chains.length, 2);
    assert.deepEqual(chains.map(c => c.seeds.length), [2, 2]);
    assert.ok(Math.abs(chains[0].rrfMass - 0.19) < 1e-9);
});
