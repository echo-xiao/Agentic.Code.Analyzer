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

test('lexical scoring (via retrieveSeeds): full-coverage fallback symbol ranks/survives; ' +
    'partial-overlap and zero-overlap symbols never surface (grep channel is a safety net, not a peer)', () => {
    // ADJUSTED (safety-net fix): this test previously asserted that a partial-overlap symbol
    // (MessageBox, matching only 'message' of its 2 tokens) still surfaced at a lower rank than
    // the full-match symbol. Under the safety-net design, a seed with no section provenance now
    // only survives if EVERY symbol token is covered by the question (or the name appears
    // verbatim) — a 1-of-2-token partial match like MessageBox no longer clears that bar and is
    // dropped entirely, not merely ranked lower. sendMessage still survives: both its tokens
    // ('send','message') are covered by the question 'how does the app send a message'.
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.symbols.set('MessageBox', new Set(['/abs/Rocket.Chat/apps/meteor/client/views/room/MessageBox.tsx']));
    GLOBAL_INDEX.symbols.set('close', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    const seeds = retrieveSeeds('how does the app send a message', [], outline, 10);
    const send = seeds.find(s => s.symbol === 'sendMessage')!;
    assert.equal(send.signals.lexicalRank, 1);
    assert.ok(!seeds.some(s => s.symbol === 'MessageBox'));   // partial (1/2 token) match -> dropped
    assert.ok(!seeds.some(s => s.symbol === 'close'));        // zero overlap -> dropped
});

test('lexical scoring: irregular verb (sent -> send) lets sendMessage outrank single-token junk', () => {
    GLOBAL_INDEX.symbols.set('sendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/sendMessage.ts']));
    GLOBAL_INDEX.symbols.set('message', new Set(['/abs/Rocket.Chat/apps/meteor/app/models/message.ts']));
    GLOBAL_INDEX.symbols.set('IMessage', new Set(['/abs/Rocket.Chat/packages/core-typings/src/IMessage.ts']));
    const seeds = retrieveSeeds('How is a message sent on the client side in Rocket.Chat?', [], outline, 10);
    assert.equal(seeds[0].symbol, 'sendMessage');
    assert.equal(seeds[0].signals.lexicalRank, 1);
});

test('retrieveSeeds: multi-file symbol picks the file matching the question (client vs server), no routed section', () => {
    const clientFile = '/x/Rocket.Chat/apps/meteor/client/lib/chats/flows/sendMessage.ts';
    const serverFile = '/x/Rocket.Chat/apps/meteor/app/lib/server/functions/sendMessage.ts';
    GLOBAL_INDEX.symbols.set('sendMessage', new Set([clientFile, serverFile]));

    const clientSeeds = retrieveSeeds('How is a message sent on the client side?', [], outline, 5);
    assert.equal(clientSeeds[0].symbol, 'sendMessage');
    assert.equal(clientSeeds[0].file, 'apps/meteor/client/lib/chats/flows/sendMessage.ts');

    const serverSeeds = retrieveSeeds('How is a message sent on the server side?', [], outline, 5);
    assert.equal(serverSeeds[0].symbol, 'sendMessage');
    assert.equal(serverSeeds[0].file, 'apps/meteor/app/lib/server/functions/sendMessage.ts');
});

test('retrieveSeeds: fallback seed with only partial token overlap (not full coverage, not verbatim) is dropped', () => {
    GLOBAL_INDEX.symbols.set('randomHelper', new Set(['/abs/Rocket.Chat/apps/meteor/app/utils/randomHelper.ts']));
    // Matches only 'random' of randomHelper's two tokens ('random','helper') -> partial, non-zero
    // lexical score, but not full coverage and not a verbatim mention -> must be dropped.
    const seeds = retrieveSeeds('how is a random error logged', [], outline, 10);
    assert.ok(!seeds.some(s => s.symbol === 'randomHelper'));
});

test('retrieveSeeds: fallback seed named verbatim in the question survives even without section provenance', () => {
    GLOBAL_INDEX.symbols.set('executeSendMessage', new Set(['/abs/Rocket.Chat/apps/meteor/app/lib/server/executeSendMessage.ts']));
    const seeds = retrieveSeeds('How does executeSendMessage work in Rocket.Chat?', [], outline, 10);
    assert.ok(seeds.some(s => s.symbol === 'executeSendMessage'));
});

test('groupChains: graph-adjacent (1 hop) surviving fallback seed merges into the section chain, no new chain', () => {
    GLOBAL_INDEX.callGraph.set('sectionSym', [{ caller: 'fallbackSym', file: 'f', edgeType: 'call' }]);
    const sectionSeed: RankedSeed = { symbol: 'sectionSym', file: 'apps/meteor/app/lib/server/sectionSym.ts', rrf: 0.05, signals: { lexicalRank: null, provenanceRank: 1, graphRank: null }, sectionId: 'msg' };
    const fallbackSeed: RankedSeed = { symbol: 'fallbackSym', file: 'apps/meteor/app/other/fallbackSym.ts', rrf: 0.02, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null };
    const chains = groupChains([sectionSeed, fallbackSeed]);
    assert.equal(chains.length, 1);
    assert.equal(chains[0].label, 'msg');
    assert.equal(chains[0].seeds.length, 2);
    assert.ok(Math.abs(chains[0].rrfMass - 0.07) < 1e-9);
});

test('groupChains: unreachable surviving fallback seed forms its own chain (not merged, not dropped)', () => {
    const sectionSeed: RankedSeed = { symbol: 'sectionSym', file: 'apps/meteor/app/lib/server/sectionSym.ts', rrf: 0.05, signals: { lexicalRank: null, provenanceRank: 1, graphRank: null }, sectionId: 'msg' };
    const fallbackSeed: RankedSeed = { symbol: 'unreachableSym', file: 'apps/meteor/app/misc/unreachableSym.ts', rrf: 0.04, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null };
    // No callGraph edges set up (beforeEach cleared it) -> unreachable from sectionSym.
    const chains = groupChains([sectionSeed, fallbackSeed]);
    assert.equal(chains.length, 2);
    assert.ok(chains.some(c => c.seeds.length === 1 && c.seeds[0].symbol === 'unreachableSym'));
});

test('groupChains: hard cap keeps only the top 4 chains by rrfMass, dropping the rest entirely', () => {
    const mkSection = (id: string, rrf: number): RankedSeed =>
        ({ symbol: 'sec_' + id, file: `apps/meteor/app/${id}/x.ts`, rrf, signals: { lexicalRank: null, provenanceRank: 1, graphRank: null }, sectionId: id });
    const fallback: RankedSeed = { symbol: 'unreachableSym', file: 'apps/meteor/app/misc/unreachableSym.ts', rrf: 0.06, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null };
    // 4 section chains + 1 unreachable fallback chain = 5 candidate chains; cap must drop the
    // weakest (the 0.06 fallback chain), keeping the 4 heavier section chains.
    const seeds = [mkSection('a', 0.10), mkSection('b', 0.09), mkSection('c', 0.08), mkSection('d', 0.07), fallback];
    const chains = groupChains(seeds);
    assert.equal(chains.length, 4);
    assert.ok(!chains.some(c => c.seeds.some(s => s.symbol === 'unreachableSym')));
    assert.ok(chains.every(c => c.rrfMass >= 0.07));
});

test('groupChains: same section -> one chain; lone weak seed chain is pruned', () => {
    const mk = (s: string, sec: string | null, rrf: number): RankedSeed =>
        ({ symbol: s, file: 'f/' + s, rrf, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: sec });
    const chains = groupChains([mk('a', 'msg', 0.10), mk('b', 'msg', 0.09), mk('c', 'auth', 0.08), mk('d', 'auth', 0.07), mk('noise', null, 0.001)]);
    assert.equal(chains.length, 2);
    assert.deepEqual(chains.map(c => c.seeds.length), [2, 2]);
    assert.ok(Math.abs(chains[0].rrfMass - 0.19) < 1e-9);
});
