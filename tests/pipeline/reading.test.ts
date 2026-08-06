import { test } from 'node:test';
import assert from 'node:assert/strict';
import { packMaterials, fallbackRead } from '../../src/pipeline/reading.js';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import type { SkeletonNode, Chain } from '../../src/pipeline/types.js';

const node = (id: string, sym: string): SkeletonNode => ({ id, symbol: sym, file: 'f/' + sym + '.ts', line: 10, snippet: '', kind: 'major', edgeType: null, children: [] });
const table = new Map([['1a', node('1a', 'big')], ['1b', node('1b', 'small')], ['2a', node('2a', 'other')]]);
const chains: Chain[] = [{ id: 1, label: 'x', seeds: [], rrfMass: 0.3 }, { id: 2, label: 'y', seeds: [], rrfMass: 0.1 }];
const readFn = (n: SkeletonNode) => ({ text: n.symbol === 'big' ? 'x'.repeat(4000) : 'y'.repeat(400), startLine: 10, endLine: 20 });

test('fallbackRead: getImplementation-null case reads a 60-line window around n.line, clamped to file length', () => {
    GLOBAL_INDEX.symbols.clear();
    GLOBAL_INDEX.symbols.set('someSymbol', new Set(['/rc/apps/meteor/app/lib/server/someSymbol.ts']));
    const n: SkeletonNode = { id: '1a', symbol: 'someSymbol', file: 'apps/meteor/app/lib/server/someSymbol.ts', line: 10, snippet: '', kind: 'major', edgeType: null, children: [] };
    const fileLines = Array.from({ length: 100 }, (_, i) => `line${i + 1}`);
    const readFileFn = (p: string) => { assert.equal(p, '/rc/apps/meteor/app/lib/server/someSymbol.ts'); return fileLines.join('\n'); };
    const result = fallbackRead(n, readFileFn);
    assert.ok(result);
    assert.equal(result!.startLine, 10);
    assert.equal(result!.endLine, 69);
    assert.equal(result!.text.split('\n').length, 60);
    assert.equal(result!.text.split('\n')[0], 'line10');
    assert.equal(result!.text.split('\n')[59], 'line69');
});

test('fallbackRead: symbol absent from GLOBAL_INDEX -> null (no file to fall back to)', () => {
    GLOBAL_INDEX.symbols.clear();
    const n: SkeletonNode = { id: '1a', symbol: 'unknownSymbol', file: 'f.ts', line: 1, snippet: '', kind: 'major', edgeType: null, children: [] };
    assert.equal(fallbackRead(n, () => 'irrelevant'), null);
});

test('packMaterials splits budget by chain rrf mass and evicts what does not fit', () => {
    // total budget 1200 tokens -> chain1 gets 900, chain2 gets 300
    const { materials, evicted } = packMaterials(['1a', '1b', '2a'], table, chains, 1200, { readFn });
    const ids = materials.map(m => m.nodeId);
    assert.ok(ids.includes('2a'));                    // chain 2's 100-token item fits its 300 budget
    assert.ok(ids.includes('1a'));                    // big is truncated to chain 1's 900-token budget
    const big = materials.find(m => m.nodeId === '1a')!;
    assert.ok(big.tokens <= 900);
    assert.deepEqual(evicted, ['1b']);                // nothing left in chain 1 after big
});

// Backfill fixture: a single chain, budget 1000, fillTo 0.6 -> watermark 600. The selected id
// consumes exactly 200 tokens (800 chars -> ceil(800/4)); each backfill candidate is a 600-char
// ('y') item that costs 150 tokens. Greedy packing against the global watermark should fit two
// full backfill items (200 -> 350 -> 500), truncate a third down to the last 100 tokens of room
// (500 -> 600), and skip whatever comes after once the watermark is exhausted.
const backfillNode = (id: string): SkeletonNode => ({ id, symbol: 'fill', file: 'f/fill.ts', line: 10, snippet: '', kind: 'major', edgeType: null, children: [] });
const backfillTable = new Map([
    ['1a', node('1a', 'big')],
    ['1b', backfillNode('1b')], ['1c', backfillNode('1c')], ['1d', backfillNode('1d')], ['1e', backfillNode('1e')],
]);
const oneChain: Chain[] = [{ id: 1, label: 'x', seeds: [], rrfMass: 1 }];
const backfillReadFn = (n: SkeletonNode) => ({ text: n.symbol === 'big' ? 'x'.repeat(800) : 'y'.repeat(600), startLine: 10, endLine: 20 });

test('packMaterials: backfill tops up the global watermark after selected ids are packed', () => {
    const { materials, evicted } = packMaterials(['1a'], backfillTable, oneChain, 1000, {
        readFn: backfillReadFn, backfillIds: ['1b', '1c', '1d', '1e'], fillTo: 0.6,
    });
    const ids = materials.map(m => m.nodeId);
    assert.deepEqual(ids, ['1a', '1b', '1c', '1d']);              // '1e' never fits once the watermark is spent
    const total = materials.reduce((a, m) => a + m.tokens, 0);
    assert.ok(total <= 600);                                      // stays within fillTo * budgetTokens
    assert.ok(total > 500);                                       // the truncated third item still contributes
    assert.deepEqual(evicted, []);                                // selected-evicted semantics unchanged: nothing evicted here
});

test('packMaterials: backfill never double-packs an id already selected/evicted', () => {
    const { materials, evicted } = packMaterials(['1a'], backfillTable, oneChain, 1000, {
        readFn: backfillReadFn, backfillIds: ['1a', '1b'], fillTo: 0.6,
    });
    assert.deepEqual(materials.map(m => m.nodeId), ['1a', '1b']); // '1a' appears once, not re-packed by the backfill pass
    assert.deepEqual(evicted, []);
});

test('packMaterials: no backfillIds leaves behavior identical to before (no backfilled extras)', () => {
    const { materials, evicted } = packMaterials(['1a', '1b', '2a'], table, chains, 1200, { readFn });
    assert.deepEqual(materials.map(m => m.nodeId), ['1a', '2a']);
    assert.deepEqual(evicted, ['1b']);
});
