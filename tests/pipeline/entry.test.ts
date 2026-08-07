import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import {
    lexicalScore, questionTokens, symbolTokens, tokenizeQuestion,
    chooseFile, buildPools, pickSeeds, buildChains, MAX_TIED,
} from '../../src/pipeline/entry.js';
import type { WikiSubsection } from '../../src/deepwiki/sections.js';

const sec = (pageId: string, heading: string, sources: string[], prose = ''): WikiSubsection =>
    ({ pageId, heading, path: `${pageId} › ${heading}`, sources, prose });
const def = (sym: string, ...files: string[]) =>
    GLOBAL_INDEX.symbols.set(sym, new Set(files.map(f => `/abs/Rocket.Chat/${f}`)));
const routed = (...paths: string[]) => paths.map((path, i) => ({ path, rank: i + 1 }));

beforeEach(() => { GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.fileDependents.clear(); });

test('tokenizeQuestion drops stopwords; symbolTokens splits sub-words', () => {
    assert.deepEqual(tokenizeQuestion('How is a message sent on the client side in Rocket.Chat?'),
        ['message', 'sent', 'client']);
    assert.deepEqual(symbolTokens('sendHTTPMessage2'), ['send', 'http', 'message', '2']);
});

test('questionTokens expands irregular verbs so "sent" reaches a send* symbol', () => {
    const q = questionTokens('How is a message sent?');
    assert.ok(q.has('sent') && q.has('send'));
});

test('lexicalScore squares the hit count and normalises by sub-word count', () => {
    const q = questionTokens('How is a message sent on the client side?');
    const lower = 'how is a message sent on the client side?';
    assert.equal(lexicalScore('sendMessage', q, lower), 2);       // 2 hits / 2 sub-words
    assert.equal(lexicalScore('encryptMessage', q, lower), 0.5);  // 1 hit  / 2 sub-words
    assert.equal(lexicalScore('rateLimiter', q, lower), 0);
});

test('lexicalScore: a symbol spelled out verbatim counts as a full match', () => {
    const q = questionTokens('what does executeSendMessage do');
    assert.ok(lexicalScore('executeSendMessage', q, 'what does executesendmessage do') > 0);
});

test('chooseFile prefers production over test definitions, then sorts for reproducibility', () => {
    assert.equal(chooseFile(['b/x.ts', 'a/x.ts']), 'a/x.ts');
    assert.equal(chooseFile(['apps/meteor/tests/data/x.ts', 'apps/meteor/server/x.ts']), 'apps/meteor/server/x.ts');
});

test('buildPools groups hit subsections by page and unions their files', () => {
    def('alpha', 'p/a.ts'); def('beta', 'p/b.ts'); def('gamma', 'q/c.ts');
    const sections = [sec('P', 'One', ['p/a.ts']), sec('P', 'Two', ['p/b.ts']), sec('Q', 'Three', ['q/c.ts'])];
    const pools = buildPools(routed('P › One', 'P › Two', 'Q › Three'), sections);
    assert.deepEqual(pools.map(p => p.pageId), ['P', 'Q']);
    assert.deepEqual(pools[0].files.sort(), ['p/a.ts', 'p/b.ts']);
    assert.deepEqual(pools[0].symbols.map(s => s.symbol).sort(), ['alpha', 'beta']);
});

test('buildPools ignores routed paths that match no known subsection', () => {
    def('alpha', 'p/a.ts');
    const pools = buildPools(routed('P › One', 'Z › Nope'), [sec('P', 'One', ['p/a.ts'])]);
    assert.equal(pools.length, 1);
});

test('pickSeeds takes the lexical winner when it is unique', () => {
    def('sendMessage', 'p/send.ts'); def('helper', 'p/send.ts');
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/send.ts'])]);
    const seeds = pickSeeds(pools[0], 'How is a message sent?');
    assert.deepEqual(seeds.map(s => s.symbol), ['sendMessage']);
    assert.equal(seeds[0].tied, false);
});

// Seed choice is zero-tolerance: expansion is a one-way walk, so a wrong seed wastes the chain.
// Ties are therefore built, not broken -- an extra tree costs tokens, a wrong pick costs the answer.
test('pickSeeds builds every tied candidate rather than breaking the tie', () => {
    def('encryptMessage', 'p/e2e.ts'); def('decryptMessage', 'p/e2e.ts');
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/e2e.ts'])]);
    const seeds = pickSeeds(pools[0], 'How is a message sent?');
    assert.deepEqual(seeds.map(s => s.symbol).sort(), ['decryptMessage', 'encryptMessage']);
    assert.ok(seeds.every(s => s.tied));
});

test('pickSeeds caps a large tie group at MAX_TIED', () => {
    ['aMessage', 'bMessage', 'cMessage', 'dMessage'].forEach(s => def(s, 'p/x.ts'));
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/x.ts'])]);
    assert.equal(pickSeeds(pools[0], 'How is a message sent?').length, MAX_TIED);
});

// Not relevance filtering (v2 does no deterministic culling) -- with no match at all there is no
// starting point, and "build every tie" would otherwise pick MAX_TIED unrelated symbols at random.
test('pickSeeds returns nothing when the whole pool scores zero', () => {
    def('rateLimiter', 'p/api.ts'); def('loadAPI', 'p/api.ts');
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/api.ts'])]);
    assert.deepEqual(pickSeeds(pools[0], 'How is a message sent?'), []);
});

test('buildChains: one chain per seed, carrying its page, subsections and prose', () => {
    def('sendMessage', 'p/send.ts');
    const sections = [sec('P', 'Message Sending Workflow', ['p/send.ts'], 'the flow starts here')];
    const chains = buildChains(routed('P › Message Sending Workflow'), sections, 'How is a message sent?');
    assert.equal(chains.length, 1);
    assert.equal(chains[0].pageId, 'P');
    assert.deepEqual(chains[0].sections, ['P › Message Sending Workflow']);
    assert.equal(chains[0].seed.symbol, 'sendMessage');
    assert.ok(chains[0].prose.includes('the flow starts here'));
});

test('buildChains: a page whose pool scores zero contributes no chain', () => {
    def('sendMessage', 'p/send.ts'); def('rateLimiter', 'q/api.ts');
    const sections = [sec('P', 'One', ['p/send.ts']), sec('Q', 'Two', ['q/api.ts'])];
    const chains = buildChains(routed('P › One', 'Q › Two'), sections, 'How is a message sent?');
    assert.deepEqual(chains.map(c => c.pageId), ['P']);
});

test('buildChains honours the runaway chain cap', () => {
    ['aMessage', 'bMessage', 'cMessage'].forEach(s => def(s, 'p/x.ts'));
    const chains = buildChains(routed('P › One'), [sec('P', 'One', ['p/x.ts'])], 'How is a message sent?', 2);
    assert.equal(chains.length, 2);
});
