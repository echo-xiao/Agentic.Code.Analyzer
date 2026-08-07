import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import {
    lexicalScore, questionTokens, symbolTokens, tokenizeQuestion,
    chooseFile, buildPools, pickSeeds, buildChains, SEEDS_PER_POOL, MAX_SEEDS_PER_POOL,
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

test('pickSeeds takes the top scorers, not only the champion', () => {
    def('sendMessage', 'p/send.ts');          // 2 hits / 2 sub-words = 2.00
    def('sendText', 'p/send.ts');             // 1 hit  / 2 sub-words = 0.50
    def('helper', 'p/send.ts');               // 0 -> not a candidate
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/send.ts'])]);
    const seeds = pickSeeds(pools[0], 'How is a message sent?');
    assert.deepEqual(seeds.map(s => s.symbol), ['sendMessage', 'sendText']);
    assert.ok(seeds.every(s => !s.tied));
});

// Measured driver: for "how does the Omnichannel queue process AND close a conversation",
// closeOmnichannelRoom scored 1.33 behind OmnichannelQueue's 2.00. Taking only the champion left
// the answer covering process and never close.
test('pickSeeds reaches the runner-up so a second facet of the question survives', () => {
    def('OmnichannelQueue', 'p/q.ts');        // queue -> 1 hit / 2 = 0.50... plus below
    def('closeOmnichannelRoom', 'p/q.ts');
    def('processWaitingQueue', 'p/q.ts');
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/q.ts'])]);
    const seeds = pickSeeds(pools[0], 'How does the Omnichannel queue process and close a conversation?');
    assert.ok(seeds.some(s => s.symbol === 'closeOmnichannelRoom'), seeds.map(s => s.symbol).join(','));
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

// Equal scores mean the rule cannot tell the candidates apart, so cutting at exactly N would be
// an arbitrary alphabetical choice -- the group is kept whole, bounded only by the hard cap.
test('pickSeeds never splits a tie group, and honours the hard cap', () => {
    ['aMessage', 'bMessage', 'cMessage', 'dMessage'].forEach(s => def(s, 'p/x.ts'));
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/x.ts'])]);
    const seeds = pickSeeds(pools[0], 'How is a message sent?');
    assert.equal(seeds.length, 4);                          // all four tie at 0.50 -> none dropped
    assert.ok(seeds.every(s => s.tied));

    'efghijkl'.split('').forEach(x => def(x + 'Message', 'p/x.ts'));
    const big = buildPools(routed('P › One'), [sec('P', 'One', ['p/x.ts'])]);
    assert.equal(pickSeeds(big[0], 'How is a message sent?').length, MAX_SEEDS_PER_POOL);
});

// Three distinct scores are taken, and every symbol sharing one of them comes along -- the cut is
// on the score, not on the position.
test('pickSeeds takes every symbol sharing one of the top three scores', () => {
    def('sendMessage', 'p/x.ts');        // 2.00
    def('sendText', 'p/x.ts');           // 0.50
    def('sendFile', 'p/x.ts');           // 0.50  same score as sendText -> must come along
    def('messageBus', 'p/x.ts');         // 0.50
    const pools = buildPools(routed('P › One'), [sec('P', 'One', ['p/x.ts'])]);
    const seeds = pickSeeds(pools[0], 'How is a message sent?');
    assert.deepEqual(seeds.map(s => s.symbol).sort(), ['messageBus', 'sendFile', 'sendMessage', 'sendText']);
});

// Not relevance filtering (v2 does no deterministic culling) -- with no match at all there is no
// starting point, and taking the top N would otherwise pick unrelated symbols at random.
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

// The quota moved to candidates.ts, so buildChains now returns every seed's chain: a chain's
// redundancy is invisible from its seed, and cutting here is what let 87 of 385 candidates
// (duplicates and subsets) occupy the slots.
test('buildChains builds every seed, leaving the quota to the candidate stage', () => {
    ['aMessage', 'bMessage', 'cMessage'].forEach(s => def(s, 'p/x.ts'));
    const chains = buildChains(routed('P › One'), [sec('P', 'One', ['p/x.ts'])], 'How is a message sent?');
    assert.equal(chains.length, 3);
    assert.deepEqual(chains.map(c => c.id), [1, 2, 3]);
});

// A pool is per page, but a cited file is not: 50 of the 204 files the wiki cites appear on more
// than one page, and lexicalScore reads only the symbol name and the question, so both pools score
// the symbol identically and both pick it. Measured: 61 of 385 candidates were exact duplicates.
test('buildChains never builds the same (symbol, file) twice across pools', () => {
    def('sendMessage', 'shared/send.ts');
    const sections = [
        sec('P', 'Message Sending Workflow', ['shared/send.ts'], 'prose from P'),
        sec('Q', 'Common Room Operations', ['shared/send.ts'], 'prose from Q'),
    ];
    const chains = buildChains(routed('P › Message Sending Workflow', 'Q › Common Room Operations'),
        sections, 'How is a message sent?');
    assert.equal(chains.length, 1);
    assert.equal(chains[0].pageId, 'P');                                  // first routed pool keeps the label
    assert.equal(chains[0].label, 'P › Message Sending Workflow · sendMessage');
});

test('buildChains merges the duplicate pool\'s subsections and prose into the survivor', () => {
    def('sendMessage', 'shared/send.ts');
    const sections = [
        sec('P', 'Message Sending Workflow', ['shared/send.ts'], 'prose from P'),
        sec('Q', 'Common Room Operations', ['shared/send.ts'], 'prose from Q'),
    ];
    const [chain] = buildChains(routed('P › Message Sending Workflow', 'Q › Common Room Operations'),
        sections, 'How is a message sent?');
    assert.deepEqual(chain.sections, ['P › Message Sending Workflow', 'Q › Common Room Operations']);
    assert.ok(chain.prose.includes('prose from P') && chain.prose.includes('prose from Q'));
});

test('buildChains carries the seed score, which is comparable across pools', () => {
    def('sendMessage', 'p/send.ts');
    const [chain] = buildChains(routed('P › One'), [sec('P', 'One', ['p/send.ts'])], 'How is a message sent?');
    assert.equal(chain.score, 2);                                         // 2 hits / 2 sub-words
});

// The wiki cites test files as well as production ones. A symbol defined only in a test file has
// no rival definition, so chooseFile's test filter never fires and it can become a seed --
// measured: closeOmnichannelRoom seeded a chain from tests/data/livechat/rooms.ts, and the answer
// had to note that the real handler was absent from the materials.
test('buildPools excludes test files cited by the wiki', () => {
    def('realHandler', 'server/livechat/rooms.ts');
    def('closeOmnichannelRoom', 'apps/meteor/tests/data/livechat/rooms.ts');
    const sections = [sec('P', 'API Endpoints', ['server/livechat/rooms.ts', 'apps/meteor/tests/data/livechat/rooms.ts'])];
    const pools = buildPools(routed('P › API Endpoints'), sections);
    assert.deepEqual(pools[0].files, ['server/livechat/rooms.ts']);
    assert.deepEqual(pools[0].symbols.map(s => s.symbol), ['realHandler']);
});

test('buildPools drops a page whose subsections cite only test files', () => {
    def('helper', 'apps/meteor/tests/e2e/helper.ts');
    const pools = buildPools(routed('P › Testing'), [sec('P', 'Testing', ['apps/meteor/tests/e2e/helper.ts'])]);
    assert.deepEqual(pools[0].symbols, []);
});
