import { test } from 'node:test';
import assert from 'node:assert/strict';
import { packMaterials } from '../../src/pipeline/reading.js';
import type { SkeletonNode, Chain } from '../../src/pipeline/types.js';

const node = (id: string, sym: string): SkeletonNode => ({ id, symbol: sym, file: 'f/' + sym + '.ts', line: 10, snippet: '', kind: 'major', edgeType: null, children: [] });
const table = new Map([['1a', node('1a', 'big')], ['1b', node('1b', 'small')], ['2a', node('2a', 'other')]]);
const chains: Chain[] = [{ id: 1, label: 'x', seeds: [], rrfMass: 0.3 }, { id: 2, label: 'y', seeds: [], rrfMass: 0.1 }];
const readFn = (n: SkeletonNode) => ({ text: n.symbol === 'big' ? 'x'.repeat(4000) : 'y'.repeat(400), startLine: 10, endLine: 20 });

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
